/* NOVIX - Offline Dictionary (English <-> Arabic), v2.
   Data lives in assets/dict/: index.json (30k word list), en/<letter>.json (full entries, loaded on demand)
   and ar-en.json (Arabic -> English). The service worker caches all of it, so it works with no internet. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isAr = function () { return document.documentElement.lang === 'ar'; };
  var L = function (en, ar) { return isAr() ? ar : en; };
  var V = '?v=3', KEY = 'novix.dict.v1';
  var META_URL = 'assets/dict/meta.json' + V, AR_URL = 'assets/dict/ar-en.json' + V, IX_URL = function (c) { return 'assets/dict/ix/' + c + '.json' + V; }, SHARD = function (k) { return 'assets/dict/en/' + k + '.json' + V; };

  /* ---------- state ---------- */
  var st = { dir: 'en-ar', mode: 'word', list: 'hist', hist: [], words: [], quiz: null, cur: null, q: '' };
  var META = null, IXL = {}, IRR = {}, SH = {}, ARX = null, ARK = null, arP = null, sugTok = 0;
  var root = null, inited = false, sugSel = -1, sugItems = [], timer = 0, tok = 0;

  var legacy = [];
  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o) { st.hist = o.hist || []; legacy = o.saved || []; st.dir = o.dir === 'ar-en' ? 'ar-en' : 'en-ar'; } } catch (e) {}
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify({ hist: st.hist.slice(0, 40), dir: st.dir })); } catch (e) {} }

  /* ---------- text helpers ---------- */
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function normAr(s) { return String(s).replace(/[ً-ٰٟـ]/g, '').replace(/[إأآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim(); }
  function arKey(s) { var k = normAr(String(s).replace(/\(.*?\)/g, ' ')); return k.indexOf('ال') === 0 && k.length > 4 ? k.slice(2) : k; }
  var hasAr = function (s) { return /[؀-ۿ]/.test(s); };
  var fmt = function (n) { return n.toLocaleString(isAr() ? 'ar-EG' : 'en-US'); };

  /* ---------- data layer ---------- */
  function getJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  function loadMeta() { return getJSON(META_URL).then(function (d) { META = d; IRR = d.irr || {}; }); }
  var okLetter = function (c) { return /^[a-z]$/.test(c || ''); };
  /* light per-letter index [word, pos, first Arabic meaning, level], sorted: used for suggestions, glosses and history */
  function ixLetter(c) {
    if (!okLetter(c)) return Promise.resolve({ m: {}, a: [] });
    if (!IXL[c]) IXL[c] = getJSON(IX_URL(c)).then(function (d) { var m = {}; d.w.forEach(function (x) { m[x[0]] = x; }); return { m: m, a: d.w }; }).catch(function (e) { delete IXL[c]; throw e; });
    return IXL[c];
  }
  var exactInfo = function (w) { return ixLetter(w[0]).then(function (ix) { return ix.m[w] || null; }); };
  /* full entries live in shards named after the first 2 letters (3 for the biggest groups, listed in meta.sh) */
  var fk = function (k) { return k.replace(/ /g, '_').replace(/'/g, '~'); };
  function shardKey(w) { var n = (META.sh && META.sh[w.slice(0, 2)]) || 2; return fk(w.slice(0, n)); }
  function shard(k) {
    if (!SH[k]) SH[k] = getJSON(SHARD(k)).then(function (d) { var m = {}; d.e.forEach(function (e) { m[e.w] = e; }); return m; }).catch(function (err) { delete SH[k]; throw err; });
    return SH[k];
  }
  var getEntry = function (w) { return shard(shardKey(w)).then(function (m) { return m[w] || null; }); };
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
  /* resolves what the user typed (any form of the word, or a phrase) to its index row, or null */
  function resolve(raw) {
    var w = String(raw).toLowerCase().replace(/[^a-z' -]+/g, ' ').replace(/\s+/g, ' ').replace(/^[^a-z]+|[^a-z]+$/g, '');
    if (!w) return Promise.resolve(null);
    var c = IRR[w] ? [IRR[w], w] : [w];
    if (w.indexOf(' ') < 0) stems(w).slice(1).forEach(function (x) { if (x.length > 2) c.push(x); });
    var i = 0;
    return (function next() {
      if (i >= c.length) return null;
      var x = c[i++];
      return ixLetter(x[0]).then(function (ix) { return ix.m[x] || next(); });
    })();
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
    if (hasAr(q)) {
      var out = [];
      if (!ARK) return Promise.resolve(out);
      var k = arKey(q);
      for (var i = 0; i < ARK.length && out.length < 8; i++) { if (ARK[i].indexOf(k) === 0) out.push({ ar: true, t: ARX[ARK[i]][0], w: ARX[ARK[i]][1].split('|')[0] }); }
      return Promise.resolve(out);
    }
    var w = q.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!w || !okLetter(w[0])) return Promise.resolve([]);
    return ixLetter(w[0]).then(function (ix) {
      var a = ix.a, lo = 0, hi = a.length;
      while (lo < hi) { var mid = (lo + hi) >> 1; if (a[mid][0] < w) lo = mid + 1; else hi = mid; }
      var pre = [];
      for (var j = lo; j < a.length && a[j][0].indexOf(w) === 0; j++) pre.push(a[j]);
      pre.sort(function (x, y) { return x[3] - y[3] || x[0].length - y[0].length || (x[0] < y[0] ? -1 : 1); });
      return pre.slice(0, 8).map(function (x) { return { t: x[0], pos: x[1], m: x[2] }; });
    });
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
  var LVL = { 1: ['Core', 'أساسي'], 2: ['Common', 'شائع'], 3: ['Advanced', 'متقدم'], 4: ['Rare', 'نادر'] };
  function toast(m) { var t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 1800); }

  /* ---------- shell ---------- */
  function shell() {
    root.innerHTML =
      '<div class="dc-main">' +
        '<div class="card dc-search">' +
          '<div class="dc-tabs" role="tablist" id="dcTabs">' +
            '<button class="dc-tab" role="tab" data-m="word">' + ic(P.search) + '<span>' + L('Word', 'كلمة') + '</span></button>' +
            '<button class="dc-tab" role="tab" data-m="sent">' + ic(P.list) + '<span>' + L('Sentence', 'جملة') + '</span></button>' +
            '<button class="dc-tab" role="tab" data-m="words">' + ic(P.star) + '<span>' + L('My words', 'كلماتي') + '</span></button>' +
            '<button class="dc-tab" role="tab" data-m="gram">' + ic(P.check) + '<span>' + L('Grammar', 'القواعد') + '</span><span class="dc-soon">' + L('Soon', 'قريبًا') + '</span></button>' +
          '</div>' +
          '<div id="dcInput"></div>' +
          '<div class="dc-quick" id="dcQuick"></div>' +
        '</div>' +
        '<div id="dcOut"></div>' +
      '</div>' +
      '<aside class="dc-side">' +
        '<button class="dc-wotd" id="dcWotd" type="button"></button>' +
        '<div class="card dc-lists">' +
          '<div class="dc-lt" id="dcLt"><button data-l="hist">' + L('Recent', 'الأخيرة') + '</button><button data-l="saved">' + L('My words', 'كلماتي') + '</button></div>' +
          '<div class="dc-ls" id="dcLs"></div>' +
        '</div>' +
      '<p class="dc-credit">' + L('Data: Princeton WordNet, Arabic WordNet (CC BY-SA 3.0), FreeDict eng-ara (GPL), CMU Pronouncing Dictionary.', 'المصادر: Princeton WordNet وArabic WordNet (CC BY-SA 3.0) وFreeDict (GPL) وقاموس CMU للنطق.') + '</p></aside>';
    renderTabs(); renderInput(); renderSide(); renderOut();
  }
  function renderTabs() { $$('#dcTabs .dc-tab').forEach(function (b) { b.classList.toggle('on', b.dataset.m === st.mode); b.setAttribute('aria-selected', b.dataset.m === st.mode); }); }

  function renderInput() {
    var box = $('#dcInput'), ar = st.dir === 'ar-en';
    if (st.mode === 'gram') { box.innerHTML = ''; $('#dcQuick').innerHTML = ''; return; }
    if (st.mode === 'words') { box.innerHTML = st.quiz ? '' : wordsForm(); $('#dcQuick').innerHTML = ''; return; }
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
    var saved = wIdx(e.w) >= 0;
    var poss = e.p ? [e.p] : uniq((e.s || []).map(function (s) { return s[0]; }));
    var h = '<div class="card dc-res"><div class="dc-head"><div><h2 class="dc-word" dir="ltr">' + esc(e.w) + '</h2>' +
      '<div class="dc-sub">' + poss.map(function (p) { return '<span class="dc-pos">' + esc(posName(p)) + '</span>'; }).join('') +
      (e.i ? '<span class="dc-ipa">' + esc(e.i) + '</span>' : '') + (e.l ? '<span class="dc-lvl l' + e.l + '">' + L(LVL[e.l][0], LVL[e.l][1]) + '</span>' : '') + '</div></div>' +
      '<div class="dc-tools">' +
        ('speechSynthesis' in window ? '<button class="dc-ib" id="dcSay" type="button" aria-label="' + L('Pronounce', 'نطق') + '">' + ic(P.speak) + '</button>' : '') +
        '<button class="dc-ib' + (saved ? ' on' : '') + '" id="dcSave" type="button" aria-label="' + L('Add to my words', 'أضف إلى كلماتي') + '" aria-pressed="' + saved + '">' + ic(P.star) + '</button>' +
        '<button class="dc-ib" id="dcCopy" type="button" aria-label="' + L('Copy', 'نسخ') + '">' + ic(P.copy) + '</button>' +
      '</div></div><div class="dc-body">';
    if (e.ar && e.ar.length) h += '<div class="dc-sec"><h3>' + L('Meaning in Arabic', 'المعنى بالعربية') + '</h3><div class="dc-means">' +
      e.ar.map(function (m, k) { return '<span class="dc-mean" style="--n:' + k + '"><i>' + (k + 1) + '</i>' + esc(m) + '</span>'; }).join('') + '</div></div>';
    else h += '<div class="dc-note">' + ic(P.info) + '<span>' + L('No Arabic translation for this word yet. The English definitions below are from the offline dictionary.', 'لا توجد ترجمة عربية لهذه الكلمة بعد. التعريفات الإنجليزية أدناه من القاموس المحفوظ على جهازك.') + '</span></div>';
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
    if (e.ar && e.ar.length && !(e.s && e.s.length)) h += '<div class="dc-note">' + ic(P.info) + '<span>' + L('This word has translations only. Full definitions for it are not in the dictionary yet.', 'هذه الكلمة لها ترجمة فقط، والتعريفات الكاملة غير متوفرة لها بعد.') + '</span></div>';
    return h + '</div></div>';
  }
  function arResults(q) {
    var ws = findAr(q).slice(0, 14);
    return Promise.all(ws.map(exactInfo)).then(function (xs) { return xs.filter(Boolean); });
  }
  function arList(xs) {
    return '<div class="dc-list">' + xs.map(function (x, k) {
      return '<button type="button" class="dc-li" data-open="' + esc(x[0]) + '" style="--n:' + k + '"><b>' + esc(x[0]) + '</b>' + (x[1] ? '<span class="dc-pos">' + esc(posName(x[1])) + '</span>' : '') + '<span class="m">' + esc(x[2]) + '</span></button>';
    }).join('') + '</div>';
  }
  function notFound(q, sug) {
    sug = sug || [];
    return '<div class="card dc-empty"><div class="big">' + ic(P.search) + '</div><h2>' + L('No result for', 'لا توجد نتيجة لـ') + ' “' + esc(q) + '”</h2>' +
      '<p>' + L('This word is not in the offline dictionary yet. Check the spelling or try another form of the word.', 'هذه الكلمة ليست في القاموس بعد. تأكد من الإملاء أو جرّب صيغة أخرى للكلمة.') + '</p>' +
      (sug.length ? '<div class="dc-chips" style="justify-content:center">' + sug.map(function (s) { return '<button class="dc-pill" type="button" data-w="' + esc(s.t) + '">' + esc(s.t) + '</button>'; }).join('') + '</div>' : '') + '</div>';
  }
  function welcome() {
    return '<div class="card dc-empty"><div class="big">' + ic(P.book) + '</div><h2>' + L('Look up any word', 'ابحث عن أي كلمة') + '</h2>' +
      '<p>' + L('Meanings, examples, synonyms, antonyms and more for ' + fmt(META.n) + ' words and phrases, all working offline.', 'معانٍ وأمثلة ومرادفات وأضداد والمزيد لـ ' + fmt(META.n) + ' كلمة وعبارة، كلها تعمل بدون إنترنت.') + '</p></div>';
  }
  function gramSoon() {
    return '<div class="card dc-gram"><div class="orb">' + ic(P.spark) + '</div><h2>' + L('Grammar check is coming soon', 'تصحيح القواعد قريبًا') + '</h2>' +
      '<p>' + L('We are building a grammar and spelling assistant that explains every correction.', 'نعمل على مساعد للقواعد والإملاء يشرح لك كل تصحيح.') + '</p>' +
      '<ul><li>' + L('Spelling mistakes', 'الأخطاء الإملائية') + '</li><li>' + L('Common grammar errors with a clear reason', 'أخطاء القواعد الشائعة مع السبب') + '</li><li>' + L('One-tap corrections', 'تصحيح بضغطة واحدة') + '</li></ul></div>';
  }
  var skeleton = function () { return '<div class="card dc-res"><div class="dc-head"><div class="dc-sk w"></div></div><div class="dc-body"><div class="dc-sk"></div><div class="dc-sk s"></div><div class="dc-sk"></div></div></div>'; };

  function missing(out, my, q) {
    suggest(q).catch(function () { return []; }).then(function (sug) { if (my === tok) out.innerHTML = notFound(q, sug.slice(0, 4)); });
  }
  function renderOut() {
    var out = $('#dcOut'); if (!out) return;
    var my = ++tok;
    if (st.mode === 'gram') { out.innerHTML = gramSoon(); return; }
    if (st.mode === 'sent') { out.innerHTML = ''; return; }
    if (st.mode === 'words') { out.innerHTML = st.quiz ? quizHtml() : wordsOut(); return; }
    if (!st.q) { st.cur = null; out.innerHTML = welcome(); return; }
    out.innerHTML = skeleton();
    var q = st.q;
    if (st.dir === 'ar-en') {
      loadAr().then(function () { return arResults(q); }).then(function (xs) {
        if (my !== tok) return;
        if (xs.length) out.innerHTML = arList(xs); else out.innerHTML = notFound(q, []);
      }, function () { if (my === tok) out.innerHTML = errCard(); });
      return;
    }
    resolve(q).then(function (x) {
      if (!x) { if (my === tok) { st.cur = null; missing(out, my, q); } return null; }
      return getEntry(x[0]).then(function (e) {
        if (my !== tok) return;
        if (!e) { missing(out, my, q); return; }
        st.cur = e; out.innerHTML = entryHtml(e);
      });
    }).catch(function () { if (my === tok) out.innerHTML = errCard(); });
  }
  function errCard() {
    return '<div class="card dc-empty"><div class="big">' + ic(P.info) + '</div><h2>' + L('Could not load this part', 'تعذّر تحميل هذا الجزء') + '</h2><p>' + L('Connect to the internet once so the dictionary can be saved on your device.', 'اتصل بالإنترنت مرة واحدة ليُحفظ القاموس على جهازك.') + '</p></div>';
  }

  function renderSide() {
    var wb = $('#dcWotd'), pool = (META && META.wotd) || [];
    var w = pool.length ? pool[Math.floor(Date.now() / 864e5) % pool.length] : 'happy';
    wb.dataset.w = w;
    wb.innerHTML = '<small>' + L('Word of the day', 'كلمة اليوم') + '</small><b dir="ltr">' + esc(w) + '</b><span>&nbsp;</span>';
    exactInfo(w).then(function (x) { var b = $('#dcWotd'); if (x && b) b.innerHTML = '<small>' + L('Word of the day', 'كلمة اليوم') + '</small><b dir="ltr">' + esc(w) + '</b><span>' + esc(x[2]) + '</span>'; }, function () {});
    $$('#dcLt button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === st.list); });
    var lst = st.list, ls = $('#dcLs');
    if (lst === 'saved') {
      ls.innerHTML = st.words.length ? st.words.map(function (x) { return '<button type="button" data-w="' + esc(x.w) + '" data-en="1"><b>' + esc(x.w) + '</b><small>' + esc(x.m || '') + '</small></button>'; }).join('')
        : '<p class="dc-none" style="padding:10px 6px">' + L('Words you add appear here.', 'الكلمات التي تضيفها تظهر هنا.') + '</p>';
      return;
    }
    var arr = st.hist;
    if (!arr.length) { ls.innerHTML = '<p class="dc-none" style="padding:10px 6px">' + L('Your searches will appear here.', 'ستظهر عمليات بحثك هنا.') + '</p>'; return; }
    Promise.all(arr.map(function (x) { return exactInfo(x).catch(function () { return null; }); })).then(function (xs) {
      if (st.list !== lst || !$('#dcLs')) return;
      $('#dcLs').innerHTML = xs.map(function (x, i) { return x ? '<button type="button" data-w="' + esc(x[0]) + '" data-en="1"><b>' + esc(x[0]) + '</b><small>' + esc(x[2]) + '</small></button>' : ''; }).join('') +
        '<button type="button" class="dc-clr" data-clear="hist">' + L('Clear list', 'مسح القائمة') + '</button>';
    });
  }

  /* ---------- actions ---------- */
  function openWord(w) {
    if (st.dir !== 'en-ar') { st.dir = 'en-ar'; save(); }
    st.mode = 'word'; st.q = w; st.quiz = null;
    renderTabs(); renderInput(); renderOut(); commit(w);
  }
  function commit(w) {
    if (st.dir !== 'en-ar') return;
    resolve(w).then(function (x) {
      if (!x) return;
      var b = x[0];
      st.hist = [b].concat(st.hist.filter(function (h) { return h !== b; })).slice(0, 40);
      save(); renderSide();
    }, function () {});
  }
  function runSearch(q) {
    st.q = q.trim();
    var c = $('#dcClr'); if (c) c.classList.toggle('on', !!st.q);
    renderOut();
    if (st.q) commit(st.q);
  }
  function showSug() {
    var q = ($('#dcQ') || {}).value || '';
    if (!$('#dcSug')) return;
    if (hasAr(q) && !ARK) { loadAr().then(showSug, function () {}); }
    var my = ++sugTok;
    (q.trim() ? suggest(q) : Promise.resolve([])).then(function (items) {
      var box = $('#dcSug');
      if (my !== sugTok || !box) return;
      sugItems = items; sugSel = -1;
      if (!sugItems.length) { box.hidden = true; return; }
      box.hidden = false;
      var ql = q.trim().toLowerCase();
      box.innerHTML = sugItems.map(function (s, k) {
        if (s.ar) return '<button type="button" role="option" data-k="' + k + '"><b>' + esc(s.t) + '</b><small dir="ltr">' + esc(s.w) + '</small></button>';
        var b = s.t.indexOf(ql) === 0 ? '<mark>' + esc(s.t.slice(0, ql.length)) + '</mark>' + esc(s.t.slice(ql.length)) : esc(s.t);
        return '<button type="button" role="option" data-k="' + k + '"><b>' + b + '</b>' + (s.pos ? '<em>' + esc(posName(s.pos)) + '</em>' : '') + '<small>' + esc(s.m) + '</small></button>';
      }).join('');
    }, function () {});
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
      var none = { w: '', g: '' };
      /* English: match the longest phrase first (give up, take part, in front of), then single words */
      var units = ar ? Promise.resolve(toks.map(function (t) { var r = findAr(t); return { t: t, w: r[0] || '', g: r[0] || '' }; })) : (function () {
        var out = [], i = 0;
        return (function step() {
          if (i >= toks.length) return Promise.resolve(out);
          var sizes = [3, 2, 1].filter(function (n) { return i + n <= toks.length; }), j = 0;
          return (function tryn() {
            var n = sizes[j++], t = toks.slice(i, i + n).join(' ');
            return resolve(t).catch(function () { return null; }).then(function (x) {
              if (x || n === 1) { out.push({ t: t, w: x ? x[0] : '', g: x ? x[2] : '' }); i += n; return step(); }
              return tryn();
            });
          })();
        })();
      })();
      units.then(function (rs) {
        var gloss = [], html = rs.map(function (r, k) {
          gloss.push(r.g || r.t);
          return '<button type="button" class="dc-tk' + (r.g ? '' : ' miss') + '" ' + (r.w ? 'data-open="' + esc(r.w) + '"' : 'disabled') + ' style="--n:' + Math.min(k, 30) + '"><b>' + esc(r.t) + '</b><i>' + esc(r.g || '—') + '</i></button>';
        }).join('');
        out.innerHTML = '<div class="card dc-sent"><div class="dc-sec"><h3>' + L('Word by word', 'كلمة بكلمة') + '</h3><div class="dc-tokens' + (ar ? ' ar' : '') + '">' + html + '</div></div>' +
          '<div class="dc-sec"><h3>' + L('Rough meaning', 'المعنى التقريبي') + '</h3><div class="dc-gloss" dir="' + (ar ? 'ltr' : 'rtl') + '">' + esc(gloss.join(' ')) + '</div></div>' +
          '<div class="dc-note">' + ic(P.info) + '<span>' + L('This is a word-by-word guide from the offline dictionary. Full natural sentence translation will arrive with the offline translation model. Tap any word for its full card.', 'هذا شرح كلمة بكلمة من القاموس المحفوظ على جهازك. الترجمة الكاملة الطبيعية للجمل ستصل مع نموذج الترجمة بدون إنترنت. اضغط على أي كلمة لعرض بطاقتها.') + '</span></div></div>';
      });
    };
    if (ar) loadAr().then(go, function () { out.innerHTML = errCard(); }); else go();
  }

  /* ---------- My words: words met while studying, with a quiz ---------- */
  var WKEY = 'novix.dict.words.v1';
  function loadWords() {
    try { var a = JSON.parse(localStorage.getItem(WKEY) || '[]'); if (Array.isArray(a)) st.words = a.filter(function (x) { return x && x.w; }); } catch (e) {}
    legacy.forEach(function (w) { if (wIdx(w) < 0) st.words.push({ w: w, m: '', n: '', t: Date.now(), ok: 0, bad: 0, last: 0 }); });
    if (legacy.length) { legacy = []; saveWords(); save(); }
  }
  function saveWords() { try { localStorage.setItem(WKEY, JSON.stringify(st.words)); } catch (e) {} }
  function wIdx(w) { for (var i = 0; i < st.words.length; i++) if (st.words[i].w === w) return i; return -1; }
  function fillMeanings() {
    st.words.forEach(function (x) { if (!x.m) exactInfo(x.w).then(function (r) { if (r && r[2] && !x.m) { x.m = r[2]; saveWords(); if (st.mode === 'words') renderOut(); renderSide(); } }, function () {}); });
  }
  function addWord(raw, meaning) {
    return resolve(raw).catch(function () { return null; }).then(function (x) {
      var word = x ? x[0] : raw, mean = (meaning || '').trim() || (x ? x[2] : ''), i = wIdx(word);
      if (i >= 0) { if (meaning && meaning.trim()) st.words[i].m = meaning.trim(); }
      else st.words.unshift({ w: word, m: mean, n: '', t: Date.now(), ok: 0, bad: 0, last: 0 });
      saveWords();
      return { dup: i >= 0 };
    });
  }
  function wStatus(x) {
    var n = (x.ok || 0) + (x.bad || 0);
    if (!n) return ['new', L('New', 'جديدة')];
    return (x.ok >= 3 && x.ok > x.bad * 2) ? ['known', L('Known', 'محفوظة')] : ['learning', L('Learning', 'قيد التعلم')];
  }
  function wordsForm() {
    return '<div class="dc-wadd"><div class="dc-wtitle"><h2>' + L('Your new words', 'كلماتك الجديدة') + '</h2><p>' + L('Write the words you meet while solving. They are saved here and you can take a quiz on them.', 'اكتب الكلمات التي تقابلك أثناء الحل. تُحفظ هنا ويمكنك أن تختبر نفسك فيها.') + '</p></div>' +
      '<div class="dc-wform"><div class="dc-field"><input id="dcWw" type="text" dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="next" placeholder="' + L('New word…', 'الكلمة الجديدة…') + '" aria-label="' + L('New word', 'الكلمة الجديدة') + '"></div>' +
      '<div class="dc-field"><input id="dcWm" type="text" dir="auto" autocomplete="off" enterkeyhint="done" placeholder="' + L('Meaning (optional)', 'المعنى (اختياري)') + '" aria-label="' + L('Meaning', 'المعنى') + '"></div>' +
      '<button class="dc-go" id="dcWadd" type="button">' + ic('<path d="M12 5v14M5 12h14"/>') + '<span>' + L('Add', 'إضافة') + '</span></button></div>' +
      '<p class="dc-whint" id="dcWhint"></p></div>';
  }
  function wordsOut() {
    var ws = st.words;
    if (!ws.length) return '<div class="card dc-empty"><div class="big">' + ic(P.star) + '</div><h2>' + L('No words yet', 'لا توجد كلمات بعد') + '</h2><p>' + L('When you meet a new word, type it above. Its meaning is filled in from the dictionary, and you can add your own.', 'عندما تقابل كلمة جديدة اكتبها بالأعلى. يُملأ معناها من القاموس ويمكنك كتابة معناك أنت.') + '</p></div>';
    var usable = ws.filter(function (x) { return x.m; }).length, known = ws.filter(function (x) { return wStatus(x)[0] === 'known'; }).length;
    var h = '<div class="card dc-wh"><div><b>' + ws.length + ' ' + L('words', 'كلمة') + '</b><small>' + known + ' ' + L('known', 'محفوظة') + (usable < ws.length ? ' · ' + (ws.length - usable) + ' ' + L('without a meaning', 'بدون معنى') : '') + '</small></div>' +
      '<button class="dc-go" type="button" data-qstart' + (usable ? '' : ' disabled') + '>' + ic(P.spark) + '<span>' + L('Start quiz', 'ابدأ الاختبار') + '</span></button></div>';
    h += '<div class="dc-wl">' + ws.map(function (x, i) {
      var s = wStatus(x);
      return '<div class="dc-wi" style="--n:' + Math.min(i, 12) + '"><button type="button" class="dc-wword" data-open="' + esc(x.w) + '"><b dir="ltr">' + esc(x.w) + '</b></button>' +
        '<span class="dc-wm' + (x.m ? '' : ' none') + '" data-wedit="' + i + '" tabindex="0" role="button" title="' + L('Edit meaning', 'تعديل المعنى') + '">' + (x.m ? esc(x.m) : L('Add a meaning', 'أضف معنى')) + '</span>' +
        '<span class="dc-ws s-' + s[0] + '">' + s[1] + '</span>' +
        '<button type="button" class="dc-wx" data-wdel="' + i + '" aria-label="' + L('Remove', 'حذف') + '">' + ic(P.x) + '</button></div>';
    }).join('') + '</div>';
    return h;
  }
  function submitWord() {
    var wi = $('#dcWw'), mi = $('#dcWm'); if (!wi) return;
    var w = wi.value.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!w) { wi.focus(); return; }
    addWord(w, mi.value).then(function (r) {
      toast(r.dup ? L('Updated', 'تم التحديث') : L('Added to your words', 'تمت الإضافة إلى كلماتك'));
      wi.value = ''; mi.value = ''; var hn = $('#dcWhint'); if (hn) hn.textContent = '';
      renderSide(); renderOut(); wi.focus();
    });
  }
  var hintTimer = 0;
  function wordHint(v) {
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () {
      var hn = $('#dcWhint'), w = v.trim(); if (!hn) return;
      if (w.length < 2) { hn.textContent = ''; return; }
      resolve(w).then(function (x) {
        if (!$('#dcWhint')) return;
        hn.textContent = x ? (x[2] ? x[0] + ' → ' + x[2] + '  ' + L('(from the dictionary)', '(من القاموس)') : L('In the dictionary without an Arabic meaning. Type the meaning yourself.', 'موجودة في القاموس بدون معنى عربي. اكتب المعنى بنفسك.'))
          : L('Not in the dictionary. Type the meaning yourself.', 'غير موجودة في القاموس. اكتب المعنى بنفسك.');
      }, function () {});
    }, 250);
  }
  function startEdit(sp) {
    var i = +sp.dataset.wedit, x = st.words[i]; if (!x) return;
    sp.outerHTML = '<input class="dc-wedit" data-wi="' + i + '" dir="auto" value="' + esc(x.m || '') + '" placeholder="' + L('Meaning', 'المعنى') + '">';
    var inp = $('.dc-wedit'); if (inp) { inp.focus(); inp.select(); }
  }

  /* quiz: 10 questions at most, weaker and older words first; English -> Arabic and Arabic -> English alternate */
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function distractors() {
    var base = st.words.filter(function (x) { return x.m; }).map(function (x) { return { w: x.w, m: x.m }; });
    var extra = shuffle((META && META.wotd) || []).slice(0, 14);
    return Promise.all(extra.map(function (w) { return exactInfo(w).catch(function () { return null; }); })).then(function (xs) {
      return base.concat(xs.filter(function (x) { return x && x[2]; }).map(function (x) { return { w: x[0], m: x[2] }; }));
    });
  }
  function startQuiz(only) {
    var pool = st.words.filter(function (x) { return x.m && (!only || only.indexOf(x.w) >= 0); });
    if (!pool.length) return;
    pool = shuffle(pool).sort(function (a, b) { return ((b.bad || 0) - (b.ok || 0)) - ((a.bad || 0) - (a.ok || 0)) || (a.last || 0) - (b.last || 0); }).slice(0, 10);
    distractors().then(function (dp) {
      var qs = shuffle(pool).map(function (x, k) {
        var seen = {}; seen[x.m] = 1;
        var others = shuffle(dp).filter(function (d) { if (d.w === x.w || seen[d.m]) return false; seen[d.m] = 1; return true; }).slice(0, 3);
        return { w: x.w, m: x.m, type: k % 2 ? 'ar2en' : 'en2ar', opts: shuffle([{ w: x.w, m: x.m, c: 1 }].concat(others.map(function (d) { return { w: d.w, m: d.m, c: 0 }; }))) };
      });
      st.quiz = { qs: qs, i: 0, score: 0, missed: [], picked: -1, done: false };
      renderInput(); renderOut();
      var mn = $('.main'); mn && (mn.scrollTop = 0);
    });
  }
  function quizHtml() {
    var z = st.quiz, n = z.qs.length;
    if (z.done) {
      var pct = Math.round(z.score / n * 100);
      var msg = pct === 100 ? L('Perfect! You know all of them.', 'ممتاز! تعرف كل الكلمات.') : pct >= 70 ? L('Great work. Keep reviewing the missed words.', 'عمل رائع. استمر في مراجعة الكلمات التي أخطأت فيها.') : L('Good start. Review these words and try again.', 'بداية جيدة. راجع هذه الكلمات وحاول مرة أخرى.');
      return '<div class="card dc-qz dc-qres"><div class="dc-ring" style="--p:' + pct + '"><b>' + pct + '%</b></div><h2>' + z.score + ' / ' + n + '</h2><p>' + msg + '</p>' +
        (z.missed.length ? '<div class="dc-sec" style="text-align:start"><h3>' + L('Words to review', 'كلمات للمراجعة') + '</h3><div class="dc-wl">' + z.missed.map(function (w) { var i = wIdx(w); return '<div class="dc-wi"><button type="button" class="dc-wword" data-open="' + esc(w) + '"><b dir="ltr">' + esc(w) + '</b></button><span class="dc-wm">' + esc(i >= 0 ? st.words[i].m : '') + '</span></div>'; }).join('') + '</div></div>' : '') +
        '<div class="dc-actions" style="justify-content:center">' + (z.missed.length ? '<button class="dc-go" type="button" data-qretry>' + L('Retry missed', 'أعد الكلمات الخاطئة') + '</button>' : '') +
        '<button class="dc-ghost" type="button" data-qstart>' + L('New quiz', 'اختبار جديد') + '</button><button class="dc-ghost" type="button" data-qback>' + L('Back to my words', 'العودة إلى كلماتي') + '</button></div></div>';
    }
    var q = z.qs[z.i], en = q.type === 'en2ar';
    var h = '<div class="card dc-qz"><div class="dc-qbar"><span>' + L('Question', 'السؤال') + ' ' + (z.i + 1) + ' / ' + n + '</span><span>' + z.score + ' ✓</span><button type="button" class="dc-qx" data-qback aria-label="' + L('Quit quiz', 'إنهاء الاختبار') + '">' + ic(P.x) + '</button></div>' +
      '<div class="dc-prog"><i style="width:' + Math.round(z.i / n * 100) + '%"></i></div>' +
      '<p class="dc-qp">' + (en ? L('What does this word mean?', 'ما معنى هذه الكلمة؟') : L('Which word has this meaning?', 'أي كلمة لها هذا المعنى؟')) + '</p>' +
      '<div class="dc-qw" dir="' + (en ? 'ltr' : 'rtl') + '">' + esc(en ? q.w : q.m) + '</div><div class="dc-qo">';
    h += q.opts.map(function (o, k) {
      var cls = 'dc-qb', pk = z.picked >= 0;
      if (pk && o.c) cls += ' ok'; else if (pk && k === z.picked) cls += ' bad';
      return '<button type="button" class="' + cls + '" data-qopt="' + k + '"' + (pk ? ' disabled' : '') + ' dir="' + (en ? 'rtl' : 'ltr') + '">' + esc(en ? o.m : o.w) + '</button>';
    }).join('') + '</div>';
    if (z.picked >= 0) h += '<div class="dc-actions" style="justify-content:flex-end"><button class="dc-go" type="button" data-qnext>' + (z.i + 1 >= n ? L('Finish', 'إنهاء') : L('Next', 'التالي')) + '</button></div>';
    return h + '</div>';
  }
  function answerQ(k) {
    var z = st.quiz; if (!z || z.done || z.picked >= 0) return;
    var q = z.qs[z.i], right = !!q.opts[k].c; z.picked = k;
    var i = wIdx(q.w); if (i >= 0) { st.words[i][right ? 'ok' : 'bad'] = (st.words[i][right ? 'ok' : 'bad'] || 0) + 1; st.words[i].last = Date.now(); saveWords(); }
    if (right) z.score++; else z.missed.push(q.w);
    renderOut(); renderSide();
  }
  function nextQ() {
    var z = st.quiz; if (!z || z.picked < 0) return;
    z.picked = -1; z.i++;
    if (z.i >= z.qs.length) z.done = true;
    renderOut();
    var mn = $('.main'); mn && (mn.scrollTop = 0);
  }

  /* ---------- events (delegated once) ---------- */
  function bind() {
    root.addEventListener('click', function (e) {
      var t = e.target;
      if (t.closest('#dcWadd')) { submitWord(); return; }
      var wdl = t.closest('[data-wdel]'); if (wdl) { st.words.splice(+wdl.dataset.wdel, 1); saveWords(); renderSide(); renderOut(); return; }
      var wed = t.closest('[data-wedit]'); if (wed) { startEdit(wed); return; }
      if (t.closest('[data-qstart]')) { startQuiz(); return; }
      var qop = t.closest('[data-qopt]'); if (qop) { answerQ(+qop.dataset.qopt); return; }
      if (t.closest('[data-qnext]')) { nextQ(); return; }
      if (t.closest('[data-qretry]')) { startQuiz(st.quiz ? st.quiz.missed.slice() : null); return; }
      if (t.closest('[data-qback]')) { st.quiz = null; renderInput(); renderOut(); return; }
      var tab = t.closest('.dc-tab'); if (tab) { st.mode = tab.dataset.m; renderTabs(); renderInput(); renderOut(); return; }
      if (t.closest('#dcSwap')) { st.dir = st.dir === 'en-ar' ? 'ar-en' : 'en-ar'; st.q = ''; save(); renderInput(); renderOut(); if (st.dir === 'ar-en') loadAr().catch(function () {}); var q = $('#dcQ'); q && q.focus(); return; }
      if (t.closest('#dcClr')) { st.q = ''; var q2 = $('#dcQ'); q2.value = ''; q2.focus(); $('#dcClr').classList.remove('on'); renderOut(); return; }
      var s = t.closest('#dcSug button'); if (s) { pickSug(+s.dataset.k); return; }
      var op = t.closest('[data-open]'); if (op && !op.disabled) { openWord(op.dataset.open); var mn = $('.main'); mn && (mn.scrollTop = 0); return; }
      var cl = t.closest('[data-clear]'); if (cl) { st.hist = []; save(); renderSide(); renderOut(); return; }
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
        var wd = st.cur.w, k = wIdx(wd), b = $('#dcSave');
        if (k >= 0) st.words.splice(k, 1); else st.words.unshift({ w: wd, m: (st.cur.ar && st.cur.ar[0]) || '', n: '', t: Date.now(), ok: 0, bad: 0, last: 0 });
        saveWords();
        b.classList.toggle('on', k < 0); b.setAttribute('aria-pressed', k < 0); renderSide();
        toast(k < 0 ? L('Added to your words', 'تمت الإضافة إلى كلماتك') : L('Removed', 'تمت الإزالة')); return;
      }
      if (t.closest('#dcCopy') && st.cur) { var d = st.cur, txt = d.w + ' — ' + d.ar.join('، '); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast(L('Copied', 'تم النسخ')); }, function () { toast(txt); }); return; }
      if (t.closest('#dcGo')) { translateSentence(); return; }
      if (t.closest('#dcCl')) { $('#dcTa').value = ''; $('#dcOut').innerHTML = ''; $('#dcTa').focus(); }
    });
    root.addEventListener('input', function (e) {
      if (e.target.id === 'dcWw') { wordHint(e.target.value); return; }
      if (e.target.id !== 'dcQ') return;
      clearTimeout(timer);
      var v = e.target.value; var c = $('#dcClr'); c && c.classList.toggle('on', !!v);
      showSug();
      timer = setTimeout(function () { var q0 = v.trim(); st.q = q0; if (!q0) { renderOut(); return; } if (st.dir === 'ar-en') { renderOut(); return; } resolve(q0).then(function (x) { if (x && st.q === q0) renderOut(); }, function () {}); }, 220);
    });
    root.addEventListener('keydown', function (e) {
      if ((e.target.id === 'dcWw' || e.target.id === 'dcWm') && e.key === 'Enter') { e.preventDefault(); submitWord(); return; }
      if (e.target.classList && e.target.classList.contains('dc-wedit') && e.key === 'Enter') { e.preventDefault(); e.target.blur(); return; }
      if (e.target.dataset && e.target.dataset.wedit != null && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); startEdit(e.target); return; }
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
    root.addEventListener('focusout', function (e) {
      var el = e.target;
      if (el.classList && el.classList.contains('dc-wedit')) { var i = +el.dataset.wi; if (st.words[i]) { st.words[i].m = el.value.trim(); saveWords(); renderSide(); renderOut(); } }
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
    loadMeta().then(function () { loadWords(); shell(); bind(); fillMeanings(); if (st.dir === 'ar-en') loadAr().catch(function () {}); }).catch(function () {
      inited = false;
      root.innerHTML = '<div class="card dc-empty" style="grid-column:1/-1"><div class="big">' + ic(P.info) + '</div><h2>' + L('Could not load the dictionary', 'تعذّر تحميل القاموس') + '</h2><p>' + L('Connect once so the dictionary can be saved on your device, then it works offline.', 'اتصل بالإنترنت مرة واحدة ليُحفظ القاموس على جهازك، وبعدها يعمل بدون إنترنت.') + '</p></div>';
    });
  }
  function route() { if ((location.hash || '').indexOf('#/dict') === 0) init(); }
  addEventListener('hashchange', route);
  addEventListener('novix:lang', function () { banner(); if (META && root) shell(); });
  banner(); route();
})();
