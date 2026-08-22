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

      var _bowlingNoiseBuf = null;
      function getBowlingNoiseBuffer(ctx) {
        if (!_bowlingNoiseBuf || _cachedSampleRate !== ctx.sampleRate) {
          _cachedSampleRate = ctx.sampleRate;
          const bufLen = Math.floor(ctx.sampleRate * 3.2);
          _bowlingNoiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
          const nData = _bowlingNoiseBuf.getChannelData(0);
          let lastOut = 0.0;
          for (let i = 0; i < bufLen; i++) {
            const white = Math.random() * 2 - 1;
            lastOut = (lastOut + 0.048 * white) / 1.048; // Brown noise de madera
            const slatMod = 1.0 + 0.12 * Math.sin(i * 0.024) + 0.08 * Math.sin(i * 0.065);
            nData[i] = lastOut * 3.5 * slatMod;
          }
        }
        return _bowlingNoiseBuf;
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
        else if (type === 'bowling_roll') {
          // Síntesis física hiperrealista de bola de 16 lbs rodando sobre parqué de arce encerado
          const duration = (param && typeof param.duration === 'number') ? param.duration / 1000 : 1.6;
          const power = (param && typeof param.power === 'number') ? param.power : 50;
          const pNorm = Math.max(0.25, power / 100);

          // 1. Sub-bass & Bass rumble profundo de resonancia de madera (75Hz - 110Hz)
          const rumbleOsc = audioCtx.createOscillator();
          const rumbleGain = audioCtx.createGain();
          const lfoOsc = audioCtx.createOscillator();
          const lfoGain = audioCtx.createGain();

          rumbleOsc.type = 'triangle';
          rumbleOsc.frequency.setValueAtTime(82 + pNorm * 24, now);
          rumbleOsc.frequency.exponentialRampToValueAtTime(68, now + duration);

          // LFO de rotación de la bola (wobble de circunferencia de giro 14-22Hz)
          lfoOsc.type = 'sine';
          lfoOsc.frequency.setValueAtTime(14 + pNorm * 8, now);
          lfoGain.gain.setValueAtTime(0.09 * pNorm, now);
          lfoOsc.connect(lfoGain);
          lfoGain.connect(rumbleGain.gain);

          // Envolvente de volumen de rodaje con atenuación espacial a lo largo de los 48m
          rumbleGain.gain.setValueAtTime(0.30 * pNorm, now);
          rumbleGain.gain.linearRampToValueAtTime(0.42 * pNorm, now + 0.12); // contacto inicial
          rumbleGain.gain.exponentialRampToValueAtTime(0.14 * pNorm, now + duration * 0.85); // alejamiento
          rumbleGain.gain.linearRampToValueAtTime(0.001, now + duration);

          rumbleOsc.connect(rumbleGain);
          rumbleGain.connect(audioCtx.destination);
          rumbleOsc.start(now);
          lfoOsc.start(now);
          rumbleOsc.stop(now + duration);
          lfoOsc.stop(now + duration);

          // 2. Fricción continua y textura de grano de madera (Wood Grain Friction Noise)
          const noiseSrc = audioCtx.createBufferSource();
          noiseSrc.buffer = getBowlingNoiseBuffer(audioCtx);
          const noiseFilter = audioCtx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.setValueAtTime(380 + pNorm * 180, now);
          noiseFilter.frequency.exponentialRampToValueAtTime(240, now + duration);
          noiseFilter.Q.setValueAtTime(2.2, now);

          const noiseLowpass = audioCtx.createBiquadFilter();
          noiseLowpass.type = 'lowpass';
          noiseLowpass.frequency.setValueAtTime(820, now);
          noiseLowpass.frequency.exponentialRampToValueAtTime(350, now + duration); // absorción acústica de aire

          const noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(0.38 * pNorm, now);
          noiseGain.gain.linearRampToValueAtTime(0.52 * pNorm, now + 0.12);
          noiseGain.gain.exponentialRampToValueAtTime(0.18 * pNorm, now + duration * 0.85);
          noiseGain.gain.linearRampToValueAtTime(0.001, now + duration);

          noiseSrc.connect(noiseFilter);
          noiseFilter.connect(noiseLowpass);
          noiseLowpass.connect(noiseGain);
          noiseGain.connect(audioCtx.destination);
          noiseSrc.start(now);
          noiseSrc.stop(now + duration);

          return {
            stop: function() {
              try {
                const stopNow = audioCtx.currentTime;
                rumbleGain.gain.cancelScheduledValues(stopNow);
                rumbleGain.gain.linearRampToValueAtTime(0.001, stopNow + 0.05);
                noiseGain.gain.cancelScheduledValues(stopNow);
                noiseGain.gain.linearRampToValueAtTime(0.001, stopNow + 0.05);
                setTimeout(() => {
                  try {
                    rumbleOsc.stop();
                    lfoOsc.stop();
                    noiseSrc.stop();
                  } catch (e) {}
                }, 60);
              } catch (e) {}
            }
          };
        }
        else if (type === 'bowling_hit' || type === 'bowling_strike') {
          // Impacto explosivo hiperrealista contra los 10 bolos de madera de arce macizo
          const isStrike = (type === 'bowling_strike') || (param && param.isStrike);
          const count = (param && typeof param.count === 'number') ? param.count : (isStrike ? 10 : 7);
          const intensity = Math.min(1.4, 0.6 + (count / 10) * 0.7);

          // 1. Chasquido cortante inicial de choque directo (Sharp Hardwood Snap)
          const snapOsc = audioCtx.createOscillator();
          const snapGain = audioCtx.createGain();
          snapOsc.type = 'triangle';
          snapOsc.frequency.setValueAtTime(2600, now);
          snapOsc.frequency.exponentialRampToValueAtTime(540, now + 0.022);
          snapGain.gain.setValueAtTime(0.65 * intensity, now);
          snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
          snapOsc.connect(snapGain); snapGain.connect(audioCtx.destination);
          snapOsc.start(now); snapOsc.stop(now + 0.025);

          // 2. Ruido explosivo de madera y percusión de masa
          const crashSrc = audioCtx.createBufferSource();
          crashSrc.buffer = getExplosionNoiseBuffer(audioCtx);
          const crashFilter = audioCtx.createBiquadFilter();
          crashFilter.type = 'bandpass';
          crashFilter.frequency.setValueAtTime(1450, now);
          crashFilter.Q.setValueAtTime(1.5, now);
          const crashGain = audioCtx.createGain();
          crashGain.gain.setValueAtTime(0.55 * intensity, now);
          crashGain.gain.exponentialRampToValueAtTime(0.001, now + (isStrike ? 0.38 : 0.24));
          crashSrc.connect(crashFilter); crashFilter.connect(crashGain); crashGain.connect(audioCtx.destination);
          crashSrc.start(now); crashSrc.stop(now + (isStrike ? 0.38 : 0.24));

          // 3. Resonancias armónicas de múltiples bolos de madera chocando entre sí
          const freqs = [480, 740, 1150, 1680, 2350];
          freqs.forEach((f, idx) => {
            const delay = idx * 0.018;
            const pOsc = audioCtx.createOscillator();
            const pGain = audioCtx.createGain();
            pOsc.type = (idx % 2 === 0) ? 'sine' : 'triangle';
            pOsc.frequency.setValueAtTime(f * (0.92 + Math.random() * 0.16), now + delay);
            pOsc.frequency.exponentialRampToValueAtTime(f * 0.6, now + delay + 0.09);
            pGain.gain.setValueAtTime(0.32 * intensity, now + delay);
            pGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.11);
            pOsc.connect(pGain); pGain.connect(audioCtx.destination);
            pOsc.start(now + delay); pOsc.stop(now + delay + 0.11);
          });

          // 4. Golpe grave de amortiguación en el foso posterior (Pit Cushion Thump)
          const pitThud = audioCtx.createOscillator();
          const pitGain = audioCtx.createGain();
          pitThud.type = 'sine';
          pitThud.frequency.setValueAtTime(130, now + 0.02);
          pitThud.frequency.exponentialRampToValueAtTime(45, now + 0.14);
          pitGain.gain.setValueAtTime(0.48 * intensity, now + 0.02);
          pitGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          pitThud.connect(pitGain); pitGain.connect(audioCtx.destination);
          pitThud.start(now + 0.02); pitThud.stop(now + 0.14);
        }
        else if (type === 'bowling_gutter') {
          const gThud = audioCtx.createOscillator();
          const gGain = audioCtx.createGain();
          gThud.type = 'sine';
          gThud.frequency.setValueAtTime(160, now);
          gThud.frequency.exponentialRampToValueAtTime(55, now + 0.12);
          gGain.gain.setValueAtTime(0.45, now);
          gGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          gThud.connect(gGain); gGain.connect(audioCtx.destination);
          gThud.start(now); gThud.stop(now + 0.12);
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
