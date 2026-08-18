// ============================================================
// MIDNIGHT CASINO SERVER SHARED STATE & HELPERS
// ============================================================

const { defaultJukeboxPlaylist } = require('./config');

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

function roundMoney(val) {
  if (typeof val === 'string') {
    val = val.replace('$', '').replace('K', '000').replace('k', '000').trim();
  }
  const n = parseFloat(val);
  if (isNaN(n)) return 0;
  return Math.round((n + 0.0000001) * 100) / 100;
}

// Global TV 3D Synchronized State & Multi-User Watch History
const tvState = {
  videoId: '',
  playing: false,
  currentTime: 0,
  updatedAt: Date.now()
};

const tvLastWatched = {
  videoId: '',
  url: '',
  currentTime: 0,
  updatedAt: Date.now()
};

function getSyncedTvState() {
  const now = Date.now();
  let liveCurrentTime = Math.max(0, Math.floor(tvState.currentTime || 0));
  if (tvState.playing && tvState.videoId) {
    const elapsed = Math.max(0, (now - tvState.updatedAt) / 1000);
    liveCurrentTime = Math.max(0, Math.floor(tvState.currentTime + elapsed));
    tvLastWatched.videoId = tvState.videoId;
    tvLastWatched.url = 'https://www.youtube.com/watch?v=' + tvState.videoId;
    tvLastWatched.currentTime = liveCurrentTime;
    tvLastWatched.updatedAt = now;
  }
  return {
    videoId: tvState.videoId,
    playing: tvState.playing,
    currentTime: liveCurrentTime,
    lastWatched: {
      videoId: tvLastWatched.videoId,
      url: tvLastWatched.url,
      currentTime: Math.max(0, Math.floor(tvLastWatched.currentTime || 0)),
      updatedAt: tvLastWatched.updatedAt
    },
    updatedAt: now
  };
}

// Global Jukebox (Gramola) Synchronized State
const jukeboxState = {
  currentTrack: defaultJukeboxPlaylist[0],
  playlist: defaultJukeboxPlaylist,
  currentIndex: 0,
  playing: true,
  currentTime: 0,
  updatedAt: Date.now(),
  volume: 75,
  changerName: 'Casino DJ'
};

function getSyncedJukeboxState() {
  const now = Date.now();
  let liveCurrentTime = Math.max(0, jukeboxState.currentTime || 0);
  const dur = (jukeboxState.currentTrack && jukeboxState.currentTrack.duration) ? jukeboxState.currentTrack.duration : 180;
  if (jukeboxState.playing) {
    const elapsed = Math.max(0, (now - jukeboxState.updatedAt) / 1000);
    liveCurrentTime = Math.min(dur, jukeboxState.currentTime + elapsed);
  }
  return {
    currentTrack: jukeboxState.currentTrack,
    playlist: jukeboxState.playlist,
    currentIndex: jukeboxState.currentIndex,
    playing: jukeboxState.playing,
    currentTime: Math.floor(liveCurrentTime),
    volume: jukeboxState.volume,
    changerName: jukeboxState.changerName,
    updatedAt: now
  };
}

module.exports = {
  players,
  ipNames,
  tvState,
  tvLastWatched,
  jukeboxState,
  getClientIp,
  roundMoney,
  getSyncedTvState,
  getSyncedJukeboxState
};
