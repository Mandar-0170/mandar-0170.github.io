'use strict';
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let themeTransition = null;
function syncTheme() {
  const dark = root.dataset.theme === 'dark';
  themeLabel.textContent = dark ? 'Day mode' : 'Night mode';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to day mode' : 'Switch to night mode');
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeMeta.content = dark ? '#20231f' : '#f2f0e9';
}
syncTheme();
function changeTheme() {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (error) { /* The toggle also works without browser storage. */ }
  syncTheme();
}
themeToggle.addEventListener('click', async () => {
  if (themeTransition) return;
  if (reducedMotion.matches || !document.startViewTransition) {
    changeTheme();
    return;
  }
  const bounds = themeToggle.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top + bounds.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.style.setProperty('--theme-x', `${x}px`);
  root.style.setProperty('--theme-y', `${y}px`);
  root.style.setProperty('--theme-radius', `${Math.ceil(radius)}px`);
  root.classList.add('theme-changing');
  themeToggle.disabled = true;
  try {
    themeTransition = document.startViewTransition(changeTheme);
    // A skipped snapshot still applies the theme; it just omits the reveal.
    await themeTransition.finished;
  } catch (error) {
    // If creating a transition itself fails, retain the ordinary toggle.
    if (!themeTransition) changeTheme();
  } finally {
    themeTransition = null;
    themeToggle.disabled = false;
    root.classList.remove('theme-changing');
  }
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) themeTransition?.skipTransition();
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
const revealItems = document.querySelectorAll('.section-heading, .employer-group, .project, .skill-row, .education-record, .social-links');
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
  portal: ['01 / Knowledge portal', 'The web portal brings user questions and context-aware responses together in an enterprise application.'],
  gemini: ['02 / Grounded responses', 'Gemini-backed workflows use context retrieved from connected enterprise data sources to ground their responses.'],
  integration: ['03 / Secure integration', 'A secure, scalable integration layer connects the application to cloud-hosted systems for reliable data retrieval.'],
  storage: ['04 / Object storage', 'Cloud-hosted object storage supplies content that can be retrieved as context for the AI workflows.'],
  documents: ['05 / Document repositories', 'Document repositories provide enterprise documents used to ground responses in relevant source content.'],
  datasets: ['06 / Structured datasets', 'Structured datasets supply organised data that the workflows can retrieve for context-aware responses.']
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

// Small pointer-driven depth offsets, reset when the illustration is left.
const heroArt = document.querySelector('.hero-art');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let depthFrame = 0;
let depthX = 0;
let depthY = 0;
function resetHeroDepth() {
  cancelAnimationFrame(depthFrame);
  depthFrame = 0;
  heroArt.style.setProperty('--depth-x', '0');
  heroArt.style.setProperty('--depth-y', '0');
}
heroArt.addEventListener('pointermove', event => {
  if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
  const bounds = heroArt.getBoundingClientRect();
  depthX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  depthY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  if (depthFrame) return;
  depthFrame = requestAnimationFrame(() => {
    heroArt.style.setProperty('--depth-x', depthX.toFixed(3));
    heroArt.style.setProperty('--depth-y', depthY.toFixed(3));
    depthFrame = 0;
  });
});
heroArt.addEventListener('pointerleave', resetHeroDepth);
heroArt.addEventListener('pointercancel', resetHeroDepth);
finePointer.addEventListener('change', resetHeroDepth);
reducedMotion.addEventListener('change', resetHeroDepth);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetHeroDepth(); });

// Preserve native details semantics while animating both directions.
function setupProjectDisclosure(detail) {
  const summary = detail.querySelector('summary');
  let animation = null;
  let targetOpen = detail.open;
  function settle() {
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    detail.open = targetOpen;
    detail.style.height = '';
    detail.style.overflow = '';
    delete detail.dataset.expanded;
    queueReadingProgress();
  }
  summary.addEventListener('click', event => {
    if (reducedMotion.matches || !detail.animate) return;
    event.preventDefault();
    if (!animation) targetOpen = detail.open;
    targetOpen = !targetOpen;
    const startHeight = detail.getBoundingClientRect().height;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
    }
    detail.style.height = '';
    detail.open = true;
    const style = getComputedStyle(detail);
    const endHeight = targetOpen ? detail.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    detail.dataset.expanded = String(targetOpen);
    detail.style.overflow = 'hidden';
    animation = detail.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
      duration: 320, easing: 'cubic-bezier(.22,1,.36,1)'
    });
    animation.onfinish = settle;
  });
  window.addEventListener('resize', () => { if (animation) settle(); });
  reducedMotion.addEventListener('change', () => { if (animation) settle(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && animation) settle(); });
}
document.querySelectorAll('.project details').forEach(setupProjectDisclosure);

// Repeat the delivery sequence only while visible and motion is permitted.
const pipelineVisual = document.querySelector('.project-pipeline .project-visual');
let pipelineInView = !('IntersectionObserver' in window);
function syncPipelineMotion() {
  const running = pipelineInView && !reducedMotion.matches && !document.hidden;
  pipelineVisual.classList.toggle('pipeline-running', running);
}
if ('IntersectionObserver' in window) {
  const pipelineObserver = new IntersectionObserver(entries => {
    pipelineInView = entries[0].isIntersecting;
    syncPipelineMotion();
  }, { threshold: 0 });
  pipelineObserver.observe(pipelineVisual);
}
reducedMotion.addEventListener('change', syncPipelineMotion);
document.addEventListener('visibilitychange', syncPipelineMotion);
syncPipelineMotion();
