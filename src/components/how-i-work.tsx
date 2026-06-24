"use client";

import { useState } from "react";
import { FadeIn } from "./fade-in";
import { stories } from "@/lib/data";

export function HowIWork() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="py-24 md:py-32 bg-ink text-paper relative overflow-hidden"
      id="how-i-work"
      aria-labelledby="how-i-work-heading"
    >
      <div className="absolute top-0 right-0 w-[50%] h-full bg-paper/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <FadeIn direction="rule">
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: "2px", background: "linear-gradient(90deg, #d4622a, rgba(212,98,42,0))" }}
        />
      </FadeIn>

      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-24 pb-10 md:pb-16 relative z-10">
        <FadeIn>
          <p className="text-accent font-label text-[11px] tracking-[0.3em] uppercase mb-3">03 / Method</p>
          <h2 id="how-i-work-heading" className="font-display italic leading-[0.9] mb-6 md:mb-12 text-paper text-[clamp(3.5rem,8vw,9rem)]">How I Work</h2>
          <div className="w-full h-px bg-paper/10" />
        </FadeIn>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-24 relative z-10">
        <div className="flex flex-col md:flex-row md:h-[460px] border-t border-paper/10">
          {stories.map((story, i) => {
            const isActive = i === activeIndex;
            return (
              <FadeIn
                key={story.title}
                delay={i * 0.06}
                className={`border-b md:border-b-0 md:border-l border-paper/10 overflow-hidden transition-[flex] duration-[650ms] ease-[cubic-bezier(0.4,0.05,0.2,1)] md:h-full ${
                  isActive ? "md:flex-[3]" : "md:flex-[0.6]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-expanded={isActive}
                  className="w-full h-full text-left flex items-start gap-5 md:flex-col md:items-stretch md:gap-0 py-6 md:py-0 px-5 md:px-0"
                >
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-6 md:py-10 md:px-6 flex-shrink-0">
                    <span className="font-stat text-accent/70 text-2xl md:text-3xl leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-display italic text-paper text-lg md:text-xl leading-tight whitespace-nowrap ${
                        isActive ? "" : "md:[writing-mode:vertical-rl] md:rotate-180"
                      }`}
                    >
                      {story.title}
                    </h3>
                  </div>

                  {isActive && (
                    <div className="flex-1 min-w-0 md:py-10 md:pr-8 md:pl-2">
                      <p className="text-paper/70 font-body text-[15px] md:text-base leading-[1.75] font-light">
                        {story.body}
                      </p>
                      <div className="mt-6 pt-6 border-t border-paper/15">
                        <p className="font-display italic text-accent text-base md:text-lg leading-snug">
                          {story.aphorism}
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <FadeIn>
        <div className="max-w-[1400px] w-full mx-auto px-8 md:px-24 pt-16 md:pt-20 relative z-10">
          <div className="pt-10 md:pt-12 border-t border-paper/15 flex items-start gap-6 md:gap-8">
            <div className="hidden md:block opacity-30 mt-2 flex-shrink-0">
              <svg fill="currentColor" height="28" width="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3602 2 17.017 2H20.017C21.6739 2 23.017 3.34315 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.34315 2.36015 2 4.017 2H7.017C8.67386 2 10.017 3.34315 10.017 5V15C10.017 18.3137 7.3307 21 4.017 21H1.017Z" />
              </svg>
            </div>
            <blockquote className="font-display italic leading-[1.1] text-paper/95 max-w-[900px] text-[clamp(1.75rem,5vw,5rem)]">
              &ldquo;The methodology itself became an asset the company didn&rsquo;t have before I arrived.&rdquo;
            </blockquote>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
