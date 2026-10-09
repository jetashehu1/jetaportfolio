import Rule from './Rule.jsx';
import Reveal from './Reveal.jsx';
import './SectionLabel.css';

/** Editorial running head: "02 — SELECTED WORK ———————— aside". */
export default function SectionLabel({ index, children, aside }) {
  return (
    <Reveal className="section-label label">
      {index !== undefined && <span className="section-label__index">{String(index).padStart(2, '0')}</span>}
      <span className="section-label__text">— {children}</span>
      <Rule className="section-label__rule" delay={150} />
      {aside && <span className="section-label__aside">{aside}</span>}
    </Reveal>
  );
}
