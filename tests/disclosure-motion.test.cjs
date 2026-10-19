const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/portfolio.js'), 'utf8');
const start = source.indexOf('function setupProjectDisclosure(detail)');
const end = source.indexOf("document.querySelectorAll('.project details')", start);
const setup = source.slice(start, end);

function mount({ reduced = false, supported = true } = {}) {
  let click;
  const events = {};
  const animations = [];
  const detail = {
    open: false, style: {}, dataset: {},
    querySelector: () => ({ addEventListener: (_, fn) => { click = fn; }, getBoundingClientRect: () => ({ height: 52 }) }),
    getBoundingClientRect: () => ({ height: detail.open ? 260 : 54 })
  };
  if (supported) detail.animate = (frames, options) => {
    const animation = { frames, options, onfinish: null, cancelled: false, cancel() { this.cancelled = true; } };
    animations.push(animation);
    return animation;
  };
  const reducedMotion = { matches: reduced, addEventListener: (_, fn) => { events.motion = fn; } };
  vm.runInNewContext(setup + '\nsetupProjectDisclosure(detail);', {
    detail, reducedMotion, queueReadingProgress() {},
    getComputedStyle: () => ({ borderTopWidth: '1px', borderBottomWidth: '1px' }),
    window: { addEventListener: (_, fn) => { events.resize = fn; } },
    document: { hidden: false, addEventListener: (_, fn) => { events.visibility = fn; } }
  });
  return { detail, animations, events, reducedMotion, click() { let prevented = false; click({ preventDefault() { prevented = true; } }); return prevented; } };
}

test('opens and closes to natural height, removing temporary styles', () => {
  const app = mount();
  assert.equal(app.click(), true);
  assert.equal(app.detail.open, true);
  assert.equal(app.animations[0].frames[1].height, '260px');
  app.animations[0].onfinish();
  assert.equal(app.detail.style.height, '');
  app.click();
  assert.equal(app.detail.open, true, 'content remains visible during collapse');
  assert.equal(app.animations[1].frames[1].height, '54px');
  app.animations[1].onfinish();
  assert.equal(app.detail.open, false);
  assert.equal(app.detail.style.overflow, '');
});

test('rapid clicks reverse the target and cancel the earlier animation', () => {
  const app = mount();
  app.click(); app.click(); app.click();
  assert.equal(app.animations[0].cancelled, true);
  assert.equal(app.animations[1].cancelled, true);
  app.animations[2].onfinish();
  assert.equal(app.detail.open, true);
  assert.equal(app.detail.dataset.expanded, undefined);
});

test('resizing or changing motion preference settles an in-flight transition', () => {
  const app = mount();
  app.click(); app.events.resize();
  assert.equal(app.detail.open, true);
  assert.equal(app.detail.style.overflow, '');
  app.click(); app.reducedMotion.matches = true; app.events.motion();
  assert.equal(app.detail.open, false);
  assert.equal(app.animations[1].cancelled, true);
});

test('reduced-motion and unsupported browsers retain native details activation', () => {
  for (const options of [{ reduced: true }, { supported: false }]) {
    const app = mount(options);
    assert.equal(app.click(), false);
    assert.equal(app.animations.length, 0);
  }
});
