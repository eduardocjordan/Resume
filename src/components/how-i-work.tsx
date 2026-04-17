"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./fade-in";
import { stories } from "@/lib/data";

const N = stories.length;
const extended = [stories[N - 1], ...stories, stories[0]];

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i === active ? "#d4622a" : "rgba(255,255,255,0.25)" }}
        />
      ))}
    </div>
  );
}

export function HowIWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const first = el.children[1] as HTMLElement;
    if (first) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = first.offsetLeft - pl;
    }
  }, []);

  const jumpTo = (el: HTMLElement, idx: number) => {
    const child = el.children[idx] as HTMLElement;
    if (!child) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = child.offsetLeft - pl;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.scrollBehavior = ""; }));
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const children = Array.from(el.children) as HTMLElement[];

    let closest = 1;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - pl - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });

    let realIdx: number;
    if (closest <= 0) realIdx = N - 1;
    else if (closest >= N + 1) realIdx = 0;
    else realIdx = closest - 1;
    setActiveCard(realIdx);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (closest <= 0) jumpTo(el, N);
      else if (closest >= N + 1) jumpTo(el, 1);
    }, 80);
  };

  return (
    <section
      className="h-[calc(100dvh-72px)] flex flex-col overflow-hidden bg-editorial-maroon text-white relative"
      id="how-i-work"
      aria-labelledby="how-i-work-heading"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-white/[0.03] -skew-x-12 translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-24 pt-12 pb-6 flex-shrink-0 relative z-10">
        <FadeIn>
          <p className="text-white/40 font-label font-bold text-[10px] tracking-[0.3em] uppercase mb-3">
            Process &amp; Approach
          </p>
          <h2 id="how-i-work-heading" className="text-4xl md:text-9xl font-headline italic mb-6 md:mb-12">How I Work</h2>
          <div className="w-full h-px bg-white/10" />
        </FadeIn>
      </div>

      {/* Mobile carousel */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="md:hidden flex overflow-x-auto gap-4 px-8 snap-x snap-mandatory flex-shrink-0 relative z-10"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {extended.map((story, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-start p-8 bg-white/5 border border-white/10"
            style={{ width: "85vw" }}
          >
            <h3 className="text-xl font-headline italic mb-4">{story.title}</h3>
            <p className="text-white/70 leading-relaxed font-body text-sm font-light">
              {story.body}
            </p>
          </div>
        ))}
      </div>
      <ScrollDots count={N} active={activeCard} />

      {/* Mobile blockquote */}
      <div className="md:hidden px-8 pt-6 flex-shrink-0 relative z-10">
        <blockquote className="text-xl font-headline italic leading-tight text-white/80 border-t border-white/10 pt-4">
          &ldquo;The methodology itself became an asset the company didn&rsquo;t have before I arrived.&rdquo;
        </blockquote>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 gap-x-20 gap-y-24 max-w-[1400px] w-full mx-auto px-24 flex-1 content-center relative z-10">
        {stories.map((story, i) => (
          <FadeIn key={story.title} delay={i * 0.1}>
            {i === 2 && (
              <div className="col-span-2 w-full h-px bg-white/10 -my-4" />
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

      {/* Desktop blockquote */}
      <FadeIn>
        <div className="hidden md:block max-w-[1400px] w-full mx-auto px-24 pb-12 relative z-10 flex-shrink-0">
          <div className="pt-12 border-t border-white/10 flex items-start gap-8">
            <div className="opacity-30 mt-2 flex-shrink-0">
              <svg fill="currentColor" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3602 2 17.017 2H20.017C21.6739 2 23.017 3.34315 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.34315 2.36015 2 4.017 2H7.017C8.67386 2 10.017 3.34315 10.017 5V15C10.017 18.3137 7.3307 21 4.017 21H1.017Z" />
              </svg>
            </div>
            <blockquote className="text-4xl md:text-6xl font-headline italic leading-tight text-white/95 max-w-5xl">
              &ldquo;The methodology itself became an asset the company didn&rsquo;t have before I arrived.&rdquo;
            </blockquote>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
