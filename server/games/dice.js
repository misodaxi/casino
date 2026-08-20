// ============================================================
// AUTHORITATIVE MULTIPLAYER DICE ENGINE (SERVER)
// ============================================================

const { roundMoney } = require('../state');

const diceTables = {}; // diceId -> state object

function getOrCreateDiceState(diceId = 'dice') {
  if (!diceTables[diceId]) {
    diceTables[diceId] = {
      diceId: diceId,
      players: {}, // socketId -> { id, name, seatIndex, bet }
      readyPlayers: {}, // socketId -> true
      status: 'WAITING', // 'WAITING' | 'READY' | 'ROLLING' | 'RESULT'
      finalBet: 50,
      pot: 100,
      turn: null,
      statusMsg: 'Esperando a que se siente un jugador...',
      result: null,
      rollId: 0
    };
  }
  return diceTables[diceId];
}

function broadcastDiceState(io, diceId = 'dice') {
  const d = getOrCreateDiceState(diceId);
  const playerList = Object.values(d.players || {});
  const totalPlayers = playerList.length;
  const readyList = Object.keys(d.readyPlayers || {});
  const totalReady = readyList.length;

  playerList.sort((a, b) => (a.seatIndex || 0) - (b.seatIndex || 0));
  const p1 = playerList[0] || null;
  const p2 = playerList[1] || null;

  const payload = {
    diceId: d.diceId,
    status: d.status,
    players: d.players || {},
    player1: p1,
    player2: p2,
    readyPlayers: d.readyPlayers || {},
    totalPlayers,
    totalReady,
    finalBet: d.finalBet || 50,
    pot: (d.finalBet || 50) * 2,
    statusMsg: d.statusMsg,
    result: d.result,
    rollId: d.rollId
  };

  io.to(`dice:${diceId}`).emit('diceState', payload);
  io.emit('diceState', payload);
  return payload;
}

function checkAndTriggerDiceRoll(io, diceId = 'dice') {
  const d = getOrCreateDiceState(diceId);
  if (d.status === 'ROLLING' || d.status === 'RESULT') return;

  const playerList = Object.values(d.players || {});
  const totalPlayers = playerList.length;
  const totalReady = Object.keys(d.readyPlayers || {}).length;

  if (totalPlayers >= 2) {
    if (totalReady >= 2) {
      startDiceVersusRoll(io, diceId);
    } else {
      d.status = 'READY';
      if (totalReady === 1) {
        playerList.sort((a, b) => (a.seatIndex || 0) - (b.seatIndex || 0));
        const readyPlayer = playerList.find(p => d.readyPlayers[p.id]);
        const readyName = readyPlayer ? readyPlayer.name : 'Jugador';
        d.statusMsg = `👥 2 en Mesa · ⏳ 1/2 Listos (${readyName} está listo 👍)`;
      } else {
        d.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para jugar)';
      }
      broadcastDiceState(io, diceId);
    }
  } else if (totalPlayers === 1) {
    if (totalReady >= 1) {
      startDiceSoloRoll(io, diceId);
    } else {
      d.status = 'WAITING';
      d.statusMsg = 'Esperando rival o pulsa LISTO para jugar vs la Casa';
      broadcastDiceState(io, diceId);
    }
  } else {
    d.status = 'WAITING';
    d.statusMsg = 'Esperando a que se siente un jugador...';
    broadcastDiceState(io, diceId);
  }
}

function startDiceSoloRoll(io, diceId = 'dice') {
  const d = getOrCreateDiceState(diceId);
  const playerList = Object.values(d.players || {});
  if (playerList.length === 0) return;
  const soloPlayer = playerList[0];

  d.status = 'ROLLING';
  d.rollId++;
  d.statusMsg = '🎲 ¡Lanzando dados vs La Casa!';

  const d1_1 = Math.floor(Math.random() * 6) + 1;
  const d1_2 = Math.floor(Math.random() * 6) + 1;
  const total1 = d1_1 + d1_2;

  const d2_1 = Math.floor(Math.random() * 6) + 1;
  const d2_2 = Math.floor(Math.random() * 6) + 1;
  const total2 = d2_1 + d2_2;

  let winnerId = null;
  let winnerName = null;
  let isTie = false;

  if (total1 > total2) {
    winnerId = soloPlayer.id;
    winnerName = soloPlayer.name;
  } else if (total2 > total1) {
    winnerId = 'house';
    winnerName = 'La Casa';
  } else {
    isTie = true;
  }

  const resultPayload = {
    diceId,
    rollId: d.rollId,
    isSolo: true,
    player1Dice: [d1_1, d1_2],
    player2Dice: [d2_1, d2_2],
    player1Total: total1,
    player2Total: total2,
    player1: { id: soloPlayer.id, name: soloPlayer.name, seatIndex: soloPlayer.seatIndex },
    player2: { id: 'house', name: 'La Casa', seatIndex: 1 },
    winnerId,
    winnerName,
    isTie,
    finalBet: d.finalBet || 50,
    pot: (d.finalBet || 50) * 2
  };

  d.result = resultPayload;

  io.to(`dice:${diceId}`).emit('diceRoll', resultPayload);
  io.emit('diceRoll', resultPayload);
  broadcastDiceState(io, diceId);

  setTimeout(() => {
    if (diceTables[diceId]) {
      const room = diceTables[diceId];
      room.status = 'RESULT';
      if (isTie) {
        room.statusMsg = `🎲 ¡EMPATE (${total1} a ${total2})! Apuesta devuelta.`;
      } else if (winnerId === soloPlayer.id) {
        room.statusMsg = `🏆 ¡Ganaste a La Casa (${total1} vs ${total2})! +$${room.finalBet}`;
      } else {
        room.statusMsg = `💀 La Casa gana (${total2} vs ${total1}). -$${room.finalBet}`;
      }
      broadcastDiceState(io, diceId);
      io.to(`dice:${diceId}`).emit('diceResult', resultPayload);
      io.emit('diceResult', resultPayload);

      setTimeout(() => {
        if (diceTables[diceId]) {
          const nextRound = diceTables[diceId];
          nextRound.status = 'WAITING';
          nextRound.readyPlayers = {};
          nextRound.result = null;
          const pCount = Object.keys(nextRound.players).length;
          if (pCount >= 2) {
            nextRound.status = 'READY';
            nextRound.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para el siguiente duelo)';
          } else {
            nextRound.status = 'WAITING';
            nextRound.statusMsg = 'Esperando rival en la mesa de dados...';
          }
          broadcastDiceState(io, diceId);
        }
      }, 4500);
    }
  }, 4200);
}

function startDiceVersusRoll(io, diceId = 'dice') {
  const d = getOrCreateDiceState(diceId);
  const playerList = Object.values(d.players || {});
  if (playerList.length < 2) return;

  playerList.sort((a, b) => (a.seatIndex || 0) - (b.seatIndex || 0));
  const p1 = playerList[0];
  const p2 = playerList[1];

  d.status = 'ROLLING';
  d.rollId++;
  d.statusMsg = '🎲 ¡Lanzando dados 3D en el tapete!';

  const d1_1 = Math.floor(Math.random() * 6) + 1;
  const d1_2 = Math.floor(Math.random() * 6) + 1;
  const total1 = d1_1 + d1_2;

  const d2_1 = Math.floor(Math.random() * 6) + 1;
  const d2_2 = Math.floor(Math.random() * 6) + 1;
  const total2 = d2_1 + d2_2;

  let winnerId = null;
  let winnerName = null;
  let isTie = false;

  if (total1 > total2) {
    winnerId = p1.id;
    winnerName = p1.name;
  } else if (total2 > total1) {
    winnerId = p2.id;
    winnerName = p2.name;
  } else {
    isTie = true;
  }

  const resultPayload = {
    diceId,
    rollId: d.rollId,
    isSolo: false,
    player1Dice: [d1_1, d1_2],
    player2Dice: [d2_1, d2_2],
    player1Total: total1,
    player2Total: total2,
    player1: { id: p1.id, name: p1.name, seatIndex: p1.seatIndex },
    player2: { id: p2.id, name: p2.name, seatIndex: p2.seatIndex },
    winnerId,
    winnerName,
    isTie,
    finalBet: d.finalBet || 50,
    pot: (d.finalBet || 50) * 2
  };

  d.result = resultPayload;

  io.to(`dice:${diceId}`).emit('diceRoll', resultPayload);
  io.emit('diceRoll', resultPayload);
  broadcastDiceState(io, diceId);

  setTimeout(() => {
    if (diceTables[diceId]) {
      const room = diceTables[diceId];
      room.status = 'RESULT';
      if (isTie) {
        room.statusMsg = `🎲 ¡EMPATE (${total1} a ${total2})! Apuestas devueltas.`;
      } else {
        room.statusMsg = `🏆 ¡${winnerName} gana el bote de $${room.pot} (${Math.max(total1, total2)} vs ${Math.min(total1, total2)})!`;
      }
      broadcastDiceState(io, diceId);
      io.to(`dice:${diceId}`).emit('diceResult', resultPayload);
      io.emit('diceResult', resultPayload);

      setTimeout(() => {
        if (diceTables[diceId]) {
          const nextRound = diceTables[diceId];
          nextRound.status = 'WAITING';
          nextRound.readyPlayers = {};
          nextRound.result = null;
          const pCount = Object.keys(nextRound.players).length;
          if (pCount >= 2) {
            nextRound.status = 'READY';
            nextRound.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para el siguiente duelo)';
          } else {
            nextRound.status = 'WAITING';
            nextRound.statusMsg = 'Esperando rival en la mesa de dados...';
          }
          broadcastDiceState(io, diceId);
        }
      }, 4500);
    }
  }, 4200);
}

function handleDiceDisconnect(io, socket) {
  for (const diceId in diceTables) {
    const d = diceTables[diceId];
    if (d && d.players && d.players[socket.id]) {
      delete d.players[socket.id];
      if (d.readyPlayers) delete d.readyPlayers[socket.id];

      const totalPlayers = Object.keys(d.players).length;
      if (totalPlayers === 0) {
        delete diceTables[diceId];
      } else {
        d.status = 'WAITING';
        d.statusMsg = 'Un jugador se ha desconectado. Esperando nuevo rival...';
        d.readyPlayers = {};
        broadcastDiceState(io, diceId);
      }
    }
  }
}

function setupDiceSocketEvents(io, socket, players) {
  socket.on('diceJoin', (data) => {
    const diceId = (data && data.diceId) ? data.diceId : 'dice';
    socket.join(`dice:${diceId}`);
    socket.currentDiceId = diceId;

    const d = getOrCreateDiceState(diceId);
    const pName = (data && data.name) || (players[socket.id] && players[socket.id].name) || 'Jugador';
    const sIdx = (data && typeof data.seatIndex === 'number') ? data.seatIndex : 0;

    // Clean up stale disconnected sockets
    for (const sId in d.players) {
      if (!players[sId]) {
        delete d.players[sId];
        if (d.readyPlayers) delete d.readyPlayers[sId];
      }
    }

    d.players[socket.id] = {
      id: socket.id,
      name: pName,
      seatIndex: sIdx,
      bet: d.finalBet || 50
    };

    const totalPlayers = Object.keys(d.players).length;
    if (totalPlayers >= 2) {
      d.status = 'READY';
      const totalReady = Object.keys(d.readyPlayers || {}).length;
      d.statusMsg = `👥 2 en Mesa · ⏳ ${totalReady}/2 Listos (Pulsad LISTO para iniciar el duelo)`;
    } else {
      d.status = 'WAITING';
      d.statusMsg = 'Esperando rival en el otro asiento de dados...';
    }

    broadcastDiceState(io, diceId);
  });

  socket.on('diceLeave', (data) => {
    const diceId = (data && data.diceId) ? data.diceId : (socket.currentDiceId || 'dice');
    if (diceId && diceTables[diceId]) {
      const d = diceTables[diceId];
      delete d.players[socket.id];
      if (d.readyPlayers) delete d.readyPlayers[socket.id];

      socket.leave(`dice:${diceId}`);
      delete socket.currentDiceId;

      const totalPlayers = Object.keys(d.players).length;
      if (totalPlayers === 0) {
        delete diceTables[diceId];
      } else {
        d.status = 'WAITING';
        d.statusMsg = 'El rival se ha levantado. Esperando nuevo jugador...';
        d.readyPlayers = {};
        broadcastDiceState(io, diceId);
      }
    }
  });

  socket.on('diceReady', (data) => {
    const diceId = (data && data.diceId) ? data.diceId : (socket.currentDiceId || 'dice');
    if (!diceId || !diceTables[diceId]) return;

    const d = diceTables[diceId];
    if (d.status === 'ROLLING' || d.status === 'RESULT') return;

    const betAmount = roundMoney(data.bet || data.amount || 50);
    if (betAmount > 0) {
      d.finalBet = betAmount;
      d.pot = Math.round(betAmount * 2 * 100) / 100;
    }

    if (!d.readyPlayers) d.readyPlayers = {};
    d.readyPlayers[socket.id] = true;

    checkAndTriggerDiceRoll(io, diceId);
  });

  socket.on('diceUnready', (data) => {
    const diceId = (data && data.diceId) ? data.diceId : (socket.currentDiceId || 'dice');
    if (!diceId || !diceTables[diceId]) return;

    const d = diceTables[diceId];
    if (d.status === 'ROLLING' || d.status === 'RESULT') return;

    if (d.readyPlayers && d.readyPlayers[socket.id]) {
      delete d.readyPlayers[socket.id];
    }

    checkAndTriggerDiceRoll(io, diceId);
  });
}

module.exports = {
  diceTables,
  getOrCreateDiceState,
  broadcastDiceState,
  startDiceVersusRoll,
  handleDiceDisconnect,
  setupDiceSocketEvents
};
