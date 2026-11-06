// The site's one source for plan prices (pricing page, Kev's 5 Nov handover). Traqqr bills per website by
// events a month. The plan list is the backend's PRICING_TIERS (traqqr-backend src/clients/billing.ts) with
// the prices of its Stripe price catalogue (scripts/stripe/create-site-price-catalog.mjs, uiPriceCents),
// which the dashboard uses too. There's no public endpoint the site could read at build time, so they're
// copied here: change them here only, and only when the backend changes. Checked against the backend and
// docs/pricing/traqqr-site-pricing-v1.md on 5 Nov 2026 (all 17 the same as Kev's list).

export interface PriceTier {
  events: number;
  /** Price per website a month, in euro cents. */
  priceCents: number;
}

export const priceTiers: PriceTier[] = [
  { events: 5_000, priceCents: 4_900 },
  { events: 10_000, priceCents: 9_900 },
  { events: 20_000, priceCents: 17_900 },
  { events: 30_000, priceCents: 26_900 },
  { events: 40_000, priceCents: 34_900 },
  { events: 50_000, priceCents: 41_900 },
  { events: 75_000, priceCents: 61_900 },
  { events: 100_000, priceCents: 79_900 },
  { events: 125_000, priceCents: 90_900 },
  { events: 150_000, priceCents: 109_900 },
  { events: 200_000, priceCents: 119_900 },
  { events: 250_000, priceCents: 139_900 },
  { events: 300_000, priceCents: 159_900 },
  { events: 400_000, priceCents: 179_900 },
  { events: 500_000, priceCents: 209_900 },
  { events: 750_000, priceCents: 259_900 },
  { events: 1_000_000, priceCents: 299_900 },
];

export const currency = 'EUR';

/** The trial length, as the backend's TRIAL_DURATION_MS (14 days, confirmed 5 Nov). */
export const trialDays = 14;
