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

const SPEED = 0.48; // px per frame (~20% slower than original 0.6)

export function BrandsGrid() {
  const doubled1 = useMemo(() => { const s = shuffle(brands); return [...s, ...s]; }, []);
  const doubled2 = useMemo(() => { const s = shuffle(brands); return [...s, ...s]; }, []);

  const inner1Ref = useRef<HTMLDivElement>(null);
  const inner2Ref = useRef<HTMLDivElement>(null);
  const wrap1Ref  = useRef<HTMLDivElement>(null);
  const wrap2Ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /*
     * CSS-transform approach: translate the inner flex row.
     * Row 1 scrolls left  (pos decreases from 0 to -half, resets to 0).
     * Row 2 scrolls right (pos increases from -half to 0, resets to -half).
     * Uses a double-RAF start so layout is computed before we read offsetWidth.
     */
    const setupRow = (
      innerEl: HTMLDivElement,
      wrapEl: HTMLDivElement,
      direction: "left" | "right",
    ): (() => void) => {
      let pos = 0;
      let half = 0;
      let paused = false;
      let frame: number;

      const tick = () => {
        if (!paused) {
          if (direction === "left") {
            pos -= SPEED;
            if (pos <= -half) pos += half;
          } else {
            pos += SPEED;
            if (pos >= 0) pos -= half;
          }
          innerEl.style.transform = `translateX(${pos}px)`;
        }
        frame = requestAnimationFrame(tick);
      };

      // Double-RAF: let browser compute layout before starting
      frame = requestAnimationFrame(() => {
        half = innerEl.offsetWidth / 2;
        if (direction === "right") pos = -half;
        frame = requestAnimationFrame(tick);
      });

      const pause  = () => { paused = true; };
      const resume = () => { paused = false; };
      wrapEl.addEventListener("mouseenter",  pause);
      wrapEl.addEventListener("mouseleave",  resume);
      wrapEl.addEventListener("touchstart",  pause,  { passive: true });
      wrapEl.addEventListener("touchend",    resume, { passive: true });

      return () => {
        cancelAnimationFrame(frame);
        wrapEl.removeEventListener("mouseenter",  pause);
        wrapEl.removeEventListener("mouseleave",  resume);
        wrapEl.removeEventListener("touchstart",  pause);
        wrapEl.removeEventListener("touchend",    resume);
      };
    };

    const cleanups: (() => void)[] = [];
    if (inner1Ref.current && wrap1Ref.current)
      cleanups.push(setupRow(inner1Ref.current, wrap1Ref.current, "left"));
    if (inner2Ref.current && wrap2Ref.current)
      cleanups.push(setupRow(inner2Ref.current, wrap2Ref.current, "right"));

    return () => cleanups.forEach((fn) => fn());
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

        <div className="space-y-4 md:space-y-6">
          {/* Row 1 — scrolls left */}
          <div ref={wrap1Ref} className="overflow-hidden">
            <div ref={inner1Ref} className="flex gap-4 md:gap-6" style={{ willChange: "transform" }}>
              {doubled1.map((brand, i) => (
                <BrandCard key={`r1-${brand.name}-${i}`} brand={brand} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div ref={wrap2Ref} className="overflow-hidden">
            <div ref={inner2Ref} className="flex gap-4 md:gap-6" style={{ willChange: "transform" }}>
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
