import { useState } from 'react';
import { useReveal } from '../lib/hooks.js';
import './Media.css';

/**
 * A framed photograph with a slow reveal and lazy loading.
 * With no `src`, renders a neutral labelled frame (content slot) instead of
 * stand-in imagery — nothing is invented.
 */
export default function Media({
  src,
  srcSet,
  sizes,
  alt = '',
  ratio,
  focus,
  label,
  tone = 'light',
  priority = false,
  className = '',
}) {
  const [ref, visible] = useReveal();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`media ${visible ? 'is-visible' : ''} ${loaded || !src ? 'is-loaded' : ''} ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        <img
          className="media__img"
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={focus ? { objectPosition: focus } : undefined}
        />
      ) : (
        <div className={`media__slot media__slot--${tone}`} aria-hidden="true">
          {label && <span className="media__slot-label">{label}</span>}
        </div>
      )}
    </div>
  );
}
