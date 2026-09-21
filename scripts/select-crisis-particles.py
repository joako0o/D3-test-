#!/usr/bin/env python3
"""Select a small, reviewable set of crisis-era particle candidates (2008-2009)."""
from __future__ import annotations

import csv
import re
from collections import Counter
from pathlib import Path

import importlib.util

HELPER_PATH = Path(__file__).with_name("select-particle-candidates.py")
_spec = importlib.util.spec_from_file_location("particle_selection", HELPER_PATH)
_helper = importlib.util.module_from_spec(_spec)
assert _spec.loader is not None
_spec.loader.exec_module(_helper)
clean_text = _helper.clean_text
fragment = _helper.fragment

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/fase-2"
CLASSIFICATION = SOURCE / "resultados/clasificacion_wc600_9725.csv"
CORPUS = SOURCE / "corpus_bcch_2005_2015.csv"
OUTPUT = SOURCE / "candidatos-crisis.csv"
TERMS = re.compile(
    r"crisis financiera|crisis internacional|crisis más profunda|implosión del sistema financiero|"
    r"sistema financiero|recesión|recesion|quiebra|subprime|turbulencia|liquidez",
    re.IGNORECASE,
)
STRONG_TERMS = re.compile(
    r"crisis financiera|crisis internacional|crisis más profunda|implosión del sistema financiero|"
    r"subprime|quiebra|recesión|recesion",
    re.IGNORECASE,
)


def read(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def crisis_fragment(text: str) -> str:
    sentences = [clean_text(s) for s in re.split(r"(?<=[.!?])\s+", text) if clean_text(s)]
    if not sentences:
        return fragment(text)
    index = max(
        range(len(sentences)),
        key=lambda i: (len(STRONG_TERMS.findall(sentences[i])), len(TERMS.findall(sentences[i])), -abs(len(sentences[i].split()) - 45)),
    )
    selected = sentences[index]
    if len(selected.split()) < 28 and index + 1 < len(sentences):
        combined = f"{selected} {sentences[index + 1]}"
        if len(combined.split()) <= 95:
            selected = combined
    if len(selected.split()) < 28 and index > 0:
        combined = f"{sentences[index - 1]} {selected}"
        if len(combined.split()) <= 95:
            selected = combined
    return selected.rstrip(" ,;:")


def main() -> None:
    predictions = {row["intervencion_id"]: row for row in read(CLASSIFICATION)}
    rows = []
    for source in read(CORPUS):
        if source["anio"] not in {"2008", "2009"}:
            continue
        prediction = predictions[source["intervencion_id"]]
        text = clean_text(source["texto"])
        if (
            prediction["prediccion_v3"] not in {"hawkish", "dovish", "neutral"}
            or prediction["pred_relevancia_v3"] != "1"
            or source["flag_texto_danado"].lower() in {"1", "true", "si", "sí"}
            or not TERMS.search(text)
        ):
            continue
        selected = crisis_fragment(text)
        if len(selected.split()) < 18:
            continue
        strength = len(STRONG_TERMS.findall(text))
        quality = (
            0.52 * abs(float(prediction["score_hd_continuo"]))
            + 0.20 * float(prediction["prob_relevancia_no_calibrada"])
            + 0.13 * (prediction["acuerdo_miembros"] == "unanime")
            + 0.10 * min(strength / 2, 1)
            + 0.05 * min(len(selected.split()) / 45, 1)
        )
        rows.append({
            "intervencion_id": source["intervencion_id"],
            "meeting_id": source["meeting_id"],
            "date": source["fecha"],
            "year": source["anio"],
            "participant": source["actor"],
            "role": source["cargo"],
            "label": prediction["prediccion_v3"],
            "score": prediction["score_hd_continuo"],
            "model_agreement": prediction["acuerdo_miembros"],
            "crisis_terms": ", ".join(sorted(set(m.group(0).lower() for m in TERMS.finditer(text)))),
            "editorial_score": f"{quality:.6f}",
            "text_fragment": selected,
            "text_original": text,
        })

    # Keep the strongest crisis-era evidence while avoiding one actor taking over.
    rows.sort(key=lambda row: float(row["editorial_score"]), reverse=True)
    selected = []
    actor_counts = Counter()
    year_counts = Counter()
    for row in rows:
        if actor_counts[row["participant"]] >= 3:
            continue
        if year_counts[row["year"]] >= 10:
            continue
        selected.append(row)
        actor_counts[row["participant"]] += 1
        year_counts[row["year"]] += 1
        if len(selected) == 20:
            break

    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        fields = list(selected[0])
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(selected)
    print(f"Escritas {len(selected)} candidatas de crisis en {OUTPUT}")
    print("Distribución:", dict(Counter(row["label"] for row in selected)))


if __name__ == "__main__":
    main()
