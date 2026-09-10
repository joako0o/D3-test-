/* compress-glbs.mjs — recompresión determinista de los GLB del repo.
 *
 * QUÉ HACE
 *   - Puerta_bcch_v3.glb: sale de Blender SIN compresión (282 KB de geometría
 *     cruda para 6,5 k vértices). Se comprime con Draco; el constructor de la
 *     puerta (buildOpenableBcchDoor) separa piezas comparando z contra
 *     BCCH_V3.slabZ con tolerancia 3e-3, por eso POSITION va a 13 bits
 *     (precisión ~6/8192 ≈ 0,0007 en un modelo de ~6 unidades): margen 4×.
 *   - figures/balanza.glb: ya viene con Draco; se re-comprime con
 *     cuantización ajustada al tamaño normalizado de la figura (~0,7).
 *   - monedav5-draco.glb: la geometría ya es compacta; el peso está en la
 *     textura `relieve_oro` guardada como WebP SIN pérdida (282 KB). Se
 *     recodifica a WebP con pérdida q90 (PSNR ~44 dB, imperceptible a tamaño
 *     de moneda). `Color_Oro` (normal map) NO se toca: re-codificar un mapa
 *     de normales con pérdida deja artefactos de sombreado.
 *
 * USO
 *   node tools/compress-glbs.mjs        # sobrescribe los GLB del repo
 *
 * Los GLB son artefactos commiteados: tras correr esto hay que validar con
 * `npm run check`, `npm run shots` y `npm run hero:check`, y subir los binarios.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression, EXTTextureWebP } from '@gltf-transform/extensions';
import { createDecoderModule, createEncoderModule } from 'draco3dgltf';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const io = new NodeIO().registerExtensions([KHRDracoMeshCompression, EXTTextureWebP]).registerDependencies({
  'draco3d.decoder': await createDecoderModule(),
  'draco3d.encoder': await createEncoderModule(),
});

const { EncoderMethod } = KHRDracoMeshCompression;

/* ── Puerta: Draco, posición a 13 bits por el umbral de la losa (3e-3) ── */
{
  const file = path.join(ROOT, 'Puerta_bcch_v3.glb');
  const before = fs.statSync(file).size;
  const doc = await io.read(file);
  /* La compresión se aplica al escribir: basta crear la extensión con las
     opciones y dejar que el writer codifique al final. */
  doc
    .createExtension(KHRDracoMeshCompression)
    .setRequired(true)
    .setEncoderOptions({
      method: EncoderMethod.EDGEBREAKER,
      quantizationBits: { POSITION: 13, NORMAL: 8, TEXCOORD: 8 },
    });
  const out = await io.writeBinary(doc);
  fs.writeFileSync(file, out);
  const after = fs.statSync(file).size;
  console.log(
    `puerta: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB (${(100 * (1 - after / before)).toFixed(0)}%)`
  );
}

/* ── Balanza: Draco re-cuantizado al tamaño normalizado de la figura ── */
{
  const file = path.join(ROOT, 'figures', 'balanza.glb');
  const before = fs.statSync(file).size;
  const doc = await io.read(file);
  /* La compresión se aplica al escribir: basta crear la extensión con las
     opciones y dejar que el writer codifique al final. */
  doc
    .createExtension(KHRDracoMeshCompression)
    .setRequired(true)
    .setEncoderOptions({
      method: EncoderMethod.EDGEBREAKER,
      quantizationBits: { POSITION: 12, NORMAL: 8, TEXCOORD: 10 },
    });
  const out = await io.writeBinary(doc);
  fs.writeFileSync(file, out);
  const after = fs.statSync(file).size;
  console.log(
    `balanza: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB (${(100 * (1 - after / before)).toFixed(0)}%)`
  );
}

/* ── Moneda: `relieve_oro` sin pérdida → WebP q90 con pérdida ── */
{
  const file = path.join(ROOT, 'monedav5-draco.glb');
  const before = fs.statSync(file).size;
  const doc = await io.read(file);
  const tex = doc
    .getRoot()
    .listTextures()
    .find((t) => t.getName() === 'relieve_oro');
  if (!tex) throw new Error('no se encontró la textura relieve_oro');
  const orig = tex.getImage();
  if (!orig) throw new Error('relieve_oro no tiene imagen');
  const sharp = (await import('sharp')).default;
  const reencoded = await sharp(Buffer.from(orig)).webp({ quality: 90, effort: 6 }).toBuffer();
  tex.setImage(new Uint8Array(reencoded), 'image/webp');
  const out = await io.writeBinary(doc);
  fs.writeFileSync(file, out);
  const after = fs.statSync(file).size;
  console.log(
    `moneda: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB (${(100 * (1 - after / before)).toFixed(0)}%) · relieve_oro ${(orig.length / 1024).toFixed(1)}→${(reencoded.length / 1024).toFixed(1)} KB`
  );
}

console.log('\nListo. Validar con: npm run check && npm run shots && npm run hero:check');
