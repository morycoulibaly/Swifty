"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { categories, byCategory } from "@/data/products";
import Img from "./Img";

export default function CategoryShowcase() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLElement>(".cat-img");
      const txts = gsap.utils.toArray<HTMLElement>(".cat-txt");
      gsap.set(imgs.slice(1), { xPercent: 100 });
      gsap.set(txts.slice(1), { opacity: 0, y: 30 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec.current,
          start: "top top",
          end: () => {
            const distancePerSlide = window.matchMedia("(max-width: 767px)").matches ? 600 : 1300;
            return `+=${(categories.length - 1) * distancePerSlide}`;
          },
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      for (let i = 1; i < imgs.length; i++) {
        const at = (i - 1) * 1.6;
        tl.to(imgs[i - 1], { xPercent: -100, duration: 1, ease: "power2.inOut" }, at)
          .to(imgs[i], { xPercent: 0, duration: 1, ease: "power2.inOut" }, at)
          .to(txts[i - 1], { opacity: 0, y: -30, duration: 0.5 }, at)
          .to(txts[i], { opacity: 1, y: 0, duration: 0.5 }, at + 0.5);
      }
      tl.to({}, { duration: 0.4 });
    }, sec);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="relative grid h-[100svh] min-h-[680px] grid-cols-1 bg-lin2 md:h-screen md:min-h-0 md:grid-cols-2">
      <div className="relative z-10 order-2 h-[40svh] min-h-[280px] md:order-1 md:h-full md:min-h-0">
        {categories.map((c, i) => (
          <div key={c.name} className="cat-txt absolute inset-0 flex flex-col justify-center px-6 md:px-16">
            <span className="mb-2 text-[10px] tracking-[0.2em] text-terra sm:mb-3 sm:text-xs sm:tracking-[0.3em]">0{i + 1} / 0{categories.length} — {c.name.toUpperCase()}</span>
            <h2 className="mb-3 font-display text-3xl leading-none sm:text-4xl md:mb-4 md:text-7xl">{c.title}</h2>
            <p className="max-w-md text-sm text-pierre sm:text-base">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="relative order-1 h-[60svh] min-h-[400px] overflow-hidden md:order-2 md:h-full md:min-h-0">
        {categories.map((c) => (
          <div key={c.name} className="cat-img absolute inset-0">
            <Img src={byCategory(c.name)[0].images[0]} alt={c.name} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
