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

function searchYouTubeTrack(query, callback) {
  if (!query || !query.trim()) return callback(null);
  const searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query.trim());
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
      if (!vid) return callback(null);

      const titleRegex = new RegExp('"videoId":"' + vid + '"[\\s\\S]*?"title":\\{"runs":\\[\\{"text":"(.*?)"\\}');
      const titleMatch = html.match(titleRegex);
      const title = titleMatch ? titleMatch[1] : query.trim();

      const artistRegex = new RegExp('"videoId":"' + vid + '"[\\s\\S]*?"ownerText":\\{"runs":\\[\\{"text":"(.*?)"');
      const artistMatch = html.match(artistRegex);
      const artist = artistMatch ? artistMatch[1] : 'YouTube Music';

      let duration = 210;
      const vidSectionIdx = html.indexOf('"videoId":"' + vid + '"');
      const vidSection = vidSectionIdx !== -1 ? html.substring(vidSectionIdx, vidSectionIdx + 4000) : html;

      const durMatch = vidSection.match(/"lengthText":\s*\{"accessibility":\s*\{.*?\},\s*"simpleText":"(.*?)"\}/) ||
                       vidSection.match(/"lengthText":\s*\{.*?"simpleText":"(.*?)"\}/) ||
                       vidSection.match(/"simpleText":"(\d+:\d+(?::\d+)?)"/);

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

  req.on('error', () => callback(null));
  req.setTimeout(5000, () => {
    req.destroy();
    callback(null);
  });
}

app.get('/api/jukebox-search', (req, res) => {
  const query = req.query.q || '';
  searchYouTubeTrack(query, (result) => {
    res.json(result || { videoId: null });
  });
});

module.exports.searchYouTubeTrack = searchYouTubeTrack;

// Attach Socket.IO Network & Game Handlers
setupSocketIO(io);

server.listen(PORT, () => {
  console.log(`[MIDNIGHT CASINO] Server running on http://localhost:${PORT}`);
});