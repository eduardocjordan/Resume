"use client";

import Image from "next/image";
import { FadeIn } from "./fade-in";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

function ProjectRow({ project, i }: { project: Project; i: number }) {
  // Odd index (0, 2): text left, image right. Even index (1): image left, text right.
  const textFirst = i % 2 === 0;

  return (
    <div className="grid md:grid-cols-2 border-b border-ink/[0.08] md:min-h-[80vh]">
      <div
        className={`relative flex flex-col justify-center overflow-hidden p-7 md:p-[clamp(48px,7vw,96px)] order-2 ${
          textFirst ? "md:order-1" : "md:order-2"
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute bottom-[-20px] left-0 font-stat leading-none text-ink/5 select-none pointer-events-none text-[120px] md:text-[200px]"
        >
          {project.index}
        </span>
        <FadeIn direction={textFirst ? "left" : "none"} delay={i * 0.08}>
          <div className="relative">
            <p className="font-label text-[11px] uppercase tracking-[0.3em] text-accent mb-4">
              {project.company}
            </p>
            <h3 className="font-display italic text-ink leading-[1.0] mb-5 text-[clamp(2rem,5vw,4.5rem)]">
              {project.title}
            </h3>
            <p className="font-body text-base leading-[1.7] text-ink/[0.72] max-w-[520px]">
              {project.description}
            </p>
            <div className="mt-7 pt-5 border-t border-ink/15">
              <p className="font-label text-[11px] tracking-[0.08em] text-ink/55">
                {project.metrics}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <div
        className={`relative overflow-hidden aspect-[4/3] md:aspect-auto order-1 ${
          textFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        <Image
          src={project.image}
          alt={project.altText ?? project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

export function DefiningWork() {
  return (
    <section className="bg-paper-dark" id="defining-work" aria-labelledby="defining-work-heading">
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-24 flex flex-col justify-end min-h-[30vh] pb-12">
        <FadeIn>
          <p className="font-label text-[11px] uppercase tracking-[0.3em] text-accent mb-4">
            Selected Projects · 01–03
          </p>
          <h2
            id="defining-work-heading"
            className="font-display text-ink leading-[0.9] text-[clamp(3.5rem,8vw,8rem)]"
          >
            Defining Work
          </h2>
        </FadeIn>
      </div>

      {projects.map((project, i) => (
        <ProjectRow key={project.index} project={project} i={i} />
      ))}
    </section>
  );
}
