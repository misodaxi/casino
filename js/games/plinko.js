/* ============================================================
         5. 3D REAL-TIME PHYSICAL PLINKO BALL ENGINE
      ============================================================ */
      var activePlinkoBalls = [];
      window.activePlinkoBalls = activePlinkoBalls;
      let plinkoBet = 50;

      // Chip selection for Plinko
      document.querySelectorAll('#chipRackPlinko .chip').forEach(c => {
        c.addEventListener('click', () => {
          document.querySelectorAll('#chipRackPlinko .chip').forEach(x => x.classList.remove('selected'));
          c.classList.add('selected');
          plinkoBet = roundMoney(c.dataset.v);
          document.getElementById('plinkoBetDisplay').textContent = formatMoney(plinkoBet);
        });
      });

      const PLINKO_BALL_GEO = new THREE.SphereGeometry(0.07, 16, 16);
      const PLINKO_BALL_MAT = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.9
      });

      function dropPlinko3DBall() {
        if (state.balance < plinkoBet) { showToast('Saldo insuficiente'); return; }
        state.balance = roundMoney(state.balance - plinkoBet);
        updateBalanceUI();
        playSound('chip');

        if (!plinko3DRefs) return;

        // Shared 3D Glowing Physics Ball Mesh (Zero new allocations)
        const pBallMesh = new THREE.Mesh(PLINKO_BALL_GEO, PLINKO_BALL_MAT);

        // Initial Drop Position at Top Center of 3D Pyramid
        const startX = (Math.random() - 0.5) * 0.18;
        const startY = 5.25;
        const startZ = -0.05 + (5.0 - startY) * Math.sin(0.16) + 0.08;
        pBallMesh.position.set(startX, startY, startZ);
        plinko3DRefs.ballsGroup.add(pBallMesh);

        activePlinkoBalls.push({
          mesh: pBallMesh,
          x: startX,
          y: startY,
          z: startZ,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.6,
          vz: (Math.random() - 0.5) * 0.1,
          bet: plinkoBet
        });
      }

      function updatePlinko3DBalls(dt) {
        if (!plinko3DRefs || activePlinkoBalls.length === 0) return;

        const gravity = 9.8;
        const ballRadius = 0.07;

        for (let i = activePlinkoBalls.length - 1; i >= 0; i--) {
          const ball = activePlinkoBalls[i];

          // Gravity acceleration
          ball.vy -= gravity * dt;

          // Position updates
          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;
          ball.z += ball.vz * dt;

          // Tilted Backboard & Front Glass Dynamic Z-Physics (Exact 3D plane collision math!)
          const zBackSurface = -0.05 + (5.0 - ball.y) * Math.sin(0.16);
          const minZ = zBackSurface + 0.04;
          const maxZ = zBackSurface + 0.12;

          if (ball.z <= minZ) {
            ball.z = minZ;
            ball.vz = Math.abs(ball.vz) * 0.4 + 0.05; // bounce forward off solid backboard
          } else if (ball.z >= maxZ) {
            ball.z = maxZ;
            ball.vz = -Math.abs(ball.vz) * 0.4 - 0.05; // bounce backward off solid front glass
          }

          // Left & Right Side Wall Physics Bounce (Randomized Impulse Range)
          if (ball.x <= -1.98) {
            ball.x = -1.98;
            const bouncePower = 0.35 + Math.random() * 0.55;
            ball.vx = Math.abs(ball.vx) * bouncePower + (0.3 + Math.random() * 0.6); // bounce right inward
            ball.vy += (Math.random() - 0.25) * 0.9; // vertical perturbation
            ball.vz = (Math.random() - 0.5) * 0.3;
            playSound('tick');
          } else if (ball.x >= 1.98) {
            ball.x = 1.98;
            const bouncePower = 0.35 + Math.random() * 0.55;
            ball.vx = -Math.abs(ball.vx) * bouncePower - (0.3 + Math.random() * 0.6); // bounce left inward
            ball.vy += (Math.random() - 0.25) * 0.9; // vertical perturbation
            ball.vz = (Math.random() - 0.5) * 0.3;
            playSound('tick');
          }

          // 3D Peg Collision Checks
          plinko3DRefs.pegs.forEach(peg => {
            const dx = ball.x - peg.x;
            const dy = ball.y - peg.y;
            const dist = Math.hypot(dx, dy);

            if (dist < (ballRadius + 0.04) && dy < 0.04 && dy > -0.06) {
              // Bounce off peg surface with dynamic power range!
              const popPower = 0.30 + Math.random() * 0.40;
              ball.vy = Math.abs(ball.vy) * popPower + (0.5 + Math.random() * 0.4); // bounce up
              ball.vx = (dx >= 0 ? 1 : -1) * (0.9 + Math.random() * 0.9) + (Math.random() - 0.5) * 0.4; // 2D/3D deflection
              ball.vz = (Math.random() - 0.5) * 0.25;

              // Visual flash & sound
              peg.mesh.material.emissive.setHex(0xffffff);
              peg.mesh.material.emissiveIntensity = 2.0;
              setTimeout(() => {
                if (peg.mesh && peg.mesh.material) {
                  peg.mesh.material.emissive.setHex(0xf59e0b);
                  peg.mesh.material.emissiveIntensity = 0.2;
                }
              }, 120);

              playSound('tick');
            }
          });

          ball.mesh.position.set(ball.x, ball.y, ball.z);

          // Bottom Bucket Landing Check (y <= 0.55m)
          if (ball.y <= 0.55) {
            // Find landing multiplier bucket
            const bucketIdx = Math.min(10, Math.max(0, Math.floor((ball.x + 1.95) / (3.9 / 11))));
            const bObj = plinko3DRefs.buckets[bucketIdx] || plinko3DRefs.buckets[5];

            const win = Math.floor(ball.bet * bObj.mult);
            state.balance += win;
            updateBalanceUI();

            if (win >= ball.bet) {
              playSound('win');
              triggerConfetti();
              addXP(60);
            }
            showToast('🎯 ¡Bola aterrizó en ' + bObj.mult + 'X! (+$' + win + ')');

            // Bucket Flash Effect
            if (bObj.mesh && bObj.mesh.material) {
              bObj.mesh.material.emissiveIntensity = 2.5;
              setTimeout(() => {
                if (bObj.mesh && bObj.mesh.material) bObj.mesh.material.emissiveIntensity = 0.3;
              }, 300);
            }

            // Remove ball mesh
            plinko3DRefs.ballsGroup.remove(ball.mesh);
            activePlinkoBalls.splice(i, 1);
          }
        }
      }

      document.getElementById('plinkoDropBtn').addEventListener('click', dropPlinko3DBall);

// --- Explicit Global Window Bindings ---
if (typeof updatePlinko3DBalls !== 'undefined') window.updatePlinko3DBalls = updatePlinko3DBalls;
if (typeof dropPlinko3DBall !== 'undefined') window.dropPlinko3DBall = dropPlinko3DBall;
if (typeof activePlinkoBalls !== 'undefined') window.activePlinkoBalls = activePlinkoBalls;
