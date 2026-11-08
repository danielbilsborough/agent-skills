// The MCP server definition: four read-only tools over static text.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { LINKS, dailyRoutine, houseRules, scaffoldBusinessOs, voiceGuideTemplate } from "./content.js";

export const SERVER_NAME = "business-agent-os";
export const SERVER_VERSION = "0.1.0";

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const name = z.string().min(1).max(80);

export function buildServer(): McpServer {
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION, websiteUrl: LINKS.site },
    {
      instructions:
        "Templates for setting up a file-based business operating system for Claude Code: one business folder of plain Markdown " +
        "memory, session commands and house rules. The tools return text; they never change anything on any machine. " +
        "The agent writes the files itself, only inside the business folder, and asks the user before each step.",
    },
  );

  server.registerTool(
    "scaffold_business_os",
    {
      title: "Scaffold business OS",
      description:
        "Folder layout and starter files for a business operating system: the business CLAUDE.md questions and rules, plus STATE, CHANGELOG, TODO, INBOX and CLAUDE.md for each client and project named.",
      inputSchema: {
        business_name: name.optional().describe("The business name"),
        clients: z.array(name).max(20).optional().describe("Client names to create folders for"),
        projects: z.array(name).max(20).optional().describe("The owner's own project names"),
      },
      annotations: { title: "Scaffold business OS", ...READ_ONLY },
    },
    async (input) => text(scaffoldBusinessOs(input)),
  );

  server.registerTool(
    "house_rules",
    {
      title: "House rules",
      description:
        "The safety and memory rules block for a business CLAUDE.md: ask before sending, posting, spending or deleting; never invent facts; secrets only in .env; one home per fact; turn mistakes into rules.",
      inputSchema: {},
      annotations: { title: "House rules", ...READ_ONLY },
    },
    async () => text(houseRules()),
  );

  server.registerTool(
    "daily_routine",
    {
      title: "Daily routine",
      description:
        "How the memory works, the daily habit, the full text of the /pickup, /wrap, /status, /review and /new-client command files, and how to use them with Codex or Grok.",
      inputSchema: {},
      annotations: { title: "Daily routine", ...READ_ONLY },
    },
    async () => text(dailyRoutine()),
  );

  server.registerTool(
    "voice_guide_template",
    {
      title: "Voice guide template",
      description: "How to build voice.md from two or three writing samples, plus the empty template.",
      inputSchema: {},
      annotations: { title: "Voice guide template", ...READ_ONLY },
    },
    async () => text(voiceGuideTemplate()),
  );

  return server;
}
