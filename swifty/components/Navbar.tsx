"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const { count, setOpen } = useCart();
  useEffect(() => {
    const ctx = gsap.context(() => {
      let hidden = false;
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          const shouldHide = self.direction === 1 && self.scroll() > 120;
          if (self.direction === 0 || shouldHide === hidden) return;
          hidden = shouldHide;
          gsap.to(nav.current, { yPercent: hidden ? -100 : 0, duration: 0.45, ease: "power3.out" });
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <header ref={nav} className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 mix-blend-normal sm:px-5 sm:py-5 md:px-10">
      <Link href="/" className="font-display text-lg font-semibold tracking-[0.12em] sm:text-2xl sm:tracking-[0.2em]">SWIFTY</Link>
      <nav className="flex items-center gap-3 text-xs sm:gap-5 sm:text-sm md:gap-9">
        <Link href="/" className="hidden hover:text-terra sm:block">Accueil</Link>
        <Link href="/catalogue" className="hover:text-terra">Catalogue</Link>
        <Link href="/#boutiques" className="hidden hover:text-terra sm:block">Boutiques</Link>
        <button onClick={() => setOpen(true)} className="hover:text-terra">Panier ({count})</button>
      </nav>
    </header>
  );
}
