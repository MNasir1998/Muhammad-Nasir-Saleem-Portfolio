document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Scroll progress rail ---------------- */
  const progressFill = document.getElementById('progressFill');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------------- Glow particle field ---------------- */
  const canvas = document.getElementById('glowfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    const colors = ['47,127,255', '155,92,255', '92,225,255'];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.12,
        speed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 1;
      for (const p of particles) {
        const alpha = p.baseAlpha + Math.sin(t * p.speed + p.phase) * 0.2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${Math.max(0, alpha)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(draw);
    } else {
      draw();
    }
  }

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('nav-open');
      if (open) {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '78px';
        mainNav.style.left = '0';
        mainNav.style.right = '0';
        mainNav.style.background = 'rgba(10,6,18,0.98)';
        mainNav.style.padding = '24px 32px';
        mainNav.style.gap = '18px';
        mainNav.style.borderBottom = '1px solid rgba(245,240,250,0.09)';
      } else {
        mainNav.removeAttribute('style');
      }
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.removeAttribute('style');
        mainNav.classList.remove('nav-open');
      });
    });
  }

  /* ---------------- Terminal typing effect ---------------- */
  const typedTarget = document.getElementById('typedTarget');
  if (typedTarget) {
    const phrases = [
      '"Closing $180K+ across IT & gaming"',
      '"Turning Upwork profiles into revenue"',
      '"Open to work — remote & hybrid"',
    ];
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typedTarget.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        typedTarget.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 28 : 42);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tick();
    } else {
      typedTarget.textContent = phrases[0];
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 40);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Animated counters ---------------- */
  const statNums = document.querySelectorAll('[data-count]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- Bar chart fill on view ---------------- */
  const barTracks = document.querySelectorAll('.bar-track');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  barTracks.forEach(el => barObserver.observe(el));

  /* ---------------- Deal ledger marquee ---------------- */
  const deals = [
    { amount: '$80,000', name: 'The Masked Singer Game & Companion Title', via: 'Upwork · PM' },
    { amount: '$90,000+', name: 'Single-profile revenue run', via: 'The Game Storm Studios' },
    { amount: '$60,000+', name: 'Upwork revenue, current role', via: 'Hubextech' },
    { amount: '$30,000+', name: 'Strategic lead generation', via: 'Narsun Studios' },
    { amount: '$17,000+', name: 'Custom Shopify Dropship App', via: 'Upwork' },
    { amount: '$15,000', name: 'Metaverse Project', via: 'LinkedIn' },
    { amount: '$13,000', name: 'NES Game Copy', via: 'Upwork' },
    { amount: '$12,000', name: 'Education Game Development', via: 'Upwork' },
    { amount: '$8,000', name: 'Shawarma Master', via: 'Retainer' },
    { amount: '$5,000', name: 'Coin Master Reskin Game', via: 'Upwork' },
    { amount: '$35/hr', name: 'Dulora Shopify Store', via: 'Upwork' },
    { amount: '$25/hr', name: 'Ruby on Rails Developer', via: 'Upwork' },
  ];
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const buildEntries = () => deals.map(d => `
      <div class="ledger-entry">
        <span class="amount">${d.amount}</span>
        <span class="deal-name">${d.name}</span>
        <span class="via">${d.via}</span>
      </div>`).join('');
    track.innerHTML = buildEntries() + buildEntries();
  }

  /* ---------------- Company trust marquee ---------------- */
  const companies = ['Hubextech', 'The Game Storm Studios', 'Folium AI', 'Narsun Studios', 'University of Management & Technology'];
  const companyTrack = document.getElementById('companyTrack');
  if (companyTrack) {
    const buildCompanies = () => companies.map(c => `<span>${c}</span>`).join('');
    companyTrack.innerHTML = buildCompanies() + buildCompanies();
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
