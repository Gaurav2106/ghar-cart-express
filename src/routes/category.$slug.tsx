import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductGrid } from "@/components/store/ProductCard";
import { discountPct, getCategory, products } from "@/lib/catalog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Category";
    const d = `Buy ${name} online at GharMart with fast delivery and daily discounts.`;
    return { meta: [{ title: `${name} — GharMart` }, { name: "description", content: d }, { property: "og:title", content: `${name} — GharMart` }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => <StoreLayout><p className="py-20 text-center">Category not found.</p></StoreLayout>,
  errorComponent: () => <StoreLayout><p className="py-20 text-center">Couldn't load this category.</p></StoreLayout>,
  component: CategoryPage,
});

const sorts = { relevance: "Relevance", low: "Price: low to high", high: "Price: high to low", discount: "Biggest discount" } as const;

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [sort, setSort] = useState<keyof typeof sorts>("relevance");
  let items = products.filter((p) => p.category === category.slug);
  if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "discount") items = [...items].sort((a, b) => discountPct(b) - discountPct(a));
  return (
    <StoreLayout>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{category.emoji} {category.name}</h1>
          <p className="text-sm text-muted-foreground">{items.length} products</p>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="h-10 rounded-lg border bg-card px-3 text-sm">
          {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="mt-6"><ProductGrid items={items} /></div>
    </StoreLayout>
  );
}
