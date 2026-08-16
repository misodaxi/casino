/* ============================================================
         3. BLACKJACK 3D LOGIC & ANIMATED 3D CARDS
      ============================================================ */
      var bjState = {
        bet: 50,
        deck: [],
        player: [],
        dealer: [],
        player3DMeshes: [],
        dealer3DMeshes: [],
        active: false
      };

      function createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];
        suits.forEach(s => values.forEach(v => deck.push({ s, v, red: (s === '♥' || s === '♦') })));
        return deck.sort(() => Math.random() - 0.5);
      }

      function getHandScore(hand) {
        if (!hand || !Array.isArray(hand)) return 0;
        let total = 0, aces = 0;
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

      // Shared 3D Card Geometry & Material Pool (Zero Garbage Allocations per Deal)
      const CARD_GEO = new THREE.BoxGeometry(0.396, 0.007, 0.558);
      const CARD_EDGE_MAT = new THREE.MeshStandardMaterial({ color: 0xefeee8, roughness: 0.7 });

      let _cardBackTex = null;
      let _cardBackMat = null;
      function getCardBackMaterial() {
        if (_cardBackMat) return _cardBackMat;
        const bCanvas = document.createElement('canvas'); bCanvas.width = 256; bCanvas.height = 384;
        const bCtx = bCanvas.getContext('2d');
        bCtx.fillStyle = '#1b0d2b'; bCtx.fillRect(0, 0, 256, 384);
        bCtx.strokeStyle = '#d4af37'; bCtx.lineWidth = 6; bCtx.strokeRect(8, 8, 240, 368);
        bCtx.strokeStyle = 'rgba(212,175,55,0.35)'; bCtx.lineWidth = 2;
        for (let i = -300; i < 600; i += 30) {
          bCtx.beginPath(); bCtx.moveTo(i, 0); bCtx.lineTo(i + 300, 384); bCtx.stroke();
          bCtx.beginPath(); bCtx.moveTo(i, 384); bCtx.lineTo(i + 300, 0); bCtx.stroke();
        }
        bCtx.beginPath(); bCtx.arc(128, 192, 60, 0, Math.PI * 2);
        bCtx.fillStyle = '#2a1145'; bCtx.fill(); bCtx.strokeStyle = '#f59e0b'; bCtx.lineWidth = 4; bCtx.stroke();
        bCtx.font = 'bold 50px Segoe UI'; bCtx.fillStyle = '#f59e0b'; bCtx.textAlign = 'center'; bCtx.textBaseline = 'middle';
        bCtx.fillText('♠', 128, 192);
        _cardBackTex = new THREE.CanvasTexture(bCanvas);
        _cardBackMat = new THREE.MeshStandardMaterial({ map: _cardBackTex, roughness: 0.35 });
        return _cardBackMat;
      }

      const _cardFrontMatCache = {};
      function getCardFrontMaterial(cardObj) {
        const key = cardObj ? (cardObj.v + '_' + cardObj.s) : 'hidden';
        if (_cardFrontMatCache[key]) return _cardFrontMatCache[key];

        const fCanvas = document.createElement('canvas'); fCanvas.width = 256; fCanvas.height = 384;
        const fCtx = fCanvas.getContext('2d');
        fCtx.fillStyle = '#fcfbf7'; fCtx.fillRect(0, 0, 256, 384);
        fCtx.strokeStyle = '#d4af37'; fCtx.lineWidth = 6; fCtx.strokeRect(8, 8, 240, 368);

        const isRed = cardObj ? (cardObj.s === '♥' || cardObj.s === '♦') : false;
        const mainColor = isRed ? '#dc2626' : '#111827';

        if (cardObj) {
          fCtx.font = '900 48px Segoe UI, Arial';
          fCtx.fillStyle = mainColor;
          fCtx.textAlign = 'left';
          fCtx.fillText(cardObj.v, 20, 56);
          fCtx.font = '40px Segoe UI';
          fCtx.fillText(cardObj.s, 20, 100);

          fCtx.save();
          fCtx.translate(236, 328);
          fCtx.rotate(Math.PI);
          fCtx.font = '900 48px Segoe UI, Arial';
          fCtx.fillText(cardObj.v, 0, 0);
          fCtx.font = '40px Segoe UI';
          fCtx.fillText(cardObj.s, 0, -44);
          fCtx.restore();

          fCtx.font = '110px Segoe UI';
          fCtx.textAlign = 'center';
          fCtx.textBaseline = 'middle';
          fCtx.fillText(cardObj.s, 128, 192);
        }
        const frontTex = new THREE.CanvasTexture(fCanvas);
        const frontMat = new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.35 });
        _cardFrontMatCache[key] = frontMat;
        return frontMat;
      }

      // Generate a 3D Card Mesh from Cached Shared Assets
      function make3DCardMesh(cardObj, faceUp = true) {
        const topMat = getCardFrontMaterial(cardObj);
        const botMat = getCardBackMaterial();
        const materials = [CARD_EDGE_MAT, CARD_EDGE_MAT, topMat, botMat, CARD_EDGE_MAT, CARD_EDGE_MAT];
        const mesh = new THREE.Mesh(CARD_GEO, materials);
        mesh.castShadow = true; mesh.receiveShadow = true;

        if (!faceUp) {
          mesh.rotation.z = Math.PI;
        }
        return mesh;
      }

      // Animate card sliding from shoe to 3D spot on felt
      function animateCardDeal3D(cardMesh, targetPos, faceUp = true, delay = 0, onDone, targetRotY = 0) {
        if (!window.bj3DRefs) { onDone && onDone(); return; }

        const spawnPos = new THREE.Vector3(-1.3, 0.15, 0.25);
        cardMesh.position.copy(spawnPos);
        cardMesh.rotation.set(0.1, 0.35, faceUp ? 0 : Math.PI);
        window.bj3DRefs.cardsGroup.add(cardMesh);

        setTimeout(() => {
          playSound('card_deal');
          const start = performance.now();
          const duration = 380;

          const startPos = cardMesh.position.clone();
          const startRot = cardMesh.rotation.clone();
          const targetRotZ = faceUp ? 0 : Math.PI;

          function step(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const easeT = 1 - Math.pow(1 - t, 3);

            cardMesh.position.x = startPos.x + (targetPos.x - startPos.x) * easeT;
            cardMesh.position.z = startPos.z + (targetPos.z - startPos.z) * easeT;

            const heightArc = Math.sin(t * Math.PI) * 0.22;
            cardMesh.position.y = startPos.y + (targetPos.y - startPos.y) * easeT + heightArc;

            cardMesh.rotation.x = startRot.x * (1 - easeT);
            cardMesh.rotation.y = startRot.y + (targetRotY - startRot.y) * easeT;
            cardMesh.rotation.z = startRot.z + (targetRotZ - startRot.z) * easeT;

            if (t < 1) requestAnimationFrame(step);
            else {
              cardMesh.position.copy(targetPos);
              cardMesh.rotation.set(0, targetRotY, targetRotZ);
              onDone && onDone();
            }
          }
          requestAnimationFrame(step);
        }, delay);
      }

      // Flip dealer second card 3D mesh
      function flipCard3D(cardMesh, onDone) {
        playSound('card_flip');
        const start = performance.now();
        const duration = 350;
        const startRotZ = cardMesh.rotation.z;
        const targetRotZ = 0;
        const startY = cardMesh.position.y;

        function step(now) {
          const t = Math.min(1, (now - start) / duration);
          const easeT = 1 - Math.pow(1 - t, 2);
          cardMesh.rotation.z = startRotZ + (targetRotZ - startRotZ) * easeT;
          cardMesh.position.y = startY + Math.sin(t * Math.PI) * 0.12;

          if (t < 1) requestAnimationFrame(step);
          else {
            cardMesh.rotation.z = targetRotZ;
            cardMesh.position.y = startY;
            onDone && onDone();
          }
        }
        requestAnimationFrame(step);
      }

      function getBlackjackSpot3D(seatIndex, cardIndex = 0, isSplitHand = false) {
        // Coordenadas alineadas para que las cartas encajen dentro del recuadro o a la izquierda si es la mano dividida (Split):
        // Seat 0 (Asiento izquierdo): X = -1.345, Z = 1.625, rotY = -0.691 rad (-39.6°)
        // Seat 1 (Asiento central):   X =  0.000, Z = 2.110, rotY =  0.000 rad (  0.0°)
        // Seat 2 (Asiento derecho):   X = +1.345, Z = 1.625, rotY = +0.691 rad (+39.6°)
        const spots = [
          { x: -1.345, z: 1.625, rotY: -0.691 },
          { x: 0.000, z: 2.110, rotY: 0.000 },
          { x: 1.345, z: 1.625, rotY: 0.691 }
        ];

        const spot = spots[Math.min(2, Math.max(0, seatIndex))] || spots[1];

        // Si es la mano dividida (Hand 2 / Split), se separa con mayor distancia al lado izquierdo (-0.52m lateral):
        const stepUp = 0.115 * cardIndex;
        const stepRight = 0.025 * cardIndex + (isSplitHand ? -0.52 : 0);

        const offsetX = -Math.sin(spot.rotY) * stepUp + Math.cos(spot.rotY) * stepRight;
        const offsetZ = -Math.cos(spot.rotY) * stepUp - Math.sin(spot.rotY) * stepRight;

        return {
          x: spot.x + offsetX,
          y: 0.010 + cardIndex * 0.003 + (isSplitHand ? 0.001 : 0),
          z: spot.z + offsetZ,
          rotY: spot.rotY
        };
      }

      function getBlackjackBetCircleSpot3D(seatIndex) {
        // Coordenadas calculadas para coincidir exactamente con el centro del círculo amarillo en el tapete 3D:
        // En el canvas (1024x512), cada asiento tiene su marco girado donde el círculo amarillo está a localX = +88, localY = 0:
        // Seat 0 (Asiento izquierdo, ang = 0.28): X = -1.001, Z = 1.925
        // Seat 1 (Asiento central,   ang = 0.50): X =  0.455, Z = 2.122
        // Seat 2 (Asiento derecho,   ang = 0.72): X =  1.703, Z = 1.345
        const spots = [
          { x: -1.001, z: 1.925 },
          { x:  0.455, z: 2.122 },
          { x:  1.703, z: 1.345 }
        ];
        return spots[Math.min(2, Math.max(0, seatIndex))] || spots[1];
      }

      // Render 3D Chip Stacks for ALL seated players on Blackjack felt surface inside their respective yellow betting circles
      function renderAllBlackjackChips() {
        if (!window.bj3DRefs || !window.bj3DRefs.chipsGroup) return;
        const grp = window.bj3DRefs.chipsGroup;
        while (grp.children && grp.children.length > 0) grp.remove(grp.children[0]);

        const seatBets = {};

        // 1. Apuestas de todos los jugadores activos en el servidor (multijugador simultáneo)
        if (bjServerState && bjServerState.players) {
          Object.values(bjServerState.players).forEach(p => {
            if (p && !p.leftTable && typeof p.seatIndex === 'number') {
              const totalAmt = (p.bets || 0) + (p.splitBet || 0);
              if (totalAmt > 0) seatBets[p.seatIndex] = totalAmt;
            }
          });
        }

        // 2. Apuesta del jugador local en su asiento (si no está en server state o offline)
        if (state.player.currentSeat && state.player.currentSeat.zone === 'blackjack' && typeof state.player.currentSeat.seatIndex === 'number') {
          const mySeat = state.player.currentSeat.seatIndex;
          const isMeInServer = (bjServerState && bjServerState.players && socket && bjServerState.players[socket.id]);
          if (!isMeInServer) {
            const myTotalBet = (bjState.bet || 50) + (bjState.isSplit ? (bjState.splitBet || 0) : 0);
            if (myTotalBet > 0) seatBets[mySeat] = myTotalBet;
          }
        }

        // 3. Dibujar las pilas de fichas 3D de cada asiento exactamente en su círculo amarillo (mismo diseño unificado)
        Object.entries(seatBets).forEach(([seatIdxStr, betAmount]) => {
          const seatIdx = parseInt(seatIdxStr, 10);
          const circleSpot = getBlackjackBetCircleSpot3D(seatIdx);
          const stackGroup = create3DChipStackMesh(betAmount, 0.075, 0.020);
          stackGroup.position.set(circleSpot.x, 0.012, circleSpot.z);
          grp.add(stackGroup);
        });
      }

      function update3DBJChips(betAmount) {
        bjState.bet = Math.max(0, betAmount);
        renderAllBlackjackChips();
      }

      // Allow piling up multiple chips of any denomination on the 3D felt (capped by state.balance)
      let bjBetFirstClick = true;
      document.querySelectorAll('#chipRackBJ .chip').forEach(c => {
        c.addEventListener('click', () => {
          if (bjState.active) return;
          const val = parseInt(c.dataset.v, 10);
          const nextBet = bjBetFirstClick ? val : (bjState.bet + val);

          if (nextBet > state.balance) {
            showToast('⚠️ No tienes suficiente saldo para esa apuesta');
            return;
          }

          playSound('chip');
          bjState.bet = nextBet;
          bjBetFirstClick = false;

          document.querySelectorAll('#chipRackBJ .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');

          document.getElementById('bjBetDisplay').textContent = '$' + bjState.bet;
          if (window.bj3DRefs) update3DBJChips(bjState.bet);

          if (typeof socket !== 'undefined' && socket && socket.connected) {
            const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;
            socket.emit('blackjackBetChange', { bet: nextBet, seatIndex: mySeat });
          }
        });
      });

      // Clear / Reset bet button handler
      const bjClearBtn = document.getElementById('bjClearBetBtn');
      if (bjClearBtn) {
        bjClearBtn.addEventListener('click', () => {
          if (bjState.active) return;
          playSound('chip');
          bjState.bet = 0;
          bjBetFirstClick = true;
          document.getElementById('bjBetDisplay').textContent = '$0';
          if (window.bj3DRefs) update3DBJChips(0);

          if (typeof socket !== 'undefined' && socket && socket.connected) {
            const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;
            socket.emit('blackjackBetChange', { bet: 0, seatIndex: mySeat });
          }
        });
      }

      function updateBlackjackPlayerScoreDisplay(score1, score2, isSplit, activeHandIndex = 0) {
        const playerScoreEl = document.getElementById('playerScore');
        if (!playerScoreEl) return;

        if (!isSplit) {
          playerScoreEl.innerHTML = `<span style="font-size:15px; font-weight:800; color:#fff;">Puntos: ${score1 !== undefined ? score1 : 0}</span>`;
        } else {
          const s1 = (score1 !== undefined) ? score1 : 0;
          const s2 = (score2 !== undefined) ? score2 : 0;

          const activeStyle = `background:linear-gradient(135deg, rgba(139,92,246,0.65), rgba(99,102,241,0.65)); border:1.5px solid #c084fc; padding:4px 10px; border-radius:8px; color:#fff; font-weight:900; box-shadow:0 0 14px rgba(192,132,252,0.8); display:inline-flex; align-items:center; gap:5px; transform:scale(1.04);`;
          const inactiveStyle = `background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); padding:3px 8px; border-radius:8px; color:#9ca3af; font-weight:600; opacity:0.6; display:inline-flex; align-items:center; gap:5px;`;

          const h1Html = (activeHandIndex === 0)
            ? `<span style="${activeStyle}"><span style="color:#fbbf24; font-size:12px;">▶</span> MANO 1: ${s1}</span>`
            : `<span style="${inactiveStyle}">MANO 1: ${s1}</span>`;

          const h2Html = (activeHandIndex === 1)
            ? `<span style="${activeStyle}"><span style="color:#fbbf24; font-size:12px;">▶</span> MANO 2: ${s2}</span>`
            : `<span style="${inactiveStyle}">MANO 2: ${s2}</span>`;

          playerScoreEl.innerHTML = `<div style="display:inline-flex; align-items:center; gap:8px; vertical-align:middle;">${h2Html} ${h1Html}</div>`;
        }
      }

      /* ============================================================
         3. MULTIPLAYER AUTHORITATIVE BLACKJACK ENGINE
      ============================================================ */
      let bjServerState = null;
      let bjDealt3DMeshes = {};
      let bjDealerHiddenMesh = null;

      if (typeof socket !== 'undefined' && socket) {
        socket.on('blackjackState', (s) => {
          if (!s || s.blackjackId !== 'blackjack') return;
          bjServerState = s;
          renderAllBlackjackChips();

          const isMyTurn = (s.phase === 'PLAYER_TURNS' && (s.currentPlayerId === socket.id || (!s.currentPlayerId && s.playerOrder && s.playerOrder.includes(socket.id))));
          const activePlayer = (s.players && s.currentPlayerId && s.players[s.currentPlayerId]) ? s.players[s.currentPlayerId].name : 'Dealer';

          const playerScoreEl = document.getElementById('playerScore');
          const dealerScoreEl = document.getElementById('dealerScore');
          const dealBtn = document.getElementById('bjDealBtn');
          const testSplitBtn = document.getElementById('bjTestSplitBtn');
          const hitBtn = document.getElementById('bjHitBtn');
          const standBtn = document.getElementById('bjStandBtn');
          const doubleBtn = document.getElementById('bjDoubleBtn');
          const splitBtn = document.getElementById('bjSplitBtn');

          const myData = s.players && s.players[socket.id];

          if (s.phase === 'WAITING') {
            if (dealBtn) { dealBtn.style.display = 'inline-block'; dealBtn.textContent = 'REPARTIR 🃏'; }
            if (testSplitBtn) testSplitBtn.style.display = 'inline-block';
            if (hitBtn) hitBtn.style.display = 'none';
            if (standBtn) standBtn.style.display = 'none';
            if (doubleBtn) doubleBtn.style.display = 'none';
            if (splitBtn) splitBtn.style.display = 'none';
          } else if (s.phase === 'PLAYER_TURNS') {
            if (dealBtn) dealBtn.style.display = 'none';
            if (testSplitBtn) testSplitBtn.style.display = 'none';
            if (isMyTurn) {
              if (hitBtn) hitBtn.style.display = 'inline-block';
              if (standBtn) standBtn.style.display = 'inline-block';

              // Botón Doblar: disponible si la mano activa no ha sido doblada aún
              const canDouble = myData && (
                (!myData.isSplit && !myData.isDoubled) ||
                (myData.isSplit && ((myData.activeHandIndex === 0 && !myData.hand1Doubled) || (myData.activeHandIndex === 1 && !myData.hand2Doubled)))
              );
              if (doubleBtn) doubleBtn.style.display = canDouble ? 'inline-block' : 'none';

              // Botón Dividir: disponible cuando hay 2 cartas iniciales del mismo valor
              const canSplit = myData && !myData.isSplit && myData.hand && myData.hand.length === 2 && (
                myData.hand[0].v === myData.hand[1].v ||
                getHandScore([myData.hand[0]]) === getHandScore([myData.hand[1]])
              );
              if (splitBtn) splitBtn.style.display = canSplit ? 'inline-block' : 'none';

              if (myData && myData.isSplit) {
                showToast(myData.activeHandIndex === 0 ? '🟢 Tu turno: Mano 1 (Derecha)' : '🟢 Tu turno: Mano 2 (Izquierda)');
              } else {
                showToast('🟢 ¡Es tu turno de actuar!');
              }
            } else {
              if (hitBtn) hitBtn.style.display = 'none';
              if (standBtn) standBtn.style.display = 'none';
              if (doubleBtn) doubleBtn.style.display = 'none';
              if (splitBtn) splitBtn.style.display = 'none';
              if (playerScoreEl) playerScoreEl.textContent = `Turno de: ${activePlayer}`;
            }
          } else if (s.phase === 'DEALER_TURN' || s.phase === 'RESULT') {
            if (dealBtn) dealBtn.style.display = 'none';
            if (hitBtn) hitBtn.style.display = 'none';
            if (standBtn) standBtn.style.display = 'none';
            if (doubleBtn) doubleBtn.style.display = 'none';
            if (splitBtn) splitBtn.style.display = 'none';
          }

          if (myData) {
            if (s.phase !== 'PLAYER_TURNS' || isMyTurn) {
              updateBlackjackPlayerScoreDisplay(myData.score, myData.splitScore, myData.isSplit, myData.activeHandIndex || 0);
            }
          }
          if (dealerScoreEl) {
            if (s.phase === 'DEALER_TURN' || s.phase === 'RESULT') {
              dealerScoreEl.textContent = 'Dealer: ' + (s.dealerScore !== undefined ? s.dealerScore : (s.dealer ? getHandScore(s.dealer) : '–'));
            } else {
              const dScore = (s.dealerScore !== undefined && s.dealerScore > 0) ? s.dealerScore : ((s.dealer && s.dealer.length > 0) ? getHandScore([s.dealer[0]]) : '–');
              dealerScoreEl.textContent = 'Dealer: ' + dScore;
            }
          }
        });

        socket.on('blackjackDealCard', (data) => {
          if (!data || data.blackjackId !== 'blackjack') return;

          if (data.sequence === 1 && window.bj3DRefs && window.bj3DRefs.cardsGroup) {
            const grp = window.bj3DRefs.cardsGroup;
            while (grp.children.length > 0) grp.remove(grp.children[0]);
            bjDealt3DMeshes = {};
            bjDealerHiddenMesh = null;
          }

          const card = data.card;
          const isDealer = (data.target === 'dealer');
          const isMe = (data.playerId === socket.id);
          const isHidden = !!data.hidden;

          const mesh = make3DCardMesh(card, !isHidden);
          bjDealt3DMeshes[data.sequence] = mesh;
          if (isDealer && isHidden) {
            bjDealerHiddenMesh = mesh;
          }

          let seatIdx = (typeof data.seatIndex === 'number' && data.seatIndex >= 0) ? data.seatIndex : 1;
          if (!isDealer && typeof data.seatIndex !== 'number') {
            if (isMe && state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') {
              seatIdx = state.player.currentSeat.seatIndex;
            } else if (bjServerState && bjServerState.players && bjServerState.players[data.playerId]) {
              seatIdx = bjServerState.players[data.playerId].seatIndex || 0;
            } else if (typeof remotePlayers !== 'undefined' && remotePlayers[data.playerId] && remotePlayers[data.playerId].seat) {
              seatIdx = remotePlayers[data.playerId].seat.seatIndex || 0;
            }
          }

          let targetX = 0, targetZ = 0, targetY = 0.010, targetRotY = 0;
          if (isDealer) {
            const dCount = (typeof data.cardIndex === 'number') ? data.cardIndex : ((bjServerState && bjServerState.dealer) ? (bjServerState.dealer.length - 1) : 0);
            targetX = -0.14 + dCount * 0.18;
            targetZ = 0.70;
            targetY = 0.010 + dCount * 0.003;
            targetRotY = 0;
          } else {
            const cardIdx = (typeof data.cardIndex === 'number') ? data.cardIndex : 0;
            const isSplitHand = !!data.isSplitHand;
            const spot = getBlackjackSpot3D(seatIdx, cardIdx, isSplitHand);
            targetX = spot.x;
            targetY = spot.y;
            targetZ = spot.z;
            targetRotY = spot.rotY;
          }

          animateCardDeal3D(mesh, new THREE.Vector3(targetX, targetY, targetZ), !isHidden, 0, () => {
            if (isMe) {
              if (bjServerState && bjServerState.players && bjServerState.players[socket.id]) {
                const myData = bjServerState.players[socket.id];
                updateBlackjackPlayerScoreDisplay(myData.score, myData.splitScore, myData.isSplit, myData.activeHandIndex || 0);
              } else {
                updateBlackjackPlayerScoreDisplay(data.score, 0, false, 0);
              }
            }
            if (isDealer) {
              const dealerScoreEl = document.getElementById('dealerScore');
              if (dealerScoreEl) {
                if (isHidden) {
                  const firstScore = (bjServerState && bjServerState.dealer && bjServerState.dealer.length > 0) ? getHandScore([bjServerState.dealer[0]]) : data.score;
                  dealerScoreEl.textContent = 'Dealer: ' + firstScore;
                } else {
                  dealerScoreEl.textContent = 'Dealer: ' + data.score;
                }
              }
            }
          }, targetRotY);
        });

        socket.on('blackjackSplit', (data) => {
          if (!data || data.blackjackId !== 'blackjack') return;
          playSound('chip');

          if (data.playerId === socket.id) {
            state.balance = roundMoney(state.balance - data.splitBet);
            updateBalanceUI();
            showToast('✌️ ¡Mano dividida! Tu turno: Mano 1 (Derecha). Elige Pedir carta o Plantarte.');
          }

          // Animar visualmente la separación de las cartas de Mano 1 y Mano 2
          if (window.bj3DRefs && window.bj3DRefs.cardsGroup) {
            const grp = window.bj3DRefs.cardsGroup;
            while (grp.children.length > 0) grp.remove(grp.children[0]);
            bjDealt3DMeshes = {};
          }

          const seatIdx = (typeof data.seatIndex === 'number') ? data.seatIndex : 1;

          // Mano 1: Cartas existentes
          if (data.hand1) {
            data.hand1.forEach((card, idx) => {
              const m1 = make3DCardMesh(card, true);
              const spot1 = getBlackjackSpot3D(seatIdx, idx, false);
              m1.position.set(spot1.x, spot1.y, spot1.z);
              m1.rotation.y = spot1.rotY;
              window.bj3DRefs.cardsGroup.add(m1);
            });
          }

          // Mano 2: Cartas existentes en el lado izquierdo
          if (data.hand2) {
            data.hand2.forEach((card, idx) => {
              const m2 = make3DCardMesh(card, true);
              const spot2 = getBlackjackSpot3D(seatIdx, idx, true);
              m2.position.set(spot2.x, spot2.y, spot2.z);
              m2.rotation.y = spot2.rotY;
              window.bj3DRefs.cardsGroup.add(m2);
            });
          }

          // Restaurar cartas del crupier
          if (bjServerState && bjServerState.dealer) {
            bjServerState.dealer.forEach((dCard, dIdx) => {
              const isHid = (dIdx === 1 && bjServerState.phase !== 'DEALER_TURN' && bjServerState.phase !== 'RESULT');
              const dMesh = make3DCardMesh(dCard, !isHid);
              dMesh.position.set(-0.14 + dIdx * 0.18, 0.010 + dIdx * 0.003, 0.70);
              window.bj3DRefs.cardsGroup.add(dMesh);
              if (isHid) bjDealerHiddenMesh = dMesh;
            });
          }

          renderAllBlackjackChips();
        });

        socket.on('blackjackHandTurn', (data) => {
          if (!data || data.blackjackId !== 'blackjack') return;
          if (data.playerId === socket.id) {
            if (bjServerState && bjServerState.players && bjServerState.players[socket.id]) {
              const myData = bjServerState.players[socket.id];
              myData.activeHandIndex = data.activeHandIndex;
              updateBlackjackPlayerScoreDisplay(myData.score, myData.splitScore, true, data.activeHandIndex);
            }
            showToast('✌️ Turno de la Mano 2 (Izquierda)');
          }
        });

        socket.on('blackjackRevealDealer', (data) => {
          if (!data || data.blackjackId !== 'blackjack') return;
          const targetMesh = bjDealerHiddenMesh || bjDealt3DMeshes[2];
          if (targetMesh) {
            flipCard3D(targetMesh, () => {
              const dealerScoreEl = document.getElementById('dealerScore');
              if (dealerScoreEl) dealerScoreEl.textContent = 'Dealer: ' + data.dealerScore;
            });
          }
        });

        socket.on('blackjackPlayerBust', (data) => {
          if (!data || data.blackjackId !== 'blackjack') return;
          if (data.playerId === socket.id) {
            showToast('💥 ¡Te has pasado de 21! (BUST)');
          }
        });

        let _lastProcessedBjRoundId = null;

        function handleBlackjackResultPayload(data) {
          if (!data || data.blackjackId !== 'blackjack') return;
          const myResult = data.results && data.results[socket.id];
          if (!myResult) return;

          const roundKey = (data.roundId !== undefined ? data.roundId : '') + '_' + JSON.stringify(myResult);
          if (_lastProcessedBjRoundId === roundKey) return;
          _lastProcessedBjRoundId = roundKey;

          const banner = document.getElementById('bjResultBanner');
          const title = document.getElementById('bjResultTitle');
          const msg = document.getElementById('bjResultMsg');

          bjState.active = false;
          bjBetFirstClick = true;

          const dealBtn = document.getElementById('bjDealBtn');
          const testSplitBtn = document.getElementById('bjTestSplitBtn');
          const hitBtn = document.getElementById('bjHitBtn');
          const standBtn = document.getElementById('bjStandBtn');
          const doubleBtn = document.getElementById('bjDoubleBtn');
          const splitBtn = document.getElementById('bjSplitBtn');

          if (dealBtn) { dealBtn.style.display = 'inline-block'; dealBtn.textContent = 'REPARTIR 🃏'; }
          if (testSplitBtn) testSplitBtn.style.display = 'inline-block';
          if (hitBtn) hitBtn.style.display = 'none';
          if (standBtn) standBtn.style.display = 'none';
          if (doubleBtn) doubleBtn.style.display = 'none';
          if (splitBtn) splitBtn.style.display = 'none';

          if (!myResult.isSplit) {
            const outcome = myResult.result;
            const betAmt = roundMoney(myResult.bet || bjState.bet || 50);
            const payout = roundMoney(myResult.payout || 0);

            if (payout > 0) {
              state.balance = roundMoney(state.balance + payout);
              updateBalanceUI();
            }

            const netGain = roundMoney(payout - betAmt);

            if (outcome === 'BLACKJACK') {
              if (title) title.textContent = '¡BLACKJACK NATURAL! (3:2)';
              if (msg) { msg.className = 'win'; msg.textContent = '+' + formatMoney(netGain > 0 ? netGain : payout); }
              playSound('win');
              triggerConfetti();
              addXP(180);
              showToast(`🃏 ¡Blackjack Natural! Ganaste ${formatMoney(payout)}`);
            } else if (outcome === 'WIN') {
              if (title) title.textContent = '¡GANASTE!';
              if (msg) { msg.className = 'win'; msg.textContent = '+' + formatMoney(netGain > 0 ? netGain : payout); }
              playSound('win');
              triggerConfetti();
              addXP(120);
              showToast(`🃏 ¡Mano ganada! +${formatMoney(netGain > 0 ? netGain : payout)}`);
            } else if (outcome === 'PUSH') {
              if (title) title.textContent = 'EMPATE';
              if (msg) { msg.className = 'win'; msg.textContent = 'Reembolsado (' + formatMoney(betAmt) + ')'; }
              playSound('chip');
              showToast(`🃏 Empate, apuesta de ${formatMoney(betAmt)} reembolsada`);
            } else {
              // LOSE o BUST
              if (title) title.textContent = (outcome === 'BUST' || (myResult.msg && myResult.msg.includes('pasaste'))) ? '¡TE PASASTE! (BUST)' : 'PERDISTE';
              if (msg) { msg.className = 'lose'; msg.textContent = '-' + formatMoney(betAmt); }
              playSound('lose');
              showToast(`🃏 Mano finalizada (-${formatMoney(betAmt)})`);
            }
          } else {
            // Split Hand Results
            const totalPayout = roundMoney(myResult.payout || 0);
            const b1 = roundMoney(myResult.bet || 50);
            const b2 = roundMoney(myResult.bet2 || myResult.splitBet || b1);
            const totalBet = roundMoney(b1 + b2);

            if (totalPayout > 0) {
              state.balance = roundMoney(state.balance + totalPayout);
              updateBalanceUI();
            }

            const netGain = roundMoney(totalPayout - totalBet);

            if (netGain > 0) {
              if (title) title.textContent = '¡SPLIT GANADOR!';
              if (msg) { msg.className = 'win'; msg.textContent = '+' + formatMoney(netGain) + ` (${myResult.msg || ''})`; }
              playSound('win');
              triggerConfetti();
              addXP(150);
              showToast(`🃏 ¡Split ganador! +${formatMoney(netGain)}`);
            } else if (netGain < 0) {
              if (title) title.textContent = 'RONDA FINALIZADA';
              if (msg) { msg.className = 'lose'; msg.textContent = '-' + formatMoney(Math.abs(netGain)) + ` (${myResult.msg || ''})`; }
              playSound('lose');
              showToast(`🃏 Split finalizado (-${formatMoney(Math.abs(netGain))})`);
            } else {
              if (title) title.textContent = 'EMPATE';
              if (msg) { msg.className = 'win'; msg.textContent = 'Reembolsado ($0)'; }
              playSound('chip');
              showToast('🃏 Split empatado (apuestas reembolsadas)');
            }
          }

          if (banner && state.mode === 'blackjack') {
            banner.classList.add('show');
            setTimeout(() => {
              if (banner) banner.classList.remove('show');
            }, 3500);
          }
        }

        socket.on('blackjackRoundResult', handleBlackjackResultPayload);
        socket.on('blackjackResult', handleBlackjackResultPayload);
      }

      // Singleplayer Local Offline Fallback Engine for Blackjack when Socket is disconnected
      function localBlackjackDeal(forcePair = false) {
        if (!bjState.bet || bjState.bet <= 0) {
          showToast('⚠️ Debes colocar una apuesta para jugar (selecciona una ficha)');
          return;
        }
        if (window.bj3DRefs && window.bj3DRefs.cardsGroup) {
          const grp = window.bj3DRefs.cardsGroup;
          while (grp.children.length > 0) grp.remove(grp.children[0]);
        }
        bjState.isSplit = false;
        bjState.splitHand = [];
        bjState.splitBet = 0;
        bjState.activeHandIndex = 0;
        bjState.hand1Meshes = [];
        bjState.hand2Meshes = [];
        renderAllBlackjackChips();

        bjState.deck = createDeck();
        if (forcePair) {
          bjState.player = [{ s: '♠', v: '8', red: false }, { s: '♥', v: '8', red: true }];
        } else {
          bjState.player = [bjState.deck.pop(), bjState.deck.pop()];
        }
        bjState.dealer = [bjState.deck.pop(), bjState.deck.pop()];
        bjState.player3DMeshes = [];
        bjState.dealer3DMeshes = [];
        bjState.active = true;

        const seatIdx = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;

        const spot1 = getBlackjackSpot3D(seatIdx, 0, false);
        const p1Mesh = make3DCardMesh(bjState.player[0], true);
        bjState.player3DMeshes.push(p1Mesh);
        animateCardDeal3D(p1Mesh, new THREE.Vector3(spot1.x, spot1.y, spot1.z), true, 0, null, spot1.rotY);

        const d1Mesh = make3DCardMesh(bjState.dealer[0], true);
        bjState.dealer3DMeshes.push(d1Mesh);
        animateCardDeal3D(d1Mesh, new THREE.Vector3(-0.14, 0.010, 0.70), true, 220, null, 0);

        const spot2 = getBlackjackSpot3D(seatIdx, 1, false);
        const p2Mesh = make3DCardMesh(bjState.player[1], true);
        bjState.player3DMeshes.push(p2Mesh);
        animateCardDeal3D(p2Mesh, new THREE.Vector3(spot2.x, spot2.y, spot2.z), true, 440, null, spot2.rotY);

        const d2Mesh = make3DCardMesh(bjState.dealer[1], false);
        bjState.dealer3DMeshes.push(d2Mesh);
        animateCardDeal3D(d2Mesh, new THREE.Vector3(0.04, 0.013, 0.70), false, 660, () => {
          updateBlackjackPlayerScoreDisplay(getHandScore(bjState.player), 0, false, 0);
          document.getElementById('dealerScore').textContent = 'Dealer: ' + getHandScore([bjState.dealer[0]]);

          document.getElementById('bjDealBtn').style.display = 'none';
          const testBtn = document.getElementById('bjTestSplitBtn');
          if (testBtn) testBtn.style.display = 'none';
          document.getElementById('bjHitBtn').style.display = 'inline-block';
          document.getElementById('bjStandBtn').style.display = 'inline-block';
          document.getElementById('bjDoubleBtn').style.display = 'inline-block';

          // Mostrar botón dividir si las dos cartas son iguales
          const canSplit = (bjState.player[0].v === bjState.player[1].v || getHandScore([bjState.player[0]]) === getHandScore([bjState.player[1]]));
          const splitBtn = document.getElementById('bjSplitBtn');
          if (splitBtn) splitBtn.style.display = canSplit ? 'inline-block' : 'none';

          document.getElementById('bjResultBanner').classList.remove('show');
        }, 0);
      }

      function localBlackjackSplit() {
        if (!bjState.active || bjState.isSplit) return;
        if (state.balance < bjState.bet) { showToast('Saldo insuficiente para dividir'); return; }
        state.balance = roundMoney(state.balance - bjState.bet);
        bjState.splitBet = bjState.bet;
        bjState.isSplit = true;
        bjState.activeHandIndex = 0;
        updateBalanceUI();

        const card2 = bjState.player.pop();
        bjState.splitHand = [card2];
        bjState.hand1Meshes = [bjState.player3DMeshes[0]];
        bjState.hand2Meshes = [bjState.player3DMeshes[1]];

        const seatIdx = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;

        // Mover la 2ª carta a la posición inicial de la Mano 2 (lado izquierdo)
        const splitSpot0 = getBlackjackSpot3D(seatIdx, 0, true);
        bjState.player3DMeshes[1].position.set(splitSpot0.x, splitSpot0.y, splitSpot0.z);
        bjState.player3DMeshes[1].rotation.y = splitSpot0.rotY;

        bjState.score1 = getHandScore(bjState.player);
        bjState.score2 = getHandScore(bjState.splitHand);
        updateBlackjackPlayerScoreDisplay(bjState.score1, bjState.score2, true, 0);
        document.getElementById('bjSplitBtn').style.display = 'none';
        showToast('✌️ ¡Mano dividida! Tu turno: Mano 1 (Derecha). Elige Pedir carta o Plantarte.');
        renderAllBlackjackChips();
      }

      function localBlackjackHit() {
        if (!bjState.active) return;
        const seatIdx = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;

        if (!bjState.isSplit) {
          const newCard = bjState.deck.pop();
          bjState.player.push(newCard);
          const idx = bjState.player.length - 1;
          const spot = getBlackjackSpot3D(seatIdx, idx, false);

          const mesh = make3DCardMesh(newCard, true);
          bjState.player3DMeshes.push(mesh);
          animateCardDeal3D(mesh, new THREE.Vector3(spot.x, spot.y, spot.z), true, 0, () => {
            const score = getHandScore(bjState.player);
            updateBlackjackPlayerScoreDisplay(score, 0, false, 0);
            if (score > 21) localBlackjackEnd('BUST! PERDISTE', false);
          }, spot.rotY);
        } else {
          if (bjState.activeHandIndex === 0) {
            const newCard = bjState.deck.pop();
            bjState.player.push(newCard);
            const idx = bjState.player.length - 1;
            const spot = getBlackjackSpot3D(seatIdx, idx, false);

            const mesh = make3DCardMesh(newCard, true);
            bjState.hand1Meshes.push(mesh);
            animateCardDeal3D(mesh, new THREE.Vector3(spot.x, spot.y, spot.z), true, 0, () => {
              bjState.score1 = getHandScore(bjState.player);
              updateBlackjackPlayerScoreDisplay(bjState.score1, bjState.score2 || getHandScore(bjState.splitHand), true, 0);
              if (bjState.score1 > 21) {
                showToast('💥 Mano 1 se pasó de 21 (BUST). Turno de la Mano 2...');
                bjState.activeHandIndex = 1;
                updateBlackjackPlayerScoreDisplay(bjState.score1, bjState.score2 || getHandScore(bjState.splitHand), true, 1);
                const doubleBtn = document.getElementById('bjDoubleBtn');
                if (doubleBtn) doubleBtn.style.display = (!bjState.hand2Doubled) ? 'inline-block' : 'none';
              }
            }, spot.rotY);
          } else {
            const newCard = bjState.deck.pop();
            bjState.splitHand.push(newCard);
            const idx = bjState.splitHand.length - 1;
            const spot = getBlackjackSpot3D(seatIdx, idx, true);

            const mesh = make3DCardMesh(newCard, true);
            bjState.hand2Meshes.push(mesh);
            animateCardDeal3D(mesh, new THREE.Vector3(spot.x, spot.y, spot.z), true, 0, () => {
              bjState.score2 = getHandScore(bjState.splitHand);
              updateBlackjackPlayerScoreDisplay(bjState.score1 || getHandScore(bjState.player), bjState.score2, true, 1);
              if (bjState.score2 > 21) {
                showToast('💥 Mano 2 se pasó de 21 (BUST)');
                localBlackjackStand();
              }
            }, spot.rotY);
          }
        }
      }

      function localBlackjackStand() {
        if (!bjState.active) return;
        if (bjState.isSplit && bjState.activeHandIndex === 0) {
          bjState.activeHandIndex = 1;
          showToast('👉 Turno de la Mano 2 (Izquierda)');
          document.getElementById('playerScore').textContent = `Mano 1: ${bjState.score1 || getHandScore(bjState.player)} | 👉 Mano 2: ${bjState.score2 || getHandScore(bjState.splitHand)}`;
          const doubleBtn = document.getElementById('bjDoubleBtn');
          if (doubleBtn) doubleBtn.style.display = (!bjState.hand2Doubled) ? 'inline-block' : 'none';
          return;
        }

        bjState.active = false;
        document.getElementById('bjHitBtn').style.display = 'none';
        document.getElementById('bjStandBtn').style.display = 'none';
        document.getElementById('bjDoubleBtn').style.display = 'none';
        document.getElementById('bjSplitBtn').style.display = 'none';

        // Si el jugador ya se pasó (BUST), no hace falta que el crupier juegue para ganar
        const pScore = getHandScore(bjState.player);
        if (!bjState.isSplit) {
          if (pScore > 21) {
            localBlackjackEnd('BUST! PERDISTE', false);
            return;
          }
        } else {
          const s1 = bjState.score1 || getHandScore(bjState.player);
          const s2 = bjState.score2 || getHandScore(bjState.splitHand);
          if (s1 > 21 && s2 > 21) {
            localBlackjackSplitEnd(-1, -1, getHandScore(bjState.dealer));
            return;
          }
        }

        if (bjState.dealer3DMeshes[1]) {
          flipCard3D(bjState.dealer3DMeshes[1], () => {
            let dScore = getHandScore(bjState.dealer);
            document.getElementById('dealerScore').textContent = 'Dealer: ' + dScore;

            function dealerDrawNext() {
              if (dScore < 17) {
                const newCard = bjState.deck.pop();
                bjState.dealer.push(newCard);
                dScore = getHandScore(bjState.dealer);
                const idx = bjState.dealer.length - 1;

                const mesh = make3DCardMesh(newCard, true);
                bjState.dealer3DMeshes.push(mesh);
                animateCardDeal3D(mesh, new THREE.Vector3(-0.14 + idx * 0.18, 0.010 + idx * 0.003, 0.70), true, 0, () => {
                  document.getElementById('dealerScore').textContent = 'Dealer: ' + dScore;
                  setTimeout(dealerDrawNext, 350);
                });
              } else {
                if (!bjState.isSplit) {
                  const curPScore = getHandScore(bjState.player);
                  if (curPScore > 21) localBlackjackEnd('BUST! PERDISTE', false);
                  else if (dScore > 21 || curPScore > dScore) localBlackjackEnd('¡GANASTE!', true);
                  else if (curPScore === dScore) localBlackjackEnd('EMPATE', null);
                  else localBlackjackEnd('PERDISTE', false);
                } else {
                  const s1 = bjState.score1 || getHandScore(bjState.player);
                  const s2 = bjState.score2 || getHandScore(bjState.splitHand);
                  const w1 = (s1 > 21) ? -1 : ((dScore > 21 || s1 > dScore) ? 1 : (s1 === dScore ? 0 : -1));
                  const w2 = (s2 > 21) ? -1 : ((dScore > 21 || s2 > dScore) ? 1 : (s2 === dScore ? 0 : -1));
                  localBlackjackSplitEnd(w1, w2, dScore);
                }
              }
            }
            dealerDrawNext();
          });
        }
      }

      function localBlackjackDouble() {
        if (!bjState.active) return;
        const seatIdx = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;

        if (!bjState.isSplit) {
          if (state.balance < bjState.bet) { showToast('Saldo insuficiente para doblar'); return; }
          state.balance = roundMoney(state.balance - bjState.bet);
          bjState.bet = roundMoney(bjState.bet * 2);
          bjState.isDoubled = true;
          updateBalanceUI();
          document.getElementById('bjBetDisplay').textContent = formatMoney(bjState.bet);
          renderAllBlackjackChips();
          document.getElementById('bjDoubleBtn').style.display = 'none';
          showToast('💰 ¡Apuesta doblada! Puedes pedir carta o plantarte.');
        } else {
          if (bjState.activeHandIndex === 0) {
            if (state.balance < bjState.bet) { showToast('Saldo insuficiente para doblar'); return; }
            state.balance = roundMoney(state.balance - bjState.bet);
            bjState.bet = roundMoney(bjState.bet * 2);
            bjState.hand1Doubled = true;
            updateBalanceUI();
            renderAllBlackjackChips();
            document.getElementById('bjDoubleBtn').style.display = 'none';
            showToast('💰 ¡Mano 1 doblada! Puedes pedir carta o plantarte.');
          } else {
            const curSplitBet = bjState.splitBet || bjState.bet;
            if (state.balance < curSplitBet) { showToast('Saldo insuficiente para doblar'); return; }
            state.balance = roundMoney(state.balance - curSplitBet);
            bjState.splitBet = roundMoney(curSplitBet * 2);
            bjState.hand2Doubled = true;
            updateBalanceUI();
            renderAllBlackjackChips();
            document.getElementById('bjDoubleBtn').style.display = 'none';
            showToast('💰 ¡Mano 2 doblada! Puedes pedir carta o plantarte.');
          }
        }
      }

      function localBlackjackSplitEnd(w1, w2, dScore) {
        bjState.active = false;
        bjBetFirstClick = true;
        document.getElementById('bjHitBtn').style.display = 'none';
        document.getElementById('bjStandBtn').style.display = 'none';
        document.getElementById('bjDoubleBtn').style.display = 'none';
        document.getElementById('bjSplitBtn').style.display = 'none';
        document.getElementById('bjDealBtn').style.display = 'inline-block';
        const testBtn1 = document.getElementById('bjTestSplitBtn');
        if (testBtn1) testBtn1.style.display = 'inline-block';

        let net = 0;
        const b1 = bjState.bet;
        const b2 = bjState.splitBet;

        if (w1 === 1) { state.balance = roundMoney(state.balance + b1 * 2); net = roundMoney(net + b1); }
        else if (w1 === 0) { state.balance = roundMoney(state.balance + b1); }
        else { net = roundMoney(net - b1); }

        if (w2 === 1) { state.balance = roundMoney(state.balance + b2 * 2); net = roundMoney(net + b2); }
        else if (w2 === 0) { state.balance = roundMoney(state.balance + b2); }
        else { net = roundMoney(net - b2); }

        updateBalanceUI();

        const banner = document.getElementById('bjResultBanner');
        const title = document.getElementById('bjResultTitle');
        const msg = document.getElementById('bjResultMsg');

        const r1Str = w1 === 1 ? 'Gana' : (w1 === 0 ? 'Empate' : 'Pierde');
        const r2Str = w2 === 1 ? 'Gana' : (w2 === 0 ? 'Empate' : 'Pierde');

        if (title) title.textContent = net > 0 ? '¡RONDA GANADA!' : (net === 0 ? 'EMPATE' : 'RONDA TERMINADA');
        if (msg) {
          msg.className = net >= 0 ? 'win' : 'lose';
          msg.textContent = `Mano 2: ${r2Str} | Mano 1: ${r1Str} (${net >= 0 ? '+' : ''}${formatMoney(net)})`;
        }

        if (net > 0) { triggerConfetti(); addXP(150); }
        else if (net < 0) { playSound('lose'); }

        banner.classList.add('show');
        setTimeout(() => banner.classList.remove('show'), 3500);
      }

      function localBlackjackEnd(titleMsg, won) {
        bjState.active = false;
        bjBetFirstClick = true;
        document.getElementById('bjHitBtn').style.display = 'none';
        document.getElementById('bjStandBtn').style.display = 'none';
        document.getElementById('bjDoubleBtn').style.display = 'none';
        document.getElementById('bjSplitBtn').style.display = 'none';
        document.getElementById('bjDealBtn').style.display = 'inline-block';
        const testBtn2 = document.getElementById('bjTestSplitBtn');
        if (testBtn2) testBtn2.style.display = 'inline-block';

        const banner = document.getElementById('bjResultBanner');
        document.getElementById('bjResultTitle').textContent = titleMsg;
        const msg = document.getElementById('bjResultMsg');

        if (won === true) {
          state.balance = roundMoney(state.balance + bjState.bet * 2); updateBalanceUI();
          msg.className = 'win'; msg.textContent = '+' + formatMoney(bjState.bet);
          triggerConfetti(); addXP(120);
        } else if (won === false) {
          msg.className = 'lose'; msg.textContent = '-' + formatMoney(bjState.bet);
          playSound('lose');
        } else {
          state.balance = roundMoney(state.balance + bjState.bet); updateBalanceUI();
          msg.className = 'win'; msg.textContent = 'Reembolsado';
        }
        banner.classList.add('show');
        setTimeout(() => {
          banner.classList.remove('show');
        }, 3500);
      }

      const bjDealBtnEl = document.getElementById('bjDealBtn');
      if (bjDealBtnEl) {
        bjDealBtnEl.addEventListener('click', () => {
          if (!bjState.bet || bjState.bet <= 0) {
            showToast('⚠️ Debes colocar una apuesta para jugar (selecciona una ficha)');
            return;
          }
          if (state.balance < bjState.bet) { showToast('Saldo insuficiente para esa apuesta'); return; }
          playSound('chip');
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            state.balance -= bjState.bet; updateBalanceUI();
            socket.emit('blackjackStartRoundReq', { blackjackId: 'blackjack', bet: bjState.bet });
          } else {
            state.balance -= bjState.bet; updateBalanceUI();
            localBlackjackDeal(false);
          }
        });
      }

      const bjTestSplitBtnEl = document.getElementById('bjTestSplitBtn');
      if (bjTestSplitBtnEl) {
        bjTestSplitBtnEl.addEventListener('click', () => {
          if (!bjState.bet || bjState.bet <= 0) {
            showToast('⚠️ Debes colocar una apuesta para jugar (selecciona una ficha)');
            return;
          }
          if (state.balance < bjState.bet) { showToast('Saldo insuficiente para esa apuesta'); return; }
          playSound('chip');
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            state.balance -= bjState.bet; updateBalanceUI();
            socket.emit('blackjackStartRoundReq', { blackjackId: 'blackjack', bet: bjState.bet, forcePairTest: true });
          } else {
            state.balance -= bjState.bet; updateBalanceUI();
            localBlackjackDeal(true);
          }
        });
      }

      const bjHitBtnEl = document.getElementById('bjHitBtn');
      if (bjHitBtnEl) {
        bjHitBtnEl.addEventListener('click', () => {
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('blackjackHit', { blackjackId: 'blackjack' });
          } else {
            localBlackjackHit();
          }
        });
      }

      const bjStandBtnEl = document.getElementById('bjStandBtn');
      if (bjStandBtnEl) {
        bjStandBtnEl.addEventListener('click', () => {
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('blackjackStand', { blackjackId: 'blackjack' });
          } else {
            localBlackjackStand();
          }
        });
      }

      const bjDoubleBtnEl = document.getElementById('bjDoubleBtn');
      if (bjDoubleBtnEl) {
        bjDoubleBtnEl.addEventListener('click', () => {
          const currentHandBet = (!bjState.isSplit || bjState.activeHandIndex === 0) ? bjState.bet : (bjState.splitBet || bjState.bet);
          if (state.balance < currentHandBet) { showToast('Saldo insuficiente para doblar'); return; }
          playSound('chip');
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            state.balance -= currentHandBet; updateBalanceUI();
            socket.emit('blackjackDouble', { blackjackId: 'blackjack' });
            bjDoubleBtnEl.style.display = 'none';
          } else {
            localBlackjackDouble();
          }
        });
      }

      const bjSplitBtnEl = document.getElementById('bjSplitBtn');
      if (bjSplitBtnEl) {
        bjSplitBtnEl.addEventListener('click', () => {
          if (state.balance < bjState.bet) { showToast('Saldo insuficiente para dividir'); return; }
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('blackjackSplit', { blackjackId: 'blackjack' });
          } else {
            localBlackjackSplit();
          }
        });
      }

      function bjEndRound(titleMsg, won) {
        bjState.active = false;
        bjBetFirstClick = true;
        document.getElementById('bjHitBtn').style.display = 'none';
        document.getElementById('bjStandBtn').style.display = 'none';
        document.getElementById('bjDoubleBtn').style.display = 'none';
        document.getElementById('bjDealBtn').style.display = 'inline-block';

        const banner = document.getElementById('bjResultBanner');
        document.getElementById('bjResultTitle').textContent = titleMsg;
        const msg = document.getElementById('bjResultMsg');

        if (won === true) {
          state.balance += bjState.bet * 2; updateBalanceUI();
          msg.className = 'win'; msg.textContent = '+$' + bjState.bet;
          triggerConfetti(); addXP(120);
        } else if (won === false) {
          msg.className = 'lose'; msg.textContent = '-$' + bjState.bet;
          playSound('lose');
        } else {
          state.balance += bjState.bet; updateBalanceUI();
          msg.className = 'win'; msg.textContent = 'Reembolsado';
        }
        banner.classList.add('show');
      }

// --- Explicit Global Window Bindings ---
if (typeof bjState !== 'undefined') window.bjState = bjState;
if (typeof blackjack3DRefs !== 'undefined') window.blackjack3DRefs = blackjack3DRefs;
