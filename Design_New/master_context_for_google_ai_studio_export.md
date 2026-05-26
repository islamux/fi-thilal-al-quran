# في ظلال القرآن - Master Project Context (The Gilded Library)

This document consolidates the entire Design System, Technical Architecture, and UI Blueprint for the "في ظلال القرآن" project. Use this as the primary context when prompting models in Google AI Studio.

---

## 1. Project Overview & Creative North Star
**Mission:** A premium, immersive digital reading experience for Sayyid Qutb's 30-volume Quranic exegesis.
**Creative Direction: "The Gilded Library"**
- **Vibe:** A private, lamplit study. Warmth over clinical sterility.
- **Rules:** No loud ornamentation. No generic SaaS grey/blue. No shadows (tonal layering only).
- **RTL-First:** Built natively for Arabic.

---

## 2. Visual DNA (DESIGN.md)

### Colors (Gilded Palette)
- **Primary:** #1A365D (Ink Navy) - Navigation, structural elements.
- **Accent:** #C9A84C (Gilded Gold) - Sacred text brackets ﴿ ﴾ and primary CTAs. Use sparingly (≤10%).
- **Neutral BG:** #FAF8F5 (Parchment Cream) - Page background.
- **Dark Mode:** Deep Umber (#0F0F1A) and Midnight Slate (#1E1E32). Invert warmth, don't just use grey.

### Typography
- **UI & Prose:** `Tajawal` (Sans-serif). Clean, geometric.
- **Sacred Verses:** `Amiri Quran` (Serif). Only for Quranic text.

---

## 3. Global Styles (theme.css)

```css
@theme {
  --font-tajawal: "Tajawal", sans-serif;
  --font-amiri: "Amiri Quran", serif;
  --color-primary: #1a365d;
  --color-accent: #c9a84c;
  --color-bg: #faf8f5;
  --color-surface: #ffffff;
  --color-warm-border: #e2dcd0;
}

@layer base {
  :root { background-color: var(--color-bg); direction: rtl; font-family: var(--font-tajawal); }
  .font-verse { font-family: var(--font-amiri); line-height: 2; }
  .glass-header { background-color: rgba(250, 248, 245, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-warm-border); }
}
```

---

## 4. UI Architecture & Components (Next.js Blueprint)

### Global Layout (app/layout.tsx)
```tsx
import { Tajawal, Amiri_Quran } from 'next/font/google';
import './theme.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-bg text-text-ink font-tajawal antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Key Components
- **TopAppBar:** Fixed glass header with search and theme toggle.
- **SideNavBar:** 280px sidebar for Library navigation.
- **SurahCard:** Rounded-xl cards with tonal hover states (#F5F0E8).
- **QuranVerse:** Verse text wrapped in ﴿ ﴾ with gold brackets and subtle bg tint.

---

## 5. Screen Blueprints (HTML References)

### Screen 1: Library (المكتبة)
- **Hero:** "Continue Reading" banner with #8B7333 (Dark Gold) background.
- **Grid:** 3-column (desktop) responsive grid of Surah cards.

### Screen 2: Reading Room (غرفة القراءة)
- **Header:** Large surah calligraphy/title section.
- **Content:** Interleaved blocks. Verse (Amiri Quran) followed by Tafsir (Tajawal).
- **Sticky Footer:** Floating navigation pill (Primary Navy) for Surah Prev/Next.

---

## 6. Operational Rules (AGENTS.md)
- **Role:** Act as a "Next.js Specialist".
- **Code Standard:** Premium Tailwind v4, Lucide icons, accessible ARIA labels.
- **Linguistic Integrity:** Strict Modern Standard Arabic. Never modify Quranic text structure.
- **Commands:** `pnpm dev`, `pnpm build`, `pnpm extract`.
