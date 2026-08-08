---
type: Note
tags: [bdobb, help, widgets, real-time-chart, live-grid, chart]
---

# Real-Time Chart

The [[live-quotes|live quotes]] widget shows current values as a table. The real-time chart plots that same stream instead of just tabulating it — drawn in BDOBB itself, not as a server-rendered image.

## Adding it to a dashboard

1. Connect the same live-data service you use for [[live-quotes|live quotes]] (see [[connecting-a-backend|Connecting a Backend]]).
2. Add the real-time chart widget to a dashboard from the widget library.
3. Type one or more symbols into the widget's symbol field, same classification rules as [[live-quotes|live quotes]] (a dash means crypto, six letters splitting into two currency codes means forex, everything else is a US equity).

## How it draws

- **Seeded history, then live extension.** Opening the chart isn't a blank slate: it first seeds a symbol's history from the live-data service's `/series` endpoint — deeper if the optional [[kdb-cache|kdb+ cache]] is deployed upstream, thinner if not, but never empty-until-first-tick. Once seeded, the chart switches to the same live-data websocket that drives the [[live-quotes|live quotes]] grid and appends new bars as ticks arrive.
- **Client-side bucketing.** BDOBB buckets incoming ticks into its own OHLCV bars rather than displaying anything the backend renders — the backend only ever sends raw ticks and seed history.
- **Bucket interval.** Bars default to 1-minute buckets; the interval is selectable from the widget's controls.
- **Chart type.** Line, area, or candle, selectable from the widget's controls. Candle rendering needs OHLC data, which the client only has once enough ticks have accumulated in the open bucket — until then a bar shows what it has.
- **Volume sub-panel.** A synced volume panel appears beneath the price chart, but only for symbols where volume is actually meaningful — forex quotes (bid/ask midpoints, no trade volume) never show one, matching the same bid/ask caveat as [[live-quotes|live quotes]].
- **Multiple symbols.** Chart more than one symbol on a widget and you get a layout choice: overlay (all symbols sharing one price axis) or small multiples (one mini-chart per symbol). A single symbol just gets one chart.

## Changing symbols

Editing the symbol list re-seeds history for the new set from `/series` rather than continuing to draw whatever was already on screen. Live updates then resume appending as usual.

## If the chart looks static

Same failure mode as [[live-quotes|live quotes]]: an unrecognized symbol doesn't error, it simply never ticks. Check for typos first, then see [[troubleshooting-infrastructure|Configuring the Infrastructure]] if the underlying feed itself may be down.

---
*Source: Adventures in OpenBB, Ep. 10.*
*See also: [[live-quotes|Live Quotes (Live Grid)]] · [[kdb-cache|kdb+ Cache (Optional)]] · [[arcticdb-explorer|ArcticDB Explorer (Planned)]]*
