import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@klicktipp/traqqr-components';
import type { Integration } from '@/data/integrations';
import { cn } from '@/lib/utils';

// Logo tile (Figma 5058:1680): 58px, radius 14, tile border and the card-media gradient, wrapped in a
// Tooltip with the integration's name. Needs a TooltipProvider above it (LogoTiles provides one).
export function LogoTile({ integration }: { integration: Pick<Integration, 'name' | 'logo'> }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          role="img"
          aria-label={integration.name}
          className="logo-tile flex size-[58px] items-center justify-center rounded-xl border border-(--card-media-border) p-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <img src={integration.logo} alt="" width={48} height={48} className="size-12" />
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={4}>
        {integration.name}
      </TooltipContent>
    </Tooltip>
  );
}

// A wrapping row of logo tiles sharing one TooltipProvider.
export function LogoTiles({ integrations, className }: { integrations: Integration[]; className?: string }) {
  return (
    <TooltipProvider>
      <ul className={cn('flex flex-wrap items-center gap-3 md:gap-4', className)}>
        {integrations.map((integration) => (
          <li key={integration.name}>
            <LogoTile integration={integration} />
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
