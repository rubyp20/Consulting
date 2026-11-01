# Recap 2 — Modules 6 to 10

Revise this the night before an interview. Drawn from Modules 6 to 10; module numbers are in brackets.

## Ten things to remember

1. Assess AI fit at task level (L3) and build business cases at stage level; decompose from real cases walked end to end, not documentation. [6]
2. Heat is not fit: the heatmap (five dimensions, heat out of 25, hot zone at 17 or above) shows pain; fit assessment shows whether AI can reach it; park non-AI fixes separately. [6]
3. A use case is pattern plus task plus outcome with a baseline; without a baseline it is a hypothesis; cluster use cases on the same stages into a bundle. [6]
4. Score value and feasibility separately, then overlay risk; agree weights before scoring, anchor the scales, flex weights by 10 points before arguing. [7]
5. Six-dimension agentic fit (variability, bounded judgement, tool access, error tolerance, data, volume) decides how to build, not whether to fund; low variability overrides to rules; the risk tier caps autonomy. [7]
6. Sequence into quick wins, a foundational bundle and transformational bets; when the top bets fail feasibility for the same enablers, fund the enablers first. [7]
7. TCO is build, run, change and lifecycle; at back-office volume inference is under 5% of TCO, overheads add 20 to 40%, and the autonomy share is the largest sensitivity. [8]
8. Show cost per attempt, per completed case and per successful outcome; budget a model migration and re-validation every 12 to 24 months. [8]
9. Business case: reconciled baseline, benefits by lever at run-rate, evidence haircuts, decomposed ramp, TCO costs, NPV, IRR, payback, tornado, scenarios, probability weighting; book only capacity the owner signed for. [9]
10. Build versus buy is one decision per stack layer; score on the client test set, weight exit heavily, and treat model change notification and version pinning as model-risk controls. [10]

## Frameworks and attributions

| Framework | Originator | One-line use | Module |
|---|---|---|---|
| L1 to L4 process decomposition | Conventions from APQC PCF and BPM practice; L3 as AI unit is practitioner convention | Decompose to the single decision or transformation | 6 |
| Pain-point heatmap | Generic operations tool | Score tasks on pain dimensions; find hot zones | 6 |
| Value versus feasibility 2x2 | Generic; no single originator | Place scored use cases in quadrants | 7 |
| Weighted scoring model | Generic multi-criteria decision analysis | Weighted sums with anchored scales and sensitivity | 7 |
| Six-dimension agentic-fit assessment | Practitioner; variants by firm; attribution uncertain | Recommend rules, copilot, agent with HITL or autonomous per task | 7 |
| RICE; ICE; MoSCoW; Kano | Intercom (Sean McBride, 2016); Sean Ellis; Dai Clegg (Oracle, 1994); Noriaki Kano (1984) | Backlog, triage, wave scoping, customer-facing feature classes | 7 |
| Risk tiering | Federal Reserve SR 11-7 (2011); PRA SS1/23 (2023); EU AI Act | Overlay that caps autonomy and sets validation route | 7 |
| Three-year TCO template | Generic finance practice | Build, run, change, lifecycle by year with unit economics | 8 |
| Benefits realisation | UK OGC, Managing Successful Programmes | Identify, own, baseline, track benefits | 9 |
| MGI generative AI value estimate | McKinsey Global Institute, Jun 2023 | Top-down sanity check on a bottom-up case | 9 |
| Layered sourcing decision | Practitioner; attribution uncertain | Build, buy or partner per stack layer | 10 |
| Concentration and exit lens | EBA outsourcing guidelines 2019; PRA SS2/21; DORA from Jan 2025 (VERIFY) | Criticality, concentration, substitutability, exit plan | 10 |

## Numbers worth memorising

| Number | What it is | Label | Module |
|---|---|---|---|
| 7,200 onboardings; 9,500 reviews; 140 FTE | Northgate KYB baseline | [ILLUSTRATIVE — composite] | 6 |
| Six tasks = 58% of touch time | Hot zones in the 25-task KYB decomposition | [ILLUSTRATIVE — composite] | 6 |
| Value 35/20/25/20; feasibility 25/20/20/20/15 | Weights for cost, revenue, risk, CX; data, integration, maturity, regulatory, change | [ILLUSTRATIVE — composite] | 7 |
| 3.70 value, 4.00 feasibility | Document intake row A, worked arithmetic | [ILLUSTRATIVE — composite] | 7 |
| USD 0.410 vs USD 0.179 per dispute | Loaded inference, frontier only vs tiered routing | [ILLUSTRATIVE; pricing ESTIMATE, VERIFY] | 8 |
| USD 13.6m over three years; USD 40.50 to USD 21.55 | Dispute platform TCO and cost per dispute at 600,000 disputes | [ILLUSTRATIVE — composite] | 8 |
| 24 to 11 analyst hours per case | KYB pilot measurement driving the cost lever | [ILLUSTRATIVE — composite] | 9 |
| GBP 2.50m cost plus GBP 1.17m revenue margin; GBP 2.58m after haircuts | Booked run-rate benefit | [ILLUSTRATIVE — composite] | 9 |
| 20%, 69%, 90%, 95%, 95% | Five-year benefit ramp | [ILLUSTRATIVE — composite] | 9 |
| NPV GBP 0.56m at 10%; IRR about 16%; junior build NPV GBP 4.1m | The credibility gap between haircut and un-haircut cases | [ILLUSTRATIVE — composite] | 9 |
| USD 200 to 340bn a year | MGI generative AI value for banking | [PUBLIC — MGI, Jun 2023] | 9 |
| Build 4.00 vs Vendor A 3.70; TCO EUR 4.45m vs Vendor B EUR 3.40m | AML narrative tool RFP scoring and three-year cost | [ILLUSTRATIVE — composite] | 10 |

## Phrases to use with a client

> "A use case without a baseline is a hypothesis. We cannot score it, cost it or defend it, so it goes back to discovery." [6]

> "The score says this task could run autonomously. The risk tier says it must not. The tier wins, and the business case is built at the capped autonomy level." [7]

> "Inference is the cost everyone argues about and the one that matters least at this volume. Integration, assurance and the team are the TCO." [8]

> "We have booked only the capacity the business owner has signed for; the rest is reported as unbooked upside." [9]

> "This is not one build-or-buy decision; it is four decisions, one per layer of the stack." [10]

## Traps

- Decomposing from documentation, or letting the workshop produce technologies ("use GenAI for onboarding") instead of pattern plus task plus outcome. [6]
- Scoring without anchors, blending risk into feasibility, or ranking use cases by how agentic they are. [7]
- Pricing only the licences, assuming inference dominates, and forgetting human review, overheads and lifecycle costs. [8]
- Counting released hours as savings with no headcount bridge, double counting efficiency and rework, or treating revenue pull-forward as recurring. [9]
- Ranking models on public benchmarks, accepting default data-use terms, and scoping a systems integrator without capability transfer. [10]

## Thirty-second self-test

1. What are the five pain dimensions in the KYB heatmap and what defines a hot zone?
2. List the six agentic-fit dimensions and the override that sends a task to a rules engine.
3. Why is inference under 5% of TCO in the dispute example, and what is the largest sensitivity?
4. Name four CFO challenges to a business case and the pre-emptive answer to each.
5. What six RFP criteria did the AML narrative evaluation weight, and why was Build chosen over the cheapest vendor?
