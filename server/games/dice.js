// ============================================================
// AUTHORITATIVE MULTIPLAYER DICE 1V1 ENGINE (SERVER)
// ============================================================

const { roundMoney } = require('../state');

const diceVersusMatches = {}; // matchId -> match state object

function getOrCreateDiceVersusState(matchId) {
  if (!diceVersusMatches[matchId]) {
    diceVersusMatches[matchId] = {
      matchId: matchId,
      player1: null, // { id, name, seatIndex, bet, accepted }
      player2: null, // { id, name, seatIndex, bet, accepted }
      status: 'WAITING', // 'WAITING' | 'PLAYER_2_JOINED' | 'BET_PROPOSED' | 'ROLLING' | 'SETTLED'
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
  const payload = {
    matchId: m.matchId,
    status: m.status,
    player1: m.player1,
    player2: m.player2,
    finalBet: m.finalBet,
    pot: m.pot,
    turn: m.turn,
    statusMsg: m.statusMsg,
    lastResult: m.lastResult,
    rollId: m.rollId
  };
  io.to(`dice:${matchId}`).emit('diceVersusState', payload);
  return payload;
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
    player1Dice: [d1_1, d1_2],
    player2Dice: [d2_1, d2_2],
    player1Total: total1,
    player2Total: total2,
    player1: { id: m.player1.id, name: m.player1.name },
    player2: { id: m.player2.id, name: m.player2.name },
    winnerId,
    winnerName,
    isTie,
    finalBet: m.finalBet,
    pot: m.pot
  };

  m.lastResult = resultPayload;

  io.to(`dice:${matchId}`).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`dice:${matchId}`).emit('diceVersusRollResult', resultPayload);
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

      io.to(`dice:${matchId}`).emit('diceVersusSettled', {
        matchId,
        winnerId,
        winnerName,
        isTie,
        finalBet: live.finalBet,
        pot: live.pot,
        player1Id: live.player1 ? live.player1.id : null,
        player2Id: live.player2 ? live.player2.id : null
      });

      // Reset to ready for next match after 4.5 seconds
      setTimeout(() => {
        if (diceVersusMatches[matchId]) {
          const finished = diceVersusMatches[matchId];
          if (finished.player1 && finished.player2) {
            finished.status = 'PLAYER_2_JOINED';
            finished.statusMsg = '⚔️ ¡Ambos jugadores listos! Proponed vuestra apuesta.';
            finished.player1.accepted = false;
            finished.player2.accepted = false;
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
  const matchId = socket.currentDiceMatchId;
  if (matchId && diceVersusMatches[matchId]) {
    const match = diceVersusMatches[matchId];
    if (match.player1 && match.player1.id === socket.id) match.player1 = null;
    if (match.player2 && match.player2.id === socket.id) match.player2 = null;

    if (!match.player1 && !match.player2) {
      delete diceVersusMatches[matchId];
    } else {
      match.status = 'WAITING';
      match.statusMsg = 'Un jugador se ha desconectado. Esperando nuevo rival...';
      if (match.player1) match.player1.accepted = false;
      if (match.player2) match.player2.accepted = false;
      broadcastDiceVersusState(io, matchId);
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

    if (!m.player1 || m.player1.id === socket.id) {
      m.player1 = { id: socket.id, name: pName, seatIndex: sIdx, bet: m.finalBet, accepted: false };
    } else if (!m.player2 || m.player2.id === socket.id) {
      m.player2 = { id: socket.id, name: pName, seatIndex: sIdx, bet: m.finalBet, accepted: false };
    } else {
      socket.emit('diceVersusError', { message: 'La mesa de dados 1v1 está llena (2/2 jugadores).' });
      return;
    }

    if (m.player1 && m.player2) {
      m.status = 'PLAYER_2_JOINED';
      m.statusMsg = `⚔️ ¡${m.player1.name} VS ${m.player2.name}! Proponed apuesta para tirar.`;
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
      if (m.player1 && m.player1.id === socket.id) m.player1 = null;
      if (m.player2 && m.player2.id === socket.id) m.player2 = null;

      socket.leave(`dice:${matchId}`);
      delete socket.currentDiceMatchId;

      if (!m.player1 && !m.player2) {
        delete diceVersusMatches[matchId];
      } else {
        m.status = 'WAITING';
        m.statusMsg = 'El rival se ha levantado. Esperando nuevo jugador...';
        if (m.player1) m.player1.accepted = false;
        if (m.player2) m.player2.accepted = false;
        broadcastDiceVersusState(io, matchId);
      }
    }
  });

  socket.on('diceVersusBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (!m.player1 || !m.player2) return;

    const betAmount = roundMoney(data.bet || data.amount || 50);
    if (betAmount <= 0) return;

    m.finalBet = betAmount;
    m.pot = Math.round(betAmount * 2 * 100) / 100;
    m.status = 'BET_PROPOSED';

    if (m.player1.id === socket.id) {
      m.player1.accepted = true;
      m.player2.accepted = false;
      m.turn = m.player2.id;
      m.statusMsg = `📢 ${m.player1.name} propone bote de $${m.pot} ($${betAmount} c/u). ¿Aceptas?`;
    } else if (m.player2.id === socket.id) {
      m.player2.accepted = true;
      m.player1.accepted = false;
      m.turn = m.player1.id;
      m.statusMsg = `📢 ${m.player2.name} propone bote de $${m.pot} ($${betAmount} c/u). ¿Aceptas?`;
    }

    broadcastDiceVersusState(io, matchId);
  });

  socket.on('diceVersusAcceptBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (!m.player1 || !m.player2) return;

    if (m.player1.id === socket.id) m.player1.accepted = true;
    if (m.player2.id === socket.id) m.player2.accepted = true;

    if (m.player1.accepted && m.player2.accepted) {
      startDiceVersusRoll(io, matchId);
    } else {
      broadcastDiceVersusState(io, matchId);
    }
  });

  socket.on('diceVersusRejectBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.player1) m.player1.accepted = false;
    if (m.player2) m.player2.accepted = false;
    m.status = 'PLAYER_2_JOINED';
    m.statusMsg = '❌ Apuesta rechazada. Proponed otra cifra.';
    broadcastDiceVersusState(io, matchId);
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
