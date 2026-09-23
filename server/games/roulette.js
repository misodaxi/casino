
const ROULETTE_RED_NUMS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const ROULETTE_BLACK_NUMS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

function getRouletteTargetNumbers(targetKey) {
  if (!targetKey) return [];
  if (targetKey.startsWith('num-')) {
    const n = parseInt(targetKey.replace('num-', ''), 10);
    return isNaN(n) ? [] : [n];
  }
  if (targetKey === 'dozen1') return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (targetKey === 'dozen2') return [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  if (targetKey === 'dozen3') return [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  if (targetKey === 'red') return ROULETTE_RED_NUMS;
  if (targetKey === 'black') return ROULETTE_BLACK_NUMS;
  if (targetKey === 'low') return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  if (targetKey === 'high') return [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  if (targetKey === 'even') return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
  if (targetKey === 'odd') return [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
  return [];
}

function calculateRouletteWeights(perksList, otherPlayersCount, activeBetKeys) {
  const weights = {};
  for (let n = 0; n <= 36; n++) {
    weights[n] = 1.0;
  }
  if (!Array.isArray(perksList)) return weights;

  perksList.forEach(perk => {
    if (!perk || !perk.effects) return;
    const target = perk.effects.rouletteTarget;
    const bonus = perk.effects.rouletteWeightBonus;
    if (target && typeof bonus === 'number' && bonus > 0) {
      const affected = getRouletteTargetNumbers(target);
      affected.forEach(num => {
        if (weights[num] !== undefined) {
          weights[num] += bonus;
        }
      });
    }

    if (typeof perk.effects.roulettePerPlayerBonus === 'number' && (otherPlayersCount || 0) > 0) {
      const extraWeight = (otherPlayersCount || 0) * perk.effects.roulettePerPlayerBonus;
      if (Array.isArray(activeBetKeys) && activeBetKeys.length > 0) {
        activeBetKeys.forEach(k => {
          const affected = getRouletteTargetNumbers(k);
          affected.forEach(num => {
            if (weights[num] !== undefined) {
              weights[num] += extraWeight;
            }
          });
        });
      } else {
        for (let n = 0; n <= 36; n++) {
          weights[n] += (extraWeight / 2);
        }
      }
    }
  });

  return weights;
}

function pickWeightedRouletteNumber(weights) {
  let totalWeight = 0;
  for (let n = 0; n <= 36; n++) {
    totalWeight += (weights && typeof weights[n] === 'number') ? weights[n] : 1.0;
  }
  let rnd = Math.random() * totalWeight;
  for (let n = 0; n <= 36; n++) {
    const w = (weights && typeof weights[n] === 'number') ? weights[n] : 1.0;
    if (rnd < w) return n;
    rnd -= w;
  }
  return Math.floor(Math.random() * 37);
}

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

    // Collect all table players' equipped perks and calculate stacked weights
    const allTablePerks = [];
    const otherPlayersCount = Math.max(0, totalPlayers - 1);
    let synergyWinBonus = 0;

    Object.values(r.players || {}).forEach(p => {
      if (p && Array.isArray(p.perks)) {
        allTablePerks.push(...p.perks);
        p.perks.forEach(pk => {
          if (pk && pk.effects && typeof pk.effects.roulettePerPlayerBonus === 'number') {
            synergyWinBonus += otherPlayersCount * pk.effects.roulettePerPlayerBonus;
          }
        });
      }
    });

    const activeBetsKeys = Object.keys(r.bets || {});
    const rouletteWeights = calculateRouletteWeights(allTablePerks, otherPlayersCount, activeBetsKeys);
    let winNum = pickWeightedRouletteNumber(rouletteWeights);

    // Bonificación de probabilidad en ruleta para apuestas activas (base 10% + bonus de sinergia)
    const totalWinChance = Math.min(0.85, 0.10 + synergyWinBonus);
    if (activeBetsKeys.length > 0 && Math.random() < totalWinChance) {
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
      seatIndex: data.seatIndex || 0,
      perks: Array.isArray(data.perks) ? data.perks : []
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

        if (data && Array.isArray(data.perks)) {
          r.players[socket.id].perks = data.perks;
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
