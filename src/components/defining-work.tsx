"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { projects } from "@/lib/data";

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-5 md:hidden">
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

function ProjectImage({ project }: { project: typeof projects[number] }) {
  if (project.imagePlaceholder) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: project.imagePlaceholder.bg }}>
        <span className="text-xs font-label font-bold uppercase tracking-widest text-secondary/60">{project.imagePlaceholder.label}</span>
      </div>
    );
  }
  return null;
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
      className="h-[calc(100dvh-72px)] flex flex-col overflow-hidden bg-surface-container-low"
      id="defining-work"
      aria-labelledby="defining-work-heading"
    >
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 pt-12 pb-8 flex-shrink-0">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <h2 id="defining-work-heading" className="text-5xl md:text-7xl font-headline">Defining Work</h2>
            <p className="font-label text-sm uppercase tracking-widest text-primary font-bold">
              Selected projects that went beyond the brief
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Mobile carousel */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="md:hidden flex overflow-x-auto gap-4 px-8 snap-x snap-mandatory flex-shrink-0"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {projects.map((project) => (
          <div key={project.index} className="flex-shrink-0 snap-start bg-surface p-8" style={{ width: "85vw" }}>
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">
              {project.index} — {project.company}
            </span>
            <h3 className="text-2xl font-headline mb-3 italic">{project.title}</h3>
            <p className="text-secondary leading-relaxed mb-4 font-body text-sm">{project.description}</p>
            <div className="border-t border-outline-variant/30 pt-3 mb-5">
              <p className="text-[10px] uppercase tracking-wider font-bold text-primary">{project.metrics}</p>
            </div>
            <div className="aspect-video overflow-hidden bg-surface-container-high rounded-sm">
              {project.imagePlaceholder ? <ProjectImage project={project} /> : (
                <Image src={project.image} alt={project.altText ?? project.title} width={400} height={225} className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        ))}
      </div>
      <ScrollDots count={projects.length} active={activeCard} />

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 gap-px bg-outline-variant/20 max-w-[1600px] w-full mx-auto px-24 flex-1 overflow-y-auto">
        {projects.map((project, i) => (
          <FadeIn key={project.index} delay={i * 0.08}>
            <motion.div className="group bg-surface p-12 cursor-default" whileHover={{ backgroundColor: "#ffffff" }} transition={{ duration: 0.4 }}>
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-4 block">
                {project.index} — {project.company}
              </span>
              <h3 className="text-3xl font-headline mb-4 italic">{project.title}</h3>
              <p className="text-secondary leading-relaxed mb-6 font-body">{project.description}</p>
              <div className="border-t border-outline-variant/30 pt-4 mb-8">
                <p className="text-[11px] uppercase tracking-wider font-bold text-primary">{project.metrics}</p>
              </div>
              <div className="aspect-video overflow-hidden bg-surface-container-high rounded-sm">
                {project.imagePlaceholder ? <ProjectImage project={project} /> : (
                  <Image src={project.image} alt={project.altText ?? project.title} width={800} height={450} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
