// ============================================================
// AUTHORITATIVE MULTIPLAYER DICE 1V1 ENGINE WITH READY SYSTEM
// ============================================================

const { roundMoney } = require('../state');

const diceVersusMatches = {}; // matchId -> match state object

function getOrCreateDiceVersusState(matchId) {
  if (!diceVersusMatches[matchId]) {
    diceVersusMatches[matchId] = {
      matchId: matchId,
      player1: null, // { id, name, seatIndex, bet }
      player2: null, // { id, name, seatIndex, bet }
      readyPlayers: {}, // { [socketId]: true }
      status: 'WAITING', // 'WAITING' | 'READY' | 'ROLLING' | 'SETTLED'
      finalBet: 50,
      pot: 100,
      turn: null,
      statusMsg: 'Esperando rival en la mesa de dados...',
      lastResult: null,
      rollId: 0
    };
  }
  return diceVersusMatches[matchId];
}

function broadcastDiceVersusState(io, matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  const readyCount = Object.keys(m.readyPlayers || {}).filter(id => (m.player1 && m.player1.id === id) || (m.player2 && m.player2.id === id)).length;
  const totalPlayers = (m.player1 ? 1 : 0) + (m.player2 ? 1 : 0);

  const payload = {
    matchId: m.matchId,
    status: m.status,
    player1: m.player1,
    player2: m.player2,
    readyPlayers: m.readyPlayers || {},
    readyCount: readyCount,
    totalPlayers: totalPlayers,
    finalBet: m.finalBet || 50,
    pot: m.pot || 100,
    turn: m.turn,
    statusMsg: m.statusMsg,
    lastResult: m.lastResult,
    rollId: m.rollId
  };

  io.to(`dice:${matchId}`).emit('diceVersusState', payload);
  if (m.player1 && m.player1.id) io.to(m.player1.id).emit('diceVersusState', payload);
  if (m.player2 && m.player2.id) io.to(m.player2.id).emit('diceVersusState', payload);
  return payload;
}

function checkAndTriggerDiceRoll(io, matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  if (m.status === 'ROLLING') return;

  const p1 = m.player1;
  const p2 = m.player2;

  if (p1 && p2) {
    const isP1Ready = !!(m.readyPlayers && m.readyPlayers[p1.id]);
    const isP2Ready = !!(m.readyPlayers && m.readyPlayers[p2.id]);

    if (isP1Ready && isP2Ready) {
      startDiceVersusRoll(io, matchId);
    } else {
      const readyCount = (isP1Ready ? 1 : 0) + (isP2Ready ? 1 : 0);
      m.status = 'READY';
      if (readyCount === 1) {
        const readyName = isP1Ready ? p1.name : p2.name;
        m.statusMsg = `👥 2 en Mesa · ⏳ 1/2 Listos (${readyName} está listo 👍)`;
      } else {
        m.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para jugar)';
      }
      broadcastDiceVersusState(io, matchId);
    }
  } else if (p1 || p2) {
    const soloPlayer = p1 || p2;
    if (m.readyPlayers && m.readyPlayers[soloPlayer.id]) {
      startDiceSoloRoll(io, matchId, soloPlayer);
    } else {
      m.status = 'WAITING';
      m.statusMsg = 'Esperando rival en la mesa de dados...';
      broadcastDiceVersusState(io, matchId);
    }
  }
}

function startDiceSoloRoll(io, matchId, soloPlayer) {
  const m = getOrCreateDiceVersusState(matchId);
  m.status = 'ROLLING';
  m.rollId++;
  m.statusMsg = '🎲 ¡Lanzando dados vs La Casa!';

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
    matchId: m.matchId,
    rollId: m.rollId,
    isSolo: true,
    player1Dice: [d1_1, d1_2],
    player2Dice: [d2_1, d2_2],
    player1Total: total1,
    player2Total: total2,
    player1: { id: soloPlayer.id, name: soloPlayer.name },
    player2: { id: 'house', name: 'La Casa' },
    winnerId,
    winnerName,
    isTie,
    finalBet: m.finalBet || 50,
    pot: (m.finalBet || 50) * 2
  };

  m.lastResult = resultPayload;

  io.to(`dice:${matchId}`).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`dice:${matchId}`).emit('diceVersusRollResult', resultPayload);
  if (soloPlayer && soloPlayer.id) {
    io.to(soloPlayer.id).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
    io.to(soloPlayer.id).emit('diceVersusRollResult', resultPayload);
  }
  broadcastDiceVersusState(io, matchId);

  setTimeout(() => {
    if (diceVersusMatches[matchId]) {
      const live = diceVersusMatches[matchId];
      live.status = 'SETTLED';
      if (isTie) {
        live.statusMsg = `🎲 ¡EMPATE (${total1} a ${total2})! Apuesta devuelta.`;
      } else if (winnerId === soloPlayer.id) {
        live.statusMsg = `🏆 ¡Ganaste a La Casa (${total1} vs ${total2})! +$${live.finalBet}`;
      } else {
        live.statusMsg = `💀 La Casa gana (${total2} vs ${total1}). -$${live.finalBet}`;
      }
      broadcastDiceVersusState(io, matchId);

      const settlePayload = {
        matchId,
        isSolo: true,
        winnerId,
        winnerName,
        isTie,
        finalBet: live.finalBet,
        pot: (live.finalBet || 50) * 2,
        player1Id: soloPlayer.id,
        player2Id: 'house'
      };

      io.to(`dice:${matchId}`).emit('diceVersusSettled', settlePayload);
      if (soloPlayer && soloPlayer.id) io.to(soloPlayer.id).emit('diceVersusSettled', settlePayload);

      setTimeout(() => {
        if (diceVersusMatches[matchId]) {
          const finished = diceVersusMatches[matchId];
          finished.status = 'WAITING';
          finished.readyPlayers = {};
          finished.statusMsg = 'Esperando rival en la mesa de dados...';
          broadcastDiceVersusState(io, matchId);
        }
      }, 4500);
    }
  }, 4200);
}

function startDiceVersusRoll(io, matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  if (!m.player1 || !m.player2) return;

  m.status = 'ROLLING';
  m.rollId++;
  m.statusMsg = '🎲 ¡Lanzando dados 3D en el tapete!';

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
    winnerId = m.player1.id;
    winnerName = m.player1.name;
  } else if (total2 > total1) {
    winnerId = m.player2.id;
    winnerName = m.player2.name;
  } else {
    isTie = true;
  }

  const resultPayload = {
    matchId: m.matchId,
    rollId: m.rollId,
    isSolo: false,
    player1Dice: [d1_1, d1_2],
    player2Dice: [d2_1, d2_2],
    player1Total: total1,
    player2Total: total2,
    player1: { id: m.player1.id, name: m.player1.name },
    player2: { id: m.player2.id, name: m.player2.name },
    winnerId,
    winnerName,
    isTie,
    finalBet: m.finalBet || 50,
    pot: m.pot || 100
  };

  m.lastResult = resultPayload;

  io.to(`dice:${matchId}`).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`dice:${matchId}`).emit('diceVersusRollResult', resultPayload);
  if (m.player1 && m.player1.id) {
    io.to(m.player1.id).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
    io.to(m.player1.id).emit('diceVersusRollResult', resultPayload);
  }
  if (m.player2 && m.player2.id) {
    io.to(m.player2.id).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
    io.to(m.player2.id).emit('diceVersusRollResult', resultPayload);
  }
  broadcastDiceVersusState(io, matchId);

  // After 4.2 seconds of 3D physics roll animation, settle results
  setTimeout(() => {
    if (diceVersusMatches[matchId]) {
      const live = diceVersusMatches[matchId];
      live.status = 'SETTLED';
      if (isTie) {
        live.statusMsg = `🎲 ¡EMPATE (${total1} a ${total2})! Apuestas devueltas.`;
      } else {
        live.statusMsg = `🏆 ¡${winnerName} gana el bote de $${live.pot} (${Math.max(total1, total2)} vs ${Math.min(total1, total2)})!`;
      }
      broadcastDiceVersusState(io, matchId);

      const settlePayload = {
        matchId,
        isSolo: false,
        winnerId,
        winnerName,
        isTie,
        finalBet: live.finalBet,
        pot: live.pot,
        player1Id: live.player1 ? live.player1.id : null,
        player2Id: live.player2 ? live.player2.id : null
      };

      io.to(`dice:${matchId}`).emit('diceVersusSettled', settlePayload);
      if (live.player1 && live.player1.id) io.to(live.player1.id).emit('diceVersusSettled', settlePayload);
      if (live.player2 && live.player2.id) io.to(live.player2.id).emit('diceVersusSettled', settlePayload);

      // Reset to ready for next match after 4.5 seconds
      setTimeout(() => {
        if (diceVersusMatches[matchId]) {
          const finished = diceVersusMatches[matchId];
          finished.readyPlayers = {};
          if (finished.player1 && finished.player2) {
            finished.status = 'READY';
            finished.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para el siguiente duelo)';
          } else {
            finished.status = 'WAITING';
            finished.statusMsg = 'Esperando rival en la mesa de dados...';
          }
          broadcastDiceVersusState(io, matchId);
        }
      }, 4500);
    }
  }, 4200);
}

function handleDiceVersusDisconnect(io, socket) {
  for (const matchId in diceVersusMatches) {
    const match = diceVersusMatches[matchId];
    if (match) {
      let changed = false;
      if (match.readyPlayers && match.readyPlayers[socket.id]) {
        delete match.readyPlayers[socket.id];
        changed = true;
      }
      if (match.player1 && match.player1.id === socket.id) {
        match.player1 = null;
        changed = true;
      }
      if (match.player2 && match.player2.id === socket.id) {
        match.player2 = null;
        changed = true;
      }

      if (changed) {
        if (!match.player1 && !match.player2) {
          delete diceVersusMatches[matchId];
        } else {
          match.status = 'WAITING';
          match.statusMsg = 'Un jugador se ha desconectado. Esperando nuevo rival...';
          match.readyPlayers = {};
          broadcastDiceVersusState(io, matchId);
        }
      }
    }
  }
}

function setupDiceSocketEvents(io, socket, players) {
  socket.on('diceVersusJoin', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : 'dice-versus-1';
    socket.join(`dice:${matchId}`);
    socket.currentDiceMatchId = matchId;

    const m = getOrCreateDiceVersusState(matchId);
    const pName = (data && data.name) || (players[socket.id] && players[socket.id].name) || 'Jugador';
    const sIdx = (data && typeof data.seatIndex === 'number') ? data.seatIndex : 0;

    // Clean up stale disconnected sockets
    if (m.player1 && !players[m.player1.id]) m.player1 = null;
    if (m.player2 && !players[m.player2.id]) m.player2 = null;

    if (!m.player1 || m.player1.id === socket.id) {
      m.player1 = { id: socket.id, name: pName, seatIndex: sIdx, bet: m.finalBet || 50 };
    } else if (!m.player2 || m.player2.id === socket.id) {
      m.player2 = { id: socket.id, name: pName, seatIndex: sIdx, bet: m.finalBet || 50 };
    } else {
      socket.emit('diceVersusError', { message: 'La mesa de dados 1v1 está llena (2/2 jugadores).' });
      return;
    }

    if (m.player1 && m.player2) {
      m.status = 'READY';
      m.statusMsg = '👥 2 en Mesa · ⏳ 0/2 Listos (Pulsad LISTO para iniciar el duelo)';
    } else {
      m.status = 'WAITING';
      m.statusMsg = 'Esperando rival en el otro asiento de dados...';
    }

    broadcastDiceVersusState(io, matchId);
  });

  socket.on('diceVersusLeave', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (matchId && diceVersusMatches[matchId]) {
      const m = diceVersusMatches[matchId];
      if (m.readyPlayers && m.readyPlayers[socket.id]) delete m.readyPlayers[socket.id];
      if (m.player1 && m.player1.id === socket.id) m.player1 = null;
      if (m.player2 && m.player2.id === socket.id) m.player2 = null;

      socket.leave(`dice:${matchId}`);
      delete socket.currentDiceMatchId;

      if (!m.player1 && !m.player2) {
        delete diceVersusMatches[matchId];
      } else {
        m.status = 'WAITING';
        m.statusMsg = 'El rival se ha levantado. Esperando nuevo jugador...';
        m.readyPlayers = {};
        broadcastDiceVersusState(io, matchId);
      }
    }
  });

  socket.on('diceReady', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : (socket.currentDiceMatchId || 'dice-versus-1');
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status === 'ROLLING') return;

    const betAmount = roundMoney(data.bet || data.amount || 50);
    if (betAmount > 0) {
      m.finalBet = betAmount;
      m.pot = Math.round(betAmount * 2 * 100) / 100;
    }

    if (!m.readyPlayers) m.readyPlayers = {};
    m.readyPlayers[socket.id] = true;

    checkAndTriggerDiceRoll(io, matchId);
  });

  socket.on('diceUnready', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : (socket.currentDiceMatchId || 'dice-versus-1');
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status === 'ROLLING') return;

    if (m.readyPlayers && m.readyPlayers[socket.id]) {
      delete m.readyPlayers[socket.id];
    }

    checkAndTriggerDiceRoll(io, matchId);
  });
}

module.exports = {
  diceVersusMatches,
  getOrCreateDiceVersusState,
  broadcastDiceVersusState,
  startDiceVersusRoll,
  handleDiceVersusDisconnect,
  setupDiceSocketEvents
};
