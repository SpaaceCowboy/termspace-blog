"use client";
import { ThemeProvider } from "next-themes";
import { MarketplaceSessionProvider } from "@/features/account/marketplace-session";

/**
 * Dark is the declared default rather than "system": the Void ground is what
 * makes Plasma read as emission instead of paint, so it is the composition
 * the brand is designed around. The toggle in the header gives full control,
 * and next-themes persists the choice.
 *
 * disableTransitionOnChange is deliberately off — the theme toggle's
 * cross-rotating icons are the switch's whole affordance, and that flag would
 * suppress them along with everything else.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MarketplaceSessionProvider>{children}</MarketplaceSessionProvider>
    </ThemeProvider>
  );
}
