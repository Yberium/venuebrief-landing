import assert from 'node:assert/strict';
import fs from 'node:fs';

const routes = ['index.html', 'product/index.html', 'how-it-works/index.html', 'use-cases/index.html', 'trust-and-safety/index.html', 'support/index.html', 'early-access.html'];
const navigation = ['/product/', '/how-it-works/', '/use-cases/', '/trust-and-safety/', '/support/'];
for (const file of routes) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /class="wave-field/, `${file} must use the global wave family`);
  assert.match(html, /public-waves\.js/, `${file} must load restrained pointer interaction`);
  assert.match(html, /<a class="nav-action" href="\/early-access\.html#pilot-form"/, `${file} must expose Controlled access as the right-side action`);
  assert.match(html, /<details class="mobile-nav"><summary>Menu<\/summary><nav aria-label="Mobile navigation">/, `${file} must expose semantic mobile navigation`);
  assert.match(html, /class="mobile-nav-action" href="\/early-access\.html#pilot-form"/, `${file} mobile navigation must expose Controlled access`);
  for (const route of navigation) assert.ok(html.includes(route), `${file} must link to ${route}`);
  assert.doesNotMatch(html, /Yberium-venuebrief-demo|Try the demo/i, `${file} must not expose the legacy demo`);
}
const home = fs.readFileSync('index.html', 'utf8');
assert.match(home, /<body class="home-page">/);
assert.match(home, /<p class="hero-brand" aria-hidden="true">Yberium<\/p>/);
assert.match(home, /A new way to run hospitality\./);
assert.match(home, /See Yberium in action[\s\S]*href="\/product\/"|href="\/product\/"[\s\S]*See Yberium in action/);
assert.match(home, /href="\/how-it-works\/">How it works/);
assert.doesNotMatch(home, /<footer|hub-panel|card-grid|href="#(?!main)/);
const css = fs.readFileSync('assets/yberium-public.css', 'utf8');
assert.match(css, /prefers-reduced-motion:reduce/);
assert.match(css, /overflow-x:hidden/);
assert.match(css, /pointer-events:none/);
assert.match(css, /wave--front\{[^}]*animation:wave-front 8\.5s/s, 'front wave must have visibly paced continuous motion');
assert.match(css, /@keyframes wave-front\{0%,100%[\s\S]*50%/, 'front wave motion must have a full oscillation cycle');
assert.doesNotMatch(css, /--wave-shift-[xy]/, 'wave motion must not depend on the retired coupled shift variables');
const waveJs = fs.readFileSync('assets/public-waves.js', 'utf8');
assert.match(waveJs, /function setOffsets\(/, 'pointer parallax must be applied separately from continuous CSS motion');
for (const file of routes) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /yberium-public\.css\?v=3\.0/, `${file} must load the cache-busted wave CSS`);
  assert.match(html, /public-waves\.js\?v=2\.0/, `${file} must load the cache-busted wave JS`);
}
assert.match(css, /@media\(max-width:900px\).*\.mobile-nav\{display:block\}/s);
const controlledAccess = fs.readFileSync('early-access.html', 'utf8');
assert.match(controlledAccess, /class="public-page page-controlled-access"/);
assert.match(controlledAccess, /class="wave-field wave-field--subpage"/);
assert.doesNotMatch(controlledAccess, /demo|Stripe|AI-credit/i);
assert.match(controlledAccess, /Public subscriptions are not open\. Pricing and customer terms will be published before any commercial launch\./);
const allHtml = fs.readdirSync('.', { recursive: true }).filter((file) => file.endsWith('.html'));
for (const file of allHtml) {
  const html = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(html, /https:\/\/yberium\.github\.io\/Yberium-venuebrief-demo\//, `${file} must not link to the legacy demo`);
}
console.log('homepage v2 smoke: PASS');