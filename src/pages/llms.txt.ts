import type { APIRoute } from 'astro';
import { faqItems } from '@/data/faq';
import { integrations } from '@/data/integrations';
import { signupHref } from '@/data/links';

// /llms.txt (llmstxt.org): a plain-text summary for AI assistants and answer engines, built from the
// same copy as the homepage so it can't drift. Add a line per page as pages are added.
export const GET: APIRoute = ({ site }) => {
  const home = new URL('/', site).href;
  const body = `# Traqqr

> Real-time tracking, attribution and insights for Meta Ads. Traqqr sends every visit, lead and sale to Meta from your server as well as the browser, so ad blockers and cookie banners stop costing you conversions.

## What it does

- Server-side tracking: your server sends each visit, lead and sale to Meta directly, alongside the Meta Pixel in the browser. Meta counts each event once (deduplication).
- Live Feed: every event as it arrives, with browser vs. server delivery, deduplication and fingerprint coverage per site.
- Event Inspector: exactly what each event sent to Meta contained.
- First-party reverse proxy: tracking through your own subdomain with Cloudflare (up to 4 proxy domains per site), so ad blockers block browser events far less often.
- Setup: paste one snippet into your site's <head> and connect Meta from the dashboard. No developer or tag manager needed.

## Integrations

${integrations.map((i) => `- ${i.name}`).join('\n')}

## FAQ

${faqItems.map((i) => `### ${i.question}\n\n${i.answer}`).join('\n\n')}

## Links

- [Homepage](${home})
- [Start a free trial](${signupHref})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
