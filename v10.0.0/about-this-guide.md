---
type: Note
tags: [bdobb, help, about, sources]
---

# About This Guide

This help system documents BDOBB (Better Desktop for OpenBB) by topic and task, not by publication order — but everything in it is drawn from the *Adventures in OpenBB* article series, and each article cites the episode(s) it came from. This page is the provenance index, for anyone who wants the original narrative.

| Episode | Covers | Feeds into |
|---|---|---|
| Ep. 3 — "I Asked for Electron and Got Talked Out of It" | The design decisions behind BDOBB's layout: the hover rail, the AI pane's fold/unread behavior, per-service degraded states, the app-rename data migration. | [[layout-and-navigation\|Layout and Navigation]], [[app-data-and-settings\|App Data and Settings]] |
| Ep. 5 — "Kick the Tires in Ten Minutes" | Getting a working BDOBB running against OpenBB's reference backend: connecting a backend, importing dashboards, parameter grouping, the widget library, the raw-view fallback. | [[installing-and-running\|Installing and Running BDOBB]], [[connecting-a-backend\|Connecting a Backend]], [[importing-dashboards\|Importing Dashboards]], [[dashboards-and-widgets\|Dashboards and Widgets]] |
| Ep. 6 — "The Analyst Who Never Leaves the Building" | Standing up Agent Rita as a fully private AI analyst: local model serving, MCP tool discovery mode, the app-can't-touch-infrastructure permission model. | [[ai-chat\|AI Chat]], [[rita-ai-agent-setup\|Setting Up the Rita AI Agent]] |
| Ep. 7 — "The iPadOS Adventure" | Building and installing BDOBB on iPad: dev vs. release builds, the three signing/trust gates, touch vs. hover, settings precedence. | [[installing-on-ipad\|Installing BDOBB on iPad]], [[ipad-interface-differences\|iPad Interface Differences]] |
| Ep. 8 — "All the News That Fits, We Print" | The rss-ticker news wire: the News window/rail widgets, feed configuration, the three-secrets access model, Tailscale identity mode. | [[news-ticker\|News Ticker]], [[rss-feed-sources\|RSS Feed Sources]], [[secrets-and-access\|Secrets and Access]] |
| Ep. 9 — "The Tape Comes to the Closet" | The EODHD provider extension and the live-quotes/live-grid widget: symbol classification, forex quirks, update throttling. | [[live-quotes\|Live Quotes (Live Grid)]], [[eodhd-data-provider\|EODHD Data Provider]] |
| Ep. 10 (article forthcoming) | The real-time chart widget: client-side bucketed candles seeded from the [[kdb-cache\|kdb+ cache]] and extended live over the same socket as [[live-quotes\|live quotes]]. | [[real-time-chart\|Real-Time Chart]], [[kdb-cache\|kdb+ Cache (Optional)]] |
| Ep. 11 plan — "the chart, the vault, the wire to the Street" (design doc, approved 2026-08-06; Ep. 11 not yet implemented) | Planned: an ArcticDB data explorer. | [[arcticdb-explorer\|ArcticDB Explorer (Planned)]] |

Episode 4 ("Same Blueprint, Two Builders") is a development-process retrospective — how BDOBB was built, comparing a frontier-model workflow against a local model — rather than a description of user-facing functionality, so it isn't represented as help content here.

Original drafts live in `~/Developer/substack-articles/` on the machine this guide was generated from.

---
*Screenshots in this guide are copied from the corresponding episode's `screenshots/` folder. Where an episode's screenshots don't yet exist (Eps. 6, 7, 9, 10) or the feature hasn't shipped (Ep. 11), the relevant help pages are text-only.*
