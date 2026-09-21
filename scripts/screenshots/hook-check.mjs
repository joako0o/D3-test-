/* hook-check.mjs — ¿se lee y se usa la sección de El Método en cualquier pantalla?
 *
 * POR QUÉ EXISTE
 *   El arnés tenía verificación de la portada (`hero:check`) y capturas de
 *   todas las secciones (`shots`), pero nada comprobaba el comportamiento de
 *   una sección con estado propio. El Método tiene dos cosas que se rompen en
 *   silencio y que ninguna captura muestra:
 *
 *     1. Un panel que se abre (TF·IDF). Su display del autor le ganaba al
 *        `hidden` del navegador y medía 249px CERRADO: se veía siempre. Y al
 *        abrirlo se iba abajo de la pantalla (1067px en un viewport de 900), en
 *        un contenedor sticky donde scrollear no lo revela.
 *     2. Dos tarjetas que abren el panel de cita. Si el índice no coincide, se
 *        abre OTRA intervención: el lector lee una cita y el panel muestra otra
 *        cosa. Eso no se ve en una captura, se ve comparando los dos textos.
 *
 * QUÉ COMPRUEBA (por viewport)
 *   · el titular entra completo (no se recorta contra el borde superior)
 *   · las dos tarjetas y el puente entran en el viewport
 *   · el panel de TF·IDF mide 0 cerrado y entra completo abierto
 *   · abre con clic y con Enter, y cierra con Escape
 *   · el clic en el "?" no abre además el panel de cita
 *   · clic en cada tarjeta → el panel de cita muestra al autor de ESA tarjeta
 *   · la cita del recorte es SUBCADENA LITERAL del texto completo
 *
 * USO
 *   npm start            # en otra terminal
 *   npm run hook:check
 *   npm run hook:check -- --vps=1440x900,390x844
 */

import { parseArgs, launchChromium, openSite, sleep } from '../lib/chromium.mjs';

const DEFAULT_VPS = ['1440x900', '1600x900', '1280x740', '1100x620', '860x700', '390x844', '430x932'];

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

for (const { w, h, label } of VPS) {
  console.log(`\n── ${label}`);
  const { browser, page, errors } = await launchChromium({ width: w, height: h });
  await openSite(page, ORIGIN, { settleMs: 8000 });

  // El centro de la sección: es donde el contenido queda fijo y todo visible.
  await page.evaluate(() => {
    const el = document.getElementById('stageHook');
    window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.45);
  });
  await sleep(2600);

  const layout = await page.evaluate(() => {
    const caja = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), bottom: Math.round(r.bottom), alto: Math.round(r.height) };
    };
    const orden = ['#stageHook .hook-lead', '.signal-list', '.hook-bridge', '.model-note-line'].map(
      (s) => caja(s)?.top ?? null
    );
    return {
      titulo: caja('#stageHook h2[data-hook]'),
      lead: caja('#stageHook .hook-lead'),
      cards: caja('.signal-list'),
      puente: caja('.hook-bridge'),
      nota: caja('.model-note-line'),
      panelCerrado: caja('#modelNotePanel').alto,
      orden,
      vh: window.innerHeight,
    };
  });

  fila(layout.titulo.top >= 0, `el kicker no se recorta (top ${layout.titulo.top})`);
  fila(layout.lead.top >= 0, `el titular entra completo (top ${layout.lead.top})`);
  fila(layout.cards.bottom <= layout.vh, `las tarjetas y el puente entran (${layout.cards.bottom} ≤ ${layout.vh})`);
  fila(layout.panelCerrado === 0, `el panel de TF·IDF mide 0 cerrado (${layout.panelCerrado}px)`);
  fila(
    layout.orden[0] < layout.orden[1] && layout.orden[1] < layout.orden[2] && layout.orden[2] < layout.orden[3],
    'orden del documento: titular → tarjetas → puente → nota del método'
  );

  // El "?" — clic, teclado y Escape
  await page.click('.model-note-toggle');
  await sleep(600);
  const abierto = await page.evaluate(() => {
    const p = document.getElementById('modelNotePanel');
    const r = p.getBoundingClientRect();
    const q = document.getElementById('quotePanel');
    return {
      exp: document.querySelector('.model-note-toggle').getAttribute('aria-expanded'),
      alto: Math.round(r.height),
      entra: r.bottom <= window.innerHeight + 1 && r.top >= -1,
      cita: !!(q && !q.hidden && getComputedStyle(q).opacity !== '0'),
      parrafos: p.querySelectorAll('p').length,
    };
  });
  fila(abierto.exp === 'true' && abierto.alto > 100, `el panel abre (${abierto.alto}px, ${abierto.parrafos} párrafos)`);
  fila(abierto.entra, 'el panel abierto entra completo en el viewport');
  fila(!abierto.cita, 'el clic en el "?" no abre el panel de cita');

  await page.keyboard.press('Escape');
  await sleep(400);
  const cerrado = await page.evaluate(() => ({
    exp: document.querySelector('.model-note-toggle').getAttribute('aria-expanded'),
    alto: Math.round(document.getElementById('modelNotePanel').getBoundingClientRect().height),
  }));
  fila(cerrado.exp === 'false' && cerrado.alto === 0, 'Escape cierra el panel');

  // Las dos tarjetas → panel de cita con el autor correcto
  for (const [sel, autor] of [
    ['.signal-card--hawkish', /Marf/i],
    ['.signal-card--dovish', /Marshall/i],
  ]) {
    const esperado = await page.evaluate((s) => {
      const card = document.querySelector(s);
      const quien = card.querySelector('.signal-phrase strong').textContent.trim();
      const cita = card.querySelector('.signal-phrase').textContent.split('«')[1]?.split('»')[0] ?? '';
      return { quien, cita: cita.replace(/\s+/g, ' ').trim() };
    }, sel);

    await page.click(sel);
    await sleep(800);
    const panel = await page.evaluate(() => {
      const q = document.getElementById('quotePanel');
      return {
        abierto: !!(q && !q.hidden && getComputedStyle(q).opacity !== '0'),
        quien: document.getElementById('qpWho').textContent.trim(),
        completo: document.getElementById('qpText').textContent.replace(/\s+/g, ' ').trim(),
      };
    });
    fila(
      panel.abierto && autor.test(panel.quien),
      `${sel}: abre la cita de ${panel.quien} (esperado ${esperado.quien})`
    );
    fila(
      esperado.cita.length > 10 && panel.completo.includes(esperado.cita),
      `${sel}: el recorte es subcadena literal del texto completo`
    );
    await page.keyboard.press('Escape');
    await sleep(400);
  }

  if (errors.length) fila(false, `errores de página: ${errors.slice(0, 2).join(' | ')}`);
  await browser.close();
}

console.log(`\n${fallos ? `── ${fallos} comprobación(es) fallidas` : '── todo OK'}`);
process.exit(fallos ? 1 : 0);
