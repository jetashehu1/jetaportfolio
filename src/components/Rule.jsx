import { useReveal } from '../lib/hooks.js';

/** 1px line that draws itself in when scrolled into view. `red` = signature line. */
export default function Rule({ red = false, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`rule ${red ? 'rule--red' : ''} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` }}
    />
  );
}
