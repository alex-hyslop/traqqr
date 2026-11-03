import type {
  ComparisonTableProps,
  CtaProps,
  HowItWorksProps,
  TestimonialProps,
  TextMediaProps,
} from '@klicktipp/traqqr-components';
import type { FaqProps } from '@/components/sections/Faq';
import type { HeroCopy } from '@/components/sections/Hero';

export type Section =
  | { kind: 'hero'; props: HeroCopy }
  | { kind: 'integrations' }
  | { kind: 'problem'; props: ComparisonTableProps }
  | { kind: 'scene' }
  | { kind: 'liveFeed' | 'reverseProxy'; props: TextMediaProps }
  | { kind: 'howItWorks'; props: HowItWorksProps }
  | { kind: 'testimonial'; props: Omit<TestimonialProps, 'photo' | 'avatar'> }
  | { kind: 'faq'; props: Omit<FaqProps, 'defaultOpen'> }
  | { kind: 'cta'; props: CtaProps }
  | { kind: 'globe' };

export type SectionKind = Section['kind'];
