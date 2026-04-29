"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const barRef    = useRef<HTMLDivElement>(null);
  const wipeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const loaderEl = loaderRef.current;
    const textEl   = textRef.current;
    const barEl    = barRef.current;
    const wipeEl   = wipeRef.current;
    if (!loaderEl || !textEl || !barEl || !wipeEl) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        loaderEl.style.display = "none";
      },
    });

    document.fonts.ready.then(() => {
      tl.to(textEl, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(barEl,   { width: "100%", duration: 1.4, ease: "power1.inOut" }, 0.4)
        .to(textEl,  { opacity: 0, duration: 0.3 }, "+=0.2")
        .to(wipeEl,  { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
        .to(wipeEl,  { scaleX: 0, transformOrigin: "right", duration: 0.5, ease: "power3.inOut" })
        .to(loaderEl, { opacity: 0, duration: 0.3, pointerEvents: "none" });
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <div
        ref={textRef}
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#ff4d00",
          opacity: 0,
          whiteSpace: "pre-line",
          textAlign: "center",
          userSelect: "none",
          lineHeight: 1.6,
        }}
      >
        {"100% vibe-coded\nusing AI"}
      </div>

      <div
        ref={barRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: "#ff4d00",
          width: "0%",
        }}
      />

      <div
        ref={wipeRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#ff4d00",
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
