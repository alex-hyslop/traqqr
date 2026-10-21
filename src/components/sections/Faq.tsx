import { Section, SectionHeading } from '@klicktipp/traqqr-components';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems, type FaqItem } from '@/data/faq';

export interface FaqProps {
  title?: string;
  items?: FaqItem[];
  /** Index of the item open on load. */
  defaultOpen?: number;
}

// FAQ (Figma: Block / FAQ 4689:40326, homepage 5004:62531; mobile 5063:15663). Stock shadcn Accordion,
// one item open at a time, a divider under every item. Brand rule: no Medium weight, so the stock
// trigger's font-medium is dropped (Kev confirmed Regular). Answers are muted, 14/20 with pb-2.5 as in
// Figma, the same size as the questions (Kev, 20 Oct 16:45). Needs hydrating (client:visible).
export function Faq({ title = 'Frequently asked questions', items = faqItems, defaultOpen = 3 }: FaqProps) {
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
              <AccordionContent className="pb-2.5 text-sm leading-5 text-muted-foreground">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
