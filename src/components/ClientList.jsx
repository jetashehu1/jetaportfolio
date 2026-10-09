import { useEffect, useRef, useState } from 'react';
import { clients } from '../data/clients.js';
import { getProject } from '../data/projects.js';
import { resolveImage } from '../lib/media.js';
import { Link } from '../lib/router.jsx';
import RevealText from './RevealText.jsx';
import Rule from './Rule.jsx';
import SectionLabel from './SectionLabel.jsx';
import './ClientList.css';

/** Floating cover that follows the pointer over client rows (fine pointers only). */
function HoverPreview({ image, listRef }) {
  const node = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const onMove = (event) => {
      if (node.current) node.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    list.addEventListener('pointermove', onMove, { passive: true });
    return () => list.removeEventListener('pointermove', onMove);
  }, [listRef]);

  return (
    <div ref={node} className={`client-preview ${image ? 'is-visible' : ''}`} aria-hidden="true">
      {image && <img src={image.src} srcSet={image.srcSet} sizes="22vw" alt="" decoding="async" />}
    </div>
  );
}

export default function ClientList() {
  const listRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const longestName = Math.max(...clients.map((client) => client.name.length));
  const hoveredImage = hovered ? resolveImage(getProject(hovered)?.cover.image) : null;

  return (
    <section className="clients section theme-cream" id="clients" aria-labelledby="clients-title">
      <div className="wrap">
        <SectionLabel index={3} aside={`${String(clients.length).padStart(2, '0')} clients`}>
          Selected Clients
        </SectionLabel>
        <RevealText id="clients-title" className="display display--md clients__title" lines={['Selected', 'clients']} />

        <ul
          className="clients__list"
          ref={listRef}
          onPointerLeave={() => setHovered(null)}
          style={{ '--len': longestName }}
        >
          {clients.map((client, index) => {
            const project = getProject(client.slug);
            return (
              <li key={client.name} className="clients__item">
                <Rule red={index === 0} delay={index * 60} />
                <Link
                  to={project ? `/work/${client.slug}` : '/#work'}
                  className="clients__row"
                  data-cursor="View"
                  onPointerEnter={() => setHovered(client.slug)}
                >
                  <span className="clients__index label">{String(index + 1).padStart(2, '0')}</span>
                  <span className="clients__name">{client.name}</span>
                  {project && <span className="clients__summary label">{project.summary}</span>}
                  <span className="clients__arrow arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="clients__item clients__item--end">
            <Rule />
          </li>
        </ul>
      </div>
      <HoverPreview image={hoveredImage} listRef={listRef} />
    </section>
  );
}
