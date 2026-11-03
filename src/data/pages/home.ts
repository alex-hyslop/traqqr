import type { Section, SectionKind } from '@/data/sections';
import type { Locale } from '@/i18n';
import { homeDe } from './home.de';
import { homeEn } from './home.en';

export interface HomePage {
  title: string;
  description: string;
  features: string[];
  sections: Section[];
}

export const homePages: Record<Locale, HomePage> = { de: homeDe, en: homeEn };

/** One section's props from a homepage, for Storybook stories that show it with the real copy. */
export function homeSection<K extends SectionKind>(locale: Locale, kind: K) {
  type Props = Extract<Section, { kind: K }>['props'];
  const section = homePages[locale].sections.find((s) => s.kind === kind);
  if (!section) throw new Error(`The ${locale} homepage has no ${kind} section.`);
  // TypeScript can't narrow the union by a generic kind, so the props are cast to that kind's.
  return section.props as Props;
}
