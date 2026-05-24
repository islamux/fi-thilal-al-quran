#!/usr/bin/env python3
"""
03-build-markdown.py
Split extracted text by surah boundaries.
Detect and wrap Quranic verses in ﴿ ﴾ brackets.
Write content/surahs/{number}-{name}.md for each surah.
Write final content/surahs-index.json with line ranges.
"""

import json
import re
import sys
from pathlib import Path

TXT_DIR = Path("docs/source-txt")
INDEX_PATH = Path("content/surahs-index.json")
OUT_DIR = Path("content/surahs")

# ── Verse detection ──────────────────────────────────────────────────
# Quranic verses often appear as parenthesized numbers or tashkeel patterns
# Like: ﴿ ... ﴾  or ( ... ) followed by verse number

VERSE_BRACKET_OPEN = "\uFDFD"  # ﷽
ARS_EN = "\u06F0"  # Arabic-Indic digits start

def wrap_quranic_verses(text):
    """
    Detect and wrap Quranic verses in ﴿ ﴾ brackets.
    Strategy: look for existing ﴿...﴾ patterns and normalize them.
    Also detect verses marked by bracketed numbers like (1) (٢) etc.
    """
    # Normalize existing ﴿...﴾ patterns (ensure proper spacing)
    text = re.sub(r"﴿\s*", "﴿", text)
    text = re.sub(r"\s*﴾", "﴾", text)

    # Add newlines around verse brackets for clean markdown
    text = re.sub(r"﴿", "\n\n﴿", text)
    text = re.sub(r"﴾", "﴾\n\n", text)

    return text.strip()


def is_heading_line(line):
    """Check if a line looks like a surah heading."""
    stripped = line.strip()
    if re.match(r"^\(\d+\)\s+سورة\s+", stripped):
        return True
    if re.search(r"\bسورة\s+", stripped):
        return True
    if re.match(r"^بسم\s+الله\s+الرحمن\s+الرحيم", stripped):
        return True
    return False


def main():
    if not INDEX_PATH.exists():
        print(f"ERROR: {INDEX_PATH} not found. Run 02-detect-surahs.py first.")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    index_data = json.loads(INDEX_PATH.read_text("utf-8"))

    # Group surahs by source file
    by_file = {}
    for entry in index_data:
        src = entry["source_file"]
        by_file.setdefault(src, []).append(entry)

    print(f"Processing {len(by_file)} source files, {len(index_data)} surahs...")

    # Load text files and extract surahs
    output_index = []

    for src_file, surahs in by_file.items():
        txt_path = TXT_DIR / src_file
        if not txt_path.exists():
            print(f"  SKIP (missing): {src_file}")
            continue

        text = txt_path.read_text("utf-8", errors="replace")
        lines = text.splitlines()
        print(f"\n  {src_file}: {len(surahs)} surahs, {len(lines)} lines")

        for i, entry in enumerate(surahs):
            start_line = entry["source_line"]
            end_line = surahs[i + 1]["source_line"] if i + 1 < len(surahs) else len(lines) + 1

            # Extract lines for this surah
            surah_lines = lines[start_line - 1:end_line - 1]

            # Skip the heading line itself
            content_lines = []
            heading = ""
            for line in surah_lines:
                if not heading and is_heading_line(line):
                    heading = line.strip()
                    continue
                content_lines.append(line)

            content = "\n".join(content_lines).strip()
            content = wrap_quranic_verses(content)

            # Write markdown file
            num = entry["number"]
            name = entry["name"]
            filename = f"{num:03d}-{name}.md"
            filepath = OUT_DIR / filename

            md_content = [
                f"# {heading}" if heading else f"# سورة {name}",
                "",
                content,
                "",
            ]
            filepath.write_text("\n".join(md_content), "utf-8")

            output_entry = {
                "number": num,
                "name": name,
                "juz": entry["juz"],
                "verses": entry.get("verses", 0),
                "file": filename,
                "source_file": src_file,
            }
            output_index.append(output_entry)

            print(f"    #{num:3d} {name:12s} → {filename}")

    # Write content/surahs-index.json
    output_index.sort(key=lambda x: x["number"])
    index_path = Path("content/surahs-index.json")
    index_path.write_text(json.dumps(output_index, ensure_ascii=False, indent=2), "utf-8")
    print(f"\nDone: {len(output_index)} surah files in {OUT_DIR}/")
    print(f"Index: {index_path}")


if __name__ == "__main__":
    main()
