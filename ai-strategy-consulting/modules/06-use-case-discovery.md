# Module 6 — Use-Case Discovery

## 1. Why a client cares

The quality of an AI portfolio is fixed at discovery. If the long list is built from vendor demos and executive anecdotes, prioritisation in Module 7 simply ranks the wrong things well. Clients care because discovery done properly produces something they almost never have: a task-level map of where effort, error and delay actually sit in a domain, which is reusable for operations improvement regardless of whether AI is the answer. It also produces the baseline that the business case will later need (Module 9), which is why discovery and baselining should be designed together.

## 2. Concept and mechanism

### 2.1 Discovery is decomposition, not brainstorming

Generative and agentic AI act on tasks, not on departments. A department-level statement such as "AI for KYC" is unscoreable: it conflates tasks with radically different automation potential (document classification is highly automatable; MLRO approval of a high-risk client is not). Discovery therefore decomposes a domain to the level at which a single task has a definable input, output, decision logic and error profile, and only then asks what AI pattern fits.

Four levels are standard in process architecture practice (the L1 to L4 convention is from process-classification frameworks such as APQC's Process Classification Framework; the application to AI discovery is practitioner convention) [PUBLIC — APQC PCF, ongoing; application ILLUSTRATIVE]:

| Level | Name | Example in corporate onboarding | Typical count per domain |
|---|---|---|---|
| L1 | Domain or value chain | Corporate client onboarding (KYB) | 1 |
| L2 | Stage or sub-process | Document collection; entity verification; screening | 6 to 10 |
| L3 | Task or activity | Build ownership structure and identify UBOs | 20 to 40 |
| L4 | Step | Open registry extract; map shareholder percentages; flag layers above 25 percent | 100 to 300 |

AI fit is assessed at L3, and sometimes L4 when an L3 task mixes automatable and judgement-heavy steps. Business cases are built at L2 or L1, because benefits only materialise when a whole stage changes.

### 2.2 The value-chain walk

A value-chain walk is a structured traverse of the domain from trigger to outcome, with the people who do the work, capturing for each L3 task:

- **Input and output artefacts** (documents, system records, decisions).
- **Volume and frequency** (cases per month, items per case).
- **Handle time** (touch time, not elapsed time) and **cycle time** (elapsed).
- **Rework and error rate** (proportion of cases sent back, root causes).
- **Systems touched** and the mode of access (API, screen, manual re-keying).
- **Decision logic** (deterministic rules, documented policy, tacit judgement).
- **Controls** (maker-checker, sampling, second-line sign-off) and their regulatory basis.

The walk is done on real cases, not on the documented process. The gap between the two is itself a finding: in corporate onboarding the documented process typically has 15 to 20 steps and the observed process 25 to 40, with the difference made up of chasing, re-keying and discrepancy resolution [ILLUSTRATIVE — composite].

### 2.3 Pain-point heatmaps

A heatmap scores each L3 task on a small number of pain dimensions and renders the result so that concentration of pain is visible. The standard dimensions:

| Dimension | Question | Scale anchor (5) |
|---|---|---|
| Volume | How many times a month is this performed? | Top quintile of tasks in the domain |
| Effort | Handle time per occurrence multiplied by volume | Top quintile of total hours |
| Error and rework | How often is output wrong or sent back? | Above 20 percent rework |
| Delay | Share of end-to-end cycle time this task causes, including waiting | Above 20 percent of cycle time |
| Customer or colleague friction | Does the task generate complaints, chasing, escalations? | Frequent, measurable |

The heat score is a simple sum (maximum 25) or a weighted sum where the client's objective justifies weighting (a cycle-time-driven ambition weights Delay; a cost-driven ambition weights Effort). Heat is not AI fit. A task can be hot and unsuitable for AI (MLRO approval) or cool and ideal (document classification at low volume). The heatmap tells you where value is; the fit assessment in Module 7 tells you whether AI can reach it.

### 2.4 Ideation workshops

Workshops turn the heatmap into candidate use cases. They are necessary because the people who do the work know constraints and workarounds that no process document records, and because ownership of a use case starts in the room. The design that works:

- **Participants (10 to 14).** Process owner, three to five front-line operators and checkers, a second-line compliance representative, a data or platform architect who knows the system landscape, a product owner, two consultants (one facilitating, one capturing).
- **Pre-work.** Participants receive the heatmap and the decomposed task list 48 hours ahead; the facilitator pre-seeds four to six "provocation" use cases based on patterns seen elsewhere so the room has something concrete to react to.
- **Agenda (half day).** Thirty minutes on AI patterns in plain terms (the five tools from Module 1 and the agent patterns from Module 3, no vendor demos); forty-five minutes on the heatmap with the room correcting scores; ninety minutes of ideation per hot zone using prompt cards; forty-five minutes of clustering and first-cut fit discussion; thirty minutes assigning sponsors to each cluster.
- **Prompt cards.** Each card forces a pattern on a task: "What if the system drafted this and a human approved it?" (copilot); "What if an agent executed this end to end and only exceptions came to a human?" (agentic with HITL); "What would need to be true for this to be fully automated?" (constraint surfacing); "What does the checker actually check, and could it be checked by a rule?" (rules-versus-model).
- **Outputs.** A raw idea list (typically 40 to 80 items for one domain), a first clustering, named sponsors per cluster, and a parking lot of non-AI improvements, which is often worth more than the AI list and should be handed to the operations team.

### 2.5 Building and cleaning the long list

Raw ideas are not use cases. Cleaning involves five operations:

1. **Normalise the unit.** Each use case is written as "pattern + task + outcome", for example "Agent that unwinds ownership structures from registry and client documents and produces a UBO schedule for checker review". Ideas phrased as technologies ("use an LLM") or outcomes ("faster onboarding") are rewritten or discarded.
2. **De-duplicate.** Merge ideas that act on the same task with the same pattern. Keep variants that differ in autonomy level as options within one use case, not as separate use cases.
3. **Cluster into domains and stages.** Map each use case back to its L2 stage. A stage with four or more use cases is a candidate for a "reshape" of the whole stage rather than point solutions.
4. **Separate AI from non-AI.** Rules, workflow and data fixes go to the operations improvement backlog. Keeping them in the AI long list inflates the AI business case and misleads prioritisation.
5. **Attach the baseline.** Pull the volume, handle time and error data for the underlying task from the value-chain walk onto the use case. A use case without a baseline cannot be scored on value and goes back to discovery.

A good long list for one domain has 10 to 15 use cases after cleaning, each with a one-paragraph description, pattern, autonomy option, sponsor and baseline.

### 2.6 Where discovery goes wrong structurally

- **Top-down only.** Executive interviews produce the use cases executives have read about. The heatmap is the corrective.
- **Bottom-up only.** Front-line ideation without an ambition statement produces 80 micro-automations and no strategy. The ambition from Module 5 is the filter.
- **Vendor-led.** A platform vendor's catalogue is a sales document; its "use cases" are its features.
- **No baseline.** Discovery that does not capture volumes and times produces a long list that cannot be prioritised or costed.

## 3. Frameworks

### 3.1 Process decomposition (L1 to L4)

Attribution: process-level conventions derive from process-classification frameworks such as the APQC PCF [PUBLIC — APQC, ongoing] and from business process management practice; the use of L3 as the AI assessment unit is practitioner convention, attribution uncertain. Steps:

1. Confirm the L1 domain boundary (trigger, outcome, exclusions) with the sponsor.
2. Draft L2 stages from documentation; validate with the process owner.
3. Build L3 tasks from observed cases (five to ten real cases walked end to end), not from documentation.
4. Decompose to L4 only where an L3 task mixes automatable and judgement steps.
5. Capture the seven attributes in section 2.2 per L3 task.

### 3.2 Pain-point heatmap

Attribution: generic operations-improvement tool, widely used; no single originator. Steps:

1. Choose four to five pain dimensions aligned to the client's ambition.
2. Score each L3 task 1 to 5 per dimension using data where available and operator consensus where not; mark which is which.
3. Compute heat; render as a grid of stages by tasks with colour intensity.
4. Identify hot zones (contiguous tasks with heat 17 or higher out of 25).
5. Record the non-AI fixes revealed, as a separate output.

### 3.3 Ideation workshop with pattern prompt cards

Attribution: practitioner design; the pattern cards draw on the agent patterns documented in Module 3. Steps are in section 2.4.

### 3.4 Use-case canvas

Attribution: adapted from Osterwalder and Pigneur's Business Model Canvas structure (2010) [PUBLIC — 2010]; the AI-specific fields are practitioner convention. One page per use case, fields: task and stage; current baseline (volume, handle time, cycle time, error rate); AI pattern and autonomy level; inputs and data sources; outputs and consumers; human-in-the-loop design; controls affected; value hypothesis (which lever, Module 9); key risks; sponsor; open questions. The canvas is the hand-off artefact into Module 7.

## 4. Worked BFSI example

### 4.1 Setting

[ILLUSTRATIVE — composite] Northgate Bank (from Module 5) selected corporate onboarding (KYB) as a "Transform" domain. Baseline from the value-chain walk: 7,200 new corporate and SME onboardings a year plus 9,500 periodic reviews; 140 FTE in the onboarding and KYC operations team; median end-to-end cycle time 23 business days for a standard corporate, 41 days for a complex structure; 31 percent of cases returned by the checker at least once; relationship managers spend an estimated 12 percent of their time on onboarding status chasing.

### 4.2 Decomposition and heatmap

Scores are 1 to 5 per dimension; heat is the sum (maximum 25). Scores marked with an asterisk are from system data; the others are operator consensus from the workshop. [ILLUSTRATIVE — composite]

| # | L2 stage | L3 task | Volume | Effort | Error | Delay | Friction | Heat |
|---|---|---|---|---|---|---|---|---|
| 1.1 | Intake and pre-screen | Capture request and basic entity details from RM | 4* | 2 | 2 | 1 | 2 | 11 |
| 1.2 | Intake and pre-screen | Pre-screen against risk appetite (sector, jurisdiction) | 4* | 1 | 1 | 1 | 1 | 8 |
| 1.3 | Intake and pre-screen | Determine required document set by entity type and jurisdiction | 4* | 2 | 4* | 3 | 3 | 16 |
| 2.1 | Document collection | Issue document request to client | 4* | 2 | 2 | 2 | 3 | 13 |
| 2.2 | Document collection | Chase outstanding documents | 5* | 4* | 1 | 5* | 5 | 20 |
| 2.3 | Document collection | Receive, classify and index documents | 5* | 3 | 3 | 2 | 1 | 14 |
| 2.4 | Document collection | Check completeness, validity and expiry | 5* | 3 | 4* | 3 | 3 | 18 |
| 3.1 | Entity verification | Verify legal entity against company registry | 4* | 2 | 2 | 1 | 1 | 10 |
| 3.2 | Entity verification | Extract directors and shareholders from documents | 4* | 3 | 3 | 2 | 1 | 13 |
| 3.3 | Entity verification | Build ownership structure and identify UBOs across layers | 3* | 5* | 5* | 4 | 2 | 19 |
| 3.4 | Entity verification | Verify UBO identities (ID and V) | 3* | 2 | 2 | 3 | 3 | 13 |
| 3.5 | Entity verification | Reconcile discrepancies between client data and registry | 4* | 4 | 4* | 4 | 3 | 19 |
| 4.1 | Screening | Screen entity, directors and UBOs against sanctions and PEP lists | 5* | 1 | 1 | 1 | 1 | 9 |
| 4.2 | Screening | Adverse media search | 4* | 3 | 3 | 2 | 1 | 13 |
| 4.3 | Screening | Adjudicate screening hits and document disposition | 5* | 5* | 3 | 3 | 1 | 17 |
| 5.1 | Risk assessment | Determine customer risk rating | 4* | 2 | 3 | 1 | 1 | 11 |
| 5.2 | Risk assessment | Source of funds and wealth assessment (high risk) | 2* | 4 | 3 | 4 | 3 | 16 |
| 5.3 | Risk assessment | Draft enhanced due diligence narrative | 2* | 5* | 3 | 4 | 1 | 15 |
| 5.4 | Risk assessment | Capture expected activity profile | 4* | 2 | 4 | 1 | 2 | 13 |
| 6.1 | Decision | Checker quality review (four eyes) | 5* | 4* | 4* | 3 | 2 | 18 |
| 6.2 | Decision | Compliance and MLRO approval for high risk | 2* | 2 | 1 | 4 | 2 | 11 |
| 6.3 | Decision | Communicate decision and conditions to RM and client | 4* | 1 | 2 | 1 | 3 | 11 |
| 7.1 | Account setup | Set up accounts, mandates and signatories | 4* | 3 | 3 | 2 | 3 | 15 |
| 7.2 | Account setup | Tax classification (FATCA and CRS) | 4* | 2 | 3 | 1 | 1 | 11 |
| 8.1 | Handover | Set periodic review schedule and monitoring triggers | 4* | 1 | 2 | 1 | 1 | 9 |

Hot zones (heat 17 or above): document chasing and completeness (2.2, 2.4), ownership structure and discrepancy reconciliation (3.3, 3.5), screening hit adjudication (4.3), checker review (6.1). Together these six tasks account for an estimated 58 percent of operations touch time and roughly 70 percent of the cycle-time variance between standard and complex cases [ESTIMATE — from the walk data; composite].

Non-AI findings handed to operations: document requirements matrix (1.3) is maintained in a spreadsheet with jurisdiction gaps; the registry lookup (3.1) is manual although an API is licensed; FATCA and CRS classification (7.2) could be rule-driven today.

### 4.3 Long list after the workshop and cleaning

The workshop produced 61 raw ideas; after normalising, de-duplicating and removing non-AI items, 12 candidate use cases remain. Pattern vocabulary follows Modules 1 and 3. [ILLUSTRATIVE — composite]

| UC | Use case | Stage | Pattern | Autonomy option | Baseline attached |
|---|---|---|---|---|---|
| UC1 | Document requirement determination and personalised request pack | 1.3, 2.1 | Rules plus LLM explanation | Auto-generate, RM approves | 7,200 packs a year; 31 percent incomplete first time |
| UC2 | Intelligent document intake: classify, extract, completeness and expiry check | 2.3, 2.4 | Document AI plus LLM validation | Auto with confidence threshold | 86,000 documents a year; 4.1 minutes handle each |
| UC3 | Client chase and clarification agent | 2.2 | Agent with tools (case system, email, portal) | Agent sends; escalates after two cycles | 2.2 chases per case; 6.4 days average wait |
| UC4 | Registry verification and data reconciliation agent | 3.1, 3.5 | Agent with registry APIs | Auto-reconcile; discrepancies to analyst | 4,100 discrepancy cases a year; 38 minutes each |
| UC5 | Ownership structure unwinding and UBO schedule drafting | 3.2, 3.3 | Plan-and-execute agent plus extraction | Draft for analyst confirmation | 2,900 complex structures a year; 2.6 hours each |
| UC6 | Screening hit adjudication copilot | 4.3 | RAG plus LLM narrative with rules pre-filter | Draft disposition; analyst decides | 48,000 hits a year; 94 percent false positive; 9 minutes each |
| UC7 | Adverse media search and summarisation | 4.2 | Retrieval plus summarisation | Auto-summary; analyst reads | 7,200 searches a year; 22 minutes each |
| UC8 | Customer risk rating pre-population and rationale | 5.1, 5.4 | Rules engine plus LLM rationale | Pre-populate; analyst confirms | 7,200 ratings a year; 14 percent corrected by checker |
| UC9 | EDD and source-of-wealth narrative drafting | 5.2, 5.3 | RAG over case file plus drafting | Draft; analyst edits; MLRO approves | 1,400 narratives a year; 3.8 hours each |
| UC10 | Checker quality-review copilot | 6.1 | LLM consistency checks across case file | Flags for checker; no auto-approval | 7,200 reviews a year; 31 percent return rate |
| UC11 | RM onboarding status and case-summary assistant | 6.3, cross-stage | Retrieval plus summarisation | Read-only assistant | 12 percent of RM time on status chasing |
| UC12 | Perpetual KYC: trigger-based review and pre-populated refresh | 8.1 and periodic review | Event-driven agent | Auto-refresh low risk; analyst for medium and high | 9,500 reviews a year; 2.1 hours each |

Clustering observation for the sponsor: UC2, UC3, UC4 and UC5 together cover the document and verification stages end to end. That is a "reshape" of stages 2 and 3 rather than four point solutions, and it should be assessed as a bundle in Module 7 as well as individually.

The so-what for the client: 58 percent of the team's touch time sits in six tasks, and ten of the twelve candidates act on those tasks. The domain is a credible "Transform" candidate because value is concentrated, not diffuse.

## 5. Real-world case

**HSBC and Google Cloud, anti-money-laundering transaction monitoring** [PUBLIC — Google Cloud announcement and HSBC statements, Jun 2023; figures VERIFY]. HSBC's work with Google Cloud's AML AI (built from HSBC's earlier "Dynamic Risk Assessment") is a discovery lesson as much as a model lesson. The team did not start from "apply AI to financial crime"; it targeted a specific, measured pain point in the value chain: rules-based transaction monitoring generating very high alert volumes with low true-positive rates, consuming investigator time. Google Cloud reported that the system identified two to four times more suspicious activity while cutting alert volumes by around 60 percent [PUBLIC — Google Cloud, Jun 2023, VERIFY]. The discovery lesson is that the use case was defined at the task level (alert generation and triage), with a baseline (alert volume, true-positive rate, investigator hours) that made the value measurable from day one.

Counter-example: **Commonwealth Bank of Australia** [PUBLIC — Australian press and Finance Sector Union statements, Aug 2025; VERIFY]. CBA announced 45 call-centre role reductions attributed to an AI voice bot, then reversed them after the union challenged the claim and the bank acknowledged that call volumes had not fallen as assumed. The discovery lesson is that the baseline (call volumes by type, deflection rates) was not established well enough to support the workforce claim, which is exactly the "attach the baseline" step in section 2.5.

## 6. Consultant language

> "We assess AI fit at the task level and build business cases at the stage level. A department is not a unit of analysis."

Use when a client asks for "AI for KYC" or "AI for operations" as a use case.

> "The heatmap tells us where the pain is. The fit assessment tells us whether AI can reach it. They are different questions and we should not collapse them."

Use when a stakeholder assumes the hottest task is the best AI candidate.

> "Half of what came out of the workshop is not an AI problem; it is a rules, data or workflow problem. We should fix those first because they also make the AI cases cheaper."

Use when presenting the parking lot of non-AI improvements.

> "A use case without a baseline is a hypothesis. We cannot score it, cost it or defend it, so it goes back to discovery."

Use when cleaning the long list in front of the sponsor.

> "Four of these twelve act on the same two stages. That is a reshape of the stage, not four pilots, and we should assess it as a bundle."

Use when clustering reveals concentration.

## 7. Common mistakes juniors make

- **Decomposing from documentation.** The documented process omits chasing, re-keying and discrepancy work, which is where most of the pain sits. Walk real cases.
- **Confusing heat with fit.** Ranking use cases by pain score alone sends the team at MLRO approval and checker sign-off, which are judgement tasks with regulatory accountability.
- **Letting the workshop produce technologies.** "Use GenAI for onboarding" is not a use case. Force the "pattern plus task plus outcome" format in the room.
- **Keeping non-AI fixes in the AI list.** It inflates the AI business case and hides the cheapest wins.
- **Skipping the baseline.** Discovery without volumes, handle times and error rates produces a long list that collapses at prioritisation and again at business case.
- **Over-decomposing.** Going to L4 everywhere produces 300 steps and workshop fatigue. Decompose to L4 only where an L3 task mixes automatable and judgement work.

## 8. Interview questions with model answers

**Q1. Walk me through how you would build the use-case long list for a bank's corporate onboarding function.**

I would run discovery in four steps over three to four weeks. First, decomposition: confirm the domain boundary with the sponsor, then build an L2 and L3 task map from five to ten real cases walked end to end with operators, capturing volume, handle time, cycle time, error and rework, systems touched, decision logic and controls for each of roughly 25 tasks. Second, heatmap: score each task on volume, effort, error, delay and friction, using system data where it exists, and identify hot zones; in onboarding these are typically document chasing, ownership unwinding, discrepancy reconciliation, screening adjudication and checker review. Third, a half-day ideation workshop with the process owner, operators, compliance, an architect and a product owner, using pattern prompt cards to force each idea into "pattern plus task plus outcome" form; I would expect 50 to 80 raw ideas. Fourth, cleaning: normalise, de-duplicate, cluster by stage, strip out rules and workflow fixes into an operations backlog, and attach a baseline to every surviving use case. The output is 10 to 15 use cases on one-page canvases, each with a sponsor and a baseline, ready for scoring. I would also hand the sponsor the non-AI fixes separately, because they are often the fastest value and they make the AI cases cheaper.

**Q2. Why should you separate pain-point heat from AI fit, and what happens if you do not?**

Heat measures where effort, error and delay concentrate; fit measures whether an AI pattern can take on the task given its variability, the judgement involved, the data available, the system access needed and the tolerance for error. The two are correlated only loosely. High-heat, low-fit tasks in onboarding include MLRO approval and checker sign-off: they are slow and effortful precisely because they carry regulatory accountability that cannot be delegated to a model under current supervisory expectations. Low-heat, high-fit tasks include registry lookups and tax classification. If you collapse the two, you prioritise the hottest tasks, propose automating judgement that regulators expect humans to exercise, and stall in model risk review. If you keep them separate, you can target high-fit tasks adjacent to the hot zones, for example drafting the EDD narrative so the MLRO reviews faster rather than trying to automate the approval itself. That is also the honest way to present the roadmap to a second-line function.

**Q3. A client's innovation team hands you a list of 40 GenAI use cases from vendor sessions. How do you treat it?**

I would treat it as raw input, not as a long list. Vendor-sourced ideas describe features, so the first pass is to rewrite each as pattern plus task plus outcome and discard those that do not map to a task in the client's process. Second, I would check for baselines: a vendor list never has the client's volumes, handle times or error rates, so most items will be unscoreable until we attach data from a value-chain walk. Third, I would test coverage against a heatmap: vendor lists cluster around generic productivity tools and under-represent the domain-specific hot zones where the measurable value sits. In my experience fewer than a third of such items survive into a clean long list, and the ones that do are usually the generic copilots [ILLUSTRATIVE — composite]. I would say this to the innovation team constructively: the list is useful as a catalogue of what is technically available, and we will test it against where the bank's pain actually is.

## 9. Self-check quiz

1. Explain why L3 is the right level for assessing AI fit and L2 the right level for building a business case. Give one onboarding example of each.
2. List the five standard heatmap dimensions and state which one you would weight most heavily for a client whose ambition is cycle-time reduction, and why.
3. From the Northgate heatmap, tasks 2.2 (chasing) and 6.1 (checker review) both score 18 or above. Which has the higher AI fit at a high autonomy level, and what is the single most important reason?
4. Rewrite "use GenAI to speed up KYC" as a properly normalised use case in "pattern plus task plus outcome" form, and name the baseline data you would attach.
5. Calculation: UC6 (screening hit adjudication) has 48,000 hits a year at 9 minutes each, with 94 percent false positives. If a copilot cuts handle time on false positives to 3 minutes and leaves true positives unchanged, how many analyst hours a year are saved, and how many FTE is that at 1,600 productive hours per FTE?
