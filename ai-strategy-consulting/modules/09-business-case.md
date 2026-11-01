# Module 09 — The AI Business Case

## 1. Why a client cares

Every AI programme in a bank competes for the same change budget as core-banking upgrades, regulatory remediation and product launches. The CFO does not fund "AI"; the CFO funds a cash-flow profile with a risk attached to it. A consultant who cannot build, defend and stress a business case will lose the room to the Finance business partner, however good the technology story is. The business case is also the control document for the whole programme: it fixes the baseline, names the benefit owners and defines what "success" means at every stage gate.

## 2. Concept and mechanism

### 2.1 The four value levers and how each is baselined

An AI business case is a claim that a system will change one or more measurable business quantities relative to a counterfactual. The four levers below are the standard decomposition; the discipline lies in the baseline, not the lever.

| Lever | What changes | Baseline you must capture | Typical evidence quality |
|---|---|---|---|
| Cost | Unit cost of a process falls (handling time, rework, vendor spend, error cost) | Volume, fully loaded cost per FTE, handle time per task, rework rate, vendor invoices | High if time-and-motion data exists; medium if estimated from interviews |
| Revenue | Conversion, cross-sell, pricing realisation, time-to-revenue improve | Funnel conversion by stage, abandonment, revenue per client, days to first transaction | Medium; attribution is contested |
| Risk | Expected loss, fines, provisions, false negatives fall; capital may improve | Loss history, regulatory findings, false-negative rate, SAR quality metrics | Low to medium; events are rare and lumpy |
| Customer experience | NPS, complaints, churn, cycle time | Survey data, complaint logs, churn cohort data, SLA breaches | Medium; monetisation requires a churn-to-revenue link |

Baselining means measuring the as-is on the same unit of account the benefit will be reported in. If the benefit is "analyst hours released", the baseline is analyst hours per case today, by case type, measured over a representative period (at least one quarter to capture seasonality). If the baseline is interview-estimated, say so in the case and apply a haircut (see 2.5).

### 2.2 Benefit types and why the CFO discounts some of them

| Benefit type | Definition | How a CFO treats it |
|---|---|---|
| Hard, cash-releasing | Reduces a cash cost line that will actually be cut: vendor contract, overtime, contractor spend, headcount that leaves the payroll | Counted at face value if an owner signs for it |
| Hard, cost-avoiding | Prevents a future cost that is already in the plan: planned hires to meet volume growth, planned vendor uplift | Counted if the avoided cost is in an approved plan; otherwise challenged |
| Capacity release | Hours freed in a team whose headcount does not change | Heavily discounted (often 0–30%) unless redeployment is specified and funded |
| Soft | Quality, employee satisfaction, brand | Not counted in NPV; noted qualitatively |
| Risk-adjusted loss reduction | Expected-loss change, fines avoided | Counted as probability-weighted expected value, usually with a large haircut |

The capacity-release argument is the single most common source of inflated AI cases. Releasing 20% of 100 analysts' time does not reduce cost unless 20 roles are removed, redeployed into revenue-generating work with a measurable output, or used to absorb volume growth that would otherwise have required hiring. A manager-level case states explicitly which of these three the client is committing to, and books only that.

### 2.3 Benefit ramp curves

Benefits never arrive on day one. The ramp reflects three things: deployment coverage (what share of volume the system handles), adoption (what share of eligible users actually use it) and effectiveness (how much of the theoretical benefit is realised per unit handled). A simple multiplicative model is

Realised benefit in period t = Full-run-rate benefit × Coverage(t) × Adoption(t) × Effectiveness(t)

Typical shapes for a banking back-office agentic deployment, labelled [ESTIMATE — assumption]:

| Year | Coverage | Adoption | Effectiveness | Combined ramp |
|---|---|---|---|---|
| 1 | 40% | 70% | 70% | 20% |
| 2 | 90% | 90% | 85% | 69% |
| 3 | 100% | 95% | 95% | 90% |
| 4 | 100% | 95% | 100% | 95% |
| 5 | 100% | 95% | 100% | 95% |

Note the Year 1 compound effect: three individually reasonable assumptions multiply to a 20% ramp. Juniors often put 50% in Year 1 without decomposing it.

### 2.4 The financial metrics

**Net Present Value.** NPV = Σ_{t=0..N} CF_t / (1 + r)^t, where CF_t is net cash flow in period t (benefits minus all costs including run and change) and r is the discount rate. Banks typically use a hurdle rate between 8% and 12% for change investments [ESTIMATE — assumption; VERIFY with the client's Finance function]. NPV above zero at the hurdle rate means the project creates value after the cost of capital.

**Internal Rate of Return.** IRR is the r at which NPV = 0. It is solved iteratively. Use it for comparability with other projects but be aware it overstates attractiveness for projects with early, large benefits and can be multi-valued if cash flows change sign more than once.

**Payback period.** The first period in which cumulative undiscounted (or discounted, if the client prefers) cash flow turns positive. CFOs in banks often apply an informal ceiling of 24–36 months for technology change [ESTIMATE — assumption].

**Benefit-cost ratio.** PV of benefits / PV of costs. Useful for ranking under a budget constraint.

### 2.5 Sensitivity, scenarios and risk-adjustment

Three complementary techniques:

- **Sensitivity (tornado).** Flex one input at a time across its plausible range, hold the rest at base, record the NPV swing, and rank the swings. The chart shows the CFO which three assumptions matter and therefore where to focus validation.
- **Scenarios.** Internally consistent sets of assumptions (downside, base, upside). The downside is not "everything at the pessimistic end"; it is a coherent story such as "adoption stalls because the integration to the core system slips nine months".
- **Risk-adjustment.** Two methods. (a) Probability-weight the scenarios to get an expected NPV. (b) Apply evidence-based haircuts to each benefit line before discounting. A practitioner scale [ILLUSTRATIVE — composite; attribution uncertain, variants differ by firm]:

| Evidence level for a benefit line | Haircut |
|---|---|
| Measured in a production pilot on the client's data | 0–10% |
| Measured in a PoC on client data, non-production | 20–30% |
| Benchmarked from a comparable public deployment | 30–50% |
| Vendor claim or analyst estimate only | 50–70% |
| SME opinion only | 60–80% |

### 2.6 How a CFO challenges an AI business case and how to pre-empt it

| Challenge | What the CFO is really asking | Pre-emption |
|---|---|---|
| Double counting | Is this benefit already in another programme's case (digital onboarding, ops transformation, offshoring)? | Build a benefits register across programmes; show the net-of-overlap figure |
| Baseline inflation | Did you use the busiest quarter, the most expensive FTE rate, or the worst cycle time? | Use trailing twelve months; show fully loaded cost build-up with HR sign-off |
| Ramp optimism | Why is 60% of the benefit in Year 1 when the integration backlog is 18 months? | Decompose ramp into coverage, adoption, effectiveness; tie coverage to the IT roadmap |
| Run-cost omission | Where are inference costs, model re-validation, human review, vendor uplift, and the second-line team? | Carry a full TCO (see Module 8); show run cost as a percentage of gross benefit |
| Attribution | If conversion rises, how do I know it was the AI and not the pricing change or the market? | Design a control group or phased rollout; agree the attribution method before go-live |
| Capacity release | Which roles leave, and when, and who signs? | Headcount bridge by quarter signed by the business owner; book only the signed part |
| Terminal value | Why does the benefit persist in Year 5 when the model will be obsolete? | Include model refresh cost; no benefit growth beyond volume growth |
| Downside | What is the worst case I should budget for? | Present the probability-weighted NPV and the downside scenario with its trigger |

## 3. Frameworks

### 3.1 The benefits logic tree (generic; widely used in practice)

Decompose the headline benefit into measurable drivers and link each driver to a KPI, an owner and a data source. Structure: Financial outcome → Value lever → Operational driver → KPI → Data source → Owner. Applying it: start from the P&L line, not from the use case; work down until each leaf has a number you can measure today.

### 3.2 The benefits realisation approach (attribution: UK Office of Government Commerce, Managing Successful Programmes, 2000s; widely adapted)

Steps: identify benefits; map them to outcomes and changes; assign owners; set measures and baselines; plan realisation; track and review. The AI-specific addition is a "model performance to business KPI" link: the business benefit only flows if the model KPI (for example, straight-through-processing rate) holds in production.

### 3.3 Five-step business case construction (practitioner method; attribution uncertain, variants differ by firm)

1. Baseline: volumes, unit costs, cycle times, error and loss rates, trailing twelve months, with source for each.
2. Benefit build: lever by lever, driver by driver, at full run-rate.
3. Ramp and haircut: apply coverage, adoption, effectiveness and evidence haircuts by year.
4. Cost build: build, run, change, refresh, from a TCO model.
5. Financials and stress: NPV, IRR, payback; tornado; three scenarios; probability-weighted NPV; headcount bridge.

### 3.4 McKinsey's observation on value capture (attribution: McKinsey Global Institute, June 2023, "The economic potential of generative AI")

MGI estimated USD 200–340 billion of annual value for banking [PUBLIC — MGI, 2023]. Useful as a top-down sanity check: value in that study is concentrated in a handful of functions (customer operations, software engineering, marketing and sales, risk and legal). If a client's bottom-up case attributes most value to a function outside that list, probe why.

## 4. Worked BFSI example

### 4.1 Context

[ILLUSTRATIVE — composite] A mid-sized corporate bank in the UK onboards 6,000 new corporate clients a year through a KYB (know-your-business) process: document collection, entity verification, ultimate beneficial owner (UBO) identification, screening, risk rating, and account set-up. The bank wants a five-year business case for a supervisor-led agentic system that automates document extraction, UBO graph construction, screening triage and case-file drafting, with human analysts approving every case. Discount rate 10% [ESTIMATE — assumption].

### 4.2 Baseline (trailing twelve months)

| Item | Value | Source |
|---|---|---|
| New onboardings per year | 6,000 | Case management system |
| KYB analysts (FTE) | 110 | HR |
| Fully loaded cost per analyst FTE | GBP 65,000 | Finance (salary, on-cost, premises, tooling) |
| Analyst cost base | GBP 7.15m | 110 × 65,000 |
| Analyst hours per case (average) | 24 | Time-and-motion sample, 400 cases |
| End-to-end cycle time (median) | 38 days | Case management system |
| Applicant abandonment rate | 12% | Funnel data |
| Average first-year revenue per onboarded client | GBP 9,500 | Finance |
| Rework rate (cases returned by QC) | 18% | QC logs |
| Periodic review backlog | 2,400 cases | Compliance |

Check: 110 FTE × ~1,600 productive hours = 176,000 hours; 6,000 cases × 24 hours = 144,000 hours; the remaining ~32,000 hours go to periodic reviews and backlog. The baseline reconciles, which is the first thing a CFO's analyst will test.

### 4.3 Benefit build at full run-rate

**Lever 1: Cost (analyst capacity).** Pilot measurement [ILLUSTRATIVE — composite, modelled as if measured in a non-production PoC] showed analyst hours per case falling from 24 to 11, as document extraction, UBO mapping and screening triage move to agents and the analyst reviews and approves.

- Hours released on new onboardings: 6,000 × (24 − 11) = 78,000 hours.
- FTE equivalent: 78,000 / 1,600 = 48.75 FTE.
- The business owner commits to: 30 FTE reduced through attrition and contractor release over 24 months; 10 FTE redeployed to clear the periodic review backlog (treated as cost avoidance of planned contractor spend, GBP 0.55m a year already in budget); the remaining 8.75 FTE treated as unbooked capacity.
- Booked cost benefit: 30 × 65,000 = GBP 1.95m plus GBP 0.55m avoided contractor spend = GBP 2.50m a year.
- Unbooked (reported, not in NPV): 8.75 × 65,000 = GBP 0.57m.

**Lever 2: Revenue (abandonment and time-to-revenue).** Cycle time median falls from 38 to 15 days [ESTIMATE — assumption based on pilot]. Abandonment is assumed to fall from 12% to 8% [ESTIMATE — benchmarked from internal funnel analysis showing abandonment concentrated after day 20].

- Applicants starting = 6,000 / (1 − 0.12) = 6,818.
- Additional completed onboardings = 6,818 × (0.12 − 0.08) = 273.
- Revenue uplift = 273 × 9,500 = GBP 2.59m a year. Apply a contribution margin of 45% [ESTIMATE — assumption] to convert revenue to profit: GBP 1.17m.
- Time-to-revenue: 23 days earlier on 6,000 clients at GBP 9,500 a year = 6,000 × 9,500 × 23/365 = GBP 3.59m of revenue pulled forward once, not recurring. Treated as a one-off Year 2 benefit at 45% margin: GBP 1.62m. Many CFOs exclude pull-forward entirely; we show it separately so it can be removed.

**Lever 3: Risk (rework and quality).** Rework falls from 18% to 6% [ESTIMATE — pilot QC sample]. Each rework costs 6 analyst hours. 6,000 × (0.18 − 0.06) × 6 = 4,320 hours = 2.7 FTE = GBP 0.18m. This is already partly inside the 24-to-11 hours measurement, so to avoid double counting we book zero here and note it. Avoided regulatory remediation is not booked; it is noted qualitatively.

**Lever 4: Customer experience.** NPS for onboarding is expected to rise; not monetised separately because the abandonment benefit already captures the cash effect.

**Full run-rate booked benefit (recurring):** GBP 2.50m (cost) + GBP 1.17m (revenue margin) = GBP 3.67m a year. One-off Year 2: GBP 1.62m.

### 4.4 Haircuts for evidence

| Benefit line | Evidence level | Haircut | Run-rate after haircut |
|---|---|---|---|
| Analyst capacity (cost) | PoC on client data | 25% | GBP 1.875m |
| Abandonment (revenue margin) | Internal funnel analysis plus assumption | 40% | GBP 0.70m |
| Time-to-revenue pull-forward (one-off) | Assumption | 50% | GBP 0.81m |

Haircut run-rate recurring benefit: GBP 2.58m a year.

### 4.5 Ramp

Using the ramp from 2.3 (20%, 69%, 90%, 95%, 95%) on the recurring GBP 2.58m, and placing the one-off pull-forward in Year 2:

| Year | Ramp | Recurring benefit | One-off | Total benefit |
|---|---|---|---|---|
| 1 | 20% | 0.52 | 0 | 0.52 |
| 2 | 69% | 1.78 | 0.81 | 2.59 |
| 3 | 90% | 2.32 | 0 | 2.32 |
| 4 | 95% | 2.45 | 0 | 2.45 |
| 5 | 95% | 2.45 | 0 | 2.45 |

All figures GBP millions.

### 4.6 Costs (TCO view, see Module 8 for the build-up)

[ESTIMATE — order of magnitude, VERIFY all vendor and model pricing]

| Cost line | Year 0 | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|---|
| Build: engineering, integration, data preparation | 1.60 | 0.60 | 0 | 0 | 0 | 0 |
| Build: evaluation set, model risk validation | 0.25 | 0.15 | 0 | 0 | 0 | 0 |
| Run: inference (tokens) | 0 | 0.08 | 0.18 | 0.22 | 0.23 | 0.23 |
| Run: platform, vector store, observability | 0 | 0.15 | 0.20 | 0.20 | 0.20 | 0.20 |
| Run: product and engineering team (4 FTE) | 0 | 0.40 | 0.40 | 0.40 | 0.40 | 0.40 |
| Run: model risk, evals, guardrail maintenance | 0 | 0.15 | 0.15 | 0.15 | 0.15 | 0.15 |
| Change: training, process redesign, comms | 0.20 | 0.30 | 0.10 | 0 | 0 | 0 |
| Model refresh and re-validation | 0 | 0 | 0.10 | 0.20 | 0.10 | 0.20 |
| Total cost | 2.05 | 1.83 | 1.13 | 1.17 | 1.08 | 1.18 |

All figures GBP millions. Inference cost build-up: 6,000 cases × ~350,000 tokens per case at full run-rate (documents, UBO reasoning, drafting, retries) ≈ 2.1bn tokens a year; at a blended GBP 0.11 per million tokens for a tiered model mix this is ≈ GBP 0.23m [ESTIMATE — order of magnitude, VERIFY].

### 4.7 Cash flows, NPV, IRR, payback

| Year | Benefit | Cost | Net cash flow | Discount factor (10%) | PV | Cumulative net (undiscounted) |
|---|---|---|---|---|---|---|
| 0 | 0 | 2.05 | −2.05 | 1.000 | −2.05 | −2.05 |
| 1 | 0.52 | 1.83 | −1.31 | 0.909 | −1.19 | −3.36 |
| 2 | 2.59 | 1.13 | 1.46 | 0.826 | 1.21 | −1.90 |
| 3 | 2.32 | 1.17 | 1.15 | 0.751 | 0.86 | −0.75 |
| 4 | 2.45 | 1.08 | 1.37 | 0.683 | 0.94 | 0.62 |
| 5 | 2.45 | 1.18 | 1.27 | 0.621 | 0.79 | 1.89 |

All figures GBP millions.

- NPV at 10% = −2.05 − 1.19 + 1.21 + 0.86 + 0.94 + 0.79 = GBP 0.56m.
- IRR: at 15% the PVs are −2.05, −1.14, 1.10, 0.76, 0.78, 0.63, summing to 0.08; at 16% they sum to approximately −0.01. IRR ≈ 16%.
- Payback (undiscounted): cumulative turns positive during Year 4; interpolating, −0.75 + 1.37 × f = 0 gives f ≈ 0.55, so payback ≈ 3.5 years from Year 0 (about 42 months).
- Total cost of ownership over the horizon: GBP 8.44m. Total haircut benefit: GBP 10.33m. Benefit-cost ratio on PV basis: PV benefits = 0.47 + 2.14 + 1.74 + 1.67 + 1.52 = 7.54; PV costs = 2.05 + 1.66 + 0.93 + 0.88 + 0.74 + 0.73 = 6.99; ratio 1.08.

**Reading.** On haircut, ramped benefits with full TCO, this is a marginal case: positive NPV, IRR a few points above hurdle, payback at the edge of the CFO's informal ceiling. It is honest, and it tells the client where the value is actually created.

### 4.8 What the un-haircut case would have said

Without haircuts and with a 50% Year 1 ramp (the typical junior build), recurring benefit is GBP 3.67m, Year 1 benefit GBP 1.84m, and NPV at 10% rises to roughly GBP 4.1m with payback in Year 2. The gap between GBP 4.1m and GBP 0.56m is the credibility gap the CFO will find in the first meeting. Present the conservative case and show the upside as scenarios.

### 4.9 Scenarios

| Scenario | Story | Key changes | NPV at 10% |
|---|---|---|---|
| Downside | Core system integration slips nine months; adoption stalls at 70%; hours per case only falls to 15 | Ramp 10%/45%/75%/80%/80%; cost benefit −30%; build cost +GBP 0.5m | −GBP 1.9m |
| Base | As built above | As above | GBP 0.56m |
| Upside | Pilot results hold in production (haircuts removed); periodic review agentic extension adds GBP 0.6m a year from Year 3 | No haircuts; extra benefit Y3–Y5 | GBP 4.0m |

Probability weights [ESTIMATE — assumption]: downside 30%, base 50%, upside 20%. Expected NPV = 0.3 × (−1.9) + 0.5 × 0.56 + 0.2 × 4.0 = −0.57 + 0.28 + 0.80 = GBP 0.51m. The expected value is positive but the downside is material, so the recommendation includes a Year 1 gate: proceed to scale only if measured hours per case in the first production cohort are at or below 13.

### 4.10 Tornado (one-at-a-time sensitivity on base NPV)

| Input | Low value | High value | NPV at low | NPV at high | Swing |
|---|---|---|---|---|---|
| Hours per case after automation | 15 | 9 | −0.9 | 1.3 | 2.2 |
| Booked FTE reduction | 20 | 40 | −0.9 | 2.0 | 2.9 |
| Abandonment after | 10% | 7% | −0.1 | 0.9 | 1.0 |
| Year 1 ramp | 10% | 40% | 0.3 | 1.1 | 0.8 |
| Build cost | +30% | −20% | 0.0 | 0.9 | 0.9 |
| Discount rate | 12% | 8% | 0.3 | 0.9 | 0.6 |
| Inference unit cost | ×2 | ×0.5 | 0.1 | 0.8 | 0.7 |

All NPVs GBP millions, [ILLUSTRATIVE — composite]. The two drivers that matter are the hours-per-case outcome and how much of the released capacity is actually booked. Inference cost, which engineering teams obsess over, is near the bottom. That is the "so what": validation effort should go into the production measurement of hours per case and into securing a signed headcount bridge, not into token-price negotiation.

## 5. Real-world case

**Klarna, 2024–2025** [PUBLIC — Klarna press release, Feb 2024; CEO interviews, May 2025; VERIFY current figures]. In February 2024 Klarna announced that its OpenAI-powered customer service assistant was handling two-thirds of customer service chats in its first month, doing the equivalent work of roughly 700 full-time agents, and projected a USD 40 million profit improvement for 2024. The case is instructive for business-case construction in three ways. First, the headline benefit was a capacity figure (700 FTE equivalents) rather than booked headcount, and most of those agents were outsourced, so the cash-releasing mechanism was a reduction in outsourcing spend, which is a clean, contract-based benefit. Second, in 2025 the CEO publicly acknowledged that the company had gone too far on cost and would re-hire humans to lift service quality, which illustrates the unbooked cost side of a case: customer experience degradation does not appear in Year 1 cost lines but surfaces later as churn, complaints and reversal cost. Third, the revised position was a hybrid model, which is the shape most bank business cases should assume from the start: an AI-handled share with a human tier, not full substitution.

**Commonwealth Bank of Australia, 2025** [PUBLIC — Australian media and Finance Sector Union statements, Aug 2025; VERIFY]. CBA reversed 45 call-centre redundancies after a union challenge showed that the AI voice bot had not reduced call volumes as the business case assumed, and that staff were working overtime. For the business case, this is the attribution and baseline failure in 2.6: the benefit (volume reduction) was assumed, not measured, before the headcount action was taken.

## 6. Consultant language

> "We have booked only the capacity the business owner has signed for; the rest is reported as unbooked upside."

Use when presenting cost benefits to Finance, to pre-empt the capacity-release challenge.

> "Every benefit line carries an evidence haircut, so the case gets stronger as the pilot data comes in, not weaker."

Use at the steering committee to explain why your NPV is lower than the vendor's.

> "The tornado tells us where the case lives: two assumptions drive 70% of the variance, and both are measurable in the first production cohort."

Use to redirect debate from token prices to the metrics that matter.

> "This is a net-of-overlap figure; we have reconciled it against the digital onboarding and operations transformation benefit registers."

Use when the CFO raises double counting.

> "Our recommendation is conditional: scale is gated on a measured hours-per-case at or below 13 in the first cohort."

Use when closing; it turns the case into a decision rule rather than a forecast.

## 7. Common mistakes juniors make

- Counting released hours as cost savings with no headcount bridge or redeployment plan.
- Using a single Year 1 ramp percentage instead of decomposing coverage, adoption and effectiveness.
- Baselining on the most expensive quarter or the gross FTE rate rather than trailing twelve months and fully loaded cost with HR sign-off.
- Omitting run costs: inference, human review, model risk validation, evaluation maintenance and model refresh.
- Double counting the same hours under "efficiency" and "quality" (rework) levers.
- Presenting a point estimate with no sensitivity, so the first challenge collapses the whole case.
- Monetising NPS or CX separately when the cash effect is already captured in abandonment or churn.
- Including revenue pull-forward as recurring benefit.
- Quoting vendor-claimed outcomes without a haircut and without naming them as vendor claims.
- Writing the case after the technology choice instead of before it, so the case justifies a decision already taken.

## 8. Interview questions with model answers

**Q1. A client's AI chatbot case claims GBP 5m a year from "freeing 25% of contact-centre agent time". How do you test it?**

Model answer. I would structure the test around baseline, mechanism and booking. On baseline, I would ask for the trailing-twelve-month handle time and contact volume by intent, and check the fully loaded agent cost; a 25% time release on 400 agents at GBP 50,000 is GBP 5m only if every freed hour becomes cash. On mechanism, I would decompose the 25% into containment rate (share of contacts fully handled by the bot), deflection quality (are deflected contacts coming back through another channel) and handle-time change on contacts the bot assists but does not close. On booking, I would ask which of three things the business is committing to: headcount reduction through attrition, redeployment into measurable revenue work, or absorbing planned volume growth. Only the committed part is booked; the rest is unbooked capacity. Then I would apply an evidence haircut (a vendor benchmark deserves 50% or more), decompose the ramp into coverage, adoption and effectiveness, and add run cost: inference, human escalation tier, model risk and content maintenance. Typically a GBP 5m claim becomes GBP 1.5–2.5m of defensible benefit, and I would present that number with the upside as a scenario. The CBA 2025 reversal is a useful reference for what happens when volume reduction is assumed rather than measured [PUBLIC — Aug 2025; VERIFY].

**Q2. The CFO says the discount rate should be 15% for AI because it is risky. How do you respond?**

Model answer. I would separate two kinds of risk. Systematic, cost-of-capital risk belongs in the discount rate and should be the same hurdle the bank uses for comparable technology change, typically 8–12% [ESTIMATE]. Project-specific risk, such as adoption stalling or the model under-performing, is better handled explicitly in the cash flows through evidence haircuts, a decomposed ramp and probability-weighted scenarios, because that makes the risk visible and manageable rather than hidden in a rate. Inflating the discount rate penalises later cash flows disproportionately, which happens to be where AI benefits sit after the ramp, so it systematically biases against exactly the projects with sound, slower ramps. I would offer the CFO both views: NPV at the standard hurdle with risk in the cash flows, and the same cash flows at 15% as a stress. If the project only works at the standard rate with un-haircut benefits, the CFO is right to be sceptical. If it survives haircuts at the standard rate, a higher rate adds little information. I would also propose gating: release scale funding only when the first production cohort hits the measured KPI, which reduces the real risk rather than just repricing it.

**Q3. Walk me through how you would build the business case for an agentic sanctions-screening triage system.**

Model answer. Start with the baseline: alert volumes by list and channel, false-positive rate (often above 95% in payment screening [ESTIMATE — common practitioner range, VERIFY for the client]), analyst minutes per alert at level 1 and level 2, fully loaded cost, SLA breaches and any regulatory findings. The primary lever is cost: the agent triages and closes clear false positives with a documented rationale, so level-1 minutes per alert fall and a share of alerts never reach a human. I would measure that in a back-test on six months of historical alerts, with the compliance function validating the agent's dispositions against the analysts' originals, and I would book only the share of alerts where the agent's agreement with the human disposition exceeds the agreed threshold. Secondary levers are risk (consistency of dispositions, fewer missed true matches through better narrative quality) and speed (payments released faster, fewer customer complaints), both treated qualitatively or lightly haircut. Costs include build and integration with the screening engine, the inference cost per alert, a human sampling tier, independent model validation under the bank's model risk framework, and ongoing evaluation as sanctions lists change. I would ramp conservatively, because compliance will insist on a shadow-mode period, and I would present NPV, payback and a tornado, with the headline that the case depends on the validated auto-close rate and on the compliance function accepting that rate.

## 9. Self-check quiz

1. A benefit line is based on a vendor's published case study from another bank. What haircut range would you apply, and why?
2. Explain the difference between capacity release and cash-releasing cost benefit, and name the three ways capacity release can become bookable.
3. A project has net cash flows of −3.0, −0.5, 1.8, 2.0, 2.0 (GBP millions) in Years 0–4. Compute NPV at 10% and the undiscounted payback period.
4. Your Year 1 assumptions are coverage 50%, adoption 80%, effectiveness 75%. What is the combined Year 1 ramp, and what does this imply about a case that assumes 50% Year 1 benefit?
5. Name four challenges a CFO will raise against an AI business case and the specific pre-emption for each.
