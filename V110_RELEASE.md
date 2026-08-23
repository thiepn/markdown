# MARKDOWN//LAB v1.1.0 — Product Usability & Information Architecture Reconstruction

## Status

**Certified release candidate**

Gate: `V110_USABILITY_CERTIFIED`

## Why this release exists

v1.0.1 fixed the most serious interaction defect: clicking labs and showcase controls now brings the real workbench into view, executes real controls, and reports visible results.

The remaining product problem is comprehension. The first screen still presents the application as a sequence of internal project phases (`P11`, `P10`, certification state, schema versions, recovery badges) before explaining what a visitor can actually do. All 13 labs are visible, but they arrive as one dense undifferentiated wall.

v1.1.0 reconstructs that entry experience without replacing the certified runtime.

## Product contract

The new first-use path is:

**understand the product → choose a task → find a lab → immediate workbench → visible result**

The existing v1.0.1 interaction contract remains mandatory:

**navigation → immediate visible workbench → one-click executable demo → visible result → persistent feedback**

## Implemented changes

### Plain-language landing

- Hero identity becomes `MARKDOWN//LAB` rather than a phase label.
- Primary message becomes `Learn Markdown by doing.`
- Product description explains Markdown, code, math, diagrams, data, browser APIs, and publishing workflows in ordinary language.
- Internal release badges are replaced by six capability labels: Markdown, Code, Math, Diagrams, Data, Browser.
- The release-system alert becomes a simple Start Here instruction.

### Task-first quick starts

Three prominent actions now sit directly inside the laboratory navigation surface:

1. **Start with Markdown** — opens Lab 01.
2. **Take the guided tour** — launches the existing Markdown → Diagram → Final Form route.
3. **Open Final Form** — opens the end-to-end composition lab.

Keeping these inside the navigation section preserves the v1.0.1 rule that the workbench remains immediately after laboratory navigation.

### Laboratory discovery

- Search field filters all 13 labs by name and description.
- Five user-facing categories:
  - Markdown
  - Code
  - Visual & data
  - Web & tools
  - Advanced
- Live count reports how many labs match the current search/filter.
- `/` focuses the lab search when the user is not typing in another control.
- Lab selection creates a `#lab-XX` deep link outside certification modes.
- Opening a deep link automatically selects that lab.

### Demo library language

- `P11 Showcase Deck` becomes **Demos & Guided Routes**.
- `Demo library — optional presets and guided routes` becomes **Try a prepared example.**
- `GUIDED / ADVANCED / STRESS` becomes **BEGINNER / DEEP DIVE / STRESS TEST**.
- Metrics become **Demos Tried / Recoveries / Final Form Runs / Achievements**.
- Product-facing copy is restored immediately after the legacy lab-layout pass so it does not revert during normal lab or guided-route navigation.

### Release tooling is demoted

The P12 surface remains available and functional, but its visible copy becomes **Developer Verification / Regression Checks** instead of presenting release machinery as a primary product concept.

## Certification

`V110_USABILITY_CERTIFIED` independently verifies:

1. plain-language product entry;
2. all three task-first quick starts;
3. Start with Markdown opens Lab 01 and preserves immediate workbench placement;
4. search discovery isolates the Mermaid lab;
5. Visual & Data category resolves exactly to Labs 04–06;
6. the guided-tour CTA starts the real multi-lab route;
7. the demo library uses product-facing language after real navigation;
8. the page remains horizontally contained at the tested viewport.

The v1.1.0 gate runs on both desktop and mobile-width Chromium.

## Certified candidate evidence

Workflow: `P12 Certification`

Run: `#76` / `32642256487`

Certified head: `e63ade079e22818950b14baa93aa9e38b7d24ba1`

Results:

- P12 repository certification: **PASS**
- v1.0.1 repository certification: **PASS**
- v1.1.0 repository certification: **PASS**
- P12 desktop browser: **PASS**
- P12 mobile browser: **PASS**
- v1.0.1 exhaustive interaction desktop: **PASS, including 13/13 executable demos**
- v1.0.1 exhaustive interaction mobile: **PASS, including 13/13 executable demos**
- v1.1.0 desktop usability: **8/8 PASS**
- v1.1.0 mobile usability: **8/8 PASS**

Evidence artifact: `9493919065`

Evidence SHA-256: `e056beb6c10aa5a5f4745a9caf2e70319d6360d205e21600a6dccb67f56a39cd`

## Regression requirements

A v1.1.0 release is invalid unless all previous gates also remain green:

- P12 repository certification
- P12 desktop browser certification
- P12 mobile browser certification
- v1.0.1 exhaustive 13/13 interaction certification — desktop
- v1.0.1 exhaustive 13/13 interaction certification — mobile

The certified P10 runtime baseline remains unchanged:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`

## Promotion rule

The evidence above is frozen in the release manifest. The metadata-complete candidate head must pass the complete P12 + v1.0.1 + v1.1.0 suite again before PR #7 can merge. Production release status will then require a separate custom-domain live-deployment closure.
