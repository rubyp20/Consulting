# Module 3 — Quiz answers

**1.** Model: which tier for which agent (frontier for judgement, mid-tier for extraction). Tools: scope and least privilege per agent, with read/write and reversibility flags. Memory: what persists, where, and for how long (data protection). Planning: which pattern (ReAct, plan-and-execute, supervisor, orchestrator-worker) and why.
Benchmark: four components plus a specific, defensible design decision for each rather than a definition.

**2.** 0.96^12 = 0.61, about 61%. Responses: reduce dependent steps by making routine sub-steps deterministic, and add verification or self-correction steps that catch and fix errors before they propagate; human gates before irreversible actions also cap the consequence.
Benchmark: correct arithmetic and the insight that verification steps break the independence assumption in your favour.

**3.** Approve (pre-action gate), review-sample (post-action QA), exception-only (thresholds route hard cases to humans). For refunds above a threshold, use approve: the action is irreversible and financially material, so a human reviews the evidence and rationale before execution. Below the threshold, exception-only with sampled QA.
Benchmark: names all three, chooses approve for the irreversible case, and notes that thresholds are the control.

**4.** MCP standardises how an application exposes tools, resources and prompts to a model (agent-to-tool); A2A standardises how agents discover and exchange tasks with each other (agent-to-agent). Governance: for MCP, a catalogue of approved internal servers with authentication and audit at the server; for A2A, policies on which external agents may be called and what data may cross the boundary.
Benchmark: correct distinction, attribution (Anthropic 2024; Google 2025), and a governance point rather than a feature list.

**5.** Free-text sending by an agent to an external party risks disclosing customer data, hallucinating commitments and violating scheme rules; a template-only tool constrains the action space so the agent can only choose and populate approved messages. This is an action guardrail (constraining what the agent can do), supported by an output guardrail (PII filter).
Benchmark: identifies the conduct and privacy risk, names the action layer, and notes the supporting output check.
