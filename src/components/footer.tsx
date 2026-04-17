export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-on-background w-full py-10 md:py-8 px-8 text-white/40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-[1600px] mx-auto">
        <div className="font-headline text-xl italic text-white/90">Eduardo Castro</div>
        <div className="flex gap-8 md:gap-12 font-label text-[10px] tracking-widest uppercase flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/eduardocaj"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:eduardo@casjor.com?subject=Let%27s%20connect"
            className="hover:text-primary transition-colors"
          >
            eduardo@casjor.com
          </a>
          <a
            href="mailto:keynote@casjor.com?subject=Keynote%20%26%20Speaking"
            className="hover:text-primary transition-colors"
          >
            keynote@casjor.com
          </a>
        </div>
        <p className="font-label text-[10px] tracking-widest uppercase">
          Eduardo Castro &middot; Mexico City &middot; &copy; {year}
        </p>
      </div>
      <p className="text-[8px] text-white/20 text-center max-w-2xl mx-auto mt-6">
        All trademarks, brand names, and logos referenced on this site are the property of their respective owners. Eduardo Castro&rsquo;s association with these brands was in a professional capacity.
      </p>
    </footer>
  );
}
