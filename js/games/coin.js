/* ============================================================
   7. COIN FLIP 3D LOGIC & AUTHORITATIVE MULTIPLAYER ENGINE
============================================================ */
var coinState = {
  bet: 50,
  selectedChip: 50,
  duelMode: false
};

var coinChoice = 'cara';
var coinServerState = null;
var isCoinReady = false;
var lastHandledCoinFlipId = -1;

document.querySelectorAll('.choice-btn').forEach(b => {
  b.addEventListener('click', () => {
    if (coinState.duelMode) {
      showToast('ℹ️ En Modo 1v1, el Asiento Izquierdo (J1) es 👑 CARA y el Asiento Derecho (J2) es ⚡ CRUZ');
      return;
    }
    document.querySelectorAll('.choice-btn').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    coinChoice = b.dataset.choice;
    playSound('chip');
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

  const rAmt = Math.max(0, (typeof rivalBet === 'number') ? rivalBet : (pAmt || 50));
  if (rAmt > 0) {
    const stackR = create3DChipStackMesh(rAmt, 0.075, 0.018);
    stackR.position.set(rivalX, posY, posZ);
    group.add(stackR);
  }
}

function updateCoinTableUI(s) {
  if (!s) return;
  coinServerState = s;
  window.coinServerState = s;

  const statusBox = document.getElementById('coinDuelStatusBox');
  const statusMsg = document.getElementById('coinDuelStatusMsg');
  const potMsg = document.getElementById('coinDuelPotMsg');
  const flipBtn = document.getElementById('coinFlipBtn');
  const readyBtn = document.getElementById('coinReadyBtn');
  const display = document.getElementById('coinBetDisplay');

  if (display) display.textContent = formatMoney(coinState.bet || 0);

  const totalP = (typeof s.totalPlayers === 'number') ? s.totalPlayers : (s.players ? Object.keys(s.players).length : 0);
  const totalR = (typeof s.totalReady === 'number') ? s.totalReady : (s.readyPlayers ? Object.keys(s.readyPlayers).length : 0);

  const myId = (typeof socket !== 'undefined' && socket) ? socket.id : null;
  isCoinReady = !!(myId && s.readyPlayers && s.readyPlayers[myId]);

  const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
    ? state.player.currentSeat.seatIndex
    : 0;

  if (totalP >= 2) {
    // MODO 1V1 VERSUS AUTOMÁTICO (2 JUGADORES EN LA MESA)
    coinState.duelMode = true;
    const myChoice = (mySeatIdx === 0) ? 'cara' : 'cruz';
    coinChoice = myChoice;

    document.querySelectorAll('.choice-btn').forEach(btn => {
      const isMyChoice = (btn.dataset.choice === myChoice);
      btn.classList.toggle('selected', isMyChoice);
      btn.style.opacity = isMyChoice ? '1' : '0.45';
    });

    const potAmt = (typeof s.pot === 'number' && s.pot > 0) ? s.pot : ((s.finalBet || 50) * 2);
    if (potMsg) {
      potMsg.textContent = `⚔️ POT TOTAL: ${formatMoney(potAmt)} · J1 (👑 CARA) vs J2 (⚡ CRUZ)`;
    }
    if (statusMsg) {
      statusMsg.textContent = s.statusMsg || `👥 2 en Mesa · ⏳ ${totalR}/2 Listos`;
    }

    if (flipBtn) flipBtn.style.display = 'none';
    if (readyBtn) {
      readyBtn.style.display = 'inline-block';
      if (s.status === 'FLIPPING') {
        readyBtn.disabled = true;
        readyBtn.style.opacity = '0.6';
        readyBtn.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
        readyBtn.textContent = 'LANZANDO MONEDA... 🪙';
      } else if (isCoinReady) {
        readyBtn.disabled = false;
        readyBtn.style.opacity = '1';
        readyBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        readyBtn.textContent = 'CANCELAR LISTO ❌';
      } else {
        readyBtn.disabled = false;
        readyBtn.style.opacity = '1';
        readyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        readyBtn.textContent = `LISTO ($${coinState.bet || 50}) 👍`;
      }
    }

    update3DCoinChips(s.finalBet || coinState.bet || 50, s.finalBet || coinState.bet || 50);
  } else {
    // MODO SOLO CONTRA LA BANCA (1 JUGADOR SENTADO)
    coinState.duelMode = false;
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.style.opacity = '1';
    });

    if (potMsg) {
      potMsg.textContent = `POT POTENCIAL: ${formatMoney((coinState.bet || 50) * 2)} (PAGA 2 A 1)`;
    }
    if (statusMsg) {
      statusMsg.innerHTML = `🪙 Apuesta: <b>${formatMoney(coinState.bet || 50)}</b> · Modo Solo vs La Banca`;
    }

    if (readyBtn) readyBtn.style.display = 'none';
    if (flipBtn) {
      flipBtn.style.display = 'inline-block';
      flipBtn.disabled = false;
      flipBtn.style.opacity = '1';
      flipBtn.textContent = 'LANZAR MONEDA 🪙';
    }

    update3DCoinChips(coinState.bet || 50, coinState.bet || 50);
  }
}

function clearCoinBet() {
  if (activeCoinRoll && !activeCoinRoll.settled) return;
  coinState.bet = 0;
  if (coinServerState) {
    updateCoinTableUI(coinServerState);
  } else {
    const display = document.getElementById('coinBetDisplay');
    if (display) display.textContent = '$0';
    update3DCoinChips(0, 0);
  }
  showToast('Apuesta reiniciada. Selecciona una ficha y pulsa en tu círculo.');
}
window.clearCoinBet = clearCoinBet;

/* ============================================================
   ADVANCED HIGH-LAUNCH 3D COIN PHYSICS (EXTRA BOUNCY & NON-CLIPPING)
============================================================ */
const COIN_RADIUS = 0.48;
const COIN_HALF_H = 0.040;
const COIN_FLOOR_Y = 0.840;
const BASIN_BOUND_R = 1.15;

let activeCoinRoll = null;

function spawnPhysicsCoin(targetFace, customSeed, versusData) {
  const mesh = makeCoinMesh(COIN_RADIUS, COIN_HALF_H * 2);
  mesh.position.set(0, 1.80, 0);
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

  let vy = 11.2 + Math.random() * 1.5;
  let vx = (Math.random() - 0.5) * 0.35;
  let vz = (Math.random() - 0.5) * 0.35;
  let angSpeed = 34 + Math.random() * 10;
  let tiltAngle = Math.random() * Math.PI * 2;

  if (customSeed) {
    if (typeof customSeed.velY === 'number') vy = customSeed.velY;
    if (typeof customSeed.vx === 'number') vx = customSeed.vx;
    if (typeof customSeed.vz === 'number') vz = customSeed.vz;
    if (typeof customSeed.angSpeed === 'number') angSpeed = customSeed.angSpeed;
    if (typeof customSeed.tiltAngle === 'number') tiltAngle = customSeed.tiltAngle;
  }

  const tiltAxis = new THREE.Vector3(Math.cos(tiltAngle), 0.30 * (Math.random() - 0.5), Math.sin(tiltAngle)).normalize();
  coin3DRefs.launchGroup.add(mesh);
  playSound('coin_flip');

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
  window.isCoinPhysicsActive = true;
}

window.isCoinPhysicsActive = false;

const _coinTempAxis = new THREE.Vector3();
const _coinTempDq = new THREE.Quaternion();
const _coinTempUpWorld = new THREE.Vector3();
const _coinUnitY = new THREE.Vector3(0, 1, 0);

function updateCoinPhysics(dt) {
  if (!window.isCoinPhysicsActive) return;
  if (!coin3DRefs || !activeCoinRoll) return;
  const d = activeCoinRoll;

  // Si ya se asentó, realizar la transición suave a posición plana y resolver
  if (d.settled) {
    if (d.snapT >= 0 && d.snapT < 1) {
      d.snapT = Math.min(1, d.snapT + dt * 4.5);
      d.mesh.quaternion.slerpQuaternions(d.snapFrom, d.snapTo, d.snapT);
      d.mesh.position.y = COIN_FLOOR_Y + COIN_HALF_H + 0.001;
    }
    if (d.snapT >= 1) {
      // Completamente plano y asentado
      d.mesh.quaternion.copy(d.snapTo);
      d.mesh.position.y = COIN_FLOOR_Y + COIN_HALF_H + 0.001;
      window.isCoinPhysicsActive = false; // Desactivar física solo cuando ya esté 100% plano
    }
    if (!d.resolved) {
      d.resolved = true;
      resolveCoinFlip3D(d.face, d.versusData);
    }
    return;
  }

  const subSteps = 8;
  const subDt = Math.min(0.04, dt) / subSteps;
  const gravity = -26.0;
  const restitution = 0.52;
  const friction = 0.92;
  const basinRadius = BASIN_BOUND_R - COIN_RADIUS * 0.40; // 1.15 - 0.192 = 0.958

  for (let step = 0; step < subSteps; step++) {
    d.vel.y += gravity * subDt;
    d.mesh.position.addScaledVector(d.vel, subDt);

    const angLen = d.angVel.length();
    if (angLen > 0.001) {
      _coinTempAxis.copy(d.angVel).normalize();
      _coinTempDq.setFromAxisAngle(_coinTempAxis, angLen * subDt);
      d.mesh.quaternion.premultiply(_coinTempDq);
    }

    // Colisión elástica contra el borde del plato
    const horizDist = Math.hypot(d.mesh.position.x, d.mesh.position.z);
    if (horizDist > basinRadius) {
      const nx = d.mesh.position.x / horizDist;
      const nz = d.mesh.position.z / horizDist;
      d.mesh.position.x = nx * basinRadius;
      d.mesh.position.z = nz * basinRadius;

      const vNormal = d.vel.x * nx + d.vel.z * nz;
      if (vNormal > 0) {
        d.vel.x -= (1 + 0.55) * vNormal * nx;
        d.vel.z -= (1 + 0.55) * vNormal * nz;
        d.vel.y += 0.35;
        d.angVel.x += (Math.random() - 0.5) * 6.0;
        d.angVel.z += (Math.random() - 0.5) * 6.0;
        playSound('coin_land', 0.5);
      }
    }

    // Cálculo dinámico de altura mínima según ángulo de inclinación
    _coinTempUpWorld.copy(_coinUnitY).applyQuaternion(d.mesh.quaternion);
    const tiltDot = Math.abs(_coinTempUpWorld.dot(_coinUnitY));
    const effectiveRadius = COIN_HALF_H + (1.0 - tiltDot) * (COIN_RADIUS - COIN_HALF_H);
    const floorY = COIN_FLOOR_Y + effectiveRadius;

    if (d.mesh.position.y <= floorY) {
      d.mesh.position.y = floorY;

      if (d.vel.y < 0) {
        d.bounces++;
        const imp = Math.abs(d.vel.y);
        d.vel.y = -d.vel.y * restitution;
        d.vel.x *= friction;
        d.vel.z *= friction;
        d.angVel.multiplyScalar(0.70);

        if (imp > 0.35) {
          playSound('coin_land', Math.min(1.0, imp / 4.0));
        }

        if (imp < 0.55 && d.bounces >= 3) {
          d.groundedTimer += subDt;
        } else {
          d.groundedTimer = 0;
        }

        // Condición de parada definitiva
        if (d.groundedTimer > 0.16 || (d.bounces > 7 && Math.hypot(d.vel.x, d.vel.y, d.vel.z) < 0.40)) {
          d.settled = true;
          d.vel.set(0, 0, 0);
          d.angVel.set(0, 0, 0);

          let chosenFace = d.targetFace;
          if (!chosenFace) {
            _coinTempUpWorld.copy(_coinUnitY).applyQuaternion(d.mesh.quaternion);
            chosenFace = (_coinTempUpWorld.y >= 0) ? 'cara' : 'cruz';
          }
          d.face = chosenFace;

          d.snapFrom = d.mesh.quaternion.clone();
          const targetQ = new THREE.Quaternion();
          if (chosenFace === 'cara') {
            targetQ.set(0, 0, 0, 1);
          } else {
            targetQ.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
          }
          d.snapTo = targetQ;
          d.snapT = 0;
          break;
        }
      }
    }
  }
}

function resolveCoinFlip3D(result, versusData) {
  const banner = document.getElementById('coinResultBanner');
  const title = document.getElementById('coinResultTitle');
  const msg = document.getElementById('coinResultMsg');

  title.textContent = `¡SALIÓ ${result.toUpperCase()}! 🪙`;

  const isRealDuel = coinState.duelMode;
  const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
    ? state.player.currentSeat.seatIndex
    : 0;

  if (isRealDuel) {
    const isWinner = (versusData && versusData.winnerId)
      ? (typeof socket !== 'undefined' && socket && socket.id === versusData.winnerId)
      : ((mySeatIdx === 0 && result === 'cara') || (mySeatIdx === 1 && result === 'cruz'));
    const curBet = coinState.bet || 50;
    const totalPot = roundMoney(curBet * 2);

    if (isWinner) {
      msg.className = 'win';
      msg.textContent = `¡GANASTE EL DUELO! +${formatMoney(totalPot)}`;
      triggerConfetti();
      addXP(150);
      playSound('win');
    } else {
      msg.className = 'lose';
      msg.textContent = `PERDISTE EL DUELO (-${formatMoney(curBet)})`;
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

  banner.classList.add('show');
  if (coinServerState) {
    updateCoinTableUI(coinServerState);
  }
}

function handleRemoteCoinFlip(data) {
  if (!data || !data.flipId) return;
  if (lastHandledCoinFlipId === data.flipId) return;
  lastHandledCoinFlipId = data.flipId;

  playSound('coin_flip');
  const banner = document.getElementById('coinResultBanner');
  if (banner) banner.classList.remove('show');

  const statusMsg = document.getElementById('coinDuelStatusMsg');
  if (statusMsg) statusMsg.innerHTML = '🪙 ¡LANZANDO MONEDA AL AIRE...! ¡MIRA LA MESA!';

  rollCoinFlip3D(data.outcome, null, data);
}

function handleRemoteCoinResult(data) {
  if (!data) return;
  const myId = (typeof socket !== 'undefined' && socket) ? socket.id : null;
  if (data.winnerId === myId) {
    state.balance = roundMoney(state.balance + data.finalBet);
    if (typeof updateBalanceUI === 'function') updateBalanceUI();
  } else if (data.winnerId && data.winnerId !== 'house' && (data.player1 && data.player1.id === myId || data.player2 && data.player2.id === myId)) {
    state.balance = roundMoney(state.balance - data.finalBet);
    if (typeof updateBalanceUI === 'function') updateBalanceUI();
  } else if (data.isSolo && data.winnerId === 'house') {
    state.balance = roundMoney(state.balance - data.finalBet);
    if (typeof updateBalanceUI === 'function') updateBalanceUI();
  }
}

var coinReadyBtnEl = document.getElementById('coinReadyBtn');
if (coinReadyBtnEl) {
  coinReadyBtnEl.addEventListener('click', () => {
    if (activeCoinRoll && !activeCoinRoll.settled) return;
    const curBet = (typeof coinState.bet === 'number' && coinState.bet > 0) ? coinState.bet : 50;
    if (state.balance < curBet) { showToast('Saldo insuficiente'); return; }

    if (typeof socket !== 'undefined' && socket && socket.connected) {
      playSound('chip');
      if (isCoinReady) {
        socket.emit('coinUnready', { coinId: 'coin' });
      } else {
        socket.emit('coinReady', { coinId: 'coin', bet: curBet, balance: state.balance });
      }
    }
  });
}

var coinFlipBtnEl = document.getElementById('coinFlipBtn');
if (coinFlipBtnEl) {
  coinFlipBtnEl.addEventListener('click', () => {
    if (activeCoinRoll && !activeCoinRoll.settled) return;
    const betAmt = coinState.bet || 50;
    if (state.balance < betAmt) {
      showToast('⚠️ Saldo insuficiente para esa apuesta');
      return;
    }

    if (coinState.duelMode) {
      if (coinReadyBtnEl) coinReadyBtnEl.click();
      return;
    }

    state.balance = roundMoney(state.balance - betAmt);
    updateBalanceUI();
    playSound('coin_flip');
    document.getElementById('coinResultBanner').classList.remove('show');
    rollCoinFlip3D(coinChoice);
  });
}

// --- Explicit Global Window Bindings ---
if (typeof coinState !== 'undefined') window.coinState = coinState;
if (typeof coinServerState !== 'undefined') window.coinServerState = coinServerState;
if (typeof updateCoinPhysics !== 'undefined') window.updateCoinPhysics = updateCoinPhysics;
if (typeof updateCoinTableUI !== 'undefined') window.updateCoinTableUI = updateCoinTableUI;
if (typeof handleRemoteCoinFlip !== 'undefined') window.handleRemoteCoinFlip = handleRemoteCoinFlip;
if (typeof handleRemoteCoinResult !== 'undefined') window.handleRemoteCoinResult = handleRemoteCoinResult;
