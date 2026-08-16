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

const https = require('https');

app.get('/api/jukebox-search', (req, res) => {
  const query = req.query.q || '';
  if (!query || !query.trim()) return res.json({ videoId: null });

  const searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query.trim());
  const request = https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      const match = data.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/);
      res.json({ videoId: match ? match[1] : null });
    });
  });
  request.on('error', () => {
    res.json({ videoId: null });
  });
  request.setTimeout(4000, () => {
    request.destroy();
    res.json({ videoId: null });
  });
});

// Attach Socket.IO Network & Game Handlers
setupSocketIO(io);

server.listen(PORT, () => {
  console.log(`[MIDNIGHT CASINO] Server running on http://localhost:${PORT}`);
});