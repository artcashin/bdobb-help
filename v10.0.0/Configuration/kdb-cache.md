---
type: Note
tags: [bdobb, help, configuration, kdb, cache, infrastructure]
---

# kdb+ Cache (Optional)

> **Status: optional, already shipped in openbb-docker v10.0.0.** Unlike [[arcticdb-explorer|ArcticDB Explorer]], this isn't unreleased — the backend infrastructure exists today, and it's what the shipped [[real-time-chart|real-time chart]] reads its seeded history from. What's missing is the detailed operator write-up (the "for the tinkerers" recipe): the episode covering it hasn't been drafted from the finished build yet, so exact deployment steps aren't documented here.

kdb+ is the in-memory database the tick-data world treats as standard equipment — the engine fast-moving trading desks use to keep the market in memory rather than re-querying it. openbb-docker ships an optional layer built on it, sitting between [[live-quotes|live quotes]] and its upstream provider.

## What it consists of

- **kdb-x** — the kdb+ engine itself, run on a personal license (free for individual use).
- **`openbb-kdb`** — a read-through cache: queries check the cache first and only reach upstream on a miss.
- **`kdb-store`** — where the cached data actually lives.
- **The live-grid tick recorder** — part of the [[live-quotes|live quotes]] service, which writes incoming ticks into the store when this layer is deployed.

## Why you'd deploy it

Without it, [[live-quotes|live quotes]] and the [[eodhd-data-provider|EODHD provider]] work exactly as described on their own pages — nothing about day-to-day usage requires this layer. Deploying it buys two things: repeat queries get answered from memory instead of round-tripping to the vendor, and it becomes the history source the [[real-time-chart|real-time chart]] widget reads from when a symbol's chart first opens.

## Licensing note

kdb-x's personal license is bring-your-own: the license file mounts into the container at deploy time and is never bundled in the image or the repo. Treat it the same way you'd treat any other credential in this stack — config, never code.

## What isn't documented yet

Cache key/TTL/invalidation semantics, the exact compose wiring, and the `KX_PORT` binding behavior aren't written up here — they belong to the episode covering this build, which is still pending. If you're deploying this ahead of that write-up, treat the sidecar/loopback-binding lessons in [[tailscale-networking|Tailscale Networking]] as the relevant precedent: verify any binding claim by trying it, don't trust it by default.

---
*Source: "Plan: Episodes 10–12 — the chart, the vault, the wire to the Street" (design doc, approved 2026-08-06) — openbb-docker v10.0.0 is described there as already tagged and unchanged, shipping this layer as the foundation the [[real-time-chart|real-time chart]] reads.*
*See also: [[live-quotes|Live Quotes (Live Grid)]] · [[eodhd-data-provider|EODHD Data Provider]] · [[real-time-chart|Real-Time Chart]]*
