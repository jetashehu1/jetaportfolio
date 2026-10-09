# Jeta Shehu — Photographer, Filmmaker & Creative

Editorial portfolio built with React + Vite. It uses no UI or routing library, just plain CSS per component.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Where things live

| What | File |
| --- | --- |
| Site copy: hero, intro, experience, statement, about, contact, links, nav | `src/data/site.js` |
| Projects, project pages and the Selected Work layout | `src/data/projects.js` |
| Selected Clients list (order) | `src/data/clients.js` |
| Photography gallery and film / reels | `src/data/media.js` |
| Colours, type scale, easing | `src/styles/global.css` (`:root`) |

Pages: `/` (home) and `/work/<slug>` (one per project in `projects.js`). Unknown URLs show a 404 page.

## Adding photographs and films

Every media path in the data files points into `public/`. If a file is missing, the site shows a
placeholder frame with the expected path written on it (for example `images/zeros/hero.jpg`).
To show the real file, put it at that path. No code changes are needed. The site never requests missing files.

```
public/images/hero/portrait.jpg            hero portrait (the only preloaded image)
public/images/about/portrait.jpg           about spread
public/images/<project>/hero.jpg           project cover (cards + project page)
public/images/<project>/01.jpg …           project gallery
public/images/photography/01.jpg … 10.jpg  photography gallery
public/images/film/*.jpg                   film posters
public/videos/showreel.mp4                 showreel (+ optional showreel-mobile.mp4)
public/videos/reels/01.mp4 …               vertical reels
public/videos/<project>/preview.mp4        optional looping cover for a project card
public/videos/<project>/film.mp4           project films
```

Project folders: `golden-eagle`, `natural`, `zeros`, `art-center`, `hotel-prishtina`,
`zgatar-electronic`, `sydvast-montage`, `lebenstmanifesting`.

**Image sizes.** Export the original at about 2400px on the long edge. For responsive loading, add
smaller versions next to it, named `-640`, `-1280` and `-1920` (for example `hero-640.webp`,
`hero-1280.webp`, `hero-1920.webp`). The site picks them up automatically. One way to make them:
`npx sharp-cli -i hero.jpg -o hero-1280.webp resize 1280`.

**Video.** Use H.264 MP4. Keep previews short (6–15s), muted-friendly and around 1080p and 2–6 MB.
For phones, add a lighter `mobile` file (720p). Previews load only when they come near the screen,
play only while visible, and pause when they leave. Each preview shows its poster first. Clicking
opens the full film with sound.

## Editing projects

Each project in `projects.js` has these fields:

- `client`, `year`, `role`, `services`, `summary`, `intro`
- `cover`: `image`, plus an optional `video`
- `gallery`: rows of `image(src, layout, ratio)` / `video(src, poster, layout, ratio)`

Layouts: `full`, `wide`, `wide-right`, `center`, `half-left`, `half-right`, `portrait-left`,
`portrait-right`, `small-left`, `small-right`. Add `{ offset: 10 }` to drop an item lower and
create asymmetry.

`year` is left empty for every project, so no year is shown yet. Fill it in and it appears on the cards and project pages.

The home page composition is set in `workLayout` in the same file. It is a list of rows; each item has a
12-column `col`, a `ratio` and an optional `offset`.

## Links

Set `links.email` and `links.behance` in `site.js`. Until then, "Get in touch" opens Instagram,
the contact list shows "Coming soon", and the Behance link is hidden in the menu and footer.

## Deploy

This is a single-page app with client-side routes, so the host must send all paths to `index.html`.
That is already configured for Vercel (`vercel.json`) and Netlify (`public/_redirects`).

## Optional: Instagram API

`api/instagram.js` is a server-side proxy for the official Instagram API (Instagram API with Instagram
Login). With `INSTAGRAM_ACCESS_TOKEN` set on the server and `VITE_INSTAGRAM_FEED=true`, any media
item can use `instagram: 'https://www.instagram.com/p/…/'` instead of a local file. This is off by
default, so the site makes no request to it. Local files are recommended for the portfolio,
because Instagram's media URLs expire.
