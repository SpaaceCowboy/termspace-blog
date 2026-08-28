"use client";
import { useMemo, useState } from "react";
import {
  Filter,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { products, categories } from "@/lib/mock-data";
import type { ProductType } from "@/lib/types";
import { ProductCard } from "@/components/marketplace/product-card";
import { EmptyState } from "@/components/patterns/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const types: (ProductType | "All")[] = [
  "All",
  "Prompt",
  "Prompt pack",
  "Skill",
  "Agent",
  "Workflow",
  "MCP server",
  "Developer utility",
];
export function DiscoveryExperience() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("All");
  const [category, setCategory] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [price, setPrice] = useState("All");
  const [verified, setVerified] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const result = useMemo(() => {
      const r = products.filter(
      (p) =>
        (!query ||
          `${p.name} ${p.outcome} ${p.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (type === "All" || p.type === type) &&
        (category === "All" || p.category === category) &&
        (platform === "All" ||
          p.compatibility.platforms.includes(platform as never)) &&
        (price === "All" ||
          (price === "Free"
            ? p.pricing.model === "free"
            : p.pricing.model !== "free")) &&
        (!verified || p.verified) &&
        p.rating >= minRating,
    );
    return [...r].sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : sort === "newest"
          ? b.updatedAt.localeCompare(a.updatedAt)
          : sort === "price-low"
            ? a.pricing.amount - b.pricing.amount
            : Number(b.featured) - Number(a.featured) ||
              b.usageCount - a.usageCount,
    );
  }, [query, type, category, platform, price, verified, minRating, sort]);
  const reset = () => {
    setQuery("");
    setType("All");
    setCategory("All");
    setPlatform("All");
    setPrice("All");
    setVerified(false);
    setMinRating(0);
  };
  const active = [
    type !== "All" && type,
    category !== "All" && category,
    platform !== "All" && platform,
    price !== "All" && price,
    verified && "Verified",
    minRating > 0 && `${minRating}+ stars`,
  ].filter(Boolean) as string[];
  const filters = (
    <div className="space-y-7">
      <FilterGroup
        label="Category"
        options={categories}
        value={category}
        setValue={setCategory}
      />
      <FilterGroup
        label="Compatibility"
        options={[
          "All",
          "Claude",
          "ChatGPT",
          "Codex",
          "Cursor",
          "VS Code",
          "Gemini",
        ]}
        value={platform}
        setValue={setPlatform}
      />
      <FilterGroup
        label="Pricing"
        options={["All", "Free", "Paid"]}
        value={price}
        setValue={setPrice}
      />
      <FilterGroup
        label="Rating"
        options={["Any", "4.5+", "4.8+"]}
        value={minRating === 0 ? "Any" : `${minRating}+`}
        setValue={(v) => setMinRating(v === "Any" ? 0 : parseFloat(v))}
      />
      <div className="flex items-center justify-between">
        <label htmlFor="verified" className="text-sm font-medium">
          Verified only
        </label>
        <Switch.Root
          id="verified"
          checked={verified}
          onCheckedChange={setVerified}
          className="h-6 w-11 rounded-full bg-border-strong p-0.5 data-[state=checked]:bg-primary"
        >
          <Switch.Thumb className="block size-5 rounded-full bg-background shadow transition-transform data-[state=checked]:translate-x-5" />
        </Switch.Root>
      </div>
    </div>
  );
  return (
    <main className="container-page py-10">
      <div className="max-w-2xl">
        <p className="eyebrow">Marketplace</p>
        <h1 className="editorial mt-2 text-5xl">Find your next advantage.</h1>
        <p className="mt-3 text-muted-foreground">
          Search trustworthy, reusable products made to improve real AI work.
        </p>
      </div>
      <div className="relative mt-8 max-w-4xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product, outcome, or creator…"
          className="h-14 pl-12 text-base"
        />
      </div>
      <div
        className="mt-6 flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Product type"
      >
        {types.map((t) => (
          <button
            role="tab"
            aria-selected={type === t}
            key={t}
            onClick={() => setType(t)}
            className={cn(
              "min-h-10 shrink-0 border-b-2 px-3 text-sm font-medium",
              type === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[14rem_1fr]">
        <aside className="hidden lg:block">
          <div className="flex items-center gap-2 border-b pb-4 font-semibold">
            <SlidersHorizontal size={17} />
            Filters
          </div>
          <div className="mt-6">
            {filters}
          </div>
        </aside>
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm">
                <strong>{result.length}</strong> products
              </p>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button variant="secondary" size="sm" className="lg:hidden">
                    <Filter size={15} /> Filters{" "}
                    {active.length > 0 && `(${active.length})`}
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
                  <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[min(90vw,24rem)] overflow-y-auto bg-background p-6 shadow-lift">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="editorial text-2xl">
                        Filters
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Close filters"
                        >
                          <X />
                        </Button>
                      </Dialog.Close>
                    </div>
                    <div className="mt-7">
                      {filters}
                    </div>
                    <Dialog.Close asChild>
                      <Button className="mt-8 w-full">
                        Show {result.length} results
                      </Button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
            <div className="flex gap-2">
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-h-10 rounded-md border bg-surface px-3 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="newest">Recently updated</option>
                <option value="price-low">Price: low to high</option>
              </select>
              <div className="flex rounded-md border bg-surface p-0.5">
                <button
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={cn(
                    "size-9 rounded",
                    view === "grid" && "bg-muted",
                  )}
                >
                  <Grid2X2 size={16} className="mx-auto" />
                </button>
                <button
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={cn(
                    "size-9 rounded",
                    view === "list" && "bg-muted",
                  )}
                >
                  <List size={17} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>
          {active.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {active.map((x) => (
                <Badge key={x} variant="outline">
                  {x}
                </Badge>
              ))}
              <button
                onClick={reset}
                className="text-xs font-semibold text-primary"
              >
                Clear all
              </button>
            </div>
          )}
          <div
            className={cn(
              "mt-6 grid gap-5",
              view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
            )}
          >
            {result.length ? (
              result.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  variant={view === "list" ? "list" : "compact"}
                />
              ))
            ) : (
              <EmptyState onReset={reset} />
            )}
          </div>
          {result.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Button variant="secondary">Load more products</Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
function FilterGroup({
  label,
  options,
  value,
  setValue,
}: {
  label: string;
  options: (string | number)[];
  value: string | number;
  setValue: (x: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">{label}</legend>
      <div className="space-y-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex min-h-8 cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <input
              type="radio"
              name={label}
              value={o}
              checked={String(value) === String(o)}
              onChange={() => setValue(String(o))}
              className="size-4 accent-[var(--primary)]"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
