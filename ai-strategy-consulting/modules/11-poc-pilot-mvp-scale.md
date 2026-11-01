# Module 11 — From Proof of Concept to Scale: Stage Gates and Escaping Pilot Purgatory

## 1. Why a client cares

Most banks now have dozens of GenAI proofs of concept and very few systems in production carrying real volume. The board sees spend without P&L impact, the CRO sees ungoverned experiments, and the business sees tools that never reach the front line. The consultant who can define what each stage must prove, who must decide, and what has to be true before the first line of code is written is the one who turns a portfolio of demos into a portfolio of running systems.

## 2. Concept and mechanism

### 2.1 Stage definitions

The four stages differ in what question they answer, not just in size.

| Stage | Question it answers | Typical duration (banking) | Data | Users | Integration | Governance |
|---|---|---|---|---|---|---|
| Proof of concept (PoC) | Can the technique do the task at acceptable quality on our data? | 4–8 weeks | Historical, anonymised or synthetic sample | Project team, a few SMEs | None or mocked | Sandbox approval, data use sign-off |
| Pilot | Does it work in the real workflow with real users, and what is the measured benefit? | 8–16 weeks | Live or shadow production data, bounded scope | One team or site, 10–50 users | Read-only or shadow integration | Model risk tier assigned; HITL mandatory; pilot risk assessment |
| Minimum viable product (MVP) | Can it run in production with controls, at a subset of volume, and hold its KPIs? | 3–6 months | Production | Defined user population, partial volume | Production integration with core systems | Full model validation; change approval; monitoring live |
| Scale | Does the benefit hold across the full population and can the organisation run it? | 6–18 months | Production, full volume | All intended users, possibly multiple geographies | Hardened, resilient, observable | Ongoing monitoring, periodic re-validation, benefits tracking |

[ESTIMATE — typical ranges; durations vary with integration complexity and regulatory tier]

The commonest confusion is between PoC and pilot. A PoC proves technical feasibility on a sample; it never proves business value, because it runs outside the workflow. A pilot runs in the workflow and measures behaviour change and benefit. A programme that calls a PoC a pilot will book benefits it has not measured.

### 2.2 Exit criteria by stage

Exit criteria must be defined before the stage starts and should cover four dimensions.

| Dimension | PoC exit | Pilot exit | MVP exit | Scale checkpoint |
|---|---|---|---|---|
| Technical | Task accuracy on golden set above threshold; hallucination/faithfulness within tolerance; latency acceptable | Accuracy holds on live data; drift between golden set and live within tolerance | Accuracy, latency and availability hold under production load; monitoring alerts tested | Performance stable across segments and geographies; re-validation cadence met |
| Operational | Workflow design agreed; integration path identified and costed | Users adopt (usage rate); handle time or throughput improves; HITL override rate within band | Straight-through-processing rate and exception volumes within plan; run team staffed | Benefits realised against plan; operating model embedded |
| Business | Benefit hypothesis quantified with baseline | Benefit measured on pilot population and extrapolated with haircut | Benefit tracked monthly; business owner signs off | NPV tracking against case; next-wave decisions |
| Risk | Data use approved; initial model risk classification; no prohibited uses | Pilot risk assessment closed; incidents logged and reviewed; fairness checks on pilot outputs | Independent validation complete; controls tested; regulatory notifications made if required | Audit findings closed; periodic review complete |

### 2.3 Designing success criteria

Good success criteria are specific, measured by an agreed method, owned by a named person, and set before the work starts. Four rules:

1. **Pair every model metric with a business metric.** Extraction accuracy of 95% means nothing unless it is paired with "analyst review time per document falls from 12 to 5 minutes". The model metric is the leading indicator; the business metric is what gets funded.
2. **Set thresholds with the second line.** The accuracy threshold for a sanctions triage agent is a risk appetite statement, not an engineering choice. Compliance and model risk set it; engineering meets it.
3. **Define the measurement method.** Who samples, how many, how often, compared against what reference. A 2% difference in accuracy is noise on 100 samples and signal on 2,000.
4. **Include a stopping rule.** State what result ends the project. If nothing could stop it, it is not an experiment.

### 2.4 Pilot purgatory: causes and remedies

Pilot purgatory is the state in which a PoC or pilot shows promising results but never reaches production. External evidence that it is widespread: Gartner predicted in July 2024 that at least 30% of GenAI projects would be abandoned after proof of concept by the end of 2025, citing poor data quality, inadequate risk controls, escalating costs and unclear business value [PUBLIC — Gartner, Jul 2024; VERIFY]; Gartner predicted in June 2025 that over 40% of agentic AI projects would be cancelled by the end of 2027 [PUBLIC — Gartner, Jun 2025; VERIFY]; MIT NANDA's "GenAI Divide" report in August 2025 reported that around 95% of enterprise GenAI pilots delivered no measurable P&L impact, with methodological caveats including a small, self-reported sample [PUBLIC — MIT NANDA, Aug 2025; VERIFY]; and RAND found in 2024 that over 80% of AI projects fail, about twice the rate of non-AI IT projects [PUBLIC — RAND, 2024].

| Cause | How it shows up | Remedy |
|---|---|---|
| No production path defined | PoC built on a laptop or sandbox with no integration design; "productionising" becomes a new project nobody funded | Before PoC starts, document the target architecture, integration points, data access route and the budget for integration; fund the pilot and MVP in principle at PoC approval |
| No business owner | Innovation team or IT runs the PoC; the business sees it as "their" tool | Named business owner with P&L accountability signs the benefit hypothesis and the success criteria at PoC start |
| Data access not secured | PoC on synthetic or extracted data; production data access requires a six-month approval | Start data access and data protection approvals in parallel with the PoC; use the PoC to specify exactly what data is needed |
| Model risk engaged too late | Validation starts at MVP, finds the model untiered and the evals inadequate, and stops the launch | Classify the model and agree the evidence pack with model risk at PoC start; design the golden dataset with validation in mind |
| Success criteria vague or moving | "Promising results"; the demo impresses but nobody can say whether to proceed | Quantified exit criteria with a stopping rule, signed before the stage |
| Benefit not measured | Benefit remains a hypothesis; the business case cannot be updated | Pilot in the workflow with a control group or before/after measurement; haircut and extrapolate |
| Technology chosen before problem | Tool looking for a use case; weak fit; low adoption | Use-case assessment first (Module 7); the technology is an output |
| Run costs and run team ignored | No one owns the system after the consultants leave; costs appear as a surprise | TCO and operating model defined at pilot exit (Module 8, Module 13) |
| Change capacity absent | Users not trained; process not redesigned; the tool is bolted onto the old workflow | Change plan and process redesign funded as part of the MVP, not after |
| Point solutions without platform | Each PoC builds its own gateway, vector store and evals; the tenth PoC costs as much as the first | Platform and pattern library investment after the second or third PoC |

### 2.5 What to decide before a PoC starts

A PoC should not begin until the following are written down and signed:

- The business problem, the baseline metric and the benefit hypothesis in numbers.
- The business owner, the product owner and the model risk contact.
- The target production architecture and the integration path, with an order-of-magnitude cost.
- The data needed, where it lives, who approves access, and the expected approval timeline.
- The initial model risk classification and the evidence model risk will need.
- The success criteria, measurement method and stopping rule.
- The funding path: what is funded now, what is funded in principle if criteria are met, and who decides.
- The intended HITL design and autonomy level for the pilot (Module 3).

### 2.6 Scaling playbook

Scaling is an organisational problem more than a technical one. BCG's 10-20-70 heuristic attributes roughly 10% of the effort to algorithms, 20% to technology and data and 70% to people, process and change [PUBLIC — BCG, 2023–24]. Elements of a scaling playbook:

- **Platform reuse.** A shared gateway, vector store, evaluation harness, observability and guardrail service, so that the marginal use case costs a fraction of the first. Measure the "time to second use case".
- **Pattern library.** Reference architectures for the recurring patterns in banking: document extraction and summarisation, knowledge assistant with RAG, alert triage agent, case-file drafting, code modernisation. Each pattern carries its control set and evaluation template.
- **Reusable controls.** Pre-approved guardrails, logging standards and HITL patterns so each new use case inherits an approved baseline and model risk reviews the delta.
- **Change capacity.** Dedicated change and training resources per wave; adoption measured and managed as a KPI.
- **Benefits tracking.** A benefits register with owners, baselines and monthly actuals, reviewed by Finance.
- **Portfolio governance.** A single prioritised backlog across the bank, with a gate process that kills projects that miss criteria and reallocates funding.

## 3. Frameworks

### 3.1 Stage-gate process (attribution: Robert G. Cooper, Stage-Gate, 1980s–1990s; adapted to AI by practitioners)

Stages of work separated by gates at which a defined group makes a go, kill, hold or recycle decision against pre-set criteria. Application to AI: four stages as in 2.1; gate owners are the business owner, model risk and the AI portfolio lead; criteria as in 2.2; every gate has a kill option that is actually used.

### 3.2 Hypothesis-driven experimentation (Lean Startup, Eric Ries, 2011; adapted)

Frame each stage as a hypothesis with a measurable prediction, run the smallest experiment that can falsify it, and decide. In banking, "smallest" is constrained by control requirements, so the experiment design includes the controls.

### 3.3 Four-dimension success criteria grid (practitioner framework; attribution uncertain, widely used)

Technical, operational, business and risk criteria at each gate, as in 2.2. Apply by filling the grid with the second line in the room, then signing it before the stage begins.

### 3.4 Pilot-to-production readiness checklist (practitioner; composite)

Architecture and integration; data access and lineage; model risk validation evidence; controls and HITL; monitoring and incident process; run team and operating model; change and training; benefits tracking; regulatory notifications; exit and rollback plan. Apply at MVP gate; every item needs an owner and a status.

## 4. Worked BFSI example

### 4.1 Context

[ILLUSTRATIVE — composite] A regional bank's payments-screening operation generates 420,000 sanctions alerts a year across SWIFT, SEPA and domestic rails. Over 97% are false positives [ESTIMATE — within common practitioner ranges for payment screening; VERIFY for any client]. Level-1 analysts spend an average of 9 minutes per alert to disposition; 38 FTE at a fully loaded GBP 55,000. The bank wants an agentic triage system that gathers context (name-match details, counterparty, payment purpose, prior dispositions, list entry metadata), proposes a disposition with a rationale, and auto-closes clear false positives within a defined confidence band, escalating the rest with a pre-filled narrative.

### 4.2 Stage-gate plan with quantified gates

**Gate 0 (before PoC): decisions recorded**

- Business owner: Head of Payments Screening. Model risk tier: provisional Tier 2 (material decision support with human control) [ILLUSTRATIVE].
- Production path: integrate with the screening engine's case API; read access to payment data store; write access only to case notes in pilot; auto-close permission deferred to MVP.
- Data: 12 months of historical alerts with analyst dispositions (≈420,000) for back-testing; data protection approval requested in Week 1.
- Benefit hypothesis: 55% of alerts auto-closable at agreed precision; level-1 minutes per remaining alert fall from 9 to 6.
- Funding: PoC GBP 180,000 funded; pilot GBP 350,000 and MVP GBP 900,000 approved in principle subject to gates [ESTIMATE].

**Stage 1: PoC (6 weeks), back-test on historical alerts**

| Criterion | Threshold | Measured | Pass? |
|---|---|---|---|
| Agreement with analyst disposition on proposed auto-closes (precision for "false positive") | ≥ 99.5% on a 5,000-alert stratified sample, validated by compliance QA | 99.6% | Yes |
| Share of alerts the agent proposes to auto-close (coverage) | ≥ 45% | 52% | Yes |
| True-match recall (no true matches among proposed auto-closes) | 100% on the 310 historical true matches in the 12 months | 100% (all 310 escalated) | Yes |
| Rationale faithfulness (rationale cites only real record fields) | ≥ 98% | 97.1% | No (recycle) |
| Latency per alert | ≤ 20 seconds | 11 seconds | Yes |

Decision: recycle on faithfulness. Two weeks of prompt and retrieval changes lifted faithfulness to 98.6% on a fresh sample; gate passed. The stopping rule had been: fail true-match recall at any point and the project stops; it did not trigger.

**Stage 2: Pilot (12 weeks), shadow mode then assisted mode on one rail (SEPA, ~35% of volume)**

Weeks 1–6 shadow mode: agent dispositions recorded but not acted on; analysts work normally.

| Criterion | Threshold | Measured | Pass? |
|---|---|---|---|
| Precision on proposed auto-closes, live data | ≥ 99.5% | 99.4% | Marginal |
| Coverage, live data | ≥ 45% | 49% | Yes |
| True-match recall, live | 100% (14 true matches in period) | 100% | Yes |
| Drift: golden-set accuracy vs live accuracy gap | ≤ 1.0 percentage point | 0.8 | Yes |

Weeks 7–12 assisted mode: analysts see the proposal and rationale; no auto-close yet.

| Criterion | Threshold | Measured | Pass? |
|---|---|---|---|
| Analyst minutes per alert (assisted) | ≤ 6.5 | 5.9 | Yes |
| HITL override rate (analyst disagrees with proposed false-positive) | 0.3%–2.0% (too low suggests automation bias; too high suggests poor quality) | 0.9% | Yes |
| Override agreement: of overrides, share where QA sided with the analyst | ≥ 70% | 76% | Yes |
| User adoption (share of eligible alerts where analyst viewed rationale) | ≥ 85% | 91% | Yes |
| Pilot risk assessment: incidents | No severity-1 incidents | 0 | Yes |
| Fairness check: no disproportionate escalation by counterparty country beyond list-driven expectation | Reviewed by compliance | Passed | Yes |

Decision: proceed to MVP with a condition. Precision in shadow mode was 99.4% against a 99.5% threshold; the panel accepted because the shortfall was within sampling error on the sample size (confidence interval ±0.2 points [ESTIMATE]) and set a tighter confidence band for auto-close in the MVP (auto-close only above a higher model confidence, expected to reduce coverage to ~44% but lift precision above 99.7%).

**Stage 3: MVP (5 months), production on SEPA with auto-close enabled under controls**

| Criterion | Threshold | Measured at month 5 | Pass? |
|---|---|---|---|
| Precision on auto-closes (QA sample 2% of auto-closes, ≈ 1,500 a month) | ≥ 99.7% | 99.8% | Yes |
| Coverage (auto-closed share) | ≥ 40% | 44% | Yes |
| True-match recall | 100% | 100% (21 true matches, all escalated) | Yes |
| Level-1 minutes per escalated alert | ≤ 6.5 | 5.7 | Yes |
| Availability | ≥ 99.5% | 99.7% | Yes |
| Independent model validation | Complete, no high findings open | Complete; 2 medium findings closed | Yes |
| Measured benefit vs hypothesis | ≥ 70% of hypothesised FTE equivalent on SEPA volume | 93% | Yes |
| Run team in place | Product owner, 2 engineers, 1 model risk liaison | Staffed | Yes |

Decision: scale to SWIFT and domestic rails over the following nine months with a re-validation at each rail because name-match patterns and list behaviour differ.

### 4.3 Benefit arithmetic at MVP

SEPA volume ≈ 147,000 alerts a year. Auto-closed 44% = 64,700 alerts × 9 minutes = 9,700 hours saved. Remaining 82,300 alerts × (9 − 5.7) = 3.3 minutes = 4,530 hours saved. Total ≈ 14,230 hours ≈ 8.9 FTE equivalents on one rail. Hypothesis for SEPA had been 9.6 FTE (55% auto-close at 9 minutes plus 9-to-6 minutes on the rest); 93% achieved. Extrapolated to full volume at the same rates: ≈ 25 FTE equivalents ≈ GBP 1.4m a year before haircut and headcount bridge [ILLUSTRATIVE — composite]. Note what the business case books: only the signed bridge (Module 9).

### 4.4 Go/no-go decision log (extract)

| Gate | Date (relative) | Decision | Conditions | Decided by |
|---|---|---|---|---|
| G0 | Week 0 | Go to PoC | Data approval in parallel; stopping rule on true-match recall | Business owner, model risk, portfolio lead |
| G1 | Week 6 | Recycle | Faithfulness below 98% | Same |
| G1 | Week 8 | Go to pilot | None | Same |
| G2a | Week 14 | Go to assisted mode | Precision marginal; monitor | Same plus compliance |
| G2b | Week 20 | Go to MVP | Higher confidence band for auto-close; QA sample 2% | Same plus CRO delegate |
| G3 | Month 5 of MVP | Go to scale | Re-validate per rail; benefits tracked monthly by Finance | Steering committee |

The "so what" for the client: every decision in this log was made against a number set before the stage began, which is what allowed the CRO to approve auto-close and what allows Finance to trust the benefit.

## 5. Real-world case

**HSBC and Google Cloud AML AI, 2021–2023** [PUBLIC — Google Cloud announcement, Jun 2023; VERIFY]. HSBC worked with Google Cloud over several years to replace rules-based transaction monitoring with a machine-learning approach, publicly reported in 2023 as identifying two to four times more suspicious activity while cutting alert volumes by around 60%. The relevant lesson for staging is the length and shape of the journey: the system was developed and validated over a multi-year period with the bank's financial crime and model risk functions and regulators engaged, and it was deployed market by market rather than in one global release. It is a counter-example to the idea that pilots stall only because of technology; the time went into validation, control design and jurisdictional rollout.

**Klarna, 2024–2025** [PUBLIC — Klarna, Feb 2024; CEO statements, May 2025; VERIFY]. Klarna's move from announcement to full-scale customer-service deployment within months shows the opposite failure mode from purgatory: scaling before the quality criteria were stable. The 2025 adjustment to a hybrid human-plus-AI model is what a well-designed scale checkpoint with a customer-quality criterion would have produced earlier.

**Commonwealth Bank of Australia, 2025** [PUBLIC — Aug 2025; VERIFY]. The reversal of call-centre redundancies illustrates a missing pilot-exit criterion: measured contact-volume reduction on the pilot population before headcount actions are taken.

## 6. Consultant language

> "A PoC proves the technique; a pilot proves the benefit. We will not book a benefit we have not measured in the workflow."

Use when a sponsor wants to put PoC results in the business case.

> "The gate criteria are written before the stage begins, and every gate has a kill option we are prepared to use."

Use when setting up programme governance.

> "The precision threshold is a risk-appetite statement owned by Compliance; engineering's job is to meet it."

Use when engineers and compliance argue about thresholds.

> "We fund the pilot and MVP in principle at PoC approval, released against the gates, so a successful PoC does not have to re-enter the budget cycle."

Use with the CFO and portfolio office.

> "Our scaling metric is time to the second use case on the platform."

Use when making the case for platform investment.

## 7. Common mistakes juniors make

- Calling a PoC a pilot and extrapolating benefits from it.
- Starting a PoC without a production path, so productionising becomes an unfunded new project.
- Writing success criteria after seeing results, or using "promising" as a criterion.
- Treating accuracy thresholds as engineering choices rather than risk appetite statements owned by the second line.
- Measuring on samples too small to distinguish signal from noise, then declaring pass or fail.
- Ignoring the HITL override rate, or reading a very low override rate as success rather than possible automation bias.
- Engaging model risk at MVP instead of at PoC start.
- Scaling to new geographies or rails without re-validation.
- Letting each PoC build its own infrastructure instead of investing in a platform after the second one.
- Quoting the Gartner, MIT or RAND statistics without their caveats, or using them to argue against all pilots rather than for better gates.

## 8. Interview questions with model answers

**Q1. A bank has 40 GenAI PoCs and two in production. The COO asks you why and what to do. How do you answer?**

Model answer. I would say the pattern is common and diagnosable, then diagnose along five causes. First, production path: most PoCs were probably built in a sandbox with no integration design or integration budget, so "productionising" is a new project nobody funded. Second, ownership: PoCs run by innovation or IT without a business owner with P&L accountability rarely get pulled into the line. Third, controls: model risk and data protection engaged late, so each PoC hits a six-month approval wall. Fourth, criteria: success defined as "promising" rather than quantified gates with a kill option, so nothing is stopped and nothing is prioritised. Fifth, platform: 40 PoCs likely built 40 stacks, so each one carries full infrastructure cost. The remedy is a portfolio reset: score the 40 against value and feasibility, kill or merge most, select five to eight with named business owners, define four-dimension gate criteria with the second line, fund pilot and MVP in principle against gates, stand up a shared platform and pattern library, and measure time to second use case. I would cite Gartner's 2024 prediction that at least 30% of GenAI projects would be abandoned after PoC [PUBLIC; VERIFY] to normalise the kill decisions, and position the reset as the mark of a maturing portfolio rather than a failure.

**Q2. How would you set the exit criteria for a pilot of an agent that drafts customer complaint responses?**

Model answer. Four dimensions, set with the second line before the pilot. Technical: draft quality on a golden set of resolved complaints scored by a rubric agreed with the complaints team, with a threshold such as 85% of drafts rated "usable with minor edits", and a faithfulness criterion that drafts cite only facts in the case record. Operational: handler minutes per response falls from the baseline, say 25 to 12, adoption above 80% of eligible cases, and an edit-distance or override rate within a band that indicates genuine use without automation bias. Business: measured handle-time benefit on the pilot team, extrapolated with a haircut, and a customer-outcome check such as no deterioration in complaint-upheld rate or Financial Ombudsman referrals in the UK context [VERIFY]. Risk: a pilot risk assessment closed, a fairness check that tone and outcomes do not vary by customer characteristics, a check against Consumer Duty expectations [VERIFY], zero severity-1 incidents, and an incident process tested. I would specify the measurement method, sample sizes and who scores, and a stopping rule: any draft sent to a customer containing a fabricated fact ends the pilot pending review. Then I would make the MVP funding conditional on the gate.

**Q3. What does "pilot purgatory" mean and what are the three interventions you would make first?**

Model answer. Pilot purgatory is the state where pilots show promising results but never reach production, so spend accumulates without P&L impact. RAND, Gartner and MIT NANDA have each published figures suggesting most AI projects fail to deliver measurable value, with caveats on method [PUBLIC — 2024–25; VERIFY]. The first three interventions, in order: one, insist on a defined production path and business owner before any PoC starts, including the integration design, data access route and funding in principle for pilot and MVP; two, replace vague success criteria with quantified, four-dimension gate criteria agreed with model risk and the business, each with a kill option, so decisions are made against numbers; three, invest in a shared platform and pattern library after the second or third PoC so that the marginal use case is cheap and inherits pre-approved controls. Behind those sit change capacity and an operating model for the run phase. I would avoid the two wrong responses: stopping all pilots, which freezes learning, and declaring everything production-ready, which creates risk incidents.

## 9. Self-check quiz

1. State the question each of the four stages answers, and explain why a PoC cannot prove business value.
2. List the four dimensions of gate criteria and give one example criterion for a pilot in each.
3. In the worked example, the MVP auto-closes 44% of 147,000 SEPA alerts at 9 minutes each and reduces the remaining alerts from 9 to 5.7 minutes. Recompute the hours saved and the FTE equivalent at 1,600 productive hours.
4. Why is a very low HITL override rate not automatically good news?
5. Name six causes of pilot purgatory and the remedy for each.
