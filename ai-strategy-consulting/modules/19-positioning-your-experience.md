# Module 19 — Positioning Your Own Experience as an AI Strategy Consultant

## 1. Why a client cares

A partner selling an AI engagement is selling judgement, not hours. The client wants to know that the person across the table has made the hard calls before: where to draw agent boundaries, when to stop a pilot, how to defend a number to a CFO. Interviewers are proxies for that client. When they probe "what was *your* role", they are testing whether you own decisions or only execute them. Your three projects already contain strategy-grade decisions. This module makes them visible, honestly, and in the language a manager-level AI strategy consultant uses.

## 2. Concept and mechanism

### How an MBB-style interviewer scores an experience story

Experience interviews at MBB and MBB-adjacent AI practices (QuantumBlack, BCG X, Bain Vector) are scored on four things, in roughly this priority order. Attribution: this is a practitioner synthesis of published MBB interview guidance and partner practice; the exact rubrics are proprietary and vary by firm.

| Dimension | What they listen for | Red flag |
|---|---|---|
| Ownership | "I decided", "I recommended", "I pushed back" | Passive voice; "the team did" throughout |
| Judgement | Trade-offs you weighed and why you chose one side | Listing activities without a decision |
| Impact | A quantified or clearly described client outcome you can defend | Vague "improved efficiency" |
| Altitude | Can you move between task detail and the client's P&L in one breath | Stuck at task level, or stuck at slogan level |

The "strategy vs ops" probe is really an altitude test. An ops answer stays at task level ("I mapped the process"). A strategy answer connects the same task to a decision the client had to make ("I mapped the process to establish which steps had the judgement profile that justified an agent rather than a rule, which set the scope and the business case").

### The three mechanisms that convert an implementer story into a strategy story

1. **Decision ledger.** For each project, list every decision made during the engagement, who made it, and which ones you influenced with analysis. Interviewers reward decisions you shaped even when a senior person signed them off. "I built the analysis that led the partner to recommend X" is a legitimate ownership claim.
2. **Altitude ladder.** Every task sits on a ladder: task → workstream output → engagement recommendation → client outcome. Practise stating your contribution at all four rungs in two sentences. Your as-is process mapping (task) produced a pain-point heatmap (workstream output) that determined which three steps went into the agentic scope (recommendation) and therefore the size of the benefit case (client outcome).
3. **De-risking framing.** Prototypes, process maps and scoring frameworks are strategy artefacts when they remove uncertainty from a decision. Your vibe-coded prototype was not "coding"; it was a cheap experiment that tested the agent-boundary hypothesis before the client committed engineering budget. That is exactly what a strategy consultant should do before writing a business case.

### Honesty boundary

You may claim: analysis you performed, recommendations you drafted, decisions you influenced, artefacts you built, client conversations you led or co-led. You may not claim: decisions you were not in the room for, production outcomes you did not measure, or work by engineers you did not direct. Where you do not know a number, say so and give the range the team used. Interviewers at this level check references and can smell inflation; an honest "my part was X, the team's result was Y" scores higher than an inflated "I delivered Y".

## 3. Frameworks

### Framework A: STAR to consulting-narrative conversion

STAR (Situation, Task, Action, Result) is the standard behavioural-interview structure; attribution uncertain, widely used in HR practice since the 1980s. It is fine for HR screens and weak for consulting interviews because it has no slot for the decision or the hypothesis. Convert it as follows.

| STAR element | Consulting narrative element | What changes |
|---|---|---|
| Situation | Client ask and why it mattered to the P&L or regulator | Add the business stake and the client sponsor's level |
| Task | The question we had to answer, stated as a hypothesis | Replace "I was asked to" with "the question was whether" |
| Action | Key decisions and why, with the analysis behind each | Replace activity list with two or three decisions and trade-offs |
| Result | Client benefit, your personal contribution, what you would do differently | Add the "so what" and a reflective point |

The reflective point is deliberate. Partners trust people who can name a weakness in their own work.

### Framework B: the four-rung altitude ladder

State every project at four rungs. Practise until each rung is one sentence.

1. **Task rung:** what you physically did.
2. **Workstream rung:** what output the workstream produced.
3. **Engagement rung:** what recommendation that output enabled.
4. **Client rung:** what the client gained, in money, risk or time.

### Framework C: the probe-defence table

For each project, anticipate the five most likely probes and prepare a weak answer (to recognise and avoid) and a strong answer. The tables below are your drafts; refine with real figures.

### Framework D: the experience fact sheet

Before interviews, fill one page per project with only facts you can defend. Template at the end of Section 4.

## 4. Worked BFSI example: your three projects, rewritten

All three narratives below are [ILLUSTRATIVE — composite] in their numbers. The square-bracket placeholders must be replaced with real figures from your engagement files, or deleted. Do not insert numbers you cannot defend.

### Project A: Agentic-fit assessment of corporate KYB at a UK Tier-1 bank

**30-second version.**

> At a UK Tier-1 bank we were asked which parts of corporate onboarding, the KYB process, were genuinely suited to agentic AI rather than conventional automation. I decomposed the process to task level and scored each step on a six-dimension agentic-fit framework covering task variability, judgement required, system access, error tolerance and reversibility, data availability, and volume. That scoring was the basis for the scope the bank adopted: a supervisor-led multi-agent design covering [N] of [M] steps, with human approval retained on the risk-rated decisions. The business case rested on that scope, so the scoring was where the value was decided.

**2-minute version.**

*Client ask.* The bank's corporate onboarding took [X] days end to end and consumed [Y] FTE across document collection, entity resolution, UBO (ultimate beneficial owner) identification, screening adjudication and risk rating. The COO sponsor wanted to know whether agentic AI, which several vendors were pitching, would actually change the economics, or whether it was conventional automation with a new label.

*What we delivered.* A task-level decomposition of KYB into [approximately 25] steps; a six-dimension agentic-fit score for each; a target design of a supervisor-led (hierarchical) multi-agent system with specialist agents for document intake, entity and UBO resolution, screening adjudication and case narrative, under an orchestrating supervisor; a human-in-the-loop design that kept risk rating and any adverse decision with an analyst; and the inputs to the business case.

*Key decisions and why.* First, we rejected the vendor's "agent for everything" scope. Roughly [a third] of steps were deterministic, for example document completeness checks and registry lookups, and belonged in rules or API integrations; putting them in an agent would have added cost and non-determinism for no gain. Second, we chose a supervisor-led pattern rather than peer-to-peer agents because the bank's model risk team needed one accountable control point for every decision path; a hierarchical design gives you one place to log, test and explain. Third, we kept the final risk rating human because the error tolerance dimension scored lowest there and the regulatory consequence of a wrong onboarding decision is asymmetric.

*My personal role.* I owned the decomposition and the scoring. I ran the SME sessions that produced the step-level inputs, calibrated the six dimensions with the risk function so that the scores would survive model-risk scrutiny, and wrote the scoring rationale that went into the steering committee paper. The target architecture was designed with the engineering lead; I owned the question of what went inside the agent boundary and what stayed outside it.

*Client benefit.* The adopted scope targeted [Y%] of handling effort and a cycle-time reduction from [X] to [X'] days. [State only the figures from the actual business case; if you only know the range, give the range and say so.] The structural benefit was that the bank had a defensible, reusable method for deciding where agents belong, which it later applied to [other processes if true].

*What I would do differently.* I would have brought model risk into the scoring calibration a week earlier. We lost time re-justifying dimension weights after the fact.

**Probe-defence table.**

| Likely probe | Weak answer | Strong answer |
|---|---|---|
| "Who designed the six dimensions?" | "It was the firm's framework" | "We adapted a practitioner framework; I led the calibration of weights with the client's risk function, which is where the real judgement sat, because the weights decided scope" |
| "Why supervisor-led and not a single large agent?" | "That is the standard pattern" | "Accountability and testability. One supervisor gives model risk one control point and lets us test specialist agents in isolation against golden sets" |
| "What did you personally decide?" | "I supported the team" | "I decided which steps were scored as rules-not-agents and defended that to the vendor and the sponsor" |
| "What went wrong?" | "Nothing major" | "Our first weights overvalued volume; two high-volume deterministic steps scored as agent-fit until risk pushed back. We re-weighted error tolerance" |
| "Did it go live?" | Overclaim | State exactly what stage it reached and what was measured |

### Project B: Agentic AI points of view across disputes, sanctions, KYC and credit underwriting

**30-second version.**

> I worked on a set of agentic AI points of view for core banking operations: disputes, sanctions screening, KYC and credit underwriting. On underwriting I owned the as-is diagnostic, running SME interviews to map the end-to-end process and surface pain points. That diagnostic is what decides whether an agentic proposition is credible, because it tells you which pain points are judgement problems an agent can address and which are data or policy problems that no model fixes. The output shaped the proposition's scope and its value hypothesis.

**2-minute version.**

*Client ask.* [Internal practice-building or client-funded; state which.] The firm needed defensible, bank-ready points of view on where agentic AI changes the economics of four operational processes, so that partners could open client conversations with a hypothesis rather than a generic deck.

*What we delivered.* For each process: an as-is process map, a pain-point analysis, a target agentic pattern, a value hypothesis and the risk and control implications. For underwriting I ran [N] SME interviews across credit analysts, relationship managers and credit risk, and produced the as-is map and pain-point heatmap.

*Key decisions and why.* The underwriting diagnostic surfaced that the largest pain point was not analysis time but information assembly: analysts spent [a share] of their time gathering and normalising financial statements, covenant data and bureau information from disconnected systems. That shifted the proposition from "AI writes the credit memo" to "an orchestrated set of agents assembles, reconciles and pre-populates, with the analyst owning the judgement". The second decision was to treat credit decisioning itself as out of scope for autonomy because it is a regulated model under SR 11-7 style regimes and, for natural persons in the EU, a high-risk use under the EU AI Act Annex III [PUBLIC — Regulation (EU) 2024/1689, 2024; VERIFY status]. Positioning the agent as a pre-processor rather than a decider kept the proposition inside what a bank's model risk function could approve.

*My personal role.* I owned the as-is diagnostic for underwriting end to end: interview guide, interviews, synthesis, pain-point heatmap, and the "what this means for the agentic scope" section. I contributed the payments and disputes process knowledge to the disputes point of view.

*Client benefit.* [If client-funded: state the outcome.] For the practice: a proposition with a specific, defensible value hypothesis; propositions built on a real as-is diagnostic are the ones that survive a client COO's first question, which is always "do you understand how we actually do this today".

*What I would do differently.* Quantify the pain points during the interviews, not afterwards. Asking "how many hours a week" in the room is worth more than estimating it later.

**Probe-defence table.**

| Likely probe | Weak answer | Strong answer |
|---|---|---|
| "So you did process mapping, that is ops work" | "Yes, I did the mapping" | "The map was the evidence base for a scoping decision: it moved the proposition from memo-writing to information assembly, which is where the value and the regulatory room were" |
| "What was the biggest pain point?" | Generic list | One specific finding with the share of analyst time, and the decision it drove |
| "Why not automate the credit decision?" | "Too risky" | "Regulatory classification: high-risk under the EU AI Act for natural persons and a Tier-1 model under most bank MRM frameworks. Autonomy there needs validation effort that would wipe out the case" |
| "How did you validate SME claims?" | "We trusted them" | "Triangulated with system timestamps and case samples where available, and labelled the rest as SME estimate" |
| "What was the value hypothesis?" | No number | A ranged estimate with the lever named, labelled as hypothesis |

### Project C: Working multi-agent dispute-resolution prototype

**30-second version.**

> I built a working multi-agent prototype for card dispute resolution: an orchestrator, scoped specialist agents with their own system prompts, retrieval over scheme rules with deliberate chunking choices, a rules engine for the deterministic checks and human-in-the-loop gates on the decisions that mattered. I built it to settle design questions cheaply before anyone committed engineering budget: where the agent boundary sits, what must stay in rules, and where a human has to approve. Those answers are what went into the scoping and risk discussions.

**2-minute version.**

*Client ask or purpose.* [State whether this was for a client, a pursuit, or practice development.] The open questions were design questions that decks cannot answer: does an orchestrator-plus-specialists design actually hold together on real dispute types; which steps break when given to a model rather than a rule; and how much human review the design needs to be safe.

*What we delivered.* A working prototype with an orchestrator agent, specialist agents for intake and classification, evidence gathering, scheme-rule application and customer communication, a retrieval layer over scheme dispute rules, a rules engine for reason-code validity and timeframe checks, and human-in-the-loop gates on write-off decisions and customer-facing outcomes.

*Key decisions and why.* First, reason-code validity and chargeback timeframes went into a rules engine, not an agent, because they are deterministic and a model's error rate on them is pure downside. Second, chunking of the scheme rules was by rule clause rather than by fixed token window, because retrieval quality on clause-level questions was materially better and the agent's citations became auditable. Third, the human gate sat on financial outcomes above a threshold and on any customer-facing adverse decision, mirroring how a bank's operational risk function would want it. Fourth, each specialist agent had a narrow system prompt and a restricted tool list; a broad "dispute agent" with all tools hallucinated actions it had no business taking.

*My personal role.* I designed and built the prototype myself using AI-assisted coding. The design decisions were mine; I validated them against [N] sample dispute scenarios and documented the failure modes.

*Client benefit.* The prototype converted architecture debates into evidence. It let the team scope the proposition to the agent-suited steps, size the human review effort realistically, and show a sponsor a working flow rather than a diagram. [If any measured results exist, for example accuracy on sample cases, state them with the sample size; otherwise say "qualitative".]

*What I would do differently.* Build the evaluation set first. I retrofitted a golden set of scenarios after the prototype worked, which is the wrong order.

**Probe-defence table.**

| Likely probe | Weak answer | Strong answer |
|---|---|---|
| "Vibe coding is not strategy" | Defensive | "Agreed, and I did not build it to ship. I built it to de-risk three scoping decisions before the client spent engineering money. That is what a strategy team should do" |
| "Why a rules engine inside an agentic system?" | "Hybrid is best practice" | "Determinism where the answer is deterministic. Timeframes and reason codes have one right answer; an agent adds cost and error there" |
| "How did you measure it?" | "It worked" | Sample size, scenario coverage, failure modes documented; honest about what was not measured |
| "Would it survive production?" | "Yes" | "No. It would need an eval harness, observability, model-risk validation and integration with the case system. Its value was in settling the design, not in being production code" |
| "What broke?" | "Nothing" | A specific failure: the broad agent attempting out-of-scope actions, the fixed-window chunking giving weak citations |

### Section A: answering "were you strategy or implementation?"

The question is a trap only if you pick a side. The manager-level answer owns both and states the altitude at which you add most value.

> "Both, deliberately, and in a specific order. My strategy work is where I spend most of my time: scoping which processes and steps justify agentic AI, framing the business case, and setting the human-in-the-loop and risk posture. I go into implementation detail for one reason: an AI strategy that has not been tested against how the system actually behaves is a slide, not a strategy. The prototype work and the process mapping are how I make sure the recommendations I give a COO will survive contact with their model risk team and their engineers. If you need someone to run a production engineering team, that is not my role. If you need someone to decide what gets built, defend why, and know when the engineers are telling you something the business case has missed, that is."

Three follow-ups to prepare:

- "Give an example where implementation knowledge changed a strategy recommendation." Use the rules-vs-agent decision from Project C, or the information-assembly finding from Project B.
- "Give an example where you stayed out of the detail." Use the point where you handed the architecture to the engineering lead in Project A and owned only the agent boundary.
- "Where do you want to be in three years?" Leading AI engagements end to end: diagnostic, scoping, business case, delivery oversight, with engineering partners owning the build.

### Section B: payments depth as an AI differentiator

Most AI consultants come from data science or generic digital. Deep payments knowledge is rare in AI practices and is directly relevant. Position it in three ways.

| Payments asset | Why it matters for AI | How to say it |
|---|---|---|
| ISO 20022 expertise | Structured, richer remittance and party data is an AI enabler: better entity resolution, better sanctions screening context, fewer free-text investigations | "ISO 20022 migration gives banks the structured data that AI in payments operations has been missing. I know which fields matter and which banks have actually populated them" |
| Real-time payments | Fraud and authorised push payment decisions must happen in sub-second windows; this constrains model latency, favours small models and pre-computed features, and shapes where agents can and cannot sit | "In RTP the decision window is milliseconds. That rules out heavy LLM calls in the authorisation path and pushes agentic AI to pre-transaction education and post-transaction investigation" |
| Cross-border and investigations | Exceptions and investigations are text-heavy, multi-party and rule-bound: an ideal agentic domain, and one where you know the message flows and the SLAs | "Cross-border investigations are a textbook agentic use case: structured messages, documented rules, high volume, human sign-off at the end. I have mapped these flows for years" |
| Cards and disputes | Scheme rules are codified, dispute volumes are large, and the human judgement is narrow and describable | "Scheme dispute rules are effectively a rulebook. That is why a hybrid rules-plus-agents design works, and I have built one" |
| Open banking | Consent, data access and API maturity determine data readiness for AI use cases in lending and servicing | "Open banking data is the feasibility dimension most AI assessments in retail lending get wrong" |

### Section C: experience fact sheet template

Fill one per project. Only facts you can defend.

| Field | Entry |
|---|---|
| Client type and geography | [UK Tier-1 bank, corporate banking] |
| Sponsor level | [COO / Head of Onboarding] |
| Engagement type and length | [Design and scoping, N weeks] |
| Team size and my position | [N consultants, I owned workstream X] |
| The question we answered | [One sentence] |
| Baseline facts | [Cycle time, FTE, volumes, error rates, with source] |
| Key analyses I owned | [List] |
| Decisions I influenced | [List with the analysis that drove each] |
| Recommendation | [One sentence] |
| Stage reached | [Scoping / pilot approved / pilot live / scaled] |
| Measured results | [Only measured; label estimates] |
| What I would do differently | [One sentence] |
| Public cases I would pair it with | [e.g. HSBC AML AI for screening; Klarna for service automation lessons] |

### Section D: pairing your projects with public cases

Pairing an own-experience story with a public case signals that you read the market and can benchmark. Use the anchors from Module 17.

- KYB and screening: pair with HSBC's AML AI work with Google Cloud, where Google reported 2–4x more suspicious activity identified and ~60% fewer alerts [PUBLIC — Google Cloud, June 2023; VERIFY].
- Disputes and servicing automation: pair with Klarna's 2024 assistant claims and its 2025 partial reversal on service quality [PUBLIC — Klarna, Feb 2024; CEO interviews, May 2025; VERIFY]. The lesson you draw: automation scope must be set by error tolerance, not by cost ambition, which is exactly what your HITL gates did.
- Workforce and adoption: pair with Commonwealth Bank of Australia's 2025 reversal of call-centre redundancies when assumed volume reductions did not materialise [PUBLIC — Aug 2025; VERIFY]. The lesson: baseline the volume effect before taking out the cost.

## 5. Real-world case

[PUBLIC — Morgan Stanley, Sept 2023 and June 2024; VERIFY] Morgan Stanley's adviser-facing assistant built with OpenAI and its later "Debrief" meeting tool are the public case most analogous to a scoping-led approach. The firm started with a narrow, well-bounded use (retrieval over its own research library for advisers), measured adoption (reported at roughly 98% of adviser teams), and only then expanded to note-taking and drafting. Public commentary from the firm emphasised evaluation of answer quality by advisers before rollout. When you tell your KYB story, Morgan Stanley is the reference for "scope narrowly, evaluate, then expand", and it lets you make the point that the scoping decision is the strategy.

## 6. Consultant language

> "The scoping decision is where the value is decided; everything after it is execution risk."

Use when an interviewer suggests your assessment work was preparatory rather than strategic.

> "I built the prototype to retire the three design uncertainties that would otherwise have been argued on slides."

Use when challenged on the vibe-coded prototype.

> "Deterministic steps belong in rules; judgement steps belong with the agent; consequential decisions stay with a human. The six dimensions are how we drew those lines."

Use to summarise your agentic-fit philosophy in one breath.

> "My role was to own the question, not every answer."

Use to state ownership honestly when a larger team delivered the final product.

> "Payments gives me the data and the process; AI gives me the lever. Few people in this market have both."

Use in the fit conversation to position your differentiation.

## 7. Common mistakes juniors make

- **Activity lists instead of decisions.** "I ran interviews, built a map, created a heatmap" says nothing about judgement. Lead with the decision the work enabled.
- **Claiming the team's result as personal delivery.** It unravels in references. Say what you owned.
- **Apologising for the prototype.** It is a strength if framed as de-risking; it is a weakness only if framed as "I like coding".
- **Numbers without a label.** If a figure was a hypothesis, say "our hypothesis was". Partners discount unlabelled precision.
- **Letting the interviewer define you as ops.** Answer the altitude test by moving up the ladder in the same sentence.
- **No reflective point.** Every story needs one thing you would do differently; it is the fastest way to demonstrate seniority.
- **Over-long 2-minute versions.** Rehearse with a timer. Two minutes is roughly 280 words spoken.

## 8. Interview questions with model answers

**Q1. "Walk me through the KYB agentic-fit work. What did you actually do?"**

Structure the answer by the four rungs. "The question was which steps of corporate onboarding justified an agent rather than a rule or a human. I decomposed the process to about [25] steps with SMEs, scored each on six dimensions, task variability, judgement required, system access, error tolerance and reversibility, data availability, and volume, and calibrated the weights with the risk function. Roughly [a third] of steps scored as deterministic and went to rules or integrations; a cluster around document interpretation, entity and UBO resolution and screening adjudication scored as agent-fit; risk rating stayed human on error tolerance. That scoring set the scope of the supervisor-led multi-agent design the bank adopted and therefore the business case. I owned the decomposition, the scoring and the rationale paper; the architecture was co-designed with the engineering lead. What I would change: involve model risk in weight calibration a week earlier." Numbers are placeholders; use real ones.

**Q2. "You say you did process mapping on underwriting. Why should I see that as strategy work?"**

"Because the map changed the proposition. Before the diagnostic the hypothesis was that AI would draft credit memos. The interviews showed the dominant pain point was information assembly across disconnected systems, which is where analyst time went and where no regulatory approval for autonomous decisioning was needed. We re-scoped to orchestrated assembly and pre-population with the analyst owning judgement. That is a strategy decision, scope and value hypothesis, and the map was its evidence. Without the diagnostic we would have pitched the wrong thing to a credit risk officer who would have rejected it on model-risk grounds in the first meeting."

**Q3. "Tell me about the prototype. Isn't that an engineer's job?"**

"An engineer's job is to build something that ships. Mine was to answer design questions a client would otherwise have paid engineers to find out. Three questions: where does the agent boundary sit, what must stay deterministic, and where does a human have to approve. The prototype answered all three: reason codes and timeframes to a rules engine, clause-level chunking for auditable citations, narrow tool lists per specialist agent after the broad agent attempted out-of-scope actions, and human gates on financial and adverse outcomes. I would not put that code in production and I say so. Its value was that the scope and risk conversations happened with evidence."

**Q4. "What makes you different from the data scientists we already have?"**

"Two things. I know the processes and data of payments and financial crime operations at the level where AI scoping decisions are actually made: ISO 20022 fields, RTP decision windows, scheme dispute rules, KYB evidence chains. And I have made the scoping and risk decisions on agentic designs, not only modelled them. Your data scientists will build better models than I will. I will make sure they are building the right thing for a client who has to defend it to a regulator."

**Q5. "What has your AI work taught you that changed how you consult?"**

"That the business case is downstream of the agent boundary. In conventional automation the scope follows the process; in agentic AI the scope follows error tolerance and reversibility, because a model's mistakes are probabilistic. So I now start every AI engagement with the question 'where can the system be wrong and what does it cost', before I ask 'where can it save money'. Klarna's 2024 claims and 2025 reversal [PUBLIC — Feb 2024 and May 2025; VERIFY] are the public illustration of what happens when you do it the other way round."

## 9. Self-check quiz

Attempt before checking the answer key in the appendix.

1. State the four rungs of the altitude ladder and give the four-rung version of your Project B in four sentences.
2. An interviewer says: "Scoring steps on a framework is analyst work." Give a two-sentence response that reframes it without being defensive.
3. Which of your three projects best demonstrates the "deterministic steps belong in rules" principle, and what specific example would you cite?
4. Name two public cases you would pair with your disputes prototype and the one-line lesson you would draw from each.
5. Write the "strategy vs implementation" answer in your own words in under 80 words, including the phrase that states where you add most value.
