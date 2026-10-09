import { marquee } from '../data/site.js';
import './Marquee.css';

/** One slow line of disciplines between two red rules. */
export default function Marquee() {
  const text = marquee.map((word) => `${word} — `).join('');
  return (
    <section className="marquee theme-dark" aria-label={marquee.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        <span className="marquee__item">{text}</span>
        <span className="marquee__item">{text}</span>
      </div>
    </section>
  );
}
