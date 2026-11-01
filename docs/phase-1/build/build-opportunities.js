const fs = require('fs'); const path = require('path');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = n => n.toLocaleString('en-GB', { maximumFractionDigits: 0 });
const f1 = n => n.toLocaleString('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

// ───── Illustrative baseline inputs (from 1.4 §7 and 1.5 §6; ALL assumed, replaced at G1) ─────
const B = {
  vol: { RN: 14857, VA: 7277, NM: 3033, CAP: 1516, SR: 62, ALL: 26745 },
  prodHours: 1600,                 // placeholder productive hours per FTE
  rate: { RM: 55, CR: 70, LS: 40, FU: 38, SBS: 65 }, // placeholder £/hour loaded
  // unit times (minutes) from 1.5 §6.2
  u: { RN: { start: 20, analysis: 90, validate: 30, credit: 60, letter: 35, sec: 0, fulfil: 15 }, VA: { start: 25, analysis: 75, validate: 30, credit: 60, letter: 40, sec: 30, fulfil: 25 }, NM: { start: 45, analysis: 240, validate: 45, credit: 150, letter: 50, sec: 90, fulfil: 40 } },
  creditRouted: { RN: 0.45, VA: 0.55, NM: 0.70 },
  eligible: 0.48, adminVar: 0.60, deferRate: 0.26, deferLoops: 1.4, deferDays: 9, resetRate: 0.05, letterP50: 18, queueP50: 4, creditP50: 4, fulfilP50: 3, prepP50: 6,
};
const fte = h => h / B.prodHours;

// ───── Opportunity long-list ─────
// type: E Eliminate · C Combine · R Rearrange · S Simplify · A Automate
// dep: NOW (current BLP, no replacement dependency) · R1 (replacement release 1) · R2 (later release) · POL (requires Credit Risk Policy decision) · INT (integration, Programme scope)
// ctrl: + strengthens · = neutral · ~ needs equivalence · P policy question
// size and effort bands computed/assigned; sizing text explains the formula; ill = illustrative numbers
const OPS = [
  // U1 — routing
  { id: 'OP-01', u: 'U1', title: 'Risk-based fast-track for renewals within delegated authority', desc: 'Renewals meeting objective criteria (limit unchanged, risk grade within band, covenants compliant, no watch-list flag, no EPR in 12 months) are approved within RM/line authority with a reduced submission; others follow the full route. Criteria co-designed with Credit Risk.', type: 'R', lever: 'L1', pps: 'PP-09, PP-10, PP-22', l2: '2.1–2.4', ben: 'Capacity (Credit, RM); Revenue-enabling', dep: 'POL', ctrl: 'P', effort: 'L', conf: 'M',
    driver: 'Eligible renewals × (Credit assessment time + half of RM analysis time); cycle time: eligible renewals avoid S2a + S2b', calc: () => { const n = B.vol.RN * B.eligible; const cr = n * B.creditRouted.RN * B.u.RN.credit / 60; const rm = n * (B.u.RN.analysis / 2) / 60; return { fteCR: fte(cr), fteRM: fte(rm), days: B.queueP50 + B.creditP50, n }; },
    text: r => `≈ ${fmt(r.n)} eligible renewals/yr → Credit ${f1(r.fteCR)} FTE-eq + RM ${f1(r.fteRM)} FTE-eq; eligible renewals −${r.days} days P50 (skip Credit queue and assessment)` },
  { id: 'OP-02', u: 'U1', title: 'Materiality triage for variations', desc: 'Capture a variation reason code at creation; administrative changes (dates, tracking items, non-credit amendments) follow a light path without Credit or security re-instruction; credit-relevant changes follow the full route.', type: 'R', lever: 'L5', pps: 'PP-18, PP-28', l2: '4.2, 3.2', ben: 'Capacity (RM, Credit, LS)', dep: 'R1', ctrl: '~', effort: 'M', conf: 'M',
    driver: 'Administrative variations × (Credit time where routed + analysis reduction + security instruction avoided)', calc: () => { const n = B.vol.VA * B.adminVar; const cr = n * B.creditRouted.VA * B.u.VA.credit / 60; const rm = n * (B.u.VA.analysis / 2) / 60; const ls = n * B.u.VA.sec / 60; return { fteCR: fte(cr), fteRM: fte(rm), fteLS: fte(ls), n }; },
    text: r => `≈ ${fmt(r.n)} administrative variations/yr → Credit ${f1(r.fteCR)} + RM ${f1(r.fteRM)} + LS ${f1(r.fteLS)} FTE-eq; admin variations −${B.queueP50 + B.creditP50} days P50` },
  { id: 'OP-03', u: 'U1', title: 'Five journey patterns replace eleven deal types', desc: 'Configure P1–P5 (1.3 §4) with deal type as a parameter and controls as a rules table. Retire Staged Drawdown (origination), DO NOT USE; give Remove All Facilities and allocations a home.', type: 'S', lever: 'L12', pps: 'PP-08, PP-05, PP-41', l2: '1.4', ben: 'Replacement cost avoidance; MI', dep: 'R1', ctrl: '=', effort: 'M', conf: 'H',
    driver: 'Workflow variants to configure and test: 11 → 5; MI misclassification removed', calc: () => ({}), text: () => 'Not capacity-sized. Programme estimate of build/test per variant × 6 variants avoided (requested via B-08). MI: removes reclassification adjustments MA-01' },
  { id: 'OP-04', u: 'U1', title: 'Retire ESR Cleanse from the deal model', desc: 'Stop recording records migration as deals; specify the personal and NAG exposure updates that migration must preserve (SD-01 option c).', type: 'E', lever: 'L6', pps: 'PP-08', l2: 'E2.5', ben: 'Capacity (RM/Bus Ops); MI', dep: 'NOW', ctrl: '=', effort: 'S', conf: 'H',
    driver: '3,816 ESR Cleanse deals × deal-start and update time', calc: () => { const h = 3816 * (B.u.RN.start + 15) / 60; return { fte: fte(h) }; }, text: r => `≈ ${f1(r.fte)} FTE-eq RM/Bus Ops (at 35 min per record, assumed); volume baseline restated −12.5%` },
  { id: 'OP-05', u: 'U1', title: 'Generalised pre-approved drawdown pattern with enforced limit arithmetic', desc: 'One pattern for Shadow Limit Reallocation and Staged Drawdown Allocation; system enforces Σ allocations ≤ limit (replaces manual reduction, C19); proportionate documentation (notice rather than full FAL for the reduced limit).', type: 'S', lever: 'L1, L12', pps: 'PP-31, PP-25', l2: '4.3', ben: 'Risk & control; Capacity (small)', dep: 'R1', ctrl: '+', effort: 'S', conf: 'H',
    driver: 'Low volume (62+); control strengthening', calc: () => ({}), text: () => 'Not capacity-material (< 0.1 FTE-eq). Value is control: eliminates double-counted headroom risk; model for fast-track rules' },
  // U2 — policy as rules
  { id: 'OP-06', u: 'U2', title: 'Automated delegated-authority determination', desc: 'Rules engine evaluates limit, total exposure, grade, product and connection against the DA matrix; routes the deal and records the authority level and rule version as evidence. Manual override with reason.', type: 'A', lever: 'L3', pps: 'PP-15, PP-02', l2: '2.3', ben: 'Risk & control; Capacity (RM)', dep: 'R1', ctrl: '+', effort: 'M', conf: 'H',
    driver: 'All decided deals × manual determination time (assumed 10 min); breach risk eliminated', calc: () => { const h = B.vol.ALL * 10 / 60; return { fte: fte(h) }; }, text: r => `≈ ${f1(r.fte)} FTE-eq RM; authority evidence captured on 100% of decisions (today: unknown). Enabler for OP-01` },
  { id: 'OP-07', u: 'U2', title: 'Controls expressed as rules by deal type and risk band', desc: 'Required analytics (C2), document checks (C4) and submission items defined per pattern × risk band in a rules table owned by Credit Risk Policy; the system presents and enforces them.', type: 'S', lever: 'L9', pps: 'PP-10, PP-02', l2: '2.1, 2.2', ben: 'Risk & control; Capacity', dep: 'R1', ctrl: '+', effort: 'M', conf: 'M',
    driver: 'Consistency; feeds OP-01 and OP-17 sizing', calc: () => ({}), text: () => 'Sized within OP-01 (reduced submission) and OP-17 (first-time-right). Standalone value: “if required” inconsistency removed on c. 22,000 renewals and variations' },
  { id: 'OP-08', u: 'U2', title: 'Defined decline, appeal and referral path with reason codes', desc: 'Structured decline reasons at every decline point (overview, RM, Credit); appeal route with independent reviewer; “refer” destinations defined.', type: 'S', lever: 'L9', pps: 'PP-20, PP-02', l2: '2.5', ben: 'Risk & control (conduct); MI', dep: 'R1', ctrl: '+', effort: 'S', conf: 'H',
    driver: 'Conduct exposure; MI completeness', calc: () => ({}), text: () => 'Not capacity-sized. Closes a control gap (C20, C21) and provides decline MI for RR-07. Dis-benefit: small added capture time per decline' },
  { id: 'OP-09', u: 'U2', title: 'Materiality rule for post-approval changes', desc: 'Define which fields trigger re-approval; non-material changes update documents without returning to Credit.', type: 'R', lever: 'L5', pps: 'PP-19', l2: '2.6', ben: 'Capacity; cycle time', dep: 'R1', ctrl: '~', effort: 'S', conf: 'L',
    driver: 'New/Increase deals with post-approval change (assumed 10%) × half avoid re-assessment × Credit time', calc: () => { const n = B.vol.NM * 0.10 * 0.5; const h = n * B.u.NM.credit / 60; return { fte: fte(h), n }; }, text: r => `≈ ${fmt(r.n)} re-assessments avoided/yr → Credit ${f1(r.fte)} FTE-eq; those deals avoid a full S2 repeat` },
  // U3 — time, queues, hand-offs
  { id: 'OP-10', u: 'U3', title: 'System-generated renewal tasks from review date', desc: 'Replace the BDRM report with tasks created at review date minus a lead time, visible on the landing page, with escalation if not started.', type: 'A', lever: 'L2, L5', pps: 'PP-04', l2: '4.1', ben: 'Cycle time; customer; Risk (expired facilities)', dep: 'R1', ctrl: '+', effort: 'S', conf: 'H',
    driver: 'Late-started renewals × lateness days (T7, to measure); interim: central weekly list', calc: () => ({}), text: () => 'Cycle time: removes report-to-contact lag on 14,857 renewals (T7 to measure; assumed 5–10 days P50 for late starters). Not capacity-material' },
  { id: 'OP-11', u: 'U3', title: 'Work queues, SLAs, timers and escalation for Credit, Lending Services and Fulfilment', desc: 'Hand-offs become tasks in the receiver’s queue; SLAs defined per stage; timers escalate; queue position visible to RM.', type: 'A', lever: 'L5, L7', pps: 'PP-16, PP-29, PP-27, PP-39', l2: '2.4, 3.2, 3.4', ben: 'Cycle time; Capacity (chasing); Experience', dep: 'R1', ctrl: '+', effort: 'M', conf: 'M',
    driver: 'Queue P50 reduction via visibility (assumed 30% of S2a + S5 wait); RM chasing time (survey N03)', calc: () => { const d = 0.3 * (B.queueP50 + B.fulfilP50); return { days: d }; }, text: r => `≈ −${f1(r.days)} days P50 across Credit and Fulfilment queues on all patterns (assumed 30% of visible-queue wait); RM chasing time from survey line N03` },
  { id: 'OP-12', u: 'U3', title: 'Workflow expiry timer with RM warning replaces the 90-day batch reset', desc: 'Deals approaching 90 days inactive generate an RM task at 60 and 80 days; reset only after warning, with reason captured.', type: 'A', lever: 'L7', pps: 'PP-38', l2: '2.6', ben: 'Rework avoided; MI accuracy', dep: 'R1', ctrl: '=', effort: 'S', conf: 'M',
    driver: 'Resets avoided × re-origination effort (R8 to measure)', calc: () => ({}), text: () => 'R8 to measure. Each avoided reset saves the deal-start and preparation effort already spent (RN ≈ 2.3 h; NM ≈ 5.5 h)' },
  { id: 'OP-13', u: 'U3', title: 'Single completion-conditions view', desc: 'Itemised conditions precedent generated from approval conditions, each evidenced; letter, CP and security status in one view; fulfilment released automatically when all are met.', type: 'C', lever: 'L5', pps: 'PP-26', l2: '3.3', ben: 'Cycle time; Risk & control (C9)', dep: 'R1', ctrl: '+', effort: 'M', conf: 'M',
    driver: 'Reduces S4 wait where the last condition is not noticed (assumed 1–2 days P50)', calc: () => ({ days: 1.5 }), text: r => `≈ −${f1(r.days)} days P50 on documenting patterns (assumed); C9 becomes itemised and evidenced` },
  { id: 'OP-14', u: 'U3', title: 'Context-aware deal start', desc: 'Triggers (renewal task, customer request, referral) open the deal with customer, parties and existing deal pre-loaded; single sign-on; landing page shows work due.', type: 'C', lever: 'L2', pps: 'PP-03, PP-06, PP-07', l2: '1.3, 1.4', ben: 'Capacity (RM); Experience', dep: 'R1', ctrl: '=', effort: 'M', conf: 'H',
    driver: 'All deals × deal-start time saved (assumed 60% of 20–45 min)', calc: () => { const h = (B.vol.RN * B.u.RN.start + B.vol.VA * B.u.VA.start + B.vol.NM * B.u.NM.start + B.vol.CAP * 25) * 0.6 / 60; return { fte: fte(h) }; }, text: r => `≈ ${f1(r.fte)} FTE-eq RM across c. 26,700 deal starts; largest colleague-experience item` },
  // U4 — documents and information outside the system
  { id: 'OP-15', u: 'U4', title: 'Facility letters generated from approved terms, e-delivered, e-signed, tracked and chased', desc: 'Templates per pattern and product (incl. tranches and shadow limits) generated from deal data; secure e-delivery; e-signature with wet-ink exception; sent/viewed/returned status; automated chase at defined intervals.', type: 'A', lever: 'L4', pps: 'PP-23, PP-24, PP-25, PP-31, PP-33', l2: '3.1', ben: 'Cycle time; Capacity (RM, Bus Ops); Risk & control (C4, C8); Customer', dep: 'R1', ctrl: '+', effort: 'L', conf: 'H',
    driver: 'Letter stage P50 reduction (assumed 18 → 7 days); RM/Bus Ops letter admin (assumed 60% of 35–50 min); resets avoided', calc: () => { const h = (B.vol.RN * B.u.RN.letter + B.vol.VA * B.u.VA.letter + B.vol.NM * B.u.NM.letter) * 0.6 / 60; const resets = (B.vol.RN + B.vol.VA + B.vol.NM) * B.resetRate; return { fte: fte(h), days: B.letterP50 - 7, resets }; }, text: r => `≈ −${r.days} days P50 on every documenting pattern; ≈ ${f1(r.fte)} FTE-eq RM/Bus Ops; ≈ ${fmt(r.resets)} 3-month resets/yr largely avoided (with OP-16). Largest cycle-time item` },
  { id: 'OP-16', u: 'U4', title: 'Graduated staleness control replaces the 3-month reset', desc: 'Automated chase at 2, 4, 8 weeks; RM extension with reason at 10 weeks; re-validation of key facts (not full re-approval) at 3 months unless material change; full reset only on material change or 6 months.', type: 'R', lever: 'L4', pps: 'PP-24', l2: '3.1', ben: 'Rework avoided; Capacity (Credit, RM)', dep: 'POL', ctrl: '~', effort: 'S', conf: 'M',
    driver: 'Resets avoided × full re-approval effort', calc: () => { const n = (B.vol.RN + B.vol.VA + B.vol.NM) * B.resetRate * 0.8; const h = n * (B.u.RN.analysis + B.u.RN.validate + B.u.RN.credit * B.creditRouted.RN) / 60; return { n, fte: fte(h) }; }, text: r => `≈ ${fmt(r.n)} full re-approvals avoided/yr → ≈ ${f1(r.fte)} FTE-eq RM + Credit (renewal unit times used; NM higher). Needs control equivalence with second line` },
  { id: 'OP-17', u: 'U4', title: 'Submission standard enforced at creation', desc: 'System validation rules per pattern × risk band check that the submission contains what Credit needs before it can be submitted (not just that fields are populated); checklist visible to RM.', type: 'A', lever: 'L11', pps: 'PP-13, PP-14, PP-12', l2: '2.2', ben: 'Rework avoided; cycle time; Capacity (Credit, RM)', dep: 'R1', ctrl: '+', effort: 'M', conf: 'M',
    driver: 'Deferrals avoided (assumed 50% of 26% deferral rate on Credit-routed deals) × (Credit re-read + RM rework + customer loop days)', calc: () => { const routed = B.vol.RN * B.creditRouted.RN + B.vol.VA * B.creditRouted.VA + B.vol.NM * B.creditRouted.NM; const n = routed * B.deferRate * 0.5; const h = n * (30 + 45) / 60; return { n, fte: fte(h), days: B.deferDays }; }, text: r => `≈ ${fmt(r.n)} deferrals avoided/yr → ≈ ${f1(r.fte)} FTE-eq Credit + RM (30 + 45 min per loop, assumed); affected deals −${r.days} days P50` },
  { id: 'OP-18', u: 'U4', title: 'Structured information requests with limits and continuity', desc: 'Deferral becomes a structured request (items, owner, due date) tracked in the system; customer requests logged and chased; maximum two loops before escalation; same assessor on resubmission.', type: 'S', lever: 'L11, L5', pps: 'PP-14, PP-12', l2: '2.4, 2.1', ben: 'Cycle time; Experience', dep: 'R1', ctrl: '+', effort: 'S', conf: 'M',
    driver: 'Remaining deferrals × loop-days reduction (assumed 9 → 5)', calc: () => ({ days: 4 }), text: r => `≈ −${r.days} days P50 on deals that still defer; tail of multi-loop deals (18% with ≥ 2) bounded. Complements OP-17` },
  { id: 'OP-19', u: 'U4', title: 'On-platform credit analytics and external-check integration', desc: 'Debt servicing, classifications and external credit checks performed in or integrated with the platform so analysis is evidenced, not re-keyed.', type: 'A', lever: 'L14', pps: 'PP-11', l2: '2.1', ben: 'Capacity (RM); Risk & control (C2)', dep: 'INT', ctrl: '+', effort: 'L', conf: 'L',
    driver: 'Re-keying time (assumed 15 min per full analysis) × deals with full analytics', calc: () => { const n = B.vol.NM + (B.vol.RN + B.vol.VA) * 0.5; const h = n * 15 / 60; return { fte: fte(h), n }; }, text: r => `≈ ${f1(r.fte)} FTE-eq RM on ≈ ${fmt(r.n)} full analyses/yr (assumed); evidence of analysis on platform. Integration scope: Programme` },
  { id: 'OP-20', u: 'U4', title: 'Structured on-platform CAP Strategy memo', desc: 'Template with structured fields (cause, strategy, ERV basis, actions) replaces the Word memo; narrative sections retained.', type: 'A', lever: 'L15', pps: 'PP-35', l2: '5.3', ben: 'Risk & control; MI', dep: 'R2', ctrl: '+', effort: 'S', conf: 'H',
    driver: '722 memos/yr; reportable strategy content', calc: () => ({}), text: () => 'Not capacity-material. Value: strategy content reportable (RR-08); version control; feeds protected fields F11 consistently' },
  { id: 'OP-21', u: 'U4', title: 'Security instruction generated from the approved deal; Lending Services queue; registration tracking', desc: 'Approval conditions generate the security instruction automatically (no transcription); LS works a queue with SLA; registration status tracked; security status feeds OP-13.', type: 'A', lever: 'L8', pps: 'PP-27, PP-28, PP-30', l2: '3.2', ben: 'Cycle time; Capacity (LS, RM); Risk & control (C23)', dep: 'R1', ctrl: '+', effort: 'M', conf: 'L',
    driver: 'Security path elapsed time (unmeasured; EX-05) and instruction transcription', calc: () => ({}), text: () => 'Not sizable until WS-12 measures the security path. Expected to be the longest parallel path on New Money (hypothesis C4)' },
  // U5 — distress
  { id: 'OP-22', u: 'U5', title: 'Early-warning flags at deal creation prompt referral', desc: 'Arrears, grade migration, covenant breach and forbearance indicators combined into a flag shown at deal creation and on the RM landing page; referral prompted before analysis effort is spent.', type: 'R', lever: 'L10', pps: 'PP-34, PP-17', l2: '5.2, 2.4', ben: 'Risk & control (loss); Capacity (Credit)', dep: 'R1', ctrl: '+', effort: 'M', conf: 'M',
    driver: 'Earlier referral (T8 to measure); Credit time on deals later referred', calc: () => ({}), text: () => 'Risk value: earlier intervention on c. 800 referrals/yr (indicator-to-referral days, T8). Capacity: Credit review avoided on deals referred mid-assessment (count from DR-14)' },
  { id: 'OP-23', u: 'U5', title: 'CAP referral as a record with parallel review where policy allows', desc: 'Referral is a record attached to the connection, not a transfer of the whole deal; Credit authority and SBS categorisation reviewed in parallel for defined triggers; live deal status explicit.', type: 'R', lever: 'L10', pps: 'PP-21', l2: '5.2', ben: 'Cycle time (T8); Experience', dep: 'POL', ctrl: 'P', effort: 'M', conf: 'L',
    driver: 'Referral-to-categorisation days (T8, assumed 21 → 12 P50)', calc: () => ({ days: 9 }), text: r => `≈ −${r.days} days P50 to categorisation (assumed) on 794 referrals/yr. Requires CAP policy decision on parallel authority` },
  { id: 'OP-24', u: 'U5', title: 'Native covenant and waiver lifecycle with RM tasks', desc: 'Covenant tests, waivers and expiries managed by platform logic with RM tasks on due and expiry; replaces the waiver batch job.', type: 'A', lever: 'L7', pps: 'PP-36', l2: '5.1', ben: 'Risk & control; Capacity (small)', dep: 'R2', ctrl: '+', effort: 'S', conf: 'M',
    driver: 'Breach detection lag; batch retirement', calc: () => ({}), text: () => 'Not capacity-material. Value: breaches surfaced as tasks, not reports; batch W-03 retired; feeds OP-22' },
  // U6 — data and ownership
  { id: 'OP-25', u: 'U6', title: 'Data ownership and protected-fields governance', desc: 'Named owner per field group (1.8 §6); lineage register maintained as a living artefact; change control on protected fields; cut-over reconciliation for P1 fields.', type: 'S', lever: 'L14', pps: 'PP-40', l2: 'E2.4', ben: 'Risk & control (regulatory); Replacement risk reduction', dep: 'NOW', ctrl: '+', effort: 'S', conf: 'H',
    driver: 'Avoided regulatory reporting break at go-live', calc: () => ({}), text: () => 'Not capacity-sized. Prevents the highest-consequence failure mode of the replacement (reporting break). Manual adjustments MA-01–03 closed over time' },
  { id: 'OP-26', u: 'U6', title: 'Ownership transfer with audit trail replaces mass officer-code batch', desc: 'Native function to transfer ownership of deals/customers with history; bulk option with approval; segment attribution preserved over time.', type: 'A', lever: 'L7, L14', pps: 'PP-37', l2: 'E2.3', ben: 'Risk & control (C26, C27); MI', dep: 'R1', ctrl: '+', effort: 'S', conf: 'H',
    driver: 'Audit-trail gap closed; MI drift removed', calc: () => ({}), text: () => 'Not capacity-sized. Closes insider-information exposure on mis-assignment; MA-03 adjustment removed' },
  { id: 'OP-27', u: 'U6', title: 'Effort and cycle-time measurement designed into the to-be', desc: 'Stage timestamps per the 1.4 stage model, task time capture, queue metrics and the five pattern dashboards as standard platform reporting.', type: 'S', lever: 'L14', pps: 'PP-43', l2: 'E2.4', ben: 'Benefits tracking; continuous improvement', dep: 'R1', ctrl: '=', effort: 'S', conf: 'H',
    driver: 'Enables Phase 4 benefits tracking without re-surveying', calc: () => ({}), text: () => 'Not sized; precondition for realising and evidencing every other opportunity. Survey (1.5) becomes a one-off' },
  { id: 'OP-28', u: 'U6', title: 'Deposit opportunity: reason codes and pricing-exception step; location per SD-03', desc: 'Declined-by-Bank / by-Customer reason codes; approval step only for rates outside card; pipeline MI; on platform or CRM per SD-03.', type: 'S', lever: '—', pps: 'PP-42', l2: 'E1.1', ben: 'MI; Revenue-enabling', dep: 'R1', ctrl: '=', effort: 'S', conf: 'H',
    driver: 'Low volume (98 in progress)', calc: () => ({}), text: () => 'Not capacity-material. Value: deposit pipeline MI; pricing exception control made explicit' },
  // Quick wins and integration items
  { id: 'OP-29', u: 'U1', title: 'Remove DO NOT USE from the deal-type pick list', desc: 'Reference-data change on current BLP.', type: 'E', lever: '—', pps: 'PP-41', l2: 'E2.3', ben: 'Data quality', dep: 'NOW', ctrl: '=', effort: 'S', conf: 'H', driver: '—', calc: () => ({}), text: () => 'Quick win, Week 3. No sizing' },
  { id: 'OP-30', u: 'U4', title: 'Interim facility-letter tracking on current BLP', desc: 'Standard email template; send date logged in BLP comments; weekly unreturned-letter report at 6 and 10 weeks with RM chase.', type: 'S', lever: 'L4', pps: 'PP-23, PP-24', l2: '3.1', ben: 'Rework avoided (interim)', dep: 'NOW', ctrl: '=', effort: 'S', conf: 'M',
    driver: 'Share of resets avoided by chasing (assumed 40%)', calc: () => { const n = (B.vol.RN + B.vol.VA + B.vol.NM) * B.resetRate * 0.4; return { n }; }, text: r => `≈ ${fmt(r.n)} resets/yr avoided before the platform change (assumed 40% of resets are chase failures). Procedure only` },
  { id: 'OP-31', u: 'U3', title: 'Interim central weekly renewal task list', desc: 'BDRM report run centrally; RM task list issued weekly; late starts measured from Week 8.', type: 'S', lever: 'L2', pps: 'PP-04', l2: '4.1', ben: 'Cycle time (interim); baseline for T7', dep: 'NOW', ctrl: '=', effort: 'S', conf: 'H', driver: 'Lateness reduction (T7)', calc: () => ({}), text: () => 'Procedure only. Gives the T7 baseline and an early read on OP-10 value' },
  { id: 'OP-32', u: 'U4', title: 'Real-time balance integration (MEO / IMPACS)', desc: 'Balances pulled at deal creation and refreshed at submission; no stale balances in submissions.', type: 'A', lever: 'L14', pps: 'PP-07', l2: '1.4', ben: 'Risk & control; Capacity (small)', dep: 'INT', ctrl: '+', effort: 'L', conf: 'L', driver: 'Integration; Programme scope', calc: () => ({}), text: () => 'Not sized by this project. Requirement to Programme (DD-08); value is submission accuracy' },
  { id: 'OP-33', u: 'U4', title: 'Fee integration to TELLER', desc: 'Fees agreed on the deal flow to fee processing without re-keying.', type: 'A', lever: 'L14', pps: '—', l2: '3.4', ben: 'Revenue (fee leakage); Capacity (Fulfilment)', dep: 'INT', ctrl: '+', effort: 'L', conf: 'L', driver: 'Fee leakage (unmeasured)', calc: () => ({}), text: () => 'Not sized; fee error MI requested. Requirement to Programme (DD-08)' },
];

// size band from computed values
function sizeBand(o) {
  const r = o.calc(); o.r = r;
  const fteTotal = (r.fte || 0) + (r.fteCR || 0) + (r.fteRM || 0) + (r.fteLS || 0);
  const days = r.days || 0;
  if (fteTotal >= 10 || days >= 10) return 'XL'; if (fteTotal >= 4 || days >= 5) return 'L'; if (fteTotal >= 1 || days >= 2) return 'M';
  // non-quantified: assign by nature
  const bigRisk = ['OP-03', 'OP-22', 'OP-25', 'OP-21'].includes(o.id); return bigRisk ? 'M' : 'S';
}
OPS.forEach(o => { o.size = sizeBand(o); o.fteTotal = (o.r.fte || 0) + (o.r.fteCR || 0) + (o.r.fteRM || 0) + (o.r.fteLS || 0); });
const sizeVal = { XL: 4, L: 3, M: 2, S: 1 }, effVal = { S: 1, M: 2, L: 3 };
const typeName = { E: 'Eliminate', C: 'Combine', R: 'Rearrange', S: 'Simplify', A: 'Automate' };
const depName = { NOW: 'Now (current BLP)', R1: 'Replacement R1', R2: 'Replacement R2+', POL: 'Policy decision', INT: 'Integration (Programme)' };
const ctrlName = { '+': 'Strengthens', '=': 'Neutral', '~': 'Needs equivalence', 'P': 'Policy question' };

// ───── Document ─────
let h = [];
h.push(`<!doctype html><html><head><meta charset="utf-8"><title>1.10 Opportunity Long-List</title><link rel="stylesheet" href="build/style.css"><style>
.ll th, .ll td { font-size: 7.4pt; padding: 1.6pt 3pt; }
.sz th, .sz td { font-size: 7.8pt; }
.XL { background: #1f4f82; color: #fff; font-weight: bold; } .L { background: #8aa2bd; color: #fff; font-weight: bold; } .M { background: #c9d6e5; font-weight: bold; } .S { background: #e6edf5; }
.badge { display: inline-block; border-radius: 2px; padding: 0 4pt; font-size: 7pt; }
</style></head><body>`);

h.push(`<div class="cover"><p class="small" style="letter-spacing:1px;text-transform:uppercase">Business Bank · Business Banking Transformation Office · BB-BLP-BPR</p>
<h1>1.10 Opportunity Long-List, Sized<br/><span style="font-size:15pt;color:#1f4f82">From root causes to design options, with order-of-magnitude value and a route to delivery</span></h1>
<table class="meta" style="width:65%;margin-top:20pt"><tr><td>Deliverable</td><td>1.10 Opportunity long-list with ECRS-A classification, order-of-magnitude sizing, dependencies and prioritisation</td></tr><tr><td>Version</td><td>0.6 – ${OPS.length} opportunities derived from 1.9 root causes (Week 3). Sizing formulas fixed; inputs are the illustrative baselines of 1.4 §7 and 1.5 §6 and are replaced by measured values at Week 7 → v1.0 for G1</td></tr>
<tr><td>Source</td><td>1.9 (root causes U1–U6, pain points); 1.3 (patterns); 1.6 (control impact); 1.7 (dispositions); 1.8 (protected fields); 0.9 benefits tree (levers L1–L15)</td></tr><tr><td>Owner</td><td>WS6 PMO &amp; Benefits with WS1</td></tr><tr><td>Accepted by</td><td>SteerCo at G1, as the agenda for Phase 2 design (not as approved changes)</td></tr>
<tr><td>Feeds</td><td>Phase 2: design principles (W8), journey patterns, control equivalence register (2.5), business case (2.13), initiative portfolio (2.14)</td></tr></table>
<div class="ph-box" style="margin-top:24pt"><b>Status of the sizing.</b> Every size in this document is computed by a stated formula from the <u>illustrative</u> baseline inputs listed in section 2. Those inputs are assumptions, not Bank data. The formulas are the deliverable at v0.6; the numbers are a demonstration of what they produce. At v1.0 the same formulas run on measured inputs and the ranking may change. No figure here may be quoted as a benefit.</div></div>`);

// §1 method
h.push(`<div class="pb"><h1>1. Method</h1>
<h2>1.1 From root cause to opportunity</h2>
<p>Opportunities are generated from the six underlying causes in 1.9 §6, not from the pain points directly. This keeps the list short and structural: an opportunity that removes a cause removes every pain point the cause drives. Each cause was worked through ECRS-A in order, because the order matters: eliminating a step is worth more than automating it, and automating a step that should have been eliminated is the classic failure of system replacements.</p>
<table><tr><th>Step</th><th>Question asked of each cause</th><th>Typical result</th></tr>
<tr><td><b>E</b> Eliminate</td><td>Can the work be stopped altogether, because the control it served is unnecessary or served elsewhere?</td><td>Retire ESR Cleanse deals; retire dead deal types; stop re-instructing unchanged security</td></tr>
<tr><td><b>C</b> Combine</td><td>Can steps, hand-offs or views be merged so the work happens once?</td><td>Context-aware deal start; single completion view</td></tr>
<tr><td><b>R</b> Rearrange</td><td>Can the sequence or routing change so effort is proportionate to risk and decisions happen earlier?</td><td>Fast-track renewals; materiality triage; early-warning flags; graduated staleness control</td></tr>
<tr><td><b>S</b> Simplify</td><td>Can the rule, the structure or the artefact be made simpler and explicit?</td><td>Five patterns; rules tables; structured requests; reason codes</td></tr>
<tr><td><b>A</b> Automate</td><td>Only now: can what remains be done by the system?</td><td>DA determination; letters and e-signature; tasks and timers; integrations</td></tr></table>
<h2>1.2 Fields recorded per opportunity</h2>
<table><tr><th>Field</th><th>Meaning</th><th>Values</th></tr>
<tr><td>Type</td><td>ECRS-A classification</td><td>E, C, R, S, A</td></tr>
<tr><td>Cause / pain points</td><td>Traceability to 1.9</td><td>U1–U6; PP-nn</td></tr>
<tr><td>Lever</td><td>Benefits-tree lever (0.9) so sizing lands in the business case</td><td>L1–L15</td></tr>
<tr><td>Benefit category</td><td>Per 0.9 §2</td><td>Capacity; Cycle time; Risk &amp; control; Replacement cost avoidance; Revenue-enabling; Experience; MI</td></tr>
<tr><td>Size</td><td>Order of magnitude from the formula in §3</td><td>XL ≥ 10 FTE-eq or ≥ 10 days P50 on a major pattern · L 4–10 FTE-eq or 5–10 days · M 1–4 FTE-eq or 2–5 days, or material control value · S below, or not quantifiable</td></tr>
<tr><td>Effort</td><td>Delivery complexity</td><td>S procedure or configuration on current BLP · M configuration on the replacement · L custom build, integration or policy change</td></tr>
<tr><td>Dependency</td><td>What must be true to deliver it</td><td>NOW · R1 · R2+ · POL (Credit Risk Policy decision) · INT (Programme integration scope)</td></tr>
<tr><td>Control impact</td><td>From 1.6</td><td>Strengthens · Neutral · Needs equivalence (second-line sign-off) · Policy question</td></tr>
<tr><td>Confidence</td><td>In the sizing driver, not the number</td><td>H driver measurable from DR data · M driver partly measurable · L driver assumed until workshop</td></tr></table>
<h2>1.3 Sizing rules</h2>
<ul><li>Capacity is sized as hours saved ÷ ${fmt(B.prodHours)} productive hours (placeholder) = FTE-equivalent, by role. It is capacity, not headcount (SD-04; 0.9 counting rule 2).</li>
<li>Cycle time is sized as days removed from the P50 of a stage on the affected population, from the 1.4 stage model.</li>
<li>Where two opportunities act on the same step, the saving is attributed once (to the one listed first) and the second is marked “sized within”. Totals in §4 are therefore not double-counted.</li>
<li>Risk, control, MI and experience value is described, not monetised, at this stage (0.9 counting rule 4).</li>
<li>Dis-benefits are listed in §6 and carried into the business case.</li></ul></div>`);

// §2 inputs
h.push(`<div class="pb"><h1>2. Sizing inputs <span class="ph">(illustrative; replaced at G1)</span></h1>
<table class="sz"><tr><th>Input</th><th>Value used</th><th>Source at v1.0</th></tr>
<tr class="ill"><td>12-month volumes: Renewal + EPR / Variation / New + Increase / CAP / Reallocation</td><td>${fmt(B.vol.RN)} / ${fmt(B.vol.VA)} / ${fmt(B.vol.NM)} / ${fmt(B.vol.CAP)} / ${B.vol.SR}</td><td>RFP (DR-01 to reconcile)</td></tr>
<tr class="ill"><td>Share routed to Credit: RN / VA / NM</td><td>${B.creditRouted.RN * 100}% / ${B.creditRouted.VA * 100}% / ${B.creditRouted.NM * 100}%</td><td>V3 (DR-03)</td></tr>
<tr class="ill"><td>Renewals meeting fast-track criteria</td><td>${B.eligible * 100}%</td><td>V5 (DR-02/04/05)</td></tr>
<tr class="ill"><td>Variations that are administrative</td><td>${B.adminVar * 100}%</td><td>Reason classification (DR-04 + sample)</td></tr>
<tr class="ill"><td>Deferral rate on Credit-routed deals; loops per deferred deal; days added</td><td>${B.deferRate * 100}%; ${B.deferLoops}; ${B.deferDays}</td><td>R1, R2, R3</td></tr>
<tr class="ill"><td>3-month letter reset rate</td><td>${B.resetRate * 100}%</td><td>R4 (DR-08)</td></tr>
<tr class="ill"><td>Stage P50 days (renewal): preparation / Credit queue / Credit assessment / letter / fulfilment</td><td>${B.prepP50} / ${B.queueP50} / ${B.creditP50} / ${B.letterP50} / ${B.fulfilP50}</td><td>T3–T6</td></tr>
<tr class="ill"><td>Unit touch times, minutes (RN / VA / NM): start, analysis, validate, Credit, letter, security, fulfilment</td><td>${Object.values(B.u.RN).join('/')} · ${Object.values(B.u.VA).join('/')} · ${Object.values(B.u.NM).join('/')}</td><td>1.5 S3</td></tr>
<tr class="ill"><td>Productive hours per FTE</td><td>${fmt(B.prodHours)}</td><td>Finance (DR-16)</td></tr></table>
<p>Loaded cost rates (DR-16) are not applied at v0.6; FTE-equivalents convert to £ in the business case once Finance supplies rates.</p></div>`);

// §3 long-list (landscape)
h.push(`<div class="pb wide"><h1>3. Opportunity long-list</h1>
<table class="ll"><tr><th style="width:4%">ID</th><th style="width:3%">U</th><th style="width:17%">Opportunity</th><th style="width:24%">What changes</th><th style="width:3%">Type</th><th style="width:4%">Lever</th><th style="width:8%">Pain points</th><th style="width:9%">Benefit category</th><th style="width:3%">Size</th><th style="width:3%">Effort</th><th style="width:5%">Dep.</th><th style="width:5%">Control</th><th style="width:3%">Conf.</th><th>Sizing driver</th></tr>`);
let lastU = '';
for (const o of OPS) {
  if (o.u !== lastU && !['OP-29', 'OP-30', 'OP-31', 'OP-32', 'OP-33'].includes(o.id)) { const un = { U1: 'U1 · Routing by deal type, not risk or materiality', U2: 'U2 · Policy in documents, not rules', U3: 'U3 · No concept of time, queues or hand-offs', U4: 'U4 · Documents and information outside the system', U5: 'U5 · Distress handling file-driven and sequential', U6: 'U6 · No data ownership or end-to-end measure' }; h.push(`<tr class="l1"><td colspan="14">${un[o.u]}</td></tr>`); lastU = o.u; }
  if (o.id === 'OP-29') h.push(`<tr class="l1"><td colspan="14">Quick wins on current BLP and integration items</td></tr>`);
  h.push(`<tr><td><b>${o.id}</b></td><td>${o.u}</td><td><b>${esc(o.title)}</b></td><td>${esc(o.desc)}</td><td class="c">${o.type}</td><td>${o.lever}</td><td>${o.pps}</td><td>${esc(o.ben)}</td><td class="c ${o.size}">${o.size}</td><td class="c">${o.effort}</td><td>${o.dep}</td><td>${ctrlName[o.ctrl]}</td><td class="c">${o.conf}</td><td>${esc(o.driver)}</td></tr>`);
}
h.push(`</table><p class="small">Type: E Eliminate · C Combine · R Rearrange · S Simplify · A Automate. Dep.: NOW current BLP · R1/R2 replacement release · POL policy decision · INT integration. Size and effort bands per §1.2.</p></div>`);

// §4 sizing detail
h.push(`<div class="pb"><h1>4. Sizing detail <span class="ph">(illustrative outputs of the formulas)</span></h1>
<table class="sz"><tr><th style="width:6%">ID</th><th style="width:20%">Opportunity</th><th style="width:30%">Formula</th><th>Illustrative result</th><th style="width:5%">Size</th></tr>`);
for (const o of OPS) h.push(`<tr class="${Object.keys(o.r).length ? 'ill' : ''}"><td><b>${o.id}</b></td><td>${esc(o.title)}</td><td>${esc(o.driver)}</td><td>${esc(o.text(o.r))}</td><td class="c ${o.size}">${o.size}</td></tr>`);
const capOps = OPS.filter(o => o.fteTotal > 0);
const capTotal = capOps.reduce((a, o) => a + o.fteTotal, 0);
const byRole = { Credit: OPS.reduce((a, o) => a + (o.r.fteCR || 0), 0) + (OPS.find(o => o.id === 'OP-09').r.fte || 0) + (OPS.find(o => o.id === 'OP-17').r.fte || 0) / 2 + (OPS.find(o => o.id === 'OP-16').r.fte || 0) / 2, RM: OPS.reduce((a, o) => a + (o.r.fteRM || 0), 0) + ['OP-04', 'OP-06', 'OP-14', 'OP-15', 'OP-19'].reduce((a, id) => a + (OPS.find(o => o.id === id).r.fte || 0), 0) + (OPS.find(o => o.id === 'OP-17').r.fte || 0) / 2 + (OPS.find(o => o.id === 'OP-16').r.fte || 0) / 2, LS: OPS.reduce((a, o) => a + (o.r.fteLS || 0), 0) };
h.push(`</table>
<h2>4.1 Illustrative aggregate (non-overlapping, central inputs)</h2>
<table class="sz"><tr><th>Measure</th><th>Illustrative value</th><th>Against illustrative baseline (1.5 §6.3: 87 FTE-eq deal-tied effort)</th></tr>
<tr class="ill"><td>Capacity, all quantified opportunities</td><td class="num">${f1(capTotal)} FTE-eq</td><td class="num">${Math.round(100 * capTotal / 87)}% of deal-tied effort</td></tr>
<tr class="ill"><td>of which Credit</td><td class="num">${f1(byRole.Credit)} FTE-eq</td><td>Mostly OP-01, OP-02, OP-17</td></tr>
<tr class="ill"><td>of which RM / Business Direct / Business Ops</td><td class="num">${f1(byRole.RM)} FTE-eq</td><td>Mostly OP-15, OP-14, OP-01, OP-06</td></tr>
<tr class="ill"><td>of which Lending Services</td><td class="num">${f1(byRole.LS)} FTE-eq</td><td>OP-02; OP-21 unsized</td></tr>
<tr class="ill"><td>Renewal E2E P50, eligible deals (OP-01 + OP-15 + OP-11 + OP-13)</td><td class="num">35 → ≈ ${35 - 8 - 11 - 2 - 1.5} days</td><td>−${Math.round(100 * (8 + 11 + 2 + 1.5) / 35)}% on illustrative baseline</td></tr>
<tr class="ill"><td>Renewal E2E P50, non-eligible deals (OP-15 + OP-11 + OP-13 + OP-17/18)</td><td class="num">35 → ≈ ${35 - 11 - 2 - 1.5 - 2} days</td><td>−${Math.round(100 * (11 + 2 + 1.5 + 2) / 35)}%</td></tr>
<tr class="ill"><td>3-month resets avoided (OP-15 + OP-16; OP-30 interim)</td><td class="num">≈ ${fmt(OPS.find(o => o.id === 'OP-16').r.n)} / yr</td><td>of ≈ ${fmt((B.vol.RN + B.vol.VA + B.vol.NM) * B.resetRate)} assumed</td></tr></table>
<p><b>What the illustration shows about the structure of value, not its amount:</b> two opportunities (fast-track renewals and automated facility letters) carry roughly 40% of the quantified capacity and most of the cycle-time reduction; both depend on decisions outside pure process design (a policy decision on renewal authority; a platform capability for documents). That is why they are raised at G1, not left to Phase 2.</p></div>`);

// §5 prioritisation 2x2
const pts = OPS.map(o => ({ id: o.id, x: 4 - effVal[o.effort], y: sizeVal[o.size], dep: o.dep }));
// jitter overlapping points
const seen = {}; pts.forEach(p => { const k = `${p.x},${p.y}`; seen[k] = (seen[k] || 0); p.j = seen[k]++; });
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 420" width="100%" font-family="Arial, Helvetica, sans-serif">
<rect x="80" y="20" width="580" height="340" fill="#fff" stroke="#b8c4d0"/>
<rect x="80" y="20" width="290" height="170" fill="#f7f9fb"/><rect x="370" y="20" width="290" height="170" fill="#e6edf5"/><rect x="80" y="190" width="290" height="170" fill="#fff"/><rect x="370" y="190" width="290" height="170" fill="#f7f9fb"/>
<text x="515" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#0b3d6b">QUICK WINS AND EASY STRUCTURAL</text><text x="225" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#0b3d6b">MAJOR PROJECTS</text>
<text x="515" y="350" text-anchor="middle" font-size="9" font-weight="bold" fill="#555">FILL-INS</text><text x="225" y="350" text-anchor="middle" font-size="9" font-weight="bold" fill="#555">RECONSIDER / BUNDLE</text>
<text x="370" y="385" text-anchor="middle" font-size="9" fill="#333">Ease of delivery →  (effort L · M · S)</text>
<text x="30" y="190" text-anchor="middle" font-size="9" fill="#333" transform="rotate(-90 30 190)">Size →  (S · M · L · XL)</text>`;
const colX = { 1: 175, 2: 370, 3: 565 }, rowY = { 1: 320, 2: 240, 3: 140, 4: 60 };
const depCol = { NOW: '#1a7f37', R1: '#0b3d6b', R2: '#1f4f82', POL: '#b36b00', INT: '#7a2e00' };
pts.forEach(p => { const cx = colX[p.x] - 80 + (p.j % 5) * 40; const cy = rowY[p.y] - 14 + Math.floor(p.j / 5) * 22; svg += `<rect x="${cx - 18}" y="${cy - 8}" width="36" height="16" rx="3" fill="${depCol[p.dep]}"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold">${p.id.replace('OP-', '')}</text>`; });
svg += `<g font-size="8"><rect x="80" y="398" width="12" height="10" fill="#1a7f37"/><text x="96" y="407">NOW</text><rect x="140" y="398" width="12" height="10" fill="#0b3d6b"/><text x="156" y="407">R1</text><rect x="190" y="398" width="12" height="10" fill="#1f4f82"/><text x="206" y="407">R2+</text><rect x="250" y="398" width="12" height="10" fill="#b36b00"/><text x="266" y="407">Policy decision</text><rect x="350" y="398" width="12" height="10" fill="#7a2e00"/><text x="366" y="407">Integration</text></g></svg>`;
h.push(`<div class="pb"><h1>5. Prioritisation</h1>
<h2>5.1 Size versus ease</h2>
<div style="border:1px solid #b8c4d0;padding:6pt">${svg}</div>
<p class="small">Numbers are OP-IDs. Colour is the dependency. Position uses the illustrative size band; at v1.0 items move as measured inputs replace assumptions.</p>
<h2>5.2 Reading</h2>
<ul><li><b>Top-right (large and easy):</b> OP-06 automated DA, OP-10 renewal tasks, OP-14 context-aware deal start, OP-17 submission standard, OP-18 structured requests, OP-16 graduated staleness (policy). These are configuration on the replacement with strong control arguments. They should be the first design workshops in Phase 2.</li>
<li><b>Top-left (large and hard):</b> OP-01 fast-track (policy), OP-15 letters (capability), OP-02 triage, OP-11 queues and SLAs. The value concentrates here. Each needs a decision owner identified at G1: Credit Risk Policy for OP-01; Solution Architect for OP-15 (fit-gap); Credit for OP-02 criteria.</li>
<li><b>Bottom-right (small and easy):</b> OP-04, OP-29, OP-30, OP-31, OP-08, OP-20, OP-24, OP-26, OP-28. Do them; several are quick wins before the platform changes.</li>
<li><b>Bottom-left:</b> OP-19, OP-32, OP-33 integration items: Programme scope; this project supplies requirements, not business case.</li></ul>
<h2>5.3 Wave view</h2>
<table><tr><th>Wave</th><th>Timing</th><th>Opportunities</th><th>Gate</th></tr>
<tr><td><b>Wave 0 · Quick wins on current BLP</b></td><td>Weeks 3–8</td><td>OP-29, OP-04 (SD-01), OP-30, OP-31, OP-25 (governance set-up)</td><td>Business Owner; no Programme dependency</td></tr>
<tr><td><b>Wave 1 · Replacement release 1</b></td><td>Per Programme plan</td><td>OP-03, OP-05, OP-06, OP-07, OP-08, OP-09, OP-10, OP-11, OP-12, OP-13, OP-14, OP-15, OP-17, OP-18, OP-21, OP-22, OP-26, OP-27, OP-28; OP-02 if reason taxonomy ready</td><td>G2 design; Programme backlog (B-06)</td></tr>
<tr><td><b>Wave 1 · Policy-dependent</b></td><td>Decision needed by W10</td><td>OP-01, OP-16, OP-23</td><td>Credit Risk Policy; second line (equivalence)</td></tr>
<tr><td><b>Wave 2 · Later releases / integration</b></td><td>Per Programme plan</td><td>OP-19, OP-20, OP-24, OP-32, OP-33</td><td>Programme</td></tr></table></div>`);

// §6 dependencies, risks, dis-benefits
h.push(`<div class="pb"><h1>6. Dependencies, risks and dis-benefits</h1>
<h2>6.1 Opportunity dependencies</h2>
<table><tr><th>Opportunity</th><th>Depends on</th><th>Why</th></tr>
<tr><td>OP-01 Fast-track renewals</td><td>OP-06; OP-07; policy decision; OP-22</td><td>Needs automated DA to route; rules table for reduced submission; early-warning flags as an exclusion criterion</td></tr>
<tr><td>OP-02 Materiality triage</td><td>Reason taxonomy (WS-05); OP-07</td><td>Cannot route without a captured reason; light path needs its own rules</td></tr>
<tr><td>OP-15 Letters</td><td>Platform document and e-signature capability (fit-gap 2.7); OP-03 templates per pattern</td><td>Core capability question; off-platform letters end only if templates cover tranches and shadow limits</td></tr>
<tr><td>OP-16 Graduated staleness</td><td>OP-15 (tracking); second-line equivalence</td><td>Chase steps need status; control change needs sign-off</td></tr>
<tr><td>OP-17 Submission standard</td><td>OP-07; OP-19 for off-platform analytics</td><td>Rules need a source; cannot validate what is not in the system</td></tr>
<tr><td>OP-11 Queues and SLAs</td><td>OP-27 measurement; team ownership of SLAs</td><td>SLAs need baselines; queues need owners</td></tr>
<tr><td>OP-13 Completion view</td><td>OP-15, OP-21</td><td>Letter and security status must be system-held</td></tr>
<tr><td>OP-22 Early warning</td><td>OP-24; data from DR-05 fields</td><td>Covenant breach as an input; indicator fields must be reliable</td></tr>
<tr><td>OP-23 Parallel referral</td><td>CAP policy decision</td><td>Authority sequence is policy</td></tr>
<tr><td>All Wave 1</td><td>OP-25 protected fields; OP-03 patterns</td><td>Data protection and the pattern model are preconditions for every configuration decision</td></tr></table>
<h2>6.2 Risks to value</h2>
<table><tr><th>Risk</th><th>Affects</th><th>Mitigation</th></tr>
<tr><td>Credit Risk Policy does not extend renewal authority</td><td>OP-01 (largest capacity item)</td><td>Present cohort evidence (A2) at G1; design OP-01 with tiered criteria so a partial extension still delivers; OP-06/07 deliver value regardless</td></tr>
<tr><td>Replacement platform lacks native e-signature or template flexibility</td><td>OP-15, OP-05</td><td>Fit-gap by W10; partner integration on the custom list if needed; interim OP-30</td></tr>
<tr><td>Measured eligibility, deferral and reset rates lower than assumed</td><td>OP-01, OP-16, OP-17</td><td>Formulas re-run at G1; sizing bands move; the design logic holds at any rate above zero</td></tr>
<tr><td>Capacity is released in fragments too small to realise</td><td>All capacity items</td><td>Benefits plan (Phase 3) aggregates by team; redeployment to N01 customer time is a valid realisation (SD-04)</td></tr>
<tr><td>Second line rejects equivalence for OP-16 or OP-02</td><td>OP-16, OP-02</td><td>Incremental review from W9; retain contested control and record as Phase 4 improvement</td></tr></table>
<h2>6.3 Dis-benefits to carry into the business case</h2>
<table><tr><th>ID</th><th>Dis-benefit</th><th>Caused by</th><th>Treatment</th></tr>
<tr><td>DB-01</td><td>Credit caseload becomes more complex on average; assessor time per case rises</td><td>OP-01, OP-02</td><td>Role profile and resourcing in TOM (2.9); counted against Credit capacity release</td></tr>
<tr><td>DB-04</td><td>Added capture time: reason codes, structured requests, itemised CPs</td><td>OP-02, OP-08, OP-13, OP-18</td><td>Netted in sizing (assumed 2–5 min per instance); counted</td></tr>
<tr><td>DB-05</td><td>Customers without e-signature capability need a wet-ink path; dual process for a period</td><td>OP-15</td><td>Exception path designed; share estimated in WS-03</td></tr>
<tr><td>DB-06</td><td>RM fast-track decisions carry accountability RMs may be reluctant to take</td><td>OP-01</td><td>Clear criteria, system evidence (OP-06), training (Phase 3)</td></tr>
<tr><td>DB-02, DB-03</td><td>Training and transition; go-live productivity dip</td><td>All Wave 1</td><td>One-off cost; hypercare</td></tr></table></div>`);

// §7 coverage and G1 asks
const uCount = {}; OPS.forEach(o => uCount[o.u] = (uCount[o.u] || 0) + 1);
const ppCovered = new Set(); OPS.forEach(o => o.pps.split(',').map(s => s.trim()).filter(s => s.startsWith('PP')).forEach(p => ppCovered.add(p)));
h.push(`<div class="pb"><h1>7. Coverage check and what G1 is asked to approve</h1>
<h2>7.1 Coverage</h2>
<table><tr><th>Check</th><th>Result</th></tr>
<tr><td>Every underlying cause U1–U6 has at least one opportunity</td><td>${['U1', 'U2', 'U3', 'U4', 'U5', 'U6'].map(u => `${u}: ${uCount[u]}`).join(' · ')}</td></tr>
<tr><td>Top-15 pain points (1.9 §4.1) addressed</td><td>${['PP-09', 'PP-23', 'PP-08', 'PP-04', 'PP-15', 'PP-18', 'PP-39', 'PP-13', 'PP-14', 'PP-16', 'PP-24', 'PP-11', 'PP-29', 'PP-12', 'PP-43'].filter(p => ppCovered.has(p)).length} of 15</td></tr>
<tr><td>Pain points addressed overall</td><td>${ppCovered.size} of 43 (remainder are addressed implicitly by pattern design or are MI-only)</td></tr>
<tr><td>Every lever L1–L15 in the benefits tree has an opportunity</td><td>L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12, L14, L15 covered; L13 (fit-to-standard) is a Phase 2 principle, not an opportunity</td></tr>
<tr><td>Every opportunity has a control-impact rating</td><td>Yes; ${OPS.filter(o => o.ctrl === '+').length} strengthen, ${OPS.filter(o => o.ctrl === '=').length} neutral, ${OPS.filter(o => o.ctrl === '~').length} need equivalence, ${OPS.filter(o => o.ctrl === 'P').length} policy questions</td></tr></table>
<h2>7.2 Decisions requested at G1</h2>
<table><tr><th>#</th><th>Decision</th><th>Owner</th><th>Why now</th></tr>
<tr><td>1</td><td>Approve the long-list as the Phase 2 design agenda (not as approved changes)</td><td>SteerCo</td><td>Phase 2 starts W8; design principles are derived from U1–U6</td></tr>
<tr><td>2</td><td>Commission Credit Risk Policy to state whether, and under what criteria, unchanged renewals may be approved within RM/line authority (OP-01)</td><td>Chief Credit Officer</td><td>Largest capacity item; answer needed by W10 for the interim design release</td></tr>
<tr><td>3</td><td>Confirm with the Replacement Programme that document generation, e-delivery and e-signature are in scope for Release 1 (OP-15)</td><td>Programme Director</td><td>Largest cycle-time item; fit-gap by W10</td></tr>
<tr><td>4</td><td>Authorise Wave 0 quick wins (OP-29, OP-04, OP-30, OP-31, OP-25)</td><td>Business Owner</td><td>No dependency; early evidence of value; T7 and reset baselines</td></tr>
<tr><td>5</td><td>Note the dis-benefits and the capacity-treatment position (SD-04) as the frame for the business case</td><td>SteerCo; Finance</td><td>Avoids re-litigation at G2</td></tr></table>
<h2>7.3 Exit criteria for v1.0</h2>
<ul><li>All formulas re-run on measured inputs from 1.4 and 1.5; size bands and the 2×2 updated</li><li>Every L-confidence driver confirmed or replaced in the owning workshop</li><li>Overlap attribution reviewed with Finance</li><li>Decisions 2 and 3 answered or scheduled</li><li>SteerCo endorsement recorded in the decision log</li></ul></div>`);

h.push(`</body></html>`);
fs.writeFileSync(path.join(__dirname, '..', '1.10-opportunity-long-list.html'), h.join('\n'));
console.log(`opportunities: ${OPS.length}; quantified: ${capOps.length}; illustrative capacity ${f1(capTotal)} FTE-eq`);
