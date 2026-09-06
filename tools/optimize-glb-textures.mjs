/* optimize-glb-textures.mjs — recomprimir las texturas incrustadas en un GLB.
 *
 * POR QUÉ EXISTE
 *   monedav5-draco.glb pesaba 433 KB y apenas se comprimía al servirlo (419 KB
 *   gzip): era el archivo más caro del arranque. La geometría no era el
 *   problema —Draco ya la había reducido a 17.828 triángulos— sino las
 *   texturas incrustadas, y en concreto UNA: el normal map guardado en WebP
 *   SIN PÉRDIDA (VP8L), 282 KB de los 433.
 *
 *   Ese normal map es casi plano: la desviación típica de sus canales R y G
 *   es del 0,8%, es decir, relieve muy sutil. Guardar eso sin pérdida es pagar
 *   precio de fotografía por lo que es casi un color liso.
 *
 * QUÉ HACE
 *   Reescribe las imágenes de un GLB con WebP con pérdida a la calidad dada,
 *   deja el resto del archivo intacto (geometría Draco, materiales, escena) y
 *   recalcula las cabeceras y el padding que exige la especificación glTF 2.0.
 *
 * USO
 *   npm run opt:glb
 *   node tools/optimize-glb-textures.mjs --file=monedav5-draco.glb --quality=90
 *
 * CÓMO SE VALIDÓ
 *   No por el peso: comparando el hero renderizado antes y después. Un normal
 *   map con artefactos no se nota en el archivo, se nota en cómo le pega la
 *   luz a la moneda. Ver docs/AUDITORIA.md.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v = 'true'] = a.slice(2).split('=');
      return [k, v];
    })
);

const FILE = path.join(ROOT, args.file || 'monedav5-draco.glb');
const QUALITY = Number(args.quality || 90);

const buf = fs.readFileSync(FILE);
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('No es un GLB (falta la firma glTF).');

/* Un GLB son dos trozos: JSON y binario, cada uno con cabecera de 8 bytes. */
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
const binStart = 20 + jsonLen + 8;
const binLen = buf.readUInt32LE(20 + jsonLen);
const bin = buf.subarray(binStart, binStart + binLen);

if (!json.images?.length) {
  console.log('El archivo no lleva imágenes incrustadas: nada que hacer.');
  process.exit(0);
}

/* Los bufferViews se reescriben en orden, así que hay que reconstruir el
   binario entero respetando el alineado a 4 bytes que pide la especificación. */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'glbopt-'));
const replacements = new Map(); // índice de bufferView -> Buffer nuevo

json.images.forEach((img, i) => {
  if (img.bufferView === undefined) return;
  const bv = json.bufferViews[img.bufferView];
  const data = bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  const src = path.join(tmp, `img${i}.webp`);
  const dst = path.join(tmp, `img${i}-opt.webp`);
  fs.writeFileSync(src, data);
  execFileSync('convert', [src, '-quality', String(QUALITY), dst]);
  const out = fs.readFileSync(dst);
  // Solo se acepta si de verdad ahorra: recomprimir puede engordar.
  if (out.length < data.length) {
    replacements.set(img.bufferView, out);
    console.log(`  imagen ${i}: ${(data.length / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB`);
  } else {
    console.log(`  imagen ${i}: ${(data.length / 1024).toFixed(0)} KB (sin cambio: recomprimir no ahorra)`);
  }
});

if (!replacements.size) {
  console.log('Ninguna imagen mejoró. Archivo intacto.');
  process.exit(0);
}

/* Reconstrucción: se recorren los bufferViews en el orden en que aparecen en
   el binario y se reasignan offsets. Cualquier otro dato (geometría Draco)
   se copia tal cual. */
const order = json.bufferViews.map((bv, i) => ({ i, off: bv.byteOffset || 0 })).sort((a, b) => a.off - b.off);
const chunks = [];
let cursor = 0;
for (const { i } of order) {
  const bv = json.bufferViews[i];
  const data = replacements.get(i) || bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  bv.byteOffset = cursor;
  bv.byteLength = data.length;
  chunks.push(data);
  cursor += data.length;
  const pad = (4 - (cursor % 4)) % 4;
  if (pad) {
    chunks.push(Buffer.alloc(pad));
    cursor += pad;
  }
}
const newBin = Buffer.concat(chunks);
json.buffers[0].byteLength = newBin.length;

const newJson = Buffer.from(JSON.stringify(json), 'utf8');
const jsonPad = (4 - (newJson.length % 4)) % 4;
const jsonPadded = Buffer.concat([newJson, Buffer.alloc(jsonPad, 0x20)]); // espacios
const binPad = (4 - (newBin.length % 4)) % 4;
const binPadded = Buffer.concat([newBin, Buffer.alloc(binPad)]);

const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonPadded.length + 8 + binPadded.length, 8);
const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonPadded.length, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'
const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binPadded.length, 0);
binHeader.writeUInt32LE(0x004e4942, 4); // 'BIN'

const out = Buffer.concat([header, jsonHeader, jsonPadded, binHeader, binPadded]);
fs.writeFileSync(FILE, out);
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n  ${path.basename(FILE)}: ${(buf.length / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB`);
console.log('  Comprueba el render antes de dar esto por bueno: npm run shots -- --only=hero\n');
