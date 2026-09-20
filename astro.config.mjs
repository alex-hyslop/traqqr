// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://traqqr-git-main-alexhyslop-7992.vercel.app', // Vercel git-main deployment URL — swap to the custom production domain when one is set up
  output: 'static',
  // Single-page site today, so there's no "CSS cached across page loads"
  // downside — inlining removes a render-blocking request entirely instead
  // of leaving an 11KB stylesheet fetch in the critical path.
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
});
