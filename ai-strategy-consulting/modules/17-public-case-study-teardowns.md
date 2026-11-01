# Module 17 — Public case-study teardowns

## 1. Why a client cares

Every bank executive has read the same press releases you have. What they cannot get from a press release is the pattern behind the headline: which AI pattern was used, what was actually measured, what was later walked back, and what that means for their own programme. A consultant who can cite seven public cases with the measured outcome and the caveat in one breath earns the right to challenge the client's ambition. A consultant who repeats vendor claims loses that right in the first meeting.

## 2. Concept and mechanism

### 2.1 How to read a public AI case

Public AI announcements follow a predictable structure, and each element needs a different level of scepticism.

| Element of the announcement | What it usually is | How to treat it |
|---|---|---|
| Scale claim ("rolled out to 200,000 employees") | Licence or access count | Input, not outcome. Access is not adoption, adoption is not value |
| Productivity claim ("saves 2 hours a week") | Self-reported survey or vendor telemetry | Directionally useful; discount 30 to 50% for selection and novelty effects |
| FTE-equivalent claim ("work of 700 agents") | Volume handled divided by historical productivity | Only a saving if the FTE cost actually leaves the cost base |
| Financial claim ("USD 40m profit improvement") | Forecast, rarely audited | Check whether a later annual report confirms it |
| Detection uplift ("2 to 4x more suspicious activity") | Model-level metric from a pilot period | Ask what happened to downstream investigation capacity and regulator acceptance |
| Walk-back ("re-hiring humans") | Correction of over-automation | The most informative part of any case; this is where the operating lesson sits |

### 2.2 The four outcome archetypes

Across the public record, bank AI programmes land in one of four archetypes. Naming the archetype quickly is the mechanism that makes a teardown useful in a client conversation.

1. **Scaled enabler.** Broad employee-facing assistant, measured in adoption and time saved, value diffuse and hard to book. JPMorgan LLM Suite, Citi, BBVA, Goldman Sachs sit here.
2. **Vertical workflow win.** A single high-volume process with a hard baseline, measured in cost, cycle time or detection rate. HSBC AML AI, Mastercard Decision Intelligence Pro, Morgan Stanley adviser assistant.
3. **Customer-facing automation with correction.** Customer service automation that delivered the volume claim and then had to be rebalanced for quality, liability or labour relations. Klarna, Commonwealth Bank of Australia, Air Canada.
4. **Model failure in a core economic decision.** The model drove a pricing or credit decision and the error compounded into losses or regulatory scrutiny. Zillow Offers, Apple Card and Goldman Sachs.

### 2.3 The teardown template

Use the same template for every case, in this order: what they did; AI pattern (rules, ML, GenAI, agentic, and the integration pattern); measured outcomes as publicly reported; what went wrong or was walked back; lesson for a strategy consultant; one-line interview citation. The discipline of filling the "what went wrong" row for every case, including the successes, is what distinguishes a strategy view from a vendor view.

## 3. Frameworks

### 3.1 Claimed versus realised value ladder (practitioner framework; attribution: widely used in benefits realisation practice, no single originator)

| Rung | Evidence type | Typical haircut applied by a CFO |
|---|---|---|
| 1. Vendor or press-release claim | Announcement | 60 to 80% |
| 2. Pilot metric | Controlled sample, short period | 40 to 60% |
| 3. Production telemetry | Live system, 6+ months | 20 to 30% |
| 4. Booked in P&L or annual report | Audited financials | 0 to 10% |

Place every public case on this ladder before quoting it. Most 2023 to 2025 GenAI cases sit at rung 1 or 2. HSBC AML AI and Klarna moved to rung 3. Very few have reached rung 4 with an explicit line item.

### 3.2 The teardown lens: five failure drivers

When a case is walked back, the cause is almost always one of five drivers. This is a composite practitioner lens, not an attributed framework.

1. **Baseline error.** The automation was assumed to remove demand that it did not remove (Commonwealth Bank of Australia).
2. **Quality-cost trade-off mispriced.** Cost saving was booked without pricing the customer-experience cost (Klarna).
3. **Liability not designed in.** The system spoke with authority the organisation had not agreed to stand behind (Air Canada).
4. **Model used outside its competence envelope.** A predictive model drove irreversible economic commitments under regime change (Zillow).
5. **Explainability and fairness not evidenced.** The outcome may have been defensible, but the firm could not show it (Apple Card and Goldman Sachs).

### 3.3 How to use cases in a client room

- Lead with the case closest to the client's own archetype, not the most famous one.
- Quote the measured outcome, then the caveat, in the same sentence.
- Translate to the client's scale: "At your volumes, the HSBC-type alert reduction would release roughly X analysts."
- Always label what is public versus what you are estimating.

## 4. Worked BFSI example: cross-case synthesis

The table below is the synthesis a partner would carry into a steering committee. Public facts are labelled; the "realised vs claimed" column is the consultant's estimate.

| Case | Archetype | AI pattern | Headline claim [PUBLIC] | Realised vs claimed [ESTIMATE — assumption] | Dominant driver |
|---|---|---|---|---|---|
| Klarna (2024 to 25) | Customer-facing with correction | GenAI chat assistant, RAG over policies | Two-thirds of chats, ~700 FTE, USD 40m profit uplift | Volume claim held; cost claim partly offset by quality rework and re-hiring; estimate 50 to 70% of claimed net benefit | Quality-cost trade-off |
| HSBC AML AI (2023) | Vertical workflow win | Supervised ML risk scoring replacing rules thresholds | 2 to 4x more suspicious activity found, ~60% fewer alerts | High: model metric is directly operational; estimate 70 to 90% realised, subject to regulator acceptance in each jurisdiction | Hard baseline, regulator-aligned |
| Morgan Stanley (2023 to 24) | Vertical workflow win | GenAI assistant, RAG over research corpus, meeting summarisation | ~98% adviser-team adoption, Debrief tool | Adoption is real; financial value diffuse; estimate 40 to 60% of implied productivity converted to revenue or capacity | Curated corpus, narrow user group |
| JPMorgan LLM Suite (2024) | Scaled enabler | GenAI portal over multiple models, no customer exposure | ~200,000 employees with access | Low measurability by design; estimate 20 to 40% of licence base in weekly active use | Scale first, value tracking later |
| DBS (2024 to 25) | Scaled enabler plus vertical wins | ~800 ML models, ~350 use cases, GenAI assistants | SGD 1bn+ economic value projected 2025; ~4,000 contract roles reduced over three years | Medium to high; economic value is internally defined, not audited; estimate 60 to 80% | Decade-long data foundation |
| Bank of America Erica (2018 to 24) | Vertical workflow win | Rules plus NLU intent classification, later GenAI elements | 2bn+ interactions cumulative | High on deflection; value is cost-to-serve and engagement rather than booked savings; estimate 60 to 80% | Narrow scope, long iteration |
| Commonwealth Bank of Australia (2025) | Customer-facing with correction | Voice bot for call deflection | 45 roles made redundant, then reinstated | Negative in the period; baseline assumption failed | Baseline error |
| Air Canada (2024) | Customer-facing with correction | Chatbot giving policy answers | None claimed; tribunal liability | Negative; reputational and legal cost exceeded any deflection saving | Liability not designed in |
| Apple Card and Goldman Sachs (2019 to 21) | Model failure in core decision | ML credit-limit model | None claimed; regulator cleared on discrimination | Neutral financially; high reputational cost; weak explainability process | Explainability not evidenced |
| Zillow Offers (2021) | Model failure in core decision | Predictive pricing model driving purchases | None; USD 500m+ write-downs, ~25% workforce reduction | Severely negative | Competence envelope exceeded |

So what for the client: the cases with hard baselines and narrow scope (HSBC, Erica, Morgan Stanley) realised most of what they claimed; the cases that booked labour savings before validating demand or quality (Klarna, Commonwealth Bank) had to reverse; the cases where a model made irreversible economic commitments (Zillow) destroyed value. Design the portfolio accordingly.

## 5. Real-world case teardowns

Each teardown follows the template in 2.3. All figures are [PUBLIC] with the source and year given; those marked VERIFY are known to move or to be reported inconsistently across sources.

### 5.1 Klarna: customer-service assistant and the walk-back

- **What they did.** In February 2024 Klarna announced an OpenAI-powered customer service assistant live in 23 markets. In its first month it handled two-thirds of customer service chats, equivalent to the work of about 700 full-time agents, with resolution time down from 11 minutes to under 2 minutes and repeat enquiries down 25%, with an estimated USD 40m profit improvement for 2024. [PUBLIC — Klarna press release, Feb 2024] [VERIFY — date-sensitive]
- **AI pattern.** GenAI conversational assistant with retrieval over policy and account context, escalation to humans, multilingual. Customer-facing, Level 2 to 3 autonomy (acts within policy, escalates exceptions).
- **Measured outcomes.** Volume share, handling time, repeat-contact rate and an FTE-equivalent claim. The USD 40m figure was a forecast at announcement. Klarna also stated a headcount reduction trajectory through attrition and a hiring freeze in 2024. [PUBLIC — Klarna statements, 2024] [VERIFY]
- **What was walked back.** In 2025 CEO Sebastian Siemiatkowski said publicly that Klarna had over-indexed on cost, that quality had suffered, and that the company would again hire human agents so that customers could always reach a person, piloting a flexible, remote agent workforce. [PUBLIC — CEO interviews reported by Bloomberg and others, May 2025] [VERIFY]
- **Lesson for a strategy consultant.** The volume claim was true and the operating lesson is about the quality-cost frontier. The business case booked the cost side of the trade-off and did not price the customer-experience side. A strategy consultant should have insisted on a quality floor (CSAT, first-contact resolution, complaint rate) as a hard constraint in the case, and on a target human-agent ratio rather than a target of zero.
- **Interview citation.** "Klarna proved the volume claim in 2024 and corrected the quality trade-off in 2025; it is the best public evidence that you design the human-agent ratio, you do not let the cost case set it."

### 5.2 HSBC and Google Cloud AML AI: a vertical workflow win

- **What they did.** HSBC replaced rules-based transaction-monitoring thresholds with a machine-learning risk-scoring approach, developed with Google Cloud and productised as "AML AI" (HSBC's internal name was Dynamic Risk Assessment). Google Cloud reported that the system identified 2 to 4 times more suspicious activity while reducing alert volumes by around 60%. [PUBLIC — Google Cloud announcement, Jun 2023] [VERIFY]
- **AI pattern.** Supervised ML on customer-level behavioural features, scoring risk across the customer rather than per transaction rule. Not GenAI. Decision-support, with human investigators retaining the suspicious activity reporting decision.
- **Measured outcomes.** Detection uplift and alert reduction, both model-level metrics tied directly to analyst capacity and regulatory effectiveness. HSBC has stated it uses the approach across multiple markets. Exact investigator-capacity savings have not been disclosed. [PUBLIC — HSBC and Google Cloud statements, 2023 to 24] [VERIFY]
- **What went wrong or is still open.** Nothing public was walked back. The open issues typical of this archetype are regulator acceptance jurisdiction by jurisdiction, model-risk validation of a system that replaces auditable thresholds with scores, and the investigator-capacity question: fewer but richer alerts shift effort rather than remove it in the first year.
- **Lesson for a strategy consultant.** The win came from a hard baseline (alerts per month, suspicious-activity yield), a narrow scope, and years of data foundation. It is also a reminder that "AI in AML" in a Tier-1 bank is still predominantly supervised ML; GenAI sits on top for narrative drafting, not for the scoring decision.
- **Interview citation.** "HSBC's AML AI is the cleanest public example of ML beating rules on a regulator-visible metric: more suspicious activity found with 60% fewer alerts, and it is ML, not GenAI."

### 5.3 Morgan Stanley: adviser assistant and Debrief

- **What they did.** Morgan Stanley Wealth Management launched the AI @ Morgan Stanley Assistant in September 2023, built with OpenAI's GPT-4, giving around 16,000 financial advisers and support staff retrieval over roughly 100,000 internal research and procedure documents. In June 2024 it added Debrief, which summarises client meetings with consent, drafts follow-up emails and notes to the CRM. The firm reported adoption around 98% of adviser teams. [PUBLIC — Morgan Stanley and OpenAI statements, 2023 to 24] [VERIFY]
- **AI pattern.** GenAI with RAG over a curated, access-controlled corpus; meeting transcription and summarisation; human adviser remains the decision-maker and the client interface.
- **Measured outcomes.** Adoption and usage, qualitative time saved, Debrief usage counts. No disclosed revenue or cost figure attributable to the tool. [VERIFY]
- **What went wrong or is open.** No public walk-back. Open questions are the standard ones for scaled enablers: how much saved time converts to revenue-generating activity, and the governance of client-meeting recordings. The firm invested heavily in evaluation, reportedly building an expert-graded test set that gated release, which is a significant part of why it is cited as a quality benchmark.
- **Lesson for a strategy consultant.** The corpus was curated and the user group was narrow and high-value, so each unit of adviser time saved has a clear revenue path. Evaluation discipline before release is a design choice, not an afterthought.
- **Interview citation.** "Morgan Stanley is the reference for curated-corpus RAG with expert-graded evals: 98% adoption because the corpus and the user were narrow, and because evals gated the release."

### 5.4 JPMorgan Chase: from COiN to LLM Suite

- **What they did.** JPMorgan's COiN (Contract Intelligence) applied ML to commercial loan agreement review from around 2017, with the bank stating it removed a large volume of manual review hours. In 2024 the bank rolled out LLM Suite, an internal GenAI portal giving access to multiple large language models for writing, summarisation and ideation, to around 200,000 employees. Its annual technology spend is around USD 17bn. [PUBLIC — JPMorgan statements and shareholder letters, 2017 to 2024] [VERIFY]
- **AI pattern.** COiN: supervised ML and NLP on structured document types. LLM Suite: GenAI enabler with model-agnostic access layer, no direct customer exposure, with a stated intent to track value by use case.
- **Measured outcomes.** Access counts and management commentary on productivity; the CEO's letters position AI as transformational across the firm. Specific booked financial outcomes have not been disclosed at the tool level. [VERIFY]
- **What went wrong or is open.** No public walk-back. The structural risk of the scaled-enabler archetype is diffuse value: broad access generates usage statistics, not P&L. JPMorgan has mitigated this by pairing the portal with targeted vertical use cases and a central AI organisation.
- **Lesson for a strategy consultant.** Scaled enablers are a platform decision, not a business case. Make the case on option value and talent, and attach value tracking to the vertical use cases that ride on the platform.
- **Interview citation.** "JPMorgan's LLM Suite shows the scaled-enabler play: 200,000 seats is an input metric, and the value sits in the vertical use cases the platform enables."

### 5.5 DBS Bank: a decade of data foundation and the workforce signal

- **What they did.** DBS has reported deploying around 800 AI and ML models across roughly 350 use cases, with an internally projected economic value above SGD 1bn in 2025, and a long-running programme of hyper-personalised nudges and operational models. In February 2025 the CEO said the bank expected to reduce around 4,000 temporary and contract roles over three years as AI absorbed work, while permanent staff would not be affected. [PUBLIC — DBS annual reporting and CEO statements, 2024 to 25] [VERIFY]
- **AI pattern.** Predominantly predictive ML at scale on a modern data platform, with GenAI assistants added for employees and customer service; a central AI and data function with embedded business ownership.
- **Measured outcomes.** Internal economic value, number of models and use cases, and a workforce trajectory. The economic value definition is internal and not audited. [VERIFY]
- **What went wrong or is open.** No public walk-back. The workforce statement attracted scrutiny on how value is shared with contract staff; the bank framed it as attrition of temporary roles rather than redundancies.
- **Lesson for a strategy consultant.** The SGD 1bn claim rests on a decade of data platform investment; it is not replicable in a two-year programme without that foundation. It is also the clearest public statement of the labour-model shift, which makes it useful when a client asks about workforce implications.
- **Interview citation.** "DBS is the proof that AI value at the billion level follows a decade of data foundation, and the first major bank to quantify the contract-labour impact publicly."

### 5.6 Bank of America Erica: narrow scope, long iteration

- **What they did.** Bank of America launched the Erica virtual assistant in its mobile app in 2018. By 2024 the bank reported more than 2 billion cumulative client interactions and tens of millions of users, with Erica handling balance queries, transaction search, bill reminders and routing to humans. The bank has stated it will spend around USD 4bn on new technology initiatives in 2025, with AI a significant component. [PUBLIC — Bank of America statements, 2018 to 2025] [VERIFY]
- **AI pattern.** Intent classification and natural-language understanding over a bounded set of banking tasks, rules-driven fulfilment, escalation to humans; GenAI elements introduced later for employees and selected functions.
- **Measured outcomes.** Interactions, users, containment and engagement metrics, and management commentary on efficiency. No disclosed line-item saving. [VERIFY]
- **What went wrong or is open.** No public walk-back. The design choice to keep Erica bounded and largely deterministic is why it has avoided the liability problems seen in generative customer-facing bots.
- **Lesson for a strategy consultant.** Customer-facing automation in banking has worked best when the scope is bounded and the fulfilment is deterministic. Erica is the counter-example to "put a GenAI chatbot in front of customers" and a strong reference for the rules-plus-NLU pattern.
- **Interview citation.** "Erica is seven years of bounded, deterministic customer automation at 2 billion interactions; it shows scope discipline beats model sophistication for customer-facing use."

### 5.7 Commonwealth Bank of Australia: the baseline that was not there

- **What they did.** In 2025 Commonwealth Bank announced the redundancy of 45 customer-service roles, citing an AI voice bot that was expected to reduce call volumes. The Finance Sector Union challenged the decision at the Fair Work Commission. In August 2025 the bank reversed the redundancies and apologised, acknowledging that call volumes had not fallen as assumed and that the roles were still required. [PUBLIC — reported by Australian media and the Finance Sector Union, Aug 2025] [VERIFY]
- **AI pattern.** Voice assistant for call deflection; customer-facing automation.
- **Measured outcomes.** The intended outcome (call reduction) did not materialise in the measurement window; the realised outcome was reinstatement and reputational cost.
- **What went wrong.** The labour saving was booked against a forecast deflection, not an observed one. The sequencing error was to remove capacity before the demand reduction was proven in production.
- **Lesson for a strategy consultant.** Sequence benefits after evidence: prove deflection in production telemetry for at least one full seasonal cycle before releasing capacity, and design the business case with capacity redeployment first and headcount release second. It is also a labour-relations lesson: in unionised markets, the sequencing is a legal and reputational matter, not only a financial one.
- **Interview citation.** "CBA's 2025 reversal is the textbook baseline error: capacity was removed on a forecast deflection, and the call volumes did not fall."

### 5.8 Air Canada: liability by chatbot

- **What they did.** Air Canada's website chatbot told a customer that bereavement fares could be claimed retroactively, contradicting the airline's actual policy. When the airline refused the refund, the customer took the case to the British Columbia Civil Resolution Tribunal, which in February 2024 held Air Canada responsible for the chatbot's statement and rejected the argument that the chatbot was a separate entity. [PUBLIC — Moffatt v. Air Canada, BC Civil Resolution Tribunal, Feb 2024]
- **AI pattern.** Customer-facing conversational assistant giving policy information without grounding to the authoritative source or a disclaimer that was accepted by the tribunal.
- **Measured outcomes.** Small financial award; large precedent: an organisation is liable for what its chatbot says.
- **What went wrong.** The system spoke with authority on policy without citation grounding or a human check, and the organisation had no agreed position on standing behind its output.
- **Lesson for a strategy consultant.** For any customer-facing GenAI in a bank, grounding to the policy source, citation, and a liability position agreed with Legal and Compliance are design requirements, not nice-to-haves. This case is why "the model said so" is not a defence under consumer protection law.
- **Interview citation.** "Air Canada 2024 established that the firm owns what its chatbot says; in banking that means grounding, citation and a Legal-approved liability position before go-live."

### 5.9 Apple Card and Goldman Sachs: explainability not evidenced

- **What they did.** In November 2019 public complaints alleged that the Apple Card, issued by Goldman Sachs, gave women materially lower credit limits than their spouses with similar or better financial profiles. The New York Department of Financial Services investigated and in March 2021 found no evidence of unlawful discrimination under fair lending law, while criticising the customer service response and the lack of transparency in explaining decisions. [PUBLIC — NYDFS report, Mar 2021]
- **AI pattern.** ML credit-limit model within an underwriting process; the model did not use gender as an input.
- **Measured outcomes.** No regulatory finding of discrimination; significant reputational cost and a regulatory critique of explainability and appeal processes.
- **What went wrong.** The firm could not explain individual outcomes to customers or the press at the moment it mattered. The legal position was defensible; the process for evidencing it was not ready.
- **Lesson for a strategy consultant.** Fairness testing and explainability are operational capabilities that must exist before the first complaint. The appeal process and the customer-facing explanation are part of the model deployment, not of customer service.
- **Interview citation.** "Apple Card shows that being compliant and being able to show you are compliant are different capabilities; NYDFS cleared the model and still criticised the explanation process."

### 5.10 Zillow Offers: the competence envelope

- **What they did.** Zillow used its Zestimate-based pricing models to buy homes directly through Zillow Offers. In late 2021, after the models over-priced purchases in a shifting market, the company wound down the business, took write-downs in excess of USD 500m and cut around 25% of its workforce. [PUBLIC — Zillow Q3 2021 results and statements, Nov 2021] [VERIFY exact write-down figure]
- **AI pattern.** Predictive ML model driving irreversible capital commitments at scale with limited human override.
- **Measured outcomes.** Direct losses, business exit, workforce reduction.
- **What went wrong.** The model was used outside the regime it was trained on; the business committed capital on each prediction without a sufficient margin of safety or a kill-switch keyed to drift.
- **Lesson for a strategy consultant.** Not banking, but the closest public analogue to letting a model drive balance-sheet decisions. In BFSI terms: any model that commits capital or credit needs drift monitoring, exposure limits and human override designed as controls, and the reversibility of the action should set the autonomy level.
- **Interview citation.** "Zillow is the reference for competence-envelope failure: a pricing model drove irreversible purchases through a regime change, and USD 500m of write-downs followed."

### 5.11 Goldman Sachs and Citi: scaled enablers in 2025 (brief)

- Goldman Sachs rolled out its GS AI Assistant firm-wide in 2025 and announced a pilot of Cognition's Devin coding agent in July 2025, positioning it as a "hybrid workforce". [PUBLIC — Goldman Sachs statements, 2025] [VERIFY]
- Citi deployed Citi Assist and Citi Stylus GenAI tools to around 140,000 employees across 2024 to 2025. [PUBLIC — Citi statements, 2024 to 25] [VERIFY]
- Both are scaled enablers; the interesting signal is the explicit move from assistants to agents in engineering, where output is testable and reversibility is high. That is where agentic AI is reaching production first in large banks.

## 6. Consultant language

> "Let me separate what was claimed, what was measured, and what has since been corrected."

Use when a client cites a press release as a target for their own programme.

> "That figure is an input metric; the outcome metric we would track is the one that reaches your P&L."

Use when a client quotes seat counts, interaction counts or model counts as evidence of value.

> "The cases that held up had a hard baseline and a narrow scope; the ones that reversed booked the saving before the demand had moved."

Use to frame sequencing and benefit-realisation discipline.

> "At your volumes, an HSBC-type alert reduction translates to roughly this much analyst capacity; let me show you the arithmetic and the assumptions."

Use to move from anecdote to the client's numbers.

> "The Klarna correction is the design lesson: we set the human-agent ratio as a quality constraint, not as a residual of the cost case."

Use when the client's ambition is "fully automate".

## 7. Common mistakes juniors make

- **Quoting the headline as the outcome.** "Klarna saved 700 FTE" is not what Klarna said and not what happened; the chats were handled, the cost base moved less, and quality was later re-funded.
- **Treating all AI as GenAI.** HSBC AML AI and Erica are predominantly supervised ML and rules plus NLU; calling them GenAI in an interview signals shallow understanding.
- **Ignoring the walk-backs.** Juniors present the successes; managers present the corrections, because that is where the design lessons are.
- **Not translating to the client's scale.** A case is only useful when you can say what it would mean in the client's volumes and cost base.
- **Mislabelling estimates as facts.** Any "realised vs claimed" judgement is the consultant's estimate and must be labelled as such.
- **Using non-banking cases without a bridge.** Zillow and Air Canada are valuable, but only when you state the banking analogue explicitly.

## 8. Interview questions with model answers

### Q1. "Give me a public example where an AI deployment in financial services was walked back, and what you take from it."

Model answer. I would use Klarna because it is the most complete public arc. In February 2024 Klarna announced that its OpenAI-based assistant handled two-thirds of customer service chats in its first month, equivalent to about 700 agents, with a forecast USD 40m profit improvement [PUBLIC — Klarna, 2024]. In 2025 the CEO said publicly that the company had over-weighted cost, that service quality had suffered, and that it would hire human agents again [PUBLIC — 2025, VERIFY]. My read is that the volume claim was true and the business case was incomplete: it booked the cost side of the quality-cost trade-off and did not price the customer-experience side. The design lesson I apply is to set a quality floor, typically CSAT, first-contact resolution and complaint rate, as a hard constraint in the case, and to define the human-agent ratio as a design parameter rather than letting the cost target drive it to zero. A second, more operational example is Commonwealth Bank of Australia in August 2025, which reinstated 45 roles because the voice bot had not reduced call volumes as forecast [PUBLIC, VERIFY]; the lesson there is sequencing: remove capacity only after deflection is observed in production.

### Q2. "Which public bank AI case do you consider the strongest evidence of measurable value, and why?"

Model answer. HSBC's AML transaction monitoring with Google Cloud, reported in June 2023, where the ML risk-scoring approach identified 2 to 4 times more suspicious activity while cutting alert volumes by about 60% [PUBLIC — Google Cloud, 2023, VERIFY]. I rate it highest for three reasons. First, the metric is operational and regulator-visible: alerts per period and suspicious-activity yield are the AML function's own KPIs, so there is no translation gap to value. Second, the scope is narrow and the baseline is hard, which is the pattern that holds up across the public record. Third, it is supervised ML replacing rules, which means the model-risk pathway is well understood by validators and regulators. The caveats I would add are that the realised analyst-capacity saving has not been disclosed, that fewer alerts are richer alerts so first-year effort shifts rather than disappears, and that acceptance has to be secured regulator by regulator. For a client in payments or AML, I would translate it as: at your alert volumes a 60% reduction releases roughly this many investigator hours, and here is how we would evidence it to your regulator.

### Q3. "A client wants to put a GenAI chatbot in front of retail customers next quarter. What public evidence would you put on the table?"

Model answer. Three cases, in this order. Bank of America's Erica, which has handled more than 2 billion interactions since 2018 by staying bounded and largely deterministic in fulfilment [PUBLIC, VERIFY]; that is the pattern that has worked in banking. Air Canada, where a tribunal in February 2024 held the airline liable for its chatbot's incorrect policy statement [PUBLIC]; in banking that means grounding to the policy source, citation and a Legal-approved liability position are launch gates. And Klarna, which proved the volume case and then re-hired humans for quality [PUBLIC, VERIFY]. My recommendation would be a bounded-intent design: deterministic fulfilment for account and payment actions, GenAI for understanding and for drafting grounded responses, a human-escalation ratio set as a design target, and a quality floor in the business case. I would also show the client the autonomy level we are proposing and the controls that go with it, so that Compliance can sign it off before the quarter ends rather than after.

## 9. Self-check quiz

1. Place Klarna's 2024 claims and HSBC's 2023 AML results on the claimed-versus-realised value ladder, and justify the rung for each.
2. Which of the ten cases is an example of the "baseline error" failure driver, and what sequencing rule would have prevented it?
3. A client says "Erica proves GenAI chatbots work for banks." Correct the statement in two sentences.
4. JPMorgan's LLM Suite reached around 200,000 employees. Explain why that figure is an input metric and name two outcome metrics you would track instead.
5. Translate HSBC's reported 60% alert reduction into analyst capacity for a bank that generates 240,000 AML alerts a year, with 45 minutes average handling time and 1,600 productive hours per analyst. Show the arithmetic and state one reason the first-year saving will be lower.
