# في ظلال القرآن — Implementation Plan

**Date:** 2026-05-24
**Status:** Not Started

---

## Milestones Overview

| # | Milestone | Description | Est. Effort |
|---|-----------|-------------|-------------|
| M1 | Project Scaffolding | Initialize Next.js, install deps, configure | Small |
| M2 | Content Pipeline | Extract 22 .doc → 114 .md files + index | Large |
| M3 | Core Components | ClientShell, SurahGrid, SurahReader, Sidebar | Large |
| M4 | QuranVerse + Special Components | Verse renderer, FontSize, NavFooter, etc. | Medium |
| M5 | Search & PWA | FlexSearch, Serwist, offline support | Medium |
| M6 | Bookmarks & Progress | localStorage hooks, UI integration | Small |
| M7 | Juz Navigation | JuzGrid, route, sidebar toggle | Small |
| M8 | Polish & QA | Dark mode, responsive audit, build verification | Medium |

---

## M1: Project Scaffolding

**Branch:** `chore/project-scaffold`

**Tasks:**
1. `next init` or manual `package.json` + `tsconfig.json` + `next.config.ts`
2. Install all dependencies (Next.js 16.2.6, React 19.2.6, TailwindCSS 4.3.0, etc.)
3. Configure PostCSS with `@tailwindcss/postcss`
4. Set up `globals.css` with Tailwind directives + CSS variables (dark mode)
5. Configure `next.config.ts` with Serwist PWA plugin
6. Set up ESLint with `eslint-config-next`
7. Copy `AGENTS.md` and `command-center/` folder
8. Create placeholder `app/layout.tsx` with RTL + Tajawal font
9. Create placeholder `app/page.tsx` (basic shell)
10. Verify `pnpm dev` starts successfully

**Acceptance:** `pnpm dev` runs, blank page renders RTL with Tajawal font.

---

## M2: Content Pipeline (Python)

**Branch:** `feat/content-pipeline`

**Tasks:**
1. Copy 22 `.doc` files from source to `docs/source/`
2. Write `scripts/01-extract-text.py`:
   - Uses `libreoffice --headless --convert-to txt`
   - Handles Arabic encoding (UTF-8)
   - Output: 22 `.txt` files
3. Write `scripts/02-detect-surahs.py`:
   - Load 114 standard surah names list
   - Scan each text file for surah heading markers
   - Build `surahs-index.json` with surah number, name, juz, file source, line range
4. Write `scripts/03-build-markdown.py`:
   - Split text by surah boundaries
   - Detect and wrap Quran verses in `﴿ ﴾`
   - Preserve tashkeel and Arabic formatting
   - Write `content/surahs/{number}-{name}.md`
   - Write final `content/surahs-index.json`
5. Write `scripts/04-validate.py`:
   - Check all 114 surahs exist
   - Verify no content overlap
   - Validate tashkeel preservation
   - Check verse bracket balance
6. Run full pipeline end-to-end
7. Sample-read 3-5 surah files for quality

**Acceptance:** 114 `.md` files + valid `surahs-index.json` generated.

---

## M3: Core Components

**Branch:** `feat/core-components`

**Tasks:**
1. Write `lib/contentLoader.ts`:
   - `getAllSurahs()` — reads `surahs-index.json`
   - `getSurah(number)` — returns metadata + loads `.md` content
   - `getSurahsByJuz(number)` — filters by juz
   - `getAdjacentSurahs(number)` — previous/next
2. Write `components/ClientShell.tsx`:
   - Navbar (with logo, search toggle, dark mode toggle, font size)
   - Mobile menu
   - Wraps children with providers
3. Write `components/SurahCard.tsx`:
   - Number + Arabic name + type badge (مكية/مدنية)
   - Juz range + verse count
   - Hover effect with border highlight
4. Write `components/SurahGrid.tsx`:
   - Responsive grid (12-col: 4/2/1)
   - Search bar at top filtering by name/number
   - Loading state with skeleton cards
   - Maps to `/surah/{number}` on click
5. Write `app/page.tsx`:
   - Import SurahGrid with all surahs
   - "Continue Reading" banner (conditional)
   - Header: book title + author
6. Write `app/layout.tsx`:
   - RTL + Tajawal + Amiri Quran fonts
   - ClientShell wrapper
   - Metadata + viewport config
7. Write `app/surah/[number]/page.tsx`:
   - `generateStaticParams` for all 114
   - `generateMetadata` per surah
   - Render: header, metadata bar, markdown content, SurahNavFooter
8. Write `components/Sidebar.tsx`:
   - Expandable surah list grouped by juz
   - Active surah highlight
   - Collapsible on mobile
9. Write `components/SurahNavFooter.tsx`:
   - Previous/Next buttons at bottom
   - Disabled at boundaries (surah 1 / 114)

**Acceptance:** All 114 surah pages render, navigation works, grid loads.

---

## M4: Special Components

**Branch:** `feat/special-components`

**Tasks:**
1. Write `components/QuranVerse.tsx`:
   - Wraps text in `﴿` ... `﴾`
   - Uses Amiri Quran font
   - Special styling: larger size, gold/amber accent color, increased line height
   - Custom CSS class for verse styling
2. Write `components/FontSizeControl.tsx`:
   - Slider UI (luxury design, not native input)
   - Persists to localStorage
   - Updates CSS variable `--font-size-scale` on root
   - Default: 100%, range: 75%–150%
3. Write `components/ContinueReading.tsx`:
   - Reads last-read surah from `lib/readingProgress.ts`
   - Shows banner on homepage: "Continue reading سورة {name}"
   - Links to `/surah/{number}`
   - Dismissible
4. Write `lib/readingProgress.ts`:
   - `saveProgress(surahNumber)` on scroll/page exit
   - `getLastRead()` returns last surah
   - Uses localStorage
5. Style `app/globals.css`:
   - Premium design tokens (spacing, colors, shadows)
   - Dark mode palette
   - Glassmorphism effects for cards
   - Surah grid responsive breakpoints

**Acceptance:** Quran verses render with proper styling, font size adjustable, auto-resume works.

---

## M5: Search & PWA

**Branch:** `feat/search-pwa`

**Tasks:**
1. Write `lib/search.ts`:
   - Build FlexSearch index at build time
   - Index: surah number, name, full markdown content
   - Export `search(query)` function
2. Write `scripts/generate-search-data.mjs`:
   - Pre-build script that indexes all surah content
   - Outputs search index to `public/search-index.json` (or inline)
3. Write `components/SearchDialog.tsx`:
   - Modal with input
   - Real-time results as user types
   - Results: surah name + preview snippet
   - Click navigates to `/surah/{number}`
   - Keyboard shortcut: `Ctrl+K` or `Cmd+K`
4. Configure `next.config.ts` with Serwist:
   - Cache strategy for all static content
   - Offline fallback page
5. Write `public/manifest.json`:
   - App name: في ظلال القرآن
   - Icons: 192x192, 512x512
   - Theme color
6. Generate PWA icons

**Acceptance:** Search works across all content, app installable as PWA, works offline.

---

## M6: Bookmarks & Progress

**Branch:** `feat/bookmarks-progress`

**Tasks:**
1. Write `lib/bookmarks.ts`:
   - `getBookmarks()` — array of surah numbers
   - `toggleBookmark(surahNumber)` — add/remove
   - `isBookmarked(surahNumber)` — check
   - Persisted in localStorage
2. Write `components/BookmarkButton.tsx`:
   - Heart/bookmark icon toggle
   - Filled/outline state
   - Animated on click
3. Integrate `ReadingProgressBar.tsx`:
   - Scroll-based progress within surah page
   - Persisted per surah in localStorage
4. Update `SurahCard.tsx`:
   - Show bookmark indicator on bookmarked surahs
   - Show progress bar if partially read

**Acceptance:** Bookmarks persist across sessions, reading progress tracked per surah.

---

## M7: Juz Navigation

**Branch:** `feat/juz-navigation`

**Tasks:**
1. Write `components/JuzGrid.tsx`:
   - 30 juz in a grid
   - Each shows juz number + surahs it covers
2. Write `app/juz/[number]/page.tsx`:
   - `generateStaticParams` for juz 1-30
   - Lists surahs in the juz
3. Update `Sidebar.tsx`:
   - Toggle between surah list and juz list
4. Add juz metadata to `surahs-index.json`:
   - Each surah entry includes `juz` number

**Acceptance:** Juz navigation works from sidebar and direct URL.

---

## M8: Polish & QA

**Branch:** `refactor/polish-qa`

**Tasks:**
1. Dark mode audit: all components respond to `dark:` variant
2. Responsive audit: mobile, tablet, desktop breakpoints
3. Loading states: skeleton loading for all async content
4. Error boundaries: graceful fallbacks instead of white screens
5. Accessibility audit: ARIA labels, keyboard nav, screen reader
6. Build verification: `pnpm build` passes cleanly
7. Lighthouse audit: target 90+ on all metrics
8. Polish animations: hover states, page transitions, micro-interactions

**Acceptance:** Build passes, Lighthouse > 90, all features working.

---

## M12: Full Offline PWA — Cache All Content for Offline Reading

**Branch:** `feat/offline-pwa`

**Tasks:**
1. Update `sw.ts` with explicit runtime caching rules for search data, static content
2. Create `OfflineBanner` component that shows when offline + works when cached pages load
3. Programmatic cache-all on first visit — iterate all 114 surah + 30 juz + home URLs in service worker message
4. Cache `/search-data.json` on install/activate so search works offline
5. Add "Available Offline" badge + "Save All for Offline" button in sidebar/settings
6. Build verification + full offline test (airplane mode, verify 149 routes + search)

**Key Files:**
- `app/sw.ts` — runtime caching rules, cache-all logic
- `components/ClientShell.tsx` — offline banner, cache status
- `components/Sidebar.tsx` — "Save All for Offline" button
- `next.config.ts` — Serwist config (cacheOnNavigation already true)

**Acceptance:** All 149 routes work in offline mode. Search works offline. Offline indicator shows correctly. Build passes.
