import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /server-side-conversion-tracking/ (Figma: 5218:921 DE, 5287:1507 EN; Kev's 3 Nov handover §5, redesigned
// 3 Nov). The copy is Kev's. The explainer video and the Text + media images stay placeholders on staging;
// the FAQ shows only answer 1, as the handover says (answers 2–5 aren't written yet). Two Text + media
// blocks in a row get 40px on the sides they share, so there's 80px between them.

const touchingBelow = 'lg:[&>div]:pt-16 lg:[&>div]:pb-10';
const touchingAbove = 'lg:[&>div]:pt-10 lg:[&>div]:pb-20';

export const serverSideTracking: Record<Locale, ContentPage> = {
  de: {
    title: 'Serverseitiges Conversion Tracking · Traqqr',
    description:
      'Traqqr verbindet Ad-Tracking, serverseitiges Conversion Tracking und Fingerprint Tracking, damit Du erkennst, welche Ads wirklich Kunden bringen.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { parent: { label: 'Lösungen', href: '#' }, current: 'Serverseitiges Tracking' },
          title: 'Serverseitiges Conversion Tracking für Meta Ads und lange Funnel',
          lead: 'Traqqr verbindet Ad-Tracking, serverseitiges Conversion Tracking und Fingerprint Tracking, damit Du erkennst, welche Ads wirklich Kunden bringen.',
          secondaryAction: { label: 'Demo ansehen · 2 Min.', href: siteContent.de.cta.demo.href },
          video: { label: 'Erklärvideo abspielen', href: siteContent.de.cta.demo.href },
        },
      },
      { kind: 'trust', props: { items: ['DSGVO-konform', 'EU-gehostet', 'Server in Deutschland'], paddingY: 24 } },
      {
        kind: 'textMedia',
        props: {
          id: 'problem',
          badge: 'Das Problem',
          title: ['Warum Meta Pixel und GA4 nicht', 'mehr ausreichen.'],
          body: 'iOS, Adblocker und Cookie-Banner haben Pixel und GA4 die Sicht genommen. Du zahlst für Klicks, die Du nicht mehr siehst.',
          items: [
            'iOS schränkt klassisches Pixel-Tracking ein',
            'Adblocker stoppen den Browser-Pixel',
            'Ohne Zustimmung fehlen Klicks und Events',
            'Lange Journeys reißen die Kette ab',
          ],
          primaryAction: siteContent.de.cta.trial,
          media: { type: 'image', placeholderLabel: 'Bild folgt' },
          mediaSide: 'left',
          grid: true,
          className: touchingBelow,
        },
      },
      {
        kind: 'textMedia',
        props: {
          id: 'meta-capi',
          badge: 'Meta CAPI',
          title: 'Pixel und Server. Ein sauberes Event.',
          body: 'Traqqr sendet Deine Events zusätzlich direkt vom Server an Meta und führt sie mit den Pixel-Events zusammen.',
          items: [
            'Events direkt vom Server an Meta senden',
            'Pixel- und Server-Events dedupliziert',
            'Weniger Lücken, wenn der Browser-Pixel ausfällt',
            'Später Kauf, richtige Anzeige',
            'Daten aus KlickTipp, Digistore24 und Webinaris',
          ],
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
          media: { type: 'image', placeholderLabel: 'Bild folgt' },
          className: touchingAbove,
        },
      },
      { kind: 'integrations', props: { title: 'Integrationen', lead: 'Nativ verbunden mit Deinem DACH-Funnel-Stack.' } },
      {
        kind: 'faq',
        props: {
          title: 'Häufige Fragen',
          items: [
            {
              question: 'Was ist serverseitiges Conversion Tracking?',
              answer:
                'Beim serverseitigen Conversion Tracking werden Events wie Opt-ins oder Käufe direkt vom Server erfasst und an Werbeplattformen wie Meta übermittelt – nicht nur über den Pixel im Browser.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Server-Side Tracking, das zum Funnel passt.',
          lead: 'Finde es heraus – vom ersten Klick bis zum Kauf Wochen später.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Server-side conversion tracking · Traqqr',
    description:
      'Traqqr combines ad tracking, server-side conversion tracking and fingerprint tracking, so you can see which ads really bring you customers.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { parent: { label: 'Solutions', href: '#' }, current: 'Server-side tracking' },
          title: 'Server-side conversion tracking for Meta Ads and long funnels',
          lead: 'Traqqr combines ad tracking, server-side conversion tracking and fingerprint tracking, so you can see which ads really bring you customers.',
          secondaryAction: { label: 'Watch demo · 2 min', href: siteContent.en.cta.demo.href },
          video: { label: 'Play the explainer video', href: siteContent.en.cta.demo.href },
        },
      },
      { kind: 'trust', props: { items: ['GDPR-compliant', 'EU-hosted', 'Servers in Germany'], paddingY: 24 } },
      {
        kind: 'textMedia',
        props: {
          id: 'problem',
          badge: 'The problem',
          title: ['Why the Meta Pixel and GA4 aren’t', 'enough any more.'],
          body: 'iOS, ad blockers and cookie banners have taken away what the pixel and GA4 can see. You pay for clicks you can no longer see.',
          items: [
            'iOS limits classic pixel tracking',
            'Ad blockers stop the browser pixel',
            'Without consent, clicks and events go missing',
            'Long journeys break the chain',
          ],
          primaryAction: siteContent.en.cta.trial,
          media: { type: 'image', placeholderLabel: 'Image coming soon' },
          mediaSide: 'left',
          grid: true,
          className: touchingBelow,
        },
      },
      {
        kind: 'textMedia',
        props: {
          id: 'meta-capi',
          badge: 'Meta CAPI',
          title: 'Pixel and server. One clean event.',
          body: 'Traqqr also sends your events to Meta straight from the server, and merges them with the pixel events.',
          items: [
            'Send events to Meta straight from the server',
            'Pixel and server events deduplicated',
            'Fewer gaps when the browser pixel fails',
            'Late sale, right ad',
            'Data from KlickTipp, Digistore24 and Webinaris',
          ],
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
          media: { type: 'image', placeholderLabel: 'Image coming soon' },
          className: touchingAbove,
        },
      },
      { kind: 'integrations', props: { title: 'Integrations', lead: 'Natively connected to your DACH funnel stack.' } },
      {
        kind: 'faq',
        props: {
          title: 'Frequently asked questions',
          items: [
            {
              question: 'What is server-side conversion tracking?',
              answer:
                'With server-side conversion tracking, events such as opt-ins or purchases are captured on the server and sent to ad platforms like Meta – not only through the pixel in the browser.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Server-side tracking that fits your funnel.',
          lead: 'Find out – from the first click to the sale weeks later.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
