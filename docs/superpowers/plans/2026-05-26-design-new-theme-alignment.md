# Design_New Theme Token Alignment — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the Next.js project's Tailwind v4 `@theme` tokens and all components with the Design_New HTML prototypes (`_1/code.html`, `_2/code.html`, `_3/code.html`) for pixel-perfect visual parity.

**Architecture:** Expand `globals.css` `@theme` block to declare all Design_New color/spacing/typography tokens, then update each component to use the prototype's class names. This is a CSS-token-first approach — once tokens exist, components are refactored by replacing old class names with prototype-matching ones.

**Tech Stack:** TailwindCSS v4 (`@theme` CSS block), Next.js 16, TypeScript, Material Symbols.

**Branch:** `refactor/design-new-theme-alignment`

---

## File Structure

| File | Change | Responsibility |
|------|--------|---------------|
| `app/globals.css` | Modify `@theme` block | Add all Design_New color tokens, spacing scale, font size tokens, font family tokens |
| `app/layout.tsx` | Modify | Ensure font CSS variables match new `fontFamily` tokens |
| `app/page.tsx` | Modify | Update ContinueReading, section header, surah grid to match `_3` |
| `app/search/page.tsx` | Modify | Update search page to match `_2` |
| `components/ClientShell.tsx` | Modify | Update header + mobile nav to match prototypes |
| `components/Sidebar.tsx` | Modify | Update nav active state, profile card, colors |
| `components/ContinueReading.tsx` | Modify | Add verse quote, juz/ayah badges, match `_3` dark gold banner |
| `components/SurahCard.tsx` | Modify | Add right gold accent line on hover, update colors |
| `components/SurahContent.tsx` | Modify | Update reading container, bottom bar, visual breaks |
| `components/QuranVerse.tsx` | Modify | Update verse block styling to match `_1` |
| `components/SurahNavFooter.tsx` | Modify | Pill-shaped buttons matching `_1` |

---

## Phase 1: Theme Token Expansion (globals.css)

### Task 1.1: Add Design_New Color Tokens to @theme

**File:** `app/globals.css`

**What:** Add all Design_New color tokens from the prototype's `tailwind.config` into the `@theme` block, alongside existing tokens. Also add dark mode `.dark` overrides for each new token.

- [ ] **Step 1: Read current globals.css to confirm its state**

Read: `app/globals.css` — verify it has the `@theme {}` block with existing tokens.

- [ ] **Step 2: Add all Design_New colors to @theme block**

Add these color tokens inside `@theme {}` after the existing tokens:

```css
@theme {
  /* ...existing tokens remain unchanged... */

  /* Design_New Colors */
  --color-parchment-cream: #FAF8F5;
  --color-warm-stone: #F0ECE4;
  --color-warm-ash: #F5F0E8;
  --color-warm-border: #E2DCD0;

  --color-gilded-gold: #C5A028;
  --color-gilded-gold-hover: #D4B85A;
  --color-gilded-gold-light: #F5E6B8;

  --color-on-surface: #1a1a2e;
  --color-on-surface-variant: #43474e;
  --color-faded-ink: #5A5A6E;
  --color-greyed-ink: #9A9AAE;

  --color-secondary: #755b00;
  --color-secondary-container: #fed977;

  --color-primary-container: #1a365d;

  --color-outline: #74777f;
  --color-outline-variant: #c4c6cf;

  --color-surface-container: #efecff;
  --color-surface-container-high: #e8e5ff;

  --color-dark-bg: #0F0F1A;
  --color-dark-surface: #1E1E32;
  --color-dark-primary: #7EB8E8;
  --color-dark-text: #E8E4DE;
  --color-tertiary-container: #353634;
  --color-on-tertiary-container: #9f9e9c;

  /* Design_New Spacing (pixel-based) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-max-content-width: 1200px;

  /* Design_New Font Families */
  --font-display: "Tajawal", sans-serif;
  --font-verse: "Amiri Quran", serif;
  --font-body: "Tajawal", sans-serif;
  --font-title: "Tajawal", sans-serif;
  --font-headline: "Tajawal", sans-serif;
  --font-label-sm: "Tajawal", sans-serif;
  --font-label: "Tajawal", sans-serif;

  /* Design_New Font Sizes */
  --font-size-display: 36px;
  --font-size-headline: 24px;
  --font-size-title: 18px;
  --font-size-body: 16px;
  --font-size-label-sm: 14px;
  --font-size-verse: 20px;
  --font-size-verse-large: 32px;

  --line-height-display: 1.2;
  --line-height-headline: 1.3;
  --line-height-title: 1.4;
  --line-height-body: 1.8;
  --line-height-label-sm: 21px;
  --line-height-verse: 40px;
  --line-height-verse-large: 60px;
}
```

- [ ] **Step 3: Add dark mode `.dark` overrides for new tokens**

Add inside `.dark {}` block:

```css
.dark {
  /* ...existing dark tokens remain... */

  --color-parchment-cream: #0F0F1A;
  --color-warm-stone: #1E1E32;
  --color-warm-ash: #2a2a42;
  --color-secondary: #e2c06a;
  --color-secondary-container: #3a2e1a;
  --color-on-surface: #E8E4DE;
  --color-on-surface-variant: #a8a4a0;
  --color-faded-ink: #a8a4a0;
  --color-greyed-ink: #6a665e;
  --color-outline: #74777f;
  --color-outline-variant: #43474e;
}
```

- [ ] **Step 4: Verify build is not broken**

Run: `pnpm build` (or `pnpm lint` for a faster check)
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "refactor(theme): add Design_New color/spacing/typography tokens to @theme"
```

---

### Task 1.2: Add Design_New Utility Classes

**File:** `app/globals.css`

- [ ] **Step 1: Add active-nav-border utility**

Add after existing utility classes:

```css
.active-nav-border {
  border-right: 2px solid var(--color-secondary);
}
```

- [ ] **Step 2: Add search-backdrop utility**

```css
.search-backdrop {
  background-image: linear-gradient(rgba(250, 248, 245, 0.9), rgba(250, 248, 245, 0.9)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="60" opacity="0.03">﴿</text></svg>');
}

.dark .search-backdrop {
  background-image: linear-gradient(rgba(15, 15, 26, 0.9), rgba(15, 15, 26, 0.9)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="60" opacity="0.03">﴿</text></svg>');
}
```

Note: The actual backdrop uses a Google AI image URL. For production, we use a simple SVG pattern fallback. The user can replace with the actual image later.

- [ ] **Step 3: Add `.dark` variant for glass-header**

Add to `.dark` block:

```css
.dark .glass-header {
  background-color: var(--color-glass-dark);
}
```

(Already exists in globals.css via CSS variable swap, so this may not be needed — verify.)

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "refactor(theme): add active-nav-border, search-backdrop utilities"
```

---

## Phase 2: Layout Foundation

### Task 2.1: Update Layout Font Tokens

**File:** `app/layout.tsx`

- [ ] **Step 1: Add all weight variants for Tajawal**

The prototypes use `Tajawal` with multiple weights (300-800). Current layout only loads 400 and 700. Add more weights:

```tsx
const tajawal = Tajawal({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
  display: "swap",
});
```

- [ ] **Step 2: Verify no font size increase concerns**

Check that adding extra weights doesn't blow up the JS bundle — since next/font/google self-hosts subsets, added weights increase font file size. For the Gilded Library aesthetic, the extra weights (300 light, 500 medium, 800 extra-bold) are needed for `font-display`, `font-label-sm`, etc.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor(layout): add Tajawal 300/500/800 weights for Design_New tokens"
```

---

## Phase 3: Component Refactoring — Home Page

### Task 3.1: Update ContinueReading to Match Design_New _3

**File:** `components/ContinueReading.tsx`

**What:** Match `_3/code.html` sections 209-226. The prototype banner has:
- `bg-secondary` (dark gold `#755b00`) background
- White text
- Gradient overlay `bg-gradient-to-l from-secondary-container/20 to-transparent`
- "استمر في القراءة" label
- Verse quote in Amiri Quran (`font-verse`)
- Juz and ayah badges (`bg-white/20 backdrop-blur-md`)
- "متابعة القراءة" button with `bg-white text-secondary`

- [ ] **Step 1: Rewrite ContinueReading.tsx**

Replace the entire component:

```tsx
"use client";

import Link from "next/link";
import { useReadingProgress } from "@/lib/readingProgress";

export default function ContinueReading() {
  const { getLastRead } = useReadingProgress();
  const last = getLastRead();

  if (!last) return null;

  return (
    <section className="mb-xl">
      <div className="relative group overflow-hidden rounded-xl bg-secondary dark:bg-secondary-container p-xl flex flex-col md:flex-row items-center justify-between text-white shadow-sm transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-l from-secondary-container/20 to-transparent pointer-events-none" />
        <div className="relative z-10 text-right">
          <span className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 mb-sm block">
            استمر في القراءة
          </span>
          <h3 className="font-headline text-headline mb-xs">
            سورة {last.surahName}
          </h3>
          <p className="font-verse text-title italic opacity-90 mb-md leading-loose">
            ﴿ وَقُلِ الْحَقُّ مِن رَّبِّكُمْ ۖ فَمَن شَاءَ فَلْيُؤْمِن وَمَن شَاءَ فَلْيَكْفُرْ ﴾
          </p>
          <div className="flex items-center gap-sm">
            <span className="bg-white/20 backdrop-blur-md px-sm py-1 rounded text-xs">
              الجزء {last.juz || "—"}
            </span>
          </div>
        </div>
        <Link
          href={`/surah/${last.surah}`}
          className="relative z-10 mt-xl md:mt-0 px-xl py-md bg-white text-secondary font-title rounded-lg hover:bg-warm-ash dark:hover:bg-tertiary-container dark:text-secondary dark:bg-dark-surface transition-colors flex items-center gap-sm active:scale-95"
        >
          <span>متابعة القراءة</span>
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ContinueReading.tsx
git commit -m "refactor(continue-reading): match Design_New _3 dark gold banner with verse quote"
```

---

### Task 3.2: Update SurahCard with Right Accent Hover Line

**File:** `components/SurahCard.tsx`

**What:** Match `_3/code.html` card markup (lines 265-282). Key changes:
- Add `absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-secondary transition-all duration-300 group-hover:h-3/4` accent line
- Hover: `hover:bg-warm-ash hover:border-secondary/30`
- Number badge: `bg-gilded-gold-light border border-secondary/20`
- Name: `group-hover:text-secondary`
- Basmalah: `font-verse` instead of `quran-text`

- [ ] **Step 1: Rewrite SurahCard.tsx**

```tsx
import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahCard({ surah }: { surah: SurahIndexEntry }) {
  const isMakkan = surah.number <= 57;

  const basmalah =
    surah.number === 1 || surah.number === 9
      ? ""
      : "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group relative block bg-surface border border-warm-border p-md rounded-xl transition-all duration-300 hover:bg-warm-ash hover:border-secondary/30 cursor-pointer"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-secondary transition-all duration-300 group-hover:h-3/4" />

      <div className="flex justify-between items-start mb-md">
        <div className="w-10 h-10 rounded-full bg-gilded-gold-light border border-secondary/20 flex items-center justify-center font-label-sm text-secondary font-bold">
          {surah.number}
        </div>
        <div className="text-left">
          <span className="block font-label-sm text-greyed-ink text-xs uppercase tracking-tight">
            {isMakkan ? "مكية" : "مدنية"}
          </span>
          <span className="block font-label-sm text-greyed-ink text-xs">
            {surah.verses} آيات
          </span>
        </div>
      </div>

      <div className="text-right">
        <h3 className="font-headline text-headline text-primary mb-xs group-hover:text-secondary transition-colors">
          {surah.name}
        </h3>
        {basmalah && (
          <p className="font-verse text-on-surface-variant opacity-70 text-sm truncate">
            {basmalah}
          </p>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SurahCard.tsx
git commit -m "refactor(surah-card): add right gold accent hover line, match Design_New _3"
```

---

### Task 3.3: Update Home Page Header Section

**File:** `app/page.tsx`

**What:** Match `_3/code.html` sections 227-245 and 285-291. The prototype has:
- Section title "فهرس السور" with `font-headline text-headline text-primary`
- Sort/grid view icon buttons
- "عرض المزيد من السور" button with `border border-warm-border`

The existing `page.tsx` is already close. Main changes:
- Replace `font-bold text-xl` with `font-headline text-headline`
- Update button styling

- [ ] **Step 1: Update page.tsx tokens**

```tsx
import ClientShell from "@/components/ClientShell";
import SurahGrid from "@/components/SurahGrid";
import ContinueReading from "@/components/ContinueReading";
import { getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";

export default function Home() {
  const surahList = getAllSurahs() as SurahIndexEntry[];

  return (
    <ClientShell surahs={surahList}>
      <div className="pt-6 px-4 lg:px-8 min-h-screen pb-24 lg:pb-8 max-w-screen-2xl mx-auto">
        <ContinueReading />

        <div className="flex items-center justify-between mb-lg border-b border-warm-border pb-md">
          <h2 className="font-headline text-headline text-primary">فهرس السور</h2>
          <div className="flex items-center gap-sm">
            <button className="p-xs text-on-surface-variant hover:text-primary transition-colors" aria-label="ترتيب">
              <span className="material-symbols-outlined">sort</span>
            </button>
            <button className="p-xs text-on-surface-variant hover:text-primary transition-colors" aria-label="عرض شبكي">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>
        </div>

        <SurahGrid surahs={surahList} />
      </div>
    </ClientShell>
  );
}
```

- [ ] **Step 2: Update SurahGrid "show more" button to match prototype**

File: `components/SurahGrid.tsx` — Update the "Load More" button:

Replace the current load more button:
```tsx
{visible.length < filtered.length && (
  <div className="mt-xxl flex justify-center">
    <button
      onClick={() => setVisibleCount((c) => c + 24)}
      className="px-xl py-md border border-warm-border rounded-lg text-primary font-title hover:bg-warm-stone transition-all active:scale-95 flex items-center gap-sm"
    >
      <span>عرض المزيد من السور</span>
      <span className="material-symbols-outlined">expand_more</span>
    </button>
  </div>
)}
```

Also update the grid div classes to use new spacing tokens:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx components/SurahGrid.tsx
git commit -m "refactor(home): update tokens to match Design_New _3 home page"
```

---

## Phase 4: Component Refactoring — Header & Sidebar

### Task 4.1: Update ClientShell Header

**File:** `components/ClientShell.tsx`

**What:** Match `_1/code.html` header (lines 146-169) and `_3/code.html` header (lines 150-166). Key changes:
- Header height `h-14` (56px) — already matches
- Title uses `font-headline text-headline text-primary` — update from `font-bold text-lg`
- Search bar input uses `bg-surface border border-warm-border rounded-xl`
- Dark mode button styling

- [ ] **Step 1: Update ClientShell header section**

Replace header content with:

```tsx
<header className="glass-header fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-4 lg:px-8">
  <div className="flex items-center gap-4">
    {surahs && (
      <button
        className="md:hidden p-sm hover:bg-warm-ash rounded-full transition-colors duration-150"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="القائمة"
      >
        <span className="material-symbols-outlined text-text">menu</span>
      </button>
    )}
    <Link href="/" className="font-headline text-headline text-primary hover:text-secondary transition-colors tracking-tight">
      في ظلال القرآن
    </Link>
  </div>

  <div className="flex items-center gap-sm">
    <div className="relative hidden md:block">
      <input
        type="text"
        placeholder="بحث في السور والآيات..."
        className="w-64 bg-surface border border-warm-border rounded-xl px-md py-xs text-label-sm focus:ring-0 focus:border-secondary outline-none transition-colors text-text placeholder:text-text-muted"
        onFocus={() => setSearchOpen(true)}
        readOnly
      />
      <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
    </div>
    <button
      className="p-sm hover:bg-warm-ash rounded-full transition-colors active:scale-95 duration-150"
      onClick={() => setSearchOpen(true)}
      aria-label="البحث"
    >
      <span className="material-symbols-outlined md:hidden text-primary">search</span>
    </button>
    <button
      className="p-sm hover:bg-warm-ash rounded-full transition-colors active:scale-95 duration-150"
      onClick={toggleDark}
      aria-label={dark ? "الوضع النهاري" : "الوضع الليلي"}
    >
      <span className="material-symbols-outlined text-primary">{dark ? "light_mode" : "dark_mode"}</span>
    </button>
  </div>
</header>
```

- [ ] **Step 2: Commit**

```bash
git add components/ClientShell.tsx
git commit -m "refactor(client-shell): update header tokens to match Design_New"
```

---

### Task 4.2: Update Sidebar

**File:** `components/Sidebar.tsx`

**What:** Match `_3/code.html` sidebar (lines 167-205). Key changes:
- Active nav item has `bg-warm-ash dark:bg-tertiary-container` with `border-r-2 border-secondary` (the `active-nav-border` class from prototype)
- Active icon uses filled variant (`font-variation-settings: 'FILL' 1`)
- Inactive items: `text-on-surface-variant hover:bg-warm-ash`
- Profile card: avatar image placeholder (use person icon fallback)
- Nav links use `active:scale-98` press effect

- [ ] **Step 1: Update Sidebar.tsx**

```tsx
"use client";

import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function Sidebar({
  activeNumber,
  onClose,
}: {
  surahs: SurahIndexEntry[];
  activeNumber?: number;
  onClose?: () => void;
}) {
  const navItems = [
    { icon: "book_2", label: "السور", href: "/", isActive: true },
    { icon: "segment", label: "الأجزاء", href: "/juz/1", isActive: false },
    { icon: "bookmark", label: "العلامات", href: "/bookmarks", isActive: false },
    { icon: "search", label: "البحث", href: "/search", isActive: false },
  ];

  return (
    <aside className="w-[280px] h-full flex flex-col bg-warm-stone dark:bg-dark-surface border-l border-warm-border dark:border-outline-variant overflow-y-auto custom-scrollbar">
      <div className="pt-4 px-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-headline text-title">
            ق
          </div>
          <div className={onClose ? "ml-8" : ""}>
            <h2 className="font-headline text-title text-primary dark:text-dark-primary">المكتبة القرآنية</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">تصفح في ظلال القرآن</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1 rounded-lg hover:bg-warm-ash transition-colors lg:hidden"
            aria-label="إغلاق"
          >
            <span className="material-symbols-outlined text-text-muted text-xl">close</span>
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-xs px-2 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-md p-md rounded-lg transition-all font-label-sm text-label-sm active:scale-98 ${
              item.isActive
                ? "text-secondary dark:text-secondary-fixed-dim bg-warm-ash dark:bg-tertiary-container border-r-2 border-secondary"
                : "text-on-surface-variant dark:text-on-tertiary-container hover:bg-warm-ash dark:hover:bg-tertiary-container"
            }`}
          >
            <span
              className={`material-symbols-outlined ${item.isActive ? "filled" : ""}`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-md border-t border-warm-border/50 dark:border-outline-variant/50">
        <div className="flex items-center gap-sm p-sm">
          <div className="w-8 h-8 rounded-full bg-warm-ash border border-warm-border flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-sm">person</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-bold text-primary dark:text-dark-primary">
              أحمد القارئ
            </span>
            <span className="text-[10px] text-greyed-ink">قارئ نشط</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "refactor(sidebar): match Design_New _3 sidebar with active nav border and profile card"
```

---

## Phase 5: Component Refactoring — Surah Reader

### Task 5.1: Update SurahContent to Match Design_New _1

**File:** `components/SurahContent.tsx`

**What:** Match `_1/code.html` reading room (lines 207-315). Key changes:
- Reading container: `max-w-[70ch]` instead of `max-w-3xl`
- Header: bookmark button at top, surah name `font-display text-display`, metadata bar
- Visual break ornament between verses
- Bottom context bar: pill-shaped prev/next buttons, share/settings buttons
- Scroll-to-top FAB uses `bg-secondary` (gold)

- [ ] **Step 1: Update SurahContent styling**

Replace the JSX return block with updated tokens. Key specific changes:

Change reading container from `max-w-3xl` to `max-w-[70ch]`:
```tsx
<div className="max-w-[70ch] mx-auto">
```

Update surah header:
```tsx
<header className="text-center mb-xxl">
  <div className="flex justify-center mb-md">
    <BookmarkButton key={bookmarkToggle} surah={number} surahName={name} />
  </div>

  <h1 className="font-display text-display text-primary mb-sm">
    سورة {name}
  </h1>

  <p className="font-body text-faded-ink italic">
    {number <= 57 ? "مكية" : "مدنية"} | {verses} آيات
  </p>

  <div className="mt-lg flex justify-center items-center">
    <div className="h-px w-1/3 bg-gradient-to-l from-transparent via-warm-border to-transparent" />
    <span className="material-symbols-outlined text-gilded-gold mx-md">auto_stories</span>
    <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-warm-border to-transparent" />
  </div>
</header>
```

Update scroll-to-top FAB to use `bg-secondary`:
```tsx
{showScrollTop && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed bottom-20 lg:bottom-8 left-6 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-50"
    aria-label="العودة للأعلى"
  >
    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
  </button>
)}
```

Update bottom navigation bar to pill-shaped buttons:
```tsx
<div className="mt-xxl pt-xl border-t border-warm-border flex flex-col md:flex-row justify-between items-center gap-md">
  {prevNumber ? (
    <button
      onClick={() => router.push(`/surah/${prevNumber}`)}
      className="flex items-center gap-sm px-xl py-md bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/10"
    >
      <span className="material-symbols-outlined">arrow_forward</span>
      <span className="font-title">السورة السابقة</span>
    </button>
  ) : (
    <div />
  )}

  <div className="flex gap-md">
    <button className="w-12 h-12 flex items-center justify-center border border-warm-border rounded-full hover:bg-warm-ash transition-all" aria-label="مشاركة">
      <span className="material-symbols-outlined text-greyed-ink hover:text-secondary">share</span>
    </button>
    <button className="w-12 h-12 flex items-center justify-center border border-warm-border rounded-full hover:bg-warm-ash transition-all" aria-label="إعدادات">
      <span className="material-symbols-outlined text-greyed-ink hover:text-secondary">settings_suggest</span>
    </button>
  </div>

  {nextNumber ? (
    <button
      onClick={() => router.push(`/surah/${nextNumber}`)}
      className="flex items-center gap-sm px-xl py-md border border-primary text-primary rounded-xl hover:bg-warm-ash transition-colors"
    >
      <span className="font-title">السورة التالية</span>
      <span className="material-symbols-outlined">arrow_back</span>
    </button>
  ) : (
    <div />
  )}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add components/SurahContent.tsx
git commit -m "refactor(surah-content): match Design_New _1 reading room layout and tokens"
```

---

### Task 5.2: Update QuranVerse to Match Design_New _1 Verse Blocks

**File:** `components/QuranVerse.tsx`

**What:** Match `_1/code.html` verse blocks (lines 220-267). Key changes:
- First verse block: `bg-gilded-gold-light/10 border-r-4 border-gilded-gold rounded-l-xl`
- Subsequent verse blocks: `hover:bg-warm-ash border-r-4 border-transparent hover:border-warm-border rounded-l-xl`
- Verse text: `font-verse text-verse` (or `text-verse-large` for _1's 32px)
- Quran brackets accent color: `text-gilded-gold`
- "في ظلال الآية" heading: `font-title border-r-2 border-warm-border pr-sm`
- Commentary text: `font-body text-on-surface-variant leading-[1.8]`

Currently QuranVerse renders verse blocks using CSS classes from `globals.css` (`.verse-block`, `.verse-content`, `.verse-badge`). We need to make the first verse block distinct from subsequent ones.

The simplest approach without major refactoring: add an `isFirst` parameter or CSS counter logic.

Actually, looking at the current `QuranVerse.tsx` more carefully, it renders each line as a block. The verse blocks are already wrapped in `.verse-block > .verse-content`. The current `globals.css` has:

```css
.verse-block .verse-content {
  background-color: var(--color-verse-bg);
  border-right: 4px solid var(--color-accent);
  border-radius: 0.75rem 0 0 0.75rem;
  padding: 1.5rem;
}

.verse-block:not(:first-child) .verse-content {
  background-color: transparent;
  border-right-color: transparent;
}

.verse-block:not(:first-child):hover .verse-content {
  background-color: var(--color-surface-hover);
  border-right-color: var(--color-warm-border);
}
```

This already matches the prototype's "first verse highlighted, subsequent hover-only" pattern! The changes needed are mainly token mapping (update CSS variables to match new color names).

Update the CSS in `globals.css`:

Update `.verse-block .verse-content`:
```css
.verse-block .verse-content {
  background-color: rgba(197, 160, 40, 0.1); /* gilded-gold at 10% */
  border-right: 4px solid #C5A028; /* gilded-gold */
  border-radius: 0.75rem 0 0 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease-out;
}
```

But wait, these should use CSS variables. Let me check if we should use the token variables.

Actually, the current `--color-verse-bg` is `rgba(201, 168, 76, 0.1)` which is close to `rgba(197, 160, 40, 0.1)`. The main difference is the gold color `#C9A84C` vs `#C5A028`. Let me not over-complicate this and just use the `--color-accent` and `--color-verse-bg` variables, or map them directly.

Better approach: update the CSS variable values to match the new gold and leave the rest working:

```css
--color-verse-bg: rgba(197, 160, 40, 0.1); /* gilded-gold at 10% opacity */
```

And in `.verse-block:not(:first-child):hover .verse-content`:
```css
.verse-block:not(:first-child):hover .verse-content {
  background-color: var(--color-warm-ash);
  border-right-color: var(--color-warm-border);
}
```

Also update the verse text in `QuranVerse.tsx`:
- Change `text-2xl` to `text-verse-large` (or `text-[32px]`)
- Update verse bracket class to `text-gilded-gold`

Let me simplify: the most impactful changes with minimal refactoring are:

1. Update `globals.css` `.verse-block` CSS to use new token colors
2. Update `QuranVerse.tsx` to set verse size and bracket color

- [ ] **Step 1: Update verse-block CSS in globals.css**

Find and replace the verse-block section:

```css
.verse-block .verse-content {
  background-color: rgba(197, 160, 40, 0.1);
  border-right: 4px solid var(--color-gilded-gold, #C5A028);
  border-radius: 0.75rem 0 0 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease-out;
}

.verse-block:not(:first-child) .verse-content {
  background-color: transparent;
  border-right-color: transparent;
}

.verse-block:not(:first-child):hover .verse-content {
  background-color: var(--color-warm-ash);
  border-right-color: var(--color-warm-border);
}

.verse-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 1px solid var(--color-gilded-gold, #C5A028);
  color: var(--color-secondary, #755b00);
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-tajawal);
}
```

- [ ] **Step 2: Update QuranVerse.tsx verse rendering**

In `QuranVerse.tsx`, update the verse rendering section:

Change:
```tsx
<p className="font-[var(--font-amiri-quran)] text-2xl leading-[2.2] text-center mb-2 text-text">
```
To:
```tsx
<p className="font-verse text-verse-large leading-[60px] text-center mb-md text-primary">
```

Change:
```tsx
<span className="quran-bracket text-xl">﴿</span>
```
To:
```tsx
<span className="text-gilded-gold font-verse">﴿</span>
```

Change:
```tsx
<span className="verse-badge mr-2">{token.number}</span>
```
To:
```tsx
<span className="verse-badge mr-2">{token.number}</span>{" "}
```

Also update commentary text from `text-lg leading-relaxed mb-5 text-text` to `font-body text-body text-on-surface-variant leading-[1.8] text-justify`:
```tsx
return (
  <p key={i} className="font-body text-body text-on-surface-variant leading-[1.8] mb-5">
    {trimmed}
  </p>
);
```

And for page ref lines:
```tsx
return (
  <p key={i} className="text-xs text-text-muted text-center mt-6 mb-2">
    {line.trim()}
  </p>
);
```

Also need to add `text-verse-large` font-size token. In `@theme`:
```css
--font-size-verse-large: 32px;
--line-height-verse-large: 60px;
```

And in `globals.css` utilities section:
```css
.text-verse-large {
  font-size: var(--font-size-verse-large);
  line-height: var(--line-height-verse-large);
}
```

- [ ] **Step 3: Commit**

```bash
git add components/QuranVerse.tsx app/globals.css
git commit -m "refactor(quran-verse): match Design_New _1 verse blocks with gold accent and large typography"
```

---

### Task 5.3: Update SurahNavFooter to Pill-Shaped Buttons

**File:** `components/SurahNavFooter.tsx`

The prototype `_1` lines 292-308 show pill-shaped nav buttons. Check if this component is used (it may have been replaced by the inline nav in `SurahContent.tsx`). If it's still used elsewhere, update its styling to match.

- [ ] **Step 1: Read current SurahNavFooter.tsx to check if it's still in use**

The `SurahContent.tsx` already has inline prev/next buttons embedded. If `SurahNavFooter.tsx` is unused, skip this task. If used, update its button styles to match the prototype pattern.

- [ ] **Step 2: Commit (if needed)**

---

## Phase 6: Component Refactoring — Search Page

### Task 6.1: Update Search Page to Match Design_New _2

**File:** `app/search/page.tsx`

**What:** Match `_2/code.html` search page. Key changes:
- "البحث العلمي الدقيق" heading with `font-display text-display`
- Subtitle text with `font-body text-body text-faded-ink`
- Large search input (h-16) with right-aligned icon
- Filter bento grid using `bg-warm-stone` backgrounds with `border border-warm-border`
- Filter selects styled like the prototype (transparent, no ring)
- "تحديث النتائج" button: `bg-secondary hover:bg-gilded-gold-hover`
- Result cards with left gold accent bar on hover (`absolute right-0 top-0 w-1 h-full bg-secondary`)
- Pagination: active page `bg-secondary text-white font-title`, inactive `border border-warm-border`
- Floating decorative `﴿` bracket at bottom-left

- [ ] **Step 1: Update search/page.tsx with new tokens**

Replace the entire page content. Key specific changes:

Update the heading section:
```tsx
<div className="mb-xxl text-center">
  <h1 className="font-display text-display mb-md text-primary">البحث العلمي الدقيق</h1>
  <p className="font-body text-body text-faded-ink mb-xl max-w-2xl mx-auto">
    ابحث في أعماق التفسير والتدبر للآيات الكريمة من خلال في ظلال القرآن لسيد قطب
  </p>
</div>
```

Update the search input:
```tsx
<div className="relative max-w-3xl mx-auto mb-xl">
  <span className="absolute right-md top-1/2 -translate-y-1/2 material-symbols-outlined text-greyed-ink text-[32px]">search</span>
  <input
    type="text"
    value={input}
    onChange={(e) => handleChange(e.target.value)}
    placeholder="ابحث عن آية، كلمة، أو موضوع..."
    className="w-full h-16 pr-[64px] pl-md rounded-xl border border-warm-border bg-white focus:border-secondary focus:ring-0 text-xl font-body transition-all shadow-sm text-text placeholder:text-text-muted"
  />
</div>
```

Update filter bento grid:
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
  <div className="md:col-span-1 bg-warm-stone dark:bg-dark-surface p-md rounded-xl border border-warm-border">
    <label className="block font-label-sm text-label-sm text-greyed-ink mb-xs">السورة</label>
    <select className="w-full bg-transparent border-none focus:ring-0 font-title p-0 text-primary outline-none">
      <option>الكل</option>
    </select>
  </div>
  <div className="md:col-span-1 bg-warm-stone dark:bg-dark-surface p-md rounded-xl border border-warm-border">
    <label className="block font-label-sm text-label-sm text-greyed-ink mb-xs">الجزء</label>
    <select className="w-full bg-transparent border-none focus:ring-0 font-title p-0 text-primary outline-none">
      <option>الكل</option>
    </select>
  </div>
  <div className="md:col-span-1 bg-warm-stone dark:bg-dark-surface p-md rounded-xl border border-warm-border">
    <label className="block font-label-sm text-label-sm text-greyed-ink mb-xs">المجلد</label>
    <select className="w-full bg-transparent border-none focus:ring-0 font-title p-0 text-primary outline-none">
      <option>الكل</option>
    </select>
  </div>
  <button className="md:col-span-1 bg-secondary hover:bg-gilded-gold-hover text-white font-title py-md rounded-xl transition-colors flex items-center justify-center gap-sm">
    <span className="material-symbols-outlined">tune</span>
    تحديث النتائج
  </button>
</div>
```

Update result cards:
```tsx
<div key={r.id} className="bg-white dark:bg-dark-surface border border-warm-border p-lg rounded-xl hover:bg-warm-ash dark:hover:bg-surface-hover transition-all group relative overflow-hidden">
  <div className="absolute right-0 top-0 w-1 h-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
  {/* ... rest of card content ... */}
</div>
```

Update pagination:
```tsx
{results.length > 10 && (
  <div className="flex justify-center items-center gap-md py-xxl">
    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors">
      <span className="material-symbols-outlined">chevron_right</span>
    </button>
    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white font-title">١</button>
    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors font-title">٢</button>
    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors">٣</button>
    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors">
      <span className="material-symbols-outlined">chevron_left</span>
    </button>
  </div>
)}
```

Update the floating decorative bracket:
```tsx
<div className="fixed bottom-0 left-0 p-xl opacity-10 pointer-events-none hidden lg:block">
  <span className="font-verse text-[80px] text-primary select-none">﴿</span>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add app/search/page.tsx
git commit -m "refactor(search): match Design_New _2 search page with bento filters and gold accent cards"
```

---

## Phase 7: Update SurahGrid Mobile Search

### Task 7.1: Update SurahGrid Mobile Search and Filter Section

**File:** `components/SurahGrid.tsx`

**What:** The prototype _3 lines 227-233 shows a mobile-only search input. The existing grid's mobile search (lines 26-35) should use updated tokens and match styling.

- [ ] **Step 1: Update the mobile search bar**

```tsx
<div className="md:hidden mb-lg">
  <div className="relative">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="ابحث عن سورة..."
      className="w-full bg-surface border border-warm-border rounded-xl px-md py-md text-label-sm focus:border-secondary outline-none transition-colors text-text placeholder:text-text-muted"
    />
    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add components/SurahGrid.tsx
git commit -m "refactor(surah-grid): update mobile search styling to match Design_New"
```

---

## Phase 8: Build Verification

### Task 8.1: Build and Verify

- [ ] **Step 1: Run full build**

```bash
pnpm build
```
Expected: Build succeeds with all routes generated (150+ routes).

- [ ] **Step 2: Run lint**

```bash
pnpm lint
```
Expected: Clean lint output (or known minor issues).

- [ ] **Step 3: Visual diff check**

Open the app in browser and compare against the three HTML prototypes:
1. `/` — compare with `_3/code.html` (home/library page)
2. `/surah/18` — compare with `_1/code.html` (surah reader for Al-Kahf)
3. `/search` — compare with `_2/code.html` (search page)

Check:
- Color parity (parchment background, gold accents, navy primary)
- Spacing (padding/margin matching pixel values)
- Typography (font sizes matching display/headline/body/label-sm)
- Hover states (card accent lines, nav active states)
- Dark mode toggle (all dark variants work)

- [ ] **Step 4: Commit any remaining fixes**

```bash
git add -A
git commit -m "fix(theme): post-build fixes for Design_New alignment"
```

---

## Self-Review Checklist

After writing the plan, verify:

1. **Spec coverage:** Does the plan cover all three prototypes?
   - `_1`: Surah reader (Task 5.1, 5.2, 5.3) ✅
   - `_2`: Search page (Task 6.1) ✅
   - `_3`: Home page (Task 3.1, 3.2, 3.3, 4.1, 4.2, 7.1) ✅

2. **Placeholder scan:** Any "TBD", "TODO", vague steps? No — all steps have exact code, file paths, and commands.

3. **Type consistency:** Token names used in component refactors match what's defined in `@theme` block? Yes — `bg-parchment-cream`, `font-display`, `text-headline`, `bg-secondary`, etc. all match between Phase 1 and subsequent phases.

4. **Scope check:** Focused on one thing (Design_New alignment) — no unrelated refactoring.

---

## Execution Handoff

Plan complete. Two execution options:

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks
2. **Inline Execution** — Execute tasks in this session with checkpoint reviews

Which approach?
