# Project Brief & PRD: في ظلال القرآن (In the Shade of the Qur'an)

## 1. Project Overview
**في ظلال القرآن** is a premium, scholarly digital platform for reading and exploring Sayyid Qutb's renowned 30-volume Quranic exegesis (Tafsir). The mission is to transform a dense, traditional text into an immersive, contemplative digital reading experience that respects the gravity of the work while leveraging modern web capabilities.

### 1.1 Creative North Star: "The Gilded Library"
The design departs from sterile SaaS conventions and loud ornamental clichés. It aims to evoke the feeling of a private, lamplit study—a "Gilded Library" where warmth, typography, and silence prioritize the act of reading and reflection.

---

## 2. Target Audience
*   **Students of Knowledge:** Readers seeking a structured, legible way to study the Tafsir.
*   **Casual Readers:** Individuals looking for a beautiful, distraction-free environment for daily Quranic reflection.
*   **Researchers:** Users needing precise search and cross-referencing capabilities within the 30-volume work.

---

## 3. Functional Requirements

### 3.1 Content Library & Browsing
*   **Surah Grid:** A visual index of all 114 surahs, displaying surah number, name (Arabic/English), type (Makki/Madani), and ayah count.
*   **Juz/Hizb Navigation:** Hierarchical navigation allowing users to jump to specific structural divisions of the Quran.
*   **Continue Reading:** A persistent state tracking the user's last read position, presented as a primary CTA on the library homepage.

### 3.2 Immersive Reading Experience
*   **Verse-Tafsir Interleaving:** A layout that elegantly pairs Quranic verses (Amiri Quran font) with their corresponding exegesis (Tajawal font).
*   **Verse Highlighting:** Visual grouping of verses using ﴿ ﴾ brackets and a subtle gold background tint (#F5E6B8 at low opacity).
*   **Reading Progress:** A non-intrusive progress bar indicating depth within a specific surah or volume.
*   **Interactive Tooltips:** Hover/tap states on verse numbers to show quick references or translation snippets.

### 3.3 Search & Discovery
*   **Global Search:** A fast, fuzzy-search engine capable of searching both Quranic text and the extensive Tafsir prose.
*   **Contextual Results:** Search results must display snippets with highlighted keywords in "Gilded Gold" to provide immediate context.
*   **Filtering:** Ability to narrow search results by specific surahs, juz, or volumes.

### 3.4 Personalization (Future Scope)
*   **Bookmarks:** Ability to save specific verses or sections of the Tafsir.
*   **Personal Notes:** A margin-note system for users to record reflections alongside the text.
*   **Display Settings:** User control over font size, line height, and theme (Light/Dark).

---

## 4. Design System Specifications

### 4.1 Visual Language
*   **Palette:** Anchored by **Parchment Cream** (#FAF8F5) and **Ink Navy** (#1A365D), with **Gilded Gold** (#C9A84C) as the singular, high-impact accent.
*   **Elevation:** Tonal layering over shadows. Depth is achieved by shifting background warmth (e.g., Warm Stone sidebars) rather than Y-offsets.
*   **Motion:** High-inertia, deliberate transitions (ease-out-expo). No "bouncy" or "corporate" animations.

### 4.2 Typography Hierarchy
*   **Sacred Text:** *Amiri Quran* (Serif). Reserved strictly for verses.
*   **Interface & Prose:** *Tajawal* (Sans-serif). Used for all UI labels, headings, and Tafsir commentary.

---

## 5. Technical Architecture (Next.js Standalone)

### 5.1 Tech Stack
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS (utilizing the Gilded Library design tokens)
*   **Content:** Markdown-based surah files stored in `/content/surahs/`
*   **Icons:** Lucide React or similar clean line-art icons.

### 5.2 Agent Roles (Operational)
The project utilizes a specialized multi-agent workflow:
*   **Orchestrator:** Project management and milestone tracking.
*   **Arabic Specialist:** Linguistic integrity and content extraction.
*   **Next.js Specialist:** UI/UX implementation and frontend logic.
*   **Explorer/Researcher:** Navigation, analysis, and prototyping.

---

## 6. Success Metrics
*   **Time-on-Page:** Increased duration of reading sessions (target >10 mins).
*   **Search Accuracy:** High relevance in the first 5 results for thematic queries.
*   **Accessibility:** WCAG AA compliance for contrast and RTL screen-reader optimization.
