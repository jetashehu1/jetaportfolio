import { useState } from 'react';
import { videos } from '../data/portfolio.js';
import { useResolvedMedia } from '../lib/instagram.jsx';
import Media from './Media.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import VideoModal from './VideoModal.jsx';
import './Motion.css';

const RATIOS = { vertical: '9 / 16', horizontal: '16 / 9' };

function VideoCard({ item, number, onOpen }) {
  const { image } = useResolvedMedia({ ...item, src: item.poster });
  const label = item.title || item.category;

  return (
    <Reveal as="article" className={`video-card video-card--${item.orientation}`} delay={(number % 3) * 90}>
      <button type="button" className="video-card__button" onClick={onOpen} aria-label={`Play ${label}`}>
        <Media
          src={image}
          alt=""
          ratio={RATIOS[item.orientation]}
          tone="dark"
          label={image ? null : `${item.category} · ${RATIOS[item.orientation].replace(/\s/g, '')}`}
        />
        <span className="video-card__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <p className="video-card__caption eyebrow">
        <span>{String(number).padStart(2, '0')}</span>
        <span>{label}</span>
      </p>
    </Reveal>
  );
}

export default function Motion() {
  const [active, setActive] = useState(null);

  return (
    <section className="motion" id="motion">
      <div className="container">
        <SectionHeader index={3} title="Motion" aside="Reels & Films" tone="dark">
          <p className="motion__intro">
            Short-form films and reels — moving images made with the same eye as the stills.
          </p>
        </SectionHeader>

        <div className="motion__grid">
          {videos.map((item, index) => (
            <VideoCard key={item.id} item={item} number={index + 1} onOpen={() => setActive(item)} />
          ))}
        </div>
      </div>

      <VideoModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
