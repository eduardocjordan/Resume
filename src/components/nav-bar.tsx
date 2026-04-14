"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Defining Work", href: "#defining-work" },
  { label: "Experience", href: "#experience" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f9f9f7]/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
          : "bg-[#f9f9f7]/80 backdrop-blur-xl border-b border-outline-variant/20"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto">
        <a
          href="#"
          className="font-headline italic text-2xl font-bold text-on-surface hover:text-primary transition-colors duration-300"
        >
          Eduardo Castro
        </a>

        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label tracking-tight text-sm uppercase font-semibold text-on-surface opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#"
          className="editorial-gradient text-white px-6 py-2.5 rounded-sm font-label text-sm font-semibold tracking-wide"
          whileHover={{ scale: 0.97 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Download CV
        </motion.a>
      </div>
    </nav>
  );
}
