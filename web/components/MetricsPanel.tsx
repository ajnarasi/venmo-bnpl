'use client';

import { useState } from 'react';
import type { MetricsState } from '@/lib/metrics';
import { viralK, formatCurrency } from '@/lib/metrics';

export function MetricsPanel({
  metrics,
  onToggleSolo,
}: {
  metrics: MetricsState;
  onToggleSolo: (solo: boolean) => void;
}) {
  const [showFormula, setShowFormula] = useState(false);
  const K = viralK(metrics);
  return (
    <aside className="metrics" aria-label="Live unit economics">
      <h2>Live Unit Economics</h2>

      <div className="metric-big" onMouseEnter={() => setShowFormula(true)} onMouseLeave={() => setShowFormula(false)}>
        <div className="k-label">Viral coefficient</div>
        <div className="big">K = {K.toFixed(2)}</div>
        <div className="formula">
          {showFormula
            ? '(participants − 1) × approval rate × 0.5'
            : 'live — updates per interaction'}
        </div>
      </div>

      <div className="metric-row">
        <span className="k">Basket</span>
        <span className="v">{formatCurrency(metrics.basket)}</span>
      </div>
      <div className="metric-row">
        <span className="k">Per-person</span>
        <span className="v">{formatCurrency(metrics.perPerson)}</span>
      </div>
      <div className="metric-row">
        <span className="k">Participants</span>
        <span className="v">{metrics.participants}</span>
      </div>
      <div className="metric-row">
        <span className="k">Merchant fee (4.9%)</span>
        <span className="v ok">{formatCurrency(metrics.merchantFeeEarned)}</span>
      </div>
      <div className="metric-row">
        <span className="k">Running TPV</span>
        <span className="v">{formatCurrency(metrics.tpv)}</span>
      </div>
      <div className="metric-row">
        <span className="k">Approved</span>
        <span className="v ok">{metrics.approved}</span>
      </div>
      <div className="metric-row">
        <span className="k">Declined</span>
        <span className="v">{metrics.declined}</span>
      </div>
      <div className="metric-row">
        <span className="k">Recovered (Ask-a-Friend)</span>
        <span className="v ok">{metrics.recovered}</span>
      </div>
      <div className="metric-row">
        <span className="k">Defaulted</span>
        <span className="v err">{metrics.defaulted}</span>
      </div>

      <div className="mode-switch" role="group" aria-label="Comparison mode">
        <button
          className={!metrics.soloMode ? 'active' : ''}
          onClick={() => onToggleSolo(false)}
          aria-pressed={!metrics.soloMode}
        >
          Group mode
        </button>
        <button
          className={metrics.soloMode ? 'active' : ''}
          onClick={() => onToggleSolo(true)}
          aria-pressed={metrics.soloMode}
        >
          Solo BNPL (compare)
        </button>
      </div>

      <div className="note">
        Fee rate midpoint of 4.5–6% band per <strong>PayPal Pay Later PRG §2.1</strong>. Viral K collapses to 0 in solo
        mode because no secondary activations occur. All numbers simulated.
      </div>
    </aside>
  );
}
