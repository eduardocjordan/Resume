"use client";

import Image from "next/image";
import { FadeIn } from "./fade-in";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <FadeIn delay={i * 0.1}>
      <div className="flex flex-col h-full border border-ink/10 bg-paper">
        <div className="flex flex-col flex-1 p-7 md:p-9">
          <div className="flex items-center justify-between mb-5">
            <span className="font-stat text-ink/25 text-2xl leading-none">{project.index}</span>
            <p className="font-label text-[11px] uppercase tracking-[0.3em] text-accent">
              {project.company}
            </p>
          </div>
          <h3 className="font-display italic text-ink leading-[1.05] mb-4 text-[clamp(1.6rem,2.4vw,2.2rem)]">
            {project.title}
          </h3>
          <p className="font-body text-[15px] leading-[1.7] text-ink/[0.72] flex-1">
            {project.description}
          </p>
          <div className="mt-7 pt-5 border-t border-ink/15">
            <p className="font-label text-[11px] tracking-[0.08em] text-ink/55">
              {project.metrics}
            </p>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.altText ?? project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
          />
        </div>
      </div>
    </FadeIn>
  );
}

export function DefiningWork() {
  return (
    <section className="bg-paper-dark py-20 md:py-28" id="defining-work" aria-labelledby="defining-work-heading">
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 mb-12 md:mb-16">
        <FadeIn>
          <p className="font-label text-[11px] uppercase tracking-[0.3em] text-accent mb-4">
            Selected projects that went beyond the brief
          </p>
          <h2
            id="defining-work-heading"
            className="font-display text-ink leading-[0.9] text-[clamp(3.5rem,8vw,8rem)]"
          >
            Defining Work
          </h2>
        </FadeIn>
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-[clamp(28px,6vw,96px)]">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
