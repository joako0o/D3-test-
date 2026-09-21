#!/usr/bin/env python3
"""legibilidad.py — ¿se entiende lo que dice la pieza? Medido, no opinado.

POR QUÉ EXISTE
  La pieza es un ensayo de datos que quiere leer cualquiera, pero su prosa se
  escribe en el orden en que se entiende el tema (primero la jerga, después la
  explicación). Eso se nota: hay secciones cuyo texto no se puede leer sin saber
  ya qué es un ensamble o un TF-IDF. Este script mide **la dificultad de lectura
  de cada sección**, para poder discutirlo con números en vez de con impresiones,
  y para saber si una reescritura mejoró o empeoró algo.

CÓMO MIDE
  Índice Fernández-Huerta (1959), el estándar para castellano:

      L = 206,84 − 0,60 · P − 1,02 · F

  con P = sílabas por cada 100 palabras y F = oraciones por cada 100 palabras.
  Se lee como el nivel escolar necesario: 90+ muy fácil (primaria), 70–80 fácil,
  60–70 normal (secundaria), 50–60 algo difícil, <50 difícil (universitario).

  Las sílabas se estiman contando grupos vocálicos tras separar diptongos
  simples; es la aproximación que usan las implementaciones de referencia, con
  ±5% de error, suficiente para comparar secciones entre sí y una sección
  consigo misma antes y después.

QUÉ CUENTA COMO TEXTO DE UNA SECCIÓN
  El texto visible de `<section id=…>`: se quitan los comentarios, las etiquetas,
  los `aria-label` y las entidades se resuelven. Los rótulos de gráficos cuentan
  (el lector los lee), los `alt` no.

USO
  python3 scripts/analysis/legibilidad.py               # todas las secciones
  python3 scripts/analysis/legibilidad.py --id stageHook
  python3 scripts/analysis/legibilidad.py --detalle     # frases más largas
"""

from __future__ import annotations

import argparse
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INDEX = ROOT / "index.html"

VOCALES = "aeiouáéíóúü"
# Grupos vocálicos que cuentan como UNA sílaba (diptongos y triptongos) frente a
# los hiatos, que cuentan como dos. Es una aproximación: el castellano tiene
# excepciones (día/dí-a, aún/a-ún) que no cambian la comparación entre secciones.
DIPTONGOS = re.compile(r"[aeoáéó][iu]|[iu][aeoáéó]|[iu][iu]|u[aeoáéó]".replace("u", "ü"), re.I)


def silabas(palabra: str) -> int:
    palabra = re.sub(r"[^a-záéíóúüñ]", "", palabra.lower())
    if not palabra:
        return 0
    grupos = re.findall(f"[{VOCALES}]+", palabra)
    total = 0
    for grupo in grupos:
        reducido = DIPTONGOS.sub("x", grupo)
        total += max(1, len(reducido))
    return max(1, total)


def texto_de(seccion_html: str) -> str:
    """Texto visible: sin comentarios, sin etiquetas, sin atributos."""
    sin_comentarios = re.sub(r"<!--[\s\S]*?-->", " ", seccion_html)
    sin_scripts = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", sin_comentarios)
    # Los rótulos ocultos para lectores de pantalla no los lee nadie a ojo.
    sin_sr = re.sub(r'<[^>]*class="[^"]*sr-only[^"]*"[^>]*>[\s\S]*?</[a-z]+>', " ", sin_scripts)
    plano = re.sub(r"<[^>]+>", " ", sin_sr)
    plano = html.unescape(plano)
    return re.sub(r"\s+", " ", plano).strip()


def oraciones(texto: str) -> list[str]:
    partes = re.split(r"(?<=[.!?…])\s+", texto)
    return [p.strip() for p in partes if len(p.strip()) > 3]


def huerta(texto: str) -> dict:
    palabras = re.findall(r"[a-záéíóúüñA-ZÁÉÍÓÚÑ]+", texto)
    frases = oraciones(texto)
    if not palabras or not frases:
        return {}
    n_pal, n_fra = len(palabras), len(frases)
    n_sil = sum(silabas(p) for p in palabras)
    P = n_sil / n_pal * 100
    F = n_fra / n_pal * 100
    L = 206.84 - 0.60 * P - 1.02 * F
    largas = sorted(palabras, key=len, reverse=True)[:8]
    return {
        "palabras": n_pal,
        "oraciones": n_fra,
        "palabras_por_oracion": round(n_pal / n_fra, 1),
        "silabas_por_palabra": round(n_sil / n_pal, 2),
        "huerta": round(L, 1),
        "nivel": nivel(L),
        "mas_largas": largas,
        "frases_largas": sorted(frases, key=lambda f: -len(f.split()))[:3],
    }


def nivel(L: float) -> str:
    if L >= 90:
        return "muy fácil"
    if L >= 80:
        return "fácil"
    if L >= 70:
        return "bastante fácil"
    if L >= 60:
        return "normal"
    if L >= 50:
        return "algo difícil"
    return "difícil"


def secciones(html_completo: str):
    for match in re.finditer(r'<section[^>]*id="([^"]+)"[^>]*>', html_completo):
        ident = match.group(1)
        inicio = match.start()
        # el cierre de la sección: se busca el </section> que le corresponde
        profundidad, i = 1, match.end()
        while profundidad and i < len(html_completo):
            siguiente_a = html_completo.find("<section", i)
            siguiente_c = html_completo.find("</section>", i)
            if siguiente_c == -1:
                break
            if siguiente_a != -1 and siguiente_a < siguiente_c:
                profundidad += 1
                i = siguiente_a + 8
            else:
                profundidad -= 1
                i = siguiente_c + 10
        yield ident, html_completo[inicio:i]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--id", help="una sola sección")
    ap.add_argument("--detalle", action="store_true", help="frases más largas")
    args = ap.parse_args()

    html_completo = INDEX.read_text(encoding="utf-8")
    filas = []
    for ident, bloque in secciones(html_completo):
        if args.id and ident != args.id:
            continue
        m = huerta(texto_de(bloque))
        if m:
            filas.append((ident, m))

    if not filas:
        print("No encontré secciones.", file=sys.stderr)
        return 1

    filas.sort(key=lambda f: f[1]["huerta"])
    print(f"{'sección':<26}{'Huerta':>7}  {'nivel':<16}{'palabras':>9}{'pal/oración':>12}{'síl/palabra':>12}")
    print("-" * 84)
    for ident, m in filas:
        print(f"{ident:<26}{m['huerta']:>7.1f}  {m['nivel']:<16}{m['palabras']:>9}{m['palabras_por_oracion']:>12}{m['silabas_por_palabra']:>12}")

    if args.detalle:
        print()
        for ident, m in filas[:3]:
            print(f"— {ident}: palabras más largas {', '.join(m['mas_largas'])}")
            for frase in m["frases_largas"]:
                print(f"    ({len(frase.split())} palabras) {frase[:110]}…")
    return 0


if __name__ == "__main__":
    sys.exit(main())
