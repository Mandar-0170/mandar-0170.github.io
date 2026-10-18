'use strict';
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const themeMeta = document.querySelector('meta[name="theme-color"]');
function syncTheme() {
  const dark = root.dataset.theme === 'dark';
  themeLabel.textContent = dark ? 'Day mode' : 'Night mode';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to day mode' : 'Switch to night mode');
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeMeta.content = dark ? '#20231f' : '#f2f0e9';
}
syncTheme();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (error) { /* The toggle also works without browser storage. */ }
  syncTheme();
});
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('span').textContent = '+';
}
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? '−' : '+';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main > section, .experience-section, .credentials-section').forEach(section => observer.observe(section));
}
document.getElementById('year').textContent = new Date().getFullYear();

// Motion is progressive enhancement: content stays readable without JavaScript.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('.section-heading, .employer-group, .project, .skill-row, .credential-entry, .education-record, .social-links');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => {
    item.classList.add('reveal-ready');
    revealObserver.observe(item);
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      revealObserver.disconnect();
    }
  });
}

// A local, explanatory diagram. These are component roles, not live system data.
const componentDescriptions = {
  nginx: ['01 / Web entry', 'Nginx receives incoming traffic and routes application requests to Tomcat.'],
  tomcat: ['02 / Application', 'Tomcat runs the Java application and connects it to the supporting services.'],
  rabbitmq: ['03 / Messaging', 'RabbitMQ provides message queues for communication between application components.'],
  memcached: ['04 / Cache', 'Memcached keeps frequently used data in memory to reduce repeated database lookups.'],
  mysql: ['05 / Database', 'MySQL provides persistent, relational storage for the application’s data.']
};
const componentDetail = document.getElementById('component-detail');
const componentButtons = [...document.querySelectorAll('[data-component]')];
componentButtons.forEach(button => {
  button.addEventListener('click', () => {
    const description = componentDescriptions[button.dataset.component];
    if (!description || button.getAttribute('aria-pressed') === 'true') return;
    componentButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    componentDetail.classList.remove('is-changing');
    componentDetail.querySelector('.component-label').textContent = description[0];
    componentDetail.querySelector('p').textContent = description[1];
    // Restart the short transition without adding another timer or animation loop.
    void componentDetail.offsetWidth;
    componentDetail.classList.add('is-changing');
  });
});

// A quiet reading position indicator, updated at most once per animation frame.
const readingProgress = document.querySelector('.reading-progress');
let progressQueued = false;
function updateReadingProgress() {
  const scrollRange = root.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollRange)) : 0;
  readingProgress.style.transform = `scaleX(${progress})`;
  progressQueued = false;
}
function queueReadingProgress() {
  if (!progressQueued) {
    progressQueued = true;
    requestAnimationFrame(updateReadingProgress);
  }
}
window.addEventListener('scroll', queueReadingProgress, { passive: true });
window.addEventListener('resize', queueReadingProgress);
window.addEventListener('load', queueReadingProgress);
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', queueReadingProgress));
updateReadingProgress();
