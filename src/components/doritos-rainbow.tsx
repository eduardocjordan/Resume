"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { doritosEvidence } from "@/lib/data";

function EvidenceCarousel() {
  const [index, setIndex] = useState(0);
  const total = doritosEvidence.length;
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <div>
      <div className="relative rotate-[-1.8deg] md:rotate-[-2.2deg] w-[170px] md:w-[min(38vw,380px)] max-w-[380px] mx-auto md:mx-0">
        {doritosEvidence.map((evidence, i) => {
          const offset = (i - index + total) % total;
          if (offset > 2) return null;
          const isPeek = offset === 1 && total > 1;
          return (
            <div
              key={evidence.image}
              role={isPeek ? "button" : undefined}
              tabIndex={isPeek ? 0 : undefined}
              aria-label={isPeek ? "Show next evidence photo" : undefined}
              onClick={isPeek ? () => go(1) : undefined}
              onKeyDown={
                isPeek
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        go(1);
                      }
                    }
                  : undefined
              }
              className="bg-paper p-[11px] pb-[30px] md:p-[14px] md:pb-[46px] shadow-[0_30px_60px_rgba(0,0,0,0.28)] transition-transform duration-400"
              style={{
                position: offset === 0 ? "static" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translate(${offset * 14}px, ${offset * 18}px) rotate(${offset * 1.4}deg)`,
                zIndex: total - offset,
                pointerEvents: offset <= 1 ? "auto" : "none",
                cursor: isPeek ? "pointer" : undefined,
              }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image src={evidence.image} alt={evidence.alt} fill className="object-cover" />
              </div>
              <p
                className="font-mono uppercase text-[10px] text-center mt-[14px]"
                style={{ letterSpacing: "0.12em", color: "rgba(26,28,27,0.55)" }}
              >
                {evidence.caption}
              </p>
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center md:justify-start gap-5 mt-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous evidence photo"
            className="font-mono text-[14px] leading-none w-6 h-6 flex items-center justify-center rounded-full border transition-colors hover:bg-white/15"
            style={{ borderColor: "rgba(255,255,255,0.55)", color: "rgba(255,255,255,0.92)" }}
          >
            ‹
          </button>
          <span
            className="font-mono uppercase text-[10px]"
            style={{ letterSpacing: "0.12em", color: "rgba(255,255,255,0.8)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next evidence photo"
            className="font-mono text-[14px] leading-none w-6 h-6 flex items-center justify-center rounded-full border transition-colors hover:bg-white/15"
            style={{ borderColor: "rgba(255,255,255,0.55)", color: "rgba(255,255,255,0.92)" }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export function DoritosRainbow() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [48, -48]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-accent text-ink"
      style={{ height: "100vh", minHeight: "660px" }}
      id="doritos-rainbow"
      aria-labelledby="doritos-rainbow-heading"
    >
      {/* Background year element */}
      <motion.div
        className="absolute font-stat pointer-events-none text-[230px] md:text-[min(58vh,42vw)] animate-[ecDrift_9s_ease-in-out_infinite_alternate]"
        style={{
          top: "-3vh",
          right: "-1.5vw",
          lineHeight: 0.8,
          letterSpacing: "-0.02em",
          color: "rgba(26,28,27,0.12)",
          y: wordY,
        }}
      >
        2016
      </motion.div>

      <div
        className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,72px)] max-w-[1280px] mx-auto px-[clamp(28px,6vw,96px)]"
      >
        {/* Text column */}
        <FadeIn>
          <div className="flex items-center gap-3 md:gap-3.5 mb-[26px]">
            <span className="w-[26px] md:w-[34px]" style={{ height: 1, background: "rgba(26,28,27,0.28)" }} />
            <p
              className="font-mono uppercase text-[11px]"
              style={{ letterSpacing: "0.26em", color: "rgba(26,28,27,0.74)" }}
            >
              The decade started here
            </p>
          </div>

          <h2
            id="doritos-rainbow-heading"
            className="font-headline italic text-[42px] md:text-[clamp(2.6rem,6vw,5.6rem)]"
            style={{ fontWeight: 400, lineHeight: 0.98, letterSpacing: "-0.015em", color: "#1a1c1b" }}
          >
            PepsiCo&rsquo;s first purpose-driven product.
          </h2>

          <p
            className="font-headline text-[24px] md:text-[clamp(1.3rem,2.2vw,2rem)] mt-[26px]"
            style={{ fontWeight: 500, lineHeight: 1.25, color: "#1a1c1b" }}
          >
            Sold out in one week instead of eight.
          </p>

          <p
            className="font-mono text-[11px] md:text-[clamp(0.72rem,0.92vw,0.84rem)] mt-[30px] pt-[22px]"
            style={{
              borderTop: "1px solid rgba(26,28,27,0.28)",
              letterSpacing: "0.05em",
              lineHeight: 1.9,
              color: "#1a1c1b",
              fontWeight: 700,
            }}
          >
            200M+ organic impressions · +2.3% brand SOM · President&rsquo;s Outliers Award
          </p>

          <p
            className="font-body italic text-[clamp(0.86rem,1.05vw,1rem)] mt-[26px] max-w-[480px]"
            style={{ lineHeight: 1.7, fontWeight: 300, color: "rgba(26,28,27,0.74)" }}
          >
            This is what becomes possible when a brand decides to mean something.
          </p>
        </FadeIn>

        {/* Photo column */}
        <FadeIn delay={0.2}>
          <EvidenceCarousel />
        </FadeIn>
      </div>

      {/* Bottom transition bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-paper-dark text-ink px-[clamp(28px,6vw,96px)] py-[14px]"
        style={{ borderTop: "1px solid rgba(26,28,27,0.08)" }}
      >
        <p
          className="font-headline italic text-[clamp(1rem,1.5vw,1.35rem)]"
          style={{ color: "rgba(26,28,27,0.85)" }}
        >
          Defining Work
        </p>
        <p
          className="font-mono uppercase text-[10px] flex items-center gap-[7px] md:gap-[10px]"
          style={{ letterSpacing: "0.2em", color: "rgba(26,28,27,0.5)" }}
        >
          <span className="md:hidden">walk through</span>
          <span className="hidden md:inline">the decade that walked through the door</span>
          <span className="inline-block animate-[ecBob_1.8s_ease-in-out_infinite]">↓</span>
        </p>
      </div>
    </section>
  );
}
