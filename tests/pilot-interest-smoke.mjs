import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../early-access.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../assets/pilot-interest.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../assets/pilot-interest.css', import.meta.url), 'utf8');
const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const feedback = fs.readFileSync(new URL('../feedback.html', import.meta.url), 'utf8');
const sample = fs.readFileSync(new URL('../sample-shift-brief.html', import.meta.url), 'utf8');
const publicSurface = `${html}\n${index}\n${feedback}\n${sample}`;

assert.doesNotThrow(() => new vm.Script(js));
assert.match(css, /\.pilot-form-panel/);
assert.match(css, /@media\(max-width:620px\)/);

assert.match(html, /Design-partner enquiries are not open yet\./);
assert.match(html, /No account · no payment · no enquiry data collected on this page/);
assert.match(html, /No registration form/);
assert.match(html, /Enquiries paused/);
assert.doesNotMatch(html, /id="pilotInterestForm"/);
assert.doesNotMatch(html, /https:\/\/venuebrief-api\.onrender\.com\/pilot-interest/);
assert.doesNotMatch(html, /assets\/pilot-interest\.js/);
assert.doesNotMatch(publicSurface, /early-access\.html#pilot-form/);
assert.doesNotMatch(publicSurface, /Request design-partner access|Open request form/);
assert.doesNotMatch(feedback, /mailto:hello@yberium\.com/i);
assert.match(index, /href="early-access\.html"/);
assert.match(feedback, /href="early-access\.html"/);
assert.match(sample, /href="early-access\.html"/);

assert.doesNotMatch(publicSurface, /Yberium\s+Pulse|Pulse\s+Brief|Pulse\s+Relay|VenueBrief/);
assert.doesNotMatch(publicSurface, /yberium-pulse-(?:mark|fonts)|yberium-pulse\.css/i);
assert.doesNotMatch(publicSurface, /musellafabio@gmail\.com/i);

console.log('Yberium paused design-partner access checks passed.');
