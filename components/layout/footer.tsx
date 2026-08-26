import Link from "next/link";
import { Logo } from "./logo";
export function Footer() {
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo concept="pure" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The marketplace for AI building blocks. Carefully made, clearly
            explained.
          </p>
        </div>
        {[
          ["Marketplace", "Explore", "Collections", "New releases"],
          ["Create", "Start selling", "Creator guide", "Quality standards"],
          ["Company", "About", "Journal", "Support"],
        ].map(([h, ...links]) => (
          <div key={h}>
            <h3 className="text-sm font-semibold">{h}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {links.map((x) => (
                <li key={x}>
                  <Link href="/explore" className="hover:text-primary">
                    {x}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © 2026 termspace · Concept prototype · Local mock data only
      </div>
    </footer>
  );
}
