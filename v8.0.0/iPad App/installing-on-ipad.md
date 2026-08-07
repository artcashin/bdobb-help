---
type: Note
tags: [bdobb, help, ipad, install, xcode, build]
---

# Installing BDOBB on iPad

BDOBB can run on iPad as a native app. This page covers building and installing it — including three gates Apple puts in your way, each of which reports a misleading error when you haven't cleared it yet.

## Dev build vs. release build — know which you're holding

The tooling produces two kinds of build that look identical on the home screen but are not:

- **Development build.** For rapid iteration. The app on the iPad loads its entire interface live *from your Mac* over the network. Stop the dev command on the Mac, or take the iPad out of your house, and the app dies — nothing is broken, it's just no longer connected to its puppeteer.
- **Release build.** Everything packed inside the app itself, no dependency on your Mac being on the network.

**To verify which one you have:** unzip the built `.ipa` and search the binary for two things — you want exactly **one** embedded `<!doctype html>` (present) and **zero** occurrences of your Mac's network address (absent).

```bash
unzip -o BDOBB.ipa -d ipa-check
strings ipa-check/Payload/*.app/<binary> | grep -c '<!doctype html>'   # expect 1
strings ipa-check/Payload/*.app/<binary> | grep '<your-mac-ip>'         # expect nothing
```

## Free tier vs. paid developer account

For running your own app on your own device, a **free Apple ID** works — no $99/year subscription required:

| | Free Apple ID | Developer Program ($99/yr) |
|---|---|---|
| Install on your own devices | yes | yes |
| App keeps working for | 7 days, then rebuild | 1 year |
| Apps per device | 3 | unlimited |
| Distribute to others | no | yes |

The catch: on the free tier, the app stops launching every 7 days until you rebuild from your Mac. That's a real, weekly ritual — decide up front whether that's tolerable for your use case.

## One-time setup

1. Sign into Xcode with your Apple ID — the one step that needs your password interactively.
2. Open the generated project once so Apple issues you a personal signing certificate.
3. Put your resulting team ID into the project's **private, uncommitted** config file. Keep the entire generated Apple project out of version control — the tooling writes your team ID into files you might otherwise publish.

## Build and install

1. `pnpm ios:check` — preflight that names each missing piece and its fix. Needs full Xcode, not just command-line tools; "installed but not selected" reports identically to "not installed" (see Troubleshooting below).
2. `pnpm ios:init` — generates the Apple project (gitignored; regenerate after any fresh clone).
3. `pnpm ios:team` — reads your team ID; put it in your local env file as `APPLE_DEVELOPMENT_TEAM=…`, never in a committed file.
4. Plug in the iPad. Enable **Developer Mode** when the toggle appears (see Gate 1 below) — this reboots the device.
5. Iterate with `pnpm ios:dev "<device name>"` — always pass the device name explicitly, and pass it before other flags.
6. Ship the real build: `pnpm ios:build`, then:
   ```bash
   xcrun devicectl device install app --device <udid> …/BDOBB.ipa
   ```
   (get `<udid>` from `xcrun devicectl list devices`)
7. Verify it's the release build using the check above.

## The three gates

Apple built all three of these for good reasons — but none of them tells you, when closed, what's actually blocking you.

**Gate 1 — Developer Mode.** The toggle for this doesn't even exist in Settings until a Mac has first attempted a developer connection. Until then, a build attempt fails with:

> "Timed out waiting for all destinations."

This is not a timeout in the normal sense — it means Developer Mode is off, and the toggle isn't visible yet. Attempt a build to make the toggle appear (Settings → Privacy & Security → Developer Mode), enable it, and let the iPad reboot.

**Gate 2 — Device registration.** Apple won't authorize your app for a device it hasn't met yet. This happens automatically once Gate 1 is open — but attempt a build one step early and you'll see:

> "Your team has no devices from which to generate a provisioning profile."

This reads like a broken account. It isn't — it's sequencing. Fix Gate 1 and this resolves itself.

**Gate 3 — Trust.** Both gates open, the app *installs* — and then refuses to launch, dimming on tap. The fix is one visit: **Settings → General → VPN & Device Management → your Apple ID → Trust.**

## After installing

See [[ipad-interface-differences|iPad Interface Differences]] for how the interface adapts to touch, and [[app-data-and-settings|App Data and Settings]] for why settings saved on the device outrank your build config.

## Troubleshooting

Every error above, plus build-hang and Xcode-selection issues, are indexed by symptom in [[troubleshooting-using-bdobb|Using BDOBB]].

---
*Source: Adventures in OpenBB, Ep. 7 — "The iPadOS Adventure."*
