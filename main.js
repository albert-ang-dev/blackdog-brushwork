  // Footer year
  document.getElementById('bbYear').textContent = new Date().getFullYear();

  // Navbar scroll shadow
  const nav = document.getElementById('bbNavbar');
  const toTop = document.getElementById('bbToTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('is-scrolled', scrolled);
    toTop.classList.toggle('show', window.scrollY > 500);
  });

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Close mobile nav on link click
  document.querySelectorAll('#bbNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapseEl = document.getElementById('bbNav');
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
      if (bsCollapse && collapseEl.classList.contains('show')) bsCollapse.hide();
    });
  });

  // Contact form: front-end only. Connect this to your email service
  // (e.g. Formspree, Netlify Forms, or your own backend) to actually send messages.
  const form = document.getElementById('bbContactForm');
  const successBox = document.getElementById('bbFormSuccess');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    successBox.classList.remove('d-none');
    form.reset();
  });

  // Reveal on scroll
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }