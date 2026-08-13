const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8000;

// Serve static files
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Multiplayer player tracking & IP-to-Name persistence map
const players = {};
const ipNames = {};

function getClientIp(socket) {
  const headers = socket.handshake.headers;
  const xForwardedFor = headers['x-forwarded-for'];
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return socket.handshake.address || (socket.request && socket.request.connection && socket.request.connection.remoteAddress) || '127.0.0.1';
}

// Global TV 3D Synchronized State
const tvState = {
  videoId: '',
  playing: false,
  currentTime: 0,
  updatedAt: Date.now()
};

// European Roulette Wheel Sequence Order
const WHEEL_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

// Server-side Authoritative Roulette State Manager
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

function broadcastRouletteState(rouletteId) {
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

function checkAndTriggerSpin(rouletteId) {
  const r = getOrCreateRouletteState(rouletteId);
  const playerIds = Object.keys(r.players);
  const totalPlayers = playerIds.length;
  const totalReady = Object.keys(r.readyPlayers).length;

  // Only trigger spin if there is at least 1 seated player, all seated players are ready, and state is WAITING or READY!
  if (totalPlayers > 0 && totalReady === totalPlayers && (r.status === 'WAITING' || r.status === 'READY')) {
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

    broadcastRouletteState(rouletteId);

    // After animation (~3.5s) + result presentation (~3.5s), finish round
    setTimeout(() => {
      if (roulettes[rouletteId]) {
        const roomState = roulettes[rouletteId];
        roomState.status = 'RESULT';
        io.to(`roulette:${rouletteId}`).emit('rouletteResult', {
          rouletteId,
          result: roomState.result,
          spinId: roomState.spinId
        });
        broadcastRouletteState(rouletteId);

/* ============================================================
   AUTHORITATIVE MULTIPLAYER BLACKJACK ENGINE
============================================================ */
const blackjacks = {}; // blackjackId -> state object

function createStandardDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  suits.forEach(s => values.forEach(v => deck.push({ s, v, red: (s === '♥' || s === '♦') })));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function getHandScore(hand) {
  let total = 0, aces = 0;
  if (!hand || !Array.isArray(hand)) return 0;
  hand.forEach(c => {
    if (!c || c.hidden) return;
    if (c.v === 'A') { aces++; total += 11; }
    else if (['J', 'Q', 'K'].includes(c.v)) total += 10;
    else total += parseInt(c.v, 10);
  });
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

function getOrCreateBlackjackState(blackjackId) {
  if (!blackjacks[blackjackId]) {
    blackjacks[blackjackId] = {
      blackjackId: blackjackId,
      players: {}, // socketId -> { id, name, seatIndex, hand: [], bets: 50, score: 0, status: 'WAITING' }
      playerOrder: [], // array of socketIds
      currentPlayerIndex: -1,
      currentPlayerId: null,
      dealer: [], // array of cards
      dealerHiddenCard: null,
      deck: createStandardDeck(),
      phase: 'WAITING', // 'WAITING' | 'DEALING' | 'PLAYER_TURNS' | 'DEALER_TURN' | 'RESULT'
      roundId: 0,
      sequence: 0,
      results: {}
    };
  }
  return blackjacks[blackjackId];
}

function broadcastBlackjackState(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);

  const publicDealer = bj.dealer.map((c, idx) => {
    if (idx === 1 && (bj.phase === 'WAITING' || bj.phase === 'DEALING' || bj.phase === 'PLAYER_TURNS')) {
      return { s: '?', v: '?', red: false, hidden: true };
    }
    return c;
  });

  const payload = {
    blackjackId: bj.blackjackId,
    phase: bj.phase,
    players: bj.players,
    playerOrder: bj.playerOrder,
    currentPlayerIndex: bj.currentPlayerIndex,
    currentPlayerId: bj.currentPlayerId,
    dealer: publicDealer,
    dealerScore: (bj.phase === 'DEALER_TURN' || bj.phase === 'RESULT') ? getHandScore(bj.dealer) : getHandScore([bj.dealer[0]]),
    roundId: bj.roundId,
    sequence: bj.sequence,
    results: bj.results,
    remainingCards: bj.deck.length
  };

  io.to(`blackjack:${blackjackId}`).emit('blackjackState', payload);
  return payload;
}

function startBlackjackDeal(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  if (bj.phase !== 'WAITING') return;

  const seatedIds = Object.keys(bj.players);
  if (seatedIds.length === 0) return;

  bj.phase = 'DEALING';
  bj.roundId++;
  bj.sequence = 0;
  bj.playerOrder = [...seatedIds];
  bj.currentPlayerIndex = -1;
  bj.currentPlayerId = null;
  bj.dealer = [];
  bj.dealerHiddenCard = null;
  bj.results = {};

  if (bj.deck.length < 15) {
    bj.deck = createStandardDeck();
  }

  seatedIds.forEach(id => {
    bj.players[id].hand = [];
    bj.players[id].score = 0;
    bj.players[id].status = 'PLAYING';
  });

  broadcastBlackjackState(blackjackId);

  const dealQueue = [];

  // Pass 1: Each seated player receives 1st card
  seatedIds.forEach(id => {
    dealQueue.push({ type: 'player', playerId: id, hidden: false });
  });
  // Pass 1: Dealer receives 1st card
  dealQueue.push({ type: 'dealer', playerId: 'dealer', hidden: false });

  // Pass 2: Each seated player receives 2nd card
  seatedIds.forEach(id => {
    dealQueue.push({ type: 'player', playerId: id, hidden: false });
  });
  // Pass 2: Dealer receives 2nd card (Hidden!)
  dealQueue.push({ type: 'dealer', playerId: 'dealer', hidden: true });

  let stepIdx = 0;
  function processDealQueue() {
    if (stepIdx >= dealQueue.length) {
      bj.phase = 'PLAYER_TURNS';
      bj.currentPlayerIndex = 0;
      bj.currentPlayerId = bj.playerOrder[0];
      broadcastBlackjackState(blackjackId);
      io.to(`blackjack:${blackjackId}`).emit('blackjackTurnChanged', {
        blackjackId,
        currentPlayerId: bj.currentPlayerId,
        playerIndex: 0
      });
      return;
    }

    const item = dealQueue[stepIdx];
    stepIdx++;
    bj.sequence++;

    const card = bj.deck.pop();
    if (!card) return;

    if (item.type === 'player') {
      const p = bj.players[item.playerId];
      if (p) {
        p.hand.push(card);
        p.score = getHandScore(p.hand);
      }
      io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
        blackjackId,
        playerId: item.playerId,
        target: 'player',
        card: card,
        hidden: false,
        sequence: bj.sequence,
        roundId: bj.roundId,
        score: p ? p.score : 0
      });
    } else {
      if (item.hidden) {
        bj.dealerHiddenCard = card;
        bj.dealer.push(card);
        io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
          blackjackId,
          playerId: 'dealer',
          target: 'dealer',
          card: { s: '?', v: '?', red: false, hidden: true },
          hidden: true,
          sequence: bj.sequence,
          roundId: bj.roundId,
          score: getHandScore([bj.dealer[0]])
        });
      } else {
        bj.dealer.push(card);
        io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
          blackjackId,
          playerId: 'dealer',
          target: 'dealer',
          card: card,
          hidden: false,
          sequence: bj.sequence,
          roundId: bj.roundId,
          score: getHandScore(bj.dealer)
        });
      }
    }

    setTimeout(processDealQueue, 350);
  }

  processDealQueue();
}

function advanceBlackjackTurn(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  if (bj.phase !== 'PLAYER_TURNS') return;

  bj.currentPlayerIndex++;
  if (bj.currentPlayerIndex < bj.playerOrder.length) {
    bj.currentPlayerId = bj.playerOrder[bj.currentPlayerIndex];
    broadcastBlackjackState(blackjackId);
    io.to(`blackjack:${blackjackId}`).emit('blackjackTurnChanged', {
      blackjackId,
      currentPlayerId: bj.currentPlayerId,
      playerIndex: bj.currentPlayerIndex
    });
  } else {
    startBlackjackDealerTurn(blackjackId);
  }
}

function startBlackjackDealerTurn(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  bj.phase = 'DEALER_TURN';
  bj.currentPlayerId = 'dealer';

  io.to(`blackjack:${blackjackId}`).emit('blackjackRevealDealer', {
    blackjackId,
    dealerHand: bj.dealer,
    dealerScore: getHandScore(bj.dealer)
  });

  broadcastBlackjackState(blackjackId);

  function dealerDrawStep() {
    let dScore = getHandScore(bj.dealer);
    if (dScore < 17) {
      if (bj.deck.length === 0) bj.deck = createStandardDeck();
      const card = bj.deck.pop();
      bj.dealer.push(card);
      bj.sequence++;
      dScore = getHandScore(bj.dealer);

      io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
        blackjackId,
        playerId: 'dealer',
        target: 'dealer',
        card: card,
        hidden: false,
        sequence: bj.sequence,
        roundId: bj.roundId,
        score: dScore
      });

      setTimeout(dealerDrawStep, 600);
    } else {
      evaluateBlackjackRoundResults(blackjackId);
    }
  }

  setTimeout(dealerDrawStep, 800);
}

function evaluateBlackjackRoundResults(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  bj.phase = 'RESULT';

  const dScore = getHandScore(bj.dealer);
  bj.results = {};

  Object.keys(bj.players).forEach(id => {
    const p = bj.players[id];
    const pScore = p.score;
    let outcome = 'LOSE';

    if (pScore > 21) {
      outcome = 'BUST';
    } else if (dScore > 21) {
      outcome = 'WIN';
    } else if (pScore > dScore) {
      outcome = 'WIN';
    } else if (pScore < dScore) {
      outcome = 'LOSE';
    } else {
      outcome = 'PUSH';
    }

    bj.results[id] = {
      playerId: id,
      result: outcome,
      playerScore: pScore,
      dealerScore: dScore,
      bet: p.bets
    };
  });

  io.to(`blackjack:${blackjackId}`).emit('blackjackResult', {
    blackjackId,
    results: bj.results,
    dealerScore: dScore
  });

  broadcastBlackjackState(blackjackId);

  setTimeout(() => {
    if (blackjacks[blackjackId]) {
      const room = blackjacks[blackjackId];
      room.phase = 'WAITING';
      room.dealer = [];
      room.dealerHiddenCard = null;
      room.results = {};
      Object.keys(room.players).forEach(id => {
        room.players[id].hand = [];
        room.players[id].score = 0;
        room.players[id].status = 'WAITING';
      });
      broadcastBlackjackState(blackjackId);
    }
  }, 4500);
}

function getSyncedTvState() {
  const now = Date.now();
  let current = tvState.currentTime;
  if (tvState.playing) {
    current += (now - tvState.updatedAt) / 1000;
  }
  return {
    videoId: tvState.videoId,
    playing: tvState.playing,
    currentTime: Math.max(0, current),
    updatedAt: now
  };
}

io.on('connection', (socket) => {
  const clientIp = getClientIp(socket);
  console.log(`🟢 Jugador conectado: ${socket.id} (IP: ${clientIp})`);

  // Retrieve saved name associated with this IP or fallback to default
  const savedName = ipNames[clientIp] || `Jugador_${socket.id.substring(0, 4)}`;

  // Create initial player state
  players[socket.id] = {
    id: socket.id,
    ip: clientIp,
    x: (Math.random() - 0.5) * 6,
    z: 12 + (Math.random() - 0.5) * 4,
    rotY: Math.PI,
    name: savedName,
    color: 0x8B5CF6
  };

  // Send current player & TV state to newly connected player
  socket.emit('init', { id: socket.id, players, tvState: getSyncedTvState() });

  // Broadcast new player to all other clients
  socket.broadcast.emit('playerJoined', players[socket.id]);

  // Handle TV 3D synchronized events
  socket.on('tvChangeVideo', (data) => {
    if (!data || !data.videoId) return;
    tvState.videoId = data.videoId;
    tvState.playing = data.playing !== undefined ? !!data.playing : true;
    tvState.currentTime = Math.max(0, data.currentTime || 0);
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvPlay', (data) => {
    tvState.playing = true;
    if (data && typeof data.currentTime === 'number') {
      tvState.currentTime = Math.max(0, data.currentTime);
    }
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvPause', (data) => {
    tvState.playing = false;
    if (data && typeof data.currentTime === 'number') {
      tvState.currentTime = Math.max(0, data.currentTime);
    }
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvSeek', (data) => {
    if (!data || typeof data.currentTime !== 'number') return;
    tvState.currentTime = Math.max(0, data.currentTime);
    tvState.updatedAt = Date.now();
    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvSyncReq', () => {
    socket.emit('tvStateUpdate', getSyncedTvState());
  });

  // Handle position & movement updates
  socket.on('updateTransform', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].z = data.z;
      players[socket.id].rotY = data.rotY;
      if (data.name && data.name.trim() !== '') {
        const cleanName = data.name.trim().substring(0, 16);
        players[socket.id].name = cleanName;
        ipNames[clientIp] = cleanName; // Save & associate name to client IP address permanently!
      }
      if (data.seat !== undefined) {
        players[socket.id].seat = data.seat;
      }
      socket.broadcast.emit('playerMoved', players[socket.id]);
    }
  });

  /* ============================================================
     AUTHORITATIVE MULTIPLAYER ROULETTE ENGINE
  ============================================================ */
  socket.on('rouletteJoin', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : 'roulette';
    socket.join(`roulette:${rId}`);
    socket.currentRouletteId = rId;

    const r = getOrCreateRouletteState(rId);
    r.players[socket.id] = {
      id: socket.id,
      name: players[socket.id]?.name || 'Jugador',
      seatIndex: data.seatIndex || 0
    };

    broadcastRouletteState(rId);
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
        checkAndTriggerSpin(rId);
      }

      broadcastRouletteState(rId);
    }
  });

  socket.on('rouletteReady', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      const r = roulettes[rId];
      if (r.players[socket.id] && (r.status === 'WAITING' || r.status === 'READY')) {
        r.readyPlayers[socket.id] = true;
        broadcastRouletteState(rId);
        checkAndTriggerSpin(rId);
      }
    }
  });

  socket.on('rouletteUnready', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId]) {
      const r = roulettes[rId];
      if (r.status === 'WAITING' || r.status === 'READY') {
        delete r.readyPlayers[socket.id];
        broadcastRouletteState(rId);
      }
    }
  });

  socket.on('rouletteBet', (data) => {
    const rId = (data && data.rouletteId) ? data.rouletteId : socket.currentRouletteId;
    if (rId && roulettes[rId] && data.betKey && typeof data.amount === 'number') {
      const r = roulettes[rId];
      if (r.status === 'WAITING' && r.players[socket.id]) {
        r.bets[data.betKey] = (r.bets[data.betKey] || 0) + data.amount;
        if (!r.userBets[socket.id]) r.userBets[socket.id] = {};
        r.userBets[socket.id][data.betKey] = (r.userBets[socket.id][data.betKey] || 0) + data.amount;
        broadcastRouletteState(rId);
      }
    }
  });

  /* ============================================================
     AUTHORITATIVE MULTIPLAYER BLACKJACK SOCKET EVENT LISTENERS
  ============================================================ */
  socket.on('blackjackJoin', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : 'blackjack';
    socket.join(`blackjack:${bjId}`);
    socket.currentBlackjackId = bjId;

    const bj = getOrCreateBlackjackState(bjId);
    bj.players[socket.id] = {
      id: socket.id,
      name: players[socket.id]?.name || 'Jugador',
      seatIndex: data.seatIndex || 0,
      hand: [],
      score: 0,
      bets: data.bet || 50,
      status: 'WAITING'
    };

    if (bj.phase === 'WAITING' && !bj.playerOrder.includes(socket.id)) {
      bj.playerOrder.push(socket.id);
    }

    broadcastBlackjackState(bjId);
  });

  socket.on('blackjackLeave', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : socket.currentBlackjackId;
    if (bjId && blackjacks[bjId]) {
      socket.leave(`blackjack:${bjId}`);
      const bj = blackjacks[bjId];
      delete bj.players[socket.id];
      bj.playerOrder = bj.playerOrder.filter(id => id !== socket.id);
      delete socket.currentBlackjackId;

      if (bj.playerOrder.length === 0) {
        bj.phase = 'WAITING';
        bj.currentPlayerIndex = -1;
        bj.currentPlayerId = null;
        bj.dealer = [];
      } else if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) {
        advanceBlackjackTurn(bjId);
      }

      broadcastBlackjackState(bjId);
    }
  });

  socket.on('blackjackStartRoundReq', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : socket.currentBlackjackId;
    if (bjId && blackjacks[bjId]) {
      const bj = blackjacks[bjId];
      if (data && typeof data.bet === 'number' && bj.players[socket.id]) {
        bj.players[socket.id].bets = data.bet;
      }
      if (bj.phase === 'WAITING') {
        startBlackjackDeal(bjId);
      }
    }
  });

  socket.on('blackjackHit', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : socket.currentBlackjackId;
    if (bjId && blackjacks[bjId]) {
      const bj = blackjacks[bjId];
      if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id && bj.players[socket.id]) {
        if (bj.deck.length === 0) bj.deck = createStandardDeck();
        const card = bj.deck.pop();
        const p = bj.players[socket.id];
        p.hand.push(card);
        p.score = getHandScore(p.hand);
        bj.sequence++;

        io.to(`blackjack:${bjId}`).emit('blackjackDealCard', {
          blackjackId: bjId,
          playerId: socket.id,
          target: 'player',
          card: card,
          hidden: false,
          sequence: bj.sequence,
          roundId: bj.roundId,
          score: p.score
        });

        broadcastBlackjackState(bjId);

        if (p.score > 21) {
          p.status = 'BUST';
          io.to(`blackjack:${bjId}`).emit('blackjackPlayerBust', {
            blackjackId: bjId,
            playerId: socket.id,
            score: p.score
          });
          setTimeout(() => advanceBlackjackTurn(bjId), 400);
        }
      }
    }
  });

  socket.on('blackjackStand', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : socket.currentBlackjackId;
    if (bjId && blackjacks[bjId]) {
      const bj = blackjacks[bjId];
      if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id && bj.players[socket.id]) {
        bj.players[socket.id].status = 'STAND';
        advanceBlackjackTurn(bjId);
      }
    }
  });

  socket.on('blackjackDouble', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : socket.currentBlackjackId;
    if (bjId && blackjacks[bjId]) {
      const bj = blackjacks[bjId];
      if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id && bj.players[socket.id]) {
        const p = bj.players[socket.id];
        if (p.hand.length === 2) {
          p.bets *= 2;
          if (bj.deck.length === 0) bj.deck = createStandardDeck();
          const card = bj.deck.pop();
          p.hand.push(card);
          p.score = getHandScore(p.hand);
          bj.sequence++;

          io.to(`blackjack:${bjId}`).emit('blackjackDealCard', {
            blackjackId: bjId,
            playerId: socket.id,
            target: 'player',
            card: card,
            hidden: false,
            sequence: bj.sequence,
            roundId: bj.roundId,
            score: p.score
          });

          broadcastBlackjackState(bjId);

          if (p.score > 21) p.status = 'BUST';
          else p.status = 'STAND';

          setTimeout(() => advanceBlackjackTurn(bjId), 500);
        }
      }
    }
  });

  // Handle chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', {
      id: socket.id,
      name: players[socket.id]?.name || 'Anónimo',
      message: msg
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`🔴 Jugador desconectado: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);

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
        checkAndTriggerSpin(rId);
      }

      broadcastRouletteState(rId);
    }

    if (socket.currentBlackjackId && blackjacks[socket.currentBlackjackId]) {
      const bjId = socket.currentBlackjackId;
      const bj = blackjacks[bjId];
      delete bj.players[socket.id];
      bj.playerOrder = bj.playerOrder.filter(id => id !== socket.id);

      if (bj.playerOrder.length === 0) {
        bj.phase = 'WAITING';
        bj.currentPlayerIndex = -1;
        bj.currentPlayerId = null;
        bj.dealer = [];
      } else if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) {
        advanceBlackjackTurn(bjId);
      }

      broadcastBlackjackState(bjId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Casino 3D Servidor Multijugador activo en http://localhost:${PORT}`);
});