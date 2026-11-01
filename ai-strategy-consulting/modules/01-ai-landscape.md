# Module 1 — The AI Landscape: Rules Engines, ML, Deep Learning, GenAI and Agentic AI

## 1. Why a client cares

Most failed AI programmes in banks fail at tool selection, not at model quality: a generative model was used where a decision table would do, or a rules engine was stretched over a problem whose inputs vary too much. The client's CRO, COO and CFO each care for a different reason: reproducibility and auditability, run cost and operational risk, and whether the benefit case survives the choice of technology. A consultant who can say "this step is a rules problem, this step is a classification problem, and only this step needs a language model" saves the client millions and earns credibility in the first meeting.

## 2. Concept and mechanism

### 2.1 Five classes of technology, defined by how the decision logic is produced

The classes differ in one fundamental respect: who writes the logic and how it is represented.

| Class | How logic is produced | Representation | Determinism | Typical input |
|---|---|---|---|---|
| Rules engine | Humans encode rules explicitly | Decision tables, decision trees, business rules (DMN, Drools, FICO Blaze) | Fully deterministic | Structured fields |
| Classical ML | Learned from labelled or unlabelled data | Parameters of a statistical model (logistic regression, gradient-boosted trees, random forests, clustering) | Deterministic at inference for a fixed model; learned, not authored | Structured tabular features |
| Deep learning | Learned from large data via multi-layer neural networks | Millions to billions of weights | Deterministic at inference (given fixed weights and no sampling) | Images, audio, sequences, text, graphs |
| Generative AI (LLMs and multimodal models) | Pre-trained on web-scale corpora, then aligned | Transformer weights, 10^9 to 10^12 parameters | Stochastic by default (sampling); can be made near-deterministic with temperature 0 but still not reproducible across versions | Natural language, documents, images, code |
| Agentic AI | Generative model placed in a loop with tools, memory and a planning procedure | Model plus orchestration code plus tool schemas | Stochastic and path-dependent across multiple steps | Goals expressed in language, with access to systems |

### 2.2 Rules engines

A rules engine evaluates explicit conditions against structured data and fires actions. Modern implementations use the Rete algorithm (Forgy, 1982) or sequential evaluation, and are specified in standards such as the OMG Decision Model and Notation (DMN). Their properties are precisely what a regulated bank wants for a decision of record: every outcome traces to a rule, rules are version-controlled, changes go through governance, and the same input always yields the same output.

Their limits are equally precise. Rules do not generalise to inputs not anticipated by the author. Rule sets grow combinatorially as exceptions accumulate (a mature payments-operations rule base of several thousand rules is common in large banks [ILLUSTRATIVE — composite]). Rules cannot read free text, interpret a scanned document, or weigh weak signals. When the problem has those characteristics, the rules engine is kept for the decision of record and another class of technology supplies the inputs.

### 2.3 Classical machine learning

Classical ML learns a mapping from features to a target from historical data. In banking the dominant algorithms are logistic regression (still the backbone of many regulatory credit scorecards because of monotonicity and explainability), gradient-boosted decision trees (XGBoost, LightGBM, CatBoost) for fraud and propensity, and clustering or anomaly detection for AML segmentation. Key properties:

- **Requires labelled history** for supervised tasks: fraud needs confirmed fraud labels; default prediction needs observed defaults over a performance window.
- **Features are engineered** by humans (velocity counts, ratios, aggregations). Feature engineering is often where most value and most model risk sits.
- **Explainability is tractable.** Coefficients, feature importances, SHAP values (Lundberg and Lee, 2017) and reason codes satisfy adverse-action notice requirements in credit.
- **Model risk management applies squarely.** SR 11-7 (US Federal Reserve and OCC, 2011) and the UK PRA SS1/23 (effective May 2024) were written with these models in mind.

Classical ML is the correct tool when you have structured features, meaningful labelled history, a stable target definition and a need to explain individual decisions. It is a poor tool when the input is unstructured or the target shifts faster than you can re-label.

### 2.4 Deep learning

Deep learning uses neural networks with many layers to learn representations directly from raw or lightly processed data. Convolutional networks for images (cheque and ID document processing), recurrent and later transformer architectures for sequences (transaction sequences, text), and graph neural networks for networks (mule-account detection, beneficial-ownership graphs). In banking before 2022, deep learning was used mostly for perception tasks: OCR, signature verification, document classification, and some fraud sequence models.

Properties the client needs to understand: deep models need large data, are expensive to train, are harder to explain (post-hoc methods only), and can be brittle under distribution shift. Their advantage is handling raw unstructured inputs that no feature engineer could encode.

### 2.5 Generative AI and large language models

A large language model (LLM) is a transformer network (Vaswani et al., 2017) trained to predict the next token over a web-scale corpus, then aligned with instruction tuning and reinforcement learning from human feedback (Ouyang et al., 2022). The consequence of this training objective is the key consultant insight: the model has learned a very good statistical model of language and of much of the knowledge expressed in text, but it has not learned to be correct. It produces plausible continuations. Correctness is an emergent and partial property, which is why grounding (retrieval), constraints (structured outputs, tool calls) and evaluation are non-negotiable in banking deployments.

Three capabilities matter commercially:

1. **Understanding and transforming unstructured text**: summarising, extracting, classifying, translating, drafting. This is where most banking value sits today.
2. **Reasoning in language**: multi-step inference over provided facts, improved by chain-of-thought prompting (Wei et al., 2022) and by "reasoning" model variants that generate internal deliberation tokens before answering.
3. **Code and structured output generation**: producing JSON, SQL, or code that another system executes.

What LLMs are not: they are not databases (they do not reliably recall specific facts), not calculators (arithmetic should be delegated to tools), and not deterministic decision engines.

### 2.6 Agentic AI

An agent is a generative model placed in a loop: it observes a state, decides on an action (often a tool call), observes the result, and continues until a goal is met or a stopping condition triggers. Module 3 covers the mechanics. For tool selection, the defining properties are:

- **Multi-step and path-dependent.** Errors compound across steps; a 95% per-step reliability over 10 dependent steps yields roughly 60% end-to-end success (0.95^10 = 0.60).
- **Acts on systems**, not just on text. This introduces operational risk, authorisation and reversibility questions.
- **Expensive**: multiple model calls per task, often with large contexts.
- **Valuable when the path cannot be scripted in advance**: the next step depends on what was found, and the branching is too wide for a flowchart.

### 2.7 Combining the classes: the production pattern

Almost no production system in banking is one class alone. The dominant pattern [ILLUSTRATIVE — composite of typical architectures] is:

- Perception layer (deep learning or LLM): read documents, emails, call transcripts into structured facts.
- Judgement layer (classical ML or LLM with retrieval): score, classify, recommend.
- Decision of record (rules engine): apply policy deterministically to structured inputs.
- Action layer (agentic or RPA): execute across systems with human gates where irreversibility or regulatory exposure demands them.

The consultant's job is to map each process step to a layer and to justify each boundary.

## 3. Frameworks

### 3.1 Tool-selection decision table [ILLUSTRATIVE — practitioner framework, attribution: composite of common practice; no single originator]

Score the task on each characteristic, then read across.

| Characteristic | Favours rules | Favours classical ML | Favours deep learning | Favours LLM | Favours agentic |
|---|---|---|---|---|---|
| Input structure | Fully structured | Structured features | Raw images, audio, sequences | Free text, documents | Mixed, across systems |
| Logic knowable in advance | Yes, fully | Partly, learnable from history | No, perceptual | Partly, expressed in language | No, path emerges |
| Need for determinism | Absolute (decision of record) | High | Medium | Low to medium (tolerate variance) | Low, with gates |
| Explainability requirement | Rule trace | Reason codes, SHAP | Post-hoc only | Citations, rationale text | Step log, audit trail |
| Labelled history | None needed | Essential | Large volumes | Not needed (zero/few-shot) | Not needed, but evals needed |
| Volume and latency | Millions per second | Millions per day | Thousands per second | Hundreds to thousands per minute | Tens to hundreds per minute |
| Error tolerance | Zero | Low, measurable | Low, measurable | Medium, with review | Medium, with gates and rollback |
| Rate of change in logic | Low (governance per change) | Medium (retrain) | Low | High (re-prompt) | High |

Application steps:

1. Decompose the process into tasks at the level of a single decision or transformation.
2. For each task, score the eight characteristics.
3. Assign the class with the most favourable column. Where two classes tie, choose the simpler and cheaper one (rules before ML, ML before LLM, LLM before agent).
4. Record the boundary: what structured artefact passes from one class to the next.
5. Identify the "decision of record" and insist it is deterministic unless the regulator has explicitly accepted otherwise.

### 3.2 The "simplicity ladder" heuristic

Attribution uncertain; widely used in practice. Always try to solve with the lowest rung that works: rule, then lookup or heuristic, then classical model, then single LLM call, then LLM with retrieval, then agent. Each rung up adds cost, variance and governance burden. In client conversations this is the single most persuasive discipline because it signals you are not selling technology.

### 3.3 Hype-cycle awareness

Gartner's Hype Cycle (Gartner, annual) is useful as a vocabulary, not as evidence. In its 2024 and 2025 editions, generative AI had moved past the peak and agentic AI was near the peak [PUBLIC — Gartner Hype Cycle for AI, 2024 and 2025; VERIFY current placement]. Gartner also predicted that over 40% of agentic AI projects would be cancelled by end 2027 [PUBLIC — Gartner, June 2025; VERIFY]. Use these to frame expectations, not to decide.

## 4. Worked BFSI example

[ILLUSTRATIVE — composite] A UK mid-sized bank's payments and financial-crime operations. We decompose ten common tasks and apply the decision table.

| # | Task | Input structure | Determinism need | Logic knowable | Recommended class | Rationale |
|---|---|---|---|---|---|---|
| 1 | ISO 20022 pacs.008 schema validation and routing | Structured XML | Absolute | Fully | Rules engine | Codified in scheme rulebooks; zero error tolerance |
| 2 | Sanctions name screening against lists | Structured names, fuzzy match | High | Mostly (matching algorithms) | Rules plus classical matching (phonetic, edit distance); ML for alert triage | Decision of record must be reproducible; ML can rank alerts for review |
| 3 | Drafting the sanctions alert disposition narrative | Alert data plus analyst notes | Low | Expressed in language | LLM with retrieval over policy and case data | High-volume text drafting; human approves |
| 4 | Card fraud scoring at authorisation | Structured transaction features | High, sub-100ms | Learnable from labelled fraud | Classical ML (gradient-boosted trees) | Millions per day, strict latency, labelled history exists |
| 5 | Reading a scanned certificate of incorporation | Image | Medium | Perceptual | Deep learning (document AI) feeding an LLM for field extraction | Perception task; LLM maps fields to schema |
| 6 | Ultimate beneficial owner (UBO) resolution across registries | Mixed: registry APIs, documents, web | Low to medium | Path emerges | Agentic (supervisor pattern) with HITL gate | Next step depends on what each registry returns; branching too wide for rules |
| 7 | Chargeback eligibility under scheme rules | Structured dispute fields | Absolute | Fully | Rules engine | Reason codes and time limits are codified |
| 8 | Classifying a customer's dispute email into reason code | Free text | Medium | Expressed in language | LLM classification with confidence threshold | Unstructured input, tolerable error with fallback to human |
| 9 | Reconciliation break investigation | Structured ledgers plus free-text references | Medium | Partly | Rules for matching; LLM for interpreting references; agent for investigating persistent breaks | Layered: rules first, LLM for the residual, agent for the hard tail |
| 10 | Credit decision for a retail loan | Structured bureau and application data | Absolute, explainable | Learnable, regulated | Classical ML scorecard inside a rules-based policy engine | Adverse-action explainability; EU AI Act Annex III high-risk |

Reading the table, two things stand out for the client. First, only three of ten tasks need a generative model, and only one needs an agent; the "AI programme" is in fact a layered automation programme. Second, the tasks that need agents (6, 9) are the ones with the highest variable cost per case today, because they consume senior analyst time. That is where the benefit case concentrates, and also where governance effort concentrates.

So what for the client: "Your fastest savings are in LLM-assisted drafting and classification at the edges of existing rules-based processes; your largest savings are in two agentic investigations that need a governance design before they need a model."

## 5. Real-world case

[PUBLIC — Google Cloud announcement, June 2023; HSBC public statements; VERIFY current figures] HSBC replaced a rules-based transaction monitoring approach in part with Google Cloud's AML AI (an ML-based "dynamic risk assessment"). Google Cloud reported two to four times more suspicious activity identified and around 60% fewer alerts. The relevant lesson for tool selection is not that ML beat rules; it is that the bank kept rules where regulators required explainable thresholds and introduced a learned model where the rule base had become a false-positive generator. The ML model's outputs were explained through feature-level reason codes, which allowed model-risk sign-off.

[PUBLIC — Klarna press release, Feb 2024; CEO interviews, May 2025] Klarna's customer-service assistant is the canonical generative-AI case: two-thirds of chats handled by the assistant in its first month, equivalent to about 700 FTE, with an estimated USD 40m profit improvement. In 2025 the CEO said the company had over-rotated on cost and would re-hire humans for quality. For tool selection, the lesson is that the LLM was the right tool for the volume of routine queries, and the wrong tool, unassisted, for the long tail where judgement and empathy drove customer outcomes. A layered design with explicit escalation would have been the strategy consultant's recommendation.

## 6. Consultant language

> "Let us separate the decision of record from the inputs to that decision. The decision stays deterministic; AI improves the inputs."

Use when a client or a CRO fears that AI will make regulatory decisions.

> "We should climb the simplicity ladder: rule, model, language model, agent. Each rung adds cost, variance and governance burden, so we stop at the lowest rung that solves the problem."

Use in the first architecture discussion to signal you are not selling technology.

> "Only a minority of steps in this process need a generative model. The programme is a layered automation programme with GenAI at the unstructured edges."

Use when scoping, to reset expectations set by vendor demos.

> "Agents earn their cost where the path cannot be scripted in advance. Where it can, an orchestrated workflow with LLM steps is cheaper and more controllable."

Use when a sponsor wants "agentic" for its own sake.

> "The compounding of per-step error rates is the central design constraint for agents: ten steps at 95% is 60% end to end."

Use with technology leaders to justify gates, retries and narrow agent scopes.

## 7. Common mistakes juniors make

- Recommending an LLM for a task that has structured inputs and codified logic, because the demo was impressive.
- Describing classical ML as "legacy" in front of a CRO whose scorecards run on it under regulatory approval.
- Treating "agentic" as a product category rather than an architectural choice with a specific justification (path cannot be scripted).
- Forgetting the decision of record. Every regulated process has one; it must be deterministic or explicitly approved otherwise.
- Ignoring latency: fraud scoring at authorisation has a budget measured in tens of milliseconds, which excludes most LLM designs.
- Quoting hype-cycle positions or analyst failure rates as if they were evidence about this client's process.
- Not asking what labelled history exists before proposing supervised ML.

## 8. Interview questions with model answers

**Q1. When would you not use an LLM?**

Structure: three disqualifiers, then the edge case. I would not use an LLM when the decision must be deterministic and auditable as a decision of record (eligibility, limits, sanctions hits), when the inputs are fully structured and the logic is codified (a rules engine is cheaper, faster and defensible), and when latency budgets are in milliseconds at high volume (authorisation fraud scoring). I would also avoid it where the error mode is unacceptable even at low rates and there is no human review stage. The edge case is where an LLM supplies inputs to such a decision: reading documents, classifying text, drafting narratives. There it is often the best tool, provided the decision itself remains deterministic and the LLM's output is validated before it enters the decision. Example: in a disputes process the chargeback eligibility decision stays in a rules engine; the LLM classifies the customer's email and drafts the letter.

**Q2. Explain the difference between classical ML and generative AI to a CFO.**

Classical ML learns a specific mapping from your historical data to a specific outcome, such as probability of fraud, and gives you a number you can calibrate, back-test and explain with reason codes. It is a measurement instrument. Generative AI is a general-purpose model, trained by a vendor on the world's text, that produces language, code or structured output on request. It is a labour-substitute for cognitive tasks involving unstructured information. The financial consequences differ: classical ML has upfront data and modelling cost and near-zero marginal cost per decision; generative AI has low upfront cost and a meaningful marginal cost per call, so its economics depend on volume and on how much human time each call displaces. The risk profile differs too: classical ML risk is model risk you already govern; generative AI adds hallucination, data leakage and third-party dependency. In a business case I treat them as different asset classes.

**Q3. A client says "we want to be an agentic bank". How do you respond?**

I would affirm the ambition and immediately convert it into a portfolio question. First, which processes have steps whose path cannot be scripted in advance and consume expensive judgement time; those are candidates for agents. Second, which steps are high-volume unstructured text work; those are LLM candidates with better economics and lower risk. Third, which decisions of record must stay deterministic. The result is usually that a small number of agentic use cases carry a large share of value and almost all of the governance burden, and a larger number of LLM-assisted steps carry fast, low-risk savings. I would propose a six to eight week assessment that produces that portfolio, with an agentic-fit score per task and a governance design for the top two agentic candidates. I would also set an autonomy-level ambition with the CRO early, because that constraint shapes every design decision.

## 9. Self-check quiz

1. Name the five classes of technology in this module and, for each, state who or what produces the decision logic.
2. A step in a KYB process has fully structured inputs, codified policy, and a zero-error tolerance. Which class do you recommend, and what role, if any, can an LLM play around it?
3. Calculate the end-to-end success rate of an eight-step agent where each step is 97% reliable. What does the result imply for design?
4. Give two reasons a classical ML scorecard remains the correct tool for retail credit decisions even in 2026, one technical and one regulatory.
5. In the HSBC and Google Cloud AML case, what did the bank keep deterministic and what did it replace with a learned model, and why does that split matter for model-risk sign-off?
