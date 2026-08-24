# MARKDOWN//LAB v1.3.0 — Guided Learning & Practice Reconstruction

## Status

**Certified release candidate**

Gate: `V130_LEARNING_CERTIFIED`

## Why this release exists

v1.2.0 made the workbench readable and coherent. The remaining weakness was instructional: the labs were powerful free-play tools, but a new user still had to invent their own objective after opening one.

v1.3.0 adds an optional learning layer without turning MARKDOWN//LAB into a locked course or a fake quiz app.

## Learning contract

**goal → try in the real workbench → check the real result → hint/reference if needed → complete → choose what to do next**

Free play remains fully available at every point.

## Implemented changes

### 39 real exercises

Every Lab 00–12 defines Beginner, Intermediate, and Advanced exercises: 39 total. Each includes a concrete task, one hint, and a reference answer or workflow.

### Real result validation

Completion checks the actual active lab state rather than navigation or button clicks. Covered surfaces include rendered Markdown, JavaScript Worker output, Polyglot/WebAssembly output, math results, Mermaid rendering, typed data, API responses, browser Worker output, terminal logs, accessibility audit findings, Chaos recovery state, and Final Form state.

### Practice remains optional

- all 13 labs remain unlocked;
- demos, guided routes, and free play remain unchanged;
- progress never gates navigation.

### Hints, reference, and Challenge mode

- Hint reveals one targeted nudge;
- Reference reveals a sample answer/workflow but never changes workbench state or marks completion;
- Challenge mode disables hints and hides the reference.

### Progress and path

- progress is stored under `markdown-lab:v130-learning`;
- completion is tracked separately for all three difficulty levels;
- laboratory navigation shows `0/3` through `3/3`;
- the optional recommended path covers Labs 01 → 12.

### Grading hardening discovered during certification

The first browser passes exposed two useful edge cases and both were corrected before certification:

1. Markdown structured exercises initially depended on preview DOM tags that are not guaranteed by every parser representation. The final semantic bridge requires both authored Markdown structure and a real rendered preview while preserving the learning engine's canonical in-memory completion state.
2. Recommended-path navigation originally nested a synthetic lab click inside the originating button event. The final implementation defers lab activation to the next event-loop turn so it follows the normal navigation path reliably.

## Certification

`V130_LEARNING_CERTIFIED` verifies 11 requirements on desktop and mobile:

1. optional practice panel;
2. complete 39-exercise curriculum;
3. three difficulty levels;
4. all labs remain unlocked;
5. real Markdown success check;
6. Beginner → Intermediate → Advanced completion;
7. local persistence and discovery progress;
8. Hint and Reference behavior;
9. Challenge mode;
10. recommended-path navigation;
11. horizontal containment.

## Certified candidate evidence

Certified head: `4d49ebf81109fb62fc3752a3cdb2a9609a4a44e2`

### v1.3.0 learning

Workflow: `v1.3.0 Learning Certification`

Run: `#14` / `32741699397`

- repository learning certification: **PASS**
- desktop learning: **11/11 PASS**
- mobile learning: **11/11 PASS**

Artifact: `9525396009`

SHA-256: `b0d1b9773b198c89c579c0ea277afd6258c43321fcdfb1959a4a6c632c6b5dcb`

### Full historical regression stack

Workflow: `P12 Certification`

Run: `#115` / `32741698451`

- repository P12/v1.0.1/v1.1.0/v1.2.0: **PASS**
- P12 desktop/mobile: **PASS**
- v1.0.1 exhaustive desktop/mobile: **PASS including 13/13 demos**
- v1.1.0 desktop/mobile: **8/8 PASS**
- v1.2.0 desktop/mobile: **8/8 PASS**

Artifact: `9525413596`

SHA-256: `6e612c7964d005e41fb46f0755194914ac812431681db4d6c0adb71602d486e3`

## Promotion rule

The metadata-complete candidate head must reproduce **both workflows** before PR #11 can merge. Production release status then requires a separate custom-domain live closure.

Certified P10 runtime baseline:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
