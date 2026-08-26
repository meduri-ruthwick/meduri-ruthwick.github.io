import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ResearchStory from "@/components/ResearchStory";
import About from "@/components/About";
import Publications from "@/components/Publications";
import Talks from "@/components/Talks";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ResearchStory />
      <About />
      <Publications />
      <Talks />
      <Contact />
    </main>
  );
}
