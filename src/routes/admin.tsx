import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Boxes, LayoutDashboard, Package, Settings, Store, Tag, Truck, Users } from "lucide-react";
import { categories, inr, products } from "@/lib/catalog";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Staff dashboard — GharMart" },
      { name: "description", content: "GharMart operations dashboard for products, orders and inventory." },
      { property: "og:title", content: "Staff dashboard — GharMart" },
      { property: "og:description", content: "GharMart operations dashboard for products, orders and inventory." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const nav = [
  [LayoutDashboard, "Overview"], [Package, "Orders"], [Boxes, "Products"], [Tag, "Coupons"],
  [Store, "Stores"], [Truck, "Delivery partners"], [Users, "Customers"], [BarChart3, "Analytics"], [Settings, "Settings"],
] as const;

function Admin() {
  const stats = [
    ["Today's orders", "—"], ["Revenue (today)", "—"], ["Active products", String(products.length)], ["Categories", String(categories.length)],
  ];
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground md:flex">
        <Link to="/" className="font-display text-xl font-extrabold">Ghar<span className="text-sidebar-primary">Mart</span> <span className="text-xs font-medium opacity-60">Ops</span></Link>
        <nav className="mt-8 space-y-1">
          {nav.map(([I, label], i) => (
            <div key={label} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${i === 0 ? "bg-sidebar-accent font-semibold" : "opacity-75"}`}>
              <I className="size-4" /> {label}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm">Preview layout — staff sign-in and role checks will be added before this goes live.</div>
        <h1 className="mt-6 text-3xl font-extrabold">Overview</h1>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(([k, v]) => (
            <div key={k} className="rounded-2xl border bg-card p-4"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-1 font-display text-2xl font-bold">{v}</p></div>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-bold">Catalog</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Unit</th><th className="p-3">Price</th><th className="p-3">MRP</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t"><td className="p-3 font-medium">{p.emoji} {p.name}</td><td className="p-3">{categories.find((c) => c.slug === p.category)?.name}</td><td className="p-3">{p.unit}</td><td className="p-3">{inr(p.price)}</td><td className="p-3">{inr(p.mrp)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
