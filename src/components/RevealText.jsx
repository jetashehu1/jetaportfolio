import { useReveal } from '../lib/hooks.js';

/**
 * Large type revealed line by line from behind a mask.
 * `lines` — strings, or { text, className } for per-line styling (e.g. indents).
 */
export default function RevealText({ as: Tag = 'h2', lines, className = '', delay = 0, id, show, style }) {
  const [ref, visible] = useReveal();
  const isVisible = show ?? visible;
  return (
    <Tag
      ref={ref}
      id={id}
      className={`${className} ${isVisible ? 'is-visible' : ''}`.trim()}
      style={{ '--delay': `${delay}ms`, ...style }}
    >
      {lines.map((line, index) => {
        const { text, className: lineClass = '' } = typeof line === 'string' ? { text: line } : line;
        return (
          <span className={`rt-line ${lineClass}`.trim()} key={index}>
            <span className="rt-inner" style={{ '--i': index }}>
              {text}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
