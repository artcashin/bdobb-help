---
type: Note
tags: [bdobb, help, troubleshooting, infrastructure, openbb-docker, tailscale]
---

# Troubleshooting: Configuring the Infrastructure

Symptom-first index of issues in the backend services BDOBB connects to — openbb-docker, Rita/MCP, and Tailscale networking. These are all fixed server-side, not inside the BDOBB app. For app-side issues (iPad builds, settings, install), see [[troubleshooting-using-bdobb|Using BDOBB]].

## AI Chat / Rita Backend

**Chat errors on every single request the moment you connect the tool server.**
Not degraded — dead, with a context-size error. The full OpenBB tool catalogue (200+ tools) is roughly 150k tokens of descriptions, which exceeds most local models' request-size limit; an oversized request is rejected outright, never trimmed. Launch the MCP server with `--default-categories equity --tool-discovery` and confirm the fix by checking that `tools/list` now returns a handful of discovery tools instead of the full flood. Rule of thumb: ~700 tokens per advertised tool, against your model's real per-request slot (context size ÷ parallel slots). See [[rita-ai-agent-setup|Setting Up the Rita AI Agent]].

**Rita won't use your local model, or silently tries to reach the internet.**
As shipped, Rita's provider list only knows cloud endpoints. Use the OpenAI-compatible provider with `OPENAI_BASE_URL` pointed at your model server. Two sub-traps: the API key must exist in the model server's key file *and* the server must be restarted afterward (keys are read at startup); a wrong base URL can produce confusing auth errors rather than a clean "connection refused." See [[rita-ai-agent-setup|Setting Up the Rita AI Agent]].

**MCP discovery fails against a server you can `curl` just fine.**
Check the path exactly: it's `/mcp`, not `/mcp/`. The server answers the trailing-slash form with a redirect, and not every client follows redirects.

**Queries return HTTP 400 naming an unfamiliar field.**
The agent protocol distinguishes `null` from *absent* — several optional fields are rejected when sent as `null` and must be omitted entirely instead. Don't trust documentation on this; verify against the live server and read the error body, which names the offending field.

**One misconfigured tool server hangs every chat turn, forever.**
A server that accepts a connection and never replies is worse than a dead one. Every tool-server call needs a hard timeout (about ten seconds is reasonable) with a visible failure state — "this server is down, skipping it" — rather than a silent hang.

See [[rita-ai-agent-setup|Setting Up the Rita AI Agent]] and [[ai-chat|AI Chat]] for full context.

---
*Source: Adventures in OpenBB, Episode 6 "Gotchas" section.*
