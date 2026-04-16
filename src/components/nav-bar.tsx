"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/data";

const links = [
  { label: "Highlights",   href: "#defining-work", section: "defining-work" },
  { label: "Impact",       href: "#impact",         section: "impact" },
  { label: "Career",       href: "#experience",     section: "experience" },
  { label: "Method",       href: "#how-i-work",     section: "how-i-work" },
  { label: "Credentials",  href: "#credentials",    section: "credentials" },
  { label: "Contact",      href: "#contact",        section: "contact" },
];

export function NavBar() {
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollY } = useScroll();
  // Nav logo fades in as hero h1 fades out (200–300px scroll)
  const logoOpacity = useTransform(scrollY, [200, 300], [0, 1]);

  // Scroll listener: shadow + GTM depth milestones
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

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

  // IntersectionObserver for active nav section
  useEffect(() => {
    const sectionIds = links.map((l) => l.section);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f9f9f7]/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
          : "bg-[#f9f9f7]/80 backdrop-blur-xl border-b border-outline-variant/20"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-5 max-w-[1920px] mx-auto">
        {/* Logo — fades in as hero h1 fades out */}
        <motion.a
          href="#hero"
          className="font-headline italic text-2xl font-bold group"
          style={{ opacity: logoOpacity }}
        >
          <span className="text-on-surface group-hover:opacity-50 transition-opacity duration-300">
            Eduardo
          </span>
          <span className="text-primary"> Castro</span>
        </motion.a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-label tracking-tight text-sm uppercase font-semibold transition-all duration-300 ${
                activeSection === link.section
                  ? "text-primary opacity-100"
                  : "text-on-surface opacity-70 hover:opacity-100 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href={hero.cv}
            download
            data-gtm-event="resume_download"
            data-gtm-location="nav"
            className="editorial-gradient text-white px-5 py-2.5 rounded-sm font-label text-sm font-semibold tracking-wide"
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Download CV
          </motion.a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[2px] w-full bg-on-surface transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-on-surface transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-on-surface transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#f9f9f7]/95 backdrop-blur-xl border-t border-outline-variant/20"
          >
            <div className="flex flex-col px-8 py-6 space-y-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`font-label text-sm uppercase font-semibold tracking-widest transition-colors duration-200 ${
                    activeSection === link.section ? "text-primary" : "text-on-surface"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
