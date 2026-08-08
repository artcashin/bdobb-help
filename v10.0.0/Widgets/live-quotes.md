---
type: Note
tags: [bdobb, help, widgets, live-quotes, live-grid, eodhd]
---

# Live Quotes (Live Grid)

The live quotes widget is a real-time watchlist: a table of symbols whose prices, volume, and change figures update live as ticks arrive, instead of only refreshing when you ask. It's powered by OpenBB Workspace's **live grid** widget type against a live-data service backed by the [[eodhd-data-provider|EODHD data provider]].

## Adding it to a dashboard

1. Connect the live-data service as a backend (see [[connecting-a-backend|Connecting a Backend]]) — see [[eodhd-data-provider|EODHD Data Provider]] for how that service is set up.
2. Add the live grid widget to a dashboard from the widget library.
3. Type symbols into the widget's symbol field. A sensible starting watchlist mixes asset classes: `AAPL,MSFT,TSLA,BTC-USD,ETH-USD,EURUSD`.

The widget shows an initial snapshot for each symbol immediately, then starts ticking live as prices move.

## How symbols are classified

Typed symbols are automatically routed to the right market:

- A symbol containing a dash (`BTC-USD`) is treated as **crypto**.
- Six letters that split into two real currency codes (`EURUSD`) is treated as **forex**.
- Everything else is treated as a **US equity**.

## Reading the grid

- **Price, volume, change, and percent change** update live. Change and percent change are computed against the previous close captured when the symbol was added.
- **Forex rows** show a computed **midpoint** rather than a trade price, because currency feeds only carry bid/ask, not trades — the bid and ask columns are genuinely populated only for forex symbols. This is expected behavior, not a bug.
- Columns that can't change intraday (like the day's volume snapshot) don't flicker on every tick.
- Updates are throttled to a few times per second per row — you'll see the latest state smoothly, not every individual tick, which keeps the browser responsive on busy symbols.

## Optional: caching ticks in kdb+

The live-data service can optionally record incoming ticks into an in-memory [[kdb-cache|kdb+ cache]] rather than only holding them in its own process memory. This is separate, opt-in infrastructure — the grid above behaves identically with or without it — but it's what the [[real-time-chart|real-time chart]] reads its seeded history from.

## Editing the watchlist

Adding or removing symbols rebuilds the underlying data connection for that asset class, with a short debounce so typing several symbols quickly doesn't churn the connection repeatedly. There's a per-connection symbol ceiling (50 symbols) — if you're tracking more than that, split across multiple widgets.

## If a row never updates

If a symbol sits showing only its initial snapshot values and never ticks, double-check the symbol for typos. An unrecognized symbol doesn't error — it simply never receives ticks, which looks identical to a very quiet stock at a glance. See [[troubleshooting-using-bdobb|Using BDOBB]] for the typo check, or [[troubleshooting-infrastructure|Configuring the Infrastructure]] if the feed itself may be down.

---
*Source: Adventures in OpenBB, Ep. 9 — "The Tape Comes to the Closet."*
*See also: [[eodhd-data-provider|EODHD Data Provider]] · [[real-time-chart|Real-Time Chart]] · [[troubleshooting-using-bdobb|Using BDOBB]] · [[troubleshooting-infrastructure|Configuring the Infrastructure]]*
