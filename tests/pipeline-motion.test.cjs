const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../js/portfolio.js'), 'utf8');
const marker = '// Repeat the delivery sequence only while visible and motion is permitted.';
assert.ok(source.includes(marker));
const lifecycle = source.slice(source.indexOf(marker));

function mount({ reduced = false, observer = true, hidden = false } = {}) {
  const classes = new Set();
  const visual = { classList: { toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); } } };
  const documentEvents = new Map();
  const mediaEvents = new Map();
  let intersection;
  const document = { hidden, querySelector: () => visual, addEventListener: (name, fn) => documentEvents.set(name, fn) };
  const reducedMotion = { matches: reduced, addEventListener: (name, fn) => mediaEvents.set(name, fn) };
  class Observer {
    constructor(callback) { intersection = callback; }
    observe(target) { assert.equal(target, visual); }
  }
  const window = observer ? { IntersectionObserver: Observer } : {};
  vm.runInNewContext(lifecycle, { document, window, reducedMotion, IntersectionObserver: observer ? Observer : undefined });
  return {
    running: () => classes.has('pipeline-running'),
    intersect: value => intersection([{ isIntersecting: value }]),
    reduce(value) { reducedMotion.matches = value; mediaEvents.get('change')(); },
    hide(value) { document.hidden = value; documentEvents.get('visibilitychange')(); }
  };
}

test('starts on entry, pauses offscreen and resumes on re-entry repeatedly', () => {
  const app = mount();
  assert.equal(app.running(), false);
  for (let pass = 0; pass < 3; pass++) {
    app.intersect(true); assert.equal(app.running(), true);
    app.intersect(false); assert.equal(app.running(), false);
  }
});
test('reduced-motion preference is respected at startup and when changed', () => {
  const app = mount({ reduced: true });
  app.intersect(true); assert.equal(app.running(), false);
  app.reduce(false); assert.equal(app.running(), true);
  app.reduce(true); assert.equal(app.running(), false);
});
test('hidden tabs pause and only visible diagrams resume', () => {
  const app = mount();
  app.intersect(true); app.hide(true); assert.equal(app.running(), false);
  app.hide(false); assert.equal(app.running(), true);
  app.intersect(false); app.hide(true); app.hide(false); assert.equal(app.running(), false);
});
test('fallback without IntersectionObserver still respects motion and tab visibility', () => {
  const app = mount({ observer: false });
  assert.equal(app.running(), true);
  app.reduce(true); assert.equal(app.running(), false);
  app.reduce(false); app.hide(true); assert.equal(app.running(), false);
});
