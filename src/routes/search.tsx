import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductGrid } from "@/components/store/ProductCard";
import { searchProducts } from "@/lib/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().catch("") }),
  head: () => ({
    meta: [
      { title: "Search groceries — GharMart" },
      { name: "description", content: "Search fresh groceries and daily essentials on GharMart." },
      { property: "og:title", content: "Search groceries — GharMart" },
      { property: "og:description", content: "Search fresh groceries and daily essentials on GharMart." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchProducts(q);
  return (
    <StoreLayout initialQuery={q}>
      <h1 className="text-2xl font-bold">{q ? <>Results for “{q}”</> : "Search GharMart"}</h1>
      <p className="text-sm text-muted-foreground">{q ? `${results.length} products found` : "Type something in the search bar above."}</p>
      <div className="mt-6">
        {q && results.length === 0 ? (
          <div className="rounded-2xl border bg-card p-10 text-center"><p className="text-4xl">🔍</p><p className="mt-2 font-semibold">Nothing found — try “dal” or “milk”.</p></div>
        ) : (
          <ProductGrid items={results} />
        )}
      </div>
    </StoreLayout>
  );
}
