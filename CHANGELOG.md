# Changelog

## 1.0.0 — Production Release

MARKDOWN//LAB reaches its first production release after the P0–P12 implementation and certification sequence.

### Included

- 13 laboratory surfaces covering the complete application progression
- curated P11 showcase scenarios for every lab
- four cross-lab compositions
- controlled chaos/recovery exercises
- Final Form composition pipeline
- persistence, Worker, WebCrypto and browser capability integration
- production loader integrity checks for the reconstructed runtime
- desktop and mobile-width browser certification
- accessibility control-name and horizontal-overflow regression gates

### Release hardening

- deterministic P8, P9 and P10 runtime checksum verification
- corrected P11/P12 injection at the final document body boundary
- corrected accessibility certification logic
- corrected transient chaos-state verification
- GitHub Actions release certification with evidence artifacts

### Baseline

The v1 runtime preserves the certified P10 reconstruction SHA-256:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`

Behavior-changing work after v1.0.0 must ship under a later version and pass the release certification gates again.
