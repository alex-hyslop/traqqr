import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@klicktipp/traqqr-components';
import { Chamfered } from '@/components/website/Chamfered';
import { Section } from '@/components/website/Section';
import { SectionHeading } from '@/components/website/SectionHeading';
import { cn } from '@/lib/utils';

export interface ComparisonRow {
  label: string;
  bad: string;
  good: string;
}

export interface ComparisonTableProps {
  badge?: string;
  title?: string;
  lead?: string;
  /** Column headings: the destructive (bad) column first, then the success (good) one. */
  columns?: { bad: string; good: string };
  rows?: ComparisonRow[];
}

const defaultRows: ComparisonRow[] = [
  { label: 'Ad blockers', bad: 'Events get blocked', good: 'Sent from your server' },
  { label: 'What Meta receives', bad: 'Gaps and missing sales', good: 'Every visit, lead and sale' },
  { label: 'Duplicates', bad: 'Counted twice or not at all', good: 'Deduplicated automatically' },
  { label: 'Matching people', bad: 'Weak match quality', good: 'Fingerprint helps Meta match' },
  { label: 'Setup', bad: 'Developer and tag manager', good: 'Minutes, no developer' },
];

const badCell = 'rounded-lg bg-destructive-subtle text-center text-sm leading-5 text-foreground';
const goodCell = 'rounded-lg bg-success-subtle text-center text-sm leading-5 text-foreground';

// Comparison table (Figma: Block / Comparison table 4689:40361 with the HUD frame on, homepage
// 5004:62515; mobile stacked rows 5063:15604). The same rows drive a table from lg up and stacked
// rows below (labels centred below md, Kev 20 Oct).
export function ComparisonTable({
  badge = 'The problem',
  title = "Your pixel misses sales. Traqqr doesn't.",
  lead = 'Ad blockers, cookie banners and browser limits stop the Meta Pixel from reporting every sale. Traqqr sends the same events from your server too.',
  columns = { bad: 'Meta Pixel only', good: 'Pixel + Traqqr' },
  rows = defaultRows,
}: ComparisonTableProps) {
  return (
    <Section
      id="problem"
      labelledBy="problem-heading"
      width="hud"
      className="mx-auto max-w-[1440px]"
      containerClassName="flex flex-col items-center gap-7 lg:gap-12"
      backdrop={
        <Chamfered
          cut={32}
          radius={16}
          accent={220}
          fill="none"
          className="pointer-events-none absolute inset-x-3 inset-y-6 md:inset-x-6"
          aria-hidden="true"
        />
      }
    >
      <SectionHeading id="problem-heading" badge={badge} title={title} lead={lead} />

      <div className="w-full rounded-xl border bg-card p-3 lg:p-4">
        {/* lg and up: the table */}
        <Table className="hidden table-fixed border-separate border-spacing-2 lg:table">
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="border-0">
              <TableHead className="w-[320px]">
                <span className="sr-only">Topic</span>
              </TableHead>
              <TableHead className="text-center font-normal text-destructive">{columns.bad}</TableHead>
              <TableHead className="text-center font-normal text-success">{columns.good}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label} className="border-0">
                <TableHead scope="row" className="h-auto p-2 font-sans text-sm leading-5 font-normal text-foreground">
                  {row.label}
                </TableHead>
                <TableCell className={cn(badCell, 'px-4 py-3')}>{row.bad}</TableCell>
                <TableCell className={cn(goodCell, 'px-4 py-3')}>{row.good}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Below lg: stacked rows, the two cells side by side under each label */}
        <div className="flex flex-col gap-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2 font-mono text-sm leading-5" aria-hidden="true">
            <p className="text-center whitespace-nowrap text-destructive">{columns.bad}</p>
            <p className="text-center whitespace-nowrap text-success">{columns.good}</p>
          </div>
          <dl className="flex flex-col gap-4">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-1.5">
                <dt className="text-center text-sm leading-5 text-foreground md:text-left">{row.label}</dt>
                <dd className="grid grid-cols-2 items-stretch gap-2">
                  <p className={cn(badCell, 'flex min-h-15 items-center justify-center p-2.5')}>
                    <span className="sr-only">{columns.bad}: </span>
                    {row.bad}
                  </p>
                  <p className={cn(goodCell, 'flex min-h-15 items-center justify-center p-2.5')}>
                    <span className="sr-only">{columns.good}: </span>
                    {row.good}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
