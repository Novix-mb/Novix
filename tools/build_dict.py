#!/usr/bin/env python3
"""Build the offline English->Arabic dictionary shipped in assets/dict/.

Sources (download them first, see tools/README.md):
  * Princeton WordNet 3.0   (definitions, examples, synonyms, antonyms)   - WordNet licence
  * Open Multilingual Wordnet 'arb' = Arabic WordNet v2 (Arabic senses)    - CC BY-SA 3.0
  * FreeDict eng-ara / ara-eng (Arabeyes.org)                              - GPL-2.0-or-later
  * CMU Pronouncing Dictionary (via PyPI 'cmudict')                        - BSD-style
  * wordfreq (PyPI) to rank words by frequency                             - Apache-2.0 / data CC BY-SA

Usage: python3 tools/build_dict.py SRC_DIR assets/dict [MAX_WORDS]   (core entries come from tools/core.json)
SRC_DIR holds: wordnet/ (WordNet 3.0 dict files), omw-1.4/arb/wn-data-arb.tab, ea.json, ae.json
"""
import sys, os, re, json, collections
import xml.etree.ElementTree as ET

SRC = sys.argv[1]; OUT = sys.argv[2]; MAX_WORDS = int(sys.argv[3]) if len(sys.argv) > 3 else 10**9
CURATED = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'core.json')       # hand-written core entries (kept as-is)

import wordfreq, cmudict
CMU = cmudict.dict()
zipf = lambda w: wordfreq.zipf_frequency(w, 'en')

# ---------- Arabic helpers ----------
TASH = re.compile('[ً-ٰٟـ]')
def strip_tash(s): return TASH.sub('', s).strip()
def norm_ar(s):
    s = TASH.sub('', s)
    s = re.sub('[إأآٱ]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه')
    return re.sub(r'\s+', ' ', s).strip()
def key_ar(s):
    k = norm_ar(re.sub(r'\(.*?\)', ' ', s))
    return k[2:] if k.startswith('ال') and len(k) > 4 else k
HAS_AR = re.compile('[؀-ۿ]')

# ---------- WordNet ----------
POSMAP = {'n': 'noun', 'v': 'verb', 'a': 'adj', 's': 'adj', 'r': 'adv'}
def parse_wordnet():
    syn = {}
    for pos in ['noun', 'verb', 'adj', 'adv']:
        with open(f'{SRC}/wordnet/data.{pos}', encoding='utf-8') as f:
            for line in f:
                if line.startswith('  '): continue
                left, _, gloss = line.partition('|')
                t = left.split()
                off, ss = t[0], t[2]; p = 'a' if ss == 's' else ss
                n = int(t[3], 16); lem = []
                for i in range(n):
                    w = t[4 + 2 * i]; w = re.sub(r'\(.*?\)$', '', w).replace('_', ' ')
                    lem.append(w)
                idx = 4 + 2 * n; pc = int(t[idx]); idx += 1; ptr = []
                for _ in range(pc):
                    sym, o, pp, st = t[idx:idx + 4]; idx += 4
                    ptr.append((sym, o, pp, st))
                parts = [x.strip() for x in gloss.strip().split(';')]
                ex = [x.strip('"') for x in parts if x.startswith('"')]
                df = '; '.join(x for x in parts if x and not x.startswith('"'))
                syn[(off, p)] = dict(l=lem, p=p, d=df, e=ex, ptr=ptr)
    return syn

def parse_index():
    order = collections.defaultdict(list)   # (lemma,pos) -> [offsets] in sense-frequency order
    for pos, pl in [('noun', 'n'), ('verb', 'v'), ('adj', 'a'), ('adv', 'r')]:
        with open(f'{SRC}/wordnet/index.{pos}', encoding='utf-8') as f:
            for line in f:
                if line.startswith('  '): continue
                t = line.split(); lemma = t[0].replace('_', ' '); pc = int(t[3])
                offs = t[6 + pc:]
                order[(lemma, pl)] = offs
    return order

def parse_exc():
    irr = {}
    for pos in ['noun', 'verb', 'adj']:
        with open(f'{SRC}/wordnet/{pos}.exc', encoding='utf-8') as f:
            for line in f:
                t = line.split()
                if len(t) >= 2: irr.setdefault(t[0], (t[1], pos))
    return irr

def parse_awn():
    d = collections.defaultdict(list)
    with open(f'{SRC}/omw-1.4/arb/wn-data-arb.tab', encoding='utf-8') as f:
        for line in f:
            if line.startswith('#'): continue
            t = line.rstrip('\n').split('\t')
            if len(t) == 3 and t[1] == 'arb:lemma':
                off, p = t[0].split('-'); d[(off, p)].append(strip_tash(t[2]))
    return d

# ---------- IPA from CMU ----------
ARPA = {'AA': 'ɑ', 'AE': 'æ', 'AH': 'ʌ', 'AO': 'ɔ', 'AW': 'aʊ', 'AY': 'aɪ', 'B': 'b', 'CH': 'tʃ', 'D': 'd', 'DH': 'ð',
        'EH': 'e', 'ER': 'ɜr', 'EY': 'eɪ', 'F': 'f', 'G': 'ɡ', 'HH': 'h', 'IH': 'ɪ', 'IY': 'i', 'JH': 'dʒ', 'K': 'k',
        'L': 'l', 'M': 'm', 'N': 'n', 'NG': 'ŋ', 'OW': 'oʊ', 'OY': 'ɔɪ', 'P': 'p', 'R': 'r', 'S': 's', 'SH': 'ʃ',
        'T': 't', 'TH': 'θ', 'UH': 'ʊ', 'UW': 'u', 'V': 'v', 'W': 'w', 'Y': 'j', 'Z': 'z', 'ZH': 'ʒ'}
def ipa(w):
    p = CMU.get(w)
    if not p: return ''
    ph = p[0]; out = []; stress_placed = False
    for k, s in enumerate(ph):
        m = re.match(r'([A-Z]+)([012])?$', s)
        b, st = m.group(1), m.group(2)
        sym = ARPA.get(b, '')
        if b == 'AH' and st == '0': sym = 'ə'
        if b == 'ER' and st == '0': sym = 'ər'
        if st in ('1', '2') and b in ('AA','AE','AH','AO','AW','AY','EH','ER','EY','IH','IY','OW','OY','UH','UW') and len(ph) > 2:
            sym = ('ˈ' if st == '1' else 'ˌ') + sym
        out.append(sym)
    return '/' + ''.join(out) + '/'

def stem_cands(w):
    o = []
    if w.endswith('ies'): o.append(w[:-3] + 'y')
    if w.endswith('es'): o.append(w[:-2])
    if w.endswith('s'): o.append(w[:-1])
    if w.endswith('ied'): o.append(w[:-3] + 'y')
    if w.endswith('ed'):
        o += [w[:-2], w[:-1]]
        if len(w) > 4 and w[-3] == w[-4]: o.append(w[:-3])
    if w.endswith('ing'):
        o += [w[:-3], w[:-3] + 'e']
        if len(w) > 5 and w[-4] == w[-5]: o.append(w[:-4])
    return o

FORCED = {'is': 'be', 'am': 'be', 'are': 'be', 'was': 'be', 'were': 'be', 'been': 'be', 'being': 'be', 'has': 'have', 'had': 'have', 'having': 'have', 'does': 'do', 'did': 'do', 'done': 'do', 'doing': 'do'}
RISKY = re.compile(r"expletive|curse|profan|swear|derog|damn|hell\b|bitch|bastard|vulgar|obscene|slang|offensive|sexual|penis|vagina|genital|prostitut|erotic|porn|nazi|given name|surname|first name|kill|murder|rape|suicid|cocaine|heroin|alcohol|beer|wine|liquor|drunk|gambl|cigarette|tobacco|weapon", re.I)
NOT_WOTD = set('damn dick hell ass bitch bastard shit fuck crap piss slut whore cock pussy tit boob sex nigger gay january february march april may june july august september october november december monday tuesday wednesday thursday friday saturday sunday'.split())

def level(z): return 1 if z >= 4.6 else (2 if z >= 3.6 else (3 if z >= 2.6 else 4))

def main():
    os.makedirs(OUT + '/en', exist_ok=True)
    syn = parse_wordnet(); order = parse_index(); irr = parse_exc(); awn = parse_awn()
    ea = json.load(open(f'{SRC}/ea.json')); ae = json.load(open(f'{SRC}/ae.json'))
    fd = collections.defaultdict(list)
    for k, v in ea.items():
        fd[k.lower()].extend(v)
    core = {e['w'].lower(): e for e in json.load(open(CURATED))['entries']} if os.path.exists(CURATED) else {}

    # candidate lemmas
    lemmas = collections.defaultdict(dict)   # lemma -> pos -> [offsets]
    for (lemma, pl), offs in order.items():
        if re.fullmatch(r"[a-z][a-z' -]*", lemma): lemmas[lemma][pl] = offs
    cands = []
    for w in set(lemmas) | set(fd) | set(core):
        if not re.fullmatch(r"[a-z]([a-z' -]*[a-z])?", w) or '  ' in w: continue
        if len(w) == 1 and w not in ('a', 'i') and w not in core: continue
        z = zipf(w)
        if not (w in core or w in lemmas or w in fd): continue
        # skip pure inflections (went, posed, studies...) - the app maps them back to the base word
        if w not in core and w not in lemmas and ' ' not in w:
            base = irr.get(w, (None,))[0]
            if base and base in lemmas: continue
            if any(c in lemmas and len(c) > 2 for c in stem_cands(w)): continue
        cands.append((w, z))
    cands.sort(key=lambda x: -x[1])

    # antonyms by (offset,pos,lemma idx)
    def ants(key, wi):
        s = syn[key]; out = []
        for sym, o, pp, st in s['ptr']:
            if sym == '!' and (int(st[:2], 16) in (0, wi + 1)):
                t = syn.get((o, 'a' if pp == 's' else pp))
                if t: out.append(t['l'][int(st[2:], 16) - 1 if int(st[2:], 16) else 0])
        return out

    entries = {}
    for w, z in cands:
        senses = []; seen_ar = []
        for pl in ['n', 'v', 'a', 'r']:
            offs = lemmas.get(w, {}).get(pl, [])[:4]
            for off in offs:
                key = (off, pl)
                if key not in syn: continue
                s = syn[key]
                try: wi = [x.lower() for x in s['l']].index(w)
                except ValueError: wi = 0
                arl = []
                for a in awn.get(key, []):
                    if a and len(a) < 30 and norm_ar(a) not in [norm_ar(x) for x in arl]: arl.append(a)
                arl = arl[:4]
                sy = [x for x in s['l'] if x.lower() != w and ' ' not in x][:5]
                an = [x for x in ants(key, wi) if ' ' not in x][:3]
                ex = [e for e in s['e'] if len(e) < 130][:1]
                df = s['d'][:150]
                senses.append([POSMAP[pl], df, arl, ex, sy, an])
                for a in arl:
                    if a not in seen_ar: seen_ar.append(a)
        fdl = []
        for t in fd.get(w, []):
            t = re.sub(r'\(.*?\)', '', t).strip()
            if not t or re.search('[A-Za-z0-9]', t) or len(t) > 28 or ' - ' in t or '،' in t: continue
            fdl.append(t)
        # nouns: FreeDict gives definite article forms; drop it for dictionary form
        has_noun = any(s[0] == 'noun' for s in senses)
        fdl = [x[2:] if has_noun and x.startswith('ال') and ' ' not in x and len(x) > 4 else x for x in fdl]
        fdl = list(dict.fromkeys(fdl))[:5]
        top = []
        for a in fdl + seen_ar:                      # FreeDict first (dictionary forms), then Arabic WordNet
            if a and norm_ar(a) not in [norm_ar(x) for x in top]: top.append(a)
        top = top[:6]
        if w in core: top = core[w]['ar']
        if not top and not senses: continue
        e = {'w': w, 'l': level(z), 'ar': top}
        pr = ipa(w)
        if pr: e['i'] = pr
        if senses: e['s'] = [s for s in senses[:8]]
        if fdl: e['fd'] = fdl
        if w in core:
            c = core[w]
            for k in ('ex', 'prep', 'forms', 'syn', 'ant', 'p'):
                if c.get(k): e[k] = c[k]
            if c.get('i'): e['i'] = c['i']
        entries[w] = (e, z)

    ranked = sorted(entries.values(), key=lambda x: -x[1])[:MAX_WORDS]
    final = {e['w']: e for e, z in ranked}
    zmap = {e['w']: z for e, z in ranked}
    fk = lambda k: k.replace(' ', '_').replace("'", '~')

    # shards: first 2 letters; a group bigger than SHARD_MAX bytes is split by 3 letters (recorded in meta.sh)
    SHARD_MAX = 1_300_000
    g2 = collections.defaultdict(list)
    for w in sorted(final): g2[w[:2]].append(final[w])
    split = {}
    for k, lst in g2.items():
        if len(json.dumps(lst, ensure_ascii=False, separators=(',', ':')).encode()) > SHARD_MAX and len(k) == 2: split[k] = 3
    for d in ('en', 'ix'):
        for f in os.listdir(f'{OUT}/{d}') if os.path.isdir(f'{OUT}/{d}') else []: os.remove(f'{OUT}/{d}/{f}')
        os.makedirs(f'{OUT}/{d}', exist_ok=True)
    if os.path.exists(OUT + '/index.json'): os.remove(OUT + '/index.json')
    groups = collections.defaultdict(list)
    for w in sorted(final): groups[w[:split.get(w[:2], 2)]].append(final[w])
    for k, lst in groups.items():
        json.dump({'e': lst}, open(f'{OUT}/en/{fk(k)}.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    def pos_of(e):
        if e.get('p'): return e['p']
        return e['s'][0][0] if e.get('s') else ''
    # light per-letter index: suggestions + sentence glosses  [word, pos, first Arabic meaning, level]
    byl = collections.defaultdict(list)
    for w in sorted(final):
        e = final[w]; byl[w[0]].append([w, pos_of(e), e['ar'][0] if e['ar'] else '', e['l']])
    for c, lst in byl.items():
        json.dump({'w': lst}, open(f'{OUT}/ix/{c}.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    # word of the day pool: common single words with senses and Arabic, spread over the frequency range
    pool = [w for w, e in sorted(final.items(), key=lambda x: -zmap[x[0]])
            if e['l'] <= 2 and e.get('s') and len(e['ar']) >= 2 and ' ' not in w and len(w) > 3 and pos_of(e) in ('noun', 'verb', 'adj')
            and w not in NOT_WOTD and not w.endswith('s') and not any(RISKY.search(x[1]) for x in e['s'])]
    step = max(1, len(pool) // 366)
    meta = {'v': 3, 'n': len(final), 'sh': split,
            'irr': dict({k: v[0] for k, v in irr.items() if v[0] in final and k not in final}, **{k: v for k, v in FORCED.items() if v in final}),
            'wotd': pool[300::step][:366]}
    json.dump(meta, open(f'{OUT}/meta.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

    # Arabic -> English
    rev = collections.defaultdict(lambda: [None, collections.OrderedDict()])
    def add(ar, en, sc):
        k = key_ar(ar)
        if not k or len(k) < 2 or not HAS_AR.search(k): return
        r = rev[k]
        if r[0] is None: r[0] = strip_tash(re.sub(r'\(.*?\)', '', ar)).strip()
        if en not in r[1]: r[1][en] = sc
    for w, e in final.items():
        sc = e['l']
        for a in e['ar']: add(a, w, sc)
        for a in e.get('fd', []): add(a, w, sc)
        for s in e.get('s', []):
            for a in s[2]: add(a, w, sc)
    for a, tr in ae.items():
        for t in tr:
            t = t.lower().strip()
            if t in final: add(a, t, 3)
    out = {}
    for k, (disp, d) in rev.items():
        ens = sorted(d, key=lambda x: (d[x], -zipf(x)))[:8]
        out[k] = [disp, '|'.join(ens)]
    json.dump(out, open(f'{OUT}/ar-en.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    tot = sum(os.path.getsize(f'{OUT}/en/{f}') for f in os.listdir(OUT + '/en'))
    itot = sum(os.path.getsize(f'{OUT}/ix/{f}') for f in os.listdir(OUT + '/ix'))
    big = max(os.path.getsize(f'{OUT}/en/{f}') for f in os.listdir(OUT + '/en'))
    print('entries', len(final), 'shards', len(groups), 'split', len(split), 'en bytes', tot, 'biggest shard', big, 'ix bytes', itot, 'ar-en keys', len(out), os.path.getsize(OUT + '/ar-en.json'))

main()
