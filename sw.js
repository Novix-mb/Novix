const CODE = 'novix-code';
const MEDIA = 'novix-media';
const KEEP = [CODE, MEDIA];
const BUILD = '1794566028';
const ALL_FILES = [
"./assets/css/fonts.css",
"./assets/audio/fireplace.mp3",
"./assets/audio/lofi.mp3",
"./assets/audio/ocean.mp3",
"./assets/audio/rain.mp3",
"./assets/audio/space.mp3",
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
"./assets/js/boot.js",
"./assets/js/gn-host.js",
"./assets/js/gn-stickers.js",
"./assets/js/gn.js",
"./assets/js/novix.js",
"./assets/js/pdf.min.js",
"./assets/js/push-config.js",
"./assets/js/colorpick.js",
"./assets/js/pdf.worker.js",
"./assets/js/vendor/mammoth.browser.min.js",
"./assets/js/vendor/pdf-lib.min.js",
"./index.html",
"./manifest.webmanifest",
"./version.json"
];
const PRECACHE = ['./', './index.html'];
const MEDIA_RE = /\.(?:mp3|ogg|wav|m4a|webp|png|jpe?g|gif|svg|ico|woff2?|ttf|otf|mp4|webm)$/i;
const CODE_RE = /\.(?:html|js|css|webmanifest|json)$/i;
const RECHECK_MS = 12 * 60 * 60 * 1000;
const NET_TIMEOUT = 5000;
/* every code file the app can load (including the ones loaded later, like the Smart Board and the PDF/file editor).
   They are always refreshed together, so no section is left running an older version than the rest of the app. */
/* The offline dictionary (assets/dict/) is a separate, optional download (Settings > Offline copy).
   It is never fetched by the automatic install/refresh below; files the user opened or downloaded stay cached. */
const DICT_RE = /^\.\/assets\/dict\//;
const SITE_FILES = ALL_FILES.filter(f => !DICT_RE.test(f));
const CODE_FILES = Array.from(new Set(SITE_FILES.concat(PRECACHE))).filter(f => f === './' || (f !== './version.json' && CODE_RE.test(f)));

/* ---------- Cache cleanup ----------
   Only touches Cache Storage (the app's own downloaded copy). It never touches the user's files:
   books, notes, tasks, sounds and backgrounds live in IndexedDB / localStorage, which are not read here. */
const SCOPE = self.registration.scope;
const ALLOWED = new Set(ALL_FILES.concat(['./', './index.html']).map(f => new URL(f, SCOPE).pathname));
const stripQuery = u => { const x = new URL(u); x.search = ''; x.hash = ''; return x.href; };

/* deletes every cached file that is no longer part of the current version
   (removed/renamed files, and old copies saved under an old ?v=… address). Returns how many it removed. */
async function pruneCaches() {
  let removed = 0;
  for (const name of KEEP) {
    const cache = await caches.open(name);
    for (const k of await cache.keys()) {
      const u = new URL(k.url);
      if (u.search || !ALLOWED.has(u.pathname)) { if (await cache.delete(k)) removed++; }
    }
  }
  return removed;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const code = await caches.open(CODE);
    const media = await caches.open(MEDIA);
    await Promise.allSettled(SITE_FILES.map(async f => {
      if (f === './version.json') return;
      if (!CODE_RE.test(f) && await media.match(new Request(f, { mode: 'same-origin' }))) return;
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
    await pruneCaches().catch(() => {});
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const d = event.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  else if (d.type === 'PRUNE') {
    const port = event.ports && event.ports[0];
    event.waitUntil(pruneCaches().then(n => { if (port) port.postMessage({ removed: n }); }).catch(() => { if (port) port.postMessage({ removed: 0 }); }));
  }
  else if (d.type === 'CHECK_ALL') {
    const port = event.ports && event.ports[0];
    event.waitUntil(sweepAll().then(changed => {
      if (changed) tellClients();
      if (port) port.postMessage({ changed });
    }).catch(() => { if (port) port.postMessage({ changed: false }); }));
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/version.json')) return;

  if (req.headers.has('range')) {
    event.respondWith(rangeResponse(req));
    return;
  }

  const isCode = req.mode === 'navigate' || CODE_RE.test(url.pathname) || url.pathname.endsWith('/');
  const fresh = req.cache === 'no-cache' || req.cache === 'reload' || req.cache === 'no-store';
  if (isCode) event.respondWith(fresh ? networkFirst(req) : cacheFirst(req, event));
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

/* Checks every code file against the server and refreshes the cache for all of them at once.
   Resolves to true when anything was different. Only one check runs at a time. */
let sweeping = null;
function sweepAll() {
  if (sweeping) return sweeping;
  sweeping = (async () => {
    const cache = await caches.open(CODE);
    const updates = [];
    await Promise.allSettled(CODE_FILES.map(async f => {
      const req = new Request(f, { mode: 'same-origin' });
      const res = await fetch(req, { cache: 'no-cache' });
      if (!res || !res.ok) return;
      const old = await cache.match(req, { ignoreSearch: true });
      let diff = true;
      if (old) { try { diff = (await digest(res)) !== (await digest(old)); } catch (e) { diff = true; } }
      if (diff) updates.push([req, res]);
    }));
    await Promise.all(updates.map(u => cache.put(stripQuery(u[0].url), u[1])));
    await pruneCaches().catch(() => {});
    return updates.length > 0;
  })().finally(() => { sweeping = null; });
  return sweeping;
}

async function cacheFirst(req, event) {
  const cache = await caches.open(CODE);
  let hit = await cache.match(req, { ignoreSearch: true });
  if (!hit && req.mode === 'navigate') hit = await cache.match('./index.html');
  if (!hit) return networkFirst(req);
  const old = hit.clone();
  const task = fetch(req, { cache: 'no-cache' }).then(async res => {
    if (!res || !res.ok) return;
    let changed = false;
    try { changed = (await digest(res)) !== (await digest(old)); } catch (e) { changed = true; }
    await cache.put(stripQuery(req.url), res.clone());
    if (changed) {
      await sweepAll().catch(() => {});
      tellClients();
    }
  }).catch(() => {});
  if (event && event.waitUntil) event.waitUntil(task);
  return hit;
}

async function networkFirst(req) {
  const cache = await caches.open(CODE);
  const hit = await cache.match(req, { ignoreSearch: true });
  const net = fetch(req, { cache: 'no-cache' }).then(res => {
    if (res && res.ok) cache.put(stripQuery(req.url), res.clone());
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
  const hit = await cache.match(stripQuery(req.url));
  if (hit) {
    const t = Number(hit.headers.get('x-nx-time') || 0);
    if (!maxAge || Date.now() - t < maxAge) return hit;
  }
  const net = fetch(req, maxAge ? { cache: 'no-cache' } : undefined).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(stripQuery(req.url), maxAge ? stamp(res.clone()) : res.clone());
    return res;
  }).catch(() => hit);
  return hit || net;
}

async function rangeResponse(req) {
  const cache = await caches.open(MEDIA);
  const hit = await cache.match(stripQuery(req.url));
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

/* Push message from the NOVIX push worker (arrives even when the site is closed).
   If the app is open on screen it shows its own reminders, so nothing is shown twice. */
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = {}; }
  event.waitUntil((async () => {
    if (d.key) {
      const f = (await kvGet('fired')) || {};
      f[d.key] = 1;
      await kvPut('fired', f);
    }
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (wins.some(c => c.visibilityState === 'visible')) return;
    await self.registration.showNotification('NOVIX', {
      body: d.body || 'NOVIX',
      tag: d.tag || 'novix-push',
      icon: NOTIF_ICON,
      badge: NOTIF_BADGE,
      lang: d.lang || 'en',
      dir: d.lang === 'ar' ? 'rtl' : 'ltr',
      vibrate: [200, 100, 200],
      renotify: true,
      requireInteraction: !!d.ri,
      data: { go: d.go || null }
    });
  })());
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
