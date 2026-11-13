const CODE = 'novix-code';
const MEDIA = 'novix-media';
const FONTS = 'novix-fonts';
const KEEP = [CODE, MEDIA, FONTS];
const BUILD = '1794566028-account1';
const ALL_FILES = [
"./assets/css/fonts.css",
"./assets/audio/fireplace.mp3",
"./assets/audio/lofi.mp3",
"./assets/audio/ocean.mp3",
"./assets/audio/rain.mp3",
"./assets/audio/space.mp3",
"./assets/css/auth.css",
"./assets/css/gn.css",
"./assets/css/novix.css",
"./assets/img/bg-decor.svg",
"./assets/img/favicon.ico",
"./assets/img/focus-aurora.webp",
"./assets/img/focus-dawn.webp",
"./assets/img/focus-space.webp",
"./assets/img/focus-sunset.webp",
"./assets/img/logo.webp",
"./assets/img/novix-badge-96.png",
"./assets/img/novix-icon-256.png",
"./assets/img/novix-icon-512.png",
"./assets/img/novix-icon-64.png",
"./assets/img/novix-notif-192.png",
"./assets/img/novix-tab-32.png",
"./assets/img/novix-tab-64.png",
"./assets/img/welcome-bg.webp",
"./assets/js/account.js",
"./assets/js/boot.js",
"./assets/js/gn-host.js",
"./assets/js/gn-stickers.js",
"./assets/js/gn.js",
"./assets/js/novix.js",
"./assets/js/pdf.min.js",
"./assets/js/pdf.worker.js",
"./assets/js/vendor/mammoth.browser.min.js",
"./assets/js/vendor/pdf-lib.min.js",
"./auth.html",
"./index.html",
"./manifest.webmanifest",
"./version.json"
];
const PRECACHE = ['./', './index.html'];
const MEDIA_RE = /\.(?:mp3|ogg|wav|m4a|webp|png|jpe?g|gif|svg|ico|woff2?|ttf|otf|mp4|webm)$/i;
const CODE_RE = /\.(?:html|js|css|webmanifest|json)$/i;
const RECHECK_MS = 12 * 60 * 60 * 1000;
const NET_TIMEOUT = 5000;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const code = await caches.open(CODE);
    const media = await caches.open(MEDIA);
    await Promise.allSettled(ALL_FILES.map(async f => {
      if (f === './version.json') return;
      const res = await fetch(f, { cache: 'reload' });
      if (!res.ok) return;
      await (CODE_RE.test(f) ? code : media).put(new Request(f, { mode: 'same-origin' }), res);
    }));
    await code.addAll(PRECACHE).catch(() => {});
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { // legacy, fonts are local now
    event.respondWith(staleWhileRevalidate(req, FONTS, 0));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/version.json')) return;

  if (req.headers.has('range')) {
    event.respondWith(rangeResponse(req));
    return;
  }

  const isCode = req.mode === 'navigate' || CODE_RE.test(url.pathname) || url.pathname.endsWith('/');
  const fresh = req.cache === 'no-cache' || req.cache === 'reload' || req.cache === 'no-store';
  if (isCode) event.respondWith(fresh ? networkFirst(req) : cacheFirst(req));
  else if (MEDIA_RE.test(url.pathname)) event.respondWith(staleWhileRevalidate(req, MEDIA, RECHECK_MS));
  else event.respondWith(networkFirst(req));
});

function stamp(res) {
  if (!res || res.type === 'opaque' || !res.body) return res;
  const headers = new Headers(res.headers);
  headers.set('x-nx-time', String(Date.now()));
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

async function digest(res) {
  const buf = await res.clone().arrayBuffer();
  const d = await crypto.subtle.digest('SHA-1', buf);
  return Array.from(new Uint8Array(d)).join(',');
}

async function tellClients() {
  const list = await self.clients.matchAll({ includeUncontrolled: true });
  list.forEach(c => c.postMessage({ type: 'NOVIX_UPDATE' }));
}

async function cacheFirst(req) {
  const cache = await caches.open(CODE);
  let hit = await cache.match(req, { ignoreSearch: true });
  if (!hit && req.mode === 'navigate') hit = await cache.match('./index.html');
  if (!hit) return networkFirst(req);
  const old = hit.clone();
  fetch(req, { cache: 'no-cache' }).then(async res => {
    if (!res || !res.ok) return;
    let changed = false;
    try { changed = (await digest(res)) !== (await digest(old)); } catch (e) { changed = true; }
    await cache.put(req, res.clone());
    if (changed) tellClients();
  }).catch(() => {});
  return hit;
}

async function networkFirst(req) {
  const cache = await caches.open(CODE);
  const hit = await cache.match(req, { ignoreSearch: true });
  const net = fetch(req, { cache: 'no-cache' }).then(res => {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  });
  if (!hit) {
    try {
      return await net;
    } catch (e) {
      if (req.mode === 'navigate') {
        const home = await cache.match('./index.html');
        if (home) return home;
      }
      throw e;
    }
  }
  net.catch(() => {});
  const timeout = new Promise((_, reject) => setTimeout(reject, NET_TIMEOUT));
  try {
    return await Promise.race([net, timeout]);
  } catch (e) {
    return hit;
  }
}

async function staleWhileRevalidate(req, name, maxAge) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) {
    const t = Number(hit.headers.get('x-nx-time') || 0);
    if (!maxAge || Date.now() - t < maxAge) return hit;
  }
  const net = fetch(req, maxAge ? { cache: 'no-cache' } : undefined).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, maxAge ? stamp(res.clone()) : res.clone());
    return res;
  }).catch(() => hit);
  return hit || net;
}

async function rangeResponse(req) {
  const cache = await caches.open(MEDIA);
  const hit = await cache.match(req.url);
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!hit || !m) return fetch(req);
  const buf = await hit.arrayBuffer();
  const size = buf.byteLength;
  let start = m[1] === '' ? size - Number(m[2]) : Number(m[1]);
  let end = m[1] === '' || m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  if (!(start >= 0) || start > end || start >= size) {
    return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': hit.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Length': String(end - start + 1),
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Accept-Ranges': 'bytes'
    }
  });
}

/* ---------- Background reminders & notification clicks ----------
   The page stores its upcoming reminders in IndexedDB ("novix-sw" / "kv" / "sched")
   and reads back "fired" on startup, so the worker uses the same keys. */
const NOTIF_ICON = './assets/img/novix-notif-192.png?v=8';
const NOTIF_BADGE = './assets/img/novix-badge-96.png?v=8';

function kvOp(mode, fn) {
  return new Promise((ok, no) => {
    const open = indexedDB.open('novix-sw', 1);
    open.onupgradeneeded = () => open.result.createObjectStore('kv');
    open.onerror = () => no(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction('kv', mode);
      const req = fn(tx.objectStore('kv'));
      tx.oncomplete = () => { db.close(); ok(req && req.result); };
      tx.onerror = tx.onabort = () => { db.close(); no(tx.error); };
    };
  });
}
const kvGet = k => kvOp('readonly', s => s.get(k)).catch(() => undefined);
const kvPut = (k, v) => kvOp('readwrite', s => s.put(v, k)).catch(() => {});

async function showDueReminders() {
  const sched = await kvGet('sched');
  if (!sched || !Array.isArray(sched.items)) return;
  const fired = (await kvGet('fired')) || {};
  const now = Date.now();
  let changed = false;
  for (const it of sched.items) {
    if (!it || fired[it.key]) continue;
    if (now >= it.ts && now < it.ts + (it.win || 0)) {
      const missed = it.msg2 && now - it.ts > 30 * 60000;
      try {
        await self.registration.showNotification('NOVIX', {
          body: missed ? it.msg2 : it.msg,
          tag: it.tag,
          icon: NOTIF_ICON,
          badge: NOTIF_BADGE,
          lang: sched.lang || 'en',
          dir: sched.lang === 'ar' ? 'rtl' : 'ltr',
          vibrate: [200, 100, 200],
          renotify: true,
          requireInteraction: !!it.ri,
          data: { go: it.go || null }
        });
        fired[it.key] = 1;
        changed = true;
      } catch (e) {}
    }
  }
  if (changed) await kvPut('fired', fired);
}

self.addEventListener('periodicsync', event => {
  if (event.tag === 'novix-check') event.waitUntil(showDueReminders());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const go = (event.notification.data && event.notification.data.go) || null;
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of wins) {
      try { await c.focus(); } catch (e) {}
      c.postMessage({ type: 'go', go });
      return;
    }
    const w = await self.clients.openWindow('./');
    if (w) setTimeout(() => { try { w.postMessage({ type: 'go', go }); } catch (e) {} }, 2000);
  })());
});
