# Prototype Pointer

The clickable prototype lives at [`web/`](web/README.md).

## Run locally

```bash
cd web
npm install
npm run dev
# open http://localhost:3000 (or :3300 per .claude/launch.json)
```

## Static export

```bash
cd web
npm run build
# output: web/out/
```

## Deploy to Vercel (one-time, then `vercel --prod`)

```bash
cd web
npm i -g vercel                    # first time only
vercel                             # links to a new Vercel project; deploy to preview
vercel --prod                      # production deploy
```

`vercel.json` is pre-configured for a standalone Next.js static export — no secrets, no env vars, no backend.

## What the prototype demonstrates

1. **Group Setup** — Pay Together CTA, friend picker, per-person split.
2. **Per-Person Eligibility** — live approved/declined animation, one friend declined in default preset, "cover or cancel" fallback.
3. **Purchase Confirmation** — merchant paid in full, per-friend schedules.
4. **Pay Later Tab** — active plans list.
5. **Social Feed Event** — privacy toggle (private default / friends / public with warning).
6. **Ask-a-Friend Recovery** — missed-installment demo, one-tap P2P recovery request, "no late fee, no bureau impact" outcome.

Plus a **Live Unit Economics** panel showing basket, per-person, participants, merchant fee earned, TPV, approvals, declines, recoveries, defaults, and viral K — updated live as the user plays. A **Swap to Solo BNPL** toggle compares against a 1:1 BNPL baseline so the Venmo-specific uplift is visible.

Five preset scenarios: Coachella, AirPods gift, Airbnb + rental car, college-laptop parental assist (hybrid gift + BNPL), and a missed-payment demo that jumps straight to screen 6.
