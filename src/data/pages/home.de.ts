import type { HomePage } from '@/data/pages/home';
import { homeEn } from './home.en';

// German homepage at /. Hero: Homepage v2 (Figma 5212:17301). Until the Homepage v2 sections are built,
// everything after the hero is the English homepage's, so don't publish this before then.

export const homeDe: HomePage = {
  ...homeEn,
  sections: [
    {
      kind: 'hero',
      props: {
        title: 'Welche Anzeige hat Deinen Kunden wirklich gebracht?',
        lead: 'Traqqr zeigt Dir über Wochen, Geräte und jeden Touchpoint hinweg, welche Kampagne, Anzeige oder Creative wirklich Kunden bringt – nativ verbunden mit KlickTipp, Digistore24, HubSpot und Webinaris.',
        features: [
          { eyebrow: '01 / AD-TRACKING', title: 'Erster Klick erkannt.', body: 'Welche Kampagne, Anzeige oder welches Creative den ersten Klick gebracht hat.' },
          { eyebrow: '02 / CONVERSION-TRACKING', title: 'Events serverseitig.', body: 'Wichtige Events und Käufe, direkt am Server erfasst.' },
          { eyebrow: '03 / FINGERPRINT-TRACKING', title: 'Eine Journey.', body: 'Geräte, Sessions und Touchpoints zu einer Customer Journey verbunden.' },
          { eyebrow: '04 / ATTRIBUTION', title: 'Budget mit Wirkung.', body: 'Investiere in die Anzeigen, die wirklich Kunden bringen.' },
        ],
        demoLabel: 'Demo ansehen · 2\u00a0Min.',
        videoLabel: '2-minütige Demo abspielen',
      },
    },
    ...homeEn.sections.filter((section) => section.kind !== 'hero'),
  ],
};
