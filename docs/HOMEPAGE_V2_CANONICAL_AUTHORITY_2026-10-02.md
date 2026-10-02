# Homepage V2 Canonical Authority — 2026-10-02

Owner-approved public homepage direction.

## Home
- Single-screen, non-scroll first impression.
- Large centered Yberium wordmark.
- Headline: **A new way to run hospitality.**
- Minimal supporting copy.
- Generous whitespace.
- Separate top-navigation pages for product information.
- No feature wall or large Hub/dashboard panel in the homepage hero.

Canonical visual reference:
`/Yberium/Brand/Public Landing/Yberium_Home_Hero_Canonical_2026-10-02.png`
(owner Library)

## CTA state while demo is deferred
- **See Yberium in action** → `/product/`
- **How it works** → `/how-it-works/`

Do not show **Try the demo** until a new canonical Yberium demo exists.

## Demo gate
Do not rebuild/rebrand the legacy Pulse demo now.
Revisit only after Hub shell/navigation is stable, HOS-1 is stable enough to represent the wider product, and at least one genuine cross-module flow exists.

## Navigation
Page-based, not anchor-scroll based:
- Product
- How it works
- Use cases
- Trust & safety
- Insights only when truthful current content exists
- Support

Controlled access remains a separate current route.
Sign in is shown only if a truthful current sign-in destination exists.

## Visual
Cream/off-white, charcoal, restrained teal, generous whitespace.
No Pulse, heartbeat, black/neon, stock imagery, KPI wall, or generic dashboard hero.

## Motion signature — owner decision
The soft teal waves are a canonical Yberium visual signature and should appear across the navigable public pages.

Owner selected **Option C: cinematic / layered / interactive waves**, not a static or lightly animated treatment.

Implementation intent:
- multiple soft teal wave layers with depth;
- slow continuous wave motion;
- restrained parallax / pointer response on capable desktop devices;
- subtle depth and perspective, without competing with page content;
- consistent family resemblance across Home, Product, How it works, Use cases, Trust & safety and Support;
- page-specific composition may vary while preserving the same wave system.

Performance and accessibility boundaries:
- use a lightweight implementation first (SVG/CSS/transform + requestAnimationFrame only where needed);
- no WebGL dependency unless profiling proves it necessary;
- avoid continuous high-cost filters and large repaint regions;
- target smooth interaction on modern mobile and desktop;
- mobile may reduce parallax amplitude while retaining visible wave motion;
- `prefers-reduced-motion: reduce` must disable parallax and continuous animation, falling back to the same static wave composition;
- content, navigation and CTA readability always take precedence over motion.

The waves are decorative, not functional UI. They must never block interaction, create horizontal overflow, or become a new product metaphor that conflicts with Yberium's bounded / evidence-led positioning.

## Status
`HOMEPAGE_V2_MINIMAL_NON_SCROLL = OWNER_APPROVED`
`DEMO_NOW = DEFERRED`
`GLOBAL_WAVE_MOTION = OPTION_C_CINEMATIC_INTERACTIVE`

Authority issue: #16
