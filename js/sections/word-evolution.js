/* word-evolution.js — "El lenguaje cambia": huella de vocabulario por año.
 *
 * Sección autocontenida: DOM + D3 + GSAP. NO toca la escena 3D ni una sola
 * variable suya, por eso pudo salir de main.js sin negociar nada.
 *
 * Dependencias:
 *   - `quotes` llega por parámetro (el dato no se importa, se inyecta).
 *   - `normalizeTopicText` de ../topics.js.
 *   - d3, gsap y ScrollTrigger son globales que index.html carga como
 *     scripts clásicos ANTES del módulo, así que están disponibles.
 */
import { normalizeTopicText } from '../topics.js';

let quotes = [];


/* ────────────────────────────────
   Acto 4 — evolución del vocabulario
   La vista cuenta presencia de términos por fragmento y por año; no
   convierte la frecuencia en una medida de importancia política. La
   taxonomía de palabras se mantiene deliberadamente legible para que el
   lector pueda seguir la evidencia hasta el acta.
──────────────────────────────── */
/* Rebuild-safe: al redimensionar la ventana (o cargar fuentes) la gráfica
   de evolución se vuelve a dibujar. Antes tomaba el tamaño UNA sola vez y
   usaba preserveAspectRatio:none, así que al cambiar el viewport el texto
   y el trazo se estiraban (problema típico entre local y GitHub Pages). */
let wordEvolutionDisposers = [];
function disposeWordEvolution() {
  wordEvolutionDisposers.forEach((dispose) => { try { dispose(); } catch (e) { /* noop */ } });
  wordEvolutionDisposers.length = 0;
}
export function initWordEvolution(quotesData = quotes) {
  quotes = quotesData;
  const svg = document.getElementById('wordEvolutionSvg');
  const intro = document.querySelector('.word-evolution-intro');
  const board = document.getElementById('wordEvolutionBoard');
  const yearEl = document.getElementById('wordEvolutionYear');
  const readoutEl = document.getElementById('wordEvolutionReadout');
  if (!svg || !intro || !board || !yearEl || !readoutEl || !quotes.length || !window.d3) return;

  /* Limpiar el dibujo/animaciones previos antes de reconstruir. */
  disposeWordEvolution();
  d3.select(svg).selectAll('*').remove();
  svg.removeAttribute('viewBox');

  const years = d3.range(2000, 2016);
  const labels = ['hawkish', 'dovish'];
  const candidateTerms = [
    'inflación', 'precios', 'expectativas', 'tasa', 'tasas', 'aumento', 'subir', 'mantener', 'bajar', 'alza', 'riesgo',
    'crecimiento', 'actividad', 'demanda', 'producto', 'contexto', 'escenario', 'internacional', 'mercado', 'mercados',
    'empresas', 'hogares', 'endeudamiento', 'petróleo', 'cobre', 'energía', 'alimentos', 'empleo', 'salarios', 'fiscal',
    'gasto', 'presupuesto', 'déficit', 'consumo', 'inversión', 'exportaciones', 'importaciones'
  ].map(normalizeTopicText);
  const candidateSet = new Set(candidateTerms);
  const stopWords = new Set([
    'para', 'como', 'desde', 'entre', 'sobre', 'esta', 'este', 'estas', 'estos', 'también', 'tambien', 'cada', 'cuando',
    'donde', 'señala', 'senala', 'indica', 'señor', 'senor', 'presidente', 'consejero', 'gerente', 'gerencia', 'división',
    'division', 'estudios', 'reunión', 'reunion', 'anterior', 'opción', 'opciones', 'oportunidad', 'respecto', 'puntos',
    'base', 'parte', 'lugar', 'forma', 'manera', 'mayor', 'menor', 'dado', 'considera', 'elementos', 'siguiente',
    'siguientes', 'además', 'ademas', 'aunque', 'ellos', 'ellas', 'ello', 'hasta', 'hace', 'tiene', 'tienen', 'puede',
    'podría', 'podria', 'sería', 'seria', 'chile', 'banco', 'central', 'política', 'politica', 'monetaria', 'fragmento',
    'intervención', 'intervencion', 'acta', 'actas', 'muestra'
  ].map(normalizeTopicText));
  const participantTokens = new Set(quotes.flatMap((q) => normalizeTopicText(q.participant).match(/[a-zñ]{4,}/g) || []));
  const rowCounts = { hawkish: new Map(), dovish: new Map() };
  const termCounts = { hawkish: new Map(), dovish: new Map() };
  const displayTerms = {
    inflacion: 'inflación', precios: 'precios', expectativas: 'expectativas', tasa: 'tasa', tasas: 'tasas', aumento: 'aumento',
    subir: 'subir', mantener: 'mantener', bajar: 'bajar', alza: 'alza', riesgo: 'riesgo', crecimiento: 'crecimiento',
    actividad: 'actividad', demanda: 'demanda', producto: 'producto', contexto: 'contexto', escenario: 'escenario',
    internacional: 'internacional', mercado: 'mercado', mercados: 'mercados', empresas: 'empresas', hogares: 'hogares',
    endeudamiento: 'endeudamiento', petroleo: 'petróleo', cobre: 'cobre', energia: 'energía', alimentos: 'alimentos',
    empleo: 'empleo', salarios: 'salarios', fiscal: 'fiscal', gasto: 'gasto', presupuesto: 'presupuesto', deficit: 'déficit',
    consumo: 'consumo', inversion: 'inversión', exportaciones: 'exportaciones', importaciones: 'importaciones'
  };

  const sourceYear = (q) => {
    const match = String(q.date || '').match(/^(\d{4})/);
    return match ? Number(match[1]) : Number(q.year);
  };
  quotes.forEach((q) => {
    const label = labels.includes(q.label) ? q.label : null;
    const year = sourceYear(q);
    if (!label || !years.includes(year)) return;
    rowCounts[label].set(year, (rowCounts[label].get(year) || 0) + 1);
    const words = new Set((normalizeTopicText(q.text).match(/[a-zñ]{4,}/g) || []).filter((word) => candidateSet.has(word) && !stopWords.has(word) && !participantTokens.has(word)));
    words.forEach((word) => {
      if (!termCounts[label].has(word)) termCounts[label].set(word, new Map());
      const yearly = termCounts[label].get(word);
      yearly.set(year, (yearly.get(year) || 0) + 1);
    });
  });

  const topTerms = {};
  labels.forEach((label) => {
    topTerms[label] = [...termCounts[label].entries()]
      .map(([term, yearly]) => ({
        term,
        total: [...yearly.values()].reduce((sum, value) => sum + value, 0),
        yearly,
      }))
      .sort((a, b) => b.total - a.total || a.term.localeCompare(b.term, 'es'))
      .slice(0, 3);
  });

  /* El SVG usa coordenadas del tamaño visible, no un viewBox fijo de
     1000×450. Así las etiquetas siguen siendo tipográficas en 320px y el
     trazo aprovecha el ancho disponible en desktop. */
  const chartWrap = svg.parentElement;
  const chartRect = chartWrap?.getBoundingClientRect();
  const W = Math.max(280, Math.round(chartRect?.width || svg.clientWidth || 1000));
  const H = Math.max(180, Math.round(chartRect?.height || svg.clientHeight || 450));
  const compactChart = W < 520 || H < 240;
  const margin = compactChart
    ? {
      top: H < 220 ? 31 : 36,
      right: W < 360 ? 74 : 84,
      bottom: H < 220 ? 25 : 30,
      left: W < 360 ? 34 : 48,
    }
    : { top: 42, right: 128, bottom: 42, left: 72 };
  const laneGap = compactChart ? (H < 220 ? 25 : 34) : 42;
  const laneHeight = (H - margin.top - margin.bottom - laneGap) / 2;
  const x = d3.scaleLinear().domain([2000, 2015]).range([margin.left, W - margin.right]);
  const svgEl = d3.select(svg)
    .attr('viewBox', `0 0 ${W} ${H}`)
    /* Si el ratio del contenedor cambia entre el init y el redibujo, 'meet'
       escala el contenido sin estirar el texto ni el trazo. Con 'none' la
       etiquetas se deformaban al cambiar de viewport (local vs GitHub). */
    .attr('preserveAspectRatio', 'xMidYMid meet');
  const chartGroup = svgEl.append('g').attr('class', 'word-chart-group');
  const cursor = svgEl.append('line')
    .attr('class', 'word-cursor')
    .attr('x1', x(2000)).attr('x2', x(2000))
    .attr('y1', margin.top - 4).attr('y2', H - margin.bottom + 3);
  const series = [];

  const formatValue = (label, term, year) => {
    const numerator = term.yearly.get(year) || 0;
    const denominator = rowCounts[label].get(year) || 0;
    return denominator ? (numerator / denominator) * 100 : 0;
  };

  labels.forEach((label, laneIndex) => {
    const laneTop = margin.top + laneIndex * (laneHeight + laneGap);
    const laneBottom = laneTop + laneHeight;
    const laneTerms = topTerms[label];
    const maxValue = Math.max(20, ...laneTerms.flatMap((item) => years.map((year) => formatValue(label, item, year))));
    const y = d3.scaleLinear().domain([0, maxValue]).range([laneBottom, laneTop]);
    const lane = chartGroup.append('g').attr('class', `word-lane word-lane--${label}`);
    lane.append('text').attr('class', `word-lane-label ${label}`).attr('x', margin.left).attr('y', laneTop - 14).text(label === 'hawkish' ? 'Hawkish · restrictiva' : 'Dovish · expansiva');
    [0, maxValue / 2, maxValue].forEach((value) => {
      lane.append('line').attr('class', value === 0 ? 'word-zero-line' : 'word-grid-line')
        .attr('x1', margin.left).attr('x2', W - margin.right).attr('y1', y(value)).attr('y2', y(value));
    });
    lane.append('text').attr('class', 'word-axis-label').attr('x', margin.left - 10).attr('y', laneBottom + 4).attr('text-anchor', 'end').text('0%');
    lane.append('text').attr('class', 'word-axis-label').attr('x', margin.left - 10).attr('y', laneTop + 4).attr('text-anchor', 'end').text(`${Math.round(maxValue)}%`);

    /* En el borde derecho las tres palabras comparten un espacio pequeño.
       Ordenarlas y darles una separación mínima evita que dos términos con
       el mismo valor final se impriman uno encima de otro. */
    const labelGap = compactChart ? 13 : 15;
    const labelMinY = laneTop + (compactChart ? 9 : 11);
    const labelMaxY = laneBottom - (compactChart ? 3 : 4);
    const labelPositions = new Map();
    const labelSpecs = laneTerms.map((item, rank) => {
      const finalValue = formatValue(label, item, 2015);
      return { rank, desired: y(finalValue) + (rank - 1) * labelGap };
    }).sort((a, b) => a.desired - b.desired);
    let nextLabelY = labelMinY;
    labelSpecs.forEach((spec) => {
      const position = Math.max(nextLabelY, Math.min(labelMaxY, spec.desired));
      labelPositions.set(spec.rank, position);
      nextLabelY = position + labelGap;
    });
    const labelOverflow = nextLabelY - labelGap - labelMaxY;
    if (labelOverflow > 0) {
      labelSpecs.forEach((spec) => labelPositions.set(spec.rank, labelPositions.get(spec.rank) - labelOverflow));
    }

    laneTerms.forEach((item, rank) => {
      const values = years.map((year) => ({ year, value: formatValue(label, item, year) }));
      const line = d3.line().x((point) => x(point.year)).y((point) => y(point.value)).curve(d3.curveMonotoneX);
      const path = lane.append('path')
        .attr('class', `word-path ${label}`)
        .attr('d', line(values))
        .attr('stroke-width', rank === 0 ? 2.7 : 1.8)
        .style('opacity', rank === 0 ? 1 : rank === 1 ? 0.68 : 0.42);
      const pathNode = path.node();
      if (pathNode) {
        const length = pathNode.getTotalLength();
        path.attr('stroke-dasharray', length).attr('stroke-dashoffset', length).attr('data-length', length);
      }
      values.forEach((point) => {
        lane.append('circle')
          .attr('class', `word-point ${label}`)
          .attr('cx', x(point.year)).attr('cy', y(point.value)).attr('r', rank === 0 ? 2.8 : 2)
          .style('opacity', rank === 0 ? 0.95 : rank === 1 ? 0.58 : 0.36);
      });
      const last = values[values.length - 1];
      lane.append('text').attr('class', `word-end-label ${label}`).attr('x', x(last.year) + 8).attr('y', labelPositions.get(rank) + 4).text(displayTerms[item.term] || item.term);
      series.push({ label, term: item.term, values, path: pathNode });
    });
  });

  years.forEach((year) => {
    const tick = compactChart
      ? [2000, 2005, 2010, 2015].includes(year)
      : ((year - 2000) % 3 === 0 || year === 2015);
    if (!tick) return;
    svgEl.append('text').attr('class', 'word-axis-label').attr('x', x(year)).attr('y', H - 12).attr('text-anchor', 'middle').text(year);
  });

  const updateYear = (year, reveal = 1) => {
    const safeYear = Math.round(d3.max([2000, Math.min(2015, year)]));
    yearEl.textContent = safeYear;
    cursor.attr('x1', x(safeYear)).attr('x2', x(safeYear));
    series.forEach((item) => {
      if (!item.path) return;
      const length = Number(item.path.getAttribute('data-length') || 0);
      item.path.style.strokeDashoffset = String(length * (1 - reveal));
    });
    const readout = labels.map((label) => {
      const current = series.filter((item) => item.label === label).map((item) => {
        const point = item.values.find((value) => value.year === safeYear);
        return `${displayTerms[item.term] || item.term} ${Math.round(point?.value || 0)}%`;
      }).join(' · ');
      return `${label === 'hawkish' ? 'Hawkish' : 'Dovish'}: ${current || 'sin registros'}`;
    }).join('   /   ');
    readoutEl.textContent = readout || 'No hay términos suficientes en la muestra disponible.';
  };

  updateYear(2000, 0);
  const onPointerMove = (event) => {
    const rect = svg.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * W;
    updateYear(x.invert(localX), 1);
  };
  const onPointerLeave = () => updateYear(2000 + 15 * 0.5, 1);
  svg.addEventListener('pointermove', onPointerMove);
  chartWrap?.addEventListener('pointerleave', onPointerLeave);
  wordEvolutionDisposers.push(() => {
    svg.removeEventListener('pointermove', onPointerMove);
    chartWrap?.removeEventListener('pointerleave', onPointerLeave);
  });

  const introBoardTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#stageWordEvolution',
      start: 'top 85%',
      end: 'bottom bottom',
      scrub: true,
    },
  })
    .fromTo(intro, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.12, ease: 'none' }, 0.04)
    .fromTo(board, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.15, ease: 'none' }, 0.16)
    .to(intro, { opacity: 0, y: -14, duration: 0.08, ease: 'none' }, 0.90);
  wordEvolutionDisposers.push(() => {
    try { introBoardTl.scrollTrigger?.kill(); } catch (e) { /* noop */ }
    try { introBoardTl.kill(); } catch (e) { /* noop */ }
  });

  const wordEvolutionST = ScrollTrigger.create({
    trigger: '#stageWordEvolution',
    start: 'top 85%',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const reveal = d3.min([1, d3.max([0, (self.progress - 0.08) / 0.52])]);
      updateYear(2000 + self.progress * 15, reveal);
    },
  });
  wordEvolutionDisposers.push(() => wordEvolutionST.kill());
}
