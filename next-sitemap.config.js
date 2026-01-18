/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 1. Fixes the Redirect Error (Critical)
  siteUrl: "https://www.indianpaycalculator.in",
  
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,

  // 2. Makes it a single, simple file (Highly Recommended)
  generateIndexSitemap: false, 
};