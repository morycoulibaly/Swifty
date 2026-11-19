"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el.current, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el.current, "y", { duration: 0.4, ease: "power3" });
      const move = (e: MouseEvent) => { gsap.set(el.current, { opacity: 1 }); xTo(e.clientX); yTo(e.clientY); };
      const over = (e: MouseEvent) => {
        const hit = (e.target as HTMLElement).closest("a,button,input,select,[data-hover]");
        gsap.to(el.current, { scale: hit ? 2.4 : 1, backgroundColor: hit ? "rgba(200,90,50,0.15)" : "rgba(200,90,50,0)", duration: 0.3 });
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
    });
    return () => ctx.revert();
  }, []);
  return <div ref={el} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 hidden h-8 w-8 rounded-full border border-terra opacity-0 md:block" />;
}
