import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../early-access.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../assets/pilot-interest.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../assets/pilot-interest.css', import.meta.url), 'utf8');
const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const feedback = fs.readFileSync(new URL('../feedback.html', import.meta.url), 'utf8');

assert.doesNotThrow(() => new vm.Script(js));
assert.match(html, /id="pilotInterestForm"/);
assert.match(html, /https:\/\/venuebrief-api\.onrender\.com\/pilot-interest/);
for (const field of ['contactName','email','venueName','venueType','location','teamSize','problemFrequency','operationalProblem','consent']) {
  assert.match(html, new RegExp(`name="${field}"`));
}
assert.match(html, /id="pilotFormSuccess"/);
assert.match(js, /\/config/);
assert.match(js, /Register pilot interest/);
assert.match(js, /pilotFormReference/);
assert.match(css, /\.pilot-form-panel/);
assert.match(css, /@media\(max-width:620px\)/);
assert.doesNotMatch(`${html}\n${index}\n${feedback}`, /Yberium\s+Pulse|Pulse\s+Brief|Pulse\s+Relay|VenueBrief/);
assert.doesNotMatch(`${html}\n${index}\n${feedback}`, /yberium-pulse-(?:mark|fonts)|yberium-pulse\.css/i);
assert.match(html, /Yberium may use these details to assess this design-partner request and contact me about Yberium\./);
assert.match(index, /early-access\.html#pilot-form/);
assert.match(feedback, /early-access\.html#pilot-form/);
assert.doesNotMatch(`${html}\n${index}\n${feedback}`, /musellafabio@gmail\.com/i);

console.log('Yberium design-partner journey checks passed.');
