import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Bio } from "@/components/Bio";
import { Skills } from "@/components/Skills";
import { LeetCode } from "@/components/LeetCode";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useStrapiData } from "@/hooks/use-strapi-data";
import { getAbout } from "@/lib/strapi";

export default function App() {
  const { data: about } = useStrapiData(getAbout, []);

  return (
    <div className="min-h-screen">
      <Navbar about={about} />
      <main>
        <Hero about={about} />
        <Bio />
        <Skills />
        <LeetCode about={about} />
        <Projects />
        <Certificates />
        <Contact about={about} />
      </main>
      <Footer about={about} />
    </div>
  );
}
