const VERSION = '1';

const APP_PREFIX = 'novix-app-';
const APP_CACHE = APP_PREFIX + VERSION;
const FONT_CACHE = 'novix-fonts-v1';
const LEGACY_CACHES = [];
const PRECACHE = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => (k.startsWith(APP_PREFIX) && k !== APP_CACHE) || LEGACY_CACHES.includes(k))
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.headers.has('range')) return;

  const url = new URL(req.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, FONT_CACHE));
    return;
  }

  if (url.origin !== self.location.origin) return;

  const isCode =
    req.mode === 'navigate' ||
    /\.(?:html|js|css|webmanifest|json)$/i.test(url.pathname) ||
    url.pathname.endsWith('/');

  event.respondWith(isCode ? networkFirst(req) : cacheFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(APP_CACHE);
  try {
    const res = await fetch(req, { cache: 'no-cache' });
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === 'navigate') {
      const home = await cache.match('./index.html');
      if (home) return home;
    }
    throw e;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(APP_CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  const net = fetch(req)
    .then((res) => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; })
    .catch(() => hit);
  return hit || net;
}
