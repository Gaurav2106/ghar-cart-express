import { Minus, Plus } from "lucide-react";
import { discountPct, inr, unitPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function QtyControl({ product, size = "md" }: { product: Product; size?: "sm" | "md" }) {
  const { cart, setQty } = useStore();
  const qty = cart[product.id] ?? 0;
  const h = size === "sm" ? "h-8" : "h-9";
  if (!qty)
    return (
      <button
        onClick={() => setQty(product.id, 1)}
        className={`${h} rounded-lg border-2 border-leaf bg-card px-4 text-sm font-bold text-leaf transition hover:bg-leaf hover:text-leaf-foreground`}
      >
        ADD
      </button>
    );
  return (
    <div className={`${h} flex items-center gap-1 rounded-lg bg-leaf px-1 text-leaf-foreground`}>
      <button aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)} className="grid size-7 place-items-center">
        <Minus className="size-4" />
      </button>
      <span className="w-5 text-center text-sm font-bold">{qty}</span>
      <button aria-label="Increase" onClick={() => setQty(product.id, qty + 1)} className="grid size-7 place-items-center">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const off = discountPct(product);
  return (
    <div className="group relative flex flex-col rounded-2xl border bg-card p-3 transition hover:-translate-y-0.5 hover:shadow-lg">
      {off > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-primary px-1.5 py-0.5 text-[11px] font-bold text-primary-foreground">
          {off}% OFF
        </span>
      )}
      <div className="grid aspect-square place-items-center rounded-xl bg-secondary/60 text-6xl transition group-hover:scale-[1.02]">
        <span aria-hidden>{product.emoji}</span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
        {product.veg && <span className="grid size-3 place-items-center border border-leaf"><span className="size-1.5 rounded-full bg-leaf" /></span>}
        {product.brand}
      </div>
      <h3 className="mt-0.5 line-clamp-2 min-h-10 font-sans text-sm font-semibold leading-tight">{product.name}</h3>
      <div className="mt-1 text-xs text-muted-foreground">
        {product.unit} · <span>{unitPrice(product)}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <div className="text-base font-bold">{inr(product.price)}</div>
          {off > 0 && <div className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</div>}
        </div>
        <QtyControl product={product} />
      </div>
    </div>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
