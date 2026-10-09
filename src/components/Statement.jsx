import { statement } from '../data/site.js';
import RevealText from './RevealText.jsx';
import Rule from './Rule.jsx';
import './Statement.css';

/** Typographic interstitial — black page, cream type, one red line. */
export default function Statement() {
  return (
    <section className="statement section theme-dark" aria-label="Statement">
      <div className="wrap">
        <RevealText
          as="p"
          className="display statement__text"
          lines={statement.map((text, index) => ({ text, className: `statement__line-${index}` }))}
        />
        <div className="statement__rule">
          <Rule red delay={400} />
        </div>
      </div>
    </section>
  );
}
