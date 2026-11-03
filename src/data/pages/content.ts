import type { Section } from '@/data/sections';
import type { Locale, RouteKey } from '@/i18n';
import { liveFeed } from './live-feed';
import { eventInspector } from './event-inspector';
import { reverseProxy } from './reverse-proxy';

// The internal pages (Kev's 3 Nov handover §5), each in both languages. src/pages/[slug].astro and
// src/pages/en/[slug].astro build one page per entry, at its path in src/i18n.
export interface ContentPage {
  title: string;
  description: string;
  sections: Section[];
}

export const contentPages: Partial<Record<RouteKey, Record<Locale, ContentPage>>> = {
  liveFeed,
  reverseProxy,
  eventInspector,
};
