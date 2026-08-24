# MARKDOWN//LAB v1.2.0 — Workbench UX & Visual Design Reconstruction

## Status

**Release candidate under certification**

Gate: `V120_WORKBENCH_CERTIFIED`

## Why this release exists

v1.1.0 fixed first-use comprehension: visitors now understand what MARKDOWN//LAB is, can start from a clear task, search the 13 laboratories, and use guided routes.

The next remaining product weakness is inside the laboratory itself. The underlying lab UI was built across many phases and therefore still feels uneven: editor sizes vary, results can be cramped, controls compete with content, the active lab is not explained in one consistent place, and returning to laboratory discovery is less obvious than it should be.

v1.2.0 reconstructs the workbench presentation without replacing the certified runtime or any laboratory behavior.

## Product contract

The active laboratory should read as one coherent workspace:

**lab context → controls/editor → visible result → persistent demo feedback → easy return to discovery**

The previous v1.1.0 and v1.0.1 contracts remain mandatory.

## Implemented changes

### Dedicated workbench frame

- every active laboratory is wrapped by `v120-workbench`;
- the frame sits in the already-certified location immediately below laboratory navigation;
- a new context strip displays the active lab number, plain-language title, and a one-sentence explanation of what the lab does;
- context synchronizes across all Labs 00–12, including navigation initiated by demos and guided routes.

### Escape path back to discovery

- every workbench exposes **Back to laboratories**;
- the action returns to the existing v1.1.0 discovery surface;
- the existing lab remains selected rather than being reset;
- focus is returned to lab search after navigation.

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

Known result surfaces now receive consistent containment and readable minimum heights, including:

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

Long output is contained instead of expanding the page horizontally.

### Controls and accessibility

- workbench buttons receive minimum target heights;
- mobile targets increase further;
- inputs, selects, textareas, and buttons use consistent box sizing;
- keyboard focus receives a strong visible outline;
- disabled controls communicate unavailable state;
- reduced-motion preferences suppress nonessential workbench animation.

### Mobile

- the lab context strip stacks cleanly;
- Back to laboratories becomes full-width;
- editor height is reduced without becoming cramped;
- known result surfaces keep contained overflow;
- horizontal viewport containment remains a release requirement.

## Certification

`V120_WORKBENCH_CERTIFIED` independently verifies:

1. dedicated workbench frame and lab metadata;
2. synchronized context for all 13 laboratories;
3. readable Markdown editor metrics;
4. readable Markdown result metrics;
5. usable primary control targets;
6. laboratory navigation remains immediately followed by the workbench;
7. known output surfaces use readable containment;
8. desktop/mobile horizontal viewport containment.

The v1.2.0 gate runs independently at desktop and mobile widths.

## Regression requirements

Promotion is invalid unless these also remain green:

- P12 repository + desktop + mobile
- v1.0.1 exhaustive desktop + mobile, including 13/13 executable demos
- v1.1.0 repository + desktop + mobile usability
- v1.2.0 repository + desktop + mobile workbench UX

The certified P10 runtime baseline remains unchanged:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
