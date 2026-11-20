# Dictionary build tools

`build_dict.py` generates `assets/dict/` (meta.json, ix/<letter>.json, en/<prefix>.json, ar-en.json) from open data.
It is a developer tool only: it is not deployed (see `SKIP_DIRS` in `.github/workflows/deploy.yml`).

Download the sources into one folder (SRC):
- WordNet 3.0 and Open Multilingual Wordnet 1.4 from `nltk_data` (`corpora/wordnet.zip`, `corpora/omw-1.4.zip`), extracted as `SRC/wordnet/` and `SRC/omw-1.4/`
- FreeDict `eng-ara.tei` and `ara-eng.tei` (github.com/freedict/fd-dictionaries), converted to `SRC/ea.json` and `SRC/ae.json` as `{headword: [translations]}`
- `pip install wordfreq cmudict`

Then run: `python3 tools/build_dict.py SRC assets/dict`

Licences of the data: WordNet (Princeton licence), Arabic WordNet (CC BY-SA 3.0), FreeDict eng-ara (GPL-2.0-or-later, Arabeyes.org), CMUdict (BSD-style), wordfreq (Apache-2.0).
`core.json` holds the hand-written core entries that override generated ones.
