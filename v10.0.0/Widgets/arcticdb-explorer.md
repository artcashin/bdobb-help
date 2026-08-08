---
type: Note
tags: [bdobb, help, widgets, planned, arcticdb, explorer]
---

# ArcticDB Data Explorer (Planned)

> **Status: planned, not yet released.** This page describes the approved design for a future BDOBB feature. Nothing below is available in a shipped version yet — see [[about-this-guide|About This Guide]] for how planned pages are tracked.

Historical tick data loaded into an ArcticDB store (for example via a bulk tick-data import) has no way to be browsed today. The planned explorer widget is a discovery tool for what's actually sitting in the store.

## Planned functionality

A drill-down flow: **library picker → symbol list → available date range and datapoint count → the stored series plotted.** The point of the widget is discovery — answering "what do I actually have in here?" — which a standard data-provider query path can't answer, since it assumes you already know the symbol and range you want.

## Two front doors, one vault

The plan calls for two independent ways into the same store, both built on the same read-only discovery code:

- **The explorer widget** — for browsing visually inside BDOBB/Workspace, answering over the same widgets.json backend pattern used elsewhere in this series.
- **An MCP tool server (stores-mcp)** — so the [[ai-chat|AI chat agent]] can query the same ArcticDB store conversationally ("what symbols do we have for last March?") without a person driving the widget.

One door for your eyes, one for the analyst, both reading the same vault.

---
*Source: "Plan: Episodes 10–12 — the chart, the vault, the wire to the Street" (design doc, approved 2026-08-06; implementation not started as of this writing).*
*See also: [[ai-chat|AI Chat]] · [[real-time-chart|Real-Time Chart]]*
