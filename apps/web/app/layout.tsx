import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/newsreader";
import "@/styles/globals.css";
import { Providers } from "@/components/layout/providers";
export const metadata: Metadata = {
  title: {
    default: "termspace — AI building blocks",
    template: "%s · termspace",
  },
  description:
    "Discover trusted prompts, skills, agents, MCP servers, and AI tools.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Scroll reveals are opacity-gated by JS. Without JS there is no
            observer to un-gate them, so hand no-script readers the content. */}
        <noscript>
          <style>{".ts-reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
