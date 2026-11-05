import { useEffect, useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from '@klicktipp/traqqr-components';
import { buttonVariants, cn } from '@klicktipp/traqqr-components/utils';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Layers,
  LifeBuoy,
  LogIn,
  Newspaper,
  X,
  type LucideIcon,
} from 'lucide-react';
import { TraqqrLogo } from '@/components/brand/TraqqrLogo';
import { LanguageRowContent, LanguageSwitcher, languageRowClass } from '@/components/sections/LanguageSwitcher';
import { NavIntegrationsIcon, NavPricingIcon, NavProductIcon, NavResourcesIcon } from '@/components/sections/nav-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  integrationsHref,
  loginHref,
  navLinks,
  pricingHref,
  type NavLink,
  type ResourceLink,
} from '@/data/links';
import { integrations as allIntegrations, type Integration } from '@/data/integrations';
import { siteContent, type SiteContent } from '@/data/site';
import { defaultLocale, locales, pathFor, type Locale } from '@/i18n';

type NavLabels = SiteContent['nav'];

const resourceIcons: Record<ResourceLink['icon'], LucideIcon> = {
  docs: BookOpen,
  help: LifeBuoy,
  blog: Newspaper,
};

// Figma triggers: h-9 px-3 rounded-md, Space Mono 400, hover bg-accent, open bg-accent/50. The dropdown
// triggers are buttons, which Tailwind v4 leaves on the default cursor, so set the pointer like the links.
const triggerClass =
  'cursor-pointer rounded-md px-3 font-mono font-normal text-foreground hover:bg-accent focus:bg-accent data-open:bg-accent/50 data-open:hover:bg-accent data-open:focus:bg-accent [&>svg]:transition-none';

// Panels sit 8px under the floating nav (24px under the trigger), Figma: bg-popover border rounded-md shadow-md p-2.
const panelClass =
  'p-2 group-data-[viewport=false]/navigation-menu:mt-6 group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow-md group-data-[viewport=false]/navigation-menu:ring-0';

const panelLinkClass = 'items-start gap-3 rounded-md px-3 py-2 hover:bg-muted focus:bg-muted';

function PanelLink({ link, children }: { link: NavLink; children?: React.ReactNode }) {
  return (
    <li>
      <NavigationMenuLink asChild className={panelLinkClass}>
        <a href={link.href}>
          {children}
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-mono text-sm leading-5 text-foreground">{link.title}</span>
            {link.description && <span className="text-sm leading-5 text-muted-foreground">{link.description}</span>}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return <span className="flex size-5 shrink-0 items-center justify-center">{children}</span>;
}

interface DesktopMenuProps {
  labels: NavLabels;
  /** The integrations page; the nine tiles stay "#" until their detail pages exist. */
  integrationsPage: string;
  pricingPage: string;
  integrations: Integration[];
  product: NavLink[];
  solutions: NavLink[];
  resources: ResourceLink[];
}

/** The Product and Lösungen panels: a title and a line of description per page. The panels hug their
 * longest line (Kev, 5 Nov: w-max, Figma 5071:257 and 5273:36); each item fills the panel's width. */
function PanelLinks({ links }: { links: NavLink[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {links.map((link) => (
        <li key={link.title}>
          <NavigationMenuLink asChild className={cn(panelLinkClass, 'flex-col gap-1 px-4')}>
            <a href={link.href}>
              <span className="font-mono text-sm leading-5 text-foreground">{link.title}</span>
              <span className="text-sm leading-5 text-muted-foreground">{link.description}</span>
            </a>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

function DesktopMenu({ labels, integrationsPage, pricingPage, integrations, product, solutions, resources }: DesktopMenuProps) {
  return (
    <NavigationMenu viewport={false} className="hidden flex-none lg:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>{labels.product}</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-max')}>
            <PanelLinks links={product} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>{labels.solutions}</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-max')}>
            <PanelLinks links={solutions} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>{labels.integrations}</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-[600px]')}>
            <ul className="grid grid-cols-3 gap-1">
              {integrations.map((integration) => (
                <PanelLink key={integration.name} link={{ title: integration.name, href: '#' }}>
                  <IconBox>
                    <img src={integration.mono} alt="" width={16} height={16} className="size-4" />
                  </IconBox>
                </PanelLink>
              ))}
            </ul>
            <Separator className="my-2" />
            <ul>
              <PanelLink link={{ title: labels.allIntegrations, href: integrationsPage }}>
                <IconBox>
                  <ArrowRight className="size-4" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
                </IconBox>
              </PanelLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>{labels.resources}</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-[320px]')}>
            <ul className="flex flex-col gap-1">
              {resources.map((link) => {
                const Icon = resourceIcons[link.icon];
                return (
                  <PanelLink key={link.title} link={link}>
                    <IconBox>
                      <Icon className="size-4" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
                    </IconBox>
                  </PanelLink>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), triggerClass)}>
            <a href={pricingPage}>{labels.pricing}</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// The dashboard's menu icon, copied as it is from saas-frontend
// apps/traqqr/src/components/nav-icons.tsx (WideMenuIcon) so the website toggle matches the app
// exactly (Kev, 20 Oct). Keep it in step with that file; don't redraw it.
function WideMenuIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="26.667"
      height="16"
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 5h32" />
      <path d="M4 12h32" />
      <path d="M4 19h32" />
    </svg>
  );
}

// Mobile menu rows (Figma: Mobile nav item 5072:351 / sub-link 5072:356) use the dashboard's own
// SidebarMenuButton styles, including its active state: white/8 fill with the top-lit gradient,
// white/14 top edge, foreground label, brand icon (Kev, 20 Oct). Copied from the library's
// sidebarMenuButtonVariants (traqqr-components 0.16.2, src/components/ui/sidebar.tsx), which isn't
// exported; SidebarMenuButton itself needs the dashboard's SidebarProvider. Keep in step with it.
// Its [&_svg] rules size and colour the row icons: Kev's duotone icons (nav-icons.tsx) and lucide LogIn.
const sidebarMenuButtonClass =
  'flex w-full items-center gap-3 overflow-hidden rounded-lg border-t border-transparent px-3 py-1.5 h-10 text-left font-heading text-lg font-normal text-muted-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:border-foreground/14 data-active:bg-foreground/8 data-active:bg-linear-to-b data-active:from-foreground/10 data-active:via-foreground/3 data-active:to-transparent data-active:text-foreground [&_svg]:size-4.5 [&_svg]:shrink-0 [&_svg]:text-sidebar-icon data-active:[&_svg]:text-brand';
const rowClass = cn(sidebarMenuButtonClass, 'cursor-pointer data-[state=open]:text-foreground');
// Sub-links take the same active state as the rows (Kev's nav doc §3, Mobile nav sub-link State=Active).
const subLinkClass =
  'flex h-9 items-center rounded-md border-t border-transparent px-3 text-base leading-6 text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-active:border-foreground/14 data-active:bg-foreground/8 data-active:bg-linear-to-b data-active:from-foreground/10 data-active:via-foreground/3 data-active:to-transparent data-active:text-foreground';

const normalisePath = (path: string) => (path === '/' ? path : path.replace(/\/+/g, '/').replace(/\/$/, ''));
// Placeholder "#" links are never active.
const isCurrent = (href: string, currentPath?: string) =>
  !!currentPath && href !== '#' && normalisePath(href) === normalisePath(currentPath);
const activeProps = (active: boolean) =>
  active ? ({ 'data-active': true, 'aria-current': 'page' } as const) : {};

interface MobileMenuProps {
  locale: Locale;
  languagePaths: Record<Locale, string>;
  labels: NavLabels;
  trial: SiteContent['cta']['trial'];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPath?: string;
  product: NavLink[];
  solutions: NavLink[];
  resources: ResourceLink[];
  /** Whether the top bar has turned floating, which moves the hamburger the close button covers. */
  scrolled: boolean;
}

function MobileMenu({
  locale,
  languagePaths,
  labels,
  trial,
  open,
  onOpenChange,
  currentPath,
  product,
  solutions,
  resources,
  scrolled,
}: MobileMenuProps) {
  const close = () => onOpenChange(false);
  const groups = [
    { key: 'product' as const, label: labels.product, icon: <NavProductIcon />, links: product },
    // Placeholder icon: Kev's duotone set (nav-icons.tsx) has no Solutions icon yet.
    { key: 'solutions' as const, label: labels.solutions, icon: <Layers strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />, links: solutions },
    { key: 'resources' as const, label: labels.resources, icon: <NavResourcesIcon />, links: resources },
  ];
  type GroupKey = (typeof groups)[number]['key'];
  // One group open at a time; the group holding the current page starts open.
  const [group, setGroup] = useState<GroupKey | null>(
    () => groups.find((g) => g.links.some((link) => isCurrent(link.href, currentPath)))?.key ?? null
  );

  const renderGroup = (g: (typeof groups)[number]) => (
    <Collapsible key={g.key} open={group === g.key} onOpenChange={(isOpen) => setGroup(isOpen ? g.key : null)}>
      <CollapsibleTrigger className={cn(rowClass, 'group/row')}>
        {g.icon}
        <span className="flex-1 text-left">{g.label}</span>
        <ChevronDown
          className="size-4! group-data-[state=open]/row:rotate-180"
          strokeWidth={1}
          absoluteStrokeWidth
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-[21px]">
        <ul className="flex flex-col gap-0.5 border-l border-sidebar-border py-0.5 pl-2">
          {g.links.map((link) => (
            <li key={link.title}>
              <a href={link.href} className={subLinkClass} onClick={close} {...activeProps(isCurrent(link.href, currentPath))}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );

  const plainRow = (label: string, href: string, icon: React.ReactNode) => (
    <a href={href} className={rowClass} onClick={close} {...activeProps(isCurrent(href, currentPath))}>
      {icon}
      {label}
    </a>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* The dashboard's mobile menu colours: bg-sidebar with sidebar-border lines (Kev, 20 Oct). */}
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-[320px] gap-0 border-sidebar-border bg-sidebar shadow-none"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">{labels.menu}</SheetTitle>
        <div className="flex h-20 shrink-0 items-center border-b border-sidebar-border px-6">
          <TraqqrLogo height={40} />
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-0.5 px-3 py-4">
          {renderGroup(groups[0])}
          {renderGroup(groups[1])}
          {plainRow(labels.integrations, integrationsHref(locale), <NavIntegrationsIcon />)}
          {renderGroup(groups[2])}
          {plainRow(labels.pricing, pricingHref(locale), <NavPricingIcon />)}
          <div className="mt-2 border-t border-sidebar-border pt-2">{plainRow(labels.login, loginHref, <LogIn strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />)}</div>
          {/* The language switcher isn't designed for mobile yet: two Language item rows at the
              bottom of the menu (Kev's 3 Nov handover §3.3). */}
          <ul aria-label={labels.language} className="mt-2 flex flex-col gap-0.5 border-t border-sidebar-border pt-2">
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={languagePaths[l]}
                  hrefLang={l}
                  lang={l}
                  className={languageRowClass(l === locale)}
                  aria-current={l === locale ? 'page' : undefined}
                  onClick={close}
                  data-lang-pick
                >
                  <LanguageRowContent locale={l} selected={l === locale} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="p-4">
          <a href={trial.href} className={cn(buttonVariants({ size: 'lg' }), 'w-full')} onClick={close}>
            {trial.label}
          </a>
        </SheetFooter>
        {/* The dashboard's close button, centred on the hamburger's spot at the right of the screen. It
            lives inside the panel (placed past its right edge) so it stays in the dialog's focus trap
            and isn't hidden from screen readers with the rest of the page. */}
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={labels.closeMenu}
          onClick={close}
          className={cn(
            'absolute cursor-pointer text-white hover:bg-white/10 hover:text-white',
            scrolled ? 'top-[28.2px] left-[calc(100vw-63px)]' : 'top-2.5 left-[calc(100vw-50px)]'
          )}
        >
          <X className="size-6" strokeWidth={4 / 3} />
        </Button>
      </SheetContent>
    </Sheet>
  );
}

// Site nav (Figma: Site header / Floating 5004:1680; mobile states 5072:426 / 5082:575 / 5072:443).
// Desktop: floating glass bar with logo, NavigationMenu dropdowns and "Start free trial"; past 80px of
// scroll the wordmark folds away. Below lg: the dashboard's top bar (full logo + its menu toggle) at the
// top of the page, turning into the floating glass bar past 80px. Bar states live in global.css (.site-nav).
export interface SiteNavProps {
  locale?: Locale;
  /** This page's path in each language, for the language switcher. Defaults to the homepages. */
  languagePaths?: Record<Locale, string>;
  /** The page's path (Astro.url.pathname), for the mobile menu's active row. */
  currentPath?: string;
  integrations?: Integration[];
  /** Dropdown and mobile menu link lists; the defaults are the language's lists in src/data/links.ts. */
  product?: NavLink[];
  resources?: ResourceLink[];
  /** Pin the scrolled state (Storybook); by default it follows window scroll past 80px. */
  scrolled?: boolean;
  /** Open the mobile menu on load (Storybook). */
  defaultMenuOpen?: boolean;
}

export function SiteNav({
  locale = defaultLocale,
  languagePaths = { de: pathFor('home', 'de'), en: pathFor('home', 'en') },
  currentPath,
  integrations = allIntegrations,
  product = navLinks[locale].product,
  resources = navLinks[locale].resources,
  scrolled: scrolledOverride,
  defaultMenuOpen = false,
}: SiteNavProps) {
  const { nav: labels, cta } = siteContent[locale];
  const [scrolledByPage, setScrolledByPage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const scrolled = scrolledOverride ?? scrolledByPage;

  useEffect(() => {
    if (scrolledOverride !== undefined) return;
    const update = () => setScrolledByPage(window.scrollY > 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scrolledOverride]);

  return (
    <header
      data-site-header
      data-scrolled={scrolled || undefined}
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center lg:top-3 lg:px-4"
    >
      <nav
        aria-label="Main"
        className="site-nav pointer-events-auto flex w-full items-center justify-between gap-6 lg:h-[68px] lg:w-auto lg:justify-start lg:rounded-[12px] lg:border lg:border-accent-line lg:p-4 lg:pr-5 lg:shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] lg:backdrop-blur-md"
      >
        <a href={pathFor('home', locale)} aria-label={labels.home} className="flex rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <TraqqrLogo height={36.4} className="lg:hidden" />
          <TraqqrLogo className="hidden lg:inline-flex" />
        </a>

        <DesktopMenu
          labels={labels}
          integrationsPage={integrationsHref(locale)}
          pricingPage={pricingHref(locale)}
          integrations={integrations}
          product={product}
          solutions={navLinks[locale].solutions}
          resources={resources}
        />

        {/* The CTA, then the language switcher (Kev, 3 Nov). */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={cta.trial.href} className={buttonVariants({ size: 'lg' })}>
            {cta.trial.label}
          </a>
          <LanguageSwitcher locale={locale} paths={languagePaths} label={labels.language} />
        </div>

        {/* The dashboard MobileTopBar toggle: ghost icon Button, WideMenuIcon at 16px tall. */}
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label={labels.openMenu}
          aria-expanded={menuOpen}
        >
          <WideMenuIcon className="size-auto h-4" />
        </Button>
      </nav>

      <MobileMenu
        locale={locale}
        languagePaths={languagePaths}
        labels={labels}
        trial={cta.trial}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        currentPath={currentPath}
        product={product}
        solutions={navLinks[locale].solutions}
        resources={resources}
        scrolled={scrolled}
      />
    </header>
  );
}
