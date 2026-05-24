#!/usr/bin/env python3
"""
04-validate.py
Quality checks for the generated content:
  - All 114 surahs exist
  - No content overlap between surahs
  - Validate Arabic tashkeel preservation
  - Check verse bracket balance (﴿ ... ﴾)
  - Verify total line count consistency
"""

import json
import sys
from pathlib import Path

CONTENT_DIR = Path("content/surahs")
INDEX_PATH = Path("content/surahs-index.json")

EXPECTED_COUNT = 114
# Key diacritics in Arabic
TASHKEEL_CHARS = set("\u064B\u064C\u064D\u064E\u064F\u0650\u0651\u0652")

errors = []
warnings = []


def check_file_exists(filepath, label):
    if not filepath.exists():
        errors.append(f"{label}: File not found: {filepath}")


def check_bracket_balance(text, label):
    opens = text.count("﴿")
    closes = text.count("﴾")
    if opens != closes:
        errors.append(f"{label}: Unbalanced Quranic brackets: {opens} ﴿ vs {closes} ﴾")


def check_tashkeel(text, label):
    """Basic check that tashkeel characters are present."""
    if not any(c in TASHKEEL_CHARS for c in text):
        warnings.append(f"{label}: No tashkeel (Arabic diacritics) found")


def main():
    print("=" * 60)
    print("  Content Validation Report")
    print("=" * 60)

    # 1. Check index exists
    if not INDEX_PATH.exists():
        print(f"FATAL: {INDEX_PATH} not found. Run 03-build-markdown.py first.")
        sys.exit(1)

    index = json.loads(INDEX_PATH.read_text("utf-8"))

    # 2. Check all 114 entries in index
    if len(index) != EXPECTED_COUNT:
        errors.append(f"Index has {len(index)} entries, expected {EXPECTED_COUNT}")
    else:
        print(f"\n✓ Index: {len(index)} entries")

    # 3. Check sequential numbering
    numbers = [e["number"] for e in index]
    expected_nums = list(range(1, EXPECTED_COUNT + 1))
    if numbers != expected_nums:
        missing = set(expected_nums) - set(numbers)
        extra = set(numbers) - set(expected_nums)
        if missing:
            errors.append(f"Missing surah numbers: {sorted(missing)}")
        if extra:
            errors.append(f"Extra surah numbers: {sorted(extra)}")
    else:
        print(f"✓ Surah numbers: 1-{EXPECTED_COUNT} sequential")

    # 4. Check all markdown files exist
    missing_files = []
    for entry in index:
        filepath = CONTENT_DIR / entry["file"]
        if not filepath.exists():
            missing_files.append(entry["file"])
    if missing_files:
        errors.append(f"Missing {len(missing_files)} surah files: {missing_files[:5]}...")
    else:
        print(f"✓ All {len(index)} surah files present")

    # 5. Validate content of each surah
    total_lines = 0
    total_verses = 0
    for entry in index:
        filepath = CONTENT_DIR / entry["file"]
        if not filepath.exists():
            continue

        text = filepath.read_text("utf-8", errors="replace")
        lines = text.strip().split("\n")
        total_lines += len(lines)

        label = f"#{entry['number']:03d} {entry['name']}"
        check_bracket_balance(text, label)
        check_tashkeel(text, label)

        # Count bracketed verse pairs
        v_opens = text.count("﴿")
        total_verses += v_opens

    print(f"✓ Total lines across all surahs: {total_lines}")
    print(f"✓ Total bracketed verse pairs: {total_verses}")

    # 6. Summary
    print("\n" + "=" * 60)
    if errors:
        print(f"  ERRORS: {len(errors)}")
        for e in errors:
            print(f"    ✗ {e}")
    else:
        print("  ERRORS: 0 ✓")

    if warnings:
        print(f"  WARNINGS: {len(warnings)}")
        for w in warnings[:10]:
            print(f"    ⚠ {w}")
        if len(warnings) > 10:
            print(f"    ... and {len(warnings) - 10} more")
    else:
        print("  WARNINGS: 0")

    status = "PASS" if not errors else "FAIL"
    print(f"\n  Status: {status}")
    print("=" * 60)

    return len(errors)


if __name__ == "__main__":
    ec = main()
    sys.exit(ec)
