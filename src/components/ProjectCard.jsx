import { hasMedia } from '../lib/media.js';
import { Link } from '../lib/router.jsx';
import Media from './Media.jsx';
import VideoPreview from './VideoPreview.jsx';
import './ProjectCard.css';

/** A project as it appears in Selected Work: image first, minimal metadata. */
export default function ProjectCard({ project, number, ratio, size = 'default', style }) {
  const { slug, client, summary, year, cover } = project;
  const showVideo = cover.video && hasMedia(cover.video);
  const alt = cover.alt || `${client} — ${summary}`;

  return (
    <article className={`project-card project-card--${size}`} style={style}>
      <Link to={`/work/${slug}`} className="project-card__link" data-cursor="View">
        <div className="project-card__media">
          {showVideo ? (
            <VideoPreview src={cover.video} poster={cover.image} ratio={ratio} title={client} />
          ) : (
            <Media
              src={cover.image}
              alt={alt}
              ratio={ratio}
              sizes={size === 'full' ? '100vw' : '(max-width: 899px) 100vw, 50vw'}
            />
          )}
        </div>

        <div className="project-card__meta">
          <span className="project-card__line" aria-hidden="true" />
          <span className="project-card__index label">{String(number).padStart(2, '0')}</span>
          <div className="project-card__titles">
            <h3 className="project-card__title">{client}</h3>
            <p className="project-card__summary label">{summary}</p>
          </div>
          <div className="project-card__aside label">
            {year && <span className="project-card__year">{year}</span>}
            <span className="project-card__cta">
              View project <span className="arrow">↗</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
