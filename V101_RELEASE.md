# MARKDOWN//LAB v1.0.1 — Interaction & Demonstration Reconstruction

## Status

**Certified release candidate**

Gate: `V101_INTERACTION_CERTIFIED`

## Why this release exists

v1.0.0 passed implementation and regression certification, but its P11 showcase interaction model still had a major product defect: users could click laboratories, scenarios, and routes while remaining visually anchored above the actual workbench. Several scenario buttons also loaded presets without executing the underlying lab action. The result was technically valid state transitions that often looked like nothing happened.

v1.0.1 reconstructs that interaction layer without replacing the certified P10/P11 engines underneath it.

## Product contract

The application now follows this sequence:

**navigation → immediate visible workbench → one-click executable demo → visible result → persistent feedback**

Cross-lab workflows additionally follow:

**start route → execute current stage → persistent route controls → next stage → visible completion**

## Implemented corrections

- The active `.stage` workbench is moved directly below the laboratory selector.
- Clicking a laboratory brings the active workbench into view.
- A persistent workbench dock identifies the active demo and exposes `Run this demo`.
- The dock reports `ready`, `running`, `pass`, and `fail` states with explanatory text.
- All 13 laboratories have executable one-click runners.
- Parser, Worker, Python, Math, Mermaid, Data, API, Browser Worker, Terminal, UI audit, Chaos recovery, and Final Form demos invoke their real existing controls.
- Lab 00 verifies and highlights the rendered runtime capability matrix.
- Successful output surfaces are temporarily highlighted so the result is visually obvious.
- Scenario cards are relabeled as executable demos and still preserve P11 launch/progression state.
- Cross-lab composition cards become persistent guided routes with Back, Next step, Finish route, and Exit.
- `Document → Data → SQL` uses the real P6 `Open in SQLite` bridge and executes the generated SQL in P3.
- `Terminal → Chaos → Recovery` executes an actual terminal command, a controlled mutation/recovery cycle, and a recovered parser verification.

## Certification reconstruction

The original P12 suite remains intact and must continue to pass.

A new independent browser gate, `V101_INTERACTION_CERTIFIED`, adds five user-facing checks:

1. laboratory navigation is immediately followed by the active workbench;
2. the executable interaction API exposes all 13 demos and 4 guided routes;
3. a parser demo actually runs and produces a visible rendered result;
4. a real three-stage `Terminal → Chaos/Recovery → Parser` route completes;
5. the persistent workbench feedback surface clearly reports success.

These checks run separately in desktop and mobile-width Chromium.

## Certified candidate evidence

Workflow run: `#42` / `32591118835`

Candidate head: `b5fe0a1b0e2e6b12e59723c8106dffd3f131a09f`

Results:

- P12 repository certification: PASS
- v1.0.1 repository certification: PASS
- P12 desktop browser: PASS
- P12 mobile browser: PASS
- v1.0.1 desktop interaction: 5/5 PASS
- v1.0.1 mobile interaction: 5/5 PASS

Evidence artifact: `9480344935`

Evidence SHA-256: `1cab47b4e90d76cae31d0e7497ef25e5c4b2cc2215ed90080013bbf89b97084a`

Interaction source SHA-256: `82cf4e92451cf5d2105d003c6a32981ee8613e4e73f636184cd9efe59b5df280`

Browser-gate SHA-256: `0b3e7bda59246f57068f2d3ada81bbfc30745056b0dfc9e9bdaecca8d4992f4d`

## Promotion rule

This candidate may be merged only after the metadata-complete branch passes the unchanged P12 gates and the new interaction gates again. It becomes a released v1.0.1 only after the deployed custom-domain site serves the new interaction layer and browser gate and the public loader references both.
