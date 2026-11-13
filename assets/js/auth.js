(function () {
  const cfg = window.NOVIX_FIREBASE_CONFIG || {};
  const statusBox = document.getElementById('statusBox');
  const userPanel = document.getElementById('userPanel');
  const userName = document.getElementById('userName');
  const userAvatar = document.getElementById('userAvatar');
  const tabs = [...document.querySelectorAll('.tab-btn')];
  const forms = {
    login: document.getElementById('loginForm'),
    signup: document.getElementById('signupForm'),
    reset: document.getElementById('resetForm')
  };

  const isConfigured = !!cfg.apiKey &&
    cfg.apiKey !== 'YOUR_API_KEY' &&
    !!cfg.projectId &&
    cfg.projectId !== 'YOUR_PROJECT_ID';

  function setStatus(message, type) {
    statusBox.textContent = message;
    statusBox.className = 'status-box';
    if (type) statusBox.classList.add(type);
  }

  function setCurrentTab(tabName) {
    tabs.forEach((button) => {
      const isActive = button.dataset.tab === tabName;
      button.classList.toggle('active', isActive);
    });

    Object.entries(forms).forEach(([name, form]) => {
      form.classList.toggle('active', name === tabName);
    });
  }

  function getInitials(nameOrEmail) {
    const value = (nameOrEmail || '').trim();
    if (!value) return 'N';
    const parts = value.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return value.slice(0, 2).toUpperCase();
  }

  function applySignedInUser(user) {
    const name = user?.displayName || user?.email || 'User';
    userPanel.hidden = false;
    userName.textContent = name;
    userAvatar.textContent = getInitials(name);
  }

  function applyGuestState() {
    userPanel.hidden = false;
    userName.textContent = 'Guest';
    userAvatar.textContent = 'G';
    localStorage.setItem('novix.account.state', 'guest');
  }

  function bindTabEvents() {
    tabs.forEach((button) => {
      button.addEventListener('click', () => setCurrentTab(button.dataset.tab));
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!isConfigured) {
      setStatus('Firebase is not configured yet. Add your project keys in auth.html.', 'error');
      return;
    }

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ email: userCredential.user.email }));
      setStatus('Logged in successfully.', 'success');
      applySignedInUser(userCredential.user);
    } catch (error) {
      setStatus(error.message || 'Login failed.', 'error');
    }
  }

  async function onSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    if (!isConfigured) {
      setStatus('Firebase is not configured yet. Add your project keys in auth.html.', 'error');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        await userCredential.user.updateProfile({ displayName: name || 'NOVIX User' });
      }
      localStorage.setItem('novix.account.state', 'signed-in');
      localStorage.setItem('novix.account.user', JSON.stringify({ email, name }));
      setStatus('Account created successfully.', 'success');
      applySignedInUser(userCredential.user);
    } catch (error) {
      setStatus(error.message || 'Account creation failed.', 'error');
    }
  }

  async function onReset(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();

    if (!isConfigured) {
      setStatus('Firebase is not configured yet. Add your project keys in auth.html.', 'error');
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setStatus('Password reset email sent successfully.', 'success');
    } catch (error) {
      setStatus(error.message || 'Reset email failed.', 'error');
    }
  }

  async function onLogout() {
    try {
      await firebase.auth().signOut();
      localStorage.setItem('novix.account.state', 'guest');
      applyGuestState();
      setStatus('You are logged out.', 'success');
    } catch (error) {
      setStatus(error.message || 'Logout failed.', 'error');
    }
  }

  function onGuest() {
    applyGuestState();
    setStatus('You are using NOVIX in guest mode.', 'success');
  }

  function initFirebase() {
    if (!isConfigured) {
      setStatus('Add your Firebase web config to the top of auth.html to continue.', 'error');
      applyGuestState();
      return;
    }

    const app = firebase.initializeApp(cfg);
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('novix.account.state', 'signed-in');
        applySignedInUser(user);
        setStatus('Firebase authentication is active.', 'success');
      } else {
        applyGuestState();
        setStatus('Ready for login or sign up.', 'success');
      }
    });

    document.getElementById('loginForm').addEventListener('submit', onLogin);
    document.getElementById('signupForm').addEventListener('submit', onSignup);
    document.getElementById('resetForm').addEventListener('submit', onReset);
    document.getElementById('logoutBtn').addEventListener('click', onLogout);
    document.getElementById('guestBtn').addEventListener('click', onGuest);
  }

  bindTabEvents();
  setCurrentTab('login');
  applyGuestState();

  if (window.firebase && firebase.apps && firebase.apps.length) {
    initFirebase();
  } else {
    setTimeout(() => {
      if (window.firebase && firebase.apps) initFirebase();
      else setStatus('Firebase scripts did not load. Check your network or embed config.', 'error');
    }, 200);
  }
})();
