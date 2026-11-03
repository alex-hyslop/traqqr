import type { CtaAction } from '@klicktipp/traqqr-components';
import { demoHref, signupHref } from '@/data/links';
import type { Locale } from '@/i18n';

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
    integrations: string;
    allIntegrations: string;
    resources: string;
    pricing: string;
    login: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
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
      integrations: 'Integrationen',
      allIntegrations: 'Alle Integrationen',
      resources: 'Ressourcen',
      pricing: 'Preise',
      login: 'Anmelden',
      menu: 'Menü',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
    },
    footer: {
      tagline: 'Ad-, Conversion- und Fingerprint-Tracking für lange Funnel.',
      columns: [
        { heading: 'Produkt', links: [link('Funktionen'), link('Integrationen'), link('Preise'), link('Live Feed')] },
        { heading: 'Ressourcen', links: [link('Docs'), link('Hilfe-Center'), link('Blog')] },
        { heading: 'Unternehmen', links: [link('Über uns'), link('Kontakt'), link('Anmelden', signupHref)] },
      ],
      legal: [link('Datenschutz'), link('AGB'), link('Impressum')],
      copyright: '© 2026 Traqqr. Alle Rechte vorbehalten.',
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
      integrations: 'Integrations',
      allIntegrations: 'All integrations',
      resources: 'Resources',
      pricing: 'Pricing',
      login: 'Log in',
      menu: 'Menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    footer: {
      tagline: 'Ad, conversion and fingerprint tracking for long funnels.',
      columns: [
        { heading: 'Product', links: [link('Features'), link('Integrations'), link('Pricing'), link('Live Feed')] },
        { heading: 'Resources', links: [link('Docs'), link('Help center'), link('Blog')] },
        { heading: 'Company', links: [link('About'), link('Contact'), link('Log in', signupHref)] },
      ],
      legal: [link('Privacy'), link('Terms'), link('Imprint')],
      copyright: '© 2026 Traqqr. All rights reserved.',
    },
  },
};
