# MARKDOWN//LAB — v1.0.0 Release Promotion

**Target:** `v1.0.0`  
**Canonical branch:** `main`  
**Promotion branch:** `p12-release-certification`  
**Certified source:** `bf596ecb3b991b94b2b338ed151e655cc73eb393`

## Promotion basis

The application candidate completed P12 Production Release & Regression Certification before promotion. The frozen P12 candidate passed deterministic repository reconstruction plus desktop and mobile-width Chromium certification with zero failed browser checks.

The Git history was re-checked during promotion. `p12-release-certification` is ahead of `main` with `main` as its merge base; the README and existing showcase assets are already identical. Promotion therefore does not require a history rewrite or documentation replacement.

## v1.0.0 release gate

The production release is complete only when all of the following are true:

- the promotion PR targets `main`;
- repository certification passes on the promotion PR;
- desktop Chromium certification passes on the promotion PR;
- mobile-width Chromium certification passes on the promotion PR;
- the accepted promotion is merged to `main`;
- the same certification workflow passes on `main` after merge;
- GitHub Pages serves the promoted application at the repository deployment path;
- the deployed application loads its P11 and P12 extension layers and completes a smoke verification;
- release metadata is changed from `V1_PROMOTION_READY` to `V1_RELEASED` without changing application behavior;
- the immutable release target is recorded as `v1.0.0`.

## Immutable runtime invariants

- P10 reconstructed byte size: `296930`
- P10 SHA-256: `2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`
- Labs: `13`
- Showcase scenarios: `13`
- Cross-lab compositions: `4`
- Chaos mutation/recovery definitions: `6`
- Browser certification checks per viewport: `12`

## Release policy after v1.0.0

The accepted v1.0.0 application behavior is frozen. Any behavior-changing work after release must be developed on a new version branch and must pass the same repository and browser gates before promotion.
