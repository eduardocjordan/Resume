"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

export function BrandsGrid() {
  return (
    <section className="px-8 md:px-24 py-32 bg-surface" id="brands">
      <div className="max-w-[1200px] mx-auto text-center">
        <FadeIn>
          <p className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase mb-6">
            Portfolio Impact
          </p>
          <h2 className="text-5xl md:text-6xl font-headline italic mb-20">
            I've built brands for
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-items-center opacity-60">
          {brands.map((brand, i) => (
            <FadeIn key={brand} delay={i * 0.05}>
              <motion.div
                className="flex flex-col items-center gap-3 cursor-default"
                initial={{ filter: "grayscale(1)", opacity: 0.6 }}
                whileHover={{ filter: "grayscale(0)", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center font-bold text-[10px] text-center px-2">
                  {brand}
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold">{brand}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
