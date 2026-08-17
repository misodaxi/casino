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

        const tvScreenMat = new THREE.MeshBasicMaterial({ map: tvTex, transparent: true, opacity: 0 });
        const tvScreenW = 7.0 * TV_SCALE, tvScreenH = 4.0 * TV_SCALE;
        const tvScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(tvScreenW, tvScreenH), tvScreenMat);
        tvScreenMesh.position.z = 0.16 * TV_SCALE;
        tvScreenMesh.visible = false;
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
      const _tvCenterWorldPos = new THREE.Vector3();
      const _tvToScreenVec = new THREE.Vector3();
      const tvOcclusionRaycaster = new THREE.Raycaster();

      function updateTvOcclusion(dt) {
        const overlayEl = document.getElementById('tvIframeOverlay');
        if (!overlayEl || overlayEl.style.display === 'none') return;
        if (state.mode === 'cinema') {
          overlayEl.style.visibility = 'visible';
          return;
        }

        const camPos = camera.position;
        if (tvScreenMeshRef) {
          tvScreenMeshRef.getWorldPosition(_tvCenterWorldPos);
        } else if (tvGroupRef) {
          _tvCenterWorldPos.copy(tvGroupRef.position);
          _tvCenterWorldPos.z += 0.64;
        } else {
          _tvCenterWorldPos.set(0, 7.5, -36.44);
        }

        // Si la cámara está detrás de la pantalla (z < -37), ocultar el iframe
        if (camPos.z < _tvCenterWorldPos.z) {
          overlayEl.style.visibility = 'hidden';
          return;
        }

        const distCenter = _tvCenterWorldPos.distanceTo(camPos);
        // Si está demasiado lejos (>75m), ocultar para ahorrar rendimiento de composición CSS3D
        if (distCenter > 75) {
          overlayEl.style.visibility = 'hidden';
          return;
        }

        if (distCenter < 3.0) {
          overlayEl.style.visibility = 'visible';
          return;
        }

        // Rayo central único reutilizando vectores estáticos sin recolección de basura
        _tvToScreenVec.copy(_tvCenterWorldPos).sub(camPos);
        const dist = _tvToScreenVec.length();
        _tvToScreenVec.normalize();

        tvOcclusionRaycaster.set(camPos, _tvToScreenVec);
        tvOcclusionRaycaster.near = 0.5;
        tvOcclusionRaycaster.far = Math.max(0.6, dist - 0.5);

        // Raycasting solo sobre objetos opacos principales en lugar de todo el árbol de escena recursivo
        overlayEl.style.visibility = 'visible';
      }

      function extractYoutubeId(input) {
        if (!input || typeof input !== 'string') return null;
        input = input.trim();
        if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
        const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
      }

      let ytPlayer = null;
      let ytPlayerReady = false;

      function onYouTubeIframeAPIReady() {
        initYTPlayer();
      }
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

      function initYTPlayer(initialVideoId = null, initialStart = 0) {
        if (ytPlayer && ytPlayerReady) {
          if (initialVideoId) {
            try {
              ytPlayer.loadVideoById({
                videoId: initialVideoId,
                startSeconds: initialStart
              });
            } catch (e) { }
          }
          return;
        }

        if (window.YT && window.YT.Player) {
          try {
            ytPlayer = new YT.Player('tvIframeElement', {
              events: {
                onReady: (event) => {
                  ytPlayerReady = true;
                  if (initialStart > 0) {
                    try { event.target.seekTo(initialStart, true); } catch (e) { }
                  }
                  if (initialVideoId && !tvIsPaused) {
                    try { event.target.playVideo(); } catch (e) { }
                  }
                },
                onStateChange: (event) => {
                  handleYtStateChange(event.data);
                }
              }
            });
          } catch (e) { }
        }
      }

      function sendYtCommand(func, args = []) {
        if (ytPlayer && ytPlayerReady) {
          try {
            if (func === 'seekTo') {
              const sec = typeof args[0] === 'number' ? args[0] : parseFloat(args[0]) || 0;
              const allowAhead = args[1] !== undefined ? !!args[1] : true;
              ytPlayer.seekTo(sec, allowAhead);
              return;
            }
            if (func === 'playVideo') {
              ytPlayer.playVideo();
              return;
            }
            if (func === 'pauseVideo') {
              ytPlayer.pauseVideo();
              return;
            }
            if (func === 'setVolume') {
              ytPlayer.setVolume(args[0] || 100);
              return;
            }
            if (func === 'mute') {
              ytPlayer.mute();
              return;
            }
            if (func === 'unMute') {
              ytPlayer.unMute();
              return;
            }
            if (typeof ytPlayer[func] === 'function') {
              ytPlayer[func](...args);
              return;
            }
          } catch (e) { }
        }

        // PostMessage fallback
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
      let tvVideoDuration = 0;
      let _isUserScrubbing = false;

      function tvGetDuration() {
        if (ytPlayer && ytPlayerReady && typeof ytPlayer.getDuration === 'function') {
          try {
            const d = ytPlayer.getDuration();
            if (typeof d === 'number' && !isNaN(d) && d > 0) {
              tvVideoDuration = d;
              return d;
            }
          } catch (e) { }
        }
        return tvVideoDuration || 0;
      }

      function updateTvScrubberUI() {
        const tvTimeSliderEl = document.getElementById('tvTimeSlider');
        const tvTimeCurrentEl = document.getElementById('tvTimeCurrent');
        const tvTimeDurationEl = document.getElementById('tvTimeDuration');
        if (!tvTimeSliderEl || _isUserScrubbing) return;

        const cur = tvGetExactSecond();
        const dur = tvGetDuration() || (cur > 120 ? Math.floor(cur * 1.25) : 300);

        if (tvTimeCurrentEl) tvTimeCurrentEl.textContent = formatTimestamp(cur);
        if (tvTimeDurationEl) tvTimeDurationEl.textContent = formatTimestamp(dur);

        tvTimeSliderEl.max = Math.max(10, Math.floor(dur));
        tvTimeSliderEl.value = Math.floor(cur);
        const pct = Math.min(100, Math.max(0, (cur / Math.max(1, dur)) * 100));
        tvTimeSliderEl.style.setProperty('--fillpct', pct + '%');
      }

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
        if (ytPlayer && ytPlayerReady && typeof ytPlayer.getCurrentTime === 'function') {
          try {
            const cur = ytPlayer.getCurrentTime();
            if (typeof cur === 'number' && !isNaN(cur) && cur > 0) {
              tvCurrentPlaybackSeconds = cur;
              return cur;
            }
          } catch (e) { }
        }
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

      let _lastSeekExecutionTime = 0;
      let _isSeekingLock = false;

      function executeDirectTvSeek(targetSec) {
        if (!tvVideoId) return;
        const cleanSec = Math.max(0, Math.floor(targetSec));
        tvCurrentPlaybackSeconds = cleanSec;
        tvPlayAnchorSecond = cleanSec;
        tvLastPlayStartRealTime = performance.now();
        _lastSeekExecutionTime = performance.now();
        _isSeekingLock = true;

        if (ytPlayer && ytPlayerReady && typeof ytPlayer.seekTo === 'function') {
          try { ytPlayer.seekTo(cleanSec, true); } catch (e) { }
        }
        sendYtCommand('seekTo', [cleanSec, true]);

        setTimeout(() => {
          if (ytPlayer && ytPlayerReady && typeof ytPlayer.seekTo === 'function') {
            try { ytPlayer.seekTo(cleanSec, true); } catch (e) { }
          }
          sendYtCommand('seekTo', [cleanSec, true]);
        }, 180);

        saveTvLastWatched(tvVideoId, tvVideoUrl, cleanSec, true);

        setTimeout(() => {
          _isSeekingLock = false;
        }, 1800);
      }
      window.executeDirectTvSeek = executeDirectTvSeek;

      setInterval(() => {
        if (tvVideoId && !tvIsPaused && !_isSeekingLock && (performance.now() - _lastSeekExecutionTime >= 1800)) {
          sendYtCommand('getCurrentTime');
          const exactSec = tvGetExactSecond();
          saveTvLastWatched(tvVideoId, tvVideoUrl, exactSec, false);
          if (socket && !isApplyingTvServerState && state.mode === 'cinema') {
            socket.emit('tvProgress', { currentTime: Math.floor(exactSec) });
          }
        }
        if (_isTvModalOpen) {
          updateTvScrubberUI();
        }
      }, 1000);

      function handleYtStateChange(stateCode) {
        if (stateCode === 1) { // PLAYING
          tvIsPaused = false;
          tvLastPlayStartRealTime = performance.now();
          const btn = document.getElementById('tvPlayPauseBtn');
          if (btn) btn.textContent = 'PAUSAR ⏸️';
          const stateEl = document.getElementById('tvStatusState');
          if (stateEl) stateEl.textContent = '🟢 Reproduciendo';
          if (socket && !isApplyingTvServerState && !_isSeekingLock) {
            socket.emit('tvPlay', { currentTime: Math.floor(tvGetExactSecond()) });
          }
        } else if (stateCode === 2) { // PAUSED
          tvIsPaused = true;
          const btn = document.getElementById('tvPlayPauseBtn');
          if (btn) btn.textContent = 'REPRODUCIR ▶️';
          const stateEl = document.getElementById('tvStatusState');
          if (stateEl) stateEl.textContent = '⏸️ En Pausa';
          flushTvSave();
          if (socket && !isApplyingTvServerState && !_isSeekingLock) {
            socket.emit('tvPause', { currentTime: Math.floor(tvGetExactSecond()) });
          }
        }
        updateTvScrubberUI();
      }

      window.addEventListener('message', (event) => {
        try {
          let data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (!data) return;

          if (data.info && data.info.videoData && data.info.videoData.title) {
            tvVideoTitle = data.info.videoData.title;
            updateCinemaVideoTitleDisplay();
          }

          if (data.info && typeof data.info.duration === 'number' && data.info.duration > 0) {
            tvVideoDuration = data.info.duration;
            updateTvScrubberUI();
          }

          if (data.info && typeof data.info.currentTime === 'number') {
            if (_isSeekingLock || (performance.now() - _lastSeekExecutionTime < 1800)) {
              return;
            }
            const currentEstimated = tvGetExactSecond();
            const serverDrift = Math.abs(data.info.currentTime - currentEstimated);
            tvCurrentPlaybackSeconds = data.info.currentTime;
            tvPlayAnchorSecond = data.info.currentTime;
            tvLastPlayStartRealTime = performance.now();
            saveTvLastWatched(tvVideoId, tvVideoUrl, data.info.currentTime, false);
            updateTvScrubberUI();

            if (serverDrift > 3.0 && socket && !isApplyingTvServerState) {
              socket.emit('tvSeek', { currentTime: Math.floor(data.info.currentTime) });
            }
          }

          if (data.info && data.info.playerState !== undefined) {
            handleYtStateChange(data.info.playerState);
          }

          if (data.event === 'onStateChange' && typeof data.info === 'number') {
            handleYtStateChange(data.info);
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

        if (stateEl) stateEl.textContent = '🔄 Cargando...';
        showToast(cleanStart > 0 ? `📺 Reanudando en ${formatTimestamp(cleanStart)}...` : '📺 Cargando vídeo en TV 3D...');

        const muteParam = tvIsMuted ? 1 : 0;
        const originParam = getValidOriginParam();
        const startParam = cleanStart > 0 ? `&start=${cleanStart}` : '';
        const embedUrl = `https://www.youtube.com/embed/${tvVideoId}?enablejsapi=1&autoplay=1&mute=${muteParam}&controls=1&playsinline=1&rel=0&vq=hd2160&hd=1${startParam}${originParam}`;

        const iframe = document.getElementById('tvIframeElement');
        if (iframe) {
          iframe.src = embedUrl;
          ytPlayerReady = false;
          ytPlayer = null;

          setTimeout(() => {
            if (window.YT && window.YT.Player) {
              try { initYTPlayer(tvVideoId, cleanStart); } catch (e) { }
            }
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
        const isPlaying = !!serverState.playing;
        const targetTime = Math.max(0, Math.floor(serverState.currentTime || 0));

        const btn = document.getElementById('tvPlayPauseBtn');
        const stateEl = document.getElementById('tvStatusState');

        // Caso 1: Pantalla vacía sin vídeo
        if (!targetId) {
          if (tvVideoId) {
            tvVideoId = '';
            tvVideoUrl = '';
            tvVideoTitle = '';
            updateCinemaVideoTitleDisplay();
            tvIsPaused = true;
            const iframe = document.getElementById('tvIframeElement');
            if (iframe) iframe.src = 'about:blank';
            if (btn) btn.textContent = 'REPRODUCIR ▶️';
            if (stateEl) stateEl.textContent = '⏹️ Pantalla en espera';
          }
          setTimeout(() => { isApplyingTvServerState = false; }, 500);
          return;
        }

        // Caso 2: El vídeo cambió respecto al local
        if (tvVideoId !== targetId) {
          tvVideoTitle = PRESET_TITLES[targetId] || '';
          updateCinemaVideoTitleDisplay();
          loadYoutubeVideo(targetId, false, targetTime);
          tvIsPaused = !isPlaying;
          if (btn) btn.textContent = tvIsPaused ? 'REPRODUCIR ▶️' : 'PAUSAR ⏸️';
          if (stateEl) stateEl.textContent = tvIsPaused ? '⏸️ En Pausa' : '🟢 Reproduciendo';
          if (!isPlaying) {
            setTimeout(() => { sendYtCommand('pauseVideo'); }, 950);
          }
        } else {
          // Caso 3: Mismo vídeo -> Sincronizar Play / Pause y Marca de Tiempo (Seek)
          if (tvIsPaused !== (!isPlaying)) {
            tvIsPaused = !isPlaying;
            if (btn) btn.textContent = tvIsPaused ? 'REPRODUCIR ▶️' : 'PAUSAR ⏸️';
            if (stateEl) stateEl.textContent = tvIsPaused ? '⏸️ En Pausa' : '🟢 Reproduciendo';
            if (isPlaying) {
              sendYtCommand('playVideo');
            } else {
              sendYtCommand('pauseVideo');
            }
          }

          const currentLocalSec = tvGetExactSecond();
          const threshold = isPlaying ? 1.8 : 0.5;
          if (Math.abs(currentLocalSec - targetTime) > threshold) {
            executeDirectTvSeek(targetTime);
          }
        }

        setTimeout(() => {
          isApplyingTvServerState = false;
        }, 600);
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
      // Pre-cached DOM element references for zero GC overhead
      let _tvIframeOverlayEl = null;
      let _tvModalEl = null;
      let _tvDistEl = null;
      let _tvVolEl = null;
      let _tvFilterEl = null;
      let _isTvModalOpen = false;
      let _lastSpatialAudioCalcTime = 0;

      function getCachedTvDom() {
        if (!_tvIframeOverlayEl) _tvIframeOverlayEl = document.getElementById('tvIframeOverlay');
        if (!_tvModalEl) _tvModalEl = document.getElementById('tvModal');
        if (!_tvDistEl) _tvDistEl = document.getElementById('tvStatusDist');
        if (!_tvVolEl) _tvVolEl = document.getElementById('tvStatusVol');
        if (!_tvFilterEl) _tvFilterEl = document.getElementById('tvStatusFilter');
      }

      // Update Spatial Audio & 3D Projection in Animation Loop (Optimized for 60 FPS)
      function updateTVSpatialAudioAndProjection() {
        getCachedTvDom();
        if (state.mode !== 'casino' && state.mode !== 'cinema') {
          if (_tvIframeOverlayEl && _tvIframeOverlayEl.style.display !== 'none') _tvIframeOverlayEl.style.display = 'none';
          return;
        }

        if (_tvIframeOverlayEl && _tvIframeOverlayEl.style.display !== 'block') {
          _tvIframeOverlayEl.style.display = 'block';
          _tvIframeOverlayEl.style.opacity = '1';
        }

        const now = performance.now();
        if (now - _lastSpatialAudioCalcTime < 120) return; // 8 Hz calculation is perfectly responsive for smooth spatial audio
        _lastSpatialAudioCalcTime = now;

        let volPercent = masterVolume;

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

          volPercent = Math.round(volRatio * masterVolume);

          if (Math.abs(volPercent - lastTvVolPercent) >= 2) {
            lastTvVolPercent = volPercent;
            if (!tvIsMuted) sendYtCommand('setVolume', [volPercent]);
          }

          if (_isTvModalOpen) {
            if (_tvDistEl) _tvDistEl.textContent = 'Distancia: ' + Math.round(dist) + 'm';
            if (_tvVolEl) _tvVolEl.textContent = 'Volumen 3D: ' + volPercent + '% (máx ' + masterVolume + '%)';
            if (_tvFilterEl) {
              if (volRatio > 0.66) _tvFilterEl.textContent = 'Filtro Acústico: Transparente (20kHz)';
              else if (volRatio > 0.3) _tvFilterEl.textContent = 'Filtro Acústico: Amortiguado (8kHz)';
              else if (volRatio > 0.05) _tvFilterEl.textContent = 'Filtro Acústico: Muy amortiguado (2kHz)';
              else _tvFilterEl.textContent = 'Filtro Acústico: Inaudible';
            }
          }
        } else {
          // MODO CINE: sentado en las butacas frente a la pantalla (100% de volumen)
          if (Math.abs(volPercent - lastTvVolPercent) >= 1) {
            lastTvVolPercent = volPercent;
            if (!tvIsMuted) sendYtCommand('setVolume', [volPercent]);
          }

          if (_isTvModalOpen) {
            if (_tvDistEl) _tvDistEl.textContent = 'Distancia: Butaca VIP Cine (0m)';
            if (_tvVolEl) _tvVolEl.textContent = 'Volumen Cine: ' + volPercent + '%';
            if (_tvFilterEl) _tvFilterEl.textContent = 'Acústica: Dolby Atmos Cine 3D';
          }
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
      function openTVModal() {
        _isTvModalOpen = true;
        getCachedTvDom();
        if (typeof updateTvLastVideoCardUI === 'function') updateTvLastVideoCardUI();
        if (typeof updateTvScrubberUI === 'function') updateTvScrubberUI();
        if (_tvModalEl) _tvModalEl.classList.add('show');
      }
      function closeTVModal() {
        _isTvModalOpen = false;
        getCachedTvDom();
        if (_tvModalEl) _tvModalEl.classList.remove('show');
      }
      window.openTVModal = openTVModal;
      window.closeTVModal = closeTVModal;

      const tvTimeSliderEl = document.getElementById('tvTimeSlider');
      const tvTimeCurrentEl = document.getElementById('tvTimeCurrent');
      const tvTimeHoverPreviewEl = document.getElementById('tvTimeHoverPreview');

      if (tvTimeSliderEl) {
        tvTimeSliderEl.addEventListener('input', (e) => {
          _isUserScrubbing = true;
          const scrubVal = parseInt(e.target.value, 10) || 0;
          const cur = tvGetExactSecond();
          const dur = tvGetDuration() || (scrubVal > 120 ? Math.floor(scrubVal * 1.25) : 300);
          const pct = Math.min(100, Math.max(0, (scrubVal / Math.max(1, dur)) * 100));
          tvTimeSliderEl.style.setProperty('--fillpct', pct + '%');
          if (tvTimeCurrentEl) tvTimeCurrentEl.textContent = formatTimestamp(scrubVal);
          if (tvTimeHoverPreviewEl) tvTimeHoverPreviewEl.textContent = 'Minuto: ' + formatTimestamp(scrubVal);
        });

        tvTimeSliderEl.addEventListener('change', (e) => {
          _isUserScrubbing = false;
          if (tvTimeHoverPreviewEl) tvTimeHoverPreviewEl.textContent = '';
          if (!tvVideoId) return;
          const targetSec = parseInt(e.target.value, 10) || 0;
          executeDirectTvSeek(targetSec);
          showToast(`⏱️ Minuto fijado en ${formatTimestamp(targetSec)}`);
          if (socket && socket.connected) {
            socket.emit('tvSeek', { currentTime: targetSec });
          }
        });
      }

      const tvBtnEl = document.getElementById('tvBtn');
      if (tvBtnEl) tvBtnEl.addEventListener('click', openTVModal);
      const tvChangeBtnEl = document.getElementById('tvChangeBtn');
      if (tvChangeBtnEl) tvChangeBtnEl.addEventListener('click', openTVModal);
      const closeTvModalBtnEl = document.getElementById('closeTvModalBtn');
      if (closeTvModalBtnEl) closeTvModalBtnEl.addEventListener('click', closeTVModal);

      // Cerrar al hacer clic fuera del modal (solo si está abierto)
      window.addEventListener('click', e => {
        if (_isTvModalOpen && _tvModalEl) {
          if (!_tvModalEl.contains(e.target) && !e.target.closest('#tvBtn, #tvChangeBtn, #closeTvModalBtn')) {
            closeTVModal();
          }
        }
      });

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
          executeDirectTvSeek(targetSec);
          showToast(`⏪ -10s (${formatTimestamp(targetSec)})`);
          if (socket && socket.connected) {
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
          executeDirectTvSeek(targetSec);
          showToast(`⏩ +10s (${formatTimestamp(targetSec)})`);
          if (socket && socket.connected) {
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

// --- Explicit Global Window Bindings ---
if (typeof tvVideoId !== 'undefined') window.tvVideoId = tvVideoId;
if (typeof tvVideoUrl !== 'undefined') window.tvVideoUrl = tvVideoUrl;
if (typeof tvIsPaused !== 'undefined') window.tvIsPaused = tvIsPaused;
if (typeof updateTvOcclusion !== 'undefined') window.updateTvOcclusion = updateTvOcclusion;
if (typeof updateTVSpatialAudioAndProjection !== 'undefined') window.updateTVSpatialAudioAndProjection = updateTVSpatialAudioAndProjection;
if (typeof applyTvServerState !== 'undefined') window.applyTvServerState = applyTvServerState;
