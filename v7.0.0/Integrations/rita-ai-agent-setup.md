---
type: Note
tags: [bdobb, help, integrations, rita, agent, mcp, setup]
---

# Setting Up the Rita AI Agent

To use [[ai-chat|AI Chat]] in BDOBB, you need an agent running somewhere reachable, speaking OpenBB's published agent protocol. This page covers standing up **Agent Rita**, OpenBB's own open-source agent, as a private service against your own models — the setup this help system assumes elsewhere.

## The three pieces

1. **The analyst — Agent Rita.** OpenBB's own agent (MIT-licensed), run unmodified as a small always-on service. Because it speaks the published protocol, BDOBB's chat pane can talk to it out of the box.
2. **The brain — a local model server.** A machine serving a model through an OpenAI-compatible API (llama.cpp is a common choice). Rita talks to this, not to a cloud provider.
3. **The hands — an MCP tool server.** An MCP server exposing the OpenBB Platform (and optionally other data stores) as callable tools, so the agent can pull exact numbers rather than guessing.

## Setup steps

1. **Serve your model** with an OpenAI-compatible server (e.g. llama.cpp). Note the context size and how many parallel request slots it's split across — you'll need this number in step 5.
2. **Mint a dedicated API key** for the agent (e.g. llama.cpp's `--api-key-file`), and restart the model server so it picks up the new key file.
3. **Clone `OpenBB-finance/agent-rita`** and configure it to use the OpenAI-compatible provider, pointing `OPENAI_BASE_URL` at your model server and using the key from step 2. Rita ships assuming cloud providers (OpenAI/OpenRouter/Groq) — this step is what redirects it to your own hardware.
4. **Run Rita as a service** (e.g. systemd), listening only on your private network.
5. **Add an MCP tool server in discovery mode.** Do not run it with its full tool catalogue enabled — see "Why discovery mode is required" below. Example:

   ```
   openbb-mcp --host 127.0.0.1 --port 6901 \
     --default-categories equity --tool-discovery
   ```

   Publish it privately (tailnet-only — see [[tailscale-networking|Tailscale Networking]]), never through a public tunnel: this server has no auth of its own. Point Rita's MCP config at it, and mind path exactness — `/mcp`, not `/mcp/` (some clients don't follow the redirect).
6. **Neutralize the `install_skill` admin tool** if present — it can write files a later agent session might treat as trusted instructions. Point its write target at nothing (e.g. `OPENBB_MCP_DEFAULT_SKILLS_DIR=`) rather than relying on a flag to disable it.
7. **Smoke-test before connecting a client.** Fetch the agent's `agents.json`, POST a canned query, and watch the response stream. Treat the protocol's documentation as a rumor to verify against a live server — some optional fields are documented as accepting `null` but are actually rejected; omit them instead.
8. **Point BDOBB at Rita** as an [[ai-chat|AI Chat]] backend and ask it about a dashboard.

## Why discovery mode is required

Every tool an agent has access to contributes its full description to *every single request* — like reciting an entire menu before taking any order. A full OpenBB tool server can expose 200+ tools, easily 100,000+ tokens of descriptions. Against a modest local model's request-size limit, that's not degraded performance — it's every request being flatly rejected before the model reads a word of the actual question.

**Discovery mode** replaces the full menu with a handful of lookup tools (roughly 1,400 tokens) that let the agent pull in categories of tools on demand, mid-conversation. Nothing is lost — it's fetched when needed instead of always carried. Rule of thumb: budget about 700 tokens per tool on any menu you hand an agent, against your model's real per-request slot size (context size *divided by* parallel slots).

## The permission model, briefly

The agent cannot reach your backends, stores, or credentials directly — it can only ask *your app* to show it a widget, and the app fetches the data over its own connection. The agent is fully trusted in conversation and has no independent access to infrastructure. See [[ai-chat|AI Chat]].

## Troubleshooting

See the Rita-specific entries in [[troubleshooting-infrastructure|Configuring the Infrastructure]]: chat erroring on every request, Rita refusing to use your local model, MCP discovery failures, HTTP 400s naming an unfamiliar field, and hung tool-server calls.

---
*Source: Adventures in OpenBB, Ep. 6 — "The Analyst Who Never Leaves the Building."*
*See also: [[ai-chat|AI Chat]] · [[tailscale-networking|Tailscale Networking]] · [[troubleshooting-infrastructure|Configuring the Infrastructure]]*
