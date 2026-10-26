import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow.
// When Sophia's own domain is connected, BASE_PATH becomes "/".
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/thank-you|404/.test(page) })],
  build: { inlineStylesheets: 'auto' },
});
