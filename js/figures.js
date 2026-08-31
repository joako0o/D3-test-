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
    /* SOPORTE (pedestal escalonado) — la peana sobre la que se apoya la
       estatua. Es la pieza que ancla la composición de La Sala: sin base, la
       figura "flotaba" sobre el navy y el bloque de texto quedaba encima.
       Origen: `Soporte.glb` (Meshy, 1.04 MB) → `figures/soporte.glb`
       (28 KB, Draco, 6.9 k triángulos, normales con crease 38°). */
    id: 'soporte',
    label: 'Pedestal',
    subtitle: 'Base de la pieza central',
    glb: 'figures/soporte.glb',
    available: true,
    x: 0, y: 0, z: -4.8,
    /* `scale` normaliza por la dimensión mayor: aquí es el DIÁMETRO.
       0.70 de diámetro → 0.159 de alto (el GLB es un disco escalonado).
       `stretchY` estira SOLO el alto después de normalizar: el disco original
       es demasiado plano y a tamaño de pantalla se leía como una chapa oscura
       detrás del texto en vez de como un pedestal. 1.6 → 0.254 de alto, y el
       diámetro se recortó a 0.70 para que no compita con la estatua
       (una peana ancha y baja parecía una torta; alta y esbelta, un pedestal). */
    scale: 0.70,
    stretchY: 1.6,
    color: 0x9aa6bd,
    /* Piedra oscura azulada: contrasta con la caliza de la estatua sin
       competir con el oro del hero. */
    finish: { metalness: 0.05, roughness: 0.7, color: 0x424c63 },
  },
  {
    id: 'balanza',
    label: 'Balanza',
    subtitle: 'Equilibrio hawkish / dovish',
    glb: 'figures/balanza.glb',
    available: true,
    /* Centro y al FONDO de la La Sala (pieza central, tipo museo).
       La cámara entra mirando a z=-2.0; a z=-4.8 queda detrás de la nube
       de partículas (que se despeja al cruzar) y la luz de acento la
       ilumina desde el frente.
       `standsOn: 'soporte'` → el sistema la apoya sobre la cara superior del
       pedestal en cuanto ambos GLB terminan de cargar (ver `restack`), así el
       alto del pedestal no queda escrito a mano en dos sitios. */
    x: 0, y: 0, z: -4.8,
    standsOn: 'soporte',
    scale: 1.15,
    color: 0xffd76a,
    /* Acabado PIEDRA mate (limestone): la figura no compite con la moneda
       dorada del hero. `applyModel` respeta estos valores en vez de forzar
       el metal por defecto (ver abajo en model.traverse). */
    finish: { metalness: 0.0, roughness: 0.82, color: 0xc7b9a4 },
  },
  {
    id: 'inflacion',
    label: 'Vela de precios',
    subtitle: 'Presión inflacionaria',
    glb: 'figures/inflacion.glb',
    available: false,
    x: -4.8, y: 0, z: -3.2,
    scale: 1.0,
    color: 0xff8a5c,
  },
  {
    id: 'brote',
    label: 'Brote',
    subtitle: 'Crecimiento y holgura',
    glb: 'figures/brote.glb',
    available: false,
    x: 4.8, y: 0, z: -3.2,
    scale: 1.0,
    color: 0x8ab4f8,
  },
  {
    id: 'acta',
    label: 'Acta',
    subtitle: 'Fuente trazable',
    glb: 'figures/acta.glb',
    available: false,
    x: 0, y: 0, z: -6.4,
    scale: 0.9,
    color: 0xcfd6e4,
  },
  {
    id: 'corpus',
    label: 'Corpus',
    subtitle: '182 reuniones de referencia',
    glb: 'figures/corpus.glb',
    available: false,
    x: -4.6, y: 0, z: -5.6,
    scale: 0.8,
    color: 0xcfd6e4,
  },
  {
    id: 'campana',
    label: 'Campana',
    subtitle: 'Inicio y cierre de sesión',
    glb: 'figures/campana.glb',
    available: false,
    x: 4.6, y: 0, z: -5.6,
    scale: 0.8,
    color: 0xffd76a,
  },
];

/**
 * Crea todos los grupos de figuras y devuelve un objeto para actualizarlas.
 * Se invoca con `scene` ya construida.
 */
export function initFigureSystem(scene, { onReady = null, debug = false } = {}) {
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
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.20, 0), placeholderMat);
    mesh.material = placeholderMat.clone();
    mesh.userData = { ...def, pending: true };
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.27, 1), placeholderWire);
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.31, 0.38, 32), haloMat.clone());
    halo.rotation.x = -Math.PI / 2;
    mesh.add(wire);
    mesh.add(halo);
    return mesh;
  }

  function findCabinet() {
    return document.getElementById('figureCabinet');
  }

  FIGURE_DEFS.forEach((def) => {
    if (!debug && !def.available) return;

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
      /* `stretchY` (opcional) estira el alto sin tocar la planta: sirve para
         que una peana muy plana gane presencia sin volver a exportar el GLB. */
      if (def.stretchY) model.scale.y *= def.stretchY;
      box.setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.x -= center.x;
      model.position.z -= center.z;
      model.position.y -= box.min.y;
      /* Alto REAL ya escalado: lo usa `restack()` para apoyar una figura
         sobre otra (la estatua sobre el pedestal) sin números mágicos. */
      box.setFromObject(model);
      record.height = box.max.y - box.min.y;
      model.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        const mats = (Array.isArray(obj.material) ? obj.material : [obj.material]).filter(Boolean);
        mats.forEach((m) => {
          /* Si la figura define `finish`, se respeta tal cual (p. ej. la
             balanza en piedra mate). Si no, se mantiene el metal por defecto
             de la familia aplicado a todas las figuras. */
          const finish = def.finish;
          const metalness = finish?.metalness ?? 0.82;
          const roughness = finish?.roughness ?? 0.24;
          if ('metalness' in m) m.metalness = metalness;
          if ('roughness' in m) m.roughness = roughness;
          m.color = m.color || new THREE.Color();
          if (finish?.color != null) {
            m.color.set(finish.color);
          } else if (obj.name.toLowerCase().includes('gold') || obj.name.toLowerCase().includes('oro')) {
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
      restack();
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

    /* No hacer HEAD a GLBs ausentes: cada 404 ensucia consola y red.
       Solo se carga si `available: true`. Los placeholders y el gabinete
       quedan reservados al modo ?debug. */
    if (def.available) {
      if (debug) markCabinet(def, 'searching');
      loader.loadAsync(def.glb).then(applyModel).catch(() => {
        if (debug) showPlaceholder();
      });
    } else if (debug) {
      showPlaceholder();
    }
  });

  /* Apila figuras: `standsOn: 'otraFigura'` apoya el modelo sobre la cara
     superior de esa figura. Se llama cada vez que un GLB termina de cargar,
     así el orden de descarga no importa (si el pedestal llega después, la
     estatua se recoloca sola). */
  function restack() {
    figures.forEach((record) => {
      const base = record.def.standsOn ? figures.get(record.def.standsOn) : null;
      if (!base) return;
      const baseHeight = base.height ?? 0;
      record.root.position.y = (record.def.y ?? 0) + (base.def.y ?? 0) + baseHeight;
    });
  }

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

  return { group, figures, defs: FIGURE_DEFS, restack };
}
