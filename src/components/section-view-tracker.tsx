"use client";

import { useEffect } from "react";
import { pushGtmEvent } from "@/lib/gtm";

// Every section id on the page, in render order.
const SECTIONS = [
  "hero",
  "brands",
  "doritos-rainbow",
  "defining-work",
  "impact",
  "experience",
  "how-i-work",
  "credentials",
  "contact",
];

// Fires section_view once per section per page view, turning scroll_depth's
// "how far" into "which sections were actually seen". Threshold is 0.2 (not
// the 0.3 the nav/eyebrow observers use) because sections taller than the
// viewport cap the achievable intersection ratio — 0.3 can be unreachable on
// short screens.
export function SectionViewTracker() {
  useEffect(() => {
    const seen = new Set<string>();
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !seen.has(section)) {
            seen.add(section);
            pushGtmEvent("section_view", { section });
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
