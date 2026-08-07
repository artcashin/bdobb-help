---
type: Note
tags: [bdobb, help, troubleshooting, using-bdobb]
---

# Troubleshooting: Using BDOBB

Symptom-first index of issues you hit while using the BDOBB app itself — installing, building, settings, and day-to-day widget behavior. Where a symptom's real cause and fix live in a backend service rather than in BDOBB, this page points to [[troubleshooting-infrastructure|Configuring the Infrastructure]] instead of duplicating the fix.

## iPad App

**"Timed out waiting for all destinations."**
Developer Mode is off, and its toggle doesn't exist in Settings until a Mac has attempted a developer connection at least once. Attempt a build to make the toggle appear, enable it, let the device reboot, try again. See [[installing-on-ipad|Installing BDOBB on iPad]].

**"Your team has no devices from which to generate a provisioning profile."**
Sequencing, not a broken account — device registration happens automatically once Developer Mode is on. Fix that first.

**App installs but won't launch — taps just dim the icon.**
The device doesn't yet trust you as a developer. Settings → General → VPN & Device Management → your Apple ID → Trust.

**Build command hangs with no output.**
You didn't pass a device name (or passed it after another flag that swallowed it as an argument). Always pass the device name explicitly and first.

**The app worked all week, then died the moment you left the house.**
You installed the *development* build, which streams its interface live from your Mac. Build and install the release `.ipa` instead — see [[installing-on-ipad|Installing BDOBB on iPad]] for how to verify which build you're holding.

**The app ignores config changes no matter how many times you rebuild.**
Settings saved on the device outrank build-time config, and survive reinstalls. Change the value in the app's own settings, or clear the app's data before reinstalling. See [[app-data-and-settings|App Data and Settings]].

**The app simply stops launching about a week in.**
Free-tier signing profiles expire after 7 days — this is expected, not a bug. Rebuild from your Mac, or move to a paid developer account for a 1-year signing period.

**`xcodebuild` claims Xcode isn't installed when it plainly is.**
"Installed" and "selected" are different states that report identically. Run: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`.

See [[installing-on-ipad|Installing BDOBB on iPad]] and [[ipad-interface-differences|iPad Interface Differences]] for full context.

## Settings and App Data

**I renamed/reinstalled the app and my dashboards are gone.**
See [[app-data-and-settings|App Data and Settings]] — most likely your data is sitting under an old bundle identifier's folder, not actually deleted.

## AI Chat

**Chat pane errors on every single message the moment you connect a tool server.**
This isn't something you fix inside BDOBB — it's almost always the MCP tool server overwhelming the agent's context window. See [[troubleshooting-infrastructure|Configuring the Infrastructure]] for the fix.

See [[ai-chat|AI Chat]] for full context.

---
*Sources: Adventures in OpenBB, Episodes 6–7 "Gotchas" sections.*
