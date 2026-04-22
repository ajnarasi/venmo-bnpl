# Evaluation Criteria — Venmo Group Pay Later Pitch

> **LOCKED.** This file is immutable once committed. The autoresearch loop edits `v1-original.md` → `v2-optimized.md`; it never edits this file. If it did, it would make the test easier instead of the pitch better.

**Target:** `pitch/v1-original.md`
**Winner path:** `pitch/v2-optimized.md`
**Rounds:** 50 (overnight); early-halt if score plateaus for 8 consecutive rounds OR language drifts toward criteria keywords.

---

## Criteria (6 binary pass/fail)

### C1 — Citation density
**Question:** Does every strategic / numeric claim in the doc cite either (a) a specific section of the PayPal Pay Later PRG, (b) a named BNPL competitor PRG in the APM wiki, (c) a public data source, or (d) Ajay's stated prior-role experience?

- **PASS example:** "Merchant fee structure identical to PayPal Pay Later — 4.5–6% per BNPL transaction (see PPL PRG §2.1 capability matrix)."
- **FAIL example:** "Merchant fees are competitive" (no source, no number).

### C2 — JD responsibility coverage
**Question:** Does the doc (or its linked artifact pack) address all 9 Essential Responsibilities from the Senior Manager JD — strategy, architectural roadmap, customer experience, data-gathering mechanisms, analytics/research/competitive workstreams, profitability/budget, operational reviews, cross-functional partnership, agile cadence?

- **PASS example:** Every JD bullet has either a pitch section or a named artifact link. The operational-review bullet is addressed by an `artifacts/okrs-scorecard.md` reference, not silence.
- **FAIL example:** "Operating reviews" appear nowhere; "profitability" is hand-waved without a linked P&L.

### C3 — "Why me" brevity
**Question:** Is the "Why Listen to Me" section ≤ 120 words AND does it include at least 3 quantified outcomes from prior roles?

- **PASS example:** Section ≤ 120 words; cites "$10M+ incentive deals", "10% YoY BNPL revenue growth", "20% partner sales lift".
- **FAIL example:** Section is 200+ words, or only narrative without numbers.

### C4 — Banned-phrase absence
**Question:** Is the doc free of these buzzwords: "synergy", "synergize", "paradigm shift", "disrupt" (as verb), "disruptive" (as adjective unmoored from Christensen definition), "revolutionize", "revolutionary", "game-changing", "game-changer", "leverage" (as verb — OK as noun), "best-in-class", "world-class", "seamless", "frictionless" (outside specific UX-step context), "holistic", "turnkey", "low-hanging fruit"?

- **PASS example:** "This reduces a 4-week reimbursement lag to instant settlement."
- **FAIL example:** "This disruptive, best-in-class solution leverages synergy across the ecosystem."

### C5 — Measurable metrics
**Question:** Does every success metric have (a) a numeric target, (b) a measurement mechanism, and (c) a baseline or comparable reference?

- **PASS example:** "Viral coefficient K ≥ 0.4 in the first 6 months, measured as new BNPL activations per group purchase, benchmarked against Cash App referral K ≈ 0.3."
- **FAIL example:** "High viral growth expected." or "K ≥ 0.4 target" with no measurement mechanism named.

### C6 — Recovery mechanic grounding
**Question:** Does the "Ask a Friend" recovery mechanic have a named delinquency-reduction target tied to PayPal Pay Later baseline data (from the PPL PRG), including what "success" looks like quantitatively?

- **PASS example:** "Target: ≥ 20% of missed installments recovered via Ask a Friend before default, measured against PPL's current 30-day delinquency baseline of X% (PPL PRG §[…])."
- **FAIL example:** "Ask a Friend reduces defaults" (no number, no baseline, no mechanism).

---

## Test Inputs (reader personas — 3 scenarios)

### Input 1 — Hiring Manager, 3-minute read
- Reads Executive Summary + Why This Wins + Why Me only
- Decides: "Is this the signal I want from a Senior Manager candidate?"
- Success: Yes. Clear insight, quantified moat, credible track record.

### Input 2 — Risk / Compliance Partner, skeptical first read
- Reads Underwriting & Risk + Regulatory + What I Would NOT Build first
- Decides: "Does this candidate understand BNPL compliance reality, or is this a naive product pitch?"
- Success: Per-person underwriting is explicit; CFPB / UDAAP / state licensing / CCPA are named; social-graph signal use is disclosed.

### Input 3 — Finance Partner, P&L credibility check
- Reads Monetization & Merchant Upside + Success Metrics + (via link) `artifacts/pnl-model.md`
- Decides: "Do the unit economics hold under realistic assumptions?"
- Success: Fee, TPV, credit-loss, recovery-mitigation numbers are grounded in PPL baseline; 3 scenarios (bear/base/bull) modeled.

---

## Scoring

- Generate 1 evaluation of the current doc per round (this is a single-doc optimization, not multi-output sampling).
- Score each criterion binary (0 or 1). Round score = sum / 6.
- Keep a round only if score strictly increases AND no banned phrase was introduced.
- Revert on regression. Git-tracked.
- Auto-halt if:
  - 8 consecutive rounds with no improvement, OR
  - Score reaches 6/6 and stays there for 3 rounds (converged), OR
  - Doc length grows > 25% from v1 baseline (bloat guard), OR
  - Any criterion keyword appears verbatim in new text in > 2 places (gaming guard).

---

## Rules

- **NEVER** modify this file after initial commit.
- **NEVER** modify the scoring logic.
- **NEVER** add criteria mid-run to "fix" a declining score.
- The autoresearch loop operates on `v1-original.md` → `v2-optimized.md` only. It may read `artifacts/*` for context but must not write there.
- Every round's edit diff + score delta must be committed. Rounds that revert still get a commit (so the history shows the exploration).
