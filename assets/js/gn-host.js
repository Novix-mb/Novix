/* NOVIX - Smart Board host: loads the board engine on demand and runs it as
   (1) the Smart Board section and (2) the annotation editor inside the PDF reader. */
(function (W) {
  'use strict';
  var VER = '1', loading = null;
  var isAr = function () { return document.documentElement.lang === 'ar'; };
  var theme = function () { return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'; };

  function addCss(h) {
    return new Promise(function (ok) {
      if (document.querySelector('link[data-gn]')) return ok();
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = h; l.dataset.gn = '1';
      l.onload = l.onerror = function () { ok(); }; document.head.appendChild(l);
    });
  }
  function addJs(src) {
    return new Promise(function (ok, no) {
      var s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = function () { ok(); }; s.onerror = function () { no(new Error('load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function load() {
    return loading || (loading = Promise.all([addCss('assets/css/gn.css?v=' + VER), addJs('assets/js/gn.js?v=' + VER)]).then(function () {
      addJs('assets/js/gn-stickers.js?v=' + VER).catch(function () {});
    }).catch(function (e) { loading = null; throw e; }));
  }

  /* ---- storage (IndexedDB, so big boards and many annotations fit) ---- */
  var dbp = null;
  function db() {
    return dbp || (dbp = new Promise(function (ok, no) {
      var r = indexedDB.open('novix-gn', 1);
      r.onupgradeneeded = function () { r.result.createObjectStore('kv'); };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { dbp = null; no(r.error); };
    }));
  }
  function kvGet(k) {
    return db().then(function (d) {
      return new Promise(function (ok) {
        var q = d.transaction('kv').objectStore('kv').get(k);
        q.onsuccess = function () { ok(q.result == null ? null : q.result); };
        q.onerror = function () { ok(null); };
      });
    }).catch(function () { return null; });
  }
  function kvSet(k, v) {
    return db().then(function (d) {
      return new Promise(function (ok) {
        var t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k);
        t.oncomplete = function () { ok(true); }; t.onerror = t.onabort = function () { ok(false); };
      });
    }).catch(function () { return false; });
  }

  /* ---- board paper renderer ---- */
const BG={},bgImg=s=>BG[s]||(BG[s]=new Promise((res,rej)=>{const m=new Image();m.onload=()=>res(m);m.onerror=rej;m.src=s}));
function paper(i,cv,w,p,fl){var x=cv.getContext('2d'),s=w/p.w,h=cv.height,W=cv.width,bd=function(){GN.drawBorder(x,W,h,p.bd,s)},bc=p.bgc||'#ffffff',lm=/^#[0-9a-f]{6}$/i.test(bc)?(parseInt(bc.substr(1,2),16)*.299+parseInt(bc.substr(3,2),16)*.587+parseInt(bc.substr(5,2),16)*.114)/255:1;x.fillStyle=bc;x.fillRect(0,0,W,h);if(p.paper==='custom'&&p.bg)return bgImg(p.bg).then(function(m){x.drawImage(m,0,0,W,h);bd()});
 x.strokeStyle=lm<.45?'rgba(255,255,255,.18)':'#cfd8e6';x.fillStyle=lm<.45?'rgba(255,255,255,.4)':'#b9c3d4';x.lineWidth=Math.max(1,s);var t=p.paper||'blank',g=40*s,k;
 if(t==='lined'){for(k=g*1.5;k<h;k+=g){x.beginPath();x.moveTo(0,k);x.lineTo(W,k);x.stroke()}}
 else if(t==='grid'){for(k=g;k<W;k+=g){x.beginPath();x.moveTo(k,0);x.lineTo(k,h);x.stroke()}for(k=g;k<h;k+=g){x.beginPath();x.moveTo(0,k);x.lineTo(W,k);x.stroke()}}
 else if(t==='dots'){for(var a=g;a<W;a+=g)for(var b=g;b<h;b+=g){x.beginPath();x.arc(a,b,1.6*s,0,7);x.fill()}}
 bd()}


  /* ---- Smart Board section ---- */
  var board = null, boardHost = null, boardFull = false;
  function setFull(on) {
    boardFull = !!on;
    if (!boardHost) return;
    boardHost.classList.toggle('gn-full', boardFull);
    document.body.classList.toggle('gn-full-open', boardFull);
    if (board) { board.g.setIcon(boardFull ? 'back' : 'expand'); setTimeout(function () { board.g.fit(); }, 60); }
  }
  async function mountBoard(host) {
    boardHost = host;
    if (board && board.root.isConnected) { board.g.fit(); return; }
    await load();
    var d = await kvGet('board');
    if (!d) {
      try { d = JSON.parse(localStorage.getItem('gn:board:v1') || 'null'); } catch (e) { d = null; }
    }
    var PW = 900, PH = 1200;
    var p = d && d.pages && d.pages.length ? d.pages : [{ w: PW, h: PH, paper: 'blank' }];
    var it = d && d.items && d.items.length === p.length ? d.items : p.map(function () { return []; });
    host.replaceChildren();
    var root = document.createElement('div'); host.appendChild(root);
    var g = W.GN(root, {
      board: 1, lang: isAr() ? 'ar' : 'en', title: isAr() ? 'السبورة الذكية' : 'Smart Board',
      pages: p, items: it, base: paper, maxPx: 24e6,
      save: function (items, pages) { kvSet('board', { items: items, pages: pages }); },
      onBack: function () { setFull(!boardFull); }
    });
    g.setTheme(theme());
    board = { g: g, root: root };
    setTimeout(function () { g.fit(); }, 60);
  }
  function fitBoard() { if (board) setTimeout(function () { board.g.fit(); }, 50); }

  /* ---- PDF editor ---- */
  var pdf = null;
  var cancels = new WeakMap();
  function pdfBaseFor(doc) {
    return function (i, cv, w, p) {
      var prev = cancels.get(cv); if (prev) { try { prev.cancel(); } catch (e) {} }
      return doc.getPage(p.pdf).then(function (pg) {
        var v1 = pg.getViewport({ scale: 1 });
        var vp = pg.getViewport({ scale: cv.width / v1.width });
        var x = cv.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, cv.width, cv.height);
        var t = pg.render({ canvasContext: x, viewport: vp }); cancels.set(cv, t);
        return t.promise;
      });
    };
  }
  async function pageSizes(doc, onProg) {
    var n = doc.numPages, out = new Array(n), CH = 24;
    for (var s0 = 0; s0 < n; s0 += CH) {
      var js = [];
      for (var k = s0; k < Math.min(n, s0 + CH); k++) js.push(doc.getPage(k + 1).then((function (kk) { return function (pg) {
        var v = pg.getViewport({ scale: 1 }); out[kk] = { w: v.width, h: v.height };
      }; })(k)));
      await Promise.all(js);
      if (onProg) onProg(Math.min(n, s0 + CH) / n);
    }
    return out;
  }
  async function mountPdf(host, o) {
    await load();
    if (pdf) closePdf();
    var doc = o.doc, sizes = await pageSizes(doc, o.onProgress);
    var saved = await kvGet('pdf:' + o.fileId), n = sizes.length;
    var items = [];
    for (var i = 0; i < n; i++) items.push(saved && saved.items && Array.isArray(saved.items[i]) ? saved.items[i] : []);
    var pages = sizes.map(function (s, i) { return { w: 900, h: Math.round(900 * s.h / s.w), pw: s.w, ph: s.h, paper: 'blank', pdf: i + 1 }; });
    host.replaceChildren();
    var root = document.createElement('div'); host.appendChild(root);
    var key = 'pdf:' + o.fileId;
    var g = W.GN(root, {
      lang: isAr() ? 'ar' : 'en', title: o.title || '', pages: pages, items: items, fixed: 1, maxPx: 16e6,
      base: pdfBaseFor(doc), exportName: (o.title || 'document').replace(/\.pdf$/i, '').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 60),
      save: function (it) { kvSet(key, { items: it, n: n }); },
      onBack: function () { o.onBack && o.onBack(); }
    });
    g.setTheme(theme());
    pdf = { g: g, root: root, host: host, o: o };
    setTimeout(function () {
      g.fit();
      if (o.startPage > 1) g.goPage(o.startPage - 1);
    }, 60);
    return g;
  }
  function closePdf() {
    if (!pdf) return 0;
    var page = 1;
    try { page = pdf.g.getPage() + 1; pdf.g.flush(); pdf.g.destroy(); } catch (e) {}
    pdf.root.remove(); pdf = null;
    return page;
  }

  /* ---- keep theme / language / size in sync ---- */
  new MutationObserver(function () {
    if (board) board.g.setTheme(theme());
    if (pdf) pdf.g.setTheme(theme());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('resize', function () { if (board && board.root.offsetParent) board.g.fit(); if (pdf) pdf.g.fit(); });
  addEventListener('novix:lang', function () {
    if (board) {
      board.g.flush(); board.g.destroy(); board.root.remove(); board = null;
      if (boardHost && boardHost.offsetParent) mountBoard(boardHost);
    }
    if (pdf) {
      var o = pdf.o, host = pdf.host, pg = pdf.g.getPage() + 1;
      pdf.g.flush(); pdf.g.destroy(); pdf.root.remove(); pdf = null;
      o.startPage = pg; mountPdf(host, o);
    }
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && boardFull && !/^(INPUT|TEXTAREA)$/.test((e.target || {}).tagName || '')) setFull(false); });
  addEventListener('pagehide', function () { if (board) board.g.flush(); if (pdf) pdf.g.flush(); });

  W.NXGN = {
    load: load, mountBoard: mountBoard, fitBoard: fitBoard, mountPdf: mountPdf, closePdf: closePdf,
    active: function () { return !!pdf; }
  };
})(window);
