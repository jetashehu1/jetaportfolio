import { about, site } from '../data/site.js';
import Media from './Media.jsx';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';
import './About.css';

/** Magazine spread: portrait on the left page, words and a short text on the right. */
export default function About() {
  return (
    <section className="about section theme-light" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionLabel index={5} aside={`${site.name} — ${site.location}`}>
          {about.label}
        </SectionLabel>

        <div className="about__spread">
          <figure className="about__portrait">
            <Media src={about.portrait} alt={about.alt} ratio="4 / 5" sizes="(max-width: 899px) 100vw, 45vw" parallax />
            <figcaption className="label about__caption">
              <span>{site.name}</span>
              <span>{site.roles.join(' / ')}</span>
            </figcaption>
          </figure>

          <div className="about__text">
            <RevealText id="about-title" className="display about__words" lines={about.words} />
            <div className="about__body">
              {about.body.map((paragraph, index) => (
                <Reveal key={index} as="p" className={index === 0 ? 'lead' : 'copy'} delay={index * 120}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
            <Reveal as="dl" className="about__facts label" delay={200}>
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{site.experience} years</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{site.availability}</dd>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
