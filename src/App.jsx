import { InstagramProvider } from './lib/instagram.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Motion from './components/Motion.jsx';
import InstagramSection from './components/InstagramSection.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <InstagramProvider>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Motion />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
    </InstagramProvider>
  );
}
