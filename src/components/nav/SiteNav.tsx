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
  Activity,
  ArrowRight,
  BookOpen,
  ChevronDown,
  LifeBuoy,
  LogIn,
  Newspaper,
  Puzzle,
  Tag,
  X,
  type LucideIcon,
} from 'lucide-react';
import { TraqqrLogo } from '@/components/brand/TraqqrLogo';
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
  pricingHref,
  productLinks,
  resourceLinks,
  signupHref,
  type NavLink,
} from './links';

export interface NavIntegration {
  name: string;
  logo: string;
}

const resourceIcons: Record<(typeof resourceLinks)[number]['icon'], LucideIcon> = {
  docs: BookOpen,
  help: LifeBuoy,
  blog: Newspaper,
};

// Figma triggers: h-9 px-3 rounded-md, Space Mono 400, hover bg-accent, open bg-accent/50.
const triggerClass =
  'rounded-md px-3 font-mono font-normal text-foreground hover:bg-accent focus:bg-accent data-open:bg-accent/50 data-open:hover:bg-accent data-open:focus:bg-accent [&>svg]:transition-none';

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

function DesktopMenu({ integrations }: { integrations: NavIntegration[] }) {
  return (
    <NavigationMenu viewport={false} className="hidden flex-none lg:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>Product</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-[520px]')}>
            <ul className="flex flex-col">
              {productLinks.map((link) => (
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
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>Integrations</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-[600px]')}>
            <ul className="grid grid-cols-3 gap-1">
              {integrations.map((integration) => (
                <PanelLink key={integration.name} link={{ title: integration.name, href: integrationsHref }}>
                  <IconBox>
                    <img src={integration.logo} alt="" width={16} height={16} className="size-4" />
                  </IconBox>
                </PanelLink>
              ))}
            </ul>
            <Separator className="my-2" />
            <ul>
              <PanelLink link={{ title: 'All integrations', href: integrationsHref }}>
                <IconBox>
                  <ArrowRight className="size-4" strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
                </IconBox>
              </PanelLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>Resources</NavigationMenuTrigger>
          <NavigationMenuContent className={cn(panelClass, 'md:w-[320px]')}>
            <ul className="flex flex-col gap-1">
              {resourceLinks.map((link) => {
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
            <a href={pricingHref}>Pricing</a>
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

// Mobile menu rows (Figma: Mobile nav item 5072:351 / sub-link 5072:356), styled like the app Sidenavbar.
const rowClass =
  'group/row flex h-10 w-full items-center gap-3 rounded-lg px-3 text-lg leading-7 text-muted-foreground transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:text-foreground';
const rowIcon = 'size-4.5 shrink-0 text-sidebar-icon';
const subLinkClass =
  'flex h-9 items-center rounded-md px-3 text-base leading-6 text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50';

function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  // One group open at a time.
  const [group, setGroup] = useState<'product' | 'resources' | null>(null);
  const close = () => onOpenChange(false);

  const groups = [
    { key: 'product' as const, label: 'Product', icon: Activity, links: productLinks },
    { key: 'resources' as const, label: 'Resources', icon: BookOpen, links: resourceLinks },
  ];

  const renderGroup = (g: (typeof groups)[number]) => (
    <Collapsible key={g.key} open={group === g.key} onOpenChange={(isOpen) => setGroup(isOpen ? g.key : null)}>
      <CollapsibleTrigger className={rowClass}>
        <g.icon className={rowIcon} strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
        <span className="flex-1 text-left">{g.label}</span>
        <ChevronDown
          className="size-4 shrink-0 group-data-[state=open]/row:rotate-180"
          strokeWidth={1}
          absoluteStrokeWidth
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-[21px]">
        <ul className="flex flex-col gap-0.5 border-l py-0.5 pl-2">
          {g.links.map((link) => (
            <li key={link.title}>
              <a href={link.href} className={subLinkClass} onClick={close}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );

  const plainRow = (label: string, href: string, Icon: LucideIcon) => (
    <a href={href} className={rowClass} onClick={close}>
      <Icon className={rowIcon} strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
      {label}
    </a>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" showCloseButton={false} className="w-[320px] gap-0 shadow-none" aria-describedby={undefined}>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex h-20 shrink-0 items-center border-b px-6">
          <TraqqrLogo height={40} />
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-0.5 px-3 py-4">
          {renderGroup(groups[0])}
          {plainRow('Integrations', integrationsHref, Puzzle)}
          {renderGroup(groups[1])}
          {plainRow('Pricing', pricingHref, Tag)}
          <div className="mt-2 border-t pt-2">{plainRow('Log in', loginHref, LogIn)}</div>
        </nav>
        <SheetFooter className="p-4">
          <a href={signupHref} className={cn(buttonVariants({ size: 'lg' }), 'w-full')} onClick={close}>
            Start free trial
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Site nav (Figma: Site header / Floating 5004:1680; mobile states 5072:426 / 5082:575 / 5072:443).
// Desktop: floating glass bar with logo, NavigationMenu dropdowns and "Start free trial"; past 80px of
// scroll the wordmark folds away. Below lg: the dashboard's top bar (full logo + its menu toggle) at the
// top of the page, turning into the floating glass bar past 80px. Bar states live in global.css (.site-nav).
export function SiteNav({ integrations }: { integrations: NavIntegration[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <header
        data-site-header
        data-scrolled={scrolled || undefined}
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center lg:top-3 lg:px-4"
      >
        <nav
          aria-label="Main"
          className="site-nav pointer-events-auto flex w-full items-center justify-between gap-6 lg:h-[68px] lg:w-auto lg:justify-start lg:rounded-[12px] lg:border lg:border-accent-line lg:p-4 lg:pr-5 lg:shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] lg:backdrop-blur-md"
        >
          <a href="/" aria-label="Traqqr home" className="flex rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <TraqqrLogo height={36.4} className="lg:hidden" />
            <TraqqrLogo className="hidden lg:inline-flex" />
          </a>

          <DesktopMenu integrations={integrations} />

          <a href={signupHref} className={cn(buttonVariants({ size: 'lg' }), 'hidden lg:inline-flex')}>
            Start free trial
          </a>

          {/* The dashboard MobileTopBar toggle: ghost icon Button, WideMenuIcon at 16px tall. */}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <WideMenuIcon className="size-auto h-4" />
          </Button>
        </nav>

        <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
      </header>

      {/* The dashboard's close button: outside the header so it sits above the Sheet overlay (z-60),
          centred on the hamburger's spot, which depends on whether the bar has turned floating. */}
      {menuOpen && (
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={cn(
            'pointer-events-auto fixed z-60 cursor-pointer text-white hover:bg-white/10 hover:text-white lg:hidden',
            scrolled ? 'top-[28.2px] right-[27px]' : 'top-2.5 right-3.5'
          )}
        >
          <X className="size-6" strokeWidth={4 / 3} />
        </Button>
      )}
    </>
  );
}
