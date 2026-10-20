import { Quote } from 'lucide-react';
import { DesktopLines } from '@/components/website/DesktopLines';
import { Section } from '@/components/website/Section';
import { SectionHeading } from '@/components/website/SectionHeading';

export interface TestimonialImage {
  src: string;
  srcSet?: string;
}

export interface TestimonialProps {
  badge?: string;
  title?: string;
  /** Pass lines to keep Figma's manual desktop line breaks. */
  quote: string | string[];
  name: string;
  role: string;
  /** 280×350 portrait for the Featured layout (desktop). */
  photo: TestimonialImage;
  /** 40px avatar for the Compact layout (below lg). */
  avatar: TestimonialImage;
}

// Testimonial (Figma: Block / Testimonials 4689:40315, homepage 5004:62530; mobile 5063:15657).
// Desktop is the Featured layout (photo + text-3xl quote), below lg the Compact one (text-lg quote +
// avatar). Images come in as URLs so Astro can optimise them (getImage) and Storybook can import them.
export function Testimonial({
  badge = 'Customers',
  title = 'Teams that track with Traqqr',
  quote,
  name,
  role,
  photo,
  avatar,
}: TestimonialProps) {
  return (
    <Section
      labelledBy="testimonial-heading"
      grid
      border="y"
      containerClassName="flex flex-col items-center gap-7 lg:gap-12"
    >
      <SectionHeading id="testimonial-heading" badge={badge} badgeBorderless title={title} className="lg:h-[84px]" />

      <figure className="flex w-full gap-8 rounded-xl border bg-card p-6">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          alt={name}
          width={280}
          height={350}
          loading="lazy"
          decoding="async"
          className="hidden h-[350px] w-[280px] shrink-0 rounded-lg object-cover lg:block"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
          <blockquote className="flex flex-col gap-4">
            <Quote className="hidden size-8 text-foreground lg:block" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
            <p className="text-lg leading-7 text-muted-foreground lg:text-3xl lg:leading-9 lg:font-light">
              <DesktopLines lines={quote} />
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <img
              src={avatar.src}
              srcSet={avatar.srcSet}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="size-10 shrink-0 rounded-full object-cover lg:hidden"
            />
            <div className="flex min-w-0 flex-col lg:gap-1">
              <span className="text-base leading-6 text-foreground">{name}</span>
              <span className="font-mono text-sm leading-5 text-muted-foreground">{role}</span>
            </div>
          </figcaption>
        </div>
      </figure>
    </Section>
  );
}
