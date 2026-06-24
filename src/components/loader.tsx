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

    let tl: gsap.core.Timeline | undefined;

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const timeout = new Promise((resolve) => setTimeout(resolve, 1000));

    Promise.race([fontsReady, timeout]).then(() => {
      tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          loaderEl.style.display = "none";
          window.dispatchEvent(new Event("site:loader-complete"));
        },
      });

      tl.to(textEl, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(barEl,   { width: "100%", duration: 1.4, ease: "power1.inOut" }, 0.4)
        .to(textEl,  { opacity: 0, duration: 0.3 }, "+=0.2")
        .to(wipeEl,  { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
        .to(wipeEl,  { scaleX: 0, transformOrigin: "right", duration: 0.5, ease: "power3.inOut" })
        .to(loaderEl, { opacity: 0, duration: 0.3, pointerEvents: "none" });
    });

    return () => {
      tl?.kill();
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 46%, rgba(255,77,0,.10) 0%, rgba(10,10,10,0) 45%, rgba(10,10,10,.65) 100%)",
        }}
      />

      <p
        style={{
          position: "absolute",
          top: 34,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "rgba(255,77,0,.55)",
        }}
      >
        Eduardo Castro — System Boot
      </p>

      <div ref={textRef} style={{ opacity: 0, textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(10px, 1.2vw, 12px)",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "rgba(255,77,0,.66)",
            marginBottom: 22,
          }}
        >
          {"> decrypting portfolio"}
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 5vw, 3.2rem)",
            lineHeight: 1.18,
            letterSpacing: "0.02em",
            color: "#ff4d00",
            userSelect: "none",
          }}
        >
          100% VIBE-CODED
          <br />
          USING AI
          <span
            className="animate-blink"
            style={{
              display: "inline-block",
              width: "0.5em",
              height: "1.05em",
              background: "#ff4d00",
              verticalAlign: "-0.16em",
              marginLeft: "0.14em",
            }}
          />
        </p>
      </div>

      <div
        style={{
          position: "relative",
          marginTop: "clamp(30px,5vh,50px)",
          width: "min(300px, 60vw)",
          height: "2px",
          background: "rgba(255,77,0,.2)",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "#ff4d00",
            width: "0%",
          }}
        />
      </div>

      <div
        ref={wipeRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
