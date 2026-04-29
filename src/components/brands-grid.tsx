"use client";

import Image from "next/image";
import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  return (
    <motion.div
      className="relative flex items-center justify-center cursor-default bg-paper"
      style={{ height: "100px" }}
      initial="rest"
      whileHover="hovered"
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={140}
        height={56}
        style={{ height: "56px", width: "auto", objectFit: "contain", maxWidth: "100%" }}
      />
      <motion.div
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center bg-ink/80"
        aria-hidden="true"
      >
        <span className="text-sm font-medium text-paper select-none">{brand.name}</span>
      </motion.div>
    </motion.div>
  );
}

export function BrandsGrid() {
  const shuffled = useMemo(() => [...brands].sort(() => Math.random() - 0.5), []);
  const doubled = useMemo(() => [...shuffled, ...shuffled], [shuffled]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame: number;
    let paused = false;

    const tick = () => {
      if (!paused) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section
      className="px-8 md:px-24 py-16 md:py-32 bg-paper"
      id="brands"
      aria-labelledby="brands-heading"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <FadeIn>
          <h2
            id="brands-heading"
            className="text-5xl md:text-6xl font-headline italic mb-12 md:mb-20 text-ink"
          >
            Brands I&rsquo;ve helped grow
          </h2>
        </FadeIn>

        <div
          ref={scrollRef}
          className="overflow-x-hidden"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          <div
            className="grid grid-rows-2 grid-flow-col gap-4 md:gap-6"
            style={{ gridAutoColumns: "var(--card-w, 8rem)" }}
          >
            <style>{`
              @media (min-width: 768px) { :root { --card-w: 160px; } }
            `}</style>
            {doubled.map((brand, i) => (
              <BrandCard key={`${brand.name}-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
