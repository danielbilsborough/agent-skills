---
name: business-agent-os
description: Set up a business operating system for an AI agent on a Mac, built for business owners who are not developers. One business folder holds a plain-text memory (a folder per client and per project, a dated changelog, a daily log, notes and a voice guide), with commands to start and end each work session (/pickup, /wrap, /status, /review, /new-client), local save points so every change can be undone, and an optional tmux "go" menu. Optimised for Claude Code; also works with Codex and Grok. Use when someone wants their agent to remember their business between sessions, or asks to set up an agent operating system.
---

# Business Agent OS

A small operating system for running a business with an AI agent. It suits someone who thinks in business terms, can read a little code, and wants to own every file their agent works from.

Everything is plain Markdown in one folder the user chooses. Nothing runs in the background, nothing is sent anywhere, and the agent asks before every step.

It is optimised for Claude Code in the terminal, and it also works with Codex and Grok, because the memory is just text files any agent can read. See "Using it with Codex or Grok" near the end.

## Rules for running this skill

- Before each step, say in one or two plain sentences what you are about to do, and wait for a yes.
- Create and edit files only inside the business folder. The two optional steps that touch anything outside it are done by the user, not by you.
- Do not install software. If something is missing, tell the user the command and let them run it.
- If the user says no to a step, skip it and carry on.
- Write for a non-developer: short sentences, no jargon, one idea per line.
- Finish by listing every file you created.

## What gets built

```
<business folder>/
  CLAUDE.md            the business, how to talk, house rules (read at every start)
  voice.md             how the owner writes, for anything other people will read
  clients/<slug>/      one folder per client
    CLAUDE.md          stable facts: contacts, account IDs, spelling, client rules
    STATE.md           where things stand now (rewritten at every /wrap)
    CHANGELOG.md       dated history, newest at the bottom (only ever added to)
    TODO.md            open work, blockers, decisions waiting on someone
    INBOX.md           raw notes dropped in during the day, filed at /wrap
  projects/<slug>/     the same five files, for the owner's own projects
  notes/
    reference/         tidy write-ups worth keeping (how-tos, decisions, research)
    sources/           raw material: articles, transcripts, screenshots
    ideas/             the owner's own thinking, in their own words
  log/                 one file per day for work that is not about a client
  AGENTS.md            optional pointer for Codex and Grok
  .claude/commands/    the session commands
  .gitignore           keeps secrets out of the save points
  .agent-os/go.zsh     optional tmux menu
```

## How it works (explain this to the user before starting)

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
- **TODO.md** is what is still open, including anything blocked or waiting on someone.
- **INBOX.md** is the drop zone. Paste anything in during the day, in any order. The next wrap files each note where it belongs.
- **log/** is a diary for days of work that are not about one client.
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
- Every wrap can also make a local save point (git), so any change the agent makes can be seen or undone later. Nothing leaves the computer.

## Step 1: Choose the business folder

Ask where it should live. Suggest `~/business`. Create it if it does not exist, and work only inside it from now on.

## Step 2: Create CLAUDE.md

Ask these one at a time:

1. What is the business called, and what does it do, in one sentence?
2. Who are the customers?
3. What do you sell?
4. How should the agent talk to you? (Suggest: plain English, short answers, one idea per line, explain anything technical as if to a smart non-coder.)
5. What must the agent never do without asking? (Suggest: send an email or message, post anything public, spend money, delete files.)

Put the answers into `CLAUDE.md` under `# <Business name>`, `## What we do`, `## Customers`, `## What we sell`, `## How to talk to me`, `## Ask first`. Then add this section unchanged:

```markdown
## How this folder works
- Clients live in `clients/<slug>/`, my own projects in `projects/<slug>/`. Each has CLAUDE.md, STATE.md, CHANGELOG.md, TODO.md and INBOX.md.
- Start a session with `/pickup <slug>` and end it with `/wrap <slug>`. `/status` shows everything at once.
- Before working on a client or project, read its CLAUDE.md and STATE.md.
- Before researching something, check `notes/` first. We may have done it before.
- One home per fact: stable facts in CLAUDE.md, where things stand in STATE.md, what happened in CHANGELOG.md, what is open in TODO.md.
- Never invent facts, numbers or quotes. If it is not in the files, ask.
- Anything other people will read (emails, posts, web copy) follows `voice.md`. Show me a draft first.
- Secrets (passwords, API keys) live only in a `.env` file in this folder, never in chat and never in notes.
- When something goes wrong and we agree on a fix, add it as a rule to this file so it does not happen again.
```

## Step 3: Write voice.md

Ask the user to paste two or three things they have written that sound like them (an email, a post, a page). From those, write `voice.md` with:

- `## How I sound`: three to five plain observations (for example: short sentences, dry, direct).
- `## Words I use` and `## Words I never use`.
- `## Examples`: the samples they pasted, unchanged.

If they have nothing to paste, create the headings with a note to fill it in later.

## Step 4: Create the notes library and log

Create `notes/reference/`, `notes/sources/`, `notes/ideas/` and `log/`, each with a one-line `README.md` saying what goes in it:

- reference: "Tidy write-ups worth keeping: how-tos, decisions, research."
- sources: "Raw material: articles, transcripts, screenshots. Name files <topic>-<YYYY-MM-DD>."
- ideas: "My own thinking, in my own words. The agent never rewrites these."
- log: "One file per day (YYYY-MM-DD.md) for work that is not about a client or project."

Tip for the user: the `notes/` folder opens as a vault in Obsidian if they want a nicer way to read it.

## Step 5: Add the first client

Ask for the first client's name. Make a lowercase slug with hyphens (for example `acme-plumbing`) and create `clients/<slug>/` with:

- `CLAUDE.md`: `# <Client name>`, `## Contacts`, `## Key facts`, `## Rules`. Fill in what the user gives you.
- `STATE.md`: `# State`, `Last updated: <today>`, `Just set up.`
- `CHANGELOG.md`: `# Changelog`, `## <today>`, `- Folder created.`
- `TODO.md`: `# To do` and an empty list.
- `INBOX.md`: `# Inbox`, `Paste raw notes below. /wrap files them.`

## Step 6: Add the session commands

Create these five files in `.claude/commands/` with exactly this content. Explain that they work whenever Claude Code is started inside the business folder.

`.claude/commands/pickup.md`:

```markdown
---
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

Do not change any files.
```

`.claude/commands/wrap.md`:

```markdown
---
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
3. If this folder has save points, make one: `git add -A` then `git commit -m "wrap: <slug>, <today>"`.
4. List the files you changed.

Only record what actually happened. Never invent.
```

`.claude/commands/status.md`:

```markdown
---
description: One-screen view of every client and project
---
For each folder in clients/ and projects/, read STATE.md and TODO.md and show one line:
<slug>: <one-line state> | <open to-dos> open | last updated <date>

Then list anything marked as blocked or waiting, and any folder not updated in 14 days.
Do not change any files.
```

`.claude/commands/review.md`:

```markdown
---
description: What did I do on a day, a week or a month
argument-hint: <date, week or month>
---
Period: $ARGUMENTS (for example "today", "last week", "14 March", "October"). If none was given, use this week.

1. Read the CHANGELOG.md entries in every folder under clients/ and projects/, and the files in log/, that fall in that period.
2. Reply with:
   - What got done, grouped by client or project
   - Decisions made, and why if the notes say
   - What is still open from that period
3. Keep it under 300 words unless I ask for more.

Only report what the files say. Do not change any files.
```

`.claude/commands/new-client.md`:

```markdown
---
description: Add a new client or project folder
argument-hint: <name> [project]
---
Name: $ARGUMENTS. If the word "project" is included, create it under projects/, otherwise under clients/.
Make a lowercase slug with hyphens and create the five files (CLAUDE.md, STATE.md, CHANGELOG.md, TODO.md, INBOX.md) using the same headings as the existing folders. Ask me for contacts and key facts, and fill in what I give you.
```

## Step 7 (optional): Save points

Ask if they want local save points. They give a full history of every file, and a way back if the agent ever gets something wrong. Nothing is uploaded.

1. Check that git is available with `git --version`. If it is missing, tell the user to run `xcode-select --install` themselves, then come back.
2. Create `.gitignore` containing:
   ```
   .env
   .env.*
   .DS_Store
   ```
3. Run `git init` inside the business folder. Set the name on the save points for this folder only with `git config user.name "<business name>"` and `git config user.email "<owner email, or none@example.com>"`. Then run `git add -A` and `git commit -m "Business Agent OS set up"`.
4. Explain in plain terms:
   - Every /wrap now makes a save point.
   - To see what changed: ask the agent "what changed since yesterday?"
   - To undo: ask the agent "show me the last save points" and then "put <file> back the way it was at <save point>". It will show the change before making it.

## Step 8 (optional): The tmux "go" menu

Ask if they want this. It keeps one Claude Code session open per client in the background, and lets them jump between them with one keypress. Skip it if they say no.

1. Check for tmux with `command -v tmux`. If it is missing, tell the user to install it themselves with `brew install tmux` (Homebrew from brew.sh), then come back.
2. Check whether the name `go` is taken with `command -v go` (the Go programming language uses it). If it is, use `gomenu` everywhere below.
3. Write `<business folder>/.agent-os/go.zsh`, replacing `<business folder>` with the real absolute path:

```zsh
# Business Agent OS: tmux session menu.
# One tmux session per client or project, each running Claude Code in the business folder.
AGENT_OS_HOME="<business folder>"

go() {
  local keys=(a s d f g h j k l q w e r t y u i o p z x c v b n m)
  local -a sessions
  sessions=("${(@f)$(tmux ls -F '#S' 2>/dev/null)}")
  [[ -z "${sessions[1]}" ]] && sessions=()
  echo ""
  echo "Sessions:"
  local i=1 s
  for s in "${sessions[@]}"; do
    echo "  ${keys[$i]}) $s"
    ((i++))
  done
  echo "  +) new session"
  echo ""
  echo -n "> "
  local pick
  read pick
  [[ -z "$pick" ]] && return
  if [[ "$pick" == "+" ]]; then
    echo -n "Client or project slug: "
    local slug
    read slug
    [[ -z "$slug" ]] && return
    tmux new-session -d -s "$slug" -c "$AGENT_OS_HOME" claude
    pick="$slug"
  else
    local idx=${keys[(i)$pick]}
    (( idx >= 1 && idx <= ${#sessions[@]} )) && pick="${sessions[$idx]}"
  fi
  if [[ -n "$TMUX" ]]; then
    tmux switch-client -t "$pick"
  else
    tmux attach -t "$pick"
  fi
}
```

4. Do not edit `~/.zshrc`. Show the user this line and ask them to add it to the end of `~/.zshrc` themselves:

```zsh
source "<business folder>/.agent-os/go.zsh"
```

5. Explain:
   - Open a new Terminal window and type `go`.
   - Press `+` and type a slug to start a session. Then type `/pickup <slug>`.
   - Leave a session with `Ctrl-b` then `d`. It keeps running. Type `go` to come back.
   - Name each session after its client or project in full, so the menu reads at a glance.
   - Keep one session per client. Two sessions writing the same files will trip over each other.
   - Run `/wrap <slug>` before closing a session for good.

## Step 9: The daily habit (give the user this summary)

- **Start of day:** `/status` to see everything, then `go` and pick a client, then `/pickup <slug>`.
- **During the day:** paste anything worth remembering into that client's INBOX.md, or just tell the agent "note this".
- **End of each session:** `/wrap <slug>`.
- **New client:** `/new-client <name>`.
- **Monday:** `/status`, then clear anything blocked.
- **Friday or month end:** `/review this week` or `/review October` to see what actually got done.
- **When the agent gets something wrong:** agree the fix, then say "add that as a rule to CLAUDE.md".

## Using it with Codex or Grok

The memory works with any agent, because it is only text files. Two things differ:

- **Startup file.** Codex and Grok read `AGENTS.md` at startup, not `CLAUDE.md`. If the user wants to use them, ask, then create `AGENTS.md` at the top of the business folder containing just: "Read CLAUDE.md in this folder first, and follow it."
- **Commands.** The slash commands are a Claude Code feature. In Codex or Grok, ask in plain words instead, for example: "Run the pickup for acme-plumbing, following .claude/commands/pickup.md." The steps are the same.

The tmux menu starts Claude Code by default. To start a different agent, change the word `claude` in go.zsh to that agent's command.

## Step 10: Finish

1. List every file created.
2. Suggest the first run: start Claude Code in the business folder and type `/pickup <first slug>`.
3. Show the undo steps.

## Undo

Everything lives in one folder:

- Delete the business folder to remove it all, memory included. Copy anything worth keeping first.
- If you added the `source` line to `~/.zshrc`, delete that line.
- tmux and git can stay. They are standard tools and do nothing on their own.
