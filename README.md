# Traqqr

Marketing website for Traqqr, built with [Astro](https://astro.build), [shadcn/ui](https://ui.shadcn.com), and Tailwind CSS v4. Design source: Figma file "Traqqr Shadcn UI Kit".

## Stack

- **Astro** (static output) — zero-JS by default, islands only where interactive
- **shadcn/ui + React** — interactive components (e.g. mobile nav) hydrate as islands (`client:visible`); static pieces render as plain `.astro` markup using the same design tokens
- **Tailwind CSS v4** — CSS-first theme in `src/styles/global.css`, dark-first (single palette, no light/dark toggle)
- **Astro Content Layer API** — scaffolded collections (`blog`, `changelog`, `case-studies`) in `src/content.config.ts` for future structured content
- **pnpm** — package manager

## Project structure

```
src/
├── components/
│   ├── ui/        shadcn primitives (owned by the shadcn CLI)
│   ├── blocks/     one folder per homepage section, canonical home for that section's markup/copy
│   ├── common/     shared pieces used by 2+ blocks (not shadcn primitives)
│   └── seo/        MetaTags, JsonLd
├── content.config.ts + content/   Markdown/MDX collections (empty in v1)
├── layouts/BaseLayout.astro       sole owner of <head>, meta/OG/JSON-LD, global CSS import
├── lib/            cn() helper, SEO helpers
└── pages/index.astro              assembles blocks only — no section markup lives here
```

See `src/components/blocks/FIGMA_MAP.md` for the Figma layer → component mapping.

## Commands

| Command | Action |
| --- | --- |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview the build locally |
| `pnpm exec astro check` | Type-check + validate content schemas |

## Deployment

Deploys to Vercel with static output — no adapter needed. Set the real production domain in `astro.config.mjs` (`site` field, currently a placeholder) before launch.
