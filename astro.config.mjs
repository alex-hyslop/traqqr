// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rename, rmdir } from 'node:fs/promises';
import { routes } from './src/i18n/index.ts';
import { helpTopics } from './src/data/help.ts';

const site = 'https://traqqr.vercel.app'; // Production URL until the homepage moves to the real domain at launch

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  // English at /, German under /de/ (the founder, 5 Nov). Keep in step with src/i18n.
  i18n: { defaultLocale: 'en', locales: ['de', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [
    react(),
    // The Help Center's topic and article pages (Kev, 6 Nov: Figma 5362:10): Starlight's doc layout and
    // features (Pagefind search, sidebar, table of contents, DE/EN from the i18n config above), restyled
    // with our tokens in src/styles/help.css. Its home (/help/, /de/help/) is a normal site page.
    starlight({
      title: { en: 'Traqqr.ai Help Center', de: 'Traqqr.ai Hilfe-Center' },
      disable404Route: true, // the site's own 404 pages
      customCss: ['@fontsource-variable/manrope', '@fontsource/space-mono/400.css', './src/styles/help.css'],
      // Like the site: never indexed while it runs on *.vercel.app (BaseLayout.astro does the same).
      head: new URL(site).hostname.endsWith('.vercel.app') ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } }] : [],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      // No link icons beside the headings (Kev, 6 Nov); the headings keep their ids for the table of contents.
      markdown: { headingLinks: false },
      expressiveCode: { themes: ['github-dark-default'], styleOverrides: { borderRadius: '12px', borderColor: 'rgb(255 255 255 / 0.1)', codeBackground: '#1c1917', frames: { editorTabBarBackground: '#1c1917', editorActiveTabBackground: '#1c1917', editorActiveTabIndicatorTopColor: 'transparent', editorActiveTabIndicatorBottomColor: 'transparent', editorTabBarBorderBottomColor: 'rgb(255 255 255 / 0.1)', frameBoxShadowCssValue: 'none', terminalTitlebarBackground: '#1c1917' } } },
      sidebar: helpTopics.map((topic) => ({
        label: topic.label.en,
        translations: { de: topic.label.de },
        items: [`help/${topic.slug}`, ...topic.articles.map((article) => `help/${topic.slug}/${article}`)],
      })),
      components: {
        Header: './src/components/help/Header.astro',
        MobileMenuFooter: './src/components/help/MobileMenuFooter.astro',
        ThemeProvider: './src/components/help/ThemeProvider.astro',
        ThemeSelect: './src/components/help/Empty.astro',
        PageTitle: './src/components/help/PageTitle.astro',
        Footer: './src/components/help/Footer.astro',
      },
    }),
    // Astro writes src/pages/de/404.astro as de/404/index.html; hosts look for de/404.html (vercel.json's
    // route for unknown /de/ URLs, and Cloudflare's 404-page handling on the research branch).
    {
      name: 'de-404',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await rename(new URL('de/404/index.html', dir), new URL('de/404.html', dir));
          await rmdir(new URL('de/404/', dir));
        },
      },
    },
    // Pairs each page with its other language from src/i18n's routes, so pages whose slugs differ
    // (/integrations/ ↔ /de/integrationen/) get their hreflang links too.
    sitemap({
      filter: (page) => !new URL(page).pathname.endsWith('/404/'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const pair = Object.values(routes).find((r) => r.en === path || r.de === path);
        if (pair) item.links = /** @type {const} */ (['en', 'de']).map((lang) => ({ lang, url: new URL(pair[lang], item.url).href }));
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
