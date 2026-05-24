#!/usr/bin/env python3
"""
01-extract-text.py
Convert .doc files to .txt using LibreOffice headless.
Output: 22 plain-text UTF-8 .txt files in docs/source-txt/
"""

import subprocess
import sys
from pathlib import Path

DOC_DIR = Path("docs/fi-thilal-al-quran-word-fiels")
OUT_DIR = Path("docs/source-txt")
LIBRE_CMD = "libreoffice"


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    doc_files = sorted(DOC_DIR.glob("*.doc"))

    if not doc_files:
        print("ERROR: No .doc files found in", DOC_DIR)
        sys.exit(1)

    print(f"Found {len(doc_files)} .doc files")

    for doc in doc_files:
        out_txt = OUT_DIR / doc.with_suffix(".txt").name
        if out_txt.exists():
            print(f"  SKIP (exists): {out_txt.name}")
            continue

        print(f"  Converting: {doc.name} ...", end=" ", flush=True)
        result = subprocess.run(
            [LIBRE_CMD, "--headless", "--convert-to", "txt:Text", "--outdir", str(OUT_DIR), str(doc)],
            capture_output=True, text=True, timeout=120,
        )
        if result.returncode != 0:
            print("FAILED")
            print(result.stderr)
            sys.exit(1)
        print("OK")

    txt_files = sorted(OUT_DIR.glob("*.txt"))
    print(f"\nDone: {len(txt_files)} .txt files in {OUT_DIR}/")

    # Quick size check
    for tf in txt_files:
        size = tf.stat().st_size
        print(f"  {tf.name}: {size:,} bytes")


if __name__ == "__main__":
    main()
