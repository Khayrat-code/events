# Mobile & fallback QA gate (run after every phase)

The reference site (Kage) ships only if it clears these. `try/` must too.

## Per-phase checks
- [ ] Desktop pass: no layout shift, no horizontal scroll, console clean, no 404s.
- [ ] 390x844 (iPhone 12/13) pass in DevTools device mode.
- [ ] 360x800 (Android) pass.
- [ ] `prefers-reduced-motion: reduce` — full reading experience intact, WebGL off, poster shown.
- [ ] Coarse pointer (touch): no custom cursor, native momentum scroll works, no wheel hijack.
- [ ] Weak-device path (<=4 cores / <=4GB): reduced pixel ratio or static poster, no jank.
- [ ] All assets local + relative paths; no remote fonts/trackers/analytics.
- [ ] Lighthouse mobile on 4x CPU slowdown; keep total under ~1MB, gzipped under ~300KB target.
- [ ] One full scroll pass + one full anchor-nav pass.
- [ ] `npm run lint` + `next build` (typecheck) pass.

## Hard rule
Reduced-motion MUST preserve the complete reading experience. If any phase
breaks the reduced-motion path, that phase is not done.
