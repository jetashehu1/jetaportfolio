import Reveal from './Reveal.jsx';
import './SectionHeader.css';

/** Thin rule, index number, oversized serif title — the editorial section opener. */
export default function SectionHeader({ index, title, aside, children, tone = 'light' }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <header className={`section-header section-header--${tone}`}>
      <Reveal className="section-header__meta">
        <span className="eyebrow">({String(index).padStart(2, '0')})</span>
        {aside && <span className="eyebrow section-header__aside">{aside}</span>}
      </Reveal>
      <Reveal as="h2" className="section-header__title display" delay={80}>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </Reveal>
      {children && (
        <Reveal className="section-header__extra" delay={160}>
          {children}
        </Reveal>
      )}
    </header>
  );
}
