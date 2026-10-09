import { hasMedia, resolveImage, slotLabel } from '../lib/media.js';
import Overlay from './Overlay.jsx';
import './VideoModal.css';

const isVertical = (ratio = '16 / 9') => {
  const [w, h] = ratio.split('/').map(Number);
  return h > w;
};

function Player({ item }) {
  const poster = resolveImage(item.poster);
  const playable = hasMedia(item.src);
  const vertical = isVertical(item.ratio);

  return (
    <div className={`video-modal ${vertical ? 'video-modal--vertical' : 'video-modal--horizontal'}`}>
      <div className="video-modal__frame">
        {playable ? (
          <video
            className="video-modal__video"
            src={item.src}
            poster={poster?.src}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        ) : (
          <div className="video-modal__empty">
            {poster && <img src={poster.src} alt="" className="video-modal__poster" />}
            <span className="label">Film not added yet — {slotLabel(item.src)}</span>
          </div>
        )}
      </div>
      {item.title && <p className="video-modal__caption label">{item.title}</p>}
    </div>
  );
}

/** Full film with sound, opened from a preview. */
export default function VideoModal({ item, onClose }) {
  return (
    <Overlay open={Boolean(item)} onClose={onClose} label="Film player">
      {item && <Player key={item.src} item={item} />}
    </Overlay>
  );
}
