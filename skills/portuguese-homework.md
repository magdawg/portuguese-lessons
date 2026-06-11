---
name: portuguese-homework
description: Incorporate the homework (trabalho de casa) for a Portuguese class into its lesson page. Give it the class date; it finds the dumped originals in trabalho_de_casa/, analyzes them, optimizes and renames the files, adds or updates the "Trabalho de casa" section (section 8) in the matching src/aulas/ lesson content file with audio players + a scanned-worksheet lightbox gallery, verifies it renders with the Eleventy dev server, then deletes the originals and keeps only the files the page references. Use when the user has dumped homework files and wants them added to a lesson.
argument-hint: "[class date, e.g. 2026-06-03 or '3 June']"
user-invocable: true
---

# Trabalho de Casa → Lesson Page

You turn the raw homework a teacher assigned (scanned worksheet pages + listening tracks dumped into `trabalho_de_casa/`) into a polished, on-brand **section 8 "Trabalho de casa"** inside the matching lesson content file, then clean up the leftover originals.

This skill operates on **this repo** (the Portuguese-lessons Eleventy site). Read `LESSON_DESIGN.md` (section "Trabalho de casa (optional section 8)") first — it is the design contract and the source of truth for the markup and asset rules. The lightbox container, the homework CSS, and the lightbox JS are **shared infrastructure that already exists globally** (the `.lightbox` div in `src/_includes/base.njk`; rules and the self-guarding lightbox IIFE in `src/assets/lesson.css` / `src/assets/lesson.js`). You do **NOT** copy or inject any CSS, JS, or lightbox div — that step is gone. You only write the section 8 `<section>` markup into the lesson **content file**. The worked example is `src/aulas/aulas_mariana_2026-06-03.html`.

`$ARGUMENTS` is the **class date**. Normalize it to `YYYY-MM-DD`. If it is vague ("last Wednesday", "3 June"), resolve it against the lesson files that exist (`ls src/aulas/aulas_mariana_*.html`) and, if ambiguous, ask the user which date.

## Repo conventions (memorize these)

- **Lesson content file**: `src/aulas/aulas_mariana_YYYY-MM-DD.html` (note: `mariana`, single r/n in the *filename*). It is front-matter + sections only; the build outputs it to `aulas/aulas_mariana_YYYY-MM-DD.html`.
- **Homework folder**: `trabalho_de_casa/aulas_mariana_YYYY-MM-DD/` — mirrors the lesson file's stem. Passthrough-copied by Eleventy.
- **Reference path from the lesson** (the built page lives at `aulas/…`): `../trabalho_de_casa/aulas_mariana_YYYY-MM-DD/<file>`.
- **Asset filenames must be URL-safe** — kebab-case, no spaces or parentheses.

---

## Step 1 — Locate and stage the dumped files

1. The user dumps originals into `trabalho_de_casa/` — either loose in the root or already in a subfolder. Find the files for this class. Check, in order:
   - `trabalho_de_casa/aulas_mariana_YYYY-MM-DD/`
   - any other subfolder whose name contains the date (e.g. `aula_2026_06_03`)
   - loose files in `trabalho_de_casa/` that are clearly the newest dump (match by date if the filenames carry one; otherwise ask the user which loose files belong to this class).
2. Create the canonical folder `trabalho_de_casa/aulas_mariana_YYYY-MM-DD/` if it doesn't exist, and move the found originals into it. If the folder already has a *previous* run's optimized files, you are re-running — that's fine, treat it as idempotent (Step 6 replaces the section).
3. List what you found: image scans (`.png`/`.jpg`/`.jpeg`/`.heic`) and audio (`.mp3`/`.m4a`/`.wav`). If there are neither, stop and tell the user the folder is empty.

## Step 2 — Analyze the contents

For each **image**: open it with the Read tool and look. Identify the textbook/unit, the page number, and what exercises are on it (telling time, dates, verb conjugation, etc.). This drives the captions and alt text — they must describe the *actual* page, not be generic.

For each **audio**: read the track number/label from the filename (e.g. "Faixa 60"). Match it to the exercise on a scanned page if one references it (worksheets often print the track id like `A60`). Note that pairing for the track sub-label.

Decide a clean, ordered naming scheme based on what you saw, e.g. `manual-p76.jpg`, `manual-p77.jpg`, `caderno-p34.jpg`, `faixa-60.mp3`, `faixa-61.mp3`. Order pages logically (textbook before workbook, ascending page numbers).

## Step 3 — Optimize and rename the assets

Raw scans are multi-MB; optimize before they ship.

- **Images** → JPEG ~1100px wide:
  ```bash
  sips -s format jpeg -s formatOptions 72 -Z 1500 "INPUT" --out "trabalho_de_casa/aulas_mariana_YYYY-MM-DD/CLEAN-NAME.jpg"
  ```
  (HEIC inputs work with `sips` too.) Then read each new JPEG's real dimensions for the `<img>` width/height and the `aspect-ratio`:
  ```bash
  sips -g pixelWidth -g pixelHeight "trabalho_de_casa/aulas_mariana_YYYY-MM-DD/CLEAN-NAME.jpg"
  ```
  Set the `aspect-ratio` **inline on each `<img>`** from its real dimensions (`style="aspect-ratio: W / H"`). `lesson.css` only holds a shared default, so never edit the shared CSS for a per-lesson ratio — even when all pages share one ratio, put it inline per image.
- **Audio** → just rename to the clean name (`mv`). Re-encoding is usually unnecessary; only transcode if a file is huge (>8 MB) or in an unsupported format.
- **Keep the originals in the folder for now** — Step 7 removes them after verification. Do not delete anything yet.

## Step 4 — Open the lesson content file

Open `src/aulas/aulas_mariana_YYYY-MM-DD.html`. If the file doesn't exist, stop and tell the user to generate the lesson first (via `/portuguese-lesson`).

There is **no infrastructure to inject**. The lightbox div, the homework CSS, the print rules, and the lightbox JS are all shared (layout + `lesson.css` + `lesson.js`) and apply to every lesson automatically. The content file gets section 8 markup and nothing else. Just check whether a section 8 already exists (grep for `<span class="num">8</span>` or `hw-gallery`); if so, you are re-running and will replace it in Step 5.

## Step 5 — Build the section 8 content

Construct the `<!-- 8. HOMEWORK -->` `<section>` from the shape in `src/aulas/aulas_mariana_2026-06-03.html`, filled with the real analyzed content. Do **not** add a lightbox div, CSS, or JS — those are shared.

- Section heading `<h2><span class="num">8</span> Trabalho de casa</h2>` (if the lesson's last section is numbered 7, this is 8; keep the chip sequence correct).
- A `.lead` naming the unit/theme.
- **🎧 Faixas para ouvir** — one `.hw-track` per audio: `<audio controls preload="none" src="../trabalho_de_casa/aulas_mariana_YYYY-MM-DD/FILE.mp3">` with a download-link fallback inside; label = track id + sub-label tying it to its exercise.
- **📄 Fichas de trabalho** — a `#hwGallery .hw-gallery` with one `<button class="hw-page" data-src="…" data-cap="FULL CAPTION">` per page; the `<img>` gets `loading="lazy"`, real `width`/`height`, the inline `style="aspect-ratio: W / H"` from Step 3, and a **descriptive `alt`** (what's on the page); a short visible `.page-cap` (e.g. `Manual · p. 76`) with the `⤢` zoom icon.
- Drop either sub-block entirely if that asset type is absent (no empty "Faixas" heading with no tracks).
- Close with a `.callout tip` (a study hint).

**Placement**: append the whole `<!-- 8. HOMEWORK -->` `<section>` at the **end of the content file, after section 7's closing `</section>`**. The content file has no pager, no footer, and no lightbox div (all in the layout), so section 8 is simply the last thing in the file. If a previous run already added a section 8, **replace it** rather than adding a second one (idempotent).

## Step 6 — Verify it renders

Serve with Eleventy and screenshot — don't trust the markup blind. The dev server builds `src/` and serves under the `/portuguese-lessons/` path prefix.

```bash
npm run serve >/tmp/eleventy.log 2>&1 &
# wait for "Server at http://localhost:8080/portuguese-lessons/" in the log, then:
BASE="http://localhost:8080/portuguese-lessons"
```

1. Confirm every referenced asset returns `200` (note the path prefix):
   ```bash
   curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" "$BASE/trabalho_de_casa/aulas_mariana_YYYY-MM-DD/FILE"
   ```
2. Headless screenshot (Chrome) and **Read** the crop covering section 8 to confirm the audio cards and gallery look right:
   ```bash
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
   "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=900,14000 \
     --screenshot=/tmp/hw.png "$BASE/aulas/aulas_mariana_YYYY-MM-DD.html"
   # crop near the bottom and Read it; re-render taller if the page exceeds the window
   ```
3. Verify the **lightbox** opens: with the dev server running, screenshot the page after clicking the first thumbnail — load the URL with a small injected script (e.g. via Chrome DevTools / `evaluate_script` calling `document.querySelector('#hwGallery .hw-page').click()`), screenshot, and Read the shot. The lightbox is shared chrome, so it just works once the gallery markup is present.
4. Check the console is clean:
   ```bash
   "$CHROME" --headless=new --disable-gpu --virtual-time-budget=2500 --enable-logging=stderr --v=0 \
     "$BASE/aulas/aulas_mariana_YYYY-MM-DD.html" 2>&1 \
     | grep -iE "uncaught|syntaxerror|is not defined|404" | head
   ```

Fix anything that's off before proceeding. Stop the server when done (`pkill -f "eleventy --serve"`).

## Step 7 — Clean up the originals

Only after Step 6 passes:

1. Collect the set of files the lesson content file actually references for this folder — every `src=`/`data-src=` pointing at `../trabalho_de_casa/aulas_mariana_YYYY-MM-DD/…` (and any `href` download fallbacks). These are the **keepers**.
2. List every other file in `trabalho_de_casa/aulas_mariana_YYYY-MM-DD/` (the raw originals, `.DS_Store`, stray dumps) — these are the **removals**.
3. **Show the user both lists** (keep vs remove) and the byte savings, then delete the removals:
   ```bash
   rm -f "trabalho_de_casa/aulas_mariana_YYYY-MM-DD/<original>" …
   ```
   Deleting the user's dumped originals is the explicit purpose of this skill, so proceed once verification passed — but never delete a file the content file references, and never touch anything outside this lesson's folder.
4. If you moved/renamed a tracked folder (e.g. an old `aula_YYYY_MM_DD/`), note that for the commit.

## Step 8 — Report

Tell the user concisely:
- Which lesson content file was updated and what section 8 now contains (N tracks, N pages).
- The size reduction (e.g. "22 MB of scans → 1.3 MB of JPEGs").
- Which files were kept and which originals were removed.
- That it was verified rendering (section + lightbox) with a clean console.
- Remind them nothing is committed unless they ask.

## Guardrails

- **Never** add CSS, JS, or a lightbox div to the content file — that infra is shared (layout + `lesson.css` + `lesson.js`). Don't rewrap the lesson in a different layout, add fonts, or hardcode colors. Follow `LESSON_DESIGN.md` exactly.
- **Idempotent**: re-running for the same date replaces section 8 and re-optimizes; it must not create a second homework section.
- **Don't touch the index** (`src/index.njk`) — homework lives on the lesson page, and the index card is generated automatically.
- **Don't delete before verifying.** If verification fails, keep everything and report the problem.
- Captions and alt text must reflect the real page content you saw in Step 2 — never generic filler.
