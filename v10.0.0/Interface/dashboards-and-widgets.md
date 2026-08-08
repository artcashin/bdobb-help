---
type: Note
tags: [bdobb, help, interface, dashboards, widgets, widget-library]
---

# Dashboards and Widgets

A dashboard in BDOBB is a tab of arranged widgets, each widget backed by an endpoint on one of your connected backends (see [[connecting-a-backend|Connecting a Backend]]).

## The widget library

Every widget a connected backend exposes is browsable in the widget library — searchable by name, grouped by the backend that provides it. Widget types you'll encounter:

- **Tables** — with proper column formatting and hover cards.
- **Interactive charts** — Plotly-style, zoomable and hoverable.
- **Metric tiles** — single-value cards, often used for headline numbers.
- **Markdown / PDF widgets** — static or generated documents.
- **Parameter forms** — widgets that take user input (a symbol, a date range) before rendering.
- **Website-card widgets** — an embedded page served by the backend; see [[layout-and-navigation|Layout and Navigation]].
- Feature-specific widget types: [[news-ticker|News Ticker]] (window/rail), [[live-quotes|Live Quotes]] (live grid), [[ai-chat|AI Chat]] (chat pane).

If a widget type has no dedicated BDOBB renderer, it falls back to a formatted raw view rather than failing silently — see [[importing-dashboards|Importing Dashboards]].

## Building a dashboard by hand

Rather than importing a full `apps.json` (see [[importing-dashboards|Importing Dashboards]]), you can build a dashboard one widget at a time: create a new dashboard tab, open the widget library, and drag or add widgets onto the grid individually. This is the right approach when you only want a few widgets from a backend rather than its full prearranged set.

## Parameter grouping

Widgets can share a control across cards — change a symbol or date range on one card and every grouped card updates with it. This is set up at the dashboard/backend level; see [[importing-dashboards|Importing Dashboards]] for what it looks like in practice.

## Multiple backends, one dashboard

A single dashboard can mix widgets from different backends — a general data widget next to a [[news-ticker|news ticker]] card next to a [[live-quotes|live quotes]] grid. Each widget only depends on its own backend being reachable; see [[layout-and-navigation|Layout and Navigation]] for how BDOBB isolates failures per widget.

---
*Source: Adventures in OpenBB, Ep. 5 — "Kick the Tires in Ten Minutes"; Ep. 3 — "I Asked for Electron and Got Talked Out of It."*
