"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FadeIn } from "./fade-in";
import { projects } from "@/lib/data";

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-5 md:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i === active ? "#d4622a" : "#f4f4f2" }}
        />
      ))}
    </div>
  );
}

export function DefiningWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const children = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - pl - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveCard(closest);
  };

  return (
    <section
      className="h-[calc(100dvh-72px)] flex flex-col overflow-hidden bg-paper-dark"
      id="defining-work"
      aria-labelledby="defining-work-heading"
    >
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 pt-12 pb-8 flex-shrink-0">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <h2 id="defining-work-heading" className="text-5xl md:text-7xl font-headline text-ink">Defining Work</h2>
            <p className="font-label text-sm uppercase tracking-widest text-accent font-bold">
              Selected projects that went beyond the brief
            </p>
          </div>
        </FadeIn>
      </div>

      {/*
       * Single render: flex carousel on mobile, CSS grid on desktop.
       * Each project card adapts its layout via responsive classes.
       */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible gap-4 md:gap-px px-8 md:px-24 snap-x snap-mandatory md:snap-none flex-1 min-h-0 md:overflow-y-auto bg-transparent md:bg-ink/10"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" } as React.CSSProperties}
      >
        {projects.map((project, i) => (
          <FadeIn key={project.index} delay={i * 0.08} className="h-full">
            <div className="group flex-shrink-0 md:flex-shrink w-[85vw] md:w-auto h-full flex flex-col snap-start md:snap-align-none bg-paper p-8 md:p-12 cursor-default md:hover:bg-paper-dark transition-colors duration-300">
              <span className="text-xs font-bold text-accent tracking-widest uppercase mb-3 md:mb-4 block">
                {project.index} — {project.company}
              </span>
              <h3 className="text-2xl md:text-3xl font-headline mb-3 md:mb-4 italic text-ink">{project.title}</h3>
              <p className="text-ink/70 leading-relaxed mb-4 md:mb-6 font-body text-sm">{project.description}</p>
              <div className="border-t border-ink/20 pt-3 md:pt-4 mb-5 md:mb-8">
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-accent">{project.metrics}</p>
              </div>
              <div className="aspect-video flex-1 min-h-0 overflow-hidden bg-paper-dark rounded-sm">
                <Image
                  src={project.image}
                  alt={project.altText ?? project.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <ScrollDots count={projects.length} active={activeCard} />
    </section>
  );
}
