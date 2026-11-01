# Module 15 — AI in Managed Services: AI-led Delivery, the Labour-model Shift and Outcome-based Pricing

## 1. Why a client cares

Banks outsource large volumes of KYC refresh, AML alert review, disputes processing, payments investigations and reconciliations to managed-service providers on contracts priced per FTE or per transaction. Agentic AI removes a large share of the labour inside those contracts. The client's questions are direct: should my provider's price fall, by how much, who owns the AI, who carries the risk when it is wrong, and should I insource it instead. For the consulting firm, the same shift changes its own business model, from selling people-hours to selling outcomes delivered partly by software.

## 2. Concept and mechanism

### 2.1 From labour arbitrage to automation arbitrage

The traditional managed-services model earns a margin on labour arbitrage: the provider delivers the same work from a lower-cost location with a productivity uplift from process standardisation. The unit of sale is an FTE or a transaction, and the provider's margin is the difference between the price per unit and the fully loaded labour cost per unit. Scale economics are weak because every additional unit of work needs additional labour.

Agentic automation changes the cost function. A large share of each transaction is performed by software whose marginal cost (tokens, inference infrastructure, monitoring) is a fraction of labour cost, and the remaining human work concentrates in exceptions, quality assurance and supervision. The provider's margin now comes from automation arbitrage: the gap between a price still anchored to the labour-based unit and a cost base that has partly become software. The commercial tension in every contract renegotiation in 2025–26 is who captures that gap.

### 2.2 The cost stack before and after

A KYC-refresh managed service in 2024 has a cost stack dominated by analyst labour (roughly 70 to 80% of cost), with the remainder in team leadership, quality, technology licences, facilities and management `[ESTIMATE — assumption, typical BPO structure]`. After agentic automation, four things happen to the stack:

- Analyst labour falls sharply but does not disappear; what remains is more senior and more expensive per head (exception handling, QA, supervising the agent queue).
- A new cost line appears: AI run cost (model consumption, platform, evaluation, guardrails, observability) and AI engineering to maintain the agents, prompts and integrations.
- Transition cost appears once: building and validating the agents, integrating with the client's systems, re-training the retained workforce.
- Risk cost rises: the provider now owns an accuracy liability that used to be diffused across hundreds of individual analysts' judgement.

### 2.3 AI-led delivery models

| Model | Description | Who owns the AI | Typical fit |
|---|---|---|---|
| Provider-embedded AI | Provider deploys its own agents inside its delivery; client sees a lower price or faster SLA | Provider | Commodity processes, low client data sensitivity, client has no AI platform |
| Client-platform, provider-operated | Agents run on the client's platform and models; provider supplies the human layer and process operation | Client | Regulated processes where the client wants model-risk ownership and audit trail |
| Joint build, shared IP | Co-developed agents with agreed IP and gain-share | Shared | Strategic partnerships; client wants to retain option to insource |
| AI product plus thin service layer | Vendor sells software with a small managed exception-handling team | Vendor | Narrow, well-defined tasks (document extraction, sanctions name screening) |

The ownership question drives model-risk accountability. Under UK PRA SS1/23 `[PUBLIC — PRA, 2023; VERIFY scope]` and the broader outsourcing and third-party risk rules (PRA SS2/21 on outsourcing and third-party risk management, EBA outsourcing guidelines 2019, and the EU Digital Operational Resilience Act in force from January 2025 `[PUBLIC; VERIFY]`), the regulated bank cannot outsource its accountability for a model's outcomes. If the provider's agent makes KYC risk-rating decisions, the bank needs model inventory entries, validation evidence and audit access as if it had built the agent itself.

### 2.4 The labour-model shift: pyramid flattening and agent-to-human ratios

A 400-FTE KYC-refresh operation in 2024 has a pyramid: perhaps 320 analysts, 50 senior analysts and QC, 24 team leaders, 6 managers `[ILLUSTRATIVE]`. Agentic automation removes most of the base tier's work and shifts the retained roles upward:

- The base of the pyramid shrinks; the agent does first-pass document collection, data extraction, screening-hit analysis and case assembly.
- The middle grows relatively: exception adjudicators, QA reviewers who audit agent output, and "agent supervisors" who manage the HITL queue and the escalation taxonomy.
- New roles appear: agent engineers and prompt maintainers, evaluation analysts who curate golden datasets from live cases, and a model-risk liaison to the client's second line.

A useful planning parameter is the agent-to-human ratio: the number of agent-processed cases per retained human hour. In a mature agentic KYC refresh, 55 to 70% of effort removed implies the retained human handles 2.5 to 3.5 times the case volume of the 2024 analyst `[ESTIMATE]`. This is also the parameter that makes outcome-based pricing viable, because the provider's cost per case becomes predictable once the ratio stabilises.

### 2.5 Pricing models and risk allocation

| Pricing model | Mechanism | Risk sits with | Incentive effect on provider | Fit with AI-led delivery |
|---|---|---|---|---|
| FTE-based (time and materials) | Price per named or equivalent FTE per month | Client (volume and productivity) | None to automate; automation reduces revenue | Poor; provider resists automation |
| Transaction-based | Price per case completed, with quality SLAs | Shared (provider carries productivity, client carries volume) | Strong to automate within quality floor | Good; natural first step |
| Outcome-based | Price tied to business outcomes (cycle time, backlog cleared, risk-rating accuracy, regulatory findings avoided) | Provider carries delivery and partly business risk | Strongest; provider optimises the whole process | Good when outcomes are measurable and attributable |
| Gain-share | Base fee plus share of verified savings or benefits | Shared | Strong, but disputes over baseline and attribution | Useful for transition periods |
| Subscription (platform plus service) | Fixed fee for agent platform and exception-handling capacity, tiered by volume band | Provider carries cost, client carries demand within band | Automate aggressively; manage exceptions tightly | Good for steady-state, commoditised processes |

Outcome-based pricing fails when the outcome is not under the provider's control (a backlog driven by client policy changes), when measurement is contested (no agreed baseline), or when the provider lacks the balance sheet to carry downside. Transaction-based pricing with quality SLAs is the most common landing point in 2025–26 because it rewards automation while keeping measurement simple `[ESTIMATE — practitioner observation]`.

### 2.6 "Service-as-software"

The phrase inverts software-as-a-service: instead of selling software that people use to do work, the vendor sells the work itself, performed by software with human oversight, and prices it against the labour budget it replaces rather than against a software licence budget. The framing was popularised in venture-capital essays in 2024 (Foundation Capital, Sequoia) `[PUBLIC — 2024; VERIFY exact attribution]` arguing that AI expands the addressable market for software from IT budgets to services budgets. For a bank, the practical consequence is that the procurement counterparty for a "KYC refresh agent" might be a software company pricing per case, not a BPO pricing per FTE, and the evaluation criteria have to cover both software (security, model risk, integration) and service (SLAs, exceptions, accountability).

### 2.7 Contracting for AI-delivered services

Clauses that matter and that standard BPO contracts do not contain:

- **Accuracy and quality SLAs defined at the decision level**, not only turnaround: for example, risk-rating accuracy against an agreed golden sample, false-negative rate on screening hits, and audit error rate, each with measurement method and sample size.
- **Model and prompt change notification**: material changes to models, prompts, retrieval sources or thresholds notified in advance, with re-validation evidence; client right to veto for Tier 1 processes.
- **Audit and validation access**: client second line and regulators can inspect evaluation results, logs and the HITL audit trail.
- **Data use restrictions**: client data not used to train or fine-tune provider models without consent; data residency; retention.
- **Liability and indemnity** for decision errors, with caps that reflect regulatory exposure (a missed sanctions hit is not a service credit matter).
- **Exit and portability**: ownership of golden datasets, prompts, exception taxonomies and process documentation; transition assistance; escrow of agent configurations.
- **Benefit-sharing mechanics**: how productivity gains flow to price over the term (automatic step-downs, open-book costing, or gain-share), and how a baseline is set and frozen.
- **Human oversight commitments**: minimum HITL coverage by risk tier, reviewer qualification, override logging.

### 2.8 How a client should evaluate an AI-led managed-services proposal

1. Ask for the cost stack, not just the price: what share is labour, AI run, engineering, margin. A provider unwilling to show it is pricing on automation arbitrage.
2. Ask where the agents run and who owns the model risk; map the answer to SS1/23, SR 11-7 and outsourcing rules.
3. Ask for the evaluation evidence: golden dataset size, accuracy by decision class, override rates in live operation at other clients.
4. Test the price trajectory: does the per-unit price step down as automation matures, or is the gain captured entirely by the provider?
5. Test the exit: what does the client own at the end?
6. Compare with the insource option on a 3 to 5 year TCO, including the client's own platform cost and validation effort.

### 2.9 Implications for the consulting firm's own model

Consulting firms face the same shift. Leverage models built on pyramids of analysts doing research, modelling and slide production are being compressed by GenAI; firms are responding with AI-enabled delivery (internal assistants, code generation), asset-based consulting (reusable agents, accelerators, evaluation harnesses sold alongside advice), and outcome-linked fees. Public examples include McKinsey's internal "Lilli" assistant (2023) and the large consultancies' announced AI investments and workforce restructuring `[PUBLIC — various, 2023–2025; VERIFY specific figures]`. For an AI strategy consultant the implication is personal: the defensible value is in problem structuring, judgement about risk and sequencing, and the client relationship, not in producing the first draft.

## 3. Frameworks

### 3.1 Cost-stack decomposition and automation arbitrage analysis (attribution: standard sourcing-advisory practice; no single originator)

Steps: (1) obtain or estimate the provider's current cost stack by line; (2) classify each labour line by automatability using the task-level agentic-fit dimensions from Module 7; (3) estimate the effort removed by line and the new cost lines added; (4) compute the new cost per unit and the implied margin at the current price; (5) decide the target split of the gap between client price reduction and provider margin; (6) select the pricing model that enforces the split over the term.

### 3.2 Pricing-model selection matrix (attribution: generic sourcing practice)

Choose by two axes: measurability and attributability of the outcome (low to high), and provider control over the drivers (low to high). High on both: outcome-based. High measurability, mixed control: transaction-based with SLAs. Low measurability: subscription or FTE with gain-share during transition.

### 3.3 Regulatory outsourcing overlay (PRA SS2/21, EBA Guidelines on outsourcing 2019, DORA 2025) [PUBLIC; VERIFY current status]

Apply as a checklist on top of any AI-led service: materiality assessment, due diligence on the provider's AI controls, written agreement with audit and access rights, exit plan, register of outsourcing arrangements, and for DORA, ICT third-party risk requirements including concentration risk. For AI specifically, add the model-risk requirements of SS1/23 where the provider's system meets the bank's definition of a model.

### 3.4 Service-as-software framing (Foundation Capital, Sequoia, 2024) [PUBLIC; VERIFY]

Use as a lens on the vendor landscape: for each outsourced process, ask whether a software-first entrant could sell the outcome per unit. Where yes, the incumbent BPO's price is under structural pressure and the client has negotiating leverage.

## 4. Worked BFSI example

`[ILLUSTRATIVE — composite]` A European bank outsources periodic KYC refresh of 180,000 corporate and SME customer files a year to a provider operating a 400-FTE team. The current contract is FTE-based. The provider proposes an agentic refresh platform that removes 55% of human effort and asks to move to a new pricing model. All figures are EUR, annual, `[ESTIMATE — assumption]`.

### 4.1 Current state cost stack and price

| Line | Headcount | Unit cost (EUR k) | Annual cost (EUR m) |
|---|---|---|---|
| Analysts | 320 | 38 | 12.16 |
| Senior analysts and QC | 50 | 52 | 2.60 |
| Team leaders | 24 | 65 | 1.56 |
| Managers | 6 | 110 | 0.66 |
| Technology licences, workflow, screening tools | | | 1.40 |
| Facilities, training, overhead | | | 1.90 |
| Total cost | 400 | | 20.28 |
| Price to client (FTE-based, 18% margin on cost) | | | 23.93 |
| Price per file (180,000 files) | | | 133 |

Check: 20.28 x 1.18 = 23.93; 23.93m / 180,000 = EUR 133 per file.

### 4.2 Future-state cost stack after 55% effort removal

Effort removal is not uniform. Analyst work falls 70% (document collection, extraction, screening-hit first review, case assembly are automated); senior and QC work falls 20% but shifts to auditing agent output; team leader numbers fall with span; new AI lines appear.

| Line | Headcount | Unit cost (EUR k) | Annual cost (EUR m) |
|---|---|---|---|
| Analysts (exception handling) | 96 | 42 | 4.03 |
| Senior analysts and QC (agent-output audit) | 40 | 54 | 2.16 |
| Agent supervisors (HITL queue, escalation taxonomy) | 12 | 60 | 0.72 |
| Team leaders | 10 | 65 | 0.65 |
| Managers | 4 | 110 | 0.44 |
| Agent engineers and eval analysts | 8 | 95 | 0.76 |
| AI run cost (model consumption, platform, observability) | | | 1.10 |
| Technology licences (reduced workflow seats, screening tools) | | | 1.10 |
| Facilities, training, overhead | | | 0.95 |
| Total run cost | 170 | | 11.91 |
| One-off transition (build, integrate, validate, retrain), amortised over 3 years | | | 1.20 |
| Total cost including amortised transition | | | 13.11 |

AI run cost check: 180,000 files, average 9 agent steps per file, roughly 60,000 tokens per file across steps at a blended EUR 4 per million tokens = EUR 0.24 per file in model cost, EUR 43k a year; platform, vector store, observability, evaluation runs and guardrail services add roughly EUR 1.05m, giving EUR 1.10m `[ESTIMATE — order of magnitude, VERIFY pricing]`. Model consumption is a small share; platform and people dominate, which is typical.

Headcount falls from 400 to 170 (57.5%), cost falls from EUR 20.28m to EUR 13.11m (35%). The percentage cost reduction is smaller than the effort reduction because the retained roles are more expensive and new AI lines appear. This gap is the first thing to show a client who expects a 55% price cut.

### 4.3 Three pricing-model outcomes

Assume the client requires a minimum 20% price reduction and the provider requires at least its current absolute margin (EUR 3.65m) to invest in the transition.

| Pricing model | Mechanism | Price (EUR m) | Price per file (EUR) | Client saving vs today | Provider margin (EUR m) | Provider margin % |
|---|---|---|---|---|---|---|
| A. FTE-based, re-based to 170 FTE | 170 FTE at uplifted blended rate with 18% margin on new cost | 15.47 | 86 | 35% | 2.36 | 18% |
| B. Transaction-based | EUR 100 per file with quality SLAs (risk-rating accuracy 97%, audit error below 2%) | 18.00 | 100 | 25% | 4.89 | 37% |
| C. Outcome-based with gain-share | Base EUR 16.5m plus 30% share of verified savings above a EUR 5m baseline reduction; backlog and cycle-time outcomes with penalties | 17.24 (expected) | 96 | 28% | 4.13 | 31% |

Model C arithmetic: verified savings vs today = 23.93 - 16.50 = 7.43m; above the 5m baseline = 2.43m; 30% share = 0.73m; expected price 16.50 + 0.73 = 17.23m; margin 17.23 - 13.11 = 4.12m `[ESTIMATE]`.

Interpretation:

- **Model A** gives the client the full automation gain and leaves the provider with less absolute margin than today despite investing in the platform. The provider will not accept it, and if forced, has no incentive to automate further.
- **Model B** splits the gain: the client saves 25%, the provider's margin doubles in percentage terms, and the provider is paid per file so it automates further on its own account. The client should demand a step-down schedule (for example, EUR 100 falling to EUR 88 in year 3) so the provider does not capture all subsequent gains.
- **Model C** aligns on outcomes the bank cares about (backlog, cycle time, accuracy) and shares upside, but needs an agreed, frozen baseline and a dispute mechanism. It fits a client with a strong benefits-tracking function.

### 4.4 Insource comparison

If the bank insources on its own AI platform: 170 FTE at bank cost (EUR 14.8m, higher unit costs), platform allocation EUR 1.5m, validation effort EUR 0.6m, transition EUR 4.5m one-off amortised EUR 1.5m, total EUR 18.4m a year for three years `[ESTIMATE]`, compared with EUR 18.0m under model B. Insourcing is roughly cost-neutral and gives model-risk ownership and data control, at the price of execution risk and management attention. The recommendation would depend on the bank's AI operating-model maturity (Module 13): a bank without a platform and validation function should take model B with strong audit and exit rights and revisit at year 3.

So what for the client: the headline 55% effort reduction becomes a 35% cost reduction and a 25 to 28% price reduction under the models a provider will accept; the negotiation is about the step-down schedule, audit rights and what the bank owns at exit, not about the first-year price.

## 5. Real-world case

**DBS Bank workforce announcement** `[PUBLIC — Feb 2025; VERIFY]`. DBS said it expected around 4,000 temporary and contract roles to reduce over three years as AI took over work, while permanent staff were not expected to be affected. The relevance to managed services is that contract and temporary labour, including outsourced operations, is where the first labour-model shift lands, because it carries the least transition friction.

**Klarna** `[PUBLIC — Feb 2024 and May 2025; VERIFY]`. Klarna's customer-service assistant replaced work previously done partly through outsourced agents; its 2024 announcement quantified the equivalent of around 700 FTE and USD 40m of profit improvement. Its 2025 recalibration towards human service for quality shows the limit of pure cost-based outcome measures and the importance of paired quality SLAs in any AI-led service contract.

**Industry context** `[PUBLIC — various analyst and press reports, 2024–2025; VERIFY]`. Large IT and BPO providers have publicly described shifts away from headcount-linked revenue, including statements that revenue growth is decoupling from headcount growth and announcements of outcome-based and "AI-first" service offerings. Specific figures vary by firm and period and should be checked before citing.

## 6. Consultant language

> "The price should follow the cost stack, not the headcount."

Use when the provider proposes an FTE-based re-basing or the client expects a price cut equal to the effort reduction.

> "You cannot outsource the accountability for a model's decisions; you can only outsource its operation."

Use when discussing who owns model risk in a provider-embedded AI arrangement.

> "We want a step-down schedule, not a one-time discount."

Use in pricing negotiations to capture future automation gains.

> "Quality SLAs at the decision level, with sample sizes, or the efficiency gain is not real."

Use when the provider offers only turnaround-time SLAs.

> "What do we own at exit: the golden data, the prompts, the exception taxonomy?"

Use when testing portability and lock-in.

## 7. Common mistakes juniors make

- **Equating effort reduction with cost reduction with price reduction.** Retained roles cost more per head, new AI lines appear, and the provider keeps a share; the three numbers differ materially.
- **Ignoring model-risk ownership.** A provider's agent making risk-rating decisions is a model in the bank's inventory under SS1/23 or SR 11-7, with validation and audit consequences.
- **Recommending outcome-based pricing without a measurable, attributable outcome and a frozen baseline.** It becomes a permanent dispute.
- **Forgetting the exit.** Prompts, golden datasets and exception taxonomies are the real assets; if the provider owns them the client is locked in.
- **Modelling AI run cost as mostly tokens.** Platform, evaluation, guardrails and engineering dominate; tokens are usually a small share.
- **Treating the consulting firm's own leverage model as unaffected.** Interviewers expect you to have a view on how AI changes your own firm's economics.

## 8. Interview questions with model answers

### Q1. A bank's KYC-refresh provider proposes replacing a 400-FTE contract with an "AI-led" service at a 20% lower price. How do you advise the bank?

Model answer: I would start by separating three numbers the provider has blended: the effort the AI removes, the cost reduction that implies after retained roles get more senior and AI costs are added, and the price. With 55% effort removal the cost reduction is typically closer to 35%, so a 20% price cut leaves a large share of the gain with the provider; that may be acceptable as the price of them carrying the transition, but it should be visible. I would ask for the cost stack and propose a transaction-based price per file with a step-down schedule over the term, so the client captures later gains automatically. Second, I would ask where the agents run and who owns model risk; if the provider's agent sets risk ratings, the bank's second line must have validation evidence and audit access under SS1/23 and outsourcing rules, and that needs contract terms the standard BPO template does not have. Third, I would insist on quality SLAs at the decision level with sample sizes, paired with the efficiency SLAs. Fourth, I would test exit: the bank should own the golden datasets, exception taxonomy and prompts. Finally I would run an insource comparison on a 3 to 5 year TCO; it is often close to neutral, and the decision then rests on the bank's operating-model maturity rather than price.

### Q2. When is outcome-based pricing appropriate for an AI-delivered service, and when is it not?

Model answer: It is appropriate when three conditions hold. The outcome is measurable with an agreed method and sample size, for instance risk-rating accuracy against a golden sample or backlog cleared within a cycle-time standard. The outcome is attributable to the provider, meaning the provider controls most of the drivers; a backlog driven by the client's policy changes fails this test. And the provider has the balance sheet and governance to carry downside. When those hold, outcome-based pricing aligns incentives better than any alternative because the provider optimises the whole process rather than its own unit cost. It is not appropriate when the baseline cannot be frozen, when multiple initiatives move the same outcome, or when the outcome is a risk event that is rare and lumpy, such as a regulatory finding, where penalties become uninsurable for the provider. In those cases I would use transaction-based pricing with quality SLAs and, during transition, a gain-share with a pre-agreed baseline. I would also note that in practice transaction-based with SLAs is the most common landing point because it rewards automation while keeping measurement simple.

### Q3. How does agentic AI change the economics of a consulting firm, and what does that mean for how you would position yourself?

Model answer: The traditional model earns leverage on a pyramid of junior staff producing research, analysis and documents at hourly rates. GenAI compresses that pyramid because first drafts, data gathering, and much of the modelling can be produced faster by fewer people with AI assistance. Firms are responding in three ways: AI-enabled delivery to protect margin, asset-based offerings where reusable agents, accelerators and evaluation harnesses are sold alongside advice, and outcome-linked fees where the firm shares in the value it helps create. Several large firms have described internal assistants and restructuring of their delivery models publicly. For me the implication is that my value has to sit in what the model cannot do for the client: structuring an ambiguous problem, making judgement calls about sequencing and risk appetite, defending numbers to a CFO, navigating the regulatory position, and owning the client relationship. The experience I bring from payments and from working on agentic use-case assessment and prototypes is useful precisely because it lets me judge what is feasible and what is not, rather than because I can build the thing myself.

## 9. Self-check quiz

1. Explain the difference between labour arbitrage and automation arbitrage, and state who captures automation arbitrage under an unchanged FTE-based contract.
2. A provider's cost falls from EUR 20m to EUR 13m after automation. The client wants a 25% price cut from the current EUR 24m price. What is the provider's new margin in EUR and percent, and how does it compare with the current margin?
3. Name four contract clauses an AI-led managed service needs that a standard BPO contract usually lacks.
4. Why does a 55% reduction in effort typically produce a materially smaller reduction in cost? Give two reasons.
5. Under UK rules, can a bank transfer accountability for a KYC risk-rating model's decisions to its managed-service provider? Name the relevant supervisory statements.
