"use client";

import { useEffect, useRef, useState } from "react";

// Cubic ease-out count-up, gated by an external `start` flag rather than its
// own visibility check — callers decide when the count should begin (e.g.
// orientation-overlay dismissal for Hero, scroll-into-view for Impact).
// Returns both the formatted display value and the 0-1 animation progress,
// so callers can drive secondary effects (e.g. color interpolation) off it.
export function useCountUp(target: number, start: boolean, duration = 1400, decimals = 0) {
  const [state, setState] = useState({ value: (0).toFixed(decimals), progress: 0 });
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState({ value: target.toFixed(decimals), progress: 1 });
      return;
    }

    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setState({ value: (target * eased).toFixed(decimals), progress: eased });
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, decimals]);

  return state;
}
