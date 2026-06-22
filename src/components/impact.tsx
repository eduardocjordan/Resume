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

// impactMetrics[].stat is a full string (e.g. "+15%", "-35%") rather than
// pre-split number/suffix. Split out a leading sign and/or trailing %/M so
// those characters can render in text-accent, without altering the source value.
function splitStat(stat: string): { prefix: string; core: string; suffix: string } {
  const match = stat.match(/^([+-]?)(.*?)([%M]?)$/);
  if (!match) return { prefix: "", core: stat, suffix: "" };
  const [, prefix, core, suffix] = match;
  return { prefix, core, suffix };
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

function StatNumber({ stat }: { stat: string }) {
  const { prefix, core, suffix } = splitStat(stat);
  return (
    <div
      className="font-stat text-paper"
      style={{ fontSize: "clamp(80px, 8vw, 110px)", lineHeight: 0.82 }}
    >
      {prefix && <span className="text-accent">{prefix}</span>}
      {core}
      {suffix && <span className="text-accent">{suffix}</span>}
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
      className="min-h-dvh flex flex-col overflow-hidden bg-ink text-paper relative"
      id="impact"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 pt-16 md:pt-24 pb-8 flex-shrink-0 relative z-10">
        <FadeIn direction="none">
          <p
            className="font-label uppercase text-accent mb-4"
            style={{ fontSize: "11px", letterSpacing: "0.3em" }}
          >
            05 / Impact
          </p>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
            <div className="md:w-1/2">
              <h2
                id="impact-heading"
                className="font-display text-paper"
                style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 1 }}
              >
                Results that <br />
                <span className="italic text-accent">hold up.</span>
              </h2>
            </div>
            <div className="hidden md:block md:w-1/2">
              <p
                className="font-body font-light max-w-[480px]"
                style={{ fontSize: "20px", color: "rgba(241,239,233,0.65)" }}
              >
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
              <div
                key={i}
                className="flex-1 flex flex-col justify-center"
                style={{
                  borderLeft: "3px solid rgba(212,98,42,0.4)",
                  paddingLeft: "20px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                <p
                  className="font-label uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.26em",
                    color: "rgba(241,239,233,0.55)",
                    marginBottom: "8px",
                  }}
                >
                  {metric.company}
                </p>
                <StatNumber stat={metric.stat} />
                <p
                  className="font-body font-semibold uppercase"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    color: "rgba(241,239,233,0.65)",
                    marginTop: "10px",
                  }}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ScrollDots count={pages.length} active={activePage} />

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-x-10 gap-y-14 max-w-[1600px] w-full mx-auto px-24 flex-1 content-center pb-16 relative z-10">
        {impactMetrics.map((metric, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <motion.div
              initial={{ borderLeftColor: "rgba(212,98,42,0.4)" }}
              whileHover={{ borderLeftColor: "#d4622a" }}
              transition={{ duration: 0.3 }}
              style={{
                borderLeft: "3px solid rgba(212,98,42,0.4)",
                paddingLeft: "28px",
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              <p
                className="font-label uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.26em",
                  color: "rgba(241,239,233,0.55)",
                  marginBottom: "8px",
                }}
              >
                {metric.company}
              </p>
              <StatNumber stat={metric.stat} />
              <p
                className="font-body font-semibold uppercase"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  color: "rgba(241,239,233,0.65)",
                  marginTop: "10px",
                }}
              >
                {metric.label}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
