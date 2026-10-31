# Proposal Response – Approach and Deliverables

## Business Lending Process Redesign ahead of the BLP Replacement Programme

| | |
|---|---|
| **In response to** | BB-BLP-RFP-001 |
| **Document** | Section 2 of proposal – Approach, Phases, Deliverables and Stage Gates |
| **Status** | Draft v0.1 |

---

## 1. Our understanding and how it shapes the approach

Three facts in the RFP drive how we would run this engagement.

**1. This is a servicing problem, not an origination problem.** Renewal and Variation are two-thirds of 30,561 deals; New Money is 2.3%. Most lending transformation work targets time-to-yes on new money. Here the prize is in the in-life journeys, which is where we will spend most of the design effort and where the business case will come from.

**2. The design has a hard customer: the Replacement Programme.** The to-be process must be delivered as a requirements pack the programme can build to, before its requirements baseline freezes. We therefore run a **fit-to-standard** design, not a clean-sheet one: adopt the platform's standard lending journey where it is good enough, and design custom steps only where the Bank genuinely differs (CAP/SBS, delegated authority, Shadow Limits). Every week of our Phase 2 is planned backwards from that freeze date.

**3. The controls are the constraint, not the process.** In a bank, process steps exist because a policy, a delegated-authority rule, a regulatory return or an audit finding put them there. A step cannot be removed by showing it is slow; it can only be removed by showing the control it serves is either unnecessary or delivered another way. We make **control equivalence** a formal deliverable with second-line sign-off, because it is the thing that most often stops a lending redesign at the design-authority gate.

### 1.1 Starting hypotheses (to be tested, not assumed)

| # | Hypothesis | Evidence from the current-state maps | Tested in |
|---|---|---|---|
| H1 | One shared "deal start" component can replace seven separately drawn Lead & Customer stages | Login, landing page, search, retrieve customer, additional parties, pull-through deal, balances appear identically in all journeys | Phase 1 deal-type matrix |
| H2 | One decisioning flow with deal-type parameters can replace per-type Deal & Credit flows | Customer Analysis, Credit Analytics, validate, documents check, delegated-authority check, Credit assessment, distress check, decision are near-identical across New, Renewal, Variation, Shadow Limit | Phase 1 deal-type matrix |
| H3 | A material share of Renewals can be fast-tracked within delegated authority | Renewal is defined as "no change to structure" yet follows the full flow | Phase 1 baseline + Phase 2 routing design |
| H4 | ESR Cleanse should leave the deal list and move to migration | It is a records transfer from the "orange lending file", not a customer deal | Phase 0 scope decision |
| H5 | 11 deal types can collapse to 4–5 journey patterns | Staged Drawdown: 0 deals; DO NOT USE still selectable; Remove All Facilities mapped but not a deal type | Phase 1 → Phase 2 |
| H6 | Facility letter production and return is the largest single rework loop | Manual PDF by email; off-platform letters for Shadow Limit / Staged Drawdown; 3-month unreturned-letter reset to pre-credit | Phase 1 baseline |
| H7 | Bots and batch jobs are symptoms of process and system gaps | Four batch jobs and Blue Prism bots exist around BLP | Phase 1 workaround inventory |
| H8 | The unmapped exception paths hold most of the hidden cycle time | Decline/appeal, change-after-approval, in-flight CAP, security prep are blue boxes, not maps | Phase 1 mapping |

## 2. Approach overview

Five phases, four stage gates, six workstreams.

```
Phase 0        Phase 1              Phase 2                Phase 3            Phase 4
Mobilise  →   Discover /     →     Design /         →    Plan          →   Implement,
(2 wks)       As-Is (5 wks)        To-Be (6 wks)         Delivery           Embed, Track
                                                          (3–4 wks)          (per release)
   ▲ G0           ▲ G1                 ▲ G2                  ▲ G3
 Charter       Baseline           Design + business      Ready to
 approved      endorsed           case approved,         implement
                                  funding released
```

**Workstreams (run through all phases, each with a named lead)**

| WS | Workstream | Why it is separate |
|---|---|---|
| 1 | Journeys and Process | The core BPR work |
| 2 | Credit Policy, Delegated Authority and Controls | Owns control inventory, routing criteria and control equivalence; interfaces with Credit Risk and second line |
| 3 | Data, MI and Regulatory Reporting | Protects reporting data points; owns the baseline data |
| 4 | Technology and Replacement Programme Interface | Fit-gap, requirements pack, dependency and decision log |
| 5 | People and Change | Role impact, RACI, change readiness, training |
| 6 | PMO and Benefits | Plan, RAID, gates, benefits logic and tracking |

Time to the funding gate (G2): **13 weeks**. Time to ready-to-implement (G3): **17 weeks**. Phase 4 aligns to the Replacement Programme's release plan.

---

## 3. Phase 0 – Mobilise (Weeks 1–2)

**Purpose.** Lock scope, governance and the baseline data request so that nothing is re-litigated at G2.

### 3.1 Activities

| Week | Activity | Who |
|---|---|---|
| 1 | Sponsor and SteerCo alignment interviews (8–10, 45 min each): objectives, non-negotiables, what "good" looks like at G2 | Engagement Lead, Sponsor |
| 1 | Confirm scope decisions from RFP §4.3: ESR Cleanse, Corporate depth, deposits location, capacity vs. headcount | Sponsor, SteerCo |
| 1 | **Issue data request** (MI lead time is 3–4 weeks; issuing in Week 1 is the only way Phase 1 has a baseline by Week 7) | WS3 |
| 1 | Agree dependency with Replacement Programme: freeze date, decision log, which design decisions they are waiting on and the last date each can change | WS4, Programme Architect |
| 1–2 | Stand up governance: SteerCo charter, Design Authority (incl. Credit Risk Policy, 2nd-line Risk, MI/Reg Reporting, Programme Architect), working groups, escalation path | PMO |
| 2 | Build hypothesis tree from H1–H8, mapped to discovery activities | WS1 |
| 2 | Stakeholder map, engagement plan, comms plan; agree workshop and walk-the-process load with line management | WS5 |
| 2 | Integrated plan, resource plan, RAID opened, benefits logic tree (first draft) | PMO, WS6 |
| 2 | Kick-off | All |

### 3.2 Deliverables

| # | Deliverable | Format | Owner |
|---|---|---|---|
| 0.1 | Project charter: objectives, scope in/out, scope decisions, success criteria, assumptions | Document | Engagement Lead |
| 0.2 | Governance pack: SteerCo and Design Authority terms of reference, membership, cadence, decision rights, escalation path | Document | PMO |
| 0.3 | Integrated project plan and resource plan (Bank hours per role per week) | Plan | PMO |
| 0.4 | RAID log (opened) | Register | PMO |
| 0.5 | Stakeholder map, engagement plan, communications plan | Document | WS5 |
| 0.6 | Hypothesis tree with discovery activity mapping | One-page tree + register | WS1 |
| 0.7 | Data request and data provisioning plan | Register | WS3 |
| 0.8 | Replacement Programme dependency map and joint decision log | Register | WS4 |
| 0.9 | Benefits logic tree (draft) | One page | WS6 |
| 0.10 | Kick-off deck | Deck | Engagement Lead |

### 3.3 Gate G0 – SteerCo approves charter, governance and plan

Pass criteria: scope decisions recorded; freeze date confirmed in writing by the Replacement Programme; Design Authority membership includes second line; data request acknowledged by MI with a delivery date.

---

## 4. Phase 1 – Discover / Current-State Assessment (Weeks 3–7)

**Purpose.** Build a fact base the SteerCo owns. The Bank already knows the pain points; our job is to quantify them so the benefits in Phase 2 are credible. We **validate and enrich** the existing L3 maps rather than redraw them, which saves 1–2 weeks and shifts effort to measurement.

### 4.1 Activities

**Week 3 – Frame**
- Process taxonomy L1–L2 (value chain: Originate → Decide → Document & Fulfil → Service → Monitor & Recover) and a process inventory beneath it
- Confirm journey list and segment variants (Business Direct, Strategic Finance, Corporate) to be covered
- Build the **deal type × stage matrix** skeleton (11 types × Lead/Customer, Deal/Credit, Completion/Fulfilment, Post-approval)

**Weeks 3–5 – Map and walk**
- Validation workshops per journey (90 min each, 12–14 in total) with RM, Credit, Lending Services, Fulfilment, SBS: confirm the as-is, add controls, hand-offs, wait points, segment differences
- Map the **exception paths** not yet drawn: decline/appeal/refer, change after approval, in-flight CAP referral, security preparation, deferred-for-information loop
- Walk-the-process shadowing: 2 days with RMs (one Business Direct, one Strategic Finance), 1 day in Credit, 1 day in Lending Services, 1 day in Fulfilment
- Close the open "TBC" items on the current maps (repayment schedule per drawdown, associated-party updates, off-platform letters)

**Weeks 4–6 – Measure**
- Volume and cycle-time analysis from the MI extract: end-to-end and per stage, by deal type and segment; distribution not just mean (the tail is where the rework is)
- Touch-time baseline by **activity survey** (all roles, one week, c. 900 users sampled at 15–20%) supplemented by time-and-motion on the five highest-volume activities
- Rework analysis: deferred-for-information rate, unreturned facility letters at 3 months, re-processing after approval, EPR chains (max 3 then Credit)
- Cost per deal by type, built from touch time × loaded rate
- Control, policy and delegated-authority inventory: for each step, the policy or rule that requires it, the evidence it produces, and whether it is policy, habit or system limitation
- Workaround inventory: each Blue Prism bot, each batch job, each off-platform document and spreadsheet, mapped to the gap it covers
- Regulatory reporting and MI data lineage: which BLP fields feed which returns and dashboards (these are protected in design)
- Voice of business interviews (15–20) and voice of customer input (via RM feedback and any existing complaints/NPS data)

**Week 7 – Diagnose and size**
- Pain-point register tagged to process step, with frequency and impact
- Root-cause analysis on the top 10 pain points (fishbone / 5-whys), separating process, policy, system and behaviour causes
- Opportunity long-list sized at order of magnitude using ECRS (Eliminate, Combine, Rearrange, Simplify) against the baseline
- Current-state assessment report and executive summary

### 4.2 Deliverables

| # | Deliverable | Format | Owner |
|---|---|---|---|
| 1.1 | Process taxonomy L1–L2 and process inventory | Document | WS1 |
| 1.2 | Validated as-is maps L3/L4 for all journeys, including exception paths and segment variants, with controls and hand-offs marked | Visio/BPMN | WS1 |
| 1.3 | Deal type × stage matrix: common / variant / redundant steps per type | Matrix | WS1 |
| 1.4 | Process performance baseline per journey: volume, cycle time (mean and P80), touch time, wait time, first-time-right, rework rate, cost per deal | Data pack + dashboard | WS3 |
| 1.5 | Activity-based effort baseline by role (FTE-equivalent) | Model | WS3, WS5 |
| 1.6 | Control, policy and delegated-authority inventory | Register | WS2 |
| 1.7 | Workaround inventory (bots, batch jobs, off-platform documents) with root cause | Register | WS4 |
| 1.8 | Regulatory reporting and MI data lineage | Register | WS3 |
| 1.9 | Pain-point register and root-cause analysis | Register + fishbones | WS1 |
| 1.10 | Opportunity long-list, sized | Register | WS6 |
| 1.11 | Current-state assessment report and executive summary | Report + deck | Engagement Lead |

### 4.3 Gate G1 – SteerCo endorses the baseline

Pass criteria: SteerCo formally accepts the baseline numbers as the reference for benefits; Credit Risk confirms the control inventory is complete; MI confirms the data lineage; opportunity long-list approved for design.

This is the gate that matters most. If the SteerCo does not own the baseline, it will reject the benefits at G2.

---

## 5. Phase 2 – Design / Target State and Business Case (Weeks 8–13)

**Purpose.** Converge on the target process, prove it pays, and hand the Replacement Programme something it can build.

### 5.1 Activities

**Week 8 – Principles and patterns**
- Design principles agreed at Design Authority before any mapping (e.g. "one deal start for all journeys", "route by risk not by deal type", "no control removed without equivalence", "standard platform process unless a documented reason", "capture once at source")
- Define **journey patterns** from the Phase 1 matrix. Working hypothesis of 4–5:
  1. New or Increased Lending (New Money, Increase)
  2. Servicing Change (Variation, Remove All Facilities, change after approval)
  3. Renewal (Renewal, EPR) with fast-track and full-review routes
  4. Distressed Connection (CAP Referral, CAP Strategy, in-flight referral)
  5. Pre-approved Drawdown (Shadow Limit Reallocation, Staged Drawdown Allocation)
- Confirm ESR Cleanse, DO NOT USE and Staged Drawdown (origination) are retired as deal types

**Weeks 8–11 – Design**
- To-be maps L3/L4 per pattern, with every as-is step marked Eliminated / Automated / Consolidated / Retained and the reason
- **Risk-based routing design** (WS2 with Credit Risk): criteria for fast-track or straight-through renewal within delegated authority (e.g. no change in limits, risk grade within band, covenants compliant, no watch-list flags, no EPR in last 12 months); expected share of renewals qualifying, from Phase 1 data
- **Control equivalence assessment**: for each eliminated or automated control, the replacement control or evidence it is not required; reviewed by second line
- Facility-letter and documentation design: template generation on platform, e-signature, automated chase and expiry, elimination of off-platform letters
- Exception-path design: decline/appeal, deferral, change after approval, in-flight CAP, as first-class paths not side notes
- Deposit opportunity design (see §8, Q3)
- Fit-gap workshops with the Replacement Programme against the platform's standard lending process: Fit / Configure / Custom / Gap, per step
- Data design: to-be data capture points, protected regulatory fields, MI definitions
- Target operating model: to-be RACI, role profiles, spans and layers, organisation impact by role and segment

**Weeks 11–13 – Prove and package**
- Target KPIs with numeric targets tied to the Phase 1 baseline
- Technology enablers with indicative effort (T-shirt sized with the Programme)
- Business case: one-off cost (design, build delta, change), run-rate benefit (capacity by role, cycle time, risk cost avoided), payback, sensitivity; each benefit with a named owner
- Prioritised initiative portfolio: quick wins deliverable on current BLP (e.g. retire dead deal types, remove ESR Cleanse, automated letter chasing) vs. structural changes delivered with the replacement
- Roadmap sequenced to the replacement release plan
- **Process requirements pack** for the Replacement Programme
- Design-authority sign-off pack and SteerCo pack

### 5.2 Deliverables

| # | Deliverable | Format | Owner |
|---|---|---|---|
| 2.1 | Design principles (signed off by Design Authority) | One page | WS1 |
| 2.2 | Journey pattern definitions and deal-type rationalisation decision | Document | WS1 |
| 2.3 | To-be process maps L3/L4 per pattern with E/A/C/R marking against as-is | Visio/BPMN | WS1 |
| 2.4 | Risk-based routing design and eligibility criteria, agreed with Credit Risk | Document + rules table | WS2 |
| 2.5 | Control equivalence assessment, signed off by second-line Risk | Register | WS2 |
| 2.6 | Gap analysis: as-is vs to-be across process, people, policy, technology, data, controls | Matrix | WS1 |
| 2.7 | Fit-gap against the replacement platform's standard process (Fit / Configure / Custom / Gap) | Matrix | WS4 |
| 2.8 | Process requirements pack: journey configuration, business rules catalogue, epic-level user stories, interface requirements (MEO, IMPACS, TELLER, CIF), data requirements | Pack (backlog-ready) | WS4 |
| 2.9 | Target operating model: to-be RACI, role profiles, organisation impact by role | Document | WS5 |
| 2.10 | Data and MI design: capture points, protected regulatory fields, KPI definitions | Document | WS3 |
| 2.11 | Target KPIs with numeric targets vs baseline | Table | WS6 |
| 2.12 | Technology enablers with indicative effort | Register | WS4 |
| 2.13 | Business case with benefit owners and sensitivity | Model + document | WS6 |
| 2.14 | Prioritised initiative portfolio and roadmap | Deck | WS6 |
| 2.15 | Design-authority sign-off pack and SteerCo decision pack | Deck | Engagement Lead |

### 5.3 Gate G2 – SteerCo approves the to-be design and business case; funding released

Pass criteria: Design Authority sign-off including second line on control equivalence; Replacement Programme accepts the requirements pack into its backlog; benefit owners named and signed; roadmap aligned to release plan.

---

## 6. Phase 3 – Plan Delivery and Mobilise Implementation (Weeks 14–17)

**Purpose.** Turn an approved design into a delivery plan that survives contact with the Replacement Programme's schedule and the Bank's change capacity.

### 6.1 Activities
- Detailed implementation roadmap: quick wins on current BLP first; structural changes sequenced to replacement releases
- Transition design: pilot segment (recommend Business Direct – highest volume, lowest complexity, lowest insider-information risk), rollout waves by segment, parallel-run rules
- Change impact assessment per role and segment; training needs analysis; role transition plan
- Policy and procedure updates list (Credit, Operations) with owners
- Benefits realisation plan: KPI definitions, data sources, reporting cadence, baseline freeze
- Delivery governance: delivery RAID, change control, design assurance checkpoints
- Handover of design artefacts to the Replacement Programme's BA and test teams

### 6.2 Deliverables

| # | Deliverable | Format | Owner |
|---|---|---|---|
| 3.1 | Implementation roadmap and integrated plan | Plan | PMO |
| 3.2 | Pilot and rollout plan | Document | WS1, WS5 |
| 3.3 | Change impact assessment and training needs analysis | Register | WS5 |
| 3.4 | Policy and procedure change list | Register | WS2 |
| 3.5 | Benefits realisation plan and KPI dashboard design | Document + dashboard spec | WS6 |
| 3.6 | Delivery governance and design-assurance framework | Document | PMO |
| 3.7 | Design artefact handover to Replacement Programme | Signed handover | WS4 |

### 6.3 Gate G3 – Ready to implement

Pass criteria: pilot scope and date agreed; benefits baseline frozen; change plan accepted by line management; Replacement Programme confirms receipt of artefacts.

---

## 7. Phase 4 – Implement, Embed and Track Benefits (aligned to releases)

**Purpose.** Make sure what is built is what was designed, and that the benefits actually land.

### 7.1 Activities
- Quick-win delivery on current BLP (configuration and procedure changes)
- Design assurance at each replacement release: review of configured journeys against the to-be maps and rules catalogue
- Pilot execution and scale/no-scale decision
- Hypercare support per rollout wave
- Monthly benefits tracking against baseline; variance analysis and corrective actions
- Lessons learned, handover to business owners, closure

### 7.2 Deliverables

| # | Deliverable | Format | Owner |
|---|---|---|---|
| 4.1 | Quick-win delivery report | Report | WS1 |
| 4.2 | Design assurance reports per release | Report | WS4 |
| 4.3 | Pilot evaluation and scale decision pack | Deck | Engagement Lead |
| 4.4 | Monthly benefits tracking report | Dashboard | WS6 |
| 4.5 | Closure report and handover to business owners | Report | Engagement Lead |

---

## 8. Answers to the Bank's questions (RFP §12)

**Q1. Reducing 11 deal types without losing controls.** We separate the *journey* from the *control profile*. The Phase 1 matrix shows which steps are common and which are genuinely type-specific. Patterns carry the common journey; a per-type rules table carries the specific controls (e.g. EPR max 3 then Credit; Shadow Limit Reallocation skips CDQ). Nothing is removed until it appears in the control equivalence register with a replacement or a second-line waiver.

**Q2. Fast-tracking Renewals.** Routing criteria are co-designed with Credit Risk in Phase 2 using Phase 1 data, not proposed from outside. We start from objective flags already available (limit unchanged, risk grade within band, covenant compliance, no watch-list, no recent EPR), quantify the share of renewals that would qualify, and show the risk exposure of that population historically. Credit Risk sets the thresholds; we size the benefit at each threshold so the trade-off is explicit.

**Q3. Deposits.** Keep deposits off the credit workflow (no credit decision is made), but on the same opportunity record and pipeline as lending so RMs and MI see one relationship view. Add two things the current design lacks: a reason code on Declined by Bank / Declined by Customer, and a pricing-exception approval step where a rate is outside the rate card. Whether the opportunity object lives on the replacement platform or in CRM is decided in Phase 0 once the platform's opportunity capability is known.

**Q4. Not paving the cow path.** Four mechanisms: design principles signed before mapping; every as-is step forced into Eliminate / Automate / Consolidate / Retain with a stated reason; fit-to-standard review against the platform before any custom step is accepted; and a workaround inventory so that no bot, batch job or off-platform document is carried over without a decision.

**Q5. Baselining with limited MI.** Triangulate three sources: system timestamps from BLP (stage transitions, even if incomplete); a one-week activity survey across sampled users; and targeted time-and-motion on the top five activities. Where the three disagree we report a range, and the SteerCo endorses the range at G1. This is slower than relying on one source but it is the only baseline that survives challenge at G2.

---

## 9. Team

| Role | Phases | Profile |
|---|---|---|
| Engagement Lead (Partner/Director) | 0–4, part time | Lending transformation, SteerCo-facing |
| Engagement Manager | 0–4, full time | 10+ yrs BPR and credit lifecycle platforms; day-to-day lead |
| BPR / Operating Model Lead (WS1, WS5) | 0–3 | Process design, TOM, change |
| Credit Risk and Controls Specialist (WS2) | 1–3 | Ex-bank credit policy / second line |
| Lending Process SMEs ×2 (WS1) | 1–3 | Business lending origination and servicing |
| Data / MI Analyst (WS3) | 0–4 | Baseline, benefits, data lineage |
| Platform / Integration Analyst (WS4) | 0–4 | Loan origination platforms, fit-gap, requirements |
| Change Lead (WS5) | 2–4 | Change impact, training, adoption |
| PMO Analyst (WS6) | 0–4 | Plan, RAID, gates, benefits tracking |

**Bank commitment (indicative):** Sponsor 2 hrs/week; SteerCo members 2 hrs/fortnight; Design Authority 3 hrs/week in Phase 2; Bank PM and BA full time; SMEs 4–6 hrs/week in Phase 1, 2–4 hrs/week in Phase 2; c. 150 users for the activity survey (1 week).

## 10. Timeline and gates

| Week | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Phase 0 Mobilise | ■ | ■ | | | | | | | | | | | | | | | |
| Phase 1 Discover | | | ■ | ■ | ■ | ■ | ■ | | | | | | | | | | |
| Phase 2 Design | | | | | | | | ■ | ■ | ■ | ■ | ■ | ■ | | | | |
| Phase 3 Plan | | | | | | | | | | | | | | ■ | ■ | ■ | ■ |
| Gates | | G0 | | | | | G1 | | | | | | G2 | | | | G3 |

Phase 4 runs from Week 18 aligned to replacement releases, with monthly benefits reporting.

## 11. Key risks and how we manage them

| Risk | Mitigation |
|---|---|
| Replacement requirements freeze before G2 | Freeze date confirmed at G0; Phase 2 planned backwards from it; interim "design decisions so far" released to the Programme at Week 10 |
| MI extract late or incomplete | Data request issued Week 1; activity survey and time-and-motion provide an independent baseline |
| Credit Risk / second line reject control changes late | Both sit on the Design Authority from Week 2; control equivalence reviewed incrementally, not at the end |
| SME availability (RMs, Credit) | Workshop load agreed with line management at G0; shadowing scheduled around month-end |
| Design drifts toward replicating today's process | Design principles signed before mapping; E/A/C/R marking mandatory; fit-to-standard review |
| Benefits disputed at G2 | Baseline endorsed at G1; benefit owners named in Phase 2, not after |
| Corporate insider-information restrictions limit discovery | Corporate scope depth agreed at G0; Corporate Associates used as proxies; restricted data handled through Bank-side analyst |

## 12. Assumptions

- The replacement platform has been selected, or will be by G1, so that fit-gap in Phase 2 is against a real product
- Existing L3 journey maps are available in editable form in Week 1
- BLP stage-transition timestamps are extractable for the last 12 months
- Bank-side PM and BA are assigned from Week 1
- Phases 3 and 4 are contracted separately after G2
