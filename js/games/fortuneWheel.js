/* ============================================================
   6. FORTUNE WHEEL 3D ENGINE (PREMEDITATED TIMED CASINO LANDING)
   ============================================================ */
const wSlices = [
  '50X',  // idx 0 - JACKPOT
  '0.5X', // idx 1
  '20X',  // idx 2 - EPIC
  '1.5X', // idx 3
  '3X',   // idx 4
  '0X',   // idx 5 - MISS
  '10X',  // idx 6 - SUPER
  '5X',   // idx 7 - BIG
  '0.5X', // idx 8
  '2X',   // idx 9 - DOUBLE
  '1.5X', // idx 10
  '0X'    // idx 11 - MISS
];

// Weighted casino distribution
const WHEEL_ODDS_WEIGHTS = [
  { idx: 0, w: 1 },   // 50X Jackpot
  { idx: 1, w: 18 },  // 0.5X
  { idx: 2, w: 2 },   // 20X Epic
  { idx: 3, w: 15 },  // 1.5X
  { idx: 4, w: 8 },   // 3X
  { idx: 5, w: 12 },  // 0X Miss
  { idx: 6, w: 4 },   // 10X Super
  { idx: 7, w: 6 },   // 5X Big
  { idx: 8, w: 18 },  // 0.5X
  { idx: 9, w: 10 },  // 2X Double
  { idx: 10, w: 15 }, // 1.5X
  { idx: 11, w: 12 }  // 0X Miss
];

function pickWeightedSliceIndex() {
  const totalWeight = WHEEL_ODDS_WEIGHTS.reduce((acc, item) => acc + item.w, 0);
  let rnd = Math.random() * totalWeight;
  for (let i = 0; i < WHEEL_ODDS_WEIGHTS.length; i++) {
    if (rnd < WHEEL_ODDS_WEIGHTS[i].w) return WHEEL_ODDS_WEIGHTS[i].idx;
    rnd -= WHEEL_ODDS_WEIGHTS[i].w;
  }
  return Math.floor(Math.random() * wSlices.length);
}

let wSpinning = false;
window.wSpinning = false;
window.wheelBet = 50;
window.wheelResultLocked = false;
let remoteWheelSpinActive = false;

function spinFortuneWheel() {
  if (wSpinning) return;
  const bet = (typeof window.wheelBet === 'number' && window.wheelBet > 0) ? window.wheelBet : 50;
  if (state.balance < bet) {
    showToast(`⚠️ Saldo insuficiente para apostar ($${bet} necesarios)`);
    return;
  }

  // Deduct balance
  state.balance = roundMoney(state.balance - bet);
  updateBalanceUI();
  wSpinning = true;
  window.wSpinning = true;
  window.wheelResultLocked = true;
  remoteWheelSpinActive = false;
  playSound('coin_flip');

  // 1. Premeditated Outcome Determination
  const winIdx = pickWeightedSliceIndex();
  const multStr = wSlices[winIdx].replace('X', '');
  const mult = parseFloat(multStr);
  const win = roundMoney(bet * mult);

  // Broadcast individual spin to multiplayer server with premeditated target
  if (typeof socket !== 'undefined' && socket && socket.connected) {
    const mySeat = (state.player && state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : null;
    socket.emit('fortuneWheelSpin', {
      bet: bet,
      winIdx: winIdx,
      mult: wSlices[winIdx],
      seatIndex: mySeat,
      playerName: (state.player && state.player.name) ? state.player.name : 'Jugador'
    });
  }

  const readyBtn = document.getElementById('wheelReadyBtn') || document.getElementById('wheelSpinBtn');
  if (readyBtn) {
    readyBtn.disabled = true;
    readyBtn.style.opacity = '0.6';
    readyBtn.textContent = 'GIRANDO... 🎡';
  }

  // 2. Exact Slice Centerline Target Calculation (11*PI/12 - winIdx*step)
  const numSlices = wSlices.length;
  const step = (Math.PI * 2) / numSlices;
  const targetPocketAngle = (winIdx + 3.5) * step; // Shifted +0.5 step (15°) dead center into winning slice

  const rotor = (window.wheel3DRefs && window.wheel3DRefs.rotor) ? window.wheel3DRefs.rotor : null;
  const clapper = (window.wheel3DRefs && window.wheel3DRefs.clapper) ? window.wheel3DRefs.clapper : null;

  const startRot = rotor ? rotor.rotation.y : 0;
  const TWO_PI = Math.PI * 2;

  // 3. Smooth, Continuous High-Speed to Decel Physics (Zero Angle Discontinuity)
  const fullTurns = 7.0 * TWO_PI; // 7 full dramatic fast revolutions
  const normalizedTarget = ((targetPocketAngle % TWO_PI) + TWO_PI) % TWO_PI;
  const normalizedStart = ((startRot % TWO_PI) + TWO_PI) % TWO_PI;
  let diff = normalizedTarget - normalizedStart;
  while (diff < 0.25 * Math.PI) diff += TWO_PI;

  const finalTargetRot = startRot + fullTurns + diff;

  const DURATION = 6000; // 6.0s total continuous spin
  const startTime = performance.now();
  let lastClapperTick = -1;

  function stepWheel(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1.0, elapsed / DURATION);

    // Quintic ease-out curve: starts at high velocity and decelerates with true mechanical friction
    const ease = 1 - Math.pow(1 - progress, 5);
    const currentRot = startRot + (finalTargetRot - startRot) * ease;
    const currentSpeed = (finalTargetRot - startRot) * (5 * Math.pow(1 - progress, 4)) / (DURATION / 1000);

    if (rotor) {
      rotor.rotation.y = currentRot;
    }

    // Dynamic clapper pointer deflection & sound
    if (clapper) {
      const clapperDeflect = (currentSpeed > 0.4) ? (Math.sin(currentRot * 12) * Math.min(0.22, currentSpeed * 0.03)) : 0;
      clapper.rotation.y = clapperDeflect;
    }

    const pegIdx = Math.floor((currentRot + step * 0.5) / step);
    if (pegIdx !== lastClapperTick && currentSpeed > 0.15) {
      lastClapperTick = pegIdx;
      playSound('tick', Math.min(0.35, Math.max(0.08, currentSpeed * 0.035)));
    }

    if (progress < 1.0) {
      requestAnimationFrame(stepWheel);
    } else {
      wSpinning = false;
      window.wSpinning = false;
      window.wheelResultLocked = true;
      if (rotor) rotor.rotation.y = finalTargetRot; // 100% exact alignment on slice center
      if (clapper) clapper.rotation.y = 0;

      if (readyBtn) {
        readyBtn.disabled = false;
        readyBtn.style.opacity = '1';
        readyBtn.textContent = '¡ESTOY LISTO! 🎡';
      }

      if (win > 0) {
        state.balance = roundMoney(state.balance + win);
        updateBalanceUI();
        playSound('win');
        if (typeof spawnConfetti === 'function') spawnConfetti();
        addXP(mult >= 10 ? 300 : 100);
        showToast(`🎉 ¡La flecha 3D marca ${wSlices[winIdx]}! Ganaste +$${win} (x${mult})`);
      } else {
        playSound('lose');
        showToast(`❌ La flecha 3D marca ${wSlices[winIdx]} (Sin premio)`);
      }

      // Broadcast result
      if (typeof socket !== 'undefined' && socket && socket.connected) {
        socket.emit('fortuneWheelResult', {
          bet: bet,
          win: win,
          winIdx: winIdx,
          mult: wSlices[winIdx],
          playerName: (state.player && state.player.name) ? state.player.name : 'Jugador'
        });
      }
    }
  }

  requestAnimationFrame(stepWheel);
}

function handleRemoteWheelSpin(data) {
  if (!data) return;
  const pName = data.playerName || 'Otro jugador';
  const betVal = (typeof data.bet === 'number') ? data.bet : 50;
  const winIdx = (typeof data.winIdx === 'number') ? data.winIdx : pickWeightedSliceIndex();
  showToast(`🎡 ${pName} ha lanzado su tirada individual en la Ruleta ($${betVal})`);

  // Animate 3D wheel for spectator if not currently spinning locally
  if (!wSpinning && window.wheel3DRefs && window.wheel3DRefs.rotor) {
    remoteWheelSpinActive = true;
    window.wheelResultLocked = true;
    const rotor = window.wheel3DRefs.rotor;
    const clapper = window.wheel3DRefs.clapper;

    const numSlices = wSlices.length;
    const step = (Math.PI * 2) / numSlices;
    const targetPocketAngle = (winIdx + 3.5) * step; // Shifted +0.5 step (15°) dead center into winning slice

    const startRot = rotor.rotation.y;
    const TWO_PI = Math.PI * 2;

    const fullTurns = 6.0 * TWO_PI;
    const normalizedTarget = ((targetPocketAngle % TWO_PI) + TWO_PI) % TWO_PI;
    const normalizedStart = ((startRot % TWO_PI) + TWO_PI) % TWO_PI;
    let diff = normalizedTarget - normalizedStart;
    while (diff < 0.25 * Math.PI) diff += TWO_PI;

    const finalTargetRot = startRot + fullTurns + diff;

    const DURATION = 5800;
    const startTime = performance.now();
    let lastClapperTick = -1;

    function stepRemoteWheel(now) {
      if (wSpinning) { remoteWheelSpinActive = false; return; }
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / DURATION);
      const ease = 1 - Math.pow(1 - progress, 5);
      const currentRot = startRot + (finalTargetRot - startRot) * ease;
      const currentSpeed = (finalTargetRot - startRot) * (5 * Math.pow(1 - progress, 4)) / (DURATION / 1000);

      rotor.rotation.y = currentRot;

      if (clapper) {
        clapper.rotation.y = (currentSpeed > 0.4) ? (Math.sin(currentRot * 12) * Math.min(0.22, currentSpeed * 0.03)) : 0;
      }

      const pegIdx = Math.floor((currentRot + step * 0.5) / step);
      if (pegIdx !== lastClapperTick && currentSpeed > 0.15) {
        lastClapperTick = pegIdx;
        if (state.mode === 'wheel') playSound('tick', Math.min(0.25, currentSpeed * 0.03));
      }

      if (progress < 1.0 && remoteWheelSpinActive) {
        requestAnimationFrame(stepRemoteWheel);
      } else {
        remoteWheelSpinActive = false;
        rotor.rotation.y = finalTargetRot;
        if (clapper) clapper.rotation.y = 0;
      }
    }
    requestAnimationFrame(stepRemoteWheel);
  }
}

function handleRemoteWheelResult(data) {
  if (!data) return;
  const pName = data.playerName || 'Otro jugador';
  if (data.win > 0) {
    showToast(`🎉 ¡${pName} ganó $${data.win} en la Ruleta de la Fortuna (${data.mult})!`);
  } else {
    showToast(`🎲 ${pName} obtuvo ${data.mult} en la Ruleta`);
  }
}

// Bind 2D Action Button
document.addEventListener('DOMContentLoaded', () => {
  const readyBtn = document.getElementById('wheelReadyBtn') || document.getElementById('wheelSpinBtn');
  if (readyBtn) {
    readyBtn.addEventListener('click', spinFortuneWheel);
  }
});

const readyBtnNow = document.getElementById('wheelReadyBtn') || document.getElementById('wheelSpinBtn');
if (readyBtnNow) {
  readyBtnNow.addEventListener('click', spinFortuneWheel);
}

window.spinFortuneWheel = spinFortuneWheel;
window.handleRemoteWheelSpin = handleRemoteWheelSpin;
window.handleRemoteWheelResult = handleRemoteWheelResult;
if (typeof wheelState !== 'undefined') window.wheelState = wheelState;
if (typeof wheel3DRefs !== 'undefined') window.wheel3DRefs = wheel3DRefs;