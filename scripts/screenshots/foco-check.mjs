/* foco-check.mjs — todo estado de foco se puede deshacer
 *
 * POR QUÉ EXISTE
 *   El autor reportó que, después de elegir algo, no encontraba cómo volver a
 *   dejar la escena entera. Al medirlo aparecieron dos agujeros distintos:
 *
 *     · ACTAS: no había salida de NINGÚN tipo. `selectedActDate` se escribía al
 *       elegir una reunión y no se limpiaba en ningún punto del código: ni
 *       Escape, ni volver a hacer clic, ni salir de la sección. Se entraba y no
 *       se salía.
 *     · VOCES: sí había salida (volver a hacer clic en la misma tarjeta), pero
 *       invisible. Nadie adivina un toggle que no se anuncia.
 *
 *   Esto comprueba que ahora cada foco tenga salida y que Escape limpie todo.
 *   Un estado sin salida no se ve en una captura: se ve midiendo, como se
 *   encontró.
 *
 * USO
 *   npm start              # en otra terminal
 *   npm run foco:check
 */

import { parseArgs, launchChromium, openSite, sleep } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';

let fallos = 0;
const fila = (ok, txt) => {
  if (!ok) fallos++;
  console.log(`  ${ok ? 'ok  ' : 'FALLA'} ${txt}`);
};

const { browser, page, errors } = await launchChromium({ width: 1440, height: 900 });
await openSite(page, ORIGIN, { settleMs: 8000 });

const estado = () =>
  page.evaluate(() => ({
    actaActiva: document.querySelectorAll('#actsList .act-list-item[aria-current="true"]').length,
    lectorVacio: !!document.getElementById('actReader')?.classList.contains('is-empty'),
    invitacion: !document.getElementById('actReaderEmpty')?.hidden,
    vozActiva: document.querySelectorAll('.voice-card[aria-pressed="true"]').length,
    detalleVoz: !document.getElementById('voiceDetailContent')?.hidden,
    botonQuitar: !!document.getElementById('voiceDetailClear') && !document.getElementById('voiceDetailClear').hidden,
  }));

/* ── ACTAS ──────────────────────────────────────────────────────────────── */
console.log('\n── ACTAS');
await page.evaluate(() => {
  const el = document.getElementById('stageActs');
  window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.5);
});
await sleep(2500);

const inicial = await estado();
fila(inicial.actaActiva === 1, `al llegar hay una reunión elegida por defecto (${inicial.actaActiva})`);

const items = await page.$$('#actsList .act-list-item');
if (!items.length) {
  fila(false, 'no hay lista de actas');
} else {
  await items[4].click();
  await sleep(600);
  const otra = await estado();
  fila(otra.actaActiva === 1 && !otra.lectorVacio, 'elegir otra reunión deja el lector con contenido');

  await items[4].click();
  await sleep(600);
  const quitada = await estado();
  fila(
    quitada.actaActiva === 0 && quitada.lectorVacio && quitada.invitacion,
    'volver a elegir la MISMA quita la selección y muestra la invitación'
  );

  await items[4].click();
  await sleep(600);
  await page.keyboard.press('Escape');
  await sleep(800);
  const trasEscape = await estado();
  fila(trasEscape.actaActiva === 0 && trasEscape.lectorVacio, 'Escape también quita la selección');
}

/* ── VOCES ──────────────────────────────────────────────────────────────── */
console.log('\n── VOCES');
await page.evaluate(() => {
  const el = document.getElementById('stageVoices');
  window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.5);
});
await sleep(2500);

const card = await page.$('.voice-card');
if (!card) {
  fila(false, 'no hay tarjetas de voz');
} else {
  await card.click();
  await sleep(700);
  const elegida = await estado();
  fila(
    elegida.vozActiva === 1 && elegida.detalleVoz && elegida.botonQuitar,
    'elegir una voz muestra su detalle y el botón "Quitar selección"'
  );

  await page.click('#voiceDetailClear');
  await sleep(600);
  const quitada = await estado();
  fila(quitada.vozActiva === 0 && !quitada.detalleVoz, 'el botón quita la selección');

  await card.click();
  await sleep(600);
  await page.keyboard.press('Escape');
  await sleep(800);
  const trasEscape = await estado();
  fila(trasEscape.vozActiva === 0 && !trasEscape.detalleVoz, 'Escape también la quita');
}

if (errors.length) fila(false, `errores de página: ${errors.slice(0, 2).join(' | ')}`);
await browser.close();

console.log(`\n${fallos ? `── ${fallos} comprobación(es) fallidas` : '── todo OK'}`);
process.exit(fallos ? 1 : 0);
