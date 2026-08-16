// ============================================================
// MIDNIGHT CASINO SERVER MAIN ENTRY POINT
// ============================================================

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const { setupSocketIO } = require('./server/network');

const app = express();
const server = http.createServer(app);

// Highly Optimized WebSocket Transport Configuration
const io = new Server(server, {
  cors: { origin: '*' },
  pingInterval: 10000,
  pingTimeout: 5000,
  transports: ['websocket', 'polling']
});

const PORT = process.env.PORT || 3000;

// Serve static assets from project root and subdirectories
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Attach Socket.IO Network & Game Handlers
setupSocketIO(io);

server.listen(PORT, () => {
  console.log(`[MIDNIGHT CASINO] Server running on http://localhost:${PORT}`);
});