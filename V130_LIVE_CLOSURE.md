# MARKDOWN//LAB v1.3.0 — Live Release Closure

## Status

**Guarded release closure candidate**

Release gate: `V130_LEARNING_CERTIFIED`

Production URL: `https://thiepn.dev/markdown/`

## Promotion already completed

PR #11 promoted v1.3.0 to `main` at:

`a87b8c5cd058e7eec1b8547dd4ea17fc388acc0f`

The metadata-complete promotion head `c912127a857dd1d6895fb19b69760c96b9c402a4` passed both required workflows before merge:

- v1.3.0 Learning Certification run #16 / `32741895812`
- P12 historical regression run #117 / `32741895880`

## Live closure contract

This closure may merge only when the released-state repository guard proves the public custom domain serves the promoted v1.3.0 build and both browser suites remain green.

Required public checks:

1. the public loader references `assets/v130/learning.js`;
2. the public loader references `assets/v130/grading-fix.js`;
3. the public loader references `assets/v130/certify.js`;
4. the deployed learning asset exposes the v1.3 practice/runtime markers;
5. the deployed grading bridge exposes its semantic-preview and deferred-navigation markers;
6. the deployed browser gate exposes `V130_LEARNING_CERTIFIED`.

Required browser checks on the same closure candidate:

7. v1.3.0 learning repository certification passes with live verification;
8. v1.3.0 desktop learning passes 11/11;
9. v1.3.0 mobile learning passes 11/11;
10. P12 repository certification passes;
11. P12 desktop/mobile passes;
12. v1.0.1 exhaustive desktop/mobile passes including all 13 executable demos;
13. v1.1.0 desktop/mobile usability passes 8/8;
14. v1.2.0 desktop/mobile workbench passes 8/8.

`release/V130_RELEASED.txt` is intentionally guarded by this contract and is not sufficient by itself to establish a valid production release.
