import files from 'virtual:media-manifest';

const available = new Set(files);
const WIDTHS = [640, 1280, 1920];
const isExternal = (src) => /^(https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('blob:');

/** True when the file exists in /public (or is an external URL). */
export function hasMedia(src) {
  if (!src) return false;
  return isExternal(src) || available.has(src);
}

/**
 * Resolves an image path to { src, srcSet } — or null when the file has not
 * been added yet. Responsive variants are picked up automatically when they
 * sit next to the original:  hero.jpg + hero-640.webp, hero-1280.webp, hero-1920.webp
 * (any subset works; .webp, .avif or the original extension).
 */
export function resolveImage(src) {
  if (!hasMedia(src)) return null;
  if (isExternal(src)) return { src };

  const match = src.match(/^(.*)\.(jpe?g|png|webp|avif)$/i);
  if (!match) return { src };
  const [, base, ext] = match;
  const variants = WIDTHS.map((width) => {
    const candidate = [`${base}-${width}.webp`, `${base}-${width}.avif`, `${base}-${width}.${ext}`].find((file) =>
      available.has(file),
    );
    return candidate ? `${candidate} ${width}w` : null;
  }).filter(Boolean);

  if (!variants.length) return { src };
  // The original is listed as the largest candidate (export it at ≥ 2400px).
  return { src, srcSet: [...variants, `${src} 2560w`].join(', ') };
}

/** Readable label for an empty slot: '/images/zeros/hero.jpg' → 'images/zeros/hero.jpg'. */
export function slotLabel(src) {
  return src ? src.replace(/^\//, '') : 'media';
}
