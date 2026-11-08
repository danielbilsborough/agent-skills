# Business Agent OS MCP server

Cloudflare Worker serving a read-only MCP endpoint at `https://mcp.danielbilsborough.com/mcp` (Streamable HTTP, stateless).

- Four tools, all returning fixed text from `skills/business-agent-os/SKILL.md`.
- No outbound requests, no storage, no logging (observability is off).
- `GET /mcp` returns 405; only `POST` is served.

```
npm test          # vitest
npm run typecheck
```
