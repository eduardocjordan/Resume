"use client";

import { useEffect, useState } from "react";

export function ProgressBar() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const pct =
        window.scrollY /
        Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop vertical progress bar */}
      <div className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 w-[2px] h-[60vh] bg-ink/15 z-40">
        <div
          className="w-full bg-accent transition-none"
          style={{ height: `${scrollPct * 100}%` }}
        />
      </div>

      {/* Mobile horizontal progress bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[3px] bg-ink/15 z-[200]">
        <div
          className="h-full bg-accent transition-none"
          style={{ width: `${scrollPct * 100}%` }}
        />
      </div>
    </>
  );
}
