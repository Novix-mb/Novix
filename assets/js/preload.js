        (() => {
            const IMGS = [
                'assets/img/logo.webp',
                'assets/img/welcome-bg.webp',
                'assets/img/bg-decor.svg',
                'assets/img/focus-dawn.webp',
                'assets/img/focus-space.webp',
                'assets/img/focus-aurora.webp',
                'assets/img/focus-sunset.webp'
            ];
            const SND = {
                lofi: 'assets/audio/lofi.mp3',
                rain: 'assets/audio/rain.mp3',
                space: 'assets/audio/space.mp3',
                ocean: 'assets/audio/ocean.mp3',
                fire: 'assets/audio/fireplace.mp3'
            };
            const P = window.NXPRE = {
                url: {},
                imgs: []
            };
            const conn = navigator.connection || {};
            const lite = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
            IMGS.forEach((src, i) => {
                const im = new Image();
                im.decoding = 'async';
                if ('fetchPriority' in im) im.fetchPriority = i < 3 ? 'high' : 'low';
                im.src = src;
                P.imgs.push(im);
                if (im.decode) im.decode().catch(() => {});
            });
            if (lite) return;
            const queue = Object.keys(SND);
            const next = async () => {
                const id = queue.shift();
                if (!id) return;
                try {
                    const r = await fetch(SND[id]);
                    if (r.ok) P.url[id] = URL.createObjectURL(await r.blob());
                } catch (e) {}
                return next();
            };
            const go = () => {
                next();
                next();
            };
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go, {
                once: true
            });
            else go();
        })();
