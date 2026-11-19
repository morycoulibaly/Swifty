"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      const p = { v: 0 };
      gsap.timeline({ onComplete: () => { document.body.style.overflow = ""; setDone(true); } })
        .to(p, { v: 100, duration: 2.2, ease: "power2.inOut", onUpdate: () => { if (fill.current) fill.current.style.clipPath = `inset(0 ${100 - p.v}% 0 0)`; } })
        .to(root.current, { opacity: 0, duration: 0.8, ease: "power2.out" }, "+=0.2");
    });
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);
  if (done) return null;
  const word = "font-display text-[24vw] font-semibold leading-none tracking-wide";
  return (
    <div ref={root} className="fixed inset-0 z-[95] flex items-center justify-center bg-lin">
      <div className="relative">
        <span className={`${word} text-encre/10`}>SWIFTY</span>
        <span ref={fill} className={`${word} absolute inset-0 text-terra`} style={{ clipPath: "inset(0 100% 0 0)" }}>SWIFTY</span>
      </div>
    </div>
  );
}
