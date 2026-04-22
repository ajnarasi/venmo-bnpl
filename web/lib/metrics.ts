export type MetricsState = {
  basket: number;
  perPerson: number;
  participants: number;
  approved: number;
  declined: number;
  recovered: number;
  defaulted: number;
  merchantFeeEarned: number;
  tpv: number;
  soloMode: boolean;
};

export const MERCHANT_FEE_RATE = 0.049; // midpoint of 4.5-6% band per PPL PRG §2.1
export const ACTIVATION_FACTOR = 0.5;   // fraction of eligible friends who become new BNPL users

export function emptyMetrics(): MetricsState {
  return {
    basket: 0,
    perPerson: 0,
    participants: 0,
    approved: 0,
    declined: 0,
    recovered: 0,
    defaulted: 0,
    merchantFeeEarned: 0,
    tpv: 0,
    soloMode: false,
  };
}

export function viralK(m: MetricsState): number {
  if (m.soloMode) return 0;
  const eligibleNew = Math.max(0, m.participants - 1);
  const eligibilityRate = m.participants > 0
    ? m.approved / m.participants
    : 0;
  return +(eligibleNew * eligibilityRate * ACTIVATION_FACTOR).toFixed(2);
}

export function merchantFee(basket: number): number {
  return +(basket * MERCHANT_FEE_RATE).toFixed(2);
}

export function installment(perPerson: number): number {
  return +(perPerson / 4).toFixed(2);
}

export function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function formatCurrencyCents(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
