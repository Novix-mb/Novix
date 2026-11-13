(() => {
  'use strict';

  const FIREBASE = {
    apiKey: 'AIzaSyB_1GZ7USnFqJ5-bPMwk07TpH7UXQ2tIVk',
    authDomain: 'novix-74ae7.firebaseapp.com',
    projectId: 'novix-74ae7',
    appId: '1:1068033555371:web:a48711e58dd7613d8db0ee'
  };
  const STATE_KEY = 'novix.site.v1';
  const CLOUD_DOC = 'users';
  let auth = null;
  let db = null;
  let syncTimer = 0;
  let lastSaved = '';
  let restoring = false;

  const css = `
    .nx-account-trigger{border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--text);padding:9px 14px;font:700 13px inherit;cursor:pointer;box-shadow:var(--sh)}
    .nx-account-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:18px;background:rgba(4,13,16,.68);backdrop-filter:blur(10px)}
    .nx-account-overlay[hidden]{display:none}
    .nx-account-dialog{position:relative;width:min(100%,440px);max-height:min(92vh,760px);overflow:auto;padding:26px;border:1px solid var(--line);border-radius:24px;background:var(--card);color:var(--text);box-shadow:0 28px 90px #0006}
    .nx-account-dialog h2{margin:0 0 6px;font-size:25px}.nx-account-dialog p{color:var(--muted);margin:0 0 18px;font-size:14px}
    .nx-account-close{position:absolute;inset-inline-end:16px;top:14px;border:0;background:transparent;color:var(--muted);font-size:24px;cursor:pointer}
    .nx-account-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:18px 0 14px}
    .nx-account-tabs button,.nx-account-form button{border:0;border-radius:12px;padding:11px 9px;font:700 13px inherit;cursor:pointer;background:var(--act);color:var(--text)}
    .nx-account-tabs button.active,.nx-account-form button[type=submit]{background:var(--btn);color:#fff}
    .nx-account-form{display:none;gap:12px}.nx-account-form.active{display:grid}
    .nx-account-form label{display:grid;gap:6px;font-size:13px;font-weight:700}
    .nx-account-form input{height:44px;width:100%;border:1px solid var(--line);border-radius:12px;background:var(--bg2);color:var(--text);padding:0 12px}
    .nx-account-status{min-height:20px;margin:8px 0 12px!important;font-size:13px!important}.nx-account-status.error{color:#d34b4b!important}.nx-account-status.success{color:#23835f!important}
    .nx-account-bottom{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:16px}.nx-account-bottom button{border:0;background:none;color:var(--muted);font:600 13px inherit;cursor:pointer}
    .nx-account-user{display:flex;align-items:center;gap:10px;margin-top:14px;padding-top:14px;border-top:1px solid var(--line);font-size:13px}.nx-account-user b{overflow-wrap:anywhere}.nx-account-avatar{width:36px;height:36px;flex:none;display:grid;place-items:center;border-radius:50%;background:var(--act);font-weight:800}
    .nx-account-form button:disabled{opacity:.6;cursor:wait}
    @media(max-width:640px){.nx-account-dialog{padding:22px 18px}.nx-account-trigger{padding:8px 10px}}
  `;

  function addUI() {
    if (!document.querySelector('.top') || document.getElementById('nx-account-overlay')) return;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const trigger = document.createElement('button');
    trigger.id = 'nx-account-trigger';
    trigger.type = 'button';
    trigger.className = 'nx-account-trigger';
    trigger.textContent = 'Account';
    trigger.setAttribute('aria-haspopup', 'dialog');
    document.querySelector('.top').appendChild(trigger);

    const overlay = document.createElement('div');
    overlay.id = 'nx-account-overlay';
    overlay.className = 'nx-account-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <section class="nx-account-dialog" role="dialog" aria-modal="true" aria-labelledby="nx-account-title">
        <button class="nx-account-close" type="button" aria-label="Close account window">×</button>
        <h2 id="nx-account-title">Your NOVIX account</h2>
        <p>Sign in to resume your study workspace, or create an account to sync it across devices.</p>
        <div class="nx-account-tabs" role="tablist">
          <button type="button" class="active" data-tab="login">Log in</button>
          <button type="button" data-tab="signup">Sign up</button>
          <button type="button" data-tab="reset">Reset</button>
        </div>
        <p class="nx-account-status" id="nx-account-status" role="status" aria-live="polite"></p>
        <form class="nx-account-form active" id="nx-account-login">
          <label>Email<input id="nx-login-email" type="email" autocomplete="email" required></label>
          <label>Password<input id="nx-login-password" type="password" autocomplete="current-password" required></label>
          <button type="submit">Log in</button>
        </form>
        <form class="nx-account-form" id="nx-account-signup">
          <label>Name<input id="nx-signup-name" type="text" autocomplete="name" maxlength="80" required></label>
          <label>Email<input id="nx-signup-email" type="email" autocomplete="email" required></label>
          <label>Password (at least 8 characters)<input id="nx-signup-password" type="password" autocomplete="new-password" minlength="8" required></label>
          <button type="submit">Create account</button>
        </form>
        <form class="nx-account-form" id="nx-account-reset">
          <label>Email<input id="nx-reset-email" type="email" autocomplete="email" required></label>
          <button type="submit">Send password reset link</button>
        </form>
        <div class="nx-account-bottom"><button type="button" id="nx-account-guest">Continue as guest</button><button type="button" id="nx-account-logout" hidden>Log out</button></div>
        <div class="nx-account-user" id="nx-account-user" hidden><span class="nx-account-avatar" id="nx-account-avatar">N</span><b id="nx-account-email"></b></div>
      </section>`;
    document.body.appendChild(overlay);

    const close = () => { overlay.hidden = true; trigger.focus(); };
    trigger.addEventListener('click', () => { overlay.hidden = false; overlay.querySelector('input:not([type=hidden])')?.focus(); });
    overlay.querySelector('.nx-account-close').addEventListener('click', close);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !overlay.hidden) close(); });
    overlay.querySelectorAll('[data-tab]').forEach((tab) => tab.addEventListener('click', () => {
      overlay.querySelectorAll('[data-tab]').forEach((item) => item.classList.toggle('active', item === tab));
      overlay.querySelectorAll('.nx-account-form').forEach((form) => form.classList.toggle('active', form.id === 'nx-account-' + tab.dataset.tab));
      setStatus('');
    }));
    overlay.querySelector('#nx-account-guest').addEventListener('click', close);
    overlay.querySelector('#nx-account-login').addEventListener('submit', (event) => login(event, overlay));
    overlay.querySelector('#nx-account-signup').addEventListener('submit', (event) => signup(event, overlay));
    overlay.querySelector('#nx-account-reset').addEventListener('submit', (event) => resetPassword(event, overlay));
    overlay.querySelector('#nx-account-logout').addEventListener('click', async () => {
      try {
        await auth.signOut();
        localStorage.removeItem(STATE_KEY);
        localStorage.removeItem('novix.account.state');
        localStorage.removeItem('novix.account.user');
        location.reload();
      } catch (error) { setStatus(error.message || 'Log out failed.', 'error'); }
    });
  }

  function setStatus(message, kind) {
    const el = document.getElementById('nx-account-status');
    if (!el) return;
    el.textContent = message;
    el.className = 'nx-account-status' + (kind ? ' ' + kind : '');
  }

  function setSignedIn(user) {
    const panel = document.getElementById('nx-account-user');
    if (!panel) return;
    const label = user.displayName || user.email || 'NOVIX account';
    panel.hidden = false;
    document.getElementById('nx-account-email').textContent = label;
    document.getElementById('nx-account-avatar').textContent = label.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    document.getElementById('nx-account-logout').hidden = false;
    const trigger = document.getElementById('nx-account-trigger');
    if (trigger) trigger.textContent = label.split('@')[0];
  }

  function localState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || 'null'); }
    catch (_) { return null; }
  }

  async function restoreWorkspace(user) {
    const ref = db.collection(CLOUD_DOC).doc(user.uid).collection('workspace').doc('main');
    const snap = await ref.get();
    if (snap.exists && snap.data().siteState) {
      const cloudState = snap.data().siteState;
      localStorage.setItem(STATE_KEY, JSON.stringify(cloudState));
      lastSaved = JSON.stringify(cloudState);
      restoring = true;
      location.reload();
      return;
    }
    const current = localState();
    if (current) {
      const serialized = JSON.stringify(current);
      await ref.set({ siteState: current, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      lastSaved = serialized;
      setStatus('Your current NOVIX workspace was saved to your account.');
    } else {
      setStatus('Account connected. Your workspace will sync as you use NOVIX.');
    }
    startSync(user);
  }

  function startSync(user) {
    clearInterval(syncTimer);
    const ref = db.collection(CLOUD_DOC).doc(user.uid).collection('workspace').doc('main');
    syncTimer = setInterval(async () => {
      if (restoring || !navigator.onLine) return;
      const state = localState();
      if (!state) return;
      const serialized = JSON.stringify(state);
      if (serialized === lastSaved) return;
      try {
        await ref.set({ siteState: state, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        lastSaved = serialized;
      } catch (error) {
        console.warn('NOVIX workspace cloud sync failed.', error);
      }
    }, 2500);
  }

  async function login(event) {
    event.preventDefault();
    if (!auth) return setStatus('Firebase is still connecting. Try again in a moment.', 'error');
    const button = event.currentTarget.querySelector('[type=submit]');
    button.disabled = true;
    try {
      const result = await auth.signInWithEmailAndPassword(document.getElementById('nx-login-email').value.trim(), document.getElementById('nx-login-password').value);
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: result.user.uid, email: result.user.email }));
      setSignedIn(result.user);
      await restoreWorkspace(result.user);
    } catch (error) { setStatus(error.message || 'Log in failed.', 'error'); }
    finally { button.disabled = false; }
  }

  async function signup(event) {
    event.preventDefault();
    if (!auth) return setStatus('Firebase is still connecting. Try again in a moment.', 'error');
    const button = event.currentTarget.querySelector('[type=submit]');
    button.disabled = true;
    try {
      const name = document.getElementById('nx-signup-name').value.trim();
      const result = await auth.createUserWithEmailAndPassword(document.getElementById('nx-signup-email').value.trim(), document.getElementById('nx-signup-password').value);
      await result.user.updateProfile({ displayName: name });
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: result.user.uid, email: result.user.email, name }));
      setSignedIn(result.user);
      await restoreWorkspace(result.user);
    } catch (error) { setStatus(error.message || 'Account creation failed.', 'error'); }
    finally { button.disabled = false; }
  }

  async function resetPassword(event) {
    event.preventDefault();
    if (!auth) return setStatus('Firebase is still connecting. Try again in a moment.', 'error');
    try {
      await auth.sendPasswordResetEmail(document.getElementById('nx-reset-email').value.trim());
      setStatus('If that email is registered, Firebase will send a reset link.', 'success');
    } catch (error) { setStatus(error.message || 'Could not send reset email.', 'error'); }
  }

  function loadFirebase() {
    if (!FIREBASE.apiKey || !FIREBASE.projectId || !FIREBASE.appId) {
      setStatus('Firebase configuration is missing.');
      return;
    }
    const scripts = [
      'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'
    ];
    const addScript = (src) => new Promise((resolve, reject) => {
      if ([...document.scripts].some((script) => script.src === src)) return resolve();
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    scripts.reduce((chain, src) => chain.then(() => addScript(src)), Promise.resolve()).then(() => {
      const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE);
      auth = app.auth();
      db = app.firestore();
      auth.onAuthStateChanged(async (user) => {
        clearInterval(syncTimer);
        if (!user) {
          const userPanel = document.getElementById('nx-account-user');
          if (userPanel) userPanel.hidden = true;
          const trigger = document.getElementById('nx-account-trigger');
          if (trigger) trigger.textContent = 'Account';
          return;
        }
        setSignedIn(user);
        localStorage.setItem('novix.account.state', 'signed-in');
        localStorage.setItem('novix.account.user', JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName || '' }));
        try { await restoreWorkspace(user); }
        catch (error) { setStatus('Signed in, but cloud sync failed. Check Firestore setup/rules.', 'error'); console.error(error); }
      });
    }).catch((error) => {
      setStatus('Could not load Firebase. Check your internet connection.', 'error');
      console.error(error);
    });
  }

  addUI();
  loadFirebase();
})();
