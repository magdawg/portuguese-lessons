# As Minhas Aulas de Português 🇵🇹

Interactive European-Portuguese (PT-PT) study companions, built from real
classes with my teacher **Mariana**. Each lesson is a self-contained HTML page
with grammar tables, vocabulary, a reconstructed dialogue, and interactive
exercises (fill-in-the-blank, matching, multiple choice, conjugation drills and
a free-writing prompt) that track your score in the browser via `localStorage`.

## 🌐 Live site

Once GitHub Pages is enabled (see below), the site is available at:

```
https://<your-username>.github.io/<repo-name>/
```

Start from **`index.html`** — the hub that links to every lesson.

## 📂 Structure

```
.
├── index.html                         # Home page (lesson hub) — stays at root
└── aulas/                             # All lesson pages
    ├── aula-1.html                    # Structured A2→B1 course — Lesson 1
    └── aulas_mariana_YYYY-MM-DD.html  # Lessons generated from real classes
```

- Every page is **fully self-contained** — inline CSS + vanilla JS, no build
  step and no local assets. The only external dependency is Google Fonts (over
  HTTPS), so everything works on static hosting as-is.
- All internal links are **relative**, so the site works correctly when served
  from a project subpath (e.g. `username.github.io/repo/`).
- Each lesson has top **and** bottom navigation: previous lesson · home · next
  lesson.

> `progression.json` (a local lesson-tracker file) is intentionally **not**
> committed — it holds private Granola class links and isn't needed by the site.

## 🚀 Publish with GitHub Pages

1. Create a new repository on GitHub and push this folder to it:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**,
   **Branch = `main`**, **Folder = `/ (root)`**, then **Save**.
4. Wait ~1 minute and open the URL shown at the top of the Pages settings.

A `.nojekyll` file is included so GitHub Pages serves the files as plain static
HTML without Jekyll processing.

## ✏️ Editing / adding lessons

Lessons are plain HTML — open any file to edit. To add a new one, copy an
existing `aulas_mariana_*.html`, update the content and the nav links, and add a
matching card to `index.html`.
