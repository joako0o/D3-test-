#!/usr/bin/env python3
"""import-fase2.py — trae de `FASE_2` lo liviano: definiciones, números y scripts.

POR QUÉ EXISTE
  La pieza cita el modelo (W+C+600), sus métricas y sus definiciones de
  etiquetado. Hasta ahora eso se citaba de memoria: los archivos que lo prueban
  (`CODEBOOK.md`, `benchmark_modelos.csv`, `resultados_evaluacion_ciega.json`)
  viven en `joako0o/FASE_2` y el `manifest.json` de la carpeta los declaraba con
  su `sha256` sin estar presentes.

  Esto los trae —solo lo liviano— y deja los pines para poder comprobarlos. Los
  datasets grandes (corpus con texto, `tabla_maestra.csv`, `entrenamiento_wc600.csv`,
  la gold ciega, los cinco `.joblib` del modelo) NO se copian: están a un
  `git clone` de distancia y no los lee ningún consumidor de la pieza. La regla
  es: **si un archivo no lo usa un script o una figura, no viaja en el sitio.**

QUÉ HACE
  1. Lee los archivos de la lista en el clon de `FASE_2` que se le indique
     (o clona uno superficial si se le pasa `--clone`), y los copia byte por
     byte a `data/fase-2/fuente/` conservando la ruta original.
  2. Comprueba el `sha256` de cada copia contra el manifest de la fuente cuando
     el archivo está declarado ahí. Si no coincide, falla y no escribe nada.
  3. Escribe `data/fase-2/fuente/PINS.json` con repo, rama, commit, fecha y el
     `sha256` de cada archivo importado.

QUÉ NO HACE
  · No edita los archivos importados. Son de la fuente: si algo hay que
    cambiar, se cambia allá y se reimporta con `--ref` nuevo.
  · No toca `data/fase-2/` (los productos que ya estaban) ni `data/web/`.

USO
  python3 scripts/import-fase2.py --source /ruta/a/FASE_2        # importa
  python3 scripts/import-fase2.py --clone                        # clona e importa
  python3 scripts/import-fase2.py --check                        # solo verifica los pines
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DESTINO = ROOT / "data" / "fase-2" / "fuente"
PINS = DESTINO / "PINS.json"
REPO = "https://github.com/joako0o/FASE_2.git"
RAMA = "arena/01a0c4da-fase-2"

# Lo que viaja. La ruta es la de FASE_2 y se conserva tal cual bajo fuente/.
# Criterio de inclusión: lo usa un script de la pieza, una figura, o es la prueba
# de un número que la pieza muestra. El comentario dice cuál es el caso.
ARCHIVOS = [
    # La documentación de la fuente: su README es donde vive la regla de
    # procedencia (§7) que la pieza cita. No confundir con data/fase-2/README.md,
    # que es el de la importación.
    "README.md",
    "data/README.md",
    # Definiciones: sin esto la pieza describe una etiqueta que no puede definir.
    "docs/CODEBOOK.md",
    "docs/METODOLOGIA_Y_BENCHMARK.md",
    "docs/RESULTADOS_LIMITACIONES.md",
    # Los números del paper (los que un referee verifica primero).
    "data/benchmark_modelos.csv",
    "data/benchmark_modelos.json",
    "data/resultados_evaluacion_ciega.json",
    "data/predicciones_evaluacion_ciega.csv",
    "data/manifest.json",
    "data/analisis_factorial.json",
    # Robustez: curvas de aprendizaje y estabilidad del lineal.
    "resultados/robustez_supervisada/curvas_aprendizaje.json",
    "resultados/robustez_supervisada/estabilidad_lineal.json",
    # Agregados que alimentan las tres secciones de Resultados y que no estaban.
    "resultados/analisis_descriptivo/acuerdo_consejo_por_reunion.csv",
    "resultados/analisis_descriptivo/indices_por_tipo_y_actor.csv",
    "resultados/analisis_descriptivo/variacion_anual_por_actor.csv",
    "resultados/analisis_descriptivo/topicos_modelo_por_anio.csv",
    "resultados/analisis_descriptivo/topicos_modelo_nmf.csv",
    "resultados/analisis_descriptivo/radar_tematico_actores_ancho.csv",
    "resultados/analisis_descriptivo/vocabulario_frecuente_por_actor.csv",
    "resultados/analisis_descriptivo/auditoria_nombres_topicos_nmf.csv",
    "resultados/analisis_descriptivo/evolucion_topicos_modelo_resumen.csv",
    "resultados/analisis_descriptivo/evolucion_topicos_modelo_metodo.json",
    "resultados/analisis_descriptivo/radar_tematico_metodo.json",
    "resultados/analisis_descriptivo/topicos_modelo_metodo.json",
    "resultados/analisis_descriptivo/segmentacion_nmf_benchmark.csv",
    "resultados/analisis_descriptivo/segmentacion_nmf_k6_topicos.csv",
    "resultados/analisis_descriptivo/segmentacion_nmf_seleccion.json",
    "resultados/analisis_descriptivo/segmentacion_nmf_unidades.csv",
    "resultados/analisis_descriptivo/resumen.json",
    "resultados/analisis_descriptivo/manifest.json",
    "resultados/manifest.json",
    "resultados/resumen_clasificacion.json",
    "data/revision_votos_actores.csv",
    "requirements.txt",
    # Los scripts que producen esos números: sin ellos no hay reproducibilidad.
    "scripts/modelo_final.py",
    "scripts/analisis_resultados.py",
    "scripts/verificar_procedencia.py",
    "scripts/curvas_aprendizaje.py",
    "scripts/bootstrap_ciega_pareado.py",
    "scripts/estabilidad_lineal.py",
    "scripts/preparar_datos_web.py",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def clone_superficial(destino: Path) -> Path:
    print(f"clonando {REPO} ({RAMA}) …")
    subprocess.run(
        ["git", "clone", "--depth", "1", "--branch", RAMA, REPO, str(destino)],
        check=True, capture_output=True,
    )
    return destino


def commit_de(fuente: Path) -> tuple[str, str]:
    def git(*args):
        return subprocess.check_output(["git", "-C", str(fuente), *args], text=True).strip()
    return git("rev-parse", "HEAD"), git("log", "-1", "--format=%ad", "--date=short")


def manifiesto_fuente(fuente: Path) -> dict:
    """sha256 declarados por la fuente, uniendo los dos manifest que tiene."""
    pines = {}
    for rel in ("data/manifest.json", "resultados/manifest.json"):
        ruta = fuente / rel
        if not ruta.exists():
            continue
        data = json.loads(ruta.read_text(encoding="utf-8"))
        for nombre, digest in (data.get("sha256") or {}).items():
            pines[nombre.lstrip("./")] = digest
    return pines


def leer_pins() -> dict | None:
    return json.loads(PINS.read_text(encoding="utf-8")) if PINS.exists() else None


def escribir_pins(fuente: Path, commit: str, fecha: str, copiados: dict) -> None:
    PINS.write_text(
        json.dumps(
            {
                "fuente": REPO,
                "rama": RAMA,
                "commit": commit,
                "commit_fecha": fecha,
                "importado": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "importador": "scripts/import-fase2.py",
                "regla": (
                    "Solo entra lo que usa un script de la pieza, una figura, o es la prueba "
                    "de un número que la pieza muestra. Los datasets grandes (corpus con texto, "
                    "tabla_maestra.csv, entrenamiento_wc600.csv, gold ciega, .joblib) no viajan: "
                    "se consiguen con git clone del repo de la fuente."
                ),
                "pin_fuente": (
                    "true  = el sha256 lo declara el manifest de FASE_2 (prueba contra la fuente). "
                    "false = FASE_2 no lo declara y el hash quedó registrado en la importación "
                    "(sirve para detectar ediciones locales, no como prueba de origen)."
                ),
                "archivos": copiados,
            },
            ensure_ascii=False, indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


def verificar() -> int:
    pins = leer_pins()
    if not pins:
        print("No hay data/fase-2/fuente/PINS.json: corre el importador primero.", file=sys.stderr)
        return 2
    malos, faltan = [], []
    for rel, info in pins["archivos"].items():
        ruta = DESTINO / rel
        if not ruta.exists():
            faltan.append(rel)
        elif sha256(ruta) != info["sha256"]:
            malos.append(rel)
    total = len(pins["archivos"])
    if faltan or malos:
        for rel in faltan:
            print(f"  FALTA  {rel}", file=sys.stderr)
        for rel in malos:
            print(f"  CAMBIÓ {rel} (el archivo importado se editó o se corrompió)", file=sys.stderr)
        print(f"pines de FASE_2: {total - len(faltan) - len(malos)}/{total} ok", file=sys.stderr)
        return 1
    con_pin = sum(1 for i in pins["archivos"].values() if i.get("pin_fuente"))
    print(f"pines de FASE_2 ok: {total} archivos ({con_pin} con sha256 declarado por la fuente) · commit {pins['commit'][:8]}")
    return 0


def importar(fuente: Path) -> int:
    commit, fecha = commit_de(fuente)
    pines_fuente = manifiesto_fuente(fuente)

    copiados = {}
    faltantes, sin_pin, desajustes = [], [], []
    for rel in ARCHIVOS:
        origen = fuente / rel
        if not origen.exists():
            faltantes.append(rel)
            continue
        digest = sha256(origen)
        declarado = pines_fuente.get(rel)
        if declarado is None:
            sin_pin.append(rel)
        elif declarado != digest:
            desajustes.append((rel, declarado, digest))
            continue
        copiados[rel] = {"sha256": digest, "pin_fuente": declarado is not None, "bytes": origen.stat().st_size}

    if faltantes:
        print("No están en la fuente: " + ", ".join(faltantes), file=sys.stderr)
        return 2
    if desajustes:
        for rel, esperado, real in desajustes:
            print(f"El sha256 de {rel} no coincide con el manifest de la fuente:", file=sys.stderr)
            print(f"  manifest {esperado}\n  archivo  {real}", file=sys.stderr)
        print("No se copió nada. Revisa que el clon esté en el commit correcto.", file=sys.stderr)
        return 2

    for rel in ARCHIVOS:
        destino = DESTINO / rel
        destino.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(fuente / rel, destino)

    escribir_pins(fuente, commit, fecha, copiados)

    total = sum(info["bytes"] for info in copiados.values())
    con_pin = sum(1 for i in copiados.values() if i["pin_fuente"])
    print(f"importados {len(copiados)} archivos · {total / 1024:.0f} KB · commit {commit[:8]} ({fecha})")
    print(f"  {con_pin} con sha256 declarado por la fuente · {len(copiados) - con_pin} solo registrados acá")
    print(f"  pines → {PINS.relative_to(ROOT)}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--source", type=Path, help="ruta a un clon de FASE_2")
    ap.add_argument("--clone", action="store_true", help="clona la fuente en un directorio temporal")
    ap.add_argument("--check", action="store_true", help="solo verifica los pines locales")
    args = ap.parse_args()

    if args.check:
        return verificar()

    if args.clone:
        tmp = Path(tempfile.mkdtemp(prefix="fase2-")) / "FASE_2"
        fuente = clone_superficial(tmp)
    elif args.source:
        fuente = args.source.resolve()
        if not (fuente / "data" / "manifest.json").exists():
            print(f"{fuente} no parece un clon de FASE_2 (falta data/manifest.json)", file=sys.stderr)
            return 2
    else:
        print("Necesito --source /ruta/a/FASE_2 o --clone. Ver el docstring.", file=sys.stderr)
        return 2

    return importar(fuente)


if __name__ == "__main__":
    raise SystemExit(main())
