import { buttonVariants } from '@klicktipp/traqqr-components/utils';
import { Image, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// Video embed placeholder (Figma 4254:25767): 16:9 poster area with a round play button.
// Kev (20 Oct): keep the poster + play button until the demo video exists.
export function VideoPlaceholder({ label = 'Play the 2-minute demo', className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-landing-placeholder shadow-lg',
        className
      )}
    >
      <button type="button" aria-label={label} className={cn(buttonVariants({ variant: 'primary', size: 'icon-lg' }), 'rounded-full')}>
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
