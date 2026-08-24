# MARKDOWN//LAB v1.4.0 — Learning Progress, Mastery & Review Reconstruction

## Status

**Certified release candidate**

Gate: `V140_MASTERY_CERTIFIED`

## Product contract

v1.4.0 adds continuity on top of v1.3 practice without adding locks, accounts, streak pressure, or fake points.

Mastery comes only from completed v1.3 exercises:

- Beginner = 20 points
- Intermediate = 35 points
- Advanced = 45 points
- all three = 100% lab mastery

Practice failures are a separate confidence signal and never remove earned mastery.

## Implemented

- compact **Progress & Review** dashboard in laboratory discovery;
- overall mastery, 39-exercise completion, 13-lab mastery, and queue metrics;
- all-lab status table with confidence and next-review state;
- weak-skill queue prioritizing failed checks, incomplete labs, then lower mastery;
- mastered-lab cadence of 7 days → 14 days → 30-day refreshes;
- review sessions that open the real lab and appropriate v1.3 level;
- **Verify review** delegates to the real v1.3 `Check my work` grader;
- one pass/fail telemetry record per real grader execution;
- JSON progress export;
- review-history reset that preserves v1.3 completion;
- all labs, demos, guided routes, free play, and practice remain unlocked.

## Certification-discovered hardening

Before promotion, certification exposed and corrected four integration edges:

1. deterministic v1.4 certification state is seeded before v1.3 initializes its canonical in-memory learning state;
2. review navigation waits for the intended lab's practice panel rather than any existing panel;
3. the review bridge survives v1.3 rerenders with an idempotent observer that restores only a missing bridge;
4. all v1.4 runtime hardening is inert during P12 and v1.0.1–v1.3 historical certification modes.

## `V140_MASTERY_CERTIFIED`

The gate verifies 14 requirements independently on desktop and mobile:

1. mastery dashboard;
2. all 13 lab mastery rows;
3. weighted mastery model;
4. progress summary;
5. weak-skill review queue;
6. mastered-lab review schedule;
7. review launches the real lab and correct v1.3 level;
8. persistent bridge to the v1.3 grader;
9. per-lab practice confidence;
10. spaced review cadence;
11. progress export payload;
12. review reset preserves completed exercises;
13. laboratory mastery decoration;
14. horizontal viewport containment.

## Corrected candidate evidence

Certified head: `7eeb5f08deae74f35885d71eca0f45b77c6896b6`

### v1.4.0 mastery

Run #16 / `32768431483`

- repository: **PASS**
- desktop: **14/14 PASS**
- mobile: **14/14 PASS**
- artifact `9535290059`
- SHA-256 `7d3b7799b89f8c9aaa6be3783fc92f116df67ca48276964805d8c541f1cf30dc`

### v1.3.0 learning

Run #36 / `32768431599`

- repository: **PASS**
- desktop: **11/11 PASS**
- mobile: **11/11 PASS**
- artifact `9535292822`
- SHA-256 `e8b37cd7186811fe0dc2e8efcd9125dd241ec920d4eb06a7fefed4f2c7964001`

### Historical regression stack

Run #137 / `32768431356`

- P12 desktop/mobile: **PASS**
- v1.0.1 exhaustive desktop/mobile: **PASS including 13/13 demos**
- v1.1.0 desktop/mobile: **8/8 PASS**
- v1.2.0 desktop/mobile: **8/8 PASS**
- artifact `9535304220`
- SHA-256 `4447a6e28a00b9cca096e9d03f964ebf38fc1ffbfad65ee3e961833455add5f7`

The earlier candidate evidence is superseded by this post-isolation certification set.

## Promotion rule

All three workflows must reproduce on the metadata-complete candidate head before PR #13 can merge. Production release status then requires a separate custom-domain live closure.

Certified P10 runtime baseline:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
