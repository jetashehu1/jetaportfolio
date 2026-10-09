import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * Small follower dot that grows into a label ("View", "Play", "↗") over any
 * element carrying data-cursor="…". Only on fine pointers with hover —
 * touch devices never mount it.
 */
export default function CustomCursor() {
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(true);
  const node = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const render = () => {
      pos.x += (target.x - pos.x) * (smooth ? 0.22 : 1);
      pos.y += (target.y - pos.y) * (smooth ? 0.22 : 1);
      if (node.current) node.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.2 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setHidden(false);
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onOver = (event) => {
      const el = event.target.closest?.('[data-cursor]');
      setLabel(el ? el.getAttribute('data-cursor') : '');
    };
    const onLeave = () => setHidden(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={node} className={`cursor ${label ? 'is-label' : ''} ${hidden ? 'is-hidden' : ''}`} aria-hidden="true">
      <span className="cursor__dot">
        <span className="cursor__label">{label}</span>
      </span>
    </div>
  );
}
