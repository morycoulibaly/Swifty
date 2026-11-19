"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem { slug: string; name: string; price: number; image: string; size: string; qty: number }
interface Ctx {
  items: CartItem[]; open: boolean; setOpen: (v: boolean) => void;
  add: (p: Product, size?: string) => void; remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void; count: number; total: number;
}
const CartCtx = createContext<Ctx>(null as unknown as Ctx);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem("swifty-cart"); if (raw) setItems(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("swifty-cart", JSON.stringify(items)); }, [items, ready]);

  const add: Ctx["add"] = (p, size) => {
    const s = size || p.sizes[Math.floor(p.sizes.length / 2)];
    setItems((prev) => {
      const f = prev.find((i) => i.slug === p.slug && i.size === s);
      if (f) return prev.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { slug: p.slug, name: p.name, price: p.price, image: p.images[0], size: s, qty: 1 }];
    });
    setOpen(true);
  };
  const remove: Ctx["remove"] = (slug, size) => setItems((p) => p.filter((i) => !(i.slug === slug && i.size === size)));
  const setQty: Ctx["setQty"] = (slug, size, qty) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => !(i.slug === slug && i.size === size)) : p.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))));
  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.qty * i.price, 0);

  return <CartCtx.Provider value={{ items, open, setOpen, add, remove, setQty, count, total }}>{children}</CartCtx.Provider>;
}
