import { useEffect, useRef, useState } from 'react';
import { useInView } from '../lib/hooks.js';
import { hasMedia, resolveImage, slotLabel } from '../lib/media.js';
import './VideoPreview.css';

const canAutoplay = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData;

/**
 * Cinematic, muted, looping preview.
 *  - poster first; the video file is only attached when it nears the viewport
 *  - plays while visible, pauses when it leaves
 *  - lighter `mobile` source on small screens when provided
 * Pass `onOpen` to make it a button (opens the full film with sound).
 */
export default function VideoPreview({ src, mobile, poster, ratio = '16 / 9', title, onOpen, className = '' }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const near = useInView(ref, { rootMargin: '400px 0px' });
  const visible = useInView(ref, { threshold: 0.2 });
  const [attached, setAttached] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [source] = useState(() => {
    const small = window.matchMedia('(max-width: 767px)').matches;
    if (small && hasMedia(mobile)) return mobile;
    return hasMedia(src) ? src : null;
  });
  const posterImage = resolveImage(poster);

  useEffect(() => {
    if (near && source) setAttached(true);
  }, [near, source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !attached) return;
    if (visible && canAutoplay()) video.play().catch(() => {});
    else video.pause();
  }, [visible, attached]);

  const empty = !source && !posterImage;
  const Tag = onOpen ? 'button' : 'div';

  return (
    <Tag
      ref={ref}
      className={`vp ${playing ? 'is-playing' : ''} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      {...(onOpen
        ? { type: 'button', onClick: onOpen, 'data-cursor': 'Play', 'aria-label': `Play ${title || 'film'}` }
        : {})}
    >
      {posterImage && (
        <img
          className="vp__poster"
          src={posterImage.src}
          srcSet={posterImage.srcSet}
          sizes={posterImage.srcSet ? '100vw' : undefined}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      {source && attached && (
        <video
          ref={videoRef}
          className="vp__video"
          src={source}
          poster={posterImage?.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
        />
      )}
      {empty && (
        <span className="vp__slot">
          <span className="vp__slot-label">{slotLabel(src)}</span>
        </span>
      )}
      {onOpen && (
        <span className="vp__tag label" aria-hidden="true">
          <span className="vp__tag-icon" /> Play
        </span>
      )}
    </Tag>
  );
}
