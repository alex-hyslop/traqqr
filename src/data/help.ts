// The Help Center's structure, in one place (Kev's 6 Nov handover, Figma 5362:10): the six topics in order, each
// topic's articles in sidebar order, which three each home card shows, and the home page's popular articles.
// The Starlight sidebar (astro.config.mjs) and the Help Center home read it. Titles and descriptions live in
// each article's frontmatter (src/content/docs/help/ and /de/help/, the same slugs in both languages).
import type { Locale } from '@/i18n';

export interface HelpTopic {
  slug: string;
  label: Record<Locale, string>;
  /** lucide icon on the home card. */
  icon: 'rocket' | 'code' | 'plug' | 'target' | 'activity' | 'credit-card';
  /** Article slugs, in sidebar order (the topic's own page comes first as "Overview"). */
  articles: string[];
  /** The three on the home card: an article of this topic, or `topic/article` from another one. */
  featured: string[];
}

export const helpTopics: HelpTopic[] = [
  {
    slug: 'getting-started',
    label: { en: 'Getting started', de: 'Erste Schritte' },
    icon: 'rocket',
    articles: ['set-up-in-3-steps', 'add-tracking-script', 'check-first-event'],
    featured: ['set-up-in-3-steps', 'add-tracking-script', 'check-first-event'],
  },
  {
    slug: 'tracking-setup',
    label: { en: 'Tracking setup', de: 'Tracking einrichten' },
    icon: 'code',
    articles: ['standard-and-custom-events', 'reverse-proxy', 'fingerprint-tracking'],
    featured: ['standard-and-custom-events', 'reverse-proxy', 'fingerprint-tracking'],
  },
  {
    slug: 'integrations',
    label: { en: 'Integrations', de: 'Integrationen' },
    icon: 'plug',
    articles: ['klicktipp', 'digistore24', 'webinarjam'],
    featured: ['klicktipp', 'digistore24', 'webinarjam'],
  },
  {
    slug: 'meta-ads-capi',
    label: { en: 'Meta Ads & CAPI', de: 'Meta Ads & CAPI' },
    icon: 'target',
    articles: ['connect-conversions-api', 'deduplicate-events', 'event-match-quality', 'missing-events', 'error-codes', 'invalid-access-token'],
    featured: ['connect-conversions-api', 'deduplicate-events', 'event-match-quality'],
  },
  {
    slug: 'live-feed-event-inspector',
    label: { en: 'Live Feed & Event Inspector', de: 'Live Feed & Event Inspector' },
    icon: 'activity',
    articles: ['read-live-feed', 'check-event-inspector'],
    featured: ['read-live-feed', 'check-event-inspector', 'meta-ads-capi/error-codes'],
  },
  {
    slug: 'account-billing',
    label: { en: 'Account & billing', de: 'Konto & Abrechnung' },
    icon: 'credit-card',
    articles: ['change-plan', 'invoices', 'team'],
    featured: ['change-plan', 'invoices', 'team'],
  },
];

/** The home hero's three popular searches: a short label and the article they open. */
export const popularSearches: { label: Record<Locale, string>; article: string }[] = [
  { label: { en: 'Connect Meta CAPI', de: 'Meta CAPI verbinden' }, article: 'meta-ads-capi/connect-conversions-api' },
  { label: { en: 'Set up a reverse proxy', de: 'Reverse Proxy einrichten' }, article: 'tracking-setup/reverse-proxy' },
  { label: { en: 'Events missing in Events Manager', de: 'Events fehlen im Event Manager' }, article: 'meta-ads-capi/missing-events' },
];

/** "Most read" on the home page: the article, and its category label if it isn't the topic's. */
export const popularArticles: { article: string; category?: Record<Locale, string> }[] = [
  { article: 'meta-ads-capi/connect-conversions-api' },
  { article: 'meta-ads-capi/missing-events', category: { en: 'Troubleshooting', de: 'Fehlerbehebung' } },
  { article: 'tracking-setup/reverse-proxy' },
  { article: 'integrations/klicktipp' },
  { article: 'meta-ads-capi/deduplicate-events' },
  { article: 'live-feed-event-inspector/check-event-inspector' },
];

/** The URL of a Help Center page in a language: '' (the home), `topic` or `topic/article`, the same slugs in both. */
export const helpPath = (slug: string, locale: Locale) => `${locale === 'de' ? '/de' : ''}/help/${slug ? `${slug}/` : ''}`;
