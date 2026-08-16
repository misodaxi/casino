// ============================================================
// AUTHORITATIVE MULTIPLAYER COIN FLIP 1V1 ENGINE (SERVER)
// ============================================================

const { roundMoney } = require('../state');

const coinVersusMatches = {}; // matchId -> match state object

function getOrCreateCoinVersusState(matchId) {
  if (!coinVersusMatches[matchId]) {
    coinVersusMatches[matchId] = {
      matchId: matchId,
      playerA: null, // { id, name, bet, choice: 'HEADS' | 'TAILS' }
      playerB: null, // { id, name, bet, choice: 'HEADS' | 'TAILS' }
      status: 'WAITING', // 'WAITING' | 'BET_PROPOSED' | 'FLIPPING' | 'RESULT'
      pot: 0,
      turn: null,
      lastResult: null,
      rollId: 0
    };
  }
  return coinVersusMatches[matchId];
}

function broadcastCoinVersusState(io, matchId) {
  const m = getOrCreateCoinVersusState(matchId);
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
  io.to(`coin:${matchId}`).emit('coinVersusState', payload);
  return payload;
}

function startCoinVersusFlip(io, matchId) {
  const m = getOrCreateCoinVersusState(matchId);
  if (!m.playerA || !m.playerB) return;

  m.status = 'FLIPPING';
  m.rollId++;

  const flipOutcome = Math.random() < 0.5 ? 'HEADS' : 'TAILS';

  let winnerId = null;
  let winnerName = null;

  if (m.playerA.choice === flipOutcome) {
    winnerId = m.playerA.id;
    winnerName = m.playerA.name;
  } else {
    winnerId = m.playerB.id;
    winnerName = m.playerB.name;
  }

  m.lastResult = {
    matchId: m.matchId,
    rollId: m.rollId,
    outcome: flipOutcome,
    playerA: { id: m.playerA.id, name: m.playerA.name, choice: m.playerA.choice },
    playerB: { id: m.playerB.id, name: m.playerB.name, choice: m.playerB.choice },
    winnerId,
    winnerName,
    pot: m.pot
  };

  io.to(`coin:${matchId}`).emit('coinVersusFlipStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`coin:${matchId}`).emit('coinVersusFlipResult', m.lastResult);
  broadcastCoinVersusState(io, matchId);

  setTimeout(() => {
    if (coinVersusMatches[matchId]) {
      const liveMatch = coinVersusMatches[matchId];
      liveMatch.status = 'RESULT';
      broadcastCoinVersusState(io, matchId);

      setTimeout(() => {
        if (coinVersusMatches[matchId]) {
          const finished = coinVersusMatches[matchId];
          finished.status = 'WAITING';
          finished.pot = 0;
          if (finished.playerA) finished.playerA.bet = 0;
          if (finished.playerB) finished.playerB.bet = 0;
          finished.turn = null;
          broadcastCoinVersusState(io, matchId);
          io.to(`coin:${matchId}`).emit('coinVersusSettled', {
            matchId,
            winnerId,
            winnerName,
            outcome: flipOutcome,
            pot: m.pot
          });
        }
      }, 4000);
    }
  }, 3500);
}

function handleCoinVersusDisconnect(io, socket) {
  const matchId = socket.currentCoinMatchId;
  if (matchId && coinVersusMatches[matchId]) {
    const match = coinVersusMatches[matchId];
    if (match.playerA && match.playerA.id === socket.id) match.playerA = null;
    if (match.playerB && match.playerB.id === socket.id) match.playerB = null;

    if (!match.playerA && !match.playerB) {
      delete coinVersusMatches[matchId];
    } else {
      match.status = 'WAITING';
      match.pot = 0;
      if (match.playerA) match.playerA.bet = 0;
      if (match.playerB) match.playerB.bet = 0;
      broadcastCoinVersusState(io, matchId);
    }
  }
}

function setupCoinSocketEvents(io, socket, players) {
  socket.on('coinVersusJoin', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : 'coin-podium-1';
    socket.join(`coin:${matchId}`);
    socket.currentCoinMatchId = matchId;

    const m = getOrCreateCoinVersusState(matchId);
    const pName = (players[socket.id] && players[socket.id].name) || 'Jugador';

    if (!m.playerA || m.playerA.id === socket.id) {
      m.playerA = { id: socket.id, name: pName, bet: 0, choice: 'HEADS', ready: false };
    } else if (!m.playerB || m.playerB.id === socket.id) {
      const opposingChoice = (m.playerA && m.playerA.choice === 'HEADS') ? 'TAILS' : 'HEADS';
      m.playerB = { id: socket.id, name: pName, bet: 0, choice: opposingChoice, ready: false };
    } else {
      socket.emit('coinVersusError', { message: 'El podio de cara o cruz 1v1 está ocupado.' });
      return;
    }

    broadcastCoinVersusState(io, matchId);
  });

  socket.on('coinVersusLeave', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentCoinMatchId;
    if (matchId && coinVersusMatches[matchId]) {
      const m = coinVersusMatches[matchId];
      if (m.playerA && m.playerA.id === socket.id) m.playerA = null;
      if (m.playerB && m.playerB.id === socket.id) m.playerB = null;

      socket.leave(`coin:${matchId}`);
      delete socket.currentCoinMatchId;

      if (!m.playerA && !m.playerB) {
        delete coinVersusMatches[matchId];
      } else {
        m.status = 'WAITING';
        m.pot = 0;
        if (m.playerA) m.playerA.bet = 0;
        if (m.playerB) m.playerB.bet = 0;
        broadcastCoinVersusState(io, matchId);
      }
    }
  });

  socket.on('coinVersusBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentCoinMatchId;
    if (!matchId || !coinVersusMatches[matchId]) return;

    const m = coinVersusMatches[matchId];
    const amt = roundMoney(data.amount);
    if (amt <= 0) return;

    if (m.status !== 'WAITING' && m.status !== 'RESULT') return;

    const chosenSide = (data.choice === 'TAILS' || data.choice === 'CRUZ') ? 'TAILS' : 'HEADS';

    if (m.playerA && m.playerA.id === socket.id) {
      m.playerA.bet = amt;
      m.playerA.choice = chosenSide;
      if (m.playerB) m.playerB.choice = chosenSide === 'HEADS' ? 'TAILS' : 'HEADS';
      m.status = 'BET_PROPOSED';
      m.turn = m.playerB ? m.playerB.id : null;
      broadcastCoinVersusState(io, matchId);
    } else if (m.playerB && m.playerB.id === socket.id) {
      m.playerB.bet = amt;
      m.playerB.choice = chosenSide;
      if (m.playerA) m.playerA.choice = chosenSide === 'HEADS' ? 'TAILS' : 'HEADS';
      m.status = 'BET_PROPOSED';
      m.turn = m.playerA ? m.playerA.id : null;
      broadcastCoinVersusState(io, matchId);
    }
  });

  socket.on('coinVersusAcceptBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentCoinMatchId;
    if (!matchId || !coinVersusMatches[matchId]) return;

    const m = coinVersusMatches[matchId];
    if (m.status !== 'BET_PROPOSED') return;

    if (m.playerA && m.playerA.id === socket.id && m.playerB && m.playerB.bet > 0) {
      m.playerA.bet = m.playerB.bet;
      m.pot = Math.round(m.playerA.bet * 2 * 100) / 100;
      startCoinVersusFlip(io, matchId);
    } else if (m.playerB && m.playerB.id === socket.id && m.playerA && m.playerA.bet > 0) {
      m.playerB.bet = m.playerA.bet;
      m.pot = Math.round(m.playerB.bet * 2 * 100) / 100;
      startCoinVersusFlip(io, matchId);
    }
  });
}

module.exports = {
  coinVersusMatches,
  getOrCreateCoinVersusState,
  broadcastCoinVersusState,
  startCoinVersusFlip,
  handleCoinVersusDisconnect,
  setupCoinSocketEvents
};
