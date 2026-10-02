/**
 * Background 3D Động - Vibrant & Bright 3D Animated Scene (Tối ưu cho Light Theme)
 * Tương thích hoàn hảo với Light Theme (#F7F9FC) và Dark Theme.
 * Chuyển động sóng hạt 3D, các khối đa diện lơ lửng, ánh sáng đa sắc tươi sáng.
 */

(function () {
  let scene, camera, renderer;
  let particles, particlePositions, particleCount = 2000;
  let floatingMeshes = [];
  let lights = {};
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let scrollY = 0;
  let isDarkMode = document.body.getAttribute("data-theme") === "dark";

  function init() {
    const canvas = document.getElementById("canvas-3d");
    if (!canvas) return;

    // 1. Tạo Scene
    scene = new THREE.Scene();
    updateSceneFog();

    // 2. Tạo Camera (Góc nhìn phối cảnh 3D)
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2200
    );
    camera.position.z = 820;
    camera.position.y = 140;

    // 3. Tạo Renderer WebGL
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Ánh sáng đa sắc tươi sáng
    setupLights();

    // 5. Tạo lưới sóng hạt 3D (Wave Particle Field)
    createParticleWave();

    // 6. Tạo các khối hình học 3D bay bổng
    createFloatingGeometries();

    // 7. Lắng nghe sự kiện
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // 8. Bắt đầu render loop
    animate();
  }

  function updateSceneFog() {
    isDarkMode = document.body.getAttribute("data-theme") === "dark";
    if (isDarkMode) {
      scene.fog = new THREE.FogExp2(0x0c0d14, 0.00085);
    } else {
      scene.fog = new THREE.FogExp2(0xf7f9fc, 0.00065);
    }
  }

  function setupLights() {
    isDarkMode = document.body.getAttribute("data-theme") === "dark";
    
    // Ánh sáng môi trường
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.6 : 1.2);
    scene.add(ambientLight);
    lights.ambient = ambientLight;

    // Ánh sáng điểm đa sắc rực rỡ
    const pointLightConfigs = [
      { color: 0x0284c7, intensity: 2.2, distance: 950, pos: [-350, 220, 200] }, // Sky Blue
      { color: 0x00d992, intensity: 2.0, distance: 900, pos: [350, -100, 280] },  // Emerald
      { color: 0x6366f1, intensity: 1.8, distance: 850, pos: [0, 360, 120] },    // Indigo / Violet
      { color: 0x0ea5e9, intensity: 1.6, distance: 850, pos: [-220, -260, 380] }  // Cyan
    ];

    lights.points = [];
    pointLightConfigs.forEach((cfg) => {
      const pl = new THREE.PointLight(cfg.color, cfg.intensity, cfg.distance);
      pl.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      scene.add(pl);
      lights.points.push(pl);
    });
  }

  function createParticleWave() {
    const geometry = new THREE.BufferGeometry();
    const countX = 55;
    const countY = 40;
    particleCount = countX * countY;

    particlePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const spacingX = 46;
    const spacingY = 46;
    const offsetX = (countX * spacingX) / 2;
    const offsetZ = (countY * spacingY) / 2;

    let idx = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const x = ix * spacingX - offsetX;
        const y = -170;
        const z = iy * spacingY - offsetZ - 100;

        particlePositions[idx * 3] = x;
        particlePositions[idx * 3 + 1] = y;
        particlePositions[idx * 3 + 2] = z;

        // Gradient màu tươi sáng: Cyan (#0284C7) -> Emerald (#00D992) -> Indigo (#6366F1)
        const ratio = (ix + iy) / (countX + countY);
        const col1 = new THREE.Color(0x0284c7);
        const col2 = new THREE.Color(0x00d992);
        const col3 = new THREE.Color(0x6366f1);

        let finalCol = new THREE.Color();
        if (ratio < 0.5) {
          finalCol.lerpColors(col1, col2, ratio * 2);
        } else {
          finalCol.lerpColors(col2, col3, (ratio - 0.5) * 2);
        }

        colors[idx * 3] = finalCol.r;
        colors[idx * 3 + 1] = finalCol.g;
        colors[idx * 3 + 2] = finalCol.b;

        idx++;
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const canvasTexture = createCircleParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 7.5,
      map: canvasTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.85 : 0.65,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  function createCircleParticleTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0.25)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createFloatingGeometries() {
    // 1. Torus Knot (Vòng xoắn 3D xanh dương điện)
    const torusKnotGeo = new THREE.TorusKnotGeometry(68, 18, 120, 24);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.2,
      roughness: 0.15,
      wireframe: true,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusMat);
    torusKnot.position.set(-440, 180, -100);
    scene.add(torusKnot);
    floatingMeshes.push({
      mesh: torusKnot,
      rotX: 0.007,
      rotY: 0.011,
      initY: 180
    });

    // 2. Icosahedron lớn bên phải (Khối 20 mặt ngọc lục bảo)
    const icoGeo = new THREE.IcosahedronGeometry(78, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00d992,
      metalness: 0.3,
      roughness: 0.2,
      wireframe: true,
      emissive: 0x00d992,
      emissiveIntensity: 0.35
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(460, 130, -60);
    scene.add(ico);
    floatingMeshes.push({
      mesh: ico,
      rotX: -0.008,
      rotY: 0.009,
      initY: 130
    });

    // 3. Octahedron (Khối 8 mặt chàm tinh khôi)
    const octGeo = new THREE.OctahedronGeometry(55, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.3,
      roughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: isDarkMode ? 0.75 : 0.45,
      emissive: 0x6366f1,
      emissiveIntensity: 0.25
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(330, -150, 80);
    scene.add(oct);
    floatingMeshes.push({
      mesh: oct,
      rotX: 0.01,
      rotY: -0.007,
      initY: -150
    });

    // 4. Dodecahedron (Khối 12 mặt sắc cyan nhẹ)
    const dodecGeo = new THREE.DodecahedronGeometry(52, 0);
    const dodecMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.2,
      roughness: 0.2,
      wireframe: true,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.3
    });
    const dodec = new THREE.Mesh(dodecGeo, dodecMat);
    dodec.position.set(-370, -180, 50);
    scene.add(dodec);
    floatingMeshes.push({
      mesh: dodec,
      rotX: 0.009,
      rotY: 0.013,
      initY: -180
    });
  }

  function updateThemeColors() {
    isDarkMode = document.body.getAttribute("data-theme") === "dark";
    updateSceneFog();

    if (lights.ambient) {
      lights.ambient.intensity = isDarkMode ? 0.6 : 1.2;
    }

    if (particles && particles.material) {
      particles.material.opacity = isDarkMode ? 0.85 : 0.65;
      particles.material.blending = isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending;
      particles.material.needsUpdate = true;
    }
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function onMouseMove(event) {
    targetMouseX = (event.clientX - windowHalfX) * 0.4;
    targetMouseY = (event.clientY - windowHalfY) * 0.4;
  }

  function onScroll() {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0015;

    // 1. Damping mượt mà vị trí chuột (Parallax 3D mượt mà)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX * 0.55;
    camera.position.y = 140 - mouseY * 0.45 - scrollY * 0.16;
    camera.lookAt(0, -scrollY * 0.12, 0);

    // 2. Chuyển động sóng 3D cho lưới hạt (Undulating Wave Field)
    if (particles && particlePositions) {
      const countX = 55;
      const countY = 40;
      let i = 0;

      for (let ix = 0; ix < countX; ix++) {
        for (let iy = 0; iy < countY; iy++) {
          const y =
            Math.sin(ix * 0.35 + time * 2.0) * 26 +
            Math.cos(iy * 0.3 + time * 1.6) * 26 -
            170;

          particlePositions[i * 3 + 1] = y;
          i++;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Xoay và bập bênh các khối 3D
    floatingMeshes.forEach((item, index) => {
      item.mesh.rotation.x += item.rotX;
      item.mesh.rotation.y += item.rotY;
      item.mesh.position.y =
        item.initY + Math.sin(time * 1.8 + index * 1.5) * 20;
    });

    // 4. Ánh sáng điểm chuyển động
    if (lights.points && lights.points.length >= 4) {
      lights.points[0].position.x = Math.sin(time * 0.8) * 450;
      lights.points[0].position.z = Math.cos(time * 0.8) * 400;

      lights.points[1].position.x = -Math.cos(time * 0.7) * 450;
      lights.points[1].position.y = Math.sin(time * 0.9) * 250;

      lights.points[2].position.z = Math.sin(time * 1.1) * 350;
      lights.points[2].position.x = Math.cos(time * 0.9) * 350;

      lights.points[3].position.y = -Math.sin(time * 0.7) * 280;
    }

    renderer.render(scene, camera);
  }

  // Khởi chạy
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkThreeAndInit);
  } else {
    checkThreeAndInit();
  }

  function checkThreeAndInit() {
    if (typeof THREE !== "undefined") {
      init();
    } else {
      let tries = 0;
      const interval = setInterval(() => {
        tries++;
        if (typeof THREE !== "undefined") {
          clearInterval(interval);
          init();
        } else if (tries > 30) {
          clearInterval(interval);
          console.warn("Three.js not loaded, background 3D skipped.");
        }
      }, 100);
    }
  }
})();
