import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Search, ShoppingBag, User, Zap } from "lucide-react";
import { useState } from "react";
import { categories, inr } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-extrabold text-primary-foreground shadow-[3px_3px_0_var(--color-turmeric)]">घ</span>
      <span className="font-display text-xl font-extrabold tracking-tight">Ghar<span className="text-primary">Mart</span></span>
    </Link>
  );
}

export function SiteHeader({ initialQuery = "" }: { initialQuery?: string | undefined }) {
  const { location, setLocationOpen, count, subtotal, setCartOpen } = useStore();
  const [q, setQ] = useState(initialQuery);
  const navigate = useNavigate();

  const search = (
    <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/search", search: { q } }); }} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder='Search "atta", "paneer", "chai"…'
        className="h-11 w-full rounded-xl border bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
    </form>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Logo />
        <button onClick={() => setLocationOpen(true)} className="hidden min-w-0 flex-col items-start border-l pl-4 text-left md:flex">
          <span className="flex items-center gap-1 font-display text-sm font-bold">
            <Zap className="size-4 text-primary" /> {location ? `Delivery in ${location.eta} mins` : "Set delivery location"}
          </span>
          <span className="flex max-w-56 items-center gap-1 truncate text-xs text-muted-foreground">
            {location ? `${location.area}, ${location.city} · ${location.pincode}` : "Enter pincode"} <ChevronDown className="size-3" />
          </span>
        </button>
        <div className="hidden flex-1 md:flex">{search}</div>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/account" className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary sm:flex">
            <User className="size-4" /> Account
          </Link>
          <button onClick={() => setCartOpen(true)} className="flex h-11 items-center gap-2 rounded-xl bg-leaf px-3 font-semibold text-leaf-foreground">
            <ShoppingBag className="size-5" />
            {count ? <span className="text-left text-xs leading-tight">{count} items<br /><b className="text-sm">{inr(subtotal)}</b></span> : <span className="text-sm">Cart</span>}
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <button onClick={() => setLocationOpen(true)} className="mb-2 flex items-center gap-1 text-xs">
          <Zap className="size-3.5 text-primary" />
          <b>{location ? `${location.eta} mins` : "Set location"}</b>
          <span className="truncate text-muted-foreground">{location ? `· ${location.area}, ${location.city}` : "· Enter pincode"}</span>
          <ChevronDown className="size-3" />
        </button>
        {search}
      </div>
      <nav className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2">
        {categories.map((c) => (
          <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium hover:bg-secondary">
            {c.emoji} {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div><Logo /><p className="mt-3 text-sm text-muted-foreground">Ghar ka saaman, minutes mein. Fresh groceries and daily essentials delivered from your neighbourhood store.</p></div>
        <div className="text-sm"><p className="mb-2 font-semibold">Shop</p>{categories.slice(0, 4).map((c) => <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="block py-0.5 text-muted-foreground hover:text-foreground">{c.name}</Link>)}</div>
        <div className="text-sm"><p className="mb-2 font-semibold">GharMart</p><Link to="/account" className="block py-0.5 text-muted-foreground hover:text-foreground">My account</Link><Link to="/admin" className="block py-0.5 text-muted-foreground hover:text-foreground">Staff dashboard</Link></div>
      </div>
      <p className="pb-6 text-center text-xs text-muted-foreground">© 2026 GharMart. Prices inclusive of all taxes.</p>
    </footer>
  );
}
