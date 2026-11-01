# Module 13 — AI Operating Model and Talent

## 1. Why a client cares

Most banks that stall on AI do not stall on technology. They stall because nobody owns the portfolio, the business cannot get engineering capacity, risk has no way to approve an agent, and the data team is a bottleneck for everyone. The operating model is the mechanism that converts a use-case list into shipped, governed, adopted systems. A CEO who asks "why have we spent GBP 40m on AI and have three things in production" is asking an operating-model question, not a model question.

## 2. Concept and mechanism

### 2.1 What an AI operating model is

An operating model is the set of structures, roles, decision rights, processes, funding flows and platforms through which an organisation does a category of work. For AI, the category of work is unusual in four ways, and each creates a design requirement:

- **The work is cross-functional by construction.** A single use case needs a business owner, a data engineer, an ML or agent engineer, a model-risk validator, a control owner, a change lead and a platform. In a conventional bank these sit in five reporting lines. The operating model has to create a team that spans them without a six-month resourcing negotiation.
- **The work is probabilistic.** A traditional IT change either works or does not. An AI system works 94% of the time and the operating model must decide who owns the 6%, who monitors drift, who re-validates after a model refresh, and who can switch it off.
- **The platform is reusable; the use case is not.** Retrieval infrastructure, evaluation harnesses, prompt registries, guardrail services, agent orchestration and observability are shared. Building them inside each use case is the single most common source of duplicated spend. The operating model has to separate platform (shared, funded centrally, product-managed) from use cases (business-funded, outcome-owned).
- **The risk surface is new.** Model risk, conduct risk, data-protection risk and operational resilience all attach to the same artefact. Three-lines-of-defence has to be extended rather than assumed.

### 2.2 The four archetypes

The archetypes below are described consistently across McKinsey/QuantumBlack and BCG practitioner writing on AI and analytics operating models since roughly 2018; the labels are generic and the exact definitions vary by firm (attribution: widely used in practice; no single originator).

| Archetype | Where capability sits | Who sets priorities | Typical fit |
|---|---|---|---|
| Centralised CoE | One central team does discovery, build and run | Centre, with business input | Low maturity, few use cases, scarce talent, high regulatory caution |
| Hub-and-spoke | Hub owns platform, standards, scarce specialists; spokes in business units own use cases and have embedded delivery capacity | Jointly: hub sets guardrails and allocates platform; spokes set business priorities | Medium maturity, several domains with real demand, 20 to 100 use cases |
| Federated | Each business unit has its own AI team and budget; a thin central function sets policy | Business units | High maturity, strong divisional P&Ls, very different data domains |
| Embedded (fully decentralised) | AI engineers sit in product squads with no central function | Product owners | Digital-native firms; rarely appropriate in a regulated bank |

The mechanism that distinguishes them is where three things sit: **talent**, **money** and **decision rights**. A centralised CoE holds all three. Hub-and-spoke splits them: the hub holds platform money, standards and the scarcest talent (evaluation, model risk engineering, agent platform); the spokes hold use-case money, business decision rights and domain-embedded delivery. Federated gives nearly everything to the spokes and keeps only policy centrally.

### 2.3 Typical evolution path and its failure points

Most banks move CoE, then hub-and-spoke, then partially federated. Each transition has a characteristic failure:

- **CoE to hub-and-spoke** fails when the hub releases people to spokes before it has built a platform. The spokes rebuild retrieval, evals and guardrails five times, and the central team becomes a help desk.
- **Hub-and-spoke to federated** fails when model-risk and data governance are federated with everything else. Standards fragment, and the regulator sees three different definitions of "model inventory" in one bank.
- **Staying centralised too long** fails through queueing. A central team of 40 serving 15 business units becomes a prioritisation committee, and the business starts shadow-AI procurement.

The rule of thumb used by practitioners is: centralise what is scarce, risky or reusable; decentralise what needs domain knowledge and speed. For AI in a bank that resolves to a hub holding platform, standards, model risk engineering and evaluation, and spokes holding use-case ownership and domain-embedded delivery.

### 2.4 Roles

The roles below are the set a hub-and-spoke model in a bank typically needs. Titles vary; the responsibilities are what matter.

| Role | Core accountability | Hub or spoke | Indicative ratio |
|---|---|---|---|
| AI product owner | Owns the use case outcome, backlog, KPIs and adoption; the business's accountable person | Spoke | 1 per 1 to 2 live use cases |
| Domain SME (process expert) | Supplies ground truth, labels golden data, defines exceptions, signs off process change | Spoke (part-time) | 1 to 2 per use case during build |
| Agent / prompt engineer (AI engineer) | Designs agent scoping, prompts, tool contracts, retrieval, evaluation loops | Spoke, hub for platform patterns | 2 to 3 per use case in build; 0.5 in run |
| ML engineer | Classical models, fine-tuning, feature pipelines | Hub pool, assigned | 1 per 2 to 3 use cases |
| Data engineer | Pipelines, data quality, access, lineage | Spoke-aligned, hub standards | 1 to 2 per use case in build |
| Platform engineer (LLMOps) | Shared gateway, vector stores, eval harness, observability, guardrail services | Hub | 6 to 12 total for a mid-sized bank |
| AI risk and validation | Independent validation, tiering, ongoing monitoring sign-off (second line) | Hub-adjacent, reports to CRO | 1 validator per 4 to 6 models/agents in inventory |
| Responsible AI / AI ethics lead | Policy, fairness testing standards, regulatory mapping (EU AI Act, SS1/23) | Hub, reports into Risk or Legal | 2 to 4 for the bank |
| Change and adoption lead | Role redesign, training, incentive alignment, adoption KPIs | Spoke, hub playbook | 1 per domain |
| AI architect | Reference architectures, build vs buy, integration patterns | Hub | 2 to 4 for the bank |
| Portfolio and value lead (AI PMO) | Pipeline, stage gates, benefits tracking, funding allocation | Hub | 3 to 5 for the bank |

Ratios are `[ESTIMATE — assumption, based on practitioner experience]`. The two most under-provisioned roles in banks are independent validation (regulators require it, and LLM validation skills are rare) and the domain SME (business leaders volunteer the SME's time and then recall them when the quarter gets busy).

### 2.5 The AI target operating model: six layers

A target operating model (TOM) for AI can be described in six layers. Each layer has a design question and an artefact that answers it.

| Layer | Design question | Artefact |
|---|---|---|
| Strategy and governance | Who decides ambition, domains and risk appetite; how is the AI council composed | AI strategy; AI council charter; risk appetite statement for AI |
| Demand and portfolio | How do use cases enter, get scored, funded, staged and retired | Intake process; prioritisation scorecard; stage-gate criteria; benefits register |
| Delivery | How do teams form, build, test, release and hand to run | Squad model; delivery playbook; definition of done including evals and validation |
| Platform | What is shared; how is it funded and productised | Platform roadmap; service catalogue (gateway, RAG, evals, guardrails, observability); chargeback rules |
| Risk and compliance | How is an AI system tiered, validated, monitored, and who can stop it | AI model risk policy; tiering matrix; validation standards; kill-switch authority |
| Talent | What roles, how many, sourced how, developed how | Role catalogue; capacity plan; hiring and reskilling plan; partner model |

The error to avoid is designing the layers independently. Demand and portfolio must reference the risk tiering (a Tier 1 agent needs validation capacity booked before funding is released). Platform must reference delivery (the definition of done cannot require an eval harness the platform has not shipped).

### 2.6 Funding models and incentive effects

| Funding model | Mechanism | Incentive effect | Risk |
|---|---|---|---|
| Central budget | Group funds all AI centrally | Fast start, easy to standardise | Business treats it as free; weak ownership of benefits; central team becomes order-taker |
| Chargeback | Business units pay the hub for platform and services | Disciplines demand; platform must prove value | Under-use of platform; shadow procurement of cheaper vendor tools |
| Business-funded | Each use case funded from the sponsoring unit's budget | Strong ownership; benefits land in the P&L that paid | Starves cross-cutting and foundational work; no one funds the platform |
| Venture-style stage gates | Central fund releases tranches at PoC, pilot, MVP, scale on evidence | Kills weak cases early; forces evidence | Governance overhead; can slow genuinely strategic bets |
| Hybrid (most common target) | Central funding for platform and foundations; business funding for use cases; a stage-gated innovation pool for new domains | Balances ownership with reuse | Requires a competent AI PMO to run |

The incentive point to make with a CFO is that the funding model decides where benefits are counted. If the hub is funded centrally and benefits land in the business units, the hub will always look like cost. The remedy is a benefits register with business-unit sign-off, tracked by the AI PMO and reported alongside platform spend.

### 2.7 Building the central platform team

A platform team is a product team, not a shared-services pool. It needs a product manager, a roadmap, consumers it treats as customers, and service levels. The services a bank's AI platform typically productises, in the order they tend to be needed:

1. Model gateway (single authenticated entry point to approved models, with logging, cost attribution, PII redaction and rate limits).
2. Retrieval service (document ingestion, chunking, embedding, vector store, access-control-aware retrieval).
3. Evaluation harness (golden dataset management, LLM-as-judge configuration, regression runs on every prompt or model change).
4. Guardrail service (input classification, output checking, policy enforcement, tool-call allow-lists).
5. Agent orchestration runtime (tool registry, memory, HITL queue, audit trail).
6. Observability (traces, cost per task, latency, override rates, drift alerts).
7. Prompt and agent registry (versioning, approval status, link to model inventory).

A team of 8 to 12 can deliver and run items 1 to 4 within 9 to 12 months for a mid-sized bank `[ESTIMATE — assumption]`; items 5 to 7 follow as agentic use cases enter pilot.

## 3. Frameworks

### 3.1 McKinsey "Rewired" capabilities applied to operating model (Lamarre, Smaje, Zemmel, 2023) [PUBLIC — Wiley, 2023]

"Rewired" names six capabilities: business-led digital roadmap; talent; operating model; technology; data; adoption and scaling. Two of the six (talent, operating model) are the subject of this module. The book's operating-model argument is that the unit of delivery should be a persistent, cross-functional, product-oriented team ("pod" or "squad") with a business owner, and that enterprises should move from project funding to persistent-team funding. Apply it by: (1) listing current AI work and classifying it as project or persistent team; (2) identifying the domains with enough demand to justify a persistent team; (3) designing the platform team as its own product; (4) moving funding to the persistent-team model domain by domain.

### 3.2 BCG 10-20-70 (BCG, 2023–24) [PUBLIC — BCG publications, 2023–24]

BCG's rule of thumb is that roughly 10% of the effort and value in AI is algorithms, 20% is technology and data, and 70% is people, process and business change. As an operating-model heuristic it says the talent plan and the change capacity, not the model team, should dominate the resourcing plan. Apply it as a check: if 70% of your AI headcount is engineers and data scientists, your model is inverted.

### 3.3 Hub-and-spoke design method (attribution: widely used in practice; variants by firm)

A step-by-step method for designing a hub-and-spoke model:

1. **Inventory demand** by business unit: number of live and pipeline use cases, their risk tier, their shared pattern (RAG assistant, document extraction, agentic workflow, classical scoring).
2. **Classify capabilities** as scarce, risky, reusable, or domain-specific. Scarce, risky and reusable go to the hub.
3. **Size the hub** from the platform roadmap and the validation workload (inventory size divided by validator ratio).
4. **Size the spokes** from the use-case pipeline (product owners, embedded engineers, SMEs) and set a minimum viable spoke (a unit with fewer than three pipeline use cases is served from the hub instead).
5. **Define decision rights** in a RACI across intake, prioritisation, funding release, tiering, validation sign-off, go-live, kill switch, and benefits sign-off.
6. **Set the funding model** per Section 2.6 and agree benefits-register rules with Finance.
7. **Sequence the transition** so the platform reaches a minimum service level before people move to spokes.

### 3.4 Three lines of defence extended to AI (Institute of Internal Auditors model; extension to AI by practitioners)

First line: use-case owners and delivery teams own controls, monitoring and evals. Second line: AI risk and model validation set standards, tier systems, validate independently and can veto. Third line: internal audit tests both. The AI-specific extension is that the second line must own the AI inventory and tiering, and the first line must produce evidence (eval results, monitoring dashboards, override logs) in a form the second line can consume. UK PRA SS1/23 `[PUBLIC — PRA, 2023; VERIFY scope]` makes the SMF (senior management function) accountability for model risk explicit, which in practice pushes the second-line role up to the CRO's direct reports.

## 4. Worked BFSI example

`[ILLUSTRATIVE — composite]` Harbourside Bank: a mid-sized UK bank, GBP 45bn assets, 7,000 staff, three business units (Retail, Commercial, Wealth), a 25-model classical inventory, four GenAI pilots run by a 12-person central "Data Science CoE", and a stated ambition of 30 AI use cases in production within 3 years with GBP 60m annual run-rate benefit.

### 4.1 Demand inventory

| Business unit | Live | Pipeline (scored) | Dominant patterns | Highest tier |
|---|---|---|---|---|
| Retail | 2 | 11 | Servicing assistant, disputes agent, collections scoring | Tier 1 (collections) |
| Commercial | 1 | 9 | KYB onboarding agent, credit memo drafting, payments investigations | Tier 1 (credit) |
| Wealth | 0 | 4 | Adviser assistant, suitability report drafting | Tier 2 |
| Group functions (Risk, Finance, Ops) | 1 | 8 | AML alert narratives, reconciliation, policy Q&A, code modernisation | Tier 1 (AML) |

Conclusion: Retail, Commercial and Group functions justify spokes. Wealth, with four pipeline cases, is served from the hub until demand grows.

### 4.2 Target headcount and cost

Loaded cost assumptions `[ESTIMATE — UK, 2025, fully loaded including employer costs and overhead]`: engineer or data scientist GBP 130k; product owner GBP 120k; validator GBP 140k; platform engineer GBP 145k; change lead GBP 110k; architect GBP 160k; PMO GBP 100k; Responsible AI lead GBP 150k; SME time charged at GBP 90k equivalent.

| Role | Hub | Retail spoke | Commercial spoke | Group spoke | Total | Annual cost (GBP m) |
|---|---|---|---|---|---|---|
| Platform engineers | 10 | 0 | 0 | 0 | 10 | 1.45 |
| AI architects | 3 | 0 | 0 | 0 | 3 | 0.48 |
| AI risk and validation | 6 | 0 | 0 | 0 | 6 | 0.84 |
| Responsible AI | 2 | 0 | 0 | 0 | 2 | 0.30 |
| AI PMO and value | 4 | 0 | 0 | 0 | 4 | 0.40 |
| Shared ML engineers | 5 | 0 | 0 | 0 | 5 | 0.65 |
| AI product owners | 1 | 4 | 3 | 3 | 11 | 1.32 |
| Agent / AI engineers | 4 | 8 | 7 | 6 | 25 | 3.25 |
| Data engineers | 2 | 4 | 4 | 4 | 14 | 1.82 |
| Change and adoption | 1 | 2 | 1 | 1 | 5 | 0.55 |
| Domain SMEs (FTE-equivalent) | 0 | 3 | 3 | 3 | 9 | 0.81 |
| Total | 38 | 21 | 18 | 17 | 94 | 11.87 |

Arithmetic check on the largest line: 25 agent engineers x GBP 130k = GBP 3.25m. Total people cost GBP 11.9m a year at steady state, against a GBP 60m benefit ambition. Platform run costs (cloud, model consumption, tooling licences) are modelled separately in Module 8; here we assume GBP 4m a year at steady state `[ESTIMATE]`, giving a total operating-model run cost of around GBP 16m, or 27% of targeted benefit.

### 4.3 Validation capacity check

Target inventory at year 3: 25 classical models plus 30 AI use cases, of which an estimated 12 are Tier 1 or Tier 2 requiring full independent validation and annual re-validation. At a ratio of one validator per 5 systems in scope for full validation, plus a lighter touch on the rest, 6 validators is adequate `[ESTIMATE]`. The current CoE has one part-time validator, which means validation, not engineering, is the binding constraint on the roadmap in year 1.

### 4.4 Funding model

Hybrid: hub platform and risk functions (GBP 4.1m people plus GBP 4m run) funded centrally from the Group technology budget; spoke teams funded from business-unit budgets with benefits booked in those units; a GBP 3m a year stage-gated innovation pool held by the AI council for new domains, released at PoC/pilot/MVP gates. Benefits register owned by the AI PMO, signed quarterly by business-unit CFOs.

### 4.5 24-month transition plan

| Months | Hub actions | Spoke actions | Exit criteria |
|---|---|---|---|
| 0 to 3 | Appoint Head of AI; charter AI council; adopt tiering matrix; hire 2 validators; define platform roadmap | Name product owners for top 6 use cases; agree spoke budgets | Council live; tiering approved by CRO; roadmap signed |
| 4 to 9 | Ship gateway, retrieval service, eval harness v1; validate first Tier 1 agent; set chargeback rules | Form Retail and Commercial spokes with 4 engineers each seconded from CoE and 6 external hires; 3 use cases to pilot using hub services | Two platform services in production use; first Tier 1 validation complete |
| 10 to 15 | Guardrail service and orchestration runtime; validation capacity to 5; Responsible AI policy adopted | Group functions spoke formed; 8 use cases in production; change leads in each spoke | Eight use cases live; no use case using unapproved model routes |
| 16 to 24 | Observability and registry; chargeback live; third-party assurance of AI control framework | 18 to 20 use cases live; spokes self-sufficient on standard patterns; Wealth demand reviewed for spoke | Benefits register shows GBP 25m run-rate `[ILLUSTRATIVE]`; audit finds no high-severity gaps |

So what for the client: the bank's constraint is not engineers, it is validation capacity and the absence of a platform; fund those two first, and the use-case roadmap becomes achievable with a 94-person model costing roughly a quarter of the targeted benefit.

## 5. Real-world case

**DBS Bank** `[PUBLIC — DBS annual reports and press, 2023–2025; VERIFY figures]`. DBS has reported a portfolio of around 800 AI/ML models supporting around 350 use cases, with projected economic value above SGD 1bn in 2025. The operating-model features DBS has described publicly include a central data and AI platform, industrialised MLOps, business-embedded data teams, and a governance framework for responsible AI (its PURE principles: Purposeful, Unsurprising, Respectful, Explainable). The lesson for operating-model design is that scale came from treating the platform and governance as products while use-case ownership sat in the business. DBS also announced in February 2025 that it expected around 4,000 temporary and contract roles to reduce over three years as AI absorbed work, which is a reminder that the talent layer of the TOM includes workforce transition, not only hiring.

**JPMorgan Chase** `[PUBLIC — company statements and shareholder letters, 2023–2024; VERIFY figures]`. JPMorgan's rollout of its LLM Suite to around 200,000 employees in 2024 was possible because of a central platform and a firm-wide AI and data organisation under a Chief Data and Analytics Officer, with business-aligned teams. The public narrative emphasises a central platform with enterprise-wide access controls and business-led use cases, a hub-and-spoke pattern in substance.

## 6. Consultant language

> "Centralise what is scarce, risky or reusable; decentralise what needs domain knowledge and speed."

Use when the client asks whether to build a CoE or push AI into the business. It gives a rule rather than an opinion.

> "Your binding constraint is validation capacity, not engineering capacity."

Use when a bank has a long roadmap and a tiny second line. It redirects a hiring conversation to the real bottleneck.

> "The platform is a product with customers, a roadmap and service levels, not a shared-services pool."

Use when the central team is being treated as an order-taker and the spokes are rebuilding the same components.

> "The funding model decides where benefits are counted, so we design the benefits register before we design the budget."

Use with the CFO when the hub looks like pure cost.

> "We are moving from project funding to persistent-team funding, domain by domain."

Use when describing the delivery layer; it signals familiarity with the Rewired argument without name-dropping.

## 7. Common mistakes juniors make

- **Drawing an org chart instead of designing decision rights.** The RACI across intake, tiering, validation, go-live and kill switch is the operating model; the boxes are secondary.
- **Sizing the team from the use-case count only.** Validation workload, platform roadmap and change capacity drive headcount at least as much.
- **Recommending federated to a low-maturity bank** because the business asked for autonomy. Without a platform and standards it produces five vector databases and no model inventory.
- **Ignoring the second line.** Proposing an operating model with no independent validation role is a regulatory finding waiting to happen under SS1/23 or SR 11-7.
- **Treating the SME as free.** Domain SME time for labelling and exception design is the most frequently missing line in the resourcing plan.
- **Confusing the AI CoE with the data office.** They overlap on data governance, but the AI function needs evaluation, model risk engineering and agent platform skills the data office does not have.
- **Presenting a target state with no transition.** The sequencing (platform before people move) is what makes it credible.

## 8. Interview questions with model answers

### Q1. A UK bank with 6,000 staff has a 15-person central data-science team and 40 GenAI ideas from the business. What operating model do you recommend and why?

Model answer: I would start by diagnosing three things: demand concentration by business unit, the maturity of the shared platform, and second-line capacity. With 40 ideas across presumably three or four units, a pure CoE of 15 will become a queue, and a federated model would fragment standards before any exist. I would recommend a hub-and-spoke model: the hub keeps platform engineering, architecture, evaluation, independent validation and Responsible AI; each business unit with at least three credible pipeline cases gets a spoke with a product owner, two to four AI engineers and embedded data engineering. I would sequence it so the hub ships a model gateway, a retrieval service and an eval harness in the first six to nine months before engineers move into spokes, because otherwise the spokes rebuild the plumbing. Funding would be hybrid: central for platform and risk, business-funded for use cases, with a stage-gated pool for new domains. The number I would put on the table is a target of roughly 60 to 90 people at steady state including spokes, with validation capacity sized from the tiered inventory rather than from headcount ratios. The caveat is that this depends on the bank having at least one business leader willing to own outcomes; without that, I would keep the CoE and spend the first year on platform and governance.

### Q2. How would you size the independent validation function for an AI portfolio?

Model answer: From the inventory and tiering, not from a ratio of engineers. First, I would agree a tiering matrix with the CRO: materiality, autonomy, customer impact and regulatory exposure drive a Tier 1 to Tier 3 classification. Second, I would estimate the steady-state inventory by tier from the pipeline. Third, I would apply effort norms: a Tier 1 agentic system needs initial validation of perhaps 8 to 12 weeks of a validator's time, plus annual re-validation and event-driven re-validation on each material model or prompt change; Tier 3 might be a desk review. Dividing total annual validation effort by productive capacity per validator gives the headcount; in practice that lands around one validator per four to six Tier 1 and Tier 2 systems. I would present that as an estimate and stress-test it against the roadmap: if the plan puts six Tier 1 agents into pilot in the same quarter, validation is the critical path, and the roadmap needs to flex or validation needs external support. I would also say that LLM validation skills are scarce, so the sourcing plan matters as much as the number.

### Q3. The CFO says the central AI team is a cost centre with no measurable return. How do you respond?

Model answer: I would agree with the observation and reframe its cause. A centrally funded hub whose benefits land in business-unit P&Ls will always look like cost, because the accounting is asymmetric. The fix is structural: a benefits register that attributes run-rate benefit to each use case, signed quarterly by the business-unit CFO, and reported alongside hub spend. Then I would separate the hub's cost into platform, which should be judged on reuse (number of use cases served, cost per use case served, time to first pilot), and risk functions, which should be judged on control outcomes, not return. Finally I would propose chargeback for platform services once they are mature, which disciplines demand and gives the hub a revenue line. With illustrative numbers: if the hub costs GBP 8m and serves 20 use cases with GBP 40m of signed run-rate benefit, that is a reasonable 5x; the point is to make the number visible rather than to argue about whether it exists.

## 9. Self-check quiz

1. Name the three things whose location distinguishes a centralised CoE from a hub-and-spoke model from a federated model.
2. A bank plans 40 AI systems in inventory at year 3, of which 14 are Tier 1 or Tier 2 requiring full independent validation. Using a ratio of one validator per five such systems, plus one validator for the remaining lighter-touch systems, how many validators are needed? What is the binding assumption?
3. Which funding model most often leaves the shared platform unfunded, and what hybrid fixes it?
4. State BCG's 10-20-70 rule and explain what it implies for the composition of an AI operating model's headcount.
5. Why should the platform reach a minimum service level before engineers move from a central team into business-unit spokes?
