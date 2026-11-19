/* NOVIX - Offline Dictionary (English <-> Arabic).
   Loads assets/dict/en-ar.json once, then everything runs on the device with no internet. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isAr = function () { return document.documentElement.lang === 'ar'; };
  var L = function (en, ar) { return isAr() ? ar : en; };
  var KEY = 'novix.dict.v1';
  var DATA_URL = 'assets/dict/en-ar.json?v=1';

  /* ---------- state ---------- */
  var st = { dir: 'en-ar', mode: 'word', list: 'hist', hist: [], saved: [], cur: null, q: '' };
  var DB = null, EN = {}, IDX = [], ARX = {}, STEM = {}, root = null, inited = false, sugSel = -1, sugItems = [], timer = 0;

  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o) { st.hist = o.hist || []; st.saved = o.saved || []; st.dir = o.dir === 'ar-en' ? 'ar-en' : 'en-ar'; } } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ hist: st.hist.slice(0, 40), saved: st.saved, dir: st.dir })); } catch (e) {}
  }

  /* ---------- text helpers ---------- */
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function normAr(s) {
    return String(s).replace(/[ً-ٰٟـ]/g, '').replace(/[إأآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();
  }
  function arKeys(m) {
    var base = normAr(String(m).replace(/\(.*?\)/g, '').replace(/[…]/g, ' ').replace(/\s+بـ?\s*$/, '').replace(/\s+/g, ' ')).replace(/\s*بـ$/, '');
    var out = [base];
    if (base.indexOf('ال') === 0 && base.length > 4) out.push(base.slice(2));
    else out.push('ال' + base);
    return out;
  }
  var hasAr = function (s) { return /[؀-ۿ]/.test(s); };

  /* ---------- index ---------- */
  function build(entries) {
    DB = entries; EN = {}; ARX = {}; STEM = {};
    entries.forEach(function (e, i) {
      EN[e.w.toLowerCase()] = i;
      (e.ar || []).forEach(function (m) {
        arKeys(m).forEach(function (k) { (ARX[k] = ARX[k] || []); if (ARX[k].indexOf(i) < 0) ARX[k].push(i); });
      });
      if (e.forms) {
        var f = e.forms.split('·').map(function (x) { return x.trim().split('/')[0].trim().toLowerCase(); });
        for (var j = 1; j < f.length; j++) if (f[j] && !(f[j] in EN)) STEM[f[j]] = i;
        if (e.forms.indexOf('(uncountable)') < 0 && f[1] && e.p === 'noun') STEM[f[1]] = i;
      }
    });
    IDX = Object.keys(EN).sort();
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
  function findEn(raw) {
    var w = raw.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, '');
    if (!w) return -1;
    var c = stems(w);
    for (var i = 0; i < c.length; i++) { if ((i === 0 || c[i].length > 2) && c[i] in EN) return EN[c[i]]; }
    if (w in STEM) return STEM[w];
    var IR = { is: 'be', am: 'be', are: 'be', was: 'be', were: 'be', been: 'be', being: 'be', has: 'have', had: 'have', does: 'do', did: 'do', done: 'do' };
    if (IR[w] && IR[w] in EN) return EN[IR[w]];
    return -1;
  }
  function findAr(raw) {
    var ks = arKeys(raw), out = [];
    ks.forEach(function (k) { (ARX[k] || []).forEach(function (i) { if (out.indexOf(i) < 0) out.push(i); }); });
    if (!out.length) {
      var k0 = ks[0];
      Object.keys(ARX).forEach(function (k) { if (k0.length > 2 && k.indexOf(k0) === 0) ARX[k].forEach(function (i) { if (out.indexOf(i) < 0) out.push(i); }); });
    }
    return out;
  }
  function suggest(q) {
    var out = [];
    if (hasAr(q)) {
      var k = normAr(q);
      Object.keys(ARX).forEach(function (key) { if (out.length < 8 && key.indexOf(k) === 0) out.push({ t: key, ar: true, i: ARX[key][0], label: key }); });
      var seen = {}; out = out.filter(function (o) { var d = DB[o.i].w; if (seen[d]) return false; seen[d] = 1; return true; });
    } else {
      var w = q.toLowerCase().trim();
      if (!w) return [];
      IDX.forEach(function (x) { if (out.length < 8 && x.indexOf(w) === 0) out.push({ t: x, i: EN[x] }); });
      IDX.forEach(function (x) { if (out.length < 8 && x.indexOf(w) > 0) out.push({ t: x, i: EN[x] }); });
    }
    return out;
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
    book: '<path d="M2 5c3-1 7-1 10 2 3-3 7-3 10-2v14c-3-1-7-1-10 2-3-3-7-3-10-2z"/><path d="M12 7v14"/>'
  };
  var POS = { noun: ['noun', 'اسم'], verb: ['verb', 'فعل'], adj: ['adjective', 'صفة'], adv: ['adverb', 'ظرف'], prep: ['preposition', 'حرف جر'], pron: ['pronoun', 'ضمير'], conj: ['conjunction', 'حرف عطف'], det: ['determiner', 'أداة'] };
  var posName = function (p) { return (POS[p] ? L(POS[p][0], POS[p][1]) : p); };
  function toast(m) { var t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 1800); }

  /* ---------- shell ---------- */
  function shell() {
    var ar = st.dir === 'ar-en';
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
        '<div class="card dc-lists">' +
          '<div class="dc-lt" id="dcLt"><button data-l="hist">' + L('Recent', 'الأخيرة') + '</button><button data-l="saved">' + L('Saved', 'المحفوظة') + '</button></div>' +
          '<div class="dc-ls" id="dcLs"></div>' +
        '</div>' +
      '</aside>';
    renderTabs();
    renderInput();
    renderSide();
    renderOut();
  }

  function renderTabs() {
    $$('#dcTabs .dc-tab').forEach(function (b) { b.classList.toggle('on', b.dataset.m === st.mode); b.setAttribute('aria-selected', b.dataset.m === st.mode); });
  }

  function renderInput() {
    var box = $('#dcInput'), ar = st.dir === 'ar-en';
    if (st.mode === 'gram') { box.innerHTML = ''; $('#dcQuick').innerHTML = ''; return; }
    var dirHtml = '<div class="dc-dir"><span class="dc-lang">' + (ar ? 'العربية' : 'English') + '</span>' +
      '<button class="dc-swap" id="dcSwap" type="button" aria-label="' + L('Swap languages', 'تبديل اللغتين') + '">' + ic(P.swap) + '</button>' +
      '<span class="dc-lang">' + (ar ? 'English' : 'العربية') + '</span></div>';
    var field;
    if (st.mode === 'word') {
      field = '<div class="dc-field"><span class="dc-ico">' + ic(P.search) + '</span>' +
        '<input id="dcQ" type="text" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false" dir="' + (ar ? 'rtl' : 'ltr') + '" placeholder="' + (ar ? L('Type an Arabic word…', 'اكتب كلمة عربية…') : L('Type an English word…', 'اكتب كلمة إنجليزية…')) + '" value="' + esc(st.q) + '" aria-label="' + L('Search', 'بحث') + '">' +
        '<button class="dc-clear' + (st.q ? ' on' : '') + '" id="dcClr" type="button" aria-label="' + L('Clear', 'مسح') + '">' + ic(P.x) + '</button>' +
        '<div class="dc-sug" id="dcSug" hidden role="listbox"></div></div>';
      box.innerHTML = '<div class="dc-row">' + dirHtml + field + '</div>';
    } else {
      box.innerHTML = '<div class="dc-row">' + dirHtml + '</div><div class="dc-sent">' +
        '<textarea class="dc-ta" id="dcTa" dir="' + (ar ? 'rtl' : 'ltr') + '" placeholder="' + (ar ? L('Write an Arabic sentence…', 'اكتب جملة عربية…') : L('Write an English sentence…', 'اكتب جملة إنجليزية…')) + '" aria-label="' + L('Sentence', 'جملة') + '"></textarea>' +
        '<div class="dc-actions"><button class="dc-go" id="dcGo" type="button">' + ic(P.spark) + '<span>' + L('Translate', 'ترجم') + '</span></button><button class="dc-ghost" id="dcCl" type="button">' + L('Clear', 'مسح') + '</button></div></div>';
    }
    var q = $('#dcQuick');
    if (st.mode === 'word') {
      var ex = ar ? ['سعيد', 'كتاب', 'يتعلم', 'مهم', 'صديق'] : ['happy', 'learn', 'important', 'friend', 'depend'];
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
  function entryHtml(i) {
    var e = DB[i], saved = st.saved.indexOf(e.w) >= 0, n = 0;
    var h = '<div class="card dc-res" data-i="' + i + '"><div class="dc-head"><div><h2 class="dc-word" dir="ltr">' + esc(e.w) + '</h2>' +
      '<div class="dc-sub"><span class="dc-pos">' + esc(posName(e.p)) + '</span><span class="dc-ipa">' + esc(e.i || '') + '</span></div></div>' +
      '<div class="dc-tools">' +
        ('speechSynthesis' in window ? '<button class="dc-ib" id="dcSay" type="button" aria-label="' + L('Pronounce', 'نطق') + '">' + ic(P.speak) + '</button>' : '') +
        '<button class="dc-ib' + (saved ? ' on' : '') + '" id="dcSave" type="button" aria-label="' + L('Save', 'حفظ') + '" aria-pressed="' + saved + '">' + ic(P.star) + '</button>' +
        '<button class="dc-ib" id="dcCopy" type="button" aria-label="' + L('Copy', 'نسخ') + '">' + ic(P.copy) + '</button>' +
      '</div></div><div class="dc-body">';
    h += '<div class="dc-sec"><h3>' + L('Meaning in Arabic', 'المعنى بالعربية') + '</h3><div class="dc-means">' +
      e.ar.map(function (m, k) { return '<span class="dc-mean" style="--n:' + k + '"><i>' + (k + 1) + '</i>' + esc(m) + '</span>'; }).join('') + '</div></div>';
    if (e.ex && e.ex.length) h += '<div class="dc-sec"><h3>' + L('Examples', 'أمثلة') + '</h3><div class="dc-ex">' +
      e.ex.map(function (x, k) { return '<div class="dc-ex-i" style="--n:' + k + '"><p class="dc-ex-en">' + enHighlight(x[0], e.w) + '</p><p class="dc-ex-ar">' + esc(x[1]) + '</p></div>'; }).join('') + '</div></div>';
    h += '<div class="dc-two"><div class="dc-sec"><h3>' + L('Synonyms', 'المرادفات') + '</h3>' + chips(e.syn, 'syn') + '</div>' +
      '<div class="dc-sec"><h3>' + L('Antonyms', 'الأضداد') + '</h3>' + chips(e.ant, 'ant') + '</div></div>';
    if (e.prep) h += '<div class="dc-sec"><h3>' + L('Common prepositions', 'حروف الجر الشائعة') + '</h3><div class="dc-prep">' + e.prep.split('/').map(function (p) { return '<span>' + esc(p.trim()) + '</span>'; }).join('') + '</div></div>';
    if (e.forms) {
      var labs = e.p === 'verb' ? ['Base', 'Past', 'Past part.', 'Ing'] : ['Singular', 'Plural'];
      var labsAr = e.p === 'verb' ? ['المصدر', 'الماضي', 'التصريف الثالث', 'المضارع المستمر'] : ['المفرد', 'الجمع'];
      var parts = e.forms.split('·').map(function (x) { return x.trim(); });
      if (parts.length > 1 && parts[0].indexOf('(') < 0) h += '<div class="dc-sec"><h3>' + (e.p === 'verb' ? L('Verb forms', 'تصريف الفعل') : L('Forms', 'الصيغ')) + '</h3><div class="dc-forms">' +
        parts.map(function (p, k) { return '<div><small>' + (isAr() ? labsAr[k] : labs[k]) + '</small>' + esc(p) + '</div>'; }).join('') + '</div></div>';
    }
    return h + '</div></div>';
  }
  function arResults(q) {
    var ids = findAr(q);
    if (!ids.length) return notFound(q);
    return '<div class="dc-list">' + ids.map(function (i, k) {
      var e = DB[i];
      return '<button type="button" class="dc-li" data-open="' + i + '" style="--n:' + k + '"><b>' + esc(e.w) + '</b><span class="dc-pos">' + esc(posName(e.p)) + '</span><span class="dc-ipa">' + esc(e.i || '') + '</span><span class="m">' + esc(e.ar.slice(0, 2).join('، ')) + '</span></button>';
    }).join('') + '</div>';
  }
  function notFound(q) {
    var sug = suggest(q).slice(0, 4);
    return '<div class="card dc-empty"><div class="big">' + ic(P.search) + '</div><h2>' + L('No result for', 'لا توجد نتيجة لـ') + ' “' + esc(q) + '”</h2>' +
      '<p>' + L('This word is not in the offline dictionary yet. Check the spelling or try another form of the word.', 'هذه الكلمة ليست في القاموس بعد. تأكد من الإملاء أو جرّب صيغة أخرى للكلمة.') + '</p>' +
      (sug.length ? '<div class="dc-chips" style="justify-content:center">' + sug.map(function (s) { return '<button class="dc-pill" type="button" data-w="' + esc(s.t) + '">' + esc(s.t) + '</button>'; }).join('') + '</div>' : '') + '</div>';
  }
  function welcome() {
    return '<div class="card dc-empty"><div class="big">' + ic(P.book) + '</div><h2>' + L('Look up any word', 'ابحث عن أي كلمة') + '</h2>' +
      '<p>' + L('Get meanings, examples, synonyms, antonyms and prepositions in one tap. Everything works offline.', 'احصل على المعاني والأمثلة والمرادفات والأضداد وحروف الجر بضغطة واحدة. كل شيء يعمل بدون إنترنت.') + '</p></div>';
  }
  function gramSoon() {
    return '<div class="card dc-gram"><div class="orb">' + ic(P.spark) + '</div><h2>' + L('Grammar check is coming soon', 'تصحيح القواعد قريبًا') + '</h2>' +
      '<p>' + L('We are building a grammar and spelling assistant that explains every correction.', 'نعمل على مساعد للقواعد والإملاء يشرح لك كل تصحيح.') + '</p>' +
      '<ul><li>' + L('Spelling mistakes', 'الأخطاء الإملائية') + '</li><li>' + L('Common grammar errors with a clear reason', 'أخطاء القواعد الشائعة مع السبب') + '</li><li>' + L('One-tap corrections', 'تصحيح بضغطة واحدة') + '</li></ul></div>';
  }

  function renderOut() {
    var out = $('#dcOut');
    if (!out) return;
    if (st.mode === 'gram') { out.innerHTML = gramSoon(); return; }
    if (st.mode === 'sent') { out.innerHTML = ''; return; }
    if (!st.q) { out.innerHTML = welcome(); return; }
    if (st.dir === 'ar-en') {
      out.innerHTML = arResults(st.q);
    } else {
      var i = findEn(st.q);
      out.innerHTML = i < 0 ? notFound(st.q) : entryHtml(i);
      st.cur = i < 0 ? null : i;
    }
  }

  function renderSide() {
    var w = DB[(Math.floor(Date.now() / 864e5)) % DB.length];
    var wb = $('#dcWotd');
    wb.dataset.w = w.w;
    wb.innerHTML = '<small>' + L('Word of the day', 'كلمة اليوم') + '</small><b dir="ltr">' + esc(w.w) + '</b><span>' + esc(w.ar[0]) + '</span>';
    $('#dcStat').innerHTML = '<div><b>' + DB.length + '</b><span>' + L('Words', 'كلمة') + '</span></div><div><b>' + st.saved.length + '</b><span>' + L('Saved', 'محفوظة') + '</span></div>';
    $$('#dcLt button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === st.list); });
    var arr = st.list === 'hist' ? st.hist : st.saved, ls = $('#dcLs');
    if (!arr.length) ls.innerHTML = '<p class="dc-none" style="padding:10px 6px">' + (st.list === 'hist' ? L('Your searches will appear here.', 'ستظهر عمليات بحثك هنا.') : L('Tap the star on a word to save it.', 'اضغط على النجمة لحفظ الكلمة.')) + '</p>';
    else ls.innerHTML = arr.map(function (x) { var i = EN[x.toLowerCase()]; return i == null ? '' : '<button type="button" data-w="' + esc(x) + '" data-en="1"><b>' + esc(x) + '</b><small>' + esc(DB[i].ar[0]) + '</small></button>'; }).join('') +
      '<button type="button" class="dc-clr" data-clear="' + st.list + '">' + L('Clear list', 'مسح القائمة') + '</button>';
  }

  /* ---------- actions ---------- */
  function openWord(w, fromEn) {
    if (fromEn && st.dir !== 'en-ar') { st.dir = 'en-ar'; save(); }
    st.mode = 'word'; st.q = w;
    renderTabs(); renderInput(); renderOut(); commit(w);
  }
  function commit(w) {
    if (st.dir !== 'en-ar' && !hasAr(w)) return;
    var i = st.dir === 'en-ar' ? findEn(w) : -1;
    if (i < 0) return;
    var base = DB[i].w;
    st.hist = [base].concat(st.hist.filter(function (x) { return x !== base; })).slice(0, 40);
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
    sugItems = q.trim() ? suggest(q) : []; sugSel = -1;
    if (!sugItems.length) { box.hidden = true; return; }
    box.hidden = false;
    var ql = q.trim().toLowerCase();
    box.innerHTML = sugItems.map(function (s, k) {
      var e = DB[s.i], lab = s.ar ? s.label : s.t;
      var b = s.ar ? esc(lab) : (s.t.indexOf(ql) === 0 ? '<mark>' + esc(s.t.slice(0, ql.length)) + '</mark>' + esc(s.t.slice(ql.length)) : esc(s.t));
      return '<button type="button" role="option" data-k="' + k + '"><b>' + (s.ar ? esc(e.w) : b) + '</b>' + '<em>' + esc(posName(e.p)) + '</em><small>' + esc(s.ar ? s.label : e.ar.slice(0, 2).join('، ')) + '</small></button>';
    }).join('');
  }
  function pickSug(k) {
    var s = sugItems[k]; if (!s) return;
    var val = st.dir === 'en-ar' ? s.t : s.label;
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
    var toks = text.split(/\s+/).map(function (t) { return t.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ''); }).filter(Boolean);
    var gloss = [], html = toks.map(function (t, k) {
      var i = -1, g = '';
      if (ar) { var r = findAr(t); if (r.length) { i = r[0]; g = DB[i].w; } }
      else { i = findEn(t); if (i >= 0) g = DB[i].ar[0]; }
      gloss.push(g || t);
      return '<button type="button" class="dc-tk' + (g ? '' : ' miss') + '" ' + (i >= 0 ? 'data-open="' + i + '"' : 'disabled') + ' style="--n:' + k + '"><b>' + esc(t) + '</b><i>' + esc(g || '—') + '</i></button>';
    }).join('');
    out.innerHTML = '<div class="card dc-sent"><div class="dc-sec"><h3>' + L('Word by word', 'كلمة بكلمة') + '</h3><div class="dc-tokens' + (ar ? ' ar' : '') + '">' + html + '</div></div>' +
      '<div class="dc-sec"><h3>' + L('Rough meaning', 'المعنى التقريبي') + '</h3><div class="dc-gloss" dir="' + (ar ? 'ltr' : 'rtl') + '">' + esc(gloss.join(' ')) + '</div></div>' +
      '<div class="dc-note">' + ic(P.info) + '<span>' + L('This is a word-by-word guide from the offline dictionary. Full natural sentence translation will arrive with the offline translation model. Tap any word for its full card.', 'هذا شرح كلمة بكلمة من القاموس المحفوظ على جهازك. الترجمة الكاملة الطبيعية للجمل ستصل مع نموذج الترجمة بدون إنترنت. اضغط على أي كلمة لعرض بطاقتها.') + '</span></div></div>';
  }

  /* ---------- events (delegated once) ---------- */
  function bind() {
    root.addEventListener('click', function (e) {
      var t = e.target;
      var tab = t.closest('.dc-tab'); if (tab) { st.mode = tab.dataset.m; renderTabs(); renderInput(); renderOut(); return; }
      if (t.closest('#dcSwap')) { st.dir = st.dir === 'en-ar' ? 'ar-en' : 'en-ar'; st.q = ''; save(); renderInput(); renderOut(); var q = $('#dcQ'); q && q.focus(); return; }
      if (t.closest('#dcClr')) { st.q = ''; var q2 = $('#dcQ'); q2.value = ''; q2.focus(); $('#dcClr').classList.remove('on'); renderOut(); return; }
      var s = t.closest('#dcSug button'); if (s) { pickSug(+s.dataset.k); return; }
      var op = t.closest('[data-open]'); if (op && !op.disabled) { openWord(DB[+op.dataset.open].w, true); window.scrollTo && ($('.main') && ($('.main').scrollTop = 0)); return; }
      var cl = t.closest('[data-clear]'); if (cl) { st[cl.dataset.clear === 'hist' ? 'hist' : 'saved'] = []; save(); renderSide(); renderOut(); return; }
      var lt = t.closest('#dcLt button'); if (lt) { st.list = lt.dataset.l; renderSide(); return; }
      var w = t.closest('[data-w]');
      if (w) { var v = w.dataset.w; if (w.dataset.en || w.id === 'dcWotd') openWord(v, true); else { st.mode = 'word'; var qq = $('#dcQ'); if (qq) qq.value = v; runSearch(v); if (!qq) { renderTabs(); renderInput(); renderOut(); } } return; }
      if (t.closest('#dcSay')) { speak(DB[st.cur].w); return; }
      if (t.closest('#dcSave')) {
        var wd = DB[st.cur].w, k = st.saved.indexOf(wd), b = $('#dcSave');
        if (k >= 0) st.saved.splice(k, 1); else st.saved.unshift(wd);
        b.classList.toggle('on', k < 0); b.setAttribute('aria-pressed', k < 0); save(); renderSide();
        toast(k < 0 ? L('Saved', 'تم الحفظ') : L('Removed', 'تمت الإزالة')); return;
      }
      if (t.closest('#dcCopy')) { var d = DB[st.cur], txt = d.w + ' — ' + d.ar.join('، '); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast(L('Copied', 'تم النسخ')); }, function () { toast(txt); }); return; }
      if (t.closest('#dcGo')) { translateSentence(); return; }
      if (t.closest('#dcCl')) { $('#dcTa').value = ''; $('#dcOut').innerHTML = ''; $('#dcTa').focus(); }
    });
    root.addEventListener('input', function (e) {
      if (e.target.id !== 'dcQ') return;
      clearTimeout(timer);
      var v = e.target.value; var c = $('#dcClr'); c && c.classList.toggle('on', !!v);
      showSug();
      timer = setTimeout(function () { st.q = v.trim(); if (!st.q) { renderOut(); return; } var i = st.dir === 'en-ar' ? findEn(st.q) : 0; if (st.dir === 'ar-en' || i >= 0) renderOut(); }, 220);
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
    fetch(DATA_URL).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
      build(d.entries); shell(); bind();
    }).catch(function () {
      inited = false;
      root.innerHTML = '<div class="card dc-empty" style="grid-column:1/-1"><div class="big">' + ic(P.info) + '</div><h2>' + L('Could not load the dictionary', 'تعذّر تحميل القاموس') + '</h2><p>' + L('Connect once so the dictionary can be saved on your device, then it works offline.', 'اتصل بالإنترنت مرة واحدة ليُحفظ القاموس على جهازك، وبعدها يعمل بدون إنترنت.') + '</p></div>';
    });
  }
  function route() { if ((location.hash || '').indexOf('#/dict') === 0) init(); }
  addEventListener('hashchange', route);
  addEventListener('novix:lang', function () { banner(); if (DB && root) { var q = ($('#dcQ') || {}).value; shell(); } });
  banner(); route();
})();
