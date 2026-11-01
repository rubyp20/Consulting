# Module 4 — Quiz answers

**1.** Availability (documents in systems without APIs); quality (multiple versions of the same procedure); structure and parseability (scanned documents, tables as images); metadata (no type, date, jurisdiction tags); access control and lineage (folder-level entitlements only); privacy and residency (PII in free text); labelled examples (outcomes recorded, rationales not); freshness (no owner for corpus updates). Any five.
Benchmark: dimensions paired with concrete gaps, and the observation that readiness is scored per use case.

**2.** HNSW is a graph-based approximate nearest-neighbour index with high recall and fast queries at high memory cost; IVF clusters vectors and searches only the nearest clusters, trading some recall for lower memory. Hybrid search combines vector similarity with lexical matching, which is essential because names, aliases, identifiers and codes have weak semantic signal and need exact or near-exact lexical matching.
Benchmark: correct trade-off and the recognition that index choice matters less than hybrid search and metadata filtering.

**3.** Verbosity bias (prefers longer answers): use rubric-based scoring with length-neutral criteria. Position bias (prefers the first option): randomise order in pairwise comparisons. Self-preference and inconsistency: calibrate against a human-labelled subset, report agreement, and keep a permanent human sample.
Benchmark: three named biases with specific mitigations and mention of calibration statistics.

**4.** A narrative that recommends dismissing a true sanctions match is a regulatory breach with potential enforcement consequences; the risk appetite for that failure is zero, so any miss blocks release. Faithfulness at 0.97 accepts a small rate of unsupported claims because every narrative is reviewed by an analyst at assist level, so the residual risk is controlled downstream; the threshold would rise if autonomy increased.
Benchmark: links thresholds to risk appetite and to the autonomy level rather than to achievable performance.

**5.** Inference: 220,000 x 0.04 = USD 8,800. QA: 1.5 x 70,000 x 1.27 = USD 133,350. Tooling: USD 120,000. Total run cost about USD 262,000. Benefit: 12 x 65,000 x 1.27 = USD 990,600. Ratio roughly 3.8 to 1 benefit to run cost, before build cost and before the benefit ramp.
Benchmark: correct arithmetic, the observation that inference is 3% of run cost, and the caveat that build cost and ramp are excluded.
