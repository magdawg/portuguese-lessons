# Lesson page design contract

This document is the canonical spec for a Portuguese-lesson page in this repo. It pairs with `_template.html` (the working skeleton with placeholders).

A skill that generates new lessons should:
1. Read this doc to understand the design system and conventions.
2. Start from `_template.html`, replace `{{PLACEHOLDERS}}` and `[REPEATABLE: ...]` blocks with real lesson content.
3. Make sure the new lesson's `LS_KEY` matches the `data-keys` attribute on the corresponding `index.html` card.

## What this site is

A personal European-Portuguese (PT-PT) study companion. One student (Magda), one teacher (Mariana). Each lesson is a self-contained HTML file with grammar tables, vocabulary, a reconstructed dialogue, and interactive exercises whose state lives in `localStorage`. No build step, no shared assets beyond Google Fonts. The site is hosted on GitHub Pages.

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

Every lesson follows this outline. The numbered chip in `<h2><span class="num">N</span> ...</h2>` makes the order visible to the reader.

1. **Resumo da aula** — what the student talked about / heard / read. Short narrative paragraph(s).
2. **O que vamos aprender hoje** — 3-5 concrete objectives in `<ul class="goals">`. Each item is `<li>{PT statement}<span class="t">{EN gloss}</span></li>`.
3. **Gramática** — the substance. One `<h3>` per topic. Use tables for conjugations (`<span class="end">` for endings, `<span class="stem">` for stems), `<div class="callout tip/warn/culture">` for rules and asides.
4. **Vocabulário** — words and expressions. Often a 2-column PT/EN table. Use `<span class="ipa">[...]</span>` for phonetic notation.
5. **Diálogo reconstruído** — a reconstructed conversation. `<div class="dialogue">` wraps `<div class="turn m">` (teacher, red) and `<div class="turn a">` (student/Aluna, blue). Each turn includes `<span class="who">` and `<span class="line">` with optional `<span class="tr">` for English gloss.
6. **Exercícios** — interactive practice. The sticky `<div class="scorebar">` lives inside this card and only sticks while the user is in this section. Supports four exercise types (see below).
7. **Resumo e autoavaliação** — take-home points + `<ul class="selfcheck">` of can-do statements + closing tip callout.

Top nav (← previous · home · next →) appears once between the header and section 1, and once between section 7 and the footer. Disabled links carry `class="disabled"`.

## Header

```html
<header>
  <div class="header-inner">
    <div class="badges">
      <span class="badge real">📝 Baseada na aula real</span>
      <span class="badge">Nível A2 → B1</span>
      <span class="badge">🗓️ 3 de junho de 2026</span>
      <span class="badge">👩‍🏫 Professora Mariana</span>
    </div>
    <h1>{Lesson title}</h1>
    <p class="subtitle">{One-sentence lesson summary}</p>
  </div>
</header>
```

- The `.badge.real` gold badge marks lessons reconstructed from a real class. Course lessons (not from a recorded class) drop it.
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

The page supports four exercise types. The JS in `_template.html` handles each end-to-end (scoring, persistence, restore, reset). For each new lesson, the skill writes the markup; the JS just works.

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

## State persistence

Each lesson uses a single `localStorage` key declared at the top of the inline script:

```js
const LS_KEY = 'pt_marianna_YYYY_MM_DD';
```

The key shape **must match** the `data-keys` attribute on the corresponding card in `/index.html`. The home page reads `localStorage` with a `startsWith()` fallback to mark cards as `started` and to populate the "Continuar onde paraste" block. If you add a new lesson, also add a `<a class="lesson">` card to `index.html` with `data-keys="<your LS_KEY>"`.

Two legacy key shapes also exist (`marianna_YYYY-MM-DD` from older lessons, `pt-lesson-N` for the structured course). For new lessons, use `pt_marianna_YYYY_MM_DD` (double-n, all underscores). The fallback handles legacy keys but new ones should follow the convention.

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

The skill should:
1. Copy `_template.html` to `aulas_mariana_YYYY-MM-DD.html` (matching the date convention).
2. Replace `{{PLACEHOLDERS}}` in order: head/header → sections 1-7 → footer → script.
3. Set `LS_KEY` in the inline script.
4. Open `/index.html`, add a new `<a class="lesson">` card at the top of the Mariana grid with matching `data-keys`, and update the Continuar block's server-side default (`<a class="continue">` href + h2 + topics) to point to this newest lesson.
5. Update the previous lesson's "Próxima aula →" link, which was previously disabled, to point to the new file.

## What NOT to do

- Don't rewrap the page in a different layout family (Tailwind classes, BEM scopes, etc). The system is intentionally token-driven with inline `<style>`.
- Don't introduce new fonts. EB Garamond + Hanken Grotesk only.
- Don't replace the colored callouts with grey neutral boxes. The colors are functional.
- Don't strip the emojis "for restraint." This is the lesson page, not the homepage.
- Don't animate layout properties (`width`, `height`, `margin`). The score-fill uses `transform: scaleX()`.
- Don't hard-code colors. Use the tokens. If a new semantic role is needed (e.g. "neutral aside"), add a token to `:root`.
- Don't add `border-left` decorations on callouts. The current full-tint background is the chosen affordance.
- Don't put the scorebar back at the top of the page. It belongs inside the Exercícios section.
