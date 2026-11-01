# Module 1 — Quiz answers

**1.** Rules engine (humans author explicit rules); classical ML (learned parameters from structured labelled data); deep learning (learned weights of multi-layer networks from large raw data); generative AI (transformer weights pre-trained on web-scale corpora by a vendor, then aligned); agentic AI (a generative model in a loop with tools, memory and planning, so logic emerges from the model plus orchestration code).
Benchmark: names all five and makes the "who produces the logic" distinction explicit, since that is what drives governance.

**2.** Rules engine as the decision of record. An LLM can extract or normalise inputs from unstructured documents and draft the outcome narrative, with its outputs validated before entering the rule evaluation.
Benchmark: says "decision of record", positions the LLM at the edges, and mentions validation of LLM outputs before they enter the rules.

**3.** 0.97^8 = 0.78, so about 78% end to end. Implication: narrow the agent's scope, add verification or retry steps, place human gates before irreversible actions, and measure end-to-end success rather than per-step accuracy.
Benchmark: correct arithmetic plus at least two design responses.

**4.** Technical: structured bureau and application features with long labelled default history make a scorecard accurate, stable and monotonic. Regulatory: adverse-action and explainability requirements (reason codes), existing model-risk approval under SR 11-7 or SS1/23, and EU AI Act Annex III high-risk status all favour an explainable, validated scorecard.
Benchmark: one of each, with a named regulation.

**5.** Kept deterministic: rule-based thresholds and the decision of record where regulators require explainability. Replaced: the alert-generation layer, where a learned risk model reduced false positives and surfaced more true suspicious activity. The split matters because the learned model's outputs could be explained with feature-level reasons and validated as a model, while the regulatory decision logic remained auditable.
Benchmark: identifies the layered split and links it to model-risk governance rather than just to performance.
