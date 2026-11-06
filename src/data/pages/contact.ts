import type { ContentPage } from '@/data/pages/content';
import type { Locale } from '@/i18n';

// /contact/ · /de/kontakt/: the contact form (Kev's 6 Nov handover: Figma 5393:3 DE, 5394:2 EN, mobile
// 5394:857, states 5394:652). Every "Support kontaktieren" button and the footer's Kontakt link go here. No
// CTA block. ⚑ Kev's note still has the privacy wording (legal) and the languages line to confirm; the EN
// form copy past his frame's labels is translated from his German.

export const contact: Record<Locale, ContentPage> = {
  de: {
    title: 'Kontakt · Traqqr.ai',
    description: 'Schreib dem Traqqr.ai-Team: Support, Vertrieb, Abrechnung oder Partnerschaften. Wir melden uns per E-Mail.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Kontakt' },
          title: 'Wie können wir Dir helfen?',
          lead: 'Wir sind für Dich da. Schreib uns, und wir melden uns per E-Mail bei Dir.',
        },
      },
      {
        kind: 'contact',
        props: {
          form: {
            title: 'Nachricht an unser Team',
            required: 'Pflichtfelder sind mit * markiert.',
            email: { label: 'Deine E-Mail-Adresse', placeholder: 'name@firma.de' },
            topic: {
              label: 'Worum geht es?',
              options: [
                { value: 'support', label: 'Support' },
                { value: 'sales', label: 'Vertrieb & Demo' },
                { value: 'billing', label: 'Abrechnung' },
                { value: 'partnerships', label: 'Partnerschaften' },
                { value: 'other', label: 'Sonstiges' },
              ],
            },
            subject: { label: 'Betreff', placeholder: 'z. B. „Login“ oder „Events fehlen“' },
            message: {
              label: 'Kannst Du uns mehr dazu sagen?',
              placeholder: 'Beschreib kurz, worum es geht. Bei Tracking-Fragen helfen uns Deine Domain und die betroffene Seite.',
              tooltip: 'Je genauer, desto schneller: Deine Domain, die betroffene Seite und wann es passiert ist.',
              tooltipLabel: 'Was hilft uns?',
              limit: 'Maximal 5.000 Zeichen',
            },
            attachments: {
              label: 'Anhänge (optional)',
              drop: 'Dateien hierher ziehen oder durchsuchen',
              rules: 'Bis zu 5 Dateien: PNG, JPG oder GIF bis 10 MB pro Bild, CSV (UTF-8, Komma oder Semikolon) bis 2 MB. Zellen dürfen nicht mit =, +, - oder @ beginnen.',
              browse: 'Durchsuchen',
              remove: 'Entfernen',
            },
            privacy: {
              before: 'Mit dem Absenden verarbeiten wir Deine Angaben, um Deine Anfrage zu beantworten. Mehr dazu in der ',
              link: 'Datenschutzerklärung',
              after: '.',
            },
            submit: 'Nachricht senden',
            sending: 'Wird gesendet …',
            errors: {
              email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
              message: 'Bitte schreib uns, worum es geht.',
              tooManyFiles: 'Du kannst bis zu 5 Dateien anhängen.',
              fileType: '„{name}“: Erlaubt sind PNG, JPG, GIF und CSV.',
              imageSize: '„{name}“ ist größer als 10 MB.',
              csvSize: '„{name}“ ist größer als 2 MB.',
              csvFormula: '„{name}“ enthält Zellen, die mit =, +, - oder @ beginnen.',
              failed: 'Das hat nicht geklappt. Bitte versuch es noch einmal.',
            },
            sent: {
              title: 'Danke! Deine Nachricht ist angekommen.',
              body: 'Wir melden uns per E-Mail bei {email}.',
              action: 'Zum Hilfe-Center',
            },
          },
          aside: {
            label: 'Schneller zur Antwort',
            help: { title: 'Hilfe-Center', body: 'Anleitungen für Setup, Integrationen und Fehlersuche.' },
            login: { title: 'Schon Kunde?', body: 'Melde Dich im Dashboard an.' },
            language: { label: 'Sprache', value: 'Deutsch und Englisch' },
          },
        },
      },
    ],
  },
  en: {
    title: 'Contact · Traqqr.ai',
    description: 'Write to the Traqqr.ai team: support, sales, billing or partnerships. We get back to you by email.',
    sections: [
      {
        kind: 'pageHero',
        props: {
          layout: 'centred',
          breadcrumb: { current: 'Contact' },
          title: 'How can we help you?',
          lead: "We're here to support you. Write to us and we'll get back to you by email.",
        },
      },
      {
        kind: 'contact',
        props: {
          form: {
            title: 'Message our team',
            required: 'Required fields are marked with *.',
            email: { label: 'Your email address', placeholder: 'name@company.com' },
            topic: {
              label: "What's it about?",
              options: [
                { value: 'support', label: 'Support' },
                { value: 'sales', label: 'Sales & demo' },
                { value: 'billing', label: 'Billing' },
                { value: 'partnerships', label: 'Partnerships' },
                { value: 'other', label: 'Other' },
              ],
            },
            subject: { label: 'Subject', placeholder: 'e.g. "Login" or "Events missing"' },
            message: {
              label: 'Can you give us more information?',
              placeholder: "Briefly describe what it's about. For tracking questions, your domain and the affected page help us.",
              tooltip: 'The more detail, the faster: your domain, the affected page and when it happened.',
              tooltipLabel: 'What helps us?',
              limit: 'Up to 5,000 characters',
            },
            attachments: {
              label: 'Attachments (optional)',
              drop: 'Drag files here or browse',
              rules: 'Up to 5 files: PNG, JPG or GIF up to 10 MB per image; CSV (UTF-8, comma or semicolon) up to 2 MB. No cells starting with =, +, - or @.',
              browse: 'Browse',
              remove: 'Remove',
            },
            privacy: {
              before: 'When you send this, we process your details to answer your request. More in our ',
              link: 'privacy policy',
              after: '.',
            },
            submit: 'Send message',
            sending: 'Sending …',
            errors: {
              email: 'Please enter a valid email address.',
              message: "Please tell us what it's about.",
              tooManyFiles: 'You can attach up to 5 files.',
              fileType: '"{name}": PNG, JPG, GIF and CSV are allowed.',
              imageSize: '"{name}" is larger than 10 MB.',
              csvSize: '"{name}" is larger than 2 MB.',
              csvFormula: '"{name}" has cells starting with =, +, - or @.',
              failed: "That didn't work. Please try again.",
            },
            sent: {
              title: 'Thanks! Your message has arrived.',
              body: "We'll get back to you by email at {email}.",
              action: 'Go to the Help Center',
            },
          },
          aside: {
            label: 'Faster answers',
            help: { title: 'Help Center', body: 'Guides for setup, integrations and troubleshooting.' },
            login: { title: 'Already a customer?', body: 'Log in to your dashboard.' },
            language: { label: 'Language', value: 'German and English' },
          },
        },
      },
    ],
  },
};
