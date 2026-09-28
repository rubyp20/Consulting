# 04 — Lending: Economics, Pricing & GTM

> **What you should be able to do after this chapter:** build a risk-based price from first principles; explain why price optimisation in lending must account for adverse selection; compute a deal RAROC with and without relationship value; explain deposit betas; and lay out the lending GTM plays across consumer, SME, and corporate.

---

## 1. The product landscape

| Segment | Products | Pricing style |
|---|---|---|
| **Consumer, secured** | Mortgages (fixed, variable, ARM), HELOC, auto loans and leases | Rate sheets tied to market funding (swaps, MBS), risk-based adjustments, broker and dealer channels |
| **Consumer, unsecured** | Personal installment loans, credit cards (see [03](03-cards.md)), overdraft, BNPL / POS finance, student loans, credit-builder loans | Risk-based APR grids; promotional pricing; merchant-funded (BNPL) |
| **SME / small business** | Term loans, lines of credit, overdrafts, government-guaranteed loans (e.g., SBA in the US), invoice finance, asset finance, merchant cash advance / revenue-based finance | Relationship pricing; risk-grade grids; fees (arrangement, commitment) |
| **Commercial & corporate** | Revolving credit facilities (RCF), term loans, syndicated loans, CRE, leveraged finance, trade and supply-chain finance | RAROC-based deal pricing; negotiated spreads plus fees; relationship returns |

**The structural trend to know:** a growing share of lending is **originated by banks and fintechs but funded by others** (private credit funds, insurers, securitisation, forward-flow agreements). This shifts GTM toward "originate-to-distribute" and makes pricing depend on what *investors* will pay for the assets.

---

## 2. Loan economics: the risk-based price build-up

### 2.1 The building blocks

```
  Customer rate  =  Funding cost (FTP)
                  + Expected loss (PD × LGD)                ← annualised
                  + Operating cost (origination + servicing)
                  + Capital charge (capital × (hurdle − funding benefit))
                  = FLOOR (break-even at hurdle return)
                  + Commercial margin  ← set by competition, elasticity, relationship value
```

| Component | What it is | Who owns it in a bank |
|---|---|---|
| **FTP (funds transfer pricing)** | The internal cost of funding a loan of that tenor and repricing profile | Treasury / ALM |
| **PD (probability of default)** | Likelihood of default within a year | Credit risk models |
| **LGD (loss given default)** | % of exposure lost after recoveries | Credit risk models |
| **EAD (exposure at default)** | Balance at default (matters for lines) | Credit risk models |
| **Opex** | Origination (marketing, underwriting, broker commission) + servicing and collections | Finance / cost allocation |
| **Capital charge** | Equity held against the loan × the excess return shareholders need | Finance / capital management |

### 2.2 Worked example: an unsecured personal loan (illustrative)

$15,000, 36 months, prime applicant (risk band B).

| Component | Value (% p.a.) | Calculation |
|---|---|---|
| FTP (matched-maturity funding) | 4.50% | Treasury curve for a 3-year amortising loan |
| Expected loss | 2.13% | Annual PD 2.5% × LGD 85% |
| Opex | 1.50% | Origination ~1.0% (amortised) + servicing 0.5% |
| Capital charge | 0.95% | 10% capital × (14% cost of equity − 4.5% funding benefit) |
| **Floor rate** | **9.08%** | Break-even at the hurdle return |
| Best competitor rate for this band | 10.9% | Benchmarking |
| **Offered APR** | **10.99%** | Floor + ~190 bps margin, priced at the market |

### 2.3 From one price to a grid (illustrative)

Using the same FTP (4.5%), opex (1.5%), capital charge (0.95%) and LGD (85%):

| Risk band | Annual PD | EL | **Floor** | Market rate | **Offered APR** | Margin over floor |
|---|---|---|---|---|---|---|
| A | 1.0% | 0.85% | 7.80% | 8.9% | 8.99% | 1.2 pp |
| B | 2.5% | 2.13% | 9.08% | 10.9% | 10.99% | 1.9 pp |
| C | 5.0% | 4.25% | 11.20% | 14.5% | 13.99% | 2.8 pp |
| D | 9.0% | 7.65% | 14.60% | 19.9% | 18.99% | 4.4 pp |
| E | 15.0% | 12.75% | 19.70% | 25%+ | Decline, or 24.99% with a lower amount and shorter term | Thin; high volatility |

The real grid adds dimensions: **loan amount** (fixed costs matter more on small loans), **term**, **channel** (aggregator vs direct vs existing customer), and **relationship**. All of them are subject to conduct and fair-lending testing.

> **Conduct note:** charging existing, loyal customers *more* than new aggregator-sourced customers for the same risk (a "loyalty penalty") is a red flag under the UK Consumer Duty and increasingly elsewhere. Channel-based differences must be justified by genuine cost or risk differences.

---

## 3. Price optimisation with adverse selection: the key insight

Naive optimisation treats risk as fixed. In reality, **a higher rate changes who accepts**: better-quality applicants have more options and walk away, while riskier ones stay.

### Worked example (illustrative): band B, 10,000 approved applicants

Costs excluding EL = FTP 4.5% + opex 1.5% + capital 0.95% = **6.95%**.

| Offered APR | Take-up rate | Annual PD of those who accept | EL (× 85%) | Net margin (APR − 6.95% − EL) | **Profit index** (take-up × net margin) |
|---|---|---|---|---|---|
| 9.99% | 62% | 2.3% | 1.96% | 1.08% | 0.67 |
| 10.99% | 55% | 2.5% | 2.13% | 1.91% | 1.05 |
| **11.99%** | **45%** | **2.8%** | **2.38%** | **2.66%** | **1.20** ← optimum |
| 12.99% | 34% | 3.2% | 2.72% | 3.32% | 1.13 |

**If you had assumed PD fixed at 2.5%**, 12.99% would look best: 0.34 × (6.04 − 2.13) = 1.33, vs 1.31 at 11.99%. So you would overprice, and in practice you'd see losses above plan.

**The management trade-off is not just "max profit":**
- 11.99% maximises profit but books 4,500 loans.
- 10.99% gives 5,500 loans (+22% volume) for ~12% less profit.
- The right answer depends on strategy (share vs return), capital, and funding. MBB teams present this as an **efficient frontier** of volume vs risk-adjusted profit, so leadership can choose a point on it explicitly.

### How a price-optimisation build works (the typical 12–16-week engagement)

1. **Data:** 2–3 years of quotes, including *non-accepted* offers (this is essential), competitor rates, risk scores, outcomes.
2. **Models:**
   - A take-up (demand) model: logistic regression or gradient boosting on the rate gap vs competitors, the channel, the amount, and risk.
   - A risk model conditional on price (adverse selection).
   - Profitability per loan (NPV or RAROC).
3. **Optimiser:** maximise expected NPV subject to constraints: volume target, risk appetite (maximum expected loss), fair lending (no use of protected characteristics, and disparate-impact testing on outcomes), price-move limits (no more than ±X bps per change), and monotonicity (a worse risk band never gets a better price).
4. **Output:** a rate grid, discretion bands for sales or brokers, and a re-pricing cadence (weekly or monthly).
5. **Pilot:** champion-challenger by region or channel for 8–12 weeks.
6. **Industrialise:** embed the grid in the loan origination system; model risk management (validation, documentation, monitoring).

---

## 4. Commercial and corporate: deal pricing and RAROC

### 4.1 The RAROC formula

> **RAROC = (Revenue − Opex − Expected Loss + Return on capital) × (1 − tax) ÷ Economic Capital**

A deal passes if RAROC ≥ the hurdle (commonly 12–15%, depending on the bank's cost of equity).

### 4.2 Worked example (illustrative): a $20m, 5-year term loan to a mid-corporate

| Item | Standalone @ 175 bps | RM request @ 125 bps |
|---|---|---|
| Spread over FTP | 1.75% → $350k | 1.25% → $250k |
| Upfront fee 50 bps, amortised | 0.10% → $20k | $20k |
| **Revenue** | **$370k** | **$270k** |
| Expected loss (PD 0.4% × LGD 40% = 0.16%) | −$32k | −$32k |
| Opex (0.30%) | −$60k | −$60k |
| Return on capital (EC $1.2m × 4%) | +$48k | +$48k |
| Pre-tax | $326k | $226k |
| After tax (25%) | $245k | $170k |
| Economic capital (6% of exposure) | $1.2m | $1.2m |
| **RAROC** | **20.4%** | **14.1%** |

**Now add the relationship.** The client will also move its operating accounts and payments to the bank:
- Cash management fees: +$150k a year
- Operating deposits of $10m at a 2.0% net margin: +$200k a year
- Capital for these ancillaries is small.

Relationship RAROC at 125 bps: after-tax profit ≈ $170k + ($350k × 0.75) ≈ $432k, and capital ≈ $1.3m, so **RAROC ≈ 33%**.

**The governance point:** approve the 125-bps loan *only* with a documented cross-sell commitment, tracked quarterly, and a repricing trigger if the ancillaries don't materialise. That's exactly what "relationship pricing discipline" means in a JD.

### 4.3 Commercial lending pricing levers

- Spread (margin) by risk grade, tenor, and collateral
- Fees: arrangement or upfront, commitment (on undrawn RCF), utilisation (tiered by % drawn), agency, prepayment and make-whole
- Structure: covenants, security, amortisation, which trade off against price
- Floors (on reference rates), step-ups
- **Sustainability-linked margin ratchets:** ±2.5–10 bps if ESG KPIs are met or missed

---

## 5. Deposit pricing: the other side of the balance sheet

Deposit pricing is a **huge** MBB and specialist topic, and JDs for "pricing – retail banking" often mean deposits as much as loans.

### 5.1 Core concepts

- **Deposit beta** = Δ deposit rate ÷ Δ policy rate. The cumulative beta over a cycle is what matters.
- **Rate-sensitive vs rate-insensitive balances.** Operational and transactional balances are sticky. Excess and "hot" money moves.
- **Front book vs back book.** Promotional rates for new money vs legacy rates on existing balances.
- **Deposit mix.** Non-interest-bearing current accounts, savings, money market, term deposits (CDs).

### 5.2 An illustrative segment-based beta strategy

| Segment | Balance stickiness | Elasticity | Recommended beta through a hiking cycle | Tactics |
|---|---|---|---|---|
| Mass-market transactional | High | Low | 10–20% | Relationship features, not rate |
| Mass-affluent savings | Medium | Medium | 40–60% | Tiered rates; high-yield savings (HYSA) for new money |
| Affluent / wealth | Low | High | 60–80% | Sweep to money market funds; relationship rates |
| SME operating | High | Low–medium | 20–40% | ECR (earnings credit) and bundled pricing |
| Corporate excess / wholesale | Very low | Very high | 80–100% | Price close to market; manage via liquidity value (LCR) |

### 5.3 Typical deposit-pricing engagement questions

- "Rates are falling. How fast can we cut without losing balances we need?"
- "Should we launch a separate digital savings brand to price for new money without repricing the back book?" This raises a conduct question in the UK: the FCA has scrutinised the gap between easy-access savings rates and policy rates.
- "What's the liquidity value (LCR/NSFR) of each deposit type, so Treasury can price it properly?"

---

## 6. Product-specific pricing notes

| Product | Pricing specifics |
|---|---|
| **US mortgages** | Rate sheets update daily, driven by secondary-market (agency MBS) prices. The rate is adjusted by agency **loan-level price adjustments (LLPAs)** by credit score, LTV, and product. Points-vs-rate trade-offs. Loan-officer compensation rules prohibit paying LOs based on loan terms. |
| **UK mortgages** | Fixed-rate products (2- and 5-year) priced off swap rates. The **broker channel dominates** new lending (commonly cited ~80%+). **Product-transfer (retention) pricing** for customers reaching the end of their fix is a big lever, and a Consumer Duty focus. |
| **Auto (indirect)** | The lender sets a "buy rate". The dealer may add a markup (dealer reserve), typically capped by lenders at ~2–2.5 pp (a fair-lending focus), or the lender pays a flat fee. **Captive finance companies** offer manufacturer-subsidised (subvented) rates, e.g., 0% APR. |
| **Personal loans** | Risk-based APR plus an origination fee (in the US often 0–8%). Soft-pull pre-qualification on aggregators makes pricing *very* visible, and elasticity is high. |
| **BNPL / POS finance** | **Merchant-funded:** the merchant pays a fee (commonly a few % of the purchase) for higher conversion and basket size. Pay-in-4 is typically 0% for the consumer. Longer-term installment loans carry an APR. Revenue also comes from late fees (capped by some providers) and interchange on BNPL cards. |
| **SME loans** | Relationship-priced; grids by risk grade plus arrangement fees. Government-guaranteed loans have capped rates and fees. Merchant cash advance uses a **factor rate** (e.g., 1.10–1.40× the advance), not an APR; APR disclosure rules are spreading in some US states. |
| **Revolving lines / overdrafts** | Interest on drawn balances plus commitment or arrangement fees. The CFPB's 2024 overdraft rule was overturned by Congress in 2025, so bank overdraft pricing is driven by competition and scrutiny rather than a rule (verify). |

---

## 7. Regulatory guardrails for lending pricing (verify current status)

| Area | What it means for pricing and GTM |
|---|---|
| **Fair lending** (US ECOA/Reg B, Fair Housing Act; the UK Equality Act and FCA rules) | No pricing on protected characteristics. **Disparate-impact testing** of grids and discretion (dealer markups, RM overrides, broker comp). Use explainable models. |
| **Disclosure** (TILA/Reg Z APR; EU CCD and **CCD2**, applying from November 2026 and extending to BNPL and small loans; UK CONC) | APR must reflect total cost; pre-contract information; affordability or creditworthiness checks. |
| **Usury and rate caps** | US state caps (and "true lender" disputes in bank–fintech partnerships); caps in parts of the EU; the UK high-cost short-term credit cap. |
| **Conduct / fair value** | UK Consumer Duty (price vs value per segment; back-book pricing); US UDAAP. |
| **Model risk** | US SR 11-7 and equivalents cover pricing and risk models. AI/ML credit models need adverse-action reason codes (the US CFPB has said "black box" isn't an excuse). |
| **Capital** | Basel III (and the US "endgame" re-proposal process) changes risk weights and therefore the capital charge in the pricing floor. |
| **Digital lending (India)** | RBI digital lending guidelines: APR disclosure in a Key Fact Statement, direct fund flows, first-loss default guarantees (FLDG) capped at 5%. |
| **BNPL** | UK regulation of deferred-payment credit (an FCA regime due to start in 2026; verify); EU CCD2. The US CFPB's 2024 interpretive rule was withdrawn in 2025. |

---

## 8. Lending GTM strategies: the twelve plays

### Play 1 — Digital direct personal lending

- **Model:** D2C via search, social, and **aggregators** (credit-score apps and loan marketplaces with soft-pull pre-qualification), with instant decisioning and same-day funding.
- **Key choices:** target band (prime vs near-prime), aggregator bid strategy (pay per funded loan vs per lead), speed as differentiator ("money in hours").
- **Economics:** CAC is high on aggregators, and aggregator traffic is rate-sensitive, which brings adverse selection risk. **LTV depends on re-borrowing**, since repeat customers are much cheaper.
- **Analyses:** channel-level funnel (pre-qual → apply → approve → accept → fund), CAC per funded loan, early payment default by channel, rate-gap elasticity.
- **KPIs:** time-to-yes, time-to-cash, pull-through, CAC per funded loan, 90-day delinquency.

### Play 2 — Pre-approved cross-sell to your own base

- **Model:** use deposit and transaction data to pre-approve existing customers, then push offers in-app ("You're pre-approved for $10k at 10.9%").
- **Why it wins:** the lowest CAC, a **data advantage** (you see cash flow), the highest conversion, and lower risk.
- **Pricing tension:** don't overcharge the captive base. That's a conduct risk, and also bad economics because it cedes customers to aggregators.
- **KPIs:** offer acceptance rate, share of the bank's customers borrowing elsewhere (the "leakage" of your own customers), loss rates vs open-market loans.

### Play 3 — Point-of-sale finance and BNPL partnerships (embedded)

- **Model:** financing at checkout (online and in-store) through merchant integrations; the merchant pays a discount fee.
- **Merchant value proposition:** higher conversion, higher average order value, new customers.
- **Pricing:** merchant discount rates vary by term and promotional APR (a 0% promotion costs the merchant more); consumer APR on longer terms.
- **GTM:** enterprise merchant partnerships (field sales; exclusive deals with big retailers), SMB merchant self-serve, and **distribution via acquirers and e-commerce platforms** (one integration gives access to many merchants).
- **Bank angle:** banks respond with installments on cards (see Cards Play 7) or by white-labelling POS finance for retailers.

### Play 4 — Intermediated lending (brokers and dealers)

- **Mortgages (UK and others):** brokers control the customer. GTM means broker relationship management (BDMs), service levels (time to offer), product range on broker platforms, and procuration fees. **Pricing:** sharp headline rates on sourcing systems; retention pricing for existing borrowers is where the value is.
- **Auto:** dealer relationships, decision speed (seconds), buy rates and dealer compensation (fairness), floor-plan and dealer-banking bundles (lend to the dealer to win their retail flow).
- **KPIs:** share of broker or dealer flow, pull-through, early defaults by intermediary, cost per funded loan including commission.

### Play 5 — SME digital lending (bank "loan in minutes")

- **Model:** pre-approved or instant-decision small-business loans and lines using the bank's transaction data, accounting-software data (via APIs), and bureau data.
- **GTM:** existing SME banking clients (in-app offers), accountant and adviser partnerships, digital acquisition for new-to-bank SMEs.
- **Pricing:** simple, transparent fees (fintech-style) vs a complex relationship grid. The trend is a **simple price for small tickets** and relationship pricing above a threshold.
- **KPIs:** % of SME clients with a pre-approved limit, utilisation, time-to-cash, loss rate.

### Play 6 — Embedded SME finance via platforms (revenue-based financing)

- **Model:** e-commerce, payments, and marketplace platforms offer financing to their merchants, repaid as a **% of daily sales**, underwritten on platform data. A bank or fund provides capital, or the platform lends from its own balance sheet.
- **Pricing:** a fixed fee or factor rate (e.g., the advance + 10–15%). There's no APR in the traditional sense, but transparency expectations are rising.
- **GTM for a bank:** become the **capital and licence partner** behind platforms (B2B2B), or white-label its lending into vertical software.
- **Why it works:** a contextual offer ("You qualify for $25k based on your sales"), automatic repayment, and very low CAC.

### Play 7 — Supply-chain finance and anchor-led GTM

- **Model:** a large buyer (the anchor) lets its suppliers get paid early at a rate based on the *buyer's* credit (reverse factoring or payables finance).
- **GTM:** sell to the anchor's treasurer or CFO (a working-capital pitch that extends DPO); the anchor onboards its suppliers (supplier-enablement campaign). One anchor sale gives access to hundreds of suppliers.
- **Pricing:** discount rate = benchmark + a spread tied to the anchor's rating; platform fees; a rebate or revenue share to the anchor in some structures.
- **Risks:** accounting disclosure (payables-finance disclosure standards now require transparency), concentration, fraud (fake invoices).

### Play 8 — Balance-sheet-light: forward flow and private credit partnerships

- **Model:** originate loans and sell them, or a participation in them, to private credit funds, insurers, or securitisation vehicles under a **forward-flow agreement**. Keep servicing and the customer relationship.
- **Why:** scale without consuming capital; common for fintech lenders and increasingly for banks in specialty segments.
- **Pricing implication:** the loan rate must clear the **investor's required yield** plus servicing and origination economics, so pricing becomes a function of capital-markets appetite.
- **GTM implication:** growth is constrained by funding partners, not just customers. Diversifying funding sources is part of GTM.

### Play 9 — Lending-as-a-Service and bank–fintech partnerships

- **Model:** a bank provides the charter, balance sheet, and compliance; the fintech provides distribution and the user experience.
- **Pricing:** revenue splits, fees per loan, and loan-sale premiums.
- **Regulatory reality:** heightened scrutiny of partner banks (third-party risk management, consent orders, the fallout from Synapse). The GTM must include **partner due diligence and oversight** as a core capability.

### Play 10 — Commercial and corporate relationship lending

- **Model:** coverage bankers and product partners; lending is often the **anchor** that wins the wallet (cash management, FX, capital markets).
- **GTM levers:** coverage model (which clients get which banker), sector specialisation, wallet-sizing per client, cross-sell plans, and a deal desk with a RAROC tool.
- **Pricing discipline:** relationship RAROC with tracked cross-sell commitments (see §4.2).
- **KPIs:** revenue per banker, relationship RAROC, ancillary-to-lending revenue ratio, share of wallet.

### Play 11 — Green and sustainability-linked lending

- **Products:** green mortgages (discounts for energy-efficient homes), EV auto loans, green SME equipment loans, sustainability-linked corporate loans with KPI-based margin ratchets.
- **GTM:** partner with home builders, EV makers, and installers (a point-of-need channel); bundle advisory services.
- **Pricing:** small rate discounts funded by lower risk (where evidenced), regulatory capital treatment, or brand value.

### Play 12 — Mortgage retention and refinance waves

- **Situation:** rate cycles drive refinance waves (US) or large volumes of fixed-rate maturities (UK).
- **GTM:** proactive retention offers 3–6 months before maturity, digital product-transfer journeys, and broker retention protocols.
- **Pricing:** retention rates vs new-customer rates (the fair-value lens); the cost of losing a customer to a competitor vs the margin given up to keep them.

---

## 9. Lending KPI tree

```
Risk-adjusted return (RAROC / ROE) on the lending book
├── Volume: applications × approval rate × take-up rate × average loan size
├── Yield: rate grid, mix (risk band, product, channel), fees
├── (−) Funding cost: FTP; deposit mix and betas
├── (−) Credit cost: PD × LGD; early payment defaults; vintage curves
├── (−) Opex: CAC, underwriting cost, servicing, collections
└── Capital: RWA density, capital allocation
Customer: time-to-yes, time-to-cash, NPS, complaints (conduct), repeat borrowing
```

---

## 10. Lending watch-list (verify current status)

- EU CCD2 transposition and application (from November 2026)
- UK BNPL (deferred-payment credit) regulation timetable; Consumer Duty reviews of lending and savings
- The US regulatory posture (CFPB priorities; Section 1033 open banking reconsideration, which affects cash-flow underwriting data access)
- The Basel III endgame's final shape in the US and the EU's implementation timetable (it changes capital charges in pricing)
- Private credit's growing role in consumer and SME lending (forward flow); regulatory attention to bank lending to non-bank lenders
- AI/ML in underwriting and pricing: explainability, fair-lending testing, and model governance
