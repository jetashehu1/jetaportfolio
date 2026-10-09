/**
 * PROJECTS
 * --------
 * One entry per client project. Each one gets a page at /work/<slug>.
 *
 * Media paths point into /public. Until a file exists there, the site shows a
 * clearly named placeholder frame (e.g. "images/zeros/hero.jpg") — just drop the
 * real file at that path and it appears. Nothing here is invented: years are
 * left empty until you fill them in, and copy only restates the services.
 *
 * Fields
 *   slug       URL — /work/<slug>
 *   client     Client name
 *   year       e.g. '2024' (empty = hidden)
 *   role       Your role on the project
 *   services   List shown on the project page
 *   summary    Short category line for cards, e.g. 'Photography / Film / Social Content'
 *   intro      One or two short sentences
 *   cover      { image, video?, alt? } — cover for cards + project hero
 *   gallery    Rows of media. Each item: image(src, layout, ratio) or
 *              video(src, poster, layout, ratio)
 *
 * Gallery layouts (desktop; everything stacks on mobile):
 *   'full' 'wide' 'wide-right' 'center' 'half-left' 'half-right'
 *   'portrait-left' 'portrait-right' 'small-left' 'small-right'
 */

const image = (src, layout, ratio, extra = {}) => ({ type: 'image', src, layout, ratio, ...extra });
const video = (src, poster, layout, ratio, extra = {}) => ({ type: 'video', src, poster, layout, ratio, ...extra });

export const projects = [
  {
    slug: 'golden-eagle',
    client: 'Golden Eagle',
    year: '',
    role: 'Photography & Film',
    services: ['Photography', 'Videography', 'Social Media Content', 'Campaign Content'],
    summary: 'Photography / Film / Social Content',
    intro: 'Photography, film and campaign content for Golden Eagle — produced for social media and campaigns.',
    cover: {
      image: '/images/golden-eagle/hero.jpg',
      video: '/videos/golden-eagle/preview.mp4',
    },
    gallery: [
      [video('/videos/golden-eagle/film.mp4', '/images/golden-eagle/film-poster.jpg', 'full', '16 / 9')],
      [
        image('/images/golden-eagle/01.jpg', 'portrait-left', '4 / 5'),
        image('/images/golden-eagle/02.jpg', 'half-right', '3 / 2', { offset: 10 }),
      ],
      [image('/images/golden-eagle/03.jpg', 'wide-right', '16 / 9')],
      [
        image('/images/golden-eagle/04.jpg', 'small-left', '4 / 5'),
        image('/images/golden-eagle/05.jpg', 'center', '3 / 2'),
      ],
    ],
  },
  {
    slug: 'natural',
    client: 'Natural Juice',
    year: '',
    role: 'Photography',
    services: ['Photography', 'Product Content', 'Campaign Visuals'],
    summary: 'Photography / Product / Campaign',
    intro: 'Product photography and campaign visuals for Natural Juice.',
    cover: { image: '/images/natural/hero.jpg' },
    gallery: [
      [
        image('/images/natural/01.jpg', 'half-left', '4 / 5'),
        image('/images/natural/02.jpg', 'half-right', '4 / 5', { offset: 8 }),
      ],
      [image('/images/natural/03.jpg', 'full', '21 / 9')],
      [image('/images/natural/04.jpg', 'portrait-right', '3 / 4')],
      [image('/images/natural/05.jpg', 'wide', '3 / 2')],
    ],
  },
  {
    slug: 'zeros',
    client: 'Zeros',
    year: '',
    role: 'Photography & Film',
    services: ['Product Photography', 'Videography', 'Social Content', 'Creative Campaigns'],
    summary: 'Product / Campaign / Content',
    intro: 'Product photography, video and social content for Zeros campaigns.',
    cover: { image: '/images/zeros/hero.jpg', video: '/videos/zeros/preview.mp4' },
    gallery: [
      [image('/images/zeros/01.jpg', 'wide', '16 / 9')],
      [
        image('/images/zeros/02.jpg', 'small-left', '1 / 1'),
        image('/images/zeros/03.jpg', 'portrait-right', '4 / 5', { offset: 6 }),
      ],
      [
        video('/videos/zeros/reel.mp4', '/images/zeros/reel-poster.jpg', 'portrait-left', '9 / 16'),
        image('/images/zeros/04.jpg', 'half-right', '4 / 5', { offset: 14 }),
      ],
      [image('/images/zeros/05.jpg', 'full', '16 / 9')],
    ],
  },
  {
    slug: 'art-center',
    client: 'Art Center',
    year: '',
    role: 'Photography & Film',
    services: ['Photography', 'Video', 'Social Media', 'Event Content'],
    summary: 'Photography / Video / Events',
    intro: 'Event photography, video and social media content for Art Center.',
    cover: { image: '/images/art-center/hero.jpg' },
    gallery: [
      [image('/images/art-center/01.jpg', 'full', '16 / 9')],
      [
        image('/images/art-center/02.jpg', 'portrait-left', '2 / 3'),
        image('/images/art-center/03.jpg', 'half-right', '3 / 2', { offset: 12 }),
      ],
      [video('/videos/art-center/film.mp4', '/images/art-center/film-poster.jpg', 'center', '16 / 9')],
      [image('/images/art-center/04.jpg', 'small-right', '4 / 5')],
    ],
  },
  {
    slug: 'hotel-prishtina',
    client: 'Hotel Prishtina',
    year: '',
    role: 'Photography & Film',
    services: ['Photography', 'Videography', 'Hospitality Content'],
    summary: 'Photography / Film / Hospitality',
    intro: 'Hospitality photography and video for Hotel Prishtina.',
    cover: { image: '/images/hotel-prishtina/hero.jpg' },
    gallery: [
      [image('/images/hotel-prishtina/01.jpg', 'wide-right', '3 / 2')],
      [
        image('/images/hotel-prishtina/02.jpg', 'half-left', '4 / 5'),
        image('/images/hotel-prishtina/03.jpg', 'portrait-right', '4 / 5', { offset: 10 }),
      ],
      [video('/videos/hotel-prishtina/film.mp4', '/images/hotel-prishtina/film-poster.jpg', 'full', '16 / 9')],
      [image('/images/hotel-prishtina/04.jpg', 'center', '21 / 9')],
    ],
  },
  {
    slug: 'zgatar-electronic',
    client: 'Zgatar Electronic',
    year: '',
    role: 'Photography & Content',
    services: ['Photography', 'Social Media', 'Marketing Content'],
    summary: 'Photography / Social / Marketing',
    intro: 'Photography, social media and marketing content for Zgatar Electronic.',
    cover: { image: '/images/zgatar-electronic/hero.jpg' },
    gallery: [
      [
        image('/images/zgatar-electronic/01.jpg', 'half-left', '1 / 1'),
        image('/images/zgatar-electronic/02.jpg', 'half-right', '1 / 1', { offset: 8 }),
      ],
      [image('/images/zgatar-electronic/03.jpg', 'wide', '16 / 9')],
      [image('/images/zgatar-electronic/04.jpg', 'portrait-right', '4 / 5')],
    ],
  },
  {
    slug: 'sydvast-montage',
    client: 'Sydvast Montage',
    year: '',
    role: 'Visual Communication',
    services: ['Visual Communication', 'Digital Content'],
    summary: 'Visual Communication / Digital',
    intro: 'Visual communication and digital content for Sydvast Montage.',
    cover: { image: '/images/sydvast-montage/hero.jpg' },
    gallery: [
      [image('/images/sydvast-montage/01.jpg', 'full', '21 / 9')],
      [
        image('/images/sydvast-montage/02.jpg', 'portrait-left', '4 / 5'),
        image('/images/sydvast-montage/03.jpg', 'half-right', '3 / 2', { offset: 10 }),
      ],
      [image('/images/sydvast-montage/04.jpg', 'center', '16 / 9')],
    ],
  },
  {
    slug: 'lebenstmanifesting',
    client: 'Lebenstmanifesting',
    year: '',
    role: 'Photography & Production',
    services: ['Photography', 'Visual Content', 'Creative Production'],
    summary: 'Photography / Visual Content / Production',
    intro: 'Photography, visual content and creative production for Lebenstmanifesting.',
    cover: { image: '/images/lebenstmanifesting/hero.jpg' },
    gallery: [
      [image('/images/lebenstmanifesting/01.jpg', 'portrait-right', '2 / 3')],
      [image('/images/lebenstmanifesting/02.jpg', 'wide', '3 / 2')],
      [
        image('/images/lebenstmanifesting/03.jpg', 'half-left', '4 / 5'),
        image('/images/lebenstmanifesting/04.jpg', 'small-right', '4 / 5', { offset: 16 }),
      ],
    ],
  },
];

/**
 * SELECTED WORK — how projects are composed on the home page.
 * Rows of { slug, col, ratio, offset? } on a 12-column desktop grid.
 * Reorder, resize or remove freely; mobile stacks everything full-width.
 */
export const workLayout = [
  [{ slug: 'golden-eagle', col: '1 / -1', ratio: '16 / 9', size: 'full' }],
  [
    { slug: 'natural', col: '1 / 6', ratio: '4 / 5' },
    { slug: 'zeros', col: '7 / 13', ratio: '3 / 2', offset: 16 },
  ],
  [{ slug: 'art-center', col: '3 / 13', ratio: '16 / 9' }],
  [
    { slug: 'hotel-prishtina', col: '1 / 5', ratio: '3 / 4' },
    { slug: 'zgatar-electronic', col: '6 / 9', ratio: '4 / 5', offset: 12, size: 'small' },
    { slug: 'sydvast-montage', col: '10 / 13', ratio: '1 / 1', offset: 4, size: 'small' },
  ],
  [{ slug: 'lebenstmanifesting', col: '1 / -1', ratio: '21 / 9', size: 'full' }],
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);

export const projectIndex = (slug) => projects.findIndex((project) => project.slug === slug);

export const nextProject = (slug) => projects[(projectIndex(slug) + 1) % projects.length];
