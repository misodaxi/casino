/* ============================================================
         CANVAS PARTICLE FX SYSTEM (CONFETTI, SPARKS)
      ============================================================ */
      var fxCanvas = document.getElementById('fx-canvas');
      var fxCtx = fxCanvas.getContext('2d');
      var particles = [];

      function resizeFxCanvas() {
        fxCanvas.width = window.innerWidth;
        fxCanvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resizeFxCanvas);
      resizeFxCanvas();

      function triggerConfetti() {
        playSound('win');
        var colors = ['#8B5CF6', '#E11FD1', '#FB923C', '#22c55e', '#38bdf8', '#FBBF24'];
        const maxP = (window.currentQuality && window.currentQuality.maxParticles) ? window.currentQuality.maxParticles : 60;
        for (let i = 0; i < maxP; i++) {
          particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2 - 50,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.8) * 16,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: 0.012 + Math.random() * 0.01,
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.2
          });
        }
      }

      function updateParticles() {
        if (particles.length === 0) return; // 0 CPU cost when idle
        fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.rot += p.vRot;
          p.life -= p.decay;

          if (p.life <= 0) { particles.splice(i, 1); continue; }

          fxCtx.save();
          fxCtx.translate(p.x, p.y);
          fxCtx.rotate(p.rot);
          fxCtx.globalAlpha = p.life;
          fxCtx.fillStyle = p.color;
          fxCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          fxCtx.restore();
        }
        if (particles.length === 0) {
          fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
        }
      }


/* ============================================================
         EMOTE WHEEL & PHYSICAL 3D CHAT BUBBLES
      ============================================================ */
      const emoteWheel = document.getElementById('emoteWheel');
      const emoteTriggerBtn = document.getElementById('emoteTriggerBtn');

      emoteTriggerBtn.addEventListener('click', toggleEmoteWheel);

      function toggleEmoteWheel() {
        emoteWheel.classList.toggle('show');
      }

      window.addEventListener('keydown', e => {
        if (document.activeElement === document.getElementById('chatInput')) return;
        if (e.key.toLowerCase() === 'q') toggleEmoteWheel();
      });

      document.querySelectorAll('.emote-item').forEach(item => {
        item.addEventListener('click', () => {
          const emote = item.dataset.e;
          emoteWheel.classList.remove('show');
          triggerEmote(emote);
        });
      });

      function triggerEmote(type) {
        const emoteMap = { wave: '👋', laugh: '😂', fire: '🔥', party: '🎉', cool: '😎', cry: '😭' };
        const icon = emoteMap[type] || '😃';

        let startY = playerAvatar.position.y;
        let t = 0;
        const jump = setInterval(() => {
          t += 0.15;
          playerAvatar.position.y = Math.sin(t) * 0.6;
          if (t >= Math.PI) { clearInterval(jump); playerAvatar.position.y = 0; }
        }, 20);

        showChatBubble(icon + ' !');
        playSound('win');
      }

      /* ============================================================
         TEXT-TO-SPEECH (TTS) CHAT VOICE SYNTHESIS
      ============================================================ */
      let ttsEnabled = true;
      let spanishVoice = null;

      function initTTSVoices() {
        if (!('speechSynthesis' in window)) return;
        const updateVoice = () => {
          const voices = window.speechSynthesis.getVoices();
          spanishVoice = voices.find(v => v.lang.startsWith('es') || v.lang.includes('ES')) || voices[0] || null;
        };
        updateVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = updateVoice;
        }
      }
      initTTSVoices();

      function speakChatMessage(text, options = {}) {
        if (!ttsEnabled || !('speechSynthesis' in window)) return;
        if (!text) return;

        // Clean text from emojis / symbols for clean reading
        const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
        if (!cleanText) return;

        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(cleanText);
          if (spanishVoice) utter.voice = spanishVoice;
          utter.lang = options.lang || 'es-ES';
          utter.pitch = options.pitch || 1.05;
          utter.rate = options.rate || 1.05;
          utter.volume = options.volume || 1.0;
          window.speechSynthesis.speak(utter);
        } catch (e) { console.log('TTS Error:', e); }
      }

      const toggleTtsBtn = document.getElementById('toggleTtsBtn');
      if (toggleTtsBtn) {
        toggleTtsBtn.addEventListener('click', () => {
          ttsEnabled = !ttsEnabled;
          toggleTtsBtn.textContent = ttsEnabled ? '🔊 Voz: ON' : '🔇 Voz: OFF';
          toggleTtsBtn.style.color = ttsEnabled ? 'var(--amber)' : 'var(--dim)';
          showToast(ttsEnabled ? 'Voz de chat activada 🔊' : 'Voz de chat desactivada 🔇');
          if (!ttsEnabled && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
        });
      }

      function showChatBubble(msg) {
        const tag = document.getElementById('avatarTag');
        let bubble = tag.querySelector('.chat-bubble');
        if (!bubble) {
          bubble = document.createElement('div');
          bubble.className = 'chat-bubble';
          tag.appendChild(bubble);
        }
        bubble.textContent = msg;
        speakChatMessage(msg);
        setTimeout(() => { if (bubble) bubble.remove(); }, 3500);
      }

      const chatInput = document.getElementById('chatInput');

      chatInput.addEventListener('focus', () => {
        state.isTypingChat = true;
        Object.keys(state.keys).forEach(k => state.keys[k] = false);
        if (state.player) { state.player.vx = 0; state.player.vz = 0; }
      });

      chatInput.addEventListener('blur', () => {
        state.isTypingChat = false;
        Object.keys(state.keys).forEach(k => state.keys[k] = false);
      });

      document.getElementById('sendChatBtn').addEventListener('click', sendChatMessage);
      chatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          sendChatMessage();
          chatInput.blur();
        } else if (e.key === 'Escape') {
          chatInput.value = '';
          chatInput.blur();
        }
        e.stopPropagation();
      });

      function sendChatMessage() {
        const txt = chatInput.value.trim();
        if (!txt) return;
        showChatBubble(txt);
        chatInput.value = '';
      }


/* ============================================================
         8. BAR & STORE ACTIONS
      ============================================================ */
      document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', () => {
          const cost = parseInt(card.dataset.cost, 10);
          if (state.balance < cost) { showToast('Saldo insuficiente'); return; }
          state.balance -= cost; updateBalanceUI();
          playSound('win'); addXP(150);
          showToast('¡Compraste ' + card.querySelector('.title').textContent + '! 🍸');
        });
      });

      document.querySelectorAll('.color-pick').forEach(btn => {
        btn.addEventListener('click', () => {
          const hex = parseInt(btn.dataset.color, 16);
          state.player.color = hex;
          scene.remove(playerAvatar);
          playerAvatar.children[0].material.color.setHex(hex);
          scene.add(playerAvatar);
          showToast('Color de avatar actualizado 🎨');
        });
      });

      document.getElementById('claimDailyBtn').addEventListener('click', () => {
        state.balance += 500; updateBalanceUI();
        triggerConfetti(); addXP(200);
        showToast('¡Recompensas diarias reclamadas: +$500! 🎁');
      });

      document.getElementById('addFundsBtn').addEventListener('click', () => {
        state.balance += 1000; updateBalanceUI();
        triggerConfetti();
        showToast('¡Depósito de prueba: +$1,000! 💰');
      });


/* ============================================================
         FULLSCREEN CONTROLLER (TOGGLE FULLSCREEN ⛶ / 🗗)
      ============================================================ */
      const fullscreenBtn = document.getElementById('fullscreenBtn');

      function isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      }

      function toggleFullscreen() {
        if (!isFullscreen()) {
          const docEl = document.documentElement;
          if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(() => {});
          } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
          } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
          } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }

      function updateFullscreenUI() {
        if (!fullscreenBtn) return;
        if (isFullscreen()) {
          fullscreenBtn.textContent = '🗗';
          fullscreenBtn.title = 'Salir de Pantalla Completa';
          fullscreenBtn.style.color = '#c4b5fd';
        } else {
          fullscreenBtn.textContent = '⛶';
          fullscreenBtn.title = 'Pantalla Completa';
          fullscreenBtn.style.color = 'var(--text)';
        }
      }

      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
      }

      ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
        document.addEventListener(evt, () => {
          updateFullscreenUI();
          setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (typeof cssRenderer !== 'undefined' && cssRenderer) {
              cssRenderer.setSize(window.innerWidth, window.innerHeight);
            }
          }, 100);
        });
      });

      /* ============================================================
         MINIGAMES INTERACTION LISTENERS (BOWLING, SLOTS, PACHINKO, ETC.)
      ============================================================ */
      // 1. Bowling Roll Button
      const bowlingBtn = document.getElementById('bowlingRollBtn');
      if (bowlingBtn) {
        bowlingBtn.addEventListener('click', () => {
          playSound('chip');
          showToast('🎳 ¡Lanzando bola de bolos...!');
          setTimeout(() => {
            const isStrike = Math.random() > 0.4;
            if (isStrike) {
              triggerConfetti();
              addXP(150);
              state.balance += 100;
              updateBalanceUI();
              showToast('💥 ¡STRIKE! ¡Tiraste los 10 bolos! (+$100) 🏆');
            } else {
              addXP(50);
              showToast('🎳 ¡Buen tiro! 8 bolos derribados (+50 XP)');
            }
          }, 1200);
        });
      }

      // 2. Slots Spin Button & Chip Selector
      window.slotsBet = (typeof window.slotsBet === 'number' && window.slotsBet > 0) ? window.slotsBet : 20;
      document.querySelectorAll('#slotsChipRack .chip').forEach(c => {
        c.addEventListener('click', () => {
          playSound('chip');
          document.querySelectorAll('#slotsChipRack .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          window.slotsBet = roundMoney(c.dataset.v);
          const d = document.getElementById('slotsBetDisplay');
          if (d) d.textContent = formatMoney(window.slotsBet);
        });
      });
      const slotsBtn = document.getElementById('slotsSpinBtn');
      if (slotsBtn) {
        slotsBtn.addEventListener('click', () => {
          spinSlotMachine('slots');
        });
      }

      // 3. Pachinko Drop Button
      window.pachinkoBet = (typeof window.pachinkoBet === 'number' && window.pachinkoBet >= 300) ? window.pachinkoBet : 300;
      document.querySelectorAll('#pachinkoChipRack .chip').forEach(c => {
        c.addEventListener('click', () => {
          playSound('chip');
          document.querySelectorAll('#pachinkoChipRack .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          window.pachinkoBet = Math.max(300, roundMoney(c.dataset.v));
          const d = document.getElementById('pachinkoBetDisplay');
          if (d) d.textContent = formatMoney(window.pachinkoBet);
        });
      });
      const pachinkoBtn = document.getElementById('pachinkoDropBtn');
      if (pachinkoBtn) {
        pachinkoBtn.addEventListener('click', () => {
          spinSlotMachine('pachinko');
        });
      }

      // 4. Tragaperras Pull Button
      window.tragaBet = (typeof window.tragaBet === 'number' && window.tragaBet > 0) ? window.tragaBet : 10;
      document.querySelectorAll('#tragaperrasChipRack .chip').forEach(c => {
        c.addEventListener('click', () => {
          playSound('chip');
          document.querySelectorAll('#tragaperrasChipRack .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          window.tragaBet = roundMoney(c.dataset.v);
          const d = document.getElementById('tragaperrasBetDisplay');
          if (d) d.textContent = formatMoney(window.tragaBet);
        });
      });
      const tragaBtn = document.getElementById('tragaperrasPullBtn');
      if (tragaBtn) {
        tragaBtn.addEventListener('click', () => {
          spinSlotMachine('tragaperras');
        });
      }

      // 5. Poker All-In Button
      const pokerBtn = document.getElementById('pokerAllInBtn');
      if (pokerBtn) {
        pokerBtn.addEventListener('click', () => {
          playSound('chip');
          const combos = ['Pareja de Ases 🂡🂡', 'Trío de Reyes 🂮🂮🂮', 'Color de Corazones ♥', 'Full House ♠♦', 'Escalera Real 👑'];
          const picked = combos[Math.floor(Math.random() * combos.length)];
          triggerConfetti();
          addXP(150);
          showToast(`♠️ ¡Tu mano de Poker: ${picked}!`);
        });
      }

      // 6. Jackpot Spin Button
      const jackpotBtn = document.getElementById('jackpotSpinBtn');
      if (jackpotBtn) {
        jackpotBtn.addEventListener('click', () => {
          if (state.balance < 100) { showToast('Saldo insuficiente ($100 necesarios)'); return; }
          state.balance -= 100;
          updateBalanceUI();
          playSound('chip');
          showToast('🏆 ¡Probando suerte en el Mega Jackpot...!');
          setTimeout(() => {
            if (Math.random() > 0.95) {
              state.balance += 5000;
              updateBalanceUI();
              triggerConfetti();
              addXP(500);
              showToast('🚨🚨 ¡¡MEGA JACKPOT MILLIONS GANADO!! +$5,000 🏆🚨🚨');
            } else {
              state.balance += 50;
              updateBalanceUI();
              showToast('🏆 Premio de consolación Jackpot: +$50');
            }
          }, 1400);
        });
      }

            /* ============================================================
         GLOBAL MOUSE WHEEL FAST BET ADJUSTMENT (ALL CASINO MACHINES)
      ============================================================ */
      function handleGlobalWheelBet(deltaY) {
        const dir = (deltaY < 0) ? 1 : -1; // 1 = scroll up (increase), -1 = scroll down (decrease)
        const currentMode = (typeof state !== 'undefined' && state.mode) ? state.mode : null;
        const currentSeatZone = (typeof state !== 'undefined' && state.player && state.player.currentSeat) ? state.player.currentSeat.zone : null;
        const activeZoneId = (currentMode && currentMode !== 'casino' && currentMode !== 'transition') ? currentMode : currentSeatZone;

        if (!activeZoneId || activeZoneId === 'casino' || activeZoneId === 'transition') {
          return false;
        }

        // 1. DADOS (DICE)
        if (activeZoneId === 'dice') {
          if (typeof dState !== 'undefined' && !dState.rolling) {
            const step = roundMoney((typeof dState.selectedChip === 'number' && dState.selectedChip > 0) ? dState.selectedChip : 50);
            let curBet = (typeof dState.bet === 'number' && dState.bet > 0) ? dState.bet : step;
            let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
            nextBet = Math.max(step, Math.min(state.balance, nextBet));
            if (nextBet !== curBet) {
              dState.bet = nextBet;
              const d = document.getElementById('diceBetDisplay');
              if (d) d.textContent = formatMoney(nextBet);
              if (typeof update3DDiceChips === 'function') update3DDiceChips(nextBet);
              if (typeof updateDiceTableUI === 'function' && window.diceServerState) updateDiceTableUI(window.diceServerState);
              playSound('chip', 0.85);
              return true;
            }
          }
        }

        // 2. COIN FLIP
        if (activeZoneId === 'coin') {
          if (typeof coinState !== 'undefined') {
            const step = roundMoney((typeof coinState.selectedChip === 'number' && coinState.selectedChip > 0) ? coinState.selectedChip : 50);
            let curBet = (typeof coinState.bet === 'number' && coinState.bet > 0) ? coinState.bet : step;
            let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
            nextBet = Math.max(step, Math.min(state.balance, nextBet));
            if (nextBet !== curBet) {
              coinState.bet = nextBet;
              const d = document.getElementById('coinBetDisplay');
              if (d) d.textContent = formatMoney(nextBet);
              if (typeof update3DCoinChips === 'function') update3DCoinChips(nextBet);
              if (typeof updateCoinTableUI === 'function' && window.coinServerState) updateCoinTableUI(window.coinServerState);
              playSound('chip', 0.85);
              return true;
            }
          }
        }

        // 3. BLACKJACK
        if (activeZoneId === 'blackjack') {
          if (typeof bjState !== 'undefined' && !bjState.active) {
            const step = roundMoney((typeof bjState.selectedChip === 'number' && bjState.selectedChip > 0) ? bjState.selectedChip : 50);
            let curBet = (typeof bjState.bet === 'number' && bjState.bet > 0) ? bjState.bet : 0;
            let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
            nextBet = Math.max(step, Math.min(state.balance, nextBet));
            if (nextBet !== curBet) {
              bjState.bet = nextBet;
              if (typeof bjBetFirstClick !== 'undefined') bjBetFirstClick = false;
              const d = document.getElementById('bjBetDisplay');
              if (d) d.textContent = formatMoney(nextBet);
              if (window.bj3DRefs && typeof update3DBJChips === 'function') update3DBJChips(nextBet);
              if (typeof socket !== 'undefined' && socket && socket.connected) {
                const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;
                socket.emit('blackjackBetChange', { bet: nextBet, seatIndex: mySeat });
              }
              playSound('chip', 0.85);
              return true;
            }
          }
        }

        // 4. SLOTS 5x5
        if (activeZoneId === 'slots') {
          const selEl = document.querySelector('#slotsChipRack .chip.selected');
          const step = selEl ? roundMoney(selEl.dataset.v) : 20;
          let curBet = (typeof window.slotsBet === 'number' && window.slotsBet > 0) ? window.slotsBet : 20;
          let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
          nextBet = Math.max(step, Math.min(state.balance, nextBet));
          if (nextBet !== curBet) {
            window.slotsBet = nextBet;
            const d = document.getElementById('slotsBetDisplay');
            if (d) d.textContent = formatMoney(nextBet);
            playSound('chip', 0.85);
            return true;
          }
        }

        // 5. PACHINKO / GACHAPON
        if (activeZoneId === 'pachinko') {
          const selEl = document.querySelector('#pachinkoChipRack .chip.selected');
          const step = selEl ? parseInt(selEl.dataset.v, 10) : 300;
          let curBet = (typeof window.pachinkoBet === 'number') ? window.pachinkoBet : 300;
          let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
          nextBet = Math.max(300, Math.min(state.balance, nextBet));
          if (nextBet !== curBet) {
            window.pachinkoBet = nextBet;
            const d = document.getElementById('pachinkoBetDisplay');
            if (d) d.textContent = '$' + nextBet;
            playSound('chip', 0.85);
            return true;
          }
        }

        // 6. TRAGAPERRAS 777
        if (activeZoneId === 'tragaperras') {
          const selEl = document.querySelector('#tragaperrasChipRack .chip.selected');
          const step = selEl ? roundMoney(selEl.dataset.v) : 10;
          let curBet = (typeof window.tragaBet === 'number' && window.tragaBet > 0) ? window.tragaBet : 10;
          let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
          nextBet = Math.max(step, Math.min(state.balance, nextBet));
          if (nextBet !== curBet) {
            window.tragaBet = nextBet;
            const d = document.getElementById('tragaperrasBetDisplay');
            if (d) d.textContent = formatMoney(nextBet);
            playSound('chip', 0.85);
            return true;
          }
        }

        // 7. FORTUNE WHEEL
        if (activeZoneId === 'wheel') {
          const selEl = document.querySelector('#chipRackWheel .chip.selected');
          const step = selEl ? roundMoney(selEl.dataset.v) : 50;
          let curBet = (typeof window.wheelBet === 'number') ? window.wheelBet : 50;
          let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
          nextBet = Math.max(step, Math.min(state.balance, nextBet));
          if (nextBet !== curBet) {
            window.wheelBet = nextBet;
            const d = document.getElementById('wheelBetDisplay');
            if (d) d.textContent = formatMoney(nextBet);
            if (typeof update3DWheelChips === 'function') update3DWheelChips();
            playSound('chip', 0.85);
            return true;
          }
        }

        // 8. PLINKO
        if (activeZoneId === 'plinko') {
          const selEl = document.querySelector('#chipRackPlinko .chip.selected');
          const step = selEl ? roundMoney(selEl.dataset.v) : 50;
          let curBet = (typeof plinkoBet === 'number') ? plinkoBet : 50;
          let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
          nextBet = Math.max(step, Math.min(state.balance, nextBet));
          if (nextBet !== curBet) {
            plinkoBet = nextBet;
            if (typeof pState !== 'undefined') pState.bet = nextBet;
            const d = document.getElementById('plinkoBetDisplay');
            if (d) d.textContent = formatMoney(nextBet);
            playSound('chip', 0.85);
            return true;
          }
        }

        // 9. MINES
        if (activeZoneId === 'mines') {
          if (typeof mState !== 'undefined' && !mState.active) {
            const step = 50;
            let curBet = (typeof mState.bet === 'number') ? mState.bet : 50;
            let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
            nextBet = Math.max(step, Math.min(state.balance, nextBet));
            if (nextBet !== curBet) {
              mState.bet = nextBet;
              const d = document.getElementById('minesBetDisplay');
              if (d) d.textContent = formatMoney(nextBet);
              playSound('chip', 0.85);
              return true;
            }
          }
        }

        // 10. POKER 3D (Full synchronized 3D chip stacks in front of player's seat)
        if (activeZoneId === 'poker') {
          const p = (typeof pokerState !== 'undefined') ? pokerState : (typeof window.pokerState !== 'undefined' ? window.pokerState : null);
          if (p && (!p.inHand || p.phase === 'WAITING' || p.phase === 'ENDED')) {
            const step = roundMoney((typeof p.selectedChip === 'number' && p.selectedChip > 0) ? p.selectedChip : 50);
            let curBet = (typeof p.bet === 'number' && p.bet > 0) ? p.bet : step;
            let nextBet = (dir > 0) ? roundMoney(curBet + step) : roundMoney(curBet - step);
            nextBet = Math.max(step, Math.min(state.balance, nextBet));
            if (nextBet !== curBet) {
              p.bet = nextBet;
              p.currentBet = nextBet;
              const mySeatIdx = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number')
                ? state.player.currentSeat.seatIndex
                : (p.mySeatIndex || 0);

              if (p.seats && p.seats[mySeatIdx]) {
                p.seats[mySeatIdx].bet = nextBet;
              }

              const d = document.getElementById('pokerBetDisplay');
              if (d) d.textContent = formatMoney(nextBet);

              if (typeof updatePokerHUD === 'function') updatePokerHUD();
              if (typeof update3DPokerChips === 'function') update3DPokerChips();
              if (window.poker3DRefs && window.poker3DRefs.update3DPokerChips) window.poker3DRefs.update3DPokerChips();
              if (window.poker3DRefs && window.poker3DRefs.update3DPokerChipRackSelection) window.poker3DRefs.update3DPokerChipRackSelection();

              playSound('chip', 0.85);
              return true;
            }
          }
        }

        // 11. ROULETTE 3D (Hovered spot bet adjust OR cycling active chip in rack)
        if (activeZoneId === 'roulette') {
          if (typeof rState !== 'undefined' && !rState.spinning) {
            // Check if hovering over a 3D felt spot or 2D bet cell
            let hoveredBetKey = null;
            if (typeof getHoveredRouletteBetKey === 'function' && typeof lastMouseClientX === 'number' && typeof lastMouseClientY === 'number') {
              hoveredBetKey = getHoveredRouletteBetKey(lastMouseClientX, lastMouseClientY);
            }
            if (!hoveredBetKey) {
              const hoveredCell = document.querySelector('#betGrid .cell:hover');
              if (hoveredCell && hoveredCell.dataset.key) hoveredBetKey = hoveredCell.dataset.key;
            }

            if (hoveredBetKey) {
              const chipVal = roundMoney(rState.selectedChip || 50);
              if (dir > 0) {
                // Scroll UP over spot -> Add bet
                if (typeof placeBetR === 'function') placeBetR(hoveredBetKey);
                return true;
              } else {
                // Scroll DOWN over spot -> Remove/Refund bet
                if (rState.bets[hoveredBetKey] && rState.bets[hoveredBetKey] > 0) {
                  const removeAmt = Math.min(chipVal, rState.bets[hoveredBetKey]);
                  rState.bets[hoveredBetKey] = roundMoney(rState.bets[hoveredBetKey] - removeAmt);
                  state.balance = roundMoney(state.balance + removeAmt);
                  rState.totalBet = Math.max(0, roundMoney(rState.totalBet - removeAmt));
                  if (rState.bets[hoveredBetKey] <= 0) delete rState.bets[hoveredBetKey];

                  updateBalanceUI();
                  const tb = document.getElementById('totalBetDisplay');
                  if (tb) tb.textContent = formatMoney(rState.totalBet);
                  if (typeof renderStakesR === 'function') renderStakesR();
                  if (roulette3DRefs && roulette3DRefs.update3DPlacedChips) roulette3DRefs.update3DPlacedChips();

                  if (typeof socket !== 'undefined' && socket && socket.connected) {
                    socket.emit('rouletteBet', { rouletteId: 'roulette', betKey: hoveredBetKey, amount: -removeAmt });
                  }
                  playSound('chip', 0.85);
                  return true;
                }
              }
            }

            // If not hovering over a specific cell -> cycle selected chip rack up/down
            const chipRack = document.getElementById('chipRackR') || document.getElementById('chipRackRoulette');
            if (chipRack) {
              const chips = Array.from(chipRack.querySelectorAll('.chip'));
              if (chips.length > 0) {
                const currentIdx = chips.findIndex(c => c.classList.contains('selected'));
                let nextIdx = (currentIdx === -1) ? 0 : (currentIdx + dir);
                nextIdx = Math.max(0, Math.min(chips.length - 1, nextIdx));
                if (nextIdx !== currentIdx) {
                  chips[nextIdx].click();
                  return true;
                }
              }
            }
          }
        }

        return false;
      }
      window.handleGlobalWheelBet = handleGlobalWheelBet;

// ================= PERKS MODAL HANDLERS =================
let _isPerksModalOpen = false;
function openPerksModal() {
  _isPerksModalOpen = true;
  const modal = document.getElementById('perksModal');
  if (modal) modal.classList.add('show');
  if (typeof playSound === 'function') playSound('chip', 0.9);
}
function closePerksModal() {
  _isPerksModalOpen = false;
  const modal = document.getElementById('perksModal');
  if (modal) modal.classList.remove('show');
}

function switchPerksTab(tabId, clickedBtn) {
  const modal = document.getElementById('perksModal');
  if (!modal) return;
  modal.querySelectorAll('.perks-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');

  modal.querySelectorAll('.perks-tab-pane').forEach(pane => pane.classList.remove('active'));
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add('active');

  if (typeof playSound === 'function') playSound('chip', 0.6);
}

window.openPerksModal = openPerksModal;
window.closePerksModal = closePerksModal;
window.switchPerksTab = switchPerksTab;

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && _isPerksModalOpen) {
    closePerksModal();
  }
});

// --- Explicit Global Window Bindings ---
if (typeof handleGlobalWheelBet !== 'undefined') window.handleGlobalWheelBet = handleGlobalWheelBet;
if (typeof updateParticles !== 'undefined') window.updateParticles = updateParticles;
if (typeof spawnConfetti !== 'undefined') window.spawnConfetti = spawnConfetti;
if (typeof spawnSparks !== 'undefined') window.spawnSparks = spawnSparks;
if (typeof updateAvatarTag !== 'undefined') window.updateAvatarTag = updateAvatarTag;
if (typeof openPerksModal !== 'undefined') window.openPerksModal = openPerksModal;
if (typeof closePerksModal !== 'undefined') window.closePerksModal = closePerksModal;
if (typeof switchPerksTab !== 'undefined') window.switchPerksTab = switchPerksTab;
