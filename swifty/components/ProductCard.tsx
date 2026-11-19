"use client";
import Link from "next/link";
import { Product, fmt } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Img from "./Img";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-lin2">
        <Link href={`/produit/${p.slug}`} aria-label={p.name}>
          <Img src={p.images[0]} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0" />
          <Img src={p.images[1]} alt={`${p.name} — autre vue`} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
        </Link>
        <button
          onClick={() => add(p)}
          className="absolute inset-x-3 bottom-3 translate-y-0 bg-terra py-3 text-xs tracking-widest text-lin transition-all duration-500 hover:bg-terra2 md:translate-y-[130%] md:group-hover:translate-y-0"
        >
          AJOUTER AU PANIER
        </button>
      </div>
      <Link href={`/produit/${p.slug}`} className="mt-3 flex items-baseline justify-between">
        <span className="font-display text-xl">{p.name}</span>
        <span className="text-sm text-pierre">{fmt(p.price)}</span>
      </Link>
      <p className="text-xs text-pierre">{p.category}</p>
    </div>
  );
}
