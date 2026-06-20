"use client";

import { FadeIn } from "./fade-in";

export function OrientationLayer() {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative overflow-hidden bg-[#0a0a0a] font-mono"
      style={{ height: "75vh", minHeight: "560px" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute pointer-events-none animate-[ecGrain_6s_steps(5)_infinite]"
        style={{
          inset: "-30%",
          opacity: 0.05,
          mixBlendMode: "screen",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.6px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,77,0,0.55)" }}
      />

      {/* Top kicker */}
      <p
        className="absolute uppercase text-[11px]"
        style={{
          top: 34,
          left: "clamp(28px,6vw,96px)",
          letterSpacing: "0.34em",
          color: "rgba(241,239,233,0.42)",
        }}
      >
        Prologue — 00<span className="hidden sm:inline"> / Eduardo Castro</span>
      </p>

      {/* Centered content */}
      <FadeIn>
        <div
          className="absolute"
          style={{
            left: "clamp(28px,6vw,96px)",
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
            style={{ lineHeight: 1.85, color: "rgba(241,239,233,0.62)", maxWidth: 540 }}
          >
            That icon in the corner — it knows my work, my background, what I&apos;ve shipped. Ask it anything.
          </p>
        </div>
      </FadeIn>

      {/* Directional gesture — desktop */}
      <div
        className="hidden md:block absolute text-right pointer-events-none"
        style={{ right: "clamp(96px,11vw,168px)", bottom: 118 }}
      >
        <p
          className="uppercase text-[11px]"
          style={{ letterSpacing: "0.22em", color: "rgba(241,239,233,0.5)", lineHeight: 1.7 }}
        >
          that icon,
          <br />
          bottom-right
        </p>
        <p
          className="uppercase text-[11px]"
          style={{ letterSpacing: "0.22em", color: "#ff4d00", marginTop: 8 }}
        >
          ask it anything ↘
        </p>
        <div
          className="absolute"
          style={{
            right: 84,
            bottom: 96,
            width: 74,
            borderTop: "1px dashed rgba(255,77,0,0.6)",
            transform: "rotate(34deg)",
            transformOrigin: "right center",
          }}
        />
      </div>

      {/* Directional gesture — mobile (simplified) */}
      <p
        className="md:hidden absolute uppercase text-[11px] pointer-events-none"
        style={{ right: 84, bottom: 128, color: "#ff4d00", letterSpacing: "0.2em" }}
      >
        ask it ↘
      </p>
      <div
        className="md:hidden absolute pointer-events-none"
        style={{
          right: 74,
          bottom: 118,
          width: 48,
          borderTop: "1px dashed rgba(255,77,0,0.6)",
          transform: "rotate(36deg)",
          transformOrigin: "right center",
        }}
      />

      {/* Scroll prompt */}
      <button
        type="button"
        onClick={scrollToHero}
        className="absolute flex items-center gap-3 uppercase text-[11px] md:text-[12px] cursor-pointer"
        style={{
          left: "clamp(28px,6vw,96px)",
          bottom: 40,
          background: "none",
          border: "none",
          letterSpacing: "0.28em",
          color: "#f1efe9",
        }}
      >
        <span className="inline-block animate-[ecBob_1.8s_ease-in-out_infinite]">↓</span>
        <span>Start</span>
        <span style={{ width: 54, height: 1, background: "rgba(241,239,233,0.3)" }} />
      </button>
    </div>
  );
}
