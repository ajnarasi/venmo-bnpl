import Link from 'next/link';

export const metadata = {
  title: 'Pitch · Venmo Group Pay Later',
};

export default function PitchPage() {
  return (
    <div className="doc">
      <p>
        <Link href="/">← back to prototype</Link>
      </p>
      <h1>Venmo Group Pay Later</h1>
      <p>
        <em>A Venmo-native BNPL concept that leverages the one moat no competitor can copy.</em>
      </p>
      <p>
        <strong>Author:</strong> Ajay Narasimmamoorthy · ajay.narasimmamoorthy@gmail.com ·{' '}
        <a href="https://github.com/ajnarasi">github.com/ajnarasi</a>
        <br />
        <strong>For:</strong> PayPal / Venmo — Senior Manager, Product Management (Consumer Financial Services — BNPL)
        <br />
        <strong>Date:</strong> April 2026
      </p>

      <h2>Executive Summary</h2>
      <p>
        Venmo has no native BNPL today, and the obvious path — porting PayPal Pay Later into Venmo — ships a product
        Affirm, Klarna, and Afterpay can match in 90 days. The non-obvious path is to ship the BNPL product only Venmo
        can build: a social-graph-native experience called <strong>Group Pay Later</strong>. One shared purchase, each
        friend on their own 4-installment plan, the group event lives in the Venmo feed. This flips BNPL from a silent
        credit product into a viral commerce loop — driving higher AOV, lower CAC, merchant upside, and a competitive
        moat that depends on exactly the asset pure-plays don’t have.
      </p>

      <h2>The Insight</h2>
      <p>
        Every BNPL on the market today is a 1:1 transaction. That shape matches how Affirm, Klarna, Afterpay, and
        PayPal Pay Later were built. It does not match how Venmo users actually pay for things. The single most common
        Venmo behavior outside P2P reimbursement is splitting a shared cost. A BNPL that meets users where they already
        are becomes the first BNPL with a social acquisition loop built into the product primitive.
      </p>

      <h2>The Product — Six Core Screens</h2>
      <ol>
        <li><strong>Group Setup.</strong> Pay Together CTA, friend picker, per-person split.</li>
        <li><strong>Per-Person Eligibility.</strong> Each friend is individually underwritten. No cross-default.</li>
        <li><strong>Purchase Confirmation.</strong> Merchant paid in full; four independent schedules start.</li>
        <li><strong>Pay Later Tab.</strong> Plans, auto-pay dates, early-payoff.</li>
        <li><strong>Social Feed Event.</strong> Private by default · opt-in friends · optional public.</li>
        <li><strong>Ask-a-Friend Recovery.</strong> Before a missed installment triggers a late fee, one-tap P2P request.</li>
      </ol>

      <h2>Why This Wins</h2>
      <table>
        <thead>
          <tr>
            <th>Lens</th>
            <th>Affirm/Klarna/Afterpay</th>
            <th>PayPal Pay Later ported</th>
            <th>Venmo Group Pay Later</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>P2P graph</td><td>No</td><td>No</td><td><strong>Yes — core asset</strong></td></tr>
          <tr><td>Group purchase primitive</td><td>No</td><td>No</td><td><strong>Yes — killer feature</strong></td></tr>
          <tr><td>Viral acquisition loop</td><td>Weak</td><td>Weak</td><td><strong>Strong (K ≥ 0.4 target)</strong></td></tr>
          <tr><td>18–35 penetration</td><td>Moderate</td><td>Weak</td><td><strong>Strong (Venmo core)</strong></td></tr>
          <tr><td>Social recovery mechanic</td><td>No</td><td>No</td><td><strong>Ask a Friend</strong></td></tr>
          <tr><td>Higher AOV</td><td>No</td><td>No</td><td><strong>Yes — group baskets</strong></td></tr>
        </tbody>
      </table>

      <h2>Why Me</h2>
      <p>
        Two BNPL 0→1 launches: Visa Installments (founding PM — $10M+ incentive deals, $400B healthcare vertical)
        and Bread Financial on Clover (SMB ecosystem — 10% YoY BNPL revenue growth, 20% partner sales lift). Today
        I own global APM product at Fiserv covering 5 BNPL providers (Klarna, Affirm, Afterpay, Sezzle, Zip) across
        55+ payment methods. I ship working code — 15+ GitHub repos including a unified checkout SDK with BNPL
        auth-token patterns. <em>You&apos;re reading one of them right now.</em>
      </p>

      <p>
        <em>Full v1 at{' '}
          <Link href="/">the prototype</Link>; PM artifact pack at{' '}
          <Link href="/artifacts">/artifacts</Link>.
        </em>
      </p>
    </div>
  );
}
