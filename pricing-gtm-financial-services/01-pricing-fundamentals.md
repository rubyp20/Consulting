# 01 — Pricing Fundamentals in Financial Services

> **What you should be able to do after this chapter:** explain why pricing is the highest-return lever in FS and why it's harder than in most industries; structure any pricing problem with the "pricing house"; name and run the core analyses; and explain the maths and the regulatory guardrails.

---

## 1. Why pricing is the most powerful, and most mishandled, lever

The classic reference is Marn & Rosiello, *"Managing Price, Gaining Profit"* (HBR, 1992). They studied roughly 2,400 companies and found that for an average company:

| Lever improved by 1% | Operating profit improvement |
|---|---|
| **Price** | **+11.1%** |
| Variable cost | +7.8% |
| Volume | +3.3% |
| Fixed cost | +2.3% |

**The FS twist, which is worth saying in interviews:** the 11× multiplier comes from an average operating margin of about 9%. Banks and card issuers typically run much higher operating margins (25–45%), so the *multiplier* is lower, roughly 2–4×. The *absolute dollars* are still enormous, because pricing touches every unit of a very large revenue base with almost no incremental cost.

> **Worked example (illustrative).** A card issuer has $2.0bn net revenue and $0.6bn pre-tax profit (30% margin). A 1% improvement in realised price is worth +$20m of revenue, which is +3.3% of profit, with **zero** capex. Compare that with the effort needed to cut $20m of cost.

**Why it's mishandled.** Pricing in banks is often owned by nobody end-to-end. Product sets rack rates, ALCO or Treasury sets funding and deposit rates, Risk sets cut-offs, Sales grants discounts, and Finance reports the result. The result is **price leakage**: the gap between the price you think you charge and the price you actually realise.

---

## 2. What makes FS pricing different: nine "FS twists"

| # | Twist | What it means | Example |
|---|---|---|---|
| 1 | **Price changes *who* buys (adverse selection)** | A higher price attracts riskier or more desperate customers and repels good ones | Raising personal-loan APR by 200 bps keeps volume flat but raises the default rate |
| 2 | **Price is multi-part and often invisible** | The customer "pays" through APR, fees, FX spread, float, forgone interest, and rewards clawback | A remittance marketed as "zero fee" earns everything in the FX spread |
| 3 | **Multi-sided markets** | One side pays, the other side is subsidised | In cards, the merchant pays interchange, which funds the cardholder's rewards |
| 4 | **Relationship and cross-subsidy economics** | Products are priced for the *relationship*, not standalone | Corporate lending below the hurdle rate to win cash-management and FX wallet |
| 5 | **Heavy regulation and conduct rules** | Caps, disclosure, fairness, and non-discrimination | Durbin (US debit), the EU IFR, the CARD Act, fair lending, UK Consumer Duty "fair value", EU instant-payment price parity |
| 6 | **Front book vs back book** | New and existing customers are often priced differently, which creates a "loyalty penalty" | Teaser savings rates. The UK banned price-walking in general insurance (2022), and regulators scrutinise it elsewhere |
| 7 | **Negotiated and discretionary pricing** | In commercial and corporate banking, relationship managers (RMs) can discount | Two similar-sized corporates pay 2–3× different fees for the same service |
| 8 | **Rate-cycle sensitivity** | The cost of funds moves, so loan and deposit prices must be re-set constantly | Deposit "betas" in the 2022–23 hiking cycle and the later cutting cycle |
| 9 | **Long-lived contracts and repricing limits** | You often *can't* reprice existing balances | The CARD Act limits APR increases on existing card balances, fixed-rate mortgages are fixed, and co-brand and processing contracts run 5–10 years |

---

## 3. Three pricing philosophies, and how MBB combines them

| Approach | Definition | FS example | Strength | Weakness |
|---|---|---|---|---|
| **Cost-plus** | Cost + risk + capital + target margin | Loan "floor rate" = funding cost + expected loss + opex + capital charge | Protects margin; auditable | Ignores willingness to pay, so you leave money on the table (or overprice where competition is fierce) |
| **Competition-based** | Price relative to competitors | Deposit rates set at "top-5 in market", merchant MDR matched to a flat-rate fintech | Easy to justify; market-aligned | A race to the bottom; assumes competitors price rationally |
| **Value-based** | Price relative to the value the customer gets vs their next-best alternative | Price an instant B2B payout against the fully loaded cost of a paper cheque, not against ACH | Captures the most value | Needs customer insight; harder to explain internally |

**The MBB synthesis is the "price corridor":**

```
   CEILING ── Economic Value to Customer (EVC) = reference-alternative price + differentiation value
      ▲
      │   ← Target price: share value with the customer so they switch and stay
      │
   REFERENCE ── Competitor or substitute price (what they pay today)
      │
   FLOOR ── Fully loaded cost: funding + expected loss + opex + capital charge (+ fraud, compliance)
```

> **Worked EVC example (illustrative): pricing an instant disbursement for an insurer.**
> - Reference alternative: a paper cheque. Fully loaded cost is about $2–4+ per cheque (printing, postage, reconciliation, escheatment, cheque fraud). Industry surveys vary, so verify.
> - Differentiation value: faster claim closure, higher customer satisfaction and retention, and fewer "where's my money" calls. Say that is worth +$1–3 per claim.
> - EVC ceiling ≈ $3–7. Cost floor (network fee about $0.05, plus fraud, ops, and tech amortisation) ≈ $0.15–0.30.
> - **Target price ≈ $0.50–1.50 per payout.** That is far above an ACH-anchored price (about $0.10–0.25) and still a clear saving for the insurer.
> - The insight: **anchor to what you replace, not to what your rail costs.**

---

## 4. The "pricing house": the structuring framework

Almost every MBB pricing engagement uses some version of this five-layer framework. Use it to structure any case or diagnostic.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. PRICING STRATEGY   Positioning, objectives (share vs margin),    │
│                       role of each product (anchor, loss-leader,    │
│                       profit engine)                                │
├─────────────────────────────────────────────────────────────────────┤
│ 2. PRICE ARCHITECTURE Metrics, tiers, bundles, fences, fee schedule │
│                       design, good-better-best                      │
├─────────────────────────────────────────────────────────────────────┤
│ 3. PRICE SETTING      Levels by segment × risk × channel × product; │
│                       elasticity- and value-based analytics         │
├─────────────────────────────────────────────────────────────────────┤
│ 4. PRICE REALISATION  Discount governance, deal desk, exceptions,   │
│                       waivers, billing accuracy (leakage)           │
├─────────────────────────────────────────────────────────────────────┤
│ 5. ENABLERS           Data and tools, pricing organisation,         │
│                       incentives, MI, committees, regulatory        │
│                       controls                                      │
└─────────────────────────────────────────────────────────────────────┘
```

| Layer | Diagnostic questions | Typical FS findings |
|---|---|---|
| **1. Strategy** | What is each product *for*? Are we priced as a leader, a follower, or a challenger? Do our prices match the brand promise? | "We price mortgages to hit volume targets that Treasury doesn't need." "Our premium card is priced like a mid-tier card." |
| **2. Architecture** | Are we charging on the right metric? Are the tiers coherent? Are there fences to stop cannibalisation? | Fee schedules with 400+ line items, 30% of them unused. No fence between basic and premium FX, so everyone downgrades. |
| **3. Setting** | Are levels grounded in cost, risk, elasticity, and value? How often are they updated? | Loan grids unchanged for 18 months despite 400 bps of rate moves. Deposit rates set by gut feel. |
| **4. Realisation** | What % of list price do we actually capture? Who grants exceptions, and why? | 25–40% of commercial clients on non-standard pricing. Waivers granted and never expired. Services delivered but not billed. |
| **5. Enablers** | Do RMs see profitability at the point of sale? Are incentives aligned? | RMs paid on volume, so they discount to close. No deal-level RAROC tool. No price-exception MI. |

---

## 5. Price metrics in FS: *what* you charge for

Choosing the metric is often more valuable than choosing the level. A good metric scales with the value the customer receives.

| Metric | How it works | Where used | Watch-outs |
|---|---|---|---|
| **Spread / margin** | Rate earned above funding cost | Loans, cards (APR), deposits (inverse), FX | Invisible to the customer, which invites regulatory transparency pressure |
| **Ad valorem (%)** | % of transaction value | Interchange, MDR, FX markup, BNPL merchant fee, AUM fees | Over-charges large tickets, so add caps or tiers |
| **Per-transaction (flat)** | Fixed fee per item | ACH, wires, RTP, per-payout fees | Over-charges small tickets, so use value bands |
| **Fixed + variable** | e.g., 2.9% + $0.30 | Online card acquiring, remittances | Clear, but blunt across segments |
| **Interchange-plus (IC+ / IC++)** | Pass-through cost + fixed markup | Merchant acquiring for mid and large merchants | Transparent, but exposes your margin |
| **Tiered / volume-based** | Unit price falls with volume | Corporate payments, commercial card rebates, FX for corporates | Tier cliffs drive gaming, so prefer incremental tiers |
| **Subscription / membership** | Monthly or annual fee plus lower unit prices | Premium cards (annual fee), SME banking plans, multi-currency accounts | Needs clear value and usage; watch breakage perception |
| **Balance-based (ECR)** | Fees offset by an earnings credit on balances | US commercial account analysis | Its value flips with the rate cycle |
| **Revenue share** | % of revenue shared with a partner | Co-brands, embedded finance, BaaS, ISVs in acquiring | Partner bargaining power erodes your share over time |
| **Performance / outcome-based** | Price tied to an outcome | Sustainability-linked loan margin ratchets, fraud-tool pricing on losses prevented | Hard to measure; disputes |
| **Penalty / behavioural fees** | Late, over-limit, NSF, overdraft | Cards, deposits | Under intense regulatory and political scrutiny ("junk fees") |

---

## 6. The analytics toolkit

### 6.1 Pricing waterfall (realisation)

This shows every step between list price and "pocket" price.

> **Illustrative: a mid-corporate treasury client, annual fee revenue ($k)**
>
> | Step | $k | % of list |
> |---|---|---|
> | Rack-rate value of services used | 1,000 | 100% |
> | − Negotiated discounts | −220 | |
> | − ECR / balance credits | −150 | |
> | − Fee waivers and "temporary" exceptions (never expired) | −80 | |
> | − Services delivered but not billed (billing gaps) | −40 | |
> | **= Pocket revenue** | **510** | **51%** |
>
> **How to use it:** build this for every client, then look at the *distribution*. The typical insight is that realisation ranges from 30% to 90% across similar clients, with no correlation to size or relationship value. That dispersion is the prize.

### 6.2 Price-band / dispersion analysis

Plot the realised price (for example, bps of margin, or fee per transaction) against a driver (client size, loan size, risk grade).

- A **tight band** means disciplined pricing.
- A **wide band with no pattern** means pricing is driven by RM negotiating skill, not value, which signals leakage.
- **Outliers below the band** are candidates for repricing. **Outliers above it** are churn risk, or evidence of pricing power.

### 6.3 Elasticity estimation

**Price elasticity (ε) = % change in quantity ÷ % change in price.**

| Method | How | Best for | Pitfalls |
|---|---|---|---|
| **Historical regression** | Regress volume or take-up on your price relative to competitors, controlling for seasonality and marketing | Deposits, mortgages, and personal loans, where there's rich history | Endogeneity: you cut prices when demand was weak |
| **Natural experiments** | Use past price changes in one region or channel as "treatment" | Branch or regional pricing differences | Confounding events |
| **A/B / champion-challenger** | Randomise offers | Cards (direct mail, digital), personal loans, deposits | Needs volume; conduct and fairness review |
| **Conjoint (CBC)** | Survey-based trade-offs between attributes including price | New products (RTP offer, premium card) | Stated preference ≠ behaviour, so calibrate |
| **Expert / Delphi** | Structured RM and sales judgement | B2B and corporate, where data is thin | Bias toward "customers are price-sensitive" |

**In lending, model the take-up rate as a function of the *rate gap*** (your rate minus the best competitor rate for that risk band). That's more predictive than the absolute rate.

### 6.4 Willingness-to-pay (WTP) research

| Technique | What you ask | Output | Use when |
|---|---|---|---|
| **Van Westendorp (PSM)** | At what price is it (a) too cheap, (b) a bargain, (c) getting expensive, (d) too expensive? | An acceptable price range | Quick early read on a new fee (e.g., a premium card annual fee) |
| **Gabor-Granger** | Would you buy at $X? Then at $Y? | A demand curve, and the revenue-maximising price | A simple single-product price point |
| **Conjoint (choice-based)** | Choose between bundles of features and prices | The part-worth of each feature ($ value) and simulated share | Designing packages (good-better-best), trading off rewards against fee |
| **MaxDiff** | Pick the most and least important of a set of features | A ranking of what matters | Deciding which benefits to put in a premium card or an SME bundle |

### 6.5 Profitability and cost-to-serve

- **Product profitability:** revenue − funds transfer pricing (FTP) cost − expected loss − direct and allocated opex − capital charge.
- **Customer or relationship profitability:** the same thing, aggregated across all products for a client. This is essential for relationship pricing.
- **Activity-based costing (ABC):** cost per payment, per account, per call. It often shows that small clients are unprofitable at current prices.

### 6.6 Competitive benchmarking

- Public rate sheets and fee schedules, broker and aggregator rate tables, mystery shopping, card offer trackers (direct-mail and digital offer intelligence services), and bank rate data providers.
- Build a **"price position map"**: your price vs the market median per product and segment.

### 6.7 Price-volume-mix (PVM) bridge

This decomposes a revenue change into **price** (rate change on like-for-like volume), **volume** (more units at the old price), and **mix** (a shift toward higher- or lower-priced products or segments). Use it to show management whether "growth" is really a rate tailwind or real share gain.

### 6.8 Test-and-learn

Card issuers pioneered this. Capital One's "information-based strategy" ran thousands of controlled tests on APRs, fees, and offers. It's now standard for any digital product: **no big-bang price change without a controlled pilot.**

---

## 7. The maths you should be fluent in

### 7.1 Break-even volume for a price change

This is the most useful formula in any pricing interview.

> **Price increase of Δp (%) with contribution margin CM (%):**
> Maximum volume loss before profit falls = **Δp ÷ (CM + Δp)**
>
> **Price cut of Δp (%):**
> Required volume gain to break even = **Δp ÷ (CM − Δp)**

**Example.** CM = 40%.
- A +5% price rise breaks even if volume falls by no more than 5 ÷ 45 = **11.1%**.
- A −5% price cut needs +5 ÷ 35 = **+14.3%** volume just to break even.

Price cuts almost never pay for themselves unless elasticity is very high.

### 7.2 Optimal markup (Lerner rule)

> **(P − MC) / P = −1 / ε**

If demand elasticity ε = −3, the optimal margin is 33% of price. In FS you rarely apply this directly, but it explains why **price-insensitive segments (e.g., back-book deposits, small SMEs with no treasurer) carry higher margins**.

### 7.3 Lending: optimisation with adverse selection

For each rate *r* offered to a risk segment:

> **Expected profit per applicant = P(take-up | r) × [ Margin(r) − EL(r) − Opex − Capital charge ]**

- P(take-up) falls as *r* rises. That's elasticity.
- EL(r) (expected loss) **rises** as *r* rises, because riskier borrowers are less rate-sensitive.
- So profit is hump-shaped in *r*, and the optimum is lower than naive cost-plus with elasticity would suggest. See [04 — Lending](04-lending.md) for a full worked example.

### 7.4 Deposits: betas

> **Deposit beta = Δ deposit rate ÷ Δ policy rate**

A 40% beta means you passed on 40% of a rate change. The strategic question is *which* balances need a high beta (rate-sensitive, promotional, and wholesale money) and which can stay low (operational, transactional, and sticky retail). Cumulative betas in a cycle usually rise over time as customers wake up.

### 7.5 Customer lifetime value (CLV)

> **CLV = Σ over t [ (Annual margin × retention^t) ÷ (1 + discount rate)^t ] − CAC**

Simplified: **CLV ≈ (annual margin × retention) ÷ (1 + discount − retention) − CAC**.

This is used to justify acquisition pricing, such as promotional APRs, first-transfer-free remittances, and sign-up bonuses.

---

## 8. Behavioural pricing tactics, and the conduct guardrails

| Tactic | How it works | FS example | Conduct risk |
|---|---|---|---|
| **Anchoring** | Show a high reference first | "Normally 3% FX, you pay 0.5%" | Misleading reference prices |
| **Good-better-best (decoy)** | The middle tier looks best value | No-fee, mid, and premium card tiers | Low if tiers have genuine value |
| **Zero-price effect** | "Free" is disproportionately attractive | Free P2P, zero-fee remittance (the spread carries the margin) | "Free" that hides FX or fees |
| **Framing** | Monthly vs annual, % vs $ | "$8/month" vs "$96/year" | Low |
| **Teasers and promos** | An intro rate, then reversion | 0% balance transfer, then standard APR | Back-book fairness (Consumer Duty) |
| **Partitioned or drip pricing** | Split into a base price plus add-ons | Base remittance fee plus a payout fee | High: "junk fee" and drip-pricing scrutiny |
| **Mental accounting** | Points feel different from cash | Rewards currencies with opaque value | Devaluations without notice |
| **Breakage** | Customers don't use all their benefits | Premium-card statement credits ("coupon book") | Perceived-value inflation |
| **Loss aversion** | Fear of losing status or benefits | Tier status, "you'll lose your rate" | Pressure selling |

**Rule of thumb from practice:** behavioural design is fine for *presenting* genuine value. It fails regulatory review when it *obscures* total cost. Under UK Consumer Duty (the "price and value" outcome), you must be able to evidence that the total price is reasonable relative to the total benefit, **per customer segment**.

---

## 9. Pricing governance and operating model

### 9.1 Committees and roles

| Body or role | Remit |
|---|---|
| **ALCO** (Asset-Liability Committee) | Funding cost (FTP), deposit and loan rate strategy, balance-sheet targets |
| **Pricing committee** (by business line) | Rate cards, fee schedules, promos, exceptions above a threshold |
| **Pricing CoE / team** | Analytics, monitoring, tooling, test design |
| **Deal desk** | Real-time support and approval for non-standard B2B deals |
| **Risk and Compliance** | Risk-based pricing inputs, fair-lending testing, conduct and fair-value reviews |
| **Product owners** | Value proposition and architecture |

### 9.2 Delegation-of-authority (DoA) matrix: illustrative for commercial lending

| Approver | Max margin discount vs grid | Min deal RAROC | Fee waivers |
|---|---|---|---|
| RM | up to 10 bps | ≥ hurdle | none |
| Team leader | up to 25 bps | ≥ hurdle − 2 pp | up to 25% of fees |
| Regional head | up to 50 bps | ≥ hurdle − 4 pp | up to 50% |
| Pricing committee / deal desk | > 50 bps | Below hurdle, only with a relationship case | > 50% |

**Design principles:**
1. Exceptions are **time-bound** and expire automatically.
2. Every exception has a **reason code**.
3. **Relationship pricing** must show the *expected* cross-sell, which is then tracked and clawed back if it isn't delivered.
4. RM incentives are tied to **risk-adjusted revenue** (RAROC or economic profit), not volume.

### 9.3 Pricing MI (dashboard metrics)

- Realisation % (pocket ÷ list), by RM, region, and segment
- % of clients or deals on exception pricing; value of waivers; exceptions past expiry
- Price dispersion (for example, the interquartile range of margin in each size and risk band)
- Win rate vs price gap (are we losing on price, or winning too easily?)
- Front-book vs back-book spread (the conduct lens)

### 9.4 Tooling (categories)

- **Bank pricing and billing platforms**, which manage fee schedules, relationship pricing, and billing. Vendors in this space include Zafin, SunTec, and core-banking modules.
- **Price optimisation engines** for loans and deposits. Examples include Earnix, Nomis-type solutions, and in-house models.
- **Deal-pricing and RAROC calculators**, embedded in the CRM or loan-origination system.
- **Merchant pricing engines** in acquiring platforms.

---

## 10. Regulatory guardrails that shape pricing (verify current status)

| Region | Pricing-relevant rules (selected) |
|---|---|
| **US** | *Durbin / Reg II* caps debit interchange for issuers with ≥$10bn assets (a 2023 Fed proposal to lower the cap: verify its status). *CARD Act* limits card repricing, penalty APRs, and late fees. The *CFPB late-fee rule* ($8) was finalised in 2024, blocked, then vacated in 2025. *TILA / Reg Z* covers APR disclosure. *ECOA / Reg B* and fair lending prohibit disparate treatment and disparate impact. *UDAAP* covers unfair or deceptive practices. *State usury laws* matter, including "true lender" issues in bank–fintech partnerships. The *Remittance Transfer Rule* (Reg E subpart B) covers remittances. Periodic legislative proposals: the Credit Card Competition Act, and card APR caps such as 10%-cap bills. |
| **UK** | *Consumer Duty* (2023) requires fair value, price and value outcomes, and evidence for each segment. *APP-fraud mandatory reimbursement* (Oct 2024, up to £85k) moves cost onto payment service providers (PSPs). The *interchange caps* (retained EU IFR levels) and the PSR's cross-border interchange work. FCA scrutiny of savings rates and back-book pricing. |
| **EU** | *Interchange Fee Regulation* caps consumer debit at 0.2% and credit at 0.3%. *Instant Payments Regulation* (2024): instant credit transfers must be priced **no higher than** standard credit transfers (price parity), with send and receive mandates and Verification of Payee. *CBPR2* requires currency-conversion charges to be disclosed as a markup over the ECB reference rate. *CCD2* (Consumer Credit Directive 2) applies from November 2026 and extends to BNPL. *PSD2 → PSD3 / PSR* is in progress. |
| **India** | *Zero MDR* on UPI and RuPay debit person-to-merchant (P2M) payments, with government incentives. PPI interchange (1.1%) on larger wallet-funded UPI merchant payments. RBI digital lending guidelines (APR disclosure, the key fact statement, and restrictions on first-loss default guarantees (FLDG)). |
| **Brazil** | *Pix* is free for individuals by regulation; businesses are charged by their PSPs. Interchange caps on debit and prepaid (2023). |

> **Interview tip:** you don't need every rule. You need to show you *know regulation is a design input*. For example: "Before recommending a late-fee increase I'd check the CARD Act safe-harbour levels and the fair-value evidence we'd need under Consumer Duty."

---

## 11. What "impact" typically looks like

These are directional ranges often quoted in practitioner literature and proposals. Treat them as orders of magnitude, **not** guarantees.

| Engagement type | Typical claimed impact |
|---|---|
| Fee-leakage recovery (commercial and treasury) | 3–10% of addressable fee revenue, mostly from waivers, exceptions, and billing gaps |
| Loan or deposit price optimisation | 5–15 bps of margin on the targeted book, or equivalently a few % of NII on that book |
| Consumer product repricing and re-architecture (cards, accounts) | 2–7% revenue uplift on the product line |
| Merchant repricing (SMB acquiring) | 5–20 bps of net revenue yield, net of churn |
| Commercial excellence (deal desk, DoA, incentives) | 2–5% revenue on the covered book, plus a permanent reduction in price dispersion |

---

## 12. The pricing engagement menu

The detailed playbooks are in [07](07-engagement-playbooks.md).

1. **Pricing diagnostic and leakage:** "Where are we losing money between list and pocket price?"
2. **Product pricing and value-proposition redesign:** "What should our card, account, or SME plan look like and cost?"
3. **Risk-based pricing and optimisation:** "What rate grid maximises risk-adjusted profit within risk appetite?"
4. **Deposit pricing through the rate cycle:** "What beta should we run, by segment?"
5. **New-product and launch pricing:** "How should we price RTP, Pay-by-Bank, or a new FX product?"
6. **Merchant or B2B repricing:** "Can we take +X bps without unacceptable churn?"
7. **Commercial excellence and pricing governance:** "How do we make discipline stick (DoA, deal desk, incentives, tools)?"
8. **Pricing in M&A and due diligence:** "Is the target's pricing power real and sustainable?"
9. **Partnership economics:** "What should we pay, or ask, in a co-brand or embedded-finance deal?"
