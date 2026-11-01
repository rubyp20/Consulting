# Module 08 — Cost Factors and Total Cost of Ownership

## 1. Why a client cares

Every AI business case that fails a CFO review fails on cost, not on benefit. Benefits are assumptions the CFO expects to haircut; costs are commitments the CFO expects to be complete. The two most common omissions are run costs that scale with volume (inference, human review, evaluation) and lifecycle costs that recur (model refresh, re-validation, prompt migration when a vendor deprecates a model). A consultant who can lay out a three-year total cost of ownership with the unit economics per transaction, and show where it is sensitive, earns the right to talk about benefits.

## 2. Concept and mechanism

### 2.1 Total cost of ownership as a discipline

Total cost of ownership (TCO) is the full lifecycle cost of acquiring, operating, changing and retiring a capability, not the purchase or build price. The term was popularised by Gartner (Bill Kirwin, 1987) for IT assets [PUBLIC — Gartner, 1987]. Applied to AI systems it needs four extensions that classic IT TCO under-weights:

1. **Consumption-based run cost.** Inference is metered per token, so run cost scales with volume and with how the system is designed (prompt length, number of calls, model tier). It is an operating cost that engineering decisions can move by a factor of three or more.
2. **Human-in-the-loop cost.** Review, sampling, exception handling and appeals are part of the system's cost, not part of "business as usual".
3. **Assurance cost.** Evaluation sets, continuous evals, guardrails, monitoring and model risk validation are recurring, and in a bank they are non-negotiable.
4. **Lifecycle churn.** Foundation models are deprecated on 12 to 24 month cycles [ESTIMATE — observed vendor practice, VERIFY]. Each migration triggers re-evaluation, prompt adjustment and, for higher tiers, re-validation.

### 2.2 The cost taxonomy

| Phase | Cost category | What it includes | Typical share of 3-year TCO |
|---|---|---|---|
| Build | Discovery and design | Process redesign, solution architecture, control design, regulatory mapping | 4 to 8 percent |
| Build | Data preparation | Corpus curation, document digitisation, entity resolution, labelling, golden dataset construction, access provisioning | 6 to 12 percent |
| Build | Integration | Connectors to core systems, case management, scheme or network APIs, identity and access, event feeds | 12 to 20 percent |
| Build | Engineering | Orchestration, agent logic, tools, prompts, retrieval pipelines, UI for reviewers | 15 to 25 percent |
| Build | Evaluation and guardrails | Eval harness, test sets, safety and policy filters, red-teaming | 3 to 6 percent |
| Build | Validation and assurance | Model risk validation, security testing, privacy assessment, legal review | 3 to 6 percent |
| Run | Inference | Token consumption across all calls, including guardrail and evaluation calls, retries | 2 to 15 percent |
| Run | Infrastructure and platform | Gateway, vector store, orchestration runtime, observability, compute for batch evals | 6 to 12 percent |
| Run | Licences | Agent frameworks, observability tools, document AI, vendor platforms | 3 to 10 percent |
| Run | Monitoring and evals | Drift monitoring, periodic eval runs, incident response, eval set maintenance | 4 to 8 percent |
| Run | Human review | Sampling QA of autonomous outputs, exception handling attributable to the system, appeals | 3 to 10 percent |
| Run | Product and support team | Product owner, engineers, support | 10 to 18 percent |
| Change | Training and adoption | Training, SOP rewrite, communications, floor-walking | 4 to 8 percent |
| Change | Workforce transition | Redeployment, retraining, where applicable severance | Reported separately |
| Lifecycle | Model refresh and re-validation | Migration to new model versions, prompt and eval re-baselining, re-validation | 3 to 6 percent |

[ESTIMATE — shares are indicative ranges from practice for bank-grade agentic systems at medium volume; the inference share is highly volume-dependent, VERIFY against the specific design]

The most important reading of this table: inference, the cost everyone argues about, is usually a minority of TCO for bank back-office systems at medium volume. People, integration and assurance dominate. The exception is very high-volume or token-heavy workloads (long documents, images, many agent steps), where inference can approach a third of run cost.

### 2.3 Token economics

Inference cost per transaction is the product of four things: number of model calls, tokens per call (input and output priced separately), model tier, and discount mechanisms.

- **Input versus output.** Output tokens are priced three to five times higher than input tokens at most vendors [ESTIMATE — order of magnitude, VERIFY]. Designs that generate long outputs (full narratives) cost more than designs that classify or extract.
- **Prompt caching.** Repeated prefixes (system prompts, policy documents, tool schemas) can be cached; cached input is typically discounted 75 to 90 percent [ESTIMATE — order of magnitude, VERIFY]. Agentic systems with long static instructions benefit heavily.
- **Batch processing.** Non-latency-sensitive work (overnight review preparation, back-book refresh) can use batch endpoints at roughly half price [ESTIMATE — VERIFY].
- **Model tiering and routing.** Route deterministic or low-judgement steps (classification, extraction, summarisation) to small or mid-tier models and reserve frontier models for reasoning steps. Frontier models cost roughly 10 to 30 times a small model per token [ESTIMATE — order of magnitude, VERIFY].
- **Overheads.** Guardrail classifiers, retries, evaluation calls and tracing add 20 to 40 percent to raw inference in production [ESTIMATE — practice assumption].

Order-of-magnitude pricing to use only as placeholders [ESTIMATE — 2025 orders of magnitude, VERIFY before any client use]: frontier models USD 2 to 5 per million input tokens and USD 8 to 20 per million output; mid-tier USD 0.5 to 1.5 and USD 2 to 6; small models USD 0.05 to 0.25 and USD 0.2 to 1.0.

### 2.4 Unit economics

The unit that a CFO understands is cost per transaction, or more precisely cost per successfully completed task. Three unit metrics matter:

- **AI cost per case:** inference plus the volume-driven share of platform and review cost, divided by cases handled.
- **Fully loaded cost per case after transformation:** AI cost per case plus residual human cost per case plus amortised build and change.
- **Cost per successful outcome:** the above divided by the success rate, where failures (escalations, reversals, re-work) are counted. A system that is cheap per attempt and wrong a quarter of the time is expensive per outcome.

### 2.5 Hidden costs

- **Vendor and model lock-in.** Prompts, evals and guardrails tuned to one model do not transfer cleanly. Budget a migration every 12 to 24 months.
- **Data egress and residency.** Cross-region inference can trigger egress charges and data-protection reviews; in-region or private endpoints cost more per token.
- **Model risk validation effort.** For Tier 1 and 2 systems, independent validation is a recurring cost with scarce internal capacity; it is also a schedule cost.
- **Eval set maintenance.** Golden datasets decay as policy and products change; budget for quarterly refresh.
- **Observability storage.** Full tracing of agent runs generates large volumes of logs that may have retention obligations.
- **Legal and privacy review of vendor terms.** Especially data-use, training-on-customer-data and liability clauses.

## 3. Frameworks

### 3.1 Three-year TCO template

Attribution: generic finance practice; structure below is practitioner convention. Steps:

1. Fix the volume forecast per year and the autonomy design (what share of cases the system handles without a human). Everything volume-driven flows from this.
2. Build the per-case inference model (calls, tokens, tier, caching, overhead).
3. Estimate build costs by category with named assumptions and a contingency (15 to 25 percent for first-of-kind agentic builds [ESTIMATE]).
4. Estimate run costs by category, with volume-driven items scaling with the forecast.
5. Add change and lifecycle costs by year.
6. Present per year and cumulative, with unit economics, then run sensitivities on volume, tokens per case, autonomy share and model price.

### 3.2 FinOps for AI

Attribution: FinOps Foundation (part of the Linux Foundation), cloud financial management framework, with AI cost management guidance added from 2024 [PUBLIC — FinOps Foundation, VERIFY]. The three phases (Inform, Optimise, Operate) apply directly: tag and attribute token spend to use cases and teams; optimise through caching, routing and prompt compression; operate with budgets and anomaly alerts. In a bank this sits naturally with the LLM gateway, which is the control point for metering.

### 3.3 Cost-per-outcome ladder

Attribution: practitioner convention. Compute cost per attempt, cost per completed case and cost per successful outcome; present all three, because the gap between them is where quality problems hide.

## 4. Worked BFSI example

### 4.1 Setting

[ILLUSTRATIVE — composite] A card issuer handles 600,000 cardholder disputes a year. Current operations: 320 FTE at a fully loaded USD 65,000 each (USD 20.8 million), plus dispute platform and vendor costs of USD 3.5 million, total USD 24.3 million, or USD 40.50 per dispute. The target design is a supervisor-led multi-agent system (Module 3) that resolves low-value, clear-cut disputes autonomously (target 55 percent of volume) and prepares the remaining 45 percent for human decision. All figures below are illustrative; pricing is order of magnitude and date-sensitive [ESTIMATE — VERIFY].

### 4.2 Per-dispute inference, frontier model only

Design assumptions: 12 model calls per dispute on average (intake classification, evidence retrieval and summarisation, scheme-rule reasoning, customer communication drafting, supervisor decisions). Each call averages 9,000 input tokens (3,000 system and tool schema, 4,000 retrieved context, 2,000 state) and 600 output tokens. Forty percent of input tokens are cache hits (system prompt, tool schemas, policy excerpts).

| Component | Tokens per dispute | Price per million | Cost per dispute |
|---|---|---|---|
| Uncached input (60 percent of 108,000) | 64,800 | USD 3.00 | USD 0.194 |
| Cached input (40 percent of 108,000) | 43,200 | USD 0.30 | USD 0.013 |
| Output | 7,200 | USD 15.00 | USD 0.108 |
| **Raw inference** | | | **USD 0.315** |
| Overheads (guardrails, retries, evals, tracing) at 30 percent | | | USD 0.095 |
| **Loaded inference per dispute** | | | **USD 0.410** |

Annual inference, frontier only: 600,000 x USD 0.410 = USD 246,000.

Without caching the raw figure would be USD 0.432 per dispute, so caching alone saves about 27 percent of raw inference.

### 4.3 Per-dispute inference, tiered routing

Route 4 of the 12 calls (scheme-rule reasoning, final supervisor decisions, complex communication) to the frontier model and 8 calls (classification, extraction, summarisation) to a mid or small model at a blended USD 0.50 input and USD 2.00 output, with cached input at USD 0.05.

| Component | Tokens per dispute | Price per million | Cost per dispute |
|---|---|---|---|
| Frontier uncached input (60 percent of 36,000) | 21,600 | USD 3.00 | USD 0.065 |
| Frontier cached input | 14,400 | USD 0.30 | USD 0.004 |
| Frontier output | 2,400 | USD 15.00 | USD 0.036 |
| Small-model uncached input (60 percent of 72,000) | 43,200 | USD 0.50 | USD 0.022 |
| Small-model cached input | 28,800 | USD 0.05 | USD 0.001 |
| Small-model output | 4,800 | USD 2.00 | USD 0.010 |
| **Raw inference** | | | **USD 0.138** |
| Overheads at 30 percent | | | USD 0.041 |
| **Loaded inference per dispute** | | | **USD 0.179** |

Annual inference, tiered: 600,000 x USD 0.179 = USD 107,000. Routing saves USD 139,000 a year, or 56 percent of inference, at the cost of extra engineering (routing logic, two eval sets) estimated at USD 150,000 of build.

### 4.4 Three-year TCO

| Cost line | Year 1 | Year 2 | Year 3 | 3-year total |
|---|---|---|---|---|
| Discovery, design, process and control redesign | 0.60 | | | 0.60 |
| Data preparation (dispute history, evidence stores, policy corpus, 3,000-case golden set) | 0.90 | | | 0.90 |
| Integration (card processor, scheme dispute platforms, case management, core banking, identity) | 2.80 | | | 2.80 |
| Engineering (orchestration, agents, tools, reviewer UI) | included above | | | |
| Evaluation harness and guardrails | 0.50 | | | 0.50 |
| Model risk validation (Tier 2), security, privacy, legal | 0.60 | | | 0.60 |
| **Build subtotal** | **5.40** | | | **5.40** |
| Inference (frontier only, half-year in Year 1) | 0.12 | 0.25 | 0.25 | 0.62 |
| Platform and infrastructure (gateway, vector store, runtime, observability) | 0.25 | 0.45 | 0.45 | 1.15 |
| Licences (agent framework, observability, document AI) | 0.15 | 0.30 | 0.30 | 0.75 |
| Monitoring, evals, drift, incident response (1.5 FTE plus compute) | 0.20 | 0.45 | 0.45 | 1.10 |
| Human review of autonomous outputs (5 percent sample, 10 minutes each, 3.5 FTE) | 0.12 | 0.23 | 0.23 | 0.58 |
| Product and support team (PO, 2 engineers, designer, L2 support) | 0.50 | 1.00 | 1.00 | 2.50 |
| **Run subtotal** | **1.34** | **2.68** | **2.68** | **6.70** |
| Training, SOP rewrite, communications, adoption | 0.70 | 0.20 | | 0.90 |
| Model refresh, prompt and eval re-baselining, re-validation | | 0.30 | 0.30 | 0.60 |
| **TCO (frontier only)** | **7.44** | **3.18** | **2.98** | **13.60** |
| Tiered routing variant: extra build 0.15, inference saving 0.07, 0.14, 0.14 | 7.52 | 3.04 | 2.84 | 13.40 |

All figures USD million [ILLUSTRATIVE — composite; pricing ESTIMATE, VERIFY]. Workforce transition costs (redeployment, retraining, any severance) are reported separately in the business case because they are policy decisions, not system costs; a placeholder of USD 1.5 million is used in Module 9.

### 4.5 Unit economics

| Metric | Value | Working |
|---|---|---|
| AI cost per dispute, steady state (Year 2) | USD 5.30 | 3.18 million / 600,000 |
| Of which inference | USD 0.41 | from 4.2 |
| Residual human cost per dispute | USD 16.25 | 150 FTE x USD 65,000 / 600,000 |
| Fully loaded cost per dispute, Year 2 | USD 21.55 | 5.30 + 16.25 |
| Current cost per dispute | USD 40.50 | 24.3 million / 600,000 |
| Cost per successful outcome at 92 percent first-time-right | USD 23.42 | 21.55 / 0.92 |

The residual FTE figure assumes 170 of 320 roles are released as 55 percent of disputes are resolved autonomously and the remaining cases take less handle time with agent preparation [ESTIMATE — assumption; Module 9 ramps this over time].

### 4.6 Sensitivities

| Scenario | Effect on 3-year TCO | Reading |
|---|---|---|
| Tokens per dispute doubles (richer evidence, more steps) | Frontier inference +0.62 million; tiered +0.27 million | Routing becomes a 0.35 million lever instead of 0.20 million |
| Volume rises to 1.2 million disputes | Inference and review double; platform +30 percent | AI cost per dispute falls to about USD 3.80; unit economics improve |
| Frontier price falls 50 percent (observed trend, VERIFY) | Frontier inference -0.31 million | Narrows the routing case further |
| Autonomy share falls from 55 to 35 percent | Residual human cost +USD 4.30 per dispute | Largest sensitivity in the whole model; it is a quality and policy variable, not a cost variable |
| Tier 1 classification instead of Tier 2 | Validation +0.4 million, go-live +4 months | Schedule cost often exceeds the money cost |

The so-what for the client: at this volume, inference is under 5 percent of TCO and model routing is a 1.5 percent lever on three-year cost. The decisions that move the TCO are integration scope, the autonomy share the risk function will accept, and the size of the product and assurance team. Negotiating token prices is the wrong meeting to spend time in.

## 5. Real-world case

**Klarna, customer-service AI assistant** [PUBLIC — Klarna press release, Feb 2024; CEO statements, 2025, VERIFY]. Klarna reported that its OpenAI-based assistant handled two-thirds of customer-service chats in its first month, equivalent to the work of about 700 full-time agents, with an estimated USD 40 million profit improvement in 2024. The TCO lesson is in the 2025 sequel: the CEO acknowledged that quality had suffered and that human agents would be re-hired for complex cases. In TCO terms, the "human review and exception handling" line was under-provisioned relative to the autonomy share assumed, and cost per successful outcome, which includes re-contacts and dissatisfaction, was higher than cost per handled chat suggested. The case is also a reminder that reported benefits of this kind are company statements, not audited figures.

**Goldman Sachs and coding agents** [PUBLIC — press coverage of Goldman Sachs piloting Cognition's Devin, Jul 2025, VERIFY]. Reported as a pilot of autonomous coding agents alongside roughly 12,000 developers, with the firm describing the agents as augmenting rather than replacing engineers. The TCO point: the run cost of an agent is not the licence; it is the review, integration and governance around it, and the firm's framing as augmentation reflects where the real costs and risks sit.

## 6. Consultant language

> "Inference is the cost everyone argues about and the one that matters least at this volume. Integration, assurance and the team are the TCO."

Use when a steering committee fixates on token prices.

> "I would like the CFO to see cost per successful outcome, not cost per case. The gap between them is where quality problems hide."

Use when presenting unit economics.

> "The largest sensitivity in this model is the autonomy share the risk function will accept. That is a governance decision with a USD 4 per case price tag."

Use to connect TCO to the risk conversation.

> "Model routing is worth about 1.5 percent of three-year cost here. It becomes material if token use per case doubles, so we should design for it and not over-invest in it on day one."

Use when an engineering team wants to build routing before volumes justify it.

> "Budget a model migration every 12 to 24 months. The vendor will deprecate the model we build on, and re-validation is not optional in a bank."

Use when the lifecycle line is missing from a draft budget.

## 7. Common mistakes juniors make

- **Pricing only the licences.** Platform and licence costs are rarely more than a fifth of TCO; omitting the team, review, assurance and lifecycle lines is the most common CFO rejection reason.
- **Assuming inference dominates.** It does at consumer scale with heavy token use; it rarely does in bank back-office systems. Do the per-case arithmetic before asserting either way.
- **Forgetting overheads.** Guardrail calls, retries, evaluation runs and tracing add 20 to 40 percent to raw inference.
- **Omitting human review.** Sampling QA of autonomous decisions is a permanent cost; it is also the control the regulator will ask about.
- **Treating workforce transition as free.** Redeployment, retraining and any severance belong in the business case even if reported separately from TCO.
- **Quoting token prices from memory.** Prices move quarterly. Label them as estimates, verify them before a client meeting, and show that the conclusion is robust to a 50 percent change.

## 8. Interview questions with model answers

**Q1. Walk me through the cost components of an agentic AI system in a bank and tell me which ones people get wrong.**

I group them into build, run, change and lifecycle. Build covers discovery and process redesign, data preparation including the golden dataset, integration with core and third-party systems, engineering of orchestration, agents, tools and reviewer tooling, evaluation and guardrails, and validation and assurance including model risk, security and privacy. Run covers inference, platform and infrastructure, licences, monitoring and evals, human review of autonomous outputs, and the ongoing product and support team. Change covers training, SOP rewrite and adoption, with workforce transition reported separately. Lifecycle covers model refresh, prompt and eval re-baselining and re-validation on roughly a 12 to 24 month cycle. The three things people get wrong are: first, over-estimating inference, which for a 600,000-case back-office process is typically under 5 percent of three-year TCO once you do the token arithmetic; second, omitting human review and assurance, which are permanent and which the regulator will ask about; third, omitting lifecycle churn, because vendors deprecate models and re-validation is mandatory for higher-tier systems. I would also insist on presenting cost per successful outcome, not just cost per case, because that is where quality failures show up as cost.

**Q2. How do you model token costs for an agentic workflow, and what levers reduce them?**

I start from the workflow design: number of model calls per case, average input and output tokens per call, and which calls need frontier reasoning versus classification or extraction. For a dispute workflow I might assume 12 calls, 9,000 input and 600 output tokens each, giving about 108,000 input and 7,200 output tokens per case. I price input and output separately because output is three to five times more expensive, apply a cache-hit share to the static prefix, which is typically discounted 75 to 90 percent, and add 20 to 40 percent for guardrails, retries and evaluation calls. At illustrative 2025 prices that gives roughly USD 0.40 per case loaded on a frontier model, which I would label as an order-of-magnitude estimate to verify. The levers, in order of impact, are routing low-judgement calls to small models, which can halve inference; caching static prompts, worth 20 to 30 percent; shortening retrieved context through better chunking and re-ranking; using batch endpoints for non-real-time work; and reducing output length by structuring outputs as fields rather than prose. I would then show the CFO that even a 50 percent price change barely moves TCO at this volume, so the real decisions are elsewhere.

**Q3. A CFO says your TCO is too high because a vendor quoted a platform at a fifth of your figure. How do you respond?**

I would say the vendor quote is probably correct and that it is answering a different question. A platform quote covers licences and perhaps hosting; our TCO covers the integration into the bank's systems, the data preparation, the evaluation and guardrails, model risk validation, the human review of autonomous decisions, the product team that keeps it running, the change programme, and the model migrations over three years. In our worked case the platform and licence lines were about 14 percent of three-year TCO, which is consistent with a vendor quote being a fifth of the total. I would offer to reconcile line by line so the CFO can see exactly which costs the vendor excludes, and I would point out that the excluded costs are the ones that determine whether the system reaches production at all, which is where most AI investments have failed. Finally, I would show the sensitivity table so the CFO sees that the figure is robust to platform price and sensitive to autonomy share and integration scope, which refocuses the discussion on the decisions that matter.

## 9. Self-check quiz

1. List the four extensions that AI TCO needs beyond classic IT TCO, with one sentence each on why banks cannot omit them.
2. Calculation: a KYB document-processing agent makes 6 calls per case at 12,000 input and 400 output tokens, with 50 percent cache hits. At USD 3 per million input, USD 0.30 cached, USD 15 output, what is the raw inference cost per case? With 30 percent overheads and 86,000 cases a year, what is the annual loaded inference cost?
3. Explain why cost per successful outcome can diverge from cost per case, and give a dispute example.
4. In the worked example, routing saved 56 percent of inference but only 1.5 percent of three-year TCO. Explain why, and state the condition under which routing becomes material.
5. Name three hidden costs in AI TCO and say which budget line each should sit in.
