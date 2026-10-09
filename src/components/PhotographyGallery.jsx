import { useMemo, useState } from 'react';
import { photography } from '../data/media.js';
import Lightbox from './Lightbox.jsx';
import Media from './Media.jsx';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';
import './PhotographyGallery.css';

const ratioValue = (ratio) => {
  const [w, h] = ratio.split('/').map(Number);
  return w / h;
};

/**
 * Justified rows: every image keeps its own proportions — portrait, square,
 * landscape, panoramic — while each row shares one height.
 */
export default function PhotographyGallery() {
  const [open, setOpen] = useState(null);
  const items = useMemo(() => photography.flatMap((row) => row.items), []);
  let counter = 0;

  return (
    <section className="photos section theme-dark" id="photography" aria-labelledby="photos-title">
      <div className="wrap">
        <SectionLabel aside={`${String(items.length).padStart(2, '0')} images`}>Photography</SectionLabel>
        <RevealText id="photos-title" className="display photos__title" lines={['Stills.']} />

        <div className="photos__rows">
          {photography.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`photos__row photos__row--${row.align || 'full'}`}
              style={{ '--row-width': `${row.width || 100}%` }}
            >
              {row.items.map((item) => {
                const index = counter++;
                return (
                  <button
                    key={item.src}
                    type="button"
                    className="photos__item"
                    style={{ '--r': ratioValue(item.ratio) }}
                    onClick={() => setOpen(index)}
                    data-cursor="View"
                    aria-label={`Open image ${index + 1} of ${items.length}`}
                  >
                    <Media src={item.src} alt={item.alt} ratio={item.ratio} sizes="(max-width: 899px) 100vw, 50vw" />
                    <span className="photos__number label">{String(index + 1).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
