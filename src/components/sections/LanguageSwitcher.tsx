import { Button } from '@klicktipp/traqqr-components';
import { cn } from '@klicktipp/traqqr-components/utils';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { localeInfo, locales, type Locale } from '@/i18n';

export interface LanguageSwitcherProps {
  locale: Locale;
  /** This page's path in each language, so a pick lands on the same page. */
  paths: Record<Locale, string>;
  /** "Sprache" / "Language": the menu label and the start of the trigger's accessible name. */
  label: string;
}

// The house curve (Julian's motion rules): menu in 180ms, out 120ms, chevron 200ms.
const ease = 'ease-[cubic-bezier(.2,.7,.2,1)]';

/** A row per language, linking to this page in that language. Shared by the desktop menu and the
 * mobile menu (Figma Language item 5259:248: h-9 rounded-lg, name · code · check, no flag (5 Nov), hover
 * bg-accent, selected bg-accent/50 with the check in brand; the check keeps its space in every row). */
export function languageRowClass(selected: boolean) {
  return cn(
    'flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-foreground outline-none hover:bg-accent focus-visible:bg-accent data-highlighted:bg-accent',
    selected && 'bg-accent/50'
  );
}

export function LanguageRowContent({ locale, selected }: { locale: Locale; selected: boolean }) {
  const { name, code } = localeInfo[locale];
  return (
    <>
      <span className="flex-1 text-sm leading-5">{name}</span>
      <span className="font-mono text-xs leading-4 text-muted-foreground">{code}</span>
      <Check className={cn('size-4 text-brand', !selected && 'invisible')} strokeWidth={1.5} aria-hidden="true" />
    </>
  );
}

// Language switcher (Figma: Language switcher 5259:133, Language menu 5259:331; spec in Kev's
// 3 Nov update). Desktop only, right of the CTA: a globe + a chevron in a small bordered box, opening
// a glass menu with one row per language. No flags (5 Nov, founder feedback): a language isn't a country.
export function LanguageSwitcher({ locale, paths, label }: LanguageSwitcherProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`${label}: ${localeInfo[locale].name}`}
          className="group/lang h-9 cursor-pointer gap-1.5 rounded-lg border border-foreground/10 bg-accent px-2.5 py-2 hover:border-foreground/20 hover:bg-accent data-[state=open]:border-foreground/20"
        >
          <Globe className="size-4" strokeWidth={1.5} aria-hidden="true" />
          <ChevronDown
            className={cn('size-3 transition-transform duration-200 group-data-[state=open]/lang:rotate-180', ease)}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          'w-[236px] rounded-[12px] border bg-popover/88 p-1.5 text-popover-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_12px_32px_-8px_rgb(0_0_0/0.4)] backdrop-blur-xl',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-96 data-[state=open]:slide-in-from-top-1 data-[state=open]:duration-180',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-96 data-[state=closed]:duration-120',
          ease
        )}
      >
        <DropdownMenuLabel className="px-2.5 pt-1.5 pb-1 font-mono text-xs leading-4 text-muted-foreground uppercase">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale}>
          {locales.map((l) => (
            <DropdownMenuRadioItem key={l} value={l} asChild>
              <a href={paths[l]} hrefLang={l} lang={l} className={languageRowClass(l === locale)} data-lang-pick>
                <LanguageRowContent locale={l} selected={l === locale} />
              </a>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
