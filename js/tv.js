/* ============================================================
         UNIFIED OFFICIAL YOUTUBE 3D TV & SPATIAL ENGINE
      ============================================================ */
      var tvVideoId = ''; // No default video ID
      var tvVideoUrl = '';
      var tvScreenMeshRef = null;
      var tvLightRef = null;
      let lastTvVolPercent = -1;
      let lastTvVolTime = 0;
      var tvIsMuted = false;
      var tvIsPaused = false;
      let userHasInteracted = false;
      let masterVolume = 100; // Sistema de audio 1: volumen manual (referencia máxima, 0-100)

      function create3DCasinoTV() {
        const TV_SCALE = 3.5;
        var tvGroup = new THREE.Group();
        tvGroup.position.set(0, 7.5, -37.0); // Posicionada al fondo de la sala de Cine pegada a la pared norte (z: -38)

        // Steel Support Cables hanging from ceiling
        const cableMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2 });
        const cable1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02 * TV_SCALE, 0.02 * TV_SCALE, 8 * TV_SCALE, 8), cableMat);
        cable1.position.set(-3.2 * TV_SCALE, 4.0 * TV_SCALE, 0);
        const cable2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02 * TV_SCALE, 0.02 * TV_SCALE, 8 * TV_SCALE, 8), cableMat);
        cable2.position.set(3.2 * TV_SCALE, 4.0 * TV_SCALE, 0);
        tvGroup.add(cable1, cable2);

        // Metallic TV Frame
        const tvFrame = new THREE.Mesh(
          new THREE.BoxGeometry(7.4 * TV_SCALE, 4.4 * TV_SCALE, 0.3 * TV_SCALE),
          new THREE.MeshStandardMaterial({ color: 0x0a0514, roughness: 0.2, metalness: 0.8 })
        );
        tvGroup.add(tvFrame);

        // TV Neon Ambient Backlight Tube
        const tvNeon = new THREE.Mesh(
          new THREE.BoxGeometry(7.6 * TV_SCALE, 4.6 * TV_SCALE, 0.08 * TV_SCALE),
          new THREE.MeshStandardMaterial({ color: 0x8B5CF6, emissive: 0x8B5CF6, emissiveIntensity: 2.0 })
        );
        tvNeon.position.z = -0.12 * TV_SCALE;
        tvGroup.add(tvNeon);

        // 3D Screen Canvas Texture
        const tvCanvas = document.createElement('canvas'); tvCanvas.width = 1280; tvCanvas.height = 720;
        const tvCtx = tvCanvas.getContext('2d');
        tvCtx.fillStyle = '#0a0514'; tvCtx.fillRect(0, 0, 1280, 720);
        tvCtx.font = '900 56px Segoe UI'; tvCtx.fillStyle = '#8B5CF6'; tvCtx.textAlign = 'center';
        tvCtx.fillText('📺 TV CASINO 3D — CINE & MUSIC LOUNGE', 640, 320);
        tvCtx.font = '700 30px Segoe UI'; tvCtx.fillStyle = '#EDE7F6';
        tvCtx.fillText('Haz clic en la TV o pulsa (📺) para cambiar de canal', 640, 420);
        const tvTex = new THREE.CanvasTexture(tvCanvas);

        const tvScreenMat = new THREE.MeshBasicMaterial({ map: tvTex });
        const tvScreenW = 7.0 * TV_SCALE, tvScreenH = 4.0 * TV_SCALE;
        const tvScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(tvScreenW, tvScreenH), tvScreenMat);
        tvScreenMesh.position.z = 0.16 * TV_SCALE;
        tvScreenMesh.name = 'tvScreen3DMesh';
        tvGroup.add(tvScreenMesh);
        tvScreenMeshRef = tvScreenMesh;

        // Dynamic Light Bleed into Casino Scene (rango ampliado para la pantalla mucho mayor)
        const tvLight = new THREE.PointLight(0x8B5CF6, 3.2, 28 * TV_SCALE);
        tvLight.position.set(0, -1.0 * TV_SCALE, 2.0 * TV_SCALE);
        tvGroup.add(tvLight);
        tvLightRef = tvLight;

        // Official Three.js CSS3DObject Integration for 3D YouTube Iframe Embedding
        const overlayEl = document.getElementById('tvIframeOverlay');
        if (overlayEl && typeof THREE.CSS3DObject !== 'undefined') {
          overlayEl.style.display = 'block';
          overlayEl.style.position = 'absolute';
          overlayEl.style.transformOrigin = '50% 50%';
          overlayEl.style.pointerEvents = 'auto';

          const tvCss3DObject = new THREE.CSS3DObject(overlayEl);
          // Posición exacta en mundo 3D de la cara de la pantalla (grupo + offset local * escala)
          tvCss3DObject.position.set(
            tvGroup.position.x,
            tvGroup.position.y,
            tvGroup.position.z + 0.16 * TV_SCALE
          );
          tvCss3DObject.scale.set(tvScreenW / 3840, tvScreenH / 2160, 1.0); // mapeo exacto 4K (3840x2160) -> metros 3D

          if (typeof cssScene !== 'undefined' && cssScene) {
            cssScene.add(tvCss3DObject);
          }
        }

        scene.add(tvGroup);
        return tvGroup;
      }
      const tvGroupRef = create3DCasinoTV();

      /* ============================================================
         OCLUSIÓN DE LA TV 3D — los objetos de la sala tapan la TV
         cuando quedan entre la cámara y la pantalla (iframe CSS3D)
      ============================================================ */
      const tvOcclusionRaycaster = new THREE.Raycaster();

      function updateTvOcclusion(dt) {
        const overlayEl = document.getElementById('tvIframeOverlay');
        if (!overlayEl || overlayEl.style.display === 'none') return;
        if (state.mode === 'cinema') {
          overlayEl.style.visibility = 'visible';
          return;
        }

        const camPos = camera.position;
        const centerWorldPos = new THREE.Vector3();
        if (tvScreenMeshRef) {
          tvScreenMeshRef.getWorldPosition(centerWorldPos);
        } else if (tvGroupRef) {
          centerWorldPos.copy(tvGroupRef.position);
          centerWorldPos.z += 0.64;
        } else {
          centerWorldPos.set(0, 7.5, -36.44);
        }

        const distCenter = centerWorldPos.distanceTo(camPos);
        if (distCenter < 0.8) {
          overlayEl.style.visibility = 'visible';
          return;
        }

        // 5 Puntos de muestreo en el espacio del mundo (centro + 4 esquinas)
        const samplePoints = [
          centerWorldPos.clone(),
          centerWorldPos.clone().add(new THREE.Vector3(-10, 5, 0)),
          centerWorldPos.clone().add(new THREE.Vector3(10, 5, 0)),
          centerWorldPos.clone().add(new THREE.Vector3(-10, -5, 0)),
          centerWorldPos.clone().add(new THREE.Vector3(10, -5, 0))
        ];

        let occludedSamples = 0;
        for (let i = 0; i < samplePoints.length; i++) {
          const toScreen = samplePoints[i].clone().sub(camPos);
          const dist = toScreen.length();
          toScreen.normalize();

          tvOcclusionRaycaster.set(camPos, toScreen);
          tvOcclusionRaycaster.near = 0.5;
          tvOcclusionRaycaster.far = Math.max(0.6, dist - 0.2); // se detiene justo antes de la pantalla

          const hits = tvOcclusionRaycaster.intersectObjects(scene.children, true);
          const hit = hits.some(h => {
            if (!h.object.isMesh || h.object.visible === false) return false;
            let o = h.object;
            while (o) {
              if (o === tvGroupRef || o === tvScreenMeshRef) return false;
              o = o.parent;
            }
            return true;
          });
          if (hit) occludedSamples++;
        }

        // Si cualquier rayo (o el centro) choca con un objeto de la sala (pared, columna, barra, avatar, mueble),
        // se oculta la capa HTML iframe CSS3D para que el WebGL renderice el objeto tapando la pantalla.
        const occluded = occludedSamples >= 1;
        overlayEl.style.visibility = occluded ? 'hidden' : 'visible';
      }

      function extractYoutubeId(input) {
        if (!input || typeof input !== 'string') return null;
        input = input.trim();
        if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
        const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
      }

      function sendYtCommand(func, args = []) {
        const iframe = document.getElementById('tvIframeElement');
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({
              event: 'command',
              func: func,
              args: args
            }), '*');
          } catch (e) { }
        }
      }

      let tvCurrentPlaybackSeconds = 0;
      let tvLastPlayStartRealTime = 0;
      let tvPlayAnchorSecond = 0;
      let lastTvProgressEmitTime = 0;
      var serverTvLastWatched = null;
      let tvVideoTitle = '';

      const PRESET_TITLES = {
        'jfKfPfyJRdk': '🎵 Lofi Chill Lounge',
        '4xDzrJKXOOY': '🎰 Vegas Synthwave',
        '5qap5aO4i9A': '🎷 Casino Jazz Ambient'
      };

      function updateCinemaVideoTitleDisplay() {
        const el = document.getElementById('cinemaVideoTitleText');
        if (!el) return;

        if (!tvVideoId) {
          el.textContent = '⏹️ Pantalla en espera';
          return;
        }

        if (PRESET_TITLES[tvVideoId]) {
          tvVideoTitle = PRESET_TITLES[tvVideoId];
          el.textContent = tvVideoTitle;
          return;
        }

        if (tvVideoTitle) {
          el.textContent = tvVideoTitle;
          return;
        }

        el.textContent = `YouTube: ${tvVideoId}`;

        try {
          fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${tvVideoId}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.title) {
                tvVideoTitle = data.title;
                const currentEl = document.getElementById('cinemaVideoTitleText');
                if (currentEl && tvVideoId) currentEl.textContent = data.title;
              }
            })
            .catch(() => { });
        } catch (e) { }
      }

      function tvGetExactSecond() {
        if (!tvVideoId) return 0;
        if (!tvIsPaused && tvLastPlayStartRealTime > 0) {
          const elapsed = (performance.now() - tvLastPlayStartRealTime) / 1000;
          return Math.max(0, tvPlayAnchorSecond + elapsed);
        }
        return Math.max(0, tvCurrentPlaybackSeconds);
      }

      function formatTimestamp(sec) {
        sec = Math.max(0, Math.floor(sec || 0));
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        if (m >= 60) {
          const h = Math.floor(m / 60);
          const remM = m % 60;
          return `${h}:${remM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }

      function saveTvLastWatched(id, url, seconds = 0, immediate = false) {
        if (!id) return;
        const now = Date.now();
        const fullUrl = url || ('https://www.youtube.com/watch?v=' + id);
        const cleanSec = Math.max(0, Math.floor(seconds || 0));
        try {
          serverTvLastWatched = {
            videoId: id,
            url: fullUrl,
            currentTime: cleanSec,
            updatedAt: now
          };
          localStorage.setItem('casino_tv_last_url', fullUrl);
          updateTvLastVideoCardUI(serverTvLastWatched);

          if (socket && socket.connected) {
            const timeSinceLastEmit = now - lastTvProgressEmitTime;
            if (immediate || timeSinceLastEmit >= 1000) {
              lastTvProgressEmitTime = now;
              socket.emit('tvProgress', {
                videoId: id,
                url: fullUrl,
                currentTime: cleanSec
              });
            }
          }
        } catch (e) { }
      }

      function updateTvLastVideoCardUI(customData) {
        const card = document.getElementById('tvLastVideoCard');
        const urlEl = document.getElementById('tvLastVideoUrl');
        if (!card) return;

        let lastUrl = '';
        if (customData && customData.url) {
          lastUrl = customData.url;
        } else if (serverTvLastWatched && serverTvLastWatched.url) {
          lastUrl = serverTvLastWatched.url;
        } else {
          lastUrl = localStorage.getItem('casino_tv_last_url') || '';
        }

        if (lastUrl) {
          card.style.display = 'flex';
          if (urlEl) urlEl.textContent = lastUrl;
        } else {
          card.style.display = 'none';
        }
      }

      function flushTvSave() {
        if (tvVideoId) {
          const exactSec = tvGetExactSecond();
          tvCurrentPlaybackSeconds = exactSec;
          saveTvLastWatched(tvVideoId, tvVideoUrl, exactSec, true);
        }
      }

      window.addEventListener('beforeunload', flushTvSave);
      window.addEventListener('pagehide', flushTvSave);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          flushTvSave();
        }
      });

      setInterval(() => {
        if (tvVideoId && !tvIsPaused) {
          sendYtCommand('getCurrentTime');
          const exactSec = tvGetExactSecond();
          saveTvLastWatched(tvVideoId, tvVideoUrl, exactSec, false);
        }
      }, 500);

      window.addEventListener('message', (event) => {
        try {
          let data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (!data) return;

          if (data.info && data.info.videoData && data.info.videoData.title) {
            tvVideoTitle = data.info.videoData.title;
            updateCinemaVideoTitleDisplay();
          }

          if (data.info && typeof data.info.currentTime === 'number') {
            tvCurrentPlaybackSeconds = data.info.currentTime;
            tvPlayAnchorSecond = data.info.currentTime;
            tvLastPlayStartRealTime = performance.now();
            saveTvLastWatched(tvVideoId, tvVideoUrl, data.info.currentTime, false);
          }
          if (data.info && data.info.playerState !== undefined) {
            if (data.info.playerState === 2) {
              tvIsPaused = true;
              const btn = document.getElementById('tvPlayPauseBtn');
              if (btn) btn.textContent = 'REPRODUCIR ▶️';
              const stateEl = document.getElementById('tvStatusState');
              if (stateEl) stateEl.textContent = '⏸️ En Pausa';
              flushTvSave();
            } else if (data.info.playerState === 1) {
              tvIsPaused = false;
              tvLastPlayStartRealTime = performance.now();
              const btn = document.getElementById('tvPlayPauseBtn');
              if (btn) btn.textContent = 'PAUSAR ⏸️';
              const stateEl = document.getElementById('tvStatusState');
              if (stateEl) stateEl.textContent = '🟢 Reproduciendo';
            }
          }
          if (data.event === 'onStateChange') {
            if (data.info === 2) {
              tvIsPaused = true;
              flushTvSave();
            } else if (data.info === 1) {
              tvIsPaused = false;
              tvLastPlayStartRealTime = performance.now();
            }
          }
        } catch (e) { }
      });

      function getValidOriginParam() {
        if (window.location.protocol.startsWith('http') && window.location.origin && window.location.origin !== 'null') {
          return '&origin=' + encodeURIComponent(window.location.origin);
        }
        return '';
      }

      function loadYoutubeVideo(idOrUrl, emitToServer = true, startTime = 0) {
        const id = extractYoutubeId(idOrUrl);
        const stateEl = document.getElementById('tvStatusState');

        if (!id) {
          showToast('⚠️ URL o ID de YouTube no válida');
          if (stateEl) stateEl.textContent = '❌ URL no válida';
          return false;
        }

        tvVideoId = id;
        tvVideoUrl = 'https://www.youtube.com/watch?v=' + tvVideoId;
        tvVideoTitle = PRESET_TITLES[tvVideoId] || '';
        updateCinemaVideoTitleDisplay();

        const cleanStart = Math.max(0, Math.floor(startTime));
        tvCurrentPlaybackSeconds = cleanStart;
        tvPlayAnchorSecond = cleanStart;
        tvLastPlayStartRealTime = performance.now();
        tvIsPaused = false;

        const btn = document.getElementById('tvPlayPauseBtn');
        if (btn) btn.textContent = 'PAUSAR ⏸️';

        const iframe = document.getElementById('tvIframeElement');
        if (iframe) {
          if (stateEl) stateEl.textContent = '🔄 Cargando...';
          showToast(cleanStart > 0 ? `📺 Reanudando en ${formatTimestamp(cleanStart)}...` : '📺 Cargando vídeo en TV 3D...');

          const muteParam = tvIsMuted ? 1 : 0;
          const originParam = getValidOriginParam();
          const startParam = cleanStart > 0 ? `&start=${cleanStart}` : '';
          const embedUrl = `https://www.youtube-nocookie.com/embed/${tvVideoId}?enablejsapi=1&autoplay=1&mute=${muteParam}&controls=1&playsinline=1&rel=0&vq=hd2160&hd=1${startParam}${originParam}`;

          iframe.src = embedUrl;

          setTimeout(() => {
            sendYtCommand('setPlaybackQuality', ['hd2160']);
            sendYtCommand('setPlaybackQuality', ['highres']);
            sendYtCommand('addEventListener', ['onStateChange']);
            if (cleanStart > 0) {
              sendYtCommand('seekTo', [cleanStart, true]);
            }
            sendYtCommand('playVideo');
            if (tvVolumeSliderEl) {
              const currentVol = parseInt(tvVolumeSliderEl.value, 10) || 100;
              sendYtCommand('setVolume', [currentVol]);
            }
            if (stateEl) stateEl.textContent = '🟢 Reproduciendo';
          }, 800);
        }

        saveTvLastWatched(tvVideoId, tvVideoUrl, cleanStart, true);

        if (emitToServer && socket && !isApplyingTvServerState) {
          socket.emit('tvChangeVideo', {
            videoId: id,
            url: tvVideoUrl,
            currentTime: cleanStart,
            playing: true
          });
        }
        return true;
      }

      function applyTvServerState(serverState) {
        if (!serverState) return;
        isApplyingTvServerState = true;

        if (serverState.lastWatched && serverState.lastWatched.url) {
          serverTvLastWatched = serverState.lastWatched;
          localStorage.setItem('casino_tv_last_url', serverState.lastWatched.url);
          updateTvLastVideoCardUI(serverState.lastWatched);
        }

        const targetId = serverState.videoId || '';
        const playing = !!serverState.playing;
        const targetTime = Math.max(0, serverState.currentTime || 0);

        // Si no hay vídeo activo en el servidor, la pantalla queda vacía en espera
        if (!targetId || !playing) {
          if (tvVideoId && !targetId) {
            tvVideoId = '';
            tvVideoUrl = '';
            tvVideoTitle = '';
            updateCinemaVideoTitleDisplay();
            tvIsPaused = true;
            const iframe = document.getElementById('tvIframeElement');
            if (iframe) iframe.src = 'about:blank';
            const stateEl = document.getElementById('tvStatusState');
            if (stateEl) stateEl.textContent = '⏹️ Pantalla en espera';
          } else if (tvVideoId && !playing) {
            tvIsPaused = true;
            const btn = document.getElementById('tvPlayPauseBtn');
            if (btn) btn.textContent = 'REPRODUCIR ▶️';
            const stateEl = document.getElementById('tvStatusState');
            if (stateEl) stateEl.textContent = '⏸️ En Pausa';
            sendYtCommand('pauseVideo');
          }
          setTimeout(() => { isApplyingTvServerState = false; }, 500);
          return;
        }

        // Si hay un vídeo activo reproduciéndose
        if (tvVideoId !== targetId) {
          tvVideoTitle = PRESET_TITLES[targetId] || '';
          updateCinemaVideoTitleDisplay();
          loadYoutubeVideo(targetId, false, targetTime);
        } else {
          // 1. Sincronizar estado Play / Pause
          if (tvIsPaused === playing) {
            tvIsPaused = !playing;
            const btn = document.getElementById('tvPlayPauseBtn');
            if (btn) btn.textContent = tvIsPaused ? 'REPRODUCIR ▶️' : 'PAUSAR ⏸️';
            const stateEl = document.getElementById('tvStatusState');
            if (stateEl) stateEl.textContent = tvIsPaused ? '⏸️ En Pausa' : '🟢 Reproduciendo';

            if (playing) {
              sendYtCommand('playVideo');
            } else {
              sendYtCommand('pauseVideo');
            }
          }

          // 2. Sincronizar Seek (si alguien adelantó o retrocedió)
          const currentLocalSec = tvGetExactSecond();
          if (targetTime >= 0 && Math.abs(currentLocalSec - targetTime) > 2) {
            tvCurrentPlaybackSeconds = targetTime;
            tvPlayAnchorSecond = targetTime;
            tvLastPlayStartRealTime = performance.now();
            sendYtCommand('seekTo', [targetTime, true]);
          }
        }

        setTimeout(() => {
          isApplyingTvServerState = false;
        }, 500);
      }

      function onFirstUserGesture() {
        if (userHasInteracted) return;
        userHasInteracted = true;
        if (!tvIsMuted) {
          sendYtCommand('unMute');
          sendYtCommand('playVideo');
        }
      }
      window.addEventListener('click', onFirstUserGesture, { once: true });
      window.addEventListener('keydown', onFirstUserGesture, { once: true });

      // Update Spatial Audio & 3D Projection in Animation Loop
      function updateTVSpatialAudioAndProjection() {
        const iframeOverlay = document.getElementById('tvIframeOverlay');
        if (state.mode !== 'casino' && state.mode !== 'cinema') {
          if (iframeOverlay) iframeOverlay.style.display = 'none';
          return;
        }

        if (iframeOverlay) {
          iframeOverlay.style.display = 'block';
          iframeOverlay.style.opacity = '1';
        }

        let volPercent = masterVolume;

        if (state.mode !== 'cinema') {
          const tvX = tvGroupRef ? tvGroupRef.position.x : 0;
          const tvZ = tvGroupRef ? tvGroupRef.position.z : -37.0;
          const dx = state.player.x - tvX;
          const dz = state.player.z - tvZ;
          const dist = Math.hypot(dx, dz);

          // Distancias recalibradas para la pantalla 4x más grande y más alejada
          const minDist = 20;
          const maxDist = 90;
          let volRatio = 1.0;

          if (dist > minDist) {
            volRatio = Math.max(0, 1 - (dist - minDist) / (maxDist - minDist));
            volRatio = Math.pow(volRatio, 1.6);
          }

          volPercent = Math.round(volRatio * masterVolume);

          const nowVolTime = performance.now();
          if (Math.abs(volPercent - lastTvVolPercent) >= 2 && (nowVolTime - lastTvVolTime) > 200) {
            lastTvVolPercent = volPercent;
            lastTvVolTime = nowVolTime;
            if (!tvIsMuted) sendYtCommand('setVolume', [volPercent]);
          }

          // Refrescar indicadores de estado del modal de TV
          const distEl = document.getElementById('tvStatusDist');
          const volEl = document.getElementById('tvStatusVol');
          const filterEl = document.getElementById('tvStatusFilter');
          if (distEl) distEl.textContent = 'Distancia: ' + Math.round(dist) + 'm';
          if (volEl) volEl.textContent = 'Volumen 3D: ' + volPercent + '% (máx ' + masterVolume + '%)';
          if (filterEl) {
            if (volRatio > 0.66) filterEl.textContent = 'Filtro Acústico: Transparente (20kHz)';
            else if (volRatio > 0.3) filterEl.textContent = 'Filtro Acústico: Amortiguado (8kHz)';
            else if (volRatio > 0.05) filterEl.textContent = 'Filtro Acústico: Muy amortiguado (2kHz)';
            else filterEl.textContent = 'Filtro Acústico: Inaudible';
          }
        } else {
          // MODO CINE: sentado en las butacas frente a la pantalla (100% de volumen y calidad acústica)
          const nowVolTime = performance.now();
          if (Math.abs(volPercent - lastTvVolPercent) >= 1 && (nowVolTime - lastTvVolTime) > 100) {
            lastTvVolPercent = volPercent;
            lastTvVolTime = nowVolTime;
            if (!tvIsMuted) sendYtCommand('setVolume', [volPercent]);
          }

          const distEl = document.getElementById('tvStatusDist');
          const volEl = document.getElementById('tvStatusVol');
          const filterEl = document.getElementById('tvStatusFilter');
          if (distEl) distEl.textContent = 'Distancia: Butaca VIP Cine (0m)';
          if (volEl) volEl.textContent = 'Volumen Cine: ' + volPercent + '%';
          if (filterEl) filterEl.textContent = 'Acústica: Dolby Atmos Cine 3D';
        }
      }

      // Sistema de audio 1: barra de volumen manual — actualiza en tiempo real
      const tvVolumeSliderEl = document.getElementById('tvVolumeSlider');
      const tvVolumeSliderPctEl = document.getElementById('tvVolumeSliderPct');

      function applyTvVolumeRealTime() {
        if (!tvVolumeSliderEl) return;
        masterVolume = parseInt(tvVolumeSliderEl.value, 10);
        tvVolumeSliderEl.style.setProperty('--fillpct', masterVolume + '%');
        if (tvVolumeSliderPctEl) tvVolumeSliderPctEl.textContent = masterVolume + '%';

        let effectiveVol = masterVolume;
        if (state.mode !== 'cinema') {
          const tvX = tvGroupRef ? tvGroupRef.position.x : 0;
          const tvZ = tvGroupRef ? tvGroupRef.position.z : -37.0;
          const dx = state.player.x - tvX;
          const dz = state.player.z - tvZ;
          const dist = Math.hypot(dx, dz);
          const minDist = 20;
          const maxDist = 90;
          let volRatio = 1.0;
          if (dist > minDist) {
            volRatio = Math.max(0, 1 - (dist - minDist) / (maxDist - minDist));
            volRatio = Math.pow(volRatio, 1.6);
          }
          effectiveVol = Math.round(volRatio * masterVolume);
        }

        lastTvVolPercent = effectiveVol;
        lastTvVolTime = performance.now();

        if (!tvIsMuted) {
          sendYtCommand('setVolume', [effectiveVol]);
        }
      }

      if (tvVolumeSliderEl) {
        tvVolumeSliderEl.addEventListener('input', applyTvVolumeRealTime);
        tvVolumeSliderEl.addEventListener('change', applyTvVolumeRealTime);
      }

      // TV Modal Event Listeners
      const tvModal = document.getElementById('tvModal');
      function openTVModal() {
        updateTvLastVideoCardUI();
        tvModal.classList.add('show');
      }
      function closeTVModal() { tvModal.classList.remove('show'); }

      document.getElementById('tvBtn').addEventListener('click', openTVModal);
      const tvChangeBtnEl = document.getElementById('tvChangeBtn');
      if (tvChangeBtnEl) tvChangeBtnEl.addEventListener('click', openTVModal);
      document.getElementById('closeTvModalBtn').addEventListener('click', closeTVModal);

      const tvUseLastVideoBtnEl = document.getElementById('tvUseLastVideoBtn');
      if (tvUseLastVideoBtnEl) {
        tvUseLastVideoBtnEl.addEventListener('click', () => {
          const lastUrl = (serverTvLastWatched && serverTvLastWatched.url) || localStorage.getItem('casino_tv_last_url') || '';
          if (lastUrl) {
            const inputEl = document.getElementById('youtubeUrlInput');
            if (inputEl) inputEl.value = lastUrl;
            const loadBtn = document.getElementById('loadYoutubeBtn');
            if (loadBtn) loadBtn.click();
            showToast('🔗 Cargando enlace en el buscador...');
          }
        });
      }

      const tvSeekBackBtnEl = document.getElementById('tvSeekBackBtn');
      if (tvSeekBackBtnEl) {
        tvSeekBackBtnEl.addEventListener('click', () => {
          if (!tvVideoId) return;
          const cur = tvGetExactSecond();
          const targetSec = Math.max(0, Math.floor(cur - 10));
          tvCurrentPlaybackSeconds = targetSec;
          tvPlayAnchorSecond = targetSec;
          tvLastPlayStartRealTime = performance.now();
          sendYtCommand('seekTo', [targetSec, true]);
          showToast(`⏪ -10s (${formatTimestamp(targetSec)})`);
          saveTvLastWatched(tvVideoId, tvVideoUrl, targetSec, true);
          if (socket && !isApplyingTvServerState) {
            socket.emit('tvSeek', { currentTime: targetSec });
          }
        });
      }

      const tvSeekForwardBtnEl = document.getElementById('tvSeekForwardBtn');
      if (tvSeekForwardBtnEl) {
        tvSeekForwardBtnEl.addEventListener('click', () => {
          if (!tvVideoId) return;
          const cur = tvGetExactSecond();
          const targetSec = Math.max(0, Math.floor(cur + 10));
          tvCurrentPlaybackSeconds = targetSec;
          tvPlayAnchorSecond = targetSec;
          tvLastPlayStartRealTime = performance.now();
          sendYtCommand('seekTo', [targetSec, true]);
          showToast(`⏩ +10s (${formatTimestamp(targetSec)})`);
          saveTvLastWatched(tvVideoId, tvVideoUrl, targetSec, true);
          if (socket && !isApplyingTvServerState) {
            socket.emit('tvSeek', { currentTime: targetSec });
          }
        });
      }

      document.getElementById('loadYoutubeBtn').addEventListener('click', () => {
        const val = document.getElementById('youtubeUrlInput').value;
        if (val) loadYoutubeVideo(val);
      });

      document.querySelectorAll('.tv-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const ytId = btn.dataset.yt;
          if (ytId) loadYoutubeVideo(ytId);
        });
      });

      document.getElementById('tvMuteBtn').addEventListener('click', function () {
        tvIsMuted = !tvIsMuted;
        if (tvIsMuted) {
          sendYtCommand('mute');
          this.textContent = 'DESMUTEAR 🔊';
        } else {
          sendYtCommand('unMute');
          this.textContent = 'MUTEAR 🔇';
        }
      });

      document.getElementById('tvPlayPauseBtn').addEventListener('click', function () {
        if (!tvVideoId) return;
        tvIsPaused = !tvIsPaused;
        const exactSec = tvGetExactSecond();
        tvCurrentPlaybackSeconds = exactSec;
        if (tvIsPaused) {
          sendYtCommand('pauseVideo');
          this.textContent = 'REPRODUCIR ▶️';
          const stateEl = document.getElementById('tvStatusState');
          if (stateEl) stateEl.textContent = '⏸️ En Pausa';
          saveTvLastWatched(tvVideoId, tvVideoUrl, exactSec, true);
          if (socket && !isApplyingTvServerState) {
            socket.emit('tvPause', { currentTime: Math.floor(exactSec) });
          }
        } else {
          sendYtCommand('playVideo');
          this.textContent = 'PAUSAR ⏸️';
          const stateEl = document.getElementById('tvStatusState');
          if (stateEl) stateEl.textContent = '🟢 Reproduciendo';
          tvLastPlayStartRealTime = performance.now();
          tvPlayAnchorSecond = exactSec;
          saveTvLastWatched(tvVideoId, tvVideoUrl, exactSec, true);
          if (socket && !isApplyingTvServerState) {
            socket.emit('tvPlay', { currentTime: Math.floor(exactSec) });
          }
        }
      });

      // Click 3D TV Screen Raycaster
      window.addEventListener('click', e => {
        if (state.mode !== 'casino') return;
        if (e.target.tagName !== 'CANVAS') return;
        const ray = new THREE.Raycaster();
        const mouseVec = new THREE.Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        );
        ray.setFromCamera(mouseVec, camera);
        if (tvScreenMeshRef) {
          const hits = ray.intersectObject(tvScreenMeshRef);
          if (hits.length > 0) openTVModal();
        }
      });

// --- Explicit Global Window Bindings ---
if (typeof tvVideoId !== 'undefined') window.tvVideoId = tvVideoId;
if (typeof tvVideoUrl !== 'undefined') window.tvVideoUrl = tvVideoUrl;
if (typeof tvIsPaused !== 'undefined') window.tvIsPaused = tvIsPaused;
if (typeof updateTvOcclusion !== 'undefined') window.updateTvOcclusion = updateTvOcclusion;
if (typeof updateTVSpatialAudioAndProjection !== 'undefined') window.updateTVSpatialAudioAndProjection = updateTVSpatialAudioAndProjection;
if (typeof applyTvServerState !== 'undefined') window.applyTvServerState = applyTvServerState;
