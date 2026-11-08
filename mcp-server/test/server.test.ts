import SKILL from "../../skills/business-agent-os/SKILL.md?raw";
import { describe, expect, it } from "vitest";
import worker from "../src/index.js";
import { COMMANDS, FOLDER_RULES, dailyRoutine, houseRules, scaffoldBusinessOs, slugify, voiceGuideTemplate } from "../src/content.js";

const ENDPOINT = "https://mcp.danielbilsborough.com/mcp";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, text/event-stream",
  "Mcp-Protocol-Version": "2025-06-18",
};

async function rpc(method: string, params: unknown = {}, id: number | null = 1) {
  const body = id === null ? { jsonrpc: "2.0", method, params } : { jsonrpc: "2.0", id, method, params };
  const res = await worker.fetch(new Request(ENDPOINT, { method: "POST", headers: HEADERS, body: JSON.stringify(body) }));
  const raw = await res.text();
  return { status: res.status, json: raw ? JSON.parse(raw) : null };
}

async function call(name: string, args: Record<string, unknown> = {}) {
  const r = await rpc("tools/call", { name, arguments: args });
  expect(r.status).toBe(200);
  return r.json.result as { content: { type: string; text: string }[]; isError?: boolean };
}

const HOME = "https://partner.danielbilsborough.com";

describe("content stays in sync with the skill", () => {
  it.each(Object.entries(COMMANDS))("command %s appears verbatim in SKILL.md", (_k, v) => {
    expect(SKILL).toContain(v);
  });
  it("folder rules appear verbatim in SKILL.md", () => expect(SKILL).toContain(FOLDER_RULES));
});

describe("content", () => {
  it("scaffold fills client and project folders", () => {
    const t = scaffoldBusinessOs({ business_name: "Acme", clients: ["Bright Plumbing Co"], projects: ["New Website"] });
    expect(t).toContain("clients/bright-plumbing-co/STATE.md");
    expect(t).toContain("projects/new-website/INBOX.md");
    expect(t).toContain("# Bright Plumbing Co");
  });
  it("slugify is safe", () => {
    expect(slugify("../../etc/passwd")).toBe("etc-passwd");
    expect(slugify("   ")).toBe("client");
  });
  it("every tool links the homepage and never a course page", () => {
    for (const t of [scaffoldBusinessOs({}), houseRules(), dailyRoutine(), voiceGuideTemplate()]) {
      expect(t).toContain(HOME);
      expect(t).not.toMatch(/course/i);
    }
  });
  it("no install or remote-script instructions", () => {
    for (const t of [scaffoldBusinessOs({}), houseRules(), dailyRoutine(), voiceGuideTemplate()]) {
      expect(t).not.toMatch(/sudo|curl |wget |\| *(ba|z)?sh\b|dangerously/);
    }
  });
});

describe("MCP over HTTP", () => {
  it("lists four read-only tools", async () => {
    const r = await rpc("tools/list");
    const tools = r.json.result.tools as { name: string; annotations: { readOnlyHint: boolean } }[];
    expect(tools.map((t) => t.name).sort()).toEqual(["daily_routine", "house_rules", "scaffold_business_os", "voice_guide_template"]);
    for (const t of tools) expect(t.annotations.readOnlyHint).toBe(true);
  });
  it("calls each tool", async () => {
    expect((await call("daily_routine")).content[0].text).toContain("/pickup");
    expect((await call("house_rules")).content[0].text).toContain("Ask first");
    expect((await call("voice_guide_template")).content[0].text).toContain("voice.md");
    expect((await call("scaffold_business_os", { clients: ["Acme"] })).content[0].text).toContain("clients/acme/CLAUDE.md");
  });
  it("rejects oversized input", async () => {
    const r = await call("scaffold_business_os", { clients: ["x".repeat(500)] });
    expect(r.isError).toBe(true);
  });
  it("GET /mcp is 405 and unknown paths 404", async () => {
    expect((await worker.fetch(new Request(ENDPOINT, { method: "GET" }))).status).toBe(405);
    expect((await worker.fetch(new Request("https://mcp.danielbilsborough.com/x"))).status).toBe(404);
  });
});
