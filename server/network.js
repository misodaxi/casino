// ============================================================
// MIDNIGHT CASINO SERVER NETWORK & MULTIPLAYER MANAGER
// ============================================================

const { CASINO_SPATIAL_ZONES } = require('./config');
const {
  players,
  ipNames,
  tvState,
  tvLastWatched,
  jukeboxState,
  getClientIp,
  roundMoney,
  getSyncedTvState,
  getSyncedJukeboxState
} = require('./state');

const { setupRouletteSocketEvents, handleRouletteDisconnect } = require('./games/roulette');
const { setupBlackjackSocketEvents, handleBlackjackDisconnect } = require('./games/blackjack');
const { setupDiceSocketEvents, handleDiceVersusDisconnect } = require('./games/dice');
const { setupCoinSocketEvents, handleCoinVersusDisconnect } = require('./games/coin');

const CASINO_SPATIAL_ZONES_MAP = {};
CASINO_SPATIAL_ZONES.forEach(z => {
  CASINO_SPATIAL_ZONES_MAP[z.id] = {
    x: z.x,
    z: z.z,
    radSq: z.radius * z.radius
  };
});

function getZoneForPosition(x, z, currentZoneId = null) {
  // O(1) Fast Path: if player is still within their current zone radius, return currentZone immediately
  if (currentZoneId && CASINO_SPATIAL_ZONES_MAP[currentZoneId]) {
    const cur = CASINO_SPATIAL_ZONES_MAP[currentZoneId];
    const dx = x - cur.x;
    const dz = z - cur.z;
    if (dx * dx + dz * dz <= cur.radSq) {
      return currentZoneId;
    }
  }

  let closestZone = 'lobby';
  let minDistanceSq = Infinity;

  for (let i = 0; i < CASINO_SPATIAL_ZONES.length; i++) {
    const zone = CASINO_SPATIAL_ZONES[i];
    const dx = x - zone.x;
    const dz = z - zone.z;
    const distSq = dx * dx + dz * dz;
    const radSq = zone.radius * zone.radius;

    if (distSq <= radSq && distSq < minDistanceSq) {
      minDistanceSq = distSq;
      closestZone = zone.id;
    }
  }
  return closestZone;
}

function getRelevantPlayersFor(playerId, radius = 55.0) {
  const target = players[playerId];
  if (!target) return {};
  const relevant = {};
  const radSq = radius * radius;

  for (const id in players) {
    const p = players[id];
    if (!p) continue;
    const dx = p.x - target.x;
    const dz = p.z - target.z;
    if (dx * dx + dz * dz <= radSq) {
      relevant[id] = p;
    }
  }
  return relevant;
}

function setupSocketIO(io) {
  io.on('connection', (socket) => {
    const clientIp = getClientIp(socket);
    const assignedName = ipNames[clientIp] || ('Jugador_' + socket.id.substring(0, 4));

    const initialX = 0;
    const initialZ = 30;
    const initialZone = getZoneForPosition(initialX, initialZ);

    players[socket.id] = {
      id: socket.id,
      x: initialX,
      z: initialZ,
      rotY: 0,
      color: 0x8B5CF6,
      name: assignedName,
      seat: null,
      zone: initialZone,
      lastSeq: 0,
      lastActive: Date.now()
    };

    socket.currentZone = initialZone;
    socket.join('zone:' + initialZone);

    // Initial snapshot payload
    const initialRelevantPlayers = getRelevantPlayersFor(socket.id, 65.0);
    socket.emit('init', {
      id: socket.id,
      zone: initialZone,
      players: initialRelevantPlayers,
      tvState: getSyncedTvState(),
      jukeboxState: getSyncedJukeboxState(),
      serverTime: Date.now()
    });

    // Notify other players in the same zone
    socket.to('zone:' + initialZone).emit('playerJoined', players[socket.id]);

    // Ultra-lightweight Clock Sync
    socket.on('syncPing', (data) => {
      socket.emit('syncPong', {
        clientTime: (data && data.clientTime) ? data.clientTime : 0,
        serverTime: Date.now()
      });
    });

    // High-Frequency Compact Transform Update (pTransform)
    socket.on('pTransform', (data) => {
      const p = players[socket.id];
      if (!p || !data) return;

      if (typeof data.seq === 'number' && p.lastSeq && data.seq < p.lastSeq) {
        return; // Discard stale packets
      }
      if (typeof data.seq === 'number') p.lastSeq = data.seq;

      p.x = typeof data.x === 'number' ? data.x : p.x;
      p.z = typeof data.z === 'number' ? data.z : p.z;
      p.rotY = typeof data.rotY === 'number' ? data.rotY : p.rotY;
      p.lastActive = Date.now();

      const newZone = getZoneForPosition(p.x, p.z, socket.currentZone);
      if (newZone !== socket.currentZone) {
        socket.leave('zone:' + socket.currentZone);
        socket.to('zone:' + socket.currentZone).emit('playerLeft', socket.id);

        socket.currentZone = newZone;
        p.zone = newZone;
        socket.join('zone:' + newZone);
        socket.to('zone:' + newZone).emit('playerJoined', p);

        const newRelevantPlayers = getRelevantPlayersFor(socket.id, 55.0);
        socket.emit('zoneSnapshot', {
          zone: newZone,
          players: newRelevantPlayers
        });
      }

      socket.to('zone:' + socket.currentZone).emit('pTransform', {
        id: socket.id,
        x: p.x,
        z: p.z,
        rotY: p.rotY,
        seq: p.lastSeq,
        t: data.t || Date.now()
      });
    });

    // Backwards-Compatible Transform Handler
    socket.on('updateTransform', (data) => {
      const p = players[socket.id];
      if (!p || !data) return;

      p.x = typeof data.x === 'number' ? data.x : p.x;
      p.z = typeof data.z === 'number' ? data.z : p.z;
      p.rotY = typeof data.rotY === 'number' ? data.rotY : p.rotY;

      if (data.name && typeof data.name === 'string' && data.name.trim()) {
        const cleanName = data.name.trim().substring(0, 24);
        if (cleanName !== p.name) {
          p.name = cleanName;
          ipNames[clientIp] = cleanName;
          io.to('zone:' + socket.currentZone).emit('playerNameChanged', { id: socket.id, name: cleanName });
        }
      }

      if (data.seat !== undefined && data.seat !== p.seat) {
        p.seat = data.seat;
        io.to('zone:' + socket.currentZone).emit('playerSeatChanged', { id: socket.id, seat: p.seat });
      }

      const newZone = getZoneForPosition(p.x, p.z);
      if (newZone !== socket.currentZone) {
        socket.leave('zone:' + socket.currentZone);
        socket.to('zone:' + socket.currentZone).emit('playerLeft', socket.id);

        socket.currentZone = newZone;
        p.zone = newZone;
        socket.join('zone:' + newZone);
        socket.to('zone:' + newZone).emit('playerJoined', p);
      }

      socket.to('zone:' + socket.currentZone).emit('playerMoved', p);
    });

    // Discrete Name Change Event
    socket.on('playerNameChange', (data) => {
      const p = players[socket.id];
      if (p && data && typeof data.name === 'string' && data.name.trim()) {
        const cleanName = data.name.trim().substring(0, 24);
        p.name = cleanName;
        ipNames[clientIp] = cleanName;
        io.emit('playerNameChanged', { id: socket.id, name: cleanName });
      }
    });

    // Discrete Seat Change Event
    socket.on('playerSeatChange', (data) => {
      const p = players[socket.id];
      if (p && data) {
        p.seat = data.seat !== undefined ? data.seat : null;
        io.to('zone:' + socket.currentZone).emit('playerSeatChanged', { id: socket.id, seat: p.seat });
      }
    });

    // TV Synchronized Handlers
    socket.on('tvChangeVideo', (data) => {
      if (data && data.videoId) {
        tvState.videoId = data.videoId;
        tvState.playing = true;
        tvState.currentTime = 0;
        tvState.updatedAt = Date.now();

        tvLastWatched.videoId = data.videoId;
        tvLastWatched.url = data.url || ('https://www.youtube.com/watch?v=' + data.videoId);
        tvLastWatched.currentTime = 0;
        tvLastWatched.updatedAt = Date.now();

        io.emit('tvStateUpdate', getSyncedTvState());
      }
    });

    socket.on('tvPlay', (data) => {
      tvState.playing = true;
      if (data && typeof data.currentTime === 'number') {
        tvState.currentTime = data.currentTime;
      }
      tvState.updatedAt = Date.now();
      io.emit('tvStateUpdate', getSyncedTvState());
    });

    socket.on('tvPause', (data) => {
      tvState.playing = false;
      if (data && typeof data.currentTime === 'number') {
        tvState.currentTime = data.currentTime;
      }
      tvState.updatedAt = Date.now();
      io.emit('tvStateUpdate', getSyncedTvState());
    });

    socket.on('tvProgress', (data) => {
      if (data && typeof data.currentTime === 'number') {
        const now = Date.now();
        // Si hubo un salto de tiempo reciente (<2200ms), ignorar reportes desactualizados
        if (now - tvState.updatedAt < 2200 && Math.abs(data.currentTime - tvState.currentTime) > 2.5) {
          return;
        }
        tvState.currentTime = data.currentTime;
        tvState.updatedAt = now;
        tvLastWatched.currentTime = data.currentTime;
        tvLastWatched.updatedAt = now;
      }
    });

    socket.on('tvSeek', (data) => {
      if (data && typeof data.currentTime === 'number') {
        const targetSec = Math.max(0, Math.floor(data.currentTime));
        tvState.currentTime = targetSec;
        tvState.updatedAt = Date.now();
        tvLastWatched.currentTime = targetSec;
        tvLastWatched.updatedAt = Date.now();

        const synced = getSyncedTvState();
        io.emit('tvStateUpdate', synced);
        io.emit('tvForceSeek', { currentTime: targetSec, serverTime: Date.now() });
      }
    });

    socket.on('tvSyncReq', () => {
      socket.emit('tvStateUpdate', getSyncedTvState());
    });

    // Jukebox Synchronized Handlers
    socket.on('jukeboxSyncReq', () => {
      socket.emit('jukeboxStateUpdate', getSyncedJukeboxState());
    });

    socket.on('jukeboxSearchTrack', (data, callback) => {
      const query = (data && data.query) ? data.query.trim() : '';
      if (!query || typeof callback !== 'function') return;

      const https = require('https');
      const searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      };

      const req = https.get(searchUrl, { headers }, (res) => {
        let html = '';
        res.on('data', chunk => html += chunk);
        res.on('end', () => {
          const vidMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
          const vid = vidMatch ? vidMatch[1] : null;
          if (!vid) return callback({ videoId: null });

          const titleRegex = new RegExp('"videoId":"' + vid + '"[\\s\\S]*?"title":\\{"runs":\\[\\{"text":"(.*?)"\\}');
          const titleMatch = html.match(titleRegex);
          const title = titleMatch ? titleMatch[1] : query;

          const artistRegex = new RegExp('"videoId":"' + vid + '"[\\s\\S]*?"ownerText":\\{"runs":\\[\\{"text":"(.*?)"');
          const artistMatch = html.match(artistRegex);
          const artist = artistMatch ? artistMatch[1] : 'YouTube Music';

          const durRegex = new RegExp('"videoId":"' + vid + '"[\\s\\S]*?"lengthText":\\{"simpleText":"(.*?)"');
          const durMatch = html.match(durRegex);
          let duration = 210;
          if (durMatch && durMatch[1]) {
            const parts = durMatch[1].split(':');
            if (parts.length === 2) duration = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
            else if (parts.length === 3) duration = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
          }

          callback({
            videoId: vid,
            title: title,
            artist: artist,
            duration: duration,
            cover: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
          });
        });
      });
      req.on('error', () => {
        callback({ videoId: null });
      });
      req.setTimeout(5000, () => {
        req.destroy();
        callback({ videoId: null });
      });
    });

    socket.on('jukeboxPlayTrack', (data) => {
      if (data && data.track) {
        jukeboxState.currentTrack = data.track;
        if (!Array.isArray(jukeboxState.playlist)) jukeboxState.playlist = [];
        const exists = jukeboxState.playlist.some(t => t.id === data.track.id || (t.url && t.url === data.track.url));
        if (!exists) {
          jukeboxState.playlist.unshift(data.track);
          jukeboxState.currentIndex = 0;
        } else {
          jukeboxState.currentIndex = jukeboxState.playlist.findIndex(t => t.id === data.track.id || (t.url && t.url === data.track.url));
        }
        jukeboxState.playing = true;
        jukeboxState.currentTime = 0;
        jukeboxState.updatedAt = Date.now();
        if (data.changerName) jukeboxState.changerName = data.changerName;
        io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
      }
    });

    socket.on('jukeboxTogglePlay', (data) => {
      if (typeof data.playing === 'boolean') {
        jukeboxState.playing = data.playing;
        if (typeof data.currentTime === 'number') {
          jukeboxState.currentTime = data.currentTime;
        }
        jukeboxState.updatedAt = Date.now();
        io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
      }
    });

    socket.on('jukeboxSeek', (data) => {
      if (data && typeof data.currentTime === 'number') {
        jukeboxState.currentTime = data.currentTime;
        jukeboxState.updatedAt = Date.now();
        io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
      }
    });

    socket.on('jukeboxNext', (data) => {
      if (jukeboxState.playlist && jukeboxState.playlist.length > 0) {
        jukeboxState.currentIndex = (jukeboxState.currentIndex + 1) % jukeboxState.playlist.length;
        jukeboxState.currentTrack = jukeboxState.playlist[jukeboxState.currentIndex];
        jukeboxState.currentTime = 0;
        jukeboxState.playing = true;
        jukeboxState.updatedAt = Date.now();
        if (data && data.changerName) jukeboxState.changerName = data.changerName;
        io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
      }
    });

    socket.on('jukeboxPrev', (data) => {
      if (jukeboxState.playlist && jukeboxState.playlist.length > 0) {
        jukeboxState.currentIndex = (jukeboxState.currentIndex - 1 + jukeboxState.playlist.length) % jukeboxState.playlist.length;
        jukeboxState.currentTrack = jukeboxState.playlist[jukeboxState.currentIndex];
        jukeboxState.currentTime = 0;
        jukeboxState.playing = true;
        jukeboxState.updatedAt = Date.now();
        if (data && data.changerName) jukeboxState.changerName = data.changerName;
        io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
      }
    });

    socket.on('jukeboxSetVolume', (data) => {
      if (data && typeof data.volume === 'number') {
        jukeboxState.volume = Math.max(0, Math.min(100, data.volume));
        socket.broadcast.emit('jukeboxVolumeUpdate', { volume: jukeboxState.volume });
      }
    });

    socket.on('jukeboxAddQueue', (data) => {
      if (data && data.track) {
        jukeboxState.playlist.push(data.track);
        io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
      }
    });

    // Chat Message Rate-Limiting & Broadcasting
    let chatMsgCount = 0;
    let lastChatReset = Date.now();

    socket.on('chatMessage', (data) => {
      const now = Date.now();
      if (now - lastChatReset > 2000) {
        chatMsgCount = 0;
        lastChatReset = now;
      }
      chatMsgCount++;
      if (chatMsgCount > 4) {
        socket.emit('chatError', { message: 'Por favor, no envíes mensajes tan rápido.' });
        return;
      }

      if (data && typeof data.text === 'string' && data.text.trim()) {
        const p = players[socket.id];
        const senderName = p ? p.name : (data.name || 'Jugador');
        const cleanMsg = data.text.trim().substring(0, 160);
        io.emit('chatMessage', {
          id: socket.id,
          name: senderName,
          text: cleanMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    });

    // Game Specific Event Hooks
    setupRouletteSocketEvents(io, socket, players);
    setupBlackjackSocketEvents(io, socket, players);
    setupDiceSocketEvents(io, socket, players);
    setupCoinSocketEvents(io, socket, players);

    // Disconnect Cleanup
    socket.on('disconnect', () => {
      if (socket.currentZone) {
        socket.to('zone:' + socket.currentZone).emit('playerLeft', socket.id);
        socket.leave('zone:' + socket.currentZone);
      } else {
        io.emit('playerLeft', socket.id);
      }

      delete players[socket.id];

      handleRouletteDisconnect(io, socket);
      handleBlackjackDisconnect(io, socket);
      handleDiceVersusDisconnect(io, socket);
      handleCoinVersusDisconnect(io, socket);
    });
  });
}

module.exports = {
  setupSocketIO,
  getZoneForPosition,
  getRelevantPlayersFor
};
