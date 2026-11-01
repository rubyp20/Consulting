# Module 3 — Agentic AI Mechanics

## 1. Why a client cares

Agentic AI is where the largest benefit claims and the largest operational risks in a bank's AI portfolio meet. An agent does not just produce text; it acts on systems, and errors compound across steps. The COO cares because the labour-substitution case depends on agents completing end-to-end work; the CRO cares because an agent that acts wrongly creates a loss event, not a typo; the regulator cares because accountability for an autonomous action must land on a human. A consultant who can specify the pattern, the autonomy level, the guardrails and the human gates in one coherent design is the one the client trusts with the process.

## 2. Concept and mechanism

### 2.1 Definition: agent = model + tools + memory + planning

An agent is a system in which a language model, placed in a control loop, repeatedly decides what to do next in pursuit of a goal, executes actions through tools, observes results and continues until a termination condition is met. The four components:

- **Model.** The LLM that interprets the goal, the state and the tool results, and emits the next action. Its reasoning quality bounds the agent's reliability.
- **Tools.** Functions the agent can call: search, database query, API call, calculator, code execution, another agent. Each tool is described to the model by a schema (name, purpose, typed parameters). The model emits a structured call; the runtime executes it and returns the result as text or structured data.
- **Memory.** Short-term memory is the context window (the running transcript of actions and observations). Long-term memory is an engineered store: a vector database of past cases, a key-value store of user preferences, a scratchpad file, or a structured state object. Nothing persists between calls unless the application persists it.
- **Planning.** The procedure by which the agent decides the sequence of actions: implicit (the model decides step by step) or explicit (a plan is produced first, then executed, then revised).

The runtime, often called the orchestrator or agent framework (LangGraph, AutoGen, CrewAI, Semantic Kernel, OpenAI Agents SDK, Google ADK, and others [PUBLIC — vendor documentation, 2024 to 2025; VERIFY current landscape]), manages the loop, state, tool execution, retries and termination.

### 2.2 The core loop and its failure arithmetic

The loop is: observe state, reason, select action, execute, observe result, repeat. Termination occurs on goal completion, a maximum step count, a budget limit, an error threshold or a human interrupt.

The failure arithmetic is the central design constraint. If each step succeeds independently with probability p and the task requires n dependent steps, end-to-end success is p^n. At p = 0.95 and n = 10, that is 0.60. At p = 0.98 and n = 20, it is 0.67. The design responses are: fewer steps (narrow scope, deterministic sub-steps), higher per-step reliability (better tools, structured outputs, validation), recovery (self-correction, retries, verification steps that detect and fix errors, which breaks the independence assumption in your favour) and gates (human checkpoints before irreversible actions).

### 2.3 Agentic patterns

**ReAct (Reason and Act)** (Yao et al., 2022). The model interleaves a reasoning trace ("Thought"), an action (tool call) and an observation, in a single loop. Simple, general, and the basis of most single-agent implementations. Weakness: no global plan, so it can wander or loop on long tasks.

**Plan-and-execute.** The model first produces an explicit plan (a list of steps), then an executor carries out each step, with optional re-planning when a step fails or reveals new information. Better on long tasks; more predictable; plans can be reviewed by a human before execution, which is valuable in regulated settings. Related: Reflexion (Shinn et al., 2023), in which the agent critiques its own trajectory and retries; Tree of Thoughts (Yao et al., 2023), which explores multiple reasoning branches.

**Supervisor (hierarchical).** A supervising agent receives the goal, decomposes it, delegates sub-tasks to specialised sub-agents (each with its own prompt, tools and scope), evaluates their returns and decides what to do next. Sub-agents may themselves supervise others. Appropriate when sub-tasks are heterogeneous and the next step depends on judgement about results. This is the pattern used in the KYB engagement in your background, and it is the dominant enterprise pattern for complex case work because scope, prompts and permissions can be set per sub-agent.

**Orchestrator-worker.** A central orchestrator decomposes a task into sub-tasks, dispatches them to workers that are often identical or interchangeable, frequently in parallel, then merges results. Appropriate for homogeneous bulk work: screen 500 names, summarise 80 documents, check 30 fields. The distinction from supervisor is heterogeneity and judgement (supervisor) versus homogeneity and parallelism (orchestrator-worker). In practice systems combine both: a supervisor delegates a bulk sub-task to an orchestrator-worker sub-system.

**Multi-agent collaboration and debate.** Several agents with different roles (drafter, critic, compliance reviewer) exchange messages to converge on an output. Debate patterns (Du et al., 2023) improve factual accuracy on some tasks at a multiple of the cost. Use for high-stakes judgement outputs where a second-opinion structure is worth two to five times the inference cost; do not use for routine drafting.

**Router and workflow patterns.** Many "agentic" deployments are in fact deterministic workflows with LLM steps: a router classifies the input and a fixed pipeline runs. These are cheaper, more testable and often sufficient. The consultant's discipline is to call them what they are.

| Pattern | Decomposition | Parallelism | Judgement between steps | Best for | Main risk |
|---|---|---|---|---|---|
| ReAct single agent | Implicit | No | Yes, local | Short tasks, 3 to 8 steps | Looping, drift |
| Plan-and-execute | Explicit plan | Possible | At re-plan points | Long tasks, reviewable plans | Stale plan |
| Supervisor | By specialism | Possible | Yes, central | Heterogeneous case work (KYB, disputes) | Supervisor becomes bottleneck; delegation errors |
| Orchestrator-worker | By unit of work | High | No | Bulk homogeneous work | Merge errors |
| Collaboration and debate | By role | Low | Yes, dialogic | High-stakes judgement | Cost, latency |
| Router plus workflow | Fixed | Fixed | No | Predictable processes | Mis-labelled as agentic |

### 2.4 Tool calling and function schemas

Tool calling is the mechanism by which an LLM emits a structured request (typically JSON conforming to a declared schema) that the runtime executes. Design principles that determine reliability:

- **Narrow, well-described tools.** A tool named `get_customer_profile(customer_id)` with a one-line description and typed parameters is called correctly far more often than a generic `query_database(sql)`.
- **Idempotency and reversibility flags.** Tools that change state should be marked, so the runtime can require confirmation or a gate.
- **Structured returns.** Tool results returned as compact structured data, not raw dumps, reduce context consumption and mis-reading.
- **Least privilege.** Each agent's tool set and credentials are scoped to its task. A document-reading sub-agent has no payment-initiation tool.
- **Error contracts.** Tools return explicit error types the model can reason about (not found, permission denied, timeout) rather than failing silently.

### 2.5 MCP and agent-to-agent protocols

**Model Context Protocol (MCP)** [PUBLIC — Anthropic, Nov 2024] standardises how an application exposes tools, resources and prompts to a model, in a client-server pattern. Instead of bespoke integration per model and per system, a system publishes an MCP server once and any MCP-compatible agent can use it. For a bank this means a governed catalogue of internal MCP servers (customer data, case management, policy library) with authentication and audit at the server, which is an attractive control point.

**Agent2Agent (A2A)** [PUBLIC — Google, Apr 2025; donated to the Linux Foundation, Jun 2025; VERIFY adoption] standardises how agents discover each other (via "agent cards"), negotiate capabilities and exchange tasks and results across vendors and organisations. Where MCP connects an agent to tools, A2A connects agents to agents. Both are young; treat vendor claims of broad adoption as [VERIFY — date-sensitive].

Consultant implication: protocols shift the integration cost curve and create a new governance surface (who may publish a server, who may call it, what is logged). They belong in the operating model discussion, not just the architecture.

### 2.6 Autonomy levels

There is no single industry standard for AI autonomy levels; several practitioner scales exist, often modelled on the SAE J3016 driving-automation levels [attribution: analogy to SAE levels widely used; specific AI scales vary by vendor and firm]. The scale below is a composite used in practice [ILLUSTRATIVE — composite].

| Level | Name | Who decides | Who acts | Human role | Banking example |
|---|---|---|---|---|---|
| 0 | Manual | Human | Human | Does the work | Analyst reads file, writes summary |
| 1 | Assist | Human | Human | Uses AI output as input | Copilot drafts summary; analyst edits and files |
| 2 | Recommend | AI proposes, human decides | Human | Approves each action | Agent proposes dispute outcome and letter; agent (human) approves |
| 3 | Act with approval gates | AI decides routine, human approves defined classes | AI, gated | Approves exceptions and irreversible actions | Agent resolves low-value disputes; human approves refunds above threshold |
| 4 | Act with oversight | AI | AI | Reviews samples and metrics; intervenes on alerts | Agent resolves within policy; QA samples 5% daily |
| 5 | Fully autonomous | AI | AI | Sets policy only | Not appropriate for regulated decisions of record today |

How to position with regulators and model-risk teams: state the target level per use case, define the gate criteria for moving from one level to the next (measured accuracy on a golden set over a period, incident-free run, independent validation), and commit to the ability to step down a level on trigger. Regulators respond well to "we start at level 2 and earn level 3 against published criteria", and badly to "the agent is autonomous".

### 2.7 Guardrails taxonomy

Guardrails are controls applied around the model. Four layers [ILLUSTRATIVE — composite taxonomy; widely used in practice with varying names]:

| Layer | Purpose | Examples |
|---|---|---|
| Input guardrails | Protect the agent from bad or malicious input | Prompt-injection detection, PII redaction before the model, topic and scope classifiers, document-source allow-lists |
| Output guardrails | Check what the model produces before it is used | Schema validation, faithfulness checks against sources, toxicity and PII filters, confidence thresholds with fallback |
| Action guardrails | Constrain what the agent can do | Tool allow-lists per agent, parameter limits (refund cap), rate limits, dual-control for irreversible actions, sandboxed execution |
| Policy guardrails | Encode business and regulatory rules outside the model | Deterministic rules engine as final check, mandatory disclosures, jurisdictional restrictions, kill switch and step-down procedures |

Prompt injection deserves a specific mention because agents read untrusted content (emails, documents, web pages) and can be instructed by it. Mitigations: treat all retrieved content as data not instructions, separate system and user channels, restrict tools available when processing untrusted content, and require human approval before actions triggered by content from untrusted sources.

### 2.8 Human-in-the-loop design patterns

Human-in-the-loop (HITL) is a design decision about where human judgement sits in the flow, not a slogan. Three patterns, often combined:

- **Approve (pre-action gate).** The agent proposes; a human approves before execution. Highest control, lowest throughput gain. Use for irreversible or high-value actions and during the earning-trust phase.
- **Review-sample (post-action QA).** The agent acts; humans review a statistically meaningful sample (and all flagged cases). Use once accuracy is proven, with sample size set by target confidence and observed error rate.
- **Exception-only.** The agent handles cases within policy and confidence thresholds; everything else routes to a human queue with the agent's analysis attached. The thresholds are the control.

Design parameters to specify: the gate criteria (what triggers human review), the information presented to the human (the agent's evidence and rationale, not just the conclusion), the time budget for the human, the feedback loop (human corrections become evaluation data) and the escalation path when the human disagrees.

### 2.9 When agents are the wrong answer

An agent is the wrong tool when the path can be scripted (use a workflow with LLM steps), when the task is a single transformation (use one LLM call), when the decision must be deterministic (use rules), when latency is tight (agents are slow), or when the error cost of an autonomous action exceeds the labour saved. The honest test: write the process as a flowchart. If you can, you do not need an agent; if every attempt produces "it depends on what we find", you might.

## 3. Frameworks

### 3.1 Agent design canvas [ILLUSTRATIVE — practitioner template; attribution: composite]

For each agent, specify in one page: goal and success criteria; scope (what it does and explicitly does not do); inputs and trusted sources; tools with read/write and reversibility flags; memory (what is stored, where, retention); planning pattern; autonomy level and gate criteria; guardrails by layer; HITL pattern and thresholds; evaluation plan and golden set; observability (what is logged); failure modes and fallbacks; owner.

### 3.2 Autonomy progression ladder

Steps: (1) set the target level with the business and the CRO; (2) start one level below the target; (3) define promotion criteria (for example, 500 cases, accuracy above 97% on sampled review, zero severity-one incidents, independent validation sign-off); (4) define demotion triggers (accuracy drop, incident, model version change); (5) review quarterly.

### 3.3 Failure-mode and effects analysis (FMEA) for agents

FMEA originates in reliability engineering (US military standard MIL-P-1629, 1949; widely adopted in automotive). Applied to agents: list each step, its failure modes, the effect, the detection mechanism and the mitigation; score severity, occurrence and detectability. Model-risk teams recognise the format immediately.

## 4. Worked BFSI example

[ILLUSTRATIVE — composite] Supervisor-led multi-agent system for card payment dispute resolution at a UK bank handling 480,000 disputes a year, of which 60% are "transaction not recognised", 25% merchant disputes (goods not received, defective, cancelled subscription) and 15% fraud-related.

### 4.1 Target autonomy and scope

Target level 3 for non-fraud disputes under GBP 250 within twelve months; level 2 at launch. Fraud-related disputes excluded from autonomous action (level 2 ceiling) because of regulatory reporting and the customer-harm profile. The chargeback eligibility decision remains in the existing rules engine.

### 4.2 Agent scoping

| Agent | Scope | Tools (R = read, W = write) | Model tier | Autonomy ceiling |
|---|---|---|---|---|
| Supervisor | Receives case, plans, delegates, assembles outcome, routes to HITL | Case management R/W (status only), queue router W | Frontier | Level 3 |
| Intake and classification agent | Parses customer message and channel data; assigns reason code with confidence | Customer message R, reason-code taxonomy R | Mid-tier | n/a (proposes only) |
| Evidence agent | Gathers transaction, merchant, device and history data; checks for duplicates and prior disputes | Core banking R, card processor R, merchant directory R | Mid-tier | n/a |
| Merchant-contact agent | Drafts and sends merchant enquiry where scheme rules require pre-chargeback contact; parses response | Merchant messaging W (templated only), inbox R | Mid-tier | Level 3 (templated sends) |
| Policy and eligibility agent | Maps evidence to scheme rule inputs; calls the rules engine; interprets the result | Rules engine R (invoke), scheme rulebook RAG R | Frontier | n/a (rules engine decides) |
| Resolution and communication agent | Drafts the customer letter and the representment package; proposes refund or decline | Letter templates R, refund tool W (capped) | Frontier | Level 3 under GBP 250; level 2 above |
| Compliance critic agent | Independent check of the draft outcome against policy and Consumer Duty guidance; flags issues | Policy RAG R | Frontier | n/a (blocks or passes) |

### 4.3 HITL gates

| Gate | Trigger | Human action | Information presented |
|---|---|---|---|
| G1 Classification | Reason-code confidence below 0.85, or fraud indicators | Confirm or correct reason code | Customer message, proposed code, top-3 alternatives with confidence |
| G2 Evidence gap | Mandatory evidence missing after two retrieval attempts | Source evidence or decide | Checklist of evidence with status |
| G3 Outcome approval | Refund above GBP 250; decline on any case; critic agent flag; vulnerable-customer marker | Approve, amend or reject | Evidence summary, rule trace, draft letter, critic's notes |
| G4 Sample QA | 5% random sample of autonomous closures, daily | Grade outcome and letter | Full trajectory log |

### 4.4 Guardrails

Input: customer messages are treated as data; prompt-injection classifier; PII minimisation to sub-agents. Output: structured schemas for every agent return; faithfulness check of the letter against the evidence; tone and Consumer Duty vocabulary checks. Action: refund tool hard-capped at GBP 250 per case and GBP 5,000 per day per agent instance; merchant messaging restricted to templates; no tool can close a case without the rules-engine result attached. Policy: deterministic eligibility decision; mandatory disclosure text injected by template, not generated; kill switch that reverts all cases to the human queue.

### 4.5 Failure-mode table (abridged FMEA)

| Step | Failure mode | Effect | Detection | Mitigation | Severity (1 to 5) |
|---|---|---|---|---|---|
| Classification | Wrong reason code | Wrong rule path, wrong outcome | Confidence threshold; G1; critic | Threshold 0.85; human confirm below | 4 |
| Evidence | Stale or wrong account data | Wrong eligibility inputs | Data freshness check; cross-source consistency | Retry; G2 | 4 |
| Merchant contact | Agent sends non-templated text or discloses data | Conduct and privacy breach | Template-only tool; output PII filter | Hard restriction; audit log | 5 |
| Eligibility | Model misreads rules-engine output | Wrong communicated outcome | Critic compares letter to rule trace | Structured rule output; critic block | 5 |
| Resolution | Hallucinated policy or deadline in letter | Customer misinformation (Air Canada pattern) | Faithfulness check against templates and evidence | Template-locked clauses; G3 | 5 |
| Refund | Duplicate or excess refund | Financial loss | Idempotency key; cap; reconciliation | Cap; daily limit; G3 above GBP 250 | 4 |
| Supervisor | Infinite loop or runaway steps | Cost, latency | Step and token budget | Hard limits; fallback to human | 2 |
| Any | Prompt injection via customer text | Unauthorised action | Injection classifier; tool restrictions | No write tools while processing untrusted text | 5 |

### 4.6 Economics sketch

Average handling time today: 38 minutes per non-fraud dispute [ESTIMATE]. Target: 70% of non-fraud disputes closed at level 3 with 4 minutes of human time (QA and gates amortised), 30% at level 2 with 15 minutes. Weighted: 0.7 x 4 + 0.3 x 15 = 7.3 minutes, saving about 30 minutes per case on 408,000 non-fraud disputes, roughly 204,000 hours, or about 113 FTE at 1,800 hours [ESTIMATE]. Inference: about 12 model calls per case averaging 6,000 input and 600 output tokens, blended price USD 1.50 input and USD 6 output per million [ESTIMATE — VERIFY], gives about USD 0.15 per case, or USD 72,000 a year. The economics are dominated by labour, and the risk is dominated by the three severity-5 rows above. That is the conversation to have with the client.

## 5. Real-world case

[PUBLIC — Klarna, Feb 2024 and May 2025; VERIFY] Klarna's assistant is often cited as agentic; in its first phase it was a single assistant handling customer-service conversations with tools for refunds, returns and payment queries, operating at high autonomy. The 2025 walk-back, in which the CEO said quality had suffered and humans would be re-hired, is the clearest public illustration of an autonomy level set by cost ambition rather than by measured quality on the long tail. A gated design with exception routing would have preserved most of the savings.

[PUBLIC — Goldman Sachs statements, 2025; VERIFY] Goldman Sachs announced a pilot of Cognition's "Devin" coding agent alongside its own GS AI Assistant, positioning the agent as a supervised "new employee" working alongside engineers, with human review of its output. The framing, agents at an explicit assist-and-review level with humans accountable, is the register banks use publicly.

[PUBLIC — Commonwealth Bank of Australia, Aug 2025; VERIFY] CBA reversed 45 call-centre redundancies after the Finance Sector Union showed the AI voice bot had not reduced call volumes as assumed. The lesson is that autonomy and benefit assumptions must be validated against measured volumes before the labour case is executed.

## 6. Consultant language

> "We will specify the autonomy level per use case and earn each step up against published criteria."

Use with the CRO and in regulatory engagement.

> "Each sub-agent has a narrow scope, its own tool allow-list and least-privilege credentials. The supervisor can coordinate but cannot pay."

Use in architecture and security reviews.

> "The decision of record stays in the rules engine; the agents gather evidence, interpret and communicate."

Use when positioning agents to risk and compliance.

> "Our human-in-the-loop design is a set of gates with explicit triggers, not a review of everything. The thresholds are the control."

Use when an operations head fears either loss of control or no savings.

> "The failure-mode table is the design artefact model-risk will read first. We build it before we build the agent."

Use to signal governance maturity to the second line.

## 7. Common mistakes juniors make

- Calling a fixed pipeline with LLM steps "agentic" and inheriting agentic governance scrutiny for no benefit.
- Designing one agent with twenty tools instead of several narrow agents with three each.
- Omitting the failure-mode table and discovering the severity-5 risks in the model-risk review.
- Treating human-in-the-loop as "a human checks everything", which destroys the business case, or "a human is notified", which is not a control.
- Not specifying what persists in memory, where, and for how long (a data-protection question).
- Ignoring prompt injection in any agent that reads customer-supplied text.
- Quoting per-step accuracy instead of end-to-end task success.
- Presenting MCP or A2A adoption as settled when it is still moving.

## 8. Interview questions with model answers

**Q1. Walk me through how you would design an agentic system for KYB refresh.**

I would start from the process, not the technology. KYB refresh decomposes into retrieving the current file, checking registries for ownership and status changes, resolving beneficial owners, running screening and adverse media, assessing whether the risk rating changes, and documenting the decision. The sub-tasks are heterogeneous and the next step depends on what is found, so a supervisor pattern fits: a supervisor plans and delegates to a registry agent, an ownership-resolution agent, a screening agent, an adverse-media agent and a documentation agent, each with a narrow tool set and read-only access except the documentation agent, which writes to the case file. The risk-rating decision itself stays deterministic in the existing policy engine. Autonomy: start at level 2, where the agents assemble the pack and propose the rating and a human analyst approves; promote low-risk, no-change cases to level 3 after a measured period. Gates on any ownership change, any screening hit, any rating increase and all high-risk segments. I would specify guardrails per layer, a golden set of 300 historical refreshes for evaluation, and a failure-mode table before build. The benefit is analyst hours on the no-change majority; the governance burden concentrates on the exceptions, which is where it belongs.

**Q2. Supervisor versus orchestrator-worker: when and why?**

Supervisor when the sub-tasks differ in nature and the path depends on judgement about intermediate results: case work such as disputes, KYB and complaints. The supervisor carries the judgement and the sub-agents carry specialised scope and permissions, which is also attractive for least-privilege security. Orchestrator-worker when the work is homogeneous and parallelisable: screening a batch of names, summarising a set of documents, extracting the same fields from many forms. The orchestrator decomposes, fans out, and merges; there is little judgement between steps. The trade-offs: supervisors can become bottlenecks and make delegation errors, so you cap depth and log every delegation; orchestrator-worker systems fail at merge time, so you validate merged outputs against schemas. Most real systems nest one inside the other: a supervisor delegates a bulk sub-task to an orchestrator-worker component.

**Q3. How do you make an agentic system acceptable to a bank's model-risk function?**

By speaking their language and giving them their artefacts. First, classify what is a model and what is a control: the LLM is a third-party model under SS1/23 or SR 11-7 principles; the orchestration and guardrails are controls. Second, present the autonomy level and the promotion and demotion criteria, so they see a managed progression rather than a release. Third, deliver a failure-mode and effects analysis with severity scoring and detection mechanisms, which is a format they recognise. Fourth, show the evaluation evidence: a golden set, measured end-to-end task success, hallucination and faithfulness rates, and a monitoring plan with drift triggers. Fifth, confirm that the decision of record remains deterministic and that irreversible actions have human gates with full trajectory logging. Finally, offer independent validation access and a kill switch. In my experience the function's objection is rarely to the technology; it is to the absence of these artefacts.

## 9. Self-check quiz

1. List the four components of an agent and state, for each, the single most important design decision a consultant should specify.
2. An agent completes a 12-step task with 96% per-step reliability. What is the end-to-end success rate, and which two design responses would most improve it?
3. Describe the three HITL patterns and say which you would use for refunds above a threshold, and why.
4. Distinguish MCP from A2A in one sentence each, and name one governance implication of each for a bank.
5. In the disputes design in Section 4, why does the merchant-contact agent have a template-only messaging tool rather than free-text sending? Name the guardrail layer this belongs to.
