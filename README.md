# Traqqr

Marketing website for Traqqr, built with [Astro](https://astro.build) on the shared Traqqr component library, [`@klicktipp/traqqr-components`](https://github.com/klicktipp/traqqr-component-library).

## Stack

- **Astro** (static output). It ships zero JS by default and adds islands only where a page needs interactivity.
- **@klicktipp/traqqr-components**: the React component library shared with the app. Its version is pinned, so bump it on purpose. It provides the tokens, fonts and base styles through `styles.css`.
- **Tailwind CSS v4**: configured in `src/styles/global.css`, with no config file.
- **Storybook 10** (react-vite): the site's own sections and building blocks (see below). Library components are documented in the library's own Storybook.
- **pnpm**: package manager.

## Setup

The library is a private package on GitHub Packages, and `.npmrc` maps the `@klicktipp` scope to that registry. The token needs the `read:packages` scope. pnpm 10 ignores `${...}` placeholders in a committed `.npmrc` for credentials, so pass the token through the environment:

```sh
env "npm_config_//npm.pkg.github.com/:_authToken=$(gh auth token)" pnpm install
```

Once installed, `pnpm dev` and `pnpm build` need no registry access. In CI, write the token to `$HOME/.npmrc` before install.

## Using the library in Astro

- Library components render to static HTML unless you add `client:load`, `client:visible` or `client:idle`. Astro ignores `"use client"`.
- Interactive compound components (Select, Tooltip, Sheet, Tabs and similar) need their parts to share React context. Assemble each one in its own `.tsx` file under `src/components/` and hydrate that file as a whole. Don't assemble the parts in `.astro`, because context doesn't cross island boundaries. `src/components/website/LogoTiles.tsx` (Tooltip) and `src/components/sections/SiteNav.tsx` (NavigationMenu + Sheet) are examples.
- You can't pass event handlers from `.astro` files. Keep them inside the `.tsx`.
- For dark mode, add `class="dark"` to `<html>` or another ancestor.

## Project structure

Pages are lists of sections. Sections and their building blocks are React components, so they can be shown in Storybook. Astro renders them to static HTML and only hydrates the ones that need behaviour (`client:*` in `src/pages/index.astro`).

- From the library: the shared website sections (`ComparisonTable`, `TextMedia`, `HowItWorks`, `Testimonial`, `Cta`) and their building blocks (`Section`, `SectionHeading`, `LandingCard`, `Chamfered`, `CtaButtons`, the video/image placeholders), with the landing tokens, grid and chamfer CSS. They take all their copy as props, which `src/pages/index.astro` passes. Changes to them go through the library.
- `src/components/sections/`: the site's own homepage blocks (nav, hero, integrations strip, FAQ, footer, plus Kev's scroll video and globe). Each takes its copy as props, with the homepage copy as the default. Storybook: **Website Sections**.
- `src/components/website/`: site-only building blocks (`LogoTiles`). Storybook: **Website Components**.
- `src/components/ui/`: stock shadcn components the library doesn't ship (NavigationMenu, Accordion). Don't edit them; style them from the component that uses them.
- `src/data/`: shared content (`integrations.ts`, `links.ts`).
- `src/scripts/motion/`: Kev's scroll video and globe scripts. Keep them as they are; they hold the timing.

The design source is the Figma file `AuTDmsP70q09vix9pojWv0` (homepage `5004:62488`, mobile `5063:15558`). Each component names the Figma node it implements.

## Commands

| Command                | Action                                   |
| :--------------------- | :--------------------------------------- |
| `pnpm dev`             | Start the dev server at `localhost:4321` |
| `pnpm build`           | Build the production site to `./dist/`   |
| `pnpm check`           | Type-check with `astro check`            |
| `pnpm storybook`       | Start Storybook at `localhost:6007`      |
| `pnpm build-storybook` | Build static Storybook                   |

## Launching on the real domain

The site runs on traqqr.vercel.app until launch. That address is kept out of search results: `vercel.json` sends `X-Robots-Tag: noindex` on every `*.vercel.app` host, so it stops applying on its own once the site is served from the real domain. When the domain goes live:

- Set `site:` in `astro.config.mjs` to the real domain (canonical, Open Graph, sitemap, structured data and `/llms.txt` all follow it).
- Update the `Sitemap:` line in `public/robots.txt`.
- Check the domain's response has no `X-Robots-Tag` header, then submit the sitemap in Google Search Console.
