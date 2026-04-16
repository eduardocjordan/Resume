"use client";

import { FadeIn } from "./fade-in";
import { credentials } from "@/lib/data";

export function Credentials() {
  return (
    <section className="px-8 md:px-24 py-16 md:py-32 bg-surface" id="credentials">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* Education & Certs */}
          <FadeIn>
            <div>
              <h2 className="text-3xl font-headline mb-10 italic border-b-2 border-primary pb-4 inline-block">
                Education &amp; Certs
              </h2>
              <ul className="space-y-7">
                {credentials.education.map((edu) => (
                  <li key={edu.degree} className="flex items-start gap-3">
                    {edu.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        style={{ maxHeight: "24px", width: "auto", objectFit: "contain", opacity: 0.7, flexShrink: 0, marginTop: "2px" }}
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-tertiary mt-0.5">
                        {edu.institution}{edu.year ? ` · ${edu.year}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Honors & Awards */}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-3xl font-headline mb-10 italic border-b-2 border-primary pb-4 inline-block">
                Honors &amp; Awards
              </h2>
              <ul className="space-y-8">
                {credentials.awards.map((award) => (
                  <li key={award.name} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary">{award.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold font-label uppercase tracking-wider text-on-surface">
                        {award.name}
                      </h4>
                      <p className="text-xs text-tertiary mt-1">{award.org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Languages + Tools */}
          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-3xl font-headline mb-10 italic border-b-2 border-primary pb-4 inline-block">
                Languages
              </h2>
              <ul className="space-y-4 mb-12">
                {credentials.languages.map((lang, i) => (
                  <li
                    key={lang.lang}
                    className={`flex justify-between items-center py-3 ${
                      i < credentials.languages.length - 1 ? "border-b border-outline-variant/30" : ""
                    }`}
                  >
                    <span className="text-sm font-bold text-on-surface">{lang.lang}</span>
                    <span className="text-[10px] uppercase font-bold text-tertiary">{lang.level}</span>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-surface-container-low rounded-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">
                  Key Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {credentials.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 bg-white text-[9px] uppercase font-bold border border-outline-variant/30 rounded-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
