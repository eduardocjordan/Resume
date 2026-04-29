"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  return (
    <motion.div
      // mr-4 / md:mr-6 instead of gap: each card's footprint = W + G,
      // so translateX(-50%) lands exactly at the start of the second set.
      className="relative flex-shrink-0 w-32 md:w-40 mr-4 md:mr-6 flex items-center justify-center cursor-default bg-paper"
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

function MarqueeRow({
  items,
  direction,
}: {
  items: (typeof brands);
  direction: "left" | "right";
}) {
  const [paused, setPaused] = useState(false);
  // Double the array for seamless loop
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          animationName: "marquee",
          animationDuration: "45s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {doubled.map((brand, i) => (
          <BrandCard key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export function BrandsGrid() {
  const row1 = useMemo(() => shuffle(brands), []);
  const row2 = useMemo(() => shuffle(brands), []);

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
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>
    </section>
  );
}
