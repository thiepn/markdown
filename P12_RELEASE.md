# MARKDOWN//LAB — P12 Production Release & Regression Certification

**Candidate:** `1.0.0-rc.1`  
**Gate:** `P12_RELEASE_CERTIFIED`  
**Status:** **CERTIFIED RELEASE CANDIDATE**  
**Lineage:** verified P10 runtime → P11 Showcase Content Expansion → P12 certification layer

## Certification result

The first complete green certification basis is GitHub Actions **P12 Certification run #18** (`32587993097`) on head `ddbce7711ad7f248f958abcf8060e1be00954e7d`.

| Gate | Result |
| --- | :---: |
| Deterministic repository reconstruction | PASS |
| P8 checksum | PASS |
| P9 checksum | PASS |
| P10 checksum | PASS |
| P11/P12 JavaScript parse | PASS |
| Desktop Chromium browser suite | **12 / 12 PASS** |
| Mobile-width Chromium browser suite | **12 / 12 PASS** |
| Desktop release token | `P12_RELEASE_CERTIFIED` |
| Mobile release token | `P12_RELEASE_CERTIFIED` |

Certification evidence artifact: `9479552843`, SHA-256 `8edc799443efba79d28959ead90c196d6764183ae775489970a84635002f1ca4`.

This document and the release manifest are a metadata-only freeze after that successful basis run. The freeze commit must pass the same workflow again before promotion; documentation never substitutes for executable certification.

## Purpose

P12 does not add another laboratory family. It hardens the existing application and makes release readiness executable and falsifiable.

## Certification architecture

P12 has two independent gates:

1. **Repository certification** — `scripts/p12-certify.mjs`
   - reconstructs P7 through P10 from the checked-in payload chain;
   - verifies the exact P8, P9 and P10 byte sizes and SHA-256 hashes;
   - parses P11 and P12 JavaScript;
   - validates all 13 P11 scenarios, four compositions and six chaos mutation/recovery definitions;
   - checks the P11 recovery targets against the reconstructed P10 source;
   - validates the 00–12 showcase lab catalog;
   - verifies loader ordering and release manifest invariants.

2. **Browser certification** — `assets/p12/certify.js`
   - runs in the real application;
   - verifies required browser primitives, localStorage, a disposable Worker and WebCrypto;
   - routes through all 13 labs;
   - launches all 13 showcase scenarios;
   - opens all four cross-lab compositions;
   - executes all six P11 controlled mutation/recovery cycles;
   - executes Final Form and requires a successful result;
   - audits exposed interactive controls for accessible names;
   - rejects horizontal viewport overflow.

The GitHub Actions workflow executes the browser suite at both desktop and mobile viewport sizes and requires the DOM marker `P12_RELEASE_CERTIFIED` in both runs.

## Defects found and corrected during P12

P12 found real integration and certification defects instead of simply approving the candidate:

- The P11/P12 loader originally injected extension scripts at the first textual `</body>` occurrence. P10 contains `</body>` inside an export template, so the extensions were inserted into the wrong source location. The loader now injects at the final document body boundary.
- The first accessibility probe inverted its predicate; that false-failure logic was corrected.
- Hidden file inputs were initially counted as exposed unlabeled controls; the audit now excludes elements outside the exposed interaction surface.
- The API chaos assertion observed the example selector after P10 rerendered it, rather than the loaded request state; it now verifies `mock://error` in the request URL.
- The sandbox-storage chaos case uses direct Storage method observation during certification, allowing a transient namespaced corruption/write and its recovery/delete to be proved even if the key is removed before a later snapshot.
- Two brittle static assertions were replaced with source-contract checks, leaving rendered navigation to the real browser gate.

## Release invariants

- No P1–P10 feature is gated by progression.
- The exact P10 reconstructed runtime checksum remains mandatory.
- P11 loads only after P10 passes its integrity check.
- P12 loads only after P11 is injected.
- P12 certification uses isolated test storage except where it intentionally exercises P11's own showcase progress/recovery system.
- Browser tests use disposable Workers and bounded waits.
- A failed browser check emits `FAILED`, never a false release token.

## Canonical P11 inventory under test

| Surface | Required | Certified |
| --- | ---: | ---: |
| Labs | 13 | 13 |
| Curated scenarios | 13 | 13 |
| Cross-lab compositions | 4 | 4 |
| Chaos mutations | 6 | 6 |
| Final Form pipeline | 1 | 1 |

## Promotion rule

The release candidate may be promoted only if all of the following are true:

- repository certification exits successfully;
- desktop headless-Chromium certification reports zero failures;
- mobile-width headless-Chromium certification reports zero failures;
- both browser runs expose `data-status="pass"` and `P12_RELEASE_CERTIFIED`;
- the metadata freeze itself passes the same workflow;
- no P0/P1 defect is discovered during review.

## Branch-lineage warning

The current repository `main` line is not the same executable lineage as P10/P11/P12. The production candidate therefore lives on `p12-release-certification`, based directly on the verified P11 branch. Do **not** merge this branch blindly into the current `main`; first choose which lineage is canonical for the repository.

## After P12

Once the metadata-freeze gate is green, the next step is **v1.0.0 release promotion**: freeze the accepted commit, promote the canonical executable lineage, deploy that exact commit to GitHub Pages, tag `v1.0.0`, and update the public README/changelog without changing application behavior.
