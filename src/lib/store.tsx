import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./catalog";

export type Location = { pincode: string; area: string; city: string; eta: number; address?: string };
type Ctx = {
  cart: Record<string, number>;
  items: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  mrpTotal: number;
  setQty: (id: string, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  location: Location | null;
  setLocation: (l: Location) => void;
  locationOpen: boolean;
  setLocationOpen: (v: boolean) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [location, setLoc] = useState<Location | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("gm_cart");
      const l = localStorage.getItem("gm_loc");
      if (c) setCart(JSON.parse(c));
      if (l) setLoc(JSON.parse(l));
    } catch {}
  }, []);
  useEffect(() => localStorage.setItem("gm_cart", JSON.stringify(cart)), [cart]);

  const value = useMemo<Ctx>(() => {
    const items = Object.entries(cart)
      .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
      .filter((i) => i.product && i.qty > 0);
    return {
      cart,
      items,
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal: items.reduce((a, i) => a + i.qty * i.product.price, 0),
      mrpTotal: items.reduce((a, i) => a + i.qty * i.product.mrp, 0),
      setQty: (id, qty) =>
        setCart((c) => {
          const n = { ...c };
          if (qty <= 0) delete n[id];
          else n[id] = Math.min(qty, 10);
          return n;
        }),
      cartOpen,
      setCartOpen,
      location,
      setLocation: (l) => {
        setLoc(l);
        localStorage.setItem("gm_loc", JSON.stringify(l));
      },
      locationOpen,
      setLocationOpen,
    };
  }, [cart, cartOpen, location, locationOpen]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}
