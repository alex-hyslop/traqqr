import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// The Help Center's articles and topic pages (Starlight; Kev's 6 Nov handover). English in src/content/docs/help/,
// German in src/content/docs/de/help/ with the same file names, so Starlight pairs the translations.
export const collections = {
  // Starlight's UI strings: its built-in DE/EN translations (no overrides in src/content/i18n/ yet).
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** A topic page (a sidebar group's "Overview"): lists its articles instead of a table of contents. */
        topic: z.boolean().default(false),
        /** A topic's one-line summary on the Help Center home card. */
        summary: z.string().optional(),
        /** On a topic page, the label its article is listed under ("Einrichten", "Fehlerbehebung"). */
        section: z.string().optional(),
        /** Not written yet: the page says so instead of pretending. */
        placeholder: z.boolean().default(false),
      }),
    }),
  }),
};
