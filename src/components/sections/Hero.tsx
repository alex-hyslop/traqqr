import { Chamfered, CtaButtons, LandingCard, VideoPlaceholder, type VideoPoster } from '@klicktipp/traqqr-components';
import { demoHref, signupHref } from '@/data/links';

export interface HeroFeature {
  eyebrow: string;
  title: string;
  body: string;
}

export interface HeroProps {
  title?: string;
  lead?: string;
  features?: HeroFeature[];
  /** Thumbnail for the demo video (Kev's "A Tracking Revolution" placeholder, 20 Oct). */
  poster?: VideoPoster;
}

const defaultFeatures: HeroFeature[] = [
  { eyebrow: '01 / TRACK', title: 'Track every signal.', body: 'Every visit, lead and sale, captured server-side.' },
  { eyebrow: '02 / ATTRIBUTE', title: 'Turn data into lift.', body: 'Clean events Meta can actually use.' },
  { eyebrow: '03 / SIMPLIFY', title: 'Built for marketers.', body: 'Set up in minutes. No developer needed.' },
  { eyebrow: '04 / SCALE', title: 'A brighter pipeline.', body: 'More signal, less noise, better ROAS.' },
];

// Hero (Figma: Block / Hero HUD 4780:882, glass option on the homepage 5004:62490; mobile 5063:15561).
// The HUD's built-in header is hidden in Figma; its 64px slot stays on desktop so the floating nav
// sits over it. On mobile the HUD starts 12px under the 56px top bar. Copy and video: Kev, 20 Oct.
export function Hero({
  title = 'Real-time tracking & attribution for Meta Ads.',
  lead = 'Traqqr sends every visit, lead and sale to Meta from your server as well as the browser, so ad blockers and cookie banners stop costing you conversions.',
  features = defaultFeatures,
  poster,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-3 px-3 pt-[68px] lg:gap-[29px] lg:px-6 lg:pt-6 lg:pb-6">
        <Chamfered cut={32} radius={16} accent={220}>
          <div className="flex flex-col gap-6 px-6 pt-9 pb-9 lg:gap-14 lg:px-[68px] lg:pt-[164px] lg:pb-20 xl:flex-row xl:items-center">
            <div className="flex flex-col gap-6 lg:max-w-[560px] lg:gap-7 xl:w-[560px] xl:shrink">
              <h1 className="text-4xl leading-10 font-extralight text-foreground lg:text-5xl lg:leading-12">{title}</h1>
              <p className="text-base leading-6 text-muted-foreground lg:text-lg lg:leading-7">{lead}</p>
              <CtaButtons
                primary={{ label: 'Start free trial', href: signupHref }}
                secondary={{ label: 'Watch demo · 2 min', href: demoHref, play: true }}
              />
            </div>

            <div className="min-w-0 xl:flex-[1_1_45%]">
              <VideoPlaceholder label="Play the 2-minute demo" href={demoHref} poster={poster} />
            </div>
          </div>
        </Chamfered>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {features.map((feature) => (
            <LandingCard key={feature.eyebrow} {...feature} titleAs="h2" />
          ))}
        </ul>
      </div>
    </section>
  );
}
