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
  'oauth/consent-staging/index.html',
];

for (const file of liveFiles) {
  assert.equal(fs.existsSync(file), true, `${file} must exist`);
  const html = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(html, /Yberium Pulse/, `${file} must not expose legacy product branding`);
  assert.doesNotMatch(html, />\s*Pulse\s*</, `${file} must not expose standalone Pulse branding`);
  for (const legacyReference of [
    'yberium-pulse-mark.svg',
    'yberium-pulse.css',
    'yberium-pulse-fonts.css',
    'heartbeat',
    'signal-lime',
  ]) assert.equal(html.toLowerCase().includes(legacyReference), false, `${file} must not reference ${legacyReference}`);
}

const home = fs.readFileSync('index.html', 'utf8');
for (const label of [
  'HOSPITALITY OPERATIONS',
  'A new way to run hospitality.',
  'Turn supported operational information into structured, reviewable guidance — without inventing what isn’t known.',
  'Yberium Hub',
  'Supported input',
  'Missing information',
  'Bounded result',
  'Human authority',
  'AI reasoning is not business authority.',
  'Available now',
  'Built on trust',
]) assert.ok(home.includes(label), `home must expose canonical content: ${label}`);

assert.match(home, /<title>Yberium — Hospitality operations intelligence and workforce control<\/title>/);
assert.match(home, /<link rel="canonical" href="https:\/\/yberium\.com\/">/);
assert.match(home, /application\/ld\+json/);
assert.match(home, /"@type":"WebSite"/);
assert.doesNotMatch(home, /"@type":"Organization"/);
assert.match(home, /Yberium is open to controlled design-partner enquiries before wider availability\./);
assert.doesNotMatch(home, /working with a limited number of design partners/i);
assert.doesNotMatch(home, /Yberium Control|Readiness Core|signal-lime|KPI/i);
for (const route of ['/privacy/', '/terms/', '/support/']) {
  assert.ok(home.includes(route), `home must link ${route}`);
}

const manifest = JSON.parse(fs.readFileSync('site.webmanifest', 'utf8'));
assert.equal(manifest.name, 'Yberium');
assert.equal(manifest.short_name, 'Yberium');
assert.doesNotMatch(JSON.stringify(manifest), /yberium-pulse|heartbeat|signal-lime/i);

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
for (const url of ['https://yberium.com/','https://yberium.com/sample-shift-brief.html','https://yberium.com/privacy/','https://yberium.com/terms/','https://yberium.com/support/']) {
  assert.ok(sitemap.includes(url), `sitemap must include ${url}`);
}

const robots = fs.readFileSync('robots.txt', 'utf8');
assert.match(robots, /^User-agent: \*$/m);
assert.match(robots, /^Allow: \/$/m);
assert.match(robots, /^Sitemap: https:\/\/yberium\.com\/sitemap\.xml$/m);

const sample = fs.readFileSync('sample-shift-brief.html', 'utf8');
assert.match(sample, /<link rel="canonical" href="https:\/\/yberium\.com\/sample-shift-brief\.html">/);
assert.match(sample, /Synthetic sample:/);
assert.match(sample, /not a live product result/i);
assert.match(sample, /Human review required/);

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


const stagingConsent = fs.readFileSync('oauth/consent-staging/index.html', 'utf8');
const stagingConsentScriptPath = 'assets/oauth-consent-staging.js';
assert.equal(fs.existsSync(stagingConsentScriptPath), true, 'staging OAuth consent module must exist');
const stagingConsentScript = fs.readFileSync(stagingConsentScriptPath, 'utf8');
assert.ok(stagingConsent.includes('<script type="module" src="/assets/oauth-consent-staging.js"></script>'));
assert.ok(stagingConsent.includes('https://tpmgjiklbonmtufryuwq.supabase.co'));
assert.ok(stagingConsentScript.includes("https://tpmgjiklbonmtufryuwq.supabase.co"));
assert.ok(consent.includes('https://bfdhjojqstopqvhdnpxy.supabase.co'), 'primary consent CSP must be production-bound');
assert.ok(consentScript.includes("https://bfdhjojqstopqvhdnpxy.supabase.co"), 'primary consent module must be production-bound');
assert.equal(consent.includes('https://tpmgjiklbonmtufryuwq.supabase.co'), false, 'primary consent must not connect to staging');
assert.equal(consentScript.includes("https://tpmgjiklbonmtufryuwq.supabase.co"), false, 'primary consent module must not use staging');
assert.equal(stagingConsent.includes('https://bfdhjojqstopqvhdnpxy.supabase.co'), false, 'staging consent must not connect to production');
assert.equal(stagingConsentScript.includes("https://bfdhjojqstopqvhdnpxy.supabase.co"), false, 'staging consent module must not use production');
assert.match(stagingConsent, /meta name="robots" content="noindex,nofollow"/);
assert.doesNotMatch(stagingConsentScript, /signUp\s*\(/);
