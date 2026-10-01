import { about, site } from '../data/site.js';
import { useResolvedMedia } from '../lib/instagram.jsx';
import Media from './Media.jsx';
import Reveal from './Reveal.jsx';
import './About.css';

export default function About() {
  const { image } = useResolvedMedia(about.portrait);

  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <Reveal className="about__meta">
          <span className="eyebrow">(02)</span>
          <span className="eyebrow">Profile</span>
        </Reveal>

        <div className="about__portrait">
          <Media
            src={image}
            alt={about.portrait.alt}
            ratio="4 / 5"
            sizes="(max-width: 900px) 100vw, 40vw"
            label={image ? null : 'Portrait · 4:5'}
          />
        </div>

        <div className="about__text">
          <Reveal as="h2" className="about__title display">
            <span>About</span>
            <span>{site.firstName}</span>
          </Reveal>

          <Reveal className="about__body" delay={100}>
            {about.body.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'about__lead' : undefined}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal as="dl" className="about__facts" delay={180}>
            <div>
              <dt className="eyebrow">Location</dt>
              <dd className="eyebrow">{site.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Availability</dt>
              <dd className="eyebrow">{site.availability}</dd>
            </div>
            <div>
              <dt className="eyebrow">Practice</dt>
              <dd>{about.services.join(', ')}</dd>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
