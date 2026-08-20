// ============================================================
// MIDNIGHT CASINO CLIENT CONFIGURATION & CONSTANTS
// ============================================================

window.CASINO_SPATIAL_ZONES = [
  { id: 'bowling', x: -31.0, z: -49.0, radius: 24.0 },
  { id: 'cinema', x: 0, z: -25, radius: 14.0 },
  { id: 'tvcasino', x: 28, z: -25, radius: 14.0 },
  { id: 'slots', x: -31.0, z: -8.5, radius: 14.0 },
  { id: 'pachinko', x: -31.0, z: 1.5, radius: 14.0 },
  { id: 'tragaperras', x: -31.0, z: 11.5, radius: 14.0 },
  { id: 'roulette', x: 0, z: -11, radius: 12.0 },
  { id: 'blackjack', x: 0, z: 0, radius: 10.0 },
  { id: 'poker', x: 0, z: 11, radius: 10.0 },
  { id: 'jackpot', x: 36.5, z: -6.5, radius: 12.0 },
  { id: 'plinko', x: 16.0, z: 0.0, radius: 10.0 },
  { id: 'wheel', x: 36.5, z: 5.5, radius: 12.0 },
  { id: 'dice', x: 16.0, z: 11.0, radius: 10.0 },
  { id: 'mines', x: 16.0, z: 22.5, radius: 10.0 },
  { id: 'coin', x: 37.0, z: 22.5, radius: 12.0 },
  { id: 'bar', x: 0, z: 24, radius: 14.0 },
  { id: 'jukebox', x: 11.8, z: 36.0, radius: 12.0 }
];

window.ZONES = [
  // --- SALAS VIP SUPERIORES (NORTE - ALA DE BOLERA REAL 48M DE PISTA) ---
  {
    id: 'bowling', name: 'BOWLING (PISTA REAL)', icon: '🎳', x: -31.0, z: -49.0, radius: 18.0, color: 0x3b82f6, seats: [
      { x: -38.5, z: -18.5, r: 0 },
      { x: -35.5, z: -18.5, r: 0 },
      { x: -32.5, z: -18.5, r: 0 },
      { x: -29.5, z: -18.5, r: 0 },
      { x: -26.5, z: -18.5, r: 0 },
      { x: -23.5, z: -18.5, r: 0 }
    ]
  },
  {
        id: 'cinema', name: 'CINE & MUSIC 3D', icon: '🎬', x: 0, z: -25, radius: 8.5, color: 0x8B5CF6, seats: [
      // Fila 1 (Delantera / Tier 1), z: -27.5, y: 0.18
      { x: -5.5, y: 0.18, z: -27.5, r: -0.574 },
      { x: -3.3, y: 0.18, z: -27.5, r: -0.370 },
      { x: -1.1, y: 0.18, z: -27.5, r: -0.129 },
      { x:  1.1, y: 0.18, z: -27.5, r:  0.129 },
      { x:  3.3, y: 0.18, z: -27.5, r:  0.370 },
      { x:  5.5, y: 0.18, z: -27.5, r:  0.574 },
      // Fila 2 (Media / Tier 2), z: -25.0, y: 0.48
      { x: -5.5, y: 0.48, z: -25.0, r: -0.464 },
      { x: -3.3, y: 0.48, z: -25.0, r: -0.291 },
      { x: -1.1, y: 0.48, z: -25.0, r: -0.100 },
      { x:  1.1, y: 0.48, z: -25.0, r:  0.100 },
      { x:  3.3, y: 0.48, z: -25.0, r:  0.291 },
      { x:  5.5, y: 0.48, z: -25.0, r:  0.464 },
      // Fila 3 (Trasera / Tier 3 VIP), z: -22.5, y: 0.78
      { x: -5.5, y: 0.78, z: -22.5, r: -0.387 },
      { x: -3.3, y: 0.78, z: -22.5, r: -0.240 },
      { x: -1.1, y: 0.78, z: -22.5, r: -0.081 },
      { x:  1.1, y: 0.78, z: -22.5, r:  0.081 },
      { x:  3.3, y: 0.78, z: -22.5, r:  0.240 },
      { x:  5.5, y: 0.78, z: -22.5, r:  0.387 }
    ]
  },
  {
    id: 'tvcasino', name: 'TV CASINO 3D', icon: '📺', x: 28, z: -25, radius: 7.5, color: 0xd946ef, seats: [
      { x: 24.5, z: -22.5, r: Math.PI / 2 },
      { x: 24.5, z: -20.5, r: Math.PI / 2 },
      { x: 31.5, z: -22.5, r: -Math.PI / 2 },
      { x: 31.5, z: -20.5, r: -Math.PI / 2 },
      { x: 26.5, z: -19.0, r: Math.PI },
      { x: 29.5, z: -19.0, r: Math.PI }
    ]
  },

  // --- FILAS DE MÁQUINAS RECREATIVAS (ALA OESTE) ---
  {
    id: 'slots', name: 'SLOTS / MÁQUINAS', icon: '🎰', x: -31.0, z: -8.5, radius: 7.5, color: 0xec4899, seats: [
      { x: -39.1, z: -7.55, r: Math.PI },
      { x: -37.3, z: -7.55, r: Math.PI },
      { x: -35.5, z: -7.55, r: Math.PI },
      { x: -33.7, z: -7.55, r: Math.PI },
      { x: -31.9, z: -7.55, r: Math.PI },
      { x: -30.1, z: -7.55, r: Math.PI },
      { x: -28.3, z: -7.55, r: Math.PI },
      { x: -26.5, z: -7.55, r: Math.PI },
      { x: -24.7, z: -7.55, r: Math.PI },
      { x: -22.9, z: -7.55, r: Math.PI }
    ]
  },
  {
    id: 'pachinko', name: 'GACHAPÓN', icon: '🎁', x: -31.0, z: 1.5, radius: 7.5, color: 0x06b6d4, seats: [
      { x: -39.1, z: 2.45, r: Math.PI },
      { x: -37.3, z: 2.45, r: Math.PI },
      { x: -35.5, z: 2.45, r: Math.PI },
      { x: -33.7, z: 2.45, r: Math.PI },
      { x: -31.9, z: 2.45, r: Math.PI },
      { x: -30.1, z: 2.45, r: Math.PI },
      { x: -28.3, z: 2.45, r: Math.PI },
      { x: -26.5, z: 2.45, r: Math.PI },
      { x: -24.7, z: 2.45, r: Math.PI },
      { x: -22.9, z: 2.45, r: Math.PI }
    ]
  },
  {
    id: 'tragaperras', name: 'TRAGAPERRAS', icon: '🍒', x: -31.0, z: 11.5, radius: 7.5, color: 0xf59e0b, seats: [
      { x: -39.1, z: 12.45, r: Math.PI },
      { x: -37.3, z: 12.45, r: Math.PI },
      { x: -35.5, z: 12.45, r: Math.PI },
      { x: -33.7, z: 12.45, r: Math.PI },
      { x: -31.9, z: 12.45, r: Math.PI },
      { x: -30.1, z: 12.45, r: Math.PI },
      { x: -28.3, z: 12.45, r: Math.PI },
      { x: -26.5, z: 12.45, r: Math.PI },
      { x: -24.7, z: 12.45, r: Math.PI },
      { x: -22.9, z: 12.45, r: Math.PI }
    ]
  },

  // --- EJE CENTRAL PRINCIPAL ---
  {
    id: 'roulette', name: 'ROULETTE 3D', icon: '🎡', x: 0, z: -11, radius: 5.5, color: 0xf97316, seats: [
      { x: -4.20, z: -14.20, r: Math.PI / 4 },
      { x: -4.40, z: -11.00, r: Math.PI / 2 },
      { x: -3.60, z: -7.60,  r: (3 * Math.PI) / 4 },
      { x: -1.40, z: -6.80,  r: Math.PI },
      { x: 1.40,  z: -6.80,  r: Math.PI },
      { x: 3.60,  z: -7.60,  r: -(3 * Math.PI) / 4 },
      { x: 4.40,  z: -11.00, r: -Math.PI / 2 },
      { x: 4.20,  z: -14.20, r: -Math.PI / 4 }
    ]
  },
  {
    id: 'blackjack', name: 'BLACKJACK 21', icon: '🃏', x: 0, z: 0, radius: 4.6, color: 0x22c55e, seats: [
      { x: -2.23, z: 1.45, r: Math.PI - 0.69 },
      { x: 0.00, z: 2.25, r: Math.PI },
      { x: 2.23, z: 1.45, r: Math.PI + 0.69 }
    ]
  },
  {
    id: 'poker', name: 'POKER 3D', icon: '♠️', x: 0, z: 11, radius: 5.2, color: 0xf59e0b, seats: [
      { x: 0.00, z: 14.25, r: Math.PI },
      { x: 2.30, z: 13.30, r: (5 * Math.PI) / 4 },
      { x: 3.25, z: 11.00, r: -Math.PI / 2 },
      { x: 2.30, z: 8.70,  r: -Math.PI / 4 },
      { x: 0.00, z: 7.75,  r: 0 },
      { x: -2.30, z: 8.70, r: Math.PI / 4 },
      { x: -3.25, z: 11.00, r: Math.PI / 2 },
      { x: -2.30, z: 13.30, r: (3 * Math.PI) / 4 }
    ]
  },

  // --- ALA ESTE ---
  {
    id: 'jackpot', name: 'JACKPOT AREA', icon: '🏆', x: 36.5, z: -6.5, radius: 5.8, color: 0xfbbf24, seats: [
      { x: 36.5, z: -2.7, r: Math.PI },
      { x: 39.2, z: -3.8, r: Math.PI - 0.78 },
      { x: 40.3, z: -6.5, r: -Math.PI / 2 },
      { x: 39.2, z: -9.2, r: -0.78 },
      { x: 36.5, z: -10.3, r: 0 },
      { x: 33.8, z: -9.2, r: 0.78 },
      { x: 32.7, z: -6.5, r: Math.PI / 2 },
      { x: 33.8, z: -3.8, r: Math.PI + 0.78 }
    ]
  },
  {
    id: 'plinko', name: 'PLINKO 3D', icon: '🎯', x: 16.0, z: 0.0, radius: 4.8, color: 0xec4899, seats: [
      { x: 13.9, z: 3.35, r: Math.PI },
      { x: 15.3, z: 3.35, r: Math.PI },
      { x: 16.7, z: 3.35, r: Math.PI },
      { x: 18.1, z: 3.35, r: Math.PI }
    ]
  },
  {
    id: 'wheel', name: 'FORTUNE WHEEL', icon: '🎡', x: 36.5, z: 5.5, radius: 5.5, color: 0xa855f7, seats: [
      { x: 36.5, z: 9.3, r: Math.PI },
      { x: 38.7, z: 8.6, r: Math.PI - 0.63 },
      { x: 40.1, z: 6.7, r: Math.PI - 1.26 },
      { x: 40.1, z: 4.3, r: 1.26 },
      { x: 38.7, z: 2.4, r: 0.63 },
      { x: 36.5, z: 1.7, r: 0 },
      { x: 34.3, z: 2.4, r: -0.63 },
      { x: 32.9, z: 4.3, r: -1.26 },
      { x: 32.9, z: 6.7, r: -(Math.PI - 1.26) },
      { x: 34.3, z: 8.6, r: -(Math.PI - 0.63) }
    ]
  },
  {
    id: 'dice', name: 'DICE DUEL', icon: '🎲', x: 16.0, z: 11.0, radius: 5.0, color: 0x06b6d4, seats: [
      { x: 14.35, z: 13.55, r: Math.PI },
      { x: 17.65, z: 13.55, r: Math.PI }
    ]
  },
  {
    id: 'mines', name: 'MINES ARCADE', icon: '💣', x: 16.0, z: 22.5, radius: 4.5, color: 0xef4444, seats: [
      { x: 13.9, z: 22.5, r: Math.PI / 2 },
      { x: 18.1, z: 22.5, r: -Math.PI / 2 },
      { x: 16.0, z: 20.4, r: 0 },
      { x: 16.0, z: 24.6, r: Math.PI }
    ]
  },
  {
    id: 'coin', name: 'COIN FLIP', icon: '🪙', x: 37.0, z: 22.5, radius: 4.8, color: 0x8b5cf6, seats: [
      { x: 35.6, z: 25.4, r: Math.PI },
      { x: 38.4, z: 25.4, r: Math.PI }
    ]
  },

  // --- ZONA SUR (BAR & LOUNGE) ---
  {
    id: 'bar', name: 'BAR & LOUNGE', icon: '🍸', x: 0, z: 24, radius: 10.5, color: 0xf472b6, seats: [
      { x: -6.67, z: 27.54, r:  2.059 },
      { x: -5.48, z: 29.20, r:  2.330 },
      { x: -3.89, z: 30.47, r:  2.601 },
      { x: -2.02, z: 31.28, r:  2.871 },
      { x:  0.00, z: 31.55, r:  Math.PI },
      { x:  2.02, z: 31.28, r: -2.871 },
      { x:  3.89, z: 30.47, r: -2.601 },
      { x:  5.48, z: 29.20, r: -2.330 },
      { x:  6.67, z: 27.54, r: -2.059 }
    ]
  },
  {
    id: 'jukebox', name: 'GRAMOLA SPOTIFY', icon: '🎵', x: 11.8, z: 36.0, radius: 3.2, color: 0xf472b6, seats: []
  }
];

window.WHEEL_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

window.NUM_ROWS = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
];

window.RED_NUMS_SET = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

window.numColor = function(n) {
  if (n === 0) return 'green';
  return window.RED_NUMS_SET.has(n) ? 'red' : 'black';
};

window.TRAGAPERRAS_SYMBOLS = ['7️⃣', '🍒', '💎', '🔔', '🍋', '⭐', '🍇', '🍀'];
window.SLOTS_SYMBOLS = ['🎰', '👑', '💎', '🔥', '⚡', '⭐', '🍉', '💰'];

window.LOD_DISTANCES = {
  NEAR: 15.0,
  MEDIUM: 35.0,
  FAR: 60.0,
  NAMETAG_MAX: 32.0
};

window.QualityTiers = {
  LOW: { name: 'LOW', pixelRatio: 1.0, shadowMap: false, maxParticles: 20, slotRes: 256, shadowMapSize: 512 },
  MEDIUM: { name: 'MEDIUM', pixelRatio: 1.15, shadowMap: true, maxParticles: 40, slotRes: 384, shadowMapSize: 512 },
  HIGH: { name: 'HIGH', pixelRatio: 1.35, shadowMap: true, maxParticles: 75, slotRes: 512, shadowMapSize: 1024 },
  ULTRA: { name: 'ULTRA', pixelRatio: Math.min(window.devicePixelRatio || 1.5, 1.75), shadowMap: true, maxParticles: 130, slotRes: 512, shadowMapSize: 1024 }
};

window.getBlackjackBetCircleSpot3D = function(seatIndex) {
  const spots = [
    { x: -1.001, z: 1.925 },
    { x:  0.455, z: 2.122 },
    { x:  1.703, z: 1.345 }
  ];
  return spots[Math.min(2, Math.max(0, seatIndex))] || spots[1];
};
var getBlackjackBetCircleSpot3D = window.getBlackjackBetCircleSpot3D;

