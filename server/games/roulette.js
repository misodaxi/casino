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
    const winNum = WHEEL_ORDER[Math.floor(Math.random() * WHEEL_ORDER.length)];
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
