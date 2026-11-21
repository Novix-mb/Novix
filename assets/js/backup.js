/* NOVIX - backup & restore of the user's own data.
   Everything lives on the device, so this is the only way to move data to another device or survive a browser-data wipe.

   Included : tasks, notes, timetable, subjects, profile, settings, focus stats (localStorage "novix.*" keys)
              and PDF annotations (IndexedDB "novix-lib", keys "ann:*").
   Excluded : the book/PDF files themselves (they can be very large - add them again after restoring),
              and device-specific push/notification state. */
(() => {
    'use strict';
    const MAGIC = 'NOVIX-BACKUP';
    const SITE_KEY = 'novix.site.v1';
    const SKIP = /^novix\.(push|fx)\./;
    const ar = () => document.documentElement.lang === 'ar';
    const L = (en, a) => ar() ? a : en;
    const say = m => (window.NXTOAST ? window.NXTOAST(m) : alert(m));

    const openDB = () => new Promise((ok, no) => {
        const r = indexedDB.open('novix-lib', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('f');
        r.onsuccess = () => ok(r.result);
        r.onerror = () => no(r.error);
        r.onblocked = () => no(new Error('IndexedDB blocked'));
    });

    const readAnnotations = async () => {
        const out = {};
        try {
            const db = await openDB();
            await new Promise((ok, no) => {
                const t = db.transaction('f', 'readonly');
                const st = t.objectStore('f');
                const range = IDBKeyRange.bound('ann:', 'ann:\uffff');
                const req = st.openCursor(range);
                req.onsuccess = () => {
                    const c = req.result;
                    if (!c) return;
                    out[c.key] = c.value;
                    c.continue();
                };
                t.oncomplete = ok;
                t.onerror = t.onabort = () => no(t.error);
            });
            db.close();
        } catch (e) {
            console.warn('NOVIX backup: annotations not read', e);
        }
        return out;
    };

    const writeAnnotations = async ann => {
        const keys = Object.keys(ann || {}).filter(k => k.startsWith('ann:'));
        if (!keys.length) return;
        const db = await openDB();
        await new Promise((ok, no) => {
            const t = db.transaction('f', 'readwrite');
            const st = t.objectStore('f');
            keys.forEach(k => st.put(ann[k], k));
            t.oncomplete = ok;
            t.onerror = t.onabort = () => no(t.error);
        });
        db.close();
    };

    const collect = async () => {
        const ls = {};
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('novix.') && !SKIP.test(k)) ls[k] = localStorage.getItem(k);
        }
        return {
            magic: MAGIC,
            schema: window.NX_SCHEMA || 1,
            created: new Date().toISOString(),
            ls,
            annotations: await readAnnotations()
        };
    };

    const doExport = async () => {
        try {
            const data = await collect();
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'novix-backup-' + data.created.slice(0, 10) + '.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(a.href), 4000);
            say(L('Backup saved', 'تم حفظ النسخة الاحتياطية'));
        } catch (e) {
            console.error(e);
            say(L('Could not create the backup', 'تعذّر إنشاء النسخة الاحتياطية'));
        }
    };

    const validate = d => {
        if (!d || d.magic !== MAGIC || !d.ls || typeof d.ls !== 'object') return 'format';
        if ((+d.schema || 1) > (window.NX_SCHEMA || 1)) return 'newer';
        let site;
        try {
            site = JSON.parse(d.ls[SITE_KEY]);
        } catch (e) {
            return 'format';
        }
        if (!site || !Array.isArray(site.tasks)) return 'format';
        for (const k of Object.keys(d.ls)) {
            if (!k.startsWith('novix.') || SKIP.test(k) || typeof d.ls[k] !== 'string') return 'format';
        }
        return null;
    };

    const doImport = async file => {
        let data;
        try {
            data = JSON.parse(await file.text());
        } catch (e) {
            return say(L('This is not a NOVIX backup file', 'هذا ليس ملف نسخة احتياطية من NOVIX'));
        }
        const bad = validate(data);
        if (bad === 'newer') return say(L('This backup is from a newer version of NOVIX. Update the site first.', 'هذه النسخة من إصدار أحدث من NOVIX. حدّث الموقع أولاً.'));
        if (bad) return say(L('This is not a NOVIX backup file', 'هذا ليس ملف نسخة احتياطية من NOVIX'));

        const when = (data.created || '').slice(0, 10);
        const ok = window.NX_confirm ? await window.NX_confirm({
            title: L('Restore this backup?', 'استعادة هذه النسخة؟'),
            msg: L(
                'Backup from ' + when + '. It will replace your current tasks, notes, timetable and settings on this device. Book files are not part of a backup, so add them again. Export your current data first if you are unsure.',
                'نسخة بتاريخ ' + when + '. ستحل محل مهامك وملاحظاتك وجدولك وإعداداتك الحالية على هذا الجهاز. ملفات الكتب ليست ضمن النسخة، لذا أضفها من جديد. إن لم تكن متأكداً فصدّر بياناتك الحالية أولاً.'
            ),
            ok: L('Restore', 'استعادة'),
            danger: true
        }) : confirm(L('Replace current data with this backup?', 'استبدال البيانات الحالية بهذه النسخة؟'));
        if (!ok) return;

        /* all-or-nothing: remember what we overwrite so a failure (e.g. storage full) puts it back */
        const keys = Object.keys(data.ls);
        const before = {};
        keys.forEach(k => { before[k] = localStorage.getItem(k); });
        try {
            keys.forEach(k => localStorage.setItem(k, data.ls[k]));
            await writeAnnotations(data.annotations);
        } catch (e) {
            console.error(e);
            keys.forEach(k => {
                try {
                    before[k] === null ? localStorage.removeItem(k) : localStorage.setItem(k, before[k]);
                } catch (_) {}
            });
            return say(L('Restore failed. Your current data was kept.', 'فشلت الاستعادة. تم الاحتفاظ ببياناتك الحالية.'));
        }
        say(L('Backup restored', 'تمت استعادة النسخة'));
        setTimeout(() => location.reload(), 700);
    };

    const mount = () => {
        const reset = document.getElementById('reset');
        const row = reset && reset.closest('.fld');
        if (!row || document.getElementById('nxBackupRow')) return;

        const wrap = document.createElement('div');
        wrap.className = 'fld';
        wrap.id = 'nxBackupRow';
        wrap.innerHTML = '<span id="nxBkLbl"></span><span class="av-ctl">' +
            '<button class="btn ghost" id="nxBkExp" type="button"></button>' +
            '<label class="btn ghost" style="cursor:pointer"><span id="nxBkImpT"></span>' +
            '<input id="nxBkImp" type="file" accept="application/json,.json" hidden></label></span>';
        row.parentNode.insertBefore(wrap, row);

        const label = () => {
            document.getElementById('nxBkLbl').textContent = L('Backup', 'نسخة احتياطية');
            document.getElementById('nxBkExp').textContent = L('Export', 'تصدير');
            document.getElementById('nxBkImpT').textContent = L('Restore', 'استعادة');
        };
        label();
        new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

        document.getElementById('nxBkExp').addEventListener('click', doExport);
        document.getElementById('nxBkImp').addEventListener('change', e => {
            const f = e.target.files && e.target.files[0];
            e.target.value = '';
            if (f) doImport(f);
        });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
    else mount();
})();
