        try {
            var __s = JSON.parse(localStorage.getItem("novix.site.v1") || "null"),
                __d = matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.dataset.theme = (__s && __s.themeUser) ? (__s.theme === "dark" ? "dark" : "light") : (__d ? "dark" : "light")
        } catch (e) {}

;
        window.nxThemeColor = function(c) {
            try {
                var m = document.querySelector('meta[name=theme-color]');
                if (!m) {
                    m = document.createElement("meta");
                    m.name = "theme-color";
                    document.head.appendChild(m)
                }
                m.content = c || (document.documentElement.dataset.theme === "dark" ? "#0e1916" : "#f1fbfa")
            } catch (e) {}
        };
        nxThemeColor()

;
(() => {
    const CRIT = ['assets/img/logo.webp', 'assets/img/welcome-bg.webp', 'assets/img/bg-decor.svg'];
    const BG = {
        dawn: 'assets/img/focus-dawn.webp',
        space: 'assets/img/focus-space.webp',
        aurora: 'assets/img/focus-aurora.webp',
        sunset: 'assets/img/focus-sunset.webp'
    };
    const SND = {
        space: 'assets/audio/space.mp3',
        lofi: 'assets/audio/lofi.mp3',
        fire: 'assets/audio/fireplace.mp3',
        rain: 'assets/audio/rain.mp3',
        ocean: 'assets/audio/ocean.mp3'
    };
    const MEDIA = 'novix-media';
    const P = window.NXPRE = {
        url: {},
        imgs: []
    };
    const lite = () => {
        const c = navigator.connection || {};
        return !!c.saveData || /(^|-)2g$/.test(c.effectiveType || '');
    };
    CRIT.forEach(src => {
        const im = new Image();
        im.decoding = 'async';
        if ('fetchPriority' in im) im.fetchPriority = 'high';
        im.src = src;
        P.imgs.push(im);
        if (im.decode) im.decode().catch(() => {});
    });
    let imgsStarted = false,
        audioStarted = false;
    const loadImgs = () => {
        if (imgsStarted) return;
        imgsStarted = true;
        let want = '';
        try {
            want = localStorage.getItem('novix.focus.background.v3') || '';
        } catch (e) {}
        const order = Object.keys(BG).sort((a, b) => (b === want) - (a === want));
        const next = () => {
            const id = order.shift();
            if (!id) return;
            const im = new Image();
            im.decoding = 'async';
            if ('fetchPriority' in im) im.fetchPriority = 'low';
            im.onload = im.onerror = next;
            im.src = BG[id];
            P.imgs.push(im);
            if (id === want && im.decode) im.decode().catch(() => {});
        };
        next();
    };
    const fetchBlob = async src => {
        let cache = null;
        try {
            cache = await caches.open(MEDIA);
        } catch (e) {}
        let res = cache && await cache.match(src);
        if (!res) {
            res = await fetch(src, {
                priority: 'low'
            });
            if (!res.ok) throw new Error(src);
            if (cache && !(navigator.serviceWorker && navigator.serviceWorker.controller)) cache.put(src, res.clone()).catch(() => {});
        }
        return res.blob();
    };
    const small = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent) || (navigator.deviceMemory && navigator.deviceMemory < 4);
    const readerOpen = () => {
        const r = document.getElementById('novix-pdf-reader');
        return !!(r && r.classList.contains('open'));
    };
    P.loadAudio = () => {
        if (audioStarted || lite()) return;
        audioStarted = true;
        const queue = Object.keys(SND);
        const next = async () => {
            if (readerOpen()) return setTimeout(next, 3000);
            const id = queue.shift();
            if (!id) return;
            try {
                const blob = await fetchBlob(SND[id]);
                if (!small) P.url[id] = URL.createObjectURL(blob);
            } catch (e) {}
            return next();
        };
        next();
    };
    const idle = f => 'requestIdleCallback' in window ? requestIdleCallback(f, {
        timeout: 3000
    }) : setTimeout(f, 1500);
    const run = () => setTimeout(() => idle(() => {
        if (lite()) return;
        loadImgs();
        P.loadAudio();
    }), 1200);
    if (document.readyState === 'complete') run();
    else addEventListener('load', run, {
        once: true
    });
})();

;
