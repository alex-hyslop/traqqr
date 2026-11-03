// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://traqqr.vercel.app', // Production URL until the homepage moves to the real domain at launch
  output: 'static',
  // German at /, English under /en/ (Kev's 3 Nov handover §2). Keep in step with src/i18n.
  i18n: { defaultLocale: 'de', locales: ['de', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [react(), sitemap({ i18n: { defaultLocale: 'de', locales: { de: 'de', en: 'en' } } })],
  // Few pages, so inline the CSS (~6 KB gzipped) instead of a render-blocking request (Lighthouse, 21 Oct).
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle what the islands import, so the dev server doesn't discover them on the first page
    // load and fail with "504 Outdated Optimize Dep" until a reload.
    optimizeDeps: {
      include: [
        '@klicktipp/traqqr-components',
        '@klicktipp/traqqr-components/utils',
        'lucide-react',
        'radix-ui',
        'class-variance-authority',
        'gsap',
        'gsap/CustomEase',
      ],
    },
  },
});
