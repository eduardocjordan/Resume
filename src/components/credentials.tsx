"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeIn } from "./fade-in";
import { credentials } from "@/lib/data";

const SLIDES = 3;

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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inView) {
      setShowNudge(true);
      const t = setTimeout(() => setShowNudge(false), 2000);
      return () => clearTimeout(t);
    }
  }, [inView]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.children[1] as HTMLElement;
    if (first) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = first.offsetLeft;
    }
  }, []);

  const jumpTo = (el: HTMLElement, idx: number) => {
    const child = el.children[idx] as HTMLElement;
    if (!child) return;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = child.offsetLeft;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.scrollBehavior = ""; }));
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];

    let closest = 1;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });

    let realIdx: number;
    if (closest <= 0) realIdx = SLIDES - 1;
    else if (closest >= SLIDES + 1) realIdx = 0;
    else realIdx = closest - 1;
    setActiveSlide(realIdx);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (closest <= 0) jumpTo(el, SLIDES);
      else if (closest >= SLIDES + 1) jumpTo(el, 1);
    }, 80);
  };

  return (
    <section
      ref={sectionRef}
      className="h-[calc(100dvh-120px)] flex flex-col overflow-hidden md:h-auto md:overflow-visible md:block bg-surface"
      id="credentials"
      aria-labelledby="credentials-heading"
    >
      <div className="max-w-[1200px] w-full mx-auto px-8 md:px-24 pt-12 pb-8 flex-shrink-0">
        <FadeIn>
          <h2
            id="credentials-heading"
            className="text-5xl md:text-7xl font-headline italic"
          >
            Credentials
          </h2>
        </FadeIn>
      </div>

      {/* Mobile carousel (hidden on desktop) */}
      <div className="md:hidden flex-1 min-h-0 relative">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory h-full"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {/* Clone of last slide — Tools */}
          <div aria-hidden="true" className="flex-shrink-0 w-full snap-start px-8 pt-4">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Key Tools</p>
              <div className="flex flex-wrap gap-3">
                {credentials.tools.map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-surface-container-high text-xs uppercase font-bold border border-outline-variant/30 rounded-sm text-on-surface">{tool}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Slide 1 — Education */}
          <div className="flex-shrink-0 w-full snap-start px-8 pt-4">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Education &amp; Certifications</p>
              <ul className="space-y-7">
                {credentials.education.map((edu) => (
                  <li key={edu.degree} className="flex items-start gap-4">
                    {edu.logo && (
                      <Image src={edu.logo} alt={`${edu.institution} logo`} width={80} height={24}
                        style={{ maxHeight: "24px", width: "auto", objectFit: "contain", opacity: 0.7, flexShrink: 0, marginTop: "2px" }} />
                    )}
                    <div>
                      <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface leading-snug">{edu.degree}</h4>
                      <p className="text-xs text-tertiary mt-0.5">{edu.institution}{edu.year ? ` · ${edu.year}` : ""}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Slide 2 — Honors + Languages */}
          <div className="flex-shrink-0 w-full snap-start px-8 pt-4">
            <div className="max-w-[1200px] mx-auto">
              <div className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Honors &amp; Awards</p>
                <ul className="space-y-8">
                  {credentials.awards.map((award) => (
                    <li key={award.name} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary">{award.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface">{award.name}</h4>
                        <p className="text-xs text-tertiary mt-1">{award.org}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Languages</p>
                <ul className="space-y-4">
                  {credentials.languages.map((lang, i) => (
                    <li key={lang.lang} className={`flex justify-between items-center py-3 ${i < credentials.languages.length - 1 ? "border-b border-outline-variant/30" : ""}`}>
                      <span className="text-sm font-bold text-on-surface">{lang.lang}</span>
                      <span className="text-[10px] uppercase font-bold text-tertiary">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Slide 3 — Tools */}
          <div className="flex-shrink-0 w-full snap-start px-8 pt-4">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Key Tools</p>
              <div className="flex flex-wrap gap-3">
                {credentials.tools.map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-surface-container-high text-xs uppercase font-bold border border-outline-variant/30 rounded-sm text-on-surface">{tool}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Clone of first slide — Education */}
          <div aria-hidden="true" className="flex-shrink-0 w-full snap-start px-8 pt-4">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Education &amp; Certifications</p>
              <ul className="space-y-7">
                {credentials.education.map((edu) => (
                  <li key={edu.degree} className="flex items-start gap-4">
                    {edu.logo && (
                      <Image src={edu.logo} alt={`${edu.institution} logo`} width={80} height={24}
                        style={{ maxHeight: "24px", width: "auto", objectFit: "contain", opacity: 0.7, flexShrink: 0, marginTop: "2px" }} />
                    )}
                    <div>
                      <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface leading-snug">{edu.degree}</h4>
                      <p className="text-xs text-tertiary mt-0.5">{edu.institution}{edu.year ? ` · ${edu.year}` : ""}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Nudge arrow */}
        <AnimatePresence>
          {showNudge && activeSlide === 0 && (
            <motion.div
              key="nudge"
              className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: [0, 1, 1, 0], x: [-4, 4, -4, 4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <span className="material-symbols-outlined text-primary text-4xl">chevron_right</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="md:hidden">
        <ScrollDots count={SLIDES} active={activeSlide} />
      </div>

      {/* Desktop static layout (hidden on mobile) */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-24 pb-24 space-y-20">
        {/* Education & Certifications */}
        <FadeIn>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Education &amp; Certifications</p>
            <ul className="space-y-7">
              {credentials.education.map((edu) => (
                <li key={edu.degree} className="flex items-start gap-4">
                  {edu.logo && (
                    <Image src={edu.logo} alt={`${edu.institution} logo`} width={80} height={24}
                      style={{ maxHeight: "24px", width: "auto", objectFit: "contain", opacity: 0.7, flexShrink: 0, marginTop: "2px" }} />
                  )}
                  <div>
                    <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface leading-snug">{edu.degree}</h4>
                    <p className="text-xs text-tertiary mt-0.5">{edu.institution}{edu.year ? ` · ${edu.year}` : ""}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Honors + Languages */}
        <FadeIn>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Honors &amp; Awards</p>
              <ul className="space-y-8">
                {credentials.awards.map((award) => (
                  <li key={award.name} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary">{award.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface">{award.name}</h4>
                      <p className="text-xs text-tertiary mt-1">{award.org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Languages</p>
              <ul className="space-y-4">
                {credentials.languages.map((lang, i) => (
                  <li key={lang.lang} className={`flex justify-between items-center py-3 ${i < credentials.languages.length - 1 ? "border-b border-outline-variant/30" : ""}`}>
                    <span className="text-sm font-bold text-on-surface">{lang.lang}</span>
                    <span className="text-[10px] uppercase font-bold text-tertiary">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Key Tools */}
        <FadeIn>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Key Tools</p>
            <div className="flex flex-wrap gap-3">
              {credentials.tools.map((tool) => (
                <span key={tool} className="px-4 py-2 bg-surface-container-high text-xs uppercase font-bold border border-outline-variant/30 rounded-sm text-on-surface">{tool}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
