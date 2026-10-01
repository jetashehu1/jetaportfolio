/**
 * Site-wide copy and settings.
 * Everything here is plain data — edit freely without touching components.
 */

export const site = {
  name: 'Jeta Shehu',
  firstName: 'Jeta',
  lastName: 'Shehu',
  role: 'Photographer & Visual Creator',
  disciplines: ['Photographer', 'Visual Creator', 'Social Media / Creative Content'],
  location: 'Based in Kosovo',
  availability: 'Available for selected projects',
  year: 2026,
};

export const instagram = {
  handle: '@jettashehu',
  username: 'jettashehu',
  url: 'https://www.instagram.com/jettashehu/',
};

export const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Video', href: '#motion' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Hero image. Provide either:
 *  - `src`: a local file in /public (e.g. '/images/hero.jpg') or any image URL, or
 *  - `instagram`: the permalink of a post on @jettashehu — resolved at runtime
 *    through the Instagram API feed (see README → Instagram).
 */
export const hero = {
  src: '',
  instagram: '',
  alt: 'Photograph by Jeta Shehu',
  /** CSS object-position, useful to keep the subject in frame on mobile. */
  focus: 'center 40%',
};

export const about = {
  portrait: {
    src: '',
    instagram: '',
    alt: 'Portrait of Jeta Shehu',
  },
  /** Each string is rendered as its own paragraph. */
  body: [
    'Jeta Shehu is a photographer and visual creator focused on capturing people, products, places and moments through a clean and contemporary visual language.',
    'Her work moves between portraiture, lifestyle, product and editorial imagery — as well as short-form video and creative content for social media.',
  ],
  services: ['Portraits', 'Lifestyle', 'Product', 'Events', 'Travel', 'Editorial', 'Social media content'],
};

export const contact = {
  email: '', // e.g. 'hello@jetashehu.com' — leave empty to hide until ready
  phone: '', // optional
  /** Add more channels later — { label, value, href } */
  extra: [],
};
