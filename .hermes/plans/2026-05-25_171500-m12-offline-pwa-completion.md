# Plan: M12 — Full Offline PWA Completion + Homepage Simplification

**Date:** 2026-05-25
**Author:** Hermes Agent
**Status:** Plan (ready to execute)

## Goal

Two parallel workstreams:
1. Complete remaining gaps in M12 (Full Offline PWA)
2. Simplify the homepage to a clean index page with title + search + grid only

---

## Stream A: Homepage Simplification

### What changes

**Current homepage (`app/page.tsx`)** has:
- Large dramatic hero: gold glow background, massive gold title "في ظلال القرآن", "تأليف: سيد قطب" subtitle, decorative dividers, description paragraph
- Stat pills (114 سورة / 30 جزء)
- ContinueReading banner
- Section header "فهرس السور" with gold accent bar
- SurahGrid (with its own built-in search bar)

**Target:** Strip it down so the homepage contains only:
- A clean, minimal title
- The ContinueReading banner (useful for navigation)
- The SurahGrid (search bar + card grid — no extra section header)

### Step-by-step

| Step | File | Change |
|------|------|--------|
| 1 | `app/page.tsx` | Remove the hero section entirely (lines 14-51): gold glow div, h1 title, author subtitle, decorative dividers, description paragraph, stat pills. Keep only a clean small title + the ContinueReading + SurahGrid. |
| 2 | `app/page.tsx` | Remove the "فهرس السور" section header (line 59-63): the gold accent bar + h2 + gradient divider. The page IS the index, so the header is redundant. |
| 3 | `app/page.tsx` | Simplify the title to a clean, minimal inline heading (e.g., `font-amiri-quran` text, normal weight, no gold gradient, no glow) near the top. |
| 4 | Verify | `pnpm dev` — homepage loads cleanly with just title → search bar → grid |

### Rationale

- The SurahGrid component already has a search input built in — no need for a separate search bar
- The section header "فهرس السور" is redundant when the entire page is the index
- The stat pills (114 سورة / 30 جزء) add clutter without utility — the user already sees the count in the grid
- The hero section was decorative from M10 but makes the page feel heavy on first load

---

## Stream B: Full Offline PWA (M12 remaining work)

### Already built (~80% done)

| What | Status |
|------|--------|
| **sw.ts** — runtime caching rules for search-data.json (CacheFirst 90d), next/image (NetworkFirst 30d), app icons (CacheFirst 365d) | ✅ Done |
| **next.config.ts** — `cacheOnNavigation: true`, `reloadOnOnline: true` | ✅ Done |
| **lib/useOffline.ts** — `useOffline()`, `useCacheProgress()`, `cacheAllPages()` (generates 145 URLs: / + 114 surah + 30 juz) | ✅ Done |
| **components/OfflineBanner.tsx** — shows caching progress (`تحميل... N/M`) and offline indicator (`أنت غير متصل`) | ✅ Done |
| **components/ClientShell.tsx** — imports OfflineBanner, calls cacheAllPages() after 3s mount delay | ✅ Done |
| **components/Sidebar.tsx** — "حفظ الكل للاستخدام دون اتصال" Save All button calling cacheAllPages() | ✅ Done |
| **public/search-data.json** — pre-built with 7,213 chunks from 05-build-search-index.py | ✅ Done |
| **pnpm build** — runs 05-build-search-index.py before next build | ✅ Done |
| **sw.ts message handler** — CACHE_ALL_PAGES listener caches to "offline-pages" cache, posts progress | ✅ Done |

### Remaining work

#### B1. Cache search-data.json on SW activate (M12_004 refinement)

**Problem:** Search-data.json has a runtime caching rule (CacheFirst), but isn't eagerly cached on SW install/activate. If a user opens the app offline on first visit, search may not work.

**Fix:** Add a handler in `sw.ts` that fetches `/search-data.json` and puts it in the "search-data" cache on SW activate, so it's always available offline regardless of whether the user searched while online.

**Files changed:** `app/sw.ts`

#### B2. "Available Offline" badge on cached content (M12_005)

**Problem:** No visual indicator tells the user which pages are cached for offline reading.

**Fix (two parts):**

**B2a.** `lib/useOffline.ts` — Add:
- `isCached(url: string): Promise<boolean>` — checks if a URL is in any cache
- `useCachedSurahs(): Set<number>` — React hook that queries the Cache Storage API and returns a reactive set of cached surah numbers

**B2b.** `components/Sidebar.tsx` — Show:
- A small green checkmark next to each cached surah link
- The "حفظ الكل للاستخدام دون اتصال" button becomes "✓ متاح للقراءة بدون اتصال" when all 145 URLs are cached (use `useCacheProgress()` to detect when `done === total`)

**Files changed:** `lib/useOffline.ts`, `components/Sidebar.tsx`

#### B3. Cache retry / resilience (M12_003 hardening)

**Problem:** `cacheAllPages()` fires once after 3s. If the SW isn't controlling the page yet, the message silently drops.

**Fix:** In `components/ClientShell.tsx`, add retry logic: if SW controller is null or postMessage fails, retry after 2s for up to 5 attempts.

**Files changed:** `components/ClientShell.tsx`

---

## Execution Order

1. **Stream A first** — Homepage simplification (fast, 1 file changed)
2. **Stream B1** — SW search-data cache-on-activate
3. **Stream B2** — Offline badge + cache-state-aware sidebar
4. **Stream B3** — Cache retry hardening
5. **Build + full verification**

---

## Testing

### After Stream A
- `pnpm dev` — homepage renders cleanly: title → search bar → grid
- No gold glow, no stat pills, no redundant section header
- All 114 surah cards still render
- Search still filters correctly
- ContinueReading still appears if user has read before

### After Stream B
- `pnpm build` exits 0 with no warnings
- Offline: all 145 routes render without network
- Search works offline
- Cache progress indicator shows 145/145 on first load
- Sidebar shows offline badge on cached content
- "Save All" button changes state when all cached
- No console errors related to SW or caching

---

## Risks & Tradeoffs

| Risk | Mitigation |
|------|------------|
| **Homepage feels too empty** after removing the hero | The SurahGrid with search bar + card grid fills the viewport naturally. Can add a subtle title treatment if needed. |
| **Cache Storage limits** (~50MB per origin) | Search-data.json is ~13MB. CacheFirst rules with expiration keep totals within bounds. |
| **SW install delay** | Retry logic in ClientShell handles the case where SW isn't controlling yet. |
| **Serwist precaching overlap** | "offline-pages" cache name is distinct from Serwist's precache cache. No conflict. |

---

## Files Changed Summary

| File | Stream | Change |
|------|--------|--------|
| `app/page.tsx` | A | Strip hero, stat pills, section header. Clean minimal layout. |
| `app/sw.ts` | B1 | Add activate handler to eagerly cache search-data.json |
| `lib/useOffline.ts` | B2 | Add `isCached()` helper, `useCachedSurahs()` hook |
| `components/Sidebar.tsx` | B2 | Add offline badge per surah, cache-state-aware save button |
| `components/ClientShell.tsx` | B3 | Add retry logic for cacheAllPages() |
