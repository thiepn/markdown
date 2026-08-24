# MARKDOWN//LAB v1.2.0 — Live Release Closure

## Status

**Guarded release closure candidate**

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

`release/V120_RELEASED.txt` is intentionally guarded by this contract and is not sufficient by itself to establish a valid production release.
