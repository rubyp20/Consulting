# Module 12 — Responsible AI, Regulation and Model Risk for AI in Banking

## 1. Why a client cares

A bank cannot deploy an AI system its regulator will not accept, its board cannot explain, or its customers can challenge successfully. In the EU, credit scoring of individuals is a high-risk AI use with hard obligations from 2026; in the UK, the PRA has brought qualitative and judgement-based models explicitly into model risk management; in India, the RBI has published a framework that will shape supervisory expectations. Responsible AI is therefore not a values exercise. It is the set of controls that determines whether an AI programme can go live, how long validation takes, and what the bank is liable for when the system is wrong.

Every regulatory statement in this module is date-sensitive. Treat each one as [VERIFY — date-sensitive] and confirm status before using it with a client.

## 2. Concept and mechanism

### 2.1 The regulatory landscape in one view

| Instrument | Nature | Who it binds | Status | Why it matters for AI in banking |
|---|---|---|---|---|
| EU AI Act, Regulation (EU) 2024/1689 | Binding law, risk-based | Providers and deployers of AI systems placed on or used in the EU market, wherever established | In force 1 Aug 2024; phased application 2025–2027 [VERIFY] | Credit scoring of natural persons and life/health insurance pricing are high-risk |
| NIST AI Risk Management Framework 1.0 | Voluntary framework | Any organisation | Published Jan 2023; GenAI Profile Jul 2024 | De facto reference vocabulary for AI risk programmes, including in non-US banks |
| ISO/IEC 42001:2023 | Certifiable management-system standard | Any organisation | Published Dec 2023 | The auditable "AI management system"; increasingly requested in vendor due diligence |
| US SR 11-7 / OCC 2011-12 | Supervisory guidance on model risk | US banks | 2011 | The parent of modern model risk management; defines model, validation, effective challenge |
| UK PRA SS1/23 | Supervisory statement, principles | UK banks, initially those with internal model permissions | Published May 2023; effective 17 May 2024 [VERIFY scope] | Explicitly brings qualitative and expert-judgement models into scope; SMF accountability |
| RBI FREE-AI | Committee framework and recommendations | Indian regulated entities (direction via RBI follow-up) | Report Aug 2025 [VERIFY implementation status] | Seven sutras and 26 recommendations shaping Indian supervisory expectations |
| MAS FEAT principles and Veritas | Principles and toolkit | Singapore financial institutions | FEAT 2018; Veritas toolkits 2021–2023; MAS AI model risk paper Dec 2024 [VERIFY] | Fairness, ethics, accountability, transparency assessments for AI in FS |
| UK FCA position | Principles-based, no AI-specific rulebook | UK regulated firms | AI Update Apr 2024; AI Lab 2024–25 [VERIFY] | AI governed through Consumer Duty, SM&CR, SYSC and existing conduct rules |

### 2.2 EU AI Act

**Risk tiers.** The Act classifies AI systems into: prohibited practices (Article 5, for example social scoring and certain manipulative or exploitative systems); high-risk systems (Article 6 with Annex I for AI embedded in regulated products and Annex III for standalone uses); systems with transparency obligations (Article 50, for example chatbots must disclose that the user is interacting with AI, and synthetic content must be marked); and minimal-risk systems with no specific obligations. General-purpose AI (GPAI) models are regulated separately (Chapter V), with heavier duties for models deemed to have systemic risk.

**Annex III relevance to banking.** Point 5(b) covers AI systems intended to evaluate the creditworthiness of natural persons or establish their credit score, except systems used to detect financial fraud. Point 5(c) covers risk assessment and pricing for life and health insurance for natural persons. Point 4 covers employment decisions, which touches HR analytics in any bank. Note what is not automatically high-risk: corporate lending to legal entities, AML transaction monitoring and sanctions screening, dispute resolution and most operational automation. These remain governed by model risk and conduct rules but not by the Annex III regime, unless they profile natural persons in a way that falls under another Annex III point.

**Timeline.** In force 1 August 2024. Prohibitions and AI literacy obligations (Article 4) from 2 February 2025. GPAI obligations, governance and penalties from 2 August 2025. Most high-risk (Annex III) and Article 50 transparency obligations from 2 August 2026. Annex I product-embedded high-risk from 2 August 2027. In November 2025 the European Commission proposed a "digital omnibus" that would, among other things, delay some high-risk obligations, with a proposed linkage to the availability of harmonised standards and a backstop in 2027; this is a proposal, not law [VERIFY — the status of the omnibus and the operative dates].

**Provider vs deployer.** A provider develops an AI system and places it on the market or puts it into service under its own name. A deployer uses an AI system under its authority. A bank buying a credit-scoring system is a deployer; a bank building its own is a provider and a deployer; a bank that substantially modifies a bought system, or puts its name on it, can become a provider (Article 25). Provider obligations for high-risk systems include a risk management system (Article 9), data governance (Article 10), technical documentation (Article 11), record-keeping (Article 12), transparency and instructions for use (Article 13), human oversight by design (Article 14), accuracy, robustness and cybersecurity (Article 15), a quality management system (Article 17), conformity assessment, registration in the EU database, and post-market monitoring. Deployer obligations (Article 26) include using the system in accordance with instructions, assigning human oversight to competent, trained persons, ensuring input data is relevant, monitoring and reporting serious incidents, keeping logs for at least six months, and informing affected persons. Deployers of Annex III 5(b) and 5(c) systems, which includes banks using credit scoring of natural persons, must also complete a fundamental rights impact assessment (Article 27) before first use [VERIFY exact scope].

**Financial-sector alignment.** The Act contains provisions intended to avoid duplication with financial services law: for regulated financial institutions, some quality-management and documentation obligations can be met through internal governance under existing prudential rules, and the financial supervisor is designated as the market surveillance authority for AI in financial services [VERIFY — Articles 17 and 74 and national implementation].

**Penalties.** Up to EUR 35m or 7% of global annual turnover for prohibited practices; up to EUR 15m or 3% for most other obligations; up to EUR 7.5m or 1% for supplying incorrect information, with lower caps for SMEs [VERIFY].

### 2.3 NIST AI Risk Management Framework

NIST AI RMF 1.0 (January 2023) organises AI risk management into four functions. **Govern** is cross-cutting: policies, accountability, culture, workforce, third-party risk. **Map** establishes context: intended purpose, users, affected groups, benefits and risks, including for components the organisation did not build. **Measure** uses quantitative and qualitative methods to analyse and track risks: performance, fairness, robustness, privacy, explainability, with test and evaluation. **Manage** allocates resources to prioritised risks, decides on treatment, and plans response and recovery. The RMF defines trustworthy AI characteristics: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and interpretable; privacy-enhanced; fair with harmful bias managed. The Generative AI Profile (NIST AI 600-1, July 2024) adds twelve GenAI-specific risk categories, including confabulation, information integrity, information security, intellectual property, harmful bias and homogenisation, data privacy, and value chain and component integration, with suggested actions mapped to the four functions. Banks outside the US use the RMF as a vocabulary that regulators recognise and as a crosswalk to ISO/IEC 42001 and the EU AI Act.

### 2.4 ISO/IEC 42001:2023

ISO/IEC 42001 specifies requirements for an AI management system (AIMS) following the harmonised ISO management-system structure (context, leadership, planning, support, operation, performance evaluation, improvement), with an Annex A of controls organised under control objectives covering policies, internal organisation, resources, impact assessment, system lifecycle, data, information for interested parties, use of AI systems, and third-party relationships, and guidance in Annexes B–D [VERIFY control counts]. Like ISO 27001 it is certifiable, which is why it appears in vendor RFPs. Related standards: ISO/IEC 23894 (AI risk management guidance, 2023), ISO/IEC 22989 (concepts and terminology), ISO/IEC 42005 (AI system impact assessment, 2025) [VERIFY]. Certification demonstrates a management system exists; it does not certify that any individual model is accurate or fair.

### 2.5 US SR 11-7, the parent of model risk management

SR 11-7 (Federal Reserve) and OCC 2011-12 (April 2011) define a model as a quantitative method, system or approach that applies statistical, economic, financial or mathematical theories, techniques and assumptions to process input data into quantitative estimates. Model risk arises from fundamental errors and from incorrect or inappropriate use. The guidance requires three things: sound model development, implementation and use; a validation function with conceptual soundness review, ongoing monitoring and outcomes analysis; and governance, policies and controls including a model inventory and "effective challenge" by independent, competent and influential reviewers. Almost every bank's model risk framework worldwide descends from this structure. Its limit for GenAI is the definition: a foundation model producing text is not obviously "a quantitative estimate", which is one reason the UK PRA broadened the definition.

### 2.6 UK PRA SS1/23

SS1/23 "Model risk management principles for banks" was published in May 2023 and took effect on 17 May 2024, initially for firms with internal model permissions, with the PRA signalling broader relevance [VERIFY scope and any later extension]. Five principles:

1. **Model identification and model risk classification.** A model inventory and a tiering approach based on materiality and complexity.
2. **Governance.** Board oversight, a named Senior Management Function (SMF) accountable for the MRM framework, policies and reporting.
3. **Model development, implementation and use.** Standards for design, data, testing, documentation and use, including adjustments and overlays.
4. **Independent model validation.** Independent review, ongoing monitoring, periodic revalidation, and challenge.
5. **Model risk mitigants.** Post-model adjustments, restrictions on use, exception processes, and compensating controls where model risk is high.

The definition of a model in SS1/23 explicitly includes inputs that are quantitative, qualitative or expert-judgement based, and outputs that are quantitative or qualitative. That wording brings LLM-based systems inside the model definition and is the clearest regulatory statement that GenAI systems are models for MRM purposes [VERIFY wording]. SS1/23 also asks firms to self-assess against the principles and remediate gaps, and the PRA has stated in its AI-related communications that it regards SS1/23 as the primary vehicle for AI model risk [VERIFY].

**What "model" means for an LLM-based system.** The unit of validation is the system in use, not the foundation model alone. That system comprises the foundation model (often third-party and opaque), the prompts and system instructions, the retrieval corpus and retrieval logic, the tools and their permissions, the guardrails, the orchestration logic, and the human oversight design. A change to any component is a model change. Because the foundation model cannot be validated in the conventional sense (no access to weights or training data), validation shifts to the observable behaviour of the whole system: outcome testing on golden datasets, robustness testing, monitoring, and compensating controls. Third-party model risk expectations also apply.

### 2.7 RBI FREE-AI

The Reserve Bank of India constituted a committee in December 2024, chaired by Professor Pushpak Bhattacharyya of IIT Bombay, to develop a Framework for Responsible and Ethical Enablement of AI. The report, published in August 2025, set out seven guiding "sutras": trust is the foundation; people first; innovation over restraint; fairness and equity; accountability; understandable by design; and safety, resilience and sustainability. It made 26 recommendations across six pillars, grouped into innovation enablement (infrastructure, policy, capacity) and risk mitigation (governance, protection, assurance), including board-approved AI policies at regulated entities, AI incident reporting, a graded liability approach to encourage responsible innovation, shared digital infrastructure for AI, and sector-specific models [VERIFY — exact wording and which recommendations have become RBI directions]. The framework sits alongside existing RBI expectations on outsourcing, IT governance, digital lending and the fair practices code, and alongside India's Digital Personal Data Protection Act 2023 [VERIFY commencement].

### 2.8 MAS, HKMA and the UK FCA

The Monetary Authority of Singapore's FEAT principles (2018) set out Fairness, Ethics, Accountability and Transparency expectations for AI and data analytics in financial services; the Veritas consortium produced assessment methodologies and open-source toolkits (2021–2023); MAS published an information paper on AI model risk management in December 2024 following a thematic review, setting out good practices in governance, inventory, validation and monitoring, including for GenAI [VERIFY]. The HKMA launched a GenAI sandbox in 2024 [VERIFY]. The UK FCA has not issued an AI rulebook; its April 2024 AI Update explained how existing frameworks (Consumer Duty, the Senior Managers and Certification Regime, SYSC systems and controls, the Equality Act and data protection law) apply, and it has run an AI Lab and live-testing initiatives since late 2024 [VERIFY]. The joint Bank of England and FCA survey published in November 2024 reported around 75% of firms already using AI [PUBLIC — BoE/FCA, Nov 2024; VERIFY].

### 2.9 Explainability

**For conventional ML.** Global explanations describe the model overall: feature importance, partial dependence plots. Local explanations describe a single decision: LIME (Ribeiro, Singh and Guestrin, 2016) fits a simple surrogate around one prediction; SHAP (Lundberg and Lee, 2017) attributes the prediction to features using Shapley values from cooperative game theory, with consistency guarantees; counterfactual explanations (Wachter, Mittelstadt and Russell, 2017) state the smallest input change that would flip the decision, which maps naturally to adverse-action reasons in credit. Limits: SHAP values on correlated features can mislead; surrogates are approximations; and feature attributions are not causal.

**For LLM-based systems.** Three mechanisms are used, with different evidential weight. Citation grounding, where the system must cite the retrieved passages or record fields it relied on, is checkable: a reviewer can verify the citation supports the claim. Rationale generation, where the model writes out its reasoning, is useful for review but is not a faithful account of the computation; research has shown model-stated reasoning can diverge from the factors that actually drove the output (Turpin et al., 2023, "Language models don't always say what they think") [PUBLIC — 2023]. Mechanistic interpretability of model internals is an active research field and not yet an operational control. Consequently, for high-stakes decisions the defensible architecture is to keep the decision in an explainable model or rule set and use the LLM for information assembly, drafting and triage, with the explanation coming from the decision component.

### 2.10 Bias and fairness testing

Define protected attributes and proxies (postcode, name, device) in scope. Common metrics: disparate impact ratio (selection rate for the protected group divided by that for the reference group), with the four-fifths rule from the US EEOC Uniform Guidelines (1978) treating a ratio below 0.8 as evidence of adverse impact; demographic parity; equalised odds (equal true- and false-positive rates across groups); calibration within groups. Several of these cannot be satisfied simultaneously when base rates differ (Kleinberg, Mullainathan and Raghavan, 2016; Chouldechova, 2017), so the bank must choose and justify a fairness definition. In lending, the UK Equality Act 2010, EU non-discrimination law and the US Equal Credit Opportunity Act and Regulation B (which requires specific adverse-action reasons) set the legal frame [VERIFY jurisdictional detail]. For LLM systems add tests for differential tone, differential refusal rates and differential error rates across customer groups, because text outputs can discriminate in ways a scorecard cannot.

### 2.11 Auditability

Auditability means a competent third party can reconstruct what the system did and why. Requirements: immutable logging of inputs, retrieved context, prompts, model version, tool calls and outputs; lineage from training or retrieval data to output; versioning of every component of the system (Section 2.6); reproducibility, recognising that LLM outputs are not strictly deterministic even at temperature zero, so reproducibility is defined at the level of logged evidence rather than regenerated output; retention aligned to regulation (the EU AI Act requires deployers to keep logs for at least six months; banking record-keeping rules often require longer [VERIFY]); and access controls and tamper evidence for the logs themselves.

### 2.12 Classifying a GenAI or agentic system under a bank's model risk framework

Tiering drivers: materiality of the decision (financial exposure, customer impact); autonomy level (Module 3), from suggestion to unsupervised action; reversibility of errors; regulatory exposure (Annex III, conduct, financial crime); population affected; and opacity (third-party model, no access to weights). A practitioner tiering [ILLUSTRATIVE — composite; firms differ]:

| Tier | Characteristics | Example | Validation intensity |
|---|---|---|---|
| 1 | Material customer or financial decisions; high autonomy or regulatory high-risk | Credit decisioning support for individuals; auto-closing sanctions alerts | Full independent validation, annual revalidation, board-level reporting, FRIA where applicable |
| 2 | Decision support with mandatory human approval; moderate materiality | Case-file drafting for KYB; dispute recommendation with analyst approval | Independent validation at launch; monitoring; revalidation on material change or every two years |
| 3 | Internal productivity; low materiality; reversible | Knowledge assistant for policy questions; meeting summaries | Lighter review; usage policy; monitoring of misuse and leakage |

### 2.13 A Responsible AI control framework across the lifecycle

| Lifecycle stage | Controls | Evidence produced |
|---|---|---|
| Intake and classification | Use-case intake form; prohibited-use screen (Article 5); Annex III screen; model risk tier; data protection impact assessment trigger; FRIA trigger | Classification record; tier decision; DPIA and FRIA plans |
| Design | Autonomy level and HITL design; explainability approach (decision in explainable component); fairness definition chosen; data governance plan; third-party model due diligence | Design authority approval; architecture decision record |
| Data | Data lineage; representativeness assessment; bias assessment of training or retrieval data; consent and purpose limitation | Data governance sign-off |
| Build | Prompt and tool registry; guardrails (input, output, action); least-privilege tool permissions; secure development; adversarial testing including prompt injection | Build evidence pack |
| Evaluation and validation | Golden dataset; accuracy, faithfulness, robustness tests; fairness metrics by group; red-team report; independent validation report; conformity assessment where provider | Validation report; conformity documentation |
| Deployment | Change approval; user training and competence (Article 26, Article 4 AI literacy); customer disclosure (Article 50); regulatory notification or registration where required | Deployment approval; training records |
| Operation | Monitoring of performance, drift, override rates, incidents; logging and retention; complaint and challenge handling; serious-incident reporting | Monitoring dashboards; incident register |
| Change and retirement | Model change notification from vendors; re-validation triggers; periodic review; decommissioning and data deletion | Change log; revalidation reports |

## 3. Frameworks

### 3.1 NIST AI RMF Govern, Map, Measure, Manage (NIST, Jan 2023)

Apply by: establishing the governance structure first (policies, roles, inventory); mapping each use case's context, affected groups and risks; selecting metrics and tests for each identified risk; and deciding treatment with documented residual risk. Use the GenAI Profile's risk categories as a checklist for LLM systems.

### 3.2 PRA SS1/23 five principles (PRA, May 2023)

Apply by running a gap assessment of the bank's existing MRM framework against the five principles specifically for GenAI: does the inventory capture LLM systems, including shadow usage; does tiering account for autonomy and opacity; are development standards extended to prompts, retrieval and tools; can validation operate without access to weights; are mitigants such as HITL and output filters formally recognised as model risk mitigants.

### 3.3 EU AI Act compliance pathway (Regulation (EU) 2024/1689)

Steps: inventory all AI systems; screen for prohibited practices; classify against Annex I and Annex III; determine role (provider, deployer, both); map obligations by role and date; conduct FRIA where required; align with existing financial-sector governance to avoid duplication; register, document, monitor. Build this as a crosswalk to the bank's model risk and third-party risk frameworks rather than a separate programme.

### 3.4 ISO/IEC 42001 AIMS (ISO/IEC, Dec 2023)

Apply by using the Annex A control objectives as the structure for the bank's AI policy suite, and by requiring ISO/IEC 42001 certification or equivalent evidence from material AI vendors.

### 3.5 FEAT principles (MAS, 2018) and the Veritas methodology

Apply by running the fairness, ethics, accountability and transparency assessment questions at design and at validation, using Veritas's fairness assessment methodology as a template where the bank has no equivalent.

## 4. Worked BFSI example

### 4.1 Context

[ILLUSTRATIVE — composite] A bank with operations in Germany, the UK and India wants an agentic credit-underwriting assistant for small-business lending up to EUR 250,000 equivalent. The applicant population includes sole traders (natural persons) and incorporated small companies. The assistant: collects and extracts financial documents; retrieves bureau and bank-statement data via tools; computes affordability ratios; drafts a credit memo with cited evidence; proposes a decision and pricing band; and routes to an underwriter who approves, modifies or declines. The bank builds the assistant on a hyperscaler platform with a third-party foundation model, and the final decision logic for individuals is a traditional scorecard the assistant calls as a tool.

### 4.2 Classification by jurisdiction

| Question | EU (Germany) | UK | India |
|---|---|---|---|
| Is this an Annex III high-risk system? | Yes, for sole traders and any natural-person assessment (5(b)); not for incorporated companies, but the system is one system, so treat it as high-risk in scope [VERIFY interpretation] | Not applicable (no AI Act); governed by PRA SS1/23 and FCA conduct rules | Not applicable; governed by RBI expectations and FREE-AI direction [VERIFY] |
| Bank's role | Provider and deployer (built in-house) | Model owner under SS1/23 | Regulated entity under RBI |
| Model risk tier | Tier 1 | Tier 1 | Tier 1 |
| Fundamental rights or impact assessment | FRIA required before first use (Article 27) plus GDPR DPIA | DPIA under UK GDPR; Consumer Duty fair-value and outcomes assessment | DPDP Act 2023 obligations; RBI fair practices; board-approved AI policy per FREE-AI [VERIFY] |
| Automated decision-making | GDPR Article 22 constraints where decisions are solely automated; human approval designed in | UK GDPR Article 22 as amended by the Data (Use and Access) Act 2025 [VERIFY]; human approval designed in | Human approval designed in; RBI digital lending guidelines on transparency [VERIFY] |
| Explainability expectation | Article 13 transparency and Article 86 right to explanation for high-risk decisions [VERIFY]; adverse decision reasons under consumer credit law | Consumer Duty; adverse decision reasons; Equality Act | Fair practices code: reasons for rejection on request; FREE-AI "understandable by design" |
| Disclosure to applicant | Article 50 where the applicant interacts with the system directly; Article 26 information to affected persons | FCA Principle 7 clear communications; Consumer Duty | RBI customer-protection expectations |
| Supervisor | BaFin as market surveillance authority for AI in financial services [VERIFY national designation] | PRA and FCA | RBI |

### 4.3 Obligations mapped to the system

| Obligation | Attaches in | How the design meets it |
|---|---|---|
| Risk management system across lifecycle (Article 9) | EU | Integrated with the bank's MRM framework; risk register per component |
| Data governance and bias examination (Article 10) | EU; SS1/23 Principle 3; FEAT-style fairness | Representativeness analysis of training data for the scorecard; retrieval corpus review; disparate-impact testing on gender, age and nationality proxies with four-fifths screen and equalised-odds review |
| Technical documentation (Article 11) | EU | Model card for the system; vendor documentation for the foundation model obtained contractually |
| Record-keeping and logs (Article 12, Article 26) | EU; UK record-keeping; RBI audit | Immutable logs of inputs, retrieved context, prompts, model version, tool calls, outputs; retention seven years per credit record rules [ESTIMATE — align to local rules] |
| Human oversight (Article 14, Article 26) | EU; SS1/23 Principle 5; RBI accountability | Underwriter approval mandatory; seeded test cases to detect automation bias; override rate band 3–15% monitored |
| Accuracy, robustness, cybersecurity (Article 15) | EU; SS1/23 Principles 3 and 4 | Golden dataset of 3,000 historical applications; extraction accuracy ≥ 98%; memo faithfulness ≥ 99%; prompt-injection testing on uploaded documents |
| Quality management system (Article 17) | EU, with alignment to CRD internal governance | Mapped to existing governance; delta documented |
| Conformity assessment and registration | EU | Internal control conformity assessment where permitted for Annex III; registration in the EU database before use [VERIFY] |
| FRIA (Article 27) | EU | Completed before first use; covers affected groups, risks to non-discrimination and access to credit, mitigation |
| Independent validation and SMF accountability | UK | Validation by model risk; CRO delegate as accountable SMF; annual revalidation |
| Explainability of decision | All | Decision and pricing come from the scorecard; adverse reasons generated from scorecard counterfactuals; the LLM memo cites evidence and never states a decision reason that is not in the scorecard output |
| Board-approved AI policy and incident reporting | India (FREE-AI) | AI policy approved by the India board; incident reporting process aligned to RBI expectations [VERIFY] |
| Consumer protection and fair value | UK (Consumer Duty); India (fair practices) | Outcome monitoring by segment; complaint analysis |

### 4.4 Control plan excerpt with numbers

[ILLUSTRATIVE — composite]

| Control | Threshold | Monitoring frequency | Owner |
|---|---|---|---|
| Document extraction accuracy | ≥ 98% field-level on monthly QA sample of 300 | Monthly | Product owner |
| Memo faithfulness (every stated fact traceable to a cited record) | ≥ 99% | Monthly | Model risk |
| Disparate impact ratio, approval rate by gender and age band | ≥ 0.80 and investigated below 0.90 | Quarterly | Fair lending officer |
| Underwriter override rate | 3–15% | Weekly | Credit operations |
| Override quality (QA sides with underwriter) | ≥ 70% | Monthly | Model risk |
| Prompt-injection detection on uploaded documents | 100% of seeded attacks blocked in quarterly red team | Quarterly | Security |
| Serious-incident reporting | Within statutory period (EU AI Act Article 73 timelines [VERIFY]) | Event-driven | Compliance |
| Foundation model version change | 90 days' notice; re-validation before adoption | Event-driven | Vendor manager |

The "so what" for the client: the architecture decision to keep the credit decision in an explainable scorecard and use the agent for assembly and drafting is what makes this system approvable in all three jurisdictions. Letting the LLM decide would make Article 13 explanation, UK adverse-reason and Indian fair-practice obligations very hard to meet.

## 5. Real-world case

**Apple Card and Goldman Sachs, 2019–2021** [PUBLIC — NYDFS report, Mar 2021]. In November 2019 public allegations that the Apple Card algorithm gave women lower credit limits than their spouses prompted a New York Department of Financial Services investigation. The March 2021 report found no unlawful discrimination under fair lending law, but criticised the issuer's customer service and lack of transparency, noting that customers could not get meaningful explanations of their limits. The lesson is that an explainability and communications failure can create a regulatory event even when the model passes the legal fairness test, which is why adverse-reason generation and front-line scripts belong in the control plan.

**Air Canada chatbot, 2024** [PUBLIC — British Columbia Civil Resolution Tribunal, Moffatt v. Air Canada, Feb 2024]. The tribunal held the airline liable for a chatbot's incorrect statement about bereavement fares, rejecting the argument that the chatbot was a separate entity responsible for its own words. For banks this fixes the accountability principle: statements made by a deployed system are the firm's statements, which is also the position under UK Consumer Duty and FCA Principle 7 [VERIFY].

**HSBC and Google Cloud AML AI, 2023** [PUBLIC — Google Cloud, Jun 2023; VERIFY]. The publicly reported outcome (two to four times more suspicious activity identified, around 60% fewer alerts) was achieved with explainability features designed so investigators and regulators could understand risk scores, illustrating that explainability was a precondition for regulatory acceptance of replacing rules with ML in financial crime.

**Amazon recruiting tool, 2018** [PUBLIC — Reuters, Oct 2018]. An ML hiring tool trained on historical CVs learned to penalise indicators associated with women and was scrapped. Relevant to banks because HR analytics is Annex III high-risk and because the failure was in data representativeness, which Article 10 and SS1/23 Principle 3 both address.

## 6. Consultant language

> "We validate the system in use, not the foundation model: prompts, retrieval, tools and oversight are all in the model boundary."

Use with model risk when scoping validation of an LLM system.

> "The decision stays in an explainable component; the agent assembles and drafts. That is what makes the explanation obligation meetable."

Use with the CRO and product teams during architecture decisions.

> "Under the AI Act we are both provider and deployer of this system, so the obligations stack."

Use when the client assumes building in-house avoids provider duties.

> "SS1/23 brings qualitative and judgement-based models into scope, so the question is not whether this is a model but which tier it sits in."

Use with UK clients who argue GenAI is outside MRM.

> "Fairness metrics conflict when base rates differ, so we will choose one definition, justify it, and monitor the others."

Use when fairness testing is being designed.

## 7. Common mistakes juniors make

- Treating the EU AI Act as applying to all AI in banking; most operational use cases are not Annex III high-risk.
- Forgetting that a bank building its own high-risk system is a provider as well as a deployer.
- Quoting EU AI Act dates without checking the status of the digital omnibus and national implementation.
- Describing SR 11-7 as a US-only concern rather than the parent of every bank's model risk framework.
- Validating only the foundation model, or asserting it cannot be validated, instead of validating the system in use.
- Presenting LLM-generated rationales as explanations of the model's decision.
- Choosing a fairness metric without acknowledging the impossibility results and documenting the choice.
- Scoring ISO/IEC 42001 certification as evidence that a vendor's model is accurate or fair.
- Designing HITL as a rubber stamp without controls for automation bias.
- Treating Responsible AI as a policy document rather than a set of controls with thresholds, owners and evidence.

## 8. Interview questions with model answers

**Q1. A UK bank's CRO says GenAI tools are "not models" and so sit outside model risk management. How do you respond?**

Model answer. I would point to the PRA's SS1/23, effective from May 2024, whose model definition explicitly includes qualitative and expert-judgement inputs and qualitative outputs, which brings LLM-based systems inside scope; the PRA has also indicated that it sees SS1/23 as the primary vehicle for AI model risk [VERIFY]. So the question is not whether a GenAI tool is a model but which tier it belongs to. I would propose a tiering based on materiality, autonomy, reversibility, regulatory exposure and opacity: a knowledge assistant answering policy questions is Tier 3 with light review and a usage policy; a case-drafting agent with mandatory human approval is Tier 2; anything influencing customer credit or financial crime decisions is Tier 1 with full independent validation. I would then address the practical objection behind the CRO's statement, which is that a third-party foundation model cannot be validated conventionally. The answer is to define the model boundary as the system in use, including prompts, retrieval, tools, guardrails and oversight, and to validate behaviour through golden datasets, robustness and fairness testing, monitoring and compensating controls, with third-party model risk applied to the vendor. Finally, I would note the benefit: a clear tiering lets the bank move faster on Tier 3 tools rather than treating all GenAI as equally risky.

**Q2. Which banking AI use cases are high-risk under the EU AI Act, and what does that mean in practice for a bank deploying one?**

Model answer. Annex III makes two financial use cases high-risk: creditworthiness assessment or credit scoring of natural persons, excluding fraud detection, and risk assessment and pricing in life and health insurance; employment-related AI is also high-risk and affects HR. Most other bank uses, such as AML monitoring, sanctions screening, disputes and operational automation, are not Annex III high-risk, though they remain under model risk and conduct rules, and chatbots carry Article 50 disclosure duties. In practice, for a credit-scoring system a bank that buys it is a deployer and must use it per the instructions, assign trained human oversight, ensure input data relevance, keep logs for at least six months, monitor and report serious incidents, inform affected persons, and complete a fundamental rights impact assessment before first use. A bank that builds it is also a provider and must meet the full provider set: risk management system, data governance, technical documentation, record-keeping, transparency, human oversight by design, accuracy and robustness, a quality management system aligned to existing prudential governance, conformity assessment and registration. Timing: most Annex III obligations apply from 2 August 2026, subject to the Commission's November 2025 omnibus proposal that may delay them [VERIFY]. My advice to a bank is to treat the Act as a crosswalk onto its existing MRM, third-party and conduct frameworks rather than as a new standalone programme, and to run the inventory and classification now.

**Q3. How would you make an agentic underwriting assistant explainable and fair enough to satisfy regulators?**

Model answer. Architecturally, I would separate assembly from decision. The agent gathers documents, extracts data, retrieves bureau and bank-statement information, computes ratios and drafts the memo with citations, but the credit decision and pricing come from an explainable scorecard or constrained model that the agent calls as a tool. That lets the bank generate adverse-action reasons from the scorecard, using counterfactual or SHAP-style attributions, and lets the memo cite evidence for every stated fact without pretending that the LLM's prose is the reason for the decision; research shows model-stated reasoning is not a faithful account of the computation. On fairness, I would define protected attributes and proxies, choose a primary metric such as disparate impact with the four-fifths screen plus equalised-odds review, document why that choice was made given the impossibility of satisfying all metrics when base rates differ, test at validation and quarterly in operation, and add LLM-specific checks for differential tone, refusal and error rates across groups. On oversight, mandatory underwriter approval with automation-bias controls such as seeded test cases and an override-rate band. On evidence, immutable logs of inputs, retrieved context, prompts, model versions, tool calls and outputs, with retention aligned to credit record rules. And I would frame the package against the regulator's own vocabulary: EU AI Act Articles 10, 13, 14 and 27, PRA SS1/23 principles, and RBI FREE-AI's "understandable by design" and "fairness and equity" sutras [VERIFY].

## 9. Self-check quiz

1. Name the two Annex III points of the EU AI Act most relevant to financial services and state one bank use case that is not high-risk under Annex III.
2. State the five principles of PRA SS1/23 and explain the significance of its model definition for GenAI.
3. A model approves 62% of male applicants and 47% of female applicants. Compute the disparate impact ratio and state whether it fails the four-fifths rule.
4. Why is an LLM's written rationale not an explanation in the model risk sense, and what architectural choice addresses this?
5. List the four NIST AI RMF functions and give one GenAI-specific risk category from the NIST Generative AI Profile.
