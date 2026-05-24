#!/usr/bin/env python3
"""
02-detect-surahs.py
Scan each extracted .txt file for surah heading markers.
Pattern: `[سورة NAME (N) :` at line start (the first section marker for each surah).
Build surahs-index.json with surah number, name, file source, line range.
"""

import json
import re
import sys
from pathlib import Path

TXT_DIR = Path("docs/source-txt")
OUTPUT = Path("content/surahs-index.json")

SURAH_NAMES = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام",
    "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد",
    "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء",
    "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة",
    "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر",
    "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية",
    "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات",
    "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد",
    "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون",
    "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة",
    "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة",
    "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير",
    "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق",
    "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل",
    "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة",
    "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر",
    "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون",
    "النصر", "المسد", "الإخلاص", "الفلق", "الناس",
]

SURAH_JUZ = [
    1, 1, 3, 4, 5, 6, 7, 9, 10, 11, 11, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 19, 20, 20, 21, 21, 21, 21, 22, 22, 22,
    23, 23, 23, 24, 24, 25, 25, 25, 26, 26, 26, 26, 26, 26, 27, 27, 27,
    27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29,
    29, 29, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
]

SURAH_VERSES = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
    128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34,
    30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29,
    18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12,
    12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 28, 46, 42, 29,
    19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6,
]


# Alternate name variants found in the source text
NAME_ALIASES = {
    "السجدة": ["السجده"],
    "سبأ": ["سبإ"],
    "النبأ": ["النبإ"],
    # Surah 44 (الدخان) has format `سورة الدخان (44) :` (missing `[`)
}

# Special patterns for surahs whose headings don't match standard formats
SPECIAL_PATTERNS = {
    44: re.compile(r"^سورة الدخان\s+\(44\)\s*:"),
}


def build_patterns():
    """Build regex patterns for surah heading detection.
    Primary: `[سورة NAME (N) :` at line start (bracketed section markers).
    Fallback: `(N) سورة NAME` at line start (plain headings).
    """
    patterns = {}
    for idx, name in enumerate(SURAH_NAMES, 1):
        variants = [name] + NAME_ALIASES.get(name, [])
        primary = []
        fallback = []
        for v in variants:
            primary.append(re.compile(rf"^\[سورة\s+{v}\s+\({idx}\)\s*:"))
            fallback.append(re.compile(rf"^\({idx}\)\s+سورة\s+{v}\b"))
        patterns[idx] = (primary, fallback)
    return patterns


def main():
    if not TXT_DIR.exists():
        print(f"ERROR: {TXT_DIR}/ not found. Run 01-extract-text.py first.")
        sys.exit(1)

    txt_files = sorted(TXT_DIR.glob("*.txt"))
    if not txt_files:
        print(f"ERROR: No .txt files in {TXT_DIR}/")
        sys.exit(1)

    patterns = build_patterns()
    remaining = set(range(1, 115))
    found = {}

    print(f"Scanning {len(txt_files)} text files for surah section markers...")

    # First pass: try primary (bracketed) pattern
    for tf in txt_files:
        text = tf.read_text("utf-8", errors="replace")
        lines = text.splitlines()
        for lineno, line in enumerate(lines, 1):
            if not remaining:
                break
            stripped = line.strip()
            for num in list(remaining):
                primary, _ = patterns[num]
                for pat in primary:
                    if pat.search(stripped):
                        found[num] = (lineno, tf.name, "bracket")
                        remaining.remove(num)
                        print(f"  #{num:3d} {SURAH_NAMES[num-1]:12s} → {tf.name}:{lineno} (bracket)")
                        break
        if not remaining:
            break

    # Second pass: try fallback (plain heading) for remaining
    if remaining:
        print(f"\n  -- Fallback pass for {len(remaining)} surahs...")
        for tf in txt_files:
            text = tf.read_text("utf-8", errors="replace")
            lines = text.splitlines()
            for lineno, line in enumerate(lines, 1):
                if not remaining:
                    break
                stripped = line.strip()
                for num in list(remaining):
                    _, fallback = patterns[num]
                    for pat in fallback:
                        if pat.search(stripped):
                            found[num] = (lineno, tf.name, "plain")
                            remaining.remove(num)
                            print(f"  #{num:3d} {SURAH_NAMES[num-1]:12s} → {tf.name}:{lineno} (plain)")
                            break
                    if num not in remaining:
                        break
                if not remaining:
                    break
            if not remaining:
                break

    # Third pass: try special patterns
    if remaining:
        print(f"\n  -- Special patterns pass for {len(remaining)} surahs...")
        for tf in txt_files:
            text = tf.read_text("utf-8", errors="replace")
            lines = text.splitlines()
            for lineno, line in enumerate(lines, 1):
                if not remaining:
                    break
                stripped = line.strip()
                for num in list(remaining):
                    if num in SPECIAL_PATTERNS and SPECIAL_PATTERNS[num].search(stripped):
                        found[num] = (lineno, tf.name, "special")
                        remaining.remove(num)
                        print(f"  #{num:3d} {SURAH_NAMES[num-1]:12s} → {tf.name}:{lineno} (special)")
                        break
                if not remaining:
                    break
            if not remaining:
                break

    if remaining:
        print(f"\nERROR: Could not find headings for surahs: {sorted(remaining)}")
        sys.exit(1)

    print(f"\nAll 114 surahs detected successfully!")

    entries = []
    for num in range(1, 115):
        lineno, src, _ = found[num]
        entry = {
            "number": num,
            "name": SURAH_NAMES[num - 1],
            "juz": SURAH_JUZ[num - 1],
            "verses": SURAH_VERSES[num - 1],
            "source_file": src,
            "source_line": lineno,
        }
        entries.append(entry)

    OUTPUT.write_text(json.dumps(entries, ensure_ascii=False, indent=2), "utf-8")
    print(f"\nIndex written to {OUTPUT} ({len(entries)} entries)")


if __name__ == "__main__":
    main()
