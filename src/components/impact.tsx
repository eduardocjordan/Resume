"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { impactMetrics } from "@/lib/data";

// Group metrics into pages of 2 for mobile carousel
const pages: (typeof impactMetrics)[] = [];
for (let i = 0; i < impactMetrics.length; i += 2) {
  pages.push(impactMetrics.slice(i, i + 2));
}

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i === active ? "#C25028" : "rgba(245,240,232,0.25)" }}
        />
      ))}
    </div>
  );
}

export function Impact() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setActivePage(Math.round(el.scrollLeft / el.offsetWidth));
  };

  return (
    <section
      className="h-[calc(100dvh-72px)] flex flex-col overflow-hidden bg-ink text-paper relative"
      id="impact"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 pt-12 pb-8 flex-shrink-0 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
            <div className="md:w-1/2">
              <h2 id="impact-heading" className="text-5xl md:text-8xl font-headline leading-tight text-paper">
                Results that <br />
                <span className="italic text-accent">hold up.</span>
              </h2>
            </div>
            <div className="hidden md:block md:w-1/2">
              <p className="text-xl text-paper/70 leading-relaxed font-light">
                Numbers from real engagements, not projections. Each one traces back to a
                strategic decision, a team, and a market.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Mobile carousel — 2 cards per page */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="md:hidden flex overflow-x-auto snap-x snap-mandatory flex-1 min-h-0"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="flex-shrink-0 w-full snap-start flex gap-3 px-8 items-stretch">
            {page.map((metric, i) => (
              <div key={i} className="flex-1 p-5 bg-paper/5 border border-paper/10 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-3">{metric.company}</p>
                <div className="text-4xl font-headline mb-3 text-accent">{metric.stat}</div>
                <p className="text-xs font-bold text-paper uppercase tracking-wide">{metric.label}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ScrollDots count={pages.length} active={activePage} />

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-[1600px] w-full mx-auto px-24 flex-1 content-center pb-12 relative z-10">
        {impactMetrics.map((metric, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <motion.div
              className="p-6 bg-paper/5 border border-paper/10 backdrop-blur-3xl"
              whileHover={{ backgroundColor: "rgba(245,240,232,0.10)" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-4">{metric.company}</p>
              <div className="text-5xl font-headline mb-4 text-accent">{metric.stat}</div>
              <p className="text-sm font-bold text-paper uppercase tracking-wide">{metric.label}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
