import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ShieldCheck, Truck } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductGrid } from "@/components/store/ProductCard";
import { categories, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GharMart — Groceries & daily essentials in minutes" },
      { name: "description", content: "Fresh sabzi, dairy, atta, masala and home essentials delivered from your neighbourhood in minutes." },
      { property: "og:title", content: "GharMart — Groceries & daily essentials in minutes" },
      { property: "og:description", content: "Fresh sabzi, dairy, atta, masala and home essentials delivered in minutes." },
    ],
  }),
  component: Home,
});

function Home() {
  const { location, setLocationOpen } = useStore();
  const featured = products.filter((p) => p.featured);
  return (
    <StoreLayout>
      <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10">
        <div className="rangoli-bg absolute inset-0 opacity-40" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-block rounded-full bg-turmeric px-3 py-1 text-xs font-bold text-foreground">
              {location ? `⚡ ${location.eta}-min delivery to ${location.area}` : "⚡ Delivery in 10–16 minutes"}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-6xl">Ghar ka saaman,<br />minutes mein.</h1>
            <p className="mt-3 max-w-md text-primary-foreground/85">Fresh sabzi, doodh, atta and everyday essentials — packed by your neighbourhood store, at honest prices.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {!location && (
                <button onClick={() => setLocationOpen(true)} className="rounded-xl bg-card px-5 py-3 font-semibold text-foreground shadow-[4px_4px_0_var(--color-turmeric)]">Enter your pincode</button>
              )}
              <Link to="/category/$slug" params={{ slug: "fruits-vegetables" }} className="rounded-xl border-2 border-primary-foreground/60 px-5 py-3 font-semibold">Shop fresh sabzi</Link>
            </div>
          </div>
          <div className="hidden grid-cols-3 gap-3 text-5xl md:grid">
            {["🥭", "🥛", "🌶️", "🍅", "🌾", "☕"].map((e, i) => (
              <div key={i} className="grid aspect-square place-items-center rounded-2xl bg-card/15 backdrop-blur" style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 4}deg)` }}>{e}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-3 text-xs sm:text-sm">
        {[[Clock, "Minutes, not hours"], [Truck, "Free delivery over ₹199"], [ShieldCheck, "Freshness guaranteed"]].map(([Icon, t], i) => {
          const I = Icon as typeof Clock;
          return <div key={i} className="flex items-center gap-2 rounded-xl border bg-card p-3"><I className="size-5 shrink-0 text-leaf" /><span className="font-medium">{t as string}</span></div>;
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Shop by category</h2>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {categories.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group text-center">
              <div className={`grid aspect-square place-items-center rounded-2xl ${c.tint} text-4xl transition group-hover:-translate-y-1`}>{c.emoji}</div>
              <p className="mt-2 text-xs font-semibold leading-tight">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Rozana ki zaroorat</h2>
            <p className="text-sm text-muted-foreground">Daily essentials at today's best prices</p>
          </div>
        </div>
        <div className="mt-4"><ProductGrid items={featured} /></div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-leaf p-6 text-leaf-foreground">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Mandi fresh</p>
          <h3 className="mt-2 text-2xl font-bold">Sabzi sourced every morning</h3>
          <Link to="/category/$slug" params={{ slug: "fruits-vegetables" }} className="mt-4 inline-block rounded-lg bg-card px-4 py-2 text-sm font-semibold text-foreground">Shop now</Link>
        </div>
        <div className="rounded-3xl bg-turmeric p-6 text-foreground">
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">Masala dabba</p>
          <h3 className="mt-2 text-2xl font-bold">Up to 20% off spices & oils</h3>
          <Link to="/category/$slug" params={{ slug: "masala-oil" }} className="mt-4 inline-block rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background">Explore</Link>
        </div>
      </section>
    </StoreLayout>
  );
}
