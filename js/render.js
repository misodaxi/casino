/* ============================================================
         THREE.JS SCENE & 3D CASINO WORLD
      ============================================================ */
      var host = document.getElementById('canvas-host');
      var scene = new THREE.Scene();
      var cssScene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x080410, 0.005);

      var camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);
      var camDist = 17;

      var renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      
      /* ============================================================
         ADAPTIVE PERFORMANCE & PIXEL RATIO QUALITY ENGINE
      ============================================================ */
      var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      var QualityTiers = window.QualityTiers || {
        LOW: { name: 'LOW', pixelRatio: 1.0, shadowMap: false, maxParticles: 20, slotRes: 256, shadowMapSize: 512 },
        MEDIUM: { name: 'MEDIUM', pixelRatio: 1.15, shadowMap: true, maxParticles: 40, slotRes: 384, shadowMapSize: 512 },
        HIGH: { name: 'HIGH', pixelRatio: 1.35, shadowMap: true, maxParticles: 75, slotRes: 512, shadowMapSize: 1024 },
        ULTRA: { name: 'ULTRA', pixelRatio: Math.min(window.devicePixelRatio || 1.5, 1.75), shadowMap: true, maxParticles: 130, slotRes: 512, shadowMapSize: 1024 }
      };

      var currentQuality = isMobileDevice ? QualityTiers.MEDIUM : QualityTiers.HIGH;
      window.currentQuality = currentQuality;

      function applyQualityTier(tier) {
        if (!tier) return;
        currentQuality = tier;
        window.currentQuality = tier;
        renderer.setPixelRatio(tier.pixelRatio);
        renderer.shadowMap.enabled = tier.shadowMap;
        if (tier.shadowMap) {
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          if (typeof moonLight !== 'undefined' && moonLight) {
            moonLight.castShadow = true;
            moonLight.shadow.mapSize.width = tier.shadowMapSize || 512;
            moonLight.shadow.mapSize.height = tier.shadowMapSize || 512;
          }
        } else if (typeof moonLight !== 'undefined' && moonLight) {
          moonLight.castShadow = false;
        }
        const badgeEl = document.getElementById('debugQualityBadge');
        if (badgeEl) {
          badgeEl.textContent = tier.name;
          badgeEl.className = 'badge ' + (tier.name === 'ULTRA' ? 'badge-excellent' : (tier.name === 'HIGH' ? 'badge-good' : (tier.name === 'MEDIUM' ? 'badge-fair' : 'badge-poor')));
        }
      }
      window.applyQualityTier = applyQualityTier;

      applyQualityTier(currentQuality);
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (renderer.domElement && renderer.domElement.style) {
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '0';
      }
      host.appendChild(renderer.domElement);

      // Official Three.js CSS3DRenderer Engine (Capa interactiva sobre el mundo 3D)
      var cssRenderer = new THREE.CSS3DRenderer();
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      if (cssRenderer.domElement && cssRenderer.domElement.style) {
        cssRenderer.domElement.id = 'css3dHost';
        cssRenderer.domElement.style.position = 'absolute';
        cssRenderer.domElement.style.top = '0';
        cssRenderer.domElement.style.left = '0';
        cssRenderer.domElement.style.zIndex = '50';
        cssRenderer.domElement.style.pointerEvents = 'none';
      }
      host.appendChild(cssRenderer.domElement);

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
      });

      /* lights */
      scene.add(new THREE.AmbientLight(0x3e3260, 1.2));
      var moonLight = new THREE.DirectionalLight(0x9b8cff, 0.6);
      moonLight.position.set(-20, 30, -10);
      scene.add(moonLight);

      /* floor grid */
      function makeFloorTexture() {
        const c = document.createElement('canvas'); c.width = 512; c.height = 512;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#0f081d'; ctx.fillRect(0, 0, 512, 512);
        // Diamond luxury casino pattern
        ctx.strokeStyle = 'rgba(139,92,246,0.14)'; ctx.lineWidth = 2;
        for (let i = 0; i <= 512; i += 64) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(225,31,209,0.08)';
        for (let i = -512; i <= 512; i += 64) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 512, 512); ctx.stroke();
        }
        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(30, 26);
        return tex;
      }
      const floorGeo = new THREE.PlaneGeometry(160, 160);
      const floorMat = new THREE.MeshStandardMaterial({ map: makeFloorTexture(), roughness: 0.8, metalness: 0.1 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(0, 0, -20);
      floor.receiveShadow = true;
      scene.add(floor);

      /* ============================================================
         3D CASINO ASSET CONSTRUCTORS (AUTHENTIC TO BLUEPRINT)
      ============================================================ */

      // 1. Art-Deco Brass Lamp Post with Warm Glowing Globe (Shared Geometry & Material Pool)
      const LAMP_FOOT_GEO = new THREE.CylinderGeometry(0.22, 0.28, 0.15, 16);
      const LAMP_POLE_GEO = new THREE.CylinderGeometry(0.045, 0.07, 3.2, 16);
      const LAMP_CROWN_GEO = new THREE.CylinderGeometry(0.18, 0.12, 0.2, 16);
      const LAMP_GLOBE_GEO = new THREE.SphereGeometry(0.22, 16, 16);
      const LAMP_GOLD_MAT = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
      const LAMP_GLOBE_MAT = new THREE.MeshStandardMaterial({
        color: 0xfff3d6,
        emissive: 0xffd180,
        emissiveIntensity: 2.2,
        roughness: 0.2
      });

      function createGoldenLampPost() {
        const g = new THREE.Group();
        const foot = new THREE.Mesh(LAMP_FOOT_GEO, LAMP_GOLD_MAT);
        foot.position.y = 0.075;
        const pole = new THREE.Mesh(LAMP_POLE_GEO, LAMP_GOLD_MAT);
        pole.position.y = 1.65;
        const crown = new THREE.Mesh(LAMP_CROWN_GEO, LAMP_GOLD_MAT);
        crown.position.y = 3.25;

        const globe = new THREE.Mesh(LAMP_GLOBE_GEO, LAMP_GLOBE_MAT);
        globe.position.y = 3.45;

        const pLight = new THREE.PointLight(0xffd180, 1.2, 7.5);
        pLight.position.y = 3.45;

        g.add(foot, pole, crown, globe, pLight);
        return g;
      }

      // 2. Potted Palm Tree in Hexagonal Brass Planter (Shared Geometry & Material Pool)
      const PALM_POT_GEO = new THREE.CylinderGeometry(0.44, 0.34, 0.70, 6);
      const PALM_SOIL_GEO = new THREE.CylinderGeometry(0.42, 0.42, 0.05, 16);
      const PALM_TRUNK_GEO = new THREE.CylinderGeometry(0.09, 0.14, 2.4, 12);
      const PALM_FROND_GEO = new THREE.PlaneGeometry(0.55, 1.6);
      const PALM_POT_MAT = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.18 });
      const PALM_SOIL_MAT = new THREE.MeshStandardMaterial({ color: 0x1f1610, roughness: 0.9 });
      const PALM_TRUNK_MAT = new THREE.MeshStandardMaterial({ color: 0x3e2415, roughness: 0.8 });
      const PALM_LEAF_MAT = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5, side: THREE.DoubleSide });

      function createCasinoPalmTree() {
        const g = new THREE.Group();
        const pot = new THREE.Mesh(PALM_POT_GEO, PALM_POT_MAT);
        pot.position.y = 0.35;
        const soil = new THREE.Mesh(PALM_SOIL_GEO, PALM_SOIL_MAT);
        soil.position.y = 0.68;
        g.add(pot, soil);

        const trunk = new THREE.Mesh(PALM_TRUNK_GEO, PALM_TRUNK_MAT);
        trunk.position.y = 1.8;
        g.add(trunk);

        for (let f = 0; f < 8; f++) {
          const ang = (f / 8) * Math.PI * 2;
          const frond = new THREE.Mesh(PALM_FROND_GEO, PALM_LEAF_MAT);
          frond.position.set(Math.sin(ang) * 0.55, 2.8, Math.cos(ang) * 0.55);
          frond.rotation.set(-0.65, ang, 0);
          g.add(frond);
        }
        return g;
      }

      // 3. VIP Round Cocktail Table with Velvet Club Armchairs (Shared Asset Pool)
      const VIP_TABLE_BASE_GEO = new THREE.CylinderGeometry(0.32, 0.38, 0.08, 20);
      const VIP_TABLE_STEM_GEO = new THREE.CylinderGeometry(0.06, 0.08, 0.72, 16);
      const VIP_TABLE_TOP_GEO = new THREE.CylinderGeometry(0.68, 0.68, 0.06, 24);
      const VIP_TABLE_RIM_GEO = new THREE.TorusGeometry(0.69, 0.02, 12, 32);
      const VIP_TABLE_CANDLE_GEO = new THREE.CylinderGeometry(0.06, 0.06, 0.14, 12);
      const VIP_CHAIR_SEAT_GEO = new THREE.CylinderGeometry(0.34, 0.32, 0.22, 16);
      const VIP_CHAIR_BACK_GEO = new THREE.CylinderGeometry(0.36, 0.36, 0.48, 16, 1, false, -Math.PI * 0.45, Math.PI * 0.9);
      const VIP_CHAIR_LEG_GEO = new THREE.CylinderGeometry(0.02, 0.02, 0.26, 8);

      const VIP_GOLD_MAT = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
      const VIP_TABLE_TOP_MAT = new THREE.MeshStandardMaterial({ color: 0x0c0717, roughness: 0.2, metalness: 0.3 });
      const VIP_CANDLE_MAT = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 1.8 });
      const VIP_CUSHION_MAT = new THREE.MeshStandardMaterial({ color: 0x140b24, roughness: 0.4 });

      const _vipChairMatCache = {};
      function getVipChairMaterial(chairColorHex) {
        if (!_vipChairMatCache[chairColorHex]) {
          _vipChairMatCache[chairColorHex] = new THREE.MeshStandardMaterial({ color: chairColorHex, roughness: 0.5 });
        }
        return _vipChairMatCache[chairColorHex];
      }

      function createVipCocktailTable(chairCount = 4, chairColorHex = 0x221338) {
        const g = new THREE.Group();

        // Table Base & Top
        const base = new THREE.Mesh(VIP_TABLE_BASE_GEO, VIP_GOLD_MAT);
        base.position.y = 0.04;
        const stem = new THREE.Mesh(VIP_TABLE_STEM_GEO, VIP_GOLD_MAT);
        stem.position.y = 0.40;
        const top = new THREE.Mesh(VIP_TABLE_TOP_GEO, VIP_TABLE_TOP_MAT);
        top.position.y = 0.75;
        const rim = new THREE.Mesh(VIP_TABLE_RIM_GEO, VIP_GOLD_MAT);
        rim.rotation.x = Math.PI / 2; rim.position.y = 0.75;

        // Glowing center cocktail / candle
        const candle = new THREE.Mesh(VIP_TABLE_CANDLE_GEO, VIP_CANDLE_MAT);
        candle.position.y = 0.84;

        g.add(base, stem, top, rim, candle);

        // Radial Club Armchairs
        const chairMat = getVipChairMaterial(chairColorHex);

        for (let i = 0; i < chairCount; i++) {
          const ang = (i / chairCount) * Math.PI * 2;
          const cx = Math.sin(ang) * 1.25;
          const cz = Math.cos(ang) * 1.25;

          const chairGrp = new THREE.Group();
          chairGrp.position.set(cx, 0, cz);
          chairGrp.rotation.y = ang + Math.PI; // Face towards the center table

          // Seat cushion
          const seat = new THREE.Mesh(VIP_CHAIR_SEAT_GEO, VIP_CUSHION_MAT);
          seat.position.y = 0.36;
          // Curved tub backrest
          const back = new THREE.Mesh(VIP_CHAIR_BACK_GEO, chairMat);
          back.position.y = 0.58;
          // Gold legs
          [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(([lx, lz]) => {
            const leg = new THREE.Mesh(VIP_CHAIR_LEG_GEO, VIP_GOLD_MAT);
            leg.position.set(lx, 0.13, lz);
            chairGrp.add(leg);
          });

          chairGrp.add(seat, back);
          g.add(chairGrp);
        }
        return g;
      }

      // 4. Luxury Tufted Leather L-Sectional Sofa Lounge
      function createSectionalSofaLounge(w = 4.2, d = 3.6, rotY = 0) {
        const g = new THREE.Group();
        g.rotation.y = rotY;
        const leatherMat = new THREE.MeshStandardMaterial({ color: 0x120c1f, roughness: 0.35, metalness: 0.1 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });

        // Long Sofa Segment
        const longSofa = new THREE.Mesh(new THREE.BoxGeometry(w, 0.42, 1.1), leatherMat);
        longSofa.position.set(0, 0.32, 0);
        const longBack = new THREE.Mesh(new THREE.BoxGeometry(w, 0.65, 0.32), leatherMat);
        longBack.position.set(0, 0.68, 0.42);

        // Short L-Wing Segment
        const wingSofa = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.42, d), leatherMat);
        wingSofa.position.set(-w / 2 + 0.55, 0.32, -d / 2 + 0.55);
        const wingBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.65, d), leatherMat);
        wingBack.position.set(-w / 2 + 0.16, 0.68, -d / 2 + 0.55);

        // Low Coffee Table in Center
        const tableBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.32, 1.0),
          new THREE.MeshStandardMaterial({ color: 0x090512, metalness: 0.8, roughness: 0.2 }));
        tableBase.position.set(0.4, 0.22, -0.9);
        const tableGlass = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.04, 1.1),
          new THREE.MeshStandardMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.45, roughness: 0.1 }));
        tableGlass.position.set(0.4, 0.38, -0.9);

        // Champagne Bucket on table
        const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.10, 0.22, 16), goldMat);
        bucket.position.set(0.4, 0.50, -0.9);
        const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.25, 12),
          new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2 }));
        bottle.position.set(0.4, 0.60, -0.9);
        bottle.rotation.z = 0.2;

        g.add(longSofa, longBack, wingSofa, wingBack, tableBase, tableGlass, bucket, bottle);
        return g;
      }

      function createRoundedRectShape(w, d, r) {
        const shape = new THREE.Shape();
        const x = -w / 2;
        const y = -d / 2;
        const cornerR = Math.min(r, w / 2, d / 2);

        shape.moveTo(x + cornerR, y);
        shape.lineTo(x + w - cornerR, y);
        shape.quadraticCurveTo(x + w, y, x + w, y + cornerR);
        shape.lineTo(x + w, y + d - cornerR);
        shape.quadraticCurveTo(x + w, y + d, x + w - cornerR, y + d);
        shape.lineTo(x + cornerR, y + d);
        shape.quadraticCurveTo(x, y + d, x, y + d - cornerR);
        shape.lineTo(x, y + cornerR);
        shape.quadraticCurveTo(x, y, x + cornerR, y);
        shape.closePath();
        return shape;
      }

      // 5. Floor Neon Outlines & Boundary Tracks (Following the Exact Square Rounded Base Geometry)
      function createFloorNeonTracks(sceneRef) {
        const neonGrp = new THREE.Group();

        function addRoundedRectNeonTrack(x, z, w, d, cornerR, colHex) {
          const borderW = 0.12;
          const outer = createRoundedRectShape(w + borderW, d + borderW, cornerR + borderW / 2);
          const inner = createRoundedRectShape(w - borderW, d - borderW, Math.max(0.1, cornerR - borderW / 2));
          outer.holes.push(inner);

          const geo = new THREE.ExtrudeGeometry(outer, {
            depth: 0.025,
            bevelEnabled: false
          });
          const mat = new THREE.MeshStandardMaterial({
            color: colHex,
            emissive: colHex,
            emissiveIntensity: 2.8,
            roughness: 0.3
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.rotation.x = Math.PI / 2;
          mesh.position.set(x, 0.03, z);
          neonGrp.add(mesh);
        }

        // Zone Ground Tracks Matching Floorplan Colors & Square Rounded Base Geometries
        addRoundedRectNeonTrack(-31.0, -49.0, 24.4, 66.4, 2.1, 0x3b82f6); // Grand 48m Bowling Hall (Blue)
        addRoundedRectNeonTrack(0, -25, 16.4, 11.2, 1.6, 0x8b5cf6);   // Cine & Music (Purple)
        addRoundedRectNeonTrack(28, -25, 14.5, 14.5, 1.8, 0xd946ef);   // TV Casino (Magenta)

        addRoundedRectNeonTrack(-31.0, -8.5, 18.4, 5.6, 1.1, 0xec4899);   // Slots Row 1 (Pink)
        addRoundedRectNeonTrack(-31.0, 1.5, 18.4, 5.6, 1.1, 0x06b6d4);    // Gachapón Row 2 (Cyan)
        addRoundedRectNeonTrack(-31.0, 11.5, 18.4, 5.6, 1.1, 0xf59e0b);   // Tragaperras Row 3 (Gold)

        addRoundedRectNeonTrack(0, -11, 10.8, 10.8, 1.7, 0xf97316);   // Roulette (Orange)
        addRoundedRectNeonTrack(0, 0, 9.4, 8.9, 1.5, 0x22c55e);       // Blackjack (Green)
        addRoundedRectNeonTrack(0, 11, 10.2, 10.2, 1.6, 0xf59e0b);    // Poker (Amber)

        addRoundedRectNeonTrack(36.5, -6.5, 11.4, 11.4, 1.6, 0xfbbf24);  // Jackpot Area (Gold)
        addRoundedRectNeonTrack(16.0, 0.0, 9.5, 9.5, 1.4, 0xec4899);      // Plinko (Pink)
        addRoundedRectNeonTrack(36.5, 5.5, 10.8, 10.8, 1.6, 0xa855f7);    // Fortune Wheel (Purple)
        addRoundedRectNeonTrack(16.0, 11.0, 9.1, 9.1, 1.3, 0x06b6d4);     // Dice Duel (Cyan)
        addRoundedRectNeonTrack(37.0, 22.5, 8.4, 8.4, 1.2, 0x8b5cf6);     // Coin Flip in Southeast Corner (Purple)

        // South Lounges (Pink Ground Perimeter Path)
        addRoundedRectNeonTrack(-18, 25.5, 16.0, 14.0, 1.8, 0xf472b6); // West Bar Lounge
        addRoundedRectNeonTrack(0, 24, 18.4, 16.4, 2.5, 0xf472b6);     // Bar Center

        sceneRef.add(neonGrp);
      }

      // 6. Bowling 3D Alley (Grand Championship 6-Lane Regulation Alley - Shared Asset Pool)
      const BOWLING_LANE_GEO = new THREE.BoxGeometry(2.2, 0.1, 48.0);
      const BOWLING_GUTTER_GEO = new THREE.BoxGeometry(0.35, 0.06, 48.0);
      const BOWLING_GUTTER_NEON_GEO = new THREE.BoxGeometry(0.06, 0.04, 48.0);
      const BOWLING_DIVIDER_GEO = new THREE.BoxGeometry(0.12, 0.22, 48.0);
      const BOWLING_PIN_BODY_GEO = new THREE.CylinderGeometry(0.07, 0.11, 0.46, 16);
      const BOWLING_PIN_HEAD_GEO = new THREE.SphereGeometry(0.08, 16, 16);
      const BOWLING_PIN_STRIPE_GEO = new THREE.CylinderGeometry(0.082, 0.082, 0.05, 16);
      const BOWLING_BALL_GEO = new THREE.SphereGeometry(0.14, 16, 16);
      const BOWLING_MONITOR_POLE_GEO = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 12);
      const BOWLING_MONITOR_BOX_GEO = new THREE.BoxGeometry(1.6, 0.9, 0.15);
      const BOWLING_HOOD_GEO = new THREE.BoxGeometry(2.9, 2.2, 1.4);
      const BOWLING_RACK_GEO = new THREE.BoxGeometry(0.40, 0.60, 4.8);

      const BOWLING_LANE_MAT = new THREE.MeshStandardMaterial({ color: 0xdfb989, roughness: 0.18, metalness: 0.12 });
      const BOWLING_GUTTER_MAT = new THREE.MeshStandardMaterial({ color: 0x0d0d14, roughness: 0.5, metalness: 0.2 });
      const BOWLING_GUTTER_NEON_MAT = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x3b82f6, emissiveIntensity: 2.2 });
      const BOWLING_DIVIDER_MAT = new THREE.MeshStandardMaterial({ color: 0x181028, metalness: 0.85, roughness: 0.25 });
      const BOWLING_PIN_MAT = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
      const BOWLING_PIN_RED_MAT = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25 });
      const BOWLING_HOOD_MAT = new THREE.MeshStandardMaterial({ color: 0x0c0718, emissive: 0x3b82f6, emissiveIntensity: 0.45, roughness: 0.3 });
      const BOWLING_MONITOR_MAT = new THREE.MeshStandardMaterial({ color: 0x0a0514, emissive: 0x3b82f6, emissiveIntensity: 0.6 });
      const BOWLING_RACK_MAT = new THREE.MeshStandardMaterial({ color: 0x202028, metalness: 0.85, roughness: 0.2 });

      const _bowlingBallMatCache = {};
      function getBowlingBallMaterial(colorHex) {
        if (!_bowlingBallMatCache[colorHex]) {
          _bowlingBallMatCache[colorHex] = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.15, metalness: 0.6 });
        }
        return _bowlingBallMatCache[colorHex];
      }

      function createBowling3DAlley() {
        const g = new THREE.Group();
        const ballCols = [0x3b82f6, 0xef4444, 0x10b981, 0x8b5cf6, 0xf59e0b, 0xec4899, 0x06b6d4, 0xf97316];

        const numLanes = 6;
        const laneSpacing = 3.0;
        const startX = -((numLanes - 1) * laneSpacing) / 2;

        for (let l = 0; l < numLanes; l++) {
          const laneX = startX + l * laneSpacing;

          // 1. Long 48m Regulation Wood Lane Bed
          const bed = new THREE.Mesh(BOWLING_LANE_GEO, BOWLING_LANE_MAT);
          bed.position.set(laneX, 0.05, -2.5);
          bed.receiveShadow = true;
          g.add(bed);

          // 2. Left & Right Gutters with Blue LED Underglow
          const gutL = new THREE.Mesh(BOWLING_GUTTER_GEO, BOWLING_GUTTER_MAT);
          gutL.position.set(laneX - 1.28, 0.03, -2.5);
          const gutR = new THREE.Mesh(BOWLING_GUTTER_GEO, BOWLING_GUTTER_MAT);
          gutR.position.set(laneX + 1.28, 0.03, -2.5);

          const gutNeonL = new THREE.Mesh(BOWLING_GUTTER_NEON_GEO, BOWLING_GUTTER_NEON_MAT);
          gutNeonL.position.set(laneX - 1.28, 0.065, -2.5);
          const gutNeonR = new THREE.Mesh(BOWLING_GUTTER_NEON_GEO, BOWLING_GUTTER_NEON_MAT);
          gutNeonR.position.set(laneX + 1.28, 0.065, -2.5);

          g.add(gutL, gutR, gutNeonL, gutNeonR);

          // 3. Lane Dividers
          const div = new THREE.Mesh(BOWLING_DIVIDER_GEO, BOWLING_DIVIDER_MAT);
          div.position.set(laneX - laneSpacing / 2, 0.11, -2.5);
          g.add(div);
          if (l === numLanes - 1) {
            const divEnd = new THREE.Mesh(BOWLING_DIVIDER_GEO, BOWLING_DIVIDER_MAT);
            divEnd.position.set(laneX + laneSpacing / 2, 0.11, -2.5);
            g.add(divEnd);
          }

          // 4. Pinsetter Pit & 10 Regulation Bowling Pins at Deep End (z = -24.5)
          const pinRows = [[0], [-0.22, 0.22], [-0.44, 0, 0.44], [-0.66, -0.22, 0.22, 0.66]];
          pinRows.forEach((rowPins, rIdx) => {
            const pinZ = -24.5 - rIdx * 0.38;
            rowPins.forEach(px => {
              const pinGrp = new THREE.Group();
              const pinBody = new THREE.Mesh(BOWLING_PIN_BODY_GEO, BOWLING_PIN_MAT);
              pinBody.position.y = 0.32;
              const pinHead = new THREE.Mesh(BOWLING_PIN_HEAD_GEO, BOWLING_PIN_MAT);
              pinHead.position.y = 0.56;
              const pinStripe = new THREE.Mesh(BOWLING_PIN_STRIPE_GEO, BOWLING_PIN_RED_MAT);
              pinStripe.position.y = 0.48;
              pinGrp.add(pinBody, pinHead, pinStripe);
              pinGrp.position.set(laneX + px, 0, pinZ);
              g.add(pinGrp);
            });
          });

          // Pinsetter Hood Box with Neon Backlit Number
          const hood = new THREE.Mesh(BOWLING_HOOD_GEO, BOWLING_HOOD_MAT);
          hood.position.set(laneX, 1.25, -26.2);
          g.add(hood);

          // Suspended Overhead Score Monitors along the Runway
          [-10.0, 6.0, 20.0].forEach(mz => {
            const monitorPole = new THREE.Mesh(BOWLING_MONITOR_POLE_GEO, BOWLING_DIVIDER_MAT);
            monitorPole.position.set(laneX, 4.2, mz);
            const monitor = new THREE.Mesh(BOWLING_MONITOR_BOX_GEO, BOWLING_MONITOR_MAT);
            monitor.position.set(laneX, 3.2, mz);
            g.add(monitorPole, monitor);
          });

          // Ball Return Rack with Return Track & 5 Bowling Balls
          const rack = new THREE.Mesh(BOWLING_RACK_GEO, BOWLING_RACK_MAT);
          rack.position.set(laneX - laneSpacing / 2, 0.35, 19.5);
          g.add(rack);

          for (let b = 0; b < 5; b++) {
            const ballMat = getBowlingBallMaterial(ballCols[(l * 5 + b) % ballCols.length]);
            const ball = new THREE.Mesh(BOWLING_BALL_GEO, ballMat);
            ball.position.set(laneX - laneSpacing / 2, 0.76, 17.8 + b * 0.42);
            g.add(ball);
          }
        }

        // Approach Hardwood Floor Area
        const approachFloor = new THREE.Mesh(new THREE.BoxGeometry(numLanes * laneSpacing + 1.6, 0.08, 8.5),
          new THREE.MeshStandardMaterial({ color: 0x140d24, roughness: 0.5 }));
        approachFloor.position.set(0, 0.04, 25.5);
        g.add(approachFloor);

        // Player VIP Lounges (Sectional Sofas & Tables)
        const sofaMat = new THREE.MeshStandardMaterial({ color: 0x1c1032, emissive: 0x3b82f6, emissiveIntensity: 0.2 });
        const sofaL = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.55, 1.4), sofaMat);
        sofaL.position.set(-4.8, 0.40, 28.5);
        const sofaR = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.55, 1.4), sofaMat);
        sofaR.position.set(4.8, 0.40, 28.5);
        g.add(sofaL, sofaR);

        // Palm Trees & Golden Lamps
        const p1 = createCasinoPalmTree(); p1.position.set(-10.5, 0, 28.5);
        const p2 = createCasinoPalmTree(); p2.position.set(10.5, 0, 28.5);
        const l1 = createGoldenLampPost(); l1.position.set(-10.5, 0, 24.0);
        const l2 = createGoldenLampPost(); l2.position.set(10.5, 0, 24.0);
        g.add(p1, p2, l1, l2);

        // 4 Overhead Runway Floodlights
        [-20.0, -7.0, 6.0, 19.0].forEach(lz => {
          const bLight = new THREE.PointLight(0x3b82f6, 2.8, 30);
          bLight.position.set(0, 6.0, lz);
          g.add(bLight);
        });

        return g;
      }

      // 7. Traditional Cinema Seat 3D Model (Butaca de Cine Clásica de Terciopelo Rojo con Portavasos)
      function createTraditionalCinemaSeat(seatLabel = 'VIP', hasPopcorn = false) {
        const seatGroup = new THREE.Group();

        // Materials
        const velvetRed = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.55, metalness: 0.15 });
        const velvetDarkRed = new THREE.MeshStandardMaterial({ color: 0x6e0e1e, roughness: 0.65, metalness: 0.10 });
        const darkShellMat = new THREE.MeshStandardMaterial({ color: 0x14121a, roughness: 0.35, metalness: 0.30 });
        const castIronMat = new THREE.MeshStandardMaterial({ color: 0x1f1e24, roughness: 0.40, metalness: 0.80 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
        const popcornMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.85 });
        const sodaCupMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.30 });
        const strawMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.20 });

        // 1. Cast Iron Floor Pedestal Base & Column
        const baseFoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.26), castIronMat);
        baseFoot.position.set(0, 0.015, 0);
        const baseCol = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.34, 12), castIronMat);
        baseCol.position.set(0, 0.18, 0);
        seatGroup.add(baseFoot, baseCol);

        // 2. Velvet Folding Padded Seat Cushion (Asiento Acolchado Plegable)
        const seatCushionGroup = new THREE.Group();
        seatCushionGroup.position.set(0, 0.38, 0);
        seatCushionGroup.rotation.x = -0.06; // slight ergonomic recline

        const seatCushion = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.11, 0.46), velvetRed);
        seatCushion.position.set(0, 0, 0);
        seatCushion.castShadow = true;

        const seatBullnose = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.54, 16), velvetRed);
        seatBullnose.rotation.z = Math.PI / 2;
        seatBullnose.position.set(0, 0, -0.23);

        const seatGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.02, 0.47), goldMat);
        seatGoldTrim.position.set(0, -0.05, 0);

        seatCushionGroup.add(seatCushion, seatBullnose, seatGoldTrim);
        seatGroup.add(seatCushionGroup);

        // 3. High Ergonomic Velvet Backrest & Headrest (Respaldo Alto con Cabecero)
        const backGroup = new THREE.Group();
        backGroup.position.set(0, 0.42, 0.18);
        backGroup.rotation.x = 0.14; // cinema ergonomic recline

        // Molded Polymer Protective Back Shell
        const backShell = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.74, 0.06), darkShellMat);
        backShell.position.set(0, 0.38, 0.05);

        // Plush Red Velvet Back Padding with Vertical Channeling
        const backPadding = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.54, 0.09), velvetRed);
        backPadding.position.set(0, 0.30, 0);

        // Vertical Tufting Ribs on Backrest
        [-0.13, 0.0, 0.13].forEach(vx => {
          const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.52, 8), velvetDarkRed);
          rib.position.set(vx, 0.30, -0.04);
          backGroup.add(rib);
        });

        // Top Headrest Cushion (Cabecero de Lujo)
        const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.20, 0.12), velvetRed);
        headrest.position.set(0, 0.65, -0.01);

        // Gold Embroidered Seat Number Badge
        const badge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.02), goldMat);
        badge.position.set(0, 0.68, -0.07);

        backGroup.add(backShell, backPadding, headrest, badge);
        seatGroup.add(backGroup);

        // 4. Stanchion Armrests with Built-in Cup Holders (Reposabrazos con Portavasos)
        [-0.29, 0.29].forEach((ax, aIdx) => {
          const armStanchion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.48, 0.38), castIronMat);
          armStanchion.position.set(ax, 0.38, 0.02);

          const armPad = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.04, 0.34), velvetDarkRed);
          armPad.position.set(ax, 0.64, 0.04);

          // Built-in Cup Holder at the Front
          const cupHolder = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.038, 0.07, 16), castIronMat);
          cupHolder.position.set(ax, 0.62, -0.16);

          const cupHolderRim = new THREE.Mesh(new THREE.TorusGeometry(0.046, 0.008, 8, 16), goldMat);
          cupHolderRim.rotation.x = Math.PI / 2;
          cupHolderRim.position.set(ax, 0.655, -0.16);

          seatGroup.add(armStanchion, armPad, cupHolder, cupHolderRim);

          // Authentic Cinema Props in Cup Holders
          if (aIdx === 1) {
            // Right Armrest: Cinema Soda Cup with Striped Lid & Straw
            const sodaCup = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.026, 0.15, 16), sodaCupMat);
            sodaCup.position.set(ax, 0.73, -0.16);

            const sodaLid = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.02, 16), strawMat);
            sodaLid.position.set(ax, 0.81, -0.16);

            const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.08, 8), strawMat);
            straw.position.set(ax + 0.01, 0.85, -0.16);
            straw.rotation.z = -0.20;

            seatGroup.add(sodaCup, sodaLid, straw);
          } else if (hasPopcorn) {
            // Left Armrest (Alternating): Cinema Popcorn Bucket with Golden Popcorn
            const popcornBucket = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.040, 0.14, 16), sodaCupMat);
            popcornBucket.position.set(ax, 0.72, -0.16);

            const popcornTop = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 12), popcornMat);
            popcornTop.position.set(ax, 0.79, -0.16);

            seatGroup.add(popcornBucket, popcornTop);
          }
        });

        return seatGroup;
      }

      // 7.5. Cine & Music 3D Tiered Amphitheater (Gradas Escalonadas de Cine de Lujo)
      function createCineMusicAmphitheater() {
        const g = new THREE.Group();
        const carpetMat = new THREE.MeshStandardMaterial({ color: 0x180928, roughness: 0.75, metalness: 0.15 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
        const stepNeonMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 2.2 });

        // Front Walkway Base Platform (in front of Row 1, y: 0.08m, z: -4.5m)
        const frontWalkway = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.12, 1.8), carpetMat);
        frontWalkway.position.set(0, 0.06, -4.7);
        const frontWalkwayRim = new THREE.Mesh(new THREE.BoxGeometry(15.3, 0.04, 0.06), goldMat);
        frontWalkwayRim.position.set(0, 0.12, -5.6);
        const frontWalkwayNeon = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.02, 0.03), stepNeonMat);
        frontWalkwayNeon.position.set(0, 0.10, -5.62);

        // 3 Tiered Stadium Risers (Gradas Escalonadas de Cine con Alturas Calibradas)
        // Tier 1 (Front Row Riser, Top Surface at y: 0.30m, z: -2.5m)
        const tier1 = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.30, 2.6), carpetMat);
        tier1.position.set(0, 0.15, -2.5);
        const tier1Rim = new THREE.Mesh(new THREE.BoxGeometry(15.3, 0.04, 0.06), goldMat);
        tier1Rim.position.set(0, 0.30, -3.8);
        const tier1Neon = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.02, 0.03), stepNeonMat);
        tier1Neon.position.set(0, 0.28, -3.82);

        // Tier 2 (Middle Row Riser, Top Surface at y: 0.60m, z: 0.0m)
        const tier2 = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.60, 2.6), carpetMat);
        tier2.position.set(0, 0.30, 0.0);
        const tier2Rim = new THREE.Mesh(new THREE.BoxGeometry(15.3, 0.04, 0.06), goldMat);
        tier2Rim.position.set(0, 0.60, -1.2);
        const tier2Neon = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.02, 0.03), stepNeonMat);
        tier2Neon.position.set(0, 0.58, -1.22);

        // Tier 3 (Back Row / VIP Riser, Top Surface at y: 0.90m, z: +2.5m)
        const tier3 = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.90, 2.6), carpetMat);
        tier3.position.set(0, 0.45, 2.5);
        const tier3Rim = new THREE.Mesh(new THREE.BoxGeometry(15.3, 0.04, 0.06), goldMat);
        tier3Rim.position.set(0, 0.90, 1.3);
        const tier3Neon = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.02, 0.03), stepNeonMat);
        tier3Neon.position.set(0, 0.88, 1.28);

        g.add(
          frontWalkway, frontWalkwayRim, frontWalkwayNeon,
          tier1, tier1Rim, tier1Neon,
          tier2, tier2Rim, tier2Neon,
          tier3, tier3Rim, tier3Neon
        );

        // Brass Side Aisle Handrails
        [-7.2, 7.2].forEach(hx => {
          const railPost1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.90, 12), goldMat);
          railPost1.position.set(hx, 0.60, -3.5);
          const railPost2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.20, 12), goldMat);
          railPost2.position.set(hx, 0.90, 0.0);
          const railPost3 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.50, 12), goldMat);
          railPost3.position.set(hx, 1.20, 3.5);

          const handrailBar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 7.6, 12), goldMat);
          handrailBar.rotation.x = 0.12;
          handrailBar.position.set(hx, 1.35, 0.0);

          g.add(railPost1, railPost2, railPost3, handrailBar);
        });

        // Retro Cinema Concession & Popcorn Lightboxes on Rear Flanks
        [-6.8, 6.8].forEach(cx => {
          const stand = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 0.8), carpetMat);
          stand.position.set(cx, 1.30, 3.2);
          const standGold = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.05, 0.85), goldMat);
          standGold.position.set(cx, 1.87, 3.2);
          g.add(stand, standGold);
        });

        // Corner Palms
        const p1 = createCasinoPalmTree(); p1.position.set(-8.2, 0, 3.5);
        const p2 = createCasinoPalmTree(); p2.position.set(8.2, 0, 3.5);
        g.add(p1, p2);

        return g;
      }

      // 8. TV Casino 3D (Live Sports Lounge)
      function createTvCasinoRoom() {
        const g = new THREE.Group();
        const tvCanvas = document.createElement('canvas'); tvCanvas.width = 1024; tvCanvas.height = 512;
        const ctx = tvCanvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 1024, 512);
        grad.addColorStop(0, '#064e3b'); grad.addColorStop(0.5, '#047857'); grad.addColorStop(1, '#065f46');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 1024, 512);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'; ctx.lineWidth = 6;
        ctx.strokeRect(40, 30, 944, 452);
        ctx.beginPath(); ctx.arc(512, 256, 90, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(512, 30); ctx.lineTo(512, 482); ctx.stroke();
        ctx.fillStyle = 'rgba(15, 10, 30, 0.85)';
        if (ctx.roundRect) ctx.roundRect(380, 40, 264, 60, 12); else ctx.rect(380, 40, 264, 60);
        ctx.fill();
        ctx.font = '900 28px Segoe UI'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
        ctx.fillText('⚽ LIVE SPORTS 3D', 512, 80);

        const tvTex = new THREE.CanvasTexture(tvCanvas);
        const screenMat = new THREE.MeshBasicMaterial({ map: tvTex });
        const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(12.0, 6.2), screenMat);
        tvScreen.position.set(0, 5.0, -12.4);
        g.add(tvScreen);

        const frame = new THREE.Mesh(new THREE.BoxGeometry(12.5, 6.6, 0.25),
          new THREE.MeshStandardMaterial({ color: 0x0a0514, metalness: 0.8, roughness: 0.2 }));
        frame.position.set(0, 5.0, -12.55);
        const neon = new THREE.Mesh(new THREE.BoxGeometry(12.8, 6.9, 0.08),
          new THREE.MeshStandardMaterial({ color: 0xd946ef, emissive: 0xd946ef, emissiveIntensity: 2.2 }));
        neon.position.set(0, 5.0, -12.60);
        g.add(frame, neon);

        const sportLight = new THREE.PointLight(0xd946ef, 2.5, 20);
        sportLight.position.set(0, 4.5, -8.0);
        g.add(sportLight);

        // Left & Right Sectional Couches
        const couchL = createSectionalSofaLounge(5.0, 3.8, Math.PI / 2);
        couchL.position.set(-4.5, 0, -2.0);
        const couchR = createSectionalSofaLounge(5.0, 3.8, -Math.PI / 2);
        couchR.position.set(4.5, 0, -2.0);
        g.add(couchL, couchR);

        // Center Table Sets
        const centerTable = createVipCocktailTable(4, 0x221338);
        centerTable.position.set(0, 0, 1.5);
        g.add(centerTable);

        const p1 = createCasinoPalmTree(); p1.position.set(-7.5, 0, 2.0);
        const p2 = createCasinoPalmTree(); p2.position.set(7.5, 0, 2.0);
        g.add(p1, p2);

        return g;
      }

      // 9. Slot Machines / Gachapón / Tragaperras Rows (10 Cabinets per Row - Individual Machines)
      const SLOT_BODY_GEO = new THREE.BoxGeometry(1.1, 2.0, 0.85);
      const GACHAPON_BASE_GEO = new THREE.BoxGeometry(1.04, 1.15, 0.80);
      const GACHAPON_DOME_GEO = new THREE.CylinderGeometry(0.44, 0.44, 0.65, 24);
      const GACHAPON_CAP_TOP_GEO = new THREE.SphereGeometry(0.082, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const GACHAPON_CAP_BOT_GEO = new THREE.SphereGeometry(0.082, 14, 10, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5);
      const GACHAPON_CAP_RING_GEO = new THREE.CylinderGeometry(0.083, 0.083, 0.008, 16);
      const GACHAPON_CAP_WHITE_MAT = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.1, roughness: 0.25 });
      const GACHAPON_CAP_SEAM_MAT = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.4 });
      const GACHAPON_CRANK_BASE_GEO = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 16);
      const GACHAPON_CRANK_HANDLE_GEO = new THREE.BoxGeometry(0.18, 0.035, 0.04);
      const GACHAPON_CHUTE_GEO = new THREE.BoxGeometry(0.38, 0.18, 0.22);
      const GACHAPON_CHUTE_HOLE_GEO = new THREE.BoxGeometry(0.28, 0.12, 0.18);
      const SLOT_SCR_GEO = new THREE.PlaneGeometry(0.92, 0.92);
      const SLOT_TRAY_GEO = new THREE.BoxGeometry(0.98, 0.16, 0.32);
      const SLOT_TOPPER_GEO = new THREE.CylinderGeometry(0.14, 0.14, 0.85, 16);
      const GACHAPON_TOPPER_GEO = new THREE.CylinderGeometry(0.16, 0.16, 0.88, 16);
      const SLOT_LEVER_BASE_GEO = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 12);
      const SLOT_LEVER_ARM_GEO = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12);
      const SLOT_LEVER_BALL_GEO = new THREE.SphereGeometry(0.065, 16, 16);

      const SLOT_BODY_MAT = new THREE.MeshStandardMaterial({ color: 0x181028, metalness: 0.7, roughness: 0.25 });
      const GACHAPON_BODY_MAT = new THREE.MeshStandardMaterial({ color: 0x091e3a, metalness: 0.5, roughness: 0.2 });
      const GACHAPON_GLASS_MAT = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.32, roughness: 0.05 });
      const SLOT_GOLD_MAT = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.18 });
      const GACHAPON_CHROME_MAT = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.98, roughness: 0.06 });
      const SLOT_ARM_MAT = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95 });
      const SLOT_BALL_MAT = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.2 });

      const GACHA_CAP_MATS = [
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.4, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xc084fc, metalness: 0.4, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.4, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xec4899, metalness: 0.4, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x4ade80, metalness: 0.4, roughness: 0.2 })
      ];

      function createSlotMachineRow(type = 'slots') {
        const g = new THREE.Group();
        const count = 10;
        const spacing = 1.8;
        const startX = -((count - 1) * spacing) / 2;

        const isGachapon = (type === 'pachinko');
        const isSlots5x5 = (type === 'slots');

        const themes = {
          slots: { color: 0xec4899, emissive: 0xec4899, name: 'SLOTS' },
          pachinko: { color: 0x06b6d4, emissive: 0x06b6d4, name: 'GACHAPÓN' },
          tragaperras: { color: 0xf59e0b, emissive: 0xf59e0b, name: '777' }
        };
        const theme = themes[type] || themes.slots;
        const symbols = (type === 'tragaperras') ? TRAGAPERRAS_SYMBOLS : SLOTS_SYMBOLS;

        const stripMat = new THREE.MeshStandardMaterial({ color: theme.color, emissive: theme.emissive, emissiveIntensity: 2.8 });
        const strip = new THREE.Mesh(new THREE.BoxGeometry(count * spacing + 1.2, 0.04, 0.16), stripMat);
        strip.position.set(0, 0.02, 0.65);
        g.add(strip);

        const topperMat = new THREE.MeshStandardMaterial({ color: theme.color, emissive: theme.emissive, emissiveIntensity: 2.2 });

        window.slotMachinesByZone[type] = window.slotMachinesByZone[type] || [];

        for (let i = 0; i < count; i++) {
          const x = startX + i * spacing;
          const cab = new THREE.Group();
          cab.position.set(x, 0, 0);

          // Individual 512x512 Screen & Texture per Machine (Ultra-fast 60 FPS)
          const cabCanvas = document.createElement('canvas');
          cabCanvas.width = 512;
          cabCanvas.height = 512;
          const ctx = cabCanvas.getContext('2d');
          const cabTex = new THREE.CanvasTexture(cabCanvas);
          cabTex.minFilter = THREE.LinearFilter;
          cabTex.magFilter = THREE.LinearFilter;

          const numReels = isSlots5x5 ? 5 : (isGachapon ? 0 : 3);
          const initialReels = [];
          for (let r = 0; r < (numReels || 3); r++) {
            initialReels.push((i * 3 + r * 2 + 1) % symbols.length);
          }

          const machineState = {
            spinning: false,
            reels: initialReels,
            targetIndexes: [...initialReels],
            stopTimes: new Array(numReels || 3).fill(0),
            stopped: new Array(numReels || 3).fill(true),
            symbols: symbols,
            bet: isSlots5x5 ? 20 : (isGachapon ? 300 : 10),
            lastTickTime: new Array(numReels || 3).fill(0),
            winner: false,
            winningLines: [],
            lastPrize: null,
            multiplier: 0
          };

          let leverPivot = null;
          let crankGroup = null;

          if (isGachapon) {
            // =========================================================
            // GABINETE EXPENDEDOR JAPONÉS DE GACHAPÓN 3D
            // =========================================================
            // 1. Mueble pedestal inferior en azul cian arcade
            const baseBody = new THREE.Mesh(GACHAPON_BASE_GEO, GACHAPON_BODY_MAT);
            baseBody.position.y = 0.58;
            cab.add(baseBody);

            // 2. Pantalla interactiva frontal
            const scrMat = new THREE.MeshBasicMaterial({ map: cabTex });
            const scr = new THREE.Mesh(SLOT_SCR_GEO, scrMat);
            scr.position.set(0, 1.25, 0.435);
            cab.add(scr);

            // 3. Domo de cristal transparente superior con cápsulas
            const dome = new THREE.Mesh(GACHAPON_DOME_GEO, GACHAPON_GLASS_MAT);
            dome.position.set(0, 1.55, 0);
            cab.add(dome);

            // Cápsulas grandes de dos tonos empaquetadas abajo y juntas
            const capGroup = new THREE.Group();
            capGroup.position.set(0, 1.55, 0);

            const packedCapsuleData = [
              // Capa Inferior (Apoyadas en el fondo del domo, y = -0.22)
              { x: 0.0, y: -0.22, z: 0.0, rx: 0.3, ry: 0.4, rz: 0.2, c: 0 },
              { x: 0.22, y: -0.22, z: 0.02, rx: 0.5, ry: 1.1, rz: 0.4, c: 1 },
              { x: 0.09, y: -0.22, z: 0.20, rx: 0.8, ry: 0.6, rz: 0.9, c: 2 },
              { x: -0.13, y: -0.22, z: 0.18, rx: 1.2, ry: 0.2, rz: 0.5, c: 3 },
              { x: -0.22, y: -0.22, z: -0.02, rx: 0.4, ry: 0.9, rz: 1.3, c: 4 },
              { x: -0.09, y: -0.22, z: -0.20, rx: 0.9, ry: 1.4, rz: 0.3, c: 0 },
              { x: 0.13, y: -0.22, z: -0.18, rx: 0.6, ry: 0.3, rz: 0.8, c: 1 },

              // Capa Media (Encajadas entre las inferiores, y = -0.09)
              { x: 0.03, y: -0.09, z: -0.02, rx: 0.7, ry: 1.2, rz: 0.4, c: 2 },
              { x: 0.20, y: -0.09, z: 0.10, rx: 0.3, ry: 0.5, rz: 1.1, c: 3 },
              { x: 0.05, y: -0.09, z: 0.23, rx: 1.1, ry: 0.8, rz: 0.2, c: 4 },
              { x: -0.13, y: -0.09, z: 0.19, rx: 0.4, ry: 1.5, rz: 0.7, c: 0 },
              { x: -0.23, y: -0.09, z: 0.03, rx: 0.8, ry: 0.3, rz: 1.2, c: 1 },
              { x: -0.17, y: -0.09, z: -0.15, rx: 1.3, ry: 0.9, rz: 0.5, c: 2 },
              { x: 0.01, y: -0.09, z: -0.23, rx: 0.2, ry: 0.6, rz: 0.9, c: 3 },
              { x: 0.18, y: -0.09, z: -0.14, rx: 0.9, ry: 1.1, rz: 0.3, c: 4 },

              // Capa Superior (Cúspide compacta, y = 0.04)
              { x: 0.12, y: 0.04, z: 0.04, rx: 0.5, ry: 0.4, rz: 0.8, c: 0 },
              { x: -0.04, y: 0.04, z: 0.12, rx: 0.8, ry: 1.3, rz: 0.4, c: 1 },
              { x: -0.12, y: 0.04, z: -0.04, rx: 1.0, ry: 0.7, rz: 0.6, c: 2 },
              { x: 0.04, y: 0.04, z: -0.12, rx: 0.3, ry: 0.9, rz: 1.0, c: 3 },
              { x: 0.0, y: 0.05, z: 0.0, rx: 0.6, ry: 0.2, rz: 0.5, c: 4 }
            ];

            packedCapsuleData.forEach(cd => {
              const singleCap = new THREE.Group();
              singleCap.position.set(cd.x, cd.y, cd.z);
              singleCap.rotation.set(cd.rx, cd.ry, cd.rz);

              // Cúpula superior de color
              const topMesh = new THREE.Mesh(GACHAPON_CAP_TOP_GEO, GACHA_CAP_MATS[cd.c]);
              // Cúpula inferior blanca / translúcida
              const botMesh = new THREE.Mesh(GACHAPON_CAP_BOT_GEO, GACHAPON_CAP_WHITE_MAT);
              // Anillo de costura central
              const ringMesh = new THREE.Mesh(GACHAPON_CAP_RING_GEO, GACHAPON_CAP_SEAM_MAT);

              singleCap.add(topMesh, botMesh, ringMesh);
              capGroup.add(singleCap);
            });

            cab.add(capGroup);

            // 4. Manivela central giratoria de monedas (T-Crank Wheel)
            const crank = new THREE.Group();
            crank.position.set(0, 0.85, 0.44);

            const crankBase = new THREE.Mesh(GACHAPON_CRANK_BASE_GEO, GACHAPON_CHROME_MAT);
            crankBase.rotation.x = Math.PI / 2;

            const crankHandle = new THREE.Mesh(GACHAPON_CRANK_HANDLE_GEO, SLOT_GOLD_MAT);
            crankHandle.position.z = 0.025;

            crank.add(crankBase, crankHandle);
            cab.add(crank);
            crankGroup = crank;

            // 5. Rampa de salida de cápsula dispensada (Chute)
            const chute = new THREE.Mesh(GACHAPON_CHUTE_GEO, GACHAPON_CHROME_MAT);
            chute.position.set(0, 0.42, 0.45);
            const chuteHole = new THREE.Mesh(GACHAPON_CHUTE_HOLE_GEO, new THREE.MeshBasicMaterial({ color: 0x020617 }));
            chuteHole.position.set(0, 0.42, 0.47);
            cab.add(chute, chuteHole);

            // 6. Rótulo superior de neón
            const topper = new THREE.Mesh(GACHAPON_TOPPER_GEO, topperMat);
            topper.rotation.z = Math.PI / 2;
            topper.position.set(0, 2.05, 0.1);
            cab.add(topper);

          } else {
            // =========================================================
            // GABINETE SLOTS 5x5 Y TRAGAPERRAS 777
            // =========================================================
            const body = new THREE.Mesh(SLOT_BODY_GEO, SLOT_BODY_MAT);
            body.position.y = 1.0;
            cab.add(body);

            const scrMat = new THREE.MeshBasicMaterial({ map: cabTex });
            const scr = new THREE.Mesh(SLOT_SCR_GEO, scrMat);
            scr.position.set(0, 1.25, 0.435);
            cab.add(scr);

            leverPivot = new THREE.Group();
            leverPivot.position.set(0.60, 1.2, 0);

            const leverBase = new THREE.Mesh(SLOT_LEVER_BASE_GEO, SLOT_GOLD_MAT);
            leverBase.rotation.z = Math.PI / 2;
            
            const leverArm = new THREE.Mesh(SLOT_LEVER_ARM_GEO, SLOT_ARM_MAT);
            leverArm.position.set(0.06, 0.18, 0);
            leverArm.rotation.z = -0.25;

            const leverBall = new THREE.Mesh(SLOT_LEVER_BALL_GEO, SLOT_BALL_MAT);
            leverBall.position.set(0.12, 0.38, 0);

            leverPivot.add(leverBase, leverArm, leverBall);
            cab.add(leverPivot);

            const tray = new THREE.Mesh(SLOT_TRAY_GEO, SLOT_GOLD_MAT);
            tray.position.set(0, 0.70, 0.48);
            cab.add(tray);

            const topper = new THREE.Mesh(SLOT_TOPPER_GEO, topperMat);
            topper.rotation.z = Math.PI / 2;
            topper.position.set(0, 2.08, 0.1);
            cab.add(topper);
          }

          const machineObj = {
            ctx: ctx,
            tex: cabTex,
            state: machineState,
            theme: theme,
            type: type,
            seatIndex: i,
            leverPivot: leverPivot,
            crankGroup: crankGroup,
            lastDrawTime: 0
          };
          window.slotMachinesByZone[type][i] = machineObj;

          draw3DSlotMachineScreen(ctx, machineState, theme, type, machineObj);
          cabTex.needsUpdate = true;

          g.add(cab);
        }
        const palmL = createCasinoPalmTree(); palmL.position.set(startX - 1.4, 0, 0.4);
        const palmR = createCasinoPalmTree(); palmR.position.set(-startX + 1.4, 0, 0.4);
        const lampL = createGoldenLampPost(); lampL.position.set(startX - 2.4, 0, 0.4);
        const lampR = createGoldenLampPost(); lampR.position.set(-startX + 2.4, 0, 0.4);
        g.add(palmL, palmR, lampL, lampR);

        return g;
      }

      // Poker Texas Hold'em Table 3D
      function createPokerTable3D() {
        const g = new THREE.Group();
        const tableBaseMat = new THREE.MeshStandardMaterial({ color: 0x241108, roughness: 0.4, metalness: 0.1 });
        const leatherRailMat = new THREE.MeshStandardMaterial({ color: 0x111116, roughness: 0.3 });
        const feltMat = new THREE.MeshStandardMaterial({ color: 0x056b38, roughness: 0.8 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });

        [[-1.8, 0], [1.8, 0]].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.52, 0.68, 20), tableBaseMat);
          leg.position.set(lx, 0.34, lz);
          const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.68, 0.1, 20), goldMat);
          foot.position.set(lx, 0.05, lz);
          g.add(leg, foot);
        });

        const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.15, 36), feltMat);
        tableTop.scale.set(1.0, 1.0, 0.62);
        tableTop.position.set(0, 0.75, 0);
        g.add(tableTop);

        const rail = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.16, 16, 48), leatherRailMat);
        rail.scale.set(1.0, 0.62, 1.0);
        rail.rotation.x = Math.PI / 2;
        rail.position.set(0, 0.78, 0);
        g.add(rail);

        // Community Cards
        for (let c = 0; c < 5; c++) {
          const card = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.005, 0.36),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
          card.position.set(-0.7 + c * 0.35, 0.835, 0);
          g.add(card);
        }

        // 3D Chip Stacks (Pot & Player Chips)
        [[-0.45, 0.35, 250], [0.45, 0.35, 1000], [0, -0.35, 500], [-1.4, 0.45, 100], [1.4, -0.45, 2000]].forEach(([cx, cz, val]) => {
          const chipStack = create3DChipStackMesh(val, 0.075, 0.020);
          chipStack.position.set(cx, 0.83, cz);
          g.add(chipStack);
        });

        const p1 = createCasinoPalmTree(); p1.position.set(-4.2, 0, 0);
        const p2 = createCasinoPalmTree(); p2.position.set(4.2, 0, 0);
        g.add(p1, p2);

        return g;
      }

      // 10. Jackpot Area (Circular Ring of 8 Royal Thrones + Center Grand Championship Trophy 🏆)
      function createJackpotDais() {
        const g = new THREE.Group();

        // 1. Dais Platform with Golden Neon Glowing Edge & Inlaid Floor Trim
        const dais = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 5.2, 0.40, 36),
          new THREE.MeshStandardMaterial({ color: 0x140a22, roughness: 0.4 }));
        dais.position.y = 0.20;

        const daisGoldRim = new THREE.Mesh(new THREE.TorusGeometry(4.85, 0.09, 12, 48),
          new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 2.8 }));
        daisGoldRim.rotation.x = Math.PI / 2; daisGoldRim.position.y = 0.40;

        const floorInlay = new THREE.Mesh(new THREE.RingGeometry(3.6, 3.68, 48),
          new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15, side: THREE.DoubleSide }));
        floorInlay.rotation.x = -Math.PI / 2; floorInlay.position.y = 0.402;

        const floorNeonHex = new THREE.Mesh(
          new THREE.RingGeometry(2.0, 2.08, 6),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 2.0, side: THREE.DoubleSide })
        );
        floorNeonHex.rotation.x = -Math.PI / 2; floorNeonHex.position.y = 0.403;

        g.add(dais, daisGoldRim, floorInlay, floorNeonHex);

        // Common Luxury Materials
        const crimsonVelvetMat = new THREE.MeshStandardMaterial({
          color: 0x881337, // Royal Deep Imperial Crimson Velvet
          roughness: 0.72,
          metalness: 0.10,
          emissive: 0x4c0519,
          emissiveIntensity: 0.18
        });
        const tuftButtonMat = new THREE.MeshStandardMaterial({
          color: 0x380512,
          roughness: 0.85,
          metalness: 0.12
        });
        const royalGoldMat = new THREE.MeshStandardMaterial({
          color: 0xd4af37, // Polished Baroque Royal Gold
          metalness: 0.95,
          roughness: 0.14
        });
        const shinyGoldMat = new THREE.MeshStandardMaterial({
          color: 0xffd700, // Mirror Championship Gold
          metalness: 0.98,
          roughness: 0.08
        });
        const darkGoldMat = new THREE.MeshStandardMaterial({
          color: 0x9a7b1c, // Shadowed carving gold
          metalness: 0.88,
          roughness: 0.25
        });
        const rubyMat = new THREE.MeshStandardMaterial({
          color: 0xe11d48, // Radiant Ruby Gemstone
          metalness: 0.25,
          roughness: 0.10,
          emissive: 0xbe123c,
          emissiveIntensity: 0.75
        });
        const darkMarbleMat = new THREE.MeshStandardMaterial({
          color: 0x0a0614,
          roughness: 0.22,
          metalness: 0.80
        });
        const goldNeonMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xfbbf24,
          emissiveIntensity: 2.5
        });

        // ============================================================
        // 2. HELPER: Enhanced Royal Baroque Throne (Faithful to Reference Artwork)
        // ============================================================
        function createEnhancedRoyalThrone(ang) {
          const throne = new THREE.Group();
          const cx = Math.sin(ang) * 3.8;
          const cz = Math.cos(ang) * 3.8;
          throne.position.set(cx, 0.40, cz);
          throne.rotation.y = ang + Math.PI; // Face towards the center trophy

          // 1. Four Baroque Cabriole Legs with Knee Carvings & Ball/Paw Feet
          const frontLegCoords = [[-0.35, 0.28], [0.35, 0.28]];
          frontLegCoords.forEach(([lx, lz]) => {
            // Upper curved cabriole thigh
            const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.038, 0.22, 12), royalGoldMat);
            thigh.position.set(lx, 0.28, lz);
            thigh.castShadow = true;

            // Carved knee rosette
            const kneeRosette = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), darkGoldMat);
            kneeRosette.position.set(lx, 0.37, lz + 0.015);

            // Lower curved ankle
            const ankle = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.030, 0.18, 12), royalGoldMat);
            ankle.position.set(lx, 0.12, lz);

            // Scrolled ball/paw foot
            const foot = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 12), darkGoldMat);
            foot.position.set(lx, 0.03, lz);

            throne.add(thigh, kneeRosette, ankle, foot);
          });

          const rearLegCoords = [[-0.33, -0.28], [0.33, -0.28]];
          rearLegCoords.forEach(([lx, lz]) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.032, 0.38, 12), royalGoldMat);
            leg.position.set(lx, 0.19, lz);
            leg.rotation.x = -0.14; // Angled back for regal stance
            leg.castShadow = true;

            const foot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), darkGoldMat);
            foot.position.set(lx, 0.03, lz - 0.03);

            throne.add(leg, foot);
          });

          // 2. Sculpted Gold Seat Frame Base & Carved Baroque Front Apron
          const seatBaseFrame = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.07, 0.70), royalGoldMat);
          seatBaseFrame.position.set(0, 0.36, 0);
          seatBaseFrame.castShadow = true;

          const baseBevel = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.03, 0.74), darkGoldMat);
          baseBevel.position.set(0, 0.33, 0);

          // Carved Front Apron (Faldón con rosetón central y volutas laterales)
          const apronRosette = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 16), royalGoldMat);
          apronRosette.rotation.x = Math.PI / 2;
          apronRosette.position.set(0, 0.30, 0.36);

          const apronRuby = new THREE.Mesh(new THREE.SphereGeometry(0.040, 12, 12), rubyMat);
          apronRuby.position.set(0, 0.30, 0.385);

          const apronWingL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.05, 0.03), darkGoldMat);
          apronWingL.position.set(-0.22, 0.30, 0.355);
          const apronWingR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.05, 0.03), darkGoldMat);
          apronWingR.position.set(0.22, 0.30, 0.355);

          throne.add(seatBaseFrame, baseBevel, apronRosette, apronRuby, apronWingL, apronWingR);

          // 3. Thick Plush Crimson Velvet Contoured Seat Cushion
          const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.13, 0.66), crimsonVelvetMat);
          cushion.position.set(0, 0.43, 0.01);
          cushion.castShadow = true;

          // Contoured waterfall front edge
          const cushionFrontRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.74, 16), crimsonVelvetMat);
          cushionFrontRoll.rotation.z = Math.PI / 2;
          cushionFrontRoll.position.set(0, 0.43, 0.34);

          // Gold Perimeter Piping Trim
          const goldCushionPiping = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.014, 8, 28), royalGoldMat);
          goldCushionPiping.scale.set(1.05, 0.94, 1);
          goldCushionPiping.rotation.x = Math.PI / 2;
          goldCushionPiping.position.set(0, 0.49, 0.01);

          throne.add(cushion, cushionFrontRoll, goldCushionPiping);

          // 4. Baroque Sculpted Armrests with Cascading Velvet Pads
          [-0.39, 0.39].forEach(ax => {
            // Front Carved Baroque Baluster Post
            const postF = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.050, 0.28, 12), royalGoldMat);
            postF.position.set(ax, 0.52, 0.26);
            postF.castShadow = true;

            const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.042, 0.28, 12), royalGoldMat);
            postR.position.set(ax, 0.52, -0.20);

            // Carved Gold Arm Rail
            const armRail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.045, 0.60), royalGoldMat);
            armRail.position.set(ax, 0.65, 0.03);

            // Front Baroque Volute Scroll Finial
            const volute = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.024, 10, 20), darkGoldMat);
            volute.rotation.y = Math.PI / 2;
            volute.position.set(ax, 0.65, 0.34);

            // Cascading Crimson Velvet Armpad
            const armPad = new THREE.Mesh(new THREE.CylinderGeometry(0.060, 0.060, 0.54, 14), crimsonVelvetMat);
            armPad.rotation.x = Math.PI / 2;
            armPad.position.set(ax, 0.69, 0.02);
            armPad.castShadow = true;

            const armPadFrontDrop = new THREE.Mesh(new THREE.SphereGeometry(0.060, 10, 10), crimsonVelvetMat);
            armPadFrontDrop.position.set(ax, 0.67, 0.29);

            throne.add(postF, postR, armRail, volute, armPad, armPadFrontDrop);
          });

          // 5. Grand High Baroque Tufted Backrest (Capitoné with Crown Arch Crest)
          const backGroup = new THREE.Group();
          backGroup.position.set(0, 0, -0.32);

          // A. Outer Sculpted Golden Baroque Frame (Hourglass Silhouette)
          const backFrameLower = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.56, 0.08), royalGoldMat);
          backFrameLower.position.set(0, 0.72, 0);
          backFrameLower.castShadow = true;

          const backFrameShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.68, 0.08), royalGoldMat);
          backFrameShoulder.position.set(0, 1.28, 0);
          backFrameShoulder.castShadow = true;

          const backFrameArch = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.08, 28), royalGoldMat);
          backFrameArch.rotation.x = Math.PI / 2;
          backFrameArch.position.set(0, 1.58, 0);

          // B. Inner Plush Crimson Velvet Backrest
          const velvetLower = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.52, 0.06), crimsonVelvetMat);
          velvetLower.position.set(0, 0.72, 0.03);

          const velvetShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.62, 0.06), crimsonVelvetMat);
          velvetShoulder.position.set(0, 1.27, 0.03);

          const velvetArch = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.06, 28), crimsonVelvetMat);
          velvetArch.rotation.x = Math.PI / 2;
          velvetArch.position.set(0, 1.55, 0.03);

          // Gold Perimeter Bezel Trim
          const goldBackBezel = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.018, 8, 28), royalGoldMat);
          goldBackBezel.position.set(0, 1.55, 0.065);

          backGroup.add(backFrameLower, backFrameShoulder, backFrameArch, velvetLower, velvetShoulder, velvetArch, goldBackBezel);

          // C. Diamond Button Tufting (Capitoné) with Gold Stud Rims
          const tuftPattern = [
            [-0.18, 0.62], [0.18, 0.62],
            [-0.26, 0.84], [0.00, 0.84], [0.26, 0.84],
            [-0.30, 1.06], [-0.10, 1.06], [0.10, 1.06], [0.30, 1.06],
            [-0.26, 1.28], [0.00, 1.28], [0.26, 1.28],
            [-0.18, 1.46], [0.18, 1.46],
            [0.00, 1.60]
          ];
          tuftPattern.forEach(([tx, ty]) => {
            const button = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), tuftButtonMat);
            button.position.set(tx, ty, 0.065);
            const buttonRim = new THREE.Mesh(new THREE.TorusGeometry(0.020, 0.004, 6, 10), royalGoldMat);
            buttonRim.position.set(tx, ty, 0.064);
            backGroup.add(button, buttonRim);
          });

          // D. Grand Baroque Royal Crown Crest at Peak
          const crestMedallion = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.045, 18), royalGoldMat);
          crestMedallion.rotation.x = Math.PI / 2;
          crestMedallion.position.set(0, 1.84, 0.045);

          const crestRuby = new THREE.Mesh(new THREE.OctahedronGeometry(0.065, 0), rubyMat);
          crestRuby.position.set(0, 1.84, 0.08);

          const crownCenterPeak = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.24, 14), royalGoldMat);
          crownCenterPeak.position.set(0, 2.08, 0.02);

          const crownRubyTop = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), rubyMat);
          crownRubyTop.position.set(0, 2.20, 0.02);

          const crownPeakL = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.18, 10), royalGoldMat);
          crownPeakL.rotation.z = 0.26;
          crownPeakL.position.set(-0.18, 2.00, 0.02);

          const crownPeakR = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.18, 10), royalGoldMat);
          crownPeakR.rotation.z = -0.26;
          crownPeakR.position.set(0.18, 2.00, 0.02);

          // Left & Right Baroque Scrolled Acanthus Wings
          [-1, 1].forEach(dir => {
            const wingScroll = new THREE.Mesh(
              new THREE.TorusGeometry(0.20, 0.040, 10, 20, Math.PI * 1.20),
              darkGoldMat
            );
            wingScroll.rotation.z = dir * 0.72;
            wingScroll.position.set(dir * 0.40, 1.74, 0.02);

            const scrollFinial = new THREE.Mesh(new THREE.SphereGeometry(0.050, 8, 8), royalGoldMat);
            scrollFinial.position.set(dir * 0.56, 1.60, 0.02);

            backGroup.add(wingScroll, scrollFinial);
          });

          backGroup.add(crestMedallion, crestRuby, crownCenterPeak, crownRubyTop, crownPeakL, crownPeakR);
          throne.add(backGroup);

          return throne;
        }

        // Render Ring of 8 Enhanced Royal Thrones
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const throne = createEnhancedRoyalThrone(ang);
          g.add(throne);
        }

        // ============================================================
        // 3. GRAND CHAMPIONSHIP LUXURY TROPHY (Iconic, Majestic, Elevated) 🏆
        // ============================================================
        const trophyGroup = new THREE.Group();
        trophyGroup.position.set(0, 0.40, 0);

        // A. Tiered Dark Obsidian / Marble Pedestal Base with Gold Bevels
        const base1 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.30, 0.28, 8), darkMarbleMat);
        base1.position.y = 0.14;
        base1.castShadow = true; base1.receiveShadow = true;

        const baseTrim1 = new THREE.Mesh(new THREE.CylinderGeometry(1.16, 1.16, 0.05, 8), royalGoldMat);
        baseTrim1.position.y = 0.28;

        const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 1.02, 0.26, 8), darkMarbleMat);
        base2.position.y = 0.43;
        base2.castShadow = true;

        const baseTrim2 = new THREE.Mesh(new THREE.CylinderGeometry(0.89, 0.89, 0.05, 8), royalGoldMat);
        baseTrim2.position.y = 0.57;

        // Inset Golden Neon Accent Ring on Pedestal
        const pedestalNeon = new THREE.Mesh(new THREE.TorusGeometry(0.89, 0.03, 10, 8), goldNeonMat);
        pedestalNeon.rotation.x = Math.PI / 2; pedestalNeon.position.y = 0.58;

        // Engraved Gold Plaque on Front
        const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.05), shinyGoldMat);
        plaque.position.set(0, 0.43, 0.90);
        trophyGroup.add(base1, baseTrim1, base2, baseTrim2, pedestalNeon, plaque);

        // B. Sculpted Fluted Golden Pedestal Stem & Torus Nodes
        const stemBase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.24, 24), royalGoldMat);
        stemBase.position.y = 0.71;

        const stemRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.045, 12, 24), shinyGoldMat);
        stemRing1.rotation.x = Math.PI / 2; stemRing1.position.y = 0.84;

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.40, 0.85, 24), royalGoldMat);
        stem.position.y = 1.28;

        const stemRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.050, 12, 24), shinyGoldMat);
        stemRing2.rotation.x = Math.PI / 2; stemRing2.position.y = 1.72;

        const cupBaseNode = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), royalGoldMat);
        cupBaseNode.scale.set(1, 0.65, 1);
        cupBaseNode.position.y = 1.84;

        trophyGroup.add(stemBase, stemRing1, stem, stemRing2, cupBaseNode);

        // C. Majestic Flared Championship Cup / Chalice Body
        const cupLower = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.35, 1.05, 32), shinyGoldMat);
        cupLower.position.y = 2.38;
        cupLower.castShadow = true;

        const cupUpper = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 0.98, 0.58, 32), shinyGoldMat);
        cupUpper.position.y = 3.02;

        const cupRim = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.085, 16, 32), shinyGoldMat);
        cupRim.rotation.x = Math.PI / 2; cupRim.position.y = 3.32;

        // Embossed Gold Medallion & Central Ruby Gem on Front
        const starMedallion = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.05, 18), shinyGoldMat);
        starMedallion.rotation.x = Math.PI / 2; starMedallion.position.set(0, 2.50, 0.74);
        const rubyCenter = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), rubyMat);
        rubyCenter.position.set(0, 2.50, 0.78);

        // Molten glowing gold pool inside cup
        const insideGold = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, 0.02, 32), shinyGoldMat);
        insideGold.position.y = 3.05;

        trophyGroup.add(cupLower, cupUpper, cupRim, starMedallion, rubyCenter, insideGold);

        // D. Sweeping Sculpted Dual Championship Handles with Scrolled Volutes
        [-1, 1].forEach(dir => {
          const handle = new THREE.Mesh(
            new THREE.TorusGeometry(0.60, 0.075, 16, 32, Math.PI * 1.35),
            shinyGoldMat
          );
          handle.rotation.z = dir * (Math.PI * 0.45);
          handle.position.set(dir * 1.08, 2.52, 0);
          handle.castShadow = true;

          const handleFinial = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 12), shinyGoldMat);
          handleFinial.position.set(dir * 1.56, 2.88, 0);

          trophyGroup.add(handle, handleFinial);
        });

        // E. Floating Radiant Crown of Champions / Victory Diamond atop Trophy
        const victoryGroup = new THREE.Group();
        victoryGroup.position.set(0, 3.70, 0);

        // Radiant Faceted Octahedron Diamond with Ruby Glow
        const victoryDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), rubyMat);
        victoryDiamond.castShadow = true;

        // Floating Golden Ring of Victory
        const victoryRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.040, 12, 28), shinyGoldMat);
        victoryRing.rotation.x = Math.PI / 2;

        const victoryRingNeon = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.020, 10, 28), goldNeonMat);
        victoryRingNeon.rotation.x = Math.PI / 2;

        victoryGroup.add(victoryDiamond, victoryRing, victoryRingNeon);
        trophyGroup.add(victoryGroup);

        // F. Floating 3D Championship Banner Sprite
        const titleCanvas = document.createElement('canvas');
        titleCanvas.width = 512; titleCanvas.height = 128;
        const tCtx = titleCanvas.getContext('2d');
        tCtx.fillStyle = 'rgba(10, 5, 22, 0.90)';
        if (tCtx.roundRect) tCtx.roundRect(8, 8, 496, 112, 18); else tCtx.rect(8, 8, 496, 112);
        tCtx.fill();
        tCtx.strokeStyle = '#ffd700'; tCtx.lineWidth = 5; tCtx.stroke();
        tCtx.font = '900 40px "Segoe UI", Arial, sans-serif';
        tCtx.fillStyle = '#fde047'; tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
        tCtx.fillText('🏆 MEGA JACKPOT 777 🏆', 256, 64);

        const titleTex = new THREE.CanvasTexture(titleCanvas);
        const titleSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: titleTex, depthTest: false }));
        titleSpr.scale.set(2.4, 0.6, 1);
        titleSpr.position.set(0, 4.45, 0);
        trophyGroup.add(titleSpr);

        // Save reference for real-time animation in animate()
        window.jackpotTrophyVictory = {
          victoryGroup,
          victoryDiamond,
          victoryRing,
          victoryRingNeon
        };
        window.jackpotTrophyGem = victoryDiamond;

        g.add(trophyGroup);

        // 4. Radiant Golden Champion Light
        const jLight = new THREE.PointLight(0xffd700, 3.6, 20);
        jLight.position.set(0, 4.2, 0);
        g.add(jLight);

        // 5. Four Corner Palms
        [[-5.2, -5.2], [5.2, -5.2], [-5.2, 5.2], [5.2, 5.2]].forEach(([px, pz]) => {
          const p = createCasinoPalmTree(); p.position.set(px, 0, pz);
          g.add(p);
        });

        return g;
      }

      // 11. Grand Architectural Horizontal 3D Fortune Wheel (360° Circular VIP Stage & Centerpiece Rotor)
      var wheel3DRefs = null;
      window.wheel3DRefs = null;

      function createFortuneWheel3D() {
        const g = new THREE.Group();

        // Architectural Materials
        const darkObsidianMat = new THREE.MeshStandardMaterial({ color: 0x0a0614, roughness: 0.25, metalness: 0.85 });
        const mahoganyMat = new THREE.MeshStandardMaterial({ color: 0x160820, roughness: 0.35, metalness: 0.2 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.98, roughness: 0.08 });
        const neonPurpleMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 2.2 });
        const rubyMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, emissive: 0x9f1239, emissiveIntensity: 1.2, roughness: 0.1, metalness: 0.3 });

        // -------------------------------------------------------------
        // 1. STEPPED CIRCULAR ART-DECO STAGE PLATFORM
        // -------------------------------------------------------------
        // Base Tier 1 - Grand Obsidian Marble Step
        const base1 = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.6, 0.18, 48), darkObsidianMat);
        base1.position.y = 0.09;
        base1.castShadow = true; base1.receiveShadow = true;
        const base1Trim = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.035, 12, 48), goldMat);
        base1Trim.rotation.x = Math.PI / 2; base1Trim.position.y = 0.18;
        g.add(base1, base1Trim);

        // Base Tier 2 - Violet Neon Inset Ring
        const base2 = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.0, 0.16, 40), darkObsidianMat);
        base2.position.y = 0.26;
        base2.castShadow = true; base2.receiveShadow = true;
        const neonRing = new THREE.Mesh(new THREE.TorusGeometry(3.92, 0.035, 8, 40), neonPurpleMat);
        neonRing.rotation.x = Math.PI / 2; neonRing.position.y = 0.34;
        g.add(base2, neonRing);

        // Base Tier 3 - Fluted Mahogany & Gold Turntable Stage Plinth
        const base3 = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.25, 0.38, 36), mahoganyMat);
        base3.position.y = 0.53;
        base3.castShadow = true; base3.receiveShadow = true;
        const stageGoldRing = new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.04, 8, 36), goldMat);
        stageGoldRing.rotation.x = Math.PI / 2; stageGoldRing.position.y = 0.72;
        g.add(base3, stageGoldRing);

        // 12 Vertical Gold Pilasters around Base 3
        for (let a = 0; a < 12; a++) {
          const ang = (a / 12) * Math.PI * 2;
          const colAcc = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.36, 12), goldMat);
          colAcc.position.set(Math.cos(ang) * 3.16, 0.53, Math.sin(ang) * 3.16);
          g.add(colAcc);
        }

        // Recessed Turntable Bezel Ring (Outer Chamfer)
        const bezel = new THREE.Mesh(new THREE.CylinderGeometry(2.65, 2.75, 0.08, 40), goldMat);
        bezel.position.y = 0.75;
        g.add(bezel);

        // -------------------------------------------------------------
        // 2. HORIZONTAL 3D PRIZE WHEEL ROTOR (Laying flat on the floor at Y = 0.79m)
        // -------------------------------------------------------------
        const wheelRadius = 2.45;
        const rotorGroup = new THREE.Group();
        rotorGroup.position.set(0, 0.79, 0);

        // Generate High-Res 1024x1024 Face Canvas for 12 Prize Wedges
        const wFaceCanvas = document.createElement('canvas');
        wFaceCanvas.width = 1024; wFaceCanvas.height = 1024;
        const wfCtx = wFaceCanvas.getContext('2d');
        const cx = 512, cy = 512, rad = 490;

        const wSlicesDef = [
          { lbl: '50X', sub: 'JACKPOT', bg: '#f59e0b', txt: '#000', glow: '#ffd700' },
          { lbl: '0.5X', sub: 'TRY',     bg: '#38bdf8', txt: '#fff', glow: '#0284c7' },
          { lbl: '20X', sub: 'EPIC',    bg: '#d946ef', txt: '#fff', glow: '#f43f5e' },
          { lbl: '1.5X', sub: 'WIN',     bg: '#8b5cf6', txt: '#fff', glow: '#a855f7' },
          { lbl: '3X',   sub: 'WIN',     bg: '#ef4444', txt: '#fff', glow: '#dc2626' },
          { lbl: '0X',   sub: 'MISS',    bg: '#1e1b4b', txt: '#94a3b8', glow: '#312e81' },
          { lbl: '10X',  sub: 'SUPER',   bg: '#facc15', txt: '#000', glow: '#eab308' },
          { lbl: '5X',   sub: 'BIG',     bg: '#ec4899', txt: '#fff', glow: '#db2777' },
          { lbl: '0.5X', sub: 'TRY',     bg: '#38bdf8', txt: '#fff', glow: '#0284c7' },
          { lbl: '2X',   sub: 'DOUBLE',  bg: '#10b981', txt: '#fff', glow: '#059669' },
          { lbl: '1.5X', sub: 'WIN',     bg: '#8b5cf6', txt: '#fff', glow: '#a855f7' },
          { lbl: '0X',   sub: 'MISS',    bg: '#1e1b4b', txt: '#94a3b8', glow: '#312e81' }
        ];

        const numSlices = wSlicesDef.length;
        const step = (Math.PI * 2) / numSlices;

        // Draw radial slices
        for (let i = 0; i < numSlices; i++) {
          const s = wSlicesDef[i];
          const a1 = i * step - Math.PI / 2;
          const a2 = (i + 1) * step - Math.PI / 2;

          wfCtx.beginPath();
          wfCtx.moveTo(cx, cy);
          wfCtx.arc(cx, cy, rad, a1, a2);
          wfCtx.closePath();

          // Radial slice gradient
          const grad = wfCtx.createRadialGradient(cx, cy, 60, cx, cy, rad);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.18, s.bg);
          grad.addColorStop(1, '#06030c');
          wfCtx.fillStyle = grad;
          wfCtx.fill();

          // Gold spoke divider lines
          wfCtx.strokeStyle = '#ffd700';
          wfCtx.lineWidth = 6;
          wfCtx.stroke();

          // Text labels along sector radial centerline
          const midA = a1 + step / 2;
          wfCtx.save();
          wfCtx.translate(cx, cy);
          wfCtx.rotate(midA);

          // Big Main Multiplier
          wfCtx.font = '900 64px "Segoe UI", sans-serif';
          wfCtx.textAlign = 'right';
          wfCtx.textBaseline = 'middle';
          wfCtx.fillStyle = s.txt;
          wfCtx.shadowColor = s.glow;
          wfCtx.shadowBlur = 14;
          wfCtx.fillText(s.lbl, rad - 45, -8);

          // Subtitle Badge
          wfCtx.shadowBlur = 0;
          wfCtx.font = '800 24px "Segoe UI", sans-serif';
          wfCtx.fillStyle = (s.txt === '#000') ? '#334155' : '#fde047';
          wfCtx.fillText(s.sub, rad - 52, 36);

          wfCtx.restore();
        }

        // Concentric outer gold rim & decorative star ring
        wfCtx.strokeStyle = '#d4af37';
        wfCtx.lineWidth = 14;
        wfCtx.beginPath();
        wfCtx.arc(cx, cy, rad - 8, 0, Math.PI * 2);
        wfCtx.stroke();

        wfCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        wfCtx.lineWidth = 3;
        wfCtx.beginPath();
        wfCtx.arc(cx, cy, rad - 20, 0, Math.PI * 2);
        wfCtx.stroke();

        const wFaceTex = new THREE.CanvasTexture(wFaceCanvas);

        // Horizontal 3D Wheel Cylinder Mesh (Laying completely flat facing +Y up)
        const wheelCyl = new THREE.Mesh(
          new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.12, 48),
          [
            goldMat,
            new THREE.MeshStandardMaterial({ map: wFaceTex, roughness: 0.25, metalness: 0.35 }),
            new THREE.MeshStandardMaterial({ color: 0x14081c, roughness: 0.5 })
          ]
        );
        wheelCyl.userData = { isWheelRotor: true };
        rotorGroup.add(wheelCyl);

        // Gold Torus Bevel Rim
        const rimTorus = new THREE.Mesh(new THREE.TorusGeometry(wheelRadius, 0.035, 12, 48), goldMat);
        rimTorus.rotation.x = Math.PI / 2;
        rimTorus.position.y = 0.06;
        rotorGroup.add(rimTorus);

        // 24 Real 3D Brass Rim Pegs / Pins (Standing upright along the outer rim)
        for (let p = 0; p < 24; p++) {
          const pegAng = (p / 24) * Math.PI * 2;
          const px = Math.cos(pegAng) * (wheelRadius - 0.05);
          const pz = Math.sin(pegAng) * (wheelRadius - 0.05);

          const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 10), goldMat);
          peg.position.set(px, 0.11, pz);

          const pegBall = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 10), chromeMat);
          pegBall.position.set(px, 0.17, pz);

          rotorGroup.add(peg, pegBall);
        }

        // Center Starburst Rosette & Ruby Gem
        const hubOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.10, 24), goldMat);
        hubOuter.position.y = 0.09;

        const hubInner = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.36, 0.12, 16), darkObsidianMat);
        hubInner.position.y = 0.14;

        const hubJewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 1), rubyMat);
        hubJewel.position.y = 0.24;

        rotorGroup.add(hubOuter, hubInner, hubJewel);
        g.add(rotorGroup);

        // -------------------------------------------------------------
        // 3. LUXURY 2-TIERED 16-CHIP DEALER TRAY (IDENTICAL TO BLACKJACK & POKER)
        // -------------------------------------------------------------
        const wheelChipStacks = [];
        const trayGroup = new THREE.Group();
        trayGroup.position.set(0, 0.73, 2.70);
        trayGroup.rotation.x = -0.22; // Slanted towards the seated player

        // Slanted Mahogany & Brass Tray Chassis
        const trayBody = new THREE.Mesh(
          new THREE.BoxGeometry(1.40, 0.08, 0.42),
          mahoganyMat
        );
        trayBody.castShadow = true;

        const trayTrim = new THREE.Mesh(
          new THREE.BoxGeometry(1.44, 0.03, 0.46),
          goldMat
        );
        trayTrim.position.y = 0.035;

        // Velvet Lined Inset Basin
        const trayVelvet = new THREE.Mesh(
          new THREE.BoxGeometry(1.36, 0.02, 0.38),
          new THREE.MeshStandardMaterial({ color: 0x3b0764, roughness: 0.8, metalness: 0.1 })
        );
        trayVelvet.position.y = 0.045;

        trayGroup.add(trayBody, trayTrim, trayVelvet);

        // 16 Full Luxury Chip Denominations (2 Rows of 8, exactly like Blackjack & Poker)
        // Row 1 (Back row, z = -0.10): Low stakes $0.1, $0.2, $0.5, $1, $2, $5, $10, $20
        // Row 2 (Front row, z = 0.10): High stakes $50, $100, $200, $500, $1K, $2K, $5K, $10K
        CASINO_CHIPS.forEach((cDef, cIdx) => {
          const isHighRow = cIdx >= 8;
          const col = isHighRow ? (cIdx - 8) : cIdx;
          const posX = -0.525 + col * 0.150;
          const posZ = isHighRow ? 0.10 : -0.10;

          const stack = new THREE.Group();
          stack.position.set(posX, 0.055, posZ);
          stack.userData = { chipVal: cDef.v, isWheelChipStack: true };
          stack.name = 'wheelChipStack_' + cDef.v;

          // 4 physical stacked 3D chips per slot
          const stackHeight = 4;
          for (let h = 0; h < stackHeight; h++) {
            const chipM = create3DChipSingleMesh(cDef, 0.052, 0.013);
            chipM.position.y = h * 0.014 + 0.007;
            chipM.rotation.y = (h * 0.35) % (Math.PI * 2);
            stack.add(chipM);
          }

          // Floating 3D Value Label with gold border
          const labelCanvas = document.createElement('canvas');
          labelCanvas.width = 128; labelCanvas.height = 64;
          const lCtx = labelCanvas.getContext('2d');
          lCtx.fillStyle = '#0f081d';
          if (lCtx.roundRect) lCtx.roundRect(4, 4, 120, 56, 12); else lCtx.rect(4, 4, 120, 56);
          lCtx.fill();
          lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 3; lCtx.stroke();
          lCtx.font = '900 28px "Segoe UI", Arial, sans-serif';
          lCtx.fillStyle = '#ffffff'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
          lCtx.fillText(cDef.str, 64, 32);

          const labelTex = new THREE.CanvasTexture(labelCanvas);
          const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
          labelSpr.scale.set(0.14, 0.07, 1);
          labelSpr.position.set(0, 0.115, 0);
          stack.add(labelSpr);

          trayGroup.add(stack);
          wheelChipStacks.push(stack);
        });

        g.add(trayGroup);

        // Highlight selected 3D chip in the wheel rack
        function update3DWheelChipRackSelection() {
          if (!wheelChipStacks) return;
          const curVal = (typeof window.wheelBet === 'number' && window.wheelBet > 0) ? window.wheelBet : 50;
          wheelChipStacks.forEach(stack => {
            const val = stack.userData.chipVal;
            const isSelected = (val === curVal);
            stack.position.y = isSelected ? 0.085 : 0.055;
            stack.scale.set(isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0);
          });
        }

        // -------------------------------------------------------------
        // 4. FIXED MECHANICAL CLAPPER POINTER (Pointing at North Edge)
        // -------------------------------------------------------------
        const clapperMount = new THREE.Group();
        clapperMount.position.set(0, 0.88, -wheelRadius - 0.06);

        const mountBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.16), darkObsidianMat);
        const mountTrim = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.04, 0.20), goldMat);
        mountTrim.position.y = 0.08;

        const clapperGroup = new THREE.Group();

        // Sculpted Gold Arrow Body (pointing +Z inwards to wheel center)
        const clapperArrow = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.40, 16), goldMat);
        clapperArrow.rotation.x = Math.PI / 2;
        clapperArrow.position.z = 0.20;

        // Glowing Ruby Arrowhead Point
        const clapperTip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 16), rubyMat);
        clapperTip.rotation.x = Math.PI / 2;
        clapperTip.position.z = 0.44;

        // Accent Sphere Needle Jewel
        const clapperJewel = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), chromeMat);
        clapperJewel.position.z = 0.30;

        // Downward Spotlight / Pointlight directly illuminating the active prize slice below the pointer
        const pointerLight = new THREE.PointLight(0xff0055, 1.8, 3.0);
        pointerLight.position.set(0, -0.06, 0.42);

        clapperGroup.add(clapperArrow, clapperTip, clapperJewel, pointerLight);
        clapperMount.add(mountBase, mountTrim, clapperGroup);
        g.add(clapperMount);

        // -------------------------------------------------------------
        // 4. OVERHEAD LUXURY HALO RING & WARM DOWNWARD SPOTLIGHTS
        // -------------------------------------------------------------
        // Floating circular gold halo ring above the wheel at Y = 3.6m
        const haloRing = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.045, 12, 40), goldMat);
        haloRing.rotation.x = Math.PI / 2;
        haloRing.position.y = 3.60;

        const haloNeon = new THREE.Mesh(new THREE.TorusGeometry(2.52, 0.025, 8, 40), neonPurpleMat);
        haloNeon.rotation.x = Math.PI / 2;
        haloNeon.position.y = 3.58;

        g.add(haloRing, haloNeon);

        // 4 Thin Arch Support Columns connecting halo ring to podium perimeter
        const haloAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
        haloAngles.forEach(ang => {
          const colX = Math.cos(ang) * 3.8;
          const colZ = Math.sin(ang) * 3.8;
          const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 3.5, 12), goldMat);
          pCol.position.set(colX, 1.80, colZ);

          const pBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.12, 12), darkObsidianMat);
          pBase.position.set(colX, 0.15, colZ);

          g.add(pCol, pBase);
        });

        // Store references for real-time 3D horizontal spinning
        wheel3DRefs = {
          group: g,
          rotor: rotorGroup,
          clapper: clapperGroup,
          wheelMesh: wheelCyl,
                    chipStacks: wheelChipStacks,
          update3DWheelChipRackSelection: update3DWheelChipRackSelection
        };
        window.wheel3DRefs = wheel3DRefs;

        return g;
      }

      // 12. Grand Luxury Craps & Dice Duel Table (Expanded felt tabletop with padded perimeter rails)
      function createDiceDuelPit() {
        const g = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x1a0f28, roughness: 0.35, metalness: 0.2 });
        const mahoganyMat = new THREE.MeshStandardMaterial({ color: 0x14081c, roughness: 0.4 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
        const leatherMat = new THREE.MeshStandardMaterial({ color: 0x0e0618, roughness: 0.6 });
        const bumperMat = new THREE.MeshStandardMaterial({ color: 0x1e1532, roughness: 0.8 });

        // 1. Table Legs (4 Carved Fluted Legs with Brass Feet)
        const legCoords = [[-2.15, -1.15], [2.15, -1.15], [-2.15, 1.15], [2.15, 1.15]];
        legCoords.forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.82, 16), woodMat);
          leg.position.set(lx, 0.41, lz);
          leg.castShadow = true;
          const brassFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16), goldMat);
          brassFoot.position.set(lx, 0.04, lz);
          const goldRing = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.018, 8, 20), goldMat);
          goldRing.rotation.x = Math.PI / 2; goldRing.position.set(lx, 0.72, lz);
          g.add(leg, brassFoot, goldRing);
        });

        // 2. Heavy Solid Table Base Chassis
        const baseBox = new THREE.Mesh(new THREE.BoxGeometry(4.70, 0.14, 2.70), woodMat);
        baseBox.position.set(0, 0.85, 0);
        baseBox.castShadow = true;
        const baseTrim = new THREE.Mesh(new THREE.BoxGeometry(4.76, 0.05, 2.76), goldMat);
        baseTrim.position.set(0, 0.80, 0);
        g.add(baseBox, baseTrim);

        // 3. Canvas Texture for Craps Velvet Felt (Betting grids, PASS LINE, FIELD, numbers)
        const feltCanvas = document.createElement('canvas');
        feltCanvas.width = 1024; feltCanvas.height = 512;
        const fCtx = feltCanvas.getContext('2d');
        fCtx.fillStyle = '#064e3b';
        fCtx.fillRect(0, 0, 1024, 512);

        // Grid / Inlay borders
        fCtx.strokeStyle = 'rgba(212, 175, 55, 0.75)';
        fCtx.lineWidth = 6;
        fCtx.strokeRect(20, 20, 984, 472);
        fCtx.strokeStyle = 'rgba(212, 175, 55, 0.40)';
        fCtx.lineWidth = 3;
        fCtx.strokeRect(32, 32, 960, 448);

        // Center line & VS Badge on felt
        fCtx.beginPath();
        fCtx.moveTo(512, 32); fCtx.lineTo(512, 480);
        fCtx.stroke();

        fCtx.fillStyle = 'rgba(212, 175, 55, 0.12)';
        fCtx.beginPath(); fCtx.arc(512, 256, 96, 0, Math.PI * 2); fCtx.fill();
        fCtx.strokeStyle = 'rgba(212, 175, 55, 0.6)'; fCtx.stroke();

        fCtx.fillStyle = '#fde047';
        fCtx.font = '900 38px Segoe UI'; fCtx.textAlign = 'center'; fCtx.textBaseline = 'middle';
        fCtx.fillText('⚔️ DICE DUEL ⚔️', 512, 256);

        // Left Player Area Markings (AZUL - JUGADOR 1)
        fCtx.fillStyle = 'rgba(30, 58, 138, 0.28)';
        fCtx.fillRect(50, 60, 410, 390);
        fCtx.strokeStyle = '#3b82f6';
        fCtx.lineWidth = 5;
        fCtx.strokeRect(50, 60, 410, 390);

        fCtx.fillStyle = '#60a5fa';
        fCtx.font = '900 28px Segoe UI';
        fCtx.fillText('🔵 JUGADOR 1 (AZUL)', 256, 95);
        fCtx.font = '900 52px Segoe UI'; fCtx.fillStyle = 'rgba(96, 165, 250, 0.35)';
        fCtx.fillText('FIELD 🎲', 256, 260);

        // Right Player Area Markings (ROJO - BANCA / JUGADOR 2)
        fCtx.fillStyle = 'rgba(185, 28, 28, 0.28)';
        fCtx.fillRect(564, 60, 410, 390);
        fCtx.strokeStyle = '#ef4444';
        fCtx.lineWidth = 5;
        fCtx.strokeRect(564, 60, 410, 390);

        fCtx.fillStyle = '#f87171';
        fCtx.font = '900 28px Segoe UI';
        fCtx.fillText('🔴 BANCA / J2 (ROJO)', 768, 95);
        fCtx.font = '900 52px Segoe UI'; fCtx.fillStyle = 'rgba(248, 113, 113, 0.35)';
        fCtx.fillText('FIELD 🎲', 768, 260);

        const feltTex = new THREE.CanvasTexture(feltCanvas);
        const feltMat = new THREE.MeshStandardMaterial({ map: feltTex, roughness: 0.8 });
        const tableFelt = new THREE.Mesh(new THREE.BoxGeometry(4.30, 0.02, 2.30), feltMat);
        tableFelt.position.set(0, 0.92, 0);
        tableFelt.receiveShadow = true;
        g.add(tableFelt);

        // 4. Raised Wide Outer Perimeter Wood Walls & Cushioned Leather Armrests
        const wallH = 0.32;
        const wallThickness = 0.32; // Borde exterior notablemente más ancho y robusto

        // Long Walls (Front and Back at z = +-1.34)
        [-1.34, 1.34].forEach(wz => {
          const w = new THREE.Mesh(new THREE.BoxGeometry(4.96, wallH, wallThickness), mahoganyMat);
          w.position.set(0, 0.92 + wallH / 2, wz);
          const leatherArm = new THREE.Mesh(new THREE.BoxGeometry(5.02, 0.08, wallThickness + 0.12), leatherMat);
          leatherArm.position.set(0, 0.92 + wallH + 0.04, wz);
          const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(5.04, 0.02, wallThickness + 0.14), goldMat);
          goldTrim.position.set(0, 0.92 + wallH, wz);
          g.add(w, leatherArm, goldTrim);
        });

        // Short Walls (Left and Right at x = +-2.36)
        [-2.36, 2.36].forEach(wx => {
          const w = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallH, 2.96), mahoganyMat);
          w.position.set(wx, 0.92 + wallH / 2, 0);
          const leatherArm = new THREE.Mesh(new THREE.BoxGeometry(wallThickness + 0.12, 0.08, 3.02), leatherMat);
          leatherArm.position.set(wx, 0.92 + wallH + 0.04, 0);
          const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(wallThickness + 0.14, 0.02, 3.04), goldMat);
          goldTrim.position.set(wx, 0.92 + wallH, 0);
          g.add(w, leatherArm, goldTrim);
        });

        // 5. Pyramid Rubber Bumpers on Interior Walls (Craps dice bounce backstops)
        [-2.17, 2.17].forEach(bx => {
          for (let py = 0; py < 3; py++) {
            const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.07, 2.20), bumperMat);
            bumper.position.set(bx + (bx > 0 ? -0.02 : 0.02), 0.96 + py * 0.09, 0);
            g.add(bumper);
          }
        });

        // 6. Luxury 2-Tiered Mahogany & Gold 3D Dealer Chip Box mounted ON TOP of the wide outer back rail
        const trayBase = new THREE.Mesh(
          new THREE.BoxGeometry(1.72, 0.035, 0.44),
          new THREE.MeshStandardMaterial({ color: 0x14091e, roughness: 0.4, metalness: 0.3 })
        );
        trayBase.position.set(0, 1.345, -1.34);

        const trayGoldBorder = new THREE.Mesh(
          new THREE.BoxGeometry(1.76, 0.025, 0.48),
          new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 })
        );
        trayGoldBorder.position.set(0, 1.335, -1.34);

        const trayGroup = new THREE.Group();
        trayGroup.add(trayBase, trayGoldBorder);

        const diceChipStacks = [];

        // Row 1 (Back row, z = -1.43): Low stakes $0.1, $0.2, $0.5, $1, $2, $5, $10, $20
        // Row 2 (Front row, z = -1.25): High stakes $50, $100, $200, $500, $1K, $2K, $5K, $10K
        CASINO_CHIPS.forEach((cDef, cIdx) => {
          const isHighRow = cIdx >= 8;
          const col = isHighRow ? (cIdx - 8) : cIdx;
          const posX = -0.66 + col * 0.190;
          const posZ = isHighRow ? -1.25 : -1.43;

          const stack = new THREE.Group();
          stack.position.set(posX, 1.365, posZ);
          stack.userData = { chipVal: cDef.v };
          stack.name = 'diceChipStack_' + cDef.v;

          for (let h = 0; h < 4; h++) {
            const chipM = create3DChipSingleMesh(cDef, 0.060, 0.014);
            chipM.position.y = h * 0.015 + 0.007;
            chipM.rotation.y = (h * 0.35) % (Math.PI * 2);
            stack.add(chipM);
          }

          // Floating 3D Value Label with gold border
          const labelCanvas = document.createElement('canvas');
          labelCanvas.width = 128; labelCanvas.height = 64;
          const lCtx = labelCanvas.getContext('2d');
          lCtx.fillStyle = '#0f081d';
          if (lCtx.roundRect) lCtx.roundRect(4, 4, 120, 56, 12); else lCtx.rect(4, 4, 120, 56);
          lCtx.fill();
          lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 3; lCtx.stroke();
          lCtx.font = '900 28px "Segoe UI", Arial, sans-serif';
          lCtx.fillStyle = '#ffffff'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
          lCtx.fillText(cDef.str, 64, 32);

          const labelTex = new THREE.CanvasTexture(labelCanvas);
          const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
          labelSpr.scale.set(0.16, 0.08, 1);
          labelSpr.position.set(0, 0.125, 0);
          stack.add(labelSpr);

          trayGroup.add(stack);
          diceChipStacks.push(stack);
        });
        g.add(trayGroup);

        // 7. Dedicated Betting Trays for Both Player Seats Built Directly on the Table's Front Border Rail
        const diceBetSpots = [];
        const betTrayPlates = [
          {
            x: -1.65, z: 1.34,
            label: '🔵 APUESTAS AZUL (J1) 🎲',
            pIdx: 0,
            neonColor: 0x3b82f6,
            velvetColor: 0x0f172a,
            tagColor: '#60a5fa',
            borderColor: '#3b82f6'
          },
          {
            x: 1.65, z: 1.34,
            label: '🔴 APUESTAS ROJO (J2) 🎲',
            pIdx: 1,
            neonColor: 0xef4444,
            velvetColor: 0x2d0a14,
            tagColor: '#f87171',
            borderColor: '#ef4444'
          }
        ];

        betTrayPlates.forEach(tray => {
          const trayGroup = new THREE.Group();
          trayGroup.position.set(tray.x, 1.325, tray.z);

          // Recessed wooden tray plate
          const plate = new THREE.Mesh(
            new THREE.BoxGeometry(0.72, 0.040, 0.38),
            mahoganyMat
          );
          // Golden raised lip trim
          const lip = new THREE.Mesh(
            new THREE.BoxGeometry(0.76, 0.050, 0.42),
            goldMat
          );
          lip.position.y = -0.002;
          // Emerald / Sapphire / Ruby velvet bed
          const velvetBed = new THREE.Mesh(
            new THREE.BoxGeometry(0.66, 0.012, 0.32),
            new THREE.MeshStandardMaterial({ color: tray.velvetColor, roughness: 0.75 })
          );
          velvetBed.position.y = 0.022;

          // 3D Torus Solid Raised Gold / Neon Betting Ring (elevated cleanly above the velvet bed)
          const ringMesh = new THREE.Mesh(
            new THREE.TorusGeometry(0.17, 0.014, 14, 40),
            new THREE.MeshStandardMaterial({
              color: tray.neonColor,
              emissive: tray.neonColor,
              emissiveIntensity: 2.8,
              metalness: 0.9,
              roughness: 0.15
            })
          );
          ringMesh.rotation.x = Math.PI / 2;
          ringMesh.position.set(0, 0.035, 0);

          // Outer Gold Trim Ring
          const outerRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.22, 0.008, 10, 40),
            new THREE.MeshStandardMaterial({
              color: 0xd4af37,
              emissive: 0xd4af37,
              emissiveIntensity: 0.6,
              metalness: 0.95,
              roughness: 0.15
            })
          );
          outerRing.rotation.x = Math.PI / 2;
          outerRing.position.set(0, 0.035, 0);

          // Floating 3D Label Tag with blue/red border
          const tagCanvas = document.createElement('canvas');
          tagCanvas.width = 256; tagCanvas.height = 64;
          const tCtx = tagCanvas.getContext('2d');
          tCtx.fillStyle = '#0f081d';
          if (tCtx.roundRect) tCtx.roundRect(4, 4, 248, 56, 12); else tCtx.rect(4, 4, 248, 56);
          tCtx.fill();
          tCtx.strokeStyle = tray.borderColor; tCtx.lineWidth = 4; tCtx.stroke();
          tCtx.font = '900 22px "Segoe UI", Arial, sans-serif';
          tCtx.fillStyle = tray.tagColor; tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
          tCtx.fillText(tray.label, 128, 32);

          const tagTex = new THREE.CanvasTexture(tagCanvas);
          const tagSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tagTex, depthTest: false }));
          tagSpr.scale.set(0.34, 0.085, 1);
          tagSpr.position.set(0, 0.14, 0);

          trayGroup.add(lip, plate, velvetBed, ringMesh, outerRing, tagSpr);
          g.add(trayGroup);

          // Raycastable sensor disc directly over the tray on the rail
          const spotHitMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.40, 0.40, 0.12, 16),
            new THREE.MeshBasicMaterial({ visible: false })
          );
          spotHitMesh.position.set(tray.x, 1.34, tray.z);
          spotHitMesh.userData = { isDiceBetSpot: true, playerIndex: tray.pIdx };
          g.add(spotHitMesh);
          diceBetSpots.push(spotHitMesh);
        });

        // 8. 3D Active Bet Chips Group (Mounted at rail height)
        const diceChipsGroup = new THREE.Group();
        g.add(diceChipsGroup);

        // Function to visually highlight the selected 3D chip stack in the dealer tray atop the rail
        function update3DDiceChipRackSelection() {
          if (!diceChipStacks) return;
          const curVal = (typeof dState !== 'undefined' && dState && typeof dState.selectedChip === 'number') ? dState.selectedChip : 50;
          diceChipStacks.forEach(stack => {
            const val = stack.userData.chipVal;
            const isSelected = (val === curVal);
            stack.position.y = isSelected ? 1.395 : 1.365;
            stack.scale.set(isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0);
          });
        }

        // 9. Container and 4 Persistent 3D Dice on the Table (2 Blue on Left for J1, 2 Red on Right for J2/Banca)
        const diceRollGroup = new THREE.Group();
        g.add(diceRollGroup);

        const dieP1_1 = makeDieMesh(0.336, 'blue');
        dieP1_1.position.set(-1.10, 0.92 + 0.168, 0.25);
        dieP1_1.rotation.set(0.02, 0.25, 0);

        const dieP1_2 = makeDieMesh(0.336, 'blue');
        dieP1_2.position.set(-0.75, 0.92 + 0.168, -0.25);
        dieP1_2.rotation.set(-0.03, -0.20, 0);

        const dieP2_1 = makeDieMesh(0.336, 'red');
        dieP2_1.position.set(1.10, 0.92 + 0.168, 0.25);
        dieP2_1.rotation.set(0.04, -0.30, 0);

        const dieP2_2 = makeDieMesh(0.336, 'red');
        dieP2_2.position.set(0.75, 0.92 + 0.168, -0.25);
        dieP2_2.rotation.set(-0.02, 0.22, 0);

        diceRollGroup.add(dieP1_1, dieP1_2, dieP2_1, dieP2_2);

        // 10. Overhead Warm Casino Table Light
        const tableLight = new THREE.PointLight(0x38bdf8, 2.0, 10);
        tableLight.position.set(0, 2.8, 0);
        g.add(tableLight);

        // Save reference for physics engine & 3D raycasting
        dice3DRefs = {
          group: g,
          rollGroup: diceRollGroup,
          chipsGroup: diceChipsGroup,
          chipStacks: diceChipStacks,
          betSpots: diceBetSpots,
          felt: tableFelt,
          diceMeshes: [dieP1_1, dieP1_2, dieP2_1, dieP2_2],
          boundX: 2.05,    // límite interior X ampliado de la mesa de dados
          boundZ: 1.05,    // límite interior Z ampliado de la mesa de dados
          floorY: 0.92,    // altura exacta del fieltro sobre la mesa
          update3DDiceChipRackSelection
        };

        return g;
      }

      // 13. Bar & Lounge Area (Full South Wing with Imperial Baroque Curved Bar, Grand Shelving & Lounges)
      function createBarAndLoungeArea() {
        const g = new THREE.Group();

        // --- Core Architectural Materials ---
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.15 });
        const darkGoldMat = new THREE.MeshStandardMaterial({ color: 0xb89230, metalness: 0.88, roughness: 0.22 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xe6ca65, metalness: 0.95, roughness: 0.10 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd0d5dd, metalness: 0.95, roughness: 0.10 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x160c22, roughness: 0.35, metalness: 0.20 });
        const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x0e0616, roughness: 0.45, metalness: 0.15 });
        const marbleMat = new THREE.MeshStandardMaterial({ color: 0x0a0612, roughness: 0.12, metalness: 0.40 });
        const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x1f1430, metalness: 0.95, roughness: 0.05 });
        const leatherMat = new THREE.MeshStandardMaterial({ color: 0x3d101e, roughness: 0.60, metalness: 0.10 });
        const glassMat = new THREE.MeshStandardMaterial({ color: 0xddeeff, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.10 });
        const neonPinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xf472b6, emissiveIntensity: 2.5 });
        const neonGoldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 2.0 });
        const neonAmberMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1.8 });

        // ============================================================
        // 1. THE IMPERIAL CURVED BAR COUNTER (LA GRAN BARRA DE BAR)
        // ============================================================
        const barGroup = new THREE.Group();
        const barArcAngle = Math.PI * 0.84;
        const barStartAngle = -Math.PI * 0.42;

        // A. Main Curved Body (Dark Espresso Mahogany)
        const barBaseGeo = new THREE.CylinderGeometry(6.40, 6.40, 1.12, 48, 1, false, barStartAngle, barArcAngle);
        const barBase = new THREE.Mesh(barBaseGeo, woodMat);
        barBase.position.set(0, 0.56, 0);
        barBase.receiveShadow = true;
        barGroup.add(barBase);

        // B. Lower Kick-Plate / Zocalo (Brushed Brass)
        const barKickGeo = new THREE.CylinderGeometry(6.46, 6.46, 0.12, 48, 1, false, barStartAngle, barArcAngle);
        const barKick = new THREE.Mesh(barKickGeo, brassMat);
        barKick.position.set(0, 0.06, 0);
        barGroup.add(barKick);

        // C. Vertical Fluted Luxury Golden Ribs around the Curved Front
        const numRibs = 43;
        for (let i = 0; i <= numRibs; i++) {
          const ribAng = barStartAngle + (i / numRibs) * barArcAngle;
          const rx = Math.sin(ribAng) * 6.43;
          const rz = Math.cos(ribAng) * 6.43;
          const rib = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.90, 0.06), (i % 4 === 0) ? goldMat : darkGoldMat);
          rib.position.set(rx, 0.58, rz);
          rib.rotation.y = ribAng;
          barGroup.add(rib);
        }

        // D. Under-Counter Recessed LED Light Strip
        const barNeonUnder = new THREE.Mesh(
          new THREE.TorusGeometry(6.45, 0.025, 12, 64, barArcAngle),
          neonPinkMat
        );
        barNeonUnder.rotation.x = Math.PI / 2;
        barNeonUnder.rotation.z = -barStartAngle;
        barNeonUnder.position.set(0, 1.10, 0);
        barGroup.add(barNeonUnder);

        // E. Polished Black Galaxy Nero Marquina Countertop
        const barTopGeo = new THREE.CylinderGeometry(6.75, 6.75, 0.09, 48, 1, false, barStartAngle - 0.015, barArcAngle + 0.03);
        const barTop = new THREE.Mesh(barTopGeo, marbleMat);
        barTop.position.set(0, 1.16, 0);
        barTop.castShadow = true;
        barTop.receiveShadow = true;
        barGroup.add(barTop);

        // F. Solid Polished Gold Bullnose Rim
        const barGoldRim = new THREE.Mesh(
          new THREE.TorusGeometry(6.75, 0.035, 12, 64, barArcAngle + 0.03),
          goldMat
        );
        barGoldRim.rotation.x = Math.PI / 2;
        barGoldRim.rotation.z = -barStartAngle + 0.015;
        barGoldRim.position.set(0, 1.16, 0);
        barGroup.add(barGoldRim);

        // G. Padded Leather Armrest Rail along the Front Lip
        const barArmrest = new THREE.Mesh(
          new THREE.TorusGeometry(6.65, 0.055, 12, 64, barArcAngle + 0.02),
          leatherMat
        );
        barArmrest.rotation.x = Math.PI / 2;
        barArmrest.rotation.z = -barStartAngle + 0.01;
        barArmrest.position.set(0, 1.20, 0);
        barGroup.add(barArmrest);

        // H. Heavy Brass Footrest Rail & Support Posts
        const footrestRail = new THREE.Mesh(
          new THREE.TorusGeometry(6.05, 0.038, 12, 64, barArcAngle),
          brassMat
        );
        footrestRail.rotation.x = Math.PI / 2;
        footrestRail.rotation.z = -barStartAngle;
        footrestRail.position.set(0, 0.22, 0);
        barGroup.add(footrestRail);

        const numFootPosts = 9;
        for (let p = 0; p <= numFootPosts; p++) {
          const pAng = barStartAngle + (p / numFootPosts) * barArcAngle;
          const px = Math.sin(pAng) * 6.20;
          const pz = Math.cos(pAng) * 6.20;
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.22, 12), brassMat);
          post.position.set(px, 0.11, pz);
          barGroup.add(post);
        }

        // I. Interior Bartender Service Workstations & Speed Rails
        const innerArc = Math.PI * 0.70;
        const innerStart = -Math.PI * 0.35;
        const serviceCounter = new THREE.Mesh(
          new THREE.CylinderGeometry(5.35, 5.35, 0.85, 36, 1, false, innerStart, innerArc),
          chromeMat
        );
        serviceCounter.position.set(0, 0.425, 0);
        barGroup.add(serviceCounter);

        // Dual Ice Wells & Stainless Prep Wells
        [-1.8, 1.8].forEach(ix => {
          const iceWell = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.40, 0.50), chromeMat);
          iceWell.position.set(ix, 0.86, 4.4);
          const iceCube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.15, 0.40), glassMat);
          iceCube.position.set(ix, 0.98, 4.4);
          barGroup.add(iceWell, iceCube);
        });

        // Draft Beer Tower (Columna de Grifos de Cerveza Dorada en el Centro)
        const beerTowerGroup = new THREE.Group();
        beerTowerGroup.position.set(0, 1.20, 4.85);
        const tapBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.38, 16), goldMat);
        tapBase.position.y = 0.19;
        const tapTBar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.70, 16), goldMat);
        tapTBar.rotation.z = Math.PI / 2;
        tapTBar.position.y = 0.38;
        beerTowerGroup.add(tapBase, tapTBar);

        // 3 Tap Handles with Glowing Emissive Tips
        [-0.22, 0.0, 0.22].forEach((tx, tIdx) => {
          const tapHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.012, 0.22, 12), darkWoodMat);
          tapHandle.position.set(tx, 0.49, 0);
          const tapTip = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 12), (tIdx === 1) ? neonGoldMat : neonAmberMat);
          tapTip.position.set(tx, 0.60, 0);
          const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.10, 8), chromeMat);
          spout.position.set(tx, 0.34, -0.07);
          spout.rotation.x = Math.PI / 4;
          beerTowerGroup.add(tapHandle, tapTip, spout);
        });
        barGroup.add(beerTowerGroup);

        // Professional Cocktail Shaker Sets & Jiggers
        [-1.0, 1.0].forEach((sx, sIdx) => {
          const shaker = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.24, 16), chromeMat);
          shaker.position.set(sx, 1.28, 4.90);
          const shakerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.040, 0.08, 16), goldMat);
          shakerCap.position.set(sx, 1.42, 4.90);
          const jigger = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.09, 12), chromeMat);
          jigger.position.set(sx + 0.15, 1.21, 4.95);
          barGroup.add(shaker, shakerCap, jigger);
        });

        // Dual Touchscreen POS Order Terminals (Cajas Registradoras)
        [-3.2, 3.2].forEach(px => {
          const posStand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.18, 12), darkGoldMat);
          posStand.position.set(px, 1.25, 4.0);
          const posScreen = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.03), woodMat);
          posScreen.position.set(px, 1.40, 4.0);
          posScreen.rotation.x = -0.35;
          const posDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.18), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
          posDisplay.position.set(px, 1.40, 3.98);
          posDisplay.rotation.x = -0.35;
          barGroup.add(posStand, posScreen, posDisplay);
        });

        g.add(barGroup);

        // ============================================================
        // 2. THE GRAND BACK-BAR SHELF (ESTANTERIA DE LICORES IMPERIAL)
        // ============================================================
        const shelfGroup = new THREE.Group();
        shelfGroup.position.set(0, 0, -3.40);

        // A. Grand Base Cabinet / Credenza (Dark Walnut & Gold Trims)
        const credenza = new THREE.Mesh(new THREE.BoxGeometry(11.60, 1.10, 0.85), darkWoodMat);
        credenza.position.set(0, 0.55, 0);
        credenza.castShadow = true;
        credenza.receiveShadow = true;

        const credenzaTop = new THREE.Mesh(new THREE.BoxGeometry(11.80, 0.08, 0.95), marbleMat);
        credenzaTop.position.set(0, 1.14, 0);

        const credenzaGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(11.82, 0.03, 0.96), goldMat);
        credenzaGoldTrim.position.set(0, 1.14, 0);
        shelfGroup.add(credenza, credenzaTop, credenzaGoldTrim);

        // 8 Credenza Cabinet Doors with Gold Trim Framing & Handles
        for (let d = 0; d < 8; d++) {
          const dx = -5.0 + d * 1.42;
          const door = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.88, 0.04), woodMat);
          door.position.set(dx, 0.55, 0.44);
          const doorTrim = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.76, 0.02), darkGoldMat);
          doorTrim.position.set(dx, 0.55, 0.46);
          const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 12), goldMat);
          handle.position.set(dx + 0.45, 0.55, 0.49);
          shelfGroup.add(door, doorTrim, handle);
        }

        // B. 4 Monumental Corinthian / Baroque Fluted Pilasters
        const pilasterPositions = [-5.70, -1.90, 1.90, 5.70];
        pilasterPositions.forEach(px => {
          // Base Plinth
          const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.35, 0.48), darkGoldMat);
          plinth.position.set(px, 1.32, 0.20);

          // Fluted Column Shaft
          const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.36, 3.10, 0.36), woodMat);
          shaft.position.set(px, 3.00, 0.20);

          // Vertical Gold Ribs on Pilasters
          [-0.10, 0.0, 0.10].forEach(ox => {
            const flute = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.90, 0.02), goldMat);
            flute.position.set(px + ox, 3.00, 0.39);
            shelfGroup.add(flute);
          });

          // Sculpted Gold Capital
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.30, 0.52), goldMat);
          cap.position.set(px, 4.60, 0.20);
          shelfGroup.add(plinth, shaft, cap);
        });

        // C. Smoky Mirrored Back-Panels with Gold Geometric Grids
        const mirrorPanel1 = new THREE.Mesh(new THREE.BoxGeometry(11.20, 3.40, 0.05), mirrorMat);
        mirrorPanel1.position.set(0, 2.85, -0.15);
        shelfGroup.add(mirrorPanel1);

        // Gold Grid Astragals on Mirrors
        for (let gx = -4.5; gx <= 4.5; gx += 1.5) {
          const vGrid = new THREE.Mesh(new THREE.BoxGeometry(0.025, 3.35, 0.02), goldMat);
          vGrid.position.set(gx, 2.85, -0.12);
          shelfGroup.add(vGrid);
        }

        // D. 3 Continuous Tiered Tempered Glass Shelves with LED Back-Glow
        const shelfLevels = [
          { y: 1.80, depth: 0.52, width: 11.20 },
          { y: 2.65, depth: 0.46, width: 11.20 },
          { y: 3.50, depth: 0.40, width: 11.20 }
        ];

        shelfLevels.forEach((lvl, idx) => {
          // Tempered Glass Shelf Plate
          const shelfMesh = new THREE.Mesh(new THREE.BoxGeometry(lvl.width, 0.04, lvl.depth), glassMat);
          shelfMesh.position.set(0, lvl.y, 0.15);

          // Polished Brass Front Guard Rail (Barandilla de Seguridad de Laton)
          const frontRail = new THREE.Mesh(new THREE.BoxGeometry(lvl.width + 0.10, 0.06, 0.03), goldMat);
          frontRail.position.set(0, lvl.y + 0.04, 0.15 + lvl.depth / 2);

          // LED Under-Shelf Light Channel
          const ledStrip = new THREE.Mesh(
            new THREE.BoxGeometry(lvl.width, 0.02, 0.03),
            (idx === 0) ? neonGoldMat : ((idx === 1) ? neonAmberMat : neonPinkMat)
          );
          ledStrip.position.set(0, lvl.y - 0.02, 0.15);

          shelfGroup.add(shelfMesh, frontRail, ledStrip);
        });

        // E. Grand Royal Baroque Architrave, Crown Crest & Neon Plaque
        const architrave = new THREE.Mesh(new THREE.BoxGeometry(12.00, 0.45, 0.70), woodMat);
        architrave.position.set(0, 4.85, 0.20);
        const architraveGold = new THREE.Mesh(new THREE.BoxGeometry(12.10, 0.08, 0.75), goldMat);
        architraveGold.position.set(0, 5.08, 0.20);
        shelfGroup.add(architrave, architraveGold);

        // Royal Crown Crest at Peak
        const crownCrest = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.40, 0.45, 16), goldMat);
        crownCrest.position.set(0, 5.35, 0.20);
        const crownOrb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), neonGoldMat);
        crownOrb.position.set(0, 5.70, 0.20);
        shelfGroup.add(crownCrest, crownOrb);

        // Glowing Neon Sign: "MIDNIGHT LOUNGE & BAR"
        const barSignCanvas = document.createElement('canvas');
        barSignCanvas.width = 512; barSignCanvas.height = 128;
        const bsCtx = barSignCanvas.getContext('2d');
        bsCtx.fillStyle = '#0a0515'; bsCtx.fillRect(0, 0, 512, 128);
        bsCtx.strokeStyle = '#d4af37'; bsCtx.lineWidth = 6; bsCtx.strokeRect(8, 8, 496, 112);
        bsCtx.font = '900 36px Segoe UI, Arial';
        bsCtx.fillStyle = '#f472b6'; bsCtx.textAlign = 'center';
        bsCtx.fillText('MIDNIGHT LOUNGE', 256, 54);
        bsCtx.font = '700 24px Segoe UI, Arial';
        bsCtx.fillStyle = '#fbbf24';
        bsCtx.fillText('ROYAL CASINO BAR', 256, 95);
        const barSignTex = new THREE.CanvasTexture(barSignCanvas);
        const barSignMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.90), new THREE.MeshBasicMaterial({ map: barSignTex }));
        barSignMesh.position.set(0, 4.85, 0.58);
        shelfGroup.add(barSignMesh);

        // F. Rich 70+ Premium Liquor Bottle Collection (Multi-Color & Cut-Crystal Silhouettes)
        const bottlePalettes = [
          { name: 'whiskey', color: 0xd97706, emissive: 0xb45309, cap: 0xd4af37 },
          { name: 'champagne', color: 0x064e3b, emissive: 0x047857, cap: 0xd4af37 },
          { name: 'wine_red', color: 0x881337, emissive: 0x9f1239, cap: 0x4c0519 },
          { name: 'vodka_blue', color: 0x0284c7, emissive: 0x38bdf8, cap: 0xd0d5dd },
          { name: 'gin_cyan', color: 0x0d9488, emissive: 0x2dd4bf, cap: 0xd0d5dd },
          { name: 'cognac', color: 0x92400e, emissive: 0xd97706, cap: 0xd4af37 },
          { name: 'rose', color: 0xdb2777, emissive: 0xf472b6, cap: 0xd4af37 }
        ];

        shelfLevels.forEach((lvl, sIdx) => {
          for (let b = 0; b < 26; b++) {
            const bx = -5.0 + b * 0.40;
            // Skip space where pilasters stand
            if (Math.abs(bx - (-1.90)) < 0.28 || Math.abs(bx - 1.90) < 0.28) continue;

            const bStyle = bottlePalettes[(b * 3 + sIdx * 2) % bottlePalettes.length];
            const bMat = new THREE.MeshStandardMaterial({
              color: bStyle.color,
              emissive: bStyle.emissive,
              emissiveIntensity: 0.65,
              roughness: 0.15,
              metalness: 0.30
            });
            const capMat = new THREE.MeshStandardMaterial({ color: bStyle.cap, metalness: 0.90, roughness: 0.20 });

            // Varied silhouettes: Square decanter vs Cylindrical Champagne vs Tall Vodka
            const type = (b + sIdx) % 3;
            if (type === 0) {
              // Square Crystal Decanter (Whiskey / Cognac)
              const body = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.24, 0.11), bMat);
              body.position.set(bx, lvl.y + 0.14, 0.15);
              const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.09, 12), bMat);
              neck.position.set(bx, lvl.y + 0.30, 0.15);
              const stopper = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), capMat);
              stopper.position.set(bx, lvl.y + 0.37, 0.15);
              shelfGroup.add(body, neck, stopper);
            } else if (type === 1) {
              // Tall Champagne / Wine Bottle with Sloping Neck
              const body = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 0.26, 16), bMat);
              body.position.set(bx, lvl.y + 0.15, 0.15);
              const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.040, 0.14, 16), bMat);
              neck.position.set(bx, lvl.y + 0.34, 0.15);
              const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.06, 12), capMat);
              cap.position.set(bx, lvl.y + 0.42, 0.15);
              shelfGroup.add(body, neck, cap);
            } else {
              // Premium Vodka / Gin Cylindrical Bottle
              const body = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.30, 16), bMat);
              body.position.set(bx, lvl.y + 0.17, 0.15);
              const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.08, 16), bMat);
              neck.position.set(bx, lvl.y + 0.35, 0.15);
              const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.04, 12), capMat);
              cap.position.set(bx, lvl.y + 0.40, 0.15);
              shelfGroup.add(body, neck, cap);
            }
          }
        });

        // G. Suspended Overhead Glassware Stemware Racks (Copero Colgante)
        const stemwareRack = new THREE.Mesh(new THREE.BoxGeometry(10.80, 0.03, 0.45), goldMat);
        stemwareRack.position.set(0, 4.05, 0.35);
        shelfGroup.add(stemwareRack);

        for (let gIdx = 0; gIdx < 32; gIdx++) {
          const gx = -4.8 + gIdx * 0.31;
          if (Math.abs(gx - (-1.90)) < 0.25 || Math.abs(gx - 1.90) < 0.25) continue;
          // Inverted Wine / Martini Glass Hanging
          const glassStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8), glassMat);
          glassStem.position.set(gx, 3.96, 0.35);
          const glassBowl = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.09, 12, 1, true), glassMat);
          glassBowl.rotation.x = Math.PI;
          glassBowl.position.set(gx, 3.86, 0.35);
          shelfGroup.add(glassStem, glassBowl);
        }

        // H. Warm Atmospheric Point Light for the Bar Center
        const barLight = new THREE.PointLight(0xffecd1, 0.85, 14);
        barLight.position.set(0, 2.80, 1.20);
        shelfGroup.add(barLight);

        g.add(shelfGroup);

        // ============================================================
        // 3. WEST LOUNGE: VIP L-SECTIONALS & COCKTAIL TABLES
        // ============================================================
        const westLounge1 = createSectionalSofaLounge(6.5, 5.5, 0);
        westLounge1.position.set(-18.0, 0, 1.5);
        const westLounge2 = createSectionalSofaLounge(5.5, 4.5, Math.PI / 2);
        westLounge2.position.set(-22.0, 0, 7.0);
        const tWest1 = createVipCocktailTable(4, 0x221338); tWest1.position.set(-14.0, 0, 2.5);
        const tWest2 = createVipCocktailTable(4, 0x221338); tWest2.position.set(-11.0, 0, 6.5);
        g.add(westLounge1, westLounge2, tWest1, tWest2);

        // ============================================================
        // 4. GRAND ENTRANCE PORTAL & CASINO ENTRANCE FOYER
        // ============================================================
        const entPillarL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.5, 1.6), woodMat);
        entPillarL.position.set(-5.5, 3.25, 13.5);
        const entPillarR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.5, 1.6), woodMat);
        entPillarR.position.set(5.5, 3.25, 13.5);
        const entArch = new THREE.Mesh(new THREE.BoxGeometry(12.6, 1.6, 1.8), woodMat);
        entArch.position.set(0, 6.6, 13.5);

        const entCanvas = document.createElement('canvas'); entCanvas.width = 512; entCanvas.height = 128;
        const eCtx = entCanvas.getContext('2d');
        eCtx.fillStyle = '#0f081d'; eCtx.fillRect(0, 0, 512, 128);
        eCtx.strokeStyle = '#e11fd1'; eCtx.lineWidth = 6; eCtx.strokeRect(10, 10, 492, 108);
        eCtx.font = '900 48px Segoe UI'; eCtx.fillStyle = '#f472b6'; eCtx.textAlign = 'center';
        eCtx.fillText('ENTRADA', 256, 74);
        const entTex = new THREE.CanvasTexture(entCanvas);
        const entSign = new THREE.Mesh(new THREE.PlaneGeometry(6.0, 1.4), new THREE.MeshBasicMaterial({ map: entTex }));
        entSign.position.set(0, 6.6, 12.55);
        entSign.rotation.y = Math.PI;

        const carpet = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 10.5),
          new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 }));
        carpet.rotation.x = -Math.PI / 2; carpet.position.set(0, 0.02, 11.5);

        g.add(entPillarL, entPillarR, entArch, entSign, carpet);

        // Entrance Palms and Golden Lamp Posts
        const p1 = createCasinoPalmTree(); p1.position.set(-7.5, 0, 11.5);
        const p2 = createCasinoPalmTree(); p2.position.set(7.5, 0, 11.5);
        const l1 = createGoldenLampPost(); l1.position.set(-6.0, 0, 10.0);
        const l2 = createGoldenLampPost(); l2.position.set(6.0, 0, 10.0);
        g.add(p1, p2, l1, l2);

        // 3D Classic Retro 1950s Jukebox (Gramola Spotify)
        const jukebox = create3DJukebox();
        jukebox.position.set(11.8, 0, 12.0);
        jukebox.rotation.y = Math.PI;
        g.add(jukebox);

        return g;
      }

      // 13.5. Luxury 3D Mines Arcade Table (5x5 interactive physical tiles)
      function create3DMinesTable() {
        const tableGroup = new THREE.Group();
        minesTileMeshes = [];

        // 1. Luxury Metallic Table Base & Gold Trim
        const tableMat = new THREE.MeshStandardMaterial({
          color: 0x140a28,
          metalness: 0.85,
          roughness: 0.20
        });
        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.95,
          roughness: 0.10
        });
        const feltMat = new THREE.MeshStandardMaterial({
          color: 0x1e1035,
          roughness: 0.40,
          metalness: 0.15
        });

        // 4 Sleek Table Legs
        [[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.76, 16), goldMat);
          leg.position.set(lx, 0.38, lz);
          tableGroup.add(leg);
        });

        // Table Top Main Surface
        const tabletop = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.12, 3.4), tableMat);
        tabletop.position.y = 0.76;
        const tabletopGoldRim = new THREE.Mesh(new THREE.BoxGeometry(3.46, 0.04, 3.46), goldMat);
        tabletopGoldRim.position.y = 0.78;
        const feltSurface = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.02, 3.1), feltMat);
        feltSurface.position.y = 0.83;

        // Glowing Purple/Red Neon Perimeter Rim on Table
        const tableNeon = new THREE.Mesh(
          new THREE.BoxGeometry(3.2, 0.02, 3.2),
          new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.8 })
        );
        tableNeon.position.y = 0.825;

        tableGroup.add(tabletop, tabletopGoldRim, tableNeon, feltSurface);

        // 2. 5x5 Physical 3D Interactive Tiles Grid (25 tiles on table)
        const gridSize = 5;
        const tileSize = 0.46;
        const spacing = 0.54;
        const startOffset = -((gridSize - 1) * spacing) / 2;

        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            const idx = row * gridSize + col;
            const tileX = startOffset + col * spacing;
            const tileZ = startOffset + row * spacing;

            const tileMat = new THREE.MeshStandardMaterial({
              color: 0x241a3d,
              emissive: 0x8b5cf6,
              emissiveIntensity: 0.25,
              metalness: 0.6,
              roughness: 0.25
            });
            const tileMesh = new THREE.Mesh(new THREE.BoxGeometry(tileSize, 0.06, tileSize), tileMat);
            tileMesh.position.set(tileX, 0.87, tileZ);
            tileMesh.userData = {
              mineIdx: idx,
              baseY: 0.87,
              revealed: false,
              icon: null
            };

            const tileGoldEdge = new THREE.Mesh(
              new THREE.BoxGeometry(tileSize + 0.02, 0.015, tileSize + 0.02),
              goldMat
            );
            tileGoldEdge.position.y = 0.028;
            tileMesh.add(tileGoldEdge);

            tableGroup.add(tileMesh);
            minesTileMeshes.push(tileMesh);
          }
        }

        // 3. Floating 3D Holographic Title Sign
        const titleCanvas = document.createElement('canvas');
        titleCanvas.width = 512; titleCanvas.height = 128;
        const tCtx = titleCanvas.getContext('2d');
        tCtx.fillStyle = 'rgba(15, 8, 30, 0.92)';
        if (tCtx.roundRect) tCtx.roundRect(8, 8, 496, 112, 18); else tCtx.rect(8, 8, 496, 112);
        tCtx.fill();
        tCtx.strokeStyle = '#ef4444'; tCtx.lineWidth = 5; tCtx.stroke();
        tCtx.font = '900 38px "Segoe UI", Arial, sans-serif';
        tCtx.fillStyle = '#ef4444'; tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
        tCtx.fillText('💣 MINES ARCADE 💣', 256, 44);
        tCtx.font = '700 22px "Segoe UI", Arial, sans-serif';
        tCtx.fillStyle = '#fde047';
        tCtx.fillText('Haz clic en las fichas 3D para jugar', 256, 88);

        const titleTex = new THREE.CanvasTexture(titleCanvas);
        const titleSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: titleTex, depthTest: false }));
        titleSpr.scale.set(2.4, 0.6, 1);
        titleSpr.position.set(0, 2.4, 0);
        tableGroup.add(titleSpr);

        tableGroup.position.y = 0.35;
        return tableGroup;
      }

      // 14. Classic Retro 1950s Wurlitzer Jukebox (Gramola Spotify)
      function create3DJukebox() {
        const juke = new THREE.Group();

        // High-end materials
        const walnutWoodMat = new THREE.MeshStandardMaterial({
          color: 0x220c04, // Deep rich polished dark walnut / mahogany
          roughness: 0.25,
          metalness: 0.15,
          side: THREE.DoubleSide
        });
        const interiorWallMat = new THREE.MeshStandardMaterial({
          color: 0x2e1408, // Interior chamber wood finish
          roughness: 0.35,
          metalness: 0.12,
          side: THREE.DoubleSide
        });
        const amberGlowMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xd97706,
          emissiveIntensity: 1.8,
          roughness: 0.30
        });
        const chromeMat = new THREE.MeshStandardMaterial({
          color: 0xf8fafc, // Mirror-finish Polished Chrome
          metalness: 0.98,
          roughness: 0.05
        });
        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xd4af37, // Royal Polished Gold
          metalness: 0.95,
          roughness: 0.10
        });
        const rubyMat = new THREE.MeshStandardMaterial({
          color: 0xef4444, // Glowing Ruby Indicator
          emissive: 0xdc2626,
          emissiveIntensity: 1.8,
          metalness: 0.25,
          roughness: 0.08
        });
        const vinylMat = new THREE.MeshStandardMaterial({
          color: 0x0a0a0e, // Vinyl record black with sheen
          roughness: 0.20,
          metalness: 0.60
        });
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.22,
          roughness: 0.02,
          metalness: 0.20
        });

        // Dynamic multi-color neon materials for pulsing lighting
        const neonRainbowPink = new THREE.MeshStandardMaterial({
          color: 0xf472b6,
          emissive: 0xec4899,
          emissiveIntensity: 2.8
        });
        const neonRainbowAmber = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xf59e0b,
          emissiveIntensity: 2.8
        });

        // 1. Hollow Arched Cabinet Structure
        // A. Solid 3D Back Wooden Wall (depth 0.04m at z = -0.30)
        const backShape = new THREE.Shape();
        backShape.moveTo(-0.58, 0);
        backShape.lineTo(-0.58, 1.16);
        backShape.absarc(0, 1.16, 0.58, Math.PI, 0, true);
        backShape.lineTo(0.58, 0);
        backShape.closePath();

        const backWall = new THREE.Mesh(
          new THREE.ExtrudeGeometry(backShape, { depth: 0.04, bevelEnabled: false }),
          walnutWoodMat
        );
        backWall.position.set(0, 0.04, -0.30);
        backWall.castShadow = true; backWall.receiveShadow = true;
        juke.add(backWall);

        // B. Left and Right Exterior Side Walls (depth: 0.58m from z = -0.28 to +0.30)
        [-0.58, 0.58].forEach(sx => {
          const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.16, 0.58), walnutWoodMat);
          sideWall.position.set(sx > 0 ? (sx - 0.02) : (sx + 0.02), 0.62, 0.01);
          sideWall.castShadow = true;
          juke.add(sideWall);
        });

        // C. Arched Roof Canopy (Extruded Arch Strip spanning from z = -0.28 to +0.30)
        const roofShape = new THREE.Shape();
        roofShape.absarc(0, 1.16, 0.58, Math.PI, 0, true);
        roofShape.lineTo(0.54, 1.16);
        roofShape.absarc(0, 1.16, 0.54, 0, Math.PI, false);
        roofShape.lineTo(-0.58, 1.16);

        const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 0.58, bevelEnabled: false });
        const roofMesh = new THREE.Mesh(roofGeo, walnutWoodMat);
        roofMesh.position.set(0, 0.04, -0.28);
        juke.add(roofMesh);

        // D. Interior Turntable Floor Shelf (at y = 0.94, depth from z = -0.26 to +0.28)
        const shelfMesh = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.04, 0.54), interiorWallMat);
        shelfMesh.position.set(0, 0.94, 0.01);
        juke.add(shelfMesh);

        // E. Lower Front Solid Wooden Facade (from y = 0.04 to y = 0.92, at z = 0.30)
        const lowerFront = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.88, 0.03), walnutWoodMat);
        lowerFront.position.set(0, 0.48, 0.30);
        juke.add(lowerFront);

        // F. Upper Front Arched Frame Face (Window Opening of radius 0.46m)
        const frontFrameShape = new THREE.Shape();
        frontFrameShape.moveTo(-0.58, 0.92);
        frontFrameShape.lineTo(-0.58, 1.16);
        frontFrameShape.absarc(0, 1.16, 0.58, Math.PI, 0, true);
        frontFrameShape.lineTo(0.58, 0.92);
        frontFrameShape.lineTo(-0.58, 0.92);

        const windowHole = new THREE.Path();
        windowHole.moveTo(-0.46, 0.95);
        windowHole.lineTo(-0.46, 1.16);
        windowHole.absarc(0, 1.16, 0.46, Math.PI, 0, true);
        windowHole.lineTo(0.46, 0.95);
        windowHole.lineTo(-0.46, 0.95);
        frontFrameShape.holes.push(windowHole);

        const frontFrameMesh = new THREE.Mesh(new THREE.ShapeGeometry(frontFrameShape), walnutWoodMat);
        frontFrameMesh.position.set(0, 0.04, 0.30);
        juke.add(frontFrameMesh);

        // 2. Base Plinth & Chrome Corner Bracket Feet
        const basePlinth = new THREE.Mesh(
          new THREE.BoxGeometry(1.24, 0.06, 0.64),
          new THREE.MeshStandardMaterial({ color: 0x120703, roughness: 0.7 })
        );
        basePlinth.position.set(0, 0.03, 0.01);

        const baseGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.015, 0.66), goldMat);
        baseGoldTrim.position.set(0, 0.06, 0.01);

        juke.add(basePlinth, baseGoldTrim);

        [[-0.56, -0.27], [0.56, -0.27], [-0.56, 0.29], [0.56, 0.29]].forEach(([fx, fz]) => {
          const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.030, 0.06, 12), chromeMat);
          foot.position.set(fx, 0.03, fz);
          juke.add(foot);
        });

        // 3. INSIDE THE HOLLOW CHAMBER (Deep Interior Machinery & Lighting)
        // Interior Rear Wall Panel in rich mahogany with Art-Deco golden sunburst mirror
        const innerWallPanel = new THREE.Mesh(
          new THREE.PlaneGeometry(0.92, 0.50),
          interiorWallMat
        );
        innerWallPanel.position.set(0, 1.26, -0.255);
        juke.add(innerWallPanel);

        // Golden Art-Deco Arched Mirror Frame on the back wall
        const mirrorFrame = new THREE.Mesh(
          new THREE.TorusGeometry(0.38, 0.018, 12, 32, Math.PI),
          goldMat
        );
        mirrorFrame.position.set(0, 1.22, -0.250);
        juke.add(mirrorFrame);

        // Top Warm Amber Canopy Light Bar
        const topAmberBar = new THREE.Mesh(
          new THREE.BoxGeometry(0.72, 0.025, 0.04),
          amberGlowMat
        );
        topAmberBar.position.set(0, 1.62, -0.15);
        juke.add(topAmberBar);

        // High-contrast vintage vinyl record center label texture (makes spin animation 100% visible)
        const labelCanvas = document.createElement('canvas');
        labelCanvas.width = 256; labelCanvas.height = 256;
        const lCtx = labelCanvas.getContext('2d');
        lCtx.fillStyle = '#dc2626'; // Retro red
        lCtx.beginPath(); lCtx.arc(128, 128, 124, 0, Math.PI * 2); lCtx.fill();
        lCtx.strokeStyle = '#fde047'; lCtx.lineWidth = 10; lCtx.stroke(); // Gold border
        // Two contrasting dark quadrants
        lCtx.fillStyle = '#0f172a';
        lCtx.beginPath(); lCtx.moveTo(128, 128); lCtx.arc(128, 128, 114, 0, Math.PI * 0.5); lCtx.closePath(); lCtx.fill();
        lCtx.beginPath(); lCtx.moveTo(128, 128); lCtx.arc(128, 128, 114, Math.PI, Math.PI * 1.5); lCtx.closePath(); lCtx.fill();
        // Spindle center ring & star
        lCtx.fillStyle = '#f8fafc'; lCtx.beginPath(); lCtx.arc(128, 128, 22, 0, Math.PI * 2); lCtx.fill();
        lCtx.font = '900 44px sans-serif'; lCtx.fillStyle = '#fbbf24'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
        lCtx.fillText('★', 128, 128);
        const vinylLabelTex = new THREE.CanvasTexture(labelCanvas);

        // Turntable Deck Base (Fixed tilted base at y = 1.04, z = 0.03)
        const turntableDeck = new THREE.Group();
        turntableDeck.position.set(0, 1.04, 0.03);
        turntableDeck.rotation.x = 0.25; // Gentle tilt forward towards the viewer

        const turntableBasePlate = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.34, 0.03, 32),
          new THREE.MeshStandardMaterial({ color: 0x180f08, metalness: 0.5, roughness: 0.3 })
        );
        turntableBasePlate.position.y = -0.015;
        turntableDeck.add(turntableBasePlate);

        // Spinning Vinyl Disc Subgroup (Rotates smoothly on its own local Y-axis without wobbling)
        const vinylDiscGroup = new THREE.Group();
        vinylDiscGroup.position.set(0, 0.015, 0);

        const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.014, 36), chromeMat);
        platter.position.y = 0.007;

        const vinylRecord = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.010, 36), vinylMat);
        vinylRecord.position.y = 0.014;

        // Vinyl Grooves Texture Ring
        const vinylRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.16, 0.008, 8, 32),
          new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.2 })
        );
        vinylRing.rotation.x = Math.PI / 2;
        vinylRing.position.y = 0.018;

        // Vinyl High-Contrast Center Label
        const vinylLabel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.09, 0.012, 32),
          new THREE.MeshStandardMaterial({ map: vinylLabelTex, roughness: 0.3 })
        );
        vinylLabel.position.y = 0.020;

        // Center Chrome Spindle Pin
        const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.040, 12), chromeMat);
        spindle.position.y = 0.032;

        vinylDiscGroup.add(platter, vinylRecord, vinylRing, vinylLabel, spindle);
        turntableDeck.add(vinylDiscGroup);
        juke.add(turntableDeck);

        // Articulated Silver Chrome Tonearm with Stylus Needle inside the cavity (resting on vinyl)
        const tonearmBase = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.035, 12), chromeMat);
        tonearmBase.position.set(0.18, 1.14, -0.03);
        const tonearmRod = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.22, 8), chromeMat);
        tonearmRod.rotation.z = -1.15;
        tonearmRod.rotation.x = 0.20;
        tonearmRod.position.set(0.10, 1.12, 0.03);
        const tonearmHead = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.016, 0.045), rubyMat);
        tonearmHead.position.set(0.02, 1.09, 0.07);

        juke.add(tonearmBase, tonearmRod, tonearmHead);

        // Dedicated Internal Chamber Point Light (Illuminates the record from inside)
        const innerSpot = new THREE.PointLight(0xffb703, 3.2, 3.5);
        innerSpot.position.set(0, 1.45, 0.05);
        juke.add(innerSpot);

        // 4. FRONT ARCHED WINDOW GLASS (Crystal-clear transparent dome on front opening)
        const windowGlassShape = new THREE.Shape();
        windowGlassShape.moveTo(-0.46, 0.95);
        windowGlassShape.lineTo(-0.46, 1.16);
        windowGlassShape.absarc(0, 1.16, 0.46, Math.PI, 0, true);
        windowGlassShape.lineTo(0.46, 0.95);
        windowGlassShape.closePath();

        const frontGlass = new THREE.Mesh(new THREE.ShapeGeometry(windowGlassShape), glassMat);
        frontGlass.position.set(0, 0.04, 0.305);
        juke.add(frontGlass);

        // 5. FRONT FACADE EXTERIOR DECORATIONS (Bezel, Neons, Keyboard, Grille, Bubble Columns)
        // Outer Arch Chrome Bezel
        const chromeArchTrim = new THREE.Mesh(
          new THREE.TorusGeometry(0.56, 0.035, 16, 40, Math.PI),
          chromeMat
        );
        chromeArchTrim.position.set(0, 1.20, 0.315);

        // Glowing Rainbow Neon Tubes
        const neonArchL = new THREE.Mesh(
          new THREE.TorusGeometry(0.51, 0.028, 12, 28, Math.PI * 0.52),
          neonRainbowPink
        );
        neonArchL.rotation.z = Math.PI * 0.48;
        neonArchL.position.set(0, 1.20, 0.32);

        const neonArchR = new THREE.Mesh(
          new THREE.TorusGeometry(0.51, 0.028, 12, 28, Math.PI * 0.52),
          neonRainbowAmber
        );
        neonArchR.rotation.z = 0;
        neonArchR.position.set(0, 1.20, 0.32);

        // Top Art-Deco Chrome Crown & Faceted Ruby Gem Peak
        const crestCrown = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.15, 4), chromeMat);
        crestCrown.position.set(0, 1.82, 0.325);
        const crestRuby = new THREE.Mesh(new THREE.OctahedronGeometry(0.040, 0), rubyMat);
        crestRuby.position.set(0, 1.80, 0.335);

        juke.add(chromeArchTrim, neonArchL, neonArchR, crestCrown, crestRuby);

        // Middle Song Selector Keyboard & Title Strips Panel (at y = 0.88, z = 0.32)
        const selectorBox = new THREE.Mesh(
          new THREE.BoxGeometry(0.90, 0.18, 0.04),
          new THREE.MeshStandardMaterial({ color: 0xdf7a18, roughness: 0.3, emissive: 0xb45309, emissiveIntensity: 0.45 })
        );
        selectorBox.position.set(0, 0.88, 0.32);

        for (let r = 0; r < 4; r++) {
          const louverY = 0.82 + (r * 0.040);
          const louverBar = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.010, 0.015), chromeMat);
          louverBar.position.set(0, louverY, 0.345);
          juke.add(louverBar);

          const btnL = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), rubyMat);
          btnL.position.set(-0.36, louverY, 0.345);
          const btnR = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), rubyMat);
          btnR.position.set(0.36, louverY, 0.345);
          juke.add(btnL, btnR);
        }
        juke.add(selectorBox);

        // Lower Speaker Acoustic Mesh Grille & Inverted U-Neon Tube (at y = 0.44, z = 0.315)
        const speakerBack = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.52), new THREE.MeshStandardMaterial({ color: 0x080410, roughness: 0.9 }));
        speakerBack.position.set(0, 0.44, 0.315);

        const grillCanvas = document.createElement('canvas'); grillCanvas.width = 128; grillCanvas.height = 128;
        const gCtx = grillCanvas.getContext('2d');
        gCtx.fillStyle = '#0e0618'; gCtx.fillRect(0, 0, 128, 128);
        gCtx.strokeStyle = '#e2e8f0'; gCtx.lineWidth = 3;
        for (let i = -128; i <= 256; i += 32) {
          gCtx.beginPath(); gCtx.moveTo(i, 0); gCtx.lineTo(i + 128, 128); gCtx.stroke();
          gCtx.beginPath(); gCtx.moveTo(i + 128, 0); gCtx.lineTo(i, 128); gCtx.stroke();
        }
        const grillTex = new THREE.CanvasTexture(grillCanvas);
        grillTex.wrapS = grillTex.wrapT = THREE.RepeatWrapping;
        grillTex.repeat.set(4, 4);

        const speakerGrille = new THREE.Mesh(
          new THREE.PlaneGeometry(0.62, 0.50),
          new THREE.MeshStandardMaterial({ map: grillTex, roughness: 0.45, metalness: 0.35 })
        );
        speakerGrille.position.set(0, 0.44, 0.32);

        const uNeonTube = new THREE.Mesh(
          new THREE.TorusGeometry(0.20, 0.024, 12, 28, Math.PI),
          neonRainbowPink
        );
        uNeonTube.rotation.z = Math.PI;
        uNeonTube.position.set(0, 0.40, 0.33);

        const uNeonL = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.30, 12), neonRainbowPink);
        uNeonL.position.set(-0.20, 0.55, 0.33);
        const uNeonR = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.30, 12), neonRainbowPink);
        uNeonR.position.set(0.20, 0.55, 0.33);

        const badgeOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 24), goldMat);
        badgeOuter.rotation.x = Math.PI / 2;
        badgeOuter.position.set(0, 0.26, 0.335);

        const badgeInner = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.022, 24), rubyMat);
        badgeInner.rotation.x = Math.PI / 2;
        badgeInner.position.set(0, 0.26, 0.338);

        juke.add(speakerBack, speakerGrille, uNeonTube, uNeonL, uNeonR, badgeOuter, badgeInner);

        // Side Fluted Amber Bubble Columns & Chrome Fin Ribs (at x = +-0.54, z = 0.28)
        [-0.54, 0.54].forEach(sx => {
          const pilasterGlow = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 1.06, 16),
            amberGlowMat
          );
          pilasterGlow.position.set(sx, 0.57, 0.28);

          const pilasterCap = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 16), chromeMat);
          pilasterCap.position.set(sx, 1.10, 0.28);
          const pilasterBase = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 16), chromeMat);
          pilasterBase.position.set(sx, 0.04, 0.28);

          juke.add(pilasterGlow, pilasterCap, pilasterBase);

          for (let b = 0; b < 3; b++) {
            const rib = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.028, 0.26), chromeMat);
            rib.position.set(sx * 1.05, 1.08 + (b * 0.055), 0.16);
            juke.add(rib);
          }
        });

        // 6. Warm Exterior Ambient Glow Light
        const jukeLight = new THREE.PointLight(0xffaa00, 2.2, 8);
        jukeLight.position.set(0, 1.25, 0.45);
        juke.add(jukeLight);

        // 7. Floating 3D Interaction Title Sprite
        const titleCanvas = document.createElement('canvas'); titleCanvas.width = 512; titleCanvas.height = 128;
        const tCtx = titleCanvas.getContext('2d');
        tCtx.fillStyle = 'rgba(12, 6, 24, 0.92)';
        if (tCtx.roundRect) tCtx.roundRect(8, 8, 496, 112, 20); else tCtx.rect(8, 8, 496, 112);
        tCtx.fill();
        tCtx.strokeStyle = '#ec4899'; tCtx.lineWidth = 5; tCtx.stroke();
        tCtx.font = '900 38px "Segoe UI", Arial, sans-serif';
        tCtx.fillStyle = '#f472b6'; tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
        tCtx.fillText('🎵 GRAMOLA SPOTIFY 🎵', 256, 44);
        tCtx.font = '700 24px "Segoe UI", Arial, sans-serif';
        tCtx.fillStyle = '#fde047';
        tCtx.fillText('Pulsa [E] o Click para cambiar música', 256, 88);

        const titleTex = new THREE.CanvasTexture(titleCanvas);
        const titleSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: titleTex, depthTest: false }));
        titleSpr.scale.set(2.4, 0.6, 1);
        titleSpr.position.set(0, 2.22, 0);
        juke.add(titleSpr);

        // Save reference for real-time turntable spin and neon pulse in animate()
        window.jukebox3DRefs = {
          group: juke,
          spinningDisc: vinylDiscGroup,
          innerSpot,
          jukeLight,
          neonArchL,
          neonArchR,
          uNeonTube,
          uNeonL,
          uNeonR,
          titleSpr
        };

        return juke;
      }

      // 15. Casino-Wide Ceiling Speaker System with Pulsing Neon Acoustic Rings
      function createCasinoCeilingSpeakers(sceneRef) {
        const speakersGroup = new THREE.Group();
        const speakerHousingMat = new THREE.MeshStandardMaterial({
          color: 0x181028,
          metalness: 0.8,
          roughness: 0.2
        });
        const speakerGrilleMat = new THREE.MeshStandardMaterial({
          color: 0x0a0512,
          roughness: 0.8
        });
        const speakerNeonMat = new THREE.MeshStandardMaterial({
          color: 0xf472b6,
          emissive: 0xf472b6,
          emissiveIntensity: 1.8
        });

        // Grid coordinates for whole-casino distributed sound
        const speakerCoords = [
          [-28, 7.2, -18], [0, 7.2, -18], [28, 7.2, -18],
          [-28, 7.2, 5], [0, 7.2, 5], [28, 7.2, 5],
          [-20, 7.2, 26], [0, 7.2, 26], [20, 7.2, 26],
          [7.6, 6.8, 36.5] // Right above entrance and Jukebox
        ];

        window.casinoSpeakerMeshes = [];

        speakerCoords.forEach(([sx, sy, sz]) => {
          const spk = new THREE.Group();
          spk.position.set(sx, sy, sz);

          const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.12, 24), speakerHousingMat);
          base.position.y = -0.06;

          const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.25, 0.15, 24), speakerGrilleMat);
          cone.position.y = -0.12;

          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.025, 8, 28), speakerNeonMat);
          ring.rotation.x = Math.PI / 2;
          ring.position.y = -0.12;

          spk.add(base, cone, ring);
          speakersGroup.add(spk);
          window.casinoSpeakerMeshes.push(ring);
        });

        sceneRef.add(speakersGroup);
        return speakersGroup;
      }

      // 16. Casino Outer Perimeter Walls (Scaled to Expanded 96m x 76m)
      function createCasinoWalls(sceneRef) {
        const wallsGroup = new THREE.Group();
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x0e081c, roughness: 0.7, metalness: 0.2 });
        const trimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });
        const wallHeight = 7.5;

        function makeWall(x, z, w, d, rotY = 0) {
          const wall = new THREE.Mesh(new THREE.BoxGeometry(w, wallHeight, d), wallMat);
          wall.position.set(x, wallHeight / 2, z);
          wall.rotation.y = rotY;
          wall.receiveShadow = true;

          const crown = new THREE.Mesh(new THREE.BoxGeometry(w, 0.25, d), trimMat);
          crown.position.set(x, wallHeight - 0.125, z);
          crown.rotation.y = rotY;

          wallsGroup.add(wall, crown);
        }

        // Outer Perimeter & Partition Walls (Uniform 0.8m thickness everywhere, perfectly flush butt-joints with zero seams)
        makeWall(-31.0, -84.0, 34.0, 0.8);   // Bowling North Wall (x: -48 to -14, z = -84)
        makeWall(-48.0, -23.0, 0.8, 122.0);  // West Wall (z: -84 to 38, x = -48)
        makeWall(-14.0, -49.0, 0.8, 70.0);   // Unified Continuous Left Wall / Divider (z: -84 to -14, x = -14)
        makeWall(17.0, -38.0, 62.0, 0.8);    // Cinema & TV Casino North Wall (x: -14 to 48, z = -38)
        makeWall(48.0, 0.0, 0.8, 76.0);      // East Wall (z: -38 to 38, x = 48)
        makeWall(14.0, -26.0, 0.8, 24.0);    // Cine - TV Casino Divider Wall (z: -38 to -14, x = 14)
        makeWall(-28.0, 38.0, 40.0, 0.8);    // South Left Wall (x: -48 to -8, z = 38)
        makeWall(28.0, 38.0, 40.0, 0.8);     // South Right Wall (x: 8 to 48, z = 38)

        sceneRef.add(wallsGroup);
      }

      /* ambient air particles */
      const particleCount = 250;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 55;
        pPos[i + 1] = Math.random() * 9;
        pPos[i + 2] = (Math.random() - 0.5) * 55;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0xE11FD1, size: 0.16, transparent: true, opacity: 0.65 });
      const airParticles = new THREE.Points(pGeo, pMat);
      scene.add(airParticles);

      /* label sprite helper */
      function makeLabelSprite(text, icon, color) {
        const c = document.createElement('canvas'); c.width = 512; c.height = 160;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 512, 160);
        const hex = '#' + color.toString(16).padStart(6, '0');
        ctx.font = '52px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.shadowColor = hex; ctx.shadowBlur = 24;
        ctx.fillText(icon, 256, 46);
        ctx.font = '800 38px Segoe UI, Arial'; ctx.fillStyle = hex;
        ctx.fillText(text, 256, 118);
        const tex = new THREE.CanvasTexture(c);
        const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
        spr.scale.set(5.2, 1.6, 1);
        return spr;
      }

      /* zone platforms & 3D models */
      var roulette3DRefs = null; window.roulette3DRefs = null;
      var plinko3DRefs = null; window.plinko3DRefs = null;
      var dice3DRefs = null; window.dice3DRefs = null;
      var coin3DRefs = null; window.coin3DRefs = null;
      var minesTileMeshes = []; window.minesTileMeshes = minesTileMeshes;
      var zoneMeshes = {}; window.zoneMeshes = zoneMeshes;

      /* Reusable emoji sprite (used by the 3D Mines tiles to show 💎 / 💣 when revealed) */
      const _emojiTextureCache = new Map();
      function getEmojiTexture(emoji) {
        if (_emojiTextureCache.has(emoji)) return _emojiTextureCache.get(emoji);
        const c = document.createElement('canvas'); c.width = 128; c.height = 128;
        const ctx = c.getContext('2d');
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = '96px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
        ctx.fillText(emoji, 64, 70);
        const tex = new THREE.CanvasTexture(c);
        _emojiTextureCache.set(emoji, tex);
        return tex;
      }

      function makeEmojiSprite(emoji, size) {
        const tex = getEmojiTexture(emoji);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true });
        const spr = new THREE.Sprite(mat);
        spr.scale.set(size, size, 1);
        return spr;
      }

      /* ============================================================
         PHYSICS COIN — 100% Pure 24K Minted Gold Coin
         CylinderGeometry material order = [side, top(+Y)=CARA, bottom(-Y)=CRUZ]
      ============================================================ */
      function makeCoinFaceTexture(label, emoji) {
        const c = document.createElement('canvas'); c.width = 512; c.height = 512;
        const ctx = c.getContext('2d');
        const isCara = (label === 'CARA');

        // 1. Pure 24K Solid Gold Metallic Radial Lustre
        const grad = ctx.createRadialGradient(256, 256, 15, 256, 256, 250);
        grad.addColorStop(0, '#fffbeb');
        grad.addColorStop(0.18, '#fef08a');
        grad.addColorStop(0.42, '#fde047');
        grad.addColorStop(0.70, '#eab308');
        grad.addColorStop(0.92, '#ca8a04');
        grad.addColorStop(1, '#a16207');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(256, 256, 250, 0, Math.PI * 2); ctx.fill();

        // 2. Micro-concentric milled pure gold guilloché rings
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
        ctx.lineWidth = 1.8;
        for (let r = 40; r < 240; r += 14) {
          ctx.beginPath(); ctx.arc(256, 256, r, 0, Math.PI * 2); ctx.stroke();
        }

        // 3. Heavy beveled pure gold border rims
        ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 16;
        ctx.beginPath(); ctx.arc(256, 256, 238, 0, Math.PI * 2); ctx.stroke();

        ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(256, 256, 228, 0, Math.PI * 2); ctx.stroke();

        // 4. Outer bead ring (36 minted pure gold beads)
        for (let i = 0; i < 36; i++) {
          const ang = (i / 36) * Math.PI * 2;
          const bx = 256 + Math.cos(ang) * 218;
          const by = 256 + Math.sin(ang) * 218;
          ctx.beginPath(); ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#fffbeb'; ctx.fill();
          ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.2; ctx.stroke();
        }

        // 5. Engraved Pure Gold Arch Inscription
        ctx.font = '900 18px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#854d0e'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('★ 24K PURE GOLD · CASINO ROYALE ★', 256, 110);
        ctx.fillStyle = '#fffbeb';
        ctx.fillText('★ 24K PURE GOLD · CASINO ROYALE ★', 256, 108);

        // 6. Central Sunken Pure Gold Medallion Basin
        const innerGrad = ctx.createRadialGradient(256, 256, 10, 256, 256, 145);
        innerGrad.addColorStop(0, '#fffbeb');
        innerGrad.addColorStop(0.35, '#fde047');
        innerGrad.addColorStop(0.80, '#eab308');
        innerGrad.addColorStop(1, '#a16207');
        ctx.fillStyle = innerGrad;
        ctx.beginPath(); ctx.arc(256, 256, 145, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 6; ctx.stroke();
        ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(256, 256, 148, 0, Math.PI * 2); ctx.stroke();

        // 7. Minted Gold Center Icon
        ctx.font = '130px "Segoe UI"';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(133, 77, 14, 0.75)';
        ctx.fillText(emoji, 258, 238); // engraved shadow
        ctx.fillStyle = '#fffbeb';
        ctx.fillText(emoji, 256, 232);

        // 8. Embossed Pure Gold Face Title
        ctx.fillStyle = '#854d0e';
        ctx.font = '900 48px "Segoe UI", Arial, sans-serif';
        ctx.fillText(label, 256, 356); // shadow
        ctx.fillStyle = '#fffbeb';
        ctx.fillText(label, 256, 352);

        ctx.font = '900 18px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#854d0e';
        ctx.fillText(isCara ? '★ IMPERIAL CARA · 2X ★' : '★ IMPERIAL CRUZ · 2X ★', 256, 400);
        ctx.fillStyle = '#fef08a';
        ctx.fillText(isCara ? '★ IMPERIAL CARA · 2X ★' : '★ IMPERIAL CRUZ · 2X ★', 256, 398);

        return new THREE.CanvasTexture(c);
      }

      function makeCoinEdgeTexture() {
        const c = document.createElement('canvas'); c.width = 512; c.height = 64;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#eab308'; ctx.fillRect(0, 0, 512, 64);
        for (let i = 0; i < 512; i += 8) {
          ctx.fillStyle = '#fffbeb';
          ctx.fillRect(i, 0, 4, 64);
          ctx.fillStyle = '#ca8a04';
          ctx.fillRect(i + 4, 0, 4, 64);
        }
        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(8, 1);
        return tex;
      }

      function makeCoinMesh(radius = 0.48, thickness = 0.08) {
        // 100% Pure 24K Gold Materials (Deep metallic luster & crisp reflections)
        const edgeMat = new THREE.MeshStandardMaterial({
          map: makeCoinEdgeTexture(),
          color: 0xffd700,
          metalness: 0.98,
          roughness: 0.12
        });
        const caraFaceMat = new THREE.MeshStandardMaterial({
          map: makeCoinFaceTexture('CARA', '👑'),
          color: 0xffd700,
          metalness: 0.96,
          roughness: 0.14
        });
        const cruzFaceMat = new THREE.MeshStandardMaterial({
          map: makeCoinFaceTexture('CRUZ', '⚡'),
          color: 0xffd700,
          metalness: 0.96,
          roughness: 0.14
        });

        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(radius, radius, thickness, 64),
          [edgeMat, caraFaceMat, cruzFaceMat]
        );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
      }

      /* ============================================================
         13.6. LUXURY CASINO 3D COIN FLIP TABLE (EXPANDED, WIDE RAILS, CHIP STACKS)
      ============================================================ */
      function createCoinFlipTable3D() {
        const tableGroup = new THREE.Group();
        const ebonyMat = new THREE.MeshStandardMaterial({ color: 0x140a20, roughness: 0.35, metalness: 0.25 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.12 });
        const leatherMat = new THREE.MeshStandardMaterial({ color: 0x0f0717, roughness: 0.55 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.92, roughness: 0.15 });

        // 1. 4 Sculpted Luxury Casino Pedestal Legs with Brass Feet & Gold Capital Rings
        const legOffsets = [
          [-1.70, -1.15],
          [1.70, -1.15],
          [-1.70, 1.15],
          [1.70, 1.15]
        ];
        legOffsets.forEach(([lx, lz]) => {
          const leg = new THREE.Group();
          leg.position.set(lx, 0, lz);

          // Brass Foot Base
          const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.09, 20), brassMat);
          foot.position.y = 0.045;

          // Fluted Wooden Column
          const column = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.62, 20), ebonyMat);
          column.position.y = 0.38;
          column.castShadow = true;

          // Gold Accent Rings
          const ringMid = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.018, 8, 24), goldMat);
          ringMid.rotation.x = Math.PI / 2;
          ringMid.position.y = 0.38;

          const capital = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.17, 0.09, 20), goldMat);
          capital.position.y = 0.70;

          leg.add(foot, column, ringMid, capital);
          tableGroup.add(leg);
        });

        // 2. Expanded Heavy Wood Table Chassis Base & Underglow Ribbon
        const tableBase = new THREE.Mesh(new THREE.BoxGeometry(4.40, 0.16, 3.20), ebonyMat);
        tableBase.position.set(0, 0.74, 0);
        tableBase.castShadow = true;

        const baseGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(4.46, 0.025, 3.26), goldMat);
        baseGoldTrim.position.set(0, 0.70, 0);

        const neonUnderglow = new THREE.Mesh(
          new THREE.BoxGeometry(4.48, 0.015, 3.28),
          new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 2.2 })
        );
        neonUnderglow.position.set(0, 0.785, 0);

        tableGroup.add(tableBase, baseGoldTrim, neonUnderglow);

        // 3. Custom High-Resolution Velvet Casino Felt (Tapete)
        const feltCanvas = document.createElement('canvas');
        feltCanvas.width = 1024; feltCanvas.height = 512;
        const fCtx = feltCanvas.getContext('2d');

        // Deep Imperial Navy / Purple Felt Gradient
        const feltGrad = fCtx.createRadialGradient(512, 256, 30, 512, 256, 480);
        feltGrad.addColorStop(0, '#2d144e');
        feltGrad.addColorStop(0.60, '#1a0a30');
        feltGrad.addColorStop(1, '#0c0418');
        fCtx.fillStyle = feltGrad;
        fCtx.fillRect(0, 0, 1024, 512);

        // Intricate Gold Inlay Borders
        fCtx.strokeStyle = '#ffd700'; fCtx.lineWidth = 6;
        fCtx.strokeRect(16, 16, 992, 480);
        fCtx.strokeStyle = 'rgba(254, 240, 138, 0.45)'; fCtx.lineWidth = 2;
        fCtx.strokeRect(28, 28, 968, 456);

        // Corner Gold Filigree Motifs
        [[38, 38], [986, 38], [38, 474], [986, 474]].forEach(([cx, cy]) => {
          fCtx.beginPath(); fCtx.arc(cx, cy, 12, 0, Math.PI * 2);
          fCtx.fillStyle = '#ffd700'; fCtx.fill();
        });

        // Title Header
        fCtx.fillStyle = '#fef08a';
        fCtx.font = '900 32px "Segoe UI", Arial, sans-serif'; fCtx.textAlign = 'center'; fCtx.textBaseline = 'middle';
        fCtx.fillText('★ COIN FLIP 2X · CASINO ROYALE ★', 512, 54);

        // CARA Betting Zone Box (Left)
        fCtx.strokeStyle = 'rgba(254, 240, 138, 0.85)'; fCtx.lineWidth = 4;
        fCtx.fillStyle = 'rgba(254, 240, 138, 0.08)';
        fCtx.beginPath();
        if (fCtx.roundRect) fCtx.roundRect(90, 140, 250, 270, 20); else fCtx.rect(90, 140, 250, 270);
        fCtx.fill(); fCtx.stroke();
        fCtx.font = '72px "Segoe UI"'; fCtx.fillStyle = '#fef08a'; fCtx.fillText('👑', 215, 230);
        fCtx.font = '900 32px "Segoe UI", Arial, sans-serif'; fCtx.fillText('CARA', 215, 310);
        fCtx.font = '700 18px "Segoe UI", Arial, sans-serif'; fCtx.fillText('PAGA 2 A 1', 215, 355);

        // CRUZ Betting Zone Box (Right)
        fCtx.strokeStyle = 'rgba(254, 240, 138, 0.85)'; fCtx.lineWidth = 4;
        fCtx.fillStyle = 'rgba(254, 240, 138, 0.08)';
        fCtx.beginPath();
        if (fCtx.roundRect) fCtx.roundRect(684, 140, 250, 270, 20); else fCtx.rect(684, 140, 250, 270);
        fCtx.fill(); fCtx.stroke();
        fCtx.font = '72px "Segoe UI"'; fCtx.fillStyle = '#fef08a'; fCtx.fillText('⚡', 809, 230);
        fCtx.font = '900 32px "Segoe UI", Arial, sans-serif'; fCtx.fillText('CRUZ', 809, 310);
        fCtx.font = '700 18px "Segoe UI", Arial, sans-serif'; fCtx.fillText('PAGA 2 A 1', 809, 355);

        // Center Toss Arena Radial Graphic
        fCtx.beginPath(); fCtx.arc(512, 270, 115, 0, Math.PI * 2);
        fCtx.fillStyle = 'rgba(254, 240, 138, 0.12)'; fCtx.fill();
        fCtx.strokeStyle = '#ffd700'; fCtx.lineWidth = 4; fCtx.stroke();
        fCtx.beginPath(); fCtx.arc(512, 270, 128, 0, Math.PI * 2);
        fCtx.strokeStyle = 'rgba(254, 240, 138, 0.4)'; fCtx.lineWidth = 2; fCtx.stroke();

        const feltTex = new THREE.CanvasTexture(feltCanvas);
        const feltMesh = new THREE.Mesh(
          new THREE.BoxGeometry(3.60, 0.02, 2.40),
          new THREE.MeshStandardMaterial({ map: feltTex, roughness: 0.65 })
        );
        feltMesh.position.set(0, 0.83, 0);
        feltMesh.receiveShadow = true;
        tableGroup.add(feltMesh);

        // 4. Extra-Wide Cushioned Leather Armrest Rails with Gold Piping (Borde Ancho)
        const wallH = 0.18;
        const wallT = 0.40; // Widened border to 40cm so chip stacks fit comfortably on top!

        // Front / Back rails (Z: -1.40, +1.40)
        [-1.40, 1.40].forEach(wz => {
          const w = new THREE.Mesh(new THREE.BoxGeometry(4.44, wallH, wallT), ebonyMat);
          w.position.set(0, 0.83 + wallH / 2, wz);
          const leatherArm = new THREE.Mesh(new THREE.BoxGeometry(4.48, 0.06, wallT + 0.06), leatherMat);
          leatherArm.position.set(0, 0.83 + wallH + 0.03, wz);
          const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(4.50, 0.015, wallT + 0.08), goldMat);
          goldTrim.position.set(0, 0.83 + wallH, wz);
          tableGroup.add(w, leatherArm, goldTrim);
        });

        // Left / Right rails (X: -2.00, +2.00)
        [-2.00, 2.00].forEach(wx => {
          const w = new THREE.Mesh(new THREE.BoxGeometry(wallT, wallH, 3.20), ebonyMat);
          w.position.set(wx, 0.83 + wallH / 2, 0);
          const leatherArm = new THREE.Mesh(new THREE.BoxGeometry(wallT + 0.06, 0.06, 3.24), leatherMat);
          leatherArm.position.set(wx, 0.83 + wallH + 0.03, 0);
          const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(wallT + 0.08, 0.015, 3.26), goldMat);
          goldTrim.position.set(wx, 0.83 + wallH, 0);
          tableGroup.add(w, leatherArm, goldTrim);
        });

        // 5. Deluxe 3D Chip Tray Placed ON TOP of the Rear Table Border (Exact 2x8 Tray from Dice Table)
        const railTopY = 0.83 + wallH + 0.06; // Exactly on top of the wide leather armrest ledge!

        const trayBase = new THREE.Mesh(
          new THREE.BoxGeometry(1.76, 0.025, 0.48),
          new THREE.MeshStandardMaterial({ color: 0x14091e, roughness: 0.4, metalness: 0.3 })
        );
        trayBase.position.set(0, railTopY, -1.40);

        const trayGoldBorder = new THREE.Mesh(
          new THREE.BoxGeometry(1.80, 0.020, 0.52),
          new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 })
        );
        trayGoldBorder.position.set(0, railTopY - 0.005, -1.40);

        const trayGroup = new THREE.Group();
        trayGroup.add(trayBase, trayGoldBorder);

        const coinChipStacks = [];

        // Row 1 (Back row, z = -1.49): Low stakes $0.1, $0.2, $0.5, $1, $2, $5, $10, $20
        // Row 2 (Front row, z = -1.31): High stakes $50, $100, $200, $500, $1K, $2K, $5K, $10K
        CASINO_CHIPS.forEach((cDef, cIdx) => {
          const isHighRow = cIdx >= 8;
          const col = isHighRow ? (cIdx - 8) : cIdx;
          const posX = -0.66 + col * 0.190;
          const posZ = isHighRow ? -1.31 : -1.49;

          const stack = new THREE.Group();
          stack.position.set(posX, railTopY + 0.020, posZ);
          stack.userData = { chipVal: cDef.v };
          stack.name = 'coinChipStack_' + cDef.v;

          for (let h = 0; h < 4; h++) {
            const chipM = create3DChipSingleMesh(cDef, 0.060, 0.014);
            chipM.position.y = h * 0.015 + 0.007;
            chipM.rotation.y = (h * 0.35) % (Math.PI * 2);
            chipM.userData = { chipVal: cDef.v };
            chipM.traverse(child => { child.userData = { chipVal: cDef.v }; });
            stack.add(chipM);
          }

          // Floating 3D Value Label with gold border (EXACTLY matching user image)
          const labelCanvas = document.createElement('canvas');
          labelCanvas.width = 128; labelCanvas.height = 64;
          const lCtx = labelCanvas.getContext('2d');
          lCtx.fillStyle = '#0f081d';
          if (lCtx.roundRect) lCtx.roundRect(4, 4, 120, 56, 12); else lCtx.rect(4, 4, 120, 56);
          lCtx.fill();
          lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 3; lCtx.stroke();
          lCtx.font = '900 28px "Segoe UI", Arial, sans-serif';
          lCtx.fillStyle = '#ffffff'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
          lCtx.fillText(cDef.str, 64, 32);

          const labelTex = new THREE.CanvasTexture(labelCanvas);
          const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
          labelSpr.scale.set(0.16, 0.08, 1);
          labelSpr.position.set(0, 0.125, 0);
          labelSpr.userData = { chipVal: cDef.v };
          stack.add(labelSpr);

          trayGroup.add(stack);
          coinChipStacks.push(stack);
        });
        tableGroup.add(trayGroup);

        // 6. Central Sunken Gold Toss Basin
        const basinRim = new THREE.Mesh(
          new THREE.TorusGeometry(1.15, 0.028, 12, 40),
          goldMat
        );
        basinRim.rotation.x = Math.PI / 2;
        basinRim.position.set(0, 0.845, 0.06);
        tableGroup.add(basinRim);

        // 7. Persistent Rest Coin & Physics Launch Group
        const restCoin = makeCoinMesh(0.48, 0.08);
        restCoin.position.set(0, 0.840 + 0.040 + 0.001, 0.06);
        tableGroup.add(restCoin);

        const coinLaunchGroup = new THREE.Group();
        coinLaunchGroup.position.set(0, 0, 0.06);
        tableGroup.add(coinLaunchGroup);

        // 8. Overhead Warm Spotlight
        const tableLight = new THREE.PointLight(0xfde047, 2.0, 10);
        tableLight.position.set(0, 2.6, 0.06);
        tableGroup.add(tableLight);

        // 7. Dedicated Betting Trays for Both Player Seats on Front Rail (Left: J1, Right: J2)
        const coinBetSpots = [];
        const betTrayPlates = [
          {
            x: -1.40, z: 1.40,
            label: '👑 APUESTA (J1) 🪙',
            pIdx: 0,
            neonColor: 0x8b5cf6,
            velvetColor: 0x1f0d38,
            tagColor: '#a78bfa',
            borderColor: '#8b5cf6'
          },
          {
            x: 1.40, z: 1.40,
            label: '⚡ APUESTA (J2) 🪙',
            pIdx: 1,
            neonColor: 0xf59e0b,
            velvetColor: 0x2d1804,
            tagColor: '#fbbf24',
            borderColor: '#f59e0b'
          }
        ];

        betTrayPlates.forEach(tray => {
          const tGroup = new THREE.Group();
          tGroup.position.set(tray.x, railTopY, tray.z);
          tGroup.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          // Recessed wooden tray plate
          const plate = new THREE.Mesh(
            new THREE.BoxGeometry(0.72, 0.040, 0.38),
            ebonyMat
          );
          plate.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          // Golden raised lip trim
          const lip = new THREE.Mesh(
            new THREE.BoxGeometry(0.76, 0.050, 0.42),
            goldMat
          );
          lip.position.y = -0.002;
          lip.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          // Velvet bed
          const velvetBed = new THREE.Mesh(
            new THREE.BoxGeometry(0.66, 0.012, 0.32),
            new THREE.MeshStandardMaterial({ color: tray.velvetColor, roughness: 0.75 })
          );
          velvetBed.position.y = 0.022;
          velvetBed.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          // 3D Torus Solid Raised Neon Betting Ring
          const ringMesh = new THREE.Mesh(
            new THREE.TorusGeometry(0.17, 0.014, 14, 40),
            new THREE.MeshStandardMaterial({
              color: tray.neonColor,
              emissive: tray.neonColor,
              emissiveIntensity: 2.8,
              metalness: 0.9,
              roughness: 0.15
            })
          );
          ringMesh.rotation.x = Math.PI / 2;
          ringMesh.position.set(0, 0.035, 0);
          ringMesh.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          // Outer Gold Trim Ring
          const outerRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.22, 0.008, 10, 40),
            new THREE.MeshStandardMaterial({
              color: 0xffd700,
              emissive: 0xd97706,
              emissiveIntensity: 0.6,
              metalness: 0.95,
              roughness: 0.15
            })
          );
          outerRing.rotation.x = Math.PI / 2;
          outerRing.position.set(0, 0.035, 0);
          outerRing.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          // Floating 3D Label Tag
          const tagCanvas = document.createElement('canvas');
          tagCanvas.width = 256; tagCanvas.height = 64;
          const tCtx = tagCanvas.getContext('2d');
          tCtx.fillStyle = '#0f081d';
          if (tCtx.roundRect) tCtx.roundRect(4, 4, 248, 56, 12); else tCtx.rect(4, 4, 248, 56);
          tCtx.fill();
          tCtx.strokeStyle = tray.borderColor; tCtx.lineWidth = 4; tCtx.stroke();
          tCtx.font = '900 22px "Segoe UI", Arial, sans-serif';
          tCtx.fillStyle = tray.tagColor; tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
          tCtx.fillText(tray.label, 128, 32);

          const tagTex = new THREE.CanvasTexture(tagCanvas);
          const tagSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tagTex, depthTest: false }));
          tagSpr.scale.set(0.34, 0.085, 1);
          tagSpr.position.set(0, 0.14, 0);
          tagSpr.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };

          tGroup.add(lip, plate, velvetBed, ringMesh, outerRing, tagSpr);
          tGroup.traverse(child => { child.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx }; });
          tableGroup.add(tGroup);
          coinBetSpots.push(tGroup);

          // Raycastable sensor disc directly over the tray on the rail
          const spotHitMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.40, 0.40, 0.18, 16),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
          );
          spotHitMesh.position.set(tray.x, railTopY + 0.04, tray.z);
          spotHitMesh.userData = { isCoinBetSpot: true, playerIndex: tray.pIdx };
          tableGroup.add(spotHitMesh);
          coinBetSpots.push(spotHitMesh);
        });

        // 8. 3D Active Bet Chips Group (Mounted at rail height)
        const coinChipsGroup = new THREE.Group();
        tableGroup.add(coinChipsGroup);

        function update3DCoinChipRackSelection() {
          if (!coinChipStacks) return;
          const curVal = (typeof coinState !== 'undefined' && typeof coinState.selectedChip === 'number') ? coinState.selectedChip : 50;
          coinChipStacks.forEach(stack => {
            const val = stack.userData.chipVal;
            const isSelected = Math.abs(val - curVal) < 0.001;
            stack.position.y = isSelected ? (railTopY + 0.050) : (railTopY + 0.020);
            stack.scale.set(isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0);
          });
        }

        coin3DRefs = {
          group: tableGroup,
          restCoin,
          launchGroup: coinLaunchGroup,
          padRadius: 0.75,
          floorY: 0.845,
          chipStacks: coinChipStacks,
          betSpots: coinBetSpots,
          chipsGroup: coinChipsGroup,
          railTopY: railTopY,
          update3DCoinChipRackSelection,
        };
        window.coin3DRefs = coin3DRefs;

        return tableGroup;
      }

      /* ============================================================
         PHYSICS DICE — pip textures + real 3D cube geometry
         BoxGeometry material order = [+X, -X, +Y, -Y, +Z, -Z]
         Opposite faces sum to 7: +X=2, -X=5, +Y=1, -Y=6, +Z=3, -Z=4
      ============================================================ */
      const DIE_FACE_VALUES = [2, 5, 1, 6, 3, 4];
      const DIE_FACE_NORMALS = [
        new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1),
      ];
      const PIP_LAYOUTS = {
        1: [[64, 64]],
        2: [[38, 38], [90, 90]],
        3: [[38, 38], [64, 64], [90, 90]],
        4: [[38, 38], [90, 38], [38, 90], [90, 90]],
        5: [[38, 38], [90, 38], [64, 64], [38, 90], [90, 90]],
        6: [[38, 30], [90, 30], [38, 64], [90, 64], [38, 98], [90, 98]],
      };

      function makeDiePipTexture(value, theme = 'blue') {
        const c = document.createElement('canvas'); c.width = 128; c.height = 128;
        const ctx = c.getContext('2d');

        const isRed = (theme === 'red' || theme === 0xef4444 || theme === 0xFB923C || theme === 0xdc2626);

        // 1. Fondo de cristal acrílico traslúcido de lujo (Azul Zafiro vs Rojo Rubí)
        const bgGrad = ctx.createRadialGradient(64, 64, 15, 64, 64, 88);
        if (isRed) {
          bgGrad.addColorStop(0, '#ef4444');
          bgGrad.addColorStop(0.6, '#dc2626');
          bgGrad.addColorStop(1, '#7f1d1d');
        } else {
          bgGrad.addColorStop(0, '#3b82f6');
          bgGrad.addColorStop(0.6, '#1d4ed8');
          bgGrad.addColorStop(1, '#172554');
        }
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 128, 128);

        // 2. Bisel / Marco exterior de orfebrería dorada y cristal brillante
        ctx.strokeStyle = isRed ? 'rgba(254, 202, 202, 0.45)' : 'rgba(191, 219, 254, 0.45)';
        ctx.lineWidth = 4;
        ctx.strokeRect(3, 3, 122, 122);

        ctx.strokeStyle = '#ffd700'; // Dorado real
        ctx.lineWidth = 2.5;
        ctx.strokeRect(7, 7, 114, 114);

        // 3. Puntos / Pips de diamante blanco puro con aro dorado y relieve sombreado
        const pips = PIP_LAYOUTS[value] || [];
        pips.forEach(([px, py]) => {
          // Sombra de incrustación
          ctx.beginPath();
          ctx.arc(px, py + 1.5, 11.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
          ctx.fill();

          // Anillo dorado exterior
          ctx.beginPath();
          ctx.arc(px, py, 11.5, 0, Math.PI * 2);
          ctx.fillStyle = '#fde047';
          ctx.fill();

          // Diamante blanco puro central con brillo especular
          const pipGrad = ctx.createRadialGradient(px - 3, py - 3, 2, px, py, 9.5);
          pipGrad.addColorStop(0, '#ffffff');
          pipGrad.addColorStop(0.75, '#f8fafc');
          pipGrad.addColorStop(1, '#e2e8f0');

          ctx.beginPath();
          ctx.arc(px, py, 9.5, 0, Math.PI * 2);
          ctx.fillStyle = pipGrad;
          ctx.fill();
        });

        return new THREE.CanvasTexture(c);
      }

      function makeDieMesh(size, theme = 'blue') {
        const mats = DIE_FACE_VALUES.map(v => new THREE.MeshStandardMaterial({
          map: makeDiePipTexture(v, theme),
          roughness: 0.18,
          metalness: 0.22
        }));
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size, size, 1, 1, 1), mats);
        mesh.castShadow = true; mesh.receiveShadow = true;
        return mesh;
      }
      /* Reads which face currently points up (+Y world) from a die's quaternion */
      function readDieFaceUp(mesh) {
        let best = -Infinity, bestIdx = 2;
        for (let i = 0; i < 6; i++) {
          const n = DIE_FACE_NORMALS[i].clone().applyQuaternion(mesh.quaternion);
          if (n.y > best) { best = n.y; bestIdx = i; }
        }
        return DIE_FACE_VALUES[bestIdx];
      }

      function createRoundedPlatformMesh(w, d, h, cornerR, baseColor, emissiveColor) {
        const shape = createRoundedRectShape(w, d, cornerR);
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: h,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.06,
          bevelThickness: 0.04
        });

        const mat = new THREE.MeshStandardMaterial({
          color: baseColor,
          emissive: new THREE.Color(emissiveColor),
          emissiveIntensity: 0.18,
          roughness: 0.45,
          metalness: 0.25
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = Math.PI / 2;
        mesh.position.y = h;
        mesh.receiveShadow = true;
        return mesh;
      }

      function createRoundedPlatformNeonTrim(w, d, cornerR, colorHex) {
        const borderW = 0.14;
        const outerShape = createRoundedRectShape(w + borderW, d + borderW, cornerR + borderW / 2);
        const innerShape = createRoundedRectShape(w - borderW, d - borderW, Math.max(0.1, cornerR - borderW / 2));
        outerShape.holes.push(innerShape);

        const geo = new THREE.ExtrudeGeometry(outerShape, {
          depth: 0.04,
          bevelEnabled: false
        });

        const mat = new THREE.MeshBasicMaterial({ color: colorHex });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = Math.PI / 2;
        mesh.position.y = 0.355;
        return mesh;
      }

      function createPokerTable3D() {
        const pokerGroup = new THREE.Group();
        const pokerR = 2.65;

        // 1. Heavy Wooden Pedestal Understructure (Rich Warm Mahogany Wood matching Blackjack)
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x4a2211, roughness: 0.42, metalness: 0.08 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.12 });

        // Central Fluted Mahogany Column Pedestal
        const centralPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.78, 0.68, 36), woodMat);
        centralPillar.position.set(0, 0.34, 0);
        centralPillar.castShadow = true;

        // Flared Stepped Heavy Plinth Base Foot
        const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.85, 0.14, 36), woodMat);
        basePlinth.position.set(0, 0.07, 0);
        basePlinth.castShadow = true; basePlinth.receiveShadow = true;

        // Gold Trim Ring on Base Plinth
        const baseGoldTrim = new THREE.Mesh(new THREE.TorusGeometry(1.86, 0.045, 12, 48), brassMat);
        baseGoldTrim.rotation.x = Math.PI / 2;
        baseGoldTrim.position.set(0, 0.14, 0);

        // Gold Collar Rings on Central Column
        const pillarCollarLower = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.035, 12, 36), brassMat);
        pillarCollarLower.rotation.x = Math.PI / 2;
        pillarCollarLower.position.set(0, 0.22, 0);

        const pillarCollarUpper = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.035, 12, 36), brassMat);
        pillarCollarUpper.rotation.x = Math.PI / 2;
        pillarCollarUpper.position.set(0, 0.62, 0);

        // 4 Curved Radial Mahogany Support Scroll Brackets radiating outward at 90 deg
        for (let b = 0; b < 4; b++) {
          const bAngle = (b / 4) * Math.PI * 2;
          const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 1.40), woodMat);
          bracket.position.set(Math.sin(bAngle) * 1.05, 0.62, Math.cos(bAngle) * 1.05);
          bracket.rotation.y = bAngle;
          bracket.castShadow = true;
          pokerGroup.add(bracket);
        }

        pokerGroup.add(centralPillar, basePlinth, baseGoldTrim, pillarCollarLower, pillarCollarUpper);

        // 2. Circular Wooden Tabletop Base Board (Matching Blackjack)
        const pokerBase = new THREE.Mesh(
          new THREE.CylinderGeometry(pokerR + 0.12, pokerR + 0.12, 0.10, 64),
          woodMat
        );
        pokerBase.position.set(0, 0.78, 0);
        pokerBase.receiveShadow = true; pokerBase.castShadow = true;

        // Gold Metallic Trim Ring beneath Tabletop
        const tabletopGoldTrim = new THREE.Mesh(
          new THREE.TorusGeometry(pokerR + 0.13, 0.02, 12, 64),
          brassMat
        );
        tabletopGoldTrim.rotation.x = Math.PI / 2;
        tabletopGoldTrim.position.set(0, 0.74, 0);

        // 3. Continuous Padded Black Leather Armrest Rail (360° Full Circle)
        const leatherMat = new THREE.MeshStandardMaterial({ color: 0x121216, roughness: 0.32, metalness: 0.05 });
        const pokerRail = new THREE.Mesh(
          new THREE.TorusGeometry(pokerR + 0.10, 0.16, 24, 64),
          leatherMat
        );
        pokerRail.rotation.x = Math.PI / 2;
        pokerRail.position.set(0, 0.81, 0);
        pokerRail.castShadow = true;

        // Inner Gold Trim Inlay between Leather Rail and Felt
        const innerRailGoldTrim = new THREE.Mesh(
          new THREE.TorusGeometry(pokerR - 0.02, 0.016, 12, 64),
          brassMat
        );
        innerRailGoldTrim.rotation.x = Math.PI / 2;
        innerRailGoldTrim.position.set(0, 0.815, 0);

        // 4. Circular Poker Felt Canvas & High-Definition Layout (1024x1024)
        const pokerFeltCanvas = document.createElement('canvas');
        pokerFeltCanvas.width = 1024;
        pokerFeltCanvas.height = 1024;
        const pCtx = pokerFeltCanvas.getContext('2d');

        // Rich Casino Imperial Emerald Felt Background with Radial Gradient
        const pGrad = pCtx.createRadialGradient(512, 512, 40, 512, 512, 510);
        pGrad.addColorStop(0, '#00b454');
        pGrad.addColorStop(0.65, '#018a3f');
        pGrad.addColorStop(1, '#025225');
        pCtx.fillStyle = pGrad;
        pCtx.beginPath();
        pCtx.arc(512, 512, 512, 0, Math.PI * 2);
        pCtx.fill();

        // Subtle Felt Cloth Texture
        pCtx.fillStyle = 'rgba(255, 255, 255, 0.022)';
        for (let i = 0; i < 1024; i += 6) {
          for (let j = 0; j < 1024; j += 6) {
            if ((i + j) % 12 === 0) pCtx.fillRect(i, j, 3, 3);
          }
        }

        // Concentric Golden Yellow Double Outer Border Rings
        pCtx.strokeStyle = '#facc15'; pCtx.lineWidth = 5;
        pCtx.beginPath(); pCtx.arc(512, 512, 475, 0, Math.PI * 2); pCtx.stroke();
        pCtx.lineWidth = 2.5;
        pCtx.beginPath(); pCtx.arc(512, 512, 445, 0, Math.PI * 2); pCtx.stroke();

        // Inner Betting Line Ring (Where player bets are placed)
        pCtx.strokeStyle = 'rgba(250, 204, 21, 0.75)'; pCtx.lineWidth = 3.5;
        pCtx.beginPath(); pCtx.arc(512, 512, 290, 0, Math.PI * 2); pCtx.stroke();

        // Center Pot & Branding Basin
        const potGrad = pCtx.createRadialGradient(512, 512, 10, 512, 512, 135);
        potGrad.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
        potGrad.addColorStop(1, 'rgba(0, 0, 0, 0.02)');
        pCtx.fillStyle = potGrad;
        pCtx.beginPath(); pCtx.arc(512, 512, 135, 0, Math.PI * 2); pCtx.fill();
        pCtx.strokeStyle = '#facc15'; pCtx.lineWidth = 2;
        pCtx.beginPath(); pCtx.arc(512, 512, 135, 0, Math.PI * 2); pCtx.stroke();

        // Center Poker Logo & Typography
        pCtx.textAlign = 'center'; pCtx.textBaseline = 'middle';
        pCtx.fillStyle = '#facc15';
        pCtx.font = '900 24px Segoe UI, Arial';
        pCtx.fillText('★ TEXAS HOLD\'EM ★', 512, 445);
        pCtx.font = '800 16px Segoe UI, Arial';
        pCtx.fillStyle = '#ffffff';
        pCtx.fillText('NO LIMIT · CASINO ROYALE', 512, 470);

        pCtx.font = '800 15px Segoe UI, Arial';
        pCtx.fillStyle = '#facc15';
        pCtx.fillText('♠  ♥  THE POT  ♦  ♣', 512, 555);

        // 5 Community Cards Outlines (FLOP 1, FLOP 2, FLOP 3, TURN, RIVER)
        const commCardW = 54;
        const commCardH = 76;
        const commCardGap = 12;
        const commStartX = 512 - (5 * commCardW + 4 * commCardGap) / 2 + commCardW / 2;
        const commY = 512;
        const commLabels = ['FLOP', 'FLOP', 'FLOP', 'TURN', 'RIVER'];

        for (let c = 0; c < 5; c++) {
          const ccX = commStartX + c * (commCardW + commCardGap);
          pCtx.save();
          pCtx.translate(ccX, commY);

          // Card Outer White Outline
          pCtx.strokeStyle = '#ffffff';
          pCtx.lineWidth = 3;
          pCtx.beginPath();
          if (pCtx.roundRect) pCtx.roundRect(-commCardW / 2, -commCardH / 2, commCardW, commCardH, 7);
          else pCtx.rect(-commCardW / 2, -commCardH / 2, commCardW, commCardH);
          pCtx.stroke();

          // Card Inner Trim
          pCtx.strokeStyle = 'rgba(255, 255, 255, 0.40)';
          pCtx.lineWidth = 1.2;
          pCtx.beginPath();
          if (pCtx.roundRect) pCtx.roundRect(-commCardW / 2 + 4, -commCardH / 2 + 4, commCardW - 8, commCardH - 8, 4);
          else pCtx.rect(-commCardW / 2 + 4, -commCardH / 2 + 4, commCardW - 8, commCardH - 8);
          pCtx.stroke();

          // Card Label
          pCtx.fillStyle = 'rgba(250, 204, 21, 0.85)';
          pCtx.font = '900 10px Segoe UI, Arial';
          pCtx.fillText(commLabels[c], 0, 0);

          pCtx.restore();
        }

        // 8 Player Positions around the circular felt
        const pokerBetSpots = [];
        for (let i = 0; i < 8; i++) {
          const ang = i * (Math.PI / 4); // 8 seats evenly around the 360 degree circle
          const seatDistPx = 336;
          const px = 512 + Math.sin(ang) * seatDistPx;
          const py = 512 + Math.cos(ang) * seatDistPx;

          pCtx.save();
          pCtx.translate(px, py);
          pCtx.rotate(-ang); // orient box facing the center!

          // Two Player Hole Card Outline Boxes (side by side, oriented upright in portrait towards center)
          const pCardW = 50;
          const pCardH = 70;
          [-32, 32].forEach(offsetCardX => {
            pCtx.strokeStyle = '#ffffff';
            pCtx.lineWidth = 2.5;
            pCtx.beginPath();
            if (pCtx.roundRect) pCtx.roundRect(offsetCardX - pCardW / 2, -pCardH / 2, pCardW, pCardH, 6);
            else pCtx.rect(offsetCardX - pCardW / 2, -pCardH / 2, pCardW, pCardH);
            pCtx.stroke();

            pCtx.strokeStyle = 'rgba(255, 255, 255, 0.40)';
            pCtx.lineWidth = 1.0;
            pCtx.beginPath();
            if (pCtx.roundRect) pCtx.roundRect(offsetCardX - pCardW / 2 + 3, -pCardH / 2 + 3, pCardW - 6, pCardH - 6, 4);
            else pCtx.rect(offsetCardX - pCardW / 2 + 3, -pCardH / 2 + 3, pCardW - 6, pCardH - 6);
            pCtx.stroke();
          });

          // Seat Badge
          pCtx.fillStyle = '#facc15';
          pCtx.font = '800 12px Segoe UI, Arial';
          pCtx.fillText(`P${i + 1}`, 0, 42);

          // Betting Circle on the betting line (towards center: -95px in local rotated coords)
          pCtx.strokeStyle = '#facc15';
          pCtx.lineWidth = 2.5;
          pCtx.beginPath();
          pCtx.arc(0, -95, 24, 0, Math.PI * 2);
          pCtx.stroke();

          pCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          pCtx.lineWidth = 1.2;
          pCtx.beginPath();
          pCtx.arc(0, -95, 20, 0, Math.PI * 2);
          pCtx.stroke();

          pCtx.restore();
        }

        const pokerFeltTex = new THREE.CanvasTexture(pokerFeltCanvas);
        pokerFeltTex.anisotropy = 16;

        // Circular Felt Shape & Geometry (ShapeGeometry matching Blackjack)
        const pokerFeltShape = new THREE.Shape();
        pokerFeltShape.absarc(0, 0, pokerR - 0.04, 0, Math.PI * 2, false);
        const pokerFeltGeo = new THREE.ShapeGeometry(pokerFeltShape, 64);

        // Custom UVs for ShapeGeometry to align Canvas 1-to-1 seamlessly across the circle
        const posAttr = pokerFeltGeo.attributes.position;
        const uvAttr = pokerFeltGeo.attributes.uv;
        for (let i = 0; i < posAttr.count; i++) {
          const px = posAttr.getX(i);
          const py = posAttr.getY(i);
          const u = (px + pokerR) / (2 * pokerR);
          const v = (py + pokerR) / (2 * pokerR);
          uvAttr.setXY(i, u, 1 - v);
        }
        uvAttr.needsUpdate = true;

        const pokerFelt = new THREE.Mesh(
          pokerFeltGeo,
          new THREE.MeshStandardMaterial({ color: 0xffffff, map: pokerFeltTex, roughness: 0.75, side: THREE.DoubleSide })
        );
        pokerFelt.rotation.x = Math.PI / 2;
        pokerFelt.position.y = 0.825;
        pokerFelt.receiveShadow = true;

        // 5. Luxury 2-Tiered Dealer Chip Tray with 16 3D Chip Stacks (Positioned closer to center at z = -0.90)
        const trayBase = new THREE.Mesh(
          new THREE.BoxGeometry(1.30, 0.024, 0.36),
          new THREE.MeshStandardMaterial({ color: 0x14091e, roughness: 0.4, metalness: 0.3 })
        );
        trayBase.position.set(0, 0.835, -0.90);

        const trayGoldBorder = new THREE.Mesh(
          new THREE.BoxGeometry(1.32, 0.015, 0.38),
          brassMat
        );
        trayGoldBorder.position.set(0, 0.828, -0.90);

        const trayGroup = new THREE.Group();
        trayGroup.add(trayBase, trayGoldBorder);

        const pokerChipStacks = [];

        // Row 1 (z = -0.98): Low stakes $0.1, $0.2, $0.5, $1, $2, $5, $10, $20
        // Row 2 (z = -0.82): High stakes $50, $100, $200, $500, $1K, $2K, $5K, $10K
        CASINO_CHIPS.forEach((cDef, cIdx) => {
          const isHighRow = cIdx >= 8;
          const col = isHighRow ? (cIdx - 8) : cIdx;
          const posX = -0.490 + col * 0.140;
          const posZ = isHighRow ? -0.82 : -0.98;

          const stack = new THREE.Group();
          stack.position.set(posX, 0.842, posZ);
          stack.userData = { chipVal: cDef.v };
          stack.name = 'pokerChipStack_' + cDef.v;

          for (let h = 0; h < 4; h++) {
            const chipM = create3DChipSingleMesh(cDef, 0.052, 0.014);
            chipM.position.y = h * 0.015 + 0.007;
            chipM.rotation.y = (h * 0.35) % (Math.PI * 2);
            stack.add(chipM);
          }

          // Floating 3D Value Label with gold border
          const labelCanvas = document.createElement('canvas');
          labelCanvas.width = 128; labelCanvas.height = 64;
          const lCtx = labelCanvas.getContext('2d');
          lCtx.fillStyle = '#0f081d';
          if (lCtx.roundRect) lCtx.roundRect(4, 4, 120, 56, 12); else lCtx.rect(4, 4, 120, 56);
          lCtx.fill();
          lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 3; lCtx.stroke();
          lCtx.font = '900 28px "Segoe UI", Arial, sans-serif';
          lCtx.fillStyle = '#ffffff'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
          lCtx.fillText(cDef.str, 64, 32);

          const labelTex = new THREE.CanvasTexture(labelCanvas);
          const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
          labelSpr.scale.set(0.15, 0.075, 1);
          labelSpr.position.set(0, 0.115, 0);
          stack.add(labelSpr);

          trayGroup.add(stack);
          pokerChipStacks.push(stack);
        });

        // 6. 3D Dealer Button Puck & Deck of Cards
        const dealerPuck = new THREE.Mesh(
          new THREE.CylinderGeometry(0.10, 0.10, 0.025, 32),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 })
        );
        dealerPuck.position.set(0.85, 0.835, -0.90);
        dealerPuck.castShadow = true;

        const puckGoldRim = new THREE.Mesh(
          new THREE.TorusGeometry(0.10, 0.008, 12, 32),
          brassMat
        );
        puckGoldRim.rotation.x = Math.PI / 2;
        puckGoldRim.position.set(0.85, 0.845, -0.90);

        // 3D Deck Box / Staged Cards
        const deckMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.08, 0.44),
          new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.35, metalness: 0.2 })
        );
        deckMesh.position.set(-0.85, 0.840, -0.90);
        deckMesh.rotation.y = 0.25;

        // 7. Containers for 3D Cards and 3D Placed Chips
        const pokerCardsGroup = new THREE.Group();
        pokerCardsGroup.position.set(0, 0.850, 0);

        const pokerChipsGroup = new THREE.Group();
        pokerChipsGroup.position.set(0, 0.850, 0);

        // 8. Raycastable Bet Spot Trigger Discs for the 8 Player Betting Circles
        for (let i = 0; i < 8; i++) {
          const ang = i * (Math.PI / 4);
          const betDist3D = 1.50; // In 3D world meters from table center
          const spotX = Math.sin(ang) * betDist3D;
          const spotZ = Math.cos(ang) * betDist3D;

          const spotHitMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.24, 0.24, 0.06, 16),
            new THREE.MeshBasicMaterial({ visible: false })
          );
          spotHitMesh.position.set(spotX, 0.01, spotZ);
          spotHitMesh.userData = { isPokerBetSpot: true, seatIndex: i };
          pokerChipsGroup.add(spotHitMesh);
          pokerBetSpots.push(spotHitMesh);
        }

        // Highlight selected 3D chip in dealer rack
        function update3DPokerChipRackSelection() {
          if (!pokerChipStacks) return;
          const curVal = (typeof pokerState !== 'undefined' && pokerState && pokerState.selectedChip) ? pokerState.selectedChip : 50;
          pokerChipStacks.forEach(stack => {
            const val = stack.userData.chipVal;
            const isSelected = (val === curVal);
            stack.position.y = isSelected ? 0.865 : 0.842;
            stack.scale.set(isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0);
          });
        }

        // Tabletop assembly
        const tabletopGroup = new THREE.Group();
        tabletopGroup.add(
          pokerBase, tabletopGoldTrim, pokerRail, innerRailGoldTrim, pokerFelt,
          trayGroup, dealerPuck, puckGoldRim, deckMesh,
          pokerCardsGroup, pokerChipsGroup
        );
        pokerGroup.add(tabletopGroup);

        pokerGroup.position.y = 0.35;

        function update3DPokerChips() {
          if (!pokerChipsGroup) return;
          const toRemove = pokerChipsGroup.children.filter(c => !c.userData.isPokerBetSpot);
          toRemove.forEach(c => pokerChipsGroup.remove(c));

          if (typeof pokerState === 'undefined' || !pokerState) return;

          if (pokerState.seats) {
            pokerState.seats.forEach((seat, idx) => {
              const betAmt = seat ? (seat.bet || 0) : 0;
              if (betAmt > 0) {
                const ang = idx * (Math.PI / 4);
                const betDist3D = 1.50;
                const bx = Math.sin(ang) * betDist3D;
                const bz = Math.cos(ang) * betDist3D;

                const stack = create3DChipStackMesh(betAmt, 0.065, 0.016);
                stack.position.set(bx, 0.008, bz);
                pokerChipsGroup.add(stack);
              }
            });
          }

          const potAmt = pokerState.pot || 0;
          if (potAmt > 0) {
            const potStack = create3DChipStackMesh(potAmt, 0.075, 0.018);
            potStack.position.set(0, 0.008, 0);
            pokerChipsGroup.add(potStack);
          }
        }
        window.update3DPokerChips = update3DPokerChips;

        window.poker3DRefs = {
          group: pokerGroup,
          felt: pokerFelt,
          dealerPuck,
          cardsGroup: pokerCardsGroup,
          chipsGroup: pokerChipsGroup,
          chipStacks: pokerChipStacks,
          betSpots: pokerBetSpots,
          update3DPokerChipRackSelection,
          update3DPokerChips
        };

        return pokerGroup;
      }

      ZONES.forEach(z => {
        const g = new THREE.Group();
        g.position.set(z.x, 0, z.z);

        const platH = 0.35;
        const platY = 0.18;
        let platW = z.radius * 1.90;
        let platD = z.radius * 1.90;
        let cornerR = Math.min(1.8, z.radius * 0.25);

        // Ajuste individualizado únicamente en las zonas con solapamiento o exceso de espacio
        if (z.id === 'slots' || z.id === 'pachinko' || z.id === 'tragaperras') {
          // Filas paralelas de máquinas (evita colisión entre filas contiguas)
          platW = 18.0;
          platD = 5.2;
          cornerR = 1.0;
        } else if (z.id === 'cinema') {
          // Cine (evita solapamiento frontal hacia la Ruleta)
          platW = 16.0;
          platD = 10.8;
          cornerR = 1.5;
        } else if (z.id === 'tvcasino') {
          // Salón de TV Casino
          platW = 14.5;
          platD = 14.5;
          cornerR = 1.8;
        } else if (z.id === 'bar') {
          // Área del Bar en la zona sur (ampliada para alojar la barra curva completa, estantería y taburetes)
          platW = 18.0;
          platD = 16.0;
          cornerR = 2.4;
        } else if (z.id === 'roulette') {
          // Ruleta 3D
          platW = 10.4;
          platD = 10.4;
          cornerR = 1.6;
        } else if (z.id === 'blackjack') {
          // Blackjack 21
          platW = 9.0;
          platD = 8.5;
          cornerR = 1.4;
        } else if (z.id === 'poker') {
          // Mesa Circular de Poker 3D (8 jugadores)
          platW = 10.4;
          platD = 10.4;
          cornerR = 1.6;
        } else if (z.id === 'bowling') {
          // Bolera real gigante de 48m de largo
          platW = 24.0;
          platD = 66.0;
          cornerR = 2.0;
        }

        // 1. Plataforma cuadrada de lujo con bordes redondeados (Omitida para la gramola para que no tenga plataforma sobrante)
        let ring = null;
        if (z.id !== 'jukebox' && z.id !== 'cinema') {
          const plat = createRoundedPlatformMesh(platW, platD, platH, cornerR, 0x1a1030, z.color);
          g.add(plat);

          // 2. Borde de neón perimetral a juego con la forma cuadrada redondeada
          ring = createRoundedPlatformNeonTrim(platW, platD, cornerR, z.color);
          g.add(ring);
        }

        // Exclusive Luxury Enhancements for Roulette 3D Platform
        if (z.id === 'roulette') {
          // Tiered Base Step & Inlaid Gold Frames
          const stepPlat = createRoundedPlatformMesh(platW + 1.0, platD + 1.0, 0.15, cornerR + 0.4, 0x0c0717, 0x000000);
          stepPlat.position.y = 0.075;
          g.add(stepPlat);

          const goldFrame1 = createRoundedPlatformNeonTrim(platW * 0.85, platD * 0.85, cornerR * 0.85, 0xd4af37);
          goldFrame1.position.y = 0.358;
          const goldFrame2 = createRoundedPlatformNeonTrim(platW * 0.55, platD * 0.55, cornerR * 0.55, 0xd4af37);
          goldFrame2.position.y = 0.358;
          g.add(goldFrame1, goldFrame2);

          // 4 Brass Stanchion Pillars with VIP Velvet Ropes
          const stanchionMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.1 });
          const stanchionPositions = [
            [-(platW / 2 - 0.4), -(platD / 2 - 0.4)],
            [(platW / 2 - 0.4), -(platD / 2 - 0.4)],
            [-(platW / 2 - 0.4), (platD / 2 - 0.4)],
            [(platW / 2 - 0.4), (platD / 2 - 0.4)]
          ];
          stanchionPositions.forEach(([sx, sz]) => {
            const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.1, 16), stanchionMat);
            post.position.set(sx, 0.55, sz);
            const ballTop = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), stanchionMat);
            ballTop.position.set(sx, 1.15, sz);
            const baseCap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.08, 16), stanchionMat);
            baseCap.position.set(sx, 0.04, sz);
            g.add(post, ballTop, baseCap);
          });
        }

        /* 3D seats around table / zone (Clean unified luxury casino stools / Traditional cinema seats) */
        if (z.id !== 'jackpot') {
          z.seats.forEach((seat, sIdx) => {
            if (z.id === 'cinema') {
              // Butacas Tradicionales de Cine de Terciopelo Rojo con Portavasos y Palomitas
              const cinemaSeat = createTraditionalCinemaSeat(`C${sIdx + 1}`, (sIdx % 2 === 0));
              const seatFloorY = (typeof seat.y === 'number') ? seat.y : (platY + platH / 2);
              cinemaSeat.position.set(seat.x - z.x, seatFloorY, seat.z - z.z);
              cinemaSeat.rotation.y = seat.r;
              g.add(cinemaSeat);
            } else {
              const stoolGroup = new THREE.Group();
              stoolGroup.position.set(seat.x - z.x, platY + platH / 2, seat.z - z.z);
              stoolGroup.rotation.y = seat.r;

              const stoolFoot = new THREE.Mesh(
                new THREE.CylinderGeometry(0.30, 0.34, 0.04, 20),
                new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.12 })
              );
              stoolFoot.position.y = 0.02;

              const stoolStem = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 0.42, 16),
                new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.12 })
              );
              stoolStem.position.y = 0.23;

              const stoolFootrest = new THREE.Mesh(
                new THREE.TorusGeometry(0.18, 0.018, 12, 24),
                new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.12 })
              );
              stoolFootrest.rotation.x = Math.PI / 2;
              stoolFootrest.position.y = 0.15;

              const cushionMat = new THREE.MeshStandardMaterial({
                color: 0x22123a,
                roughness: 0.45,
                metalness: 0.20,
                emissive: new THREE.Color(z.color),
                emissiveIntensity: 0.15
              });
              const stoolCushion = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.32, 0.10, 24), cushionMat);
              stoolCushion.position.y = 0.46;
              stoolCushion.castShadow = true;

              const stoolGoldRim = new THREE.Mesh(
                new THREE.TorusGeometry(0.34, 0.016, 12, 24),
                new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.12 })
              );
              stoolGoldRim.rotation.x = Math.PI / 2;
              stoolGoldRim.position.y = 0.46;

              stoolGroup.add(stoolFoot, stoolStem, stoolFootrest, stoolCushion, stoolGoldRim);
              g.add(stoolGroup);
            }
          });
        }

        /* Centerpiece 3D Model construction */
        let centerpiece;
        if (z.id === 'roulette') {
          const rGroup = new THREE.Group();
          rGroup.position.z = 0.70;

          // 2. ELEVATED 3D ROULETTE WHEEL STATION
          const wheelGroup = new THREE.Group();
          wheelGroup.position.set(0, 0.60, -3.2);

          // Circular Mahogany Wheel Pedestal Base (Replacing bulky rectangular slab)
          const wheelBaseGeo = new THREE.CylinderGeometry(1.86, 2.05, 0.55, 36);
          const wheelBaseMat = new THREE.MeshStandardMaterial({ color: 0x1c0d06, roughness: 0.3, metalness: 0.2 });
          const wheelBaseMesh = new THREE.Mesh(wheelBaseGeo, wheelBaseMat);
          wheelBaseMesh.position.y = 0.05;
          wheelGroup.add(wheelBaseMesh);

          const wheelBaseGoldTrim = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.06, 12, 48),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.15 }));
          wheelBaseGoldTrim.rotation.x = Math.PI / 2;
          wheelBaseGoldTrim.position.y = 0.32;
          wheelGroup.add(wheelBaseGoldTrim);

          // Wheel Neon Ring Surround
          const wheelNeon = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.04, 12, 48),
            new THREE.MeshStandardMaterial({ color: 0x8B5CF6, emissive: 0x8B5CF6, emissiveIntensity: 1.8 }));
          wheelNeon.rotation.x = Math.PI / 2;
          wheelNeon.position.y = 0.45;
          wheelGroup.add(wheelNeon);

          // Volumetric Mahogany Bowl (Lathe Geometry with Polished Metallic Rim Inserts)
          const bowlPoints = [
            new THREE.Vector2(0, 0.20),
            new THREE.Vector2(1.84, 0.20),
            new THREE.Vector2(1.80, 0.64),
            new THREE.Vector2(1.68, 0.64),
            new THREE.Vector2(1.28, 0.36),
            new THREE.Vector2(0, 0.36),
          ];
          const bowlGeo = new THREE.LatheGeometry(bowlPoints, 48);
          const bowlMat = new THREE.MeshStandardMaterial({ color: 0x1c0d06, roughness: 0.25, metalness: 0.2, side: THREE.DoubleSide });
          const bowl = new THREE.Mesh(bowlGeo, bowlMat);
          bowl.receiveShadow = true; bowl.castShadow = true;
          wheelGroup.add(bowl);

          // Polished Brass Outer Rim
          const rimGeo = new THREE.TorusGeometry(1.50, 0.05, 12, 48);
          const rimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.15, side: THREE.DoubleSide });
          const rim = new THREE.Mesh(rimGeo, rimMat);
          rim.rotation.x = Math.PI / 2; rim.position.y = 0.64;
          wheelGroup.add(rim);

          // 12 Physical Brass Diamond Deflectors (Fret Pins around sloped track)
          const deflectorMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.1 });
          for (let d = 0; d < 12; d++) {
            const angle = (d / 12) * Math.PI * 2;
            const deflector = new THREE.Mesh(new THREE.OctahedronGeometry(0.045, 0), deflectorMat);
            deflector.scale.set(0.6, 1.4, 0.6);
            deflector.position.set(Math.cos(angle) * 1.38, 0.54, Math.sin(angle) * 1.38);
            deflector.rotation.y = angle;
            wheelGroup.add(deflector);
          }

          // Sunken Rotor Group
          const rotorGroup = new THREE.Group();
          rotorGroup.position.y = 0.38;

          const rotorBaseGeo = new THREE.CylinderGeometry(1.26, 1.26, 0.06, 36);
          const rotorBaseMat = new THREE.MeshStandardMaterial({ color: 0x11091c, roughness: 0.4 });
          const rotorBase = new THREE.Mesh(rotorBaseGeo, rotorBaseMat);
          rotorGroup.add(rotorBase);

          // Helper for high-definition 3D pocket numbers
          function makeNumTexture(num, colHex) {
            const c = document.createElement('canvas'); c.width = 128; c.height = 128;
            const ctx = c.getContext('2d');
            ctx.clearRect(0, 0, 128, 128);

            // Outer pocket plaque badge
            ctx.fillStyle = colHex;
            if (ctx.roundRect) ctx.roundRect(8, 8, 112, 112, 16);
            else ctx.fillRect(8, 8, 112, 112);
            ctx.fill();

            // Gold metallic border
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 6;
            ctx.stroke();

            // Inner trim
            ctx.strokeStyle = 'rgba(255,255,255,0.35)';
            ctx.lineWidth = 2;
            if (ctx.roundRect) ctx.roundRect(14, 14, 100, 100, 12);
            else ctx.strokeRect(14, 14, 100, 100);
            ctx.stroke();

            ctx.font = '900 66px "Segoe UI", Arial, sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            ctx.fillText(num, 66, 68); // drop shadow
            ctx.fillStyle = '#ffffff';
            ctx.fillText(num, 64, 64);
            return new THREE.CanvasTexture(c);
          }

          // 37 Pocket segments on rotor with 3D Modeled Numbers & 3D Metallic Separator Frets
          const segAngle = (Math.PI * 2) / 37;
          const startOffset = -0.4263;
          const fretMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.35, metalness: 0.92, roughness: 0.15 });
          const plateBezelMat = new THREE.MeshStandardMaterial({ color: 0x14101e, metalness: 0.85, roughness: 0.2 });

          for (let i = 0; i < 37; i++) {
            const num = WHEEL_ORDER[i];
            const col = numColor(num);
            const hexCol = col === 'green' ? 0x15803d : col === 'red' ? 0xb91c1c : 0x18181b;
            const strCol = col === 'green' ? '#15803d' : col === 'red' ? '#b91c1c' : '#18181b';

            const pocketGroup = new THREE.Group();
            pocketGroup.rotation.y = startOffset - i * segAngle;

            // 1. Recessed Inner Pocket Floor Segment (Where the ball settles flush on top)
            const segGeo = new THREE.CylinderGeometry(1.02, 0.42, 0.045, 6, 1, false, -segAngle / 2, segAngle);
            const segMat = new THREE.MeshStandardMaterial({ color: hexCol, roughness: 0.35, metalness: 0.15 });
            const seg = new THREE.Mesh(segGeo, segMat);
            seg.position.y = 0.0225;
            pocketGroup.add(seg);

            // 2. 3D Outer Number Plaque Bevel Base
            const plaqueBase = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.02, 0.20), plateBezelMat);
            plaqueBase.position.set(0, 0.042, 1.13);
            pocketGroup.add(plaqueBase);

            // 3. 3D Number Badge Mesh (Flat on rotor surface, perfectly aligned and rotating in authentic 3D)
            const numTex = makeNumTexture(num, strCol);
            const numBadgeGeo = new THREE.PlaneGeometry(0.175, 0.185);
            const numBadgeMat = new THREE.MeshStandardMaterial({
              map: numTex,
              roughness: 0.25,
              metalness: 0.2,
              polygonOffset: true,
              polygonOffsetFactor: -1,
              polygonOffsetUnits: -1
            });
            const numBadgeMesh = new THREE.Mesh(numBadgeGeo, numBadgeMat);
            numBadgeMesh.rotation.x = -Math.PI / 2;
            numBadgeMesh.rotation.z = Math.PI; // Oriented upright towards table viewpoint
            numBadgeMesh.position.set(0, 0.054, 1.13);
            pocketGroup.add(numBadgeMesh);

            // 4. 3D Metallic Fret Separator Blade (Radial brass separator dividing this pocket from the next)
            const fretGroup = new THREE.Group();
            fretGroup.rotation.y = segAngle / 2;
            const fretMesh = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.040, 0.50), fretMat);
            fretMesh.position.set(0, 0.044, 0.77);
            fretGroup.add(fretMesh);

            // Small outer gold stop pin
            const fretPin = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.048, 12), fretMat);
            fretPin.position.set(0, 0.048, 1.04);
            fretGroup.add(fretPin);

            pocketGroup.add(fretGroup);

            rotorGroup.add(pocketGroup);
          }

          // Multi-Tier Spindle & Brass Cross Arms (Authentic Casino Turret Centerpiece)
          const turretGeo = new THREE.CylinderGeometry(0.14, 0.28, 0.35, 24);
          const turretMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.92, roughness: 0.1 });
          const turret = new THREE.Mesh(turretGeo, turretMat);
          turret.position.y = 0.18;

          const turretTop = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), turretMat);
          turretTop.position.y = 0.36;

          const crossArmGroup = new THREE.Group();
          crossArmGroup.position.y = 0.32;
          for (let a = 0; a < 4; a++) {
            const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.42, 16), turretMat);
            arm.rotation.z = Math.PI / 2;
            arm.position.x = 0.21;
            const armGroup = new THREE.Group();
            armGroup.rotation.y = (a * Math.PI) / 2;
            armGroup.add(arm);

            const knob = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), turretMat);
            knob.position.set(0.42, 0, 0);
            armGroup.add(knob);

            crossArmGroup.add(armGroup);
          }

          rotorGroup.add(turret, turretTop, crossArmGroup);
          wheelGroup.add(rotorGroup);

          // Polished Ivory Ball Mesh
          const ballGeo = new THREE.SphereGeometry(0.07, 24, 24);
          const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.05, emissive: 0xffffff, emissiveIntensity: 0.2 });
          const ballMesh = new THREE.Mesh(ballGeo, ballMat);
          const initBallAngle = -0.4263; // Casilla 0 inicial
          ballMesh.position.set(Math.sin(initBallAngle) * 0.84, 0.505, Math.cos(initBallAngle) * 0.84);
          ballMesh.castShadow = true;
          wheelGroup.add(ballMesh);

          rGroup.add(wheelGroup);

          // 3. PHYSICAL 3D FELT & BETTING TABLE SETUP
          const feltCanvas = document.createElement('canvas');
          feltCanvas.width = 2048; feltCanvas.height = 1024;
          const ctx = feltCanvas.getContext('2d');
          const feltTex = new THREE.CanvasTexture(feltCanvas);

          function getBetCanvasCenter(key) {
            if (key === undefined || key === null) return { x: 1024, y: 512 };
            const sKey = String(key).trim();

            let numVal = null;
            if (sKey === '0' || sKey === 'num-0') numVal = 0;
            else if (sKey.startsWith('num-')) numVal = parseInt(sKey.replace('num-', ''), 10);
            else if (!isNaN(parseInt(sKey, 10))) numVal = parseInt(sKey, 10);

            if (numVal === 0) return { x: 145, y: 345 };
            if (numVal !== null && !isNaN(numVal)) {
              for (let rIdx = 0; rIdx < 3; rIdx++) {
                const cIdx = NUM_ROWS[rIdx].indexOf(numVal);
                if (cIdx !== -1) {
                  return {
                    x: 240 + cIdx * 126 + 63,
                    y: 30 + rIdx * 210 + 105
                  };
                }
              }
            }

            if (sKey === 'col3') return { x: 1836, y: 135 };
            if (sKey === 'col2') return { x: 1836, y: 345 };
            if (sKey === 'col1') return { x: 1836, y: 555 };
            if (sKey === 'dozen1') return { x: 492, y: 735 };
            if (sKey === 'dozen2') return { x: 996, y: 735 };
            if (sKey === 'dozen3') return { x: 1500, y: 735 };
            if (sKey === 'low') return { x: 366, y: 900 };
            if (sKey === 'even') return { x: 618, y: 900 };
            if (sKey === 'red') return { x: 870, y: 900 };
            if (sKey === 'black') return { x: 1122, y: 900 };
            if (sKey === 'odd') return { x: 1374, y: 900 };
            if (sKey === 'high') return { x: 1626, y: 900 };

            return { x: 1024, y: 512 };
          }

          function draw3DFeltGrid() {
            feltCanvas.width = 2048; feltCanvas.height = 1024;
            ctx.fillStyle = '#0f091f'; ctx.fillRect(0, 0, 2048, 1024);

            // Gold Outer Frame
            ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 8;
            ctx.strokeRect(30, 20, 1988, 984);

            // 0 Green Cell (left column)
            ctx.fillStyle = '#15803d'; ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4;
            ctx.fillRect(50, 30, 190, 630); ctx.strokeRect(50, 30, 190, 630);
            ctx.font = 'bold 80px Segoe UI'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText('0', 145, 345);

            // 3x12 Grid Numbers (1 to 36)
            const cellW = 126, cellH = 210;
            const startX = 240, startY = 30;

            NUM_ROWS.forEach((row, rIdx) => {
              row.forEach((n, cIdx) => {
                const x = startX + cIdx * cellW;
                const y = startY + rIdx * cellH;
                const col = numColor(n);
                ctx.fillStyle = col === 'red' ? '#b91c1c' : '#18181b';
                ctx.fillRect(x, y, cellW, cellH);
                ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.strokeRect(x, y, cellW, cellH);
                ctx.font = 'bold 64px Segoe UI'; ctx.fillStyle = '#fff';
                ctx.fillText(n, x + cellW / 2, y + cellH / 2);
              });
              // 2:1 column bets
              const x2 = startX + 12 * cellW;
              const y2 = startY + rIdx * cellH;
              ctx.fillStyle = '#1e1436'; ctx.fillRect(x2, y2, 168, cellH);
              ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 3; ctx.strokeRect(x2, y2, 168, cellH);
              ctx.font = 'bold 44px Segoe UI'; ctx.fillStyle = '#d4af37';
              ctx.fillText('2 a 1', x2 + 84, y2 + cellH / 2);
            });

            // Dozens (1ST 12, 2ND 12, 3RD 12)
            const dozY = startY + 3 * cellH; // 660
            const dozW = cellW * 4; // 504
            const dozLabels = ['1ST 12', '2ND 12', '3RD 12'];
            dozLabels.forEach((lbl, i) => {
              const x = startX + i * dozW;
              ctx.fillStyle = '#1a1030'; ctx.fillRect(x, dozY, dozW, 150);
              ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 3; ctx.strokeRect(x, dozY, dozW, 150);
              ctx.font = 'bold 50px Segoe UI'; ctx.fillStyle = '#fff';
              ctx.fillText(lbl, x + dozW / 2, dozY + 75);
            });

            // Outside Bets (1 A 18, PAR, ROJO, NEGRO, IMPAR, 19 A 36)
            const outY = dozY + 150; // 810
            const outW = cellW * 2; // 252
            const outBets = [
              { l: '1 A 18', bg: '#1a1030' },
              { l: 'PAR', bg: '#1a1030' },
              { l: 'ROJO', bg: '#b91c1c', diamond: true },
              { l: 'NEGRO', bg: '#18181b', diamond: true },
              { l: 'IMPAR', bg: '#1a1030' },
              { l: '19 A 36', bg: '#1a1030' }
            ];

            outBets.forEach((ob, i) => {
              const x = startX + i * outW;
              ctx.fillStyle = ob.bg; ctx.fillRect(x, outY, outW, 180);
              ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 3; ctx.strokeRect(x, outY, outW, 180);
              if (ob.diamond) {
                ctx.beginPath();
                ctx.moveTo(x + outW / 2, outY + 30);
                ctx.lineTo(x + outW / 2 + 55, outY + 90);
                ctx.lineTo(x + outW / 2, outY + 150);
                ctx.lineTo(x + outW / 2 - 55, outY + 90);
                ctx.closePath();
                ctx.fillStyle = ob.l === 'ROJO' ? '#ef4444' : '#000000';
                ctx.fill(); ctx.stroke();
              } else {
                ctx.font = 'bold 44px Segoe UI'; ctx.fillStyle = '#fff';
                ctx.fillText(ob.l, x + outW / 2, outY + 90);
              }
            });

            feltTex.needsUpdate = true;
          }
          draw3DFeltGrid();

          // 3. SEAMLESS CASINO ROULETTE TABLE CHASSIS WITH CRADLE ENCLOSING THE WHEEL
          const tableChassisGroup = new THREE.Group();

          const R_OUTER = 2.36;
          const R_INNER = 1.96;
          const WHEEL_Z = -3.20;
          const FRONT_Z = 1.65;
          const FRONT_R = 0.22;

          // 1. Solid Table Top Chassis with smooth rounded corners & semicircular wheel cradle
          const cradleShape = new THREE.Shape();
          cradleShape.moveTo(R_OUTER - FRONT_R, FRONT_Z);
          cradleShape.quadraticCurveTo(R_OUTER, FRONT_Z, R_OUTER, FRONT_Z - FRONT_R);
          cradleShape.lineTo(R_OUTER, WHEEL_Z);
          cradleShape.absarc(0, WHEEL_Z, R_OUTER, 0, Math.PI, true);
          cradleShape.lineTo(-R_OUTER, FRONT_Z - FRONT_R);
          cradleShape.quadraticCurveTo(-R_OUTER, FRONT_Z, -(R_OUTER - FRONT_R), FRONT_Z);
          cradleShape.closePath();

          // Semicircular Cutout Hole for Roulette Wheel
          const wheelHole = new THREE.Path();
          wheelHole.absarc(0, WHEEL_Z, R_INNER, 0, Math.PI * 2, true);
          cradleShape.holes.push(wheelHole);

          const tableGeo = new THREE.ExtrudeGeometry(cradleShape, {
            depth: 0.10,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 3
          });
          const tableMat = new THREE.MeshStandardMaterial({ color: 0x1a0d24, roughness: 0.35, metalness: 0.2 });
          const tableMesh = new THREE.Mesh(tableGeo, tableMat);
          tableMesh.rotation.x = Math.PI / 2;
          tableMesh.position.y = 0.65;
          tableMesh.receiveShadow = true;
          tableChassisGroup.add(tableMesh);

          // 2. ONE Continuous, Seamless Integrated Padded Leather Armrest Rail (No disjointed seams!)
          const RAIL_W = 0.16;
          const rRailOut = R_OUTER + 0.02;
          const rRailIn = R_OUTER - RAIL_W;

          const railShape = new THREE.Shape();
          railShape.moveTo(rRailOut - FRONT_R, FRONT_Z + 0.02);
          railShape.quadraticCurveTo(rRailOut, FRONT_Z + 0.02, rRailOut, FRONT_Z - FRONT_R);
          railShape.lineTo(rRailOut, WHEEL_Z);
          railShape.absarc(0, WHEEL_Z, rRailOut, 0, Math.PI, true);
          railShape.lineTo(-rRailOut, FRONT_Z - FRONT_R);
          railShape.quadraticCurveTo(-rRailOut, FRONT_Z + 0.02, -(rRailOut - FRONT_R), FRONT_Z + 0.02);
          railShape.closePath();

          const railHole = new THREE.Path();
          railHole.moveTo(-(rRailIn - FRONT_R), FRONT_Z - 0.12);
          railHole.quadraticCurveTo(-rRailIn, FRONT_Z - 0.12, -rRailIn, FRONT_Z - FRONT_R);
          railHole.lineTo(-rRailIn, WHEEL_Z);
          railHole.absarc(0, WHEEL_Z, rRailIn, Math.PI, 0, false);
          railHole.lineTo(rRailIn, FRONT_Z - FRONT_R);
          railHole.quadraticCurveTo(rRailIn, FRONT_Z - 0.12, rRailIn - FRONT_R, FRONT_Z - 0.12);
          railHole.closePath();
          railShape.holes.push(railHole);

          const railGeo = new THREE.ExtrudeGeometry(railShape, {
            depth: 0.06,
            bevelEnabled: true,
            bevelThickness: 0.025,
            bevelSize: 0.025,
            bevelSegments: 4
          });
          const armrestMat = new THREE.MeshStandardMaterial({ color: 0x12081d, roughness: 0.55 });
          const railMesh = new THREE.Mesh(railGeo, armrestMat);
          railMesh.rotation.x = Math.PI / 2;
          railMesh.position.y = 0.760;
          tableChassisGroup.add(railMesh);

          // 4 Sculpted Pedestal Columns with Brass Feet
          const pedestalMat = new THREE.MeshStandardMaterial({ color: 0x1c0d06, roughness: 0.35, metalness: 0.2 });
          const brassFootMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.15 });

          [[-1.6, 0.50], [1.6, 0.50], [-1.5, -3.8], [1.5, -3.8]].forEach(([px, pz]) => {
            const col = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.26, 0.60, 16), pedestalMat);
            col.position.set(px, 0.30, pz);
            const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.34, 0.08, 16), brassFootMat);
            foot.position.set(px, 0.04, pz);
            tableChassisGroup.add(col, foot);
          });

          rGroup.add(tableChassisGroup);

          // 3.1. RAISED LUXURY FELT DAIS PLATFORM WITH GOLD TRIM
          const daisGroup = new THREE.Group();
          daisGroup.position.set(0, 0.770, 0.40);

          const feltBaseMat = new THREE.MeshStandardMaterial({ color: 0x1f1035, roughness: 0.35, metalness: 0.25 });
          const feltBase = new THREE.Mesh(new THREE.BoxGeometry(3.64, 0.04, 2.24), feltBaseMat);
          feltBase.castShadow = true; feltBase.receiveShadow = true;

          const feltGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(3.66, 0.015, 2.26),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.15 }));
          feltGoldTrim.position.y = -0.012;

          daisGroup.add(feltBase, feltGoldTrim);
          rGroup.add(daisGroup);

          // 3.2. CRISP 2D FELT BETTING BOARD (Significantly ELEVATED towards the ceiling in Y at y = 0.795!)
          const feltGeo = new THREE.PlaneGeometry(3.6, 2.2);
          const feltMat = new THREE.MeshStandardMaterial({
            map: feltTex,
            roughness: 0.45,
            metalness: 0.10,
            side: THREE.DoubleSide,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            polygonOffsetUnits: -4
          });
          const feltMesh = new THREE.Mesh(feltGeo, feltMat);
          feltMesh.rotation.x = -Math.PI / 2;
          feltMesh.position.set(0, 0.795, 0.40);
          feltMesh.name = 'rouletteFelt3D';
          rGroup.add(feltMesh);

          // 3.3. PHYSICAL HIGH-RELIEF 3D GOLD MOLDED GRID (Visible from all standing angles & distances!)
          const goldRibGroup = new THREE.Group();
          const goldRibMat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.96,
            roughness: 0.08,
            emissive: 0xd97706,
            emissiveIntensity: 0.32
          });

          const ribH = 0.032; // 32mm High-relief 3D height above felt (Visible from all camera angles!)
          const ribThickness = 0.020; // 20mm bold solid divider bar
          const ribY = 0.811; // Sits with top at y = 0.827m

          function addGoldHLine(cx1, cx2, cy, h = ribH, thick = ribThickness) {
            const x1 = ((cx1 / 2048) - 0.5) * 3.6;
            const x2 = ((cx2 / 2048) - 0.5) * 3.6;
            const z = 0.40 + ((cy / 1024) - 0.5) * 2.2;
            const len = Math.abs(x2 - x1) + thick;
            const midX = (x1 + x2) / 2;
            const rib = new THREE.Mesh(new THREE.BoxGeometry(len, h, thick), goldRibMat);
            rib.position.set(midX, ribY, z);
            rib.castShadow = true; rib.receiveShadow = true;
            goldRibGroup.add(rib);
          }

          function addGoldVLine(cx, cy1, cy2, h = ribH, thick = ribThickness) {
            const x = ((cx / 2048) - 0.5) * 3.6;
            const z1 = 0.40 + ((cy1 / 1024) - 0.5) * 2.2;
            const z2 = 0.40 + ((cy2 / 1024) - 0.5) * 2.2;
            const len = Math.abs(z2 - z1) + thick;
            const midZ = (z1 + z2) / 2;
            const rib = new THREE.Mesh(new THREE.BoxGeometry(thick, h, len), goldRibMat);
            rib.position.set(x, ribY, midZ);
            rib.castShadow = true; rib.receiveShadow = true;
            goldRibGroup.add(rib);
          }

          // 1. Outer Perimeter High-Relief Gold Frame
          const borderH = 0.038;
          const borderThick = 0.026;
          addGoldHLine(30, 2018, 20, borderH, borderThick);
          addGoldHLine(30, 2018, 1004, borderH, borderThick);
          addGoldVLine(30, 20, 1004, borderH, borderThick);
          addGoldVLine(2018, 20, 1004, borderH, borderThick);

          // 2. Zero Cell
          addGoldHLine(50, 240, 30);
          addGoldHLine(50, 240, 660);
          addGoldVLine(50, 30, 660);
          addGoldVLine(240, 30, 660);

          // 3. Numbers Grid 3x12 (1 to 36)
          for (let r = 0; r <= 3; r++) {
            addGoldHLine(240, 1752, 30 + r * 210);
          }
          for (let c = 0; c <= 12; c++) {
            addGoldVLine(240 + c * 126, 30, 660);
          }

          // 4. 2:1 Column Bets (Right Flank)
          for (let r = 0; r <= 3; r++) {
            addGoldHLine(1752, 1920, 30 + r * 210);
          }
          addGoldVLine(1920, 30, 660);

          // 5. Dozens Row (1st 12, 2nd 12, 3rd 12)
          addGoldHLine(240, 1752, 660);
          addGoldHLine(240, 1752, 810);
          for (let d = 0; d <= 3; d++) {
            addGoldVLine(240 + d * 504, 660, 810);
          }

          // 6. Outside Bets Row (1 A 18, PAR, ROJO, NEGRO, IMPAR, 19 A 36)
          addGoldHLine(240, 1752, 810);
          addGoldHLine(240, 1752, 990);
          for (let o = 0; o <= 6; o++) {
            addGoldVLine(240 + o * 252, 810, 990);
          }

          rGroup.add(goldRibGroup);

          // 4. LATERAL FLANKING 3D CHIP RACKS (Elevated to y = 0.798!)
          const controlGroup = new THREE.Group();
          controlGroup.position.set(0, 0.798, 0.40);

          const chip3DMeshes = [];

          // Left Lateral Groove & Tray (x = -2.10m)
          const trayLeft = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.02, 2.25),
            new THREE.MeshStandardMaterial({ color: 0x14091e, roughness: 0.4, metalness: 0.3 }));
          trayLeft.position.set(-2.10, 0, 0);
          const trayLeftGold = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.01, 2.27),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.15 }));
          trayLeftGold.position.set(-2.10, 0.010, 0);

          // Right Lateral Groove & Tray (x = +2.10m)
          const trayRight = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.02, 2.25),
            new THREE.MeshStandardMaterial({ color: 0x14091e, roughness: 0.4, metalness: 0.3 }));
          trayRight.position.set(2.10, 0, 0);
          const trayRightGold = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.01, 2.27),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.15 }));
          trayRightGold.position.set(2.10, 0.010, 0);
          controlGroup.add(trayLeft, trayLeftGold, trayRight, trayRightGold);

          // 8 Chips Left (Low stakes: $0.1 to $20)
          // 8 Chips Right (High stakes: $50 to $10K)
          const zSpans = [-0.98, -0.70, -0.42, -0.14, 0.14, 0.42, 0.70, 0.98];

          const chipPlacement = [
            // Left row (1 single line)
            { idx: 0, x: -2.10, z: zSpans[0] }, // 0.1
            { idx: 1, x: -2.10, z: zSpans[1] }, // 0.2
            { idx: 2, x: -2.10, z: zSpans[2] }, // 0.5
            { idx: 3, x: -2.10, z: zSpans[3] }, // 1
            { idx: 4, x: -2.10, z: zSpans[4] }, // 2
            { idx: 5, x: -2.10, z: zSpans[5] }, // 5
            { idx: 6, x: -2.10, z: zSpans[6] }, // 10
            { idx: 7, x: -2.10, z: zSpans[7] }, // 20

            // Right row (1 single line)
            { idx: 8,  x: 2.10, z: zSpans[0] }, // 50
            { idx: 9,  x: 2.10, z: zSpans[1] }, // 100
            { idx: 10, x: 2.10, z: zSpans[2] }, // 200
            { idx: 11, x: 2.10, z: zSpans[3] }, // 500
            { idx: 12, x: 2.10, z: zSpans[4] }, // 1K
            { idx: 13, x: 2.10, z: zSpans[5] }, // 2K
            { idx: 14, x: 2.10, z: zSpans[6] }, // 5K
            { idx: 15, x: 2.10, z: zSpans[7] }, // 10K
          ];

          chipPlacement.forEach(p => {
            const cDef = CASINO_CHIPS[p.idx];
            const stack = new THREE.Group();
            stack.position.set(p.x, 0.020, p.z);
            stack.userData = { chipVal: cDef.v, baseX: p.x, baseZ: p.z };
            stack.name = 'chipStack_' + cDef.v;

            for (let h = 0; h < 4; h++) {
              const chipM = create3DChipSingleMesh(cDef, 0.070, 0.018);
              chipM.position.y = h * 0.020 + 0.009; // bottom sits flush on tray surface!
              chipM.rotation.y = (h * 0.35) % (Math.PI * 2);
              stack.add(chipM);
            }

            // Floating 3D Value Label
            const labelCanvas = document.createElement('canvas'); labelCanvas.width = 128; labelCanvas.height = 64;
            const lCtx = labelCanvas.getContext('2d');
            lCtx.fillStyle = '#0f081d';
            if (lCtx.roundRect) lCtx.roundRect(4, 4, 120, 56, 12); else lCtx.rect(4, 4, 120, 56);
            lCtx.fill();
            lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 3; lCtx.stroke();
            lCtx.font = '900 28px "Segoe UI", Arial, sans-serif';
            lCtx.fillStyle = '#ffffff'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
            lCtx.fillText(cDef.str, 64, 32);

            const labelTex = new THREE.CanvasTexture(labelCanvas);
            const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
            labelSpr.scale.set(0.20, 0.10, 1);
            labelSpr.position.set(0, 0.14, 0);
            stack.add(labelSpr);

            controlGroup.add(stack);
            chip3DMeshes.push(stack);
          });

          // Container group for active 3D placed chips physically on top of table
          const placedChips3DGroup = new THREE.Group();
          rGroup.add(placedChips3DGroup);

          function update3DPlacedChips() {
            while (placedChips3DGroup.children.length > 0) {
              const child = placedChips3DGroup.children[0];
              placedChips3DGroup.remove(child);
            }

            const betsMap = (typeof rState !== 'undefined' && rState && rState.bets) ? rState.bets : {};

            Object.entries(betsMap).forEach(([key, amt]) => {
              if (!amt || amt <= 0) return;

              const center = getBetCanvasCenter(key);
              const canvasX = center.x, canvasY = center.y;

              // Mapeo exacto 1:1 entre coordenadas canvas (2048x1024) y la malla de tapete 3D (3.6m x 2.2m en z = 0.40)
              const chipX = ((canvasX / 2048) - 0.5) * 3.6;
              const chipZ = 0.40 + ((canvasY / 1024) - 0.5) * 2.2;
              const baseY = 0.800;

              const stackGroup = create3DChipStackMesh(amt, 0.075, 0.020);
              stackGroup.position.set(chipX, baseY, chipZ);
              placedChips3DGroup.add(stackGroup);
            });
          }

          function update3DChipRackSelection() {
            if (!chip3DMeshes) return;
            chip3DMeshes.forEach(stack => {
              const val = stack.userData.chipVal;
              const isSelected = (val === rState.selectedChip);
              stack.position.y = isSelected ? 0.08 : 0.020;
              stack.scale.set(isSelected ? 1.25 : 1.0, isSelected ? 1.25 : 1.0, isSelected ? 1.25 : 1.0);
            });
          }
          update3DChipRackSelection();

          rGroup.add(controlGroup);

          centerpiece = rGroup;
          roulette3DRefs = { group: rGroup, rotor: rotorGroup, ball: ballMesh, feltMesh, draw3DFeltGrid, update3DPlacedChips, update3DChipRackSelection, chipMeshes: chip3DMeshes, spinBtn: null, lastWinPocketAngle: -0.4263 };
          window.roulette3DRefs = roulette3DRefs;
        } else if (z.id === 'plinko') {
          const plinkoGroup = new THREE.Group();
          plinkoGroup.position.z = -3.20;

          // Procedural Polished Mahogany Wood Texture for Plinko Cabinet
          const woodCanvas = document.createElement('canvas'); woodCanvas.width = 512; woodCanvas.height = 512;
          const wCtx = woodCanvas.getContext('2d');
          wCtx.fillStyle = '#1c0d06'; wCtx.fillRect(0, 0, 512, 512);
          wCtx.fillStyle = '#2d1509';
          for (let i = 0; i < 60; i++) {
            wCtx.fillRect(0, i * 9, 512, 4 + Math.sin(i) * 2);
          }
          wCtx.fillStyle = '#0f0602';
          for (let i = 0; i < 40; i++) {
            wCtx.fillRect(0, i * 13 + 3, 512, 2);
          }
          const plinkoWoodTex = new THREE.CanvasTexture(woodCanvas);
          plinkoWoodTex.wrapS = THREE.RepeatWrapping;
          plinkoWoodTex.wrapT = THREE.RepeatWrapping;
          plinkoWoodTex.repeat.set(2, 2);

          const mahoganyMat = new THREE.MeshStandardMaterial({
            map: plinkoWoodTex,
            color: 0x3d1c0e,
            roughness: 0.35,
            metalness: 0.15
          });

          // 1. Rear Solid Mahogany Wood Backing Plate (Covering the entire rear with luxury wood)
          const rearWoodGeo = new THREE.BoxGeometry(4.8, 6.0, 0.2);
          const rearWoodMesh = new THREE.Mesh(rearWoodGeo, mahoganyMat);
          rearWoodMesh.position.set(0, 2.8, -0.42);
          rearWoodMesh.rotation.x = -0.16;
          plinkoGroup.add(rearWoodMesh);

          // Thin Neon Glow Trim Outline (Instead of giant neon block)
          const frameGeo = new THREE.BoxGeometry(4.86, 6.06, 0.04);
          const frameMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 1.8 });
          const frameMesh = new THREE.Mesh(frameGeo, frameMat);
          frameMesh.position.set(0, 2.8, -0.44);
          frameMesh.rotation.x = -0.16;
          plinkoGroup.add(frameMesh);

          // 2. Functional Inner Backboard Cabinet (Tilted slightly back ~10 degrees)
          const boardGeo = new THREE.BoxGeometry(4.4, 5.6, 0.3);
          const boardMat = new THREE.MeshStandardMaterial({ map: plinkoWoodTex, color: 0x2a1208, roughness: 0.4, metalness: 0.1 });
          const boardMesh = new THREE.Mesh(boardGeo, boardMat);
          boardMesh.position.set(0, 2.8, -0.2);
          boardMesh.rotation.x = -0.16; // tilt back
          plinkoGroup.add(boardMesh);

          // 3. OVERLAY DECORATIVE POLYGONAL CROWN ARCH & MARQUEE (Top Header Overlay)
          // Custom 2D Decorative Polygonal Crown Shape with Wing Angles & Arch Top
          const crownShape = new THREE.Shape();
          crownShape.moveTo(-2.4, 0);
          crownShape.lineTo(-2.4, 0.35);
          crownShape.lineTo(-2.0, 0.85); // Left angled wing
          crownShape.lineTo(-1.1, 1.20); // Left arch shoulder
          crownShape.quadraticCurveTo(0, 1.55, 1.1, 1.20); // Center crown arch!
          crownShape.lineTo(2.0, 0.85); // Right angled wing
          crownShape.lineTo(2.4, 0.35);
          crownShape.lineTo(2.4, 0);
          crownShape.closePath();

          const extrudeSettings = { depth: 0.28, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 };
          const crownGeo = new THREE.ExtrudeGeometry(crownShape, extrudeSettings);
          const crownMesh = new THREE.Mesh(crownGeo, mahoganyMat);
          crownMesh.position.set(0, 5.5, -0.05);
          crownMesh.rotation.x = -0.16;
          plinkoGroup.add(crownMesh);

          // Glowing Gold Neon Contour Tube following the Polygonal Crown
          const crownNeonMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 2.5 });
          const crownNeonMesh = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.08, 0.12), crownNeonMat);
          crownNeonMesh.position.set(0, 5.52, 0.26);
          crownNeonMesh.rotation.x = -0.16;
          plinkoGroup.add(crownNeonMesh);

          // Floating 3D Marquee Title Canvas Sprite on Crown ("PLINKO 3D")
          const titleCanvas = document.createElement('canvas'); titleCanvas.width = 512; titleCanvas.height = 128;
          const tCtx = titleCanvas.getContext('2d');
          tCtx.fillStyle = '#0f081d';
          if (tCtx.roundRect) tCtx.roundRect(8, 8, 496, 112, 18); else tCtx.rect(8, 8, 496, 112);
          tCtx.fill();
          tCtx.strokeStyle = '#f59e0b'; tCtx.lineWidth = 5; tCtx.stroke();
          tCtx.font = '900 48px Segoe UI'; tCtx.fillStyle = '#38bdf8'; tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
          tCtx.fillText('🎯 PLINKO 3D 🎯', 256, 64);

          const titleTex = new THREE.CanvasTexture(titleCanvas);
          const titleSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: titleTex, depthTest: false }));
          titleSpr.scale.set(2.4, 0.6, 1);
          titleSpr.position.set(0, 6.2, 0.32);
          plinkoGroup.add(titleSpr);

          // Front Glass Face
          const glassGeo = new THREE.PlaneGeometry(4.3, 5.5);
          const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, roughness: 0.1 });
          const glassMesh = new THREE.Mesh(glassGeo, glassMat);
          glassMesh.position.set(0, 2.8, 0.12);
          glassMesh.rotation.x = -0.16;
          plinkoGroup.add(glassMesh);

          // Left & Right 3D Side Walls
          const wallGeo = new THREE.BoxGeometry(0.12, 5.5, 0.45);
          const wallMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.6, transparent: true, opacity: 0.7 });
          const leftWall = new THREE.Mesh(wallGeo, wallMat);
          leftWall.position.set(-2.15, 2.8, 0.02);
          leftWall.rotation.x = -0.16;
          const rightWall = new THREE.Mesh(wallGeo, wallMat);
          rightWall.position.set(2.15, 2.8, 0.02);
          rightWall.rotation.x = -0.16;
          plinkoGroup.add(leftWall, rightWall);

          // 2. Pyramid of 3D Pegs (10 Rows)
          const pegs3DMeshes = [];
          const pegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.18, 12);

          for (let row = 0; row < 10; row++) {
            const numPegs = row + 3;
            const rowWidth = (numPegs - 1) * 0.36;
            const startX = -rowWidth / 2;
            const py = 5.0 - row * 0.44;

            for (let p = 0; p < numPegs; p++) {
              const px = startX + p * 0.36;
              const pegMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1, emissive: 0xf59e0b, emissiveIntensity: 0.2 });
              const pegMesh = new THREE.Mesh(pegGeo, pegMat);
              pegMesh.rotation.x = Math.PI / 2 - 0.16;
              const pz = -0.05 + (5.0 - py) * Math.sin(0.16);
              pegMesh.position.set(px, py, pz);

              // Shiny sphere head on peg
              const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), pegMat);
              headMesh.position.set(0, 0.10, 0);
              pegMesh.add(headMesh);

              plinkoGroup.add(pegMesh);
              pegs3DMeshes.push({ mesh: pegMesh, x: px, y: py, z: pz, r: 0.14 });
            }
          }

          // 3. Bottom Multiplier Buckets (11 Buckets: x15, x5, x2, x1.2, x0.5, x0.2, x0.5, x1.2, x2, x5, x15)
          const plinkoMults = [15, 5, 2, 1.2, 0.5, 0.2, 0.5, 1.2, 2, 5, 15];
          const multColors = [0xef4444, 0xf97316, 0xfbbf24, 0x8b5cf6, 0x38bdf8, 0x22c55e, 0x38bdf8, 0x8b5cf6, 0xfbbf24, 0xf97316, 0xef4444];
          const bucketWidth = 3.9 / 11;
          const bucketMeshes = [];

          plinkoMults.forEach((m, idx) => {
            const bx = -1.95 + idx * bucketWidth + bucketWidth / 2;
            const bMat = new THREE.MeshStandardMaterial({ color: multColors[idx], roughness: 0.3, emissive: multColors[idx], emissiveIntensity: 0.3 });
            const bucketBox = new THREE.Mesh(new THREE.BoxGeometry(bucketWidth - 0.04, 0.45, 0.24), bMat);
            bucketBox.position.set(bx, 0.45, 0.02);
            plinkoGroup.add(bucketBox);

            // Divider wall
            if (idx > 0) {
              const divMesh = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.55, 0.28), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 }));
              divMesh.position.set(-1.95 + idx * bucketWidth, 0.48, 0.02);
              plinkoGroup.add(divMesh);
            }

            // 3D Canvas Label Sprite for multiplier
            const c = document.createElement('canvas'); c.width = 128; c.height = 64;
            const ctx = c.getContext('2d');
            ctx.fillStyle = '#0f081d';
            if (ctx.roundRect) ctx.roundRect(4, 4, 120, 56, 10); else ctx.rect(4, 4, 120, 56);
            ctx.fill();
            ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.stroke();
            ctx.font = '900 30px Segoe UI'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(m + 'X', 64, 32);

            const labelTex = new THREE.CanvasTexture(c);
            const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
            labelSpr.scale.set(0.30, 0.15, 1);
            labelSpr.position.set(bx, 0.22, 0.16);
            plinkoGroup.add(labelSpr);

            bucketMeshes.push({ mesh: bucketBox, mult: m, x: bx, width: bucketWidth });
          });

          // Container for active 3D falling balls
          const plinkoBallsGroup = new THREE.Group();
          plinkoGroup.add(plinkoBallsGroup);

          centerpiece = plinkoGroup;
          plinko3DRefs = {
            group: plinkoGroup,
            ballsGroup: plinkoBallsGroup,
            pegs: pegs3DMeshes,
            buckets: bucketMeshes
          };
          window.plinko3DRefs = plinko3DRefs;
        } else if (z.id === 'dice') {
          centerpiece = createDiceDuelPit();
        } else if (z.id === 'coin') {
          centerpiece = createCoinFlipTable3D();
        } else if (z.id === 'mines') {
          const minesGroup = new THREE.Group();
          const baseY = 0.78;

          // Base de cristal/fieltro bajo la cuadrícula
          const mBase = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.12, 2.05),
            new THREE.MeshStandardMaterial({ color: 0x150a24, roughness: 0.6, metalness: 0.1 }));
          mBase.position.y = baseY; mBase.receiveShadow = true;
          minesGroup.add(mBase);

          const neonEdge = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.03, 2.14),
            new THREE.MeshStandardMaterial({ color: 0x7f1d1d, emissive: 0xef4444, emissiveIntensity: 1.2 }));
          neonEdge.position.y = baseY + 0.075;
          minesGroup.add(neonEdge);

          // Cuadrícula 5x5 de fichas físicas interactuables sobre la mesa
          const tileSize = 0.32, gap = 0.05, cols = 5;
          const totalW = cols * tileSize + (cols - 1) * gap;
          const start0 = -totalW / 2 + tileSize / 2;
          minesTileMeshes = [];
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
              const idx = row * 5 + col;
              const tMat = new THREE.MeshStandardMaterial({
                color: 0x241a3d, emissive: 0x8B5CF6, emissiveIntensity: 0.25, roughness: 0.5, metalness: 0.15
              });
              const tMesh = new THREE.Mesh(new THREE.BoxGeometry(tileSize, 0.1, tileSize), tMat);
              tMesh.position.set(start0 + col * (tileSize + gap), baseY + 0.11, start0 + row * (tileSize + gap));
              tMesh.userData.mineIdx = idx;
              tMesh.userData.baseY = tMesh.position.y;
              tMesh.userData.revealed = false;
              tMesh.castShadow = true; tMesh.receiveShadow = true;
              minesGroup.add(tMesh);
              minesTileMeshes.push(tMesh);
            }
          }

          centerpiece = minesGroup;
        } else if (z.id === 'blackjack') {
          const bjGroup = new THREE.Group();
          const bjR = 2.65;

          // 1. Wooden H-Legs Understructure (Rich Warm Mahogany Wood)
          const woodMat = new THREE.MeshStandardMaterial({ color: 0x4a2211, roughness: 0.42, metalness: 0.08 });

          // Left Leg Assembly (x = -1.65)
          const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.68, 0.36), woodMat);
          leftPillar.position.set(-1.65, 0.35, 0); leftPillar.castShadow = true;
          const leftFootFront = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.50), woodMat);
          leftFootFront.position.set(-1.65, 0.06, 0.25); leftFootFront.castShadow = true;
          const leftFootBack = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.50), woodMat);
          leftFootBack.position.set(-1.65, 0.06, -0.25); leftFootBack.castShadow = true;
          const leftMount = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.90), woodMat);
          leftMount.position.set(-1.65, 0.69, 0);
          bjGroup.add(leftPillar, leftFootFront, leftFootBack, leftMount);

          // Right Leg Assembly (x = +1.65)
          const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.68, 0.36), woodMat);
          rightPillar.position.set(1.65, 0.35, 0); rightPillar.castShadow = true;
          const rightFootFront = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.50), woodMat);
          rightFootFront.position.set(1.65, 0.06, 0.25); rightFootFront.castShadow = true;
          const rightFootBack = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.50), woodMat);
          rightFootBack.position.set(1.65, 0.06, -0.25); rightFootBack.castShadow = true;
          const rightMount = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.90), woodMat);
          rightMount.position.set(1.65, 0.69, 0);
          bjGroup.add(rightPillar, rightFootFront, rightFootBack, rightMount);

          // Heavy Horizontal Stretcher Beam connecting Left & Right Legs
          const stretcherBeam = new THREE.Mesh(new THREE.BoxGeometry(3.15, 0.18, 0.14), woodMat);
          stretcherBeam.position.set(0, 0.32, 0); stretcherBeam.castShadow = true;
          bjGroup.add(stretcherBeam);

          // 2. D-Shaped Wooden Tabletop Base Board (Matching felt & rail 1-to-1)
          const bjBaseShape = new THREE.Shape();
          bjBaseShape.absarc(0, 0, bjR, 0, Math.PI, false);
          bjBaseShape.lineTo(-bjR, 0);
          const bjBaseGeo = new THREE.ExtrudeGeometry(bjBaseShape, { depth: 0.10, bevelEnabled: false });
          const bjBase = new THREE.Mesh(bjBaseGeo, woodMat);
          bjBase.rotation.x = Math.PI / 2;
          bjBase.position.y = 0.78; bjBase.receiveShadow = true; bjBase.castShadow = true;

          // 3. Continuous Padded Black Leather Armrest Rail (Aligned with felt arc)
          const leatherMat = new THREE.MeshStandardMaterial({ color: 0x121216, roughness: 0.32, metalness: 0.05 });
          const bjRail = new THREE.Mesh(new THREE.TorusGeometry(bjR + 0.10, 0.16, 24, 64, Math.PI), leatherMat);
          bjRail.rotation.x = Math.PI / 2;
          bjRail.position.set(0, 0.81, 0);
          bjRail.castShadow = true;

          // Rear Corner Armrest End Caps (Left & Right rear corners)
          const rearCapGeo = new THREE.BoxGeometry(0.95, 0.22, 0.32);
          const rearCapL = new THREE.Mesh(rearCapGeo, leatherMat);
          rearCapL.position.set(-2.15, 0.81, 0);
          const rearCapR = new THREE.Mesh(rearCapGeo, leatherMat);
          rearCapR.position.set(2.15, 0.81, 0);

          // 4. Emerald Green Felt Surface with Perfect Semicircle & Undistorted 3 White Card Spaces
          const bjFeltCanvas = document.createElement('canvas'); bjFeltCanvas.width = 1024; bjFeltCanvas.height = 512;
          const bjCtx = bjFeltCanvas.getContext('2d');

          // Rich Casino Emerald Green Felt Background
          const bgGrad = bjCtx.createRadialGradient(512, 0, 20, 512, 250, 500);
          bgGrad.addColorStop(0, '#00b454');
          bgGrad.addColorStop(1, '#027a38');
          bjCtx.fillStyle = bgGrad;
          bjCtx.fillRect(0, 0, 1024, 512);

          // Subtle Felt Cloth Texture
          bjCtx.fillStyle = 'rgba(255, 255, 255, 0.025)';
          for (let i = 0; i < 1024; i += 6) {
            for (let j = 0; j < 512; j += 6) {
              if ((i + j) % 12 === 0) bjCtx.fillRect(i, j, 3, 3);
            }
          }

          // Perfect Semicircle Golden Yellow Double Rules Arc
          bjCtx.strokeStyle = '#facc15'; bjCtx.lineWidth = 5;
          bjCtx.beginPath(); bjCtx.arc(512, 0, 420, 0.08 * Math.PI, 0.92 * Math.PI); bjCtx.stroke();
          bjCtx.lineWidth = 3.5;
          bjCtx.beginPath(); bjCtx.arc(512, 0, 345, 0.12 * Math.PI, 0.88 * Math.PI); bjCtx.stroke();

          // Rules Typography (Curving naturally inside the semicircle)
          bjCtx.textAlign = 'center'; bjCtx.fillStyle = '#facc15';
          bjCtx.font = '900 32px Segoe UI, Arial'; bjCtx.fillText('BLACKJACK PAYS 3 TO 2', 512, 140);
          bjCtx.font = '700 20px Segoe UI, Arial'; bjCtx.fillStyle = '#ffffff';
          bjCtx.fillText('Dealer must draw to 16, and stand on all 17s', 512, 180);
          bjCtx.font = '800 22px Segoe UI, Arial'; bjCtx.fillStyle = '#facc15';
          bjCtx.fillText('INSURANCE PAYS 2 TO 1', 512, 245);
          bjCtx.font = '800 16px Segoe UI, Arial';
          bjCtx.fillText('PAYS 2 TO 1', 200, 190);
          bjCtx.fillText('PAYS 2 TO 1', 824, 190);

          // 3 Undistorted White Rectangular Player Card Outline Spaces
          const spotAngles = [0.28, 0.50, 0.72];
          spotAngles.forEach(ang => {
            const rad = 410;
            const cx = 512 + Math.cos(ang * Math.PI) * rad;
            const cy = Math.sin(ang * Math.PI) * rad;
            const angleRad = ang * Math.PI - Math.PI / 2;

            bjCtx.save();
            bjCtx.translate(cx, cy);
            bjCtx.rotate(angleRad);

            // White Rectangular Card Outer Box with Rounded Corners
            bjCtx.strokeStyle = '#ffffff';
            bjCtx.lineWidth = 4;
            bjCtx.beginPath();
            if (bjCtx.roundRect) {
              bjCtx.roundRect(-42, -59, 84, 118, 10);
            } else {
              bjCtx.rect(-42, -59, 84, 118);
            }
            bjCtx.stroke();

            // Inner subtle double line trim
            bjCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            bjCtx.lineWidth = 1.5;
            bjCtx.beginPath();
            if (bjCtx.roundRect) {
              bjCtx.roundRect(-37, -54, 74, 108, 7);
            } else {
              bjCtx.rect(-37, -54, 74, 108);
            }
            bjCtx.stroke();

            // Circular Betting Marker Circle beside/below box (movido hacia la derecha a lo largo del semicírculo sin solapar el cuadro blanco)
            bjCtx.strokeStyle = '#facc15';
            bjCtx.lineWidth = 3;
            bjCtx.beginPath();
            bjCtx.arc(88, 0, 28, 0, Math.PI * 2);
            bjCtx.stroke();

            bjCtx.restore();
          });

          const bjFeltTex = new THREE.CanvasTexture(bjFeltCanvas);
          bjFeltTex.anisotropy = 16;

          // Extruded D-shaped geometry for 100% exact alignment with leather frame
          const bjFeltShape = new THREE.Shape();
          bjFeltShape.absarc(0, 0, bjR - 0.04, 0, Math.PI, false);
          bjFeltShape.lineTo(-bjR + 0.04, 0);

          const bjFeltGeo = new THREE.ShapeGeometry(bjFeltShape, 64);

          // Custom UVs for ShapeGeometry to align Canvas 1-to-1 seamlessly
          const posAttr = bjFeltGeo.attributes.position;
          const uvAttr = bjFeltGeo.attributes.uv;
          for (let i = 0; i < posAttr.count; i++) {
            const px = posAttr.getX(i);
            const py = posAttr.getY(i);
            const u = (px + bjR) / (2 * bjR);
            const v = py / bjR;
            uvAttr.setXY(i, u, 1 - v);
          }
          uvAttr.needsUpdate = true;

          const bjFelt = new THREE.Mesh(
            bjFeltGeo,
            new THREE.MeshStandardMaterial({ color: 0xffffff, map: bjFeltTex, roughness: 0.75, side: THREE.DoubleSide })
          );
          bjFelt.rotation.x = Math.PI / 2;
          bjFelt.position.y = 0.825; bjFelt.receiveShadow = true;

          // 5. Luxury 2-Tiered Mahogany & Gold Dealer Chip Tray with 16 3D Chip Stacks (2 Rows of 8)
          const trayBase = new THREE.Mesh(
            new THREE.BoxGeometry(1.40, 0.024, 0.38),
            new THREE.MeshStandardMaterial({ color: 0x14091e, roughness: 0.4, metalness: 0.3 })
          );
          trayBase.position.set(0, 0.835, 0.20);

          const trayGoldBorder = new THREE.Mesh(
            new THREE.BoxGeometry(1.42, 0.015, 0.40),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 })
          );
          trayGoldBorder.position.set(0, 0.828, 0.20);

          const trayGroup = new THREE.Group();
          trayGroup.add(trayBase, trayGoldBorder);

          const bjChipStacks = [];

          // Row 1 (Back row, z = 0.11): Low stakes $0.1, $0.2, $0.5, $1, $2, $5, $10, $20
          // Row 2 (Front row, z = 0.29): High stakes $50, $100, $200, $500, $1K, $2K, $5K, $10K
          CASINO_CHIPS.forEach((cDef, cIdx) => {
            const isHighRow = cIdx >= 8;
            const col = isHighRow ? (cIdx - 8) : cIdx;
            const posX = -0.525 + col * 0.150;
            const posZ = isHighRow ? 0.29 : 0.11;

            const stack = new THREE.Group();
            stack.position.set(posX, 0.842, posZ);
            stack.userData = { chipVal: cDef.v };
            stack.name = 'bjChipStack_' + cDef.v;

            for (let h = 0; h < 4; h++) {
              const chipM = create3DChipSingleMesh(cDef, 0.056, 0.014);
              chipM.position.y = h * 0.015 + 0.007;
              chipM.rotation.y = (h * 0.35) % (Math.PI * 2);
              stack.add(chipM);
            }

            // Floating 3D Value Label with gold border
            const labelCanvas = document.createElement('canvas');
            labelCanvas.width = 128; labelCanvas.height = 64;
            const lCtx = labelCanvas.getContext('2d');
            lCtx.fillStyle = '#0f081d';
            if (lCtx.roundRect) lCtx.roundRect(4, 4, 120, 56, 12); else lCtx.rect(4, 4, 120, 56);
            lCtx.fill();
            lCtx.strokeStyle = '#f59e0b'; lCtx.lineWidth = 3; lCtx.stroke();
            lCtx.font = '900 28px "Segoe UI", Arial, sans-serif';
            lCtx.fillStyle = '#ffffff'; lCtx.textAlign = 'center'; lCtx.textBaseline = 'middle';
            lCtx.fillText(cDef.str, 64, 32);

            const labelTex = new THREE.CanvasTexture(labelCanvas);
            const labelSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, depthTest: false }));
            labelSpr.scale.set(0.16, 0.08, 1);
            labelSpr.position.set(0, 0.115, 0);
            stack.add(labelSpr);

            trayGroup.add(stack);
            bjChipStacks.push(stack);
          });

          // 6. 3D Dealer Card Shoe (Shifted further forward onto felt: x = -1.3, z = 0.25)
          const shoeGroup = new THREE.Group();
          shoeGroup.position.set(-1.3, 0.94, 0.25);
          shoeGroup.rotation.set(-0.15, 0.45, 0);

          const shoeBox = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, 0.28, 0.38),
            new THREE.MeshStandardMaterial({ color: 0x180d28, metalness: 0.6, roughness: 0.25, transparent: true, opacity: 0.95 })
          );
          shoeGroup.add(shoeBox);

          const shoeTrim = new THREE.Mesh(
            new THREE.BoxGeometry(0.57, 0.05, 0.40),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.15 })
          );
          shoeTrim.position.y = 0.12;
          shoeGroup.add(shoeTrim);

          const shoeCards = new THREE.Mesh(
            new THREE.BoxGeometry(0.48, 0.20, 0.32),
            new THREE.MeshStandardMaterial({ color: 0xefeee8, roughness: 0.5 })
          );
          shoeCards.position.set(0, 0.02, -0.02);
          shoeGroup.add(shoeCards);

          // 8. 3D Cards Group & 3D Chips Group (Placed flush on felt surface y = 0.865)
          const bjCardsGroup = new THREE.Group();
          bjCardsGroup.position.set(0, 0.865, 0);

          const bjChipsGroup = new THREE.Group();
          bjChipsGroup.position.set(0, 0.865, 0);

          // 9. Raycastable Bet Spot Trigger Discs over the 3 Yellow Betting Circles on Felt
          const bjBetSpots = [];
          [0, 1, 2].forEach(sIdx => {
            const spotCoord = getBlackjackBetCircleSpot3D(sIdx);
            const spotHitMesh = new THREE.Mesh(
              new THREE.CylinderGeometry(0.26, 0.26, 0.08, 16),
              new THREE.MeshBasicMaterial({ visible: false })
            );
            spotHitMesh.position.set(spotCoord.x, 0.02, spotCoord.z);
            spotHitMesh.userData = { isBjBetSpot: true, seatIndex: sIdx };
            bjChipsGroup.add(spotHitMesh);
            bjBetSpots.push(spotHitMesh);
          });

          // Function to visually highlight the selected 3D chip stack in the dealer tray
          function update3DBJChipRackSelection() {
            if (!bjChipStacks) return;
            const curVal = (typeof bjState !== 'undefined' && bjState && bjState.selectedChip) ? bjState.selectedChip : 50;
            bjChipStacks.forEach(stack => {
              const val = stack.userData.chipVal;
              const isSelected = (val === curVal);
              stack.position.y = isSelected ? 0.865 : 0.842;
              stack.scale.set(isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0, isSelected ? 1.20 : 1.0);
            });
          }

          // Tabletop Assembly Group shifted -1.25m towards the empty side (-Z) to center over legs
          const tabletopGroup = new THREE.Group();
          tabletopGroup.position.z = -1.25;
          tabletopGroup.add(
            bjBase, bjRail, rearCapL, rearCapR, bjFelt,
            trayGroup, shoeGroup,
            bjCardsGroup, bjChipsGroup
          );
          bjGroup.add(tabletopGroup);

          window.bj3DRefs = {
            group: bjGroup,
            shoe: shoeGroup,
            felt: bjFelt,
            cardsGroup: bjCardsGroup,
            chipsGroup: bjChipsGroup,
            chipStacks: bjChipStacks,
            betSpots: bjBetSpots,
            update3DBJChipRackSelection
          };

          bjGroup.position.y = 0.35;
          centerpiece = bjGroup;
        } else if (z.id === 'cinema') {
          centerpiece = createCineMusicAmphitheater();
        } else if (z.id === 'bowling') {
          centerpiece = createBowling3DAlley();
        } else if (z.id === 'tvcasino') {
          centerpiece = createTvCasinoRoom();
        } else if (z.id === 'slots') {
          centerpiece = createSlotMachineRow('slots');
        } else if (z.id === 'pachinko') {
          centerpiece = createSlotMachineRow('pachinko');
        } else if (z.id === 'tragaperras') {
          centerpiece = createSlotMachineRow('tragaperras');
        } else if (z.id === 'poker') {
          centerpiece = createPokerTable3D();
        } else if (z.id === 'jackpot') {
          centerpiece = createJackpotDais();
        } else if (z.id === 'bar') {
          centerpiece = createBarAndLoungeArea();
        } else if (z.id === 'wheel') {
          centerpiece = createFortuneWheel3D();
        } else if (z.id === 'dice') {
          centerpiece = createDiceDuelPit();
        } else if (z.id === 'mines') {
          centerpiece = create3DMinesTable();
        } else if (z.id === 'jukebox') {
          centerpiece = new THREE.Group();
        } else {
          centerpiece = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.2),
            new THREE.MeshStandardMaterial({ color: 0x1f1438, emissive: new THREE.Color(z.color), emissiveIntensity: 0.3 }));
          centerpiece.position.y = 0.7;
        }
        g.add(centerpiece);

        const light = new THREE.PointLight(z.color, 1.2, 8);
        light.position.set(0, 2.5, 0);
        if (z.id === 'jukebox') light.intensity = 0; // Jukebox already has its own custom warm point light!
        g.add(light);

        const label = makeLabelSprite(z.name, z.icon, z.color);
        if (z.id === 'jukebox') {
          label.visible = false; // Jukebox already has its own floating interactive 3D title!
        } else if (z.id === 'wheel') {
          label.position.set(0, 6.9, 0); // Majestically above the marquee spire
        } else if (z.id === 'cinema') {
          label.position.set(0, 4.4, 3.5);
        } else if (z.id === 'bowling' || z.id === 'tvcasino') {
          label.position.set(0, 3.8, 3.5);
        } else {
          label.position.set(0, 3.2, 0);
        }
        g.add(label);

        if (g && typeof g.traverse === 'function') {
          g.traverse(m => {
            if (m && (m.isMesh || m.isSprite)) {
              m.frustumCulled = false;
            }
          });
        }

        scene.add(g);
        zoneMeshes[z.id] = { group: g, ring, label, pulse: Math.random() * Math.PI * 2 };
      });

      // Build Glowing Neon Floor Tracks, Perimeter Walls, Grand Entrance and Ceiling Speakers
      createFloorNeonTracks(scene);
      createCasinoWalls(scene);
      createCasinoCeilingSpeakers(scene);

// --- Explicit Global Window Bindings ---
if (typeof host !== 'undefined') window.host = host;
if (typeof scene !== 'undefined') window.scene = scene;
if (typeof cssScene !== 'undefined') window.cssScene = cssScene;
if (typeof camera !== 'undefined') window.camera = camera;
if (typeof camDist !== 'undefined') window.camDist = camDist;
if (typeof renderer !== 'undefined') window.renderer = renderer;
if (typeof cssRenderer !== 'undefined') window.cssRenderer = cssRenderer;
if (typeof isMobileDevice !== 'undefined') window.isMobileDevice = isMobileDevice;
if (typeof QualityTiers !== 'undefined') window.QualityTiers = QualityTiers;
if (typeof currentQuality !== 'undefined') window.currentQuality = currentQuality;
if (typeof applyQualityTier !== 'undefined') window.applyQualityTier = applyQualityTier;
if (typeof zoneMeshes !== 'undefined') window.zoneMeshes = zoneMeshes;
if (typeof createFloorNeonTracks !== 'undefined') window.createFloorNeonTracks = createFloorNeonTracks;
if (typeof createCasinoWalls !== 'undefined') window.createCasinoWalls = createCasinoWalls;
if (typeof createCasinoCeilingSpeakers !== 'undefined') window.createCasinoCeilingSpeakers = createCasinoCeilingSpeakers;
