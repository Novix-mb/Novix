(() => {
  'use strict';

  const FIREBASE = {
    apiKey: 'AIzaSyB_1GZ7USnFqJ5-bPMwk07TpH7UXQ2tIVk',
    authDomain: 'novix-74ae7.firebaseapp.com',
    projectId: 'novix-74ae7',
    appId: '1:1068033555371:web:a48711e58dd7613d8db0ee'
  };
  const STATE_KEY = 'novix.site.v1';
  const RESTORE_KEY = 'novix.account.restore.uid';
  let auth = null;
  let db = null;
  let syncTimer = 0;
  let lastSaved = '';
  let activeUid = '';
  let restoreTask = null;
  let currentUser = null;

  const styleText = `
    .nx-account-trigger{border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--text);padding:9px 14px;font:700 13px inherit;cursor:pointer;box-shadow:var(--sh)}
    .nx-account-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:18px;background:rgba(4,13,16,.68);backdrop-filter:blur(10px)}
    .nx-account-overlay[hidden]{display:none}
    .nx-account-dialog{position:relative;width:min(100%,440px);max-height:min(92vh,760px);overflow:auto;padding:26px;border:1px solid var(--line);border-radius:24px;background:var(--card);color:var(--text);box-shadow:var(--sh)}
    .nx-account-dialog h2{margin:0 36px 6px 0;font-size:25px}.nx-account-dialog p{color:var(--muted);margin:0 0 18px;font-size:14px}
    .nx-account-close{position:absolute;inset-inline-end:16px;top:14px;border:0;background:transparent;color:var(--muted);font-size:24px;cursor:pointer}
    .nx-account-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:18px 0 14px}
    .nx-account-tabs button,.nx-account-form button{border:0;border-radius:12px;padding:11px 9px;font:700 13px inherit;cursor:pointer;background:var(--act);color:var(--text)}
    .nx-account-tabs button.active,.nx-account-form button[type=submit]{background:var(--btn);color:#fff}
    .nx-account-form{display:none;gap:12px}.nx-account-form.active{display:grid}
    .nx-account-form label{display:grid;gap:6px;font-size:13px;font-weight:700}
    .nx-account-form input{height:44px;width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:12px;background:var(--bg2);color:var(--text);padding:0 12px;font:inherit}
    .nx-account-status{min-height:20px;margin:8px 0 12px!important;font-size:13px!important}.nx-account-status.error{color:#d34b4b!important}.nx-account-status.success{color:#23835f!important}
    .nx-account-bottom{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:16px}.nx-account-bottom button{border:0;background:none;color:var(--muted);font:600 13px inherit;cursor:pointer}
    .nx-account-user{display:flex;align-items:center;gap:10px;margin-top:14px;padding-top:14px;border-top:1px solid var(--line);font-size:13px}.nx-account-user[hidden]{display:none}.nx-account-user b{overflow-wrap:anywhere}
    .nx-account-avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:var(--btn);color:#fff;font-weight:800}
    .nx-account-form button:disabled{opacity:.6;cursor:wait}
    .nx-settings-account{width:100%;justify-content:space-between;gap:12px}.nx-settings-account button{flex:0 0 auto}
    @media(max-width:640px){.nx-account-dialog{padding:22px 18px}.nx-account-trigger{padding:8px 10px}}
  `;

  const byId = id => document.getElementById(id);
  function status(message, kind) {
    const el = byId('nx-account-status');
    if (!el) return;
    el.textContent = message || '';
    el.className = 'nx-account-status' + (kind ? ' ' + kind : '');
  }
  function localState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || 'null'); }
    catch (_) { return null; }
  }
  function accountLabel(user) {
    return user && (user.displayName || user.email) || 'NOVIX account';
  }
  function updateAccountUI(user) {
    currentUser = user || null;
    const label = accountLabel(user);
    const trigger = byId('nx-account-trigger');
    if (trigger) trigger.textContent = user ? label.split('@')[0] : 'Account';
    const settingsButton = byId('nx-account-settings-button');
    if (settingsButton) settingsButton.textContent = user ? 'Manage account' : 'Sign in / create account';
    const panel = byId('nx-account-user');
    if (panel) {
      panel.hidden = !user;
      if (user) {
        byId('nx-account-email').textContent = label;
        byId('nx-account-avatar').textContent = label.trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase() || 'N';
      }
    }
    const logout = byId('nx-account-logout');
    if (logout) logout.hidden = !user;
    if (user) {
      const name = user.displayName || user.email || 'Student';
      const uname = byId('uname');
      const sideName = byId('sideName');
      if (uname) uname.textContent = name;
      if (sideName) sideName.textContent = name;
    }
  }
  function openDialog(tab = 'login') {
    const overlay = byId('nx-account-overlay');
    if (!overlay) return;
    overlay.hidden = false;
    const tabButton = overlay.querySelector('[data-tab="' + tab + '"]');
    if (tabButton) tabButton.click();
    else byId('nx-login-email').focus();
  }
  function addUI() {
    if (!document.querySelector('.top') || byId('nx-account-overlay')) return;
    if (!document.getElementById('nx-account-style')) {
      const style = document.createElement('style');
      style.id = 'nx-account-style';
      style.textContent = styleText;
      document.head.appendChild(style);
    }
    const trigger = document.createElement('button');
    trigger.id = 'nx-account-trigger';
    trigger.type = 'button';
    trigger.className = 'nx-account-trigger';
    trigger.textContent = 'Account';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-label', 'Open account and sign-up options');
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
        <div class="nx-account-tabs" role="tablist" aria-label="Account actions">
          <button type="button" class="active" data-tab="login" role="tab" aria-selected="true">Log in</button>
          <button type="button" data-tab="signup" role="tab" aria-selected="false">Sign up</button>
          <button type="button" data-tab="reset" role="tab" aria-selected="false">Reset password</button>
        </div>
        <p class="nx-account-status" id="nx-account-status" role="status" aria-live="polite"></p>
        <form class="nx-account-form active" id="nx-account-login"><label>Email<input id="nx-login-email" type="email" autocomplete="email" required></label><label>Password<input id="nx-login-password" type="password" autocomplete="current-password" required></label><button type="submit">Log in</button></form>
        <form class="nx-account-form" id="nx-account-signup"><label>Name<input id="nx-signup-name" type="text" autocomplete="name" maxlength="80" required></label><label>Email<input id="nx-signup-email" type="email" autocomplete="email" required></label><label>Password (at least 8 characters)<input id="nx-signup-password" type="password" autocomplete="new-password" minlength="8" required></label><button type="submit">Create account</button></form>
        <form class="nx-account-form" id="nx-account-reset"><label>Email<input id="nx-reset-email" type="email" autocomplete="email" required></label><button type="submit">Send password reset link</button></form>
        <div class="nx-account-bottom"><button type="button" id="nx-account-guest">Continue as guest</button><button type="button" id="nx-account-logout" hidden>Log out</button></div>
        <div class="nx-account-user" id="nx-account-user" hidden><span class="nx-account-avatar" id="nx-account-avatar">N</span><b id="nx-account-email"></b></div>
      </section>`;
    document.body.appendChild(overlay);

    trigger.addEventListener('click', () => openDialog());
    const close = () => { overlay.hidden = true; trigger.focus(); };
    overlay.querySelector('.nx-account-close').addEventListener('click', close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !overlay.hidden) close(); });
    overlay.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => {
      overlay.querySelectorAll('[data-tab]').forEach(item => {
        const selected = item === tab;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      overlay.querySelectorAll('.nx-account-form').forEach(form => form.classList.toggle('active', form.id === 'nx-account-' + tab.dataset.tab));
      status('');
      const input = byId('nx-account-' + tab.dataset.tab).querySelector('input');
      if (input) input.focus();
    }));
    overlay.querySelector('#nx-account-guest').addEventListener('click', close);
    overlay.querySelector('#nx-account-login').addEventListener('submit', login);
    overlay.querySelector('#nx-account-signup').addEventListener('submit', signup);
    overlay.querySelector('#nx-account-reset').addEventListener('submit', resetPassword);
    overlay.querySelector('#nx-account-logout').addEventListener('click', async () => {
      if (!auth) return;
      try {
        await auth.signOut();
        clearInterval(syncTimer);
        activeUid = '';
        lastSaved = '';
        sessionStorage.removeItem(RESTORE_KEY);
        localStorage.removeItem('novix.account.state');
        localStorage.removeItem('novix.account.user');
        updateAccountUI(null);
        status('You have logged out. Your local workspace remains on this device.', 'success');
      } catch (error) { status(friendlyError(error), 'error'); }
    });

    const settings = document.getElementById('v-settings');
    const settingsCard = settings && settings.querySelector('.card');
    if (settingsCard && !byId('nx-account-settings-row')) {
      const row = document.createElement('div');
      row.className = 'fld nx-settings-account';
      row.id = 'nx-account-settings-row';
      const label = document.createElement('span');
      label.textContent = 'NOVIX account';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn ghost';
      button.id = 'nx-account-settings-button';
      button.textContent = 'Sign in / create account';
      button.addEventListener('click', () => openDialog(currentUser ? 'login' : 'login'));
      row.append(label, button);
      settingsCard.insertBefore(row, settingsCard.firstChild);
    }
  }
  function friendlyError(error) {
    const code = error && error.code;
    const messages = {
      'auth/email-already-in-use': 'An account already uses this email. Try logging in.',
      'auth/invalid-email': 'Enter a valid email address.',
      'auth/invalid-credential': 'Email or password is incorrect.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/weak-password': 'Choose a stronger password with at least 8 characters.',
      'auth/too-many-requests': 'Too many attempts. Please wait a while and try again.',
      'auth/network-request-failed': 'Network error. Check your connection and try again.',
      'permission-denied': 'Firebase denied access. Check that the Firestore rules are published.'
    };
    return messages[code] || (error && error.message) || 'The account request failed. Please try again.';
  }
  async function restoreWorkspace(user) {
    if (!db || !user) return;
    if (restoreTask && activeUid === user.uid) return restoreTask;
    activeUid = user.uid;
    restoreTask = (async () => {
      const ref = db.collection('users').doc(user.uid).collection('workspace').doc('main');
      const snapshot = await ref.get();
      const data = snapshot.exists ? snapshot.data() : null;
      const cloudState = data && data.siteState;
      const current = localState();
      if (cloudState) {
        const cloudJSON = JSON.stringify(cloudState);
        const currentJSON = JSON.stringify(current);
        if (cloudJSON !== currentJSON) {
          // Set the guard before changing local data or reloading. A restored state
          // can therefore trigger at most one reload per signed-in user and tab.
          let alreadyRestored = false;
          try { alreadyRestored = sessionStorage.getItem(RESTORE_KEY) === user.uid; }
          catch (_) { alreadyRestored = true; }
          if (!alreadyRestored) {
            try { sessionStorage.setItem(RESTORE_KEY, user.uid); } catch (_) {}
            localStorage.setItem(STATE_KEY, cloudJSON);
            lastSaved = cloudJSON;
            location.reload();
            return;
          }
        }
        lastSaved = cloudJSON;
        status('Signed in. Your workspace is ready.', 'success');
        startSync(user);
        return;
      }
      if (current) {
        const currentJSON = JSON.stringify(current);
        await ref.set({ siteState: current, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        lastSaved = currentJSON;
        status('Your current NOVIX workspace was saved to your account.', 'success');
      } else {
        lastSaved = '';
        status('Account connected. Your workspace will sync as you use NOVIX.', 'success');
      }
      startSync(user);
    })().finally(() => { restoreTask = null; });
    return restoreTask;
  }
  function startSync(user) {
    clearInterval(syncTimer);
    activeUid = user.uid;
    const ref = db.collection('users').doc(user.uid).collection('workspace').doc('main');
    syncTimer = setInterval(async () => {
      if (!navigator.onLine || auth.currentUser && auth.currentUser.uid !== user.uid) return;
      const state = localState();
      if (!state) return;
      const serialized = JSON.stringify(state);
      if (serialized === lastSaved) return;
      try {
        await ref.set({ siteState: state, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        lastSaved = serialized;
      } catch (error) { console.warn('NOVIX workspace cloud sync failed.', error); }
    }, 2500);
  }
  async function login(event) {
    event.preventDefault();
    if (!auth) return status('Firebase is still connecting. Try again in a moment.', 'error');
    const button = event.currentTarget.querySelector('[type=submit]');
    button.disabled = true;
    try {
      const result = await auth.signInWithEmailAndPassword(byId('nx-login-email').value.trim(), byId('nx-login-password').value);
      updateAccountUI(result.user);
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: result.user.uid, email: result.user.email, name: result.user.displayName || '' }));
      await restoreWorkspace(result.user);
    } catch (error) { status(friendlyError(error), 'error'); }
    finally { button.disabled = false; }
  }
  async function signup(event) {
    event.preventDefault();
    if (!auth) return status('Firebase is still connecting. Try again in a moment.', 'error');
    const button = event.currentTarget.querySelector('[type=submit]');
    button.disabled = true;
    try {
      const name = byId('nx-signup-name').value.trim();
      const result = await auth.createUserWithEmailAndPassword(byId('nx-signup-email').value.trim(), byId('nx-signup-password').value);
      await result.user.updateProfile({ displayName: name });
      updateAccountUI(result.user);
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: result.user.uid, email: result.user.email, name }));
      await restoreWorkspace(result.user);
    } catch (error) { status(friendlyError(error), 'error'); }
    finally { button.disabled = false; }
  }
  async function resetPassword(event) {
    event.preventDefault();
    if (!auth) return status('Firebase is still connecting. Try again in a moment.', 'error');
    const button = event.currentTarget.querySelector('[type=submit]');
    button.disabled = true;
    try {
      await auth.sendPasswordResetEmail(byId('nx-reset-email').value.trim());
      status('If that email is registered, Firebase will send a password reset link.', 'success');
    } catch (error) { status(friendlyError(error), 'error'); }
    finally { button.disabled = false; }
  }
  function addScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find(script => script.src === src);
      if (existing) {
        if (existing.dataset.loaded === 'true') return resolve();
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  async function loadFirebase() {
    const scripts = [
      'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'
    ];
    for (const src of scripts) await addScript(src);
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE);
    auth = app.auth();
    db = app.firestore();
    auth.onAuthStateChanged(async user => {
      clearInterval(syncTimer);
      updateAccountUI(user);
      if (!user) {
        activeUid = '';
        lastSaved = '';
        return;
      }
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName || '' }));
      try { await restoreWorkspace(user); }
      catch (error) { status('Signed in, but cloud sync failed. Check Firebase Firestore setup and security rules.', 'error'); console.error(error); }
    });
  }
  function boot() {
    addUI();
    updateAccountUI(null);
    loadFirebase().catch(error => {
      status('Could not connect to Firebase. Check your connection and Firebase settings.', 'error');
      console.error('NOVIX Firebase initialization failed.', error);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
