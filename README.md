# في ظلال القرآن

**Fi Thilal Al-Quran** — A digital edition of Sayyid Qutb's renowned tafsir.

Browse, search, and read all 30 volumes of this seminal 20th-century Quranic exegesis, with bookmarking, reading progress, and full offline support.

---

## Features

- **114 surahs** organized by both surah number and juz (30 parts)
- **Full-text search** across all 7,200+ content chunks (FlexSearch)
- **Bookmarks** with localStorage persistence
- **Reading progress** bar tracking per-surah scroll position
- **Dark / light mode**
- **Arabic-first** — RTL layout, Tajawal UI font, Amiri Quran for verses
- **PWA** — installable, offline-capable (Serwist service worker)
- **Responsive** — mobile, tablet, desktop

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2.6 (SSG, 148 routes) |
| Language | TypeScript 6.0.3 |
| Styling | TailwindCSS 4.3.0 |
| Search | FlexSearch 0.8.212 (Document index, client-side) |
| PWA | Serwist 9.5.11 |
| Icons | lucide-react 1.16.0 |
| Fonts | Tajawal + Amiri Quran (next/font/google) |
| Content | 114 markdown files + metadata index |
| Pipeline | Python 3 (`.doc` → structured markdown) |

## Getting Started

```bash
pnpm install
pnpm dev        # development server (webpack)
pnpm build      # production build (search index + SSG)
pnpm start      # production server
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Search index + production build |
| `pnpm lint` | ESLint |
| `pnpm extract` | Full content pipeline (`.doc` → markdown) |
| `pnpm validate` | Validate all 114 surah files |
| `pnpm ccui` | Command-center TUI (project tracker) |

## Content Pipeline

Original source: 22 `.doc` Word files in `docs/source/`. The pipeline converts them to 114 structured markdown files:

```bash
pnpm extract
pnpm validate
```

Four Python scripts handle extraction, surah boundary detection, verse formatting, and quality validation (`scripts/01-04.py`). Search data is built at compile time via `scripts/05-build-search-index.py` (7,213 chunks).

## Project Structure

```
├── app/                # Next.js routes (home, surah/[n], juz/[n])
│   ├── layout.tsx      # RTL, fonts, metadata
│   ├── globals.css     # Design tokens, dark mode, utilities
│   ├── manifest.ts     # PWA manifest
│   └── sw.ts           # Serwist service worker
├── components/         # React components (13 total)
│   ├── SurahGrid       # Surah listing with search filter
│   ├── SurahContent    # Reader view
│   ├── QuranVerse      # Verse detection + ﴿﴾ rendering
│   ├── SearchDialog    # Full-text search modal
│   ├── Sidebar         # Navigation (surahs + juz)
│   └── ...
├── lib/                # Utility modules
│   ├── contentLoader   # Markdown content loading
│   ├── search          # FlexSearch index wrapper
│   ├── bookmarks       # localStorage CRUD
│   └── readingProgress # Scroll position tracking
├── content/surahs/     # 114 markdown files
├── scripts/            # Python pipeline + utilities
├── command-center/     # Project tracker + TUI
└── public/             # Icons, search data, SW
```

## License

This project is for educational and reference purposes. The text of في ظلال القرآن is the intellectual property of its respective rights holders.
