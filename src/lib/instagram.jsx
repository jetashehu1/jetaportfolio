import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Optional: resolve `instagram:` permalinks in the data files through the
 * official Instagram API proxy (api/instagram.js). Disabled unless
 * VITE_INSTAGRAM_FEED=true, so nothing is requested by default.
 */
const ENABLED = import.meta.env.VITE_INSTAGRAM_FEED === 'true';
const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL || '/api/instagram';

export function shortcodeOf(permalink) {
  if (!permalink) return null;
  const match = permalink.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel|reels|tv)\/([^/?#]+)/i);
  return match ? match[1] : null;
}

function normalise(item) {
  const isVideo = item.media_type === 'VIDEO';
  const firstChild = item.children?.data?.[0];
  return {
    shortcode: shortcodeOf(item.permalink),
    image: isVideo ? item.thumbnail_url : item.media_url || firstChild?.media_url,
    video: isVideo ? item.media_url : null,
  };
}

const InstagramContext = createContext(new Map());

export function InstagramProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!ENABLED) return undefined;
    const controller = new AbortController();
    fetch(FEED_URL, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : { data: [] }))
      .then((json) => setPosts((json.data ?? []).map(normalise)))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const byShortcode = useMemo(() => new Map(posts.map((post) => [post.shortcode, post])), [posts]);
  return <InstagramContext.Provider value={byShortcode}>{children}</InstagramContext.Provider>;
}

/** The feed entry for a permalink, if the feed is enabled and contains it. */
export function useInstagramPost(permalink) {
  return useContext(InstagramContext).get(shortcodeOf(permalink)) ?? null;
}
