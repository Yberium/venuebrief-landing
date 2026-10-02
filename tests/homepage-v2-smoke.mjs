import assert from 'node:assert/strict';
import fs from 'node:fs';

const routes = ['index.html', 'product/index.html', 'how-it-works/index.html', 'use-cases/index.html', 'trust-and-safety/index.html', 'support/index.html', 'early-access.html'];
const navigation = ['/product/', '/how-it-works/', '/use-cases/', '/trust-and-safety/', '/support/'];
for (const file of routes) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /class="wave-field/, `${file} must use the global wave family`);
  assert.doesNotMatch(html, /class="wave wave--/, `${file} must not retain concentric band markup`);
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
assert.match(css, /wave-path--front\{[^}]*animation:path-front 10s/s, 'front path must have visibly paced continuous motion');
assert.match(css, /radial-gradient/, 'wave field must include atmospheric light and haze');
assert.match(css, /@keyframes atmosphere-breathe/, 'atmospheric haze must move continuously');
assert.match(css, /\.wave-scene\{[^}]*opacity:\.9[^}]*translateY\(5%\)/s, 'desktop composition must keep the tuned lower, translucent crop');
assert.match(css, /@media\(max-width:600px\)\{\.wave-scene\{opacity:\.82/, 'mobile composition must use the lighter tuned treatment');
assert.match(css, /@keyframes path-front\{0%,100%[\s\S]*50%/, 'front wave path motion must have a full oscillation cycle');
assert.doesNotMatch(css, /\.wave\{|wave--back|wave--middle|wave--front/, 'retired ellipse-band geometry must not remain');
assert.doesNotMatch(css, /--wave-shift-[xy]/, 'wave motion must not depend on the retired coupled shift variables');
const waveJs = fs.readFileSync('assets/public-waves.js', 'utf8');
assert.match(waveJs, /function setOffsets\(/, 'pointer parallax must be applied separately from continuous CSS motion');
assert.match(waveJs, /<svg class="wave-scene"/, 'shared script must mount one reusable SVG scene');
assert.match(waveJs, /C120 470 312 508/, 'scene must use authored cubic wave paths');
assert.match(waveJs, /wave-path--ribbon/, 'scene must include a translucent crossing ribbon');
for (const file of routes) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /yberium-public\.css\?v=5\.1/, `${file} must load the cache-busted wave CSS`);
  assert.match(html, /public-waves\.js\?v=3\.0/, `${file} must load the cache-busted wave JS`);
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