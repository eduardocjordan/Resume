"use client";

import Image from "next/image";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

export function BrandsGrid() {
  return (
    <section className="px-8 md:px-24 py-16 md:py-32 bg-surface" id="brands" aria-labelledby="brands-heading">
      <div className="max-w-[1200px] mx-auto text-center">
        <FadeIn>
          <h2 id="brands-heading" className="text-5xl md:text-6xl font-headline italic mb-16 md:mb-20">
            Brands I&rsquo;ve helped grow
          </h2>
        </FadeIn>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-12 items-center justify-items-center">
          {brands.map((brand, i) => (
            <FadeIn key={brand.name} delay={i * 0.04}>
              <div className="flex items-center justify-center cursor-default w-full opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={40}
                  style={{ height: "40px", width: "auto", objectFit: "contain" }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
