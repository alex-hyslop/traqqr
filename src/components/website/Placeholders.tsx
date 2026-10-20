import { buttonVariants } from '@klicktipp/traqqr-components/utils';
import { Image, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VideoPoster {
  src: string;
  srcSet?: string;
  sizes?: string;
}

// Video embed (Figma 4254:25767): 16:9 poster with a round play button. Kev (20 Oct): poster + play
// button until the demo video exists. The play button is white (bg-foreground, dark icon) and fully
// round, an accepted exception for video play only. Without a poster it shows the muted placeholder.
export function VideoPlaceholder({
  label = 'Play the 2-minute demo',
  poster,
  className,
}: {
  label?: string;
  poster?: VideoPoster;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-landing-placeholder shadow-lg',
        className
      )}
    >
      {poster && (
        <img
          src={poster.src}
          srcSet={poster.srcSet}
          sizes={poster.sizes}
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <button
        type="button"
        aria-label={label}
        className={cn(
          buttonVariants({ variant: 'primary', size: 'icon-lg' }),
          'relative rounded-full bg-foreground text-primary-foreground drop-shadow-[0_25px_25px_rgb(0_0_0/0.25)]'
        )}
      >
        <Play strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}

// Image slot placeholder (Text + media, Media=Image) until the product screenshot exists.
export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('flex items-center justify-center rounded-xl bg-landing-placeholder', className)}
    >
      <Image className="size-12 text-foreground" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
    </div>
  );
}
