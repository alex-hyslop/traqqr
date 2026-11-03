import { integrations } from '@/data/integrations';
import type { HomePage } from '@/data/pages/home';
import { siteContent } from '@/data/site';

// English homepage at /en/ (Figma: Homepage v2 5212:17935, Kev's 3 Nov handover §4). The copy is Kev's.
// The meta title and description are ours, from the hero and the footer tagline, until Kev writes them.

const { trial, demo } = siteContent.en.cta;

export const homeEn: HomePage = {
  title: 'Traqqr · Ad, conversion and fingerprint tracking for long funnels',
  description:
    'Traqqr shows you, across weeks, devices and every touchpoint, which campaign, ad or creative really brings customers.',
  features: [
    'Ad tracking: the campaign, ad and creative behind the first click',
    'Server-side conversion tracking',
    'Fingerprint tracking across devices and sessions',
    'Attribution across long customer journeys',
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
        demoLabel: 'Watch demo · 2 min',
        videoLabel: 'Play the 2-minute demo',
      },
    },
    { kind: 'trust', props: { items: ['GDPR-compliant', 'EU-hosted', 'Servers in Germany'] } },
    {
      kind: 'stats',
      props: {
        title: 'Measured to the sale. Not just to the click.',
        // Three, not four: the EN frame drops "native DACH integrations".
        items: [
          { value: '3', label: 'tracking layers' },
          { value: '360°', label: 'view of the funnel' },
          { value: 'EU', label: 'hosting, servers in Europe' },
        ],
      },
    },
    {
      kind: 'cards',
      props: {
        id: 'problem',
        badge: 'The problem',
        title: 'Your tracking has gone blind.',
        lead: 'iOS, ad blockers and cookie banners have blinded your pixel and GA4. You are paying for clicks you can no longer see.',
        cards: [
          { eyebrow: '01 / iOS', title: 'Less signal.', body: 'Privacy features on iOS limit classic pixel tracking.' },
          { eyebrow: '02 / AD BLOCKERS', title: 'Blocked pixels.', body: 'Ad blockers stop browser pixels from firing at all.' },
          { eyebrow: '03 / COOKIE BANNERS', title: 'Gaps in the funnel.', body: 'Without consent, clicks and events go missing from your reports.' },
          { eyebrow: '04 / LONG JOURNEYS', title: 'No connection.', body: 'When days or weeks pass between click and sale, the chain breaks.' },
        ],
      },
    },
    {
      kind: 'funnel',
      props: {
        id: 'long-funnel',
        badge: 'Long funnels',
        title: 'From the first click to the sale.',
        lead: 'From the ad click to the call three weeks later: finally, you see the whole path.',
        steps: [
          { number: '01', label: 'AD CLICK', title: 'Ad tracking', body: 'Identifies the campaign, ad and creative behind the first click.' },
          { number: '02', label: 'OPT-IN', title: 'Server-side', body: 'Conversion tracking captures the opt-in on the server.' },
          { number: '03', label: 'EMAIL', title: 'KlickTipp', body: 'Funnel data flows into segments, tags and\nfollow-ups.' },
          { number: '04', label: 'WEBINAR', title: 'Webinaris', body: 'Registration and attendance, matched to the\nright ad.' },
          { number: '05', label: 'CALL', title: 'Cross-device', body: 'Fingerprint tracking joins devices, sessions\nand touchpoints.' },
          { number: '06', label: 'PURCHASE', title: 'Digistore24', body: 'The sale weeks later is credited to the ad that started it.' },
        ],
        action: { label: 'How Traqqr works', href: demo.href },
      },
    },
    {
      kind: 'testimonial',
      props: {
        id: 'testimonial',
        badge: 'Customers',
        title: 'Teams that track with Traqqr',
        quote: [
          '“Since we started using traqqr.ai, our processes run far',
          'more reliably. Errors are caught early and our team always',
          'knows exactly what to do.”',
        ],
        name: 'Dawid Przybylski',
        role: 'Founder & Managing Director, Visual Facilitators GmbH',
      },
    },
    { kind: 'integrations', props: { title: 'Integrations', lead: 'Natively connected to your DACH funnel stack.' } },
    {
      kind: 'howItWorks',
      props: {
        id: 'why-traqqr',
        badge: 'Why Traqqr',
        title: 'Live faster. Easier to use.',
        lead: 'Pro-grade tracking without an enterprise price or a sales call.',
        steps: [
          { eyebrow: '01 / SELF-SERVE', title: 'No sales call needed.', body: 'Create an account and set it up yourself.' },
          { eyebrow: '02 / SETUP', title: 'No setup marathon.', body: 'No weeks of onboarding and no enterprise entry level.' },
          { eyebrow: '03 / DACH STACK', title: 'Natively connected.', body: 'KlickTipp, Digistore24, HubSpot and Webinaris, no workarounds.' },
        ],
      },
    },
    {
      kind: 'scene',
      props: { label: 'Example: a purchase tracked live', caption: 'Example data · the card is live HTML over the video' },
    },
    {
      kind: 'faq',
      props: {
        title: 'Frequently asked questions',
        // Only the first answer is written (Figma 5212:17946); the other four questions wait for Kev's answers.
        items: [
          {
            question: 'What is Traqqr?',
            answer:
              'Traqqr is an ad, conversion and fingerprint tracking solution for German-speaking funnel marketers. It connects ad clicks, website events, opt-ins, webinars, calls and purchases across longer customer journeys.',
          },
        ],
      },
    },
    {
      kind: 'cta',
      props: {
        id: 'cta',
        title: 'Which ad brings your customers?',
        lead: 'Find out, from the first click to the sale weeks later.',
        primaryAction: trial,
        secondaryAction: demo,
      },
    },
    { kind: 'globe', props: { label: 'Example events arriving from around Europe' } },
  ],
};
