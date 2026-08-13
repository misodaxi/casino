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

// Multiplayer player tracking
const players = {};

io.on('connection', (socket) => {
  console.log(`🟢 Jugador conectado: ${socket.id}`);

  // Create initial player state
  players[socket.id] = {
    id: socket.id,
    x: (Math.random() - 0.5) * 6,
    z: 12 + (Math.random() - 0.5) * 4,
    rotY: Math.PI,
    name: `Jugador_${socket.id.substring(0, 4)}`,
    color: 0x8B5CF6
  };

  // Send current state to newly connected player
  socket.emit('init', { id: socket.id, players });

  // Broadcast new player to all other clients
  socket.broadcast.emit('playerJoined', players[socket.id]);

  // Handle position & movement updates
  socket.on('updateTransform', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].z = data.z;
      players[socket.id].rotY = data.rotY;
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Casino 3D Servidor Multijugador activo en puerto ${PORT}`);
});
