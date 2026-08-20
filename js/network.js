/* ============================================================
         REAL-TIME MULTIPLAYER CLIENT (SOCKET.IO) & NETWORK ENGINE
      ============================================================ */
      var remotePlayers = {};
      var socket = null;
      var mySocketId = null;
      var currentClientZone = 'lobby';
      var isApplyingTvServerState = false;

      // Clock Synchronization & Latency Metrics
      window.serverTimeOffset = 0;
      window.netMetrics = {
        ping: 0,
        quality: 'EXCELLENT',
        msgIn: 0,
        msgOut: 0,
        bytesIn: 0,
        bytesOut: 0,
        lastRateCheck: performance.now(),
        msgInRate: 0,
        kbInRate: 0,
        zonePlayers: 1,
        totalPlayers: 1
      };

      function getNetworkQualityRating(ping) {
        if (ping < 65) return 'EXCELLENT';
        if (ping < 130) return 'GOOD';
        if (ping < 250) return 'FAIR';
        return 'POOR';
      }

      function syncClock() {
        if (socket && socket.connected) {
          const t0 = performance.now();
          socket.emit('syncPing', { clientTime: t0 });
          window.netMetrics.msgOut++;
        }
      }

      if (typeof io !== 'undefined') {
        socket = io({
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000
        });

        // 1. Initial State from Server (Players & Synced TV 3D State)
        socket.on('init', (data) => {
          window.netMetrics.msgIn++;
          mySocketId = data.id;
          currentClientZone = data.zone || 'lobby';
          const serverPlayers = data.players || {};

          if (typeof data.serverTime === 'number') {
            window.serverTimeOffset = data.serverTime - Date.now();
          }

          // Apply saved player name associated with client IP address
          if (serverPlayers[mySocketId] && serverPlayers[mySocketId].name) {
            const myAssignedName = serverPlayers[mySocketId].name;
            state.player.name = myAssignedName;

            const nameEl = document.getElementById('playerNameDisplay') || document.querySelector('.player-name');
            if (nameEl) nameEl.innerHTML = `${myAssignedName} ✏️ <span class="crown">👑</span>`;

            if (playerAvatar && playerAvatar.userData && playerAvatar.userData.nameTag) {
              updatePlayerNameTagText(playerAvatar.userData.nameTag, myAssignedName);
            }
          }

          // Clean existing remote players not in snapshot
          Object.keys(remotePlayers).forEach(id => {
            if (!serverPlayers[id]) {
              removeRemotePlayer(id);
            }
          });

          Object.keys(serverPlayers).forEach(id => {
            if (id !== mySocketId) {
              if (!remotePlayers[id]) {
                addRemotePlayer(serverPlayers[id]);
              } else {
                updateRemotePlayerData(remotePlayers[id], serverPlayers[id]);
              }
            }
          });

          syncClock();

          if (data.tvState) {
            applyTvServerState(data.tvState);
          }

          if (data.jukeboxState) {
            applyJukeboxServerState(data.jukeboxState);
          }
        });

        // Fortune Wheel Multiplayer Sync Listeners
        socket.on('fortuneWheelPlayerSpin', (data) => {
          window.netMetrics.msgIn++;
          if (typeof handleRemoteWheelSpin === 'function') {
            handleRemoteWheelSpin(data);
          }
        });

        socket.on('fortuneWheelPlayerResult', (data) => {
          window.netMetrics.msgIn++;
          if (typeof handleRemoteWheelResult === 'function') {
            handleRemoteWheelResult(data);
          }
        });

                // Authoritative Multiplayer Dice Listeners (Unified Architecture)
        socket.on('diceState', (stateData) => {
          window.netMetrics.msgIn++;
          window.diceServerState = stateData;
          if (typeof updateDiceTableUI === 'function') {
            updateDiceTableUI(stateData);
          }
        });

        socket.on('diceRoll', (data) => {
          window.netMetrics.msgIn++;
          if (typeof handleRemoteDiceRoll === 'function') {
            handleRemoteDiceRoll(data);
          }
        });

        socket.on('diceResult', (data) => {
          window.netMetrics.msgIn++;
          if (typeof handleRemoteDiceResult === 'function') {
            handleRemoteDiceResult(data);
          }
        });

        socket.on('diceError', (err) => {
          window.netMetrics.msgIn++;
          if (err && err.message && typeof showToast === 'function') {
            showToast('⚠️ ' + err.message);
          }
        });

        // Clock Synchronization Response with Jitter & Latency Tracking
        socket.on('syncPong', (data) => {
          window.netMetrics.msgIn++;
          if (data && typeof data.clientTime === 'number' && typeof data.serverTime === 'number') {
            const now = performance.now();
            const rtt = Math.max(1, Math.round(now - data.clientTime));
            const prevPing = window.netMetrics.ping || rtt;
            const sampleJitter = Math.abs(rtt - prevPing);
            window.netMetrics.jitter = Math.round((window.netMetrics.jitter ? window.netMetrics.jitter * 0.8 : 0) + (sampleJitter * 0.2));
            window.netMetrics.ping = rtt;
            window.netMetrics.quality = getNetworkQualityRating(rtt);
            const estServerNow = data.serverTime + (rtt / 2);
            window.serverTimeOffset = estServerNow - Date.now();
          }
        });

        // 2. Spatial Zone Snapshot (Interest Management)
        socket.on('zoneSnapshot', (data) => {
          window.netMetrics.msgIn++;
          if (!data) return;
          currentClientZone = data.zone || currentClientZone;
          const zPlayers = data.players || {};

          // Remove players outside of current interest sphere
          Object.keys(remotePlayers).forEach(id => {
            if (!zPlayers[id]) {
              removeRemotePlayer(id);
            }
          });

          // Add / update new players in zone
          Object.keys(zPlayers).forEach(id => {
            if (id !== mySocketId) {
              if (!remotePlayers[id]) {
                addRemotePlayer(zPlayers[id]);
              } else {
                updateRemotePlayerData(remotePlayers[id], zPlayers[id]);
              }
            }
          });
        });

        // 3. New Player Joined Zone
        socket.on('playerJoined', (pData) => {
          window.netMetrics.msgIn++;
          if (pData && pData.id && pData.id !== mySocketId) {
            if (!remotePlayers[pData.id]) {
              addRemotePlayer(pData);
            } else {
              updateRemotePlayerData(remotePlayers[pData.id], pData);
            }
          }
        });

        // 4. Compact High-Frequency Player Transform Update with Velocity Estimation (Lag Compensation)
        socket.on('pTransform', (pData) => {
          window.netMetrics.msgIn++;
          window.netMetrics.bytesIn += 38;
          if (pData && pData.id && pData.id !== mySocketId && remotePlayers[pData.id]) {
            const rp = remotePlayers[pData.id];

            // Sequence filtering: discard out-of-order packets
            if (typeof pData.seq === 'number' && rp.lastSeq && pData.seq < rp.lastSeq) {
              return; // Stale packet
            }
            if (typeof pData.seq === 'number') rp.lastSeq = pData.seq;

            const now = performance.now();
            const dtPacket = (now - rp.lastPacketTime) / 1000;

            if (dtPacket > 0.015 && dtPacket < 0.35) {
              const prevTargetX = rp.targetX;
              const prevTargetZ = rp.targetZ;
              rp.vx = (pData.x - prevTargetX) / dtPacket;
              rp.vz = (pData.z - prevTargetZ) / dtPacket;
            } else {
              rp.vx = 0;
              rp.vz = 0;
            }

            rp.targetX = pData.x;
            rp.targetZ = pData.z;
            rp.targetRotY = pData.rotY;
            rp.lastPacketTime = now;
          }
        });

        // 5. Backwards-Compatible Remote Player Movement Handler
        socket.on('playerMoved', (pData) => {
          window.netMetrics.msgIn++;
          if (pData && pData.id && pData.id !== mySocketId && remotePlayers[pData.id]) {
            const rp = remotePlayers[pData.id];
            rp.targetX = pData.x;
            rp.targetZ = pData.z;
            rp.targetRotY = pData.rotY;
            if (pData.seat !== undefined) rp.seat = pData.seat;
            if (pData.name && pData.name !== rp.name) {
              rp.name = pData.name;
              if (rp.mesh && rp.mesh.userData.nameTag) {
                updatePlayerNameTagText(rp.mesh.userData.nameTag, pData.name);
              }
            }
          }
        });

        // 6. Discrete Name and Seat Updates
        socket.on('playerNameChanged', (data) => {
          window.netMetrics.msgIn++;
          if (data && data.id && remotePlayers[data.id]) {
            remotePlayers[data.id].name = data.name;
            if (remotePlayers[data.id].mesh && remotePlayers[data.id].mesh.userData.nameTag) {
              updatePlayerNameTagText(remotePlayers[data.id].mesh.userData.nameTag, data.name);
            }
          }
        });

        socket.on('playerSeatChanged', (data) => {
          window.netMetrics.msgIn++;
          if (data && data.id && remotePlayers[data.id]) {
            remotePlayers[data.id].seat = data.seat;
          }
        });

        // 7. Remote Player Left
        socket.on('playerLeft', (id) => {
          window.netMetrics.msgIn++;
          removeRemotePlayer(id);
        });

        // 8. Synced TV & Jukebox Updates
        socket.on('tvStateUpdate', (s) => {
          window.netMetrics.msgIn++;
          applyTvServerState(s);
        });

        socket.on('tvForceSeek', (data) => {
          window.netMetrics.msgIn++;
          if (data && typeof data.currentTime === 'number') {
            if (typeof executeDirectTvSeek === 'function') {
              executeDirectTvSeek(data.currentTime);
            }
          }
        });

        socket.on('jukeboxStateUpdate', (s) => {
          window.netMetrics.msgIn++;
          applyJukeboxServerState(s);
        });

        socket.on('jukeboxVolumeUpdate', (data) => {
          window.netMetrics.msgIn++;
          if (data && typeof data.volume === 'number') {
            applyJukeboxVolume(data.volume, false);
          }
        });

        // Periodic Clock Sync every 10 seconds
        setInterval(syncClock, 10000);
      }

      function addRemotePlayer(pData) {
        if (!pData || !pData.id || remotePlayers[pData.id]) return;
        const mesh = createAvatarMesh(pData.color || 0x8B5CF6);
        mesh.position.set(pData.x || 0, pData.seat ? 0.44 : 0, pData.z || 0);
        mesh.rotation.y = pData.rotY || 0;

        const pName = pData.name || ('Jugador_' + pData.id.substring(0, 4));
        const nameTag = createPlayerNameTag(pName, pData.color || 0x8B5CF6);
        mesh.add(nameTag);
        mesh.userData.nameTag = nameTag;

        scene.add(mesh);

        remotePlayers[pData.id] = {
          id: pData.id,
          name: pName,
          mesh: mesh,
          seat: pData.seat || null,
          targetX: pData.x || 0,
          targetZ: pData.z || 0,
          targetRotY: pData.rotY || 0,
          lastSeq: pData.seq || 0,
          lastPacketTime: performance.now()
        };
      }

      function updateRemotePlayerData(rp, pData) {
        if (!rp || !pData) return;
        rp.targetX = pData.x !== undefined ? pData.x : rp.targetX;
        rp.targetZ = pData.z !== undefined ? pData.z : rp.targetZ;
        rp.targetRotY = pData.rotY !== undefined ? pData.rotY : rp.targetRotY;
        rp.seat = pData.seat !== undefined ? pData.seat : rp.seat;
        if (pData.name && pData.name !== rp.name) {
          rp.name = pData.name;
          if (rp.mesh && rp.mesh.userData.nameTag) {
            updatePlayerNameTagText(rp.mesh.userData.nameTag, pData.name);
          }
        }
      }

      function removeRemotePlayer(id) {
        if (remotePlayers[id]) {
          const rp = remotePlayers[id];
          if (rp.mesh) {
            if (rp.mesh.userData.nameTag) {
              if (rp.mesh.userData.nameTag.material) {
                if (rp.mesh.userData.nameTag.material.map) rp.mesh.userData.nameTag.material.map.dispose();
                rp.mesh.userData.nameTag.material.dispose();
              }
              rp.mesh.remove(rp.mesh.userData.nameTag);
            }
            scene.remove(rp.mesh);
          }
          delete remotePlayers[id];
        }
      }

      function updateRemotePlayers(dt) {
        const camPos = camera.position;
        const lerpFactor = Math.min(1, dt * 16);
        const maxDistSq = 3600; // 60m radius LOD far cutoff
        const nametagDistSq = (window.LOD_DISTANCES && window.LOD_DISTANCES.NAMETAG_MAX) ? (window.LOD_DISTANCES.NAMETAG_MAX * window.LOD_DISTANCES.NAMETAG_MAX) : 1024;
        const shadowDistSq = 225; // 15m radius shadow cutoff
        const allowShadows = window.currentQuality && window.currentQuality.shadows;

        for (const id in remotePlayers) {
          const rp = remotePlayers[id];
          if (!rp || !rp.mesh) continue;

          // Distance check for Dynamic LOD & Nametag Culling
          const dx = rp.mesh.position.x - camPos.x;
          const dz = rp.mesh.position.z - camPos.z;
          const distSq = dx * dx + dz * dz;

          // LOD 1: If beyond far cutoff (60m), cull entire mesh rendering
          if (distSq > maxDistSq) {
            rp.mesh.visible = false;
            // Still track target position in memory
            rp.mesh.position.x = rp.targetX;
            rp.mesh.position.z = rp.targetZ;
            continue;
          }

          rp.mesh.visible = true;

          // Dynamic Shadow Culling for Remote Players
          const shouldCastShadow = allowShadows && (distSq <= shadowDistSq);
          if (rp.mesh.children) {
            for (let c = 0; c < rp.mesh.children.length; c++) {
              const child = rp.mesh.children[c];
              if (child.isMesh && child.castShadow !== shouldCastShadow) {
                child.castShadow = shouldCastShadow;
              }
            }
          }

          // LOD 2: Hide floating nametag if player is beyond nametag distance (32m)
          if (rp.mesh.userData.nameTag) {
            rp.mesh.userData.nameTag.visible = (distSq <= nametagDistSq);
          }

          // Velocity-based dead-reckoning extrapolation for real-time lag compensation
          const pingSec = Math.max(0.010, Math.min(0.065, ((window.netMetrics && window.netMetrics.ping) || 40) / 1000));
          const leadX = (rp.vx || 0) * pingSec;
          const leadZ = (rp.vz || 0) * pingSec;
          const predTargetX = rp.targetX + leadX;
          const predTargetZ = rp.targetZ + leadZ;

          // Smooth positional interpolation towards predicted transform
          rp.mesh.position.x += (predTargetX - rp.mesh.position.x) * lerpFactor;
          rp.mesh.position.z += (predTargetZ - rp.mesh.position.z) * lerpFactor;

          // Angle interpolation with wrap-around (shortest angular path)
          let rotDiff = (rp.targetRotY - rp.mesh.rotation.y) % (Math.PI * 2);
          if (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
          if (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
          rp.mesh.rotation.y += rotDiff * lerpFactor;

          const targetY = rp.seat ? 0.44 : 0;
          rp.mesh.position.y += (targetY - rp.mesh.position.y) * lerpFactor;
        }
      }

      /* simulated AI bot avatars with state machines */
      const BOTS = [
        { id: 'bot1', name: '@Elena', color: 0xE11FD1, x: -5, z: 5, tx: -5, tz: 5, mesh: null, state: 'EXPLORING', seat: null, timer: 0, speed: 2.8 },
        { id: 'bot2', name: '@Carlos', color: 0x22c55e, x: 6, z: -5, tx: 6, tz: -5, mesh: null, state: 'EXPLORING', seat: null, timer: 0, speed: 2.6 },
        { id: 'bot3', name: '@Sofia', color: 0x38bdf8, x: -9.8, z: -1.6, tx: -9.8, tz: -1.6, mesh: null, state: 'PLAYING_AT_TABLE', seat: { zone: 'roulette' }, timer: 10, speed: 3.2 },
        { id: 'bot4', name: '@Mateo', color: 0xFBBF24, x: 7.8, z: -1.6, tx: 7.8, tz: -1.6, mesh: null, state: 'PLAYING_AT_TABLE', seat: { zone: 'dice' }, timer: 12, speed: 3.0 }
      ];

      BOTS.forEach(b => {
        b.mesh = createAvatarMesh(b.color);
        b.mesh.position.set(b.x, b.seat ? 0.44 : 0, b.z);
        const nameTag = createPlayerNameTag(b.name, b.color);
        b.mesh.add(nameTag);
        b.mesh.userData.nameTag = nameTag;
        scene.add(b.mesh);
      });

      // 1. Low-frequency (5-10 Hz) Decision & State Machine Tick
      function updateBotsAI(dt) {
        for (let i = 0; i < BOTS.length; i++) {
          const b = BOTS[i];
          b.timer -= dt;

          if (b.state === 'EXPLORING') {
            const dx = b.tx - b.x, dz = b.tz - b.z;
            const dist = Math.hypot(dx, dz);
            if (dist < 0.6 || b.timer <= 0) {
              if (Math.random() > 0.45) {
                const zonesList = window.ZONES || ZONES;
                const targetZone = zonesList[Math.floor(Math.random() * zonesList.length)];
                if (targetZone && targetZone.seats && targetZone.seats.length > 0) {
                  const seat = targetZone.seats[Math.floor(Math.random() * targetZone.seats.length)];
                  b.tx = seat.x; b.tz = seat.z;
                  b.state = 'WANDERING_TO_TABLE';
                  b.seat = seat;
                  b.timer = 16;
                } else {
                  b.tx = (targetZone ? targetZone.x : 0) + (Math.random() - 0.5) * 4;
                  b.tz = (targetZone ? targetZone.z : 0) + (Math.random() - 0.5) * 4;
                  b.seat = null;
                  b.timer = 9;
                }
              } else {
                b.tx = (Math.random() - 0.5) * 28;
                b.tz = (Math.random() - 0.5) * 28;
                b.seat = null;
                b.timer = 9;
              }
            }
          }
          else if (b.state === 'WANDERING_TO_TABLE') {
            const dx = b.tx - b.x, dz = b.tz - b.z;
            const dist = Math.hypot(dx, dz);
            if (dist < 0.4) {
              b.state = 'PLAYING_AT_TABLE';
              b.x = b.tx; b.z = b.tz;
              b.timer = 12 + Math.random() * 12;
            }
          }
          else if (b.state === 'PLAYING_AT_TABLE') {
            if (b.timer <= 0) {
              b.state = 'EXPLORING';
              b.seat = null;
              b.tx = (Math.random() - 0.5) * 24; b.tz = (Math.random() - 0.5) * 24;
              b.timer = 10;
            }
          }
        }
      }

      // 2. High-frequency (60 FPS) Silky-Smooth Kinematic Movement & Rotation
      function updateBots(dt) {
        const lerpRot = Math.min(1, dt * 8);
        const lerpY = Math.min(1, dt * 10);

        for (let i = 0; i < BOTS.length; i++) {
          const b = BOTS[i];
          if (!b.mesh) continue;

          if (b.state === 'EXPLORING' || b.state === 'WANDERING_TO_TABLE') {
            const dx = b.tx - b.x;
            const dz = b.tz - b.z;
            const dist = Math.hypot(dx, dz);

            if (dist > 0.08) {
              const moveSpeed = (b.speed || 2.8);
              const step = Math.min(dist, moveSpeed * dt);
              b.x += (dx / dist) * step;
              b.z += (dz / dist) * step;

              // Smooth continuous shortest angular rotation
              const targetRot = Math.atan2(dx, dz);
              let rotDiff = (targetRot - b.mesh.rotation.y) % (Math.PI * 2);
              if (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
              if (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
              b.mesh.rotation.y += rotDiff * lerpRot;
            }

            const targetY = (b.state === 'PLAYING_AT_TABLE' || b.seat) && (dist < 0.4) ? 0.44 : 0;
            b.mesh.position.y += (targetY - b.mesh.position.y) * lerpY;
            b.mesh.position.x = b.x;
            b.mesh.position.z = b.z;
          } else if (b.state === 'PLAYING_AT_TABLE') {
            const targetY = 0.44;
            b.mesh.position.y += (targetY - b.mesh.position.y) * lerpY;
            b.mesh.position.x = b.x;
            b.mesh.position.z = b.z;
          }
        }
      }

// --- Explicit Global Window Bindings ---
if (typeof remotePlayers !== 'undefined') window.remotePlayers = remotePlayers;
if (typeof socket !== 'undefined') window.socket = socket;
if (typeof mySocketId !== 'undefined') window.mySocketId = mySocketId;
if (typeof currentClientZone !== 'undefined') window.currentClientZone = currentClientZone;
if (typeof syncClock !== 'undefined') window.syncClock = syncClock;
if (typeof addRemotePlayer !== 'undefined') window.addRemotePlayer = addRemotePlayer;
if (typeof updateRemotePlayerData !== 'undefined') window.updateRemotePlayerData = updateRemotePlayerData;
if (typeof removeRemotePlayer !== 'undefined') window.removeRemotePlayer = removeRemotePlayer;
if (typeof updateRemotePlayers !== 'undefined') window.updateRemotePlayers = updateRemotePlayers;
if (typeof updateBots !== 'undefined') window.updateBots = updateBots;
if (typeof updateBotsAI !== 'undefined') window.updateBotsAI = updateBotsAI;
