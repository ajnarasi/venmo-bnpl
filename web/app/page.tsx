'use client';

import { useEffect, useMemo, useState } from 'react';
import { SCENARIOS, FRIENDS, perPersonAmount, type Scenario, type Friend } from '@/lib/scenarios';
import { createRng } from '@/lib/rng';
import { merchantFee, installment, formatCurrency, formatCurrencyCents } from '@/lib/metrics';
import { PresetPills } from '@/components/PresetPills';
import { MetricsPanel } from '@/components/MetricsPanel';
import { Avatar } from '@/components/Avatar';

type ElStatus = 'pending' | 'checking' | 'approved' | 'declined';

type Participant = {
  friend: Friend;
  status: ElStatus;
};

const SCREEN_TITLES = [
  '1 · Group Setup',
  '2 · Per-Person Eligibility',
  '3 · Purchase Confirmation',
  '4 · Pay Later Tab',
  '5 · Social Feed Event',
  '6 · Ask-a-Friend Recovery',
];

function friendsFor(scenario: Scenario): Friend[] {
  return scenario.friendIds
    .map((id) => FRIENDS.find((f) => f.id === id))
    .filter((f): f is Friend => Boolean(f));
}

function seedEligibility(scenario: Scenario, participants: Friend[]): ElStatus[] {
  const rng = createRng(scenario.seed);
  // First pass: generate a stable declined index (1 declined for group scenarios > 2 participants)
  const out: ElStatus[] = participants.map(() => 'pending');
  if (participants.length >= 3) {
    const declinedIdx = Math.floor(rng() * participants.length);
    return out.map((_, i) => (i === declinedIdx ? 'declined' : 'approved'));
  }
  return out.map(() => 'approved');
}

type EligibilityResult = {
  approvedFriends: Friend[];
  declinedFriends: Friend[];
};

export default function Page() {
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [screen, setScreen] = useState<number>(scenario.startOnScreen ?? 0);
  const allFriends = useMemo(() => friendsFor(scenario), [scenario]);
  const [selectedIds, setSelectedIds] = useState<string[]>(allFriends.map((f) => f.id));
  const selectedFriends = useMemo(
    () => allFriends.filter((f) => selectedIds.includes(f.id)),
    [allFriends, selectedIds],
  );

  const participantCount = 1 + selectedFriends.length; // you + selected
  const perPerson = perPersonAmount(scenario, participantCount);

  // Eligibility final outcome — set by Eligibility component when its animation settles
  const [elResult, setElResult] = useState<EligibilityResult | null>(null);
  const [soloMode, setSoloMode] = useState(false);

  // Feed + recovery state
  const [privacy, setPrivacy] = useState<'private' | 'friends' | 'public'>('private');
  const [recoveryFriendId, setRecoveryFriendId] = useState<string | null>(null);
  const [recovered, setRecovered] = useState<number>(0);
  const [defaulted] = useState(0);

  // Reset when scenario OR friend-selection changes — both invalidate any prior result
  useEffect(() => {
    setElResult(null);
  }, [scenario.id, selectedIds.join('|')]);

  // Reset the rest on scenario change
  useEffect(() => {
    setSelectedIds(allFriends.map((f) => f.id));
    setScreen(scenario.startOnScreen ?? 0);
    setPrivacy('private');
    setRecoveryFriendId(null);
    setRecovered(0);
    // If preset jumps past eligibility, synthesize a clean all-approved result so metrics show real numbers
    if ((scenario.startOnScreen ?? 0) > 1) {
      setElResult({ approvedFriends: allFriends, declinedFriends: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id]);

  // Live-derived metrics — always reflect current inputs, across every screen
  const metrics = useMemo(() => {
    const basket = scenario.hybrid
      ? scenario.total - scenario.hybrid.giftAmount
      : scenario.total;

    const approvedFriendCount = elResult ? elResult.approvedFriends.length : selectedFriends.length;
    const declinedFriendCount = elResult ? elResult.declinedFriends.length : 0;

    const approved = approvedFriendCount + 1; // + you
    const participants = approved + declinedFriendCount;
    const perPersonMetric = approved > 0 ? basket / approved : 0;

    return {
      basket,
      perPerson: perPersonMetric,
      participants,
      approved,
      declined: declinedFriendCount,
      recovered,
      defaulted,
      merchantFeeEarned: merchantFee(scenario.total),
      tpv: scenario.total,
      soloMode,
    };
  }, [scenario, selectedFriends, elResult, recovered, defaulted, soloMode]);

  // Recovery → bump counter
  function runRecovery() {
    if (!recoveryFriendId) return;
    setRecovered((r) => r + 1);
  }

  // Key that fully remounts screen children when scenario/selection changes
  const flowKey = `${scenario.id}:${selectedIds.join('|')}`;

  return (
    <main className="stage">
      <section className="stage-left">
        <div className="stage-intro">
          <span className="stage-tag"><span className="dot" /> Live · simulated</span>
          <h2 className="stage-head">
            The BNPL product <span className="g">only Venmo can build.</span>
          </h2>
          <p className="stage-hint">
            Tap a scenario. Click through the six screens. Watch the live unit economics update in real time.
          </p>
        </div>

        <PresetPills activeId={scenario.id} onSelect={(s) => setScenario(s)} />

        <div className="phone" aria-label="Venmo app preview">
          <div className="phone-notch" />
          <div className="phone-status">
            <span>9:41</span>
            <span>venmo</span>
            <span>100%</span>
          </div>

          <div className="phone-body">
            <div className="scr-head">
              <h2 className="scr-title">{screenTitle(screen)}</h2>
              <span className="scr-step">{SCREEN_TITLES[screen]}</span>
            </div>

            {screen === 0 && (
              <GroupSetup
                scenario={scenario}
                friends={allFriends}
                selectedIds={selectedIds}
                onToggle={(id) =>
                  setSelectedIds((prev) =>
                    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
                  )
                }
                perPerson={perPerson}
                participantCount={participantCount}
              />
            )}
            {screen === 1 && (
              <Eligibility
                key={flowKey}
                friends={selectedFriends}
                scenario={scenario}
                perPerson={perPerson}
                onSettle={setElResult}
              />
            )}
            {screen === 2 && (
              <Confirmation
                key={flowKey}
                scenario={scenario}
                approvedFriends={elResult?.approvedFriends ?? selectedFriends}
              />
            )}
            {screen === 3 && <PayLaterTab scenario={scenario} />}
            {screen === 4 && (
              <SocialFeed
                scenario={scenario}
                privacy={privacy}
                onPrivacy={setPrivacy}
                selectedFriends={selectedFriends}
              />
            )}
            {screen === 5 && (
              <AskAFriend
                scenario={scenario}
                friends={selectedFriends}
                recoveryFriendId={recoveryFriendId}
                onPick={setRecoveryFriendId}
                recovered={recovered}
                onRecover={runRecovery}
              />
            )}
          </div>

          <div className="scr-nav" role="navigation" aria-label="Screen navigation">
            <button
              className="secondary"
              onClick={() => setScreen((s) => Math.max(0, s - 1))}
              disabled={screen === 0}
              aria-label="Previous screen"
            >
              ← Back
            </button>
            <button
              className="primary"
              onClick={() => {
                if (screen === 5) {
                  // End of flow — reset this scenario and return to the start screen
                  setElResult(null);
                  setRecoveryFriendId(null);
                  setRecovered(0);
                  setPrivacy('private');
                  setScreen(scenario.startOnScreen ?? 0);
                  return;
                }
                setScreen((s) => Math.min(5, s + 1));
              }}
              aria-label={screen === 5 ? 'Start over' : 'Next screen'}
            >
              {screen === 5
                ? 'Start over ↻'
                : screen === 2
                ? 'Open Pay Later tab →'
                : 'Next →'}
            </button>
          </div>
        </div>
      </section>

      <MetricsPanel metrics={metrics} onToggleSolo={setSoloMode} />
    </main>
  );
}

function screenTitle(s: number): string {
  return [
    'Pay Together',
    'Checking eligibility',
    'You’re set',
    'Pay Later',
    'Share this moment',
    'Need help with this payment?',
  ][s];
}

/* ------------------------------------------------------------------ */
/* Screen components                                                  */
/* ------------------------------------------------------------------ */

function GroupSetup({
  scenario,
  friends,
  selectedIds,
  onToggle,
  perPerson,
  participantCount,
}: {
  scenario: Scenario;
  friends: Friend[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  perPerson: number;
  participantCount: number;
}) {
  return (
    <>
      <div className="amount-row">
        <label>Purchase</label>
        <div className="amt">{formatCurrency(scenario.total)}</div>
      </div>
      <p style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
        {scenario.merchant} · {scenario.category}
        {scenario.hybrid && ` · ${scenario.hybrid.giftFromLabel} gifts ${formatCurrency(scenario.hybrid.giftAmount)}`}
      </p>

      <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-mute)', margin: '0 0 var(--space-2)' }}>
        Split with
      </h3>
      <div className="friend-grid">
        {friends.map((f) => (
          <button
            key={f.id}
            className={`friend-chip${selectedIds.includes(f.id) ? ' selected' : ''}`}
            onClick={() => onToggle(f.id)}
            aria-pressed={selectedIds.includes(f.id)}
          >
            <Avatar friend={f} />
            <span className="friend-name">{f.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="split-line">
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Your share
          </div>
          <div className="big">{formatCurrency(perPerson)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pay in 4
          </div>
          <div className="big">{formatCurrencyCents(installment(perPerson))}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)' }}>
            × 4 bi-weekly · {participantCount} people
          </div>
        </div>
      </div>
    </>
  );
}

function Eligibility({
  friends,
  scenario,
  perPerson,
  onSettle,
}: {
  friends: Friend[];
  scenario: Scenario;
  perPerson: number;
  onSettle: (result: { approvedFriends: Friend[]; declinedFriends: Friend[] }) => void;
}) {
  // Final outcome per-friend, deterministic
  const finalStatuses = useMemo<ElStatus[]>(
    () => seedEligibility(scenario, friends),
    [scenario, friends],
  );
  const [statuses, setStatuses] = useState<ElStatus[]>(() => friends.map(() => 'pending'));

  // Animate per-friend: pending → checking → final
  useEffect(() => {
    setStatuses(friends.map(() => 'pending'));
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    (async () => {
      for (let i = 0; i < friends.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, reduce ? 0 : 420));
        if (cancelled) return;
        setStatuses((prev) => {
          if (prev.length !== friends.length) return prev;
          const next = prev.slice();
          next[i] = 'checking';
          return next;
        });
        await new Promise((r) => setTimeout(r, reduce ? 0 : 620));
        if (cancelled) return;
        setStatuses((prev) => {
          if (prev.length !== friends.length) return prev;
          const next = prev.slice();
          next[i] = finalStatuses[i];
          return next;
        });
      }
      if (cancelled) return;
      onSettle({
        approvedFriends: friends.filter((_, i) => finalStatuses[i] === 'approved'),
        declinedFriends: friends.filter((_, i) => finalStatuses[i] === 'declined'),
      });
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const declined = statuses.filter((s) => s === 'declined').length;
  const allSettled = statuses.every((s) => s === 'approved' || s === 'declined');

  return (
    <>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-soft)', marginBottom: 'var(--s-3)' }}>
        Each friend is underwritten individually by PayPal Lending, Inc. No cross-default, no group liability.
      </p>

      <div className="elig-row" aria-label="You">
        <Avatar friend={{ initials: 'YOU', hue: 212 }} size={40} />
        <div className="nm">You · {formatCurrency(perPerson)} share</div>
        <span className="pill approved">APPROVED</span>
      </div>

      {friends.map((f, i) => {
        const s = statuses[i] ?? 'pending';
        return (
          <div key={f.id} className="elig-row">
            <Avatar friend={f} size={40} />
            <div className="nm">{f.name}</div>
            <span className={`pill ${s}`}>{s.toUpperCase()}</span>
          </div>
        );
      })}

      {declined > 0 && allSettled && (
        <div
          style={{
            marginTop: 'var(--s-4)',
            padding: 'var(--s-3)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-warn-soft)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-ink-mute)',
          }}
        >
          <strong>{declined} friend couldn’t be approved.</strong> You can cover their share, or cancel the group
          purchase. The rest of the group stays on their individual plans.
        </div>
      )}
    </>
  );
}

function Confirmation({
  scenario,
  approvedFriends,
}: {
  scenario: Scenario;
  approvedFriends: Friend[];
}) {
  const participants = 1 + approvedFriends.length;
  const basket = scenario.hybrid ? scenario.total - scenario.hybrid.giftAmount : scenario.total;
  const per = basket / participants;
  return (
    <>
      <div className="receipt">
        <div className="receipt-row">
          <span>Merchant</span>
          <strong>{scenario.merchant}</strong>
        </div>
        <div className="receipt-row">
          <span>Category</span>
          <span>{scenario.category}</span>
        </div>
        {scenario.hybrid && (
          <div className="receipt-row">
            <span>{scenario.hybrid.giftFromLabel} gift (one-time P2P)</span>
            <span>{formatCurrency(scenario.hybrid.giftAmount)}</span>
          </div>
        )}
        <div className="receipt-row">
          <span>Paid to merchant in full</span>
          <strong>{formatCurrency(scenario.total)}</strong>
        </div>
        <div className="receipt-row bold">
          <span>Your share (Pay in 4)</span>
          <span>{formatCurrency(per)}</span>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-mute)', marginBottom: 'var(--space-2)' }}>
        Each approved friend gets their own 4-payment schedule. Shown here for you:
      </p>
      <div className="sched-grid" aria-label="Your installment schedule">
        {['May 1', 'May 15', 'May 29', 'Jun 12'].map((d) => (
          <div key={d} className="sched-cell">
            <span className="d">{formatCurrencyCents(per / 4)}</span>
            {d}
          </div>
        ))}
      </div>
    </>
  );
}

type Plan = {
  id: string;
  merchant: string;
  nextLabel: string;
  perInstallment: number;
  totalInstallments: number;
  paidInstallments: number;
  tag?: string;
};

function PayLaterTab({ scenario }: { scenario: Scenario }) {
  const basket = scenario.hybrid ? scenario.total - scenario.hybrid.giftAmount : scenario.total;
  const initialPlans: Plan[] = useMemo(() => [
    {
      id: 'p-scenario',
      merchant: `${scenario.merchant}`,
      nextLabel: 'May 15',
      perInstallment: +(basket / 4).toFixed(2),
      totalInstallments: 4,
      paidInstallments: 1,
      tag: 'group',
    },
    {
      id: 'p-apple',
      merchant: 'Apple · AirPods Max gift',
      nextLabel: 'May 8',
      perInstallment: 12.5,
      totalInstallments: 4,
      paidInstallments: 1,
      tag: 'gift',
    },
    {
      id: 'p-airbnb',
      merchant: 'Airbnb · Bachelorette trip',
      nextLabel: 'May 21',
      perInstallment: 81.25,
      totalInstallments: 4,
      paidInstallments: 2,
      tag: 'travel',
    },
  ], [scenario.merchant, basket]);

  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [openId, setOpenId] = useState<string | null>('p-scenario');
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => { setPlans(initialPlans); setOpenId(initialPlans[0]?.id ?? null); }, [initialPlans]);

  function payEarly(planId: string) {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId && p.paidInstallments < p.totalInstallments
          ? { ...p, paidInstallments: p.paidInstallments + 1 }
          : p,
      ),
    );
    setFlash(planId);
    setTimeout(() => setFlash(null), 1400);
  }

  return (
    <>
      <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-mute)', margin: '0 0 var(--s-2)' }}>
        Active plans
      </h3>
      {plans.map((p) => {
        const remaining = p.totalInstallments - p.paidInstallments;
        const balance = p.perInstallment * remaining;
        const isOpen = openId === p.id;
        const justPaid = flash === p.id;
        const done = p.paidInstallments >= p.totalInstallments;
        return (
          <div key={p.id} style={{ marginBottom: 8 }}>
            <button
              className="plan-row"
              onClick={() => setOpenId(isOpen ? null : p.id)}
              aria-expanded={isOpen}
              aria-controls={`plan-${p.id}-detail`}
              style={{ width: '100%', textAlign: 'left', cursor: 'pointer', borderColor: isOpen ? 'var(--color-line-bright)' : undefined }}
            >
              <div>
                <div className="merchant">{p.merchant}</div>
                <div className="next">
                  {done ? 'Paid in full · thank you' : `Next · ${p.nextLabel} · auto-pay`} ·{' '}
                  {p.paidInstallments}/{p.totalInstallments} paid
                </div>
              </div>
              <div className="balance">{formatCurrencyCents(balance)}</div>
            </button>

            {isOpen && (
              <div
                id={`plan-${p.id}-detail`}
                style={{
                  padding: 'var(--s-4)',
                  background: 'var(--color-surface-1)',
                  border: '1px solid var(--color-line)',
                  borderTop: 'none',
                  borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                  marginTop: -2,
                }}
              >
                <div className="sched-grid" aria-label="Installment schedule">
                  {[0, 1, 2, 3].map((i) => {
                    const isPaid = i < p.paidInstallments;
                    const isNext = i === p.paidInstallments && !done;
                    return (
                      <div
                        key={i}
                        className="sched-cell"
                        style={{
                          background: isPaid
                            ? 'var(--color-ok-soft)'
                            : isNext
                            ? 'var(--color-accent-soft)'
                            : undefined,
                          borderColor: isPaid
                            ? 'rgba(62, 230, 166, 0.35)'
                            : isNext
                            ? 'var(--color-line-bright)'
                            : undefined,
                        }}
                      >
                        <span className="d" style={{ color: isPaid ? 'var(--color-ok)' : isNext ? 'var(--color-accent-bright)' : undefined }}>
                          {formatCurrencyCents(p.perInstallment)}
                        </span>
                        {['May 1', 'May 15', 'May 29', 'Jun 12'][i]}
                        <div style={{ marginTop: 2, fontSize: 9, letterSpacing: '0.1em' }}>
                          {isPaid ? 'PAID' : isNext ? 'NEXT' : 'SCHEDULED'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => payEarly(p.id)}
                  disabled={done}
                  style={{
                    width: '100%',
                    marginTop: 'var(--s-3)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: done ? 'var(--color-surface-2)' : 'var(--grad-brand-b)',
                    color: done ? 'var(--color-ink-soft)' : '#06121B',
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    cursor: done ? 'not-allowed' : 'pointer',
                    boxShadow: done ? 'none' : 'var(--glow-accent)',
                    transition: 'transform 140ms var(--ease-out)',
                  }}
                >
                  {done
                    ? '✓ Plan paid in full'
                    : justPaid
                    ? `✓ Paid ${formatCurrencyCents(p.perInstallment)} early — no penalty`
                    : `Pay ${formatCurrencyCents(p.perInstallment)} now · skip to next installment`}
                </button>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', marginTop: 'var(--s-2)', textAlign: 'center' }}>
                  Early payoff never incurs a penalty. Interest is $0 on Pay-in-4.
                </p>
              </div>
            )}
          </div>
        );
      })}

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', marginTop: 'var(--s-3)' }}>
        Tap any plan to expand the schedule and pay ahead. Auto-pay on scheduled dates; early payoff anytime.
      </p>
    </>
  );
}

function SocialFeed({
  scenario,
  privacy,
  onPrivacy,
  selectedFriends,
}: {
  scenario: Scenario;
  privacy: 'private' | 'friends' | 'public';
  onPrivacy: (p: 'private' | 'friends' | 'public') => void;
  selectedFriends: Friend[];
}) {
  const peopleLabel =
    selectedFriends.length === 0
      ? 'You'
      : selectedFriends.length === 1
      ? `You & ${selectedFriends[0].name.split(' ')[0]}`
      : `${selectedFriends[0].name.split(' ')[0]} & ${selectedFriends.length - 1} others`;

  return (
    <>
      <div className="privacy-toggle" role="radiogroup" aria-label="Privacy level">
        {(['private', 'friends', 'public'] as const).map((p) => (
          <button
            key={p}
            onClick={() => onPrivacy(p)}
            className={privacy === p ? 'active' : ''}
            role="radio"
            aria-checked={privacy === p}
          >
            {p === 'private' && 'Private (default)'}
            {p === 'friends' && 'Friends only'}
            {p === 'public' && 'Public'}
          </button>
        ))}
      </div>

      {privacy === 'private' ? (
        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface-alt)',
            textAlign: 'center',
            color: 'var(--color-ink-soft)',
          }}
        >
          <div style={{ fontSize: 'var(--text-sm)' }}>
            This purchase stays private. Only you see it in the Pay Later tab. No feed event, no dollar amounts shared.
          </div>
        </div>
      ) : (
        <div className="feed-card">
          <div className="feed-line">
            <Avatar friend={{ initials: 'YOU', hue: 212 }} size={28} />
            {selectedFriends[0] && <Avatar friend={selectedFriends[0]} size={28} />}
            {selectedFriends[1] && <Avatar friend={selectedFriends[1]} size={28} />}
            <strong style={{ marginLeft: 'var(--space-1)' }}>{peopleLabel}</strong>
          </div>
          <div className="feed-desc">
            bought <strong>{scenario.merchant}</strong> together
            {scenario.hybrid ? ' · with family assist' : ' · group basket'}.
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', marginTop: 'var(--space-2)' }}>
            {privacy === 'friends' && 'Visible to mutual friends · no amounts shown'}
            {privacy === 'public' && '⚠ Visible to everyone · double-check before sharing financial events publicly'}
          </div>
        </div>
      )}

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', marginTop: 'var(--space-3)' }}>
        Amounts are never shared. Privacy default is private. Guardrail: if <strong>&lt; 15%</strong> of purchasers opt
        in over 60 days, we scale back the feed surface entirely.
      </p>
    </>
  );
}

function AskAFriend({
  scenario,
  friends,
  recoveryFriendId,
  onPick,
  recovered,
  onRecover,
}: {
  scenario: Scenario;
  friends: Friend[];
  recoveryFriendId: string | null;
  onPick: (id: string) => void;
  recovered: number;
  onRecover: () => void;
}) {
  const missedAmount = ((scenario.hybrid ? scenario.total - scenario.hybrid.giftAmount : scenario.total) / (1 + friends.length)) / 4;
  const alreadyRecovered = recovered > 0;
  return (
    <>
      <div className="miss-card">
        <div className="label">Payment failed · before late fee</div>
        <div className="headline">
          Need help with this {formatCurrencyCents(missedAmount)} payment?
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-mute)' }}>
          A friend can cover this installment — you can pay them back. No fee lands. No bureau impact.
          Optional, one-tap.
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-mute)', margin: '0 0 var(--space-2)' }}>
        Pick a friend to ask (confidential):
      </p>
      {friends.map((f) => (
        <button
          key={f.id}
          className={`recovery-friend${recoveryFriendId === f.id ? ' selected' : ''}`}
          onClick={() => onPick(f.id)}
          aria-pressed={recoveryFriendId === f.id}
        >
          <Avatar friend={f} size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{f.name}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)' }}>
              P2P history · often pays back same day
            </div>
          </div>
        </button>
      ))}

      <button
        className="primary"
        style={{
          width: '100%',
          marginTop: 'var(--space-3)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-md)',
          background: alreadyRecovered ? 'var(--color-ok)' : 'var(--color-accent)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 'var(--text-sm)',
        }}
        disabled={!recoveryFriendId || alreadyRecovered}
        onClick={onRecover}
      >
        {alreadyRecovered ? '✓ Recovered · no late fee, no bureau impact' : 'Send request'}
      </button>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-soft)', marginTop: 'var(--space-3)' }}>
        Target: ≥ 20% of missed installments recovered before default. Measurable reduction no other BNPL can show —
        they have no P2P layer. See <code>okrs-scorecard.md</code>.
      </p>
    </>
  );
}
