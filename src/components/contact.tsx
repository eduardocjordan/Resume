"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { contact } from "@/lib/data";

const contactLinks = [
  {
    icon: "mail",
    label: "Direct",
    value: contact.emailDirect,
    href: `mailto:${contact.emailDirect}?subject=Let%27s%20connect`,
    external: false,
    gtmEvent: "email_click",
    gtmLocation: "contact",
  },
  {
    icon: "mail_outline",
    label: "Consulting & Speaking",
    value: contact.emailConsulting,
    href: `mailto:${contact.emailConsulting}?subject=Keynote%20%26%20Speaking`,
    external: false,
    gtmEvent: "email_click",
    gtmLocation: "contact",
  },
  {
    icon: "group",
    label: "LinkedIn Profile",
    value: contact.linkedin,
    href: contact.linkedinUrl,
    external: true,
    gtmEvent: "linkedin_click",
    gtmLocation: "contact",
  },
];

export function Contact() {
  return (
    <section className="min-h-[calc(100dvh-72px)] flex items-center px-8 md:px-24 py-16 md:py-32 bg-ink" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Left */}
          <FadeIn direction="left">
            <div className="text-left">
              <h2
                id="contact-heading"
                className="font-display mb-8 leading-[0.85]"
                style={{ fontSize: "clamp(5rem, 12vw, 12rem)", color: "#f9f9f7" }}
              >
                Let&rsquo;s
                <br />
                <span className="italic text-accent">Talk.</span>
              </h2>
              <p
                className="font-body font-light mb-12 max-w-[420px]"
                style={{ fontSize: "20px", lineHeight: 1.6, color: "rgba(241,239,233,0.65)" }}
              >
                If you&rsquo;re building a brand that needs to move both culture and market share,
                I&rsquo;d like to hear about it.
              </p>
            </div>
          </FadeIn>

          {/* Right — contact links */}
          <FadeIn delay={0.12}>
            {/* Mobile: plain text */}
            <div className="md:hidden text-center">
              <p className="text-sm leading-loose" style={{ color: "rgba(241,239,233,0.8)" }}>
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display italic hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
                {" · "}
                <a
                  href={`mailto:${contact.emailDirect}?subject=Let%27s%20connect`}
                  className="font-display italic hover:text-accent transition-colors"
                >
                  {contact.emailDirect}
                </a>
              </p>
            </div>

            {/* Desktop: card CTAs */}
            <div className="hidden md:block space-y-4">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  data-gtm-event={link.gtmEvent}
                  data-gtm-location={link.gtmLocation}
                  onClick={() => {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ event: link.gtmEvent, click_location: link.gtmLocation });
                  }}
                  className="flex items-center gap-6"
                  initial={{ borderLeftColor: "rgba(212,98,42,0.4)" }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    borderLeftColor: "rgba(212,98,42,0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    backgroundColor: "rgba(241,239,233,0.05)",
                    borderLeft: "4px solid rgba(212,98,42,0.4)",
                    padding: "28px 32px",
                  }}
                >
                  <span className="material-symbols-outlined text-3xl" style={{ color: "rgba(241,239,233,0.45)" }}>
                    {link.icon}
                  </span>
                  <div className="text-left">
                    <p
                      className="font-label text-xs uppercase"
                      style={{ letterSpacing: "0.3em", color: "rgba(241,239,233,0.55)" }}
                    >
                      {link.label}
                    </p>
                    <p className="font-display italic" style={{ fontSize: "22px", color: "#f9f9f7" }}>
                      {link.value}
                    </p>
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
