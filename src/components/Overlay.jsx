import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useBodyLock, useKeys } from '../lib/hooks.js';
import './Overlay.css';

/** Fullscreen dark layer shared by the lightbox and the video player. */
export default function Overlay({ open, onClose, label, keys = {}, children }) {
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useBodyLock(open);
  useKeys(open, { Escape: onClose, ...keys });

  useEffect(() => {
    if (!open) return undefined;
    previousFocus.current = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    return () => previousFocus.current?.focus?.({ preventScroll: true });
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="overlay" role="dialog" aria-modal="true" aria-label={label}>
      <div className="overlay__backdrop" onClick={onClose} />
      <button ref={closeRef} type="button" className="overlay__close eyebrow" onClick={onClose}>
        Close
      </button>
      {children}
    </div>,
    document.body,
  );
}
