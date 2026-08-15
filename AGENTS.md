# Working notes for this project (try/ — cinematic rebuild of the landing)

## Run commands
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck/build: `next build` (or `npm run build`)
- Static preview after build: `npm run start`

## Scope
Rebuild the **landing only** (`app/page.tsx`) as a Kage-style scroll-driven
Three.js cinematic experience. Leave `app/admin`, `app/complaints`,
`app/contact` and the Supabase booking flow untouched and working.

## Architecture decision (deliberate deviation from Kage brief)
Keep Next.js as host. Three.js r149 is installed as a local npm dep
(`three@0.149.0`) so it bundles — no runtime CDN, works under Vercel root
and subpaths. The "no framework / single static file" rule is deliberately
relaxed to preserve the existing Supabase routes.

## QA gate
See `MOBILE_QA.md` — run after every phase. Reduced-motion path is mandatory.
