// The site's one source for plan prices (pricing page, Kev's 5 Nov handover). Traqqr bills per website by
// events a month. The real plan list is the backend's PRICING_TIERS (traqqr-backend src/clients/billing.ts)
// and its Stripe price catalogue (scripts/stripe/create-site-price-catalog.mjs, uiPriceCents). The
// dashboard gets them from there; there's no public endpoint the site could read at build time, so they're
// copied here. Change prices here only, and only once they're confirmed for the website.
//
// Confirmed for the website: 5.000 events = 49 € a month per site. The other tiers show "Preis folgt" until
// they're confirmed (priceCents: null). The events list is Kev's design; 25.000 isn't a backend tier
// (it has 20.000 and 30.000), which is an open question for Kev.

export interface PriceTier {
  events: number;
  /** Price per website a month, in euro cents. null until confirmed for the website. */
  priceCents: number | null;
}

export const priceTiers: PriceTier[] = [
  { events: 5_000, priceCents: 4_900 },
  { events: 10_000, priceCents: null },
  { events: 25_000, priceCents: null },
  { events: 50_000, priceCents: null },
  { events: 100_000, priceCents: null },
];

/** The websites select: 1–4, then "5+" (priced as 5). */
export const siteCounts = [1, 2, 3, 4, 5] as const;

export const currency = 'EUR';

/** The trial length, as the backend's TRIAL_DURATION_MS (14 days). */
export const trialDays = 14;
