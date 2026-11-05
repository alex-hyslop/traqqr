// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { routes } from './src/i18n/index.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://traqqr.vercel.app', // Production URL until the homepage moves to the real domain at launch
  output: 'static',
  // English at /, German under /de/ (the founder, 5 Nov). Keep in step with src/i18n.
  i18n: { defaultLocale: 'en', locales: ['de', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [
    react(),
    // Pairs each page with its other language from src/i18n's routes, so pages whose slugs differ
    // (/integrations/ ↔ /de/integrationen/) get their hreflang links too.
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const pair = Object.values(routes).find((r) => r.en === path || r.de === path);
        if (pair) item.links = ['en', 'de'].map((lang) => ({ lang, url: new URL(pair[lang], item.url).href }));
        return item;
      },
    }),
  ],
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
