// ============================================================
// AUTHORITATIVE MULTIPLAYER ROULETTE ENGINE (SERVER)
// ============================================================

const { WHEEL_ORDER } = require('../config');
const { roundMoney } = require('../state');

const roulettes = {}; // rouletteId -> state object

function getOrCreateRouletteState(rouletteId) {
  if (!roulettes[rouletteId]) {
    roulettes[rouletteId] = {
      rouletteId: rouletteId,
      players: {}, // socketId -> { id, name, seatIndex }
      readyPlayers: {}, // socketId -> true
      bets: {}, // betKey -> totalAmount
      userBets: {}, // socketId -> { betKey -> amount }
      status: 'WAITING', // 'WAITING' | 'READY' | 'SPINNING' | 'RESULT'
      result: null,
      spinId: 0
    };
  }
  return roulettes[rouletteId];
}

function broadcastRouletteState(io, rouletteId) {
  const r = getOrCreateRouletteState(rouletteId);
  const totalPlayers = Object.keys(r.players).length;
  const totalReady = Object.keys(r.readyPlayers).length;

  const payload = {
    rouletteId: r.rouletteId,
    status: r.status,
    players: r.players,
    readyPlayers: r.readyPlayers,
    bets: r.bets,
    userBets: r.userBets,
    result: r.result,
    spinId: r.spinId,
    totalPlayers,
    totalReady
  };

  io.to(`roulette:${rouletteId}`).emit('rouletteState', payload);
  return payload;
}

function checkAndTriggerSpin(io, rouletteId) {
  const r = getOrCreateRouletteState(rouletteId);
  const playerIds = Object.keys(r.players);
  const totalPlayers = playerIds.length;
  const totalReady = Object.keys(r.readyPlayers).length;
  const totalTableBets = Object.values(r.bets || {}).reduce((sum, v) => Math.round((sum + (Number(v) || 0)) * 100) / 100, 0);

  if (totalPlayers > 0 && totalReady === totalPlayers && totalTableBets > 0 && (r.status === 'WAITING' || r.status === 'READY')) {
    r.status = 'SPINNING';
    r.spinId++;
    let winNum = WHEEL_ORDER[Math.floor(Math.random() * WHEEL_ORDER.length)];

    // Bonificación de probabilidad en ruleta para apuestas activas
    const activeBetsKeys = Object.keys(r.bets || {});
    if (activeBetsKeys.length > 0 && Math.random() < 0.10) {
      const candidates = [];
      activeBetsKeys.forEach(k => {
        if (k.startsWith('num-')) {
          const n = parseInt(k.replace('num-', ''), 10);
          if (!isNaN(n)) candidates.push(n);
        } else if (k.startsWith('split-')) {
          const splits = k.replace('split-', '').split('-').map(Number);
          splits.forEach(sn => { if (!isNaN(sn)) candidates.push(sn); });
        } else if (k === 'red') {
          WHEEL_ORDER.forEach(n => { if (n !== 0 && [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n)) candidates.push(n); });
        } else if (k === 'black') {
          WHEEL_ORDER.forEach(n => { if (n !== 0 && ![1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n)) candidates.push(n); });
        } else if (k === 'even') {
          WHEEL_ORDER.forEach(n => { if (n !== 0 && n % 2 === 0) candidates.push(n); });
        } else if (k === 'odd') {
          WHEEL_ORDER.forEach(n => { if (n % 2 === 1) candidates.push(n); });
        } else if (k === 'low') {
          WHEEL_ORDER.forEach(n => { if (n >= 1 && n <= 18) candidates.push(n); });
        } else if (k === 'high') {
          WHEEL_ORDER.forEach(n => { if (n >= 19 && n <= 36) candidates.push(n); });
        }
      });
      if (candidates.length > 0) {
        winNum = candidates[Math.floor(Math.random() * candidates.length)];
      }
    }

    r.result = winNum;

    io.to(`roulette:${rouletteId}`).emit('rouletteReadyToSpin', { rouletteId, totalPlayers });

    io.to(`roulette:${rouletteId}`).emit('rouletteSpin', {
      rouletteId,
      result: winNum,
      spinId: r.spinId
    });

    broadcastRouletteState(io, rouletteId);

    setTimeout(() => {
      if (roulettes[rouletteId]) {
        const roomState = roulettes[rouletteId];
        roomState.status = 'RESULT';
        io.to(`roulette:${rouletteId}`).emit('rouletteResult', {
          rouletteId,
          result: roomState.result,
          spinId: roomState.spinId
        });
        broadcastRouletteState(io, rouletteId);

        setTimeout(() => {
          if (roulettes[rouletteId]) {
            const nextRound = roulettes[rouletteId];
            nextRound.status = 'WAITING';
            nextRound.readyPlayers = {};
            nextRound.bets = {};
            nextRound.userBets = {};
            nextRound.result = null;
            broadcastRouletteState(io, rouletteId);
          }
        }, 4000);
      }
    }, 10000);
  }
}

function setupRouletteSocketEvents(io, socket, players) {
  socket.on('rouletteJoin', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : 'roulette';
    socket.join(`roulette:${rId}`);
    socket.currentRouletteId = rId;

    const r = getOrCreateRouletteState(rId);
    r.players[socket.id] = {
      id: socket.id,
      name: (players[socket.id] && players[socket.id].name) || 'Jugador',
      seatIndex: data.seatIndex || 0
    };

    broadcastRouletteState(io, rId);
  });

  socket.on('rouletteLeave', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      socket.leave(`roulette:${rId}`);
      const r = roulettes[rId];
      delete r.players[socket.id];
      delete r.readyPlayers[socket.id];
      if (r.userBets) delete r.userBets[socket.id];
      delete socket.currentRouletteId;

      if (Object.keys(r.players).length === 0) {
        r.status = 'WAITING';
        r.readyPlayers = {};
        r.bets = {};
        r.userBets = {};
        r.result = null;
      } else {
        checkAndTriggerSpin(io, rId);
      }

      broadcastRouletteState(io, rId);
    }
  });

  socket.on('rouletteReady', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      const r = roulettes[rId];
      if (r.players[socket.id] && (r.status === 'WAITING' || r.status === 'READY')) {
        const totalPlayers = Object.keys(r.players).length;
        const userTotal = Object.values((r.userBets && r.userBets[socket.id]) || {}).reduce((s, a) => Math.round((s + (Number(a) || 0)) * 100) / 100, 0);

        if (totalPlayers <= 1 && userTotal <= 0) {
          socket.emit('rouletteError', { message: 'Debes realizar al menos una apuesta para girar la ruleta en solitario.' });
          return;
        }

        r.readyPlayers[socket.id] = true;
        broadcastRouletteState(io, rId);
        checkAndTriggerSpin(io, rId);
      }
    }
  });

  socket.on('rouletteUnready', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      const r = roulettes[rId];
      if (r.status === 'WAITING' || r.status === 'READY') {
        delete r.readyPlayers[socket.id];
        broadcastRouletteState(io, rId);
      }
    }
  });

  socket.on('rouletteBet', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId] && data.betKey && (typeof data.amount === 'number' || typeof data.amount === 'string')) {
      const r = roulettes[rId];
      if (r.status === 'WAITING' && r.players[socket.id]) {
        const amt = roundMoney(data.amount);
        if (amt > 0) {
          r.bets[data.betKey] = roundMoney((r.bets[data.betKey] || 0) + amt);
          if (!r.userBets[socket.id]) r.userBets[socket.id] = {};
          r.userBets[socket.id][data.betKey] = roundMoney((r.userBets[socket.id][data.betKey] || 0) + amt);
          broadcastRouletteState(io, rId);
        } else if (amt < 0) {
          const refundAmt = Math.abs(amt);
          const curUserBet = (r.userBets && r.userBets[socket.id] && r.userBets[socket.id][data.betKey]) || 0;
          const actualRefund = Math.min(refundAmt, curUserBet);
          if (actualRefund > 0) {
            r.userBets[socket.id][data.betKey] = roundMoney(curUserBet - actualRefund);
            if (r.userBets[socket.id][data.betKey] <= 0) delete r.userBets[socket.id][data.betKey];
            r.bets[data.betKey] = Math.max(0, roundMoney((r.bets[data.betKey] || 0) - actualRefund));
            if (r.bets[data.betKey] <= 0) delete r.bets[data.betKey];
            broadcastRouletteState(io, rId);
          }
        }
      }
    }
  });
}

function handleRouletteDisconnect(io, socket) {
  if (socket.currentRouletteId && roulettes[socket.currentRouletteId]) {
    const rId = socket.currentRouletteId;
    const r = roulettes[rId];
    delete r.players[socket.id];
    delete r.readyPlayers[socket.id];
    if (r.userBets) delete r.userBets[socket.id];

    if (Object.keys(r.players).length === 0) {
      r.status = 'WAITING';
      r.readyPlayers = {};
      r.bets = {};
      r.userBets = {};
      r.result = null;
    } else {
      checkAndTriggerSpin(io, rId);
    }

    broadcastRouletteState(io, rId);
  }
}

module.exports = {
  roulettes,
  getOrCreateRouletteState,
  broadcastRouletteState,
  checkAndTriggerSpin,
  setupRouletteSocketEvents,
  handleRouletteDisconnect
};
