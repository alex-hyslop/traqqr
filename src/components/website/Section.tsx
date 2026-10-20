import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const widths = {
  /** The 1152px content column (1200 minus px-6). */
  content: 'max-w-[1200px] px-6',
  /** FAQ: a 680px column. */
  narrow: 'max-w-[728px] px-6',
  /** Inside a HUD frame: 1152px content with the frame's 36/48px insets. */
  hud: 'max-w-[1248px] px-9 md:px-12',
} as const;

export interface SectionProps {
  id?: string;
  /** id of the section's heading, for aria-labelledby. */
  labelledBy?: string;
  width?: keyof typeof widths;
  /** Background / Grid (Figma 4779:5838). */
  grid?: boolean;
  border?: 'top' | 'y';
  /** The tinted bg-card band (How it works). */
  band?: boolean;
  /** Standard section spacing: py-14 on mobile, py-20 from lg (handover §3, §3b). */
  padded?: boolean;
  /** Decoration positioned against the whole section rather than the content column (HUD frame). */
  backdrop?: ReactNode;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

// The section shell every homepage block shares: full-bleed background, centred content column.
export function Section({
  id,
  labelledBy,
  width = 'content',
  grid = false,
  border,
  band = false,
  padded = true,
  backdrop,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative scroll-mt-24',
        grid && 'grid-bg',
        border === 'top' && 'border-t',
        border === 'y' && 'border-y',
        band && 'bg-card',
        className
      )}
    >
      {backdrop}
      <div className={cn('relative mx-auto w-full', widths[width], padded && 'py-14 lg:py-20', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
