# Blog content

Drop `.md`/`.mdx` files in this directory to publish blog posts. Schema is defined in `src/content.config.ts` (the `blog` collection).

Required frontmatter: `title`, `description`, `publishDate`. Optional: `updatedDate`, `author` (defaults to "Traqqr Team"), `tags`, `draft`, `ogImage`.

No blog listing/detail pages exist yet (v1 ships the homepage only) — this is scaffolded so the collection can be wired up without restructuring later.
