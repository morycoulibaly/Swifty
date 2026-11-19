"use client";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { fmt } from "@/data/products";
import Img from "./Img";

export default function CartDrawer() {
  const { items, open, setOpen, remove, setQty, total } = useCart();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Fermer le panier"
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-[70] bg-encre/40 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal={open}
        aria-labelledby="cart-drawer-title"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-lin p-5 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-6 ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="cart-drawer-title" className="font-display text-3xl">Votre panier</h2>
          <button type="button" onClick={() => setOpen(false)} className="text-sm text-pierre hover:text-terra">Fermer</button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto" data-lenis-prevent>
          {items.length === 0 && <p className="text-pierre">Votre panier est vide.</p>}
          {items.map((i) => (
            <div key={i.slug + i.size} className="flex gap-4">
              <Img src={i.image} alt={i.name} className="h-24 w-20 object-cover" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{i.name}</p>
                <p className="text-pierre">Taille {i.size} · {fmt(i.price)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button type="button" onClick={() => setQty(i.slug, i.size, i.qty - 1)} aria-label={`Retirer une unité de ${i.name}`} className="h-6 w-6 border border-pierre/40">−</button>
                  <span>{i.qty}</span>
                  <button type="button" onClick={() => setQty(i.slug, i.size, i.qty + 1)} aria-label={`Ajouter une unité de ${i.name}`} className="h-6 w-6 border border-pierre/40">+</button>
                  <button type="button" onClick={() => remove(i.slug, i.size)} className="ml-auto text-pierre hover:text-terra">Retirer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-pierre/20 pt-5">
          <div className="mb-4 flex justify-between"><span>Sous-total</span><span className="font-medium">{fmt(total)}</span></div>
          <button type="button" className="w-full bg-terra py-4 text-sm tracking-widest text-lin transition-colors hover:bg-terra2">COMMANDER</button>
        </div>
      </aside>
    </>
  );
}
