import assert from 'node:assert/strict';
import fs from 'node:fs';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sample = fs.readFileSync(new URL('../sample-shift-brief.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../assets/yberium.css', import.meta.url), 'utf8');
const fonts = fs.readFileSync(new URL('../assets/yberium-fonts.css', import.meta.url), 'utf8');
const manifest = fs.readFileSync(new URL('../site.webmanifest', import.meta.url), 'utf8');
const earlyAccess = fs.readFileSync(new URL('../early-access.html', import.meta.url), 'utf8');
const feedback = fs.readFileSync(new URL('../feedback.html', import.meta.url), 'utf8');
const cinematic = fs.readFileSync(new URL('../cinematic.html', import.meta.url), 'utf8');
const active = `${index}\n${sample}\n${manifest}\n${earlyAccess}\n${feedback}\n${cinematic}`;

assert.match(index, />A new way to run hospitality\.<\/h1>/);
assert.match(index, />See Yberium in action<\/a>/);
assert.match(index, /Interactive demo · fixed synthetic sample · no live staff data/);
assert.match(index, />Yberium Hub</);
assert.match(index, /ChatGPT[\s\S]*Yberium[\s\S]*Yberium Hub/);
assert.match(index, /AI reasoning is not business authority\./);
assert.match(index, /Supported input/);
assert.match(index, /Missing information/);
assert.match(index, /Bounded result/);
assert.match(index, /Human authority/);
assert.match(index, /Agency availability is not confirmed/);
assert.match(index, /3 internal cover paths identified/);
assert.match(index, /Agency path excluded until availability is confirmed/);
assert.match(index, /Manager review required before any rota change/);
assert.match(index, /Fixed-sample interactive demo/);
assert.match(index, /Illustrative sample brief/);
assert.match(index, /Design-partner access/);
assert.match(index, /Enquiries are not currently accepting submissions\./);
assert.match(index, /href="early-access\.html"/);
assert.match(index, /mailto:support@yberium\.com/);
assert.match(index, /mailto:privacy@yberium\.com/);
assert.match(index, />Terms</);
assert.match(index, />Company</);

assert.doesNotMatch(active, /Yberium Pulse/i);
assert.doesNotMatch(active, /Pulse Control|Pulse Brief|Pulse Relay|Pulse Handover/i);
assert.doesNotMatch(active, /automatic fix|autofix|automatically applies|AI declares/i);
assert.doesNotMatch(active, /Harbour House|Leo|Amira|Sofia|Ravi|Noah/i);
assert.doesNotMatch(active, /early-access\.html#pilot-form/);
assert.doesNotMatch(earlyAccess, /id="pilotInterestForm"|venuebrief-api\.onrender\.com\/pilot-interest|assets\/pilot-interest\.js/);
assert.doesNotMatch(cinematic, /VenueBrief|yberium-pulse-(?:mark|fonts)|yberium-pulse\.css/i);
assert.match(cinematic, /noindex,follow/);
assert.match(cinematic, /Continue to Yberium/);

assert.equal((index.match(/class="button primary"/g) || []).length, 1, 'index must expose one primary CTA');
assert.match(sample, /Illustrative sample · fixed synthetic data · no live staff data/);
assert.match(sample, /Morrow House · fixed synthetic sample/);
assert.match(sample, /makes no business change/);
assert.match(sample, /View access status/);
assert.match(feedback, /This page does not collect answers or live staff data\./);
assert.match(earlyAccess, /No account · no payment · no enquiry data collected on this page/);

for (const token of ['#F7F5F0','#FFFFFF','#F1EEE7','#202528','#5F6B73','#657179','#DEDAD1','#8E8A82','#27766F','#20655F','#194F4A','#E3F0ED','#23684E','#E7F4EE','#7A430B','#B46A17','#FCF1E2','#7F2D2D','#FBEAEA','#2E5D78','#EAF2F7','#606C74','#EEF1F2','#6C625B','#F1EEEB']) {
  assert.match(css, new RegExp(token.replace('#','\\#'), 'i'), `missing frozen token ${token}`);
}
assert.match(css, /2px solid #27766F/i);
assert.match(css, /min-height:44px/i);
assert.match(css, /prefers-reduced-motion/);
assert.match(fonts, /font-family:"Inter Variable"/);
assert.match(fonts, /font-weight:100 900/);
assert.equal(JSON.parse(manifest).name, 'Yberium');
assert.doesNotMatch(manifest, /yberium-pulse|VenueBrief/i);

for (const reachable of [earlyAccess, feedback, cinematic]) {
  assert.doesNotMatch(reachable, /Yberium\s+Pulse|Pulse\s+Brief|Pulse\s+Relay|VenueBrief/);
  assert.doesNotMatch(reachable, /yberium-pulse-(?:mark|fonts)|yberium-pulse\.css/i);
  assert.match(reachable, /YBERIUM|Yberium/);
}

console.log('PX-3 Landing V2 recovery contract checks passed.');
