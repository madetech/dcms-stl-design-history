module.exports = function (eleventyConfig) {
  // Options to customise the appearance of your design history
  // https://x-govuk.github.io/govuk-eleventy-plugin/options/
  eleventyConfig.addPlugin(require("@x-govuk/govuk-eleventy-plugin"), {
    stylesheets: ["/styles/application.css"],
    headingPermalinks: true,
    header: {
      logotype: false,
      productName: "Short Term Lets design history",
      search: {
        indexPath: "/search.json",
        sitemapPath: "/sitemap",
      },
    },
    url:
      process.env.GITHUB_ACTIONS &&
      "https://x-govuk.github.io/dcms-stl-design-history/",
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "./app/images": "." });

  // Different folders
  eleventyConfig.addCollection("architectural-decisions", (collection) => {
    return collection.getFilteredByGlob(
      "app/posts/architectural-decisions/*.md"
    );
  });
  eleventyConfig.addCollection("design-decisions", (collection) => {
    return collection.getFilteredByGlob("app/posts/design-decisions/*.md");
  });

  // Config
  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "app",
      layouts: "_layouts",
      includes: "_components",
    },
    pathPrefix: process.env.GITHUB_ACTIONS && "/dcms-stl-design-history/",
  };
};
