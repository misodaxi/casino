
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const sandbox = {
  window: {},
  document: {
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: (id) => ({
      id: id,
      addEventListener: () => {},
      removeEventListener: () => {},
      appendChild: () => {},
      removeChild: () => {},
      style: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      getContext: () => ({
        fillRect: () => {}, clearRect: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {},
        stroke: () => {}, fill: () => {}, arc: () => {}, closePath: () => {}, save: () => {}, restore: () => {},
        translate: () => {}, rotate: () => {}, scale: () => {}, measureText: () => ({ width: 50 }),
        drawImage: () => {}, createRadialGradient: () => ({ addColorStop: () => {} }),
        createLinearGradient: () => ({ addColorStop: () => {} }), fillText: () => {}, strokeText: () => {},
        rect: () => {}, roundRect: () => {}
      })
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => ({
      tagName: tag,
      width: 512,
      height: 512,
      style: {},
      dataset: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      addEventListener: () => {},
      getContext: () => ({
        fillRect: () => {}, clearRect: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {},
        stroke: () => {}, fill: () => {}, arc: () => {}, closePath: () => {}, save: () => {}, restore: () => {},
        translate: () => {}, rotate: () => {}, scale: () => {}, measureText: () => ({ width: 50 }),
        drawImage: () => {}, createRadialGradient: () => ({ addColorStop: () => {} }),
        createLinearGradient: () => ({ addColorStop: () => {} }), fillText: () => {}, strokeText: () => {},
        rect: () => {}, roundRect: () => {}
      })
    }),
    body: { appendChild: () => {}, style: {} },
    documentElement: { requestFullscreen: () => {} },
    exitFullscreen: () => {}
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  performance: { now: () => Date.now() },
  console: console,
  THREE: {
    Scene: function() {
      this.children = [];
      this.add = (...objs) => { this.children.push(...objs); };
      this.remove = (obj) => {};
      this.traverse = (cb) => { this.children.forEach(cb); };
    },
    FogExp2: function() {},
    PerspectiveCamera: function() {
      this.position = {
        set: () => {}, copy: () => {}, clone: () => ({ clone: () => {} }), lerp: () => {}, x:0, y:0, z:0
      };
      this.lookAt = () => {};
      this.updateProjectionMatrix = () => {};
    },
    WebGLRenderer: function() {
      this.setSize = () => {};
      this.setPixelRatio = () => {};
      this.getPixelRatio = () => 1;
      this.domElement = {};
      this.shadowMap = {};
      this.info = { render: { calls: 0, triangles: 0 } };
      this.render = () => {};
    },
    CSS3DRenderer: function() {
      this.setSize = () => {};
      this.domElement = { style: {} };
      this.render = () => {};
    },
    CSS3DObject: function() {
      this.position = { set: () => {} };
      this.rotation = { set: () => {} };
      this.scale = { set: () => {} };
    },
    Group: function() {
      this.children = [];
      this.add = (...objs) => { this.children.push(...objs); };
      this.remove = () => {};
      this.position = { set: () => {}, x:0, y:0, z:0 };
      this.rotation = { set: () => {}, x:0, y:0, z:0 };
      this.scale = { set: () => {} };
      this.traverse = (cb) => { this.children.forEach(cb); };
      this.userData = {};
    },
    Mesh: function() {
      this.children = [];
      this.add = (...objs) => { this.children.push(...objs); };
      this.remove = () => {};
      this.position = { set: () => {}, x:0, y:0, z:0 };
      this.rotation = { set: () => {}, x:0, y:0, z:0 };
      this.scale = { set: () => {} };
      this.traverse = (cb) => { this.children.forEach(cb); };
      this.userData = {};
    },
    BoxGeometry: function() {},
    CylinderGeometry: function() {},
    SphereGeometry: function() {},
    TorusGeometry: function() {},
    PlaneGeometry: function() {},
    RingGeometry: function() {},
    ConeGeometry: function() {},
    OctahedronGeometry: function() {},
    BufferGeometry: function() { this.setAttribute = () => {}; },
    MeshStandardMaterial: function() { this.dispose = () => {}; },
    MeshBasicMaterial: function() { this.dispose = () => {}; },
    MeshPhongMaterial: function() { this.dispose = () => {}; },
    MeshLambertMaterial: function() { this.dispose = () => {}; },
    CanvasTexture: function() {
      this.dispose = () => {};
      this.needsUpdate = true;
      this.repeat = { set: () => {} };
    },
    SpriteMaterial: function() { this.dispose = () => {}; },
    Sprite: function() { this.scale = { set: () => {} }; this.position = { set: () => {} }; this.userData = {}; },
    AmbientLight: function() {},
    DirectionalLight: function() { this.position = { set: () => {} }; this.target = { position: { set: () => {} } }; this.shadow = { mapSize: {}, camera: {} }; },
    PointLight: function() { this.position = { set: () => {} }; },
    SpotLight: function() { this.position = { set: () => {} }; this.target = { position: { set: () => {} } }; },
    Vector2: function(x=0,y=0) { this.x=x; this.y=y; },
    Vector3: function(x=0,y=0,z=0) { this.x=x; this.y=y; this.z=z; this.set = (a,b,c)=>{this.x=a;this.y=b;this.z=c;}; this.subVectors = () => this; this.length = () => 0; this.clone = () => new sandbox.THREE.Vector3(this.x,this.y,this.z); this.lerp = () => {}; this.copy = () => {}; },
    Quaternion: function() { this.setFromAxisAngle = () => this; },
    Raycaster: function() { this.setFromCamera = () => {}; this.intersectObjects = () => []; },
    RepeatWrapping: 1000,
    LinearFilter: 1006,
    DoubleSide: 2,
    FrontSide: 0,
    BackSide: 1,
    PCFSoftShadowMap: 2
  },
  io: () => ({
    on: () => {},
    emit: () => {},
    connected: false
  }),
  setInterval: () => {},
  setTimeout: (fn) => {},
  requestAnimationFrame: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  Math: Math,
  Date: Date,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  isFinite: isFinite,
  String: String,
  Number: Number,
  Array: Array,
  Object: Object,
  JSON: JSON
};
sandbox.window = sandbox;

vm.createContext(sandbox);

// Clean up trailing export checks in roulette, dice, coin
for (const gf of ['roulette.js', 'dice.js', 'coin.js']) {
  const p = path.join('c:/Users/Usuario/Desktop/casinow/js/games', gf);
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(/if\s*\(typeof\s+(roulette3DRefs|dice3DRefs|coin3DRefs)\s*!==\s*'undefined'\)[^
]+
/g, '');
  fs.writeFileSync(p, txt, 'utf8');
}

const scripts = [
  'js/config.js',
  'js/audio.js',
  'js/state.js',
  'js/games/slots.js',
  'js/render.js',
  'js/player.js',
  'js/network.js',
  'js/ui.js',
  'js/tv.js',
  'js/jukebox.js',
  'js/games/roulette.js',
  'js/games/dice.js',
  'js/games/blackjack.js',
  'js/games/mines.js',
  'js/games/plinko.js',
  'js/games/fortuneWheel.js',
  'js/games/coin.js',
  'js/main.js'
];

let allPassed = true;
for (const s of scripts) {
  try {
    const filePath = path.join(__dirname, s);
    const scriptCode = fs.readFileSync(filePath, 'utf8');
    vm.runInContext(scriptCode, sandbox);
    console.log('✓ PASS:', s);
  } catch(e) {
    allPassed = false;
    console.log('✗ FAIL in ' + s + ':', e.stack || e.message);
  }
}

if (allPassed) {
  console.log('\n========================================');
  console.log('ALL SCRIPTS LOADED AND EXECUTED WITH 100% SUCCESS!');
  console.log('Total 3D objects added to scene:', sandbox.scene ? sandbox.scene.children.length : 0);
  console.log('Total slot machines registered:', sandbox.slotMachinesByZone ? (sandbox.slotMachinesByZone.slots.length + sandbox.slotMachinesByZone.pachinko.length + sandbox.slotMachinesByZone.tragaperras.length) : 0);
  console.log('========================================');
}
