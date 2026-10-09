import { useEffect, useState } from 'react';
import { hero, site } from '../data/site.js';
import { useParallax } from '../lib/hooks.js';
import Media from './Media.jsx';
import RevealText from './RevealText.jsx';
import './Hero.css';

export default function Hero() {
  const [ready, setReady] = useState(false);
  const nameRef = useParallax(-0.06);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`hero theme-dark ${ready ? 'is-ready' : ''}`} aria-labelledby="hero-title">
      <h1 id="hero-title" className="visually-hidden">
        {site.name} — {site.roles.join(', ')}
      </h1>

      <div className="hero__first" ref={nameRef} aria-hidden="true">
        <RevealText as="span" className="display display--xl" lines={[site.firstName]} show={ready} />
      </div>

      <div className="hero__portrait">
        <Media
          src={hero.image}
          alt={hero.alt}
          focus={hero.focus}
          ratio="3 / 4"
          sizes="(max-width: 899px) 100vw, 40vw"
          priority
          parallax
        />
      </div>

      <div className="hero__last" aria-hidden="true">
        <RevealText as="span" className="display display--xl" lines={[site.lastName]} show={ready} delay={140} />
      </div>

      <p className="hero__roles">
        {site.roles.map((role, index) => (
          <span key={role} className="hero__role" style={{ '--i': index }}>
            {role}
            {index < site.roles.length - 1 ? <span className="red"> /</span> : '.'}
          </span>
        ))}
      </p>

      <div className="hero__aside">
        <p className="hero__statement">
          {hero.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <ul className="hero__meta label">
          {hero.meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href="#profile" className="hero__scroll label line-link">
          Scroll to explore <span className="arrow">↓</span>
        </a>
      </div>
    </section>
  );
}
