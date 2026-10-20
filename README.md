# Traqqr

Marketing website for Traqqr, built with [Astro](https://astro.build) on the shared Traqqr component library, [`@klicktipp/traqqr-components`](https://github.com/klicktipp/traqqr-component-library).

## Stack

- **Astro** (static output). It ships zero JS by default and adds islands only where a page needs interactivity.
- **@klicktipp/traqqr-components**: the React component library shared with the app. Its version is pinned, so bump it on purpose. It provides the tokens, fonts and base styles through `styles.css`.
- **Tailwind CSS v4**: configured in `src/styles/global.css`, with no config file.
- **Storybook 10** (react-vite): only for the site's own React compositions. Library components are documented in the library's own Storybook.
- **pnpm**: package manager.

## Setup

The library is a private package on GitHub Packages. `.npmrc` reads `GITHUB_TOKEN`, which needs the `read:packages` scope:

```sh
export GITHUB_TOKEN=$(gh auth token)
pnpm install
```

## Using the library in Astro

- Library components render to static HTML unless you add `client:load`, `client:visible` or `client:idle`. Astro ignores `"use client"`.
- Interactive compound components (Select, Tooltip, Sheet, Tabs and similar) need their parts to share React context. Assemble each one in its own `.tsx` file under `src/components/` and hydrate that file as a whole. Don't assemble the parts in `.astro`, because context doesn't cross island boundaries. `src/components/SourcePicker.tsx` is an example.
- You can't pass event handlers from `.astro` files. Keep them inside the `.tsx`.
- For dark mode, add `class="dark"` to `<html>` or another ancestor.

## Commands

| Command                | Action                                   |
| :--------------------- | :--------------------------------------- |
| `pnpm dev`             | Start the dev server at `localhost:4321` |
| `pnpm build`           | Build the production site to `./dist/`   |
| `pnpm check`           | Type-check with `astro check`            |
| `pnpm storybook`       | Start Storybook at `localhost:6007`      |
| `pnpm build-storybook` | Build static Storybook                   |
