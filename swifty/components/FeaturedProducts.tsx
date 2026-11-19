import Link from "next/link";
import { byCategory, categories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="bg-lin px-5 py-24 md:px-10">
      <h2 className="mb-16 font-display text-5xl md:text-7xl">Pièces <em>phares</em></h2>
      {categories.map((c) => (
        <div key={c.name} className="mb-20">
          <h3 className="mb-6 border-b border-pierre/20 pb-3 font-display text-2xl text-terra">{c.name}</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {byCategory(c.name).slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Link href="/catalogue" className="bg-terra px-10 py-4 text-sm tracking-widest text-lin transition-colors hover:bg-terra2">VOIR PLUS</Link>
      </div>
    </section>
  );
}
