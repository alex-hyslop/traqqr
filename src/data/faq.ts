export interface FaqItem {
  question: string;
  answer: string;
}

// Homepage FAQ (answers from Kev, Slack, 20 Oct 11:41). Shared by the Faq section, the page's FAQPage
// structured data and /llms.txt, so all three say the same thing.
export const faqItems: FaqItem[] = [
  {
    question: 'What is server-side tracking?',
    answer:
      "Your server sends each visit, lead and sale to Meta directly, instead of relying only on the pixel in the visitor's browser. Ad blockers and browser limits can't stop that copy.",
  },
  {
    question: 'Do I need a developer to set it up?',
    answer: "No. You paste one snippet into your site's <head> and connect Meta from the dashboard.",
  },
  {
    question: 'Which tools does Traqqr work with?',
    answer: 'Meta Ads and Facebook, plus Cloudflare, KlickTipp, Digistore24, Ablefy, EverWebinar, Webinaris and HubSpot.',
  },
  {
    question: 'Does Traqqr replace my Meta Pixel?',
    answer:
      'No. Traqqr works alongside your pixel. Meta gets each event from the browser and from your server, and counts it once thanks to deduplication.',
  },
  {
    question: 'Will ad blockers still block my tracking?',
    answer:
      "Server-side events aren't affected. With the first-party reverse proxy on your own subdomain, browser events are blocked far less often too.",
  },
  {
    question: 'Can I see what is sent to Meta?',
    answer: 'Yes. Live Feed shows every event as it arrives, and Event Inspector shows exactly what each one contained.',
  },
  {
    question: 'Can I try Traqqr for free?',
    answer: 'Start a free trial from any "Start free trial" button on this page.',
  },
];
