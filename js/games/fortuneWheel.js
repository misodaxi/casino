/* ============================================================
   6. FORTUNE WHEEL LOGIC
============================================================ */
const wCanvas = document.getElementById('wheelCanvas');
const wCtx = wCanvas ? wCanvas.getContext('2d') : null;
const wSlices = ['0X', '1.5X', '2X', '0.5X', '5X', '10X', '0X', '3X', '1.5X', '20X', '0.5X', '50X'];
const wColors = ['#ef4444', '#8B5CF6', '#22c55e', '#38bdf8', '#E11FD1', '#FBBF24', '#ef4444', '#8B5CF6', '#22c55e', '#E11FD1', '#38bdf8', '#FFD700'];

function drawWheel(angle = 0) {
  if (!wCtx) return;
  wCtx.clearRect(0, 0, 380, 380);
  const rad = 180, cx = 190, cy = 190;
  const step = (Math.PI * 2) / wSlices.length;

  wSlices.forEach((lbl, i) => {
    wCtx.beginPath(); wCtx.moveTo(cx, cy);
    wCtx.arc(cx, cy, rad, angle + i * step, angle + (i + 1) * step);
    wCtx.fillStyle = wColors[i]; wCtx.fill();
    wCtx.stroke();

    wCtx.save(); wCtx.translate(cx, cy); wCtx.rotate(angle + (i + 0.5) * step);
    wCtx.fillStyle = '#fff'; wCtx.font = '900 16px sans-serif'; wCtx.textAlign = 'right';
    wCtx.fillText(lbl, rad - 15, 6);
    wCtx.restore();
  });
}
if (wCanvas) drawWheel();

let wSpinning = false;
const wSpinBtn = document.getElementById('wheelSpinBtn');
if (wSpinBtn) {
  wSpinBtn.addEventListener('click', () => {
    if (wSpinning) return;
    if (state.balance < 50) { showToast('Saldo insuficiente'); return; }
    state.balance -= 50; updateBalanceUI();
    wSpinning = true;

    let currAngle = 0, speed = 0.4 + Math.random() * 0.3;
    let lastPegIndex = -1;
    let lastFrameTime = performance.now();
    const step = (Math.PI * 2) / wSlices.length;

    function stepWheel(now) {
      const dtMs = Math.min(now - lastFrameTime, 50);
      lastFrameTime = now;
      const speedScale = dtMs / 16.667;

      currAngle += speed * speedScale;
      speed *= Math.pow(0.985, speedScale);

      // Trigger tick sound only when a peg is crossed
      const pegIndex = Math.floor((currAngle + step * 0.5) / step);
      if (pegIndex !== lastPegIndex) {
        lastPegIndex = pegIndex;
        playSound('tick');
      }

      drawWheel(currAngle);

      if (speed >= 0.005) {
        requestAnimationFrame(stepWheel);
      } else {
        wSpinning = false;
        const finalIndex = Math.floor(((Math.PI * 2 - (currAngle % (Math.PI * 2))) / (Math.PI * 2)) * wSlices.length) % wSlices.length;
        const multStr = wSlices[finalIndex].replace('X', '');
        const mult = parseFloat(multStr);
        const win = Math.floor(50 * mult);
        state.balance += win; updateBalanceUI();

        const banner = document.getElementById('wheelResultBanner');
        const titleEl = document.getElementById('wheelResultTitle');
        if (titleEl) titleEl.textContent = wSlices[finalIndex];
        const msg = document.getElementById('wheelResultMsg');
        if (msg) {
          if (win > 0) { msg.className = 'win'; msg.textContent = '+$' + win; if (typeof triggerConfetti === 'function') triggerConfetti(); addXP(100); }
          else { msg.className = 'lose'; msg.textContent = '-$50'; playSound('lose'); }
        }
        if (banner) banner.classList.add('show');
      }
    }

    requestAnimationFrame(stepWheel);
  });
}

// --- Explicit Global Window Bindings ---
if (typeof wheelState !== 'undefined') window.wheelState = wheelState;
if (typeof wheel3DRefs !== 'undefined') window.wheel3DRefs = wheel3DRefs;
