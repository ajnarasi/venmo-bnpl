# Sprint 0 — Venmo Group Pay Later Phase 1 Kickoff

*Scaffolded. RICE-scored backlog for Phase 1 MVP, test strategy, launch readiness checklist. Full sprint-by-sprint plan on request.*

## Sprint 0 Goals (2 weeks)

- Land a signed technical design doc between Product, Eng, Risk, Legal.
- Instrument the core KPI tree end-to-end against a mock pilot.
- Commit Q1 OKRs with Finance + DS.

## Initial Backlog (Phase 1 scope, RICE-scored)

| ID | Item | Reach | Impact | Confidence | Effort | RICE | Sprint |
|---|---|---|---|---|---|---|---|
| BNPL-1 | Solo Pay in 4 checkout on Venmo iOS | 100% Phase 1 cohort | 3 | 90% | XL | Highest | S1–S4 |
| BNPL-2 | Pay Later tab in-app (schedule view + early payoff) | 100% | 3 | 95% | L | High | S2–S4 |
| BNPL-3 | Reg Z disclosures in invite + confirmation | 100% | 3 | 100% | M | High (launch-blocker) | S1–S2 |
| BNPL-4 | PayPal Lending, Inc. state-license inheritance (legal/backend) | 100% | 3 | 70% | XL | High | S1–S3 |
| BNPL-5 | Credit bureau reporting integration | 100% | 3 | 90% | L | High | S3–S4 |
| BNPL-6 | Auto-pay enrollment + consent flow | 100% | 2 | 95% | M | Medium | S2–S3 |
| BNPL-7 | Dispute resolution intake (reuses PPL infra) | 100% | 3 | 85% | M | Medium-High | S2–S4 |
| BNPL-8 | Merchant-side Commerce Hub routing (`venmo-bnpl-v1` profile) | 100% | 3 | 75% | L | Medium-High | S2–S4 |
| BNPL-9 | KPI instrumentation (tiles 1, 2, 4, 5 from [OKR scorecard](okrs-scorecard.md)) | N/A | 2 | 95% | S | High | S1 |
| BNPL-10 | Feature-flag + <1% rollout wiring | 100% | 2 | 100% | S | High | S1 |

*RICE scored on 1–3 scale; effort S/M/L/XL ≈ 1/3/8/21 story points. RICE score column is qualitative-high/medium/low, not numeric, in this scaffolded version.*

## Test Strategy

- **Unit:** all new underwriting + scheduling logic ≥ 80% coverage
- **Integration:** Venmo → PayPal Lending backend contract tests pre-merge
- **E2E:** scripted checkout → schedule → first installment → Pay Later tab view; run per-PR
- **Contract:** Commerce Hub routing profile snapshot tests
- **Regression:** PPL parity tests on shared endpoints (reuse [PPL PRG §2.1](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md) capability matrix)
- **UAT:** 2-week Legal + Compliance UAT window before feature flag unlocks

## Launch Readiness Checklist (abbreviated)

- [ ] All P0/P1 items in `launch-gate-*` epic closed
- [ ] Legal sign-off on copy + disclosures
- [ ] Risk committee sign-off on credit model
- [ ] Compliance sign-off on Reg Z + UDAAP
- [ ] State-license footprint confirmed
- [ ] Merchant pilot LOIs signed (minimum 3)
- [ ] Dashboard live; daily delinquency monitoring on
- [ ] On-call rotation assigned for first 60 days post-launch
- [ ] Rollback plan documented
- [ ] Customer-support runbook written + training complete
- [ ] Comms pre-drafted (merchant-side, consumer-side, internal-side)

## Disclaimer

Scaffolded. Real sprint plan lives in Jira, is team-specific, and involves hundreds of tickets across the 4-person pod scaled to 6. Available on request.
