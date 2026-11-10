(function () {
  if (!('serviceWorker' in navigator)) return;

  var isAr = (document.documentElement.lang || '').indexOf('ar') === 0;
  var TXT = isAr
    ? { msg: 'يوجد تحديث جديد لـ NOVIX', btn: 'تحديث الآن' }
    : { msg: 'A new version of NOVIX is available', btn: 'Update now' };

  function showUpdateBanner(onAccept) {
    if (document.getElementById('nx-update-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'nx-update-bar';
    bar.setAttribute('role', 'status');
    bar.style.cssText =
      'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:99999;' +
      'display:flex;gap:12px;align-items:center;padding:10px 14px;border-radius:14px;' +
      'background:#1e2327;color:#fff;box-shadow:0 8px 30px rgba(0,0,0,.35);font:600 14px system-ui,sans-serif';
    var span = document.createElement('span');
    span.textContent = TXT.msg;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = TXT.btn;
    btn.style.cssText = 'border:0;border-radius:10px;padding:7px 12px;font:inherit;cursor:pointer;background:#5fd0b0;color:#0b2b25';
    btn.onclick = function () { btn.disabled = true; onAccept(); };
    bar.appendChild(span);
    bar.appendChild(btn);
    document.body.appendChild(bar);
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      function offer(worker) {
        showUpdateBanner(function () { worker.postMessage({ type: 'SKIP_WAITING' }); });
      }

      if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);

      reg.addEventListener('updatefound', function () {
        var w = reg.installing;
        if (!w) return;
        w.addEventListener('statechange', function () {
          if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w);
        });
      });

      document.addEventListener('visibilitychange', function () { if (!document.hidden) reg.update(); });
      setInterval(function () { reg.update(); }, 60 * 60 * 1000);
    }).catch(function () {});

    var reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (reloading) return;
      reloading = true;
      location.reload();
    });
  });
})();
