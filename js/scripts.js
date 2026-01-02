// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle with localStorage persistence
const root = document.documentElement;
const btn = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme) root.setAttribute('data-theme', storedTheme);
btn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Reveal animations
const revealEls = document.querySelectorAll('.reveal-fade, .reveal-slide');
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Active nav link highlight on scroll
const sections = [...document.querySelectorAll('main .section')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

function setActiveLink() {
  let current = sections[0].id;
  for (const s of sections) {
    const rect = s.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = s.id; break;
    }
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}
document.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// Smooth scroll
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
}); 