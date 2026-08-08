---
type: Note
tags: [bdobb, help, integrations, eodhd, provider, setup]
---

# EODHD Data Provider

[[live-quotes|Live quotes]] are powered by EODHD, a data vendor added to OpenBB as a provider extension. This page covers installing that extension on the OpenBB Platform side (the piece the live-quotes service depends on).

## Install the extension

```bash
git clone --branch v9.0.0 --depth 1 https://github.com/artcashin/openbb-docker
pip install ./openbb-docker/openbb-eodhd
python -c "import openbb; openbb.build()"
```

The extension is not published on PyPI — install from source as shown.

## Set your API key

```
EODHD_API_KEY=<your key>
```

Same bare-uppercase environment-variable convention used elsewhere in the stack. EODHD's public `demo` token works for a handful of well-known symbols (AAPL, MCD, TSLA, VTI) — enough to test the path before paying for anything. Fundamentals data generally needs a paid plan.

## Using it

Once installed, `provider="eodhd"` becomes available on the standard OpenBB commands — historical prices for equities, ETFs, crypto, and currencies down to one-minute bars, plus income statements, balance sheets, cash flow, dividends, and splits.

```python
obb.equity.price.historical("AAPL", provider="eodhd")
```

Bare symbols are qualified automatically (default exchange is US) — pass `exchange="LSE"` or a fully qualified symbol like `VOD.LSE` to target a different exchange.

## Known limits

- **Intraday history is capped.** Roughly 120 days of one-minute bars per request (more at coarser intervals). Asking for a year of minute bars returns a partial result — narrow the window instead.
- **The published SDK on PyPI is stale.** Its error handling, timeouts, and fundamentals filtering all post-date the PyPI release. This extension pins a specific known-good GitHub commit of the SDK rather than trusting the version number.

## The live quotes service

The provider extension supplies historical/fundamental data to OpenBB commands generally. The [[live-quotes|live quotes widget]] itself is a separate small service built on top of EODHD's real-time websocket feeds — see that page for how the widget behaves once data is flowing.

## Optional: the kdb+ cache

Live quotes can optionally feed an in-memory kdb+ cache instead of holding ticks only in the live-quotes service's own memory — a read-through cache that speeds up repeat queries and gives history depth to the [[real-time-chart|real-time chart]]. It's separate infrastructure you opt into; EODHD and live quotes work fine without it. See [[kdb-cache|kdb+ Cache (Optional)]].

---
*Source: Adventures in OpenBB, Ep. 9 — "The Tape Comes to the Closet."*
*See also: [[live-quotes|Live Quotes (Live Grid)]] · [[kdb-cache|kdb+ Cache (Optional)]] · [[troubleshooting-infrastructure|Configuring the Infrastructure]]*
