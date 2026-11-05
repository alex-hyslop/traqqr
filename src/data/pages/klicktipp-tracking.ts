import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /klicktipp-tracking/ (Figma: 5230:1586 DE, 5236:520 EN; Kev's 3 Nov handover §5). The copy is Kev's,
// except the motion pieces' screen-reader sentences. Every name, number and date is example data.

export const klicktippTracking: Record<Locale, ContentPage> = {
  de: {
    title: 'KlickTipp Tracking · Traqqr',
    description:
      'Traqqr ist nativ mit KlickTipp verbunden und schreibt Quelle, Kampagne und Anzeige als Tags an jeden Kontakt – für Segmente und Follow-ups nach Herkunft.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { section: 'Produkt', current: 'KlickTipp Tracking' },
          title: 'Jeder Kontakt weiß, woher er kommt.',
          lead: 'Traqqr ist nativ mit KlickTipp verbunden und schreibt Quelle, Kampagne und Anzeige als Tags an jeden Kontakt – für Segmente und Follow-ups nach Herkunft.',
          secondaryAction: { label: 'So funktioniert’s', href: '#' },
          motion: {
            id: 'klicktipp-card',
            label: 'Ein KlickTipp-Kontakt bekommt von Traqqr Tags mit Quelle, Kampagne und Anzeige, und sein Kauf wird der Anzeige zugeordnet.',
            width: 600,
          },
        },
      },
      {
        kind: 'bento',
        props: {
          id: 'in-klicktipp',
          eyebrow: 'In KlickTipp',
          title: 'Was bei jedem Kontakt ankommt.',
          tiles: [
            {
              eyebrow: '01 · TAGS',
              title: 'Tags nach Herkunft',
              body: 'Jeder neue Kontakt bekommt seine Quelle mit – ohne manuelles Taggen.',
              visual: {
                kind: 'tags',
                items: [
                  { key: 'quelle:', value: 'meta-ads' },
                  { key: 'kampagne:', value: 'webinar-oktober' },
                  { key: 'anzeigengruppe:', value: 'lookalike-de' },
                  { key: 'anzeige:', value: 'video-03' },
                ],
              },
            },
            {
              eyebrow: '02 · SEGMENTE',
              title: 'Segmente nach Anzeige',
              body: 'Schick jedem Kontakt die E-Mail, die zu seiner Anzeige passt.',
              visual: {
                kind: 'segments',
                items: [
                  { name: 'Meta · Video 03', count: '312' },
                  { name: 'Meta · Karussell 01', count: '148' },
                  { name: 'Google · Suche', count: '96' },
                ],
              },
            },
            {
              eyebrow: '03 · FOLLOW-UPS',
              title: 'Automationen, die zur Quelle passen',
              body: 'Starte Kampagnen in KlickTipp, sobald ein Tag gesetzt ist.',
              visual: { kind: 'chain', steps: ['Tag gesetzt', 'E-Mail 1', 'E-Mail 2'] },
            },
            {
              eyebrow: '04 · KAUF',
              title: 'Der Kauf landet bei der richtigen Anzeige',
              body: 'Auch wenn er Wochen nach dem Opt-in passiert – auf einem anderen Gerät.',
              visual: {
                kind: 'purchase',
                from: { label: 'TAG 1 · AD-KLICK', value: 'Meta Ads · Video 03' },
                to: { label: 'TAG 21 · KAUF', value: '497 € · Digistore24' },
                note: 'BEISPIEL',
              },
            },
          ],
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'tag-flow',
          eyebrow: 'So läuft es',
          title: 'Vom Klick zur passenden E-Mail.',
          titleSize: 'lg',
          band: true,
          motion: {
            id: 'klicktipp-flow',
            label: 'Fünf Schritte: Anzeige, Opt-in, Tag in KlickTipp, Follow-up-E-Mail und der Kauf, der Anzeige zugeordnet.',
            width: 1100,
          },
          fallback: {
            kind: 'rail',
            items: [
              { label: '01', title: 'Anzeige', body: 'Meta Ads' },
              { label: '02', title: 'Opt-in', body: 'Formular' },
              { label: '03', title: 'Tag', body: 'KlickTipp' },
              { label: '04', title: 'Follow-up', body: 'E-Mail-Kampagne' },
              { label: '05', title: 'Kauf', body: 'Zur Anzeige zugeordnet' },
            ],
          },
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
              question: 'Wie funktioniert die KlickTipp-Integration?',
              answer: 'Traqqr ist nativ mit KlickTipp verbunden. Trägt sich jemand ein, bekommt der Kontakt Tags mit Quelle, Kampagne und Anzeige.',
            },
            {
              question: 'Welche Daten landen in KlickTipp?',
              answer:
                'Die Herkunft des Kontakts als Tags: Quelle, Kampagne, Anzeigengruppe und Anzeige. Du nutzt sie für Segmente, Automationen und Auswertungen.',
            },
            {
              question: 'Kann ich Käufe der Anzeige zuordnen?',
              answer: 'Ja. Traqqr verbindet den Kauf mit dem ersten Klick – auch wenn Tage, Wochen oder Geräte dazwischen liegen.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Mach Deine Kontakte schlauer.',
          lead: 'Tags nach Herkunft – automatisch in KlickTipp.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'KlickTipp tracking · Traqqr',
    description:
      'Traqqr is natively connected to KlickTipp and adds the source, campaign and ad to every contact as tags – for segments and follow-ups by origin.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'split',
          breadcrumb: { section: 'Product', current: 'KlickTipp Tracking' },
          title: 'Every contact knows where it came from.',
          lead: 'Traqqr is natively connected to KlickTipp and adds the source, campaign and ad to every contact as tags – for segments and follow-ups by origin.',
          secondaryAction: { label: 'How it works', href: '#' },
          motion: {
            id: 'klicktipp-card',
            label: 'A KlickTipp contact gets tags from Traqqr with the source, campaign and ad, and their purchase is attributed to the ad.',
            width: 600,
          },
        },
      },
      {
        kind: 'bento',
        props: {
          id: 'in-klicktipp',
          eyebrow: 'In KlickTipp',
          title: 'What arrives with every contact.',
          tiles: [
            {
              eyebrow: '01 · TAGS',
              title: 'Tags by origin',
              body: 'Every new contact comes with its source – no manual tagging.',
              visual: {
                kind: 'tags',
                items: [
                  { key: 'source:', value: 'meta-ads' },
                  { key: 'campaign:', value: 'webinar-october' },
                  { key: 'ad-set:', value: 'lookalike-de' },
                  { key: 'ad:', value: 'video-03' },
                ],
              },
            },
            {
              eyebrow: '02 · SEGMENTS',
              title: 'Segments by ad',
              body: 'Send every contact the email that matches their ad.',
              visual: {
                kind: 'segments',
                items: [
                  { name: 'Meta · Video 03', count: '312' },
                  { name: 'Meta · Carousel 01', count: '148' },
                  { name: 'Google · Search', count: '96' },
                ],
              },
            },
            {
              eyebrow: '03 · FOLLOW-UPS',
              title: 'Automations that match the source',
              body: 'Start campaigns in KlickTipp as soon as a tag is added.',
              visual: { kind: 'chain', steps: ['Tag added', 'Email 1', 'Email 2'] },
            },
            {
              eyebrow: '04 · PURCHASE',
              title: 'The purchase lands with the right ad',
              body: 'Even when it happens weeks after the opt-in – on a different device.',
              visual: {
                kind: 'purchase',
                from: { label: 'DAY 1 · AD CLICK', value: 'Meta Ads · Video 03' },
                to: { label: 'DAY 21 · PURCHASE', value: '€497 · Digistore24' },
                note: 'EXAMPLE',
              },
            },
          ],
        },
      },
      {
        kind: 'motion',
        props: {
          id: 'tag-flow',
          eyebrow: 'How it works',
          title: 'From the click to the right email.',
          titleSize: 'lg',
          band: true,
          motion: {
            id: 'klicktipp-flow',
            label: 'Five steps: ad, opt-in, tag in KlickTipp, follow-up email and the purchase, attributed to the ad.',
            width: 1100,
          },
          fallback: {
            kind: 'rail',
            items: [
              { label: '01', title: 'Ad', body: 'Meta Ads' },
              { label: '02', title: 'Opt-in', body: 'Form' },
              { label: '03', title: 'Tag', body: 'KlickTipp' },
              { label: '04', title: 'Follow-up', body: 'Email campaign' },
              { label: '05', title: 'Purchase', body: 'Attributed to the ad' },
            ],
          },
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
              question: 'How does the KlickTipp integration work?',
              answer: 'Traqqr is natively connected to KlickTipp. When someone signs up, the contact gets tags with the source, campaign and ad.',
            },
            {
              question: 'What data ends up in KlickTipp?',
              answer: 'Where the contact came from, as tags: source, campaign, ad set and ad. You use them for segments, automations and reporting.',
            },
            {
              question: 'Can I attribute purchases to the ad?',
              answer: 'Yes. Traqqr connects the purchase to the first click – even when days, weeks or devices lie in between.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Make your contacts smarter.',
          lead: 'Tags by origin – automatically in KlickTipp.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
