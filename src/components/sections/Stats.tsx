import { Section } from '@klicktipp/traqqr-components';

export interface Stat {
  value: string;
  label: string;
}

export interface StatsProps {
  id?: string;
  title: string;
  items: Stat[];
}

// Stats (Figma: Homepage v2 §2, 5217:639 DE / 5217:1392 EN): a centred Manrope ExtraLight headline over
// a row of 282px stats, each with a top border, a 64px figure and a mono label. Facts, not performance
// numbers, so they don't count up. 2 × 2 below md (Kev's mobile rules, 3 Nov).
export function Stats({ id = 'stats', title, items }: StatsProps) {
  return (
    <Section
      id={id}
      labelledBy={`${id}-heading`}
      padded={false}
      containerClassName="flex flex-col items-center gap-10 py-14 text-center lg:gap-16 lg:py-24"
    >
      <h2 id={`${id}-heading`} className="max-w-225 text-3xl leading-9 font-extralight text-foreground lg:text-4xl lg:leading-10">
        {title}
      </h2>
      <dl className="grid w-full grid-cols-2 gap-x-6 md:flex md:w-auto md:justify-center">
        {items.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 border-t py-8 md:w-[282px]">
            <dd className="text-5xl leading-none font-extralight text-foreground md:text-[64px] md:leading-[72px]">{stat.value}</dd>
            <dt className="max-w-[250px] font-mono text-sm leading-5 text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
