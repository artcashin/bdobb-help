---
type: Note
tags: [bdobb, help, configuration, secrets, security]
---

# Secrets and Access

The V8 **rss-ticker** is a keyless, shared feed pool. It uses no admin key, manifest key or per-user token, and the News widget sends no credential in its URLs. Older instructions describing that three-key model apply to a different service and must not be used with this recipe.

Keep rss-ticker reachable only on the private Tailscale network. A News card sets **RSS Aggregator Server** in its parameters and owns its subscriptions through **Configure feeds…**. Live TV is offered by the same service when its optional `live_tv` channel list is enabled; that backend connection also needs no API key.

The public web preview has a separate authenticated gateway and an approved-feed list; it does not publish the unauthenticated pool directly. Other data backends and Rita retain their own credential requirements. See [[backends-and-connections|Backends and Connections]], [[rss-feed-sources|The RSS Feed Server]] and [[news-widget|The News Widget]].
