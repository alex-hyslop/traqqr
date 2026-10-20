import { integrations as allIntegrations, type Integration } from '@/data/integrations';
import { LogoTiles } from '@/components/website/LogoTiles';
import { Section } from '@/components/website/Section';

export interface IntegrationsStripProps {
  title?: string;
  lead?: string;
  integrations?: Integration[];
}

// Integrations strip (Figma: Block / Integrations strip 5058:1639; mobile 5063:15579). Heading on the
// left and logo tiles with tooltips; on mobile the heading sits on top and the tiles wrap.
// Needs hydrating (client:visible) for the tooltips.
export function IntegrationsStrip({
  title = 'Integrations',
  lead = 'Works with the tools you already use.',
  integrations = allIntegrations,
}: IntegrationsStripProps) {
  return (
    <Section
      id="integrations"
      labelledBy="integrations-heading"
      padded={false}
      containerClassName="flex flex-col gap-5 pt-12 pb-6 md:pb-12 lg:flex-row lg:items-center lg:gap-10 xl:gap-15"
    >
      <div className="flex shrink-0 flex-col gap-1.5">
        <h2 id="integrations-heading" className="text-2xl leading-8 font-light text-foreground">
          {title}
        </h2>
        <p className="text-base leading-6 text-muted-foreground">{lead}</p>
      </div>
      <LogoTiles integrations={integrations} className="lg:py-2.5" />
    </Section>
  );
}
