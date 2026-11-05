// The site's languages: English is the default at /, German under /de/ (the founder, 5 Nov daily; it was
// the other way round from Kev's 3 Nov handover §2).
// Keep `locales` and `defaultLocale` in step with `i18n` in astro.config.mjs.
export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeInfo: Record<Locale, { name: string; code: string; ogLocale: string }> = {
  de: { name: 'Deutsch', code: 'DE', ogLocale: 'de_DE' },
  en: { name: 'English', code: 'EN', ogLocale: 'en_GB' },
};

/** Each page's path per language. Slugs can differ (/integrations/ ↔ /de/integrationen/), so pages
 * are looked up by key, never by swapping the prefix. Add a page here when it's built. */
export const routes = {
  home: { en: '/', de: '/de/' },
  liveFeed: { en: '/live-feed/', de: '/de/live-feed/' },
  reverseProxy: { en: '/reverse-proxy/', de: '/de/reverse-proxy/' },
  eventInspector: { en: '/event-inspector/', de: '/de/event-inspector/' },
  fingerprintTracking: { en: '/fingerprint-tracking/', de: '/de/fingerprint-tracking/' },
  klicktippTracking: { en: '/klicktipp-tracking/', de: '/de/klicktipp-tracking/' },
  integrations: { en: '/integrations/', de: '/de/integrationen/' },
  serverSideTracking: { en: '/server-side-conversion-tracking/', de: '/de/server-side-conversion-tracking/' },
  webinarFunnelTracking: { en: '/webinar-funnel-tracking/', de: '/de/webinar-funnel-tracking/' },
  pricing: { en: '/pricing/', de: '/de/preise/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const pathFor = (route: RouteKey, locale: Locale) => routes[route][locale];

/** Astro.currentLocale is a string; narrow it, falling back to the default language. */
export const toLocale = (value: string | undefined): Locale =>
  (locales as readonly string[]).includes(value ?? '') ? (value as Locale) : defaultLocale;
