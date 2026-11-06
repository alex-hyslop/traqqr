import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import type { Locale } from '@/i18n';

// /pricing/ · /de/preise/ (Figma: 5307:142 DE, 5307:1143 EN, states board 5307:1089; Kev's 5 Nov handover).
// The copy is Kev's, the FAQ answers from his 5 Nov testimonial-band/FAQ note. Prices come from
// src/data/pricing.ts. The case study (Alex Hyslop) is a placeholder for the internal presentation: replace
// it before launch. Kev still has to confirm FAQ answers 1, 2, 4 and 5 with product (⚑ in his note).

export const pricing: Record<Locale, ContentPage> = {
  de: {
    title: 'Preise · Traqqr.ai',
    description: 'Zahl nur für das, was Du trackst: Traqqr.ai wird pro Website nach Events im Monat abgerechnet. 14 Tage kostenlos testen.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Preise' },
          title: ['Zahl nur für das, was Du trackst.'],
          lead: 'Wähle, wie viele Events Du im Monat trackst, und sieh sofort, was Traqqr.ai für Dich kostet. Oder starte erst einmal kostenlos.',
        },
      },
      {
        kind: 'pricing',
        props: {
          trial: {
            badge: 'Kostenlos',
            title: 'Tage kostenlos',
            lead: 'Teste Traqqr.ai mit Deiner echten Seite. Eine Karte brauchst Du erst vor dem Ende der Testphase.',
            stepsLabel: 'Was Du in 14 Tagen schaffst',
            steps: [
              { day: 'Tag 1', text: 'Snippet einbauen, Meta verbinden' },
              { day: 'Tag 2', text: 'Reverse Proxy auf Deiner Domain' },
              { day: 'Tag 3', text: 'KlickTipp und Digistore24 verbinden' },
              { day: 'Tag 7', text: 'Erste Käufe im Live Feed, der richtigen Anzeige zugeordnet' },
              { day: 'Tag 14', text: 'Mit echten Zahlen entscheiden' },
            ],
          },
          calculator: {
            badge: 'Rechner',
            title: 'Was kostet Traqqr.ai für Dich?',
            lead: 'Traqqr.ai wird pro Website nach Events im Monat abgerechnet. Ein Event ist zum Beispiel ein Seitenaufruf, ein Opt-in oder ein Kauf, den Traqqr.ai erfasst.',
            eventsLabel: 'Events pro Monat',
            hint: 'Nicht sicher, wie viele Events Du hast? Starte klein: Im Dashboard siehst Du Deine echten Zahlen und kannst den Plan jederzeit anpassen.',
            priceLabel: 'Dein Preis',
            perMonth: '/ Monat',
            action: '14 Tage kostenlos testen',
          },
        },
      },
      {
        kind: 'testimonial',
        props: {
          id: 'case-study',
          badge: 'Platzhalter-Fallstudie',
          title: 'Was 14 Tage verändern können.',
          quote:
            '„Nach 14 Tagen wussten wir zum ersten Mal, welche Anzeige unsere Leads bringt. Traqqr.ai hat 214 Opt-ins und die ersten 9 Käufe zugeordnet – und bei Meta kommen jetzt 17 % mehr Conversions an. Eine Kampagne haben wir pausiert, die viele Leads, aber keine Käufer gebracht hat.“',
          name: 'Alex Hyslop',
          role: '[Rolle, Firma] · Platzhalter, wird vor dem Launch ersetzt',
          person: 'alex-hyslop',
        },
      },
      {
        kind: 'faq',
        props: {
          title: 'Häufige Fragen zum Preis',
          items: [
            {
              question: 'Was zählt als Event?',
              answer:
                'Ein Event ist eine Aktion, die Traqqr.ai auf Deiner Seite erfasst, zum Beispiel ein Seitenaufruf, ein Opt-in oder ein Kauf.',
            },
            {
              question: 'Was passiert nach den 14 Tagen?',
              answer:
                'Du wählst den Plan, der zu Deinen Events passt, und hinterlegst Deine Zahlungsdaten. Wenn Du keinen Plan wählst, endet der Test automatisch – es entstehen keine Kosten.',
            },
            {
              question: 'Wird pro Website abgerechnet?',
              answer:
                'Ja. Jede Website hat ihren eigenen Plan, abhängig von ihren Events im Monat. Zwei Websites mit je 5.000 Events kosten zum Beispiel 2 × 49 € = 98 € im Monat.',
            },
            {
              question: 'Kann ich meinen Plan später ändern?',
              answer:
                'Ja. Du kannst jederzeit in einen größeren oder kleineren Plan wechseln, wenn sich Deine Events ändern.',
            },
            {
              question: 'Brauche ich für den Test eine Kreditkarte?',
              answer:
                'Nein, nicht zum Starten. Eine Karte brauchst Du erst vor dem Ende der Testphase.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Welche Anzeige bringt Deine Kunden?',
          lead: 'Finde es in 14 Tagen heraus, kostenlos.',
          primaryAction: siteContent.de.cta.trial,
          secondaryAction: siteContent.de.cta.demo,
        },
      },
    ],
  },
  en: {
    title: 'Pricing · Traqqr.ai',
    description: 'Only pay for what you track: Traqqr.ai is billed per website, by events per month. Try it free for 14 days.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Pricing' },
          title: ['Only pay for what you track.'],
          lead: 'Pick how many events you track a month and see right away what Traqqr.ai costs you. Or start for free first.',
        },
      },
      {
        kind: 'pricing',
        props: {
          trial: {
            badge: 'Free',
            title: 'days free',
            lead: 'Try Traqqr.ai on your real site. You only need a card before the trial ends.',
            stepsLabel: 'What you can do in 14 days',
            steps: [
              { day: 'Day 1', text: 'Add the snippet, connect Meta' },
              { day: 'Day 2', text: 'Reverse proxy on your own domain' },
              { day: 'Day 3', text: 'Connect KlickTipp and Digistore24' },
              { day: 'Day 7', text: 'First purchases in the Live Feed, matched to the right ad' },
              { day: 'Day 14', text: 'Decide with real numbers' },
            ],
          },
          calculator: {
            badge: 'Calculator',
            title: 'What does Traqqr.ai cost you?',
            lead: 'Traqqr.ai is billed per website, by events per month. An event is, for example, a page view, an opt-in or a purchase that Traqqr.ai captures.',
            eventsLabel: 'Events per month',
            hint: 'Not sure how many events you have? Start small: the dashboard shows your real numbers, and you can change the plan at any time.',
            priceLabel: 'Your price',
            perMonth: '/ month',
            action: 'Try 14 days free',
          },
        },
      },
      {
        kind: 'testimonial',
        props: {
          id: 'case-study',
          badge: 'Placeholder case study',
          title: 'What 14 days can change.',
          quote:
            '“After 14 days, we knew for the first time which ad brings our leads. Traqqr.ai attributed 214 opt-ins and our first 9 purchases, and Meta now receives 17% more conversions. We paused one campaign that brought plenty of leads but no buyers.”',
          name: 'Alex Hyslop',
          role: 'placeholder, replaced before launch',
          person: 'alex-hyslop',
        },
      },
      {
        kind: 'faq',
        props: {
          title: 'Pricing questions',
          items: [
            {
              question: 'What counts as an event?',
              answer:
                'An event is an action Traqqr.ai captures on your site, for example a page view, an opt-in or a purchase.',
            },
            {
              question: 'What happens after the 14 days?',
              answer:
                'You pick the plan that fits your events and add your payment details. If you don\'t pick a plan, the trial simply ends and you aren\'t charged.',
            },
            {
              question: 'Is it billed per website?',
              answer:
                'Yes. Each website has its own plan, based on its events per month. For example, two websites with 5,000 events each cost 2 × €49 = €98 a month.',
            },
            {
              question: 'Can I change my plan later?',
              answer:
                'Yes. You can move to a bigger or smaller plan at any time as your events change.',
            },
            {
              question: 'Do I need a card for the trial?',
              answer:
                'No, not to start. You only need a card before the trial ends.',
            },
          ],
        },
      },
      {
        kind: 'cta',
        background: 'dots',
        props: {
          id: 'cta',
          title: 'Which ad brings your customers?',
          lead: 'Find out in 14 days, for free.',
          primaryAction: siteContent.en.cta.trial,
          secondaryAction: siteContent.en.cta.demo,
        },
      },
    ],
  },
};
