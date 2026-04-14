"use client";

import { FadeIn } from "./fade-in";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section
      className="px-8 md:px-24 py-32 bg-surface-container-low"
      id="experience"
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-headline italic">Where I've worked</h2>
            <p className="text-secondary mt-4 font-body">
              A career built at the intersection of strategy, innovation, and execution.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-px bg-outline-variant/20 border border-outline-variant/20">
          {experience.map((role, i) => (
            <FadeIn key={role.company} delay={i * 0.06}>
              <div className="bg-surface p-12 hover:bg-surface-container-lowest transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left meta */}
                  <div className="md:col-span-3 flex flex-col items-start">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center bg-surface-container-high rounded-sm overflow-hidden">
                      <span className="font-headline italic text-primary text-xl">
                        {role.monogram}
                      </span>
                    </div>
                    <div
                      className={`font-bold text-[10px] tracking-widest uppercase mb-2 ${
                        i === 0 ? "text-primary" : "text-tertiary"
                      }`}
                    >
                      {role.dates}
                    </div>
                    <h3 className="text-2xl font-headline">{role.company}</h3>
                    <p className="text-xs text-tertiary uppercase tracking-widest">
                      {role.industry}
                    </p>
                  </div>

                  {/* Right detail */}
                  <div className="md:col-span-9">
                    <h4 className="text-xl font-bold font-label mb-4">{role.title}</h4>
                    <p className="text-secondary font-body mb-6">{role.description}</p>
                    <ul className="space-y-3 mb-8">
                      {role.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>
                            <strong>{b.bold}</strong>
                            {b.rest}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-surface-container-high text-[10px] uppercase font-bold text-tertiary rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
