import type { Metadata } from "next";
import {
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { ProductActions } from "@/features/product/product-actions";
import {
  CompatibilityBadges,
  CreatorIdentity,
  ProductTypeBadge,
  Rating,
} from "@/components/marketplace/product-parts";
import { ProductCard } from "@/components/marketplace/product-card";
import { products, reviews, versions } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Conversion Copywriter" };
const product = products[0];

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-border py-9">
      <h2 className="editorial text-3xl font-semibold">{title}</h2>
      <div className="mt-5 text-[15px] leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function ProductPage() {
  const benefits = [
    "Extracts pains, desired outcomes, and objections from research",
    "Builds a claim-to-proof messaging map",
    "Drafts complete pages with voice constraints",
    "Reviews copy for unsupported claims and generic language",
  ];
  const included = [
    ["SKILL.md", "Core workflow and behavioral instructions"],
    ["README.md", "Setup, use, and troubleshooting"],
    ["research-intake.md", "Structured customer-evidence intake"],
    ["messaging-map.md", "Claim, proof, objection, and priority rubric"],
    ["examples/", "Three annotated B2B and commerce examples"],
    ["CHANGELOG.md", "Full version and migration history"],
  ];
  return (
    <>
      <Header />
      <main className="container-page py-8">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          Explore / Skills /{" "}
          <span className="text-foreground">Conversion Copywriter</span>
        </nav>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_21rem]">
          <div>
            <div className="flex flex-wrap gap-2">
              <ProductTypeBadge type={product.type} />
              <Badge variant="success">
                <ShieldCheck size={12} />
                Verified product
              </Badge>
            </div>
            <h1 className="editorial mt-5 max-w-3xl text-5xl font-medium leading-none sm:text-6xl">
              Conversion Copywriter
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-muted-foreground">
              {product.outcome}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <CreatorIdentity creator={product.creator} />
              <Rating rating={product.rating} count={product.reviewCount} />
              <span className="text-xs text-muted-foreground">
                3,200 purchases
              </span>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
              <Meta label="Version" value="2.4.0" icon={RefreshCw} />
              <Meta label="Updated" value="Aug 18, 2026" icon={Clock3} />
              <Meta label="Package" value="6 files · 84 KB" icon={FileText} />
            </div>
            <Section title="What it does">
              <p>
                A research-first copy system for landing pages, product
                launches, and high-intent campaigns. It turns customer language,
                offer details, and proof into a clear messaging argument before
                drafting copy.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((x) => (
                  <p
                    key={x}
                    className="flex gap-3 rounded-md bg-surface p-4 text-sm text-foreground"
                  >
                    <Check className="mt-1 shrink-0 text-success" size={16} />
                    {x}
                  </p>
                ))}
              </div>
            </Section>
            <Section title="Ideal use cases">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [
                    "New landing page",
                    "Build a full argument from interviews and offer notes.",
                  ],
                  [
                    "Message refresh",
                    "Find why existing copy sounds generic or unproven.",
                  ],
                  [
                    "Campaign variants",
                    "Adapt the core argument without losing brand voice.",
                  ],
                ].map(([a, b]) => (
                  <div key={a} className="border-l-2 border-primary/40 pl-4">
                    <h3 className="font-semibold text-foreground">{a}</h3>
                    <p className="mt-1 text-sm">{b}</p>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="What’s included">
              <div className="overflow-hidden rounded-lg border bg-surface">
                {included.map(([a, b]) => (
                  <div
                    className="grid gap-1 border-b p-4 last:border-0 sm:grid-cols-[12rem_1fr]"
                    key={a}
                  >
                    <code className="font-mono text-xs text-foreground">
                      {a}
                    </code>
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Example input and output">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="eyebrow">Input</p>
                  <pre className="mt-2 whitespace-pre-wrap rounded-lg border bg-surface p-4 font-mono text-xs leading-6">
                    Product: incident review tool{`\n`}Audience: engineering
                    leads{`\n`}Evidence: “We lose the thread between Slack and
                    the postmortem.”
                  </pre>
                </div>
                <div>
                  <p className="eyebrow">Output excerpt</p>
                  <div className="mt-2 rounded-lg bg-foreground p-5 text-background">
                    <p className="editorial text-2xl">
                      Keep the incident story intact.
                    </p>
                    <p className="mt-2 text-sm text-background/70">
                      Turn scattered timelines, decisions, and follow-ups into
                      one review your team can trust.
                    </p>
                  </div>
                </div>
              </div>
            </Section>
            <Section title="Installation and usage">
              <ol className="space-y-4">
                {[
                  "Download and unzip the package.",
                  "Add the folder to your Claude Skills or Codex skills directory.",
                  "Provide the research-intake template and ask the skill to build a messaging map.",
                  "Review cited evidence before approving a draft.",
                ].map((x, i) => (
                  <li key={x} className="flex gap-4">
                    <span className="font-mono text-xs text-primary">
                      0{i + 1}
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
              <pre className="mt-6 overflow-x-auto rounded-lg bg-foreground p-4 font-mono text-xs text-background">
                cp -R conversion-copywriter ~/.agents/skills/
              </pre>
            </Section>
            <Section title="Version history">
              <div className="space-y-6">
                {versions.map((v, i) => (
                  <div
                    key={v.version}
                    className="grid gap-2 sm:grid-cols-[7rem_9rem_1fr]"
                  >
                    <code className="font-mono text-xs text-foreground">
                      v{v.version}
                      {i === 0 && " · latest"}
                    </code>
                    <span className="text-xs">{v.date}</span>
                    <p className="text-sm">{v.notes}</p>
                  </div>
                ))}
              </div>
            </Section>
            <Section title={`Reviews · ${product.rating}`} id="reviews">
              <div className="space-y-6">
                {reviews.map((r) => (
                  <article key={r.id} className="border-b pb-6">
                    <div className="flex justify-between gap-3">
                      <div>
                        <strong className="text-sm text-foreground">
                          {r.author}
                        </strong>
                        <p className="mt-1 text-xs">
                          <Rating rating={r.rating} /> · {r.date}
                        </p>
                      </div>
                      {r.verifiedPurchase && (
                        <Badge variant="success">Verified purchase</Badge>
                      )}
                    </div>
                    <p className="mt-3 max-w-2xl">{r.body}</p>
                  </article>
                ))}
              </div>
            </Section>
            <Section title="About the creator">
              <div className="rounded-lg border bg-surface p-6">
                <CreatorIdentity creator={product.creator} />
                <p className="mt-4 max-w-2xl">
                  {product.creator.bio} Every release includes examples, a
                  migration-aware changelog, and direct support for documented
                  issues.
                </p>
                <p className="mt-4 text-xs font-semibold text-foreground">
                  6 products · 12,800 followers · Replies within 2 days
                </p>
              </div>
            </Section>
          </div>
          <aside>
            <div className="sticky top-24 space-y-5 rounded-xl border border-border-strong bg-surface-raised p-5 shadow-soft">
              <div>
                <p className="text-xs text-muted-foreground">
                  One-time license
                </p>
                <p className="mt-1 text-3xl font-semibold">$38</p>
              </div>
              <ProductActions />
              <div className="border-t pt-5">
                <p className="eyebrow">Compatibility</p>
                <div className="mt-3">
                  <CompatibilityBadges
                    compatibility={product.compatibility}
                    limit={5}
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Models: Claude 4, GPT-5
                </p>
              </div>
              <TrustRow
                icon={Download}
                title="Requirements"
                text="Skills support or file upload"
              />
              <TrustRow
                icon={KeyRound}
                title="Permissions"
                text="No network, account, or data access"
              />
              <TrustRow
                icon={ShieldCheck}
                title="Safety verification"
                text="Package scan passed · Aug 18"
                good
              />
              <TrustRow
                icon={FileText}
                title="License"
                text="1 user · commercial use"
              />
              <TrustRow
                icon={RefreshCw}
                title="Updates"
                text="12 months included"
              />
              <TrustRow
                icon={LockKeyhole}
                title="Refunds"
                text="14 days if not downloaded"
              />
            </div>
          </aside>
        </div>
        <section className="mt-12 border-t pt-12">
          <p className="eyebrow">Keep building</p>
          <h2 className="editorial mt-2 text-4xl">Related products</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {products.slice(3, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Meta({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof RefreshCw;
}) {
  return (
    <div className="bg-surface p-4">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon size={14} />
        {label}
      </p>
      <p className="mt-1 font-mono text-xs font-semibold">{value}</p>
    </div>
  );
}
function TrustRow({
  icon: Icon,
  title,
  text,
  good,
}: {
  icon: typeof RefreshCw;
  title: string;
  text: string;
  good?: boolean;
}) {
  return (
    <div className="border-t pt-4">
      <p className="flex items-center gap-2 text-xs font-semibold">
        <Icon
          size={15}
          className={good ? "text-success" : "text-muted-foreground"}
        />
        {title}
        {good && <CheckCircle2 size={13} className="text-success" />}
      </p>
      <p className="mt-1 pl-6 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
