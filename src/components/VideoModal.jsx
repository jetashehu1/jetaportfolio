import { useResolvedMedia } from '../lib/instagram.jsx';
import Overlay from './Overlay.jsx';
import './VideoModal.css';

function Player({ item }) {
  const { image: poster } = useResolvedMedia({ ...item, src: item.poster });
  const { video, permalink } = useResolvedMedia(item);
  const label = item.title || item.category;

  return (
    <div className={`video-modal video-modal--${item.orientation}`}>
      <div className="video-modal__frame">
        {video ? (
          <video
            className="video-modal__video"
            src={video}
            poster={poster || undefined}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="video-modal__empty">
            {poster && <img src={poster} alt="" className="video-modal__poster" />}
            <div className="video-modal__empty-body">
              {permalink ? (
                <a href={permalink} target="_blank" rel="noopener noreferrer" className="link-arrow eyebrow">
                  Watch on Instagram ↗
                </a>
              ) : (
                <span className="eyebrow">Video not added yet</span>
              )}
            </div>
          </div>
        )}
      </div>
      <p className="video-modal__caption eyebrow">{label}</p>
    </div>
  );
}

export default function VideoModal({ item, onClose }) {
  return (
    <Overlay open={Boolean(item)} onClose={onClose} label="Video player">
      {item && <Player key={item.id} item={item} />}
    </Overlay>
  );
}
