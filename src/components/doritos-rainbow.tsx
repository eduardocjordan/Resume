"use client";

import Image from "next/image";
import { FadeIn } from "@/components/fade-in";

export function DoritosRainbow() {
  return (
    <section
      className="relative flex flex-col overflow-hidden bg-accent"
      style={{ height: "100vh", minHeight: 660 }}
      id="doritos-rainbow"
      aria-labelledby="doritos-rainbow-heading"
    >
      {/* Oversized structural year number — ink-on-accent treatment, theme-independent by design */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none animate-drift text-[#1a1c1b]/[0.08]"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "min(58vh, 42vw)", lineHeight: 1 }}
      >
        2016
      </div>

      <div className="relative z-10 flex-1 flex items-center px-8 md:px-24 py-16 pb-28">
        <div className="grid md:grid-cols-[1.45fr_1fr] gap-12 items-center max-w-[1400px] mx-auto w-full">
          <FadeIn>
            <div className="text-[#1a1c1b]">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#1a1c1b]/40" />
                <p className="text-xs uppercase tracking-[0.25em] font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  The decade started here
                </p>
              </div>
              <h2
                id="doritos-rainbow-heading"
                className="font-headline italic"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5.6rem)", lineHeight: 1.05 }}
              >
                PepsiCo®&#39;s first purpose-driven product.
              </h2>
              <p className="font-headline mt-4" style={{ fontSize: "clamp(1.3rem, 2.2vw, 2rem)", fontWeight: 500 }}>
                Sold out in one week instead of eight.
              </p>
              <p
                className="mt-8 pt-4 border-t border-[#1a1c1b]/20 font-bold text-sm md:text-base"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                200M+ organic impressions · +2.3% brand SOM · President&#39;s Outliers Award
              </p>
              <p className="mt-6 italic font-headline text-lg text-[#1a1c1b]/70 max-w-md">
                This is what becomes possible when a brand decides to mean something.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <div className="relative mx-auto md:mx-0 w-[220px] md:w-[260px] rotate-[-1.8deg] md:rotate-[-2.2deg]">
              <div
                className="bg-[#f9f9f7]"
                style={{ padding: "14px 14px 46px", boxShadow: "0 30px 60px rgba(0,0,0,0.28)" }}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/assets/20160812_102324-1.jpeg"
                    alt="Doritos Rainbow — PepsiCo's first purpose-driven product, launched 2016"
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>
                <p
                  className="mt-3 text-center text-[10px] font-bold uppercase tracking-wide text-[#1a1c1b]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Evidence · 2016
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-paper-dark text-ink px-8 md:px-24 py-5">
        <p className="font-headline italic text-lg">Defining Work</p>
        <p
          className="text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-2"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          the decade that walked through the door
          <span className="inline-block animate-bob leading-none">↓</span>
        </p>
      </div>
    </section>
  );
}
