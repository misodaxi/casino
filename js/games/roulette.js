/* ============================================================
         1. ROULETTE 3D LOGIC & ANIMATED BALL MECHANICS
      ============================================================ */
      // rState initialized globally at top level

      const betGridEl = document.getElementById('betGrid');
      function makeCell(key, label, extraClass, rowCss, colCss) {
        if (!betGridEl) return;
        const d = document.createElement('div');
        d.className = 'cell ' + extraClass; d.dataset.key = key;
        d.style.gridRow = rowCss; d.style.gridColumn = colCss;
        d.innerHTML = '<span>' + label + '</span>';
        d.addEventListener('click', () => placeBetR(key));
        betGridEl.appendChild(d);
      }

      makeCell('num-0', '0', 'c-green zero', '1 / 4', '1');
      NUM_ROWS.forEach((row, rIdx) => {
        row.forEach((n, cIdx) => {
          makeCell('num-' + n, n, numColor(n) === 'red' ? 'c-red' : 'c-black', (rIdx + 1), (cIdx + 2));
        });
      });
      makeCell('col3', '2:1', 'c-outside col2to1', '1', '14');
      makeCell('col2', '2:1', 'c-outside col2to1', '2', '14');
      makeCell('col1', '2:1', 'c-outside col2to1', '3', '14');
      makeCell('dozen1', '1ST 12', 'c-outside dozen', '4', '2 / 6');
      makeCell('dozen2', '2ND 12', 'c-outside dozen', '4', '6 / 10');
      makeCell('dozen3', '3RD 12', 'c-outside dozen', '4', '10 / 14');
      makeCell('low', '1 A 18', 'c-outside outside', '5', '2 / 4');
      makeCell('even', 'PAR', 'c-outside outside', '5', '4 / 6');
      makeCell('red', 'ROJO', 'c-outside outside c-red', '5', '6 / 8');
      makeCell('black', 'NEGRO', 'c-outside outside c-black', '5', '8 / 10');
      makeCell('odd', 'IMPAR', 'c-outside outside', '5', '10 / 12');
      makeCell('high', '19 A 36', 'c-outside outside', '5', '12 / 14');

      document.querySelectorAll('#chipRackR .chip').forEach(c => {
        c.addEventListener('click', () => {
          playSound('chip');
          document.querySelectorAll('#chipRackR .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          rState.selectedChip = roundMoney(c.dataset.v);
        });
      });

      function placeBetR(key) {
        if (rState.spinning) return;
        if (rouletteServerState && rouletteServerState.status && rouletteServerState.status !== 'WAITING') {
          showToast('⚠️ Las apuestas están cerradas durante la ronda');
          return;
        }
        const chipVal = roundMoney(rState.selectedChip);
        if (state.balance < chipVal) { showToast('Saldo insuficiente'); return; }
        playSound('chip');
        state.balance = roundMoney(state.balance - chipVal);
        rState.totalBet = roundMoney(rState.totalBet + chipVal);
        rState.bets[key] = roundMoney((rState.bets[key] || 0) + chipVal);
        updateBalanceUI();
        document.getElementById('totalBetDisplay').textContent = formatMoney(rState.totalBet);
        renderStakesR();
        if (roulette3DRefs && roulette3DRefs.update3DPlacedChips) roulette3DRefs.update3DPlacedChips();

        if (typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('rouletteBet', { rouletteId: 'roulette', betKey: key, amount: chipVal });
        }
      }

      function renderStakesR() {
        document.querySelectorAll('#betGrid .cell').forEach(c => {
          const key = c.dataset.key;
          const existing = c.querySelector('.stake'); if (existing) existing.remove();
          if (rState.bets[key]) {
            const s = document.createElement('span'); s.className = 'stake';
            s.textContent = formatMoney(rState.bets[key]).replace('$', '');
            c.appendChild(s);
          }
        });
      }

      document.getElementById('clearBtn').addEventListener('click', () => {
        if (rState.spinning) return;
        state.balance = roundMoney(state.balance + rState.totalBet);
        rState.bets = {};
        rState.totalBet = 0;
        updateBalanceUI();
        document.getElementById('totalBetDisplay').textContent = '$0';
        renderStakesR();
        if (roulette3DRefs && roulette3DRefs.update3DPlacedChips) roulette3DRefs.update3DPlacedChips();
      });

      /* 3D ROULETTE WHEEL & BALL SPIN PHYSICS - 3-PHASE CINEMATIC LAUNCH */
      function animateRoulette3DSpin(winNum, totalDuration = 9600, onDone) {
        if (!roulette3DRefs) { onDone && onDone(); return; }
        const { rotor, ball } = roulette3DRefs;

        const idx = WHEEL_ORDER.indexOf(winNum);
        const segAngle = (Math.PI * 2) / WHEEL_ORDER.length;
        const startOffset = -0.4263;
        const pocketAngle = startOffset - idx * segAngle;

        // Physical dimensions & limits
        const startR = 1.38;
        const bowlR = 1.10;
        const pocketR = 0.84;
        const dropInwardR = 1.16;
        const startDropH = 2.10;
        const startH = 0.60;
        const bowlH = 0.50;
        const pocketFloorH = 0.505;

        // 1. Initial State from current resting position (NO TELEPORTATION!)
        const startBallX = ball.position.x || (Math.sin(pocketAngle) * pocketR);
        const startBallY = ball.position.y || pocketFloorH;
        const startBallZ = ball.position.z || (Math.cos(pocketAngle) * pocketR);
        const startBallR = Math.hypot(startBallX, startBallZ) || pocketR;
        const startBallAngle = Math.atan2(startBallX, startBallZ);

        // Strict Direction 1: Rotor rotates CLOCKWISE (+Y)
        const startRotorRot = rotor.rotation.y;
        const rotorSpins = 4.0 * Math.PI * 2;
        const targetRotorRot = startRotorRot + rotorSpins + (Math.PI * 2 - (pocketAngle % (Math.PI * 2)));

        // Strict Direction 2: Ball thrown OPPOSITE / COUNTER-CLOCKWISE (-Y)
        const totalRevsAhead = 6.0 * Math.PI * 2;

        const RISE_DURATION = 1000;  // Phase 1: 1.0s smooth levitation from pocket to top rim
        const WAIT_DURATION = 3000;  // Phase 2: 3.0s suspenseful hover/anticipation at top rim
        const SPIN_DURATION = 5600;  // Phase 3: 5.6s physical throw & deceleration into pocket
        const TOTAL_DURATION = RISE_DURATION + WAIT_DURATION + SPIN_DURATION; // 9.6s

        let lastFretCross = -1;
        let lastDeflectorSoundTime = 0;
        let throwSoundPlayed = false;
        let lastNow = performance.now();
        const start = performance.now();

        function step(now) {
          const frameDt = Math.min(0.05, (now - lastNow) / 1000);
          lastNow = now;
          const elapsed = now - start;

          if (elapsed < RISE_DURATION) {
            /* ----------------------------------------------------
               FASE 1: SUBIDA SUAVE DESDE DONDE ESTÁ (0 a 1.0s)
            ---------------------------------------------------- */
            const u = elapsed / RISE_DURATION;
            const eRise = 1 - Math.pow(1 - u, 3); // Smooth ease-out lift

            const curR = startBallR + (startR - startBallR) * eRise;
            const curH = startBallY + (startDropH - startBallY) * eRise;
            const curAngle = startBallAngle + eRise * 0.35;

            rotor.rotation.y = startRotorRot + u * 0.6; // Gentle initial rotor spin

            ball.position.x = Math.sin(curAngle) * curR;
            ball.position.z = Math.cos(curAngle) * curR;
            ball.position.y = curH;
            ball.rotation.x += frameDt * 4;
            ball.rotation.z += frameDt * 3;
          }
          else if (elapsed < (RISE_DURATION + WAIT_DURATION)) {
            /* ----------------------------------------------------
               FASE 2: ESPERA DE 3 SEGUNDOS ARRIBA EN SUSPENSE (1.0s a 4.0s)
            ---------------------------------------------------- */
            const u = (elapsed - RISE_DURATION) / WAIT_DURATION;
            const hoverFloat = Math.sin(u * Math.PI * 4) * 0.035;
            const curH = startDropH + hoverFloat;
            const curAngle = startBallAngle + 0.35 + u * 1.6;

            // Rotor accelerates up to high momentum during the 3-second wait
            rotor.rotation.y = startRotorRot + 0.6 + Math.pow(u, 1.4) * (Math.PI * 3.2);

            ball.position.x = Math.sin(curAngle) * startR;
            ball.position.z = Math.cos(curAngle) * startR;
            ball.position.y = curH;
            ball.rotation.x += frameDt * 6;
            ball.rotation.z += frameDt * 4;

            if (u >= 0.95 && !throwSoundPlayed) {
              throwSoundPlayed = true;
              playSound('card_deal'); // Crisp throw swoosh
            }
          }
          else {
            /* ----------------------------------------------------
               FASE 3: LANZAMIENTO FÍSICO Y DESCENSO A LA RULETA (4.0s a 9.6s)
            ---------------------------------------------------- */
            const t = Math.min(1, (elapsed - (RISE_DURATION + WAIT_DURATION)) / SPIN_DURATION);

            // 1. Unified Continuous Rotor Deceleration
            const eRotor = 1 - Math.pow(1 - t, 2.5);
            const currentRotorAngle = startRotorRot + (targetRotorRot - startRotorRot) * eRotor;
            rotor.rotation.y = currentRotorAngle;

            // Target pocket world angle at instant t
            const winPocketWorldAngle = currentRotorAngle + pocketAngle;

            // 2. Relative Angle Evolution (-Y Counter-Clockwise Monotonic Convergence)
            const relAngleAhead = -totalRevsAhead * Math.pow(1 - t, 2.2);

            // Subtle natural micro-settle oscillation ONLY within the pocket at the very end
            let wobbleAngle = 0;
            let wobbleH = 0;
            if (t > 0.88) {
              const tSettle = (t - 0.88) / 0.12;
              const decay = Math.pow(1 - tSettle, 2);
              wobbleAngle = Math.sin(tSettle * Math.PI * 8) * (segAngle * 0.20 * decay);
              wobbleH = Math.abs(Math.cos(tSettle * Math.PI * 6)) * (0.025 * decay);
            }

            const currentBallAngle = winPocketWorldAngle + relAngleAhead + wobbleAngle;

            // 3. Continuous Radius Evolution
            let currentR = startR;
            if (t <= 0.08) {
              const dropT = t / 0.08;
              currentR = dropInwardR + (startR - dropInwardR) * Math.sin(dropT * Math.PI / 2);
            } else if (t < 0.45) {
              currentR = startR;
            } else if (t < 0.68) {
              const tBowl = (t - 0.45) / (0.68 - 0.45);
              currentR = startR - (startR - bowlR) * Math.pow(tBowl, 1.2);
            } else {
              const tRotor = (t - 0.68) / (1.0 - 0.68);
              currentR = bowlR - (bowlR - pocketR) * Math.min(1, Math.pow(tRotor, 1.3));
            }

            // 4. Height & Physical Collision Bouncing
            let currentH = startH;
            if (t <= 0.08) {
              const dropT = t / 0.08;
              currentH = startH + (startDropH - startH) * Math.pow(1 - dropT, 2);
            } else if (t < 0.45) {
              currentH = startH;
            } else if (t < 0.68) {
              const tBowl = (t - 0.45) / (0.68 - 0.45);
              const baseH = startH - (startH - bowlH) * Math.pow(tBowl, 1.2);
              const deflectorFreq = Math.sin(tBowl * Math.PI * 12);
              const deflectorH = Math.max(0, deflectorFreq) * (0.06 * (1 - tBowl * 0.5));
              if (deflectorFreq > 0.85 && (now - lastDeflectorSoundTime) > 90) {
                lastDeflectorSoundTime = now;
                playSound('tick');
              }
              currentH = baseH + deflectorH;
            } else {
              const pocketsAhead = Math.abs(relAngleAhead / segAngle);
              const fretPhase = pocketsAhead % 1.0;
              const hopArc = Math.sin(fretPhase * Math.PI);
              const hopDecay = Math.pow(1 - (t - 0.68) / (1.0 - 0.68), 1.5);
              const fretHopH = Math.pow(hopArc, 1.4) * (0.12 * Math.min(1, pocketsAhead / 4) * hopDecay);
              currentH = pocketFloorH + fretHopH + wobbleH;

              const curPock = Math.floor(pocketsAhead);
              if (curPock !== lastFretCross && curPock <= 25 && t < 0.96) {
                lastFretCross = curPock;
                playSound('tick');
              }
            }

            ball.position.x = Math.sin(currentBallAngle) * currentR;
            ball.position.z = Math.cos(currentBallAngle) * currentR;
            ball.position.y = currentH;
            ball.rotation.x += frameDt * 16 * (1 - t * 0.5);
            ball.rotation.z += frameDt * 8 * (1 - t * 0.5);
          }

          if (elapsed < TOTAL_DURATION) {
            requestAnimationFrame(step);
          } else {
            const finalAbsAngle = targetRotorRot + pocketAngle;
            ball.position.x = Math.sin(finalAbsAngle) * pocketR;
            ball.position.z = Math.cos(finalAbsAngle) * pocketR;
            ball.position.y = pocketFloorH;
            if (roulette3DRefs) roulette3DRefs.lastWinPocketAngle = pocketAngle;
            onDone && onDone();
          }
        }

        requestAnimationFrame(step);
      }

      /* ============================================================
         1. MULTIPLAYER AUTHORITATIVE ROULETTE ENGINE
      ============================================================ */
      let rouletteServerState = null;
      let isLocalReady = false;
      let lastHandledSpinId = -1;

      // Socket.IO Multiplayer Event Listeners for Roulette
      if (typeof socket !== 'undefined' && socket) {
        socket.on('rouletteError', (err) => {
          if (err && err.message) showToast('⚠️ ' + err.message);
        });

        socket.on('rouletteNotify', (data) => {
          if (data && data.message) showToast('ℹ️ ' + data.message);
        });

        socket.on('rouletteState', (s) => {
          if (!s || s.rouletteId !== 'roulette') return;
          rouletteServerState = s;

          const statusBadge = document.getElementById('rouletteStatusBadge');
          const readyBtn = document.getElementById('rouletteReadyBtn');

          const totalP = s.totalPlayers || 0;
          const totalR = s.totalReady || 0;

          if (s.status === 'WAITING' || s.status === 'READY') {
            if (totalP === 0) {
              if (statusBadge) statusBadge.textContent = '⏳ Esperando a que se siente un jugador...';
            } else if (totalR === totalP && totalP > 0) {
              if (statusBadge) statusBadge.textContent = `🟢 ¡Todos listos (${totalR}/${totalP})! Girando...`;
            } else {
              const needed = totalP - totalR;
              if (statusBadge) statusBadge.textContent = `👥 ${totalP} en Mesa · ⏳ ${totalR}/${totalP} Listos`;
            }
          } else if (s.status === 'SPINNING') {
            if (statusBadge) statusBadge.textContent = '🎰 Giro en curso...';
          } else if (s.status === 'RESULT') {
            if (statusBadge) statusBadge.textContent = `🏆 Resultado: ${s.result}`;
          }

          // Check if local player is ready
          const myId = socket.id;
          isLocalReady = !!(s.readyPlayers && myId && s.readyPlayers[myId]);

          if (readyBtn) {
            if (isLocalReady) {
              readyBtn.textContent = 'CANCELAR LISTO ❌';
              readyBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            } else {
              readyBtn.textContent = 'LISTO 👍';
              readyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            }
            readyBtn.disabled = (s.status === 'SPINNING' || s.status === 'RESULT');
          }
        });

        socket.on('rouletteSpin', (data) => {
          if (!data || data.rouletteId !== 'roulette') return;
          if (lastHandledSpinId === data.spinId) return;
          lastHandledSpinId = data.spinId;
          rState.spinning = true;

          const winNum = data.result;

          animateRoulette3DSpin(winNum, 6400, () => {
            let winAmt = 0;
            const color = numColor(winNum);

            Object.entries(rState.bets).forEach(([key, amt]) => {
              if (key === 'num-' + winNum) winAmt += amt * 36;
              else if (key === 'red' && color === 'red') winAmt += amt * 2;
              else if (key === 'black' && color === 'black') winAmt += amt * 2;
              else if (key === 'even' && winNum !== 0 && winNum % 2 === 0) winAmt += amt * 2;
              else if (key === 'odd' && winNum % 2 === 1) winAmt += amt * 2;
              else if (key === 'low' && winNum >= 1 && winNum <= 18) winAmt += amt * 2;
              else if (key === 'high' && winNum >= 19 && winNum <= 36) winAmt += amt * 2;
              else if (key === 'dozen1' && winNum >= 1 && winNum <= 12) winAmt += amt * 3;
              else if (key === 'dozen2' && winNum >= 13 && winNum <= 24) winAmt += amt * 3;
              else if (key === 'dozen3' && winNum >= 25 && winNum <= 36) winAmt += amt * 3;
              else if (key === 'col1' && winNum > 0 && winNum % 3 === 1) winAmt += amt * 3;
              else if (key === 'col2' && winNum > 0 && winNum % 3 === 2) winAmt += amt * 3;
              else if (key === 'col3' && winNum > 0 && winNum % 3 === 0) winAmt += amt * 3;
            });

            state.balance += winAmt; updateBalanceUI();
            const net = winAmt - rState.totalBet;

            const banner = document.getElementById('resultBanner');
            document.getElementById('resultNum').textContent = winNum;
            const msg = document.getElementById('resultMsg');
            if (net >= 0) { msg.className = 'win'; msg.textContent = '+$' + net; triggerConfetti(); addXP(100); }
            else { msg.className = 'lose'; msg.textContent = '-$' + rState.totalBet; playSound('lose'); }
            banner.classList.add('show');

            setTimeout(() => {
              banner.classList.remove('show');
              rState.bets = {}; rState.totalBet = 0;
              document.getElementById('totalBetDisplay').textContent = '$0';
              if (roulette3DRefs && roulette3DRefs.update3DPlacedChips) roulette3DRefs.update3DPlacedChips();
              rState.spinning = false;
              isLocalReady = false;
            }, 3000);
          });
        });
      }

      const readyBtnEl = document.getElementById('rouletteReadyBtn');
      if (readyBtnEl) {
        readyBtnEl.addEventListener('click', () => {
          if (rState.spinning) return;

          const totalP = (rouletteServerState && typeof rouletteServerState.totalPlayers === 'number') ? rouletteServerState.totalPlayers : 1;
          const currentBet = rState.totalBet || 0;

          // Solo Player Rule: If player is alone at the table, require at least one bet (> $0) to say ready
          if (totalP <= 1 && currentBet <= 0 && !isLocalReady) {
            showToast('⚠️ Debes realizar al menos una apuesta para iniciar la ruleta en solitario');
            return;
          }

          if (socket && socket.connected) {
            if (isLocalReady) {
              socket.emit('rouletteUnready', { rouletteId: 'roulette' });
            } else {
              socket.emit('rouletteReady', { rouletteId: 'roulette' });
            }
          } else {
            // Standalone offline local testing fallback
            if (currentBet <= 0 && !isLocalReady) {
              showToast('⚠️ Debes realizar al menos una apuesta para girar la ruleta');
              return;
            }

            isLocalReady = !isLocalReady;
            const statusBadge = document.getElementById('rouletteStatusBadge');
            if (isLocalReady) {
              readyBtnEl.textContent = 'CANCELAR LISTO ❌';
              readyBtnEl.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
              if (statusBadge) statusBadge.textContent = '🟢 ¡Listo! Girando...';

              setTimeout(() => {
                const winNum = WHEEL_ORDER[Math.floor(Math.random() * WHEEL_ORDER.length)];
                rState.spinning = true;

                animateRoulette3DSpin(winNum, 6400, () => {
                  let winAmt = 0;
                  const color = numColor(winNum);

                  Object.entries(rState.bets).forEach(([key, amt]) => {
                    if (key === 'num-' + winNum) winAmt += amt * 36;
                    else if (key === 'red' && color === 'red') winAmt += amt * 2;
                    else if (key === 'black' && color === 'black') winAmt += amt * 2;
                    else if (key === 'even' && winNum !== 0 && winNum % 2 === 0) winAmt += amt * 2;
                    else if (key === 'odd' && winNum % 2 === 1) winAmt += amt * 2;
                    else if (key === 'low' && winNum >= 1 && winNum <= 18) winAmt += amt * 2;
                    else if (key === 'high' && winNum >= 19 && winNum <= 36) winAmt += amt * 2;
                    else if (key === 'dozen1' && winNum >= 1 && winNum <= 12) winAmt += amt * 3;
                    else if (key === 'dozen2' && winNum >= 13 && winNum <= 24) winAmt += amt * 3;
                    else if (key === 'dozen3' && winNum >= 25 && winNum <= 36) winAmt += amt * 3;
                    else if (key === 'col1' && winNum > 0 && winNum % 3 === 1) winAmt += amt * 3;
                    else if (key === 'col2' && winNum > 0 && winNum % 3 === 2) winAmt += amt * 3;
                    else if (key === 'col3' && winNum > 0 && winNum % 3 === 0) winAmt += amt * 3;
                  });

                  state.balance += winAmt; updateBalanceUI();
                  const net = winAmt - rState.totalBet;

                  const banner = document.getElementById('resultBanner');
                  document.getElementById('resultNum').textContent = winNum;
                  const msg = document.getElementById('resultMsg');
                  if (net >= 0) { msg.className = 'win'; msg.textContent = '+$' + net; triggerConfetti(); addXP(100); }
                  else { msg.className = 'lose'; msg.textContent = '-$' + rState.totalBet; playSound('lose'); }
                  banner.classList.add('show');

                  setTimeout(() => {
                    banner.classList.remove('show');
                    rState.bets = {}; rState.totalBet = 0;
                    document.getElementById('totalBetDisplay').textContent = '$0';
                    if (roulette3DRefs && roulette3DRefs.update3DPlacedChips) roulette3DRefs.update3DPlacedChips();
                    rState.spinning = false;
                    isLocalReady = false;
                    readyBtnEl.textContent = 'LISTO 👍';
                    readyBtnEl.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    if (statusBadge) statusBadge.textContent = '👥 1 en Mesa · ⏳ 0/1 Listos';
                  }, 3000);
                });
              }, 600);
            } else {
              readyBtnEl.textContent = 'LISTO 👍';
              readyBtnEl.style.background = 'linear-gradient(135deg, #10b981, #059669)';
              if (statusBadge) statusBadge.textContent = '👥 1 en Mesa · ⏳ 0/1 Listos';
            }
          }
        });
      }

// --- Explicit Global Window Bindings ---
if (typeof rState !== 'undefined') window.rState = rState;
