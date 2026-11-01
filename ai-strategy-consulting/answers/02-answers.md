# Module 2 — Quiz answers

**1.** Generation is autoregressive: each output token requires a full forward pass conditioned on all previous tokens, so output tokens are produced sequentially, while input tokens are processed in parallel in one pass. Vendors price output higher to reflect this compute and latency profile.
Benchmark: uses the word autoregressive and links it to both latency and price.

**2.** Retrieval is the binding constraint: accuracy is bounded by recall, so 28 points of error come from retrieval and about 11 from generation. Fix retrieval first: structural chunking, hybrid search, re-ranking and query rewriting; then address generation faithfulness.
Benchmark: performs the decomposition explicitly and names at least two retrieval improvements.

**3.** Prompting controls behaviour and format within a call; RAG supplies knowledge at inference time; fine-tuning changes weights to teach style, format or a narrow skill. Fine-tuning does not reliably add factual knowledge and that knowledge goes stale.
Benchmark: three distinct problems, plus the governance cost of a fine-tuned model as a bonus point.

**4.** Cached portion: 3,000 tokens at 90% discount saves 2,700 x 3.00 / 1,000,000 = USD 0.0081 per case. Over 60,000 cases with the 1.30 overhead: 60,000 x 0.0081 x 1.30 = about USD 632 a year. Not material; caching matters for multi-turn conversations with large shared prefixes, not for single-shot batch processing.
Benchmark: correct arithmetic and the judgement that caching's value depends on the usage pattern.

**5.** Fixed-size with overlap; structural or semantic chunking (by heading, clause or paragraph), optionally with parent-child retrieval. Fixed-size chunks split clauses mid-sentence, separate conditions from their exceptions, and lose the heading context that tells the model which policy a passage belongs to, which degrades both retrieval and faithfulness.
Benchmark: names two strategies and gives a mechanism-level reason, not just "it works better".
