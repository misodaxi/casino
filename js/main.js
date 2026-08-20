/* ============================================================
         STAGED MULTI-FREQUENCY RENDER & PERFORMANCE ENGINE
      ============================================================ */
      let lastTime = performance.now();
      let last15HzTick = 0;
      let last5HzTick = 0;
      let last1SecTick = 0;

      let lastSentTransform = { x: 0, z: 0, rotY: 0, time: 0 };
      const _pTransformPayload = { x: 0, z: 0, rotY: 0, seq: 0, t: 0 };
      let localSequence = 0;

      let frameCount = 0;
      let fpsCalcTime = performance.now();
      let currentFps = 60;
      let currentFrameTimeMs = 16.6;

      let lowFpsStreak = 0;
      let highFpsStreak = 0;

      // Debug HUD references
      const debugHudEl = document.getElementById('debugPerfHud');
      const debugToggleBtn = document.getElementById('debugToggleBtn');
      const debugFpsEl = document.getElementById('debugFps');
      const fpsCounterBadgeEl = document.getElementById('fpsCounterBadge');
      const fpsCounterValEl = document.getElementById('fpsCounterVal');
      const debugPingEl = document.getElementById('debugPing');
      const debugClockOffsetEl = document.getElementById('debugClockOffset');
      const debugZoneEl = document.getElementById('debugZone');
      const debugPlayersCountEl = document.getElementById('debugPlayersCount');
      const debugSocketRateEl = document.getElementById('debugSocketRate');
      const debugDrawCallsEl = document.getElementById('debugDrawCalls');
      const debugDprEl = document.getElementById('debugDpr');
      const debugSlotsEl = document.getElementById('debugSlots');
      const debugPhysicsEl = document.getElementById('debugPhysics');

      if (debugToggleBtn) {
        debugToggleBtn.addEventListener('click', () => {
          if (debugHudEl) debugHudEl.classList.toggle('show');
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'F3') {
          e.preventDefault();
          if (debugHudEl) debugHudEl.classList.toggle('show');
        }
      });

      // Precise Frame Timing & 1% Low Percentile Tracking
      const FRAME_SAMPLE_SIZE = 120;
      const frameTimeHistory = new Float32Array(FRAME_SAMPLE_SIZE);
      let frameHistoryIdx = 0;
      let frameHistoryCount = 0;
      let onePercentLowFps = 60;
      let zeroPointOnePercentLowFps = 60;
      let maxFrameSpikeMs = 16.6;

      function animate() {
        requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;

        // Frame timing & FPS tracking
        frameCount++;
        currentFrameTimeMs = dt * 1000;
        frameTimeHistory[frameHistoryIdx] = currentFrameTimeMs;
        frameHistoryIdx = (frameHistoryIdx + 1) % FRAME_SAMPLE_SIZE;
        if (frameHistoryCount < FRAME_SAMPLE_SIZE) frameHistoryCount++;

        if (now - fpsCalcTime >= 500) {
          currentFps = Math.round((frameCount * 1000) / (now - fpsCalcTime));
          frameCount = 0;
          fpsCalcTime = now;

          // Compute 1% and 0.1% low percentile metrics from sliding window
          const sortedFrames = Array.from(frameTimeHistory.subarray(0, frameHistoryCount)).sort((a, b) => b - a);
          const onePctIdx = Math.min(sortedFrames.length - 1, Math.max(0, Math.floor(sortedFrames.length * 0.01)));
          const zeroOnePctIdx = Math.min(sortedFrames.length - 1, Math.max(0, Math.floor(sortedFrames.length * 0.001)));
          const slowest1PctMs = sortedFrames[onePctIdx] || 16.6;
          const slowest01PctMs = sortedFrames[zeroOnePctIdx] || 16.6;
          onePercentLowFps = Math.max(1, Math.round(1000 / Math.max(1, slowest1PctMs)));
          zeroPointOnePercentLowFps = Math.max(1, Math.round(1000 / Math.max(1, slowest01PctMs)));
          maxFrameSpikeMs = sortedFrames[0] || 16.6;

          if (fpsCounterValEl) {
            fpsCounterValEl.textContent = currentFps;
          }
          if (fpsCounterBadgeEl) {
            fpsCounterBadgeEl.className = 'fps-counter-badge ' + (currentFps >= 54 ? 'fps-good' : (currentFps >= 30 ? 'fps-medium' : 'fps-low'));
          }

          // Dynamic Adaptive Quality Hysteresis
          if (currentFps < 34) {
            lowFpsStreak++;
            highFpsStreak = 0;
            if (lowFpsStreak >= 3) { // After ~1.5s of low FPS, drop quality
              if (currentQuality === QualityTiers.ULTRA) applyQualityTier(QualityTiers.HIGH);
              else if (currentQuality === QualityTiers.HIGH) applyQualityTier(QualityTiers.MEDIUM);
              else if (currentQuality === QualityTiers.MEDIUM) applyQualityTier(QualityTiers.LOW);
              lowFpsStreak = 0;
            }
          } else if (currentFps >= 57) {
            highFpsStreak++;
            lowFpsStreak = 0;
            if (highFpsStreak >= 8) { // After ~4s of solid 60 FPS, increase quality
              if (currentQuality === QualityTiers.LOW) applyQualityTier(QualityTiers.MEDIUM);
              else if (currentQuality === QualityTiers.MEDIUM) applyQualityTier(QualityTiers.HIGH);
              else if (currentQuality === QualityTiers.HIGH && !isMobileDevice) applyQualityTier(QualityTiers.ULTRA);
              highFpsStreak = 0;
            }
          } else {
            lowFpsStreak = 0;
            highFpsStreak = 0;
          }
        }

        /* ----------------------------------------------------
           1. 60 FPS CRITICAL: Local Avatar, Camera & Visual Interpolation
        ---------------------------------------------------- */
        updatePlayer(dt);
        if (state.mode === 'cinema') updateCinemaCamera(dt);
        else if (state.mode !== 'casino' && state.mode !== 'transition') updateSeated360Camera(dt);
        if (typeof updateRemotePlayers === 'function') updateRemotePlayers(dt);
        if (typeof updateBots === 'function') updateBots(dt);

        /* ----------------------------------------------------
           2. ~20 Hz NETWORK TRANSMITTER (Delta & Keepalive with Zero-Alloc Payload)
        ---------------------------------------------------- */
        if (typeof socket !== 'undefined' && socket && socket.connected && typeof playerAvatar !== 'undefined' && playerAvatar) {
          const curX = playerAvatar.position.x;
          const curZ = playerAvatar.position.z;
          const curRotY = playerAvatar.rotation.y;

          const dx = curX - lastSentTransform.x;
          const dz = curZ - lastSentTransform.z;
          const distSq = dx * dx + dz * dz;
          const dRot = Math.abs(curRotY - lastSentTransform.rotY);
          const elapsed = now - lastSentTransform.time;

          if (((distSq > 0.000225 || dRot > 0.015) && elapsed >= 50) || elapsed >= 1500) {
            lastSentTransform.x = curX;
            lastSentTransform.z = curZ;
            lastSentTransform.rotY = curRotY;
            lastSentTransform.time = now;
            localSequence++;

            _pTransformPayload.x = Math.round(curX * 100) / 100;
            _pTransformPayload.z = Math.round(curZ * 100) / 100;
            _pTransformPayload.rotY = Math.round(curRotY * 100) / 100;
            _pTransformPayload.seq = localSequence;
            _pTransformPayload.t = Math.round(now);

            socket.emit('pTransform', _pTransformPayload);
            window.netMetrics.msgOut++;
            window.netMetrics.bytesOut += 38;
          }
        }

        /* ----------------------------------------------------
           3. 15–30 FPS SECONDARY: Audio, Particles, TV & Secondary Animations
        ---------------------------------------------------- */
        if (now - last15HzTick >= 33) {
          const dt15 = (now - last15HzTick) / 1000;
          last15HzTick = now;

          updateParticles();
          updateAvatarTag();
          updateTVSpatialAudioAndProjection();
          try { updateTvOcclusion(dt15); } catch (e) { }

          /* Jukebox turntable spinning & ceiling speakers pulse */
          if (window.jukebox3DRefs) {
            const jk = window.jukebox3DRefs;
            if (window.localJukeboxState && window.localJukeboxState.playing) {
              if (jk.spinningDisc) jk.spinningDisc.rotation.y += dt15 * 4.2;
              if (jk.jukeLight) jk.jukeLight.intensity = 2.2 + Math.sin(now * 0.007) * 0.6;
              if (jk.innerSpot) jk.innerSpot.intensity = 3.2 + Math.sin(now * 0.009) * 0.5;
            }
          }
          if (window.casinoSpeakerMeshes && window.localJukeboxState && window.localJukeboxState.playing) {
            const sPulse = 1.0 + Math.sin(now * 0.008) * 0.04;
            window.casinoSpeakerMeshes.forEach(spk => spk.scale.set(sPulse, sPulse, sPulse));
          }

          /* rotate roulette rotor & ball in winning pocket */
          if (window.roulette3DRefs && window.roulette3DRefs.rotor && (!window.rState || !window.rState.spinning)) {
            window.roulette3DRefs.rotor.rotation.y += dt15 * 0.35;
            if (window.roulette3DRefs.ball && typeof window.roulette3DRefs.lastWinPocketAngle === 'number') {
              const ballAbsAngle = window.roulette3DRefs.rotor.rotation.y + window.roulette3DRefs.lastWinPocketAngle;
              window.roulette3DRefs.ball.position.x = Math.sin(ballAbsAngle) * 0.84;
              window.roulette3DRefs.ball.position.z = Math.cos(ballAbsAngle) * 0.84;
              window.roulette3DRefs.ball.position.y = 0.505;
            }
          }

          /* rotate 3D Fortune Wheel when idle (only if not spun or locked on prize) */
          if (window.wheel3DRefs && window.wheel3DRefs.rotor && !window.wSpinning && !window.wheelResultLocked) {
            window.wheel3DRefs.rotor.rotation.y -= dt15 * 0.15;
          }

          if (window.jackpotTrophyVictory) {
            const jv = window.jackpotTrophyVictory;
            if (jv.victoryGroup) jv.victoryGroup.position.y = 3.70 + Math.sin(now * 0.0025) * 0.07;
            if (jv.victoryDiamond) {
              jv.victoryDiamond.rotation.y += dt15 * 1.4;
              jv.victoryDiamond.rotation.x += dt15 * 0.6;
            }
            if (jv.victoryRing) jv.victoryRing.rotation.z += dt15 * 0.8;
            if (jv.victoryRingNeon) jv.victoryRingNeon.rotation.z -= dt15 * 1.2;
          } else if (window.jackpotTrophyGem) {
            window.jackpotTrophyGem.rotation.y += dt15 * 1.5;
            window.jackpotTrophyGem.rotation.x += dt15 * 0.5;
          }
        }

        /* ----------------------------------------------------
           4. 5–10 FPS BACKGROUND: Bot AI Decisions & Diagnostics
        ---------------------------------------------------- */
        if (now - last5HzTick >= 100) {
          const dt5 = (now - last5HzTick) / 1000;
          last5HzTick = now;
          if (typeof updateBotsAI === 'function') updateBotsAI(dt5);

          if (window.zoneMeshes) {
            Object.values(window.zoneMeshes).forEach(zm => {
              zm.pulse = (zm.pulse || 0) + 0.09;
              if (zm.ring) {
                const s = 1 + Math.sin(zm.pulse) * 0.05;
                zm.ring.scale.set(s, 1, s);
              }
            });
          }
        }

        /* ----------------------------------------------------
           5. 100% CONDITIONAL PHYSICS & SLOTS TICKS (Zero overhead when idle)
        ---------------------------------------------------- */
        if (typeof updatePlinko3DBalls === 'function' && ((window.activePlinkoBalls && window.activePlinkoBalls.length > 0) || (typeof activePlinkoBalls !== 'undefined' && activePlinkoBalls.length > 0))) {
          try { updatePlinko3DBalls(dt); } catch (e) { }
        }
        if (window.isDicePhysicsActive) {
          try { updateDicePhysics(dt); } catch (e) { }
        }
        if (window.isCoinPhysicsActive) {
          try { updateCoinPhysics(dt); } catch (e) { }
        }
        if (window.activeSpinningSlotsCount > 0 || window.dirtySlotsCount > 0) {
          try { updateSlot3DScreens(dt); } catch (e) { }
        }

        /* ----------------------------------------------------
           6. 1 Hz DEBUG PERFORMANCE HUD UPDATE
        ---------------------------------------------------- */
        if (now - last1SecTick >= 1000) {
          const timeDeltaSec = (now - last1SecTick) / 1000;
          last1SecTick = now;

          if (window.netMetrics) {
            window.netMetrics.msgInRate = Math.round(window.netMetrics.msgIn / timeDeltaSec);
            window.netMetrics.kbInRate = Math.round((window.netMetrics.bytesIn / 1024) / timeDeltaSec * 10) / 10;
            window.netMetrics.msgIn = 0;
            window.netMetrics.bytesIn = 0;
          }

          if (debugHudEl && debugHudEl.classList.contains('show')) {
            if (debugFpsEl) debugFpsEl.textContent = `${currentFps} FPS (${currentFrameTimeMs.toFixed(1)}ms) · 1% Low: ${onePercentLowFps} FPS`;
            if (debugPingEl && window.netMetrics) {
              const qBadgeClass = 'badge ' + (window.netMetrics.quality === 'EXCELLENT' ? 'badge-excellent' : (window.netMetrics.quality === 'GOOD' ? 'badge-good' : (window.netMetrics.quality === 'FAIR' ? 'badge-fair' : 'badge-poor')));
              debugPingEl.innerHTML = `${window.netMetrics.ping} ms <span class="${qBadgeClass}">${window.netMetrics.quality}</span>`;
            }
            if (debugClockOffsetEl && typeof window.serverTimeOffset === 'number') debugClockOffsetEl.textContent = `${window.serverTimeOffset >= 0 ? '+' : ''}${window.serverTimeOffset.toFixed(1)} ms`;
            if (debugZoneEl) debugZoneEl.textContent = (window.currentClientZone || 'LOBBY').toUpperCase();
            if (debugPlayersCountEl && window.remotePlayers) {
              const remoteCount = Object.keys(window.remotePlayers).length;
              debugPlayersCountEl.textContent = `${remoteCount + 1} en zona`;
            }
            if (debugSocketRateEl && window.netMetrics) debugSocketRateEl.textContent = `${window.netMetrics.msgInRate} msg/s (${window.netMetrics.kbInRate} KB/s)`;
            if (debugDrawCallsEl && renderer && renderer.info && renderer.info.render) {
              debugDrawCallsEl.textContent = `${renderer.info.render.calls} calls / ${renderer.info.render.triangles} tris`;
            }
            if (debugDprEl && renderer && window.currentQuality) debugDprEl.textContent = `${renderer.getPixelRatio().toFixed(2)}x DPR (${window.currentQuality.name})`;

            const slotUpdatesRate = Math.round((window.slotTexUpdatesThisSec || 0) / timeDeltaSec);
            window.slotTexUpdatesThisSec = 0;
            const activeSlots = window.activeSpinningSlotsCount || 0;
            if (debugSlotsEl) debugSlotsEl.textContent = `${activeSlots} / 30 (${slotUpdatesRate}/s)`;

            const activePhysCount = (window.isDicePhysicsActive ? 1 : 0) + (window.isCoinPhysicsActive ? 1 : 0) + (window.activePlinkoBalls ? window.activePlinkoBalls.length : 0);
            if (debugPhysicsEl) debugPhysicsEl.textContent = activePhysCount > 0 ? `${activePhysCount} activas` : '0 (en reposo)';
          }
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        if (typeof cssRenderer !== 'undefined' && cssRenderer && typeof cssScene !== 'undefined' && cssScene && camera) {
          cssRenderer.render(cssScene, camera);
        }
      }

      if (typeof populateAllChipRacks === 'function') populateAllChipRacks(50);
      if (typeof updateBalanceUI === 'function') updateBalanceUI();
      animate();

