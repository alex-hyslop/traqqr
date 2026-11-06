import type { CtaAction } from '@klicktipp/traqqr-components';
import { demoHref, integrationsHref, navLinks, pricingHref, signupHref } from '@/data/links';
import { pathFor, type Locale } from '@/i18n';

// Content shared by every page, per language, next to the per-page content in data/pages/. Pages, the
// nav, the footer and llms.txt take it from here so labels aren't retyped; the URLs stay in links.ts.
// Named siteContent, not site, so it doesn't shadow Astro's `site` URL. DE and EN copy: Homepage v2
// header and footer (Figma 5212:17407 / 5212:17406 DE, 5212:18042 / 5212:18041 EN).

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteContent {
  cta: {
    trial: CtaAction;
    demo: CtaAction;
  };
  nav: {
    home: string;
    product: string;
    solutions: string;
    integrations: string;
    allIntegrations: string;
    resources: string;
    pricing: string;
    login: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    /** The language switcher's menu label, and the start of its trigger's accessible name. */
    language: string;
  };
  footer: {
    tagline: string;
    columns: { heading: string; links: FooterLink[] }[];
    legal: FooterLink[];
    copyright: string;
  };
}

const link = (label: string, href = '#'): FooterLink => ({ label, href });

export const siteContent: Record<Locale, SiteContent> = {
  de: {
    cta: {
      trial: { label: 'Kostenlos starten', href: signupHref },
      demo: { label: 'Demo ansehen', href: demoHref('de') },
    },
    nav: {
      home: 'Traqqr Startseite',
      product: 'Produkt',
      solutions: 'Lösungen',
      integrations: 'Integrationen',
      allIntegrations: 'Alle Integrationen',
      resources: 'Ressourcen',
      pricing: 'Preise',
      login: 'Anmelden',
      menu: 'Menü',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      language: 'Sprache',
    },
    footer: {
      tagline: 'Ad-, Conversion- und Fingerprint-Tracking für lange Funnel.',
      columns: [
        {
          heading: 'Produkt',
          links: [link('Funktionen'), link('Integrationen', integrationsHref('de')), link('Preise', pricingHref('de')), link('Live Feed', pathFor('liveFeed', 'de'))],
        },
        { heading: 'Ressourcen', links: [link('Docs'), link('Hilfe-Center', pathFor('help', 'de')), link('Blog')] },
        { heading: 'Unternehmen', links: [link('Über uns'), link('Kontakt'), link('Anmelden', signupHref)] },
      ],
      legal: [link('Datenschutz'), link('AGB'), link('Impressum')],
      copyright: '© 2026 Traqqr.ai. Alle Rechte vorbehalten.',
    },
  },
  en: {
    cta: {
      trial: { label: 'Start free trial', href: signupHref },
      demo: { label: 'Watch demo', href: demoHref('en') },
    },
    nav: {
      home: 'Traqqr home',
      product: 'Product',
      solutions: 'Solutions',
      integrations: 'Integrations',
      allIntegrations: 'All integrations',
      resources: 'Resources',
      pricing: 'Pricing',
      login: 'Log in',
      menu: 'Menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Language',
    },
    footer: {
      tagline: 'Ad, conversion and fingerprint tracking for long funnels.',
      columns: [
        {
          heading: 'Product',
          links: [link('Features'), link('Integrations', integrationsHref('en')), link('Pricing', pricingHref('en')), link('Live Feed', pathFor('liveFeed', 'en'))],
        },
        { heading: 'Resources', links: [link('Docs'), link('Help center', pathFor('help', 'en')), link('Blog')] },
        { heading: 'Company', links: [link('About'), link('Contact'), link('Log in', signupHref)] },
      ],
      legal: [link('Privacy'), link('Terms'), link('Imprint')],
      copyright: '© 2026 Traqqr.ai. All rights reserved.',
    },
  },
};

/** The nav dropdown a page sits in ("Produkt", "Lösungen", "Ressourcen"), for its breadcrumb (Kev, 5 Nov: the
 * middle crumb is the menu you open to reach the page). Read from the nav's own links, so the two can't
 * disagree; pages with their own menu item (Integrationen, Preise) have none. */
export const navSectionFor = (path: string, locale: Locale): string | undefined => {
  const menus = ['product', 'solutions', 'resources'] as const;
  const menu = menus.find((key) => navLinks[locale][key].some((link) => link.href === path));
  return menu && siteContent[locale].nav[menu];
};
