# Full Project Audit — Design Specification

**Project:** في ظلال القرآن (Fi Thilal Al-Quran Digital Book)
**Date:** 2026-05-26
**Status:** Approved Design

## Goal

Conduct a comprehensive audit of the entire codebase across 6 dimensions, catalog all issues with severity levels, then fix them in batch per dimension.

## Approach

**Category Deep-Dive (Approach 2):** Audit one dimension at a time across the whole app for pattern recognition and efficient reporting.

**Deliverable:** Issues documented per category with P0/P1/P2 severity, then fixed in batch.

## Phases (Execution Order)

### Phase 1: Content Integrity
**Scope:** All 114 surah markdown files in `content/surahs/` + `content/surahs/surahs-index.json`

**Checks:**
- Missing files (verify all 114 exist)
- Empty files or files with only whitespace
- Quranic verse bracket formatting: `﴿` and `﴾` must wrap every verse number and text
- Verse numbering correctness (each verse starts with `**{n}**`)
- Orphaned content (text between verses without a number)
- Encoding issues (garbled Arabic characters, BOM marks)
- Metadata cross-reference (surah name, type, verse count against `surahs-index.json`)
- Structural sections (بسم الله الرحمن الرحيم presence, surah headers)

**Method:** Script-assisted validation + manual spot-check of 5 sample surahs (early, middle, late).

### Phase 2: Accessibility (a11y)
**Scope:** All components in `components/` + all routes in `app/`

**Checks:**
- ARIA labels on all interactive elements (buttons, links, search, nav)
- Keyboard navigation: Tab order, visible focus indicators, no keyboard traps
- Screen reader compatibility (landmarks, live regions, alt text)
- Color contrast: WCAG AA (4.5:1) for all text, especially gold (`#C9A84C`) on dark backgrounds
- Focus trap in `SearchDialog` modal
- Skip-to-content link presence and function
- Heading hierarchy (h1 → h2 → h3, no skipping)

**Method:** Manual keyboard nav + axe-core/Lighthouse audit per page type.

### Phase 3: UI/UX Visual Consistency
**Scope:** All components + globals.css + all routes

**Checks:**
- Dark/light mode: no invisible text, consistent backgrounds, readable contrast in both
- Responsive: 375px (mobile), 768px (tablet), 1280px (desktop) — no broken layouts
- Color token usage: no hardcoded colors outside of CSS variables
- Spacing/layout: consistent padding, margins, alignment
- `prefers-reduced-motion`: animations respect user preference
- Empty states: SurahGrid with no results, empty bookmarks page, empty search
- Error boundaries: 404 page, 500 page, per-component error fallbacks
- Font rendering: Arabic text renders correctly with Amiri/Noto Naskh Arabic
- Gold overuse: verify app isn't garish — gold as accent, not primary

**Method:** Visual diff across modes + breakpoints. Check each component's CSS variable usage.

### Phase 4: Performance & Bundle Size
**Scope:** Production build metrics

**Checks:**
- Lighthouse scores (mobile): Performance, Accessibility, Best Practices, SEO
- Bundle analysis: large dependencies (`node_modules`), code splitting gaps
- Lazy loading: components using `next/dynamic` where appropriate
- SSG configuration: proper `generateStaticParams` usage
- Font loading: `next/font` configuration, font-display swap
- Unnecessary re-renders (React DevTools)

**Method:** `ANALYZE=true pnpm build` + Lighthouse CI or local run.

### Phase 5: Code Quality & Edge Cases
**Scope:** All source files in `app/`, `components/`, `lib/`

**Checks:**
- Console errors during route navigation (production build)
- Unhandled promise rejections
- TypeScript strictness issues (`any` usage, missing types)
- ESLint violations (`pnpm lint`)
- Edge cases: search with no results, empty bookmarks, malformed URL params
- Loading states: `loading.tsx` for each route segment
- Error boundary coverage: `error.tsx` for each route segment
- Memory leaks: `useEffect` cleanup functions, event listeners, intervals

**Method:** `pnpm lint` first, then manual testing across all edge cases.

### Phase 6: SEO & Metadata
**Scope:** All routes

**Checks:**
- `<title>` and `<meta name="description">` per route
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:type`
- Canonical URLs on all pages
- JSON-LD structured data (for surah pages — schema.org/Article or Quran-specific)
- Sitemap generation (Next.js sitemap route)
- `robots.txt` configuration
- `lang="ar"` and `dir="rtl"` on all pages

**Method:** Inspect `<head>` via curl/browser for each route type.

## Severity Levels

| Level | Definition | Response |
|-------|-----------|----------|
| P0 | Critical — broken functionality, missing content, inaccessible | Fix immediately |
| P1 | Important — visual inconsistency, degraded UX, suboptimal SEO | Fix in same batch |
| P2 | Polish — minor visual tweaks, nice-to-have improvements | Fix if time permits |

## Output

Each phase produces:
1. A list of issues with severity + file paths + line numbers
2. Registered as subtasks in project-tracker.json under new milestone `M14`
3. Batched fixes per phase, committed in order

## Out of Scope

- PWA/offline caching (covered by active M12 milestone)
- New feature development
- Content rewriting or translation editing
