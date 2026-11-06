import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /about/ · /de/ueber-uns/: how Traqqr.ai began (Kev's 6 Nov handover: Figma 5400:3 DE, 5402:1998 EN, mobile
// 5401:485). Hero, the founder's message (the old homepage block's copy, DE 5396:31422, EN 4689:46864), the
// journey timeline (steps in src/data/about.ts) and the CTA. Linked from the footer's Über uns / About.
// ⚑ PLACEHOLDER: the hero lead is lorem ipsum until Kev sends the copy.

const lead = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.';

export const about: Record<Locale, ContentPage> = {
  de: {
    title: 'Über uns · Traqqr.ai',
    description: 'Wie Traqqr.ai entstanden ist: die Geschichte hinter dem Tracking für lange Funnel und das Team dahinter.',
    sections: [
      {
        kind: 'pageHero',
        props: { layout: 'centred', breadcrumb: { current: 'Über uns' }, title: 'Wie Traqqr.ai entstanden ist.', lead },
      },
      {
        kind: 'founder',
        props: {
          name: 'Mario Wolosz',
          role: 'Gründer von Traqqr.ai',
          headline: 'Nutze die Technologie von morgen schon heute.',
          message:
            '„Geld kannst Du immer wieder verdienen. Einmal verstrichene Zeit kehrt dagegen nie wieder zurück. Automatisierte Marketing- und Vertriebsprozesse bilden das Fundament Deines hyperprofitablen Unternehmens, das ohne Dich funktioniert. Starte noch heute und sichere Dir Deinen Automatisierungsvorsprung.“',
        },
      },
      {
        kind: 'journey',
        props: { eyebrow: 'Unsere Geschichte', title: 'Von der Idee zu Traqqr.ai.', action: '14 Tage kostenlos testen' },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Sieh die ganze Journey.',
          lead: 'Vom ersten Klick bis zum Kauf Wochen später – geräteübergreifend.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'About us · Traqqr.ai',
    description: 'How Traqqr.ai came to be: the story behind tracking for long funnels and the team behind it.',
    sections: [
      {
        kind: 'pageHero',
        props: { layout: 'centred', breadcrumb: { current: 'About us' }, title: 'How Traqqr.ai came to be.', lead },
      },
      {
        kind: 'founder',
        props: {
          name: 'Mario Wolosz',
          role: 'Founder of Traqqr.ai',
          headline: "Use tomorrow's technology today.",
          message:
            "“You can always earn money again. But time, once it's gone, never comes back. Automated marketing and sales processes are the foundation of a highly profitable business that runs without you. Start today and secure your automation head start.”",
        },
      },
      {
        kind: 'journey',
        props: { eyebrow: 'Our story', title: 'From the idea to Traqqr.ai.', action: 'Try it free for 14 days' },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'See the whole journey.',
          lead: 'From the first click to the purchase weeks later – across devices.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
