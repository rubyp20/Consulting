# Module 18 — Three end-to-end engagement simulations

## Purpose and how to use this module

This module walks three complete engagements from client ask to benefits, in the shape a partner would actually run them. Every client, number and finding here is [ILLUSTRATIVE — composite]: assembled from patterns typical of such programmes, with the arithmetic shown so you can defend or rebuild every figure. Public frameworks and regulations are attributed and labelled [PUBLIC]; the orders of magnitude for AI pricing are [ESTIMATE — order of magnitude, VERIFY].

Use the simulations in three ways. First, as a template: the H3 structure (client ask, diagnostic, hypotheses, workstreams, week-by-week plan, key analyses, deliverables, recommendation, benefits and risks) is the structure you should be able to reproduce for any AI engagement in an interview. Second, as a numbers drill: rebuild the business case tables with different assumptions until the arithmetic is automatic. Third, as a language model: the action titles in the storyline tables show how a strategy consultant states a finding.

### Common assumptions used across all three simulations

To keep the simulations numerically consistent, the following assumptions are shared and reused. All are [ESTIMATE — assumption, VERIFY against the client's actuals].

| Assumption | Value | Note |
|---|---|---|
| Loaded FTE cost, UK operations analyst | GBP 62,000 a year | Salary, employer costs, workplace, tooling |
| Loaded FTE cost, UK KYB specialist | GBP 70,000 a year | Senior analyst or approver |
| Loaded FTE cost, EU mid-sized bank operations | EUR 80,000 a year | Northern European composite |
| Loaded FTE cost, US card operations (blended onshore and nearshore) | USD 52,000 a year | 45% onshore, 55% nearshore |
| Loaded FTE cost, India offshore operations | USD 22,000 a year (about GBP 17,500) | Captive or vendor |
| Productive hours per FTE | 1,600 a year | After leave, training, shrinkage |
| Frontier model API price | USD 3 per million input tokens, USD 15 per million output tokens | Order of magnitude only |
| Mid-tier model API price | USD 0.80 input, USD 4 output per million tokens | Order of magnitude only |
| Small model API price | USD 0.15 input, USD 0.60 output per million tokens | Order of magnitude only |
| Prompt caching discount on cached input | 75% | Applies to repeated system prompts and policy context |
| Discount rate for NPV | 10% | Typical bank hurdle for operational investments |
| FX for cross-checks | 1 EUR = 1.10 USD; 1 GBP = 1.17 EUR | Illustrative |

## Simulation A: AI strategy and use-case assessment for a mid-sized bank

### Client ask

[ILLUSTRATIVE — composite] "Nordbank" is a universal bank with EUR 52bn of assets, 1.6 million retail customers, 45,000 SME and corporate clients, 6,400 FTE, operating income of EUR 2.1bn and a cost base of EUR 1.3bn (cost-income ratio 62%). The core banking platform is a 1990s mainframe with COBOL batch processing; a cloud migration is about 30% complete; seven machine-learning models are in production (retail credit scoring, card fraud, two churn models, three marketing propensity models). Two GenAI pilots ran in 2025 (a contact-centre knowledge assistant and a coding copilot trial) and neither reached production.

The CEO's ask to the partner: "The board wants an AI strategy by the next strategy cycle. Tell us where the value is, what it would take, and what we should do first. We do not want a 200-page report; we want a decision."

Engagement shape: 12 weeks, team of one partner (about 20% time), one engagement manager, four consultants, two AI engineers, one data scientist for the two mid-engagement deep dives. Illustrative fee range EUR 1.4m to 1.9m [ESTIMATE].

### Diagnostic

The first three weeks established the fact base. Findings below carry the numbers the team actually used.

**Maturity assessment.** Scored on a 1 to 5 scale across six dimensions adapted from the McKinsey "Rewired" capability set [PUBLIC — Lamarre, Smaje, Zemmel, 2023], with a peer benchmark from the team's own experience [ESTIMATE].

| Dimension | Nordbank score | Peer median (mid-sized European banks) | Gap |
|---|---|---|---|
| Business-led AI roadmap and ambition | 1.5 | 2.5 | 1.0 |
| Talent (AI product, engineering, risk) | 2.0 | 2.5 | 0.5 |
| Operating model and governance | 1.5 | 2.5 | 1.0 |
| Technology (platform, APIs, cloud) | 1.5 | 3.0 | 1.5 |
| Data (quality, access, lineage) | 2.0 | 3.0 | 1.0 |
| Adoption and scaling (change, value tracking) | 2.0 | 2.5 | 0.5 |
| Average | 1.75 | 2.67 | 0.92 |

**Cost base decomposition.** Of the EUR 1.3bn cost base, EUR 610m is personnel in operations, servicing, risk and compliance functions where work is document- and language-heavy; EUR 290m is technology; the balance is premises, marketing and other. The team sized the "AI-addressable" pool as the personnel cost in high-volume, rule- and judgement-mixed processes: EUR 385m (about 4,800 FTE at EUR 80,000) [ESTIMATE — from HR headcount by cost centre].

**Benchmark of value potential.** The McKinsey Global Institute estimate for generative AI in banking is USD 200bn to 340bn a year globally, equivalent to roughly 2.8% to 4.7% of industry revenue [PUBLIC — McKinsey Global Institute, June 2023]. Applied to Nordbank's EUR 2.1bn operating income, that implies EUR 60m to 100m a year of potential at full maturity [ESTIMATE — top-down cross-check only]. The bottom-up use-case assessment below landed at EUR 75m gross run-rate, inside that range, which is the cross-check a CFO expects to see.

**Pilot post-mortem.** Both 2025 pilots stalled for the same reasons: no named business owner, no production path (the knowledge assistant ran on an unsupported sandbox), and no integration budget. Classic pilot purgatory, consistent with Gartner's forecast that at least 30% of GenAI projects would be abandoned after proof of concept by end 2025 [PUBLIC — Gartner, July 2024, VERIFY].

### Hypotheses

Falsifiable hypotheses set in week 1 and tested through the diagnostic.

1. **H1.** At least 60% of the three-year value lies in six to eight high-volume operations processes (KYC, AML, servicing, payments investigations, credit operations, engineering), not in customer-facing GenAI. Tested through the scored portfolio. Result: confirmed; 68% of risk-adjusted value in those domains.
2. **H2.** The binding constraint is technology and data access, not model capability; a shared AI platform with retrieval, evaluation and gateway services is a prerequisite for any use case to scale. Tested through architecture review and the pilot post-mortem. Result: confirmed.
3. **H3.** The bank can fund the programme from first-wave savings within 24 months if wave 1 is restricted to use cases with hard baselines. Tested through the business case. Result: confirmed with a 10-month gap bridged by central investment.
4. **H4.** A hub-and-spoke operating model is appropriate at Nordbank's scale; a fully federated model would fragment scarce talent. Tested through interviews and talent inventory (14 people with relevant skills across the bank). Result: confirmed.
5. **H5.** Regulatory exposure under the EU AI Act is manageable because the first two waves avoid Annex III high-risk use (creditworthiness assessment of natural persons) except where existing model-risk governance already applies. Tested through a legal and compliance review. Result: confirmed, with the next-best-offer and SME underwriting use cases flagged for deployer obligations [PUBLIC — Regulation (EU) 2024/1689, VERIFY timeline].

### Workstreams

| Workstream | Lead | Scope | Key outputs |
|---|---|---|---|
| 1. Ambition and maturity | Partner and EM | Executive interviews (18), maturity scoring, ambition options | Ambition statement, maturity baseline |
| 2. Use-case discovery and assessment | Two consultants | Value-chain walk, long list (64), scoring (18), prioritisation (12), waves | Scored matrix, roadmap |
| 3. Platform and data | Two AI engineers | Architecture review, platform target state, data readiness | Target platform blueprint, data remediation plan |
| 4. Business case and funding | One consultant and data scientist | Baselines, benefit build, TCO, funding model | Five-year business case, funding ask |
| 5. Operating model, governance and risk | One consultant | Operating-model options, roles, AI Act and model-risk mapping | Operating model design, governance charter |

### Week-by-week plan

| Week | Focus | Key activities | Steering committee |
|---|---|---|---|
| 1 | Mobilise | Hypotheses, interview schedule, data requests, workshop design | Kick-off |
| 2 | Diagnose | 18 executive interviews, cost-base decomposition, architecture review | |
| 3 | Diagnose | Maturity scoring, pilot post-mortems, data readiness assessment | SteerCo 1: diagnostic read-out |
| 4 | Discover | Three ideation workshops (operations, risk and compliance, retail and digital); long list of 64 | |
| 5 | Discover | Screening 64 to 38 to 18; scoring criteria agreed with CFO office | |
| 6 | Assess | Scoring of 18 use cases; value baselining with Finance | SteerCo 2: long list and scoring approach |
| 7 | Assess | Deep dive 1: AML alert triage (data sample, feasibility); platform target state | |
| 8 | Assess | Deep dive 2: contact-centre agent assist; TCO modelling | |
| 9 | Synthesise | Prioritised portfolio of 12, three waves, business case v1 | SteerCo 3: portfolio and case |
| 10 | Design | Operating model and governance; funding model; AI Act mapping | |
| 11 | Decide | Business case v2 after CFO challenge; roadmap; executive storyline | |
| 12 | Commit | Board paper, final presentation, mobilisation plan for wave 1 | Board presentation |

### Key analyses

**Analysis 1: the scored portfolio.** Value and feasibility were each composite scores on a 1 to 5 scale. Value weights: cost 40%, revenue 20%, risk and loss 20%, customer experience 20%. Feasibility weights: data readiness 25%, integration complexity 25%, model and pattern maturity 20%, regulatory exposure 15%, change effort 15%. Weights were agreed with the CFO office in week 5; this matters because agreeing the weights before scoring removes the later argument about the ranking.

| Use case | Value (1–5) | Feasibility (1–5) | Gross run-rate value, EUR m [ESTIMATE] | Wave |
|---|---|---|---|---|
| Engineering copilots and COBOL modernisation assist | 4.1 | 4.2 | 10 | 1 |
| Contact-centre agent assist (retail) | 4.0 | 4.0 | 9 | 1 |
| AML alert triage and narrative drafting | 4.2 | 3.2 | 7 | 1 |
| Internal knowledge assistant (policies, procedures) | 3.0 | 4.6 | 5 | 1 |
| Payments investigations (ISO 20022 exceptions, enquiries) | 3.2 | 4.0 | 4 | 1 |
| KYC periodic review automation (retail and SME) | 4.0 | 3.0 | 8 | 2 |
| SME credit memo drafting and underwriting assist | 4.3 | 3.0 | 11 | 2 |
| Mortgage document processing | 3.1 | 3.2 | 4 | 2 |
| Dispute and chargeback handling | 3.0 | 3.8 | 3 | 2 |
| Collections next-best-action and conversational agent | 3.2 | 2.9 | 4 | 3 |
| Next-best-offer personalisation | 3.9 | 2.2 | 8 | 3 |
| Regulatory reporting and compliance QA | 2.2 | 2.1 | 2 | 3 |
| Total | | | 75 | |

How a value score was built, for one row [ILLUSTRATIVE]. AML alert triage: 180,000 alerts a year, 48 minutes average handling, so 144,000 analyst hours, or 90 FTE at 1,600 hours, costing EUR 7.2m. A 55% reduction in handling effort (narrative drafting, data gathering, false-positive pre-disposition) releases EUR 4.0m. Risk value: better-evidenced suspicious activity reports and fewer missed cases, valued at EUR 2.0m of avoided remediation cost [ESTIMATE]. CX value: nil. Revenue: nil. Total EUR 7m gross, which scored 4 on cost (top quartile of the portfolio), 1 on revenue, 4 on risk, 1 on CX; weighted 0.4×4 + 0.2×1 + 0.2×4 + 0.2×1 = 2.8 before normalisation across the portfolio, which rescaled to 4.2.

**Analysis 2: the 2x2 and wave logic.** Use cases with feasibility 3.8 or above and value 3.0 or above went to wave 1 (quick wins with hard baselines). Wave 2 held high-value use cases needing data remediation or integration (KYC, SME underwriting). Wave 3 held use cases with regulatory exposure or weak data (next-best-offer, collections). The rule the team applied: wave 1 must contain at least one use case per major operations domain so that the platform is proven on real variety, and no wave 1 use case may be customer-facing GenAI.

**Analysis 3: platform TCO.** The shared platform (model gateway, retrieval service, evaluation harness, observability, guardrails, agent runtime) was costed at EUR 14m over three years: EUR 6m build, EUR 2.7m a year run [ESTIMATE]. Use-case build costs averaged EUR 2.5m for wave 1 and EUR 3.5m for wave 2, dominated by integration and change, not model costs. Token costs across the full portfolio at scale were estimated at EUR 1.1m a year [ESTIMATE — order of magnitude], below 2% of total programme cost, which is a finding worth stating to a board because it reframes the cost conversation away from model pricing and towards integration and change.

**Analysis 4: five-year business case, risk-adjusted.** Gross run-rate of EUR 75m was haircut by evidence level: wave 1 at 75% (hard baselines, proven patterns), wave 2 at 60%, wave 3 at 40%, giving a risk-adjusted run-rate of EUR 48m by year 3 [ESTIMATE].

| Year | Investment, EUR m | Run cost, EUR m | Risk-adjusted benefit, EUR m | Net cash flow, EUR m | Cumulative, EUR m |
|---|---|---|---|---|---|
| 1 | 18 | 3 | 6 | -15 | -15 |
| 2 | 22 | 7 | 24 | -5 | -20 |
| 3 | 12 | 9 | 42 | 21 | 1 |
| 4 | 4 | 10 | 48 | 34 | 35 |
| 5 | 4 | 10 | 48 | 34 | 69 |

NPV at 10%: -15/1.10 + -5/1.21 + 21/1.331 + 34/1.4641 + 34/1.6105 = -13.6 - 4.1 + 15.8 + 23.2 + 21.1 = EUR 42.3m. Payback during year 3, roughly month 35 from programme start. Investment of EUR 60m over five years against a run-rate benefit of EUR 48m is a payback profile a bank board will accept; the sensitivity that matters most is wave 2 slipping by a year, which moves payback to month 43 and cuts NPV to about EUR 25m.

**Analysis 5: operating model.** Hub-and-spoke: a central AI hub of 28 FTE by end of year 2 (platform engineering 12, AI product and delivery 8, AI risk and evaluation 5, change and adoption 3) with embedded product owners in each of the five domains. Funding: central budget for platform and wave 1, business-funded from wave 2 with a gain-share rule that 50% of validated savings are reinvested in the business unit's next use case. Governance: an AI steering committee chaired by the COO, a model-risk gate run by the existing model validation function extended with LLM evaluation competence, and an AI Act register maintained by Compliance.

### Deliverables and slide-by-slide storyline

The final board document was 24 slides plus an appendix. Each title is an action title stating the finding.

| Slide | Action title | Key content | Source analysis |
|---|---|---|---|
| 1 | Nordbank can release EUR 48m a year by year 3 from 12 AI use cases, funded by wave-1 savings after month 35 | Executive summary, three decisions requested | All |
| 2 | The board asked three questions: where is the value, what does it take, what first | Restating the ask | Ask |
| 3 | Nordbank's AI maturity is 1.75 of 5 against a peer median of 2.7, with technology the largest gap | Maturity table | Analysis: maturity |
| 4 | Two pilots stalled for the same three reasons, all fixable | Pilot post-mortem | Diagnostic |
| 5 | EUR 385m of the cost base sits in language-heavy processes that AI can address | Cost decomposition | Diagnostic |
| 6 | Top-down, GenAI potential for a bank of this size is EUR 60m to 100m a year | MGI cross-check [PUBLIC] | Benchmark |
| 7 | We screened 64 ideas to 12 use cases using criteria agreed with Finance | Funnel, criteria, weights | Analysis 1 |
| 8 | Twelve use cases carry EUR 75m of gross run-rate value, two-thirds in operations and risk | Scored matrix | Analysis 1 |
| 9 | Five use cases are ready now; they have hard baselines and proven patterns | 2x2 with wave 1 highlighted | Analysis 2 |
| 10 | AML alert triage: EUR 7m from 90 analysts' effort, with a regulator-visible metric | Deep dive 1 | Deep dive |
| 11 | Contact-centre agent assist: EUR 9m from handling time and first-contact resolution, not from headcount alone | Deep dive 2 | Deep dive |
| 12 | Wave 2 unlocks EUR 26m but needs KYC data remediation and core integration first | Wave 2 dependencies | Analysis 2 |
| 13 | A shared AI platform is a prerequisite: EUR 14m over three years, reused by every use case | Platform blueprint and TCO | Analysis 3 |
| 14 | Model costs are below 2% of programme cost; integration and change are 70% | Cost structure | Analysis 3 |
| 15 | Risk-adjusted, the programme delivers EUR 48m a year by year 3 and NPV of EUR 42m | Business case table | Analysis 4 |
| 16 | The case is most sensitive to wave 2 timing, not to model pricing | Tornado | Analysis 4 |
| 17 | A hub-and-spoke model with 28 central FTE fits Nordbank's talent base | Operating model | Analysis 5 |
| 18 | Business units fund from wave 2 under a 50% reinvestment rule | Funding model | Analysis 5 |
| 19 | Governance extends existing model-risk and compliance functions rather than creating new ones | Governance charter | Analysis 5 |
| 20 | Two use cases attract EU AI Act deployer obligations; neither is in wave 1 | AI Act register [PUBLIC, VERIFY] | Workstream 5 |
| 21 | The 36-month roadmap sequences platform, wave 1, wave 2, wave 3 | Roadmap | Synthesis |
| 22 | Wave 1 mobilises in 90 days with five named business owners | Mobilisation plan | Synthesis |
| 23 | Three decisions for the board today | Decision slide | Synthesis |
| 24 | Appendix index | Baselines, scoring detail, interview list | |

### Recommendation

Commit to a EUR 60m five-year programme in three waves, starting with a shared AI platform and five operations use cases with hard baselines; stand up a 28-FTE hub-and-spoke AI function under the COO; fund wave 1 centrally and waves 2 and 3 from business-unit budgets under a reinvestment rule; and treat the two pilots as closed, re-starting the knowledge assistant as a wave 1 use case with a named owner and a production path.

### Benefits and risks

Benefits: EUR 48m risk-adjusted run-rate by year 3, NPV EUR 42m, payback month 35; a reusable platform that halves the build cost of each subsequent use case; a governance structure that satisfies the EU AI Act deployer obligations in advance of the high-risk deadlines [PUBLIC, VERIFY].

Risks and mitigations: wave 2 slippage from KYC data remediation (mitigate by starting remediation in month 1); talent attrition in the hub (mitigate with a retention plan and partner model); value leakage if capacity released is not converted (mitigate with a quarterly benefits review co-signed by Finance); regulatory change (mitigate with an AI Act register and a horizon-scanning role in Compliance).

## Simulation B: Agentic AI transformation of corporate onboarding (KYB) at a UK Tier-1 bank

### Client ask

[ILLUSTRATIVE — composite] "Albion Bank" is a UK Tier-1 bank. Its Corporate and Commercial Banking division onboards 36,000 new business clients a year (24,000 SME, 9,000 mid-corporate, 3,000 large or complex structures) and performs 110,000 periodic KYB reviews (80,000 SME, 22,000 mid-corporate, 8,000 complex). KYB operations employ 920 FTE: 540 in the UK and 380 in an Indian captive centre. Median cycle times are 9 days (SME), 27 days (mid-corporate) and 54 days (complex). Mid-corporate abandonment during onboarding is 18%.

The Head of Corporate Banking's ask: "Our competitors are onboarding mid-corporates in under two weeks. I want a credible plan to halve cycle time and take a third out of the cost of KYB using agentic AI, and I want to know how our model-risk and financial-crime people will sign it off. Design it and get a pilot live in 16 weeks."

Engagement shape: 16 weeks design-to-pilot; partner (15%), engagement manager, three consultants (one with financial-crime depth), three AI engineers, one model-risk specialist. Illustrative fee GBP 1.6m to 2.2m plus pilot build [ESTIMATE].

### Diagnostic

**Cost baseline.** Personnel: 540 UK FTE at GBP 62,000 = GBP 33.5m; 380 India FTE at GBP 17,500 = GBP 6.6m; total GBP 40.1m, average GBP 43,600 per FTE. Technology, registry data and screening vendors: GBP 6.2m. Total KYB cost GBP 46.3m a year [ESTIMATE — from cost-centre data].

**Effort baseline.** Analyst hours per case from a time-and-motion sample of 240 cases [ILLUSTRATIVE]:

| Case type | Volume a year | Hours per case | Total hours |
|---|---|---|---|
| SME new onboarding | 24,000 | 6.0 | 144,000 |
| Mid-corporate new onboarding | 9,000 | 22.0 | 198,000 |
| Complex new onboarding | 3,000 | 55.0 | 165,000 |
| SME periodic review | 80,000 | 2.5 | 200,000 |
| Mid-corporate periodic review | 22,000 | 9.0 | 198,000 |
| Complex periodic review | 8,000 | 24.0 | 192,000 |
| Direct case hours | 146,000 cases | | 1,097,000 |

Capacity is 920 × 1,600 = 1,472,000 hours, so 375,000 hours (25%) are indirect: quality control, rework, document chasing, management and training. That indirect pool is a target in its own right.

**Where the time goes.** Share of direct hours by L3 task, from the sample: document collection and chasing 12%, document classification and extraction 14%, UBO identification and ownership unwrapping 15%, screening alert disposition 12%, EDD narrative drafting 12%, four-eyes QC 10%, intake 6%, registry verification 5%, approval 4%, account setup and communications 4%, risk rating 3%, screening execution 3%.

**Revenue at risk.** Mid-corporate first-year revenue averages GBP 38,000; complex clients GBP 190,000 [ESTIMATE]. Abandonment of 18% on 9,000 mid-corporate cases is 1,620 lost clients, GBP 61.6m of first-year revenue; 11% on 3,000 complex cases is 330 clients, GBP 62.7m. Interviews with relationship managers attributed roughly half of abandonment to cycle time. The team assumed 20% of revenue at risk is recoverable by halving cycle time, GBP 24.9m, at a 40% contribution margin, giving GBP 10m a year of contribution [ESTIMATE — deliberately conservative, agreed with Finance].

**Technology.** Workflow tool with APIs, document store, a screening vendor with an API, Companies House and commercial registry feeds via API, a rules-based customer risk rating (CRR) engine already in the model inventory, and no vector store or model gateway. Data for evaluation is abundant: four years of closed cases with analyst decisions and QC outcomes.

### Hypotheses

1. **H1.** More than half of direct effort sits in tasks with high input variability and bounded judgement (extraction, UBO unwrapping, alert disposition, narrative drafting), which is the profile where agents outperform rules. Result: confirmed; 53% of direct hours in those four tasks.
2. **H2.** Blended effort can fall by about 45% at steady state without moving any regulatory decision away from a human. Result: confirmed at 47% before human-in-the-loop overhead, 45% after.
3. **H3.** The multi-agent system can be classified under the bank's SS1/23 framework as a Tier 2 model system with component-level validation, which allows a pilot within 16 weeks. Result: confirmed with the model-risk function, subject to the validation plan [PUBLIC — PRA SS1/23, 2023; VERIFY].
4. **H4.** SME onboarding and SME periodic review are the right pilot scope because volume is high, structures are simple, and errors are detectable before approval. Result: confirmed.
5. **H5.** Token costs are immaterial relative to people and integration costs, so model choice should be driven by accuracy and controllability rather than price. Result: confirmed; about GBP 0.36 per case.

### Workstreams

| Workstream | Scope | Outputs |
|---|---|---|
| 1. Process and task decomposition | L1 to L4 decomposition, time and motion, pain points | Task inventory with effort shares |
| 2. Agentic-fit assessment and target design | Six-dimension scoring, automation bands, supervisor-led architecture, HITL design | Scored task matrix, target architecture |
| 3. Model risk, financial crime and legal | SS1/23 classification, validation plan, MLRO sign-off, DPIA | Model-risk pack, control framework |
| 4. Pilot build and evaluation | Golden dataset, eval harness, agents, integration, shadow run | Pilot system, gate results |
| 5. Business case and change | Baseline, benefits, TCO, workforce plan, role redesign | Business case, change plan |

### Week-by-week plan

| Week | Focus | Key activities | Gate |
|---|---|---|---|
| 1 | Mobilise | Hypotheses, data access, team onboarding, model-risk engagement | |
| 2 | Diagnose | Time-and-motion sample (240 cases), interviews with 22 analysts and approvers | |
| 3 | Diagnose | Task decomposition to L4, effort shares, pain-point heatmap | SteerCo 1 |
| 4 | Assess | Six-dimension agentic-fit scoring workshop with operations and financial crime | |
| 5 | Design | Target architecture v1: supervisor and worker agents, tools, HITL gates | |
| 6 | Design | Control framework, SS1/23 classification proposal, DPIA scoping | SteerCo 2: design approval |
| 7 | Build | Golden dataset (1,200 closed SME cases), eval harness, platform set-up | |
| 8 | Build | Intake, extraction and registry agents; integration with workflow tool | |
| 9 | Build | UBO, screening-disposition and narrative agents; supervisor orchestration | |
| 10 | Build | QC agent, HITL console, audit logging, guardrails | Internal gate: eval thresholds on golden set |
| 11 | Validate | Independent model validation of components; MLRO review; security testing | |
| 12 | Shadow | Shadow run on 2,000 live SME cases, no production effect | SteerCo 3: shadow results |
| 13 | Shadow | Error analysis, prompt and retrieval tuning, threshold calibration | |
| 14 | Live assist | 1,000 live SME cases with analyst acceptance of agent outputs | |
| 15 | Live assist | Gate measurement, override analysis, analyst feedback | |
| 16 | Decide | Pilot gate review, scale business case, board paper | Board gate: scale decision |

### Key analyses

**Analysis 1: task-level agentic-fit scoring.** Six dimensions, each scored 1 to 5 where 5 means "strong fit for agentic automation", with weights agreed in week 4. This is a practitioner framework; variants differ by firm, and attribution to a single source would be wrong.

| Dimension | Weight | 5 means | 1 means |
|---|---|---|---|
| D1 Input variability | 20% | Varied, unstructured inputs where rules fail | Fully structured, rules suffice |
| D2 Bounded judgement | 20% | Judgement needed but codifiable in policy with examples | Either none, or open-ended expert judgement |
| D3 Tool and system access | 15% | All systems reachable by API | Manual, swivel-chair |
| D4 Error tolerance and reversibility | 20% | Errors cheap, visible and reversible | Irreversible or regulatory consequence |
| D5 Data for evaluation | 15% | Abundant labelled history | None |
| D6 Volume and frequency | 10% | High volume, daily | Rare |

Bands: 3.5 and above, agentic automation with sampling; 2.5 to 3.5, agent-assist with mandatory human decision; below 2.5, human or deterministic rules.

| L3 task | D1 D2 D3 D4 D5 D6 | Weighted score | Band and design decision |
|---|---|---|---|
| Intake and data capture | 3 2 4 5 4 5 | 3.70 | Automate; agent with deterministic validation |
| Document collection and chasing | 3 2 3 5 3 5 | 3.40 | Assist; communications agent drafts, analyst releases |
| Document classification and extraction | 5 3 4 4 5 5 | 4.25 | Automate; confidence-gated, low confidence to human |
| Registry verification | 2 2 5 4 5 5 | 3.60 | Automate; API-first, agent reconciles discrepancies |
| UBO identification and unwrapping | 5 4 3 2 3 4 | 3.50 | Assist; agent proposes structure, human confirms all layered structures |
| Screening execution | 2 1 5 3 5 5 | 3.20 | Keep deterministic vendor tool; not agentic |
| Screening alert disposition | 4 4 4 2 5 5 | 3.85 | Automate false-positive discounting with 100% QC in pilot; true-match confirmation human |
| Customer risk rating | 1 2 5 2 5 5 | 3.00 | Keep rules engine; agent assembles inputs only |
| EDD narrative drafting | 5 4 3 4 4 3 | 3.95 | Automate drafting; approver edits and signs |
| Four-eyes QC | 4 4 4 3 4 5 | 3.90 | Agent QC first pass; human QC on risk-based sample |
| Approval decision | 3 2 4 1 4 4 | 2.80 | Human; agent prepares decision pack |
| Account setup and communications | 2 1 4 4 4 5 | 3.10 | Deterministic automation; agent drafts communications |

Worked arithmetic for one row: UBO identification = 0.20×5 + 0.20×4 + 0.15×3 + 0.20×2 + 0.15×3 + 0.10×4 = 1.00 + 0.80 + 0.45 + 0.40 + 0.45 + 0.40 = 3.50. It sits exactly on the band boundary; the design decision went to assist because D4 (reversibility) is low and the regulatory consequence of a missed beneficial owner is severe. This is the point to make in an interview: the score informs, the risk dimension decides.

**Analysis 2: effort reduction build.** Reduction assumptions per task were set from the design decision, the pilot evidence base from comparable programmes [ESTIMATE], and analyst challenge.

| Task | Share of direct hours | Assumed reduction | Contribution to direct reduction |
|---|---|---|---|
| Intake | 6% | 60% | 3.6 points |
| Document collection | 12% | 40% | 4.8 points |
| Extraction | 14% | 80% | 11.2 points |
| Registry verification | 5% | 70% | 3.5 points |
| UBO unwrapping | 15% | 35% | 5.3 points |
| Screening execution | 3% | 10% | 0.3 points |
| Alert disposition | 12% | 55% | 6.6 points |
| Risk rating | 3% | 20% | 0.6 points |
| EDD narrative | 12% | 65% | 7.8 points |
| QC | 10% | 50% | 5.0 points |
| Approval | 4% | 15% | 0.6 points |
| Setup and communications | 4% | 60% | 2.4 points |
| Total | 100% | | 51.7 points |

Direct hours fall 51.7%: 1,097,000 × 0.517 = 567,000 hours. Indirect hours fall 35% (less rework and chasing): 375,000 × 0.35 = 131,000 hours. Total 698,000 of 1,472,000 hours, or 47.4%. Human-in-the-loop overhead (QC sampling of agent output, exception handling, agent supervision roles) adds back about 2.5 points, leaving 45% at steady state. Capacity released: 920 × 0.45 = 414 FTE-equivalent; at the GBP 43,600 blended cost that is GBP 18.0m a year [ESTIMATE]. The team was explicit that this is capacity, and that the workforce plan converts it to cost through attrition (UK KYB attrition 11% a year, about 60 FTE), captive flex-down in India, and redeployment of 90 FTE to the periodic-review backlog, which was 14,000 cases overdue.

**Analysis 3: target architecture.** A supervisor-led (hierarchical) multi-agent system.

| Component | Role | Tools | Human gate |
|---|---|---|---|
| Case supervisor agent | Plans the case, sequences workers, tracks state, escalates | Workflow API, case store, policy retrieval | Escalation rules |
| Intake and document agent | Validates application, classifies and extracts from documents | Document store, OCR and extraction, schema validator | Low-confidence fields |
| Registry and UBO agent | Pulls registry data, builds ownership graph, identifies UBOs | Companies House and commercial registry APIs, graph builder | All structures with three or more layers, any trust or nominee |
| Screening disposition agent | Reviews vendor alerts, discounts false positives with evidence | Screening vendor API, adverse media retrieval | All potential true matches; 100% QC during pilot |
| Risk-rating adapter | Assembles inputs and calls the existing CRR rules engine | CRR engine API | None (deterministic) |
| Narrative agent | Drafts EDD and case rationale with citations to evidence | Policy retrieval, case evidence store | Approver edits and signs |
| QC agent | Checks completeness, consistency, policy adherence | Policy checklist, case store | Human QC on risk-based sample |
| HITL console | Presents agent proposals, evidence and confidence to analysts and approvers | | All approvals |

Guardrails: input validation and prompt-injection screening on uploaded documents; output schema enforcement; citation requirement on every narrative claim; action allow-lists (no agent can approve, close an alert as a true match, or change a risk rating); full audit log of prompts, retrieved evidence, outputs and human actions; fallback to manual workflow on any component failure.

**Analysis 4: model risk classification under SS1/23.** The PRA's SS1/23 sets five principles: model identification and risk classification; governance; development, implementation and use; independent validation; and model risk mitigants [PUBLIC — PRA SS1/23, May 2023, effective May 2024; VERIFY scope and any later amendments]. The team's proposal, agreed with the model-risk function:

- Identification: each LLM-based component (extraction, UBO reasoning, alert disposition, narrative, QC) is recorded in the model inventory as a component of one "KYB agentic model system"; the CRR engine keeps its existing inventory entry and tier.
- Classification: Tier 2 (material process, but every regulatory decision retains a human approver and errors are detectable before decision). Alert disposition is flagged for review towards Tier 1 if auto-closure of false positives is expanded beyond the pilot sampling regime.
- Development and use: documented intended use, known limitations, prohibited uses (no approvals, no true-match closure), and vendor model change notification requirements.
- Independent validation: pre-deployment validation against the golden dataset; conceptual soundness review of prompts and retrieval; outcome testing on the shadow run; annual revalidation and trigger-based revalidation on any model version change.
- Mitigants: HITL gates, QC sampling rates by risk, override monitoring, manual fallback, and a kill switch owned by the MLRO.

Also recorded: a Data Protection Impact Assessment for beneficial-owner personal data under UK GDPR; MLRO sign-off on the screening disposition design; and a note that the EU AI Act does not apply to the UK pilot but would for the bank's Irish subsidiary [PUBLIC, VERIFY].

**Analysis 5: token cost.** Blended tokens per case about 220,000 input and 14,000 output (documents, registry extracts, policy context). Routing: mid-tier model for extraction and classification (about 70% of tokens), frontier model for UBO reasoning and narrative (about 30%). Mid-tier: 154,000 × USD 0.80 per million = USD 0.123 plus 9,800 × USD 4 per million = USD 0.039, total USD 0.162. Frontier: 66,000 × USD 3 per million = USD 0.198 plus 4,200 × USD 15 per million = USD 0.063, total USD 0.261. Sum USD 0.42; caching on policy context saves about 20% and retries plus evaluation runs add about 30%, so USD 0.45 a case, about GBP 0.36. Across 146,000 cases: GBP 53,000 a year [ESTIMATE — order of magnitude, VERIFY pricing]. Against GBP 46m of KYB cost, model pricing is irrelevant to the decision; accuracy and controllability are not.

**Analysis 6: pilot gates.** Pilot scope: SME new onboarding and SME periodic review; 2,000 shadow cases (weeks 12 to 13) then 1,000 live-assist cases (weeks 14 to 15).

| Gate metric | Baseline | Threshold to pass | Result in simulation [ILLUSTRATIVE] |
|---|---|---|---|
| Field-level extraction accuracy vs gold set | 96% (human) | 97% or above | 98.1% |
| UBO resolution agreement with senior analyst | n/a | 92% or above; 100% of layered structures to human | 93.5% |
| Missed true matches on agent-discounted alerts (100% QC) | 0 | 0 | 0 |
| False-positive discount precision | n/a | 98% or above | 98.7% |
| EDD narrative accepted without material edit | n/a | 80% or above | 83% |
| Analyst hours per SME case | 6.0 | 3.6 or below | 3.4 |
| Human override rate on agent proposals | n/a | Below 15%, trending down | 11% |
| SME cycle time, median days | 9 | 4 or below | 4 |
| Reportable incidents and audit-trail gaps | 0 | 0 | 0 |

**Analysis 7: business case.** Build GBP 14m across 16 months (design and pilot GBP 3.2m; scale build GBP 10.8m dominated by integration, change and validation). Run GBP 4.5m a year: platform and infrastructure 1.2, licences and data 0.8, AI team of ten at GBP 110,000 = 1.1, evaluation, monitoring and guardrails 0.5, model validation 0.4, HITL quality uplift 0.5, tokens 0.1 with headroom. Benefit ramp: cost benefit 15%, 55%, 100% in years 1 to 3; revenue benefit 10%, 50%, 100%.

| Year | Build, GBP m | Run, GBP m | Cost benefit, GBP m | Revenue contribution, GBP m | Net, GBP m | Cumulative, GBP m |
|---|---|---|---|---|---|---|
| 1 | 9.0 | 1.5 | 2.7 | 1.0 | -6.8 | -6.8 |
| 2 | 5.0 | 4.5 | 9.9 | 5.0 | 5.4 | -1.4 |
| 3 | 0 | 5.0 | 18.0 | 10.0 | 23.0 | 21.6 |
| 4 | 0 | 4.5 | 18.0 | 10.0 | 23.5 | 45.1 |
| 5 | 0 | 4.5 | 18.0 | 10.0 | 23.5 | 68.6 |

NPV at 10%: -6.8/1.10 + 5.4/1.21 + 23.0/1.331 + 23.5/1.4641 + 23.5/1.6105 = -6.2 + 4.5 + 17.3 + 16.1 + 14.6 = GBP 46.3m. Payback in month 25. Cost-only view, which is what the CFO will ask for: year 1 net -7.8, year 2 +0.4, year 3 +13.0, years 4 and 5 +13.5; NPV GBP 20.6m; payback month 31. The recommendation was made on the cost-only view with revenue as upside.

### Deliverables and slide-by-slide storyline

| Slide | Action title | Key content | Source analysis |
|---|---|---|---|
| 1 | Agentic KYB can halve SME and mid-corporate cycle time and release 45% of KYB effort, with every regulatory decision still made by a human | Executive summary | All |
| 2 | KYB costs GBP 46m a year and loses an estimated GBP 124m of first-year revenue to abandonment | Baseline | Diagnostic |
| 3 | Four tasks consume 53% of analyst time and share the same profile: varied inputs, bounded judgement | Effort shares | Analysis 1 |
| 4 | We scored twelve tasks on six dimensions; eight are fit for agentic automation or assist | Scored matrix | Analysis 1 |
| 5 | Three tasks stay deterministic or human, by design, because reversibility is low | Band decisions | Analysis 1 |
| 6 | A supervisor-led multi-agent system orchestrates seven workers and four human gates | Target architecture | Analysis 3 |
| 7 | No agent can approve a client, close a true match or change a risk rating | Guardrails | Analysis 3 |
| 8 | The system classifies as a Tier 2 model system under SS1/23 with component-level validation | Model-risk pack [PUBLIC, VERIFY] | Analysis 4 |
| 9 | Effort falls 47% before human-in-the-loop overhead and 45% after, releasing 414 FTE of capacity | Effort build | Analysis 2 |
| 10 | Capacity converts to cost through attrition, captive flex and redeployment to the review backlog | Workforce plan | Analysis 2 |
| 11 | Token costs are GBP 53,000 a year; model choice is about accuracy, not price | Token maths | Analysis 5 |
| 12 | The pilot passed all nine gates on 3,000 SME cases | Gate results | Analysis 6 |
| 13 | Analysts overrode 11% of proposals, falling to 8% by week 15 | Override analysis | Analysis 6 |
| 14 | Scaling costs GBP 14m and GBP 4.5m a year to run | TCO | Analysis 7 |
| 15 | On cost alone the programme pays back in month 31 with NPV of GBP 21m; revenue takes NPV to GBP 46m | Business case | Analysis 7 |
| 16 | Mid-corporate is the next segment; complex structures stay assist-only for 18 months | Scale roadmap | Synthesis |
| 17 | Three decisions: scale to mid-corporate, fund the platform, approve the workforce plan | Decisions | Synthesis |
| 18 | Appendix: scoring detail, validation plan, DPIA, gate data | | |

### Recommendation

Scale the supervisor-led system from SME to mid-corporate over the next two quarters, keep complex structures in assist mode until 18 months of override data support expansion, fund the GBP 14m build and GBP 4.5m run from the Corporate Banking change budget, approve the workforce plan that converts 414 FTE of capacity through attrition, captive flex-down and redeployment, and formalise the Tier 2 classification and annual revalidation with the model-risk function.

### Benefits and risks

Benefits: GBP 18m of annual capacity release and an estimated GBP 10m of revenue contribution at steady state; SME cycle time from 9 to 4 days; a clearance of the 14,000-case review backlog within a year using redeployed analysts; a model-risk pattern reusable for AML and sanctions.

Risks and mitigations: a missed beneficial owner or true match (mitigated by hard gates, 100% QC in pilot, risk-based sampling at scale, kill switch); vendor model changes degrading accuracy (mitigated by version pinning, change notification clauses, regression evals); analyst de-skilling (mitigated by rotation through complex cases and QC roles); prompt injection via uploaded documents (mitigated by document sanitisation, isolation of untrusted content, action allow-lists); labour relations in the UK and India (mitigated by early consultation and an attrition-first plan).

## Simulation C: An AI business case for an agentic dispute-resolution platform, defended to a CFO

### Client ask

[ILLUSTRATIVE — composite] "Meridian Card Services" is a US card issuer with 14 million active cards. It receives 600,000 cardholder disputes a year with an average disputed amount of USD 142, so USD 85.2m of disputed value. Disputes operations employ 410 FTE (blended onshore and nearshore) at USD 52,000 loaded, costing USD 21.3m, plus USD 4.2m of technology and vendor cost: USD 25.5m a year, or USD 42.50 per dispute. Write-offs attributable to dispute handling (unrecovered provisional credits, chargebacks filed late or with weak evidence, representment losses) run at USD 9.4m a year, about 11% of disputed value. Only 12% of disputes are resolved without human touch today, mostly low-value automatic write-offs. The COO sponsors an agentic dispute platform; the CFO has refused two previous AI business cases as "capacity dressed up as savings".

The ask from the COO: "Build the business case the CFO will sign. Eight weeks. Every number has to survive her."

Engagement shape: 8 weeks; partner (15%), engagement manager, two consultants, one AI engineer for architecture and cost, one Finance-seconded analyst to tie out baselines. Illustrative fee USD 650,000 to 900,000 [ESTIMATE].

### Diagnostic

**Baseline tie-out.** The team reconciled the USD 25.5m to the general ledger cost centres with the seconded Finance analyst in week 2, producing a signed baseline. Cost per dispute USD 42.50; handle time 1.24 hours per human-handled dispute (656,000 productive hours over 528,000 human-handled disputes); 38% of disputes fraud-coded, 62% merchant or service disputes; 2.1% of disputes escalate to a formal complaint.

**Regulatory frame.** Regulation E requires provisional credit within 10 business days where an investigation runs longer, and completion of the investigation within 45 days (90 in defined cases); Regulation Z sets billing-error resolution within two billing cycles and no more than 90 days [PUBLIC — 12 CFR 1005.11 and 12 CFR 1026.13; VERIFY current text]. Late filing against network chargeback time limits is a direct loss driver. These timelines make cycle time a compliance metric, not only a cost metric.

**Process.** Twelve L3 steps from intake to closure; the heaviest are evidence gathering across transaction, merchant and authorisation data (29% of handle time), customer correspondence (18%), reason-code classification and network filing (17%), and investigation write-up (14%).

**Loss drivers.** Of the USD 9.4m: USD 3.9m from chargebacks not filed or filed late; USD 3.1m from representments lost for weak evidence; USD 2.4m from provisional credits on low-value disputes written off under policy.

### Hypotheses

1. **H1.** At least half of disputes can reach a resolution proposal without human handling by year 3, with human sign-off retained on fraud-coded and high-value cases. Result: confirmed at 50%, with 60% as upside.
2. **H2.** Faster, better-evidenced network filing reduces dispute write-offs by at least 20%. Result: confirmed at 25%, applying only to the late-filing and weak-evidence pools.
3. **H3.** The CFO will accept capacity release only where a workforce mechanism converts it to cost within 18 months. Result: confirmed; attrition of 14% a year (about 57 FTE) plus nearshore contract flexibility covers 100% of the planned release by year 3.
4. **H4.** Model costs are below 1% of run cost. Result: confirmed; about USD 0.17 per dispute.
5. **H5.** A hybrid of buying the network-filing connector and building the orchestration beats a pure SaaS purchase. Result: confirmed on scope coverage and three-year cost.

### Workstreams

| Workstream | Scope | Outputs |
|---|---|---|
| 1. Baseline and value levers | GL tie-out, process metrics, loss decomposition | Signed baseline |
| 2. Solution and TCO | Target architecture, build and run cost, buy comparison | TCO model |
| 3. Benefits and ramp | Straight-through model, effort build, loss model, ramp curve | Benefit model |
| 4. Financial case and CFO challenge | NPV, IRR, payback, scenarios, tornado, pre-empted challenges | Business case and challenge log |

### Week-by-week plan

| Week | Focus | Key activities | Milestone |
|---|---|---|---|
| 1 | Mobilise | Hypotheses, Finance secondment, data pull of 12 months of disputes | |
| 2 | Baseline | GL tie-out, handle-time analysis, loss decomposition | Signed baseline |
| 3 | Solution | Target architecture, straight-through eligibility rules, HITL design | |
| 4 | Cost | Build and run TCO, token modelling, buy option quotes | CFO pre-read 1 |
| 5 | Benefits | Effort build, loss model, ramp, workforce mechanism | |
| 6 | Case | NPV, IRR, payback, risk-adjusted case, tornado, scenarios | CFO pre-read 2 |
| 7 | Challenge | Mock CFO session with Finance, revisions, challenge log | |
| 8 | Decide | CFO and COO decision meeting, investment committee paper | Decision |

### Key analyses

**Analysis 1: target design in one table.**

| Agent | Function | Autonomy |
|---|---|---|
| Intake and triage agent | Captures dispute, classifies reason code, checks eligibility rules | Automated; fraud-coded and over USD 500 flagged |
| Evidence agent | Gathers transaction, authorisation, device and merchant data; queries merchant collaboration networks | Automated |
| Resolution agent | Proposes outcome (credit, deny, chargeback) with evidence summary | Automated below USD 500 non-fraud; human sign-off otherwise |
| Filing agent | Files chargebacks and representments in network format within time limits | Automated with deterministic validation |
| Communications agent | Drafts regulatory notices and customer updates | Template-bound, human release on denials |
| Supervisor | Orchestrates, tracks Reg E and Z clocks, escalates | Escalation rules |

**Analysis 2: effort and straight-through build.** Straight-through eligibility at year 3: non-fraud disputes under USD 500 with complete evidence and a confident classification, plus fraud disputes with confirmed compromised-card markers; modelled at 50% of volume. Human-handled disputes fall from 528,000 to 300,000, and handle time on those falls 30% to 0.87 hours because evidence and drafting arrive prepared. Hours: 300,000 × 0.87 = 260,000; QA sampling of 10% of straight-through cases at 0.25 hours = 7,500; total 267,500 hours, or 167 FTE, plus a 12-FTE supervision and exceptions team. Future state 179 FTE against 410 today: a reduction of 231 FTE, 56%, worth USD 12.0m a year at USD 52,000 [ESTIMATE].

**Analysis 3: loss reduction.** Applied only to the late-filing (USD 3.9m) and weak-evidence (USD 3.1m) pools, USD 7.0m. Filing within time limits and evidence completeness were modelled to recover 34% of that pool, USD 2.4m a year, about 25% of total write-offs. The low-value write-off pool was excluded because it is a policy choice, not a handling failure; the CFO was told this explicitly. [ESTIMATE]

**Analysis 4: other benefits.** Complaint escalations fall from 2.1% to 1.4% of disputes, avoiding USD 0.8m of complaint handling and remediation; retirement of a legacy case-tracking licence saves USD 0.3m. Total gross run-rate benefit: 12.0 + 2.4 + 0.8 + 0.3 = USD 15.5m a year [ESTIMATE].

**Analysis 5: TCO.** Build, over ten months: integration with card platform, network interfaces and case tool USD 2.5m; agent engineering and orchestration USD 2.0m; golden dataset, evaluation harness and guardrails USD 0.8m; change, training and role redesign USD 0.7m; model-risk validation USD 0.4m; programme management USD 0.4m. Total USD 6.8m. Run, a year at scale: platform and infrastructure 1.2; vendor connectors and merchant-network fees 0.9; AI engineering team of eight at USD 160,000 = 1.3; monitoring, evaluation and guardrail operations 0.6; model-risk revalidation 0.3; tokens 0.1. Total USD 4.4m, plus a USD 0.6m model refresh in year 3. [ESTIMATE]

Token arithmetic per dispute: about 60,000 input tokens and 6,000 output tokens across the agent chain. Mid-tier model for 70% of steps: 42,000 × USD 0.80 per million = USD 0.034 plus 4,200 × USD 4 per million = USD 0.017, total USD 0.051. Frontier model for 30%: 18,000 × USD 3 per million = USD 0.054 plus 1,800 × USD 15 per million = USD 0.027, total USD 0.081. Sum USD 0.13; add 30% for retries and evaluation runs: USD 0.17 a dispute; 600,000 disputes: USD 0.10m a year, about 2% of run cost [ESTIMATE — order of magnitude, VERIFY pricing]. Cross-check: Module 8 models a different composite issuer with the same 600,000 volume and arrives at USD 0.18 per dispute with tiered routing, a build of USD 5.4m and run of USD 2.7m a year; the two sit within the same order of magnitude, which is the test a CFO will apply.

**Analysis 6: the financial case.** Ramp: 20% of run-rate benefit in year 1, 60% in year 2, 100% from year 3. Year 1 run cost is half a year, USD 2.5m, as the platform goes live mid-year.

| Year | Build, USD m | Run, USD m | Benefit, USD m | Net, USD m | Cumulative, USD m |
|---|---|---|---|---|---|
| 0 | 6.8 | 0 | 0 | -6.8 | -6.8 |
| 1 | 0 | 2.5 | 3.1 | 0.6 | -6.2 |
| 2 | 0 | 4.4 | 9.3 | 4.9 | -1.3 |
| 3 | 0 | 5.0 | 15.5 | 10.5 | 9.2 |
| 4 | 0 | 4.4 | 15.5 | 11.1 | 20.3 |
| 5 | 0 | 4.4 | 15.5 | 11.1 | 31.4 |

NPV at 10%: -6.8 + 0.6/1.10 + 4.9/1.21 + 10.5/1.331 + 11.1/1.4641 + 11.1/1.6105 = -6.8 + 0.55 + 4.05 + 7.89 + 7.58 + 6.89 = USD 20.2m. IRR about 66% (the discount rate at which the stream sums to zero; at 60% it is +0.8, at 70% it is -0.5). Payback in month 26 from the start of the build year.

Risk-adjusted case, applying a 30% haircut to all benefits, which is the evidence-level haircut for a pilot-stage pattern: benefits 2.2, 6.5, 10.9, 10.9, 10.9; net -6.8, -0.3, 2.1, 5.9, 6.5, 6.5; NPV USD 7.4m; IRR about 34%; payback month 34. The team presented both and recommended on the risk-adjusted case.

**Analysis 7: sensitivity (tornado), NPV impact on the USD 20.2m base.**

| Driver | Downside assumption | NPV, USD m | Upside assumption | NPV, USD m |
|---|---|---|---|---|
| Capacity converted to cost | 60% converted | 7.1 | 100% (base) | 20.2 |
| Straight-through rate at year 3 | 35% | 13.1 | 60% | 24.8 |
| Ramp timing | Six-month delay | 13.1 | On plan | 20.2 |
| Loss reduction | Nil | 13.6 | 35% of pool | 22.5 |
| Build cost | +40% overrun | 17.5 | On budget | 20.2 |
| Token prices | Three times base | 19.7 | Base | 20.2 |

The ranking is the message: whether capacity becomes cost matters three times more than whether the technology works as well as planned, and model pricing is irrelevant to the decision.

**Analysis 8: buy comparison.** A dispute-automation SaaS quoted at USD 1.90 per dispute (USD 1.14m a year) plus USD 1.5m implementation covered intake, rules and network filing and was modelled to reach 30% straight-through with limited evidence reasoning. Three-year cost USD 4.9m against USD 15.3m for the build, but three-year benefit of USD 13m against USD 28m. The recommendation was a hybrid: buy the network-filing connector (USD 0.4m a year, included in run cost), build orchestration, evidence and resolution agents where the differentiation and the straight-through rate are won. [ILLUSTRATIVE]

**Analysis 9: the CFO's eight challenges and the answers given.**

1. **"This is capacity, not cost. Show me where USD 12m leaves the P&L."** Answer: 231 FTE over three years. Attrition at 14% is about 57 FTE a year, 170 over three years, replaced only by exception; nearshore contract flex covers the remaining 61 in year 3. Headcount glide path by quarter attached, co-owned by the COO and HR. The 60% conversion downside is in the tornado at NPV USD 7.1m, still positive.
2. **"Your baseline is inflated."** Answer: USD 25.5m tied to GL cost centres and signed by your seconded analyst in week 2; USD 42.50 a dispute reconciles to the cost-per-dispute metric your team already reports.
3. **"Your ramp is optimistic."** Answer: 20/60/100 is below the volume ramp Klarna reported publicly in 2024, and we have priced the quality correction they later made by keeping a 12-FTE exceptions team and a quality floor [PUBLIC — Klarna, 2024 and 2025, VERIFY]. A six-month delay takes NPV to USD 13.1m.
4. **"Where are the run costs? The last case had none."** Answer: USD 4.4m a year, itemised; people and platform, not tokens. Tokens are USD 0.1m; tripling them moves NPV by USD 0.5m.
5. **"You are double counting with the fraud programme's loss savings."** Answer: the loss benefit applies only to the late-filing and weak-evidence pools, USD 7.0m of the USD 9.4m; fraud-model savings sit in a different pool and a different cost centre. Attribution map attached.
6. **"What happens when Reg E or a CFPB examiner looks at this?"** Answer: the supervisor tracks Reg E and Z clocks per case, every automated resolution carries an evidence record and a reason, denials require human release, and the system is classified under model risk with validation before go-live [PUBLIC — Reg E and Z, VERIFY]. Cycle-time compliance improves, which is a benefit we have not monetised.
7. **"You are locking us into a model vendor."** Answer: model-agnostic gateway, two models qualified, regression evaluation suite to requalify a replacement in under four weeks, and a USD 0.6m refresh in year 3 already in the case.
8. **"Why not buy the vendor's product for a quarter of the cost?"** Answer: it reaches 30% straight-through, not 50%, and three-year benefit of USD 13m against USD 28m; we buy the filing connector and build the parts that win the straight-through rate.

A ninth challenge came from the CRO rather than the CFO: "Easier disputes invite first-party fraud." The answer was a first-party-abuse model in the triage agent, velocity limits per cardholder, and a monitored dispute-rate KPI with a trigger to tighten eligibility.

### Deliverables and slide-by-slide storyline

| Slide | Action title | Key content | Source analysis |
|---|---|---|---|
| 1 | An agentic dispute platform returns USD 7m of risk-adjusted NPV and pays back in month 34, with cost release secured through attrition | Executive summary | All |
| 2 | Disputes cost USD 25.5m and write off USD 9.4m a year; the baseline is tied to the GL | Baseline | Diagnostic |
| 3 | Evidence gathering, correspondence and filing consume 64% of handle time | Process metrics | Diagnostic |
| 4 | Six agents under a supervisor resolve half of disputes without human handling by year 3 | Target design | Analysis 1 |
| 5 | Humans keep every fraud-coded, high-value and denial decision | Autonomy and gates | Analysis 1 |
| 6 | Effort falls 56%, from 410 to 179 FTE, worth USD 12m a year | Effort build | Analysis 2 |
| 7 | Capacity converts to cost through attrition and contract flex within three years | Workforce glide path | Analysis 2 and challenge 1 |
| 8 | Better-evidenced, on-time filing recovers USD 2.4m of write-offs a year | Loss model | Analysis 3 |
| 9 | The platform costs USD 6.8m to build and USD 4.4m a year to run; tokens are 2% of run cost | TCO | Analysis 5 |
| 10 | Base case NPV is USD 20m; risk-adjusted NPV is USD 7m | Financial case | Analysis 6 |
| 11 | The case turns on converting capacity, not on the technology | Tornado | Analysis 7 |
| 12 | A hybrid beats pure SaaS by USD 15m of three-year benefit | Buy comparison | Analysis 8 |
| 13 | Regulatory clocks and evidence records improve compliance, unmonetised | Controls | Analysis 9 |
| 14 | We answer the eight challenges raised on prior cases | Challenge log | Analysis 9 |
| 15 | Decision: approve USD 6.8m and the workforce plan; gate scale on month-12 metrics | Decision | Synthesis |
| 16 | Appendix: GL tie-out, model detail, vendor quotes, scenario tables | | |

### Recommendation

Approve USD 6.8m of build investment and USD 4.4m of annual run cost on the risk-adjusted case (NPV USD 7.4m, IRR about 34%, payback month 34), with scale beyond 35% straight-through gated on month-12 evidence; adopt the attrition-first workforce plan co-owned by the COO and HR; buy the network-filing connector and build the orchestration and evidence agents; and classify the system under model risk with validation before go-live.

### Benefits and risks

Benefits: USD 15.5m gross and USD 10.9m risk-adjusted run-rate; cost per dispute from USD 42.50 to about USD 24 at scale [ESTIMATE]; faster regulatory clock compliance; a reusable evidence and filing capability for fraud operations.

Risks and mitigations: capacity not converted (attrition-first plan, quarterly glide-path review); first-party fraud (abuse model, velocity limits, dispute-rate trigger); regulatory finding on automated denials (human release on all denials, evidence records); vendor model change (gateway, regression suite); customer harm from wrong automated credits or denials (quality floor, complaint-rate trigger, sampling).

## How to talk about these simulations in an interview

Interviewers want three things from an engagement walkthrough: structure, numbers you can defend, and judgement about what mattered. Use the following pattern for any of the three simulations.

- **Open with the ask and the shape.** "A mid-sized European bank asked for an AI strategy and a first-wave decision in twelve weeks." One sentence, then the team and the deliverable.
- **State the diagnostic finding as a number.** "Maturity 1.75 against a peer median of 2.7, with technology the widest gap; EUR 385m of cost in language-heavy processes."
- **Give the hypothesis that drove the work and whether it held.** "We hypothesised two-thirds of value sat in six operations domains, not customer-facing GenAI; it did, 68% on the risk-adjusted view."
- **Describe one analysis in depth.** Pick the scored matrix, the agentic-fit scoring or the tornado, and walk the arithmetic. This is where you show you own the numbers.
- **State the recommendation and the decision the client took.** "EUR 60m over five years, three waves, hub-and-spoke; the board approved wave 1 and the platform."
- **Close with what you would do differently.** For Simulation A, start data remediation in week 1. For B, bring the MLRO into week 1 rather than week 4. For C, secure the workforce mechanism before building the benefit model.

Make your own role explicit in every sentence that matters: "I ran the scoring workshop", "I built the TCO model", "I presented the tornado to the CFO". Interviewers probing strategy versus operations are listening for who owned the judgement calls, not who wrote the code.

## Self-check quiz

1. In Simulation A, recompute the five-year NPV if wave 2 slips by a year, assuming year 3 benefit falls from EUR 42m to EUR 24m and year 4 from EUR 48m to EUR 42m, with all other figures unchanged. Show the arithmetic.
2. In Simulation B, the UBO identification task scored exactly 3.50, on the boundary between "automate" and "assist". State which dimension decided the design and why, and name the SS1/23 principle most relevant to that decision.
3. In Simulation C, explain why the CFO's challenge on capacity conversion matters more to NPV than the straight-through rate, using the tornado figures.
4. Across all three simulations, token costs were below 2% of run cost. Give the per-case token arithmetic for Simulation C and explain what this means for how you present model choice to a client.
5. Simulation C excluded the USD 2.4m low-value write-off pool from the loss benefit. Why, and what does that choice signal to a CFO?
