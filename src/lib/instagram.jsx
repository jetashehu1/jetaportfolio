import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL || '/api/instagram';

/** Extracts the shortcode from a post/reel permalink. */
export function shortcodeOf(permalink) {
  if (!permalink) return null;
  const match = permalink.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel|reels|tv)\/([^/?#]+)/i);
  return match ? match[1] : null;
}

/** Normalises a Graph API media object into what the components need. */
function normalise(item) {
  const isVideo = item.media_type === 'VIDEO';
  const firstChild = item.children?.data?.[0];
  const image = isVideo
    ? item.thumbnail_url
    : item.media_url || firstChild?.thumbnail_url || firstChild?.media_url;
  return {
    id: item.id,
    shortcode: shortcodeOf(item.permalink),
    type: isVideo ? 'video' : 'image',
    image,
    video: isVideo ? item.media_url : null,
    permalink: item.permalink,
    caption: item.caption || '',
    timestamp: item.timestamp,
  };
}

const InstagramContext = createContext({ posts: [], status: 'idle', byShortcode: new Map() });

export function InstagramProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch(FEED_URL, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        if (!response.ok || !isJson) throw new Error('feed unavailable');
        return response.json();
      })
      .then((json) => {
        setPosts((json.data ?? []).map(normalise).filter((post) => post.image));
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('unavailable');
      });
    return () => controller.abort();
  }, []);

  const value = useMemo(() => {
    const byShortcode = new Map(posts.map((post) => [post.shortcode, post]));
    return { posts, status, byShortcode };
  }, [posts, status]);

  return <InstagramContext.Provider value={value}>{children}</InstagramContext.Provider>;
}

export function useInstagram() {
  return useContext(InstagramContext);
}

/**
 * Resolves the displayable media for a content item:
 * explicit `src`/`poster`/`video` fields win, then the matching Instagram post.
 */
export function useResolvedMedia(item) {
  const { byShortcode } = useInstagram();
  const post = byShortcode.get(shortcodeOf(item?.instagram));
  return {
    image: item?.src || item?.poster || post?.image || '',
    video: item?.video || post?.video || '',
    permalink: item?.instagram || post?.permalink || '',
  };
}
