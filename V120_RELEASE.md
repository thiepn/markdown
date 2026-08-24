# MARKDOWN//LAB v1.2.0 — Workbench UX & Visual Design Reconstruction

## Status

**Released — guarded live closure passed**

Gate: `V120_WORKBENCH_CERTIFIED`

Production: `https://thiepn.dev/markdown/`

## Release purpose

v1.1.0 fixed first-use comprehension and laboratory discovery. v1.2.0 reconstructs the active laboratory itself so the application reads as one coherent workspace rather than a collection of phase-built panels.

The v1.2 workbench contract is:

**lab context → controls/editor → visible result → persistent demo feedback → easy return to discovery**

## Implemented changes

### Dedicated workbench frame

- consistent `v120-workbench` frame across Labs 00–12;
- active lab number, plain-language title, and purpose above the real controls;
- context remains synchronized when navigation comes from labs, demos, or guided routes;
- `Back to laboratories` returns to the v1.1 discovery surface without resetting active lab state.

### Editor readability

The main source editors now share a readable baseline:

- Markdown `#ed`
- JavaScript `#js`
- Polyglot `#polyEd`
- Mermaid `#mermaidSource`
- Data `#dataSource`

Desktop baseline: 14 px monospace, 1.62 line-height, 280 px minimum height.

Mobile baseline: 13 px monospace, 210 px minimum height.

Editors remain vertically resizable.

### Result readability

Known result surfaces now use stable minimum heights, readable line-height, and contained overflow:

- Markdown preview
- code output
- polyglot output
- math output
- Mermaid canvas
- typed data output
- API response
- Worker output
- terminal log
- accessibility audit results

Long results no longer need to expand the page horizontally.

### Controls and accessibility

- consistent control box sizing;
- minimum button target heights with larger mobile targets;
- strong `:focus-visible` treatment;
- clearer disabled state;
- `prefers-reduced-motion` support;
- mobile context strip stacks cleanly and the Back action becomes full-width.

## Certification

`V120_WORKBENCH_CERTIFIED` verifies:

1. dedicated workbench frame;
2. synchronized context for all 13 labs;
3. readable Markdown editor metrics;
4. readable result metrics;
5. usable primary control targets;
6. laboratory navigation remains immediately followed by the workbench;
7. ten known output surfaces are contained in their actual active labs;
8. desktop/mobile horizontal containment.

All previous P12, v1.0.1, and v1.1.0 gates remain mandatory.

## Certified candidate evidence

Run `#93` / `32734352230` passed the complete repository + eight-browser-profile stack.

Artifact: `9522625032`

SHA-256: `47a00cdb602d1caaff6f8810a6e490ce28f478ded2bcd69526b8677e717bd15e`

The metadata-complete promotion gate run `#95` / `32734523079` reproduced the complete stack before PR #9 merged.

Artifact: `9522676908`

SHA-256: `821180289b568f6d3e6dcb3693478fbf67ffa4fec3e5b47960244d3832e78f1a`

PR #9 promoted v1.2.0 to `main` at:

`96b8e747ee9a42c4b9d037b5381ff1e038430a5f`

## Production live closure

Guarded live run `#97` / `32734821921` verified the public custom-domain loader and both v1.2 assets, then reran the entire P12 + v1.0.1 + v1.1.0 + v1.2.0 browser stack.

Results:

- public loader: **PASS**
- public workbench asset: **PASS**
- public v1.2 browser-gate asset: **PASS**
- P12 desktop/mobile: **PASS**
- v1.0.1 exhaustive desktop/mobile: **PASS, including 13/13 executable demos**
- v1.1.0 desktop/mobile usability: **8/8 PASS**
- v1.2.0 desktop/mobile workbench: **8/8 PASS**

Artifact: `9522791929`

SHA-256: `4c9d1eecbc9fd366115731072ef28b17eaf615d044ac873075b5019d97f82a38`

The guarded release marker is `release/V120_RELEASED.txt`.

The certified P10 runtime baseline remains unchanged:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
