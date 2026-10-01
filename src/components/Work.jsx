import { useMemo, useState } from 'react';
import { categories, workRows } from '../data/portfolio.js';
import { useResolvedMedia } from '../lib/instagram.jsx';
import Media from './Media.jsx';
import SectionHeader from './SectionHeader.jsx';
import Lightbox from './Lightbox.jsx';
import './Work.css';

function WorkItem({ item, number, dimmed, onOpen }) {
  const { image } = useResolvedMedia(item);
  const label = item.title ? `${item.category} — ${item.title}` : item.category;

  return (
    <figure
      className={`work-item work-item--${item.size || 'default'} ${dimmed ? 'is-dimmed' : ''}`}
      style={{
        '--col': item.col,
        '--offset': `${item.offset || 0}rem`,
        alignSelf: item.align || 'start',
      }}
    >
      <button type="button" className="work-item__button" onClick={onOpen} aria-label={`Open ${label}`}>
        <Media
          src={image}
          srcSet={item.srcSet}
          sizes={item.sizes || '(max-width: 900px) 100vw, 60vw'}
          alt={item.alt || label}
          ratio={item.ratio}
          focus={item.focus}
          label={image ? null : `${item.category} · ${item.ratio.replace(/\s/g, '')}`}
        />
        <span className="work-item__hover" aria-hidden="true">
          <span className="eyebrow">{item.category}</span>
          {item.title && <span className="work-item__hover-title">{item.title}</span>}
        </span>
      </button>
      <figcaption className="work-item__caption eyebrow">
        <span>{String(number).padStart(2, '0')}</span>
        <span>{item.title || item.category}</span>
      </figcaption>
    </figure>
  );
}

export default function Work() {
  const [filter, setFilter] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const items = useMemo(() => workRows.flat(), []);

  let counter = 0;

  return (
    <section className="work" id="work">
      <div className="container">
        <SectionHeader index={1} title={['Selected', 'Work']}>
          <ul className="work__filters" aria-label="Filter by category">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={`work__filter eyebrow ${filter === category ? 'is-active' : ''}`}
                  aria-pressed={filter === category}
                  onClick={() => setFilter((current) => (current === category ? null : category))}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </SectionHeader>

        <div className="work__rows">
          {workRows.map((row, rowIndex) => (
            <div className="work__row" key={rowIndex}>
              {row.map((item) => {
                const index = counter++;
                return (
                  <WorkItem
                    key={item.id}
                    item={item}
                    number={index + 1}
                    dimmed={filter && item.category !== filter}
                    onOpen={() => setOpenIndex(index)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </section>
  );
}
