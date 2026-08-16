/* ============================================================
   REAL ANIMATED 3D SLOT REELS ENGINE (ULTRA-OPTIMIZED 60 FPS)
   ============================================================ */
var TRAGAPERRAS_SYMBOLS = ['7️⃣', '🍒', '💎', '🔔', '🍋', '⭐', '🍇', '🍀'];
var SLOTS_SYMBOLS = ['🎰', '👑', '💎', '🔥', '⚡', '⭐', '🍉', '💰'];

window.slotMachinesByZone = {
  slots: [],
  pachinko: [],
  tragaperras: []
};

// Pre-cached gradients and layout metrics to guarantee 0 GC allocations per frame
const SLOT_W = 512, SLOT_H = 512;
const REEL_W = 128, REEL_H = 275, REEL_Y = 115;
const REEL_SPACING = 148;
const REEL_START_X = 256 - REEL_SPACING;

function initMachineGradients(machine) {
  if (machine.gradientsReady) return;
  const ctx = machine.ctx;
  if (!ctx) return;

  machine.reelGrads = [];
  for (let i = 0; i < 3; i++) {
    const rx = REEL_START_X + i * REEL_SPACING - REEL_W / 2;
    const g = ctx.createLinearGradient(rx, REEL_Y, rx + REEL_W, REEL_Y);
    g.addColorStop(0, '#94a3b8');
    g.addColorStop(0.2, '#e2e8f0');
    g.addColorStop(0.5, '#ffffff');
    g.addColorStop(0.8, '#e2e8f0');
    g.addColorStop(1, '#94a3b8');
    machine.reelGrads[i] = g;
  }

  const tShad = ctx.createLinearGradient(0, REEL_Y, 0, REEL_Y + 45);
  tShad.addColorStop(0, 'rgba(0,0,0,0.85)');
  tShad.addColorStop(1, 'transparent');
  machine.tShad = tShad;

  const bShad = ctx.createLinearGradient(0, REEL_Y + REEL_H - 45, 0, REEL_Y + REEL_H);
  bShad.addColorStop(0, 'transparent');
  bShad.addColorStop(1, 'rgba(0,0,0,0.85)');
  machine.bShad = bShad;

  machine.gradientsReady = true;
}

function draw3DSlotMachineScreen(ctx, state, theme, type, machineRef) {
  if (!ctx) return;
  if (machineRef && !machineRef.gradientsReady) initMachineGradients(machineRef);

  // Background
  ctx.fillStyle = '#06030c';
  ctx.fillRect(0, 0, SLOT_W, SLOT_H);

  // Glowing outer marquee border
  ctx.strokeStyle = '#' + theme.color.toString(16).padStart(6, '0');
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, SLOT_W - 20, SLOT_H - 20);

  // Flashing neon header (instant math without shadowBlur filter)
  const t = performance.now() * 0.005;
  const pulse = Math.sin(t * 3) * 0.3 + 0.7;
  ctx.fillStyle = theme.color === 0xec4899 ? `rgba(236, 72, 153, ${pulse})` : `rgba(245, 158, 11, ${pulse})`;
  ctx.font = '900 38px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(theme.name === '777' ? '🍒 TRAGAPERRAS 777 🍒' : '🎰 MEGA NEON SLOTS 🎰', 256, 68);

  const symbols = (type === 'tragaperras') ? TRAGAPERRAS_SYMBOLS : SLOTS_SYMBOLS;
  const symCount = symbols.length;

  for (let i = 0; i < 3; i++) {
    const rx = REEL_START_X + i * REEL_SPACING - REEL_W / 2;

    // Reel Background (Pre-cached gradient)
    ctx.fillStyle = (machineRef && machineRef.reelGrads && machineRef.reelGrads[i]) ? machineRef.reelGrads[i] : '#e2e8f0';
    ctx.fillRect(rx, REEL_Y, REEL_W, REEL_H);

    // Reel Golden Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(rx, REEL_Y, REEL_W, REEL_H);

    // Symbols rendering
    const pos = state.reels[i] || 0;
    const normPos = ((pos % symCount) + symCount) % symCount;
    const baseIndex = Math.floor(normPos);
    const frac = normPos - baseIndex;

    ctx.font = '900 68px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.save();
    ctx.beginPath();
    ctx.rect(rx, REEL_Y, REEL_W, REEL_H);
    ctx.clip();

    for (let offset = -2; offset <= 2; offset++) {
      const symIdx = ((baseIndex - offset) % symCount + symCount) % symCount;
      const sy = REEL_Y + REEL_H / 2 + (offset + frac) * 85;
      
      const distFromCenter = Math.abs(sy - (REEL_Y + REEL_H / 2)) / (REEL_H / 2);
      ctx.globalAlpha = Math.max(0.25, 1.0 - distFromCenter * 0.65);
      
      ctx.fillText(symbols[symIdx], rx + REEL_W / 2, sy);
    }
    ctx.restore();

    // Top & Bottom 3D Cylindrical Shadow (Pre-cached)
    if (machineRef && machineRef.tShad && machineRef.bShad) {
      ctx.fillStyle = machineRef.tShad;
      ctx.fillRect(rx, REEL_Y, REEL_W, 45);
      ctx.fillStyle = machineRef.bShad;
      ctx.fillRect(rx, REEL_Y + REEL_H - 45, REEL_W, 45);
    }
  }

  // Center Payline Laser Beam
  ctx.strokeStyle = state.winner ? '#fde047' : '#ef4444';
  ctx.lineWidth = state.winner ? 6 : 4;
  ctx.beginPath();
  ctx.moveTo(25, REEL_Y + REEL_H / 2);
  ctx.lineTo(SLOT_W - 25, REEL_Y + REEL_H / 2);
  ctx.stroke();

  // Bottom Jackpots info
  ctx.font = 'bold 26px "Segoe UI", sans-serif';
  ctx.fillStyle = state.winner ? '#fde047' : '#cbd5e1';
  ctx.fillText(state.winner ? '⭐ ¡PREMIO GANADOR! ⭐' : 'JACKPOT x50  |  3 EN LÍNEA', 256, 452);
}

window.activeSpinningSlotsCount = 0;
window.dirtySlotsCount = 0;
window.slotTexUpdatesThisSec = 0;

function updateSlot3DScreens(dt) {
  // Ultra-fast O(1) early return: 0 CPU and 0 texture updates when all 30 machines are idle
  if (window.activeSpinningSlotsCount <= 0 && window.dirtySlotsCount <= 0) return;
  if (!window.slotMachinesByZone) return;

  const now = performance.now();

  for (const zoneId of ['slots', 'pachinko', 'tragaperras']) {
    const machines = window.slotMachinesByZone[zoneId];
    if (!machines) continue;

    for (let m = 0; m < machines.length; m++) {
      const item = machines[m];
      const st = item.state;

      if (st.spinning) {
        const elapsed = now - st.startTime;
        let allDone = true;

        for (let i = 0; i < 3; i++) {
          const stopTime = st.stopDelays[i];
          const startPos = st.startReels[i];
          const endPos = st.finalTargets[i];

          if (elapsed < stopTime) {
            allDone = false;
            const spinProgress = elapsed / stopTime;
            const easeSpin = Math.pow(spinProgress, 1.6);
            st.reels[i] = startPos + (endPos - startPos) * easeSpin;

            if (now - (st.lastTickTime[i] || 0) > 85) {
              st.lastTickTime[i] = now;
              playSound('tick');
            }
          } else {
            const settleElapsed = elapsed - stopTime;
            const settleDuration = 280;

            if (settleElapsed < settleDuration) {
              allDone = false;
              const sp = settleElapsed / settleDuration;
              const bounce = 1 + Math.sin(sp * Math.PI) * 0.12 * Math.exp(-sp * 3.5);
              st.reels[i] = endPos + (1 - bounce) * 0.45;
            } else {
              st.reels[i] = endPos;
              if (!st.stopped[i]) {
                st.stopped[i] = true;
                playSound('dice_clack', 0.85);
              }
            }
          }
        }

        draw3DSlotMachineScreen(item.ctx, st, item.theme, item.type, item);
        item.tex.needsUpdate = true;
        window.slotTexUpdatesThisSec++;

        if (allDone) {
          st.spinning = false;
          window.activeSpinningSlotsCount = Math.max(0, window.activeSpinningSlotsCount - 1);
          const wonAmount = roundMoney(st.bet * st.multiplier);

          if (st.multiplier > 0) {
            st.winner = true;
            state.balance = roundMoney(state.balance + wonAmount);
            updateBalanceUI();
            playSound('win');

            if (st.multiplier >= 15) {
              if (typeof spawnConfetti === 'function') spawnConfetti();
              addXP(250);
            } else {
              addXP(80);
            }

            if (st.statusEl) {
              st.statusEl.className = 'slot-payout-info-bar win';
              st.statusEl.textContent = `${st.winName} ¡Ganaste +$${wonAmount}! 💰`;
            }
            showToast(`${st.winName} +$${wonAmount}! 🎰`);
          } else {
            st.winner = false;
            playSound('lose');
            if (st.statusEl) {
              st.statusEl.className = 'slot-payout-info-bar';
              st.statusEl.textContent = '❌ Sin premio. ¡Prueba otra tirada!';
            }
            showToast('Tragaperras: Casi, ¡sigue intentándolo!');
          }

          draw3DSlotMachineScreen(item.ctx, st, item.theme, item.type, item);
          item.tex.needsUpdate = true;
          window.slotTexUpdatesThisSec++;
        }
      } else if (st.dirty) {
        st.dirty = false;
        window.dirtySlotsCount = Math.max(0, window.dirtySlotsCount - 1);
        draw3DSlotMachineScreen(item.ctx, st, item.theme, item.type, item);
        item.tex.needsUpdate = true;
        window.slotTexUpdatesThisSec++;
      }
    }
  }
}

function spinSlotMachine(gameType) {
  const isTraga = (gameType === 'tragaperras');
  const symbols = isTraga ? TRAGAPERRAS_SYMBOLS : SLOTS_SYMBOLS;
  const prefix = isTraga ? 'traga' : 'slots';
  const bet = isTraga ? (window.tragaBet || 10) : (window.slotsBet || 20);

  // Identificar la máquina física exacta donde está sentado el jugador
  const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === gameType && typeof state.player.currentSeat.seatIndex === 'number')
    ? state.player.currentSeat.seatIndex
    : 0;

  const machines = window.slotMachinesByZone[gameType] || [];
  const machine = machines[mySeatIdx] || machines[0];
  if (!machine) return;

  const st = machine.state;
  if (st.spinning) return;
  if (state.balance < bet) {
    showToast('⚠️ Saldo insuficiente para apostar');
    return;
  }

  state.balance = roundMoney(state.balance - bet);
  updateBalanceUI();
  playSound('coin_flip');

  st.spinning = true;
  window.activeSpinningSlotsCount++;
  st.winner = false;
  st.stopped = [false, false, false];

  // Animación suave de palanca mecánica 3D para la máquina individual
  if (machine.leverPivot) {
    const leverStart = performance.now();
    function animLever(now) {
      const lp = Math.min(1, (now - leverStart) / 380);
      if (lp < 0.45) {
        const p = lp / 0.45;
        machine.leverPivot.rotation.x = Math.sin(p * Math.PI * 0.5) * 0.75;
      } else {
        const p = (lp - 0.45) / 0.55;
        machine.leverPivot.rotation.x = (1 - p) * 0.75;
      }
      if (lp < 1) requestAnimationFrame(animLever);
      else machine.leverPivot.rotation.x = 0;
    }
    requestAnimationFrame(animLever);
  }

  const statusEl = document.getElementById(`${prefix}StatusText`);
  if (statusEl) {
    statusEl.className = 'slot-payout-info-bar';
    statusEl.textContent = isTraga ? '🍒 ¡Girando rodillos 3D de la suerte 777...!' : '🎰 ¡Rodillos neón 3D en movimiento...!';
  }

  const roll = Math.random();
  let targetSyms = [];
  let multiplier = 0;
  let winName = '';

  if (roll < 0.08) {
    const jackSym = symbols[0];
    targetSyms = [jackSym, jackSym, jackSym];
    multiplier = 50;
    winName = isTraga ? '⭐ ¡SUPER JACKPOT TRIPLE 7!' : '👑 ¡MEGA JACKPOT NEÓN x50!';
  } else if (roll < 0.22) {
    const pickSym = symbols[1 + Math.floor(Math.random() * (symbols.length - 1))];
    targetSyms = [pickSym, pickSym, pickSym];
    multiplier = (pickSym === '💎' || pickSym === '👑') ? 25 : ((pickSym === '🔔' || pickSym === '🔥') ? 15 : 8);
    winName = `🎉 ¡TRIPLE ${pickSym}! (x${multiplier})`;
  } else if (roll < 0.48) {
    const matchSym = symbols[1];
    let diffSym = symbols[Math.floor(Math.random() * symbols.length)];
    while (diffSym === matchSym) diffSym = symbols[Math.floor(Math.random() * symbols.length)];
    targetSyms = [matchSym, matchSym, diffSym];
    multiplier = 2;
    winName = `🍒 ¡Doble ${matchSym}! (x2)`;
  } else {
    const s0 = symbols[Math.floor(Math.random() * symbols.length)];
    let s1 = symbols[Math.floor(Math.random() * symbols.length)];
    while (s1 === s0) s1 = symbols[Math.floor(Math.random() * symbols.length)];
    let s2 = symbols[Math.floor(Math.random() * symbols.length)];
    while (s2 === s0 || s2 === s1) s2 = symbols[Math.floor(Math.random() * symbols.length)];
    targetSyms = [s0, s1, s2];
    multiplier = 0;
  }

  const symCount = symbols.length;
  const targetIndices = targetSyms.map(s => {
    const idx = symbols.indexOf(s);
    return idx >= 0 ? idx : 0;
  });

  const startTime = performance.now();
  const stopDelays = [1100, 1500, 1900];
  const totalRotations = [26, 36, 46];

  const startReelPositions = [...st.reels];
  const finalTargetPositions = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const currentPos = startReelPositions[i];
    const curNorm = ((currentPos % symCount) + symCount) % symCount;
    const neededAdvance = ((targetIndices[i] - curNorm) % symCount + symCount) % symCount;
    finalTargetPositions[i] = currentPos + totalRotations[i] * symCount + neededAdvance;
  }

  // Assign simulation state to be smoothly integrated in the render tick
  st.startTime = startTime;
  st.stopDelays = stopDelays;
  st.startReels = startReelPositions;
  st.finalTargets = finalTargetPositions;
  st.multiplier = multiplier;
  st.winName = winName;
  st.bet = bet;
  st.statusEl = statusEl;
}

// --- Explicit Global Window Bindings ---
window.draw3DSlotMachineScreen = draw3DSlotMachineScreen;
window.initMachineGradients = initMachineGradients;
if (typeof updateSlot3DScreens !== 'undefined') window.updateSlot3DScreens = updateSlot3DScreens;
if (typeof spinSlotMachine !== 'undefined') window.spinSlotMachine = spinSlotMachine;
