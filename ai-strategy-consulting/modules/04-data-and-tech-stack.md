# Module 4 — Data and Tech Stack: Readiness, Vector Stores, LLMOps, Evaluation and Observability

## 1. Why a client cares

The gap between a convincing demo and a production system in a bank is almost entirely in this module: whether the data can be reached and trusted, whether the system can be measured, and whether it can be run, monitored and changed safely. The CIO cares because this is where the integration budget goes; the CRO cares because "how do you know it works" has to be answered with evidence; the CFO cares because the run cost of evaluation, monitoring and human review is where business cases quietly break. A consultant who can specify an evaluation plan with numeric thresholds is rarer than one who can describe an architecture, and far more valuable.

## 2. Concept and mechanism

### 2.1 Data readiness for generative and agentic AI

Classical ML readiness asked whether labelled, structured history existed. Generative AI readiness asks a different set of questions, because the model brings general capability and the bank supplies context, documents and access.

| Dimension | What to assess | Typical bank finding [ILLUSTRATIVE — composite] |
|---|---|---|
| Availability | Can the documents and data the use case needs be reached programmatically? | Policies in SharePoint, procedures in PDFs, case notes in a legacy system without an API |
| Quality | Are documents current, de-duplicated, versioned, free of contradictions? | Multiple versions of the same procedure; superseded policies still live |
| Structure and parseability | Can PDFs, scans and tables be converted to usable text? | Scanned KYC documents; tables rendered as images |
| Metadata | Do documents carry type, date, jurisdiction, product, owner, classification? | Rarely; must be added during ingestion |
| Access control and lineage | Can retrieval respect entitlements? Can every output be traced to a source version? | Entitlements exist at folder level, not document level |
| Privacy and residency | What personal data is present; where may it be processed? | Customer PII in free-text notes; residency constraints on cloud regions |
| Labelled examples | Do we have historical inputs and correct outputs to build a golden set? | Outcomes exist; rationales rarely recorded |
| Freshness and change rate | How often does the corpus change and who owns updates? | Policy changes monthly; no owner for the AI corpus |

Readiness is scored per use case, not once for the bank, because a disputes assistant and a KYB agent depend on different corpora and systems. The readiness gaps become workstreams in the roadmap and cost lines in the TCO (Module 8).

### 2.2 Vector databases and index types

A vector database stores embeddings with metadata and supports approximate nearest-neighbour (ANN) search. Options fall into three groups [PUBLIC — vendor documentation, 2024 to 2025; VERIFY]: dedicated vector databases (Pinecone, Weaviate, Milvus, Qdrant, Chroma), vector capabilities inside general databases (PostgreSQL with pgvector, Elasticsearch and OpenSearch, MongoDB Atlas, Oracle 23ai, Azure AI Search) and hyperscaler-managed services. For most banks the pragmatic choice is the vector feature of a database already approved and operated in-house, unless scale or latency demands a specialist.

Index types determine the recall-speed-memory trade-off:

- **Flat (brute force)**: exact search, linear in corpus size; fine below roughly a million vectors.
- **HNSW (Hierarchical Navigable Small World)**: graph-based ANN; high recall, fast queries, high memory; the default in most systems.
- **IVF (inverted file)**: clusters vectors, searches nearest clusters; lower memory, tunable recall.
- **Product quantisation (PQ) and scalar quantisation**: compress vectors to cut memory at some recall cost; combined with IVF or HNSW at scale.

Two design points matter more than the index: metadata filtering (jurisdiction, product, date, entitlement) applied before or alongside vector search, and hybrid search combining vector similarity with lexical (BM25) matching, which is essential for names, codes and identifiers.

### 2.3 LLMOps versus MLOps

MLOps manages the lifecycle of models the bank trains: data pipelines, feature stores, training, versioning, deployment, monitoring for drift and retraining. LLMOps manages the lifecycle of applications built on models the bank mostly does not train. The assets under management differ:

| Asset | MLOps | LLMOps |
|---|---|---|
| Model | Trained in-house; versioned weights | Third-party or open-weight; versioned by vendor; deprecations forced |
| Code | Training and inference code | Prompts, retrieval configuration, tool schemas, orchestration graphs |
| Data | Training sets, features | Corpus, chunks, embeddings, golden sets, trajectories |
| Evaluation | Accuracy, AUC, calibration on hold-out | Task success, faithfulness, hallucination rate, safety, cost, latency on golden sets |
| Monitoring | Data drift, concept drift, performance | Quality drift, prompt and model version changes, cost per task, guardrail triggers, user feedback |
| Change control | Retraining cadence | Prompt change, model upgrade, corpus update, each requiring re-evaluation |

The practical consequence: a prompt change is a release. Banks that treat prompts as configuration rather than code lose control of quality. The LLMOps pipeline should run the evaluation suite on every change to prompt, model version, retrieval configuration or corpus, and block release below thresholds.

### 2.4 Evaluation: the discipline that separates pilots from production

**Golden datasets.** A golden set is a curated collection of inputs with reference outputs or grading criteria, representative of the production distribution including edge cases and known failure types. Sources: historical cases with recorded outcomes, SME-authored examples, synthetic variations. Size: a few hundred items is usually enough to detect meaningful regressions; thousands are needed for fine-grained rates [ESTIMATE — practitioner experience]. The golden set is a governed asset: versioned, owned, refreshed as the process changes, and never used for prompt tuning without a held-out portion.

**Metric families.**

| Family | Metric | What it measures | How measured |
|---|---|---|---|
| Correctness | Exact or fuzzy match; field-level precision and recall; F1 | Did the output match the reference? | Deterministic comparison for structured outputs |
| Groundedness and faithfulness | Faithfulness score; unsupported-claim rate | Is every claim supported by the provided context? | Claim decomposition then LLM-as-judge or NLI model |
| Hallucination | Fabrication rate | Claims not supported by context or fact | Subset of faithfulness, often reported separately |
| Relevance | Answer relevance; context relevance | Does the answer address the question; was retrieved context on-topic? | LLM-as-judge; human rating |
| Retrieval | Recall at k; MRR; context precision | Did retrieval find the right passages? | Against labelled passage references |
| Task success | End-to-end completion rate | Did the agent achieve the goal? | Programmatic checks plus human review |
| Safety and compliance | Policy violation rate; PII leakage rate; injection success rate | Did guardrails hold? | Red-team sets; automated scanners |
| Operational | Latency p50 and p95; cost per task; steps per task | Is it affordable and responsive? | Telemetry |

**LLM-as-judge.** A separate model grades outputs against a rubric. Cheap and scalable, but biased: judges prefer longer answers, their own style, and the first option in pairwise comparisons; they can be inconsistent. Mitigations: calibrate the judge against a human-labelled subset and report agreement (Cohen's kappa or simple agreement rate), use rubric-based scoring rather than free-form, randomise order, and keep humans on a sampled slice permanently. Frameworks that implement these metrics include RAGAS, DeepEval, promptfoo, OpenAI Evals, LangSmith, Braintrust and the hyperscalers' evaluation services [PUBLIC — open-source and vendor documentation, 2024 to 2025; VERIFY].

**Eval harness design.** An eval harness is the automated pipeline that runs the golden set through the system, computes metrics, compares against thresholds and the previous version, and produces a report. Properties: reproducible (pinned model versions, temperature 0 where possible), fast enough to run on every change, segmented (metrics by case type, product, language), and integrated into release gating. Offline evaluation on the golden set is complemented by online evaluation: sampled production outputs graded by humans and judges, user feedback signals, and guardrail trigger rates.

### 2.5 Hyperscaler platforms

The three major platforms offer model access, hosting for open-weight models, retrieval services, agent frameworks, guardrails and evaluation tooling. Everything below is [PUBLIC — vendor documentation, 2025; VERIFY — capabilities and model availability change quarterly].

| Criterion | Microsoft Azure (Azure OpenAI, Azure AI Foundry) | AWS (Amazon Bedrock, SageMaker) | Google Cloud (Vertex AI) |
|---|---|---|---|
| Proprietary model access | OpenAI models; growing catalogue of others | Anthropic, Amazon Nova, Meta, Mistral, Cohere and others | Gemini; Anthropic and others via Model Garden |
| Open-weight hosting | Yes | Yes | Yes |
| Retrieval service | Azure AI Search | Bedrock Knowledge Bases, OpenSearch | Vertex AI Search, AlloyDB |
| Agent tooling | Agent Service, Semantic Kernel, AutoGen | Bedrock Agents, Strands | Agent Builder, ADK |
| Guardrails | Content Safety | Bedrock Guardrails | Model Armor, safety filters |
| Evaluation | AI Foundry evaluation | Bedrock evaluations | Vertex Gen AI evaluation |
| Data residency | Regional deployments; EU Data Boundary | Regional; sovereign options | Regional; sovereign controls |
| Typical bank fit | Microsoft 365 estates; OpenAI preference | AWS-first estates; multi-model preference | Data and analytics estates on BigQuery; Gemini preference |

Neutral selection criteria: existing cloud and data-platform estate, model choice and multi-model flexibility, data residency and contractual terms (zero retention, no training on customer data), identity and network integration, pricing including committed-use discounts, exit cost, and regulatory relationships (several banks have public partnerships; see Section 5). Avoid single-platform lock-in at the model layer by using an abstraction layer or gateway.

### 2.6 Observability and tracing

Observability for LLM applications means capturing, for every request: the full trajectory (prompts, retrieved chunks, tool calls and results, model responses, guardrail decisions), token counts and cost, latency per step, model and prompt versions, and user feedback. Tools include LangSmith, Langfuse, Arize Phoenix, Datadog LLM Observability, Weights and Biases Weave and the hyperscaler offerings [PUBLIC — vendor documentation, 2025; VERIFY]. OpenTelemetry conventions for generative AI are emerging as a standard for traces.

For a bank, tracing is also the audit trail: regulators and internal audit will ask to see why the system produced a specific output on a specific date. Retention, access control and PII handling for traces are design decisions, since traces contain customer data.

### 2.7 Gateway and platform layer

Mature programmes introduce an AI gateway: a single service through which all model calls pass, providing authentication, model routing, rate limiting, cost attribution by use case, logging, PII redaction, caching and policy enforcement. It is the control point that makes a portfolio of use cases governable and is where the CoE (Module 13) earns its keep.

## 3. Frameworks

### 3.1 Data readiness scorecard

Score each dimension in 2.1 from 1 (not ready) to 4 (production-ready) per use case; any dimension at 1 is a blocker, dimensions at 2 become enabler workstreams with owners and cost. Aggregate only to communicate; decide on the detail. Attribution: generic practitioner tool.

### 3.2 Evaluation pyramid

Attribution uncertain; widely used in practice. Layer 1, deterministic checks (schema, format, forbidden content, exact-match fields), run on everything, cost nothing. Layer 2, model-graded checks (faithfulness, relevance, rubric scores), run on everything offline and on a sample online. Layer 3, human expert review, run on a calibrated sample and all exceptions. The pyramid's shape is the cost model: broad and cheap at the base, narrow and expensive at the top.

### 3.3 Release gating with thresholds

Define for each metric a release threshold and a regression tolerance versus the previous version. Block release automatically on breach. Thresholds come from the risk appetite for the use case (Module 12), not from what the current system achieves.

## 4. Worked BFSI example

[ILLUSTRATIVE — composite] Evaluation plan for a sanctions-screening alert-narrative generator at a European bank. The system reads the alert (hit details, customer data, transaction context, analyst checklist) and drafts the disposition narrative for the analyst to review and sign. Volume: 220,000 level-one alerts a year, about 96% dispositioned as false positives.

### 4.1 Golden set

- 600 historical alerts with analyst-written narratives and recorded dispositions, stratified: 400 false positives across list types (sanctions, PEP, adverse media) and match types (name, alias, vessel, entity), 150 escalations, 50 true matches. Sampled from the last 18 months across all booking locations.
- 100 SME-authored edge cases: transliteration variants, partial matches on common names, hits on secondary parties, vessels and aircraft, stale list entries.
- 60 adversarial items: alerts whose free-text fields contain instruction-like content (prompt injection), PII that must not appear in the narrative, and contradictory data.
- Held-out 30% never used for prompt iteration.

### 4.2 Metrics and thresholds

| Metric | Definition | Release threshold | Regression tolerance | Method |
|---|---|---|---|---|
| Field correctness | Precision and recall of the six mandatory narrative elements (hit type, matched attributes, discriminating evidence, screening result, rationale, recommended disposition) | Precision 0.98, recall 0.97 | minus 0.01 | Deterministic extraction then comparison |
| Faithfulness | Share of narratives with zero claims unsupported by alert data | 0.97 | minus 0.01 | Claim decomposition, LLM-as-judge calibrated to human kappa 0.8 or higher |
| Unsupported-claim rate | Unsupported claims per 100 narratives | 2.0 or lower | plus 0.5 | Same |
| Disposition agreement | Agreement between recommended and recorded disposition on false-positive items | 0.95 | minus 0.02 | Deterministic |
| True-match sensitivity | Share of the 50 true matches where the narrative recommends escalation | 1.00 (zero misses) | none | Deterministic; any miss blocks release |
| PII leakage | Narratives containing PII beyond the permitted fields | 0 per 1,000 | none | Scanner plus human check |
| Injection resistance | Adversarial items where output follows injected instruction | 0 of 60 | none | Programmatic |
| Analyst edit distance | Median proportion of narrative text changed by analyst before sign-off (online) | 0.15 or lower by month three | plus 0.05 | Telemetry |
| Latency p95 | Time from alert open to draft available | 8 seconds | plus 2 | Telemetry |
| Cost per narrative | Blended inference cost | USD 0.04 [ESTIMATE — VERIFY] | plus 20% | Telemetry |

### 4.3 Online evaluation and HITL

Every narrative is reviewed by an analyst (level 1 autonomy, "assist"). Additionally, 3% of signed narratives are sampled weekly for second-line QA with a rubric; LLM-as-judge faithfulness is computed on 100% of production output and alerts above the threshold are routed to QA. Analyst edits are captured as feedback and fed into the golden set quarterly after SME review.

### 4.4 Interpreting the thresholds for the client

The zero-miss threshold on true matches is a risk-appetite statement, not a statistical one: a narrative that talks a true match down to a false positive is the failure the regulator will ask about. The faithfulness threshold at 0.97 accepts that roughly one narrative in 33 will contain an unsupported claim before analyst review, which is why the system is at assist level and not above. The business value, analyst time saved per alert, is estimated at 6 minutes of a 22-minute average [ESTIMATE], or roughly 22,000 hours a year, about 12 FTE. The evaluation infrastructure and QA sample cost perhaps 1.5 FTE and USD 120,000 of tooling and engineering a year [ESTIMATE — assumption]. The client should see that ratio explicitly.

So what for the client: "The eval plan is the licence to operate. Without the zero-miss test and the faithfulness threshold, the second line will not sign, and without the online edit-distance metric, you cannot prove the benefit."

## 5. Real-world case

[PUBLIC — Morgan Stanley and OpenAI, Sept 2023 and later coverage; VERIFY] Morgan Stanley's adviser assistant is publicly described as having been released only after an evaluation process in which advisers and experts graded answers, with the firm reporting continuous evaluation as part of its governance; the firm's head of analytics and data described building an evaluation framework before scaling. It is the most-cited example of evaluation discipline in financial services.

[PUBLIC — HSBC and Google Cloud, June 2023; VERIFY] HSBC's AML AI deployment required the bank to demonstrate model performance, explainability and monitoring to regulators across jurisdictions. The reported 60% reduction in alerts and two to four times increase in identified suspicious activity are, in evaluation terms, a precision improvement at maintained or improved recall. The case shows that evaluation evidence is what unlocks regulatory acceptance of a replacement for rules.

[PUBLIC — Deutsche Bank and Google Cloud, Dec 2020; Lloyds Banking Group and Google Cloud, 2024 to 2025; VERIFY] Several large banks have announced strategic hyperscaler partnerships that include AI platforms, illustrating that platform choice in banking is often made at the enterprise level before any use case is selected. A consultant should establish that constraint in week one.

## 6. Consultant language

> "The golden set is a governed asset. It has an owner, a version and a held-out portion, and every release runs against it."

Use when establishing the evaluation workstream.

> "We measure faithfulness separately from correctness. A correct answer from the wrong source is a control failure."

Use with model-risk and compliance.

> "Every prompt change is a release. The eval harness gates it."

Use with the technology team and the CoE.

> "Data readiness is per use case, not per bank. The gaps become enabler workstreams with owners and costs."

Use in roadmap discussions.

> "Traces are the audit trail. We design their retention and access with the data-protection office, not after the fact."

Use with the DPO and internal audit.

## 7. Common mistakes juniors make

- Presenting a single accuracy number without stating the denominator, the reference and the method.
- Building the golden set from the same cases used to tune the prompt.
- Using LLM-as-judge without calibrating it against human labels.
- Treating the vector database choice as the architecture decision when chunking, metadata and hybrid search matter more.
- Assuming the bank's data is ready because it exists.
- Forgetting that traces contain customer data.
- Setting thresholds at whatever the pilot achieved rather than at what the risk appetite requires.
- Comparing hyperscalers on model benchmarks rather than on estate fit, residency, contract terms and exit cost.

## 8. Interview questions with model answers

**Q1. How would you evaluate a GenAI system before putting it in front of customers?**

I would build a layered evaluation. First, a golden set of several hundred representative inputs with reference outputs or grading rubrics, stratified by customer segment, intent and risk, plus adversarial items for prompt injection, PII and out-of-scope requests, with a held-out portion. Second, metrics in families: correctness, faithfulness to the knowledge base, hallucination rate, relevance, safety and policy violations, and operational metrics such as latency and cost. Third, a harness that runs on every change to prompt, model, retrieval or corpus, with release thresholds set by risk appetite, including zero tolerance on specific failures like misstating fees or regulatory terms. Fourth, online evaluation: sampled human review, LLM-as-judge on all output, user feedback, and guardrail trigger rates, with drift alerts. Finally, I would specify the autonomy level and the human-review pattern that the measured error rate justifies. The customer-facing decision is made on evidence from this process, not on a demo.

**Q2. What is the difference between MLOps and LLMOps and why does it matter to a bank?**

MLOps manages models the bank trains: data, features, training, validation, deployment, drift monitoring, retraining. LLMOps manages applications built on models the bank does not train: prompts, retrieval configuration, tool schemas, orchestration, golden sets and the model version supplied by a vendor. It matters for three reasons. Change control: in LLMOps a prompt edit or a vendor model upgrade can change behaviour as much as retraining would, so each must be gated by evaluation. Dependency: vendors deprecate models on their schedule, so the bank needs a re-evaluation and migration process it does not control the timing of. Governance: model-risk frameworks such as SS1/23 were written for trained models; banks must decide how a third-party foundation model, its prompts and its guardrails map onto model inventory, validation and monitoring. The operating consequence is a platform team that owns the gateway, the eval harness and the release process across use cases.

**Q3. A client asks whether to pick Azure, AWS or Google for GenAI. How do you answer?**

I would reframe from "which is best" to "which fits". The decision criteria are the existing cloud and data estate, because integration cost dominates; model choice and whether the client wants multi-model flexibility or a single-vendor relationship; data residency and contractual terms, specifically zero retention and no training on the bank's data; identity, network and security integration; pricing with committed-use discounts; exit cost; and the regulator's familiarity with the platform in that jurisdiction. In practice banks with Microsoft 365 estates lean to Azure, AWS-first banks to Bedrock for its multi-model catalogue, and banks with Google data platforms to Vertex. I would recommend an AI gateway and abstraction layer so the model choice is not locked, and I would flag that platform capabilities change quarterly, so any comparison is dated the day it is written. The client's enterprise cloud strategy usually settles this before the AI programme starts, and the consultant's job is to confirm that constraint early rather than run a beauty parade.

## 9. Self-check quiz

1. List five data-readiness dimensions and give, for each, one typical gap found in a bank.
2. Explain the difference between HNSW and IVF indexes and say why hybrid search matters for sanctions and KYC content.
3. Name three biases of LLM-as-judge and the mitigation for each.
4. In the sanctions eval plan, why is the true-match sensitivity threshold set at 1.00 with no regression tolerance, while faithfulness is set at 0.97? Explain in risk-appetite terms.
5. A proposed GenAI system will cost USD 0.04 per narrative at 220,000 narratives a year, plus 1.5 FTE for QA at GBP 70,000 loaded and USD 120,000 of tooling. Compute the annual run cost in USD (assume GBP 1 = USD 1.27 [ESTIMATE — VERIFY]) and compare it with the 12 FTE benefit at GBP 65,000 loaded. What is the ratio?
