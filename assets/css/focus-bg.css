(() => {
            const st = document.getElementById('fxStage'),
                btn = document.getElementById('fxBgPickerBtn'),
                cv = document.getElementById('fxBg');
            if (!st || !btn) return;
            const IMG = {
                    dawn: "assets/img/focus-dawn.webp",
                    space: "assets/img/focus-space.webp",
                    aurora: "assets/img/focus-aurora.webp",
                    sunset: "assets/img/focus-sunset.webp"
                },
                KEY = 'novix.focus.background.v3',
                IDX = 'fxbg:index',
                MAX = 8,
                ar = () => document.documentElement.lang === 'ar',
                T = (e, a) => ar() ? a : e;
            const OPT = {
                cine: ['Deep space', 'فضاء عميق', 'Animated · drifting nebulae', 'متحرك · سدم تتحرك ببطء'],
                dawn: ['Dawn', 'الفجر', 'Still · 4K sky', 'ثابتة · سماء 4K'],
                space: ['Starfield', 'حقل النجوم', 'Still · deep sky', 'ثابتة · سماء عميقة'],
                aurora: ['Aurora', 'الشفق القطبي', 'Still · northern lights', 'ثابتة · الأضواء الشمالية'],
                sunset: ['Sunset', 'الغروب', 'Still · warm horizon', 'ثابتة · أفق دافئ']
            };
            let customs = [],
                mode = 'cine',
                items = [];
            const bk = id => id === 'legacy' ? 'fxbg' : 'fxbg:' + id,
                isC = m => typeof m === 'string' && m.indexOf('c:') === 0,
                urlOf = m => {
                    if (isC(m)) {
                        const c = customs.find(x => x.id === m.slice(2));
                        return c && c.url
                    }
                    return IMG[m]
                };
            const CK = '<svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                TRASH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.2a1.8 1.8 0 0 0 1.8 1.6h6.4a1.8 1.8 0 0 0 1.8-1.6L18 7M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7"/></svg>';
            const menu = document.createElement('div');
            menu.className = 'fx-menu';
            menu.hidden = true;
            menu.setAttribute('role', 'menu');
            st.appendChild(menu);
            const label = () => {
                btn.setAttribute('aria-label', T('Background', 'الخلفية'));
                btn.title = T('Background', 'الخلفية')
            };
            const radio = (k, title, sub, u, cls) => '<button type="button" role="menuitemradio" aria-checked="' + (k === mode) + '" data-w="' + k + '"><i class="fx-th' + (cls || '') + '"' + (u ? ' style=\'background-image:url("' + u + '")\'' : '') + '></i><span><b>' + title + '</b><small>' + sub + '</small></span>' + CK + '</button>';

            function build() {
                let h = '<div class="fx-menu-h">' + T('Background', 'الخلفية') + '</div>';
                ['cine', 'dawn', 'space', 'aurora', 'sunset'].forEach(k => {
                    const o = OPT[k];
                    h += radio(k, ar() ? o[1] : o[0], ar() ? o[3] : o[2], IMG[k], k === 'cine' ? ' cine' : '')
                });
                if (customs.length) {
                    h += '<div class="fx-menu-h fx-menu-h2">' + T('My images', 'صوري') + '</div>';
                    customs.forEach((c, i) => {
                        const dl = T('Delete image', 'حذف الصورة');
                        h += '<div class="fx-row">' + radio('c:' + c.id, T('My image ', 'صورتي ') + (i + 1), T('Imported', 'مستوردة'), c.url) + '<button type="button" class="fx-del" data-x="' + c.id + '" aria-label="' + dl + '" title="' + dl + '">' + TRASH + '</button></div>'
                    })
                }
                const full = customs.length >= MAX;
                h += '<hr><button type="button" role="menuitem" data-a="imp"' + (full ? ' aria-disabled="true"' : '') + '><i class="fx-th">＋</i><span><b>' + T('Import image…', 'استيراد صورة…') + '</b><small>' + (full ? T('Limit reached', 'وصلت للحد الأقصى') : T('Saved on this device', 'تتحفظ على الجهاز')) + '</small></span></button><input class="fx-bg-file" type="file" accept="image/*" multiple>';
                menu.innerHTML = h;
                items = [...menu.querySelectorAll('button')]
            }

            function place() {
                const s = st.getBoundingClientRect(),
                    b = btn.getBoundingClientRect(),
                    w = Math.min(310, s.width - 24);
                menu.style.width = w + 'px';
                menu.style.top = (b.bottom - s.top + 10) + 'px';
                menu.style.left = Math.max(12, Math.min(b.right - s.left - w, s.width - w - 12)) + 'px'
            }

            function open() {
                build();
                place();
                menu.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
                (menu.querySelector('[aria-checked="true"]') || items[0]).focus()
            }

            function close(f) {
                menu.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
                if (f) btn.focus()
            }

            function profile(u) {
                const im = new Image();
                im.onload = () => {
                    try {
                        const w = 48,
                            h = 27,
                            c = document.createElement('canvas');
                        c.width = w;
                        c.height = h;
                        const x = c.getContext('2d', {
                                willReadFrequently: true
                            }),
                            iw = im.naturalWidth,
                            ih = im.naturalHeight,
                            ia = 16 / 9;
                        let sw = iw,
                            sh = ih,
                            sx = 0,
                            sy = 0;
                        if (iw / ih > ia) {
                            sw = ih * ia;
                            sx = (iw - sw) / 2
                        } else {
                            sh = iw / ia;
                            sy = (ih - sh) * .48
                        }
                        x.drawImage(im, sx, sy, sw, sh, 0, 0, w, h);
                        const d = x.getImageData(0, 0, w, h).data,
                            px = [];
                        let L = 0,
                            R = 0,
                            G = 0,
                            B = 0;
                        for (let i = 0; i < d.length; i += 4) {
                            const l = (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255;
                            px.push({
                                i: i / 4,
                                l,
                                r: d[i],
                                g: d[i + 1],
                                b: d[i + 2]
                            });
                            L += l;
                            R += d[i];
                            G += d[i + 1];
                            B += d[i + 2]
                        }
                        const n = px.length,
                            lum = L / n,
                            top = px.slice().sort((a, b) => b.l - a.l).slice(0, Math.ceil(n * .08));
                        let ar = 0,
                            ag = 0,
                            ab = 0,
                            gu = 0,
                            gv = 0,
                            gw = 0;
                        top.forEach(p => {
                            ar += p.r;
                            ag += p.g;
                            ab += p.b;
                            const wgt = p.l ** 3;
                            gu += (p.i % w + .5) / w * wgt;
                            gv += (Math.floor(p.i / w) + .5) / h * wgt;
                            gw += wgt
                        });
                        const t = top.length || 1,
                            s = Math.max(0, Math.min(1, (top[0].l - lum) * 1.6));
                        cv.__prof = {
                            lum,
                            avg: [R, G, B].map(v => Math.round(v / n)),
                            accent: [ar, ag, ab].map(v => Math.min(255, Math.round(v / t * 1.1 + 12))),
                            glow: s > .12 && gw ? {
                                u: gu / gw,
                                v: gv / gw,
                                s
                            } : null
                        }
                    } catch (e) {}
                };
                im.src = u
            }

            function apply(m) {
                if (isC(m) && !urlOf(m)) m = 'cine';
                mode = m;
                const u = urlOf(m);
                st.dataset.bg = isC(m) ? 'custom' : m;
                cv.dataset.mode = m === 'cine' ? 'cine' : 'img';
                cv.dataset.scene = isC(m) ? 'custom' : m;
                cv.__prof = null;
                if (isC(m) && u) profile(u);
                if (u) st.style.setProperty('--fx-bg-image', 'url("' + new URL(u, document.baseURI).href + '")');
                try {
                    localStorage.setItem(KEY, m)
                } catch (e) {}
                if (cv.__go) cv.__go()
            }
            async function shrink(f) {
                let src, w, h;
                try {
                    src = await createImageBitmap(f);
                    w = src.width;
                    h = src.height
                } catch (e) {
                    src = await new Promise((ok, no) => {
                        const im = new Image();
                        im.onload = () => ok(im);
                        im.onerror = no;
                        im.src = URL.createObjectURL(f)
                    });
                    w = src.naturalWidth;
                    h = src.naturalHeight
                }
                const k = Math.min(1, 3840 / Math.max(w, h)),
                    c = document.createElement('canvas');
                c.width = Math.round(w * k);
                c.height = Math.round(h * k);
                c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
                const bl = await new Promise(r => c.toBlob(r, 'image/webp', .9));
                if (!bl) throw new Error('encode');
                return bl
            }
            async function removeImg(id) {
                const c = customs.find(x => x.id === id);
                if (!c) return;
                customs.splice(customs.indexOf(c), 1);
                if (mode === 'c:' + id) apply('cine');
                try {
                    URL.revokeObjectURL(c.url)
                } catch (e) {}
                try {
                    await NXSTORE.raw.del(bk(id));
                    await NXSTORE.raw.put(IDX, customs.map(x => x.id))
                } catch (e) {}
                build();
                place();
                (menu.querySelector('.fx-del') || menu.querySelector('[aria-checked="true"]') || items[0]).focus()
            }
            btn.onclick = () => menu.hidden ? open() : close();
            document.addEventListener('pointerdown', e => {
                if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) close()
            });
            menu.addEventListener('keydown', e => {
                const i = items.indexOf(document.activeElement);
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items[(i + 1) % items.length].focus()
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    items[(i - 1 + items.length) % items.length].focus()
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    close(1)
                } else if (e.key === 'Tab') close()
            });
            menu.addEventListener('click', e => {
                const x = e.target.closest('.fx-del');
                if (x) {
                    removeImg(x.dataset.x);
                    return
                }
                const b = e.target.closest('button');
                if (!b) return;
                if (b.dataset.w) {
                    apply(b.dataset.w);
                    close(1)
                } else if (b.dataset.a === 'imp' && b.getAttribute('aria-disabled') !== 'true') menu.querySelector('.fx-bg-file').click()
            });
            menu.addEventListener('change', async e => {
                if (!e.target.matches('.fx-bg-file')) return;
                const files = [...e.target.files].slice(0, MAX - customs.length);
                let last = null;
                for (const f of files) {
                    try {
                        const bl = await shrink(f),
                            id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
                        await NXSTORE.raw.put(bk(id), bl);
                        customs.push({
                            id,
                            url: URL.createObjectURL(bl)
                        });
                        await NXSTORE.raw.put(IDX, customs.map(x => x.id));
                        last = id
                    } catch (x) {}
                }
                if (last) apply('c:' + last);
                build();
                place();
                (menu.querySelector('[aria-checked="true"]') || items[0]).focus()
            });
            addEventListener('resize', () => {
                if (!menu.hidden) place()
            });
            addEventListener('novix:lang', () => {
                label();
                if (!menu.hidden) {
                    build();
                    place()
                }
            });
            let want = 'cine';
            try {
                want = localStorage.getItem(KEY) || 'cine'
            } catch (e) {}
            if (want === 'custom') want = 'c:legacy';
            label();
            apply(isC(want) ? 'cine' : want);
            (async () => {
                try {
                    let ids = await NXSTORE.raw.get(IDX);
                    if (!Array.isArray(ids)) {
                        ids = [];
                        if (await NXSTORE.raw.get('fxbg')) {
                            ids = ['legacy'];
                            await NXSTORE.raw.put(IDX, ids)
                        }
                    }
                    for (const id of ids) {
                        const bl = await NXSTORE.raw.get(bk(id));
                        if (bl) customs.push({
                            id,
                            url: URL.createObjectURL(bl)
                        })
                    }
                    if (isC(want)) apply(want)
                } catch (e) {}
            })();
        })();
