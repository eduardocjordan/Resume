"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "none" | "wipe" | "rule";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (direction === "rule") {
    return (
      <motion.div
        ref={ref}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        style={{ transformOrigin: "left" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (direction === "wipe") {
    const hidden = { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" };
    const shown = { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" };
    return (
      <motion.div
        ref={ref}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut", delay },
          clipPath: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
          y: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const initial =
    direction === "up"
      ? { opacity: 0, y: 24 }
      : direction === "left"
      ? { opacity: 0, x: -24 }
      : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
