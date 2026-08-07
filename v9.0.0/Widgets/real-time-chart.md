---
type: Note
tags: [bdobb, help, widgets, planned, chart]
---

# Real-Time Chart (Planned)

> **Status: planned, not yet released.** This page describes the approved design for a future BDOBB feature. Nothing below is available in a shipped version yet — check back after the corresponding release ships, or see [[about-this-guide|About This Guide]] for how planned pages are tracked.

The [[live-quotes|live quotes]] widget shows current values as a table. The planned real-time chart widget plots that same stream instead of just tabulating it.

## Planned functionality

- **Client-side rendering.** The chart is drawn in BDOBB itself, buffering the incoming stream and bucketing its own candles, rather than displaying a server-rendered image.
- **History seeded from the kdb+ cache.** Opening the chart doesn't start empty — it seeds its initial history from the optional [[kdb-cache|kdb+ cache]] of past ticks, so the chart has depth from the moment it opens.
- **Live extension.** After the seeded history loads, the same live-data websocket that drives the [[live-quotes|live quotes]] grid extends the chart forward in real time.
- **Chart types.** Line, area, and candle rendering, bucketed client-side, with a synced volume sub-panel below the price chart.
- **Symbol changes re-seed.** Switching the charted symbol re-seeds history from the cache rather than starting from a blank chart; live updates then append as usual.

## Why it's built this way

The design deliberately separates "cached history" from "live extension" so the chart is a front-end feature layered on top of backend services that already exist and already ship — the historical cache and the live feed are not new infrastructure, only a new way of drawing what's already there.

---
*Source: "Plan: Episodes 10–12 — the chart, the vault, the wire to the Street" (design doc, approved 2026-08-06; implementation not started as of this writing).*
*See also: [[live-quotes|Live Quotes (Live Grid)]] · [[kdb-cache|kdb+ Cache (Optional)]] · [[arcticdb-explorer|ArcticDB Explorer (Planned)]]*
