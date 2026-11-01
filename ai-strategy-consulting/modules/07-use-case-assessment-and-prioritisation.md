# Module 07 — Use-Case Assessment and Prioritisation

## 1. Why a client cares

Prioritisation is where the AI strategy becomes a capital allocation decision. The client has a long list of 10 to 40 use cases, a finite change capacity (typically two to four domain teams in a mid-sized bank), and a second-line function that will slow anything it does not understand. A defensible scoring method gives the executive committee a reason to say no to the loudest sponsor, gives the CFO a line of sight from score to business case, and gives the risk function an early view of what is coming. Done badly, prioritisation produces a 2x2 that everyone argues with and nobody funds.

## 2. Concept and mechanism

### 2.1 Three questions, three instruments

Assessment answers three distinct questions, and the common error is to answer them with one instrument.

| Question | Instrument | Unit of analysis | Output |
|---|---|---|---|
| How much is it worth? | Value scoring | Use case (L2 or L3) | Weighted value score, later a business case |
| Can we do it, and how hard is it? | Feasibility scoring | Use case | Weighted feasibility score |
| Should an agent do it, and how autonomously? | Agentic-fit assessment | Task (L3, sometimes L4) | Pattern and autonomy recommendation |
| What could go wrong and who must approve? | Risk overlay | Use case | Risk tier, governance route, autonomy cap |

Value and feasibility produce the 2x2. Agentic fit decides the solution pattern inside each use case. The risk overlay caps autonomy and routes governance. Sequencing then turns the result into waves.

### 2.2 Value scoring

Value is scored on the four levers that a bank CFO recognises: cost, revenue, risk and customer experience (Module 9 quantifies them). Each lever is scored 1 to 5 against anchors defined for the client, then weighted according to the ambition from Module 5.

| Lever | What it captures | Anchor for 5 | Anchor for 1 |
|---|---|---|---|
| Cost | Handle-time and FTE capacity released, vendor cost avoided | More than EUR 3 million a year run-rate | Under EUR 0.3 million |
| Revenue | Revenue pulled forward, abandonment reduced, cross-sell enabled | More than EUR 3 million a year | Negligible |
| Risk | Loss avoided, regulatory exposure reduced, control effectiveness | Material reduction in a Tier-1 risk (financial crime, credit, conduct) | No risk effect |
| Customer experience | Cycle time, effort, satisfaction, complaints | Cycle time cut by more than 50 percent on a customer-visible journey | Internal only |

Anchors are set in money or measurable outcome terms for the specific client, so that a score of 4 means the same thing across use cases. Without anchors, scoring degenerates into sponsor enthusiasm.

### 2.3 Feasibility scoring

Feasibility combines five dimensions. Scores run 1 to 5 where 5 is most feasible (so "integration complexity" is scored inversely: 5 means simple).

| Dimension | What it captures | Evidence to score it |
|---|---|---|
| Data readiness | Are inputs digital, accessible, of adequate quality, with a known owner? | Data readiness assessment (Module 4) |
| Integration complexity (inverse) | How many systems, with what access mode (API, RPA, manual)? | System inventory from the value-chain walk |
| Model and pattern maturity | Is the AI pattern proven for this task type at bank-grade accuracy? | Internal evals, peer deployments, vendor evidence |
| Regulatory exposure (inverse) | How heavily is the task regulated, and does automation change the control? | Regulatory mapping (Module 12) |
| Change effort (inverse) | How many roles, processes and controls change, and how willing is the owner? | Stakeholder assessment, workshop signals |

Weights again depend on the client. A bank with a strong platform and weak data weights data readiness heavily; a bank under regulatory remediation weights regulatory exposure heavily.

### 2.4 The agentic-fit assessment

Agentic AI is a solution pattern, not a value lever, so it is assessed at task level and feeds the solution design rather than the 2x2. The six-dimension framework below is a practitioner framework; variants are used across consulting firms and vendors and attribution is uncertain. Each dimension is scored 1 to 5 in the direction that favours agentic automation.

| Dimension | 1 (does not favour agent) | 5 (favours agent) | Why it matters |
|---|---|---|---|
| Task variability | Fully codifiable; a rules engine covers all cases | Inputs and paths vary too much for rules but stay within a bounded domain | Low variability means rules are cheaper and auditable; very high unbounded variability defeats agents too |
| Judgement bounded by policy | Expert discretion with personal regulatory accountability | Decisions follow documented policy that needs interpretation, not discretion | Agents can apply written policy; they cannot carry accountability |
| Tool and system access | Screen-only, manual, no APIs | APIs or well-defined tools for every action | Agents act through tools; no tools, no agent |
| Error tolerance and reversibility | Errors are severe and irreversible | Errors are low-impact and easily reversed | Determines autonomy level and HITL design |
| Data availability | Inputs on paper, in images, or inaccessible | Inputs digital, structured or reliably extractable | Agents reason over what they can read |
| Volume and frequency | Rare, ad hoc | High, continuous | Agent build and run cost needs volume to amortise |

Interpretation bands (total out of 30):

- **24 to 30:** candidate for autonomous agent execution with exception-based human review.
- **18 to 23:** agent with human-in-the-loop at defined gates (approve, or review above a risk threshold).
- **12 to 17:** copilot pattern; human performs the task with AI drafting or checking.
- **Below 12:** keep human, or use a rules engine if variability is low.

Two override rules apply regardless of total. If task variability scores 2 or below, default to a rules engine, because a deterministic solution is cheaper, auditable and does not need model risk validation of a stochastic component. If the risk overlay assigns Tier 1, cap the autonomy at human-in-the-loop regardless of score.

### 2.5 Risk overlay

The overlay has three parts, applied after scoring so that it modifies rather than contaminates the value and feasibility assessment:

1. **Model risk tier.** Using the client's model risk framework (aligned to SR 11-7 in the US and PRA SS1/23 in the UK [PUBLIC — Federal Reserve, 2011; PRA, May 2023, effective May 2024]), classify by materiality of decisions influenced and degree of autonomy. Tier 1 models require independent validation before use, which adds three to six months to the critical path [ESTIMATE — practice assumption].
2. **Regulatory classification.** Under the EU AI Act, creditworthiness assessment of natural persons is an Annex III high-risk use [PUBLIC — Regulation (EU) 2024/1689; VERIFY timelines, as a Nov 2025 Commission proposal would delay some high-risk obligations]. Sanctions and AML tasks carry conduct and criminal-law exposure even where the Act does not classify them as high risk. Consumer-facing decisions in the UK attract Consumer Duty scrutiny.
3. **Customer and reputational impact.** Does the use case make or materially influence a decision about a customer? Does it communicate directly with customers?

The overlay output is a tier (1 to 3), a governance route (which committees, which validation) and an autonomy cap.

### 2.6 Sequencing into waves

Prioritisation produces a ranking; sequencing produces a plan. Three considerations beyond the 2x2:

- **Dependencies.** Perpetual KYC depends on document intake and registry reconciliation being in place. A high-value use case that depends on three others belongs in a later wave even if it scores well.
- **Bundles.** Where several use cases act on adjacent stages, assess the bundle. A "reshape" of stages 2 and 3 of onboarding has a stronger business case than the four point solutions because benefits appear only when the stage's cycle time falls.
- **Capacity.** Each wave is limited by the number of product teams, the model risk validation throughput and the operations change capacity. Two to three use cases per team per wave is a typical limit [ESTIMATE — practice assumption].

The standard wave logic: Wave 1 quick wins (high value, high feasibility, low risk tier) and cheap fill-ins that build capability; Wave 2 foundational and bundled use cases that create the data and tooling for later waves; Wave 3 transformational use cases with high value and lower feasibility or higher risk tier.

## 3. Frameworks

### 3.1 Value versus feasibility 2x2

Attribution: generic portfolio tool, widely used; no single originator. Steps: define anchors; score; weight; plot; set thresholds (commonly the median or 3.0); label quadrants (quick wins, strategic bets, fill-ins, deprioritise); sanity-check the plot with the sponsor for surprises, and document why any score was changed.

### 3.2 Weighted scoring model

Attribution: generic multi-criteria decision analysis; no single originator. Steps: agree dimensions and weights with the sponsor before scoring; score with evidence; compute weighted sums; run a sensitivity check by flexing weights by plus or minus 10 points and confirming the top quartile is stable. If the ranking is unstable under small weight changes, the use cases are not meaningfully different and sequencing should be driven by dependencies instead.

### 3.3 Six-dimension agentic-fit assessment

Attribution: practitioner framework, widely used in variants, attribution uncertain. Steps in section 2.4. The output per task is a recommended pattern (rules, copilot, agent with HITL, autonomous agent) and an autonomy level on the 0 to 5 scale from Module 3.

### 3.4 Product-management scoring methods and when to use them

- **RICE** (Reach, Impact, Confidence, Effort), from Intercom, attributed to Sean McBride [PUBLIC — Intercom blog, 2016]. Useful inside a single product backlog once a use case is funded; less suited to cross-domain portfolio decisions because Reach is hard to normalise across functions.
- **ICE** (Impact, Confidence, Ease), attributed to Sean Ellis [PUBLIC — growth-hacking literature, 2010s]. Fast, coarse, useful for first triage of a raw idea list of 60 items.
- **MoSCoW** (Must, Should, Could, Won't), Dai Clegg, Oracle, 1994 [PUBLIC — 1994]. Useful for scoping a wave once the use cases are chosen.
- **Kano model**, Noriaki Kano, 1984 [PUBLIC — 1984]. Useful for customer-facing use cases to separate basic expectations from delighters; rarely used for back-office automation.

### 3.5 Risk tiering aligned to model risk management

Attribution: Federal Reserve SR 11-7 (2011) and PRA SS1/23 (2023) for the tiering logic; EU AI Act for regulatory classification [PUBLIC]. Steps in section 2.5.

## 4. Worked BFSI example

### 4.1 Portfolio and weights

[ILLUSTRATIVE — composite] Northgate Bank's prioritisation covers nine KYB use cases from Module 6 (UC2 to UC6, UC8 to UC10, UC12) plus three from other domains surfaced by the same method: agentic card dispute resolution, Level-1 disposition of transaction sanctions screening alerts, and SME credit underwriting memo drafting.

Weights agreed with the executive sponsor, reflecting a "Transform" ambition in onboarding with a cost and cycle-time emphasis:

| Value lever | Weight | Feasibility dimension | Weight |
|---|---|---|---|
| Cost | 35 | Data readiness | 25 |
| Revenue | 20 | Integration simplicity | 20 |
| Risk | 25 | Model and pattern maturity | 20 |
| Customer experience | 20 | Regulatory ease | 20 |
| | | Change ease | 15 |

### 4.2 Scored matrix

Raw scores 1 to 5; weighted totals out of 5. [ILLUSTRATIVE — composite; scores reflect the Module 6 baselines]

| Ref | Use case | Cost | Rev | Risk | CX | Value | Data | Integ | Matur | Reg | Change | Feas |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A | UC2 Intelligent document intake | 5 | 2 | 3 | 4 | 3.70 | 4 | 3 | 5 | 4 | 4 | 4.00 |
| B | UC3 Client chase agent | 3 | 3 | 1 | 5 | 2.90 | 3 | 3 | 4 | 4 | 3 | 3.40 |
| C | UC4 Registry verification and reconciliation | 4 | 2 | 4 | 3 | 3.40 | 4 | 4 | 4 | 4 | 4 | 4.00 |
| D | UC5 Ownership and UBO unwinding | 4 | 3 | 5 | 3 | 3.85 | 2 | 2 | 3 | 3 | 3 | 2.55 |
| E | UC6 Screening hit adjudication copilot | 4 | 1 | 4 | 1 | 2.80 | 4 | 3 | 4 | 3 | 4 | 3.60 |
| F | UC8 Risk rating pre-population | 2 | 1 | 4 | 1 | 2.10 | 3 | 3 | 4 | 2 | 4 | 3.15 |
| G | UC9 EDD narrative drafting | 3 | 1 | 3 | 2 | 2.40 | 3 | 4 | 4 | 3 | 4 | 3.55 |
| H | UC10 Checker quality-review copilot | 3 | 2 | 5 | 2 | 3.10 | 3 | 3 | 3 | 3 | 3 | 3.00 |
| I | UC12 Perpetual KYC | 5 | 2 | 5 | 3 | 4.00 | 2 | 2 | 3 | 3 | 2 | 2.40 |
| J | Agentic card dispute resolution | 5 | 2 | 3 | 5 | 3.90 | 3 | 2 | 4 | 3 | 2 | 2.85 |
| K | Sanctions alert Level-1 disposition | 5 | 1 | 4 | 2 | 3.35 | 4 | 3 | 4 | 2 | 3 | 3.25 |
| L | SME underwriting memo drafting | 3 | 4 | 3 | 3 | 3.20 | 2 | 3 | 4 | 2 | 3 | 2.75 |

Worked arithmetic for row A: value = 0.35 x 5 + 0.20 x 2 + 0.25 x 3 + 0.20 x 4 = 1.75 + 0.40 + 0.75 + 0.80 = 3.70; feasibility = 0.25 x 4 + 0.20 x 3 + 0.20 x 5 + 0.20 x 4 + 0.15 x 4 = 1.00 + 0.60 + 1.00 + 0.80 + 0.60 = 4.00.

### 4.3 2x2 placement (threshold 3.0 on both axes)

| Quadrant | Use cases | Reading |
|---|---|---|
| Quick wins (value and feasibility at or above 3.0) | A document intake (3.70, 4.00); C registry reconciliation (3.40, 4.00); K sanctions alert disposition (3.35, 3.25); H checker copilot (3.10, 3.00) | Fund in Wave 1; H is borderline and should run as copilot only |
| Strategic bets (value at or above 3.0, feasibility below) | I perpetual KYC (4.00, 2.40); D UBO unwinding (3.85, 2.55); J disputes (3.90, 2.85); L underwriting memo (3.20, 2.75) | Highest value in the portfolio; feasibility gaps are data and integration, which are fixable enablers |
| Fill-ins (value below 3.0, feasibility at or above) | B chase agent (2.90, 3.40); E screening adjudication (2.80, 3.60); G EDD drafting (2.40, 3.55); F risk rating (2.10, 3.15) | Cheap; fund where they build capability for a strategic bet |
| Deprioritise | None below 3.0 on both | The long list was already cleaned in Module 6 |

Sensitivity check: flexing cost weight to 25 and CX weight to 30 moves J above I and B into quick wins; the top-quartile set (A, I, J, D) is otherwise stable, so the ranking is robust enough to sequence on.

### 4.4 Risk overlay

| Ref | Model risk tier | Regulatory note | Autonomy cap |
|---|---|---|---|
| A | 3 | Document handling; no customer decision | Autonomous above confidence threshold |
| C | 3 | Data reconciliation; discrepancies to analyst | Autonomous for matches; HITL for discrepancies |
| D | 2 | Influences UBO identification, an AML control | Draft for analyst confirmation |
| I | 2 | Changes periodic review control; MLRO sign-off on design | Autonomous for low-risk refresh only |
| J | 2 | Customer-facing decisions; consumer protection rules | Autonomous for low-value, clear-cut cases; HITL otherwise |
| K | 1 | Sanctions; false negatives carry criminal-law exposure | HITL always; agent proposes, analyst disposes |
| L | 1 to 2 | Credit decisions; if borrowers are sole traders the EU AI Act high-risk classification for creditworthiness may apply [VERIFY] | Draft only; underwriter decides |
| B, E, F, G, H | 3 (E: 2) | Copilots and communication; no autonomous decisions | Copilot or agent with HITL |

The overlay changes the plan: K scored as a quick win but its Tier 1 status means validation adds months and autonomy is capped at HITL, so its benefit is lower than the raw score implied. It stays in Wave 1 because the value is still strong at HITL (analyst time per alert falls even when the analyst decides).

### 4.5 Task-level agentic fit for eight KYB steps

Scores 1 to 5 per dimension in the direction that favours an agent; total out of 30. [ILLUSTRATIVE — composite]

| Task | Variability | Judgement bounded | Tool access | Error tolerance | Data | Volume | Total | Recommendation |
|---|---|---|---|---|---|---|---|---|
| 1.3 Determine document requirements | 2 | 2 | 4 | 4 | 4 | 4 | 20 | Rules engine (variability override); LLM only to explain the pack to the client |
| 2.2 Chase outstanding documents | 4 | 4 | 4 | 5 | 4 | 5 | 26 | Autonomous agent; escalate after two cycles |
| 2.4 Completeness and validity check | 3 | 3 | 4 | 4 | 4 | 5 | 23 | Agent with HITL below confidence threshold |
| 3.3 Ownership and UBO unwinding | 5 | 4 | 3 | 3 | 2 | 3 | 20 | Agent drafts UBO schedule; analyst confirms |
| 3.5 Reconcile client versus registry data | 4 | 4 | 4 | 4 | 3 | 4 | 23 | Agent with HITL on unresolved discrepancies |
| 4.3 Adjudicate screening hits | 4 | 4 | 4 | 3 | 4 | 5 | 24 | Score says autonomous; Tier 1 overlay caps at HITL |
| 5.3 Draft EDD narrative | 5 | 3 | 3 | 3 | 3 | 2 | 19 | Copilot drafting with analyst edit and MLRO approval |
| 6.2 MLRO approval of high-risk client | 3 | 1 | 2 | 1 | 3 | 2 | 12 | Human; copilot case summary only |

### 4.6 Three-wave roadmap

| Wave | Timing | Use cases | Rationale | Enablers built |
|---|---|---|---|---|
| 1 Quick wins | Months 0 to 6 | A, C, K (HITL), H (copilot), E (fill-in) | High feasibility, Tier 2 or 3 except K; builds document and data foundations | Document AI pipeline, registry API integration, eval harness, LLM gateway hardening |
| 2 Foundational bundle | Months 6 to 15 | D plus B (with A and C, this reshapes stages 2 and 3 end to end), G, J pilot in one card portfolio | Stage-level cycle time benefit; disputes pilot proves agentic pattern with HITL | Entity and ownership data product, agent orchestration platform, model risk Tier 2 validation route |
| 3 Transformational | Months 15 to 30 | I perpetual KYC, J scale across portfolios, L underwriting memo | Highest value; depends on Wave 1 and 2 data products and on validated agent patterns | Event-driven architecture, Tier 1 validation, workforce transition plan |

Capacity check: two domain teams in Wave 1 carrying five use cases, of which two are copilots, is at the upper limit of the two to three per team guideline.

The so-what for the client: the four highest-value use cases are all strategic bets, and their feasibility gaps are the same two enablers, entity data and integration. Funding those enablers in Wave 1 converts roughly EUR 20 million of annual run-rate value from "bet" to "plan" [ESTIMATE — assumption, to be built out in the Module 9 business case].

## 5. Real-world case

**JPMorgan Chase, portfolio approach to AI** [PUBLIC — JPMorgan shareholder letters 2023 and 2024; press coverage 2024; figures VERIFY]. JPMorgan has described running several hundred AI use cases in production, governed through a central AI and data organisation, with an explicit focus on quantified value: Jamie Dimon's 2023 letter stated that AI was already delivering value in fraud, marketing and risk, and the firm has publicly discussed internal value estimates in the USD 1 to 2 billion range [PUBLIC — JPMorgan, 2023–24, VERIFY]. The prioritisation lesson is institutional: a central function that scores and sequences use cases across lines of business, with the lines owning the benefits, is what allows a portfolio of hundreds rather than a scatter of pilots. The LLM Suite rollout to about 200,000 employees in 2024 [PUBLIC — Reuters and others, 2024, VERIFY] sits in BCG's "Deploy" category and was sequenced alongside, not instead of, the domain-specific "Reshape" work.

**Klarna** [PUBLIC — Klarna, Feb 2024; CEO interviews, May 2025, VERIFY] is the cautionary case for the risk overlay. The customer-service assistant was a high-value, high-feasibility use case and was deployed at high autonomy. The 2025 walk-back on service quality shows what a risk overlay would have flagged: customer-facing autonomy needs a quality floor and an exception route, and the autonomy cap should be set by error tolerance, not by the cost case alone.

## 6. Consultant language

> "We score value and feasibility separately, then overlay risk. If we blend them, the risk function will unblend them for us later, at a worse moment."

Use when a sponsor asks for a single composite score.

> "Agentic fit is a solution question, not a value question. It decides how we build a use case, not whether we fund it."

Use when a stakeholder wants to rank use cases by how "agentic" they are.

> "Your four most valuable use cases all fail feasibility for the same two reasons. That is not four problems; it is two enablers we should fund first."

Use when presenting the strategic-bets quadrant.

> "The score says this task could run autonomously. The risk tier says it must not. The tier wins, and the business case is built at the capped autonomy level."

Use when the overlay reduces a quick win's benefit.

> "The ranking is stable under a 10-point weight change, so we can stop arguing about weights and start arguing about sequencing."

Use after the sensitivity check, to close the scoring debate.

## 7. Common mistakes juniors make

- **Scoring without anchors.** A 4 on value must mean the same money across use cases. Without anchors the matrix measures sponsor charisma.
- **Blending risk into feasibility.** Regulatory exposure belongs in feasibility as a difficulty signal, but the autonomy cap and governance route must be a separate overlay, or the plan will be wrong about what the use case can do.
- **Treating the 2x2 as the plan.** Dependencies and bundles move use cases between waves regardless of quadrant.
- **Ranking by agentic fit.** Agentic is a pattern. A task can be a perfect agent candidate and worth very little.
- **Ignoring the variability override.** Low-variability tasks belong to rules engines; proposing an agent for them adds cost, latency and model risk for no gain, and an experienced interviewer will catch it.
- **Skipping sensitivity.** If the ranking flips when a weight moves by 10 points, the differences are noise and you should say so.

## 8. Interview questions with model answers

**Q1. How would you prioritise 30 AI use cases for a bank, and how would you defend the result to the executive committee?**

I would separate three questions. First, value: score each use case 1 to 5 on cost, revenue, risk and customer experience against money-denominated anchors agreed with the CFO, weighted to the ambition; for a cost-led ambition I would weight cost around 35 percent. Second, feasibility: score data readiness, integration simplicity, pattern maturity, regulatory ease and change ease, weighted to the bank's weaknesses, typically data. Plot the two, set the threshold at 3.0, and read the quadrants. Third, a risk overlay that assigns a model risk tier aligned to SR 11-7 or SS1/23 and a regulatory classification, including EU AI Act high-risk status for natural-person creditworthiness, and caps autonomy accordingly. I would then sequence into three waves using dependencies, bundles and team capacity rather than the quadrant alone. To defend it, I would show the anchors, the evidence behind each score, a sensitivity test proving the top quartile is stable under a 10-point weight change, and the reasons any score was changed after sponsor review. The committee can disagree with a weight; it cannot easily disagree with a process that is transparent and reproducible, and that is what makes the result fundable.

**Q2. Describe how you assess whether a task is suitable for an agent, with a banking example where the answer is no.**

I use a six-dimension task-level assessment: variability, whether judgement is bounded by written policy, tool and system access, error tolerance and reversibility, data availability, and volume. Each is scored 1 to 5 in the direction that favours an agent, totals of 24 or more suggest autonomous execution with exception review, 18 to 23 an agent with human gates, 12 to 17 a copilot, and below 12 a human or a rules engine. Two overrides matter. If variability is low, a rules engine is the right answer regardless, because it is cheaper and auditable. If the risk overlay puts the task in Tier 1, autonomy is capped at human-in-the-loop regardless of score. A banking "no" is MLRO approval of a high-risk client: judgement is discretionary and personally accountable under AML regulation, errors are severe and hard to reverse, and volume is low. It scores around 12. The right design is a copilot that produces a case summary and highlights inconsistencies so the MLRO decides faster. Sanctions hit adjudication is the subtler case: it scores about 24 on fit, but Tier 1 exposure caps it at agent-proposes, analyst-disposes.

**Q3. Your scoring puts a Tier 1 sanctions use case in the quick-wins quadrant. The sponsor wants it fully automated in six months. What do you say?**

I would agree it is a priority and disagree on the autonomy. The value is real because analyst handle time per alert drops even when the analyst makes the final decision, so I would keep it in Wave 1 at human-in-the-loop with the agent drafting the disposition and rationale. I would explain that Tier 1 means independent validation before go-live under the bank's model risk framework, which typically adds three to six months to the critical path, and that false negatives in sanctions carry criminal-law exposure, so no supervisor will accept autonomous disposition on day one. I would then offer a path: build the eval harness with a golden set of adjudicated alerts, run the agent in shadow mode to measure agreement with analysts, and propose a staged autonomy increase, for example auto-closing only the lowest-risk name-match categories once agreement exceeds an agreed threshold for a sustained period. That turns the disagreement into a roadmap with evidence gates, which is what the sponsor actually needs to take to the risk committee.

## 9. Self-check quiz

1. State the three questions that assessment must answer and the instrument for each. Why is agentic fit assessed at task level rather than use-case level?
2. Using the Northgate weights, compute the value score for a use case scoring Cost 4, Revenue 3, Risk 2, CX 5, and the feasibility score for Data 3, Integration 4, Maturity 4, Regulatory 2, Change 3. Which quadrant does it fall into at a 3.0 threshold?
3. Explain the two override rules in the agentic-fit framework and give a KYB example of each.
4. Perpetual KYC scored highest on value (4.00) but sits in Wave 3. Give two sequencing reasons.
5. A task scores 5 on variability, 2 on judgement bounded by policy, 4 on tool access, 2 on error tolerance, 4 on data and 4 on volume. Total it, state the band, and say what the judgement and error-tolerance scores imply for the human-in-the-loop design.
