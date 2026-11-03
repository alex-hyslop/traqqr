import type {
  ComparisonTableProps,
  CtaAction,
  CtaProps,
  HowItWorksProps,
  TestimonialProps,
  TextMediaProps,
} from '@klicktipp/traqqr-components';
import type { FaqProps } from '@/components/sections/Faq';
import type { FeatureCardsProps } from '@/components/sections/FeatureCards';
import type { HeroCopy } from '@/components/sections/Hero';
import type { IntegrationsStripProps } from '@/components/sections/IntegrationsStrip';
import type { StatsProps } from '@/components/sections/Stats';
import type { SceneCopy } from '@/components/sections/SunbeamScene';
import type { TrustStripProps } from '@/components/sections/TrustStrip';

/** One step of the long-funnel band: "01 ■ AD-KLICK", a big word and one line. */
export interface FunnelStep {
  number: string;
  label: string;
  title: string;
  /** A "\n" is Figma's manual line break, kept from lg up. */
  body: string;
}

export interface FunnelProps {
  id: string;
  badge?: string;
  title: string;
  lead?: string;
  /** In order; the last is the purchase, the band's one amber step. */
  steps: FunnelStep[];
  action: CtaAction;
}

// The sections a page is built from, in the order the page lists them. Each kind maps to a component
// in src/components/page/sections; the props are the section's copy, from the page's content file.
export type Section =
  | { kind: 'hero'; props: HeroCopy }
  | { kind: 'trust'; props: TrustStripProps }
  | { kind: 'stats'; props: StatsProps }
  | { kind: 'cards'; props: FeatureCardsProps }
  | { kind: 'funnel'; props: FunnelProps }
  | { kind: 'integrations'; props: Omit<IntegrationsStripProps, 'integrations'> }
  | { kind: 'comparison'; props: ComparisonTableProps }
  | { kind: 'scene'; props: SceneCopy }
  | { kind: 'textMedia'; props: TextMediaProps }
  | { kind: 'howItWorks'; props: HowItWorksProps }
  | { kind: 'testimonial'; props: Omit<TestimonialProps, 'photo' | 'avatar'> }
  | { kind: 'faq'; props: Omit<FaqProps, 'defaultOpen'> }
  | { kind: 'cta'; props: CtaProps }
  | { kind: 'globe'; props: { label: string } };

export type SectionKind = Section['kind'];
