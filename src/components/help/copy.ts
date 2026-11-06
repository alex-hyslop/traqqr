// The Help Center's own labels (Kev's 6 Nov handover). Starlight's built-in strings (search dialog, "On this
// page", the mobile menu) come from its DE/EN translations; these are the ones our overrides add.
import type { Locale } from '@/i18n';

export const helpCopy = {
  de: {
    helpCenter: 'Hilfe-Center',
    website: 'Zur Website',
    dashboard: 'Zum Dashboard',
    language: 'Sprache wählen',
    updated: 'Zuletzt aktualisiert',
    minutes: (n: number) => `${n} Min. Lesezeit`,
    articles: (n: number) => `${n} ${n === 1 ? 'Artikel' : 'Artikel'}`,
    otherArticles: 'Artikel',
    helpful: 'War dieser Artikel hilfreich?',
    yes: 'Ja',
    no: 'Nein',
    thanks: 'Danke für Dein Feedback.',
    previous: 'Zurück',
    next: 'Weiter',
    missing: 'Nicht dabei?',
    missingLead: 'Schreib uns, wir helfen Dir weiter.',
    contact: 'Support kontaktieren',
  },
  en: {
    helpCenter: 'Help Center',
    website: 'Website',
    dashboard: 'Dashboard',
    language: 'Choose language',
    updated: 'Last updated',
    minutes: (n: number) => `${n} min read`,
    articles: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    otherArticles: 'Articles',
    helpful: 'Was this article helpful?',
    yes: 'Yes',
    no: 'No',
    thanks: 'Thanks for your feedback.',
    previous: 'Previous',
    next: 'Next',
    missing: 'Not listed?',
    missingLead: "Write to us, we'll help you.",
    contact: 'Contact support',
  },
} satisfies Record<Locale, Record<string, unknown>>;

/** Until the contact form exists (Kev, 6 Nov: Support preselected), the support buttons go nowhere yet. */
export const supportHref = '#';

export const helpLocale = (locale: string | undefined): Locale => (locale === 'de' ? 'de' : 'en');
