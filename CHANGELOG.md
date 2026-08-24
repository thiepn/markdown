# Changelog

## 1.2.0 — Workbench UX & Visual Design Reconstruction

Reconstructs the active laboratory experience after v1.1.0 fixed product entry, discovery, and first-use comprehension.

### Workbench frame

- adds one consistent editorial workbench frame around all 13 laboratories
- displays active lab number, plain-language title, and purpose above the real controls
- synchronizes lab context when navigation originates from lab cards, demos, or guided routes
- adds a persistent `Back to laboratories` escape path without resetting active lab state

### Readability

- normalizes the primary Markdown, JavaScript, Polyglot, Mermaid, and Data editors to readable monospace sizing and line-height
- gives source editors a practical minimum working height on desktop and mobile
- keeps editors vertically resizable
- improves rendered Markdown preview typography and heading rhythm
- gives known output surfaces stable minimum height, readable line-height, and contained overflow
- prevents long output from creating horizontal page expansion

### Controls & accessibility

- standardizes control box sizing within the workbench
- increases button target heights, with larger targets on mobile
- adds strong `:focus-visible` treatment for keyboard users
- improves disabled-state communication
- respects `prefers-reduced-motion`

### Certification

- adds independent `V120_WORKBENCH_CERTIFIED` browser gate
- cycles through all Labs 00–12 and verifies synchronized active-lab context
- verifies readable editor/result metrics and primary control target sizes
- verifies navigation → immediate workbench ordering remains intact
- verifies known result-surface containment and horizontal viewport containment
- runs v1.2.0 certification independently on desktop and mobile-width Chromium
- P12, v1.0.1 exhaustive 13/13 interaction, and v1.1.0 usability gates remain mandatory

## 1.1.0 — Product Usability & Information Architecture Reconstruction

Release-candidate reconstruction of the first-use experience after v1.0.1 made every laboratory and demonstration visibly executable.

### Product entry

- replaces phase-first `P11` landing copy with plain-language `MARKDOWN//LAB` product identity
- primary message is now `Learn Markdown by doing.`
- explains Markdown, code, math, diagrams, data, browser APIs, and publishing workflows without requiring knowledge of internal project phases
- replaces release-state chip noise with six capability labels: Markdown, Code, Math, Diagrams, Data, Browser
- Start Here guidance directs new users to an obvious first action

### Task-first navigation

- adds three prominent quick starts inside the laboratory navigation surface
- `Start with Markdown` opens Lab 01
- `Take the guided tour` launches the existing Markdown → Diagram → Final Form route
- `Open Final Form` opens the end-to-end composition workbench
- preserves the v1.0.1 navigation → immediate workbench ordering contract

### Laboratory discovery

- adds searchable discovery across all 13 labs
- adds five filters: Markdown, Code, Visual & data, Web & tools, Advanced
- displays a live visible-lab count
- `/` focuses lab search when another input is not active
- lab selections create `#lab-XX` deep links outside certification modes
- direct `#lab-XX` visits reopen the intended laboratory

### Product-language cleanup

- `P11 Showcase Deck` becomes `Demos & Guided Routes`
- demo section headline becomes `Try a prepared example.`
- `GUIDED / ADVANCED / STRESS` becomes `BEGINNER / DEEP DIVE / STRESS TEST`
- metrics become `Demos Tried / Recoveries / Final Form Runs / Achievements`
- P12 is retained but demoted to `Developer Verification / Regression Checks`

### Certification

- adds independent `V110_USABILITY_CERTIFIED` browser gate
- verifies plain-language entry, 3/3 quick starts, Markdown start path, search discovery, category filtering, guided-tour launch, demo-library clarity, and viewport containment
- v1.1.0 certification runs independently on desktop and mobile-width Chromium
- P12 and v1.0.1 exhaustive 13/13 interaction gates remain mandatory

## 1.0.1 — Interaction & Demonstration Reconstruction

Corrective release for the post-v1.0.0 interaction defect where laboratory navigation and showcase buttons changed hidden state or prefilled controls without consistently exposing or executing the resulting workbench.

### Interaction reconstruction

- active laboratory workbench now appears immediately below the laboratory selector
- laboratory navigation automatically brings the workbench into view
- persistent workbench dock explains the active demo and reports `ready`, `running`, `pass`, or `fail`
- every lab 00–12 has a one-click executable demonstration runner
- scenario cards now execute the actual underlying controls instead of acting primarily as preset loaders
- successful results receive temporary visible result highlighting
- failures remain visible with an explicit manual fallback instead of silently appearing to do nothing

### Guided routes

- cross-lab composition cards now start persistent guided workflows
- Back, Next step, Finish route, and Exit controls remain visible while moving between laboratories
- Document → Data → SQL uses the real P6 `Open in SQLite` handoff to P3
- Terminal → Chaos → Recovery executes and certifies an actual multi-step recovery workflow
- route completion reports a visible final result in the workbench dock

### Lab 03 — Polyglot Statistics

- exhaustive one-click testing exposed a remaining cold-start failure in the Python/Pyodide demo path
- the default Lab 03 demonstration now uses the existing built-in WebAssembly companion, so it is immediate and network-independent
- the demo runs the real `Run WASM add` control and verifies the visible `17 + 25 = 42` result before reporting success
- Python remains available through the Python tab as an explicit lazy-loaded Pyodide runtime
- SQLite and Lua remain available through their existing P3 runtime paths

### Certification

- existing P12 repository, desktop, and mobile regression suites remain green
- `V101_INTERACTION_CERTIFIED` validates immediate workbench layout
- certification now executes **all 13 one-click demos** rather than sampling only the parser
- each demo must return its own verified visible result
- certification executes a real three-step `Terminal → Chaos/Recovery → Parser` guided route
- the exhaustive interaction gate passes independently on desktop and mobile-width Chromium
- certified exhaustive run: `#58` / `32598253333`
- evidence artifact: `9482150275`

## 1.0.0 — Production Release

MARKDOWN//LAB reaches its first production release after the P0–P12 implementation and certification sequence.

### Included

- 13 laboratory surfaces covering the complete application progression
- curated P11 showcase scenarios for every lab
- four cross-lab compositions
- controlled chaos/recovery exercises
- Final Form composition pipeline
- persistence, Worker, WebCrypto and browser capability integration
- production loader integrity checks for the reconstructed runtime
- desktop and mobile-width browser certification
- accessibility control-name and horizontal-overflow regression gates

### Release hardening

- deterministic P8, P9 and P10 runtime checksum verification
- corrected P11/P12 injection at the final document body boundary
- corrected accessibility certification logic
- corrected transient chaos-state verification
- GitHub Actions release certification with evidence artifacts

### Baseline

The v1 runtime preserves the certified P10 reconstruction SHA-256:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`

Behavior-changing work after v1.0.0 must ship under a later version and pass the release certification gates again.