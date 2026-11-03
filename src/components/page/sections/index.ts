import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { SectionKind } from '@/data/sections';
import HeroSection from './HeroSection.astro';
import PageHeroSection from './PageHeroSection.astro';
import MotionSection from './MotionSection.astro';
import StepsSection from './StepsSection.astro';
import AnswersSection from './AnswersSection.astro';
import FeatureTableSection from './FeatureTableSection.astro';
import StepsDropzoneSection from './StepsDropzoneSection.astro';
import StatementSection from './StatementSection.astro';
import BentoSection from './BentoSection.astro';
import IntegrationsGridSection from './IntegrationsGridSection.astro';
import TrustSection from './TrustSection.astro';
import StatsSection from './StatsSection.astro';
import CardsSection from './CardsSection.astro';
import FunnelSection from './FunnelSection.astro';
import IntegrationsSection from './IntegrationsSection.astro';
import ComparisonSection from './ComparisonSection.astro';
import SceneSection from './SceneSection.astro';
import TextMediaSection from './TextMediaSection.astro';
import HowItWorksSection from './HowItWorksSection.astro';
import TestimonialSection from './TestimonialSection.astro';
import FaqSection from './FaqSection.astro';
import CtaSection from './CtaSection.astro';
import GlobeSection from './GlobeSection.astro';

export const sectionComponents: Record<SectionKind, AstroComponentFactory> = {
  hero: HeroSection,
  pageHero: PageHeroSection,
  motion: MotionSection,
  steps: StepsSection,
  answers: AnswersSection,
  featureTable: FeatureTableSection,
  stepsDropzone: StepsDropzoneSection,
  statement: StatementSection,
  bento: BentoSection,
  integrationsGrid: IntegrationsGridSection,
  trust: TrustSection,
  stats: StatsSection,
  cards: CardsSection,
  funnel: FunnelSection,
  integrations: IntegrationsSection,
  comparison: ComparisonSection,
  scene: SceneSection,
  textMedia: TextMediaSection,
  howItWorks: HowItWorksSection,
  testimonial: TestimonialSection,
  faq: FaqSection,
  cta: CtaSection,
  globe: GlobeSection,
};
