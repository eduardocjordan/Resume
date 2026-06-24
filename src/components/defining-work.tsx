"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FadeIn } from "./fade-in";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

const AUTOPLAY_INTERVAL_MS = 4500;

function ProjectGallery({ photos, title }: { photos: Project["photos"]; title: string }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const total = photos.length;
  const go = (delta: number) => {
    setInteracted(true);
    setIndex((i) => (i + delta + total) % total);
  };
  const photo = photos[index];

  useEffect(() => {
    if (total <= 1 || hovering || interacted) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [total, hovering, interacted]);

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        src={photo.image}
        alt={photo.alt || title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {total > 1 && (
        <>
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
          />
          <p
            className="absolute bottom-3 left-4 font-mono uppercase text-[10px] text-paper"
            style={{ letterSpacing: "0.12em" }}
          >
            {photo.caption} · {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </p>
          <div className="absolute bottom-2.5 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="font-mono text-[13px] leading-none w-6 h-6 flex items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper/20"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="font-mono text-[13px] leading-none w-6 h-6 flex items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper/20"
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}

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

        <ProjectGallery photos={project.photos} title={project.title} />
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
