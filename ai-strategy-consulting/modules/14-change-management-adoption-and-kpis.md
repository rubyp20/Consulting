# Module 14 — Change Management, Adoption and the KPI Framework

## 1. Why a client cares

An AI system that is accurate but unused delivers nothing, and an AI system that is used but unmeasured cannot be defended at the next budget round. Clients have been told by their own boards that "95% of GenAI pilots show no P&L impact" `[PUBLIC — MIT NANDA, Aug 2025; VERIFY, small self-reported sample]`, and the two most common causes are adoption failure and measurement failure. This module covers the mechanics of both: how people actually come to rely on an AI system, and how to build a KPI chain from model behaviour to the P&L that a CFO will accept.

## 2. Concept and mechanism

### 2.1 Adoption is a trust-calibration problem

Human reliance on an automated system is governed by calibration: the degree to which the user's trust matches the system's actual reliability. The research base is in human factors (Lee and See, "Trust in Automation", 2004; Parasuraman and Riley, "Humans and Automation: Use, Misuse, Disuse, Abuse", 1997) `[PUBLIC — Human Factors journal]`. Four states matter:

- **Calibrated trust:** reliance matches reliability. The target state.
- **Over-trust (misuse):** users accept outputs without checking. In an agentic dispute-resolution system this shows up as human reviewers approving 99% of agent recommendations in under ten seconds, which means the control has become theatre.
- **Under-trust (disuse):** users re-do the work or route around the system. Shows up as low usage, parallel spreadsheets, and "I just check it myself anyway".
- **Abuse:** the system is deployed for tasks it was not designed or validated for.

Two failure mechanisms are specific to AI in operations:

- **Automation bias and complacency.** When a system is right most of the time, humans stop scrutinising. Documented in aviation and clinical decision support; directly transferable to AML alert triage and KYC document review. The design counter-measures are: forced disagreement sampling (show the reviewer cases where the agent is uncertain), confidence display calibrated to actual accuracy, random blind audits, and rotating reviewers between assisted and unassisted work.
- **Skill atrophy.** If junior analysts never do first-pass work, the bank loses the pipeline that produces senior analysts who can judge the agent's output. Mitigations include deliberate unassisted rotations, using the agent as a training tool (explain-the-reasoning mode), and redefining the junior role around exception handling and quality assurance.

### 2.2 Role redesign is the real change

AI in a process changes what a role does rather than removing the role in one step. For a disputes analyst, the shift is from case assembly (gather evidence, read merchant response, apply reason-code rules) to adjudication of exceptions and supervision of the agent's queue. That changes required skills (judgement over procedure), performance measures (quality and override accuracy over cases per hour), career path, and span of control. If performance measures stay on cases per hour, the analyst is incentivised to rubber-stamp, which destroys the control. Role redesign therefore has to be done jointly by Operations, HR and Risk, and before go-live, not after.

### 2.3 Workforce transition

The honest frame for a client is capacity: an agentic system releases hours. What the bank does with the hours is a management decision with four options: redeploy to backlog or growth work, redeploy to quality and control work, reduce attrition backfill, or reduce headcount. The business case should state which. The public record shows the cost of getting this wrong in both directions: Klarna announced in 2024 that its assistant did the work of around 700 agents and in 2025 said it had over-rotated on cost and would re-hire humans for quality `[PUBLIC — Klarna, Feb 2024; CEO interviews, May 2025; VERIFY]`; Commonwealth Bank of Australia reversed 45 call-centre redundancies in 2025 after a union challenge showed call volumes had not fallen as assumed `[PUBLIC — Aug 2025; VERIFY]`.

Reskilling has a cost line. For an operations workforce the typical plan has three tracks: AI-supervisor skills for the retained analysts (prompting, interpreting confidence, escalation), quality and controls skills for a smaller group that becomes the human assurance layer, and transition support for roles that end.

### 2.4 Incentive alignment

Adoption follows incentives more than training. Design checks:

- Are team leaders measured on throughput in a way that penalises taking time to review agent output properly?
- Does a reviewer who overrides the agent face more work (writing justification) than one who approves? If so, approvals will be inflated.
- Is the business unit credited with benefits only if headcount falls, which makes managers resist adoption to protect teams?
- Do the people whose work changes have any say in the exception taxonomy and the HITL thresholds? Co-design is the cheapest adoption lever available.

### 2.5 The KPI framework: three layers and a causal chain

A defensible KPI framework for an AI system has three layers, and the value of the framework is in the arrows between them.

| Layer | What it measures | Examples | Owner | Cadence |
|---|---|---|---|---|
| Model and system KPIs | Does the system behave as designed | Accuracy against golden set; groundedness or faithfulness; hallucination rate; precision/recall per decision class; latency p50/p95; cost per task; tool-call success rate; override rate; escalation rate; drift indicators | AI product owner, platform | Daily to weekly |
| Operational KPIs | Did the process change | Cycle time; straight-through processing rate; touches per case; rework rate; backlog age; analyst hours per case; adoption rate (share of eligible cases routed via the system); active-user rate | Process owner | Weekly to monthly |
| Business KPIs | Did the P&L or risk position change | Cost per unit (per dispute, per onboarding); FTE capacity released; revenue retained or won; loss rate (chargeback write-offs, fraud losses); regulatory breaches; complaints; NPS or CSAT; time-to-revenue | Business-unit leader, Finance | Monthly to quarterly |

The causal chain for a dispute-resolution agent reads: higher accuracy and groundedness (model) allow a higher auto-adjudication threshold, which raises straight-through rate and lowers touches per case (operational), which lowers cost per dispute and cycle time, which improves recovery rate on merchant chargebacks and customer satisfaction (business). A KPI framework that lists metrics without these arrows cannot explain why a business KPI moved, and a CFO will attribute the movement to something else.

### 2.6 Leading versus lagging indicators

Leading indicators move first and predict the business result: adoption rate, override rate, straight-through rate, eval accuracy on new golden cases, user confidence survey. Lagging indicators confirm it: cost per unit, loss rate, NPS, FTE released. In the first six months of a deployment, the steering committee should be managing on leading indicators, because the lagging ones are dominated by noise and ramp. A common governance failure is to review only lagging indicators quarterly, discover a problem two quarters late, and then blame the model.

### 2.7 KPI tree construction

Build the tree top-down from the business case lever and bottom-up from the system's measurable behaviour, and make them meet:

1. Start with the business-case benefit lines (for example, cost per dispute down 35%).
2. Decompose each into operational drivers (touches per case, handle time per touch, straight-through rate).
3. For each operational driver identify the system behaviours that move it (auto-adjudication threshold, accuracy at that threshold, evidence-retrieval completeness).
4. For each system behaviour name the eval or monitoring metric and its target.
5. Mark each node leading or lagging and assign an owner and a data source.
6. Define the baseline measurement method and period for every node before go-live.

### 2.8 Measurement pitfalls

- **Baseline inflation and drift.** The pre-AI baseline is measured in a quarter with unusual volume, or the process changes for other reasons during the pilot. Use a 6 to 12 month baseline and a control group where feasible (a region, a product line, or a randomised share of cases).
- **Hawthorne effect.** Pilot teams perform better because they are observed. Control groups and a sustainment check at month 9 to 12 address this.
- **Attribution.** Other initiatives (a new case-management tool, a policy change) move the same KPI. Agree attribution rules with Finance up front; where a control group is impossible, use a pre-agreed attribution share.
- **Survivorship in eval sets.** Golden datasets built from historical closed cases over-represent the easy cases; sample from live traffic quarterly.
- **Goodhart's law.** When straight-through rate becomes the target, thresholds get lowered and quality falls. Pair every efficiency KPI with a quality KPI (override accuracy, audit error rate).
- **Measuring hours released, not hours redeployed.** Finance will only count what is redeployed or removed; the KPI framework should track both and show the gap.

## 3. Frameworks

### 3.1 Kotter's eight steps (John Kotter, "Leading Change", 1996) [PUBLIC — Harvard Business School Press]

Create urgency; build a guiding coalition; form a strategic vision; enlist a volunteer army; enable action by removing barriers; generate short-term wins; sustain acceleration; institute change. Applied to AI programmes: the "short-term wins" step maps directly to the wave-one quick wins in the use-case roadmap, and "remove barriers" is usually about data access, risk approval paths and performance measures rather than attitudes.

### 3.2 ADKAR (Prosci, Jeff Hiatt, 2003) [PUBLIC — Prosci]

Awareness, Desire, Knowledge, Ability, Reinforcement, assessed at the individual level. ADKAR is more useful than Kotter for operations teams because it diagnoses where a specific population is stuck. For an AI deployment, the common gap is Desire (fear about roles) and Reinforcement (performance measures unchanged). Apply by surveying each affected role against the five elements before go-live and at month three, and targeting interventions at the lowest-scoring element.

### 3.3 Trust-in-automation calibration (Lee and See, 2004) [PUBLIC — Human Factors]

Use as the design frame for HITL: the aim is calibrated reliance, achieved through transparency (show reasoning and evidence), displayed confidence that matches real accuracy, and feedback (show the reviewer when they were right to override). Pair with Parasuraman and Riley's misuse/disuse taxonomy when explaining override-rate anomalies to a steering committee.

### 3.4 Three-layer KPI framework with causal chain (attribution: generic practitioner framework; the model/operational/business layering is common across consultancies)

Steps are in Section 2.7. The framework's test is whether every business KPI has at least one leading operational KPI and one system KPI beneath it with named owners and baselines.

### 3.5 Balanced scorecard (Kaplan and Norton, 1992) [PUBLIC — Harvard Business Review]

Useful when the client wants AI KPIs integrated into existing performance management: financial, customer, internal process, learning and growth. Map business KPIs to the first two perspectives, operational KPIs to internal process, and adoption and skills metrics to learning and growth.

## 4. Worked BFSI example

`[ILLUSTRATIVE — composite]` Meridian Cards, a UK card issuer with 4.2 million cards, processes 420,000 cardholder disputes a year in an operations centre of 210 disputes analysts and 18 team leaders. A supervisor-led multi-agent dispute system (evidence gathering, reason-code classification, merchant-response analysis, draft adjudication, with HITL approval) goes live in January.

### 4.1 Baseline (12-month average, prior year)

| Metric | Baseline |
|---|---|
| Disputes per year | 420,000 |
| Average touches per case | 3.4 |
| Average handle time per touch | 11 minutes |
| Analyst hours per case | 0.62 |
| Cycle time to provisional decision | 6.8 days |
| Straight-through (no analyst touch) | 0% |
| Cost per dispute (fully loaded) | GBP 31 |
| Chargeback recovery rate (merchant liable cases) | 61% |
| Dispute-related complaints per 1,000 disputes | 14 |
| Dispute CSAT | 62 |

Cost per dispute check: 210 analysts at GBP 52k loaded plus 18 team leaders at GBP 68k = GBP 12.1m; plus systems and overhead GBP 0.9m; total GBP 13.0m / 420,000 = GBP 31.

### 4.2 KPI tree with targets at 3, 6 and 12 months

| Layer | KPI | Type | Baseline | Month 3 | Month 6 | Month 12 | Owner |
|---|---|---|---|---|---|---|---|
| System | Adjudication accuracy vs golden set (n=1,500) | Leading | n/a | 91% | 94% | 96% | AI product owner |
| System | Groundedness of draft rationale (LLM-judge, sampled) | Leading | n/a | 95% | 97% | 98% | AI product owner |
| System | Override rate by reviewers | Leading | n/a | 22% | 14% | 9% | AI product owner |
| System | Override accuracy (share of overrides that were correct on audit) | Leading | n/a | 85% | 88% | 90% | Quality lead |
| System | Cost per case (tokens and infra) | Leading | n/a | GBP 1.10 | GBP 0.85 | GBP 0.70 | Platform |
| System | Latency p95 for draft decision | Leading | n/a | 90 s | 60 s | 45 s | Platform |
| Operational | Share of eligible disputes routed via agent (adoption) | Leading | 0% | 40% | 75% | 95% | Ops director |
| Operational | Straight-through rate (auto-adjudicated low-risk classes) | Leading | 0% | 10% | 25% | 40% | Ops director |
| Operational | Touches per case | Leading | 3.4 | 2.6 | 1.9 | 1.5 | Ops director |
| Operational | Cycle time to provisional decision (days) | Lagging | 6.8 | 5.0 | 3.2 | 2.0 | Ops director |
| Operational | Rework rate (cases reopened) | Lagging | 7% | 7% | 5% | 4% | Quality lead |
| Business | Cost per dispute | Lagging | GBP 31 | GBP 28 | GBP 23 | GBP 19 | CFO BU |
| Business | Analyst capacity released (FTE-equivalent) | Lagging | 0 | 20 | 60 | 85 | CFO BU |
| Business | Chargeback recovery rate | Lagging | 61% | 62% | 65% | 68% | Head of disputes |
| Business | Complaints per 1,000 disputes | Lagging | 14 | 14 | 11 | 9 | Conduct risk |
| Business | Dispute CSAT | Lagging | 62 | 63 | 68 | 72 | CX lead |

Arithmetic for the month-12 cost per dispute: analyst hours per case fall from 0.62 to roughly 0.28 (1.5 touches x 11 minutes, plus review time on agent drafts). Capacity released of 85 FTE out of 210 is 40%; GBP 13.0m x (1 - 0.40 x 12.1/13.0) = GBP 8.2m of people cost; add agent run cost 420,000 x GBP 0.70 = GBP 0.29m and platform allocation GBP 0.5m; total GBP 8.0m / 420,000 = GBP 19 `[ESTIMATE]`. Recovery-rate improvement is worth more than the cost saving: 420,000 disputes, 55% merchant-liable, average GBP 140, 7 percentage points of recovery = GBP 2.3m a year `[ESTIMATE]`.

### 4.3 Adoption plan

| Phase | Months | Actions | Adoption KPI gate |
|---|---|---|---|
| Co-design | -3 to 0 | 12 analysts and 3 team leaders design exception taxonomy, HITL thresholds and the review screen; HR redesigns role profile (adjudicator and quality analyst); performance measures changed from cases per hour to quality-weighted throughput | Role profiles and measures signed by HR, Ops and Risk |
| Pilot cohort | 1 to 3 | Two teams (40 analysts), assisted mode only (no straight-through); daily calibration huddle reviewing override cases; forced disagreement sampling at 10% | 40% routing; override rate below 25%; override accuracy above 85% |
| Expand | 4 to 6 | All teams; straight-through enabled for two lowest-risk reason-code classes; reviewers rotate one day a week unassisted to preserve skill; monthly ADKAR pulse | 75% routing; 25% straight-through; complaints flat or down |
| Sustain | 7 to 12 | Straight-through extended to further classes on evidence; quality analyst track formed (25 roles); redeployment of released capacity to fraud investigations backlog and collections; quarterly blind audit | 95% routing; override accuracy above 90%; audit error rate below 2% |

### 4.4 Dashboard specification

- **Audience and cadence:** AI product owner daily (system layer); operations steering weekly (system and operational); executive and CFO monthly (all layers with the causal chain shown left to right).
- **Structure:** one page per layer plus a summary page showing the chain: accuracy and override rate, then straight-through and touches per case, then cost per dispute and recovery rate, each with baseline, target and actual.
- **Data sources:** eval harness (accuracy, groundedness), orchestration audit log (override, escalation, latency, cost), case-management system (touches, cycle time, rework), general ledger and workforce system (cost, FTE), complaints system, CSAT survey.
- **Controls shown alongside efficiency:** override accuracy, blind-audit error rate, complaint rate, and a drift indicator (accuracy on the latest 200 live-sampled cases vs golden set).
- **Attribution note on the summary page:** control group of 10% of cases held in manual processing for the first six months to isolate the agent's effect from seasonality and policy changes.

So what for the client: the business case rests on two leading indicators, override rate and straight-through rate, and the adoption plan exists to move those; the CFO sees cost per dispute and recovery rate, but the steering committee should manage the leading pair weekly.

## 5. Real-world case

**Morgan Stanley Wealth Management** `[PUBLIC — Morgan Stanley and OpenAI statements, 2023–2024; VERIFY figures]`. The AI @ Morgan Stanley Assistant, built on GPT-4 for around 16,000 financial advisers, launched in September 2023, with the Debrief meeting-summary tool following in June 2024. Reported adoption of around 98% of adviser teams is unusually high for an enterprise GenAI tool. The publicly described drivers were: a tightly scoped first use case (retrieval over the firm's own research and procedures) where the answer quality was testable; an evaluation programme run with the vendor before rollout; adviser co-design; and a second use case (Debrief) that removed a disliked task rather than adding a tool. The adoption lesson is that the KPI to manage early was adviser usage and answer acceptance, and the firm invested in evaluation and content curation to move it.

**Klarna** `[PUBLIC — Klarna, Feb 2024; CEO interviews, May 2025; VERIFY]`. The February 2024 announcement quantified the assistant's impact in operational KPIs (two-thirds of chats handled, resolution time from 11 minutes to under 2, repeat inquiries down 25%) and a business KPI (estimated USD 40m profit improvement). By 2025 the CEO acknowledged the firm had over-weighted cost and under-weighted quality and would re-introduce human agents for customers who wanted them. The KPI lesson is that the framework lacked a paired quality KPI with equal weight to the efficiency KPI, and the workforce-transition decision was made before the lagging customer indicators had matured.

## 6. Consultant language

> "The control is only as good as the override rate is honest."

Use when the client reports a very low override rate as a success; it reframes it as a possible automation-bias signal.

> "We will manage the programme on leading indicators and report it on lagging ones."

Use when designing steering-committee governance; it sets expectations about what the CFO will see and when.

> "Every efficiency KPI gets a paired quality KPI with equal weight."

Use to pre-empt Goodhart's law in target setting.

> "Capacity released is a management option, not a benefit, until you decide what to do with it."

Use with the CFO and the COO together when the business case counts hours.

> "Role redesign happens before go-live, with HR and Risk in the room, or adoption will be whatever the old performance measures reward."

Use when the client plans to "roll it out and see".

## 7. Common mistakes juniors make

- **Treating change management as training and communications.** The levers that move adoption are performance measures, role design, incentive alignment and co-design; training is necessary and insufficient.
- **Reporting adoption as logins.** Adoption is the share of eligible work routed through the system and the share of recommendations acted on; logins measure curiosity.
- **Listing KPIs without a causal chain.** If the business KPI moves, nobody can say why; if it does not, nobody can say which upstream metric to fix.
- **Celebrating a near-zero override rate.** It usually signals automation bias or a review step that has become a rubber stamp.
- **Using a one-month baseline.** Seasonality in disputes, onboarding and collections is large; use 6 to 12 months and a control group.
- **Counting hours released as savings.** Finance will haircut them to zero unless redeployment or headcount decisions are explicit.
- **Ignoring skill atrophy.** Removing all first-pass work from juniors destroys the future supply of people who can judge the system.

## 8. Interview questions with model answers

### Q1. How would you design the KPI framework for an agentic AI deployment so that a CFO accepts the benefits?

Model answer: I would build three layers and insist on the links between them. The system layer measures whether the agent behaves as designed: accuracy against a golden dataset, groundedness, override rate, override accuracy, latency and cost per task. The operational layer measures whether the process changed: routing or adoption rate, straight-through rate, touches per case, cycle time, rework. The business layer measures the P&L and risk effect: cost per unit, capacity released and what was done with it, loss or recovery rates, complaints, satisfaction. The CFO conversation is won on three things. First, baselines agreed before go-live over a 6 to 12 month window, with a control group where possible. Second, attribution rules agreed in advance for KPIs that other initiatives also move. Third, the distinction between capacity released and capacity redeployed or removed, with the business case stating which. I would manage the programme weekly on the leading indicators, override rate and straight-through rate in particular, and report monthly on the lagging ones, and I would pair every efficiency KPI with a quality KPI so that the targets cannot be hit by lowering thresholds. As an illustration, in a disputes deployment I would expect cost per dispute to be the headline, but the steering committee should be watching whether override accuracy stays above 90% as the straight-through rate rises.

### Q2. Six months into a deployment, reviewer override rate has fallen from 20% to 2%. The operations head calls it a success. What is your reaction?

Model answer: I would treat it as a signal to investigate rather than a result to celebrate, because a 2% override rate is consistent with two very different stories. Either the agent's accuracy has genuinely risen to around 98% on the routed population, or reviewers have stopped reviewing, which is automation bias. The way to distinguish them is to look at the paired metrics: blind audit error rate on a random sample of approved cases, median review time per case, override accuracy, and whether accuracy on the latest live-sampled golden cases has actually improved. If audit error rate is up or review time has collapsed to a few seconds, the human-in-the-loop control has become theatre and the bank is exposed, particularly if the system is Tier 1 under its model-risk framework. The remedies are design changes, not exhortation: forced disagreement sampling where the reviewer must decide a case before seeing the agent's view, calibrated confidence display, rotation into unassisted work, and performance measures that reward correct overrides. I would also raise it with the second line, because the validation of the system assumed a functioning review step.

### Q3. What is the difference between leading and lagging indicators in an AI programme, and why does it matter for governance?

Model answer: Leading indicators move early and predict the outcome: adoption rate, override rate, straight-through rate, eval accuracy on new cases, user confidence. Lagging indicators confirm the outcome: cost per unit, loss rates, satisfaction, capacity released. It matters because lagging indicators in the first two quarters are dominated by ramp, seasonality and noise, so a steering committee that reviews only lagging indicators quarterly will discover problems two quarters late and will have no way to diagnose them. Governance should therefore run at two cadences: weekly on leading indicators owned by the product and operations leads, with pre-agreed thresholds that trigger action (for instance, override rate above 25% pauses threshold increases), and monthly or quarterly on lagging indicators for the executive and the CFO. The causal chain between the layers is what lets you explain a lagging movement using a leading cause, which is also what makes the benefit attributable rather than coincidental.

## 9. Self-check quiz

1. Name the four states in the trust-in-automation taxonomy and give one operational symptom of each in an AML alert-triage deployment.
2. A disputes operation handles 300,000 cases a year at 3.0 touches per case and 12 minutes per touch, with analysts costing GBP 50 per productive hour. If an agent reduces touches to 1.6 and adds 2 minutes of review time per case, what is the annual change in analyst cost? Show the arithmetic.
3. Which element of ADKAR is most often the gap in operations teams facing AI deployment, and which single design choice addresses it most directly?
4. Why should every efficiency KPI be paired with a quality KPI? Name the principle and give an example pair.
5. What are two methods to protect the benefit measurement from baseline drift and the Hawthorne effect?
