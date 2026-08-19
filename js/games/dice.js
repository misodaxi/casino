/* ============================================================
         2. DICE DUEL LOGIC — MOTOR DE FÍSICA REAL PARA LOS DADOS
      ============================================================ */
      const dState = { bet: 50, selectedChip: 50, rolling: false };
      var diceCurrentMode = 'solo';

      function update3DDiceChips(betAmount) {
        if (!dice3DRefs || !dice3DRefs.chipsGroup) return;
        const grp = dice3DRefs.chipsGroup;
        while (grp.children && grp.children.length > 0) grp.remove(grp.children[0]);
        const amt = Math.max(0, typeof betAmount === 'number' ? betAmount : (dState.bet || 0));

        // Actualizar rótulos informativos de la UI en modo solo contra la máquina
        if (diceCurrentMode === 'solo') {
          const subTitle = document.getElementById('diceSubTitle');
          const p1Who = document.getElementById('diceP1Who');
          const p2Who = document.getElementById('diceP2Who');
          if (subTitle) subTitle.textContent = amt > 0 ? `TÚ ($${amt}) VS LA MÁQUINA ($${amt}) · BOTE TOTAL: $${amt * 2}` : 'TÚ VS LA MÁQUINA · GANA MÁS ALTO';
          if (p1Who) p1Who.textContent = amt > 0 ? `🔵 TÚ ($${amt})` : '🔵 TÚ (DADOS AZULES)';
          if (p2Who) p2Who.textContent = amt > 0 ? `🔴 LA MÁQUINA ($${amt})` : '🔴 LA MÁQUINA (DADOS ROJOS)';
        }

        if (amt > 0) {
          // Detectar dinámicamente en qué asiento está sentado el jugador (0 = Asiento Izquierdo / Azul, 1 = Asiento Derecho / Rojo)
          const mySeatIdx = (state.player && state.player.currentSeat && state.player.currentSeat.zone === 'dice' && typeof state.player.currentSeat.seatIndex === 'number')
            ? state.player.currentSeat.seatIndex
            : 0;
          const playerX = (mySeatIdx === 1) ? 1.65 : -1.65;
          const machineX = (mySeatIdx === 1) ? -1.65 : 1.65;

          // 1. Renderizar pila 3D de fichas apostadas por el jugador en su bandeja
          const playerStack = create3DChipStackMesh(amt, 0.075, 0.018);
          playerStack.position.set(playerX, 1.365, 1.34);
          grp.add(playerStack);

          // 2. Renderizar pila 3D de fichas igualadas de la máquina / casa en la bandeja contraria (exactamente igual en ambos lados)
          const machineStack = create3DChipStackMesh(amt, 0.075, 0.018);
          machineStack.position.set(machineX, 1.365, 1.34);
          grp.add(machineStack);
        }
      }

      // Botón para borrar/reiniciar la apuesta a 0
      const diceClearBtn = document.getElementById('diceClearBetBtn');
      if (diceClearBtn) {
        diceClearBtn.addEventListener('click', () => {
          if (dState.rolling) return;
          playSound('chip');
          dState.bet = 0;
          const display = document.getElementById('diceBetDisplay');
          if (display) display.textContent = '$0';
          update3DDiceChips(0);
        });
      }

      let activeDiceRoll = null; // { player:[...], house:[...], resolved:true, versusData:null }
      const DICE_FACE_EMOJI = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

      function createDiePhysicsObj(mesh, colorTheme) {
        return {
          mesh,
          colorTheme,
          phase: 'idle', // 'idle' | 'lifting' | 'holding' | 'rolling' | 'toppling' | 'settled'
          liftTimer: 0,
          liftDuration: 1.35,
          holdTimer: 0,
          holdDuration: 0.75,
          targetLiftY: 7.20,
          startX: mesh.position.x,
          startY: mesh.position.y,
          startZ: mesh.position.z,
          startQuat: mesh.quaternion.clone(),
          vel: new THREE.Vector3(),
          angVel: new THREE.Vector3(),
          bounceCount: 0,
          groundedTimer: 0,
          settlingState: 0,
          settleTimer: 0,
          targetQuat: null,
          settleStartQuat: null,
          wobbleAxis: null,
          settled: true,
          lifeTimer: 0,
          lastTickTime: 0,
          value: 1,
          targetVal: null
        };
      }

      function initTableDicePhysics() {
        if (!dice3DRefs || !dice3DRefs.diceMeshes) return;
        const [m1, m2, m3, m4] = dice3DRefs.diceMeshes;
        const playerDice = [
          createDiePhysicsObj(m1, 'blue'),
          createDiePhysicsObj(m2, 'blue')
        ];
        const houseDice = [
          createDiePhysicsObj(m3, 'red'),
          createDiePhysicsObj(m4, 'red')
        ];
        activeDiceRoll = {
          player: playerDice,
          house: houseDice,
          resolved: true,
          versusData: null
        };
      }

      function startDiceCraneRoll(p1Vals = null, p2Vals = null, versusData = null) {
        if (!activeDiceRoll) initTableDicePhysics();
        if (!activeDiceRoll || !dice3DRefs) return;

        // Cada vez que se lanza una tirada, se activa automáticamente el encuadre y animación vertical
        userMovedDiceCam = false;
        diceCinematicCamActive = true;
        if (state.defaultDiceCam) {
          targetCamDist = state.defaultDiceCam.camDist;
          targetCamPitch = state.defaultDiceCam.camPitch;
          targetCamYaw = state.defaultDiceCam.camYaw;
        }

        const floorY = (dice3DRefs.floorY !== undefined) ? dice3DRefs.floorY : 0.92;
        const all = activeDiceRoll.player.concat(activeDiceRoll.house);

        all.forEach((d, idx) => {
          d.phase = 'lifting';
          d.liftTimer = 0;
          d.liftDuration = 1.30 + (idx % 2) * 0.10 + Math.random() * 0.08;
          d.holdTimer = 0;
          d.holdDuration = 0.70 + (idx % 2) * 0.08 + Math.random() * 0.08;
          d.targetLiftY = floorY + 6.50 + Math.random() * 0.40;
          d.startX = d.mesh.position.x;
          d.startY = d.mesh.position.y;
          d.startZ = d.mesh.position.z;
          d.startQuat = d.mesh.quaternion.clone();
          d.settled = false;
          d.settlingState = 0;
          d.settleTimer = 0;
          d.bounceCount = 0;
          d.groundedTimer = 0;
          d.lifeTimer = 0;
          d.lastTickTime = 0;
          d.vel.set(0, 0, 0);
          d.angVel.set(0, 0, 0);

          if (idx < 2 && p1Vals && typeof p1Vals[idx] === 'number') {
            d.targetVal = p1Vals[idx];
          } else if (idx >= 2 && p2Vals && typeof p2Vals[idx - 2] === 'number') {
            d.targetVal = p2Vals[idx - 2];
          } else {
            d.targetVal = null;
          }
        });

        activeDiceRoll.resolved = false;
        activeDiceRoll.versusData = versusData;
        window.isDicePhysicsActive = true;
      }

      function rollDiceDuel3D() {
        startDiceCraneRoll();
      }

      // 8 Esquinas unitarias de un cubo para detección precisa de colisión
      const DIE_LOCAL_CORNERS = [
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1,  1),
        new THREE.Vector3(-1,  1, -1),
        new THREE.Vector3(-1,  1,  1),
        new THREE.Vector3( 1, -1, -1),
        new THREE.Vector3( 1, -1,  1),
        new THREE.Vector3( 1,  1, -1),
        new THREE.Vector3( 1,  1,  1)
      ];

      // Quaterniones base exactos para orientar cada cara (DIE_FACE_VALUES = [2, 5, 1, 6, 3, 4]) hacia arriba (+Y)
      const BASE_FACE_QUATS = [
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1),  Math.PI / 2), // Face 0 (val 2, +X -> +Y)
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2), // Face 1 (val 5, -X -> +Y)
        new THREE.Quaternion(),                                                            // Face 2 (val 1, +Y -> +Y)
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0),  Math.PI),     // Face 3 (val 6, -Y -> +Y)
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2), // Face 4 (val 3, +Z -> +Y)
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0),  Math.PI / 2), // Face 5 (val 4, -Z -> +Y)
      ];

      // Función geométrica precisa para leer la cara que apunta exactamente hacia arriba (+Y en el mundo 3D)
      function readDieFaceUp(mesh) {
        if (!mesh) return 1;
        mesh.updateMatrixWorld(true);
        let maxDot = -Infinity;
        let bestFaceVal = 1;
        const worldNormal = new THREE.Vector3();

        for (let i = 0; i < 6; i++) {
          worldNormal.copy(DIE_FACE_NORMALS[i]).applyQuaternion(mesh.quaternion);
          if (worldNormal.y > maxDot) {
            maxDot = worldNormal.y;
            bestFaceVal = DIE_FACE_VALUES[i];
          }
        }
        return bestFaceVal;
      }

      window.isDicePhysicsActive = false;

      // Pre-allocated scratch objects for Dice Physics (0 GC allocations per sub-step)
      const _diceCornerScratch = [
        new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
        new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
      ];
      const _diceTempAxis = new THREE.Vector3();
      const _diceTempDq = new THREE.Quaternion();
      const _diceTempWobbleQ = new THREE.Quaternion();

      function updateDicePhysics(dt) {
        if (!window.isDicePhysicsActive) return; // 0 CPU cost when dice are settled
        if (!activeDiceRoll) initTableDicePhysics();
        if (!dice3DRefs || !activeDiceRoll) return;

        const totalDt = Math.min(0.045, dt);
        const subSteps = 3; // Sub-stepping para física ultra-suave y sin trompicones
        const subDt = totalDt / subSteps;
        const gravity = 12.0; // Gravedad realista
        const floorY = (dice3DRefs.floorY !== undefined) ? dice3DRefs.floorY : 0.92;
        const halfSize = 0.168; // 0.336 / 2
        const boundX = (dice3DRefs.boundX !== undefined) ? (dice3DRefs.boundX - halfSize - 0.02) : 1.86;
        const boundZ = (dice3DRefs.boundZ !== undefined) ? (dice3DRefs.boundZ - halfSize - 0.02) : 0.86;
        const all = activeDiceRoll.player.concat(activeDiceRoll.house);
        let allSettled = true;

        for (let step = 0; step < subSteps; step++) {
          all.forEach(d => {
            if (d.settled) {
              d.mesh.position.y = floorY + halfSize;
              return;
            }
            allSettled = false;

            // FASE 1: ELEVACIÓN SUAVE COMO SI FUERA ARRASTRADO POR UNA GRÚA INVISIBLE
            if (d.phase === 'lifting') {
              d.liftTimer = (d.liftTimer || 0) + subDt;
              const prog = Math.min(1.0, d.liftTimer / d.liftDuration);
              // Curva suave easeInOutCubic para acelerar y desacelerar fluidamente sin trompicones
              const easeProg = prog < 0.5 ? 4 * prog * prog * prog : 1 - Math.pow(-2 * prog + 2, 3) / 2;

              d.mesh.position.y = d.startY + (d.targetLiftY - d.startY) * easeProg;
              // Balanceo natural de tensión mientras sube
              d.mesh.position.x = d.startX + Math.sin(prog * Math.PI * 3.0) * 0.035;
              d.mesh.position.z = d.startZ + Math.cos(prog * Math.PI * 3.0) * 0.035;

              // Ligero balanceo de orientación colgado en el aire
              const swayAngle = Math.sin(prog * Math.PI * 4.0) * 0.08 * (1 - prog * 0.4);
              d.mesh.quaternion.copy(d.startQuat);
              d.mesh.rotateZ(swayAngle);

              if (prog >= 1.0) {
                d.phase = 'holding';
                d.holdTimer = 0;
              }
              return;
            }

            // FASE 2: SUSPENSIÓN Y TENSIÓN EN EL AIRE DURANTE UNOS SEGUNDOS
            if (d.phase === 'holding') {
              d.holdTimer = (d.holdTimer || 0) + subDt;
              const ht = d.holdTimer;

              // Flotación suave suspendido en el aire
              d.mesh.position.y = d.targetLiftY + Math.sin(ht * 6.5) * 0.030;
              d.mesh.position.x = d.startX + Math.sin(ht * 3.5) * 0.018;
              d.mesh.position.z = d.startZ + Math.cos(ht * 3.5) * 0.018;

              if (ht >= d.holdDuration) {
                // Suelta los dados con lanzamiento físico hacia el centro del tapete
                d.phase = 'rolling';
                const dirToCenter = new THREE.Vector2(-d.mesh.position.x * 1.1 + (Math.random() - 0.5) * 0.5, -d.mesh.position.z * 1.1 + (Math.random() - 0.5) * 0.5).normalize();
                const throwPower = 3.5 + Math.random() * 0.6;
                const initialVx = dirToCenter.x * throwPower;
                const initialVz = dirToCenter.y * throwPower;

                d.vel.set(
                  initialVx,
                  0.5 + Math.random() * 0.4,
                  initialVz
                );
                const tumbleX = initialVz * 3.0 + (Math.random() - 0.5) * 2.0;
                const tumbleZ = -initialVx * 3.0 + (Math.random() - 0.5) * 2.0;
                const tumbleY = (Math.random() > 0.5 ? 1 : -1) * (4.5 + Math.random() * 2.5);
                d.angVel.set(tumbleX, tumbleY, tumbleZ);
              }
              return;
            }

            // FASE 3: FÍSICA REAL DE CAÍDA, REBOTES Y ASENTAMIENTO
            d.lifeTimer = (d.lifeTimer || 0) + subDt;
            const t = d.lifeTimer;

            // FASE DE ASENTAMIENTO REALISTA CON MICRO-WOBBLE FÍSICO
            if (d.settlingState === 1) {
              d.settleTimer = (d.settleTimer || 0) + subDt;
              const st = d.settleTimer;
              
              // Caída rápida a la cara objetivo (0.16s)
              const toppleProgress = Math.min(1.0, st / 0.16);
              const easeTopple = 1 - Math.pow(1 - toppleProgress, 2.5);
              d.mesh.quaternion.slerpQuaternions(d.settleStartQuat, d.targetQuat, easeTopple);

              // Pequeño wobble/micro-amortiguación sobre el fieltro como un dado real pesado
              if (toppleProgress >= 1.0) {
                const wobbleTime = st - 0.16;
                const wobbleDamp = Math.exp(-wobbleTime * 14.0);
                const wobbleAngle = Math.sin(wobbleTime * 28.0) * 0.08 * wobbleDamp;
                
                if (d.wobbleAxis) {
                  _diceTempWobbleQ.setFromAxisAngle(d.wobbleAxis, wobbleAngle);
                  d.mesh.quaternion.copy(d.targetQuat).multiply(_diceTempWobbleQ);
                }

                if (wobbleTime > 0.22 || wobbleDamp < 0.02) {
                  d.settlingState = 2;
                  d.settled = true;
                  d.phase = 'idle';
                  d.mesh.quaternion.copy(d.targetQuat);
                  d.mesh.position.y = floorY + halfSize;
                  d.vel.set(0, 0, 0);
                  d.angVel.set(0, 0, 0);
                  d.value = readDieFaceUp(d.mesh);
                  playSound('dice_felt', 0.28);
                }
              }

              d.mesh.position.y = floorY + halfSize;
              d.mesh.position.x += d.vel.x * subDt * 0.2;
              d.mesh.position.z += d.vel.z * subDt * 0.2;
              return;
            }

            // 1. Integración de gravedad y posición
            d.vel.y -= gravity * subDt;
            d.mesh.position.x += d.vel.x * subDt;
            d.mesh.position.y += d.vel.y * subDt;
            d.mesh.position.z += d.vel.z * subDt;

            // 2. Fricción aerodinámica
            const airDrag = 0.9996;
            d.vel.x *= Math.pow(airDrag, subDt * 60);
            d.vel.z *= Math.pow(airDrag, subDt * 60);

            // 3. Integración de rotación 3D
            const angMag = d.angVel.length();
            if (angMag > 0.0001) {
              _diceTempAxis.copy(d.angVel).normalize();
              _diceTempDq.setFromAxisAngle(_diceTempAxis, angMag * subDt);
              d.mesh.quaternion.premultiply(_diceTempDq);
            }

            // 4. Detección de la esquina de contacto más baja (Zero Allocations)
            let lowestY = Infinity;
            let lowestRx = 0, lowestRz = 0;
            for (let i = 0; i < 8; i++) {
              const cv = _diceCornerScratch[i].copy(DIE_LOCAL_CORNERS[i]).multiplyScalar(halfSize).applyQuaternion(d.mesh.quaternion);
              if (cv.y < lowestY) {
                lowestY = cv.y;
                lowestRx = cv.x;
                lowestRz = cv.z;
              }
            }

            const bottomContactY = d.mesh.position.y + lowestY;

            // 5. CONTACTO, REBOTES MÁS ALTOS Y DECANTACIÓN FÍSICA CON EL TAPIZ
            if (bottomContactY <= floorY) {
              // Resolver penetración
              d.mesh.position.y += (floorY - bottomContactY);

              // Velocidad en el punto de contacto
              const contactVelY = d.vel.y + (d.angVel.x * lowestRz - d.angVel.z * lowestRx);

              if (contactVelY < -0.16 && d.bounceCount < 8) {
                // FASE 1: REBOTES VIVOS Y ALTOS EN EL TAPETE
                d.bounceCount++;
                const restitution = Math.max(0.36, 0.84 - d.bounceCount * 0.06);
                d.vel.y = Math.abs(d.vel.y) * restitution + 0.40 * Math.max(0, 1 - d.bounceCount / 7);

                // Fricción en el suelo que acopla el giro al avance
                d.vel.x *= 0.91;
                d.vel.z *= 0.91;

                // Torque por impacto en esquina
                d.angVel.x += lowestRz * 11.0;
                d.angVel.z -= lowestRx * 11.0;
                d.angVel.y *= 0.90;

                if (t - (d.lastTickTime || 0) > 0.055) {
                  const impactForce = Math.min(1.0, Math.abs(contactVelY) / 2.0);
                  playSound('dice_felt', impactForce);
                  d.lastTickTime = t;
                }
              } else {
                // FASE 2: RODADURA Y TRANSICIÓN DE CAÍDA REALISTA
                d.groundedTimer = (d.groundedTimer || 0) + subDt;
                d.vel.y = 0;

                // Fricción de rodadura en fieltro
                const rollDamp = Math.pow(0.935, subDt * 60);
                d.vel.x *= rollDamp;
                d.vel.z *= rollDamp;

                const horizSpeed = Math.hypot(d.vel.x, d.vel.z);

                if (horizSpeed > 0.30 && d.groundedTimer < 0.6) {
                  // Sigue rodando de esquina a esquina
                  const idealAngVelZ = -d.vel.x / halfSize;
                  const idealAngVelX = d.vel.z / halfSize;
                  d.angVel.x = THREE.MathUtils.lerp(d.angVel.x, idealAngVelX, subDt * 10);
                  d.angVel.z = THREE.MathUtils.lerp(d.angVel.z, idealAngVelZ, subDt * 10);
                  d.angVel.y *= Math.pow(0.88, subDt * 60);
                } else {
                  // FASE 3: DISPARAR CAÍDA Y ASENTAMIENTO ORGÁNICO
                  d.settlingState = 1;
                  d.settleTimer = 0;
                  d.settleStartQuat = d.mesh.quaternion.clone();

                  // Leer la cara que está actualmente más cerca de mirar hacia arriba
                  const currentUpVal = readDieFaceUp(d.mesh);
                  d.value = (typeof d.targetVal === 'number') ? d.targetVal : currentUpVal;

                  let targetIdx = 2; // Default val 1 (+Y)
                  for (let fi = 0; fi < 6; fi++) {
                    if (DIE_FACE_VALUES[fi] === d.value) { targetIdx = fi; break; }
                  }
                  const euler = new THREE.Euler().setFromQuaternion(d.mesh.quaternion, 'YXZ');
                  const yawQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), euler.y);
                  d.targetQuat = yawQuat.clone().multiply(BASE_FACE_QUATS[targetIdx]);

                  // Eje de balanceo/wobble perpendicular a la dirección de avance
                  d.wobbleAxis = (horizSpeed > 0.05) 
                    ? new THREE.Vector3(-d.vel.z, 0, d.vel.x).normalize()
                    : new THREE.Vector3(1, 0, 0);
                  
                  playSound('dice_felt', 0.40);
                }
              }
            }

            // 6. REBOTES CON LAS BANDAS Y BUMPERS DE LA MESA (REBOTES MÁS ALTOS)
            const railRestitution = 0.76;
            if (d.mesh.position.x > boundX) {
              d.mesh.position.x = boundX;
              if (d.vel.x > 0) {
                const railForce = Math.min(1.0, Math.abs(d.vel.x) / 2.0);
                d.vel.x = -d.vel.x * railRestitution;
                d.vel.y += 0.52;
                d.angVel.z = -d.angVel.z * 0.75;
                if (t - (d.lastTickTime || 0) > 0.06) { playSound('dice_rail', railForce); d.lastTickTime = t; }
              }
            } else if (d.mesh.position.x < -boundX) {
              d.mesh.position.x = -boundX;
              if (d.vel.x < 0) {
                const railForce = Math.min(1.0, Math.abs(d.vel.x) / 2.0);
                d.vel.x = -d.vel.x * railRestitution;
                d.vel.y += 0.52;
                d.angVel.z = -d.angVel.z * 0.75;
                if (t - (d.lastTickTime || 0) > 0.06) { playSound('dice_rail', railForce); d.lastTickTime = t; }
              }
            }

            if (d.mesh.position.z > boundZ) {
              d.mesh.position.z = boundZ;
              if (d.vel.z > 0) {
                const railForce = Math.min(1.0, Math.abs(d.vel.z) / 2.0);
                d.vel.z = -d.vel.z * railRestitution;
                d.vel.y += 0.52;
                d.angVel.x = -d.angVel.x * 0.75;
                if (t - (d.lastTickTime || 0) > 0.06) { playSound('dice_rail', railForce); d.lastTickTime = t; }
              }
            } else if (d.mesh.position.z < -boundZ) {
              d.mesh.position.z = -boundZ;
              if (d.vel.z < 0) {
                const railForce = Math.min(1.0, Math.abs(d.vel.z) / 2.0);
                d.vel.z = -d.vel.z * railRestitution;
                d.vel.y += 0.52;
                d.angVel.x = -d.angVel.x * 0.75;
                if (t - (d.lastTickTime || 0) > 0.06) { playSound('dice_rail', railForce); d.lastTickTime = t; }
              }
            }
          });

          // 7. COLISIÓN 3D AVANZADA ENTRE DADOS (REBOTES, TORQUE Y DEFLEXIÓN REAL)
          const minDist = 0.375; // Envolvente de colisión considerando aristas y esquinas de cubos
          for (let i = 0; i < all.length; i++) {
            for (let j = i + 1; j < all.length; j++) {
              const d1 = all[i];
              const d2 = all[j];

              // Si alguno de los dos dados está siendo levantado o sostenido por la grúa, ignorar colisiones
              if (d1.phase === 'lifting' || d1.phase === 'holding' || d2.phase === 'lifting' || d2.phase === 'holding') continue;

              const dx = d2.mesh.position.x - d1.mesh.position.x;
              const dy = d2.mesh.position.y - d1.mesh.position.y;
              const dz = d2.mesh.position.z - d1.mesh.position.z;
              const distSq = dx * dx + dy * dy + dz * dz;

              if (distSq > 0.00001 && distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const overlap = (minDist - dist);

                const nx = dx / dist;
                const ny = dy / dist;
                const nz = dz / dist;

                // Separación anti-penetración
                const pushX = nx * overlap * 0.52;
                const pushY = ny * overlap * 0.52;
                const pushZ = nz * overlap * 0.52;

                if (!d1.settled) {
                  d1.mesh.position.x -= pushX;
                  d1.mesh.position.y -= pushY;
                  d1.mesh.position.z -= pushZ;
                }
                if (!d2.settled) {
                  d2.mesh.position.x += pushX;
                  d2.mesh.position.y += pushY;
                  d2.mesh.position.z += pushZ;
                }

                // Velocidad relativa normal
                const rvx = d2.vel.x - d1.vel.x;
                const rvy = d2.vel.y - d1.vel.y;
                const rvz = d2.vel.z - d1.vel.z;
                const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

                if (velAlongNormal < 0) {
                  // Restitución elástica viva de dados de acrílico (~80%)
                  const restitution = 0.80;
                  const impulseMag = -(1 + restitution) * velAlongNormal * 0.5;

                  const impX = nx * impulseMag;
                  const impY = ny * impulseMag;
                  const impZ = nz * impulseMag;

                  // Aplicar impulso lineal
                  if (!d1.settled) {
                    d1.vel.x -= impX;
                    d1.vel.y -= impY;
                    d1.vel.z -= impZ;
                  }
                  if (!d2.settled) {
                    d2.vel.x += impX;
                    d2.vel.y += impY;
                    d2.vel.z += impZ;
                  }

                  // TORQUE Y DEFLEXIÓN ANGULAR POR IMPACTO DESCENTRADO (RICOSHET REAL)
                  // Vector normal a la colisión genera giro de deflexión
                  const torqueZ = (nx * 14.0 + (Math.random() - 0.5) * 6.0) * impulseMag;
                  const torqueX = (nz * 14.0 + (Math.random() - 0.5) * 6.0) * impulseMag;
                  const torqueY = ((Math.random() - 0.5) * 12.0) * impulseMag;

                  if (!d1.settled) {
                    d1.angVel.x -= torqueX;
                    d1.angVel.y -= torqueY;
                    d1.angVel.z -= torqueZ;
                  }
                  if (!d2.settled) {
                    d2.angVel.x += torqueX;
                    d2.angVel.y += torqueY;
                    d2.angVel.z += torqueZ;
                  }

                  // Si un dado ya estaba asentándose pero recibe un impacto fuerte, se reactiva
                  if (impulseMag > 0.45) {
                    if (d1.settlingState === 1) d1.settlingState = 0;
                    if (d2.settlingState === 1) d2.settlingState = 0;
                  }

                  if (Math.abs(velAlongNormal) > 0.12) {
                    const clackImpact = Math.min(1.0, Math.abs(velAlongNormal) / 1.8);
                    playSound('dice_clack', clackImpact);
                  }
                }
              }
            }
          }
        }

        if (allSettled && !activeDiceRoll.resolved) {
          activeDiceRoll.resolved = true;
          window.isDicePhysicsActive = false;
          if (activeDiceRoll.versusData) {
            resolveDiceVersusDuel(activeDiceRoll.versusData);
          } else {
            resolveDiceDuel(activeDiceRoll);
          }
        }
      }

      function resolveDiceDuel(roll) {
        // Leer directamente y de forma veraz la cara física superior (+Y) de cada dado en el mundo 3D
        roll.player[0].value = readDieFaceUp(roll.player[0].mesh);
        roll.player[1].value = readDieFaceUp(roll.player[1].mesh);
        roll.house[0].value = readDieFaceUp(roll.house[0].mesh);
        roll.house[1].value = readDieFaceUp(roll.house[1].mesh);

        const p1 = roll.player[0].value, p2 = roll.player[1].value;
        const h1 = roll.house[0].value, h2 = roll.house[1].value;
        const pSum = p1 + p2, hSum = h1 + h2;

        document.getElementById('myDice').innerHTML =
          '<div class="die" style="background:#1d4ed8; color:#ffffff; border: 2px solid #93c5fd; box-shadow:0 0 10px rgba(59,130,246,0.6);">' + DICE_FACE_EMOJI[p1] + '</div><div class="die" style="background:#1d4ed8; color:#ffffff; border: 2px solid #93c5fd; box-shadow:0 0 10px rgba(59,130,246,0.6);">' + DICE_FACE_EMOJI[p2] + '</div>';
        document.getElementById('houseDice').innerHTML =
          '<div class="die" style="background:#dc2626; color:#ffffff; border: 2px solid #fca5a5; box-shadow:0 0 10px rgba(239,68,68,0.6);">' + DICE_FACE_EMOJI[h1] + '</div><div class="die" style="background:#dc2626; color:#ffffff; border: 2px solid #fca5a5; box-shadow:0 0 10px rgba(239,68,68,0.6);">' + DICE_FACE_EMOJI[h2] + '</div>';
        document.getElementById('mySum').textContent = pSum;
        document.getElementById('houseSum').textContent = hSum;

        const banner = document.getElementById('diceResultBanner');
        const title = document.getElementById('diceResultTitle');
        const msg = document.getElementById('diceResultMsg');

        if (pSum > hSum) {
          state.balance += dState.bet * 2; updateBalanceUI();
          title.textContent = '¡GANASTE EL BOTE!'; title.style.color = '#4ade80';
          msg.className = 'win'; msg.textContent = '+$' + dState.bet + ' (Bote: $' + (dState.bet * 2) + ')';
          triggerConfetti(); addXP(80);
          playSound('win');
        } else if (pSum < hSum) {
          title.textContent = 'PERDISTE'; title.style.color = '#f87171';
          msg.className = 'lose'; msg.textContent = '-$' + dState.bet;
          playSound('lose');
        } else {
          state.balance += dState.bet; updateBalanceUI();
          title.textContent = 'EMPATE'; title.style.color = '#d4d4d8';
          msg.className = 'win'; msg.textContent = 'Apuestas devueltas ($' + dState.bet + ')';
        }
        banner.classList.add('show');
        dState.rolling = false;
      }

      function resolveDiceVersusDuel(res) {
        if (activeDiceRoll && activeDiceRoll.player && activeDiceRoll.house) {
          activeDiceRoll.player[0].value = readDieFaceUp(activeDiceRoll.player[0].mesh);
          activeDiceRoll.player[1].value = readDieFaceUp(activeDiceRoll.player[1].mesh);
          activeDiceRoll.house[0].value = readDieFaceUp(activeDiceRoll.house[0].mesh);
          activeDiceRoll.house[1].value = readDieFaceUp(activeDiceRoll.house[1].mesh);
        }

        const p1_1 = (activeDiceRoll && activeDiceRoll.player[0]) ? activeDiceRoll.player[0].value : res.player1Dice[0];
        const p1_2 = (activeDiceRoll && activeDiceRoll.player[1]) ? activeDiceRoll.player[1].value : res.player1Dice[1];
        const p2_1 = (activeDiceRoll && activeDiceRoll.house[0]) ? activeDiceRoll.house[0].value : res.player2Dice[0];
        const p2_2 = (activeDiceRoll && activeDiceRoll.house[1]) ? activeDiceRoll.house[1].value : res.player2Dice[1];

        document.getElementById('myDice').innerHTML =
          '<div class="die" style="background:#1d4ed8; color:#ffffff; border: 2px solid #93c5fd; box-shadow:0 0 10px rgba(59,130,246,0.6);">' + DICE_FACE_EMOJI[p1_1] + '</div><div class="die" style="background:#1d4ed8; color:#ffffff; border: 2px solid #93c5fd; box-shadow:0 0 10px rgba(59,130,246,0.6);">' + DICE_FACE_EMOJI[p1_2] + '</div>';
        document.getElementById('houseDice').innerHTML =
          '<div class="die" style="background:#dc2626; color:#ffffff; border: 2px solid #fca5a5; box-shadow:0 0 10px rgba(239,68,68,0.6);">' + DICE_FACE_EMOJI[p2_1] + '</div><div class="die" style="background:#dc2626; color:#ffffff; border: 2px solid #fca5a5; box-shadow:0 0 10px rgba(239,68,68,0.6);">' + DICE_FACE_EMOJI[p2_2] + '</div>';
        document.getElementById('mySum').textContent = res.player1Total;
        document.getElementById('houseSum').textContent = res.player2Total;

        const banner = document.getElementById('diceResultBanner');
        const title = document.getElementById('diceResultTitle');
        const msg = document.getElementById('diceResultMsg');

        if (typeof socket !== 'undefined' && socket && res.winnerId === socket.id) {
          title.textContent = '¡TE LLEVAS EL BOTE!'; title.style.color = '#4ade80';
          msg.className = 'win'; msg.textContent = '+$' + res.finalBet + ' (Bote total: $' + (res.finalBet * 2) + ')';
          triggerConfetti(); addXP(100);
          playSound('win');
        } else if (res.winnerId) {
          title.textContent = 'PERDISTE EL BOTE'; title.style.color = '#f87171';
          msg.className = 'lose'; msg.textContent = '-$' + res.finalBet;
          playSound('lose');
        } else {
          title.textContent = 'EMPATE'; title.style.color = '#d4d4d8';
          msg.className = 'win'; msg.textContent = 'Bote reembolsado';
        }
        banner.classList.add('show');
        dState.rolling = false;
      }

      /* ============================================================
         3. DADOS VERSUS 1v1 MULTIPLAYER CLIENT LOGIC
      ============================================================ */
      // diceCurrentMode initialized at top
      var diceVersusState = null;
      const diceProcessedRolls = new Set();

      function updateDiceTableUI(vsData) {
        const statusBox = document.getElementById('diceVersusStatusBox');
        const statusMsgEl = document.getElementById('diceVersusStatusMsg');
        const rollBtn = document.getElementById('diceRollBtn');
        const betBtn = document.getElementById('diceVersusBetBtn');
        const acceptBtn = document.getElementById('diceVersusAcceptBtn');
        const rejectBtn = document.getElementById('diceVersusRejectBtn');
        const p1Who = document.getElementById('diceP1Who');
        const p2Who = document.getElementById('diceP2Who');
        const subTitle = document.getElementById('diceSubTitle');

        if (vsData && vsData.player1 && vsData.player2) {
          // MODO 1v1 VERSUS AUTOMÁTICO (2 JUGADORES SENTADOS)
          diceCurrentMode = 'versus';
          if (statusBox) statusBox.style.display = 'block';
          if (statusMsgEl) statusMsgEl.textContent = vsData.statusMsg || 'DADOS 1v1 · BOTE';

          if (subTitle) {
            subTitle.textContent = `⚔️ DUELO 1v1 · BOTE EN JUEGO: $${vsData.finalBet * 2} ($${vsData.finalBet} cada uno)`;
          }

          if (p1Who) p1Who.textContent = `🔵 ${vsData.player1.name} (AZUL)`;
          if (p2Who) p2Who.textContent = `🔴 ${vsData.player2.name} (ROJO)`;

          const isLocalP1 = typeof socket !== 'undefined' && socket && vsData.player1.id === socket.id;
          const isLocalP2 = typeof socket !== 'undefined' && socket && vsData.player2.id === socket.id;
          const localUser = isLocalP1 ? vsData.player1 : (isLocalP2 ? vsData.player2 : null);
          const otherUser = isLocalP1 ? vsData.player2 : (isLocalP2 ? vsData.player1 : null);

          if (vsData.status === 'PLAYER_2_JOINED') {
            if (rollBtn) { rollBtn.style.display = 'inline-block'; rollBtn.textContent = 'APOSTAR AL BOTE 🎲'; }
            if (betBtn) betBtn.style.display = 'none';
            if (acceptBtn) acceptBtn.style.display = 'none';
            if (rejectBtn) rejectBtn.style.display = 'none';
          } else if (vsData.status === 'BET_PROPOSED') {
            if (localUser && localUser.accepted) {
              if (rollBtn) rollBtn.style.display = 'none';
              if (betBtn) betBtn.style.display = 'none';
              if (acceptBtn) acceptBtn.style.display = 'none';
              if (rejectBtn) rejectBtn.style.display = 'none';
            } else if (otherUser && otherUser.accepted) {
              if (rollBtn) rollBtn.style.display = 'none';
              if (betBtn) betBtn.style.display = 'none';
              if (acceptBtn) { acceptBtn.style.display = 'inline-block'; acceptBtn.textContent = `ACEPTAR BOTE $${vsData.finalBet * 2} Y TIRAR 👍`; }
              if (rejectBtn) rejectBtn.style.display = 'inline-block';
            } else {
              if (rollBtn) { rollBtn.style.display = 'inline-block'; rollBtn.textContent = 'APOSTAR AL BOTE 🎲'; }
              if (betBtn) betBtn.style.display = 'none';
              if (acceptBtn) acceptBtn.style.display = 'none';
              if (rejectBtn) rejectBtn.style.display = 'none';
            }
          } else if (vsData.status === 'BET_LOCKED' || vsData.status === 'ROLLING' || vsData.status === 'SETTLED') {
            if (rollBtn) rollBtn.style.display = 'none';
            if (betBtn) betBtn.style.display = 'none';
            if (acceptBtn) acceptBtn.style.display = 'none';
            if (rejectBtn) rejectBtn.style.display = 'none';
          }
        } else {
          // MODO SOLO CONTRA LA CASA (1 JUGADOR SENTADO)
          diceCurrentMode = 'solo';
          if (statusBox) statusBox.style.display = 'none';
          if (subTitle) subTitle.textContent = 'TÚ VS LA CASA · GANA MÁS ALTO';
          if (p1Who) p1Who.textContent = '🔵 TÚ (DADOS AZULES)';
          if (p2Who) p2Who.textContent = '🔴 LA CASA (DADOS ROJOS)';
          if (rollBtn) { rollBtn.style.display = 'inline-block'; rollBtn.textContent = 'TIRAR 🎲'; }
          if (betBtn) betBtn.style.display = 'none';
          if (acceptBtn) acceptBtn.style.display = 'none';
          if (rejectBtn) rejectBtn.style.display = 'none';
        }
      }

      if (typeof socket !== 'undefined' && socket) {
        socket.on('diceVersusState', (vsData) => {
          if (!vsData) return;
          diceVersusState = vsData;
          updateDiceTableUI(vsData);
        });

        socket.on('diceVersusRollStart', (data) => {
          playSound('dice');
          document.getElementById('diceResultBanner').classList.remove('show');
          const statusMsgEl = document.getElementById('diceVersusStatusMsg');
          if (statusMsgEl) statusMsgEl.textContent = '¡Preparados! ¡Lanzando dados...!';
        });

        socket.on('diceVersusRollResult', (resData) => {
          if (!resData || !resData.rollId) return;
          if (diceProcessedRolls.has(resData.rollId)) return;
          diceProcessedRolls.add(resData.rollId);

          rollDiceVersus3D(resData);
        });

        socket.on('diceVersusSettled', (settledData) => {
          if (!settledData) return;
          if (socket.id === settledData.winnerId) {
            state.balance += settledData.finalBet;
            updateBalanceUI();
          } else if (settledData.winnerId && (socket.id === settledData.player1Id || socket.id === settledData.player2Id)) {
            state.balance -= settledData.finalBet;
            updateBalanceUI();
          }
        });
      }

      function rollDiceVersus3D(resData) {
        startDiceCraneRoll(resData.player1Dice, resData.player2Dice, resData);
      }

      document.getElementById('diceVersusAcceptBtn').addEventListener('click', () => {
        if (typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('diceVersusAcceptBet', { matchId: 'dice-versus-1', balance: state.balance });
        }
      });

      document.getElementById('diceVersusRejectBtn').addEventListener('click', () => {
        if (typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('diceVersusRejectBet', { matchId: 'dice-versus-1' });
        }
      });

      document.getElementById('diceRollBtn').addEventListener('click', () => {
        if (dState.rolling) return;
        if (state.balance < dState.bet) { showToast('Saldo insuficiente'); return; }

        if (diceCurrentMode === 'versus' && typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('diceVersusBet', { matchId: 'dice-versus-1', bet: dState.bet, balance: state.balance });
          return;
        }

        dState.rolling = true;
        state.balance -= dState.bet; updateBalanceUI();
        playSound('dice');
        document.getElementById('diceResultBanner').classList.remove('show');
        rollDiceDuel3D();
      });

// --- Explicit Global Window Bindings ---
if (typeof dState !== 'undefined') window.dState = dState;
if (typeof diceCurrentMode !== 'undefined') window.diceCurrentMode = diceCurrentMode;
if (typeof update3DDiceChips !== 'undefined') window.update3DDiceChips = update3DDiceChips;
if (typeof diceVersusState !== 'undefined') window.diceVersusState = diceVersusState;
if (typeof updateDicePhysics !== 'undefined') window.updateDicePhysics = updateDicePhysics;

// Auto-inicializar fichas 3D en ambas bandejas cuando la escena esté lista
setTimeout(() => {
  if (typeof update3DDiceChips === 'function' && typeof dState !== 'undefined') {
    update3DDiceChips(dState.bet);
  }
}, 300);
