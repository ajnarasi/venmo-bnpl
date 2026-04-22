# Venmo Group Pay Later

Pre-application PM concept for **PayPal / Venmo — Senior Manager, Product Management (Consumer Financial Services — BNPL)**. Built as a hiring-manager outreach artifact by Ajay Narasimmamoorthy.

## What's here

```
Venmo-Group-PayLater/
├── pitch/
│   ├── v1-original.docx            original 2-page pitch
│   ├── v1-original.md              same, as markdown
│   └── eval_criteria.md            LOCKED binary criteria for the autoresearch loop
├── artifacts/                      PM artifact pack
│   ├── pr-faq.md                   ★ Built — Amazon-style PR + 10-question FAQ
│   ├── pnl-model.md                ★ Built — Y1 P&L with bear/base/bull + sensitivity
│   ├── okrs-scorecard.md           ★ Built — 3 KRs, KPI tree, operating cadence, guardrails
│   ├── 30-60-90.md                 ★ Built — first-90-days from the seat
│   ├── research-plan.md            Scaffold — 8 segments, interview guide, success criteria
│   ├── regulatory-checklist.md     Scaffold — CFPB / UDAAP / state / CCPA / bureau / internal gates
│   ├── stakeholder-map.md          Scaffold — 12 partner roles, first-meeting asks, cadence
│   ├── competitive-teardown.md     Scaffold — Affirm / Klarna / Afterpay / PPL grid + threat model
│   ├── pilot-merchant-list.md      Scaffold — top-5 Y1 merchant candidates + pilot brief
│   ├── ab-test-roadmap.md          Scaffold — 5 named experiments + calendar
│   ├── risk-register.md            Scaffold — top-15 risks with mitigation + triggers
│   └── sprint-0.md                 Scaffold — RICE-scored backlog + launch readiness
├── validation/
│   ├── council-transcript.md       Four-voice dissent (Skeptic · Pragmatist · Critic · in-context)
│   ├── business-panel.md           Nine-expert panel (Christensen / Porter / Drucker / Godin / Kim & Mauborgne / Collins / Taleb / Meadows / Doumont)
│   └── autoresearch-runs/          (reserved for Karpathy 50-round loop output)
└── web/                            Next.js 14 clickable prototype — the hiring-manager deliverable
    ├── app/
    ├── components/
    ├── lib/
    └── README.md                   run/build/deploy commands
```

## How to read this pack

**Hiring manager, 3-minute read**
1. Open the prototype (`web/` — `npm run dev` or the Vercel URL). Click the Coachella preset, page through the six screens, watch the live unit-economics panel.
2. Skim [`pitch/v1-original.md`](pitch/v1-original.md).
3. That's enough to decide.

**Hiring manager, 15-minute read**
- Add [`artifacts/pr-faq.md`](artifacts/pr-faq.md), [`artifacts/pnl-model.md`](artifacts/pnl-model.md), [`artifacts/30-60-90.md`](artifacts/30-60-90.md).
- Then [`validation/council-transcript.md`](validation/council-transcript.md) for the residual disagreements the pitch doesn't resolve on its own.

**Risk / Legal / Finance partner**
- Start at [`artifacts/regulatory-checklist.md`](artifacts/regulatory-checklist.md), [`artifacts/pnl-model.md`](artifacts/pnl-model.md), [`artifacts/risk-register.md`](artifacts/risk-register.md).
- Note the [business panel's](validation/business-panel.md) Taleb + Christensen disagreement — that is the load-bearing strategic tension.

## Credibility anchor

All artifacts cite the [PayPal Pay Later PRG](../PayPal-PayLater/APM-PRG-PayPal-PayLater.md) — Ajay's independently-researched 1,000+ line product requirements guide covering capability matrix, regulatory posture, state licensing, routing profile. The pitch's entire Phase 1 feasibility rests on the "inherit from PPL" claim; the PRG is how that claim is grounded.

## Second-brain integration

This initiative is also ingested into Ajay's APM wiki:
- [`wiki/source/venmo-group-paylater.md`](../wiki/source/venmo-group-paylater.md)
- [`wiki/concept/bnpl-social-graph.md`](../wiki/concept/bnpl-social-graph.md)
- Cross-referenced from `wiki/entity/apm-venmo.md` and `wiki/entity/apm-paypal-paylater.md`

## Disclaimer

All numbers, quotes, and merchant references are pre-application research built on public data and independent engineering work. Nothing here is PayPal-internal material. Real internal data would refine every figure.

— Ajay Narasimmamoorthy · [github.com/ajnarasi](https://github.com/ajnarasi) · ajay.narasimmamoorthy@gmail.com
