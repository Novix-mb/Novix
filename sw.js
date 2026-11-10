const CACHE = 'novix-v7';
const CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'assets/img/icon-64x64.png', 'assets/img/icon-256x256.png', 'assets/img/icon-512x512.png',
  'assets/img/logo.webp', 'assets/img/welcome-bg.webp', 'assets/img/bg-decor.svg',
  'assets/img/focus-space.webp', 'assets/img/focus-dawn.webp', 'assets/img/focus-sunset.webp', 'assets/img/focus-aurora.webp',
  'assets/css/board-reader-overhaul.css', 'assets/css/coming-soon.css', 'assets/css/credit-sign.css',
  'assets/css/dark-theme.css', 'assets/css/focus-bg.css', 'assets/css/focus-ui.css', 'assets/css/focus.css',
  'assets/css/home-v2.css', 'assets/css/main.css', 'assets/css/notes-tt.css', 'assets/css/nx-add.css',
  'assets/css/opening.css', 'assets/css/reader-v2.css', 'assets/css/v3.css', 'assets/css/v4.css',
  'assets/css/v5.css',
  'assets/js/app.js', 'assets/js/focus-bg.js', 'assets/js/keep-awake.js', 'assets/js/opening-controller.js',
  'assets/js/pdf.min.js', 'assets/js/pdf.worker.js', 'assets/js/pdfjs-worker-init.js',
  'assets/js/preload.js', 'assets/js/reader-v2.js', 'assets/js/side-drag.js', 'assets/js/theme-color.js',
  'assets/js/theme-init.js'
];
const ICON = 'assets/img/icon-256x256.png', BADGE = 'assets/img/icon-64x64.png';

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(CORE.map(async f => { try { await c.add(new Request(f, { cache: 'reload' })); } catch (x) {} }));
  })());
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function navigate(r) {
  const c = await caches.open(CACHE);
  const cached = (await c.match(r, { ignoreSearch: true })) || (await c.match('./')) || (await c.match('index.html'));
  const net = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()).catch(() => {}); return res; });
  if (!cached) return net;
  return Promise.race([net.catch(() => cached), new Promise(ok => setTimeout(() => ok(cached), 4000))]);
}
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || !/^https?:/.test(r.url)) return;
  if (new URL(r.url).origin !== location.origin) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)).catch(() => {}); }
      return res;
    })));
    return;
  }
  if (/\/assets\/audio\//.test(new URL(r.url).pathname) || r.headers.has('range')) return;
  if (r.mode === 'navigate') { e.respondWith(navigate(r)); return; }
  e.respondWith((async () => {
    const c = await caches.open(CACHE), m = await c.match(r);
    const net = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()).catch(() => {}); return res; }).catch(() => null);
    e.waitUntil(net);
    return m || (await net) || Response.error();
  })());
});

const db = () => new Promise((ok, no) => {
  const q = indexedDB.open('novix-sw', 1);
  q.onupgradeneeded = () => q.result.createObjectStore('kv');
  q.onsuccess = () => ok(q.result);
  q.onerror = () => no(q.error);
});
const get = async k => { try { const d = await db(); return await new Promise(ok => { const q = d.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => ok(q.result); q.onerror = () => ok(); }); } catch (e) {} };
const put = async (k, v) => { try { const d = await db(); return await new Promise(ok => { const t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = ok; t.onerror = ok; }); } catch (e) {} };

const opts = (it, sc, body, tag) => ({
  body, tag: tag || it.tag, vibrate: [200, 100, 200], renotify: true, requireInteraction: !!it.ri,
  icon: ICON, badge: BADGE, lang: sc.lang, dir: sc.lang === 'ar' ? 'rtl' : 'ltr', data: { go: it.go }
});
const HAS_TRIGGER = typeof TimestampTrigger !== 'undefined';

async function settleArmed(fired, now) {
  const armed = (await get('armed')) || [];
  let ch = 0; const left = [];
  for (const a of armed) {
    if (a.ts <= now) { if (!fired[a.key]) { fired[a.key] = now; ch = 1; } } else left.push(a);
  }
  if (armed.length !== left.length) { await put('armed', left); ch = 1; }
  return ch;
}

async function check(force) {
  const sc = await get('sched');
  if (!sc || !sc.items) return 0;
  if (!force) {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (wins.some(c => c.visibilityState === 'visible')) return 0;
  }
  const fired = (await get('fired')) || {}, now = Date.now();
  let ch = await settleArmed(fired, now), n = 0;
  for (const it of sc.items) {
    if (fired[it.key] || it.ts > now || now - it.ts > it.win) continue;
    fired[it.key] = now; ch = 1;
    try {
      const late = it.msg2 && now - it.ts > 30 * 6e4;
      await self.registration.showNotification('NOVIX', opts(it, sc, late ? it.msg2 : it.msg));
      n++;
    } catch (e) { delete fired[it.key]; }
  }
  for (const k in fired) if (now - fired[k] > 14 * 864e5) { delete fired[k]; ch = 1; }
  if (ch) await put('fired', fired);
  return n;
}

async function clearPending() {
  try {
    const L = await self.registration.getNotifications({ includeTriggered: true });
    L.forEach(n => { if (n.tag && n.tag.startsWith('trg:') && n.showTrigger && n.showTrigger.timestamp > Date.now()) n.close(); });
  } catch (e) {}
}
async function arm() {
  if (!HAS_TRIGGER) return 0;
  const sc = await get('sched');
  if (!sc || !sc.items) return 0;
  await clearPending();
  const fired = (await get('fired')) || {}, now = Date.now(), armed = [];
  const list = sc.items.filter(it => !fired[it.key] && it.ts > now).sort((a, b) => a.ts - b.ts).slice(0, 50);
  for (const it of list) {
    try {
      await self.registration.showNotification('NOVIX', Object.assign(opts(it, sc, it.msg, 'trg:' + it.key), { showTrigger: new TimestampTrigger(it.ts) }));
      armed.push({ key: it.key, ts: it.ts });
    } catch (e) { break; }
  }
  await put('armed', armed);
  return armed.length;
}
async function disarm() {
  await clearPending();
  const fired = (await get('fired')) || {};
  if (await settleArmed(fired, Date.now())) await put('fired', fired);
  await put('armed', []);
  return fired;
}

self.addEventListener('periodicsync', e => { if (e.tag === 'novix-check') e.waitUntil(check()); });
self.addEventListener('sync', e => { if (e.tag === 'novix-check') e.waitUntil(check()); });
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { try { d = { body: e.data.text() }; } catch (y) {} }
  e.waitUntil((async () => {
    if (d.check && await check(true)) return;
    await self.registration.showNotification(d.title || 'NOVIX', {
      body: d.body || '', tag: d.tag || 'novix-push', icon: ICON, badge: BADGE, vibrate: [200, 100, 200],
      renotify: true, data: { go: d.go || null }
    });
  })());
});

self.addEventListener('message', e => {
  const m = e.data || {}, reply = v => { try { e.ports[0] && e.ports[0].postMessage(v); } catch (x) {} };
  if (m.type === 'check') { e.waitUntil(check()); }
  else if (m.type === 'sched') {
    e.waitUntil((async () => { await put('sched', m.sched); if (m.hidden) await arm(); reply({ ok: 1, trig: HAS_TRIGGER }); })());
  }
  else if (m.type === 'arm') { e.waitUntil((async () => reply({ n: await arm(), trig: HAS_TRIGGER }))()); }
  else if (m.type === 'disarm') { e.waitUntil((async () => reply({ fired: await disarm() }))()); }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const go = (e.notification.data || {}).go || null;
  e.waitUntil((async () => {
    const L = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const c = L.find(x => x.focused) || L.find(x => x.visibilityState === 'visible') || L[0];
    if (c) { c.postMessage({ type: 'go', go }); try { await c.focus(); } catch (x) {} return; }
    await put('pendingGo', go || { k: null });
    await self.clients.openWindow(go && go.tasks ? './#/tasks' : './#/timetable');
  })());
});
