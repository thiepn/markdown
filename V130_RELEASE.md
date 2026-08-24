# MARKDOWN//LAB v1.3.0 — Guided Learning & Practice Reconstruction

## Status

**Release candidate under certification**

Gate: `V130_LEARNING_CERTIFIED`

## Why this release exists

v1.2.0 made the workbench readable and coherent. The remaining weakness is instructional: the labs are powerful free-play tools, but a new user still has to invent their own objective after opening one.

v1.3.0 adds an optional learning layer without turning MARKDOWN//LAB into a locked course or a fake quiz app.

## Learning contract

The learning loop is:

**goal → try in the real workbench → check the real result → hint/reference if needed → complete → choose what to do next**

Free play remains fully available at every point.

## Implemented changes

### 39 real exercises

Every Lab 00–12 now defines three exercises:

- Beginner
- Intermediate
- Advanced

That produces 39 total exercises. Each exercise includes a concrete task, one hint, and a reference answer or reference workflow.

### Real result validation

Completion checks the actual active lab state rather than awarding credit for navigation or button clicks. Examples include:

- rendered Markdown structure in the real preview;
- JavaScript Worker output;
- Polyglot/WebAssembly output;
- math evaluation output;
- rendered Mermaid SVG;
- typed data output;
- API response state;
- native Worker results;
- terminal log output;
- accessibility audit findings;
- recorded Chaos recovery state;
- successful Final Form pipeline state.

### Practice remains optional

- the practice panel explicitly identifies itself as optional;
- all 13 labs remain unlocked;
- demos, guided routes, and free play remain unchanged;
- progress never gates navigation.

### Hints, reference, and Challenge mode

- Hint reveals one targeted nudge;
- Reference reveals a sample answer or workflow but does not change the workbench or mark completion;
- Challenge mode hides the reference and disables hints while leaving the actual lab untouched.

### Progress

- progress is stored locally under `markdown-lab:v130-learning`;
- completion is tracked separately for all three difficulty levels;
- laboratory navigation shows `0/3` through `3/3` practice progress;
- completed labs are visually distinguishable without becoming locked.

### Recommended path

A recommended learning sequence runs through Labs 01 → 12. The next-recommended action points to the first lab with unfinished exercises, while users can still open any laboratory in any order.

## Certification

`V130_LEARNING_CERTIFIED` independently verifies:

1. optional practice panel presence;
2. complete 39-exercise curriculum;
3. all three difficulty levels;
4. all 13 labs remain unlocked;
5. a real Markdown workbench success check;
6. Beginner → Intermediate → Advanced completion on a real lab;
7. local progress persistence and discovery badge state;
8. Hint and Reference behavior;
9. Challenge mode assistance suppression;
10. recommended-path navigation;
11. desktop/mobile horizontal containment.

## Regression requirements

Promotion is invalid unless all prior release gates remain green:

- P12 repository + desktop + mobile
- v1.0.1 repository + exhaustive desktop/mobile including 13/13 executable demos
- v1.1.0 repository/live + desktop/mobile usability
- v1.2.0 repository/live + desktop/mobile workbench
- v1.3.0 repository + desktop/mobile learning

Certified P10 runtime baseline:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
