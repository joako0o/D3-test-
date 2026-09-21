#!/usr/bin/env python3
"""build-resultados.py — la capa de datos de las tres secciones de Resultados.

POR QUÉ EXISTE
  `build-web-data.py` emite el tamaño del corpus (`resumen.json`): lo que la
  pieza necesita para no mentir en sus propias cifras. Este emite otra cosa: los
  **agregados analíticos** que dibujan las tres secciones de Resultados.

  Y emite una cosa más, que hasta hoy no estaba en ningún sitio: **el cruce entre
  el tono de la deliberación y la decisión de tasa**. `acuerdo_consejo_por_reunion.csv`
  (de la fuente, en `data/fase-2/fuente/`) trae, por reunión, si el Consejo subió,
  mantuvo o bajó la tasa, con su magnitud en puntos base y la TPM resultante. Ese
  cruce es la validación externa que le faltaba al índice textual, y se calcula
  aquí, con su intervalo y con la prueba de circularidad que corresponde.

LA PRUEBA DE CIRCULARIDAD (y por qué está en el script)
  El acta **contiene la frase de la decisión** ("se acuerda aumentar la tasa de
  interés de política monetaria a 2,5% anual"). Si el modelo la detecta y el tono
  de la reunión la refleja, la correlación tono↔decisión sería tautológica y no
  probaría nada sobre la deliberación. Así que el script mide tres cosas:

    1. el cruce con la frase del acuerdo incluida;
    2. el mismo cruce EXCLUYENDO la intervención del acuerdo;
    3. cuánta señal direccional vive en esas 132 intervenciones.

  Si (1) y (2) coinciden, el hallazgo no es un artefacto de leer la decisión.

QUÉ NO HACE
  · No publica texto de las actas: solo agregados y conteos.
  · No recalcula lo que la fuente ya calculó (balance, tono_neto, cobertura):
    los lee y declara de dónde vienen.

USO
  python3 scripts/build-resultados.py            # regenera data/web/resultados.json
  python3 scripts/build-resultados.py --check    # sale con 1 si quedó viejo
"""

from __future__ import annotations

import argparse
import csv
import glob
import hashlib
import json
import math
import random
import statistics as st
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FASE2 = ROOT / "data" / "fase-2"
FUENTE = FASE2 / "fuente"
DESCRIPTIVO = FASE2 / "resultados" / "analisis_descriptivo"
OUT = ROOT / "data" / "web" / "resultados.json"

CLASIFICACION = FASE2 / "resultados" / "clasificacion_wc600_9725.csv"
INDICES_ANIO = DESCRIPTIVO / "indices_por_anio.csv"
INDICES_REUNION = DESCRIPTIVO / "indices_por_reunion.csv"
TOPICOS = DESCRIPTIVO / "evolucion_topicos_modelo_anual.csv"
DECISIONES = FUENTE / "resultados" / "analisis_descriptivo" / "acuerdo_consejo_por_reunion.csv"
QUOTES = ROOT / "js" / "data" / "quotes.js"
PINS = FUENTE / "PINS.json"

SEED = 20260921
BOOTSTRAP = 4000


# ── utilidades ────────────────────────────────────────────────────────────
def num(value):
    text = (value or "").strip()
    try:
        return float(text)
    except ValueError:
        return None


def load_csv(path: Path) -> list[dict]:
    with path.open(encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def load_quotes() -> list[dict]:
    """`js/data/quotes.js` es un <script> clásico (window.QUOTES = […]), no JSON."""
    raw = QUOTES.read_text(encoding="utf-8")
    return json.loads("[" + raw.split("[", 1)[1].rsplit("]", 1)[0] + "]")


def wilson(k: int, n: int, z: float = 1.96):
    """IC95 de una proporción, devuelto en la escala de (H−D)/(H+D) = 2p−1."""
    if n == 0:
        return None
    p = k / n
    den = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / den
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / den
    return [round(2 * max(0.0, centre - half) - 1, 4), round(2 * min(1.0, centre + half) - 1, 4)]


def boot_diff(a: list[float], b: list[float], reps: int = BOOTSTRAP):
    """IC95 de la diferencia de medias, remuestreando reuniones (ya son la unidad)."""
    if not a or not b:
        return None
    rng = random.Random(SEED)
    draws = []
    for _ in range(reps):
        ra = st.mean([a[rng.randrange(len(a))] for _ in a])
        rb = st.mean([b[rng.randrange(len(b))] for _ in b])
        draws.append(ra - rb)
    draws.sort()
    return [
        round(draws[int(0.025 * reps)], 4),
        round(draws[int(0.975 * reps)], 4),
        round(sum(1 for d in draws if d > 0) / reps, 3),
    ]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


# ── construcción ──────────────────────────────────────────────────────────
def build() -> dict:
    clasificacion = load_csv(CLASIFICACION)
    anual_src = load_csv(INDICES_ANIO)
    reunion_src = load_csv(INDICES_REUNION)
    topicos_src = load_csv(TOPICOS)
    decisiones = {row["meeting_id"]: row for row in load_csv(DECISIONES)}
    quotes = load_quotes()

    # El commit de la fuente (de PINS.json, ver scripts/import-fase2.py). Sin
    # pines —todavía no se importó— se omite: mejor null que inventar procedencia.
    commit = None
    try:
        commit = json.loads(PINS.read_text(encoding="utf-8")).get("commit")
    except (OSError, ValueError):
        pass

    # ── 1. score por reunión, desde la predicción cruda (para el cruce) ──
    scores_reunion = defaultdict(list)
    for row in clasificacion:
        value = num(row["score_hd_continuo"])
        if value is not None:
            scores_reunion[row["meeting_id"]].append((row["intervencion_id"], value))

    # ── 2. anual ──────────────────────────────────────────────────────────
    relevancia = defaultdict(lambda: [0, 0])
    for row in clasificacion:
        bucket = relevancia[row["anio"]]
        bucket[0] += 1
        bucket[1] += row["pred_relevancia_v3"] == "1"

    anual = []
    for row in anual_src:
        anio = int(float(row["anio"]))
        h, d = int(float(row["n_hawkish"])), int(float(row["n_dovish"]))
        n_rel, relevantes = relevancia[str(anio)]
        anual.append({
            "anio": anio,
            "n": int(float(row["n_intervenciones"])),
            "h": h, "d": d, "neu": int(float(row["n_neutral"])),
            "direccionales": h + d,
            # Dos métricas, cada una con su fuente declarada:
            #   balance  → contar votos (alta varianza cuando una clase es 0)
            #   score    → promediar la intensidad de las filas H/D
            "balance": num(row["balance_direccional"]),
            "balance_ic": wilson(h, h + d),
            "score_hd": num(row["score_hd_continuo_medio"]),
            "cobertura": num(row["cobertura_direccional"]),
            "relevancia_pct": round(100 * relevantes / n_rel, 1) if n_rel else None,
        })

    # ── 3. actas ──────────────────────────────────────────────────────────
    actas = []
    for row in reunion_src:
        mid = row["meeting_id"]
        h, d = int(float(row["n_hawkish"])), int(float(row["n_dovish"]))
        decision = decisiones.get(mid, {})
        actas.append({
            "id": mid,
            "fecha": row["fecha"],
            "anio": int(float(row["anio"])),
            "mes": int(row["fecha"][5:7]),
            "n": int(float(row["n_intervenciones"])),
            "h": h, "d": d, "neu": int(float(row["n_neutral"])),
            "balance": num(row["balance_direccional"]),
            "cobertura": num(row["cobertura_direccional"]),
            "score_hd": num(row["score_hd_continuo_medio"]) if num(row["score_hd_continuo_medio"]) is not None else None,
            "decision": {
                "accion": decision.get("acuerdo_accion") or None,
                "magnitud_pb": num(decision.get("acuerdo_magnitud_pb")),
                "tpm": num(decision.get("acuerdo_tpm_objetivo")),
            } if decision else None,
        })
    actas.sort(key=lambda a: a["fecha"])

    # ── 4. el cruce tono ↔ decisión, y su prueba de circularidad ──────────
    acuerdo_ids = {row["acuerdo_intervencion_id"] for row in decisiones.values()}
    con_acuerdo, sin_acuerdo = defaultdict(list), defaultdict(list)
    for mid, filas in scores_reunion.items():
        accion = decisiones.get(mid, {}).get("acuerdo_accion")
        if not accion:
            continue
        con_acuerdo[accion].append(st.mean([s for _, s in filas]))
        resto = [s for i, s in filas if i not in acuerdo_ids]
        if resto:
            sin_acuerdo[accion].append(st.mean(resto))

    def bloque(datos):
        salida = []
        for accion in ("subir", "mantener", "bajar"):
            vals = datos.get(accion, [])
            if not vals:
                continue
            esperado = 1 if accion == "subir" else (-1 if accion == "bajar" else 0)
            if esperado:
                aciertos = sum(1 for v in vals if (v > 0) == (esperado > 0))
            else:
                aciertos = sum(1 for v in vals if v < 0)
            salida.append({
                "accion": accion,
                "n": len(vals),
                "tono": round(st.mean(vals), 4),
                "tono_mediana": round(st.median(vals), 4),
                "signo_coherente": aciertos,
                "signo_esperado": "positivo" if esperado > 0 else ("negativo" if esperado < 0 else None),
            })
        return salida

    cruce = {
        "con_frase_acuerdo": bloque(con_acuerdo),
        "sin_frase_acuerdo": bloque(sin_acuerdo),
        "diferencia_subir_bajar": {
            "valor": round(st.mean(con_acuerdo["subir"]) - st.mean(con_acuerdo["bajar"]), 4),
            "ic95_y_p": boot_diff(con_acuerdo["subir"], con_acuerdo["bajar"]),
            "sin_frase_acuerdo": round(st.mean(sin_acuerdo["subir"]) - st.mean(sin_acuerdo["bajar"]), 4),
        },
    }

    # ── 5. dónde vive la señal direccional ────────────────────────────────
    masa_total = masa_acuerdo = 0.0
    direccionales_acuerdo = direccionales_total = 0
    tono_abs_acuerdo, tono_abs_resto = [], []
    for row in clasificacion:
        value = num(row["score_hd_continuo"]) or 0.0
        masa_total += abs(value)
        es_acuerdo = row["intervencion_id"] in acuerdo_ids
        if es_acuerdo:
            masa_acuerdo += abs(value)
            tono_abs_acuerdo.append(abs(value))
        else:
            tono_abs_resto.append(abs(value))
        if row["prediccion_v3"] in ("hawkish", "dovish"):
            direccionales_total += 1
            direccionales_acuerdo += es_acuerdo

    senal = {
        "intervenciones_acuerdo": len(acuerdo_ids),
        "pct_filas": round(100 * len(acuerdo_ids) / len(clasificacion), 2),
        "pct_masa_score": round(100 * masa_acuerdo / masa_total, 1),
        "pct_direccionales": round(100 * direccionales_acuerdo / direccionales_total, 1),
        "tono_abs_medio_acuerdo": round(st.mean(tono_abs_acuerdo), 4),
        "tono_abs_medio_resto": round(st.mean(tono_abs_resto), 4),
    }

    # ── 6. tópicos ────────────────────────────────────────────────────────
    topicos = [
        {
            "anio": int(float(row["anio"])),
            "eje": row["eje_tematico"],
            "indice": round(num(row["indice_vs_corpus_base100"]) or 0, 1),
            "proporcion": round(num(row["proporcion_seis_ejes"]) or 0, 4),
            "cambio": num(row.get("cambio_anual")),
        }
        for row in topicos_src
    ]

    # ── 7. disenso ────────────────────────────────────────────────────────
    mixtas = sum(1 for a in actas if a["h"] > 0 and a["d"] > 0)
    con_direccional = sum(1 for a in actas if a["h"] + a["d"] > 0)
    unanimidad = Counter(row["acuerdo_miembros"] for row in clasificacion)
    acciones = Counter(row["acuerdo_accion"] for row in decisiones.values() if row.get("acuerdo_accion"))
    disenso = {
        "actas": len(actas),
        "actas_mixtas": mixtas,
        "actas_con_direccional": con_direccional,
        "actas_sin_direccional": len(actas) - con_direccional,
        # El ensamble votó igual en casi todo; eso mide estabilidad, no certeza.
        "miembros_unanimes": unanimidad["unanime"],
        "miembros_desacuerdo": unanimidad["desacuerdo"],
        "decisiones": dict(acciones),
    }

    # ── 8. el puente con la muestra (los 99 fragmentos) ───────────────────
    por_fecha = defaultdict(list)
    for index, quote in enumerate(quotes):
        por_fecha[quote["date"]].append(index)
    puente = {
        "fragmentos": len(quotes),
        "fechas": len(por_fecha),
        "por_acta": {
            a["id"]: {"n": len(por_fecha.get(a["fecha"], [])), "indices": por_fecha.get(a["fecha"], [])}
            for a in actas
            if por_fecha.get(a["fecha"])
        },
        "fechas_sin_reunion": [f for f in sorted(por_fecha) if not any(a["fecha"] == f for a in actas)],
    }

    return {
        "meta": {
            "generado": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "generador": "scripts/build-resultados.py",
            "fuente_commit": commit,
            "procedencia": (
                "anual, actas y tópicos vienen de la tabla maestra de FASE_2 (prioriza "
                "etiqueta humana donde existe); el cruce y el score por reunión usan la "
                "predicción cruda del modelo, porque describen el modelo, no el corpus"
            ),
            "sha256_fuentes": {
                name: sha256(path)
                for name, path in (
                    ("clasificacion", CLASIFICACION), ("anual", INDICES_ANIO),
                    ("reuniones", INDICES_REUNION), ("topicos", TOPICOS),
                    ("decisiones", DECISIONES), ("quotes", QUOTES),
                ) if path.exists()
            },
        },
        "anual": anual,
        "actas": actas,
        "cruce_decision": cruce,
        "senal": senal,
        "topicos": topicos,
        "disenso": disenso,
        "puente_muestra": puente,
    }


def dumps(data: dict) -> str:
    return json.dumps(data, ensure_ascii=False, indent=2, sort_keys=False) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    faltan = [str(p.relative_to(ROOT)) for p in
              (CLASIFICACION, INDICES_ANIO, INDICES_REUNION, TOPICOS, DECISIONES, QUOTES) if not p.exists()]
    if faltan:
        print("Faltan fuentes: " + ", ".join(faltan), file=sys.stderr)
        print("Si falta `fuente/`, corre: python3 scripts/import-fase2.py --clone", file=sys.stderr)
        return 2

    generado = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    if args.check and OUT.exists():
        generado = json.loads(OUT.read_text(encoding="utf-8"))["meta"].get("generado", generado)

    data = build()
    data["meta"]["generado"] = generado
    salida = dumps(data)

    if args.check:
        actual = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if actual != salida:
            print("data/web/resultados.json está desactualizado: corre `python3 scripts/build-resultados.py`.", file=sys.stderr)
            return 1
        print("data/web/resultados.json al día")
        return 0

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(salida, encoding="utf-8")

    cruce = data["cruce_decision"]["con_frase_acuerdo"]
    print(f"{OUT.relative_to(ROOT)}  ({len(salida) / 1024:.1f} KB)")
    print("  cruce tono ↔ decisión (con la frase del acuerdo):")
    for b in cruce:
        print(f"    {b['accion']:<9} n={b['n']:3d}  tono {b['tono']:+.4f}  signo coherente {b['signo_coherente']}/{b['n']}")
    d = data["cruce_decision"]["diferencia_subir_bajar"]
    print(f"    subir − bajar = {d['valor']:+.4f}  IC95 {d['ic95_y_p'][:2]}  P(>0)={d['ic95_y_p'][2]}"
          f"  · sin la frase del acuerdo: {d['sin_frase_acuerdo']:+.4f}")
    s = data["senal"]
    print(f"  señal: las {s['intervenciones_acuerdo']} intervenciones del acuerdo son {s['pct_filas']}% de las filas,"
          f" {s['pct_direccionales']}% de las direccionales y {s['pct_masa_score']}% de la |score|")
    return 0


if __name__ == "__main__":
    sys.exit(main())
