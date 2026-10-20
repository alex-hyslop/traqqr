import { Badge } from '@klicktipp/traqqr-components';
import { cn } from '@/lib/utils';
import { DesktopLines } from './DesktopLines';

export interface SectionHeadingProps {
  /** Optional eyebrow badge (Badge outline). */
  badge?: string;
  /** Hide the badge's border (Testimonials). */
  badgeBorderless?: boolean;
  /** Pass lines to keep Figma's manual desktop line breaks. */
  title: string | string[];
  lead?: string;
  align?: 'center' | 'left';
  /** id for the heading, so the section can be aria-labelledby it. */
  id?: string;
  className?: string;
}

// Section heading (Figma 5058:2057): optional badge, Manrope Light headline (text-3xl, lg:text-4xl)
// and a muted lead. Centred blocks cap at 680px.
export function SectionHeading({
  badge,
  badgeBorderless = false,
  title,
  lead,
  align = 'center',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'max-w-[680px] items-center text-center' : 'items-start',
        className
      )}
    >
      {badge && (
        <Badge variant="outline" className={cn(badgeBorderless && 'border-transparent')}>
          {badge}
        </Badge>
      )}
      <h2 id={id} className="text-3xl leading-9 font-light text-foreground lg:text-4xl lg:leading-10">
        <DesktopLines lines={title} />
      </h2>
      {lead && <p className="text-base leading-6 text-muted-foreground">{lead}</p>}
    </div>
  );
}
