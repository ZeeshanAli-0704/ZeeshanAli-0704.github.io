// /*!
//     * Start Bootstrap - Resume v6.0.2 (https://startbootstrap.com/theme/resume)
//     * Copyright 2013-2020 Start Bootstrap
//     * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
//     */
//     (function ($) {
//     "use strict"; // Start of use strict

//     // Smooth scrolling using jQuery easing
//     $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
//         if (
//             location.pathname.replace(/^\//, "") ==
//                 this.pathname.replace(/^\//, "") &&
//             location.hostname == this.hostname
//         ) {
//             var target = $(this.hash);
//             target = target.length
//                 ? target
//                 : $("[name=" + this.hash.slice(1) + "]");
//             if (target.length) {
//                 $("html, body").animate(
//                     {
//                         scrollTop: target.offset().top,
//                     },
//                     1000,
//                     "easeInOutExpo"
//                 );
//                 return false;
//             }
//         }
//     });

//     // Closes responsive menu when a scroll trigger link is clicked
//     $(".js-scroll-trigger").click(function () {
//         $(".navbar-collapse").collapse("hide");
//     });

//     // Activate scrollspy to add active class to navbar items on scroll
//     $("body").scrollspy({
//         target: "#sideNav",
//     });
// })(jQuery); // End of use strict



// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle with localStorage persistence
const root = document.documentElement;
const btn = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
  root.setAttribute('data-theme', storedTheme);
}
btn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-slide');
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
      current = s.id;
      break;
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
