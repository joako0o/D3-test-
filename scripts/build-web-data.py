#!/usr/bin/env python3
"""build-web-data.py — de los CSV de `data/fase-2/` a un JSON que el navegador sí lee.

POR QUÉ EXISTE
  `data/fase-2/` pesa 18 MB (14 de ellos, el corpus con texto) y el navegador no
  lee ni un byte: la página carga `js/data/quotes.min.js` y nada más. Eso deja a
  la vista un hueco que se nota: la pieza habla de un corpus de 9.725
  intervenciones y 132 reuniones, pero los únicos números que existen en el
  cliente son los 99 fragmentos de la muestra editorial.

  Este script es el hermano de `scripts/build-particle-quotes.py`: aquel elige
  los 99 fragmentos que se pueden TOCAR; este agrega el corpus que se puede
  CITAR. Emite `data/web/resumen.json` (~10 KB) con lo que la pieza necesita
  para no decir un número a mano.

  Está escrito para que la Fase de Resultados tenga de dónde tirar: `anual` y
  `actores` son las dos primeras series que necesita cualquier gráfico de
  resultados, y ya vienen con la métrica calculada por la fuente
  (`tono_neto_general` = (hawkish − dovish) / intervenciones del año).

QUÉ NO HACE
  · No publica texto. Las 9.725 intervenciones con su cadena completa se quedan
    en `data/fase-2/`: al navegador solo va el agregado, y el texto de a
    fragmentos por demanda (que es justo lo que hace el panel de cita).
  · No decide la muestra editorial. Eso es `build-particle-quotes.py`.
  · No interpreta: los números salen de `prediccion_v3`, `acuerdo_miembros` y
    los agregados de `analisis_descriptivo/`, tal como los dejó la fuente.

PROCEDENCIA
  El bloque `meta.sha256_fuentes` guarda el hash de cada CSV de entrada, y
  `data/web/manifest.json` el de cada salida. Es lo que permite escribir en el
  paper "el artefacto se generó desde estos bytes exactos", y lo que hace que
  un cambio de dato no pase inadvertido.

USO
  python3 scripts/build-web-data.py            # regenera data/web/
  python3 scripts/build-web-data.py --check     # sale con 1 si quedó viejo
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FASE2 = ROOT / "data" / "fase-2"
RESULTS = FASE2 / "resultados"
DESCRIPTIVO = RESULTS / "analisis_descriptivo"
OUT_DIR = ROOT / "data" / "web"
OUT_MAIN = OUT_DIR / "resumen.json"
OUT_MANIFEST = OUT_DIR / "manifest.json"

FUENTES = {
    "clasificacion": RESULTS / "clasificacion_wc600_9725.csv",
    "anual": DESCRIPTIVO / "indices_por_anio.csv",
    "actores": DESCRIPTIVO / "indices_por_actor.csv",
    "metadata_actores": FASE2 / "actores_metadata.csv",
    "manifest_fuente": FASE2 / "manifest.json",
    "readme_fuente": FASE2 / "README.md",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_csv(path: Path) -> list[dict]:
    with path.open(encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def num(value, default=0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def count(rows: list[dict], column: str, value: str) -> int:
    return sum(1 for row in rows if row.get(column) == value)


def fuente_commit() -> str | None:
    """El commit de FASE_2 lo declara el README de la carpeta, no un archivo de
    configuración: se lee de ahí y si no está, se omite (mejor null que inventar
    una procedencia)."""
    readme = FUENTES["readme_fuente"]
    if not readme.exists():
        return None
    match = re.search(r"Commit incorporado:\s*`?([0-9a-f]{7,40})`?", readme.read_text(encoding="utf-8"))
    return match.group(1) if match else None


def git_commit() -> str | None:
    try:
        return subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, text=True, stderr=subprocess.DEVNULL
        ).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def build_resumen(generado: str) -> dict:
    clasificacion = read_csv(FUENTES["clasificacion"])
    anual_rows = read_csv(FUENTES["anual"])
    actor_rows = read_csv(FUENTES["actores"])
    metadata_rows = read_csv(FUENTES["metadata_actores"])
    manifest_fuente = json.loads(FUENTES["manifest_fuente"].read_text(encoding="utf-8"))

    periodo = manifest_fuente.get("periodo", [])
    anios = sorted({int(row["anio"]) for row in clasificacion if row.get("anio")})

    entrenamiento = [row for row in clasificacion if row.get("usado_en_entrenamiento") == "True"]
    ciegas = [row for row in clasificacion if row.get("rol") == "evaluacion_ciega"]
    prediccion = [row.get("prediccion_v3") for row in clasificacion]

    reparto = lambda rows: {  # noqa: E731 — tres usos, misma forma
        "hawkish": sum(1 for row in rows if row.get("prediccion_v3") == "hawkish"),
        "dovish": sum(1 for row in rows if row.get("prediccion_v3") == "dovish"),
        "neutral": sum(1 for row in rows if row.get("prediccion_v3") == "neutral"),
    }

    unanime = count(clasificacion, "acuerdo_miembros", "unanime")
    total = len(clasificacion) or 1

    meta = {
        "generado": generado,
        "generador": "scripts/build-web-data.py",
        "fuente": "joako0o/FASE_2",
        "fuente_commit": fuente_commit(),
        "fuente_version": manifest_fuente.get("version"),
        "modelo": manifest_fuente.get("modelo_formal"),
        "modelo_descripcion": (
            "ensamble de 5 clasificadores lineales sobre TF-IDF de palabra y carácter"
        ),
        "etiquetas": ["hawkish", "dovish", "neutral"],
        "periodo": periodo,
        "n_anios": len(anios),
        "anios": anios,
        "n_intervenciones": total,
        "n_reuniones": len({row.get("meeting_id") for row in clasificacion}),
        "n_actores": len({row.get("actor") for row in clasificacion}),
        "n_direccionales": sum(1 for value in prediccion if value in ("hawkish", "dovish")),
        "n_hawkish": count(clasificacion, "prediccion_v3", "hawkish"),
        "n_dovish": count(clasificacion, "prediccion_v3", "dovish"),
        "n_neutral": count(clasificacion, "prediccion_v3", "neutral"),
        "n_relevantes": count(clasificacion, "pred_relevancia_v3", "1"),
        "n_no_relevantes": count(clasificacion, "pred_relevancia_v3", "0"),
        "n_entrenamiento": len(entrenamiento),
        "n_evaluacion_ciega": len(ciegas),
        "reparto_entrenamiento": reparto(entrenamiento),
        "reparto_evaluacion_ciega": reparto(ciegas),
        "acuerdo_unanime": unanime,
        "acuerdo_unanime_pct": round(1000 * unanime / total) / 10,
        "sha256_fuentes": {name: sha256(path) for name, path in FUENTES.items() if path.exists()},
    }

    # El índice anual se toma tal como lo calculó la fuente (tono_neto_general);
    # recalcularlo aquí sería una segunda versión del mismo número.
    anual = [
        {
            "anio": int(float(row["anio"])),
            "n": int(float(row["n_intervenciones"])),
            "h": int(float(row["n_hawkish"])),
            "d": int(float(row["n_dovish"])),
            "neu": int(float(row["n_neutral"])),
            "indice": round(num(row["tono_neto_general"]), 4),
            "cobertura_direccional": round(num(row["cobertura_direccional"]), 4),
            "score_medio": round(num(row["score_hd_continuo_medio"]), 4),
        }
        for row in anual_rows
    ]

    metadata = {row["actor"]: row for row in metadata_rows}
    actores = []
    for row in actor_rows:
        actor = row["actor"]
        extra = metadata.get(actor, {})
        mandato = [extra.get("mandato_inicio") or None, extra.get("mandato_fin") or None]
        actores.append(
            {
                "actor": actor,
                "n": int(float(row["n_intervenciones"])),
                "h": int(float(row["n_hawkish"])),
                "d": int(float(row["n_dovish"])),
                "indice": round(num(row["tono_neto_general"]), 4),
                "cargos": [c.strip() for c in (extra.get("cargos_observados") or "").split(";") if c.strip()],
                "mandato": mandato if any(mandato) else None,
                "verificado": extra.get("verificado", "").lower() == "true",
            }
        )
    actores.sort(key=lambda item: (-item["n"], item["actor"]))

    return {"meta": meta, "anual": anual, "actores": actores}


def dumps(data: dict) -> str:
    return json.dumps(data, ensure_ascii=False, indent=2) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--check", action="store_true", help="no escribe: avisa si la salida quedó vieja")
    args = parser.parse_args()

    faltantes = [str(path.relative_to(ROOT)) for path in FUENTES.values() if not path.exists()]
    if faltantes:
        print("Faltan fuentes: " + ", ".join(faltantes), file=sys.stderr)
        return 2

    generado = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    if args.check and OUT_MAIN.exists():
        # En modo check se conserva la fecha del archivo actual: si no, el
        # sello de tiempo haría fallar la comparación en cada corrida.
        generado = json.loads(OUT_MAIN.read_text(encoding="utf-8"))["meta"].get("generado", generado)

    resumen = build_resumen(generado)
    salida = dumps(resumen)
    manifest = dumps(
        {
            "generador": resumen["meta"]["generador"],
            "generado": generado,
            "commit_sitio": git_commit(),
            "fuente": f"{resumen['meta']['fuente']}@{resumen['meta']['fuente_commit']}",
            "salidas": {"data/web/resumen.json": hashlib.sha256(salida.encode("utf-8")).hexdigest()},
            "sha256_fuentes": resumen["meta"]["sha256_fuentes"],
        }
    )

    if args.check:
        actual = OUT_MAIN.read_text(encoding="utf-8") if OUT_MAIN.exists() else ""
        if actual != salida:
            print("data/web/resumen.json está desactualizado: corre `python3 scripts/build-web-data.py`.", file=sys.stderr)
            return 1
        print("data/web/resumen.json al día")
        return 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_MAIN.write_text(salida, encoding="utf-8")
    OUT_MANIFEST.write_text(manifest, encoding="utf-8")

    m = resumen["meta"]
    print(f"{OUT_MAIN.relative_to(ROOT)}  ({len(salida) / 1024:.1f} KB)")
    print(
        f"  {m['n_intervenciones']} intervenciones · {m['n_reuniones']} reuniones · "
        f"{m['n_actores']} actores · {m['periodo'][0]}–{m['periodo'][1]}"
    )
    print(
        f"  direccionales {m['n_direccionales']} ({m['n_hawkish']} H / {m['n_dovish']} D) · "
        f"entrenamiento {m['n_entrenamiento']} · ciegas {m['n_evaluacion_ciega']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
