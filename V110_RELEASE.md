# MARKDOWN//LAB v1.1.0 — Product Usability & Information Architecture Reconstruction

## Status

**RELEASED**

Gate: `V110_USABILITY_CERTIFIED`

Production: `https://thiepn.dev/markdown/`

## Product contract

v1.1.0 establishes the first-use path:

**understand the product → choose a task → find a lab → immediate workbench → visible result**

The v1.0.1 interaction contract remains mandatory:

**navigation → immediate visible workbench → one-click executable demo → visible result → persistent feedback**

## Released changes

- plain-language `MARKDOWN//LAB` landing with **Learn Markdown by doing.**
- three task-first quick starts: Start with Markdown, Guided Tour, Final Form
- search across all 13 labs
- five user-facing lab categories
- live matching-lab count and `/` search shortcut
- `#lab-XX` deep links
- product-facing Demo & Guided Route language
- Developer Verification wording for the retained P12 certification surface
- stable product-facing copy across legacy lab rerenders
- v1.1-only tick-bounded Lab 03 compatibility layer that preserves the deterministic built-in WebAssembly `17 + 25 = 42` result without modifying the released v1.0.1 controller

## Frozen runtime baseline

P10 SHA-256:

`2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a`

## Certified candidate

Run #82 / `32642548092`

Evidence artifact `9493994177`

SHA-256 `d4172c60ab960ed1086d636d8c60ef4a661a76afc637cae5d1057c9d45f7a786`

Passed P12, exhaustive v1.0.1 desktop/mobile including all 13 demos, and v1.1.0 desktop/mobile 8/8 usability certification.

## Promotion

PR #7 merged v1.1.0 to `main`.

Main commit:

`2fe4465208427d35b919a8bfeac3acab448d8d75`

Metadata-complete promotion gate run #84 / `32642628903` passed the complete stack.

Evidence artifact `9494016301`

SHA-256 `cc593472d99545cd1d61cb957f2a80d7633b616581dac1ea5005e3b05cd04473`

## Custom-domain live closure

Run #86 / `32732533624` verified the deployed custom-domain loader plus:

- `assets/v110/lab03-stability.js`
- `assets/v110/usability.js`
- `assets/v110/certify.js`

and reproduced all P12, v1.0.1, and v1.1.0 desktop/mobile browser gates.

Evidence artifact `9521952255`

SHA-256 `1099754e8f120c436a55b2641a6e4eed985fe478cbf7215fea11941b469bda76`

The immutable guarded marker is `release/V110_RELEASED.txt`.

## Finalization rule

PR #8 may merge only after the metadata-complete live-closure head reproduces the same complete certification stack. After that merge, v1.1.0 is the canonical released MARKDOWN//LAB version on `main` and the custom-domain deployment.
