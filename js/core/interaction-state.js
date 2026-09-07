/* interaction-state.js — el puente entre las secciones DOM y la escena 3D.
 *
 * POR QUÉ EXISTE
 *   Las secciones de scrollytelling son DOM + D3. La nube de partículas es
 *   WebGL. Pero son la misma información: al hacer click en una tarjeta del
 *   navegador de actas se ilumina una partícula, y al pasar el cursor por una
 *   partícula se abre la misma cita. Ese cruce necesita un estado compartido.
 *
 *   Antes eran ocho variables `let` sueltas en medio de las 4.200 líneas de
 *   main.js, escritas desde ocho sitios distintos. Dos de ellas
 *   (`lastFocusedCard`, `activeParticleFocus`) se declaraban DESPUÉS de las
 *   funciones que las usaban, así que estaban en zona muerta temporal y solo
 *   funcionaban por accidente: dentro de manejadores de evento, que corren
 *   más tarde. Agruparlas aquí elimina ese problema de raíz.
 *
 * LA REGLA
 *   Esto es lo ÚNICO que una sección de `js/sections/` puede compartir con la
 *   escena. Si una sección necesita algo más del 3D, no está lista para salir
 *   de main.js.
 *
 * POR QUÉ OBJETOS Y NO VARIABLES SUELTAS
 *   Un `export let` no se puede reasignar desde fuera del módulo. Con un
 *   objeto exportado, quien lo importa ve siempre el valor vivo. Es
 *   deliberado, no un descuido.
 */

/* ── Qué cita está señalada ──────────────────────────────────────────────
   Dos niveles: `hover` es un vistazo efímero (cursor encima, foco de
   teclado) y `pinned` es una fijación explícita (click, Enter) que el hover
   ya no puede pisar. `pinned` gana siempre. */
export const selection = { hover: -1, pinned: -1 };

/** Índice efectivo: lo fijado manda sobre lo que se está mirando. */
export function activeQuoteIndex() {
  return selection.pinned >= 0 ? selection.pinned : selection.hover;
}

export function isPinned() {
  return selection.pinned >= 0;
}

/** Vistazo: cursor encima de una partícula, o foco de teclado en una tarjeta. */
export function peekQuote(index) {
  selection.hover = index;
}

export function clearPeek() {
  selection.hover = -1;
}

/** Fijación: click o Enter. Cancela el vistazo para que no compitan. */
export function pinQuote(index) {
  selection.pinned = index;
  selection.hover = -1;
}

/** Se sale de La Sala, o se cierra el panel: no hay nada señalado. */
export function clearSelection() {
  selection.pinned = -1;
  selection.hover = -1;
}

/* ── Voz seleccionada en el directorio de "Las voces" ────────────────────
   `participant` es la voz elegida; `rendered` es la que la nube ya está
   pintando (la transición entre ambas la interpola el bucle de render);
   `quoteIndex` es la cita concreta que el panel de detalle tiene abierta. */
export const voiceFocus = { participant: null, rendered: null, quoteIndex: -1 };

/* ── Escalas del mapa de intervenciones ──────────────────────────────────
   Las calcula la sección de D3 y las reutiliza la nube de partículas para
   colocarse sobre las mismas coordenadas: así el paso del plano factual a la
   nube es el mismo dato, no dos geometrías parecidas. */
export const axesState = { scales: {} };

/* ── A dónde vuelve el foco al cerrar el panel de cita ───────────────────
   Requisito de accesibilidad: cerrar con ✕ o Escape tiene que devolver el
   foco al elemento que abrió el panel, no al principio del documento. */
export const focusReturn = { card: null };

/* ── Partícula resaltada por la sección activa ───────────────────────────
   -1 = ninguna. La escribe la sección, la lee el shader de la nube. */
export const particleFocus = { index: -1 };
