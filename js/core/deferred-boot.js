/* deferred-boot.js — el trabajo pesado que NO hace falta para pintar la
 * portada, corrido después.
 *
 * POR QUÉ EXISTE
 *   `main.js` construía las cinco secciones de datos (mapa de intervenciones,
 *   evolución del lenguaje, navegador de actas, voces, línea de tiempo) en la
 *   misma evaluación del módulo: ~1.500 nodos nuevos entre SVG de D3, tarjetas
 *   y ScrollTriggers, todos antes de que el navegador hubiera pintado nada.
 *   En el informe de producción eso se veía como 1,5 s de "Style & Layout" y
 *   tareas largas de 68/128/438 ms dentro del TBT: el lector no puede hacer
 *   scroll a una sección que todavía no existe, pero paga el coste igual.
 *
 *   Ninguna de esas cinco secciones está en la portada. Este módulo las
 *   encola y las corre cuando el hilo principal ya está libre, en el mismo
 *   orden en que se registraron y cediendo el hilo entre una y otra.
 *
 * QUÉ GARANTIZA (y qué NO)
 *   · ORDEN: la cola es FIFO. El orden en que se crean los ScrollTrigger es
 *     parte del contrato del relato —un `pin` cambia la altura del documento
 *     y con ella las posiciones de los demás—, así que las tareas corren
 *     exactamente en el orden en que `main.js` las registró.
 *   · UNA POR VEZ: cada tarea espera SU hueco, no uno para la cola entera. Si
 *     se pidiera un solo hueco, las cinco secciones se construirían de corrido
 *     dentro de él y volverían a competir con el arranque del 3D —que es
 *     justo lo que se está evitando—. Así cinco tareas de 100 ms no se miden
 *     como UNA de 500 ms, que es lo que cuenta el TBT.
 *   · PLAZO: el hueco se espera con `requestIdleCallback` y un tope
 *     (IDLE_TIMEOUT_MS). El arranque del 3D puede tener el hilo ocupado mucho
 *     rato (compilando shaders, decodificando Draco) y las secciones tienen
 *     que existir antes de que el lector llegue a ellas: si el hueco no
 *     llega, se construyen igual.
 *   · MODO APURO: cuando los GLB terminan, `flushDeferredBoot()` deja de
 *     esperar huecos y `deferredBootDone()` avisa de que la cola quedó vacía.
 *     Es la condición para levantar la cortina de carga.
 *
 * USO
 *   import {
 *     deferBoot, onDeferredBootDone, flushDeferredBoot, deferredBootDone,
 *   } from './core/deferred-boot.js';
 *
 *   deferBoot(async () => {
 *     const { initD3Axes } = await import('./sections/axes-map.js?v=3');
 *     initD3Axes({ quotes, openQuote });
 *   });
 *
 *   onDeferredBootDone(() => ScrollTrigger.refresh());  // una sola vez
 *
 *   // cuando el arranque del 3D termina:
 *   flushDeferredBoot();
 *   Promise.all([warmUpScene(), deferredBootDone()]).finally(levantarCortina);
 */

const queue = [];
const doneCallbacks = [];
const doneResolvers = [];
let started = false;
let finished = false;
/* Modo apuro: se activa cuando el arranque del 3D terminó y lo que queda de la
   cola tiene que salir YA (ver flushDeferredBoot). */
let flushing = false;
/* Red de seguridad: si `load` no llega (un recurso que no termina, un entorno
   sin evento de carga), la cola arranca igual. Sin esto, en jsdom —donde
   `load` se dispara antes de que el módulo se importe, o nunca— las secciones
   no se construirían y `npm run check` dejaría de ejercitarlas. */
const FALLBACK_MS = 4000;
/* Cuánto se espera un hueco antes de construir una sección. 350 ms por tarea:
   con cinco secciones, el peor caso son menos de 2 s de retraso en una máquina
   que no para quieta —y la cortina de carga sigue puesta mientras tanto, así
   que el lector no ve ningún hueco. Más que eso no compensa: lo que se gana
   esperando se pierde en el momento en que `flushDeferredBoot()` entra en modo
   apuro. */
const IDLE_TIMEOUT_MS = 350;
/* Para arrancar la cola se espera un poco más: si el arranque del 3D está en
   su pico, construir secciones en medio solo lo alarga. */
const START_TIMEOUT_MS = 800;

/* Un hueco del hilo principal, con plazo. Si el hilo está ocupado (compilando
   shaders, decodificando Draco, construyendo la escena) se espera; si pasa el
   plazo, se corre igual: las secciones tienen que existir antes de que el
   lector llegue a ellas, y un hilo saturado no es excusa para no construirlas
   nunca. Sin `requestIdleCallback` (Safari) se usa un temporizador corto. */
function whenFreePromise(timeout = IDLE_TIMEOUT_MS) {
  return new Promise((resolve) => {
    /* En modo apuro ya no se espera un hueco: solo se cede el hilo (setTimeout
       0), que es lo mínimo para que el navegador pueda pintar entre tareas. */
    if (flushing) {
      setTimeout(resolve, 0);
      return;
    }
    if (typeof requestIdleCallback === 'function') requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, Math.min(timeout, 200));
  });
}

function whenFree(run) {
  whenFreePromise(START_TIMEOUT_MS).then(run);
}

function schedule() {
  if (started) return;
  started = true;
  if (document.readyState === 'complete') whenFree(drain);
  else {
    const onLoad = () => whenFree(drain);
    window.addEventListener('load', onLoad, { once: true });
    setTimeout(onLoad, FALLBACK_MS);
  }
}

async function drain() {
  while (queue.length) {
    /* Un hueco POR TAREA, no uno para la cola entera: si se pidiera una sola
       vez, las cinco secciones se construirían de corrido dentro del mismo
       hueco y volverían a competir con el arranque del 3D (que es justo lo que
       se está evitando). */
    await whenFreePromise();
    const task = queue.shift();
    try {
      await task();
    } catch (e) {
      /* Una sección que revienta no puede tumbar las que vienen detrás: se
         avisa y se sigue. `npm run check` caza el error igual. */
      console.warn('Tarea diferida del arranque incompleta:', e);
    }
  }
  finished = true;
  while (doneCallbacks.length) {
    const cb = doneCallbacks.shift();
    try {
      cb();
    } catch (e) {
      console.warn('Aviso tras el arranque diferido:', e);
    }
  }
  while (doneResolvers.length) doneResolvers.shift()();
}

/* Deja de esperar huecos y arranca la cola si no había arrancado. Lo llama
   main.js cuando los GLB terminaron: a partir de ese instante la cortina está a
   punto de levantarse y el lector no puede encontrar una sección a medio
   construir. */
export function flushDeferredBoot() {
  flushing = true;
  if (!started) {
    started = true;
    drain();
  }
}

/* Promesa que se resuelve cuando la cola queda vacía (o ya lo estaba). Es la
   otra mitad de flushDeferredBoot(): `Promise.all([warmUpScene(),
   deferredBootDone()])` es la condición para levantar la cortina. */
export function deferredBootDone() {
  if (finished) return Promise.resolve();
  return new Promise((resolve) => doneResolvers.push(resolve));
}

/* Encola una tarea para después de la primera pinta. Si la cola ya se vació
   (alguien registra tarde), se vuelve a poner en marcha: no se pierde. */
export function deferBoot(task) {
  queue.push(task);
  if (finished) {
    finished = false;
    drain();
  } else {
    schedule();
  }
}

export function onDeferredBootDone(cb) {
  if (finished) cb();
  else doneCallbacks.push(cb);
}

/* Para `?debug` y para las pruebas: cuántas tareas quedan. */
export const deferredBootState = () => ({ pending: queue.length, started, finished });

schedule();
