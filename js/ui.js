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
        for (let i = 0; i < 90; i++) {
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
      let slotsBet = 20;
      document.querySelectorAll('#slotsChipRack .chip').forEach(c => {
        c.addEventListener('click', () => {
          document.querySelectorAll('#slotsChipRack .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          slotsBet = parseInt(c.dataset.v, 10);
          document.getElementById('slotsBetDisplay').textContent = '$' + slotsBet;
        });
      });
      const slotsBtn = document.getElementById('slotsSpinBtn');
      if (slotsBtn) {
        slotsBtn.addEventListener('click', () => {
          spinSlotMachine('slots');
        });
      }

      // 3. Pachinko Drop Button
      let pachinkoBet = 25;
      document.querySelectorAll('#pachinkoChipRack .chip').forEach(c => {
        c.addEventListener('click', () => {
          document.querySelectorAll('#pachinkoChipRack .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          pachinkoBet = parseInt(c.dataset.v, 10);
          document.getElementById('pachinkoBetDisplay').textContent = '$' + pachinkoBet;
        });
      });
      const pachinkoBtn = document.getElementById('pachinkoDropBtn');
      if (pachinkoBtn) {
        pachinkoBtn.addEventListener('click', () => {
          if (state.balance < pachinkoBet) { showToast('Saldo insuficiente'); return; }
          state.balance -= pachinkoBet;
          updateBalanceUI();
          playSound('chip');
          showToast('🔮 ¡Bola de Pachinko en caída!');
          setTimeout(() => {
            const mult = [0, 0.5, 1.5, 2.0, 5.0, 10.0][Math.floor(Math.random() * 6)];
            const win = Math.floor(pachinkoBet * mult);
            if (win > 0) {
              state.balance += win;
              updateBalanceUI();
              if (mult >= 2) triggerConfetti();
              showToast(`✨ Pachinko: Cayó en casilla x${mult}! (+$${win})`);
            } else {
              playSound('lose');
              showToast('Pachinko: La bola cayó fuera');
            }
          }, 1100);
        });
      }

      // 4. Tragaperras Pull Button
      let tragaBet = 10;
      document.querySelectorAll('#tragaperrasChipRack .chip').forEach(c => {
        c.addEventListener('click', () => {
          document.querySelectorAll('#tragaperrasChipRack .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          tragaBet = parseInt(c.dataset.v, 10);
          document.getElementById('tragaperrasBetDisplay').textContent = '$' + tragaBet;
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

// --- Explicit Global Window Bindings ---
if (typeof updateParticles !== 'undefined') window.updateParticles = updateParticles;
if (typeof spawnConfetti !== 'undefined') window.spawnConfetti = spawnConfetti;
if (typeof spawnSparks !== 'undefined') window.spawnSparks = spawnSparks;
if (typeof updateAvatarTag !== 'undefined') window.updateAvatarTag = updateAvatarTag;
