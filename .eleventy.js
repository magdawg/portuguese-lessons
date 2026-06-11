// Eleventy config — builds the lesson site from `src/` into `_site/`.
// Lessons live as content files (front-matter + <section>s); all chrome,
// nav, CSS and JS are defined once and shared. See LESSON_DESIGN.md.

const PT_MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

// Front-matter `date: 2026-06-03` is parsed as UTC midnight — use UTC getters
// so the day never drifts by a timezone.
function parts(date) {
  const d = new Date(date);
  return { day: d.getUTCDate(), month: d.getUTCMonth(), year: d.getUTCFullYear() };
}
function pad(n) { return String(n).padStart(2, "0"); }

module.exports = function (eleventyConfig) {
  // --- date / key filters (no hand-typed date strings in lessons) ---
  eleventyConfig.addFilter("ptDateLong", (date) => {
    const { day, month, year } = parts(date);
    return `${day} de ${PT_MONTHS[month]} de ${year}`;
  });
  eleventyConfig.addFilter("ptDateShort", (date) => {
    const { day, month } = parts(date);
    return `${day} de ${PT_MONTHS[month]}`;
  });
  eleventyConfig.addFilter("ptDateISO", (date) => {
    const { day, month, year } = parts(date);
    return `${year}-${pad(month + 1)}-${pad(day)}`;
  });
  eleventyConfig.addFilter("ptStorageKey", (date) => {
    const { day, month, year } = parts(date);
    return `pt_marianna_${year}_${pad(month + 1)}_${pad(day)}`;
  });

  // --- collection: all Mariana lessons, oldest → newest ---
  eleventyConfig.addCollection("lesson", (collectionApi) =>
    collectionApi.getFilteredByTag("lesson").sort((a, b) => a.date - b.date)
  );

  // --- static passthrough ---
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Self-contained pages copied verbatim, preserving their exact URLs (not in scope for the layout).
  // ignore them as templates so they aren't also rendered to pretty-URL folders.
  eleventyConfig.addPassthroughCopy({ "src/verbos.html": "verbos.html" });
  eleventyConfig.addPassthroughCopy({ "src/curriculo/aula-1.html": "aulas/aula-1.html" });
  eleventyConfig.ignores.add("src/verbos.html");
  eleventyConfig.ignores.add("src/curriculo/aula-1.html");
  eleventyConfig.addPassthroughCopy("trabalho_de_casa");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    // Content files are raw HTML (front-matter only); the .njk layout templates them.
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
    pathPrefix: "/portuguese-lessons/",
  };
};
