/* ═══════════════════════════════════════════
   PORTFOLIO — main.js  (Code. Create. Conquer.)
   Fixed: All code runs after DOM is fully ready
═══════════════════════════════════════════ */

/* ① CONTACT FORM CONFIG — Replace with your Formspree ID */
const FORMSPREE_ID = 'xrpzbnbl';

/* ════════════════════════════════════════
   LOADER — runs immediately (before DOM ready is fine)
════════════════════════════════════════ */
let loaderDone = false;

function hideLoader() {
  if (loaderDone) return;
  loaderDone = true;
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.style.transition = 'opacity 0.6s ease';
  loader.style.opacity = '0';
  setTimeout(() => { loader.style.display = 'none'; }, 700);
}

// Start progress bar
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const steps = ['Booting system...', 'Loading modules...', 'Compiling assets...', 'Ready!'];
let progress = 0;

const loaderTick = setInterval(() => {
  progress += Math.random() * 20 + 8;
  if (progress >= 100) progress = 100;
  if (loaderFill) loaderFill.style.width = progress + '%';
  if (loaderText) loaderText.textContent = steps[Math.min(Math.floor(progress / 25), 3)];
  if (progress >= 100) {
    clearInterval(loaderTick);
    setTimeout(hideLoader, 400);
  }
}, 90);

// Hard fallback: hide after 3.5s no matter what
setTimeout(hideLoader, 3500);

/* ════════════════════════════════════════
   EVERYTHING ELSE — waits for DOM
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Custom Cursor ── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  if (cursor && cursorTrail) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top  = e.clientY + 'px';
      }, 80);
    });
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
        cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  /* ── Matrix Rain Canvas ── */
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const chars = '0123456789ABCDEF</>{}[]()=+-コーダプログラム';
    let W, H, cols, drops;

    function resizeCanvas() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols  = Math.floor(W / 20);
      drops = Array(cols).fill(1);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    function drawMatrix() {
      ctx.fillStyle = 'rgba(8,12,10,0.05)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#39ff78';
      ctx.font = '13px monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 20, y * 20);
        if (y * 20 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }
    setInterval(drawMatrix, 55);
  }

  /* ── Typewriter ── */
  const roles = [
    'Full Stack Developer',
    'React & Node.js Engineer',
    'API Architect',
    'Problem Solver',
    'Open Source Contributor',
  ];
  const typeEl = document.getElementById('typeTarget');
  let rIdx = 0, cIdx = 0, del = false;

  function typeWrite() {
    if (!typeEl) return;
    const cur = roles[rIdx];
    typeEl.textContent = del ? cur.slice(0, cIdx--) : cur.slice(0, cIdx++);
    let delay = del ? 55 : 90;
    if (!del && cIdx > cur.length)   { delay = 2000; del = true; }
    else if (del && cIdx === 0)      { del = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }
    setTimeout(typeWrite, delay);
  }
  setTimeout(typeWrite, 1600);

  /* ── Nav Scroll ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    });
  });

  /* ── Active Nav Highlight ── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) cur = s.id; });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--neon)' : '';
    });
  }, { passive: true });

  /* ── Mobile Menu ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function closeMobile() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobile));

  /* ── AOS Init ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 });
  }

  /* ── Project Tab Filter ── */
  const projTabs  = document.querySelectorAll('.proj-tab');
  const projCards = document.querySelectorAll('.project-card');
  const noResults = document.getElementById('noResults');
  const projGrid  = document.getElementById('projectsGrid');

  function filterProjects(tab) {
    const cat = tab.dataset.tab;
    projTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (projGrid) projGrid.classList.add('filtering');
    setTimeout(() => {
      let visible = 0;
      projCards.forEach(card => {
        const cardCat = card.dataset.category || 'web';
        const show = cat === 'all' || cardCat === cat;
        card.classList.toggle('hidden-card', !show);
        if (show) visible++;
      });
      if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
      if (projGrid)  projGrid.classList.remove('filtering');
    }, 200);
  }

  projTabs.forEach(tab => tab.addEventListener('click', () => filterProjects(tab)));

  /* ── Counter Animation ── */
  function animateCount(el, target, duration = 1400) {
    const start = performance.now();
    (function update(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = target;
    })(start);
  }

  const counters = document.querySelectorAll('.stat__num[data-count]');
  if (counters.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target, parseInt(e.target.dataset.count));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
  }

  /* ── Contact Form ── */
  const contactForm  = document.getElementById('contactForm');
  const submitBtn    = document.getElementById('submitBtn');
  const btnText      = document.getElementById('btnText');
  const btnLoading   = document.getElementById('btnLoading');
  const successAlert = document.getElementById('successAlert');
  const errorAlert   = document.getElementById('errorAlert');
  const msgArea      = document.getElementById('message');
  const charCount    = document.getElementById('charCount');

  // Character counter
  if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
      const len = Math.min(msgArea.value.length, 500);
      charCount.textContent = `${len} / 500`;
      if (msgArea.value.length > 500) msgArea.value = msgArea.value.slice(0, 500);
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function setFieldError(inputId, errId, show) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errId);
    if (input) input.classList.toggle('error', show);
    if (err)   err.classList.toggle('show', show);
  }

  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    const errMap = { name: 'nameErr', email: 'emailErr', message: 'msgErr' };
    if (el) el.addEventListener('input', () => setFieldError(id, errMap[id], false));
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (successAlert) successAlert.classList.remove('show');
      if (errorAlert)   errorAlert.classList.remove('show');

      const name    = (document.getElementById('name')?.value || '').trim();
      const email   = (document.getElementById('email')?.value || '').trim();
      const message = (document.getElementById('message')?.value || '').trim();
      let valid = true;

      if (!name)                 { setFieldError('name', 'nameErr', true);   valid = false; } else { setFieldError('name', 'nameErr', false); }
      if (!validateEmail(email)) { setFieldError('email', 'emailErr', true); valid = false; } else { setFieldError('email', 'emailErr', false); }
      if (!message)              { setFieldError('message', 'msgErr', true); valid = false; } else { setFieldError('message', 'msgErr', false); }
      if (!valid) return;

      // Loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText)    btnText.style.display   = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';

      // Demo mode
      if (FORMSPREE_ID === 'YOUR_FORM_ID') {
        await new Promise(r => setTimeout(r, 1000));
        if (successAlert) {
          successAlert.textContent = '✅ Demo mode — set your Formspree ID in js/main.js to receive real emails!';
          successAlert.classList.add('show');
        }
        contactForm.reset();
        if (charCount) charCount.textContent = '0 / 500';
        if (submitBtn)  submitBtn.disabled    = false;
        if (btnText)    btnText.style.display   = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
        return;
      }

      // Real send
      try {
        const subject = (document.getElementById('subject')?.value || '').trim() || 'Portfolio Contact';
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });
        if (res.ok) {
          if (successAlert) { successAlert.textContent = "✅ Sent! I'll reply within 24 hours."; successAlert.classList.add('show'); }
          contactForm.reset();
          if (charCount) charCount.textContent = '0 / 500';
        } else { throw new Error(); }
      } catch {
        if (errorAlert) errorAlert.classList.add('show');
      } finally {
        if (submitBtn)  submitBtn.disabled    = false;
        if (btnText)    btnText.style.display   = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
      }
    });
  }

}); // end DOMContentLoaded
