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
  videoId: 'dQw4w9WgXcQ',
  playing: true,
  currentTime: 0,
  updatedAt: Date.now()
};

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
      socket.broadcast.emit('playerMoved', players[socket.id]);
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
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Casino 3D Servidor Multijugador activo en http://localhost:${PORT}`);
});