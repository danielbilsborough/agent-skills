# Agent skills by Daniel Bilsborough

Agent skills for running a business with Claude Code.

## business-agent-os

Sets up a business operating system for an AI agent on a Mac, for business owners who are not developers.

- **A memory made of plain text files.** One business folder: a folder per client and per project, a dated changelog, a daily log and a voice guide. A year of it takes a few megabytes, opens in any text editor, and belongs to you.
- **A knowledge base the agent maintains.** Following Andrej Karpathy's LLM wiki idea: you save raw sources (articles, calls, PDFs), `/ingest` turns them into linked topic, people and source pages with an index and a log, and `/lint` keeps it healthy once a month. Open the folder in Obsidian to see it as a map.
- **Session commands.** `/pickup` loads a client and briefs you. `/wrap` saves the session back. `/status` shows every client at a glance. `/review` answers "what did I do this week?". `/trace` shows how an idea or decision evolved. `/new-client` adds one. `/ingest` and `/lint` run the knowledge base. Pickup works for a client, a topic or a general day, and leads with blockers.
- **A complete record.** Every wrap leaves a dated entry, so at the end of a month you can ask what got done on any day, for any client, and why. Older months move to a monthly archive automatically, so nothing is lost and sessions stay fast.
- **Save points.** Optional local git history, so every change can be seen or undone.
- **A tmux `go` menu.** Optional: one session per client, one keypress to switch.

Optimised for Claude Code in the terminal. It also works with Codex and Grok, because the memory is just text files, and support for them will keep improving.

Everything stays in one folder you choose. Nothing runs in the background, nothing is sent anywhere, nothing is installed for you, and the agent asks before each step.

Install:

```
npx skills add danielbilsborough/agent-skills --skill business-agent-os
```

Then ask your agent: "Set up my business agent OS."

## MCP server

The same templates are also served by a small read-only MCP server, for agents that prefer tools:

```
https://mcp.danielbilsborough.com/mcp
```

Tools: `scaffold_business_os`, `house_rules`, `daily_routine`, `voice_guide_template`. They return text only. The server makes no outbound calls, stores nothing and logs nothing. Source in `mcp-server/`.

For Hermes Agent, this repo is also a plugin (`plugin.json`, `mcp.json`).

## About

Made by [Daniel Bilsborough](https://partner.danielbilsborough.com), business and technology partner for founders and CEOs in Melbourne.

https://partner.danielbilsborough.com

## Licence

MIT
