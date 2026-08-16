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
            if (data.tvState.lastWatched && data.tvState.lastWatched.url) {
              serverTvLastWatched = data.tvState.lastWatched;
              localStorage.setItem('casino_tv_last_url', data.tvState.lastWatched.url);
              if (typeof updateTvLastVideoCardUI === 'function') {
                updateTvLastVideoCardUI(data.tvState.lastWatched);
              }
            }
            if (data.tvState.videoId && data.tvState.playing) {
              applyTvServerState(data.tvState);
            } else {
              tvVideoId = '';
              tvVideoUrl = '';
              tvIsPaused = true;
              const iframe = document.getElementById('tvIframeElement');
              if (iframe) iframe.src = 'about:blank';
              const stateEl = document.getElementById('tvStatusState');
              if (stateEl) stateEl.textContent = '⏹️ Pantalla en espera';
            }
          }

          if (data.jukeboxState) {
            applyJukeboxServerState(data.jukeboxState);
          }
        });

        // Clock Synchronization Response
        socket.on('syncPong', (data) => {
          window.netMetrics.msgIn++;
          if (data && typeof data.clientTime === 'number' && typeof data.serverTime === 'number') {
            const now = performance.now();
            const rtt = Math.max(1, Math.round(now - data.clientTime));
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

        // 4. Compact High-Frequency Player Transform Update (Delta Motion)
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

            rp.targetX = pData.x;
            rp.targetZ = pData.z;
            rp.targetRotY = pData.rotY;
            rp.lastPacketTime = performance.now();
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

        Object.values(remotePlayers).forEach(rp => {
          if (!rp.mesh) return;

          // Distance check for Dynamic LOD & Nametag Culling
          const dx = rp.mesh.position.x - camPos.x;
          const dz = rp.mesh.position.z - camPos.z;
          const distSq = dx * dx + dz * dz;

          // LOD: Hide floating nametag if player is beyond 32m (distSq > 1024)
          if (rp.mesh.userData.nameTag) {
            rp.mesh.userData.nameTag.visible = (distSq <= 1024);
          }

          // Smooth positional interpolation
          rp.mesh.position.x += (rp.targetX - rp.mesh.position.x) * lerpFactor;
          rp.mesh.position.z += (rp.targetZ - rp.mesh.position.z) * lerpFactor;

          // Angle interpolation with wrap-around (shortest angular path)
          let rotDiff = (rp.targetRotY - rp.mesh.rotation.y) % (Math.PI * 2);
          if (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
          if (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
          rp.mesh.rotation.y += rotDiff * lerpFactor;

          const targetY = rp.seat ? 0.44 : 0;
          rp.mesh.position.y += (targetY - rp.mesh.position.y) * lerpFactor;
        });
      }

      /* simulated AI bot avatars with state machines */
      const BOTS = [
        { id: 'bot1', name: '@Elena', color: 0xE11FD1, x: -5, z: 5, tx: -5, tz: 5, mesh: null, state: 'EXPLORING', seat: null, timer: 0 },
        { id: 'bot2', name: '@Carlos', color: 0x22c55e, x: 6, z: -5, tx: 6, tz: -5, mesh: null, state: 'EXPLORING', seat: null, timer: 0 },
        { id: 'bot3', name: '@Sofia', color: 0x38bdf8, x: -9.8, z: -1.6, tx: -9.8, tz: -1.6, mesh: null, state: 'PLAYING_AT_TABLE', seat: { zone: 'roulette' }, timer: 10 },
        { id: 'bot4', name: '@Mateo', color: 0xFBBF24, x: 7.8, z: -1.6, tx: 7.8, tz: -1.6, mesh: null, state: 'PLAYING_AT_TABLE', seat: { zone: 'dice' }, timer: 12 }
      ];

      BOTS.forEach(b => {
        b.mesh = createAvatarMesh(b.color);
        b.mesh.position.set(b.x, 0, b.z);
        scene.add(b.mesh);
      });

      function updateBots(dt) {
        BOTS.forEach(b => {
          b.timer -= dt;

          if (b.state === 'EXPLORING') {
            const dx = b.tx - b.x, dz = b.tz - b.z;
            const dist = Math.hypot(dx, dz);
            if (dist < 0.5 || b.timer <= 0) {
              if (Math.random() > 0.5) {
                const targetZone = (window.ZONES || ZONES)[Math.floor(Math.random() * (window.ZONES || ZONES).length)];
                if (targetZone && targetZone.seats && targetZone.seats.length > 0) {
                  const seat = targetZone.seats[Math.floor(Math.random() * targetZone.seats.length)];
                  b.tx = seat.x; b.tz = seat.z;
                  b.state = 'WANDERING_TO_TABLE';
                  b.timer = 15;
                } else {
                  b.tx = (targetZone ? targetZone.x : 0) + (Math.random() - 0.5) * 4;
                  b.tz = (targetZone ? targetZone.z : 0) + (Math.random() - 0.5) * 4;
                  b.timer = 8;
                }
              } else {
                b.tx = (Math.random() - 0.5) * 26;
                b.tz = (Math.random() - 0.5) * 26;
                b.timer = 8;
              }
            } else {
              b.x += (dx / dist) * dt * 3; b.z += (dz / dist) * dt * 3;
              b.mesh.position.set(b.x, 0, b.z);
              let targetR = Math.atan2(dx, dz);
              let diffR = targetR - b.mesh.rotation.y;
              while (diffR < -Math.PI) diffR += Math.PI * 2;
              while (diffR > Math.PI) diffR -= Math.PI * 2;
              b.mesh.rotation.y += diffR * Math.min(1, dt * 10);
            }
          }
          else if (b.state === 'WANDERING_TO_TABLE') {
            const dx = b.tx - b.x, dz = b.tz - b.z;
            const dist = Math.hypot(dx, dz);
            if (dist < 0.3) {
              b.state = 'PLAYING_AT_TABLE';
              b.mesh.position.set(b.tx, 0, b.tz);
              b.timer = 12 + Math.random() * 10;
            } else {
              b.x += (dx / dist) * dt * 3.5; b.z += (dz / dist) * dt * 3.5;
              b.mesh.position.set(b.x, 0, b.z);
              let targetR = Math.atan2(dx, dz);
              let diffR = targetR - b.mesh.rotation.y;
              while (diffR < -Math.PI) diffR += Math.PI * 2;
              while (diffR > Math.PI) diffR -= Math.PI * 2;
              b.mesh.rotation.y += diffR * Math.min(1, dt * 10);
            }
          }
          else if (b.state === 'PLAYING_AT_TABLE') {
            if (b.timer <= 0) {
              b.state = 'EXPLORING';
              b.tx = (Math.random() - 0.5) * 20; b.tz = (Math.random() - 0.5) * 20;
              b.timer = 10;
            }
          }
        });
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
