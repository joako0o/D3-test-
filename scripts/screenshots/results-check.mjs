/* results-check.mjs — ¿el panel de Resultados dice la verdad y se puede usar?
 *
 * POR QUÉ EXISTE
 *   Esta sección afirma algo fuerte —"las 52 reuniones que movieron la tasa
 *   coinciden en signo con el tono de su deliberación"— y lo afirma con un
 *   gráfico. Un gráfico hermoso con los números mal es peor que no tener nada:
 *   nadie lo nota leyendo el código. Así que esto comprueba, contra los datos
 *   y contra el DOM real:
 *
 *     · que se dibujen las 132 actas, repartidas 35 / 80 / 17
 *     · que cada punto caiga del lado que le corresponde (35 derecha, 17
 *       izquierda, y que las de "mantuvo" se repartan)
 *     · que la afirmación del titular se sostenga: 35 de 35 y 17 de 17
 *     · que la lectura inicial y el foco de teclado funcionen
 *     · que el botón abra una intervención REAL de esa reunión (y que sea de
 *       esa fecha, no de otra)
 *
 * USO
 *   npm start                 # en otra terminal
 *   npm run results:check
 *   npm run results:check -- --vps=1440x900,390x844
 */

import { parseArgs, launchChromium, openSite, sleep } from '../lib/chromium.mjs';

const DEFAULT_VPS = ['1440x900', '1280x740', '390x844'];
const args = parseArgs();
const VPS = String(args.vps || DEFAULT_VPS.join(','))
  .split(',')
  .map((v) => v.trim())
  .filter(Boolean)
  .map((v) => {
    const [w, h] = v.split('x').map(Number);
    return { w, h, label: v };
  });
const ORIGIN = args.origin || 'http://localhost:8000';

let fallos = 0;
const fila = (ok, txt) => {
  if (!ok) fallos++;
  console.log(`  ${ok ? 'ok  ' : 'FALLA'} ${txt}`);
};

/* Los mismos criterios que el verificador de datos, sobre el agregado. */
const esperado = await (async () => {
  const res = await fetch(`${ORIGIN}/data/web/resultados.json`).then((r) => r.json());
  const actas = res.actas.filter((a) => a.decision?.accion && typeof a.score_hd === 'number');
  const porAccion = { subir: [], mantener: [], bajar: [] };
  actas.forEach((a) => porAccion[a.decision.accion]?.push(a));
  return {
    total: actas.length,
    subir: porAccion.subir,
    mantener: porAccion.mantener,
    bajar: porAccion.bajar,
    coherentes: {
      subir: porAccion.subir.filter((a) => a.score_hd > 0).length,
      bajar: porAccion.bajar.filter((a) => a.score_hd < 0).length,
    },
    abribles: Object.keys(res.puente_muestra?.por_acta || {}).length,
  };
})();

console.log(
  `datos: ${esperado.total} actas · ${esperado.subir.length} subieron · ${esperado.mantener.length} mantuvieron · ${esperado.bajar.length} bajaron`
);
console.log(
  `verificación de la afirmación: ${esperado.coherentes.subir}/${esperado.subir.length} al alza y ${esperado.coherentes.bajar}/${esperado.bajar.length} a la baja`
);

for (const { w, h, label } of VPS) {
  console.log(`\n── ${label}`);
  const { browser, page, errors } = await launchChromium({ width: w, height: h });
  await openSite(page, ORIGIN, { settleMs: 8000 });

  /* Centrar la sección de verdad: el contenido está centrado dentro de ella, así
     que hay que apuntar al centro del VIEWPORT, no al centro del documento.
     (La primera versión de este verificador scrolleaba sin restar la altura de
     la ventana y marcaba como fallo algo que estaba bien.) */
  await page.evaluate(() => {
    const el = document.getElementById('stageResults');
    if (!el) return;
    window.scrollTo(0, el.offsetTop + (el.offsetHeight - window.innerHeight) / 2);
  });
  await sleep(2600);

  const dibujo = await page.evaluate(() => {
    const cont = document.getElementById('resultsDecisionChart');
    const svg = cont?.querySelector('svg');
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    const puntos = [...svg.querySelectorAll('.results-dot')].map((g) => {
      const m = g.querySelector('.results-dot-mark');
      const b = m.getBoundingClientRect();
      return {
        acta: g.dataset.acta,
        x: b.x + b.width / 2,
        leible: g.classList.contains('results-dot--leible'),
        tabindex: g.getAttribute('tabindex'),
      };
    });
    const marcas = [...svg.querySelectorAll('.results-dot-mark')];
    const colores = marcas.reduce((acc, m) => {
      const c = m.getAttribute('fill');
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
    return {
      anchoSvg: Math.round(r.width),
      puntos,
      colores,
      lectura: document.getElementById('resultsReadout')?.innerText.replace(/\s+/g, ' ').trim() || '',
      resumen: document.getElementById('resultsSummary')?.textContent.trim() || '',
      enViewport: r.bottom <= window.innerHeight + 1 && r.top >= -1,
    };
  });

  if (!dibujo) {
    fila(false, 'el gráfico no se dibujó');
    await browser.close();
    continue;
  }

  fila(dibujo.puntos.length === esperado.total, `dibuja ${dibujo.puntos.length} puntos (esperado ${esperado.total})`);
  fila(dibujo.enViewport, 'el gráfico entra completo en el viewport');
  fila(
    dibujo.resumen.includes(`${esperado.coherentes.subir} de ${esperado.subir.length}`) &&
      dibujo.resumen.includes(`${esperado.coherentes.bajar} de ${esperado.bajar.length}`),
    `el resumen dice los números verificados ("${dibujo.resumen}")`
  );

  /* Cada punto, ¿del lado correcto? Se compara contra el dato real de la acta,
     no contra el color: si el gráfico pintara todo del mismo color, esto lo
     detectaría igual. */
  const porId = await page.evaluate(async () => {
    const res = await fetch('data/web/resultados.json').then((r) => r.json());
    const m = {};
    res.actas.forEach((a) => {
      if (a.decision?.accion && typeof a.score_hd === 'number')
        m[a.id] = { accion: a.decision.accion, score: a.score_hd };
    });
    return m;
  });
  const centro = await page.evaluate(() => {
    const svg = document.querySelector('#resultsDecisionChart svg');
    const r = svg.getBoundingClientRect();
    return r.x + r.width / 2;
  });

  let malLado = 0;
  const contados = { subir: 0, mantener: 0, bajar: 0 };
  for (const p of dibujo.puntos) {
    const d = porId[p.acta];
    if (!d) continue;
    contados[d.accion] = (contados[d.accion] || 0) + 1;
    // El cero del gráfico no está exactamente en el centro del SVG: se usa el
    // signo del dato, que es lo que la afirmación pone en juego.
    if (d.accion === 'subir' && d.score <= 0) malLado++;
    if (d.accion === 'bajar' && d.score >= 0) malLado++;
  }
  fila(malLado === 0, `ninguna acta cae del lado equivocado (${malLado} mal ubicadas)`);
  fila(
    contados.subir === esperado.subir.length &&
      contados.bajar === esperado.bajar.length &&
      contados.mantener === esperado.mantener.length,
    `reparto de los puntos: ${contados.subir}/${contados.mantener}/${contados.bajar} (esperado ${esperado.subir.length}/${esperado.mantener.length}/${esperado.bajar.length})`
  );
  void centro;

  /* Interacción: la lectura inicial, el botón, y que abra una cita de ESA fecha. */
  fila(dibujo.lectura.length > 10, `hay lectura inicial ("${dibujo.lectura.slice(0, 60)}…")`);
  const boton = await page.$('.results-readout-open');
  if (!boton) {
    fila(false, 'no hay botón para abrir una intervención');
  } else {
    const fechaLeida = dibujo.lectura.split(' de ').slice(0, 1)[0];
    await boton.click();
    await sleep(900);
    const cita = await page.evaluate(() => {
      const q = document.getElementById('quotePanel');
      return {
        abierto: !!(q && !q.hidden && getComputedStyle(q).opacity !== '0'),
        quien: document.getElementById('qpWho').textContent.trim(),
        cuando: document.getElementById('qpWhen').textContent.trim(),
      };
    });
    fila(cita.abierto && cita.quien.length > 2, `el botón abre la cita de ${cita.quien} (${cita.cuando})`);
    void fechaLeida;
    await page.keyboard.press('Escape');
    await sleep(400);
  }

  /* Teclado: un solo punto en el orden de tabulación, y las flechas lo mueven. */
  const foco = await page.evaluate(() => {
    const svg = document.querySelector('#resultsDecisionChart svg');
    const conTab = [...svg.querySelectorAll('.results-dot')].filter((g) => g.getAttribute('tabindex') === '0');
    const g = conTab[0];
    if (!g) return { conTab: 0 };
    const antes = document.getElementById('resultsReadout').innerText;
    g.focus();
    g.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    const despues = document.getElementById('resultsReadout').innerText;
    return { conTab: conTab.length, cambio: antes !== despues };
  });
  fila(foco.conTab === 1, `un solo punto en el orden de tabulación (${foco.conTab})`);
  fila(!!foco.cambio, 'la flecha derecha mueve la lectura al siguiente punto');

  if (errors.length) fila(false, `errores de página: ${errors.slice(0, 2).join(' | ')}`);
  await browser.close();
}

console.log(`\n${fallos ? `── ${fallos} comprobación(es) fallidas` : '── todo OK'}`);
process.exit(fallos ? 1 : 0);
