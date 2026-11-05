import { useId, useState } from 'react';
import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@klicktipp/traqqr-components';
import { buttonVariants, cn } from '@klicktipp/traqqr-components/utils';
import { ArrowRight } from 'lucide-react';
import { currency, priceTiers, siteCounts } from '@/data/pricing';
import type { Locale } from '@/i18n';

export interface PricingCalculatorCopy {
  badge: string;
  title: string;
  lead: string;
  eventsLabel: string;
  sitesLabel: string;
  hint: string;
  priceLabel: string;
  perMonth: string;
  action: string;
}

interface PricingCalculatorProps {
  locale: Locale;
  copy: PricingCalculatorCopy;
  /** Signup; the picked tier is added as ?events=…&sites=…. */
  signupHref: string;
}

const intlLocale: Record<Locale, string> = { de: 'de-DE', en: 'en-GB' };

// Pricing calculator (Figma: /preise/ 5307:231, states board 5307:1089). Two Radix Selects, events a month
// and websites; the price is the tier's price × websites, read from src/data/pricing.ts, and is announced
// as it changes. The copy says "Events"/"Websites" in each language. Needs hydrating (client:visible).
export function PricingCalculator({ locale, copy, signupHref }: PricingCalculatorProps) {
  const [events, setEvents] = useState(priceTiers[0].events);
  const [sites, setSites] = useState<number>(siteCounts[0]);
  const id = useId();

  const count = new Intl.NumberFormat(intlLocale[locale]);
  const money = new Intl.NumberFormat(intlLocale[locale], { style: 'currency', currency, maximumFractionDigits: 0 });
  const eventsText = (n: number) => (locale === 'de' ? `${count.format(n)} Events` : `${count.format(n)} events`);
  const sitesText = (n: number) => {
    const label = n === siteCounts.at(-1) ? `${n}+` : String(n);
    return locale === 'de' ? `${label} Website${n === 1 ? '' : 's'}` : `${label} website${n === 1 ? '' : 's'}`;
  };

  const tier = priceTiers.find((t) => t.events === events)!;
  const price = money.format((tier.priceCents * sites) / 100);
  const breakdown = locale === 'de' ? `${sitesText(sites)} × ${eventsText(events)} im Monat` : `${sitesText(sites)} × ${eventsText(events)} a month`;
  const href = `${signupHref}?${new URLSearchParams({ events: String(events), sites: String(sites) })}`;

  return (
    <div className="flex h-full flex-col gap-6">
      <Badge variant="outline" className="self-start font-mono uppercase">
        {copy.badge}
      </Badge>
      <h2 className="text-3xl leading-10 font-light text-foreground lg:text-[32px]">{copy.title}</h2>
      <p className="text-base leading-6 text-muted-foreground">{copy.lead}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label id={`${id}-events`} className="text-sm leading-5 text-foreground">
            {copy.eventsLabel}
          </label>
          <Select value={String(events)} onValueChange={(v) => setEvents(Number(v))}>
            <SelectTrigger aria-labelledby={`${id}-events`} className="w-full">
              {/* The trigger shows the tier only; the open list adds each tier's price (Figma states board). */}
              <SelectValue>{eventsText(events)}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-80">
              {priceTiers.map((t) => (
                <SelectItem key={t.events} value={String(t.events)}>
                  {eventsText(t.events)} · {money.format(t.priceCents / 100)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label id={`${id}-sites`} className="text-sm leading-5 text-foreground">
            {copy.sitesLabel}
          </label>
          <Select value={String(sites)} onValueChange={(v) => setSites(Number(v))}>
            <SelectTrigger aria-labelledby={`${id}-sites`} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {siteCounts.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {sitesText(n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-[13px] leading-[18px] text-muted-foreground">{copy.hint}</p>
      <hr className="border-white/10" />

      <div className="flex flex-col gap-1.5" aria-live="polite">
        <p className="font-mono text-xs leading-4 tracking-[0.06em] text-muted-foreground uppercase">{copy.priceLabel}</p>
        <p className="flex items-baseline gap-2.5 whitespace-nowrap">
          <span className="text-[64px] leading-[72px] font-extralight text-foreground">{price}</span>
          <span className="text-base leading-6 text-muted-foreground">{copy.perMonth}</span>
        </p>
        <p className="font-mono text-sm leading-5 text-muted-foreground">{breakdown}</p>
      </div>

      <div className="mt-auto flex justify-end pt-6">
        <a href={href} className={cn(buttonVariants({ size: 'lg' }))}>
          {copy.action}
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
