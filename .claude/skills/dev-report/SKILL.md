---
name: dev-report
description: Generate a dated PDF development report for this repo — session summary, project stats, categorized file changes, observations — rendered via headless Chromium into reports/. Use whenever the user asks for a progress report, dev report, status PDF, "make a report of what we did", "summarize this session as a document", or any request for development work packaged as a shareable file.
---

# Generate a development report PDF

Produces `reports/CyberSpace-Digital-Development-Report-<YYYY-MM-DD>.pdf`. The `reports/` folder is gitignored — these are generated artifacts, not source.

## Gather (all from real commands — never from memory)

- `git status --short`, `git log --oneline -15`, and `git diff --stat` against `main` (or since the last report's date) — this feeds the file-change lists
- Project stats: routes (`ls app/`), section/component counts (`ls components/landing components/work components/ui | wc -l`), test counts (from `pnpm test` output), docs/agents/skills counts
- Session summary: chronological walkthrough of what was asked and delivered this session, written for someone who wasn't there
- Usage/cost numbers **only if the user pasted them** (from `/context` or the usage panel) this session — if they didn't, omit that section entirely; never invent or estimate cost figures

## Build

1. Copy `assets/report-template.html` (bundled next to this file) into the scratchpad and fill its `<!-- SECTION -->`-marked regions: cover meta, numbered sections (Session Summary, Project Stats, Files Changed, Observations — add Usage & Cost only when real numbers exist). Keep its CSS untouched — it's tuned for A4 print with `preferCSSPageSize`.
2. Files Changed uses the four category badges (added/renamed/modified/deleted) — exclude build-artifact churn (`out/`, `.next/`) from the lists; it's noise, not work.
3. Observations section: flags the user should see — stale configs, dead code, uncommitted state, known follow-ups. This is often the most valuable section; don't pad it, but don't skip real flags.

## Render

In a scratchpad directory (never the repo): `npm init -y && npm install puppeteer`, then run the bundled script:

```
node <this-skill-dir>/scripts/render-pdf.mjs <filled>.html <scratchpad>/report.pdf
```

Copy the PDF to `reports/` with the dated filename. Verify before reporting done: extract text back out (`npm install pdf-parse`, v2 API: `new PDFParse({data: buf}).getText()`) and confirm the section headings are present and the page count is sane (4–6 pages typical). Report the final path and page count to the user.
