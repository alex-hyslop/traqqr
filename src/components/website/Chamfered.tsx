import type { CSSProperties, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ChamferedProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Size of the 45° cut in px: 24 for cards, 32 for the hero HUD. */
  cut?: number;
  /** Radius of the two uncut corners in px: 12 for cards, 16 for the hero HUD. */
  radius?: number;
  /** Length of the straight part of the accent lines in px, or 0 for none. */
  accent?: number;
  /** 'glass' over glows (hero), 'solid' on flat bands (How it works), 'none' for the outline-only HUD frame. */
  fill?: 'glass' | 'solid' | 'none';
}

// The one chamfered shape for the site (Figma: Card / Landing chamfered, HUD / Frame): top-right and
// bottom-left cut at 45°, the other corners rounded. Styles live in global.css under .chamfer.
export function Chamfered({
  as: Tag = 'div',
  cut = 24,
  radius = 12,
  accent = 96,
  fill = 'glass',
  className,
  style,
  children,
  ...rest
}: ChamferedProps) {
  const vars = {
    '--chamfer-cut': `${cut}px`,
    '--chamfer-radius': `${radius}px`,
    '--chamfer-accent': `${accent}px`,
  } as CSSProperties;

  return (
    <Tag {...rest} className={cn('chamfer', className)} style={{ ...vars, ...style }} data-fill={fill}>
      <span className="chamfer-surface" aria-hidden="true" />
      <span className="chamfer-edge" data-corner="tr" aria-hidden="true" />
      <span className="chamfer-edge" data-corner="bl" aria-hidden="true" />
      {accent > 0 && (
        <>
          <span className="chamfer-accent" data-corner="tr" aria-hidden="true" />
          <span className="chamfer-accent" data-corner="bl" aria-hidden="true" />
        </>
      )}
      {children}
    </Tag>
  );
}
