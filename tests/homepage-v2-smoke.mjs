import assert from 'node:assert/strict';
import fs from 'node:fs';

const routes = ['index.html', 'product/index.html', 'how-it-works/index.html', 'use-cases/index.html', 'trust-and-safety/index.html', 'support/index.html'];
const navigation = ['/product/', '/how-it-works/', '/use-cases/', '/trust-and-safety/', '/support/'];
for (const file of routes) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /class="wave-field/, `${file} must use the global wave family`);
  assert.match(html, /public-waves\.js/, `${file} must load restrained pointer interaction`);
  for (const route of navigation) assert.ok(html.includes(route), `${file} must link to ${route}`);
  assert.doesNotMatch(html, /Yberium-venuebrief-demo|Try the demo/i, `${file} must not expose the legacy demo`);
}
const home = fs.readFileSync('index.html', 'utf8');
assert.match(home, /<body class="home-page">/);
assert.match(home, /A new way to run hospitality\./);
assert.match(home, /See Yberium in action[\s\S]*href="\/product\/"|href="\/product\/"[\s\S]*See Yberium in action/);
assert.match(home, /href="\/how-it-works\/">How it works/);
assert.doesNotMatch(home, /<footer|hub-panel|card-grid|href="#(?!main)/);
const css = fs.readFileSync('assets/yberium-public.css', 'utf8');
assert.match(css, /prefers-reduced-motion:reduce/);
assert.match(css, /overflow-x:hidden/);
assert.match(css, /pointer-events:none/);
const allHtml = fs.readdirSync('.', { recursive: true }).filter((file) => file.endsWith('.html'));
for (const file of allHtml) {
  const html = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(html, /https:\/\/yberium\.github\.io\/Yberium-venuebrief-demo\//, `${file} must not link to the legacy demo`);
}
console.log('homepage v2 smoke: PASS');
