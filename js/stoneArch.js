/**
 * stoneArch.js — pórtico de piedra procedural para la portada.
 *
 * Reconstruye el still de referencia (arco tallado, meandro, vacío oscuro,
 * polvo de oro) como geometría Three.js, sin GLB. El hueco central está
 * pensado para encuadrar la moneda existente.
 *
 * Unidades locales: el conjunto cabe en ~3.4 × 4.4 × 1.4. El pivote queda
 * en el centro del vano, para que moneda y cámara compartan el mismo eje.
 */
import * as THREE from './three.module.js';

function makeCanvasTexture(size, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function makeStoneMap() {
  return makeCanvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#1a2230';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * s;
      const y = Math.random() * s;
      const a = 0.04 + Math.random() * 0.12;
      ctx.fillStyle = Math.random() > 0.5
        ? `rgba(255,255,255,${a})`
        : `rgba(0,0,0,${a * 1.4})`;
      ctx.fillRect(x, y, 1 + Math.random() * 3, 1 + Math.random() * 2);
    }
    ctx.globalAlpha = 0.18;
    for (let y = 0; y < s; y += 18) {
      ctx.fillStyle = y % 36 === 0 ? '#0e141e' : '#243044';
      ctx.fillRect(0, y, s, 2);
    }
    ctx.globalAlpha = 1;
  });
}

function makeMeanderMap() {
  return makeCanvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#141820';
    ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = '#c9a45a';
    ctx.lineWidth = 10;
    ctx.lineJoin = 'miter';
    const cell = 64;
    for (let y = 0; y < s; y += cell) {
      for (let x = 0; x < s; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 16);
        ctx.lineTo(x + 48, y + 16);
        ctx.lineTo(x + 48, y + 48);
        ctx.lineTo(x + 24, y + 48);
        ctx.lineTo(x + 24, y + 32);
        ctx.lineTo(x + 8, y + 32);
        ctx.closePath();
        ctx.stroke();
      }
    }
  });
}

function archProfile(outerW, outerH, innerW, innerH) {
  const shape = new THREE.Shape();
  const hw = outerW / 2;
  const ih = innerW / 2;
  const r = ih;
  const spring = innerH - r;

  shape.moveTo(-hw, 0);
  shape.lineTo(hw, 0);
  shape.lineTo(hw, outerH);
  shape.lineTo(-hw, outerH);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(-ih, 0.18);
  hole.lineTo(-ih, spring);
  hole.absarc(0, spring, r, Math.PI, 0, false);
  hole.lineTo(ih, 0.18);
  hole.closePath();
  shape.holes.push(hole);
  return shape;
}

function box(w, h, d, mat, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

export function createStoneArch() {
  const group = new THREE.Group();
  group.name = 'stoneArch';

  const stoneMap = makeStoneMap();
  stoneMap.repeat.set(2.4, 3.2);
  const meanderMap = makeMeanderMap();
  meanderMap.repeat.set(6, 1);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x1b2433,
    roughness: 0.9,
    metalness: 0.06,
    map: stoneMap,
    bumpMap: stoneMap,
    bumpScale: 0.035,
    envMapIntensity: 0.25,
  });
  const stoneDark = stoneMat.clone();
  stoneDark.color = new THREE.Color(0x10151f);
  stoneDark.roughness = 0.95;
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc4a35a,
    roughness: 0.36,
    metalness: 0.78,
    emissive: new THREE.Color(0x3a2508),
    emissiveIntensity: 0.07,
    envMapIntensity: 0.9,
  });
  const meanderMat = new THREE.MeshStandardMaterial({
    color: 0x9a7a3a,
    roughness: 0.42,
    metalness: 0.65,
    map: meanderMap,
    emissive: new THREE.Color(0x2a1a06),
    emissiveIntensity: 0.05,
  });
  const voidMat = new THREE.MeshBasicMaterial({
    color: 0x03050a,
    side: THREE.DoubleSide,
  });

  const materials = [stoneMat, stoneDark, goldMat, meanderMat, voidMat];

  const outerW = 3.35;
  const outerH = 4.35;
  const innerW = 1.62;
  const innerH = 2.62;
  const depth = 0.92;

  const bodyGeo = new THREE.ExtrudeGeometry(
    archProfile(outerW, outerH, innerW, innerH),
    {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 2,
      curveSegments: 24,
    }
  );
  bodyGeo.translate(0, 0, -depth / 2);
  const body = new THREE.Mesh(bodyGeo, stoneMat);
  group.add(body);

  /* Túnel interior: da espesor al vano, como en el still. */
  const barrelGeo = new THREE.ExtrudeGeometry(
    archProfile(innerW + 0.22, innerH + 0.18, innerW * 0.92, innerH * 0.96),
    { depth: 1.55, bevelEnabled: false, curveSegments: 20 }
  );
  barrelGeo.translate(0, 0.04, -1.35);
  const barrel = new THREE.Mesh(barrelGeo, stoneDark);
  group.add(barrel);

  /* Cornisa y frontón suave. */
  group.add(box(outerW + 0.28, 0.16, depth + 0.22, stoneMat, 0, outerH + 0.02, 0));
  group.add(box(outerW + 0.08, 0.10, depth + 0.12, goldMat, 0, outerH - 0.18, 0.02));
  const pediment = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.34, 0.18, 12),
    stoneMat
  );
  pediment.position.set(0, outerH + 0.22, 0);
  pediment.rotation.z = Math.PI / 2;
  group.add(pediment);

  /* Friso de meandro (la greca del still). */
  const frieze = box(outerW - 0.15, 0.22, 0.06, meanderMat, 0, outerH - 0.52, depth / 2 + 0.01);
  group.add(frieze);
  const friezeL = box(0.22, innerH - 0.2, 0.05, meanderMat, -outerW / 2 + 0.22, innerH * 0.48, depth / 2 + 0.01);
  const friezeR = box(0.22, innerH - 0.2, 0.05, meanderMat, outerW / 2 - 0.22, innerH * 0.48, depth / 2 + 0.01);
  group.add(friezeL, friezeR);

  /* Filete de oro en el intradós. */
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(innerW / 2 + 0.02, 0.035, 8, 28, Math.PI),
    goldMat
  );
  rim.position.set(0, innerH - innerW / 2, depth / 2 - 0.02);
  rim.rotation.x = Math.PI;
  group.add(rim);

  /* Escalones. */
  [0.18, 0.12, 0.08].forEach((h, i) => {
    const w = outerW + 0.55 - i * 0.28;
    const d = depth + 0.85 - i * 0.18;
    group.add(box(w, h, d, stoneMat, 0, -0.08 - i * 0.12, 0.18 + i * 0.08));
  });

  /* Vacío detrás del vano: el still es un pozo, no un cielo. */
  const voidPlane = new THREE.Mesh(new THREE.PlaneGeometry(innerW * 1.15, innerH * 1.25), voidMat);
  voidPlane.position.set(0, innerH * 0.52, -1.15);
  group.add(voidPlane);

  /* Polvo de oro alrededor del vano. */
  const dustN = 280;
  const dustPos = new Float32Array(dustN * 3);
  const dustCol = new Float32Array(dustN * 3);
  const gold = new THREE.Color(0xffd76a);
  for (let i = 0; i < dustN; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 0.55 + Math.random() * 1.55;
    dustPos[i * 3] = Math.cos(a) * r * 0.85;
    dustPos[i * 3 + 1] = 0.4 + Math.random() * 2.6;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    const k = 0.55 + Math.random() * 0.45;
    dustCol[i * 3] = gold.r * k;
    dustCol[i * 3 + 1] = gold.g * k;
    dustCol[i * 3 + 2] = gold.b * k;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  dust.name = 'archDust';
  group.add(dust);

  /* Pivote = centro del vano, no el bounding box (el frontón lo correría). */
  const pivotY = innerH * 0.52;
  group.children.forEach((child) => {
    child.position.y -= pivotY;
  });

  const footprint = { width: outerW + 0.55, depth: depth + 0.9 };
  const bottomOffset = -pivotY - 0.44;
  const topOffset = outerH + 0.32 - pivotY;

  return {
    group,
    materials,
    footprint,
    bottomOffset,
    topOffset,
    dust,
    opening: { width: innerW, height: innerH, y: 0 },
  };
}
