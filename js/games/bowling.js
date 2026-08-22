// ============================================================
// BOWLING CHAMPIONSHIP 3D - GAMEPLAY & PHYSICS ENGINE
// ============================================================

(function() {
  'use strict';

  const bowlingState = {
    active: false,
    laneIndex: 0,
    frame: 1,
    roll: 1,
    frameScores: Array(10).fill(null).map(() => ({ roll1: null, roll2: null, roll3: null, total: 0 })),
    pinsStanding: Array(10).fill(true), // Pins 0 to 9 (1 to 10)
    isRolling: false,
    aimOffset: 0.0,   // -0.75 to +0.75 across the lane width
    aimAngle: 0.0,    // -0.05 to +0.05 radians
    power: 50,        // 10 to 100 %
    spin: 0,          // -1 (hook left), 0 (straight), +1 (hook right)
    powerOscillating: true,
    powerDirection: 1,
    powerInterval: null,
    readyBallMesh: null,
    activeBallMesh: null,
    worldLaneX: -39.25,
    startApproachZ: -26.30,
    targetPinZ: -72.50,
    totalScore: 0
  };

  window.bowlingState = bowlingState;

  // Sound helper wrapper con soporte de audio procedural de rodaje sobre madera
  function playBowlingSound(type, param) {
    if (typeof playSound === 'function') {
      try {
        if (type === 'roll') {
          if (bowlingState.activeRollAudio && typeof bowlingState.activeRollAudio.stop === 'function') {
            bowlingState.activeRollAudio.stop();
          }
          bowlingState.activeRollAudio = playSound('bowling_roll', param);
        } else if (type === 'hit' || type === 'strike') {
          if (bowlingState.activeRollAudio && typeof bowlingState.activeRollAudio.stop === 'function') {
            bowlingState.activeRollAudio.stop();
            bowlingState.activeRollAudio = null;
          }
          playSound('bowling_hit', param);
        } else if (type === 'gutter') {
          if (bowlingState.activeRollAudio && typeof bowlingState.activeRollAudio.stop === 'function') {
            bowlingState.activeRollAudio.stop();
            bowlingState.activeRollAudio = null;
          }
          playSound('bowling_gutter');
        } else if (type === 'click') {
          playSound('chip');
        }
      } catch (e) {}
    }
  }

  // Calculate world coordinates for active lane
  function getLaneWorldCoordinates(laneIdx) {
    const z = (window.ZONES || []).find(x => x.id === 'bowling') || { x: -31.0, z: -49.0 };
    const numLanes = 6;
    const laneSpacing = 3.30;
    const startX = -((numLanes - 1) * laneSpacing) / 2;
    const localLaneX = startX + laneIdx * laneSpacing;
    const worldLaneX = z.x + localLaneX;
    const startApproachZ = z.z + 22.70; // World approach line near player camera
    const targetPinZ = z.z - 23.50;      // World pin deck location
    return { worldLaneX, startApproachZ, targetPinZ };
  }

  // Initialize bowling game on specific lane (0 to 5)
  function initBowlingLane(laneIdx = 0) {
    bowlingState.active = true;
    bowlingState.laneIndex = laneIdx;
    bowlingState.frame = 1;
    bowlingState.roll = 1;
    bowlingState.isRolling = false;
    bowlingState.aimOffset = 0.0;
    bowlingState.aimAngle = 0.0;
    bowlingState.power = 50;
    bowlingState.spin = 0;
    bowlingState.totalScore = 0;
    bowlingState.frameScores = Array(10).fill(null).map(() => ({ roll1: null, roll2: null, roll3: null, total: 0 }));

    const coords = getLaneWorldCoordinates(laneIdx);
    bowlingState.worldLaneX = coords.worldLaneX;
    bowlingState.startApproachZ = coords.startApproachZ;
    bowlingState.targetPinZ = coords.targetPinZ;

    resetLanePins(true);
    spawnReadyBall();

    // Update UI elements
    const laneTitle = document.getElementById('bowlingLaneTitle');
    if (laneTitle) {
      laneTitle.textContent = `PISTA 0${laneIdx + 1}`;
    }

    const overlay = document.getElementById('bowlingWrap');
    if (overlay) {
      overlay.classList.add('show');
    }

    const rollBtn = document.getElementById('bowlingRollBtn');
    if (rollBtn) {
      rollBtn.disabled = false;
      rollBtn.textContent = 'LANZAR BOLA 🎳';
      rollBtn.style.opacity = '1';
    }

    updateBowlingScorecardUI();
    startPowerGaugeOscillation();

    if (typeof showToast === 'function') {
      showToast(`🎳 PISTA 0${laneIdx + 1}: Potencia ≤ 30% = Gutterball. ¡100% = Tiro Perfecto!`);
    }
  }

  window.initBowlingLane = initBowlingLane;

  // Spawn 3D Bowling Ball in the center of the screen
  function spawnReadyBall() {
    removeReadyBall();

    const ballRadius = 0.25;
    let ballMesh = null;
    if (typeof createSingle3DBowlingBall === 'function') {
      ballMesh = createSingle3DBowlingBall(bowlingState.laneIndex, ballRadius);
    } else {
      const geo = new THREE.SphereGeometry(ballRadius, 24, 24);
      const mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.8, roughness: 0.2 });
      ballMesh = new THREE.Mesh(geo, mat);
    }

    const ballY = 0.128 + ballRadius; // Resting on wood floor
    ballMesh.position.set(bowlingState.worldLaneX + bowlingState.aimOffset, ballY, bowlingState.startApproachZ);
    
    if (window.scene) {
      window.scene.add(ballMesh);
    }
    bowlingState.readyBallMesh = ballMesh;
  }

  function removeReadyBall() {
    if (bowlingState.readyBallMesh && window.scene) {
      window.scene.remove(bowlingState.readyBallMesh);
      bowlingState.readyBallMesh = null;
    }
  }

  function removeActiveBall() {
    if (bowlingState.activeBallMesh && window.scene) {
      window.scene.remove(bowlingState.activeBallMesh);
      bowlingState.activeBallMesh = null;
    }
  }

  // Reset pins on the lane
  function resetLanePins(fullReset = true) {
    if (fullReset) {
      bowlingState.pinsStanding.fill(true);
    }

    // Reference to 3D pins on active lane in render.js
    if (window.bowling3DLanes && window.bowling3DLanes[bowlingState.laneIndex]) {
      const laneData = window.bowling3DLanes[bowlingState.laneIndex];
      if (laneData.pins && laneData.pins.length) {
        laneData.pins.forEach((pObj, idx) => {
          if (fullReset || bowlingState.pinsStanding[idx]) {
            pObj.mesh.visible = true;
            pObj.mesh.position.copy(pObj.initialPos);
            pObj.mesh.rotation.set(0, 0, 0);
            pObj.physics = null;
          } else {
            pObj.mesh.visible = false;
            pObj.physics = null;
          }
        });
      }
    }
  }

  // Fast Oscillating Power Gauge (Minijuego de potencia continuo)
  function startPowerGaugeOscillation() {
    clearInterval(bowlingState.powerInterval);
    bowlingState.powerOscillating = true;
    bowlingState.power = 15;
    bowlingState.powerDirection = 1;

    const fillEl = document.getElementById('bowlingPowerFill');
    const textEl = document.getElementById('bowlingPowerVal');

    bowlingState.powerInterval = setInterval(() => {
      if (!bowlingState.active || !bowlingState.powerOscillating) return;
      
      // Aceleración hiper-exagerada: muy lenta en la zona baja y supersónica en el 100%
      const powerNorm = Math.max(0.08, bowlingState.power / 100.0);
      const stepSpeed = 0.55 + Math.pow(powerNorm, 3.5) * 16.5; // 0.55% en zona baja -> 17.05% en 100%
      
      bowlingState.power += bowlingState.powerDirection * stepSpeed;
      if (bowlingState.power >= 100) {
        bowlingState.power = 100;
        bowlingState.powerDirection = -1;
      } else if (bowlingState.power <= 10) {
        bowlingState.power = 10;
        bowlingState.powerDirection = 1;
      }

      if (fillEl) {
        fillEl.style.width = bowlingState.power + '%';
        if (bowlingState.power >= 99.5) {
          fillEl.style.boxShadow = '0 0 26px #ef4444';
        } else {
          fillEl.style.boxShadow = 'none';
        }
      }
      if (textEl) {
        const pRound = Math.round(bowlingState.power);
        if (pRound >= 100) {
          textEl.textContent = '100% 🔥 0% DESVIACIÓN';
          textEl.style.color = '#ef4444';
        } else if (pRound <= 30) {
          textEl.textContent = `${pRound}% ⚠️ GUTTER (100% Desv)`;
          textEl.style.color = '#ef4444';
        } else {
          // Desviación lineal de 100% en P=30 a 0% en P=100
          const desv = Math.round(((100.0 - pRound) / 70.0) * 100);
          textEl.textContent = `${pRound}% (Desv: ±${desv}%)`;
          textEl.style.color = (pRound >= 75) ? '#fbbf24' : '#94a3b8';
        }
      }
    }, 20);
  }

  // Update Aim Position (shifts the 3D ball left / right)
  function updateAimPosition(offset) {
    if (!bowlingState.active || bowlingState.isRolling) return;
    bowlingState.aimOffset = Math.max(-0.75, Math.min(0.75, offset));
    if (bowlingState.readyBallMesh) {
      bowlingState.readyBallMesh.position.x = bowlingState.worldLaneX + bowlingState.aimOffset;
    }
  }

  window.updateAimPosition = updateAimPosition;

  // Launch Bowling Ball ONLY when seated and clicking the Launch Button
  function launchBowlingBall() {
    // Validación estricta: Solo sentado en la pista de bolos
    if (!bowlingState.active || bowlingState.isRolling) return;
    if (typeof state !== 'undefined') {
      if (state.mode !== 'bowling' || !state.player || !state.player.currentSeat || state.player.currentSeat.zone !== 'bowling') {
        return;
      }
    }

    bowlingState.isRolling = true;
    bowlingState.powerOscillating = false;
    clearInterval(bowlingState.powerInterval);

    const shotPower = bowlingState.power || 50;

    // 1. Desviación base por potencia (30% o menos = 100% desviación / Gutterball garantizado)
    const isForcedGutter = (shotPower <= 30.0);
    const baseInaccuracy = isForcedGutter ? 1.0 : Math.max(0.0, (100.0 - shotPower) / 70.0); // 1.0 en 30% -> 0.0 en 100%
    const randomSide = (Math.random() < 0.5 ? -1 : 1);
    const baseDrift = isForcedGutter ? (1.35 * randomSide) : (baseInaccuracy * 0.95 * randomSide);

    // 2. FACTOR SUERTE: Añade hasta un 20% de desviación aleatoria e independiente por tirada
    const luckSign = (Math.random() < 0.5 ? -1 : 1);
    const luckPercent = Math.random() * 20.0; // 0.0% a 20.0%
    const luckDrift = isForcedGutter ? 0.0 : ((luckPercent / 100.0) * 1.10 * luckSign); // Hasta ±0.22m de desvío
    
    // Desviación lateral total acumulada (Potencia + Factor Suerte)
    const lateralDrift = isForcedGutter ? (1.35 * randomSide) : (baseDrift + luckDrift);
    
    bowlingState.lastLuckPercent = Math.round(luckPercent);
    bowlingState.lastLuckSign = luckSign;
    bowlingState.lastLuckDrift = luckDrift;

    const rollBtn = document.getElementById('bowlingRollBtn');
    if (rollBtn) {
      rollBtn.disabled = true;
      if (shotPower >= 99.5 && Math.abs(lateralDrift) <= 0.06) rollBtn.textContent = 'TIRO PERFECTO 100% 🔥';
      else if (isForcedGutter) rollBtn.textContent = '⚠️ GUTTER BALL...';
      else rollBtn.textContent = 'RODANDO... 🎳';
      rollBtn.style.opacity = '0.7';
    }

    // Transfer ready ball to active rolling ball
    let ballMesh = bowlingState.readyBallMesh;
    bowlingState.readyBallMesh = null;

    if (!ballMesh) {
      const ballRadius = 0.25;
      if (typeof createSingle3DBowlingBall === 'function') {
        ballMesh = createSingle3DBowlingBall(bowlingState.laneIndex, ballRadius);
      } else {
        const geo = new THREE.SphereGeometry(ballRadius, 24, 24);
        const mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.8, roughness: 0.2 });
        ballMesh = new THREE.Mesh(geo, mat);
      }
      ballMesh.position.set(bowlingState.worldLaneX + bowlingState.aimOffset, 0.128 + ballRadius, bowlingState.startApproachZ);
      if (window.scene) window.scene.add(ballMesh);
    }

    bowlingState.activeBallMesh = ballMesh;

    const startXPos = bowlingState.worldLaneX + bowlingState.aimOffset;
    const startZ = bowlingState.startApproachZ;
    const targetZ = bowlingState.targetPinZ;
    const startTime = performance.now();

    // Launch duration inversely proportional to power
    const duration = Math.max(850, 2100 - (shotPower / 100) * 1150);

    // Reproducir sonido hiperrealista de rodaje sobre madera de arce
    playBowlingSound('roll', { duration, power: shotPower });

    // Variables de control de encarrilamiento en canaleta lateral
    let isInGutter = false;
    let gutterSide = 0;
    let gutterDropProgress = 0;
    let gutterDropStartX = 0;

    function animateBall(now) {
      if (!bowlingState.active || !ballMesh) return;
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);

      const currentZ = startZ + (targetZ - startZ) * progress;
      ballMesh.position.z = currentZ;

      if (!isInGutter) {
        // Trayectoria normal en pista de madera
        const spinCurve = Math.pow(progress, 2.2) * (bowlingState.spin * 0.35);
        const powerDeviation = lateralDrift * Math.pow(progress, 1.70);
        const currentX = startXPos + (bowlingState.aimAngle * (startZ - currentZ)) + spinCurve + powerDeviation;
        const offsetFromCenter = currentX - bowlingState.worldLaneX;

        if (Math.abs(offsetFromCenter) >= 1.11) {
          // La bola cae de la pista al canal lateral
          isInGutter = true;
          gutterSide = (offsetFromCenter > 0 ? 1 : -1);
          gutterDropStartX = currentX;
          gutterDropProgress = 0;
          playBowlingSound('gutter');
        } else {
          ballMesh.position.x = currentX;
          ballMesh.position.y = 0.37; // Altura perfecta sobre parqué de madera (0.12m + 0.25m)
        }
      }

      if (isInGutter) {
        // Encarrilamiento físico fluido en el centro de la canaleta cóncava (offset = ±1.29m)
        gutterDropProgress = Math.min(1.0, gutterDropProgress + 0.07);
        const smoothT = Math.sin(gutterDropProgress * Math.PI * 0.5);
        const targetGutterX = bowlingState.worldLaneX + (gutterSide * 1.29);

        ballMesh.position.x = gutterDropStartX + (targetGutterX - gutterDropStartX) * smoothT;
        ballMesh.position.y = 0.37 - (0.09 * smoothT); // Desciende suavemente al lecho del canal (0.28m)
        ballMesh.rotation.z += gutterSide * 0.10; // Giro por fricción contra el flanco de la canaleta
      }

      ballMesh.rotation.x -= 0.32 * (shotPower / 50);
      ballMesh.rotation.y += bowlingState.spin * 0.06;

      if (progress < 1.0) {
        requestAnimationFrame(animateBall);
      } else {
        // Impact with Pins or Gutter pit
        evaluatePinImpact(ballMesh.position.x - bowlingState.worldLaneX, isInGutter || isForcedGutter);
      }
    }

    requestAnimationFrame(animateBall);
  }

  window.launchBowlingBall = launchBowlingBall;

  // Evaluate which pins were hit based on real physical ball X offset relative to lane center
  function evaluatePinImpact(impactX, isForcedGutter = false) {
    const isGutter = isForcedGutter || (Math.abs(impactX) > 1.11);

    if (isGutter) {
      playBowlingSound('gutter');
      // 0 pins hit (Gutter Ball)
      handleRollResult(0, true);
      return;
    }

    const pinOffsets = [
      { id: 0, x: 0.00, row: 1 },
      { id: 1, x: -0.30, row: 2 },
      { id: 2, x: 0.30, row: 2 },
      { id: 3, x: -0.60, row: 3 },
      { id: 4, x: 0.00, row: 3 },
      { id: 5, x: 0.60, row: 3 },
      { id: 6, x: -0.90, row: 4 },
      { id: 7, x: -0.30, row: 4 },
      { id: 8, x: 0.30, row: 4 },
      { id: 9, x: 0.90, row: 4 }
    ];

    let knockedDownThisRoll = 0;
    const newlyKnockedIds = [];
    const directHitRadius = 0.36; // Contacto físico bola (0.25m) + bolo (0.08m) + tolerancia (0.03m)

    // 1. Colisiones físicas directas bola-bolo
    pinOffsets.forEach(p => {
      if (bowlingState.pinsStanding[p.id]) {
        const dist = Math.abs(impactX - p.x);
        if (dist <= directHitRadius) {
          bowlingState.pinsStanding[p.id] = false;
          knockedDownThisRoll++;
          newlyKnockedIds.push(p.id);
        }
      }
    });

    // 2. Reacción en cadena dominó (bolos frontales derriban a los traseros al salir despedidos)
    const dominoChains = [
      { front: 0, targets: [1, 2, 4] },
      { front: 1, targets: [3, 4, 6, 7] },
      { front: 2, targets: [4, 5, 8, 9] },
      { front: 3, targets: [6] },
      { front: 4, targets: [7, 8] },
      { front: 5, targets: [9] }
    ];

    dominoChains.forEach(chain => {
      if (newlyKnockedIds.includes(chain.front)) {
        chain.targets.forEach(targetId => {
          if (bowlingState.pinsStanding[targetId]) {
            const chainProbability = 0.72 + (bowlingState.power / 100) * 0.25;
            if (Math.random() < chainProbability) {
              bowlingState.pinsStanding[targetId] = false;
              knockedDownThisRoll++;
              newlyKnockedIds.push(targetId);
            }
          }
        });
      }
    });

    // Si el tiro entra en el Pocket central (|impactX| <= 0.16m), garantiza Strike
    if (Math.abs(impactX) <= 0.16 && bowlingState.power >= 75) {
      pinOffsets.forEach(p => {
        if (bowlingState.pinsStanding[p.id]) {
          bowlingState.pinsStanding[p.id] = false;
          knockedDownThisRoll++;
          newlyKnockedIds.push(p.id);
        }
      });
    }

    playBowlingSound('hit', { count: knockedDownThisRoll, isStrike: (knockedDownThisRoll === 10), power: bowlingState.power });

    // Simulación de Físicas 3D en tiempo real (Impulso, gravedad, rebote y rotación)
    simulate3DPinsPhysics(impactX, newlyKnockedIds);

    handleRollResult(knockedDownThisRoll, false, impactX);
  }

  // 3D Rigid-Body Pin Simulation Loop (Físicas de impacto en tiempo real)
  function simulate3DPinsPhysics(impactX, knockedIds) {
    if (!window.bowling3DLanes || !window.bowling3DLanes[bowlingState.laneIndex]) return;
    const laneData = window.bowling3DLanes[bowlingState.laneIndex];
    if (!laneData.pins || !laneData.pins.length) return;

    const powerMult = Math.max(0.45, bowlingState.power / 100.0);

    knockedIds.forEach(idx => {
      const pObj = laneData.pins[idx];
      if (!pObj || !pObj.mesh) return;

      const px = pObj.initialPos.x;
      const dirX = Math.sign(px - impactX) || (Math.random() < 0.5 ? -1 : 1);
      
      // Velocidades iniciales de dispersión e impacto
      const vx = (dirX * (1.8 + Math.random() * 3.6) + (Math.random() - 0.5) * 1.5) * powerMult;
      const vy = (1.6 + Math.random() * 3.4) * powerMult; // Salto vertical
      const vz = -(4.8 + Math.random() * 8.5) * powerMult; // Empuje violento hacia atrás

      // Velocidades angulares de voltereta
      const rx = -(Math.random() * 8.0 + 6.0) * powerMult;
      const ry = (Math.random() - 0.5) * 14.0 * powerMult;
      const rz = (Math.random() - 0.5) * 12.0 * powerMult;

      pObj.physics = {
        vx, vy, vz,
        rx, ry, rz,
        active: true
      };
    });

    let lastTime = performance.now();
    const physDuration = 1400; // 1.4 segundos de simulación física
    const startTime = performance.now();

    function stepPhysics(now) {
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = now - startTime;

      let anyActive = false;

      knockedIds.forEach(idx => {
        const pObj = laneData.pins[idx];
        if (!pObj || !pObj.physics || !pObj.physics.active) return;
        const phys = pObj.physics;
        const mesh = pObj.mesh;

        // 1. Gravedad
        phys.vy -= 22.0 * dt;

        // 2. Integrar posiciones
        mesh.position.x += phys.vx * dt;
        mesh.position.y += phys.vy * dt;
        mesh.position.z += phys.vz * dt;

        // 3. Integrar rotaciones
        mesh.rotation.x += phys.rx * dt;
        mesh.rotation.y += phys.ry * dt;
        mesh.rotation.z += phys.rz * dt;

        // 4. Colisión y rebote contra el suelo de madera (y = 0.08)
        if (mesh.position.y <= 0.08) {
          mesh.position.y = 0.08;
          phys.vy = -phys.vy * 0.28; // Coeficiente de restitución (rebote)
          
          // Fricción con el suelo
          phys.vx *= 0.88;
          phys.vz *= 0.88;
          phys.rx *= 0.82;
          phys.ry *= 0.82;
          phys.rz *= 0.82;
        }

        // Límite de parada si se aquieta
        if (Math.abs(phys.vx) < 0.05 && Math.abs(phys.vy) < 0.05 && Math.abs(phys.vz) < 0.05 && mesh.position.y <= 0.085) {
          phys.active = false;
        } else {
          anyActive = true;
        }
      });

      if (anyActive && elapsed < physDuration && bowlingState.active) {
        requestAnimationFrame(stepPhysics);
      }
    }

    requestAnimationFrame(stepPhysics);
  }

  function handleRollResult(knockedDownThisRoll, isGutter, impactX = 0) {
    const frameIdx = bowlingState.frame - 1;
    const currentFrame = bowlingState.frameScores[frameIdx];

    if (isGutter) {
      if (typeof showToast === 'function') {
        showToast(`🚫 ¡GUTTER BALL! Potencia ≤ 30%: La bola cayó en la canaleta (0 bolos)`);
      }
    }

    const luckP = bowlingState.lastLuckPercent || 0;
    const luckDir = bowlingState.lastLuckDirection || 1;
    const luckStr = (luckP > 0) ? ` | 🎲 Suerte: ${luckDir > 0 ? '+' : '-'}${luckP}%` : '';

    if (bowlingState.roll === 1) {
      currentFrame.roll1 = knockedDownThisRoll;
      if (knockedDownThisRoll === 10) {
        // STRIKE!
        if (typeof triggerConfetti === 'function') triggerConfetti();
        if (typeof addXP === 'function') addXP(250);
        if (typeof state !== 'undefined') { state.balance += 200; if (typeof updateBalanceUI === 'function') updateBalanceUI(); }
        if (typeof showToast === 'function') showToast(`💥 ¡STRIKE PERFECTO EN PISTA 0${bowlingState.laneIndex + 1}! ¡10 BOLOS DERRIBADOS! (+$200) 🏆`);
        advanceFrame();
      } else {
        // Tiro 1 (< 10 bolos) -> Preparar Tiro 2
        if (typeof addXP === 'function') addXP(knockedDownThisRoll * 10);
        if (!isGutter && typeof showToast === 'function') {
          showToast(`🎳 ¡Tiro 1: ${knockedDownThisRoll} bolos derribados! (Desv: ${Math.round(Math.abs(impactX)*100)}cm${luckStr})`);
        }
        bowlingState.roll = 2;
        setTimeout(() => {
          removeActiveBall();
          spawnReadyBall();
          startPowerGaugeOscillation();
          bowlingState.isRolling = false;
          const rollBtn = document.getElementById('bowlingRollBtn');
          if (rollBtn) {
            rollBtn.disabled = false;
            rollBtn.textContent = 'LANZAR BOLA 🎳';
            rollBtn.style.opacity = '1';
          }
        }, 1300);
      }
    } else {
      // Roll 2
      currentFrame.roll2 = knockedDownThisRoll;
      const totalFramePins = (currentFrame.roll1 || 0) + knockedDownThisRoll;
      if (totalFramePins === 10) {
        // SPARE!
        if (typeof triggerConfetti === 'function') triggerConfetti();
        if (typeof addXP === 'function') addXP(150);
        if (typeof state !== 'undefined') { state.balance += 100; if (typeof updateBalanceUI === 'function') updateBalanceUI(); }
        if (typeof showToast === 'function') showToast(`🌟 ¡SPARE EN PISTA 0${bowlingState.laneIndex + 1}! Limpieza completa (+$100) 🎉`);
      } else {
        if (typeof addXP === 'function') addXP(knockedDownThisRoll * 10);
        const spareLuckStr = (luckP > 0) ? ` (🎲 Suerte: ${luckDir > 0 ? '+' : '-'}${luckP}%)` : '';
        if (!isGutter && typeof showToast === 'function') {
          showToast(`🎳 Frame ${bowlingState.frame}: ${totalFramePins} bolos totales${spareLuckStr}`);
        }
      }
      advanceFrame();
    }

    updateBowlingScorecardUI();
  }

  function advanceFrame() {
    setTimeout(() => {
      removeActiveBall();
      if (bowlingState.frame < 10) {
        bowlingState.frame++;
        bowlingState.roll = 1;
        resetLanePins(true);
        spawnReadyBall();
        startPowerGaugeOscillation();
        bowlingState.isRolling = false;
        const rollBtn = document.getElementById('bowlingRollBtn');
        if (rollBtn) {
          rollBtn.disabled = false;
          rollBtn.textContent = 'LANZAR BOLA 🎳';
          rollBtn.style.opacity = '1';
        }
      } else {
        // Game complete (10 frames)
        bowlingState.isRolling = false;
        clearInterval(bowlingState.powerInterval);
        removeReadyBall();
        const rollBtn = document.getElementById('bowlingRollBtn');
        if (rollBtn) {
          rollBtn.disabled = true;
          rollBtn.textContent = 'PARTIDA COMPLETADA 🏆';
        }
        if (typeof showToast === 'function') {
          showToast(`🏆 ¡Partida completada en Pista 0${bowlingState.laneIndex + 1}! Puntuación final: ${calculateTotalScore()}`);
        }
      }
      updateBowlingScorecardUI();
    }, 1900);
  }

  function calculateTotalScore() {
    let sum = 0;
    bowlingState.frameScores.forEach(f => {
      sum += (f.roll1 || 0) + (f.roll2 || 0) + (f.roll3 || 0);
    });
    return sum;
  }

  // Update Scorecard UI DOM
  function updateBowlingScorecardUI() {
    const tableEl = document.getElementById('bowlingScorecard');
    if (!tableEl) return;

    let total = 0;
    for (let f = 0; f < 10; f++) {
      const frameData = bowlingState.frameScores[f];
      const r1El = document.getElementById(`bRoll_${f}_1`);
      const r2El = document.getElementById(`bRoll_${f}_2`);
      const scoreEl = document.getElementById(`bScore_${f}`);

      const r1 = frameData.roll1;
      const r2 = frameData.roll2;

      if (r1El) r1El.textContent = (r1 === 10) ? 'X' : (r1 !== null ? r1 : '–');
      if (r2El) r2El.textContent = (r1 !== 10 && (r1 || 0) + (r2 || 0) === 10 && r2 !== null) ? '/' : (r2 !== null ? r2 : '–');

      if (r1 !== null) {
        total += (r1 || 0) + (r2 || 0);
        if (scoreEl) scoreEl.textContent = total;
      } else {
        if (scoreEl) scoreEl.textContent = '–';
      }
    }

    const totalEl = document.getElementById('bowlingTotalScoreDisplay');
    if (totalEl) totalEl.textContent = total;
  }

  // Exit Bowling Game
  function exitBowlingLane() {
    bowlingState.active = false;
    clearInterval(bowlingState.powerInterval);
    removeReadyBall();
    removeActiveBall();

    const overlay = document.getElementById('bowlingWrap');
    if (overlay) overlay.classList.remove('show');

    if (typeof exitActiveGame === 'function') {
      exitActiveGame();
    }
  }

  window.exitBowlingLane = exitBowlingLane;

  // Aim adjustments with A / D / Arrow Keys (Only while active)
  window.addEventListener('keydown', e => {
    if (!bowlingState.active || bowlingState.isRolling) return;
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
      updateAimPosition(bowlingState.aimOffset - 0.10);
      const slider = document.getElementById('bowlingAimSlider');
      if (slider) slider.value = bowlingState.aimOffset;
    } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
      updateAimPosition(bowlingState.aimOffset + 0.10);
      const slider = document.getElementById('bowlingAimSlider');
      if (slider) slider.value = bowlingState.aimOffset;
    }
  });

})();
