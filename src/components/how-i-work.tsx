"use client";

import { FadeIn } from "./fade-in";
import { stories } from "@/lib/data";

export function HowIWork() {
  return (
    <section
      className="px-8 md:px-24 py-32 bg-editorial-maroon text-white relative overflow-hidden"
      id="how-i-work"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-white/[0.03] -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <FadeIn>
          <div className="mb-12">
            <p className="text-white/40 font-label font-bold text-[10px] tracking-[0.3em] uppercase mb-4">
              Process &amp; Approach
            </p>
            <h2 className="text-7xl md:text-9xl font-headline italic mb-12">How I Work</h2>
            <div className="w-full h-px bg-white/10 mb-20" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 mb-32">
          {stories.map((story, i) => (
            <FadeIn key={story.title} delay={i * 0.1}>
              {i === 2 && (
                <div className="hidden md:block col-span-2 w-full h-px bg-white/10 -my-4" />
              )}
              <div>
                <h3 className="text-3xl font-headline italic mb-6">{story.title}</h3>
                <p className="text-white/70 leading-relaxed font-body text-sm font-light">
                  {story.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-24 pt-16 border-t border-white/10 flex flex-col md:flex-row items-start gap-8">
            <div className="opacity-30 mt-2 flex-shrink-0">
              <svg
                fill="currentColor"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3602 2 17.017 2H20.017C21.6739 2 23.017 3.34315 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.34315 2.36015 2 4.017 2H7.017C8.67386 2 10.017 3.34315 10.017 5V15C10.017 18.3137 7.3307 21 4.017 21H1.017Z" />
              </svg>
            </div>
            <blockquote className="text-4xl md:text-6xl font-headline italic leading-tight text-white/95 max-w-5xl">
              &ldquo;The methodology itself became an asset the company didn&rsquo;t have before I
              arrived.&rdquo;
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
