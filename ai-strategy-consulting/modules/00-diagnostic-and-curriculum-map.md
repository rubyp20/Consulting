# Module 0 — Diagnostic and Curriculum Map

## 1. Purpose of this module

Before you study, calibrate. The ten questions below span all five phases of the curriculum. Answer each in writing, in no more than six lines, before you look at the answer key in the appendix. Score yourself honestly using the rubric. The band you land in tells you where to start and how hard to push on each module.

The diagnostic is also a preview of how interviewers probe. Notice that half the questions are not "what is X" but "what would you tell the client" or "defend the number". That is the register you need to reach.

## 2. The 10-question diagnostic

Answer all ten. Time yourself; a manager-level candidate should finish in 25 to 30 minutes.

1. **Tool choice.** A UK bank wants to automate the decision on whether a disputed card transaction qualifies for a chargeback under scheme rules. The rules are codified, the inputs are structured, and the regulator expects a reproducible outcome. Which class of technology do you recommend (rules engine, classical ML, LLM, agentic AI) and why? Where, if anywhere, would an LLM add value in that process?

2. **LLM mechanics.** Explain what a context window is, why it matters for cost, and why "just put the whole KYC file in the prompt" is usually the wrong design. Mention at least two technical consequences.

3. **Agentic patterns.** Distinguish a supervisor (hierarchical) multi-agent pattern from an orchestrator-worker pattern. Give one BFSI situation where you would choose each.

4. **Evaluation.** A vendor claims their sanctions-alert narrative generator is "95% accurate". List the three questions you would ask before believing the claim, and name two metrics you would insist on seeing.

5. **Framework attribution.** Which firm is associated with the "10-20-70" rule for AI value, and what do the three numbers refer to? Which firm published "Rewired" and what are its six capabilities?

6. **Prioritisation.** You have scored 24 use cases on value and feasibility. Six land in the "high value, low feasibility" quadrant. What do you do with them, and what is the one common mistake juniors make with this quadrant?

7. **Cost arithmetic.** A KYB refresh process handles 60,000 cases a year. Each case will require an LLM pipeline consuming about 40,000 input tokens and 4,000 output tokens. Using an input price of USD 3 per million tokens and output price of USD 15 per million tokens [ESTIMATE — order of magnitude, VERIFY], what is the annual inference cost? Is inference likely to be the biggest line in the TCO? What is?

8. **Business case.** A CFO looks at your AI business case and says "your benefits assume 40% FTE reduction in year one; nobody achieves that." Give the two or three adjustments a credible consultant would make to the case and explain how you would present the risk-adjusted view.

9. **Regulation.** Name the four functions of the NIST AI Risk Management Framework. Then: under the EU AI Act, is a model used to assess the creditworthiness of a retail customer high-risk? What does that imply for a bank deploying it?

10. **Positioning.** In two or three sentences, describe your own role on an AI project you have worked on in the language of a strategy consultant rather than an implementer. Then say which of your sentences an interviewer would push on, and why.

## 3. Self-scoring rubric

Score each question 0, 1 or 2 against the model answers in the appendix (answers/00).

| Score | Meaning |
|---|---|
| 0 | Missed the point, or gave a definition where a judgement was required |
| 1 | Correct core, but missing the mechanism, the number, the attribution or the client implication |
| 2 | Would satisfy a manager-level interviewer: structured, correct, and ends with a "so what" |

| Total | Band | What to do |
|---|---|---|
| 0 to 7 | Foundations | Study every module in order. Do every quiz. Expect 60 to 70 hours |
| 8 to 14 | Practitioner | Skim Phase 1, work Phases 2 to 4 carefully, do all mock questions. Expect 40 to 50 hours |
| 15 to 20 | Mock-ready | Go straight to Modules 7, 8, 9, 18, 19 and 20; use the rest as reference. Expect 20 to 25 hours |

Be suspicious of a self-score above 15 before you have read Modules 7 to 9. Most experienced consultants know the vocabulary and under-estimate how badly they defend numbers.

## 4. Curriculum map

Study hours are estimates [ESTIMATE — assumption] for reading, doing the worked example yourself in a spreadsheet, attempting the quiz and the interview questions. Interview weight reflects how often the topic is probed in AI consultant and AI strategy interviews at MBB, Big Four and tech-led consultancies, based on the question patterns compiled in Module 20.

| Module | Phase | Title | Hours | Prerequisites | Interview weight |
|---|---|---|---|---|---|
| 0 | Start | Diagnostic and curriculum map | 1 | None | Low |
| 1 | 1 Foundations | AI landscape: rules, ML, deep learning, GenAI, agentic | 3 | 0 | High |
| 2 | 1 Foundations | How LLMs work at consultant depth | 4 | 1 | High |
| 3 | 1 Foundations | Agentic AI mechanics | 4 | 2 | High |
| 4 | 1 Foundations | Data and tech stack, LLMOps, evaluation | 3 | 2 | Medium |
| 5 | 2 Frameworks | AI strategy and maturity | 3 | 1 | High |
| Recap 1 | | One-page recap of Modules 1 to 5 | 1 | 1 to 5 | |
| 6 | 2 Frameworks | Use-case discovery | 3 | 5 | Medium |
| 7 | 2 Frameworks | Use-case assessment and prioritisation | 4 | 3, 6 | High |
| 8 | 2 Frameworks | Cost factors and TCO | 4 | 2, 7 | High |
| 9 | 2 Frameworks | Business case | 4 | 8 | High |
| 10 | 2 Frameworks | Build vs buy vs partner, vendor and model selection | 2 | 4, 8 | Medium |
| Recap 2 | | One-page recap of Modules 6 to 10 | 1 | 6 to 10 | |
| 11 | 3 Delivery | PoC to pilot to MVP to scale; pilot purgatory | 3 | 7, 9 | High |
| 12 | 3 Delivery | Responsible AI and regulation | 4 | 3, 4 | High |
| 13 | 3 Delivery | AI operating model and talent | 3 | 5 | Medium |
| 14 | 3 Delivery | Change management, adoption and KPIs | 2 | 11 | Medium |
| 15 | 3 Delivery | AI in managed services | 2 | 8, 13 | Medium |
| Recap 3 | | One-page recap of Modules 11 to 15 | 1 | 11 to 15 | |
| 16 | 4 Industry | BFSI use-case library | 4 | 1, 3, 7 | High |
| 17 | 4 Industry | Public case-study teardowns | 3 | 16 | Medium |
| 18 | 4 Industry | Three end-to-end engagement simulations | 8 | 5 to 16 | High |
| 19 | 5 Interview | Positioning your own experience | 3 | 18 | High |
| 20 | 5 Interview | Interview arsenal: 40 questions, 5 cases, 3 guesstimates, mock | 8 | All | High |
| Recap 4 | | One-page recap of Modules 16 to 20 | 1 | 16 to 20 | |
| | | **Total** | **~80** | | |

### What was added to the curriculum you proposed, and why

- **Evaluation moved earlier and expanded (Module 4).** Interviewers increasingly ask "how do you know it works" before "what does it cost". Golden datasets and LLM-as-judge are now table stakes.
- **Autonomy levels and failure-mode tables (Module 3).** Regulators and model-risk teams ask for them; most candidates cannot produce one.
- **A CFO-challenge section inside the business case (Module 9) and a dedicated simulation (Module 18c).** Your stated gap is defending numbers; this is where it is drilled.
- **Positioning module split from the arsenal (Module 19).** Your gap is role clarity. It deserves its own module and its own narrative template.
- **Managed services (Module 15) kept, but reframed around labour-model economics**, since this is where tech-led consultancies probe hardest.

## 5. How to use this document

The interactive commands you proposed (NEXT, DEEPER, QUIZ, EXAMPLE, MOCK) are replaced by a reading protocol, because this is a document rather than a conversation.

1. **Read the module** end to end. Do not skip Section 2 (mechanism) even where you know the topic; the terminology is what interviewers listen for.
2. **Rebuild the worked example** in a spreadsheet with your own assumptions. If you cannot reproduce the number, you cannot defend it.
3. **Attempt the quiz** in writing, then check the answer key in the appendix. Score against the "manager-level benchmark" line, not just correctness.
4. **Answer the three interview questions aloud**, timed at two minutes each, before reading the model answers.
5. **After every five modules, read the recap** and write your own one-paragraph summary from memory. Compare.
6. **Return to Module 0** after Module 15 and re-score the diagnostic. The delta is your progress measure.

A note on labels. Every example in this document is tagged [PUBLIC — source, year], [ILLUSTRATIVE — composite] or [ESTIMATE — assumption]. Anything tagged [VERIFY — date-sensitive] must be checked against current sources before you quote it to a client or interviewer. Regulation timelines, model prices and vendor capabilities change quarterly.
