import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /reverse-proxy/ (Figma: 5226:2 DE, 5236:144 EN; Kev's 3 Nov handover §5). The copy is Kev's, except the
// motion piece's screen-reader sentence and the EN CTA lead, which Figma left in German. "Robuster gegen
// Adblocker" is still an unconfirmed claim (handover §11.3): fine for the internal demo, confirm before
// it goes public.

const rows = (labels: string[]) =>
  labels.map((label, i) => ({ label, standard: i >= 5, highlight: true }));

export const reverseProxy: Record<Locale, ContentPage> = {
  de: {
    title: 'Reverse Proxy · Traqqr',
    description:
      'Der Reverse Proxy leitet Tracking über Deine eigene Domain – für mehr Datenqualität und mehr Widerstand gegen Adblocker. Per Klick über Cloudflare bereitgestellt.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { section: 'Produkt', current: 'First-Party Reverse Proxy' },
          title: 'Tracking, das auf Deiner Domain läuft.',
          lead: 'Der Reverse Proxy leitet Tracking über Deine eigene Domain – für mehr Datenqualität und mehr Widerstand gegen Adblocker. Per Klick über Cloudflare bereitgestellt.',
          secondaryAction: { label: "So funktioniert's", href: '#' },
          motion: {
            id: 'proxy-flow',
            label: 'Ein Request geht vom Browser über track.deineseite.de zu Traqqr und weiter an Meta.',
            width: 520,
          },
        },
      },
      {
        kind: 'featureTable',
        props: {
          id: 'standard-vs-proxy',
          eyebrow: 'Standard vs. First-Party',
          title: 'Was der Proxy zusätzlich kann.',
          columns: { feature: 'Funktion', standard: 'Standard', highlight: 'Reverse Proxy' },
          rows: rows([
            'Robuster gegen Adblocker',
            'First-Party-Cookies',
            'Same-Origin-Requests',
            'HMAC-signierte Requests',
            'Echte Besucher-IP',
            'Event-Tracking',
            'Device Fingerprinting',
            'Facebook-CAPI-Weiterleitung',
          ]),
          answers: { yes: 'Ja', no: 'Nein' },
        },
      },
      {
        kind: 'steps',
        props: {
          id: 'cloudflare',
          band: 'charcoal',
          logo: 'Cloudflare',
          eyebrow: 'Cloudflare',
          title: 'Kein Server. Kein Entwickler. Ein Klick.',
          steps: [
            { number: '01', title: 'Konto verbinden', body: 'Deinen Cloudflare-Account mit Traqqr verbinden.' },
            { number: '02', title: 'Domain wählen', body: 'Die Domain Deiner Seite für den Proxy festlegen.' },
            { number: '03', title: 'Per Klick live', body: 'Traqqr stellt den Proxy für Dich bereit.' },
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
              question: 'Was ist ein First-Party Reverse Proxy?',
              answer:
                'Er leitet Tracking-Requests über Deine eigene Domain. Für den Browser sind es Requests Deiner Seite, nicht die eines Drittanbieters – mit First-Party-Cookies und signierten Requests.',
            },
            {
              question: 'Brauche ich Cloudflare?',
              answer: 'Ja. Traqqr stellt den Proxy über Deinen Cloudflare-Account bereit, per Klick und ohne eigenen Server.',
            },
            { question: 'Kann ich den Proxy wieder deaktivieren?', answer: 'Ja, jederzeit pro Domain in den Einstellungen Deiner Seite.' },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Tracking über Deine eigene Domain.',
          lead: 'Cloudflare verbinden und den Reverse Proxy per Klick bereitstellen.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Reverse proxy · Traqqr',
    description:
      'The reverse proxy routes tracking through your own domain – for better data quality and more resistance to ad blockers. Deployed in one click via Cloudflare.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { section: 'Product', current: 'First-party reverse proxy' },
          title: 'Tracking that runs on your domain.',
          lead: 'The reverse proxy routes tracking through your own domain – for better data quality and more resistance to ad blockers. Deployed in one click via Cloudflare.',
          secondaryAction: { label: 'How it works', href: '#' },
          motion: {
            id: 'proxy-flow',
            label: 'A request travels from the browser through track.yoursite.com to Traqqr and on to Meta.',
            width: 520,
          },
        },
      },
      {
        kind: 'featureTable',
        props: {
          id: 'standard-vs-proxy',
          eyebrow: 'Standard vs. first-party',
          title: 'What the proxy adds.',
          columns: { feature: 'Feature', standard: 'Standard', highlight: 'Reverse proxy' },
          rows: rows([
            'More robust against ad blockers',
            'First-party cookies',
            'Same-origin requests',
            'HMAC-signed requests',
            'Real visitor IP',
            'Event tracking',
            'Device fingerprinting',
            'Facebook CAPI forwarding',
          ]),
          answers: { yes: 'Yes', no: 'No' },
        },
      },
      {
        kind: 'steps',
        props: {
          id: 'cloudflare',
          band: 'charcoal',
          logo: 'Cloudflare',
          eyebrow: 'Cloudflare',
          title: 'No server. No developer. One click.',
          steps: [
            { number: '01', title: 'Connect your account', body: 'Connect your Cloudflare account to Traqqr.' },
            { number: '02', title: 'Choose a domain', body: 'Set the domain of your site for the proxy.' },
            { number: '03', title: 'Live in one click', body: 'Traqqr deploys the proxy for you.' },
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
              question: 'What is a first-party reverse proxy?',
              answer:
                "It routes tracking requests through your own domain. To the browser they're requests from your site, not from a third party – with first-party cookies and signed requests.",
            },
            {
              question: 'Do I need Cloudflare?',
              answer: 'Yes. Traqqr deploys the proxy through your Cloudflare account, in one click and without a server of your own.',
            },
            { question: 'Can I turn the proxy off again?', answer: "Yes, any time, per domain, in your site's settings." },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Tracking through your own domain.',
          lead: 'Connect Cloudflare and deploy the reverse proxy in one click.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
