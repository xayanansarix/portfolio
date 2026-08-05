import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Bio } from "@/components/Bio";
import { Skills } from "@/components/Skills";
import { LeetCode } from "@/components/LeetCode";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Bio />
        <Skills />
        <LeetCode />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
