"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { impactMetrics } from "@/lib/data";

const N = impactMetrics.length;
const extended = [impactMetrics[N - 1], ...impactMetrics, impactMetrics[0]];

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i === active ? "#d4622a" : "rgba(255,255,255,0.25)" }}
        />
      ))}
    </div>
  );
}

export function Impact() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const first = el.children[1] as HTMLElement;
    if (first) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = first.offsetLeft - pl;
    }
  }, []);

  const jumpTo = (el: HTMLElement, idx: number) => {
    const child = el.children[idx] as HTMLElement;
    if (!child) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = child.offsetLeft - pl;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.scrollBehavior = ""; }));
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const children = Array.from(el.children) as HTMLElement[];

    let closest = 1;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - pl - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });

    let realIdx: number;
    if (closest <= 0) realIdx = N - 1;
    else if (closest >= N + 1) realIdx = 0;
    else realIdx = closest - 1;
    setActiveCard(realIdx);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (closest <= 0) jumpTo(el, N);
      else if (closest >= N + 1) jumpTo(el, 1);
    }, 80);
  };

  return (
    <section
      className="h-[calc(100dvh-72px)] flex flex-col overflow-hidden bg-on-background text-white relative"
      id="impact"
      aria-labelledby="impact-heading"
    >
      {/* Header */}
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 pt-12 pb-8 flex-shrink-0 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
            <div className="md:w-1/2">
              <h2 id="impact-heading" className="text-5xl md:text-8xl font-headline leading-tight">
                Results that <br />
                <span className="italic text-primary">hold up.</span>
              </h2>
            </div>
            <div className="hidden md:block md:w-1/2">
              <p className="text-xl text-secondary-fixed opacity-70 leading-relaxed font-light">
                Numbers from real engagements, not projections. Each one traces back to a
                strategic decision, a team, and a market.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Mobile carousel */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="md:hidden flex overflow-x-auto gap-4 px-8 snap-x snap-mandatory flex-shrink-0"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {extended.map((metric, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-start p-6 bg-white/5 border border-white/10"
            style={{ width: "80vw" }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">
              {metric.company}
            </p>
            <div className="text-5xl font-headline mb-4 text-primary">{metric.stat}</div>
            <p className="text-sm font-bold text-white uppercase tracking-wide">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
      <ScrollDots count={N} active={activeCard} />

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-[1600px] w-full mx-auto px-24 flex-1 content-center pb-12 relative z-10">
        {impactMetrics.map((metric, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <motion.div
              className="p-6 bg-white/5 border border-white/10 backdrop-blur-3xl"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.10)" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">
                {metric.company}
              </p>
              <div className="text-5xl font-headline mb-4 text-primary">{metric.stat}</div>
              <p className="text-sm font-bold text-white uppercase tracking-wide">
                {metric.label}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
