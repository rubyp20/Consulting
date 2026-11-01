const fs = require('fs'); const path = require('path');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ───────── Pain-point register ─────────
// F = frequency band (1–5), I = impact band (1–5) — indicative pre-validation; E = evidence code(s)
// Waste: W wait · O over-processing · D defect/rework · H hand-off · M motion/navigation · I inventory/WIP · U under-used capability · C control gap · T data/transparency
const PP = [
  // ORIGINATE
  { id: 'PP-01', stmt: 'Leads are unmanaged: no lead register, no SLA from enquiry to first contact, no record of leads that never become deals', l2: '1.1', where: 'NM-1 R0', role: 'RM, BD', waste: 'T', F: 3, I: 3, ev: 'M, I', hyp: '—', note: 'Lost leads and response time invisible' },
  { id: 'PP-02', stmt: 'Initial overview (pre-screen) has no documented criteria and declines at this point are not recorded with a reason', l2: '1.1', where: 'NM-1 D3 (C0)', role: 'RM', waste: 'C', F: 3, I: 3, ev: 'M, C', hyp: '—', note: 'Conduct exposure (RR-07); inconsistency by RM' },
  { id: 'PP-03', stmt: 'The same five-step deal start (login, landing page, search, locate, retrieve) is performed manually on every deal; landing page surfaces no work due', l2: '1.3', where: 'All *-1 S1–S4', role: 'RM, BD, SBS', waste: 'M', F: 5, I: 2, ev: 'M, X', hyp: 'B1', note: 'c. 26,700 repetitions a year' },
  { id: 'PP-04', stmt: 'Renewal is triggered by a report (BDRM), not a system task; renewals start late and lateness is unmeasured', l2: '4.1', where: 'RN-1 S0 (W-11)', role: 'RM, BD', waste: 'W', F: 5, I: 4, ev: 'M, R', hyp: '—', note: '14,857 renewals / yr; T7 to measure' },
  { id: 'PP-05', stmt: 'Any party change diverts a renewal into the Variation journey, so a renewal with a changed guarantor is processed as a restructure', l2: '4.1', where: 'RN-1 D1', role: 'RM', waste: 'O', F: 2, I: 3, ev: 'M', hyp: 'B2', note: 'Share unknown' },
  { id: 'PP-06', stmt: 'Opportunity record adds a step without adding information; source notes deals should be creatable without it', l2: '1.2', where: 'NM-1 S7', role: 'RM', waste: 'O', F: 2, I: 1, ev: 'M', hyp: '—', note: 'New/Increase only' },
  { id: 'PP-07', stmt: 'Existing balances are sourced from MEO / IMPACS with latency; credit submission may carry stale balances', l2: '1.4', where: '*-2 S2 (W-21)', role: 'RM', waste: 'T', F: 5, I: 2, ev: 'M, R', hyp: 'D1', note: 'Latency TBC with Technology' },
  { id: 'PP-08', stmt: 'Deal-type model is worked around: 3 of 11 types carry no live process; allocations recorded as Staged Drawdown + Variation request type; removals recorded as Variation; ESR Cleanse records migration as deals', l2: '1.4', where: '1.3 §5; W-16/17/18/23', role: 'RM, MI', waste: 'T', F: 5, I: 4, ev: 'R, M, X', hyp: 'B3', note: '12.5% of volume is non-customer; MI misclassified' },
  // DECIDE
  { id: 'PP-09', stmt: 'Renewals follow the full Deal & Credit flow (analysis, validation, document check, authority check, Credit assessment) although by definition they involve no structural change', l2: '2.1–2.4', where: 'RN-2 (= NM-2)', role: 'RM, Credit', waste: 'O', F: 5, I: 5, ev: 'M, R, X', hyp: 'A1, A2', note: 'Largest single over-processing item by volume' },
  { id: 'PP-10', stmt: '“Credit analytics if required” on renewals and variations has no stated criterion; application varies by RM', l2: '2.1', where: 'RN-2 R3; VA-2 R3', role: 'RM', waste: 'C', F: 4, I: 3, ev: 'M', hyp: 'E1', note: 'Inconsistent risk coverage' },
  { id: 'PP-11', stmt: 'Credit analytics (debt servicing, classifications, external checks) are prepared off-platform and keyed into BLP; analysis is not evidenced in the system', l2: '2.1', where: '*-2 R3 (W-10, C2)', role: 'RM', waste: 'D', F: 5, I: 3, ev: 'M, C', hyp: 'D1', note: 'Confirm tools in walk-the-process' },
  { id: 'PP-12', stmt: 'Requests to the customer for information are made and chased outside the system; nothing records what was asked, when, or what is outstanding', l2: '2.1', where: '*-2 C1', role: 'RM, customer', waste: 'W', F: 5, I: 3, ev: 'M', hyp: 'C1', note: 'Customer-side wait inside S1' },
  { id: 'PP-13', stmt: 'Deal validation does not catch what Credit needs: deals pass validation and are then deferred for missing information', l2: '2.2', where: '*-2 R4 (C3) → EX-02', role: 'RM, Credit', waste: 'D', F: 4, I: 4, ev: 'M, C', hyp: 'C1', note: 'R1 to measure; root cause of PP-14' },
  { id: 'PP-14', stmt: 'The deferral loop (Credit → RM → customer → Credit) is unbounded: no limit on count or elapsed time, no structured request, no guarantee of the same assessor on resubmission', l2: '2.4', where: 'EX-02', role: 'Credit, RM', waste: 'D', F: 4, I: 4, ev: 'M', hyp: 'C1', note: 'R2, R3 to measure' },
  { id: 'PP-15', stmt: 'Delegated-authority determination is manual: the RM reads the matrix and routes the deal, although limit, exposure and grade are held in BLP', l2: '2.3', where: '*-2 D2 (C5, W-19)', role: 'RM', waste: 'C', F: 5, I: 4, ev: 'M, C', hyp: 'E2', note: 'Breach risk; inconsistency; c. 25,900 / yr' },
  { id: 'PP-16', stmt: 'The Credit queue is invisible: no SLA, no queue position, no visibility for the RM or customer of where a deal is', l2: '2.4', where: '*-2 S4 (S2a)', role: 'Credit, RM', waste: 'W', F: 4, I: 4, ev: 'M', hyp: 'C4', note: 'T4 to measure' },
  { id: 'PP-17', stmt: 'The financial-distress screen sits after full Credit assessment and applies to existing customers only, so distressed cases consume a full review before referral', l2: '2.4 / 5.2', where: '*-2 D3 (C7)', role: 'Credit', waste: 'O', F: 2, I: 4, ev: 'M', hyp: '—', note: 'L10 cycle-time driver' },
  { id: 'PP-18', stmt: 'Variations are not triaged by materiality: a covenant date change and a security restructure follow the same path', l2: '4.2', where: 'VA-2', role: 'RM, Credit', waste: 'O', F: 5, I: 4, ev: 'M, R', hyp: 'A4', note: '7,277 / yr; reason taxonomy to build' },
  { id: 'PP-19', stmt: 'A customer change after approval sends the deal back for re-processing with no materiality rule; minor changes may trigger full re-approval', l2: '2.6', where: 'EX-03 (C22)', role: 'RM, Credit', waste: 'D', F: 2, I: 3, ev: 'M', hyp: 'C3', note: 'R5 to measure' },
  { id: 'PP-20', stmt: 'Decline, appeal and refer have no defined process: reasons may not be recorded, appeal route and “refer” destination are undocumented', l2: '2.5', where: 'EX-01 (C20, C21)', role: 'RM, Credit', waste: 'C', F: 2, I: 4, ev: 'M', hyp: '—', note: 'Conduct and MI exposure' },
  { id: 'PP-21', stmt: 'A CAP referral passes two sequential authorities (Credit, then SBS) each reviewing the same memo before anything changes for the customer', l2: '5.2', where: 'CR-2 D1, D2 (C13, C14)', role: 'Credit, SBS', waste: 'H', F: 2, I: 4, ev: 'M', hyp: '—', note: 'T8 to measure; 794 / yr' },
  { id: 'PP-22', stmt: 'Extension Pending Review is used as a holding pattern: chains of up to three EPRs precede a renewal that happens anyway', l2: '4.1', where: 'RN-3 note', role: 'RM, Credit', waste: 'D', F: 3, I: 3, ev: 'R, M', hyp: 'A3', note: '1,919 EPRs / yr; R6 to measure' },
  // DOCUMENT & FULFIL
  { id: 'PP-23', stmt: 'Facility letters are generated in BLP but issued manually by the RM as a PDF by email or post; sent and returned status is not captured; evidence of issue is an RM mailbox', l2: '3.1', where: '*-3 S2 (W-06)', role: 'RM, Bus Ops', waste: 'D', F: 5, I: 5, ev: 'M, R', hyp: 'C2, D3', note: 'c. 25,000 letters / yr; source states preference to automate' },
  { id: 'PP-24', stmt: 'A facility letter not returned within three months sends the deal back to pre-credit: a full re-approval for a timing failure', l2: '3.1', where: '*-3 C1 → R1', role: 'RM, Credit, customer', waste: 'D', F: 3, I: 5, ev: 'M', hyp: 'C2', note: 'R4 to measure' },
  { id: 'PP-25', stmt: 'Facility letters for Staged Drawdown (confirmed) and Shadow Limit (to confirm) are produced off-platform, so the platform does not hold the agreed terms and the document check cannot reconcile to system data', l2: '3.1 / 4.3', where: 'SL-2, SD-1, SD-2 (W-07/08)', role: 'RM', waste: 'C', F: 1, I: 4, ev: 'M', hyp: 'D2', note: 'Control C4 defeated' },
  { id: 'PP-26', stmt: 'Three completion conditions (letter complete, pre-conditions met, security complete) must converge before fulfilment but there is no single view of which is outstanding', l2: '3.3', where: '*-3 S3–S6 (C9)', role: 'RM', waste: 'T', F: 4, I: 3, ev: 'M', hyp: 'C4', note: 'Pre-conditions is a single flag' },
  { id: 'PP-27', stmt: 'Security preparation is a sub-process box: instruction channel, queue, elapsed time and registration tracking are all invisible', l2: '3.2', where: 'EX-05 (W-13)', role: 'RM, Lending Services', waste: 'W', F: 3, I: 4, ev: 'M', hyp: 'C4', note: 'Likely longest parallel path' },
  { id: 'PP-28', stmt: 'Security is re-instructed to Lending Services on every variation, including those where security does not change (to confirm)', l2: '3.2', where: 'VA-3 R3', role: 'RM, Lending Services', waste: 'O', F: 4, I: 2, ev: 'M', hyp: 'A4', note: 'May be a drawing default' },
  { id: 'PP-29', stmt: 'Hand-off to Fulfilment is by message; the Fulfilment queue and its SLA are invisible in BLP', l2: '3.4', where: '*-3 R5 (W-12)', role: 'RM, Fulfilment', waste: 'H', F: 5, I: 3, ev: 'M', hyp: 'C4', note: 'T6 to measure' },
  { id: 'PP-30', stmt: 'Facility removal needs four messages (to Securities, back; to Fulfilment, back) for one outcome, and the system releases security before the Securities Team confirms physical release', l2: '4.4', where: 'RF-2', role: 'RM, Securities, Fulfilment', waste: 'H', F: 2, I: 3, ev: 'M', hyp: '—', note: 'Sequence to confirm' },
  { id: 'PP-31', stmt: 'A shadow-limit reallocation issues two or more full facility letters (reduced limit plus each new facility), each manually issued and each subject to the 3-month reset', l2: '4.3', where: 'SR-2', role: 'RM', waste: 'O', F: 1, I: 2, ev: 'M', hyp: '—', note: '62 / yr' },
  { id: 'PP-32', stmt: 'Who checks the returned renewal letter depends on segment (RM / Business Ops / Corporate Associate); the only segment variation shown, suggesting others are undocumented', l2: '3.1', where: 'RN-3 R2', role: 'RM, Bus Ops, Corp Assoc', waste: 'T', F: 4, I: 2, ev: 'M', hyp: '—', note: 'WS-14' },
  { id: 'PP-33', stmt: 'Whether a renewal letter must be signed is a decision with no stated rule', l2: '3.1', where: 'RN-3 D1', role: 'RM', waste: 'C', F: 4, I: 2, ev: 'M', hyp: '—', note: 'Rule to extract' },
  // MONITOR & RECOVER
  { id: 'PP-34', stmt: 'The trigger for a CAP referral is undefined: RM judgement, arrears, covenant breach or Credit flag, none systematised; early-warning data in BLP is not used to prompt referral', l2: '5.2', where: 'CR-1 R0', role: 'RM, Credit', waste: 'C', F: 2, I: 5, ev: 'M', hyp: '—', note: 'L10; risk cost' },
  { id: 'PP-35', stmt: 'The CAP Strategy memo is written off-platform and attached; strategy content is unstructured and not reportable', l2: '5.3', where: 'CS-2 B4 (W-09)', role: 'SBS', waste: 'T', F: 2, I: 3, ev: 'M', hyp: 'D2', note: '722 / yr' },
  { id: 'PP-36', stmt: 'Covenant and waiver lifecycle is run by a batch job; no RM task is generated on expiry or breach', l2: '5.1', where: 'W-03', role: 'RM', waste: 'C', F: 3, I: 3, ev: 'R', hyp: 'D1', note: 'No source map for 5.1' },
  { id: 'PP-37', stmt: 'Officer codes are reassigned in bulk by batch with no audit trail on the deal; segment attribution in MI drifts', l2: 'E2.3', where: 'W-04', role: 'MI, SBS', waste: 'T', F: 2, I: 3, ev: 'R', hyp: 'D1, F2', note: 'C26, C27 exposure' },
  // CROSS-CUTTING
  { id: 'PP-38', stmt: 'Deals not progressed in 90 days are reset to origination by batch with no warning to the RM; work is lost and restarts are counted as new deals', l2: '2.6 / E2.1', where: 'W-01', role: 'RM, MI', waste: 'D', F: 3, I: 3, ev: 'R', hyp: 'D1', note: 'R8 to measure' },
  { id: 'PP-39', stmt: 'There are no workflow timers, SLAs or escalations anywhere in the lifecycle; every wait is open-ended and invisible', l2: 'all', where: 'all maps', role: 'all', waste: 'W', F: 5, I: 4, ev: 'M, X', hyp: 'C4', note: 'Root cause of PP-04, 14, 16, 27, 29' },
  { id: 'PP-40', stmt: 'Regulatory reporting lineage from BLP is undocumented at field level and operational MI relies on manual adjustment', l2: 'E2.4', where: '1.8', role: 'MI, Reg Reporting', waste: 'T', F: 2, I: 4, ev: 'R, H', hyp: 'F1, F2', note: 'Redesign risk' },
  { id: 'PP-41', stmt: 'A discontinued deal type (DO NOT USE) remains selectable', l2: 'E2.3', where: 'W-23 (I-02)', role: 'RM', waste: 'C', F: 1, I: 1, ev: 'R', hyp: '—', note: 'Quick win' },
  { id: 'PP-42', stmt: 'Deposit opportunities are closed as Won / Declined with no reason code and no pipeline MI; rate exceptions approved outside BLP', l2: 'E1.1', where: 'DP-1', role: 'RM', waste: 'T', F: 1, I: 2, ev: 'R, M', hyp: '—', note: 'SD-03' },
  { id: 'PP-43', stmt: 'Effort is invisible: BLP records no touch time, so cost to serve, capacity and the effect of any change cannot be measured without a survey', l2: 'E2.4', where: '1.5', role: 'Leadership, Finance', waste: 'T', F: 5, I: 3, ev: 'R', hyp: '—', note: 'Why 1.5 exists' },
];
const wasteName = { W: 'Waiting', O: 'Over-processing', D: 'Defect / rework', H: 'Hand-off', M: 'Motion / navigation', I: 'WIP', U: 'Under-used capability', C: 'Control gap', T: 'Data / transparency gap' };
const evName = { M: 'Current-state maps (1.2)', R: 'RFP / Bank statements', C: 'Control inventory (1.6)', X: 'Deal-type matrix (1.3)', H: 'Hypothesis tree (0.6)', I: 'Sponsor interviews (W1)' };
PP.forEach(p => p.score = p.F * p.I);
const ranked = [...PP].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

// ───────── Root-cause analyses (top 10 themes) ─────────
// bones: Process, Policy & Controls, System, Data, People & Skills, Organisation & Governance
const RCA = [
  { id: 'RC-01', pps: ['PP-09', 'PP-10', 'PP-22'], effect: 'Renewals (48% of live deals) consume full origination-grade decision effort',
    bones: { 'Process': ['One Deal & Credit flow for all types', 'No fast-track route exists for lending (only for pre-approved SR/SD)'], 'Policy & Controls': ['DA matrix application does not distinguish unchanged renewals (to confirm)', '“If required” analytics has no criterion'], 'System': ['Workflow cannot route by risk attributes', 'No rules engine on limit/grade/covenant data'], 'Data': ['Risk grade, covenant status, watch-list exist but are not used for routing'], 'People & Skills': ['RMs default to full submission to avoid deferral', 'Credit assessors receive low-risk cases they add little to'], 'Organisation & Governance': ['No owner for “renewal” as a product of its own', 'EPR used to defer the work rather than to manage risk'] },
    whys: ['Why do renewals take the full path? → Because the workflow has a single Deal & Credit path for every deal type.', 'Why a single path? → Because BLP routes by deal type, not by risk, and deal type “Renewal” was built as a copy of New Money.', 'Why not by risk? → Because no rules engine exists and the DA determination is manual, so routing cannot use data the system holds.', 'Why is the determination manual? → Because the DA matrix is a document and nobody specified it as rules when BLP was configured.', 'Why was it not specified? → Because the original implementation replicated the paper process (“paving the cow path”), which is the risk this project exists to avoid on the replacement.'],
    root: 'Routing is by deal type, not by risk; the delegated-authority policy was never expressed as system rules', levers: 'L1, L3' },
  { id: 'RC-02', pps: ['PP-23', 'PP-24', 'PP-25', 'PP-31', 'PP-33'], effect: 'Facility documentation is the longest stage and the main source of resets',
    bones: { 'Process': ['Letter issued manually by RM outside the workflow', 'Return chased by mailbox; no systematic chase', '3-month rule resets the whole deal, not the letter'], 'Policy & Controls': ['Reset rule is a blunt control for stale approvals', 'No rule for when a signature is needed'], 'System': ['No e-delivery or e-signature', 'No sent/returned status fields', 'Templates cannot handle tranches / shadow limits → off-platform letters'], 'Data': ['Terms for off-platform letters not held in system', 'Letter events (DR-08) coverage unknown'], 'People & Skills': ['RMs carry the admin of issue and chase', 'Checker role differs by segment'], 'Organisation & Governance': ['No SLA between approval and issue, or issue and return', 'No owner for the document process end to end'] },
    whys: ['Why is documentation the longest stage? → Because the customer-side wait for a returned letter is unmanaged.', 'Why unmanaged? → Because once the RM emails the PDF, BLP has no status to track and nothing prompts a chase.', 'Why no status? → Because issue happens outside BLP; the platform generates the letter but cannot deliver or receive it.', 'Why outside? → Because BLP has no delivery or e-signature capability and templates cannot cover all products, so RMs built a manual routine.', 'Why does a late letter reset the deal? → Because the only control against stale approvals is a hard reset, with no intermediate chase or extension step.'],
    root: 'Document delivery and execution were never part of the system process; the only control on staleness is a reset', levers: 'L4' },
  { id: 'RC-03', pps: ['PP-13', 'PP-14', 'PP-12', 'PP-11'], effect: 'Deals loop between Credit and RM for missing information',
    bones: { 'Process': ['Validation checks completeness of fields, not sufficiency for a decision', 'Information requests to customers are ad hoc'], 'Policy & Controls': ['No submission standard by deal type and risk', 'Deferral has no limit or escalation'], 'System': ['Validation rules are generic', 'No structured request/response for deferrals', 'Analytics prepared off-platform, so system cannot check them'], 'Data': ['Customer information captured in emails, not fields'], 'People & Skills': ['Submission quality varies by RM', 'Assessor may change on resubmission'], 'Organisation & Governance': ['Credit and RM teams measure different things (throughput vs. sales)', 'No joint first-time-right measure'] },
    whys: ['Why do deals defer? → Because Credit finds information missing or insufficient after submission.', 'Why after submission? → Because validation (C3) checks that fields are populated, not that the submission meets Credit’s standard for that deal type.', 'Why no standard? → Because the required-items list is tacit knowledge in Credit, not a rule in the system or a checklist for RMs.', 'Why tacit? → Because analytics are prepared off-platform and the system holds only the outputs, so a standard could not be enforced even if written.', 'Why unbounded? → Because the loop was drawn as an arrow, never designed as a path with limits and owners.'],
    root: 'No enforceable submission standard; the deferral loop was never designed, only tolerated', levers: 'L11, L5' },
  { id: 'RC-04', pps: ['PP-15', 'PP-02', 'PP-20', 'PP-19'], effect: 'Decision controls are applied manually and inconsistently',
    bones: { 'Process': ['RM determines authority; RM pre-screens; RM decides materiality of changes'], 'Policy & Controls': ['DA matrix is a document', 'No criteria for pre-screen, appeal or materiality'], 'System': ['No rules engine', 'No decline reason or appeal fields'], 'Data': ['Authority level may not be captured on approval'], 'People & Skills': ['Judgement substitutes for rules; varies by segment and experience'], 'Organisation & Governance': ['Policy owned by Credit Risk; application owned by nobody'] },
    whys: ['Why manual? → Because the policy exists as a document and the system has nowhere to hold it as rules.', 'Why nowhere? → Because BLP’s workflow was configured for statuses, not decisions.', 'Why not changed since? → Because every change to BLP is vendor-supported and costly, and the manual routine “works” until a breach.', 'Why is the gap tolerated? → Because breaches are not reported systematically (no authority field), so the control failure is invisible.', 'Why invisible? → Because evidence of authority is the approver’s name, not a recorded level against a recorded rule.'],
    root: 'Policy lives in documents and judgement, not in system rules with recorded evidence', levers: 'L3, L9' },
  { id: 'RC-05', pps: ['PP-39', 'PP-16', 'PP-29', 'PP-27', 'PP-04'], effect: 'Every wait in the lifecycle is open-ended and invisible',
    bones: { 'Process': ['Hand-offs by message or report; stages end at “ready” with no receiver task'], 'Policy & Controls': ['No SLAs defined between teams'], 'System': ['No timers, escalations, queues or task generation', 'Renewal due dates not surfaced'], 'Data': ['Stage timestamps exist (DR-02) but are not used operationally'], 'People & Skills': ['Teams run their own trackers to compensate'], 'Organisation & Governance': ['Each team optimises its own queue; nobody owns end-to-end cycle time'] },
    whys: ['Why are waits invisible? → Because BLP has no queue or SLA view and hand-offs leave the system.', 'Why do hand-offs leave the system? → Because workflow stages end at the sending team; the receiving team has no task.', 'Why no task? → Because BLP has no cross-team work management; each team compensates with a tracker.', 'Why tolerated? → Because nobody owns end-to-end cycle time; each function reports its own.', 'Why no owner? → Because performance management is by function, and the process has never been measured end to end (1.4 is the first baseline).'],
    root: 'Work management and end-to-end ownership are absent; the system has no concept of time', levers: 'L5, L7 (timers native), L2' },
  { id: 'RC-06', pps: ['PP-08', 'PP-41', 'PP-05'], effect: 'The deal-type model distorts volumes, MI and process routing',
    bones: { 'Process': ['Journeys invented after the types (allocation, removal) have no type', 'Party changes force a type change'], 'Policy & Controls': ['Type carries controls implicitly (EPR caps, SR routing)'], 'System': ['Type is the only routing key', 'Pick list not maintained'], 'Data': ['12.5% of deals are migration records', 'MI keyed on type is misclassified'], 'People & Skills': ['RMs combine fields to express what the model lacks'], 'Organisation & Governance': ['No owner for the deal-type reference data'] },
    whys: ['Why are types worked around? → Because the model was fixed at implementation and journeys evolved.', 'Why not extended? → Because adding a type is a vendor change; combining fields is free.', 'Why does it matter? → Because type drives routing, controls and MI, so a workaround in one distorts all three.', 'Why 11 types? → Because each business event got its own type rather than a parameter on a pattern.', 'Why? → Because nobody separated journey (what happens) from controls (what must be true), which 1.3 now does.'],
    root: 'Journey and control were conflated into a rigid type model with no owner', levers: 'L12, L6' },
  { id: 'RC-07', pps: ['PP-18', 'PP-28', 'PP-30'], effect: 'Servicing changes are processed at the weight of the heaviest case',
    bones: { 'Process': ['One Variation path for all change types', 'Security re-instructed by default'], 'Policy & Controls': ['No materiality definition for variations'], 'System': ['No variation reason code to route on'], 'Data': ['Reason not captured; mix unknown'], 'People & Skills': ['RMs cannot tell which variations Credit will accept lightly'], 'Organisation & Governance': ['Credit sets no tiered standard for administrative changes'] },
    whys: ['Why the same path? → Because “Variation” is one deal type and routing is by type.', 'Why no triage? → Because no reason code is captured, so nothing can distinguish an admin change from a restructure.', 'Why no reason code? → Because it was never needed for the workflow, only for MI, and MI did not drive the design.', 'Why does security get re-instructed? → Because the completion template includes it and nobody removes a step that might be needed.', 'Why keep steps that might be needed? → Because the cost of a missed step is visible and the cost of an unnecessary one is not (PP-43).'],
    root: 'No materiality concept; unnecessary steps are invisible while missed steps are not', levers: 'L5, L8' },
  { id: 'RC-08', pps: ['PP-34', 'PP-17', 'PP-21', 'PP-35'], effect: 'Distress is identified late and handled by two sequential authorities',
    bones: { 'Process': ['Distress screen after full assessment', 'Credit then SBS review the same memo'], 'Policy & Controls': ['CAP policy requires Credit authority before SBS (to confirm whether triggers could bypass)'], 'System': ['Early-warning flags not surfaced at deal creation', 'Memo off-platform'], 'Data': ['Arrears, grade migration, covenant breach exist but are not combined'], 'People & Skills': ['Referral depends on RM judgement and willingness'], 'Organisation & Governance': ['Two authorities protect two budgets; no shared cycle-time target'] },
    whys: ['Why late? → Because the screen is a Credit step at the end of assessment, not a system flag at the start.', 'Why at the end? → Because it was placed where Credit sees the file, not where data could trigger it.', 'Why two authorities? → Because CAP policy separates the decision to refer from the decision to categorise.', 'Why sequential on the same memo? → Because the workflow transfers the whole deal rather than a referral record, so each authority re-reads it.', 'Why unchanged? → Because the volume (1,516) is small enough that the cost is tolerated, but the risk cost of late referral is not measured.'],
    root: 'Distress handling is file-driven and sequential rather than data-driven and parallel', levers: 'L10' },
  { id: 'RC-09', pps: ['PP-03', 'PP-07', 'PP-06'], effect: 'Every deal begins with repeated manual navigation and lookup',
    bones: { 'Process': ['Deal start is five steps on every journey', 'Opportunity step adds nothing on existing deals'], 'Policy & Controls': ['—'], 'System': ['Separate login; landing page static', 'Balances via other front ends', 'No context carried from trigger to deal'], 'Data': ['Customer and deal context known to the system before the RM logs in'], 'People & Skills': ['Treated as “just how it works”'], 'Organisation & Governance': ['Low per-event cost means it is never prioritised'] },
    whys: ['Why repeated? → Because every journey begins at the same generic entry point regardless of trigger.', 'Why generic? → Because the trigger (renewal due, customer request) is not a system event, so the system cannot open the deal in context.', 'Why not an event? → Because triggers are reports and emails (PP-04, PP-01).', 'Why tolerated? → Because each repetition costs minutes, and minutes × 26,700 is nobody’s budget line.', 'Why nobody’s? → Because effort is unmeasured (PP-43).'],
    root: 'Triggers are not system events, so no context flows into the deal start', levers: 'L2' },
  { id: 'RC-10', pps: ['PP-40', 'PP-37', 'PP-43', 'PP-42'], effect: 'The process cannot be measured or safely changed because its data is undocumented',
    bones: { 'Process': ['MI adjusted manually after extract'], 'Policy & Controls': ['Protected fields not defined'], 'System': ['No effort capture; batch updates outside audit'], 'Data': ['Lineage in scripts and heads', 'Type misclassification feeds MI'], 'People & Skills': ['Knowledge concentrated in MI team'], 'Organisation & Governance': ['No data owner for lending process data'] },
    whys: ['Why undocumented? → Because reports were built incrementally on extracts, not designed from a data model.', 'Why incrementally? → Because each regulatory change was met with a script change, under time pressure.', 'Why does it matter now? → Because the redesign and replacement will change capture points, and nobody can say which reports break.', 'Why nobody? → Because ownership sits with MI for the extract and with the business for the field, and neither owns the lineage.', 'Why no owner? → Because data ownership was never assigned for BLP; the replacement is the moment to assign it.'],
    root: 'No data ownership or lineage; measurement was never designed in', levers: 'L14, L15' },
];

// ───────── Renderers ─────────
function fishbone(r) {
  const W = 760, H = 330, spineY = 170, headX = 600;
  const names = Object.keys(r.bones); // 6
  const top = names.slice(0, 3), bot = names.slice(3);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" font-family="Arial, Helvetica, sans-serif">`;
  s += `<line x1="30" y1="${spineY}" x2="${headX}" y2="${spineY}" stroke="#0b3d6b" stroke-width="2"/>`;
  s += `<rect x="${headX}" y="${spineY - 34}" width="150" height="68" rx="3" fill="#0b3d6b"/>`;
  const el = wrapText(r.effect, 24); el.forEach((t, i) => s += `<text x="${headX + 75}" y="${spineY - (el.length - 1) * 5 + i * 10 + 3}" text-anchor="middle" font-size="7.6" fill="#fff" font-weight="bold">${esc(t)}</text>`);
  const drawBone = (name, causes, x, up) => {
    const yEnd = up ? 26 : H - 22; const xTop = x - 60;
    s += `<line x1="${x}" y1="${spineY}" x2="${xTop}" y2="${yEnd}" stroke="#1f4f82" stroke-width="1.2"/>`;
    s += `<rect x="${xTop - 52}" y="${up ? yEnd - 14 : yEnd - 2}" width="104" height="14" fill="#e6edf5" stroke="#1f4f82" stroke-width="0.8"/>`;
    s += `<text x="${xTop}" y="${up ? yEnd - 4 : yEnd + 8}" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0b3d6b">${esc(name)}</text>`;
    causes.forEach((c, i) => {
      const t = up ? spineY - 22 - (causes.length - 1 - i) * 36 : spineY + 14 + i * 36; // y position along bone region
      const frac = up ? (spineY - t) / (spineY - yEnd) : (t - spineY) / (yEnd - spineY);
      const bx = x - 60 * frac; const by = t;
      s += `<line x1="${bx}" y1="${by}" x2="${bx - 70}" y2="${by}" stroke="#8aa2bd" stroke-width="0.9"/>`;
      const lines = wrapText(c, 26); lines.forEach((ln, k) => s += `<text x="${bx - 72}" y="${up ? by - 2 - (lines.length - 1 - k) * 9.5 : by + 9 + k * 9.5}" text-anchor="end" font-size="7.6" fill="#333">${esc(ln)}</text>`);
    });
  };
  top.forEach((n, i) => drawBone(n, r.bones[n], 200 + i * 190, true));
  bot.forEach((n, i) => drawBone(n, r.bones[n], 200 + i * 190, false));
  s += `</svg>`; return s;
}
function wrapText(text, max) { const w = text.split(' '); const out = []; let cur = ''; for (const x of w) { if ((cur + ' ' + x).trim().length > max) { if (cur) out.push(cur); cur = x; } else cur = (cur + ' ' + x).trim(); } if (cur) out.push(cur); return out; }

// ───────── Document ─────────
let h = [];
h.push(`<!doctype html><html><head><meta charset="utf-8"><title>1.9 Pain-Point Register and Root-Cause Analysis</title><link rel="stylesheet" href="build/style.css"><style>
.reg th, .reg td { font-size: 7.3pt; padding: 1pt 3pt; }
.heat td { text-align: center; font-size: 8pt; }
.h0 { background: #fff; } .h1 { background: #e6edf5; } .h2 { background: #c9d6e5; } .h3 { background: #8aa2bd; color: #fff; } .h4 { background: #1f4f82; color: #fff; }
.rca { border: 1px solid #b8c4d0; padding: 6pt; margin: 4pt 0 8pt 0; }
.q { background: #f4f6f8; border-left: 3px solid #0b3d6b; padding: 4pt 8pt; margin: 4pt 0; font-size: 8.6pt; }
ol.whys li { margin-bottom: 3pt; }
</style></head><body>`);

h.push(`<div class="cover"><p class="small" style="letter-spacing:1px;text-transform:uppercase">Business Bank · Business Banking Transformation Office · BB-BLP-BPR</p>
<h1>1.9 Pain-Point Register and Root-Cause Analysis<br/><span style="font-size:15pt;color:#1f4f82">What is wrong, how we found it, how often it happens, and why</span></h1>
<table class="meta" style="width:65%;margin-top:20pt"><tr><td>Deliverable</td><td>1.9 Pain-point register tagged to process, with root-cause analysis on the top ten themes</td></tr><tr><td>Version</td><td>0.7 – ${PP.length} pain points identified from the current-state maps, RFP, control and workaround inventories (Week 3); frequency and impact bands indicative. Scores confirmed in workshops WS-02 to WS-14, interviews and survey free text; measured frequencies from 1.4 → v1.0 at Week 7</td></tr>
<tr><td>Source</td><td>1.2 maps (observations); 1.3 matrix; 1.6 control failure modes; 1.7 workaround risks; 1.8 data risks; RFP; sponsor interviews W1; hypothesis tree 0.6</td></tr><tr><td>Owner</td><td>WS1 Journeys &amp; Process (BPR/TOM Lead)</td></tr><tr><td>Accepted by</td><td>Business Owner; reviewed by working-group leads</td></tr>
<tr><td>Feeds</td><td>1.10 opportunity long-list (one or more opportunities per root cause); 1.11 current-state report; Phase 2 design principles</td></tr></table></div>`);

// ── Section 1: approach
h.push(`<div class="pb"><h1>1. How the pain points were found</h1>
<p>A pain-point register is only as good as the method that produced it. Two failure modes are common: a list of complaints collected in workshops (loud, not representative) or a list of system defects (technical, not business). We used a structured approach with five sources, three lenses and a fixed question bank, so that every entry can be traced to where it came from and why it qualifies.</p>
<h2>1.1 Sources and sequence</h2>
<table><tr><th>#</th><th>Source</th><th>When</th><th>What it contributes</th><th>Bias it carries</th><th>Corrected by</th></tr>
<tr><td>S1</td><td>Hypothesis tree (0.6)</td><td>W1–2</td><td>Where to look: 20 falsifiable claims about what is wrong</td><td>Confirmation bias: we find what we look for</td><td>Lens 3 (data) and workshop prompts that invite disconfirmation</td></tr>
<tr><td>S2</td><td>Current-state maps, read against three lenses (§1.2)</td><td>W3</td><td>Structural pain points visible in the process itself: loops, hand-offs, manual steps, missing paths</td><td>Maps show design intent, not practice</td><td>Walk-the-process and workshops</td></tr>
<tr><td>S3</td><td>Control and workaround inventories (1.6, 1.7)</td><td>W3</td><td>Failure modes of controls; gaps that workarounds cover</td><td>Technical framing</td><td>Impact scored in business terms</td></tr>
<tr><td>S4</td><td>Voice of business: interviews (15–20), workshops (14), shadowing (5 days), survey free text (“biggest time-waster today”)</td><td>W3–6</td><td>Frequency, impact, practice vs. design, pain points not visible in maps</td><td>Loudest voice; recency; functional view</td><td>Fixed question bank; every pain point tagged to L2 and step; triangulated across roles</td></tr>
<tr><td>S5</td><td>Measurement (1.4, 1.5)</td><td>W5–7</td><td>Measured frequency and cost for pain points with a metric</td><td>Only measures what is captured</td><td>Register flags unmeasurable items explicitly</td></tr></table>
<p>At v0.7 the register rests on S1–S3. The frequency and impact bands are therefore <i>indicative</i>: derived from RFP volumes and the position of the step in the flow, not from testimony or measurement. S4 and S5 convert them to confirmed bands and, where a metric exists, to numbers.</p>

<h2>1.2 Three lenses applied to every map</h2>
<p>Each of the 28 maps was read three times, once per lens, with a fixed set of questions. A pain point is recorded only if at least one question is answered “yes” with a specific step reference.</p>
<table><tr><th>Lens</th><th>Looks for</th><th>Questions asked of every map</th><th>Waste codes</th></tr>
<tr><td><b>1. Flow</b> (lean, adapted to lending)</td><td>Waste in the sequence of work</td><td>Where does the deal wait, and on whom? · Which steps are performed on every deal regardless of risk or change? · Where does work leave the system (email, message, report, spreadsheet)? · Where does the deal loop back, and is the loop bounded? · Which steps are repeated across journeys? · Where is work handed between teams, and what does the receiver see?</td><td>W, O, D, H, M, I</td></tr>
<tr><td><b>2. Control</b></td><td>Controls that are weak, undocumented, misplaced or defeated</td><td>What is this step protecting against, and is that written anywhere? · Is the control performed on data the system already holds? · Is it placed where it can act earliest? · Can it be defeated by a workaround (off-platform document, field combination)? · Is a decision made without a documented criterion? · Is the outcome recorded with a reason?</td><td>C</td></tr>
<tr><td><b>3. Data and transparency</b></td><td>What cannot be seen, measured or trusted</td><td>Can management see where this deal is and how long it has been there? · Is the field captured once, at source, in a structured form? · Would a report keyed on this field be correct? · Is effort or elapsed time measurable at this step? · Is there a reason code where a decision is recorded?</td><td>T, U</td></tr></table>

<h2>1.3 Qualification rule</h2>
<p>An observation becomes a pain point only if it meets all three tests: (a) it is tied to a specific process step or rule, not a general complaint; (b) it has a plausible business consequence in at least one of five dimensions (cycle time, cost/effort, risk/control, customer experience, colleague experience); (c) it is distinguishable from a preference (“I would like a different screen layout” fails; “the landing page shows no work due so renewals start late” passes).</p>
<h2>1.4 Scoring</h2>
<table><tr><th>Dimension</th><th>Band 1</th><th>Band 2</th><th>Band 3</th><th>Band 4</th><th>Band 5</th></tr>
<tr><td><b>Frequency</b> (deals or events affected per year)</td><td>&lt; 100</td><td>100–1,000</td><td>1,000–5,000</td><td>5,000–15,000</td><td>&gt; 15,000 or every deal</td></tr>
<tr><td><b>Impact</b> (worst of the five dimensions)</td><td>Minutes; cosmetic</td><td>Hours of effort or days of delay; no risk</td><td>Days of delay or material effort; or MI distortion</td><td>Weeks of delay, rework of a stage, or control weakness</td><td>Re-approval, regulatory or conduct exposure, or customer loss</td></tr></table>
<p>Score = Frequency × Impact (1–25). Evidence strength is recorded separately and does not change the score; it determines how much validation the item needs. Scores are a ranking device for choosing root-cause themes, not a benefits estimate; sizing happens in 1.10.</p></div>`);

// ── Section 1.5: question bank
h.push(`<div class="pb"><h1>2. Question bank used in discovery</h1>
<p>The same questions were put to every role, in the same order, so that answers can be compared across RM, Credit, Lending Services, Fulfilment and SBS. Role-specific probes follow the core set. Interviewers record the step reference for every answer; an answer without a step reference goes to the parking lot.</p>
<h2>2.1 Voice-of-business interview guide (45 min)</h2>
<div class="q"><b>Opening (5 min).</b> Your role, segment, how many deals you touch in a typical week, which deal types.</div>
<div class="q"><b>Walk a deal (15 min).</b> Take the last renewal [variation / new money] you completed. From the moment you knew it was needed to the moment the customer could use the facility: what happened, in order? Where did it wait, and on whom? What did you do outside BLP? What did you have to do twice?</div>
<div class="q"><b>Time (10 min).</b> Of your working week, roughly what share is on: new business, renewals and variations, chasing (customers, Credit, other teams), system admin and re-keying, customer relationship time not tied to a deal? What would you stop doing tomorrow if you could?</div>
<div class="q"><b>Controls (5 min).</b> Which checks do you perform because policy requires them, and which because “that’s how it’s done”? Have you ever been unsure whether a deal was within your authority? What happens when a customer changes their mind after approval?</div>
<div class="q"><b>Failure (5 min).</b> Think of a deal that went wrong or took far too long. What happened? What would have prevented it?</div>
<div class="q"><b>Close (5 min).</b> If the new platform could do one thing BLP cannot, what would it be? Who else should we speak to?</div>
<h2>2.2 Role-specific probes</h2>
<table><tr><th>Role</th><th>Probes</th><th>Targets</th></tr>
<tr><td>RM / Business Direct</td><td>How do you know a renewal is due? How do you issue a facility letter and know it has come back? What does Credit most often send back, and why? Which variations do you know Credit will wave through?</td><td>PP-04, 23, 13, 18</td></tr>
<tr><td>Credit</td><td>What share of your queue is renewals with no change? What is missing from submissions most often? Do you see the same deal again after deferral? How do you spot distress?</td><td>PP-09, 13, 14, 17</td></tr>
<tr><td>Lending Services / Securities</td><td>How does an instruction reach you? How long from instruction to complete, by security type? Where do you record progress? Is security re-instructed when nothing has changed?</td><td>PP-27, 28, 30</td></tr>
<tr><td>Fulfilment</td><td>How do you know a deal is ready? How many are waiting now, and how do you know? What arrives incomplete?</td><td>PP-29, 26</td></tr>
<tr><td>SBS / PS</td><td>What triggers a referral? How long from referral to categorisation? What do you re-read that Credit already read? Where is the strategy memo written?</td><td>PP-34, 21, 35</td></tr>
<tr><td>MI / Reg Reporting</td><td>Which reports take BLP data? What do you correct by hand each cycle, and why? What breaks when a deal type is used wrongly?</td><td>PP-40, 08, 37</td></tr></table>
<h2>2.3 Workshop prompts (per map, after walk-through)</h2>
<ol><li>Is this what actually happens? Where does practice differ from the map?</li><li>Point to every place the deal waits. On whom? For how long, typically and at worst?</li><li>Which steps would you remove if Credit Risk let you? Which would Credit Risk never let you remove, and why?</li><li>Where does work leave BLP? (email, Word, Excel, phone, another system)</li><li>What is the most common reason this journey restarts or loops?</li><li>What differs by segment (Business Direct / Strategic Finance / Corporate)?</li><li>What is missing from this map altogether?</li></ol>
<h2>2.4 Shadowing observation checklist (per observed instance)</h2>
<p>Step performed · system or tool used · start and stop time · interruptions · re-keying observed (from where to where) · documents produced outside the system · hand-off method · what the person said they were waiting for · deviation from the map.</p>
<h2>2.5 Survey free text</h2>
<p>One line per respondent per day: “Biggest time-waster today.” Coded to L2 and waste type in Week 6; counts by role feed frequency bands.</p></div>`);

// ── Section 3: register
h.push(`<div class="pb wide"><h1>3. Pain-point register (v0.7)</h1>
<p class="small">F = frequency band · I = impact band · Score = F × I (indicative, pre-validation) · Ev: M maps · R RFP · C controls · X matrix · H hypothesis tree · I interviews W1 · Waste: see §1.2</p>
<table class="reg"><tr><th style="width:4%">ID</th><th style="width:32%">Pain point</th><th style="width:5%">L2</th><th style="width:10%">Where</th><th style="width:8%">Roles</th><th style="width:7%">Waste</th><th style="width:3%">F</th><th style="width:3%">I</th><th style="width:4%">Score</th><th style="width:5%">Ev</th><th style="width:5%">Hyp.</th><th>Note / measure</th></tr>`);
let lastGroup = '';
for (const p of PP) {
  const g = p.id <= 'PP-08' ? 'ORIGINATE' : p.id <= 'PP-22' ? 'DECIDE' : p.id <= 'PP-33' ? 'DOCUMENT & FULFIL' : p.id <= 'PP-37' ? 'MONITOR & RECOVER' : 'CROSS-CUTTING';
  if (g !== lastGroup) { h.push(`<tr class="l1"><td colspan="12">${g}</td></tr>`); lastGroup = g; }
  h.push(`<tr><td><b>${p.id}</b></td><td>${esc(p.stmt)}</td><td>${p.l2}</td><td>${esc(p.where)}</td><td>${esc(p.role)}</td><td>${wasteName[p.waste]}</td><td class="c">${p.F}</td><td class="c">${p.I}</td><td class="c"><b>${p.score}</b></td><td>${p.ev}</td><td>${p.hyp}</td><td>${esc(p.note)}</td></tr>`);
}
h.push(`</table></div>`);

// ── Section 4: prioritisation
const top = ranked.slice(0, 15);
const l2groups = ['1.x Originate', '2.x Decide', '3.x Document & Fulfil', '4.x Service', '5.x Monitor & Recover', 'E Enabling / all'];
const l2of = p => p.l2.startsWith('1') ? 0 : p.l2.startsWith('2') ? 1 : p.l2.startsWith('3') ? 2 : p.l2.startsWith('4') ? 3 : p.l2.startsWith('5') ? 4 : 5;
const wastes = ['W', 'O', 'D', 'H', 'M', 'C', 'T'];
const heat = l2groups.map((_, gi) => wastes.map(w => PP.filter(p => l2of(p) === gi && p.waste === w).reduce((a, p) => a + p.score, 0)));
const hc = v => v === 0 ? 'h0' : v < 15 ? 'h1' : v < 30 ? 'h2' : v < 50 ? 'h3' : 'h4';
const total = PP.reduce((a, p) => a + p.score, 0); let cum = 0;
h.push(`<div class="pb"><h1>4. Prioritisation</h1>
<h2>4.1 Top 15 by indicative score</h2>
<table><tr><th>Rank</th><th>ID</th><th>Pain point (short)</th><th>F</th><th>I</th><th>Score</th><th>Cum. share</th><th>RCA theme</th></tr>`);
top.forEach((p, i) => { cum += p.score; const rc = RCA.find(r => r.pps.includes(p.id)); h.push(`<tr><td class="c">${i + 1}</td><td><b>${p.id}</b></td><td>${esc(p.stmt.split(':')[0].split(';')[0].slice(0, 110))}${p.stmt.length > 110 ? '…' : ''}</td><td class="c">${p.F}</td><td class="c">${p.I}</td><td class="c"><b>${p.score}</b></td><td class="num">${Math.round(100 * cum / total)}%</td><td>${rc ? rc.id : '—'}</td></tr>`); });
h.push(`</table><p>The top 15 of ${PP.length} pain points carry ${Math.round(100 * cum / total)}% of the total indicative score. All fifteen fall within the ten root-cause themes in section 5; no high-scoring pain point is an orphan.</p>
<h2>4.2 Heat map: score by lifecycle stage × waste type</h2>
<table class="heat"><tr><th>Stage</th>${wastes.map(w => `<th>${wasteName[w]}</th>`).join('')}<th>Total</th></tr>`);
l2groups.forEach((g, gi) => h.push(`<tr><td style="text-align:left"><b>${g}</b></td>${heat[gi].map(v => `<td class="${hc(v)}">${v || ''}</td>`).join('')}<td><b>${heat[gi].reduce((a, b) => a + b, 0)}</b></td></tr>`));
h.push(`<tr><td style="text-align:left"><b>Total</b></td>${wastes.map((_, wi) => `<td><b>${heat.reduce((a, r) => a + r[wi], 0)}</b></td>`).join('')}<td><b>${total}</b></td></tr></table>
<p><b>Reading the heat map.</b> The weight sits in Decide (over-processing and rework) and Document &amp; Fulfil (rework and waiting). Control gaps are spread across every stage, which is why 1.6 is a Phase 2 gating document rather than a side register. The Service row is light only because servicing pain points are tagged to the Decide and Document processes they pass through; by journey, Renewal and Variation carry the majority of every column.</p>
<h2>4.3 Score by role most affected</h2>
<table><tr><th>Role</th><th>Pain points</th><th>Sum of scores</th><th>Largest</th></tr>`);
const roles = ['RM', 'Credit', 'Lending Services', 'Fulfilment', 'SBS', 'MI'];
roles.forEach(r => { const ps = PP.filter(p => p.role.includes(r)); const sum = ps.reduce((a, p) => a + p.score, 0); const big = [...ps].sort((a, b) => b.score - a.score)[0]; h.push(`<tr><td>${r}</td><td class="num">${ps.length}</td><td class="num">${sum}</td><td>${big ? big.id : ''}</td></tr>`); });
h.push(`</table></div>`);

// ── Section 5: RCA
h.push(`<div class="pb"><h1>5. Root-cause analysis</h1>
<p>Ten themes cover the top-scoring pain points. For each: the effect (the pain as the business experiences it), a cause-and-effect (fishbone) diagram on six bones adapted to a bank process, a five-whys chain to the root, the root cause stated in one line, and the levers in the benefits tree (0.9) that address it.</p>
<table><tr><th>Bone</th><th>Meaning in a lending process</th></tr>
<tr><td>Process</td><td>Sequence, steps, loops, hand-offs as designed and as practised</td></tr>
<tr><td>Policy &amp; Controls</td><td>Credit policy, delegated authority, control requirements and how they are expressed</td></tr>
<tr><td>System</td><td>BLP capability and configuration; integrations; workarounds</td></tr>
<tr><td>Data</td><td>What is captured, where, in what form; what is missing or wrong</td></tr>
<tr><td>People &amp; Skills</td><td>Judgement, habit, capability, incentives at the individual level</td></tr>
<tr><td>Organisation &amp; Governance</td><td>Ownership, measurement, team boundaries, decision rights</td></tr></table>
<p><b>Rule for the five whys:</b> stop when the answer is something the project can change or must explicitly accept, not before. Several chains end at the same place (effort is unmeasured; policy lives in documents; the system has no concept of time), which is the point: fewer root causes than pain points.</p></div>`);
for (const r of RCA) {
  const pps = r.pps.map(id => PP.find(p => p.id === id));
  h.push(`<div class="pb"><h1>${r.id} · ${esc(r.effect)}</h1>
<table><tr><th style="width:12%">Pain points</th><td>${pps.map(p => `<b>${p.id}</b> (${p.score}) ${esc(p.stmt.slice(0, 90))}…`).join('<br/>')}</td></tr>
<tr><th>Combined score</th><td>${pps.reduce((a, p) => a + p.score, 0)}</td></tr></table>
<div class="rca">${fishbone(r)}</div>
<div class="two"><div><h3>Five whys</h3><ol class="whys">${r.whys.map(w => `<li>${esc(w)}</li>`).join('')}</ol></div>
<div><h3>Root cause</h3><p class="q"><b>${esc(r.root)}</b></p><h3>Levers (0.9)</h3><p>${esc(r.levers)}</p><h3>Validation</h3><p>Fishbone causes marked for confirmation in the workshop that owns the pain points’ maps; the five-whys chain is re-run with Bank participants. A theme is confirmed when at least two roles independently agree the root cause.</p></div></div></div>`);
}

// ── Section 6: consolidation
h.push(`<div class="pb"><h1>6. Root-cause consolidation</h1>
<p>Ten themes resolve to six underlying causes. These are the design problems Phase 2 must solve; the pain points are their symptoms.</p>
<table><tr><th>Underlying cause</th><th>Themes</th><th>Pain points (count)</th><th>Design principle it implies (for Week 8)</th><th>Levers</th></tr>
<tr><td><b>U1. Routing by deal type, not by risk or materiality</b></td><td>RC-01, RC-06, RC-07</td><td class="num">${[...new Set([...RCA[0].pps, ...RCA[5].pps, ...RCA[6].pps])].length}</td><td>Route by risk and change materiality; deal type becomes a parameter on a pattern</td><td>L1, L5, L12</td></tr>
<tr><td><b>U2. Policy lives in documents and judgement, not in rules with evidence</b></td><td>RC-04, RC-01</td><td class="num">${[...new Set([...RCA[3].pps, ...RCA[0].pps])].length}</td><td>Every control expressed as a rule the system applies and records; no control without equivalence</td><td>L3, L9</td></tr>
<tr><td><b>U3. The system has no concept of time, queues or hand-offs</b></td><td>RC-05, RC-09</td><td class="num">${[...new Set([...RCA[4].pps, ...RCA[8].pps])].length}</td><td>Every wait has an owner, a timer and a task; triggers are system events</td><td>L2, L5, L7</td></tr>
<tr><td><b>U4. Documents and information requests live outside the system</b></td><td>RC-02, RC-03</td><td class="num">${[...new Set([...RCA[1].pps, ...RCA[2].pps])].length}</td><td>Generate, deliver, receive and evidence on platform; structured requests with limits</td><td>L4, L11</td></tr>
<tr><td><b>U5. Distress handling is file-driven and sequential</b></td><td>RC-08</td><td class="num">${RCA[7].pps.length}</td><td>Data-driven early warning; referral as a record, not a file transfer</td><td>L10</td></tr>
<tr><td><b>U6. Nobody owns the data or the end-to-end measure</b></td><td>RC-10, RC-05</td><td class="num">${[...new Set([...RCA[9].pps, ...RCA[4].pps])].length}</td><td>Named data owners; capture once; lineage maintained; cycle time and effort measured end to end</td><td>L14, L15</td></tr></table>
<h2>6.1 Cause–effect matrix (which cause drives which top pain point)</h2>
<table><tr><th>Pain point</th><th>U1</th><th>U2</th><th>U3</th><th>U4</th><th>U5</th><th>U6</th></tr>`);
const ce = { 'PP-09': 'U1 U2', 'PP-23': 'U4', 'PP-08': 'U1 U6', 'PP-04': 'U3', 'PP-15': 'U2', 'PP-18': 'U1', 'PP-39': 'U3 U6', 'PP-13': 'U4 U2', 'PP-14': 'U4 U3', 'PP-16': 'U3', 'PP-24': 'U4 U2', 'PP-11': 'U4', 'PP-29': 'U3', 'PP-12': 'U4 U3', 'PP-43': 'U6' };
for (const p of top) { const m = ce[p.id] || ''; h.push(`<tr><td><b>${p.id}</b> ${esc(p.stmt.slice(0, 70))}…</td>${['U1', 'U2', 'U3', 'U4', 'U5', 'U6'].map(u => `<td class="c">${m.includes(u) ? '●' : ''}</td>`).join('')}</tr>`); }
h.push(`</table>
<p>Every top-15 pain point is driven by at least one underlying cause, and U1–U4 between them cover fourteen of the fifteen. This is the case for a small number of structural design decisions in Phase 2 rather than a long list of point fixes.</p></div>`);

// ── Section 7: validation plan
h.push(`<div class="pb"><h1>7. Validation to v1.0 and hypothesis linkage</h1>
<table><tr><th>Week</th><th>Activity</th><th>Converts</th></tr>
<tr><td>3–5</td><td>Workshops WS-02 to WS-11: each map’s pain points confirmed, corrected or struck; new ones added with step references</td><td>Evidence M → M+W; new entries</td></tr>
<tr><td>3–5</td><td>Interviews (15–20) using §2.1; answers coded to pain points</td><td>Frequency and impact bands from indicative to testimonial</td></tr>
<tr><td>4–5</td><td>Shadowing (5 days) using §2.4 checklist</td><td>Practice vs. design; off-platform work confirmed (PP-11, 23, 27)</td></tr>
<tr><td>5–6</td><td>Survey free text coded</td><td>Frequency by role</td></tr>
<tr><td>5–7</td><td>1.4 metrics attached: T4 (PP-16), T5/R4 (PP-23/24), R1–R3 (PP-13/14), R6 (PP-22), T7 (PP-04), T8 (PP-21), R5 (PP-19), R8 (PP-38)</td><td>Bands to measured values where a metric exists</td></tr>
<tr><td>6</td><td>Root-cause themes re-run with Bank participants (WS-13 for control themes; WG leads for others)</td><td>RC confirmed / amended</td></tr>
<tr><td>7</td><td>Register frozen; feeds 1.10 and 1.11</td><td>v1.0</td></tr></table>
<h2>7.1 What the register says about the hypotheses (pre-validation)</h2>
<table><tr><th>Hypothesis</th><th>Pain points</th><th>Position at v0.7</th></tr>
<tr><td>A1 Renewals follow full flow</td><td>PP-09</td><td>Structurally confirmed by maps; share to measure</td></tr>
<tr><td>A3 EPR chains</td><td>PP-22</td><td>Mechanism confirmed; frequency to measure</td></tr>
<tr><td>A4 Variations heterogeneous</td><td>PP-18</td><td>Absence of triage confirmed; mix to measure</td></tr>
<tr><td>B1, B2, B3 Deal-type model</td><td>PP-03, PP-08, PP-05</td><td>Supported by 1.3</td></tr>
<tr><td>C1 Deferral loop</td><td>PP-12, 13, 14</td><td>Mechanism confirmed; rate to measure</td></tr>
<tr><td>C2 Letters</td><td>PP-23, 24, 25, 31</td><td>Mechanism confirmed; reset rate to measure</td></tr>
<tr><td>C3 Post-approval change</td><td>PP-19</td><td>Path undefined; rate to measure</td></tr>
<tr><td>C4 Wait dominates</td><td>PP-16, 26, 27, 29, 39</td><td>Mechanism confirmed; wait vs touch to measure</td></tr>
<tr><td>D1, D2, D3 Workarounds</td><td>PP-07, 11, 25, 36, 37, 38</td><td>Supported by 1.7</td></tr>
<tr><td>E1, E2 Controls</td><td>PP-02, 10, 15, 20</td><td>Supported by 1.6; classification at WS-13</td></tr>
<tr><td>F1, F2 Data</td><td>PP-40, 37</td><td>Supported by 1.8; confirm with MI</td></tr></table>
<h2>7.2 Exit criteria for v1.0</h2>
<ul><li>Every pain point has evidence from at least two sources, one of which is S4 or S5</li><li>Frequency and impact bands confirmed by the owning working group; measured value attached where a 1.4 metric exists</li><li>Every root-cause theme confirmed by at least two roles</li><li>No pain point without an L2 and step reference; parking-lot items listed separately</li><li>Register accepted by the Business Owner as the agreed statement of what is wrong</li></ul></div>`);

h.push(`</body></html>`);
fs.writeFileSync(path.join(__dirname, '..', '1.9-pain-point-register-rca.html'), h.join('\n'));
console.log(`pain points: ${PP.length}; RCA themes: ${RCA.length}; total score ${total}`);
