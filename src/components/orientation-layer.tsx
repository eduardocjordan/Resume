"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/fade-in";

const DISMISS_KEY = "orientation_dismissed";

export function OrientationLayer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const show = () => setVisible(true);
    window.addEventListener("site:loader-complete", show);
    return () => window.removeEventListener("site:loader-complete", show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => {
      setVisible(false);
      sessionStorage.setItem(DISMISS_KEY, "true");
    };
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    return () => window.removeEventListener("scroll", dismiss);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          onClick={dismiss}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex flex-col overflow-hidden cursor-pointer"
          style={{ zIndex: 9000, background: "#0a0a0a", color: "#f1efe9" }}
        >
          {/* Grain texture — matches the loader's near-black/orange treatment for continuity */}
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-grain pointer-events-none"
            style={{
              opacity: 0.05,
              mixBlendMode: "screen",
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          {/* Top hairline */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(255,77,0,.55)" }} />

          <p
            className="absolute uppercase z-10"
            style={{
              top: "clamp(28px, 5vh, 48px)",
              left: "clamp(32px, 6vw, 96px)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.3em",
              color: "rgba(241,239,233,.5)",
            }}
          >
            Prologue — 00 / Eduardo Castro
          </p>

          <div className="relative z-10 flex-1 flex items-center px-8 md:px-24">
            <FadeIn direction="none" delay={0.3} className="w-full">
              <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-[1400px] mx-auto">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.25em] mb-4"
                    style={{ color: "#ff4d00", fontFamily: "'Space Mono', monospace" }}
                  >
                    Before we begin
                  </p>
                  <h2
                    className="font-headline"
                    style={{ fontSize: "clamp(1.7rem, 3.5vw, 3.15rem)", fontWeight: 700, color: "#f4f2ec", lineHeight: 1.15 }}
                  >
                    I built this with AI.
                    <br />
                    Then I built <span style={{ color: "#ff4d00" }}>a brain</span> inside it.
                  </h2>
                  <p className="mt-6 text-base md:text-lg leading-relaxed max-w-md" style={{ color: "rgba(241,239,233,.62)" }}>
                    That icon in the corner — it knows my work, my background, what I&apos;ve shipped. Ask it anything.
                  </p>
                </div>

                <div className="hidden md:block" />
              </div>
            </FadeIn>
          </div>

          {/* Directional gesture toward the chat widget's floating button, bottom-right of viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute z-10 text-right"
            style={{
              bottom: "clamp(64px, 14vh, 110px)",
              right: "clamp(32px, 6vw, 96px)",
              fontFamily: "'Space Mono', monospace",
              color: "#ff4d00",
            }}
          >
            <p className="hidden md:block text-sm uppercase tracking-wide leading-snug">
              that icon,
              <br />
              bottom-right
            </p>
            <p className="md:hidden text-sm uppercase tracking-wide">ask it ↘</p>
            <p className="hidden md:block mt-2 text-sm uppercase tracking-wide">ask it anything ↘</p>
            <div
              className="hidden md:block ml-auto mt-3 w-16 border-t border-dashed"
              style={{ borderColor: "#ff4d00", transform: "rotate(34deg)", transformOrigin: "right" }}
            />
          </motion.div>

          <button
            type="button"
            className="absolute z-10 flex flex-col items-center gap-2"
            style={{
              bottom: "clamp(24px, 5vh, 40px)",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(241,239,233,.7)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <span className="inline-block animate-bob text-lg leading-none">↓</span>
            <span className="text-[11px] uppercase tracking-[0.25em]">Start</span>
            <span className="block w-8 h-px bg-current opacity-40" />
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
