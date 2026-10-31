# Request for Proposal (RFP)

## Business Lending Process Redesign ahead of the BLP Replacement Programme

| | |
|---|---|
| **Issued by** | Business Bank – Business Banking Transformation Office |
| **Executive Sponsor** | Managing Director, Business Banking **[Assumed – confirm]** |
| **Business Owner** | Head of Lending Operations, Business Banking **[Assumed – confirm]** |
| **Document status** | Draft for finalisation |
| **Reference** | BB-BLP-RFP-001 |

---

## 1. Background

Business Bank administers all business lending facilities and business deposit opportunities on the **Business Lending Platform (BLP)**, an Experian-supported system. BLP records lending and deposit opportunities; for lending it supports the credit decision (approvals and declines), fulfils documentation, and provides the workflow that ensures every step in lending approval is evidenced.

BLP supports the customer across the whole lending lifecycle, not only origination: annual reviews, facility renewals, covenant monitoring, risk activities, referral of distressed connections to Strategic Business Services / Problem Solving (SBS/PS), and day-to-day servicing. It is used across the entire Business Bank, from Business Direct through to Corporate (with restricted views for Corporate because of insider-information controls), and is a key data source for regulatory reporting and operational MI.

**Scale**

- c. 900 users
- c. 3,000 deals per month; 30,561 deals in the last 12 months
- 98 deposit opportunities currently in progress
- 12 product families in scope; 11 deal types in use

**Surrounding landscape:** MEO (RM front end for business current accounts), IMPACS (overdrafts), TELLER (fee processing), CIF Portal (customer number lookup), Blue Prism robotic process automation, and four scheduled batch jobs (auto-reoriginate deals at 90 days; forbearance status update; waiver-expired update; mass officer-code reassignment).

**Why now.** The Bank has approved a programme to replace BLP (“the BLP Replacement Programme”). Current-state journey maps have been produced for the replacement (New Money, Renewal/EPR, Variation, Remove All Facilities, CAP Referral, CAP Strategy, Shadow Limit & Staged Drawdown, Shadow Limit Reallocation, Staged Drawdown Allocation). The Bank does not want to replicate today’s process, workarounds and exceptions on the new platform. It therefore requires an independent business process re-engineering engagement to define the target-state lending process **before** the replacement platform is configured.

## 2. Purpose of this request

The Bank invites proposals for a consulting partner to deliver an end-to-end business process re-engineering (BPR) engagement for the business lending lifecycle administered on BLP. The partner will establish a quantified current-state baseline, design the target-state process and operating model, produce a business case, and prepare a process requirements pack that the BLP Replacement Programme can build to.

## 3. Business objectives

The engagement must contribute to the following objectives. Targets are indicative and will be confirmed against the Phase 1 baseline.

| # | Objective | Indicative measures |
|---|---|---|
| O1 | Reduce time to decision and time to fulfilment for customers, with priority on servicing journeys (Renewal and Variation account for two-thirds of volume) | End-to-end cycle time by deal type; % of renewals eligible for fast-track; time to cash for new money |
| O2 | Reduce cost to serve and release RM, Credit, Lending Services and Fulfilment capacity | Touch time and cost per deal; FTE-equivalent capacity released by role |
| O3 | Maintain or strengthen credit risk control and delegated-authority compliance | Policy exceptions; authority breaches; audit findings; time from distress indicator to CAP referral |
| O4 | Reduce rework and re-processing | First-time-right rate; “deferred – further information required” rate; facility letters unreturned at 3 months; re-processing after credit approval |
| O5 | Simplify and standardise the process so the replacement platform can be delivered with minimal customisation | Number of deal types and journey variants; custom vs. standard process steps; bots, batch jobs and off-platform documents retired |
| O6 | Protect and improve data quality for regulatory reporting and MI | Fields captured at source; manual MI adjustments; data quality scores |
| O7 | Improve colleague and customer experience | RM effort per deal; system steps per journey; customer effort / NPS **[Assumed – confirm measurement]** |

## 4. Scope

### 4.1 In scope

**Processes (end to end, all segments: Business Direct, Strategic Finance, Corporate)**

1. Lead, customer and opportunity creation (lending and deposit)
2. Deal creation and credit decisioning, including delegated authority, Credit assessment, decline/appeal/refer
3. Documentation, completion and fulfilment (facility letters, security, pre-conditions, fulfilment hand-off)
4. In-life servicing: Renewal, Extension Pending Review, Variation, Remove All Facilities, changes after approval
5. Distressed-connection handling: CAP Referral, CAP Strategy, in-flight referral to SBS/PS
6. Pre-approved facility usage: Shadow Limit, Shadow Limit Reallocation, Staged Drawdown and Staged Drawdown Allocation
7. Deposit opportunity recording
8. Controls, policies and delegated-authority rules embedded in the above
9. Workarounds and automation surrounding BLP: Blue Prism bots, the four batch jobs, off-platform facility letters, manual email issuance

**Products:** all 12 product families (Invoice Finance, Asset Finance, Credit Cards, BACS Limits, Shadow Limits, Contingent Liabilities, International, Term Lending, Credit Open, Overdrafts, Group Overdraft, Treasury).

**Deal types:** all 11 current deal types, including a recommendation on which to retain, merge or retire.

**Organisation:** roles that touch the process – Relationship Managers, Business Direct, Credit, Lending Services (securities), Fulfilment, SBS/PS, Business Operations, Corporate Associates, Credit Risk policy, MI/Regulatory Reporting.

### 4.2 Out of scope

- Personal Association Lend (13th product; excluded from the replacement)
- Selection or procurement of the replacement technology platform
- Build, configuration, testing or data migration of the replacement platform
- Changes to credit risk appetite or credit policy content (policy *application* and *controls* are in scope; policy *setting* remains with Credit Risk)
- Changes to MEO, IMPACS, TELLER or CIF Portal beyond interface requirements
- Personal lending, retail deposits

### 4.3 Scope decisions required at mobilisation

The following will be confirmed at the Phase 0 gate:

- Treatment of **ESR Cleanse** (12.5% of volume): process in scope vs. data-migration activity
- Depth of coverage for **Corporate** given insider-information restrictions
- Whether **deposit opportunities** remain on the lending platform or move to a pipeline/CRM tool
- Whether capacity release is to be realised as **headcount reduction** or as **redeployment to revenue-generating activity**

## 5. Current state summary

The Bank has already produced L3-level swimlane journey maps (Customer / RM / BLP Replacement System / Credit / Fulfilment / SBS lanes) for the journeys listed in §1. These are **available to bidders on request** and will be provided to the appointed partner.

Known characteristics of the current state that the engagement must address:

- Renewal (42.3%) and Variation (23.8%) dominate volume; New Money is 2.3%.
- Renewals by definition involve no structural change yet follow the full credit flow.
- ESR Cleanse (12.5%) is a data-transfer activity recorded as a deal type.
- Staged Drawdown recorded zero deals in 12 months; a “DO NOT USE” legacy deal type remains selectable.
- Facility letters are produced as PDFs and issued manually by email; Shadow Limit and Staged Drawdown letters are produced off-platform. Unreturned letters at 3 months return the deal to pre-credit.
- Exception paths (decline/appeal/refer, change after approval, in-flight CAP referral, security preparation) are referenced but not mapped.
- Volumes, cycle times, touch times, controls and segment variations are not captured on the maps.
- Several points on the maps remain open (marked “TBC” or in red), e.g. repayment schedules per staged drawdown, associated-party deal updates, off-platform facility letters.

## 6. Required deliverables

Bidders must propose a phased approach that produces, as a minimum:

**Mobilisation**
- Project charter, governance structure, integrated plan, RAID, stakeholder and communications plan
- Hypothesis tree and data request
- Dependency and decision log with the BLP Replacement Programme

**Current-state assessment**
- Process taxonomy (L1–L2) and validated as-is maps (L3/L4) including exception paths and segment variations
- Deal type × stage matrix (commonality, variation, redundancy)
- Quantified baseline per journey: volume, cycle time, touch time, wait time, first-time-right, rework, cost per deal
- Activity-based effort baseline by role
- Control, policy and delegated-authority inventory
- Workaround inventory (bots, batch jobs, off-platform documents) mapped to root cause
- Regulatory reporting and MI data lineage
- Pain-point register, root-cause analysis, sized opportunity long-list
- Current-state assessment report and executive summary

**Target-state design**
- Design principles
- Target journey patterns and L3/L4 to-be maps with eliminated / automated / consolidated steps evidenced against as-is
- Risk-based routing design (fast-track / straight-through criteria) agreed with Credit Risk
- Control equivalence assessment for every removed or automated control, signed off by second line
- Gap analysis across process, people, policy, technology, data and controls
- Target RACI, role profiles and organisation impact
- Target KPIs with numeric targets tied to the baseline
- Process requirements pack for the BLP Replacement Programme (journey configuration, business rules, epic-level user stories, fit-gap against the selected platform)
- Business case: one-off cost, run-rate benefit, payback, named benefit owners
- Prioritised initiative portfolio and roadmap (quick wins vs. structural change)
- Design-authority sign-off pack

**Implementation planning and benefits**
- Implementation roadmap sequenced to the replacement release plan
- Pilot and rollout approach, change impact assessment, training needs analysis
- Benefits tracking framework and KPI definitions
- Handover and closure report

## 7. Constraints and dependencies

- **Timing.** The target-state design and process requirements pack must be available to the BLP Replacement Programme before its requirements baseline is frozen. Bidders must state how they will manage this dependency. Freeze date: **[Assumed – confirm with Replacement Programme]**.
- **Fit-to-standard.** Where the replacement platform provides a standard lending process, the target design should adopt it unless a documented business or regulatory reason requires deviation.
- **Regulatory reporting.** BLP data feeding regulatory returns must be preserved or improved; no design may remove a reporting data point without MI / Regulatory Reporting sign-off.
- **Risk governance.** All control changes require Credit Risk and second-line Risk approval through the design authority.
- **Insider information.** Corporate segment views and data are restricted; the partner must comply with the Bank’s information barriers.
- **Operational continuity.** No disruption to live lending operations during discovery; time-and-motion and workshop load on RMs and Credit must be agreed with line management.
- **Data.** Operational MI requests have a lead time of 3–4 weeks; the partner must plan accordingly.

## 8. Timeline

Indicative, to be confirmed in proposals:

| Phase | Indicative duration |
|---|---|
| Mobilise | 2 weeks |
| Current-state assessment | 4–6 weeks |
| Target-state design and business case | 4–6 weeks |
| Implementation planning | 3–4 weeks |
| Implement, embed and track benefits | Aligned to Replacement Programme releases |

Bidders should propose stage gates with explicit SteerCo decisions at the end of each phase.

## 9. Governance and Bank resources

The Bank will provide:

- Executive Sponsor and SteerCo (Business Banking, Credit Risk, Operations, Technology, Finance, Risk) meeting fortnightly **[Assumed – confirm]**
- A Design Authority including Credit Risk Policy, second-line Risk, MI/Regulatory Reporting and the Replacement Programme architect
- A Bank-side project manager and business analyst
- Nominated subject-matter experts from each role in §4.1 for workshops and walk-the-process sessions
- Access to BLP (read-only), journey maps, policy documents, MI extracts and the Replacement Programme requirements backlog

The partner is expected to provide: engagement lead, BPR / operating-model lead, lending process SMEs, credit risk and controls specialist, data/MI analyst, change lead, and PMO support.

## 10. Proposal requirements

Proposals must include:

1. Understanding of the Bank’s situation and the key hypotheses the bidder would test
2. Proposed approach, phases, activities, deliverables and stage gates
3. Approach to managing the dependency on the BLP Replacement Programme
4. Team structure, named key personnel and CVs, with relevant lending and BPR credentials
5. Two relevant case studies (business or commercial lending process redesign, preferably tied to a platform replacement)
6. Assumptions, risks and dependencies
7. Commercial proposal: fixed fee per phase, with Phases 3–4 optional and priced separately; rate card for change requests
8. Resource expectation from the Bank (hours per role per week)

## 11. Evaluation criteria

| Criterion | Weight |
|---|---|
| Understanding of business lending processes and credit lifecycle | 25% |
| Quality and rigour of approach, including baselining and control equivalence | 25% |
| Relevant experience and team | 20% |
| Ability to integrate with the Replacement Programme and deliver a usable requirements pack | 15% |
| Commercial value | 15% |

## 12. Questions for bidders

1. How would you reduce 11 deal types to a smaller set of journey patterns without losing the controls each type exists to provide?
2. What criteria would you propose for fast-tracking or straight-through processing of Renewals, and how would you gain Credit Risk acceptance?
3. How would you treat deposit opportunities – on the lending platform, or elsewhere?
4. How would you prevent the engagement replicating today’s process on the new platform (“paving the cow path”)?
5. How would you quantify the baseline given the limited MI available on cycle and touch times?

## 13. Key dates

| Milestone | Date |
|---|---|
| RFP issued | [TBC] |
| Bidder clarification questions | [TBC] |
| Proposal submission | [TBC] |
| Bidder presentations | [TBC] |
| Partner selected | [TBC] |
| Engagement start | [TBC] |
