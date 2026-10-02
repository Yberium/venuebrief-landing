# Homepage V2 Canonical Authority — 2026-10-02

Owner-approved public homepage and public visual-system direction.

## Home
- Single-screen, non-scroll first impression.
- Large centered Yberium wordmark.
- Headline: **A new way to run hospitality.**
- Minimal supporting copy.
- Generous whitespace.
- Separate top-navigation pages for product information.
- No feature wall or large Hub/dashboard panel in the homepage hero.

Canonical layout reference:
`/Yberium/Brand/Public Landing/Yberium_Home_Hero_Canonical_2026-10-02.png`
(owner Library)

Canonical richer visual reference:
`/Yberium/Brand/Public Landing/Yberium_Public_Visual_Canonical_Rich_Waves_2026-10-02.png`
(owner Library)

The richer reference is authoritative for **visual treatment only**. It does not authorise its demo CTA, Insights item, or Sign in control.

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
- Support

Controlled access remains a separate current route.
Insights remains omitted until truthful current content exists.
Sign in remains omitted until a truthful current destination exists.

## Visual
Cream/off-white, charcoal, restrained teal, generous whitespace.
No Pulse, heartbeat, black/neon, stock imagery, KPI wall, or generic dashboard hero.

### Rich cinematic visual language
The preferred public aesthetic is the richer first-reference treatment:
- soft cream/off-white atmospheric canvas;
- luminous teal/cyan wave layers;
- translucent overlap and haze;
- smooth curved geometry;
- visible depth without obscuring content;
- premium cinematic finish;
- restrained, continuous motion.

The current flatter band-like wave look is not the target.

## Global visual requirement
The rich wave system is a **global Yberium public signature**, not a homepage-only effect.

It must be carried across all primary public navigation pages:
- Home
- Product
- How it works
- Use cases
- Trust & safety
- Support
- Controlled access

Active supporting/legal surfaces should remain visually compatible where appropriate, without unnecessary redesign.

Page-specific wave crop/composition may vary, but the same visual family, depth, luminosity and motion language must remain recognisable.

## Motion signature — owner decision
Owner selected **Option C: cinematic / layered / interactive waves**.

Implementation intent:
- multiple soft teal/cyan wave layers with depth;
- slow continuous wave motion;
- restrained parallax / pointer response on capable desktop devices;
- mobile still visibly animates, with lower interaction amplitude;
- consistent family resemblance across all public pages;
- page-specific composition may vary while preserving the same system.

Performance and accessibility boundaries:
- prefer lightweight SVG/CSS/transforms + minimal requestAnimationFrame where needed;
- no WebGL dependency unless profiling proves it necessary;
- avoid continuous high-cost filters and large repaint regions;
- target smooth interaction on modern mobile and desktop;
- `prefers-reduced-motion: reduce` must disable continuous animation/parallax and preserve an equivalent static wave composition;
- content, navigation and CTA readability always take precedence over motion;
- zero horizontal overflow;
- decorative layers must never intercept pointer events.

## Status
`HOMEPAGE_V2_MINIMAL_NON_SCROLL = OWNER_APPROVED`
`DEMO_NOW = DEFERRED`
`GLOBAL_WAVE_MOTION = OPTION_C_CINEMATIC_INTERACTIVE`
`PUBLIC_VISUAL_REFERENCE = RICH_WAVES_CANONICAL`
`GLOBAL_PAGE_EFFECT = REQUIRED`

Authority issue: #undefined
