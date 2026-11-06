import { Fragment } from 'react';
import { Separator } from '@klicktipp/traqqr-components';
import { TraqqrLogo } from '@/components/brand/TraqqrLogo';
import klicktippLogo from '@/assets/brand/klicktipp-logo-dark.svg';
import { klicktippHref } from '@/data/links';
import { assetUrl } from '@/lib/asset-url';
import { siteContent } from '@/data/site';
import { defaultLocale, pathFor, type Locale } from '@/i18n';

export interface SiteFooterProps {
  locale?: Locale;
}

// Footer (Figma: Block / Footer 5058:1677, Homepage v2 5212:17406 DE / 5212:18041 EN; mobile 5063:15675).
// Brand + tagline + "Powered by KlickTipp" (Kev, 6 Nov: a plain caps label, KlickTipp's own dark logo 20px high, not
// recoloured), link columns (plain <a>, not Button), Separator, legal row. On mobile the columns sit in one row.
export function SiteFooter({ locale = defaultLocale }: SiteFooterProps) {
  const { tagline, columns, legal, copyright } = siteContent[locale].footer;
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pt-12 pb-8 lg:gap-10 lg:pt-16 lg:pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <a href={pathFor('home', locale)} aria-label={siteContent[locale].nav.home} className="flex self-start">
              <TraqqrLogo height={40.826} />
            </a>
            <p className="text-sm leading-5 text-muted-foreground">{tagline}</p>
            <p className="flex items-center gap-2 font-mono text-[11px] leading-4 tracking-[0.08em] text-muted-foreground uppercase">
              Powered by
              <a href={klicktippHref} target="_blank" rel="noopener" aria-label="KlickTipp" className="flex">
                <img src={assetUrl(klicktippLogo)} alt="KlickTipp" width={74} height={20} className="h-5 w-auto" />
              </a>
            </p>
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
          <p>{copyright}</p>
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
