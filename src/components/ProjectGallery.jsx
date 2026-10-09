import { useMemo, useState } from 'react';
import Lightbox from './Lightbox.jsx';
import Media from './Media.jsx';
import Reveal from './Reveal.jsx';
import VideoModal from './VideoModal.jsx';
import VideoPreview from './VideoPreview.jsx';
import './ProjectGallery.css';

/** Editorial rows of stills and films for a project page. */
export default function ProjectGallery({ project }) {
  const [openImage, setOpenImage] = useState(null);
  const [openVideo, setOpenVideo] = useState(null);
  const images = useMemo(
    () =>
      project.gallery
        .flat()
        .filter((item) => item.type === 'image')
        .map((item) => ({ ...item, alt: item.alt || `${project.client} — ${project.summary}` })),
    [project],
  );

  return (
    <section className="project-gallery" aria-label={`${project.client} gallery`}>
      <div className="wrap project-gallery__rows">
        {project.gallery.map((row, rowIndex) => (
          <div className="project-gallery__row" key={rowIndex}>
            {row.map((item) => {
              const style = { '--offset': `${item.offset || 0}rem` };
              if (item.type === 'video') {
                return (
                  <Reveal key={item.src} className={`project-gallery__item is-${item.layout}`} style={style}>
                    <VideoPreview
                      src={item.src}
                      mobile={item.mobile}
                      poster={item.poster}
                      ratio={item.ratio}
                      title={project.client}
                      onOpen={() => setOpenVideo({ ...item, title: project.client })}
                    />
                  </Reveal>
                );
              }
              const index = images.findIndex((image) => image.src === item.src);
              return (
                <button
                  key={item.src}
                  type="button"
                  className={`project-gallery__item is-${item.layout}`}
                  style={style}
                  onClick={() => setOpenImage(index)}
                  data-cursor="View"
                  aria-label={`Open image ${index + 1} of ${images.length}`}
                >
                  <Media
                    src={item.src}
                    alt={images[index].alt}
                    ratio={item.ratio}
                    sizes={item.layout === 'full' ? '100vw' : '(max-width: 899px) 100vw, 60vw'}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <Lightbox items={images} index={openImage} onChange={setOpenImage} onClose={() => setOpenImage(null)} />
      <VideoModal item={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}
