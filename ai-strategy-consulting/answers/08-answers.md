## Module 8 — Quiz answers

**1.** Consumption-based run cost (inference scales with volume and design, so it must be modelled per case, not as a licence). Human-in-the-loop cost (sampling QA, exceptions and appeals are permanent and are the control a supervisor will examine). Assurance cost (evals, guardrails, monitoring and model risk validation recur and are mandatory for higher-tier systems). Lifecycle churn (models are deprecated on 12 to 24 month cycles, forcing re-baselining and re-validation).
Manager-level benchmark: names all four and notes that inference is usually the smallest of the four for bank back-office volumes.

**2.** Input tokens per case: 6 x 12,000 = 72,000; cached half: 36,000 x USD 0.30 per million = USD 0.0108; uncached half: 36,000 x USD 3.00 per million = USD 0.108; output: 6 x 400 = 2,400 x USD 15 per million = USD 0.036. Raw inference = USD 0.155 per case. Loaded at 30 percent overhead = USD 0.201 per case. Annual: 86,000 x 0.201 = about USD 17,300.
Manager-level benchmark: computes correctly, labels the prices as date-sensitive estimates, and remarks that USD 17,000 a year is immaterial next to the integration and review costs, so the design decision should be driven by accuracy rather than token cost.

**3.** Cost per case counts every case handled; cost per successful outcome divides by the success rate, so re-work, reversals, escalations and re-contacts raise it. Dispute example: an agent auto-resolves a chargeback for USD 0.40 of inference, but if 15 percent of its decisions are reversed on appeal, each reversal costs a human investigation of 25 minutes plus a provisional-credit write-off, so the cost per successful outcome is several dollars higher than the per-case figure and the autonomy share should be re-examined.
Manager-level benchmark: makes the link to the autonomy share and to Klarna's 2025 walk-back as the public example of the gap.

**4.** Because inference was under 5 percent of three-year TCO at 600,000 cases; halving a small number is still a small number, and routing adds build cost and a second eval set. Routing becomes material when tokens per case or volume rise enough that inference approaches 15 to 20 percent of run cost, for example with long evidence packs, image inputs or many more agent steps, or at several million cases a year.
Manager-level benchmark: states the proportion, names the condition, and recommends designing the architecture to allow routing without building it on day one.

**5.** Any three of: vendor and model lock-in (lifecycle line, model refresh and re-validation); data egress and residency charges (run, platform and infrastructure); model risk validation effort (build, validation and assurance, and lifecycle for re-validation); eval set maintenance (run, monitoring and evals); observability log storage and retention (run, platform); legal and privacy review of vendor terms (build, validation and assurance).
Manager-level benchmark: places each cost in the right line and notes which are schedule risks as well as money risks (validation, legal review).
