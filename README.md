# Agent skills by Daniel Bilsborough

Agent skills for running a business with Claude Code.

## business-agent-os

Sets up a business operating system for Claude Code on a Mac, for business owners who are not developers:

- one business folder with a plain-text memory: a folder per client and per project, a notes library, a daily log and a voice guide
- `/pickup` to load a client and get a short brief, `/wrap` to save the session back, `/status` for everything at a glance, `/new-client` to add one
- optional local save points (git), so every change can be seen or undone
- an optional tmux `go` menu to keep one session per client and switch between them

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
