# MARKDOWN//LAB — P12 Production Release & Regression Certification

**Candidate:** `1.0.0-rc.1`  
**Gate:** `P12_RELEASE_CERTIFIED`  
**Lineage:** verified P10 runtime → P11 Showcase Content Expansion → P12 certification layer

## Purpose

P12 does not add another laboratory family. It hardens the existing application and makes release readiness executable and falsifiable.

## Certification architecture

P12 has two independent gates:

1. **Repository certification** — `scripts/p12-certify.mjs`
   - reconstructs P7 through P10 from the checked-in payload chain;
   - verifies the exact P8, P9 and P10 byte sizes and SHA-256 hashes;
   - parses P11 and P12 JavaScript;
   - validates all 13 P11 scenarios, four compositions and six chaos mutation/recovery definitions;
   - checks the six P11 recovery targets against the reconstructed P10 DOM source;
   - verifies all 13 lab navigation targets;
   - verifies loader ordering and release manifest invariants.

2. **Browser certification** — `assets/p12/certify.js`
   - runs in the real application;
   - verifies required browser primitives, localStorage, a disposable Worker and WebCrypto;
   - routes through all 13 labs;
   - launches all 13 showcase scenarios;
   - opens all four cross-lab compositions;
   - executes all six P11 controlled mutation/recovery cycles;
   - executes Final Form and requires a successful result;
   - audits interactive controls for accessible names;
   - rejects horizontal viewport overflow.

The GitHub Actions workflow executes the browser suite at both desktop and mobile viewport sizes and requires the DOM marker `P12_RELEASE_CERTIFIED` in both runs.

## Release invariants

- No P1–P10 feature is gated by progression.
- The exact P10 reconstructed runtime checksum remains mandatory.
- P11 loads only after P10 passes its integrity check.
- P12 loads only after P11 is injected.
- P12 certification uses isolated test storage except where it intentionally exercises P11's own showcase progress/recovery system.
- Browser tests use disposable Workers and bounded waits.
- A failed browser check emits `FAILED`, never a false release token.

## Canonical P11 inventory under test

| Surface | Required |
| --- | ---: |
| Labs | 13 |
| Curated scenarios | 13 |
| Cross-lab compositions | 4 |
| Chaos mutations | 6 |
| Final Form pipeline | 1 |

## Promotion rule

The release candidate may be promoted only if all of the following are true:

- repository certification exits successfully;
- desktop headless-Chromium certification reports zero failures;
- mobile-width headless-Chromium certification reports zero failures;
- both browser runs expose `data-status="pass"` and `P12_RELEASE_CERTIFIED`;
- no P0/P1 defect is discovered during review.

## Branch-lineage warning

The current repository `main` line is not the same executable lineage as P10/P11/P12. The production candidate therefore lives on `p12-release-certification`, based directly on the verified P11 branch. Do **not** merge this branch blindly into the current `main`; first choose which lineage is canonical for the repository.

## After P12

If the gate passes, the next step is **v1.0.0 release promotion**: freeze the accepted commit, promote the canonical branch, deploy that exact commit to GitHub Pages, tag `v1.0.0`, and update the public README/changelog without changing application behavior.
