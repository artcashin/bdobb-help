# bdobb-help

Source content for BDOBB's in-app Help window, staged and reviewed as a
[Tolaria](https://github.com/refactoringhq/tolaria) vault.

Each top-level folder (`v3.0.0/`, `v4.0.0/`, ...) is a complete,
self-contained snapshot of the help content as it stood at that BDOBB
release — wikilinks and images only ever resolve within their own folder.
BDOBB's build fetches the folder matching its own version at build time; see
`bdobb`'s `scripts/fetch-help-content.mjs`.

Run `node scripts/verify-snapshot.mjs <folder>` after editing any version
folder to catch broken wikilinks or missing image references before they
ship.
