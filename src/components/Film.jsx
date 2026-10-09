import { useState } from 'react';
import { films } from '../data/media.js';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';
import VideoModal from './VideoModal.jsx';
import VideoPreview from './VideoPreview.jsx';
import './Film.css';

/** Moving image: a full-bleed showreel and a staggered row of vertical reels. */
export default function Film() {
  const [active, setActive] = useState(null);
  const feature = films.filter((film) => film.layout === 'full');
  const reels = films.filter((film) => film.layout !== 'full');

  return (
    <section className="film section theme-dark" id="film" aria-labelledby="film-title">
      <div className="wrap">
        <SectionLabel aside="Moving image">Film</SectionLabel>
        <RevealText
          id="film-title"
          className="display film__title"
          lines={['In', { text: 'motion.', className: 'film__indent' }]}
        />
      </div>

      {feature.map((film) => (
        <Reveal key={film.id} className="film__feature">
          <VideoPreview {...film} title={film.title} onOpen={() => setActive(film)} />
          <div className="wrap film__caption label">
            <span className="red">00</span>
            <span>{film.title}</span>
          </div>
        </Reveal>
      ))}

      <div className="wrap film__reels">
        {reels.map((film, index) => (
          <Reveal key={film.id} className="film__reel" delay={index * 100} style={{ '--n': index }}>
            <VideoPreview {...film} title={film.title} onOpen={() => setActive(film)} />
            <div className="film__caption label">
              <span className="red">{String(index + 1).padStart(2, '0')}</span>
              <span>{film.title}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <VideoModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
