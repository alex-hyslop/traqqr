import type { APIRoute } from 'astro';
import { integrations } from '@/data/integrations';
import { homePages } from '@/data/pages/home';
import { priceTiers, trialDays } from '@/data/pricing';
import { siteContent } from '@/data/site';
import { pathFor } from '@/i18n';

// /llms.txt (llmstxt.org): a plain-text summary for AI assistants and answer engines, built from the
// same copy as the English homepage so it can't drift. Add a line per page as pages are added.
export const GET: APIRoute = ({ site }) => {
  const faqItems = homePages.en.sections.flatMap((section) => (section.kind === 'faq' ? section.props.items : []));
  const body = `# Traqqr.ai

> Real-time tracking, attribution and insights for Meta Ads. Traqqr.ai sends every visit, lead and sale to Meta from your server as well as the browser, so ad blockers and cookie banners stop costing you conversions.

## What it does

- Server-side tracking: your server sends each visit, lead and sale to Meta directly, alongside the Meta Pixel in the browser. Meta counts each event once (deduplication).
- Live Feed: every event as it arrives, with browser vs. server delivery, deduplication and fingerprint coverage per site.
- Event Inspector: exactly what each event sent to Meta contained.
- First-party reverse proxy: tracking through your own subdomain with Cloudflare (up to 4 proxy domains per site), so ad blockers block browser events far less often.
- Setup: paste one snippet into your site's <head> and connect Meta from the dashboard. No developer or tag manager needed.

## Pricing

Billed per website, by events per month. Free trial: ${trialDays} days. Price per website a month:

${priceTiers.map((t) => `- ${t.events.toLocaleString('en-GB')} events: €${(t.priceCents / 100).toLocaleString('en-GB')}`).join('\n')}

## Integrations

${integrations.map((i) => `- ${i.name}`).join('\n')}

## FAQ

${faqItems.map((i) => `### ${i.question}\n\n${i.answer}`).join('\n\n')}

## Links

- [Homepage (English)](${new URL(pathFor('home', 'en'), site).href})
- [Homepage (German)](${new URL(pathFor('home', 'de'), site).href})
- [Pricing (English)](${new URL(pathFor('pricing', 'en'), site).href})
- [Pricing (German)](${new URL(pathFor('pricing', 'de'), site).href})
- [Help Center (English)](${new URL(pathFor('help', 'en'), site).href})
- [About us (English)](${new URL(pathFor('about', 'en'), site).href})
- [About us (German)](${new URL(pathFor('about', 'de'), site).href})
- [Contact (English)](${new URL(pathFor('contact', 'en'), site).href})
- [Contact (German)](${new URL(pathFor('contact', 'de'), site).href})
- [Start a free trial](${siteContent.en.cta.trial.href})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
