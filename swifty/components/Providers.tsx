"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CartProvider } from "@/context/CartContext";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return (
    <CartProvider>
      <div className="has-cursor">
        <div className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.03]" aria-hidden />
        <CustomCursor />
        <Navbar />
        <CartDrawer />
        {children}
      </div>
    </CartProvider>
  );
}
