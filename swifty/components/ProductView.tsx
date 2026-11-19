"use client";
import { useState } from "react";
import { Product, fmt } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Img from "./Img";
import Footer from "./Footer";

export default function ProductView({ product: p }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(p.sizes[Math.floor(p.sizes.length / 2)]);
  const { add } = useCart();
  return (
    <main>
      <div className="grid min-w-0 grid-cols-1 gap-8 px-4 pb-20 pt-24 sm:gap-10 sm:px-5 sm:pt-28 md:grid-cols-2 md:px-10 md:pb-24">
        <div className="min-w-0">
          <div className="aspect-[3/4] w-full min-w-0 overflow-hidden bg-lin2">
            <Img key={active} src={p.images[active]} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto" data-lenis-prevent-wheel>
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setActive(i)} className={`h-24 w-20 shrink-0 overflow-hidden border-2 ${i === active ? "border-terra" : "border-transparent"}`}>
                <Img src={src} alt={`${p.name} vue ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0 md:sticky md:top-28 md:self-start">
          <p className="mb-2 text-xs tracking-[0.3em] text-terra">{p.category.toUpperCase()}</p>
          <h1 className="mb-3 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">{p.name}</h1>
          <p className="mb-6 text-2xl">{fmt(p.price)}</p>
          <p className="mb-4 max-w-lg text-pierre">{p.description}</p>
          <p className="mb-8 text-sm"><span className="text-pierre">Composition : </span>{p.material}</p>
          <button onClick={() => add(p, size)} className="mb-8 w-full bg-terra py-4 text-sm tracking-widest text-lin transition-colors hover:bg-terra2 md:w-auto md:px-16">AJOUTER AU PANIER</button>
          <p className="mb-3 text-sm">Taille</p>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`h-11 min-w-11 border px-3 text-sm transition-colors ${size === s ? "border-encre bg-encre text-lin" : "border-pierre/40 hover:border-terra"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
