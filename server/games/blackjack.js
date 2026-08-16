// ============================================================
// AUTHORITATIVE MULTIPLAYER BLACKJACK ENGINE (SERVER)
// ============================================================

const { roundMoney } = require('../state');

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
      dealer: [],
      dealerHiddenCard: null,
      phase: 'WAITING', // 'WAITING' | 'DEALING' | 'PLAYER_TURNS' | 'DEALER_TURN' | 'RESULT'
      currentPlayerIndex: -1,
      currentPlayerId: null,
      playerOrder: [],
      deck: createStandardDeck(),
      roundId: 0,
      sequence: 0,
      results: {}
    };
  }
  return blackjacks[blackjackId];
}

function broadcastBlackjackState(io, blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  const totalPlayers = Object.keys(bj.players).length;

  const publicDealer = bj.dealer.map(c => c.hidden ? { s: '?', v: '?', hidden: true, red: false } : c);

  const payload = {
    blackjackId: bj.blackjackId,
    phase: bj.phase,
    dealer: publicDealer,
    dealerScore: getHandScore(bj.dealer.filter(c => !c.hidden)),
    players: bj.players,
    currentPlayerId: bj.currentPlayerId,
    currentPlayerIndex: bj.currentPlayerIndex,
    roundId: bj.roundId,
    sequence: bj.sequence,
    totalPlayers: totalPlayers,
    results: bj.results
  };

  io.to(`blackjack:${blackjackId}`).emit('blackjackState', payload);
  return payload;
}

function startBlackjackDeal(io, blackjackId, forcePairPlayerId = null) {
  const bj = getOrCreateBlackjackState(blackjackId);
  bj.phase = 'DEALING';
  bj.roundId++;
  bj.sequence = 0;
  bj.deck = createStandardDeck();
  bj.dealer = [];
  bj.dealerHiddenCard = null;
  bj.results = {};

  const seatedIds = Object.keys(bj.players).filter(id => !bj.players[id].leftTable);
  bj.playerOrder = seatedIds;

  seatedIds.forEach(id => {
    bj.players[id].hand = [];
    bj.players[id].isSplit = false;
    bj.players[id].splitHand = null;
    bj.players[id].splitBet = 0;
    bj.players[id].activeHandIndex = 0;
    bj.players[id].isDoubled = false;
    bj.players[id].hand1Doubled = false;
    bj.players[id].hand2Doubled = false;
    bj.players[id].status = 'PLAYING';
    bj.players[id].handStatus = ['PLAYING', 'STAND'];
    bj.players[id].score = 0;
    bj.players[id].splitScore = 0;
  });

  const dealQueue = [];

  // Ronda 1: Carta para cada jugador
  seatedIds.forEach(id => {
    dealQueue.push({ target: 'player', id });
  });

  // Ronda 1: Carta descubierta para el crupier
  dealQueue.push({ target: 'dealer', hidden: false });

  // Ronda 2: Segunda carta para cada jugador
  seatedIds.forEach(id => {
    dealQueue.push({ target: 'player', id });
  });

  // Ronda 2: Carta oculta para el crupier
  dealQueue.push({ target: 'dealer', hidden: true });

  let dealIndex = 0;
  function processNextCard() {
    if (dealIndex >= dealQueue.length) {
      bj.phase = 'PLAYER_TURNS';
      bj.currentPlayerIndex = 0;
      bj.currentPlayerId = bj.playerOrder[0] || null;

      seatedIds.forEach(id => {
        const p = bj.players[id];
        if (p.score === 21) {
          p.status = 'BLACKJACK';
          p.handStatus = ['BLACKJACK', 'STAND'];
        }
      });

      broadcastBlackjackState(io, blackjackId);

      const firstPlayer = bj.players[bj.currentPlayerId];
      if (firstPlayer && firstPlayer.status === 'BLACKJACK') {
        setTimeout(() => advanceBlackjackTurn(io, blackjackId), 800);
      }
      return;
    }

    const item = dealQueue[dealIndex++];
    bj.sequence++;

    if (item.target === 'player') {
      let card = bj.deck.pop();
      if (forcePairPlayerId && item.id === forcePairPlayerId) {
        const p = bj.players[item.id];
        if (p.hand.length === 1) {
          const firstVal = p.hand[0].v;
          const matchingIdx = bj.deck.findIndex(c => c.v === firstVal);
          if (matchingIdx !== -1) {
            card = bj.deck.splice(matchingIdx, 1)[0];
          } else {
            card = { s: '♦', v: firstVal, red: true };
          }
        }
      }

      bj.players[item.id].hand.push(card);
      bj.players[item.id].score = getHandScore(bj.players[item.id].hand);

      io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
        blackjackId,
        playerId: item.id,
        target: 'player',
        card: card,
        hidden: false,
        sequence: bj.sequence,
        roundId: bj.roundId,
        score: bj.players[item.id].score,
        cardIndex: bj.players[item.id].hand.length - 1,
        seatIndex: bj.players[item.id].seatIndex !== undefined ? bj.players[item.id].seatIndex : 0,
        isSplitHand: false
      });
    } else {
      const card = bj.deck.pop();
      if (item.hidden) {
        bj.dealerHiddenCard = card;
        bj.dealer.push({ s: '?', v: '?', hidden: true });
      } else {
        bj.dealer.push(card);
      }

      io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
        blackjackId,
        target: 'dealer',
        card: item.hidden ? { s: '?', v: '?', hidden: true } : card,
        hidden: item.hidden,
        sequence: bj.sequence,
        roundId: bj.roundId,
        score: getHandScore(bj.dealer.filter(c => !c.hidden)),
        cardIndex: bj.dealer.length - 1
      });
    }

    broadcastBlackjackState(io, blackjackId);
    setTimeout(processNextCard, 350);
  }

  processNextCard();
}

function advanceBlackjackTurn(io, blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  bj.currentPlayerIndex++;

  if (bj.currentPlayerIndex >= bj.playerOrder.length) {
    startBlackjackDealerTurn(io, blackjackId);
  } else {
    bj.currentPlayerId = bj.playerOrder[bj.currentPlayerIndex];
    const curr = bj.players[bj.currentPlayerId];
    if (curr && (curr.status === 'BLACKJACK' || curr.status === 'BUST' || curr.leftTable)) {
      advanceBlackjackTurn(io, blackjackId);
    } else {
      broadcastBlackjackState(io, blackjackId);
    }
  }
}

function startBlackjackDealerTurn(io, blackjackId) {
  const bj = getOrCreateBlackjackState(blackjackId);
  bj.phase = 'DEALER_TURN';
  bj.currentPlayerId = null;

  if (bj.dealerHiddenCard && bj.dealer.length >= 2) {
    bj.dealer[1] = bj.dealerHiddenCard;
    bj.dealerHiddenCard = null;

    io.to(`blackjack:${blackjackId}`).emit('blackjackRevealDealerCard', {
      blackjackId,
      card: bj.dealer[1],
      score: getHandScore(bj.dealer)
    });
    broadcastBlackjackState(io, blackjackId);
  }

  const allBustOrLeft = Object.values(bj.players).every(p => p.status === 'BUST' || p.leftTable || (p.isSplit && p.handStatus[0] === 'BUST' && p.handStatus[1] === 'BUST'));

  function dealerDrawStep() {
    let dScore = getHandScore(bj.dealer);

    if (dScore < 17 && !allBustOrLeft) {
      bj.sequence++;
      const card = bj.deck.pop();
      bj.dealer.push(card);
      dScore = getHandScore(bj.dealer);

      io.to(`blackjack:${blackjackId}`).emit('blackjackDealCard', {
        blackjackId,
        target: 'dealer',
        card: card,
        hidden: false,
        sequence: bj.sequence,
        roundId: bj.roundId,
        score: dScore,
        cardIndex: bj.dealer.length - 1
      });

      broadcastBlackjackState(io, blackjackId);
      setTimeout(dealerDrawStep, 600);
    } else {
      finishBlackjackRound(io, blackjackId, dScore);
    }
  }

  setTimeout(dealerDrawStep, 600);
}

function finishBlackjackRound(io, blackjackId, dealerScore) {
  const bj = getOrCreateBlackjackState(blackjackId);
  bj.phase = 'RESULT';
  bj.results = {};

  const dealerBust = dealerScore > 21;
  const dealerBJ = (bj.dealer.length === 2 && dealerScore === 21);

  Object.keys(bj.players).forEach(id => {
    const p = bj.players[id];
    if (p.leftTable) return;

    if (!p.isSplit) {
      const pScore = p.score;
      const isBJ = (p.status === 'BLACKJACK' || (p.hand.length === 2 && pScore === 21));

      if (p.status === 'BUST' || pScore > 21) {
        bj.results[id] = { result: 'LOSE', payout: 0, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: `Te pasaste (${pScore})` };
      } else if (isBJ) {
        if (dealerBJ) {
          bj.results[id] = { result: 'PUSH', payout: p.bets, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: 'Empate de Blackjack' };
        } else {
          const win = Math.round(p.bets * 2.5 * 100) / 100;
          bj.results[id] = { result: 'BLACKJACK', payout: win, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: '¡Blackjack Natural! (3:2)' };
        }
      } else if (dealerBust) {
        const win = Math.round(p.bets * 2 * 100) / 100;
        bj.results[id] = { result: 'WIN', payout: win, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: `Crupier se pasó (${dealerScore})` };
      } else if (pScore > dealerScore) {
        const win = Math.round(p.bets * 2 * 100) / 100;
        bj.results[id] = { result: 'WIN', payout: win, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: `¡Ganaste! (${pScore} vs ${dealerScore})` };
      } else if (pScore === dealerScore) {
        bj.results[id] = { result: 'PUSH', payout: p.bets, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: `Empate (${pScore})` };
      } else {
        bj.results[id] = { result: 'LOSE', payout: 0, bet: p.bets, score: pScore, isDoubled: !!p.isDoubled, msg: `Crupier gana (${dealerScore} vs ${pScore})` };
      }
    } else {
      const s1 = p.score;
      const s2 = p.splitScore;
      let r1 = 'LOSE', p1 = 0, m1 = '';
      let r2 = 'LOSE', p2 = 0, m2 = '';

      if (p.handStatus[0] === 'BUST' || s1 > 21) { r1 = 'LOSE'; p1 = 0; m1 = 'Mano 1 se pasó'; }
      else if (dealerBust) { r1 = 'WIN'; p1 = Math.round(p.bets * 2 * 100) / 100; m1 = 'Mano 1 Gana'; }
      else if (s1 > dealerScore) { r1 = 'WIN'; p1 = Math.round(p.bets * 2 * 100) / 100; m1 = 'Mano 1 Gana'; }
      else if (s1 === dealerScore) { r1 = 'PUSH'; p1 = p.bets; m1 = 'Mano 1 Empata'; }
      else { r1 = 'LOSE'; p1 = 0; m1 = 'Mano 1 Pierde'; }

      const bet2 = p.splitBet || p.bets;
      if (p.handStatus[1] === 'BUST' || s2 > 21) { r2 = 'LOSE'; p2 = 0; m2 = 'Mano 2 se pasó'; }
      else if (dealerBust) { r2 = 'WIN'; p2 = Math.round(bet2 * 2 * 100) / 100; m2 = 'Mano 2 Gana'; }
      else if (s2 > dealerScore) { r2 = 'WIN'; p2 = Math.round(bet2 * 2 * 100) / 100; m2 = 'Mano 2 Gana'; }
      else if (s2 === dealerScore) { r2 = 'PUSH'; p2 = bet2; m2 = 'Mano 2 Empata'; }
      else { r2 = 'LOSE'; p2 = 0; m2 = 'Mano 2 Pierde'; }

      bj.results[id] = {
        result: 'SPLIT_RESULT',
        isSplit: true,
        payout: Math.round((p1 + p2) * 100) / 100,
        bet: p.bets,
        bet2: bet2,
        hand1: { result: r1, payout: p1, msg: m1, score: s1 },
        hand2: { result: r2, payout: p2, msg: m2, score: s2 },
        msg: `${m1} · ${m2}`
      };
    }
  });

  const resultPayload = {
    blackjackId,
    dealerScore,
    results: bj.results,
    roundId: bj.roundId
  };

  io.to(`blackjack:${blackjackId}`).emit('blackjackRoundResult', resultPayload);
  io.to(`blackjack:${blackjackId}`).emit('blackjackResult', resultPayload);

  broadcastBlackjackState(io, blackjackId);

  setTimeout(() => {
    if (blackjacks[blackjackId]) {
      const nextBj = blackjacks[blackjackId];
      nextBj.phase = 'WAITING';
      nextBj.dealer = [];
      nextBj.dealerHiddenCard = null;
      nextBj.results = {};
      nextBj.currentPlayerIndex = -1;
      nextBj.currentPlayerId = null;

      Object.keys(nextBj.players).forEach(id => {
        if (nextBj.players[id].leftTable) {
          delete nextBj.players[id];
        } else {
          nextBj.players[id].hand = [];
          nextBj.players[id].isSplit = false;
          nextBj.players[id].splitHand = null;
          nextBj.players[id].splitBet = 0;
          nextBj.players[id].activeHandIndex = 0;
          nextBj.players[id].isDoubled = false;
          nextBj.players[id].hand1Doubled = false;
          nextBj.players[id].hand2Doubled = false;
          nextBj.players[id].status = 'WAITING';
          nextBj.players[id].score = 0;
          nextBj.players[id].splitScore = 0;
        }
      });

      broadcastBlackjackState(io, blackjackId);
    }
  }, 5000);
}

function setupBlackjackSocketEvents(io, socket, players) {
  socket.on('blackjackJoin', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : 'blackjack';
    socket.join(`blackjack:${bjId}`);
    socket.currentBlackjackId = bjId;

    const bj = getOrCreateBlackjackState(bjId);

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

    broadcastBlackjackState(io, bjId);
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
            startBlackjackDealerTurn(io, bjId);
          } else if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) {
            advanceBlackjackTurn(io, bjId);
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

      broadcastBlackjackState(io, bjId);
    }
  });

  socket.on('blackjackStartRoundReq', (data) => {
    const bjId = (data && data.blackjackId) ? data.blackjackId : (socket.currentBlackjackId || 'blackjack');
    const bj = getOrCreateBlackjackState(bjId);
    const betAmt = (data && typeof data.bet === 'number') ? data.bet : 0;
    if (betAmt <= 0) return;

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

    const activeHands = Object.values(bj.players).filter(p => !p.leftTable && p.hand && p.hand.length > 0);
    if (activeHands.length === 0) {
      bj.phase = 'WAITING';
    }

    if (bj.phase === 'WAITING') {
      const testPair = !!(data && data.forcePairTest);
      startBlackjackDeal(io, bjId, testPair ? socket.id : null);
    } else {
      broadcastBlackjackState(io, bjId);
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

        broadcastBlackjackState(io, bjId);
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

          broadcastBlackjackState(io, bjId);

          if (p.score > 21) {
            p.status = 'BUST';
            io.to(`blackjack:${bjId}`).emit('blackjackPlayerBust', {
              blackjackId: bjId,
              playerId: socket.id,
              score: p.score
            });
            setTimeout(() => advanceBlackjackTurn(io, bjId), 400);
          }
        } else {
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
              p.activeHandIndex = 1;
              io.to(`blackjack:${bjId}`).emit('blackjackHandTurn', {
                blackjackId: bjId,
                playerId: socket.id,
                activeHandIndex: 1
              });
            }
            broadcastBlackjackState(io, bjId);
          } else {
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
              setTimeout(() => advanceBlackjackTurn(io, bjId), 400);
            }
            broadcastBlackjackState(io, bjId);
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
          advanceBlackjackTurn(io, bjId);
        } else {
          if (p.activeHandIndex === 0) {
            p.handStatus[0] = 'STAND';
            p.activeHandIndex = 1;
            io.to(`blackjack:${bjId}`).emit('blackjackHandTurn', {
              blackjackId: bjId,
              playerId: socket.id,
              activeHandIndex: 1
            });
            broadcastBlackjackState(io, bjId);
          } else {
            p.handStatus[1] = 'STAND';
            p.status = 'STAND';
            advanceBlackjackTurn(io, bjId);
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
            broadcastBlackjackState(io, bjId);
          }
        } else {
          if (p.activeHandIndex === 0) {
            if (!p.hand1Doubled) {
              p.hand1Doubled = true;
              p.bets = Math.round(p.bets * 2 * 100) / 100;
              broadcastBlackjackState(io, bjId);
            }
          } else {
            if (!p.hand2Doubled) {
              p.hand2Doubled = true;
              p.splitBet = Math.round((p.splitBet || p.bets) * 2 * 100) / 100;
              broadcastBlackjackState(io, bjId);
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
      broadcastBlackjackState(io, bjId);
    }
  });
}

function handleBlackjackDisconnect(io, socket) {
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
          startBlackjackDealerTurn(io, bjId);
        } else if (bj.phase === 'PLAYER_TURNS' && bj.currentPlayerId === socket.id) {
          advanceBlackjackTurn(io, bjId);
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
    broadcastBlackjackState(io, bjId);
  }
}

module.exports = {
  blackjacks,
  createStandardDeck,
  getHandScore,
  getOrCreateBlackjackState,
  broadcastBlackjackState,
  startBlackjackDeal,
  advanceBlackjackTurn,
  startBlackjackDealerTurn,
  finishBlackjackRound,
  setupBlackjackSocketEvents,
  handleBlackjackDisconnect
};
