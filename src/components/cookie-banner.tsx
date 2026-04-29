"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "analytics_consent";
const AUTO_DISMISS_MS = 12000;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Analytics notice"
          className="fixed bottom-0 left-0 right-0 z-[9998] flex items-center justify-between gap-4 px-6 py-4 md:px-12"
          style={{ backgroundColor: "#1a1c1b" }}
        >
          <p className="text-xs text-white/70 leading-relaxed max-w-prose">
            Hi! I&apos;m using Google Analytics to understand how people engage
            with this site. No personal data is saved, sold or shared.
          </p>
          <button
            onClick={dismiss}
            className="shrink-0 px-5 py-2 text-xs font-bold tracking-widest uppercase text-white rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{ backgroundColor: "#d4622a" }}
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
