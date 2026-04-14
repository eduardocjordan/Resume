"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero } from "@/lib/data";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-20 bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center max-w-[1600px] mx-auto w-full">
        {/* Left column */}
        <div className="md:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-3 py-1 bg-surface-container-high text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-sm"
          >
            {hero.role} · {hero.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="text-7xl md:text-9xl leading-[0.9] font-headline text-on-surface"
          >
            Eduardo
            <br />
            <span className="italic text-primary">Castro</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="text-xl md:text-2xl leading-relaxed text-secondary max-w-xl font-light"
            dangerouslySetInnerHTML={{ __html: hero.tagline }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.a
              href={hero.cv}
              className="editorial-gradient text-white px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download CV
            </motion.a>
            <motion.a
              href={hero.linkedin}
              className="bg-white border border-outline-variant text-on-surface px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-surface-container-low transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="material-symbols-outlined text-lg">group</span>
              LinkedIn
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-white border border-outline-variant text-on-surface px-8 py-4 rounded-sm font-label text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-surface-container-low transition-colors"
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
          <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-sm relative shadow-2xl group">
            <Image
              src={hero.portrait}
              alt="Eduardo Castro Professional Portrait"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            {/* Stats overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-on-background/90 backdrop-blur-md grid grid-cols-3 divide-x divide-white/10 text-center py-6">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-headline text-white">
                    {stat.value}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-tighter text-white/50 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
