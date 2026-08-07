---
type: Note
tags: [bdobb, help, troubleshooting, using-bdobb]
---

# Troubleshooting: Using BDOBB

Symptom-first index of issues you hit while using the BDOBB app itself — installing, building, settings, and day-to-day widget behavior. Where a symptom's real cause and fix live in a backend service rather than in BDOBB, this page points to [[troubleshooting-infrastructure|Configuring the Infrastructure]] instead of duplicating the fix.

## Settings and App Data

**I renamed/reinstalled the app and my dashboards are gone.**
See [[app-data-and-settings|App Data and Settings]] — most likely your data is sitting under an old bundle identifier's folder, not actually deleted.

## AI Chat

**Chat pane errors on every single message the moment you connect a tool server.**
This isn't something you fix inside BDOBB — it's almost always the MCP tool server overwhelming the agent's context window. See [[troubleshooting-infrastructure|Configuring the Infrastructure]] for the fix.

See [[ai-chat|AI Chat]] for full context.

---
*Sources: Adventures in OpenBB, Episode 6 "Gotchas" section.*
