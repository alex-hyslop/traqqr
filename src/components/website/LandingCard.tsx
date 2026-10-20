import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { Chamfered } from './Chamfered';

export interface LandingCardProps {
  eyebrow: string;
  title: string;
  body: string;
  /** 'glass' over the hero glow, 'solid' on the bg-card band. */
  fill?: 'glass' | 'solid';
  as?: ElementType;
  titleAs?: 'h2' | 'h3';
  className?: string;
}

// Card / Landing, Shape=Chamfered (Figma 4738:4304): mono eyebrow, Manrope 18 title, muted 14 body.
// Not clickable: no link, no chevron (handover §6).
export function LandingCard({
  eyebrow,
  title,
  body,
  fill = 'glass',
  as = 'li',
  titleAs: Title = 'h3',
  className,
}: LandingCardProps) {
  return (
    <Chamfered as={as} fill={fill} className={cn('flex flex-col gap-2 p-6', className)}>
      <p className="pb-2 font-mono text-xs leading-4 text-muted-foreground">{eyebrow}</p>
      <Title className="text-lg leading-7 font-normal text-card-foreground">{title}</Title>
      <p className="text-sm leading-5 text-muted-foreground">{body}</p>
    </Chamfered>
  );
}
