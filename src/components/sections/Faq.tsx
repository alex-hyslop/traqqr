import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Section } from '@/components/website/Section';
import { SectionHeading } from '@/components/website/SectionHeading';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  title?: string;
  items?: FaqItem[];
  /** Index of the item open on load. */
  defaultOpen?: number;
}

// Answers and their styling from Kev (Slack, 20 Oct 11:41).
const defaultItems: FaqItem[] = [
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

// FAQ (Figma: Block / FAQ 4689:40326, homepage 5004:62531; mobile 5063:15663). Stock shadcn Accordion,
// one item open at a time, a divider under every item. Brand rule: no Medium weight, so the stock
// trigger's font-medium is dropped (Kev confirmed Regular). Needs hydrating (client:visible).
export function Faq({ title = 'Frequently asked questions', items = defaultItems, defaultOpen = 3 }: FaqProps) {
  return (
    <Section
      id="faq"
      labelledBy="faq-heading"
      width="narrow"
      containerClassName="flex flex-col items-center gap-6 lg:gap-8"
    >
      <SectionHeading id="faq-heading" align="left" title={title} className="w-full" />
      <div className="w-full rounded-xl border bg-card p-4">
        <Accordion type="single" collapsible defaultValue={`item-${defaultOpen}`} className="gap-4">
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`} className="border-b">
              <AccordionTrigger className="border-0 font-normal text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-4 text-base leading-6 text-muted-foreground">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
