# A/B Test Roadmap — Venmo Group Pay Later

*Scaffolded. Five named experiments, their hypotheses, and the decisions each unblocks. Full experimental design doc on request.*

## Experiment Portfolio (Y1)

### E1 — Phase 1 Launch Holdout (Q1–Q2)

- **Hypothesis:** Solo Pay in 4 on Venmo drives ≥ X% conversion lift on eligible baskets vs no-BNPL control.
- **Design:** Randomized 50/50 holdout on eligible Venmo users for 90 days.
- **Decision:** Establishes Phase 1 baseline CAC + lift before Group adds a confound.

### E2 — Privacy Default (Phase 2)

- **Hypothesis:** Feed-event default = "friends-only" produces higher opt-in *and* higher K than default = "private" at 90 days.
- **Design:** 3-arm test — private / friends-only / ask-at-confirmation — at 1% cohort.
- **Decision:** Resolves the Skeptic/Critic residual disagreement from the [council transcript](../validation/council-transcript.md) with data.

### E3 — Ask-a-Friend UX Framing (Phase 2 late)

- **Hypothesis:** Copy framed as "optional assist" recovers at ≥ 20% rate with < 5% reported discomfort; copy framed as "friend-in-need" recovers higher but triggers > 10% discomfort.
- **Design:** 4-arm copy test with moderated interview debrief on discomfort signals.
- **Decision:** Locks the Ask-a-Friend production copy before general availability.

### E4 — Group Invite Completion (Phase 2)

- **Hypothesis:** Single-tap group invite (pre-populated amount split) beats multi-step group setup on completion rate by ≥ 25%.
- **Design:** 2-arm UX test at 2% cohort.
- **Decision:** Locks the default Group Setup flow for GA.

### E5 — Merchant Surface (Phase 2–3)

- **Hypothesis:** On-site "Pay Together" messaging at the merchant (like `paypal.Messages` in [PPL PRG §2.1](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) lifts group-initiated transactions by ≥ 15%.
- **Design:** Merchant-side pilot with randomized on-site messaging, 30–60 day measurement window.
- **Decision:** Determines whether Phase 3 in-store + in-app expansion needs a dedicated messaging surface.

## Calendar

- **Q1:** E1 design locked; instrumentation live.
- **Q2:** E1 runs; E2 + E4 designed.
- **Q3:** E2 + E4 run; E3 + E5 designed.
- **Q4:** E3 + E5 run; Y2 plan drafted.

## Governance

- All experiments approved by DS + Legal + UXR before ship.
- Stop rules defined for each (delinquency spikes, UDAAP concerns).
- Weekly results readout during active tests; monthly aggregate to Operating Review.

## Disclaimer

Scaffolded — real A/B roadmap has stat-power calculations, pre-registered hypotheses, and lock-file commitments. Available on request.
