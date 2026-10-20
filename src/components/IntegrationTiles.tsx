import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@klicktipp/traqqr-components';

export interface Integration {
  name: string;
  logo: string;
}

// Logo tiles for the integrations strip (Figma: Logo tile 5058:1680). One island, so the
// TooltipProvider and every Tooltip share the same React tree.
export function IntegrationTiles({ integrations }: { integrations: Integration[] }) {
  return (
    <TooltipProvider>
      <ul className="flex flex-wrap items-center gap-3 md:gap-4 lg:py-2.5">
        {integrations.map((integration) => (
          <li key={integration.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  tabIndex={0}
                  aria-label={integration.name}
                  className="logo-tile flex size-[58px] items-center justify-center rounded-xl border border-(--card-media-border) p-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <img src={integration.logo} alt={integration.name} width={48} height={48} className="size-12" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                {integration.name}
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
