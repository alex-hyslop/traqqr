import { LandingCard, Section, SectionHeading } from '@klicktipp/traqqr-components';
import type { HeroFeature } from '@/components/sections/Hero';

export interface FeatureCardsProps {
  id: string;
  badge?: string;
  title: string;
  lead?: string;
  cards: HeroFeature[];
}

// A centred heading over a row of chamfered glass cards (Figma: Homepage v2 §3 Problem, 5217:654 DE /
// 5217:1407 EN): 48px over the heading, 56px to the cards, 120px under them. Two columns below lg, one
// below md.
export function FeatureCards({ id, badge, title, lead, cards }: FeatureCardsProps) {
  return (
    <Section
      id={id}
      labelledBy={`${id}-heading`}
      padded={false}
      containerClassName="flex flex-col items-center gap-10 pt-12 pb-14 lg:gap-14 lg:pb-30"
    >
      {/* Figma's Section heading (5058:2057) is gap 16; the library's is gap-3. */}
      <SectionHeading id={`${id}-heading`} badge={badge} title={title} lead={lead} className="gap-4" />
      {/* Four 282px cards, 24px apart: a 1200px row, a little wider than the content column (Figma). */}
      <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:w-auto lg:grid-cols-[repeat(4,282px)] lg:gap-6">
        {cards.map((card) => (
          <LandingCard key={card.eyebrow} {...card} fill="glass" />
        ))}
      </ul>
    </Section>
  );
}
