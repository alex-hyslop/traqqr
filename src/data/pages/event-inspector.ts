import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /event-inspector/ (Figma: 5227:2 DE, 5236:296 EN; Kev's 3 Nov handover §5). The copy is Kev's, except the
// motion pieces' screen-reader sentences. The hero has no buttons in Figma.

export const eventInspector: Record<Locale, ContentPage> = {
  de: {
    title: 'Event Inspector · Traqqr.ai',
    description: 'Ein Parameter an der URL – und Du prüfst jedes Pixel-Event, ohne Entwickler-Tools.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Event Inspector' },
          title: ['Sieh, was Dein Meta Pixel', 'wirklich sendet.'],
          lead: 'Ein Parameter an der URL – und Du prüfst jedes Pixel-Event, ohne Entwickler-Tools.',
          motion: {
            id: 'inspector-hero',
            label: 'Mit ?tqrInspector=1 an der URL erfasst der Traqqr Inspector PageView, Lead und Purchase auf der Seite.',
            width: 1000,
          },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'payload',
          eyebrow: 'Die Payload',
          title: 'Jeder Parameter, sichtbar.',
          motion: {
            id: 'inspector-payload',
            label: 'Eine Purchase-Payload mit Hinweisen zu event_name, event_id, value und currency.',
            width: 1100,
          },
          fallback: {
            kind: 'rail',
            items: [
              { label: '01 · event_name', title: 'Richtig benannt?', body: 'Lead, Purchase, Registration – so, wie Meta es erwartet.' },
              { label: '02 · event_id', title: 'Bereit zur Deduplizierung?', body: 'Gleiche ID im Pixel und am Server, damit nichts doppelt zählt.' },
              { label: '03 · value', title: 'Betrag dabei?', body: 'Ohne Wert kann Meta nicht auf Umsatz optimieren.' },
              { label: '04 · currency', title: 'Währung gesetzt?', body: 'EUR, CHF oder USD – passend zum Wert.' },
            ],
            note: 'BEISPIELDATEN',
          },
        },
      },
      {
        kind: 'stepsDropzone',
        props: {
          id: 'steps',
          title: 'In drei Schritten zur Payload.',
          steps: [
            { number: '01', title: '?tqrInspector=1 an die URL hängen', body: 'Oder &tqrInspector=1, wenn die URL schon Parameter hat.' },
            { number: '02', title: 'Seite durchklicken', body: 'Der Inspector erfasst Meta-Pixel-Events automatisch.' },
            { number: '03', title: 'Hochladen und prüfen', body: 'JSON hochladen oder einfügen, dann Inspect.' },
          ],
          dropzone: { title: 'JSON hochladen', hint: 'oder per Drag & Drop hier ablegen', action: 'Inspect' },
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
              question: 'Was ist der Event Inspector?',
              answer:
                'Ein Werkzeug in Traqqr.ai, mit dem Du Meta-Pixel-Events auf Deiner Seite erfasst und ihre Payload im Detail prüfst – Event für Event, Parameter für Parameter.',
            },
            {
              question: 'Wie starte ich den Inspector?',
              answer:
                'Hänge ?tqrInspector=1 an die URL Deiner Seite (oder &tqrInspector=1, wenn sie schon Parameter hat) und klicke Dich durch.',
            },
            { question: 'Brauche ich Entwickler-Tools?', answer: 'Nein. Keine Browser-Konsole, kein Tag Manager.' },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Prüfe Dein Pixel, bevor Budget fließt.',
          lead: '?tqrInspector=1 an die URL hängen und loslegen.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Event Inspector · Traqqr.ai',
    description: 'One parameter on the URL – and you check every pixel event, without developer tools.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Event Inspector' },
          title: ['See what your Meta Pixel', 'really sends.'],
          lead: 'One parameter on the URL – and you check every pixel event, without developer tools.',
          motion: {
            id: 'inspector-hero',
            label: 'With ?tqrInspector=1 on the URL, the Traqqr Inspector captures PageView, Lead and Purchase on the page.',
            width: 1000,
          },
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'payload',
          eyebrow: 'The payload',
          title: 'Every parameter, visible.',
          motion: {
            id: 'inspector-payload',
            label: 'A Purchase payload with notes on event_name, event_id, value and currency.',
            width: 1100,
          },
          fallback: {
            kind: 'rail',
            items: [
              { label: '01 · event_name', title: 'Named correctly?', body: 'Lead, Purchase, Registration – the way Meta expects it.' },
              { label: '02 · event_id', title: 'Ready for deduplication?', body: 'The same ID in the pixel and on the server, so nothing counts twice.' },
              { label: '03 · value', title: 'Value included?', body: "Without a value, Meta can't optimise for revenue." },
              { label: '04 · currency', title: 'Currency set?', body: 'EUR, CHF or USD – matching the value.' },
            ],
            note: 'EXAMPLE DATA',
          },
        },
      },
      {
        kind: 'stepsDropzone',
        props: {
          id: 'steps',
          title: 'To the payload in three steps.',
          steps: [
            { number: '01', title: 'Add ?tqrInspector=1 to the URL', body: 'Or &tqrInspector=1 if the URL already has parameters.' },
            { number: '02', title: 'Click through your site', body: 'The Inspector captures Meta Pixel events automatically.' },
            { number: '03', title: 'Upload and check', body: 'Upload or paste the JSON, then Inspect.' },
          ],
          dropzone: { title: 'Upload JSON', hint: 'or drag and drop it here', action: 'Inspect' },
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
              question: 'What is the Event Inspector?',
              answer:
                'A tool in Traqqr.ai that captures the Meta Pixel events on your site and lets you check their payload in detail – event by event, parameter by parameter.',
            },
            {
              question: 'How do I start the Inspector?',
              answer: "Add ?tqrInspector=1 to your site's URL (or &tqrInspector=1 if it already has parameters) and click through.",
            },
            { question: 'Do I need developer tools?', answer: 'No. No browser console, no tag manager.' },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Check your pixel before you spend budget.',
          lead: 'Add ?tqrInspector=1 to the URL and get started.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
