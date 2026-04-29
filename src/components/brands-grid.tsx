"use client";

import Image from "next/image";
import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { brands } from "@/lib/data";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// px per frame — deliberate, runway pace
const SPEED = 0.3;

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-32 md:w-40 mr-4 md:mr-6 flex items-center justify-center bg-paper"
      style={{ height: "100px" }}
      initial="rest"
      whileHover="hovered"
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={140}
        height={56}
        style={{ height: "56px", width: "auto", objectFit: "contain", maxWidth: "80%" }}
      />
      <motion.div
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center bg-white/80"
        aria-hidden="true"
      >
        <span className="text-sm font-medium text-ink select-none">{brand.name}</span>
      </motion.div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: (typeof brands);
  direction: "left" | "right";
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  // All mutable animation state in a single ref — zero re-renders
  const s = useRef({ pos: 0, half: 0, dragging: false, startX: 0, startPos: 0, frame: 0 });

  const doubled = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const start = () => {
      // With mr-4/md:mr-6 (margin-right, no CSS gap), each card's footprint is
      // exactly W + G, so offsetWidth = N*(W+G) and half = N/2*(W+G).
      // translateX(-half) lands precisely on card N/2+1 — seamless loop.
      s.current.half = inner.offsetWidth / 2;
      if (direction === "right") s.current.pos = -s.current.half;

      const tick = () => {
        if (!s.current.dragging) {
          s.current.pos += direction === "left" ? -SPEED : SPEED;
          if (s.current.pos <= -s.current.half) s.current.pos += s.current.half;
          if (s.current.pos >= 0)               s.current.pos -= s.current.half;
          inner.style.transform = `translateX(${s.current.pos}px)`;
        }
        s.current.frame = requestAnimationFrame(tick);
      };
      s.current.frame = requestAnimationFrame(tick);
    };

    // Double RAF: let browser compute layout before reading offsetWidth
    requestAnimationFrame(() => requestAnimationFrame(start));
    return () => cancelAnimationFrame(s.current.frame);
  }, [direction]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    s.current.dragging = true;
    s.current.startX   = e.clientX;
    s.current.startPos = s.current.pos;
    wrapRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!s.current.dragging) return;
    let np = s.current.startPos + (e.clientX - s.current.startX);
    if (np < -s.current.half) np += s.current.half;
    if (np > 0)               np -= s.current.half;
    s.current.pos = np;
    innerRef.current!.style.transform = `translateX(${np}px)`;
  };

  const stopDrag = () => { s.current.dragging = false; };

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
    >
      <div
        ref={innerRef}
        className="flex"
        style={{ willChange: "transform", userSelect: "none" }}
      >
        {doubled.map((brand, i) => (
          <BrandCard key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export function BrandsGrid() {
  // Split brands into two non-overlapping halves so no logo appears
  // in both rows at the same time.
  const [row1, row2] = useMemo(() => {
    const s   = shuffle(brands);
    const mid = Math.ceil(s.length / 2);
    return [s.slice(0, mid), s.slice(mid)];
  }, []);

  return (
    <section
      className="px-8 md:px-24 py-16 md:py-32 bg-paper"
      id="brands"
      aria-labelledby="brands-heading"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <FadeIn>
          <h2
            id="brands-heading"
            className="text-5xl md:text-6xl font-headline italic mb-12 md:mb-20 text-ink"
          >
            Brands I&rsquo;ve helped grow
          </h2>
        </FadeIn>
        <div className="space-y-4 md:space-y-6">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>
    </section>
  );
}
