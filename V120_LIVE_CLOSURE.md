# MARKDOWN//LAB v1.2.0 — Live Release Closure

## Status

**Guarded live closure passed**

Release gate: `V120_WORKBENCH_CERTIFIED`

Production URL: `https://thiepn.dev/markdown/`

## Promotion already completed

PR #9 promoted v1.2.0 to `main` at:

`96b8e747ee9a42c4b9d037b5381ff1e038430a5f`

Metadata-complete merge gate run #95 / `32734523079` passed every repository and browser gate before promotion.

## Live closure contract

This closure may merge only when the same CI run proves all of the following:

1. the public custom-domain loader references `assets/v120/workbench.js`;
2. the public custom-domain loader references `assets/v120/certify.js`;
3. the deployed workbench asset is retrievable and contains the v1.2 frame/context markers;
4. the deployed browser gate is retrievable and exposes `V120_WORKBENCH_CERTIFIED`;
5. P12 repository certification passes;
6. v1.0.1 repository certification passes;
7. v1.1.0 repository/live certification passes;
8. v1.2.0 repository/live certification passes;
9. P12 desktop and mobile browser certification passes;
10. v1.0.1 exhaustive desktop and mobile certification passes, including all 13 executable demos;
11. v1.1.0 desktop and mobile usability certification passes 8/8;
12. v1.2.0 desktop and mobile workbench certification passes 8/8.

## Guarded live evidence

Workflow: `P12 Certification`

Run: `#97` / `32734821921`

Head: `c530c99d8edf41d691c7c415717de8e3214b09c1`

Results:

- public v1.2 loader: **PASS**
- public `assets/v120/workbench.js`: **PASS**
- public `assets/v120/certify.js`: **PASS**
- P12 repository + desktop/mobile: **PASS**
- v1.0.1 repository + exhaustive desktop/mobile: **PASS, including 13/13 demos**
- v1.1.0 repository/live + desktop/mobile: **8/8 PASS**
- v1.2.0 repository/live + desktop/mobile: **8/8 PASS**

Evidence artifact: `9522791929`

Evidence SHA-256: `4c9d1eecbc9fd366115731072ef28b17eaf615d044ac873075b5019d97f82a38`

`release/V120_RELEASED.txt` remains valid only while the guarded live verifier and the complete regression stack continue to pass.

## Final merge rule

The metadata-complete closure head must reproduce the complete live + browser stack once more before PR #10 merges into `main`.
