import { hasMedia } from '../lib/media.js';
import { Link } from '../lib/router.jsx';
import Media from './Media.jsx';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import VideoPreview from './VideoPreview.jsx';
import './ProjectHero.css';

export default function ProjectHero({ project, number, total, onPlay }) {
  const { client, year, role, services, intro, cover, summary } = project;
  const coverVideo = cover.video && hasMedia(cover.video);

  return (
    <header className="project-hero">
      <div className="wrap">
        <Reveal className="project-hero__top label">
          <Link to="/#work" className="line-link">
            <span className="arrow">←</span> All work
          </Link>
          <span>
            <span className="red">{String(number).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </span>
        </Reveal>

        <RevealText
          as="h1"
          className="display fit-line project-hero__title"
          lines={[client]}
          style={{ '--chars': client.length }}
          show
          delay={150}
        />

        <div className="project-hero__info">
          <Reveal as="dl" className="project-hero__meta label" delay={300}>
            <div>
              <dt>Client</dt>
              <dd>{client}</dd>
            </div>
            {year && (
              <div>
                <dt>Year</dt>
                <dd>{year}</dd>
              </div>
            )}
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>
                <ul>
                  {services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
          <Reveal as="p" className="lead project-hero__intro" delay={420}>
            {intro}
          </Reveal>
        </div>
      </div>

      <div className="project-hero__visual">
        {coverVideo ? (
          <VideoPreview src={cover.video} poster={cover.image} ratio="16 / 9" title={client} onOpen={onPlay} />
        ) : (
          <Media
            src={cover.image}
            alt={cover.alt || `${client} — ${summary}`}
            ratio="16 / 9"
            sizes="100vw"
            priority
            parallax
          />
        )}
      </div>
    </header>
  );
}
