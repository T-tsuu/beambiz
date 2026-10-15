# AGENTS.md
 
## Project Structure (feature-based)
 
- `src/app/` — routes, layouts, `globals.css`. Top composition layer only.
- `src/features/<feature>/` — one folder per business domain (e.g. `landing/`, `auth/`, `portal/`). Inside a feature, organize files by kind exactly like the shared modules below (`components/`, `hooks/`, `utils/`, `types/`, `constants/`, `lib/`) instead of leaving them flat — but create **only the folders that feature actually needs** (e.g. no `constants/` if it has none). Never import from another feature.
- `src/components/`, `src/hooks/`, `src/utils/`, `src/types/`, `src/constants/`, `src/lib/`, `src/db/` — shared modules used by both `app` and features. Never import from `app` or `features`.
 
Dependency flow is strictly unidirectional: shared → features → app. Component files are named `PascalCase.tsx`. Tests are colocated with their code as `*.test.ts(x)`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
