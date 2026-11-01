# Module 2 — How LLMs Work, at Consultant Depth

## 1. Why a client cares

Every number in an LLM business case, from inference cost to accuracy to latency, is determined by mechanics the client's executives have never seen: tokenisation, context length, retrieval quality, sampling. A consultant who understands the mechanism can tell a CIO why the pilot's cost doubled when the prompt grew, why the assistant answers confidently and wrongly, and why fine-tuning is usually the wrong first move. That understanding is the difference between relaying a vendor's claims and advising.

## 2. Concept and mechanism

### 2.1 Tokens and tokenisation

LLMs do not process words or characters. They process tokens: sub-word units produced by a tokeniser trained on the pre-training corpus, usually with byte-pair encoding (Sennrich et al., 2016) or a variant such as SentencePiece. A token is typically three to four characters of English text, so roughly 750 words per 1,000 tokens [ESTIMATE — common rule of thumb; varies by model and language]. Consequences the client must understand:

- **Pricing is per token**, input and output priced separately, output typically three to five times the input price [ESTIMATE — order of magnitude, VERIFY].
- **Non-English and specialised text costs more.** Code, legal boilerplate, SWIFT MT messages and non-Latin scripts tokenise less efficiently, sometimes two to three times more tokens per character.
- **Numbers tokenise poorly.** A long IBAN or account number may become many tokens, and the model reasons over those fragments, which is one reason arithmetic and exact-match tasks should be delegated to tools.
- **Structured documents carry overhead.** JSON keys, XML tags and table formatting consume tokens without carrying information; flattening a document before sending it can cut cost by 20 to 40% [ESTIMATE — assumption].

### 2.2 The transformer and attention

The architecture is the transformer (Vaswani et al., 2017). Each token is mapped to an embedding vector; the sequence passes through stacked layers, each containing a self-attention block and a feed-forward block. Self-attention computes, for every token, a weighted combination of all other tokens in the context, with the weights derived from learned query, key and value projections. The output is a next-token probability distribution over the vocabulary.

Two properties follow directly and are worth stating precisely to technical clients:

- **Attention is quadratic in sequence length in its naive form.** Doubling the context roughly quadruples attention compute, which is why long contexts cost more and run slower, even where vendors charge linearly. Engineering advances (FlashAttention, grouped-query attention, sparse attention) reduce the constant but not the fundamental scaling.
- **Generation is autoregressive.** Each output token requires a forward pass conditioned on everything before it. Output tokens are therefore slower and more expensive than input tokens; latency is dominated by output length, not input length, once the prompt has been processed.

Modern decoder-only LLMs (the GPT, Claude, Gemini and Llama families) use this architecture with scale: parameter counts from a few billion to over a trillion, trained on trillions of tokens. Scaling laws (Kaplan et al., 2020; Hoffmann et al., 2022) showed that capability improves predictably with compute, data and parameters, which is why frontier models are built by a handful of well-capitalised labs.

### 2.3 Pre-training, alignment and what the model "knows"

Pre-training is next-token prediction over a corpus. The result is a base model with broad knowledge but poor instruction following. Alignment turns it into an assistant: supervised fine-tuning on instruction-response pairs, then reinforcement learning from human feedback, RLHF (Ouyang et al., 2022), or variants such as direct preference optimisation. Alignment makes the model helpful and safe, but also introduces sycophancy and over-confidence, since human raters reward confident answers.

What the model knows is parametric knowledge frozen at its training cut-off, stored implicitly in weights. It is not a lookup table. Retrieval of a specific fact is probabilistic: common facts are reliably reproduced, rare facts are not. This is the technical root of hallucination and the reason bank-specific knowledge must be supplied at inference time, not assumed.

### 2.4 Context window

The context window is the maximum number of tokens the model attends to in one call, including system prompt, conversation history, retrieved documents and the generated output. Frontier models in 2025 offered 128,000 to 1,000,000-plus tokens [PUBLIC — vendor documentation, 2025; VERIFY]. Three consultant-level implications:

1. **Cost scales with what you put in.** Every call re-sends the whole context. A 100,000-token document summarised in a ten-turn conversation costs ten times the document unless prompt caching is used (vendors offer cached-input discounts of 75 to 90% [ESTIMATE — VERIFY]).
2. **Quality degrades with irrelevant length.** The "lost in the middle" effect (Liu et al., 2023) showed models attend less reliably to information in the middle of long contexts. More context is not more accuracy.
3. **Long context is not memory.** Nothing persists between calls unless the application stores and re-sends it. "Memory" in agent systems is an engineering layer (Module 3), not a model property.

### 2.5 Embeddings and vector similarity

An embedding model maps text to a dense vector (typically 256 to 3,072 dimensions) such that semantically similar texts are near each other under cosine similarity or dot product. Embedding models are separate from, and much cheaper than, generative models. They power semantic search, clustering, deduplication and retrieval.

Properties to know: embeddings are model-specific (vectors from two models are not comparable); they are sensitive to chunk length (a 50-word chunk and a 2,000-word chunk of the same document embed differently); and they capture topical similarity better than exact-match semantics, which is why hybrid search (vector plus keyword BM25) outperforms pure vector search on names, codes and identifiers, exactly the content banks care about.

### 2.6 Retrieval-augmented generation (RAG), end to end

RAG (Lewis et al., 2020) grounds the model's generation in retrieved documents supplied in the prompt. The pipeline has distinct stages, each with design choices and failure modes.

| Stage | What happens | Key design choices | Typical failure |
|---|---|---|---|
| Ingestion | Documents parsed to text | Layout-aware parsing for PDFs and tables; OCR for scans | Tables flattened to nonsense; headers lost |
| Chunking | Text split into retrievable units | Fixed-size with overlap; semantic or structural chunking (by section, clause); parent-child chunks | Chunks split mid-clause; context lost |
| Enrichment | Metadata attached | Document type, date, jurisdiction, product, access rights | No access-control metadata, so leakage |
| Embedding and indexing | Vectors stored in a vector index | Embedding model choice; index type (HNSW, IVF); hybrid index | Wrong embedding model for domain |
| Retrieval | Top-k chunks fetched for a query | Query rewriting; hybrid search; re-ranking with a cross-encoder; k and similarity thresholds | Wrong chunks retrieved; right chunk ranked 12th |
| Generation | LLM answers using retrieved context | Prompt instructs to answer only from context; cite sources; abstain if absent | Model ignores context and answers from parametric memory |
| Post-processing | Validation and formatting | Citation checking; faithfulness scoring; structured output | Unchecked claims pass through |

Chunking deserves emphasis because it is where most RAG quality problems originate. Fixed 500-token chunks with 50-token overlap are the default and are wrong for most banking documents, where a policy clause or a KYC procedure step is the natural unit. Structural chunking (split on headings and numbered clauses) with a parent-child scheme (retrieve small child chunks for precision, pass the parent section for context) is usually the right starting design.

Retrieval evaluation is separate from generation evaluation. Measure recall at k (is the correct passage in the top k?), mean reciprocal rank (how high is it?), and context precision (what fraction of retrieved chunks is relevant?). A pipeline with 70% recall at 5 cannot produce better than roughly 70% correct answers no matter how good the generator is.

Variants to know by name: GraphRAG (entity-relationship graphs over documents, useful for beneficial-ownership and counterparty questions), agentic RAG (the model decides when and what to retrieve, iteratively), and long-context RAG (fewer, larger chunks with models that handle long contexts well).

### 2.7 Prompting, RAG and fine-tuning: the decision logic

The three ways to shape model behaviour address different problems. The decision rule most practitioners use [attribution uncertain; widely used in practice]: use prompting to control format and behaviour, RAG to supply knowledge, fine-tuning to teach style or a narrow skill where prompting has demonstrably plateaued.

| Lever | Changes | Cost | Latency effect | Knowledge freshness | When to use |
|---|---|---|---|---|---|
| Prompt engineering (system prompt, few-shot examples, chain-of-thought) | Behaviour and format within a call | Near zero | Adds input tokens | None | Always first |
| RAG | Knowledge available at inference | Engineering plus retrieval infrastructure | Adds retrieval latency and tokens | Real-time, controllable | Whenever bank-specific facts are needed |
| Fine-tuning (full or parameter-efficient such as LoRA, Hu et al., 2021) | Weights; style, format, narrow skill | Training data preparation, compute, re-evaluation | Can reduce prompt length | Frozen at training; must retrain | After prompting plateaus; for consistent style or domain vocabulary; for smaller models to match frontier on a narrow task |

Fine-tuning does not reliably add facts and is a poor way to add knowledge; it also creates a model the bank must govern under model-risk rules, with its own validation and refresh cycle. Juniors propose fine-tuning first because it sounds rigorous. Partners propose it last.

### 2.8 Hallucination: mechanism and mitigation

Hallucination is the generation of fluent content not supported by the input or by fact. Its mechanism follows from the training objective: the model is optimised for plausible continuation, not truth; alignment rewards confident answers; and parametric recall of rare facts is probabilistic. Three forms matter in banking: fabricated facts (a regulation that does not exist), unfaithful summaries (a correct fact from the wrong document), and fabricated citations or identifiers.

Mitigations, in order of effectiveness in practice [ESTIMATE — practitioner consensus]:

1. **Grounding via RAG with instruction to abstain** when the answer is not in context.
2. **Structured outputs and tool calls** for anything that must be exact: look up the account, calculate the fee, retrieve the clause.
3. **Faithfulness checking** by a second model or rule: every claim must map to a cited span.
4. **Lower temperature** (reduces variance, does not remove hallucination).
5. **Human review** calibrated to risk: sample, exception or full.
6. **Evaluation on a golden set** so the rate is measured, not assumed (Module 4).

Note the thing you cannot do: eliminate hallucination. The client's control framework must assume a non-zero rate and design for detection.

### 2.9 Frontier, mid-tier, small and open models

Frontier models (the largest proprietary models from the major labs) lead on reasoning and breadth. Mid-tier models from the same labs trade some capability for roughly three to ten times lower price [ESTIMATE — VERIFY]. Small models (1 to 10 billion parameters) and open-weight models (Llama, Mistral, Qwen, Gemma families and others) can be self-hosted, fine-tuned and run at very low marginal cost, with capability adequate for classification, extraction and routing tasks.

Selection logic for a bank:

- **Data residency and confidentiality** may require self-hosting or a sovereign cloud region, which favours open-weight models or hyperscaler-hosted proprietary models with contractual zero-retention.
- **Task difficulty** determines the minimum capable tier. Routing and classification rarely need frontier; multi-step reasoning over complex documents usually does.
- **Volume** determines whether the price gap matters. At a million calls a month, a tenfold price difference is a budget line; at ten thousand, it is noise.
- **Model routing**: send easy cases to a small model and escalate hard cases, often cutting cost by half or more while holding quality [ESTIMATE — practitioner experience].

Open-weight does not mean free: inference infrastructure, MLOps, security patching and evaluation are the bank's cost. Module 8 covers this.

### 2.10 Latency and cost trade-offs

Latency has three components: time to first token (prompt processing), generation time (output tokens times per-token time) and orchestration overhead (retrieval, tool calls, network). For a customer-facing chat, time to first token under one second and streaming output are expected. For back-office batch work, latency is irrelevant and batch APIs with roughly 50% discounts [ESTIMATE — VERIFY] become attractive. Reasoning models that "think" before answering multiply both latency and output cost by a factor that can exceed ten; they are justified for hard judgement tasks, not for drafting letters.

## 3. Frameworks

### 3.1 The "shape the model" ladder (prompt, retrieve, tune)

Described in 2.7. Steps: (1) write the system prompt and test on a golden set; (2) add few-shot examples; (3) add retrieval if the failure is missing knowledge; (4) add structured outputs and tools if the failure is exactness; (5) consider fine-tuning only when the residual failure is style or a narrow skill and you have 500-plus high-quality examples [ESTIMATE — common practitioner threshold].

### 3.2 Token-economics model

A reusable calculation [ILLUSTRATIVE — standard practitioner method]: annual inference cost = volume x (input tokens x input price + output tokens x output price) x (1 + retry and evaluation overhead) x (1 - caching and batching discount). Always show the overhead and discount terms explicitly; juniors omit them and the number is wrong by a factor of two in either direction.

### 3.3 RAG quality decomposition

Attribute end-to-end accuracy to retrieval recall and generation faithfulness separately: accuracy is bounded above by retrieval recall, and the gap between recall and accuracy is a generation problem. This decomposition tells you where to invest and is the first analysis to run when a pilot under-performs.

## 4. Worked BFSI example

[ILLUSTRATIVE — composite] A UK bank's corporate KYC (KYB) team must produce a structured summary of each client's onboarding file: ownership structure, nature of business, source of funds, adverse media and risk rating rationale. Volume: 18,000 new onboardings and 42,000 periodic refreshes a year, 60,000 cases in total. Average file: 35 pages of mixed documents, about 25,000 tokens after parsing.

Design A: whole file in the prompt, frontier model.

| Item | Value | Basis |
|---|---|---|
| Input tokens per case | 25,000 file + 3,000 system prompt and schema = 28,000 | [ESTIMATE] |
| Output tokens per case | 2,500 (structured summary) | [ESTIMATE] |
| Input price | USD 3.00 per million | [ESTIMATE — order of magnitude, VERIFY] |
| Output price | USD 15.00 per million | [ESTIMATE — VERIFY] |
| Input cost per case | 28,000 / 1,000,000 x 3.00 = USD 0.084 | |
| Output cost per case | 2,500 / 1,000,000 x 15.00 = USD 0.0375 | |
| Cost per case | USD 0.1215 | |
| Retry and eval overhead | +30% | [ESTIMATE — one in five cases re-run, plus LLM-as-judge scoring] |
| Annual cost | 60,000 x 0.1215 x 1.30 = USD 9,477 | |

Design B: structural chunking, RAG per section, mid-tier model for extraction and frontier model only for the risk-rating rationale.

| Item | Value | Basis |
|---|---|---|
| Extraction calls per case | 6 sections x 4,000 input tokens x mid-tier USD 0.80 per million = USD 0.0192 | [ESTIMATE — VERIFY pricing] |
| Extraction output | 6 x 400 tokens x USD 3.20 per million = USD 0.0077 | |
| Rationale call (frontier) | 6,000 input x 3.00 + 800 output x 15.00 per million = USD 0.018 + 0.012 = USD 0.030 | |
| Embedding cost | 25,000 tokens x USD 0.10 per million = USD 0.0025 | [ESTIMATE — VERIFY] |
| Cost per case | USD 0.0594 | |
| Overhead | +30% | |
| Annual cost | 60,000 x 0.0594 x 1.30 = USD 4,633 | |

Interpretation. Design B halves inference cost and, more importantly, improves faithfulness because each extraction sees only the relevant section. But the inference saving (about USD 4,800 a year) is immaterial next to the engineering cost of the RAG pipeline (USD 150,000 to 300,000 build [ESTIMATE — assumption]). The real reasons to choose Design B are quality (section-level grounding, citation per field) and model-risk defensibility, not token cost. The business value sits elsewhere: if the summary saves 45 minutes of analyst time per case [ESTIMATE], that is 45,000 hours a year, or roughly 25 FTE at 1,800 productive hours each, which at a loaded cost of GBP 65,000 [ESTIMATE] is about GBP 1.6m of capacity. Inference cost is under 1% of the benefit.

So what for the client: "Token cost is a rounding error here; design for faithfulness and auditability, and let the benefit case rest on analyst hours, with a benefit ramp tied to measured adoption."

## 5. Real-world case

[PUBLIC — Morgan Stanley and OpenAI announcements, Sept 2023; subsequent press coverage 2024; VERIFY figures] Morgan Stanley's "AI @ Morgan Stanley Assistant" gives roughly 16,000 financial advisers retrieval-augmented access to the firm's research and procedures library of around 100,000 documents. Publicly reported design features align with this module: the firm invested heavily in document curation and chunking, built an evaluation process in which advisers and subject experts graded answers before release, and restricted the assistant to answering from the firm's content. Reported adoption reached around 98% of adviser teams. In 2024 the firm added "Debrief", which summarises client meetings and drafts follow-up emails. The lesson is that the value came from the retrieval corpus and the evaluation discipline, not from the model, which was a commercially available frontier model.

[PUBLIC — Moffatt v. Air Canada, British Columbia Civil Resolution Tribunal, Feb 2024] A customer-facing chatbot gave incorrect information about bereavement fares; the tribunal held the airline liable for the chatbot's statements. The mechanism was classic hallucination of policy detail without grounding. For banks the implication is that an ungrounded assistant is a conduct risk, and that "the chatbot said it" is not a defence.

## 6. Consultant language

> "The model is a statistical model of language, not a system of record. Our design supplies the facts at inference time and validates every claim against them."

Use when positioning RAG and groundedness to a risk committee.

> "We should separate retrieval quality from generation quality. If recall at five is 70%, no prompt will get us above 70%."

Use when a pilot under-performs and the team is tuning prompts.

> "Fine-tuning is the last lever, not the first. It adds a model we have to govern and it does not add knowledge."

Use when a technology team proposes fine-tuning early.

> "Inference cost scales with context, so our architecture decision is also a cost decision. Chunk and retrieve rather than stuff the prompt."

Use in architecture reviews.

> "We assume a non-zero hallucination rate and design for detection, not for prevention."

Use with the CRO and internal audit.

## 7. Common mistakes juniors make

- Describing the LLM as "reading" or "understanding" documents without stating the retrieval and grounding design.
- Proposing fine-tuning to add bank knowledge.
- Estimating cost from input tokens only, ignoring output tokens, retries, evaluation calls and multi-turn re-sending.
- Chunking by fixed size and then blaming the model for poor answers.
- Treating long context windows as a reason not to build retrieval.
- Quoting a single "accuracy" number without saying what was measured against what.
- Using a reasoning model for a drafting task and wondering why latency and cost exploded.
- Assuming open-weight means cheap, forgetting infrastructure, MLOps and evaluation.

## 8. Interview questions with model answers

**Q1. Explain RAG to a COO and tell me where it fails.**

RAG means that when the model is asked a question, the system first retrieves the relevant passages from the bank's own documents and gives them to the model alongside the question, with instructions to answer only from those passages and cite them. It lets us use a general-purpose model with bank-specific, current, access-controlled knowledge without retraining anything. It fails in three places. First, ingestion: scanned PDFs and tables parsed badly give the model garbage. Second, retrieval: if the right passage is not in the top results, the answer cannot be right; we measure this as recall. Third, generation: the model may ignore the passages and answer from memory, or blend two passages incorrectly; we measure this as faithfulness. The operational implication is that the programme needs a document-curation workstream and an evaluation harness from day one, and those usually cost more than the model.

**Q2. When would you recommend fine-tuning?**

Rarely, and only after prompting and retrieval have plateaued on a measured golden set. Fine-tuning is appropriate to teach consistent style and format (a house tone for customer letters), to teach a narrow skill the base model performs inconsistently (classifying dispute reasons into our 40 internal codes), or to bring a smaller, cheaper or self-hostable model up to frontier performance on one narrow task, which can matter for cost at very high volume or for data-residency reasons. It is not appropriate for adding knowledge, because the model does not reliably recall fine-tuned facts and the knowledge goes stale. The costs the client often misses are governance costs: a fine-tuned model is a model under SS1/23 or SR 11-7, with validation, monitoring and a refresh cycle every time the base model is deprecated.

**Q3. Our pilot cost three times the estimate. What probably happened?**

Four usual suspects, in order of likelihood. Multi-turn conversations re-send the whole history on every turn, so a ten-turn conversation costs far more than ten single calls; prompt caching mitigates this. The prompt grew: teams add instructions, examples and retrieved chunks until the input is five times the original estimate. Output was under-estimated, and output tokens are three to five times the price of input. And hidden calls: retries, evaluation calls, query rewriting and LLM-as-judge scoring can double call volume. My remediation would be to instrument token usage per call type, cap retrieved context with re-ranking, enable caching, and route simple turns to a smaller model. I would also check whether a reasoning model was used for routine steps.

## 9. Self-check quiz

1. Why are output tokens more expensive and slower than input tokens? Give the architectural reason.
2. A RAG pipeline has recall at 5 of 72% and end-to-end answer accuracy of 61%. Where is the larger problem and what would you change first?
3. State the three distinct problems that prompting, RAG and fine-tuning each solve, and give the one thing fine-tuning does not do well.
4. Recompute the Design A annual cost from Section 4 if the bank adopts prompt caching that cuts the effective price of the 3,000-token system prompt and schema by 90% and leaves everything else unchanged. Is the saving material?
5. Name two chunking strategies and explain why fixed-size chunking is usually wrong for policy documents.
