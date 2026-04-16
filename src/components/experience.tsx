"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./fade-in";
import { experience, type Role } from "@/lib/data";

function TimelineEntry({ role, index }: { role: Role; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef<HTMLDivElement>(null);

  // Mobile: auto-expand via IntersectionObserver at 30% visibility
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.innerWidth < 768) setOpen(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const logoSrc = role.logo || role.logoExternal || null;

  return (
    <FadeIn delay={index * 0.08}>
      <div ref={ref} className="flex gap-0">
        {/* Left: logo column */}
        <div className="w-20 md:w-24 flex-shrink-0 flex flex-col items-center pt-1">
          <div className="w-16 h-12 flex items-center justify-center">
            {logoSrc ? (
              role.logo ? (
                <Image
                  src={logoSrc}
                  alt={role.company}
                  width={64}
                  height={48}
                  className="object-contain max-h-12 w-auto"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoSrc}
                  alt={role.company}
                  style={{ maxHeight: "48px", maxWidth: "80px", objectFit: "contain" }}
                />
              )
            ) : (
              <div className="w-12 h-12 rounded-sm bg-surface-container-high flex items-center justify-center">
                <span className="font-headline italic text-primary text-sm font-bold">
                  {role.company.slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Center: timeline line + dot */}
        <div className="flex flex-col items-center mx-4">
          <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1.5 z-10" />
          <div className="w-px bg-outline-variant/30 flex-1 mt-1" />
        </div>

        {/* Right: content */}
        <div className="flex-1 pb-10">
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-full text-left group"
            aria-expanded={open}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-tertiary mb-1">
                  {role.dates}
                </div>
                <h3 className="text-lg font-bold font-label text-on-surface leading-snug">
                  {role.company}
                </h3>
                <p className="text-sm text-secondary mt-0.5 leading-snug">{role.title}</p>
              </div>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="material-symbols-outlined text-tertiary flex-shrink-0 mt-1 text-xl"
              >
                expand_more
              </motion.span>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <p className="text-sm text-secondary leading-relaxed mb-5">
                    {role.description}
                  </p>
                  <ul className="space-y-2.5 mb-5">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>
                          <strong>{b.bold}</strong>
                          {b.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface-container-high text-[10px] uppercase font-bold text-tertiary rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FadeIn>
  );
}

export function Experience() {
  return (
    <section className="px-8 md:px-24 py-16 md:py-32 bg-surface-container-low" id="experience">
      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-headline italic">Where I&rsquo;ve worked</h2>
            <p className="text-secondary mt-4 font-body">
              A career built at the intersection of strategy, innovation, and execution.
            </p>
          </div>
        </FadeIn>

        <div>
          {experience.map((role, i) => (
            <TimelineEntry key={role.company} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
