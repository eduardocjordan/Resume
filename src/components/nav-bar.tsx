"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hero } from "@/lib/data";

const links = [
  { label: "Highlights",  href: "#defining-work", section: "defining-work" },
  { label: "Impact",      href: "#impact",         section: "impact" },
  { label: "Career",      href: "#experience",     section: "experience" },
  { label: "Method",      href: "#how-i-work",     section: "how-i-work" },
  { label: "Credentials", href: "#credentials",    section: "credentials" },
  { label: "Contact",     href: "#contact",        section: "contact" },
];

export function NavBar() {
  const [visible, setVisible]             = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDark, setIsDark]               = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Show nav when 50% of hero has scrolled out of view
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.5 }
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  // Active section highlighting
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // GTM scroll depth tracking
  useEffect(() => {
    const onScroll = () => {
      const pct =
        window.scrollY /
        Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const milestones = [25, 50, 75, 100];
      const hit: Record<number, boolean> = (window as any).__scrollHit || {};
      const rounded = Math.round(pct * 100);
      milestones.forEach((m) => {
        if (rounded >= m && !hit[m]) {
          hit[m] = true;
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({ event: "scroll_depth", percent: m });
        }
      });
      (window as any).__scrollHit = hit;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="nav"
          className="fixed top-0 w-full z-50 bg-paper/90 backdrop-blur-xl border-b border-ink/10 shadow-sm"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Site navigation"
        >
          <div className="flex items-center px-8 py-3 max-w-[1920px] mx-auto gap-8">

            {/* Logo */}
            <a href="#hero" className="font-headline italic text-xl font-bold flex-shrink-0" aria-label="Back to top">
              <span className="text-ink">Eduardo</span>
              <span className="text-accent"> Castro</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-10">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-label tracking-tight text-sm uppercase font-semibold transition-all duration-300 ${
                    activeSection === link.section
                      ? "text-accent opacity-100"
                      : "text-ink opacity-70 hover:opacity-100 hover:text-accent"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: dark toggle · CTA (desktop) · hamburger (mobile) */}
            <div className="ml-auto flex items-center gap-3">

              <button
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-transform duration-200 hover:scale-150 flex-shrink-0 ${
                  isDark ? "bg-paper border border-ink/20" : "bg-accent"
                }`}
              />

              <a
                href={hero.cv}
                download
                data-gtm-event="resume_download"
                data-gtm-location="nav"
                className="hidden md:inline-flex items-center gap-1.5 editorial-gradient text-white px-4 py-2 rounded-sm font-label text-xs font-semibold tracking-wide"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>download</span>
                Download Resume
              </a>

              <button
                className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span className={`block h-[2px] w-full bg-ink transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-[2px] w-full bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] w-full bg-ink transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden bg-paper/95 backdrop-blur-xl border-t border-ink/10"
              >
                <div className="flex flex-col px-8 py-6 space-y-5">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-label text-sm uppercase font-semibold tracking-widest transition-colors duration-200 ${
                        activeSection === link.section ? "text-accent" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={hero.cv}
                    download
                    data-gtm-event="resume_download"
                    data-gtm-location="nav_mobile"
                    onClick={() => setMenuOpen(false)}
                    className="editorial-gradient text-white px-4 py-3 rounded-sm font-label text-sm font-semibold tracking-wide text-center"
                  >
                    Download Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
