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
import type { HeroCopy, HeroFeature } from '@/components/sections/Hero';
import type { IntegrationsGridProps } from '@/components/sections/IntegrationsGrid';
import type { IntegrationsStripProps } from '@/components/sections/IntegrationsStrip';
import type { StatsProps } from '@/components/sections/Stats';
import type { SceneCopy } from '@/components/sections/SunbeamScene';
import type { TrustStripProps } from '@/components/sections/TrustStrip';
import type { MotionId } from '@/components/motion/pieces';

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
  /** The outline button next to the shared trial CTA. Without it, the hero has no buttons. */
  secondaryAction?: CtaAction;
  motion?: MotionSlot;
  /** Split heroes: the explainer video (a placeholder until it exists) instead of a motion piece. */
  video?: { label: string; href: string };
  /** Centred heroes: chamfered glass cards under the copy (Figma /webinar-funnel-tracking/ §1). */
  cards?: HeroFeature[];
  /** Centred heroes: px between the copy and the piece (default 8, Event Inspector's stage has its own space). */
  motionGap?: number;
}

/** What a section shows below md in place of a desktop-only motion piece (Kev's mobile rules, 3 Nov). */
export type MotionFallback =
  | { kind: 'rail'; items: { label: string; title: string; body: string }[]; note?: string }
  | {
      kind: 'panels';
      panels: { icon: 'globe' | 'server'; title: string; badge: string; items: string[] }[];
      /** Between the panels: the dedupe badge and its line. */
      link: { badge: string; note: string };
    };

export interface MotionSectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  align?: 'center' | 'left';
  /** "lg": a 48/60 title instead of 36/40 (Figma /klicktipp-tracking/ §3). */
  titleSize?: 'md' | 'lg';
  /** On a bg-card band with border-y. */
  band?: boolean;
  /** Below md, for a piece that doesn't mount there. */
  fallback?: MotionFallback;
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

export interface StepsDropzoneProps {
  id: string;
  title: string;
  steps: { number: string; title: string; body: string }[];
  /** The app's upload panel, as an illustration. */
  dropzone: { title: string; hint: string; action: string };
}

export type BentoVisual =
  | { kind: 'tags'; items: { key: string; value: string }[] }
  | { kind: 'segments'; items: { name: string; count: string }[] }
  | { kind: 'chain'; steps: string[] }
  | { kind: 'purchase'; from: { label: string; value: string }; to: { label: string; value: string }; note: string };

export interface BentoProps {
  id: string;
  eyebrow: string;
  title: string;
  /** Four tiles: wide + narrow, then narrow + wide. */
  tiles: { eyebrow: string; title: string; body: string; visual: BentoVisual }[];
}

export interface StatementProps {
  id: string;
  title: string;
  facts: { label: string; value: string }[];
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
  | { kind: 'stepsDropzone'; props: StepsDropzoneProps }
  | { kind: 'statement'; props: StatementProps }
  | { kind: 'bento'; props: BentoProps }
  | { kind: 'integrationsGrid'; props: IntegrationsGridProps }
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
