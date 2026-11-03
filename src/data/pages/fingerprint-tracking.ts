import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /fingerprint-tracking/ (Figma: 5228:2 DE, 5236:411 EN; Kev's 3 Nov handover §5). The copy is Kev's, except
// the motion pieces' screen-reader sentences. The data-protection answer is a placeholder until the legal
// review (handover §11.4, strategy §12.5), shown in amber as in Figma.

export const fingerprintTracking: Record<Locale, ContentPage> = {
  de: {
    title: 'Fingerprint Tracking · Traqqr',
    description:
      'Fingerprint Tracking verbindet Geräte, Sessions und Touchpoints zu einer 360°-Sicht – damit der Kauf am Laptop zur Anzeige auf dem Handy passt.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { parent: { label: 'Produkt', href: '#' }, current: 'Fingerprint Tracking' },
          title: 'Ein Kunde. Drei Geräte. Eine Journey.',
          lead: 'Fingerprint Tracking verbindet Geräte, Sessions und Touchpoints zu einer 360°-Sicht – damit der Kauf am Laptop zur Anzeige auf dem Handy passt.',
          secondaryAction: { label: "So funktioniert's", href: '#' },
          motion: {
            id: 'fingerprint-360',
            label: 'Handy, Tablet und Laptop laufen in Traqqr zu einer Identität zusammen: Ad-Klick an Tag 1, Webinar an Tag 6, Kauf an Tag 21.',
            width: 600,
          },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'journey',
          eyebrow: 'Drei Wochen, ein Kunde',
          title: 'So sieht eine echte Journey aus.',
          align: 'left',
          motion: {
            id: 'fingerprint-journey',
            label: 'Eine Journey über drei Wochen: Ad-Klick und Opt-in am Handy, Webinar am Tablet, Call und Kauf am Laptop.',
            width: 1200,
          },
          fallback: {
            kind: 'rail',
            items: [
              { label: 'Tag 1 · Handy', title: 'Ad-Klick', body: 'Instagram-Anzeige auf dem Handy.' },
              { label: 'Tag 1 · Handy', title: 'Opt-in', body: 'Anmeldung zur Webinar-Liste.' },
              { label: 'Tag 6 · Tablet', title: 'Webinar', body: 'Teilnahme auf dem Tablet.' },
              { label: 'Tag 14 · Laptop', title: 'Call', body: 'Termin gebucht am Laptop.' },
              { label: 'Tag 21 · Laptop', title: 'Kauf', body: 'Kauf am Laptop – zugeordnet zur Anzeige von Tag 1.' },
            ],
            note: 'BEISPIEL',
          },
        },
      },
      {
        kind: 'statement',
        props: {
          id: 'one-customer',
          title: 'Nicht drei Besucher. Ein Kunde.',
          facts: [
            { label: 'Geräte', value: 'Handy, Tablet und Laptop' },
            { label: 'Sessions', value: 'über Tage und Wochen' },
            { label: 'Touchpoints', value: 'Klick, Opt-in, Webinar, Call, Kauf' },
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
              question: 'Was ist Fingerprint Tracking?',
              answer:
                'Fingerprint Tracking verbindet Geräte, Sessions und Touchpoints zu einer längeren Customer Journey. So lassen sich Klick und Kauf auch dann zuordnen, wenn Tage oder Wochen dazwischen liegen.',
            },
            {
              question: 'Wie arbeitet es mit Ad- und Conversion-Tracking zusammen?',
              answer:
                'Ad-Tracking erkennt die Anzeige, Conversion-Tracking erfasst die Events am Server, Fingerprint Tracking verbindet beides über Geräte und Zeit.',
            },
            {
              question: 'Ist Fingerprint Tracking datenschutzkonform?',
              answer: '[Antwort nach rechtlicher Prüfung – siehe Strategie §12.5]',
              placeholder: true,
            },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Sieh die ganze Journey.',
          lead: 'Vom ersten Klick bis zum Kauf Wochen später – geräteübergreifend.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Fingerprint tracking · Traqqr',
    description:
      'Fingerprint tracking connects devices, sessions and touchpoints into a 360° view – so the purchase on the laptop matches the ad on the phone.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { parent: { label: 'Product', href: '#' }, current: 'Fingerprint Tracking' },
          title: ['One customer.', 'Three devices.', 'One journey.'],
          lead: 'Fingerprint tracking connects devices, sessions and touchpoints into a 360° view – so the purchase on the laptop matches the ad on the phone.',
          secondaryAction: { label: 'How it works', href: '#' },
          motion: {
            id: 'fingerprint-360',
            label: 'Phone, tablet and laptop come together in Traqqr as one identity: ad click on day 1, webinar on day 6, purchase on day 21.',
            width: 600,
          },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'journey',
          eyebrow: 'Three weeks, one customer',
          title: 'This is what a real journey looks like.',
          align: 'left',
          motion: {
            id: 'fingerprint-journey',
            label: 'A journey over three weeks: ad click and opt-in on the phone, webinar on the tablet, call and purchase on the laptop.',
            width: 1200,
          },
          fallback: {
            kind: 'rail',
            items: [
              { label: 'Day 1 · Phone', title: 'Ad click', body: 'Instagram ad on the phone.' },
              { label: 'Day 1 · Phone', title: 'Opt-in', body: 'Signed up to the webinar list.' },
              { label: 'Day 6 · Tablet', title: 'Webinar', body: 'Attended on the tablet.' },
              { label: 'Day 14 · Laptop', title: 'Call', body: 'Booked a call on the laptop.' },
              { label: 'Day 21 · Laptop', title: 'Purchase', body: 'Purchase on the laptop – attributed to the ad from day 1.' },
            ],
            note: 'EXAMPLE',
          },
        },
      },
      {
        kind: 'statement',
        props: {
          id: 'one-customer',
          title: 'Not three visitors. One customer.',
          facts: [
            { label: 'Devices', value: 'Phone, tablet and laptop' },
            { label: 'Sessions', value: 'Across days and weeks' },
            { label: 'Touchpoints', value: 'Click, opt-in, webinar, call, purchase' },
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
              question: 'What is fingerprint tracking?',
              answer:
                'Fingerprint tracking connects devices, sessions and touchpoints into a longer customer journey. So a click and a purchase can be matched even when days or weeks lie between them.',
            },
            {
              question: 'How does it work with ad and conversion tracking?',
              answer:
                'Ad tracking identifies the ad, conversion tracking captures the events on the server, and fingerprint tracking connects both across devices and time.',
            },
            {
              question: 'Is fingerprint tracking GDPR-compliant?',
              answer: '[Answer after legal review – see strategy §12.5]',
              placeholder: true,
            },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'See the whole journey.',
          lead: 'From the first click to the purchase weeks later – across devices.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
