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
    <section className="min-h-[calc(100dvh-72px)] flex items-center px-8 md:px-24 py-16 md:py-32 bg-paper-dark" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Left */}
          <FadeIn direction="left">
            <div className="text-left">
              <h2 id="contact-heading" className="text-7xl md:text-9xl font-headline mb-8 text-ink leading-none">
                Let&rsquo;s
                <br />
                <span className="italic text-accent">Talk.</span>
              </h2>
              <p className="text-xl text-ink/70 mb-12 leading-relaxed max-w-md">
                If you&rsquo;re building a brand that needs to move both culture and market share,
                I&rsquo;d like to hear about it.
              </p>
            </div>
          </FadeIn>

          {/* Right — contact links */}
          <FadeIn delay={0.12}>
            {/* Mobile: plain text */}
            <div className="md:hidden text-center">
              <p className="text-sm text-ink/60 leading-loose">
                <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                {" · "}
                <a href={`mailto:${contact.emailDirect}?subject=Let%27s%20connect`} className="hover:text-accent transition-colors">{contact.emailDirect}</a>
                {" · "}
                <a href={`mailto:${contact.emailConsulting}?subject=Keynote%20%26%20Speaking`} className="hover:text-accent transition-colors">{contact.emailConsulting}</a>
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
                  className="flex items-center gap-6 p-8 bg-paper shadow-sm border-l-4 border-accent/40"
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="material-symbols-outlined text-3xl text-ink/50">
                    {link.icon}
                  </span>
                  <div className="text-left">
                    <p className="text-xs uppercase font-bold tracking-widest text-ink/50">
                      {link.label}
                    </p>
                    <p className="text-ink font-headline italic text-lg">{link.value}</p>
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
