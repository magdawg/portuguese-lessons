# Product

## Register

product

## Users

Magda Kowalska, an English-speaker learning European Portuguese (PT-PT), currently working through A2 → B1 with her teacher Mariana. She studies in browser sessions on a laptop, sometimes returning to the same lesson over multiple days. The site is also designed to be clean enough to send to one friend who is also learning PT-PT, without explanation or embarrassment.

The job is: review what was covered in a real class, drill the grammar through interactive exercises, and pick up where she left off without losing progress. Conjugations and vocab in the foreground; corrections from Mariana captured as targeted practice. Lessons travel between desktop study sessions and the occasional printed page.

## Product Purpose

A personal European-Portuguese study companion. Each lesson is a single self-contained HTML file, no build step, hosted on GitHub Pages. State (answers, score, free-writing) lives in `localStorage` and persists across sessions per lesson.

The site has two surfaces:

- **Lesson pages** (`aulas/*.html`): the workhorse. Interactive grammar tables, vocabulary, a reconstructed dialogue, four exercise types (fill-in, match, multiple choice, free writing), a sticky scorebar tied to the Exercícios section. This is product behavior — state, persistence, scoring, restore-on-reload.
- **The hub** (`index.html`): a brand-shaped landing that resolves the question "where do I go now?" through a single primary "A tua próxima aula" block, then an archive of Mariana lessons, then a callout to the structured A2→B1 course, then external resources.

The site defaults to the `product` register because the lesson page is where actual studying happens; the hub is deliberately brand-shaped on top. Per-task overrides are fine — when working on `index.html`, treat it as brand.

Success = Magda keeps returning to it. Secondary success = it could be sent to one friend learning PT-PT without an apology.

## Brand Personality

**Warm · editorial · personal.** A study journal that happens to be a website, not a SaaS landing template and not a textbook.

- **Voice**: Second-person `tu`. Direct, intimate. "Bem-vinda, Magda." "Continuar onde paraste." "Bons estudos, Magda." Never `você`, never the corporate hedge.
- **Typography as identity**: EB Garamond for display + Hanken Grotesk for body. A real serif-plus-neo-grotesque pairing on a contrast axis, not the Inter+Lora reflex.
- **Color as semantics, not decoration**: green = brand/correct, red = teacher voice + verb endings + warnings, blue = English glosses + student voice + IPA, gold = "real lesson" + tips + score-bar terminus. Each color earns its meaning.
- **Emojis are functional**: on lesson pages they are learning cues (callout icons, badges, semantic markers), not garnish. On the hub they are restrained — one Portuguese flag in the title, otherwise quiet.
- **Portuguese identity is structural**, carried by the green/gold palette, the EB Garamond serif, PT-PT-coded illustrations (sardine SVG, pastel illustration in the header at low opacity), and the actual lesson copy. Not by national-flag decoration.

## Anti-references

- **Duolingo / mascot ed-tech**. Gamified streaks, owl mascots, cartoon rounded everything, neon green, achievement popovers. Never. Studying is for adults reading a teacher's notes, not for collecting badges.
- **Generic SaaS ed-tech**. Purple/teal gradients, hero-metric counters, identical-card-grid features, kicker eyebrows above every section, "world-class" copy. Could be any product, therefore is no product. Reject everything that smells like it.
- **The current AI default (cream-paper + ornate serif + tasteful muted palette)**. The project uses a serif, but it is paired with saturated semantic color (green/red/blue/gold), not the warm-near-white-only band. Stay on the saturated side; do not drift toward the cream-and-restraint AI lane.
- **Sterile textbook PDF**. Black-and-white tables, no hierarchy, no warmth. The opposite failure mode.

## Design Principles

1. **Color carries meaning.** Green/red/blue/gold are semantic roles, not decoration. Before adding a new color, decide what it means. Before changing an existing color's use, check what semantic it currently signals. No purely aesthetic tints.
2. **Two surfaces, two intensities, one system.** The lesson page is allowed (encouraged) to be louder: emojis in callouts, badges, score animations, color-coded turns. The hub is calmer: less emoji, more whitespace, the primary action visible above the fold. Same tokens, same fonts, different volume.
3. **Show the real class, don't simulate it.** "Baseada na aula real" is not a marketing tag, it is a content guarantee. Lessons are reconstructed from Mariana's actual transcripts; corrections from her become targeted exercises. Generic drills are a tell — if it could have been generated without a real class, it shouldn't ship.
4. **Persistence is the feature.** State that doesn't survive a reload doesn't count. Score, answers, free-writing all live in `localStorage` per lesson. The home page reads that state to mark cards as started and to point at the next lesson. Never break this contract; never store state in memory alone.
5. **No build step, ever.** Each page is a single self-contained HTML file with inline `<style>` and vanilla JS. Google Fonts is the only external dependency. This is an explicit constraint, not an accident — it makes the site shippable on plain GitHub Pages, printable, archivable, and editable by hand in twenty years.

## Accessibility & Inclusion

**WCAG AA on every text/background pairing.** This is the floor, not the goal.

- Body text uses `font-size: 1.0625rem` (relative) so the browser default-font setting is respected.
- Foreground gold is `--gold-text: #8a5e00` on white (not the bright `--gold` brand color, which fails contrast).
- Focus rings are 2px solid green, visible on buttons, nav links, choice rows, and match items — `:focus-visible` keyboard scope.
- A global `@media (prefers-reduced-motion: reduce)` rule strips all transitions and animations, including the sticky scorebar fill and arrow translates.
- No information conveyed by color alone — the green/red/blue/gold spans always pair with semantic markup or text.
- Print styles reveal answers and hide the scorebar so a lesson is usable on paper.
- All exercise inputs use the page's font and accept accent-insensitive comparison so students aren't penalized for missing diacritics during practice.

Reduced motion, keyboard navigation, and color-blind-safe contrast are the three a11y commitments to hold. Anything more (screen-reader labels for the dialogue lines, ARIA on the scorebar role, etc.) is welcome but not blocking.
