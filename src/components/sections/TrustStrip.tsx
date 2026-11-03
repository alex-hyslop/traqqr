import { Fragment } from 'react';
import { ShieldCheck } from 'lucide-react';

export interface TrustStripProps {
  items: string[];
}

// Trust strip (Figma: Homepage v2 §1b, 5217:624 DE / 5217:1380 EN): a shield-check and a mono
// uppercase label per item, "·" between them, 40px under the hero. Below md it wraps, centred, without
// the separators (Kev's mobile rules, 3 Nov).
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <ul className="mx-auto flex max-w-300 flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 pt-10 font-mono text-xs leading-4 text-muted-foreground">
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
