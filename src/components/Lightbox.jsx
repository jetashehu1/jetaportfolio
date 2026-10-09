import { useRef } from 'react';
import { resolveImage, slotLabel } from '../lib/media.js';
import Overlay from './Overlay.jsx';
import './Lightbox.css';

function Slide({ item }) {
  const image = resolveImage(item.src);
  return (
    <figure className="lightbox__figure">
      {image ? (
        <img
          className="lightbox__img"
          src={image.src}
          srcSet={image.srcSet}
          sizes="100vw"
          alt={item.alt || ''}
          decoding="async"
        />
      ) : (
        <div className="lightbox__slot" style={{ aspectRatio: item.ratio }} role="img" aria-label="Image not added yet">
          <span className="label">{slotLabel(item.src)}</span>
        </div>
      )}
    </figure>
  );
}

/** Black, centred, nothing else: image, counter, previous / next, close. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const touchStart = useRef(null);
  const open = index !== null && index !== undefined;
  const count = items.length;
  const go = (step) => onChange((current) => (current + step + count) % count);
  const item = open ? items[index] : null;

  return (
    <Overlay
      open={open}
      onClose={onClose}
      label="Image viewer"
      keys={{ ArrowRight: () => go(1), ArrowLeft: () => go(-1) }}
    >
      {item && (
        <div
          className="lightbox"
          onTouchStart={(event) => {
            touchStart.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            const delta = event.changedTouches[0].clientX - (touchStart.current ?? 0);
            if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <Slide key={item.src} item={item} />

          <div className="lightbox__bar label">
            <span>
              <span className="red">{String(index + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
            </span>
            <span className="lightbox__nav">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image">
                ← Prev
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image">
                Next →
              </button>
            </span>
          </div>
        </div>
      )}
    </Overlay>
  );
}
