(function () {
  'use strict';

  const cfg = window.NOVIX_FIREBASE_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const statusBox = $('statusBox');
  const userPanel = $('userPanel');
  const userName = $('userName');
  const userAvatar = $('userAvatar');
  const tabs = [...document.querySelectorAll('.tab-btn')];
  const forms = {
    login: $('loginForm'),
    signup: $('signupForm'),
    reset: $('resetForm')
  };
  const SITE_KEY = 'novix.site.v1';

  const configured = () => Boolean(
    cfg.apiKey && cfg.apiKey !== 'YOUR_API_KEY' &&
    cfg.projectId && cfg.projectId !== 'YOUR_PROJECT_ID' &&
    cfg.appId && cfg.appId !== 'YOUR_APP_ID' &&
    window.firebase && window.firebase.auth && window.firebase.firestore
  );

  function status(message, type) {
    statusBox.textContent = message;
    statusBox.className = 'status-box' + (type ? ' ' + type : '');
  }

  function switchTab(name) {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    Object.entries(forms).forEach(([key, form]) => form.classList.toggle('active', key === name));
    status('', '');
  }

  function initials(text) {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return 'N';
    return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
  }

  function showUser(user) {
    const display = user.displayName || user.email || 'NOVIX user';
    userPanel.hidden = false;
    userName.textContent = display;
    userAvatar.textContent = initials(display);
    $('logoutBtn').hidden = false;
  }

  function showGuest() {
    userPanel.hidden = true;
    localStorage.setItem('novix.account.state', 'guest');
    localStorage.removeItem('novix.account.user');
  }

  function readLocalWorkspace() {
    try {
      const raw = localStorage.getItem(SITE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn('Could not read the local NOVIX workspace.', error);
      return null;
    }
  }

  async function restoreOrUploadWorkspace(user, db) {
    const docRef = db.collection('users').doc(user.uid).collection('workspace').doc('main');
    const snapshot = await docRef.get();
    if (snapshot.exists && snapshot.data().siteState) {
      localStorage.setItem(SITE_KEY, JSON.stringify(snapshot.data().siteState));
      status('Signed in. Your saved workspace is ready on this device. Return to NOVIX to resume.', 'success');
      return;
    }

    const localState = readLocalWorkspace();
    if (localState) {
      await docRef.set({ siteState: localState, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      status('Signed in. This device’s NOVIX workspace has been saved to your account.', 'success');
    } else {
      status('Account ready. Return to NOVIX to start your workspace.', 'success');
    }
  }

  async function onLogin(event, auth, db) {
    event.preventDefault();
    const button = forms.login.querySelector('[type="submit"]');
    button.disabled = true;
    try {
      const credential = await auth.signInWithEmailAndPassword($('loginEmail').value.trim(), $('loginPassword').value);
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: credential.user.uid, email: credential.user.email }));
      showUser(credential.user);
      await restoreOrUploadWorkspace(credential.user, db);
    } catch (error) {
      status(error.message || 'Log in failed. Check your email and password.', 'error');
    } finally {
      button.disabled = false;
    }
  }

  async function onSignup(event, auth, db) {
    event.preventDefault();
    const name = $('signupName').value.trim();
    const password = $('signupPassword').value;
    if (password !== $('signupConfirm').value) {
      status('The passwords do not match.', 'error');
      $('signupConfirm').focus();
      return;
    }
    const button = forms.signup.querySelector('[type="submit"]');
    button.disabled = true;
    try {
      const credential = await auth.createUserWithEmailAndPassword($('signupEmail').value.trim(), password);
      await credential.user.updateProfile({ displayName: name });
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: credential.user.uid, email: credential.user.email, name }));
      showUser(credential.user);
      await restoreOrUploadWorkspace(credential.user, db);
    } catch (error) {
      status(error.message || 'Account creation failed.', 'error');
    } finally {
      button.disabled = false;
    }
  }

  async function onReset(event, auth) {
    event.preventDefault();
    const button = forms.reset.querySelector('[type="submit"]');
    button.disabled = true;
    try {
      await auth.sendPasswordResetEmail($('resetEmail').value.trim());
      status('If an account exists for that email, Firebase will send a password reset link.', 'success');
      forms.reset.reset();
    } catch (error) {
      status(error.message || 'Could not send the reset email.', 'error');
    } finally {
      button.disabled = false;
    }
  }

  async function init() {
    tabs.forEach((tab) => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    switchTab('login');
    $('guestBtn').addEventListener('click', () => {
      showGuest();
      status('Guest mode selected. Your existing local workspace remains on this device.', 'success');
    });

    if (!configured()) {
      showGuest();
      status('Firebase did not load or its web config is incomplete. Check your connection and Firebase settings.', 'error');
      return;
    }

    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
    const auth = app.auth();
    const db = app.firestore();

    forms.login.addEventListener('submit', (event) => onLogin(event, auth, db));
    forms.signup.addEventListener('submit', (event) => onSignup(event, auth, db));
    forms.reset.addEventListener('submit', (event) => onReset(event, auth));
    $('logoutBtn').addEventListener('click', async () => {
      try {
        await auth.signOut();
        showGuest();
        status('You have logged out. Your account data remains saved in Firebase.', 'success');
      } catch (error) {
        status(error.message || 'Log out failed.', 'error');
      }
    });

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        showGuest();
        return;
      }
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName || '' }));
      showUser(user);
      try {
        await restoreOrUploadWorkspace(user, db);
      } catch (error) {
        console.error('NOVIX workspace sync failed.', error);
        status('You are signed in, but cloud workspace sync failed. Check Firestore setup and security rules.', 'error');
      }
    });
  }

  init().catch((error) => {
    console.error('NOVIX account initialization failed.', error);
    status('Could not initialize Firebase. Check the Firebase configuration.', 'error');
  });
})();
