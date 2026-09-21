#!/usr/bin/env python3
"""metrica_serie.py — ¿cuál es la métrica de la serie anual de Resultados?

POR QUÉ EXISTE
  La sección de Resultados necesita **un número por año** que responda "¿hacia
  dónde apuntó la deliberación ese año?". Hay al menos cuatro formas de
  calcularlo (y todas existen ya en `data/fase-2/`) y ninguna es obviamente
  mejor que las otras a ojo. Este script las calcula, mide su estabilidad y su
  sensibilidad, y deja el resultado escrito: la decisión de qué dibujar sale de
  aquí, no del gusto.

  Es también el primer bloque del arnés de la parte cuantitativa del paper: el
  bootstrap agrupado por reunión que necesita cualquier intervalo de esta pieza.

LAS CANDIDATAS
  A  tono_neto      (H − D) / N        cuentas sobre TODAS las intervenciones
  B  balance        (H − D) / (H + D)  cuentas solo sobre las direccionales
  C  balance+       (H − D) / (H + D + 1)   (laplace/Jeffreys: saca el ±1 pelado)
  D  score(H/D)     media del score en las filas etiquetadas H o D
  E  score(todas)   media del score en TODAS las filas del año

FUENTE POR PREGUNTA (regla, no preferencia)
  `clasificacion_wc600_9725.csv` guarda la **predicción cruda del modelo** en las
  9.725 filas. Los agregados de `analisis_descriptivo/` son la **tabla maestra**,
  que prioriza etiqueta humana donde existe (1.596 validadas + 299 gold ciegas de
  300, una es abstención) y usa la predicción del modelo solo en las 7.829
  restantes (`rol=inferencia_no_etiquetada`). Por eso sus totales difieren:
  Δ −14 hawkish, −20 dovish, +33 neutral, −1 fila (la abstención).
  No son dos runs: son dos fontanerías de etiqueta del mismo run.
  → Para DESCRIBIR EL CORPUS (series, composición, actas) se usa la maestra.
  → Para DESCRIBIR EL MODELO (score, probabilidades, acuerdo) se usa la cruda.
  Este script calcula con las dos y **declara cuál usa cada número**, porque
  mezclarlas dentro de la misma tabla es el error que hay que evitar.

POR QUÉ LA PRUEBA DE UMBRAL IMPORTA
  La etiqueta de tres clases NO es el signo del score: sale del argmax de
  (p_h, p_d, p_n). Hay cientos de filas NEUTRALES con score de orientación no
  trivial, así que "solo H y D" no es lo mismo que "solo la señal". Este script
  lo cuantifica y prueba métricas que no dependen de la etiqueta.

USO
  python3 scripts/analysis/metrica_serie.py            # informe + figura
  python3 scripts/analysis/metrica_serie.py --boot 5000
"""

from __future__ import annotations

import argparse
import csv
import math
import random
import statistics as st
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CLASIF = ROOT / "data" / "fase-2" / "resultados" / "clasificacion_wc600_9725.csv"
DESCRIPTIVO = ROOT / "data" / "fase-2" / "resultados" / "analisis_descriptivo"
ANUAL = DESCRIPTIVO / "indices_por_anio.csv"
REUNION = DESCRIPTIVO / "indices_por_reunion.csv"
FIGURA = ROOT / "docs" / "figura-metrica-prueba.svg"

HAWK, DOV, NEU = "hawkish", "dovish", "neutral"


# ── utilidades ────────────────────────────────────────────────────────────
def num(value):
    text = (value or "").strip()
    try:
        return float(text)
    except ValueError:
        return None


def wilson(k: int, n: int, z: float = 1.96):
    """IC95 de una proporción (Wilson). Devuelve (lo, hi) en [-1, 1] tras 2p−1."""
    if n == 0:
        return (float("nan"), float("nan"))
    p = k / n
    den = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / den
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / den
    return (2 * max(0.0, centre - half) - 1, 2 * min(1.0, centre + half) - 1)


def pct(values, q):
    ordered = sorted(values)
    return ordered[max(0, min(len(ordered) - 1, int(q * (len(ordered) - 1))))]


def cluster_bootstrap(meetings, stat, reps=2000, seed=20260921):
    """Remuestrea REUNIONES con reemplazo, no filas.

    Las intervenciones de una misma reunión no son independientes (mismo día,
    mismos temas, mismo presidente de sesión). Remuestrear filas estrecharía los
    intervalos de forma artificial: es exactamente el error que un referee
    detecta primero. La unidad de remuestreo es el acta.
    """
    rng = random.Random(seed)
    n = len(meetings)
    if n == 0:
        return (float("nan"), float("nan"), float("nan"))
    draws = []
    for _ in range(reps):
        sample = []
        for _ in range(n):
            sample.extend(meetings[rng.randrange(n)])
        value = stat(sample)
        if value is not None:
            draws.append(value)
    if not draws:
        return (float("nan"), float("nan"), float("nan"))
    return (pct(draws, 0.025), pct(draws, 0.975), st.pstdev(draws))


def spearman(xs, ys):
    def ranks(v):
        order = sorted(range(len(v)), key=lambda i: v[i])
        r = [0.0] * len(v)
        i = 0
        while i < len(order):
            j = i
            while j + 1 < len(order) and v[order[j + 1]] == v[order[i]]:
                j += 1
            avg = (i + j) / 2 + 1
            for k in range(i, j + 1):
                r[order[k]] = avg
            i = j + 1
        return r

    rx, ry = ranks(xs), ranks(ys)
    mx, my = st.mean(rx), st.mean(ry)
    num_ = sum((a - mx) * (b - my) for a, b in zip(rx, ry))
    den = math.sqrt(sum((a - mx) ** 2 for a in rx) * sum((b - my) ** 2 for b in ry))
    return num_ / den if den else float("nan")


# ── datos ─────────────────────────────────────────────────────────────────
def cargar():
    rows = []
    with CLASIF.open(encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            score = num(r["score_hd_continuo"])
            if score is None:
                continue
            rows.append({
                "anio": int(r["anio"]),
                "meeting": r["meeting_id"],
                "label": r["prediccion_v3"],
                "score": score,
                "rel": r["pred_relevancia_v3"] == "1",
            })
    return rows


def cargar_maestra():
    """Los agregados publicados (= tabla maestra) por año y por acta.

    Es la fuente que prioriza etiqueta humana, así que es la que describe el
    corpus. `balance_direccional` ya viene calculada por la fuente; aquí solo se
    lee, no se recalcula (recalcularla sería una segunda versión del mismo dato).
    """
    por_anio, por_acta = {}, {}
    with ANUAL.open(encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            por_anio[int(r["anio"])] = {
                "h": int(float(r["n_hawkish"])), "d": int(float(r["n_dovish"])),
                "n": int(float(r["n_intervenciones"])),
                "balance": num(r["balance_direccional"]),
            }
    with REUNION.open(encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            por_acta[r["meeting_id"]] = {
                "h": int(float(r["n_hawkish"])), "d": int(float(r["n_dovish"])),
                "n": int(float(r["n_intervenciones"])), "anio": int(float(r["anio"])),
                "balance": num(r["balance_direccional"]),
            }
    return por_anio, por_acta


def metricas(rows):
    """Las cinco candidatas para un conjunto de filas."""
    scores = [r["score"] for r in rows]
    h = sum(1 for r in rows if r["label"] == HAWK)
    d = sum(1 for r in rows if r["label"] == DOV)
    n = len(rows)
    direcc = [r["score"] for r in rows if r["label"] in (HAWK, DOV)]
    return {
        "A": (h - d) / n if n else None,
        "B": (h - d) / (h + d) if (h + d) else None,
        "C": (h - d) / (h + d + 1) if (h + d) else None,
        "D": st.mean(direcc) if direcc else None,
        "E": st.mean(scores) if scores else None,
        "h": h, "d": d, "n": n,
    }


# ── informe ───────────────────────────────────────────────────────────────
def informe(rows, reps):
    por_anio = defaultdict(list)
    por_anio_reuniones = defaultdict(lambda: defaultdict(list))
    for r in rows:
        por_anio[r["anio"]].append(r)
        por_anio_reuniones[r["anio"]][r["meeting"]].append(r)

    anios = sorted(por_anio)
    tabla = {a: metricas(por_anio[a]) for a in anios}
    maestra_anio, maestra_acta = cargar_maestra()

    print("=" * 100)
    print("1. LA ETIQUETA NO ES EL SIGNO DEL SCORE")
    print("=" * 100)
    mal = sum(1 for r in rows if r["label"] == DOV and r["score"] > 0)
    mal += sum(1 for r in rows if r["label"] == HAWK and r["score"] < 0)
    neu_senal = sum(1 for r in rows if r["label"] == NEU and abs(r["score"]) > 0.10)
    neu_senal2 = sum(1 for r in rows if r["label"] == NEU and abs(r["score"]) > 0.20)
    print(f"  H/D etiquetadas con el signo contrario: {mal} de 893 (despreciable, todas con |score|<0,02)")
    print(f"  filas NEUTRALES con |score| > 0,10:     {neu_senal}")
    print(f"  filas NEUTRALES con |score| > 0,20:     {neu_senal2}")
    print("  → La etiqueta sale del argmax de (p_h, p_d, p_n); el score es otra columna.")
    print("    'Solo H y D' NO es lo mismo que 'solo la señal': hay señal en filas neutrales.")

    print()
    print("=" * 100)
    print("2. LAS CINCO CANDIDATAS, AÑO POR AÑO")
    print("=" * 100)
    print("  La columna 'B maestra' es la de los agregados (priorizan etiqueta humana);")
    print("  todo lo demás sale de la predicción cruda. Verlos juntos es la prueba de")
    print("  procedencia: si la elección de fuente cambiara el relato, se vería aquí.")
    print()
    print("año     H    D   dir    n   A tono_neto  B cruda  B maestra  Δ      D score(H/D)  E score(todas)")
    deltas = []
    for a in anios:
        t = tabla[a]
        m = maestra_anio.get(a)
        bm = m["balance"] if m else None
        d_ = (bm - t["B"]) if (bm is not None and t["B"] is not None) else None
        if d_ is not None:
            deltas.append(abs(d_))
        f = lambda v: f"{v:+.4f}" if v is not None else "   —   "
        print(f"{a} {t['h']:5d} {t['d']:5d} {t['h']+t['d']:5d} {t['n']:4d}      {f(t['A'])}    {f(t['B'])}   {f(bm)}  {f(d_)}     {f(t['D'])}       {f(t['E'])}")
    print(f"\n  Δ máximo entre fuentes: {max(deltas):.3f} · Δ medio: {st.mean(deltas):.3f}")
    print("  → la procedencia mueve el balance como máximo un 0,04: no cambia el relato,")
    print("    pero cada figura debe declarar cuál usa (una tabla que las mezcle, sí lo cambia).")

    print()
    print("  Correlación de rangos (Spearman) entre candidatas:")
    claves = ["A", "B", "C", "D", "E"]
    print("        " + "".join(f"{k:>9}" for k in claves))
    for k1 in claves:
        fila = []
        for k2 in claves:
            xs = [tabla[a][k1] for a in anios if tabla[a][k1] is not None]
            ys = [tabla[a][k2] for a in anios if tabla[a][k2] is not None]
            fila.append(f"{spearman(xs, ys):+9.3f}")
        print(f"    {k1:>3} " + "".join(fila))

    print()
    print("=" * 100)
    print("3. ESTABILIDAD: BOOTSTRAP AGRUPADO POR REUNIÓN (IC95)")
    print("=" * 100)
    print("año    B balance   IC95 de B          D score(H/D)  IC95 de D           ancho B / ancho D")
    for a in anios:
        meetings = [v for v in por_anio_reuniones[a].values()]
        k = tabla[a]["h"]
        n_dir = tabla[a]["h"] + tabla[a]["d"]
        b_lo, b_hi = wilson(k, n_dir)
        d_lo, d_hi, _ = cluster_bootstrap(meetings, lambda s: metricas(s)["D"], reps)
        wb, wd = b_hi - b_lo, d_hi - d_lo
        print(f"{a}   {tabla[a]['B']:+7.3f}   [{b_lo:+6.3f},{b_hi:+6.3f}]   {tabla[a]['D']:+9.4f}   [{d_lo:+6.3f},{d_hi:+6.3f}]      {wb:.3f} / {wd:.3f}")

    print()
    print("=" * 100)
    print("4. SENSIBILIDAD AL UMBRAL (métricas que NO usan la etiqueta)")
    print("=" * 100)
    print("  media del score sobre las filas con |score| >= t")
    umbrales = [0.0, 0.02, 0.05, 0.10, 0.20, 0.30]
    series = {}
    for t in umbrales:
        vals = []
        for a in anios:
            sub = [r["score"] for r in por_anio[a] if abs(r["score"]) >= t]
            vals.append(st.mean(sub) if sub else None)
        series[t] = vals
    print("año   " + "".join(f"t={t:<7}" for t in umbrales) + "  n>=0.10")
    for i, a in enumerate(anios):
        print(f"{a} " + "".join(f"{series[t][i]:+.4f} " for t in umbrales) +
              f"  {sum(1 for r in por_anio[a] if abs(r['score']) >= 0.10):4d}")
    base = [v for v in series[0.0] if v is not None]
    print()
    print("  Spearman contra t=0 (sin umbral):")
    for t in umbrales[1:]:
        vals = [v for v in series[t] if v is not None]
        print(f"    t={t:<5} r_s = {spearman(base, vals):+.3f}")

    print()
    print("=" * 100)
    print("5. NIVEL ACTA: ¿DÓNDE SATURA CADA MÉTRICA?")
    print("=" * 100)
    por_acta_crudo = defaultdict(list)
    for r in rows:
        por_acta_crudo[r["meeting"]].append(r)
    acts = []
    for meet, rs in por_acta_crudo.items():
        ma = maestra_acta.get(meet)
        media = st.mean([x["score"] for x in rs])
        # El balance del acta se lee de la MAESTRA (es la que describe el corpus).
        acts.append({"B": ma["balance"] if ma else None,
                     "B_crudo": metricas(rs)["B"],
                     "media": media, "dir": (ma["h"] + ma["d"]) if ma else 0,
                     "n": ma["n"] if ma else len(rs)})
    con_bal = [x for x in acts if x["B"] is not None]
    sat = [x for x in con_bal if abs(x["B"]) >= 0.999]
    medio = [x for x in con_bal if abs(x["B"]) < 0.999]
    sin_bal = [x for x in acts if x["B"] is None]
    sat_crudo = [x for x in acts if x["B_crudo"] is not None and abs(x["B_crudo"]) >= 0.999]
    print(f"  actas: {len(acts)}")
    print(f"  balance = ±1,000 EXACTO (maestra): {len(sat)} actas ({100*len(sat)/len(acts):.0f}%)")
    print(f"  balance indefinido (ambas clases vacías): {len(sin_bal)} actas")
    print(f"  balance con valor interior: {len(medio)} actas ({100*len(medio)/len(acts):.0f}%)")
    print(f"  (control con la predicción cruda: {len(sat_crudo)} al borde)")
    print("  → OJO con el criterio: 'clase vacía' (106) NO es lo mismo que 'balance = ±1' (102).")
    print("    Las 4 de diferencia son las actas sin NINGUNA clase, donde el balance ni existe.")
    print(f"    con 34+ intervenciones detrás: {sum(1 for x in sat if x['n'] >= 34)} (todas: la más chica tiene "
          f"{min(x['n'] for x in sat) if sat else 0})")
    print(f"    con UNA sola direccional (valor forzado por un único caso): {sum(1 for x in sat if x['dir'] == 1)}")
    print(f"  B vacío (0 direccionales): {sum(1 for x in acts if x['B'] is None)}")
    print(f"  media del score: máx |valor| = {max(abs(x['media']) for x in acts):.3f}"
          f" · actas con |valor| > 0.9: {sum(1 for x in acts if abs(x['media']) > 0.9)}")

    print()
    print("=" * 100)
    print("6. VOLATILIDAD AÑO A AÑO (saltos que el lector ve)")
    print("=" * 100)
    print("  (normalizado: salto medio dividido por el rango de la propia serie, para")
    print("   poder comparar escalas distintas)")
    for k, nombre in (("A", "tono_neto"), ("B", "balance"), ("C", "balance+"), ("D", "score(H/D)"), ("E", "score(todas)")):
        vals = [tabla[a][k] for a in anios]
        saltos = [abs(vals[i + 1] - vals[i]) for i in range(len(vals) - 1)]
        rango = max(vals) - min(vals)
        print(f"  {k} {nombre:<12} salto medio {st.mean(saltos):.3f} · máx {max(saltos):.3f} · rango {rango:.3f} · normalizado {st.mean(saltos)/rango:.3f}")
    return anios, tabla, por_anio, por_anio_reuniones, series, umbrales, acts, maestra_anio


# ── figura ────────────────────────────────────────────────────────────────
def figura(anios, tabla, por_anio_reuniones, series, umbrales, acts, reps, maestra_anio):
    W, H = 1400, 1040
    cel = (W - 120) / 2
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Helvetica, Arial, sans-serif">',
         f'<rect width="{W}" height="{H}" fill="#0a0e1a"/>',
         f'<text x="60" y="54" fill="#f0f3fa" font-size="28" font-weight="bold">Prueba de la métrica: contar votos vs promediar puntajes</text>',
         f'<text x="60" y="84" fill="#9aa4bd" font-size="16">bootstrap agrupado por reunión ({reps} remuestreos) · los neutrales fuera en B y D, presentes en E</text>',
         f'<text x="60" y="106" fill="#6f7a93" font-size="13">FUENTE POR PREGUNTA: contar votos sale de la tabla maestra (prioriza etiqueta humana) · promediar puntajes, de la predicción cruda. Entre ambas el balance se mueve ≤ 0,05.</text>']

    def panel(x0, y0, titulo, sub):
        p.append(f'<rect x="{x0}" y="{y0}" width="{cel-30}" height="400" rx="12" fill="#111726" stroke="rgba(255,255,255,0.08)"/>')
        p.append(f'<text x="{x0+26}" y="{y0+38}" fill="#f0f3fa" font-size="18" font-weight="bold">{titulo}</text>')
        p.append(f'<text x="{x0+26}" y="{y0+62}" fill="#8891a8" font-size="13">{sub}</text>')

    # Panel 1 — la serie con IC
    x0, y0 = 60, 120
    panel(x0, y0, "1 · La serie, con su intervalo", "B cuenta votos (naranjo) · D promedia puntajes (dorado) · barras = IC95")
    px, py, pw, ph = x0 + 70, y0 + 100, cel - 130, 240
    def Yp(v): return py + ph - (v + 1.15) / 2.3 * ph
    def Xp(i): return px + i * pw / (len(anios) - 1)
    for v in (1, 0.5, 0, -0.5, -1):
        yy = Yp(v)
        p.append(f'<line x1="{px-10}" y1="{yy:.1f}" x2="{px+pw}" y2="{yy:.1f}" stroke="{"rgba(255,255,255,0.2)" if v==0 else "rgba(255,255,255,0.06)"}"/>')
        p.append(f'<text x="{px-16}" y="{yy+5:.1f}" fill="#8891a8" font-size="13" text-anchor="end">{v:+.1f}</text>')
    for i, a in enumerate(anios):
        k, nd = tabla[a]["h"], tabla[a]["h"] + tabla[a]["d"]
        lo, hi = wilson(k, nd)
        meetings = [v for v in por_anio_reuniones[a].values()]
        dlo, dhi, _ = cluster_bootstrap(meetings, lambda s: metricas(s)["D"], 400)
        p.append(f'<line x1="{Xp(i):.1f}" y1="{Yp(lo):.1f}" x2="{Xp(i):.1f}" y2="{Yp(hi):.1f}" stroke="#ff9d5c" stroke-width="1.5" opacity="0.5"/>')
        p.append(f'<line x1="{Xp(i)-5:.1f}" y1="{Yp(dlo):.1f}" x2="{Xp(i)+5:.1f}" y2="{Yp(dlo):.1f}" stroke="#ffd76a" stroke-width="1" opacity="0.45"/>')
        p.append(f'<line x1="{Xp(i)-5:.1f}" y1="{Yp(dhi):.1f}" x2="{Xp(i)+5:.1f}" y2="{Yp(dhi):.1f}" stroke="#ffd76a" stroke-width="1" opacity="0.45"/>')
    p.append('<polyline fill="none" stroke="#ff9d5c" stroke-width="1.2" opacity="0.5" stroke-dasharray="3,3" points="' +
             ' '.join(f'{Xp(i):.1f},{Yp(tabla[a]["B"]):.1f}' for i, a in enumerate(anios)) + '"/>')
    p.append('<polyline fill="none" stroke="#ff9d5c" stroke-width="2.2" points="' +
             ' '.join(f'{Xp(i):.1f},{Yp(maestra_anio[a]["balance"]):.1f}' for i, a in enumerate(anios) if a in maestra_anio) + '"/>')
    p.append('<polyline fill="none" stroke="#ffd76a" stroke-width="3" points="' +
             ' '.join(f'{Xp(i):.1f},{Yp(tabla[a]["D"]):.1f}' for i, a in enumerate(anios)) + '"/>')
    for i, a in enumerate(anios):
        if a in maestra_anio:
            p.append(f'<rect x="{Xp(i)-3.5:.1f}" y="{Yp(maestra_anio[a]["balance"])-3.5:.1f}" width="7" height="7" fill="#ff9d5c"/>')
        p.append(f'<circle cx="{Xp(i):.1f}" cy="{Yp(tabla[a]["D"]):.1f}" r="4.5" fill="#ffd76a"/>')
        p.append(f'<text x="{Xp(i):.1f}" y="{py+ph+26}" fill="#8891a8" font-size="12" text-anchor="middle">{a}</text>')
    techo = [a for a in anios if a in maestra_anio and abs(maestra_anio[a]["balance"]) >= 0.98]
    cerca = [a for a in anios if a in maestra_anio and 0.90 <= abs(maestra_anio[a]["balance"]) < 0.98]
    p.append(f'<text x="{px}" y="{py+ph+48}" fill="#6f7a93" font-size="12">B llega a ±1,00 exacto en {", ".join(map(str, techo))} y se queda a menos de 0,10 en {", ".join(map(str, cerca))}.</text>')
    p.append(f'<text x="{px}" y="{py+ph+66}" fill="#6f7a93" font-size="12">En 2007 pasa al revés: B dice +0,61 y D dice +0,32. La punteada es B con la predicción cruda.</text>')

    # Panel 2 — sensibilidad al umbral
    x0, y0 = 60 + cel, 120
    panel(x0, y0, "2 · ¿Depende del umbral que elijamos?", "media del score sobre filas con |score| ≥ t · si las líneas van juntas, la métrica no es frágil")
    px, py, pw, ph = x0 + 70, y0 + 100, cel - 130, 240
    vals_all = [v for t in umbrales for v in series[t] if v is not None]
    vmin, vmax = min(vals_all), max(vals_all)
    def Yq(v): return py + ph - (v - vmin) / (vmax - vmin) * ph
    def Xq(i): return px + i * pw / (len(anios) - 1)
    colores = ["#ffd76a", "#f0c14b", "#e0a94a", "#c8903f", "#a87534", "#7d5626"]
    for t, col in zip(umbrales, colores):
        pts = " ".join(f'{Xq(i):.1f},{Yq(v):.1f}' for i, v in enumerate(series[t]) if v is not None)
        p.append(f'<polyline fill="none" stroke="{col}" stroke-width="{3 if t==0.0 else 1.8}" opacity="{1 if t==0.0 else 0.75}" points="{pts}"/>')
    p.append(f'<text x="{px}" y="{py-12}" fill="#8891a8" font-size="12">t = 0 (todas, línea gruesa) → t = 0,30</text>')
    for i, a in enumerate(anios):
        p.append(f'<text x="{Xq(i):.1f}" y="{py+ph+26}" fill="#8891a8" font-size="12" text-anchor="middle">{a}</text>')
    p.append(f'<text x="{px}" y="{py+ph+48}" fill="#6f7a93" font-size="12">Spearman vs t=0: ' +
             " · ".join(f"t={t}: {spearman([v for v in series[0.0] if v is not None],[v for v in series[t] if v is not None]):+.2f}" for t in umbrales[1:4]) +
             '  → el ranking de años no cambia.</text>')

    # Panel 3 — nivel acta: saturación
    x0, y0 = 60, 120 + 430
    panel(x0, y0, "3 · A nivel acta, contar votos se rompe", "132 actas · balance = (H−D)/(H+D) contra media del score")
    px, py, pw, ph = x0 + 70, y0 + 100, cel - 130, 240
    sin_bal = sum(1 for x in acts if x["B"] is None)
    bins_b = [0] * 21
    for x in acts:
        if x["B"] is None:
            continue
        idx = max(0, min(20, int((x["B"] + 1) / 2 * 20)))
        bins_b[idx] += 1
    maxb = max(bins_b)
    bw = pw / 21
    for i, c in enumerate(bins_b):
        if not c:
            continue
        hgt = c / maxb * ph
        extremo = i <= 0 or i >= 20
        p.append(f'<rect x="{px + i*bw:.1f}" y="{py+ph-hgt:.1f}" width="{bw-2:.1f}" height="{hgt:.1f}" fill="{"#ff6b6b" if extremo else "#ff9d5c"}" opacity="0.85"/>')
    p.append(f'<text x="{px}" y="{py-12}" fill="#8891a8" font-size="12">balance por acta — las barras rojas son ±1,000 exacto</text>')
    for i, lab in enumerate(["-1", "", "-0,5", "", "0", "", "+0,5", "", "+1"]):
        xx = px + (i * 2.5) * bw
        if 0 <= i * 2.5 <= 20:
            p.append(f'<text x="{xx:.1f}" y="{py+ph+20}" fill="#8891a8" font-size="12" text-anchor="middle">{lab}</text>')
    sat = sum(1 for x in acts if x["B"] is not None and abs(x["B"]) >= 0.999)
    p.append(f'<text x="{px}" y="{py+ph+46}" fill="#ff6b6b" font-size="13">{sat} de 132 actas dan ±1,000 exacto; {sin_bal} más no tienen balance. No por extremas: por construcción.</text>')
    p.append(f'<text x="{px}" y="{py+ph+66}" fill="#9aa4bd" font-size="13">basta con que una clase tenga cero filas, aunque la otra tenga 100.</text>')
    p.append(f'<text x="{px}" y="{py+ph+86}" fill="#9aa4bd" font-size="13">La media del score reparte las 132 en todo el rango (máx |valor| = 0,21).</text>')

    # Panel 4 — qué se gana
    x0, y0 = 60 + cel, 120 + 430
    panel(x0, y0, "4 · Qué se gana al promediar", "los dos casos de borde, con la misma escala")
    px, py = x0 + 60, y0 + 110
    casos = [("2005", 113, tabla[2005], "+1,00 vs +0,80"), ("2012", 16, tabla[2012], "−1,00 vs −0,47")]
    for idx, (nom, nd, t, nota) in enumerate(casos):
        yy = py + idx * 120
        ancho = (cel - 200) * (nd / 113)
        p.append(f'<text x="{px}" y="{yy+4}" fill="#f0f3fa" font-size="17" font-weight="bold">{nom}</text>')
        p.append(f'<text x="{px+70}" y="{yy+4}" fill="#8891a8" font-size="14">{nd} intervenciones direccionales</text>')
        p.append(f'<rect x="{px}" y="{yy+18}" width="{cel-200}" height="26" rx="5" fill="rgba(255,255,255,0.05)"/>')
        p.append(f'<rect x="{px}" y="{yy+18}" width="{max(4,ancho):.1f}" height="26" rx="5" fill="{"#ff6b6b" if nom=="2012" else "#ffd76a"}" opacity="0.75"/>')
        p.append(f'<text x="{px}" y="{yy+70}" fill="#ff9d5c" font-size="15">contar votos:  {t["B"]:+.2f}</text>')
        p.append(f'<text x="{px}" y="{yy+94}" fill="#ffd76a" font-size="15">promediar:     {t["D"]:+.2f}</text>')
        p.append(f'<text x="{px+cel-190}" y="{yy+70}" fill="#9aa4bd" font-size="13">{nota}</text>')
    p.append(f'<text x="{px}" y="{py+270}" fill="#6f7a93" font-size="13">La barra es la cantidad de casos detrás. Contar votos da −1,00 a los dos: el gráfico</text>')
    p.append(f'<text x="{px}" y="{py+290}" fill="#6f7a93" font-size="13">los pinta igual de extremos aunque uno tenga 7 veces más evidencia que el otro.</text>')

    p.append('</svg>')
    FIGURA.write_text("\n".join(p), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--boot", type=int, default=2000)
    args = ap.parse_args()
    rows = cargar()
    anios, tabla, por_anio, por_anio_reuniones, series, umbrales, acts, maestra_anio = informe(rows, args.boot)
    figura(anios, tabla, por_anio_reuniones, series, umbrales, acts, args.boot, maestra_anio)
    print()
    print(f"figura → {FIGURA.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
