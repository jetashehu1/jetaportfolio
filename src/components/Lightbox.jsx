import { useRef } from 'react';
import { useResolvedMedia } from '../lib/instagram.jsx';
import Overlay from './Overlay.jsx';
import './Lightbox.css';

function Slide({ item }) {
  const { image } = useResolvedMedia(item);
  const label = item.title ? `${item.category} — ${item.title}` : item.category;
  return (
    <figure className="lightbox__figure" key={item.id}>
      {image ? (
        <img className="lightbox__img" src={image} alt={item.alt || label} decoding="async" />
      ) : (
        <div className="lightbox__slot" style={{ aspectRatio: item.ratio }} aria-label="Image not added yet" />
      )}
    </figure>
  );
}

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
      label="Image gallery"
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
          <Slide key={item.id} item={item} />

          <div className="lightbox__bar">
            <span className="eyebrow">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <span className="lightbox__caption">
              <span className="eyebrow">{item.category}</span>
              {item.title && <em>{item.title}</em>}
            </span>
            <span className="lightbox__nav">
              <button type="button" className="eyebrow" onClick={() => go(-1)}>
                Prev
              </button>
              <button type="button" className="eyebrow" onClick={() => go(1)}>
                Next
              </button>
            </span>
          </div>
        </div>
      )}
    </Overlay>
  );
}
