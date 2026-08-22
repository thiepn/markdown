# Changelog

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

### Certification

- existing P12 repository, desktop, and mobile regression suites remain green
- new `V101_INTERACTION_CERTIFIED` browser gate validates immediate workbench layout
- certification executes a real parser demo and verifies its visible rendered result
- certification executes a real three-step `Terminal → Chaos/Recovery → Parser` guided route
- the interaction gate runs independently on desktop and mobile-width Chromium

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
