import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { SectionKind } from '@/data/sections';
import HeroSection from './HeroSection.astro';
import IntegrationsSection from './IntegrationsSection.astro';
import ProblemSection from './ProblemSection.astro';
import SceneSection from './SceneSection.astro';
import TextMediaSection from './TextMediaSection.astro';
import HowItWorksSection from './HowItWorksSection.astro';
import TestimonialSection from './TestimonialSection.astro';
import FaqSection from './FaqSection.astro';
import CtaSection from './CtaSection.astro';
import GlobeSection from './GlobeSection.astro';

export const sectionComponents: Record<SectionKind, AstroComponentFactory> = {
  hero: HeroSection,
  integrations: IntegrationsSection,
  problem: ProblemSection,
  scene: SceneSection,
  liveFeed: TextMediaSection,
  reverseProxy: TextMediaSection,
  howItWorks: HowItWorksSection,
  testimonial: TestimonialSection,
  faq: FaqSection,
  cta: CtaSection,
  globe: GlobeSection,
};
