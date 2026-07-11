# Luddy Major Explorer

**Live site:** https://akesha.github.io/luddyindy/

An interactive guide that helps prospective and undecided students find their fit among the 8 undergraduate majors at the Luddy School of Informatics, Computing, and Engineering at IU Indianapolis. All content — curriculum details, skills, salaries, and career outcomes — comes from Luddy's official program pages, and the site frames itself around a low-pressure message: "there's no wrong door."

## Four ways to explore

- **Swipe Quiz** — A deck of 14 "sounds like me?" cards (e.g., *"I lose track of time when I'm writing code"*). Students swipe right on statements that resonate and left on ones that don't, and their answers are scored against all 8 majors to produce ranked matches with explanations of *why* each major matched.

- **Browse Majors** — Card-grid view of all 8 majors with degree type, format (on-campus/online), skill tags, and outcome stats. Clicking Details opens a full profile: what you'll learn, skills you'll build, specializations, math and programming requirements, career paths, a quote from the program director, and a fictional "a day in this life" story that makes each career concrete.

- **Compare** — Pick 2–3 majors and see them side by side in a table: math required, programming languages, minor requirements, reported salary outcomes, specializations, and sample careers.

- **Start from Careers** — Works backwards: browse job titles grouped into clusters (Software, Data, AI, Healthcare, Creative, etc.) and tap any title to see which majors lead there.

## Personality and engagement

- **Scout**, a friendly mascot, follows along with contextual tips on every screen.
- **Explorer badges** (Pathfinder, Analyst, Dreamer, Deep Diver) unlock as students try each mode, with celebration toasts and confetti.
- **▶ Listen buttons** throughout read the content aloud using natural ElevenLabs voices — one voice for Scout, another for narration — served through a Cloudflare Worker so the API key stays private. Browsers fall back to built-in speech if the service is unavailable.

## Design and accessibility

IU crimson-and-cream branding with serif display type (Source Serif 4 + Public Sans); keyboard navigation for the quiz, screen-reader labels, visible focus states, and reduced-motion support. Progress is saved in `localStorage`, so students can leave and pick up where they left off. The footer points students to Luddy academic advising and IU counseling services, and is careful to frame career figures as historical outcomes, not guarantees.

## How it's built

| File | Purpose |
|---|---|
| `index.html` | The deployed app — the v2 design prototype, served as-is |
| `support.js` | Runtime that renders the prototype (loads React from CDN) |
| `tts-worker/` | Cloudflare Worker (`luddy-tts`) that proxies ElevenLabs text-to-speech; holds the API key as a secret, locks CORS to this site, and caches audio at the edge |
| `Luddy Major Explorer v2.dc.html` | Original v2 design file (source of `index.html`) |
| `Luddy Major Explorer.dc.html` | Original v1 design file, kept for reference |
| `screenshots/` | Reference captures of the v1 design |

Deployed via GitHub Pages on every push to `main`.

### Changing the voices

Voice IDs live in `tts-worker/worker.js` (`VOICES` map). After editing:

```
cd tts-worker && npx wrangler deploy
```

### Updating the ElevenLabs key

```
cd tts-worker && npx wrangler secret put ELEVENLABS_API_KEY
```

## Data honesty rules

Majors without published outcomes (AI, Full Stack Web Development) show "Not reported on program page"; the CS salary stat is labeled as a national BLS figure, not a program outcome. Career titles are common outcomes reported by the school — presented as potential paths, never guarantees.
