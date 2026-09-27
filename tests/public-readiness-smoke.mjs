import assert from 'node:assert/strict';
import fs from 'node:fs';

const liveFiles = [
  'index.html',
  'early-access.html',
  'feedback.html',
  'sample-shift-brief.html',
  'cinematic.html',
  'privacy/index.html',
  'terms/index.html',
  'support/index.html',
  'oauth/consent/index.html',
];

for (const file of liveFiles) {
  assert.equal(fs.existsSync(file), true, `${file} must exist`);
  const html = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(html, /Yberium Pulse/, `${file} must not expose legacy product branding`);
  assert.doesNotMatch(html, />\s*Pulse\s*</, `${file} must not expose standalone Pulse branding`);
}

const home = fs.readFileSync('index.html', 'utf8');
for (const label of ['Yberium Control', 'Yberium Brief', 'Yberium Relay']) {
  assert.match(home, new RegExp(label), `home must expose ${label}`);
}
for (const route of ['/privacy/', '/terms/', '/support/']) {
  assert.ok(home.includes(route), `home must link ${route}`);
}

const manifest = JSON.parse(fs.readFileSync('site.webmanifest', 'utf8'));
assert.equal(manifest.name, 'Yberium');
assert.equal(manifest.short_name, 'Yberium');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
for (const url of ['https://yberium.com/privacy/','https://yberium.com/terms/','https://yberium.com/support/']) {
  assert.ok(sitemap.includes(url), `sitemap must include ${url}`);
}

const consent = fs.readFileSync('oauth/consent/index.html', 'utf8');
const consentScriptPath = 'assets/oauth-consent.js';
assert.equal(fs.existsSync(consentScriptPath), true, 'OAuth consent module must exist');
const consentScript = fs.readFileSync(consentScriptPath, 'utf8');
const consentSurface = `${consent}\n${consentScript}`;

assert.ok(
  consent.includes('<script type="module" src="/assets/oauth-consent.js"></script>'),
  'consent page must load its module from a CSP-allowed self origin',
);
assert.doesNotMatch(
  consent,
  /<script\s+type="module"(?![^>]*\bsrc=)[^>]*>/,
  'consent page must not use an inline module blocked by its CSP',
);

for (const required of [
  'getAuthorizationDetails',
  'approveAuthorization',
  'denyAuthorization',
  'authorization_id',
  'shouldCreateUser: false',
  'signInWithPassword',
  'current-password',
  'sb_publishable_',
]) assert.ok(consentSurface.includes(required), `consent surface must include ${required}`);
assert.match(consent, /meta name="robots" content="noindex,nofollow"/);
assert.doesNotMatch(consentScript, /signUp\s*\(/, 'consent page must not create OAuth reviewer accounts');

console.log('public readiness smoke: PASS');
