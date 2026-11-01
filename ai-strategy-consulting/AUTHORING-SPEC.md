# Authoring spec for the AI Strategy Consulting training programme

This file governs every module file. Read it fully before writing. The modules are compiled with pandoc into one Word document, so stick to plain pandoc Markdown.

## Files

- Module files: `ai-strategy-consulting/modules/NN-short-slug.md` (NN = two digits, 00..20).
- Quiz answer keys: `ai-strategy-consulting/answers/NN-answers.md`. Quiz answers must NOT appear in the module file. The learner asked to see answers only after attempting.
- Write in British English (organisation, programme, prioritise).

## Markdown rules (pandoc → docx)

- One H1 at the top: `# Module NN — Title`.
- The nine mandated sections are H2, in this exact order and wording:
  1. `## 1. Why a client cares`
  2. `## 2. Concept and mechanism`
  3. `## 3. Frameworks`
  4. `## 4. Worked BFSI example`
  5. `## 5. Real-world case`
  6. `## 6. Consultant language`
  7. `## 7. Common mistakes juniors make`
  8. `## 8. Interview questions with model answers`
  9. `## 9. Self-check quiz`
  (Module 0 and Module 18/19/20 may deviate where the curriculum defines a different structure; keep H2 for their top-level parts.)
- Use H3 for sub-parts inside a section. No H4 or deeper.
- Tables: pipe tables only (`| a | b |` with a `|---|---|` separator). Max 6 columns. Keep cell text short; no line breaks inside cells; no nested lists inside cells.
- Lists: `-` bullets, `1.` numbered. At most two levels of nesting.
- Use `>` blockquotes for "Consultant language" phrases and for labelled callouts.
- No HTML, no footnotes, no images, no LaTeX. Use plain text for maths, e.g. `NPV = Σ CF_t / (1+r)^t`.
- No em-dashes inside sentences; use commas or full stops. The en-dash in the H1 title ("Module NN — Title") is the only exception.
- Bold the first words of a bullet where it helps scanning. Never bold whole sentences.

## Labelling rules (non-negotiable)

Every example, number, client, and case must carry one of these labels, inline, at first mention:

- `[PUBLIC — source, year]` for things that are publicly reported. Give the organisation/publication and year, e.g. `[PUBLIC — Klarna press release, Feb 2024]`.
- `[ILLUSTRATIVE — composite]` for invented but realistic engagements, clients, numbers.
- `[ESTIMATE — assumption]` for your own assumptions (always state the assumption).
- Add `[VERIFY — date-sensitive]` to anything about regulation status, model pricing, vendor capabilities, or statistics that move quickly.

Never present an illustrative client, engagement, or number as real. Never invent a named real bank's internal numbers. If you use a real bank in a worked example, say explicitly that the numbers are illustrative.

Attribute every framework to its originator. If attribution is uncertain, write "attribution uncertain; widely used in practice" rather than guessing. Do not attribute generic tools (value vs feasibility 2x2, weighted scoring) to a specific firm.

## Depth and tone

- Audience: an experienced FS consultant (payments expert) who must sound like an AI *strategy* consultant at manager/partner level. Full technical depth, proper terminology, no cute analogies. Explain mechanisms, not just definitions.
- Worked BFSI examples must show the arithmetic step by step with real numbers (labelled ILLUSTRATIVE/ESTIMATE), in tables where useful, and must end with a one-line "so what" for the client.
- Interview answers: model answers at the level a manager-level AI consultant would give (structure first, then content, then a number or example, then the risk/caveat). 150–300 words each.
- Quiz: five questions, mix of recall, application and a short calculation. Answers go in the answers file with a two-line explanation each and a "manager-level benchmark" note of what a strong answer includes.
- Consultant language: five phrases, each a blockquote, each followed by one line on when to use it.
- Length targets: Modules 1–17 and 19: 3,500–5,000 words. Module 0: ~2,000. Module 18: 8,000–10,000. Module 20: 9,000–12,000.

## Public-fact anchors you may rely on (still label them PUBLIC with source/year; add VERIFY where marked)

Frameworks and research
- McKinsey "Rewired" (Lamarre, Smaje, Zemmel, 2023): six capabilities: business-led digital roadmap; talent; operating model; technology; data; adoption and scaling.
- BCG "10-20-70" rule for AI value: ~10% algorithms/models, ~20% technology and data, ~70% people, process and business change (BCG, popularised 2023–24).
- BCG "Deploy, Reshape, Invent" GenAI value framing (BCG, 2023–24).
- McKinsey Global Institute, "The economic potential of generative AI" (June 2023): USD 2.6–4.4 trillion annual value across use cases; banking USD 200–340 billion a year.
- MIT NANDA "The GenAI Divide" (Aug 2025): ~95% of enterprise GenAI pilots reported no measurable P&L impact. Note methodological caveats (small sample, self-reported). VERIFY.
- Gartner (July 2024): at least 30% of GenAI projects to be abandoned after proof of concept by end 2025. Gartner (June 2025): over 40% of agentic AI projects to be cancelled by end 2027. VERIFY.
- RAND Corporation (2024): more than 80% of AI projects fail, twice the rate of non-AI IT projects.
- NIST AI Risk Management Framework 1.0 (Jan 2023): four functions Govern, Map, Measure, Manage; Generative AI Profile (NIST AI 600-1, July 2024).
- ISO/IEC 42001:2023, AI management system standard (Dec 2023).
- US Federal Reserve SR 11-7 / OCC 2011-12 model risk management guidance (2011).
- UK PRA Supervisory Statement SS1/23 "Model risk management principles for banks" (published May 2023, effective 17 May 2024); five principles: model identification and model risk classification; governance; model development, implementation and use; independent model validation; model risk mitigants. Initially applies to firms with internal model (IRB) permissions. VERIFY scope.
- EU AI Act (Regulation (EU) 2024/1689): entered into force 1 Aug 2024; prohibitions apply from 2 Feb 2025; GPAI model obligations from 2 Aug 2025; most high-risk obligations from 2 Aug 2026 (Annex III) with later dates for product-embedded systems; fines up to EUR 35m or 7% global turnover. Annex III high-risk includes creditworthiness assessment of natural persons and risk assessment/pricing for life and health insurance. In Nov 2025 the Commission proposed a "digital omnibus" that would delay some high-risk deadlines; status VERIFY.
- RBI FREE-AI: committee constituted Dec 2024 (chair Pushpak Bhattacharyya, IIT Bombay); report published Aug 2025 with seven "sutras" (Trust is the foundation; People first; Innovation over restraint; Fairness and equity; Accountability; Understandable by design; Safety, resilience and sustainability) and 26 recommendations across six pillars. VERIFY exact wording.
- MAS (Singapore) FEAT principles (2018) and Veritas initiative; MAS AI model risk management information paper (Dec 2024). HKMA GenAI sandbox (2024). UK FCA/BoE AI survey (Nov 2024): ~75% of firms already using AI. VERIFY.
- Research papers: Transformers "Attention is all you need" (Vaswani et al., 2017); RAG (Lewis et al., 2020); Chain-of-thought (Wei et al., 2022); ReAct (Yao et al., 2022); Toolformer (Schick et al., 2023); Reflexion (Shinn et al., 2023); Tree of Thoughts (Yao et al., 2023); scaling laws (Kaplan et al., 2020; Hoffmann et al. "Chinchilla", 2022); LoRA (Hu et al., 2021); RLHF (Ouyang et al., 2022).
- Protocols: Model Context Protocol (Anthropic, Nov 2024); Agent2Agent protocol (Google, Apr 2025; donated to Linux Foundation, Jun 2025). VERIFY adoption claims.
- Prioritisation tools: RICE (Intercom, Sean McBride); ICE (Sean Ellis); MoSCoW (Dai Clegg, Oracle, 1994); Kano model (Noriaki Kano, 1984); weighted scoring and value-vs-feasibility 2x2 are generic.
- TCO as a term: Gartner (Bill Kirwin, 1987).
- "Services-as-software" framing: Foundation Capital and Sequoia essays (2024). VERIFY.

Public cases (use these; add VERIFY where numbers may have moved)
- Klarna: Feb 2024 announced an OpenAI-powered customer service assistant handling two-thirds of chats in its first month, doing the work of ~700 FTE, with an estimated USD 40m profit improvement in 2024. In 2025 CEO Sebastian Siemiatkowski publicly said the company had gone too far on cost and would re-hire humans for service quality (May 2025 interviews). 
- JPMorgan Chase: COiN contract-review ML (2017); LLM Suite rolled out to ~200,000 employees (2024); annual tech spend ~USD 17bn (2024). Jamie Dimon shareholder letters (2023, 2024) on AI. VERIFY figures.
- Morgan Stanley: "AI @ Morgan Stanley Assistant" built with OpenAI GPT-4 for ~16,000 financial advisers (launched Sept 2023); "Debrief" meeting-summary tool (June 2024); reported ~98% adoption among adviser teams. VERIFY.
- DBS Bank: ~800 AI/ML models and ~350 use cases; projected economic value above SGD 1bn in 2025; announced in Feb 2025 it expected to cut ~4,000 temporary/contract roles over three years as AI takes over work. VERIFY.
- HSBC: AML transaction monitoring with Google Cloud "AML AI" (Dynamic Risk Assessment); Google Cloud reported 2–4x more suspicious activity identified and ~60% fewer alerts (June 2023). VERIFY.
- Bank of America: Erica virtual assistant (launched 2018), >2bn client interactions cumulative (reported 2024), ~USD 4bn on new tech initiatives in 2025 including AI. VERIFY.
- Wells Fargo: "Fargo" assistant on Google Cloud (PaLM/Gemini); reported ~245m interactions in 2024. VERIFY.
- Goldman Sachs: GS AI Assistant firm-wide rollout (2025); piloting Cognition's "Devin" coding agent (July 2025). VERIFY.
- Citi: GenAI tools (Citi Assist, Citi Stylus) to ~140,000 employees (2024–25). VERIFY.
- BBVA: ChatGPT Enterprise licences, ~3,300 in 2024 expanded towards ~11,000 (2025). VERIFY.
- NatWest: Cora+ with IBM watsonx (2024); OpenAI collaboration (Mar 2025). VERIFY.
- Mastercard: Decision Intelligence Pro with generative AI, average ~20% fraud detection uplift, up to 300% in some cases (Feb 2024). VERIFY.
- Commonwealth Bank of Australia: Aug 2025 reversed 45 call-centre redundancies after union challenge showed AI "voice bot" had not reduced call volumes as assumed. VERIFY.
- Air Canada: Feb 2024 British Columbia tribunal (Moffatt v. Air Canada) held airline liable for chatbot's incorrect bereavement-fare statement.
- Apple Card / Goldman Sachs: Nov 2019 gender-bias allegations on credit limits; NYDFS investigation (Mar 2021) found no unlawful discrimination but criticised customer service and transparency.
- Zillow Offers: Nov 2021 wind-down after pricing-model losses (~USD 500m+ write-downs, ~25% workforce cut).
- Amazon recruiting tool bias (Reuters, Oct 2018).
- Deutsche Bank and Google Cloud strategic partnership (2020); Lloyds Banking Group AI Centre of Excellence and Google Cloud (2024–25). VERIFY.

Pricing anchors (ALL date-sensitive, label `[ESTIMATE — order of magnitude, VERIFY]`)
- Frontier model API pricing in 2025 was on the order of USD 2–5 per million input tokens and USD 8–20 per million output tokens; mid-tier models ~USD 0.5–1.5 / 2–6; small models ~USD 0.05–0.25 / 0.2–1.0. Prompt caching typically discounts cached input by 75–90%; batch APIs ~50%. Use these only as orders of magnitude and say so.

Where you need a fact not on this list, either (a) state it with a specific source and year you are confident in, or (b) label it ILLUSTRATIVE/ESTIMATE. Do not fabricate statistics.
