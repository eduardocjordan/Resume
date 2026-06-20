"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

const orderedStats = [hero.stats[0], hero.stats[2], hero.stats[1]];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-paper"
      id="hero"
      aria-labelledby="hero-heading"
    >
      {/* Right-edge portrait — secondary, atmospheric; the name typography carries the section now */}
      <div className="hidden md:block absolute top-0 right-0 h-full" style={{ width: "min(34vw, 470px)" }}>
        <Image
          src={hero.portrait}
          alt="Eduardo Castro — Marketing Director, Brand Growth Strategist"
          fill
          className="object-cover object-top"
          priority
          sizes="34vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgb(var(--paper)) 0%, transparent 35%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(212,98,42,.14) 0%, rgba(212,98,42,.04) 100%)" }} />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-8 md:px-16 py-28 md:py-32">
        <FadeIn>
          <div
            className="inline-block px-3 py-1 bg-paper-dark text-accent text-xs font-bold tracking-[0.2em] uppercase rounded-sm"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {hero.role} · {hero.location}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <motion.h1
            id="hero-heading"
            className="font-headline leading-[0.76] tracking-[-0.035em] mt-6 text-ink origin-left"
            style={{ fontSize: "clamp(70px, 15.7vw, 255px)", scale: headlineScale, opacity: headlineOpacity }}
          >
            <span className="block font-bold">Eduardo</span>
            <span className="block italic font-semibold text-accent">Castro</span>
          </motion.h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          {/* Literal copy per Eddie's brief; does not match hero.role ("Brand Strategy") or layout.tsx jobTitle ("Marketing Director") in data.ts */}
          <p className="uppercase text-sm tracking-[0.2em] text-ink/60 mt-4" style={{ fontFamily: "'Space Mono', monospace" }}>
            Senior Marketing Director — Brand Strategist
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-[1.35fr_1fr] gap-10 mt-12 items-start">
            <div className="space-y-4">
              {hero.taglines.map((t, i) => (
                <p
                  key={i}
                  className={cn(
                    "text-lg md:text-xl leading-relaxed text-ink/70",
                    i === 1 && "hidden md:block",
                    i === 2 && "italic font-headline text-ink text-xl md:text-2xl"
                  )}
                  dangerouslySetInnerHTML={{ __html: t }}
                />
              ))}
            </div>

            {/* Desktop stats — inline row with dividers */}
            <div className="hidden md:flex divide-x divide-ink/15">
              {orderedStats.map((stat) => (
                <div key={stat.label} className="px-6 first:pl-0 text-center">
                  <div className="font-stat leading-none text-ink" style={{ fontSize: "clamp(54px, 6.4vw, 100px)" }}>
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-tighter text-ink/50 font-bold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mobile stats — swipeable, scroll-snapped carousel */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-ink/50" style={{ fontFamily: "'Space Mono', monospace" }}>
                  By the numbers
                </span>
                <span className="text-xs text-ink/40">swipe →</span>
              </div>
              <div
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
              >
                {orderedStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-none w-[150px] text-center bg-paper-dark rounded-lg snap-start p-[18px]"
                  >
                    <div className="font-stat text-5xl text-ink">
                      {stat.value}
                      <span className="text-accent">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-tighter text-ink/50 font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-4 md:gap-8 mt-12">
            <motion.a
              href={hero.cv}
              download
              data-gtm-event="resume_download"
              data-gtm-location="hero"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ event: "resume_download", click_location: "hero" });
              }}
              className="editorial-gradient text-white px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download Resume
            </motion.a>
            <motion.button
              type="button"
              data-gtm-event="chat_open"
              data-gtm-location="hero"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ event: "chat_open", click_location: "hero" });
                window.dispatchEvent(new Event("chat:open"));
              }}
              className="bg-paper border border-accent/40 text-accent px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-accent-soft transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4622a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ event: "social_click", click_location: "hero", platform: "linkedin" });
              }}
              className="text-ink/70 hover:text-accent transition-colors font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
