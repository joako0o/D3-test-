/* results-decision.js — "El tono de la sala y la decisión de tasa".
 *
 * QUÉ MUESTRA
 *   132 actas en tres carriles —subió, mantuvo, bajó la tasa—, cada una un
 *   punto ubicado por el tono de su deliberación (el promedio de los puntajes
 *   de sus intervenciones). Las 52 que movieron la tasa caen todas del lado que
 *   les corresponde: 35 al alza con tono positivo, 17 a la baja con tono
 *   negativo. Las 80 que mantuvieron quedan alrededor de cero.
 *
 * POR QUÉ ES UN GRÁFICO DE PUNTOS Y NO TRES BARRAS
 *   Tres promedios dirían "0,09 · 0,00 · −0,10" y ocultarían lo que hace fuerte
 *   el hallazgo: que la separación es total, que hay dos casos pegados al cero,
 *   y que las que mantuvieron se dispersan igual de ancho. La distribución ES
 *   el resultado; el promedio es solo su resumen.
 *
 * DE DÓNDE SALEN LOS DATOS
 *   `data/web/resultados.json`, generado por scripts/build-resultados.py. Las
 *   52 coincidencias están verificadas una por una antes de dibujarlas, y el
 *   tono por acta coincide al cuarto decimal con el de la tabla maestra de la
 *   fuente (diferencia máxima 0,0000), así que no hay ambigüedad de origen.
 *
 * INTERACCIÓN
 *   Tocar un punto muestra abajo la reunión, su decisión y su tono; si esa acta
 *   tiene fragmentos en la muestra (67 de 132), aparece un botón para leer la
 *   intervención en el panel de cita.
 *   Para teclado se usa foco móvil: un solo punto está en el orden de tabulación
 *   a la vez y las flechas lo mueven. 67 paradas de tabulador serían peores que
 *   ninguna.
 */
import { pinQuote, focusReturn } from '../core/interaction-state.js';
import { getViewportSize } from '../core/viewport.js?v=2';

const ACCIONES = [
  { clave: 'subir', etiqueta: 'Subió la tasa', color: 'var(--color-gold)', tinta: '#ffd76a' },
  { clave: 'mantener', etiqueta: 'La mantuvo', color: 'rgba(223,229,240,0.9)', tinta: '#cfd6e4' },
  { clave: 'bajar', etiqueta: 'Bajó la tasa', color: 'var(--color-dovish)', tinta: '#8ab4f8' },
];

const fmt = (v) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(2).replace('.', ',')}`;
const fmtFecha = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${d} de ${MES[m - 1]} de ${a}`;
};

export function initResultsDecision({ data, openQuote }) {
  const cont = document.getElementById('resultsDecisionChart');
  const lectura = document.getElementById('resultsReadout');
  if (!cont || !lectura || !data?.actas?.length || !window.d3) return;

  const d3 = window.d3;
  const vp = getViewportSize();
  const compacto = vp.width < 700;

  /* Las actas con su decisión y su tono. El tono por acta viene del agregado; se
     usa el del corpus (promedio de los puntajes de sus intervenciones). */
  const actas = data.actas
    .filter((a) => a.decision && a.decision.accion && typeof a.score_hd === 'number')
    .map((a) => ({ ...a, accion: a.decision.accion }));

  const puente = data.puente_muestra?.por_acta || {};
  const abrible = (a) => Array.isArray(puente[a.id]?.indices) && puente[a.id].indices.length > 0;

  const total = actas.length;
  const porAccion = Object.fromEntries(ACCIONES.map((a) => [a.clave, actas.filter((x) => x.accion === a.clave)]));

  // ── Geometría ──────────────────────────────────────────────────────────
  const ancho = Math.max(320, cont.clientWidth || 900);
  /* El alto de cada carril depende del alto de pantalla: en 1280x740 el
     contenido completo (titular + gráfico + lectura + nota) sobresalía 72px.
     Medido, no estimado: con carriles de 62 entra justo. */
  const bajo = vp.height < 800;
  const carril = bajo ? (compacto ? 58 : 62) : compacto ? 74 : 86;
  const margen = { top: compacto ? 46 : 54, right: compacto ? 16 : 28, bottom: 34, left: compacto ? 96 : 150 };
  const alto = margen.top + carril * ACCIONES.length + margen.bottom;

  const valores = actas.map((a) => a.score_hd);
  const extremo = Math.max(0.25, Math.ceil(Math.max(...valores.map(Math.abs)) * 20) / 20);
  const x = d3.scaleLinear().domain([-extremo, extremo]).range([margen.left, ancho - margen.right]);
  /* El desplazamiento vertical dentro del carril es determinista (semilla por
     índice): el mismo gráfico se ve igual en cada carga y en cada captura. */
  const jitter = (i) => {
    const v = Math.sin((i + 1) * 12.9898) * 43758.5453;
    return (v - Math.floor(v) - 0.5) * (carril * 0.55);
  };

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${ancho} ${alto}`)
    .attr('role', 'img')
    .attr('aria-label',
      `Tono de la deliberación en las ${total} reuniones, agrupadas por lo que decidió el Consejo: `
      + `${porAccion.subir.length} subieron la tasa y todas quedaron con tono positivo, `
      + `${porAccion.bajar.length} la bajaron y todas con tono negativo, `
      + `${porAccion.mantener.length} la mantuvieron alrededor de cero.`)
    .style('width', '100%')
    .style('height', 'auto');

  // Línea del cero: la referencia de "sin orientación".
  svg.append('line')
    .attr('x1', x(0)).attr('x2', x(0))
    .attr('y1', margen.top - 22).attr('y2', alto - margen.bottom + 6)
    .attr('stroke', 'rgba(255,255,255,0.22)')
    .attr('stroke-dasharray', '4,5');

  // ── Carriles ───────────────────────────────────────────────────────────
  const puntos = [];
  ACCIONES.forEach((cfg, fila) => {
    const grupo = porAccion[cfg.clave];
    const cy = margen.top + fila * carril + carril / 2;
    const media = grupo.reduce((s, a) => s + a.score_hd, 0) / (grupo.length || 1);

    // Rótulo del carril: nombre + cuántas actas.
    svg.append('text')
      .attr('x', compacto ? 6 : margen.left - 74)
      .attr('y', cy - 6)
      .attr('fill', cfg.tinta)
      .attr('font-size', compacto ? 12 : 13)
      .attr('font-weight', 600)
      .attr('letter-spacing', '0.2px')
      .text(cfg.etiqueta);
    svg.append('text')
      .attr('x', compacto ? 6 : margen.left - 74)
      .attr('y', cy + 13)
      .attr('fill', 'rgba(255,255,255,0.42)')
      .attr('font-size', compacto ? 11 : 12)
      .text(`${grupo.length} ${grupo.length === 1 ? 'reunión' : 'reuniones'}`);

    // Banda del carril, muy tenue: separa sin dibujar una caja.
    svg.append('line')
      .attr('x1', margen.left).attr('x2', ancho - margen.right)
      .attr('y1', margen.top + fila * carril + carril - 6)
      .attr('y2', margen.top + fila * carril + carril - 6)
      .attr('stroke', 'rgba(255,255,255,0.05)');

    // Punto de cada acta.
    grupo.forEach((a, i) => {
      const px = x(a.score_hd);
      const py = cy + jitter(i + fila * 37);
      const puede = abrible(a);
      const g = svg.append('g')
        .attr('class', `results-dot${puede ? ' results-dot--leible' : ''}`)
        .attr('data-acta', a.id)
        .attr('transform', `translate(${px}, ${py})`)
        .attr('tabindex', -1);
      g.append('circle')
        .attr('class', 'results-dot-hit')
        .attr('r', puede ? 11 : 8)
        .attr('fill', 'transparent')
        .attr('pointer-events', 'all');
      g.append('circle')
        .attr('class', 'results-dot-mark')
        .attr('r', compacto ? 3.4 : 3.8)
        .attr('fill', cfg.color)
        .attr('fill-opacity', a.h + a.d === 0 ? 0.35 : 0.9)
        .attr('stroke', puede ? 'rgba(255,255,255,0.55)' : 'none')
        .attr('stroke-width', puede ? 1.1 : 0);
      puntos.push({ grupo: g, acta: a, cfg, puede });
    });

    // Media del carril: el resumen, marcado como tal.
    svg.append('line')
      .attr('x1', x(media)).attr('x2', x(media))
      .attr('y1', cy - carril * 0.34).attr('y2', cy + carril * 0.34)
      .attr('stroke', cfg.tinta).attr('stroke-width', 2).attr('stroke-opacity', 0.85);
    svg.append('text')
      .attr('x', x(media)).attr('y', margen.top + fila * carril + 12)
      .attr('text-anchor', 'middle')
      .attr('fill', cfg.tinta).attr('font-size', 11).attr('font-weight', 600)
      .text(fmt(media));
  });

  // ── Eje ────────────────────────────────────────────────────────────────
  const yEje = alto - margen.bottom + 22;
  svg.append('line')
    .attr('x1', margen.left).attr('x2', ancho - margen.right)
    .attr('y1', yEje - 12).attr('y2', yEje - 12)
    .attr('stroke', 'rgba(255,255,255,0.09)');
  [-extremo, -extremo / 2, 0, extremo / 2, extremo].forEach((v) => {
    svg.append('text')
      .attr('x', x(v)).attr('y', yEje + 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255,255,255,0.4)').attr('font-size', 11)
      .text(v === 0 ? '0' : fmt(v));
  });
  svg.append('text')
    .attr('x', x(-extremo)).attr('y', yEje + 16)
    .attr('text-anchor', 'start')
    .attr('fill', 'rgba(138,180,248,0.75)').attr('font-size', 11)
    .text('← más dovish');
  svg.append('text')
    .attr('x', x(extremo)).attr('y', yEje + 16)
    .attr('text-anchor', 'end')
    .attr('fill', 'rgba(255,215,106,0.75)').attr('font-size', 11)
    .text('más hawkish →');

  // ── Lectura ────────────────────────────────────────────────────────────
  const conFrase = data.cruce_decision?.con_frase_acuerdo || [];
  const sub = conFrase.find((b) => b.accion === 'subir');
  const baj = conFrase.find((b) => b.accion === 'bajar');

  const mostrar = (acta) => {
    const cfg = ACCIONES.find((a) => a.clave === acta.accion);
    const tiene = abrible(acta);
    const indice = tiene ? puente[acta.id].indices[0] : -1;
    lectura.innerHTML = '';
    const t = document.createElement('span');
    t.className = 'results-readout-fecha';
    t.textContent = fmtFecha(acta.fecha);
    const d = document.createElement('span');
    d.className = 'results-readout-decision';
    d.textContent = `${cfg.etiqueta.toLowerCase()} · tono ${fmt(acta.score_hd)}`;
    d.style.color = cfg.tinta;
    lectura.append(t, d);
    if (tiene) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'results-readout-open';
      b.textContent = 'Leer una intervención de esa reunión ↗';
      b.addEventListener('click', () => {
        focusReturn.card = b;
        pinQuote(indice);
        openQuote(indice, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 });
      });
      lectura.appendChild(b);
    } else {
      const s = document.createElement('span');
      s.className = 'results-readout-sin';
      s.textContent = 'sin fragmento abrible en esta muestra';
      lectura.appendChild(s);
    }
  };

  // Estado inicial: una reunión que subió, con fragmento, y bien marcada.
  const inicial = puntos.find((p) => p.acta.accion === 'subir' && p.puede && p.acta.score_hd > 0.15)
    || puntos.find((p) => p.puede)
    || puntos[0];

  // Foco móvil: un solo punto en el orden de tabulación.
  const navegables = puntos.filter((p) => p.puede);
  let actual = navegables.indexOf(inicial) >= 0 ? navegables.indexOf(inicial) : 0;
  const enfocar = (i, mover) => {
    if (!navegables.length) return;
    actual = (i + navegables.length) % navegables.length;
    navegables.forEach((p, k) => p.grupo.attr('tabindex', k === actual ? 0 : -1));
    if (mover) navegables[actual].grupo.node().focus();
    mostrar(navegables[actual].acta);
  };
  enfocar(actual, false);

  puntos.forEach(({ grupo, acta, puede }, i) => {
    grupo.style('cursor', puede ? 'pointer' : 'default');
    grupo.on('click', () => {
      if (puede) {
        const k = navegables.findIndex((p) => p.acta.id === acta.id);
        enfocar(k, false);
      } else {
        mostrar(acta);
      }
    });
    grupo.on('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); enfocar(actual + 1, true); }
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); enfocar(actual - 1, true); }
      else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        document.querySelector('.results-readout-open')?.click();
      }
    });
  });

  // La línea de titulares: los números verificados, no redondeados a ojo.
  const resumen = document.getElementById('resultsSummary');
  if (resumen && sub && baj) {
    resumen.textContent = `${sub.signo_coherente} de ${sub.n} la subieron · ${baj.signo_coherente} de ${baj.n} la bajaron`;
  }
}
