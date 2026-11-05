import type { ContentPage } from '@/data/pages/content';
import { homeSection } from '@/data/pages/home';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /webinar-funnel-tracking/ (Figma: 5218:1412 DE, 5287:3136 EN; Kev's 3 Nov handover §5, redesigned 3 Nov).
// The copy is Kev's. The EN frame still has German in the hero cards, the funnel band and the "Why Traqqr"
// heading: the band reuses the homepage's EN copy, and the cards and heading are our translations. The
// Text + media images stay placeholders on staging. The FAQ answers are from Kev's 5 Nov note (he still has
// to confirm answer 5 with product).

const touchingBelow = 'lg:pt-20 lg:pb-10';
const touchingAbove = 'lg:pt-10 lg:pb-20';

export const webinarFunnelTracking: Record<Locale, ContentPage> = {
  de: {
    title: 'Webinar-Funnel-Tracking · Traqqr',
    description:
      'Vom ersten Ad-Klick bis zum Call drei Wochen später: Traqqr zeigt Dir, welche Anzeige den Kunden gebracht hat – nicht nur den Lead.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Webinar-Funnel-Tracking' },
          title: ['Funnel-Tracking für Webinare,', 'Calls und High-Ticket-Sales'],
          lead: 'Vom ersten Ad-Klick bis zum Call drei Wochen später: Traqqr zeigt Dir, welche Anzeige den Kunden gebracht hat – nicht nur den Lead.',
          secondaryAction: { label: 'Demo ansehen · 2 Min.', href: siteContent.de.cta.demo.href },
          cards: [
            { eyebrow: '01 / WEBINARIS', title: 'Anmeldung und Teilnahme.', body: 'Jede Registrierung der richtigen Anzeige zugeordnet.' },
            { eyebrow: '02 / KLICKTIPP', title: 'E-Mail-Strecken.', body: 'Opt-ins, Tags und Follow-ups im Funnel sichtbar.' },
            { eyebrow: '03 / CALL', title: 'Termin gebucht.', body: 'Auch der Call Wochen später gehört zur Journey.' },
            { eyebrow: '04 / DIGISTORE24', title: 'Der Kauf zählt.', body: 'High-Ticket-Verkäufe zurück zur ersten Anzeige.' },
          ],
        },
      },
      { kind: 'trust', props: { items: ['DSGVO-konform', 'EU-gehostet', 'Server in Deutschland'], paddingY: 40 } },
      { kind: 'funnel', props: homeSection('de', 'funnel') },
      {
        kind: 'textMedia',
        props: {
          id: 'webinars',
          badge: 'Webinare',
          title: 'Jede Anmeldung kennt ihre Anzeige.',
          body: 'Traqqr verbindet Webinar-Anmeldung und Teilnahme mit dem Ad-Klick davor – in Webinaris und EverWebinar.',
          items: [
            'Registrierung der richtigen Anzeige zugeordnet',
            'Teilnahme im Funnel sichtbar',
            'Opt-ins, Tags und Follow-ups in KlickTipp',
            'Funktioniert mit Webinaris und EverWebinar',
          ],
          primaryAction: siteContent.de.cta.trial,
          media: { type: 'image', placeholderLabel: 'Bild folgt' },
          grid: true,
          containerClassName: touchingBelow,
        },
      },
      {
        kind: 'textMedia',
        props: {
          id: 'calls',
          badge: 'Calls & High-Ticket',
          title: 'Vom Call zum Kauf, Wochen später.',
          body: 'Bei High-Ticket-Angeboten liegen zwischen Webinar, Call und Kauf oft Wochen. Traqqr hält die Journey zusammen.',
          items: [
            'Auch der gebuchte Call gehört zur Journey',
            'Fingerprint-Tracking verbindet Geräte und Sessions',
            'Digistore24-Käufe zurück zur ersten Anzeige',
            'Sieh, welche Anzeige Kunden bringt – nicht nur Leads',
          ],
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
          media: { type: 'image', placeholderLabel: 'Bild folgt' },
          mediaSide: 'left',
          containerClassName: touchingAbove,
        },
      },
      { kind: 'integrations', props: { title: 'Integrationen', lead: 'Nativ verbunden mit Deinem DACH-Funnel-Stack.' } },
      {
        kind: 'howItWorks',
        props: {
          ...homeSection('de', 'howItWorks'),
          title: ['Kein Setup-Call. Kein', 'Onboarding-Marathon.'],
          lead: 'KlickTipp und Digistore24 verbinden, fertig.',
        },
      },
      {
        kind: 'faq',
        props: {
          title: 'Häufige Fragen',
          items: [
            {
              question: 'Wie trackt Traqqr einen Webinar-Funnel?',
              answer:
                'Traqqr verbindet den Ad-Klick mit Opt-in, Webinar-Anmeldung, Teilnahme, Call und Kauf zu einer Customer Journey – nativ mit KlickTipp, Webinaris und Digistore24.',
            },
            {
              question: 'Funktioniert Traqqr mit KlickTipp und Digistore24?',
              answer:
                'Ja, beide sind nativ angebunden. Opt-ins und Tags kommen aus KlickTipp, Käufe aus Digistore24 – Traqqr ordnet beides derselben Journey und derselben Anzeige zu. Weitere Tools findest Du unter Integrationen.',
            },
            {
              question: 'Was passiert, wenn der Kauf Wochen nach dem Klick kommt?',
              answer:
                'Die Journey bleibt offen. Wenn der Kauf kommt, ordnet Traqqr ihn dem ersten Klick zu und sendet ihn an Meta – auch wenn dazwischen ein Webinar, ein Call und ein Gerätewechsel lagen.',
            },
            {
              question: 'Für wen ist Webinar-Funnel-Tracking gedacht?',
              answer:
                'Für alle, die über Webinare, Calls oder Challenges verkaufen – besonders bei High-Ticket-Angeboten, bei denen sich Kunden Zeit für die Entscheidung nehmen.',
            },
            {
              question: 'Brauche ich ein Onboarding?',
              answer:
                'Nein. Du verbindest Deine Tools selbst im Dashboard, und den Reverse Proxy richtest Du per Klick über Cloudflare ein. Wenn Du Hilfe möchtest, unterstützen wir Dich beim Setup.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Welche Anzeige füllt Dein Webinar – und Deinen Kalender?',
          lead: 'Finde es heraus – vom ersten Klick bis zum Kauf Wochen später.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Webinar funnel tracking · Traqqr',
    description:
      'From the first ad click to the call three weeks later: Traqqr shows you which ad brought the customer – not just the lead.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Webinar funnel tracking' },
          title: ['Funnel tracking for webinars,', 'calls and high-ticket sales'],
          lead: 'From the first ad click to the call three weeks later: Traqqr shows you which ad brought the customer – not just the lead.',
          secondaryAction: { label: 'Watch demo · 2 min', href: siteContent.en.cta.demo.href },
          cards: [
            { eyebrow: '01 / WEBINARIS', title: 'Registration and attendance.', body: 'Every registration matched to the right ad.' },
            { eyebrow: '02 / KLICKTIPP', title: 'Email sequences.', body: 'Opt-ins, tags and follow-ups visible in the funnel.' },
            { eyebrow: '03 / CALL', title: 'Call booked.', body: 'Even the call weeks later is part of the journey.' },
            { eyebrow: '04 / DIGISTORE24', title: 'The sale counts.', body: 'High-ticket sales traced back to the first ad.' },
          ],
        },
      },
      { kind: 'trust', props: { items: ['GDPR-compliant', 'EU-hosted', 'Servers in Germany'], paddingY: 40 } },
      { kind: 'funnel', props: homeSection('en', 'funnel') },
      {
        kind: 'textMedia',
        props: {
          id: 'webinars',
          badge: 'Webinars',
          title: 'Every registration knows its ad.',
          body: 'Traqqr connects webinar registration and attendance to the ad click before it – in Webinaris and EverWebinar.',
          items: [
            'Registration matched to the right ad',
            'Attendance visible in the funnel',
            'Opt-ins, tags and follow-ups in KlickTipp',
            'Works with Webinaris and EverWebinar',
          ],
          primaryAction: siteContent.en.cta.trial,
          media: { type: 'image', placeholderLabel: 'Image coming soon' },
          grid: true,
          containerClassName: touchingBelow,
        },
      },
      {
        kind: 'textMedia',
        props: {
          id: 'calls',
          badge: 'Calls & high-ticket',
          title: 'From the call to the sale, weeks later.',
          body: 'With high-ticket offers there are often weeks between the webinar, the call and the sale. Traqqr keeps the journey together.',
          items: [
            'The booked call is part of the journey too',
            'Fingerprint tracking joins devices and sessions',
            'Digistore24 sales traced back to the first ad',
            'See which ad brings customers – not just leads',
          ],
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
          media: { type: 'image', placeholderLabel: 'Image coming soon' },
          mediaSide: 'left',
          containerClassName: touchingAbove,
        },
      },
      { kind: 'integrations', props: { title: 'Integrations', lead: 'Natively connected to your DACH funnel stack.' } },
      {
        kind: 'howItWorks',
        props: {
          ...homeSection('en', 'howItWorks'),
          title: ['No setup call. No', 'onboarding marathon.'],
          lead: 'Connect KlickTipp and Digistore24, done.',
        },
      },
      {
        kind: 'faq',
        props: {
          title: 'Frequently asked questions',
          items: [
            {
              question: 'How does Traqqr track a webinar funnel?',
              answer:
                'Traqqr connects the ad click with the opt-in, webinar registration, attendance, call and purchase in one customer journey – natively with KlickTipp, Webinaris and Digistore24.',
            },
            {
              question: 'Does Traqqr work with KlickTipp and Digistore24?',
              answer:
                'Yes, both connect natively. Opt-ins and tags come from KlickTipp and purchases from Digistore24, and Traqqr attributes both to the same journey and the same ad. You\'ll find more tools under Integrations.',
            },
            {
              question: 'What happens when the sale comes weeks after the click?',
              answer:
                'The journey stays open. When the purchase comes in, Traqqr attributes it to the first click and sends it to Meta, even if there was a webinar, a call and a change of device in between.',
            },
            {
              question: 'Who is webinar funnel tracking for?',
              answer:
                'Anyone who sells through webinars, calls or challenges, especially high-ticket offers where customers take their time to decide.',
            },
            {
              question: 'Do I need onboarding?',
              answer:
                'No. You connect your tools yourself in the dashboard, and you set up the reverse proxy in one click through Cloudflare. If you\'d like help, we\'ll support you with the setup.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Which ad fills your webinar – and your calendar?',
          lead: 'Find out – from the first click to the sale weeks later.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
