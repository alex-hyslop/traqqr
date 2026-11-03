import { integrations } from '@/data/integrations';
import type { HomePage } from '@/data/pages/home';
import { siteContent } from '@/data/site';

// English homepage at /en/. Hero: Homepage v2 (Figma 5212:17936). The other sections are still the
// 20 Oct homepage until Homepage v2 replaces them.

const { trial, demo } = siteContent.en.cta;

export const homeEn: HomePage = {
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
    {
      kind: 'hero',
      props: {
        title: 'Which ad really brought you that customer?',
        lead: 'Traqqr shows you, across weeks, devices and every touchpoint, which campaign, ad or creative really brings customers – natively connected to KlickTipp, Digistore24, HubSpot and Webinaris.',
        features: [
          { eyebrow: '01 / AD TRACKING', title: 'First click identified.', body: 'Which campaign, ad or creative brought the first click.' },
          { eyebrow: '02 / CONVERSION TRACKING', title: 'Events, server-side.', body: 'Key events and purchases, captured on the server.' },
          { eyebrow: '03 / FINGERPRINT TRACKING', title: 'One journey.', body: 'Devices, sessions and touchpoints joined into one customer journey.' },
          { eyebrow: '04 / ATTRIBUTION', title: 'Budget that works.', body: 'Invest in the ads that really bring customers.' },
        ],
        demoLabel: 'Watch demo · 2\u00a0min',
        videoLabel: 'Play the 2-minute demo',
      },
    },
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
    {
      kind: 'faq',
      props: {
        title: 'Frequently asked questions',
        // Answers from Kev, Slack, 20 Oct 11:41.
        items: [
          {
            question: 'What is server-side tracking?',
            answer:
              "Your server sends each visit, lead and sale to Meta directly, instead of relying only on the pixel in the visitor's browser. Ad blockers and browser limits can't stop that copy.",
          },
          {
            question: 'Do I need a developer to set it up?',
            answer: "No. You paste one snippet into your site's <head> and connect Meta from the dashboard.",
          },
          {
            question: 'Which tools does Traqqr work with?',
            answer: 'Meta Ads and Facebook, plus Cloudflare, KlickTipp, Digistore24, Ablefy, EverWebinar, Webinaris and HubSpot.',
          },
          {
            question: 'Does Traqqr replace my Meta Pixel?',
            answer:
              'No. Traqqr works alongside your pixel. Meta gets each event from the browser and from your server, and counts it once thanks to deduplication.',
          },
          {
            question: 'Will ad blockers still block my tracking?',
            answer:
              "Server-side events aren't affected. With the first-party reverse proxy on your own subdomain, browser events are blocked far less often too.",
          },
          {
            question: 'Can I see what is sent to Meta?',
            answer: 'Yes. Live Feed shows every event as it arrives, and Event Inspector shows exactly what each one contained.',
          },
          {
            question: 'Can I try Traqqr for free?',
            answer: 'Start a free trial from any "Start free trial" button on this page.',
          },
    
        ],
      },
    },
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
