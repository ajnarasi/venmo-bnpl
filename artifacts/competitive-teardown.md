# Competitive Teardown — Venmo Group Pay Later

*Scaffolded synthesis drawing on Ajay's existing BNPL entity pages in the APM wiki. Full vendor-by-vendor deep-dive available on request — each has a standalone PRG or entity page.*

## Comparison Grid

| Capability | Affirm | Klarna | Afterpay | PayPal Pay Later | Venmo Group Pay Later |
|---|---|---|---|---|---|
| BNPL underwriting stack | Native | Native | Native (Block) | PayPal Lending, Inc. | Inherited from PPL ([PPL PRG §17](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) |
| P2P social graph | — | — | — (Cash App via Block) | — | **Native (Venmo)** |
| Group purchase primitive | — | "Share with friends" link only | — | — | **Designed in** |
| Per-person underwriting in group context | — | — | — | — | **Yes** |
| Pre-default social recovery | — | — | — | — | **Ask-a-Friend** |
| Merchant fee band | 3–7% | 4–6% | 4–6% | 4.5–6% ([PPL PRG §2.1](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) | 4.5–6% |
| State lending licenses | Own footprint | Partner bank | Acquired (Block) | PayPal Lending, Inc. | Inherited |
| Consumer cohort skew | 25–45 | 25–45 | 18–35 | 35+ | **18–35 (Venmo core)** |
| On-site promotional messaging | Prequalify modal | Klarna OSM | Paymessages | `paypal.Messages` ([PPL PRG §2.1](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)) | Venmo-native surfaces |

## What Each Competitor Does Well (and where Group Pay Later differs)

### Affirm
- Strong credit underwriting model, long-basket Pay Monthly option.
- **Weakness:** no P2P layer; CAC is paid-acquisition dependent; weak 18–24 share.
- **GPL differs:** CAC is viral; P2P recovery is native.

### Klarna
- Strong merchant network in EU + US, sophisticated on-site messaging.
- **Weakness:** 1:1 transactions only; "share" is a link, not a group-credit primitive.
- **GPL differs:** group is a credit primitive, not a social share.

### Afterpay (Cash App × Block)
- The closest structural threat — Block owns Cash App (P2P graph) + Afterpay (BNPL).
- **Weakness:** they haven't shipped a group primitive yet; integration is P2P + BNPL side-by-side, not a unified group flow.
- **GPL differs:** integration is intrinsic, not partnership — Venmo and PayPal Pay Later are one company, one data layer, one consumer entity.

### PayPal Pay Later
- The credibility anchor for GPL — its full capability matrix, state license footprint, and Reg Z posture are what GPL inherits ([PPL PRG](../../PayPal-PayLater/APM-PRG-PayPal-PayLater.md)).
- **Weakness:** no social surface, no P2P, 35+ cohort skew.
- **GPL differs:** GPL extends PPL into Venmo's 18–35 cohort + social surface.

## Threat Model

Per the [business panel's Porter analysis](../validation/business-panel.md), Group Pay Later's moat is estimated at ~24 months before a well-executed Block response could replicate ~70% of the UX. The moat is structural (Venmo + PPL organizational co-ownership) but not permanent — the 24-month window is for shipping, not for marketing.

## Disclaimer

Scaffolded synthesis. Per-competitor deep dive lives in [APM wiki entity pages](../../wiki/entity/) — Affirm, Klarna, Afterpay, PayPal Pay Later each have dedicated pages with integration specs, regional footprints, and capability matrices.
