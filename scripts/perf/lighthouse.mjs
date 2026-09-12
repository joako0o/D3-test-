/* lighthouse.mjs — el puntaje de Lighthouse, medido aquí y con nombre y apellido.
 *
 * POR QUÉ EXISTE
 *   El README decía que el puntaje de rendimiento "solo vale medido en un
 *   navegador real" y se dejó de medir. El resultado fue una conversación
 *   sobre un 57 sin nadie que pudiera decir QUÉ costaba ese 57: ¿el LCP, el
 *   TBT, el peso? Este script corre el Lighthouse de verdad contra el sitio y
 *   deja por escrito el desglose de las métricas y de las auditorías que
 *   restan puntos, para que "mejoré el rendimiento" sea una afirmación
 *   comprobable en vez de una impresión.
 *
 * QUÉ MIDE (y qué NO)
 *   Lighthouse puntúa sobre cinco métricas con peso fijo:
 *     LCP 25% · TBT 30% · CLS 25% · FCP 10% · Speed Index 10%
 *   Imprime esas cinco, el puntaje, y las auditorías que Lighthouse marca como
 *   oportunidad o diagnóstico, ordenadas por el ahorro que estiman.
 *
 *   LÍMITE IMPORTANTE: este Chromium pinta con SwiftShader (software). El
 *   raster y el paint cuestan mucho más que en una GPU real, así que el
 *   puntaje que sale AQUÍ es un SUELO, no el número de producción: en un
 *   portátil de verdad sale más alto. Lo que sí se transfiere tal cual es el
 *   DIAGNÓSTICO —qué archivo pesa de más, qué CSS bloquea el render, qué
 *   imagen es el LCP, cuántos bytes van sin usar— porque eso es propiedad del
 *   código, no de la GPU. Se usa para ordenar el trabajo; el número final se
 *   confirma en Chrome real.
 *
 * USO
 *   npm start                                  # el servidor, en otra terminal
 *   npm run lh                                 # móvil (lo que mide Google)
 *   npm run lh -- --device=desktop             # escritorio
 *   npm run lh -- --both                       # los dos, en orden
 *   npm run lh -- --json=.shots/lh-mobile.json # guarda el informe completo
 *   npm run lh -- --html                       # también un .html abrible
 *   npm run lh -- --cpu=1                      # sin ralentizar la CPU
 */

import fs from 'node:fs';
import path from 'node:path';
import lighthouse from 'lighthouse';
import { ROOT, parseArgs, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';
const PAGE_URL = `${ORIGIN}/index.html`;
const JSON_OUT = args.json ? path.resolve(ROOT, args.json) : null;
const HTML = args.html === 'true';
const OUT_DIR = path.join(ROOT, '.shots');

/* `--both` recorre móvil y escritorio: son dos problemas distintos. Google
   indexa y puntúa la versión MÓVIL, así que esa es la que manda; la de
   escritorio se imprime para saber cuánto del coste es del viewport chico. */
const DEVICES = args.device ? [args.device] : args.both === 'true' ? ['mobile', 'desktop'] : ['mobile'];

/* Ralentización de CPU. Lighthouse móvil ya aplica 4x por defecto (es el
   "Moto G4" de referencia); esto permite quitarla para separar "el código es
   lento" de "esta máquina es lenta". */
const CPU_THROTTLE = args.cpu ? Number(args.cpu) : undefined;

async function runOne(device) {
  const isMobile = device === 'mobile';

  /* El navegador lo arranca este script (no el CLI de Lighthouse) porque hay
     que pasarle LD_LIBRARY_PATH para las .so de @sparticuz/chromium; sin eso
     Chrome no levanta en este entorno. Lighthouse se engancha al puerto de
     debugging remoto de un navegador YA abierto. */
  const { browser, errors } = await launchChromium({
    width: isMobile ? 412 : 1350,
    height: isMobile ? 823 : 940,
    /* headless NUEVO, no 'shell': es el que emite las capturas de la traza.
       Sin ellas Lighthouse no puede calcular Speed Index y deja la categoría
       de rendimiento en null (ver el comentario en launchChromium). */
    headless: true,
    extraArgs: ['--remote-debugging-port=0'],
  });
  const port = Number(new URL(browser.wsEndpoint()).port);

  /* Lighthouse recibe DOS objetos: los `flags` (dónde conectarse, qué formato
     devolver) y la `config` (qué medir). Los settings van DENTRO de la config
     con `extends: 'lighthouse:default'` —pasarlos sueltos hace que Lighthouse
     interprete la lista de categorías como config y reviente. */
  const settings = {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    /* `maxWaitForLoad` largo a propósito: la escena 3D sigue trabajando
       después del load y con SwiftShader tarda. Cortar antes daría un puntaje
       de una página a medio construir, que es peor que no medir. */
    maxWaitForLoad: 180000,
    screenEmulation: isMobile
      ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false }
      : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
    formFactor: isMobile ? 'mobile' : 'desktop',
    emulatedUserAgent: isMobile
      ? 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
      : undefined,
  };
  if (CPU_THROTTLE !== undefined) {
    settings.throttlingMethod = 'devtools';
    settings.throttling = { ...settings.throttling, cpuSlowdownMultiplier: CPU_THROTTLE };
  }

  const flags = { port, output: HTML ? ['json', 'html'] : 'json', logLevel: 'error' };
  const result = await lighthouse(PAGE_URL, flags, { extends: 'lighthouse:default', settings });

  await browser.close();
  if (errors.length) console.log(`  (${errors.length} errores de consola durante la corrida)`);
  return result;
}

/* ────────────────────────── impresión del informe ────────────────────────── */

const scoreOf = (cat) => (cat?.score == null ? null : Math.round(cat.score * 100));
const fmtScore = (n) => (n == null ? 'n/d' : String(n).padStart(3));

/* Las cinco métricas que DECIDEN el puntaje, con el peso que les da
   Lighthouse. Saber cuál duele es lo que dice por dónde empezar: un 57 por
   LCP se arregla de otra forma que un 57 por TBT. */
const CORE = [
  ['first-contentful-paint', 'FCP', 10],
  ['largest-contentful-paint', 'LCP', 25],
  ['speed-index', 'Speed Index', 10],
  ['total-blocking-time', 'TBT', 30],
  ['cumulative-layout-shift', 'CLS', 25],
];

function printReport(result, device) {
  const lhr = result.lhr;
  const cats = lhr.categories;
  const score = scoreOf(cats.performance);

  console.log('');
  console.log(`  LIGHTHOUSE · ${device} · ${lhr.finalDisplayedUrl}`);
  console.log('  ' + '═'.repeat(76));
  console.log(
    `  performance ${fmtScore(score)}   accesibilidad ${fmtScore(scoreOf(cats.accessibility))}` +
      `   buenas prácticas ${fmtScore(scoreOf(cats['best-practices']))}   SEO ${fmtScore(scoreOf(cats.seo))}`
  );

  /* Un puntaje null NO es "cero": es que una auditoría de las que alimentan la
     categoría falló y Lighthouse prefirió no inventar un número. Se dice en
     voz alta con la causa, porque un n/d silencioso se lee como un suspenso. */
  if (score == null) {
    const failed = Object.values(lhr.audits).filter((a) => a.scoreDisplayMode === 'error' && a.errorMessage);
    console.log('');
    console.log('  ⚠ SIN PUNTAJE: una auditoría falló y la categoría no se pudo calcular.');
    for (const a of failed.slice(0, 4)) console.log(`     ${a.id}: ${a.errorMessage.slice(0, 110)}`);
  }

  console.log('');
  console.log('  MÉTRICAS QUE DECIDEN EL PUNTAJE');
  console.log('  ' + '─'.repeat(76));
  for (const [id, label, weight] of CORE) {
    const a = lhr.audits[id];
    if (!a) continue;
    const val = a.displayValue || a.numericValue?.toFixed?.(0) || '—';
    /* El rating de Lighthouse: good / average / poor. Es el que dice si esta
       métrica es la que está tirando el puntaje hacia abajo. */
    const mark = a.score == null ? '·' : a.score >= 0.9 ? '✓' : a.score >= 0.5 ? '!' : '✗';
    console.log(
      `  ${mark} ${label.padEnd(13)} ${String(val).padStart(10)}   peso ${String(weight).padStart(2)}%   score ${a.score == null ? 'n/d' : Math.round(a.score * 100)}`
    );
  }

  /* Oportunidades = auditorías con ahorro estimado. Se ordenan por ese ahorro,
     que es lo único que permite priorizar sin discutir. */
  const opps = Object.values(lhr.audits).filter(
    (a) => a.details?.type === 'opportunity' && (a.details.overallSavingsMs || 0) > 0
  );
  if (opps.length) {
    console.log('');
    console.log('  OPORTUNIDADES (ahorro estimado)');
    console.log('  ' + '─'.repeat(76));
    for (const a of opps.sort((x, y) => y.details.overallSavingsMs - x.details.overallSavingsMs)) {
      console.log(`  ${String(Math.round(a.details.overallSavingsMs)).padStart(7)} ms  ${a.id}`);
      console.log(`             ${a.title}`);
      const items = a.details.items || [];
      for (const it of items.slice(0, 4)) {
        const where = (it.url || it.node?.snippet || it.label || '').split('/').slice(-2).join('/');
        const kb = it.totalBytes ? ` ${(it.totalBytes / 1024).toFixed(0)} KB` : '';
        const waste = it.wastedBytes ? ` · sin usar ${(it.wastedBytes / 1024).toFixed(0)} KB` : '';
        if (where) console.log(`               · ${where.slice(0, 62)}${kb}${waste}`);
      }
      if (items.length > 4) console.log(`               · … y ${items.length - 4} más`);
    }
  }

  /* Diagnósticos = lo que no tiene un "ahorra X ms" pero Lighthouse igual
     marca: peso total, tareas largas, uso del hilo principal, DOM enorme. */
  const diag = Object.values(lhr.audits).filter(
    (a) => a.scoreDisplayMode === 'numeric' && a.score !== null && a.score < 0.9 && !CORE.some(([id]) => id === a.id)
  );
  if (diag.length) {
    console.log('');
    console.log('  DIAGNÓSTICOS EN ROJO O AMARILLO');
    console.log('  ' + '─'.repeat(76));
    for (const a of diag.sort((x, y) => (x.score ?? 1) - (y.score ?? 1)).slice(0, 12)) {
      console.log(`  ${a.score >= 0.5 ? '!' : '✗'} ${a.id.padEnd(34)} ${a.displayValue || ''}`);
      for (const it of (a.details?.items || []).slice(0, 3)) {
        const where = (it.url || it.node?.snippet || it.label || it.source?.url || '').split('/').slice(-2).join('/');
        const extra = [
          it.totalBytes ? `${(it.totalBytes / 1024).toFixed(0)} KB` : '',
          it.duration ? `${Math.round(it.duration)} ms` : '',
        ]
          .filter(Boolean)
          .join(' · ');
        if (where || extra) console.log(`      ${where.slice(0, 58).padEnd(58)} ${extra}`);
      }
    }
  }

  return score;
}

/* ────────────────────────────── corrida ────────────────────────────── */

const scores = [];
for (const device of DEVICES) {
  /* Chromium + SwiftShader a veces no emite las capturas de la traza y
     Lighthouse devuelve la categoría de rendimiento en null (NO_SCREENSHOTS).
     No es un resultado, es una corrida perdida: se reintenta una vez en vez
     de imprimir un nulo que se lee como un suspenso. En este entorno el
     fallo es DETERMINISTA en desktop y no ocurre en mobile, así que más
     reintentos solo queman minutos: el puntaje de escritorio hay que tomarlo
     en un navegador real (las métricas de abajo sí se imprimen igual). */
  let result;
  let score;
  for (let attempt = 1; attempt <= 2; attempt++) {
    result = await runOne(device);
    score = scoreOf(result.lhr.categories.performance);
    const noShots = result.lhr.audits['speed-index']?.errorMessage?.includes('NO_SCREENSHOTS');
    if (score != null || !noShots) break;
    console.log(`  (intento ${attempt}: Chromium no emitió capturas; reintentando…)`);
  }
  printReport(result, device);
  scores.push([device, score]);

  const base = path.join(OUT_DIR, `lighthouse-${device}`);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(result.lhr, null, 2));
  else fs.writeFileSync(`${base}.json`, JSON.stringify(result.lhr, null, 2));
  if (HTML) fs.writeFileSync(`${base}.html`, result.report[1] || result.report);
  console.log(`\n  informe en ${path.relative(ROOT, JSON_OUT || `${base}.json`)}`);
}

console.log('');
console.log('  ' + '═'.repeat(76));
console.log(`  ${scores.map(([d, s]) => `${d} ${s ?? 'n/d'}`).join('   ·   ')}`);

/* Un n/d NO es un suspenso ni un aprobado: es que Chromium no emitió las
   capturas y Lighthouse prefirió no inventar el número. En este sandbox pasa
   a menudo (pinta por software y el compositor se queda sin frames), así que
   se dice con todas las letras y se sale en rojo: un puntaje que no se pudo
   calcular no debe poder pasar por una medición válida. Las métricas y las
   auditorías de arriba sí midieron, y son las que dicen qué arreglar. */
const missing = scores.filter(([, s]) => s == null);
if (missing.length) {
  console.log('');
  console.log(
    `  ⚠ SIN PUNTAJE en ${missing.map(([d]) => d).join(', ')}: Chromium no emitió capturas (NO_SCREENSHOTS).`
  );
  console.log('    Las métricas y las auditorías de arriba sí midieron. El puntaje tómalo en un');
  console.log('    navegador real: npm run lh -- --origin=https://joako0o.github.io/D3-test-');
  process.exit(1);
}
console.log('  (SwiftShader: suelo medible, no el número de un equipo real. El diagnóstico sí vale.)');
