import { Fragment } from 'react';
import { cn } from '@klicktipp/traqqr-components/utils';
import { ShieldCheck } from 'lucide-react';

export interface TrustStripProps {
  items: string[];
  /** Padding above and below in px. Without it: 40px above, none below (under the homepage hero). */
  paddingY?: number;
}

// Trust strip (Figma: Homepage v2 §1b, 5217:624 DE / 5217:1380 EN): a shield-check and a mono
// uppercase label per item, "·" between them, 40px under the hero. Below md it wraps, centred, without
// the separators (Kev's mobile rules, 3 Nov). The Lösungen pages pad it evenly (24 or 40px).
export function TrustStrip({ items, paddingY }: TrustStripProps) {
  return (
    <ul
      className={cn(
        'mx-auto flex max-w-300 flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 font-mono text-xs leading-4 text-muted-foreground',
        paddingY === undefined ? 'pt-10' : 'py-(--trust-py)'
      )}
      style={paddingY === undefined ? undefined : ({ '--trust-py': `${paddingY}px` } as React.CSSProperties)}
    >
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (
            <li aria-hidden="true" className="hidden md:block">
              ·
            </li>
          )}
          <li className="flex items-center gap-2 tracking-[0.04em] uppercase">
            <ShieldCheck className="size-4 shrink-0" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
            {item}
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
