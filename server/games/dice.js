// ============================================================
// AUTHORITATIVE MULTIPLAYER DICE 1V1 ENGINE (SERVER)
// ============================================================

const { roundMoney } = require('../state');

const diceVersusMatches = {}; // matchId -> match state object

function getOrCreateDiceVersusState(matchId) {
  if (!diceVersusMatches[matchId]) {
    diceVersusMatches[matchId] = {
      matchId: matchId,
      playerA: null, // { id, name, bet, roll }
      playerB: null, // { id, name, bet, roll }
      status: 'WAITING', // 'WAITING' | 'BET_PROPOSED' | 'ROLLING' | 'RESULT'
      pot: 0,
      turn: null,
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
    playerA: m.playerA,
    playerB: m.playerB,
    pot: m.pot,
    turn: m.turn,
    lastResult: m.lastResult,
    rollId: m.rollId
  };
  io.to(`dice:${matchId}`).emit('diceVersusState', payload);
  return payload;
}

function startDiceVersusRoll(io, matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  if (!m.playerA || !m.playerB) return;

  m.status = 'ROLLING';
  m.rollId++;

  const d1_A = Math.floor(Math.random() * 6) + 1;
  const d2_A = Math.floor(Math.random() * 6) + 1;
  const totalA = d1_A + d2_A;

  const d1_B = Math.floor(Math.random() * 6) + 1;
  const d2_B = Math.floor(Math.random() * 6) + 1;
  const totalB = d1_B + d2_B;

  let winnerId = null;
  let winnerName = null;
  let isTie = false;

  if (totalA > totalB) {
    winnerId = m.playerA.id;
    winnerName = m.playerA.name;
  } else if (totalB > totalA) {
    winnerId = m.playerB.id;
    winnerName = m.playerB.name;
  } else {
    isTie = true;
  }

  m.lastResult = {
    matchId: m.matchId,
    rollId: m.rollId,
    playerA: { id: m.playerA.id, name: m.playerA.name, d1: d1_A, d2: d2_A, total: totalA },
    playerB: { id: m.playerB.id, name: m.playerB.name, d1: d1_B, d2: d2_B, total: totalB },
    winnerId,
    winnerName,
    isTie,
    pot: m.pot
  };

  io.to(`dice:${matchId}`).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`dice:${matchId}`).emit('diceVersusRollResult', m.lastResult);
  broadcastDiceVersusState(io, matchId);

  setTimeout(() => {
    if (diceVersusMatches[matchId]) {
      const liveMatch = diceVersusMatches[matchId];
      liveMatch.status = 'RESULT';
      broadcastDiceVersusState(io, matchId);

      setTimeout(() => {
        if (diceVersusMatches[matchId]) {
          const finished = diceVersusMatches[matchId];
          finished.status = 'WAITING';
          finished.pot = 0;
          if (finished.playerA) finished.playerA.bet = 0;
          if (finished.playerB) finished.playerB.bet = 0;
          finished.turn = null;
          broadcastDiceVersusState(io, matchId);
          io.to(`dice:${matchId}`).emit('diceVersusSettled', {
            matchId,
            winnerId,
            winnerName,
            isTie,
            pot: m.pot
          });
        }
      }, 4000);
    }
  }, 3500);
}

function handleDiceVersusDisconnect(io, socket) {
  const matchId = socket.currentDiceMatchId;
  if (matchId && diceVersusMatches[matchId]) {
    const match = diceVersusMatches[matchId];
    if (match.playerA && match.playerA.id === socket.id) match.playerA = null;
    if (match.playerB && match.playerB.id === socket.id) match.playerB = null;

    if (!match.playerA && !match.playerB) {
      delete diceVersusMatches[matchId];
    } else {
      match.status = 'WAITING';
      match.pot = 0;
      if (match.playerA) match.playerA.bet = 0;
      if (match.playerB) match.playerB.bet = 0;
      broadcastDiceVersusState(io, matchId);
    }
  }
}

function setupDiceSocketEvents(io, socket, players) {
  socket.on('diceVersusJoin', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : 'dice-table-1';
    socket.join(`dice:${matchId}`);
    socket.currentDiceMatchId = matchId;

    const m = getOrCreateDiceVersusState(matchId);
    const pName = (players[socket.id] && players[socket.id].name) || 'Jugador';

    if (!m.playerA || m.playerA.id === socket.id) {
      m.playerA = { id: socket.id, name: pName, bet: 0, ready: false };
    } else if (!m.playerB || m.playerB.id === socket.id) {
      m.playerB = { id: socket.id, name: pName, bet: 0, ready: false };
    } else {
      socket.emit('diceVersusError', { message: 'La mesa de dados 1v1 está llena.' });
      return;
    }

    broadcastDiceVersusState(io, matchId);
  });

  socket.on('diceVersusLeave', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (matchId && diceVersusMatches[matchId]) {
      const m = diceVersusMatches[matchId];
      if (m.playerA && m.playerA.id === socket.id) m.playerA = null;
      if (m.playerB && m.playerB.id === socket.id) m.playerB = null;

      socket.leave(`dice:${matchId}`);
      delete socket.currentDiceMatchId;

      if (!m.playerA && !m.playerB) {
        delete diceVersusMatches[matchId];
      } else {
        m.status = 'WAITING';
        m.pot = 0;
        if (m.playerA) m.playerA.bet = 0;
        if (m.playerB) m.playerB.bet = 0;
        broadcastDiceVersusState(io, matchId);
      }
    }
  });

  socket.on('diceVersusBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    const amt = roundMoney(data.amount);
    if (amt <= 0) return;

    if (m.status !== 'WAITING' && m.status !== 'RESULT') return;

    if (m.playerA && m.playerA.id === socket.id) {
      m.playerA.bet = amt;
      m.status = 'BET_PROPOSED';
      m.turn = m.playerB ? m.playerB.id : null;
      broadcastDiceVersusState(io, matchId);
    } else if (m.playerB && m.playerB.id === socket.id) {
      m.playerB.bet = amt;
      m.status = 'BET_PROPOSED';
      m.turn = m.playerA ? m.playerA.id : null;
      broadcastDiceVersusState(io, matchId);
    }
  });

  socket.on('diceVersusAcceptBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status !== 'BET_PROPOSED') return;

    if (m.playerA && m.playerA.id === socket.id && m.playerB && m.playerB.bet > 0) {
      m.playerA.bet = m.playerB.bet;
      m.pot = Math.round(m.playerA.bet * 2 * 100) / 100;
      startDiceVersusRoll(io, matchId);
    } else if (m.playerB && m.playerB.id === socket.id && m.playerA && m.playerA.bet > 0) {
      m.playerB.bet = m.playerA.bet;
      m.pot = Math.round(m.playerB.bet * 2 * 100) / 100;
      startDiceVersusRoll(io, matchId);
    }
  });

  socket.on('diceVersusRejectBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status === 'BET_PROPOSED') {
      m.status = 'WAITING';
      if (m.playerA) m.playerA.bet = 0;
      if (m.playerB) m.playerB.bet = 0;
      broadcastDiceVersusState(io, matchId);
    }
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
