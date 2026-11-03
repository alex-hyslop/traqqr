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
import type { MotionId } from '@/components/motion/MotionPiece.astro';

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

/** A motion piece from traqqr-motion.js, at its width in the Figma frame. */
export interface MotionSlot {
  id: MotionId;
  /** One sentence for screen readers: what the animation shows. */
  label: string;
  width?: number;
}

export interface PageHeroProps {
  layout: 'split' | 'centred';
  /** The dashboard Breadcrumb: the parent page, then this one. */
  breadcrumb: { parent: { label: string; href: string }; current: string };
  /** Pass an array of lines to keep Figma's manual desktop line breaks. */
  title: string | string[];
  lead: string;
  /** The outline button next to the shared trial CTA. */
  secondaryAction: CtaAction;
  motion?: MotionSlot;
}

export interface MotionSectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  motion: MotionSlot & { width: number };
}

export interface StepsProps {
  id: string;
  /** "card" (default): a bg-card band. "charcoal": the angled charcoal band. */
  band?: 'card' | 'charcoal';
  /** An integration's logo tile before the title, by name (charcoal band). */
  logo?: string;
  eyebrow?: string;
  title: string;
  steps: { number: string; title: string; body: string }[];
}

export interface FeatureTableProps {
  id: string;
  eyebrow: string;
  title: string;
  columns: { feature: string; standard: string; highlight: string };
  /** Whether each column has the feature. */
  rows: { label: string; standard: boolean; highlight: boolean }[];
  /** Screen-reader words for a check and a dash. */
  answers: { yes: string; no: string };
}

export interface AnswersProps {
  id: string;
  eyebrow: string;
  title: string;
  /** `placeholder`: not signed off yet (legal review, unconfirmed claims), shown in amber as in Figma. */
  items: { question: string; answer: string; placeholder?: boolean }[];
}

// The sections a page is built from, in the order the page lists them. Each kind maps to a component
// in src/components/page/sections; the props are the section's copy, from the page's content file.
export type Section =
  | { kind: 'hero'; props: HeroCopy }
  | { kind: 'pageHero'; props: PageHeroProps }
  | { kind: 'motion'; props: MotionSectionProps }
  | { kind: 'steps'; props: StepsProps }
  | { kind: 'answers'; props: AnswersProps }
  | { kind: 'featureTable'; props: FeatureTableProps }
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
