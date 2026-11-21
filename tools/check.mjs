// Quick sanity checks for CI (no dependencies): node tools/check.mjs
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

let bad = 0;
const fail = m => { console.error('FAIL ' + m); bad++; };

// 1. every first-party JS file must parse
const jsFiles = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    if (['.git', 'node_modules', 'vendor', 'dict'].includes(n)) continue;
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p) : /\.js$/.test(n) && !/\.min\.js$|pdf\.worker\.js$/.test(n) && jsFiles.push(p);
  }
})('.');
for (const f of jsFiles) {
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); }
  catch (e) { fail('syntax error in ' + f + '\n' + e.stderr); }
}

// 2. every local <script src> / <link href> in index.html must exist
const html = readFileSync('index.html', 'utf8');
for (const m of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"#:]+?)(?:\?[^"]*)?"/g)) {
  if (!existsSync(m[1])) fail('index.html references missing file: ' + m[1]);
}

// 3. i18n-ar.js must define window.NX_AR and be listed before novix.js
const iA = html.indexOf('i18n-ar.js'), iN = html.indexOf('novix.js');
if (iA < 0 || iN < 0 || iA > iN) fail('i18n-ar.js must be loaded before novix.js');
globalThis.window = {};
await import('../assets/js/i18n-ar.js');
const n = Object.keys(window.NX_AR || {}).length;
if (n < 100) fail('NX_AR looks empty (' + n + ' keys)');

console.log(bad ? bad + ' check(s) failed' : 'all checks passed (' + jsFiles.length + ' JS files, ' + n + ' Arabic strings)');
process.exit(bad ? 1 : 0);
