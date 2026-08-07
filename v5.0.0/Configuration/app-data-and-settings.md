---
type: Note
tags: [bdobb, help, configuration, settings, app-data, migration]
---

# App Data and Settings

Where BDOBB stores your dashboards, connections, and settings, and an easy-to-miss behavior around that storage.

## If you renamed the app and "lost" your settings

A desktop app's data folder is derived from its internal bundle identifier, not its display name. If the app you're running was ever renamed at the bundle-identifier level (as happened during BDOBB's own early development, when it was still called "OpenBB Desk"), the renamed build looks for its data under a *new* folder — and finds nothing, because the old dashboards and settings are still sitting under the old identifier's folder.

Nothing is actually lost. The fix is copying the old application-support directory to the new one:

```bash
# macOS example — adjust identifiers to match your case
cp -R ~/Library/Application\ Support/<old-bundle-id> \
      ~/Library/Application\ Support/<new-bundle-id>
```

If you're not sure of the exact folder names, look under `~/Library/Application Support/` for anything matching the app's old and new bundle identifiers.

---
*Source: Adventures in OpenBB, Ep. 3 — "I Asked for Electron and Got Talked Out of It."*
*See also: [[troubleshooting-using-bdobb|Using BDOBB]]*
