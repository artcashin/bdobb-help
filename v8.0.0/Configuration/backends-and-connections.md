---
type: Note
tags: [bdobb, help, configuration, backends, api-keys]
---

# Backends and Connections

BDOBB has no data of its own — every widget, dashboard, and chat capability comes from a backend you've connected by URL. This page is the reference for what "API key" means for each backend type, since it isn't the same thing twice.

For the basic add-a-backend flow, see [[connecting-a-backend|Connecting a Backend]].

## What the API key field means, per backend type

| Backend | What goes in the API key field |
|---|---|
| General OpenBB Platform / reference backend | Whatever key scheme that specific backend requires, if any — the reference backend needs none. |
| [[news-ticker\|News ticker]] (rss-ticker) | The **manifest key** — never the admin key. See [[secrets-and-access\|Secrets and Access]]. |
| [[ai-chat\|AI agent]] (Rita) | Configured on the agent side, not per-dashboard — see [[rita-ai-agent-setup\|Setting Up the Rita AI Agent]]. |

## Reachability as the credential

Several of these backends are designed to be reachable *only* over a private network (a Tailscale tailnet, in the reference deployment) rather than exposed to the open internet. In that model, being able to reach the address at all is most of the authentication — see [[tailscale-networking|Tailscale Networking]] for how identity-based auth builds on that.

## Multiple backends, independent health

Each backend you connect is tracked independently. One going offline doesn't affect the others — see [[layout-and-navigation|Layout and Navigation]] for how degraded states are shown per-widget rather than app-wide.

---
*Source: Adventures in OpenBB, Ep. 5, Ep. 8, Ep. 9 — backend and API-key conventions consolidated across episodes.*
