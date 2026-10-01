/**
 * PORTFOLIO CONTENT
 * -----------------
 * This file is the single place where the curated work lives.
 *
 * No content is invented here: every slot is empty until real media from
 * @jettashehu is added. Empty slots render as neutral, labelled frames so the
 * layout can be reviewed before the photographs are in.
 *
 * Each media item accepts ANY of these sources (first match wins):
 *   src        — a local file in /public (e.g. '/work/portrait-01.jpg') or URL
 *   instagram  — a post/reel permalink, e.g. 'https://www.instagram.com/p/XXXXXXXX/'
 *                Resolved at runtime via the official Instagram API feed
 *                (api/instagram.js). Requires INSTAGRAM_ACCESS_TOKEN.
 *
 * Optional: srcSet / sizes for responsive images, `focus` for object-position.
 */

export const categories = ['Portraits', 'Lifestyle', 'Product', 'Events', 'Travel', 'Editorial'];

/**
 * SELECTED WORK — arranged as rows of a photography book.
 *
 * Desktop uses a 12-column grid. For every item:
 *   col    — CSS grid-column on desktop (e.g. '1 / 9')
 *   ratio  — aspect ratio of the frame (e.g. '3 / 2', '4 / 5')
 *   offset — optional vertical drop in rem, for asymmetric pairings
 *   align  — optional 'start' | 'end' | 'center' (vertical alignment in the row)
 * On mobile every image becomes full-width (with gentle insets for small ones).
 */
export const workRows = [
  [
    { id: 'w01', category: 'Portraits', title: '', alt: '', src: '', instagram: '', ratio: '3 / 2', col: '1 / 10' },
    { id: 'w02', category: 'Editorial', title: '', alt: '', src: '', instagram: '', ratio: '4 / 5', col: '10 / 13', align: 'end', size: 'small' },
  ],
  [
    { id: 'w03', category: 'Lifestyle', title: '', alt: '', src: '', instagram: '', ratio: '4 / 5', col: '2 / 7' },
    { id: 'w04', category: 'Product', title: '', alt: '', src: '', instagram: '', ratio: '3 / 4', col: '8 / 12', offset: 10 },
  ],
  [
    { id: 'w05', category: 'Travel', title: '', alt: '', src: '', instagram: '', ratio: '16 / 9', col: '1 / 13', size: 'full' },
  ],
  [
    { id: 'w06', category: 'Events', title: '', alt: '', src: '', instagram: '', ratio: '4 / 5', col: '1 / 5', size: 'small' },
    { id: 'w07', category: 'Portraits', title: '', alt: '', src: '', instagram: '', ratio: '4 / 5', col: '5 / 9', offset: 6, size: 'small' },
    { id: 'w08', category: 'Product', title: '', alt: '', src: '', instagram: '', ratio: '4 / 5', col: '9 / 13', offset: 12, size: 'small' },
  ],
  [
    { id: 'w09', category: 'Editorial', title: '', alt: '', src: '', instagram: '', ratio: '2 / 3', col: '1 / 6' },
    { id: 'w10', category: 'Lifestyle', title: '', alt: '', src: '', instagram: '', ratio: '3 / 2', col: '7 / 13', align: 'center' },
  ],
  [
    { id: 'w11', category: 'Travel', title: '', alt: '', src: '', instagram: '', ratio: '4 / 5', col: '4 / 10' },
  ],
];

/**
 * MOTION — reels and horizontal films.
 *   orientation — 'vertical' (9:16) or 'horizontal' (16:9)
 *   poster      — thumbnail image (src or resolved from `instagram`)
 *   video       — an .mp4 file/URL. If omitted and `instagram` is set, the
 *                 API feed provides the video URL; otherwise the modal links
 *                 out to the reel on Instagram.
 */
export const videos = [
  { id: 'v01', title: '', category: 'Reel', orientation: 'vertical', poster: '', video: '', instagram: '' },
  { id: 'v02', title: '', category: 'Film', orientation: 'horizontal', poster: '', video: '', instagram: '' },
  { id: 'v03', title: '', category: 'Reel', orientation: 'vertical', poster: '', video: '', instagram: '' },
  { id: 'v04', title: '', category: 'Reel', orientation: 'vertical', poster: '', video: '', instagram: '' },
  { id: 'v05', title: '', category: 'Film', orientation: 'horizontal', poster: '', video: '', instagram: '' },
];

/**
 * FROM INSTAGRAM — used only when the live API feed is unavailable.
 * When INSTAGRAM_ACCESS_TOKEN is configured, the latest posts are shown
 * automatically and this list is ignored.
 */
export const instagramFallback = [
  // { id: 'ig01', src: '/instagram/01.jpg', instagram: 'https://www.instagram.com/p/XXXXXXXX/', alt: '' },
];

export const INSTAGRAM_POST_COUNT = 9;
