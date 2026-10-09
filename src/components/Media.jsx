import { useState } from 'react';
import { useParallax, useReveal } from '../lib/hooks.js';
import { resolveImage, slotLabel } from '../lib/media.js';
import { useInstagramPost } from '../lib/instagram.jsx';
import './Media.css';

/**
 * Photograph with a clip-path reveal, lazy loading and optional parallax.
 * When the file is not in /public yet, renders a placeholder frame that names
 * the expected path — no request is made, no stand-in imagery is used.
 */
export default function Media({
  src,
  instagram,
  alt = '',
  ratio,
  focus,
  sizes = '100vw',
  priority = false,
  parallax = false,
  className = '',
}) {
  const [revealRef, visible] = useReveal();
  const parallaxRef = useParallax(0.08);
  const [loaded, setLoaded] = useState(false);
  const post = useInstagramPost(instagram);
  const image = resolveImage(src) ?? (post?.image ? { src: post.image } : null);

  const setRefs = (node) => {
    revealRef.current = node;
    if (parallax) parallaxRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      className={[
        'media',
        visible && 'is-visible',
        (loaded || !image) && 'is-loaded',
        parallax && 'media--parallax',
        priority && 'media--priority',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div className="media__clip">
        <div className="media__inner">
          {image ? (
            <img
              className="media__img"
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.srcSet ? sizes : undefined}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding={priority ? 'sync' : 'async'}
              onLoad={() => setLoaded(true)}
              style={focus ? { objectPosition: focus } : undefined}
            />
          ) : (
            <div className="media__slot" role="img" aria-label={alt || 'Image placeholder'}>
              <span className="media__slot-label">{slotLabel(src)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
