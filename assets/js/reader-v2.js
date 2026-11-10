        (() => {
            const $ = s => document.querySelector(s),
                $$ = s => [...document.querySelectorAll(s)];
            const reader = $('#novix-pdf-reader'),
                scroller = $('#nr-pages');
            if (!reader || !scroller) return;
            const isAr = () => document.documentElement.lang === 'ar';
            const L = (e, a) => isAr() ? a : e;
            const LS = {
                get(k, d) {
                    try {
                        const v = JSON.parse(localStorage.getItem(k));
                        return v == null ? d : v
                    } catch (e) {
                        return d
                    }
                },
                set(k, v) {
                    try {
                        localStorage.setItem(k, JSON.stringify(v));
                        return true
                    } catch (e) {
                        return false
                    }
                }
            };
            const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
            const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

            const DEF = {
                pen: {
                    color: '#253b34',
                    size: 3
                },
                highlighter: {
                    color: '#f2c230',
                    size: 14
                },
                eraser: {
                    size: 18
                },
                text: {
                    color: '#1f2a27',
                    size: 16,
                    bold: false,
                    family: 'sans'
                },
                sticky: {
                    paper: '#fff1b3',
                    size: 14,
                    textColor: '#2a2a2a'
                },
                shape: {
                    kind: 'rect',
                    stroke: '#278f79',
                    width: 2,
                    fill: '#e3f5eb',
                    fillOn: false,
                    textColor: '#20372e'
                }
            };
            const cfg = (() => {
                const s = LS.get('novix.pdf.tools.v1', {}),
                    o = {};
                for (const k in DEF) o[k] = {
                    ...DEF[k],
                    ...(s[k] || {})
                };
                return o
            })();
            const saveCfg = () => LS.set('novix.pdf.tools.v1', cfg);
            if (!cfg.shape.nofill1) {
                cfg.shape.fillOn = false;
                cfg.shape.nofill1 = true;
                saveCfg()
            }
            const FAM = {
                sans: 'Alexandria,Manrope,Arial,sans-serif',
                serif: 'Georgia,"Times New Roman",serif',
                mono: 'ui-monospace,Menlo,Consolas,monospace'
            };
            const toolOfObj = o => o.type === 'textbox' ? 'text' : o.type === 'sticky' ? 'sticky' : 'shape';

            let file = null,
                fileId = null,
                pdfDoc = null,
                scale = 1,
                tool = 'pan',
                views = [],
                ann = {
                    pages: {}
                },
                undo = [],
                redo = [],
                sel = null,
                io = null,
                saveT = 0,
                zoomT = 0,
                posT = 0;
            let defW = 595,
                defH = 842,
                queue = [],
                pumping = false,
                drawing = null,
                creating = null,
                curPage = 1,
                currentUrl = null,
                lastMod = null;
            const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
            const note = t => {
                const n = $('#nr-note');
                if (n) n.textContent = t
            };

            function askPw(wrong) {
                return new Promise(res => {
                    const m = document.createElement('div');
                    m.className = 'nx-modal';
                    m.innerHTML = '<form class="nx-dlg" role="alertdialog" aria-modal="true"><h3></h3><p></p><input type="password" autocomplete="off" style="width:100%;box-sizing:border-box;margin:10px 0;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#cfd8d4);font:inherit;background:var(--card,#fff);color:var(--text,#1c2b26)"><div class="nx-act"><button type="button" class="btn ghost"></button><button type="submit" class="btn"></button></div></form>';
                    const f = m.firstChild,
                        i = m.querySelector('input'),
                        [bc, bo] = m.querySelectorAll('button');
                    m.querySelector('h3').textContent = L('Password required', 'كلمة المرور مطلوبة');
                    m.querySelector('p').textContent = wrong ? L('Wrong password. Try again:', 'كلمة المرور غير صحيحة. حاول مرة أخرى:') : L('This PDF is password-protected. Enter the password:', 'هذا الملف محمي بكلمة مرور. أدخلها:');
                    i.setAttribute('aria-label', L('Password', 'كلمة المرور'));
                    bc.textContent = L('Cancel', 'إلغاء');
                    bo.textContent = L('Open', 'فتح');
                    const done = v => {
                        m.remove();
                        res(v)
                    };
                    bc.onclick = () => done(null);
                    f.onsubmit = e => {
                        e.preventDefault();
                        done(i.value || null)
                    };
                    m.addEventListener('keydown', e => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            e.stopPropagation();
                            done(null)
                        }
                    });
                    document.body.appendChild(m);
                    i.focus()
                })
            }

            const annKey = id => 'novix.pdf.ann.v3.' + id;
            const AS = {
                mem: new Map(),
                async load(id) {
                    if (this.mem.has(id)) return this.mem.get(id);
                    let a = null;
                    try {
                        a = await NXSTORE.raw.get('ann:' + id)
                    } catch (e) {}
                    if (!a) {
                        a = LS.get(annKey(id), null);
                        if (!a) {
                            const old = LS.get('novix.pdf.annotations.v2', {});
                            a = old[id] || null
                        }
                        if (a && a.pages) {
                            try {
                                await NXSTORE.raw.put('ann:' + id, a);
                                localStorage.removeItem(annKey(id))
                            } catch (e) {}
                        }
                    }
                    return a
                },
                set(id, obj) {
                    const c = JSON.parse(JSON.stringify(obj));
                    this.mem.set(id, c);
                    NXSTORE.raw.put('ann:' + id, c).catch(() => {
                        if (!LS.set(annKey(id), c)) note(L('Storage is full. Export your annotations before closing.', 'مساحة التخزين ممتلئة. صدّر تعليقاتك قبل الإغلاق.'))
                    });
                    return true
                }
            };

            let sessionBase = {
                pages: {}
            };
            const annSig = a => JSON.stringify(Object.keys((a && a.pages) || {}).sort((x, y) => x - y).filter(k => {
                const p = a.pages[k];
                return p && ((p.strokes && p.strokes.length) || (p.objects && p.objects.length))
            }).map(k => [k, a.pages[k]]));
            async function loadAnn() {
                const a = await AS.load(fileId);
                ann = a && a.pages ? a : {
                    pages: {}
                };
                sessionBase = JSON.parse(JSON.stringify(ann))
            }

            function persist(now) {
                clearTimeout(saveT);
                const run = () => {
                    if (fileId == null) return true;
                    const ok = AS.set(fileId, ann);
                    note(ok ? L('Saved on this device · Export to create an annotated PDF.', 'محفوظ على هذا الجهاز · صدّر ملف PDF لتضمين التعليقات.') : L('Storage is full. Export your annotations before closing.', 'مساحة التخزين ممتلئة. صدّر تعليقاتك قبل الإغلاق.'));
                    return ok
                };
                if (now) return run();
                saveT = setTimeout(run, 400)
            }
            const pageAnn = n => ann.pages[n] || (ann.pages[n] = {
                strokes: [],
                objects: []
            });
            const getList = (n, type) => type === 'stroke' ? pageAnn(n).strokes : pageAnn(n).objects;

            function norm(o) {
                if (o.fs == null) o.fs = o.type === 'textbox' ? 16 : 14;
                if (!o.color) o.color = o.type === 'textbox' ? '#1f2a27' : '#20372e';
                if (!o.family) o.family = 'sans';
                if (o.bold == null) o.bold = false;
                if (o.type === 'sticky' && !o.paper) o.paper = '#fff1b3';
                if (o.type === 'shape') {
                    if (o.stroke == null) o.stroke = '#368c75';
                    if (o.lw == null) o.lw = 2;
                    if (o.fill == null) o.fill = o.shape === 'speech' ? '#eaf2ff' : '#e3f5eb'
                }
                return o
            }

            function pushH(h) {
                undo.push(h);
                redo = [];
                if (undo.length > 300) undo.shift();
                updHist()
            }

            function updHist() {
                const u = $('#nr-undo'),
                    r = $('#nr-redo');
                if (u) u.disabled = !undo.length;
                if (r) r.disabled = !redo.length
            }

            function removeItem(n, type, id) {
                const l = getList(n, type),
                    i = l.findIndex(x => x.id === id);
                if (i >= 0) return l.splice(i, 1)[0]
            }

            function insertItem(n, type, item, idx) {
                const l = getList(n, type);
                if (l.some(x => x.id === item.id)) return;
                l.splice(clamp(idx == null ? l.length : idx, 0, l.length), 0, structuredClone(item))
            }

            function replaceItem(n, type, item) {
                const l = getList(n, type),
                    i = l.findIndex(x => x.id === item.id);
                if (i >= 0) l[i] = structuredClone(item);
                else l.push(structuredClone(item))
            }

            function stepH(h, undoing) {
                clearStrokeSel();
                if (h.op === 'add') {
                    undoing ? removeItem(h.n, h.type, h.after.id) : insertItem(h.n, h.type, h.after, h.index)
                } else if (h.op === 'del') {
                    undoing ? insertItem(h.n, h.type, h.before, h.index) : removeItem(h.n, h.type, h.before.id)
                } else replaceItem(h.n, h.type, undoing ? h.before : h.after);
                if (sel && !getList(sel.n, 'object').some(o => o.id === sel.id)) sel = null;
                refreshPage(h.n);
                buildOptions();
                persist()
            }

            function doUndo() {
                const h = undo.pop();
                if (!h) return;
                stepH(h, true);
                redo.push(h);
                updHist()
            }

            function doRedo() {
                const h = redo.pop();
                if (!h) return;
                stepH(h, false);
                undo.push(h);
                updHist()
            }

            function refreshPage(n) {
                const v = views[n - 1];
                if (v && v.mounted) {
                    drawInkAll(v);
                    renderObjects(v)
                }
            }

            function drawInkStroke(ctx, s, k) {
                const pts = s.points;
                if (!pts || !pts.length) return;
                ctx.save();
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.globalCompositeOperation = s.tool === 'eraser' ? 'destination-out' : 'source-over';
                ctx.strokeStyle = s.color || '#000';
                ctx.globalAlpha = s.tool === 'highlighter' ? .32 : 1;
                ctx.lineWidth = s.size * k;
                ctx.beginPath();
                ctx.moveTo(pts[0][0] * k, pts[0][1] * k);
                for (let i = 1; i < pts.length; i++) {
                    const x = pts[i][0] * k,
                        y = pts[i][1] * k,
                        px = pts[i - 1][0] * k,
                        py = pts[i - 1][1] * k;
                    ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2)
                }
                ctx.lineTo(pts[pts.length - 1][0] * k, pts[pts.length - 1][1] * k);
                ctx.stroke();
                ctx.restore()
            }

            function drawInkAll(v) {
                if (!v.mounted || !v.ink) return;
                const ctx = v.ink.getContext('2d');
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, v.ink.width, v.ink.height);
                for (const st of pageAnn(v.n).strokes) drawInkStroke(ctx, st, v.rs || 1)
            }

            function pickRs(w, h) {
                let rs = scale * dpr();
                const m = Math.max(w, h) * rs;
                if (m > 4096) rs *= 4096 / m;
                const a = w * h * rs * rs;
                if (a > 14e6) rs *= Math.sqrt(14e6 / a);
                return rs
            }

            function buildViews() {
                scroller.replaceChildren();
                views = [];
                if (io) io.disconnect();
                io = new IntersectionObserver(es => {
                    for (const e of es) {
                        const v = views[+e.target.dataset.page - 1];
                        if (!v) continue;
                        e.isIntersecting ? mountView(v) : unmountView(v)
                    }
                }, {
                    root: scroller,
                    rootMargin: '1400px 0px 1400px 0px'
                });
                const frag = document.createDocumentFragment();
                for (let n = 1; n <= pdfDoc.numPages; n++) {
                    const w = document.createElement('div');
                    w.className = 'pdf-page';
                    w.dataset.page = n;
                    w.style.setProperty('--pw', defW);
                    w.style.setProperty('--ph', defH);
                    views.push({
                        n,
                        wrap: w,
                        pw: defW,
                        ph: defH,
                        mounted: false,
                        rs: 0,
                        tok: 0
                    });
                    frag.appendChild(w)
                }
                scroller.appendChild(frag);
                views.forEach(v => io.observe(v.wrap));
                $('#nr-total').textContent = '/ ' + pdfDoc.numPages;
                $('#nr-page').max = pdfDoc.numPages
            }

            function mountView(v) {
                if (v.mounted) return;
                v.mounted = true;
                v.base = document.createElement('canvas');
                v.base.className = 'pdf-base';
                v.ink = document.createElement('canvas');
                v.ink.className = 'pdf-ink';
                v.objLayer = document.createElement('div');
                v.objLayer.className = 'pdf-object-layer';
                v.wrap.append(v.base, v.ink, v.objLayer);
                bindInk(v);
                renderObjects(v);
                enqueue(v)
            }

            function unmountView(v) {
                if (!v.mounted) return;
                if (v.objLayer && v.objLayer.contains(document.activeElement)) return;
                if ((drawing && drawing.v === v) || (creating && creating.v === v)) return;
                if (sel && sel.n === v.n) return;
                v.tok++;
                try {
                    v.task && v.task.cancel()
                } catch (e) {}
                v.task = null;
                v.mounted = false;
                v.rs = 0;
                v.wrap.classList.remove('ready');
                v.wrap.replaceChildren();
                v.base = v.ink = v.objLayer = null;
                try {
                    v.page && v.page.cleanup()
                } catch (e) {}
                if (v.page && pdfDoc && pdfDoc.release) {
                    pdfDoc.release(v.page);
                    v.page = null
                }
            }
            let active = 0;

            function enqueue(v) {
                if (!queue.includes(v)) queue.push(v);
                pump()
            }

            function pump() {
                while (active < 2 && queue.length) {
                    const mid = scroller.scrollTop + scroller.clientHeight / 2;
                    queue.sort((a, b) => Math.abs(a.wrap.offsetTop + a.wrap.offsetHeight / 2 - mid) - Math.abs(b.wrap.offsetTop + b.wrap.offsetHeight / 2 - mid));
                    const v = queue.shift();
                    active++;
                    renderView(v).finally(() => {
                        active = Math.max(0, active - 1);
                        pump()
                    })
                }
            }
            async function renderView(v) {
                if (!v.mounted || !pdfDoc) return;
                const tok = ++v.tok;
                try {
                    let page = v.page;
                    if (!page) {
                        page = await pdfDoc.getPage(v.n);
                        if (!v.mounted) {
                            if (pdfDoc.release) pdfDoc.release(page);
                            return
                        }
                        if (tok !== v.tok) return;
                        v.page = page
                    }
                    if (!v.mounted || tok !== v.tok) return;
                    const b = page.getViewport({
                        scale: 1
                    });
                    if (Math.abs(b.width - v.pw) > .5 || Math.abs(b.height - v.ph) > .5) {
                        v.pw = b.width;
                        v.ph = b.height;
                        v.wrap.style.setProperty('--pw', b.width);
                        v.wrap.style.setProperty('--ph', b.height)
                    }
                    const full = pickRs(b.width, b.height),
                        quick = !v.rs && full > scale * 1.25,
                        rs = quick ? Math.max(.5, scale * .7) : full,
                        vp = page.getViewport({
                            scale: rs
                        });
                    const tmp = document.createElement('canvas');
                    tmp.width = Math.ceil(vp.width);
                    tmp.height = Math.ceil(vp.height);
                    tmp.className = 'pdf-base';
                    const task = page.render({
                        canvasContext: tmp.getContext('2d'),
                        viewport: vp
                    });
                    v.task = task;
                    await task.promise;
                    if (!v.mounted || tok !== v.tok) return;
                    v.base.replaceWith(tmp);
                    v.base = tmp;
                    v.ink.width = tmp.width;
                    v.ink.height = tmp.height;
                    v.rs = rs;
                    drawInkAll(v);
                    v.wrap.classList.add('ready');
                    if (quick) enqueue(v)
                } catch (err) {
                    if (err && err.name === 'RenderingCancelledException') return;
                    if (tok !== v.tok || !v.mounted) return;
                    console.error(err)
                }
            }

            function updZoomLabel() {
                const z = $('#nr-zoom');
                if (z) z.textContent = Math.round(scale * 100) + '%'
            }

            function setScale(ns, soft) {
                ns = clamp(ns, .4, 4);
                if (Math.abs(ns - scale) < .002) return;
                const ratio = (scroller.scrollTop + scroller.clientHeight / 2) / Math.max(1, scroller.scrollHeight);
                scale = ns;
                scroller.style.setProperty('--s', scale);
                scroller.scrollTop = ratio * scroller.scrollHeight - scroller.clientHeight / 2;
                updZoomLabel();
                clearTimeout(zoomT);
                zoomT = setTimeout(() => {
                    views.forEach(v => v.mounted && enqueue(v));
                    savePos()
                }, soft ? 120 : 160)
            }

            function fitWidth() {
                const avail = Math.max(240, scroller.clientWidth - 24);
                return clamp(avail / defW, .4, 2)
            }

            function scrollToPage(n) {
                n = clamp(Math.round(n) || 1, 1, views.length);
                const v = views[n - 1];
                if (v) scroller.scrollTop = v.wrap.offsetTop - 12;
                curPage = n;
                $('#nr-page').value = n
            }

            function updCurPage() {
                if (!views.length) return;
                const y = scroller.scrollTop + scroller.clientHeight * .35;
                let lo = 0,
                    hi = views.length - 1;
                while (lo < hi) {
                    const m = (lo + hi + 1) >> 1;
                    if (views[m].wrap.offsetTop <= y) lo = m;
                    else hi = m - 1
                }
                curPage = lo + 1;
                const inp = $('#nr-page');
                if (document.activeElement !== inp) inp.value = curPage
            }

            function savePos() {
                clearTimeout(posT);
                posT = setTimeout(() => {
                    if (fileId == null) return;
                    const all = LS.get('novix.pdf.pos.v1', {});
                    all[fileId] = {
                        page: curPage,
                        scale: +scale.toFixed(3)
                    };
                    LS.set('novix.pdf.pos.v1', all)
                }, 300)
            }
            let scrollRaf = 0;
            scroller.addEventListener('scroll', () => {
                if (scrollRaf) return;
                scrollRaf = requestAnimationFrame(() => {
                    scrollRaf = 0;
                    updCurPage();
                    savePos()
                })
            }, {
                passive: true
            });
            scroller.addEventListener('wheel', e => {
                if (!e.ctrlKey || !views.length) return;
                e.preventDefault();
                setScale(scale * (e.deltaY < 0 ? 1.08 : 1 / 1.08), true)
            }, {
                passive: false
            });
            const touchDown = new Set();

            function abortGesture() {
                if (strokeDrag) strokeDrag.cancel();
                if (drawing) {
                    const d = drawing,
                        v = d.v;
                    if (d.raf) cancelAnimationFrame(d.raf);
                    if (d.live) d.live.remove();
                    drawing = null;
                    try {
                        drawInkAll(v)
                    } catch (e) {}
                }
                if (creating && creating.cancel) {
                    try {
                        creating.cancel()
                    } catch (e) {}
                }
            }
            scroller.addEventListener('pointerdown', e => {
                if (e.pointerType !== 'touch') return;
                touchDown.add(e.pointerId);
                if (touchDown.size > 1) abortGesture()
            }, true);
            ['pointerup', 'pointercancel'].forEach(k => scroller.addEventListener(k, e => {
                if (e.pointerType === 'touch') touchDown.delete(e.pointerId)
            }, true));
            let pinch = null;
            scroller.addEventListener('touchstart', e => {
                if (e.touches.length === 2 && views.length) {
                    const a = e.touches[0],
                        b = e.touches[1];
                    pinch = {
                        d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
                        s: scale,
                        mx: (a.clientX + b.clientX) / 2,
                        my: (a.clientY + b.clientY) / 2
                    };
                    abortGesture()
                }
            }, {
                passive: true
            });
            scroller.addEventListener('touchmove', e => {
                if (pinch && e.touches.length === 2) {
                    e.preventDefault();
                    const a = e.touches[0],
                        b = e.touches[1];
                    setScale(pinch.s * Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) / pinch.d, true);
                    const mx = (a.clientX + b.clientX) / 2,
                        my = (a.clientY + b.clientY) / 2;
                    scroller.scrollLeft -= mx - pinch.mx;
                    scroller.scrollTop -= my - pinch.my;
                    pinch.mx = mx;
                    pinch.my = my
                }
            }, {
                passive: false
            });
            scroller.addEventListener('touchend', e => {
                if (e.touches.length < 2) pinch = null;
                if (!e.touches.length) touchDown.clear()
            });
            $('#nr-minus').onclick = () => pdfDoc && setScale(scale / 1.15);
            $('#nr-plus').onclick = () => pdfDoc && setScale(scale * 1.15);
            $('#nr-zoom').onclick = () => {
                if (!pdfDoc) return;
                const f = fitWidth();
                setScale(Math.abs(scale - f) < .02 ? 1 : f)
            };
            $('#nr-page').onchange = e => scrollToPage(+e.target.value);
            $('#nr-page').onkeydown = e => {
                if (e.key === 'Enter') {
                    e.target.blur();
                    scrollToPage(+e.target.value)
                }
            };

            function setBox(el, o) {
                const s = el.style;
                s.setProperty('--x', o.x);
                s.setProperty('--y', o.y);
                s.setProperty('--w', o.w);
                s.setProperty('--h', o.h);
                el.classList.toggle('bar-below', o.y < 34)
            }

            function applyObjStyle(el, o) {
                const s = el.style;
                setBox(el, o);
                s.setProperty('--fs', o.fs);
                s.setProperty('--tc', o.color);
                if (o.type === 'sticky') s.setProperty('--paper', o.paper);
                if (o.type === 'shape') {
                    s.setProperty('--stroke', o.stroke);
                    s.setProperty('--lw', o.lw);
                    s.setProperty('--fill', o.fill || 'transparent');
                    el.className = el.className.replace(/shape-\w+/, 'shape-' + o.shape);
                    el.classList.toggle('nofill', !o.fill);
                    const t0 = el.querySelector('.pdf-obj-text');
                    if (t0) {
                        t0.tabIndex = o.fill ? 0 : -1;
                        if (!o.fill && document.activeElement === t0) t0.blur()
                    }
                }
                const ta = el.querySelector('.pdf-obj-text');
                if (ta) {
                    ta.style.fontFamily = FAM[o.family] || FAM.sans;
                    ta.style.fontWeight = o.bold ? '800' : '500'
                }
            }

            function objEl(v, o) {
                norm(o);
                const el = document.createElement('div');
                el.className = 'pdf-obj ' + (o.type === 'sticky' ? 'sticky' : o.type === 'textbox' ? 'textbox' : 'shape shape-' + o.shape);
                el.dataset.id = o.id;
                const bar = document.createElement('div');
                bar.className = 'pdf-obj-bar';
                const grip = document.createElement('button');
                grip.type = 'button';
                grip.className = 'grip';
                grip.title = L('Move', 'تحريك');
                grip.textContent = '✥';
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'del';
                del.title = L('Delete', 'حذف');
                del.textContent = '×';
                bar.append(grip, del);
                const ta = document.createElement('textarea');
                ta.className = 'pdf-obj-text';
                ta.dir = 'auto';
                ta.spellcheck = false;
                ta.value = o.text || '';
                ta.placeholder = o.type === 'sticky' ? L('Add a note…', 'أضف ملاحظة…') : L('Type here…', 'اكتب هنا…');
                el.append(bar, ta);
                for (const d of ['nw', 'ne', 'sw', 'se']) {
                    const h = document.createElement('div');
                    h.className = 'rz rz-' + d;
                    h.dataset.dir = d;
                    el.appendChild(h);
                    h.addEventListener('pointerdown', e => dragObj(e, v, o, el, 'resize', d))
                }
                applyObjStyle(el, o);
                grip.addEventListener('pointerdown', e => dragObj(e, v, o, el, 'move'));
                del.addEventListener('pointerdown', e => e.stopPropagation());
                del.addEventListener('click', e => {
                    e.stopPropagation();
                    deleteObj(v, o)
                });
                el.addEventListener('pointerdown', e => {
                    if (e.target.closest('.pdf-obj-bar,.rz')) return;
                    e.stopPropagation();
                    selectObj(v, o, el)
                });
                ta.addEventListener('focus', () => {
                    selectObj(v, o, el);
                    el.classList.add('editing')
                });
                ta.addEventListener('input', () => {
                    o.text = ta.value;
                    if (o.type === 'textbox') {
                        const need = Math.min(ta.scrollHeight / scale, v.ph - o.y);
                        if (need > o.h + 1) {
                            o.h = Math.ceil(need);
                            setBox(el, o)
                        }
                    }
                    persist()
                });
                ta.addEventListener('blur', e => {
                    el.classList.remove('editing');
                    if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.reader-options,.reader-tools,.reader-shapes,.reader-head')) return;
                    finishEdit(v, o)
                });
                ta.addEventListener('keydown', e => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        ta.blur();
                        clearSel()
                    }
                    e.stopPropagation()
                });
                return el
            }

            function finishEdit(v, o) {
                if (o.type === 'textbox' && !(o.text || '').trim()) {
                    deleteObj(v, o, true);
                    return
                }
                for (let i = undo.length - 1; i >= 0; i--) {
                    const h = undo[i];
                    if (h.op === 'add' && h.type === 'object' && h.after.id === o.id) {
                        h.after = structuredClone(o);
                        break
                    }
                }
                persist()
            }

            function deleteObj(v, o, silent) {
                const l = pageAnn(v.n).objects,
                    i = l.findIndex(x => x.id === o.id);
                if (i < 0) return;
                const before = structuredClone(l[i]);
                l.splice(i, 1);
                if (!silent) pushH({
                    n: v.n,
                    type: 'object',
                    op: 'del',
                    before,
                    index: i
                });
                else {
                    for (let k = undo.length - 1; k >= 0; k--) {
                        if (undo[k].after && undo[k].after.id === o.id && undo[k].op === 'add') {
                            undo.splice(k, 1);
                            break
                        }
                    }
                    updHist()
                }
                if (sel && sel.id === o.id) sel = null;
                renderObjects(v);
                buildOptions();
                persist()
            }

            function renderObjects(v) {
                if (!v.objLayer) return;
                v.objLayer.replaceChildren();
                for (const o of pageAnn(v.n).objects) {
                    if (v.pw && v.ph) {
                        o.w = Math.min(o.w, v.pw);
                        o.h = Math.min(o.h, v.ph);
                        o.x = clamp(o.x, 0, Math.max(0, v.pw - o.w));
                        o.y = clamp(o.y, 0, Math.max(0, v.ph - o.h))
                    }
                    const el = objEl(v, o);
                    v.objLayer.appendChild(el);
                    if (sel && sel.id === o.id) el.classList.add('sel')
                }
                if (selStroke && selStroke.n === v.n) mountStrokeSel(v)
            }

            function objElOf(id) {
                return scroller.querySelector('.pdf-obj[data-id="' + id + '"]')
            }

            function selObj() {
                if (!sel) return null;
                return pageAnn(sel.n).objects.find(o => o.id === sel.id) || null
            }

            function selectObj(v, o, el) {
                if (sel && sel.id === o.id && el.classList.contains('sel')) return;
                $$('.pdf-obj.sel').forEach(x => x.classList.remove('sel'));
                el.classList.add('sel');
                sel = {
                    n: v.n,
                    id: o.id
                };
                $('#nr-shapes').classList.toggle('open', o.type === 'shape');
                syncShapeButtons(o.shape);
                buildOptions()
            }

            function clearSel() {
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) ae.blur();
                $$('.pdf-obj.sel').forEach(x => x.classList.remove('sel'));
                if (sel) {
                    sel = null
                }
                $('#nr-shapes').classList.toggle('open', tool === 'shape');
                syncShapeButtons(cfg.shape.kind);
                buildOptions()
            }

            function dragObj(e, v, o, el, mode, dir) {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                selectObj(v, o, el);
                const tg = e.currentTarget;
                try {
                    tg.setPointerCapture(e.pointerId)
                } catch (x) {}
                const sx = e.clientX,
                    sy = e.clientY,
                    b0 = {
                        x: o.x,
                        y: o.y,
                        w: o.w,
                        h: o.h
                    },
                    before = structuredClone(o),
                    s = scale;
                let raf = 0,
                    cur = null;
                const minW = o.type === 'textbox' ? 60 : 80,
                    minH = o.type === 'textbox' ? 30 : 50;
                const apply = () => {
                    raf = 0;
                    if (!cur) return;
                    const dx = (cur.x - sx) / s,
                        dy = (cur.y - sy) / s;
                    let {
                        x,
                        y,
                        w,
                        h
                    } = b0;
                    const pad = o.shape === 'speech' ? 16 : 0;
                    if (mode === 'move') {
                        x = clamp(b0.x + dx, 0, Math.max(0, v.pw - b0.w));
                        y = clamp(b0.y + dy, 0, Math.max(0, v.ph - pad - b0.h))
                    } else {
                        if (dir.includes('e')) w = clamp(b0.w + dx, minW, Math.max(minW, v.pw - b0.x));
                        if (dir.includes('s')) h = clamp(b0.h + dy, minH, Math.max(minH, v.ph - pad - b0.y));
                        if (dir.includes('w')) {
                            const nw = clamp(b0.w - dx, minW, Math.max(minW, b0.x + b0.w));
                            x = b0.x + b0.w - nw;
                            w = nw
                        }
                        if (dir.includes('n')) {
                            const nh = clamp(b0.h - dy, minH, Math.max(minH, b0.y + b0.h));
                            y = b0.y + b0.h - nh;
                            h = nh
                        }
                    }
                    o.x = x;
                    o.y = y;
                    o.w = w;
                    o.h = h;
                    setBox(el, o)
                };
                const mv = q => {
                    cur = {
                        x: q.clientX,
                        y: q.clientY
                    };
                    if (!raf) raf = requestAnimationFrame(apply)
                };
                const up = () => {
                    tg.removeEventListener('pointermove', mv);
                    tg.removeEventListener('pointerup', up);
                    tg.removeEventListener('pointercancel', up);
                    if (raf) cancelAnimationFrame(raf);
                    apply();
                    if (o.x !== before.x || o.y !== before.y || o.w !== before.w || o.h !== before.h) {
                        pushH({
                            n: v.n,
                            type: 'object',
                            op: 'mod',
                            before,
                            after: structuredClone(o)
                        });
                        persist()
                    }
                };
                tg.addEventListener('pointermove', mv);
                tg.addEventListener('pointerup', up);
                tg.addEventListener('pointercancel', up)
            }

            function newObject(kind, box) {
                const o = {
                    id: uid('o'),
                    type: kind === 'text' ? 'textbox' : kind,
                    shape: kind === 'shape' ? cfg.shape.kind : '',
                    x: box.x,
                    y: box.y,
                    w: box.w,
                    h: box.h,
                    text: ''
                };
                if (kind === 'text') {
                    Object.assign(o, {
                        color: cfg.text.color,
                        fs: cfg.text.size,
                        bold: cfg.text.bold,
                        family: cfg.text.family
                    })
                } else if (kind === 'sticky') {
                    Object.assign(o, {
                        paper: cfg.sticky.paper,
                        fs: cfg.sticky.size,
                        color: cfg.sticky.textColor,
                        family: 'sans',
                        bold: false
                    })
                } else {
                    Object.assign(o, {
                        stroke: cfg.shape.stroke,
                        lw: cfg.shape.width,
                        fill: cfg.shape.fillOn ? cfg.shape.fill : '',
                        color: cfg.shape.textColor,
                        fs: 14,
                        family: 'sans',
                        bold: false
                    })
                }
                return norm(o)
            }

            function startCreate(e, v, x, y) {
                const ink = v.ink;
                try {
                    ink.setPointerCapture(e.pointerId)
                } catch (z) {}
                const pv = document.createElement('div');
                pv.className = 'pdf-create-preview' + (tool === 'shape' ? ' p-' + cfg.shape.kind : '');
                if (tool === 'shape') {
                    pv.style.setProperty('--ps', cfg.shape.stroke);
                    pv.style.setProperty('--pf', cfg.shape.fillOn ? cfg.shape.fill : 'transparent');
                    pv.style.setProperty('--pw2', cfg.shape.width)
                }
                v.objLayer.appendChild(pv);
                creating = {
                    v,
                    pid: e.pointerId,
                    cancel: () => end(null, true)
                };
                let moved = false,
                    cx = x,
                    cy = y;
                const at = q => {
                    const r = ink.getBoundingClientRect();
                    return [(q.clientX - r.left) / scale, (q.clientY - r.top) / scale]
                };
                const rect = () => ({
                    x: Math.min(x, cx),
                    y: Math.min(y, cy),
                    w: Math.abs(cx - x),
                    h: Math.abs(cy - y)
                });
                const draw = () => {
                    const r = rect();
                    pv.style.setProperty('--x', r.x);
                    pv.style.setProperty('--y', r.y);
                    pv.style.setProperty('--w', r.w);
                    pv.style.setProperty('--h', r.h)
                };
                const mv = q => {
                    [cx, cy] = at(q);
                    if (Math.hypot(cx - x, cy - y) > 8) moved = true;
                    if (moved) draw()
                };
                const end = (q, cancel) => {
                    ink.removeEventListener('pointermove', mv);
                    ink.removeEventListener('pointerup', up);
                    ink.removeEventListener('pointercancel', cn);
                    pv.remove();
                    creating = null;
                    if (cancel) return;
                    const kind = tool;
                    let b;
                    if (moved) {
                        const r = rect();
                        b = {
                            x: r.x,
                            y: r.y,
                            w: Math.max(r.w, kind === 'text' ? 80 : 110),
                            h: Math.max(r.h, kind === 'text' ? 32 : 70)
                        }
                    } else if (kind === 'text') b = {
                        x: x,
                        y: y - 14,
                        w: 230,
                        h: 36
                    };
                    else if (kind === 'sticky') b = {
                        x: x - 100,
                        y: y - 20,
                        w: 200,
                        h: 150
                    };
                    else b = {
                        x: x - 85,
                        y: y - 55,
                        w: 170,
                        h: 110
                    };
                    b.w = Math.min(b.w, v.pw);
                    b.h = Math.min(b.h, v.ph - (kind === 'shape' && cfg.shape.kind === 'speech' ? 16 : 0));
                    b.x = clamp(b.x, 0, Math.max(0, v.pw - b.w));
                    b.y = clamp(b.y, 0, Math.max(0, v.ph - (kind === 'shape' && cfg.shape.kind === 'speech' ? 16 : 0) - b.h));
                    const o = newObject(kind, b);
                    const l = pageAnn(v.n).objects;
                    l.push(o);
                    pushH({
                        n: v.n,
                        type: 'object',
                        op: 'add',
                        after: structuredClone(o),
                        index: l.length - 1
                    });
                    persist();
                    renderObjects(v);
                    const el = objElOf(o.id);
                    if (el) {
                        selectObj(v, o, el);
                        if (!(o.type === 'shape' && !o.fill)) setTimeout(() => {
                            const ta = el.querySelector('textarea');
                            ta && ta.focus()
                        }, 30)
                    }
                };
                const up = q => end(q, false),
                    cn = q => end(q, true);
                ink.addEventListener('pointermove', mv);
                ink.addEventListener('pointerup', up);
                ink.addEventListener('pointercancel', cn)
            }

            function startPan(e, ink) {
                try {
                    ink.setPointerCapture(e.pointerId)
                } catch (z) {}
                let lx = e.clientX,
                    ly = e.clientY;
                reader.classList.add('panning');
                const mv = q => {
                    scroller.scrollLeft -= q.clientX - lx;
                    scroller.scrollTop -= q.clientY - ly;
                    lx = q.clientX;
                    ly = q.clientY
                };
                const up = () => {
                    ink.removeEventListener('pointermove', mv);
                    ink.removeEventListener('pointerup', up);
                    ink.removeEventListener('pointercancel', up);
                    reader.classList.remove('panning')
                };
                ink.addEventListener('pointermove', mv);
                ink.addEventListener('pointerup', up);
                ink.addEventListener('pointercancel', up)
            }
            function bindInk(v) {
                const ink = v.ink;
                ink.addEventListener('pointerdown', e => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    if (e.pointerType === 'touch' && (touchDown.size > 1 || !e.isPrimary)) {
                        abortGesture();
                        return
                    }
                    const ae = document.activeElement,
                        wasEditing = !!(ae && ae.classList && ae.classList.contains('pdf-obj-text'));
                    const r = ink.getBoundingClientRect(),
                        x = (e.clientX - r.left) / scale,
                        y = (e.clientY - r.top) / scale;
                    if (wasEditing) ae.blur();
                    if (tool === 'text' || tool === 'sticky' || tool === 'shape') {
                        e.preventDefault();
                        if (wasEditing) {
                            clearSel();
                            return
                        }
                        clearSel();
                        startCreate(e, v, x, y);
                        return
                    }
                    if (tool === 'pan') {
                        const nowT = performance.now(),
                            dbl = lastTap && lastTap.n === v.n && nowT - lastTap.t < 450 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30;
                        lastTap = {
                            t: nowT,
                            x: e.clientX,
                            y: e.clientY,
                            n: v.n
                        };
                        if (dbl) {
                            const hit = hitStroke(v, x, y);
                            if (hit) {
                                lastTap = null;
                                e.preventDefault();
                                selectStroke(v, hit);
                                return
                            }
                        }
                        clearStrokeSel();
                        clearSel();
                        if (e.pointerType !== 'touch') {
                            e.preventDefault();
                            startPan(e, ink)
                        }
                        return
                    }
                    clearSel();
                    e.preventDefault();
                    const c = cfg[tool];
                    try {
                        ink.setPointerCapture(e.pointerId)
                    } catch (z) {}
                    const st = {
                        id: uid('s'),
                        tool,
                        color: c.color || '#000',
                        size: c.size,
                        points: [
                            [x, y]
                        ]
                    };
                    drawing = {
                        v,
                        st,
                        pid: e.pointerId,
                        live: null,
                        raf: 0
                    };
                    if (tool !== 'eraser') {
                        const lv = document.createElement('canvas');
                        lv.className = 'pdf-live';
                        lv.width = ink.width;
                        lv.height = ink.height;
                        v.wrap.insertBefore(lv, v.objLayer);
                        drawing.live = lv;
                        paintLive()
                    }
                });
                ink.addEventListener('pointermove', e => {
                    if (!drawing || drawing.v !== v || drawing.pid !== e.pointerId) return;
                    const r = ink.getBoundingClientRect(),
                        pts = drawing.st.points,
                        evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
                    for (const q of (evs.length ? evs : [e])) {
                        const x = (q.clientX - r.left) / scale,
                            y = (q.clientY - r.top) / scale,
                            last = pts[pts.length - 1];
                        if (Math.hypot(x - last[0], y - last[1]) > .5) {
                            pts.push([x, y]);
                            if (drawing.st.tool === 'eraser') {
                                const ctx = ink.getContext('2d'),
                                    a = pts[pts.length - 2],
                                    b = pts[pts.length - 1];
                                drawInkStroke(ctx, {
                                    ...drawing.st,
                                    points: [a, b]
                                }, v.rs || 1)
                            }
                        }
                    }
                    if (drawing.live && !drawing.raf) drawing.raf = requestAnimationFrame(paintLive)
                });
                const finish = e => {
                    if (!drawing || drawing.v !== v || (e && e.pointerId != null && drawing.pid !== e.pointerId)) return;
                    const {
                        st,
                        live
                    } = drawing;
                    if (drawing.raf) cancelAnimationFrame(drawing.raf);
                    if (st.points.length === 1) st.points.push([st.points[0][0] + .1, st.points[0][1] + .1]);
                    if (live) {
                        drawInkStroke(v.ink.getContext('2d'), st, v.rs || 1);
                        live.remove()
                    } else drawInkStroke(v.ink.getContext('2d'), {
                        ...st,
                        points: st.points.slice(-2)
                    }, v.rs || 1);
                    const l = pageAnn(v.n).strokes;
                    l.push(st);
                    pushH({
                        n: v.n,
                        type: 'stroke',
                        op: 'add',
                        after: structuredClone(st),
                        index: l.length - 1
                    });
                    drawing = null;
                    persist()
                };
                ['pointerup', 'pointercancel'].forEach(k => ink.addEventListener(k, finish))
            }
            let selStroke = null,
                lastTap = null,
                strokeDrag = null;

            function strokeBox(st) {
                let x1 = 1e9,
                    y1 = 1e9,
                    x2 = -1e9,
                    y2 = -1e9;
                for (const p of st.points) {
                    if (p[0] < x1) x1 = p[0];
                    if (p[1] < y1) y1 = p[1];
                    if (p[0] > x2) x2 = p[0];
                    if (p[1] > y2) y2 = p[1]
                }
                const pad = st.size / 2 + 5;
                return {
                    x: x1 - pad,
                    y: y1 - pad,
                    w: x2 - x1 + pad * 2,
                    h: y2 - y1 + pad * 2
                }
            }

            function segDist(px, py, a, b) {
                const dx = b[0] - a[0],
                    dy = b[1] - a[1],
                    l2 = dx * dx + dy * dy;
                let t = l2 ? ((px - a[0]) * dx + (py - a[1]) * dy) / l2 : 0;
                t = Math.max(0, Math.min(1, t));
                return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy))
            }

            function hitStroke(v, x, y) {
                const list = pageAnn(v.n).strokes,
                    tol = Math.max(8, 14 / scale);
                for (let i = list.length - 1; i >= 0; i--) {
                    const st = list[i];
                    if (st.tool === 'eraser' || !st.points || !st.points.length) continue;
                    const r = st.size / 2 + tol,
                        pts = st.points;
                    if (pts.length === 1) {
                        if (Math.hypot(x - pts[0][0], y - pts[0][1]) <= r) return st;
                        continue
                    }
                    for (let j = 1; j < pts.length; j++)
                        if (segDist(x, y, pts[j - 1], pts[j]) <= r) return st
                }
                return null
            }

            function clearStrokeSel() {
                if (strokeDrag) strokeDrag.cancel();
                if (selStroke) {
                    const v = views[selStroke.n - 1];
                    if (v && v.objLayer) {
                        const e = v.objLayer.querySelector('.pdf-strokesel');
                        if (e) e.remove()
                    }
                    selStroke = null
                }
            }

            function placeStrokeSel(st, el) {
                const b = strokeBox(st),
                    s = el.style;
                s.setProperty('--x', b.x);
                s.setProperty('--y', b.y);
                s.setProperty('--w', b.w);
                s.setProperty('--h', b.h)
            }

            function selectStroke(v, st) {
                clearStrokeSel();
                clearSel();
                selStroke = {
                    n: v.n,
                    id: st.id
                };
                mountStrokeSel(v)
            }

            function mountStrokeSel(v) {
                const st = pageAnn(v.n).strokes.find(x => x.id === selStroke.id);
                if (!st) {
                    selStroke = null;
                    return
                }
                const old = v.objLayer.querySelector('.pdf-strokesel');
                if (old) old.remove();
                const el = document.createElement('div');
                el.className = 'pdf-strokesel';
                el.title = L('Drag to move', 'اسحب للتحريك');
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'ss-del';
                del.textContent = '×';
                del.title = L('Delete', 'حذف');
                el.appendChild(del);
                placeStrokeSel(st, el);
                v.objLayer.appendChild(el);
                del.addEventListener('pointerdown', e => e.stopPropagation());
                del.addEventListener('click', e => {
                    e.stopPropagation();
                    const list = pageAnn(v.n).strokes,
                        i = list.findIndex(x => x.id === st.id);
                    if (i < 0) return;
                    const before = structuredClone(list[i]);
                    list.splice(i, 1);
                    pushH({
                        n: v.n,
                        type: 'stroke',
                        op: 'del',
                        before,
                        index: i
                    });
                    clearStrokeSel();
                    drawInkAll(v);
                    persist()
                });
                el.addEventListener('pointerdown', e => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    if (e.pointerType === 'touch' && (touchDown.size > 1 || !e.isPrimary)) return;
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                        el.setPointerCapture(e.pointerId)
                    } catch (z) {}
                    const orig = structuredClone(st.points),
                        before = structuredClone(st),
                        sx = e.clientX,
                        sy = e.clientY;
                    let moved = false,
                        raf = 0,
                        dx = 0,
                        dy = 0;
                    const put = () => {
                        st.points = orig.map(p => [p[0] + dx, p[1] + dy]);
                        placeStrokeSel(st, el);
                        drawInkAll(v)
                    };
                    const apply = () => {
                        raf = 0;
                        put()
                    };
                    const mv = q => {
                        if (q.pointerId !== e.pointerId) return;
                        dx = (q.clientX - sx) / scale;
                        dy = (q.clientY - sy) / scale;
                        if (!moved && Math.hypot(dx, dy) * scale < 4) return;
                        moved = true;
                        if (!raf) raf = requestAnimationFrame(apply)
                    };
                    const end = (cancel) => {
                        el.removeEventListener('pointermove', mv);
                        el.removeEventListener('pointerup', up);
                        el.removeEventListener('pointercancel', cn);
                        strokeDrag = null;
                        if (raf) cancelAnimationFrame(raf);
                        if (cancel || !moved) {
                            st.points = orig;
                            placeStrokeSel(st, el);
                            drawInkAll(v);
                            return
                        }
                        put();
                        pushH({
                            n: v.n,
                            type: 'stroke',
                            op: 'mod',
                            before,
                            after: structuredClone(st)
                        });
                        persist()
                    };
                    const up = q => {
                            if (q.pointerId === e.pointerId) end(false)
                        },
                        cn = q => {
                            if (q.pointerId === e.pointerId) end(true)
                        };
                    strokeDrag = {
                        cancel: () => end(true)
                    };
                    el.addEventListener('pointermove', mv);
                    el.addEventListener('pointerup', up);
                    el.addEventListener('pointercancel', cn)
                })
            }
            document.addEventListener('keydown', e => {
                if (!selStroke || !reader.classList.contains('open')) return;
                const t = e.target;
                if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
                if (e.key === 'Escape') {
                    clearStrokeSel();
                    return
                }
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    const v = views[selStroke.n - 1],
                        list = pageAnn(selStroke.n).strokes,
                        i = list.findIndex(x => x.id === selStroke.id);
                    if (i >= 0) {
                        e.preventDefault();
                        const before = structuredClone(list[i]);
                        list.splice(i, 1);
                        pushH({
                            n: selStroke.n,
                            type: 'stroke',
                            op: 'del',
                            before,
                            index: i
                        });
                        clearStrokeSel();
                        if (v) drawInkAll(v);
                        persist()
                    }
                }
            });

            function paintLive() {
                if (!drawing || !drawing.live) return;
                drawing.raf = 0;
                const lv = drawing.live,
                    ctx = lv.getContext('2d');
                ctx.clearRect(0, 0, lv.width, lv.height);
                drawInkStroke(ctx, drawing.st, drawing.v.rs || 1)
            }

            const PAL = {
                ink: ['#253b34', '#278f79', '#3478c7', '#d4576e', '#e5a02d', '#7a56b8', '#ffffff'],
                hl: ['#f2c230', '#7ddc6a', '#ff7aa8', '#59c3ff', '#ff9c40'],
                paper: ['#fff1b3', '#ffd6e0', '#d6ecff', '#d7f5dc', '#ffe0b8', '#e9dcff'],
                fill: ['#e3f5eb', '#fff1b3', '#d6ecff', '#ffd6e0', '#ffffff']
            };

            function el(tag, cls, html) {
                const e = document.createElement(tag);
                if (cls) e.className = cls;
                if (html != null) e.innerHTML = html;
                return e
            }

            function grp(label, ...nodes) {
                const g = el('span', 'opt-grp');
                if (label) g.appendChild(el('span', 'opt-lab', label));
                nodes.forEach(n => g.appendChild(n));
                return g
            }

            function swatches(list, get, set) {
                const wrap = el('span', 'opt-sw');
                const paint = () => {
                    [...wrap.querySelectorAll('.reader-swatch')].forEach(b => b.classList.toggle('on', b.dataset.c.toLowerCase() === String(get()).toLowerCase()))
                };
                list.forEach(c => {
                    const b = el('button', 'reader-swatch');
                    b.type = 'button';
                    b.dataset.c = c;
                    b.style.background = c;
                    b.title = c;
                    b.onclick = () => {
                        set(c);
                        inp.value = c;
                        paint()
                    };
                    wrap.appendChild(b)
                });
                const inp = el('input');
                inp.type = 'color';
                inp.value = toHex(get());
                inp.oninput = () => {
                    set(inp.value);
                    paint()
                };
                inp.title = L('Custom colour', 'لون مخصص');
                wrap.appendChild(inp);
                paint();
                return wrap
            }

            function toHex(c) {
                return /^#[0-9a-f]{6}$/i.test(c) ? c : '#000000'
            }

            function range(min, max, get, set, fmt) {
                const w = el('span', 'opt-rng'),
                    r = el('input');
                r.type = 'range';
                r.min = min;
                r.max = max;
                r.step = 1;
                r.value = get();
                const lab = el('span', 'opt-val', String(get()));
                r.oninput = () => {
                    set(+r.value);
                    lab.textContent = r.value
                };
                w.append(r, lab);
                return w
            }

            function toggle(text, get, set, title) {
                const b = el('button', 'opt-tg', text);
                b.type = 'button';
                if (title) b.title = title;
                const p = () => b.classList.toggle('on', !!get());
                b.onclick = () => {
                    set(!get());
                    p()
                };
                p();
                return b
            }
            function setProp(mode, key, val) {
                cfg[mode][key] = val;
                saveCfg();
                const o = selObj();
                if (!o || toolOfObj(o) !== mode) return;
                const map = {
                    text: {
                        color: 'color',
                        size: 'fs',
                        bold: 'bold',
                        family: 'family'
                    },
                    sticky: {
                        paper: 'paper',
                        size: 'fs',
                        textColor: 'color'
                    },
                    shape: {
                        stroke: 'stroke',
                        width: 'lw',
                        fill: 'fill',
                        kind: 'shape',
                        textColor: 'color'
                    }
                } [mode];
                let prop = map && map[key];
                if (mode === 'shape' && key === 'fillOn') {
                    prop = 'fill';
                    val = val ? cfg.shape.fill : ''
                }
                if (!prop) return;
                const now = Date.now();
                if (!(lastMod && lastMod.id === o.id && lastMod.key === prop && now - lastMod.t < 900)) {
                    lastMod = {
                        id: o.id,
                        key: prop,
                        t: now,
                        h: {
                            n: sel.n,
                            type: 'object',
                            op: 'mod',
                            before: structuredClone(o),
                            after: null
                        }
                    };
                    pushH(lastMod.h)
                }
                lastMod.t = now;
                o[prop] = val;
                lastMod.h.after = structuredClone(o);
                const e = objElOf(o.id);
                if (e) applyObjStyle(e, o);
                persist()
            }

            function buildOptions() {
                const box = $('#nr-options');
                if (!box) return;
                const o = selObj(),
                    mode = o ? toolOfObj(o) : tool;
                box.replaceChildren();
                reader.dataset.panel = mode;
                if (mode === 'pan') {
                    box.hidden = true;
                    return
                }
                box.hidden = false;
                const names = {
                    pen: L('Pen', 'القلم'),
                    highlighter: L('Highlighter', 'التظليل'),
                    eraser: L('Eraser', 'الممحاة'),
                    text: L('Text', 'النص'),
                    sticky: L('Sticky note', 'الملصق'),
                    shape: L('Shape', 'الشكل')
                };
                const c = cfg[mode],
                    cur = (key, prop) => o && o[prop] != null ? o[prop] : c[key];
                box.appendChild(el('span', 'opt-title', (o ? L('Selected · ', 'المحدد · ') : '') + names[mode]));
                const add = n => box.appendChild(n);
                if (mode === 'pen') {
                    add(grp(L('Colour', 'اللون'), swatches(PAL.ink, () => c.color, v => setProp('pen', 'color', v))));
                    add(grp(L('Size', 'الحجم'), range(1, 28, () => c.size, v => setProp('pen', 'size', v))))
                } else if (mode === 'highlighter') {
                    add(grp(L('Colour', 'اللون'), swatches(PAL.hl, () => c.color, v => setProp('highlighter', 'color', v))));
                    add(grp(L('Size', 'الحجم'), range(6, 96, () => c.size, v => setProp('highlighter', 'size', v))))
                } else if (mode === 'eraser') {
                    add(grp(L('Size', 'الحجم'), range(6, 160, () => c.size, v => setProp('eraser', 'size', v))))
                } else if (mode === 'text') {
                    add(grp(L('Text colour', 'لون النص'), swatches(PAL.ink, () => cur('color', 'color'), v => setProp('text', 'color', v))));
                    add(grp(L('Font size', 'حجم الخط'), range(8, 192, () => cur('size', 'fs'), v => setProp('text', 'size', v))));
                    const sel2 = el('select');
                    sel2.innerHTML = `<option value="sans">${L('Sans','عادي')}</option><option value="serif">${L('Serif','مزخرف')}</option><option value="mono">${L('Mono','ثابت')}</option>`;
                    sel2.value = cur('family', 'family');
                    sel2.onchange = () => setProp('text', 'family', sel2.value);
                    add(grp(L('Font', 'الخط'), sel2));
                    add(toggle('B', () => cur('bold', 'bold'), v => setProp('text', 'bold', v), L('Bold', 'عريض')))
                } else if (mode === 'sticky') {
                    add(grp(L('Paper', 'لون الورقة'), swatches(PAL.paper, () => cur('paper', 'paper'), v => setProp('sticky', 'paper', v))));
                    add(grp(L('Text colour', 'لون النص'), swatches(PAL.ink, () => cur('textColor', 'color'), v => setProp('sticky', 'textColor', v))));
                    add(grp(L('Font size', 'حجم الخط'), range(9, 96, () => cur('size', 'fs'), v => setProp('sticky', 'size', v))))
                } else if (mode === 'shape') {
                    add(grp(L('Outline', 'الحدود'), swatches(PAL.ink, () => cur('stroke', 'stroke'), v => setProp('shape', 'stroke', v))));
                    add(grp(L('Thickness', 'السمك'), range(1, 24, () => cur('width', 'lw'), v => setProp('shape', 'width', v))));
                    const fillNow = o ? !!o.fill : c.fillOn;
                    add(grp(L('Fill', 'التعبئة'), swatches(PAL.fill, () => cur('fill', 'fill'), v => {
                        c.fillOn = true;
                        setProp('shape', 'fill', v);
                        if (!o) saveCfg()
                    })));
                    add(toggle(L('No fill', 'بدون تعبئة'), () => o ? !o.fill : !c.fillOn, v => {
                        if (o) {
                            setProp('shape', 'fillOn', !v)
                        } else {
                            c.fillOn = !v;
                            saveCfg()
                        }
                    }));
                    add(grp(L('Text colour', 'لون النص'), swatches(PAL.ink, () => cur('textColor', 'color'), v => setProp('shape', 'textColor', v))))
                }
            }

            function syncShapeButtons(kind) {
                $$('[data-pdf-shape]').forEach(b => b.classList.toggle('active', b.dataset.pdfShape === kind))
            }

            function setTool(t) {
                clearStrokeSel();
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) ae.blur();
                tool = t;
                sel = null;
                $$('.pdf-obj.sel').forEach(x => x.classList.remove('sel'));
                reader.dataset.tool = t;
                brush.style.display = 'none';
                $$('[data-pdf-tool]').forEach(b => b.classList.toggle('active', b.dataset.pdfTool === t));
                $('#nr-shapes').classList.toggle('open', t === 'shape');
                syncShapeButtons(cfg.shape.kind);
                buildOptions()
            }
            $$('[data-pdf-tool]').forEach(b => b.addEventListener('click', () => setTool(b.dataset.pdfTool)));
            $$('[data-pdf-shape]').forEach(b => b.addEventListener('click', () => {
                const k = b.dataset.pdfShape;
                cfg.shape.kind = k;
                saveCfg();
                const o = selObj();
                if (o && o.type === 'shape') setProp('shape', 'kind', k);
                else if (tool !== 'shape') setTool('shape');
                syncShapeButtons(k)
            }));
            $$('.reader-tools button,.reader-shapes button,.reader-head button').forEach(b => b.addEventListener('pointerdown', e => {
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) e.preventDefault()
            }));

            const brush = document.createElement('div');
            brush.id = 'nr-brush';
            reader.appendChild(brush);

            function brushUpdate(e) {
                const t = tool,
                    tg = e.target;
                if (!(t === 'pen' || t === 'highlighter' || t === 'eraser') || !tg.classList || !tg.classList.contains('pdf-ink') || (e.pointerType === 'touch' && !drawing)) {
                    brush.style.display = 'none';
                    return
                }
                const c = cfg[t],
                    d = Math.max(t === 'eraser' ? 10 : 6, c.size * scale);
                brush.dataset.t = t;
                brush.style.display = 'block';
                brush.style.width = brush.style.height = d + 'px';
                brush.style.transform = 'translate(' + (e.clientX - d / 2) + 'px,' + (e.clientY - d / 2) + 'px)';
                brush.style.setProperty('--bc', c.color || '#000')
            }
            scroller.addEventListener('pointermove', brushUpdate);
            scroller.addEventListener('pointerdown', brushUpdate);
            scroller.addEventListener('pointerleave', () => {
                brush.style.display = 'none'
            });
            ['pointerup', 'pointercancel'].forEach(k => scroller.addEventListener(k, e => {
                if (e.pointerType === 'touch') brush.style.display = 'none'
            }));
            function applyLang() {
                const names = isAr() ? {
                    pan: 'تحريك الصفحة',
                    pen: 'القلم',
                    highlighter: 'التظليل',
                    eraser: 'الممحاة',
                    text: 'مربع نص',
                    sticky: 'ملصق',
                    shape: 'الأشكال'
                } : {
                    pan: 'Hand',
                    pen: 'Pen',
                    highlighter: 'Highlight',
                    eraser: 'Erase',
                    text: 'Text',
                    sticky: 'Sticky',
                    shape: 'Shapes'
                };
                $$('[data-pdf-tool]').forEach(b => {
                    const l = names[b.dataset.pdfTool];
                    if (l) {
                        b.title = l;
                        b.setAttribute('aria-label', l);
                        const s = b.querySelector('.tool-label');
                        if (s) s.textContent = l
                    }
                });
                $('#nr-undo').title = L('Undo', 'تراجع');
                $('#nr-redo').title = L('Redo', 'إعادة');
                $('#nr-minus').title = L('Zoom out', 'تصغير');
                $('#nr-plus').title = L('Zoom in', 'تكبير');
                $('#nr-zoom').title = L('Fit width / 100%', 'ملاءمة العرض / 100%');
                $('#nr-download').title = L('Download original file', 'تنزيل الملف الأصلي');
                $('#nr-export').textContent = L('Export PDF', 'تصدير PDF');
                $('#nr-close').title = L('Back to library', 'العودة للمكتبة');
                $('#nr-clear').title = L('Clear this session’s edits', 'مسح تعديلات هذه الجلسة');
                $$('[data-pdf-shape]').forEach((b, i) => b.textContent = (isAr() ? ['مستطيل', 'مستطيل دائري', 'دائرة', 'فقاعة'] : ['Rectangle', 'Rounded', 'Circle', 'Callout'])[i]);
                note(L('Annotations are saved on this device. Export a PDF to embed them.', 'التعليقات محفوظة على هذا الجهاز. صدّر PDF لتضمينها داخل الملف.'));
                buildOptions()
            }
            window.addEventListener('novix:lang', applyLang);

            $('#nr-undo').onclick = doUndo;
            $('#nr-redo').onclick = doRedo;
            $('#nr-clear').onclick = async () => {
                if (fileId == null) return;
                if (annSig(ann) === annSig(sessionBase)) {
                    note(L('No edits in this session to clear', 'لا توجد تعديلات في هذه الجلسة لمسحها'));
                    return
                }
                const yes = window.NX_confirm ? await NX_confirm({
                    title: L('Clear this session’s edits?', 'مسح تعديلات هذه الجلسة؟'),
                    msg: L('Only what you drew or wrote since you opened this document will be removed. Earlier saved annotations stay.', 'سيُحذف فقط ما رسمته أو كتبته منذ فتحك لهذا المستند. التعليقات المحفوظة سابقًا تبقى كما هي.'),
                    ok: L('Clear', 'مسح'),
                    danger: true
                }) : confirm(L('Clear this session’s edits?', 'مسح تعديلات هذه الجلسة؟'));
                if (!yes) return;
                ann = JSON.parse(JSON.stringify(sessionBase));
                undo = [];
                redo = [];
                sel = null;
                updHist();
                persist(true);
                views.forEach(v => {
                    if (v.mounted) {
                        drawInkAll(v);
                        renderObjects(v)
                    }
                });
                buildOptions()
            };
            reader.addEventListener('keydown', e => {
                const inText = e.target && e.target.classList && e.target.classList.contains('pdf-obj-text');
                if (inText || (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))) return;
                if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
                    e.preventDefault();
                    doUndo()
                } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
                    e.preventDefault();
                    doRedo()
                } else if ((e.key === 'Delete' || e.key === 'Backspace') && sel) {
                    const v = views[sel.n - 1],
                        o = selObj();
                    if (v && o) {
                        e.preventDefault();
                        deleteObj(v, o)
                    }
                } else if (e.key === 'Escape') {
                    if (sel) clearSel();
                    else closeReader()
                }
            });
            reader.tabIndex = -1;

            async function getFile(id, cb) {
                return window.NXSTORE.get(id, cb)
            }
            let workerState = null;
            const NX_PDF_WORKER = 'assets/js/pdf.worker.js';

            function loadFakeWorker() {
                return new Promise(res => {
                    if (window.pdfjsWorker) {
                        res();
                        return
                    }
                    const sc = document.createElement('script');
                    sc.src = NX_PDF_WORKER;
                    sc.onload = sc.onerror = () => res();
                    document.head.appendChild(sc)
                })
            }
            async function getWorker() {
                if (workerState !== null) return workerState || undefined;
                try {
                    let src = '';
                    try {
                        const r = await fetch(NX_PDF_WORKER);
                        if (r.ok) src = await r.text()
                    } catch (e) {}
                    if (!src || typeof Worker === 'undefined') {
                        await loadFakeWorker();
                        workerState = false;
                        return undefined
                    }
                    const w = new Worker(URL.createObjectURL(new Blob([src], {
                        type: 'text/javascript'
                    })));
                    const ok = await new Promise(res => {
                        let done = false;
                        w.onerror = () => {
                            if (!done) {
                                done = true;
                                res(false)
                            }
                        };
                        setTimeout(() => {
                            if (!done) {
                                done = true;
                                res(true)
                            }
                        }, 60)
                    });
                    if (!ok) {
                        try {
                            w.terminate()
                        } catch (e) {}
                        await loadFakeWorker();
                        workerState = false;
                        return undefined
                    }
                    workerState = new window.pdfjsLib.PDFWorker({
                        port: w
                    });
                    return workerState
                } catch (e) {
                    await loadFakeWorker();
                    workerState = false;
                    return undefined
                }
            }
            setTimeout(() => {
                if (window.pdfjsLib) getWorker()
            }, 300);
            const NXPDF = (() => {
                const WS = new Uint8Array(256),
                    DL = new Uint8Array(256);
                for (const c of ' \t\r\n\f\0') WS[c.charCodeAt(0)] = 1;
                for (const c of '()<>[]{}/%') DL[c.charCodeAt(0)] = 1;
                class Eof extends Error {}
                class Ref {
                    constructor(n, g) {
                        this.n = n;
                        this.g = g
                    }
                }
                class Name {
                    constructor(v) {
                        this.v = v
                    }
                }
                class Raw {
                    constructor(u) {
                        this.u = u
                    }
                }
                class Kw {
                    constructor(v) {
                        this.v = v
                    }
                }
                const dec = u => {
                    let s = '';
                    for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
                    return s
                };
                const isInt = v => typeof v === 'number' && Number.isInteger(v);

                function P(b, p, final) {
                    this.b = b;
                    this.p = p || 0;
                    this.final = !!final
                }
                P.prototype.skip = function() {
                    const b = this.b;
                    while (this.p < b.length) {
                        const c = b[this.p];
                        if (WS[c]) this.p++;
                        else if (c === 37) {
                            while (this.p < b.length && b[this.p] !== 10 && b[this.p] !== 13) this.p++
                        } else return
                    }
                };
                P.prototype.need = function() {
                    if (this.p >= this.b.length) throw new Eof()
                };
                P.prototype.name = function() {
                    const b = this.b;
                    let s = '';
                    while (this.p < b.length && !WS[b[this.p]] && !DL[b[this.p]]) {
                        let c = b[this.p++];
                        if (c === 35 && this.p + 1 < b.length) {
                            const h = parseInt(String.fromCharCode(b[this.p], b[this.p + 1]), 16);
                            if (!isNaN(h)) {
                                c = h;
                                this.p += 2
                            }
                        }
                        s += String.fromCharCode(c)
                    }
                    if (this.p >= b.length && !this.final) throw new Eof();
                    return s
                };
                P.prototype.obj = function() {
                    this.skip();
                    this.need();
                    const b = this.b,
                        c = b[this.p];
                    if (c === 47) {
                        this.p++;
                        return new Name(this.name())
                    }
                    if (c === 60) {
                        if (b[this.p + 1] === 60) {
                            this.p += 2;
                            const d = Object.create(null);
                            for (;;) {
                                this.skip();
                                this.need();
                                if (b[this.p] === 62) {
                                    if (this.p + 1 >= b.length) throw new Eof();
                                    if (b[this.p + 1] === 62) {
                                        this.p += 2;
                                        return d
                                    }
                                }
                                const k = this.obj();
                                if (!(k instanceof Name)) throw new Error('bad dict');
                                d[k.v] = this.obj()
                            }
                        }
                        const s = this.p;
                        while (this.p < b.length && b[this.p] !== 62) this.p++;
                        if (this.p >= b.length) throw new Eof();
                        this.p++;
                        return new Raw(b.slice(s, this.p))
                    }
                    if (c === 91) {
                        this.p++;
                        const a = [];
                        for (;;) {
                            this.skip();
                            this.need();
                            if (b[this.p] === 93) {
                                this.p++;
                                return a
                            }
                            a.push(this.obj())
                        }
                    }
                    if (c === 40) {
                        const s = this.p;
                        let depth = 0;
                        for (;;) {
                            if (this.p >= b.length) throw new Eof();
                            const x = b[this.p++];
                            if (x === 92) this.p++;
                            else if (x === 40) depth++;
                            else if (x === 41 && --depth === 0) break
                        }
                        return new Raw(b.slice(s, this.p))
                    }
                    if (c === 41 || c === 62 || c === 93 || c === 123 || c === 125) throw new Error('unexpected delimiter');
                    const s = this.p;
                    while (this.p < b.length && !WS[b[this.p]] && !DL[b[this.p]]) this.p++;
                    if (this.p >= b.length && !this.final) throw new Eof();
                    const t = dec(b.subarray(s, this.p));
                    if (/^[+-]?\d+$/.test(t)) {
                        const n = parseInt(t, 10);
                        if (n >= 0 && !/^[+-]/.test(t)) {
                            const save = this.p;
                            this.skip();
                            const s2 = this.p;
                            while (this.p < b.length && b[this.p] >= 48 && b[this.p] <= 57) this.p++;
                            if (this.p > s2 && this.p < b.length) {
                                const g = parseInt(dec(b.subarray(s2, this.p)), 10);
                                this.skip();
                                if (b[this.p] === 82 && (this.p + 1 >= b.length || WS[b[this.p + 1]] || DL[b[this.p + 1]])) {
                                    this.p++;
                                    return new Ref(n, g)
                                }
                            } else if (this.p >= b.length && !this.final && this.p > s2) throw new Eof();
                            this.p = save
                        }
                        return n
                    }
                    if (/^[+-]?(\d+\.\d*|\.\d+)$/.test(t)) return parseFloat(t);
                    if (t === 'true') return true;
                    if (t === 'false') return false;
                    if (t === 'null') return null;
                    return new Kw(t)
                };
                const num = (v, d) => typeof v === 'number' ? v : d;
                async function inflate(u8) {
                    const s = new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate'));
                    return new Uint8Array(await new Response(s).arrayBuffer())
                }

                function unpredict(u8, parms) {
                    const pr = num(parms && parms.Predictor, 1);
                    if (pr < 10) return u8;
                    const cols = num(parms.Columns, 1),
                        colors = num(parms.Colors, 1),
                        bpc = num(parms.BitsPerComponent, 8),
                        bpp = Math.max(1, colors * bpc >> 3),
                        rb = Math.ceil(cols * colors * bpc / 8),
                        rows = Math.floor(u8.length / (rb + 1)),
                        out = new Uint8Array(rows * rb);
                    for (let r = 0; r < rows; r++) {
                        const f = u8[r * (rb + 1)],
                            so = r * (rb + 1) + 1,
                            d = r * rb,
                            pd = d - rb;
                        for (let i = 0; i < rb; i++) {
                            const x = u8[so + i],
                                a = i >= bpp ? out[d + i - bpp] : 0,
                                b = r ? out[pd + i] : 0,
                                c = (r && i >= bpp) ? out[pd + i - bpp] : 0;
                            let v;
                            switch (f) {
                                case 0:
                                    v = x;
                                    break;
                                case 1:
                                    v = x + a;
                                    break;
                                case 2:
                                    v = x + b;
                                    break;
                                case 3:
                                    v = x + ((a + b) >> 1);
                                    break;
                                case 4: {
                                    const p = a + b - c,
                                        pa = Math.abs(p - a),
                                        pb = Math.abs(p - b),
                                        pc = Math.abs(p - c);
                                    v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
                                    break
                                }
                                default:
                                    v = x
                            }
                            out[d + i] = v & 255
                        }
                    }
                    return out
                }
                class Lite {
                    constructor(f) {
                        this.f = f;
                        this.xref = new Map();
                        this.cache = new Map();
                        this.os = new Map();
                        this.trailer = null
                    }
                    async read(a, b) {
                        return new Uint8Array(await this.f.slice(Math.max(0, a), Math.min(this.f.size, b)).arrayBuffer())
                    }
                    async parseAt(off) {
                        let size = 8192;
                        for (;;) {
                            const end = Math.min(this.f.size, off + size),
                                b = await this.read(off, end),
                                final = end >= this.f.size;
                            try {
                                const p = new P(b, 0, final),
                                    n = p.obj(),
                                    g = p.obj(),
                                    kw = p.obj();
                                if (!isInt(n) || !(kw instanceof Kw) || kw.v !== 'obj') throw new Error('bad object header');
                                const val = p.obj();
                                p.skip();
                                let stream = null;
                                if (b[p.p] === 115 && dec(b.subarray(p.p, p.p + 6)) === 'stream') {
                                    let q = p.p + 6;
                                    if (b[q] === 13 && b[q + 1] === 10) q += 2;
                                    else if (b[q] === 10 || b[q] === 13) q++;
                                    stream = {
                                        start: off + q
                                    }
                                }
                                return {
                                    n,
                                    g,
                                    val,
                                    stream
                                }
                            } catch (e) {
                                if (e instanceof Eof && !final) {
                                    size *= 4;
                                    continue
                                }
                                throw e
                            }
                        }
                    }
                    async resolve(v) {
                        let i = 0;
                        while (v instanceof Ref && i++ < 20) v = (await this.get(v.n)).val;
                        return v
                    }
                    async get(n) {
                        if (this.cache.has(n)) return this.cache.get(n);
                        const e = this.xref.get(n);
                        if (!e) return {
                            val: null
                        };
                        let o;
                        if (e.t === 1) {
                            o = await this.parseAt(e.off);
                            if (o.n !== n) throw new Error('xref points to the wrong object')
                        } else {
                            o = await this.fromObjStm(e.stm, n)
                        }
                        if (this.cache.size > 4000) this.cache.clear();
                        this.cache.set(n, o);
                        return o
                    }
                    async streamLen(o) {
                        let len = await this.resolve(o.val.Length);
                        const s = o.stream.start;
                        if (isInt(len)) {
                            const t = await this.read(s + len, s + len + 16);
                            if (/^\s*endstream/.test(dec(t))) return len
                        }
                        let pos = s;
                        for (;;) {
                            const ch = await this.read(pos, pos + (4 << 20));
                            if (!ch.length) throw new Error('stream without end');
                            const i = dec(ch).indexOf('endstream');
                            if (i >= 0) {
                                let e = pos + i;
                                const bb = await this.read(e - 2, e);
                                if (bb[1] === 10) e--;
                                if (bb[1] === 10 && bb[0] === 13) e--;
                                else if (bb[1] === 13) e--;
                                return e - s
                            }
                            pos += ch.length - 9;
                            if (pos >= this.f.size) throw new Error('stream without end')
                        }
                    }
                    async decodeStream(o) {
                        const raw = await this.read(o.stream.start, o.stream.start + await this.streamLen(o));
                        let fl = await this.resolve(o.val.Filter),
                            pm = await this.resolve(o.val.DecodeParms);
                        fl = fl == null ? [] : Array.isArray(fl) ? fl : [fl];
                        if (Array.isArray(pm)) pm = pm[0];
                        let data = raw;
                        for (const x of fl) {
                            const nm = (await this.resolve(x)).v;
                            if (nm === 'FlateDecode' || nm === 'Fl') {
                                data = await inflate(data);
                                const p = pm && await this.resolve(pm);
                                if (p) {
                                    const pp = Object.create(null);
                                    for (const k in p) pp[k] = await this.resolve(p[k]);
                                    data = unpredict(data, pp)
                                }
                            } else throw new Error('unsupported stream filter ' + nm)
                        }
                        return data
                    }
                    async fromObjStm(sn, n) {
                        let c = this.os.get(sn);
                        if (!c) {
                            const o = await this.get(sn);
                            if (!o.stream) throw new Error('bad object stream');
                            const data = await this.decodeStream(o),
                                N = await this.resolve(o.val.N),
                                First = await this.resolve(o.val.First),
                                p = new P(data, 0, true),
                                idx = [];
                            for (let i = 0; i < N; i++) idx.push([p.obj(), p.obj()]);
                            c = {
                                data,
                                First,
                                idx
                            };
                            if (this.os.size > 6) this.os.clear();
                            this.os.set(sn, c)
                        }
                        const i = c.idx.findIndex(x => x[0] === n);
                        if (i < 0) return {
                            val: null
                        };
                        return {
                            n,
                            val: new P(c.data, c.First + c.idx[i][1], true).obj()
                        }
                    }
                    async load() {
                        if (this.f.size < 32) throw new Error('file too small');
                        const tail = await this.read(this.f.size - 4096, this.f.size),
                            m = [...dec(tail).matchAll(/startxref\s+(\d+)/g)].pop();
                        if (!m) throw new Error('startxref not found');
                        const seen = new Set(),
                            todo = [+m[1]];
                        while (todo.length) {
                            const off = todo.shift();
                            if (seen.has(off) || off < 0 || off >= this.f.size) continue;
                            seen.add(off);
                            const t = await this.xrefSection(off);
                            if (!this.trailer) this.trailer = t;
                            if (isInt(t.XRefStm)) todo.unshift(t.XRefStm);
                            if (isInt(t.Prev)) todo.push(t.Prev)
                        }
                        if (!this.trailer || !this.trailer.Root) throw new Error('no document root');
                        if (this.trailer.Encrypt) throw new Error('encrypted');
                        const root = await this.resolve(this.trailer.Root),
                            pages = await this.resolve(root.Pages);
                        this.pages = root.Pages;
                        this.numPages = num(await this.resolve(pages.Count), 0);
                        if (!this.numPages) throw new Error('no pages')
                    }
                    async xrefSection(off) {
                        let head = dec(await this.read(off, off + 32));
                        if (/^\s*xref/.test(head)) return this.xrefTable(off);
                        const o = await this.parseAt(off);
                        if (!o.stream || !o.val) throw new Error('bad xref');
                        const d = o.val,
                            data = await this.decodeStream(o),
                            W = (await this.resolve(d.W)).map(x => x | 0),
                            size = num(await this.resolve(d.Size), 0);
                        let idx = await this.resolve(d.Index);
                        idx = idx && idx.length ? idx : [0, size];
                        const rl = W[0] + W[1] + W[2];
                        let p = 0;
                        const rd = w => {
                            let v = 0;
                            for (let i = 0; i < w; i++) v = v * 256 + data[p++];
                            return v
                        };
                        for (let k = 0; k < idx.length; k += 2) {
                            for (let i = 0; i < idx[k + 1] && p + rl <= data.length; i++) {
                                const num_ = idx[k] + i,
                                    t = W[0] ? rd(W[0]) : 1,
                                    a = rd(W[1]),
                                    b = rd(W[2]);
                                if (!this.xref.has(num_)) {
                                    if (t === 1) this.xref.set(num_, {
                                        t: 1,
                                        off: a
                                    });
                                    else if (t === 2) this.xref.set(num_, {
                                        t: 2,
                                        stm: a,
                                        idx: b
                                    });
                                    else this.xref.set(num_, null)
                                }
                            }
                        }
                        const out = Object.create(null);
                        for (const k of ['Root', 'Encrypt', 'Prev', 'Size', 'Info'])
                            if (d[k] != null) out[k] = d[k];
                        return out
                    }
                    async xrefTable(off) {
                        let size = 1 << 20;
                        for (;;) {
                            const end = Math.min(this.f.size, off + size),
                                b = await this.read(off, end),
                                final = end >= this.f.size;
                            try {
                                const p = new P(b, 0, final);
                                p.skip();
                                if (dec(b.subarray(p.p, p.p + 4)) !== 'xref') throw new Error('bad xref');
                                p.p += 4;
                                const pend = [];
                                for (;;) {
                                    p.skip();
                                    p.need();
                                    if (b[p.p] === 116) {
                                        const kw = p.obj();
                                        if (!(kw instanceof Kw) || kw.v !== 'trailer') throw new Error('bad xref');
                                        break
                                    }
                                    const start = p.obj(),
                                        count = p.obj();
                                    if (!isInt(start) || !isInt(count)) throw new Error('bad xref subsection');
                                    for (let i = 0; i < count; i++) {
                                        const a = p.obj(),
                                            g = p.obj(),
                                            k = p.obj();
                                        if (!(k instanceof Kw)) throw new Error('bad xref entry');
                                        pend.push([start + i, k.v === 'n' ? a : -1])
                                    }
                                }
                                const t = p.obj();
                                for (const [n, a] of pend)
                                    if (!this.xref.has(n)) this.xref.set(n, a >= 0 ? {
                                        t: 1,
                                        off: a
                                    } : null);
                                const out = Object.create(null);
                                for (const k in t) out[k] = t[k];
                                for (const k of ['Prev', 'XRefStm', 'Size']) {
                                    const v = await this.resolve(out[k]);
                                    if (v != null) out[k] = v
                                }
                                return out
                            } catch (e) {
                                if (e instanceof Eof && !final) {
                                    size *= 4;
                                    continue
                                }
                                throw e
                            }
                        }
                    }
                    async pageNode(n) {
                        let node = this.pages,
                            idx = n - 1;
                        const inh = Object.create(null);
                        for (let guard = 0; guard < 64; guard++) {
                            const d = await this.resolve(node);
                            for (const k of ['Resources', 'MediaBox', 'CropBox', 'Rotate'])
                                if (d[k] != null) inh[k] = d[k];
                            const kids = await this.resolve(d.Kids);
                            if (!Array.isArray(kids)) return {
                                dict: d,
                                inh
                            };
                            let next = null;
                            for (const k of kids) {
                                const kd = await this.resolve(k);
                                if (kd && (kd.Kids != null || (kd.Type && kd.Type.v === 'Pages'))) {
                                    const c = num(await this.resolve(kd.Count), 0);
                                    if (idx < c) {
                                        next = k;
                                        break
                                    }
                                    idx -= c
                                } else {
                                    if (idx === 0) return {
                                        dict: kd,
                                        inh: {
                                            ...inh
                                        }
                                    };
                                    idx--
                                }
                            }
                            if (!next) throw new Error('page ' + n + ' not found');
                            node = next
                        }
                        throw new Error('page tree too deep')
                    }
                    async pageBlob(n) {
                        const pn = await this.pageNode(n),
                            page = Object.create(null);
                        for (const k in pn.dict) page[k] = pn.dict[k];
                        for (const k in pn.inh)
                            if (page[k] == null) page[k] = pn.inh[k];
                        for (const k of ['Parent', 'Annots', 'Thumb', 'StructParents', 'B', 'AA', 'Metadata', 'PieceInfo', 'Tabs']) delete page[k];
                        page.Type = new Name('Page');
                        const map = new Map(),
                            queue = [];
                        let next = 4;
                        const enc = s => s.replace(/[^!-~]|[#()<>\[\]{}\/%]/g, c => '#' + c.charCodeAt(0).toString(16).padStart(2, '0'));
                        const ser = (v, out) => {
                            if (v instanceof Ref) {
                                let m = map.get(v.n);
                                if (!m) {
                                    m = next++;
                                    map.set(v.n, m);
                                    queue.push(v.n)
                                }
                                out.push(m + ' 0 R')
                            } else if (v instanceof Name) out.push('/' + enc(v.v));
                            else if (v instanceof Raw) out.push(v.u);
                            else if (Array.isArray(v)) {
                                out.push('[');
                                v.forEach((x, i) => {
                                    if (i) out.push(' ');
                                    ser(x, out)
                                });
                                out.push(']')
                            } else if (typeof v === 'number') out.push(Number.isInteger(v) ? String(v) : v.toFixed(6).replace(/0+$/, '').replace(/\.$/, ''));
                            else if (typeof v === 'boolean') out.push(String(v));
                            else if (v === null || v === undefined) out.push('null');
                            else if (v instanceof Kw) out.push(v.v);
                            else if (typeof v === 'object') {
                                out.push('<<');
                                for (const k in v) {
                                    if (k === 'Parent' || v[k] === undefined) continue;
                                    out.push('/' + enc(k) + ' ');
                                    ser(v[k], out);
                                    out.push(' ')
                                }
                                out.push('>>')
                            }
                        };
                        const parts = [],
                            offs = [];
                        let pos = 0;
                        const add = a => {
                            for (const c of a) {
                                pos += typeof c === 'string' ? c.length : c.size !== undefined ? c.size : c.length;
                                parts.push(c)
                            }
                        };
                        add(['%PDF-1.7\n', new Uint8Array([37, 226, 227, 207, 211, 10])]);
                        const objOut = (num_, body) => {
                            offs[num_] = pos;
                            add([num_ + ' 0 obj\n']);
                            add(body);
                            add(['\nendobj\n'])
                        };
                        objOut(1, ['<</Type/Catalog/Pages 2 0 R>>']);
                        objOut(2, ['<</Type/Pages/Kids[3 0 R]/Count 1>>']);
                        const pb = [];
                        ser(page, pb);
                        pb[pb.length - 1] = '/Parent 2 0 R>>';
                        objOut(3, pb);
                        let count = 0;
                        while (queue.length) {
                            if (++count > 60000) throw new Error('page references too many objects');
                            const on = queue.shift(),
                                o = await this.get(on),
                                out = [],
                                id = map.get(on);
                            if (o.stream) {
                                const len = await this.streamLen(o),
                                    d = Object.create(null);
                                for (const k in o.val) d[k] = o.val[k];
                                d.Length = len;
                                ser(d, out);
                                out.push('\nstream\n');
                                out.push(this.f.slice(o.stream.start, o.stream.start + len));
                                out.push('\nendstream')
                            } else ser(o.val === undefined ? null : o.val, out);
                            objOut(id, out)
                        }
                        const total = next,
                            xs = pos;
                        let x = 'xref\n0 ' + total + '\n0000000000 65535 f \n';
                        for (let i = 1; i < total; i++) x += String(offs[i] || 0).padStart(10, '0') + ' 00000 n \n';
                        add([x + 'trailer\n<</Size ' + total + '/Root 1 0 R>>\nstartxref\n' + xs + '\n%%EOF\n']);
                        return new Blob(parts, {
                            type: 'application/pdf'
                        })
                    }
                }
                class BigDoc {
                    constructor(lite, lib, worker) {
                        this.lite = lite;
                        this.lib = lib;
                        this.worker = worker;
                        this.numPages = lite.numPages;
                        this.live = new Map();
                        this.dead = false
                    }
                    getPage(n) {
                        if (this.dead) return Promise.reject(new Error('document closed'));
                        let e = this.live.get(n);
                        if (e) return e.promise;
                        e = {
                            n,
                            doc: null,
                            page: null
                        };
                        e.promise = (async () => {
                            const blob = await this.lite.pageBlob(n),
                                data = new Uint8Array(await blob.arrayBuffer());
                            const task = this.lib.getDocument({
                                data,
                                isEvalSupported: false,
                                worker: this.worker
                            });
                            e.doc = await task.promise;
                            e.page = await e.doc.getPage(1);
                            if (this.dead || this.live.get(n) !== e) {
                                try {
                                    e.doc.destroy()
                                } catch (x) {}
                                throw new Error('page released')
                            }
                            return e.page
                        })();
                        e.promise.catch(() => {
                            if (this.live.get(n) === e) this.live.delete(n)
                        });
                        this.live.set(n, e);
                        return e.promise
                    }
                    release(page) {
                        for (const [n, e] of this.live)
                            if (e.page === page) {
                                this.live.delete(n);
                                try {
                                    e.doc.destroy()
                                } catch (x) {}
                            }
                    }
                    destroy() {
                        this.dead = true;
                        for (const e of this.live.values()) {
                            try {
                                e.doc && e.doc.destroy()
                            } catch (x) {}
                        }
                        this.live.clear()
                    }
                }
                return {
                    async open(f, lib, worker) {
                        const l = new Lite(f);
                        await l.load();
                        return new BigDoc(l, lib, worker)
                    },
                    Lite
                };
            })();

            async function readAll(f, cb) {
                const out = new Uint8Array(f.size),
                    step = 32 << 20;
                for (let o = 0; o < f.size; o += step) {
                    out.set(new Uint8Array(await f.slice(o, Math.min(f.size, o + step)).arrayBuffer()), o);
                    cb && cb(Math.min(1, (o + step) / f.size))
                }
                return out
            }

            function canAlloc(n) {
                try {
                    const t = new ArrayBuffer(n);
                    return !!t
                } catch (e) {
                    return false
                }
            }
            async function openPdfDoc(f, onProg) {
                const prog = (p, l) => {
                    try {
                        onProg && onProg(p, l)
                    } catch (e) {}
                };
                const lib = window.pdfjsLib;
                if (!lib) throw new Error('PDF engine unavailable');
                prog(0, L('Starting PDF engine…', 'جارٍ تشغيل محرك PDF…'));
                const worker = await getWorker();
                prog(.08);
                const modes = f.size <= 8e6 ? ['full'] : f.size > 4e8 ? ['paged', 'range', 'full'] : ['range', 'paged', 'full'];
                const errs = [];
                for (const mode of modes) {
                    if (mode === 'full' && f.size > 8e6 && (f.size > 1.9e9 || !canAlloc(f.size))) {
                        errs.push(mode + ': file larger than this browser can allocate');
                        continue
                    }
                    let task = null,
                        doc = null,
                        timer = 0;
                    try {
                        if (mode === 'paged') {
                            prog(.15, L('Indexing pages…', 'جارٍ فهرسة الصفحات…'));
                            doc = await Promise.race([NXPDF.open(f, lib, worker), new Promise((_, no) => setTimeout(() => no(new Error('Page index timed out')), 240000))]);
                            prog(.9);
                            await doc.getPage(1);
                            return doc
                        }
                        if (mode === 'full') {
                            prog(.1, L('Reading file…', 'جارٍ قراءة الملف…'));
                            const data = await readAll(f, fr => prog(.1 + .5 * fr));
                            task = lib.getDocument({
                                data,
                                isEvalSupported: false,
                                worker
                            });
                            task.onProgress = q => {
                                if (q && q.total) prog(.6 + .35 * q.loaded / q.total, L('Reading document structure…', 'جارٍ قراءة بنية المستند…'))
                            }
                        } else {
                            const init = new Uint8Array(await f.slice(0, Math.min(f.size, 1 << 16)).arrayBuffer()),
                                tr = new lib.PDFDataRangeTransport(f.size, init);
                            let got = 0;
                            prog(.12, L('Reading document structure…', 'جارٍ قراءة بنية المستند…'));
                            let kill = () => {};
                            const guard = new Promise((_, no) => {
                                kill = () => {
                                    clearTimeout(timer);
                                    timer = setTimeout(() => no(new Error('Range loading stalled')), 60000)
                                };
                                kill()
                            });
                            tr.requestDataRange = (b, e) => {
                                kill();
                                f.slice(b, e).arrayBuffer().then(buf => {
                                    kill();
                                    got += buf.byteLength;
                                    prog(.12 + .8 * (1 - Math.exp(-got / 6e6)));
                                    tr.onDataRange(b, new Uint8Array(buf))
                                }, () => {
                                    try {
                                        task && task.destroy()
                                    } catch (x) {}
                                })
                            };
                            task = lib.getDocument({
                                range: tr,
                                length: f.size,
                                disableStream: true,
                                disableAutoFetch: true,
                                rangeChunkSize: 1 << 20,
                                isEvalSupported: false,
                                worker
                            });
                            task.onPassword = (cb, reason) => {
                                askPw(reason === 2).then(p => p ? cb(p) : task.destroy())
                            };
                            const load = (async () => {
                                doc = await task.promise;
                                await doc.getPage(1);
                                return doc
                            })();
                            await Promise.race([load, guard]);
                            clearTimeout(timer);
                            return doc
                        }
                        task.onPassword = (cb, reason) => {
                            askPw(reason === 2).then(p => p ? cb(p) : task.destroy())
                        };
                        doc = await task.promise;
                        await doc.getPage(1);
                        return doc
                    } catch (err) {
                        clearTimeout(timer);
                        console.warn('PDF open (' + mode + ') failed', err);
                        errs.push(mode + ': ' + ((err && err.message) || err));
                        try {
                            doc && doc.destroy()
                        } catch (x) {}
                        try {
                            task && task.destroy()
                        } catch (x) {}
                        if (err && err.name === 'PasswordException') throw err
                    }
                }
                const e = new Error(errs.join(' | '));
                e.name = 'OpenError';
                throw e
            }

            function resetViewer() {
                queue = [];
                drawing = null;
                creating = null;
                sel = null;
                selStroke = null;
                strokeDrag = null;
                openTok++;
                if (io) {
                    io.disconnect();
                    io = null
                }
                views.forEach(v => {
                    v.tok++;
                    try {
                        v.task && v.task.cancel()
                    } catch (e) {}
                });
                views = [];
                scroller.replaceChildren();
                if (pdfDoc) {
                    try {
                        pdfDoc.destroy()
                    } catch (e) {}
                    pdfDoc = null
                }
                if (currentUrl) {
                    URL.revokeObjectURL(currentUrl);
                    currentUrl = null
                }
            }
            function threeDlg(o) {
                return new Promise(res => {
                    const prev = document.activeElement,
                        m = document.createElement('div');
                    m.className = 'nx-modal';
                    m.innerHTML = '<div class="nx-dlg" role="alertdialog" aria-modal="true"><h3></h3><p></p><div class="nx-act three"><button type="button" class="btn ghost" data-r="cancel"></button><button type="button" class="btn danger" data-r="discard"></button><button type="button" class="btn" data-r="save"></button></div></div>';
                    m.querySelector('h3').textContent = o.title;
                    m.querySelector('p').textContent = o.msg;
                    const [bc, bd, bs] = m.querySelectorAll('button');
                    bc.textContent = o.cancel;
                    bd.textContent = o.discard;
                    bs.textContent = o.save;
                    const done = v => {
                        document.removeEventListener('keydown', kd, true);
                        m.classList.add('out');
                        setTimeout(() => {
                            m.remove();
                            try {
                                prev && prev.focus && prev.focus()
                            } catch (e) {}
                        }, 150);
                        res(v)
                    };
                    const kd = e => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            e.stopPropagation();
                            done('cancel')
                        }
                    };
                    m.addEventListener('click', e => {
                        if (e.target === m) done('cancel');
                        const b = e.target.closest('button[data-r]');
                        if (b) done(b.dataset.r)
                    });
                    document.addEventListener('keydown', kd, true);
                    document.body.appendChild(m);
                    bs.focus()
                })
            }
            let closing = false;
            async function closeReader() {
                if (closing || !reader.classList.contains('open')) return;
                closing = true;
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) ae.blur();
                let discard = false;
                if (fileId != null && reader.classList.contains('is-pdf') && !reader.classList.contains('nx-loading') && !reader.classList.contains('nx-failed') && annSig(ann) !== annSig(sessionBase)) {
                    const r = await threeDlg({
                        title: L('Save your changes?', 'حفظ التغييرات؟'),
                        msg: L('You have changes on this document that haven’t been saved yet.', 'لديك تعديلات على هذا المستند لم تُحفظ بعد.'),
                        cancel: L('Cancel', 'إلغاء'),
                        discard: L('Exit without saving', 'خروج بدون حفظ'),
                        save: L('Save & exit', 'حفظ وخروج')
                    });
                    if (r === 'cancel') {
                        closing = false;
                        return
                    }
                    discard = (r === 'discard')
                }
                if (fileId != null && discard) {
                    clearTimeout(saveT);
                    AS.set(fileId, sessionBase);
                    ann = JSON.parse(JSON.stringify(sessionBase));
                    var savedPage = 0,
                        savedOk = false,
                        dropped = true
                }
                if (fileId != null && !discard) {
                    const ok = persist(true);
                    savePos();
                    var savedPage = reader.classList.contains('is-pdf') ? curPage : 0;
                    var savedOk = ok !== false;
                    if (ok === false && window.NX_confirm) {
                        const go = await NX_confirm({
                            title: L('Couldn’t save your annotations', 'تعذّر حفظ تعليقاتك'),
                            msg: L('Storage is full. Export an annotated PDF first, or close anyway and lose these changes.', 'مساحة التخزين ممتلئة. صدّر ملف PDF بالتعليقات أولًا، أو أغلق وستفقد هذه التغييرات.'),
                            ok: L('Close anyway', 'إغلاق على أي حال'),
                            danger: true
                        });
                        if (!go) {
                            closing = false;
                            return
                        }
                    }
                }
                reader.classList.add('closing');
                const sp = typeof savedPage === 'number' ? savedPage : 0,
                    so = typeof savedOk === 'boolean' ? savedOk : false;
                setTimeout(() => {
                    reader.classList.remove('open', 'closing', 'nx-loading', 'nx-failed');
                    document.body.style.overflow = '';
                    window.nxThemeColor && nxThemeColor();
                    resetViewer();
                    file = null;
                    fileId = null;
                    undo = [];
                    redo = [];
                    updHist();
                    closing = false;
                    if (so) saveToast(sp ? L('Saved ✓ Your annotations and reading position (page ' + sp + ') are saved on this device', 'تم الحفظ ✓ حُفظت تعليقاتك وموضع القراءة (صفحة ' + sp + ') على هذا الجهاز') : L('Saved ✓ Your changes are saved on this device', 'تم الحفظ ✓ حُفظت تغييراتك على هذا الجهاز'));
                    else if (typeof dropped !== 'undefined' && dropped) saveToast(L('Closed without saving your changes', 'تم الإغلاق دون حفظ التغييرات'))
                }, 230)
            }

            function saveToast(t) {
                let e = document.getElementById('nx-save-toast');
                if (!e) {
                    e = document.createElement('div');
                    e.id = 'nx-save-toast';
                    e.setAttribute('role', 'status');
                    e.setAttribute('aria-live', 'polite');
                    document.body.appendChild(e)
                }
                e.textContent = t;
                e.classList.remove('on');
                void e.offsetWidth;
                e.classList.add('on');
                clearTimeout(saveToast.t);
                saveToast.t = setTimeout(() => e.classList.remove('on'), 3200)
            }
            window.addEventListener('pagehide', () => {
                if (fileId != null) persist(true)
            });
            document.addEventListener('visibilitychange', () => {
                if (document.hidden && fileId != null) persist(true)
            });
            $('#nr-close').onclick = closeReader;
            $('#nr-download').onclick = () => {
                if (!file) return;
                const u = URL.createObjectURL(file),
                    a = document.createElement('a');
                a.href = u;
                a.download = file.name;
                a.click();
                setTimeout(() => URL.revokeObjectURL(u), 4000)
            };
            let openTok = 0;

            function openProgress() {
                scroller.replaceChildren();
                const w = document.createElement('div');
                w.className = 'nx-open';
                w.innerHTML = '<div class="nx-op-t"></div><div class="nx-op-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><div class="nx-op-row"><span class="nx-op-st"></span><b class="nx-op-p">0%</b></div><div class="nx-op-note" hidden></div>';
                scroller.appendChild(w);
                const bar = w.querySelector('.nx-op-bar'),
                    fill = bar.firstChild,
                    pc = w.querySelector('.nx-op-p'),
                    st = w.querySelector('.nx-op-st'),
                    nt = w.querySelector('.nx-op-note');
                w.querySelector('.nx-op-t').textContent = $('#nr-title').textContent;
                let cur = 0,
                    last = Date.now();
                const wd = setInterval(() => {
                    if (!w.isConnected) {
                        clearInterval(wd);
                        return
                    }
                    if (Date.now() - last > 15000) {
                        nt.hidden = false;
                        nt.textContent = L('Large files can take a little while — still working…', 'الملفات الكبيرة قد تستغرق بعض الوقت — ما زال العمل جاريًا…')
                    }
                }, 2000);
                const api = {
                    set(p, label) {
                        if (!w.isConnected) return;
                        p = Math.max(cur, Math.min(100, p));
                        if (p !== cur || label) {
                            last = Date.now();
                            nt.hidden = true
                        }
                        cur = p;
                        fill.style.width = p + '%';
                        const r = Math.floor(p);
                        pc.textContent = r + '%';
                        bar.setAttribute('aria-valuenow', r);
                        if (label) st.textContent = label
                    }
                };
                api.set(0, L('Reading from storage…', 'جارٍ القراءة من التخزين…'));
                return api
            }

            function showMsg(t) {
                scroller.replaceChildren();
                const m = document.createElement('p');
                m.className = 'pdf-msg';
                m.textContent = t;
                scroller.appendChild(m)
            }
            let pre = null;

            function dropPre() {
                if (!pre) return;
                clearTimeout(pre.timer);
                const p = pre;
                pre = null;
                p.promise.then(r => {
                    try {
                        r.doc.destroy()
                    } catch (e) {}
                }).catch(() => {})
            }

            function prefetch(id) {
                if (pre && pre.id === id) return;
                dropPre();
                const meta = (LS.get('novix.site.v1', {}).books || []).find(x => x.id === id);
                if (!meta || !meta.fn || meta.ty !== 'PDF' || !window.pdfjsLib) return;
                const pr = {
                    id,
                    cb: null,
                    last: null,
                    promise: null,
                    timer: 0
                };
                const rp = (p, l) => {
                    pr.last = [p, l];
                    pr.cb && pr.cb(p, l)
                };
                pr.promise = (async () => {
                    const f = await getFile(id, fr => rp(fr * 30, L('Reading from storage…', 'جارٍ القراءة من التخزين…')));
                    if (!f) throw Error('Missing file');
                    const doc = await openPdfDoc(f, (p, l) => rp(35 + p * 50, l));
                    const first = await doc.getPage(1);
                    return {
                        f,
                        doc,
                        first
                    }
                })();
                pr.promise.catch(() => {});
                pr.timer = setTimeout(() => {
                    if (!pr.cb) dropPre()
                }, 20000);
                pre = pr
            }
            let hoverT = 0;
            $('#lib').addEventListener('mouseover', e => {
                const b = e.target.closest('[data-open]');
                clearTimeout(hoverT);
                if (b && e.pointerType !== 'touch') hoverT = setTimeout(() => prefetch(+b.dataset.open), 80)
            });
            $('#lib').addEventListener('pointerdown', e => {
                const b = e.target.closest('[data-open]');
                if (b) prefetch(+b.dataset.open)
            }, true);
            async function openInside(id) {
                const meta = (LS.get('novix.site.v1', {}).books || []).find(x => x.id === id);
                if (!meta || !meta.fn) return;
                resetViewer();
                undo = [];
                redo = [];
                updHist();
                reader.classList.remove('nx-failed');
                reader.classList.add('nx-loading');
                reader.classList.add('open');
                reader.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
                document.body.style.overflow = 'hidden';
                $('#nr-title').textContent = meta.t || meta.fn;
                fileId = null;
                applyLang();
                const myTok = ++openTok;
                const P = openProgress();
                reader.focus({
                    preventScroll: true
                });
                window.nxThemeColor && nxThemeColor(getComputedStyle(reader).backgroundColor);
                try {
                    let f;
                    try {
                        f = await getFile(id, fr => P.set(fr * 30, L('Reading from storage…', 'جارٍ القراءة من التخزين…')))
                    } catch (e) {
                        e.storage = true;
                        throw e
                    }
                    if (!f) throw Error('Missing file');
                    if (myTok !== openTok) return;
                    P.set(32);
                    file = f;
                    fileId = String(id);
                    await loadAnn();
                    if (myTok !== openTok) return;
                    const isPdf = f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
                    document.body.classList.toggle('reader-pdf', isPdf);
                    reader.classList.toggle('is-pdf', isPdf);
                    if (isPdf) {
                        let first;
                        if (pre && pre.id === id) {
                            const pr = pre;
                            pr.cb = (p, l) => P.set(p, l);
                            if (pr.last) P.set(pr.last[0], pr.last[1]);
                            const r = await pr.promise.catch(() => null);
                            clearTimeout(pr.timer);
                            if (pre === pr) pre = null;
                            if (r) {
                                pdfDoc = r.doc;
                                first = r.first
                            }
                        }
                        if (myTok !== openTok) {
                            try {
                                pdfDoc && pdfDoc.destroy()
                            } catch (x) {}
                            pdfDoc = null;
                            return
                        }
                        if (!pdfDoc) {
                            pdfDoc = await openPdfDoc(f, (p, l) => P.set(35 + p * 50, l));
                            if (myTok !== openTok) {
                                try {
                                    pdfDoc.destroy()
                                } catch (x) {}
                                pdfDoc = null;
                                return
                            }
                            P.set(88, L('Loading the first page…', 'جارٍ تحميل أول صفحة…'));
                            first = await pdfDoc.getPage(1)
                        }
                        P.set(96, L('Preparing pages…', 'جارٍ تجهيز الصفحات…'));
                        const b = first.getViewport({
                            scale: 1
                        });
                        defW = b.width;
                        defH = b.height;
                        const pos = LS.get('novix.pdf.pos.v1', {})[fileId];
                        scale = clamp(pos && pos.scale || Math.min(1.15, fitWidth()), .4, 4);
                        scroller.style.setProperty('--s', scale);
                        updZoomLabel();
                        P.set(100, L('Opening…', 'جارٍ الفتح…'));
                        await new Promise(r => setTimeout(r, 220));
                        if (myTok !== openTok) return;
                        scroller.replaceChildren();
                        buildViews();
                        setTool('pan');
                        reader.classList.remove('nx-loading');
                        if (pos && pos.page > 1) scrollToPage(pos.page);
                        else {
                            scroller.scrollTop = 0;
                            $('#nr-page').value = 1
                        }
                        updCurPage();
                        for (let k = Math.max(0, curPage - 1); k < Math.min(views.length, curPage + 1); k++) mountView(views[k]);
                        note(L('Annotations are saved on this device. Export a PDF to embed them.', 'التعليقات محفوظة على هذا الجهاز. صدّر PDF لتضمينها داخل الملف.'))
                    } else {
                        scroller.replaceChildren();
                        setTool('pan');
                        reader.classList.remove('nx-loading');
                        if (f.type.startsWith('image/')) {
                            const im = document.createElement('img');
                            im.src = await new Promise((ok, no) => {
                                const r = new FileReader();
                                r.onload = () => ok(r.result);
                                r.onerror = no;
                                r.readAsDataURL(f)
                            });
                            im.style.cssText = 'max-width:100%;height:auto;box-shadow:0 5px 22px #132b2024';
                            scroller.appendChild(im)
                        } else if (/^text\//.test(f.type) || /\.(txt|md|csv|json|log)$/i.test(f.name)) {
                            const pre = document.createElement('pre');
                            pre.style.cssText = 'white-space:pre-wrap;word-break:break-word;text-align:start;width:min(860px,100%);margin:0 auto;padding:24px;border-radius:14px;background:#fff;color:#1c2b26;font:14px/1.8 ui-monospace,Menlo,Consolas,monospace;box-shadow:0 5px 22px #132b2024;box-sizing:border-box';
                            pre.textContent = await f.text();
                            scroller.appendChild(pre)
                        } else if (/^(audio|video)\//.test(f.type)) {
                            currentUrl = URL.createObjectURL(f);
                            const m = document.createElement(f.type.startsWith('audio') ? 'audio' : 'video');
                            m.src = currentUrl;
                            m.controls = true;
                            m.style.cssText = 'max-width:100%;width:min(860px,100%);display:block;margin:0 auto';
                            scroller.appendChild(m)
                        } else if (/\.docx$/i.test(f.name)) {
                            await new Promise((ok, no) => {
                                if (window.mammoth) return ok();
                                const s = document.createElement('script');
                                s.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js';
                                s.onload = ok;
                                s.onerror = () => no(new Error('Word engine unavailable'));
                                document.head.appendChild(s)
                            });
                            const r = await window.mammoth.convertToHtml({
                                arrayBuffer: await f.arrayBuffer()
                            });
                            const d = document.createElement('div');
                            d.style.cssText = 'width:min(860px,100%);margin:0 auto;padding:28px 32px;border-radius:14px;background:#fff;color:#1c2b26;line-height:1.8;font-size:15px;box-shadow:0 5px 22px #132b2024;box-sizing:border-box;overflow-wrap:anywhere';
                            d.innerHTML = r.value.replace(/<script[\s\S]*?<\/script>/gi, '');
                            scroller.appendChild(d)
                        } else showMsg(L('Preview is available for PDF, image, text, Word, audio and video files.', 'المعاينة متاحة لملفات PDF والصور والنصوص وWord والصوت والفيديو.'))
                    }
                } catch (err) {
                    console.error(err);
                    if (myTok !== openTok) return;
                    reader.classList.remove('nx-loading');
                    reader.classList.add('nx-failed');
                    const why = err && (err.name && err.name !== 'Error' ? err.name + ': ' : '') + (err && err.message || '');
                    showMsg(err && err.message === 'Missing file' ? L('This file is no longer stored in this browser. Please upload the book again.', 'هذا الملف لم يعد محفوظًا في هذا المتصفح. من فضلك ارفع الكتاب مرة أخرى.') : err && err.storage ? L('The browser could not read this large file from its storage (it may be low on space or memory). Close other tabs and try again, or upload the book again.', 'تعذّر على المتصفح قراءة هذا الملف الكبير من التخزين (قد تكون المساحة أو الذاكرة منخفضة). أغلق التبويبات الأخرى وحاول مجددًا أو ارفع الكتاب مرة أخرى.') : L('This PDF couldn’t be opened. It may be damaged or password-protected. You can still download it with the button above.', 'تعذّر فتح هذا الملف. قد يكون تالفًا أو محميًا بكلمة مرور. يمكنك تنزيله بزر التنزيل بالأعلى.') + (why ? '\n(' + why.slice(0, 320) + ')' : ''));
                    {
                        const rb = document.createElement('button');
                        rb.type = 'button';
                        rb.className = 'nx-retry';
                        rb.textContent = L('Try again', 'حاول مرة أخرى');
                        rb.onclick = () => openInside(id);
                        const m = scroller.querySelector('.pdf-msg');
                        if (m) m.appendChild(rb)
                    }
                }
            }

            function wrapLines(ctx, text, maxW) {
                const out = [];
                for (const para of String(text || '').split('\n')) {
                    const words = para.split(/\s+/);
                    let line = '';
                    for (const w of words) {
                        const nx = line ? line + ' ' + w : w;
                        if (ctx.measureText(nx).width > maxW && line) {
                            out.push(line);
                            line = w
                        } else line = nx
                    }
                    out.push(line)
                }
                return out
            }

            function drawObjCanvas(ctx, o, k) {
                norm(o);
                const x = o.x * k,
                    y = o.y * k,
                    w = o.w * k,
                    h = o.h * k;
                ctx.save();
                if (o.type !== 'textbox') {
                    ctx.beginPath();
                    if (o.shape === 'circle') ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
                    else if (o.type === 'sticky' || o.shape === 'round' || o.shape === 'speech') ctx.roundRect(x, y, w, h, (o.shape === 'round' ? 18 : o.type === 'sticky' ? 8 : 14) * k);
                    else ctx.rect(x, y, w, h);
                    ctx.fillStyle = o.type === 'sticky' ? o.paper : (o.fill || 'rgba(0,0,0,0)');
                    ctx.fill();
                    if (o.type === 'shape') {
                        ctx.lineWidth = o.lw * k;
                        ctx.strokeStyle = o.stroke;
                        ctx.stroke()
                    } else {
                        ctx.lineWidth = 1 * k;
                        ctx.strokeStyle = 'rgba(0,0,0,.15)';
                        ctx.stroke()
                    }
                }
                const text = (o.type === 'shape' && !o.fill) ? '' : (o.text || '');
                if (text) {
                    const pad = 8 * k,
                        fs = o.fs * k;
                    ctx.font = `${o.bold?'800':'500'} ${fs}px ${FAM[o.family]||FAM.sans}`;
                    ctx.fillStyle = o.type === 'textbox' ? o.color : (o.color || '#20372e');
                    ctx.textBaseline = 'top';
                    const rtl = /[\u0590-\u08FF]/.test(text);
                    ctx.direction = rtl ? 'rtl' : 'ltr';
                    const centered = o.type === 'shape';
                    ctx.textAlign = centered ? 'center' : (rtl ? 'right' : 'left');
                    const lines = wrapLines(ctx, text, w - 2 * pad),
                        lh = fs * 1.45;
                    let yy = y + pad;
                    const tx = centered ? x + w / 2 : (rtl ? x + w - pad : x + pad);
                    ctx.beginPath();
                    ctx.rect(x, y, w, Math.max(h, lh * lines.length + 2 * pad));
                    ctx.clip();
                    for (const ln of lines) {
                        ctx.fillText(ln, tx, yy);
                        yy += lh
                    }
                }
                ctx.restore()
            }
            async function loadPdfLib() {
                if (window.PDFLib) return;
                await new Promise((ok, no) => {
                    const s = document.createElement('script');
                    s.src = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
                    s.onload = ok;
                    s.onerror = () => no(new Error('pdf-lib unavailable'));
                    document.head.appendChild(s)
                })
            }
            async function exportAnnotatedPdf() {
                if (!file || !pdfDoc) return;
                const keys = Object.keys(ann.pages).filter(k => {
                    const a = ann.pages[k];
                    return a.strokes.length || a.objects.length
                });
                if (!keys.length) {
                    note(L('Nothing to export yet — add some annotations first.', 'لا توجد تعليقات للتصدير بعد.'));
                    return
                }
                try {
                    note(L('Preparing the annotated PDF…', 'جارٍ تجهيز الملف…'));
                    await loadPdfLib();
                    const {
                        PDFDocument
                    } = window.PDFLib, out = await PDFDocument.load(await file.arrayBuffer(), {
                        ignoreEncryption: true
                    }), outPages = out.getPages(), K = 2;
                    for (const key of keys) {
                        const n = +key,
                            a = ann.pages[key],
                            page = await pdfDoc.getPage(n),
                            b = page.getViewport({
                                scale: 1
                            }),
                            c = document.createElement('canvas');
                        c.width = Math.ceil(b.width * K);
                        c.height = Math.ceil(b.height * K);
                        const ctx = c.getContext('2d');
                        for (const st of a.strokes) drawInkStroke(ctx, st, K);
                        for (const o of a.objects) drawObjCanvas(ctx, o, K);
                        const png = await out.embedPng(c.toDataURL('image/png')),
                            pg = outPages[n - 1];
                        pg.drawImage(png, {
                            x: 0,
                            y: 0,
                            width: pg.getWidth(),
                            height: pg.getHeight()
                        })
                    }
                    const res = await out.save(),
                        url = URL.createObjectURL(new Blob([res], {
                            type: 'application/pdf'
                        })),
                        link = document.createElement('a');
                    link.href = url;
                    link.download = (file.name || 'NOVIX-document.pdf').replace(/\.pdf$/i, '') + '-annotated.pdf';
                    link.click();
                    setTimeout(() => URL.revokeObjectURL(url), 4000);
                    note(L('Annotated PDF exported successfully.', 'تم تصدير الملف مع التعليقات.'))
                } catch (err) {
                    console.error(err);
                    note(L('Could not export the PDF. Check your connection and try again.', 'تعذّر التصدير. تحقق من اتصالك وحاول مرة أخرى.'))
                }
            }
            $('#nr-export').onclick = exportAnnotatedPdf;

            $('#lib').addEventListener('click', e => {
                const b = e.target.closest('[data-open]');
                if (!b) return;
                try {
                    const m = (LS.get('novix.site.v1', {}).books || []).find(x => x.id === +b.dataset.open);
                    if (!m || !m.fn || !/^(PDF|PNG|JPG|JPEG|GIF|WEBP|BMP|SVG|TXT|MD|CSV|JSON|LOG|MP3|WAV|OGG|M4A|MP4|WEBM|DOCX)$/i.test(m.ty || '')) return
                } catch (x) {}
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                openInside(+b.dataset.open)
            }, true);
            new MutationObserver(() => {
                reader.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
            }).observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });
            window.addEventListener('resize', () => {
                if (pdfDoc && reader.classList.contains('open')) updCurPage()
            });
            applyLang();
            updHist();
            reader.dataset.tool = 'pan';
        })();
