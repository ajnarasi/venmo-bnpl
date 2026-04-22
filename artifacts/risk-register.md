# Risk Register — Venmo Group Pay Later

*Scaffolded. Top 15 risks by exposure × likelihood, owner, mitigation, trigger. Full mitigation playbooks on request.*

| # | Risk | Exposure | Likelihood | Owner | Mitigation | Trigger |
|---|---|---|---|---|---|---|
| 1 | State-license inheritance from PayPal Lending, Inc. does not extend to Venmo surface | Critical | Medium | PM + Underwriting Lead | Early (Day 7) legal confirmation; fallback plan of per-state filings | Day 30 if no written confirmation |
| 2 | CFPB post-May-2024 rule tightens on group-invite UDAAP | High | Medium | Legal | Monthly briefing; Phase-2 flex; Ask-a-Friend off-ramp | Any supervisory letter or Federal Register notice |
| 3 | Merchant acceptance at 4.9% fails to reach 5 pilots by Day 60 | High | High | PM + Commerce Platform | Proactive partner sync Day 1; extend pilot window; scope flexibility | Day 45 if < 3 LOIs signed |
| 4 | Correlated default in group cohorts ([business panel](../validation/business-panel.md), [council](../validation/council-transcript.md)) | High | Medium | Risk + DS | Portfolio cap on group-basket share; stress-test model in recession scenario | Any 2-month delinquency pattern above PPL + 80 bps |
| 5 | Social-feed opt-in < 15% | Medium | Medium | Product + Design | Switch to invite-loop-only; revise K target downward | Day 60 post-Phase-2 |
| 6 | Ask-a-Friend reads as coercive in usability testing | High | Medium | Design + UXR | Copy rework; explicit opt-out; UDAAP re-review | Any concept-test discomfort signal > 15% |
| 7 | PayPal Pay Later team reads Venmo BNPL as cannibalization | Medium | Medium | PM + Director | Pre-alignment Week 1; framing as "extends to 18–35" | Any escalation from PPL leadership |
| 8 | Venmo users treat BNPL as a credit card and run up stacked debt | High | Medium | Risk + Design | Eligibility caps; cooling-off period; max-concurrent-plans limit | 30-day data showing 3+ concurrent plans on same user |
| 9 | Block ships Cash App × Afterpay group primitive within 12 months | Medium | Medium | PM | Differentiate on Venmo-specific UX (feed surface, Ask-a-Friend); focus on 18–24 core | Any public Block announcement |
| 10 | Phase 1 slips to Q4 | High | High | PM + Eng Lead | Reframe as two-year thesis; honest Y1 revision; preserve strategic narrative | Day 75 if eng milestones are behind |
| 11 | Credit model validation cycle exceeds 90 days | Medium | Medium | Risk + DS | Early validation kickoff Day 15; parallel-path with PPL model | Day 60 if not in validation |
| 12 | State MTL refresh filings take > 180 days | Medium | Low | Legal | Parallel-file at Day 10; pilot only in states with confirmed coverage first | Day 45 if no state is confirmed |
| 13 | Dispute resolution flow does not satisfy Reg Z billing-error window | High | Low | Legal + Eng | Reuse PPL dispute infrastructure; additional Venmo UX layer only | Any dispute resolution > 60 days in testing |
| 14 | Ask-a-Friend recovery fails to hit 20% target | Medium | Medium | Product | Reframe as prevention UX, not recovery; adjust OKR target | Month 9 measurement |
| 15 | Venmo debit card BNPL stacking causes credit exposure concentration | Low | Low | Risk | Segment BNPL exposure from card exposure; joint risk view | Any overlap > 40% of stacked holders |

## Risk Review Cadence

- **Weekly:** Top 5 live risks reviewed with Product + Risk.
- **Monthly:** Full register reviewed with Finance + Legal at Business Review.
- **Quarterly:** Register rewritten with VP+ at Strategy Review.

## Disclaimer

Scaffolded. Full register has exposure $ estimates, mitigation timelines, named escalation paths, and historical retrospectives. Available on request.
