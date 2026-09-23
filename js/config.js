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
    id: 'bowling', name: 'BOWLING (PISTA REAL)', icon: '🎳', x: -31.0, z: -49.0, radius: 24.0, color: 0x3b82f6, seats: [
      { x: -39.25, y: 0.128, z: -27.5, r: Math.PI, laneName: 'PISTA 01', laneIndex: 0 },
      { x: -35.95, y: 0.128, z: -27.5, r: Math.PI, laneName: 'PISTA 02', laneIndex: 1 },
      { x: -32.65, y: 0.128, z: -27.5, r: Math.PI, laneName: 'PISTA 03', laneIndex: 2 },
      { x: -29.35, y: 0.128, z: -27.5, r: Math.PI, laneName: 'PISTA 04', laneIndex: 3 },
      { x: -26.05, y: 0.128, z: -27.5, r: Math.PI, laneName: 'PISTA 05', laneIndex: 4 },
      { x: -22.75, y: 0.128, z: -27.5, r: Math.PI, laneName: 'PISTA 06', laneIndex: 5 }
    ]
  },
  {
            id: 'cinema', name: 'CINE & MUSIC 3D', icon: '🎬', x: 0, z: -25, radius: 8.5, color: 0x8B5CF6, seats: [
      // Fila 1 (Delantera / Tier 1), z: -27.5, y: 0.30
      { x: -5.5, y: 0.30, z: -27.5, r: -0.574 },
      { x: -3.3, y: 0.30, z: -27.5, r: -0.370 },
      { x: -1.1, y: 0.30, z: -27.5, r: -0.129 },
      { x:  1.1, y: 0.30, z: -27.5, r:  0.129 },
      { x:  3.3, y: 0.30, z: -27.5, r:  0.370 },
      { x:  5.5, y: 0.30, z: -27.5, r:  0.574 },
      // Fila 2 (Media / Tier 2), z: -25.0, y: 0.60
      { x: -5.5, y: 0.60, z: -25.0, r: -0.464 },
      { x: -3.3, y: 0.60, z: -25.0, r: -0.291 },
      { x: -1.1, y: 0.60, z: -25.0, r: -0.100 },
      { x:  1.1, y: 0.60, z: -25.0, r:  0.100 },
      { x:  3.3, y: 0.60, z: -25.0, r:  0.291 },
      { x:  5.5, y: 0.60, z: -25.0, r:  0.464 },
      // Fila 3 (Trasera / Tier 3 VIP), z: -22.5, y: 0.90
      { x: -5.5, y: 0.90, z: -22.5, r: -0.387 },
      { x: -3.3, y: 0.90, z: -22.5, r: -0.240 },
      { x: -1.1, y: 0.90, z: -22.5, r: -0.081 },
      { x:  1.1, y: 0.90, z: -22.5, r:  0.081 },
      { x:  3.3, y: 0.90, z: -22.5, r:  0.240 },
      { x:  5.5, y: 0.90, z: -22.5, r:  0.387 }
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

// ============================================================
// PERKS CATALOG & SYSTEM DEFINITIONS
// ============================================================
window.PERKS_CATALOG = {
  comun: [
    {
      id: 'perk_amuleto_trebol',
      name: 'Trébol de la Suerte',
      icon: '🍀',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +1% plano la probabilidad de ganar en todos los juegos del casino.',
      stats: '+1.0% Suerte Global',
      effects: {
        flatWinBonus: 0.01
      }
    },
    {
      id: 'perk_ruleta_suerte',
      name: 'Imán de la Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de acertar apuestas en la Ruleta.',
      stats: '+10.0% Suerte en Ruleta',
      effects: {
        rouletteWinBonus: 0.10
      }
    },
    {
      id: 'perk_tragaperras_suerte',
      name: 'Palanca de Oro',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de ganar en la Tragaperras 777 clásica.',
      stats: '+10.0% Suerte en Tragaperras 777',
      effects: {
        slots3x3WinBonus: 0.10
      }
    },
    {
      id: 'perk_slots5x5_suerte',
      name: 'Sobrecarga Neón',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de conectar líneas en las Slots 5x5.',
      stats: '+10.0% Suerte en Slots 5x5',
      effects: {
        slots5x5WinBonus: 0.10
      }
    },
    {
      id: 'perk_gachapon_suerte',
      name: 'Manivela de la Fortuna',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de cápsulas superiores en el Gachapón 3D.',
      stats: '+10.0% Suerte en Gachapón',
      effects: {
        gachaponWinBonus: 0.10
      }
    },
    {
      id: 'perk_coin_suerte',
      name: 'Moneda Equilibrada',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de acertar en Lanzamiento de Moneda 3D.',
      stats: '+10.0% Suerte en Moneda',
      effects: {
        coinWinBonus: 0.10
      }
    },
    {
      id: 'perk_mines_suerte',
      name: 'Detector de Minas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de desactivar y esquivar bombas en Buscaminas.',
      stats: '+10.0% Suerte en Buscaminas',
      effects: {
        minesWinBonus: 0.10
      }
    },
    {
      id: 'perk_wheel_suerte',
      name: 'Puntero Imantado',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de multiplicadores altos en la Ruleta de la Fortuna.',
      stats: '+10.0% Suerte en Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: 0.10
      }
    },
    {
      id: 'perk_dice_suerte',
      name: 'Dados Cargados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de sacar puntuaciones más altas en Dados 3D.',
      stats: '+10.0% Suerte en Dados',
      effects: {
        diceWinBonus: 0.10
      }
    },
    {
      id: 'perk_plinko_suerte',
      name: 'Rebote Dirigido',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de alcanzar ranuras multiplicadoras en Plinko 3D.',
      stats: '+10.0% Suerte en Plinko',
      effects: {
        plinkoWinBonus: 0.10
      }
    },
    {
      id: 'perk_blackjack_suerte',
      name: 'As bajo la Manga',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de obtener 21 y manos favorables en Blackjack 3D.',
      stats: '+10.0% Suerte en Blackjack',
      effects: {
        blackjackWinBonus: 0.10
      }
    },
    {
      id: 'perk_poker_suerte',
      name: 'Ojo de Halcón',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% plano la probabilidad de ligar jugadas ganadoras en Poker 3D.',
      stats: '+10.0% Suerte en Poker',
      effects: {
        pokerWinBonus: 0.10
      }
    },
    {
      id: 'perk_pacto_ruleta',
      name: 'Pacto de la Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Ruleta / -2.0% Resto',
      effects: {
        rouletteWinBonus: 0.1,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'rouletteWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_tragaperras',
      name: 'Pacto de las Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Tragaperras 777 / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: 0.1,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'slots3x3WinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_slots5x5',
      name: 'Pacto de las Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Slots 5x5 / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: 0.1,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'slots5x5WinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_gachapon',
      name: 'Pacto del Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Gachapón / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: 0.1,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'gachaponWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_coin',
      name: 'Pacto del Lanzamiento de Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Moneda / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: 0.1,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'coinWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_mines',
      name: 'Pacto del Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Buscaminas / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: 0.1,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'minesWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_wheel',
      name: 'Pacto de la Ruleta de la Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Ruleta Fortuna / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: 0.1,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'fortuneWheelWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_dice',
      name: 'Pacto de los Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Dados / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: 0.1,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'diceWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_plinko',
      name: 'Pacto del Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Plinko / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: 0.1,
        blackjackWinBonus: -0.02,
        pokerWinBonus: -0.02,
        focusTarget: 'plinkoWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_blackjack',
      name: 'Pacto del Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Blackjack / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: 0.1,
        pokerWinBonus: -0.02,
        focusTarget: 'blackjackWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_pacto_poker',
      name: 'Pacto del Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero resta un -2% en el resto de máquinas.',
      stats: '+10.0% Poker / -2.0% Resto',
      effects: {
        rouletteWinBonus: -0.02,
        slots3x3WinBonus: -0.02,
        slots5x5WinBonus: -0.02,
        gachaponWinBonus: -0.02,
        coinWinBonus: -0.02,
        minesWinBonus: -0.02,
        fortuneWheelWinBonus: -0.02,
        diceWinBonus: -0.02,
        plinkoWinBonus: -0.02,
        blackjackWinBonus: -0.02,
        pokerWinBonus: 0.1,
        focusTarget: 'pokerWinBonus',
        penaltyOthers: 0.02
      }
    },
    {
      id: 'perk_trueque_ruleta_a_tragaperras',
      name: 'Trueque: Ruleta a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Tragaperras 777 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_slots5x5',
      name: 'Trueque: Ruleta a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Slots 5x5 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_gachapon',
      name: 'Trueque: Ruleta a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Gachapón / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_coin',
      name: 'Trueque: Ruleta a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Moneda / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_mines',
      name: 'Trueque: Ruleta a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Buscaminas / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_wheel',
      name: 'Trueque: Ruleta a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_dice',
      name: 'Trueque: Ruleta a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Dados / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_plinko',
      name: 'Trueque: Ruleta a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Plinko / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_blackjack',
      name: 'Trueque: Ruleta a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Blackjack / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_poker',
      name: 'Trueque: Ruleta a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+10.0% Poker / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_ruleta',
      name: 'Trueque: Tragaperras 777 a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Ruleta / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_slots5x5',
      name: 'Trueque: Tragaperras 777 a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Slots 5x5 / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_gachapon',
      name: 'Trueque: Tragaperras 777 a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Gachapón / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_coin',
      name: 'Trueque: Tragaperras 777 a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Moneda / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_mines',
      name: 'Trueque: Tragaperras 777 a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Buscaminas / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_wheel',
      name: 'Trueque: Tragaperras 777 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_dice',
      name: 'Trueque: Tragaperras 777 a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Dados / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_plinko',
      name: 'Trueque: Tragaperras 777 a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Plinko / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_blackjack',
      name: 'Trueque: Tragaperras 777 a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Blackjack / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_poker',
      name: 'Trueque: Tragaperras 777 a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+10.0% Poker / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_ruleta',
      name: 'Trueque: Slots 5x5 a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Ruleta / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_tragaperras',
      name: 'Trueque: Slots 5x5 a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Tragaperras 777 / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_gachapon',
      name: 'Trueque: Slots 5x5 a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Gachapón / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_coin',
      name: 'Trueque: Slots 5x5 a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Moneda / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_mines',
      name: 'Trueque: Slots 5x5 a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Buscaminas / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_wheel',
      name: 'Trueque: Slots 5x5 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_dice',
      name: 'Trueque: Slots 5x5 a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Dados / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_plinko',
      name: 'Trueque: Slots 5x5 a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Plinko / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_blackjack',
      name: 'Trueque: Slots 5x5 a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Blackjack / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_poker',
      name: 'Trueque: Slots 5x5 a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+10.0% Poker / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_ruleta',
      name: 'Trueque: Gachapón a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Ruleta / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_tragaperras',
      name: 'Trueque: Gachapón a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Tragaperras 777 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_slots5x5',
      name: 'Trueque: Gachapón a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Slots 5x5 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_coin',
      name: 'Trueque: Gachapón a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Moneda / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_mines',
      name: 'Trueque: Gachapón a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Buscaminas / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_wheel',
      name: 'Trueque: Gachapón a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_dice',
      name: 'Trueque: Gachapón a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Dados / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_plinko',
      name: 'Trueque: Gachapón a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Plinko / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_blackjack',
      name: 'Trueque: Gachapón a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Blackjack / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_poker',
      name: 'Trueque: Gachapón a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+10.0% Poker / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_ruleta',
      name: 'Trueque: Moneda a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Ruleta / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_tragaperras',
      name: 'Trueque: Moneda a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Tragaperras 777 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_slots5x5',
      name: 'Trueque: Moneda a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Slots 5x5 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_gachapon',
      name: 'Trueque: Moneda a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Gachapón / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_mines',
      name: 'Trueque: Moneda a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Buscaminas / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_wheel',
      name: 'Trueque: Moneda a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_dice',
      name: 'Trueque: Moneda a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Dados / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_plinko',
      name: 'Trueque: Moneda a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Plinko / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_blackjack',
      name: 'Trueque: Moneda a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Blackjack / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_poker',
      name: 'Trueque: Moneda a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+10.0% Poker / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'coinWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_ruleta',
      name: 'Trueque: Buscaminas a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Ruleta / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_tragaperras',
      name: 'Trueque: Buscaminas a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Tragaperras 777 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_slots5x5',
      name: 'Trueque: Buscaminas a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Slots 5x5 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_gachapon',
      name: 'Trueque: Buscaminas a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Gachapón / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_coin',
      name: 'Trueque: Buscaminas a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Moneda / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_wheel',
      name: 'Trueque: Buscaminas a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_dice',
      name: 'Trueque: Buscaminas a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Dados / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_plinko',
      name: 'Trueque: Buscaminas a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Plinko / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_blackjack',
      name: 'Trueque: Buscaminas a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Blackjack / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_poker',
      name: 'Trueque: Buscaminas a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+10.0% Poker / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'minesWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_ruleta',
      name: 'Trueque: Ruleta Fortuna a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Ruleta / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_tragaperras',
      name: 'Trueque: Ruleta Fortuna a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Tragaperras 777 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_slots5x5',
      name: 'Trueque: Ruleta Fortuna a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Slots 5x5 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_gachapon',
      name: 'Trueque: Ruleta Fortuna a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Gachapón / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_coin',
      name: 'Trueque: Ruleta Fortuna a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Moneda / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_mines',
      name: 'Trueque: Ruleta Fortuna a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Buscaminas / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_dice',
      name: 'Trueque: Ruleta Fortuna a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Dados / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_plinko',
      name: 'Trueque: Ruleta Fortuna a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Plinko / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_blackjack',
      name: 'Trueque: Ruleta Fortuna a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Blackjack / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_poker',
      name: 'Trueque: Ruleta Fortuna a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+10.0% Poker / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_ruleta',
      name: 'Trueque: Dados a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Ruleta / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_tragaperras',
      name: 'Trueque: Dados a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Tragaperras 777 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_slots5x5',
      name: 'Trueque: Dados a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Slots 5x5 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_gachapon',
      name: 'Trueque: Dados a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Gachapón / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_coin',
      name: 'Trueque: Dados a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Moneda / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_mines',
      name: 'Trueque: Dados a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Buscaminas / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_wheel',
      name: 'Trueque: Dados a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_plinko',
      name: 'Trueque: Dados a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Plinko / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_blackjack',
      name: 'Trueque: Dados a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Blackjack / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_poker',
      name: 'Trueque: Dados a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en los Dados.',
      stats: '+10.0% Poker / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'diceWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_ruleta',
      name: 'Trueque: Plinko a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Ruleta / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_tragaperras',
      name: 'Trueque: Plinko a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Tragaperras 777 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_slots5x5',
      name: 'Trueque: Plinko a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Slots 5x5 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_gachapon',
      name: 'Trueque: Plinko a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Gachapón / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_coin',
      name: 'Trueque: Plinko a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Moneda / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_mines',
      name: 'Trueque: Plinko a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Buscaminas / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_wheel',
      name: 'Trueque: Plinko a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_dice',
      name: 'Trueque: Plinko a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Dados / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_blackjack',
      name: 'Trueque: Plinko a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Blackjack / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_poker',
      name: 'Trueque: Plinko a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en el Plinko.',
      stats: '+10.0% Poker / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_ruleta',
      name: 'Trueque: Blackjack a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Ruleta / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_tragaperras',
      name: 'Trueque: Blackjack a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Tragaperras 777 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_slots5x5',
      name: 'Trueque: Blackjack a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Slots 5x5 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_gachapon',
      name: 'Trueque: Blackjack a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Gachapón / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_coin',
      name: 'Trueque: Blackjack a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Moneda / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_mines',
      name: 'Trueque: Blackjack a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Buscaminas / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_wheel',
      name: 'Trueque: Blackjack a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_dice',
      name: 'Trueque: Blackjack a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Dados / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_plinko',
      name: 'Trueque: Blackjack a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Plinko / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_poker',
      name: 'Trueque: Blackjack a Poker',
      icon: '♠️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Poker, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+10.0% Poker / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        pokerWinBonus: 0.1,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_ruleta',
      name: 'Trueque: Poker a Ruleta',
      icon: '🎡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Ruleta / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        rouletteWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_tragaperras',
      name: 'Trueque: Poker a Tragaperras 777',
      icon: '🍒',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Tragaperras 777 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots3x3WinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_slots5x5',
      name: 'Trueque: Poker a Slots 5x5',
      icon: '🎰',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Slots 5x5 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots5x5WinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_gachapon',
      name: 'Trueque: Poker a Gachapón',
      icon: '🎁',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Gachapón, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Gachapón / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        gachaponWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_coin',
      name: 'Trueque: Poker a Moneda',
      icon: '🪙',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Moneda / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        coinWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_mines',
      name: 'Trueque: Poker a Buscaminas',
      icon: '💣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Buscaminas / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        minesWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_wheel',
      name: 'Trueque: Poker a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Ruleta Fortuna / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        fortuneWheelWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_dice',
      name: 'Trueque: Poker a Dados',
      icon: '🎲',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en los Dados, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Dados / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        diceWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_plinko',
      name: 'Trueque: Poker a Plinko',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Plinko, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Plinko / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        plinkoWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_blackjack',
      name: 'Trueque: Poker a Blackjack',
      icon: '🃏',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +10% la suerte en el Blackjack, pero reduce un -10% la suerte en el Poker.',
      stats: '+10.0% Blackjack / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        blackjackWinBonus: 0.1,
        transferFrom: 'pokerWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_ruleta_target_num_0',
      name: 'Aura del Número 0',
      icon: '🟢',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 0 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 0',
      effects: {
        rouletteTarget: 'num-0',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_1',
      name: 'Aura del Número 1',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 1 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 1',
      effects: {
        rouletteTarget: 'num-1',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_2',
      name: 'Aura del Número 2',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 2 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 2',
      effects: {
        rouletteTarget: 'num-2',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_3',
      name: 'Aura del Número 3',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 3 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 3',
      effects: {
        rouletteTarget: 'num-3',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_4',
      name: 'Aura del Número 4',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 4 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 4',
      effects: {
        rouletteTarget: 'num-4',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_5',
      name: 'Aura del Número 5',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 5 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 5',
      effects: {
        rouletteTarget: 'num-5',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_6',
      name: 'Aura del Número 6',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 6 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 6',
      effects: {
        rouletteTarget: 'num-6',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_7',
      name: 'Aura del Número 7',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 7 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 7',
      effects: {
        rouletteTarget: 'num-7',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_8',
      name: 'Aura del Número 8',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 8 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 8',
      effects: {
        rouletteTarget: 'num-8',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_9',
      name: 'Aura del Número 9',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 9 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 9',
      effects: {
        rouletteTarget: 'num-9',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_10',
      name: 'Aura del Número 10',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 10 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 10',
      effects: {
        rouletteTarget: 'num-10',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_11',
      name: 'Aura del Número 11',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 11 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 11',
      effects: {
        rouletteTarget: 'num-11',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_12',
      name: 'Aura del Número 12',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 12 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 12',
      effects: {
        rouletteTarget: 'num-12',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_13',
      name: 'Aura del Número 13',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 13 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 13',
      effects: {
        rouletteTarget: 'num-13',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_14',
      name: 'Aura del Número 14',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 14 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 14',
      effects: {
        rouletteTarget: 'num-14',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_15',
      name: 'Aura del Número 15',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 15 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 15',
      effects: {
        rouletteTarget: 'num-15',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_16',
      name: 'Aura del Número 16',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 16 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 16',
      effects: {
        rouletteTarget: 'num-16',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_17',
      name: 'Aura del Número 17',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 17 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 17',
      effects: {
        rouletteTarget: 'num-17',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_18',
      name: 'Aura del Número 18',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 18 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 18',
      effects: {
        rouletteTarget: 'num-18',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_19',
      name: 'Aura del Número 19',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 19 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 19',
      effects: {
        rouletteTarget: 'num-19',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_20',
      name: 'Aura del Número 20',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 20 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 20',
      effects: {
        rouletteTarget: 'num-20',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_21',
      name: 'Aura del Número 21',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 21 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 21',
      effects: {
        rouletteTarget: 'num-21',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_22',
      name: 'Aura del Número 22',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 22 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 22',
      effects: {
        rouletteTarget: 'num-22',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_23',
      name: 'Aura del Número 23',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 23 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 23',
      effects: {
        rouletteTarget: 'num-23',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_24',
      name: 'Aura del Número 24',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 24 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 24',
      effects: {
        rouletteTarget: 'num-24',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_25',
      name: 'Aura del Número 25',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 25 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 25',
      effects: {
        rouletteTarget: 'num-25',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_26',
      name: 'Aura del Número 26',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 26 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 26',
      effects: {
        rouletteTarget: 'num-26',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_27',
      name: 'Aura del Número 27',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 27 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 27',
      effects: {
        rouletteTarget: 'num-27',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_28',
      name: 'Aura del Número 28',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 28 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 28',
      effects: {
        rouletteTarget: 'num-28',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_29',
      name: 'Aura del Número 29',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 29 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 29',
      effects: {
        rouletteTarget: 'num-29',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_30',
      name: 'Aura del Número 30',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 30 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 30',
      effects: {
        rouletteTarget: 'num-30',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_31',
      name: 'Aura del Número 31',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 31 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 31',
      effects: {
        rouletteTarget: 'num-31',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_32',
      name: 'Aura del Número 32',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 32 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 32',
      effects: {
        rouletteTarget: 'num-32',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_33',
      name: 'Aura del Número 33',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 33 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 33',
      effects: {
        rouletteTarget: 'num-33',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_34',
      name: 'Aura del Número 34',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 34 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 34',
      effects: {
        rouletteTarget: 'num-34',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_35',
      name: 'Aura del Número 35',
      icon: '⚫',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 35 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 35',
      effects: {
        rouletteTarget: 'num-35',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_num_36',
      name: 'Aura del Número 36',
      icon: '🔴',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de el Número 36 en la Ruleta.',
      stats: '+12.5% Prob. Base Número 36',
      effects: {
        rouletteTarget: 'num-36',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_tercio_1',
      name: 'Aura del Primer Tercio (1-12)',
      icon: '1️⃣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números del 1 al 12 en la Ruleta.',
      stats: '+12.5% Prob. Base Primer Tercio (1-12)',
      effects: {
        rouletteTarget: 'dozen1',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_tercio_2',
      name: 'Aura del Segundo Tercio (13-24)',
      icon: '2️⃣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números del 13 al 24 en la Ruleta.',
      stats: '+12.5% Prob. Base Segundo Tercio (13-24)',
      effects: {
        rouletteTarget: 'dozen2',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_tercio_3',
      name: 'Aura del Tercer Tercio (25-36)',
      icon: '3️⃣',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números del 25 al 36 en la Ruleta.',
      stats: '+12.5% Prob. Base Tercer Tercio (25-36)',
      effects: {
        rouletteTarget: 'dozen3',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_color_rojo',
      name: 'Aura del Rojo',
      icon: '🟥',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números Rojos en la Ruleta.',
      stats: '+12.5% Prob. Base Rojo',
      effects: {
        rouletteTarget: 'red',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_color_negro',
      name: 'Aura del Negro',
      icon: '⬛',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números Negros en la Ruleta.',
      stats: '+12.5% Prob. Base Negro',
      effects: {
        rouletteTarget: 'black',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_rango_bajos',
      name: 'Aura de Falta (1-18)',
      icon: '🔻',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números Bajos (1 al 18) en la Ruleta.',
      stats: '+12.5% Prob. Base Falta (1-18)',
      effects: {
        rouletteTarget: 'low',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_rango_altos',
      name: 'Aura de Pasa (19-36)',
      icon: '🔺',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números Altos (19 al 36) en la Ruleta.',
      stats: '+12.5% Prob. Base Pasa (19-36)',
      effects: {
        rouletteTarget: 'high',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_paridad_par',
      name: 'Aura de Pares',
      icon: '⚖️',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números Pares en la Ruleta.',
      stats: '+12.5% Prob. Base Pares',
      effects: {
        rouletteTarget: 'even',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_target_paridad_impar',
      name: 'Aura de Impares',
      icon: '⚡',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Aumenta un +12.5% la probabilidad base de los números Impares en la Ruleta.',
      stats: '+12.5% Prob. Base Impares',
      effects: {
        rouletteTarget: 'odd',
        rouletteWeightBonus: 0.125
      }
    },
    {
      id: 'perk_ruleta_sinergia_mesa',
      name: 'Sinergia de Mesa: Ruleta',
      icon: '👥',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Otorga un +2.5% más de suerte en la Ruleta por cada jugador adicional sentado a la mesa contigo.',
      stats: '+2.5% Suerte / Jugador en Mesa',
      effects: {
        roulettePerPlayerBonus: 0.025
      }
    },
    {
      id: 'perk_poker_mano_debil',
      name: 'Farol Maestro: Doble Par a Carta Alta',
      icon: '🎭',
      rarity: 'comun',
      tier: 'COMÚN',
      description: 'Multiplica el bote ganado en Póker si vences con una mano débil: x1.20 con Doble Pareja, x1.35 con Pareja y hasta x1.50 con Carta Alta.',
      stats: 'x1.20 Doble Par / x1.35 Par / x1.50 Carta Alta',
      effects: {
        pokerUnderdogMultipliers: {
          3: 1.20,
          2: 1.35,
          1: 1.50
        }
      }
    }
  ],
  pocoComun: [
    {
      id: 'perk_amuleto_trebol_pc',
      name: 'Trébol de Cuatro Hojas',
      icon: '🍀',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +1.25% plano la probabilidad de ganar en todos los juegos del casino.',
      stats: '+1.25% Suerte Global',
      effects: {
        flatWinBonus: 0.0125
      }
    },
    {
      id: 'perk_ruleta_suerte_pc',
      name: 'Imán de Ruleta Pulido',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de acertar apuestas en la Ruleta.',
      stats: '+12.5% Suerte en Ruleta',
      effects: {
        rouletteWinBonus: 0.125
      }
    },
    {
      id: 'perk_tragaperras_suerte_pc',
      name: 'Palanca de Oro Fino',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de ganar en la Tragaperras 777 clásica.',
      stats: '+12.5% Suerte en Tragaperras 777',
      effects: {
        slots3x3WinBonus: 0.125
      }
    },
    {
      id: 'perk_slots5x5_suerte_pc',
      name: 'Sobrecarga Neón Plus',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de conectar líneas en las Slots 5x5.',
      stats: '+12.5% Suerte en Slots 5x5',
      effects: {
        slots5x5WinBonus: 0.125
      }
    },
    {
      id: 'perk_gachapon_suerte_pc',
      name: 'Manivela de la Fortuna Esmeralda',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de cápsulas superiores en el Gachapón 3D.',
      stats: '+12.5% Suerte en Gachapón',
      effects: {
        gachaponWinBonus: 0.125
      }
    },
    {
      id: 'perk_coin_suerte_pc',
      name: 'Moneda Equilibrada de Plata',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de acertar en Lanzamiento de Moneda 3D.',
      stats: '+12.5% Suerte en Moneda',
      effects: {
        coinWinBonus: 0.125
      }
    },
    {
      id: 'perk_mines_suerte_pc',
      name: 'Detector de Minas Mejorado',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de desactivar y esquivar bombas en Buscaminas.',
      stats: '+12.5% Suerte en Buscaminas',
      effects: {
        minesWinBonus: 0.125
      }
    },
    {
      id: 'perk_wheel_suerte_pc',
      name: 'Puntero Imantado Verde',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de multiplicadores altos en la Ruleta de la Fortuna.',
      stats: '+12.5% Suerte en Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: 0.125
      }
    },
    {
      id: 'perk_dice_suerte_pc',
      name: 'Dados Cargados Finos',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de sacar puntuaciones más altas en Dados 3D.',
      stats: '+12.5% Suerte en Dados',
      effects: {
        diceWinBonus: 0.125
      }
    },
    {
      id: 'perk_plinko_suerte_pc',
      name: 'Rebote Dirigido Pulido',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de alcanzar ranuras multiplicadoras en Plinko 3D.',
      stats: '+12.5% Suerte en Plinko',
      effects: {
        plinkoWinBonus: 0.125
      }
    },
    {
      id: 'perk_blackjack_suerte_pc',
      name: 'As bajo la Manga Doble',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de obtener 21 y manos favorables en Blackjack 3D.',
      stats: '+12.5% Suerte en Blackjack',
      effects: {
        blackjackWinBonus: 0.125
      }
    },
    {
      id: 'perk_poker_suerte_pc',
      name: 'Ojo de Halcón Afilado',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% plano la probabilidad de ligar jugadas ganadoras en Poker 3D.',
      stats: '+12.5% Suerte en Poker',
      effects: {
        pokerWinBonus: 0.125
      }
    },
    {
      id: 'perk_pacto_ruleta_pc',
      name: 'Obsesión de la Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Ruleta / -4.0% Resto',
      effects: {
        rouletteWinBonus: 0.125,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'rouletteWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_tragaperras_pc',
      name: 'Obsesión de las Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Tragaperras 777 / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: 0.125,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'slots3x3WinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_slots5x5_pc',
      name: 'Obsesión de las Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Slots 5x5 / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: 0.125,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'slots5x5WinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_gachapon_pc',
      name: 'Obsesión del Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Gachapón / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: 0.125,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'gachaponWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_coin_pc',
      name: 'Obsesión del Lanzamiento de Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Moneda / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: 0.125,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'coinWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_mines_pc',
      name: 'Obsesión del Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Buscaminas / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: 0.125,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'minesWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_wheel_pc',
      name: 'Obsesión de la Ruleta de la Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Ruleta Fortuna / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: 0.125,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'fortuneWheelWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_dice_pc',
      name: 'Obsesión de los Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Dados / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: 0.125,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'diceWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_plinko_pc',
      name: 'Obsesión del Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Plinko / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: 0.125,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'plinkoWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_blackjack_pc',
      name: 'Obsesión del Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Blackjack / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: 0.125,
        pokerWinBonus: -0.04,
        focusTarget: 'blackjackWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_poker_pc',
      name: 'Obsesión del Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero resta un -4% en el resto de máquinas.',
      stats: '+12.5% Poker / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: 0.125,
        focusTarget: 'pokerWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_trueque_ruleta_a_tragaperras_pc',
      name: 'Transmutación: Ruleta a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Tragaperras 777 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_slots5x5_pc',
      name: 'Transmutación: Ruleta a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Slots 5x5 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_gachapon_pc',
      name: 'Transmutación: Ruleta a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Gachapón / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_coin_pc',
      name: 'Transmutación: Ruleta a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Moneda / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_mines_pc',
      name: 'Transmutación: Ruleta a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Buscaminas / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_wheel_pc',
      name: 'Transmutación: Ruleta a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_dice_pc',
      name: 'Transmutación: Ruleta a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Dados / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_plinko_pc',
      name: 'Transmutación: Ruleta a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Plinko / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_blackjack_pc',
      name: 'Transmutación: Ruleta a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Blackjack / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_poker_pc',
      name: 'Transmutación: Ruleta a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+12.5% Poker / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_ruleta_pc',
      name: 'Transmutación: Tragaperras 777 a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Ruleta / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_slots5x5_pc',
      name: 'Transmutación: Tragaperras 777 a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Slots 5x5 / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_gachapon_pc',
      name: 'Transmutación: Tragaperras 777 a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Gachapón / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_coin_pc',
      name: 'Transmutación: Tragaperras 777 a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Moneda / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_mines_pc',
      name: 'Transmutación: Tragaperras 777 a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Buscaminas / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_wheel_pc',
      name: 'Transmutación: Tragaperras 777 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_dice_pc',
      name: 'Transmutación: Tragaperras 777 a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Dados / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_plinko_pc',
      name: 'Transmutación: Tragaperras 777 a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Plinko / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_blackjack_pc',
      name: 'Transmutación: Tragaperras 777 a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Blackjack / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_poker_pc',
      name: 'Transmutación: Tragaperras 777 a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+12.5% Poker / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_ruleta_pc',
      name: 'Transmutación: Slots 5x5 a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Ruleta / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_tragaperras_pc',
      name: 'Transmutación: Slots 5x5 a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Tragaperras 777 / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_gachapon_pc',
      name: 'Transmutación: Slots 5x5 a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Gachapón / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_coin_pc',
      name: 'Transmutación: Slots 5x5 a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Moneda / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_mines_pc',
      name: 'Transmutación: Slots 5x5 a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Buscaminas / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_wheel_pc',
      name: 'Transmutación: Slots 5x5 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_dice_pc',
      name: 'Transmutación: Slots 5x5 a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Dados / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_plinko_pc',
      name: 'Transmutación: Slots 5x5 a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Plinko / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_blackjack_pc',
      name: 'Transmutación: Slots 5x5 a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Blackjack / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_poker_pc',
      name: 'Transmutación: Slots 5x5 a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+12.5% Poker / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_ruleta_pc',
      name: 'Transmutación: Gachapón a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Ruleta / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_tragaperras_pc',
      name: 'Transmutación: Gachapón a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Tragaperras 777 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_slots5x5_pc',
      name: 'Transmutación: Gachapón a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Slots 5x5 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_coin_pc',
      name: 'Transmutación: Gachapón a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Moneda / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_mines_pc',
      name: 'Transmutación: Gachapón a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Buscaminas / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_wheel_pc',
      name: 'Transmutación: Gachapón a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_dice_pc',
      name: 'Transmutación: Gachapón a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Dados / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_plinko_pc',
      name: 'Transmutación: Gachapón a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Plinko / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_blackjack_pc',
      name: 'Transmutación: Gachapón a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Blackjack / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_poker_pc',
      name: 'Transmutación: Gachapón a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+12.5% Poker / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_ruleta_pc',
      name: 'Transmutación: Moneda a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Ruleta / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_tragaperras_pc',
      name: 'Transmutación: Moneda a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Tragaperras 777 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_slots5x5_pc',
      name: 'Transmutación: Moneda a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Slots 5x5 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_gachapon_pc',
      name: 'Transmutación: Moneda a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Gachapón / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_mines_pc',
      name: 'Transmutación: Moneda a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Buscaminas / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_wheel_pc',
      name: 'Transmutación: Moneda a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_dice_pc',
      name: 'Transmutación: Moneda a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Dados / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_plinko_pc',
      name: 'Transmutación: Moneda a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Plinko / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_blackjack_pc',
      name: 'Transmutación: Moneda a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Blackjack / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_poker_pc',
      name: 'Transmutación: Moneda a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+12.5% Poker / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'coinWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_ruleta_pc',
      name: 'Transmutación: Buscaminas a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Ruleta / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_tragaperras_pc',
      name: 'Transmutación: Buscaminas a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Tragaperras 777 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_slots5x5_pc',
      name: 'Transmutación: Buscaminas a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Slots 5x5 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_gachapon_pc',
      name: 'Transmutación: Buscaminas a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Gachapón / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_coin_pc',
      name: 'Transmutación: Buscaminas a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Moneda / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_wheel_pc',
      name: 'Transmutación: Buscaminas a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_dice_pc',
      name: 'Transmutación: Buscaminas a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Dados / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_plinko_pc',
      name: 'Transmutación: Buscaminas a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Plinko / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_blackjack_pc',
      name: 'Transmutación: Buscaminas a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Blackjack / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_poker_pc',
      name: 'Transmutación: Buscaminas a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+12.5% Poker / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'minesWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_ruleta_pc',
      name: 'Transmutación: Ruleta Fortuna a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Ruleta / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_tragaperras_pc',
      name: 'Transmutación: Ruleta Fortuna a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Tragaperras 777 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_slots5x5_pc',
      name: 'Transmutación: Ruleta Fortuna a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Slots 5x5 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_gachapon_pc',
      name: 'Transmutación: Ruleta Fortuna a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Gachapón / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_coin_pc',
      name: 'Transmutación: Ruleta Fortuna a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Moneda / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_mines_pc',
      name: 'Transmutación: Ruleta Fortuna a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Buscaminas / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_dice_pc',
      name: 'Transmutación: Ruleta Fortuna a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Dados / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_plinko_pc',
      name: 'Transmutación: Ruleta Fortuna a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Plinko / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_blackjack_pc',
      name: 'Transmutación: Ruleta Fortuna a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Blackjack / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_poker_pc',
      name: 'Transmutación: Ruleta Fortuna a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+12.5% Poker / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_ruleta_pc',
      name: 'Transmutación: Dados a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Ruleta / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_tragaperras_pc',
      name: 'Transmutación: Dados a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Tragaperras 777 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_slots5x5_pc',
      name: 'Transmutación: Dados a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Slots 5x5 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_gachapon_pc',
      name: 'Transmutación: Dados a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Gachapón / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_coin_pc',
      name: 'Transmutación: Dados a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Moneda / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_mines_pc',
      name: 'Transmutación: Dados a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Buscaminas / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_wheel_pc',
      name: 'Transmutación: Dados a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_plinko_pc',
      name: 'Transmutación: Dados a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Plinko / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_blackjack_pc',
      name: 'Transmutación: Dados a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Blackjack / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_poker_pc',
      name: 'Transmutación: Dados a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en los Dados.',
      stats: '+12.5% Poker / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'diceWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_ruleta_pc',
      name: 'Transmutación: Plinko a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Ruleta / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_tragaperras_pc',
      name: 'Transmutación: Plinko a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Tragaperras 777 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_slots5x5_pc',
      name: 'Transmutación: Plinko a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Slots 5x5 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_gachapon_pc',
      name: 'Transmutación: Plinko a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Gachapón / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_coin_pc',
      name: 'Transmutación: Plinko a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Moneda / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_mines_pc',
      name: 'Transmutación: Plinko a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Buscaminas / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_wheel_pc',
      name: 'Transmutación: Plinko a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_dice_pc',
      name: 'Transmutación: Plinko a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Dados / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_blackjack_pc',
      name: 'Transmutación: Plinko a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Blackjack / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_poker_pc',
      name: 'Transmutación: Plinko a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en el Plinko.',
      stats: '+12.5% Poker / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_ruleta_pc',
      name: 'Transmutación: Blackjack a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Ruleta / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_tragaperras_pc',
      name: 'Transmutación: Blackjack a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Tragaperras 777 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_slots5x5_pc',
      name: 'Transmutación: Blackjack a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Slots 5x5 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_gachapon_pc',
      name: 'Transmutación: Blackjack a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Gachapón / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_coin_pc',
      name: 'Transmutación: Blackjack a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Moneda / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_mines_pc',
      name: 'Transmutación: Blackjack a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Buscaminas / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_wheel_pc',
      name: 'Transmutación: Blackjack a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_dice_pc',
      name: 'Transmutación: Blackjack a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Dados / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_plinko_pc',
      name: 'Transmutación: Blackjack a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Plinko / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_poker_pc',
      name: 'Transmutación: Blackjack a Poker',
      icon: '♠️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Poker, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+12.5% Poker / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        pokerWinBonus: 0.125,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_ruleta_pc',
      name: 'Transmutación: Poker a Ruleta',
      icon: '🎡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Ruleta / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        rouletteWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_tragaperras_pc',
      name: 'Transmutación: Poker a Tragaperras 777',
      icon: '🍒',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Tragaperras 777 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots3x3WinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_slots5x5_pc',
      name: 'Transmutación: Poker a Slots 5x5',
      icon: '🎰',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Slots 5x5 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots5x5WinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_gachapon_pc',
      name: 'Transmutación: Poker a Gachapón',
      icon: '🎁',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Gachapón / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        gachaponWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_coin_pc',
      name: 'Transmutación: Poker a Moneda',
      icon: '🪙',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Moneda / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        coinWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_mines_pc',
      name: 'Transmutación: Poker a Buscaminas',
      icon: '💣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Buscaminas / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        minesWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_wheel_pc',
      name: 'Transmutación: Poker a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Ruleta Fortuna / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        fortuneWheelWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_dice_pc',
      name: 'Transmutación: Poker a Dados',
      icon: '🎲',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en los Dados, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Dados / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        diceWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_plinko_pc',
      name: 'Transmutación: Poker a Plinko',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Plinko / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        plinkoWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_blackjack_pc',
      name: 'Transmutación: Poker a Blackjack',
      icon: '🃏',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +12.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Poker.',
      stats: '+12.5% Blackjack / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        blackjackWinBonus: 0.125,
        transferFrom: 'pokerWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_ruleta_target_num_0_pc',
      name: 'Sintonía del Número 0',
      icon: '🟢',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 0 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 0',
      effects: {
        rouletteTarget: 'num-0',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_1_pc',
      name: 'Sintonía del Número 1',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 1 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 1',
      effects: {
        rouletteTarget: 'num-1',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_2_pc',
      name: 'Sintonía del Número 2',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 2 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 2',
      effects: {
        rouletteTarget: 'num-2',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_3_pc',
      name: 'Sintonía del Número 3',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 3 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 3',
      effects: {
        rouletteTarget: 'num-3',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_4_pc',
      name: 'Sintonía del Número 4',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 4 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 4',
      effects: {
        rouletteTarget: 'num-4',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_5_pc',
      name: 'Sintonía del Número 5',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 5 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 5',
      effects: {
        rouletteTarget: 'num-5',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_6_pc',
      name: 'Sintonía del Número 6',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 6 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 6',
      effects: {
        rouletteTarget: 'num-6',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_7_pc',
      name: 'Sintonía del Número 7',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 7 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 7',
      effects: {
        rouletteTarget: 'num-7',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_8_pc',
      name: 'Sintonía del Número 8',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 8 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 8',
      effects: {
        rouletteTarget: 'num-8',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_9_pc',
      name: 'Sintonía del Número 9',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 9 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 9',
      effects: {
        rouletteTarget: 'num-9',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_10_pc',
      name: 'Sintonía del Número 10',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 10 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 10',
      effects: {
        rouletteTarget: 'num-10',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_11_pc',
      name: 'Sintonía del Número 11',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 11 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 11',
      effects: {
        rouletteTarget: 'num-11',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_12_pc',
      name: 'Sintonía del Número 12',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 12 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 12',
      effects: {
        rouletteTarget: 'num-12',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_13_pc',
      name: 'Sintonía del Número 13',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 13 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 13',
      effects: {
        rouletteTarget: 'num-13',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_14_pc',
      name: 'Sintonía del Número 14',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 14 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 14',
      effects: {
        rouletteTarget: 'num-14',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_15_pc',
      name: 'Sintonía del Número 15',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 15 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 15',
      effects: {
        rouletteTarget: 'num-15',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_16_pc',
      name: 'Sintonía del Número 16',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 16 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 16',
      effects: {
        rouletteTarget: 'num-16',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_17_pc',
      name: 'Sintonía del Número 17',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 17 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 17',
      effects: {
        rouletteTarget: 'num-17',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_18_pc',
      name: 'Sintonía del Número 18',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 18 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 18',
      effects: {
        rouletteTarget: 'num-18',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_19_pc',
      name: 'Sintonía del Número 19',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 19 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 19',
      effects: {
        rouletteTarget: 'num-19',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_20_pc',
      name: 'Sintonía del Número 20',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 20 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 20',
      effects: {
        rouletteTarget: 'num-20',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_21_pc',
      name: 'Sintonía del Número 21',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 21 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 21',
      effects: {
        rouletteTarget: 'num-21',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_22_pc',
      name: 'Sintonía del Número 22',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 22 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 22',
      effects: {
        rouletteTarget: 'num-22',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_23_pc',
      name: 'Sintonía del Número 23',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 23 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 23',
      effects: {
        rouletteTarget: 'num-23',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_24_pc',
      name: 'Sintonía del Número 24',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 24 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 24',
      effects: {
        rouletteTarget: 'num-24',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_25_pc',
      name: 'Sintonía del Número 25',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 25 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 25',
      effects: {
        rouletteTarget: 'num-25',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_26_pc',
      name: 'Sintonía del Número 26',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 26 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 26',
      effects: {
        rouletteTarget: 'num-26',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_27_pc',
      name: 'Sintonía del Número 27',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 27 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 27',
      effects: {
        rouletteTarget: 'num-27',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_28_pc',
      name: 'Sintonía del Número 28',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 28 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 28',
      effects: {
        rouletteTarget: 'num-28',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_29_pc',
      name: 'Sintonía del Número 29',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 29 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 29',
      effects: {
        rouletteTarget: 'num-29',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_30_pc',
      name: 'Sintonía del Número 30',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 30 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 30',
      effects: {
        rouletteTarget: 'num-30',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_31_pc',
      name: 'Sintonía del Número 31',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 31 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 31',
      effects: {
        rouletteTarget: 'num-31',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_32_pc',
      name: 'Sintonía del Número 32',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 32 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 32',
      effects: {
        rouletteTarget: 'num-32',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_33_pc',
      name: 'Sintonía del Número 33',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 33 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 33',
      effects: {
        rouletteTarget: 'num-33',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_34_pc',
      name: 'Sintonía del Número 34',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 34 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 34',
      effects: {
        rouletteTarget: 'num-34',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_35_pc',
      name: 'Sintonía del Número 35',
      icon: '⚫',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 35 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 35',
      effects: {
        rouletteTarget: 'num-35',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_num_36_pc',
      name: 'Sintonía del Número 36',
      icon: '🔴',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de el Número 36 en la Ruleta.',
      stats: '+15.0% Prob. Base Número 36',
      effects: {
        rouletteTarget: 'num-36',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_tercio_1_pc',
      name: 'Sintonía del Primer Tercio (1-12)',
      icon: '1️⃣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números del 1 al 12 en la Ruleta.',
      stats: '+15.0% Prob. Base Primer Tercio (1-12)',
      effects: {
        rouletteTarget: 'dozen1',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_tercio_2_pc',
      name: 'Sintonía del Segundo Tercio (13-24)',
      icon: '2️⃣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números del 13 al 24 en la Ruleta.',
      stats: '+15.0% Prob. Base Segundo Tercio (13-24)',
      effects: {
        rouletteTarget: 'dozen2',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_tercio_3_pc',
      name: 'Sintonía del Tercer Tercio (25-36)',
      icon: '3️⃣',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números del 25 al 36 en la Ruleta.',
      stats: '+15.0% Prob. Base Tercer Tercio (25-36)',
      effects: {
        rouletteTarget: 'dozen3',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_color_rojo_pc',
      name: 'Sintonía del Rojo',
      icon: '🟥',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números Rojos en la Ruleta.',
      stats: '+15.0% Prob. Base Rojo',
      effects: {
        rouletteTarget: 'red',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_color_negro_pc',
      name: 'Sintonía del Negro',
      icon: '⬛',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números Negros en la Ruleta.',
      stats: '+15.0% Prob. Base Negro',
      effects: {
        rouletteTarget: 'black',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_rango_bajos_pc',
      name: 'Sintonía de Falta (1-18)',
      icon: '🔻',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números Bajos (1 al 18) en la Ruleta.',
      stats: '+15.0% Prob. Base Falta (1-18)',
      effects: {
        rouletteTarget: 'low',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_rango_altos_pc',
      name: 'Sintonía de Pasa (19-36)',
      icon: '🔺',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números Altos (19 al 36) en la Ruleta.',
      stats: '+15.0% Prob. Base Pasa (19-36)',
      effects: {
        rouletteTarget: 'high',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_paridad_par_pc',
      name: 'Sintonía de Pares',
      icon: '⚖️',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números Pares en la Ruleta.',
      stats: '+15.0% Prob. Base Pares',
      effects: {
        rouletteTarget: 'even',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_target_paridad_impar_pc',
      name: 'Sintonía de Impares',
      icon: '⚡',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Aumenta un +15.0% la probabilidad base de los números Impares en la Ruleta.',
      stats: '+15.0% Prob. Base Impares',
      effects: {
        rouletteTarget: 'odd',
        rouletteWeightBonus: 0.15
      }
    },
    {
      id: 'perk_ruleta_sinergia_mesa_pc',
      name: 'Sintonía de Mesa: Ruleta',
      icon: '👥',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Otorga un +3.125% más de suerte en la Ruleta por cada jugador adicional sentado a la mesa contigo.',
      stats: '+3.125% Suerte / Jugador en Mesa',
      effects: {
        roulettePerPlayerBonus: 0.03125
      }
    },
    {
      id: 'perk_poker_mano_debil_pc',
      name: 'Farol Astuto: Doble Par a Carta Alta',
      icon: '🎭',
      rarity: 'pocoComun',
      tier: 'POCO COMÚN',
      description: 'Multiplica el bote ganado en Póker si vences con una mano débil: x1.25 con Doble Pareja, x1.44 con Pareja y hasta x1.625 con Carta Alta.',
      stats: 'x1.25 Doble Par / x1.44 Par / x1.625 Carta Alta',
      effects: {
        pokerUnderdogMultipliers: {
          3: 1.25,
          2: 1.4375,
          1: 1.625
        }
      }
    }
  ],
  raro: [
    {
      id: 'perk_amuleto_trebol_r',
      name: 'Trébol de Zafiro',
      icon: '🍀',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +1.5% plano la probabilidad de ganar en todos los juegos del casino.',
      stats: '+1.5% Suerte Global',
      effects: {
        flatWinBonus: 0.015
      }
    },
    {
      id: 'perk_ruleta_suerte_r',
      name: 'Imán de Zafiro de Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de acertar apuestas en la Ruleta.',
      stats: '+15.0% Suerte en Ruleta',
      effects: {
        rouletteWinBonus: 0.15
      }
    },
    {
      id: 'perk_tragaperras_suerte_r',
      name: 'Palanca de Platino',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de ganar en la Tragaperras 777 clásica.',
      stats: '+15.0% Suerte en Tragaperras 777',
      effects: {
        slots3x3WinBonus: 0.15
      }
    },
    {
      id: 'perk_slots5x5_suerte_r',
      name: 'Sobrecarga Neón Cristalina',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de conectar líneas en las Slots 5x5.',
      stats: '+15.0% Suerte en Slots 5x5',
      effects: {
        slots5x5WinBonus: 0.15
      }
    },
    {
      id: 'perk_gachapon_suerte_r',
      name: 'Manivela de Zafiro',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de cápsulas superiores en el Gachapón 3D.',
      stats: '+15.0% Suerte en Gachapón',
      effects: {
        gachaponWinBonus: 0.15
      }
    },
    {
      id: 'perk_coin_suerte_r',
      name: 'Moneda de Zafiro Grabada',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de acertar en Lanzamiento de Moneda 3D.',
      stats: '+15.0% Suerte en Moneda',
      effects: {
        coinWinBonus: 0.15
      }
    },
    {
      id: 'perk_mines_suerte_r',
      name: 'Sonar Anti-Minas Cristalino',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de desactivar y esquivar bombas en Buscaminas.',
      stats: '+15.0% Suerte en Buscaminas',
      effects: {
        minesWinBonus: 0.15
      }
    },
    {
      id: 'perk_wheel_suerte_r',
      name: 'Puntero de Zafiro Imantado',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de multiplicadores altos en la Ruleta de la Fortuna.',
      stats: '+15.0% Suerte en Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: 0.15
      }
    },
    {
      id: 'perk_dice_suerte_r',
      name: 'Dados de Cristal Tallado',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de sacar puntuaciones más altas en Dados 3D.',
      stats: '+15.0% Suerte en Dados',
      effects: {
        diceWinBonus: 0.15
      }
    },
    {
      id: 'perk_plinko_suerte_r',
      name: 'Rebote Dirigido de Zafiro',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de alcanzar ranuras multiplicadoras en Plinko 3D.',
      stats: '+15.0% Suerte en Plinko',
      effects: {
        plinkoWinBonus: 0.15
      }
    },
    {
      id: 'perk_blackjack_suerte_r',
      name: 'As de Zafiro Maestro',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de obtener 21 y manos favorables en Blackjack 3D.',
      stats: '+15.0% Suerte en Blackjack',
      effects: {
        blackjackWinBonus: 0.15
      }
    },
    {
      id: 'perk_poker_suerte_r',
      name: 'Visión Cristalina de Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% plano la probabilidad de ligar jugadas ganadoras en Poker 3D.',
      stats: '+15.0% Suerte en Poker',
      effects: {
        pokerWinBonus: 0.15
      }
    },
    {
      id: 'perk_pacto_ruleta_r',
      name: 'Devoción de la Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Ruleta / -4.0% Resto',
      effects: {
        rouletteWinBonus: 0.15,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'rouletteWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_tragaperras_r',
      name: 'Devoción de las Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Tragaperras 777 / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: 0.15,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'slots3x3WinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_slots5x5_r',
      name: 'Devoción de las Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Slots 5x5 / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: 0.15,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'slots5x5WinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_gachapon_r',
      name: 'Devoción del Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Gachapón / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: 0.15,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'gachaponWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_coin_r',
      name: 'Devoción del Lanzamiento de Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Moneda / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: 0.15,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'coinWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_mines_r',
      name: 'Devoción del Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Buscaminas / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: 0.15,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'minesWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_wheel_r',
      name: 'Devoción de la Ruleta de la Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Ruleta Fortuna / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: 0.15,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'fortuneWheelWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_dice_r',
      name: 'Devoción de los Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Dados / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: 0.15,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'diceWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_plinko_r',
      name: 'Devoción del Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Plinko / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: 0.15,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'plinkoWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_blackjack_r',
      name: 'Devoción del Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Blackjack / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: 0.15,
        pokerWinBonus: -0.04,
        focusTarget: 'blackjackWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_poker_r',
      name: 'Devoción del Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero resta un -4% en el resto de máquinas.',
      stats: '+15.0% Poker / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: 0.15,
        focusTarget: 'pokerWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_trueque_ruleta_a_tragaperras_r',
      name: 'Alquimia: Ruleta a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Tragaperras 777 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_slots5x5_r',
      name: 'Alquimia: Ruleta a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Slots 5x5 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_gachapon_r',
      name: 'Alquimia: Ruleta a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Gachapón / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_coin_r',
      name: 'Alquimia: Ruleta a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Moneda / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_mines_r',
      name: 'Alquimia: Ruleta a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Buscaminas / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_wheel_r',
      name: 'Alquimia: Ruleta a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_dice_r',
      name: 'Alquimia: Ruleta a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Dados / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_plinko_r',
      name: 'Alquimia: Ruleta a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Plinko / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_blackjack_r',
      name: 'Alquimia: Ruleta a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Blackjack / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_poker_r',
      name: 'Alquimia: Ruleta a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+15.0% Poker / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_ruleta_r',
      name: 'Alquimia: Tragaperras 777 a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Ruleta / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_slots5x5_r',
      name: 'Alquimia: Tragaperras 777 a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Slots 5x5 / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_gachapon_r',
      name: 'Alquimia: Tragaperras 777 a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Gachapón / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_coin_r',
      name: 'Alquimia: Tragaperras 777 a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Moneda / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_mines_r',
      name: 'Alquimia: Tragaperras 777 a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Buscaminas / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_wheel_r',
      name: 'Alquimia: Tragaperras 777 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_dice_r',
      name: 'Alquimia: Tragaperras 777 a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Dados / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_plinko_r',
      name: 'Alquimia: Tragaperras 777 a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Plinko / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_blackjack_r',
      name: 'Alquimia: Tragaperras 777 a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Blackjack / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_poker_r',
      name: 'Alquimia: Tragaperras 777 a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+15.0% Poker / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_ruleta_r',
      name: 'Alquimia: Slots 5x5 a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Ruleta / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_tragaperras_r',
      name: 'Alquimia: Slots 5x5 a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Tragaperras 777 / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_gachapon_r',
      name: 'Alquimia: Slots 5x5 a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Gachapón / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_coin_r',
      name: 'Alquimia: Slots 5x5 a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Moneda / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_mines_r',
      name: 'Alquimia: Slots 5x5 a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Buscaminas / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_wheel_r',
      name: 'Alquimia: Slots 5x5 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_dice_r',
      name: 'Alquimia: Slots 5x5 a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Dados / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_plinko_r',
      name: 'Alquimia: Slots 5x5 a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Plinko / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_blackjack_r',
      name: 'Alquimia: Slots 5x5 a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Blackjack / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_poker_r',
      name: 'Alquimia: Slots 5x5 a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+15.0% Poker / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_ruleta_r',
      name: 'Alquimia: Gachapón a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Ruleta / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_tragaperras_r',
      name: 'Alquimia: Gachapón a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Tragaperras 777 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_slots5x5_r',
      name: 'Alquimia: Gachapón a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Slots 5x5 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_coin_r',
      name: 'Alquimia: Gachapón a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Moneda / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_mines_r',
      name: 'Alquimia: Gachapón a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Buscaminas / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_wheel_r',
      name: 'Alquimia: Gachapón a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_dice_r',
      name: 'Alquimia: Gachapón a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Dados / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_plinko_r',
      name: 'Alquimia: Gachapón a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Plinko / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_blackjack_r',
      name: 'Alquimia: Gachapón a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Blackjack / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_poker_r',
      name: 'Alquimia: Gachapón a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+15.0% Poker / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_ruleta_r',
      name: 'Alquimia: Moneda a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Ruleta / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_tragaperras_r',
      name: 'Alquimia: Moneda a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Tragaperras 777 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_slots5x5_r',
      name: 'Alquimia: Moneda a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Slots 5x5 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_gachapon_r',
      name: 'Alquimia: Moneda a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Gachapón / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_mines_r',
      name: 'Alquimia: Moneda a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Buscaminas / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_wheel_r',
      name: 'Alquimia: Moneda a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_dice_r',
      name: 'Alquimia: Moneda a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Dados / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_plinko_r',
      name: 'Alquimia: Moneda a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Plinko / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_blackjack_r',
      name: 'Alquimia: Moneda a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Blackjack / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_poker_r',
      name: 'Alquimia: Moneda a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+15.0% Poker / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'coinWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_ruleta_r',
      name: 'Alquimia: Buscaminas a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Ruleta / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_tragaperras_r',
      name: 'Alquimia: Buscaminas a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Tragaperras 777 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_slots5x5_r',
      name: 'Alquimia: Buscaminas a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Slots 5x5 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_gachapon_r',
      name: 'Alquimia: Buscaminas a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Gachapón / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_coin_r',
      name: 'Alquimia: Buscaminas a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Moneda / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_wheel_r',
      name: 'Alquimia: Buscaminas a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_dice_r',
      name: 'Alquimia: Buscaminas a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Dados / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_plinko_r',
      name: 'Alquimia: Buscaminas a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Plinko / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_blackjack_r',
      name: 'Alquimia: Buscaminas a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Blackjack / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_poker_r',
      name: 'Alquimia: Buscaminas a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+15.0% Poker / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'minesWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_ruleta_r',
      name: 'Alquimia: Ruleta Fortuna a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Ruleta / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_tragaperras_r',
      name: 'Alquimia: Ruleta Fortuna a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Tragaperras 777 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_slots5x5_r',
      name: 'Alquimia: Ruleta Fortuna a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Slots 5x5 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_gachapon_r',
      name: 'Alquimia: Ruleta Fortuna a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Gachapón / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_coin_r',
      name: 'Alquimia: Ruleta Fortuna a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Moneda / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_mines_r',
      name: 'Alquimia: Ruleta Fortuna a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Buscaminas / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_dice_r',
      name: 'Alquimia: Ruleta Fortuna a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Dados / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_plinko_r',
      name: 'Alquimia: Ruleta Fortuna a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Plinko / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_blackjack_r',
      name: 'Alquimia: Ruleta Fortuna a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Blackjack / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_poker_r',
      name: 'Alquimia: Ruleta Fortuna a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+15.0% Poker / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_ruleta_r',
      name: 'Alquimia: Dados a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Ruleta / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_tragaperras_r',
      name: 'Alquimia: Dados a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Tragaperras 777 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_slots5x5_r',
      name: 'Alquimia: Dados a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Slots 5x5 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_gachapon_r',
      name: 'Alquimia: Dados a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Gachapón / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_coin_r',
      name: 'Alquimia: Dados a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Moneda / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_mines_r',
      name: 'Alquimia: Dados a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Buscaminas / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_wheel_r',
      name: 'Alquimia: Dados a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_plinko_r',
      name: 'Alquimia: Dados a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Plinko / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_blackjack_r',
      name: 'Alquimia: Dados a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Blackjack / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_poker_r',
      name: 'Alquimia: Dados a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en los Dados.',
      stats: '+15.0% Poker / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'diceWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_ruleta_r',
      name: 'Alquimia: Plinko a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Ruleta / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_tragaperras_r',
      name: 'Alquimia: Plinko a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Tragaperras 777 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_slots5x5_r',
      name: 'Alquimia: Plinko a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Slots 5x5 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_gachapon_r',
      name: 'Alquimia: Plinko a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Gachapón / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_coin_r',
      name: 'Alquimia: Plinko a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Moneda / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_mines_r',
      name: 'Alquimia: Plinko a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Buscaminas / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_wheel_r',
      name: 'Alquimia: Plinko a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_dice_r',
      name: 'Alquimia: Plinko a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Dados / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_blackjack_r',
      name: 'Alquimia: Plinko a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Blackjack / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_poker_r',
      name: 'Alquimia: Plinko a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en el Plinko.',
      stats: '+15.0% Poker / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_ruleta_r',
      name: 'Alquimia: Blackjack a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Ruleta / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_tragaperras_r',
      name: 'Alquimia: Blackjack a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Tragaperras 777 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_slots5x5_r',
      name: 'Alquimia: Blackjack a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Slots 5x5 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_gachapon_r',
      name: 'Alquimia: Blackjack a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Gachapón / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_coin_r',
      name: 'Alquimia: Blackjack a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Moneda / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_mines_r',
      name: 'Alquimia: Blackjack a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Buscaminas / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_wheel_r',
      name: 'Alquimia: Blackjack a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_dice_r',
      name: 'Alquimia: Blackjack a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Dados / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_plinko_r',
      name: 'Alquimia: Blackjack a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Plinko / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_poker_r',
      name: 'Alquimia: Blackjack a Poker',
      icon: '♠️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Poker, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+15.0% Poker / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        pokerWinBonus: 0.15,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_ruleta_r',
      name: 'Alquimia: Poker a Ruleta',
      icon: '🎡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Ruleta / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        rouletteWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_tragaperras_r',
      name: 'Alquimia: Poker a Tragaperras 777',
      icon: '🍒',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Tragaperras 777 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots3x3WinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_slots5x5_r',
      name: 'Alquimia: Poker a Slots 5x5',
      icon: '🎰',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Slots 5x5 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots5x5WinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_gachapon_r',
      name: 'Alquimia: Poker a Gachapón',
      icon: '🎁',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Gachapón, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Gachapón / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        gachaponWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_coin_r',
      name: 'Alquimia: Poker a Moneda',
      icon: '🪙',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Moneda / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        coinWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_mines_r',
      name: 'Alquimia: Poker a Buscaminas',
      icon: '💣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Buscaminas / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        minesWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_wheel_r',
      name: 'Alquimia: Poker a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Ruleta Fortuna / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        fortuneWheelWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_dice_r',
      name: 'Alquimia: Poker a Dados',
      icon: '🎲',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en los Dados, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Dados / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        diceWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_plinko_r',
      name: 'Alquimia: Poker a Plinko',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Plinko, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Plinko / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        plinkoWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_blackjack_r',
      name: 'Alquimia: Poker a Blackjack',
      icon: '🃏',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +15% la suerte en el Blackjack, pero reduce un -10% la suerte en el Poker.',
      stats: '+15.0% Blackjack / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        blackjackWinBonus: 0.15,
        transferFrom: 'pokerWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_ruleta_target_num_0_r',
      name: 'Magnetismo del Número 0',
      icon: '🟢',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 0 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 0',
      effects: {
        rouletteTarget: 'num-0',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_1_r',
      name: 'Magnetismo del Número 1',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 1 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 1',
      effects: {
        rouletteTarget: 'num-1',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_2_r',
      name: 'Magnetismo del Número 2',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 2 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 2',
      effects: {
        rouletteTarget: 'num-2',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_3_r',
      name: 'Magnetismo del Número 3',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 3 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 3',
      effects: {
        rouletteTarget: 'num-3',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_4_r',
      name: 'Magnetismo del Número 4',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 4 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 4',
      effects: {
        rouletteTarget: 'num-4',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_5_r',
      name: 'Magnetismo del Número 5',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 5 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 5',
      effects: {
        rouletteTarget: 'num-5',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_6_r',
      name: 'Magnetismo del Número 6',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 6 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 6',
      effects: {
        rouletteTarget: 'num-6',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_7_r',
      name: 'Magnetismo del Número 7',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 7 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 7',
      effects: {
        rouletteTarget: 'num-7',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_8_r',
      name: 'Magnetismo del Número 8',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 8 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 8',
      effects: {
        rouletteTarget: 'num-8',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_9_r',
      name: 'Magnetismo del Número 9',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 9 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 9',
      effects: {
        rouletteTarget: 'num-9',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_10_r',
      name: 'Magnetismo del Número 10',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 10 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 10',
      effects: {
        rouletteTarget: 'num-10',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_11_r',
      name: 'Magnetismo del Número 11',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 11 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 11',
      effects: {
        rouletteTarget: 'num-11',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_12_r',
      name: 'Magnetismo del Número 12',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 12 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 12',
      effects: {
        rouletteTarget: 'num-12',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_13_r',
      name: 'Magnetismo del Número 13',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 13 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 13',
      effects: {
        rouletteTarget: 'num-13',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_14_r',
      name: 'Magnetismo del Número 14',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 14 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 14',
      effects: {
        rouletteTarget: 'num-14',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_15_r',
      name: 'Magnetismo del Número 15',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 15 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 15',
      effects: {
        rouletteTarget: 'num-15',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_16_r',
      name: 'Magnetismo del Número 16',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 16 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 16',
      effects: {
        rouletteTarget: 'num-16',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_17_r',
      name: 'Magnetismo del Número 17',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 17 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 17',
      effects: {
        rouletteTarget: 'num-17',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_18_r',
      name: 'Magnetismo del Número 18',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 18 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 18',
      effects: {
        rouletteTarget: 'num-18',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_19_r',
      name: 'Magnetismo del Número 19',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 19 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 19',
      effects: {
        rouletteTarget: 'num-19',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_20_r',
      name: 'Magnetismo del Número 20',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 20 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 20',
      effects: {
        rouletteTarget: 'num-20',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_21_r',
      name: 'Magnetismo del Número 21',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 21 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 21',
      effects: {
        rouletteTarget: 'num-21',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_22_r',
      name: 'Magnetismo del Número 22',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 22 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 22',
      effects: {
        rouletteTarget: 'num-22',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_23_r',
      name: 'Magnetismo del Número 23',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 23 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 23',
      effects: {
        rouletteTarget: 'num-23',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_24_r',
      name: 'Magnetismo del Número 24',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 24 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 24',
      effects: {
        rouletteTarget: 'num-24',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_25_r',
      name: 'Magnetismo del Número 25',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 25 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 25',
      effects: {
        rouletteTarget: 'num-25',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_26_r',
      name: 'Magnetismo del Número 26',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 26 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 26',
      effects: {
        rouletteTarget: 'num-26',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_27_r',
      name: 'Magnetismo del Número 27',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 27 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 27',
      effects: {
        rouletteTarget: 'num-27',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_28_r',
      name: 'Magnetismo del Número 28',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 28 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 28',
      effects: {
        rouletteTarget: 'num-28',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_29_r',
      name: 'Magnetismo del Número 29',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 29 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 29',
      effects: {
        rouletteTarget: 'num-29',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_30_r',
      name: 'Magnetismo del Número 30',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 30 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 30',
      effects: {
        rouletteTarget: 'num-30',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_31_r',
      name: 'Magnetismo del Número 31',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 31 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 31',
      effects: {
        rouletteTarget: 'num-31',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_32_r',
      name: 'Magnetismo del Número 32',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 32 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 32',
      effects: {
        rouletteTarget: 'num-32',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_33_r',
      name: 'Magnetismo del Número 33',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 33 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 33',
      effects: {
        rouletteTarget: 'num-33',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_34_r',
      name: 'Magnetismo del Número 34',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 34 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 34',
      effects: {
        rouletteTarget: 'num-34',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_35_r',
      name: 'Magnetismo del Número 35',
      icon: '⚫',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 35 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 35',
      effects: {
        rouletteTarget: 'num-35',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_num_36_r',
      name: 'Magnetismo del Número 36',
      icon: '🔴',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de el Número 36 en la Ruleta.',
      stats: '+17.5% Prob. Base Número 36',
      effects: {
        rouletteTarget: 'num-36',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_tercio_1_r',
      name: 'Magnetismo del Primer Tercio (1-12)',
      icon: '1️⃣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números del 1 al 12 en la Ruleta.',
      stats: '+17.5% Prob. Base Primer Tercio (1-12)',
      effects: {
        rouletteTarget: 'dozen1',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_tercio_2_r',
      name: 'Magnetismo del Segundo Tercio (13-24)',
      icon: '2️⃣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números del 13 al 24 en la Ruleta.',
      stats: '+17.5% Prob. Base Segundo Tercio (13-24)',
      effects: {
        rouletteTarget: 'dozen2',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_tercio_3_r',
      name: 'Magnetismo del Tercer Tercio (25-36)',
      icon: '3️⃣',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números del 25 al 36 en la Ruleta.',
      stats: '+17.5% Prob. Base Tercer Tercio (25-36)',
      effects: {
        rouletteTarget: 'dozen3',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_color_rojo_r',
      name: 'Magnetismo del Rojo',
      icon: '🟥',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números Rojos en la Ruleta.',
      stats: '+17.5% Prob. Base Rojo',
      effects: {
        rouletteTarget: 'red',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_color_negro_r',
      name: 'Magnetismo del Negro',
      icon: '⬛',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números Negros en la Ruleta.',
      stats: '+17.5% Prob. Base Negro',
      effects: {
        rouletteTarget: 'black',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_rango_bajos_r',
      name: 'Magnetismo de Falta (1-18)',
      icon: '🔻',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números Bajos (1 al 18) en la Ruleta.',
      stats: '+17.5% Prob. Base Falta (1-18)',
      effects: {
        rouletteTarget: 'low',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_rango_altos_r',
      name: 'Magnetismo de Pasa (19-36)',
      icon: '🔺',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números Altos (19 al 36) en la Ruleta.',
      stats: '+17.5% Prob. Base Pasa (19-36)',
      effects: {
        rouletteTarget: 'high',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_paridad_par_r',
      name: 'Magnetismo de Pares',
      icon: '⚖️',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números Pares en la Ruleta.',
      stats: '+17.5% Prob. Base Pares',
      effects: {
        rouletteTarget: 'even',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_target_paridad_impar_r',
      name: 'Magnetismo de Impares',
      icon: '⚡',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Aumenta un +17.5% la probabilidad base de los números Impares en la Ruleta.',
      stats: '+17.5% Prob. Base Impares',
      effects: {
        rouletteTarget: 'odd',
        rouletteWeightBonus: 0.175
      }
    },
    {
      id: 'perk_ruleta_sinergia_mesa_r',
      name: 'Resonancia de Mesa: Ruleta',
      icon: '👥',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Otorga un +3.75% más de suerte en la Ruleta por cada jugador adicional sentado a la mesa contigo.',
      stats: '+3.75% Suerte / Jugador en Mesa',
      effects: {
        roulettePerPlayerBonus: 0.0375
      }
    },
    {
      id: 'perk_poker_mano_debil_r',
      name: 'Farol Impecable: Doble Par a Carta Alta',
      icon: '🎭',
      rarity: 'raro',
      tier: 'RARO',
      description: 'Multiplica el bote ganado en Póker si vences con una mano débil: x1.30 con Doble Pareja, x1.525 con Pareja y hasta x1.75 con Carta Alta.',
      stats: 'x1.30 Doble Par / x1.525 Par / x1.75 Carta Alta',
      effects: {
        pokerUnderdogMultipliers: {
          3: 1.30,
          2: 1.525,
          1: 1.75
        }
      }
    }
  ],
  epico: [
    {
      id: 'perk_amuleto_trebol_e',
      name: 'Trébol de Amatista Mística',
      icon: '🍀',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +3% plano la probabilidad de ganar en todos los juegos del casino.',
      stats: '+3.0% Suerte Global',
      effects: {
        flatWinBonus: 0.03
      }
    },
    {
      id: 'perk_ruleta_suerte_e',
      name: 'Imán de Plasma de Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de acertar apuestas en la Ruleta.',
      stats: '+17.5% Suerte en Ruleta',
      effects: {
        rouletteWinBonus: 0.175
      }
    },
    {
      id: 'perk_tragaperras_suerte_e',
      name: 'Palanca de Diamante Púrpura',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de ganar en la Tragaperras 777 clásica.',
      stats: '+17.5% Suerte en Tragaperras 777',
      effects: {
        slots3x3WinBonus: 0.175
      }
    },
    {
      id: 'perk_slots5x5_suerte_e',
      name: 'Sobrecarga Neón Violeta',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de conectar líneas en las Slots 5x5.',
      stats: '+17.5% Suerte en Slots 5x5',
      effects: {
        slots5x5WinBonus: 0.175
      }
    },
    {
      id: 'perk_gachapon_suerte_e',
      name: 'Manivela Cósmica de Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de cápsulas superiores en el Gachapón 3D.',
      stats: '+17.5% Suerte en Gachapón',
      effects: {
        gachaponWinBonus: 0.175
      }
    },
    {
      id: 'perk_coin_suerte_e',
      name: 'Moneda de Amatista Rúnica',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de acertar en Lanzamiento de Moneda 3D.',
      stats: '+17.5% Suerte en Moneda',
      effects: {
        coinWinBonus: 0.175
      }
    },
    {
      id: 'perk_mines_suerte_e',
      name: 'Radar Cuántico Anti-Minas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de desactivar y esquivar bombas en Buscaminas.',
      stats: '+17.5% Suerte en Buscaminas',
      effects: {
        minesWinBonus: 0.175
      }
    },
    {
      id: 'perk_wheel_suerte_e',
      name: 'Puntero de Plasma Imantado',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de multiplicadores altos en la Ruleta de la Fortuna.',
      stats: '+17.5% Suerte en Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: 0.175
      }
    },
    {
      id: 'perk_dice_suerte_e',
      name: 'Dados de Obsidiana Encantada',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de sacar puntuaciones más altas en Dados 3D.',
      stats: '+17.5% Suerte en Dados',
      effects: {
        diceWinBonus: 0.175
      }
    },
    {
      id: 'perk_plinko_suerte_e',
      name: 'Rebote Magnético de Plasma',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de alcanzar ranuras multiplicadoras en Plinko 3D.',
      stats: '+17.5% Suerte en Plinko',
      effects: {
        plinkoWinBonus: 0.175
      }
    },
    {
      id: 'perk_blackjack_suerte_e',
      name: 'As Arcano del Crupier',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de obtener 21 y manos favorables en Blackjack 3D.',
      stats: '+17.5% Suerte en Blackjack',
      effects: {
        blackjackWinBonus: 0.175
      }
    },
    {
      id: 'perk_poker_suerte_e',
      name: 'Percepción Psiónica de Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% plano la probabilidad de ligar jugadas ganadoras en Poker 3D.',
      stats: '+17.5% Suerte en Poker',
      effects: {
        pokerWinBonus: 0.175
      }
    },
    {
      id: 'perk_pacto_ruleta_e',
      name: 'Frenesí de la Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Ruleta / -4.0% Resto',
      effects: {
        rouletteWinBonus: 0.175,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'rouletteWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_tragaperras_e',
      name: 'Frenesí de las Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Tragaperras 777 / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: 0.175,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'slots3x3WinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_slots5x5_e',
      name: 'Frenesí de las Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Slots 5x5 / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: 0.175,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'slots5x5WinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_gachapon_e',
      name: 'Frenesí del Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Gachapón / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: 0.175,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'gachaponWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_coin_e',
      name: 'Frenesí del Lanzamiento de Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Moneda / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: 0.175,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'coinWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_mines_e',
      name: 'Frenesí del Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Buscaminas / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: 0.175,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'minesWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_wheel_e',
      name: 'Frenesí de la Ruleta de la Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Ruleta Fortuna / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: 0.175,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'fortuneWheelWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_dice_e',
      name: 'Frenesí de los Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Dados / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: 0.175,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'diceWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_plinko_e',
      name: 'Frenesí del Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Plinko / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: 0.175,
        blackjackWinBonus: -0.04,
        pokerWinBonus: -0.04,
        focusTarget: 'plinkoWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_blackjack_e',
      name: 'Frenesí del Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Blackjack / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: 0.175,
        pokerWinBonus: -0.04,
        focusTarget: 'blackjackWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_pacto_poker_e',
      name: 'Frenesí del Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero resta un -4% en el resto de máquinas.',
      stats: '+17.5% Poker / -4.0% Resto',
      effects: {
        rouletteWinBonus: -0.04,
        slots3x3WinBonus: -0.04,
        slots5x5WinBonus: -0.04,
        gachaponWinBonus: -0.04,
        coinWinBonus: -0.04,
        minesWinBonus: -0.04,
        fortuneWheelWinBonus: -0.04,
        diceWinBonus: -0.04,
        plinkoWinBonus: -0.04,
        blackjackWinBonus: -0.04,
        pokerWinBonus: 0.175,
        focusTarget: 'pokerWinBonus',
        penaltyOthers: 0.04
      }
    },
    {
      id: 'perk_trueque_ruleta_a_tragaperras_e',
      name: 'Simbiosis: Ruleta a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Tragaperras 777 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_slots5x5_e',
      name: 'Simbiosis: Ruleta a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Slots 5x5 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_gachapon_e',
      name: 'Simbiosis: Ruleta a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Gachapón / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_coin_e',
      name: 'Simbiosis: Ruleta a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Moneda / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_mines_e',
      name: 'Simbiosis: Ruleta a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Buscaminas / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_wheel_e',
      name: 'Simbiosis: Ruleta a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_dice_e',
      name: 'Simbiosis: Ruleta a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Dados / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_plinko_e',
      name: 'Simbiosis: Ruleta a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Plinko / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_blackjack_e',
      name: 'Simbiosis: Ruleta a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Blackjack / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_poker_e',
      name: 'Simbiosis: Ruleta a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+17.5% Poker / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_ruleta_e',
      name: 'Simbiosis: Tragaperras 777 a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Ruleta / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_slots5x5_e',
      name: 'Simbiosis: Tragaperras 777 a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Slots 5x5 / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_gachapon_e',
      name: 'Simbiosis: Tragaperras 777 a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Gachapón / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_coin_e',
      name: 'Simbiosis: Tragaperras 777 a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Moneda / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_mines_e',
      name: 'Simbiosis: Tragaperras 777 a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Buscaminas / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_wheel_e',
      name: 'Simbiosis: Tragaperras 777 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_dice_e',
      name: 'Simbiosis: Tragaperras 777 a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Dados / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_plinko_e',
      name: 'Simbiosis: Tragaperras 777 a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Plinko / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_blackjack_e',
      name: 'Simbiosis: Tragaperras 777 a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Blackjack / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_poker_e',
      name: 'Simbiosis: Tragaperras 777 a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+17.5% Poker / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_ruleta_e',
      name: 'Simbiosis: Slots 5x5 a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Ruleta / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_tragaperras_e',
      name: 'Simbiosis: Slots 5x5 a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Tragaperras 777 / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_gachapon_e',
      name: 'Simbiosis: Slots 5x5 a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Gachapón / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_coin_e',
      name: 'Simbiosis: Slots 5x5 a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Moneda / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_mines_e',
      name: 'Simbiosis: Slots 5x5 a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Buscaminas / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_wheel_e',
      name: 'Simbiosis: Slots 5x5 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_dice_e',
      name: 'Simbiosis: Slots 5x5 a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Dados / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_plinko_e',
      name: 'Simbiosis: Slots 5x5 a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Plinko / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_blackjack_e',
      name: 'Simbiosis: Slots 5x5 a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Blackjack / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_poker_e',
      name: 'Simbiosis: Slots 5x5 a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+17.5% Poker / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_ruleta_e',
      name: 'Simbiosis: Gachapón a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Ruleta / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_tragaperras_e',
      name: 'Simbiosis: Gachapón a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Tragaperras 777 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_slots5x5_e',
      name: 'Simbiosis: Gachapón a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Slots 5x5 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_coin_e',
      name: 'Simbiosis: Gachapón a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Moneda / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_mines_e',
      name: 'Simbiosis: Gachapón a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Buscaminas / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_wheel_e',
      name: 'Simbiosis: Gachapón a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_dice_e',
      name: 'Simbiosis: Gachapón a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Dados / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_plinko_e',
      name: 'Simbiosis: Gachapón a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Plinko / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_blackjack_e',
      name: 'Simbiosis: Gachapón a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Blackjack / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_poker_e',
      name: 'Simbiosis: Gachapón a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+17.5% Poker / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_ruleta_e',
      name: 'Simbiosis: Moneda a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Ruleta / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_tragaperras_e',
      name: 'Simbiosis: Moneda a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Tragaperras 777 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_slots5x5_e',
      name: 'Simbiosis: Moneda a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Slots 5x5 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_gachapon_e',
      name: 'Simbiosis: Moneda a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Gachapón / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_mines_e',
      name: 'Simbiosis: Moneda a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Buscaminas / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_wheel_e',
      name: 'Simbiosis: Moneda a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_dice_e',
      name: 'Simbiosis: Moneda a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Dados / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_plinko_e',
      name: 'Simbiosis: Moneda a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Plinko / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_blackjack_e',
      name: 'Simbiosis: Moneda a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Blackjack / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_poker_e',
      name: 'Simbiosis: Moneda a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+17.5% Poker / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'coinWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_ruleta_e',
      name: 'Simbiosis: Buscaminas a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Ruleta / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_tragaperras_e',
      name: 'Simbiosis: Buscaminas a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Tragaperras 777 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_slots5x5_e',
      name: 'Simbiosis: Buscaminas a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Slots 5x5 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_gachapon_e',
      name: 'Simbiosis: Buscaminas a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Gachapón / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_coin_e',
      name: 'Simbiosis: Buscaminas a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Moneda / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_wheel_e',
      name: 'Simbiosis: Buscaminas a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_dice_e',
      name: 'Simbiosis: Buscaminas a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Dados / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_plinko_e',
      name: 'Simbiosis: Buscaminas a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Plinko / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_blackjack_e',
      name: 'Simbiosis: Buscaminas a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Blackjack / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_poker_e',
      name: 'Simbiosis: Buscaminas a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+17.5% Poker / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'minesWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_ruleta_e',
      name: 'Simbiosis: Ruleta Fortuna a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Ruleta / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_tragaperras_e',
      name: 'Simbiosis: Ruleta Fortuna a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Tragaperras 777 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_slots5x5_e',
      name: 'Simbiosis: Ruleta Fortuna a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Slots 5x5 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_gachapon_e',
      name: 'Simbiosis: Ruleta Fortuna a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Gachapón / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_coin_e',
      name: 'Simbiosis: Ruleta Fortuna a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Moneda / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_mines_e',
      name: 'Simbiosis: Ruleta Fortuna a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Buscaminas / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_dice_e',
      name: 'Simbiosis: Ruleta Fortuna a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Dados / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_plinko_e',
      name: 'Simbiosis: Ruleta Fortuna a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Plinko / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_blackjack_e',
      name: 'Simbiosis: Ruleta Fortuna a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Blackjack / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_poker_e',
      name: 'Simbiosis: Ruleta Fortuna a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+17.5% Poker / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_ruleta_e',
      name: 'Simbiosis: Dados a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Ruleta / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_tragaperras_e',
      name: 'Simbiosis: Dados a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Tragaperras 777 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_slots5x5_e',
      name: 'Simbiosis: Dados a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Slots 5x5 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_gachapon_e',
      name: 'Simbiosis: Dados a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Gachapón / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_coin_e',
      name: 'Simbiosis: Dados a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Moneda / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_mines_e',
      name: 'Simbiosis: Dados a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Buscaminas / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_wheel_e',
      name: 'Simbiosis: Dados a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_plinko_e',
      name: 'Simbiosis: Dados a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Plinko / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_blackjack_e',
      name: 'Simbiosis: Dados a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Blackjack / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_poker_e',
      name: 'Simbiosis: Dados a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en los Dados.',
      stats: '+17.5% Poker / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'diceWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_ruleta_e',
      name: 'Simbiosis: Plinko a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Ruleta / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_tragaperras_e',
      name: 'Simbiosis: Plinko a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Tragaperras 777 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_slots5x5_e',
      name: 'Simbiosis: Plinko a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Slots 5x5 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_gachapon_e',
      name: 'Simbiosis: Plinko a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Gachapón / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_coin_e',
      name: 'Simbiosis: Plinko a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Moneda / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_mines_e',
      name: 'Simbiosis: Plinko a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Buscaminas / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_wheel_e',
      name: 'Simbiosis: Plinko a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_dice_e',
      name: 'Simbiosis: Plinko a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Dados / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_blackjack_e',
      name: 'Simbiosis: Plinko a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Blackjack / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_poker_e',
      name: 'Simbiosis: Plinko a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en el Plinko.',
      stats: '+17.5% Poker / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_ruleta_e',
      name: 'Simbiosis: Blackjack a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Ruleta / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_tragaperras_e',
      name: 'Simbiosis: Blackjack a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Tragaperras 777 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_slots5x5_e',
      name: 'Simbiosis: Blackjack a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Slots 5x5 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_gachapon_e',
      name: 'Simbiosis: Blackjack a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Gachapón / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_coin_e',
      name: 'Simbiosis: Blackjack a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Moneda / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_mines_e',
      name: 'Simbiosis: Blackjack a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Buscaminas / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_wheel_e',
      name: 'Simbiosis: Blackjack a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_dice_e',
      name: 'Simbiosis: Blackjack a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Dados / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_plinko_e',
      name: 'Simbiosis: Blackjack a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Plinko / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_poker_e',
      name: 'Simbiosis: Blackjack a Poker',
      icon: '♠️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Poker, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+17.5% Poker / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        pokerWinBonus: 0.175,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_ruleta_e',
      name: 'Simbiosis: Poker a Ruleta',
      icon: '🎡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Ruleta / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        rouletteWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_tragaperras_e',
      name: 'Simbiosis: Poker a Tragaperras 777',
      icon: '🍒',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Tragaperras 777 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots3x3WinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_slots5x5_e',
      name: 'Simbiosis: Poker a Slots 5x5',
      icon: '🎰',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Slots 5x5 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots5x5WinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_gachapon_e',
      name: 'Simbiosis: Poker a Gachapón',
      icon: '🎁',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Gachapón, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Gachapón / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        gachaponWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_coin_e',
      name: 'Simbiosis: Poker a Moneda',
      icon: '🪙',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Moneda / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        coinWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_mines_e',
      name: 'Simbiosis: Poker a Buscaminas',
      icon: '💣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Buscaminas / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        minesWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_wheel_e',
      name: 'Simbiosis: Poker a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Ruleta Fortuna / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        fortuneWheelWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_dice_e',
      name: 'Simbiosis: Poker a Dados',
      icon: '🎲',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en los Dados, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Dados / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        diceWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_plinko_e',
      name: 'Simbiosis: Poker a Plinko',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Plinko, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Plinko / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        plinkoWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_blackjack_e',
      name: 'Simbiosis: Poker a Blackjack',
      icon: '🃏',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +17.5% la suerte en el Blackjack, pero reduce un -10% la suerte en el Poker.',
      stats: '+17.5% Blackjack / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        blackjackWinBonus: 0.175,
        transferFrom: 'pokerWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_ruleta_target_num_0_e',
      name: 'Fuerza Gravitacional: Número 0',
      icon: '🟢',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 0 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 0',
      effects: {
        rouletteTarget: 'num-0',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_1_e',
      name: 'Fuerza Gravitacional: Número 1',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 1 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 1',
      effects: {
        rouletteTarget: 'num-1',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_2_e',
      name: 'Fuerza Gravitacional: Número 2',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 2 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 2',
      effects: {
        rouletteTarget: 'num-2',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_3_e',
      name: 'Fuerza Gravitacional: Número 3',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 3 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 3',
      effects: {
        rouletteTarget: 'num-3',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_4_e',
      name: 'Fuerza Gravitacional: Número 4',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 4 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 4',
      effects: {
        rouletteTarget: 'num-4',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_5_e',
      name: 'Fuerza Gravitacional: Número 5',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 5 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 5',
      effects: {
        rouletteTarget: 'num-5',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_6_e',
      name: 'Fuerza Gravitacional: Número 6',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 6 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 6',
      effects: {
        rouletteTarget: 'num-6',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_7_e',
      name: 'Fuerza Gravitacional: Número 7',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 7 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 7',
      effects: {
        rouletteTarget: 'num-7',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_8_e',
      name: 'Fuerza Gravitacional: Número 8',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 8 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 8',
      effects: {
        rouletteTarget: 'num-8',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_9_e',
      name: 'Fuerza Gravitacional: Número 9',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 9 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 9',
      effects: {
        rouletteTarget: 'num-9',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_10_e',
      name: 'Fuerza Gravitacional: Número 10',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 10 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 10',
      effects: {
        rouletteTarget: 'num-10',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_11_e',
      name: 'Fuerza Gravitacional: Número 11',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 11 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 11',
      effects: {
        rouletteTarget: 'num-11',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_12_e',
      name: 'Fuerza Gravitacional: Número 12',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 12 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 12',
      effects: {
        rouletteTarget: 'num-12',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_13_e',
      name: 'Fuerza Gravitacional: Número 13',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 13 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 13',
      effects: {
        rouletteTarget: 'num-13',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_14_e',
      name: 'Fuerza Gravitacional: Número 14',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 14 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 14',
      effects: {
        rouletteTarget: 'num-14',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_15_e',
      name: 'Fuerza Gravitacional: Número 15',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 15 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 15',
      effects: {
        rouletteTarget: 'num-15',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_16_e',
      name: 'Fuerza Gravitacional: Número 16',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 16 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 16',
      effects: {
        rouletteTarget: 'num-16',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_17_e',
      name: 'Fuerza Gravitacional: Número 17',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 17 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 17',
      effects: {
        rouletteTarget: 'num-17',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_18_e',
      name: 'Fuerza Gravitacional: Número 18',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 18 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 18',
      effects: {
        rouletteTarget: 'num-18',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_19_e',
      name: 'Fuerza Gravitacional: Número 19',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 19 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 19',
      effects: {
        rouletteTarget: 'num-19',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_20_e',
      name: 'Fuerza Gravitacional: Número 20',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 20 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 20',
      effects: {
        rouletteTarget: 'num-20',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_21_e',
      name: 'Fuerza Gravitacional: Número 21',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 21 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 21',
      effects: {
        rouletteTarget: 'num-21',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_22_e',
      name: 'Fuerza Gravitacional: Número 22',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 22 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 22',
      effects: {
        rouletteTarget: 'num-22',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_23_e',
      name: 'Fuerza Gravitacional: Número 23',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 23 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 23',
      effects: {
        rouletteTarget: 'num-23',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_24_e',
      name: 'Fuerza Gravitacional: Número 24',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 24 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 24',
      effects: {
        rouletteTarget: 'num-24',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_25_e',
      name: 'Fuerza Gravitacional: Número 25',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 25 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 25',
      effects: {
        rouletteTarget: 'num-25',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_26_e',
      name: 'Fuerza Gravitacional: Número 26',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 26 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 26',
      effects: {
        rouletteTarget: 'num-26',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_27_e',
      name: 'Fuerza Gravitacional: Número 27',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 27 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 27',
      effects: {
        rouletteTarget: 'num-27',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_28_e',
      name: 'Fuerza Gravitacional: Número 28',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 28 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 28',
      effects: {
        rouletteTarget: 'num-28',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_29_e',
      name: 'Fuerza Gravitacional: Número 29',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 29 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 29',
      effects: {
        rouletteTarget: 'num-29',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_30_e',
      name: 'Fuerza Gravitacional: Número 30',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 30 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 30',
      effects: {
        rouletteTarget: 'num-30',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_31_e',
      name: 'Fuerza Gravitacional: Número 31',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 31 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 31',
      effects: {
        rouletteTarget: 'num-31',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_32_e',
      name: 'Fuerza Gravitacional: Número 32',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 32 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 32',
      effects: {
        rouletteTarget: 'num-32',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_33_e',
      name: 'Fuerza Gravitacional: Número 33',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 33 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 33',
      effects: {
        rouletteTarget: 'num-33',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_34_e',
      name: 'Fuerza Gravitacional: Número 34',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 34 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 34',
      effects: {
        rouletteTarget: 'num-34',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_35_e',
      name: 'Fuerza Gravitacional: Número 35',
      icon: '⚫',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 35 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 35',
      effects: {
        rouletteTarget: 'num-35',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_num_36_e',
      name: 'Fuerza Gravitacional: Número 36',
      icon: '🔴',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de el Número 36 en la Ruleta.',
      stats: '+20.0% Prob. Base Número 36',
      effects: {
        rouletteTarget: 'num-36',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_tercio_1_e',
      name: 'Fuerza Gravitacional: Primer Tercio (1-12)',
      icon: '1️⃣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números del 1 al 12 en la Ruleta.',
      stats: '+20.0% Prob. Base Primer Tercio (1-12)',
      effects: {
        rouletteTarget: 'dozen1',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_tercio_2_e',
      name: 'Fuerza Gravitacional: Segundo Tercio (13-24)',
      icon: '2️⃣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números del 13 al 24 en la Ruleta.',
      stats: '+20.0% Prob. Base Segundo Tercio (13-24)',
      effects: {
        rouletteTarget: 'dozen2',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_tercio_3_e',
      name: 'Fuerza Gravitacional: Tercer Tercio (25-36)',
      icon: '3️⃣',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números del 25 al 36 en la Ruleta.',
      stats: '+20.0% Prob. Base Tercer Tercio (25-36)',
      effects: {
        rouletteTarget: 'dozen3',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_color_rojo_e',
      name: 'Fuerza Gravitacional: Rojo',
      icon: '🟥',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números Rojos en la Ruleta.',
      stats: '+20.0% Prob. Base Rojo',
      effects: {
        rouletteTarget: 'red',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_color_negro_e',
      name: 'Fuerza Gravitacional: Negro',
      icon: '⬛',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números Negros en la Ruleta.',
      stats: '+20.0% Prob. Base Negro',
      effects: {
        rouletteTarget: 'black',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_rango_bajos_e',
      name: 'Fuerza Gravitacional: Falta (1-18)',
      icon: '🔻',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números Bajos (1 al 18) en la Ruleta.',
      stats: '+20.0% Prob. Base Falta (1-18)',
      effects: {
        rouletteTarget: 'low',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_rango_altos_e',
      name: 'Fuerza Gravitacional: Pasa (19-36)',
      icon: '🔺',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números Altos (19 al 36) en la Ruleta.',
      stats: '+20.0% Prob. Base Pasa (19-36)',
      effects: {
        rouletteTarget: 'high',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_paridad_par_e',
      name: 'Fuerza Gravitacional: Pares',
      icon: '⚖️',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números Pares en la Ruleta.',
      stats: '+20.0% Prob. Base Pares',
      effects: {
        rouletteTarget: 'even',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_target_paridad_impar_e',
      name: 'Fuerza Gravitacional: Impares',
      icon: '⚡',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Aumenta un +20.0% la probabilidad base de los números Impares en la Ruleta.',
      stats: '+20.0% Prob. Base Impares',
      effects: {
        rouletteTarget: 'odd',
        rouletteWeightBonus: 0.2
      }
    },
    {
      id: 'perk_ruleta_sinergia_mesa_e',
      name: 'Fervor de Mesa: Ruleta',
      icon: '👥',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Otorga un +4.375% más de suerte en la Ruleta por cada jugador adicional sentado a la mesa contigo.',
      stats: '+4.375% Suerte / Jugador en Mesa',
      effects: {
        roulettePerPlayerBonus: 0.04375
      }
    },
    {
      id: 'perk_poker_mano_debil_e',
      name: 'Farol Magistral: Doble Par a Carta Alta',
      icon: '🎭',
      rarity: 'epico',
      tier: 'ÉPICO',
      description: 'Multiplica el bote ganado en Póker si vences con una mano débil: x1.35 con Doble Pareja, x1.61 con Pareja y hasta x1.875 con Carta Alta.',
      stats: 'x1.35 Doble Par / x1.61 Par / x1.875 Carta Alta',
      effects: {
        pokerUnderdogMultipliers: {
          3: 1.35,
          2: 1.6125,
          1: 1.875
        }
      }
    }
  ],
  legendario: [
    {
      id: 'perk_amuleto_trebol_l',
      name: 'Trébol Dorado del Sol',
      icon: '🍀',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +5% plano la probabilidad de ganar en todos los juegos del casino.',
      stats: '+5.0% Suerte Global',
      effects: {
        flatWinBonus: 0.05
      }
    },
    {
      id: 'perk_ruleta_suerte_l',
      name: 'Imán Dorado de Helios',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de acertar apuestas en la Ruleta.',
      stats: '+25.0% Suerte en Ruleta',
      effects: {
        rouletteWinBonus: 0.25
      }
    },
    {
      id: 'perk_tragaperras_suerte_l',
      name: 'Palanca Celestial 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de ganar en la Tragaperras 777 clásica.',
      stats: '+25.0% Suerte en Tragaperras 777',
      effects: {
        slots3x3WinBonus: 0.25
      }
    },
    {
      id: 'perk_slots5x5_suerte_l',
      name: 'Sobrecarga Neón Solar',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de conectar líneas en las Slots 5x5.',
      stats: '+25.0% Suerte en Slots 5x5',
      effects: {
        slots5x5WinBonus: 0.25
      }
    },
    {
      id: 'perk_gachapon_suerte_l',
      name: 'Manivela Dorada de Fortuna',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de cápsulas superiores en el Gachapón 3D.',
      stats: '+25.0% Suerte en Gachapón',
      effects: {
        gachaponWinBonus: 0.25
      }
    },
    {
      id: 'perk_coin_suerte_l',
      name: 'Moneda Imperial de Oro Puro',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de acertar en Lanzamiento de Moneda 3D.',
      stats: '+25.0% Suerte en Moneda',
      effects: {
        coinWinBonus: 0.25
      }
    },
    {
      id: 'perk_mines_suerte_l',
      name: 'Desactivador Estelar de Minas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de desactivar y esquivar bombas en Buscaminas.',
      stats: '+25.0% Suerte en Buscaminas',
      effects: {
        minesWinBonus: 0.25
      }
    },
    {
      id: 'perk_wheel_suerte_l',
      name: 'Puntero Dorado de la Providencia',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de multiplicadores altos en la Ruleta de la Fortuna.',
      stats: '+25.0% Suerte en Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: 0.25
      }
    },
    {
      id: 'perk_dice_suerte_l',
      name: 'Dados Sagrados del Destino',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de sacar puntuaciones más altas en Dados 3D.',
      stats: '+25.0% Suerte en Dados',
      effects: {
        diceWinBonus: 0.25
      }
    },
    {
      id: 'perk_plinko_suerte_l',
      name: 'Guía Gravitacional Solar',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de alcanzar ranuras multiplicadoras en Plinko 3D.',
      stats: '+25.0% Suerte en Plinko',
      effects: {
        plinkoWinBonus: 0.25
      }
    },
    {
      id: 'perk_blackjack_suerte_l',
      name: 'As Corona del Rey del Casino',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de obtener 21 y manos favorables en Blackjack 3D.',
      stats: '+25.0% Suerte en Blackjack',
      effects: {
        blackjackWinBonus: 0.25
      }
    },
    {
      id: 'perk_poker_suerte_l',
      name: 'Mano Real de la Fortuna',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% plano la probabilidad de ligar jugadas ganadoras en Poker 3D.',
      stats: '+25.0% Suerte en Poker',
      effects: {
        pokerWinBonus: 0.25
      }
    },
    {
      id: 'perk_pacto_ruleta_l',
      name: 'Fanatismo de la Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Ruleta / -2.5% Resto',
      effects: {
        rouletteWinBonus: 0.25,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'rouletteWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_tragaperras_l',
      name: 'Fanatismo de las Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Tragaperras 777 / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: 0.25,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'slots3x3WinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_slots5x5_l',
      name: 'Fanatismo de las Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Slots 5x5 / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: 0.25,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'slots5x5WinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_gachapon_l',
      name: 'Fanatismo del Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Gachapón / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: 0.25,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'gachaponWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_coin_l',
      name: 'Fanatismo del Lanzamiento de Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Moneda / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: 0.25,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'coinWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_mines_l',
      name: 'Fanatismo del Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Buscaminas / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: 0.25,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'minesWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_wheel_l',
      name: 'Fanatismo de la Ruleta de la Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Ruleta Fortuna / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: 0.25,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'fortuneWheelWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_dice_l',
      name: 'Fanatismo de los Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Dados / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: 0.25,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'diceWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_plinko_l',
      name: 'Fanatismo del Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Plinko / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: 0.25,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'plinkoWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_blackjack_l',
      name: 'Fanatismo del Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Blackjack / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: 0.25,
        pokerWinBonus: -0.025,
        focusTarget: 'blackjackWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_poker_l',
      name: 'Fanatismo del Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero resta un -2.5% en el resto de máquinas.',
      stats: '+25.0% Poker / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: 0.25,
        focusTarget: 'pokerWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_trueque_ruleta_a_tragaperras_l',
      name: 'Nexo Dorado: Ruleta a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Tragaperras 777 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_slots5x5_l',
      name: 'Nexo Dorado: Ruleta a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Slots 5x5 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_gachapon_l',
      name: 'Nexo Dorado: Ruleta a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Gachapón / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_coin_l',
      name: 'Nexo Dorado: Ruleta a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Moneda / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_mines_l',
      name: 'Nexo Dorado: Ruleta a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Buscaminas / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_wheel_l',
      name: 'Nexo Dorado: Ruleta a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_dice_l',
      name: 'Nexo Dorado: Ruleta a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Dados / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_plinko_l',
      name: 'Nexo Dorado: Ruleta a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Plinko / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_blackjack_l',
      name: 'Nexo Dorado: Ruleta a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Blackjack / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_poker_l',
      name: 'Nexo Dorado: Ruleta a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+25.0% Poker / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_ruleta_l',
      name: 'Nexo Dorado: Tragaperras 777 a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Ruleta / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_slots5x5_l',
      name: 'Nexo Dorado: Tragaperras 777 a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Slots 5x5 / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_gachapon_l',
      name: 'Nexo Dorado: Tragaperras 777 a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Gachapón / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_coin_l',
      name: 'Nexo Dorado: Tragaperras 777 a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Moneda / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_mines_l',
      name: 'Nexo Dorado: Tragaperras 777 a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Buscaminas / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_wheel_l',
      name: 'Nexo Dorado: Tragaperras 777 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_dice_l',
      name: 'Nexo Dorado: Tragaperras 777 a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Dados / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_plinko_l',
      name: 'Nexo Dorado: Tragaperras 777 a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Plinko / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_blackjack_l',
      name: 'Nexo Dorado: Tragaperras 777 a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Blackjack / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_poker_l',
      name: 'Nexo Dorado: Tragaperras 777 a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+25.0% Poker / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_ruleta_l',
      name: 'Nexo Dorado: Slots 5x5 a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Ruleta / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_tragaperras_l',
      name: 'Nexo Dorado: Slots 5x5 a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Tragaperras 777 / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_gachapon_l',
      name: 'Nexo Dorado: Slots 5x5 a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Gachapón / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_coin_l',
      name: 'Nexo Dorado: Slots 5x5 a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Moneda / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_mines_l',
      name: 'Nexo Dorado: Slots 5x5 a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Buscaminas / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_wheel_l',
      name: 'Nexo Dorado: Slots 5x5 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_dice_l',
      name: 'Nexo Dorado: Slots 5x5 a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Dados / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_plinko_l',
      name: 'Nexo Dorado: Slots 5x5 a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Plinko / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_blackjack_l',
      name: 'Nexo Dorado: Slots 5x5 a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Blackjack / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_poker_l',
      name: 'Nexo Dorado: Slots 5x5 a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+25.0% Poker / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_ruleta_l',
      name: 'Nexo Dorado: Gachapón a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Ruleta / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_tragaperras_l',
      name: 'Nexo Dorado: Gachapón a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Tragaperras 777 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_slots5x5_l',
      name: 'Nexo Dorado: Gachapón a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Slots 5x5 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_coin_l',
      name: 'Nexo Dorado: Gachapón a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Moneda / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_mines_l',
      name: 'Nexo Dorado: Gachapón a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Buscaminas / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_wheel_l',
      name: 'Nexo Dorado: Gachapón a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_dice_l',
      name: 'Nexo Dorado: Gachapón a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Dados / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_plinko_l',
      name: 'Nexo Dorado: Gachapón a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Plinko / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_blackjack_l',
      name: 'Nexo Dorado: Gachapón a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Blackjack / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_poker_l',
      name: 'Nexo Dorado: Gachapón a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+25.0% Poker / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_ruleta_l',
      name: 'Nexo Dorado: Moneda a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Ruleta / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_tragaperras_l',
      name: 'Nexo Dorado: Moneda a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Tragaperras 777 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_slots5x5_l',
      name: 'Nexo Dorado: Moneda a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Slots 5x5 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_gachapon_l',
      name: 'Nexo Dorado: Moneda a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Gachapón / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_mines_l',
      name: 'Nexo Dorado: Moneda a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Buscaminas / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_wheel_l',
      name: 'Nexo Dorado: Moneda a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_dice_l',
      name: 'Nexo Dorado: Moneda a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Dados / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_plinko_l',
      name: 'Nexo Dorado: Moneda a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Plinko / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_blackjack_l',
      name: 'Nexo Dorado: Moneda a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Blackjack / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_poker_l',
      name: 'Nexo Dorado: Moneda a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+25.0% Poker / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'coinWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_ruleta_l',
      name: 'Nexo Dorado: Buscaminas a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Ruleta / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_tragaperras_l',
      name: 'Nexo Dorado: Buscaminas a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Tragaperras 777 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_slots5x5_l',
      name: 'Nexo Dorado: Buscaminas a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Slots 5x5 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_gachapon_l',
      name: 'Nexo Dorado: Buscaminas a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Gachapón / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_coin_l',
      name: 'Nexo Dorado: Buscaminas a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Moneda / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_wheel_l',
      name: 'Nexo Dorado: Buscaminas a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_dice_l',
      name: 'Nexo Dorado: Buscaminas a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Dados / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_plinko_l',
      name: 'Nexo Dorado: Buscaminas a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Plinko / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_blackjack_l',
      name: 'Nexo Dorado: Buscaminas a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Blackjack / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_poker_l',
      name: 'Nexo Dorado: Buscaminas a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+25.0% Poker / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'minesWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_ruleta_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Ruleta / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_tragaperras_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Tragaperras 777 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_slots5x5_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Slots 5x5 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_gachapon_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Gachapón / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_coin_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Moneda / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_mines_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Buscaminas / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_dice_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Dados / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_plinko_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Plinko / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_blackjack_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Blackjack / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_poker_l',
      name: 'Nexo Dorado: Ruleta Fortuna a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+25.0% Poker / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_ruleta_l',
      name: 'Nexo Dorado: Dados a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Ruleta / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_tragaperras_l',
      name: 'Nexo Dorado: Dados a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Tragaperras 777 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_slots5x5_l',
      name: 'Nexo Dorado: Dados a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Slots 5x5 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_gachapon_l',
      name: 'Nexo Dorado: Dados a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Gachapón / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_coin_l',
      name: 'Nexo Dorado: Dados a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Moneda / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_mines_l',
      name: 'Nexo Dorado: Dados a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Buscaminas / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_wheel_l',
      name: 'Nexo Dorado: Dados a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_plinko_l',
      name: 'Nexo Dorado: Dados a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Plinko / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_blackjack_l',
      name: 'Nexo Dorado: Dados a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Blackjack / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_poker_l',
      name: 'Nexo Dorado: Dados a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en los Dados.',
      stats: '+25.0% Poker / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'diceWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_ruleta_l',
      name: 'Nexo Dorado: Plinko a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Ruleta / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_tragaperras_l',
      name: 'Nexo Dorado: Plinko a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Tragaperras 777 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_slots5x5_l',
      name: 'Nexo Dorado: Plinko a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Slots 5x5 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_gachapon_l',
      name: 'Nexo Dorado: Plinko a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Gachapón / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_coin_l',
      name: 'Nexo Dorado: Plinko a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Moneda / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_mines_l',
      name: 'Nexo Dorado: Plinko a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Buscaminas / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_wheel_l',
      name: 'Nexo Dorado: Plinko a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_dice_l',
      name: 'Nexo Dorado: Plinko a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Dados / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_blackjack_l',
      name: 'Nexo Dorado: Plinko a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Blackjack / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_poker_l',
      name: 'Nexo Dorado: Plinko a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en el Plinko.',
      stats: '+25.0% Poker / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_ruleta_l',
      name: 'Nexo Dorado: Blackjack a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Ruleta / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_tragaperras_l',
      name: 'Nexo Dorado: Blackjack a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Tragaperras 777 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_slots5x5_l',
      name: 'Nexo Dorado: Blackjack a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Slots 5x5 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_gachapon_l',
      name: 'Nexo Dorado: Blackjack a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Gachapón / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_coin_l',
      name: 'Nexo Dorado: Blackjack a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Moneda / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_mines_l',
      name: 'Nexo Dorado: Blackjack a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Buscaminas / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_wheel_l',
      name: 'Nexo Dorado: Blackjack a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_dice_l',
      name: 'Nexo Dorado: Blackjack a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Dados / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_plinko_l',
      name: 'Nexo Dorado: Blackjack a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Plinko / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_poker_l',
      name: 'Nexo Dorado: Blackjack a Poker',
      icon: '♠️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Poker, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+25.0% Poker / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        pokerWinBonus: 0.25,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_ruleta_l',
      name: 'Nexo Dorado: Poker a Ruleta',
      icon: '🎡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Ruleta / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        rouletteWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_tragaperras_l',
      name: 'Nexo Dorado: Poker a Tragaperras 777',
      icon: '🍒',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Tragaperras 777 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots3x3WinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_slots5x5_l',
      name: 'Nexo Dorado: Poker a Slots 5x5',
      icon: '🎰',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Slots 5x5 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots5x5WinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_gachapon_l',
      name: 'Nexo Dorado: Poker a Gachapón',
      icon: '🎁',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Gachapón, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Gachapón / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        gachaponWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_coin_l',
      name: 'Nexo Dorado: Poker a Moneda',
      icon: '🪙',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Moneda / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        coinWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_mines_l',
      name: 'Nexo Dorado: Poker a Buscaminas',
      icon: '💣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Buscaminas / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        minesWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_wheel_l',
      name: 'Nexo Dorado: Poker a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Ruleta Fortuna / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        fortuneWheelWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_dice_l',
      name: 'Nexo Dorado: Poker a Dados',
      icon: '🎲',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en los Dados, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Dados / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        diceWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_plinko_l',
      name: 'Nexo Dorado: Poker a Plinko',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Plinko, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Plinko / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        plinkoWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_blackjack_l',
      name: 'Nexo Dorado: Poker a Blackjack',
      icon: '🃏',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +25% la suerte en el Blackjack, pero reduce un -10% la suerte en el Poker.',
      stats: '+25.0% Blackjack / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        blackjackWinBonus: 0.25,
        transferFrom: 'pokerWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_ruleta_target_num_0_l',
      name: 'Presagio Dorado: Número 0',
      icon: '🟢',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 0 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 0',
      effects: {
        rouletteTarget: 'num-0',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_1_l',
      name: 'Presagio Dorado: Número 1',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 1 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 1',
      effects: {
        rouletteTarget: 'num-1',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_2_l',
      name: 'Presagio Dorado: Número 2',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 2 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 2',
      effects: {
        rouletteTarget: 'num-2',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_3_l',
      name: 'Presagio Dorado: Número 3',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 3 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 3',
      effects: {
        rouletteTarget: 'num-3',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_4_l',
      name: 'Presagio Dorado: Número 4',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 4 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 4',
      effects: {
        rouletteTarget: 'num-4',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_5_l',
      name: 'Presagio Dorado: Número 5',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 5 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 5',
      effects: {
        rouletteTarget: 'num-5',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_6_l',
      name: 'Presagio Dorado: Número 6',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 6 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 6',
      effects: {
        rouletteTarget: 'num-6',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_7_l',
      name: 'Presagio Dorado: Número 7',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 7 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 7',
      effects: {
        rouletteTarget: 'num-7',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_8_l',
      name: 'Presagio Dorado: Número 8',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 8 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 8',
      effects: {
        rouletteTarget: 'num-8',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_9_l',
      name: 'Presagio Dorado: Número 9',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 9 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 9',
      effects: {
        rouletteTarget: 'num-9',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_10_l',
      name: 'Presagio Dorado: Número 10',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 10 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 10',
      effects: {
        rouletteTarget: 'num-10',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_11_l',
      name: 'Presagio Dorado: Número 11',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 11 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 11',
      effects: {
        rouletteTarget: 'num-11',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_12_l',
      name: 'Presagio Dorado: Número 12',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 12 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 12',
      effects: {
        rouletteTarget: 'num-12',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_13_l',
      name: 'Presagio Dorado: Número 13',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 13 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 13',
      effects: {
        rouletteTarget: 'num-13',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_14_l',
      name: 'Presagio Dorado: Número 14',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 14 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 14',
      effects: {
        rouletteTarget: 'num-14',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_15_l',
      name: 'Presagio Dorado: Número 15',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 15 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 15',
      effects: {
        rouletteTarget: 'num-15',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_16_l',
      name: 'Presagio Dorado: Número 16',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 16 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 16',
      effects: {
        rouletteTarget: 'num-16',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_17_l',
      name: 'Presagio Dorado: Número 17',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 17 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 17',
      effects: {
        rouletteTarget: 'num-17',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_18_l',
      name: 'Presagio Dorado: Número 18',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 18 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 18',
      effects: {
        rouletteTarget: 'num-18',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_19_l',
      name: 'Presagio Dorado: Número 19',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 19 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 19',
      effects: {
        rouletteTarget: 'num-19',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_20_l',
      name: 'Presagio Dorado: Número 20',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 20 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 20',
      effects: {
        rouletteTarget: 'num-20',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_21_l',
      name: 'Presagio Dorado: Número 21',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 21 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 21',
      effects: {
        rouletteTarget: 'num-21',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_22_l',
      name: 'Presagio Dorado: Número 22',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 22 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 22',
      effects: {
        rouletteTarget: 'num-22',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_23_l',
      name: 'Presagio Dorado: Número 23',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 23 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 23',
      effects: {
        rouletteTarget: 'num-23',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_24_l',
      name: 'Presagio Dorado: Número 24',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 24 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 24',
      effects: {
        rouletteTarget: 'num-24',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_25_l',
      name: 'Presagio Dorado: Número 25',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 25 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 25',
      effects: {
        rouletteTarget: 'num-25',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_26_l',
      name: 'Presagio Dorado: Número 26',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 26 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 26',
      effects: {
        rouletteTarget: 'num-26',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_27_l',
      name: 'Presagio Dorado: Número 27',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 27 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 27',
      effects: {
        rouletteTarget: 'num-27',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_28_l',
      name: 'Presagio Dorado: Número 28',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 28 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 28',
      effects: {
        rouletteTarget: 'num-28',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_29_l',
      name: 'Presagio Dorado: Número 29',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 29 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 29',
      effects: {
        rouletteTarget: 'num-29',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_30_l',
      name: 'Presagio Dorado: Número 30',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 30 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 30',
      effects: {
        rouletteTarget: 'num-30',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_31_l',
      name: 'Presagio Dorado: Número 31',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 31 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 31',
      effects: {
        rouletteTarget: 'num-31',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_32_l',
      name: 'Presagio Dorado: Número 32',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 32 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 32',
      effects: {
        rouletteTarget: 'num-32',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_33_l',
      name: 'Presagio Dorado: Número 33',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 33 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 33',
      effects: {
        rouletteTarget: 'num-33',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_34_l',
      name: 'Presagio Dorado: Número 34',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 34 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 34',
      effects: {
        rouletteTarget: 'num-34',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_35_l',
      name: 'Presagio Dorado: Número 35',
      icon: '⚫',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 35 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 35',
      effects: {
        rouletteTarget: 'num-35',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_num_36_l',
      name: 'Presagio Dorado: Número 36',
      icon: '🔴',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de el Número 36 en la Ruleta.',
      stats: '+30.0% Prob. Base Número 36',
      effects: {
        rouletteTarget: 'num-36',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_tercio_1_l',
      name: 'Presagio Dorado: Primer Tercio (1-12)',
      icon: '1️⃣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números del 1 al 12 en la Ruleta.',
      stats: '+30.0% Prob. Base Primer Tercio (1-12)',
      effects: {
        rouletteTarget: 'dozen1',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_tercio_2_l',
      name: 'Presagio Dorado: Segundo Tercio (13-24)',
      icon: '2️⃣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números del 13 al 24 en la Ruleta.',
      stats: '+30.0% Prob. Base Segundo Tercio (13-24)',
      effects: {
        rouletteTarget: 'dozen2',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_tercio_3_l',
      name: 'Presagio Dorado: Tercer Tercio (25-36)',
      icon: '3️⃣',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números del 25 al 36 en la Ruleta.',
      stats: '+30.0% Prob. Base Tercer Tercio (25-36)',
      effects: {
        rouletteTarget: 'dozen3',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_color_rojo_l',
      name: 'Presagio Dorado: Rojo',
      icon: '🟥',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números Rojos en la Ruleta.',
      stats: '+30.0% Prob. Base Rojo',
      effects: {
        rouletteTarget: 'red',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_color_negro_l',
      name: 'Presagio Dorado: Negro',
      icon: '⬛',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números Negros en la Ruleta.',
      stats: '+30.0% Prob. Base Negro',
      effects: {
        rouletteTarget: 'black',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_rango_bajos_l',
      name: 'Presagio Dorado: Falta (1-18)',
      icon: '🔻',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números Bajos (1 al 18) en la Ruleta.',
      stats: '+30.0% Prob. Base Falta (1-18)',
      effects: {
        rouletteTarget: 'low',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_rango_altos_l',
      name: 'Presagio Dorado: Pasa (19-36)',
      icon: '🔺',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números Altos (19 al 36) en la Ruleta.',
      stats: '+30.0% Prob. Base Pasa (19-36)',
      effects: {
        rouletteTarget: 'high',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_paridad_par_l',
      name: 'Presagio Dorado: Pares',
      icon: '⚖️',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números Pares en la Ruleta.',
      stats: '+30.0% Prob. Base Pares',
      effects: {
        rouletteTarget: 'even',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_target_paridad_impar_l',
      name: 'Presagio Dorado: Impares',
      icon: '⚡',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Aumenta un +30.0% la probabilidad base de los números Impares en la Ruleta.',
      stats: '+30.0% Prob. Base Impares',
      effects: {
        rouletteTarget: 'odd',
        rouletteWeightBonus: 0.3
      }
    },
    {
      id: 'perk_ruleta_sinergia_mesa_l',
      name: 'Convergencia de Mesa: Ruleta',
      icon: '👥',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Otorga un +6.25% más de suerte en la Ruleta por cada jugador adicional sentado a la mesa contigo.',
      stats: '+6.25% Suerte / Jugador en Mesa',
      effects: {
        roulettePerPlayerBonus: 0.0625
      }
    },
    {
      id: 'perk_poker_mano_debil_l',
      name: 'Rey del Farol: Trío a Carta Alta',
      icon: '🎭',
      rarity: 'legendario',
      tier: 'LEGENDARIO',
      description: 'Multiplica el bote ganado en Póker si vences con una mano débil: x1.35 con Trío, x1.65 con Doble Pareja, x1.95 con Pareja y hasta x2.25 con Carta Alta.',
      stats: 'x1.35 Trío / x1.65 Doble Par / x1.95 Par / x2.25 Carta Alta',
      effects: {
        pokerUnderdogMultipliers: {
          4: 1.35,
          3: 1.65,
          2: 1.95,
          1: 2.25
        }
      }
    }
  ],
  mitico: [
    {
      id: 'perk_amuleto_trebol_m',
      name: 'Trébol Primordial del Dragón',
      icon: '🍀',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +7% plano la probabilidad de ganar en todos los juegos del casino.',
      stats: '+7.0% Suerte Global',
      effects: {
        flatWinBonus: 0.07
      }
    },
    {
      id: 'perk_ruleta_suerte_m',
      name: 'Imán del Dragón del Vacío',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de acertar apuestas en la Ruleta.',
      stats: '+30.0% Suerte en Ruleta',
      effects: {
        rouletteWinBonus: 0.30
      }
    },
    {
      id: 'perk_tragaperras_suerte_m',
      name: 'Palanca del Dios del Azar 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de ganar en la Tragaperras 777 clásica.',
      stats: '+30.0% Suerte en Tragaperras 777',
      effects: {
        slots3x3WinBonus: 0.30
      }
    },
    {
      id: 'perk_slots5x5_suerte_m',
      name: 'Sobrecarga Neón Hiperdimensional',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de conectar líneas en las Slots 5x5.',
      stats: '+30.0% Suerte en Slots 5x5',
      effects: {
        slots5x5WinBonus: 0.30
      }
    },
    {
      id: 'perk_gachapon_suerte_m',
      name: 'Manivela Divina del Gachapón Infinito',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de cápsulas superiores en el Gachapón 3D.',
      stats: '+30.0% Suerte en Gachapón',
      effects: {
        gachaponWinBonus: 0.30
      }
    },
    {
      id: 'perk_coin_suerte_m',
      name: 'Moneda Primordial del Infinito',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de acertar en Lanzamiento de Moneda 3D.',
      stats: '+30.0% Suerte en Moneda',
      effects: {
        coinWinBonus: 0.30
      }
    },
    {
      id: 'perk_mines_suerte_m',
      name: 'Ojo Omnisciente de Minas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de desactivar y esquivar bombas en Buscaminas.',
      stats: '+30.0% Suerte en Buscaminas',
      effects: {
        minesWinBonus: 0.30
      }
    },
    {
      id: 'perk_wheel_suerte_m',
      name: 'Puntero del Destino Absoluto',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de multiplicadores altos en la Ruleta de la Fortuna.',
      stats: '+30.0% Suerte en Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: 0.30
      }
    },
    {
      id: 'perk_dice_suerte_m',
      name: 'Dados del Caos Cósmico',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de sacar puntuaciones más altas en Dados 3D.',
      stats: '+30.0% Suerte en Dados',
      effects: {
        diceWinBonus: 0.30
      }
    },
    {
      id: 'perk_plinko_suerte_m',
      name: 'Vórtice Cuántico de Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de alcanzar ranuras multiplicadoras en Plinko 3D.',
      stats: '+30.0% Suerte en Plinko',
      effects: {
        plinkoWinBonus: 0.30
      }
    },
    {
      id: 'perk_blackjack_suerte_m',
      name: 'As del Emperador Inmortal',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de obtener 21 y manos favorables en Blackjack 3D.',
      stats: '+30.0% Suerte en Blackjack',
      effects: {
        blackjackWinBonus: 0.30
      }
    },
    {
      id: 'perk_poker_suerte_m',
      name: 'Presciencia Absoluta del Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% plano la probabilidad de ligar jugadas ganadoras en Poker 3D.',
      stats: '+30.0% Suerte en Poker',
      effects: {
        pokerWinBonus: 0.30
      }
    },
    {
      id: 'perk_pacto_ruleta_m',
      name: 'Trascendencia de la Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Ruleta / -2.5% Resto',
      effects: {
        rouletteWinBonus: 0.3,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'rouletteWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_tragaperras_m',
      name: 'Trascendencia de las Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Tragaperras 777 / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: 0.3,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'slots3x3WinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_slots5x5_m',
      name: 'Trascendencia de las Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Slots 5x5 / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: 0.3,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'slots5x5WinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_gachapon_m',
      name: 'Trascendencia del Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Gachapón / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: 0.3,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'gachaponWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_coin_m',
      name: 'Trascendencia del Lanzamiento de Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Moneda / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: 0.3,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'coinWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_mines_m',
      name: 'Trascendencia del Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Buscaminas / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: 0.3,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'minesWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_wheel_m',
      name: 'Trascendencia de la Ruleta de la Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Ruleta Fortuna / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: 0.3,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'fortuneWheelWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_dice_m',
      name: 'Trascendencia de los Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Dados / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: 0.3,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'diceWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_plinko_m',
      name: 'Trascendencia del Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Plinko / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: 0.3,
        blackjackWinBonus: -0.025,
        pokerWinBonus: -0.025,
        focusTarget: 'plinkoWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_blackjack_m',
      name: 'Trascendencia del Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Blackjack / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: 0.3,
        pokerWinBonus: -0.025,
        focusTarget: 'blackjackWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_pacto_poker_m',
      name: 'Trascendencia del Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero resta un -2.5% en el resto de máquinas.',
      stats: '+30.0% Poker / -2.5% Resto',
      effects: {
        rouletteWinBonus: -0.025,
        slots3x3WinBonus: -0.025,
        slots5x5WinBonus: -0.025,
        gachaponWinBonus: -0.025,
        coinWinBonus: -0.025,
        minesWinBonus: -0.025,
        fortuneWheelWinBonus: -0.025,
        diceWinBonus: -0.025,
        plinkoWinBonus: -0.025,
        blackjackWinBonus: -0.025,
        pokerWinBonus: 0.3,
        focusTarget: 'pokerWinBonus',
        penaltyOthers: 0.025
      }
    },
    {
      id: 'perk_trueque_ruleta_a_tragaperras_m',
      name: 'Nexo Cósmico: Ruleta a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Tragaperras 777 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_slots5x5_m',
      name: 'Nexo Cósmico: Ruleta a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Slots 5x5 / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_gachapon_m',
      name: 'Nexo Cósmico: Ruleta a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Gachapón / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_coin_m',
      name: 'Nexo Cósmico: Ruleta a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Moneda / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_mines_m',
      name: 'Nexo Cósmico: Ruleta a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Buscaminas / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_wheel_m',
      name: 'Nexo Cósmico: Ruleta a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_dice_m',
      name: 'Nexo Cósmico: Ruleta a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Dados / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_plinko_m',
      name: 'Nexo Cósmico: Ruleta a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Plinko / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_blackjack_m',
      name: 'Nexo Cósmico: Ruleta a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Blackjack / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_ruleta_a_poker_m',
      name: 'Nexo Cósmico: Ruleta a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta.',
      stats: '+30.0% Poker / -10.0% Ruleta',
      effects: {
        rouletteWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'rouletteWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_ruleta_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Ruleta / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_slots5x5_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Slots 5x5 / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_gachapon_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Gachapón / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_coin_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Moneda / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_mines_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Buscaminas / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_wheel_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_dice_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Dados / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_plinko_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Plinko / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_blackjack_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Blackjack / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_tragaperras_a_poker_m',
      name: 'Nexo Cósmico: Tragaperras 777 a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en las Tragaperras 777.',
      stats: '+30.0% Poker / -10.0% Tragaperras 777',
      effects: {
        slots3x3WinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'slots3x3WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_ruleta_m',
      name: 'Nexo Cósmico: Slots 5x5 a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Ruleta / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_tragaperras_m',
      name: 'Nexo Cósmico: Slots 5x5 a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Tragaperras 777 / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_gachapon_m',
      name: 'Nexo Cósmico: Slots 5x5 a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Gachapón / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_coin_m',
      name: 'Nexo Cósmico: Slots 5x5 a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Moneda / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_mines_m',
      name: 'Nexo Cósmico: Slots 5x5 a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Buscaminas / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_wheel_m',
      name: 'Nexo Cósmico: Slots 5x5 a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_dice_m',
      name: 'Nexo Cósmico: Slots 5x5 a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Dados / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_plinko_m',
      name: 'Nexo Cósmico: Slots 5x5 a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Plinko / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_blackjack_m',
      name: 'Nexo Cósmico: Slots 5x5 a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Blackjack / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_slots5x5_a_poker_m',
      name: 'Nexo Cósmico: Slots 5x5 a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en las Slots 5x5.',
      stats: '+30.0% Poker / -10.0% Slots 5x5',
      effects: {
        slots5x5WinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'slots5x5WinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_ruleta_m',
      name: 'Nexo Cósmico: Gachapón a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Ruleta / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_tragaperras_m',
      name: 'Nexo Cósmico: Gachapón a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Tragaperras 777 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_slots5x5_m',
      name: 'Nexo Cósmico: Gachapón a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Slots 5x5 / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_coin_m',
      name: 'Nexo Cósmico: Gachapón a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Moneda / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_mines_m',
      name: 'Nexo Cósmico: Gachapón a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Buscaminas / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_wheel_m',
      name: 'Nexo Cósmico: Gachapón a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_dice_m',
      name: 'Nexo Cósmico: Gachapón a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Dados / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_plinko_m',
      name: 'Nexo Cósmico: Gachapón a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Plinko / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_blackjack_m',
      name: 'Nexo Cósmico: Gachapón a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Blackjack / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_gachapon_a_poker_m',
      name: 'Nexo Cósmico: Gachapón a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en el Gachapón.',
      stats: '+30.0% Poker / -10.0% Gachapón',
      effects: {
        gachaponWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'gachaponWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_ruleta_m',
      name: 'Nexo Cósmico: Moneda a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Ruleta / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_tragaperras_m',
      name: 'Nexo Cósmico: Moneda a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Tragaperras 777 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_slots5x5_m',
      name: 'Nexo Cósmico: Moneda a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Slots 5x5 / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_gachapon_m',
      name: 'Nexo Cósmico: Moneda a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Gachapón / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_mines_m',
      name: 'Nexo Cósmico: Moneda a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Buscaminas / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_wheel_m',
      name: 'Nexo Cósmico: Moneda a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_dice_m',
      name: 'Nexo Cósmico: Moneda a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Dados / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_plinko_m',
      name: 'Nexo Cósmico: Moneda a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Plinko / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_blackjack_m',
      name: 'Nexo Cósmico: Moneda a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Blackjack / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_coin_a_poker_m',
      name: 'Nexo Cósmico: Moneda a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en el Lanzamiento de Moneda.',
      stats: '+30.0% Poker / -10.0% Moneda',
      effects: {
        coinWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'coinWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_ruleta_m',
      name: 'Nexo Cósmico: Buscaminas a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Ruleta / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_tragaperras_m',
      name: 'Nexo Cósmico: Buscaminas a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Tragaperras 777 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_slots5x5_m',
      name: 'Nexo Cósmico: Buscaminas a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Slots 5x5 / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_gachapon_m',
      name: 'Nexo Cósmico: Buscaminas a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Gachapón / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_coin_m',
      name: 'Nexo Cósmico: Buscaminas a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Moneda / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_wheel_m',
      name: 'Nexo Cósmico: Buscaminas a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_dice_m',
      name: 'Nexo Cósmico: Buscaminas a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Dados / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_plinko_m',
      name: 'Nexo Cósmico: Buscaminas a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Plinko / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_blackjack_m',
      name: 'Nexo Cósmico: Buscaminas a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Blackjack / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_mines_a_poker_m',
      name: 'Nexo Cósmico: Buscaminas a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en el Buscaminas.',
      stats: '+30.0% Poker / -10.0% Buscaminas',
      effects: {
        minesWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'minesWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_ruleta_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Ruleta / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_tragaperras_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Tragaperras 777 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_slots5x5_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Slots 5x5 / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_gachapon_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Gachapón / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_coin_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Moneda / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_mines_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Buscaminas / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_dice_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Dados / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_plinko_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Plinko / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_blackjack_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Blackjack / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_wheel_a_poker_m',
      name: 'Nexo Cósmico: Ruleta Fortuna a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en la Ruleta de la Fortuna.',
      stats: '+30.0% Poker / -10.0% Ruleta Fortuna',
      effects: {
        fortuneWheelWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'fortuneWheelWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_ruleta_m',
      name: 'Nexo Cósmico: Dados a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Ruleta / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_tragaperras_m',
      name: 'Nexo Cósmico: Dados a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Tragaperras 777 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_slots5x5_m',
      name: 'Nexo Cósmico: Dados a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Slots 5x5 / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_gachapon_m',
      name: 'Nexo Cósmico: Dados a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Gachapón / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_coin_m',
      name: 'Nexo Cósmico: Dados a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Moneda / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_mines_m',
      name: 'Nexo Cósmico: Dados a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Buscaminas / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_wheel_m',
      name: 'Nexo Cósmico: Dados a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_plinko_m',
      name: 'Nexo Cósmico: Dados a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Plinko / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_blackjack_m',
      name: 'Nexo Cósmico: Dados a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Blackjack / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_dice_a_poker_m',
      name: 'Nexo Cósmico: Dados a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en los Dados.',
      stats: '+30.0% Poker / -10.0% Dados',
      effects: {
        diceWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'diceWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_ruleta_m',
      name: 'Nexo Cósmico: Plinko a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Ruleta / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_tragaperras_m',
      name: 'Nexo Cósmico: Plinko a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Tragaperras 777 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_slots5x5_m',
      name: 'Nexo Cósmico: Plinko a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Slots 5x5 / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_gachapon_m',
      name: 'Nexo Cósmico: Plinko a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Gachapón / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_coin_m',
      name: 'Nexo Cósmico: Plinko a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Moneda / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_mines_m',
      name: 'Nexo Cósmico: Plinko a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Buscaminas / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_wheel_m',
      name: 'Nexo Cósmico: Plinko a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_dice_m',
      name: 'Nexo Cósmico: Plinko a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Dados / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_blackjack_m',
      name: 'Nexo Cósmico: Plinko a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Blackjack / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_trueque_plinko_a_poker_m',
      name: 'Nexo Cósmico: Plinko a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en el Plinko.',
      stats: '+30.0% Poker / -10.0% Plinko',
      effects: {
        plinkoWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'plinkoWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_ruleta_m',
      name: 'Nexo Cósmico: Blackjack a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Ruleta / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_tragaperras_m',
      name: 'Nexo Cósmico: Blackjack a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Tragaperras 777 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_slots5x5_m',
      name: 'Nexo Cósmico: Blackjack a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Slots 5x5 / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_gachapon_m',
      name: 'Nexo Cósmico: Blackjack a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Gachapón / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_coin_m',
      name: 'Nexo Cósmico: Blackjack a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Moneda / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_mines_m',
      name: 'Nexo Cósmico: Blackjack a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Buscaminas / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_wheel_m',
      name: 'Nexo Cósmico: Blackjack a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_dice_m',
      name: 'Nexo Cósmico: Blackjack a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Dados / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_plinko_m',
      name: 'Nexo Cósmico: Blackjack a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Plinko / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_blackjack_a_poker_m',
      name: 'Nexo Cósmico: Blackjack a Poker',
      icon: '♠️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Poker, pero reduce un -10% la suerte en el Blackjack.',
      stats: '+30.0% Poker / -10.0% Blackjack',
      effects: {
        blackjackWinBonus: -0.1,
        pokerWinBonus: 0.3,
        transferFrom: 'blackjackWinBonus',
        transferTo: 'pokerWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_ruleta_m',
      name: 'Nexo Cósmico: Poker a Ruleta',
      icon: '🎡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Ruleta / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        rouletteWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'rouletteWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_tragaperras_m',
      name: 'Nexo Cósmico: Poker a Tragaperras 777',
      icon: '🍒',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Tragaperras 777, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Tragaperras 777 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots3x3WinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots3x3WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_slots5x5_m',
      name: 'Nexo Cósmico: Poker a Slots 5x5',
      icon: '🎰',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en las Slots 5x5, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Slots 5x5 / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        slots5x5WinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'slots5x5WinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_gachapon_m',
      name: 'Nexo Cósmico: Poker a Gachapón',
      icon: '🎁',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Gachapón, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Gachapón / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        gachaponWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'gachaponWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_coin_m',
      name: 'Nexo Cósmico: Poker a Moneda',
      icon: '🪙',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Lanzamiento de Moneda, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Moneda / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        coinWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'coinWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_mines_m',
      name: 'Nexo Cósmico: Poker a Buscaminas',
      icon: '💣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Buscaminas, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Buscaminas / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        minesWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'minesWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_wheel_m',
      name: 'Nexo Cósmico: Poker a Ruleta Fortuna',
      icon: '🎪',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en la Ruleta de la Fortuna, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Ruleta Fortuna / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        fortuneWheelWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'fortuneWheelWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_dice_m',
      name: 'Nexo Cósmico: Poker a Dados',
      icon: '🎲',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en los Dados, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Dados / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        diceWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'diceWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_plinko_m',
      name: 'Nexo Cósmico: Poker a Plinko',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Plinko, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Plinko / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        plinkoWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'plinkoWinBonus'
      }
    },
    {
      id: 'perk_trueque_poker_a_blackjack_m',
      name: 'Nexo Cósmico: Poker a Blackjack',
      icon: '🃏',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +30% la suerte en el Blackjack, pero reduce un -10% la suerte en el Poker.',
      stats: '+30.0% Blackjack / -10.0% Poker',
      effects: {
        pokerWinBonus: -0.1,
        blackjackWinBonus: 0.3,
        transferFrom: 'pokerWinBonus',
        transferTo: 'blackjackWinBonus'
      }
    },
    {
      id: 'perk_ruleta_target_num_0_m',
      name: 'Destino Cósmico: Número 0',
      icon: '🟢',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 0 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 0',
      effects: {
        rouletteTarget: 'num-0',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_1_m',
      name: 'Destino Cósmico: Número 1',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 1 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 1',
      effects: {
        rouletteTarget: 'num-1',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_2_m',
      name: 'Destino Cósmico: Número 2',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 2 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 2',
      effects: {
        rouletteTarget: 'num-2',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_3_m',
      name: 'Destino Cósmico: Número 3',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 3 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 3',
      effects: {
        rouletteTarget: 'num-3',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_4_m',
      name: 'Destino Cósmico: Número 4',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 4 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 4',
      effects: {
        rouletteTarget: 'num-4',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_5_m',
      name: 'Destino Cósmico: Número 5',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 5 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 5',
      effects: {
        rouletteTarget: 'num-5',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_6_m',
      name: 'Destino Cósmico: Número 6',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 6 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 6',
      effects: {
        rouletteTarget: 'num-6',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_7_m',
      name: 'Destino Cósmico: Número 7',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 7 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 7',
      effects: {
        rouletteTarget: 'num-7',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_8_m',
      name: 'Destino Cósmico: Número 8',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 8 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 8',
      effects: {
        rouletteTarget: 'num-8',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_9_m',
      name: 'Destino Cósmico: Número 9',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 9 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 9',
      effects: {
        rouletteTarget: 'num-9',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_10_m',
      name: 'Destino Cósmico: Número 10',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 10 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 10',
      effects: {
        rouletteTarget: 'num-10',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_11_m',
      name: 'Destino Cósmico: Número 11',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 11 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 11',
      effects: {
        rouletteTarget: 'num-11',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_12_m',
      name: 'Destino Cósmico: Número 12',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 12 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 12',
      effects: {
        rouletteTarget: 'num-12',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_13_m',
      name: 'Destino Cósmico: Número 13',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 13 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 13',
      effects: {
        rouletteTarget: 'num-13',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_14_m',
      name: 'Destino Cósmico: Número 14',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 14 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 14',
      effects: {
        rouletteTarget: 'num-14',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_15_m',
      name: 'Destino Cósmico: Número 15',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 15 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 15',
      effects: {
        rouletteTarget: 'num-15',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_16_m',
      name: 'Destino Cósmico: Número 16',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 16 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 16',
      effects: {
        rouletteTarget: 'num-16',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_17_m',
      name: 'Destino Cósmico: Número 17',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 17 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 17',
      effects: {
        rouletteTarget: 'num-17',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_18_m',
      name: 'Destino Cósmico: Número 18',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 18 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 18',
      effects: {
        rouletteTarget: 'num-18',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_19_m',
      name: 'Destino Cósmico: Número 19',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 19 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 19',
      effects: {
        rouletteTarget: 'num-19',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_20_m',
      name: 'Destino Cósmico: Número 20',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 20 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 20',
      effects: {
        rouletteTarget: 'num-20',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_21_m',
      name: 'Destino Cósmico: Número 21',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 21 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 21',
      effects: {
        rouletteTarget: 'num-21',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_22_m',
      name: 'Destino Cósmico: Número 22',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 22 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 22',
      effects: {
        rouletteTarget: 'num-22',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_23_m',
      name: 'Destino Cósmico: Número 23',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 23 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 23',
      effects: {
        rouletteTarget: 'num-23',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_24_m',
      name: 'Destino Cósmico: Número 24',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 24 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 24',
      effects: {
        rouletteTarget: 'num-24',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_25_m',
      name: 'Destino Cósmico: Número 25',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 25 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 25',
      effects: {
        rouletteTarget: 'num-25',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_26_m',
      name: 'Destino Cósmico: Número 26',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 26 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 26',
      effects: {
        rouletteTarget: 'num-26',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_27_m',
      name: 'Destino Cósmico: Número 27',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 27 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 27',
      effects: {
        rouletteTarget: 'num-27',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_28_m',
      name: 'Destino Cósmico: Número 28',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 28 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 28',
      effects: {
        rouletteTarget: 'num-28',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_29_m',
      name: 'Destino Cósmico: Número 29',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 29 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 29',
      effects: {
        rouletteTarget: 'num-29',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_30_m',
      name: 'Destino Cósmico: Número 30',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 30 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 30',
      effects: {
        rouletteTarget: 'num-30',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_31_m',
      name: 'Destino Cósmico: Número 31',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 31 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 31',
      effects: {
        rouletteTarget: 'num-31',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_32_m',
      name: 'Destino Cósmico: Número 32',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 32 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 32',
      effects: {
        rouletteTarget: 'num-32',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_33_m',
      name: 'Destino Cósmico: Número 33',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 33 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 33',
      effects: {
        rouletteTarget: 'num-33',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_34_m',
      name: 'Destino Cósmico: Número 34',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 34 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 34',
      effects: {
        rouletteTarget: 'num-34',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_35_m',
      name: 'Destino Cósmico: Número 35',
      icon: '⚫',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 35 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 35',
      effects: {
        rouletteTarget: 'num-35',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_num_36_m',
      name: 'Destino Cósmico: Número 36',
      icon: '🔴',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de el Número 36 en la Ruleta.',
      stats: '+35.0% Prob. Base Número 36',
      effects: {
        rouletteTarget: 'num-36',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_tercio_1_m',
      name: 'Destino Cósmico: Primer Tercio (1-12)',
      icon: '1️⃣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números del 1 al 12 en la Ruleta.',
      stats: '+35.0% Prob. Base Primer Tercio (1-12)',
      effects: {
        rouletteTarget: 'dozen1',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_tercio_2_m',
      name: 'Destino Cósmico: Segundo Tercio (13-24)',
      icon: '2️⃣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números del 13 al 24 en la Ruleta.',
      stats: '+35.0% Prob. Base Segundo Tercio (13-24)',
      effects: {
        rouletteTarget: 'dozen2',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_tercio_3_m',
      name: 'Destino Cósmico: Tercer Tercio (25-36)',
      icon: '3️⃣',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números del 25 al 36 en la Ruleta.',
      stats: '+35.0% Prob. Base Tercer Tercio (25-36)',
      effects: {
        rouletteTarget: 'dozen3',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_color_rojo_m',
      name: 'Destino Cósmico: Rojo',
      icon: '🟥',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números Rojos en la Ruleta.',
      stats: '+35.0% Prob. Base Rojo',
      effects: {
        rouletteTarget: 'red',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_color_negro_m',
      name: 'Destino Cósmico: Negro',
      icon: '⬛',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números Negros en la Ruleta.',
      stats: '+35.0% Prob. Base Negro',
      effects: {
        rouletteTarget: 'black',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_rango_bajos_m',
      name: 'Destino Cósmico: Falta (1-18)',
      icon: '🔻',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números Bajos (1 al 18) en la Ruleta.',
      stats: '+35.0% Prob. Base Falta (1-18)',
      effects: {
        rouletteTarget: 'low',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_rango_altos_m',
      name: 'Destino Cósmico: Pasa (19-36)',
      icon: '🔺',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números Altos (19 al 36) en la Ruleta.',
      stats: '+35.0% Prob. Base Pasa (19-36)',
      effects: {
        rouletteTarget: 'high',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_paridad_par_m',
      name: 'Destino Cósmico: Pares',
      icon: '⚖️',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números Pares en la Ruleta.',
      stats: '+35.0% Prob. Base Pares',
      effects: {
        rouletteTarget: 'even',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_target_paridad_impar_m',
      name: 'Destino Cósmico: Impares',
      icon: '⚡',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Aumenta un +35.0% la probabilidad base de los números Impares en la Ruleta.',
      stats: '+35.0% Prob. Base Impares',
      effects: {
        rouletteTarget: 'odd',
        rouletteWeightBonus: 0.35
      }
    },
    {
      id: 'perk_ruleta_sinergia_mesa_m',
      name: 'Nexo de Mesa: Ruleta',
      icon: '👥',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Otorga un +7.5% más de suerte en la Ruleta por cada jugador adicional sentado a la mesa contigo.',
      stats: '+7.5% Suerte / Jugador en Mesa',
      effects: {
        roulettePerPlayerBonus: 0.075
      }
    },
    {
      id: 'perk_poker_mano_debil_m',
      name: 'Deidad del Descaro: Escalera a Carta Alta',
      icon: '🎭',
      rarity: 'mitico',
      tier: 'MÍTICO',
      description: 'Multiplica el bote ganado en Póker si vences con una mano débil: x1.30 con Escalera, x1.60 con Trío, x1.90 con Doble Pareja, x2.20 con Pareja y hasta x2.50 con Carta Alta.',
      stats: 'x1.30 Escalera / x1.60 Trío / x1.90 Doble Par / x2.20 Par / x2.50 Carta Alta',
      effects: {
        pokerUnderdogMultipliers: {
          5: 1.30,
          4: 1.60,
          3: 1.90,
          2: 2.20,
          1: 2.50
        }
      }
    }
  ]
};
var PERKS_CATALOG = window.PERKS_CATALOG;



// ============================================================
// ROULETTE WEIGHTED PROBABILITY ENGINE & PERK STACKING
// ============================================================
const ROULETTE_RED_NUMS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const ROULETTE_BLACK_NUMS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

function getRouletteTargetNumbers(targetKey) {
  if (!targetKey) return [];
  if (targetKey.startsWith('num-')) {
    const n = parseInt(targetKey.replace('num-', ''), 10);
    return isNaN(n) ? [] : [n];
  }
  if (targetKey === 'dozen1') return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (targetKey === 'dozen2') return [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  if (targetKey === 'dozen3') return [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  if (targetKey === 'red') return ROULETTE_RED_NUMS;
  if (targetKey === 'black') return ROULETTE_BLACK_NUMS;
  if (targetKey === 'low') return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  if (targetKey === 'high') return [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  if (targetKey === 'even') return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
  if (targetKey === 'odd') return [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
  return [];
}

function calculateRouletteWeights(perksList, activeBetKeys) {
  const weights = {};
  for (let n = 0; n <= 36; n++) {
    weights[n] = 1.0;
  }
  if (!Array.isArray(perksList)) return weights;

  perksList.forEach(perk => {
    if (!perk || !perk.effects) return;

    // 1. Direct target/sector bonus
    const target = perk.effects.rouletteTarget;
    const bonus = perk.effects.rouletteWeightBonus;
    if (target && typeof bonus === 'number' && bonus > 0) {
      const affected = getRouletteTargetNumbers(target);
      affected.forEach(num => {
        if (weights[num] !== undefined) {
          weights[num] += bonus;
        }
      });
    }

    // 2. Multiplayer synergy bonus per sitting companion
    if (typeof perk.effects.roulettePerPlayerBonus === 'number' && perk.effects.roulettePerPlayerBonus > 0) {
      let otherCount = 0;
      if (typeof rouletteServerState !== 'undefined' && rouletteServerState) {
        const totalP = typeof rouletteServerState.totalPlayers === 'number'
          ? rouletteServerState.totalPlayers
          : (rouletteServerState.players ? Object.keys(rouletteServerState.players).length : 0);
        otherCount = Math.max(0, totalP - 1);
      }
      if (otherCount > 0) {
        const extraWeight = otherCount * perk.effects.roulettePerPlayerBonus;
        // Boost candidate bet numbers or all numbers if bets provided
        if (Array.isArray(activeBetKeys) && activeBetKeys.length > 0) {
          activeBetKeys.forEach(k => {
            const affected = getRouletteTargetNumbers(k);
            affected.forEach(num => {
              if (weights[num] !== undefined) {
                weights[num] += extraWeight;
              }
            });
          });
        } else {
          for (let n = 0; n <= 36; n++) {
            weights[n] += (extraWeight / 2);
          }
        }
      }
    }
  });

  return weights;
}

function pickWeightedRouletteNumber(weights) {
  let totalWeight = 0;
  for (let n = 0; n <= 36; n++) {
    totalWeight += (weights && typeof weights[n] === 'number') ? weights[n] : 1.0;
  }
  let rnd = Math.random() * totalWeight;
  for (let n = 0; n <= 36; n++) {
    const w = (weights && typeof weights[n] === 'number') ? weights[n] : 1.0;
    if (rnd < w) return n;
    rnd -= w;
  }
  return Math.floor(Math.random() * 37);
}

window.getRouletteTargetNumbers = getRouletteTargetNumbers;
window.calculateRouletteWeights = calculateRouletteWeights;
window.pickWeightedRouletteNumber = pickWeightedRouletteNumber;
