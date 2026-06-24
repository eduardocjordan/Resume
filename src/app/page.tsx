import { Loader } from "@/components/loader";
import { OrientationLayer } from "@/components/orientation-layer";
import { CookieBanner } from "@/components/cookie-banner";
import { NavBar } from "@/components/nav-bar";
import { ProgressBar } from "@/components/progress-bar";
import { FixedChapterEyebrow } from "@/components/fixed-chapter-eyebrow";
import { Hero } from "@/components/hero";
import { DoritosRainbow } from "@/components/doritos-rainbow";
import { DefiningWork } from "@/components/defining-work";
import { HowIWork } from "@/components/how-i-work";
import { Experience } from "@/components/experience";
import { BrandsGrid } from "@/components/brands-grid";
import { Impact } from "@/components/impact";
import { Credentials } from "@/components/credentials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

export default function Home() {
  return (
    <>
      <Loader />
      <OrientationLayer />
      <CookieBanner />
      <ProgressBar />
      <NavBar />
      <FixedChapterEyebrow />
      <main id="main-content">
        <Hero />
        <DoritosRainbow />
        <DefiningWork />
        <HowIWork />
        <Experience />
        <BrandsGrid />
        <Impact />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
