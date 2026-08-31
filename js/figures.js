/**
 * figures.js — Sistema de "figuras" (dioramas) para la Sala de Deliberaciones.
 *
 * Cada dato importante del proyecto puede tener su propio objeto 3D modelado
 * en Blender. Si el .glb aún no existe, se dibuja un placeholder (icosaedro +
 * halo) y se marca como "por modelar" en el gabinete inferior. Así la escena
 * queda andando y las figuras se agregan de a poco sin romper nada.
 *
 * TUS TAREAS (en `figures/README.md`): modelar en Blender y subir cada .glb
 * con Draco, <300 KB, material oro/obsidiana/azul.
 */
import * as THREE from './three.module.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';
import { DRACOLoader } from './loaders/DRACOLoader.js';

export const FIGURE_DEFS = [
  {
    id: 'balanza',
    label: 'Balanza',
    subtitle: 'Equilibrio hawkish / dovish',
    glb: 'figures/balanza.glb',
    x: 0, y: 0, z: -4.6,
    scale: 1.1,
    color: 0xffd76a,
  },
  {
    id: 'inflacion',
    label: 'Vela de precios',
    subtitle: 'Presión inflacionaria',
    glb: 'figures/inflacion.glb',
    x: -4.8, y: 0, z: -3.2,
    scale: 1.0,
    color: 0xff8a5c,
  },
  {
    id: 'brote',
    label: 'Brote',
    subtitle: 'Crecimiento y holgura',
    glb: 'figures/brote.glb',
    x: 4.8, y: 0, z: -3.2,
    scale: 1.0,
    color: 0x8ab4f8,
  },
  {
    id: 'acta',
    label: 'Acta',
    subtitle: 'Fuente trazable',
    glb: 'figures/acta.glb',
    x: 0, y: 0, z: -6.4,
    scale: 0.9,
    color: 0xcfd6e4,
  },
  {
    id: 'corpus',
    label: 'Corpus',
    subtitle: '182 reuniones de referencia',
    glb: 'figures/corpus.glb',
    x: -4.6, y: 0, z: -5.6,
    scale: 0.8,
    color: 0xcfd6e4,
  },
  {
    id: 'campana',
    label: 'Campana',
    subtitle: 'Inicio y cierre de sesión',
    glb: 'figures/campana.glb',
    x: 4.6, y: 0, z: -5.6,
    scale: 0.8,
    color: 0xffd76a,
  },
];

/**
 * Crea todos los grupos de figuras y devuelve un objeto para actualizarlas.
 * Se invoca con `scene` ya construida.
 */
export function initFigureSystem(scene, { onReady = null } = {}) {
  const figures = new Map();
  const group = new THREE.Group();
  group.name = 'dioramas';
  scene.add(group);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('js/vendor/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const placeholderMat = new THREE.MeshStandardMaterial({
    color: 0x8a93a6,
    metalness: 0.55,
    roughness: 0.35,
    transparent: true,
    opacity: 0.6,
  });
  const placeholderWire = new THREE.MeshBasicMaterial({
    color: 0xffd76a,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xffd76a,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
  });

  function makePlaceholder(def) {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 0), placeholderMat);
    mesh.material = placeholderMat.clone();
    mesh.userData = { ...def, pending: true };
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.44, 1), placeholderWire);
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.52, 0.62, 32), haloMat.clone());
    halo.rotation.x = -Math.PI / 2;
    mesh.add(wire);
    mesh.add(halo);
    return mesh;
  }

  function findCabinet() {
    return document.getElementById('figureCabinet');
  }

  FIGURE_DEFS.forEach((def) => {
    const root = new THREE.Group();
    root.name = `figure--${def.id}`;
    root.position.set(def.x, def.y, def.z);
    root.visible = true;
    group.add(root);

    const record = {
      def,
      root,
      model: null,
      status: 'searching',
    };
    figures.set(def.id, record);

    const applyModel = (gltf) => {
      const model = gltf.scene;
      model.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z) || 1;
      const s = def.scale / maxSize;
      model.scale.setScalar(s);
      box.setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.x -= center.x;
      model.position.z -= center.z;
      model.position.y -= box.min.y;
      model.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        const mats = (Array.isArray(obj.material) ? obj.material : [obj.material]).filter(Boolean);
        mats.forEach((m) => {
          if ('metalness' in m) m.metalness = 0.82;
          if ('roughness' in m) m.roughness = 0.24;
          m.color = m.color || new THREE.Color();
          if (obj.name.toLowerCase().includes('gold') || obj.name.toLowerCase().includes('oro')) {
            m.color.set(0xffd76a);
          } else if (obj.name.toLowerCase().includes('blue') || obj.name.toLowerCase().includes('azul')) {
            m.color.set(0x8ab4f8);
          }
          m.needsUpdate = true;
        });
      });
      root.clear();
      root.add(model);
      record.model = model;
      record.status = 'loaded';
      markCabinet(def, 'ready');
      onReady?.(record);
    };

    const showPlaceholder = () => {
      record.status = 'pending';
      const ph = makePlaceholder(def);
      root.add(ph);
      record.placeholder = ph;
      markCabinet(def, 'pending');
      onReady?.(record);
    };

    fetch(def.glb, { method: 'HEAD' })
      .then((r) => {
        if (!r.ok) throw new Error('missing');
        return loader.loadAsync(def.glb);
      })
      .then(applyModel)
      .catch(() => showPlaceholder());

    markCabinet(def, 'searching');
  });

  function markCabinet(def, status) {
    const cabinet = findCabinet();
    if (!cabinet) return;
    let row = cabinet.querySelector(`[data-figure="${def.id}"]`);
    if (!row) {
      row = document.createElement('div');
      row.className = 'figure-row';
      row.dataset.figure = def.id;
      row.innerHTML =
        `<span class="figure-row-dot"></span>` +
        `<span class="figure-row-name">${def.label}</span>` +
        `<span class="figure-row-status">…</span>`;
      cabinet.appendChild(row);
    }
    const statusEl = row.querySelector('.figure-row-status');
    if (statusEl) {
      if (status === 'ready') {
        row.classList.add('is-ready');
        statusEl.textContent = 'listo';
      } else if (status === 'pending') {
        row.classList.add('is-pending');
        statusEl.textContent = 'por modelar';
      } else {
        row.classList.add('is-searching');
        statusEl.textContent = 'buscando…';
      }
    }
  }

  return { group, figures, defs: FIGURE_DEFS };
}
