import { ShoppingBag, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { QtyControl } from "./ProductCard";

const FREE_DELIVERY = 199;

export function CartDrawer() {
  const { cartOpen, setCartOpen, items, subtotal, mrpTotal, location, setLocationOpen } = useStore();
  const delivery = subtotal >= FREE_DELIVERY || subtotal === 0 ? 0 : 25;
  const handling = subtotal ? 4 : 0;
  const total = subtotal + delivery + handling;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="font-display text-xl">Your jhola</SheetTitle>
          {location && (
            <p className="flex items-center gap-1 text-sm text-leaf"><Zap className="size-4" /> Delivery in {location.eta} minutes</p>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <p className="font-display text-lg">Your jhola is empty</p>
            <p className="text-sm text-muted-foreground">Add daily essentials and we'll bring them to your door.</p>
            <Button onClick={() => setCartOpen(false)}>Start shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {subtotal < FREE_DELIVERY && (
                <div className="rounded-xl bg-accent/60 p-3 text-sm">
                  Add <b>{inr(FREE_DELIVERY - subtotal)}</b> more for free delivery
                  <div className="mt-2 h-1.5 rounded-full bg-card"><div className="h-full rounded-full bg-primary" style={{ width: `${(subtotal / FREE_DELIVERY) * 100}%` }} /></div>
                </div>
              )}
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                  <div className="grid size-14 place-items-center rounded-lg bg-secondary/60 text-3xl">{product.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.unit}</p>
                    <p className="text-sm font-bold">{inr(product.price * qty)}</p>
                  </div>
                  <QtyControl product={product} size="sm" />
                </div>
              ))}
              <div className="space-y-2 rounded-xl border bg-card p-4 text-sm">
                <Row label="Items total (MRP)" value={inr(mrpTotal)} />
                <Row label="Product discount" value={`−${inr(mrpTotal - subtotal)}`} className="text-leaf" />
                <Row label="Delivery fee" value={delivery ? inr(delivery) : "FREE"} />
                <Row label="Handling fee" value={inr(handling)} />
                <div className="border-t pt-2"><Row label="To pay" value={inr(total)} bold /></div>
              </div>
            </div>
            <div className="border-t p-4">
              {location ? (
                <Button className="h-12 w-full justify-between text-base font-semibold">
                  <span>{inr(total)} · Total</span><span>Proceed to checkout →</span>
                </Button>
              ) : (
                <Button className="h-12 w-full text-base font-semibold" onClick={() => setLocationOpen(true)}>Add delivery location to continue</Button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, bold, className = "" }: { label: string; value: string; bold?: boolean; className?: string }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-bold" : ""} ${className}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
