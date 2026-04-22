# P&L Model — Venmo Group Pay Later

*Y1 unit economics with three scenarios (bear / base / bull), sensitivity analysis, and explicit breakdown of what each input assumes. All numbers are pre-application estimates built on public data and the candidate's independent research against PayPal's [Pay Later PRG](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md). Real internal data would refine every row.*

---

## A. Assumptions (grounded, cited)

| Assumption | Value | Source / Reasoning |
|---|---|---|
| Venmo monthly active users | ~90M | Public PayPal investor communications, 2025 cycle |
| BNPL-eligible subset of Venmo MAU (18+, credit-scorable, US) | ~25% → ~22.5M | Industry estimate — roughly matches Affirm's ~19M US user disclosures and Cash App Pay's scale; flag for validation |
| Avg basket — group purchase | $1,050 | Weighted across 4 killer scenarios (Concert $1,200 · Gift $300 · Travel $3,900 · Laptop $1,500) |
| Avg basket — solo Pay-in-4 baseline | $280 | [PPL PRG §1](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md) notes Pay in 4 range $30–$1,500 US; midpoint weighted toward low end ($280) matches industry AOV |
| Merchant fee | 4.9% | Midpoint of 4.5–6% band ([PPL PRG §2.1 Capability Matrix](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) |
| 30-day delinquency baseline — **placeholder** | 4.5% | Affirm FY23 public reporting used as industry anchor; **needs PPL internal baseline for final model** |
| 90-day charge-off baseline — **placeholder** | 2.8% | Industry anchor; **needs PPL internal baseline** |
| "Ask a Friend" recovery rate | 20% | Target per pitch; reduces net credit losses — unproven until post-Phase-2 measurement |
| Viral K | 0.40 base / 0.25 bear / 0.70 bull | Candidate's thesis; no direct comparable benchmark exists for group-BNPL specifically |
| Solo BNPL CAC baseline | ~$20 | Industry-reported blended estimate; PayPal does not disclose BNPL CAC |
| Merchant pilot cohort — Y1 | 5 merchants (base) / 3 (bear) / 10 (bull) | Ticketing, travel, group-gifting categories |

### Critical placeholders flagged (require internal PayPal data to finalize)

1. **PPL 30/90-day delinquency baseline** — single most load-bearing number in the model. Using Affirm anchor until PPL internal.
2. **Venmo MAU → BNPL-eligible cut** — industry estimate; PayPal internal analytics would sharpen.
3. **Solo BNPL CAC for PayPal** — industry blended estimate; PayPal internal marketing attribution would sharpen.
4. **Merchant acceptance rate at 4.9% fee on Venmo surface** — Venmo TPV today is overwhelmingly P2P at zero merchant fee; assuming BNPL-eligible merchants accept the fee is the single largest adoption risk.

---

## B. Y1 Scenario Model

All figures are Y1 totals unless noted. Post-Phase-2 launch assumed mid-Y1.

| Line item | Bear | Base | Bull |
|---|---|---|---|
| Group Pay Later activations (unique users) | 150,000 | 500,000 | 1,400,000 |
| Group purchases executed | 45,000 | 220,000 | 780,000 |
| Avg group size | 3.3 | 3.8 | 4.2 |
| % of TPV that is group-initiated | 30% | 55% | 72% |
| Avg group basket | $850 | $1,050 | $1,250 |
| **Group TPV** | **$38.3M** | **$231M** | **$975M** |
| Solo Pay in 4 activations (co-ships with group) | 120,000 | 380,000 | 900,000 |
| Avg solo basket | $260 | $280 | $300 |
| **Solo TPV** | **$31.2M** | **$106M** | **$270M** |
| **Total TPV** | **$69.5M** | **$337M** | **$1.245B** |
| Merchant fee revenue (4.9%) | $3.4M | $16.5M | $61.0M |
| Late fee revenue (capped) | $0.2M | $0.8M | $2.5M |
| **Gross revenue** | **$3.6M** | **$17.3M** | **$63.5M** |
| Gross credit losses (4.5% of TPV) | $3.1M | $15.2M | $56.0M |
| Recovery via Ask-a-Friend (20% of gross) | $0.6M | $3.0M | $11.2M |
| **Net credit losses** | **$2.5M** | **$12.1M** | **$44.8M** |
| Servicing + disputes ops (~0.5% of TPV) | $0.3M | $1.7M | $6.2M |
| Platform + eng allocation (fixed cost) | $4.0M | $6.0M | $8.0M |
| **Contribution margin** | **−$3.2M** | **−$2.5M** | **$4.5M** |
| CAC savings vs solo BNPL (viral K) | $0.8M | $4.0M | $19.6M |
| **Adjusted contribution (incl. CAC offset)** | **−$2.4M** | **$1.5M** | **$24.1M** |

### Scenario definitions

- **Bear:** Phase 2 slips to Q3; K = 0.25 (privacy default limits loop); only 3 merchant pilots live; delinquency tracks ~30 bps above solo Pay in 4 baseline.
- **Base:** Phase 1 ships Q2, Phase 2 ships Q4; K = 0.40; 5 merchant pilots live; delinquency at parity with solo baseline; Ask-a-Friend recovery hits the 20% target.
- **Bull:** Phase 1 ships Q1, Phase 2 ships Q2; K = 0.70; 10 merchant pilots including one tier-1 ticketing partner; delinquency 20 bps below baseline due to Venmo P2P signal incorporation.

### Timeline sensitivity

The base case assumes Phase 1 ships Q2 2026 — the [council review](../validation/council-transcript.md) explicitly challenges whether this is survivable given PayPal's regulatory review cadence. If Phase 1 slips to Q4, Y1 numbers compress to roughly 40% of base-case values, but the two-year thesis stays intact. This is why the [30-60-90 plan](30-60-90.md) leads with the regulatory and PayPal-Lending-inheritance path in Days 1–30.

---

## C. Sensitivity Analysis

Which input has the highest leverage on contribution margin?

| Input | Elasticity | Implication |
|---|---|---|
| Net credit loss rate (after recovery) | **Highest** — 10% worse delinquency → contribution margin drops by ~$1.5M base case | Ask-a-Friend target ≥20% recovery is the single most important product-side lever |
| Viral K | High — K drop from 0.4 to 0.2 reduces adjusted contribution by ~$2M | CAC avoidance is a real P&L line, not a marketing narrative |
| Merchant pilot count | High at the margin — each additional mature merchant adds ~$3–5M TPV | Commerce Platform partnership is a load-bearing dependency |
| Merchant fee rate | **Low** — within the 4.5–6% band, fee variance moves the model by <10% | Fee negotiation is not the lever to pull |
| Basket size assumptions | Medium — Y1 is activations-bounded, not basket-bounded | More users at medium baskets beats fewer users at high baskets |

**The two levers that dominate the model:** (1) net credit loss rate after Ask-a-Friend recovery, and (2) viral K. Everything else is a second-order effect in Y1.

---

## D. What Breaks This Model

Model is **not robust** to any of these conditions:

- **CFPB adds aggregate-APR or group-disclosure rules before launch.** The May 2024 Interpretive Rule ([PPL PRG §17](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) is the current surface; any tightening on group-invite UDAAP exposure could delay Phase 2 by 6–12 months.
- **Venmo-native merchant acceptance resistance.** The single largest implicit assumption is that BNPL-eligible merchants will accept the 4.9% fee on the Venmo surface. Venmo TPV today is overwhelmingly P2P at zero merchant fee; there is no Venmo "merchant muscle." If Commerce Platform cannot onboard 5 pilot merchants in 12 months, bear case becomes floor.
- **Social-feed opt-in <15%.** If fewer than 15% of Group Pay Later purchasers opt into feed sharing, K collapses toward 0.15 and the CAC-savings line evaporates. Guardrail in the [OKR scorecard](okrs-scorecard.md).
- **Correlated default in group cohorts.** The [business panel](../validation/business-panel.md) and [council](../validation/council-transcript.md) both flagged that friends in the same economic cohort correlate in their default behavior — solo BNPL portfolios diversify across strangers; group BNPL concentrates. The 30/90-day delinquency targets assume uncorrelated defaults; if correlation is material, net credit losses track 10–20% higher than modeled.
- **PayPal Lending, Inc. cannot cleanly inherit state-license coverage to Venmo surface.** The pragmatist critique in the council transcript — this is the single load-bearing Phase-1 premise. If it fails, Y1 timeline slips 12+ months.

---

## E. Disclaimer

This is a pre-application financial model built on public data, industry estimates, and the candidate's independent product research against the [PayPal Pay Later PRG](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md). Four numbers (PPL delinquency baselines, Venmo BNPL-eligible MAU cut, solo BNPL CAC, Venmo merchant acceptance at 4.9%) are industry-anchored placeholders that real internal PayPal data would sharpen. The purpose of the model is not to forecast — it is to show how the thesis translates into unit economics and where the load-bearing assumptions live. Every row is auditable; no number is hand-waved.
