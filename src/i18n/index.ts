// The site's languages (Kev's 3 Nov handover §2): German is the default at /, English under /en/.
// Keep `locales` and `defaultLocale` in step with `i18n` in astro.config.mjs.
import type { FlagCode } from '@klicktipp/traqqr-components';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

/** `flag` is the language switcher's flag: Germany for DE, the United States for EN (Kev's call, 3 Nov). */
export const localeInfo: Record<Locale, { name: string; code: string; flag: FlagCode; ogLocale: string }> = {
  de: { name: 'Deutsch', code: 'DE', flag: 'de', ogLocale: 'de_DE' },
  en: { name: 'English', code: 'EN', flag: 'us', ogLocale: 'en_GB' },
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
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const pathFor = (route: RouteKey, locale: Locale) => routes[route][locale];

/** Astro.currentLocale is a string; narrow it, falling back to the default language. */
export const toLocale = (value: string | undefined): Locale =>
  (locales as readonly string[]).includes(value ?? '') ? (value as Locale) : defaultLocale;
