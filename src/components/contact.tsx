"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { contact, contactCopy } from "@/lib/data";
import { pushGtmEvent } from "@/lib/gtm";

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
                className="font-display mb-8 leading-[0.85] text-paper"
                style={{ fontSize: "clamp(5rem, 12vw, 12rem)" }}
              >
                {contactCopy.headingLine1}
                <br />
                <span className="italic text-accent">{contactCopy.headingAccent}</span>
              </h2>
              <p
                className="font-body font-light mb-12 max-w-[420px] text-paper/65"
                style={{ fontSize: "20px", lineHeight: 1.6 }}
              >
                {contactCopy.pitchLines[0]}
                <br />
                {contactCopy.pitchLines[1]}
              </p>
            </div>
          </FadeIn>

          {/* Right — contact links */}
          <FadeIn delay={0.12}>
            {/* Mobile: plain text */}
            <div className="md:hidden text-center">
              <p className="text-sm leading-loose text-paper/80">
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
              {contactCopy.links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  data-gtm-event={link.gtmEvent}
                  data-gtm-location="contact"
                  onClick={() => pushGtmEvent(link.gtmEvent, { click_location: "contact" })}
                  className="flex items-center gap-6 bg-paper/5"
                  initial={{ borderLeftColor: "rgba(212,98,42,0.4)" }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    borderLeftColor: "rgba(212,98,42,0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    borderLeft: "4px solid rgba(212,98,42,0.4)",
                    padding: "28px 32px",
                  }}
                >
                  <span className="material-symbols-outlined text-3xl text-paper/45">
                    {link.icon}
                  </span>
                  <div className="text-left">
                    <p
                      className="font-label text-xs uppercase text-paper/55"
                      style={{ letterSpacing: "0.3em" }}
                    >
                      {link.label}
                    </p>
                    <p className="font-display italic text-paper" style={{ fontSize: "22px" }}>
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
