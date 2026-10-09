import { links, site } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <footer className="footer theme-dark">
      <div className="wrap footer__grid label">
        <span>
          {site.name} © {site.year}
        </span>
        <span className="footer__roles">
          {site.roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </span>
        <span className="footer__location">{site.location}</span>
        <span className="footer__links">
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="line-link">
            Instagram <span className="arrow">↗</span>
          </a>
          {links.behance && (
            <a href={links.behance} target="_blank" rel="noopener noreferrer" className="line-link">
              Behance <span className="arrow">↗</span>
            </a>
          )}
        </span>
        <button type="button" className="footer__top line-link" onClick={toTop}>
          Back to top <span className="arrow">↑</span>
        </button>
      </div>
      <div className="footer__mark" aria-hidden="true">
        {site.name}
      </div>
    </footer>
  );
}
