import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
export function Header() {
  return (
    <>
      <div className="bg-foreground px-4 py-2 text-center text-xs font-medium text-background">
        New: verified MCP servers with transparent permission reviews{" "}
        <Link href="/explore" className="ml-2 underline underline-offset-4">
          Explore
        </Link>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />
          <nav
            className="hidden items-center gap-7 text-sm md:flex"
            aria-label="Primary"
          >
            <Link href="/explore" className="hover:text-primary">
              Explore
            </Link>
            <Link href="/design-system" className="hover:text-primary">
              Design system
            </Link>
            <a href="#creators" className="hover:text-primary">
              For creators
            </a>
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">
              Start selling
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
