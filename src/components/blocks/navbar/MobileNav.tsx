import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_1px_1px_rgba(0,0,0,0.05)] lg:hidden"
      >
        <Menu size={16} />
      </SheetTrigger>
      <SheetContent side="right" className="border-l border-border bg-background">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Primary" className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-4">
          <a href="#" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
            Console login
          </a>
          <a href="#" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
            Sign up
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
