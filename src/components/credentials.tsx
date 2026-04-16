"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeIn } from "./fade-in";
import { credentials } from "@/lib/data";

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i === active ? "#d4622a" : "#e2e3e1" }}
        />
      ))}
    </div>
  );
}

export function Credentials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    if (inView) {
      setShowNudge(true);
      const t = setTimeout(() => setShowNudge(false), 2000);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveSlide(Math.min(idx, 2));
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[100dvh] py-16 md:py-32 bg-surface"
      id="credentials"
      aria-labelledby="credentials-heading"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-24 mb-12">
        <FadeIn>
          <h2
            id="credentials-heading"
            className="text-5xl md:text-7xl font-headline italic"
          >
            Credentials
          </h2>
        </FadeIn>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {/* Slide 1 — Education */}
          <div className="flex-shrink-0 w-full snap-start px-8 md:px-24">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">
                Education &amp; Certifications
              </p>
              <ul className="space-y-7">
                {credentials.education.map((edu) => (
                  <li key={edu.degree} className="flex items-start gap-4">
                    {edu.logo && (
                      <Image
                        src={edu.logo}
                        alt={edu.institution}
                        width={80}
                        height={24}
                        style={{
                          maxHeight: "24px",
                          width: "auto",
                          objectFit: "contain",
                          opacity: 0.7,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-tertiary mt-0.5">
                        {edu.institution}
                        {edu.year ? ` · ${edu.year}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Slide 2 — Honors + Languages */}
          <div className="flex-shrink-0 w-full snap-start px-8 md:px-24">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">
                  Honors &amp; Awards
                </p>
                <ul className="space-y-8">
                  {credentials.awards.map((award) => (
                    <li key={award.name} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary">
                        {award.icon}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface">
                          {award.name}
                        </h4>
                        <p className="text-xs text-tertiary mt-1">{award.org}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">
                  Languages
                </p>
                <ul className="space-y-4">
                  {credentials.languages.map((lang, i) => (
                    <li
                      key={lang.lang}
                      className={`flex justify-between items-center py-3 ${
                        i < credentials.languages.length - 1
                          ? "border-b border-outline-variant/30"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-bold text-on-surface">
                        {lang.lang}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-tertiary">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Slide 3 — Tools */}
          <div className="flex-shrink-0 w-full snap-start px-8 md:px-24">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">
                Key Tools
              </p>
              <div className="flex flex-wrap gap-3">
                {credentials.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-surface-container-high text-xs uppercase font-bold border border-outline-variant/30 rounded-sm text-on-surface"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nudge arrow — appears on section entry, fades out after 2s */}
        <AnimatePresence>
          {showNudge && activeSlide === 0 && (
            <motion.div
              key="nudge"
              className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: [0, 1, 1, 0], x: [-4, 4, -4, 4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <span className="material-symbols-outlined text-primary text-4xl">
                chevron_right
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ScrollDots count={3} active={activeSlide} />
    </section>
  );
}
