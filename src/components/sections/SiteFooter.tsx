import { Fragment } from 'react';
import { Separator } from '@klicktipp/traqqr-components';
import { TraqqrLogo } from '@/components/brand/TraqqrLogo';
import { loginHref } from '@/data/links';

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface SiteFooterProps {
  tagline?: string;
  columns?: FooterColumn[];
  legal?: { label: string; href: string }[];
}

const link = (label: string, href = '#') => ({ label, href });

// "#" placeholders until the pages exist, except "Log in" (the app login).
const defaultColumns: FooterColumn[] = [
  { heading: 'Product', links: [link('Features'), link('Integrations'), link('Pricing'), link('Live Feed')] },
  { heading: 'Resources', links: [link('Docs'), link('Help center'), link('Blog')] },
  { heading: 'Company', links: [link('About'), link('Contact'), link('Log in', loginHref)] },
];
const defaultLegal = [link('Privacy'), link('Terms'), link('Imprint')];

// Footer (Figma: Block / Footer 5058:1677, homepage 5058:63908; mobile 5063:15675). Brand + tagline,
// link columns (plain <a>, not Button), Separator, legal row. On mobile the columns sit in one row.
export function SiteFooter({
  tagline = 'Server-side tracking for Meta Ads.',
  columns = defaultColumns,
  legal = defaultLegal,
}: SiteFooterProps) {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pt-12 pb-8 lg:gap-10 lg:pt-16 lg:pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <a href="/" aria-label="Traqqr home" className="flex self-start">
              <TraqqrLogo height={40.826} />
            </a>
            <p className="text-sm leading-5 text-muted-foreground">{tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-10 lg:gap-20">
            {columns.map((column) => (
              <div key={column.heading} className="flex flex-col gap-3">
                <h2 className="font-mono text-xs leading-4 text-foreground uppercase">{column.heading}</h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block text-sm leading-5 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 font-mono text-xs leading-4 text-muted-foreground lg:flex-row lg:justify-between">
          <p>© 2026 Traqqr. All rights reserved.</p>
          <p className="flex gap-2">
            {legal.map((item, i) => (
              <Fragment key={item.label}>
                {i > 0 && <span aria-hidden="true">·</span>}
                <a href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
