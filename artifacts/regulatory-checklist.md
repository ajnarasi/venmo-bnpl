# Regulatory Checklist — Venmo Group Pay Later

*Scaffolded artifact. Full checklist + legal sign-off protocol available on request. Grounded in [PayPal Pay Later PRG §17 Regulatory](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md).*

## CFPB / Reg Z (May 2024 Interpretive Rule)

- [ ] Pay-in-4 classified as "credit card" under Reg Z per May 2024 Interpretive Rule ([PPL PRG §17](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md))
- [ ] APR-equivalent disclosures on invite screen, eligibility screen, confirmation
- [ ] Periodic statements per Reg Z cadence (monthly or at each installment event)
- [ ] Billing error resolution flow ≤ 60 days from consumer inquiry
- [ ] Right to rescission where state law requires
- [ ] Dispute intake for merchant-side chargebacks distinct from consumer-side billing errors

## UDAAP

- [ ] Group invite language legally reviewed — no social pressure, no shaming, no implied cross-default
- [ ] Ask-a-Friend recovery copy reviewed — framed as optional assistance, not obligation; explicit consent each time
- [ ] Feed-event copy reviewed for pattern-of-practice compliance — no amounts disclosed, no payment-status implied
- [ ] Dark-pattern audit on default selections (privacy defaults, recovery consent, auto-pay enrollment)

## State Licensing

- [ ] PayPal Lending, Inc. state MTL coverage confirmed for Venmo surface (not automatic — per [council critique](../validation/council-transcript.md))
- [ ] Refresh filings identified for states where branded consumer surface is MTL-material
- [ ] Interest-rate caps by state respected (relevant for Pay Monthly, less for Pay in 4)
- [ ] Disclosure language variants by state (NY, CA, TX, MA, NJ have unique requirements)

## CCPA / GDPR / Privacy

- [ ] P2P transaction history used as credit signal → consumer disclosure + right to opt out
- [ ] Social-graph data as credit signal deferred to Phase 4 until privacy review complete (Phase 1 does not use graph signals)
- [ ] Data minimization review on feed-event payload
- [ ] Right to delete + data-retention schedule defined for BNPL records (distinct from P2P record retention)

## Credit Bureau Reporting

- [ ] Reporting cadence matches PPL ([PPL PRG §17](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md))
- [ ] Delinquency reporting at 30 and 60 days
- [ ] Consumer dispute handling flow to the bureau

## Internal PayPal Gates

- [ ] Risk committee approval on per-person underwriting model
- [ ] Legal sign-off on Phase 1 invite + confirmation copy
- [ ] Compliance monitoring cadence defined (weekly early, monthly steady-state)
- [ ] Financial crimes / AML review on Venmo BNPL purchases above threshold
- [ ] Internal audit readiness package prepared before pilot launch

## Cadence

- **Pre-launch:** full checklist green, all items signed off by named legal + compliance owners
- **Launch week:** daily compliance stand-up with Risk + Legal
- **Steady state:** monthly review, with a quarterly external-CFPB-update briefing to adjust

## Disclaimer

Scaffolded — real checklist has per-state line items, named internal approvers, and sign-off audit trail. Available on request.
