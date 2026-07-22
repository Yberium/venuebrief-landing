# Yberium Pulse rebrand reference map

Audit date: 22 July 2026
Approved source: Yberium Pulse Master Brand, Product & Rebranding Plan v1.0

## Migration rule

Public identity changes from VenueBrief to Yberium Pulse. Working operational logic remains unchanged. Internal compatibility identifiers stay in place unless a later migration has explicit tests and a backwards-compatible plan.

## Landing repository — `Yberium/venuebrief-landing`

| Route or asset | Former state | Rebrand action |
|---|---|---|
| `/` | VenueBrief dark/wine landing | Rebuilt as Yberium Pulse with approved graphite/lime system |
| `/sample-shift-brief.html` | VenueBrief sample readiness output | Rebranded as an illustrative Pulse Brief |
| `/early-access.html` | VenueBrief early access | Rebranded; email subjects and public copy updated |
| `/feedback.html` | VenueBrief feedback page | Rebranded and questions aligned to readiness outcomes |
| `/cinematic.html` | Old animated VenueBrief concept | Retired route with an explicit Yberium Pulse continuation notice |
| `site.webmanifest` | Missing | Added for Yberium Pulse |
| `robots.txt` / `sitemap.xml` | Missing | Prepared for `yberium.com` |
| Historical Markdown packs | Legacy commercial and validation material | Preserved as historical evidence; not used as current public copy |

Temporary dependency: landing CTAs still point to `https://yberium.github.io/Yberium-venuebrief-demo/` until the public demo receives the Pulse identity. The link remains functional; it is not the final canonical product route.

## Application repository — `Yberium/venuebrief`

Public entry path:

1. `index.html`
2. `readiness-core.html`
3. Service Hub and readiness assets loaded from `assets/`

### Visible identity references to replace in the app phase

- `index.html`: title and entry-link copy.
- `readiness-core.html`: page title, boot label, hero eyebrow and copy, navigation label, account language, workflow explanations, Relay label and print actions.
- `assets/service-hub-shell.js`: desktop rail and mobile top-bar wordmark.
- `assets/billing-account.js`: account, login and error copy.
- `assets/ai-shift-intake.js`, `ai-voice-briefing.js`, `ai-photo-intake.js`: user-facing assistant, status and permission copy.
- `assets/ai-copilot-session.js`, `ai-tool-loop.js`: Copilot headings and explanatory copy.
- `assets/break-planner.js`, `coverage-planner.js`, `product-maturation.js`, `guided-readiness.js`: user-facing automation explanations.
- `assets/readiness-core.js`: confirmation, import error and exported filename language.
- `assets/readiness-print-enhancements.js`: document accessibility label.
- `assets/readiness-relay.js`: message headers and manager summary branding.
- `assets/service-hub-outputs.js`, `service-hub-release.js`, `service-hub-state.js`, `review-decision.js`: visible Manager Brief / WhatsApp Relay module labels and lifecycle messages.

### Compatibility references to preserve initially

- Local-storage keys beginning with `venuebrief_`.
- JavaScript globals beginning with `VenueBrief` or `__venueBrief`.
- Browser events beginning with `venuebrief:`.
- DOM data attributes used as runtime hooks.
- API header `x-venuebrief-venue-id`.
- Current backend endpoint at `venuebrief-api.onrender.com` until backend and DNS migration are separately tested.
- Schema v3 and exported JSON compatibility.

These identifiers are implementation contracts, not public branding. Renaming them during the visual rebrand would create unnecessary regression risk and could strand saved browser data.

## Approved public module mapping

| Former visible label | Yberium Pulse label |
|---|---|
| Service Hub / Today home | Pulse Control |
| Manager Brief | Pulse Brief |
| WhatsApp Relay / VenueBrief Relay | Pulse Relay |
| Handover | Pulse Handover |
| End-of-shift review | Pulse Review |

Generic task labels such as Shift, Team, Coverage and Review may remain where they describe an action rather than a brand module.

## Sequencing boundary

1. Landing rebrand and QA.
2. Public demo rebrand.
3. Application shell and visible strings.
4. Pulse Control home presentation.
5. Output documents and Relay branding.
6. Domain cutover, canonical verification and redirects.

No redirect should be enabled until the new domain, demo and app routes work together end to end.
