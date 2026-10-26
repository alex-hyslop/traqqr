import type { CtaAction } from '@klicktipp/traqqr-components';
import { demoHref, signupHref } from '@/data/links';

// Content shared by every page, next to the per-page content in data/pages/. Pages, the nav and
// llms.txt take whole CTA actions from here so labels aren't retyped; the URLs stay in links.ts.
// Named siteContent, not site, so it doesn't shadow Astro's `site` URL.
export interface SiteContent {
  cta: {
    trial: CtaAction;
    demo: CtaAction;
  };
}

export const siteContent = {
  cta: {
    trial: { label: 'Start free trial', href: signupHref },
    demo: { label: 'Watch demo', href: demoHref },
  },
} as const satisfies SiteContent;
