/* NOVIX - Offline Dictionary (English <-> Arabic), v2.
   Data lives in assets/dict/: index.json (30k word list), en/<letter>.json (full entries, loaded on demand)
   and ar-en.json (Arabic -> English). The service worker caches all of it, so it works with no internet. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isAr = function () { return document.documentElement.lang === 'ar'; };
  var L = function (en, ar) { return isAr() ? ar : en; };
  var V = '?v=2', KEY = 'novix.dict.v1';
  var INDEX_URL = 'assets/dict/index.json' + V, AR_URL = 'assets/dict/ar-en.json' + V, SHARD = function (c) { return 'assets/dict/en/' + c + '.json' + V; };

  /* ---------- state ---------- */
  var st = { dir: 'en-ar', mode: 'word', list: 'hist', hist: [], saved: [], cur: null, q: '' };
  var IX = [], EN = {}, IRR = {}, SH = {}, ARX = null, ARK = null, arP = null;
  var root = null, inited = false, sugSel = -1, sugItems = [], timer = 0, tok = 0;

  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o) { st.hist = o.hist || []; st.saved = o.saved || []; st.dir = o.dir === 'ar-en' ? 'ar-en' : 'en-ar'; } } catch (e) {}
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify({ hist: st.hist.slice(0, 40), saved: st.saved, dir: st.dir })); } catch (e) {} }

  /* ---------- text helpers ---------- */
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function normAr(s) { return String(s).replace(/[ً-ٰٟـ]/g, '').replace(/[إأآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim(); }
  function arKey(s) { var k = normAr(String(s).replace(/\(.*?\)/g, ' ')); return k.indexOf('ال') === 0 && k.length > 4 ? k.slice(2) : k; }
  var hasAr = function (s) { return /[؀-ۿ]/.test(s); };
  var fmt = function (n) { return n.toLocaleString(isAr() ? 'ar-EG' : 'en-US'); };

  /* ---------- data layer ---------- */
  function getJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  function loadIndex() {
    return getJSON(INDEX_URL).then(function (d) {
      IX = d.w; IRR = d.irr || {}; EN = {};
      IX.forEach(function (x, i) { EN[x[0]] = i; });
    });
  }
  function shard(c) {
    if (!SH[c]) SH[c] = getJSON(SHARD(c)).then(function (d) { var m = {}; d.e.forEach(function (e) { m[e.w] = e; }); return m; }).catch(function (err) { delete SH[c]; throw err; });
    return SH[c];
  }
  var getEntry = function (w) { return shard(w[0]).then(function (m) { return m[w] || null; }); };
  function loadAr() {
    if (ARX) return Promise.resolve();
    if (!arP) arP = getJSON(AR_URL).then(function (d) { ARX = d; ARK = Object.keys(d).sort(); }).catch(function (e) { arP = null; throw e; });
    return arP;
  }

  function stems(w) {
    var o = [w], n = w.length;
    if (/ies$/.test(w)) o.push(w.slice(0, -3) + 'y');
    if (/es$/.test(w)) o.push(w.slice(0, -2));
    if (/s$/.test(w)) o.push(w.slice(0, -1));
    if (/ied$/.test(w)) o.push(w.slice(0, -3) + 'y');
    if (/ed$/.test(w)) { o.push(w.slice(0, -2)); o.push(w.slice(0, -1)); if (n > 4 && w[n - 3] === w[n - 4]) o.push(w.slice(0, -3)); }
    if (/ing$/.test(w)) { o.push(w.slice(0, -3)); o.push(w.slice(0, -3) + 'e'); if (n > 5 && w[n - 4] === w[n - 5]) o.push(w.slice(0, -4)); }
    if (/ly$/.test(w)) o.push(w.slice(0, -2));
    if (/er$/.test(w)) { o.push(w.slice(0, -2)); o.push(w.slice(0, -1)); }
    if (/est$/.test(w)) { o.push(w.slice(0, -3)); o.push(w.slice(0, -2)); }
    return o;
  }
  /* returns the dictionary word that matches what the user typed ('' when unknown) */
  function findEn(raw) {
    var w = String(raw).toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, '');
    if (!w) return '';
    if (w in EN) return w;
    if (IRR[w]) return IRR[w];
    var c = stems(w);
    for (var i = 1; i < c.length; i++) { if (c[i].length > 2 && c[i] in EN) return c[i]; }
    return '';
  }
  function findAr(raw) {
    var k = arKey(raw), r = ARX[k] || ARX['ال' + k] || ARX[normAr(raw)], out = [];
    if (r) out.push(r);
    else if (k.length > 2) { for (var i = 0; i < ARK.length && out.length < 8; i++) { if (ARK[i].indexOf(k) === 0) out.push(ARX[ARK[i]]); } }
    var ws = [];
    out.forEach(function (r) { r[1].split('|').forEach(function (w) { if (w && ws.indexOf(w) < 0) ws.push(w); }); });
    return ws;
  }
  function suggest(q) {
    var out = [];
    if (hasAr(q)) {
      if (!ARK) return out;
      var k = arKey(q);
      for (var i = 0; i < ARK.length && out.length < 8; i++) { if (ARK[i].indexOf(k) === 0) out.push({ ar: true, t: ARX[ARK[i]][0], w: ARX[ARK[i]][1].split('|')[0] }); }
      return out;
    }
    var w = q.toLowerCase().trim(); if (!w) return out;
    var pre = [], con = [];
    for (var j = 0; j < IX.length; j++) {
      var x = IX[j][0];
      if (x.indexOf(w) === 0) pre.push(IX[j]); else if (w.length > 2 && con.length < 12 && x.indexOf(w) > 0) con.push(IX[j]);
    }
    pre.sort(function (a, b) { return a[3] - b[3] || a[0].length - b[0].length; });
    return pre.slice(0, 8).concat(con).slice(0, 8).map(function (x) { return { t: x[0], pos: x[1], m: x[2] }; });
  }

  /* ---------- UI atoms ---------- */
  var ic = function (p, cls) { return '<svg class="i ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; };
  var P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    speak: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
    list: '<path d="M4 6h16M4 12h10M4 18h13"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6h.01"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    book: '<path d="M2 5c3-1 7-1 10 2 3-3 7-3 10-2v14c-3-1-7-1-10 2-3-3-7-3-10-2z"/><path d="M12 7v14"/>',
    down: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>'
  };
  var POS = { noun: ['noun', 'اسم'], verb: ['verb', 'فعل'], adj: ['adjective', 'صفة'], adv: ['adverb', 'ظرف'], prep: ['preposition', 'حرف جر'], pron: ['pronoun', 'ضمير'], conj: ['conjunction', 'حرف عطف'], det: ['determiner', 'أداة'] };
  var posName = function (p) { return POS[p] ? L(POS[p][0], POS[p][1]) : (p || ''); };
  var LVL = { 1: ['Core', 'أساسي'], 2: ['Common', 'شائع'], 3: ['Advanced', 'متقدم'] };
  function toast(m) { var t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 1800); }

  /* ---------- shell ---------- */
  function shell() {
    root.innerHTML =
      '<div class="dc-main">' +
        '<div class="card dc-search">' +
          '<div class="dc-tabs" role="tablist" id="dcTabs">' +
            '<button class="dc-tab" role="tab" data-m="word">' + ic(P.search) + '<span>' + L('Word', 'كلمة') + '</span></button>' +
            '<button class="dc-tab" role="tab" data-m="sent">' + ic(P.list) + '<span>' + L('Sentence', 'جملة') + '</span></button>' +
            '<button class="dc-tab" role="tab" data-m="gram">' + ic(P.check) + '<span>' + L('Grammar', 'القواعد') + '</span><span class="dc-soon">' + L('Soon', 'قريبًا') + '</span></button>' +
          '</div>' +
          '<div id="dcInput"></div>' +
          '<div class="dc-quick" id="dcQuick"></div>' +
        '</div>' +
        '<div id="dcOut"></div>' +
      '</div>' +
      '<aside class="dc-side">' +
        '<button class="dc-wotd" id="dcWotd" type="button"></button>' +
        '<div class="dc-stat" id="dcStat"></div>' +
        '<div class="dc-off" id="dcOff"></div>' +
        '<div class="card dc-lists">' +
          '<div class="dc-lt" id="dcLt"><button data-l="hist">' + L('Recent', 'الأخيرة') + '</button><button data-l="saved">' + L('Saved', 'المحفوظة') + '</button></div>' +
          '<div class="dc-ls" id="dcLs"></div>' +
        '</div>' +
      '<p class="dc-credit">' + L('Data: Princeton WordNet, Arabic WordNet (CC BY-SA 3.0), FreeDict eng-ara (GPL), CMU Pronouncing Dictionary.', 'المصادر: Princeton WordNet وArabic WordNet (CC BY-SA 3.0) وFreeDict (GPL) وقاموس CMU للنطق.') + '</p></aside>';
    renderTabs(); renderInput(); renderSide(); renderOut(); offlineStatus(0);
  }
  function renderTabs() { $$('#dcTabs .dc-tab').forEach(function (b) { b.classList.toggle('on', b.dataset.m === st.mode); b.setAttribute('aria-selected', b.dataset.m === st.mode); }); }

  function renderInput() {
    var box = $('#dcInput'), ar = st.dir === 'ar-en';
    if (st.mode === 'gram') { box.innerHTML = ''; $('#dcQuick').innerHTML = ''; return; }
    var dirHtml = '<div class="dc-dir"><span class="dc-lang">' + (ar ? 'العربية' : 'English') + '</span>' +
      '<button class="dc-swap" id="dcSwap" type="button" aria-label="' + L('Swap languages', 'تبديل اللغتين') + '">' + ic(P.swap) + '</button>' +
      '<span class="dc-lang">' + (ar ? 'English' : 'العربية') + '</span></div>';
    if (st.mode === 'word') {
      box.innerHTML = '<div class="dc-row">' + dirHtml + '<div class="dc-field"><span class="dc-ico">' + ic(P.search) + '</span>' +
        '<input id="dcQ" type="text" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false" dir="' + (ar ? 'rtl' : 'ltr') + '" placeholder="' + (ar ? L('Type an Arabic word…', 'اكتب كلمة عربية…') : L('Type an English word…', 'اكتب كلمة إنجليزية…')) + '" value="' + esc(st.q) + '" aria-label="' + L('Search', 'بحث') + '">' +
        '<button class="dc-clear' + (st.q ? ' on' : '') + '" id="dcClr" type="button" aria-label="' + L('Clear', 'مسح') + '">' + ic(P.x) + '</button>' +
        '<div class="dc-sug" id="dcSug" hidden role="listbox"></div></div></div>';
    } else {
      box.innerHTML = '<div class="dc-row">' + dirHtml + '</div><div class="dc-sent">' +
        '<textarea class="dc-ta" id="dcTa" dir="' + (ar ? 'rtl' : 'ltr') + '" placeholder="' + (ar ? L('Write an Arabic sentence…', 'اكتب جملة عربية…') : L('Write an English sentence…', 'اكتب جملة إنجليزية…')) + '" aria-label="' + L('Sentence', 'جملة') + '"></textarea>' +
        '<div class="dc-actions"><button class="dc-go" id="dcGo" type="button">' + ic(P.spark) + '<span>' + L('Translate', 'ترجم') + '</span></button><button class="dc-ghost" id="dcCl" type="button">' + L('Clear', 'مسح') + '</button></div></div>';
    }
    var q = $('#dcQuick');
    if (st.mode === 'word') {
      var ex = ar ? ['سعيد', 'كتاب', 'يتعلم', 'اقتصاد', 'حكومة'] : ['happy', 'environment', 'achieve', 'economy', 'depend'];
      q.innerHTML = '<span>' + L('Try', 'جرّب') + '</span>' + ex.map(function (w) { return '<button type="button" class="dc-pill" data-w="' + esc(w) + '">' + esc(w) + '</button>'; }).join('');
    } else q.innerHTML = '';
  }

  /* ---------- results ---------- */
  function enHighlight(sentence, word) {
    var re = new RegExp('\\b(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'i');
    return esc(sentence).replace(re, '<mark>$1</mark>');
  }
  function chips(list, kind) {
    if (!list || !list.length) return '<p class="dc-none">' + L('None listed.', 'لا يوجد.') + '</p>';
    return '<div class="dc-chips">' + list.map(function (w) { return '<button type="button" class="dc-pill ' + kind + '" data-w="' + esc(w) + '" data-en="1">' + esc(w) + '</button>'; }).join('') + '</div>';
  }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
  function sensesHtml(e) {
    var groups = [], map = {};
    (e.s || []).forEach(function (s) { if (!map[s[0]]) { map[s[0]] = []; groups.push(s[0]); } map[s[0]].push(s); });
    if (!groups.length) return '';
    var n = 0;
    return '<div class="dc-sec"><h3>' + L('Senses', 'المعاني بالتفصيل') + '</h3>' + groups.map(function (g) {
      return '<div class="dc-posg"><div class="dc-posh"><span class="dc-pos">' + esc(posName(g)) + '</span></div>' + map[g].map(function (s) {
        n++;
        var h = '<div class="dc-sn" style="--n:' + Math.min(n, 8) + '"><span class="dc-sno">' + n + '</span><div class="dc-snb"><p class="dc-def" dir="ltr">' + esc(s[1]) + '</p>';
        if (s[2] && s[2].length) h += '<div class="dc-sar">' + s[2].map(function (a) { return '<span>' + esc(a) + '</span>'; }).join('') + '</div>';
        if (s[3] && s[3].length) h += '<p class="dc-sex" dir="ltr">“' + enHighlight(s[3][0], e.w) + '”</p>';
        var mini = [];
        if (s[4] && s[4].length) mini.push('<span class="lab">' + L('Syn', 'مرادف') + '</span>' + s[4].map(function (w) { return '<button type="button" class="dc-mini" data-w="' + esc(w) + '" data-en="1">' + esc(w) + '</button>'; }).join(''));
        if (s[5] && s[5].length) mini.push('<span class="lab ant">' + L('Ant', 'ضد') + '</span>' + s[5].map(function (w) { return '<button type="button" class="dc-mini ant" data-w="' + esc(w) + '" data-en="1">' + esc(w) + '</button>'; }).join(''));
        if (mini.length) h += '<div class="dc-minis" dir="ltr">' + mini.join('') + '</div>';
        return h + '</div></div>';
      }).join('') + '</div>';
    }).join('') + '</div>';
  }
  function entryHtml(e) {
    var saved = st.saved.indexOf(e.w) >= 0;
    var poss = e.p ? [e.p] : uniq((e.s || []).map(function (s) { return s[0]; }));
    var h = '<div class="card dc-res"><div class="dc-head"><div><h2 class="dc-word" dir="ltr">' + esc(e.w) + '</h2>' +
      '<div class="dc-sub">' + poss.map(function (p) { return '<span class="dc-pos">' + esc(posName(p)) + '</span>'; }).join('') +
      (e.i ? '<span class="dc-ipa">' + esc(e.i) + '</span>' : '') + (e.l ? '<span class="dc-lvl l' + e.l + '">' + L(LVL[e.l][0], LVL[e.l][1]) + '</span>' : '') + '</div></div>' +
      '<div class="dc-tools">' +
        ('speechSynthesis' in window ? '<button class="dc-ib" id="dcSay" type="button" aria-label="' + L('Pronounce', 'نطق') + '">' + ic(P.speak) + '</button>' : '') +
        '<button class="dc-ib' + (saved ? ' on' : '') + '" id="dcSave" type="button" aria-label="' + L('Save', 'حفظ') + '" aria-pressed="' + saved + '">' + ic(P.star) + '</button>' +
        '<button class="dc-ib" id="dcCopy" type="button" aria-label="' + L('Copy', 'نسخ') + '">' + ic(P.copy) + '</button>' +
      '</div></div><div class="dc-body">';
    h += '<div class="dc-sec"><h3>' + L('Meaning in Arabic', 'المعنى بالعربية') + '</h3><div class="dc-means">' +
      e.ar.map(function (m, k) { return '<span class="dc-mean" style="--n:' + k + '"><i>' + (k + 1) + '</i>' + esc(m) + '</span>'; }).join('') + '</div></div>';
    if (e.ex && e.ex.length) h += '<div class="dc-sec"><h3>' + L('Examples', 'أمثلة') + '</h3><div class="dc-ex">' +
      e.ex.map(function (x, k) { return '<div class="dc-ex-i" style="--n:' + k + '"><p class="dc-ex-en">' + enHighlight(x[0], e.w) + '</p><p class="dc-ex-ar">' + esc(x[1]) + '</p></div>'; }).join('') + '</div></div>';
    h += sensesHtml(e);
    var sy = e.syn && e.syn.length ? e.syn : uniq([].concat.apply([], (e.s || []).map(function (s) { return s[4] || []; }))).slice(0, 8);
    var an = e.ant && e.ant.length ? e.ant : uniq([].concat.apply([], (e.s || []).map(function (s) { return s[5] || []; }))).slice(0, 6);
    h += '<div class="dc-two"><div class="dc-sec"><h3>' + L('Synonyms', 'المرادفات') + '</h3>' + chips(sy, 'syn') + '</div>' +
      '<div class="dc-sec"><h3>' + L('Antonyms', 'الأضداد') + '</h3>' + chips(an, 'ant') + '</div></div>';
    if (e.prep) h += '<div class="dc-sec"><h3>' + L('Common prepositions', 'حروف الجر الشائعة') + '</h3><div class="dc-prep">' + e.prep.split('/').map(function (p) { return '<span>' + esc(p.trim()) + '</span>'; }).join('') + '</div></div>';
    if (e.forms) {
      var labs = e.p === 'verb' ? ['Base', 'Past', 'Past part.', 'Ing'] : ['Singular', 'Plural'];
      var labsAr = e.p === 'verb' ? ['المصدر', 'الماضي', 'التصريف الثالث', 'المضارع المستمر'] : ['المفرد', 'الجمع'];
      var parts = e.forms.split('·').map(function (x) { return x.trim(); });
      if (parts.length > 1 && parts[0].indexOf('(') < 0) h += '<div class="dc-sec"><h3>' + (e.p === 'verb' ? L('Verb forms', 'تصريف الفعل') : L('Forms', 'الصيغ')) + '</h3><div class="dc-forms">' +
        parts.map(function (p, k) { return '<div><small>' + (isAr() ? labsAr[k] : labs[k]) + '</small>' + esc(p) + '</div>'; }).join('') + '</div></div>';
    }
    if (e.fd && e.fd.length && !(e.s && e.s.length)) h += '<div class="dc-note">' + ic(P.info) + '<span>' + L('This word has translations only. Full definitions for it are not in the dictionary yet.', 'هذه الكلمة لها ترجمة فقط، والتعريفات الكاملة غير متوفرة لها بعد.') + '</span></div>';
    return h + '</div></div>';
  }
  function arResults(q) {
    var ws = findAr(q);
    if (!ws.length) return notFound(q);
    return '<div class="dc-list">' + ws.slice(0, 14).map(function (w, k) {
      var x = IX[EN[w]]; if (!x) return '';
      return '<button type="button" class="dc-li" data-open="' + esc(w) + '" style="--n:' + k + '"><b>' + esc(w) + '</b>' + (x[1] ? '<span class="dc-pos">' + esc(posName(x[1])) + '</span>' : '') + '<span class="m">' + esc(x[2]) + '</span></button>';
    }).join('') + '</div>';
  }
  function notFound(q) {
    var sug = suggest(q).slice(0, 4);
    return '<div class="card dc-empty"><div class="big">' + ic(P.search) + '</div><h2>' + L('No result for', 'لا توجد نتيجة لـ') + ' “' + esc(q) + '”</h2>' +
      '<p>' + L('This word is not in the offline dictionary yet. Check the spelling or try another form of the word.', 'هذه الكلمة ليست في القاموس بعد. تأكد من الإملاء أو جرّب صيغة أخرى للكلمة.') + '</p>' +
      (sug.length ? '<div class="dc-chips" style="justify-content:center">' + sug.map(function (s) { return '<button class="dc-pill" type="button" data-w="' + esc(s.ar ? s.t : s.t) + '">' + esc(s.t) + '</button>'; }).join('') + '</div>' : '') + '</div>';
  }
  function welcome() {
    return '<div class="card dc-empty"><div class="big">' + ic(P.book) + '</div><h2>' + L('Look up any word', 'ابحث عن أي كلمة') + '</h2>' +
      '<p>' + L('Meanings, examples, synonyms, antonyms and more for ' + fmt(IX.length) + ' words, all working offline.', 'معانٍ وأمثلة ومرادفات وأضداد والمزيد لـ ' + fmt(IX.length) + ' كلمة، كلها تعمل بدون إنترنت.') + '</p></div>';
  }
  function gramSoon() {
    return '<div class="card dc-gram"><div class="orb">' + ic(P.spark) + '</div><h2>' + L('Grammar check is coming soon', 'تصحيح القواعد قريبًا') + '</h2>' +
      '<p>' + L('We are building a grammar and spelling assistant that explains every correction.', 'نعمل على مساعد للقواعد والإملاء يشرح لك كل تصحيح.') + '</p>' +
      '<ul><li>' + L('Spelling mistakes', 'الأخطاء الإملائية') + '</li><li>' + L('Common grammar errors with a clear reason', 'أخطاء القواعد الشائعة مع السبب') + '</li><li>' + L('One-tap corrections', 'تصحيح بضغطة واحدة') + '</li></ul></div>';
  }
  var skeleton = function () { return '<div class="card dc-res"><div class="dc-head"><div class="dc-sk w"></div></div><div class="dc-body"><div class="dc-sk"></div><div class="dc-sk s"></div><div class="dc-sk"></div></div></div>'; };

  function renderOut() {
    var out = $('#dcOut'); if (!out) return;
    var my = ++tok;
    if (st.mode === 'gram') { out.innerHTML = gramSoon(); return; }
    if (st.mode === 'sent') { out.innerHTML = ''; return; }
    if (!st.q) { out.innerHTML = welcome(); return; }
    if (st.dir === 'ar-en') {
      out.innerHTML = skeleton();
      loadAr().then(function () { if (my === tok) out.innerHTML = arResults(st.q); }, function () { if (my === tok) out.innerHTML = errCard(); });
      return;
    }
    var w = findEn(st.q);
    if (!w) { st.cur = null; out.innerHTML = notFound(st.q); return; }
    out.innerHTML = skeleton();
    getEntry(w).then(function (e) {
      if (my !== tok) return;
      if (!e) { out.innerHTML = notFound(st.q); return; }
      st.cur = e; out.innerHTML = entryHtml(e);
    }, function () { if (my === tok) out.innerHTML = errCard(); });
  }
  function errCard() {
    return '<div class="card dc-empty"><div class="big">' + ic(P.info) + '</div><h2>' + L('Could not load this part', 'تعذّر تحميل هذا الجزء') + '</h2><p>' + L('Connect to the internet once so the dictionary can be saved on your device.', 'اتصل بالإنترنت مرة واحدة ليُحفظ القاموس على جهازك.') + '</p></div>';
  }

  function renderSide() {
    var pool = [];
    IX.forEach(function (x, i) { if (x[3] <= 2 && x[1] && x[1] !== 'det' && x[0].length > 3) pool.push(i); });
    var w = IX[pool[Math.floor(Date.now() / 864e5) * 7 % pool.length]];
    var wb = $('#dcWotd');
    wb.dataset.w = w[0];
    wb.innerHTML = '<small>' + L('Word of the day', 'كلمة اليوم') + '</small><b dir="ltr">' + esc(w[0]) + '</b><span>' + esc(w[2]) + '</span>';
    $('#dcStat').innerHTML = '<div><b>' + fmt(IX.length) + '</b><span>' + L('Words', 'كلمة') + '</span></div><div><b>' + fmt(st.saved.length) + '</b><span>' + L('Saved', 'محفوظة') + '</span></div>';
    $$('#dcLt button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === st.list); });
    var arr = st.list === 'hist' ? st.hist : st.saved, ls = $('#dcLs');
    if (!arr.length) ls.innerHTML = '<p class="dc-none" style="padding:10px 6px">' + (st.list === 'hist' ? L('Your searches will appear here.', 'ستظهر عمليات بحثك هنا.') : L('Tap the star on a word to save it.', 'اضغط على النجمة لحفظ الكلمة.')) + '</p>';
    else ls.innerHTML = arr.map(function (x) { var i = EN[x]; return i == null ? '' : '<button type="button" data-w="' + esc(x) + '" data-en="1"><b>' + esc(x) + '</b><small>' + esc(IX[i][2]) + '</small></button>'; }).join('') +
      '<button type="button" class="dc-clr" data-clear="' + st.list + '">' + L('Clear list', 'مسح القائمة') + '</button>';
  }

  /* shows whether the whole dictionary is already stored on this device (service worker cache) */
  function offlineStatus(n) {
    var box = $('#dcOff'); if (!box) return;
    var done = function (ok) {
      box.innerHTML = ok ? '<div class="ok">' + ic(P.check) + '<span>' + L('Saved on this device. Works offline.', 'محفوظ على جهازك. يعمل بدون إنترنت.') + '</span></div>'
        : '<div class="wait"><span class="dc-spin sm"></span><span>' + L('Saving the dictionary for offline use…', 'جارٍ حفظ القاموس للعمل بدون إنترنت…') + '</span></div>';
    };
    if (!('caches' in window)) { box.innerHTML = ''; return; }
    caches.match('assets/dict/en/z.json', { ignoreSearch: true }).then(function (r) {
      done(!!r);
      if (!r && n < 12) setTimeout(function () { offlineStatus(n + 1); }, 4000);
    }, function () { box.innerHTML = ''; });
  }

  /* ---------- actions ---------- */
  function openWord(w) {
    if (st.dir !== 'en-ar') { st.dir = 'en-ar'; save(); }
    st.mode = 'word'; st.q = w;
    renderTabs(); renderInput(); renderOut(); commit(w);
  }
  function commit(w) {
    var b = st.dir === 'en-ar' ? findEn(w) : '';
    if (!b) return;
    st.hist = [b].concat(st.hist.filter(function (x) { return x !== b; })).slice(0, 40);
    save(); renderSide();
  }
  function runSearch(q) {
    st.q = q.trim();
    var c = $('#dcClr'); if (c) c.classList.toggle('on', !!st.q);
    renderOut();
    if (st.q) commit(st.q);
  }
  function showSug() {
    var q = ($('#dcQ') || {}).value || '', box = $('#dcSug');
    if (!box) return;
    if (hasAr(q) && !ARK) { loadAr().then(showSug, function () {}); }
    sugItems = q.trim() ? suggest(q) : []; sugSel = -1;
    if (!sugItems.length) { box.hidden = true; return; }
    box.hidden = false;
    var ql = q.trim().toLowerCase();
    box.innerHTML = sugItems.map(function (s, k) {
      if (s.ar) return '<button type="button" role="option" data-k="' + k + '"><b>' + esc(s.t) + '</b><small dir="ltr">' + esc(s.w) + '</small></button>';
      var b = s.t.indexOf(ql) === 0 ? '<mark>' + esc(s.t.slice(0, ql.length)) + '</mark>' + esc(s.t.slice(ql.length)) : esc(s.t);
      return '<button type="button" role="option" data-k="' + k + '"><b>' + b + '</b>' + (s.pos ? '<em>' + esc(posName(s.pos)) + '</em>' : '') + '<small>' + esc(s.m) + '</small></button>';
    }).join('');
  }
  function pickSug(k) {
    var s = sugItems[k]; if (!s) return;
    var val = s.t;
    $('#dcQ').value = val; $('#dcSug').hidden = true; runSearch(val);
  }
  function speak(text) {
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = .9;
      var b = $('#dcSay'); if (b) { b.classList.add('speaking'); u.onend = u.onerror = function () { b.classList.remove('speaking'); }; }
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function translateSentence() {
    var ta = $('#dcTa'), text = ta ? ta.value.trim() : '', out = $('#dcOut');
    if (!text) { out.innerHTML = ''; ta && ta.focus(); return; }
    var ar = st.dir === 'ar-en';
    var go = function () {
      var toks = text.split(/\s+/).map(function (t) { return t.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ''); }).filter(Boolean);
      var gloss = [], html = toks.map(function (t, k) {
        var w = '', g = '';
        if (ar) { var r = findAr(t); if (r.length) { w = r[0]; g = w; } }
        else { w = findEn(t); if (w) g = IX[EN[w]][2]; }
        gloss.push(g || t);
        return '<button type="button" class="dc-tk' + (g ? '' : ' miss') + '" ' + (w ? 'data-open="' + esc(w) + '"' : 'disabled') + ' style="--n:' + Math.min(k, 30) + '"><b>' + esc(t) + '</b><i>' + esc(g || '—') + '</i></button>';
      }).join('');
      out.innerHTML = '<div class="card dc-sent"><div class="dc-sec"><h3>' + L('Word by word', 'كلمة بكلمة') + '</h3><div class="dc-tokens' + (ar ? ' ar' : '') + '">' + html + '</div></div>' +
        '<div class="dc-sec"><h3>' + L('Rough meaning', 'المعنى التقريبي') + '</h3><div class="dc-gloss" dir="' + (ar ? 'ltr' : 'rtl') + '">' + esc(gloss.join(' ')) + '</div></div>' +
        '<div class="dc-note">' + ic(P.info) + '<span>' + L('This is a word-by-word guide from the offline dictionary. Full natural sentence translation will arrive with the offline translation model. Tap any word for its full card.', 'هذا شرح كلمة بكلمة من القاموس المحفوظ على جهازك. الترجمة الكاملة الطبيعية للجمل ستصل مع نموذج الترجمة بدون إنترنت. اضغط على أي كلمة لعرض بطاقتها.') + '</span></div></div>';
    };
    if (ar) loadAr().then(go, function () { out.innerHTML = errCard(); }); else go();
  }

  /* ---------- events (delegated once) ---------- */
  function bind() {
    root.addEventListener('click', function (e) {
      var t = e.target;
      var tab = t.closest('.dc-tab'); if (tab) { st.mode = tab.dataset.m; renderTabs(); renderInput(); renderOut(); return; }
      if (t.closest('#dcSwap')) { st.dir = st.dir === 'en-ar' ? 'ar-en' : 'en-ar'; st.q = ''; save(); renderInput(); renderOut(); if (st.dir === 'ar-en') loadAr().catch(function () {}); var q = $('#dcQ'); q && q.focus(); return; }
      if (t.closest('#dcClr')) { st.q = ''; var q2 = $('#dcQ'); q2.value = ''; q2.focus(); $('#dcClr').classList.remove('on'); renderOut(); return; }
      var s = t.closest('#dcSug button'); if (s) { pickSug(+s.dataset.k); return; }
      var op = t.closest('[data-open]'); if (op && !op.disabled) { openWord(op.dataset.open); var mn = $('.main'); mn && (mn.scrollTop = 0); return; }
      var cl = t.closest('[data-clear]'); if (cl) { st[cl.dataset.clear === 'hist' ? 'hist' : 'saved'] = []; save(); renderSide(); renderOut(); return; }
      var lt = t.closest('#dcLt button'); if (lt) { st.list = lt.dataset.l; renderSide(); return; }
      var w = t.closest('[data-w]');
      if (w) {
        var v = w.dataset.w;
        if (w.dataset.en || w.id === 'dcWotd') { openWord(v); var mn2 = $('.main'); mn2 && (mn2.scrollTop = 0); }
        else { st.mode = 'word'; var qq = $('#dcQ'); if (qq) qq.value = v; runSearch(v); if (!qq) { renderTabs(); renderInput(); renderOut(); } }
        return;
      }
      if (t.closest('#dcSay') && st.cur) { speak(st.cur.w); return; }
      if (t.closest('#dcSave') && st.cur) {
        var wd = st.cur.w, k = st.saved.indexOf(wd), b = $('#dcSave');
        if (k >= 0) st.saved.splice(k, 1); else st.saved.unshift(wd);
        b.classList.toggle('on', k < 0); b.setAttribute('aria-pressed', k < 0); save(); renderSide();
        toast(k < 0 ? L('Saved', 'تم الحفظ') : L('Removed', 'تمت الإزالة')); return;
      }
      if (t.closest('#dcCopy') && st.cur) { var d = st.cur, txt = d.w + ' — ' + d.ar.join('، '); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast(L('Copied', 'تم النسخ')); }, function () { toast(txt); }); return; }
      if (t.closest('#dcGo')) { translateSentence(); return; }
      if (t.closest('#dcCl')) { $('#dcTa').value = ''; $('#dcOut').innerHTML = ''; $('#dcTa').focus(); }
    });
    root.addEventListener('input', function (e) {
      if (e.target.id !== 'dcQ') return;
      clearTimeout(timer);
      var v = e.target.value; var c = $('#dcClr'); c && c.classList.toggle('on', !!v);
      showSug();
      timer = setTimeout(function () { st.q = v.trim(); if (!st.q) { renderOut(); return; } if (st.dir === 'ar-en' || findEn(st.q)) renderOut(); }, 220);
    });
    root.addEventListener('keydown', function (e) {
      if (e.target.id === 'dcQ') {
        var box = $('#dcSug'), n = sugItems.length;
        if (e.key === 'ArrowDown' && n) { e.preventDefault(); sugSel = (sugSel + 1) % n; }
        else if (e.key === 'ArrowUp' && n) { e.preventDefault(); sugSel = (sugSel - 1 + n) % n; }
        else if (e.key === 'Enter') { e.preventDefault(); clearTimeout(timer); if (sugSel >= 0 && !box.hidden) pickSug(sugSel); else { box.hidden = true; runSearch(e.target.value); } return; }
        else if (e.key === 'Escape') { box.hidden = true; return; }
        else return;
        $$('#dcSug button').forEach(function (b, k) { b.classList.toggle('on', k === sugSel); });
      } else if (e.target.id === 'dcTa' && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) translateSentence();
    });
    document.addEventListener('click', function (e) { var b = $('#dcSug'); if (b && !e.target.closest('.dc-field')) b.hidden = true; });
  }

  /* ---------- boot ---------- */
  function banner() {
    var t = $('#dcTitle'); if (!t) return;
    $('#dcEyebrow').textContent = L('OFFLINE DICTIONARY', 'قاموس بدون إنترنت');
    t.textContent = L('Dictionary', 'القاموس');
    $('#dcSub').textContent = L('Meanings, examples, synonyms and antonyms, with no internet needed.', 'معانٍ وأمثلة ومرادفات وأضداد، بدون الحاجة إلى إنترنت.');
  }
  function init() {
    if (inited) return; inited = true;
    root = $('#dcRoot'); load();
    loadIndex().then(function () { shell(); bind(); if (st.dir === 'ar-en') loadAr().catch(function () {}); }).catch(function () {
      inited = false;
      root.innerHTML = '<div class="card dc-empty" style="grid-column:1/-1"><div class="big">' + ic(P.info) + '</div><h2>' + L('Could not load the dictionary', 'تعذّر تحميل القاموس') + '</h2><p>' + L('Connect once so the dictionary can be saved on your device, then it works offline.', 'اتصل بالإنترنت مرة واحدة ليُحفظ القاموس على جهازك، وبعدها يعمل بدون إنترنت.') + '</p></div>';
    });
  }
  function route() { if ((location.hash || '').indexOf('#/dict') === 0) init(); }
  addEventListener('hashchange', route);
  addEventListener('novix:lang', function () { banner(); if (IX.length && root) shell(); });
  banner(); route();
})();
