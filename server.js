const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8000;

// Serve static files
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Multiplayer player tracking & IP-to-Name persistence map
const players = {};
const ipNames = {};

function getClientIp(socket) {
  const headers = socket.handshake.headers;
  const xForwardedFor = headers['x-forwarded-for'];
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return socket.handshake.address || (socket.request && socket.request.connection && socket.request.connection.remoteAddress) || '127.0.0.1';
}

// Global TV 3D Synchronized State
const tvState = {
  videoId: '',
  playing: false,
  currentTime: 0,
  updatedAt: Date.now()
};

// European Roulette Wheel Sequence Order
const WHEEL_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

// Server-side Authoritative Roulette State Manager
const roulettes = {}; // rouletteId -> state object

function getOrCreateRouletteState(rouletteId) {
  if (!roulettes[rouletteId]) {
    roulettes[rouletteId] = {
      rouletteId: rouletteId,
      players: {}, // socketId -> { id, name, seatIndex }
      readyPlayers: {}, // socketId -> true
      bets: {}, // betKey -> totalAmount
      userBets: {}, // socketId -> { betKey -> amount }
      status: 'WAITING', // 'WAITING' | 'READY' | 'SPINNING' | 'RESULT'
      result: null,
      spinId: 0
    };
  }
  return roulettes[rouletteId];
}

function broadcastRouletteState(rouletteId) {
  const r = getOrCreateRouletteState(rouletteId);
  const totalPlayers = Object.keys(r.players).length;
  const totalReady = Object.keys(r.readyPlayers).length;

  const payload = {
    rouletteId: r.rouletteId,
    status: r.status,
    players: r.players,
    readyPlayers: r.readyPlayers,
    bets: r.bets,
    userBets: r.userBets,
    result: r.result,
    spinId: r.spinId,
    totalPlayers,
    totalReady
  };

  io.to(`roulette:${rouletteId}`).emit('rouletteState', payload);
  return payload;
}

function checkAndTriggerSpin(rouletteId) {
  const r = getOrCreateRouletteState(rouletteId);
  const playerIds = Object.keys(r.players);
  const totalPlayers = playerIds.length;
  const totalReady = Object.keys(r.readyPlayers).length;

  // Only trigger spin if there is at least 1 seated player, all seated players are ready, and state is WAITING or READY!
  if (totalPlayers > 0 && totalReady === totalPlayers && (r.status === 'WAITING' || r.status === 'READY')) {
    r.status = 'SPINNING';
    r.spinId++;
    const winNum = WHEEL_ORDER[Math.floor(Math.random() * WHEEL_ORDER.length)];
    r.result = winNum;

    io.to(`roulette:${rouletteId}`).emit('rouletteReadyToSpin', { rouletteId, totalPlayers });

    io.to(`roulette:${rouletteId}`).emit('rouletteSpin', {
      rouletteId,
      result: winNum,
      spinId: r.spinId
    });

    broadcastRouletteState(rouletteId);

    // After animation (~3.5s) + result presentation (~3.5s), finish round
    setTimeout(() => {
      if (roulettes[rouletteId]) {
        const roomState = roulettes[rouletteId];
        roomState.status = 'RESULT';
        io.to(`roulette:${rouletteId}`).emit('rouletteResult', {
          rouletteId,
          result: roomState.result,
          spinId: roomState.spinId
        });
        broadcastRouletteState(rouletteId);

        // Reset to WAITING for next round after 3.5 seconds
        setTimeout(() => {
          if (roulettes[rouletteId]) {
            const nextRound = roulettes[rouletteId];
            nextRound.status = 'WAITING';
            nextRound.readyPlayers = {};
            nextRound.bets = {};
            nextRound.userBets = {};
            nextRound.result = null;
            broadcastRouletteState(rouletteId);
          }
        }, 3500);
      }
    }, 4000);
  }
}

function getSyncedTvState() {
  const now = Date.now();
  let current = tvState.currentTime;
  if (tvState.playing) {
    current += (now - tvState.updatedAt) / 1000;
  }
  return {
    videoId: tvState.videoId,
    playing: tvState.playing,
    currentTime: Math.max(0, current),
    updatedAt: now
  };
}

io.on('connection', (socket) => {
  const clientIp = getClientIp(socket);
  console.log(`🟢 Jugador conectado: ${socket.id} (IP: ${clientIp})`);

  // Retrieve saved name associated with this IP or fallback to default
  const savedName = ipNames[clientIp] || `Jugador_${socket.id.substring(0, 4)}`;

  // Create initial player state
  players[socket.id] = {
    id: socket.id,
    ip: clientIp,
    x: (Math.random() - 0.5) * 6,
    z: 12 + (Math.random() - 0.5) * 4,
    rotY: Math.PI,
    name: savedName,
    color: 0x8B5CF6
  };

  // Send current player & TV state to newly connected player
  socket.emit('init', { id: socket.id, players, tvState: getSyncedTvState() });

  // Broadcast new player to all other clients
  socket.broadcast.emit('playerJoined', players[socket.id]);

  // Handle TV 3D synchronized events
  socket.on('tvChangeVideo', (data) => {
    if (!data || !data.videoId) return;
    tvState.videoId = data.videoId;
    tvState.playing = data.playing !== undefined ? !!data.playing : true;
    tvState.currentTime = Math.max(0, data.currentTime || 0);
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvPlay', (data) => {
    tvState.playing = true;
    if (data && typeof data.currentTime === 'number') {
      tvState.currentTime = Math.max(0, data.currentTime);
    }
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvPause', (data) => {
    tvState.playing = false;
    if (data && typeof data.currentTime === 'number') {
      tvState.currentTime = Math.max(0, data.currentTime);
    }
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvSeek', (data) => {
    if (!data || typeof data.currentTime !== 'number') return;
    tvState.currentTime = Math.max(0, data.currentTime);
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvSyncReq', () => {
    socket.emit('tvStateUpdate', getSyncedTvState());
  });

  // Handle position & movement updates
  socket.on('updateTransform', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].z = data.z;
      players[socket.id].rotY = data.rotY;
      if (data.name && data.name.trim() !== '') {
        const cleanName = data.name.trim().substring(0, 16);
        players[socket.id].name = cleanName;
        ipNames[clientIp] = cleanName; // Save & associate name to client IP address permanently!
      }
      if (data.seat !== undefined) {
        players[socket.id].seat = data.seat;
      }
      socket.broadcast.emit('playerMoved', players[socket.id]);
    }
  });

  /* ============================================================
     AUTHORITATIVE MULTIPLAYER ROULETTE ENGINE
  ============================================================ */
  socket.on('rouletteJoin', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : 'roulette';
    socket.join(`roulette:${rId}`);
    socket.currentRouletteId = rId;

    const r = getOrCreateRouletteState(rId);
    r.players[socket.id] = {
      id: socket.id,
      name: players[socket.id]?.name || 'Jugador',
      seatIndex: data.seatIndex || 0
    };

    broadcastRouletteState(rId);
  });

  socket.on('rouletteLeave', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      socket.leave(`roulette:${rId}`);
      const r = roulettes[rId];
      delete r.players[socket.id];
      delete r.readyPlayers[socket.id];
      if (r.userBets) delete r.userBets[socket.id];
      delete socket.currentRouletteId;

      if (Object.keys(r.players).length === 0) {
        r.status = 'WAITING';
        r.readyPlayers = {};
        r.bets = {};
        r.userBets = {};
        r.result = null;
      } else {
        checkAndTriggerSpin(rId);
      }

      broadcastRouletteState(rId);
    }
  });

  socket.on('rouletteReady', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      const r = roulettes[rId];
      if (r.players[socket.id] && (r.status === 'WAITING' || r.status === 'READY')) {
        r.readyPlayers[socket.id] = true;
        broadcastRouletteState(rId);
        checkAndTriggerSpin(rId);
      }
    }
  });

  socket.on('rouletteUnready', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      const r = roulettes[rId];
      if (r.status === 'WAITING' || r.status === 'READY') {
        delete r.readyPlayers[socket.id];
        broadcastRouletteState(rId);
      }
    }
  });

  socket.on('rouletteBet', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId] && data.betKey && typeof data.amount === 'number') {
      const r = roulettes[rId];
      if (r.status === 'WAITING' && r.players[socket.id]) {
        r.bets[data.betKey] = (r.bets[data.betKey] || 0) + data.amount;
        if (!r.userBets[socket.id]) r.userBets[socket.id] = {};
        r.userBets[socket.id][data.betKey] = (r.userBets[socket.id][data.betKey] || 0) + data.amount;
        broadcastRouletteState(rId);
      }
    }
  });

  // Handle chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', {
      id: socket.id,
      name: players[socket.id]?.name || 'Anónimo',
      message: msg
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`🔴 Jugador desconectado: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);

    if (socket.currentRouletteId && roulettes[socket.currentRouletteId]) {
      const rId = socket.currentRouletteId;
      const r = roulettes[rId];
      delete r.players[socket.id];
      delete r.readyPlayers[socket.id];
      if (r.userBets) delete r.userBets[socket.id];

      if (Object.keys(r.players).length === 0) {
        r.status = 'WAITING';
        r.readyPlayers = {};
        r.bets = {};
        r.userBets = {};
        r.result = null;
      } else {
        checkAndTriggerSpin(rId);
      }

      broadcastRouletteState(rId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Casino 3D Servidor Multijugador activo en http://localhost:${PORT}`);
});