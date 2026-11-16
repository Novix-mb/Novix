/* NOVIX colour picker.
   One picker for every "custom colour" button on the site, with the same design as the whiteboard tools.
   It replaces the browser's own colour dialog, so it looks and behaves the same on every phone, tablet and computer. */
(function () {
    'use strict';
    if (window.NovixColor) return;
    const T = (en, ar) => (document.documentElement.lang === 'ar' ? ar : en);
    const HEX = /^#[0-9a-f]{6}$/i;
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const hsv2hex = (h, s, v) => {
        const f = n => {
                const k = (n + h / 60) % 6;
                return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
            },
            x = n => Math.round(f(n) * 255).toString(16).padStart(2, '0');
        return '#' + x(5) + x(3) + x(1)
    };
    const hex2hsv = hx => {
        const n = parseInt(HEX.test(hx) ? hx.slice(1) : '000000', 16),
            r = (n >> 16 & 255) / 255,
            g = (n >> 8 & 255) / 255,
            b = (n & 255) / 255,
            mx = Math.max(r, g, b),
            d = mx - Math.min(r, g, b);
        let h = 0;
        if (d) {
            h = mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
            h *= 60
        }
        return [h, mx ? d / mx : 0, mx]
    };

    let cp = null;

    function place() {
        if (!cp) return;
        const r = cp.inp.getBoundingClientRect();
        if (!cp.inp.isConnected || (!r.width && !r.height)) {
            close('out');
            return
        }
        const el = cp.el,
            vw = window.innerWidth,
            vh = window.innerHeight,
            w = Math.min(256, vw - 16);
        el.style.width = w + 'px';
        const h = el.offsetHeight;
        const left = clamp(r.left + r.width / 2 - w / 2, 8, Math.max(8, vw - w - 8));
        let top = r.bottom + 10;
        if (top + h > vh - 8) top = r.top - h - 10;
        top = clamp(top, 8, Math.max(8, vh - h - 8));
        el.style.left = left + 'px';
        el.style.top = top + 'px'
    }

    function close(mode) {
        if (!cp) return;
        const c = cp;
        cp = null;
        document.removeEventListener('pointerdown', c.out, true);
        document.removeEventListener('keydown', c.key, true);
        window.removeEventListener('resize', c.pos);
        window.removeEventListener('scroll', c.pos, true);
        c.el.remove();
        if (mode === 'ok') c.fire(c.cur, true);
        else if (mode === 'out') {
            if (c.dirty) c.fire(c.cur, true)
        } else if (c.dirty) c.fire(c.orig, true)
    }

    function open(inp) {
        close('out');
        const orig = HEX.test(inp.value) ? inp.value.toLowerCase() : '#000000';
        let [H, S, V] = hex2hsv(orig);
        const el = document.createElement('div');
        el.className = 'nx-cp';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-label', T('Custom colour', 'لون مخصص'));
        el.innerHTML = '<div class="nx-cp-sv"><i></i></div><div class="nx-cp-hue"><i></i></div>' +
            '<div class="nx-cp-row"><span class="nx-cp-prev"></span><input class="nx-cp-hex" maxlength="7" spellcheck="false" autocomplete="off" aria-label="HEX"></div>' +
            '<div class="nx-cp-btns"><button type="button" data-cp="x">' + T('Cancel', 'إلغاء') + '</button><button type="button" data-cp="ok" class="pri">' + T('Select', 'تحديد') + '</button></div>';
        document.body.appendChild(el);
        const sv = el.querySelector('.nx-cp-sv'),
            hu = el.querySelector('.nx-cp-hue'),
            pv = el.querySelector('.nx-cp-prev'),
            hx = el.querySelector('.nx-cp-hex'),
            k1 = sv.firstChild,
            k2 = hu.firstChild;
        const fire = (c, fin) => {
            inp.value = c;
            inp.dispatchEvent(new Event('input', {
                bubbles: true
            }));
            if (fin) inp.dispatchEvent(new Event('change', {
                bubbles: true
            }))
        };
        cp = {
            el,
            inp,
            orig,
            fire,
            dirty: false,
            cur: orig
        };
        const paint = (live, keepHex) => {
            const c = hsv2hex(H, S, V);
            cp.cur = c;
            sv.style.background = 'linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,hsl(' + H + ',100%,50%))';
            k1.style.left = S * 100 + '%';
            k1.style.top = (1 - V) * 100 + '%';
            k2.style.left = H / 360 * 100 + '%';
            pv.style.background = c;
            if (!keepHex) hx.value = c.toUpperCase();
            if (live) {
                cp.dirty = true;
                fire(c, false)
            }
        };
        const drag = (box, fn) => box.addEventListener('pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            try {
                box.setPointerCapture(e.pointerId)
            } catch (x) {}
            const mv = ev => {
                const r = box.getBoundingClientRect();
                fn(clamp((ev.clientX - r.left) / (r.width || 1), 0, 1), clamp((ev.clientY - r.top) / (r.height || 1), 0, 1));
                paint(true)
            };
            mv(e);
            box.onpointermove = mv;
            box.onpointerup = box.onpointercancel = () => {
                box.onpointermove = null
            }
        });
        drag(sv, (x, y) => {
            S = x;
            V = 1 - y
        });
        drag(hu, x => {
            H = Math.min(359.9, x * 360)
        });
        hx.addEventListener('input', () => {
            let v = hx.value.trim();
            if (v && v[0] !== '#') v = '#' + v;
            if (HEX.test(v)) {
                [H, S, V] = hex2hsv(v);
                paint(true, true)
            }
        });
        hx.addEventListener('blur', () => {
            if (cp) hx.value = cp.cur.toUpperCase()
        });
        el.addEventListener('click', e => {
            e.stopPropagation();
            const b = e.target.closest('[data-cp]');
            if (b) close(b.dataset.cp === 'ok' ? 'ok' : 'cancel')
        });
        /* keep focus where it was while dragging, but let the HEX box be typed in */
        el.addEventListener('pointerdown', e => {
            if (e.target !== hx) e.preventDefault()
        });
        cp.out = e => {
            if (el.contains(e.target) || e.target === inp) return;
            close('out')
        };
        cp.key = e => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                close('cancel')
            } else if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                close('ok')
            }
        };
        cp.pos = place;
        document.addEventListener('pointerdown', cp.out, true);
        document.addEventListener('keydown', cp.key, true);
        window.addEventListener('resize', cp.pos);
        window.addEventListener('scroll', cp.pos, true);
        place();
        paint(false)
    }

    /* every colour button on the site (the whiteboard tools already use the same picker themselves) */
    document.addEventListener('click', e => {
        const t = e.target;
        if (!(t && t.matches && t.matches('input[type=color]'))) return;
        if (t.closest('.gn-pop,.gn-tt,.gn-cpal,.gn-sel,.gn-sw,.gn-cp')) return;
        e.preventDefault();
        e.stopPropagation();
        if (cp && cp.inp === t) close('out');
        else open(t)
    }, true);

    window.NovixColor = {
        open,
        close
    };
})();
