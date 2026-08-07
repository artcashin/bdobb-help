---
type: Note
tags: [bdobb, help, integrations, tailscale, networking, security]
---

# Tailscale Networking

Several backends in this guide — the [[news-ticker|news ticker]], the [[rita-ai-agent-setup|MCP tool server]] — are designed to run privately on a Tailscale tailnet rather than being exposed publicly. This page covers the pattern and its sharp edges.

## The pattern

A backend joins your private network as a compose service sitting behind a Tailscale sidecar: bound to loopback, not published on any host port, with **Tailscale Serve** terminating TLS and fronting it at a `https://<service>.<your-tailnet>.ts.net` address. Only devices on your tailnet can reach it at all — reachability substitutes for a chunk of what a public service would need explicit auth for.

**Serve vs. Funnel**: Serve keeps a service tailnet-only. Funnel exposes it to the public internet. Only put a service behind Funnel if it authenticates on its own — the MCP tool server, for example, is deliberately never funneled, because it carries no auth of its own.

## Identity-based auth (no tokens in URLs)

Tailscale Serve injects the caller's verified tailnet identity into every request it proxies, including websocket upgrades. A backend that trusts this header doesn't need to embed a token in any URL — see [[secrets-and-access|Secrets and Access]] for why the [[news-ticker|news ticker]] needs this escape hatch in the first place.

To enable it (rss-ticker example):

```yaml
tailscale_auth: true
```

Then map each user's `tailscale_login` (e.g. `you@github`) to a ticker user, and leave the backend's API key blank — the caller's Serve identity substitutes for the token.

**Two caveats:**
- Every viewing device must actually be on your tailnet.
- Serve omits identity headers for **tagged** devices — tagging a viewing device silently removes its access. Don't tag devices you expect to authenticate this way.

## Trusting an identity header is only safe if Serve is the *only* door

A backend that trusts an injected identity header must refuse to start unless it's bound to loopback and unreachable except through Serve — otherwise a forged header sent directly to the service's address would be honored.

## The userspace-networking trap

Tailscale's container image defaults to **userspace networking**, where the Tailscale daemon itself terminates inbound tailnet connections and forwards them to loopback internally. This makes "bound to 127.0.0.1, only reachable via Serve" **quietly false** — a request sent straight to the node's private tailnet address, carrying a forged identity header, gets forwarded to your service and answered as if it came through Serve. Nothing in your application logs looks wrong; the exposure is invisible from inside the app.

**Fix:** set kernel networking on the sidecar:

```
TS_USERSPACE=false
```

With kernel networking, a loopback bind actually means loopback — a direct request to the private address dies at the connection level instead of being silently forwarded.

**Verify this on every service you run behind a sidecar**, not just once. The check is one command: send a request with a forged identity header straight to the node's tailnet IP, bypassing Serve, and confirm it's refused. Don't trust the sidecar's documented behavior — verify the door, not the lock's spec sheet.

---
*Source: Adventures in OpenBB, Ep. 8 — "All the News That Fits, We Print"; Ep. 6 — "The Analyst Who Never Leaves the Building"; Ep. 9 — "The Tape Comes to the Closet."*
*See also: [[secrets-and-access|Secrets and Access]] · [[news-ticker|News Ticker]] · [[troubleshooting-infrastructure|Configuring the Infrastructure]]*
