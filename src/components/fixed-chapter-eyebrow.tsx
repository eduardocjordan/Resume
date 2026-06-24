"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const chapters: Record<string, { num: string; label: string }> = {
  "defining-work": { num: "02", label: "Highlights" },
  "how-i-work":    { num: "03", label: "Method" },
  "experience":    { num: "04", label: "Career" },
  "brands":        { num: "04", label: "Career" },
  "impact":        { num: "05", label: "Impact" },
  "credentials":   { num: "06", label: "Credentials" },
  "contact":       { num: "07", label: "Contact" },
};

// "hero" and "doritos-rainbow" are observed but absent from `chapters`,
// so crossing them resolves to no chapter and hides the eyebrow.
const sections = ["hero", "doritos-rainbow", ...Object.keys(chapters)];

export function FixedChapterEyebrow() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const chapter = chapters[activeSection];

  return (
    <div className="hidden md:block fixed top-24 left-24 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {chapter && (
          <motion.p
            key={`${chapter.num}-${chapter.label}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-label text-[11px] uppercase tracking-[0.3em] text-ink/50"
          >
            {chapter.num} / {chapter.label}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
