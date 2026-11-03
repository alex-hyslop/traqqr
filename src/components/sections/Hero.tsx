import { Chamfered, CtaButtons, DesktopLines, LandingCard, VideoPlaceholder, type VideoPoster } from '@klicktipp/traqqr-components';
import { siteContent } from '@/data/site';
import { defaultLocale, type Locale } from '@/i18n';

export interface HeroFeature {
  eyebrow: string;
  title: string;
  body: string;
}

/** The hero's copy, from the page's content file. */
export interface HeroCopy {
  /** Pass an array of lines to keep Figma's manual desktop line breaks. */
  title: string | string[];
  lead: string;
  features: HeroFeature[];
  /** The demo button's label, which adds the video length to the shared "Watch demo". */
  demoLabel: string;
  /** Accessible name of the video placeholder. */
  videoLabel: string;
}

export interface HeroProps extends HeroCopy {
  locale?: Locale;
  /** Thumbnail for the demo video (Kev's "A Tracking Revolution" placeholder, 20 Oct). */
  poster?: VideoPoster;
}

// The poster's rendered width: 640px from xl; below that the HUD's padding (184px from lg, 72px under it).
export const heroPosterSizes =
  '(min-width: 1280px) 640px, (min-width: 1024px) calc(100vw - 184px), calc(100vw - 72px)';

// Hero (Figma: Block / Hero HUD 4780:882, glass option on the homepage 5004:62490; mobile 5063:15561).
// The HUD's built-in header is hidden in Figma; its 64px slot stays on desktop so the floating nav
// sits over it. On mobile the HUD starts 12px under the 56px top bar. Video: Kev, 20 Oct.
export function Hero({ locale = defaultLocale, title, lead, features, demoLabel, videoLabel, poster }: HeroProps) {
  const { trial, demo } = siteContent[locale].cta;
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-3 px-3 pt-[68px] lg:gap-[29px] lg:px-6 lg:pt-6 lg:pb-6">
        <Chamfered cut={32} radius={16} accent={220}>
          <div className="flex flex-col gap-6 px-6 pt-9 pb-9 lg:gap-14 lg:px-[68px] lg:pt-[164px] lg:pb-20 xl:flex-row xl:items-center">
            <div className="flex flex-col gap-6 lg:max-w-[560px] lg:gap-7 xl:w-[560px] xl:shrink">
              <h1 className="text-4xl leading-10 font-extralight text-foreground lg:text-5xl lg:leading-15">
                <DesktopLines lines={title} />
              </h1>
              <p className="text-base leading-6 text-muted-foreground lg:text-lg lg:leading-7">{lead}</p>
              <CtaButtons primary={trial} secondary={{ ...demo, label: demoLabel, play: true }} />
            </div>

            <div className="min-w-0 xl:flex-[1_1_45%]">
              <VideoPlaceholder label={videoLabel} href={demo.href} poster={poster} />
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
