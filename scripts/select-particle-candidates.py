#!/usr/bin/env python3
"""Build an editorial candidate set for the particle quotes.

The source classification and corpus are joined by intervencion_id. This script
only creates a reviewable candidate CSV; it does not replace js/data/quotes.js.
"""
from __future__ import annotations

import csv
import math
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/fase-2"
CLASSIFICATION = SOURCE / "resultados/clasificacion_wc600_9725.csv"
CORPUS = SOURCE / "corpus_bcch_2005_2015.csv"
OUTPUT = SOURCE / "candidatos-particulas.csv"
TARGET_PER_LABEL = 60
KEYWORDS = (
    "inflación",
    "inflacion",
    "tasa de política",
    "tpm",
    "política monetaria",
    "politica monetaria",
    "expectativas",
    "crecimiento",
    "demanda",
    "actividad",
    "brecha",
    "estímulo",
    "estimulo",
    "interés",
    "interes",
    "precios",
)


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def fragment(text: str) -> str:
    """Choose one or two readable sentences, preferring monetary content."""
    text = clean_text(text)
    sentences = [clean_text(s) for s in re.split(r"(?<=[.!?])\s+", text) if clean_text(s)]
    if not sentences:
        return text[:500].rstrip(" ,;:")

    def sentence_score(sentence: str) -> tuple[int, int, int]:
        lower = sentence.lower()
        hits = sum(lower.count(term) for term in KEYWORDS)
        words = len(sentence.split())
        usable = 1 if 18 <= words <= 85 else 0
        return usable, hits, -abs(words - 45)

    best_index = max(range(len(sentences)), key=lambda index: sentence_score(sentences[index]))
    selected = sentences[best_index]
    if len(selected.split()) < 28 and best_index + 1 < len(sentences):
        combined = f"{selected} {sentences[best_index + 1]}"
        if len(combined.split()) <= 95:
            selected = combined
    if len(selected.split()) < 28 and best_index > 0:
        combined = f"{sentences[best_index - 1]} {selected}"
        if len(combined.split()) <= 95:
            selected = combined
    return selected[:720].rstrip(" ,;:")


def score(row: dict[str, str], text: str) -> float:
    label = row["prediccion_v3"]
    hd = abs(float(row["score_hd_continuo"]))
    prob_n = float(row["prob_n_no_calibrada"])
    agreement = 1.0 if row["acuerdo_miembros"] == "unanime" else 0.0
    relevance = float(row["prob_relevancia_no_calibrada"])
    keyword_hits = sum(text.lower().count(term) for term in KEYWORDS)
    length = len(text.split())
    length_fit = max(0.0, 1 - abs(length - 45) / 70)
    label_confidence = prob_n if label == "neutral" else hd
    return (
        0.55 * label_confidence
        + 0.18 * agreement
        + 0.14 * relevance
        + 0.08 * min(keyword_hits / 3, 1)
        + 0.05 * length_fit
    )


def choose(rows: list[dict[str, str]], label: str) -> list[dict[str, str]]:
    pool = [row for row in rows if row["label"] == label]
    pool.sort(key=lambda row: row["editorial_score"], reverse=True)
    chosen: list[dict[str, str]] = []
    actor_counts: Counter[str] = Counter()
    year_counts: Counter[str] = Counter()
    # Greedy diversity pass: quality remains primary, but repeated actors do not
    # crowd out the rest of the historical record.
    while pool and len(chosen) < TARGET_PER_LABEL:
        best_index = max(
            range(len(pool)),
            key=lambda index: (
                float(pool[index]["editorial_score"])
                - 0.035 * actor_counts[pool[index]["participant"]]
                - 0.018 * year_counts[pool[index]["year"]],
                -int(pool[index]["year"]),
            ),
        )
        row = pool.pop(best_index)
        if actor_counts[row["participant"]] >= 4:
            continue
        chosen.append(row)
        actor_counts[row["participant"]] += 1
        year_counts[row["year"]] += 1
    return chosen


def main() -> None:
    classified = {row["intervencion_id"]: row for row in read_csv(CLASSIFICATION)}
    rows: list[dict[str, str]] = []
    for source in read_csv(CORPUS):
        prediction = classified.get(source["intervencion_id"])
        if not prediction:
            continue
        text = clean_text(source["texto"])
        label = prediction["prediccion_v3"]
        if (
            label not in {"hawkish", "dovish", "neutral"}
            or prediction["pred_relevancia_v3"] != "1"
            or source["flag_texto_danado"].lower() in {"1", "true", "si", "sí"}
            or len(text.split()) < 18
        ):
            continue
        selected = fragment(text)
        if len(selected.split()) < 18:
            continue
        output = {
            "intervencion_id": source["intervencion_id"],
            "meeting_id": source["meeting_id"],
            "date": source["fecha"],
            "year": source["anio"],
            "participant": source["actor"],
            "role": source["cargo"],
            "label": label,
            "score": prediction["score_hd_continuo"],
            "prob_h": prediction["prob_h_no_calibrada"],
            "prob_d": prediction["prob_d_no_calibrada"],
            "prob_n": prediction["prob_n_no_calibrada"],
            "relevance_probability": prediction["prob_relevancia_no_calibrada"],
            "model_agreement": prediction["acuerdo_miembros"],
            "topic": source["topico_humano"],
            "keywords": source["keywords_humano"],
            "text_fragment": selected,
            "text_original": text,
        }
        output["editorial_score"] = f"{score(prediction, selected):.6f}"
        rows.append(output)

    selected = [item for label in ("hawkish", "dovish", "neutral") for item in choose([row for row in rows if row["label"] == label], label)]
    selected.sort(key=lambda row: (row["label"], row["year"], -float(row["editorial_score"])))
    fieldnames = list(selected[0])
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(selected)
    print(f"Escritas {len(selected)} candidatas en {OUTPUT}")
    print("Distribución:", dict(Counter(row["label"] for row in selected)))
    print("Años:", dict(sorted(Counter(row["year"] for row in selected).items())))


if __name__ == "__main__":
    main()
