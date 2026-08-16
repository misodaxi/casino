/* ============================================================
         7. COIN FLIP 3D LOGIC & 1 VS 1 DUEL ENGINE
      ============================================================ */
      var coinState = {
        bet: 50,
        selectedChip: 50,
        rivalBet: 50,
        duelMode: true,          // 1 vs 1 duel mode (supports 2 players / rival matching)
        rivalName: '@Rival',
      };

      let coinChoice = 'cara';
      document.querySelectorAll('.choice-btn').forEach(b => {
        b.addEventListener('click', () => {
          if (coinState.duelMode) {
            showToast('ℹ️ En Modo 1 vs 1, el Asiento Izquierdo (J1) es 👑 CARA y el Asiento Derecho (J2) es ⚡ CRUZ');
            return;
          }
          document.querySelectorAll('.choice-btn').forEach(x => x.classList.remove('selected'));
          b.classList.add('selected'); coinChoice = b.dataset.choice;
        });
      });

      function update3DCoinChips(playerBet, rivalBet) {
        if (!coin3DRefs || !coin3DRefs.chipsGroup) return;
        const group = coin3DRefs.chipsGroup;
        while (group.children.length > 0) group.remove(group.children[0]);

        const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
          ? state.player.currentSeat.seatIndex
          : 0;

        const myX = (mySeatIdx === 1) ? 1.40 : -1.40;
        const rivalX = (mySeatIdx === 1) ? -1.40 : 1.40;
        const posZ = 1.40;
        const posY = (coin3DRefs.railTopY || 1.07) + 0.038;

        const pAmt = Math.max(0, (typeof playerBet === 'number') ? playerBet : (coinState.bet || 0));
        if (pAmt > 0) {
          const stackM = create3DChipStackMesh(pAmt, 0.075, 0.018);
          stackM.position.set(myX, posY, posZ);
          group.add(stackM);
        }

        const rAmt = Math.max(0, (typeof rivalBet === 'number') ? rivalBet : (coinState.rivalBet || 0));
        if (coinState.duelMode && rAmt > 0) {
          const stackR = create3DChipStackMesh(rAmt, 0.075, 0.018);
          stackR.position.set(rivalX, posY, posZ);
          group.add(stackR);
        }
      }

      function hasRealCoinRival() {
        const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
          ? state.player.currentSeat.seatIndex
          : 0;

        // Si hay una partida multijugador activa con dos sockets distintos
        if (typeof coinVersusState !== 'undefined' && coinVersusState && coinVersusState.player1 && coinVersusState.player2) {
          if (coinVersusState.player1.id && coinVersusState.player2.id && coinVersusState.player1.id !== coinVersusState.player2.id) {
            return true;
          }
        }

        // Si hay otro jugador remoto sentado en el otro asiento de la mesa de Coin Flip
        if (typeof remotePlayers !== 'undefined' && remotePlayers) {
          for (const id in remotePlayers) {
            const p = remotePlayers[id];
            if (p && p.seat && p.seat.zone === 'coin' && p.seat.seatIndex !== mySeatIdx) {
              return true;
            }
          }
        }

        return false;
      }
      window.hasRealCoinRival = hasRealCoinRival;

      function updateCoinDuelUI() {
        const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
          ? state.player.currentSeat.seatIndex
          : 0;

        const isRealDuel = hasRealCoinRival();

        // Mientras no haya otro jugador real sentado, la banca iguala automáticamente en cada ronda por separado
        if (!isRealDuel) {
          coinState.rivalName = 'La Banca 🏦';
          coinState.rivalBet = (coinState.bet > 0) ? coinState.bet : 50;
        } else {
          // Detectar nombre del jugador rival remoto
          if (typeof remotePlayers !== 'undefined' && remotePlayers) {
            Object.values(remotePlayers).forEach(p => {
              if (p && p.seat && p.seat.zone === 'coin' && p.seat.seatIndex !== mySeatIdx) {
                coinState.rivalName = p.name || '@Rival';
              }
            });
          }
        }

        const statusMsg = document.getElementById('coinDuelStatusMsg');
        const potMsg = document.getElementById('coinDuelPotMsg');
        const matchBtn = document.getElementById('coinMatchBetBtn');
        const flipBtn = document.getElementById('coinFlipBtn');
        const display = document.getElementById('coinBetDisplay');
        const toggleBtn = document.getElementById('coinBotDuelToggleBtn');

        if (display) display.textContent = formatMoney(coinState.bet || 0);

        if (coinState.duelMode) {
          if (toggleBtn) toggleBtn.textContent = isRealDuel ? 'DUELO J1 VS J2 ⚔️' : 'DUELO VS BANCA 🏦';
          const myChoice = (mySeatIdx === 0) ? 'cara' : 'cruz';
          coinChoice = myChoice;

          document.querySelectorAll('.choice-btn').forEach(btn => {
            const isMyChoice = (btn.dataset.choice === myChoice);
            btn.classList.toggle('selected', isMyChoice);
            btn.style.opacity = isMyChoice ? '1' : '0.45';
          });

          const currentBet = coinState.bet || 0;
          const rivalBetVal = isRealDuel ? (coinState.rivalBet || 0) : currentBet;
          const totalPot = roundMoney(currentBet + rivalBetVal);

          if (potMsg) {
            potMsg.textContent = isRealDuel
              ? `⚔️ POT TOTAL: ${formatMoney(totalPot)} · J1 (👑 CARA) vs J2 (⚡ CRUZ)`
              : `⚔️ POT TOTAL: ${formatMoney(totalPot)} · ${mySeatIdx === 0 ? 'Tú (👑 CARA)' : 'Tú (⚡ CRUZ)'} vs La Banca (PAGA 2 A 1)`;
          }

          if (isRealDuel) {
            if (coinState.bet <= 0) {
              if (statusMsg) statusMsg.innerHTML = `🪙 Selecciona fichas en la mesa o pulsa <b>Igualar</b> para aceptar la apuesta de <b>${formatMoney(coinState.rivalBet || 50)}</b>`;
              if (matchBtn) {
                matchBtn.style.display = 'inline-block';
                matchBtn.textContent = `IGUALAR APUESTA (${formatMoney(coinState.rivalBet || 50)}) ⚔️`;
              }
              if (flipBtn) flipBtn.textContent = 'IGUALA PARA ACEPTAR ⏳';
            } else if (coinState.bet < coinState.rivalBet) {
              const diff = roundMoney(coinState.rivalBet - coinState.bet);
              if (statusMsg) statusMsg.innerHTML = `⚠️ Debes igualar la apuesta de <b>${formatMoney(coinState.rivalBet)}</b> (te faltan ${formatMoney(diff)})`;
              if (matchBtn) {
                matchBtn.style.display = 'inline-block';
                matchBtn.textContent = `IGUALAR A ${formatMoney(coinState.rivalBet)} (+${formatMoney(diff)}) ⚔️`;
              }
              if (flipBtn) flipBtn.textContent = 'IGUALA PARA ACEPTAR ⏳';
            } else if (coinState.bet > coinState.rivalBet) {
              if (statusMsg) statusMsg.innerHTML = `⏳ Esperando a que el Rival iguale tu apuesta a <b>${formatMoney(coinState.bet)}</b>...`;
              if (matchBtn) matchBtn.style.display = 'none';
              if (flipBtn) flipBtn.textContent = 'ACEPTAR DUELO ⚔️';
            } else {
              // Equal bets
              if (statusMsg) statusMsg.innerHTML = `⚔️ ¡APUESTAS IGUALADAS (${formatMoney(coinState.bet)} vs ${formatMoney(coinState.rivalBet)})! LISTO PARA LANZAR`;
              if (matchBtn) matchBtn.style.display = 'none';
              if (flipBtn) flipBtn.textContent = 'LANZAR MONEDA 🪙';
            }
          } else {
            // Solo vs Banca: la banca siempre iguala en cada ronda automáticamente
            if (statusMsg) statusMsg.innerHTML = `🪙 Apuesta: <b>${formatMoney(currentBet || 50)}</b> · La Banca iguala automáticamente con <b>${formatMoney(currentBet || 50)}</b>`;
            if (matchBtn) matchBtn.style.display = 'none';
            if (flipBtn) flipBtn.textContent = 'LANZAR MONEDA 🪙';
          }
        } else {
          if (toggleBtn) toggleBtn.textContent = 'SOLO VS BANCA 🏦';
          if (statusMsg) statusMsg.innerHTML = '🪙 Selecciona fichas en la mesa y pulsa en tu círculo para apostar';
          if (potMsg) potMsg.textContent = `POT POTENCIAL: ${formatMoney((coinState.bet || 50) * 2)} (PAGA 2 A 1)`;
          if (matchBtn) matchBtn.style.display = 'none';
          if (flipBtn) flipBtn.textContent = 'LANZAR MONEDA 🪙';
          document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.opacity = '1';
          });
        }

        update3DCoinChips(coinState.bet, isRealDuel ? coinState.rivalBet : coinState.bet);
      }

      function matchRivalBet() {
        if (activeCoinRoll && !activeCoinRoll.settled) return;
        const targetBet = (coinState.rivalBet > 0) ? coinState.rivalBet : 50;
        if (state.balance < targetBet) {
          showToast('⚠️ Saldo insuficiente para igualar la apuesta');
          return;
        }
        playSound('chip');
        coinState.bet = targetBet;
        updateCoinDuelUI();
        if (typeof socket !== 'undefined' && socket && socket.connected && hasRealCoinRival()) {
          socket.emit('coinVersusAcceptBet', { matchId: 'coin-versus-1', balance: state.balance });
        }
        showToast(`⚔️ ¡Has igualado la apuesta de ${formatMoney(targetBet)}! Duelo aceptado.`);
      }
      window.matchRivalBet = matchRivalBet;

      function toggleCoinBotDuel() {
        coinState.duelMode = !coinState.duelMode;
        if (coinState.duelMode) {
          coinState.rivalBet = (coinState.bet > 0) ? coinState.bet : 50;
          showToast('⚔️ Modo Duelo 1 vs 1 activado (Apuestas iguales)');
        } else {
          showToast('Modo Solo vs Banca activado');
        }
        updateCoinDuelUI();
      }
      window.toggleCoinBotDuel = toggleCoinBotDuel;

      function clearCoinBet() {
        if (activeCoinRoll && !activeCoinRoll.settled) return;
        coinState.bet = 0;
        if (!hasRealCoinRival()) {
          coinState.rivalBet = 0;
        }
        updateCoinDuelUI();
        showToast('Apuesta reiniciada. Selecciona una ficha y pulsa en tu círculo.');
      }
      window.clearCoinBet = clearCoinBet;

      /* ============================================================
         ADVANCED HIGH-LAUNCH 3D COIN PHYSICS (EXTRA BOUNCY & NON-CLIPPING)
      ============================================================ */
      const COIN_RADIUS = 0.24;
      const COIN_HALF_H = 0.024;
      const COIN_FLOOR_Y = 0.840;
      const BASIN_BOUND_R = 0.78;

      let activeCoinRoll = null;
      var coinVersusState = null;
      const coinProcessedRolls = new Set();

      function spawnPhysicsCoin(targetFace, customSeed, versusData) {
        const mesh = makeCoinMesh(COIN_RADIUS, COIN_HALF_H * 2);
        mesh.position.set(0, 1.70, 0.06);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

        let vy = 10.4 + Math.random() * 1.6;
        let vx = (Math.random() - 0.5) * 0.45;
        let vz = (Math.random() - 0.5) * 0.45;
        let angSpeed = 38 + Math.random() * 12;
        let tiltAngle = Math.random() * Math.PI * 2;

        if (customSeed) {
          if (typeof customSeed.velY === 'number') vy = customSeed.velY;
          if (typeof customSeed.vx === 'number') vx = customSeed.vx;
          if (typeof customSeed.vz === 'number') vz = customSeed.vz;
          if (typeof customSeed.angSpeed === 'number') angSpeed = customSeed.angSpeed;
          if (typeof customSeed.tiltAngle === 'number') tiltAngle = customSeed.tiltAngle;
        }

        const tiltAxis = new THREE.Vector3(Math.cos(tiltAngle), 0.35 * (Math.random() - 0.5), Math.sin(tiltAngle)).normalize();
        coin3DRefs.launchGroup.add(mesh);
        playSound('chip');

        return {
          mesh,
          vel: new THREE.Vector3(vx, vy, vz),
          angVel: tiltAxis.multiplyScalar(angSpeed),
          bounces: 0,
          settled: false,
          resolved: false,
          groundedTimer: 0,
          snapT: -1,
          snapFrom: null,
          snapTo: null,
          face: targetFace || (Math.random() < 0.5 ? 'cara' : 'cruz'),
          targetFace: targetFace || null,
          versusData: versusData || null
        };
      }

      function rollCoinFlip3D(targetFace, customSeed, versusData) {
        if (!coin3DRefs) return;
        coin3DRefs.restCoin.visible = false;
        while (coin3DRefs.launchGroup.children.length) {
          coin3DRefs.launchGroup.remove(coin3DRefs.launchGroup.children[0]);
        }
        activeCoinRoll = spawnPhysicsCoin(targetFace, customSeed, versusData);
      }

      function updateCoinPhysics(dt) {
        if (!coin3DRefs || !activeCoinRoll) return;
        const d = activeCoinRoll;

        if (d.settled) {
          if (d.snapT >= 0 && d.snapT < 1) {
            d.snapT = Math.min(1, d.snapT + dt * 4.2);
            d.mesh.quaternion.slerpQuaternions(d.snapFrom, d.snapTo, d.snapT);
            d.mesh.position.y = COIN_FLOOR_Y + COIN_HALF_H;
          }
          if (!d.resolved) {
            d.resolved = true;
            resolveCoinFlip3D(d.face, d.versusData);
          }
          return;
        }

        // Sub-stepping for continuous collision detection (CCD)
        const subSteps = 6;
        const subDt = Math.min(0.033, dt) / subSteps;
        const gravity = 15.2;

        for (let step = 0; step < subSteps; step++) {
          d.vel.y -= gravity * subDt;
          d.mesh.position.x += d.vel.x * subDt;
          d.mesh.position.y += d.vel.y * subDt;
          d.mesh.position.z += d.vel.z * subDt;

          const angMag = d.angVel.length();
          if (angMag > 0.0001) {
            const axis = d.angVel.clone().normalize();
            const dq = new THREE.Quaternion().setFromAxisAngle(axis, angMag * subDt);
            d.mesh.quaternion.premultiply(dq);
          }

          // Exact mathematical contact distance of tilted 3D cylinder
          const upWorld = new THREE.Vector3(0, 1, 0).applyQuaternion(d.mesh.quaternion);
          const ay = upWorld.y;
          const contactH = Math.abs(ay) * COIN_HALF_H + Math.sqrt(Math.max(0, 1 - ay * ay)) * COIN_RADIUS;
          const minY = COIN_FLOOR_Y + contactH;

          if (d.mesh.position.y <= minY) {
            d.mesh.position.y = minY; // strictly enforce NO clipping!

            if (Math.abs(d.vel.y) > 0.22 && d.bounces < 14) {
              const restitution = Math.max(0.40, 0.65 - d.bounces * 0.02);
              const bounceImpact = Math.min(1.0, Math.abs(d.vel.y) / 3.0);
              playSound('coin_bounce', bounceImpact);
              d.vel.y = -d.vel.y * restitution;
              d.vel.x *= 0.78;
              d.vel.z *= 0.78;
              d.angVel.multiplyScalar(0.76);
              d.bounces++;
              d.groundedTimer = 0;
            } else {
              d.vel.y = 0;
              d.vel.x *= 0.84;
              d.vel.z *= 0.84;
              d.angVel.multiplyScalar(0.82);
              d.groundedTimer += subDt;
            }
          }

          // Basin rim circular boundary collision
          const distHoriz = Math.hypot(d.mesh.position.x, d.mesh.position.z - 0.06);
          const maxR = BASIN_BOUND_R - COIN_RADIUS * 0.75;
          if (distHoriz > maxR) {
            const nx = d.mesh.position.x / distHoriz;
            const nz = (d.mesh.position.z - 0.06) / distHoriz;
            d.mesh.position.x = nx * maxR;
            d.mesh.position.z = 0.06 + nz * maxR;
            const vDotN = d.vel.x * nx + d.vel.z * nz;
            if (vDotN > 0) {
              d.vel.x -= 1.70 * vDotN * nx;
              d.vel.z -= 1.70 * vDotN * nz;
              d.angVel.multiplyScalar(0.80);
              playSound('coin_bounce', 0.55);
            }
          }
        }

        const isStill = d.vel.length() < 0.12 && d.angVel.length() < 0.55 && d.groundedTimer > 0.18;
        if (isStill) {
          d.settled = true;
          playSound('coin_bounce', 0.25);
          const upN = new THREE.Vector3(0, 1, 0).applyQuaternion(d.mesh.quaternion);
          const naturalFace = upN.y > 0 ? 'cara' : 'cruz';
          d.face = d.targetFace || naturalFace;

          const targetLocal = d.face === 'cara' ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, -1, 0);
          const worldN = targetLocal.clone().applyQuaternion(d.mesh.quaternion).normalize();
          const correction = new THREE.Quaternion().setFromUnitVectors(worldN, new THREE.Vector3(0, 1, 0));
          d.snapFrom = d.mesh.quaternion.clone();
          d.snapTo = correction.multiply(d.mesh.quaternion.clone());
          d.snapT = 0;
        }
      }

      function resolveCoinFlip3D(face, versusData) {
        const isCara = (face === 'cara');
        const result = isCara ? 'cara' : 'cruz';

        const banner = document.getElementById('coinResultBanner');
        document.getElementById('coinResultTitle').textContent = isCara ? '👑 ¡CARA!' : '⚡ ¡CRUZ!';
        const msg = document.getElementById('coinResultMsg');

        if (versusData) {
          const isWinner = (typeof socket !== 'undefined' && socket && socket.id === versusData.winnerId);
          if (isWinner) {
            state.balance = roundMoney(state.balance + versusData.pot);
            updateBalanceUI();
            msg.className = 'win';
            msg.textContent = `¡GANASTE EL DUELO! +${formatMoney(versusData.pot)}`;
            triggerConfetti();
            addXP(150);
            playSound('win');
          } else {
            msg.className = 'lose';
            msg.textContent = `GANADOR: ${versusData.winnerName} (-${formatMoney(versusData.finalBet)})`;
            playSound('lose');
          }
        } else if (coinState.duelMode) {
          const totalPot = roundMoney((coinState.bet || 50) * 2);
          const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
            ? state.player.currentSeat.seatIndex
            : 0;
          const myChoice = (mySeatIdx === 0) ? 'cara' : 'cruz';
          const isWinner = (myChoice === result);

          if (isWinner) {
            state.balance = roundMoney(state.balance + totalPot);
            updateBalanceUI();
            msg.className = 'win';
            msg.textContent = `¡GANASTE EL DUELO! +${formatMoney(totalPot)}`;
            triggerConfetti();
            addXP(150);
            playSound('win');
          } else {
            msg.className = 'lose';
            msg.textContent = `PERDISTE EL DUELO (-${formatMoney(coinState.bet)})`;
            playSound('lose');
          }
        } else {
          const betAmt = coinState.bet || 50;
          if (coinChoice === result) {
            const win = roundMoney(betAmt * 2);
            state.balance = roundMoney(state.balance + win);
            updateBalanceUI();
            msg.className = 'win';
            msg.textContent = `+$${betAmt}`;
            triggerConfetti();
            addXP(60);
            playSound('win');
          } else {
            msg.className = 'lose';
            msg.textContent = `-$${betAmt}`;
            playSound('lose');
          }
        }
        if (typeof hasRealCoinRival === 'function' && !hasRealCoinRival()) {
          coinState.rivalBet = coinState.bet;
        }
        banner.classList.add('show');
        updateCoinDuelUI();
      }

      /* ============================================================
         MULTIPLAYER COIN FLIP SOCKET SYNCHRONIZATION
      ============================================================ */
      if (typeof socket !== 'undefined' && socket) {
        socket.on('coinVersusState', (vsData) => {
          if (!vsData) return;
          coinVersusState = vsData;
          const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
            ? state.player.currentSeat.seatIndex
            : 0;

          if (vsData.player1 && vsData.player2) {
            coinState.duelMode = true;
            const rival = (mySeatIdx === 0) ? vsData.player2 : vsData.player1;
            const me = (mySeatIdx === 0) ? vsData.player1 : vsData.player2;
            if (rival) {
              coinState.rivalName = rival.name || '@Rival';
              coinState.rivalBet = rival.bet || 50;
            }
            if (me && me.bet) {
              coinState.bet = me.bet;
            }
          }
          updateCoinDuelUI();
        });

        socket.on('coinVersusFlipStart', (data) => {
          document.getElementById('coinResultBanner').classList.remove('show');
          const statusMsg = document.getElementById('coinDuelStatusMsg');
          if (statusMsg) statusMsg.innerHTML = '🪙 ¡LANZANDO MONEDA AL AIRE...! ¡MIRA LA MESA!';
        });

        socket.on('coinVersusFlipResult', (resData) => {
          if (!resData || !resData.rollId) return;
          if (coinProcessedRolls.has(resData.rollId)) return;
          coinProcessedRolls.add(resData.rollId);

          rollCoinFlip3D(resData.face, resData.seed, resData);
        });

        socket.on('coinVersusSettled', (settledData) => {
          if (!settledData) return;
          if (socket.id === settledData.winnerId) {
            state.balance = roundMoney(state.balance + settledData.finalBet);
            updateBalanceUI();
          } else if (settledData.winnerId && (socket.id === settledData.player1Id || socket.id === settledData.player2Id)) {
            state.balance = roundMoney(state.balance - settledData.finalBet);
            updateBalanceUI();
          }
        });
      }

      document.getElementById('coinFlipBtn').addEventListener('click', () => {
        if (activeCoinRoll && !activeCoinRoll.settled) return;
        const betAmt = coinState.bet || 0;
        if (betAmt <= 0) {
          showToast('⚠️ Pulsa en tu círculo de apuestas para añadir fichas');
          return;
        }

        const isRealDuel = (typeof hasRealCoinRival === 'function') ? hasRealCoinRival() : false;

        if (isRealDuel) {
          if (typeof socket !== 'undefined' && socket && socket.connected && coinVersusState && coinVersusState.player1 && coinVersusState.player2) {
            if (coinState.bet < coinState.rivalBet) {
              showToast(`⚠️ Debes igualar la apuesta de ${formatMoney(coinState.rivalBet)} para aceptar el duelo`);
              return;
            }
            socket.emit('coinVersusBet', { matchId: 'coin-versus-1', bet: coinState.bet, balance: state.balance });
            return;
          }

          if (coinState.duelMode) {
            if (coinState.bet < coinState.rivalBet) {
              showToast(`⚠️ Debes igualar la apuesta de ${formatMoney(coinState.rivalBet)} para aceptar el duelo`);
              return;
            }
            if (coinState.bet > coinState.rivalBet) {
              coinState.rivalBet = coinState.bet;
              updateCoinDuelUI();
            }
          }
        } else {
          // Contra la banca: igualar automáticamente la apuesta en cada ronda
          coinState.rivalBet = coinState.bet;
        }

        if (state.balance < betAmt) {
          showToast('⚠️ Saldo insuficiente para esa apuesta');
          return;
        }
        state.balance = roundMoney(state.balance - betAmt);
        updateBalanceUI();
        playSound('coin_flip');
        document.getElementById('coinResultBanner').classList.remove('show');
        rollCoinFlip3D();
      });

// --- Explicit Global Window Bindings ---
if (typeof coinState !== 'undefined') window.coinState = coinState;
if (typeof coinVersusState !== 'undefined') window.coinVersusState = coinVersusState;
if (typeof updateCoinPhysics !== 'undefined') window.updateCoinPhysics = updateCoinPhysics;
