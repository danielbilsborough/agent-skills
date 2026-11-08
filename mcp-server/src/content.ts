// All answers this server gives. Pure functions over static text taken verbatim from
// skills/business-agent-os/SKILL.md (test/server.test.ts checks they stay in sync).
// No network calls, no state, nothing about the caller is kept.

export const LINKS = {
  site: `https://partner.danielbilsborough.com`,
  repo: `https://github.com/danielbilsborough/agent-skills`,
} as const;

const FOOTER = `\n\nBusiness Agent OS by Daniel Bilsborough: ${LINKS.site}`;

export const COMMANDS = {
  pickup: `---
description: Load a client or project and brief me
argument-hint: <slug>
---
Slug: $ARGUMENTS. Look for it in clients/ then projects/. If none was given, list both folders and ask.

1. Read its CLAUDE.md, STATE.md, TODO.md and INBOX.md, and the last 30 lines of CHANGELOG.md.
2. Reply with a brief under 200 words:
   - Where things stand
   - Blockers and decisions waiting
   - What happened recently
   - Anything waiting in the inbox
3. End with: "Ready. What are we doing?"

Do not change any files.`,
  wrap: `---
description: Save this session into the memory
argument-hint: <slug>
---
Slug: $ARGUMENTS. If none was given, use the client or project this session was about and say which.

1. Summarise what happened this session in a few bullet points.
2. Show me the planned changes, then make them once I say yes:
   - CHANGELOG.md: add a section headed with today's date and those bullets. Never edit older entries.
   - STATE.md: rewrite as a short snapshot of where things stand, with "Last updated: <today>".
   - TODO.md: tick off what was finished and add what is still open.
   - INBOX.md: move each note to the file where it belongs, then clear the notes you moved.
   - CLAUDE.md: add any new stable fact or rule that came up.
   - Work this session that was not about this slug goes in log/<today>.md.
3. If CHANGELOG.md is now longer than about 500 lines, move every whole month older than the current month into archive/CHANGELOG-<YYYY>-<MM>.md (one file per month, entries unchanged, oldest first), and keep the current month in CHANGELOG.md. Never delete an entry.
4. If this folder has save points, make one: \`git add -A\` then \`git commit -m "wrap: <slug>, <today>"\`.
5. List the files you changed.

Only record what actually happened. Never invent.`,
  status: `---
description: One-screen view of every client and project
---
For each folder in clients/ and projects/, read STATE.md and TODO.md and show one line:
<slug>: <one-line state> | <open to-dos> open | last updated <date>

Then list anything marked as blocked or waiting, and any folder not updated in 14 days.
Do not change any files.`,
  review: `---
description: What did I do on a day, a week or a month
argument-hint: <date, week or month>
---
Period: $ARGUMENTS (for example "today", "last week", "14 March", "October"). If none was given, use this week.

1. Read the CHANGELOG.md entries in every folder under clients/ and projects/ (including the monthly files in each archive/ folder), and the files in log/, that fall in that period.
2. Reply with:
   - What got done, grouped by client or project
   - Decisions made, and why if the notes say
   - What is still open from that period
3. Keep it under 300 words unless I ask for more.

Only report what the files say. Do not change any files.`,
  ingest: `---
description: Add an article, transcript, file or note to the wiki
argument-hint: <file, link or pasted text>
---
Input: $ARGUMENTS. If nothing was given, ask what to add.

1. Save the original into raw/ as <topic>-<YYYY-MM-DD>.md (or keep the file as it is if it is already in raw/). If it is a link, save the page text using your normal web tool. Never edit raw/ files after saving.
2. Create wiki/sources/<same-name>.md: title, where it came from, date, and the five to ten points that matter.
3. For each subject it teaches, add to the matching page in wiki/topics/ (create one if none fits). For each person, company, product or tool, add to its page in wiki/entities/. Link pages to each other and to the source with [[page-name]] links.
4. If it relates to a client or project, add a [[link]] to the source in that folder's INBOX.md.
5. Add every new page to wiki/index.md (one line each) and a dated line to wiki/log.md.
6. Tell me what you created and what you changed.

Never invent facts that are not in the source. Never rewrite anything in ideas/.`,
  lint: `---
description: Monthly health check of the wiki
---
Read wiki/index.md, then the pages in wiki/ and the recent CHANGELOG.md entries in clients/ and projects/.

Report, without changing anything yet:
1. Broken [[links]] and pages that nothing links to.
2. Pages missing from wiki/index.md, or listed there but missing.
3. Facts that contradict each other, or that look out of date.
4. Lessons that appear for two or more clients and should become a topic page.
5. Topic pages whose Current state block has gone stale.

Then show the fixes you suggest, and make them once I say yes. Add a dated line to wiki/log.md for what you changed.`,
  newClient: `---
description: Add a new client or project folder
argument-hint: <name> [project]
---
Name: $ARGUMENTS. If the word "project" is included, create it under projects/, otherwise under clients/.
Make a lowercase slug with hyphens and create the five files (CLAUDE.md, STATE.md, CHANGELOG.md, TODO.md, INBOX.md) using the same headings as the existing folders. Ask me for contacts and key facts, and fill in what I give you.`,
} as const;

export const FOLDER_RULES = `## How this folder works
- Clients live in \`clients/<slug>/\`, my own projects in \`projects/<slug>/\`. Each has CLAUDE.md, STATE.md, CHANGELOG.md, TODO.md and INBOX.md.
- Start a session with \`/pickup <slug>\` and end it with \`/wrap <slug>\`. \`/status\` shows everything at once.
- Before working on a client or project, read its CLAUDE.md and STATE.md.
- Before researching something, check \`wiki/index.md\` first. We may have done it before.
- When something is worth keeping (an article, a call, a lesson), run /ingest so it lands in the wiki.
- One home per fact: stable facts in CLAUDE.md, where things stand in STATE.md, what happened in CHANGELOG.md, what is open in TODO.md.
- Never invent facts, numbers or quotes. If it is not in the files, ask.
- Anything other people will read (emails, posts, web copy) follows \`voice.md\`. Show me a draft first.
- Secrets (passwords, API keys) live only in a \`.env\` file in this folder, never in chat and never in notes.
- When something goes wrong and we agree on a fix, add it as a rule to this file so it does not happen again.`;
export const TREE = `<business folder>/
  CLAUDE.md            the business, how to talk, house rules (read at every start)
  voice.md             how the owner writes, for anything other people will read
  clients/<slug>/      one folder per client
    CLAUDE.md          stable facts: contacts, account IDs, spelling, client rules
    STATE.md           where things stand now (rewritten at every /wrap)
    CHANGELOG.md       dated history, newest at the bottom (only ever added to)
    TODO.md            open work, blockers, decisions waiting on someone
    INBOX.md           raw notes dropped in during the day, filed at /wrap
    archive/           older changelog months, moved here by /wrap (never deleted)
  projects/<slug>/     the same five files, for the owner's own projects
  raw/                 originals you save: articles, transcripts, PDFs, screenshots (never edited)
  wiki/                the knowledge base the agent writes and keeps up to date
    index.md           a catalogue of every wiki page, one line each
    log.md             a dated list of everything added
    topics/            one page per subject: how-tos, decisions, research, lessons
    entities/          one page per person, company, product or tool
    sources/           one summary page for each thing saved in raw/
  ideas/               your own thinking, in your own words (the agent never rewrites it)
  log/                 one file per day for work that is not about a client
  AGENTS.md            optional pointer for Codex and Grok
  .claude/commands/    the session commands
  .gitignore           keeps secrets out of the save points
  .agent-os/go.zsh     optional tmux menu`;
export const HOW_IT_WORKS = `## How it works (explain this to the user before starting)

Explain each point in plain words, with an example where it helps.

### The memory is just text files
- The agent forgets everything between sessions. The files are its memory. If it is not written down, the next session will not know it.
- They are plain Markdown text files. A year of notes for a busy business is a few megabytes, smaller than one phone photo.
- You can open them in any text editor, search them, back them up, or move them to another computer. They belong to you, not to a software company.
- Any agent can read them. Switch tools and the memory comes with you.

### Where each fact lives
- **CLAUDE.md (top of the folder)** is read automatically whenever Claude Code starts in the business folder. It holds the things that rarely change: what the business does, how to talk to you, the house rules.
- **One folder per client or project** keeps work separate. The agent reads only the folder in front of it, so clients never mix and sessions stay fast.
- **STATE.md** is the snapshot: where things stand right now, in a few lines. It is rewritten at every wrap, so it is always current.
- **CHANGELOG.md** is the history. Every wrap adds a dated entry of what was done and decided, and old entries are never changed. Over time it becomes a complete diary of the work.
- **archive/** keeps the changelog short. Once a changelog passes about 500 lines, the next wrap moves whole months older than the current one into \`archive/CHANGELOG-<year>-<month>.md\`. Nothing is deleted, /pickup stays fast, and /review still reads the archive.
- **TODO.md** is what is still open, including anything blocked or waiting on someone.
- **INBOX.md** is the drop zone. Paste anything in during the day, in any order. The next wrap files each note where it belongs.
- **log/** is a diary for days of work that are not about one client.

### The knowledge base (wiki)
This layer follows Andrej Karpathy's "LLM wiki" idea: you collect the raw material, and the agent writes and maintains a wiki from it.
- **raw/** holds the originals exactly as you saved them: an article, a call transcript, a PDF, a screenshot. Nothing in raw/ is ever edited, so the source of every fact stays checkable.
- **wiki/** is written by the agent. Each thing you save gets a short **source** page. What it teaches goes into **topic** pages (one subject each) and **entity** pages (one person, company, product or tool each).
- Pages link to each other with \`[[page-name]]\` links. Open the business folder in Obsidian (free) and the links become a clickable map, so you can see how clients, people and ideas connect.
- **index.md** lists every page in one line, so the agent can find anything fast. **log.md** records what was added and when.
- Topic pages that are still developing start with a short **Current state** block: where the thinking is now, what is still open, and the next move.
- **ideas/** is yours. The agent can read and link to it, but never rewrites your words.
- **Graduating lessons.** When the same lesson turns up for two or more clients, it moves into a wiki topic, so every client benefits. The client changelog keeps the original, and the topic links back to it.
- **/ingest** adds something new. **/lint**, about once a month, keeps the wiki healthy: it finds broken links, orphan pages, stale or contradicting facts, and lessons ready to graduate.
- Clients and the wiki work together: the client folders hold what is happening, the wiki holds what you know.
- Each fact has one home, so nothing is written twice and nothing goes out of date in a second place.

### /pickup and /wrap
- **/pickup <client>** is how a session starts. The agent reads that client's files and gives you a short brief: where things stand, what is blocked, what happened recently, and anything waiting in the inbox. Then it asks what you want to do. You never have to re-explain a client.
- **/wrap <client>** is how a session ends. The agent writes the session back into the files: a dated entry in CHANGELOG, a fresh STATE, an updated TODO, and the inbox filed away. It shows you the changes first.
- Pickup reads, wrap writes. The memory is only as good as the last wrap, so make wrapping a habit.
- When a session gets long, run /wrap, start a fresh session and /pickup again. A fresh session with good notes beats a tired one with a full memory.

### Looking back
- Because every wrap leaves a dated entry, you can ask at any time: "What did I do on 14 March?", "What did I get done this week?", "When did we agree the new price with this client, and why?" The /review command does this across every client, the log and the save points.
- At the end of a month this is a record of your work that you would never have had time to write yourself.

### Save points
- Every wrap can also make a local save point (git), so any change the agent makes can be seen or undone later. Nothing leaves the computer.`;
export const DAILY_HABIT = `## Step 9: The daily habit (give the user this summary)

- **Start of day:** \`/status\` to see everything, then \`go\` and pick a client, then \`/pickup <slug>\`.
- **During the day:** paste anything worth remembering into that client's INBOX.md, or just tell the agent "note this".
- **End of each session:** \`/wrap <slug>\`.
- **New client:** \`/new-client <name>\`.
- **Monday:** \`/status\`, then clear anything blocked.
- **Saw something worth keeping:** \`/ingest <link, file or pasted text>\`.
- **Friday or month end:** \`/review this week\` or \`/review October\` to see what actually got done.
- **Once a month:** \`/lint\` to keep the wiki tidy and graduate repeated lessons.
- **When the agent gets something wrong:** agree the fix, then say "add that as a rule to CLAUDE.md".`;
export const OTHER_AGENTS = `## Using it with Codex or Grok

The memory works with any agent, because it is only text files. Two things differ:

- **Startup file.** Codex and Grok read \`AGENTS.md\` at startup, not \`CLAUDE.md\`. If the user wants to use them, ask, then create \`AGENTS.md\` at the top of the business folder containing just: "Read CLAUDE.md in this folder first, and follow it."
- **Commands.** The slash commands are a Claude Code feature. In Codex or Grok, ask in plain words instead, for example: "Run the pickup for acme-plumbing, following .claude/commands/pickup.md." The steps are the same.

The tmux menu starts Claude Code by default. To start a different agent, change the word \`claude\` in go.zsh to that agent's command.`;
export const VOICE_STEP = `## Step 3: Write voice.md

Ask the user to paste two or three things they have written that sound like them (an email, a post, a page). From those, write \`voice.md\` with:

- \`## How I sound\`: three to five plain observations (for example: short sentences, dry, direct).
- \`## Words I use\` and \`## Words I never use\`.
- \`## Examples\`: the samples they pasted, unchanged.

If they have nothing to paste, create the headings with a note to fill it in later.`;
export const SETUP_QUESTIONS = `Ask these one at a time:

1. What is the business called, and what does it do, in one sentence?
2. Who are the customers?
3. What do you sell?
4. How should the agent talk to you? (Suggest: plain English, short answers, one idea per line, explain anything technical as if to a smart non-coder.)
5. What must the agent never do without asking? (Suggest: send an email or message, post anything public, spend money, delete files.)`;

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
    "## The seven command files",
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
    "### .claude/commands/review.md",
    "```markdown",
    COMMANDS.review,
    "```",
    "### .claude/commands/ingest.md",
    "```markdown",
    COMMANDS.ingest,
    "```",
    "### .claude/commands/lint.md",
    "```markdown",
    COMMANDS.lint,
    "```",
    "### .claude/commands/new-client.md",
    "```markdown",
    COMMANDS.newClient,
    "```",
    "",
    OTHER_AGENTS,
  ].join("\n") + FOOTER;
}

export function voiceGuideTemplate(): string {
  return VOICE_STEP + "\n\n## voice.md template\n```markdown\n# Voice\n\n## How I sound\n\n## Words I use\n\n## Words I never use\n\n## Examples\n```" + FOOTER;
}
