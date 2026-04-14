"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { contact } from "@/lib/data";

const contactLinks = [
  {
    icon: "mail",
    label: "Send Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    accent: true,
  },
  {
    icon: "group",
    label: "LinkedIn Profile",
    value: contact.linkedin,
    href: contact.linkedinUrl,
    accent: false,
  },
  {
    icon: "description",
    label: "Download Resume",
    value: "PDF · English",
    href: contact.cvUrl,
    accent: false,
  },
];

export function Contact() {
  return (
    <section className="px-8 md:px-24 py-40 bg-surface-container-low" id="contact">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Left */}
          <FadeIn direction="left">
            <div className="text-left">
              <p className="text-primary font-bold text-[10px] tracking-widest uppercase mb-4">
                Open to opportunities
              </p>
              <h2 className="text-7xl md:text-9xl font-headline mb-8 text-on-surface leading-none">
                Let&rsquo;s
                <br />
                <span className="italic text-primary">Talk.</span>
              </h2>
              <p className="text-xl text-secondary mb-12 leading-relaxed max-w-md">
                If you&rsquo;re building a brand that needs to move both culture and market share,
                I&rsquo;d like to hear about it.
              </p>
            </div>
          </FadeIn>

          {/* Right — contact cards */}
          <FadeIn delay={0.12}>
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-6 p-8 bg-white shadow-sm border-l-4 ${
                    link.accent ? "border-primary" : "border-outline"
                  }`}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${
                      link.accent ? "text-primary" : "text-tertiary"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <div className="text-left">
                    <p className="text-xs uppercase font-bold tracking-widest text-tertiary">
                      {link.label}
                    </p>
                    <p className="text-on-surface font-headline italic text-lg">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
