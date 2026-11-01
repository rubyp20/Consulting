# Recap 3 — Modules 11 to 15

Revise this the night before an interview. Drawn from Modules 11 to 15; module numbers are in brackets.

## Ten things to remember

1. A PoC proves the technique, a pilot proves the benefit; four stages with quantified technical, operational, business and risk exit criteria written before the stage, each with a kill option. [11]
2. Before the PoC: production path, business owner, data access, provisional model-risk tier, and pilot and MVP funding approved in principle against gates; these cure the ten causes of pilot purgatory. [11]
3. Read the override rate both ways (too low is automation bias, too high is poor quality); re-validate per rail or geography; the scaling metric is time to the second use case. [11]
4. EU AI Act: in force 1 Aug 2024, prohibitions Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026 (omnibus may delay, VERIFY); natural-person creditworthiness is high-risk; an in-house builder is provider and deployer. [12]
5. SR 11-7 (2011) is the parent; SS1/23 (effective 17 May 2024) brings qualitative and judgement models in scope with five principles; NIST is Govern, Map, Measure, Manage; ISO/IEC 42001 is a management standard, not accuracy evidence; RBI FREE-AI has seven sutras. [12]
6. Validate the system in use, not the foundation model; keep the decision in an explainable component; tier by materiality, autonomy, reversibility, regulatory exposure, population and opacity. [12]
7. Centralise what is scarce, risky or reusable; decentralise domain knowledge and speed; the binding constraint is usually validation capacity; the operating model is the RACI, not the org chart. [13]
8. The funding model decides where benefits are counted, so design the benefits register before the budget; hybrid funding is the common landing point; platform before people. [13]
9. Adoption moves on performance measures, role design, incentives and co-design; pair every efficiency KPI with a quality KPI; manage on leading, report on lagging; hold a control group. [14]
10. Effort, cost and price reduction are three numbers (55%, 35%, 25 to 28% in the example); negotiate step-downs, decision-level SLAs, audit rights and ownership of data, prompts and taxonomy at exit; accountability cannot be outsourced. [15]

## Frameworks and attributions

| Framework | Originator | One-line use | Module |
|---|---|---|---|
| Stage-Gate | Robert G. Cooper, 1980s to 1990s | Stages separated by go, kill, hold or recycle gates | 11 |
| Four-dimension success criteria grid | Practitioner; attribution uncertain | Technical, operational, business, risk criteria per gate | 11 |
| NIST AI RMF 1.0 | NIST, Jan 2023 (GenAI Profile, Jul 2024) | Govern, Map, Measure, Manage | 12 |
| PRA SS1/23 five principles | Prudential Regulation Authority, May 2023 | Gap-assess an existing MRM framework for GenAI | 12 |
| EU AI Act compliance pathway | Regulation (EU) 2024/1689 | Inventory, screen, classify, role, obligations, FRIA, register | 12 |
| ISO/IEC 42001 | ISO/IEC, Dec 2023 | Structure the AI policy suite; vendor evidence | 12 |
| Four-fifths rule | US EEOC Uniform Guidelines, 1978 | Disparate-impact screen at a 0.80 ratio | 12 |
| Hub-and-spoke design method | Practitioner; variants by firm | Inventory demand, classify capabilities, size hub and spokes, set RACI and funding | 13 |
| Kotter eight steps | John Kotter, 1996 | Programme-level change narrative | 14 |
| ADKAR | Prosci, Jeff Hiatt, 2003 | Diagnose where a role population is stuck | 14 |
| Trust-in-automation calibration | Lee and See, 2004 | Design HITL for calibrated reliance | 14 |
| Three-layer KPI framework with causal chain | Generic practitioner | System, operational, business KPIs with owners | 14 |
| Cost-stack decomposition | Standard sourcing-advisory practice | Line-by-line automatability and new cost lines | 15 |
| Service-as-software | Foundation Capital and Sequoia essays, 2024 (VERIFY) | Lens on software-first entrants pressuring BPO pricing | 15 |

## Numbers worth memorising

| Number | What it is | Label | Module |
|---|---|---|---|
| At least 30% of GenAI projects abandoned after PoC by end 2025 | Gartner prediction | [PUBLIC — Gartner, Jul 2024; VERIFY] | 11 |
| Precision 99.5%; coverage 45%; true-match recall 100%; override 0.3 to 2.0% | Sanctions alert-triage gate thresholds | [ILLUSTRATIVE — composite] | 11 |
| 44% auto-closed; about 8.9 FTE on one rail | MVP outcome on SEPA volume of about 147,000 alerts | [ILLUSTRATIVE — composite] | 11 |
| EUR 35m or 7% of global turnover | Maximum EU AI Act fine for prohibited practices | [PUBLIC — Regulation (EU) 2024/1689; VERIFY] | 12 |
| 17 May 2024 | PRA SS1/23 effective date | [PUBLIC — PRA; VERIFY scope] | 12 |
| Extraction 98%; memo faithfulness 99%; override 3 to 15% | Control thresholds for an agentic underwriting assistant | [ILLUSTRATIVE — composite] | 12 |
| 94 FTE; GBP 11.9m a year; GBP 60m benefit ambition | Harbourside Bank hub-and-spoke operating model | [ILLUSTRATIVE — composite; salaries ESTIMATE] | 13 |
| 420,000 disputes; GBP 31 to GBP 19 per dispute; 85 FTE released; override 22% to 9% | Calder Cards KPI tree at month 12 | [ILLUSTRATIVE — composite] | 14 |
| 400 to 170 FTE; EUR 20.28m to EUR 13.11m; EUR 133 to EUR 86, 100 or 96 per file | KYC refresh managed service before and after, by pricing model | [ILLUSTRATIVE — composite] | 15 |

## Phrases to use with a client

> "A PoC proves the technique; a pilot proves the benefit. We will not book a benefit we have not measured in the workflow." [11]

> "We validate the system in use, not the foundation model: prompts, retrieval, tools and oversight are all in the model boundary." [12]

> "Your binding constraint is validation capacity, not engineering capacity." [13]

> "The control is only as good as the override rate is honest." [14]

> "The price should follow the cost stack, not the headcount." [15]

## Traps

- Calling a PoC a pilot and extrapolating benefits, or writing success criteria after seeing results. [11]
- Treating the EU AI Act as applying to all banking AI, or presenting LLM-generated rationales as explanations of the model's decision. [12]
- Recommending a federated model to a low-maturity bank, or proposing an operating model with no independent validation role. [13]
- Reporting adoption as logins, celebrating a near-zero override rate, or using a one-month baseline in a seasonal process. [14]
- Equating effort, cost and price reduction, or forgetting that a provider's agent making risk decisions is a model in the bank's inventory. [15]

## Thirty-second self-test

1. Name five of the ten causes of pilot purgatory and the remedy for each.
2. State the EU AI Act timeline and which banking use case is Annex III high-risk.
3. What are the five SS1/23 principles, and what in its model definition captures LLM systems?
4. Give the rule for what to centralise in a hub-and-spoke model and the usual binding constraint.
5. Explain why a 55% effort reduction became a 25 to 28% price reduction.
