// Directory data for every lesson content file in src/lessons/.
// Output path mirrors the old standalone URLs (aulas/aulas_mariana_YYYY-MM-DD.html)
// so existing links and bookmarks keep working.
module.exports = {
  layout: "base.njk",
  tags: "lesson",
  permalink: (data) => `aulas/${data.page.fileSlug}.html`,
};
