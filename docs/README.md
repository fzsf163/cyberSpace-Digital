# Docs index

Rules for rebuilding this site into a two-page digital agency site. Split by concern so each subagent (or you) only loads what's relevant — don't read the whole folder for a small task.

| File | Load when you're... | Primary reader |
|---|---|---|
| [codebase-map.md](codebase-map.md) | orienting — finding which file holds what (anchors, exports, data, dead code) | everyone |
| [content-structure.md](content-structure.md) | deciding what page/section a piece of work belongs in | planning |
| [planning.md](planning.md) | scoping a feature/section into a plan | planning |
| [design.md](design.md) | choosing colors, type, spacing, motion | design |
| [component-conventions.md](component-conventions.md) | adding/editing a component | design, code |
| [code.md](code.md) | writing data/logic/routing | code |
| [deployment.md](deployment.md) | anything touching routing, data fetching, or images | code |
| [docker.md](docker.md) | writing/editing Dockerfile, compose.yaml, .dockerignore, or image builds | docker |
| [test.md](test.md) | verifying a change before calling it done | test |

Root-level project facts (commands, current architecture) stay in [CLAUDE.md](../CLAUDE.md) — these docs only cover rules for the agency rebuild.

**Maintenance rule:** any change that adds, renames, deletes, or repurposes a file must update its line in [codebase-map.md](codebase-map.md) in the same change.

## The two pages

- `/` — home page, every section of the site (see content-structure.md for the order)
- `/work` — "view all" page for the works/projects section, linked from the home page's featured-work section

No other pages are in scope unless explicitly requested — don't plan for a blog, CMS, or auth.
