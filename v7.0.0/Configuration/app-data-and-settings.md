---
type: Note
tags: [bdobb, help, configuration, settings, app-data, migration]
---

# App Data and Settings

Where BDOBB stores your dashboards, connections, and settings, and two easy-to-miss behaviors around that storage.

## Settings live outside your config files

BDOBB desktop keeps its data — dashboards, backend connections, chat history — in an OS-level application-support folder derived from the app's identity, separate from any build-time config file. This matters most on iPad, but the underlying rule applies everywhere: once a setting is saved *in the app*, it persists across reinstalls and rebuilds, and it takes precedence over whatever a config file says.

If you change a backend URL in a build config and reinstall, but the app keeps using the old address, this is why — the app is honoring what you told it directly, not ignoring your config. Change the value in the app's own settings, or remove the app's data before reinstalling if you want a clean slate. See [[ipad-interface-differences|iPad Interface Differences]] for the iPad-specific version of this.

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
*Source: Adventures in OpenBB, Ep. 3 — "I Asked for Electron and Got Talked Out of It"; Ep. 7 — "The iPadOS Adventure."*
*See also: [[ipad-interface-differences|iPad Interface Differences]] · [[troubleshooting-using-bdobb|Using BDOBB]]*
