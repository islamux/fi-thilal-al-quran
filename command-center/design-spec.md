# في ظلال القرآن — Design Specification

**Project:** في ظلال القرآن (Fi Thilal Al-Quran)
**Author:** Sayyid Qutb
**Date:** 2026-05-24
**Status:** Approved

---

## 1. Overview

A standalone Next.js web application for reading **في ظلال القرآن** — Sayyid Qutb's renowned 30-volume tafsir (Quran commentary). The app converts 22 legacy `.doc` files into a premium, surah-based digital reading experience.

**Reference project:** Basaar (بصائر) — same architectural patterns, design philosophy, and quality standards.

---

## 2. Tech Stack

| Dependency | Version | Purpose |
|------------|---------|---------|
| next | ^16.2.6 | Framework (App Router) |
| react | ^19.2.6 | UI library |
| react-dom | ^19.2.6 | DOM rendering |
| tailwindcss | ^4.3.0 | Utility CSS |
| @tailwindcss/postcss | ^4.3.0 | PostCSS integration |
| typescript | ^6.0.3 | Type safety |
| serwist | ^9.5.11 | Service worker / PWA |
| @serwist/next | ^9.5.11 | Next.js PWA integration |
| flexsearch | ^0.8.212 | Full-text search |
| lucide-react | ^1.16.0 | Icons |
| react-markdown | latest | Markdown rendering |
| remark-gfm | latest | GFM support |
| sharp | latest | Image optimization |
| @types/node | latest | Node types |
| @types/react | latest | React types |
| eslint | latest | Linting |
| eslint-config-next | ^16.2.6 | Next.js ESLint config |

**Fonts (via `next/font/google`):**
- **Tajawal** (200-900 weight) — UI text: navbar, sidebar, metadata, buttons
- **Amiri Quran** — Quran verse body: traditional Naskh for `﴿ ﴾` rendering

---

## 3. Architecture & Folder Structure

```
fi-thilal-al-quran/
├── app/
│   ├── layout.tsx              # Root layout: RTL, fonts, ClientShell
│   ├── page.tsx                # Surah grid (homepage)
│   ├── surah/
│   │   └── [number]/
│   │       └── page.tsx        # Individual surah reader
│   ├── juz/
│   │   └── [number]/
│   │       └── page.tsx        # Juz index (secondary navigation)
│   └── globals.css
├── components/
│   ├── ClientShell.tsx         # Navbar + Sidebar + Search + PWA
│   ├── SurahGrid.tsx           # 114-surah grid with search/filter
│   ├── SurahCard.tsx           # Single surah card
│   ├── JuzGrid.tsx             # 30-juz index
│   ├── QuranVerse.tsx          # ﴿ verse ﴾ renderer (Amiri Quran)
│   ├── Sidebar.tsx             # Surah index + Juz toggle
│   ├── SearchDialog.tsx        # FlexSearch dialog
│   ├── ReadingProgressBar.tsx  # Per-surah progress
│   ├── BookmarkButton.tsx      # localStorage bookmarks
│   ├── FontSizeControl.tsx     # Font size slider
│   ├── ContinueReading.tsx     # Auto-resume banner
│   └── SurahNavFooter.tsx      # Previous/Next surah
├── content/
│   ├── surahs/                 # 114 .md files (one per surah)
│   └── surahs-index.json       # Metadata: number, name, type, juz, verses
├── lib/
│   ├── contentLoader.ts        # Read + parse content
│   ├── search.ts               # FlexSearch setup
│   ├── bookmarks.ts            # localStorage bookmarks
│   └── readingProgress.ts      # Auto-resume logic
├── scripts/
│   ├── 01-extract-text.py      # .doc → raw text (LibreOffice)
│   ├── 02-detect-surahs.py     # Detect surah boundaries
│   ├── 03-build-markdown.py    # Generate 114 .md files
│   └── 04-validate.py          # Validate all content
├── docs/
│   └── source/                 # Original 22 .doc files
├── public/
│   ├── manifest.json
│   ├── icons/
│   └── sw.js
├── command-center/             # Planning & tracking
│   ├── design-spec.md
│   ├── implementation-plan.md
│   └── project-tracker.json
├── AGENTS.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 4. Content Pipeline

```
22 .doc files
    │
    ▼
01-extract-text.py
  (LibreOffice --headless --convert-to txt)
    │
    ▼
22 raw .txt files
    │
    ▼
02-detect-surahs.py
  (Scan for surah headers: "سورة الفاتحة", etc.)
  (Map to standard surah numbers 1-114)
  (Produce surahs-index.json with file/line boundaries)
    │
    ▼
surahs-index.json  +  boundary data
    │
    ▼
03-build-markdown.py
  (Split text by surah boundaries)
  (Wrap Quran verses in ﴿ ﴾)
  (Preserve tashkeel, Arabic formatting)
  (Write 114 .md files)
    │
    ▼
content/surahs/001-al-fatihah.md  ...  114-surah.md
content/surahs-index.json

    │
    ▼
04-validate.py
  (All 114 surahs present?)
  (No content overlap/gaps?)
  (Tashkeel intact?)
  (Verse brackets balanced?)
```

### Surah Detection Strategy

In a tafsir text, the word `سورة` appears frequently within commentary. The extractor detects surah *headings* by looking for:
- Lines matching pattern `# سورة ...` or `سورة ...` at column start
- Standard surah names from a known list (114 names)
- Context: heading typically appears after a page/column break

---

## 5. Routes & Navigation

| Route | Page | Content |
|-------|------|---------|
| `/` | SurahGrid | All 114 surahs in a searchable grid |
| `/surah/[number]` | SurahReader | Tafsir for one surah |
| `/juz/[number]` | JuzGrid | Surahs within a specific juz |

### SurahGrid (Homepage)
- 12-column responsive grid (4 cols desktop, 2 tablet, 1 mobile)
- Each card: surah number, Arabic name, type (مكية/مدنية), juz range, verse count
- Search bar at top: filter by name or number
- "Continue Reading" banner if last-read surah exists

### SurahReader Page
- **Header:** Bismillah + surah name (Arabic) + surah number
- **Metadata bar:** Type | Juz | Verses | Revelation order
- **Content:** Tafsir rendered from markdown, with `QuranVerse` components for inline verses
- **Footer:** Previous/Next surah navigation
- **Sidebar:** Surah index (collapsible), juz toggle

### Juz Pages
- Lists all surahs within the juz
- Card click navigates to `/surah/[number]`

---

## 6. Components

### New Components (beyond Basaar)

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `SurahGrid` | 114-surah searchable grid | `surahs: SurahMeta[]` |
| `SurahCard` | Single surah card | `surah: SurahMeta`, `onClick` |
| `JuzGrid` | 30-juz index | `juz: number`, `surahs: SurahMeta[]` |
| `QuranVerse` | Inline verse renderer | `text: string` — wraps in ﴿﴾ with Amiri Quran |
| `FontSizeControl` | Font size slider | `min: number`, `max: number`, `step: number` |
| `ContinueReading` | Auto-resume banner | `surahNumber: number`, `surahName: string` |
| `SurahNavFooter` | Previous/Next | `prev: number | null`, `next: number | null` |

### Ported from Basaar (adapted)
- `ClientShell`, `Sidebar`, `SearchDialog`, `ReadingProgressBar`, `BookmarkButton`, `MobileMenu`

---

## 7. Data Flow

### Content Loading
```
surahs-index.json  ──►  contentLoader.ts  ──►  Server Component
     │                                              │
     │                                    (reads .md file by number)
     │                                              │
     └── metadata (name, juz, type)              Markdown content
                                                  │
                                                  ▼
                                             react-markdown
                                                  │
                                                  ▼
                                             Rendered page
```

### Search
```
FlexSearch index          ──► search.ts
  (built at build time)         │
                                ▼
                         SearchDialog.tsx
                                │
                          (fuzzy search across
                           all surah content)
```

### Bookmarks + Progress (localStorage only)
```
Component (BookmarkButton / ReadingProgressBar)
    │
    ▼
lib/bookmarks.ts / lib/readingProgress.ts
    │
    ▼
localStorage (keyed by project + surah number)
```

---

## 8. SEO & Performance

- **Static Generation:** All surah pages pre-rendered at build time via `generateStaticParams`
- **Metadata:** Dynamic `generateMetadata` with surah name, description, Open Graph
- **Font Loading:** Self-hosted via `next/font/google` — zero external requests
- **PWA:** Serwist service worker for offline access to all content
- **Image Optimization:** `sharp` for icon generation
- **Bundle Splitting:** Dynamic import for SearchDialog (heavy FlexSearch)

---

## 9. Features Summary

| Feature | Source | Notes |
|---------|--------|-------|
| Surah grid (114) | New | Searchable, filterable |
| Surah reader | Ported | Markdown rendering with QuranVerse |
| Juz index (30) | New | Secondary navigation |
| Quran verse display | New | ﴿﴾ with Amiri Quran font |
| Full-text search | Basaar | FlexSearch across all content |
| Dark mode | Basaar | TailwindCSS dark variant |
| Reading progress | Basaar | Per-surah localStorage |
| Bookmarking | Simplified | localStorage only (no auth) |
| Auto-resume | New | Last-read surah restoration |
| Font size control | New | CSS variable, localStorage |
| Previous/Next surah | New | Based on surah index order |
| PWA offline | Basaar | Serwist service worker |
| Responsive design | Basaar | Mobile-first, tablet-optimized |

---

## 10. What's NOT Included (Out of Scope)

- Supabase auth (localStorage only) — can be added later
- Multiple tafsir sources (single book: في ظلال القرآن)
- Audio recitations (no everyayah.com integration)
- Notes/reflections per verse (can be added later)
- Tajweed color-coding
- Verse-by-verse mode (the tafsir is prose, not per-ayah)
