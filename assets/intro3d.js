// Lab Lighting — scroll-driven 3D intro: dusk -> night, roofline lights come on, colors, back to warm white.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const host = document.querySelector('.intro3d');
const stage = host && host.querySelector('.stage');
const canvas = host && host.querySelector('canvas');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
if (!host || reduce || !webglOK()) { if (host) host.classList.add('static'); }
else start();

function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 600);
  scene.fog = new THREE.Fog(0x1a2638, 60, 260);

  // ---------- environment ----------
  const hemi = new THREE.HemisphereLight(0x8fa8d8, 0x1a1f2a, 1.1); scene.add(hemi);
  const moon = new THREE.DirectionalLight(0xbcd0ff, 0.9); moon.position.set(-30, 40, 20); scene.add(moon);
  const mat = (c, r = 0.9, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const snow = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), mat(0xc9d2df, 0.95)); snow.rotation.x = -Math.PI / 2; scene.add(snow);
  const drive = new THREE.Mesh(new THREE.PlaneGeometry(10, 22), mat(0x6a6f76, 0.8)); drive.rotation.x = -Math.PI / 2; drive.position.set(11, 0.02, 17); scene.add(drive);
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 6), mat(0x7a7f86, 0.85)); walk.rotation.x = -Math.PI / 2; walk.position.set(-8, 0.02, 11); scene.add(walk);

  // mountains (Flathead backdrop)
  const mtn = mat(0x23314a, 1), cap = mat(0xdfe6f0, 0.9);
  [[-120, -170, 70, 46], [-40, -190, 90, 58], [50, -175, 80, 50], [140, -185, 95, 62], [220, -200, 70, 44], [-200, -190, 80, 40]].forEach(([x, z, r, h]) => {
    const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, 5), mtn); m.position.set(x, h / 2 - 2, z); m.rotation.y = x; scene.add(m);
    const c = new THREE.Mesh(new THREE.ConeGeometry(r * 0.3, h * 0.3, 5), cap); c.position.set(x, h - h * 0.15 - 2, z); c.rotation.y = x; scene.add(c);
  });
  // pines
  const pineM = mat(0x16261f, 1), trunkM = mat(0x2a1f18, 1);
  const pine = (x, z, s) => { const g = new THREE.Group();
    for (let i = 0; i < 3; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(2.2 * s * (1 - i * 0.22), 3.4 * s, 7), pineM); c.position.y = (2.2 + i * 1.9) * s; g.add(c); }
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.25 * s, 0.3 * s, 1.6 * s, 6), trunkM); t.position.y = 0.8 * s; g.add(t);
    g.position.set(x, 0, z); scene.add(g); };
  [[-30, -12, 1.5], [-26, -20, 1.9], [-36, -4, 1.2], [30, -14, 1.7], [36, -6, 1.3], [26, -24, 2.1], [-6, -24, 2.2], [9, -26, 2.4], [-44, -22, 2.4], [44, -26, 2.6], [-18, -18, 1.6], [20, -20, 1.8]].forEach(a => pine(...a));
  // stars
  const sg = new THREE.BufferGeometry(), sp = [];
  for (let i = 0; i < 900; i++) { const th = Math.random() * Math.PI * 2, ph = Math.random() * 0.45 * Math.PI; const r = 380; sp.push(r * Math.cos(th) * Math.cos(ph), r * Math.sin(ph) + 20, r * Math.sin(th) * Math.cos(ph) - 60); }
  sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: false, transparent: true, opacity: 0 })); scene.add(stars);

  // ---------- house ----------
  const wallM = mat(0x50555d, 0.85), roofM = mat(0x2a2d33, 0.7), trimM = mat(0x101113, 0.6), stoneM = mat(0x5c5752, 0.95), doorM = mat(0x15171a, 0.5, 0.2);
  const house = new THREE.Group(); scene.add(house);
  const box = (w, h, d, x, y, z, m = wallM) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); house.add(b); return b; };
  // gable prism: triangle in local XY (width w, rise h), extruded along local Z by length L
  const gable = (w, h, L, m) => { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: L, bevelEnabled: false }); g.translate(0, 0, -L / 2); return new THREE.Mesh(g, m); };
  const roofOn = (w, h, L, x, y, z, alongX) => { const r = gable(w, h, L, roofM); r.position.set(x, y, z); if (alongX) r.rotation.y = Math.PI / 2; house.add(r); return r; };
  const windowM = new THREE.MeshStandardMaterial({ color: 0x0b0d10, emissive: 0xffb36b, emissiveIntensity: 0, roughness: 0.2 });
  const win = (w, h, x, y, z) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), windowM); p.position.set(x, y, z + 0.02); house.add(p); };

  // main wing (side gables, ridge along X)
  box(20, 3.2, 10, -4, 0, 0); roofOn(10.8, 2.6, 20.8, -4, 3.2, 0, true);
  box(20.2, 0.9, 10.2, -4, 0, 0, stoneM);
  // porch (front gable)
  box(5, 0.3, 3, -8, 0, 6.5, stoneM);
  [[-10.2, 7.8], [-5.8, 7.8]].forEach(([x, z]) => box(0.35, 3.2, 0.35, x, 0, z, trimM));
  roofOn(5.4, 1.8, 3.6, -8, 3.2, 6.6, false);
  // upper story with front gable
  box(5.6, 3.2, 6, 0.5, 3.2, 0); roofOn(6.4, 2.1, 6.8, 0.5, 6.4, 0, false);
  // garage block with big front gable
  box(10, 4, 11, 11, 0, 0.5); roofOn(10.8, 3.2, 11.8, 11, 4, 0.5, false);
  box(10.2, 1.0, 11.2, 11, 0, 0.5, stoneM);
  [[8.4], [13.6]].forEach(([x]) => { const d = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), doorM); d.position.set(x, 1.5, 6.03); house.add(d); });
  // windows (warm interior glow at night)
  win(1.6, 1.4, -13, 1.9, 5.01); win(1.6, 1.4, -10.4, 1.9, 5.01); win(2.4, 1.4, -2.5, 1.9, 5.01); win(1.6, 1.4, 1.5, 1.9, 5.01);
  win(1.9, 1.5, 0.5, 4.6, 3.01); win(2.8, 0.5, 11, 5.2, 6.01);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.3), doorM); door.position.set(-8, 1.15, 5.03); house.add(door);

  // ---------- roofline lights ----------
  const o = 0.12; // just under the roof edge
  const runs = [
    [[-14.4, 3.2 - o, 5.45], [-10.7, 3.2 - o, 5.45]],                                   // wing eave, left of porch
    [[-10.7, 3.2 - o, 8.45], [-8, 5.0 - o, 8.45], [-5.3, 3.2 - o, 8.45]],              // porch gable
    [[-5.3, 3.2 - o, 5.45], [-2.3, 3.2 - o, 5.45]],                                    // eave between porch and upper
    [[-2.7, 6.4 - o, 3.45], [0.5, 8.5 - o, 3.45], [3.7, 6.4 - o, 3.45]],               // upper gable
    [[3.3, 3.2 - o, 5.45], [5.6, 3.2 - o, 5.45]],                                      // eave to garage
    [[5.6, 4 - o, 6.45], [11, 7.2 - o, 6.45], [16.4, 4 - o, 6.45]],                    // garage gable
    [[5.8, 4 - 0.35, 6.1], [16.2, 4 - 0.35, 6.1]],                                     // flat roofline under garage gable
  ];
  const pts = [];
  runs.forEach(run => { for (let i = 0; i < run.length - 1; i++) { const a = new THREE.Vector3(...run[i]), b = new THREE.Vector3(...run[i + 1]); const n = Math.max(1, Math.round(a.distanceTo(b) / 0.34)); for (let k = 0; k < n; k++) pts.push(a.clone().lerp(b, k / n)); } pts.push(new THREE.Vector3(...run[run.length - 1])); });
  const N = pts.length;
  const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.075, 10, 8), new THREE.MeshBasicMaterial({ toneMapped: false }), N);
  const m4 = new THREE.Matrix4(); pts.forEach((p, i) => { m4.makeTranslation(p.x, p.y, p.z); bulbs.setMatrixAt(i, m4); bulbs.setColorAt(i, new THREE.Color(0, 0, 0)); });
  house.add(bulbs);
  // warm spill onto the fascia and snow
  const spills = [[-11, 3, 7], [-8, 4, 9.5], [0.5, 7, 5], [11, 5.5, 8.5], [3, 2.6, 7.5]].map(([x, y, z]) => { const l = new THREE.PointLight(0xffc98a, 0, 16, 2); l.position.set(x, y, z); house.add(l); return l; });

  // ---------- post ----------
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.75, 0.5, 0.9); composer.addPass(bloom);
  composer.addPass(new OutputPass());

  function size() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); composer.setSize(w, h); camera.aspect = w / h; camera.fov = w < 700 ? 52 : 38; camera.updateProjectionMatrix(); }
  addEventListener('resize', size); size();

  // ---------- scroll ----------
  const caps = [...host.querySelectorAll('[data-at]')];
  let p = 0, pSmooth = 0;
  function progress() { const r = host.getBoundingClientRect(); const total = host.offsetHeight - innerHeight; return Math.min(1, Math.max(0, -r.top / total)); }
  addEventListener('scroll', () => { p = progress(); }, { passive: true }); p = progress();
  const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const dusk = new THREE.Color(0x9cc0ea), night = new THREE.Color(0x070b16), fogDusk = new THREE.Color(0xb7cbe2), fogNight = new THREE.Color(0x0a1020);
  const warm = new THREE.Color(1.0, 0.72, 0.42), c = new THREE.Color(), tmp = new THREE.Color(), bgCol = new THREE.Color(), hue = new THREE.Color();
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(host);

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    pSmooth += (p - pSmooth) * 0.08;
    const q = pSmooth;
    const dark = sm(0.3, 0.46, q);                  // day -> night
    const on = sm(0.36, 0.52, q);                   // lights switching on along the run
    const color = sm(0.5, 0.58, q) * (1 - sm(0.74, 0.82, q)); // color show
    scene.background = bgCol.copy(dusk).lerp(night, dark); scene.fog.color.copy(fogDusk).lerp(fogNight, dark);
    hemi.intensity = 2.2 - 1.95 * dark; moon.intensity = 2.0 - 1.7 * dark; moon.color.setHex(dark > 0.5 ? 0xbcd0ff : 0xfff1dc); stars.material.opacity = dark;
    windowM.emissiveIntensity = 0.32 * sm(0.34, 0.5, q);
    for (let i = 0; i < N; i++) {
      const lit = Math.min(1, Math.max(0, on * (N + 24) - i) / 12);
      tmp.copy(warm);
      if (color > 0) { hue.setHSL((((i / 46) - t * 0.25) % 1 + 1) % 1, 0.95, 0.55); tmp.lerp(hue, color); }
      bulbs.setColorAt(i, tmp.multiplyScalar(3.2 * lit));
    }
    bulbs.instanceColor.needsUpdate = true;
    spills.forEach(l => { l.intensity = 22 * on; l.color.copy(warm).lerp(hue.setHSL((t * 0.1) % 1, 0.8, 0.6), color * 0.8); });
    // camera: slow orbit + push-in
    const ang = THREE.MathUtils.lerp(-0.3, 0.22, q) + Math.sin(t * 0.15) * 0.02;
    const rad = THREE.MathUtils.lerp(44, 30, sm(0, 1, q)), hgt = THREE.MathUtils.lerp(9, 5.5, q);
    const fit = camera.aspect < 0.8 ? 1.9 : camera.aspect < 1.2 ? 1.35 : 1;
    const angF = fit > 1.5 ? ang * 0.35 : ang;
    camera.position.set(Math.sin(angF) * rad * fit + 1, hgt * (fit > 1 ? 1.25 : 1), Math.cos(angF) * rad * fit + 2);
    camera.lookAt(1, THREE.MathUtils.lerp(4.2, 3.6, q), 0);
    caps.forEach(el => { const [a, b] = el.dataset.at.split(',').map(Number); const v = sm(a, a + 0.05, q) * (1 - sm(b - 0.05, b, q)); el.style.opacity = v; el.style.transform = `translateY(${(1 - v) * 24}px)`; el.style.pointerEvents = v > 0.5 ? 'auto' : 'none'; });
    composer.render();
  })();
  host.classList.add('live');
}
