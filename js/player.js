/* ============================================================
         HIGH-PERFORMANCE SHARED AVATAR GEOMETRIES & MATERIALS POOL
      ============================================================ */
      var AVATAR_GEO_BODY = new THREE.CylinderGeometry(0.4, 0.45, 0.8, 12);
      var AVATAR_GEO_HEAD = new THREE.SphereGeometry(0.32, 12, 12);
      var AVATAR_GEO_VISOR = new THREE.TorusGeometry(0.16, 0.03, 6, 12);
      var AVATAR_MAT_HEAD = new THREE.MeshStandardMaterial({ color: 0xf2c9a0, roughness: 0.6 });
      var AVATAR_MAT_VISOR = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var AVATAR_MAT_POOL = {};

      function getAvatarBodyMaterial(colorHex) {
        const hexKey = (typeof colorHex === 'number') ? colorHex : 0x8B5CF6;
        if (!AVATAR_MAT_POOL[hexKey]) {
          AVATAR_MAT_POOL[hexKey] = new THREE.MeshStandardMaterial({ color: hexKey, roughness: 0.5 });
        }
        return AVATAR_MAT_POOL[hexKey];
      }

      /* player avatar & floating 3D nametag */
      function createPlayerNameTag(name, colorHex = 0x8B5CF6) {
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 128;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 512, 128);
        const hex = typeof colorHex === 'number' ? '#' + colorHex.toString(16).padStart(6, '0') : '#8B5CF6';
        ctx.fillStyle = 'rgba(15, 10, 26, 0.85)';
        ctx.strokeStyle = hex;
        ctx.lineWidth = 6;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(16, 16, 480, 96, 48);
        } else {
          ctx.rect(16, 16, 480, 96);
        }
        ctx.fill();
        ctx.stroke();

        ctx.font = '900 40px Segoe UI, Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = hex;
        ctx.shadowBlur = 12;
        ctx.fillText(name || 'Jugador', 256, 64);

        const tex = new THREE.CanvasTexture(canvas);
        tex.minFilter = THREE.LinearFilter;
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(2.2, 0.55, 1);
        sprite.position.set(0, 2.15, 0); // Floats above avatar head
        sprite.userData = { canvas, ctx, tex, colorHex };
        return sprite;
      }

      function updatePlayerNameTagText(sprite, newName) {
        if (!sprite || !sprite.userData || !sprite.userData.canvas) return;
        const { canvas, ctx, tex, colorHex } = sprite.userData;
        ctx.clearRect(0, 0, 512, 128);
        const hex = typeof colorHex === 'number' ? '#' + colorHex.toString(16).padStart(6, '0') : '#8B5CF6';
        ctx.fillStyle = 'rgba(15, 10, 26, 0.85)';
        ctx.strokeStyle = hex;
        ctx.lineWidth = 6;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(16, 16, 480, 96, 48);
        } else {
          ctx.rect(16, 16, 480, 96);
        }
        ctx.fill();
        ctx.stroke();

        ctx.font = '900 40px Segoe UI, Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = hex;
        ctx.shadowBlur = 12;
        ctx.fillText(newName || 'Jugador', 256, 64);
        tex.needsUpdate = true;
      }

      function createAvatarMesh(colorHex) {
        const g = new THREE.Group();
        const bodyMat = getAvatarBodyMaterial(colorHex);
        const body = new THREE.Mesh(AVATAR_GEO_BODY, bodyMat);
        body.position.y = 0.8; body.castShadow = true;
        const head = new THREE.Mesh(AVATAR_GEO_HEAD, AVATAR_MAT_HEAD);
        head.position.y = 1.5; head.castShadow = true;
        const visor = new THREE.Mesh(AVATAR_GEO_VISOR, AVATAR_MAT_VISOR);
        visor.position.set(0, 1.52, 0.3); visor.rotation.x = Math.PI / 2;
        g.add(body, head, visor);
        return g;
      }

      var playerAvatar = createAvatarMesh(state.player.color);
      playerAvatar.position.set(state.player.x, 0, state.player.z);

      // Attach 3D floating nametag above local player avatar head
      var localNameTag = createPlayerNameTag(state.player.name || 'Axel', state.player.color);
      playerAvatar.add(localNameTag);
      playerAvatar.userData.nameTag = localNameTag;

      scene.add(playerAvatar);


/* ============================================================
         CONTROLS, MOUSE ORBIT CAMERA & PROXIMITY
      ============================================================ */
      let isDraggingCam = false;
      let previousMousePos = { x: 0, y: 0 };
      let camYaw = Math.PI / 4;
      let camPitch = Math.PI / 6;
      let targetCamYaw = Math.PI / 4;
      let targetCamPitch = Math.PI / 6;
      let targetCamDist = 17;

      const _desiredCamPos = new THREE.Vector3();
      const _lookTargetVec = new THREE.Vector3();
      const _cachedPromptEl = document.getElementById('prompt');
      const _cachedPromptTextEl = document.getElementById('promptText');
      let _lastPromptText = '';
      let _lastPromptVisible = false;

      // Límites de inclinación de cámara: se permite pitch negativo para poder
      // mirar mucho más hacia arriba (techo, TV, carteles) sin que la cámara
      // atraviese el suelo — eso se garantiza aparte con CAM_FLOOR_Y más abajo.
      const CAM_PITCH_MIN = -0.62;   // antes 0.08 → ahora permite mirar bastante más arriba
      const CAM_PITCH_MAX = Math.PI / 2.3;
      const CAM_FLOOR_Y = 0.35;      // altura mínima de la cámara sobre el suelo (nunca la atraviesa)

      window.addEventListener('mousedown', e => {
        if (e.button === 0 || e.button === 2) {
          if (e.target.closest('button, input, textarea, select, .action-btn, .chip, .exit-game-btn, #tvIframeOverlay, #tvYoutubePlayerContainer, iframe, #css3dHost, .tv-modal, .top-right')) {
            return;
          }
          if (state.mode === 'cinema') return;
          isDraggingCam = true;
          previousMousePos = { x: e.clientX, y: e.clientY };
        }
      });

      window.addEventListener('mousemove', e => {
        if (!isDraggingCam) return;
        const deltaX = e.clientX - previousMousePos.x;
        const deltaY = e.clientY - previousMousePos.y;

        targetCamYaw -= deltaX * 0.005;
        targetCamPitch = Math.max(CAM_PITCH_MIN, Math.min(CAM_PITCH_MAX, targetCamPitch + deltaY * 0.005));

        previousMousePos = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mouseup', () => { isDraggingCam = false; });
      window.addEventListener('mouseleave', () => { isDraggingCam = false; });
      window.addEventListener('contextmenu', e => {
        if (e.target.tagName === 'CANVAS' || e.target.id === 'canvas-host') e.preventDefault();
      });

      // Touch Orbit for Mobile / Touchpad
      window.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
          if (e.target.closest('button, input, textarea, select, .action-btn, .chip, .exit-game-btn, #tvIframeOverlay, #tvYoutubePlayerContainer, iframe, #css3dHost, .tv-modal, .top-right')) {
            return;
          }
          if (state.mode === 'cinema') return;
          isDraggingCam = true;
          previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });

      window.addEventListener('touchmove', e => {
        if (!isDraggingCam || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - previousMousePos.x;
        const deltaY = e.touches[0].clientY - previousMousePos.y;

        targetCamYaw -= deltaX * 0.005;
        targetCamPitch = Math.max(CAM_PITCH_MIN, Math.min(CAM_PITCH_MAX, targetCamPitch + deltaY * 0.005));

        previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }, { passive: true });

      window.addEventListener('touchend', () => { isDraggingCam = false; });

      // Mouse Wheel Zoom
      window.addEventListener('wheel', e => {
        targetCamDist = Math.max(7, Math.min(35, targetCamDist + e.deltaY * 0.015));
      }, { passive: true });

      window.addEventListener('keydown', e => {
        if (state.isTypingChat || document.activeElement === chatInput) return;
        state.keys[e.key.toLowerCase()] = true;
        if (e.code) state.keys[e.code.toLowerCase()] = true;
        if (e.key.toLowerCase() === 'e') tryInteract();
        if (e.key === 'Escape') {
          const jukeModal = document.getElementById('jukeboxModalOverlay');
          if (jukeModal && jukeModal.classList.contains('show')) {
            closeJukeboxModal();
          }
        }
      });
      window.addEventListener('keyup', e => {
        if (state.isTypingChat || document.activeElement === chatInput) return;
        state.keys[e.key.toLowerCase()] = false;
        if (e.code) state.keys[e.code.toLowerCase()] = false;
      });

      function updatePlayer(dt) {
        if (state.mode !== 'casino' || state.isTypingChat || document.activeElement === chatInput) {
          if (state.player) { state.player.vx = 0; state.player.vz = 0; }
          return;
        }
        let inForward = 0, inRight = 0;
        if (state.keys['w'] || state.keys['arrowup']) inForward += 1;
        if (state.keys['s'] || state.keys['arrowdown']) inForward -= 1;
        if (state.keys['d'] || state.keys['arrowright']) inRight += 1;
        if (state.keys['a'] || state.keys['arrowleft']) inRight -= 1;

        // Q and E keys for smooth 360 degree camera rotation
        if (state.keys['q']) targetCamYaw -= dt * 2.2;
        if (state.keys['e'] && !state.activeZone) targetCamYaw += dt * 2.2;

        // Joystick input mapping
        inRight += state.joyVec.x;
        inForward -= state.joyVec.y;

        const inputLen = Math.hypot(inRight, inForward);
        if (inputLen > 1) { inRight /= inputLen; inForward /= inputLen; }

        // Camera-relative direction vectors on XZ plane
        const forwardX = -Math.sin(camYaw);
        const forwardZ = -Math.cos(camYaw);
        const rightX = Math.cos(camYaw);
        const rightZ = -Math.sin(camYaw);

        let mx = forwardX * inForward + rightX * inRight;
        let mz = forwardZ * inForward + rightZ * inRight;

        const len = Math.hypot(mx, mz);
        if (len > 1) { mx /= len; mz /= len; }

        // Sprint con Shift: +20% de velocidad de movimiento (9.6 m/s)
        const isSprinting = !!(state.keys['shift'] || state.keys['shiftleft'] || state.keys['shiftright']);
        const baseSpeed = 8.0;
        const speed = isSprinting ? baseSpeed * 1.20 : baseSpeed;

        state.player.vx += (mx * speed - state.player.vx) * Math.min(1, dt * 10);
        state.player.vz += (mz * speed - state.player.vz) * Math.min(1, dt * 10);
        state.player.x += state.player.vx * dt;
        state.player.z += state.player.vz * dt;

        // Physical Wall Collision & Map Boundaries (Aligned Perimeter & Cinema Screen Collision)
        // 1. South & East/West outer perimeter limits
        state.player.z = Math.min(36.8, state.player.z);
        state.player.x = Math.max(-46.8, Math.min(46.8, state.player.x));

        // 2. North boundary (48m in Bowling to z: -84; Cinema stops right at screen face z: -36.0; TV Casino at z: -36.8)
        if (state.player.x < -14.0) {
          // Northwest Bowling Wing: full 48m regulation runway to back wall at z: -84.0
          state.player.z = Math.max(-82.5, state.player.z);
          if (state.player.z < -37.5) {
            state.player.x = Math.min(-15.2, state.player.x);
          }
        } else if (state.player.x <= 14.0) {
          // Cinema 3D Lounge: stops right at the front surface of the 3D Cinema Screen (z: -36.0)
          state.player.z = Math.max(-36.0, state.player.z);
        } else {
          // TV Casino Lounge: bounded by north wall at z: -38.0
          state.player.z = Math.max(-36.8, state.player.z);
        }

        // 3. Interior Room Partition Walls (Dividers at x = -14.0 and x = 14.0 from z: -37.5 to -14.0)
        if (state.player.z >= -37.5 && state.player.z <= -14.0) {
          // Bowling - Cinema Divider Wall at x = -14.0
          if (state.player.x > -14.8 && state.player.x < -13.2) {
            if (state.player.x < -14.0) state.player.x = -14.8;
            else state.player.x = -13.2;
          }
          // Cinema - TV Casino Divider Wall at x = 14.0
          if (state.player.x > 13.2 && state.player.x < 14.8) {
            if (state.player.x < 14.0) state.player.x = 13.2;
            else state.player.x = 14.8;
          }
        }

        if (Math.hypot(state.player.vx, state.player.vz) > 0.1) {
          const targetRot = Math.atan2(state.player.vx, state.player.vz);
          let diff = targetRot - state.player.rotY;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          state.player.rotY += diff * Math.min(1, dt * 14);
        }

        playerAvatar.position.set(state.player.x, 0, state.player.z);
        playerAvatar.rotation.y = state.player.rotY;

        /* camera follow & mouse orbit (Static Vector Reuse - Zero GC) */
        camYaw += (targetCamYaw - camYaw) * Math.min(1, dt * 10);
        camPitch += (targetCamPitch - camPitch) * Math.min(1, dt * 10);
        camDist += (targetCamDist - camDist) * Math.min(1, dt * 10);

        const cx = state.player.x + Math.sin(camYaw) * Math.cos(camPitch) * camDist;
        // Límite de suelo: la cámara nunca desciende por debajo de CAM_FLOOR_Y
        const cy = Math.max(CAM_FLOOR_Y, Math.sin(camPitch) * camDist);
        const cz = state.player.z + Math.cos(camYaw) * Math.cos(camPitch) * camDist;

        _desiredCamPos.set(cx, cy, cz);
        camera.position.lerp(_desiredCamPos, Math.min(1, dt * 8));

        const lookUpFactor = Math.max(0, 0.35 - camPitch);
        const lookTargetY = 1.2 + lookUpFactor * 6.5;
        _lookTargetVec.set(state.player.x, lookTargetY, state.player.z);
        state.camFollowLook.lerp(_lookTargetVec, Math.min(1, dt * 8));
        camera.lookAt(state.camFollowLook);

        /* proximity (Cached DOM Check - Zero Redundant Mutations) */
        let nearest = null, nd = Infinity;
        const zonesList = window.ZONES || ZONES;
        for (let i = 0; i < zonesList.length; i++) {
          const z = zonesList[i];
          const dx = state.player.x - z.x;
          const dz = state.player.z - z.z;
          const d = Math.hypot(dx, dz);
          if (d < z.radius + 1.5 && d < nd) { nd = d; nearest = z; }
        }
        state.activeZone = nearest;

        let neededPrompt = '';
        let showPrompt = false;
        if (nearest) {
          showPrompt = true;
          neededPrompt = (nearest.id === 'jukebox') ? '🎵 Poner Música en la Gramola [E]' : ('Sentarse en ' + nearest.name);
        } else {
          const dJuke = Math.hypot(state.player.x - 11.8, state.player.z - 36.0);
          if (dJuke < 3.8) {
            showPrompt = true;
            neededPrompt = '🎵 Poner Música en la Gramola [E]';
          }
        }

        const promptEl = _cachedPromptEl || document.getElementById('prompt');
        const promptTextEl = _cachedPromptTextEl || document.getElementById('promptText');
        if (promptEl && promptTextEl) {
          if (showPrompt) {
            if (_lastPromptText !== neededPrompt) {
              _lastPromptText = neededPrompt;
              promptTextEl.textContent = neededPrompt;
            }
            if (!_lastPromptVisible) {
              _lastPromptVisible = true;
              promptEl.classList.add('show');
            }
          } else if (_lastPromptVisible) {
            _lastPromptVisible = false;
            promptEl.classList.remove('show');
          }
        }
      }

      /* ============================================================
         CÁMARA ORBITAL EN EL CINE — permite mover/rotar la cámara con
         el ratón (o el dedo) mientras estás sentado viendo la TV 3D,
         reutilizando el mismo arrastre/zoom global de la cámara del mundo.
      ============================================================ */
      function updateCinemaCamera(dt) {
        if (!state.cinemaPivot) return;

        camYaw += (targetCamYaw - camYaw) * Math.min(1, dt * 10);
        camPitch += (targetCamPitch - camPitch) * Math.min(1, dt * 10);
        camDist += (targetCamDist - camDist) * Math.min(1, dt * 10);

        const pivot = state.cinemaPivot;
        const cx = pivot.x + Math.sin(camYaw) * Math.cos(camPitch) * camDist;
        const cy = Math.max(CAM_FLOOR_Y, pivot.y + Math.sin(camPitch) * camDist);
        const cz = pivot.z + Math.cos(camYaw) * Math.cos(camPitch) * camDist;

        camera.position.lerp(new THREE.Vector3(cx, cy, cz), Math.min(1, dt * 8));

        const lookUpFactor = Math.max(0, 0.35 - camPitch);
        const lookY = pivot.y + 3.5 + lookUpFactor * 6.5;
        state.camFollowLook.lerp(new THREE.Vector3(pivot.x, lookY, pivot.z - 6), Math.min(1, dt * 8));
        camera.lookAt(state.camFollowLook);
      }

      /* 360 Degree Seated Camera Orbiting for all Casino Game Tables */
      let userMovedDiceCam = false;
      let diceCinematicCamActive = false;
      let diceSettleCamTimer = 0;

      function updateSeated360Camera(dt) {
        if (!state.seatedPivot) return;

        // Si el usuario mueve/arrastra la cámara o rota con teclas, pasa INMEDIATAMENTE al modo libre
        const manualRotInput = (state.keys && (state.keys['q'] || state.keys['arrowleft'] || state.keys['e'] || state.keys['arrowright']));
        if (state.mode === 'dice' && (manualRotInput || isDraggingCam)) {
          userMovedDiceCam = true;
          if (state.defaultDiceCam && state.defaultDiceCam.toLook) {
            state.seatedPivot.y = THREE.MathUtils.lerp(state.seatedPivot.y, state.defaultDiceCam.toLook.y, dt * 5.0);
          }
        }

        if (state.keys['q'] || state.keys['arrowleft']) targetCamYaw -= dt * 2.0;
        if (state.keys['e'] || state.keys['arrowright']) targetCamYaw += dt * 2.0;

        // SEGUIMIENTO CINEMÁTICO AUTOMÁTICO EN LA TIRADA DE DADOS (SOLO EN EL EJE Y)
        // Se ejecuta automáticamente cada vez que tiras a menos que muevas la cámara en modo libre
        if (state.mode === 'dice' && !userMovedDiceCam && state.defaultDiceCam && activeDiceRoll && activeDiceRoll.player && activeDiceRoll.player[0]) {
          const allDice = activeDiceRoll.player.concat(activeDiceRoll.house);
          
          let avgY = 0;
          let isAnyLiftingOrRolling = false;

          allDice.forEach(d => {
            avgY += d.mesh.position.y;
            if (d.phase === 'lifting' || d.phase === 'holding' || d.phase === 'rolling' || d.settlingState === 1) {
              isAnyLiftingOrRolling = true;
            }
          });
          avgY /= allDice.length;

          const defaultDist = state.defaultDiceCam.camDist;
          const defaultPitch = state.defaultDiceCam.camPitch;
          const defaultYaw = state.defaultDiceCam.camYaw;
          const floorY = (dice3DRefs && typeof dice3DRefs.floorY === 'number') ? dice3DRefs.floorY : 0.92;

          targetCamDist = defaultDist;
          targetCamPitch = defaultPitch;
          targetCamYaw = defaultYaw;

          if (isAnyLiftingOrRolling) {
            diceCinematicCamActive = true;
            // Movimiento puramente en el eje Y: sube junto a los dados y luego baja con ellos
            const heightAboveFloor = Math.max(0, avgY - floorY - 0.168);
            const targetPivotY = state.defaultDiceCam.toLook.y + heightAboveFloor * 0.90;
            state.seatedPivot.set(state.defaultDiceCam.toLook.x, targetPivotY, state.defaultDiceCam.toLook.z);
          } else if (diceCinematicCamActive) {
            // Al terminar, asegura que vuelva suavemente a la altura base del tapete
            if (state.defaultDiceCam.toLook) {
              state.seatedPivot.lerp(state.defaultDiceCam.toLook, dt * 4.0);
            }
          }
        }

        camYaw += (targetCamYaw - camYaw) * Math.min(1, dt * 10);
        camPitch += (targetCamPitch - camPitch) * Math.min(1, dt * 10);
        camDist += (targetCamDist - camDist) * Math.min(1, dt * 10);

        const pivot = state.seatedPivot;
        const cx = pivot.x + Math.sin(camYaw) * Math.cos(camPitch) * camDist;
        const cy = Math.max(CAM_FLOOR_Y, pivot.y + Math.sin(camPitch) * camDist);
        const cz = pivot.z + Math.cos(camYaw) * Math.cos(camPitch) * camDist;

        camera.position.lerp(new THREE.Vector3(cx, cy, cz), Math.min(1, dt * 8));
        state.camFollowLook.lerp(pivot, Math.min(1, dt * 8));
        camera.lookAt(state.camFollowLook);
      }

      function tryInteract() {
        if (state.mode !== 'casino') return;
        if (state.activeZone) {
          if (state.activeZone.id === 'jukebox') {
            openJukeboxModal();
            return;
          }
          openGameOverlay(state.activeZone.id);
          return;
        }
        const dJuke = Math.hypot(state.player.x - 11.8, state.player.z - 36.0);
        if (dJuke < 3.8) {
          openJukeboxModal();
        }
      }

      document.getElementById('prompt').addEventListener('click', tryInteract);

      /* toast helper */
      let toastTimer = null;
      function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg; t.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
      }

      function updateBalanceUI() {
        document.getElementById('balanceDisplay').textContent = '$' + state.balance.toLocaleString('en-US');
      }

      function addXP(amount) {
        state.xp += amount;
        if (state.xp >= 1000) {
          state.xp -= 1000;
          state.level++;
          triggerConfetti();
          showToast('¡SUBISTE AL NIVEL ' + state.level + '! 🎉');
        }
        document.getElementById('xpFill').style.width = (state.xp / 10) + '%';
        document.getElementById('playerLvlText').textContent = 'Nivel ' + state.level + ' · ' + state.xp + '/1000 XP';
      }

      /* avatar tag projection (Disabled in favor of native 3D floating sprite nametag) */
      const avatarTag = document.getElementById('avatarTag');
      function updateAvatarTag() {
        if (avatarTag) avatarTag.style.display = 'none';
      }

      /* ============================================================
         CAMERA TRANSITION & OVERLAYS (WORLD IS MAIN UI)
      ============================================================ */
      function getClosestAvailableSeat(z, px, pz) {
        if (!z || !z.seats || z.seats.length === 0) {
          return { x: z.x, z: z.z + 1.5, r: Math.PI, seatIndex: 0 };
        }

        // Collect all currently occupied seat indices in zone z
        const occupiedIndices = new Set();

        // Local player seat
        if (state.player.currentSeat && state.player.currentSeat.zone === z.id && typeof state.player.currentSeat.seatIndex === 'number') {
          occupiedIndices.add(state.player.currentSeat.seatIndex);
        }

        // Remote online players seats
        if (typeof remotePlayers !== 'undefined') {
          Object.values(remotePlayers).forEach(rp => {
            if (rp.seat && rp.seat.zone === z.id && typeof rp.seat.seatIndex === 'number') {
              occupiedIndices.add(rp.seat.seatIndex);
            }
          });
        }

        // Bots seats
        if (typeof BOTS !== 'undefined') {
          BOTS.forEach(b => {
            if (b.seat && b.seat.zone === z.id && typeof b.seat.seatIndex === 'number') {
              occupiedIndices.add(b.seat.seatIndex);
            }
          });
        }

        let bestSeat = null;
        let bestDist = Infinity;

        // 1. Find nearest seat among UNOCCUPIED seats
        z.seats.forEach((seat, idx) => {
          if (!occupiedIndices.has(idx)) {
            const dist = Math.hypot(px - seat.x, pz - seat.z);
            if (dist < bestDist) {
              bestDist = dist;
              bestSeat = { ...seat, seatIndex: idx };
            }
          }
        });

        // 2. If all seats are occupied, notify user and select closest seat
        if (!bestSeat) {
          showToast('⚠️ Todos los asientos de esta mesa están ocupados');
          z.seats.forEach((seat, idx) => {
            const dist = Math.hypot(px - seat.x, pz - seat.z);
            if (dist < bestDist) {
              bestDist = dist;
              bestSeat = { ...seat, seatIndex: idx };
            }
          });
        }

        return bestSeat;
      }

      let currentCamTransitionId = 0;

      function openGameOverlay(gameId) {
        const transId = ++currentCamTransitionId;
        state.savedCasinoCam = { pos: camera.position.clone(), look: state.camFollowLook.clone() };
        state.mode = 'transition';
        document.getElementById('prompt').classList.remove('show');
        document.querySelectorAll('.game-overlay').forEach(wrap => wrap.classList.remove('show'));

        // Ocultar etiquetas flotantes para no obstaculizar la visión 3D
        Object.values(zoneMeshes).forEach(zm => {
          if (zm.label) zm.label.visible = false;
        });

        const z = ZONES.find(x => x.id === gameId);
        const seat = getClosestAvailableSeat(z, state.player.x, state.player.z);

        // Store active seat on local player state
        state.player.currentSeat = { zone: z.id, seatIndex: seat.seatIndex };

        // Move avatar physically to closest unoccupied table seat socket (sitting ON top of cushion!)
        const seatSittingY = 0.44;
        playerAvatar.position.set(seat.x, seatSittingY, seat.z);
        playerAvatar.rotation.y = seat.r;
        state.player.x = seat.x;
        state.player.z = seat.z;
        state.player.rotY = seat.r;

        // Hide local player's 3D floating nametag for self while seated, keeping it visible to others
        if (playerAvatar && playerAvatar.userData && playerAvatar.userData.nameTag) {
          playerAvatar.userData.nameTag.visible = false;
        }
        if (playerAvatar) {
          playerAvatar.visible = true;
        }

        if (gameId === 'blackjack') {
          if (window.bj3DRefs && window.bj3DRefs.cardsGroup) {
            const grp = window.bj3DRefs.cardsGroup;
            while (grp.children && grp.children.length > 0) grp.remove(grp.children[0]);
            if (typeof bjDealt3DMeshes !== 'undefined') bjDealt3DMeshes = {};
          }
          if (window.bj3DRefs && window.bj3DRefs.update3DBJChipRackSelection) {
            window.bj3DRefs.update3DBJChipRackSelection();
          }
          const dealBtn = document.getElementById('bjDealBtn');
          const hitBtn = document.getElementById('bjHitBtn');
          const standBtn = document.getElementById('bjStandBtn');
          const doubleBtn = document.getElementById('bjDoubleBtn');
          const playerScoreEl = document.getElementById('playerScore');
          const dealerScoreEl = document.getElementById('dealerScore');
          const banner = document.getElementById('bjResultBanner');
          if (dealBtn) { dealBtn.style.display = 'inline-block'; dealBtn.textContent = 'REPARTIR 🃏'; }
          if (hitBtn) hitBtn.style.display = 'none';
          if (standBtn) standBtn.style.display = 'none';
          if (doubleBtn) doubleBtn.style.display = 'none';
          if (playerScoreEl) playerScoreEl.textContent = 'Puntos: –';
          if (dealerScoreEl) dealerScoreEl.textContent = 'Puntos: –';
          if (banner) banner.classList.remove('show');
          bjState.player = [];
          bjState.dealer = [];
          bjState.player3DMeshes = [];
          bjState.dealer3DMeshes = [];
          bjState.active = false;
        }

        if (gameId === 'poker') {
          const seatIdx = (seat && typeof seat.seatIndex === 'number') ? seat.seatIndex : 0;
          if (typeof initPokerTable === 'function') {
            initPokerTable(seatIdx);
          }
        }

        // Emit updated position and seat reservation via Socket.IO
        if (typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('updateTransform', {
            x: seat.x,
            z: seat.z,
            rotY: seat.r,
            name: state.player.name || 'Axel',
            seat: state.player.currentSeat
          });
          if (gameId === 'roulette') {
            socket.emit('rouletteJoin', { rouletteId: 'roulette', seatIndex: seat.seatIndex });
          } else if (gameId === 'blackjack') {
            socket.emit('blackjackJoin', { blackjackId: 'blackjack', seatIndex: seat.seatIndex, bet: bjState.bet || 50 });
          } else if (gameId === 'dice') {
            socket.emit('diceVersusJoin', { matchId: 'dice-versus-1', seatIndex: (seat && typeof seat.seatIndex === 'number') ? seat.seatIndex : 0, name: (state.player && state.player.name) ? state.player.name : 'Jugador', balance: state.balance });
          } else if (gameId === 'coin') {
            socket.emit('coinVersusJoin', { matchId: 'coin-versus-1', seatIndex: (seat && typeof seat.seatIndex === 'number') ? seat.seatIndex : 0, bet: coinState.bet || 50, balance: state.balance });
          }
        }

        // Custom camera angles for optimal 3D game view
        let toPos = new THREE.Vector3(seat.x, 2.2, seat.z + 2.5);
        let toLook = new THREE.Vector3(seat.x, 1.2, seat.z);

        if (gameId === 'roulette') {
          // Elevated high-angle camera overlooking the wheel bowl and betting felt
          const eyeY = 4.40;
          const camDistBehind = 0.55;
          toPos = new THREE.Vector3(
            seat.x - Math.sin(seat.r) * camDistBehind,
            eyeY,
            seat.z - Math.cos(seat.r) * camDistBehind
          );
          toLook = new THREE.Vector3(
            z.x + (seat.x - z.x) * 0.15,
            0.78,
            z.z + 0.30
          );
          if (roulette3DRefs && roulette3DRefs.update3DChipRackSelection) roulette3DRefs.update3DChipRackSelection();
        } else if (gameId === 'plinko') {
          toPos = new THREE.Vector3(z.x, 3.8, z.z + 4.6);
          toLook = new THREE.Vector3(z.x, 2.8, z.z - 3.2);
        } else if (gameId === 'dice') {
          // Elevated high-angle camera overlooking the dice craps table felt and chip tray
          const eyeY = 4.30;
          const backDist = 0.50;
          toPos = new THREE.Vector3(
            seat.x - Math.sin(seat.r) * backDist,
            eyeY,
            seat.z - Math.cos(seat.r) * backDist
          );
          toLook = new THREE.Vector3(
            z.x,
            0.92,
            z.z
          );
          if (typeof update3DDiceChips === 'function') update3DDiceChips(dState.bet);
          if (dice3DRefs && dice3DRefs.update3DDiceChipRackSelection) {
            dice3DRefs.update3DDiceChipRackSelection();
          }
        } else if (gameId === 'coin') {
          // Elevated perspective from the player seat looking across the central toss basin, both betting trays, and chip rack
          const eyeY = 4.30;
          const backDist = 0.50;
          toPos = new THREE.Vector3(
            seat.x - Math.sin(seat.r) * backDist,
            eyeY,
            seat.z - Math.cos(seat.r) * backDist
          );
          toLook = new THREE.Vector3(
            z.x,
            0.92,
            z.z
          );
          if (typeof updateCoinDuelUI === 'function') updateCoinDuelUI();
          if (coin3DRefs && coin3DRefs.update3DCoinChipRackSelection) {
            coin3DRefs.update3DCoinChipRackSelection();
          }
        } else if (gameId === 'mines') {
          toPos = new THREE.Vector3(z.x, 5.2, z.z + 4.2);
          toLook = new THREE.Vector3(z.x, 0.78, z.z - 0.1);
        } else if (gameId === 'bowling') {
          toPos = new THREE.Vector3(z.x, 3.2, z.z + 7.5);
          toLook = new THREE.Vector3(z.x, 1.4, z.z - 3.5);
        } else if (gameId === 'tvcasino') {
          toPos = new THREE.Vector3(z.x, 2.8, z.z + 4.5);
          toLook = new THREE.Vector3(z.x, 4.0, z.z - 6.0);
        } else if (gameId === 'slots' || gameId === 'pachinko' || gameId === 'tragaperras') {
          // Cámara en primera persona real del jugador sentado en la banqueta mirando de frente a la pantalla 3D
          toPos = new THREE.Vector3(seat.x, 1.28, seat.z - 0.08);
          toLook = new THREE.Vector3(seat.x, 1.25, z.z + 0.435);
          if (playerAvatar) {
            playerAvatar.visible = false;
          }
        } else if (gameId === 'poker') {
          // Elevated high-angle camera overlooking the seated player position and circular table center
          const eyeY = 4.60;
          const backDist = 0.65;
          toPos = new THREE.Vector3(
            seat.x - Math.sin(seat.r) * backDist,
            eyeY,
            seat.z - Math.cos(seat.r) * backDist
          );
          toLook = new THREE.Vector3(
            z.x,
            0.85,
            z.z
          );
          if (window.poker3DRefs && window.poker3DRefs.update3DPokerChipRackSelection) {
            window.poker3DRefs.update3DPokerChipRackSelection();
          }
        } else if (gameId === 'jackpot') {
          toPos = new THREE.Vector3(z.x, 3.6, z.z + 4.8);
          toLook = new THREE.Vector3(z.x, 1.4, z.z);
        } else if (gameId === 'bar') {
          toPos = new THREE.Vector3(z.x, 3.0, z.z + 5.2);
          toLook = new THREE.Vector3(z.x, 1.4, z.z);
        } else if (gameId === 'wheel') {
          // Perspectiva elevada desde el asiento VIP mirando hacia el centro de la ruleta horizontal
          const eyeY = 3.60;
          const backDist = 0.60;
          toPos = new THREE.Vector3(
            seat.x - Math.sin(seat.r) * backDist,
            eyeY,
            seat.z - Math.cos(seat.r) * backDist
          );
          toLook = new THREE.Vector3(
            z.x,
            0.80,
            z.z
          );
        } else if (gameId === 'blackjack') {
          // Elevated high-angle camera well above the player's head with a steep downward perspective
          const eyeY = 4.60;
          const backDist = 0.65;
          toPos = new THREE.Vector3(
            seat.x - Math.sin(seat.r) * backDist,
            eyeY,
            seat.z - Math.cos(seat.r) * backDist
          );
          toLook = new THREE.Vector3(
            seat.x + Math.sin(seat.r) * 1.80,
            0.85,
            seat.z + Math.cos(seat.r) * 1.80
          );
          if (typeof update3DBJChips === 'function') update3DBJChips(bjState.bet);
        } else if (gameId === 'cinema') {
          const seatY = (typeof seat.y === 'number') ? seat.y : 0.30;
          toPos = new THREE.Vector3(seat.x, seatY + 1.25, seat.z + 0.15);
          toLook = new THREE.Vector3(seat.x * 0.2, 5.6, -36.5);
          state.cinemaPivot = new THREE.Vector3(seat.x, seatY + 1.20, seat.z);
        }

        const start = performance.now();
        function step(now) {
          if (transId !== currentCamTransitionId) return;
          let t = Math.min(1, (now - start) / 900);
          camera.position.lerpVectors(state.savedCasinoCam.pos, toPos, t);
          camera.lookAt(new THREE.Vector3().lerpVectors(state.savedCasinoCam.look, toLook, t));
          if (t < 1) requestAnimationFrame(step);
          else {
            if (transId !== currentCamTransitionId) return;
            if (state.mode === 'casino') {
              document.querySelectorAll('.game-overlay').forEach(w => w.classList.remove('show'));
              return;
            }
            state.mode = gameId;
            document.querySelectorAll('.game-overlay').forEach(w => w.classList.remove('show'));
            const wrap = document.getElementById(gameId + 'Wrap');
            if (wrap) wrap.classList.add('show');
            if (gameId === 'pachinko') {
              window.pachinkoBet = Math.max(300, window.pachinkoBet || 300);
              const d = document.getElementById('pachinkoBetDisplay');
              if (d) d.textContent = formatMoney(window.pachinkoBet);
              const rack = document.getElementById('pachinkoChipRack');
              if (rack) {
                rack.querySelectorAll('.chip').forEach(x => {
                  if (parseInt(x.dataset.v, 10) === window.pachinkoBet) x.classList.add('selected');
                  else x.classList.remove('selected');
                });
              }
            }
            if (gameId === 'cinema') {
              if (typeof updateCinemaVideoTitleDisplay === 'function') {
                updateCinemaVideoTitleDisplay();
              }
              if (typeof socket !== 'undefined' && socket && socket.connected) {
                socket.emit('tvSyncReq');
              }
            }

            const pivot = (gameId === 'cinema' && state.cinemaPivot) ? state.cinemaPivot : toLook;
            state.seatedPivot = pivot;

            const dx = toPos.x - pivot.x;
            const dz = toPos.z - pivot.z;
            const horiz = Math.max(0.001, Math.hypot(dx, dz));
            const dy = toPos.y - pivot.y;
            camDist = Math.hypot(horiz, dy);
            camPitch = Math.atan2(dy, horiz);
            camYaw = Math.atan2(dx, dz);
            targetCamDist = camDist; targetCamPitch = camPitch; targetCamYaw = camYaw;

            if (gameId === 'dice') {
              userMovedDiceCam = false;
              diceCinematicCamActive = false;
              state.defaultDiceCam = {
                camDist,
                camPitch,
                camYaw,
                toPos: toPos.clone(),
                toLook: toLook.clone()
              };
            }
          }
        }
        requestAnimationFrame(step);
      }

      /* 3D RAYCASTING FOR INTERACTIVE ROULETTE TABLE */
      const tableRaycaster = new THREE.Raycaster();
      const tableMouse = new THREE.Vector2();

      window.addEventListener('click', e => {
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select') || e.target.closest('.menu-card')) return;

        tableMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        tableMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        tableRaycaster.setFromCamera(tableMouse, camera);

        // Click on 3D Jukebox in casino mode
        if (state.mode === 'casino' && window.jukebox3DRefs && window.jukebox3DRefs.group) {
          const jukeHits = tableRaycaster.intersectObject(window.jukebox3DRefs.group, true);
          if (jukeHits.length > 0) {
            openJukeboxModal();
            return;
          }
        }

        if (state.mode !== 'roulette' && state.mode !== 'mines' && state.mode !== 'blackjack' && state.mode !== 'dice' && state.mode !== 'coin' && state.mode !== 'poker' && state.mode !== 'wheel') return;

        // Fortune Wheel 3D: selección de fichas 3D en la mesa
        if (state.mode === 'wheel') {
          if (window.wheel3DRefs && window.wheel3DRefs.chipStacks) {
            const trayHits = tableRaycaster.intersectObjects(window.wheel3DRefs.chipStacks, true);
            if (trayHits.length > 0) {
              let obj = trayHits[0].object;
              while (obj && !obj.userData.chipVal && obj.parent) obj = obj.parent;
              if (obj && obj.userData.chipVal) {
                playSound('chip');
                window.wheelBet = roundMoney(obj.userData.chipVal);
                const selDisplay = document.getElementById('wheelBetDisplay');
                if (selDisplay) selDisplay.textContent = formatMoney(window.wheelBet);
                showToast(`Ficha de ${formatMoney(window.wheelBet)} seleccionada`);
                if (window.wheel3DRefs.update3DWheelChipRackSelection) {
                  window.wheel3DRefs.update3DWheelChipRackSelection();
                }
                return;
              }
            }
          }
          return;
        }

        // Poker 3D: interactividad con la caja de fichas del crupier y los espacios de fichas de jugador
        if (state.mode === 'poker') {
          if (window.poker3DRefs) {
            // 1. Clic en las 16 pilas de la caja de fichas del crupier -> Selecciona denominación de ficha
            if (window.poker3DRefs.chipStacks) {
              const dealerTrayHits = tableRaycaster.intersectObjects(window.poker3DRefs.chipStacks, true);
              if (dealerTrayHits.length > 0) {
                let obj = dealerTrayHits[0].object;
                while (obj && !obj.userData.chipVal && obj.parent) obj = obj.parent;
                if (obj && obj.userData.chipVal) {
                  playSound('chip');
                  pokerState.selectedChip = roundMoney(obj.userData.chipVal);
                  const selDisplay = document.getElementById('pokerSelectedChipDisplay');
                  if (selDisplay) selDisplay.textContent = formatMoney(pokerState.selectedChip);
                  showToast(`Ficha de ${formatMoney(pokerState.selectedChip)} seleccionada. Pulsa en tu círculo de apuesta para añadirla.`);
                  if (window.poker3DRefs.update3DPokerChipRackSelection) {
                    window.poker3DRefs.update3DPokerChipRackSelection();
                  }
                  return;
                }
              }
            }

            // 2. Clic en los círculos de apuesta o en el tapete de tu puesto -> Añade ficha a la apuesta aportada
            let hitPokerBetArea = false;

            // Detección en los discos sensores de los 8 círculos de apuesta
            if (!hitPokerBetArea && window.poker3DRefs.betSpots) {
              const spotHits = tableRaycaster.intersectObjects(window.poker3DRefs.betSpots, false);
              if (spotHits.length > 0) hitPokerBetArea = true;
            }

            // Detección directa en fichas colocadas en la mesa
            if (!hitPokerBetArea && window.poker3DRefs.chipsGroup) {
              const chipsHits = tableRaycaster.intersectObjects(window.poker3DRefs.chipsGroup.children, true);
              if (chipsHits.length > 0) hitPokerBetArea = true;
            }

            // Detección en el tapete de póker cerca de tu puesto
            if (!hitPokerBetArea && window.poker3DRefs.felt) {
              const feltHits = tableRaycaster.intersectObject(window.poker3DRefs.felt, false);
              if (feltHits.length > 0) {
                const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 0;
                const ang = mySeat * (Math.PI / 4);
                const betSpotX = Math.sin(ang) * 1.50;
                const betSpotZ = Math.cos(ang) * 1.50;
                const pt = feltHits[0].point;
                const dist = Math.hypot(pt.x - betSpotX, pt.z - (11.0 + betSpotZ));
                if (dist < 0.85) hitPokerBetArea = true;
              }
            }

            if (hitPokerBetArea) {
              if (pokerState.inHand) {
                showToast('⏳ Espera a que termine la mano actual para cambiar tu apuesta');
                return;
              }
              const addVal = roundMoney((typeof pokerState.selectedChip === 'number' && pokerState.selectedChip > 0) ? pokerState.selectedChip : 50);
              const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 0;
              const currentTotalBet = roundMoney(pokerState.bet || 0);
              const nextBet = roundMoney(currentTotalBet + addVal);

              if (nextBet > state.balance) {
                showToast('⚠️ No tienes suficiente saldo para esa apuesta');
                return;
              }
              playSound('chip');
              pokerState.bet = nextBet;
              if (pokerState.seats && pokerState.seats[mySeat]) pokerState.seats[mySeat].bet = nextBet;
              pokerState.currentBet = nextBet;

              const display = document.getElementById('pokerBetDisplay');
              if (display) display.textContent = formatMoney(pokerState.bet);

              if (typeof update3DPokerChips === 'function') update3DPokerChips();
              showToast(`+${formatMoney(addVal)} añadido a tu apuesta (Total aportado: ${formatMoney(nextBet)})`);
              return;
            }
          }
          return;
        }

        // Coin Flip 3D: seleccionar fichas en la bandeja 3D y apostar directamente en el círculo 3D de tu asiento
        if (state.mode === 'coin') {
          if (coin3DRefs) {
            // 1. Clic en las 16 pilas de fichas 3D de la bandeja -> SELECCIONA el valor de la ficha
            if (coin3DRefs.chipStacks) {
              const coinHits = tableRaycaster.intersectObjects(coin3DRefs.chipStacks, true);
              if (coinHits.length > 0) {
                let obj = coinHits[0].object;
                while (obj && !obj.userData.chipVal && obj.parent) obj = obj.parent;
                if (obj && obj.userData.chipVal) {
                  playSound('chip');
                  coinState.selectedChip = roundMoney(obj.userData.chipVal);
                  showToast(`Ficha seleccionada: ${formatMoney(coinState.selectedChip)}. Pulsa en tu círculo de apuesta para añadir.`);
                  if (coin3DRefs.update3DCoinChipRackSelection) {
                    coin3DRefs.update3DCoinChipRackSelection();
                  }
                  return;
                }
              }
            }

            // 2. Clic en el círculo de apuestas de tu asiento o en tu montón de fichas
            const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'coin' && typeof state.player.currentSeat.seatIndex === 'number')
              ? state.player.currentSeat.seatIndex
              : 0;

            let hitMyBetArea = false;

            // Detección directa en el montón físico 3D de fichas apostadas
            if (coin3DRefs.chipsGroup) {
              const pileHits = tableRaycaster.intersectObjects(coin3DRefs.chipsGroup.children, true);
              if (pileHits.length > 0) hitMyBetArea = true;
            }

            // Detección en los círculos de apuesta: SOLO el círculo perteneciente a tu asiento
            if (!hitMyBetArea && coin3DRefs.betSpots) {
              const spotHits = tableRaycaster.intersectObjects(coin3DRefs.betSpots, true);
              if (spotHits.length > 0) {
                let hitObj = spotHits[0].object;
                while (hitObj && (!hitObj.userData || !hitObj.userData.isCoinBetSpot) && hitObj.parent) {
                  hitObj = hitObj.parent;
                }
                if (hitObj && hitObj.userData && typeof hitObj.userData.playerIndex === 'number') {
                  if (hitObj.userData.playerIndex === mySeatIdx) {
                    hitMyBetArea = true;
                  } else {
                    showToast('⚠️ Ese círculo de apuestas pertenece al otro asiento');
                    return;
                  }
                } else {
                  hitMyBetArea = true;
                }
              }
            }

            if (hitMyBetArea) {
              if (activeCoinRoll && !activeCoinRoll.settled) {
                showToast('⏳ Espera a que la moneda aterrice para cambiar tu apuesta');
                return;
              }
              const addVal = roundMoney((typeof coinState.selectedChip === 'number' && coinState.selectedChip > 0) ? coinState.selectedChip : 50);
              const nextBet = roundMoney((coinState.bet || 0) + addVal);
              if (nextBet > state.balance) {
                showToast('⚠️ No tienes suficiente saldo para esa apuesta');
                return;
              }
              playSound('chip');
              coinState.bet = nextBet;
              if (typeof hasRealCoinRival === 'function' && !hasRealCoinRival()) {
                coinState.rivalBet = nextBet;
              }

              if (typeof updateCoinDuelUI === 'function') updateCoinDuelUI();
              else {
                const display = document.getElementById('coinBetDisplay');
                if (display) display.textContent = formatMoney(coinState.bet);
                if (typeof update3DCoinChips === 'function') update3DCoinChips(coinState.bet, coinState.rivalBet);
              }

              if (typeof socket !== 'undefined' && socket && socket.connected && typeof hasRealCoinRival === 'function' && hasRealCoinRival()) {
                socket.emit('coinVersusBet', { matchId: 'coin-versus-1', bet: coinState.bet, balance: state.balance });
              }

              showToast(`+${formatMoney(addVal)} añadido a tu círculo de apuesta (Total: ${formatMoney(coinState.bet)})`);
              return;
            }
          }
          return;
        }

        // Dados (Dice Duel 3D): seleccionar fichas en la bandeja 3D y apostar directamente en el círculo 3D de tu asiento
        if (state.mode === 'dice') {
          if (dice3DRefs) {
            // 1. Clic en las 16 pilas de fichas 3D de la bandeja -> SELECCIONA el valor de la ficha
            if (dice3DRefs.chipStacks) {
              const diceHits = tableRaycaster.intersectObjects(dice3DRefs.chipStacks, true);
              if (diceHits.length > 0) {
                let obj = diceHits[0].object;
                while (obj && !obj.userData.chipVal) obj = obj.parent;
                if (obj && obj.userData.chipVal) {
                  playSound('chip');
                  dState.selectedChip = roundMoney(obj.userData.chipVal);
                  showToast(`Ficha seleccionada: ${formatMoney(dState.selectedChip)}. Pulsa en tu círculo de apuesta para añadir.`);
                  if (dice3DRefs.update3DDiceChipRackSelection) {
                    dice3DRefs.update3DDiceChipRackSelection();
                  }
                  return;
                }
              }
            }

            // 2. Clic EXCLUSIVAMENTE en tu círculo de apuestas o en tu montón de fichas (NO en toda la mesa)
            const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === 'dice' && typeof state.player.currentSeat.seatIndex === 'number')
              ? state.player.currentSeat.seatIndex
              : 0;

            let hitMyBetArea = false;

            // Detección directa en el montón físico 3D de fichas apostadas de tu asiento
            if (dice3DRefs.chipsGroup) {
              const pileHits = tableRaycaster.intersectObjects(dice3DRefs.chipsGroup.children, true);
              if (pileHits.length > 0) hitMyBetArea = true;
            }

            // Detección en los círculos de apuesta: SOLO el círculo perteneciente a tu asiento
            if (!hitMyBetArea && dice3DRefs.betSpots) {
              const spotHits = tableRaycaster.intersectObjects(dice3DRefs.betSpots, false);
              if (spotHits.length > 0) {
                const clickedSpot = spotHits[0].object;
                if (clickedSpot.userData && clickedSpot.userData.playerIndex === mySeatIdx) {
                  hitMyBetArea = true;
                } else {
                  showToast('⚠️ Ese círculo de apuestas pertenece al otro asiento');
                  return;
                }
              }
            }

            if (hitMyBetArea) {
              if (dState.rolling) {
                showToast('⏳ Espera a que termine la tirada para cambiar tu apuesta');
                return;
              }
              const addVal = roundMoney((typeof dState.selectedChip === 'number' && dState.selectedChip > 0) ? dState.selectedChip : 50);
              const nextBet = roundMoney((dState.bet || 0) + addVal);
              if (nextBet > state.balance) {
                showToast('⚠️ No tienes suficiente saldo para esa apuesta');
                return;
              }
              playSound('chip');
              dState.bet = nextBet;

              const display = document.getElementById('diceBetDisplay');
              if (display) display.textContent = formatMoney(dState.bet);
              if (typeof update3DDiceChips === 'function') update3DDiceChips(dState.bet);
              showToast(`+${formatMoney(addVal)} añadido a tu círculo de apuesta (Total: ${formatMoney(dState.bet)})`);
              return;
            }
          }
          return;
        }

        // Blackjack: seleccionar denominación en la bandeja 3D y añadir al montón junto a las cartas por cada clic
        if (state.mode === 'blackjack') {
          if (window.bj3DRefs) {
            // 1. Clic en las 16 pilas de fichas 3D de la bandeja -> SELECCIONA el valor de la ficha
            if (window.bj3DRefs.chipStacks) {
              const bjHits = tableRaycaster.intersectObjects(window.bj3DRefs.chipStacks, true);
              if (bjHits.length > 0) {
                let obj = bjHits[0].object;
                while (obj && !obj.userData.chipVal) obj = obj.parent;
                if (obj && obj.userData.chipVal) {
                  playSound('chip');
                  bjState.selectedChip = roundMoney(obj.userData.chipVal);
                  showToast(`Ficha seleccionada: ${formatMoney(bjState.selectedChip)}. Pulsa en tu montón de fichas para apostar.`);
                  if (window.bj3DRefs.update3DBJChipRackSelection) {
                    window.bj3DRefs.update3DBJChipRackSelection();
                  }
                  return;
                }
              }
            }

            // 2. Clic en el montón de fichas / círculo de apuesta de la mesa -> AÑADE la ficha seleccionada por cada clic
            let hitBetArea = false;

            // Detección directa en el montón físico 3D de fichas apostadas
            if (window.bj3DRefs.chipsGroup) {
              const pileHits = tableRaycaster.intersectObjects(window.bj3DRefs.chipsGroup.children, true);
              if (pileHits.length > 0) hitBetArea = true;
            }

            // Detección en los discos sensores de los círculos de apuesta
            if (!hitBetArea && window.bj3DRefs.betSpots) {
              const spotHits = tableRaycaster.intersectObjects(window.bj3DRefs.betSpots, false);
              if (spotHits.length > 0) hitBetArea = true;
            }

            // Detección de proximidad en el tapete cerca del círculo de apuesta del jugador
            if (!hitBetArea && window.bj3DRefs.felt) {
              const feltHits = tableRaycaster.intersectObject(window.bj3DRefs.felt, false);
              if (feltHits.length > 0) {
                const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;
                const circleSpot = getBlackjackBetCircleSpot3D(mySeat);
                const pt = feltHits[0].point;
                // El tapete de blackjack está en z.x=0, z.z=0 con offset de mesa -1.25 en Z
                const dist = Math.hypot(pt.x - circleSpot.x, pt.z - (circleSpot.z - 1.25));
                if (dist < 0.70) hitBetArea = true;
              }
            }

            if (hitBetArea) {
              if (bjState.active) {
                showToast('⏳ Espera a que termine la mano actual para cambiar tu apuesta');
                return;
              }
              const addVal = roundMoney((typeof bjState.selectedChip === 'number' && bjState.selectedChip > 0) ? bjState.selectedChip : 50);
              const nextBet = roundMoney((bjState.bet || 0) + addVal);
              if (nextBet > state.balance) {
                showToast('⚠️ No tienes suficiente saldo para esa apuesta');
                return;
              }
              playSound('chip');
              bjState.bet = nextBet;
              bjBetFirstClick = false;

              const display = document.getElementById('bjBetDisplay');
              if (display) display.textContent = formatMoney(bjState.bet);
              update3DBJChips(bjState.bet);
              showToast(`+${formatMoney(addVal)} añadido a la apuesta (Total: ${formatMoney(bjState.bet)})`);

              if (typeof socket !== 'undefined' && socket && socket.connected) {
                const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;
                socket.emit('blackjackBetChange', { bet: nextBet, seatIndex: mySeat });
              }
              return;
            }
          }
          return;
        }

        // Cuadrícula de Mines: cada ficha física en la mesa 3D es clicable
        if (state.mode === 'mines') {
          const mineHits = tableRaycaster.intersectObjects(minesTileMeshes, false);
          if (mineHits.length > 0) {
            clickMineTile(mineHits[0].object.userData.mineIdx);
          }
          return;
        }

        if (state.mode !== 'roulette') return;
        if (!roulette3DRefs) return;

        // 1. Raycast on 3D Chip Stacks (Selecting $10, $50, $100, $500, $1K directly from 3D table!)
        const chipHits = tableRaycaster.intersectObjects(roulette3DRefs.chipMeshes, true);
        if (chipHits.length > 0) {
          let obj = chipHits[0].object;
          while (obj && !obj.userData.chipVal) obj = obj.parent;
          if (obj && obj.userData.chipVal) {
            playSound('chip');
            rState.selectedChip = obj.userData.chipVal;
            showToast('Ficha seleccionada: $' + rState.selectedChip);
            if (roulette3DRefs.update3DChipRackSelection) roulette3DRefs.update3DChipRackSelection();
          }
          return;
        }

        // 2. Raycast on 3D Spin Button (if present)
        if (roulette3DRefs && roulette3DRefs.spinBtn) {
          const spinHits = tableRaycaster.intersectObject(roulette3DRefs.spinBtn);
          if (spinHits.length > 0) {
            document.getElementById('spinBtn').click();
            return;
          }
        }

        // 3. Raycast on 3D Felt Mesh (Placing bets on numbers, columns, dozens, etc.)
        const intersects = tableRaycaster.intersectObject(roulette3DRefs.feltMesh);
        if (intersects.length > 0) {
          const uv = intersects[0].uv;
          const betKey = getBetKeyFromUV(uv.x, uv.y);
          if (betKey) {
            placeBetR(betKey);
          }
          return;
        }
      });

      function getBetKeyFromUV(u, v) {
        const canvasX = u * 2048;
        const canvasY = (1 - v) * 1024;

        if (canvasY >= 810) {
          const idx = Math.floor((canvasX - 240) / 252);
          var keys = ['low', 'even', 'red', 'black', 'odd', 'high'];
          return keys[Math.min(5, Math.max(0, idx))];
        } else if (canvasY >= 660 && canvasY < 810) {
          const idx = Math.floor((canvasX - 240) / 504);
          var keys = ['dozen1', 'dozen2', 'dozen3'];
          return keys[Math.min(2, Math.max(0, idx))];
        } else {
          if (canvasX < 240) return 'num-0';
          if (canvasX >= 1752) {
            const rowIdx = Math.floor(Math.max(0, canvasY - 30) / 210);
            var keys = ['col3', 'col2', 'col1'];
            return keys[Math.min(2, Math.max(0, rowIdx))];
          }
          const colIdx = Math.floor(Math.max(0, canvasX - 240) / 126);
          const rowIdx = Math.floor(Math.max(0, canvasY - 30) / 210);
          const safeC = Math.min(11, Math.max(0, colIdx));
          const safeR = Math.min(2, Math.max(0, rowIdx));
          if (NUM_ROWS[safeR] && NUM_ROWS[safeR][safeC] !== undefined) {
            return 'num-' + NUM_ROWS[safeR][safeC];
          }
        }
        return null;
      }

      function exitActiveGame() {
        const transId = ++currentCamTransitionId;
        document.querySelectorAll('.game-overlay').forEach(wrap => wrap.classList.remove('show'));
        if (state.mode === 'casino') return;
        const previousMode = state.mode;
        state.mode = 'transition';

        // Clear local seat occupancy and leave game rooms
        if (previousMode === 'roulette' && typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('rouletteLeave', { rouletteId: 'roulette' });
        } else if (previousMode === 'dice' && typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('diceVersusLeave', { matchId: 'dice-versus-1' });
        } else if (previousMode === 'coin' && typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('coinVersusLeave', { matchId: 'coin-versus-1' });
        } else if (previousMode === 'blackjack') {
          if ((typeof socket === 'undefined' || !socket || !socket.connected) && bjState.active) {
            bjState.active = false;
            let dScore = getHandScore(bjState.dealer);
            while (dScore < 17 && bjState.deck && bjState.deck.length > 0) {
              bjState.dealer.push(bjState.deck.pop());
              dScore = getHandScore(bjState.dealer);
            }
            if (!bjState.isSplit) {
              const pScore = getHandScore(bjState.player);
              if (pScore <= 21 && (dScore > 21 || pScore > dScore)) {
                state.balance += bjState.bet * 2;
                updateBalanceUI();
                showToast('🃏 Blackjack: ¡Ganaste $' + (bjState.bet * 2) + ' con tu mano plantada!');
                addXP(120);
              } else if (pScore <= 21 && pScore === dScore) {
                state.balance += bjState.bet;
                updateBalanceUI();
                showToast('🃏 Blackjack: Empate, apuesta de $' + bjState.bet + ' reembolsada');
              } else {
                showToast('🃏 Blackjack: Mano terminada (-$' + bjState.bet + ')');
              }
            } else {
              const s1 = bjState.score1 || getHandScore(bjState.player);
              const s2 = bjState.score2 || getHandScore(bjState.splitHand);
              const b1 = bjState.bet;
              const b2 = bjState.splitBet || bjState.bet;
              let net = 0;

              if (s1 <= 21 && (dScore > 21 || s1 > dScore)) { state.balance += b1 * 2; net += b1; }
              else if (s1 <= 21 && s1 === dScore) { state.balance += b1; }
              else { net -= b1; }

              if (s2 <= 21 && (dScore > 21 || s2 > dScore)) { state.balance += b2 * 2; net += b2; }
              else if (s2 <= 21 && s2 === dScore) { state.balance += b2; }
              else { net -= b2; }

              updateBalanceUI();
              showToast(`🃏 Blackjack Split: Todas tus manos se han plantado (${net >= 0 ? '+' : ''}$${net})`);
            }
          }
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('blackjackLeave', { blackjackId: 'blackjack' });
          }
        } else if (previousMode === 'poker') {
          if (typeof clearPokerBotAvatars === 'function') {
            clearPokerBotAvatars();
          }
          if (window.poker3DRefs && window.poker3DRefs.cardsGroup) {
            const grp = window.poker3DRefs.cardsGroup;
            while (grp.children && grp.children.length > 0) grp.remove(grp.children[0]);
          }
          if (typeof update3DPokerChips === 'function') {
            if (typeof pokerState !== 'undefined') {
              pokerState.pot = 0;
              pokerState.inHand = false;
              if (pokerState.seats) pokerState.seats.forEach(s => s.bet = 0);
            }
            update3DPokerChips();
          }
        }
        state.player.currentSeat = null;
        if (typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('updateTransform', {
            x: state.player.x,
            z: state.player.z,
            rotY: state.player.rotY,
            name: state.player.name || 'Axel',
            seat: null
          });
        }

        // Restaurar visibilidad de carteles flotantes 3D y nametag local al levantarse
        if (playerAvatar) {
          playerAvatar.visible = true;
          playerAvatar.position.y = 0;
          if (playerAvatar.userData && playerAvatar.userData.nameTag) {
            playerAvatar.userData.nameTag.visible = true;
          }
        }
        Object.values(zoneMeshes).forEach(zm => {
          if (zm.label) zm.label.visible = true;
        });

        const targetPos = (state.savedCasinoCam && state.savedCasinoCam.pos) ?
          state.savedCasinoCam.pos :
          new THREE.Vector3(state.player.x, 17, state.player.z + 17);

        const targetLook = (state.savedCasinoCam && state.savedCasinoCam.look) ?
          state.savedCasinoCam.look :
          new THREE.Vector3(state.player.x, 1.2, state.player.z);

        const start = performance.now();
        const fromPos = camera.position.clone();
        const fromLook = state.camFollowLook.clone();

        function step(now) {
          if (transId !== currentCamTransitionId) return;
          let t = Math.min(1, (now - start) / 750);
          camera.position.lerpVectors(fromPos, targetPos, t);
          state.camFollowLook.lerpVectors(fromLook, targetLook, t);
          camera.lookAt(state.camFollowLook);
          if (t < 1) requestAnimationFrame(step);
          else {
            if (transId !== currentCamTransitionId) return;
            state.mode = 'casino';
            document.querySelectorAll('.game-overlay').forEach(wrap => wrap.classList.remove('show'));
            state.cinemaPivot = null;
            state.seatedPivot = null;
            userMovedDiceCam = false;
            diceCinematicCamActive = false;
            // Resincroniza yaw/pitch/distancia del orbit-cam del mundo con el encuadre
            // final de la transición, para que no salte al reanudar el control WASD
            const dx = targetPos.x - state.player.x;
            const dz = targetPos.z - state.player.z;
            const horiz = Math.max(0.001, Math.hypot(dx, dz));
            const dy = targetPos.y;
            camDist = Math.max(7, Math.min(35, Math.hypot(horiz, dy)));
            camPitch = Math.max(CAM_PITCH_MIN, Math.min(CAM_PITCH_MAX, Math.atan2(dy, horiz)));
            camYaw = Math.atan2(dx, dz);
            targetCamDist = camDist; targetCamPitch = camPitch; targetCamYaw = camYaw;
          }
        }
        requestAnimationFrame(step);
      }
      window.exitActiveGame = exitActiveGame;
      function closeGameOverlay(gameId) { exitActiveGame(); }

      // Atajo universal de teclado ESC para salir de cualquier mesa o juego y cerrar modales
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' || e.code === 'Escape') {
          const tvModal = document.getElementById('tvModal');
          if (tvModal && tvModal.classList.contains('show')) {
            if (typeof closeTVModal === 'function') closeTVModal();
            else tvModal.classList.remove('show');
            return;
          }
          const jukeOverlay = document.getElementById('jukeboxModalOverlay');
          if (jukeOverlay && jukeOverlay.classList.contains('show')) {
            if (typeof closeJukeboxModal === 'function') closeJukeboxModal();
            else jukeOverlay.classList.remove('show');
            return;
          }
          exitActiveGame();
        }
      });

// --- Explicit Global Window Bindings ---
if (typeof AVATAR_GEO_BODY !== 'undefined') window.AVATAR_GEO_BODY = AVATAR_GEO_BODY;
if (typeof AVATAR_GEO_HEAD !== 'undefined') window.AVATAR_GEO_HEAD = AVATAR_GEO_HEAD;
if (typeof AVATAR_GEO_VISOR !== 'undefined') window.AVATAR_GEO_VISOR = AVATAR_GEO_VISOR;
if (typeof AVATAR_MAT_HEAD !== 'undefined') window.AVATAR_MAT_HEAD = AVATAR_MAT_HEAD;
if (typeof AVATAR_MAT_VISOR !== 'undefined') window.AVATAR_MAT_VISOR = AVATAR_MAT_VISOR;
if (typeof AVATAR_MAT_POOL !== 'undefined') window.AVATAR_MAT_POOL = AVATAR_MAT_POOL;
if (typeof getAvatarBodyMaterial !== 'undefined') window.getAvatarBodyMaterial = getAvatarBodyMaterial;
if (typeof createPlayerNameTag !== 'undefined') window.createPlayerNameTag = createPlayerNameTag;
if (typeof updatePlayerNameTagText !== 'undefined') window.updatePlayerNameTagText = updatePlayerNameTagText;
if (typeof createAvatarMesh !== 'undefined') window.createAvatarMesh = createAvatarMesh;
if (typeof playerAvatar !== 'undefined') window.playerAvatar = playerAvatar;
if (typeof localNameTag !== 'undefined') window.localNameTag = localNameTag;
if (typeof bots !== 'undefined') window.bots = bots;
if (typeof updatePlayer !== 'undefined') window.updatePlayer = updatePlayer;
if (typeof updateCinemaCamera !== 'undefined') window.updateCinemaCamera = updateCinemaCamera;
if (typeof updateSeated360Camera !== 'undefined') window.updateSeated360Camera = updateSeated360Camera;
if (typeof updateBots !== 'undefined') window.updateBots = updateBots;
