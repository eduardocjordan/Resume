"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/fade-in";

export const ORIENTATION_DISMISS_KEY = "orientation_dismissed";
const DISMISS_KEY = ORIENTATION_DISMISS_KEY;

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
      window.dispatchEvent(new Event("site:orientation-dismissed"));
    };
    const dismissOnKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "End", " ", "Enter", "Escape"].includes(e.key)) dismiss();
    };
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    window.addEventListener("wheel", dismiss, { once: true, passive: true });
    window.addEventListener("touchmove", dismiss, { once: true, passive: true });
    window.addEventListener("keydown", dismissOnKey, { once: true });
    return () => {
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      window.removeEventListener("keydown", dismissOnKey);
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
    window.dispatchEvent(new Event("site:orientation-dismissed"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          onClick={dismiss}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 overflow-hidden cursor-pointer font-mono"
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

          {/* Top kicker */}
          <p
            className="absolute uppercase text-[11px]"
            style={{
              top: "clamp(28px, 5vh, 48px)",
              left: "clamp(28px, 6vw, 96px)",
              letterSpacing: "0.34em",
              color: "rgba(241,239,233,.42)",
            }}
          >
            Prologue — 00<span className="hidden sm:inline"> / Eduardo Castro</span>
          </p>

          {/* Centered content */}
          <FadeIn direction="none" delay={0.3}>
            <div
              className="absolute"
              style={{
                left: "clamp(28px, 6vw, 96px)",
                top: "50%",
                transform: "translateY(-50%)",
                maxWidth: 880,
              }}
            >
              <p
                className="uppercase text-[11px]"
                style={{ letterSpacing: "0.34em", color: "#ff4d00", marginBottom: 26 }}
              >
                Before we begin
              </p>
              <p
                className="text-[30px] md:text-[clamp(1.7rem,3.5vw,3.15rem)]"
                style={{ fontWeight: 700, lineHeight: 1.16, color: "#f4f2ec" }}
              >
                I built this with AI.
                <br />
                Then I built <span style={{ color: "#ff4d00" }}>a brain</span> inside it.
              </p>
              <p
                className="text-[12.5px] md:text-[clamp(0.82rem,1.05vw,0.96rem)] mt-[22px] md:mt-[30px]"
                style={{ lineHeight: 1.85, color: "rgba(241,239,233,.62)", maxWidth: 540 }}
              >
                That icon in the corner — it knows my work, my background, what I&apos;ve shipped. Ask it anything.
              </p>
            </div>
          </FadeIn>

          {/* Directional gesture toward the chat widget's floating button, bottom-right of viewport — desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:block absolute text-right pointer-events-none"
            style={{ right: "clamp(96px, 11vw, 168px)", bottom: 118 }}
          >
            <p
              className="uppercase text-[11px]"
              style={{ letterSpacing: "0.22em", color: "rgba(241,239,233,.5)", lineHeight: 1.7 }}
            >
              that icon,
              <br />
              bottom-right
            </p>
            <p
              className="uppercase text-[11px] animate-dash-glow"
              style={{ letterSpacing: "0.22em", color: "#ffffff", marginTop: 8, fontWeight: 700 }}
            >
              ask it anything ↘
            </p>
            <svg
              width="170"
              height="140"
              viewBox="0 0 170 140"
              fill="none"
              className="absolute"
              style={{ right: 14, bottom: 50, filter: "drop-shadow(0 0 6px rgba(255,255,255,.55))" }}
              aria-hidden="true"
            >
              <path
                d="M8 8 Q 96 30 150 116"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeDasharray="0.1 14"
                strokeLinecap="round"
                className="animate-march-glow"
              />
              <path
                d="M150 116 L131 112 M150 116 L145 97"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="animate-dash-glow"
              />
            </svg>
          </motion.div>

          {/* Directional gesture — mobile (simplified) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:hidden absolute uppercase text-[11px] pointer-events-none animate-dash-glow"
            style={{ right: 84, bottom: 128, color: "#ffffff", letterSpacing: "0.2em", fontWeight: 700 }}
          >
            ask it ↘
          </motion.p>
          <div
            className="md:hidden absolute pointer-events-none"
            style={{
              right: 74,
              bottom: 118,
              width: 48,
              borderTop: "1px dashed rgba(255,77,0,.6)",
              transform: "rotate(36deg)",
              transformOrigin: "right center",
            }}
          />

          <button
            type="button"
            className="absolute flex items-center gap-3 uppercase text-[11px] md:text-[12px]"
            style={{
              left: "clamp(28px, 6vw, 96px)",
              bottom: 40,
              background: "none",
              border: "none",
              letterSpacing: "0.28em",
              color: "#f1efe9",
            }}
          >
            <span className="inline-block animate-bob leading-none">↓</span>
            <span>Enter Site</span>
            <span style={{ width: 54, height: 1, background: "rgba(241,239,233,.3)" }} />
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
