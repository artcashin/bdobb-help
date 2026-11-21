---
type: Note
tags: [bdobb, help, integrations, rss, feeds, setup]
---

# The RSS Feed Server

V8 uses the companion openbq-docker recipe's **rss-ticker** service, a shared, keyless feed pool. It has no admin or manifest keys. Each News card saves its own feed URLs, names, tabs and highlights; the server polls feeds requested by connected cards. An older config containing authentication or server-owned feed-list fields is refused.

From the checked-out V8 recipe, after completing its Docker and Tailscale setup:

```bash
cp rss-ticker-config/config.yaml.example rss-ticker-config/config.yaml
docker compose --profile web up -d rss-ticker
```

Use the recipe's private Tailscale endpoint on port 8088 as the **RSS Aggregator Server** parameter in the built-in **News** widget. Do not expose this unauthenticated service publicly. The web preview uses its approved-feed relay instead.

See [[news-widget|The News Widget]] for feed configuration, tabs, import/export, retention and server setup. The published example includes Bloomberg, Reuters, CNBC, New York Times, Seeking Alpha and individual Substack publications. Icons resolve from each publisher; the widget preserves a headline from quieter sources within its bounded history.

The same service offers [[live-tv|Live TV]] when the recipe's `live_tv` list is enabled. Connect the server once as a backend for that widget. Its source picker combines three YouTube streams and incoming Chrome Picture in Picture grab; streams play inline and require no API key. iPadOS does not support moving Chrome's floating player.

*Source: openbq-docker V8 `docker-compose.yml`, `rss-ticker-config/config.yaml.example`, `rss-ticker/README.md`; BDOBB V8 embedded guide.*
