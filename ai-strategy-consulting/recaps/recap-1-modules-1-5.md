# Recap 1 — Modules 1 to 5

Revise this the night before an interview. Drawn from Modules 1 to 5; module numbers are in brackets.

## Ten things to remember

1. Five technology classes, defined by how the decision logic is produced; keep the decision of record deterministic and let AI improve the inputs. [1]
2. Climb the simplicity ladder (rule, model, LLM, LLM with retrieval, agent) and stop at the lowest rung that works; each rung adds cost, variance and governance. [1]
3. An LLM is a statistical model of language, not a system of record; RAG supplies facts at inference and accuracy is bounded by retrieval recall. [2]
4. Shape the model in order: prompt, few-shot, retrieval, structured outputs and tools, fine-tuning last; fine-tuning does not add knowledge. [2]
5. Inference cost = volume x (input tokens x price + output tokens x price) x (1 + overhead) x (1 minus caching discount); in back-office banking it is a rounding error next to engineering and analyst hours. [2]
6. Agent = model + tools + memory + planning; per-step error compounds (ten steps at 95% is about 60%), so scopes are narrow and gated. [3]
7. Autonomy is a 0 to 5 scale set per use case with the CRO; start one level below target with published promotion and demotion criteria; HITL is gates with triggers, not review of everything. [3]
8. Write the failure-mode table before the agent; layer guardrails at input, output, action and policy; treat customer text as untrusted (prompt injection). [3]
9. Evaluation is the licence to operate: governed golden set with a held-out portion, evaluation pyramid, faithfulness separate from correctness, thresholds from risk appetite not pilot results. [4]
10. A strategy is ambition, domains, enablers and a value mechanism, not a use-case list; set ambition by domain, check budget shape against 10-20-70 and portfolio shape against Deploy, Reshape, Invent. [5]

## Frameworks and attributions

| Framework | Originator | One-line use | Module |
|---|---|---|---|
| Tool-selection decision table | Practitioner composite; no single originator | Score each task on eight characteristics and read across to the right technology class | 1 |
| Simplicity ladder | Attribution uncertain; widely used | Pick the lowest rung that solves the problem | 1 |
| Shape-the-model ladder | Practitioner | Prompt, few-shot, retrieve, tools, fine-tune last | 2 |
| ReAct; chain-of-thought; RAG paper | Yao et al. 2022; Wei et al. 2022; Lewis et al. 2020 | Name the research behind agent loops and grounding | 2, 3 |
| Model Context Protocol; Agent2Agent | Anthropic, Nov 2024; Google, Apr 2025 (Linux Foundation, Jun 2025) | Tool and agent interoperability; adoption still moving | 3 |
| FMEA | Reliability engineering (US MIL-P-1629, 1949) | Failure modes, detection, mitigation, severity for each agent step | 3 |
| Evaluation pyramid | Attribution uncertain; widely used | Deterministic, model-graded, human layers; the shape is the cost model | 4 |
| Rewired six capabilities | Lamarre, Smaje, Zemmel, McKinsey, 2023 | Business-led roadmap, talent, operating model, technology, data, adoption and scaling | 5 |
| 10-20-70 | BCG, 2023 to 24 | Budget sanity check: algorithms, technology and data, people and process | 5 |
| Deploy, Reshape, Invent | BCG, 2023 to 24 (wording VERIFY) | Portfolio shape across three GenAI plays | 5 |
| AI maturity models | Gartner (five levels, VERIFY names); MIT SMR and BCG segments | Benchmarking vocabulary; score on evidence, not interviews | 5 |

## Numbers worth memorising

| Number | What it is | Label | Module |
|---|---|---|---|
| 10 steps at 95% = about 60% | End-to-end success of a chained agent | [ILLUSTRATIVE — arithmetic] | 3 |
| Two-thirds of chats; about 700 FTE; USD 40m | Klarna assistant claim, later corrected on quality in 2025 | [PUBLIC — Klarna, Feb 2024; CEO interviews, May 2025; VERIFY] | 1, 3, 5 |
| 2 to 4x more suspicious activity; about 60% fewer alerts | HSBC AML AI with Google Cloud | [PUBLIC — Google Cloud, Jun 2023; VERIFY] | 1, 4 |
| About 16,000 advisers; about 100,000 documents | Morgan Stanley adviser assistant corpus | [PUBLIC — Sept 2023; VERIFY] | 2 |
| Over 40% of agentic AI projects cancelled by end 2027 | Gartner prediction | [PUBLIC — Gartner, Jun 2025; VERIFY] | 1 |
| USD 3 and USD 15 per million tokens | Frontier input and output price used in worked examples | [ESTIMATE — order of magnitude; VERIFY] | 2 |
| 38 minutes to 7.3 minutes; about 113 FTE | Dispute agent handling time and capacity on 408,000 non-fraud disputes | [ILLUSTRATIVE — composite; ESTIMATE] | 3 |
| Faithfulness 0.97; true-match sensitivity 1.00; PII leakage 0 | Release thresholds for a sanctions narrative generator | [ILLUSTRATIVE — composite] | 4 |
| Maturity 2.0 now, 3.7 target; budget 35/45/20 to 12/28/60 | Northgate Bank assessment and 10-20-70 reshaping | [ILLUSTRATIVE — composite] | 5 |
| About 800 models; about 350 use cases; SGD 1bn-plus | DBS AI portfolio and projected 2025 economic value | [PUBLIC — DBS, 2024 to 25; VERIFY] | 5 |

## Phrases to use with a client

> "Let us separate the decision of record from the inputs to that decision. The decision stays deterministic; AI improves the inputs." [1]

> "We should separate retrieval quality from generation quality. If recall at five is 70%, no prompt will get us above 70%." [2]

> "Our human-in-the-loop design is a set of gates with explicit triggers, not a review of everything. The thresholds are the control." [3]

> "Every prompt change is a release. The eval harness gates it." [4]

> "Your binding constraint is not the platform you have bought; it is the operating model and data ownership you have not built yet." [5]

## Traps

- Recommending an LLM for a task with structured inputs and codified logic because the demo was impressive, or calling a fixed pipeline with LLM steps "agentic". [1, 3]
- Proposing fine-tuning to add bank knowledge, or treating a long context window as a reason not to build retrieval. [2]
- Treating human-in-the-loop as "a human checks everything" (kills the business case) or "a human is notified" (not a control). [3]
- Presenting a single accuracy number without the denominator, reference and method, or building the golden set from the cases used to tune the prompt. [4]
- Misattributing frameworks (Deploy, Reshape, Invent is BCG; the six capabilities are McKinsey) or quoting 10-20-70 as empirical data. [5]

## Thirty-second self-test

1. Name the five technology classes and the one question that distinguishes them.
2. Write the token-economics formula including the two terms juniors omit.
3. What are the three failure categories in a RAG pipeline, and which metric bounds accuracy?
4. Describe autonomy levels 2, 3 and 4 and the human's role at each.
5. Name the six Rewired capabilities and the authors.
