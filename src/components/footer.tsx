import { contact, footerCopy } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink w-full py-10 md:py-8 px-8 text-paper/40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-[1600px] mx-auto">
        <div className="flex gap-8 md:gap-12 font-label text-[10px] tracking-center uppercase flex-wrap justify-center">
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${contact.emailDirect}?subject=Let%27s%20connect`}
            className="hover:text-accent transition-colors"
          >
            {contact.emailDirect}
          </a>
        </div>
        <p className="font-headline text-xl tracking-widest text-paper/90">
          Mexico City &middot; &copy; {year}
        </p>
      </div>
      <p className="text-[10px] text-paper/20 text-center max-w-2xl mx-auto mt-6">
        {footerCopy.trademarkNote}
      </p>
      <p className="text-[10px] text-paper/20 text-center max-w-2xl mx-auto mt-2">
        {footerCopy.privacyNote}
      </p>
    </footer>
  );
}
