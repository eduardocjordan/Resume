"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

const groups = [brands.slice(0, 4), brands.slice(4, 8), brands.slice(8, 12)];
const N = groups.length;
const extendedGroups = [groups[N - 1], ...groups, groups[0]];

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-6 md:hidden">
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

export function BrandsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (closest <= 0) realIdx = N - 1;
    else if (closest >= N + 1) realIdx = 0;
    else realIdx = closest - 1;
    setActiveGroup(realIdx);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (closest <= 0) jumpTo(el, N);
      else if (closest >= N + 1) jumpTo(el, 1);
    }, 80);
  };

  return (
    <section className="px-8 md:px-24 py-16 md:py-32 bg-surface" id="brands" aria-labelledby="brands-heading">
      <div className="max-w-[1200px] mx-auto text-center">
        <FadeIn>
          <h2 id="brands-heading" className="text-5xl md:text-6xl font-headline italic mb-12 md:mb-20">
            Brands I&rsquo;ve helped grow
          </h2>
        </FadeIn>

        {/* Mobile infinite carousel — 3 slides of 2×2 */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {extendedGroups.map((group, gi) => (
            <div
              key={gi}
              className="flex-shrink-0 w-full snap-start grid grid-cols-2 gap-x-10 gap-y-10 items-center justify-items-center px-4"
            >
              {group.map((brand) => (
                <div key={brand.name} className="flex items-center justify-center opacity-70 w-full">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={40}
                    style={{ height: "40px", width: "auto", objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <ScrollDots count={N} active={activeGroup} />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-12 items-center justify-items-center">
          {brands.map((brand, i) => (
            <FadeIn key={brand.name} delay={i * 0.04}>
              <div className="flex items-center justify-center cursor-default w-full opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
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
