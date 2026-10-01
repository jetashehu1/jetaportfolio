# Jeta Shehu — Photography & Visual Portfolio

Editorial, image-first portfolio for **Jeta Shehu** — Photographer & Visual Creator.
Built with React + Vite. No UI libraries; plain CSS per component.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
api/instagram.js          Serverless proxy for the official Instagram API (token stays server-side)
src/data/site.js          Copy: name, hero image, about text, contact details, navigation
src/data/portfolio.js     Curated work layout, videos, Instagram fallback
src/lib/instagram.jsx     Feed provider + helpers that resolve media from Instagram permalinks
src/components/           Header, Hero, Work, Lightbox, Motion, VideoModal, About,
                          InstagramSection, Contact, Footer, Media, Reveal, Overlay
```

## Adding the real work

No posts or projects are invented. Every image slot starts empty and shows as a quiet
labelled frame until real media is added. For each slot in `src/data/portfolio.js`
(and for the hero/portrait in `src/data/site.js`), set **one** of the following:

- `src`: a file in `public/` (e.g. `/work/portrait-01.jpg`) or any image URL. This is the most
  reliable option and is recommended for the curated *Selected Work* section. Export
  images at ~2400px on the long edge, as WebP/JPEG at ~80% quality. Add `srcSet`/`sizes` for
  responsive variants.
- `instagram`: the post or reel permalink from @jettashehu, for example
  `https://www.instagram.com/p/XXXXXXXX/`. The image (or video, for reels) is resolved at
  runtime from the API feed below.

Every item also takes `category`, `title`, `alt` and `focus` (CSS `object-position`).
On desktop, the layout of each row of *Selected Work* comes from `col` (12-column grid), `ratio`,
`offset` and `align`, so you can arrange it like the spreads of a photo book.

Videos (`videos` array) take `orientation` (`vertical` / `horizontal`), `poster`, `video` (an
.mp4 file) and/or `instagram` (a reel permalink). If no playable file is available, the modal
links out to the reel on Instagram.

## Instagram (official Meta API)

Instagram does not allow its media to be scraped. Real posts are loaded through the
**Instagram API with Instagram Login** (`graph.instagram.com`), which requires @jettashehu to be
a Professional (Business/Creator) account.

1. Create an app at <https://developers.facebook.com/> and add the *Instagram* product
   (API setup with Instagram login).
2. Add @jettashehu as an Instagram tester, then generate an access token with the
   `instagram_business_basic` permission.
3. Exchange the token for a **long-lived token** (valid for 60 days) and set it as a server environment variable:
   `INSTAGRAM_ACCESS_TOKEN=...` (copy `.env.example` to `.env` for local development).
4. Refresh the token before it expires (for example, with a monthly cron job):
   `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN`

Once the token is set:

- **From Instagram** shows the latest 9 posts automatically.
- Any slot with an `instagram` permalink gets its image or video from the feed.
- Without a token, the site falls back to `instagramFallback`, and then to empty frames. Nothing breaks.

`api/instagram.js` runs as a Vercel serverless function in production and as Vite dev
middleware locally. On other hosts, deploy it as a function at `/api/instagram`, or set
`VITE_INSTAGRAM_FEED_URL` to the address where it is deployed. Responses are cached at the edge for one hour,
because Instagram CDN URLs are signed and expire.

## Editing copy

All text lives in `src/data/site.js`. This includes the About paragraphs, location, availability,
email, phone, and extra contact rows (`contact.extra: [{ label, value, href }]`).
