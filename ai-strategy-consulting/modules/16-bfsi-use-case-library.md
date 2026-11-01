# Module 16 — BFSI Use-case Library

## 1. Why a client cares

A bank executive does not want a lecture on agents. They want to know which of their processes AI can change, by how much, with what risk, and what others are doing. This library gives you a consistent answer for the eleven processes that dominate AI conversations in banking and payments. Each entry is structured so that you can speak to the process, the right AI pattern, the value lever, the KPIs and the risks in two minutes, and then go deeper if asked.

## 2. Concept and mechanism

### 2.1 How to read each entry

Every use case below has the same structure: a process summary; the AI pattern (rules, classical ML, GenAI, agentic, and which agent pattern from Module 3); the dominant value lever (cost, revenue, risk, customer experience); three or four KPIs with illustrative baseline-to-target ranges; key risks and the controls that address them; data needs; and a market maturity note for 2025–26. All baseline-to-target figures are `[ILLUSTRATIVE — composite ranges from practitioner experience, not from any single client]` unless labelled otherwise, and maturity notes are `[VERIFY — date-sensitive]`.

### 2.2 The recurring pattern across the library

Across all eleven processes the same decomposition appears. Each process contains four kinds of work:

- **Deterministic rule application** (eligibility, thresholds, reason-code logic): rules engine; do not use an LLM.
- **Pattern recognition on structured data** (fraud scores, risk ratings, propensity): classical ML, with explainability requirements.
- **Unstructured information handling** (reading documents, emails, chat transcripts, drafting narratives): GenAI, usually RAG-grounded.
- **Multi-step orchestration across systems with judgement at branches** (gather, check, decide, act, escalate): agentic, almost always with human-in-the-loop gates at the decision step in a regulated process.

The consulting skill is to decompose a process to the task level (Module 6), assign each task to the right kind of work, and only then decide whether an agent is the right container for the whole thing. Most "agentic" use cases in banking in 2025–26 are in fact agentic orchestration around a core of rules and classical models, with GenAI handling the unstructured steps `[ESTIMATE — practitioner observation]`.

### 2.3 Library

### KYC and KYB (onboarding and periodic refresh)

| Dimension | Summary |
|---|---|
| Process | Collect identity and ownership documents, verify, screen parties, assess risk, rate, approve; refresh periodically by risk tier |
| AI pattern | Agentic orchestration (supervisor-led): document extraction (GenAI), screening-hit analysis (GenAI + rules), beneficial-ownership graph resolution (ML + rules), risk rating (rules + ML), human approval at rating and exceptions |
| Value lever | Cost (analyst effort), revenue (time-to-revenue for corporate clients), risk (consistency, audit trail) |
| KPIs | Cycle time to onboard corporate: 25 to 40 days to 8 to 15; analyst hours per file: 6 to 10 to 2 to 4; first-time-right documentation: 45% to 80%; outreach touches per customer: 4 to 1.5 |
| Risks and controls | Mis-extraction of ownership (dual extraction and reconciliation); false clearing of screening hits (human review of all hits above threshold); regulatory expectation of analyst judgement (HITL at rating; full audit log); data-protection (residency, redaction) |
| Data needs | Document store, registry APIs, screening lists, CRM, case history for golden data |
| Maturity 2025–26 | Document extraction and outreach automation widely deployed; end-to-end agentic refresh in pilot to early production at large banks; regulators accepting with HITL at decision `[VERIFY]` |

KYB is the strongest agentic candidate in the library because it is high volume, document heavy, system fragmented and judgement is concentrated at a few identifiable points. The design decision that matters most is the autonomy level by risk tier: low-risk refresh can be near-straight-through with sampling review, high-risk and complex ownership structures need full human adjudication. The economics are driven as much by time-to-revenue for corporate clients as by analyst cost, which is why the business sponsor should be the corporate bank, not operations.

### AML transaction monitoring

| Dimension | Summary |
|---|---|
| Process | Rules and models generate alerts on transactions; analysts triage (level 1), investigate (level 2), file suspicious activity reports (SARs) |
| AI pattern | Classical ML for alert scoring and false-positive reduction; GenAI for investigation narrative drafting and evidence summarisation; agentic for evidence gathering across systems; rules remain the regulatory anchor |
| Value lever | Cost (alert review), risk (detection quality, consistency), regulatory standing |
| KPIs | False-positive rate: 90 to 95% to 60 to 75%; level-1 handle time: 25 to 40 minutes to 10 to 15; SAR narrative drafting time: 2 to 3 hours to 30 to 45 minutes; SAR quality score (regulator or QA): up 10 to 20 points |
| Risks and controls | Missed suspicious activity when alerts are suppressed (back-testing, below-the-line sampling, champion-challenger); narrative hallucination (grounding to evidence with citations, mandatory analyst sign-off); model governance (AML models are Tier 1 almost everywhere) |
| Data needs | Transactions, customer profiles, alert and case history with dispositions, SAR library, external data |
| Maturity 2025–26 | Alert scoring is mature at large banks; narrative drafting in production at several; agentic evidence gathering in pilot `[VERIFY]` |

The HSBC and Google Cloud AML AI work `[PUBLIC — Google Cloud, June 2023; VERIFY]` reported 2 to 4 times more suspicious activity identified with around 60% fewer alerts, which is the clearest public benchmark for ML-based alert scoring. The consulting caution is that regulators scrutinise alert suppression closely; any reduction in alert volume needs below-the-line testing evidence. GenAI's safest high-value role is narrative drafting from an evidence pack the analyst has approved.

### Sanctions screening

| Dimension | Summary |
|---|---|
| Process | Screen customers and payments against sanctions lists; resolve name-match hits (mostly false positives); escalate true matches; block or release payments |
| AI pattern | Rules and fuzzy matching remain the screening core; ML for hit scoring; GenAI for hit-resolution reasoning (comparing identifiers, context in payment messages, adverse media); agentic for gathering evidence; human decision on any non-trivial hit |
| Value lever | Cost (hit review), customer experience (payment delay), risk (consistency of resolution) |
| KPIs | False-positive hits per 1,000 screened: 20 to 50 to 8 to 20; average resolution time per hit: 8 to 15 minutes to 3 to 6; payments delayed beyond SLA: down 50 to 70%; level-1 to level-2 escalation accuracy: up 10 to 15 points |
| Risks and controls | False negative on a true match (never auto-release above a conservative threshold; full logging; periodic blind testing); regulator expectation that the screening engine itself is deterministic and tuned, so AI sits in resolution not in screening |
| Data needs | Screening hits with dispositions, payment messages (ISO 20022 structured fields help materially), customer data, list data |
| Maturity 2025–26 | Hit-scoring ML is common; GenAI-assisted resolution in production at several large banks and in vendor products; fully autonomous release of hits is rare and conservative `[VERIFY]` |

ISO 20022 is relevant here: structured name and address fields reduce false positives and make GenAI resolution more reliable than parsing free-text MT messages, which is a point a payments specialist can make credibly. The risk asymmetry is extreme: a missed true match is a regulatory breach with fines; a slow false positive is a cost. That asymmetry dictates the autonomy level.

### Disputes and chargebacks

| Dimension | Summary |
|---|---|
| Process | Cardholder raises dispute; issuer classifies reason code, gathers evidence, decides liability, raises chargeback or provisional credit, handles merchant representment, arbitration |
| AI pattern | Agentic orchestration: intake classification (GenAI), evidence gathering from transaction and merchant systems (tools), scheme-rule application (rules engine), draft adjudication with rationale (GenAI), human approval by risk class; straight-through for low-value, low-risk classes |
| Value lever | Cost (analyst effort), revenue (recovery rate), customer experience (cycle time), risk (scheme compliance deadlines) |
| KPIs | Cost per dispute: GBP 25 to 40 to GBP 15 to 22; cycle time to provisional decision: 5 to 10 days to 1 to 3; straight-through rate: 0 to 10% to 30 to 50%; recovery rate on merchant-liable cases: up 4 to 8 points; scheme deadline breaches: down 60 to 80% |
| Risks and controls | Wrong liability decision (HITL by class, override accuracy monitoring); scheme-rule changes (rules engine owned by scheme experts, not embedded in prompts); fairness to vulnerable customers (conduct review of auto-decisions) |
| Data needs | Dispute case history with outcomes, transaction data, merchant data, scheme rulebooks, customer communications |
| Maturity 2025–26 | Among the most advanced agentic use cases in issuers and processors; several vendors offer agentic dispute products; straight-through adjudication of low-risk classes in production `[VERIFY]` |

Disputes are an ideal teaching case because they contain all four kinds of work and have a natural straight-through boundary defined by value and reason code. The scheme rules must live in a rules engine with a scheme-expert owner; an LLM reasoning over a rulebook PDF is a design error that will fail on the next rule update. Recovery-rate improvement is often worth more than cost reduction.

### Fraud detection and prevention

| Dimension | Summary |
|---|---|
| Process | Real-time scoring of transactions and account events; rules and models decide to approve, step-up, decline or refer; investigation of referred cases; customer contact |
| AI pattern | Classical and deep-learning models for real-time scoring (latency-bound, milliseconds); GenAI for investigation summaries, customer contact drafting and analyst assistance; agentic for investigation case assembly; rules for hard controls and regulatory limits |
| Value lever | Risk (fraud losses), customer experience (false declines), cost (investigation) |
| KPIs | Fraud loss basis points: down 10 to 25%; false-decline rate: down 15 to 30%; investigation handle time: down 30 to 50%; model refresh cycle: quarterly to monthly |
| Risks and controls | Adversarial adaptation (continuous monitoring, rapid retraining); bias in declines (fairness testing); explainability for customer disputes of declines; latency constraints exclude LLMs from the real-time path |
| Data needs | Transaction streams, device and behavioural data, confirmed fraud labels, customer contact outcomes |
| Maturity 2025–26 | Real-time ML scoring is mature; GenAI in investigations is emerging; Mastercard reported generative AI improving fraud detection rates by an average of around 20% and up to 300% in some cases in its Decision Intelligence Pro `[PUBLIC — Mastercard, Feb 2024; VERIFY]` |

The important consulting point is that GenAI is not the scoring engine. Real-time authorisation decisions happen in tens of milliseconds and need deterministic, explainable, monitored models. GenAI's role is in the investigation and customer-contact layers and in feature discovery. Mastercard's use of generative techniques is at the network level on transaction patterns, which is a different mechanism from LLM reasoning.

### Credit underwriting (SME and corporate)

| Dimension | Summary |
|---|---|
| Process | Collect financials and documents, spread financial statements, analyse, apply policy, draft credit memo, committee decision, covenant setting |
| AI pattern | GenAI for document extraction and financial spreading, memo drafting from structured analysis; classical ML for probability of default and early-warning signals; rules for policy; agentic orchestration of the pack assembly; human credit officer decides |
| Value lever | Cost (analyst time), revenue (time-to-decision, win rate), risk (consistency, early warning) |
| KPIs | Time to decision for SME: 10 to 20 days to 3 to 7; analyst hours per credit memo: 12 to 20 to 5 to 8; spreading accuracy vs manual: 95%+ with exception flagging; early-warning lead time: up 30 to 90 days |
| Risks and controls | Regulatory classification (EU AI Act Annex III treats creditworthiness assessment of natural persons as high-risk; corporate credit is outside that annex but still model-risk governed `[PUBLIC — Regulation (EU) 2024/1689; VERIFY]`); explainability of decisions; bias; memo hallucination (grounding, officer sign-off); model risk tiering under SS1/23 or SR 11-7 |
| Data needs | Financial statements, bank statements, bureau data, internal ratings history with outcomes, policy documents, memo library |
| Maturity 2025–26 | Spreading and memo drafting in production at several banks; agentic pack assembly in pilot; autonomous credit decisions for natural persons are constrained by regulation `[VERIFY]` |

Underwriting is where the regulatory overlay is heaviest, and it is where a consultant should distinguish between the decision (which stays with a credit officer or a validated scoring model) and the preparation (which is where GenAI and agents deliver most of the time saving). Your own experience in as-is mapping of underwriting via SME interviews is directly relevant: the pain points are typically in document chasing, spreading and memo assembly, not in the decision itself.

### Collections and recoveries

| Dimension | Summary |
|---|---|
| Process | Identify delinquent accounts, segment, choose contact strategy and channel, negotiate arrangements, manage promises to pay, escalate to recoveries |
| AI pattern | Classical ML for propensity to pay, roll rates and treatment optimisation; GenAI for conversational agents and agent-assist in negotiation; agentic for arrangement setup within policy; rules for regulatory treatment of vulnerable customers |
| Value lever | Risk (loss rate, roll rate), cost (contact cost), customer experience and conduct (fair treatment) |
| KPIs | Roll rate from early to late delinquency: down 5 to 15% relative; cost to collect: down 20 to 35%; promise-to-pay kept rate: up 5 to 10 points; vulnerable-customer identification rate: up materially with conduct review |
| Risks and controls | Conduct risk and fairness (UK FCA Consumer Duty `[PUBLIC — FCA, 2023; VERIFY]`, vulnerable-customer rules); over-contact; bias in treatment; conversational agent making commitments outside policy (hard policy limits in tools, HITL for arrangements above thresholds) |
| Data needs | Account and payment history, contact history and outcomes, customer circumstances, complaint data |
| Maturity 2025–26 | ML segmentation mature; conversational GenAI in early production for digital collections; agentic arrangement setup in pilot with tight policy bounds `[VERIFY]` |

Collections is a Tier 1 conduct area. The value is real but the controls must be designed first: a collections agent that offers an arrangement outside policy or fails to identify vulnerability is a conduct breach, not a bug. The strongest positioning with a client is "better outcomes for customers in difficulty and lower losses", not "fewer collectors".

### Customer servicing (contact centre and digital)

| Dimension | Summary |
|---|---|
| Process | Handle customer queries and requests across voice, chat, email and app; authenticate, resolve, escalate; after-call work |
| AI pattern | GenAI virtual assistants for digital self-service (RAG over procedures and account data via tools); agent-assist for human agents (real-time knowledge, summarisation, next-best-action); agentic for executing service requests (address change, card replacement) with authentication gates; classical ML for intent routing and churn |
| Value lever | Cost (contact deflection, handle time, after-call work), customer experience (resolution, availability), revenue (next-best-offer) |
| KPIs | Containment or deflection rate: 20 to 30% to 45 to 60%; average handle time: down 15 to 25%; after-call work: down 50 to 70%; first-contact resolution: up 5 to 10 points; CSAT: flat to up |
| Risks and controls | Incorrect information with liability (Air Canada tribunal, Feb 2024 `[PUBLIC]`); grounding and refusal design; authentication before any account action; conduct and vulnerability; brand risk from tone |
| Data needs | Knowledge base and procedures (curated), transcripts with outcomes, account data via secure APIs |
| Maturity 2025–26 | Most mature GenAI domain in banking; Bank of America's Erica (since 2018) reported more than 2bn interactions `[PUBLIC — BofA, 2024; VERIFY]`; Wells Fargo's Fargo reported around 245m interactions in 2024 `[PUBLIC; VERIFY]`; agentic execution of service requests spreading `[VERIFY]` |

Servicing is where most banks started, and where the public cautionary tales sit: Air Canada was held liable for its chatbot's incorrect statement, and Klarna's 2025 recalibration showed the cost of over-weighting deflection against quality. The consulting advice is to measure containment together with resolution quality and complaint rates, and to keep account actions behind authentication and policy gates.

### Payments operations (exceptions, investigations, ISO 20022)

| Dimension | Summary |
|---|---|
| Process | Handle payment exceptions and repairs, investigations (recalls, beneficiary claims non-receipt, returns), ISO 20022 message handling, nostro breaks, SLA management across correspondents |
| AI pattern | Rules for STP repairs where deterministic; ML for repair prediction and routing; GenAI for reading unstructured investigation messages (camt.027/camt.029, gpi, email), drafting responses, and summarising case history; agentic for end-to-end investigation case handling with tool access to payment systems and correspondent channels |
| Value lever | Cost (operations effort), customer experience (resolution time), risk (regulatory deadlines, liability), liquidity (faster release of funds) |
| KPIs | Investigation cycle time: 3 to 7 days to under 1 to 2; manual repairs per 10,000 payments: down 30 to 60%; cases handled per operations FTE: up 2 to 3 times; correspondent SLA breaches: down 50%+ |
| Risks and controls | Wrong-beneficiary release (never auto-execute fund movements without a second control); message standard changes (rules engine for format logic); correspondent data quality |
| Data needs | Payment messages (structured ISO 20022 fields are a major enabler), investigation case history, correspondent SLAs, nostro data |
| Maturity 2025–26 | Rule-based STP mature; GenAI-assisted investigations in production at some banks and in Swift and vendor offerings; agentic end-to-end investigations in pilot `[VERIFY]` |

This is the domain where your payments depth is a differentiator. Points to make: ISO 20022 structured data (structured addresses, LEIs, purpose codes, UETR) makes investigation automation materially easier than MT; investigations are a natural agentic use case because they are multi-step, cross-system and message-driven; fund movements must stay behind deterministic controls. Swift's own AI pilots on anomaly detection and investigations `[PUBLIC — Swift announcements, 2024–2025; VERIFY]` are worth knowing.

### Reconciliation (cash, nostro, ledger, securities)

| Dimension | Summary |
|---|---|
| Process | Match transactions between systems or counterparties; investigate and resolve breaks; post adjustments; report ageing |
| AI pattern | Rules for deterministic matching; ML for probabilistic matching of residual breaks and break classification; GenAI for interpreting unstructured break commentary and drafting resolutions; agentic for investigating breaks across systems and proposing (not posting) adjustments |
| Value lever | Cost (break investigation), risk (unreconciled exposure, financial reporting), control quality |
| KPIs | Auto-match rate: 85 to 92% to 96 to 98%; breaks older than 30 days: down 50 to 70%; investigator hours per break: down 40 to 60%; adjustment error rate: flat or down |
| Risks and controls | Incorrect auto-match (confidence thresholds, sampling); posting of adjustments must remain human-approved with maker-checker; audit trail for financial controls |
| Data needs | Transaction feeds from both sides, historical breaks with resolutions, reference data |
| Maturity 2025–26 | ML matching is mature in vendor reconciliation platforms; GenAI break interpretation emerging; agentic break investigation in pilot `[VERIFY]` |

Reconciliation is a control process, so the standard for change is high and the sponsor is usually the CFO or Head of Operations Control. The value case is often strongest on risk (unreconciled exposure, audit findings) rather than cost. Keep adjustment posting human-approved with maker-checker regardless of agent confidence.

### Code modernisation and software engineering

| Dimension | Summary |
|---|---|
| Process | Understand legacy systems (COBOL, PL/I, older Java), document, refactor or migrate, test, maintain; general software delivery |
| AI pattern | GenAI coding assistants (completion, explanation, test generation); agentic coding agents for multi-file changes, migration tasks and test suites; RAG over code and documentation; classical ML rarely |
| Value lever | Cost (engineering productivity), risk (legacy knowledge loss, resilience), speed (time to market) |
| KPIs | Developer productivity on measured tasks: up 15 to 40% (highly variable by task and seniority); legacy documentation coverage: up materially; test coverage: up 10 to 30 points; migration effort: down 20 to 40% |
| Risks and controls | Security vulnerabilities in generated code (SAST, review); licence contamination; over-reliance reducing understanding; correctness of migrated business logic (equivalence testing); IP and data leakage to model providers |
| Data needs | Source code, documentation, test suites, defect history |
| Maturity 2025–26 | Coding assistants widely deployed in banks (Goldman Sachs, JPMorgan, Citi have described large rollouts `[PUBLIC — 2024–2025; VERIFY]`); agentic coding in pilot at several, including Goldman Sachs' pilot of Cognition's Devin `[PUBLIC — July 2025; VERIFY]`; mainframe modernisation with GenAI offered by hyperscalers `[VERIFY]` |

The productivity numbers quoted in the market vary widely and are often vendor-sourced; present them as ranges and insist on measured internal baselines. For a bank, the strategic value is as much in legacy knowledge recovery and resilience as in productivity. Governance points: security scanning, code review, and clarity on whether code goes to an external model.

## 3. Frameworks

### 3.1 The four-kinds-of-work decomposition (attribution: practitioner synthesis; consistent with the rules, ML, GenAI and agentic taxonomy in Module 1)

Steps: (1) decompose the process to task level (Module 6); (2) classify each task as deterministic rule application, structured-data pattern recognition, unstructured information handling, or multi-step orchestration with judgement; (3) assign the AI pattern per class; (4) decide whether an agent container adds value over a workflow engine (it does when branches require judgement over unstructured inputs and tool selection varies by case); (5) place HITL gates at decisions with regulatory or financial consequence.

### 3.2 Use-case card standard (attribution: generic; the card structure used here)

Process; AI pattern; value lever; KPIs with baseline and target; risks and controls; data needs; maturity. Use the card as the unit of the use-case library and as the input to the Module 7 scoring matrix. A card without baseline-to-target KPIs and without named controls is not ready for prioritisation.

### 3.3 Risk-asymmetry test for autonomy (attribution: practitioner heuristic)

For each decision point ask: what is the cost of a false positive versus a false negative, and is the action reversible? Sanctions release (irreversible, catastrophic false negative) and fund movements (irreversible) get no autonomy; low-value dispute credits (reversible, bounded) get high autonomy; everything else gets sampled or threshold-based review. This test produces the autonomy level by decision class in a form a regulator will recognise.

### 3.4 McKinsey Global Institute value estimate (June 2023) [PUBLIC — MGI, 2023]

MGI estimated generative AI could add USD 200 to 340bn a year to banking, largely through productivity in customer operations, marketing and sales, software engineering and risk and legal. Use it as context for ambition setting, with the caveat that it is a top-down potential estimate, not a benchmark for a single bank's business case.

## 4. Worked BFSI example

`[ILLUSTRATIVE — composite]` Harbourline Bank, a mid-sized universal bank, asks which of three use cases to fund first: KYB onboarding and refresh, sanctions hit resolution, and card disputes. Figures are annual, GBP, `[ESTIMATE — assumption]`.

### 4.1 Value estimate

| Driver | KYB | Sanctions resolution | Card disputes |
|---|---|---|---|
| Volume per year | 60,000 files | 1.2m hits | 300,000 disputes |
| Current unit cost (fully loaded) | GBP 180 per file | GBP 9 per hit | GBP 31 per dispute |
| Current annual cost | GBP 10.8m | GBP 10.8m | GBP 9.3m |
| Effort reduction (steady state) | 50% | 45% | 40% |
| Cost benefit (capacity released) | GBP 5.4m | GBP 4.9m | GBP 3.7m |
| Non-cost benefit | Time-to-revenue: 2,000 corporate onboardings a year, 15 days faster, GBP 400 revenue per client per day of earlier activation = GBP 12.0m revenue pull-forward, of which GBP 2.4m is incremental annual revenue `[ESTIMATE]` | SLA breach reduction and customer retention: GBP 0.6m | Recovery rate up 6 points on 55% merchant-liable at GBP 140 average = 300,000 x 0.55 x 0.06 x 140 = GBP 1.4m |
| Risk benefit (qualitative) | Audit consistency, fewer regulatory findings | Consistency of resolution; faster true-match escalation | Scheme deadline compliance |
| Total quantified annual benefit at steady state | GBP 7.8m | GBP 5.5m | GBP 5.1m |

Check on KYB cost: 60,000 x 180 = GBP 10.8m; 50% = GBP 5.4m. Check on disputes: 300,000 x 31 = GBP 9.3m; 40% = GBP 3.72m.

### 4.2 Feasibility and risk scores (1 low to 5 high, feasibility higher is better)

| Dimension (weight) | KYB | Sanctions resolution | Card disputes |
|---|---|---|---|
| Data readiness (25%) | 3 (documents unstructured, registry APIs available) | 4 (hit data structured, dispositions logged) | 4 (case history complete, scheme data structured) |
| Integration complexity (20%) | 2 (6 systems, legacy CRM) | 4 (single screening platform) | 3 (card platform plus case management) |
| Model maturity for the pattern (20%) | 4 (extraction and orchestration proven) | 4 (resolution reasoning proven in vendor tools) | 5 (agentic disputes products in market) |
| Regulatory exposure, inverted (20%) | 3 (HITL at rating accepted) | 2 (false-negative asymmetry; conservative autonomy) | 4 (bounded financial exposure, conduct review needed) |
| Change effort, inverted (15%) | 2 (corporate bank, ops, compliance all affected) | 4 (one team) | 3 (one operations centre) |
| Weighted feasibility | 2.85 | 3.60 | 3.85 |

Arithmetic for KYB: 3 x 0.25 + 2 x 0.20 + 4 x 0.20 + 3 x 0.20 + 2 x 0.15 = 0.75 + 0.40 + 0.80 + 0.60 + 0.30 = 2.85. Sanctions: 1.00 + 0.80 + 0.80 + 0.40 + 0.60 = 3.60. Disputes: 1.00 + 0.60 + 1.00 + 0.80 + 0.45 = 3.85.

### 4.3 Placement and recommendation

| Use case | Annual benefit (GBP m) | Feasibility | Indicative build and 3-year run cost (GBP m) | 3-year net benefit at 40/80/100% ramp (GBP m) | Placement |
|---|---|---|---|---|---|
| KYB | 7.8 | 2.85 | 9.5 | 17.2 - 9.5 = 7.7 | High value, lower feasibility: foundational wave 2 |
| Sanctions resolution | 5.5 | 3.60 | 4.0 | 12.1 - 4.0 = 8.1 | Medium value, high feasibility: wave 1 |
| Card disputes | 5.1 | 3.85 | 4.5 | 11.2 - 4.5 = 6.7 | Medium value, highest feasibility: wave 1 |

Ramp arithmetic for KYB: 7.8 x (0.4 + 0.8 + 1.0) = 7.8 x 2.2 = GBP 17.2m. Sanctions: 5.5 x 2.2 = 12.1. Disputes: 5.1 x 2.2 = 11.2.

Recommendation: fund disputes and sanctions resolution in wave 1 as the two quick-to-prove agentic deployments that also build the platform components (orchestration, HITL queue, eval harness) KYB will need; start KYB data and integration foundations in parallel and move it to build in wave 2. KYB has the largest prize but its feasibility score says the first year would be spent on integration; sequencing it second is what makes its benefit achievable.

So what for the client: the biggest number is not the first thing to build; the first wave is chosen to prove the pattern and build the platform, so that the biggest number lands in year 2 with lower risk.

## 5. Real-world case

**HSBC AML with Google Cloud** `[PUBLIC — Google Cloud announcement, June 2023; VERIFY]`. Google Cloud reported that its AML AI product, developed with HSBC, identified 2 to 4 times more suspicious activity while reducing alert volumes by around 60% compared with the rules-based approach. This is the clearest public benchmark for the AML entry above and shows the shape of the value case: better detection and fewer alerts at the same time, which is only credible with rigorous back-testing evidence for the regulator.

**Bank of America Erica** `[PUBLIC — Bank of America, 2024; VERIFY]`. Launched in 2018, Erica surpassed 2bn client interactions and is often cited as the most-used virtual assistant in banking. The relevant lessons are that it started with narrow, well-understood servicing intents on structured account data, scaled through years of intent tuning rather than a single model, and that the bank publicly reports usage metrics, which has supported continued investment.

**JPMorgan COiN and LLM Suite** `[PUBLIC — 2017 and 2024; VERIFY figures]`. COiN (Contract Intelligence, 2017) used ML to review commercial loan agreements and was reported to save large volumes of lawyer and loan-officer hours, an early example of the document-handling pattern. LLM Suite's 2024 rollout to around 200,000 employees shows the servicing and knowledge-work patterns scaled through a central platform.

## 6. Consultant language

> "Let us decompose this to the task level and assign each task to rules, models, GenAI or an agent; most of the value is in getting that split right."

Use at the start of any use-case conversation to signal method over enthusiasm.

> "The autonomy level follows the risk asymmetry at each decision: irreversible and asymmetric means human; bounded and reversible means straight-through."

Use when the client asks how much the agent will decide on its own.

> "Scheme rules and policy live in a rules engine with a named owner, not in a prompt."

Use in disputes, sanctions, collections and payments operations conversations.

> "Recovery rate and time-to-revenue are usually worth more than the analyst saving; let us make sure the business, not operations, sponsors this."

Use when the business case is being built as a pure cost case.

> "ISO 20022 structured data is the enabler here; investigation automation on MT free text would have been a research project."

Use in payments operations, where your expertise is the differentiator.

## 7. Common mistakes juniors make

- **Pitching GenAI as the fraud or screening engine.** Real-time scoring and list screening are deterministic or classical ML by regulatory expectation and latency; GenAI sits in resolution and investigation.
- **Embedding scheme rules or credit policy in prompts.** They change, they need an owner, and an LLM is not an auditable rules engine.
- **Quoting vendor productivity figures as benchmarks.** Present ranges, label them, and insist on measured baselines.
- **Building the KYB business case on analyst cost only.** Time-to-revenue and first-time-right documentation are often the larger levers.
- **Ignoring EU AI Act Annex III** for anything touching creditworthiness of natural persons.
- **Treating all eleven use cases as "agentic".** Most are agentic orchestration around rules and models with GenAI on the unstructured steps; say so.
- **Forgetting conduct risk in collections and servicing.** Consumer Duty and vulnerability rules make these Tier 1 conduct areas regardless of model tier.

## 8. Interview questions with model answers

### Q1. Walk me through how you would apply AI to sanctions screening, and where you would and would not use an LLM.

Model answer: I would separate screening from resolution. Screening itself, matching names and identifiers against lists, stays a deterministic, tuned fuzzy-matching engine because regulators expect it to be explainable and testable, and because recall on true matches is non-negotiable. The problem is the hit volume: typically 95% or more of hits are false positives. Classical ML can score hits to prioritise and route them, which is well established. GenAI's role is in resolution: reading the payment message and customer context, comparing identifiers, pulling adverse media, and drafting a reasoned disposition for an analyst, and an agent can orchestrate that evidence gathering across systems. ISO 20022 structured fields make this much more reliable than parsing MT free text. The autonomy decision follows the risk asymmetry: a missed true match is a regulatory breach, a slow false positive is a cost, so I would allow automated release only for hits below a conservative score threshold with blind sampling, and route everything else to a human with the agent's draft. The KPIs I would set are false positives per thousand screened, resolution time per hit, payments delayed beyond SLA, and escalation accuracy, with a quality KPI from periodic blind testing. The illustrative benefit for a bank with over a million hits a year is a 40 to 50% reduction in resolution effort, plus customer and liquidity benefits from faster release.

### Q2. A COO wants to start with KYB because it has the biggest prize. What do you say?

Model answer: I would agree that KYB is usually the largest prize in operations, and then show why it should probably not be the first build. KYB scores high on value because it combines analyst effort, time-to-revenue for corporate clients and audit consistency, but it scores low on feasibility: it typically spans six or more systems, documents are unstructured, registry data quality varies, and it affects the corporate bank, operations and compliance simultaneously. In a scored comparison it often lands as high value with the lowest feasibility of the candidate set. My recommendation would be to start wave one with one or two use cases that prove the agentic pattern quickly and build the platform components KYB needs, for example disputes and sanctions hit resolution, while running KYB's data and integration foundations in parallel so that it moves to build in wave two. That way the largest benefit lands in year two with lower delivery risk, rather than the first year being consumed by integration. I would also reframe the sponsor: KYB's biggest lever is time-to-revenue, so the corporate bank should own it with operations, which changes the business-case conversation from cost to growth.

### Q3. Where is agentic AI genuinely the right pattern in banking operations, and where is it over-sold?

Model answer: Agentic AI is the right container when a process has multiple steps across systems, the path through the steps varies by case, the inputs include unstructured information, and there are identifiable decision points where a human can be placed. Disputes, KYB refresh, payments investigations, AML evidence gathering and credit-pack assembly all fit that description. In each, the agent orchestrates tools, handles the unstructured steps with GenAI, applies rules through a rules engine, and hands decisions with regulatory or financial consequence to a human or a validated model. It is over-sold when it is proposed as the decision engine itself in real-time fraud or sanctions screening, where latency and determinism rule it out; when it replaces a rules engine for scheme rules or policy; and when a single well-grounded LLM call or a workflow engine would do the job with less risk and cost. In practice most agentic use cases in banking today are agentic orchestration around a core of rules and classical models. The consulting value is in making that decomposition explicit and in setting autonomy by risk asymmetry at each decision point, which is also what regulators are asking for.

## 9. Self-check quiz

1. For each of the following, name the right AI pattern and one reason: real-time card authorisation fraud scoring; drafting an AML SAR narrative; applying card-scheme chargeback time limits; investigating a cross-border payment non-receipt claim.
2. A bank has 1.5m sanctions hits a year at GBP 8 per hit. If GenAI-assisted resolution reduces effort by 45% and run cost is GBP 0.60 per hit, what is the net annual benefit? Show the arithmetic.
3. Which use case in the library is most directly affected by EU AI Act Annex III, and what distinction limits that effect?
4. State the risk-asymmetry test for autonomy and apply it to two decision points: releasing a payment after a sanctions hit, and issuing a provisional credit on a GBP 20 dispute.
5. Why does ISO 20022 adoption increase the feasibility of AI in sanctions resolution and payments investigations?
