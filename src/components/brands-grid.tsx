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
      style={{ height: "80px" }}
      initial="rest"
      whileHover="hovered"
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={120}
        height={40}
        style={{ height: "40px", width: "auto", objectFit: "contain", maxWidth: "100%" }}
      />
      <motion.div
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center bg-ink/60"
        aria-hidden="true"
      >
        <span className="text-sm font-medium text-white select-none">{brand.name}</span>
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
    const handleScroll = () => {
      const mid = el.scrollWidth / 2;
      if (el.scrollLeft >= mid) {
        el.scrollLeft -= mid;
      }
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
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

        {/* Scroll container: snap on mobile, free-scroll on desktop */}
        <div
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {/*
           * grid-rows-1 on mobile (single row, w-32 cards)
           * grid-rows-2 on desktop (two rows, wider cards)
           * grid-auto-flow: column fills columns left-to-right
           */}
          <div
            className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-4 md:gap-6"
            style={{ gridAutoColumns: "var(--card-w, 8rem)" }}
          >
            <style>{`
              @media (min-width: 768px) { :root { --card-w: 160px; } }
            `}</style>
            {doubled.map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="snap-start md:snap-align-none">
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
