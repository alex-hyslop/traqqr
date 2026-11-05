import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /integrations/ · DE /de/integrationen/ (Figma: 5233:2 DE, 5236:697 EN; Kev's 3 Nov handover §5). The copy
// is Kev's, except the motion piece's screen-reader sentence. The developer answer is a placeholder until the
// setup claims are confirmed (strategy §12), shown in amber as in Figma. The cards link to # until the
// integration detail pages exist (§10).

const tabs = {
  de: [
    { key: 'all', label: 'Alle' },
    { key: 'ads', label: 'Ads' },
    { key: 'email', label: 'E-Mail' },
    { key: 'webinar', label: 'Webinar' },
    { key: 'sales', label: 'Verkauf' },
    { key: 'crm', label: 'CRM' },
  ],
  en: [
    { key: 'all', label: 'All' },
    { key: 'ads', label: 'Ads' },
    { key: 'email', label: 'Email' },
    { key: 'webinar', label: 'Webinar' },
    { key: 'sales', label: 'Sales' },
    { key: 'crm', label: 'CRM' },
  ],
};

export const integrationsPage: Record<Locale, ContentPage> = {
  de: {
    title: 'Integrationen · Traqqr',
    description:
      'Ads, E-Mail, Webinar, Verkauf und CRM – Traqqr verbindet die Tools, die Du schon nutzt, und ordnet jeden Schritt der richtigen Anzeige zu.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Integrationen' },
          title: ['Ein Hub für Deinen', 'ganzen Funnel.'],
          lead: 'Ads, E-Mail, Webinar, Verkauf und CRM – Traqqr verbindet die Tools, die Du schon nutzt, und ordnet jeden Schritt der richtigen Anzeige zu.',
          secondaryAction: { label: 'Alle Integrationen', href: '#all-integrations' },
          motion: {
            id: 'integrations-hub',
            label: 'Neun Tools laufen in Traqqr zusammen: Meta Ads, Facebook CAPI, KlickTipp, Webinaris, EverWebinar, Digistore24, Ablefy, HubSpot und Cloudflare.',
            width: 1200,
          },
          motionGap: 62,
        },
      },
      {
        kind: 'integrationsGrid',
        props: {
          id: 'all-integrations',
          eyebrow: '9 Integrationen',
          title: 'Wähle Deinen Stack.',
          tabs: tabs.de,
          href: '#',
          cards: [
            { name: 'KlickTipp', badge: 'E-Mail', category: 'email', description: 'Opt-ins mit Quelle, Tags und automatisierte Follow-ups.' },
            { name: 'Digistore24', badge: 'Verkauf', category: 'sales', description: 'Käufe mit Betrag zurück zur Anzeige, die sie ausgelöst hat.' },
            { name: 'Webinaris', badge: 'Webinar', category: 'webinar', description: 'Anmeldung und Teilnahme, der richtigen Anzeige zugeordnet.' },
            { name: 'EverWebinar', badge: 'Webinar', category: 'webinar', description: 'Registrierungen aus automatisierten Webinaren tracken.' },
            { name: 'HubSpot', badge: 'CRM', category: 'crm', description: 'Leads und Deals mit der Kampagne dahinter.' },
            { name: 'Ablefy', badge: 'Verkauf', category: 'sales', description: 'Verkäufe aus Ablefy serverseitig erfasst.' },
            { name: 'Meta Ads', badge: 'Ads', category: 'ads', description: 'Kampagnen, Anzeigen und Creatives hinter jedem Klick.' },
            { name: 'Facebook', badge: 'Conversions API', category: 'ads', description: 'Server-Events direkt an die Conversions API.' },
            { name: 'Cloudflare', badge: 'Reverse Proxy', category: 'proxy', description: 'Den First-Party Reverse Proxy per Klick bereitstellen.' },
          ],
        },
      },
      {
        kind: 'answers',
        props: {
          id: 'answers',
          eyebrow: 'Antworten',
          title: 'Kurz erklärt.',
          items: [
            {
              question: 'Welche Tools kann ich mit Traqqr verbinden?',
              answer:
                'Meta Ads und die Conversions API, KlickTipp, Webinaris, EverWebinar, Digistore24, Ablefy, HubSpot und Cloudflare für den Reverse Proxy.',
            },
            {
              question: 'Brauche ich für jede Integration einen Entwickler?',
              answer: '[Antwort nach Prüfung des Setups – siehe Strategie §12]',
              placeholder: true,
            },
            {
              question: 'Was passiert mit den Daten aus den Tools?',
              answer:
                'Traqqr ordnet Opt-ins, Webinar-Teilnahmen und Käufe der Anzeige zu, die sie ausgelöst hat – und schickt Conversions serverseitig an Meta.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Verbinde Deinen Stack.',
          lead: 'Alle Integrationen in einem Dashboard.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Integrations · Traqqr',
    description:
      'Ads, email, webinars, sales and CRM – Traqqr connects the tools you already use and attributes every step to the right ad.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Integrations' },
          title: ['One hub for your', 'whole funnel.'],
          lead: 'Ads, email, webinars, sales and CRM – Traqqr connects the tools you already use and attributes every step to the right ad.',
          secondaryAction: { label: 'All integrations', href: '#all-integrations' },
          motion: {
            id: 'integrations-hub',
            label: 'Nine tools come together in Traqqr: Meta Ads, Facebook CAPI, KlickTipp, Webinaris, EverWebinar, Digistore24, Ablefy, HubSpot and Cloudflare.',
            width: 1200,
          },
          motionGap: 62,
        },
      },
      {
        kind: 'integrationsGrid',
        props: {
          id: 'all-integrations',
          eyebrow: '9 integrations',
          title: 'Choose your stack.',
          tabs: tabs.en,
          href: '#',
          cards: [
            { name: 'KlickTipp', badge: 'Email', category: 'email', description: 'Opt-ins with source, tags and automated follow-ups.' },
            { name: 'Digistore24', badge: 'Sales', category: 'sales', description: 'Purchases with their value, back to the ad that triggered them.' },
            { name: 'Webinaris', badge: 'Webinar', category: 'webinar', description: 'Sign-ups and attendance, attributed to the right ad.' },
            { name: 'EverWebinar', badge: 'Webinar', category: 'webinar', description: 'Track registrations from automated webinars.' },
            { name: 'HubSpot', badge: 'CRM', category: 'crm', description: 'Leads and deals with the campaign behind them.' },
            { name: 'Ablefy', badge: 'Sales', category: 'sales', description: 'Sales from Ablefy, captured server-side.' },
            { name: 'Meta Ads', badge: 'Ads', category: 'ads', description: 'Campaigns, ads and creatives behind every click.' },
            { name: 'Facebook', badge: 'Conversions API', category: 'ads', description: 'Server events straight to the Conversions API.' },
            { name: 'Cloudflare', badge: 'Reverse Proxy', category: 'proxy', description: 'Deploy the first-party reverse proxy in one click.' },
          ],
        },
      },
      {
        kind: 'answers',
        props: {
          id: 'answers',
          eyebrow: 'Answers',
          title: 'In short.',
          items: [
            {
              question: 'Which tools can I connect to Traqqr?',
              answer:
                'Meta Ads and the Conversions API, KlickTipp, Webinaris, EverWebinar, Digistore24, Ablefy, HubSpot, and Cloudflare for the reverse proxy.',
            },
            {
              question: 'Do I need a developer for each integration?',
              answer: '[Answer once the setup claims are confirmed – see strategy §12]',
              placeholder: true,
            },
            {
              question: 'What happens to the data from the tools?',
              answer:
                'Traqqr attributes opt-ins, webinar attendance and purchases to the ad that triggered them – and sends conversions to Meta server-side.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Connect your stack.',
          lead: 'All integrations in one dashboard.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
