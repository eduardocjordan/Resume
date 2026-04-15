"use client";

import Image from "next/image";
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

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-14 items-center justify-items-center">
          {brands.map((brand, i) => (
            <FadeIn key={brand.name} delay={i * 0.04}>
              <motion.div
                className="flex flex-col items-center gap-3 cursor-default"
                initial={{ opacity: 0.5, filter: "grayscale(1)" }}
                whileHover={{ opacity: 1, filter: "grayscale(0)" }}
                transition={{ duration: 0.3 }}
              >
                {brand.logo ? (
                  <div className="h-10 w-28 relative flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="112px"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-28 flex items-center justify-center font-bold text-[10px] text-tertiary uppercase tracking-widest">
                    {brand.name}
                  </div>
                )}
                <span className="text-[9px] uppercase tracking-widest font-bold text-tertiary">
                  {brand.name}
                </span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
