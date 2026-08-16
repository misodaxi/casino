
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const context = {
  window: {},
  document: {
    getElementById: () => ({ appendChild: () => {}, getContext: () => ({ fillRect: () => {}, clearRect: () => {} }) }),
    createElement: () => ({ width: 0, height: 0, getContext: () => ({ fillRect: () => {}, clearRect: () => {} }), style: {} }),
    body: { appendChild: () => {} }
  },
  navigator: { userAgent: 'Chrome' },
  performance: { now: () => Date.now() },
  console: console,
  THREE: {
    Scene: function() { this.add = () => {}; this.traverse = () => {}; },
    PerspectiveCamera: function() { this.position = { set: () => {}, x:0, y:0, z:0 }; },
    WebGLRenderer: function() { this.setSize = () => {}; this.setPixelRatio = () => {}; this.domElement = {}; this.shadowMap = {}; },
    CSS3DRenderer: function() { this.setSize = () => {}; this.domElement = { style: {} }; },
    Group: function() { this.add = () => {}; this.position = { set: () => {} }; },
    Mesh: function() { this.position = { set: () => {} }; this.rotation = { set: () => {} }; },
    CylinderGeometry: function() {},
    SphereGeometry: function() {},
    TorusGeometry: function() {},
    MeshStandardMaterial: function() {},
    MeshBasicMaterial: function() {},
    CanvasTexture: function() {},
    SpriteMaterial: function() {},
    Sprite: function() { this.scale = { set: () => {} }; this.position = { set: () => {} }; }
  }
};
context.window = context;
vm.createContext(context);

const scripts = [
  'js/config.js',
  'js/audio.js',
  'js/state.js',
  'js/render.js',
  'js/player.js',
  'js/network.js',
  'js/ui.js',
  'js/tv.js',
  'js/jukebox.js',
  'js/games/slots.js',
  'js/games/roulette.js',
  'js/games/dice.js',
  'js/games/blackjack.js',
  'js/games/mines.js',
  'js/games/plinko.js',
  'js/games/fortuneWheel.js',
  'js/games/coin.js',
  'js/main.js'
];

for (const s of scripts) {
  try {
    const filePath = path.join(__dirname, s);
    const code = fs.readFileSync(filePath, 'utf8');
    vm.runInContext(code, context);
    console.log('SUCCESS:', s);
  } catch(e) {
    console.log('ERROR in ' + s + ':', e.message);
  }
}
