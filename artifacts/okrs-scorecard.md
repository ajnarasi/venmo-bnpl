# OKRs & Scorecard — Venmo Group Pay Later Y1

*Leading and lagging indicators, KPI tree, operating cadence, and the dashboard a real internal review would see. Paired with the [P&L model](pnl-model.md) and the [30-60-90 plan](30-60-90.md).*

---

## Annual Objective

**Establish Venmo as the BNPL surface for shared commerce — ship a credible solo Pay in 4 on Venmo in H1 underwritten by PayPal Lending, Inc., and validate the group primitive at scale in H2 against a measurable credit and viral-CAC baseline.**

---

## 3 Key Results (Y1)

### KR1 — Ship the solo + group primitive to named pilot merchants

- Phase 1 (solo Pay in 4 on Venmo, port of [PayPal Pay Later](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) live with **≥3 design-partner merchants** by end of H1 (base case Q2; bear case Q4 per [P&L bear scenario](pnl-model.md)).
- Phase 2 (Group Pay Later) live under feature flag with **≥2 pilot merchants** in ticketing or travel by end of H2.
- **≥250,000 Group Pay Later activations** cumulatively by month 12 (base case).

### KR2 — Prove the viral-CAC thesis with measurable loop economics

- **Viral coefficient K ≥ 0.4** sustained across Q3 + Q4 post Phase-2 launch, measured as new BNPL activations per group purchase (rolling 30-day window).
- **Blended CAC for Group Pay Later ≤ 40% of solo Pay in 4 baseline** by month 9 — benchmarked against a randomized holdout cohort that receives solo Pay in 4 offers only.
- **Social-feed opt-in rate ≥ 25%** of Phase-2 purchasers (guardrail — if <15%, scale back feed prominence).

### KR3 — Hold credit performance at parity with PPL baseline, prove recovery works

- **30-day delinquency at parity or within 50 bps** of PayPal Pay Later baseline on comparable basket sizes.
- **90-day charge-off within 30 bps** of PPL baseline, measured quarterly starting Q3.
- **Ask-a-Friend recovery rate ≥ 20%** of missed installments recovered via P2P nudge before a late fee lands — first measurable by month 9; confidence interval tightens through Q4.

---

## KPI Tree

```
                North Star: Net Revenue — Group Pay Later
                                   |
                ┌──────────────────┼──────────────────┐
                ▼                  ▼                  ▼
             REVENUE            COSTS            CAC SAVINGS
                │                  │                  │
        ┌───────┼────────┐    ┌────┴────────┐        │
        ▼       ▼        ▼    ▼             ▼        ▼
   Merchant  Late Fees  (Y2+)  Net Credit  Platform  Viral K × Cohort Size
   Fee Rev    (capped)   Data  Losses      Eng / Ops × Solo BNPL CAC
        │                     │
   TPV ×                 Gross Losses − Recovery
   Fee Rate              (4.5% baseline − 20% recovery)
        │
   Activations ×
   Basket ×
   Repeat Rate
```

---

## Leading Indicators (weekly)

| Metric | Target range | Alert threshold |
|---|---|---|
| Friend-invite accept rate | ≥ 60% of invited friends accept | < 40% → UX review |
| Per-friend eligibility approval rate | ≥ 85% of accepted invitees approve | < 70% → underwriting model review |
| Average group size | 3.5–4.5 | < 2.8 → product-market-fit review |
| Social-feed opt-in rate | ≥ 25% of purchasers | < 15% → viral-loop rethink |
| Per-friend abandonment at eligibility | < 15% | > 25% → friction audit |
| Ask-a-Friend nudge conversion | ≥ 20% | < 10% → recovery-UX review |

---

## Lagging Indicators (monthly)

| Metric | Target | Reports to |
|---|---|---|
| 30-day delinquency | ≤ PPL baseline + 50 bps | Risk, Finance, CEO review deck |
| 90-day charge-off | ≤ PPL baseline + 30 bps | Risk, Finance |
| Net credit losses (post-recovery) | ≤ 3.6% of TPV | Finance |
| Merchant repeat-purchase rate | ≥ 45% of pilot merchants retain | Commerce Platform |
| Per-merchant BNPL volume share | Growing MoM | Merchant Success |
| NPS on Group Pay Later purchasers | ≥ +25 | UXR |

---

## Dashboard Mock (what the real internal review would show)

**Tile 1 — TPV by phase:** solo vs group, line chart, MoM rolling.
**Tile 2 — Viral K, 30-day rolling:** single number + sparkline.
**Tile 3 — Merchant pilot status:** grid of pilot merchants with activation date, MoM volume, delinquency snapshot.
**Tile 4 — Credit performance funnel:** invites → accepts → approvals → successful first installment → recovered-via-friend → 30-day-late → 90-day-charge-off.
**Tile 5 — Social-feed opt-in:** % + bar by cohort week.
**Tile 6 — CAC delta:** Group CAC vs solo Pay in 4 CAC, with confidence interval.
**Tile 7 — Ask-a-Friend recovery:** missed installments recovered before fee, % + absolute count.
**Tile 8 — Regulatory risk heatmap:** UDAAP, Reg Z, state license, CCPA — red/yellow/green with date of last legal review.

*The [prototype's live-metrics panel](../web/) models Tiles 2, 3, 6, and 7 in real-time as a design reference. In production, this dashboard lives in Venmo's internal BI stack, updated daily, reviewed weekly.*

---

## Operating Cadence

| Cadence | Meeting | Attendees | What gets decided |
|---|---|---|---|
| **Weekly** | Product Review | PM, Eng Lead, Design Lead, DS | Feature-flag cohort expansion, bug triage, A/B test readouts |
| **Weekly** | Risk & Legal Sync | PM, Risk, Legal | UDAAP review on new copy, delinquency trend review, regulatory-update triage |
| **Biweekly** | Metric Review | PM, Analytics, DS, Finance | Leading indicator readouts, sensitivity checks, KPI tree walks |
| **Monthly** | Business Review | PM, Finance, Merchant Partnerships, Marketing | Merchant pilot expansion, P&L vs plan, CAC delta vs solo baseline |
| **Monthly** | Operating Review | Sr Mgr + Director + VP | KR progress, blocker escalation, cross-org dependency alignment |
| **Quarterly** | Strategy Review | VP + SVP + CEO staff | Phase gate decisions, Y2 roadmap, investment case |

---

## Guardrails (kill switches)

Hard thresholds that force a rethink or scale-back — decided in advance so pressure does not re-write them:

- **30-day delinquency > PPL baseline + 150 bps for 2 consecutive months** → pause Phase 2 cohort expansion.
- **Social-feed opt-in < 15% over first 60 days post-Phase-2** → disable the feed surface by default, return to invite-loop-only acquisition; re-scope Y2 viral thesis.
- **CFPB supervisory contact specifically on Ask-a-Friend UX** → pause Ask-a-Friend nudge, preserve rest of product.
- **Ask-a-Friend conversion < 5% for 3 months** → move recovery out of the scope claim; reframe as default-prevention UX, not a recovery product.

---

## Reporting Artifacts

- **Weekly:** Slack digest to product org — leading indicators, blockers, upcoming decisions.
- **Biweekly:** Metric readout deck (10 slides) — dashboard tiles annotated.
- **Monthly:** Business Review narrative (2 pages) — what moved, what didn't, what decides next month.
- **Quarterly:** Strategy Review (1-pager + appendix) — KR progress, Y2 scope candidates, risk register update.

*All reporting follows a "narrative first, numbers second" convention, matching PayPal's operating style.*
