---
name: pr
description: Package the current working-tree changes into a pull request for fzsf163/cyberSpace-Digital using the no-gh-CLI flow — branch off main, logical commits, push, then hand the user a prefilled one-click PR creation link. Use whenever the user says "make a PR", "create a pull request", "open a PR", "ship this", "push this up", or wants current changes on GitHub for review — even if they don't say "PR" explicitly.
---

# Create a PR (no gh CLI)

`gh` is not installed on this machine, and the user has chosen to keep it that way: the PR itself is created by the **user clicking a prefilled link** in their own logged-in browser. Don't reach for `gh`, the GitHub API, or browser automation for the creation step — the link handoff IS the intended flow, not a workaround to escape.

## Steps

1. **Pre-flight.** `git status --short` to see what's shipping. Run `pnpm lint` and `pnpm test` first (docs/test.md checklist) — fix or explicitly flag failures rather than committing them silently. If a PR already exists for this branch, just push the new commits and re-share its URL.
2. **Branch.** Never commit directly to `main`, and **never run `git pull`** — the user syncs their own checkout. Branch from the remote tip so being behind never matters: `git fetch origin && git checkout -b <type>/<kebab-slug> origin/main` (type: `feat`/`fix`/`docs`/`chore`, named for the substance of the change). If uncommitted work sits on an outdated base, `git stash push -u`, create the branch from `origin/main`, then `git stash pop`. Leave local `main` wherever the user has it.
3. **Commit in logical units.** Group related files (e.g. config switch / test setup / docs) into separate commits rather than one blob — it reads better in review — but don't over-split. Message format: imperative summary line, blank line, short body explaining *why*. End every message with:
   ```
   Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
   ```
   Use a heredoc (`git commit -m "$(cat <<'EOF' ... EOF)"`) for multi-line messages.
4. **Push.** `git push -u origin <branch>` — Git's credential manager handles auth (it works even though gh is absent).
5. **Build the prefilled link.** Write a small Node script to a **scratchpad file** and run it — inline `node -e` breaks on backticks/quotes in shell. The script `encodeURIComponent`s a title and markdown body into:
   ```
   https://github.com/fzsf163/cyberSpace-Digital/compare/main...<branch>?quick_pull=1&title=<enc>&body=<enc>
   ```
   Body template: `## What changed` (bullets), `## Why` (a sentence or two), `## Reviewer notes` (verification results with real numbers, known follow-ups deliberately excluded), ending with:
   `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
6. **Hand over.** Present the URL as a markdown link ("Create the pull request →"). Do **not** wrap it in a `<pr-created>` tag — no PR exists until the user clicks, and the tag would render a bogus status card. Ask the user to paste the PR URL back afterward if tracking matters.
