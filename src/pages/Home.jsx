import { site } from '../data/site.js';
import { useDocumentMeta } from '../lib/hooks.js';
import About from '../components/About.jsx';
import ClientList from '../components/ClientList.jsx';
import Contact from '../components/Contact.jsx';
import Experience from '../components/Experience.jsx';
import Film from '../components/Film.jsx';
import Hero from '../components/Hero.jsx';
import Intro from '../components/Intro.jsx';
import Marquee from '../components/Marquee.jsx';
import PhotographyGallery from '../components/PhotographyGallery.jsx';
import ProjectGrid from '../components/ProjectGrid.jsx';
import Statement from '../components/Statement.jsx';

export default function Home() {
  useDocumentMeta(site.title, site.description);
  return (
    <>
      <Hero />
      <Intro />
      <ProjectGrid />
      <Film />
      <Marquee />
      <ClientList />
      <Experience />
      <Statement />
      <About />
      <PhotographyGallery />
      <Contact />
    </>
  );
}
