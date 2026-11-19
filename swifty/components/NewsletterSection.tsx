"use client";
import { useState } from "react";
export default function NewsletterSection() {
  const [sent, setSent] = useState(false);
  return (
    <section className="grid gap-12 bg-lin px-5 py-24 md:grid-cols-2 md:px-10">
      <div>
        <h2 className="mb-5 font-display text-5xl md:text-6xl">Le journal <em>SWIFTY</em></h2>
        <p className="max-w-md text-pierre">Nouvelles pièces, coulisses d'atelier et invitations privées. Une lettre rare, jamais bavarde.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5 self-end">
        <input required placeholder="Nom" className="border-b border-pierre/40 bg-transparent py-3 outline-none focus:border-terra" />
        <input required type="email" placeholder="Email" className="border-b border-pierre/40 bg-transparent py-3 outline-none focus:border-terra" />
        <button className="mt-3 w-fit bg-terra px-10 py-4 text-sm tracking-widest text-lin transition-colors hover:bg-terra2">S'INSCRIRE</button>
        {sent && <p className="text-sm text-terra">Merci, vous êtes bien inscrit(e) au journal SWIFTY.</p>}
      </form>
    </section>
  );
}
