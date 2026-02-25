/* ============================================================
   ExcuseGen v3 — script.js
   Full interactivity: generator · counter · copy · share
   feedback · nav · modals · scroll-reveal · AdSense-ready
   ============================================================ */

'use strict';

/* ── 1. EXCUSE DATABASE (65+ entries, 5 categories × 3 tones) ── */

const EXCUSES = {
  work: {
    serious: [
      "My internet went down without warning — my ISP confirmed the outage and I have a ticket number if needed.",
      "I had an unexpected family emergency this morning. Everything is resolved now and I'm fully available.",
      "My laptop suffered a critical hardware failure overnight and I had to restore from backup before I could work.",
      "I was handling an urgent client escalation that required my undivided attention until it was fully resolved.",
      "There was a serious accident blocking every viable route — traffic was completely gridlocked for over an hour.",
      "I was in a dead-signal zone all morning. I've been reachable by email the entire time, though.",
      "My car wouldn't start and I had to wait for roadside assistance before arranging alternative transport.",
      "I received an urgent message from our most important client last night and spent this morning getting them sorted first.",
      "There was a power outage in my building — my router and laptop were both offline until it was restored.",
      "I had a medical appointment booked months in advance that I could not reschedule.",
    ],
    funny: [
      "My cat sat on my keyboard and sent an unsolicited reply-all to the entire company. Damage control took three hours.",
      "My coffee machine broke. I made a personal policy decision not to operate heavy machinery — like a keyboard — without caffeine.",
      "I was completely ready to be on time until my motivational podcast told me to 'slow down and be present.' I was present. Just not here.",
      "I got extremely distracted Googling productivity hacks and completely lost track of time. Deeply ironic.",
      "My GPS sent me on a 'scenic route' for 45 minutes. It is also going through a midlife crisis.",
      "I was stress-eating, then stress-exercising, then stress-napping. It is a whole routine. HR should really cover this.",
      "My neighbour decided 6am was the ideal moment to test his drum kit. I have not emotionally recovered.",
      "I spent so long optimising my morning routine that I had no time to actually do my morning routine.",
      "My smart home went dumb. The lights wouldn't turn on, the thermostat rebooted twice, the coffee maker staged a protest.",
      "I got distracted researching whether a hot dog is a sandwich. I have answers now. At what cost, though.",
    ],
    professional: [
      "I apologise for the delay — I was finalising a time-sensitive deliverable that required uninterrupted focus.",
      "I was managing a high-priority escalation and could not safely step away without risking the outcome.",
      "Due to a technical failure outside my control, I was unable to attend. The issue is now resolved.",
      "I was completing a task that directly impacts our current sprint targets and made a judgement call to prioritise delivery.",
      "An urgent matter arose unexpectedly. I should have communicated sooner and I take full responsibility for that.",
    ],
  },

  school: {
    serious: [
      "I had a severe migraine that made screen use impossible. I visited the campus clinic and have documentation.",
      "There was a family emergency requiring my immediate presence and I had no opportunity to give adequate notice.",
      "I submitted through the portal but there appears to have been an upload error. I have the draft with its original timestamp.",
      "My bus route was cancelled due to a breakdown and no alternative services were available at that time.",
      "I was genuinely unaware of the revised deadline. I take full responsibility and accept any late penalty.",
      "I experienced a mental health episode and needed to prioritise my wellbeing. My counsellor can provide a note.",
      "I had an unavoidable medical appointment that was booked months in advance and could not be moved.",
    ],
    funny: [
      "My dog ate my homework. Classically. He also ate my charger, my confidence, and my will to exist before 9am.",
      "I did the assignment. I accidentally emailed it to myself instead of submitting. I have proof — please don't verify this.",
      "I was so absorbed in extra research for this exact class that I wrote a completely different essay. Very thorough. Wrong topic.",
      "I had a creative block that lasted 72 hours. I am told this is entirely normal for geniuses.",
      "I misread the syllabus. Twice. In opposite directions. It is honestly impressive.",
      "My roommate told me the deadline was tomorrow. We are both here. We have learned nothing.",
      "I set three alarms. My body entered a parallel dimension where all three were irrelevant.",
      "I was helping a classmate understand the material and completely lost track of time. Deeply altruistic.",
    ],
    professional: [
      "I sincerely apologise for the late submission. A technical issue prevented upload and I should have contacted you immediately.",
      "I take full responsibility for missing the session. A personal matter arose that I failed to manage within my schedule.",
      "Due to a documented illness, I was unable to attend. I would appreciate discussing an extension or makeup opportunity.",
    ],
  },

  personal: {
    serious: [
      "I got completely overwhelmed and needed time to decompress before I could be useful to anyone.",
      "My phone died and I wasn't near a charger for most of the day. I know the timing was terrible.",
      "I had a rough mental health day and needed to step back. I am doing better now.",
      "Something unexpected came up at home that I could not leave — I should have given you more notice.",
      "I was stuck in traffic for over an hour and my signal was too weak to call.",
      "I had a flat tyre and waited a long time for someone to come out.",
    ],
    funny: [
      "I tried to get ready but got trapped in a 45-minute internet spiral about whether birds are real. I have thoughts.",
      "My sofa physically would not let me leave. I fought it. The sofa won. Comfortably.",
      "I was almost out the door when my favourite song came on. Then another. It is not my fault.",
      "I fell asleep at 7pm and woke at 11pm thinking it was the next morning. I dressed for work. For nothing.",
      "I blinked and it was three hours later. Time is a flat circle and I am its victim.",
      "My plants looked sad. I had to have a long conversation with them. Personal care is important.",
      "I was so focused on being on time that I forgot to actually leave. A classic rookie error.",
    ],
    professional: [
      "I owe you a genuine apology — I was not managing my time responsibly and I let you down.",
      "I take complete ownership of this. I should have communicated immediately and I didn't.",
      "I understand this created a real inconvenience and I want to make it right. What would help most?",
    ],
  },

  relationship: {
    serious: [
      "I was completely overwhelmed with something I am still not ready to talk about — I needed space, not to shut you out.",
      "I lost track of time. I know that isn't enough and I am not offering it as justification — I am sorry.",
      "My phone died and I was nowhere near a charger. I know. Worst possible timing.",
      "I was helping someone who genuinely needed me right then and could not leave. I should have texted first.",
      "I was having a bad mental health day and did not want to bring that energy to you. I see now that disappearing was worse.",
    ],
    funny: [
      "I was planning something elaborate for you and cannot say more without ruining it. Ask me in 3–5 business days.",
      "I fell into a documentary about penguins. They got me. I am not entirely sorry.",
      "I completely zoned out thinking about how much I like you. Technically your fault. Mathematically your fault.",
      "I was on the phone with your mum. We have become very close. Let us not make this weird.",
      "I was building up the courage to be my best self for you. Construction ran over schedule. Still ongoing.",
      "Time stops existing when I am in a zone. Scientists believe this is a sign of high intelligence.",
    ],
    professional: [
      "I owe you a genuine apology. I was not thoughtful about your time and I understand why that hurt.",
      "There is no good excuse and I will not insult you by inventing one. I am sorry — what do you need?",
      "I let you down and I want to make it right. Can we talk about what you need going forward?",
    ],
  },

  friends: {
    serious: [
      "I genuinely thought it was next weekend — I have been completely off on dates. I am so sorry.",
      "Something came up at home that I could not get out of. I should have given you more notice.",
      "I was exhausted and hit a wall. I should have just told you that instead of going quiet.",
      "My phone died and I had no way to reach you. I was stuck with no options.",
    ],
    funny: [
      "I tried to get ready but got distracted debating with myself whether a cereal bar counts as breakfast. It does. I stand by this.",
      "My couch held me hostage. I negotiated. It won.",
      "I was on my way. Then my favourite song came on. Then another. I regret nothing.",
      "I got lost even though I have been to yours 47 times. In my defence, I was never paying attention any of those times.",
      "I fell asleep at 7pm and woke up genuinely confused about what year it was.",
      "I started getting ready and somehow ended up reorganising my entire wardrobe. I look great, at least.",
      "I calculated the travel time wrong in a way that was impressively, almost artistically incorrect.",
    ],
    professional: [
      "I dropped the ball and I am genuinely sorry. I value us — let me know when works to reschedule.",
      "That was poor time management on my part and I own it completely. What can I do to make it up?",
      "I was not upfront with you and that was not fair. I will do better — I mean it.",
    ],
  },
};

/* ── 2. CONTEXT PREFIX MAP ────────────────────────────────────── */
/* If user describes their situation, we add a relevant opener */

const CTX_PREFIXES = [
  { kw:['late','meeting','call','zoom','teams','standup'],  pfx:"About the missed meeting — " },
  { kw:['forgot','missed','skipped','didn\'t show','no show'], pfx:"I take full responsibility for missing — " },
  { kw:['homework','assignment','essay','paper','deadline','submit','upload'], pfx:"Regarding the assignment — " },
  { kw:['date','dinner','stood up','cancelled','reservation','restaurant'],   pfx:"About last night — " },
  { kw:['morning','alarm','overslept','wake','early'],       pfx:"I know I should have been up earlier — " },
  { kw:['text','message','reply','respond','call back','inbox'],              pfx:"About not getting back to you — " },
  { kw:['party','event','birthday','wedding','celebration'], pfx:"I am so sorry I missed it — " },
];

/* ── 3. STATE ─────────────────────────────────────────────────── */

let currentTone    = 'serious';  // Active tone selection
let currentExcuse  = '';          // Last generated excuse text
let totalGenerated = 0;           // Session counter (persisted in localStorage)
let toastTimer     = null;
let tipTimer       = null;

/* ── 4. LOCAL STORAGE COUNTER ────────────────────────────────── */
/* Persists total excuses generated across sessions for social proof */

function loadCounter() {
  try {
    const saved = parseInt(localStorage.getItem('eg_total') || '0', 10);
    // Start from a seeded number for social proof, add saved on top
    totalGenerated = 1247832 + (isNaN(saved) ? 0 : saved);
  } catch (e) {
    totalGenerated = 1247832;
  }
}

function saveCounter() {
  try {
    const userTotal = totalGenerated - 1247832;
    localStorage.setItem('eg_total', String(userTotal));
  } catch(e) { /* localStorage unavailable */ }
}

function updateCounterDisplay() {
  const el = document.getElementById('excuseCounter');
  if (!el) return;
  // Animate the number change
  el.style.animation = 'none';
  el.offsetHeight; // Reflow
  el.style.animation = 'countUp 0.3s ease both';
  el.textContent = totalGenerated.toLocaleString();
}

/* ── 5. DOM READY ─────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  loadCounter();
  updateCounterDisplay();
  bindEvents();
  highlightCurrentPage();
  setFooterYear();
  initScrollReveal();
});

/* ── 6. EVENT BINDING ─────────────────────────────────────────── */

function bindEvents() {
  // Tone selector buttons
  document.querySelectorAll('.tone-btn').forEach(btn => {
    btn.addEventListener('click', () => selectTone(btn));
  });

  // Main generate button
  const genBtn = document.getElementById('genBtn');
  if (genBtn) genBtn.addEventListener('click', generateExcuse);

  // Reset button — clears form and result
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetTool);

  // Copy button (inside result card)
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) copyBtn.addEventListener('click', copyExcuse);

  // Generate Another button
  const anotherBtn = document.getElementById('anotherBtn');
  if (anotherBtn) anotherBtn.addEventListener('click', generateExcuse);

  // Feedback buttons
  const fbUp   = document.getElementById('fbUp');
  const fbDown = document.getElementById('fbDown');
  if (fbUp)   fbUp.addEventListener('click',   () => handleFeedback('up'));
  if (fbDown) fbDown.addEventListener('click', () => handleFeedback('down'));

  // Situation input — Enter key triggers generate
  const situationInput = document.getElementById('situation');
  if (situationInput) {
    situationInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') generateExcuse();
    });
  }

  // ── Mobile nav toggle ──────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    // Toggle open/close on hamburger click
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeNav);
    });

    // Close when clicking anywhere outside the nav
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Close on window resize (prevents stale open state when switching orientations)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });
  }

  function closeNav() {
    const navLinks  = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (navToggle) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleContact);

  // ESC key closes share-tip
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideShareTip();
  });
}

/* ── 7. TONE SELECTION ───────────────────────────────────────── */

function selectTone(btn) {
  document.querySelectorAll('.tone-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  currentTone = btn.dataset.tone;
}

/* ── 8. GENERATE EXCUSE ──────────────────────────────────────── */

function generateExcuse() {
  const genBtn   = document.getElementById('genBtn');
  const category = (document.getElementById('category')  || {}).value || 'work';
  const situation= ((document.getElementById('situation') || {}).value || '').trim().toLowerCase();

  // Show loading state on button
  if (genBtn) {
    genBtn.classList.add('loading');
    genBtn.setAttribute('aria-busy', 'true');
  }

  // Simulate AI delay: 650–1100ms for UX feel
  const delay = 650 + Math.random() * 450;

  setTimeout(() => {
    const pool   = getPool(category, currentTone);
    let excuse   = pickRandom(pool);
    excuse       = applyContextPrefix(excuse, situation);

    currentExcuse = excuse;

    // Increment counter
    totalGenerated++;
    saveCounter();
    updateCounterDisplay();

    // Update result metadata tag
    const catEl  = document.getElementById('category');
    const catLabel = catEl ? catEl.options[catEl.selectedIndex].text.replace(/^.+?\s/, '') : 'Work';
    const toneLbl  = currentTone.charAt(0).toUpperCase() + currentTone.slice(1);
    const metaEl   = document.getElementById('resultMeta');
    if (metaEl) metaEl.textContent = `${catLabel} · ${toneLbl}`;

    // Typewriter render
    const resultCard = document.getElementById('resultCard');
    const resultText = document.getElementById('resultText');
    if (resultCard) resultCard.removeAttribute('hidden');
    if (resultText) {
      resultText.textContent = '';
      typeText(resultText, excuse);
    }

    // Reset feedback buttons
    resetFeedback();

    // Update share links
    updateShareLinks(excuse);

    // End loading
    if (genBtn) {
      genBtn.classList.remove('loading');
      genBtn.setAttribute('aria-busy', 'false');
    }

    // Show share tooltip after a short delay
    setTimeout(showShareTip, 1400);

    // Scroll result into view on mobile
    if (window.innerWidth < 768 && resultCard) {
      setTimeout(() => resultCard.scrollIntoView({ behavior:'smooth', block:'nearest' }), 150);
    }
  }, delay);
}

/* ── 9. HELPER FUNCTIONS ─────────────────────────────────────── */

function getPool(category, tone) {
  const cat  = EXCUSES[category]  || EXCUSES.work;
  return cat[tone] || cat.serious;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function applyContextPrefix(excuse, situation) {
  if (!situation) return excuse;
  for (const { kw, pfx } of CTX_PREFIXES) {
    if (kw.some(k => situation.includes(k))) {
      return pfx + excuse.charAt(0).toLowerCase() + excuse.slice(1);
    }
  }
  return excuse;
}

/* Typewriter effect — speed auto-tunes to excuse length */
function typeText(el, text) {
  el.classList.add('typing');
  let i = 0;
  const speed = Math.max(10, Math.min(26, Math.round(2000 / text.length)));
  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else {
      el.classList.remove('typing');
    }
  };
  tick();
}

/* ── 10. RESET TOOL ──────────────────────────────────────────── */
/* Clears the form and hides the result card */

function resetTool() {
  const situationEl = document.getElementById('situation');
  const resultCard  = document.getElementById('resultCard');
  const categoryEl  = document.getElementById('category');

  if (situationEl) situationEl.value = '';
  if (categoryEl)  categoryEl.value  = 'work';
  if (resultCard)  resultCard.setAttribute('hidden', '');

  // Reset tone to 'serious'
  document.querySelectorAll('.tone-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  const defaultTone = document.querySelector('.tone-btn[data-tone="serious"]');
  if (defaultTone) {
    defaultTone.classList.add('active');
    defaultTone.setAttribute('aria-pressed', 'true');
  }
  currentTone   = 'serious';
  currentExcuse = '';

  showToast('🔄 Tool reset — ready for a new excuse!');
  if (situationEl) situationEl.focus();
}

/* ── 11. COPY TO CLIPBOARD ───────────────────────────────────── */

function copyExcuse() {
  if (!currentExcuse) return;

  const copyBtn = document.getElementById('copyBtn');

  const fallback = () => {
    const el = document.createElement('textarea');
    el.value = currentExcuse;
    el.style.cssText = 'position:fixed;top:-9999px;opacity:0';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(el);
    showToast('📋 Copied to clipboard!', 'success');
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(currentExcuse)
      .then(() => showToast('📋 Copied to clipboard!', 'success'))
      .catch(fallback);
  } else {
    fallback();
  }

  // Visual feedback on button
  if (copyBtn) {
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 2200);
  }
}

/* ── 12. SHARE LINKS ─────────────────────────────────────────── */

function updateShareLinks(excuse) {
  const url  = encodeURIComponent('https://abdodady0201.github.io/excusegen/');
  const text = encodeURIComponent(`"${excuse}" — Generated by ExcuseGen ⚡`);

  const wa = document.getElementById('shareWa');
  const tw = document.getElementById('shareTw');
  const fb = document.getElementById('shareFb');

  if (wa) wa.href = `https://wa.me/?text=${text}%20${url}`;
  if (tw) tw.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=ExcuseGen`;
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
}

/* ── 13. SHARE TIP POPUP ─────────────────────────────────────── */
/* Encourages users to share after generating an excuse */

function showShareTip() {
  const tip = document.getElementById('shareTip');
  if (!tip) return;
  tip.classList.add('show');
  clearTimeout(tipTimer);
  tipTimer = setTimeout(hideShareTip, 4000);
}

function hideShareTip() {
  const tip = document.getElementById('shareTip');
  if (tip) tip.classList.remove('show');
}

/* ── 14. THUMBS UP / DOWN FEEDBACK ──────────────────────────── */

function handleFeedback(type) {
  const fbUp   = document.getElementById('fbUp');
  const fbDown = document.getElementById('fbDown');
  if (!fbUp || !fbDown) return;

  // Clear existing voted state
  fbUp.classList.remove('voted-up', 'voted-down');
  fbDown.classList.remove('voted-up', 'voted-down');

  if (type === 'up') {
    fbUp.classList.add('voted-up');
    showToast('👍 Thanks! Glad it helped.', 'success');
  } else {
    fbDown.classList.add('voted-down');
    showToast('👎 Got it — we\'ll improve!');
  }

  // In production: send to analytics / feedback endpoint
  // fetch('/api/feedback', { method:'POST', body: JSON.stringify({ type, excuse: currentExcuse }) });
}

function resetFeedback() {
  const fbUp   = document.getElementById('fbUp');
  const fbDown = document.getElementById('fbDown');
  if (fbUp)   fbUp.classList.remove('voted-up','voted-down');
  if (fbDown) fbDown.classList.remove('voted-up','voted-down');
}

/* ── 15. TOAST NOTIFICATION ──────────────────────────────────── */

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.className   = 'toast' + (type ? ` ${type}` : '');

  // Force reflow before adding show class (ensures animation replays)
  toast.offsetHeight;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* Expose globally for inline usage */
window.showToast = showToast;

/* ── 16. HIGHLIGHT ACTIVE NAV LINK ──────────────────────────── */

function highlightCurrentPage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── 17. FOOTER YEAR ─────────────────────────────────────────── */

function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── 18. CONTACT FORM ────────────────────────────────────────── */

function handleContact(e) {
  e.preventDefault();

  const name    = (document.getElementById('cf-name')    ?.value || '').trim();
  const email   = (document.getElementById('cf-email')   ?.value || '').trim();
  const subject = (document.getElementById('cf-subject') ?.value || '').trim();
  const message = (document.getElementById('cf-message') ?.value || '').trim();

  if (!name || !email || !message) {
    showToast('⚠️ Please fill in all required fields.', 'error');
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    showToast('⚠️ Please enter a valid email address.', 'error');
    return;
  }

  // In production: replace with fetch() to Formspree / EmailJS / your API
  // fetch('https://formspree.io/f/YOUR_ID', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,subject,message}) })

  showToast('✅ Message sent! We\'ll reply soon.', 'success');
  e.target.reset();
}

/* ── 19. SCROLL REVEAL (lightweight IntersectionObserver) ────── */

function initScrollReveal() {
  const targets = document.querySelectorAll('.how-card, .stat-item, .pro-banner, .prose');
  if (!('IntersectionObserver' in window) || !targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for grid items
        const delay = (entry.target.dataset.delay || i * 80) + 'ms';
        entry.target.style.animationDelay = delay;
        entry.target.style.animation = 'fadeUp 0.55s ease both';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.dataset.delay = i * 70;
    obs.observe(el);
  });
}
