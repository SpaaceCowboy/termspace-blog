import Link from "next/link";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  FileCheck2,
  RefreshCw,
  Store,
  Compass,
  Download,
  Quote,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/product-card";
import { CreatorIdentity } from "@/components/marketplace/product-parts";
import { products, creators, categories } from "@/lib/mock-data";
const collections = [
  {
    title: "Tools for careful research",
    copy: "Evidence-first workflows that keep sources, caveats, and reasoning visible.",
    tone: "bg-accent/10",
  },
  {
    title: "Ship better software",
    copy: "Review, accessibility, and database tools made by practicing engineers.",
    tone: "bg-success/10",
  },
  {
    title: "Find the words that work",
    copy: "Brand and conversion systems grounded in customer language—not hype.",
    tone: "bg-primary/10",
  },
];
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="container-page grid items-center gap-12 py-16 md:grid-cols-[1.15fr_.85fr] md:py-24">
          <div>
            <p className="eyebrow">The marketplace for AI building blocks</p>
            <h1 className="editorial mt-5 max-w-2xl text-5xl font-medium leading-[.98] sm:text-6xl">
              Better building blocks for better AI.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Discover trusted prompts, skills, agents, MCP servers, and AI
              tools—created by people who know how to make models work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/explore" className={buttonVariants({ size: "lg" })}>
                Explore marketplace <ArrowRight size={17} />
              </Link>
              <Button variant="secondary" size="lg">
                Start selling
              </Button>
            </div>
          </div>
          <div className="relative border-y border-border py-8 md:border-l md:border-y-0 md:pl-10">
            <Quote className="text-primary" size={28} />
            <blockquote className="editorial mt-4 text-2xl leading-9">
              “A good AI product should tell you what it does, what it touches,
              and why you can trust it.”
            </blockquote>
            <p className="mt-5 text-sm text-muted-foreground">
              The termspace quality standard
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t pt-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Every listing</dt>
                <dd className="mt-1 font-semibold">Compatibility declared</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Verified products</dt>
                <dd className="mt-1 font-semibold">Safety reviewed</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="border-y bg-surface py-8">
          <div className="container-page">
            <form action="/explore" className="relative mx-auto max-w-4xl">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={21}
              />
              <input
                name="q"
                aria-label="Search marketplace"
                placeholder="What do you want AI to do better?"
                className="h-16 w-full rounded-lg border border-border-strong bg-background pl-14 pr-32 text-base shadow-soft focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="absolute right-2 top-2 h-12 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground">
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {[
                "Skills",
                "Agents",
                "MCP servers",
                "Prompts",
                "Developer tools",
              ].map((x) => (
                <Link
                  href={`/explore?type=${x}`}
                  key={x}
                  className="hover:text-primary"
                >
                  {x}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="container-page py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Chosen with care</p>
              <h2 className="editorial mt-2 text-4xl">
                Featured building blocks
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden items-center gap-1 text-sm font-semibold sm:flex"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products
              .filter((p) => p.featured)
              .map((p) => (
                <ProductCard key={p.id} product={p} variant="expanded" />
              ))}
          </div>
        </section>
        <section className="bg-foreground py-20 text-background">
          <div className="container-page">
            <p className="eyebrow !text-background/60">Curated collections</p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-background/20 md:grid-cols-3">
              {collections.map((c, i) => (
                <Link
                  href="/explore"
                  key={c.title}
                  className="group bg-foreground p-7 hover:bg-background/5"
                >
                  <span className="font-mono text-xs text-background/50">
                    0{i + 1}
                  </span>
                  <h3 className="editorial mt-12 text-2xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-background/65">
                    {c.copy}
                  </p>
                  <ArrowRight
                    className="mt-6 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="container-page py-20">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="eyebrow">Browse by practice</p>
              <h2 className="editorial mt-2 text-4xl">
                Made for work that matters.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Start with the outcome, not the file format.
              </p>
            </div>
            <div className="grid grid-cols-2 border-l border-t sm:grid-cols-3">
              {categories.slice(1).map((c, i) => (
                <Link
                  href={`/explore?category=${c}`}
                  key={c}
                  className="min-h-28 border-b border-r p-4 text-sm font-semibold hover:bg-surface hover:text-primary"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-8">{c}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="border-y bg-surface py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="eyebrow">Simple by design</p>
              <h2 className="editorial mt-2 text-4xl">
                From need to useful in minutes.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                [
                  Compass,
                  "Discover",
                  "Search by outcome and compare fit across platforms and models.",
                ],
                [
                  FileCheck2,
                  "Verify",
                  "Preview contents, permissions, requirements, and independent trust signals.",
                ],
                [
                  Download,
                  "Put it to work",
                  "Get clear installation instructions and updates from the creator.",
                ],
              ].map(([Icon, title, copy], i) => {
                const I = Icon as typeof Compass;
                return (
                  <div
                    key={String(title)}
                    className="border-t border-border-strong pt-5"
                  >
                    <div className="flex items-center justify-between">
                      <I className="text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="editorial mt-8 text-2xl">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {String(copy)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="container-page py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl bg-muted p-8">
              <ShieldCheck size={28} className="text-success" />
              <h2 className="editorial mt-6 text-3xl">
                Trust is product information.
              </h2>
              <p className="mt-3 max-w-lg leading-7 text-muted-foreground">
                We separate compatibility, permissions, requirements, license,
                and safety status so you can evaluate a product before it
                touches your workflow.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <p>
                  <FileCheck2 className="mb-2" size={18} />
                  Human-readable permissions
                </p>
                <p>
                  <RefreshCw className="mb-2" size={18} />
                  Visible update history
                </p>
              </div>
            </div>
            <div id="creators" className="rounded-xl border bg-surface p-8">
              <Store size={28} className="text-primary" />
              <h2 className="editorial mt-6 text-3xl">
                A serious shelf for your best work.
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Publish with rich previews, version history, compatibility
                metadata, and a storefront that respects the craft.
              </p>
              <Button className="mt-7">Read the creator guide</Button>
            </div>
          </div>
        </section>
        <section className="container-page py-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">People worth following</p>
              <h2 className="editorial mt-2 text-4xl">Featured creators</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {creators.slice(0, 3).map((c) => (
              <article
                key={c.id}
                className="border-t border-border-strong py-5"
              >
                <CreatorIdentity creator={c} />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {c.bio}
                </p>
                <p className="mt-4 text-xs font-semibold">
                  {c.products} products · {c.followers.toLocaleString()}{" "}
                  followers
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="container-page my-20 bg-primary px-6 py-12 text-primary-foreground sm:px-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow !text-primary-foreground/70">
                A quieter, better inbox
              </p>
              <h2 className="editorial mt-2 text-4xl">
                One useful release every Friday.
              </h2>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="you@example.com"
                className="min-h-12 min-w-0 flex-1 rounded-md border border-white/30 bg-white/10 px-4 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="rounded-md bg-foreground px-5 text-sm font-semibold text-background">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
