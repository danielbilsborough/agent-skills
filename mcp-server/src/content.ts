// All answers this server gives. Pure functions over static text taken verbatim from
// skills/business-agent-os/SKILL.md (test/server.test.ts checks they stay in sync).
// No network calls, no state, nothing about the caller is kept.

export const LINKS = {
  site: "https://partner.danielbilsborough.com",
  repo: "https://github.com/danielbilsborough/agent-skills",
} as const;

const FOOTER = `\n\nBusiness Agent OS by Daniel Bilsborough: ${LINKS.site}`;

export const COMMANDS = {
  pickup: "---\ndescription: Load a client or project and brief me\nargument-hint: <slug>\n---\nSlug: $ARGUMENTS. Look for it in clients/ then projects/. If none was given, list both folders and ask.\n\n1. Read its CLAUDE.md, STATE.md, TODO.md and INBOX.md, and the last 30 lines of CHANGELOG.md.\n2. Reply with a brief under 200 words:\n   - Where things stand\n   - Blockers and decisions waiting\n   - What happened recently\n   - Anything waiting in the inbox\n3. End with: \"Ready. What are we doing?\"\n\nDo not change any files.",
  wrap: "---\ndescription: Save this session into the memory\nargument-hint: <slug>\n---\nSlug: $ARGUMENTS. If none was given, use the client or project this session was about and say which.\n\n1. Summarise what happened this session in a few bullet points.\n2. Show me the planned changes, then make them once I say yes:\n   - CHANGELOG.md: add a section headed with today's date and those bullets. Never edit older entries.\n   - STATE.md: rewrite as a short snapshot of where things stand, with \"Last updated: <today>\".\n   - TODO.md: tick off what was finished and add what is still open.\n   - INBOX.md: move each note to the file where it belongs, then clear the notes you moved.\n   - CLAUDE.md: add any new stable fact or rule that came up.\n   - Work this session that was not about this slug goes in log/<today>.md.\n3. If this folder has save points, make one: `git add -A` then `git commit -m \"wrap: <slug>, <today>\"`.\n4. List the files you changed.\n\nOnly record what actually happened. Never invent.",
  status: "---\ndescription: One-screen view of every client and project\n---\nFor each folder in clients/ and projects/, read STATE.md and TODO.md and show one line:\n<slug>: <one-line state> | <open to-dos> open | last updated <date>\n\nThen list anything marked as blocked or waiting, and any folder not updated in 14 days.\nDo not change any files.",
  newClient: "---\ndescription: Add a new client or project folder\nargument-hint: <name> [project]\n---\nName: $ARGUMENTS. If the word \"project\" is included, create it under projects/, otherwise under clients/.\nMake a lowercase slug with hyphens and create the five files (CLAUDE.md, STATE.md, CHANGELOG.md, TODO.md, INBOX.md) using the same headings as the existing folders. Ask me for contacts and key facts, and fill in what I give you.",
} as const;

export const FOLDER_RULES = "## How this folder works\n- Clients live in `clients/<slug>/`, my own projects in `projects/<slug>/`. Each has CLAUDE.md, STATE.md, CHANGELOG.md, TODO.md and INBOX.md.\n- Start a session with `/pickup <slug>` and end it with `/wrap <slug>`. `/status` shows everything at once.\n- Before working on a client or project, read its CLAUDE.md and STATE.md.\n- Before researching something, check `notes/` first. We may have done it before.\n- One home per fact: stable facts in CLAUDE.md, where things stand in STATE.md, what happened in CHANGELOG.md, what is open in TODO.md.\n- Never invent facts, numbers or quotes. If it is not in the files, ask.\n- Anything other people will read (emails, posts, web copy) follows `voice.md`. Show me a draft first.\n- Secrets (passwords, API keys) live only in a `.env` file in this folder, never in chat and never in notes.\n- When something goes wrong and we agree on a fix, add it as a rule to this file so it does not happen again.";
export const TREE = "<business folder>/\n  CLAUDE.md            the business, how to talk, house rules (read at every start)\n  voice.md             how the owner writes, for anything other people will read\n  clients/<slug>/      one folder per client\n    CLAUDE.md          stable facts: contacts, account IDs, spelling, client rules\n    STATE.md           where things stand now (rewritten at every /wrap)\n    CHANGELOG.md       dated history, newest at the bottom (only ever added to)\n    TODO.md            open work, blockers, decisions waiting on someone\n    INBOX.md           raw notes dropped in during the day, filed at /wrap\n  projects/<slug>/     the same five files, for the owner's own projects\n  notes/\n    reference/         tidy write-ups worth keeping (how-tos, decisions, research)\n    sources/           raw material: articles, transcripts, screenshots\n    ideas/             the owner's own thinking, in their own words\n  log/                 one file per day for work that is not about a client\n  .claude/commands/    the session commands\n  .gitignore           keeps secrets out of the save points\n  .agent-os/go.zsh     optional tmux menu";
export const HOW_IT_WORKS = "## How it works (explain this to the user before starting)\n\n- **The agent forgets everything between sessions.** The files are its memory. If it is not written down, the next session will not know it.\n- **CLAUDE.md is read automatically** whenever Claude Code starts in the business folder. It holds the things that rarely change.\n- **One folder per client or project** keeps work separate. The agent reads only the folder in front of it, so clients never mix and sessions stay fast.\n- **STATE is the snapshot, CHANGELOG is the history, TODO is what is open, INBOX is the drop zone.** Each fact has one home.\n- **Start with /pickup, end with /wrap.** Pickup turns the files into a short brief. Wrap turns the session back into files. The memory is only as good as the last wrap.\n- **Save points.** Every wrap can also make a local save point, so any change the agent makes can be looked at or undone later. Nothing leaves the computer.\n- **When a session gets long,** run /wrap, start a fresh session, and /pickup again. A fresh session with good notes beats a tired one with a full memory.";
export const DAILY_HABIT = "## Step 9: The daily habit (give the user this summary)\n\n- **Start of day:** `/status` to see everything, then `go` and pick a client, then `/pickup <slug>`.\n- **During the day:** paste anything worth remembering into that client's INBOX.md, or just tell the agent \"note this\".\n- **End of each session:** `/wrap <slug>`.\n- **New client:** `/new-client <name>`.\n- **Monday:** `/status`, then clear anything blocked.\n- **When the agent gets something wrong:** agree the fix, then say \"add that as a rule to CLAUDE.md\".";
export const VOICE_STEP = "## Step 3: Write voice.md\n\nAsk the user to paste two or three things they have written that sound like them (an email, a post, a page). From those, write `voice.md` with:\n\n- `## How I sound`: three to five plain observations (for example: short sentences, dry, direct).\n- `## Words I use` and `## Words I never use`.\n- `## Examples`: the samples they pasted, unchanged.\n\nIf they have nothing to paste, create the headings with a note to fill it in later.";
export const SETUP_QUESTIONS = "Ask these one at a time:\n\n1. What is the business called, and what does it do, in one sentence?\n2. Who are the customers?\n3. What do you sell?\n4. How should the agent talk to you? (Suggest: plain English, short answers, one idea per line, explain anything technical as if to a smart non-coder.)\n5. What must the agent never do without asking? (Suggest: send an email or message, post anything public, spend money, delete files.)";

const today = () => new Date().toISOString().slice(0, 10);

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "client";
}

function clientFiles(name: string, kind: "clients" | "projects"): string {
  const slug = slugify(name);
  const d = today();
  return [
    `### ${kind}/${slug}/CLAUDE.md`,
    "```markdown",
    `# ${name}`,
    "",
    "## Contacts",
    "",
    "## Key facts",
    "",
    "## Rules",
    "```",
    `### ${kind}/${slug}/STATE.md`,
    "```markdown",
    "# State",
    `Last updated: ${d}`,
    "",
    "Just set up.",
    "```",
    `### ${kind}/${slug}/CHANGELOG.md`,
    "```markdown",
    "# Changelog",
    "",
    `## ${d}`,
    "- Folder created.",
    "```",
    `### ${kind}/${slug}/TODO.md`,
    "```markdown",
    "# To do",
    "```",
    `### ${kind}/${slug}/INBOX.md`,
    "```markdown",
    "# Inbox",
    "Paste raw notes below. /wrap files them.",
    "```",
  ].join("\n");
}

export interface ScaffoldInput {
  business_name?: string;
  clients?: string[];
  projects?: string[];
}

export function scaffoldBusinessOs(input: ScaffoldInput): string {
  const name = (input.business_name || "<Business name>").trim();
  const clients = (input.clients || []).slice(0, 20);
  const projects = (input.projects || []).slice(0, 20);
  const parts = [
    `# Business Agent OS for ${name}`,
    "",
    "Create these files inside one business folder (for example ~/business). Ask the user before writing anything, and write nothing outside that folder.",
    "",
    "## Folder layout",
    "```",
    TREE,
    "```",
    "",
    "## CLAUDE.md",
    "Ask the user these questions one at a time, then write the answers under the headings `# " + name + "`, `## What we do`, `## Customers`, `## What we sell`, `## How to talk to me`, `## Ask first`.",
    "",
    SETUP_QUESTIONS,
    "",
    "Then add this section unchanged:",
    "```markdown",
    FOLDER_RULES,
    "```",
  ];
  if (clients.length || projects.length) {
    parts.push("", "## Client and project folders");
    for (const c of clients) parts.push(clientFiles(c, "clients"));
    for (const p of projects) parts.push(clientFiles(p, "projects"));
  } else {
    parts.push("", "## Client and project folders", "Ask for the first client's name, then create its five files. Call this tool again with `clients` to get them filled in.");
  }
  parts.push("", "For the session commands call `daily_routine`. For the voice guide call `voice_guide_template`.");
  return parts.join("\n") + FOOTER;
}

export function houseRules(): string {
  return [
    "# House rules for a business agent",
    "",
    "Add these to the business CLAUDE.md. Each one stops a common, expensive mistake.",
    "",
    "## Ask first",
    "- Sending an email or message",
    "- Posting anything public",
    "- Spending money",
    "- Deleting files",
    "",
    "## How this folder works",
    "```markdown",
    FOLDER_RULES,
    "```",
  ].join("\n") + FOOTER;
}

export function dailyRoutine(): string {
  return [
    HOW_IT_WORKS,
    "",
    DAILY_HABIT,
    "",
    "## The four command files",
    "Save each one in `.claude/commands/` inside the business folder.",
    "",
    "### .claude/commands/pickup.md",
    "```markdown",
    COMMANDS.pickup,
    "```",
    "### .claude/commands/wrap.md",
    "```markdown",
    COMMANDS.wrap,
    "```",
    "### .claude/commands/status.md",
    "```markdown",
    COMMANDS.status,
    "```",
    "### .claude/commands/new-client.md",
    "```markdown",
    COMMANDS.newClient,
    "```",
  ].join("\n") + FOOTER;
}

export function voiceGuideTemplate(): string {
  return VOICE_STEP + "\n\n## voice.md template\n```markdown\n# Voice\n\n## How I sound\n\n## Words I use\n\n## Words I never use\n\n## Examples\n```" + FOOTER;
}
