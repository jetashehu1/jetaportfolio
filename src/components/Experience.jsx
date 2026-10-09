import { experience, site } from '../data/site.js';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import Rule from './Rule.jsx';
import SectionLabel from './SectionLabel.jsx';
import './Experience.css';

export default function Experience() {
  return (
    <section className="experience section theme-dark" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionLabel index={4} aside={`Since ${site.since}`}>
          {experience.label}
        </SectionLabel>

        <RevealText
          id="experience-title"
          className="display experience__title"
          lines={experience.statement.map((text, index) => ({ text, className: `experience__line-${index}` }))}
        />

        <div className="experience__body">
          <Reveal className="experience__intro">
            <p className="experience__years">
              <span>{site.experience}</span>
              <span className="label">Years of practice</span>
            </p>
            <p className="copy">{experience.body}</p>
          </Reveal>

          <ol className="experience__list">
            {experience.expertise.map((item, index) => (
              <li key={item} className="experience__item">
                <Reveal className="experience__row" delay={index * 50}>
                  <span className="experience__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="experience__name">{item}</span>
                </Reveal>
                <Rule red delay={index * 50} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
