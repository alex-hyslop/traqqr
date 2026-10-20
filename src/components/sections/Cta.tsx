import { CtaButtons } from '@/components/website/CtaButtons';
import { Section } from '@/components/website/Section';

export interface CtaProps {
  title?: string;
  lead?: string;
}

// CTA (Figma: Block / CTA 4689:40329, CTA card Background=App gradient 4784:369; mobile 5063:15673).
// The card reuses the dashboard's app background (.cta-glow in global.css). The buttons stay side by
// side on mobile because they fit (handover §3b).
export function Cta({
  title = 'Stop losing conversions you paid for.',
  lead = 'Set up Traqqr in minutes and send every visit, lead and sale to Meta.',
}: CtaProps) {
  return (
    <Section labelledBy="cta-heading" padded={false} containerClassName="px-4 py-6 md:px-6 lg:py-20">
      <div className="relative overflow-hidden rounded-xl border bg-card px-6 py-12 shadow-lg md:px-12 md:py-16">
        <div className="pointer-events-none absolute -inset-px overflow-hidden" aria-hidden="true">
          <div className="cta-glow absolute top-0 left-px h-[1294px] w-[1223px]" />
        </div>

        <div className="relative flex flex-col items-center gap-8 text-center">
          <div className="flex max-w-[720px] flex-col gap-4">
            <h2 id="cta-heading" className="text-3xl leading-9 font-light text-foreground lg:text-4xl lg:leading-10">
              {title}
            </h2>
            <p className="text-base leading-6 text-muted-foreground">{lead}</p>
          </div>
          <CtaButtons arrow={false} stackOnMobile={false} />
        </div>
      </div>
    </Section>
  );
}
