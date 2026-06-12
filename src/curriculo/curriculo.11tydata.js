// Directory data for the structured-course content files in src/curriculo/.
// These are numbered A2→B1 lessons (front-matter + <section>s), ordered by
// `lessonNumber` rather than a class date. The shared base.njk layout renders
// them; the `curriculo` collection (see .eleventy.js) drives their pager and the
// home-page course callouts.
//
// The legacy standalone aula-1.html is ignored as a template in .eleventy.js and
// passthrough-copied verbatim, so this data file never applies to it. New lessons
// start at lessonNumber 2 and build to aulas/aula-N.html (same URL family).
module.exports = {
  layout: "base.njk",
  tags: "curriculo",
  origin: "Curso estruturado A2 → B1",
  footerProvenance: "Lição do curso estruturado A2 → B1",
  permalink: (data) => `aulas/aula-${data.lessonNumber}.html`,
};
