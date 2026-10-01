import { instagram } from '../data/site.js';
import { INSTAGRAM_POST_COUNT, instagramFallback } from '../data/portfolio.js';
import { useInstagram, useResolvedMedia } from '../lib/instagram.jsx';
import Media from './Media.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import './InstagramSection.css';

function Tile({ post, index }) {
  const { image } = useResolvedMedia({ src: post.image || post.src, instagram: post.instagram });
  const href = post.permalink || post.instagram || instagram.url;
  return (
    <Reveal as="li" className="ig__tile" delay={(index % 3) * 80}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`View post ${index + 1} on Instagram`}>
        <Media
          src={image}
          alt={post.alt || (post.caption ? post.caption.slice(0, 120) : `Instagram post by ${instagram.handle}`)}
          ratio="4 / 5"
          sizes="(max-width: 600px) 50vw, 33vw"
        />
      </a>
    </Reveal>
  );
}

export default function InstagramSection() {
  const { posts, status } = useInstagram();

  // Live API feed first; otherwise the manually curated fallback; otherwise empty frames.
  const source = status === 'ready' && posts.length ? posts : instagramFallback;
  const tiles = Array.from({ length: INSTAGRAM_POST_COUNT }, (_, i) => source[i] ?? { id: `slot-${i}` });

  return (
    <section className="ig" id="instagram">
      <div className="container">
        <SectionHeader index={4} title={['From', 'Instagram']} aside={instagram.handle}>
          <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="link-arrow eyebrow">
            View Instagram ↗
          </a>
        </SectionHeader>

        <ul className="ig__grid">
          {tiles.map((post, index) => (
            <Tile key={post.id} post={post} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
