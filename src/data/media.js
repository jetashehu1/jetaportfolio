/**
 * PHOTOGRAPHY & FILM
 * Paths point into /public. Missing files render as named placeholders.
 */

/**
 * Photography gallery — rows of images that keep their own proportions.
 * Each row is justified (same height, widths follow aspect ratios).
 *   width — share of the page width the row uses (default 100)
 *   align — 'left' | 'center' | 'right' when width < 100
 */
export const photography = [
  {
    items: [
      { src: '/images/photography/01.jpg', ratio: '3 / 2', alt: 'Photograph by Jeta Shehu' },
      { src: '/images/photography/02.jpg', ratio: '4 / 5', alt: 'Photograph by Jeta Shehu' },
    ],
  },
  {
    items: [{ src: '/images/photography/03.jpg', ratio: '21 / 9', alt: 'Photograph by Jeta Shehu' }],
  },
  {
    width: 78,
    align: 'right',
    items: [
      { src: '/images/photography/04.jpg', ratio: '1 / 1', alt: 'Photograph by Jeta Shehu' },
      { src: '/images/photography/05.jpg', ratio: '2 / 3', alt: 'Photograph by Jeta Shehu' },
      { src: '/images/photography/06.jpg', ratio: '4 / 5', alt: 'Photograph by Jeta Shehu' },
    ],
  },
  {
    width: 64,
    align: 'left',
    items: [{ src: '/images/photography/07.jpg', ratio: '16 / 9', alt: 'Photograph by Jeta Shehu' }],
  },
  {
    items: [
      { src: '/images/photography/08.jpg', ratio: '4 / 5', alt: 'Photograph by Jeta Shehu' },
      { src: '/images/photography/09.jpg', ratio: '3 / 2', alt: 'Photograph by Jeta Shehu' },
      { src: '/images/photography/10.jpg', ratio: '4 / 5', alt: 'Photograph by Jeta Shehu' },
    ],
  },
];

/**
 * Film — cinematic previews. Muted autoplay in view; click opens the full
 * film with sound. `mobile` is an optional lighter file for small screens.
 */
export const films = [
  {
    id: 'showreel',
    title: 'Showreel',
    src: '/videos/showreel.mp4',
    mobile: '/videos/showreel-mobile.mp4',
    poster: '/images/film/showreel.jpg',
    ratio: '16 / 9',
    layout: 'full',
  },
  {
    id: 'reel-01',
    title: 'Reel 01',
    src: '/videos/reels/01.mp4',
    poster: '/images/film/reel-01.jpg',
    ratio: '9 / 16',
    layout: 'reel',
  },
  {
    id: 'reel-02',
    title: 'Reel 02',
    src: '/videos/reels/02.mp4',
    poster: '/images/film/reel-02.jpg',
    ratio: '9 / 16',
    layout: 'reel',
  },
  {
    id: 'reel-03',
    title: 'Reel 03',
    src: '/videos/reels/03.mp4',
    poster: '/images/film/reel-03.jpg',
    ratio: '9 / 16',
    layout: 'reel',
  },
];
