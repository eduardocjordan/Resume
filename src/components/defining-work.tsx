"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { projects } from "@/lib/data";

export function DefiningWork() {
  return (
    <section
      className="px-8 md:px-24 py-32 bg-surface-container-low"
      id="defining-work"
    >
      <div className="max-w-[1600px] mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-headline">Defining Work</h2>
            <p className="font-label text-sm uppercase tracking-widest text-primary font-bold">
              Selected projects that went beyond the brief
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20">
          {projects.map((project, i) => (
            <FadeIn key={project.index} delay={i * 0.08}>
              <motion.div
                className="group bg-surface p-12 cursor-default"
                whileHover={{ backgroundColor: "#ffffff" }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-bold text-primary tracking-widest uppercase mb-4 block">
                  {project.index} — {project.company}
                </span>
                <h3 className="text-3xl font-headline mb-4 italic">{project.title}</h3>
                <p className="text-secondary leading-relaxed mb-6 font-body">
                  {project.description}
                </p>
                <div className="border-t border-outline-variant/30 pt-4 mb-8">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-primary">
                    {project.metrics}
                  </p>
                </div>
                <div className="aspect-video overflow-hidden bg-surface-container-high rounded-sm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
