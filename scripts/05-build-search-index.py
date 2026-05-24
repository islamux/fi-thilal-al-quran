#!/usr/bin/env python3
"""Build search index JSON from all 114 surah markdown files."""

import json
import re
from pathlib import Path

CONTENT_DIR = Path("content/surahs")
INDEX_FILE = Path("public/search-data.json")

PageRef = re.compile(r"^\s*\(\d+/\d+\)")
SourceRef = re.compile(r"في ظلال القرآن")
Heading = re.compile(r"^#")

def extract_chunks(text: str, surah: int, name: str, juz: int) -> list[dict]:
    chunks = []
    lines = text.split("\n")
    buffer = []
    idx = 0

    for line in lines:
        stripped = line.strip()
        if not stripped or Heading.match(stripped) or PageRef.match(stripped) or SourceRef.match(stripped):
            if buffer:
                chunk_text = " ".join(buffer).strip()
                if len(chunk_text) > 20:
                    chunks.append({
                        "id": f"{surah}-{idx}",
                        "surah": surah,
                        "surahName": name,
                        "juz": juz,
                        "text": chunk_text,
                    })
                    idx += 1
                buffer = []
            continue
        buffer.append(stripped)

    if buffer:
        chunk_text = " ".join(buffer).strip()
        if len(chunk_text) > 20:
            chunks.append({
                "id": f"{surah}-{idx}",
                "surah": surah,
                "surahName": name,
                "juz": juz,
                "text": chunk_text,
            })

    return chunks

def main():
    index_json = json.loads(Path("content/surahs-index.json").read_text("utf-8"))
    all_chunks = []

    for entry in index_json:
        filepath = CONTENT_DIR / entry["file"]
        if not filepath.exists():
            print(f"WARNING: {filepath} not found, skipping")
            continue
        text = filepath.read_text("utf-8")
        chunks = extract_chunks(text, entry["number"], entry["name"], entry["juz"])
        all_chunks.extend(chunks)

    Path("public").mkdir(exist_ok=True)
    INDEX_FILE.write_text(json.dumps(all_chunks, ensure_ascii=False), "utf-8")
    print(f"Search index written to {INDEX_FILE} ({len(all_chunks)} chunks from {len(index_json)} surahs)")

if __name__ == "__main__":
    main()
