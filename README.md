# Handoff: Luddy Major Explorer

## Overview
An interactive major-exploration tool for **prospective students** of the Luddy School of Informatics, Computing, and Engineering (IU Indianapolis). It helps students discover the school's 8 undergraduate majors through four entry points: a 6-question interest quiz, a browse-all-majors grid, a side-by-side comparison (2–3 majors), and a careers-first view that works backwards from job titles to majors. All content is sourced from official Luddy program pages and a Major Exploration presentation; career figures are always framed as "potential paths / common outcomes," never guarantees.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing intended look and behavior, not production code to copy directly. Your task is to **recreate this design in the target codebase's existing environment** (React, Vue, etc.) using its established patterns and libraries. If no environment exists yet, choose an appropriate modern framework (React + a component library or plain CSS is fine) and implement the design there.

`Luddy Major Explorer.dc.html` is the full prototype. It contains an HTML template plus a JavaScript logic class (state + derived data). All copy, data structures, quiz weights, and career mappings you need are in that file — treat its embedded data as the content source of truth.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interactions are final. Recreate the UI pixel-perfectly using your codebase's conventions.

## Design Tokens

### Colors
- Crimson (primary / brand): `#990000`
- Crimson dark (hover): `#7A0000`, `#6B0000`
- Ink (text): `#1E1A17`
- Body text secondary: `#4A423C`
- Muted text: `#6B6259`
- Page background (cream): `#F7F4EF`
- Card background: `#FFFFFF`
- Border: `#E2DACF`
- Border subtle: `#EFE9DF`
- Accent chip background: `#F3E9DD`, chip text: `#6B3A1F`
- Header pink text (on crimson): `#F0C9C9`, `#F5E3E3`
- Footer background: `#1E1A17`, footer text: `#BDB3A8`, footer accent: `#C9A88A`, footer link: `#E8A87C`
- Row-label background (compare table): `#FBF9F5`

### Typography
- Display / headings: **Source Serif 4**, weight 600–700 (Google Fonts)
- UI / body: **Public Sans**, weights 400–800 (Google Fonts)
- Scale: hero h1 42px/1.12; section h2 30–32px; card titles 21–22px serif 700; body 14–17px/1.5–1.6; kickers 12–13px, 700, uppercase, letter-spacing 0.08–0.14em; chips 12–13px.

### Spacing & shape
- Max content width: 1160px, side padding 28px
- Card radius 14px; buttons 8–9px; inputs/inner cards 10–12px; pills 999px
- Card padding 22–24px; grid gaps 16px (cards), 10px (small cards)
- Shadows: hover `0 8px 24px rgba(25,15,5,0.10)`; detail drawer `-16px 0 48px rgba(25,15,5,0.25)`
- Entry animation: `fadeUp` — opacity 0→1, translateY(10px)→0, 0.35s ease

## Screens / Views
A single-page app with 5 tab views + a slide-in detail drawer. Persist app state (view, quiz answers, compare selection) to `localStorage`.

### Shared chrome
- **Header** (crimson `#990000`): uppercase kicker "Luddy School of Informatics, Computing, and Engineering · IU Indianapolis" in `#F0C9C9`; serif title "Find your major" 30px; right-aligned subtitle. Below: tab nav — buttons with top-rounded corners (8px 8px 0 0); active tab bg `#F7F4EF` / text crimson, inactive bg `rgba(255,255,255,0.1)` / white text. Tabs: Home, Interest Quiz, Browse Majors, Compare, Start from Careers.
- **Footer** (dark `#1E1A17`): "Talk it through with a human" block with advisor email link (configurable; placeholder `luddyadvising@iu.edu`) and a note that IU counseling services (CAPS) are available; right column: disclaimer that career figures are historical outcomes framed as potential paths, with sources.

### 1. Home
- Hero (max-width 720px): serif h1 "Not sure which major fits? Let's figure it out together." + supporting paragraph.
- 4 entry cards in `repeat(auto-fit, minmax(240px,1fr))` grid. Each: crimson uppercase kicker, serif title, gray description, crimson "cta →" pinned to bottom. Hover: lift 2px, shadow, crimson border. Cards route to Quiz / Browse / Compare / Careers.
- Stats strip (dark bg, radius 14px, toggleable): "Luddy Indianapolis at a glance" — 8 undergraduate majors, $60K median B.S./B.A. starting salary, 104 internships. Serif 30px numbers, 13px labels in `#BDB3A8`.

### 2. Interest Quiz
- Progress: "Question N of 6" + 6px progress bar (crimson fill on `#E2DACF`, animated width).
- Question as serif h2 30px; options as full-width white cards (radius 12px) with a lettered circle badge (28px, `#F3E9DD` bg, crimson letter). Hover: crimson border + shadow.
- "← Back" and "Start over" text buttons below.
- **Results state** (after 6 answers): heading "Majors that align with your interests" + disclaimer copy ("starting points, not verdicts"). Top-3 ranked cards: rank badge (34px crimson square, radius 10px), serif major name, pill "NN% interest alignment" (crimson on `#F3E9DD`), tagline, "Because you chose:" reason chips (labels of the user's high-weight answers, max 3), and two buttons: "Explore this major" (solid crimson) and "Add to compare" (outline).
- Scoring: each option carries per-major weights (1–3); score = sum; alignment % = score / top score × 100. Weights are in the prototype's `QUESTIONS` array — port verbatim.

### 3. Browse Majors
- Header row: serif h2 "All 8 majors, side by side" + dynamic hint text that walks users through comparing: 0 selected → 'Tip: click "+ Compare" on 2–3 majors, then open the Compare tab'; 1 selected → "add at least one more…"; 2+ → hint plus a solid-crimson **"Compare selected →"** button that navigates to the Compare view.
- Cards in `repeat(auto-fill, minmax(300px,1fr))` grid. Each card: degree kicker (crimson uppercase), serif name, format pill (top-right), tagline, skill chips, an optional headline stat with dashed top border ("$90K median annual starting salary…"), and buttons **Details** (solid crimson) + **+ Compare** toggle (outline; selected state: crimson border, `#F3E9DD` bg, crimson text, label "✓ In compare").

### 4. Compare
- Picker: 8 pill toggles (selected: solid crimson/white). Max 3 selections — picking a 4th drops the oldest.
- Empty state (<2 selected): dashed-border panel "Select at least two majors above to compare them."
- Table: white card, CSS grid `170px repeat(N, 1fr)`, min-width 700px with horizontal scroll. Header row: serif major names + degree/format subline, 2px dark bottom border. Row labels: crimson uppercase 12px on `#FBF9F5`. Rows: Format, Degree, Math required, Programming, Minor/specialization, Reported outcomes (or "Not reported on program page"), Specializations, Sample career paths (first 5).

### 5. Start from Careers
- Intro: "Start from the career, work back to the major" + disclaimer that titles come from Luddy program pages — common outcomes, not guarantees.
- 8 clusters (Software & Web Development; Data & Analytics; AI & Intelligent Systems; Health & Healthcare; UX & Design; Creative & Media; Security & Infrastructure; Management & Consulting). Cluster heading: serif 20px with an 8px crimson dot.
- Job cards in `minmax(260px,1fr)` grid: bold title + major chips (crimson text on `#F3E9DD`; hover inverts to solid crimson). Clicking a chip opens that major's detail drawer.

### Detail drawer (overlay)
- Opens from Details buttons, quiz results, or career chips. Dimmed backdrop `rgba(30,26,23,0.5)` (click to close); right-side panel `min(640px, 94vw)`, white, scrollable.
- Crimson header: "← Close" ghost button, "DEGREE · FORMAT" kicker, serif 32px name, tagline in `#F5E3E3`.
- Body sections (28px gap): stat cards (cream bg, serif crimson value); "What you'll learn" (paragraph + bullet list with bolded lead-ins); "Skills you'll build" chips; "Specializations" bordered cards (if any); a 2-column cream panel "Math you'll need" / "Programming"; "Potential career paths" chips with disclaimer; program-director blockquote (crimson left border, serif italic); "How it's different" paragraph; footer buttons — compare toggle (outline crimson) + "Official program page ↗" link to luddy.indianapolis.iu.edu.

## Interactions & Behavior
- Tab navigation swaps views; opening a view clears the detail drawer.
- Quiz: picking an option records the answer and advances; Back removes the last answer; Start over resets. Results render after the 6th answer.
- Compare selection is shared app-wide (browse cards, quiz results, picker pills, drawer button all toggle the same set, cap 3 with FIFO eviction).
- Detail drawer: Escape/backdrop-click close (backdrop-click implemented; add Escape).
- All state persists to `localStorage` (key in prototype: `luddy-explorer-v1`) so reloads restore the session.
- View transitions use the `fadeUp` animation.

## State Management
- `view`: 'home' | 'quiz' | 'browse' | 'compare' | 'careers'
- `activeId`: major id for the detail drawer, or null
- `quizIndex` (0–5) and `quizPicks`: array of `{qi, oi}` chosen options
- `compareIds`: array of up to 3 major ids
- No data fetching — all content is static (embed or serve as JSON).

## Data
The prototype embeds three structures (port them verbatim from the logic class in `Luddy Major Explorer.dc.html`):
- `M` — 8 majors (ids: ai, bmi, cs, ds, fswd, him, inf, mas) with name, degree, formats, tagline, blurb, learn bullets, skills, specializations, careers, outcome stats, math/programming requirements, minor rules, program-director quote, and "how it's different" copy.
- `QUESTIONS` — 6 quiz questions with weighted options.
- `CAREERS` — 8 career clusters mapping job titles → major ids.

Content honesty rules baked into the design: majors without published outcomes (AI, Full Stack Web Development) show "Not reported on program page"; the CS salary stat is labeled as a national BLS figure, not a program outcome.

## Configurable options
- `advisorContact` (string, default `luddyadvising@iu.edu` — a placeholder; replace with the real advising contact)
- `showOutcomes` (boolean, default true) — toggles the Home stats strip

## Assets
None. No images or icon fonts — the design uses only type, color, and simple shapes. Fonts load from Google Fonts (Source Serif 4, Public Sans).

## Files
- `Luddy Major Explorer.dc.html` — full prototype: HTML template + logic class containing all data, quiz weights, and career mappings.
- `screenshots/` — reference captures of every view: home, quiz question, quiz results, browse (default + with compare selections), compare table, careers, and the detail drawer.
