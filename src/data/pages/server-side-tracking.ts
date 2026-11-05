import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /server-side-conversion-tracking/ (Figma: 5218:921 DE, 5287:1507 EN; Kev's 3 Nov handover §5, redesigned
// 3 Nov). The copy is Kev's. The explainer video and the Text + media images stay placeholders on staging;
// the FAQ answers are from Kev's 5 Nov note (he still has to confirm answer 5 with product). Two Text + media
// blocks in a row get 40px on the sides they share, so there's 80px between them.

const touchingBelow = 'lg:pt-16 lg:pb-10';
const touchingAbove = 'lg:pt-10 lg:pb-20';

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
          breadcrumb: { section: 'Lösungen', current: 'Serverseitiges Tracking' },
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
          containerClassName: touchingBelow,
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
          containerClassName: touchingAbove,
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
            {
              question: 'Was ist Meta CAPI Tracking?',
              answer:
                'Die Conversions API (CAPI) ist Metas Schnittstelle, über die Events direkt von einem Server an Meta gesendet werden. Traqqr nutzt sie zusätzlich zum Pixel – mit derselben Event-ID, damit Meta nichts doppelt zählt.',
            },
            {
              question: 'Warum reicht Pixel-Tracking allein nicht?',
              answer:
                'Der Pixel läuft im Browser. Adblocker, Browser-Datenschutz und kurze Cookie-Laufzeiten können Events blockieren oder die Verbindung zum Klick abreißen lassen. Dann optimiert Meta auf unvollständige Daten.',
            },
            {
              question: 'Wie hilft Server-Side Tracking bei langen Funnels?',
              answer:
                'In langen Funnels kommt der Kauf oft Wochen nach dem Klick und auf einem anderen Gerät. Traqqr hält die Journey ab dem ersten Klick zusammen und sendet den späteren Kauf vom Server an Meta, zugeordnet zur ursprünglichen Anzeige.',
            },
            {
              question: 'Wie verbindet Traqqr Ad-Klicks und spätere Käufe?',
              answer:
                'Beim ersten Besuch vergibt Traqqr über Deine eigene Subdomain eine First-Party-ID und verknüpft sie mit Opt-in, KlickTipp-Kontakt und Kauf. Fingerprint Tracking verbindet zusätzlich Besuche auf verschiedenen Geräten.',
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
          breadcrumb: { section: 'Solutions', current: 'Server-side tracking' },
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
          containerClassName: touchingBelow,
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
          containerClassName: touchingAbove,
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
            {
              question: 'What is Meta CAPI tracking?',
              answer:
                'The Conversions API (CAPI) is Meta\'s interface for sending events straight from a server to Meta. Traqqr uses it alongside the pixel, with the same event ID, so Meta doesn\'t count anything twice.',
            },
            {
              question: 'Why isn\'t pixel tracking enough on its own?',
              answer:
                'The pixel runs in the browser. Ad blockers, browser privacy features and short cookie lifetimes can block events or break the link to the original click. Meta then optimises on incomplete data.',
            },
            {
              question: 'How does server-side tracking help with long funnels?',
              answer:
                'In long funnels, the purchase often comes weeks after the click, on a different device. Traqqr keeps the journey together from the first click and sends the later purchase to Meta from the server, attributed to the original ad.',
            },
            {
              question: 'How does Traqqr connect ad clicks to later purchases?',
              answer:
                'On the first visit, Traqqr sets a first-party ID through your own subdomain and links it to the opt-in, the KlickTipp contact and the purchase. Fingerprint tracking also connects visits across devices.',
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
