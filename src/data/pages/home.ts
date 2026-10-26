import { integrations } from '@/data/integrations';

// Homepage copy. The page composes itself from `sections`; this module is the one owner for the page's
// title, description and the claims its structured data repeats. A section component keeps the default
// copy for its own Storybook story; the page overrides it here when the page needs different words.
export interface HomePage {
  title: string;
  description: string;
  /** Claims in the SoftwareApplication structured data. */
  features: string[];
}

export const homePage: HomePage = {
  title: 'Traqqr · Server-side tracking for Meta Ads',
  description:
    'Real-time tracking, attribution and insights for Meta Ads. Traqqr sends every visit, lead and sale to Meta from your server as well as the browser.',
  features: [
    'Server-side tracking for Meta Ads',
    'Live Feed of every event',
    'Browser and server event deduplication',
    'First-party reverse proxy on your own subdomain',
    'Event Inspector',
    `Integrations: ${integrations.map((i) => i.name).join(', ')}`,
  ],
};
