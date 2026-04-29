import { NavBar } from "@/components/nav-bar";
import { ProgressBar } from "@/components/progress-bar";
import { Hero } from "@/components/hero";
import { DefiningWork } from "@/components/defining-work";
import { Impact } from "@/components/impact";
import { Experience } from "@/components/experience";
import { BrandsGrid } from "@/components/brands-grid";
import { HowIWork } from "@/components/how-i-work";
import { Credentials } from "@/components/credentials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <ProgressBar />
      <NavBar />
      <main id="main-content">
        <Hero />
        <DefiningWork />
        <Impact />
        <Experience />
        <BrandsGrid />
        <HowIWork />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
