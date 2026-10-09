/**
 * SITE COPY & SETTINGS
 * All text on the site lives here (projects → projects.js, clients → clients.js,
 * photography & film → media.js). Edit freely; components only read this data.
 */

export const site = {
  name: 'Jeta Shehu',
  firstName: 'Jeta',
  lastName: 'Shehu',
  roles: ['Photographer', 'Filmmaker', 'Creative'],
  experience: '8+',
  since: 2018,
  location: 'Kosovo',
  availability: 'Available for selected projects',
  year: 2026,
  title: 'Jeta Shehu — Photographer, Filmmaker & Creative',
  description:
    'Portfolio of Jeta Shehu — photographer, filmmaker and creative specializing in photography, film, visual storytelling, social media and brand content.',
};

export const links = {
  instagram: 'https://www.instagram.com/jettashehu/',
  instagramHandle: '@jettashehu',
  behance: '', // e.g. 'https://www.behance.net/jetashehu' — hidden until set
  email: '', //   e.g. 'hello@jetashehu.com' — "Get in touch" falls back to Instagram until set
};

/** Header navigation — `#id` points at a section on the home page. */
export const navigation = [
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
];

export const hero = {
  /** Strong portrait / cinematic still. The only image preloaded on the site. */
  image: '/images/hero/portrait.jpg',
  alt: 'Jeta Shehu — portrait',
  focus: 'center 30%',
  statement: ['8+ years of', 'visual storytelling.'],
  meta: ['Based in Kosovo', 'Available for selected projects'],
};

export const intro = {
  label: 'Profile',
  statement: ['I create', 'images,', 'motion', '& stories.'],
  body: [
    'Jeta Shehu is a photographer, filmmaker and creative with over eight years of experience creating visual content for brands, people and places.',
    'Her work combines photography, filmmaking, creative direction, social media and marketing.',
  ],
};

export const marquee = [
  'Photography',
  'Film',
  'Creative Direction',
  'Social Media',
  'Marketing',
  'Visual Storytelling',
];

export const experience = {
  label: 'Experience',
  statement: ['8 years', 'behind', 'the camera', '& the idea.'],
  body: 'Since 2018, Jeta Shehu has worked across photography, filmmaking, social media, marketing and visual communication.',
  expertise: [
    'Photography',
    'Videography',
    'Creative Direction',
    'Social Media',
    'Marketing',
    'Content Creation',
    'Post-production',
    'Campaign Development',
    'Visual Storytelling',
  ],
};

export const statement = ['Visual stories', 'for brands', 'that want', 'to be seen.'];

export const about = {
  label: 'About',
  portrait: '/images/about/portrait.jpg',
  alt: 'Portrait of Jeta Shehu',
  words: ['Image.', 'Motion.', 'Story.', 'Idea.'],
  body: [
    'Jeta Shehu is a photographer, filmmaker and creative with more than eight years of experience in visual storytelling.',
    'Her practice moves between photography, film, social media, marketing and creative direction, combining visual aesthetics with strategic communication.',
  ],
};

export const contact = {
  label: 'Contact',
  headline: ['Let’s make', 'something', 'worth', 'seeing.'],
  support: ['Available for selected', 'projects & collaborations.'],
  cta: 'Get in touch',
};
