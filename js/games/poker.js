/* ============================================================
   TEXAS HOLD'EM POKER 3D — FULL GAMEPLAY ENGINE & BOT AI
   ============================================================ */

(function () {
  // --- Bot Presets & Avatars for Table Auto-Fill ---
  const POKER_BOT_PRESETS = [
    { name: 'Elena (Bot)',    color: 0xec4899, chips: 1200 },
    { name: 'Marcus (Bot)',   color: 0x3b82f6, chips: 1500 },
    { name: 'Sophia (Bot)',   color: 0x10b981, chips: 1100 },
    { name: 'Viktor (Bot)',   color: 0xef4444, chips: 2000 },
    { name: 'Lucas (Bot)',    color: 0xf59e0b, chips: 1350 },
    { name: 'Isabella (Bot)', color: 0x8b5cf6, chips: 1400 },
    { name: 'Mateo (Bot)',    color: 0x06b6d4, chips: 1250 }
  ];

  // Local Game State
  window.pokerState = window.pokerState || {
    bet: 50,
    selectedChip: 50,
    pot: 0,
    currentBet: 0,
    phase: 'WAITING', // 'WAITING' | 'PREFLOP' | 'FLOP' | 'TURN' | 'RIVER' | 'SHOWDOWN' | 'ENDED'
    deck: [],
    communityCards: [],
    seats: [],
    mySeatIndex: 0,
    turnIndex: 0,
    inHand: false,
    folded: false
  };

  const pState = window.pokerState;
  let pokerBot3DMeshes = [];
  let poker3DCardMeshes = [];

  // Card Material Cache
  const SUITS = ['♠', '♥', '♦', '♣'];
  const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const RANK_MAP = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };

  function createPokerDeck() {
    const deck = [];
    SUITS.forEach(s => {
      VALUES.forEach(v => {
        deck.push({
          s,
          v,
          rankVal: RANK_MAP[v],
          red: (s === '♥' || s === '♦')
        });
      });
    });
    return deck.sort(() => Math.random() - 0.5);
  }

  // --- Texas Hold'em 7-Card Best Hand Evaluator ---
  function get5CardCombinations(arr) {
    const result = [];
    function backtrack(start, combo) {
      if (combo.length === 5) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        backtrack(i + 1, combo);
        combo.pop();
      }
    }
    backtrack(0, []);
    return result;
  }

  function evaluate5CardHand(hand5) {
    const sorted = [...hand5].sort((a, b) => b.rankVal - a.rankVal);
    const ranks = sorted.map(c => c.rankVal);
    const suits = sorted.map(c => c.s);

    const isFlush = suits.every(s => s === suits[0]);
    
    // Check Straight (including A-2-3-4-5 wheel)
    let isStraight = false;
    let straightHigh = 0;
    if (
      ranks[0] - ranks[1] === 1 &&
      ranks[1] - ranks[2] === 1 &&
      ranks[2] - ranks[3] === 1 &&
      ranks[3] - ranks[4] === 1
    ) {
      isStraight = true;
      straightHigh = ranks[0];
    } else if (ranks[0] === 14 && ranks[1] === 5 && ranks[2] === 4 && ranks[3] === 3 && ranks[4] === 2) {
      isStraight = true;
      straightHigh = 5; // 5-high straight
    }

    // Rank Counts
    const counts = {};
    ranks.forEach(r => counts[r] = (counts[r] || 0) + 1);
    const countPairs = Object.entries(counts).map(([r, c]) => ({ rank: parseInt(r, 10), count: c }));
    countPairs.sort((a, b) => b.count - a.count || b.rank - a.rank);

    // 10: Royal Flush
    if (isFlush && isStraight && straightHigh === 14) {
      return { rank: 10, name: 'Escalera Real 👑', score: 10000000 + straightHigh, cards: sorted };
    }
    // 9: Straight Flush
    if (isFlush && isStraight) {
      const matchCard = sorted.find(c => c.rankVal === straightHigh);
      const highCardName = (matchCard && matchCard.v) ? matchCard.v : straightHigh;
      return { rank: 9, name: `Escalera de Color al ${highCardName}`, score: 9000000 + straightHigh, cards: sorted };
    }
    // 8: Four of a Kind (Póker)
    if (countPairs[0].count === 4) {
      const fourVal = countPairs[0].rank;
      const kicker = countPairs[1].rank;
      return { rank: 8, name: `Póker de ${VALUES[fourVal-2]}`, score: 8000000 + fourVal * 100 + kicker, cards: sorted };
    }
    // 7: Full House
    if (countPairs[0].count === 3 && countPairs[1].count >= 2) {
      const trioVal = countPairs[0].rank;
      const pairVal = countPairs[1].rank;
      return { rank: 7, name: `Full House de ${VALUES[trioVal-2]} y ${VALUES[pairVal-2]}`, score: 7000000 + trioVal * 100 + pairVal, cards: sorted };
    }
    // 6: Flush (Color)
    if (isFlush) {
      const tieVal = ranks.reduce((acc, r, i) => acc + r * Math.pow(15, 4 - i), 0);
      return { rank: 6, name: `Color de ${suits[0]}`, score: 6000000 + tieVal, cards: sorted };
    }
    // 5: Straight (Escalera)
    if (isStraight) {
      return { rank: 5, name: `Escalera al ${VALUES[straightHigh-2]}`, score: 5000000 + straightHigh, cards: sorted };
    }
    // 4: Three of a Kind (Trío)
    if (countPairs[0].count === 3) {
      const trioVal = countPairs[0].rank;
      const kickers = countPairs.slice(1).map(cp => cp.rank);
      return { rank: 4, name: `Trío de ${VALUES[trioVal-2]}`, score: 4000000 + trioVal * 1000 + (kickers[0] || 0) * 15 + (kickers[1] || 0), cards: sorted };
    }
    // 3: Two Pair (Doble Pareja)
    if (countPairs[0].count === 2 && countPairs[1].count === 2) {
      const highPair = Math.max(countPairs[0].rank, countPairs[1].rank);
      const lowPair = Math.min(countPairs[0].rank, countPairs[1].rank);
      const kicker = countPairs[2].rank;
      return { rank: 3, name: `Doble Pareja de ${VALUES[highPair-2]} y ${VALUES[lowPair-2]}`, score: 3000000 + highPair * 1000 + lowPair * 50 + kicker, cards: sorted };
    }
    // 2: One Pair (Pareja)
    if (countPairs[0].count === 2) {
      const pairVal = countPairs[0].rank;
      const kickers = countPairs.slice(1).map(cp => cp.rank);
      return { rank: 2, name: `Pareja de ${VALUES[pairVal-2]}`, score: 2000000 + pairVal * 1000 + (kickers[0]||0)*50 + (kickers[1]||0)*5 + (kickers[2]||0), cards: sorted };
    }
    // 1: High Card (Carta Alta)
    const tieVal = ranks.reduce((acc, r, i) => acc + r * Math.pow(15, 4 - i), 0);
    return { rank: 1, name: `Carta Alta ${sorted[0].v}`, score: 1000000 + tieVal, cards: sorted };
  }

  function evaluateTexasHoldem(allCards) {
    if (!allCards || allCards.length < 5) {
      if (allCards && allCards.length === 2) {
        if (allCards[0].v === allCards[1].v) return { rank: 2, name: `Pareja de ${allCards[0].v} en mano` };
        return { rank: 1, name: `Mano: ${allCards[0].v} y ${allCards[1].v}` };
      }
      return { rank: 0, name: 'Esperando cartas...' };
    }
    const combos = get5CardCombinations(allCards);
    let best = null;
    combos.forEach(c => {
      const ev = evaluate5CardHand(c);
      if (!best || ev.score > best.score) best = ev;
    });
    return best;
  }

  // --- 3D Bot Avatar Management ---
  function populatePokerBotAvatars(mySeatIdx) {
    clearPokerBotAvatars();
    if (typeof createAvatarMesh !== 'function' || typeof scene === 'undefined') return;

    let botIdx = 0;
    for (let i = 0; i < 8; i++) {
      if (i === mySeatIdx) continue;
      const botDef = POKER_BOT_PRESETS[botIdx % POKER_BOT_PRESETS.length];
      botIdx++;

      const ang = i * (Math.PI / 4);
      const chairDist = 3.25;
      const bx = Math.sin(ang) * chairDist;
      const bz = 11.0 + Math.cos(ang) * chairDist;

      const avatar = createAvatarMesh(botDef.name, botDef.color);
      avatar.position.set(bx, 0.44, bz);
      avatar.rotation.y = Math.atan2(-Math.sin(ang), -Math.cos(ang));
      avatar.userData = { isPokerBot: true, seatIndex: i, name: botDef.name };

      scene.add(avatar);
      pokerBot3DMeshes.push(avatar);
    }
  }

  function clearPokerBotAvatars() {
    pokerBot3DMeshes.forEach(mesh => {
      if (mesh.parent) mesh.parent.remove(mesh);
    });
    pokerBot3DMeshes = [];
  }

  // --- 3D Card Creation and Rendering Helpers ---
  function clear3DPokerCards() {
    if (window.poker3DRefs && window.poker3DRefs.cardsGroup) {
      const grp = window.poker3DRefs.cardsGroup;
      while (grp.children && grp.children.length > 0) {
        grp.remove(grp.children[0]);
      }
    }
    poker3DCardMeshes = [];
  }

  function create3DCardMesh(cardObj, isFaceUp = true) {
    if (typeof CARD_GEO === 'undefined' || typeof getCardBackMaterial !== 'function' || typeof getCardFrontMaterial !== 'function') {
      const geo = new THREE.BoxGeometry(0.38, 0.006, 0.54);
      const mat = new THREE.MeshStandardMaterial({ color: isFaceUp ? 0xffffff : 0x1e1b4b });
      return new THREE.Mesh(geo, mat);
    }

    const edgeMat = (typeof CARD_EDGE_MAT !== 'undefined') ? CARD_EDGE_MAT : new THREE.MeshStandardMaterial({ color: 0xefeee8 });
    const frontMat = getCardFrontMaterial(cardObj);
    const backMat = getCardBackMaterial();

    const materials = [
      edgeMat,
      edgeMat,
      isFaceUp ? frontMat : backMat,
      isFaceUp ? backMat : frontMat,
      edgeMat,
      edgeMat
    ];

    const mesh = new THREE.Mesh(CARD_GEO, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { cardObj, isFaceUp };
    return mesh;
  }

  function animatePokerCardDeal3D(cardMesh, targetPos, targetRotY, faceUp = true, delay = 0, onDone) {
    if (!window.poker3DRefs || !window.poker3DRefs.cardsGroup) {
      if (onDone) onDone();
      return;
    }
    const grp = window.poker3DRefs.cardsGroup;

    // Posición inicial en el zapato / caja de baraja 3D en la mesa
    const spawnPos = new THREE.Vector3(-0.85, 0.08, -0.90);
    cardMesh.position.copy(spawnPos);
    cardMesh.rotation.set(0.12, 0.25, faceUp ? 0 : Math.PI);
    grp.add(cardMesh);
    poker3DCardMeshes.push(cardMesh);

    setTimeout(() => {
      playSound('card');
      const start = performance.now();
      const duration = 380;

      const startPos = cardMesh.position.clone();
      const startRot = cardMesh.rotation.clone();
      const targetRotZ = faceUp ? 0 : Math.PI;

      function step(now) {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const easeT = 1 - Math.pow(1 - t, 3); // Cubic ease out

        cardMesh.position.x = startPos.x + (targetPos.x - startPos.x) * easeT;
        cardMesh.position.z = startPos.z + (targetPos.z - startPos.z) * easeT;

        // Arco parabólico de altura en el aire como en blackjack
        const heightArc = Math.sin(t * Math.PI) * 0.28;
        cardMesh.position.y = startPos.y + (targetPos.y - startPos.y) * easeT + heightArc;

        cardMesh.rotation.x = startRot.x * (1 - easeT);
        cardMesh.rotation.y = startRot.y + (targetRotY - startRot.y) * easeT;
        cardMesh.rotation.z = startRot.z + (targetRotZ - startRot.z) * easeT;

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          cardMesh.position.copy(targetPos);
          cardMesh.rotation.set(0, targetRotY, targetRotZ);
          if (onDone) onDone();
        }
      }
      requestAnimationFrame(step);
    }, delay);
  }

  function getPokerSeatCardTransform(sIdx) {
    const ang = sIdx * (Math.PI / 4);
    const cardDist = 2.10;
    const offset = 0.20;

    const sinA = Math.sin(ang);
    const cosA = Math.cos(ang);

    // Carta 1 (Izquierda desde la perspectiva del jugador/bot en ese puesto)
    const pos1 = new THREE.Vector3(
      sinA * cardDist - cosA * offset,
      0.008,
      cosA * cardDist + sinA * offset
    );

    // Carta 2 (Derecha desde la perspectiva del jugador/bot en ese puesto)
    const pos2 = new THREE.Vector3(
      sinA * cardDist + cosA * offset,
      0.011,
      cosA * cardDist - sinA * offset
    );

    // El jugador humano ve sus cartas al derecho (rotY = ang),
    // y los bots tienen sus cartas orientadas hacia su respectivo puesto (rotY = ang + Math.PI)
    const isMySeat = (typeof pState !== 'undefined' && sIdx === pState.mySeatIndex);
    const cardRotY = isMySeat ? ang : (ang + Math.PI);

    return { pos1, pos2, rotY: cardRotY };
  }

  function dealAllPlayersHoleCardsAnimated(onDone) {
    if (!window.poker3DRefs || !window.poker3DRefs.cardsGroup) {
      if (onDone) onDone();
      return;
    }
    clear3DPokerCards();

    let totalCardsToDeal = 0;
    let completedCards = 0;

    pState.seats.forEach(seat => {
      if (seat && seat.active && !seat.folded && seat.cards && seat.cards.length >= 2) {
        totalCardsToDeal += 2;
      }
    });

    if (totalCardsToDeal === 0) {
      if (onDone) onDone();
      return;
    }

    const checkComplete = () => {
      completedCards++;
      if (completedCards >= totalCardsToDeal) {
        if (onDone) onDone();
      }
    };

    // Reparto simultáneo para todos los 8 asientos alrededor del tapete circular
    pState.seats.forEach((seat, sIdx) => {
      if (!seat || !seat.active || seat.folded || !seat.cards || seat.cards.length < 2) return;

      const isMySeat = (sIdx === pState.mySeatIndex);
      const isFaceUp = isMySeat;
      const tf = getPokerSeatCardTransform(sIdx);

      const c1Mesh = create3DCardMesh(seat.cards[0], isFaceUp);
      const c2Mesh = create3DCardMesh(seat.cards[1], isFaceUp);

      // Reparto simultáneo a toda la mesa con micro-desfase cinemático
      const delay1 = sIdx * 20;
      const delay2 = sIdx * 20 + 75;

      animatePokerCardDeal3D(c1Mesh, tf.pos1, tf.rotY, isFaceUp, delay1, checkComplete);
      animatePokerCardDeal3D(c2Mesh, tf.pos2, tf.rotY, isFaceUp, delay2, checkComplete);
    });
  }

  function dealCommunityCardsAnimated(cardsToDeal, startIndex = 0, onDone) {
    if (!window.poker3DRefs || !window.poker3DRefs.cardsGroup || !cardsToDeal || cardsToDeal.length === 0) {
      if (onDone) onDone();
      return;
    }

    let remaining = cardsToDeal.length;
    const stepX = 0.415;
    const startX = -0.830;

    cardsToDeal.forEach((cObj, i) => {
      const globalIdx = startIndex + i;
      const cardMesh = create3DCardMesh(cObj, true);
      const posX = startX + globalIdx * stepX;
      const posY = 0.008 + globalIdx * 0.003; // Apilado progresivo en altura para evitar clipeo
      const targetPos = new THREE.Vector3(posX, posY, 0);
      const delay = i * 80;

      animatePokerCardDeal3D(cardMesh, targetPos, 0, true, delay, () => {
        remaining--;
        if (remaining <= 0 && onDone) onDone();
      });
    });
  }

  function render3DCommunityCards() {
    if (!window.poker3DRefs || !window.poker3DRefs.cardsGroup) return;
    const grp = window.poker3DRefs.cardsGroup;

    const stepX = 0.415;
    const startX = -0.830;

    pState.communityCards.forEach((cObj, idx) => {
      const cardMesh = create3DCardMesh(cObj, true);
      const posX = startX + idx * stepX;
      const posY = 0.008 + idx * 0.003; // Apilado progresivo en altura idéntico a cartas individuales
      cardMesh.position.set(posX, posY, 0);
      grp.add(cardMesh);
      poker3DCardMeshes.push(cardMesh);
    });
  }

  function render3DPlayerHoleCards() {
    if (!window.poker3DRefs || !window.poker3DRefs.cardsGroup) return;
    const grp = window.poker3DRefs.cardsGroup;

    pState.seats.forEach((seat, sIdx) => {
      if (!seat || !seat.active || seat.folded || !seat.cards || seat.cards.length < 2) return;

      const isMySeat = (sIdx === pState.mySeatIndex);
      const isShowdown = (pState.phase === 'SHOWDOWN' || pState.phase === 'ENDED');
      const isFaceUp = isMySeat || isShowdown;
      const tf = getPokerSeatCardTransform(sIdx);

      // Card 1
      const c1Mesh = create3DCardMesh(seat.cards[0], isFaceUp);
      c1Mesh.position.copy(tf.pos1);
      c1Mesh.rotation.y = tf.rotY;
      grp.add(c1Mesh);
      poker3DCardMeshes.push(c1Mesh);

      // Card 2
      const c2Mesh = create3DCardMesh(seat.cards[1], isFaceUp);
      c2Mesh.position.copy(tf.pos2);
      c2Mesh.rotation.y = tf.rotY;
      grp.add(c2Mesh);
      poker3DCardMeshes.push(c2Mesh);
    });
  }

  // --- UI Update Helpers ---
  function updatePokerHUD() {
    const phaseEl = document.getElementById('pokerPhaseBadge');
    if (phaseEl) phaseEl.textContent = `ETAPA: ${pState.phase}`;

    const potEl = document.getElementById('pokerPotDisplay');
    if (potEl) potEl.textContent = `BOTE (POT): ${formatMoney(pState.pot)}`;

    const curBetEl = document.getElementById('pokerCurrentBetDisplay');
    if (curBetEl) curBetEl.textContent = `APUESTA MÁX: ${formatMoney(pState.currentBet)}`;

    const selChipEl = document.getElementById('pokerSelectedChipDisplay');
    if (selChipEl) selChipEl.textContent = formatMoney(pState.selectedChip || 50);

    const betEl = document.getElementById('pokerBetDisplay');
    if (betEl) betEl.textContent = formatMoney(pState.bet || 50);

    const myChipsEl = document.getElementById('pokerMyChipsDisplay');
    if (myChipsEl && pState.seats[pState.mySeatIndex]) {
      myChipsEl.textContent = `FICHAS: ${formatMoney(pState.seats[pState.mySeatIndex].chips)}`;
    }

    const seatLabelEl = document.getElementById('pokerSeatLabel');
    if (seatLabelEl) seatLabelEl.textContent = `🪑 TU ASIENTO: #${pState.mySeatIndex + 1}`;

    // Community Cards Slots
    for (let i = 0; i < 5; i++) {
      const slot = document.getElementById(`commCard${i}`);
      if (!slot) continue;
      const cObj = pState.communityCards[i];
      if (cObj) {
        slot.className = `poker-card-slot ${cObj.red ? 'red' : ''}`;
        slot.innerHTML = `<span style="font-size:12px; align-self:flex-start; margin-left:4px;">${cObj.v}</span><span style="font-size:24px;">${cObj.s}</span>`;
      } else {
        slot.className = 'poker-card-slot back';
        slot.innerHTML = '🂠';
      }
    }

    // Local Player Hole Cards Slots
    const mySeat = pState.seats[pState.mySeatIndex];
    for (let i = 0; i < 2; i++) {
      const slot = document.getElementById(`myCard${i}`);
      if (!slot) continue;
      const cObj = mySeat && mySeat.cards ? mySeat.cards[i] : null;
      if (cObj && (!mySeat.folded || pState.phase === 'SHOWDOWN')) {
        slot.className = `poker-card-slot my-card ${cObj.red ? 'red' : ''}`;
        slot.innerHTML = `<span style="font-size:14px; align-self:flex-start; margin-left:6px;">${cObj.v}</span><span style="font-size:28px;">${cObj.s}</span>`;
      } else {
        slot.className = 'poker-card-slot my-card back';
        slot.innerHTML = '🂠';
      }
    }

    // Hand Rank Evaluation
    const rankEl = document.getElementById('pokerMyHandRank');
    if (rankEl) {
      if (mySeat && mySeat.cards && mySeat.cards.length === 2 && !mySeat.folded) {
        const fullCards = mySeat.cards.concat(pState.communityCards);
        const evalRes = evaluateTexasHoldem(fullCards);
        rankEl.textContent = `Mano: ${evalRes.name}`;
      } else if (mySeat && mySeat.folded) {
        rankEl.textContent = 'Mano: RETIRADO (FOLD)';
      } else {
        rankEl.textContent = 'Mano: Esperando inicio...';
      }
    }

    // Controls visibility
    const readyControls = document.getElementById('pokerReadyControls');
    const actionControls = document.getElementById('pokerActionControls');
    if (readyControls && actionControls) {
      if (pState.phase === 'WAITING' || pState.phase === 'ENDED') {
        readyControls.style.display = 'flex';
        actionControls.style.display = 'none';
      } else {
        readyControls.style.display = 'none';
        actionControls.style.display = 'flex';
      }
    }
  }

  function setPokerStatus(text) {
    const el = document.getElementById('pokerStatusText');
    if (el) el.innerHTML = text;
  }

  // --- Poker Setup & Table Initialization ---
  function initPokerTable(mySeatIdx = 0) {
    pState.mySeatIndex = mySeatIdx;
    pState.phase = 'WAITING';
    pState.pot = 0;
    pState.currentBet = 0;
    pState.communityCards = [];
    pState.deck = [];
    pState.inHand = false;
    pState.folded = false;

    pState.seats = [];
    let botCounter = 0;
    for (let i = 0; i < 8; i++) {
      if (i === mySeatIdx) {
        pState.seats.push({
          id: i,
          name: state.player.name || 'Tú',
          isBot: false,
          chips: 1000,
          bet: 0,
          cards: [],
          folded: false,
          active: true
        });
      } else {
        const bDef = POKER_BOT_PRESETS[botCounter % POKER_BOT_PRESETS.length];
        botCounter++;
        pState.seats.push({
          id: i,
          name: bDef.name,
          isBot: true,
          chips: bDef.chips,
          bet: 0,
          cards: [],
          folded: false,
          active: true
        });
      }
    }

    populatePokerBotAvatars(mySeatIdx);
    clear3DPokerCards();
    if (typeof update3DPokerChips === 'function') update3DPokerChips();
    updatePokerHUD();
    setPokerStatus('♠️ Selecciona tu apuesta inicial y pulsa ¡ESTOY LISTO! para comenzar la partida.');

    // Populate chip rack if empty
    if (typeof populateAllChipRacks === 'function') populateAllChipRacks();
  }

  // --- Hand Lifecycle Management ---
  function startPokerHand() {
    if (pState.inHand) return;
    const initialBet = roundMoney((typeof pState.bet === 'number' && pState.bet > 0) ? pState.bet : (pState.selectedChip || 50));
    pState.bet = initialBet;

    if (state.balance < initialBet) {
      showToast('⚠️ No tienes suficiente saldo para esa apuesta inicial');
      return;
    }

    // Deduct player balance
    state.balance -= initialBet;
    updateBalanceUI();
    playSound('chip');
    playSound('card');

    pState.inHand = true;
    pState.phase = 'PREFLOP';
    pState.pot = initialBet;
    pState.currentBet = initialBet;
    pState.deck = createPokerDeck();
    pState.communityCards = [];
    clear3DPokerCards();

    // Reset players and deal 2 hole cards
    pState.seats.forEach(s => {
      s.folded = false;
      s.active = true;
      if (s.isBot) {
        const botBlind = initialBet;
        s.chips = Math.max(0, s.chips - botBlind);
        s.bet = botBlind;
        pState.pot += botBlind;
      } else {
        s.bet = initialBet;
        s.chips = Math.max(0, s.chips - initialBet);
      }
      s.cards = [pState.deck.pop(), pState.deck.pop()];
    });

    if (typeof update3DPokerChips === 'function') update3DPokerChips();
    updatePokerHUD();
    setPokerStatus(`🃏 <strong>REPARTIENDO...</strong> Vuelo simultáneo de cartas a todos los jugadores.`);

    dealAllPlayersHoleCardsAnimated(() => {
      updatePokerHUD();
      setPokerStatus(`🃏 <strong>PREFLOP</strong>: Cartas repartidas. Bote inicial: ${formatMoney(pState.pot)}. ¿Qué deseas hacer?`);
    });

    const bannerEl = document.getElementById('pokerResultBanner');
    if (bannerEl) bannerEl.classList.remove('show');
  }

  function advanceToFlop() {
    pState.phase = 'FLOP';
    const newCards = [pState.deck.pop(), pState.deck.pop(), pState.deck.pop()];
    pState.communityCards = newCards;
    setPokerStatus(`🂡 <strong>REPARTIENDO FLOP...</strong>`);
    dealCommunityCardsAnimated(newCards, 0, () => {
      updatePokerHUD();
      setPokerStatus(`🂡 <strong>FLOP</strong>: 3 cartas comunitarias en la mesa. Bote actual: ${formatMoney(pState.pot)}. Tu turno.`);
    });
  }

  function advanceToTurn() {
    pState.phase = 'TURN';
    const newCard = pState.deck.pop();
    pState.communityCards.push(newCard);
    setPokerStatus(`🂡 <strong>REPARTIENDO TURN...</strong>`);
    dealCommunityCardsAnimated([newCard], 3, () => {
      updatePokerHUD();
      setPokerStatus(`🂡 <strong>TURN</strong>: 4ª carta comunitaria añadida. Bote actual: ${formatMoney(pState.pot)}. Tu turno.`);
    });
  }

  function advanceToRiver() {
    pState.phase = 'RIVER';
    const newCard = pState.deck.pop();
    pState.communityCards.push(newCard);
    setPokerStatus(`🂡 <strong>REPARTIENDO RIVER...</strong>`);
    dealCommunityCardsAnimated([newCard], 4, () => {
      updatePokerHUD();
      setPokerStatus(`🂡 <strong>RIVER</strong>: 5ª carta comunitaria en mesa. ¡Última ronda de apuestas!`);
    });
  }

  function advanceToShowdown() {
    pState.phase = 'SHOWDOWN';
    clear3DPokerCards();
    render3DCommunityCards();
    render3DPlayerHoleCards(); // Re-render revealing bot cards face up!
    updatePokerHUD();

    // Evaluate all non-folded hands
    const activeSeats = pState.seats.filter(s => !s.folded && s.cards && s.cards.length === 2);
    if (activeSeats.length === 0) {
      endHandNoWinners();
      return;
    }

    const evaluations = activeSeats.map(seat => {
      const fullCards = seat.cards.concat(pState.communityCards);
      const ev = evaluateTexasHoldem(fullCards);
      return { seat, ev };
    });

    evaluations.sort((a, b) => b.ev.score - a.ev.score);
    const winnerObj = evaluations[0];
    const isPlayerWinner = (!winnerObj.seat.isBot);

    // Award Pot
    const winPot = roundMoney(pState.pot);
    winnerObj.seat.chips += winPot;

    const banner = document.getElementById('pokerResultBanner');
    const titleEl = document.getElementById('pokerResultTitle');
    const descEl = document.getElementById('pokerResultDesc');

    if (isPlayerWinner) {
      playSound('win');
      state.balance += winPot;
      updateBalanceUI();
      addXP(300);
      showToast(`🏆 ¡VICTORIA! Ganaste el Bote de Póker de ${formatMoney(winPot)} con ${winnerObj.ev.name}!`);

      if (titleEl) titleEl.textContent = '🏆 ¡HAS GANADO EL BOTE!';
      if (descEl) descEl.textContent = `${winnerObj.ev.name} (+${formatMoney(winPot)})`;
    } else {
      playSound('dice');
      if (titleEl) titleEl.textContent = `👑 GANADOR: ${winnerObj.seat.name}`;
      if (descEl) descEl.textContent = `Se lleva el bote de ${formatMoney(winPot)} con ${winnerObj.ev.name}`;
      showToast(`👑 ${winnerObj.seat.name} gana el Bote con ${winnerObj.ev.name}`);
    }

    if (banner) banner.classList.add('show');
    pState.phase = 'ENDED';
    pState.inHand = false;
    updatePokerHUD();
    setPokerStatus(`🏁 <strong>SHOWDOWN</strong>: Ganador: ${winnerObj.seat.name} con ${winnerObj.ev.name}.`);
  }

  function endHandNoWinners() {
    pState.phase = 'ENDED';
    pState.inHand = false;
    updatePokerHUD();
    setPokerStatus('Todos los jugadores se han retirado.');
  }

  // --- Bot Action AI Simulation ---
  function runBotRound(callback) {
    setPokerStatus('⏳ Los bots están pensando sus jugadas...');
    setTimeout(() => {
      pState.seats.forEach(s => {
        if (!s.isBot || s.folded) return;
        const fullCards = s.cards.concat(pState.communityCards);
        const evalRes = evaluateTexasHoldem(fullCards);
        
        // Simple intelligent bot heuristic
        if (evalRes.rank >= 3) {
          // Strong hand -> Raise or Call
          const raiseVal = roundMoney(pState.bet || 50);
          s.chips = Math.max(0, s.chips - raiseVal);
          s.bet += raiseVal;
          pState.pot += raiseVal;
        } else if (evalRes.rank >= 2 || Math.random() > 0.35) {
          // Medium hand -> Check / Call
        } else {
          // Weak hand -> 20% fold chance
          if (Math.random() < 0.20 && pState.communityCards.length >= 3) {
            s.folded = true;
          }
        }
      });

      playSound('chip');
      if (typeof update3DPokerChips === 'function') update3DPokerChips();
      updatePokerHUD();
      if (callback) callback();
    }, 850);
  }

  function handlePlayerNextPhase() {
    if (pState.phase === 'PREFLOP') {
      runBotRound(() => advanceToFlop());
    } else if (pState.phase === 'FLOP') {
      runBotRound(() => advanceToTurn());
    } else if (pState.phase === 'TURN') {
      runBotRound(() => advanceToRiver());
    } else if (pState.phase === 'RIVER') {
      runBotRound(() => advanceToShowdown());
    }
  }

  // --- DOM Button Bindings ---
  const clearBetBtn = document.getElementById('pokerClearBetBtn');
  if (clearBetBtn) {
    clearBetBtn.addEventListener('click', () => {
      if (pState.inHand) return;
      playSound('chip');
      pState.bet = 0;
      if (pState.seats && pState.seats[pState.mySeatIndex]) {
        pState.seats[pState.mySeatIndex].bet = 0;
      }
      pState.currentBet = 0;
      const d = document.getElementById('pokerBetDisplay');
      if (d) d.textContent = '$0';
      if (typeof update3DPokerChips === 'function') update3DPokerChips();
      showToast('🗑️ Apuesta restablecida a $0. Toca tu círculo en la mesa para añadir fichas.');
    });
  }

  const readyBtn = document.getElementById('pokerReadyBtn');
  if (readyBtn) {
    readyBtn.addEventListener('click', () => {
      startPokerHand();
    });
  }

  const checkBtn = document.getElementById('pokerCheckBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      if (!pState.inHand) return;
      playSound('chip');
      setPokerStatus('✋ Has pasado (Check).');
      handlePlayerNextPhase();
    });
  }

  const callBtn = document.getElementById('pokerCallBtn');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      if (!pState.inHand) return;
      const callAmt = roundMoney(pState.bet || 50);
      if (state.balance < callAmt) { showToast('Saldo insuficiente'); return; }
      state.balance -= callAmt;
      updateBalanceUI();
      pState.pot += callAmt;
      playSound('chip');
      if (typeof update3DPokerChips === 'function') update3DPokerChips();
      setPokerStatus(`🪙 Has igualado ${formatMoney(callAmt)}.`);
      handlePlayerNextPhase();
    });
  }

  const raiseBtn = document.getElementById('pokerRaiseBtn');
  if (raiseBtn) {
    raiseBtn.addEventListener('click', () => {
      if (!pState.inHand) return;
      const raiseAmt = roundMoney((pState.selectedChip || 50) * 2);
      if (state.balance < raiseAmt) { showToast('Saldo insuficiente'); return; }
      state.balance -= raiseAmt;
      updateBalanceUI();
      pState.pot += raiseAmt;
      pState.currentBet += raiseAmt;
      playSound('chip');
      if (typeof update3DPokerChips === 'function') update3DPokerChips();
      setPokerStatus(`📈 Has subido la apuesta en ${formatMoney(raiseAmt)}.`);
      handlePlayerNextPhase();
    });
  }

  const foldBtn = document.getElementById('pokerFoldBtn');
  if (foldBtn) {
    foldBtn.addEventListener('click', () => {
      if (!pState.inHand) return;
      playSound('card');
      const mySeat = pState.seats[pState.mySeatIndex];
      if (mySeat) mySeat.folded = true;
      showToast('🏳️ Te has retirado de la mano (Fold)');
      setPokerStatus('🏳️ Te has retirado. Observando showdown de los bots...');
      runBotRound(() => {
        if (pState.phase === 'PREFLOP') advanceToFlop();
        if (pState.phase === 'FLOP') advanceToTurn();
        if (pState.phase === 'TURN') advanceToRiver();
        advanceToShowdown();
      });
    });
  }

  const allInBtn = document.getElementById('pokerAllInActionBtn');
  if (allInBtn) {
    allInBtn.addEventListener('click', () => {
      if (!pState.inHand) return;
      const allInAmt = Math.min(state.balance, 500);
      if (allInAmt <= 0) { showToast('Saldo insuficiente'); return; }
      state.balance -= allInAmt;
      updateBalanceUI();
      pState.pot += allInAmt;
      playSound('chip');
      if (typeof update3DPokerChips === 'function') update3DPokerChips();
      showToast(`👑 ¡ALL-IN POR ${formatMoney(allInAmt)}!`);
      runBotRound(() => {
        if (pState.phase === 'PREFLOP') advanceToFlop();
        if (pState.phase === 'FLOP') advanceToTurn();
        if (pState.phase === 'TURN') advanceToRiver();
        advanceToShowdown();
      });
    });
  }

  const nextHandBtn = document.getElementById('pokerNextHandBtn');
  if (nextHandBtn) {
    nextHandBtn.addEventListener('click', () => {
      const bannerEl = document.getElementById('pokerResultBanner');
      if (bannerEl) bannerEl.classList.remove('show');
      initPokerTable(pState.mySeatIndex);
    });
  }

  // --- Window Global Bindings ---
  window.initPokerTable = initPokerTable;
  window.startPokerHand = startPokerHand;
  window.clearPokerBotAvatars = clearPokerBotAvatars;
})();
