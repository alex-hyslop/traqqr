import { LandingCard } from '@/components/website/LandingCard';
import { Section } from '@/components/website/Section';
import { SectionHeading } from '@/components/website/SectionHeading';

export interface Step {
  eyebrow: string;
  title: string;
  body: string;
}

export interface HowItWorksProps {
  badge?: string;
  title?: string;
  lead?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    eyebrow: '01 / ADD YOUR SITE',
    title: 'Paste one snippet.',
    body: "Add the Traqqr snippet to your site's <head>. That's the only code you need.",
  },
  {
    eyebrow: '02 / CONNECT',
    title: 'Link Meta and your tools.',
    body: 'Connect your Meta pixel, then tools like KlickTipp, Digistore24 or EverWebinar.',
  },
  {
    eyebrow: '03 / WATCH',
    title: 'See every event arrive.',
    body: 'Live Feed shows what reached Meta, from the browser and from your server.',
  },
];

// How it works (Figma: Block / How it works 5058:1650, homepage 5058:63858; mobile 5063:15647).
// bg-card band with border-y, centred heading and plain (not clickable) solid chamfered cards.
export function HowItWorks({
  badge = 'How it works',
  title = 'Live in three steps.',
  lead = 'No tag manager, no developer. Most sites send their first server-side event within minutes.',
  steps = defaultSteps,
}: HowItWorksProps) {
  return (
    <Section
      id="how-it-works"
      labelledBy="how-it-works-heading"
      band
      border="y"
      containerClassName="flex flex-col items-center gap-7 lg:gap-12"
    >
      <SectionHeading id="how-it-works-heading" badge={badge} title={title} lead={lead} className="gap-4" />
      <ol className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 lg:gap-6">
        {steps.map((step) => (
          <LandingCard key={step.eyebrow} {...step} fill="solid" />
        ))}
      </ol>
    </Section>
  );
}
