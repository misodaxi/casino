// ============================================================
// AUTHORITATIVE MULTIPLAYER COIN FLIP ENGINE (SERVER)
// ============================================================

const { roundMoney } = require('../state');

const coinTables = {}; // coinId -> state object

function getOrCreateCoinState(coinId = 'coin') {
  if (!coinTables[coinId]) {
    coinTables[coinId] = {
      coinId: coinId,
      players: {}, // socketId -> { id, name, seatIndex, bet }
      readyPlayers: {}, // socketId -> true
      status: 'WAITING', // 'WAITING' | 'READY' | 'FLIPPING' | 'RESULT'
      finalBet: 50,
      pot: 100,
      turn: null,
      statusMsg: 'Esperando a que se siente un jugador...',
      result: null,
      flipId: 0
    };
  }
  return coinTables[coinId];
}

function broadcastCoinState(io, coinId = 'coin') {
  const c = getOrCreateCoinState(coinId);
  const playerList = Object.values(c.players || {});
  const totalPlayers = playerList.length;
  const readyList = Object.keys(c.readyPlayers || {});
  const totalReady = readyList.length;

  playerList.sort((a, b) => (a.seatIndex || 0) - (b.seatIndex || 0));
  const p1 = playerList[0] || null;
  const p2 = playerList[1] || null;

  const payload = {
    coinId: c.coinId,
    status: c.status,
    players: c.players || {},
    player1: p1,
    player2: p2,
    readyPlayers: c.readyPlayers || {},
    totalPlayers,
    totalReady,
    finalBet: c.finalBet || 50,
    pot: (c.finalBet || 50) * 2,
    statusMsg: c.statusMsg,
    result: c.result,
    flipId: c.flipId
  };

  io.to(`coin:${coinId}`).emit('coinState', payload);
  io.emit('coinState', payload);
  return payload;
}

function checkAndTriggerCoinFlip(io, coinId = 'coin') {
  const c = getOrCreateCoinState(coinId);
  if (c.status === 'FLIPPING' || c.status === 'RESULT') return;

  const playerList = Object.values(c.players || {});
  const totalPlayers = playerList.length;
  const totalReady = Object.keys(c.readyPlayers || {}).length;

  if (totalPlayers >= 2) {
    if (totalReady >= 2) {
      startCoinVersusFlip(io, coinId);
    } else {
      c.status = 'READY';
      if (totalReady === 1) {
        playerList.sort((a, b) => (a.seatIndex || 0) - (b.seatIndex || 0));
        const readyPlayer = playerList.find(p => c.readyPlayers[p.id]);
        const readyName = readyPlayer ? readyPlayer.name : 'Jugador';
        c.statusMsg = `👥 2 en Mesa · ⏳ 1/2 Listos (${readyName} está listo 👍)`;
      } else {
        c.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para jugar)';
      }
      broadcastCoinState(io, coinId);
    }
  } else if (totalPlayers === 1) {
    if (totalReady >= 1) {
      startCoinSoloFlip(io, coinId);
    } else {
      c.status = 'WAITING';
      c.statusMsg = 'Esperando rival o pulsa LANZAR para jugar vs la Banca';
      broadcastCoinState(io, coinId);
    }
  } else {
    c.status = 'WAITING';
    c.statusMsg = 'Esperando a que se siente un jugador...';
    broadcastCoinState(io, coinId);
  }
}

function startCoinSoloFlip(io, coinId = 'coin') {
  const c = getOrCreateCoinState(coinId);
  const playerList = Object.values(c.players || {});
  if (playerList.length === 0) return;
  const soloPlayer = playerList[0];

  c.status = 'FLIPPING';
  c.flipId++;
  c.statusMsg = '🪙 ¡Lanzando moneda vs La Banca!';

  const outcome = Math.random() < 0.5 ? 'cara' : 'cruz';
  const playerChoice = (soloPlayer.choice === 'cruz' || soloPlayer.seatIndex === 1) ? 'cruz' : 'cara';

  let winnerId = null;
  let winnerName = null;

  if (playerChoice === outcome) {
    winnerId = soloPlayer.id;
    winnerName = soloPlayer.name;
  } else {
    winnerId = 'house';
    winnerName = 'La Banca';
  }

  const resultPayload = {
    coinId,
    flipId: c.flipId,
    isSolo: true,
    outcome,
    player1: { id: soloPlayer.id, name: soloPlayer.name, seatIndex: soloPlayer.seatIndex, choice: playerChoice },
    player2: { id: 'house', name: 'La Banca', seatIndex: (soloPlayer.seatIndex === 0 ? 1 : 0), choice: (playerChoice === 'cara' ? 'cruz' : 'cara') },
    winnerId,
    winnerName,
    finalBet: c.finalBet || 50,
    pot: (c.finalBet || 50) * 2
  };

  c.result = resultPayload;

  io.to(`coin:${coinId}`).emit('coinFlip', resultPayload);
  io.emit('coinFlip', resultPayload);
  broadcastCoinState(io, coinId);

  setTimeout(() => {
    if (coinTables[coinId]) {
      const room = coinTables[coinId];
      room.status = 'RESULT';
      if (winnerId === soloPlayer.id) {
        room.statusMsg = `🏆 ¡Salió ${outcome.toUpperCase()}! Ganaste a La Banca (+$${room.finalBet})`;
      } else {
        room.statusMsg = `💀 Salió ${outcome.toUpperCase()}. La Banca gana (-$${room.finalBet})`;
      }
      broadcastCoinState(io, coinId);
      io.to(`coin:${coinId}`).emit('coinResult', resultPayload);
      io.emit('coinResult', resultPayload);

      setTimeout(() => {
        if (coinTables[coinId]) {
          const nextRound = coinTables[coinId];
          nextRound.status = 'WAITING';
          nextRound.readyPlayers = {};
          nextRound.result = null;
          const pCount = Object.keys(nextRound.players).length;
          if (pCount >= 2) {
            nextRound.status = 'READY';
            nextRound.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para el siguiente duelo)';
          } else {
            nextRound.status = 'WAITING';
            nextRound.statusMsg = 'Esperando rival en la mesa de Coin Flip...';
          }
          broadcastCoinState(io, coinId);
        }
      }, 4500);
    }
  }, 4200);
}

function startCoinVersusFlip(io, coinId = 'coin') {
  const c = getOrCreateCoinState(coinId);
  const playerList = Object.values(c.players || {});
  if (playerList.length < 2) return;

  playerList.sort((a, b) => (a.seatIndex || 0) - (b.seatIndex || 0));
  const p1 = playerList[0]; // Seat 0 -> CARA
  const p2 = playerList[1]; // Seat 1 -> CRUZ

  c.status = 'FLIPPING';
  c.flipId++;
  c.statusMsg = '🪙 ¡Lanzando moneda 3D al aire!';

  const outcome = Math.random() < 0.5 ? 'cara' : 'cruz';

  let winnerId = null;
  let winnerName = null;

  if (outcome === 'cara') {
    winnerId = p1.id;
    winnerName = p1.name;
  } else {
    winnerId = p2.id;
    winnerName = p2.name;
  }

  const resultPayload = {
    coinId,
    flipId: c.flipId,
    isSolo: false,
    outcome,
    player1: { id: p1.id, name: p1.name, seatIndex: p1.seatIndex, choice: 'cara' },
    player2: { id: p2.id, name: p2.name, seatIndex: p2.seatIndex, choice: 'cruz' },
    winnerId,
    winnerName,
    finalBet: c.finalBet || 50,
    pot: (c.finalBet || 50) * 2
  };

  c.result = resultPayload;

  io.to(`coin:${coinId}`).emit('coinFlip', resultPayload);
  io.emit('coinFlip', resultPayload);
  broadcastCoinState(io, coinId);

  setTimeout(() => {
    if (coinTables[coinId]) {
      const room = coinTables[coinId];
      room.status = 'RESULT';
      room.statusMsg = `🏆 ¡Salió ${outcome.toUpperCase()}! ${winnerName} gana el bote de $${room.pot}`;
      broadcastCoinState(io, coinId);
      io.to(`coin:${coinId}`).emit('coinResult', resultPayload);
      io.emit('coinResult', resultPayload);

      setTimeout(() => {
        if (coinTables[coinId]) {
          const nextRound = coinTables[coinId];
          nextRound.status = 'WAITING';
          nextRound.readyPlayers = {};
          nextRound.result = null;
          const pCount = Object.keys(nextRound.players).length;
          if (pCount >= 2) {
            nextRound.status = 'READY';
            nextRound.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para el siguiente duelo)';
          } else {
            nextRound.status = 'WAITING';
            nextRound.statusMsg = 'Esperando rival en la mesa de Coin Flip...';
          }
          broadcastCoinState(io, coinId);
        }
      }, 4500);
    }
  }, 4200);
}

function handleCoinDisconnect(io, socket) {
  for (const coinId in coinTables) {
    const c = coinTables[coinId];
    if (c && c.players && c.players[socket.id]) {
      delete c.players[socket.id];
      if (c.readyPlayers) delete c.readyPlayers[socket.id];

      const totalPlayers = Object.keys(c.players).length;
      if (totalPlayers === 0) {
        delete coinTables[coinId];
      } else {
        c.status = 'WAITING';
        c.statusMsg = 'Un jugador se ha desconectado. Esperando nuevo rival...';
        c.readyPlayers = {};
        broadcastCoinState(io, coinId);
      }
    }
  }
}

function setupCoinSocketEvents(io, socket, players) {
  socket.on('coinJoin', (data) => {
    const coinId = (data && data.coinId) ? data.coinId : 'coin';
    socket.join(`coin:${coinId}`);
    socket.currentCoinId = coinId;

    const c = getOrCreateCoinState(coinId);
    const pName = (data && data.name) || (players[socket.id] && players[socket.id].name) || 'Jugador';
    const sIdx = (data && typeof data.seatIndex === 'number') ? data.seatIndex : 0;
    const pChoice = (sIdx === 1) ? 'cruz' : 'cara';

    // Clean up stale disconnected sockets
    for (const sId in c.players) {
      if (!players[sId]) {
        delete c.players[sId];
        if (c.readyPlayers) delete c.readyPlayers[sId];
      }
    }

    c.players[socket.id] = {
      id: socket.id,
      name: pName,
      seatIndex: sIdx,
      choice: pChoice,
      bet: c.finalBet || 50
    };

    const totalPlayers = Object.keys(c.players).length;
    if (totalPlayers >= 2) {
      c.status = 'READY';
      const totalReady = Object.keys(c.readyPlayers || {}).length;
      c.statusMsg = `👥 2 en Mesa · ⏳ ${totalReady}/2 Listos (Pulsad LISTO para iniciar el duelo)`;
    } else {
      c.status = 'WAITING';
      c.statusMsg = 'Esperando rival en el otro asiento de Coin Flip...';
    }

    broadcastCoinState(io, coinId);
  });

  socket.on('coinLeave', (data) => {
    const coinId = (data && data.coinId) ? data.coinId : (socket.currentCoinId || 'coin');
    if (coinId && coinTables[coinId]) {
      const c = coinTables[coinId];
      delete c.players[socket.id];
      if (c.readyPlayers) delete c.readyPlayers[socket.id];

      socket.leave(`coin:${coinId}`);
      delete socket.currentCoinId;

      const totalPlayers = Object.keys(c.players).length;
      if (totalPlayers === 0) {
        delete coinTables[coinId];
      } else {
        c.status = 'WAITING';
        c.statusMsg = 'El rival se ha levantado. Esperando nuevo jugador...';
        c.readyPlayers = {};
        broadcastCoinState(io, coinId);
      }
    }
  });

  socket.on('coinReady', (data) => {
    const coinId = (data && data.coinId) ? data.coinId : (socket.currentCoinId || 'coin');
    if (!coinId || !coinTables[coinId]) return;

    const c = coinTables[coinId];
    if (c.status === 'FLIPPING' || c.status === 'RESULT') return;

    const betAmount = roundMoney(data.bet || data.amount || 50);
    if (betAmount > 0) {
      c.finalBet = betAmount;
      c.pot = Math.round(betAmount * 2 * 100) / 100;
    }

    if (!c.readyPlayers) c.readyPlayers = {};
    c.readyPlayers[socket.id] = true;

    checkAndTriggerCoinFlip(io, coinId);
  });

  socket.on('coinUnready', (data) => {
    const coinId = (data && data.coinId) ? data.coinId : (socket.currentCoinId || 'coin');
    if (!coinId || !coinTables[coinId]) return;

    const c = coinTables[coinId];
    if (c.status === 'FLIPPING' || c.status === 'RESULT') return;

    if (c.readyPlayers && c.readyPlayers[socket.id]) {
      delete c.readyPlayers[socket.id];
    }

    checkAndTriggerCoinFlip(io, coinId);
  });
}

module.exports = {
  coinTables,
  getOrCreateCoinState,
  broadcastCoinState,
  startCoinVersusFlip,
  handleCoinDisconnect,
  setupCoinSocketEvents
};
