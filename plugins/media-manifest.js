import fs from 'node:fs';
import path from 'node:path';

/**
 * Exposes `virtual:media-manifest` — the list of files that actually exist in
 * public/images and public/videos. Components use it to:
 *   - render clearly named placeholders instead of requesting missing files
 *     (no 404s in the console while photography is still being added), and
 *   - pick up responsive variants (photo-640.webp, photo-1280.webp …) automatically.
 * In dev the manifest refreshes when files are added or removed.
 */
const ID = 'virtual:media-manifest';
const RESOLVED_ID = `\0${ID}`;
const FOLDERS = ['images', 'videos'];
const IGNORE = /(^|\/)(\.|README|Thumbs\.db)/;

function walk(dir, base, out) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else {
      const rel = `/${path.relative(base, full).split(path.sep).join('/')}`;
      if (!IGNORE.test(rel)) out.push(rel);
    }
  }
  return out;
}

export default function mediaManifest() {
  let publicDir = '';

  return {
    name: 'media-manifest',
    configResolved(config) {
      publicDir = config.publicDir;
    },
    resolveId(id) {
      return id === ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const files = FOLDERS.flatMap((folder) => walk(path.join(publicDir, folder), publicDir, []));
      return `export default ${JSON.stringify(files.sort())};`;
    },
    configureServer(server) {
      const refresh = (file) => {
        if (!file.startsWith(publicDir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(publicDir);
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
    },
  };
}
