import { integrations } from '@/data/integrations';
import type { HomePage } from '@/data/pages/home';
import { siteContent } from '@/data/site';

// German homepage at / (Figma: Homepage v2 5212:17300, Kev's 3 Nov handover §4). The copy is Kev's.
// The meta title and description are ours, from the hero and the footer tagline, until Kev writes them.

const { trial, demo } = siteContent.de.cta;

export const homeDe: HomePage = {
  title: 'Traqqr · Ad-, Conversion- und Fingerprint-Tracking für lange Funnel',
  description:
    'Traqqr zeigt Dir über Wochen, Geräte und jeden Touchpoint hinweg, welche Kampagne, Anzeige oder Creative wirklich Kunden bringt.',
  features: [
    'Ad-Tracking: Kampagne, Anzeige und Creative hinter dem ersten Klick',
    'Serverseitiges Conversion-Tracking',
    'Fingerprint-Tracking über Geräte und Sessions hinweg',
    'Attribution über lange Customer Journeys',
    `Integrationen: ${integrations.map((i) => i.name).join(', ')}`,
  ],
  sections: [
    {
      kind: 'hero',
      props: {
        title: ['Welche Anzeige hat Deinen Kunden', 'wirklich gebracht?'],
        lead: 'Traqqr zeigt Dir über Wochen, Geräte und jeden Touchpoint hinweg, welche Kampagne, Anzeige oder Creative wirklich Kunden bringt – nativ verbunden mit KlickTipp, Digistore24, HubSpot und Webinaris.',
        features: [
          { eyebrow: '01 / AD-TRACKING', title: 'Erster Klick erkannt.', body: 'Welche Kampagne, Anzeige oder welches Creative den ersten Klick gebracht hat.' },
          { eyebrow: '02 / CONVERSION-TRACKING', title: 'Events serverseitig.', body: 'Wichtige Events und Käufe, direkt am Server erfasst.' },
          { eyebrow: '03 / FINGERPRINT-TRACKING', title: 'Eine Journey.', body: 'Geräte, Sessions und Touchpoints zu einer Customer Journey verbunden.' },
          { eyebrow: '04 / ATTRIBUTION', title: 'Budget mit Wirkung.', body: 'Investiere in die Anzeigen, die wirklich Kunden bringen.' },
        ],
        demoLabel: 'Demo ansehen · 2 Min.',
        videoLabel: '2-minütige Demo abspielen',
      },
    },
    { kind: 'trust', props: { items: ['DSGVO-konform', 'EU-gehostet', 'Server in Deutschland'] } },
    {
      kind: 'stats',
      props: {
        title: 'Gemessen bis zum Kauf. Nicht nur bis zum Klick.',
        items: [
          { value: '3', label: 'Tracking-Ebenen' },
          { value: '4', label: 'native DACH-Integrationen' },
          { value: '360°', label: 'Sicht auf den Funnel' },
          { value: 'EU', label: 'Hosting, Server in Deutschland' },
        ],
      },
    },
    {
      kind: 'cards',
      props: {
        id: 'problem',
        badge: 'Das Problem',
        title: 'Dein Tracking ist blind geworden.',
        lead: 'iOS, Adblocker und Cookie-Banner haben Pixel und GA4 die Sicht genommen. Du zahlst für Klicks, die Du nicht mehr siehst.',
        cards: [
          { eyebrow: '01 / iOS', title: 'Weniger Signal.', body: 'Datenschutz-Funktionen auf iOS schränken klassisches Pixel-Tracking ein.' },
          { eyebrow: '02 / ADBLOCKER', title: 'Blockierte Pixel.', body: 'Adblocker verhindern, dass Browser-Pixel überhaupt feuern.' },
          { eyebrow: '03 / COOKIE-BANNER', title: 'Lücken im Funnel.', body: 'Ohne Zustimmung fehlen Klicks und Events in der Auswertung.' },
          { eyebrow: '04 / LANGE JOURNEYS', title: 'Kein Zusammenhang.', body: 'Liegen Tage oder Wochen zwischen Klick und Kauf, reißt die Kette ab.' },
        ],
      },
    },
    {
      kind: 'funnel',
      props: {
        id: 'long-funnel',
        badge: 'Lange Funnel',
        title: 'Vom ersten Klick bis zum Kauf.',
        lead: 'Vom Ad-Klick bis zum Call drei Wochen später: Endlich siehst Du den ganzen Weg.',
        steps: [
          { number: '01', label: 'AD-KLICK', title: 'Ad-Tracking', body: 'Erkennt Kampagne, Anzeige und Creative hinter dem ersten Klick.' },
          { number: '02', label: 'OPT-IN', title: 'Serverseitig', body: 'Conversion-Tracking erfasst den Opt-in direkt\nam Server.' },
          { number: '03', label: 'E-MAIL', title: 'KlickTipp', body: 'Funnel-Daten fließen in Segmentierung, Tags und Follow-ups.' },
          { number: '04', label: 'WEBINAR', title: 'Webinaris', body: 'Anmeldung und Teilnahme, der richtigen\nAnzeige zugeordnet.' },
          { number: '05', label: 'CALL', title: 'Geräteübergreifend', body: 'Fingerprint-Tracking verbindet Geräte, Sessions\nund Touchpoints.' },
          { number: '06', label: 'KAUF', title: 'Digistore24', body: 'Der Kauf Wochen später landet bei der Anzeige, die ihn ausgelöst hat.' },
        ],
        action: { label: 'So funktioniert Traqqr', href: demo.href },
      },
    },
    {
      kind: 'testimonial',
      props: {
        id: 'testimonial',
        badge: 'Kunden',
        title: 'Teams, die mit Traqqr tracken',
        quote: [
          '„Seit wir traqqr.ai nutzen, laufen unsere Prozesse deutlich',
          'zuverlässiger. Fehler werden früh erkannt, und unser Team',
          'weiß immer genau, was zu tun ist.“',
        ],
        name: 'Dawid Przybylski',
        role: 'Gründer & Geschäftsführer, Visual Facilitators GmbH',
      },
    },
    { kind: 'integrations', props: { title: 'Integrationen', lead: 'Nativ verbunden mit Deinem DACH-Funnel-Stack.' } },
    {
      kind: 'howItWorks',
      props: {
        id: 'why-traqqr',
        badge: 'Warum Traqqr',
        title: 'Schneller live. Einfacher nutzbar.',
        lead: 'Profi-Tracking ohne Enterprise-Preis und ohne Verkaufsgespräch.',
        steps: [
          { eyebrow: '01 / SELF-SERVE', title: 'Kein Demo-Zwang.', body: 'Konto anlegen und selbst einrichten – ohne Verkaufsgespräch.' },
          { eyebrow: '02 / SETUP', title: 'Kein Setup-Marathon.', body: 'Keine wochenlange Einrichtung und kein Enterprise-Einstieg.' },
          { eyebrow: '03 / DACH-STACK', title: 'Nativ verbunden.', body: 'KlickTipp, Digistore24, HubSpot und Webinaris ohne Umwege.' },
        ],
      },
    },
    {
      kind: 'scene',
      props: { label: 'Beispiel: ein Kauf, live getrackt', caption: 'Beispieldaten · die Karte ist live HTML über dem Video' },
    },
    {
      kind: 'faq',
      props: {
        title: 'Häufige Fragen',
        // Only the first answer is written (Figma 5212:17311); the other four questions wait for Kev's answers.
        items: [
          {
            question: 'Was ist Traqqr?',
            answer:
              'Traqqr ist eine Ad-, Conversion- und Fingerprint-Tracking-Lösung für deutschsprachige Funnel-Marketer. Sie verbindet Anzeigenklicks, Webseiten-Events, Opt-ins, Webinare, Calls und Käufe über längere Customer Journeys hinweg.',
          },
        ],
      },
    },
    {
      kind: 'cta',
      props: {
        id: 'cta',
        title: 'Welche Anzeige bringt Deine Kunden?',
        lead: 'Finde es heraus – vom ersten Klick bis zum Kauf Wochen später.',
        primaryAction: trial,
        secondaryAction: demo,
      },
    },
    { kind: 'globe', props: { label: 'Beispiel: Events aus ganz Europa' } },
  ],
};
