/**
 * GET /api/instagram
 *
 * Server-side proxy for the official Instagram API (Instagram API with
 * Instagram Login → graph.instagram.com). Keeps the access token off the
 * client and caches the response at the edge.
 *
 * Works as a Vercel serverless function and as Vite dev middleware
 * (see vite.config.js). Uses only the plain Node response API.
 *
 * Env: INSTAGRAM_ACCESS_TOKEN — long-lived Instagram User access token
 *      for the @jettashehu professional account.
 */

const GRAPH_URL = 'https://graph.instagram.com/v23.0';
const FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
  'children{media_type,media_url,thumbnail_url}',
].join(',');

function send(res, status, body, cache = 'no-store') {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cache);
  res.end(JSON.stringify(body));
}

export async function fetchInstagramMedia(token, limit = 50) {
  const url = `${GRAPH_URL}/me/media?fields=${encodeURIComponent(FIELDS)}&limit=${limit}&access_token=${encodeURIComponent(token)}`;
  const response = await fetch(url);
  const json = await response.json();
  if (!response.ok || json.error) {
    const message = json?.error?.message || `Instagram API responded with ${response.status}`;
    throw new Error(message);
  }
  return json.data ?? [];
}

export default async function handler(req, res, env = process.env) {
  const token = env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return send(res, 503, { error: 'INSTAGRAM_ACCESS_TOKEN is not configured', data: [] });
  }
  try {
    const data = await fetchInstagramMedia(token);
    // Instagram CDN URLs are signed and expire; an hour of edge cache is safe.
    return send(res, 200, { data }, 'public, s-maxage=3600, stale-while-revalidate=86400');
  } catch (error) {
    return send(res, 502, { error: error.message, data: [] });
  }
}
