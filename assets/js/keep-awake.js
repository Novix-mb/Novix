        (() => {
            const MP4 = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAM2bW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAB9AAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAmB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAB9AAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAEAAAABAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAfQAAAAAAABAAAAAAHYbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABAAAAAgABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABg21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAUNzdGJsAAAAu3N0c2QAAAAAAAAAAQAAAKthdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAQABIAAAASAAAAAAAAAABFUxhdmM2MC4zMS4xMDIgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAAMWF2Y0MBQsAK/+EAGGdCwAqmERCbARAAAAMAEAAAAwBA8SJhGAEABmjIQgOSyAAAABBwYXNwAAAAAQAAAAEAAAAUYnRydAAAAAAAAAq0AAAKtAAAABhzdHRzAAAAAAAAAAEAAAAEAAAgAAAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAEAAAAAQAAACRzdHN6AAAAAAAAAAAAAAAEAAACjQAAAAoAAAALAAAACwAAABRzdGNvAAAAAAAAAAEAAANmAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY2MC4xNi4xMDAAAAAIZnJlZQAAArVtZGF0AAACbwYF//9r3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2NCByMzEwOCAzMWUxOWY5IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyMyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTAgcmVmPTE2IGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMzEgbWU9dW1oIHN1Ym1lPTEwIHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MjQgY2hyb21hX21lPTEgdHJlbGxpcz0yIDh4OGRjdD0wIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTAgd2VpZ2h0cD0wIGtleWludD00IGtleWludF9taW49MSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQgcmM9Y3JmIG1idHJlZT0xIGNyZj00MC4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAFmWIggKeTFAAEge+++uuuuuuuuuuuvAAAAAGQZocBTwjAAAAB0GaKgFPCMAAAAAHQZo7AS8IwA==',
                WEBM = 'data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAIxEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHYTbuMU6uEElTDZ1OsggEeTbuMU6uEHFO7a1OsggIb7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsirXsYMPQkBNgI1MYXZmNjAuMTYuMTAwV0GNTGF2ZjYwLjE2LjEwMESJiECfQAAAAAAAFlSua8GuAQAAAAAAADjXgQFzxYhIqMh2MtBGnJyBACK1nIN1bmSIgQCGhVZfVlA4g4EBI+ODhB3NZQDgibCBQLqBQJqBAhJUw2f8c3OgY8CAZ8iaRaOHRU5DT0RFUkSHjUxhdmY2MC4xNi4xMDBzc9ZjwItjxYhIqMh2MtBGnGfIoUWjh0VOQ09ERVJEh5RMYXZjNjAuMzEuMTAyIGxpYnZweGfIoUWjiERVUkFUSU9ORIeTMDA6MDA6MDIuMDAwMDAwMDAwAB9DtnX354EAo6qBAACA8AIAnQEqQABAAABHCIWFiIWEiAICAAZwPEJgCrIg9zAA/v+rUICjloEB9ADRAQABEBAAGAAYWC/0AAiOgACjloED6ADRAQABEBAAGAAYWC/0AAiOgACjloEF3ADRAQABEBAAGAAYWC/0AAiOgAAcU7trkbuPs4EAt4r3gQHxggGf8IED';
            let want = false,
                lock = null,
                asking = false,
                failed = !('wakeLock' in navigator),
                vid = null,
                stopT = 0;

            function video() {
                if (vid) return vid;
                vid = document.createElement('video');
                vid.setAttribute('playsinline', '');
                vid.setAttribute('webkit-playsinline', '');
                vid.setAttribute('muted', '');
                vid.setAttribute('aria-hidden', 'true');
                vid.setAttribute('tabindex', '-1');
                vid.muted = true;
                vid.loop = true;
                vid.defaultMuted = true;
                vid.disableRemotePlayback = true;
                vid.style.cssText = 'position:fixed;left:0;bottom:0;width:2px;height:2px;opacity:.02;pointer-events:none;z-index:-1';
                for (const [u, ty] of [
                        [MP4, 'video/mp4'],
                        [WEBM, 'video/webm']
                    ]) {
                    const s = document.createElement('source');
                    s.src = u;
                    s.type = ty;
                    vid.appendChild(s)
                }
                document.body.appendChild(vid);
                return vid
            }

            function vidOn() {
                clearTimeout(stopT);
                const v = video();
                if (v.paused) {
                    const p = v.play();
                    if (p && p.catch) p.catch(() => {})
                }
            }

            function vidOff() {
                clearTimeout(stopT);
                stopT = setTimeout(() => {
                    if (vid && !want) vid.pause()
                }, 2500)
            }

            function lockOn() {
                if (failed || lock || asking || document.hidden) return;
                asking = true;
                navigator.wakeLock.request('screen').then(l => {
                    asking = false;
                    if (!want) {
                        l.release().catch(() => {});
                        return
                    }
                    lock = l;
                    l.addEventListener('release', () => {
                        if (lock === l) lock = null
                    })
                }).catch(() => {
                    asking = false;
                    failed = true;
                    if (want) vidOn()
                })
            }

            function lockOff() {
                if (!lock) return;
                const l = lock;
                lock = null;
                l.release().catch(() => {})
            }

            function sync() {
                if (want) {
                    lockOn();
                    if (failed) vidOn()
                } else {
                    lockOff();
                    vidOff()
                }
            }
            window.__nxAwake = on => {
                want = !!on;
                sync()
            };
            document.addEventListener('visibilitychange', () => {
                if (want && !document.hidden) {
                    lock = null;
                    sync();
                    if (vid && vid.paused && failed) vidOn()
                }
            });
            setInterval(() => {
                if (!want || document.hidden) return;
                if (!failed && !lock) lockOn();
                if (failed && vid && vid.paused) vidOn()
            }, 4000);
            addEventListener('pagehide', () => {
                want = false;
                lockOff()
            })
        })();
