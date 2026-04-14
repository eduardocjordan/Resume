export function Footer() {
  return (
    <footer className="bg-on-background w-full py-20 px-8 text-white/40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-[1600px] mx-auto">
        <div className="font-headline text-xl italic text-white/90">Eduardo Castro</div>
        <div className="flex gap-12 font-label text-[10px] tracking-widest uppercase">
          <a href="https://linkedin.com/in/eduardocaj" className="hover:text-primary transition-colors">
            LinkedIn
          </a>
          <a href="mailto:eduardocjordan@icloud.com" className="hover:text-primary transition-colors">
            Email
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Portfolio
          </a>
        </div>
        <p className="font-label text-[10px] tracking-widest uppercase">
          © 2024 Editorial Strategist. Mexico City.
        </p>
      </div>
    </footer>
  );
}
