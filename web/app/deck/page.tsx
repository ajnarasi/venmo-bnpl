import { Deck, type Slide } from '@/components/Deck';

export const metadata = { title: 'Deck · Venmo Group Pay Later' };

const slides: Slide[] = [
  /* ---------- 1 / WHAT ---------- */
  {
    kicker: 'What this is',
    title: (
      <>
        A <span className="g">Venmo-native BNPL</span> for how friends actually pay together.
      </>
    ),
    body: (
      <>
        <p>
          One shared purchase. Each friend individually underwritten on a Pay-in-4 plan. The merchant is paid in full
          the moment the group commits. The shared moment becomes an optional, privacy-tiered event in the Venmo feed.
        </p>
        <p>
          This deck is paired with a <strong>clickable six-screen prototype</strong> and an eleven-file PM artifact
          pack — all part of the same submission.
        </p>
        <ul className="bullet-list">
          <li><strong>Per-person underwriting</strong> — no cross-default, no group liability.</li>
          <li><strong>Ask-a-Friend recovery</strong> — before a missed installment triggers a late fee, one-tap P2P nudge to a friend.</li>
          <li><strong>Inherits PayPal Lending, Inc.</strong> — state licenses, Reg Z posture, credit-bureau pipe.</li>
        </ul>
      </>
    ),
  },

  /* ---------- 2 / WHY ---------- */
  {
    kicker: 'Why we’re doing this',
    title: (
      <>
        BNPL is still <span className="g">1:1</span>. Venmo users are not.
      </>
    ),
    body: (
      <>
        <p>
          Every BNPL on the market — Affirm, Klarna, Afterpay, PayPal Pay Later — ships as <em>one consumer, one
          purchase, one plan</em>. That shape matches how those products were born. It does not match how Venmo users
          already behave.
        </p>
        <p>
          Venmo’s most common non-P2P behavior is <strong>splitting a shared cost</strong>: concerts, travel, rent,
          group gifts. The volume is there today. The product primitive is not. The whitespace is the
          intersection of BNPL underwriting and the P2P social graph — and PayPal is the only company that owns both
          sides of that intersection.
        </p>
        <div className="quote-card">
          “None of the 5 BNPL providers in our APM wiki have a P2P graph. Venmo and Cash App have the graph but no BNPL
          primitive. The intersection is uncontested — and PayPal owns both sides.”
          <span className="src">— wiki/concept/bnpl-social-graph.md</span>
        </div>
      </>
    ),
  },

  /* ---------- 3 / BENEFIT ---------- */
  {
    kicker: 'Benefit to Venmo',
    title: (
      <>
        One product, <span className="g">four structural wins.</span>
      </>
    ),
    body: (
      <>
        <div className="slide-grid">
          <div className="stat-card">
            <div className="label">Moat</div>
            <div className="big grad">P2P graph</div>
            <p className="desc">The only BNPL moat no pure-play can copy. Cash App × Afterpay is the one real threat — Venmo + PPL organizational co-ownership is the answer.</p>
          </div>
          <div className="stat-card">
            <div className="label">AOV lift</div>
            <div className="big accent">3.7×</div>
            <p className="desc">Group baskets ($1,050 avg) vs solo BNPL ($280 avg). Merchant pays fee once on the higher basket.</p>
          </div>
          <div className="stat-card">
            <div className="label">Viral CAC</div>
            <div className="big ok">K ≥ 0.4</div>
            <p className="desc">Each group purchase activates 2–5 friends at zero marketing cost. Target: blended CAC ≤ 40% of solo BNPL baseline by month 9.</p>
          </div>
          <div className="stat-card">
            <div className="label">Cohort lock</div>
            <div className="big grad">18–35</div>
            <p className="desc">Venmo core demographic is where BNPL is most penetrated and where PayPal Pay Later underperforms.</p>
          </div>
        </div>
      </>
    ),
  },

  /* ---------- 4 / P&L ---------- */
  {
    kicker: 'Effect on the P&L',
    title: (
      <>
        Contribution-positive by <span className="g">Y1 base case</span>. Levered by two inputs.
      </>
    ),
    body: (
      <>
        <div className="slide-grid">
          <div className="stat-card">
            <div className="label">Y1 TPV · Base</div>
            <div className="big accent">$337M</div>
            <p className="desc">55% group-initiated, 5 pilot merchants live, K=0.4. Grossly $3.6M → $63.5M across bear → bull.</p>
          </div>
          <div className="stat-card">
            <div className="label">Gross revenue</div>
            <div className="big grad">$17.3M</div>
            <p className="desc">Merchant fee @ 4.9% midpoint of PPL band (PPL PRG §2.1) + capped late fees. Fee is not the lever — TPV and losses are.</p>
          </div>
          <div className="stat-card">
            <div className="label">Net credit losses</div>
            <div className="big warn">$12.1M</div>
            <p className="desc">Post Ask-a-Friend recovery @ 20% target. Sensitivity: 10% worse delinquency → −$1.5M contribution.</p>
          </div>
          <div className="stat-card">
            <div className="label">Adjusted contribution</div>
            <div className="big ok">+$1.5M</div>
            <p className="desc">Base case, including viral-CAC savings of $4.0M vs solo BNPL launch baseline. Bull case: +$24.1M.</p>
          </div>
        </div>
        <p style={{ marginTop: 'var(--s-4)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-ink-soft)', letterSpacing: '0.04em' }}>
          ▸ Full model: <code>artifacts/pnl-model.md</code> · bear / base / bull with sensitivity table and what-breaks-it section
        </p>
      </>
    ),
  },

  /* ---------- 5 / ANALYSIS ---------- */
  {
    kicker: 'What analysis I performed',
    title: (
      <>
        Eleven PM artifacts. <span className="g">Four built, seven scaffolded.</span>
      </>
    ),
    body: (
      <>
        <div className="slide-grid">
          <div className="stat-card">
            <div className="label">Core artifacts</div>
            <div className="big grad">04</div>
            <p className="desc">PR/FAQ · P&amp;L model · OKRs &amp; scorecard · 30-60-90 — all built in full, all citing the PayPal Pay Later PRG directly.</p>
          </div>
          <div className="stat-card">
            <div className="label">Scaffolded pack</div>
            <div className="big accent">07</div>
            <p className="desc">Research plan · regulatory checklist · stakeholder map · competitive teardown · pilot-merchant list · A/B roadmap · risk register · sprint-0.</p>
          </div>
          <div className="stat-card">
            <div className="label">Credibility anchor</div>
            <div className="big grad">PPL PRG</div>
            <p className="desc">1,000+ line independently-built Product Requirements Guide for PayPal Pay Later — capability matrix, regulatory posture, state licensing, routing profile.</p>
          </div>
          <div className="stat-card">
            <div className="label">Built in</div>
            <div className="big accent">2 weeks</div>
            <p className="desc">Pitch, artifact pack, clickable prototype, P&amp;L model, OKR tree — the full Senior-Manager-altitude stack a hiring conversation would normally see after onboarding.</p>
          </div>
        </div>
      </>
    ),
  },

  /* ---------- 6 / KPIs ---------- */
  {
    kicker: 'KPIs this prototype already hits',
    title: (
      <>
        Every KR from the scorecard is <span className="g">already instrumented live</span>.
      </>
    ),
    body: (
      <>
        <p>
          The prototype isn&apos;t a deck mockup — it&apos;s a running KPI tree. Click any scenario, watch the right rail:
        </p>
        <ul className="bullet-list">
          <li><strong>Viral coefficient K</strong> — live formula, updates per interaction; falls to 0 in solo-BNPL compare mode.</li>
          <li><strong>Merchant fee earned</strong> — 4.9% midpoint of PPL PRG §2.1 band, tabulated per flow.</li>
          <li><strong>Approved / declined / recovered / defaulted</strong> — counters update with deterministic eligibility animation.</li>
          <li><strong>Social-feed opt-in</strong> — privacy toggle defaults private; guardrail messaging surfaces at &lt;15%.</li>
          <li><strong>Ask-a-Friend recovery</strong> — one-tap recovery, &quot;no late fee, no bureau impact&quot; receipt — the 20% target mechanic, visualized.</li>
          <li><strong>Group vs solo toggle</strong> — shows the uplift the pitch claims, without rhetoric.</li>
        </ul>
        <p style={{ marginTop: 'var(--s-4)' }}>
          Every metric maps 1:1 to the OKR scorecard, which maps to the P&amp;L model, which cites the PPL PRG. Nothing in
          the stack is hand-waved.
        </p>
      </>
    ),
  },
];

export default function DeckPage() {
  return <Deck slides={slides} />;
}
