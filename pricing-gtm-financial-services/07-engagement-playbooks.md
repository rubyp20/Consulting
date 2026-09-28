# 07 — Engagement Playbooks: Pricing & GTM Across Engagement Types

> **What this chapter gives you:** how MBB-style pricing and GTM engagements are scoped and run, then **eleven engagement archetypes**, each with the client situation, key questions, an issue tree, a week-by-week workplan, the data request, core analyses, deliverables, pitfalls, and typical impact. It ends with a matrix of **engagement type × product** (Cards, Lending, RTP, Cross-border).

---

## Part A — How these engagements run

### A.1 The engagement arc

```
 Scoping / proposal → DIAGNOSE → DESIGN → PILOT → SCALE & SUSTAIN
     1–3 weeks         3–6 wks    4–8 wks   8–12 wks   3–12 months (often client-led, with consultant support)
```

- **Diagnose:** where is value being lost or missed? Size the prize.
- **Design:** the new prices, architecture, GTM, and governance.
- **Pilot:** test in a controlled way (region, channel, segment); measure against a control group.
- **Scale and sustain:** roll out, embed in tools, processes, and incentives, and track results.

Most "strategy" engagements are 8–12 weeks (diagnose + design). **Pricing** engagements increasingly include pilot and implementation phases, because the value is only real once realised. Clients and consultants both know that "pricing strategy on slides" rarely sticks.

### A.2 A typical team

| Role | Responsibilities |
|---|---|
| **Partner / senior partner** | Client relationship, the "answer", senior stakeholder management |
| **Associate partner / principal** | Day-to-day problem-solving leadership, often 2–3 engagements at once |
| **Engagement manager (EM)** | Runs the team and workplan, owns the storyline, runs the steering-committee process |
| **Consultants / associates (2–4)** | Each owns a workstream: analytics, customer research, benchmarking, GTM design |
| **Experts and specialists** | Pricing experts, payments experts, data scientists, conjoint and survey specialists, regulatory experts |
| **Client counterparts** | A sponsor (CFO, head of cards or payments), a working team from product, finance, risk, and sales |

### A.3 Week 1 on any pricing or GTM engagement

1. **Kick-off:** align on objectives, scope, success metrics, governance (weekly working session; a steering committee every 3–4 weeks).
2. **Data request:** send it on Day 1 (see each playbook). Data is always the critical path.
3. **Stakeholder interviews (10–20):** product, finance, risk, sales, operations, compliance.
4. **The hypothesis tree and "Day-1 answer":** write the likely answer early, then prove or disprove it.
5. **The ghost deck:** draft the final storyline with empty charts, so every analysis has a purpose.

### A.4 The storyline discipline

- **SCR:** Situation → Complication → Resolution.
- **Pyramid principle:** lead with the answer; supporting arguments are MECE (mutually exclusive, collectively exhaustive); each backed by data.
- **Action titles:** every slide title is a sentence that states the "so what" (e.g., "40% of commercial clients are on expired pricing exceptions, worth $12m a year").

### A.5 Standard deliverables

Executive summary · baseline fact base · opportunity sizing (a "prize" waterfall) · target design (price book, grids, propositions) · business case with scenarios · implementation roadmap · governance and operating model · KPI dashboard · pilot design · change-management and communication plan (including for customers and regulators).

---

## Part B — The eleven playbooks

---

### Playbook 1 — Pricing diagnostic & fee-leakage recovery (commercial / transaction banking)

**Situation:** a bank's treasury and commercial fee income is flat despite volume growth. The CFO suspects discounting and leakage.

**Key questions:** How much revenue is lost between the rack rate and the realised price? Where, and why? How do we recover it sustainably?

**Issue tree:**
```
Why is realised fee revenue below potential?
├── Price levels are too low
│   ├── Rack rates below market or value (benchmark)
│   └── Rack rates not updated for inflation or cost
├── Discounts and exceptions are excessive
│   ├── Too many clients on non-standard pricing
│   ├── Discount depth unrelated to relationship value
│   └── Exceptions never expire
├── Billing leakage
│   ├── Services delivered but not billed (set-up gaps)
│   ├── Waivers applied manually
│   └── Wrong price codes
└── Structural
    ├── ECR (earnings credit) too generous
    └── Fee schedule complexity (many unused codes)
```

**Workplan (6–8 weeks):**

| Week | Activities |
|---|---|
| 1 | Kick-off, data request, interviews (product, sales, billing ops) |
| 2–3 | Build the client-level pricing waterfall; price-dispersion analysis; billing-gap sample audit; benchmark rack rates against peers |
| 4 | Size the opportunity by lever (rack-rate update, exception clean-up, billing fixes, ECR recalibration); segment clients for repricing (by relationship profitability and churn risk) |
| 5 | Design governance: DoA matrix, exception expiry, reason codes, deal desk, MI dashboard |
| 6 | Repricing wave plan (who, what, when, how to communicate); RM talking points; business case |
| 7–8 | Pilot the first repricing wave with one region; set up tracking |

**Data request:** billing data by client and service code (24 months); rack-rate schedule; the list of price exceptions and waivers (with dates and approvers); account analysis statements; ECR rates; client profitability; balances; RM assignment; competitor fee schedules (where public or known).

**Core analyses:** a pricing waterfall per client; dispersion charts (realised price vs client size); an exception-ageing analysis; a billing-gap audit (sample 100 clients); a relationship-profitability quadrant (profitability × pricing realisation); peer benchmarks.

**Deliverables:** a leakage fact base; a prize by lever; the repricing-wave plan; governance design; an MI dashboard; RM enablement materials.

**Pitfalls:**
- Repricing high-value relationships without a relationship view, which risks losing deposits.
- Treating the exercise as a one-off. Without expiry rules and MI, leakage returns in 12–18 months.
- Ignoring RM incentives.

**Typical impact:** 3–10% of addressable fee revenue, with half usually coming from governance and billing fixes rather than list-price increases.

> **A sample executive summary (MBB style):**
> 1. Commercial fee realisation is 58% of the rack rate on average, ranging from 25% to 95% for clients of similar size and profitability.
> 2. $14–18m a year is recoverable: $6m from expired exceptions, $4m from billing gaps, $3m from ECR recalibration, and $2–5m from targeted rack-rate increases.
> 3. The root causes are no exception expiry, no deal-level profitability visibility for RMs, and incentives based on volume.
> 4. We recommend three repricing waves over 9 months, a new DoA with automatic expiry, a deal desk for exceptions above $25k, and RM scorecards weighted on risk-adjusted revenue.
> 5. We'll pilot in the Midwest region from next month, and target $4m run-rate within 6 months.

---

### Playbook 2 — Consumer card pricing & value-proposition refresh

**Situation:** a flagship card is losing spend share, and its ROA is declining (see [03 §10](03-cards.md#10-mini-case-how-an-mbb-team-would-attack-a-card-pricing-problem)).

**Key questions:** Is the value proposition competitive for the target segment? Is the rewards cost efficient? Are the fee and APR structures optimal? How do we transition the existing book?

**Issue tree:**
```
How do we restore growth and ROA?
├── Revenue
│   ├── Spend: earn rates, category fit, top-of-wallet position
│   ├── Balances: APR grid, promo strategy
│   └── Fees: annual fee level and waivers; FX; late fees (within rules)
├── Costs
│   ├── Rewards: earn/burn design, redemption mix, breakage
│   ├── Benefits: usage vs cost per benefit
│   └── Acquisition: CAC by channel, bonus economics
└── Risk: approval mix, line strategy, losses by cohort
```

**Workplan (10–12 weeks):**

| Week | Activities |
|---|---|
| 1–2 | P&L decomposition (PVM of ROA change); cohort analysis; offer teardown of 20–30 competitor cards |
| 3–4 | Customer research: attrition and spend-shift drivers (survey plus behavioural data); benefit usage and cost; MaxDiff on benefits |
| 5–6 | Conjoint on 3–4 proposition variants (fee × earn rate × benefits); demand and cannibalisation simulation |
| 7–8 | Economic design: rewards restructure, fee strategy, APR grid, retention-offer policy; conduct and fair-value assessment |
| 9–10 | Business case (3 years, scenarios); transition plan for the existing base (notice periods, grandfathering, communications) |
| 11–12 | Test-and-learn plan; launch roadmap; contact-centre and marketing enablement |

**Data request:** account-level monthly data (spend, balances, APR, fees, rewards earned and redeemed, delinquency) for 24–36 months; acquisition data by channel and offer; benefit usage and cost; retention offers granted; competitor offers; research data.

**Core analyses:** the ROA bridge; cohort curves (activation, spend, attrition); benefit cost vs perceived value (MaxDiff); conjoint simulations; fee elasticity (from past fee changes or conjoint); retention-offer ROI.

**Deliverables:** the new proposition (tiers), price and rewards design, business case, transition plan, test plan, fair-value evidence pack.

**Pitfalls:**
- Designing for the average customer. Segment by transactor vs revolver and by spend level.
- Underestimating attrition when fees rise.
- Forgetting regulatory notice requirements and conduct review.

**Typical impact:** +30–60 bps ROA over 18–24 months; spend growth among target segments.

---

### Playbook 3 — Risk-based loan pricing optimisation (build & pilot)

**Situation:** a bank prices personal loans (or SME loans or mortgages) with a static grid set annually. Volumes are volatile, and margins are compressing.

**Key questions:** What grid maximises risk-adjusted profit within risk appetite and volume targets? How do we operationalise it?

**Workplan (12–16 weeks):**

| Week | Activities |
|---|---|
| 1–2 | Data assembly (quotes including non-accepted offers, competitor rates, outcomes); pricing-process review |
| 3–5 | Build the take-up (demand) model: rate gap, channel, amount, risk, term |
| 5–7 | Build a risk model conditional on price (adverse selection); a profitability engine (FTP, EL, opex, capital) |
| 7–8 | Optimisation with constraints (volume, EL budget, fair lending, price-move limits, monotonicity); an efficient frontier for leadership choice |
| 9 | Fair-lending and conduct testing; model documentation for model risk management |
| 10–14 | Champion-challenger pilot (e.g., 50% of aggregator traffic); weekly monitoring |
| 15–16 | Pilot read-out; industrialisation plan (LOS integration, re-pricing cadence, governance) |

**Data request:** application and quote-level data (24–36 months), accepted and declined offers, pricing at the time, competitor rate data, loan performance, FTP curves, cost allocations, capital parameters.

**Core analyses:** elasticity by segment and channel; PD vs price (adverse selection); profit curves by band; the efficient frontier; pilot lift vs control (volume, margin, early risk indicators).

**Deliverables:** an optimised grid and discretion bands; the optimisation engine or specification; governance (pricing committee cadence, override rules); a model-risk documentation pack; pilot results.

**Pitfalls:**
- Missing non-accepted-quote data, which makes elasticity impossible to estimate.
- Ignoring adverse selection.
- Fair-lending blind spots (e.g., channel or geography acting as proxies).
- Over-frequent price changes that confuse brokers or partners.

**Typical impact:** 5–15 bps margin uplift on the book, or equivalent volume growth at the same margin.

---

### Playbook 4 — Deposit pricing through the rate cycle

**Situation:** policy rates are moving. The bank needs to decide how fast to pass changes through to deposit rates without losing needed balances or over-paying.

**Workplan (6–8 weeks):**

| Week | Activities |
|---|---|
| 1–2 | Balance segmentation (operational vs non-operational; rate-sensitive vs sticky); historical beta analysis by product and segment |
| 3–4 | Balance-at-risk modelling (elasticity of balances to the rate gap vs competitors and money market funds); liquidity value by deposit type (LCR/NSFR) with Treasury |
| 5–6 | Rate strategy by segment (the beta path); front-book vs back-book strategy; product-architecture moves (e.g., tiered rates, relationship rates); conduct review |
| 7–8 | Governance (weekly rate-setting forum, triggers); MI; communication and RM guidance |

**Key analyses:** cumulative betas vs peers; balance migration flows (savings → CDs → money market funds or competitors); the net interest margin impact of beta scenarios; fair-value assessment for back-book rates.

**Pitfalls:** treating all deposits alike; ignoring the conduct risk of large front-book vs back-book gaps; not aligning with Treasury's funding needs.

**Typical impact:** several bps of NIM on the deposit book (in large banks, tens to hundreds of millions of dollars).

---

### Playbook 5 — New-product GTM launch (e.g., instant payments for corporates)

**Situation:** a bank has a new capability (instant payments, Pay-by-Bank, a new SME FX platform, BNPL-on-card) with low adoption, or it's about to launch.

**Key questions:** Which segments and use cases? What offer and price? Which channels and sales motion? What does the business case look like? How do we launch?

**Issue tree:**
```
How do we reach $X revenue and Y active clients in 3 years?
├── Where to play: use cases, verticals, segments (prioritised)
├── How to win: proposition, differentiation, integration
├── Offer & pricing: packaging, price book, cannibalisation strategy
├── Channels & sales: coverage, specialists, partners, digital
├── Launch: pilot clients, sequencing, readiness
└── Economics & governance: business case, KPIs, stage gates
```

**Workplan (10–12 weeks):** see the detailed RTP example in [05 §9](05-real-time-payments.md#9-sample-engagement-build-our-instant-payments-commercial-proposition-a-us-regional-bank). The generic structure is:

| Week | Workstream |
|---|---|
| 1–2 | Market scan, client research, internal baseline, competitor offers |
| 3–4 | Segment and use-case prioritisation; revenue-pool sizing |
| 5–6 | Proposition and pricing (EVC, packaging, cannibalisation) |
| 7–8 | Channels, sales model, partners, marketing |
| 9–10 | Launch plan, readiness, business case, KPIs |
| 11–12 | Pilot set-up with lighthouse clients |

**Core analyses:** a use-case prioritisation matrix; TAM/SAM/SOM; the EVC corridor per use case; a cannibalisation model; a channel economics comparison; sales-capacity modelling; a 3-year P&L.

**GTM strategy options typically evaluated:**
1. **Direct, RM-led** to existing clients (fast, but RM attention is scarce)
2. **Specialist overlay team** by vertical (focus, at a cost)
3. **Partner-embedded** (ERP, vertical software, fintechs): scale, but shared economics
4. **B2B2X / wholesale** to other FIs and fintechs: reach, at a lower margin
5. **Self-serve digital** for smaller clients

The usual recommendation is a **sequenced hybrid:** lighthouse clients via a specialist overlay → partner-embedded for scale → wholesale for reach.

**Pitfalls:** launching the product without use-case offers; no sales incentives; pricing anchored on cost; underestimating integration effort.

---

### Playbook 6 — Cross-border market or corridor entry

**Situation:** a remittance fintech, a payments company, or a bank wants to enter new corridors or countries.

**Key questions:** Which corridors or countries, and in what order? What entry mode? What pricing? What does it cost, and when does it pay back?

**Workplan (8–10 weeks):**

| Week | Activities |
|---|---|
| 1–2 | Long-list of 20–40 corridors; data collection (flows, growth, price levels, competitors, digital adoption, payout infrastructure, regulation) |
| 3–4 | Scoring and prioritisation (attractiveness × ability to win); short-list of 5–8; deep dives |
| 5–6 | Entry-mode assessment per market (partner vs licence vs acquire); regulatory and licensing timelines; payout partner long-list |
| 6–7 | Corridor pricing strategy (competitive positioning, launch promos, unit economics); customer acquisition strategy (diaspora channels, CAC benchmarks) |
| 8–9 | Business case per corridor (volume ramp, take rate, CAC, payback); sequencing roadmap |
| 10 | Implementation plan: licences, partners, compliance build, marketing launch |

**Core analyses:** a corridor-scoring heatmap (see [06 §6 Play 1](06-cross-border-payments.md#play-1--corridor-led-expansion-the-prioritisation-engine)); competitor price benchmarking (mystery-shopping transfers); unit economics per corridor; an entry-mode decision matrix; licensing timelines.

**Pitfalls:** choosing corridors by size alone (big corridors are often the most competitive); underestimating compliance cost and time; ignoring payout-side quality (the recipient experience drives retention).

---

### Playbook 7 — Co-brand partnership strategy & RFP

**Situation (partner side):** an airline, retailer, or hotel chain's co-brand contract expires in 18 months. It wants to maximise value. **(Issuer side):** an issuer wants to win, or renew, a major co-brand.

**Workplan, partner side (8–12 weeks):**

| Week | Activities |
|---|---|
| 1–3 | Baseline the current programme economics (all payment streams); benchmark deal terms; the programme's value to the partner (loyalty engagement, revenue) |
| 4–5 | Define objectives and non-financial requirements (data rights, marketing, customer experience, technology); design the RFP; long-list issuers and networks |
| 6–8 | Run the RFP; build a bid-evaluation model (NPV under scenarios: growth, attrition, rates); evaluate proposals; clarifications |
| 9–12 | Negotiation support (term sheet, levers, fall-backs); the portfolio-transfer plan if switching |

**Workplan, issuer side (6–8 weeks, often compressed by the RFP timeline):** portfolio valuation (receivables, spend, attrition on conversion, loss rates); a synergy assessment; bid strategy (walk-away, structure: fixed vs variable payments); a negotiation plan; a conversion and migration plan.

**Key analyses:** a partner-payments decomposition (points purchase, bounties, revenue share, marketing); a bid NPV model; a scenario and sensitivity analysis; conversion-attrition benchmarks.

**Pitfalls:** the winner's curse (overpaying on optimistic growth); ignoring conversion attrition; underpricing data rights; not modelling rate and credit scenarios.

---

### Playbook 8 — Merchant acquiring SMB repricing

**Situation:** an acquirer's SMB net revenue yield is falling. Leadership wants a repricing programme but fears churn.

**Workplan (8–10 weeks):**

| Week | Activities |
|---|---|
| 1–2 | Merchant-level profitability (net revenue after interchange, scheme, processing, support, risk); pricing-model mix; price dispersion |
| 3–4 | Churn modelling (drivers: price, tenure, volume, support tickets, competitor exposure); past repricing responses (natural experiments) |
| 5–6 | Repricing design: segment the book (reprice / hold / protect / offer migration to IC+ or subscription); lever selection (markup, fixed fee, ancillary); price-change communication and notice |
| 7 | Business case (gross uplift − incremental churn − save-desk cost) and scenarios |
| 8–10 | Pilot on a subset with a control group; save-desk playbook; sales and support enablement |

**Core analysis: net repricing value per segment**
```
Net value = Σ_segments [ Δ price × retained volume ] − [ margin on volume lost to incremental churn ] − [ save-desk concessions ]
```

**Pitfalls:** repricing uniformly; ignoring ISV and partner-channel contracts (restrictions); poor communication, which creates regulatory and reputational backlash; not repricing in waves.

**Typical impact:** +5–20 bps net revenue yield on the repriced segments.

---

### Playbook 9 — Commercial due diligence (CDD): the pricing & GTM lens

**Situation:** a PE fund is evaluating the acquisition of a payments or lending business (e.g., a cross-border payments fintech or an SMB acquirer) and has **3–4 weeks**.

**Key questions:** Is the market attractive and growing? Is the target's pricing power sustainable? Can its GTM scale? Is the management plan achievable?

**Workplan (3–4 weeks):**

| Days | Activities |
|---|---|
| 1–5 | Market model (size, growth, drivers); competitive landscape; expert calls (10–20: competitors, customers, former employees) |
| 5–12 | Customer survey or interviews (NPS, switching intent, price sensitivity); pricing benchmarks (is the target priced above or below market?); cohort analysis from the data room (retention, net revenue retention, take-rate trends) |
| 10–18 | GTM assessment: channel mix and CAC trends, sales productivity, partner concentration, pipeline quality; testing the management plan (volume × take rate × new products) |
| 15–20 | The "so-whats": key risks (take-rate compression, partner dependency, regulatory), upside levers (pricing, new corridors or products), base, upside, and downside cases |

**Pricing-specific diligence questions:**
- Take-rate trend by cohort and segment: are new customers priced lower (compression)?
- Price position vs competitors: is the growth "bought" with low prices?
- Mix of explicit fees vs opaque spreads (regulatory risk, e.g., FX transparency)
- Pricing-power evidence: past price increases and the churn response
- Contract terms: repricing rights, minimums, termination

**GTM-specific questions:**
- CAC and payback trends by channel (is growth becoming more expensive?)
- Dependence on a few partners or platforms (e.g., one marketplace = 40% of volume)
- Scalability of the sales motion (is productivity per rep stable as the team grows?)
- White space: new corridors, segments, products

**Deliverables:** a CDD report (market, competition, customer, target performance, the business plan, risks and opportunities); input to the valuation model; a 100-day value-creation plan (often pricing-led).

---

### Playbook 10 — Commercial excellence & pricing-governance transformation

**Situation:** a bank or payments company wants lasting pricing discipline across a large B2B business (commercial banking, transaction banking, acquiring).

**Workplan (16–24 weeks, in waves):**

| Phase | Activities |
|---|---|
| **Diagnose (weeks 1–4)** | Pricing maturity assessment across the five layers of the pricing house ([01 §4](01-pricing-fundamentals.md#4-the-pricing-house-the-structuring-framework)); leakage sizing; process mapping (quote → approve → contract → bill) |
| **Design (weeks 5–10)** | DoA matrix; deal desk (roles, SLAs, tooling); pricing tools (deal RAROC or profitability calculator in the CRM); incentive redesign; MI dashboards; pricing CoE charter |
| **Pilot (weeks 11–16)** | Pilot in 1–2 regions or business lines; measure win rates, realisation, and cycle time |
| **Scale (weeks 17–24+)** | Roll out; training ("pricing academy" for RMs); embed in performance management; quarterly pricing reviews |

**Key change-management elements:** senior sponsorship; visible "pricing wins"; RM coaching (negotiation skills and value-selling); making the right thing easy (tools in the RM workflow); consequences (scorecards).

**Pitfalls:** a tool-first approach without process and incentive change; a deal desk that becomes a bottleneck (set SLAs); no measurement of win and loss vs price.

**Typical impact:** 2–5% revenue on the covered book; sharply reduced price dispersion; faster deal cycles.

---

### Playbook 11 — Embedded-finance and partnership GTM (platform / BaaS)

**Situation:** a bank wants to grow by distributing lending, payments, or cross-border products through platforms (software companies, marketplaces, fintechs). Or a platform wants to add financial products.

**Key questions:** Which platform partners? What partnership model (white-label, co-brand, referral, BaaS)? What economics split? What capabilities (APIs, onboarding, risk oversight) are needed?

**Workplan (8–10 weeks):**

| Week | Activities |
|---|---|
| 1–2 | Opportunity scan: platform categories (vertical SaaS, marketplaces, e-commerce, payroll, accounting); the embedded product fit (payments, cards, lending, FX, payouts) |
| 3–4 | Partner prioritisation (user base, data, workflow fit, economics, risk); partner interviews |
| 5–6 | Partnership model and economics: revenue share, pricing to end users, who bears credit and fraud loss, exclusivity; standard term sheet |
| 7–8 | Capability requirements: APIs, onboarding, compliance oversight of partners (third-party risk), monitoring |
| 9–10 | Business case; partner pipeline; launch plan with 2–3 lighthouse partners |

**Core analyses:** attach-rate benchmarks; the revenue-share waterfall (end-user price → platform share → bank share → costs); risk-adjusted partner economics; a partner scoring matrix.

**Pitfalls:** under-investing in partner oversight (regulatory risk, see BaaS consent orders); giving away too much economics; long integration cycles; no exclusivity or minimums.

---

## Part C — Engagement × product matrix: what the GTM and pricing work looks like

| Engagement type | **Cards** | **Lending** | **Real-Time Payments** | **Cross-Border** |
|---|---|---|---|---|
| **Pricing diagnostic / leakage** | Fee waivers (annual fee, late fee reversals), retention-offer leakage, rewards cost leakage | RM/broker discretion and overrides, fee waivers, stale grids | Unbilled services, free pilots that never converted to paid | FX margin dispersion, RM discretion, fee waivers |
| **Product / value-prop redesign** | Rewards, fee, APR, benefits refresh; premium coupon book | Product simplification (e.g., SME lending bundles) | Good-better-best packaging; use-case bundles | Multi-currency accounts; transparent pricing; subscription plans |
| **Price optimisation** | APR grid, promo, and bonus optimisation (test-and-learn) | **Risk-based grid optimisation with adverse selection** | Price-tier calibration vs wires and same-day ACH | Corridor and dynamic FX pricing |
| **New-product GTM** | New card launch (digital-first, pre-approvals, aggregators) | Digital personal loans; SME "loan in minutes"; POS finance | **Use-case-led launch, vertical sales, lighthouse clients** | New corridor launch; SME FX platform |
| **Market / corridor entry** | New-country issuing or acquiring entry | New-country consumer lending (licences, partners) | Entry via B2B2X or wholesale access | **Corridor prioritisation and entry mode** |
| **Partnerships** | **Co-brand RFPs**, ISV acquiring partnerships | POS/BNPL merchant deals; forward-flow funding | Fintech and platform access (sponsor model); ERP connectors | Platform payouts; white-label to banks |
| **Commercial excellence** | Commercial card sales coverage; rebate governance | Corporate RAROC tool, deal desk, DoA | Treasury sales incentives for instant; specialist overlay | Corporate FX pricing governance; TCA |
| **Repricing the back book** | Fee changes with notice periods; APR changes (within CARD Act limits) | Mortgage retention pricing; deposit betas | Wire → instant migration pricing | SME FX repricing to defend against fintechs |
| **Due diligence** | Issuer or acquirer take-rate sustainability; co-brand concentration | Loss curves; pricing power vs funding cost | Revenue-model credibility (who pays?) | Take-rate compression vs transparent competitors; licence quality |
| **Regulatory response** | Interchange changes (Durbin, IFR); late-fee rules; APR caps | Fair lending, Consumer Duty, CCD2 | Price parity (EU IPR), APP reimbursement (UK) | Transparency (CBPR2, the G20 targets), remittance tax |

---

## Part D — Checklists you can reuse

### D.1 The universal pricing-engagement data request

- [ ] Transaction- or account-level revenue data (24–36 months)
- [ ] Price lists, rate cards, fee schedules (current and historical)
- [ ] Discounts, exceptions, waivers (with approver and date)
- [ ] Volume, balances, client and segment attributes
- [ ] Cost data (unit costs, allocations), FTP curves, capital parameters
- [ ] Risk data (PD, LGD, losses, fraud)
- [ ] Competitor pricing (public, broker, mystery shop)
- [ ] Win/loss data (for B2B), quote data (for lending)
- [ ] CRM pipeline and RM assignments
- [ ] Customer research (NPS, surveys, complaints)
- [ ] Regulatory constraints and past regulatory findings

### D.2 The GTM-engagement question checklist

- [ ] Who exactly is the target customer (segment, use case, geography)? Who is *not*?
- [ ] What job are they hiring us for? What do they use today (the reference alternative)?
- [ ] What's our right to win?
- [ ] What's the offer, the price, and the packaging?
- [ ] Which channels and partners? What's the CAC and payback by channel?
- [ ] What sales motion, coverage, and incentives?
- [ ] What must be true in risk, compliance, operations, and tech?
- [ ] What's the launch sequence, and what are the stage gates?
- [ ] What are the KPIs, targets, and governance?
- [ ] What could kill it (the pre-mortem)?

### D.3 The pre-mortem prompts

"It's 18 months later and the launch failed. Why?"

Typical answers:
- Sales didn't sell it.
- Pricing was wrong.
- Integration took too long.
- Fraud losses spiked.
- The regulator objected.
- The partner switched.
- There was no second side to the network.
- Customers didn't see enough value to change behaviour.
