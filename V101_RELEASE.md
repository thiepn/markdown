# MARKDOWN//LAB v1.0.1 — Interaction & Demonstration Reconstruction

## Status

**Released after guarded live verification; exhaustive one-click certification completed**

Gate: `V101_INTERACTION_CERTIFIED`

## Why this release exists

v1.0.0 passed implementation and regression certification, but its P11 showcase interaction model still had a major product defect: users could click laboratories, scenarios, and routes while remaining visually anchored above the actual workbench. Several scenario buttons also loaded presets without executing the underlying lab action. The result was technically valid state transitions that often looked like nothing happened.

v1.0.1 reconstructs that interaction layer without replacing the certified P10/P11 engines underneath it.

A later exhaustive 13-demo audit found one remaining defect in Lab 03: its default Polyglot Statistics demo depended on a cold Pyodide download and could time out before producing visible feedback. That path is now corrected.

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
- Parser, Worker, Math, Mermaid, Data, API, Browser Worker, Terminal, UI audit, Chaos recovery, and Final Form demos invoke their real existing controls.
- Lab 00 verifies and highlights the rendered runtime capability matrix.
- Successful output surfaces are temporarily highlighted so the result is visually obvious.
- Scenario cards are relabeled as executable demos and still preserve P11 launch/progression state.
- Cross-lab composition cards become persistent guided routes with Back, Next step, Finish route, and Exit.
- `Document → Data → SQL` uses the real P6 `Open in SQLite` bridge and executes the generated SQL in P3.
- `Terminal → Chaos → Recovery` executes an actual terminal command, a controlled mutation/recovery cycle, and a recovered parser verification.

## Lab 03 — Polyglot Statistics correction

The default Lab 03 demo now uses the lab's built-in WebAssembly companion rather than requiring Pyodide to cold-load before the demonstration can complete.

Default demo behavior:

1. open Lab 03;
2. select the existing Rust / WebAssembly companion surface;
3. run the real `Run WASM add` control;
4. execute `17 + 25` inside the built-in WebAssembly module;
5. require the visible structured result `42` before reporting success.

Python has **not** been removed. Python remains available through the Python tab and still uses lazy-loaded Pyodide for users who intentionally run Python code. SQLite and Lua remain available through their existing P3 runtime paths.

This separates two concerns correctly:

- **one-click product demonstration:** immediate, deterministic, network-independent;
- **full Python runtime:** explicit, heavier, lazy-loaded capability.

## Certification reconstruction

The original P12 suite remains intact and must continue to pass.

The v1.0.1 interaction gate now validates five user-facing contracts:

1. laboratory navigation is immediately followed by the active workbench;
2. the executable interaction API exposes all 13 demos and 4 guided routes;
3. **all 13 one-click demos execute and independently return verified visible results**;
4. a real three-stage `Terminal → Chaos/Recovery → Parser` route completes;
5. the persistent workbench feedback surface clearly reports success.

These checks run separately in desktop and mobile-width Chromium.

## Exhaustive certification evidence

Workflow run: `#58` / `32598253333`

Certified head: `1cde922b685d09751e0621c83223aa9a959fae20`

Results:

- P12 repository certification: PASS
- v1.0.1 repository certification: PASS
- P12 desktop browser: PASS
- P12 mobile browser: PASS
- v1.0.1 desktop interaction: **5/5 PASS, including 13/13 demos**
- v1.0.1 mobile interaction: **5/5 PASS, including 13/13 demos**
- Lab 03 deterministic WebAssembly demonstration: PASS

Evidence artifact: `9482150275`

Evidence SHA-256: `a5a26106fb8c52c2526104e92d4f75fecb021b384dd7864a39f759edf7061061`

Certified P10 baseline SHA-256 remains:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`

## Live-release guard

The released state remains valid only while the deployed custom-domain application and its release assets are reachable and the complete P12 + exhaustive v1.0.1 desktop/mobile browser suite remains green.
