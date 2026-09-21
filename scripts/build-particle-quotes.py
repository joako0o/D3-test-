#!/usr/bin/env python3
"""Create the 99 particle quotes consumed by the scrollytelling app.

This is an editorial export: source candidates remain in data/fase-2 and the
browser receives only the fields it needs for a particle and its quote panel.
"""
from __future__ import annotations

import csv
import json
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/fase-2"
GENERAL = SOURCE / "candidatos-particulas.csv"
CRISIS = SOURCE / "candidatos-crisis.csv"
OUTPUT = ROOT / "js/data/quotes.js"
TARGET_PER_LABEL = 33
CRISIS_PER_LABEL = {"hawkish": 5, "dovish": 10, "neutral": 0}
MONTHS = (
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
)


def read(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def format_date(value: str) -> str:
    year, month, day = (int(part) for part in value.split("-")[:3])
    return f"{day} de {MONTHS[month - 1]}, {year}"


def choose_diverse(rows: list[dict[str, str]], label: str, amount: int) -> list[dict[str, str]]:
    pool = [row for row in rows if row["label"] == label]
    pool.sort(key=lambda row: float(row["editorial_score"]), reverse=True)
    selected: list[dict[str, str]] = []
    actors: Counter[str] = Counter()
    years: Counter[str] = Counter()
    while pool and len(selected) < amount:
        best_index = max(
            range(len(pool)),
            key=lambda index: (
                float(pool[index]["editorial_score"])
                - 0.035 * actors[pool[index]["participant"]]
                - 0.018 * years[pool[index]["year"]],
                float(pool[index]["editorial_score"]),
            ),
        )
        row = pool.pop(best_index)
        if actors[row["participant"]] >= 3:
            continue
        selected.append(row)
        actors[row["participant"]] += 1
        years[row["year"]] += 1
    return selected


def to_quote(row: dict[str, str]) -> dict[str, object]:
    score = float(row["score"])
    return {
        "text": row["text_fragment"],
        "participant": row["participant"],
        "year": int(row["year"]),
        "label": row["label"],
        "score": round(score, 4),
        "date": row["date"],
        "formatted_date": format_date(row["date"]),
    }


def main() -> None:
    general = read(GENERAL)
    crisis = read(CRISIS)
    selected: list[dict[str, str]] = []
    used = set()
    for label in ("hawkish", "dovish", "neutral"):
        crisis_rows = choose_diverse(crisis, label, CRISIS_PER_LABEL[label])
        selected.extend(crisis_rows)
        used.update(row["intervencion_id"] for row in crisis_rows)

    for label in ("hawkish", "dovish", "neutral"):
        remaining = [row for row in general if row["intervencion_id"] not in used]
        rows = choose_diverse(remaining, label, TARGET_PER_LABEL - sum(1 for row in selected if row["label"] == label))
        selected.extend(rows)
        used.update(row["intervencion_id"] for row in rows)

    # Interleave labels so the particle field is not initially dominated by one tone.
    by_label = {label: [row for row in selected if row["label"] == label] for label in ("hawkish", "dovish", "neutral")}
    ordered = [by_label[label].pop(0) for _ in range(TARGET_PER_LABEL) for label in ("hawkish", "dovish", "neutral")]
    quotes = [to_quote(row) for row in ordered]
    OUTPUT.write_text(
        "/* Generated from data/fase-2/candidatos-particulas.csv and candidatos-crisis.csv. */\n"
        "/* Run `python3 scripts/build-particle-quotes.py` to regenerate; do not edit manually. */\n"
        f"window.QUOTES = {json.dumps(quotes, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print(f"Escritas {len(quotes)} intervenciones en {OUTPUT}")
    print("Distribución:", dict(Counter(quote["label"] for quote in quotes)))
    print("Crisis incluidas:", sum(row["year"] in ("2008", "2009") for row in selected))


if __name__ == "__main__":
    main()
