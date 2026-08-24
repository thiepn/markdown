# MARKDOWN//LAB v1.4.0 — Learning Progress, Mastery & Review Reconstruction

## Status

**Certified release candidate**

Gate: `V140_MASTERY_CERTIFIED`

## Why this release exists

v1.3.0 gives every laboratory real Beginner, Intermediate, and Advanced practice. v1.4.0 adds continuity: mastery depth, weak-skill resurfacing, review timing, and portable local progress without accounts, locks, streak pressure, or fake points.

## Mastery model

Mastery is derived only from completed v1.3 exercises:

- Beginner = 20 points
- Intermediate = 35 points
- Advanced = 45 points
- all three complete = 100% mastery for that lab

Practice failures never remove completed mastery. They remain a separate confidence signal.

## Progress & Review

The discovery surface now includes:

- overall weighted mastery;
- exercises completed out of 39;
- labs mastered out of 13;
- current review/continuation queue size;
- all 13 labs with mastery, completion depth, status, confidence, and review timing.

Started-but-incomplete labs surface immediately. The queue prioritizes failed checks, then incomplete learning, then lower mastery.

## Review cadence

Mastered labs enter a local schedule:

- first refresh after 7 days;
- next refresh after 14 days;
- later refreshes after 30 days.

Review launches the real lab and appropriate v1.3 exercise. **Verify review** delegates to the existing v1.3 `Check my work` grader.

## Certification-discovered hardening

Certification exposed and corrected three integration edges before promotion:

1. v1.4 test data must be seeded before v1.3 initializes its canonical in-memory state;
2. review navigation must wait for the intended lab's practice panel rather than any existing practice panel;
3. the review bridge must survive v1.3 practice-panel rerenders without creating a self-triggering MutationObserver loop.

The final runtime hardening restores only a missing bridge and records one practice outcome per grader execution.

## Data ownership

- v1.4 data: `markdown-lab:v140-mastery`;
- v1.3 completion: `markdown-lab:v130-learning`;
- Export progress creates one JSON snapshot containing both layers and current summary;
- Reset review history clears review dates/check telemetry while preserving completed exercises.

## Freedom preserved

Every lab, free-play surface, demo, guided route, and v1.3 practice activity remains unlocked and optional.

## Certification

`V140_MASTERY_CERTIFIED` verifies 14 requirements independently on desktop and mobile:

1. mastery dashboard;
2. all 13 lab mastery rows;
3. weighted mastery model;
4. progress summary;
5. weak-skill review queue;
6. mastered-lab review schedule;
7. review launches the real lab and appropriate v1.3 level;
8. review bar connects to the v1.3 grader;
9. per-lab practice confidence;
10. spaced review cadence;
11. progress export payload;
12. review reset preserves completed exercises;
13. laboratory mastery decoration;
14. horizontal viewport containment.

## Certified candidate evidence

Certified head: `b0c9564bcde3b1934321a7a0c574e4675717cd12`

### v1.4.0 mastery

Run #12 / `32768100532`

- repository: **PASS**
- desktop: **14/14 PASS**
- mobile: **14/14 PASS**
- artifact: `9535177374`
- SHA-256: `ca609c766d0291291e541e4d367f9efc512303e91da427a3be045e5747cd230e`

### v1.3.0 learning

Run #32 / `32768100530`

- repository: **PASS**
- desktop: **11/11 PASS**
- mobile: **11/11 PASS**
- artifact: `9535180715`
- SHA-256: `d8975b27b4f518efd942faa82555a3c8d80fff34115d786b9ac8022a27786340`

### Historical regression stack

Run #133 / `32768100544`

- P12 desktop/mobile: **PASS**
- v1.0.1 exhaustive desktop/mobile: **PASS including 13/13 demos**
- v1.1.0 desktop/mobile: **8/8 PASS**
- v1.2.0 desktop/mobile: **8/8 PASS**
- artifact: `9535191520`
- SHA-256: `232f3634928880325b491505937647fe2caccaf153fe293583bfc397d1c35444`

## Promotion rule

The metadata-complete candidate head must reproduce all three workflows before PR #13 can merge. Production release status then requires separate custom-domain live closure.

Certified P10 runtime baseline remains:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
