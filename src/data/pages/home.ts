import { integrations } from '@/data/integrations';
import type { Section } from '@/data/sections';
import { siteContent } from '@/data/site';

export interface HomePage {
  title: string;
  description: string;
  features: string[];
  sections: Section[];
}

const { trial, demo } = siteContent.cta;

export const homePage: HomePage = {
  title: 'Traqqr · Server-side tracking for Meta Ads',
  description:
    'Real-time tracking, attribution and insights for Meta Ads. Traqqr sends every visit, lead and sale to Meta from your server as well as the browser.',
  features: [
    'Server-side tracking for Meta Ads',
    'Live Feed of every event',
    'Browser and server event deduplication',
    'First-party reverse proxy on your own subdomain',
    'Event Inspector',
    `Integrations: ${integrations.map((i) => i.name).join(', ')}`,
  ],
  sections: [
    { kind: 'hero' },
    { kind: 'integrations' },
    {
      kind: 'problem',
      props: {
        id: 'problem',
        badge: 'The problem',
        title: "Your pixel misses sales. Traqqr doesn't.",
        lead: 'Ad blockers, cookie banners and browser limits stop the Meta Pixel from reporting every sale. Traqqr sends the same events from your server too.',
        columns: { bad: 'Meta Pixel only', good: 'Pixel + Traqqr' },
        rows: [
          { label: 'Ad blockers', bad: 'Events get blocked', good: 'Sent from your server' },
          { label: 'What Meta receives', bad: 'Gaps and missing sales', good: 'Every visit, lead and sale' },
          { label: 'Duplicates', bad: 'Counted twice or not at all', good: 'Deduplicated automatically' },
          { label: 'Matching people', bad: 'Weak match quality', good: 'Fingerprint helps Meta match' },
          { label: 'Setup', bad: 'Developer and tag manager', good: 'Minutes, no developer' },
        ],
      },
    },
    { kind: 'scene' },
    {
      kind: 'liveFeed',
      props: {
        id: 'product',
        badge: 'Live Feed',
        title: 'See every event the moment it happens.',
        body: 'Watch visits, leads and sales arrive in real time, and check exactly what reached Meta from the browser and from your server.',
        items: [
          'Live feed of every event',
          'Browser vs. server delivery',
          'Deduplication at a glance',
          'Fingerprint coverage per site',
          'Event Inspector for debugging',
        ],
        primaryAction: trial,
        secondaryAction: demo,
        media: { type: 'image', placeholderLabel: 'Live Feed screenshot coming soon' },
        grid: true,
      },
    },
    {
      kind: 'reverseProxy',
      props: {
        id: 'reverse-proxy',
        badge: 'First-party reverse proxy',
        title: ['Your domain. Your data.', 'Fewer blocked events.'],
        body: 'Route tracking through your own subdomain with Cloudflare, so ad blockers treat it like the rest of your site.',
        items: [
          'Runs on your own domain',
          'Set up with Cloudflare',
          'Up to 4 proxy domains per site',
          'Falls back safely if you switch it off',
        ],
        primaryAction: trial,
        secondaryAction: demo,
        media: { type: 'image', placeholderLabel: 'First-party reverse proxy screenshot coming soon' },
        mediaSide: 'left',
        grid: true,
        borderTop: true,
      },
    },
    {
      kind: 'howItWorks',
      props: {
        id: 'how-it-works',
        badge: 'How it works',
        title: 'Live in three steps.',
        lead: 'No tag manager, no developer. Most sites send their first server-side event within minutes.',
        steps: [
          {
            eyebrow: '01 / ADD YOUR SITE',
            title: 'Paste one snippet.',
            body: "Add the Traqqr snippet to your site's <head>. That's the only code you need.",
          },
          {
            eyebrow: '02 / CONNECT',
            title: 'Link Meta and your tools.',
            body: 'Connect your Meta pixel, then tools like KlickTipp, Digistore24 or EverWebinar.',
          },
          {
            eyebrow: '03 / WATCH',
            title: 'See every event arrive.',
            body: 'Live Feed shows what reached Meta, from the browser and from your server.',
          },
        ],
      },
    },
    {
      kind: 'testimonial',
      props: {
        id: 'testimonial',
        badge: 'Customers',
        title: 'Teams that track with Traqqr',
        quote: [
          '“Since we started using traqqr.ai, our processes',
          'run far more reliably. Errors are caught early and our team',
          'always knows exactly what to do.”',
        ],
        name: 'Dawid Przybylski',
        role: 'Founder & Managing Director, Visual Facilitators GmbH',
      },
    },
    { kind: 'faq' },
    {
      kind: 'cta',
      props: {
        id: 'cta',
        title: 'Stop losing conversions you paid for.',
        lead: 'Set up Traqqr in minutes and send every visit, lead and sale to Meta.',
        primaryAction: trial,
        secondaryAction: demo,
      },
    },
    { kind: 'globe' },
  ],
};
