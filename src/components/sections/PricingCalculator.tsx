import { useId, useState } from 'react';
import { Slider } from 'radix-ui';
import { Badge } from '@klicktipp/traqqr-components';
import { buttonVariants, cn } from '@klicktipp/traqqr-components/utils';
import { currency, priceTiers } from '@/data/pricing';
import type { Locale } from '@/i18n';

export interface PricingCalculatorCopy {
  badge: string;
  title: string;
  lead: string;
  eventsLabel: string;
  hint: string;
  priceLabel: string;
  perMonth: string;
  action: string;
}

interface PricingCalculatorProps {
  locale: Locale;
  copy: PricingCalculatorCopy;
  /** Signup; the picked tier is added as ?events=…. */
  signupHref: string;
}

const intlLocale: Record<Locale, string> = { de: 'de-DE', en: 'en-GB' };
const last = priceTiers.length - 1;

// Pricing calculator (Figma: /preise/ 5307:231, states board 5307:1089; Kev, 6 Nov). One Radix Slider over
// the 17 tiers in src/data/pricing.ts: it moves by tier index, since the tiers aren't evenly spaced, and the
// price is that tier's (one website). Screen readers get the tier and the price as the slider's value text,
// so nothing else is announced as it moves. Needs hydrating (client:visible).
export function PricingCalculator({ locale, copy, signupHref }: PricingCalculatorProps) {
  const [step, setStep] = useState(0);
  const id = useId();

  const count = new Intl.NumberFormat(intlLocale[locale]);
  const money = new Intl.NumberFormat(intlLocale[locale], { style: 'currency', currency, maximumFractionDigits: 0 });
  const tier = priceTiers[step];
  const events = `${count.format(tier.events)} ${locale === 'de' ? 'Events' : 'events'}`;
  const price = money.format(tier.priceCents / 100);
  const href = `${signupHref}?${new URLSearchParams({ events: String(tier.events) })}`;

  return (
    <div className="flex h-full flex-col gap-6">
      <Badge variant="outline" className="self-start">
        {copy.badge}
      </Badge>
      <h2 className="text-3xl leading-10 font-light text-foreground lg:text-[32px]">{copy.title}</h2>
      <p className="text-base leading-6 text-muted-foreground">{copy.lead}</p>

      <div className="flex flex-col">
        <div className="flex items-baseline justify-between gap-4 text-sm leading-5 text-foreground">
          <span id={`${id}-events`}>{copy.eventsLabel}</span>
          <span className="tabular-nums">{events}</span>
        </div>
        {/* 44px tall on touch screens so the thumb is easy to hit; 16px from lg, as in Figma. */}
        <Slider.Root
          value={[step]}
          onValueChange={([v]) => setStep(v)}
          min={0}
          max={last}
          step={1}
          className="relative mt-1 flex h-11 w-full touch-none items-center select-none lg:mt-3 lg:h-4"
        >
          <Slider.Track className="relative h-1 grow overflow-hidden rounded-full bg-muted">
            <Slider.Range className="absolute h-full bg-primary" />
          </Slider.Track>
          <Slider.Thumb
            aria-labelledby={`${id}-events`}
            aria-valuetext={`${events}, ${price} ${copy.perMonth}`}
            className="block size-3 rounded-full bg-foreground shadow-sm transition-shadow outline-none hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/50"
          />
        </Slider.Root>
        <div className="mt-1 flex justify-between font-mono text-xs leading-[18px] text-muted-foreground tabular-nums lg:mt-3" aria-hidden="true">
          <span>{count.format(priceTiers[0].events)}</span>
          <span>{count.format(priceTiers[last].events)}</span>
        </div>
      </div>

      <p className="text-[13px] leading-[18px] text-muted-foreground">{copy.hint}</p>
      <hr className="border-white/10" />

      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-xs leading-4 tracking-[0.06em] text-muted-foreground uppercase">{copy.priceLabel}</p>
        <p className="flex items-baseline gap-2.5 whitespace-nowrap">
          <span className="text-[64px] leading-[72px] font-extralight text-foreground">{price}</span>
          <span className="text-base leading-6 text-muted-foreground">{copy.perMonth}</span>
        </p>
      </div>

      <div className="mt-auto flex justify-end pt-6">
        <a href={href} className={cn(buttonVariants({ size: 'lg' }))}>
          {copy.action}
        </a>
      </div>
    </div>
  );
}
