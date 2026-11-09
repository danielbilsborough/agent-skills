---
name: business-agent-os
description: Set up a business operating system for an AI agent on a Mac, built for business owners who are not developers. One business folder holds a plain-text memory in two layers - a folder per client and per project (state, dated changelog with a monthly archive, to-do, inbox) and a Karpathy-style wiki the agent maintains from your saved sources (topics, people and tools, source summaries, an index and a log, linked for Obsidian) - plus commands to start and end each session (/pickup, /wrap, /biz-status, /biz-review, /trace, /new-client, /ingest, /lint), local save points and an optional tmux go menu. Optimised for Claude Code; also works with Codex, Grok and Hermes. Use when someone wants their agent to remember their business between sessions, or asks to set up an agent operating system.
---

# Business Agent OS

A small operating system for running a business with an AI agent. It suits someone who thinks in business terms, can read a little code, and wants to own every file their agent works from.

Everything is plain Markdown in one folder the user chooses. Nothing runs in the background, nothing is sent anywhere, and the agent asks before every step.

It is optimised for Claude Code in the terminal, and it also works with Codex and Grok, because the memory is just text files any agent can read. See "Using it with Codex, Grok or Hermes" near the end.

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
    archive/           older changelog months, moved here by /wrap (never deleted)
  projects/<slug>/     the same five files, for the owner's own projects
  raw/                 originals you save: articles, transcripts, PDFs, screenshots (never edited)
  wiki/                the knowledge base the agent writes and keeps up to date
    clients/           one outward summary page per client (a hub)
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
- **STATE.md** is the snapshot: where things stand right now, in one to three short paragraphs of plain prose, as you would describe it to a colleague. It is rewritten at every wrap, so it is always current. If two sessions worked on the same client, the wrap merges their news rather than overwriting it.
- **CHANGELOG.md** is the history. Every wrap adds a dated entry at the bottom: one bullet per decision, deliverable or finding, plus that day's save points. Old entries are never changed. Over time it becomes a complete diary of the work. STATE and CHANGELOG each have their own shape so they never repeat each other.
- **archive/** keeps the changelog short. Once a changelog passes about 500 lines, the next wrap moves whole months older than the current one into `archive/CHANGELOG-<year>-<month>.md`. Nothing is deleted, /pickup stays fast, and /biz-review still reads the archive.
- **TODO.md** is what is still open. Anything blocked goes under a `## Now (BLOCKER: <topic>)` heading, and /pickup always shows those first.
- **INBOX.md** is the drop zone. Paste anything in during the day, in any order. The next wrap files each note where it belongs.
- **log/** is a diary for days of work that are not about one client.

### The knowledge base (wiki)
This layer follows Andrej Karpathy's "LLM wiki" idea: you collect the raw material, and the agent writes and maintains a wiki from it.
- **raw/** holds the originals exactly as you saved them: an article, a call transcript, a PDF, a screenshot. Nothing in raw/ is ever edited, so the source of every fact stays checkable.
- **wiki/** is written by the agent. Each thing you save gets a short **source** page. What it teaches goes into **topic** pages (one subject each) and **entity** pages (one person, company, product or tool each).
- Pages link to each other with `[[page-name]]` links. Open the business folder in Obsidian (free) and the links become a clickable map, so you can see how clients, people and ideas connect.
- **index.md** lists every page in one line, so the agent can find anything fast. **log.md** records what was added and when.
- Every wiki page starts with a few lines of details (frontmatter): title, tags, created and updated dates, sources, and a status of stub, active or mature.
- **Source pages** record where each item came from and how it was captured, and summarise only what it says. No opinions are added, so you can always tell your thinking from the source's.
- Topics that are still developing start with a **Current State** block: where we are, open questions, and the next move. It is rewritten each time the topic moves. Add one when a topic keeps coming up, has a decision still open, or you want to pick it up later.
- **Client hub pages** (`wiki/clients/<slug>.md`) are an outward summary of each client for someone arriving cold. They keep one current snapshot, never a pile of old ones; the changelog holds the history.
- When a page links to something that does not exist yet, the agent creates a short stub page so the map has no dead ends.
- **ideas/** is yours. The agent can read and link to it, but never rewrites your words.
- **Graduating lessons.** When the same lesson turns up for two or more clients, it moves into a wiki topic, so every client benefits. The client changelog keeps the original, and the topic links back to it.
- **/ingest** adds something new. **/lint**, about once a month, keeps the wiki healthy: it finds broken links, orphan pages, stale or contradicting facts, and lessons ready to graduate.
- Clients and the wiki work together: the client folders hold what is happening, the wiki holds what you know.
- Each fact has one home, so nothing is written twice and nothing goes out of date in a second place.

### /pickup and /wrap
- **/pickup <client>** is how a session starts. The agent reads that client's files and gives you a short brief in the same order every time: where things stand, blockers, what happened recently, what is open, and the suggested next move. Then it asks what you want to do. You never have to re-explain a client.
- /pickup works three ways: a client or project name, a wiki topic name (it reads that topic's Current State block), or nothing (a general start to the day from the daily log and wiki log).
- **/wrap <client>** is how a session ends. The agent writes the session back into the files: a dated entry in CHANGELOG, a fresh STATE, an updated TODO, the inbox filed away, and any new voice rule from the session into voice.md (voice rules get lost in a changelog). It shows you the changes first. Saying "that's a wrap", "wrap it up" or "let's wrap" works too.
- In Claude Code, pickup and wrap do their reading in a helper agent, so the main session only receives the brief and stays fast.
- Pickup reads, wrap writes. The memory is only as good as the last wrap, so make wrapping a habit.
- When a session gets long, hand it off: /wrap, start a fresh session, /pickup. A fresh session with good notes beats a tired one with a full memory. The go menu makes this one step (see Step 8).

### Looking back
- Because every wrap leaves a dated entry, you can ask at any time: "What did I do on 14 March?", "What did I get done this week?", "When did we agree the new price with this client, and why?" The /biz-review command does this across every client, the log and the save points.
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
- Start a session with `/pickup <slug>` and end it with `/wrap <slug>`. When I say "that's a wrap", "wrap it up" or "let's wrap", run /wrap. `/biz-status` shows everything at once.
- Before working on a client or project, read its CLAUDE.md and STATE.md.
- Before researching something or pulling live data, check `wiki/index.md` and the client's STATE.md and CHANGELOG.md first. The files have the why; live data only has the numbers.
- When something is worth keeping (an article, a call, a lesson), run /ingest so it lands in the wiki.
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

## Step 4: Create the knowledge base and log

Create these folders, each with a one-line `README.md` saying what goes in it:

- `raw/`: "Originals as saved: articles, transcripts, PDFs, screenshots. Name files <topic>-<YYYY-MM-DD>. Never edited."
- `wiki/topics/`: "One page per subject, written and kept current by the agent."
- `wiki/entities/`: "One page per person, company, product or tool."
- `wiki/sources/`: "One summary page per item in raw/."
- `wiki/clients/`: "One outward summary page (hub) per client. One current snapshot only."
- `ideas/`: "My own thinking, in my own words. The agent never rewrites these."
- `log/`: "One file per day (YYYY-MM-DD.md) for work that is not about a client or project."

Also create:

- `wiki/index.md`: `# Index` then the headings `## Topics`, `## Entities`, `## Sources`, each empty.
- `wiki/log.md`: `# Wiki log` then `## <today>` then `- Wiki created.`

Tip for the user: open the whole business folder as a vault in Obsidian to see the `[[links]]` as a map.

## Step 5: Add the first client

Ask for the first client's name. Make a lowercase slug with hyphens (for example `acme-plumbing`) and create `clients/<slug>/` with:

- `CLAUDE.md`: `# <Client name>`, `## Contacts`, `## Key facts`, `## Rules`. Fill in what the user gives you.
- `STATE.md`: `# State`, `Last updated: <today>`, `Just set up.`
- `CHANGELOG.md`: `# Changelog`, `## <today>`, `- Folder created.`
- `TODO.md`: `# To do` and an empty list.
- `INBOX.md`: `# Inbox`, `Paste raw notes below. /wrap files them.`

## Step 6: Add the session commands

Create these eight files in `.claude/commands/` with exactly this content. Explain that they work whenever Claude Code is started inside the business folder.

`.claude/commands/pickup.md`:

```markdown
---
description: Load a client, project or topic and brief me
argument-hint: <slug or topic>
---
Input: $ARGUMENTS.
If you can start a helper agent, do steps 1 and 2 inside one helper and keep only its brief, so the reading stays out of this session.

1. Work out the mode:
   - Client or project: the input matches a folder in clients/ or projects/. Read its CLAUDE.md, STATE.md, TODO.md and INBOX.md, and the last 10 dated entries at the bottom of CHANGELOG.md. List related wiki pages by name only (pages that [[link]] to it, and wiki/clients/<slug>.md if it exists). Do not read their contents.
   - Topic: the input matches a page in wiki/topics/. Read that page, starting with its Current State block, list the pages it links to by name, and read the last two lines in wiki/log.md that mention it.
   - Nothing given: read the last two files in log/ and the last five lines of wiki/log.md.
2. Reply with a brief under 300 words, in this order, leaving out any section that is empty:
   - Current state: one to three sentences of prose
   - Blockers: every item under a "## Now (BLOCKER" heading in TODO.md
   - Recently: at most four bullets, newest first, no repeats of the current state
   - Open: at most six bullets from TODO.md and INBOX.md
   - Related pages: at most three, as [[page-name]] with one line each
   - Suggested next move: one line
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
If you can start a helper agent, do steps 1 to 6 inside one helper and keep only its short report.

1. Look back over the session for: what was done and decided, new voice rules or brand lines I stated, and anything open or blocked.
2. If this folder has save points, list today's with `git log --oneline --since=midnight`. Copy these lines; never recall them from memory.
3. Show me the planned changes, then make them once I say yes:
   - CHANGELOG.md: add a section at the bottom headed with today's date: one bullet per decision, deliverable or finding, then today's save points. Never edit older entries.
   - STATE.md: rewrite as one to three short paragraphs of prose (no bullets) on where things stand, with "Last updated: <today>". If STATE.md changed since this session started (another session wrote it), read it again and merge both sessions' news instead of overwriting.
   - TODO.md: tick off what was finished and add what is still open. Put anything blocked under "## Now (BLOCKER: <topic>)".
   - INBOX.md: move each note to the file where it belongs, then clear the notes you moved.
   - voice.md: file any new voice rule or brand line under "## Rules added", with today's date.
   - The client's own CLAUDE.md: any new stable fact or rule that came up.
   - wiki/clients/<slug>.md: if something material changed, rewrite its current snapshot (one snapshot only).
   - Anything learned that belongs in the wiki: the matching topic page. Work this session that was not about this slug: log/<today>.md.
4. After writing, check every [[link]] you wrote. For any page that does not exist, create a stub page (frontmatter with status: stub and one line saying what it is).
5. If CHANGELOG.md is now longer than about 500 lines, move every whole month older than the current month into archive/CHANGELOG-<YYYY>-<MM>.md (one file per month, entries unchanged, oldest first), and keep the current month in CHANGELOG.md. Never delete an entry.
6. If this folder has save points, make one: `git add -A` then `git commit -m "wrap: <slug>, <today>"`.
7. Report in at most three sentences: what was saved, anything filed to voice.md or the wiki, and the one thing the next session must know.

Only record what actually happened. Never invent.
```

`.claude/commands/biz-status.md`:

```markdown
---
description: One-screen view of every client and project
---
For each folder in clients/ and projects/, read STATE.md and TODO.md and show one line:
<slug>: <one-line state> | <open to-dos> open | last updated <date>

Then list anything marked as blocked or waiting, and any folder not updated in 14 days.
Do not change any files.
```

`.claude/commands/biz-review.md`:

```markdown
---
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

Only report what the files say. Do not change any files.
```

`.claude/commands/ingest.md`:

```markdown
---
description: Add an article, transcript, file or note to the wiki
argument-hint: <file, link or pasted text>
---
Input: $ARGUMENTS. If nothing was given, ask what to add.

1. Save the original into raw/ as <topic>-<YYYY-MM-DD>.md (or keep the file as it is if it is already in raw/). If it is a link, save the page text using your normal web tool. Never edit raw/ files after saving.
2. Create wiki/sources/<same-name>.md. Start it with frontmatter (title, tags, created, updated, sources, status). Then: where it came from, how it was captured (pasted, saved page, transcript, file), the date, and the five to ten points that matter. Summarise only what the source says; add no opinions.
3. For each subject it teaches, extend the matching page in wiki/topics/ (create one with frontmatter if none fits, and refresh its Current State block if it has one). For each person, company, product or tool, add to its page in wiki/entities/. Link pages to each other and to the source with [[page-name]] links.
4. If it relates to a client or project, add a [[link]] to the source in that folder's INBOX.md.
5. Create a stub page for any [[link]] that points nowhere. Add every new page to wiki/index.md (one line each) and a dated line to wiki/log.md.
6. Tell me what you created and what you changed.

Never invent facts that are not in the source. Never rewrite anything in ideas/.
```

`.claude/commands/lint.md`:

```markdown
---
description: Monthly health check of the wiki
---
Read wiki/index.md, then the pages in wiki/ and the recent CHANGELOG.md entries in clients/ and projects/.

Report, without changing anything yet:
1. Broken [[links]] and pages that nothing links to.
2. Pages missing from wiki/index.md, or listed there but missing.
3. Facts that contradict each other, or that look out of date.
4. Lessons that appear for two or more clients and should become a topic page.
5. Topic pages whose Current state block has gone stale.

Then show the fixes you suggest, and make them once I say yes. Add a dated line to wiki/log.md for what you changed.
```

`.claude/commands/trace.md`:

```markdown
---
description: Timeline of how an idea, decision or client theme evolved
argument-hint: <idea, decision or client and theme>
---
Subject: $ARGUMENTS. If none was given, ask.

1. Search CHANGELOG.md in clients/ and projects/ (including each archive/ folder), the wiki pages, wiki/log.md, log/ and ideas/ for every dated mention.
2. Reply with a timeline, oldest first: date, where it was mentioned ([[link]] or file), and one line on what changed.
3. Finish with two lines: where it stands now, and any open question.

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
  local -a rows sessions created
  rows=("${(@f)$(tmux ls -F '#{session_created} #S' 2>/dev/null | sort -nr)}")
  [[ -z "${rows[1]}" ]] && rows=()
  local r
  for r in "${rows[@]}"; do
    created+=("${r%% *}")
    sessions+=("${r#* }")
  done
  echo ""
  echo "Sessions (newest first):"
  local i=1 s age now=$(date +%s)
  for s in "${sessions[@]}"; do
    age=$(( (now - ${created[$i]}) / 60 ))
    if (( age < 60 )); then age="${age}m old"
    elif (( age < 1440 )); then age="$(( age / 60 ))h old"
    else age="$(( age / 1440 )) days old"; fi
    echo "  ${keys[$i]}) $s  ($age)"
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

Optional: to have the menu open every time a new Terminal window opens, they can add this line after it, also themselves:

```zsh
[[ -o interactive && -z "$TMUX" ]] && go
```

5. Explain:
   - Open a new Terminal window and type `go`.
   - Press `+` and type a slug to start a session. Then type `/pickup <slug>`.
   - Leave a session with `Ctrl-b` then `d`. It keeps running. Type `go` to come back.
   - Name each session after its client or project in full, so the menu reads at a glance.
   - Keep one session per client. Two sessions writing the same files will trip over each other.
   - Run `/wrap <slug>` before closing a session for good.
   - Handoff, when a session gets long: run `/wrap <slug>`, leave the session (`Ctrl-b` then `d`), rename it with `tmux rename-session -t <slug> "[old] <slug>"`, then `go`, `+` and the same slug for a fresh session, and `/pickup <slug>`. Close the old one once the new one is going.

## Step 9: The daily habit (give the user this summary)

- **Start of day:** `/biz-status` to see everything, then `go` and pick a client, then `/pickup <slug>`.
- **During the day:** paste anything worth remembering into that client's INBOX.md, or just tell the agent "note this".
- **End of each session:** `/wrap <slug>`.
- **New client:** `/new-client <name>`.
- **Monday:** `/biz-status`, then clear anything blocked.
- **Saw something worth keeping:** `/ingest <link, file or pasted text>`.
- **Friday or month end:** `/biz-review this week` or `/biz-review October` to see what actually got done.
- **Once a month:** `/lint` to keep the wiki tidy and graduate repeated lessons.
- **How did we get here?** `/trace <idea or decision>` for a dated timeline.
- **When the agent gets something wrong:** agree the fix, then say "add that as a rule to CLAUDE.md".

## Using it with Codex, Grok or Hermes

The memory works with any agent, because it is only text files. Two things differ:

- **Startup file.** Codex and Grok read `AGENTS.md` at startup, not `CLAUDE.md`. If the user wants to use them, ask, then create `AGENTS.md` at the top of the business folder containing just: "Read CLAUDE.md in this folder first, and follow it."
- **Commands.** The slash commands are a Claude Code feature. In Codex, Grok or Hermes, ask in plain words instead, for example: "Run the pickup for acme-plumbing, following .claude/commands/pickup.md." The steps are the same.
- **Hermes.** Hermes has its own built-in `/status` and `/review`, which is why these commands are called `/biz-status` and `/biz-review`. In Hermes you can also just ask in plain words, for example "run the pickup for acme-plumbing" or "what did I get done this week?".

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
