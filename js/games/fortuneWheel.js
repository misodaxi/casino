/* ============================================================
   6. FORTUNE WHEEL 3D ENGINE (INDIVIDUAL MULTIPLAYER)
   ============================================================ */
const wSlices = ['50X', '0.5X', '20X', '1.5X', '3X', '0X', '10X', '5X', '0.5X', '2X', '1.5X', '0X'];

let wSpinning = false;
window.wSpinning = false;
window.wheelBet = 50;
let remoteWheelSpinActive = false;

function spinFortuneWheel() {
  if (wSpinning) return;
  const bet = (typeof window.wheelBet === 'number' && window.wheelBet > 0) ? window.wheelBet : 50;
  if (state.balance < bet) {
    showToast(`⚠️ Saldo insuficiente para apostar ($${bet} necesarios)`);
    return;
  }

  state.balance = roundMoney(state.balance - bet);
  updateBalanceUI();
  wSpinning = true;
  window.wSpinning = true;
  remoteWheelSpinActive = false; // Local spin overrides any remote animation
  playSound('coin_flip');

  // Broadcast individual spin to multiplayer server
  if (typeof socket !== 'undefined' && socket && socket.connected) {
    const mySeat = (state.player && state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : null;
    socket.emit('fortuneWheelSpin', {
      bet: bet,
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

  let currAngle = 0;
  let speed = 0.45 + Math.random() * 0.35;
  let lastPegIndex = -1;
  let lastFrameTime = performance.now();
  const step = (Math.PI * 2) / wSlices.length;

  function stepWheel(now) {
    const dtMs = Math.min(now - lastFrameTime, 50);
    lastFrameTime = now;
    const speedScale = dtMs / 16.667;

    currAngle += speed * speedScale;
    speed *= Math.pow(0.984, speedScale);

    // Trigger tick sound when a peg crosses the indicator
    const pegIndex = Math.floor((currAngle + step * 0.5) / step);
    if (pegIndex !== lastPegIndex) {
      lastPegIndex = pegIndex;
      playSound('tick', 0.25);
    }

    // Sincronización en tiempo real con el rotor 3D horizontal y el clapper
    if (window.wheel3DRefs && window.wheel3DRefs.rotor) {
      window.wheel3DRefs.rotor.rotation.y = -currAngle;
      if (window.wheel3DRefs.clapper) {
        const clapperDeflect = (speed > 0.02) ? (Math.sin(currAngle * wSlices.length) * 0.25) : 0;
        window.wheel3DRefs.clapper.rotation.y = clapperDeflect;
      }
    }

    if (speed >= 0.005) {
      requestAnimationFrame(stepWheel);
    } else {
      wSpinning = false;
      window.wSpinning = false;
      if (window.wheel3DRefs && window.wheel3DRefs.clapper) {
        window.wheel3DRefs.clapper.rotation.y = 0;
      }

      if (readyBtn) {
        readyBtn.disabled = false;
        readyBtn.style.opacity = '1';
        readyBtn.textContent = '¡ESTOY LISTO! 🎡';
      }

      const finalIndex = Math.floor(((Math.PI * 2 - (currAngle % (Math.PI * 2))) / (Math.PI * 2)) * wSlices.length) % wSlices.length;
      const multStr = wSlices[finalIndex].replace('X', '');
      const mult = parseFloat(multStr);
      const win = roundMoney(bet * mult);

      if (win > 0) {
        state.balance = roundMoney(state.balance + win);
        updateBalanceUI();
        playSound('win');
        if (typeof spawnConfetti === 'function') spawnConfetti();
        addXP(mult >= 10 ? 300 : 100);
        showToast(`🎉 ¡Premio ${wSlices[finalIndex]} en la Ruleta! +$${win} (x${mult})`);
      } else {
        playSound('lose');
        showToast(`❌ Ruleta de la Fortuna: ${wSlices[finalIndex]} (Sin premio)`);
      }

      // Broadcast result to multiplayer server
      if (typeof socket !== 'undefined' && socket && socket.connected) {
        socket.emit('fortuneWheelResult', {
          bet: bet,
          win: win,
          mult: wSlices[finalIndex],
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
  showToast(`🎡 ${pName} ha lanzado su tirada individual en la Ruleta ($${betVal})`);

  // Animate 3D wheel for spectator if not currently spinning locally
  if (!wSpinning && window.wheel3DRefs && window.wheel3DRefs.rotor) {
    remoteWheelSpinActive = true;
    let rAngle = 0;
    let rSpeed = 0.42 + Math.random() * 0.25;
    let rLastFrame = performance.now();
    let rLastPeg = -1;
    const step = (Math.PI * 2) / wSlices.length;

    function stepRemoteWheel(now) {
      if (wSpinning) { remoteWheelSpinActive = false; return; }
      const dtMs = Math.min(now - rLastFrame, 50);
      rLastFrame = now;
      const scale = dtMs / 16.667;
      rAngle += rSpeed * scale;
      rSpeed *= Math.pow(0.984, scale);

      const pegIndex = Math.floor((rAngle + step * 0.5) / step);
      if (pegIndex !== rLastPeg) {
        rLastPeg = pegIndex;
        if (state.mode === 'wheel') playSound('tick', 0.15);
      }

      if (window.wheel3DRefs && window.wheel3DRefs.rotor) {
        window.wheel3DRefs.rotor.rotation.y = -rAngle;
        if (window.wheel3DRefs.clapper) {
          window.wheel3DRefs.clapper.rotation.y = (rSpeed > 0.02) ? (Math.sin(rAngle * wSlices.length) * 0.20) : 0;
        }
      }

      if (rSpeed >= 0.005 && remoteWheelSpinActive) {
        requestAnimationFrame(stepRemoteWheel);
      } else {
        remoteWheelSpinActive = false;
        if (window.wheel3DRefs && window.wheel3DRefs.clapper) {
          window.wheel3DRefs.clapper.rotation.y = 0;
        }
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