        (() => {
            const K = 'novix.side.mini.v3',
                b = document.body,
                side = document.querySelector('.side');
            if (!side) return;
            const mq = matchMedia('(min-width:901px)'),
                rtl = () => document.documentElement.dir === 'rtl',
                MIN = 76,
                MAX = 214;
            const fsBtn = document.getElementById('fsBtn'),
                fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
            const labels = () => {
                if (fsBtn) {
                    const a = rtl(),
                        on = !!fsEl(),
                        t = a ? (on ? 'الخروج من ملء الشاشة' : 'ملء الشاشة') : (on ? 'Exit full screen' : 'Full screen');
                    fsBtn.title = t;
                    fsBtn.setAttribute('aria-label', t);
                    b.classList.toggle('is-fs', on)
                }
            };
            labels();
            new MutationObserver(labels).observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['dir', 'lang']
            });
            let mini = false;
            try {
                mini = localStorage.getItem(K) === '1'
            } catch (e) {}
            const setMini = (m, persist) => {
                mini = m;
                b.classList.toggle('side-collapsed', m);
                if (persist) {
                    try {
                        localStorage.setItem(K, m ? '1' : '0')
                    } catch (e) {}
                }
            };
            if (mini) setMini(true, false);
            let st = null,
                swallow = false;
            side.addEventListener('pointerdown', e => {
                if (!mq.matches || (e.pointerType === 'mouse' && e.button !== 0)) return;
                const w0 = mini ? MIN : MAX;
                st = {
                    id: e.pointerId,
                    x: e.clientX,
                    y: e.clientY,
                    drag: false,
                    w0,
                    w: w0,
                    last: e.clientX,
                    v: 0
                }
            });
            addEventListener('pointermove', e => {
                if (!st || e.pointerId !== st.id) return;
                const s = rtl() ? -1 : 1,
                    dx = (e.clientX - st.x) * s,
                    dy = e.clientY - st.y;
                if (!st.drag) {
                    if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) {
                        if (Math.abs(dy) > 16 && Math.abs(dy) > Math.abs(dx)) st = null;
                        return
                    }
                    st.drag = true;
                    try {
                        side.setPointerCapture(e.pointerId)
                    } catch (_) {}
                    b.classList.add('side-dragging')
                }
                st.v = (e.clientX - st.last) * s;
                st.last = e.clientX;
                st.w = Math.max(MIN, Math.min(MAX, st.w0 + dx));
                b.style.setProperty('--sw', st.w + 'px');
                b.classList.toggle('side-collapsed', st.w < 150)
            });
            const end = e => {
                if (!st || e.pointerId !== st.id) return;
                const d = st;
                st = null;
                if (!d.drag) return;
                swallow = true;
                setTimeout(() => {
                    swallow = false
                }, 80);
                const expand = d.v > 6 ? true : d.v < -6 ? false : d.w > (MIN + MAX) / 2;
                setMini(!expand, true);
                b.style.removeProperty('--sw');
                b.classList.remove('side-dragging')
            };
            addEventListener('pointerup', end);
            addEventListener('pointercancel', end);
            addEventListener('click', e => {
                if (swallow) {
                    e.stopPropagation();
                    e.preventDefault()
                }
            }, true);
            if (fsBtn) {
                const de = document.documentElement;
                if (!(de.requestFullscreen || de.webkitRequestFullscreen)) fsBtn.style.display = 'none';
                fsBtn.addEventListener('click', () => {
                    try {
                        if (fsEl())(document.exitFullscreen || document.webkitExitFullscreen).call(document);
                        else(de.requestFullscreen || de.webkitRequestFullscreen).call(de)
                    } catch (_) {}
                });
                document.addEventListener('fullscreenchange', labels);
                document.addEventListener('webkitfullscreenchange', labels)
            }
        })();
