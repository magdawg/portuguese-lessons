# Lesson page design contract

This document is the canonical spec for a Portuguese-lesson page in this repo. It pairs with the Eleventy layout `src/_includes/base.njk` (which supplies all chrome) and the per-lesson **front-matter schema** (below). A lesson is no longer a standalone HTML file — it is a **content file** of front-matter + section markup.

A skill that generates new lessons should:
1. Read this doc to understand the design system and conventions.
2. Read the worked examples `src/lessons/aulas_mariana_2026-06-03.html` (with homework) and `src/lessons/aulas_mariana_2026-04-15.html` (without) to see the exact shape.
3. Create one content file `src/lessons/aulas_mariana_YYYY-MM-DD.html` with the front-matter block + sections 1–7 (and optional section 8). Run the build to preview; the chrome, navigation, CSS/JS, score engine, and index card all come for free.

## What this site is

A personal European-Portuguese (PT-PT) study companion. One student (Magda), one teacher (Mariana). It is an **Eleventy (11ty) static site**: input `src/`, output `_site/`. Each lesson is a content file (YAML front-matter + the lesson `<section>` blocks) with grammar tables, vocabulary, a reconstructed dialogue, and interactive exercises whose state lives in `localStorage`. All chrome (head, header, both pagers, lightbox, footer) is defined once in the layout `src/_includes/base.njk`; CSS and JS are **shared assets** (`src/assets/lesson.css`, `src/assets/lesson.js`) linked by the layout. There is **no inline `<style>`/`<script>` in lesson files** and no per-file `LS_KEY`. The site is built by GitHub Actions and deployed to GitHub Pages on every push to `main`; it runs under the path prefix `/portuguese-lessons/`.

Build commands: `npm install` once, then `npm run build` (one-off) or `npm run serve` (dev server at `http://localhost:8080/portuguese-lessons/`). `_site/` is gitignored — the repo is source-only.

## Front-matter schema

Every lesson content file opens with a YAML front-matter block. The layout reads these fields; **never hand-type dates** anywhere in the body — the `date` field drives the displayed dates, the sort order, prev/next navigation, the index card, and the `localStorage` key.

| Field | Required | Meaning |
|-------|----------|---------|
| `title` | yes | The h1 / page title. Raw HTML (may contain entities like `&amp;`). |
| `subtitle` | yes | One-sentence lesson summary under the h1. Raw HTML. |
| `date` | yes | `YYYY-MM-DD`, the real class date. Drives sort, prev/next, all displayed dates, and the storage key. |
| `level` | yes | e.g. `"Nível A2 → B1"`. |
| `origin` | yes | Badge text, e.g. `"Baseada na aula real"`. |
| `teacher` | yes | e.g. `"Professora Mariana"`. |
| `cardTitle` | yes | Title shown on the index card. Raw HTML (may contain `<em>`). |
| `topics` | yes | Topic summary for the index card. Raw HTML. |
| `accent` | yes | Index-card accent colour, e.g. `var(--gold-text)`. |
| `nextNote` | no | Footer "Próxima aula:" note. Raw HTML. Omit if unknown. |
| `footerProvenance` | no | Footer provenance text; defaults to `"Lição gerada a partir da aula real com a Mariana"`. |

Example block:

```yaml
---
title: "Aula com a Mariana: Saúde, Casa &amp; Viagens à Madeira"
subtitle: "Uma aula de conversa real, transformada num guia de estudo completo."
date: 2026-06-03
level: "Nível A2 → B1"
origin: "Baseada na aula real"
teacher: "Professora Mariana"
cardTitle: "Saúde, Casa &amp; Viagens à Madeira"
topics: "Pretérito imperfeito vs. perfeito, quantificadores (<em>tão/tanto</em>)."
accent: "var(--gold-text)"
nextNote: "quarta-feira, 17 de junho"
---
```

The `.eleventy.js` config provides the filters the layout uses: `ptDateLong`, `ptDateShort`, `ptDateISO`, `ptStorageKey`, and a `lesson` collection (tag `lesson`, sorted oldest → newest). Directory data `src/lessons/lessons.11tydata.js` applies `layout: base.njk`, `tags: lesson`, and the `permalink` so the built page keeps the old URL `aulas/aulas_mariana_YYYY-MM-DD.html`.

## Visual identity

- **Palette**: forest green primary (Portuguese flag), gold accent for "real" / personal moments, deep blue for translations / info, deep red for warnings and key highlights. Each saturated color has a `-light` background variant. The page background is a warm-near-white (`--paper: #fcfbf7`).
- **Two-family type system**:
  - `'EB Garamond', Georgia, serif` for all headings and display text. A real Claude-Garamond revival with italic, weights 400-700.
  - `'Hanken Grotesk', system-ui, sans-serif` for body, UI, pills, buttons. A neo-grotesque with character, weights 400-700.
  - Both load from Google Fonts in a single request.
- **One header look**: solid green `var(--green)` with white text. No gradient, no corner decoration, no glass effect. Headings use `text-wrap: balance` and `letter-spacing: -0.01em`.
- **Cards**: white background, 1px `--border`, `border-radius: 14px`, single subtle shadow (`0 1px 2px rgba(27,94,32,.05)`), generous fluid padding.

## Design tokens (`:root`)

| Token            | Value         | Use                                       |
|------------------|---------------|-------------------------------------------|
| `--green`        | `#1B5E20`     | Brand primary, h2, links, focus rings     |
| `--green-light` | `#e8f1e9`     | Goal pills, table headers, nav hover       |
| `--red`          | `#B71C1C`     | Mariana's speaker name, verb endings, reset hover |
| `--red-light`   | `#fbeaea`     | Warn callout bg                            |
| `--gold`         | `#F9A825`     | "Baseada na aula real" badge bg, score-bar gradient |
| `--gold-text`   | `#8a5e00`     | Foreground gold on white (WCAG-safe)       |
| `--gold-light`  | `#fdf3dc`     | Tip callout bg                             |
| `--blue`         | `#1565C0`     | English glosses, student speaker, IPA      |
| `--blue-light`  | `#e7f0fa`     | Culture callout bg, choice hover           |
| `--ink`          | `#20302a`     | Body text                                  |
| `--muted`        | `#5b6b63`     | Secondary text, lead paragraphs            |
| `--paper`        | `#fcfbf7`     | Page background                            |
| `--card`         | `#ffffff`     | Card / table / dialogue background         |
| `--border`       | `#e3e0d6`     | All structural 1px borders                 |
| `--ok` / `--ok-bg`   | `#2e7d32` / `#e6f4e7` | Correct-answer state              |
| `--err` / `--err-bg` | `#c62828` / `#fcebea` | Incorrect-answer state            |
| `--shadow`       | `0 1px 2px rgba(27,94,32,.05)` | Card shadow                |
| `--space-2`…`--space-8` | `8px`…`64px` | Spacing scale (4pt base)             |

## Page structure (the seven sections)

A content file holds **only** the lesson sections — the numbered `<section>` blocks below. The header, both pagers, the worksheet lightbox, the footer, and the CSS/JS links all live in the layout (`src/_includes/base.njk`); do not put them in the content file. Every lesson follows this outline. The numbered chip in `<h2><span class="num">N</span> ...</h2>` makes the order visible to the reader.

1. **Resumo da aula** — what the student talked about / heard / read. Short narrative paragraph(s).
2. **O que vamos aprender hoje** — 3-5 concrete objectives in `<ul class="goals">`. Each item is `<li>{PT statement}<span class="t">{EN gloss}</span></li>`.
3. **Gramática** — the substance. One `<h3>` per topic. Use tables for conjugations (`<span class="end">` for endings, `<span class="stem">` for stems), `<div class="callout tip/warn/culture">` for rules and asides.
4. **Vocabulário** — words and expressions. Often a 2-column PT/EN table. Use `<span class="ipa">[...]</span>` for phonetic notation.
5. **Diálogo reconstruído** — a reconstructed conversation. `<div class="dialogue">` wraps `<div class="turn m">` (teacher, red) and `<div class="turn a">` (student/Aluna, blue). Each turn includes `<span class="who">` and `<span class="line">` with optional `<span class="tr">` for English gloss.
6. **Exercícios** — interactive practice. The sticky `<div class="scorebar">` lives inside this card and only sticks while the user is in this section. Supports four exercise types (see below).
7. **Resumo e autoavaliação** — take-home points + `<ul class="selfcheck">` of can-do statements + closing tip callout.
8. **Trabalho de casa** (OPTIONAL) — the homework the teacher actually assigned: listening tracks and/or scanned worksheet pages. Only present when the lesson has assets (see below). When omitted, the lesson ends at section 7.

Navigation is **automatic**: the layout computes prev/next (← Anterior · Voltar ao início · Próxima →) from the `lesson` collection. The oldest lesson gets a disabled "—" previous; the newest gets a disabled "Em breve" next. Adding a lesson updates its neighbours' pagers on its own — content files contain no nav, header, or footer.

## Header

The header is rendered by the layout from front-matter — you do **not** write header markup in the content file. For reference, the layout produces:

```html
<header>
  <div class="header-inner">
    <div class="badges">
      <span class="badge real">📝 {{ origin }}</span>
      <span class="badge">{{ level }}</span>
      <span class="badge">🗓️ {{ date | ptDateLong }}</span>
      <span class="badge">👩‍🏫 {{ teacher }}</span>
    </div>
    <h1>{{ title }}</h1>
    <p class="subtitle">{{ subtitle }}</p>
  </div>
</header>
```

- The `.badge.real` gold badge marks lessons reconstructed from a real class (it carries the `origin` value).
- Other badges carry metadata. **Emojis are encouraged** in badges and in body content — they're functional learning cues here, not decoration.

## Visual cue conventions

The lesson page deliberately uses **multiple colors** because they map to semantics. Keep this consistent in any new content:

| Color | Use |
|-------|-----|
| Green | Correct, success, theme primary, section heads, "real" stamps |
| Red | Mariana's voice (teacher), verb endings highlighted for emphasis, warnings, incorrect answers |
| Blue | English translations / glosses, student voice (Aluno/a), IPA, culture notes, neutral focus state on inputs |
| Gold | Tips, takeaways, the "real-lesson" badge, score-bar gradient terminus, partial-credit pill |

Inside content, the recurring inline spans:
- `<strong>...</strong>` — bold (default ink) for key terms
- `<em>...</em>` — italic, often for foreign words being defined
- `<u>...</u>` — underline for the specific word a rule is about
- `<span class="end">...</span>` — red bold for verb endings inside conjugations
- `<span class="stem">...</span>` — default ink for the stem portion
- `<span class="en">...</span>` — blue italic for English translation in body
- `<span class="t">...</span>` — blue italic small for EN gloss under `<li>` items in goals/selfcheck
- `<span class="tr">...</span>` — muted italic for EN gloss inside dialogue lines
- `<span class="pt-ex">...</span>` — weight 500 for PT example sentences
- `<span class="ipa">[ˈʃa.vɨ]</span>` — IPA pill (blue serif on blue-light bg)
- `<span class="bonus-tag">Bónus</span>` — small gold tag for extra material

## Callouts

Use these to break up grammar text. Each combines an emoji icon, a bold label, and body copy. Pick by intent:

```html
<div class="callout tip"><span class="ic">💡</span><strong>Dica:</strong> Body text.</div>
<div class="callout warn"><span class="ic">⚠️</span><strong>Atenção:</strong> Body text.</div>
<div class="callout culture"><span class="ic">🇵🇹</span><strong>Nota cultural:</strong> Body text.</div>
```

Don't mix: one callout type per concept (warning vs. tip vs. cultural aside).

## Exercises

The page supports four exercise types. The shared engine in `src/assets/lesson.js` handles each end-to-end (scoring, persistence, restore, reset). For each new lesson, the skill writes only the markup; the JS just works.

| Type | Markup pattern | Scoring key |
|------|---------------|-------------|
| **Text fill-in** | `<div class="exercise" data-ex="N">` with `<input type="text" data-a="answer\|variant">` inside `<div class="q">` | `pt:N:i` per input |
| **Matching** | `<div class="match-grid" id="matchN">` with two `<div class="match-col" data-side="pt|en">` and pairs sharing `data-key` | `match` counts pairs |
| **Multiple choice** | `<div class="q" data-mc="N-i" data-correct="X">` with `<input type="radio" name="qN-i" value="X">` | `mc:N-i` per question |
| **Free writing** | `<textarea id="writing">` with `saveWriting()` button | `writing` (1 point at ≥40 chars) |

The scorebar shows progress against total points (sum of all the above). The reset button removes the `localStorage` key and reloads.

### `data-a` answer encoding

`data-a="trabalhava"` — one accepted answer.
`data-a="trabalhava|trabalhavas"` — multiple accepted, pipe-separated.
Comparison is accent-insensitive and case-insensitive (the `norm()` function).

## Trabalho de casa (optional section 8)

When the teacher assigns homework, the real assets live in `trabalho_de_casa/<lesson-folder>/` at the repo root (the folder name mirrors the lesson file's stem, e.g. `aulas_mariana_2026-06-03/`). This folder is passthrough-copied by Eleventy, so it ships as-is alongside the built pages. Assets are referenced as plain relative URLs.

The lightbox container, the homework CSS, and the lightbox JS are **shared** — they already exist globally (the `.lightbox` div in `src/_includes/base.njk`, plus rules and the self-guarding IIFE in `src/assets/lesson.css` / `src/assets/lesson.js`). A content file therefore adds **only the section 8 markup** — never a lightbox div, CSS, or JS.

Render section 8 only when assets exist. It has two optional sub-blocks (include either or both):

- **Faixas para ouvir** — one `.hw-track` per audio file (gold card matching `--gold-light`/`--gold-border`). Use `<audio controls preload="none">` so nothing downloads until the student presses play. Always include a download-link fallback inside the `<audio>` for unsupported browsers.
- **Fichas de trabalho** — a `.hw-gallery` of `<button class="hw-page">` thumbnails, each opening the full scan in the shared `.lightbox` (click, ←/→, Esc, click-outside; focus is trapped to the close button and restored on close). The shared lightbox JS is a no-op when a lesson has no gallery.

Asset conventions:

- **Reference path**: `../trabalho_de_casa/<lesson-folder>/<file>` (the built lesson lives at `aulas/aulas_mariana_YYYY-MM-DD.html`).
- **Filenames must be URL-safe** — no spaces or parentheses. Rename scans/audio to clean kebab-case (`manual-p76.jpg`, `caderno-p34.jpg`, `faixa-60.mp3`). Keep the originals in the same folder as archival source; reference only the clean web copies.
- **Optimise scans before committing.** Raw scanner output is multi-MB PNG. Convert to JPEG ~1100px wide (`sips -s format jpeg -s formatOptions 72 -Z 1500 in.png --out out.jpg` drops 5 MB → ~300 KB). Set the real pixel `width`/`height` on each `<img>` and add `loading="lazy"`. The `aspect-ratio` is **lesson-specific**: `lesson.css` carries only a shared default, so set it **inline per image** from the real dimensions (`style="aspect-ratio: 1090 / 1500"`) rather than editing the shared CSS.
- **Alt text + caption**: every page `<img>` gets a descriptive `alt` (what exercises are on the page), a short visible caption (`Manual · p. 76`), and a full `data-cap` used by the lightbox.

## State persistence

The `localStorage` key is **derived from `date`** by the layout — content files never declare it. The layout runs the `ptStorageKey` filter on `date` and writes it onto `<body data-storage-key="pt_marianna_YYYY_MM_DD">`; the shared engine in `lesson.js` reads `document.body.dataset.storageKey`. The index card uses the same filter, so the card's `data-keys` always matches automatically. Nothing to wire by hand.

The home page reads `localStorage` with a `startsWith()` fallback to mark cards as `começada`. Two legacy key shapes still exist in the wild (`marianna_YYYY-MM-DD` from older lessons, `pt-lesson-N` for the structured course); the fallback handles them, but new lessons always get the `pt_marianna_YYYY_MM_DD` shape from the filter.

## Copy rules

- **Language**: European Portuguese throughout. No `seu/sua` formal-you; use `tu` for the student.
- **Em-dashes are OK in body prose** — they're a real PT-PT punctuation mark. **Do not use em-dashes in headings, titles, exercise instructions, or section labels** (use `:` or `·` instead). This is a deliberate split from the home-page rule.
- **Emojis** are part of the visual cue system here. Use them in badges, callout icons, section headers if helpful, and content where they add scanning speed.
- **Translations**: always include an English gloss for objectives (`<span class="t">`), dialogue lines (`<span class="tr">`), and table vocabulary (`<span class="en">`).

## Accessibility floor

- Body text uses `font-size: 1.0625rem` so the browser default-font setting is respected.
- All semantic color pairs pass WCAG AA on body text (gold uses `--gold-text`, not bright `--gold`, for foreground).
- Focus rings are 2px solid green on buttons, nav, choices, and match items.
- A global `@media (prefers-reduced-motion: reduce)` rule strips all transitions and animations.
- All inputs use the page's font.
- Print styles hide the scorebar and reveal answers, keeping the lesson printable.

## When generating a new lesson

The flow is minimal — the layout and the collection do the rest:

1. Create one content file `src/lessons/aulas_mariana_YYYY-MM-DD.html`: the front-matter block (schema above) + sections 1–7, plus optional section 8 if there's homework.
2. Run `npm run build` (or `npm run serve` to preview at `http://localhost:8080/portuguese-lessons/`).

That's it. The header, both pagers (auto prev/next), lightbox, footer, CSS/JS, score engine, and the index card are all supplied automatically. **No editing of other lesson files, no `src/index.njk` edit, no nav links, no `LS_KEY`.**

## What NOT to do

- Don't rewrap the page in a different layout family (Tailwind classes, BEM scopes, etc). The system is intentionally token-driven, with all styles in the shared `src/assets/lesson.css`. Don't add inline `<style>`/`<script>` to a content file — the layout owns the chrome.
- Don't introduce new fonts. EB Garamond + Hanken Grotesk only.
- Don't replace the colored callouts with grey neutral boxes. The colors are functional.
- Don't strip the emojis "for restraint." This is the lesson page, not the homepage.
- Don't animate layout properties (`width`, `height`, `margin`). The score-fill uses `transform: scaleX()`.
- Don't hard-code colors. Use the tokens. If a new semantic role is needed (e.g. "neutral aside"), add a token to `:root`.
- Don't add `border-left` decorations on callouts. The current full-tint background is the chosen affordance.
- Don't put the scorebar back at the top of the page. It belongs inside the Exercícios section.
