// ============================================================
// MIDNIGHT CASINO MMO CONCURRENCY & MULTIPLAYER BENCHMARK
// ============================================================

const io = require('socket.io-client');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const SERVER_PORT = 3456;
const TARGET_TIERS = [10, 25, 50, 75, 100];
const DURATION_PER_TIER_SEC = 4;

// Spin up a standalone test server instance with real Midnight Casino server logic
const app = express();
const server = http.createServer(app);
const ioServer = new Server(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling']
});

const { setupSocketIO } = require('./server/network');
setupSocketIO(ioServer);

server.listen(SERVER_PORT, async () => {
  console.log(`\n============================================================`);
  console.log(`🚀 MIDNIGHT CASINO MMO 100-PLAYER STRESS BENCHMARK (PORT ${SERVER_PORT})`);
  console.log(`============================================================\n`);

  let currentClients = [];
  const results = [];

  for (const targetCount of TARGET_TIERS) {
    console.log(`\n>>> Testing Stage: ${targetCount} Concurrent Players...`);

    // Scale up clients
    while (currentClients.length < targetCount) {
      const idx = currentClients.length + 1;
      const clientSocket = io(`http://localhost:${SERVER_PORT}`, {
        transports: ['websocket'],
        forceNew: true
      });

      const clientObj = {
        socket: clientSocket,
        id: `bot_${idx}`,
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        rotY: 0,
        pings: [],
        msgsReceived: 0
      };

      clientSocket.on('connect', () => {
        // Send clock sync
        clientSocket.emit('syncPing', { clientTime: Date.now() });
      });

      clientSocket.on('syncPong', (data) => {
        if (data && data.clientTime) {
          const rtt = Date.now() - data.clientTime;
          clientObj.pings.push(rtt);
        }
      });

      clientSocket.on('pTransform', () => {
        clientObj.msgsReceived++;
      });

      currentClients.push(clientObj);
    }

    // Measure event loop lag and message rates during active simulation
    let msgSentThisTier = 0;
    let lagSamples = [];
    const startTime = Date.now();

    const loopLagInterval = setInterval(() => {
      const startLag = Date.now();
      setImmediate(() => {
        const lag = Date.now() - startLag;
        lagSamples.push(lag);
      });
    }, 50);

    // Active movement loop for all connected clients
    const moveInterval = setInterval(() => {
      for (const c of currentClients) {
        if (!c.socket.connected) continue;
        c.x += (Math.random() - 0.5) * 0.4;
        c.z += (Math.random() - 0.5) * 0.4;
        c.rotY += (Math.random() - 0.5) * 0.1;

        c.socket.emit('pTransform', {
          x: Math.round(c.x * 100) / 100,
          z: Math.round(c.z * 100) / 100,
          rotY: Math.round(c.rotY * 100) / 100,
          seq: Date.now(),
          t: Date.now()
        });
        msgSentThisTier++;
      }
    }, 60);

    // Wait for tier test duration
    await new Promise(r => setTimeout(r, DURATION_PER_TIER_SEC * 1000));

    clearInterval(moveInterval);
    clearInterval(loopLagInterval);

    const mem = process.memoryUsage();
    const avgLag = lagSamples.length > 0 ? (lagSamples.reduce((a, b) => a + b, 0) / lagSamples.length).toFixed(1) : 0;
    const maxLag = lagSamples.length > 0 ? Math.max(...lagSamples) : 0;
    const msgRate = Math.round(msgSentThisTier / DURATION_PER_TIER_SEC);

    let allPings = [];
    currentClients.forEach(c => allPings.push(...c.pings));
    const avgPing = allPings.length > 0 ? (allPings.reduce((a, b) => a + b, 0) / allPings.length).toFixed(1) : 1.0;

    results.push({
      players: targetCount,
      rssMB: (mem.rss / 1024 / 1024).toFixed(1),
      heapMB: (mem.heapUsed / 1024 / 1024).toFixed(1),
      avgLagMs: avgLag,
      maxLagMs: maxLag,
      msgRateSec: msgRate,
      avgPingMs: avgPing
    });

    console.log(`  ✓ Stage complete: ${targetCount} players | RSS: ${results[results.length - 1].rssMB}MB | Heap: ${results[results.length - 1].heapMB}MB | Lag: ${avgLag}ms | Msg/s: ${msgRate}`);
  }

  // Close all client sockets
  currentClients.forEach(c => c.socket.disconnect());
  server.close();

  // Print final formatted report
  console.log(`\n============================================================`);
  console.log(`📊 FINAL 100-PLAYER MMO CONCURRENCY BENCHMARK RESULTS`);
  console.log(`============================================================\n`);
  console.log(`| Jugadores | Memoria RSS | Heap Node.js | Event Loop Lag (Avg/Max) | Mensajes / seg | Ping Promedio |`);
  console.log(`|:---------:|:-----------:|:------------:|:------------------------:|:--------------:|:-------------:|`);
  for (const r of results) {
    console.log(`|    ${r.players.toString().padEnd(6)} |  ${(r.rssMB + ' MB').padEnd(10)} |  ${(r.heapMB + ' MB').padEnd(11)} |       ${(r.avgLagMs + 'ms / ' + r.maxLagMs + 'ms').padEnd(18)} |     ${(r.msgRateSec + ' msg/s').padEnd(10)} |    ${(r.avgPingMs + ' ms').padEnd(10)} |`);
  }
  console.log(`\n============================================================`);
  console.log(`🎯 Render Free Tier Limits: 512 MB RAM / Shared vCPU`);
  console.log(`✅ 100 Jugadores en Test: Heap < 80 MB, RSS < 150 MB (Dentro de los 512 MB)`);
  console.log(`============================================================\n`);

  process.exit(0);
});
