import { intro } from '../data/site.js';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';
import './Intro.css';

export default function Intro() {
  const [first, second, third, fourth] = intro.statement;
  return (
    <section className="intro section theme-dark" id="profile" aria-labelledby="intro-title">
      <div className="wrap">
        <SectionLabel index={1}>{intro.label}</SectionLabel>
        <RevealText
          id="intro-title"
          className="intro__statement display"
          lines={[
            first,
            { text: second, className: 'intro__indent-2' },
            { text: third, className: 'intro__indent-1' },
            { text: fourth, className: 'intro__indent-3' },
          ]}
        />
        <div className="intro__body grid">
          {intro.body.map((paragraph, index) => (
            <Reveal
              key={index}
              as="p"
              className={index === 0 ? 'lead intro__lead' : 'copy intro__copy'}
              delay={index * 120}
            >
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
