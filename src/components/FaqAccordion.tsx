import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FaqItem {
  question: string;
  answer: string;
}

// FAQ accordion (Figma: Block / FAQ 4689:40326): one item open at a time, each item with a
// divider under it. Brand rule: no Medium weight, so the stock trigger's font-medium is dropped.
export function FaqAccordion({ items, defaultOpen }: { items: FaqItem[]; defaultOpen: number }) {
  return (
    <Accordion type="single" collapsible defaultValue={`item-${defaultOpen}`} className="gap-4">
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`item-${i}`} className="border-b">
          <AccordionTrigger className="border-0 font-normal text-foreground hover:no-underline">{item.question}</AccordionTrigger>
          <AccordionContent className="text-foreground">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
