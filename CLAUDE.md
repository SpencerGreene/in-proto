# CLAUDE.md

## Critical

- NEVER add "Co-Authored-By" lines or any Claude/AI credit in commits or PRs.

## Project

- Next.js 16 with App Router, TypeScript, Tailwind CSS 4
- UI prototype sandbox — each sub-page is a separate prototype
- No database; front-end only
- To add a new proto: create a folder under `src/app/`, add entry to `protos` array in `src/app/page.tsx`
- Restricted datasets (encrypted): see `data/README.md` for how to edit, add, or change the password
- The dark top bar (ProtoBar) is prototype scaffolding for switching variants/datasets — it is NOT part of the product spec. `spec-portfolio-list.md` covers only the actual product UI, not the proto bar controls.
