import { instagram, site } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__bar">
        <span className="eyebrow">
          {site.name} © {site.year}
        </span>
        <span className="eyebrow footer__role">{site.role}</span>
        <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="eyebrow footer__link">
          Instagram ↗
        </a>
      </div>
    </footer>
  );
}
