import { pathFor, type Locale } from '@/i18n';

// Landing nav content (Kev's 20 Oct nav update, Figma 5073:16323; Solutions panel 5273:36; DE copy from
// the 3 Nov handover §3.3). Links go to the built pages, by key in src/i18n; the rest stay "#" until their
// pages exist, except "Start free trial" and "Log in", which go to the app login. Desktop dropdowns and the
// mobile menu share them.

export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export type ResourceLink = NavLink & { icon: 'docs' | 'help' | 'blog' };

export interface NavLinks {
  product: NavLink[];
  /** The Lösungen / Solutions panel: a featured Traqqr card (not a link) beside the four pages. */
  solutions: { featured: { title: string; description: string }; links: NavLink[] };
  resources: ResourceLink[];
}

export const navLinks: Record<Locale, NavLinks> = {
  de: {
    product: [
      { title: 'Live Feed', description: 'Sieh jedes Event in dem Moment, in dem es ankommt.', href: pathFor('liveFeed', 'de') },
      { title: 'Reverse Proxy', description: 'Tracking über Deine eigene Subdomain.', href: pathFor('reverseProxy', 'de') },
      { title: 'Event Inspector', description: 'Sieh genau, was bei Meta angekommen ist.', href: pathFor('eventInspector', 'de') },
    ],
    solutions: {
      featured: {
        title: 'Traqqr',
        description: 'Tracking für lange Funnels: vom ersten Anzeigenklick bis zum Kauf Wochen später.',
      },
      links: [
        { title: 'Serverseitiges Tracking', description: 'Meta CAPI vom Server, für lange Funnels.', href: pathFor('serverSideTracking', 'de') },
        { title: 'Webinar-Funnel-Tracking', description: 'Webinare, Calls und High-Ticket-Verkäufe.', href: pathFor('webinarFunnelTracking', 'de') },
        { title: 'Fingerprint Tracking', description: 'Ein Kunde über Geräte und Wochen hinweg.', href: pathFor('fingerprintTracking', 'de') },
        { title: 'KlickTipp Tracking', description: 'Quelle, Kampagne und Anzeige als KlickTipp-Tags.', href: pathFor('klicktippTracking', 'de') },
      ],
    },
    resources: [
      { title: 'Docs', description: 'Setup-Anleitungen und API-Referenz.', href: '#', icon: 'docs' },
      { title: 'Hilfe-Center', description: 'Antworten auf häufige Fragen.', href: '#', icon: 'help' },
      { title: 'Blog', description: 'Produkt-News und Tracking-Tipps.', href: '#', icon: 'blog' },
    ],
  },
  en: {
    product: [
      { title: 'Live Feed', description: 'Watch every event arrive as it happens.', href: pathFor('liveFeed', 'en') },
      { title: 'Reverse proxy', description: 'Track through your own subdomain.', href: pathFor('reverseProxy', 'en') },
      { title: 'Event Inspector', description: 'See exactly what reached Meta.', href: pathFor('eventInspector', 'en') },
    ],
    solutions: {
      featured: {
        title: 'Traqqr',
        description: 'Tracking for long funnels: from the first ad click to the sale weeks later.',
      },
      links: [
        { title: 'Server-side tracking', description: 'Meta CAPI from the server, for long funnels.', href: pathFor('serverSideTracking', 'en') },
        { title: 'Webinar funnel tracking', description: 'Webinars, calls and high-ticket sales.', href: pathFor('webinarFunnelTracking', 'en') },
        { title: 'Fingerprint tracking', description: 'One customer across devices and weeks.', href: pathFor('fingerprintTracking', 'en') },
        { title: 'KlickTipp tracking', description: 'Source, campaign and ad as KlickTipp tags.', href: pathFor('klicktippTracking', 'en') },
      ],
    },
    resources: [
      { title: 'Docs', description: 'Set-up guides and API reference.', href: '#', icon: 'docs' },
      { title: 'Help center', description: 'Answers to common questions.', href: '#', icon: 'help' },
      { title: 'Blog', description: 'Product news and tracking tips.', href: '#', icon: 'blog' },
    ],
  },
};

export const integrationsHref = (locale: Locale) => pathFor('integrations', locale);
export const pricingHref = '#';
export const signupHref = 'https://traqqr.ai/app/login';
export const loginHref = signupHref;
/** The 2-minute demo video. Until it exists, the homepage's Sunbeam scene, which plays when a link
 * lands on it (Homepage v2 has no "How it works" any more). Absolute so other pages can link to it. */
export const demoHref = (locale: Locale) => `${pathFor('home', locale)}#scene`;
