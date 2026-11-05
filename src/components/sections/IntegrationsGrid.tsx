import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@klicktipp/traqqr-components';
import { ChevronRight } from 'lucide-react';
import { integrations } from '@/data/integrations';

export interface IntegrationCardCopy {
  /** The integration's name in src/data/integrations.ts (for its logo). */
  name: string;
  /** The category badge on the card. */
  badge: string;
  /** Which tab shows it, besides "all". */
  category: string;
  description: string;
}

export interface IntegrationsGridProps {
  id: string;
  eyebrow: string;
  title: string;
  /** The tabs, "all" first; each has a key the cards' `category` refers to. */
  tabs: { key: string; label: string }[];
  cards: IntegrationCardCopy[];
  /** Where a card links; the detail pages don't exist yet (Kev's 3 Nov handover §10). */
  href: string;
}

// Integration Cards under tabs (Figma: /integrationen/ §2–§3 5233:725 / 5221:23263): a centred mono
// eyebrow and 36px title, the shadcn Tabs list 40px under it (Alle · Ads · E-Mail · Webinar · Verkauf ·
// CRM) filtering a 3-column grid of 347px cards, 24px apart. Each card is the dashboard's Integration
// Card: the logo tile, a category Badge and chevron, the 18px name and a muted line. Needs hydrating
// (client:visible) for the tabs.
export function IntegrationsGrid({ id, eyebrow, title, tabs, cards, href }: IntegrationsGridProps) {
  const logos = Object.fromEntries(integrations.map((i) => [i.name, i.logo]));
  const [all] = tabs;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-14 lg:scroll-mt-0 mx-auto flex max-w-312 flex-col items-center gap-10 px-6 pt-14 pb-14 lg:pt-30 lg:pb-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-xs leading-4 tracking-[0.08em] text-muted-foreground uppercase">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="text-3xl leading-9 font-extralight text-foreground lg:text-4xl lg:leading-10">
          {title}
        </h2>
      </div>
      <Tabs defaultValue={all.key} className="w-full items-center gap-10">
        {/* Figma Tab set (2003:2319): a 33px list, 4px padding and gap, 25px tabs with 10px sides. Too wide
            for a phone, so it swipes sideways there with the scrollbar hidden; overflow-y-hidden because
            overflow-x-auto alone makes the y axis scroll too, and a 1px overflow showed a bar. */}
        <TabsList className="h-auto max-w-full justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-[10px] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="h-[25px] shrink-0 cursor-pointer px-2.5 py-1 font-mono text-sm font-normal">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="w-full">
            <ul className="mx-auto grid w-full gap-4 md:grid-cols-2 lg:w-auto lg:grid-cols-[repeat(3,347px)] lg:justify-center lg:gap-6">
              {cards
                .filter((card) => tab.key === all.key || card.category === tab.key)
                .map((card) => (
                  <li key={card.name}>
                    <a
                      href={href}
                      className="flex h-full flex-col gap-4 rounded-xl border bg-card py-6 transition-colors hover:border-foreground/20 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      <span className="flex items-center justify-between px-6">
                        <span className="logo-tile flex rounded-[14px] border border-(--card-media-border) p-1">
                          <img src={logos[card.name]} alt="" width={48} height={48} className="size-12" />
                        </span>
                        <span className="flex items-center gap-2">
                          <Badge variant="outline">{card.badge}</Badge>
                          <ChevronRight className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      </span>
                      <span className="flex flex-col gap-1.5 px-6">
                        <span className="text-lg leading-7 text-card-foreground">{card.name}</span>
                        <span className="text-sm leading-5 text-muted-foreground">{card.description}</span>
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
