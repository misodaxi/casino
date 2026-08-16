// ============================================================
// MIDNIGHT CASINO SERVER CONFIGURATION & CONSTANTS
// ============================================================

const CASINO_SPATIAL_ZONES = [
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

// European Roulette Wheel Sequence Order
const WHEEL_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

// Global Jukebox (Gramola) Synchronized State for Whole-Casino Music
const defaultJukeboxPlaylist = [
  {
    id: 'track-1',
    title: 'Fly Me to the Moon',
    artist: 'Frank Sinatra',
    source: 'youtube',
    videoId: 'ZEcqHA7dbwM',
    url: 'https://www.youtube.com/watch?v=ZEcqHA7dbwM',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
    duration: 147
  },
  {
    id: 'track-2',
    title: 'Johnny B. Goode',
    artist: 'Chuck Berry',
    source: 'youtube',
    videoId: 'T38v3-SSGcM',
    url: 'https://www.youtube.com/watch?v=T38v3-SSGcM',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150',
    duration: 161
  },
  {
    id: 'track-3',
    title: 'Take Five',
    artist: 'Dave Brubeck Quartet',
    source: 'youtube',
    videoId: 'vmDDOFXSgAs',
    url: 'https://www.youtube.com/watch?v=vmDDOFXSgAs',
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150',
    duration: 324
  },
  {
    id: 'track-4',
    title: 'Can\'t Help Falling in Love',
    artist: 'Elvis Presley',
    source: 'youtube',
    videoId: 'vGJTaP6anOU',
    url: 'https://www.youtube.com/watch?v=vGJTaP6anOU',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
    duration: 182
  },
  {
    id: 'track-5',
    title: 'Get Lucky',
    artist: 'Daft Punk ft. Pharrell Williams',
    source: 'youtube',
    videoId: '5NV6Rdv1a3I',
    url: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150',
    duration: 248
  },
  {
    id: 'track-6',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    source: 'youtube',
    videoId: 'Zi_XLOBDo_Y',
    url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
    duration: 294
  },
  {
    id: 'track-7',
    title: 'Autumn Leaves',
    artist: 'Miles Davis & Cannonball Adderley',
    source: 'youtube',
    videoId: 'u37RF5xKNq8',
    url: 'https://www.youtube.com/watch?v=u37RF5xKNq8',
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150',
    duration: 659
  }
];

module.exports = {
  CASINO_SPATIAL_ZONES,
  WHEEL_ORDER,
  defaultJukeboxPlaylist
};
