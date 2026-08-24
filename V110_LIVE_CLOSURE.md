# MARKDOWN//LAB v1.1.0 — Live Release Closure

## Status

**Guarded release closure candidate**

Release gate: `V110_USABILITY_CERTIFIED`

Production URL: `https://thiepn.dev/markdown/`

## Promotion already completed

PR #7 promoted v1.1.0 to `main` at:

`2fe4465208427d35b919a8bfeac3acab448d8d75`

Metadata-complete merge gate run #84 / `32642628903` passed every repository and browser gate before promotion.

## Live closure contract

This closure may merge only when the same CI run proves all of the following:

1. the public custom-domain loader references `assets/v110/lab03-stability.js`;
2. the public custom-domain loader references `assets/v110/usability.js`;
3. the public custom-domain loader references `assets/v110/certify.js`;
4. all three deployed assets are retrievable and contain their required release markers;
5. P12 repository certification passes;
6. v1.0.1 repository certification passes;
7. v1.1.0 repository + live certification passes;
8. P12 desktop and mobile browser certification passes;
9. v1.0.1 exhaustive desktop and mobile certification passes, including all 13 executable demos;
10. v1.1.0 desktop and mobile usability certification passes 8/8.

`release/V110_RELEASED.txt` is intentionally guarded by this contract and is not sufficient by itself to establish a valid production release.
