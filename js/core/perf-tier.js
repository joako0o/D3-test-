/* perf-tier.js — en qué máquina estamos, decidido al arrancar.
 *
 * La escena ya se adapta en caliente (el bucle de `animate()` baja el DPR si
 * el frame promedio supera ~26 ms), pero esa adaptación llega tarde: primero
 * hay que crear el renderer (el antialiasing no se puede cambiar después) y
 * el CSS ya pintó los paneles de vidrio. Este módulo decide ANTES, con
 * señales baratas y sin pedir un contexto WebGL desechable (la sonda vieja
 * costaba 1,6 s de arranque: crear un contexto es lo caro, no el renderer).
 *
 * Dos momentos:
 *   1) `detectLowPower()` — antes de crear el renderer. Decide antialias,
 *      tope de DPR y la clase `low-power` del <body> (ver
 *      css/29-low-power.css). Señales: núcleos, memoria declarada y el
 *      override `?lowpower=1|0` para probar a mano.
 *   2) `describeGLRenderer()` — justo después de crear el renderer, sobre SU
 *      contexto (sin coste extra). Si la GPU real es software (SwiftShader,
 *      llvmpipe) o una integrada antigua, degrada aunque las señales
 *      previas dijeran que no.
 *
 * Falla hacia la calidad completa: una GPU desconocida NO se castiga. El
 * bucle adaptativo de main.js sigue siendo la red para lo que esto no vea.
 */

/*_override manual: ?lowpower=1 fuerza el modo, ?lowpower=0 lo prohíbe
   (también prohíbe la degradación por nombre de GPU: sirve para comparar
   capturas con `npm run shots` en la misma máquina). */
function lowPowerOverride() {
  try {
    const v = new URLSearchParams(location.search).get('lowpower');
    if (v === '1') return true;
    if (v === '0') return false;
  } catch { /* sin URLSearchParams no hay override */ }
  return null;
}

export function detectLowPower() {
  const forced = lowPowerOverride();
  if (forced !== null) return forced;
  try {
    const nav = typeof navigator !== 'undefined' ? navigator : null;
    if (!nav) return false;
    /* Un dual-core con 4 hilos (el Celeron / i3 viejo de oficina, la
       Raspberry Pi, el móvil de 2018) casi siempre trae una GPU integrada
       débil pegada. A partir de 6 hilos ya suele haber músculo de sobra. */
    const cores = Number(nav.hardwareConcurrency);
    if (Number.isFinite(cores) && cores > 0 && cores <= 4) return true;
    /* deviceMemory solo existe en Chromium; en Firefox/Safari es undefined
       y NO se interpreta como débil (desconocido ≠ malo). */
    const mem = Number(nav.deviceMemory);
    if (Number.isFinite(mem) && mem > 0 && mem <= 4) return true;
  } catch { /* sin navigator no se sabe: calidad completa */ }
  return false;
}

/* Nombres de GPU que no dan para un canvas a pantalla completa con MSAA y
   paneles de vidrio encima. Se compara contra UNMASKED_RENDERER_WEBGL cuando
   el navegador lo expone, si no contra RENDERER a secas. */
const WEAK_GPU =
  /swiftshader|llvmpipe|softpipe|swrast|software|basic render|angle \(google/i;
const WEAK_INTEL =
  /intel.*\bhd graphics\b|intel.*uhd graphics 6|intel.*iris.*graphics (5100|6100|540|550|640|650)\b/i;
const WEAK_MOBILE =
  /* "Adreno (TM) 506": el nombre real trae "(TM)" entre la marca y el
     número, por eso se salta todo lo que no sea dígito. */
  /adreno[^0-9]*[34]\d\d\b|adreno[^0-9]*5[01]\d\b|mali-?4|mali-t|powervr|videocore|tegra/i;

export function isWeakGPUName(name) {
  const s = String(name || '');
  return WEAK_GPU.test(s) || WEAK_INTEL.test(s) || WEAK_MOBILE.test(s);
}

/* Lee el nombre de la GPU del contexto YA creado (coste ~0: una extensión y
   un getParameter). Devuelve { name, weak }. `weak` también es false con
   `?lowpower=0`, para poder comparar contra la degradación automática. */
export function describeGLRenderer(renderer) {
  try {
    const gl = renderer && renderer.getContext ? renderer.getContext() : null;
    if (!gl) return { name: '', weak: false };
    let name = '';
    try {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      name = String(
        (ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) ||
          gl.getParameter(gl.RENDERER) ||
          ''
      );
    } catch { /* sin nombre no se degrada */ }
    if (lowPowerOverride() === false) return { name, weak: false };
    return { name, weak: isWeakGPUName(name) };
  } catch {
    return { name: '', weak: false };
  }
}
