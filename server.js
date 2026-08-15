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

// Global TV 3D Synchronized State & Multi-User Watch History
const tvState = {
  videoId: '',
  playing: false,
  currentTime: 0,
  updatedAt: Date.now()
};

const tvLastWatched = {
  videoId: '',
  url: '',
  currentTime: 0,
  updatedAt: Date.now()
};

// Global Jukebox (Gramola) Synchronized State for Whole-Casino Music
const defaultJukeboxPlaylist = [
  {
    id: 'track-1',
    title: 'Fly Me to the Moon',
    artist: 'Frank Sinatra',
    source: 'youtube',
    videoId: 'ZEcqHA7dbwM',
    url: 'https://www.youtube.com/watch?v=ZEcqHA7dbwM',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
    duration: 147
  },
  {
    id: 'track-2',
    title: 'Johnny B. Goode',
    artist: 'Chuck Berry',
    source: 'youtube',
    videoId: 'T38v3-SSGcM',
    url: 'https://www.youtube.com/watch?v=T38v3-SSGcM',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150',
    duration: 161
  },
  {
    id: 'track-3',
    title: 'Take Five',
    artist: 'Dave Brubeck Quartet',
    source: 'youtube',
    videoId: 'vmDDOFXSgAs',
    url: 'https://www.youtube.com/watch?v=vmDDOFXSgAs',
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150',
    duration: 324
  },
  {
    id: 'track-4',
    title: 'Can\'t Help Falling in Love',
    artist: 'Elvis Presley',
    source: 'youtube',
    videoId: 'vGJTaP6anOU',
    url: 'https://www.youtube.com/watch?v=vGJTaP6anOU',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
    duration: 182
  },
  {
    id: 'track-5',
    title: 'Get Lucky',
    artist: 'Daft Punk ft. Pharrell Williams',
    source: 'youtube',
    videoId: '5NV6Rdv1a3I',
    url: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150',
    duration: 248
  },
  {
    id: 'track-6',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    source: 'youtube',
    videoId: 'Zi_XLOBDo_Y',
    url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
    duration: 294
  },
  {
    id: 'track-7',
    title: 'Autumn Leaves',
    artist: 'Miles Davis & Cannonball Adderley',
    source: 'youtube',
    videoId: 'u37RF5xKNq8',
    url: 'https://www.youtube.com/watch?v=u37RF5xKNq8',
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150',
    duration: 659
  }
];

const jukeboxState = {
  currentTrack: defaultJukeboxPlaylist[0],
  playlist: defaultJukeboxPlaylist,
  currentIndex: 0,
  playing: true,
  currentTime: 0,
  updatedAt: Date.now(),
  volume: 75,
  changerName: 'Casino DJ'
};

function getSyncedJukeboxState() {
  const now = Date.now();
  let liveCurrentTime = Math.max(0, jukeboxState.currentTime || 0);
  const dur = (jukeboxState.currentTrack && jukeboxState.currentTrack.duration) ? jukeboxState.currentTrack.duration : 180;
  if (jukeboxState.playing) {
    const elapsed = Math.max(0, (now - jukeboxState.updatedAt) / 1000);
    liveCurrentTime = (jukeboxState.currentTime + elapsed) % dur;
  }
  return {
    currentTrack: jukeboxState.currentTrack,
    playlist: jukeboxState.playlist,
    currentIndex: jukeboxState.currentIndex,
    playing: jukeboxState.playing,
    currentTime: Math.floor(liveCurrentTime),
    volume: jukeboxState.volume,
    changerName: jukeboxState.changerName,
    updatedAt: now
  };
}

// Exact 2-decimal currency rounding helper (handles float drift e.g. 0.0999999 -> 0.1)
function roundMoney(val) {
  if (typeof val === 'string') {
    val = val.replace('$', '').replace('K', '000').replace('k', '000').trim();
  }
  const n = parseFloat(val);
  if (isNaN(n)) return 0;
  return Math.round((n + 0.0000001) * 100) / 100;
}

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
  const totalTableBets = Object.values(r.bets || {}).reduce((sum, v) => Math.round((sum + (Number(v) || 0)) * 100) / 100, 0);

  // Require all seated players to be ready, AND at least one player must have placed a bet (> $0) for the wheel to spin!
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

        setTimeout(() => {
          if (roulettes[rouletteId]) {
            const nextRound = roulettes[rouletteId];
            nextRound.status = 'WAITING';
            nextRound.readyPlayers = {};
            nextRound.bets = {};
            nextRound.userBets = {};
            nextRound.result = null;
            broadcastRouletteState(rouletteId);
          }
        }, 4000);
      }
    }, 7000);
  }
}

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
    if (!c || c.hidden || c.v === '?') return;
    if (c.v === 'A') { aces++; total += 11; }
    else if (['J', 'Q', 'K'].includes(c.v)) total += 10;
    else {
      const num = parseInt(c.v, 10);
      if (!isNaN(num)) total += num;
    }
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
    dealerScore: (bj.phase === 'DEALER_TURN' || bj.phase === 'RESULT') ? getHandScore(bj.dealer) : ((bj.dealer && bj.dealer.length > 0) ? getHandScore([bj.dealer[0]]) : 0),
    roundId: bj.roundId,
    sequence: bj.sequence,
    results: bj.results,
    remainingCards: bj.deck.length
  };

  io.to(`blackjack:${blackjackId}`).emit('blackjackState', payload);
  return payload;
}

function startBlackjackDeal(blackjackId, testPairPlayerId = null) {
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
    bj.players[id].isSplit = false;
    bj.players[id].splitHand = [];
    bj.players[id].splitScore = 0;
    bj.players[id].splitBet = 0;
    bj.players[id].activeHandIndex = 0;
    bj.players[id].handStatus = ['PLAYING', 'PLAYING'];
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
      bj.currentPlayerIndex = -1;
      advanceBlackjackTurn(blackjackId);
      return;
    }

    const item = dealQueue[stepIdx];
    stepIdx++;
    bj.sequence++;

    let card = bj.deck.pop();
    if (item.type === 'player' && testPairPlayerId && testPairPlayerId === item.playerId) {
      const p = bj.players[item.playerId];
      if (p) {
        if (p.hand.length === 0) card = { s: '♠', v: '8', red: false };
        else if (p.hand.length === 1) card = { s: '♥', v: '8', red: true };
      }
    }
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
        score: p ? p.score : 0,
        cardIndex: p ? (p.hand.length - 1) : 0,
        seatIndex: p ? (p.seatIndex !== undefined ? p.seatIndex : 0) : 0
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
          score: getHandScore([bj.dealer[0]]),
          cardIndex: bj.dealer.length - 1,
          seatIndex: -1
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
          score: getHandScore(bj.dealer),
          cardIndex: bj.dealer.length - 1,
          seatIndex: -1
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
  while (bj.currentPlayerIndex < bj.playerOrder.length) {
    const nextPlayerId = bj.playerOrder[bj.currentPlayerIndex];
    const p = bj.players[nextPlayerId];
    if (p && p.status !== 'STAND' && p.status !== 'BUST' && !p.leftTable) {
      bj.currentPlayerId = nextPlayerId;
      broadcastBlackjackState(blackjackId);
      io.to(`blackjack:${blackjackId}`).emit('blackjackTurnChanged', {
        blackjackId,
        currentPlayerId: bj.currentPlayerId,
        playerIndex: bj.currentPlayerIndex
      });
      return;
    }
    bj.currentPlayerIndex++;
  }

  startBlackjackDealerTurn(blackjackId);
}

function resolveInstantBlackjackRound(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);

  // Completar el robo de cartas del crupier de forma inmediata
  let dScore = getHandScore(bj.dealer);
  while (dScore < 17) {
    if (bj.deck.length === 0) bj.deck = createStandardDeck();
    bj.dealer.push(bj.deck.pop());
    dScore = getHandScore(bj.dealer);
  }

  // Evaluar y pagar a todos los jugadores que estaban en la mesa
  Object.keys(bj.players).forEach(id => {
    const p = bj.players[id];
    if (!p.isSplit) {
      const pScore = p.score;
      let outcome = (pScore > 21 || p.status === 'BUST') ? 'BUST' : ((dScore > 21 || pScore > dScore) ? 'WIN' : (pScore === dScore ? 'PUSH' : 'LOSE'));
      const res = { playerId: id, result: outcome, playerScore: pScore, dealerScore: dScore, bet: p.bets };
      io.to(id).emit('blackjackResult', { blackjackId, results: { [id]: res }, dealerScore: dScore });
    } else {
      const pScore1 = p.score;
      const pScore2 = p.splitScore || 0;
      let outcome1 = (pScore1 > 21 || (p.handStatus && p.handStatus[0] === 'BUST')) ? 'BUST' : ((dScore > 21 || pScore1 > dScore) ? 'WIN' : (pScore1 === dScore ? 'PUSH' : 'LOSE'));
      let outcome2 = (pScore2 > 21 || (p.handStatus && p.handStatus[1] === 'BUST')) ? 'BUST' : ((dScore > 21 || pScore2 > dScore) ? 'WIN' : (pScore2 === dScore ? 'PUSH' : 'LOSE'));
      const res = { playerId: id, isSplit: true, result: outcome1, result2: outcome2, playerScore: pScore1, playerScore2: pScore2, dealerScore: dScore, bet: p.bets, bet2: p.splitBet || p.bets };
      io.to(id).emit('blackjackResult', { blackjackId, results: { [id]: res }, dealerScore: dScore });
    }
  });

  // Limpiar y resetear la mesa de inmediato a estado WAITING
  bj.phase = 'WAITING';
  bj.dealer = [];
  bj.dealerHiddenCard = null;
  bj.results = {};
  bj.players = {};
  bj.playerOrder = [];
  bj.currentPlayerIndex = -1;
  bj.currentPlayerId = null;

  broadcastBlackjackState(blackjackId);
}

function startBlackjackDealerTurn(blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  const activeSeated = Object.values(bj.players).filter(p => !p.leftTable);
  if (activeSeated.length === 0) {
    resolveInstantBlackjackRound(blackjackId);
    return;
  }

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
        score: dScore,
        cardIndex: bj.dealer.length - 1,
        seatIndex: -1
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
    if (!p.isSplit) {
      const pScore = p.score;
      let outcome = 'LOSE';

      if (pScore > 21 || p.status === 'BUST') {
        outcome = 'BUST';
      } else if (dScore > 21) {
        outcome = 'WIN';
      } else if (pScore > dScore) {
        outcome = 'WIN';
      } else if (pScore === dScore) {
        outcome = 'PUSH';
      } else {
        outcome = 'LOSE';
      }

      const res = {
        playerId: id,
        result: outcome,
        playerScore: pScore,
        dealerScore: dScore,
        bet: p.bets
      };

      bj.results[id] = res;

      io.to(id).emit('blackjackResult', {
        blackjackId,
        results: { [id]: res },
        dealerScore: dScore
      });
    } else {
      const pScore1 = p.score;
      const pScore2 = p.splitScore || 0;
      let outcome1 = 'LOSE', outcome2 = 'LOSE';

      if (pScore1 > 21 || (p.handStatus && p.handStatus[0] === 'BUST')) outcome1 = 'BUST';
      else if (dScore > 21) outcome1 = 'WIN';
      else if (pScore1 > dScore) outcome1 = 'WIN';
      else if (pScore1 === dScore) outcome1 = 'PUSH';
      else outcome1 = 'LOSE';

      if (pScore2 > 21 || (p.handStatus && p.handStatus[1] === 'BUST')) outcome2 = 'BUST';
      else if (dScore > 21) outcome2 = 'WIN';
      else if (pScore2 > dScore) outcome2 = 'WIN';
      else if (pScore2 === dScore) outcome2 = 'PUSH';
      else outcome2 = 'LOSE';

      const res = {
        playerId: id,
        isSplit: true,
        result: outcome1,
        result2: outcome2,
        playerScore: pScore1,
        playerScore2: pScore2,
        dealerScore: dScore,
        bet: p.bets,
        bet2: p.splitBet || p.bets
      };

      bj.results[id] = res;

      io.to(id).emit('blackjackResult', {
        blackjackId,
        results: { [id]: res },
        dealerScore: dScore
      });
    }
  });

  io.to(`blackjack:${blackjackId}`).emit('blackjackResult', {
    blackjackId,
    results: bj.results,
    dealerScore: dScore
  });

  broadcastBlackjackState(blackjackId);

  const activeSeated = Object.values(bj.players).filter(p => !p.leftTable);
  const resetDelay = (activeSeated.length === 0) ? 100 : 4000;

  setTimeout(() => {
    if (blackjacks[blackjackId]) {
      const room = blackjacks[blackjackId];
      room.phase = 'WAITING';
      room.dealer = [];
      room.dealerHiddenCard = null;
      room.results = {};
      room.currentPlayerIndex = -1;
      room.currentPlayerId = null;

      Object.keys(room.players).forEach(id => {
        if (room.players[id].leftTable) {
          delete room.players[id];
          room.playerOrder = room.playerOrder.filter(pId => pId !== id);
        } else {
          room.players[id].hand = [];
          room.players[id].score = 0;
          room.players[id].status = 'WAITING';
          room.players[id].isSplit = false;
          room.players[id].splitHand = [];
          room.players[id].splitScore = 0;
          room.players[id].splitBet = 0;
          room.players[id].activeHandIndex = 0;
          room.players[id].handStatus = ['WAITING', 'WAITING'];
        }
      });
      broadcastBlackjackState(blackjackId);
    }
  }, resetDelay);
}

/* ============================================================
   AUTHORITATIVE MULTIPLAYER DICE VERSUS 1v1 ENGINE
============================================================ */
const diceVersusMatches = {}; // matchId -> match state object

function getOrCreateDiceVersusState(matchId) {
  if (!diceVersusMatches[matchId]) {
    diceVersusMatches[matchId] = {
      matchId: matchId,
      player1: null, // { id, name, seatIndex: 0, bet: 50, accepted: false, balance: 1000 }
      player2: null, // { id, name, seatIndex: 1, bet: 50, accepted: false, balance: 1000 }
      status: 'WAITING_FOR_PLAYER', // 'WAITING_FOR_PLAYER' | 'PLAYER_2_JOINED' | 'BET_PROPOSED' | 'WAITING_FOR_ACCEPTANCE' | 'BET_LOCKED' | 'ROLLING' | 'RESULT' | 'SETTLED' | 'CANCELLED'
      finalBet: 50,
      roundId: 0,
      rollId: null,
      lastResult: null,
      settled: false,
      statusMsg: 'Esperando rival...'
    };
  }
  return diceVersusMatches[matchId];
}

function broadcastDiceVersusState(matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  const payload = {
    matchId: m.matchId,
    status: m.status,
    player1: m.player1,
    player2: m.player2,
    finalBet: m.finalBet,
    roundId: m.roundId,
    rollId: m.rollId,
    lastResult: m.lastResult,
    settled: m.settled,
    statusMsg: m.statusMsg
  };

  io.to(`dice:${matchId}`).emit('diceVersusState', payload);
  return payload;
}

function startDiceVersusRoll(matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  if (m.status !== 'BET_LOCKED' || m.settled || !m.player1 || !m.player2) return;

  m.status = 'ROLLING';
  m.roundId++;
  m.rollId = `${matchId}_r${m.roundId}_${Date.now()}`;
  m.statusMsg = '¡LANZANDO DADOS...!';

  // Server generates random dice rolls for both players
  const p1d1 = Math.floor(Math.random() * 6) + 1;
  const p1d2 = Math.floor(Math.random() * 6) + 1;
  const p1Total = p1d1 + p1d2;

  const p2d1 = Math.floor(Math.random() * 6) + 1;
  const p2d2 = Math.floor(Math.random() * 6) + 1;
  const p2Total = p2d1 + p2d2;

  let winnerId = null;
  let winnerName = null;
  if (p1Total > p2Total) {
    winnerId = m.player1.id;
    winnerName = m.player1.name;
  } else if (p2Total > p1Total) {
    winnerId = m.player2.id;
    winnerName = m.player2.name;
  }

  m.lastResult = {
    matchId: m.matchId,
    rollId: m.rollId,
    finalBet: m.finalBet,
    player1Id: m.player1.id,
    player1Name: m.player1.name,
    player1Dice: [p1d1, p1d2],
    player1Total: p1Total,
    player2Id: m.player2.id,
    player2Name: m.player2.name,
    player2Dice: [p2d1, p2d2],
    player2Total: p2Total,
    winnerId: winnerId,
    winnerName: winnerName
  };

  io.to(`dice:${matchId}`).emit('diceVersusRollStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`dice:${matchId}`).emit('diceVersusRollResult', m.lastResult);

  broadcastDiceVersusState(matchId);

  setTimeout(() => {
    settleDiceVersusMatch(matchId);
  }, 10000);
}

function settleDiceVersusMatch(matchId) {
  const m = getOrCreateDiceVersusState(matchId);
  if (m.settled || !m.lastResult) return;

  m.settled = true;
  m.status = 'SETTLED';

  const res = m.lastResult;
  let msg = '';
  if (res.winnerId === m.player1.id) {
    msg = `¡GANADOR: ${m.player1.name}!`;
  } else if (res.winnerId === m.player2.id) {
    msg = `¡GANADOR: ${m.player2.name}!`;
  } else {
    msg = '¡EMPATE!';
  }
  m.statusMsg = msg;

  io.to(`dice:${matchId}`).emit('diceVersusSettled', {
    matchId: m.matchId,
    rollId: m.rollId,
    winnerId: res.winnerId,
    finalBet: m.finalBet,
    player1Id: m.player1.id,
    player2Id: m.player2.id
  });

  broadcastDiceVersusState(matchId);

  setTimeout(() => {
    if (diceVersusMatches[matchId]) {
      const match = diceVersusMatches[matchId];
      if (match.player1 && match.player2) {
        match.status = 'PLAYER_2_JOINED';
        match.player1.accepted = false;
        match.player2.accepted = false;
        match.settled = false;
        match.rollId = null;
        match.lastResult = null;
        match.statusMsg = 'Rival encontrado. Estableced la apuesta.';
      } else if (match.player1 || match.player2) {
        match.status = 'WAITING_FOR_PLAYER';
        if (match.player1) match.player1.accepted = false;
        if (match.player2) match.player2.accepted = false;
        match.settled = false;
        match.rollId = null;
        match.lastResult = null;
        match.statusMsg = 'Esperando rival...';
      } else {
        delete diceVersusMatches[matchId];
        return;
      }
      broadcastDiceVersusState(matchId);
    }
  }, 4500);
}

/* ============================================================
   AUTHORITATIVE MULTIPLAYER COIN FLIP VERSUS 1v1 ENGINE
============================================================ */
const coinVersusMatches = {}; // matchId -> match state object

function getOrCreateCoinVersusState(matchId) {
  if (!coinVersusMatches[matchId]) {
    coinVersusMatches[matchId] = {
      matchId: matchId,
      player1: null, // { id, name, seatIndex: 0, bet: 50, choice: 'cara', accepted: false, balance: 1000 }
      player2: null, // { id, name, seatIndex: 1, bet: 50, choice: 'cruz', accepted: false, balance: 1000 }
      status: 'WAITING_FOR_PLAYER', // 'WAITING_FOR_PLAYER' | 'PLAYER_2_JOINED' | 'BET_PROPOSED' | 'WAITING_FOR_MATCH' | 'BET_LOCKED' | 'FLIPPING' | 'RESULT' | 'SETTLED' | 'CANCELLED'
      finalBet: 50,
      roundId: 0,
      rollId: null,
      lastResult: null,
      settled: false,
      statusMsg: 'Esperando rival...'
    };
  }
  return coinVersusMatches[matchId];
}

function broadcastCoinVersusState(matchId) {
  const m = getOrCreateCoinVersusState(matchId);
  const payload = {
    matchId: m.matchId,
    status: m.status,
    player1: m.player1,
    player2: m.player2,
    finalBet: m.finalBet,
    roundId: m.roundId,
    rollId: m.rollId,
    lastResult: m.lastResult,
    settled: m.settled,
    statusMsg: m.statusMsg
  };

  io.to(`coin:${matchId}`).emit('coinVersusState', payload);
  return payload;
}

function startCoinVersusFlip(matchId) {
  const m = getOrCreateCoinVersusState(matchId);
  if (m.status !== 'BET_LOCKED' || m.settled || !m.player1 || !m.player2) return;

  m.status = 'FLIPPING';
  m.roundId++;
  m.rollId = `${matchId}_r${m.roundId}_${Date.now()}`;
  m.statusMsg = '¡LANZANDO MONEDA AL AIRE...! 🪙';

  // Server generates authoritative random outcome for the coin flip
  const face = (Math.random() < 0.5) ? 'cara' : 'cruz';
  const winner = (face === 'cara') ? m.player1 : m.player2;

  // Deterministic 3D trajectory seed for all synchronized clients
  const seed = {
    velY: 9.6 + (Math.random() * 1.4),
    angSpeed: 32.0 + (Math.random() * 8.0),
    tiltAngle: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 0.40,
    vz: (Math.random() - 0.5) * 0.40
  };

  m.lastResult = {
    matchId: m.matchId,
    rollId: m.rollId,
    finalBet: m.finalBet,
    pot: m.finalBet * 2,
    face: face,
    winnerId: winner ? winner.id : null,
    winnerName: winner ? winner.name : '',
    winnerSeat: (face === 'cara') ? 0 : 1,
    player1Id: m.player1.id,
    player1Name: m.player1.name,
    player2Id: m.player2.id,
    player2Name: m.player2.name,
    seed: seed
  };

  io.to(`coin:${matchId}`).emit('coinVersusFlipStart', { matchId: m.matchId, rollId: m.rollId });
  io.to(`coin:${matchId}`).emit('coinVersusFlipResult', m.lastResult);

  broadcastCoinVersusState(matchId);

  setTimeout(() => {
    settleCoinVersusMatch(matchId);
  }, 9000);
}

function settleCoinVersusMatch(matchId) {
  const m = getOrCreateCoinVersusState(matchId);
  if (m.settled || !m.lastResult) return;

  m.settled = true;
  m.status = 'SETTLED';

  const res = m.lastResult;
  const msg = `¡GANADOR: ${res.winnerName} (${res.face.toUpperCase()})!`;
  m.statusMsg = msg;

  io.to(`coin:${matchId}`).emit('coinVersusSettled', {
    matchId: m.matchId,
    rollId: m.rollId,
    face: res.face,
    winnerId: res.winnerId,
    winnerName: res.winnerName,
    finalBet: m.finalBet,
    pot: res.pot,
    player1Id: m.player1.id,
    player2Id: m.player2.id
  });

  broadcastCoinVersusState(matchId);

  setTimeout(() => {
    if (coinVersusMatches[matchId]) {
      const match = coinVersusMatches[matchId];
      if (match.player1 && match.player2) {
        match.status = 'PLAYER_2_JOINED';
        match.player1.accepted = false;
        match.player2.accepted = false;
        match.settled = false;
        match.rollId = null;
        match.lastResult = null;
        match.statusMsg = 'Rival presente. Estableced las apuestas.';
      } else if (match.player1 || match.player2) {
        match.status = 'WAITING_FOR_PLAYER';
        if (match.player1) match.player1.accepted = false;
        if (match.player2) match.player2.accepted = false;
        match.settled = false;
        match.rollId = null;
        match.lastResult = null;
        match.statusMsg = 'Esperando rival...';
      } else {
        delete coinVersusMatches[matchId];
        return;
      }
      broadcastCoinVersusState(matchId);
    }
  }, 4000);
}

function getSyncedTvState() {
  const now = Date.now();
  let liveCurrentTime = Math.max(0, Math.floor(tvState.currentTime || 0));
  if (tvState.playing && tvState.videoId) {
    const elapsed = Math.max(0, (now - tvState.updatedAt) / 1000);
    liveCurrentTime = Math.max(0, Math.floor(tvState.currentTime + elapsed));
    tvLastWatched.videoId = tvState.videoId;
    tvLastWatched.url = 'https://www.youtube.com/watch?v=' + tvState.videoId;
    tvLastWatched.currentTime = liveCurrentTime;
    tvLastWatched.updatedAt = now;
  }
  return {
    videoId: tvState.videoId,
    playing: tvState.playing,
    currentTime: liveCurrentTime,
    lastWatched: {
      videoId: tvLastWatched.videoId,
      url: tvLastWatched.url,
      currentTime: Math.max(0, Math.floor(tvLastWatched.currentTime || 0)),
      updatedAt: tvLastWatched.updatedAt
    },
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

  // Send current player & TV & Jukebox state to newly connected player
  socket.emit('init', { id: socket.id, players, tvState: getSyncedTvState(), jukeboxState: getSyncedJukeboxState() });

  // Broadcast new player to all other clients
  socket.broadcast.emit('playerJoined', players[socket.id]);

  // Handle Jukebox (Gramola) Whole-Casino Music Events
  socket.on('jukeboxSyncReq', () => {
    socket.emit('jukeboxStateUpdate', getSyncedJukeboxState());
  });

  socket.on('jukeboxPlayTrack', (data) => {
    if (!data || !data.track) return;
    const pName = (players[socket.id] && players[socket.id].name) || 'DJ Casino';
    jukeboxState.currentTrack = data.track;
    jukeboxState.currentTime = 0;
    jukeboxState.playing = true;
    jukeboxState.updatedAt = Date.now();
    jukeboxState.changerName = data.changerName || pName;

    // Check if track is in playlist; if not, add it
    const existingIdx = jukeboxState.playlist.findIndex(t => t.id === data.track.id || (t.videoId && t.videoId === data.track.videoId));
    if (existingIdx !== -1) {
      jukeboxState.currentIndex = existingIdx;
    } else {
      jukeboxState.playlist.push(data.track);
      jukeboxState.currentIndex = jukeboxState.playlist.length - 1;
    }

    io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
    io.emit('chatMessage', {
      id: 'system',
      name: '🎵 GRAMOLA',
      message: `${jukeboxState.changerName} ha puesto: "${data.track.title} - ${data.track.artist || ''}" en la Gramola`
    });
  });

  socket.on('jukeboxTogglePlay', (data) => {
    if (data && typeof data.playing === 'boolean') {
      jukeboxState.playing = data.playing;
    } else {
      jukeboxState.playing = !jukeboxState.playing;
    }
    if (data && typeof data.currentTime === 'number') {
      jukeboxState.currentTime = Math.max(0, data.currentTime);
    } else {
      jukeboxState.currentTime = getSyncedJukeboxState().currentTime;
    }
    jukeboxState.updatedAt = Date.now();
    io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
  });

  socket.on('jukeboxSeek', (data) => {
    if (!data || typeof data.currentTime !== 'number') return;
    jukeboxState.currentTime = Math.max(0, data.currentTime);
    jukeboxState.updatedAt = Date.now();
    io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
  });

  socket.on('jukeboxNext', () => {
    if (jukeboxState.playlist.length === 0) return;
    jukeboxState.currentIndex = (jukeboxState.currentIndex + 1) % jukeboxState.playlist.length;
    jukeboxState.currentTrack = jukeboxState.playlist[jukeboxState.currentIndex];
    jukeboxState.currentTime = 0;
    jukeboxState.playing = true;
    jukeboxState.updatedAt = Date.now();
    io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
  });

  socket.on('jukeboxPrev', () => {
    if (jukeboxState.playlist.length === 0) return;
    jukeboxState.currentIndex = (jukeboxState.currentIndex - 1 + jukeboxState.playlist.length) % jukeboxState.playlist.length;
    jukeboxState.currentTrack = jukeboxState.playlist[jukeboxState.currentIndex];
    jukeboxState.currentTime = 0;
    jukeboxState.playing = true;
    jukeboxState.updatedAt = Date.now();
    io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
  });

  socket.on('jukeboxSetVolume', (data) => {
    if (data && typeof data.volume === 'number') {
      jukeboxState.volume = Math.max(0, Math.min(100, Math.round(data.volume)));
      io.emit('jukeboxVolumeUpdate', { volume: jukeboxState.volume });
    }
  });

  socket.on('jukeboxAddQueue', (data) => {
    if (!data || !data.track) return;
    jukeboxState.playlist.push(data.track);
    io.emit('jukeboxStateUpdate', getSyncedJukeboxState());
  });

  // Handle TV 3D synchronized events
  socket.on('tvChangeVideo', (data) => {
    if (!data || !data.videoId) return;
    tvState.videoId = data.videoId;
    tvState.playing = data.playing !== undefined ? !!data.playing : true;
    tvState.currentTime = Math.max(0, data.currentTime || 0);
    tvState.updatedAt = Date.now();

    tvLastWatched.videoId = data.videoId;
    tvLastWatched.url = data.url || ('https://www.youtube.com/watch?v=' + data.videoId);
    tvLastWatched.currentTime = tvState.currentTime;
    tvLastWatched.updatedAt = Date.now();

    io.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvPlay', (data) => {
    tvState.playing = true;
    if (data && typeof data.currentTime === 'number') {
      tvState.currentTime = Math.max(0, data.currentTime);
    }
    tvState.updatedAt = Date.now();
    if (tvState.videoId && tvState.currentTime > 0) {
      tvLastWatched.videoId = tvState.videoId;
      tvLastWatched.currentTime = Math.floor(tvState.currentTime);
      tvLastWatched.updatedAt = Date.now();
    }
    socket.broadcast.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvPause', (data) => {
    tvState.playing = false;
    if (data && typeof data.currentTime === 'number') {
      tvState.currentTime = Math.max(0, data.currentTime);
    }
    tvState.updatedAt = Date.now();
    if (tvState.videoId && tvState.currentTime > 0) {
      tvLastWatched.videoId = tvState.videoId;
      tvLastWatched.currentTime = Math.floor(tvState.currentTime);
      tvLastWatched.updatedAt = Date.now();
    }
    socket.broadcast.emit('tvStateUpdate', getSyncedTvState());
  });

  socket.on('tvProgress', (data) => {
    if (!data || !data.videoId) return;
    if (typeof data.currentTime === 'number' && data.currentTime > 0) {
      tvLastWatched.videoId = data.videoId;
      tvLastWatched.url = data.url || ('https://www.youtube.com/watch?v=' + data.videoId);
      tvLastWatched.currentTime = Math.floor(data.currentTime);
      tvLastWatched.updatedAt = Date.now();
      tvState.currentTime = tvLastWatched.currentTime;
      tvState.updatedAt = Date.now();
    }
  });

  socket.on('tvSeek', (data) => {
    if (!data || typeof data.currentTime !== 'number') return;
    tvState.currentTime = Math.max(0, data.currentTime);
    tvState.updatedAt = Date.now();
    if (tvState.videoId) {
      tvLastWatched.videoId = tvState.videoId;
      tvLastWatched.currentTime = Math.floor(tvState.currentTime);
      tvLastWatched.updatedAt = Date.now();
    }
    socket.broadcast.emit('tvStateUpdate', getSyncedTvState());
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
      name: (players[socket.id] && players[socket.id].name) || 'Jugador',
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
        const totalPlayers = Object.keys(r.players).length;
        const userTotal = Object.values((r.userBets && r.userBets[socket.id]) || {}).reduce((s, a) => Math.round((s + (Number(a) || 0)) * 100) / 100, 0);

        // If player is alone at table, require at least one bet to start
        if (totalPlayers <= 1 && userTotal <= 0) {
          socket.emit('rouletteError', { message: 'Debes realizar al menos una apuesta para girar la ruleta en solitario.' });
          return;
        }

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
    if (rId && roulettes[rId] && data.betKey && (typeof data.amount === 'number' || typeof data.amount === 'string')) {
      const r = roulettes[rId];
      if (r.status === 'WAITING' && r.players[socket.id]) {
        const amt = roundMoney(data.amount);
        if (amt > 0) {
          r.bets[data.betKey] = roundMoney((r.bets[data.betKey] || 0) + amt);
          if (!r.userBets[socket.id]) r.userBets[socket.id] = {};
          r.userBets[socket.id][data.betKey] = roundMoney((r.userBets[socket.id][data.betKey] || 0) + amt);
          broadcastRouletteState(rId);
        }
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

    // Si la mesa estaba en juego pero todos los jugadores se habían levantado, resetear inmediatamente a WAITING
    const activeSeated = Object.values(bj.players).filter(p => !p.leftTable && p.id !== socket.id);
    if (activeSeated.length === 0 && bj.phase !== 'WAITING') {
      bj.phase = 'WAITING';
      bj.dealer = [];
      bj.dealerHiddenCard = null;
      bj.results = {};
      bj.players = {};
      bj.playerOrder = [];
      bj.currentPlayerIndex = -1;
      bj.currentPlayerId = null;
    }

    bj.players[socket.id] = {
      id: socket.id,
      name: (players[socket.id] && players[socket.id].name) || 'Jugador',
      seatIndex: data.seatIndex || 0,
      hand: [],
      score: 0,
      bets: data.bet || 50,
      status: 'WAITING',
      leftTable: false
    };

    if (!bj.playerOrder.includes(socket.id)) {
      bj.playerOrder.push(socket.id);
    }

    broadcastBlackjackState(bjId);
  });

  socket.on('blackjackLeave', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : socket.currentBlackjackId;
    if (bjId && blackjacks[bjId]) {
      const bj = blackjacks[bjId];
      delete socket.currentBlackjackId;
      socket.leave(`blackjack:${bjId}`);

      if (bj.players[socket.id]) {
        if (bj.phase === 'DEALING' || bj.phase === 'PLAYER_TURNS' || bj.phase === 'DEALER_TURN') {
          const p = bj.players[socket.id];
          p.status = 'STAND';
          p.handStatus = ['STAND', 'STAND'];
          p.leftTable = true;

          const remainingPending = Object.values(bj.players).filter(pl => !pl.leftTable && pl.status !== 'STAND' && pl.status !== 'BUST');
          if (remainingPending.length === 0) {
            // Si no queda ningún jugador con turno pendiente, resolver de inmediato el crupier
            startBlackjackDealerTurn(bjId);
          } else if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) {
            advanceBlackjackTurn(bjId);
          }
        } else {
          delete bj.players[socket.id];
          bj.playerOrder = bj.playerOrder.filter(id => id !== socket.id);

          if (bj.playerOrder.length === 0) {
            bj.phase = 'WAITING';
            bj.currentPlayerIndex = -1;
            bj.currentPlayerId = null;
            bj.dealer = [];
          }
        }
      }

      broadcastBlackjackState(bjId);
    }
  });

  socket.on('blackjackStartRoundReq', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    const betAmt = (data && typeof data.bet === 'number') ? data.bet : 0;
    if (betAmt <= 0) {
      return;
    }
    socket.join(`blackjack:${bjId}`);
    socket.currentBlackjackId = bjId;

    if (!bj.players[socket.id]) {
      bj.players[socket.id] = {
        id: socket.id,
        name: (players[socket.id] && players[socket.id].name) || 'Jugador',
        seatIndex: (data && typeof data.seatIndex === 'number') ? data.seatIndex : 0,
        hand: [],
        score: 0,
        bets: betAmt,
        status: 'WAITING',
        leftTable: false
      };
    } else {
      bj.players[socket.id].bets = betAmt;
      bj.players[socket.id].leftTable = false;
    }

    if (!bj.playerOrder.includes(socket.id)) {
      bj.playerOrder.push(socket.id);
    }

    // Si la mesa no tiene cartas repartidas o los demás jugadores se habían ido, forzar WAITING
    const activeHands = Object.values(bj.players).filter(p => !p.leftTable && p.hand && p.hand.length > 0);
    if (activeHands.length === 0) {
      bj.phase = 'WAITING';
    }

    if (bj.phase === 'WAITING') {
      const testPair = !!(data && data.forcePairTest);
      startBlackjackDeal(bjId, testPair ? socket.id : null);
    } else {
      broadcastBlackjackState(bjId);
    }
  });

  socket.on('blackjackSplit', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    if (bj.players[socket.id]) {
      const p = bj.players[socket.id];
      if (((bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) || (bj.playerOrder.length === 1 && bj.phase === 'PLAYER_TURNS')) && !p.isSplit && p.hand.length === 2) {
        p.isSplit = true;
        p.splitBet = p.bets;
        const splitCard = p.hand.pop();
        p.splitHand = [splitCard];
        p.activeHandIndex = 0;
        p.handStatus = ['PLAYING', 'PLAYING'];
        p.score = getHandScore(p.hand);
        p.splitScore = getHandScore(p.splitHand);

        io.to(`blackjack:${bjId}`).emit('blackjackSplit', {
          blackjackId: bjId,
          playerId: socket.id,
          seatIndex: p.seatIndex !== undefined ? p.seatIndex : 0,
          hand1: p.hand,
          hand2: p.splitHand,
          score1: p.score,
          score2: p.splitScore,
          splitBet: p.splitBet
        });

        broadcastBlackjackState(bjId);
      }
    }
  });

  socket.on('blackjackHit', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    if (bj.players[socket.id]) {
      const p = bj.players[socket.id];
      if ((bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) || (bj.playerOrder.length === 1 && bj.phase === 'PLAYER_TURNS')) {
        if (bj.deck.length === 0) bj.deck = createStandardDeck();
        const card = bj.deck.pop();
        bj.sequence++;

        if (!p.isSplit) {
          p.hand.push(card);
          p.score = getHandScore(p.hand);

          io.to(`blackjack:${bjId}`).emit('blackjackDealCard', {
            blackjackId: bjId,
            playerId: socket.id,
            target: 'player',
            card: card,
            hidden: false,
            sequence: bj.sequence,
            roundId: bj.roundId,
            score: p.score,
            cardIndex: p.hand.length - 1,
            seatIndex: p.seatIndex !== undefined ? p.seatIndex : 0,
            isSplitHand: false
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
        } else {
          // MODO DIVIDIDO: Jugar Mano 1 o Mano 2
          if (p.activeHandIndex === 0) {
            p.hand.push(card);
            p.score = getHandScore(p.hand);

            io.to(`blackjack:${bjId}`).emit('blackjackDealCard', {
              blackjackId: bjId,
              playerId: socket.id,
              target: 'player',
              card: card,
              hidden: false,
              sequence: bj.sequence,
              roundId: bj.roundId,
              score: p.score,
              cardIndex: p.hand.length - 1,
              seatIndex: p.seatIndex !== undefined ? p.seatIndex : 0,
              isSplitHand: false
            });

            if (p.score > 21) {
              p.handStatus[0] = 'BUST';
              p.activeHandIndex = 1; // Pasar automáticamente a Mano 2
              io.to(`blackjack:${bjId}`).emit('blackjackHandTurn', {
                blackjackId: bjId,
                playerId: socket.id,
                activeHandIndex: 1
              });
            }
            broadcastBlackjackState(bjId);
          } else {
            // Mano 2 (Mano izquierda)
            p.splitHand.push(card);
            p.splitScore = getHandScore(p.splitHand);

            io.to(`blackjack:${bjId}`).emit('blackjackDealCard', {
              blackjackId: bjId,
              playerId: socket.id,
              target: 'player',
              card: card,
              hidden: false,
              sequence: bj.sequence,
              roundId: bj.roundId,
              score: p.splitScore,
              cardIndex: p.splitHand.length - 1,
              seatIndex: p.seatIndex !== undefined ? p.seatIndex : 0,
              isSplitHand: true
            });

            if (p.splitScore > 21) {
              p.handStatus[1] = 'BUST';
              p.status = (p.handStatus[0] === 'BUST') ? 'BUST' : 'STAND';
              setTimeout(() => advanceBlackjackTurn(bjId), 400);
            }
            broadcastBlackjackState(bjId);
          }
        }
      }
    }
  });

  socket.on('blackjackStand', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    if (bj.players[socket.id]) {
      const p = bj.players[socket.id];
      if ((bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) || (bj.playerOrder.length === 1 && bj.phase === 'PLAYER_TURNS')) {
        if (!p.isSplit) {
          p.status = 'STAND';
          advanceBlackjackTurn(bjId);
        } else {
          if (p.activeHandIndex === 0) {
            p.handStatus[0] = 'STAND';
            p.activeHandIndex = 1; // Pasar el control a Mano 2
            io.to(`blackjack:${bjId}`).emit('blackjackHandTurn', {
              blackjackId: bjId,
              playerId: socket.id,
              activeHandIndex: 1
            });
            broadcastBlackjackState(bjId);
          } else {
            p.handStatus[1] = 'STAND';
            p.status = 'STAND';
            advanceBlackjackTurn(bjId);
          }
        }
      }
    }
  });

  socket.on('blackjackDouble', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    if (bj.players[socket.id]) {
      const p = bj.players[socket.id];
      if ((bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) || (bj.playerOrder.length === 1 && bj.phase === 'PLAYER_TURNS')) {
        if (!p.isSplit) {
          if (!p.isDoubled) {
            p.isDoubled = true;
            p.bets = Math.round(p.bets * 2 * 100) / 100;
            broadcastBlackjackState(bjId);
          }
        } else {
          if (p.activeHandIndex === 0) {
            if (!p.hand1Doubled) {
              p.hand1Doubled = true;
              p.bets = Math.round(p.bets * 2 * 100) / 100;
              broadcastBlackjackState(bjId);
            }
          } else {
            if (!p.hand2Doubled) {
              p.hand2Doubled = true;
              p.splitBet = Math.round((p.splitBet || p.bets) * 2 * 100) / 100;
              broadcastBlackjackState(bjId);
            }
          }
        }
      }
    }
  });

  socket.on('blackjackBetChange', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    if (bj.players[socket.id] && data && (typeof data.bet === 'number' || typeof data.bet === 'string')) {
      const amt = roundMoney(data.bet);
      bj.players[socket.id].bets = Math.max(0, amt);
      if (typeof data.seatIndex === 'number') {
        bj.players[socket.id].seatIndex = data.seatIndex;
      }
      broadcastBlackjackState(bjId);
    }
  });

  /* ============================================================
     AUTHORITATIVE MULTIPLAYER DICE VERSUS 1v1 SOCKET EVENTS
  ============================================================ */
  socket.on('diceVersusJoin', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : 'dice-versus-1';
    socket.join(`dice:${matchId}`);
    socket.currentDiceMatchId = matchId;

    const m = getOrCreateDiceVersusState(matchId);
    const pName = (players[socket.id] && players[socket.id].name) || 'Jugador';
    const pBalance = (data && typeof data.balance === 'number') ? data.balance : 1000;
    const reqSeat = (data && typeof data.seatIndex === 'number') ? data.seatIndex : null;

    if (m.player1 && m.player1.id === socket.id) {
      m.player1.name = pName;
      m.player1.balance = pBalance;
    } else if (m.player2 && m.player2.id === socket.id) {
      m.player2.name = pName;
      m.player2.balance = pBalance;
    } else if (reqSeat === 1 && !m.player2) {
      m.player2 = { id: socket.id, name: pName, seatIndex: 1, bet: 50, accepted: false, balance: pBalance };
    } else if (reqSeat === 0 && !m.player1) {
      m.player1 = { id: socket.id, name: pName, seatIndex: 0, bet: 50, accepted: false, balance: pBalance };
    } else if (!m.player1) {
      m.player1 = { id: socket.id, name: pName, seatIndex: 0, bet: 50, accepted: false, balance: pBalance };
    } else if (!m.player2) {
      m.player2 = { id: socket.id, name: pName, seatIndex: 1, bet: 50, accepted: false, balance: pBalance };
    } else {
      socket.emit('diceVersusError', { message: 'La mesa de dados 1v1 está llena.' });
      return;
    }

    if (m.player1 && m.player2) {
      if (m.status === 'WAITING_FOR_PLAYER' || m.status === 'CANCELLED') {
        m.status = 'PLAYER_2_JOINED';
        m.statusMsg = 'Rival encontrado';
        m.player1.accepted = false;
        m.player2.accepted = false;
      }
    } else {
      m.status = 'WAITING_FOR_PLAYER';
      m.statusMsg = 'Esperando rival...';
    }

    broadcastDiceVersusState(matchId);
  });

  socket.on('diceVersusLeave', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (matchId && diceVersusMatches[matchId]) {
      const m = diceVersusMatches[matchId];
      socket.leave(`dice:${matchId}`);
      delete socket.currentDiceMatchId;

      if (m.player1 && m.player1.id === socket.id) m.player1 = null;
      if (m.player2 && m.player2.id === socket.id) m.player2 = null;

      if (!m.player1 && !m.player2) {
        delete diceVersusMatches[matchId];
      } else {
        if (m.status !== 'SETTLED' && m.status !== 'ROLLING') {
          m.status = 'WAITING_FOR_PLAYER';
          m.statusMsg = 'Esperando rival...';
          if (m.player1) m.player1.accepted = false;
          if (m.player2) m.player2.accepted = false;
        }
        broadcastDiceVersusState(matchId);
      }
    }
  });

  socket.on('diceVersusBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status === 'BET_LOCKED' || m.status === 'ROLLING' || m.status === 'SETTLED') return;
    if (!m.player1 || !m.player2) return;

    const betVal = Math.max(10, parseInt(data.bet, 10) || 50);

    if (m.player1.id === socket.id) {
      m.player1.bet = betVal;
      m.player1.accepted = true;
      if (data && typeof data.balance === 'number') m.player1.balance = data.balance;
    } else if (m.player2.id === socket.id) {
      m.player2.bet = betVal;
      m.player2.accepted = true;
      if (data && typeof data.balance === 'number') m.player2.balance = data.balance;
    } else {
      return;
    }

    m.finalBet = Math.max(m.player1.bet, m.player2.bet);

    if (m.player1.accepted && m.player2.accepted) {
      m.status = 'BET_LOCKED';
      m.statusMsg = `¡Bote de $${m.finalBet * 2} fijado ($${m.finalBet} cada uno)! ¡Lanzando dados...!`;
      broadcastDiceVersusState(matchId);

      setTimeout(() => {
        startDiceVersusRoll(matchId);
      }, 1000);
    } else {
      m.status = 'BET_PROPOSED';
      const sender = (m.player1.id === socket.id) ? m.player1.name : m.player2.name;
      m.statusMsg = `${sender} propone bote de $${m.finalBet * 2} ($${m.finalBet} cada uno)`;
      broadcastDiceVersusState(matchId);
    }
  });

  socket.on('diceVersusAcceptBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status === 'BET_LOCKED' || m.status === 'ROLLING' || m.status === 'SETTLED') return;
    if (!m.player1 || !m.player2) return;

    if (m.player1.id === socket.id) {
      m.player1.accepted = true;
      if (data && typeof data.balance === 'number') m.player1.balance = data.balance;
    } else if (m.player2.id === socket.id) {
      m.player2.accepted = true;
      if (data && typeof data.balance === 'number') m.player2.balance = data.balance;
    } else {
      return;
    }

    m.status = 'BET_LOCKED';
    m.statusMsg = `¡Bote de $${m.finalBet * 2} aceptado ($${m.finalBet} cada uno)! ¡Lanzando dados...!`;
    broadcastDiceVersusState(matchId);

    setTimeout(() => {
      startDiceVersusRoll(matchId);
    }, 1000);
  });

  socket.on('diceVersusRejectBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentDiceMatchId;
    if (!matchId || !diceVersusMatches[matchId]) return;

    const m = diceVersusMatches[matchId];
    if (m.status === 'BET_LOCKED' || m.status === 'ROLLING' || m.status === 'SETTLED') return;

    m.status = 'CANCELLED';
    if (m.player1) m.player1.accepted = false;
    if (m.player2) m.player2.accepted = false;
    m.statusMsg = 'Partida cancelada';

    broadcastDiceVersusState(matchId);

    setTimeout(() => {
      if (diceVersusMatches[matchId]) {
        const match = diceVersusMatches[matchId];
        if (match.status === 'CANCELLED' && match.player1 && match.player2) {
          match.status = 'PLAYER_2_JOINED';
          match.statusMsg = 'Rival encontrado. Propón una nueva apuesta.';
          broadcastDiceVersusState(matchId);
        }
      }
    }, 3000);
  });

  /* ============================================================
     AUTHORITATIVE MULTIPLAYER COIN FLIP 1v1 SOCKET EVENTS
  ============================================================ */
  socket.on('coinVersusJoin', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : 'coin-versus-1';
    socket.join(`coin:${matchId}`);
    socket.currentCoinMatchId = matchId;

    const m = getOrCreateCoinVersusState(matchId);
    const pName = (players[socket.id] && players[socket.id].name) || `Jugador_${socket.id.substring(0, 4)}`;
    const pSeat = (data && typeof data.seatIndex === 'number') ? data.seatIndex : 0;
    const pBet = (data && typeof data.bet === 'number') ? data.bet : (m.finalBet || 50);
    const pBalance = (data && typeof data.balance === 'number') ? data.balance : 1000;

    if (pSeat === 0) {
      m.player1 = { id: socket.id, name: pName, seatIndex: 0, bet: pBet, choice: 'cara', accepted: false, balance: pBalance };
    } else {
      m.player2 = { id: socket.id, name: pName, seatIndex: 1, bet: pBet, choice: 'cruz', accepted: false, balance: pBalance };
    }

    if (m.player1 && m.player2) {
      m.status = 'PLAYER_2_JOINED';
      m.statusMsg = `¡Duelo 1 vs 1! ${m.player1.name} (👑 CARA) vs ${m.player2.name} (⚡ CRUZ)`;
    } else {
      m.status = 'WAITING_FOR_PLAYER';
      m.statusMsg = 'Esperando a que se siente un rival...';
    }

    broadcastCoinVersusState(matchId);
  });

  socket.on('coinVersusLeave', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentCoinMatchId;
    if (matchId && coinVersusMatches[matchId]) {
      const m = coinVersusMatches[matchId];
      if (m.player1 && m.player1.id === socket.id) m.player1 = null;
      if (m.player2 && m.player2.id === socket.id) m.player2 = null;

      socket.leave(`coin:${matchId}`);
      socket.currentCoinMatchId = null;

      if (!m.player1 && !m.player2) {
        delete coinVersusMatches[matchId];
      } else {
        if (m.status !== 'SETTLED' && m.status !== 'FLIPPING') {
          m.status = 'WAITING_FOR_PLAYER';
          m.statusMsg = 'Rival desconectado. Esperando rival...';
          if (m.player1) m.player1.accepted = false;
          if (m.player2) m.player2.accepted = false;
        }
        broadcastCoinVersusState(matchId);
      }
    }
  });

  socket.on('coinVersusBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentCoinMatchId;
    if (!matchId || !coinVersusMatches[matchId]) return;
    const m = coinVersusMatches[matchId];
    const betVal = Math.max(10, Math.floor(data.bet || 50));

    if (m.player1 && m.player1.id === socket.id) {
      m.player1.bet = betVal;
      m.player1.accepted = true;
      if (m.player2) {
        m.player2.accepted = (m.player2.bet === betVal);
      }
    } else if (m.player2 && m.player2.id === socket.id) {
      m.player2.bet = betVal;
      m.player2.accepted = true;
      if (m.player1) {
        m.player1.accepted = (m.player1.bet === betVal);
      }
    }

    if (m.player1 && m.player2 && m.player1.bet === m.player2.bet && m.player1.accepted && m.player2.accepted) {
      m.status = 'BET_LOCKED';
      m.finalBet = m.player1.bet;
      m.statusMsg = `¡Apuestas igualadas a $${m.finalBet}! Lanzando moneda...`;
      broadcastCoinVersusState(matchId);
      setTimeout(() => startCoinVersusFlip(matchId), 800);
    } else {
      m.status = 'WAITING_FOR_MATCH';
      const pWho = (m.player1 && m.player1.id === socket.id) ? m.player1.name : (m.player2 ? m.player2.name : 'Un jugador');
      m.statusMsg = `${pWho} apostó $${betVal}. El rival debe igualar para aceptar.`;
      broadcastCoinVersusState(matchId);
    }
  });

  socket.on('coinVersusAcceptBet', (data) => {
    const matchId = (data && data.matchId) ? data.matchId : socket.currentCoinMatchId;
    if (!matchId || !coinVersusMatches[matchId]) return;
    const m = coinVersusMatches[matchId];

    if (m.player1 && m.player1.id === socket.id && m.player2) {
      m.player1.bet = m.player2.bet;
      m.player1.accepted = true;
    } else if (m.player2 && m.player2.id === socket.id && m.player1) {
      m.player2.bet = m.player1.bet;
      m.player2.accepted = true;
    }

    if (m.player1 && m.player2 && m.player1.bet === m.player2.bet) {
      m.status = 'BET_LOCKED';
      m.finalBet = m.player1.bet;
      m.statusMsg = `¡Apuestas igualadas a $${m.finalBet}! Lanzando moneda...`;
      broadcastCoinVersusState(matchId);
      setTimeout(() => startCoinVersusFlip(matchId), 800);
    }
  });

  // Handle chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', {
      id: socket.id,
      name: (players[socket.id] && players[socket.id].name) || 'Anónimo',
      message: msg
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`🔴 Jugador desconectado: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);

    if (socket.currentCoinMatchId && coinVersusMatches[socket.currentCoinMatchId]) {
      const mId = socket.currentCoinMatchId;
      const m = coinVersusMatches[mId];
      if (m.player1 && m.player1.id === socket.id) m.player1 = null;
      if (m.player2 && m.player2.id === socket.id) m.player2 = null;

      if (!m.player1 && !m.player2) {
        delete coinVersusMatches[mId];
      } else {
        if (m.status !== 'SETTLED' && m.status !== 'FLIPPING') {
          m.status = 'WAITING_FOR_PLAYER';
          m.statusMsg = 'Rival desconectado. Esperando rival...';
          if (m.player1) m.player1.accepted = false;
          if (m.player2) m.player2.accepted = false;
        }
        broadcastCoinVersusState(mId);
      }
    }

    if (socket.currentDiceMatchId && diceVersusMatches[socket.currentDiceMatchId]) {
      const mId = socket.currentDiceMatchId;
      const m = diceVersusMatches[mId];
      if (m.player1 && m.player1.id === socket.id) m.player1 = null;
      if (m.player2 && m.player2.id === socket.id) m.player2 = null;

      if (!m.player1 && !m.player2) {
        delete diceVersusMatches[mId];
      } else {
        if (m.status !== 'SETTLED' && m.status !== 'ROLLING') {
          m.status = 'WAITING_FOR_PLAYER';
          m.statusMsg = 'Rival desconectado. Esperando rival...';
          if (m.player1) m.player1.accepted = false;
          if (m.player2) m.player2.accepted = false;
        }
        broadcastDiceVersusState(mId);
      }
    }

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
      if (bj.players[socket.id]) {
        if (bj.phase === 'DEALING' || bj.phase === 'PLAYER_TURNS' || bj.phase === 'DEALER_TURN') {
          const p = bj.players[socket.id];
          p.status = 'STAND';
          p.handStatus = ['STAND', 'STAND'];
          p.leftTable = true;

          const remainingPending = Object.values(bj.players).filter(pl => !pl.leftTable && pl.status !== 'STAND' && pl.status !== 'BUST');
          if (remainingPending.length === 0) {
            startBlackjackDealerTurn(bjId);
          } else if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) {
            advanceBlackjackTurn(bjId);
          }
        } else {
          delete bj.players[socket.id];
          bj.playerOrder = bj.playerOrder.filter(id => id !== socket.id);
          if (bj.playerOrder.length === 0) {
            bj.phase = 'WAITING';
            bj.currentPlayerIndex = -1;
            bj.currentPlayerId = null;
            bj.dealer = [];
          }
        }
      }
      broadcastBlackjackState(bjId);
    }

    // If all players leave the casino, save TV position and clear active screen
    if (Object.keys(players).length === 0) {
      if (tvState.videoId) {
        tvLastWatched.videoId = tvState.videoId;
        tvLastWatched.url = 'https://www.youtube.com/watch?v=' + tvState.videoId;
        tvLastWatched.currentTime = Math.max(0, Math.floor(tvState.currentTime || 0));
        tvLastWatched.updatedAt = Date.now();
      }
      tvState.videoId = '';
      tvState.playing = false;
      tvState.currentTime = 0;
      tvState.updatedAt = Date.now();
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Casino 3D Servidor Multijugador activo en http://localhost:${PORT}`);
});