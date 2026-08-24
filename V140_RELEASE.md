# MARKDOWN//LAB v1.4.0 — Learning Progress, Mastery & Review Reconstruction

## Status

**Release candidate under certification**

Gate: `V140_MASTERY_CERTIFIED`

## Why this release exists

v1.3.0 gives every laboratory real Beginner, Intermediate, and Advanced practice. The remaining learning problem is continuity: users can complete exercises, but there is no product-level answer to four practical questions:

1. How much of each lab have I actually completed?
2. Which labs are weak or unfinished?
3. What should I review next?
4. How can I keep my progress portable without an account?

v1.4.0 adds a local mastery and review layer without introducing locks, accounts, streak pressure, or fake points.

## Mastery model

Mastery is derived only from completed v1.3 exercises:

- Beginner = 20 points
- Intermediate = 35 points
- Advanced = 45 points
- all three complete = 100% mastery for that lab

Practice failures never remove completed mastery. They are tracked separately as a recent-check confidence signal.

## Progress dashboard

A compact **Progress & Review** surface now lives inside laboratory discovery and shows:

- overall weighted mastery;
- exercises completed out of 39;
- labs mastered out of 13;
- current review/continuation queue size.

Expanding the surface reveals all 13 labs with mastery, exercise depth, status, recent check confidence, and next review state.

## Weak-skill resurfacing

Started but incomplete labs are immediately eligible for continued practice.

The queue prioritizes:

1. labs with more recorded failed checks;
2. incomplete labs before already-mastered refreshes;
3. lower mastery before higher mastery.

This is deliberately separate from the v1.3 recommended learning path: the path suggests curriculum order, while v1.4 suggests what the individual user should revisit.

## Review cadence

Mastered labs enter a local review schedule:

- first refresh after 7 days;
- next refresh after 14 days;
- later refreshes after 30 days.

A review opens the real lab, selects the appropriate v1.3 exercise, and exposes **Verify review**. Verification delegates to the existing v1.3 `Check my work` grader; v1.4 does not invent a parallel answer checker.

## Practice outcome telemetry

From v1.4 onward, real v1.3 checks are counted per lab as pass/fail outcomes. The dashboard exposes the resulting pass percentage as a separate confidence signal.

This telemetry is local only and does not reduce earned completion.

## Data ownership

- v1.4 review data is stored under `markdown-lab:v140-mastery`;
- v1.3 exercise completion remains under `markdown-lab:v130-learning`;
- **Export progress** produces one JSON snapshot containing both layers and the current summary;
- **Reset review history** clears review dates and v1.4 check telemetry but intentionally preserves all completed v1.3 exercises.

## Freedom preserved

- every lab remains unlocked;
- free play remains available;
- demos and guided routes remain available;
- v1.3 practice remains optional;
- review recommendations never gate navigation;
- no streaks, penalties, or artificial daily quotas are introduced.

## Certification

`V140_MASTERY_CERTIFIED` verifies 14 requirements on desktop and mobile:

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

## Regression requirements

Promotion is invalid unless all prior release gates remain green:

- P12 repository + desktop/mobile;
- v1.0.1 exhaustive desktop/mobile including 13/13 executable demos;
- v1.1.0 usability desktop/mobile;
- v1.2.0 workbench desktop/mobile;
- v1.3.0 learning desktop/mobile 11/11;
- v1.4.0 mastery desktop/mobile 14/14.

Certified P10 runtime baseline remains:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
