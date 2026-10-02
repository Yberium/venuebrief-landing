# Public footprint handoff — 2026-10-02

This is an operator handoff only. It does not authorise production deployment, DNS changes, Google Search Console actions, LinkedIn mutations, or a merge to `main`.

## venuebrief.co.uk

No DNS provider, registrar control path, redirect configuration, or verified ownership evidence for `venuebrief.co.uk` is present in this repository. Treat the domain as **external/manual**. The domain owner should verify its registrar and DNS host, then choose an explicit redirect or retirement policy. Do not infer the current DNS state and do not change it as part of this cleanup.

## LinkedIn Featured replacement

After the approved landing is deployed by an authorised operator:

1. Open the Yberium company/profile Featured section as an authorised LinkedIn administrator.
2. Remove or archive any Featured item whose image or copy presents Pulse, heartbeat/graphite/lime branding, or the former hero.
3. Add `https://yberium.com/` as the replacement Featured link.
4. Use the title `Yberium — Hospitality operations intelligence and workforce control`.
5. Use the description `Structured, reviewable hospitality operations guidance, bounded by evidence and human authority.`
6. Confirm the generated preview resolves to `https://yberium.com/`, uses the approved title/description, and does not show stale imagery before saving.
7. Record the editor, timestamp, and resulting LinkedIn URL in the release record.

No LinkedIn change is performed by this repository change.

## Google reindex checklist

Run only after an authorised production deployment:

1. Verify the deployed homepage and sample page return HTTP 200 over HTTPS.
2. Confirm each deployed page has one self-referencing `https://yberium.com/` canonical URL, as appropriate.
3. Confirm `https://yberium.com/robots.txt` allows crawling and names `https://yberium.com/sitemap.xml`.
4. Confirm the sitemap returns HTTP 200 and contains the canonical homepage and sample-page URLs with the new modification date.
5. Inspect the deployed homepage in Google Search Console and test the live URL.
6. Request indexing for `https://yberium.com/` and `https://yberium.com/sample-shift-brief.html`.
7. Resubmit `https://yberium.com/sitemap.xml` only if Search Console does not already show the updated fetch.
8. Monitor indexing/canonical selection and search snippets; do not repeatedly request indexing.
9. Record actions and observed results in the release record.

No Google Search Console action is performed by this repository change.
