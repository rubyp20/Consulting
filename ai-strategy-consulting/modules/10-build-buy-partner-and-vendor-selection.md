# Module 10 — Build vs Buy vs Partner, Model Selection and RFP Evaluation

## 1. Why a client cares

The sourcing decision locks in cost structure, speed, control and regulatory exposure for three to five years. Buying a packaged AI product gets a bank to a pilot in weeks but can leave it unable to explain the model to its regulator or to switch vendors when pricing changes. Building gives control but needs scarce talent and takes longer. Partnering shares risk but blurs accountability. Boards increasingly ask a second question: how exposed are we to a single model provider, and what happens when that provider changes its model, its terms or its price.

## 2. Concept and mechanism

### 2.1 The layered stack and where the decision actually sits

"Build vs buy" is not one decision. An AI solution in a bank is a stack, and the sourcing answer differs at each layer.

| Layer | What it contains | Typical bank posture | Why |
|---|---|---|---|
| Foundation model | The LLM or ML model weights and inference | Buy (API) or buy (open-weight, self-hosted); almost never build | Training frontier models costs hundreds of millions of dollars; no bank has the data or the rationale |
| Platform | Model gateway, orchestration, vector store, evaluation harness, observability, guardrails, prompt and agent registry | Buy hyperscaler or ISV components, assemble in-house | Commodity components, but the assembly and the control plane are a differentiating capability |
| Application | The agent workflows, prompts, tools, business rules, integration to core systems | Build for differentiating processes; buy for commodity functions | This layer encodes the bank's process knowledge, controls and risk appetite |
| Services | Design, integration, change, run | Partner for surge capacity and specialist skills; retain product ownership | Capability transfer matters more than labour arbitrage |

The consultant's job is to force the client to make the decision layer by layer rather than as a single "we are an X shop" statement.

### 2.2 Decision logic

Five criteria decide the posture at the application layer, where most of the debate happens:

1. **Differentiation.** Does the process create competitive advantage or regulatory risk that is specific to this bank? Dispute resolution logic tied to a bank's own card portfolio and network rules is differentiating; invoice OCR is not.
2. **Data sensitivity and residency.** Can the data leave the bank's environment? If customer transaction data or KYC documents must stay in-region and on controlled infrastructure, a SaaS product that processes data in a vendor cloud may be excluded or require a private deployment.
3. **Speed to value.** How fast must the client show results, and what is the cost of delay? Buy wins where the use case is commodity and the client's engineering capacity is committed elsewhere.
4. **Talent.** Does the bank have, or can it hire and retain, the engineering, LLMOps and model risk skills to build and run? If not, building creates a key-person dependency that the regulator will treat as operational risk.
5. **Lock-in and exit.** How expensive is it to switch? Lock-in is highest when prompts, evaluation data, fine-tuned models and workflow logic live inside a vendor's proprietary format with no export.

A compact rule set [ILLUSTRATIVE — practitioner heuristic]:

| Differentiating? | Data sensitive? | Talent available? | Posture |
|---|---|---|---|
| Yes | Yes | Yes | Build on bought platform |
| Yes | Yes | No | Partner to build, with capability transfer and IP ownership |
| Yes | No | Any | Build or partner |
| No | Yes | Any | Buy with private deployment or hyperscaler-native service |
| No | No | Any | Buy SaaS |

### 2.3 Model selection criteria

Model choice is now a portfolio decision: most production systems route different tasks to different models. Criteria to evaluate per task type:

- **Capability on domain evaluations.** Public benchmarks (MMLU, GPQA, SWE-bench and similar) are weak predictors of performance on a bank's own documents and tasks. The decisive evidence is the model's score on the client's golden dataset for the specific task (see Module 4). A model that leads public leaderboards can underperform a smaller model on structured extraction from a particular document type.
- **Cost per task.** Input and output token prices, with caching and batch discounts, multiplied by the realistic token profile of the task, including retries and tool-call overhead. Compare cost per completed task, not price per million tokens.
- **Latency.** Time to first token and tokens per second matter for interactive use; throughput and rate limits matter for batch. Agentic workflows multiply latency because each step is a model call.
- **Context window and long-context quality.** A large window is not the same as reliable use of information in the middle of it; test retrieval accuracy at the real document lengths.
- **Tool-calling reliability.** Share of calls where the model emits a schema-valid tool call with correct arguments. This is the dominant quality driver for agents and varies materially between models.
- **Instruction following and refusal behaviour.** Over-refusal on legitimate financial-crime content (for example, describing a laundering typology) is a real operational problem.
- **Data residency, retention and training-use terms.** Where is inference served, is prompt data retained, is it used for training? Enterprise tiers normally offer zero retention; verify contractually [VERIFY — vendor terms change].
- **Deployment options.** API only, hyperscaler-hosted, virtual private cloud, or open-weight self-hosted. Self-hosting open-weight models (for example Llama, Mistral, Qwen families [VERIFY — model availability and licences change]) gives residency control and predictable cost at the price of operational burden.
- **Licensing for open-weight models.** Read the licence: some restrict commercial use above a user threshold or require attribution; some are genuinely permissive.
- **Model lifecycle.** Deprecation notice periods, versioning and the ability to pin a version. A silent model update can change behaviour and invalidate an evaluation and a model risk approval.
- **Safety and security posture.** Prompt-injection resistance, jailbreak behaviour, content filters, and the vendor's own red-teaming disclosures.

### 2.4 Vendor selection and RFP evaluation

A bank RFP for an AI product or platform should score six families of criteria. Weights below are a defensible starting point [ILLUSTRATIVE — composite; adjust to the client's priorities]:

| Family | Weight | Examples of criteria |
|---|---|---|
| Functional fit | 25% | Coverage of the use case; accuracy on the client's test set; workflow and HITL features; configurability without vendor change requests |
| Non-functional | 15% | Latency, throughput, availability SLA, scalability, integration options (APIs, event hooks), observability exposed to the client |
| Security, compliance, model risk | 20% | Data residency; retention and training-use terms; certifications (ISO 27001, SOC 2, ISO/IEC 42001 [VERIFY]); explainability artefacts; audit logs; support for the bank's model validation; EU AI Act provider documentation |
| Commercials | 15% | 3-year TCO on the client's volume profile; pricing model (per seat, per transaction, per token, platform fee); price-change protections; professional services rates |
| Roadmap and viability | 10% | Financial stability; customer base in regulated FS; roadmap alignment; model-provider dependency and multi-model support; reference calls |
| Exit and portability | 15% | Export of prompts, configurations, evaluation data, fine-tuned weights, logs; transition assistance; termination for convenience; escrow where relevant |

Process: issue the RFP with the client's anonymised test set and require vendors to run it in a supervised proof of value; score blind where possible; separate commercial scoring from functional scoring so price does not colour capability judgement; weight exit heavily because it is where buyers regret most.

### 2.5 Contract clauses that matter for AI

| Clause | Why it matters | What to ask for |
|---|---|---|
| Data use and training | Default terms may allow the vendor to use prompts and outputs to improve models | Explicit prohibition on training use; zero or minimal retention; sub-processor list |
| Model change notification | A model upgrade can alter behaviour and break the bank's validation | Minimum 90 days' notice of model version changes; ability to pin a version for a defined period; re-validation support [ESTIMATE — negotiable] |
| Accuracy and performance SLAs | Standard SLAs cover uptime, not quality | Agreed quality metrics on the client's test set, measured periodically, with service credits or exit rights on sustained breach |
| Indemnity and IP | Output may infringe third-party rights or produce harmful content | IP indemnity for outputs; clarity on who owns prompts, fine-tuned weights, evaluation data (the bank should) |
| Liability | Regulatory fines and customer harm from model errors | Liability caps that reflect regulatory exposure, not just fees paid; carve-outs for data breach and confidentiality |
| Regulatory cooperation | Supervisors will ask for documentation and may inspect | Obligation to provide documentation (model cards, risk assessments, EU AI Act technical documentation where the vendor is the provider), audit rights, and support for regulator requests |
| Exit and portability | Lock-in | Export formats, transition services, data deletion certification |
| Price protection | Token prices move; seat prices creep | Caps on annual increases; most-favoured-customer or benchmark clauses where obtainable |
| Operational resilience | DORA in the EU, PRA outsourcing rules in the UK [VERIFY — regulatory scope] | Resilience testing, incident notification timelines, exit plans, concentration risk disclosure |

## 3. Frameworks

### 3.1 Layered sourcing decision (practitioner framework; attribution uncertain, widely used)

Apply the five criteria of 2.2 at each layer of the stack in 2.1 separately, document the posture per layer, and then test the overall architecture for coherence (for example, a bought application that cannot use the bank's chosen model gateway is an integration problem, not a product problem).

### 3.2 Weighted scoring for RFP evaluation (generic method)

Steps: define criteria and sub-criteria; assign weights that sum to 100% with stakeholder sign-off before proposals are opened; define a 1–5 scoring scale with written anchors; score independently then calibrate in a panel; multiply and sum; run a sensitivity on weights to check the ranking is stable; document rationale for audit. The sensitivity step is the one juniors skip and procurement auditors look for.

### 3.3 Concentration and exit risk lens (regulatory origin: EBA outsourcing guidelines 2019, UK PRA SS2/21 outsourcing and third-party risk management 2021, EU DORA applicable from Jan 2025 [VERIFY])

For any material AI vendor, the bank must assess criticality, concentration (how many processes depend on this vendor or on the model provider behind it), substitutability and exit plan. Build this into the RFP so the regulatory analysis is done before signature.

### 3.4 Total cost of ownership comparison (TCO concept: Gartner, Bill Kirwin, 1987)

Compare options on the same volume profile over the same horizon with the same cost categories (licence or usage, infrastructure, integration, internal run team, change, validation, exit). See Module 8 for the categories.

## 4. Worked BFSI example

### 4.1 Context

[ILLUSTRATIVE — composite] A European universal bank needs an AML alert-narrative tool: for each transaction-monitoring alert escalated to level 2, the tool assembles the customer, transaction and screening context, drafts the investigation narrative and the suspicious activity report (SAR) rationale, and cites the evidence. Volume: 180,000 level-2 alerts a year. Analysts currently spend 55 minutes per narrative. Data must remain in the EU. The bank has a small platform team and a hyperscaler contract already in place.

Options evaluated:

- **Vendor A:** specialist RegTech SaaS with a pre-built AML investigation copilot; EU-hosted tenant; proprietary model orchestration with a choice of two LLM providers.
- **Vendor B:** the bank's existing transaction-monitoring vendor's add-on module; deepest integration; single LLM provider; narrative templates fixed.
- **Vendor C:** a horizontal "enterprise agent platform" that would need the bank to configure the AML workflow itself; strong tooling; US-headquartered with EU hosting option.
- **Build:** in-house application on the bank's hyperscaler platform using the model gateway, with a systems integrator partner for the first nine months.

### 4.2 Functional test on the bank's data

All four options ran a supervised proof of value on 400 historical alerts with analyst-written narratives as reference. Metrics: narrative completeness (share of required elements present), factual faithfulness to source records (checked by analysts), and analyst edit time.

| Option | Completeness | Faithfulness | Analyst edit time (min) | Functional score (1–5) |
|---|---|---|---|---|
| Vendor A | 91% | 96% | 14 | 4.5 |
| Vendor B | 84% | 97% | 22 | 3.5 |
| Vendor C (configured in PoV) | 88% | 93% | 18 | 3.5 |
| Build (prototype in PoV) | 89% | 95% | 16 | 4.0 |

[ILLUSTRATIVE — composite]

### 4.3 Scored evaluation

Scores 1–5; weights from 2.4.

| Criterion (weight) | Vendor A | Vendor B | Vendor C | Build |
|---|---|---|---|---|
| Functional fit (25%) | 4.5 | 3.5 | 3.5 | 4.0 |
| Non-functional (15%) | 4.0 | 4.5 | 4.0 | 3.5 |
| Security, compliance, model risk (20%) | 4.0 | 4.5 | 3.0 | 4.5 |
| Commercials (15%) | 3.0 | 3.5 | 3.5 | 3.5 |
| Roadmap and viability (10%) | 3.5 | 4.0 | 4.0 | 3.0 |
| Exit and portability (15%) | 2.5 | 2.0 | 3.5 | 5.0 |

Weighted totals:

- Vendor A: 4.5×0.25 + 4.0×0.15 + 4.0×0.20 + 3.0×0.15 + 3.5×0.10 + 2.5×0.15 = 1.125 + 0.60 + 0.80 + 0.45 + 0.35 + 0.375 = **3.70**
- Vendor B: 0.875 + 0.675 + 0.90 + 0.525 + 0.40 + 0.30 = **3.68**
- Vendor C: 0.875 + 0.60 + 0.60 + 0.525 + 0.40 + 0.525 = **3.53**
- Build: 1.00 + 0.525 + 0.90 + 0.525 + 0.30 + 0.75 = **4.00**

Weight sensitivity: if exit weight is cut to 5% and functional raised to 35%, Vendor A moves to 3.90 and Build to 3.90, a tie. If security weight rises to 30% and commercials fall to 5%, Build leads at 4.10 against Vendor B at 3.78. The Build ranking is robust except under a strongly functional-only weighting, which the panel documented.

### 4.4 Three-year cost comparison

[ESTIMATE — order of magnitude, VERIFY all pricing] EUR millions; 180,000 alerts a year; horizon three years from contract.

| Cost line | Vendor A | Vendor B | Vendor C | Build |
|---|---|---|---|---|
| Licence / platform fees | 2.70 (EUR 5 per alert) | 1.95 (module fee + per-alert) | 1.50 (platform seats + usage) | 0.45 (gateway, vector store, observability) |
| Model inference (pass-through or direct) | Included | Included | 0.60 | 0.55 |
| Integration and configuration | 0.60 | 0.30 | 1.10 | 1.40 (incl. SI partner) |
| Internal run team | 0.45 (1 FTE × 3 years) | 0.30 | 0.90 (2 FTE) | 1.35 (3 FTE) |
| Model risk validation and evals | 0.30 | 0.25 | 0.35 | 0.40 |
| Change and training | 0.25 | 0.20 | 0.25 | 0.25 |
| Exit provision (Year 3) | 0.30 | 0.40 | 0.15 | 0.05 |
| Total 3-year TCO | 4.60 | 3.40 | 4.85 | 4.45 |

Inference build-up for Build: 180,000 alerts × ~60,000 tokens per narrative (context assembly, drafting, citation checks, retries) = 10.8bn tokens a year; at a blended EUR 0.017 per thousand tokens using a mid-tier model for assembly and a frontier model for the final narrative, ≈ EUR 0.18m a year, EUR 0.55m over three years [ESTIMATE — order of magnitude, VERIFY].

### 4.5 Recommendation and reasoning

Vendor B is cheapest and the deepest-integrated but scores lowest on exit (narratives and configuration locked into the monitoring vendor, and the bank is already concentrated on that vendor for monitoring itself), and its narrative quality required the most analyst editing. Vendor A has the best out-of-box quality but a per-alert pricing model that scales with volume and weak portability. Build scores highest overall, is mid-table on cost, and gives the bank ownership of prompts, evaluation data and workflow, which the compliance function valued because the SAR narrative is a regulator-facing artefact the bank must be able to explain in its own terms.

Recommendation: Build on the existing hyperscaler platform with the SI partner for nine months and explicit capability transfer, and retain Vendor A as a benchmark through a 12-month option. Benefit side for context: 180,000 alerts × (55 − 16) minutes = 117,000 analyst hours a year ≈ 73 FTE equivalents; booked at 40% after haircut and headcount bridge ≈ EUR 2.0m a year [ILLUSTRATIVE — composite]. All four options pay back inside three years; the decision therefore rests on control, explainability and exit rather than cost. That is the "so what" for the client: when the benefit dwarfs the cost difference, choose on risk and control.

## 5. Real-world case

**Morgan Stanley and OpenAI, 2023–2024** [PUBLIC — Morgan Stanley press releases Sept 2023 and June 2024; VERIFY adoption figures]. Morgan Stanley took a buy-the-model, build-the-application posture: it licensed GPT-4 through a strategic relationship with OpenAI and built its own "AI @ Morgan Stanley Assistant" on top of its proprietary research and wealth-management content for roughly 16,000 advisers, followed by "Debrief" for meeting summaries in June 2024. Reported adoption among adviser teams was around 98%. The lesson for sourcing is that the differentiating asset was the firm's curated content library and its evaluation discipline (the firm publicly described building evaluation frameworks with advisers and compliance), not the model. The model was bought; the retrieval corpus, prompts, evaluation and workflow were built.

**JPMorgan Chase LLM Suite, 2024** [PUBLIC — press reporting 2024; VERIFY]. JPMorgan rolled out LLM Suite to around 200,000 employees as an internal platform that fronts external models, which illustrates the platform-layer decision: build the gateway and control plane, buy the models behind it, so that models can be swapped and usage governed centrally.

**NatWest, 2024–2025** [PUBLIC — NatWest and IBM announcements 2024; OpenAI collaboration Mar 2025; VERIFY]. NatWest's Cora+ built on IBM watsonx and its later OpenAI collaboration show a multi-provider posture at the model layer for a customer-facing assistant, which reduces single-provider concentration risk.

## 6. Consultant language

> "This is not one build-or-buy decision; it is four decisions, one per layer of the stack."

Use at the start of any sourcing discussion to reframe the debate.

> "We score on the client's own test set, not on public leaderboards."

Use when a vendor or an internal sponsor leads with benchmark claims.

> "We weight exit at 15% because that is where buyers of AI products have regretted most."

Use when procurement proposes a cost-heavy weighting.

> "Model change notification and version pinning are model-risk controls, not commercial nice-to-haves."

Use with the CRO and model risk team when reviewing contracts.

> "When the benefit dwarfs the cost difference between options, we choose on control, explainability and exit."

Use when presenting a recommendation that is not the cheapest.

## 7. Common mistakes juniors make

- Treating build vs buy as a single enterprise-level choice rather than a per-layer decision.
- Ranking models on public benchmarks instead of the client's own golden dataset for the specific task.
- Comparing price per million tokens instead of cost per completed task including retries and tool-call overhead.
- Letting commercial scores leak into functional scoring by running them in the same panel.
- Ignoring exit and portability, then discovering prompts, evaluation data and configurations cannot be exported.
- Accepting default data-use terms that permit training on the bank's prompts.
- Not asking for model change notification and version pinning, so a silent upgrade invalidates validation.
- Choosing the incumbent vendor's module without assessing concentration risk under outsourcing and resilience rules.
- Scoping the SI partner for delivery without capability transfer, creating permanent dependency.
- Running a proof of value on vendor-selected data rather than the bank's representative, anonymised sample.

## 8. Interview questions with model answers

**Q1. A bank CIO says "we are a buy-not-build shop" and wants to purchase an end-to-end agentic KYB product. How do you respond?**

Model answer. I would accept the principle at the foundation-model and platform layers, where buying is right for almost every bank, and challenge it at the application layer, where the KYB workflow encodes the bank's risk appetite, its policies and its regulator-facing decisions. I would apply five criteria: differentiation (KYB decisions are supervised and bank-specific, so high), data sensitivity (customer documents and UBO data, high), speed (buying gets a pilot in weeks, which is real value), talent (if the bank lacks LLMOps and model risk skills, building alone is risky), and exit (an end-to-end product tends to lock prompts, policies and case data into a proprietary format). My likely recommendation is a hybrid: buy the platform components and possibly a document-extraction product, build or co-build the KYB agent workflow on the bank's own gateway with a partner under a capability-transfer arrangement, and keep the policy logic in a rules layer the bank owns. I would also run a supervised proof of value on the bank's own anonymised cases before any decision, because packaged accuracy claims rarely survive contact with a bank's document mix. Finally, I would remind the CIO that under outsourcing and operational resilience rules the bank remains accountable for the decision regardless of who built the tool.

**Q2. How would you structure the evaluation criteria and weights for an RFP for a GenAI customer-service platform, and how would you defend the weights?**

Model answer. Six families: functional fit around 25%, non-functional 15%, security and compliance including model risk 20%, commercials 15%, roadmap and viability 10%, exit and portability 15%. I would defend them on three grounds. First, functional fit is capped at a quarter because every shortlisted vendor will pass a basic functional bar; the differentiation among them is smaller than the differentiation on risk and exit. Second, security, compliance and model risk at a fifth reflects that a customer-facing GenAI system is a conduct-risk surface: data residency, retention, training-use terms, audit logs and support for the bank's validation are gating. Third, exit at 15% reflects observed buyer regret: prompts, conversation data and configurations are the bank's intellectual property and must be exportable. I would get the weights signed off by the sponsor, risk and procurement before proposals open, use written scoring anchors, score functional criteria on the bank's own test set in a supervised proof of value, keep commercial scoring in a separate panel, and run a weight-sensitivity analysis to show whether the ranking is stable. If it flips under plausible alternative weights, that is a decision for the steering committee, not for the scoring model.

**Q3. What contract terms would you insist on with a foundation-model provider for a bank, and why?**

Model answer. Five groups. Data terms: zero or minimal retention, explicit prohibition on using prompts or outputs for training, named sub-processors and regional inference so data stays in-jurisdiction. Model lifecycle: minimum notice of model version changes, the ability to pin a version for a defined period, and deprecation timelines long enough to re-validate under the bank's model risk framework; a silent model change can invalidate an approved validation. Quality and resilience: standard uptime SLAs plus agreed quality metrics on the bank's test set measured periodically, incident notification timelines consistent with DORA and PRA outsourcing expectations [VERIFY scope], and concentration-risk disclosure. Liability and IP: output IP indemnity, clarity that prompts, fine-tunes and evaluation data belong to the bank, and liability caps that reflect regulatory exposure. Exit: export of all configurations and logs, transition assistance, deletion certification. I would also ask for regulatory cooperation obligations, because supervisors increasingly expect banks to produce vendor documentation on request, and for price protection such as caps on annual increases given how quickly token prices and packaging change [VERIFY].

## 9. Self-check quiz

1. Name the four layers of the AI stack and state the typical bank sourcing posture at each.
2. Why is scoring models on the client's golden dataset preferred over public benchmarks? Give two reasons.
3. In the worked example, recompute Vendor A's weighted score if exit weight falls to 5% and functional fit rises to 35%. Does Vendor A overtake Build?
4. List five contract clauses specific to AI vendors and the risk each addresses.
5. A vendor offers per-alert pricing of EUR 5 at 180,000 alerts a year. Volume is expected to grow 15% a year. What is the three-year licence cost, and what pricing protection would you seek?
