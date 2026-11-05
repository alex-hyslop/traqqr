import type { ContentPage } from '@/data/pages/content';
import { siteContent } from '@/data/site';
import { pathFor, type Locale } from '@/i18n';

// /pricing/ · /de/preise/ (Figma: 5307:142 DE, 5307:1143 EN, states board 5307:1089; Kev's 5 Nov handover).
// The copy is Kev's (case study updated 5 Nov). Prices come from src/data/pricing.ts. Placeholders, all to
// replace before launch:
// - the case study (Alex Hyslop, for the internal presentation);
// - FAQ answer 1 (Kev's, marked in Figma);
// - FAQ answers 2–5: Figma has the questions only, so these are built from what the page already says,
//   marked the same way until Kev writes them.

export const pricing: Record<Locale, ContentPage> = {
  de: {
    title: 'Preise · Traqqr',
    description: 'Zahl nur für das, was Du trackst: Traqqr wird pro Website nach Events im Monat abgerechnet. 14 Tage kostenlos testen.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { parent: { label: 'Traqqr', href: pathFor('home', 'de') }, current: 'Preise' },
          title: ['Zahl nur für das, was Du trackst.'],
          lead: 'Wähle, wie viele Events Du im Monat trackst, und sieh sofort, was Traqqr für Dich kostet. Oder starte erst einmal kostenlos.',
        },
      },
      {
        kind: 'pricing',
        props: {
          trial: {
            badge: 'Kostenlos',
            title: 'Tage kostenlos',
            lead: 'Teste Traqqr mit Deiner echten Seite. Eine Karte brauchst Du erst vor dem Ende der Testphase.',
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
            title: 'Was kostet Traqqr für Dich?',
            lead: 'Traqqr wird pro Website nach Events im Monat abgerechnet. Ein Event ist zum Beispiel ein Seitenaufruf, ein Opt-in oder ein Kauf, den Traqqr erfasst.',
            eventsLabel: 'Events pro Monat',
            sitesLabel: 'Websites',
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
          badge: 'PLATZHALTER-FALLSTUDIE',
          title: 'Was 14 Tage verändern können.',
          quote:
            '„Nach 14 Tagen wussten wir zum ersten Mal, welche Anzeige unsere Leads bringt. Traqqr hat 214 Opt-ins und die ersten 9 Käufe zugeordnet – und bei Meta kommen jetzt 17 % mehr Conversions an. Eine Kampagne haben wir pausiert, die viele Leads, aber keine Käufer gebracht hat.“',
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
                '[Platzhalter: Definition mit dem Produkt abstimmen] Ein Event ist eine Aktion, die Traqqr auf Deiner Seite erfasst, zum Beispiel ein Seitenaufruf, ein Opt-in oder ein Kauf.',
            },
            {
              question: 'Was passiert nach den 14 Tagen?',
              answer: '[Platzhalter] Vor dem Ende der Testphase hinterlegst Du eine Karte und wählst Deinen Plan. Danach trackt Traqqr ohne Unterbrechung weiter.',
            },
            {
              question: 'Wird pro Website abgerechnet?',
              answer: '[Platzhalter] Ja. Jede Website hat ihren eigenen Plan, nach Events im Monat.',
            },
            {
              question: 'Kann ich meinen Plan später ändern?',
              answer: '[Platzhalter] Ja. Im Dashboard siehst Du Deine echten Zahlen und kannst den Plan jederzeit anpassen.',
            },
            {
              question: 'Brauche ich für den Test eine Kreditkarte?',
              answer: '[Platzhalter] Erst vor dem Ende der Testphase. Starten kannst Du ohne Karte.',
            },
          ],
        },
      },
      {
        kind: 'cta',
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
    title: 'Pricing · Traqqr',
    description: 'Only pay for what you track: Traqqr is billed per website, by events per month. Try it free for 14 days.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { parent: { label: 'Traqqr', href: pathFor('home', 'en') }, current: 'Pricing' },
          title: ['Only pay for what you track.'],
          lead: 'Pick how many events you track a month and see right away what Traqqr costs you. Or start for free first.',
        },
      },
      {
        kind: 'pricing',
        props: {
          trial: {
            badge: 'Free',
            title: 'days free',
            lead: 'Try Traqqr on your real site. You only need a card before the trial ends.',
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
            title: 'What does Traqqr cost you?',
            lead: 'Traqqr is billed per website, by events per month. An event is, for example, a page view, an opt-in or a purchase that Traqqr captures.',
            eventsLabel: 'Events per month',
            sitesLabel: 'Websites',
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
          badge: 'PLACEHOLDER CASE STUDY',
          title: 'What 14 days can change.',
          quote:
            '“After 14 days, we knew for the first time which ad brings our leads. Traqqr attributed 214 opt-ins and our first 9 purchases, and Meta now receives 17% more conversions. We paused one campaign that brought plenty of leads but no buyers.”',
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
                '[Placeholder: confirm the definition with product] An event is an action Traqqr captures on your site, for example a page view, an opt-in or a purchase.',
            },
            {
              question: 'What happens after the 14 days?',
              answer: '[Placeholder] Before the trial ends you add a card and pick your plan. Traqqr then keeps tracking without a break.',
            },
            {
              question: 'Is it billed per website?',
              answer: '[Placeholder] Yes. Each website has its own plan, by events per month.',
            },
            {
              question: 'Can I change my plan later?',
              answer: '[Placeholder] Yes. The dashboard shows your real numbers, and you can change the plan at any time.',
            },
            {
              question: 'Do I need a card for the trial?',
              answer: '[Placeholder] Only before the trial ends. You can start without one.',
            },
          ],
        },
      },
      {
        kind: 'cta',
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
