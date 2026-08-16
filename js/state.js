/* ============================================================
         PRECISION CURRENCY & MONEY HELPERS (2-DECIMAL INTEGER ARITHMETIC)
      ============================================================ */
      function roundMoney(val) {
        if (typeof val === 'string') {
          val = val.replace('$', '').replace('K', '000').replace('k', '000').trim();
        }
        const n = parseFloat(val);
        if (isNaN(n)) return 0;
        // Adding epsilon ensures that numbers like 0.09999999 or 0.10000002 round cleanly to 0.1
        return Math.round((n + 0.0000001) * 100) / 100;
      }

      function formatMoney(amount) {
        const amt = roundMoney(amount);
        if (amt >= 10000) return '$' + (amt / 1000) + 'K';
        if (amt >= 1000) return '$' + (amt / 1000).toFixed(amt % 1000 === 0 ? 0 : 1) + 'K';
        if (amt % 1 !== 0) {
          const tenths = Math.round(amt * 10);
          if (Math.abs(amt - tenths / 10) < 0.0001) {
            return '$' + (tenths / 10).toFixed(1);
          }
          return '$' + amt.toFixed(2);
        }
        return '$' + amt;
      }

      function updateBalanceUI() {
        state.balance = roundMoney(state.balance);
        const el = document.getElementById('balanceDisplay') || document.querySelector('.balance-val');
        if (el) el.textContent = formatMoney(state.balance);
      }

      /* ============================================================
         GLOBAL STATE
      ============================================================ */
      var savedNameLocal = localStorage.getItem('casino_player_name');
      var state = {
        balance: 1250,
        xp: 450,
        level: 12,
        mode: 'casino', // 'casino' | 'transition' | gameId
        keys: {},
        joyVec: { x: 0, y: 0 },
        player: { name: savedNameLocal || 'Axel', x: 0, z: 25, rotY: Math.PI, vx: 0, vz: 0, color: 0x8B5CF6, currentSeat: null },
        camFollowLook: new THREE.Vector3(),
        activeZone: null,
        savedCasinoCam: null,
      };

      // Top-left HUD profile panel name editing handler
      const profilePanelEl = document.getElementById('profilePanel') || document.querySelector('.top-left.panel');
      if (profilePanelEl) {
        profilePanelEl.addEventListener('click', () => {
          const currentName = state.player.name || 'Axel';
          const newName = prompt('Ingresa tu nuevo nombre de jugador:', currentName);
          if (newName && newName.trim() !== '') {
            const cleanName = newName.trim().substring(0, 16);
            state.player.name = cleanName;
            localStorage.setItem('casino_player_name', cleanName);

            // Update Top Left HUD UI
            const nameEl = document.getElementById('playerNameDisplay') || document.querySelector('.player-name');
            if (nameEl) nameEl.innerHTML = `${cleanName} ✏️ <span class="crown">👑</span>`;

            // Update 3D Floating Nametag Sprite above local player avatar
            if (typeof playerAvatar !== 'undefined' && playerAvatar && playerAvatar.userData && playerAvatar.userData.nameTag) {
              updatePlayerNameTagText(playerAvatar.userData.nameTag, cleanName);
            }

            // Emit updated name to server via Socket.IO for real-time multiplayer sync
            if (typeof socket !== 'undefined' && socket && socket.connected) {
              socket.emit('updateTransform', {
                x: playerAvatar.position.x,
                z: playerAvatar.position.z,
                rotY: playerAvatar.rotation.y,
                name: cleanName
              });
            }

            showToast(`✏️ Tu nombre ha sido cambiado a "${cleanName}"`);
          }
        });
      }

      /* ============================================================
         UNIFIED LUXURY 3D & HUD CASINO CHIP SYSTEM (16 DENOMINATIONS)
      ============================================================ */
      const CASINO_CHIPS = [
        { v: 0.1,  str: '0.1',  lbl: '$0.1',  bg: '#64748b', edge: '#f1f5f9', accent: '#334155', gold: false, hex: 0x64748b },
        { v: 0.2,  str: '0.2',  lbl: '$0.2',  bg: '#b45309', edge: '#fef3c7', accent: '#78350f', gold: false, hex: 0xb45309 },
        { v: 0.5,  str: '0.5',  lbl: '$0.5',  bg: '#0284c7', edge: '#e0f2fe', accent: '#0369a1', gold: false, hex: 0x0284c7 },
        { v: 1,    str: '1',    lbl: '$1',    bg: '#f8fafc', edge: '#cbd5e1', accent: '#94a3b8', gold: true,  hex: 0xf8fafc, darkText: true },
        { v: 2,    str: '2',    lbl: '$2',    bg: '#eab308', edge: '#fef08a', accent: '#a16207', gold: false, hex: 0xeab308, darkText: true },
        { v: 5,    str: '5',    lbl: '$5',    bg: '#dc2626', edge: '#fca5a5', accent: '#991b1b', gold: false, hex: 0xdc2626 },
        { v: 10,   str: '10',   lbl: '$10',   bg: '#2563eb', edge: '#bfdbfe', accent: '#1e40af', gold: false, hex: 0x2563eb },
        { v: 20,   str: '20',   lbl: '$20',   bg: '#059669', edge: '#a7f3d0', accent: '#065f46', gold: false, hex: 0x059669 },
        { v: 50,   str: '50',   lbl: '$50',   bg: '#7c3aed', edge: '#ddd6fe', accent: '#5b21b6', gold: false, hex: 0x7c3aed },
        { v: 100,  str: '100',  lbl: '$100',  bg: '#18181b', edge: '#fde047', accent: '#27272a', gold: true,  hex: 0x18181b },
        { v: 200,  str: '200',  lbl: '$200',  bg: '#0891b2', edge: '#a5f3fc', accent: '#155e75', gold: false, hex: 0x0891b2 },
        { v: 500,  str: '500',  lbl: '$500',  bg: '#db2777', edge: '#fbcfe8', accent: '#9d174d', gold: false, hex: 0xdb2777 },
        { v: 1000, str: '1k',   lbl: '$1K',   bg: '#991b1b', edge: '#fde047', accent: '#7f1d1d', gold: true,  hex: 0x991b1b },
        { v: 2000, str: '2k',   lbl: '$2K',   bg: '#6d28d9', edge: '#e9d5ff', accent: '#4c1d95', gold: false, hex: 0x6d28d9 },
        { v: 5000, str: '5k',   lbl: '$5K',   bg: '#0369a1', edge: '#fde047', accent: '#0c4a6e', gold: true,  hex: 0x0369a1 },
        { v: 10000,str: '10k',  lbl: '$10K',  bg: '#d97706', edge: '#fef08a', accent: '#92400e', gold: true,  hex: 0xd97706 }
      ];

      const _chipTexCache = {};
      function getCasinoChipTexture(chipDef) {
        if (_chipTexCache[chipDef.v]) return _chipTexCache[chipDef.v];

        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const cx = 128, cy = 128, r = 124;

        // 1. Base Outer Rim Circle
        ctx.fillStyle = chipDef.bg;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

        // 2. 6 Radial Striped Edge Inserts (Dice / Authentic Clay Chip Notches)
        ctx.fillStyle = chipDef.edge;
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.rect(-14, -r, 28, 26);
          ctx.fill();
          ctx.strokeStyle = chipDef.accent;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // 3. Outer Rim Groove Ring
        ctx.strokeStyle = chipDef.gold ? '#d4af37' : 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, r - 24, 0, Math.PI * 2); ctx.stroke();

        // 4. Inlay Center Disc
        const grad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 90);
        grad.addColorStop(0, chipDef.bg);
        grad.addColorStop(0.75, chipDef.accent);
        grad.addColorStop(1, '#05020a');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(cx, cy, r - 30, 0, Math.PI * 2); ctx.fill();

        // 5. Metallic Inner Ring (Gold / Platinum Inlay)
        ctx.strokeStyle = chipDef.gold ? '#fbbf24' : '#e2e8f0';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(cx, cy, r - 32, 0, Math.PI * 2); ctx.stroke();

        // 6. Embedded Star / Diamond Accents
        ctx.fillStyle = chipDef.gold ? '#fbbf24' : '#ffffff';
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          const px = cx + Math.cos(a) * (r - 46);
          const py = cy + Math.sin(a) * (r - 46);
          ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
        }

        // 7. Center Value Text
        ctx.font = '900 68px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

        // Drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillText(chipDef.str, cx + 2, cy + 4);

        // Core text
        ctx.fillStyle = chipDef.darkText ? '#0f172a' : '#ffffff';
        ctx.fillText(chipDef.str, cx, cy);

        // Subtext '$' currency symbol
        ctx.font = '800 24px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = chipDef.gold ? '#fbbf24' : (chipDef.darkText ? '#334155' : 'rgba(255,255,255,0.75)');
        ctx.fillText('$', cx, cy - 42);

        const tex = new THREE.CanvasTexture(canvas);
        _chipTexCache[chipDef.v] = tex;
        return tex;
      }

      function create3DChipSingleMesh(chipDef, radius = 0.085, height = 0.022) {
        const chipGroup = new THREE.Group();
        const tex = getCasinoChipTexture(chipDef);

        const topMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.28,
          metalness: chipDef.gold ? 0.65 : 0.35
        });

        const sideMat = new THREE.MeshStandardMaterial({
          color: chipDef.hex,
          roughness: 0.3,
          metalness: chipDef.gold ? 0.5 : 0.2
        });

        const cylinderGeo = new THREE.CylinderGeometry(radius, radius, height, 32);
        const mesh = new THREE.Mesh(cylinderGeo, [sideMat, topMat, topMat]);
        mesh.castShadow = true; mesh.receiveShadow = true;
        chipGroup.add(mesh);

        const ringGeo = new THREE.TorusGeometry(radius, 0.005, 8, 32);
        const ringMat = new THREE.MeshStandardMaterial({
          color: chipDef.gold ? 0xfbbf24 : (chipDef.hex || 0xffffff),
          metalness: 0.9,
          roughness: 0.15
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        chipGroup.add(ring);

        chipGroup.userData = { chipDef };
        return chipGroup;
      }

      function create3DChipStackMesh(amount, customRadius = 0.085, customHeight = 0.022) {
        const stackGroup = new THREE.Group();
        const amt = roundMoney(amount);
        if (amt <= 0) return stackGroup;

        let rem = amt;
        const chipsToStack = [];
        const sortedChips = [...CASINO_CHIPS].sort((a, b) => b.v - a.v);

        sortedChips.forEach(c => {
          while (rem >= (c.v - 0.0001) && chipsToStack.length < 8) {
            chipsToStack.push(c);
            rem = roundMoney(rem - c.v);
          }
        });

        if (chipsToStack.length === 0) chipsToStack.push(sortedChips[sortedChips.length - 1]);

        chipsToStack.reverse(); // largest on bottom

        chipsToStack.forEach((cDef, idx) => {
          const chipMesh = create3DChipSingleMesh(cDef, customRadius, customHeight);
          chipMesh.position.y = (idx * (customHeight + 0.002)) + (customHeight / 2);
          chipMesh.rotation.y = (idx * 0.42) % (Math.PI * 2);
          stackGroup.add(chipMesh);
        });

        const totalH = chipsToStack.length * (customHeight + 0.002);
        const displayStr = formatMoney(amt);

        const labelCanvas = document.createElement('canvas'); labelCanvas.width = 256; labelCanvas.height = 96;
        const lCtx = labelCanvas.getContext('2d');
        lCtx.fillStyle = '#0f081d';
        if (lCtx.roundRect) lCtx.roundRect(8, 8, 240, 80, 18); else lCtx.rect(8, 8, 240, 80);
        lCtx.fill();
        lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 4; lCtx.stroke();
        lCtx.font = '900 42px "Segoe UI", Arial, sans-serif';
        lCtx.fillStyle = '#fbbf24'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
        lCtx.fillText(displayStr, 128, 48);

        const labelTex = new THREE.CanvasTexture(labelCanvas);
        const labelMat = new THREE.SpriteMaterial({ map: labelTex, depthTest: false });
        const labelSprite = new THREE.Sprite(labelMat);
        labelSprite.scale.set(0.36, 0.14, 1);
        labelSprite.position.set(0, totalH + 0.09, 0);
        stackGroup.add(labelSprite);

        stackGroup.userData = { amount: amt, height: totalH };
        return stackGroup;
      }

      function populateAllChipRacks(activeVal = 50) {
        const rackConfigs = [
          { id: 'chipRackRoulette', onSelect: (v) => { rState.selectedChip = roundMoney(v); if (roulette3DRefs && roulette3DRefs.update3DChipRackSelection) roulette3DRefs.update3DChipRackSelection(); } },
          { id: 'chipRackDice', onSelect: (v) => { dState.bet = roundMoney(v); const d = document.getElementById('diceBetDisplay'); if (d) d.textContent = formatMoney(v); } },
          { id: 'chipRackBJ', onSelect: (v) => {
            if (typeof bjState !== 'undefined' && bjState.active) return;
            const chipVal = roundMoney(v);
            const nextBet = (typeof bjBetFirstClick !== 'undefined' && bjBetFirstClick) ? chipVal : roundMoney((bjState ? bjState.bet : 0) + chipVal);
            if (nextBet > state.balance) { showToast('⚠️ No tienes suficiente saldo para esa apuesta'); return; }
            if (typeof bjState !== 'undefined') bjState.bet = nextBet;
            if (typeof bjBetFirstClick !== 'undefined') bjBetFirstClick = false;
            const d = document.getElementById('bjBetDisplay');
            if (d) d.textContent = formatMoney(bjState ? bjState.bet : nextBet);
            if (window.bj3DRefs) update3DBJChips(bjState ? bjState.bet : nextBet);
            if (typeof socket !== 'undefined' && socket && socket.connected) {
              const mySeat = (state.player.currentSeat && typeof state.player.currentSeat.seatIndex === 'number') ? state.player.currentSeat.seatIndex : 1;
              socket.emit('blackjackBetChange', { bet: nextBet, seatIndex: mySeat });
            }
          }},
          { id: 'chipRackPlinko', onSelect: (v) => { plinkoBet = roundMoney(v); const d = document.getElementById('plinkoBetDisplay'); if (d) d.textContent = formatMoney(v); } },
          { id: 'chipRackWheel', onSelect: (v) => { const d = document.getElementById('wheelBetDisplay'); if (d) d.textContent = formatMoney(v); } },
          { id: 'chipRackCoin', onSelect: (v) => { const d = document.getElementById('coinBetDisplay'); if (d) d.textContent = formatMoney(v); } },
          { id: 'slotsChipRack', onSelect: (v) => { const d = document.getElementById('slotsBetDisplay'); if (d) d.textContent = formatMoney(v); } },
          { id: 'pachinkoChipRack', onSelect: (v) => { const d = document.getElementById('pachinkoBetDisplay'); if (d) d.textContent = formatMoney(v); } },
          { id: 'tragaperrasChipRack', onSelect: (v) => { const d = document.getElementById('tragaperrasBetDisplay'); if (d) d.textContent = formatMoney(v); } }
        ];

        rackConfigs.forEach(cfg => {
          const el = document.getElementById(cfg.id);
          if (!el) return;

          el.innerHTML = '';
          el.classList.add('chip-rack');

          CASINO_CHIPS.forEach(c => {
            const chipBtn = document.createElement('div');
            chipBtn.className = 'chip' + (c.v === activeVal ? ' selected' : '');
            chipBtn.dataset.v = c.v;
            chipBtn.title = c.lbl;
            chipBtn.innerHTML = `<span class="chip-txt">${c.str}</span>`;

            chipBtn.addEventListener('click', () => {
              playSound('chip');
              el.querySelectorAll('.chip').forEach(x => x.classList.remove('selected'));
              chipBtn.classList.add('selected');
              if (cfg.onSelect) cfg.onSelect(c.v);
            });

            el.appendChild(chipBtn);
          });
        });
      }

      const rState = { selectedChip: 50, bets: {}, totalBet: 0, spinning: false };

// --- Explicit Global Window Bindings ---
if (typeof state !== 'undefined') window.state = state;
if (typeof roundMoney !== 'undefined') window.roundMoney = roundMoney;
if (typeof formatMoney !== 'undefined') window.formatMoney = formatMoney;
if (typeof updateBalanceUI !== 'undefined') window.updateBalanceUI = updateBalanceUI;
if (typeof addXP !== 'undefined') window.addXP = addXP;
if (typeof showToast !== 'undefined') window.showToast = showToast;
if (typeof CHIP_DENOMINATIONS !== 'undefined') window.CHIP_DENOMINATIONS = CHIP_DENOMINATIONS;
if (typeof createChipCanvasTexture !== 'undefined') window.createChipCanvasTexture = createChipCanvasTexture;
if (typeof createChipMesh3D !== 'undefined') window.createChipMesh3D = createChipMesh3D;
if (typeof createChipStack3D !== 'undefined') window.createChipStack3D = createChipStack3D;
if (typeof create3DChipSingleMesh !== 'undefined') window.create3DChipSingleMesh = create3DChipSingleMesh;
if (typeof create3DChipStackMesh !== 'undefined') window.create3DChipStackMesh = create3DChipStackMesh;
if (typeof populateAllChipRacks !== 'undefined') window.populateAllChipRacks = populateAllChipRacks;

