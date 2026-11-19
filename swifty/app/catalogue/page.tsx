"use client";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const filters = ["Tout", "T-shirts", "Pantalons", "Pulls"] as const;

export default function Catalogue() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof filters)[number]>("Tout");
  const [sort, setSort] = useState("new");
  const { count, setOpen } = useCart();
  const list = useMemo(() => {
    const r = products.filter((p) => (cat === "Tout" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "desc") r.sort((a, b) => b.price - a.price);
    else r.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return r;
  }, [q, cat, sort]);
  return (
    <main>
      <div id="catalogue" className="scroll-mt-24 min-h-screen px-5 pb-24 pt-32 md:px-10">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl">Catalogue</h1>
          <button onClick={() => setOpen(true)} className="self-start border border-encre px-5 py-2 text-sm hover:border-terra hover:text-terra sm:self-auto">Panier ({count})</button>
        </div>
        <div className="mb-10 flex flex-col gap-5 border-y border-pierre/20 py-5 md:flex-row md:items-center">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un article…" className="flex-1 bg-transparent outline-none placeholder:text-pierre" />
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setCat(f)} className={`px-4 py-2 text-sm transition-colors ${cat === f ? "bg-encre text-lin" : "bg-lin2 hover:bg-terra hover:text-lin"}`}>{f}</button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-lin2 px-3 py-2 text-sm outline-none">
            <option value="new">Nouveautés</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>
        {list.length === 0 && <p className="text-pierre">Aucun article ne correspond à votre recherche.</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
      <Footer />
    </main>
  );
}
