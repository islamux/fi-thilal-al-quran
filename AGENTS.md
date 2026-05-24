# في ظلال القرآن - Command Center: Agent Runbook & CLI Guide

Welcome to the **في ظلال القرآن Command Center**. This document is the single source of truth for AI agents and human developers working on the في ظلال القرآن project. It defines the workspace architecture, the operational CLI commands, and the specific roles of our registered AI agents.

---

## 🏗️ Workspace Architecture (Standalone Next.js App)

The project is a standalone Next.js web application for reading **في ظلال القرآن** — Sayyid Qutb's renowned tafsir.

* **`/` (Root):** Contains the Next.js application (`app/`, `components/`, `lib/`, `content/`), configuration files (`package.json`, `tsconfig.json`, `next.config.ts`), and this runbook.
* **`/command-center`**: Centralized planning hub — contains `design-spec.md`, `implementation-plan.md`, and `project-tracker.json`.
* **`/content/surahs/`**: 114 markdown files (one per surah) + `surahs-index.json` with metadata.
* **`/components/`**: Reusable React components (SurahGrid, QuranVerse, Sidebar, SearchDialog, etc.).
* **`/lib/`**: Utility modules (contentLoader, search, bookmarks, readingProgress).
* **`/scripts/`**: Python content extraction pipeline (.doc → structured markdown).
* **`/docs/source/`**: Original 22 `.doc` Word files (source material).

---

## 🛠️ CLI Commands

All commands are run from the project root.

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Full production build (includes content validation) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm extract` | Run full extraction pipeline (.doc → markdown) |
| `pnpm validate` | Validate all 114 surah content files |

---

## 🤖 Registered Agent Personas

The في ظلال القرآن project utilizes specialized AI agents to handle different domains of the software lifecycle. When assuming a role, adhere strictly to its responsibilities.

### 1. 🧠 Orchestrator (`orchestrator`)
* **Domain:** Project Management & Architecture.
* **Responsibilities:**
  * Maintains and updates `project-tracker.json` using absolute paths.
  * Transitions milestones between `backlog`, `active`, and `completed` states.
  * Registers new tasks, assigns priorities (`P0`, `P1`, `P2`), and logs history events.
* **Rule:** Never modify application code directly; delegate to specialized agents.

### 2. 📖 Arabic Specialist (`arabic-specialist`)
* **Domain:** Content Recovery & Linguistic Integrity.
* **Responsibilities:**
  * Extracts raw text from source `.doc` files and manually cleans it.
  * Ensures strict adherence to Modern Standard Arabic (Fusha).
  * Formats Quranic verses using `﴿ ﴾` brackets and verifies Hadith formatting.
* **Rule:** Avoid automated regex replacements that might cause structural corruption in Arabic text. Use surgical Python extraction.

### 3. ⚛️ Next.js Specialist (`nextjs-specialist`)
* **Domain:** Web Application UI/UX & Frontend Logic.
* **Responsibilities:**
  * Builds highly responsive, dynamic React components using TailwindCSS/Vanilla CSS.
  * Implements rich, premium aesthetics (glassmorphism, dark modes, micro-animations).
  * Ensures SEO best practices and fast page load times.
* **Rule:** Do not use generic colors or simple MVPs. UI must feel premium and state-of-the-art.

### 4. 🕵️ Explorer (`explorer`)
* **Domain:** Codebase Navigation & Analysis.
* **Responsibilities:**
  * Maps out complex directory structures and finds code dependencies.
  * Provides detailed codebase context to other agents before major refactors.

### 5. 🔬 Researcher (`researcher`)
* **Domain:** R&D and Prototyping.
* **Responsibilities:**
  * Tests new libraries, frameworks, or architectural patterns.
  * Creates scratch scripts for isolated testing.

### 6. 🛡️ Post-Build Auditor (`post-build-auditor`)
* **Domain:** QA & Performance.
* **Responsibilities:**
  * Verifies build success before deployment.
  * Audits bundle sizes, linting errors, and accessibility standards.

---

## 📌 Standard Operating Procedure (SOP)

1. **Check the Tracker:** At the start of any session, verify the `project-tracker.json` to see what is in the "Active" swim lane.
2. **Create Branch:** Before starting any task, create a new branch following the naming convention (see below).
3. **Execute Task:** Complete the assigned subtask using the appropriate agent persona.
4. **Update Tracker:** Once finished, mark the subtask as `done`, append a `history_log` entry, and move the milestone to `completed` if all subtasks are finished.
5. **Activate Next Milestone:** Immediately move the next backlog milestone into `active` so the TUI's "Active Milestones" section always shows progress. Never leave `active` empty.
6. **Commit & Push:** Commit your changes with a descriptive message and push to the remote repository.

---

## 🌿 Branch Naming Convention

All work must be done on branches. Never commit to `main` directly.

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New features | `feat/surah-grid`, `feat/quran-verse-component` |
| `fix/` | Bug fixes | `fix/content-encoding`, `fix/surah-nav-order` |
| `docs/` | Documentation | `docs/design-spec`, `docs/api-reference` |
| `refactor/` | Code restructuring | `refactor/content-pipeline`, `refactor/polish-qa` |
| `chore/` | Maintenance/tooling | `chore/update-deps`, `chore/project-scaffold` |

**Rules:**
1. Create a new branch **before starting any task** — never commit to `main`
2. Use **kebab-case** only: `feat/surah-grid` ✅, NOT `feat/surah_grid` or `feat/SurahGrid`
3. Commit messages follow conventional commits: `feat: add surah grid`, `fix: correct verse encoding`

## 🌿 GitHub Flow

1. **Add** — `git add <files>`
2. **Commit** — `git commit -m "<descriptive message>"`
3. **Push** — `git push -u origin <branch>`
4. **PR** — create pull request via GitHub CLI or web
5. **Accept PR** — merge to `main` via GitHub UI
6. **Keep branch** — do **not** delete the remote branch after merging
7. **Update local main** — `git checkout main && git pull origin main`
