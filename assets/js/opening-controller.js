        (() => {
            const root = document.getElementById('novix-opening');
            if (!root) return;
            const SESSION_KEY = 'novix.opening.session.v1';
            const ENTERED_KEY = 'novix.welcome.entered.v1';
            const PROFILE_KEY = 'novix.site.v1';
            const PHOTO_KEY = 'novix-profile-photo-v1';
            const getStore = (kind) => {
                try {
                    return kind === 'session' ? window.sessionStorage : window.localStorage;
                } catch (_) {
                    return null;
                }
            };
            const sessionStore = getStore('session');
            const localStore = getStore('local');
            const safeGet = (store, key) => {
                try {
                    return store ? store.getItem(key) : null;
                } catch (_) {
                    return null;
                }
            };
            const safeSet = (store, key, value) => {
                try {
                    if (store) store.setItem(key, value);
                } catch (_) {}
            };

            safeSet(sessionStore, SESSION_KEY, '1');

            let profile = {};
            try {
                profile = JSON.parse(safeGet(localStore, PROFILE_KEY) || 'null') || {};
            } catch (_) {
                profile = {};
            }
            const name = String(profile.name || '').trim().slice(0, 24) || (profile.lang === 'ar' ? 'طالب' : 'Student');
            const isArabic = profile.lang === 'ar';
            const isReturning = safeGet(localStore, ENTERED_KEY) === '1';
            const $ = (id) => document.getElementById(id);
            const greeting = $('novix-welcome-greeting');
            const nameNode = $('novix-welcome-name');
            const kicker = $('novix-welcome-kicker');
            const message = $('novix-welcome-message');
            const chip = $('novix-welcome-chip');
            const enterLabel = $('novix-welcome-enter-label');
            const welcome = $('novix-welcome');
            const photo = $('novix-welcome-photo');
            const fallback = $('novix-welcome-fallback');
            const enterButton = $('novix-welcome-enter');

            if (isArabic) {}

            nameNode.textContent = name;
            fallback.textContent = (name[0] || 'N').toLocaleUpperCase();
            if (isArabic) {
                root.setAttribute('dir', 'rtl');
                kicker.textContent = isReturning ? 'مساحتك جاهزة' : 'بداية فصل جديد';
                greeting.textContent = isReturning ? 'أهلًا بعودتك،' : 'أهلًا بك في NOVIX،';
                message.textContent = isReturning ? 'مساحتك في انتظارك. أكمل رحلتك وتقدّمك من حيث توقفت.' : 'مساحتك للتعلّم والاستكشاف والتفكير خارج الحدود.';
                chip.textContent = 'مساحتك التعليمية';
                enterLabel.textContent = 'ابدأ رحلتك';
                enterButton.querySelector('svg').style.transform = 'scaleX(-1)';
            } else {
                root.setAttribute('dir', 'ltr');
                kicker.textContent = isReturning ? 'YOUR SPACE IS READY' : 'A NEW CHAPTER';
                greeting.textContent = isReturning ? 'Welcome back,' : 'Welcome to NOVIX,';
                message.textContent = isReturning ? 'Your space is ready. Pick up where you left off and keep moving forward.' : 'Your space to learn, explore, and think beyond.';
                chip.textContent = 'YOUR PERSONAL SPACE';
                enterLabel.textContent = 'Explore NOVIX';
            }

            const photoSrc = profile.avatar || safeGet(localStore, PHOTO_KEY);
            if (photoSrc) {
                photo.hidden = false;
                fallback.hidden = true;
                photo.addEventListener('error', () => {
                    photo.hidden = true;
                    fallback.hidden = false;
                }, {
                    once: true
                });
                photo.src = photoSrc;
            } else {
                photo.hidden = true;
                fallback.hidden = false;
            }

            const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
            let welcomeTimer = window.setTimeout(() => {
                root.classList.remove('is-playing');
                root.classList.add('is-welcome');
                welcome.setAttribute('aria-hidden', 'false');
                window.setTimeout(() => enterButton.focus({
                    preventScroll: true
                }), reducedMotion ? 0 : 700);
            }, reducedMotion ? 60 : 2480);

            const finishOpening = () => {
                safeSet(localStore, ENTERED_KEY, '1');
                safeSet(sessionStore, SESSION_KEY, '1');
                root.classList.add('is-leaving');
                root.setAttribute('aria-hidden', 'true');
                window.setTimeout(() => root.remove(), reducedMotion ? 30 : 760);
            };

            enterButton.addEventListener('click', () => {
                window.clearTimeout(welcomeTimer);
                finishOpening();
            });

            (() => {
                const c = document.getElementById('novix-opening-fx');
                if (!c || !c.getContext) return;
                const aur = root.querySelector('.opening-aurora');
                const x = c.getContext('2d');
                const D = Math.min(window.devicePixelRatio || 1, 2);
                let W = 0,
                    H = 0,
                    P = [],
                    S = [],
                    R = [],
                    star = null,
                    nextStar = 1400;
                const ptr = {
                    mx: 0,
                    my: 0,
                    x: -999,
                    y: -999,
                    px: -999,
                    py: -999,
                    on: false,
                    down: false,
                    sx: 0,
                    sy: 0
                };
                const rnd = (a, b) => a + Math.random() * (b - a);
                const mk = () => {
                    const a = rnd(0, 6.283),
                        s = rnd(.15, .55);
                    return {
                        x: rnd(0, W),
                        y: rnd(0, H),
                        bx: Math.cos(a) * s,
                        by: Math.sin(a) * s - .05,
                        vx: 0,
                        vy: 0,
                        r: rnd(.7, 2.3),
                        b: Math.random() < .3,
                        t: rnd(0, 6.28)
                    };
                };
                const size = () => {
                    W = c.clientWidth;
                    H = c.clientHeight;
                    c.width = W * D;
                    c.height = H * D;
                    x.setTransform(D, 0, 0, D, 0, 0);
                    const n = Math.round(Math.min(300, Math.max(92, W * H / 4750)));
                    P = Array.from({
                        length: n
                    }, () => {
                        const p = mk();
                        p.vx = p.bx;
                        p.vy = p.by;
                        return p;
                    });
                };
                const spark = (px, py, n, power) => {
                    for (let i = 0; i < n; i++) {
                        const a = rnd(0, 6.283),
                            s = rnd(.6, 1) * power;
                        S.push({
                            x: px,
                            y: py,
                            vx: Math.cos(a) * s,
                            vy: Math.sin(a) * s,
                            l: 1,
                            d: rnd(.012, .026),
                            r: rnd(1, 2.6),
                            b: Math.random() < .35
                        });
                    }
                };
                const pos = (e) => {
                    const r = c.getBoundingClientRect();
                    return [e.clientX - r.left, e.clientY - r.top];
                };
                const move = (e) => {
                    const [px, py] = pos(e);
                    const dx = ptr.on ? px - ptr.x : 0,
                        dy = ptr.on ? py - ptr.y : 0;
                    ptr.mx = ptr.mx * .4 + dx * .6;
                    ptr.my = ptr.my * .4 + dy * .6;
                    if (ptr.on) {
                        const sp = Math.hypot(dx, dy);
                        if (sp > 6) spark(px, py, Math.min(3, 1 + (sp / 25 | 0)), .7);
                    }
                    ptr.x = px;
                    ptr.y = py;
                    ptr.on = true;
                };
                const draw = (move, dt) => {
                    x.clearRect(0, 0, W, H);
                    if (aur && ptr.on) {
                        ptr.sx += ((ptr.x / W - .5) * -60 - ptr.sx) * .06;
                        ptr.sy += ((ptr.y / H - .5) * -60 - ptr.sy) * .06;
                        aur.style.transform = `translate3d(${ptr.sx.toFixed(1)}px,${ptr.sy.toFixed(1)}px,0)`;
                    }
                    const RAD = ptr.down ? 280 : 190;
                    ptr.mx *= .9;
                    ptr.my *= .9;
                    for (const p of P) {
                        if (move) {
                            if (ptr.on) {
                                const dx = p.x - ptr.x,
                                    dy = p.y - ptr.y,
                                    d2 = dx * dx + dy * dy;
                                if (d2 < RAD * RAD && d2 > 1) {
                                    const d = Math.sqrt(d2),
                                        f = (1 - d / RAD);
                                    if (ptr.down) {
                                        p.vx += (-dx / d) * f * .9 + (-dy / d) * f * .35;
                                        p.vy += (-dy / d) * f * .9 + (dx / d) * f * .35;
                                    } else {
                                        p.vx += (dx / d) * f * .8 + ptr.mx * f * .16;
                                        p.vy += (dy / d) * f * .8 + ptr.my * f * .16;
                                    }
                                }
                            }
                            p.vx += (p.bx - p.vx) * .035;
                            p.vy += (p.by - p.vy) * .035;
                            const m = Math.hypot(p.vx, p.vy);
                            if (m > 7) {
                                p.vx *= 7 / m;
                                p.vy *= 7 / m;
                            }
                            p.x += p.vx;
                            p.y += p.vy;
                            p.t += .025;
                            if (p.x < -12) p.x = W + 12;
                            if (p.x > W + 12) p.x = -12;
                            if (p.y < -12) p.y = H + 12;
                            if (p.y > H + 12) p.y = -12;
                        }
                        const a = .38 + .32 * Math.sin(p.t),
                            col = p.b ? '165,201,255' : '115,225,209',
                            g = 1 + Math.min(1.2, Math.hypot(p.vx, p.vy) * .25);
                        x.beginPath();
                        x.arc(p.x, p.y, p.r * g, 0, 6.283);
                        x.fillStyle = `rgba(${col},${a})`;
                        x.shadowColor = `rgba(${col},.9)`;
                        x.shadowBlur = 9;
                        x.fill();
                    }
                    x.shadowBlur = 0;
                    for (let i = 0; i < P.length; i++)
                        for (let j = i + 1; j < P.length; j++) {
                            const dx = P[i].x - P[j].x,
                                dy = P[i].y - P[j].y,
                                d = dx * dx + dy * dy;
                            if (d < 11000) {
                                x.strokeStyle = `rgba(140,231,216,${(1 - d / 11000) * .24})`;
                                x.lineWidth = 1;
                                x.beginPath();
                                x.moveTo(P[i].x, P[i].y);
                                x.lineTo(P[j].x, P[j].y);
                                x.stroke();
                            }
                        }
                    if (ptr.on) {
                        for (const p of P) {
                            const dx = p.x - ptr.x,
                                dy = p.y - ptr.y,
                                d = dx * dx + dy * dy;
                            if (d < 22000) {
                                x.strokeStyle = `rgba(190,255,244,${(1 - d / 22000) * (ptr.down ? .7 : .5)})`;
                                x.lineWidth = 1.2;
                                x.beginPath();
                                x.moveTo(ptr.x, ptr.y);
                                x.lineTo(p.x, p.y);
                                x.stroke();
                            }
                        }
                        const gr = x.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, ptr.down ? 150 : 100);
                        gr.addColorStop(0, ptr.down ? 'rgba(165,255,238,.34)' : 'rgba(140,231,216,.2)');
                        gr.addColorStop(1, 'rgba(140,231,216,0)');
                        x.fillStyle = gr;
                        x.beginPath();
                        x.arc(ptr.x, ptr.y, ptr.down ? 150 : 100, 0, 6.283);
                        x.fill();
                        x.beginPath();
                        x.arc(ptr.x, ptr.y, ptr.down ? 5 : 3.2, 0, 6.283);
                        x.fillStyle = 'rgba(230,255,250,.9)';
                        x.fill();
                    }
                    for (let i = S.length - 1; i >= 0; i--) {
                        const s = S[i];
                        s.x += s.vx;
                        s.y += s.vy;
                        s.vx *= .96;
                        s.vy *= .96;
                        s.l -= s.d;
                        if (s.l <= 0) {
                            S.splice(i, 1);
                            continue;
                        }
                        x.beginPath();
                        x.arc(s.x, s.y, s.r * s.l + .3, 0, 6.283);
                        x.fillStyle = s.b ? `rgba(165,201,255,${s.l * .9})` : `rgba(190,255,244,${s.l * .9})`;
                        x.fill();
                    }
                    for (let i = R.length - 1; i >= 0; i--) {
                        const r = R[i];
                        r.r += 5.5;
                        r.a *= .955;
                        if (r.a < .02) {
                            R.splice(i, 1);
                            continue;
                        }
                        x.beginPath();
                        x.arc(r.x, r.y, r.r, 0, 6.283);
                        x.strokeStyle = `rgba(165,245,230,${r.a})`;
                        x.lineWidth = 2;
                        x.stroke();
                    }
                    nextStar -= dt;
                    if (nextStar <= 0 && !star) {
                        const fromLeft = Math.random() < .5;
                        star = {
                            x: fromLeft ? rnd(0, W * .5) : rnd(W * .5, W),
                            y: rnd(0, H * .4),
                            vx: (fromLeft ? 1 : -1) * rnd(9, 14),
                            vy: rnd(3.5, 6),
                            l: 1
                        };
                        nextStar = rnd(2200, 5200);
                    }
                    if (star) {
                        star.x += star.vx;
                        star.y += star.vy;
                        star.l -= .018;
                        if (star.l <= 0 || star.x < -80 || star.x > W + 80 || star.y > H + 80) star = null;
                        else {
                            const g2 = x.createLinearGradient(star.x, star.y, star.x - star.vx * 9, star.y - star.vy * 9);
                            g2.addColorStop(0, `rgba(235,255,250,${star.l})`);
                            g2.addColorStop(1, 'rgba(140,231,216,0)');
                            x.strokeStyle = g2;
                            x.lineWidth = 2;
                            x.lineCap = 'round';
                            x.beginPath();
                            x.moveTo(star.x, star.y);
                            x.lineTo(star.x - star.vx * 9, star.y - star.vy * 9);
                            x.stroke();
                        }
                    }
                };
                size();
                window.addEventListener('resize', size);
                if (reducedMotion) {
                    draw(false, 0);
                    return;
                }
                let last = performance.now();
                const loop = (now) => {
                    if (!root.isConnected) {
                        window.removeEventListener('resize', size);
                        return;
                    }
                    const dt = Math.min(64, now - last);
                    last = now;
                    if (!document.hidden) draw(true, dt);
                    requestAnimationFrame(loop);
                };
                requestAnimationFrame(loop);
            })();
        })();
