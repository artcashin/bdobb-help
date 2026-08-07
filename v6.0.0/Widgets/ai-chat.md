---
type: Note
tags: [bdobb, help, widgets, ai-chat, rita]
---

# AI Chat

BDOBB's chat pane talks to any agent that speaks OpenBB's published agent protocol — by default, this means **Agent Rita**, OpenBB's own open-source agent, running as a private service you (or your admin) control. See [[rita-ai-agent-setup|Setting Up the Rita AI Agent]] for deploying one.

## Where it lives

The chat pane sits on the right edge of the app and folds to a thin strip when idle, the same way the navigation rail does — see [[layout-and-navigation|Layout and Navigation]]. While the agent is composing a reply, the pane does **not** stay pinned open: if you move on to other work, it folds away and a small unread dot marks the folded edge once the answer is ready.

## What the agent can see

When you ask a question, the agent can ask *your app* to show it a widget — it cannot reach your backends, stores, or credentials directly. The app fetches the data over its own connection and hands it to the agent, which answers with citations pointing at which widgets it used. The agent is fully trusted in conversation and has no independent access to your infrastructure.

## What it's good at

Local models paired with tool access are strongest on questions where precision matters more than open-ended reasoning — "pull last month's closes and tell me what changed," "what's on this screen and what moved today." For long unaided reasoning with nothing to look up, expect a smaller local model to show its limits; that's the honest tradeoff of running privately rather than against a frontier cloud model.

## If the agent is unreachable

The chat pane names the problem directly rather than hanging silently — the rest of the dashboard is unaffected, since data widgets don't depend on the agent being up. If chat is erroring on every message, see [[troubleshooting-infrastructure|Configuring the Infrastructure]] — the most common cause is a misconfigured tool server overwhelming the agent's context window.

---
*Source: Adventures in OpenBB, Ep. 3 — "I Asked for Electron and Got Talked Out of It"; Ep. 6 — "The Analyst Who Never Leaves the Building."*
*See also: [[rita-ai-agent-setup|Setting Up the Rita AI Agent]] · [[troubleshooting-infrastructure|Configuring the Infrastructure]]*
