"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/data";

export function Hero() {
  const { scrollY } = useScroll();
  const h1Opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const h1Scale = useTransform(scrollY, [0, 200], [1, 0.95]);

  return (
    <section
      className="min-h-[100dvh] flex flex-col justify-center px-8 md:px-24 py-20 bg-paper"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center max-w-[1600px] mx-auto w-full">

        {/* Left column */}
        <div className="md:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-3 py-1 bg-paper-dark text-accent text-xs font-bold tracking-[0.2em] uppercase rounded-sm"
          >
            {hero.role} · {hero.location}
          </motion.div>

          <motion.div style={{ opacity: h1Opacity, scale: h1Scale }}>
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="text-7xl md:text-9xl leading-[0.9] font-headline text-ink"
            >
              Eduardo
              <br />
              <span className="italic text-accent">Castro</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="space-y-4"
          >
            {hero.taglines.map((t, i) => (
              <p
                key={i}
                className="text-lg md:text-xl leading-relaxed text-ink/70 font-light"
                dangerouslySetInnerHTML={{ __html: t }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.a
              href={hero.cv}
              download
              data-gtm-event="resume_download"
              data-gtm-location="hero"
              className="editorial-gradient text-white px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download Resume
            </motion.a>
            <motion.a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-gtm-event="social_click"
              data-gtm-location="hero"
              data-gtm-platform="linkedin"
              className="bg-paper border border-ink/20 text-ink px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-paper-dark transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="material-symbols-outlined text-lg">group</span>
              LinkedIn
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-paper border border-ink/20 text-ink px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-paper-dark transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Get in touch
            </motion.a>
          </motion.div>
        </div>

        {/* Right column — portrait */}
        <motion.div
          className="md:col-span-5 relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="aspect-[4/5] bg-paper-dark overflow-hidden rounded-sm relative shadow-2xl">
            <Image
              src={hero.portrait}
              alt="Eduardo Castro — Marketing Director, Brand Growth Strategist"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            {/* Stats overlay — desktop only */}
            <div className="hidden md:grid absolute bottom-0 left-0 right-0 bg-ink/90 backdrop-blur-md grid-cols-3 divide-x divide-paper/10 text-center py-6">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-headline text-paper">
                    {stat.value}<span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-tighter text-paper/50 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip — mobile only */}
          <div className="md:hidden grid grid-cols-3 divide-x divide-paper/30 bg-ink text-center py-5 mt-0">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-headline text-paper">
                  {stat.value}<span className="text-accent">{stat.suffix}</span>
                </div>
                <div className="text-[9px] uppercase tracking-tighter text-paper/50 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
