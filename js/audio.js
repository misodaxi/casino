/* ============================================================
         WEB AUDIO SYNTHESIZER ENGINE (PROCEDURAL SOUNDS)
      ============================================================ */
      var audioCtx = null;
      var soundEnabled = true;

      // Pre-cached procedural AudioBuffers (Zero GC spikes during gameplay)
      var _diceNoiseBuf = null;
      var _cardNoiseBuf = null;
      var _explosionNoiseBuf = null;
      var _cachedSampleRate = 0;

      function getDiceNoiseBuffer(ctx) {
        if (!_diceNoiseBuf || _cachedSampleRate !== ctx.sampleRate) {
          _cachedSampleRate = ctx.sampleRate;
          const bufLen = Math.floor(ctx.sampleRate * 0.028);
          _diceNoiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
          const nData = _diceNoiseBuf.getChannelData(0);
          for (let i = 0; i < bufLen; i++) nData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.3));
        }
        return _diceNoiseBuf;
      }

      function getCardNoiseBuffer(ctx) {
        if (!_cardNoiseBuf || _cachedSampleRate !== ctx.sampleRate) {
          _cachedSampleRate = ctx.sampleRate;
          const bufLen = Math.floor(ctx.sampleRate * 0.11);
          _cardNoiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
          const nData = _cardNoiseBuf.getChannelData(0);
          for (let i = 0; i < bufLen; i++) {
            const progress = i / bufLen;
            const env = Math.sin(progress * Math.PI) * Math.exp(-progress * 1.8);
            nData[i] = (Math.random() * 2 - 1) * env;
          }
        }
        return _cardNoiseBuf;
      }

      function getExplosionNoiseBuffer(ctx) {
        if (!_explosionNoiseBuf || _cachedSampleRate !== ctx.sampleRate) {
          _cachedSampleRate = ctx.sampleRate;
          const bufferSize = Math.floor(ctx.sampleRate * 0.4);
          _explosionNoiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = _explosionNoiseBuf.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        }
        return _explosionNoiseBuf;
      }

      function initAudio() {
        if (!audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
      }

      function playSound(type, param) {
        if (!soundEnabled) return;
        initAudio();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;

        if (type === 'chip') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine'; osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.start(now); osc.stop(now + 0.05);
        }
        else if (type === 'win') {
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle'; osc.frequency.setValueAtTime(freq, now + i * 0.08);
            gain.gain.setValueAtTime(0.25, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(now + i * 0.08); osc.stop(now + i * 0.08 + 0.3);
          });
        }
        else if (type === 'lose') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth'; osc.frequency.setValueAtTime(250, now);
          osc.frequency.linearRampToValueAtTime(110, now + 0.35);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.start(now); osc.stop(now + 0.35);
        }
        else if (type === 'tick') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine'; osc.frequency.setValueAtTime(1200, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.start(now); osc.stop(now + 0.02);
        }
        else if (type === 'dice' || type === 'dice_felt' || type === 'dice_bounce') {
          // Síntesis física de dado de casino de acetato de celulosa sobre fieltro de mesa de craps
          const intensity = (typeof param === 'number') ? Math.max(0.18, Math.min(1.2, param)) : 0.85;
          const pitchShift = 0.94 + Math.random() * 0.12;

          // 1. Transitorio nítido del golpe de arista de resina/acetato (Sharp acrylic tap)
          const clickOsc = audioCtx.createOscillator();
          const clickGain = audioCtx.createGain();
          clickOsc.type = 'triangle';
          clickOsc.frequency.setValueAtTime(1050 * pitchShift, now);
          clickOsc.frequency.exponentialRampToValueAtTime(340 * pitchShift, now + 0.016);
          clickGain.gain.setValueAtTime(0.38 * intensity, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.016);
          clickOsc.connect(clickGain);
          clickGain.connect(audioCtx.destination);
          clickOsc.start(now);
          clickOsc.stop(now + 0.016);

          // 2. Ruido sordo y amortiguado de fibras de fieltro de lana (Felt wool absorption - Cached Buffer)
          const noiseSource = audioCtx.createBufferSource();
          noiseSource.buffer = getDiceNoiseBuffer(audioCtx);
          const noiseFilter = audioCtx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.setValueAtTime(1350 * pitchShift, now);
          noiseFilter.Q.setValueAtTime(2.0, now);
          const noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(0.30 * intensity, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
          noiseSource.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(audioCtx.destination);
          noiseSource.start(now);

          // 3. Resonancia grave de caja de mesa de casino de madera (Thump / Thock de madera)
          const thudOsc = audioCtx.createOscillator();
          const thudGain = audioCtx.createGain();
          thudOsc.type = 'sine';
          thudOsc.frequency.setValueAtTime(230 * pitchShift, now);
          thudOsc.frequency.exponentialRampToValueAtTime(105 * pitchShift, now + 0.065);
          thudGain.gain.setValueAtTime(0.42 * intensity, now);
          thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
          thudOsc.connect(thudGain);
          thudGain.connect(audioCtx.destination);
          thudOsc.start(now);
          thudOsc.stop(now + 0.065);
        }
        else if (type === 'dice_rail' || type === 'dice_bumper') {
          // Impacto elástico seco contra la goma piramidal / banda de madera de la mesa
          const intensity = (typeof param === 'number') ? Math.max(0.2, Math.min(1.2, param)) : 0.9;
          const pitch = 0.95 + Math.random() * 0.10;

          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1250 * pitch, now);
          osc.frequency.exponentialRampToValueAtTime(440 * pitch, now + 0.024);
          gain.gain.setValueAtTime(0.36 * intensity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.032);

          const thud = audioCtx.createOscillator();
          const thudG = audioCtx.createGain();
          thud.type = 'sine';
          thud.frequency.setValueAtTime(340 * pitch, now);
          thud.frequency.exponentialRampToValueAtTime(140 * pitch, now + 0.048);
          thudG.gain.setValueAtTime(0.26 * intensity, now);
          thudG.gain.exponentialRampToValueAtTime(0.001, now + 0.048);
          thud.connect(thudG);
          thudG.connect(audioCtx.destination);
          thud.start(now);
          thud.stop(now + 0.048);
        }
        else if (type === 'dice_clack') {
          // Choque nítido y cristalino entre dos dados de acrílico macizo
          const intensity = (typeof param === 'number') ? Math.max(0.2, Math.min(1.2, param)) : 1.0;
          const pitch = 0.96 + Math.random() * 0.08;

          const osc1 = audioCtx.createOscillator();
          const osc2 = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc1.type = 'sine'; osc2.type = 'triangle';
          osc1.frequency.setValueAtTime(2400 * pitch, now);
          osc1.frequency.exponentialRampToValueAtTime(1700 * pitch, now + 0.035);
          osc2.frequency.setValueAtTime(3600 * pitch, now);
          osc2.frequency.exponentialRampToValueAtTime(2200 * pitch, now + 0.025);
          g.gain.setValueAtTime(0.36 * intensity, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.038);
          osc1.connect(g); osc2.connect(g);
          g.connect(audioCtx.destination);
          osc1.start(now); osc2.start(now);
          osc1.stop(now + 0.038); osc2.stop(now + 0.038);
        }
        else if (type === 'coin_bounce' || type === 'coin' || type === 'coin_land') {
          // Síntesis física de moneda de oro con resonancia inarmónica y reverberación metálica
          const intensity = (typeof param === 'number') ? Math.max(0.15, Math.min(1.0, param)) : 1.0;
          const pitchVariation = 0.96 + Math.random() * 0.08;
          const baseFreq = 3150 * pitchVariation; // Frecuencia fundamental del metal precioso

          // Modos resonantes metálicos cristalinos
          const modes = [
            { f: baseFreq, g: 0.32 * intensity, decay: 0.44 },
            { f: baseFreq * 1.58, g: 0.22 * intensity, decay: 0.34 },
            { f: baseFreq * 2.30, g: 0.16 * intensity, decay: 0.26 },
            { f: baseFreq * 3.12, g: 0.10 * intensity, decay: 0.19 },
            { f: baseFreq * 0.65, g: 0.18 * intensity, decay: 0.14 }
          ];

          modes.forEach(m => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(m.f, now);
            gainNode.gain.setValueAtTime(m.g, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + m.decay);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + m.decay);
          });

          // Eco reverberante metálico secundario (ping reflejado)
          const echoTime = now + 0.045;
          const echoOsc = audioCtx.createOscillator();
          const echoGain = audioCtx.createGain();
          echoOsc.type = 'sine';
          echoOsc.frequency.setValueAtTime(baseFreq * 1.15, echoTime);
          echoGain.gain.setValueAtTime(0.12 * intensity, echoTime);
          echoGain.gain.exponentialRampToValueAtTime(0.0001, echoTime + 0.30);
          echoOsc.connect(echoGain);
          echoGain.connect(audioCtx.destination);
          echoOsc.start(echoTime);
          echoOsc.stop(echoTime + 0.30);
        }
        else if (type === 'coin_flip') {
          // Tintineo metálico agudo ascendente y vibrante al lanzar la moneda al aire
          const osc1 = audioCtx.createOscillator();
          const osc2 = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc1.type = 'sine'; osc2.type = 'sine';
          osc1.frequency.setValueAtTime(2200, now);
          osc1.frequency.exponentialRampToValueAtTime(4400, now + 0.22);
          osc2.frequency.setValueAtTime(3300, now);
          osc2.frequency.exponentialRampToValueAtTime(6600, now + 0.22);
          gain.gain.setValueAtTime(0.24, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
          osc1.connect(gain); osc2.connect(gain);
          gain.connect(audioCtx.destination);
          osc1.start(now); osc2.start(now);
          osc1.stop(now + 0.30); osc2.stop(now + 0.30);
        }
        else if (type === 'card_deal' || type === 'card' || type === 'card_slide') {
          // Síntesis física de carta de casino deslizada con buffer pre-cacheado
          const intensity = (typeof param === 'number') ? Math.max(0.2, Math.min(1.2, param)) : 0.90;
          const pitchShift = 0.95 + Math.random() * 0.10;

          // 1. Fricción aerodinámica de la carta deslizándose (Air whoosh & felt friction - Cached Buffer)
          const noiseSource = audioCtx.createBufferSource();
          noiseSource.buffer = getCardNoiseBuffer(audioCtx);

          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(3600 * pitchShift, now);
          filter.frequency.exponentialRampToValueAtTime(1600 * pitchShift, now + 0.10);
          filter.Q.setValueAtTime(1.8, now);

          const noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(0.32 * intensity, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

          noiseSource.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(audioCtx.destination);
          noiseSource.start(now);

          // 2. Chasquido elástico inicial de salida del zapato / borde de cartulina
          const snapOsc = audioCtx.createOscillator();
          const snapGain = audioCtx.createGain();
          snapOsc.type = 'triangle';
          snapOsc.frequency.setValueAtTime(1850 * pitchShift, now);
          snapOsc.frequency.exponentialRampToValueAtTime(450 * pitchShift, now + 0.022);
          snapGain.gain.setValueAtTime(0.38 * intensity, now);
          snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
          snapOsc.connect(snapGain);
          snapGain.connect(audioCtx.destination);
          snapOsc.start(now);
          snapOsc.stop(now + 0.022);

          // 3. Impacto suave sobre el fieltro acolchado al aterrizar
          const tapTime = now + 0.06;
          const tapOsc = audioCtx.createOscillator();
          const tapGain = audioCtx.createGain();
          tapOsc.type = 'sine';
          tapOsc.frequency.setValueAtTime(320 * pitchShift, tapTime);
          tapOsc.frequency.exponentialRampToValueAtTime(140 * pitchShift, tapTime + 0.035);
          tapGain.gain.setValueAtTime(0.22 * intensity, tapTime);
          tapGain.gain.exponentialRampToValueAtTime(0.001, tapTime + 0.035);
          tapOsc.connect(tapGain);
          tapGain.connect(audioCtx.destination);
          tapOsc.start(tapTime);
          tapOsc.stop(tapTime + 0.035);
        }
        else if (type === 'card_flip') {
          // Chasquido al voltear la carta del crupier sobre el tapete
          const intensity = (typeof param === 'number') ? Math.max(0.2, Math.min(1.2, param)) : 0.85;
          const pitch = 0.96 + Math.random() * 0.08;

          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(2100 * pitch, now);
          osc.frequency.exponentialRampToValueAtTime(520 * pitch, now + 0.028);
          g.gain.setValueAtTime(0.34 * intensity, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
          osc.connect(g);
          g.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.028);

          // Golpe sordo de caída plana de carta
          const slapOsc = audioCtx.createOscillator();
          const slapG = audioCtx.createGain();
          slapOsc.type = 'sine';
          slapOsc.frequency.setValueAtTime(380 * pitch, now + 0.015);
          slapOsc.frequency.exponentialRampToValueAtTime(160 * pitch, now + 0.045);
          slapG.gain.setValueAtTime(0.20 * intensity, now + 0.015);
          slapG.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
          slapOsc.connect(slapG);
          slapG.connect(audioCtx.destination);
          slapOsc.start(now + 0.015);
          slapOsc.stop(now + 0.045);
        }
        else if (type === 'explosion') {
          const noise = audioCtx.createBufferSource();
          noise.buffer = getExplosionNoiseBuffer(audioCtx);
          const gain = audioCtx.createGain();
          gain.gain.setValueAtTime(0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          noise.connect(gain); gain.connect(audioCtx.destination);
          noise.start(now);
          noise.stop(now + 0.4);
        }
      }

      document.getElementById('soundBtn').addEventListener('click', function () {
        soundEnabled = !soundEnabled;
        this.textContent = soundEnabled ? '🔊' : '🔇';
      });

// --- Explicit Global Window Bindings ---
if (typeof audioCtx !== 'undefined') window.audioCtx = audioCtx;
if (typeof soundEnabled !== 'undefined') window.soundEnabled = soundEnabled;
if (typeof playSound !== 'undefined') window.playSound = playSound;
