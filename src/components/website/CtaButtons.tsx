import { buttonVariants } from '@klicktipp/traqqr-components/utils';
import { ArrowRight, Play } from 'lucide-react';
import { signupHref } from '@/data/links';
import { cn } from '@/lib/utils';

export interface CtaButtonsProps {
  /** Primary amber button; "Start free trial" to the app login by default. */
  primaryLabel?: string;
  primaryHref?: string;
  /** Arrow after the primary label (hero, Text + media; not the CTA card). */
  arrow?: boolean;
  /** Secondary outline button, or null for none. */
  secondary?: { label: string; href?: string; play?: boolean } | null;
  /** Stack full width below md (handover §3b) instead of staying side by side (CTA card). */
  stackOnMobile?: boolean;
  className?: string;
}

// The "Start free trial" + "Watch demo" pair (Button lg default + outline).
export function CtaButtons({
  primaryLabel = 'Start free trial',
  primaryHref = signupHref,
  arrow = true,
  secondary = { label: 'Watch demo' },
  stackOnMobile = true,
  className,
}: CtaButtonsProps) {
  const width = stackOnMobile && 'w-full md:w-auto';
  return (
    <div
      className={cn(stackOnMobile ? 'flex flex-col gap-3 md:flex-row' : 'flex flex-wrap justify-center gap-3', className)}
    >
      <a href={primaryHref} className={cn(buttonVariants({ size: 'lg' }), width)}>
        {primaryLabel}
        {arrow && <ArrowRight strokeWidth={1.5} aria-hidden="true" />}
      </a>
      {secondary && (
        <a href={secondary.href ?? '#'} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), width)}>
          {secondary.play && <Play strokeWidth={1.5} aria-hidden="true" />}
          {secondary.label}
        </a>
      )}
    </div>
  );
}
