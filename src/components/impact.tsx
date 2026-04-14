"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { impactMetrics } from "@/lib/data";

export function Impact() {
  return (
    <section
      className="px-8 md:px-24 py-32 bg-on-background text-white relative overflow-hidden"
      id="impact"
    >
      {/* Angled accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/10 skew-x-12 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end gap-12 mb-24">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-8xl font-headline leading-tight">
                Results that <br />
                <span className="italic text-primary">hold up.</span>
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="text-xl text-secondary-fixed opacity-70 leading-relaxed font-light">
                Numbers from real engagements, not projections. Each one traces back to a
                strategic decision, a team, and a market.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactMetrics.map((metric, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                className="p-10 bg-white/5 border border-white/10 backdrop-blur-3xl"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">
                  {metric.company}
                </p>
                <div className="text-5xl font-headline mb-4 text-primary">{metric.stat}</div>
                <p className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  {metric.label}
                </p>
                <p className="text-sm text-secondary-fixed opacity-60 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
