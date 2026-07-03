'use strict';

/* ==========================================================================
   OMNIFOOD — INTERACTIONS
   Mobile nav · sticky header · scroll progress · scroll reveal ·
   animated counters · FAQ accordion · smooth scroll · form feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Loading screen ---------------- */
  const loadScreen = document.querySelector('.load-screen');
  if (loadScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => loadScreen.classList.add('is-hidden'), 250);
    });
    // Fallback in case 'load' already fired or takes too long
    setTimeout(() => loadScreen.classList.add('is-hidden'), 2500);
  }

  /* ---------------- Mobile navigation ---------------- */
  const btnMobileNav = document.querySelector('.btn-mobile-nav');
  const header = document.querySelector('.header');

  if (btnMobileNav) {
    btnMobileNav.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const isOpen = document.body.classList.contains('nav-open');
      btnMobileNav.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('.main-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });

  /* ---------------- Sticky header shrink + scroll progress + back to top ---------------- */
  const progressBar = document.querySelector('.scroll-progress');
  const toTopBtn = document.querySelector('.to-top');

  const onScroll = () => {
    const scrollY = window.scrollY;

    if (header) header.classList.toggle('is-scrolled', scrollY > 10);

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    }

    if (toTopBtn) toTopBtn.classList.toggle('is-visible', scrollY > 800);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Smooth scroll for in-page links ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Animated stat counters ---------------- */
  const counters = document.querySelectorAll('[data-count-to]');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = target * eased;
      el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : null;
    });
  });

  /* ---------------- Sign-up form feedback (static demo) ---------------- */
  const ctaForm = document.querySelector('.cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = ctaForm.querySelector('.form-success');
      if (success) success.classList.add('is-visible');
      ctaForm.reset();
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input) input.placeholder = 'Thanks — you are on the list!';
      newsletterForm.reset();
    });
  }

  /* ---------------- Footer year ---------------- */
  document.querySelectorAll('.year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
