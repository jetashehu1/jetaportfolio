import { hero, site } from '../data/site.js';
import { useResolvedMedia } from '../lib/instagram.jsx';
import Media from './Media.jsx';
import './Hero.css';

export default function Hero() {
  const { image } = useResolvedMedia(hero);

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__media">
        <Media src={image} alt={hero.alt} focus={hero.focus} tone="dark" priority />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__title display">
          <span className="hero__line" style={{ '--d': '150ms' }}>
            {site.firstName}
          </span>
          <span className="hero__line" style={{ '--d': '300ms' }}>
            {site.lastName}
          </span>
        </h1>
        <p className="hero__subtitle eyebrow">{site.role}</p>
      </div>

      <a href="#work" className="hero__scroll eyebrow">
        <span>Scroll to explore</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
