# As Minhas Aulas de Português 🇵🇹

Interactive European-Portuguese (PT-PT) study pages, built from my real classes
with my teacher **Mariana**. Each lesson has grammar, vocabulary, a reconstructed
dialogue, and exercises that score themselves in the browser.

It's an [Eleventy](https://www.11ty.dev/) static site: lessons are written as
content files in `src/aulas/`, and the shared layout adds all the page chrome,
navigation, styles, and the scoring engine. GitHub Actions builds and deploys to
GitHub Pages on every push to `main`.

```bash
npm install      # once
npm run serve    # preview at http://localhost:8080/portuguese-lessons/
```

## Generating a new lesson

Lessons are created from a recording of the actual class with Claude Code, using
the `/portuguese-lesson` skill:

```
/portuguese-lesson <Granola meeting URL>
```

**A transcription tool is required.** This relies on [Granola](https://www.granola.ai/)
to transcribe the class and expose it over MCP — the skill reads the meeting's
transcript and notes, works out what grammar and vocabulary were covered, and
writes a study page from it. Without Granola (or another transcription source
wired up the same way) there's no class content to build a lesson from.

The skill writes one file, `src/aulas/aulas_mariana_YYYY-MM-DD.html` (the class
date). The home page card and the prev/next navigation are generated
automatically — no other file needs editing. Run `npm run serve` to preview.

> You can also generate a lesson by topic or curriculum step instead of a class
> recording — see the skill for the full A2→B1 progression plan.

## Adding homework (trabalho de casa)

After a class, the teacher's homework (scanned worksheet pages + listening
tracks) gets added to that lesson's page with the `/portuguese-homework` skill:

1. Drop the raw files (photos, scans, MP3s) into `trabalho_de_casa/`.
2. Run `/portuguese-homework <class date>`.

The skill looks at each page, optimizes and renames the files, and adds a
"Trabalho de casa" section to the lesson with audio players and a zoomable
gallery of the worksheets. It then deletes the bulky originals, keeping only the
optimized files the page uses.

## Project layout

```
src/
├── index.njk              # home page (lesson cards, generated from front-matter)
├── _includes/base.njk     # the shared layout (header, nav, lightbox, footer)
├── assets/                # shared CSS + the exercise/scoring engine
└── lessons/               # one content file per lesson
trabalho_de_casa/          # homework assets, one folder per lesson
LESSON_DESIGN.md     # the lesson design contract + front-matter schema
```

`_site/` is the generated output and is gitignored — the repo is source only.
</content>
</invoke>
