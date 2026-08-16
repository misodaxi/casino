/* ============================================================
         JUKEBOX (GRAMOLA SPOTIFY) FULL SYNCHRONIZED CONTROLLER & AUDIO ENGINE
      ============================================================ */
      const JUKEBOX_PRESETS = [
        {
          id: 'retro-rock',
          title: '50s-70s Rock & Roll Classics',
          sub: 'Elvis, Chuck Berry, Beatles, Queen',
          icon: '🎷',
          track: {
            id: 'preset-retro-1',
            title: 'Johnny B. Goode',
            artist: 'Chuck Berry',
            source: 'youtube',
            videoId: 'T38v3-SSGcM',
            url: 'https://www.youtube.com/watch?v=T38v3-SSGcM',
            cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150',
            duration: 161
          }
        },
        {
          id: 'vegas-jazz',
          title: 'Las Vegas Casino Jazz Lounge',
          sub: 'Frank Sinatra, Miles Davis, Bossa Nova',
          icon: '🎰',
          track: {
            id: 'preset-jazz-1',
            title: 'Fly Me to the Moon',
            artist: 'Frank Sinatra',
            source: 'youtube',
            videoId: 'ZEcqHA7dbwM',
            url: 'https://www.youtube.com/watch?v=ZEcqHA7dbwM',
            cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
            duration: 147
          }
        },
        {
          id: 'disco-80s',
          title: '80s Disco & Pop Giants',
          sub: 'Michael Jackson, Daft Punk, ABBA',
          icon: '🕺',
          track: {
            id: 'preset-80s-1',
            title: 'Billie Jean',
            artist: 'Michael Jackson',
            source: 'youtube',
            videoId: 'Zi_XLOBDo_Y',
            url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
            duration: 294
          }
        },
        {
          id: 'lofi-chill',
          title: 'Lo-Fi Chill Casino Beats',
          sub: 'Jazzhop, Coffee Beats, Smooth Lounge',
          icon: '☕',
          track: {
            id: 'preset-lofi-1',
            title: 'Take Five',
            artist: 'Dave Brubeck Quartet',
            source: 'youtube',
            videoId: 'vmDDOFXSgAs',
            url: 'https://www.youtube.com/watch?v=vmDDOFXSgAs',
            cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150',
            duration: 324
          }
        },
        {
          id: 'funk-modern',
          title: 'Modern Nu-Disco & Funk Hits',
          sub: 'Daft Punk, The Weeknd, Bruno Mars',
          icon: '✨',
          track: {
            id: 'preset-funk-1',
            title: 'Get Lucky',
            artist: 'Daft Punk ft. Pharrell Williams',
            source: 'youtube',
            videoId: '5NV6Rdv1a3I',
            url: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I',
            cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150',
            duration: 248
          }
        },
        {
          id: 'elvis-love',
          title: 'Golden Love Ballads',
          sub: 'Elvis Presley, Nat King Cole',
          icon: '👑',
          track: {
            id: 'preset-elvis-1',
            title: 'Can\'t Help Falling in Love',
            artist: 'Elvis Presley',
            source: 'youtube',
            videoId: 'vGJTaP6anOU',
            url: 'https://www.youtube.com/watch?v=vGJTaP6anOU',
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
            duration: 182
          }
        }
      ];

      var localJukeboxState = {
        currentTrack: JUKEBOX_PRESETS[1].track,
        playlist: [
          JUKEBOX_PRESETS[1].track,
          JUKEBOX_PRESETS[0].track,
          JUKEBOX_PRESETS[2].track,
          JUKEBOX_PRESETS[3].track,
          JUKEBOX_PRESETS[4].track,
          JUKEBOX_PRESETS[5].track
        ],
        currentIndex: 0,
        playing: true,
        currentTime: 0,
        volume: 75,
        isMuted: false,
        changerName: 'DJ Casino',
        updatedAt: Date.now()
      };

      let jukeCurrentAudioSrc = '';

      function formatTrackTime(sec) {
        const s = Math.max(0, Math.floor(sec || 0));
        const m = Math.floor(s / 60);
        const remS = s % 60;
        return `${m.toString().padStart(2, '0')}:${remS.toString().padStart(2, '0')}`;
      }

      function updateJukeboxUI(track, playing, currentSec, volume, changerName) {
        if (!track) return;
        const titleEl = document.getElementById('jukeTrackTitle');
        const artistEl = document.getElementById('jukeTrackArtist');
        const coverEl = document.getElementById('jukeTrackCover');
        const changerEl = document.getElementById('jukeChangerName');
        const discEl = document.getElementById('jukeVinylDisc');
        const playBtn = document.getElementById('jukePlayToggleBtn');
        const timeCurEl = document.getElementById('jukeTimeCurrent');
        const timeTotEl = document.getElementById('jukeTimeTotal');
        const progressFill = document.getElementById('jukeProgressFill');
        const hudText = document.getElementById('jukeboxHudText');
        const volSlider = document.getElementById('jukeVolSlider');
        const volText = document.getElementById('jukeVolText');

        if (titleEl) titleEl.textContent = track.title || 'Música Casino';
        if (artistEl) artistEl.textContent = track.artist || 'Artista';
        if (coverEl && track.cover) coverEl.src = track.cover;
        if (changerEl) changerEl.textContent = `· Puesto por: ${changerName || 'DJ Casino'}`;
        if (discEl) {
          if (playing) discEl.classList.add('spinning');
          else discEl.classList.remove('spinning');
        }
        if (playBtn) {
          playBtn.innerHTML = playing ? '⏸️ PAUSA' : '▶️ REPRODUCIR';
        }

        const totalSec = track.duration || 180;
        if (timeCurEl) timeCurEl.textContent = formatTrackTime(currentSec);
        if (timeTotEl) timeTotEl.textContent = formatTrackTime(totalSec);
        if (progressFill) {
          const pct = Math.min(100, Math.max(0, (currentSec / totalSec) * 100));
          progressFill.style.width = pct + '%';
        }
        if (hudText) {
          hudText.textContent = `🎵 ${track.title} - ${track.artist || ''}`;
        }
        if (volSlider && typeof volume === 'number') {
          volSlider.value = volume;
        }
        if (volText && typeof volume === 'number') {
          volText.textContent = volume + '%';
        }
      }

      let jukeUserHasInteracted = false;
      function unlockJukeboxAudio() {
        jukeUserHasInteracted = true;
        const iframe = document.getElementById('jukeboxIframe');
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
            const actualVol = localJukeboxState.isMuted ? 0 : localJukeboxState.volume;
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [actualVol] }), '*');
            if (localJukeboxState.playing) {
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
            }
          } catch(e) {}
        }
      }
      window.addEventListener('pointerdown', unlockJukeboxAudio, { passive: true });
      window.addEventListener('keydown', unlockJukeboxAudio, { passive: true });

      function playJukeboxTrackAudio(track, startSec = 0, autoPlay = true) {
        if (!track) return;
        const iframe = document.getElementById('jukeboxIframe');
        if (!iframe) return;

        let vid = track.videoId;
        if (!vid && track.url) {
          vid = extractYouTubeVideoId(track.url);
        }
        if (!vid) vid = 'ZEcqHA7dbwM';

        const start = Math.floor(startSec);

        if (jukeCurrentAudioSrc !== vid) {
          jukeCurrentAudioSrc = vid;
          iframe.src = `https://www.youtube-nocookie.com/embed/${vid}?enablejsapi=1&autoplay=${autoPlay ? 1 : 0}&start=${start}&controls=0&disablekb=1&fs=0&playsinline=1&rel=0&iv_load_policy=3`;
        } else {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [start, true] }), '*');
            if (autoPlay) {
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
              const actualVol = localJukeboxState.isMuted ? 0 : localJukeboxState.volume;
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [actualVol] }), '*');
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
            }
          } catch(e) {}
        }
      }

      function applyJukeboxServerState(serverState) {
        if (!serverState) return;
        localJukeboxState.currentTrack = serverState.currentTrack || localJukeboxState.currentTrack;
        localJukeboxState.playlist = serverState.playlist || localJukeboxState.playlist;
        localJukeboxState.currentIndex = serverState.currentIndex !== undefined ? serverState.currentIndex : localJukeboxState.currentIndex;
        localJukeboxState.playing = !!serverState.playing;
        localJukeboxState.currentTime = serverState.currentTime || 0;
        localJukeboxState.volume = serverState.volume !== undefined ? serverState.volume : localJukeboxState.volume;
        localJukeboxState.changerName = serverState.changerName || 'DJ Casino';
        localJukeboxState.updatedAt = serverState.updatedAt || Date.now();

        updateJukeboxUI(
          localJukeboxState.currentTrack,
          localJukeboxState.playing,
          localJukeboxState.currentTime,
          localJukeboxState.volume,
          localJukeboxState.changerName
        );

        if (localJukeboxState.playing) {
          playJukeboxTrackAudio(localJukeboxState.currentTrack, localJukeboxState.currentTime, true);
        } else {
          const iframe = document.getElementById('jukeboxIframe');
          if (iframe && iframe.contentWindow) {
            try {
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
            } catch(e) {}
          }
        }

        renderJukeboxQueue();
      }

      function applyJukeboxVolume(vol, emit = true) {
        localJukeboxState.volume = Math.max(0, Math.min(100, Math.round(vol)));
        const slider = document.getElementById('jukeVolSlider');
        const text = document.getElementById('jukeVolText');
        if (slider) slider.value = localJukeboxState.volume;
        if (text) text.textContent = localJukeboxState.volume + '%';

        const iframe = document.getElementById('jukeboxIframe');
        if (iframe && iframe.contentWindow) {
          try {
            const actualVol = localJukeboxState.isMuted ? 0 : localJukeboxState.volume;
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [actualVol] }), '*');
            if (actualVol > 0) {
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
            }
          } catch(e) {}
        }

        if (emit && typeof socket !== 'undefined' && socket && socket.connected) {
          socket.emit('jukeboxSetVolume', { volume: localJukeboxState.volume });
        }
      }

      async function resolveMusicTrack(rawInput) {
        if (!rawInput || !rawInput.trim()) return null;
        const str = rawInput.trim();

        // 1. Spotify URL parsing
        if (str.includes('spotify.com/')) {
          try {
            const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(str)}`;
            const res = await fetch(oEmbedUrl);
            if (res.ok) {
              const data = await res.json();
              const fullTitle = data.title || 'Spotify Track';
              const cover = data.thumbnail_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150';

              let songName = fullTitle;
              let artist = 'Spotify Music';
              if (fullTitle.includes(' - ')) {
                const parts = fullTitle.split(' - ');
                artist = parts[0];
                songName = parts[1];
              }

              let videoId = 'ZEcqHA7dbwM';
              const match = JUKEBOX_PRESETS.find(p => p.track.title.toLowerCase().includes(songName.toLowerCase()) || songName.toLowerCase().includes(p.track.title.toLowerCase()));
              if (match) videoId = match.track.videoId;

              return {
                id: 'spot-' + Date.now(),
                title: songName,
                artist: artist,
                source: 'spotify',
                videoId: videoId,
                url: str,
                cover: cover,
                duration: 210
              };
            }
          } catch(e) {
            console.warn('Spotify oEmbed fetch fallback:', e);
          }
        }

        // 2. YouTube URL parsing
        const ytid = extractYouTubeVideoId(str);
        if (ytid) {
          return {
            id: 'yt-' + ytid,
            title: 'Canción (' + ytid + ')',
            artist: 'YouTube Music',
            source: 'youtube',
            videoId: ytid,
            url: str,
            cover: `https://img.youtube.com/vi/${ytid}/hqdefault.jpg`,
            duration: 220
          };
        }

        // 3. Search query
        const match = JUKEBOX_PRESETS.find(p => p.track.title.toLowerCase().includes(str.toLowerCase()) || p.track.artist.toLowerCase().includes(str.toLowerCase()));
        if (match) return { ...match.track, id: 'search-' + Date.now() };

        return {
          id: 'custom-' + Date.now(),
          title: str,
          artist: 'Búsqueda Gramola',
          source: 'search',
          videoId: 'vGJTaP6anOU',
          url: str,
          cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
          duration: 180
        };
      }

      function openJukeboxModal() {
        const overlay = document.getElementById('jukeboxModalOverlay');
        if (overlay) {
          overlay.classList.add('show');
          renderJukeboxPresets();
          renderJukeboxQueue();
        }
      }

      function closeJukeboxModal() {
        const overlay = document.getElementById('jukeboxModalOverlay');
        if (overlay) overlay.classList.remove('show');
      }

      function renderJukeboxPresets() {
        const container = document.getElementById('jukePresetsContainer');
        if (!container) return;
        container.innerHTML = '';

        JUKEBOX_PRESETS.forEach(preset => {
          const card = document.createElement('div');
          card.className = 'juke-preset-card';
          card.innerHTML = `
            <div class="juke-preset-icon">${preset.icon}</div>
            <div>
              <div class="juke-preset-title">${preset.title}</div>
              <div class="juke-preset-sub">${preset.sub}</div>
            </div>
          `;
          card.addEventListener('click', () => {
            if (typeof socket !== 'undefined' && socket && socket.connected) {
              socket.emit('jukeboxPlayTrack', { track: preset.track, changerName: state.player.name || 'Axel' });
            } else {
              applyJukeboxServerState({
                currentTrack: preset.track,
                playing: true,
                currentTime: 0,
                changerName: state.player.name || 'Axel'
              });
            }
            showToast(`🎵 Reproduciendo lista: "${preset.title}"`);
          });
          container.appendChild(card);
        });
      }

      function renderJukeboxQueue() {
        const container = document.getElementById('jukeQueueContainer');
        const countEl = document.getElementById('jukeQueueCount');
        if (!container) return;
        container.innerHTML = '';

        const list = localJukeboxState.playlist || [];
        if (countEl) countEl.textContent = `${list.length} canciones`;

        list.forEach((track, idx) => {
          const isCurrent = (localJukeboxState.currentTrack && (localJukeboxState.currentTrack.id === track.id || localJukeboxState.currentTrack.videoId === track.videoId));
          const row = document.createElement('div');
          row.className = `juke-queue-item ${isCurrent ? 'active' : ''}`;
          row.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="color:#94a3b8; font-weight:bold; width:18px;">${idx + 1}.</span>
              <div>
                <div style="font-weight:700; color:#fff;">${track.title}</div>
                <div style="font-size:10px; color:#94a3b8;">${track.artist || 'Artista'} · ${formatTrackTime(track.duration || 180)}</div>
              </div>
            </div>
            <div>
              ${isCurrent ? '<span style="font-size:11px; color:#f472b6;">SONANDO 🔊</span>' : '<button class="juke-ctrl-btn" style="padding:4px 8px; font-size:10px;">▶️</button>'}
            </div>
          `;
          row.addEventListener('click', () => {
            if (typeof socket !== 'undefined' && socket && socket.connected) {
              socket.emit('jukeboxPlayTrack', { track: track, changerName: state.player.name || 'Axel' });
            } else {
              applyJukeboxServerState({
                currentTrack: track,
                currentIndex: idx,
                playing: true,
                currentTime: 0,
                changerName: state.player.name || 'Axel'
              });
            }
          });
          container.appendChild(row);
        });
      }

      // Live Scrubber Progress Update
      setInterval(() => {
        if (localJukeboxState.playing && localJukeboxState.currentTrack) {
          const totalSec = localJukeboxState.currentTrack.duration || 180;
          localJukeboxState.currentTime = (localJukeboxState.currentTime + 1) % totalSec;
          const timeCurEl = document.getElementById('jukeTimeCurrent');
          const progressFill = document.getElementById('jukeProgressFill');
          if (timeCurEl) timeCurEl.textContent = formatTrackTime(localJukeboxState.currentTime);
          if (progressFill) {
            const pct = Math.min(100, Math.max(0, (localJukeboxState.currentTime / totalSec) * 100));
            progressFill.style.width = pct + '%';
          }
        }
      }, 1000);

      // Event Listeners for Jukebox Controls
      const hudBadge = document.getElementById('jukeboxHudBadge');
      if (hudBadge) hudBadge.addEventListener('click', openJukeboxModal);

      const closeBtn = document.getElementById('jukeCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', closeJukeboxModal);

      const overlay = document.getElementById('jukeboxModalOverlay');
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) closeJukeboxModal();
        });
      }

      const playToggleBtn = document.getElementById('jukePlayToggleBtn');
      if (playToggleBtn) {
        playToggleBtn.addEventListener('click', () => {
          const nextPlaying = !localJukeboxState.playing;
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('jukeboxTogglePlay', { playing: nextPlaying, currentTime: localJukeboxState.currentTime });
          } else {
            applyJukeboxServerState({ playing: nextPlaying });
          }
        });
      }

      const prevBtn = document.getElementById('jukePrevBtn');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('jukeboxPrev');
          }
        });
      }

      const nextBtn = document.getElementById('jukeNextBtn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('jukeboxNext');
          }
        });
      }

      const volSlider = document.getElementById('jukeVolSlider');
      if (volSlider) {
        volSlider.addEventListener('input', (e) => {
          applyJukeboxVolume(parseFloat(e.target.value), true);
        });
      }

      const muteBtn = document.getElementById('jukeMuteBtn');
      if (muteBtn) {
        muteBtn.addEventListener('click', () => {
          localJukeboxState.isMuted = !localJukeboxState.isMuted;
          muteBtn.textContent = localJukeboxState.isMuted ? 'DESMUTEAR' : 'MUTEAR';
          applyJukeboxVolume(localJukeboxState.volume, false);
        });
      }

      const loadBtn = document.getElementById('jukeLoadBtn');
      const urlInput = document.getElementById('jukeUrlInput');
      async function handleLoadSong() {
        if (!urlInput || !urlInput.value.trim()) return;
        const query = urlInput.value.trim();
        showToast('🔍 Cargando pista para la Gramola...');
        const track = await resolveMusicTrack(query);
        if (track) {
          urlInput.value = '';
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('jukeboxPlayTrack', { track: track, changerName: state.player.name || 'Axel' });
          } else {
            applyJukeboxServerState({
              currentTrack: track,
              playing: true,
              currentTime: 0,
              changerName: state.player.name || 'Axel'
            });
          }
          showToast(`🎵 Reproduciendo: "${track.title} - ${track.artist}"`);
        }
      }
      if (loadBtn) loadBtn.addEventListener('click', handleLoadSong);
      if (urlInput) {
        urlInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') handleLoadSong();
        });
      }

      const progressBar = document.getElementById('jukeProgressBar');
      if (progressBar) {
        progressBar.addEventListener('click', (e) => {
          const rect = progressBar.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(1, clickX / rect.width));
          const dur = (localJukeboxState.currentTrack && localJukeboxState.currentTrack.duration) ? localJukeboxState.currentTrack.duration : 180;
          const seekSec = Math.floor(pct * dur);
          if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('jukeboxSeek', { currentTime: seekSec });
          } else {
            applyJukeboxServerState({ currentTime: seekSec });
          }
        });
      }

// --- Explicit Global Window Bindings ---
if (typeof localJukeboxState !== 'undefined') window.localJukeboxState = localJukeboxState;
if (typeof jukebox3DRefs !== 'undefined') window.jukebox3DRefs = jukebox3DRefs;
if (typeof casinoSpeakerMeshes !== 'undefined') window.casinoSpeakerMeshes = casinoSpeakerMeshes;
if (typeof applyJukeboxServerState !== 'undefined') window.applyJukeboxServerState = applyJukeboxServerState;
if (typeof applyJukeboxVolume !== 'undefined') window.applyJukeboxVolume = applyJukeboxVolume;
