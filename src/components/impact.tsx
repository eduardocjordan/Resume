"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "./fade-in";
import { impactMetrics, impactCopy } from "@/lib/data";
import { useCountUp } from "@/hooks/use-count-up";

const ACCENT_RGB = [212, 98, 42];

// The count-up settles on the paper token, which inverts in dark mode —
// read it from the CSS variable instead of hardcoding the light value.
function getPaperRgb(): number[] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
  const parts = raw.split(/\s+/).map(Number);
  return parts.length === 3 && parts.every((n) => !Number.isNaN(n)) ? parts : [249, 249, 247];
}

function interpolateColor(from: number[], to: number[], progress: number) {
  const [r, g, b] = from.map((c, i) => Math.round(c + (to[i] - c) * progress));
  return `rgb(${r}, ${g}, ${b})`;
}

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
          className={`block w-2 h-2 rounded-full transition-colors duration-300 ${
            i === active ? "bg-accent" : "bg-paper/25"
          }`}
        />
      ))}
    </div>
  );
}

function StatNumber({ stat }: { stat: string }) {
  const { prefix, core, suffix } = splitStat(stat);
  const decimals = core.includes(".") ? core.split(".")[1].length : 0;
  const target = parseFloat(core);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { value, progress } = useCountUp(target, inView, 1400, decimals);
  const [paperRgb, setPaperRgb] = useState(ACCENT_RGB);
  useEffect(() => setPaperRgb(getPaperRgb()), []);
  const color = interpolateColor(ACCENT_RGB, paperRgb, progress);

  return (
    <div
      ref={ref}
      className="font-stat"
      style={{ fontSize: "clamp(80px, 8vw, 110px)", lineHeight: 0.82 }}
    >
      {prefix && <span className="text-accent">{prefix}</span>}
      <span style={{ color, transition: "color .2s linear" }}>{value}</span>
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
      <FadeIn direction="rule">
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: "2px", background: "linear-gradient(90deg, #d4622a, rgba(212,98,42,0))" }}
        />
      </FadeIn>
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 pt-16 md:pt-24 pb-8 flex-shrink-0 relative z-10">
        <FadeIn direction="none">
          <p
            className="font-label uppercase text-accent mb-4"
            style={{ fontSize: "11px", letterSpacing: "0.3em" }}
          >
            {impactCopy.eyebrow}
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
                {impactCopy.headingLine1} <br />
                <span className="italic text-accent">{impactCopy.headingAccent}</span>
              </h2>
            </div>
            <div className="hidden md:block md:w-1/2">
              <p
                className="font-body font-light max-w-[480px] text-paper/65"
                style={{ fontSize: "20px" }}
              >
                {impactCopy.intro}
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
                  className="font-label uppercase text-paper/55"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.26em",
                    marginBottom: "8px",
                  }}
                >
                  {metric.company}
                </p>
                <StatNumber stat={metric.stat} />
                <p
                  className="font-body font-semibold uppercase text-paper/65"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.06em",
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
          <FadeIn key={i} delay={i * 0.08}>
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
                className="font-label uppercase text-paper/55"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.26em",
                  marginBottom: "8px",
                }}
              >
                {metric.company}
              </p>
              <StatNumber stat={metric.stat} />
              <p
                className="font-body font-semibold uppercase text-paper/65"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.06em",
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
