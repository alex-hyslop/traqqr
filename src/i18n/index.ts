// The site's languages (Kev's 3 Nov handover §2): German is the default at /, English under /en/.
// Keep `locales` and `defaultLocale` in step with `i18n` in astro.config.mjs.
export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export const localeInfo: Record<Locale, { name: string; code: string; ogLocale: string }> = {
  de: { name: 'Deutsch', code: 'DE', ogLocale: 'de_DE' },
  en: { name: 'English', code: 'EN', ogLocale: 'en_GB' },
};

/** Each page's path per language. Slugs can differ (/integrationen/ ↔ /en/integrations/), so pages
 * are looked up by key, never by swapping the prefix. Add a page here when it's built. */
export const routes = {
  home: { de: '/', en: '/en/' },
  liveFeed: { de: '/live-feed/', en: '/en/live-feed/' },
  reverseProxy: { de: '/reverse-proxy/', en: '/en/reverse-proxy/' },
  eventInspector: { de: '/event-inspector/', en: '/en/event-inspector/' },
  fingerprintTracking: { de: '/fingerprint-tracking/', en: '/en/fingerprint-tracking/' },
  klicktippTracking: { de: '/klicktipp-tracking/', en: '/en/klicktipp-tracking/' },
  integrations: { de: '/integrationen/', en: '/en/integrations/' },
  serverSideTracking: { de: '/server-side-conversion-tracking/', en: '/en/server-side-conversion-tracking/' },
  webinarFunnelTracking: { de: '/webinar-funnel-tracking/', en: '/en/webinar-funnel-tracking/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const pathFor = (route: RouteKey, locale: Locale) => routes[route][locale];

/** Astro.currentLocale is a string; narrow it, falling back to the default language. */
export const toLocale = (value: string | undefined): Locale =>
  (locales as readonly string[]).includes(value ?? '') ? (value as Locale) : defaultLocale;
