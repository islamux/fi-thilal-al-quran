---
name: "في ظلال القرآن"
description: "Digital tafsir reader — browse, search, and read Sayyid Qutb's 30-volume Quranic exegesis"
colors:
  primary: "#1a365d"
  primary-hover: "#2a4a7f"
  accent: "#c9a84c"
  accent-hover: "#d4b85a"
  accent-light: "#f5e6b8"
  bg: "#faf8f5"
  bg-secondary: "#f0ece4"
  surface: "#ffffff"
  surface-hover: "#f5f0e8"
  text: "#1a1a2e"
  text-secondary: "#5a5a6e"
  text-muted: "#9a9aae"
  border: "#e2dcd0"
  border-light: "#f0ece4"
  success: "#2d6a4f"
  error: "#9b2c2c"
  dark-primary: "#7eb8e8"
  dark-accent: "#e2c06a"
  dark-bg: "#0f0f1a"
  dark-surface: "#1e1e32"
  dark-text: "#e8e4de"
typography:
  display:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  verse:
    fontFamily: "Amiri Quran, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 2
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
  button-icon:
    backgroundColor: transparent
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sm} {spacing.md}"
  card-surah:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  nav-header:
    backgroundColor: transparent
    textColor: "{colors.text}"
    height: "56px"
---

# Design System: في ظلال القرآن

## 1. Overview

**Creative North Star: "The Gilded Library"**

A digital reading room where the warmth of gold meets the weight of scholarship. Every surface is an invitation to linger — not through ornament, but through the generosity of warm neutrals, the quiet authority of ink-navy accents, and typography that disappears into the act of reading. This is not a dashboard. It is a space designed for contemplation: the reader should forget they are using an app and feel as though they have opened a book in a lamplit study.

The system explicitly rejects three things. First, the sterile whites and cold greys of modern SaaS — the text deserves gravity, not a laboratory. Second, loud Islamic ornamentation: no geometric patterns, no green-dome silhouettes, no gold swooshes that signal "heritage" through cliche. Third, corporate dashboard conventions — this is not a project management tool with a religious skin.

### Key Characteristics
- Warm, earthy neutral palette with a single gold accent used sparingly (≤10% of any screen)
- Typography-led hierarchy: the text is the interface
- RTL-first: born right-to-left, not adapted
- Layered depth through color, not shadows
- Contemplative motion: slow, deliberate, few
- Dark mode that inverts the warmth rather than flipping to cold blue-grey

## 2. Colors: The Gilded Palette

A restrained palette anchored by warm parchment neutrals and a single gold accent. The navy primary serves structural roles (navigation, links, active states); the gold accent marks sacred text and primary actions. Dark mode inverts warmth rather than discarding it — deep indigos replace cream, gold shifts warmer, and the overall feeling is that of a manuscript illuminated against the night.

### Primary
- **Ink Navy** (#1A365D / oklch(25% 0.045 260)): Navigation, links, active states, structural headings. Darkens to authority on light surfaces; lightens to a soft twilight blue (#7EB8E8) against dark backgrounds.
- **Ink Navy Hover** (#2A4A7F / oklch(32% 0.055 260)): Interactive primary states.

### Accent
- **Gilded Gold** (#C9A84C / oklch(72% 0.12 100)): The single accent. Used for Quranic verse brackets (﴿﴾), the search dialog highlight, the continue-reading banner, hover states on interactive elements. Never exceeds 10% of any screen.
- **Gilded Gold Hover** (#D4B85A / oklch(76% 0.12 100)): Interactive accent states.
- **Gilded Gold Light** (#F5E6B8 / oklch(92% 0.06 100)): Subtle backgrounds, selection highlight, verse emphasis.

### Neutral
- **Parchment Cream** (#FAF8F5 / oklch(97.5% 0.008 80)): Page background (light mode). A warm off-white that avoids clinical sterility.
- **Warm Stone** (#F0ECE4 / oklch(93% 0.01 80)): Secondary background, sidebar, footer.
- **Cream White** (#FFFFFF): Surface white for cards and dialogs. Pure #FFF is used here only as the lightest neutral step.
- **Warm Ash** (#F5F0E8 / oklch(94% 0.008 80)): Surface hover state.
- **Rich Ink** (#1A1A2E / oklch(15% 0.02 270)): Body text. A near-black with a whisper of navy warmth.
- **Faded Ink** (#5A5A6E / oklch(42% 0.02 270)): Secondary text, metadata.
- **Greyed Ink** (#9A9AAE / oklch(65% 0.02 270)): Muted text, placeholders.
- **Warm Border** (#E2DCD0 / oklch(88% 0.01 80)): Dividers and borders.
- **Light Border** (#F0ECE4 / oklch(93% 0.01 80)): Subtle dividers.

### Semantic
- **Forest Green** (#2D6A4F): Success states.
- **Brick Red** (#9B2C2C): Error states.

### Dark Mode Inversion
- **Deep Umber** (#0F0F1A / oklch(10% 0.015 270)): Page background. Deep indigo-black, not grey.
- **Midnight Slate** (#1E1E32 / oklch(18% 0.02 270)): Surface and card backgrounds.
- **Twilight Blue** (#7EB8E8 / oklch(72% 0.08 240)): Primary (dark). A soft, readable blue.
- **Warm Gold** (#E2C06A / oklch(78% 0.12 95)): Accent (dark). Slightly warmer than the light-mode accent for better readability on dark.
- **Warm Ivory** (#E8E4DE / oklch(90% 0.005 80)): Body text (dark).
- **Dusk Grey** (#A8A4A0 / oklch(68% 0.005 80)): Secondary text (dark).

### Named Rules
**The One Accent Rule.** Gilded Gold is the only accent. It marks sacred text and primary actions. If you need another color, use a neutral instead of introducing a second accent. Rarity is the point.
**The Inversion Rule.** Dark mode is not a greyscale inversion. Warmth carries through: dark surfaces lean indigo, not grey; the accent shifts warmer; text is ivory, not white.

## 3. Typography

**Display Font:** Tajawal (with system-sans fallback)
**Verse Font:** Amiri Quran (serif, for Quranic text only)
**Body Font:** Tajawal (sans-serif, for all UI and tafsir prose)

**Character:** A study in contrast. Tajawal's geometric clarity carries the interface and the tafsir commentary — clean, modern, confident. Amiri Quran brings centuries of calligraphic tradition to the verses themselves. The pairing says: this is a digital tool that respects an ancient text.

### Hierarchy
- **Display** (Tajawal 700, 2.25rem / 36px, 1.2): Page titles. Appears only on the homepage and surah headings. Set in ink navy or its dark-mode equivalent.
- **Headline** (Tajawal 700, 1.5rem / 24px, 1.3): Section headings. Used for juz titles, sidebar headers.
- **Title** (Tajawal 700, 1.125rem / 18px, 1.4): Surah card titles, dialog headings, navigation item labels.
- **Body** (Tajawal 400, 1rem / 16px, 1.8): All tafsir prose and UI labels. Generous line-height (1.8) ensures readability for long-form Arabic text. Line length capped at 70ch.
- **Verse** (Amiri Quran 400, 1.25rem / 20px, 2): Quranic verses. The elevated line-height creates breathing room for the Arabic script. Gold accent brackets mark verse boundaries.
- **Small** (Tajawal 400, 0.875rem / 14px, 1.5): Metadata, timestamps, reading progress labels.

### Named Rules
**The Disappearing Type Rule.** Typography should feel inevitable. No display faces on UI labels, no ornamental flourishes, no letter-spacing gimmicks. Tajawal handles everything except the Quranic text. Amiri Quran is reserved for verses and nothing else.

## 4. Elevation

The system uses layered depth through tonal color shifts rather than drop shadows. Surfaces at rest sit flat. Depth is communicated by how warm or cool a surface is relative to the page background: sidebars are one tonal step darker than the content area; cards are the same value as the surface but distinguished by a subtle border.

The header is the exception: a glass effect (backdrop blur + semi-transparent background) floats it above the page content, signaling that navigation is persistent and scroll-independent.

### The Glass Layer
- **Header** (`background-color: var(--color-glass); backdrop-filter: blur(12px)`): The only lifted surface. Signals navigational persistence.

### Tonal Layering
- **Page background** — Parchment Cream (light) / Deep Umber (dark): the canvas.
- **Secondary surface** (sidebar, footer) — Warm Stone (light) / Midnight Slate (dark): one tonal step deeper.
- **Surface** (cards, dialogs) — Cream White (light) / Midnight Slate (dark): same as the secondary surface in dark mode, separated by border in light mode.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat. No box-shadows on cards, no lifted buttons at rest. Depth is communicated by tonal layering, not by simulating physical elevation.

## 5. Components

### Buttons
- **Shape:** Gently rounded (8px / rounded-lg).
- **Primary (Gold):** Gilded Gold background, white text, 8px vertical padding, 16px horizontal padding. Hover shifts to Gilded Gold Hover. Used exclusively for primary actions (search, continue reading).
- **Icon buttons:** Transparent background, text-colored icon. Hover reveals a Warm Ash (light) / Midnight Slate (dark) background. Used in header and sidebar for search, theme toggle, menu toggle.
- **All buttons:** 150ms ease-out transition on background-color. Focus-visible ring in Gilded Gold.

### Inputs / Search Fields
- **Shape:** Generously rounded (12px / rounded-xl).
- **Style:** Cream White (light) / Midnight Slate (dark) background, Warm Border stroke. Inner icon in Greyed Ink.
- **Focus:** Border shifts to Gilded Gold. No glow.
- **Placeholder:** Greyed Ink.
- **States:** Hover darkens border slightly. Focus adopts the accent ring.

### Cards / SurahCards
- **Corner Style:** Gently rounded (12px / rounded-xl).
- **Background:** Cream White (light) / Midnight Slate (dark).
- **Border:** Warm Border (light) / Dark Border (dark) — 1px full border, not a side stripe.
- **Shadow:** None. Cards sit flat on the page.
- **Internal Padding:** 16px (p-4).
- **Hover:** Background shifts to Warm Ash (light) / Surface Hover (dark). No lift.
- **Content:** Surah number (Greyed Ink, small), surah name (Title, 18px bold, Rich Ink), accompanied by Arabic basmalah text. Hover reveals a subtle Gilded Gold accent on the surah number.

### Navigation (Header)
- **Style:** Full-width bar, glass effect (backdrop-blur + semi-transparent background). Fixed at the top. Border-bottom separates it from content.
- **Typography:** App title in Tajawal Bold, 20px (xl), Rich Ink.
- **Height:** 56px (h-14).
- **Mobile:** Contains hamburger menu (left, RTL) and action icons (search, theme toggle) on the right.
- **Desktop:** Hamburger hidden. Sidebar handles navigation.

### Navigation (Sidebar)
- **Style:** Fixed left (right in RTL) panel, secondary background (Warm Stone light / Midnight Slate dark). Scrollable surah and juz list.
- **Width:** Collapsible on mobile (overlay). Fixed ~280px on desktop.
- **Items:** Surah number + name. Active item highlighted with Gilded Gold number or subtle background.
- **Juz groups:** Expandable/collapsible with chevron toggle. Chevron has aria-expanded and aria-label for accessibility.

### Search Dialog
- **Style:** Modal overlay with semi-transparent backdrop (40% black + blur). Dialog surface is Cream White (light) / Midnight Slate (dark) with rounded-2xl corners.
- **Role:** Explicit `role="dialog"`, `aria-modal="true"`. Focus trap inside.
- **Results:** 12 rounded cards showing surah name and highlighted excerpt. Matches highlighted in Gilded Gold. Keyboard navigable (arrow keys + Enter).

### Reading Progress Bar
- **Style:** Fixed top bar, 3px height. Gilded Gold fill on a transparent track. Positioned below the header.
- **Behavior:** Updates on scroll. Smooth 200ms width transition.

### Bookmark Button
- **Style:** Transparent background button. Outline bookmark icon at rest, filled Gilded Gold icon when active. No tooltip — label is implicit in the icon state change.

### QuranVerse
- **Style:** Inline detection of verse number patterns `(N)`. Wraps Arabic text in ﴿ ﴾ brackets. Background tint (verse-highlight) at 6% gold opacity. Hover reveals a tooltip with the verse reference.

## 6. Do's and Don'ts

### Do:
- **Do** use the gold accent for Quranic verse brackets, search highlights, and primary actions only. Rarity gives it power.
- **Do** use typography to establish hierarchy. Three weight steps + generous line-height carry the reading experience.
- **Do** prefer tonal layering over shadows for depth. Vary surface warmth, not Y-offset.
- **Do** wrap verse text in ﴿ ﴾ brackets with the gold-tinted background.
- **Do** respect RTL natively. Icons, spacing, and gestures originate from the right.
- **Do** keep body text at 1rem with 1.8 line-height for legible long-form Arabic.
- **Do** apply the glass effect to the header only — one floating surface is enough.

### Don't:
- **Don't** use side-stripe borders (border-left or border-right >1px as a colored accent). Use full borders or background tints instead.
- **Don't** use gradient text (`background-clip: text` with a gradient). Single solid colors only.
- **Don't** use glassmorphism decoratively. The header's glass is the only instance — purposeful and singular.
- **Don't** build identical card grids. Vary card content: surah cards show number + name + basmalah; search results show excerpts; juz cards show the surah list.
- **Don't** use modals as a default pattern. Exhaust inline alternatives first.
- **Don't** use generic SaaS colors (sterile white #FAFAFA, cold blue accents, grey-on-grey tables). Warm every neutral toward the parchment base.
- **Don't** use loud Islamic ornamentation (geometric patterns, green domes, gold swooshes). The design's reverence is in restraint, not decoration.
- **Don't** use dark-mode grey scales. Dark surfaces lean indigo; text is warm ivory, not pure white.
- **Don't** animate layout properties. No height, width, position transitions. Use opacity and transform only.
- **Don't** use bounce or elastic easing. Stick to ease-out-expo or ease-out-quart for all motion.
