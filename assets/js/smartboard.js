(function () {
  var wrap = document.getElementById('sbWrap');
  if (!wrap || !window.GN) return;

  var KEY = 'gn:board:v1', PW = 900, PH = 1200, DB = 'novix-smartboard', ST = 'kv';
  var g = null, maxOn = false;

  function lang() { return document.documentElement.lang === 'ar' ? 'ar' : 'en'; }
  function theme() { return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'; }

  var TXT = {
    en: { desc: 'Draw, explain and present on a smart whiteboard.', expand: 'Expand board', load: 'Loading Smart Board…', title: 'Board' },
    ar: { desc: 'ارسم واشرح وقدّم على سبورة ذكية بأدوات تفاعلية.', expand: 'تكبير السبورة', load: 'جارٍ تحميل السبورة…', title: 'السبورة' }
  };
  function applyText() {
    var t = TXT[lang()];
    var d = document.getElementById('sbDesc'), e = document.getElementById('sbMaxLbl'), l = document.getElementById('sbLoadLbl');
    if (d) d.textContent = t.desc;
    if (e) e.textContent = t.expand;
    if (l) l.textContent = t.load;
    if (g) g.setTitle(t.title);
  }

  function openDb() {
    return new Promise(function (res, rej) {
      var q = indexedDB.open(DB, 1);
      q.onupgradeneeded = function () { q.result.createObjectStore(ST); };
      q.onsuccess = function () { res(q.result); };
      q.onerror = function () { rej(q.error); };
    });
  }
  function idb(mode, fn) {
    return openDb().then(function (db) {
      return new Promise(function (res, rej) {
        var t = db.transaction(ST, mode), r = fn(t.objectStore(ST));
        t.oncomplete = function () { res(r && r.result); db.close(); };
        t.onerror = function () { rej(t.error); db.close(); };
      });
    });
  }

  async function loadData() {
    var v = null;
    try { v = await idb('readonly', function (s) { return s.get(KEY); }); } catch (e) {}
    if (!v) { try { v = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {} }
    return v;
  }
  function saveData(items, pages) {
    idb('readwrite', function (s) { return s.put({ items: items, pages: pages }, KEY); }).catch(function () {});
  }

  function paper(i, cv, w, p) {
    var x = cv.getContext('2d'), s = w / PW, h = cv.height;
    x.fillStyle = '#fff'; x.fillRect(0, 0, cv.width, h);
    x.strokeStyle = '#cfd8e6'; x.fillStyle = '#b9c3d4'; x.lineWidth = Math.max(1, s);
    var t = p.paper || 'blank', gp = 40 * s, k;
    if (t === 'lined') {
      for (k = gp * 1.5; k < h; k += gp) { x.beginPath(); x.moveTo(0, k); x.lineTo(cv.width, k); x.stroke(); }
      x.strokeStyle = '#f1a5a5'; x.beginPath(); x.moveTo(70 * s, 0); x.lineTo(70 * s, h); x.stroke();
    } else if (t === 'grid') {
      for (k = gp; k < cv.width; k += gp) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k, h); x.stroke(); }
      for (k = gp; k < h; k += gp) { x.beginPath(); x.moveTo(0, k); x.lineTo(cv.width, k); x.stroke(); }
    } else if (t === 'dots') {
      for (var a = gp; a < cv.width; a += gp) for (var b = gp; b < h; b += gp) { x.beginPath(); x.arc(a, b, 1.6 * s, 0, 7); x.fill(); }
    }
  }

  function setMax(on) {
    on = !!on;
    if (on === maxOn) return;
    maxOn = on;
    wrap.classList.toggle('max', on);
    document.body.classList.toggle('sb-max', on);
    if (g) { g.setIcon(on ? 'shrink' : 'expand'); setTimeout(function () { g.fit(); }, 80); }
  }
  window.__nxToggleBoard = function (f) { setMax(typeof f === 'boolean' ? f : !maxOn); };

  async function load() {
    if (g) return;
    var d = await loadData();
    if (g) return;
    var p = d && d.pages && d.pages.length ? d.pages : [{ w: PW, h: PH, paper: 'blank' }];
    var it = d && d.items && d.items.length === p.length ? d.items : p.map(function () { return []; });
    var box = document.createElement('div');
    box.className = 'sb-gn';
    wrap.insertBefore(box, wrap.firstChild);
    g = window.GN(box, {
      board: 1, lang: lang(), title: TXT[lang()].title, pages: p, items: it,
      base: paper, save: saveData, onBack: function () { setMax(!maxOn); }
    });
    g.setTheme(theme());
    requestAnimationFrame(function () { wrap.classList.add('ready'); });
  }

  document.getElementById('sbMax').addEventListener('click', function () { load().then(function () { setMax(true); }); });
  document.getElementById('sbExit').addEventListener('click', function () { setMax(false); });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && maxOn && !document.querySelector('.gn-ta')) setMax(false);
  });
  addEventListener('resize', function () { if (g) g.fit(); });

  function route() {
    if (location.hash.replace('#/', '') === 'smartboard') {
      load().then(function () { setTimeout(function () { if (g) g.fit(); }, 80); });
    } else if (maxOn) setMax(false);
  }
  addEventListener('hashchange', route);

  new MutationObserver(function () { if (g) g.setTheme(theme()); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  new MutationObserver(applyText)
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  applyText();
  route();
})();
