/* ============================================================
   ExcuseGen — pwa.js
   Handles: Service Worker registration · Install prompt
            App update banner · Standalone detection
   Add <script src="pwa.js"></script> to ALL HTML pages
   ============================================================ */

'use strict';

/* ── 1. REGISTER SERVICE WORKER ──────────────────────────────── */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(reg => {
        console.log('[PWA] Service Worker registered:', reg.scope);

        /* Listen for updates — show banner when new version is available */
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              /* New version ready — show update notification */
              showUpdateBanner();
            }
          });
        });
      })
      .catch(err => console.warn('[PWA] SW registration failed:', err));

    /* Listen for controller change (after update) and reload */
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}

/* ── 2. INSTALL PROMPT (Add to Home Screen) ──────────────────── */

let deferredPrompt = null; /* Store the install event */

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); /* Prevent mini-infobar on mobile Chrome */
  deferredPrompt = e;
  console.log('[PWA] Install prompt available');

  /* Show custom install button after a delay (not immediately — less annoying) */
  setTimeout(showInstallBanner, 30000); /* 30 seconds after page load */
});

/* Called when user installs the app */
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App installed successfully!');
  deferredPrompt = null;
  hideInstallBanner();
  showToastPWA('🎉 ExcuseGen installed! Find it on your home screen.');
});

/* ── 3. INSTALL BANNER UI ────────────────────────────────────── */

function showInstallBanner() {
  /* Don't show if already in standalone mode or no prompt available */
  if (isStandalone() || !deferredPrompt) return;
  /* Don't show if user already dismissed it this session */
  if (sessionStorage.getItem('pwa_dismissed')) return;

  const banner = document.getElementById('pwaInstallBanner');
  if (banner) {
    banner.removeAttribute('hidden');
    banner.style.animation = 'slideUp 0.4s ease both';
  }
}

function hideInstallBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.setAttribute('hidden', '');
}

/* Triggered by "Install App" button click */
async function triggerInstallPrompt() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('[PWA] User choice:', outcome);

  deferredPrompt = null;
  hideInstallBanner();

  if (outcome === 'accepted') {
    showToastPWA('✅ Installing ExcuseGen…');
  }
}

/* Dismiss banner */
function dismissInstallBanner() {
  hideInstallBanner();
  sessionStorage.setItem('pwa_dismissed', '1');
}

/* ── 4. UPDATE BANNER ────────────────────────────────────────── */

function showUpdateBanner() {
  const banner = document.getElementById('pwaUpdateBanner');
  if (banner) banner.removeAttribute('hidden');
}

function applyUpdate() {
  const banner = document.getElementById('pwaUpdateBanner');
  if (banner) banner.setAttribute('hidden', '');

  /* Tell SW to skip waiting and activate new version */
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg && reg.waiting) {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  });
}

/* ── 5. STANDALONE DETECTION ─────────────────────────────────── */
/* Detect if running as installed app vs in browser */

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true || /* iOS Safari */
         document.referrer.includes('android-app://');
}

/* Add class to body so CSS can style the installed app differently */
document.addEventListener('DOMContentLoaded', () => {
  if (isStandalone()) {
    document.body.classList.add('pwa-standalone');
    console.log('[PWA] Running as installed app');
  }

  /* Read URL params for shortcut links (manifest shortcuts) */
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    const catSelect = document.getElementById('category');
    if (catSelect) {
      catSelect.value = cat;
      /* Auto-generate on shortcut launch */
      setTimeout(() => {
        const genBtn = document.getElementById('genBtn');
        if (genBtn) genBtn.click();
      }, 800);
    }
  }
});

/* ── 6. TOAST HELPER (for PWA-specific messages) ─────────────── */

function showToastPWA(msg) {
  /* Use existing showToast if script.js is loaded */
  if (typeof showToast === 'function') {
    showToast(msg, 'success');
    return;
  }
  /* Fallback */
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position:fixed; bottom:28px; left:50%;
    transform:translateX(-50%);
    background:#22c55e; color:#000;
    font-weight:700; padding:12px 24px;
    border-radius:100px; z-index:9999;
    font-family:system-ui,sans-serif;
    box-shadow:0 8px 30px rgba(34,197,94,0.4);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ── 7. EXPOSE FUNCTIONS GLOBALLY ────────────────────────────── */
window.triggerInstallPrompt = triggerInstallPrompt;
window.dismissInstallBanner = dismissInstallBanner;
window.applyUpdate          = applyUpdate;
