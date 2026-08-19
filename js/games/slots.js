/* ============================================================
   REAL ANIMATED 3D SLOT REELS & GACHAPÓN ENGINE (ULTRA-OPTIMIZED 60 FPS)
   ============================================================ */
var TRAGAPERRAS_SYMBOLS = ['7️⃣', '🍒', '💎', '🔔', '🍋', '⭐', '🍇', '🍀'];
var SLOTS_SYMBOLS = ['🎰', '👑', '💎', '🔥', '⚡', '⭐', '🍉', '💰'];

window.slotMachinesByZone = {
  slots: [],
  pachinko: [],
  tragaperras: []
};

// ============================================================
// 16 MULTI-AXIS PAYLINES FOR 5x5 MEGA SLOTS
// ============================================================
const SLOTS_5X5_PAYLINES = [
  // 5 Ejes Horizontales (Filas 0 a 4)
  { id: 'h0', name: 'Fila 1 (Superior)', axis: 'horizontal', color: '#ec4899', coords: [[0,0], [1,0], [2,0], [3,0], [4,0]] },
  { id: 'h1', name: 'Fila 2', axis: 'horizontal', color: '#ec4899', coords: [[0,1], [1,1], [2,1], [3,1], [4,1]] },
  { id: 'h2', name: 'Fila 3 (Centro)', axis: 'horizontal', color: '#f59e0b', coords: [[0,2], [1,2], [2,2], [3,2], [4,2]] },
  { id: 'h3', name: 'Fila 4', axis: 'horizontal', color: '#ec4899', coords: [[0,3], [1,3], [2,3], [3,3], [4,3]] },
  { id: 'h4', name: 'Fila 5 (Inferior)', axis: 'horizontal', color: '#ec4899', coords: [[0,4], [1,4], [2,4], [3,4], [4,4]] },

  // 5 Ejes Verticales (Columnas 0 a 4)
  { id: 'v0', name: 'Columna 1 (Izq)', axis: 'vertical', color: '#06b6d4', coords: [[0,0], [0,1], [0,2], [0,3], [0,4]] },
  { id: 'v1', name: 'Columna 2', axis: 'vertical', color: '#06b6d4', coords: [[1,0], [1,1], [1,2], [1,3], [1,4]] },
  { id: 'v2', name: 'Columna 3 (Centro)', axis: 'vertical', color: '#3b82f6', coords: [[2,0], [2,1], [2,2], [2,3], [2,4]] },
  { id: 'v3', name: 'Columna 4', axis: 'vertical', color: '#06b6d4', coords: [[3,0], [3,1], [3,2], [3,3], [3,4]] },
  { id: 'v4', name: 'Columna 5 (Der)', axis: 'vertical', color: '#06b6d4', coords: [[4,0], [4,1], [4,2], [4,3], [4,4]] },

  // 2 Ejes Diagonales Principales
  { id: 'd0', name: 'Diagonal Principal', axis: 'diagonal', color: '#a855f7', coords: [[0,0], [1,1], [2,2], [3,3], [4,4]] },
  { id: 'd1', name: 'Anti-Diagonal', axis: 'diagonal', color: '#a855f7', coords: [[0,4], [1,3], [2,2], [3,1], [4,0]] },

  // 4 Ejes en Zig-Zag y Patrones Geométricos
  { id: 'z0', name: 'V-Superior', axis: 'zigzag', color: '#10b981', coords: [[0,0], [1,1], [2,2], [3,1], [4,0]] },
  { id: 'z1', name: 'V-Invertida', axis: 'zigzag', color: '#10b981', coords: [[0,4], [1,3], [2,2], [3,3], [4,4]] },
  { id: 'z2', name: 'W-Line', axis: 'zigzag', color: '#facc15', coords: [[0,2], [1,4], [2,2], [3,4], [4,2]] },
  { id: 'z3', name: 'M-Line', axis: 'zigzag', color: '#facc15', coords: [[0,2], [1,0], [2,2], [3,0], [4,2]] }
];

// Layout Metrics
const SLOT_W = 512, SLOT_H = 512;

// 3-Reel Classic Metrics (Tragaperras 777)
const TRAGA_REEL_W = 128, TRAGA_REEL_H = 275, TRAGA_REEL_Y = 115;
const TRAGA_SPACING = 148;
const TRAGA_START_X = 256 - TRAGA_SPACING;

// 5x5 Video Slots Metrics
const GRID_5X5_COLS = 5;
const GRID_5X5_ROWS = 5;
const GRID_START_X = 26;
const GRID_START_Y = 74;
const GRID_COL_W = 86;
const GRID_COL_GAP = 6;
const GRID_ROW_H = 70;
const GRID_ROW_GAP = 4;
const GRID_TOTAL_H = GRID_5X5_ROWS * (GRID_ROW_H + GRID_ROW_GAP) - GRID_ROW_GAP; // 366px

// ============================================================
// GACHAPÓN PRIZE TIERS & EXACT PROBABILITIES (MÍN. $300)
// - Mítico: 0.1% (x250)
// - Legendario: 1.0% (x50)
// - Épico: 3.9% (x18)
// - Raro: 10.0% (x6)
// - Poco Común: 20.0% (x2.5)
// - Común: 60% base / 65% total (x1.2) - 100% PREMIO GARANTIZADO
// ============================================================
const GACHAPON_PRIZES = {
  mitico: {
    tier: 'MÍTICO (0.1%)',
    prob: 0.001,
    color: '#ff0055',
    bg: 'rgba(255, 0, 85, 0.45)',
    name: '🌟 DRAGÓN ANCESTRAL MÍTICO ✨',
    icon: '🐉',
    mult: 250,
    capColor: '#ff0055',
    desc: '¡PREMIO MÍTICO SUPREMO (0.1%)!'
  },
  legendario: {
    tier: 'LEGENDARIO (1%)',
    prob: 0.010,
    color: '#facc15',
    bg: 'rgba(250, 204, 21, 0.40)',
    name: '👑 CORONA IMPERIAL DORADA',
    icon: '👑',
    mult: 50,
    capColor: '#facc15',
    desc: '¡CÁPSULA DORADA LEGENDARIA (1.0%)!'
  },
  epico: {
    tier: 'ÉPICO (3.9%)',
    prob: 0.039,
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.35)',
    name: '🔥 FÉNIX DE FUEGO ASTRAL',
    icon: '🔥',
    mult: 18,
    capColor: '#c084fc',
    desc: '¡CÁPSULA PÚRPURA ÉPICA (3.9%)!'
  },
  raro: {
    tier: 'RARO (10%)',
    prob: 0.100,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.30)',
    name: '💎 DIAMANTE CÓSMICO AZUL',
    icon: '💎',
    mult: 6,
    capColor: '#38bdf8',
    desc: '¡CÁPSULA AZUL RARA (10%)!'
  },
  pocoComun: {
    tier: 'POCO COMÚN (20%)',
    prob: 0.200,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.25)',
    name: '⭐ ESTRELLA DE LA SUERTE',
    icon: '⭐',
    mult: 2.5,
    capColor: '#34d399',
    desc: '¡CÁPSULA ESMERALDA POCO COMÚN (20%)!'
  },
  comun: {
    tier: 'COMÚN (60%)',
    prob: 0.650,
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.20)',
    name: '🍀 TRÉBOL DE JUGUETE',
    icon: '🍀',
    mult: 1.2,
    capColor: '#94a3b8',
    desc: '¡CÁPSULA COMÚN (60%)!'
  }
};

function initMachineGradients(machine) {
  if (machine.gradientsReady) return;
  const ctx = machine.ctx;
  if (!ctx) return;

  const is5x5 = (machine.type === 'slots');
  const isGachapon = (machine.type === 'pachinko');

  if (is5x5) {
    machine.reelGrads = [];
    for (let c = 0; c < 5; c++) {
      const rx = GRID_START_X + c * (GRID_COL_W + GRID_COL_GAP);
      const g = ctx.createLinearGradient(rx, GRID_START_Y, rx + GRID_COL_W, GRID_START_Y);
      g.addColorStop(0, '#0f172a');
      g.addColorStop(0.25, '#1e293b');
      g.addColorStop(0.5, '#334155');
      g.addColorStop(0.75, '#1e293b');
      g.addColorStop(1, '#0f172a');
      machine.reelGrads[c] = g;
    }

    const tShad = ctx.createLinearGradient(0, GRID_START_Y, 0, GRID_START_Y + 36);
    tShad.addColorStop(0, 'rgba(0,0,0,0.85)');
    tShad.addColorStop(1, 'transparent');
    machine.tShad = tShad;

    const bShad = ctx.createLinearGradient(0, GRID_START_Y + GRID_TOTAL_H - 36, 0, GRID_START_Y + GRID_TOTAL_H);
    bShad.addColorStop(0, 'transparent');
    bShad.addColorStop(1, 'rgba(0,0,0,0.85)');
    machine.bShad = bShad;
  } else if (!isGachapon) {
    machine.reelGrads = [];
    for (let i = 0; i < 3; i++) {
      const rx = TRAGA_START_X + i * TRAGA_SPACING - TRAGA_REEL_W / 2;
      const g = ctx.createLinearGradient(rx, TRAGA_REEL_Y, rx + TRAGA_REEL_W, TRAGA_REEL_Y);
      g.addColorStop(0, '#94a3b8');
      g.addColorStop(0.2, '#e2e8f0');
      g.addColorStop(0.5, '#ffffff');
      g.addColorStop(0.8, '#e2e8f0');
      g.addColorStop(1, '#94a3b8');
      machine.reelGrads[i] = g;
    }

    const tShad = ctx.createLinearGradient(0, TRAGA_REEL_Y, 0, TRAGA_REEL_Y + 45);
    tShad.addColorStop(0, 'rgba(0,0,0,0.85)');
    tShad.addColorStop(1, 'transparent');
    machine.tShad = tShad;

    const bShad = ctx.createLinearGradient(0, TRAGA_REEL_Y + TRAGA_REEL_H - 45, 0, TRAGA_REEL_Y + TRAGA_REEL_H);
    bShad.addColorStop(0, 'transparent');
    bShad.addColorStop(1, 'rgba(0,0,0,0.85)');
    machine.bShad = bShad;
  }

  machine.gradientsReady = true;
}

// -------------------------------------------------------------
// RENDERIZADO VISUAL 3D DE PANTALLA DE GACHAPÓN (512x512)
// -------------------------------------------------------------
function draw3DGachaponScreen(ctx, state, theme, machineRef) {
  if (!ctx) return;

  // Background con resplandor circular de neón cian/púrpura
  const bgGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 260);
  bgGrad.addColorStop(0, '#0c1a30');
  bgGrad.addColorStop(0.6, '#060d1a');
  bgGrad.addColorStop(1, '#02050a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, SLOT_W, SLOT_H);

  // Marco de neón cian y dorado
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, SLOT_W - 16, SLOT_H - 16);
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.strokeRect(14, 14, SLOT_W - 28, SLOT_H - 28);

  const t = performance.now() * 0.005;
  const pulse = Math.sin(t * 3.5) * 0.25 + 0.75;

  // Cabecera superior
  ctx.fillStyle = `rgba(6, 182, 212, ${pulse})`;
  ctx.font = '900 28px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🎁 GACHAPÓN MÁGICO · ガチャ 🎁', 256, 44);

  // Escenario Central de Cápsula
  if (state.spinning) {
    // -------------------------------------------------------------
    // FASE DE GIRO DE MANIVELA: MEZCLA Y CAÍDA DE CÁPSULAS
    // -------------------------------------------------------------
    const rot = t * 4;

    // Domo de Cápsulas con mezcla de esferas
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(256, 230, 130, 0, Math.PI * 2);
    ctx.stroke();

    // Cápsulas coloridas rebotando en el domo
    const capColors = ['#ff0055', '#facc15', '#c084fc', '#38bdf8', '#34d399', '#94a3b8'];
    for (let c = 0; c < 12; c++) {
      const ang = rot + (c / 12.0) * Math.PI * 2;
      const rad = 45 + (c % 3) * 35 + Math.sin(rot * 2 + c) * 12;
      const cx = 256 + Math.cos(ang) * rad;
      const cy = 230 + Math.sin(ang) * rad;

      // Media esfera superior colorida
      ctx.fillStyle = capColors[c % capColors.length];
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI, true);
      ctx.fill();

      // Media esfera inferior blanca
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI, false);
      ctx.fill();

      // Borde de cápsula
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.font = '900 24px "Segoe UI", sans-serif';
    ctx.fillStyle = '#facc15';
    ctx.fillText('🔄 ¡GIRANDO MANIVELA 3D...!', 256, 400);

    ctx.font = '700 16px "Segoe UI", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('EXTRAYENDO CÁPSULA SORPRESA', 256, 430);

  } else {
    // -------------------------------------------------------------
    // FASE DE REVELACIÓN: CÁPSULA ABIERTA Y PREMIO OBTENIDO
    // -------------------------------------------------------------
    const prize = state.lastPrize || GACHAPON_PRIZES.comun;

    // Rayos de luz estroboscópicos de fondo
    ctx.save();
    ctx.translate(256, 220);
    ctx.rotate(t * 0.5);
    for (let r = 0; r < 12; r++) {
      ctx.fillStyle = (r % 2 === 0) ? (prize.bg || 'rgba(6, 182, 212, 0.15)') : 'transparent';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const a1 = (r / 12) * Math.PI * 2;
      const a2 = ((r + 0.6) / 12) * Math.PI * 2;
      ctx.arc(0, 0, 160, a1, a2);
      ctx.fill();
    }
    ctx.restore();

    // Cápsula abierta (Mitad superior y mitad inferior separadas)
    // Tapa superior
    ctx.fillStyle = prize.capColor || '#facc15';
    ctx.beginPath();
    ctx.arc(256, 140, 48, Math.PI, 0, false);
    ctx.fill();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Tapa inferior
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(256, 300, 48, 0, Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Ícono del Premio Flotando en el Centro
    ctx.font = '900 85px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.fillText(prize.icon || '🍀', 256, 215);

    // Placa de Categoría / Tier
    ctx.fillStyle = prize.color || '#facc15';
    ctx.font = '900 18px "Segoe UI", sans-serif';
    ctx.fillText(`★ TIER ${prize.tier || 'COMÚN'} ★`, 256, 370);

    // Nombre del premio
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px "Segoe UI", sans-serif';
    ctx.fillText(prize.name || 'PREMIO GACHAPÓN', 256, 405);

    // Multiplicador de pago
    ctx.fillStyle = (prize.mult > 0) ? '#facc15' : '#94a3b8';
    ctx.font = '900 22px "Segoe UI", sans-serif';
    ctx.fillText((prize.mult > 0) ? `MULTIPLICADOR: x${prize.mult}` : 'SIN PREMIO', 256, 440);
  }

  // Barra de estado inferior
  ctx.font = 'bold 18px "Segoe UI", sans-serif';
  if (state.winner) {
    ctx.fillStyle = '#facc15';
    ctx.fillText(`⭐ ¡PREMIO RECLAMADO! (+$${roundMoney(state.bet * (state.multiplier || 1))}) ⭐`, 256, 485);
  } else {
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('APUESTA MÍNIMA $300 · GIRA LA MANIVELA 3D', 256, 485);
  }
}

function draw3DSlotMachineScreen(ctx, state, theme, type, machineRef) {
  if (!ctx) return;
  if (machineRef && !machineRef.gradientsReady) initMachineGradients(machineRef);

  if (type === 'pachinko') {
    draw3DGachaponScreen(ctx, state, theme, machineRef);
    return;
  }

  const is5x5 = (type === 'slots');

  // Background
  ctx.fillStyle = '#06030c';
  ctx.fillRect(0, 0, SLOT_W, SLOT_H);

  // Glowing outer marquee border
  ctx.strokeStyle = '#' + theme.color.toString(16).padStart(6, '0');
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, SLOT_W - 16, SLOT_H - 16);

  const t = performance.now() * 0.005;
  const pulse = Math.sin(t * 3) * 0.25 + 0.75;

  if (is5x5) {
    // -------------------------------------------------------------
    // RENDERIZADO 5x5 VIDEO SLOTS (5 COLUMNAS X 5 FILAS)
    // -------------------------------------------------------------
    ctx.fillStyle = `rgba(236, 72, 153, ${pulse})`;
    ctx.font = '900 28px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎰 MEGA SLOTS 5x5 MULTI-EJE 🎰', 256, 44);

    const symbols = SLOTS_SYMBOLS;
    const symCount = symbols.length;

    // Outer grid background & border
    ctx.fillStyle = '#0b0618';
    ctx.fillRect(GRID_START_X - 4, GRID_START_Y - 4, 5 * (GRID_COL_W + GRID_COL_GAP) - GRID_COL_GAP + 8, GRID_TOTAL_H + 8);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(GRID_START_X - 4, GRID_START_Y - 4, 5 * (GRID_COL_W + GRID_COL_GAP) - GRID_COL_GAP + 8, GRID_TOTAL_H + 8);

    // Render 5 Column Reels
    for (let c = 0; c < 5; c++) {
      const rx = GRID_START_X + c * (GRID_COL_W + GRID_COL_GAP);

      // Reel Column Background
      ctx.fillStyle = (machineRef && machineRef.reelGrads && machineRef.reelGrads[c]) ? machineRef.reelGrads[c] : '#1e293b';
      ctx.fillRect(rx, GRID_START_Y, GRID_COL_W, GRID_TOTAL_H);

      // Column Border
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.40)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(rx, GRID_START_Y, GRID_COL_W, GRID_TOTAL_H);

      // Symbols Rendering
      const pos = (state.reels && state.reels[c] !== undefined) ? state.reels[c] : 0;
      const normPos = ((pos % symCount) + symCount) % symCount;
      const baseIndex = Math.floor(normPos);
      const frac = normPos - baseIndex;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, GRID_START_Y, GRID_COL_W, GRID_TOTAL_H);
      ctx.clip();

      ctx.font = '900 42px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let offset = -1; offset <= 5; offset++) {
        const symIdx = ((baseIndex - offset) % symCount + symCount) % symCount;
        const sy = GRID_START_Y + 35 + (offset + frac) * (GRID_ROW_H + GRID_ROW_GAP);

        const distFromCenter = Math.abs(sy - (GRID_START_Y + GRID_TOTAL_H / 2)) / (GRID_TOTAL_H / 2);
        ctx.globalAlpha = Math.max(0.35, 1.0 - distFromCenter * 0.50);

        ctx.fillText(symbols[symIdx], rx + GRID_COL_W / 2, sy);
      }
      ctx.restore();

      // Top & Bottom 3D Column Shadows
      if (machineRef && machineRef.tShad && machineRef.bShad) {
        ctx.fillStyle = machineRef.tShad;
        ctx.fillRect(rx, GRID_START_Y, GRID_COL_W, 36);
        ctx.fillStyle = machineRef.bShad;
        ctx.fillRect(rx, GRID_START_Y + GRID_TOTAL_H - 36, GRID_COL_W, 36);
      }
    }

    // Grid Row Separator Lines
    for (let r = 1; r < 5; r++) {
      const ry = GRID_START_Y + r * (GRID_ROW_H + GRID_ROW_GAP) - GRID_ROW_GAP / 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(GRID_START_X, ry);
      ctx.lineTo(GRID_START_X + 5 * (GRID_COL_W + GRID_COL_GAP) - GRID_COL_GAP, ry);
      ctx.stroke();
    }

    // WINNING MULTI-AXIS HIGHLIGHTS
    if (state.winner && state.winningLines && state.winningLines.length > 0) {
      state.winningLines.forEach((wLine, idx) => {
        const pLine = wLine.line;
        if (!pLine || !pLine.coords) return;

        ctx.strokeStyle = pLine.color || '#fde047';
        ctx.lineWidth = 4.5;
        ctx.beginPath();

        pLine.coords.forEach(([c, r], cIdx) => {
          const cx = GRID_START_X + c * (GRID_COL_W + GRID_COL_GAP) + GRID_COL_W / 2;
          const cy = GRID_START_Y + r * (GRID_ROW_H + GRID_ROW_GAP) + GRID_ROW_H / 2;
          if (cIdx === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);

          // Highlight Cell Box
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(GRID_START_X + c * (GRID_COL_W + GRID_COL_GAP) + 2, GRID_START_Y + r * (GRID_ROW_H + GRID_ROW_GAP) + 2, GRID_COL_W - 4, GRID_ROW_H - 4);
        });
        ctx.stroke();
      });
    }

    // Bottom Payline & Win Info
    ctx.font = 'bold 22px "Segoe UI", sans-serif';
    if (state.winner) {
      ctx.fillStyle = '#fde047';
      const numLines = (state.winningLines && state.winningLines.length) ? state.winningLines.length : 1;
      ctx.fillText(`⭐ ¡PREMIO x${state.multiplier}! (${numLines} LÍNEAS EN EJES) ⭐`, 256, 475);
    } else {
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('16 LÍNEAS ACTIVAS · PREMIO HASTA x100', 256, 475);
    }

  } else {
    // -------------------------------------------------------------
    // RENDERIZADO 3-RODILLOS TRADICIONAL (TRAGAPERRAS 777)
    // -------------------------------------------------------------
    ctx.fillStyle = `rgba(245, 158, 11, ${pulse})`;
    ctx.font = '900 38px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍒 TRAGAPERRAS 777 🍒', 256, 68);

    const symbols = (type === 'tragaperras') ? TRAGAPERRAS_SYMBOLS : SLOTS_SYMBOLS;
    const symCount = symbols.length;

    for (let i = 0; i < 3; i++) {
      const rx = TRAGA_START_X + i * TRAGA_SPACING - TRAGA_REEL_W / 2;

      // Reel Background
      ctx.fillStyle = (machineRef && machineRef.reelGrads && machineRef.reelGrads[i]) ? machineRef.reelGrads[i] : '#e2e8f0';
      ctx.fillRect(rx, TRAGA_REEL_Y, TRAGA_REEL_W, TRAGA_REEL_H);

      // Reel Golden Border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(rx, TRAGA_REEL_Y, TRAGA_REEL_W, TRAGA_REEL_H);

      // Symbols rendering
      const pos = (state.reels && state.reels[i] !== undefined) ? state.reels[i] : 0;
      const normPos = ((pos % symCount) + symCount) % symCount;
      const baseIndex = Math.floor(normPos);
      const frac = normPos - baseIndex;

      ctx.font = '900 68px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, TRAGA_REEL_Y, TRAGA_REEL_W, TRAGA_REEL_H);
      ctx.clip();

      for (let offset = -2; offset <= 2; offset++) {
        const symIdx = ((baseIndex - offset) % symCount + symCount) % symCount;
        const sy = TRAGA_REEL_Y + TRAGA_REEL_H / 2 + (offset + frac) * 85;
        
        const distFromCenter = Math.abs(sy - (TRAGA_REEL_Y + TRAGA_REEL_H / 2)) / (TRAGA_REEL_H / 2);
        ctx.globalAlpha = Math.max(0.25, 1.0 - distFromCenter * 0.65);
        
        ctx.fillText(symbols[symIdx], rx + TRAGA_REEL_W / 2, sy);
      }
      ctx.restore();

      // Top & Bottom 3D Cylindrical Shadow
      if (machineRef && machineRef.tShad && machineRef.bShad) {
        ctx.fillStyle = machineRef.tShad;
        ctx.fillRect(rx, TRAGA_REEL_Y, TRAGA_REEL_W, 45);
        ctx.fillStyle = machineRef.bShad;
        ctx.fillRect(rx, TRAGA_REEL_Y + TRAGA_REEL_H - 45, TRAGA_REEL_W, 45);
      }
    }

    // Center Payline Laser Beam
    ctx.strokeStyle = state.winner ? '#fde047' : '#ef4444';
    ctx.lineWidth = state.winner ? 6 : 4;
    ctx.beginPath();
    ctx.moveTo(25, TRAGA_REEL_Y + TRAGA_REEL_H / 2);
    ctx.lineTo(SLOT_W - 25, TRAGA_REEL_Y + TRAGA_REEL_H / 2);
    ctx.stroke();

    // Bottom Jackpots info
    ctx.font = 'bold 26px "Segoe UI", sans-serif';
    ctx.fillStyle = state.winner ? '#fde047' : '#cbd5e1';
    ctx.fillText(state.winner ? '⭐ ¡PREMIO GANADOR! ⭐' : 'JACKPOT x50  |  3 EN LÍNEA', 256, 452);
  }
}

window.activeSpinningSlotsCount = 0;
window.dirtySlotsCount = 0;
window.slotTexUpdatesThisSec = 0;

function updateSlot3DScreens(dt) {
  if (window.activeSpinningSlotsCount <= 0 && window.dirtySlotsCount <= 0) return;
  if (!window.slotMachinesByZone) return;

  const now = performance.now();

  for (const zoneId of ['slots', 'pachinko', 'tragaperras']) {
    const machines = window.slotMachinesByZone[zoneId];
    if (!machines) continue;

    for (let m = 0; m < machines.length; m++) {
      const item = machines[m];
      const st = item.state;

      // -------------------------------------------------------------
      // GACHAPÓN CRANK TURN & REVEAL ENGINE
      // -------------------------------------------------------------
      if (item.type === 'pachinko') {
        if (st.spinning) {
          const elapsed = now - st.startTime;
          const spinDuration = 1600;

          if (elapsed < spinDuration) {
            draw3DGachaponScreen(item.ctx, st, item.theme, item);
            item.tex.needsUpdate = true;
            window.slotTexUpdatesThisSec++;
          } else {
            st.spinning = false;
            window.activeSpinningSlotsCount = Math.max(0, window.activeSpinningSlotsCount - 1);

            const wonAmount = roundMoney(st.bet * (st.multiplier || 0));

            if (st.multiplier > 0) {
              st.winner = true;
              state.balance = roundMoney(state.balance + wonAmount);
              updateBalanceUI();
              playSound('win');

              if (st.multiplier >= 50) {
                if (typeof spawnConfetti === 'function') spawnConfetti();
                addXP(500);
              } else if (st.multiplier >= 15) {
                if (typeof spawnConfetti === 'function') spawnConfetti();
                addXP(250);
              } else {
                addXP(80);
              }

              if (st.statusEl) {
                st.statusEl.className = 'slot-payout-info-bar win';
                st.statusEl.textContent = `🎁 ¡Gachapón: ${st.lastPrize.name}! Ganaste +$${wonAmount} (x${st.multiplier})!`;
              }
              showToast(`🎁 ¡${st.lastPrize.name}! +$${wonAmount} (x${st.multiplier})`);
            } else {
              st.winner = false;
              playSound('lose');
              if (st.statusEl) {
                st.statusEl.className = 'slot-payout-info-bar';
                st.statusEl.textContent = '❌ Cápsula vacía. ¡Prueba otra tirada!';
              }
              showToast('Gachapón: Cápsula vacía, ¡sigue intentándolo!');
            }

            draw3DGachaponScreen(item.ctx, st, item.theme, item);
            item.tex.needsUpdate = true;
            window.slotTexUpdatesThisSec++;
          }
        } else if (st.dirty) {
          st.dirty = false;
          window.dirtySlotsCount = Math.max(0, window.dirtySlotsCount - 1);
          draw3DGachaponScreen(item.ctx, st, item.theme, item);
          item.tex.needsUpdate = true;
          window.slotTexUpdatesThisSec++;
        }
        continue;
      }

      // -------------------------------------------------------------
      // SLOTS & TRAGAPERRAS STANDARD REELS ENGINE
      // -------------------------------------------------------------
      const is5x5 = (item.type === 'slots');
      const numReels = is5x5 ? 5 : 3;

      if (st.spinning) {
        const elapsed = now - st.startTime;
        let allDone = true;

        for (let i = 0; i < numReels; i++) {
          const stopTime = st.stopDelays[i];
          const startPos = st.startReels[i];
          const endPos = st.finalTargets[i];

          if (elapsed < stopTime) {
            allDone = false;
            const spinProgress = elapsed / stopTime;
            const easeSpin = Math.pow(spinProgress, 1.6);
            st.reels[i] = startPos + (endPos - startPos) * easeSpin;

            if (now - (st.lastTickTime[i] || 0) > (is5x5 ? 75 : 85)) {
              st.lastTickTime[i] = now;
              playSound('tick', 0.20);
            }
          } else {
            const settleElapsed = elapsed - stopTime;
            const settleDuration = is5x5 ? 240 : 280;

            if (settleElapsed < settleDuration) {
              allDone = false;
              const sp = settleElapsed / settleDuration;
              const bounce = 1 + Math.sin(sp * Math.PI) * 0.12 * Math.exp(-sp * 3.5);
              st.reels[i] = endPos + (1 - bounce) * 0.45;
            } else {
              st.reels[i] = endPos;
              if (!st.stopped[i]) {
                st.stopped[i] = true;
                playSound('dice_clack', 0.65);
              }
            }
          }
        }

        draw3DSlotMachineScreen(item.ctx, st, item.theme, item.type, item);
        item.tex.needsUpdate = true;
        window.slotTexUpdatesThisSec++;

        if (allDone) {
          st.spinning = false;
          window.activeSpinningSlotsCount = Math.max(0, window.activeSpinningSlotsCount - 1);
          const wonAmount = roundMoney(st.bet * st.multiplier);

          if (st.multiplier > 0) {
            st.winner = true;
            state.balance = roundMoney(state.balance + wonAmount);
            updateBalanceUI();
            playSound('win');

            if (st.multiplier >= 15) {
              if (typeof spawnConfetti === 'function') spawnConfetti();
              addXP(250);
            } else {
              addXP(80);
            }

            if (st.statusEl) {
              st.statusEl.className = 'slot-payout-info-bar win';
              st.statusEl.textContent = `${st.winName} ¡Ganaste +$${wonAmount}! 💰`;
            }
            showToast(`${st.winName} +$${wonAmount}! 🎰`);
          } else {
            st.winner = false;
            playSound('lose');
            if (st.statusEl) {
              st.statusEl.className = 'slot-payout-info-bar';
              st.statusEl.textContent = '❌ Sin premio. ¡Prueba otra tirada!';
            }
            showToast(is5x5 ? 'Slots 5x5: ¡Casi! Sigue buscando líneas en los ejes' : 'Tragaperras: Casi, ¡sigue intentándolo!');
          }

          draw3DSlotMachineScreen(item.ctx, st, item.theme, item.type, item);
          item.tex.needsUpdate = true;
          window.slotTexUpdatesThisSec++;
        }
      } else if (st.dirty) {
        st.dirty = false;
        window.dirtySlotsCount = Math.max(0, window.dirtySlotsCount - 1);
        draw3DSlotMachineScreen(item.ctx, st, item.theme, item.type, item);
        item.tex.needsUpdate = true;
        window.slotTexUpdatesThisSec++;
      }
    }
  }
}

function evaluate5x5GridWins(grid) {
  const winningLines = [];
  let totalMultiplier = 0;

  SLOTS_5X5_PAYLINES.forEach(pLine => {
    const syms = pLine.coords.map(([c, r]) => grid[c][r]);

    // 1. 5 de 5 Iguales en el eje
    if (syms[0] === syms[1] && syms[1] === syms[2] && syms[2] === syms[3] && syms[3] === syms[4]) {
      const s = syms[0];
      const mult = (s === '👑' || s === '🎰') ? 75 : ((s === '💎' || s === '🔥') ? 50 : 25);
      winningLines.push({ line: pLine, match: 5, symbol: s, multiplier: mult });
      totalMultiplier += mult;
    }
    // 2. 4 Consecutivos en el eje
    else if ((syms[0] === syms[1] && syms[1] === syms[2] && syms[2] === syms[3]) ||
             (syms[1] === syms[2] && syms[2] === syms[3] && syms[3] === syms[4])) {
      const s = syms[2];
      const mult = (s === '👑' || s === '🎰' || s === '💎') ? 20 : 10;
      winningLines.push({ line: pLine, match: 4, symbol: s, multiplier: mult });
      totalMultiplier += mult;
    }
    // 3. 3 Consecutivos en el eje
    else if ((syms[0] === syms[1] && syms[1] === syms[2]) ||
             (syms[1] === syms[2] && syms[2] === syms[3]) ||
             (syms[2] === syms[3] && syms[3] === syms[4])) {
      const s = syms[2];
      const mult = (s === '👑' || s === '🎰' || s === '💎') ? 6 : 3;
      winningLines.push({ line: pLine, match: 3, symbol: s, multiplier: mult });
      totalMultiplier += mult;
    }
  });

  return { winningLines, totalMultiplier };
}

function spinSlotMachine(gameType) {
  const isTraga = (gameType === 'tragaperras');
  const isGachapon = (gameType === 'pachinko');
  const isSlots5x5 = (gameType === 'slots');
  const symbols = isTraga ? TRAGAPERRAS_SYMBOLS : SLOTS_SYMBOLS;
  const prefix = isTraga ? 'traga' : (isGachapon ? 'pachinko' : 'slots');
  const bet = isTraga ? (window.tragaBet || 10) : (isGachapon ? (window.pachinkoBet || 300) : (window.slotsBet || 20));

  const mySeatIdx = (state.player.currentSeat && state.player.currentSeat.zone === gameType && typeof state.player.currentSeat.seatIndex === 'number')
    ? state.player.currentSeat.seatIndex
    : 0;

  const machines = window.slotMachinesByZone[gameType] || [];
  const machine = machines[mySeatIdx] || machines[0];
  if (!machine) return;

  const st = machine.state;
  if (st.spinning) return;
  if (state.balance < bet) {
    showToast(`⚠️ Saldo insuficiente para apostar ($${bet} necesarios)`);
    return;
  }

  state.balance = roundMoney(state.balance - bet);
  updateBalanceUI();
  playSound('coin_flip');

  st.spinning = true;
  window.activeSpinningSlotsCount++;
  st.winner = false;
  st.bet = bet;

  // Animación de la manivela giratoria en Gachapón
  if (machine.crankGroup) {
    const crankStart = performance.now();
    function animCrank(now) {
      const cp = Math.min(1, (now - crankStart) / 1400);
      machine.crankGroup.rotation.z = cp * Math.PI * 4.0;
      if (Math.random() < 0.25) playSound('tick', 0.15);
      if (cp < 1) requestAnimationFrame(animCrank);
      else machine.crankGroup.rotation.z = 0;
    }
    requestAnimationFrame(animCrank);
  } else if (machine.leverPivot) {
    const leverStart = performance.now();
    function animLever(now) {
      const lp = Math.min(1, (now - leverStart) / 380);
      if (lp < 0.45) {
        const p = lp / 0.45;
        machine.leverPivot.rotation.x = Math.sin(p * Math.PI * 0.5) * 0.75;
      } else {
        const p = (lp - 0.45) / 0.55;
        machine.leverPivot.rotation.x = (1 - p) * 0.75;
      }
      if (lp < 1) requestAnimationFrame(animLever);
      else machine.leverPivot.rotation.x = 0;
    }
    requestAnimationFrame(animLever);
  }

  const statusEl = document.getElementById(`${prefix}StatusText`);
  if (statusEl) {
    statusEl.className = 'slot-payout-info-bar';
    statusEl.textContent = isGachapon
      ? '🎁 ¡Girando manivela del Gachapón sorpresa...!'
      : (isSlots5x5
          ? '🎰 ¡Girando matriz 5x5 con 16 ejes activos...!'
          : '🍒 ¡Girando rodillos 3D de la suerte 777...!');
  }
  st.statusEl = statusEl;

  // -------------------------------------------------------------
  // GACHAPÓN EXACT PROBABILITY ROLL (100% PREMIOS GARANTIZADOS)
  // Mítico (0.1%), Legendario (1%), Épico (3.9%), Raro (10%), Poco Común (20%), Común (60%+)
  // -------------------------------------------------------------
  if (isGachapon) {
    const roll = Math.random();
    let prize = GACHAPON_PRIZES.comun;

    if (roll < 0.001) {
      prize = GACHAPON_PRIZES.mitico; // 0.1% Mítico (x250)
    } else if (roll < 0.011) {
      prize = GACHAPON_PRIZES.legendario; // 1.0% Legendario (x50)
    } else if (roll < 0.050) {
      prize = GACHAPON_PRIZES.epico; // 3.9% Épico (x18)
    } else if (roll < 0.150) {
      prize = GACHAPON_PRIZES.raro; // 10.0% Raro (x6)
    } else if (roll < 0.350) {
      prize = GACHAPON_PRIZES.pocoComun; // 20.0% Poco común (x2.5)
    } else {
      prize = GACHAPON_PRIZES.comun; // 60%+ Común (x1.2)
    }

    st.lastPrize = prize;
    st.multiplier = prize.mult;
    st.startTime = performance.now();
    return;
  }

  const symCount = symbols.length;

  if (isSlots5x5) {
    // -------------------------------------------------------------
    // MATRIZ 5X5 CON GENERACIÓN MULTI-EJE
    // -------------------------------------------------------------
    const grid = [];
    for (let c = 0; c < 5; c++) {
      grid[c] = [];
      for (let r = 0; r < 5; r++) {
        grid[c][r] = symbols[Math.floor(Math.random() * symCount)];
      }
    }

    const roll = Math.random();
    if (roll < 0.10) {
      const jackSym = symbols[Math.floor(Math.random() * 3)];
      for (let c = 0; c < 5; c++) grid[c][2] = jackSym;
      for (let i = 0; i < 5; i++) grid[i][i] = jackSym;
    } else if (roll < 0.28) {
      const pickLine = SLOTS_5X5_PAYLINES[Math.floor(Math.random() * SLOTS_5X5_PAYLINES.length)];
      const winSym = symbols[Math.floor(Math.random() * 5)];
      pickLine.coords.forEach(([c, r]) => { grid[c][r] = winSym; });
    } else if (roll < 0.58) {
      const pickLine1 = SLOTS_5X5_PAYLINES[Math.floor(Math.random() * 5)];
      const pickLine2 = SLOTS_5X5_PAYLINES[5 + Math.floor(Math.random() * 5)];
      const winSym = symbols[1 + Math.floor(Math.random() * (symCount - 1))];
      pickLine1.coords.slice(0, 3).forEach(([c, r]) => { grid[c][r] = winSym; });
      pickLine2.coords.slice(0, 3).forEach(([c, r]) => { grid[c][r] = winSym; });
    }

    const { winningLines, totalMultiplier } = evaluate5x5GridWins(grid);
    st.winningLines = winningLines;
    st.multiplier = totalMultiplier;

    if (totalMultiplier > 0) {
      const topWin = winningLines[0];
      st.winName = `🎉 ¡${winningLines.length} LÍNEAS EN EJES (${topWin.line.name})!`;
    } else {
      st.winName = '';
    }

    const targetIndices = [];
    for (let c = 0; c < 5; c++) {
      const centerSym = grid[c][0];
      const idx = symbols.indexOf(centerSym);
      targetIndices.push(idx >= 0 ? idx : 0);
    }

    const startTime = performance.now();
    const stopDelays = [800, 1100, 1400, 1700, 2000];
    const totalRotations = [24, 32, 40, 48, 56];

    const startReelPositions = st.reels ? [...st.reels] : [0, 0, 0, 0, 0];
    while (startReelPositions.length < 5) startReelPositions.push(0);
    const finalTargetPositions = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      const currentPos = startReelPositions[i];
      const curNorm = ((currentPos % symCount) + symCount) % symCount;
      const neededAdvance = ((targetIndices[i] - curNorm) % symCount + symCount) % symCount;
      finalTargetPositions[i] = currentPos + totalRotations[i] * symCount + neededAdvance;
    }

    st.startTime = startTime;
    st.stopDelays = stopDelays;
    st.startReels = startReelPositions;
    st.finalTargets = finalTargetPositions;

  } else {
    // -------------------------------------------------------------
    // MATRIZ 3-RODILLOS CLÁSICA (TRAGAPERRAS 777)
    // -------------------------------------------------------------
    const roll = Math.random();
    let targetSyms = [];
    let multiplier = 0;
    let winName = '';

    if (roll < 0.08) {
      const jackSym = symbols[0];
      targetSyms = [jackSym, jackSym, jackSym];
      multiplier = 50;
      winName = '⭐ ¡SUPER JACKPOT TRIPLE 7!';
    } else if (roll < 0.22) {
      const pickSym = symbols[1 + Math.floor(Math.random() * (symbols.length - 1))];
      targetSyms = [pickSym, pickSym, pickSym];
      multiplier = (pickSym === '💎' || pickSym === '👑') ? 25 : ((pickSym === '🔔' || pickSym === '🔥') ? 15 : 8);
      winName = `🎉 ¡TRIPLE ${pickSym}! (x${multiplier})`;
    } else if (roll < 0.48) {
      const matchSym = symbols[1];
      let diffSym = symbols[Math.floor(Math.random() * symbols.length)];
      while (diffSym === matchSym) diffSym = symbols[Math.floor(Math.random() * symbols.length)];
      targetSyms = [matchSym, matchSym, diffSym];
      multiplier = 2;
      winName = `🍒 ¡Doble ${matchSym}! (x2)`;
    } else {
      const s0 = symbols[Math.floor(Math.random() * symbols.length)];
      let s1 = symbols[Math.floor(Math.random() * symbols.length)];
      while (s1 === s0) s1 = symbols[Math.floor(Math.random() * symbols.length)];
      let s2 = symbols[Math.floor(Math.random() * symbols.length)];
      while (s2 === s0 || s2 === s1) s2 = symbols[Math.floor(Math.random() * symbols.length)];
      targetSyms = [s0, s1, s2];
      multiplier = 0;
    }

    const targetIndices = targetSyms.map(s => {
      const idx = symbols.indexOf(s);
      return idx >= 0 ? idx : 0;
    });

    const startTime = performance.now();
    const stopDelays = [1100, 1500, 1900];
    const totalRotations = [26, 36, 46];

    const startReelPositions = st.reels ? [...st.reels] : [0, 0, 0];
    const finalTargetPositions = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
      const currentPos = startReelPositions[i] || 0;
      const curNorm = ((currentPos % symCount) + symCount) % symCount;
      const neededAdvance = ((targetIndices[i] - curNorm) % symCount + symCount) % symCount;
      finalTargetPositions[i] = currentPos + totalRotations[i] * symCount + neededAdvance;
    }

    st.startTime = startTime;
    st.stopDelays = stopDelays;
    st.startReels = startReelPositions;
    st.finalTargets = finalTargetPositions;
    st.multiplier = multiplier;
    st.winName = winName;
  }
}

// --- Explicit Global Window Bindings ---
window.draw3DSlotMachineScreen = draw3DSlotMachineScreen;
window.draw3DGachaponScreen = draw3DGachaponScreen;
window.initMachineGradients = initMachineGradients;
if (typeof updateSlot3DScreens !== 'undefined') window.updateSlot3DScreens = updateSlot3DScreens;
if (typeof spinSlotMachine !== 'undefined') window.spinSlotMachine = spinSlotMachine;