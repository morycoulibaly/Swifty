"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { heroImage } from "@/data/products";
import Img from "./Img";

export default function HeroReveal() {
  const sec = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const text = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(max-width: 767px)", () => {
      const s = sec.current!;
      const w = wrap.current!;
      const W = s.clientWidth;
      const H = s.clientHeight;
      const m = { x: W / 2, y: H / 2, r: Math.min(W, H) * 0.46 };
      const apply = () => { w.style.clipPath = `circle(${m.r}px at ${m.x}px ${m.y}px)`; };

      apply();
      gsap.set(title.current, { opacity: 1 });
      gsap.set(text.current!.children, { opacity: 1, y: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: s,
          start: "top top",
          end: "+=900",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      }).to(m, { r: Math.hypot(W, H), duration: 3, ease: "none", onUpdate: apply });

      return () => { w.style.clipPath = ""; };
    });

    media.add("(min-width: 768px)", () => {
      const s = sec.current!, w = wrap.current!;
      const W = s.clientWidth, H = s.clientHeight;
      const m = { x: W / 2, y: H / 2, r: Math.min(W, H) * 0.17 };
      const apply = () => { w.style.clipPath = `circle(${m.r}px at ${m.x}px ${m.y}px)`; };
      apply();
      const onMove = (e: MouseEvent) => {
        const b = s.getBoundingClientRect();
        gsap.to(m, { x: e.clientX - b.left, y: e.clientY - b.top, duration: 0.6, ease: "power3", overwrite: "auto", onUpdate: apply });
      };
      s.addEventListener("mousemove", onMove);
      const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: "top top", end: "+=3500", scrub: 1, pin: true, invalidateOnRefresh: true } });
      tl.to(m, { r: Math.hypot(W, H), duration: 3, ease: "none", onUpdate: apply })
        .to(title.current, { opacity: 0, duration: 1 }, 2)
        .to(w, { width: "50%", duration: 2, ease: "power2.inOut" })
        .fromTo(text.current!.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.5, duration: 1 }, "<0.5")
        .to({}, { duration: 1 });
      return () => s.removeEventListener("mousemove", onMove);
    });

    return () => media.revert();
  }, []);
  return (
    <section id="accueil" ref={sec} className="relative h-[100svh] min-h-[600px] w-full scroll-mt-24 overflow-hidden bg-lin md:h-screen md:min-h-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 ref={title} className="whitespace-nowrap font-display text-[24vw] font-semibold leading-none tracking-tight text-encre sm:text-[27.5vw]">SWIFTY</h1>
      </div>
      <div ref={wrap} className="absolute right-0 top-0 z-10 h-full w-full">
        <Img src={heroImage} alt="Tenue SWIFTY, collection éditoriale" className="h-full w-full object-cover" />
      </div>
      <div ref={text} className="absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-end gap-3 bg-gradient-to-t from-encre/80 via-encre/25 to-transparent px-5 pb-12 pt-32 text-lin md:w-1/2 md:justify-center md:gap-8 md:bg-none md:p-16 md:text-encre">
        {["Des matières nobles, travaillées avec lenteur.", "Des coupes amples, des teintes de terre, du temps.", "SWIFTY habille ceux qui préfèrent durer plutôt que paraître."].map((t, i) => (
          <p key={i} className="max-w-xl font-display text-base italic leading-tight sm:text-xl md:text-4xl md:opacity-0">{t}</p>
        ))}
      </div>
    </section>
  );
}
