import { Check } from 'lucide-react';
import { CtaButtons } from '@/components/website/CtaButtons';
import { ImagePlaceholder } from '@/components/website/Placeholders';
import { Section } from '@/components/website/Section';
import { SectionHeading } from '@/components/website/SectionHeading';
import { cn } from '@/lib/utils';

export interface TextMediaProps {
  id?: string;
  badge: string;
  /** Pass lines to keep Figma's manual desktop line break. */
  title: string | string[];
  body: string;
  items: string[];
  mediaSide?: 'left' | 'right';
  grid?: boolean;
  borderTop?: boolean;
  /** Secondary outline button next to "Start free trial"; null hides it. */
  secondary?: { label: string; href?: string } | null;
}

// Text + media row (Figma: Block / Text + media 4689:40304, composite 4282:26715). Desktop: text
// (flex-1) and a 450px media column, mirrored with mediaSide="left". Below lg it stacks: text first,
// then the media at 240px high, whichever side it's on at desktop (handover §3b).
export function TextMedia({
  id,
  badge,
  title,
  body,
  items,
  mediaSide = 'right',
  grid = false,
  borderTop = false,
  secondary = { label: 'Watch demo' },
}: TextMediaProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <Section
      id={id}
      labelledBy={headingId}
      grid={grid}
      border={borderTop ? 'top' : undefined}
      className="overflow-hidden"
      containerClassName={cn(
        'flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12',
        mediaSide === 'left' && 'lg:flex-row-reverse'
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <SectionHeading id={headingId} align="left" badge={badge} title={title} lead={body} />

        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 py-2 text-sm leading-5 text-card-foreground">
              <Check className="size-3.5 shrink-0" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <CtaButtons secondary={secondary} />
      </div>

      {/* Product screenshot slot; placeholder until the real image exists */}
      <ImagePlaceholder
        label={`${badge} screenshot coming soon`}
        className="h-60 lg:h-auto lg:w-[450px] lg:shrink-0 lg:self-stretch"
      />
    </Section>
  );
}
