import type { ContentPage } from '@/data/pages/content';
import { helpPath, popularSearches } from '@/data/help';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /help/ · /de/help/: the Help Center home (Kev's 6 Nov handover: Figma 5362:11 DE, 5369:230 EN, mobile 5370:10).
// A normal site page (nav, FAQ, CTA, footer); the topics and articles behind it are Starlight pages
// (src/content/docs). FAQ 1's response time is still to be confirmed by Kev (⚑ in his note); the EN FAQ
// answers 2–5 are translated from his German.

const search = (locale: Locale, placeholder: string, popularLabel: string) => ({
  placeholder,
  popularLabel,
  popular: popularSearches.map((item) => ({ label: item.label[locale], href: helpPath(item.article, locale) })),
});

export const help: Record<Locale, ContentPage> = {
  de: {
    title: 'Hilfe-Center · Traqqr.ai',
    description: 'Anleitungen, Antworten und Lösungen für Traqqr.ai: vom ersten Setup bis zur Fehlersuche.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Hilfe-Center' },
          title: 'Wie können wir helfen?',
          lead: 'Anleitungen, Antworten und Lösungen für Traqqr.ai: vom ersten Setup bis zur Fehlersuche.',
          search: search('de', 'Suche nach Themen, Fehlern, Integrationen …', 'Beliebt'),
        },
      },
      {
        kind: 'helpHome',
        props: {
          topics: { eyebrow: 'Themen', title: 'Nach Thema stöbern.', all: 'Alle Artikel' },
          popular: { eyebrow: 'Häufig gelesen', title: 'Das suchen andere gerade.' },
          stuck: {
            support: { title: 'Nicht gefunden, was Du suchst?', body: 'Schreib uns. Wir antworten werktags, auf Deutsch.', action: 'Support kontaktieren' },
            start: { title: 'Gerade erst gestartet?', body: 'Die Anleitungen unter „Erste Schritte“ bringen Dich in 3 Schritten zum ersten Event.', action: 'Erste Schritte' },
          },
        },
      },
      {
        kind: 'faq',
        props: {
          title: 'Häufige Fragen zum Hilfe-Center',
          items: [
            { question: 'Wie schnell bekomme ich Antwort vom Support?', answer: 'Wir antworten werktags per E-Mail, auf Deutsch.' },
            {
              question: 'Gibt es eine Anleitung für mein Setup?',
              answer:
                'Für die häufigsten Setups gibt es Schritt-für-Schritt-Anleitungen: Meta CAPI, Reverse Proxy, KlickTipp, Digistore24 und WebinarJam. Fang mit „Erste Schritte“ an.',
            },
            {
              question: 'Gibt es Anleitungen für Entwickler?',
              answer:
                'Ja. Unter „Tracking einrichten“ und „Integrationen“ findest Du Schritt-für-Schritt-Anleitungen für das Script, den Reverse Proxy und die Server-Events.',
            },
            { question: 'Warum sehe ich keine Events im Live Feed?', answer: 'Meistens fehlt das Tracking-Script oder die Domain ist noch nicht verbunden.' },
            { question: 'Kann ich Traqqr.ai vorher testen?', answer: 'Ja, 14 Tage kostenlos.' },
          ],
        },
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
    title: 'Help Center · Traqqr.ai',
    description: 'Guides, answers and fixes for Traqqr.ai: from the first setup to troubleshooting.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Help Center' },
          title: 'How can we help?',
          lead: 'Guides, answers and fixes for Traqqr.ai: from the first setup to troubleshooting.',
          search: search('en', 'Search topics, errors, integrations …', 'Popular'),
        },
      },
      {
        kind: 'helpHome',
        props: {
          topics: { eyebrow: 'Topics', title: 'Browse by topic.', all: 'All articles' },
          popular: { eyebrow: 'Most read', title: 'What others are looking for.' },
          stuck: {
            support: { title: "Can't find what you're looking for?", body: 'Write to us. We reply on working days.', action: 'Contact support' },
            start: { title: 'Just getting started?', body: 'The Getting started guides take you to your first event in 3 steps.', action: 'Getting started' },
          },
        },
      },
      {
        kind: 'faq',
        props: {
          title: 'Help Center FAQ',
          items: [
            { question: 'How quickly does support reply?', answer: 'We reply by email on working days.' },
            {
              question: 'Is there a guide for my setup?',
              answer:
                'There are step-by-step guides for the most common setups: Meta CAPI, reverse proxy, KlickTipp, Digistore24 and WebinarJam. Start with "Getting started".',
            },
            {
              question: 'Are there guides for developers?',
              answer: "Yes. Under Tracking setup and Integrations you'll find step-by-step guides for the script, the reverse proxy and server events.",
            },
            { question: "Why don't I see any events in the Live Feed?", answer: "Usually the tracking script is missing or the domain isn't connected yet." },
            { question: 'Can I try Traqqr.ai first?', answer: 'Yes, free for 14 days.' },
          ],
        },
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
