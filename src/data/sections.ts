import type {
  ComparisonTableProps,
  CtaProps,
  HowItWorksProps,
  TestimonialProps,
  TextMediaProps,
} from '@klicktipp/traqqr-components';

export type Section =
  | { kind: 'hero' }
  | { kind: 'integrations' }
  | { kind: 'problem'; props: ComparisonTableProps }
  | { kind: 'scene' }
  | { kind: 'liveFeed' | 'reverseProxy'; props: TextMediaProps }
  | { kind: 'howItWorks'; props: HowItWorksProps }
  | { kind: 'testimonial'; props: Omit<TestimonialProps, 'photo' | 'avatar'> }
  | { kind: 'faq' }
  | { kind: 'cta'; props: CtaProps }
  | { kind: 'globe' };

export type SectionKind = Section['kind'];
