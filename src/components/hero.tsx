"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/data";
import { FadeIn } from "./fade-in";
import { cn } from "@/lib/utils";

const orderedStats = [hero.stats[0], hero.stats[2], hero.stats[1]];

function pushGtmEvent(event: string, extra?: Record<string, unknown>) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...extra });
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-paper py-[clamp(40px,7vh,96px)] px-[clamp(28px,6vw,96px)]"
      id="hero"
      aria-labelledby="hero-heading"
    >
      {/* Right-edge portrait — secondary, atmospheric */}
      <div className="hidden md:block absolute top-0 right-0 h-full" style={{ width: "min(34vw, 470px)" }}>
        <Image
          src={hero.portrait}
          alt="Eduardo Castro — Marketing Director, Brand Growth Strategist"
          fill
          className="object-cover object-top"
          priority
          sizes="34vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #f9f9f7 0%, rgba(249,249,247,.45) 22%, rgba(249,249,247,0) 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(212,98,42,.14), rgba(212,98,42,.04))" }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto">
        <FadeIn>
          <div
            className="inline-block px-[13px] py-[7px] bg-paper-dark text-accent text-[11px] font-bold tracking-[0.26em] uppercase rounded-sm mb-[clamp(20px,3.5vh,40px)]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {hero.role} · {hero.location}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <motion.h1
            id="hero-heading"
            className="font-headline text-ink origin-left"
            style={{ lineHeight: 0.76, letterSpacing: "-0.035em", scale: headlineScale, opacity: headlineOpacity }}
          >
            <span className="block font-extrabold" style={{ fontSize: "clamp(70px, 15.7vw, 255px)" }}>
              Eduardo
            </span>
            <span
              className="block italic font-bold"
              style={{ fontSize: "clamp(70px, 15.7vw, 255px)", marginTop: "-0.04em" }}
            >
              Castro
            </span>
          </motion.h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p
            className="uppercase text-[clamp(0.72rem,1vw,0.86rem)] tracking-[0.2em] text-ink/55 mt-[clamp(18px,2.6vh,30px)]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Senior Marketing Director — Brand Strategist
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-[clamp(28px,5vw,72px)] items-end mt-[clamp(30px,5vh,58px)]">
            <div className="flex flex-col gap-[14px] max-w-[560px]">
              {hero.taglines.map((t, i) => (
                <p
                  key={i}
                  className={cn(
                    "text-[clamp(0.92rem,1.12vw,1.06rem)] leading-[1.7] font-light text-ink/78",
                    i === 1 && "hidden md:block",
                    i === 2 && "font-headline italic text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.4] text-ink font-normal"
                  )}
                  dangerouslySetInnerHTML={{ __html: t }}
                />
              ))}
            </div>

            {/* Desktop stats — inline row with dividers */}
            <div className="hidden md:flex items-end gap-[clamp(18px,2.4vw,38px)] flex-wrap">
              {orderedStats.map((stat, i) => (
                <div key={stat.label} className="flex items-end gap-[clamp(18px,2.4vw,38px)]">
                  <div>
                    <div className="font-stat leading-[0.82] text-ink" style={{ fontSize: "clamp(54px, 6.4vw, 100px)" }}>
                      {stat.value}
                      <span className="text-accent">{stat.suffix}</span>
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.16em] text-ink/50 font-bold mt-[8px]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {i < orderedStats.length - 1 && <div className="w-px self-stretch bg-[rgba(26,28,27,.14)]" />}
                </div>
              ))}
            </div>

            {/* Mobile stats — swipeable, scroll-snapped carousel */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink/45" style={{ fontFamily: "'Space Mono', monospace" }}>
                  By the numbers
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40" style={{ fontFamily: "'Space Mono', monospace" }}>
                  swipe →
                </span>
              </div>
              <div
                className="flex gap-[14px] overflow-x-auto pb-1.5 snap-x snap-mandatory -mx-[28px] px-[28px]"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
              >
                {orderedStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-none w-[150px] text-left bg-paper-dark rounded snap-start py-4 px-[18px]"
                  >
                    <div className="font-stat leading-[0.82] text-ink text-[72px]">
                      {stat.value}
                      <span className="text-accent">{stat.suffix}</span>
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.14em] text-ink/50 font-bold mt-[10px]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div className="flex flex-wrap items-center gap-[14px] mt-[clamp(30px,4.5vh,52px)]">
            <motion.a
              href={hero.cv}
              download
              data-gtm-event="resume_download"
              data-gtm-location="hero"
              onClick={() => pushGtmEvent("resume_download", { click_location: "hero" })}
              className="editorial-gradient text-white px-[26px] py-[15px] rounded-sm text-[12px] font-bold tracking-[0.16em] uppercase flex items-center gap-[10px]"
              style={{ fontFamily: "'Space Mono', monospace" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.a>
            <motion.button
              type="button"
              data-gtm-event="chat_open"
              data-gtm-location="hero"
              onClick={() => {
                pushGtmEvent("chat_open", { click_location: "hero" });
                window.dispatchEvent(new Event("chat:open"));
              }}
              className="bg-paper text-ink px-[26px] py-[15px] border border-[rgba(26,28,27,.28)] rounded-sm text-[12px] font-bold tracking-[0.16em] uppercase flex items-center gap-[10px] hover:bg-paper-dark transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d4622a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Talk to My Second Brain
            </motion.button>
            <motion.a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-gtm-event="social_click"
              data-gtm-location="hero"
              data-gtm-platform="linkedin"
              onClick={() => pushGtmEvent("social_click", { click_location: "hero", platform: "linkedin" })}
              className="bg-paper text-ink px-[26px] py-[15px] border border-[rgba(26,28,27,.28)] rounded-sm text-[12px] font-bold tracking-[0.16em] uppercase flex items-center gap-[10px] hover:bg-paper-dark transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#d4622a" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              LinkedIn
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
