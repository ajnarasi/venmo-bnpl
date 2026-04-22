# Venmo Group Pay Later — Prototype

Concept prototype for a pre-application PM deliverable to PayPal. All data simulated, no real payment rails.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build static export

```bash
npm run build
# output: ./out
```

## Deploy to Vercel

```bash
npm i -g vercel   # first time only
vercel            # first deploy creates the project
vercel --prod     # subsequent prod deploys
```

The `vercel.json` at the project root is pre-configured. Everything is client-side — no env vars, no secrets.

## Routes

- `/` — The six-screen interactive prototype with live unit-economics panel.
- `/pitch` — The original pitch doc, rendered.
- `/artifacts` — Index of the PM artifact pack.

## Pair this with

- [../pitch/v1-original.md](../pitch/v1-original.md) — The pitch
- [../artifacts/](../artifacts/) — PR/FAQ, P&L, OKRs, 30-60-90, scaffolded support docs
- [../validation/](../validation/) — Council dissent + business-panel synthesis
- [PPL PRG](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md) — Credibility anchor
