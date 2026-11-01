# Module 05 — AI Strategy and Maturity

## 1. Why a client cares

A bank CEO does not buy "AI"; they buy a defensible answer to three board questions: where are we versus peers, what are we trying to become, and what do we have to build before any of this pays. Maturity assessment answers the first, ambition setting answers the second, and the capability frameworks in this module answer the third. Get these wrong and the use-case portfolio you build in Modules 6 and 7 has no anchor: you end up with a long list of pilots and no strategy, which is exactly the condition that the pilot-failure statistics describe [PUBLIC — Gartner, Jul 2024; MIT NANDA, Aug 2025, VERIFY].

## 2. Concept and mechanism

### 2.1 What an AI strategy actually is

An AI strategy is a resource-allocation argument. It states which business outcomes the institution will pursue with AI, which domains (end-to-end business areas such as corporate onboarding or collections) it will rewire first, which enabling capabilities it must build in what sequence, and how value will be measured and released into the P&L. Everything else (model choices, vendors, platforms) is a consequence of those decisions, not the strategy itself.

Three structural features distinguish a credible AI strategy from a technology plan:

- **It is domain-led, not use-case-led.** Isolated use cases produce isolated pilots. A domain is large enough to carry a business case, bounded enough to be rewired in 12 to 24 months, and owned by a single accountable executive. McKinsey's "Rewired" (Lamarre, Smaje and Zemmel, 2023) is the clearest published articulation of domain-based transformation [PUBLIC — Wiley, 2023].
- **It sequences enablers against value.** Data products, platform, model risk governance and talent are built to the extent and in the order that the prioritised domains require them, not as a generic "foundation" programme that consumes the first 18 months.
- **It carries a value-release mechanism.** Benefits are tied to budget lines and owners, with leading indicators (adoption, cycle time) and lagging indicators (cost, revenue, loss rates). Module 14 covers the KPI architecture; here the point is that the strategy document must name it.

### 2.2 Maturity: what is being measured

AI maturity is the institution's demonstrated ability to generate value from AI repeatedly, not its count of models or pilots. Most published maturity models converge on five or six dimensions:

| Dimension | What "low" looks like | What "high" looks like |
|---|---|---|
| Strategy and leadership | AI is an IT or innovation-lab topic | CEO-sponsored ambition, domains chosen, value targets in the plan |
| Data | Siloed, poorly governed, no ownership | Reusable data products with owners, lineage, quality SLAs |
| Technology and platform | Point solutions, no shared platform | Shared ML/LLM platform, model registry, reusable components |
| Talent and operating model | Scarce skills, vendor-dependent | Product-and-platform teams, CoE plus embedded squads, clear roles |
| Governance and risk | Ad hoc approvals, no model inventory | Tiered model risk framework covering GenAI, auditable lifecycle |
| Adoption and value tracking | Pilots, anecdotal benefits | Scaled deployments, benefits tracked to P&L, change management funded |

Note that these six dimensions map almost one-to-one onto the "Rewired" six capabilities (section 3.1), which is why that framework doubles as a maturity lens in practice.

### 2.3 Ambition: the choice that drives everything downstream

Ambition is set on two axes: breadth (how much of the institution) and depth (how radically processes change). A useful three-level scale that most practices use in some form:

- **Defend.** Use AI to protect the current franchise: cost efficiency, fraud and financial-crime effectiveness, regulatory compliance. Typical value: 5 to 15 percent of addressable operations cost in the chosen domains. Low disruption to the operating model.
- **Extend.** Use AI to grow the current franchise: relationship manager productivity, personalised pricing and offers, faster credit decisions that win share. Requires new data products and some process redesign.
- **Transform.** Redesign how a domain works around AI, including agentic process execution, and in some cases new propositions (embedded finance, AI-native servicing). This is the "Invent" end of BCG's framing (section 3.3) and the "Reshape" middle. Requires operating-model change and typically 24 to 36 months.

Ambition must be consistent with maturity. A bank at maturity level 2 declaring a "Transform" ambition across the enterprise is the most common strategic error we see [ILLUSTRATIVE — composite]. The right move is a "Transform" ambition in one or two domains, "Defend" elsewhere, and a maturity-building plan that lets the ambition widen in year two.

### 2.4 The economics that justify the ambition

Any ambition statement should be anchored to an external value estimate and then haircut. McKinsey Global Institute estimated generative AI alone could add USD 200 to 340 billion a year to global banking, roughly 2.8 to 4.7 percent of industry revenues, concentrated in corporate and retail banking operations, software engineering, marketing and risk [PUBLIC — MGI, "The economic potential of generative AI", Jun 2023]. The consultant's job is to translate that top-down figure into a bottom-up estimate for one institution: the top-down number tells the board the prize is real; the bottom-up number, built in Modules 7 to 9, tells them what is bankable.

## 3. Frameworks

### 3.1 McKinsey "Rewired": six capabilities

Source: Eric Lamarre, Kate Smaje and Rodney Zemmel, *Rewired: The McKinsey Guide to Outcompeting in the Age of Digital and AI* (Wiley, 2023) [PUBLIC — 2023]. The book argues that digital and AI transformations fail on capabilities, not ideas, and names six:

1. **Business-led digital roadmap.** Leadership alignment on a small number of domains with quantified value; a roadmap owned by business executives, not the CIO.
2. **Talent.** Build an in-house bench (engineers, data scientists, product owners, designers) rather than relying on vendors; the book argues for a specific talent-win-room approach and a technical-career track.
3. **Operating model.** Product-and-platform teams; agile at scale; business and technology co-located with shared OKRs.
4. **Technology.** Distributed, modular architecture; APIs; cloud; engineering practices (CI/CD, automated testing) that let hundreds of teams ship independently.
5. **Data.** Data products with owners, built to serve the prioritised domains; data governance embedded in delivery, not separate.
6. **Adoption and scaling.** Change management, user adoption, benefits tracking, and the "scaling muscle" to replicate a domain solution across geographies and business units.

How to apply it step by step:

1. Score the client on each capability (1 to 5) using evidence, not interviews alone: count of product teams, cycle time from idea to production, proportion of data with named owners, proportion of pilots that reached production.
2. Identify which capabilities the prioritised domains actually depend on. A KYB rewiring depends heavily on data (entity data, document stores) and governance; a relationship-manager copilot depends more on adoption and talent.
3. Set a target score per capability at the 24-month horizon that is sufficient for the domains in scope, not a generic "all 4s".
4. Turn gaps into enabler workstreams with budgets and owners, sequenced ahead of the domain waves that need them.

### 3.2 BCG 10-20-70

Source: Boston Consulting Group, popularised in its 2023 to 2024 AI publications and client work [PUBLIC — BCG, 2023–24]. The rule states that roughly 10 percent of the effort and value in an AI programme sits in algorithms and models, 20 percent in technology and data, and 70 percent in people, process and business change.

How to use it:

- **As a budget sanity check.** If a client's AI budget is 60 percent model and platform licences and 10 percent change, the programme is shaped to fail. In our experience the 70 percent rarely appears as a budget line at all; it is hidden in business-unit time that nobody has released [ILLUSTRATIVE — composite].
- **As a diagnostic lens.** Ask where the last three pilots stalled. The answer is almost always in the 70: process owners who did not redesign the workflow, controls functions that were not engaged, front-line staff who were not trained.
- **As a narrative device with CFOs.** It reframes the business case from "cost of technology" to "cost of change", which is where the CFO's scepticism actually lives.

The rule is a heuristic, not a measurement. Do not present it as empirical.

### 3.3 BCG Deploy, Reshape, Invent

Source: BCG's generative AI value framing, 2023 to 2024 [PUBLIC — BCG, 2023–24; wording VERIFY as BCG materials vary]. The three plays:

- **Deploy.** Adopt off-the-shelf GenAI tools (copilots, enterprise assistants) for broad productivity gains. Fast, low risk, modest and diffuse value, hard to capture in the P&L.
- **Reshape.** Redesign critical end-to-end functions and processes around AI, for example customer service, underwriting or software development. This is where the measurable value sits for banks.
- **Invent.** Create new products, services or business models that AI makes possible. Highest upside, highest uncertainty.

How to apply: allocate the portfolio of initiatives across the three plays and check the shape. A portfolio that is 90 percent Deploy will show adoption statistics and no P&L. A portfolio that is 50 percent Invent at a bank with maturity level 2 is a venture fund, not a strategy. A common target shape for a mid-sized bank in year one is roughly 30 Deploy, 60 Reshape, 10 Invent by investment [ESTIMATE — assumption based on practice; not a BCG figure].

### 3.4 Maturity models and their attribution

- **Gartner AI Maturity Model.** Five levels, commonly described as Awareness, Active, Operational, Systemic, Transformational [PUBLIC — Gartner, various years; VERIFY level names against the current Gartner publication, as wording has changed over time].
- **MIT Sloan Management Review and BCG AI research.** Annual research series (2017 onward) segmenting companies into Pioneers, Investigators, Experimenters and Passives based on AI understanding and adoption; later reports on organisational learning with AI [PUBLIC — MIT SMR/BCG, 2017–2022]. Useful for benchmarking language; not a scoring tool.
- **Deloitte, Accenture, IBM and others** publish their own AI maturity indices. Attribution for specific level descriptors in client decks is frequently wrong; if you cannot name the source document, present the dimensions as your own practitioner framework and say so.

### 3.5 Structure of an AI strategy document

A board-grade AI strategy has eight parts, and the order matters because each part constrains the next:

1. **Context and ambition.** Where the market is, where the bank is, and the chosen ambition level with a headline value target.
2. **Domain selection.** Three to six domains with a one-page rationale each: value pool, feasibility, strategic fit, regulatory exposure.
3. **Use-case portfolio.** Prioritised and sequenced use cases within each domain (Module 7 output), with wave allocation.
4. **Enablers.** Data, platform, model risk governance, talent and operating model, each with a current-state score, target-state score and investment.
5. **Roadmap.** Waves with milestones, dependencies and decision gates.
6. **Governance and responsible AI.** Decision rights, model risk tiers, regulatory mapping (Module 12).
7. **Economics.** Investment profile, benefits ramp, NPV and payback, sensitivities (Module 9).
8. **Value tracking and change.** KPI tree, benefits ownership, adoption plan (Module 14).

## 4. Worked BFSI example

### 4.1 Setting

[ILLUSTRATIVE — composite] "Northgate Bank": a mid-sized European universal bank with EUR 45 billion of assets, 1.8 million retail customers, 60,000 SME and corporate clients, 6,500 FTE, cost-to-income ratio of 62 percent, and an operations and technology cost base of EUR 520 million a year. The CEO has asked for an AI strategy ahead of the three-year plan. Twenty-two AI pilots have run in the past 30 months; four are in production, none has a tracked P&L benefit.

### 4.2 Maturity assessment

Scoring is 1 (nascent) to 5 (leading), evidence-based. The rubric is a practitioner composite built on the six "Rewired" capabilities [PUBLIC — Lamarre, Smaje, Zemmel, 2023, for the dimensions; scores ILLUSTRATIVE].

| Dimension | Score | Evidence gathered | Target (24 months) | Gap |
|---|---|---|---|---|
| Business-led roadmap | 2 | AI owned by Innovation Lab; no domain owners; no value targets | 4 | 2 |
| Talent | 2 | 14 data scientists, 3 ML engineers, 0 LLM engineers; 80 percent of pilot build by vendors | 3 | 1 |
| Operating model | 2 | Project-based funding; no persistent product teams for AI; 9-month idea-to-pilot cycle | 4 | 2 |
| Technology | 3 | Cloud landing zone live; one approved LLM gateway; no model registry; no eval harness | 4 | 1 |
| Data | 2 | Customer and entity data in 4 systems; no data product owners; KYB documents unstructured in 2 repositories | 4 | 2 |
| Adoption and scaling | 1 | 4 of 22 pilots in production; no benefits tracking; no change budget | 3 | 2 |
| **Average** | **2.0** | | **3.7** | **1.7** |

Interpretation for the CEO: the bank is a "Level 2, Active" institution in Gartner terms [PUBLIC — Gartner, VERIFY], with a technology platform slightly ahead of its organisation. The binding constraints are operating model, data and adoption, not technology. That finding changes the investment mix: more money into data products and change, less into additional platform licences.

### 4.3 Ambition setting

| Ambition option | Scope | Indicative value (annual, run-rate, year 3) | Investment (3 years) | Maturity required |
|---|---|---|---|---|
| Defend | Operations efficiency and financial crime across the bank | EUR 35 to 50 million | EUR 40 to 55 million | 3.0 |
| Extend | Defend plus RM and adviser productivity, personalised pricing | EUR 60 to 85 million | EUR 70 to 95 million | 3.5 |
| Transform (two domains) | Extend plus agentic rewiring of corporate onboarding and disputes | EUR 85 to 120 million | EUR 100 to 140 million | 3.7 in those domains |

[ESTIMATE — assumptions] Value is built bottom-up from the cost base: operations and technology cost EUR 520 million, of which roughly EUR 310 million is people cost in operations, servicing, financial crime and credit operations. "Defend" assumes 10 to 15 percent efficiency on that EUR 310 million (EUR 31 to 47 million) plus EUR 4 to 6 million of fraud and financial-crime loss reduction. "Transform" adds EUR 25 to 35 million from faster corporate onboarding (revenue pulled forward and abandonment reduced) and dispute cost per case falling by roughly 40 percent.

Recommendation: "Transform" in corporate onboarding (KYB) and disputes, "Defend" elsewhere, with a maturity-building plan that moves data and operating model from 2 to 4 in 18 months. The so-what for the client: the ambition is not constrained by the technology they already bought; it is constrained by the organisation they have not yet built, and the investment case should be weighted accordingly, close to the 10-20-70 shape.

### 4.4 Investment shape check against 10-20-70

| Category | Client's draft budget | Recommended | Comment |
|---|---|---|---|
| Models and algorithms (licences, inference, model build) | 35 percent | 12 percent | Over-weighted; tiering and caching cut inference cost (Module 8) |
| Technology and data (platform, integration, data products) | 45 percent | 28 percent | Data products are the real need, not more platform |
| People, process and change (redesign, training, adoption, controls engagement) | 20 percent | 60 percent | Largest under-investment; where pilots have been dying |

[ILLUSTRATIVE — composite; the 10-20-70 reference is PUBLIC — BCG, 2023–24]

## 5. Real-world case

**DBS Bank, Singapore** [PUBLIC — DBS annual reports and press, 2023–2025; figures VERIFY]. DBS is the most frequently cited example of a bank that treated AI as an enterprise capability rather than a set of pilots. Publicly reported features of its approach:

- A decade-long digital transformation preceding GenAI, including a shift to a platform operating model and heavy in-house engineering, which is the "Rewired" argument in practice.
- Roughly 800 AI and machine learning models across about 350 use cases, with economic value from AI reported to be heading above SGD 1 billion in 2025 [PUBLIC — DBS, 2024–25, VERIFY].
- Governance built around a "PURE" framework (Purposeful, Unsurprising, Respectful, Explainable) for responsible data use, pre-dating GenAI.
- In February 2025, DBS said it expected around 4,000 temporary and contract roles to be reduced over three years as AI took on more work, while continuing to hire in AI-related roles [PUBLIC — Reuters and others, Feb 2025, VERIFY].

What the case teaches: the economic value DBS reports followed years of investment in data, platform and operating model, consistent with the 70 percent of 10-20-70. The 2025 workforce announcement also shows the reputational dimension of ambition: a "Transform" ambition is a workforce strategy as much as a technology strategy, and the communications plan belongs in the strategy document.

Contrast case: **Klarna** [PUBLIC — Klarna press release, Feb 2024; CEO interviews, May 2025, VERIFY]. Klarna's 2024 announcement that its AI assistant did the work of about 700 agents was followed in 2025 by the CEO acknowledging that cost had been over-prioritised relative to service quality and that human agents would be re-hired. The lesson for ambition setting: a "Transform" ambition without a quality floor in the KPI set over-reaches, and the walk-back is public.

## 6. Consultant language

> "We should set ambition by domain, not for the enterprise. Transform where the value pool and your data allow it, defend everywhere else, and widen the ambition as the capabilities mature."

Use when a CEO wants a single enterprise-wide ambition statement and you need to make it executable.

> "Your binding constraint is not the platform you have bought; it is the operating model and data ownership you have not built yet. That is where the next euro should go."

Use after a maturity assessment shows technology ahead of organisation.

> "Twenty-two pilots and four in production is not a technology problem; it is a scaling-capability problem. The strategy has to fund the scaling muscle explicitly."

Use when presenting the pilot-to-production diagnostic.

> "I would anchor the board on the external value estimate, then show them the bottom-up bankable number, and be clear about the gap between the two."

Use when a board paper quotes McKinsey or BCG headline figures without a bottom-up build.

> "The budget shape tells me how this programme will end. If change and process redesign are 20 percent of spend, the pilots will stall for the same reasons the last ones did."

Use when reviewing a draft AI investment case.

## 7. Common mistakes juniors make

- **Confusing a use-case list with a strategy.** Thirty use cases ranked by a 2x2 is an output of Module 7, not an AI strategy. The strategy is the ambition, the domains, the enablers and the value mechanism.
- **Scoring maturity from interviews alone.** Executives rate their own function 3.5 out of 5 almost regardless of reality. Score on evidence: production rates, cycle times, data ownership coverage, proportion of spend on change.
- **Misattributing frameworks.** Presenting "Deploy, Reshape, Invent" as McKinsey, or the six capabilities as BCG, is a credibility-ending error in an MBB interview. If unsure, say "widely used in practice, attribution uncertain".
- **Letting technology maturity set the ambition.** A bank with a strong cloud platform and weak operating model will still fail at "Transform" if the ambition is set off the platform.
- **Treating 10-20-70 as data.** It is a heuristic for shaping budgets and conversations. Quoting it as an empirical finding invites the one question you cannot answer.
- **Ignoring the workforce narrative.** Any ambition above "Defend" has headcount implications. If the strategy document is silent on this, the unions, the regulator and the press will fill the silence.

## 8. Interview questions with model answers

**Q1. A mid-sized bank CEO says: "We want to be an AI-first bank in three years." How do you respond?**

I would first unpack what "AI-first" means in terms of outcomes, because the phrase can hide three very different ambitions: defending the cost base, extending the franchise, or transforming how domains run. Then I would test the ambition against maturity. I would run a rapid six-dimension assessment, built on the six capabilities in McKinsey's "Rewired" [PUBLIC — 2023]: business-led roadmap, talent, operating model, technology, data, and adoption and scaling. For a typical mid-sized bank I would expect scores around 2 out of 5 on operating model, data and adoption, which means an enterprise-wide "Transform" ambition in three years is not credible. My recommendation would be a "Transform" ambition in two or three domains where the value pool and data readiness justify it, for instance corporate onboarding and disputes, with a "Defend" ambition elsewhere and an explicit enabler plan to lift the weak dimensions. I would anchor the prize on the external estimate, for example MGI's USD 200 to 340 billion a year for banking [PUBLIC — Jun 2023], and then present a bottom-up bankable number, typically a fraction of the pro-rata top-down figure. Finally, I would shape the investment close to BCG's 10-20-70 heuristic [PUBLIC — BCG, 2023–24] so that change and process redesign are funded, because that is where previous pilots will have failed.

**Q2. How do you distinguish an AI strategy from an AI roadmap, and why does the distinction matter to a board?**

A roadmap is a sequence of initiatives with dates. A strategy is the set of choices that make that sequence defensible: which outcomes, which domains, which ambition level, which enablers in what order, and how value gets released and tracked. The distinction matters because boards approve capital against choices, not against lists. If I present a roadmap without the choices, the board cannot evaluate trade-offs; if I present the choices, the roadmap follows almost mechanically. In practice I structure the strategy document in eight parts, ambition, domains, use-case portfolio, enablers, roadmap, governance, economics, value tracking, and the roadmap is one part of eight. A second reason the distinction matters is accountability: a roadmap is owned by a programme office; a strategy assigns value to domain owners, which is what makes benefits bankable.

**Q3. What is BCG's 10-20-70 and how would you use it in a client conversation?**

It is BCG's heuristic that roughly 10 percent of the effort and value in an AI programme is in algorithms, 20 percent in technology and data, and 70 percent in people, process and business change [PUBLIC — BCG, 2023–24]. I use it in three ways. First, as a budget diagnostic: if a client's AI spend is dominated by licences and platform, the shape predicts stalled pilots. Second, as a post-mortem lens: when asking why previous pilots did not scale, the answer almost always sits in the 70, in process redesign and controls engagement that never happened. Third, as a reframing device with the CFO: it moves the conversation from "what does the technology cost" to "what does the change cost", which is the more honest question. The caveat I always add is that it is a heuristic, not a measurement, and I would never present it as empirical evidence.

## 9. Self-check quiz

1. Name the six capabilities in McKinsey's "Rewired" and state which two a corporate onboarding (KYB) rewiring depends on most, with one sentence of rationale each.
2. A bank's AI budget is 50 percent model and platform licences, 35 percent integration and data, 15 percent change and training. Using the 10-20-70 heuristic, what is the diagnosis and what is the single most important reallocation?
3. Distinguish BCG's "Deploy", "Reshape" and "Invent" plays and give one BFSI example of each.
4. Northgate Bank's maturity average is 2.0 with technology at 3 and adoption at 1. A vendor proposes a EUR 12 million enterprise GenAI platform upgrade. Write the two-sentence response you would give the CEO.
5. Calculation: a bank has EUR 400 million of operations people cost. A "Defend" ambition assumes 8 to 12 percent efficiency; a "Transform" ambition in two domains covering EUR 90 million of that cost assumes 35 percent efficiency in those domains plus 8 percent elsewhere. Compute the annual run-rate value range for each ambition.
