import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /live-feed/ (Figma: 5225:2 DE, 5236:3 EN; Kev's 3 Nov handover §5). The copy is Kev's, except the motion
// pieces' screen-reader sentences and the EN CTA lead, which Figma left in German.

export const liveFeed: Record<Locale, ContentPage> = {
  de: {
    title: 'Live Feed · Traqqr',
    description: 'Sieh live, was auf Deiner Seite passiert und was bei Meta ankommt – aus dem Browser und vom Server.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { parent: { label: 'Produkt', href: '#' }, current: 'Live Feed' },
          title: ['Jedes Event. In dem Moment, in dem', 'es passiert.'],
          lead: 'Sieh live, was auf Deiner Seite passiert und was bei Meta ankommt – aus dem Browser und vom Server.',
          secondaryAction: { label: 'Live Feed ansehen', href: '#' },
          motion: { id: 'live-feed-hero', label: 'Der Live Feed zeigt Käufe, Leads und Seitenaufrufe, sobald sie eintreffen.', width: 620 },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'events',
          motion: { id: 'live-feed-marquee', label: 'Event-Typen laufen durch: PageView, Lead, Registration, Purchase, Dedupliziert.', width: 1200 },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'browser-server',
          eyebrow: 'Zwei Wege, ein Bild',
          title: 'Browser und Server, nebeneinander.',
          motion: { id: 'live-feed-split', label: 'Ein Kauf kommt aus dem Browser und vom Server an und wird zu einem Event dedupliziert.', width: 1000 },
        },
      },
      {
        kind: 'steps',
        props: {
          id: 'steps',
          title: 'In drei Schritten live.',
          steps: [
            { number: '01', title: 'Snippet einfügen', body: 'Den Traqqr-Snippet in den <head> Deiner Seite einbauen.' },
            { number: '02', title: 'Tools verbinden', body: 'Meta Pixel verbinden, dann KlickTipp, Digistore24 und Co.' },
            { number: '03', title: 'Zusehen', body: 'Der Live Feed zeigt jedes Event, sobald es eintrifft.' },
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
              question: 'Was zeigt der Live Feed?',
              answer: 'Die Events Deiner Seite in Echtzeit: Seitenaufrufe, Leads und Käufe, aus dem Browser und vom Server. So siehst Du sofort, ob Dein Tracking läuft.',
            },
            {
              question: 'Sehe ich, was an Meta gesendet wurde?',
              answer: 'Ja. Jedes Event zeigt, ob es aus dem Browser oder vom Server kam und ob es dedupliziert wurde.',
            },
            { question: 'Brauche ich einen Entwickler?', answer: 'Nein. Snippet einfügen, Tools verbinden, fertig.' },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'Sieh Deine Events live.',
          lead: 'Snippet einbauen und zusehen, wie Dein Funnel arbeitet.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Live Feed · Traqqr',
    description: 'See live what happens on your site and what reaches Meta – from the browser and from the server.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { parent: { label: 'Product', href: '#' }, current: 'Live Feed' },
          title: ['Every event.', 'As it happens.'],
          lead: 'See live what happens on your site and what reaches Meta – from the browser and from the server.',
          secondaryAction: { label: 'See the Live Feed', href: '#' },
          motion: { id: 'live-feed-hero', label: 'The Live Feed shows purchases, leads and page views as they arrive.', width: 620 },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'events',
          motion: { id: 'live-feed-marquee', label: 'Event types roll past: PageView, Lead, Registration, Purchase, Deduplicated.', width: 1200 },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'browser-server',
          eyebrow: 'Two paths, one picture',
          title: 'Browser and server, side by side.',
          motion: { id: 'live-feed-split', label: 'A purchase arrives from the browser and from the server and is deduplicated into one event.', width: 1000 },
        },
      },
      {
        kind: 'steps',
        props: {
          id: 'steps',
          title: 'Live in three steps.',
          steps: [
            { number: '01', title: 'Add the snippet', body: 'Add the Traqqr snippet to the <head> of your site.' },
            { number: '02', title: 'Connect your tools', body: 'Connect the Meta Pixel, then KlickTipp, Digistore24 and more' },
            { number: '03', title: 'Watch', body: 'The Live Feed shows every event as soon as it arrives.' },
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
              question: 'What does the Live Feed show?',
              answer:
                "Your site's events in real time: page views, leads and purchases, from the browser and from the server. So you see straight away whether your tracking is working.",
            },
            {
              question: 'Can I see what was sent to Meta?',
              answer: 'Yes. Every event shows whether it came from the browser or the server, and whether it was deduplicated.',
            },
            { question: 'Do I need a developer?', answer: 'No. Add the snippet, connect your tools, done.' },
          ],
        },
      },
      {
        kind: 'cta',
        props: {
          id: 'cta',
          title: 'See your events live.',
          lead: 'Add the snippet and watch your funnel at work.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
