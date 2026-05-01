import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <AboutMe />
      <Services />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
