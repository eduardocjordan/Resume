"use client";

import Image from "next/image";
import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-32 md:w-40 flex items-center justify-center cursor-default bg-paper"
      style={{ height: "100px" }}
      initial="rest"
      whileHover="hovered"
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={140}
        height={56}
        style={{ height: "56px", width: "auto", objectFit: "contain", maxWidth: "80%" }}
      />
      <motion.div
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center bg-white/80"
        aria-hidden="true"
      >
        <span className="text-sm font-medium text-ink select-none">{brand.name}</span>
      </motion.div>
    </motion.div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function BrandsGrid() {
  const doubled1 = useMemo(() => { const s = shuffle(brands); return [...s, ...s]; }, []);
  const doubled2 = useMemo(() => { const s = shuffle(brands); return [...s, ...s]; }, []);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupRow = (el: HTMLDivElement, dir: 1 | -1): (() => void) => {
      if (dir === -1) el.scrollLeft = el.scrollWidth / 2;

      let paused = false;
      let frame: number;

      const tick = () => {
        if (!paused) {
          el.scrollLeft += 0.6 * dir;
          const mid = el.scrollWidth / 2;
          if (dir === 1 && el.scrollLeft >= mid) el.scrollLeft -= mid;
          if (dir === -1 && el.scrollLeft <= 0)  el.scrollLeft += mid;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      const pause  = () => { paused = true; };
      const resume = () => { paused = false; };
      el.addEventListener("mouseenter",  pause);
      el.addEventListener("mouseleave",  resume);
      el.addEventListener("touchstart",  pause,  { passive: true });
      el.addEventListener("touchend",    resume, { passive: true });

      return () => {
        cancelAnimationFrame(frame);
        el.removeEventListener("mouseenter",  pause);
        el.removeEventListener("mouseleave",  resume);
        el.removeEventListener("touchstart",  pause);
        el.removeEventListener("touchend",    resume);
      };
    };

    const cleanups: (() => void)[] = [];
    if (row1Ref.current) cleanups.push(setupRow(row1Ref.current,  1));
    if (row2Ref.current) cleanups.push(setupRow(row2Ref.current, -1));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const rowStyle: React.CSSProperties = { scrollbarWidth: "none", WebkitOverflowScrolling: "touch" };

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

        <div className="space-y-4 md:space-y-6">
          {/* Row 1 — scrolls left */}
          <div ref={row1Ref} className="overflow-x-auto" style={rowStyle}>
            <div className="flex gap-4 md:gap-6">
              {doubled1.map((brand, i) => (
                <BrandCard key={`r1-${brand.name}-${i}`} brand={brand} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div ref={row2Ref} className="overflow-x-auto" style={rowStyle}>
            <div className="flex gap-4 md:gap-6">
              {doubled2.map((brand, i) => (
                <BrandCard key={`r2-${brand.name}-${i}`} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
