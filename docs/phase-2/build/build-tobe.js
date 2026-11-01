const fs = require('fs'); const path = require('path');
const { render, legend } = require('../../phase-1/build/swimlane');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const L = { CU: 'Customer', RM: 'RM', SY: 'Platform', CR: 'Credit', LS: 'Lending Services', FU: 'Fulfilment', SB: 'SBS / PS', SE: 'Securities Team', PT: 'Pattern' };

const maps = [];

// ── SC-1a
maps.push({ id: 'TB-SC1a', title: 'SC-1 Deal start · existing relationship', principles: 'DP-05, DP-08, DP-09', replaces: 'RN-1, VA-1, RF-1, CR-1, CS-1, SR-1 (start), SD-1 (start); NM-1 for Increase', ops: 'OP-10, OP-14, OP-22',
  lanes: [L.CU, L.RM, L.SY],
  steps: [
    { id: 'S1', lane: L.SY, col: 0, label: 'Trigger event: review-date task · logged request · tranche-date task · early-warning flag', type: 'start', sys: true, note: 'New: system event replaces report / email / phone (RS-11 for flags)' },
    { id: 'S2', lane: L.SY, col: 1, label: 'Connection opened: customer, parties, facilities, balances loaded', sys: true, note: 'Automated: replaces login, landing, search, locate, retrieve (PP-03); balances via integration (OP-32)' },
    { id: 'S3', lane: L.SY, col: 2, label: 'Early-warning flag evaluated (RS-11)', sys: true, ctrl: 'C7', note: 'C7 relocated from end of Credit assessment to deal start' },
    { id: 'S4', lane: L.SY, col: 3, label: 'Party completeness check (C1)', sys: true, ctrl: 'C1', note: 'New rule: partnerships / Ltd parties present' },
    { id: 'R1', lane: L.RM, col: 4, label: 'Confirm scope: renewal unchanged (P2) · change type and reason (P3) · allocation (P4)', note: 'Reason code captured (RS-03)' },
    { id: 'C1', lane: L.CU, col: 4, label: 'Customer request, where the trigger is the customer', wait: true, note: 'Digital intake or RM-logged; structured' },
    { id: 'S5', lane: L.SY, col: 5, label: 'Pattern and parameters set; rules table loaded', sys: true, note: 'Deal type, product, segment, risk band' },
    { id: 'D1', lane: L.SY, col: 6, label: 'Flag raised?', type: 'decision', sys: true },
    { id: 'E2', lane: L.RM, col: 7, label: 'Referral prompt → P5 (EX-D); route forced to R-FULL if continued', type: 'end' },
    { id: 'E1', lane: L.SY, col: 7, label: '→ SC-2 Decision core', type: 'end' },
  ],
  edges: [{ from: 'S1', to: 'S2' }, { from: 'S2', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'R1' }, { from: 'C1', to: 'R1' }, { from: 'R1', to: 'S5' }, { from: 'S5', to: 'D1' }, { from: 'D1', to: 'E2', label: 'Yes' }, { from: 'D1', to: 'E1', label: 'No' }],
  notes: ['Five manual as-is steps become one automated step (S2). The RM’s first action is to confirm scope, not to find the customer.', 'The early-warning evaluation at S3 is the exclusion gate for every fast-track route and the trigger for P5.', 'Opportunity record retired as an object; “opportunity” is a deal status.'] });

// ── SC-1b
maps.push({ id: 'TB-SC1b', title: 'SC-1 Deal start · new customer', principles: 'DP-02, DP-05, DP-09', replaces: 'NM-1, SL-1 (new-customer path)', ops: 'OP-08, OP-14, OP-29',
  lanes: [L.CU, L.RM, L.SY],
  steps: [
    { id: 'C0', lane: L.CU, col: 0, label: 'Enquiry: digital intake · Business Lending Form · call / meeting', type: 'start' },
    { id: 'S1', lane: L.SY, col: 1, label: 'Lead record created (structured; SLA to first contact)', sys: true, note: 'New: lead register (PP-01)' },
    { id: 'R1', lane: L.RM, col: 2, label: 'RM reviews lead; contacts customer', wait: true },
    { id: 'S2', lane: L.SY, col: 3, label: 'Pre-screen rule (RS-14) with outcome and reason code', type: 'decision', sys: true, ctrl: 'C0', note: 'C0 becomes a rule with recorded outcome (PP-02)' },
    { id: 'E2', lane: L.RM, col: 4, label: 'Decline recorded → EX-A', type: 'end' },
    { id: 'S3', lane: L.SY, col: 4, label: 'Customer and parties created or matched via CIF (C1)', sys: true, ctrl: 'C1' },
    { id: 'R2', lane: L.RM, col: 5, label: 'Products, limits, value, tranche schedule entered' },
    { id: 'S4', lane: L.SY, col: 6, label: 'Pattern P1 set; rules loaded; deal created', sys: true },
    { id: 'E1', lane: L.SY, col: 7, label: '→ SC-2 (R-FULL)', type: 'end' },
  ],
  edges: [{ from: 'C0', to: 'S1' }, { from: 'S1', to: 'R1' }, { from: 'R1', to: 'S2' }, { from: 'S2', to: 'E2', label: 'Fail' }, { from: 'S2', to: 'S3', label: 'Pass' }, { from: 'S3', to: 'R2' }, { from: 'R2', to: 'S4' }, { from: 'S4', to: 'E1' }],
  notes: ['Lead becomes a record with an SLA; the enquiry-to-contact gap (PP-01) is measured for the first time.', 'Pre-screen declines are recorded with a reason code, closing the conduct gap (RR-07).', 'Tranche schedule captured here is consumed by P4; the Staged Drawdown origination type is retired.'] });

// ── SC-2
maps.push({ id: 'TB-SC2', title: 'SC-2 Decision core · routes R-FULL, R-FAST, R-EXC', principles: 'DP-01, DP-02, DP-03, DP-04, DP-07', replaces: 'NM-2, RN-2, VA-2, SL-2, SR-1 / SD-1 (decision stages)', ops: 'OP-01, OP-02, OP-05, OP-06, OP-07, OP-17, OP-18',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'S0', lane: L.SY, col: 0, label: 'Deal enters SC-2 with parameters', type: 'start', sys: true },
    { id: 'D1', lane: L.SY, col: 1, label: 'Route selection (RS-01 / RS-02 / RS-03)', type: 'decision', sys: true, note: 'Flag raised → R-FULL forced' },
    { id: 'R1', lane: L.RM, col: 2, label: 'R-FAST: reduced analysis per RS-04', note: 'Eligibility evidence attached automatically' },
    { id: 'R2', lane: L.RM, col: 3, label: 'R-FULL: full analysis per RS-04 (C2)', ctrl: 'C2', note: 'Analytics on platform or integrated (OP-19)' },
    { id: 'S1', lane: L.SY, col: 2, label: 'R-EXC: validate vs pre-approved terms; limit arithmetic (C19)', sys: true, ctrl: 'C19', note: 'Automated: Σ allocations ≤ limit' },
    { id: 'C1', lane: L.CU, col: 3, label: 'Provides information via structured request (EX-B)', wait: true },
    { id: 'S2', lane: L.SY, col: 4, label: 'Submission standard enforced (C3 as rules, RS-04)', sys: true, ctrl: 'C3', note: 'Cannot submit until items present (OP-17)' },
    { id: 'S3', lane: L.SY, col: 5, label: 'DA determination (C5, RS-05); authority level and rule version recorded', sys: true, ctrl: 'C5', note: 'Automated (OP-06); manual override with reason' },
    { id: 'D2', lane: L.SY, col: 6, label: 'Within authority?', type: 'decision', sys: true },
    { id: 'R3', lane: L.RM, col: 7, label: 'Approve within authority (RM / line per RS-13); evidence recorded' },
    { id: 'S4', lane: L.SY, col: 7, label: 'Credit queue task (SLA, timer)', sys: true, wait: true, note: 'Queue visible to RM (OP-11)' },
    { id: 'K1', lane: L.CR, col: 8, label: 'Assessment (C6); distress judgement retained (C7)', ctrl: 'C6' },
    { id: 'D3', lane: L.CR, col: 9, label: 'Decision?', type: 'decision' },
    { id: 'X1', lane: L.CR, col: 10, label: 'Defer → EX-B (max 2 loops)', type: 'sub' },
    { id: 'X2', lane: L.RM, col: 10, label: 'Decline → EX-A', type: 'sub' },
    { id: 'S5', lane: L.SY, col: 11, label: 'Decision, terms, conditions recorded; approved terms become document source', sys: true },
    { id: 'K2', lane: L.CR, col: 12, label: 'Post-approval sampling of R-FAST approvals (CE-001)', ctrl: 'C6', note: 'New compensating control' },
    { id: 'E1', lane: L.SY, col: 13, label: '→ SC-3 Completion', type: 'end' },
  ],
  edges: [{ from: 'S0', to: 'D1' }, { from: 'D1', to: 'R1', label: 'R-FAST' }, { from: 'D1', to: 'R2', label: 'R-FULL' }, { from: 'D1', to: 'S1', label: 'R-EXC' }, { from: 'R1', to: 'S2' }, { from: 'R2', to: 'S2' }, { from: 'S1', to: 'S2' }, { from: 'C1', to: 'R2' },
    { from: 'S2', to: 'S3' }, { from: 'S3', to: 'D2' }, { from: 'D2', to: 'R3', label: 'Yes' }, { from: 'D2', to: 'S4', label: 'No' }, { from: 'S4', to: 'K1' }, { from: 'K1', to: 'D3' }, { from: 'D3', to: 'X1', label: 'Defer' }, { from: 'D3', to: 'X2', label: 'Decline' }, { from: 'D3', to: 'S5', label: 'Approve' }, { from: 'R3', to: 'S5' }, { from: 'X1', to: 'S2', label: 'Resubmit (counter)' }, { from: 'S5', to: 'K2', label: 'R-FAST only' }, { from: 'S5', to: 'E1' }],
  notes: ['One configured flow; three routes selected by rules on system-held data. Deal type is a column in RS-01 to RS-05, not a workflow.', 'The deferral loop is bounded (RS-09) and the submission standard (S2) is intended to make it the exception.', 'R-FAST bypasses K1 for eligible deals; equivalence is the automated DA determination with recorded evidence plus Credit sampling (CE-001). Activation depends on G1 decision 2.', 'The “Progress?” judgement on the as-is maps becomes a recorded decision with reason (withdraw / decline / proceed).'] });

// ── SC-3
maps.push({ id: 'TB-SC3', title: 'SC-3 Completion · gates G-DOC, G-SEC, G-CP', principles: 'DP-04, DP-06, DP-07, DP-09', replaces: 'NM-3, VA-3, SL-3, SR-2, SD-2, RN-3; EX-05', ops: 'OP-13, OP-15, OP-16, OP-21',
  lanes: [L.CU, L.RM, L.SY, L.LS, L.FU],
  steps: [
    { id: 'S0', lane: L.SY, col: 0, label: 'Approved terms and conditions', type: 'start', sys: true },
    { id: 'S1', lane: L.SY, col: 1, label: 'Letter generated from terms (RS-06); letter-required rule applied', sys: true, note: 'Templates per pattern and product incl. tranches, shadow limits' },
    { id: 'S2', lane: L.SY, col: 2, label: 'E-delivery; status: issued', sys: true, note: 'Wet-ink exception path (DB-05)' },
    { id: 'C1', lane: L.CU, col: 3, label: 'Customer e-signs and returns', wait: true, note: 'Chase timers EX-E (RS-08)' },
    { id: 'S3', lane: L.SY, col: 4, label: 'Return reconciled to terms (C8 automated); G-DOC met', sys: true, ctrl: 'C8' },
    { id: 'S4', lane: L.SY, col: 1, label: 'Security instruction generated from conditions (C23); LS task', sys: true, ctrl: 'C23', note: 'Only when RS-07 says security changes' },
    { id: 'G1', lane: L.LS, col: 2, label: 'Lending Services queue (SLA): prepare, execute, register', wait: true, ctrl: 'C10' },
    { id: 'G2', lane: L.LS, col: 4, label: 'Security complete with registration evidence; G-SEC met', ctrl: 'C10' },
    { id: 'S5', lane: L.SY, col: 1, label: 'CP checklist itemised from conditions (C9)', sys: true, ctrl: 'C9' },
    { id: 'R1', lane: L.RM, col: 3, label: 'Evidence each CP; single view of all gates', note: 'OP-13' },
    { id: 'D1', lane: L.SY, col: 5, label: 'All applicable gates met?', type: 'decision', sys: true },
    { id: 'X1', lane: L.RM, col: 6, label: 'Staleness control EX-E (chase, extend, re-validate)', type: 'sub', note: 'Replaces 3-month reset (CE-002)' },
    { id: 'S6', lane: L.SY, col: 6, label: 'Fulfilment task created (SLA)', sys: true, wait: true, note: 'Replaces message (PP-29)' },
    { id: 'F1', lane: L.FU, col: 7, label: 'Fulfil on product systems (C11); funds released; account recorded', ctrl: 'C11' },
    { id: 'S7', lane: L.SY, col: 8, label: 'Status: fulfilled; RM notified; stage timestamps written', sys: true },
    { id: 'E1', lane: L.SY, col: 9, label: 'Deal complete', type: 'end' },
  ],
  edges: [{ from: 'S0', to: 'S1' }, { from: 'S1', to: 'S2' }, { from: 'S2', to: 'C1' }, { from: 'C1', to: 'S3' }, { from: 'S0', to: 'S4' }, { from: 'S4', to: 'G1' }, { from: 'G1', to: 'G2' }, { from: 'S0', to: 'S5' }, { from: 'S5', to: 'R1' },
    { from: 'S3', to: 'D1' }, { from: 'G2', to: 'D1' }, { from: 'R1', to: 'D1' }, { from: 'D1', to: 'S6', label: 'Yes' }, { from: 'D1', to: 'X1', label: 'Overdue' }, { from: 'S6', to: 'F1' }, { from: 'F1', to: 'S7' }, { from: 'S7', to: 'E1' }],
  notes: ['Three gates run in parallel from the approved terms; the single view (R1) replaces three disconnected flags.', 'The letter is a system object with status; issue, return and reconciliation are facts, not mailbox searches. C4 (document check) becomes the reconciliation at S3.', 'Variants: Short (P2: G-DOC only, letter per rule), Gated (P3: G-SEC only if security changes; fulfilment only if facility changes), Light (P4), Full (P1).', 'Removal variant (P3) is mapped separately (TB-P3R).'] });

// ── P3 removal
maps.push({ id: 'TB-P3R', title: 'P3 Servicing change · removal variant', principles: 'DP-03, DP-04, DP-09', replaces: 'RF-2', ops: 'OP-02, OP-26',
  lanes: [L.RM, L.SY, L.SE, L.FU],
  steps: [
    { id: 'S0', lane: L.SY, col: 0, label: 'Reason = Removal (RS-03)', type: 'start', sys: true },
    { id: 'S1', lane: L.SY, col: 1, label: 'Balance = 0 check (C12); shared-security check', type: 'decision', sys: true, ctrl: 'C12', note: 'System checks balance; identifies security shared with other facilities' },
    { id: 'R1', lane: L.RM, col: 2, label: 'Arrange repayment; re-allocation of shared security (→ SC-2 if exposure elsewhere depends on it)', wait: true },
    { id: 'S2', lane: L.SY, col: 3, label: 'Securities task: physical release', sys: true },
    { id: 'Q1', lane: L.SE, col: 4, label: 'Release charge / guarantee; evidence attached (C10)', ctrl: 'C10', wait: true },
    { id: 'S3', lane: L.SY, col: 5, label: 'System release of security and covenants (after physical release)', sys: true, note: 'Sequence corrected (PP-30)' },
    { id: 'S4', lane: L.SY, col: 6, label: 'Fulfilment task: remove facility', sys: true },
    { id: 'F1', lane: L.FU, col: 7, label: 'Facility removed on product systems (C11)', ctrl: 'C11' },
    { id: 'S5', lane: L.SY, col: 8, label: 'Associated-party deals updated (rule); status: removed; RM notified', sys: true, note: 'Resolves RF-2 TBC' },
    { id: 'E1', lane: L.SY, col: 9, label: 'Complete', type: 'end' },
  ],
  edges: [{ from: 'S0', to: 'S1' }, { from: 'S1', to: 'R1', label: 'Balance > 0 or shared' }, { from: 'S1', to: 'S2', label: 'Clear' }, { from: 'R1', to: 'S1' }, { from: 'S2', to: 'Q1' }, { from: 'Q1', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'F1' }, { from: 'F1', to: 'S5' }, { from: 'S5', to: 'E1' }],
  notes: ['Four messages become two tasks with SLAs.', 'Physical release precedes system release; the as-is order is reversed.', 'Shared security is checked by rule before release, closing the exposure gap noted on RF-2.'] });

// ── P5
maps.push({ id: 'TB-P5', title: 'P5 Distressed connection', principles: 'DP-08, DP-09, DP-02', replaces: 'CR-1, CR-2, CS-1, CS-2, EX-04', ops: 'OP-20, OP-22, OP-23, OP-26',
  lanes: [L.RM, L.SY, L.CR, L.SB],
  steps: [
    { id: 'S0', lane: L.SY, col: 0, label: 'Trigger: early-warning flag (RS-11) · RM request · in-flight referral (EX-D)', type: 'start', sys: true },
    { id: 'S1', lane: L.SY, col: 1, label: 'Referral record on connection; linked live deals; status decision captured (hold / continue / decline)', sys: true, note: 'Record, not file transfer' },
    { id: 'R1', lane: L.RM, col: 2, label: 'RM completes referral summary (structured)' },
    { id: 'K1', lane: L.CR, col: 3, label: 'Credit authority decision (C13)', ctrl: 'C13' },
    { id: 'B1', lane: L.SB, col: 3, label: 'SBS categorisation review (C14) — parallel where CAP policy allows (PQ-002)', ctrl: 'C14' },
    { id: 'D1', lane: L.SY, col: 4, label: 'Accepted?', type: 'decision', sys: true },
    { id: 'E2', lane: L.RM, col: 5, label: 'Returned: connection mainstream; flag history retained', type: 'end' },
    { id: 'S2', lane: L.SY, col: 5, label: 'Categorisation data; ownership transfer to SBS with audit (C26)', sys: true, ctrl: 'C26', note: 'Replaces mass officer-code batch for this use' },
    { id: 'B2', lane: L.SB, col: 6, label: 'Forbearance assessment (C15)', ctrl: 'C15', note: 'Regulatory; protected F10' },
    { id: 'B3', lane: L.SB, col: 7, label: 'Strategy record: structured memo (C16)', ctrl: 'C16', note: 'On platform (OP-20)' },
    { id: 'B4', lane: L.SB, col: 8, label: 'Recovery data: ERV, provisions, write-offs (C17)', ctrl: 'C17', note: 'Validation rules on entry; protected F11' },
    { id: 'B5', lane: L.SB, col: 9, label: 'SBS approval (C18); authority recorded', ctrl: 'C18' },
    { id: 'S3', lane: L.SY, col: 10, label: 'Outcome recorded: retention exit / recovery / return to mainstream', sys: true },
    { id: 'E1', lane: L.SY, col: 11, label: 'Strategy in place', type: 'end' },
  ],
  edges: [{ from: 'S0', to: 'S1' }, { from: 'S1', to: 'R1' }, { from: 'R1', to: 'K1' }, { from: 'R1', to: 'B1' }, { from: 'K1', to: 'D1' }, { from: 'B1', to: 'D1' }, { from: 'D1', to: 'E2', label: 'No' }, { from: 'D1', to: 'S2', label: 'Yes' }, { from: 'S2', to: 'B2' }, { from: 'B2', to: 'B3' }, { from: 'B3', to: 'B4' }, { from: 'B4', to: 'B5' }, { from: 'B5', to: 'S3' }, { from: 'S3', to: 'E1' }],
  notes: ['Referral and strategy become one pattern with a referral record, not two deal types.', 'Credit and SBS review in parallel where CAP policy permits (PQ-002); sequential otherwise. Either way, the memo is read once from a shared record.', 'All regulatory fields (F10, F11) captured in structured, validated form at the same steps as today.'] });

// ── Exception paths
maps.push({ id: 'TB-EXA', title: 'EX-A Decline, appeal, refer', principles: 'DP-02, DP-07', replaces: 'EX-01 (straw-man)', ops: 'OP-08',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'S0', lane: L.SY, col: 0, label: 'Decline at any point (pre-screen, RM, Credit)', type: 'start', sys: true },
    { id: 'S1', lane: L.SY, col: 1, label: 'Reason code and narrative recorded (RS-14 / Credit codes)', sys: true, note: 'Feeds RR-07' },
    { id: 'R1', lane: L.RM, col: 2, label: 'Customer informed: templated communication (C20)', ctrl: 'C20' },
    { id: 'C1', lane: L.CU, col: 3, label: 'Appeal within window?', type: 'decision', wait: true },
    { id: 'E1', lane: L.SY, col: 4, label: 'Closed: declined', type: 'end' },
    { id: 'S2', lane: L.SY, col: 4, label: 'Appeal record; independent reviewer assigned (C21)', sys: true, ctrl: 'C21' },
    { id: 'K1', lane: L.CR, col: 5, label: 'Independent review (not original assessor)', ctrl: 'C21' },
    { id: 'D1', lane: L.CR, col: 6, label: 'Outcome?', type: 'decision' },
    { id: 'E3', lane: L.SY, col: 7, label: 'Overturned → re-enter SC-2 at S2', type: 'end' },
    { id: 'X1', lane: L.RM, col: 3, label: 'Refer: defined destinations (alternative product / specialist)', type: 'sub' },
  ],
  edges: [{ from: 'S0', to: 'S1' }, { from: 'S1', to: 'R1' }, { from: 'R1', to: 'C1' }, { from: 'R1', to: 'X1', label: 'Refer' }, { from: 'C1', to: 'E1', label: 'No' }, { from: 'C1', to: 'S2', label: 'Yes' }, { from: 'S2', to: 'K1' }, { from: 'K1', to: 'D1' }, { from: 'D1', to: 'E1', label: 'Upheld' }, { from: 'D1', to: 'E3', label: 'Overturned' }],
  notes: ['Every decline has a reason code; every appeal has an independent reviewer; “refer” has defined destinations.'] });

maps.push({ id: 'TB-EXB', title: 'EX-B Structured deferral (bounded)', principles: 'DP-04, DP-06, DP-07', replaces: 'EX-02 (straw-man); loop on every *-2 map', ops: 'OP-17, OP-18',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'K0', lane: L.CR, col: 0, label: 'Assessor defers', type: 'start' },
    { id: 'S1', lane: L.SY, col: 1, label: 'Structured request: items, owner, due date; loop counter +1 (RS-09)', sys: true, note: 'Replaces free-text comment' },
    { id: 'R1', lane: L.RM, col: 2, label: 'RM actions items; customer items forwarded', wait: true },
    { id: 'C1', lane: L.CU, col: 3, label: 'Customer responds through platform request', wait: true },
    { id: 'S2', lane: L.SY, col: 4, label: 'Items complete? Resubmit; same assessor retained', type: 'decision', sys: true },
    { id: 'K1', lane: L.CR, col: 5, label: 'Re-assessment (C6)', ctrl: 'C6' },
    { id: 'D1', lane: L.SY, col: 6, label: 'Counter = 2 and still deferred?', type: 'decision', sys: true },
    { id: 'K2', lane: L.CR, col: 7, label: 'Escalation: Credit manager decides (approve with conditions / decline / one further loop with reason)', ctrl: 'C6' },
    { id: 'E1', lane: L.SY, col: 8, label: 'Decision recorded', type: 'end' },
  ],
  edges: [{ from: 'K0', to: 'S1' }, { from: 'S1', to: 'R1' }, { from: 'R1', to: 'C1' }, { from: 'C1', to: 'S2' }, { from: 'S2', to: 'K1', label: 'Yes' }, { from: 'K1', to: 'D1' }, { from: 'D1', to: 'S1', label: 'No – loop' }, { from: 'D1', to: 'K2', label: 'Yes' }, { from: 'K2', to: 'E1' }, { from: 'K1', to: 'E1', label: 'Decided' }],
  notes: ['Maximum two loops before escalation; every loop measured (R2, R3).', 'The structured request is the data that improves RS-04 over time: items requested most often become submission-standard items.'] });

maps.push({ id: 'TB-EXC', title: 'EX-C Post-approval change (materiality)', principles: 'DP-01, DP-02, DP-07', replaces: 'EX-03 (straw-man)', ops: 'OP-09',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'C0', lane: L.CU, col: 0, label: 'Customer changes requirement after approval', type: 'start' },
    { id: 'R1', lane: L.RM, col: 1, label: 'Change captured against approved terms (fields changed)' },
    { id: 'S1', lane: L.SY, col: 2, label: 'Materiality rule (RS-12)', type: 'decision', sys: true, ctrl: 'C22' },
    { id: 'S2', lane: L.SY, col: 3, label: 'Non-material: terms and documents regenerated; approval stands; change logged', sys: true },
    { id: 'S3', lane: L.SY, col: 3, label: 'Material: return to SC-2 at S2 with change highlighted; prior assessor retained', sys: true, type: 'task' },
    { id: 'K1', lane: L.CR, col: 4, label: 'Re-assessment of the change only (C6)', ctrl: 'C6' },
    { id: 'E1', lane: L.SY, col: 5, label: '→ SC-3 (documents regenerated)', type: 'end' },
  ],
  edges: [{ from: 'C0', to: 'R1' }, { from: 'R1', to: 'S1' }, { from: 'S1', to: 'S2', label: 'Non-material' }, { from: 'S1', to: 'S3', label: 'Material' }, { from: 'S3', to: 'K1' }, { from: 'K1', to: 'E1' }, { from: 'S2', to: 'E1' }],
  notes: ['C22 becomes a rule (RS-12) rather than an undefined practice; re-assessment is of the change, not the deal.'] });

maps.push({ id: 'TB-EXE', title: 'EX-E Graduated staleness control', principles: 'DP-03, DP-04, DP-07', replaces: '3-month reset on *-3 maps', ops: 'OP-16, OP-30 (interim)',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'S0', lane: L.SY, col: 0, label: 'Letter issued; timer starts', type: 'start', sys: true },
    { id: 'S1', lane: L.SY, col: 1, label: 'Automated chase at 2, 4, 8 weeks (RS-08)', sys: true },
    { id: 'C1', lane: L.CU, col: 2, label: 'Customer returns', wait: true },
    { id: 'R1', lane: L.RM, col: 3, label: 'Week 10: RM extension with reason, or withdraw', },
    { id: 'S2', lane: L.SY, col: 4, label: 'Month 3: re-validation of key facts (RS-08 items) — not full re-approval', sys: true, ctrl: 'C8', note: 'CE-002' },
    { id: 'D1', lane: L.SY, col: 5, label: 'Material change or month 6?', type: 'decision', sys: true },
    { id: 'E1', lane: L.SY, col: 6, label: 'Continue to G-DOC', type: 'end' },
    { id: 'K1', lane: L.CR, col: 6, label: 'Reset → SC-2 (full re-approval)', ctrl: 'C6' },
  ],
  edges: [{ from: 'S0', to: 'S1' }, { from: 'S1', to: 'C1' }, { from: 'C1', to: 'E1', label: 'Returned' }, { from: 'S1', to: 'R1', label: 'Not returned' }, { from: 'R1', to: 'S2' }, { from: 'S2', to: 'D1' }, { from: 'D1', to: 'E1', label: 'No' }, { from: 'D1', to: 'K1', label: 'Yes' }],
  notes: ['Equivalence case CE-002: the as-is control (hard reset at 3 months) is replaced by chase evidence, an RM extension with reason, a re-validation of the facts the approval depended on, and a reset only on material change or at 6 months. Second line signs the item list for re-validation.'] });

// ── Pattern compositions (one lane view)
function comp(id, title, nodes, edges, notes, replaces) {
  return { id, title, principles: 'DP-01, DP-10', replaces, ops: '—', lanes: [L.PT], steps: nodes.map((n, i) => ({ id: `N${i + 1}`, lane: L.PT, col: i, label: n, type: i === 0 ? 'start' : i === nodes.length - 1 ? 'end' : (n.startsWith('SC') || n.startsWith('EX') ? 'sub' : 'task') })), edges: edges || nodes.slice(1).map((_, i) => ({ from: `N${i + 1}`, to: `N${i + 2}` })), notes, isComp: true };
}
maps.push(comp('TB-P1', 'P1 New or increased lending · composition', ['Lead / request', 'SC-1b New or SC-1a Increase', 'Product, limits, tranches', 'SC-2 R-FULL', 'SC-3 Full (G-DOC, G-SEC, G-CP)', 'Initial funds? else wait for P4', 'Live facility'], null, ['R-FULL only in Release 1; Increase fast-track is a later candidate.', 'Shadow limit with no initial drawdown ends after G-DOC and is drawn via P4.'], 'NM-1/2/3, SL-1/2/3'));
maps.push(comp('TB-P2', 'P2 Renewal · composition', ['Review-date task', 'SC-1a', 'Structural-change validation (RS-10 / P3 divert)', 'SC-2 R-FAST or R-FULL (RS-01)', 'SC-3 Short (letter per RS-06)', 'Renewed'], null, ['Eligibility (RS-01) and early-warning exclusion decide the route; EPR is a parameter with a counter.', 'Any structural change diverts to P3 before SC-2.'], 'RN-1/2/3'));
maps.push(comp('TB-P3', 'P3 Servicing change · composition', ['Logged request', 'SC-1a with reason codes (RS-03)', 'Materiality rule', 'SC-2 R-FAST (admin) or R-FULL', 'SC-3 Gated (G-SEC if security changes; fulfil if facility changes)', 'Varied'], null, ['Removal reason routes to TB-P3R.', 'EX-C enters here from any pattern.'], 'VA-1/2/3, RF-1, EX-03'));
maps.push(comp('TB-P4', 'P4 Pre-approved drawdown · composition', ['Request or tranche task', 'SC-1a opens pre-approved deal', 'Allocation capture; limit arithmetic (C19)', 'SC-2 R-EXC (RS-02 triggers → R-FULL)', 'SC-3 Light (notice + letter; tranche confirmation)', 'Funds released'], null, ['Repayment schedule regenerated per tranche by the system.', 'Off-platform letters end: tranche confirmation and reduced-limit notice are templates.'], 'SR-1/2, SD-1/2'));

// ── Disposition register (from 1.3 step rows)
const DISP = [
  ['1.01', 'Trigger / lead received', 'A', 'SC-1 S1', 'System event replaces report / phone / email', 'DP-05', '—'],
  ['1.02', 'Login', 'E', '—', 'SSO; no separate login', 'DP-05', '—'],
  ['1.03', 'View landing page', 'C', 'Work queue', 'Landing page becomes the task queue', 'DP-04, DP-05', '—'],
  ['1.04', 'Search for customer', 'E', 'SC-1a S2', 'Trigger identifies the customer; search only on SC-1b', 'DP-05', 'C1 retained in SC-1b'],
  ['1.05', 'Customer located', 'A', 'SC-1a S2', 'Loaded with the event', 'DP-05', '—'],
  ['1.06', 'Record customer details (new)', 'A', 'SC-1b S3', 'Created or matched via CIF', 'DP-09', 'C1 strengthened'],
  ['1.07', 'Retrieve customer details / identify contact', 'A', 'SC-1a S2', 'Parties loaded; completeness checked', 'DP-05, DP-09', 'C1'],
  ['1.08', 'Any additional parties?', 'A', 'SC-1a S4', 'Party completeness rule', 'DP-02', 'C1 strengthened'],
  ['1.09', 'Lending or deposit?', 'R', 'SC-1 (per SD-03)', 'Deposit status on connection or CRM', 'DP-09', '—'],
  ['1.10', 'Create opportunity', 'E', '—', 'Opportunity is a deal status, not an object', 'DP-05', '—'],
  ['1.11', 'Select product(s)', 'R', 'SC-1b R2 / P1', 'Retained; tranche schedule captured as data', 'DP-09', '—'],
  ['1.12', 'Passes initial overview?', 'A', 'SC-1b S2', 'Rule with recorded outcome and reason', 'DP-02', 'C0 strengthened'],
  ['1.13', 'Contact customer to progress', 'R', 'SC-1b R1', 'Retained with SLA from lead', 'DP-04', '—'],
  ['1.14', 'Details of existing deal pulled through', 'A', 'SC-1a S2', 'Loaded with the event', 'DP-05', '—'],
  ['1.15', 'Provide existing product balances', 'A', 'SC-1a S2', 'Integration; refreshed at submission', 'DP-09', '—'],
  ['1.16', 'Create credit application / select deal type', 'E', 'SC-1a S5', 'Pattern set by trigger; deal type a parameter', 'DP-01', '—'],
  ['1.17', 'Add / edit products within pre-approved limit', 'A', 'SC-2 S1 (R-EXC)', 'Limit arithmetic enforced', 'DP-02', 'C19 strengthened'],
  ['2.01', 'Convert / progress deal', 'E', '—', 'No separate conversion; deal exists from SC-1', 'DP-05', '—'],
  ['2.02', 'Pull through existing deal; balances', 'A', 'SC-1a S2', 'As 1.14 / 1.15', 'DP-05', '—'],
  ['2.03', 'Customer analysis', 'R', 'SC-2 R1 / R2', 'Content per RS-04 by route', 'DP-01', 'C2'],
  ['2.04', 'Credit analytics (C2)', 'R', 'SC-2 R2; integrated (OP-19)', '“If required” replaced by RS-04', 'DP-01, DP-02', 'C2 strengthened'],
  ['2.05', 'Customer provides additional information', 'A', 'EX-B', 'Structured request on platform', 'DP-06', '—'],
  ['2.06', 'Update system incl. balances', 'A', 'SC-2', 'Continuous; no separate step', 'DP-09', '—'],
  ['2.07', 'Progress? (RM go / no-go)', 'R', 'SC-2', 'Recorded decision with reason (withdraw / proceed)', 'DP-02', '—'],
  ['2.08', 'Validate the deal (C3)', 'A', 'SC-2 S2', 'Submission standard as system rules', 'DP-02, DP-07', 'C3 strengthened'],
  ['2.09', 'Check facility letter / agreement docs (C4)', 'A', 'SC-3 S3', 'Reconciliation of returned letter to terms; letter generated from terms', 'DP-06', 'C4 → reconciliation'],
  ['2.10', 'Within delegated authority? (C5)', 'A', 'SC-2 S3', 'Automated determination; level recorded', 'DP-02', 'C5 strengthened'],
  ['2.11', 'Deal transferred to Credit', 'A', 'SC-2 S4', 'Queue task with SLA', 'DP-04', '—'],
  ['2.12', 'Deal is assessed (C6)', 'R', 'SC-2 K1', 'Retained for R-FULL outside authority; sampling for R-FAST', 'DP-03', 'C6; CE-001'],
  ['2.13', 'Client in financial distress? (C7)', 'C', 'SC-1a S3 + SC-2 K1', 'Flag at start; judgement retained in assessment', 'DP-08', 'C7 relocated'],
  ['2.14', 'Credit decision', 'R', 'SC-2 D3 / R3', 'Retained; recorded with authority', 'DP-02', 'C6'],
  ['2.15', 'Deferred – further info loop', 'R', 'EX-B', 'Bounded, structured, measured', 'DP-07', '—'],
  ['2.16', 'Declined → EX-01', 'R', 'EX-A', 'Reason codes; appeal; refer', 'DP-07', 'C20, C21'],
  ['2.17', 'Credit approved within DA', 'R', 'SC-2 R3', 'Retained with evidence', 'DP-02', 'C5'],
  ['2.18', 'Update with approved decision', 'A', 'SC-2 S5', 'Terms become document source', 'DP-06', '—'],
  ['2.19', 'Transfer to SBS; categorisation (C14)', 'R', 'P5 B1', 'Referral record; parallel where policy allows', 'DP-08', 'C14; PQ-002'],
  ['2.20', 'Forbearance; team transfer; officer reassignment (C15)', 'R', 'P5 B2, S2', 'Retained; ownership transfer with audit', 'DP-09', 'C15, C26'],
  ['2.21', 'CAP Strategy memo; recovery updates; SBS approval', 'R', 'P5 B3–B5', 'Structured memo; validated fields', 'DP-06, DP-09', 'C16, C17, C18'],
  ['2.22', 'In-flight CAP referral', 'R', 'EX-D → P5', 'Referral record; live-deal status explicit', 'DP-08', 'C7'],
  ['3.01', 'Trigger facility letter(s)', 'A', 'SC-3 S1', 'Generated from terms; letter-required rule', 'DP-06', '—'],
  ['3.02', 'RM advises Lending Services to prepare security', 'A', 'SC-3 S4', 'Instruction generated from conditions when RS-07 applies', 'DP-06', 'C23 strengthened'],
  ['3.03', 'FAL created and copy stored', 'A', 'SC-3 S1', 'System object with status', 'DP-06', '—'],
  ['3.04', 'FAL sent by post / secure email (manual)', 'A', 'SC-3 S2', 'E-delivery; wet-ink exception', 'DP-06', '—'],
  ['3.05', 'Customer needs to sign?', 'A', 'SC-3 S1 (RS-06)', 'Rule, not judgement', 'DP-02', '—'],
  ['3.06', 'Customer signs and returns', 'R', 'SC-3 C1', 'E-signature; tracked', 'DP-06', '—'],
  ['3.07', '3-month unreturned → pre-credit', 'R', 'EX-E', 'Graduated control', 'DP-03, DP-07', 'CE-002'],
  ['3.08', 'FAL checked (C8)', 'A', 'SC-3 S3', 'Reconciliation automated for e-signed; manual for wet-ink', 'DP-06', 'C8'],
  ['3.09', 'FAL updated as complete', 'A', 'SC-3 S3', 'Gate G-DOC', 'DP-04', '—'],
  ['3.10', 'All pre-conditions met (C9)', 'A', 'SC-3 S5 / R1', 'Itemised, evidenced', 'DP-02', 'C9 strengthened'],
  ['3.11', 'Lending Services mark security complete (C10)', 'R', 'SC-3 G2', 'Retained with registration evidence; queue', 'DP-04', 'C10'],
  ['3.12', 'BLP marked ready for fulfilment', 'A', 'SC-3 D1', 'Gates evaluated by system', 'DP-04', '—'],
  ['3.13', 'Facility change required? / initial funds?', 'A', 'SC-3 variants', 'Rule by pattern and reason', 'DP-01', '—'],
  ['3.14', 'Message sent to fulfilment team', 'A', 'SC-3 S6', 'Task with SLA', 'DP-04', '—'],
  ['3.15', 'Facility / funding fulfilled (C11)', 'R', 'SC-3 F1', 'Retained; terms flow from deal (integration later)', 'DP-10', 'C11'],
  ['3.16', 'RM advised; BLP updated', 'A', 'SC-3 S7', 'Notification and timestamps', 'DP-09', '—'],
  ['3.17', 'Repay balance; release security (C12)', 'R', 'TB-P3R', 'Sequence corrected; shared-security check', 'DP-03', 'C12, C10'],
  ['4.01', 'Change after approval → re-process', 'R', 'EX-C', 'Materiality rule', 'DP-07', 'C22 → RS-12'],
  ['4.02', 'EPR caps', 'A', 'P2 (RS-10)', 'Counter enforced', 'DP-02', '—'],
  ['4.03', 'Renewal: only dates change', 'A', 'P2 structural validation', 'System validates; divert to P3', 'DP-01', '—'],
  ['4.04', 'Skip CDQ → PDQ; DCA 5', 'A', 'SC-2 R-EXC (RS-02)', 'Rule-based route', 'DP-01', 'C5'],
  ['4.05', 'Auto-reoriginate at 90 days (batch)', 'R', 'Workflow timer (OP-12)', 'Warning at 60 / 80 days; reset with reason', 'DP-04', 'C24'],
  ['4.06', 'Restructure flag', 'R', 'P1 parameter', 'Retained', '—', '—'],
];
const dispName = { E: 'Eliminated', A: 'Automated', C: 'Consolidated', R: 'Retained' };
const counts = {}; DISP.forEach(d => counts[d[2]] = (counts[d[2]] || 0) + 1);

// ── Document
let h = [];
h.push(`<!doctype html><html><head><meta charset="utf-8"><title>2.3 To-Be Process Maps L3/L4</title><link rel="stylesheet" href="../phase-1/build/style.css"><style>
@page { size: A3 landscape; margin: 14mm 16mm 16mm 16mm; }
body { font-size: 9.6pt; }
th, td { font-size: 8.3pt; padding: 1.8pt 4pt; }
.hdr { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6pt; margin-bottom: 4pt; }
.hdr div { border: 1px solid #b8c4d0; padding: 3pt 5pt; font-size: 8pt; background: #f7f9fb; }
.hdr b { color: #0b3d6b; }
.svgbox { border: 1px solid #d8dee5; padding: 3pt; margin: 3pt 0 6pt 0; }
.E { background: #fbe9e7; } .A { background: #e6edf5; } .C { background: #fff8e6; } .R { background: #f7f9fb; }
.cover h1 { font-size: 24pt; }
</style></head><body>`);
h.push(`<div class="cover" style="padding-top:55mm"><p class="small" style="letter-spacing:1px;text-transform:uppercase">Business Bank · Business Banking Transformation Office · BB-BLP-BPR</p>
<h1>2.3 To-Be Process Maps L3/L4<br/><span style="font-size:15pt;color:#1f4f82">Shared components, patterns and exception paths, with every as-is step dispositioned</span></h1>
<table class="meta" style="width:60%;margin-top:20pt"><tr><td>Deliverable</td><td>2.3 To-be process maps per pattern and shared component; disposition of every as-is step</td></tr><tr><td>Version</td><td>0.6 – design draft for working-group review (Weeks 9–10) and RM / Credit preview (Week 11); v1.0 at Design Authority sign-off (Week 12)</td></tr>
<tr><td>Derived from</td><td>2.1 principles; 2.2 pattern definitions; 1.2 as-is maps (same notation); 1.3 step matrix (disposition rows); 1.6 controls; 1.10 opportunities</td></tr><tr><td>Owner</td><td>WS1 Journeys &amp; Process</td></tr><tr><td>Accepted by</td><td>Design Authority; subject to 2.5 equivalence entries CE-001, CE-002 and policy questions PQ-001, PQ-002</td></tr></table></div>`);

h.push(`<div class="pb"><h1>How to read this document</h1>
<h2>Legend</h2><div class="svgbox" style="width:70%">${legend()}</div>
<div class="two"><div>
<h2>Structure</h2><p>Section 1 maps the three shared components (SC-1a, SC-1b, SC-2, SC-3), which carry most of the design. Section 2 maps the pattern-specific segments (P3 removal, P5) and the four exception paths that are now first-class. Section 3 shows each pattern as a composition. Section 4 is the disposition register: every one of the 62 as-is step rows from 1.3, marked Eliminated, Automated, Consolidated or Retained, with the to-be location, the reason, the principle applied and the control effect. Section 5 lists the design decision records and the equivalence and policy items the maps depend on.</p>
<h2>Conventions</h2><p>Same notation as 1.2. Grey boxes are platform (automated) steps; Cn badges are controls from 1.6, retained or relocated; new controls are named in notes. Where a step is labelled with an RS-nn reference, its behaviour is set by that rules table in 2.4 rather than by the map.</p>
</div><div>
<h2>What changes, in numbers</h2>
<table><tr><th>Disposition</th><th>As-is step rows</th><th>Meaning</th></tr>
<tr class="E"><td>Eliminated</td><td class="num">${counts.E}</td><td>Work stops; the need is removed by design</td></tr>
<tr class="A"><td>Automated</td><td class="num">${counts.A}</td><td>The platform performs it, with evidence</td></tr>
<tr class="C"><td>Consolidated</td><td class="num">${counts.C}</td><td>Merged with another step or relocated</td></tr>
<tr class="R"><td>Retained</td><td class="num">${counts.R}</td><td>Still a human step, usually with a rule or evidence added</td></tr></table>
<p>Of the ${DISP.length} rows, ${counts.E + counts.A} (${Math.round(100 * (counts.E + counts.A) / DISP.length)}%) are eliminated or automated. No regulatory control is eliminated; four controls are relocated or converted to reconciliations; nine are strengthened.</p>
</div></div></div>`);

const section = (t) => h.push(`<div class="pb"><h1>${t}</h1></div>`);
function mapPage(m) {
  h.push(`<div class="pb"><h1>${m.id} · ${esc(m.title)}</h1>
<div class="hdr"><div><b>Principles applied</b><br/>${esc(m.principles)}</div><div><b>Replaces (1.2)</b><br/>${esc(m.replaces)}</div><div><b>Opportunities (1.10)</b><br/>${esc(m.ops)}</div><div><b>Lanes</b><br/>${m.lanes.join(' · ')}</div></div>
<div class="svgbox">${render(m)}</div>
<h3>Design notes</h3><ul>${m.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>`);
  if (!m.isComp) {
    h.push(`<h3>L4 step table</h3><table><tr><th style="width:4%">ID</th><th style="width:11%">Lane</th><th style="width:34%">Step</th><th style="width:8%">Type</th><th style="width:6%">Control</th><th style="width:5%">Wait</th><th>Note / rule reference</th></tr>`);
    for (const s of m.steps.filter(s => s.type !== 'note')) h.push(`<tr><td>${s.id}</td><td>${esc(s.lane)}</td><td>${esc(s.label)}</td><td>${s.type === 'decision' ? 'Decision' : s.type === 'start' ? 'Start' : s.type === 'end' ? 'End' : s.type === 'sub' ? 'Sub-process' : s.sys ? 'Platform' : 'Manual'}</td><td>${s.ctrl || ''}</td><td>${s.wait ? '●' : ''}</td><td>${esc(s.note || '')}</td></tr>`);
    h.push(`</table>`);
  }
  h.push(`</div>`);
}
section('1. Shared components'); maps.filter(m => m.id.startsWith('TB-SC')).forEach(mapPage);
section('2. Pattern-specific segments and exception paths'); maps.filter(m => ['TB-P3R', 'TB-P5', 'TB-EXA', 'TB-EXB', 'TB-EXC', 'TB-EXE'].includes(m.id)).forEach(mapPage);
section('3. Pattern compositions'); maps.filter(m => m.isComp).forEach(mapPage);

// disposition register
h.push(`<div class="pb"><h1>4. Disposition register · every as-is step</h1><p>Rows are the 62 step rows of the deal type × stage matrix (1.3 §2). Each is marked against the to-be. Rows marked Retained are still human steps; most gain a rule, evidence or SLA.</p>
<table><tr><th style="width:4%">Row</th><th style="width:22%">As-is step (1.3)</th><th style="width:8%">Disposition</th><th style="width:12%">To-be location</th><th style="width:28%">Reason</th><th style="width:9%">Principle</th><th>Control effect</th></tr>`);
for (const d of DISP) h.push(`<tr class="${d[2]}"><td>${d[0]}</td><td>${esc(d[1])}</td><td><b>${dispName[d[2]]}</b></td><td>${esc(d[3])}</td><td>${esc(d[4])}</td><td>${esc(d[5])}</td><td>${esc(d[6])}</td></tr>`);
h.push(`</table></div>`);

// DDR log and dependencies
h.push(`<div class="pb"><h1>5. Design decision records and dependencies</h1>
<h2>5.1 Design decisions embodied in these maps</h2>
<table><tr><th style="width:7%">DDR</th><th style="width:30%">Decision</th><th style="width:12%">Principles</th><th style="width:22%">Evidence</th><th style="width:14%">Control / data</th><th>Fit-gap (2.7)</th></tr>
<tr><td>DDR-001</td><td>Renewals meeting RS-01 approved within line authority without Credit transfer (R-FAST), subject to PQ-001 and CE-001</td><td>DP-01, DP-02, DP-03, DP-08</td><td>PP-09; A1 confirmed; A2 cohort; SR/SD precedent</td><td>CE-001; F06 grade refresh rule; F07 authority</td><td>Configure if rule routing native; else Custom</td></tr>
<tr><td>DDR-002</td><td>Deal start is one component with two entry variants; opportunity object retired</td><td>DP-05, DP-09</td><td>1.3 stage 1 100% common; PP-03, PP-06</td><td>C0 → rule; C1 strengthened</td><td>Configure</td></tr>
<tr><td>DDR-003</td><td>Delegated-authority determination automated with recorded level and rule version; manual override with reason</td><td>DP-02</td><td>PP-15; E2</td><td>C5 strengthened; F07</td><td>Configure (rules) / Custom (engine depth)</td></tr>
<tr><td>DDR-004</td><td>Facility letters generated from approved terms, e-delivered, e-signed, reconciled; off-platform letters end</td><td>DP-06, DP-09</td><td>PP-23, PP-25; C2, D2, D3</td><td>C4 → reconciliation; C8; F13 captured</td><td>Configure / partner integration (G1 decision 3)</td></tr>
<tr><td>DDR-005</td><td>3-month reset replaced by graduated staleness control (EX-E)</td><td>DP-03, DP-07</td><td>PP-24; R4</td><td>CE-002</td><td>Configure (timers)</td></tr>
<tr><td>DDR-006</td><td>Deferral bounded at two loops with escalation; structured request; same assessor</td><td>DP-07, DP-04</td><td>PP-13, PP-14; C1</td><td>RS-09; measured R2</td><td>Configure</td></tr>
<tr><td>DDR-007</td><td>Early-warning flag evaluated at deal start; excludes fast-track; prompts P5</td><td>DP-08</td><td>PP-34, PP-17; RC-08</td><td>C7 relocated; RS-11</td><td>Configure (if indicators available) / Gap (data)</td></tr>
<tr><td>DDR-008</td><td>Hand-offs become queue tasks with SLAs; messages and reports as triggers end</td><td>DP-04</td><td>PP-16, PP-29, PP-39</td><td>— (ownership in 2.9)</td><td>Configure</td></tr>
<tr><td>DDR-009</td><td>Variation routed by reason taxonomy and materiality rule; security gate only when security changes</td><td>DP-01, DP-02</td><td>PP-18, PP-28; A4</td><td>RS-03, RS-07; CE-003 (admin route)</td><td>Configure</td></tr>
<tr><td>DDR-010</td><td>Removal sequence: physical release before system release; shared-security check by rule</td><td>DP-03</td><td>PP-30; RF-2 TBC</td><td>C10, C12 strengthened</td><td>Configure</td></tr>
<tr><td>DDR-011</td><td>Referral is a record on the connection; Credit and SBS review in parallel where CAP policy permits</td><td>DP-08</td><td>PP-21; RC-08</td><td>PQ-002; C13, C14</td><td>Configure</td></tr>
<tr><td>DDR-012</td><td>Three deal types retired; two un-typed journeys housed in P3 and P4; type is a parameter</td><td>DP-01, DP-09</td><td>1.3 §5; B3</td><td>F03 mapping table</td><td>Configure</td></tr></table>
<h2>5.2 Items the maps depend on</h2>
<table><tr><th>Ref</th><th>Item</th><th>Owner</th><th>Needed by</th><th>If not resolved</th></tr>
<tr><td>PQ-001</td><td>Renewal authority: may unchanged, eligible renewals be approved within RM / line authority?</td><td>Head of Credit Risk Policy</td><td>W10</td><td>R-FAST designed but not activated; P2 runs R-FULL with automated DA (still removes PP-15)</td></tr>
<tr><td>PQ-002</td><td>CAP policy: may SBS categorise in parallel with Credit authority for defined triggers?</td><td>Head of Credit Risk Policy; Head of SBS</td><td>W10</td><td>P5 sequential; T8 benefit reduced</td></tr>
<tr><td>CE-001</td><td>Equivalence for R-FAST bypass of C6: automated DA with evidence; eligibility rule; Credit sampling; grade staleness rule</td><td>Second-line Risk</td><td>W11</td><td>As PQ-001</td></tr>
<tr><td>CE-002</td><td>Equivalence for EX-E replacing the 3-month reset</td><td>Second-line Risk</td><td>W11</td><td>Reset retained at 3 months with chase evidence; OP-16 value lost</td></tr>
<tr><td>CE-003</td><td>Equivalence for administrative variations approved without Credit (R-FAST in P3)</td><td>Second-line Risk</td><td>W11</td><td>P3 runs R-FULL for all; OP-02 value lost</td></tr>
<tr><td>G1-D3</td><td>Document generation, e-delivery, e-signature in Release 1</td><td>Programme Director</td><td>W10</td><td>SC-3 S1–S3 on custom list or interim OP-30</td></tr></table>
<h2>5.3 Review and sign-off route</h2>
<table><tr><th>Week</th><th>Review</th><th>Participants</th><th>Output</th></tr>
<tr><td>9</td><td>Working-group walkthrough: SC-1, SC-2, P2, P3</td><td>WG Renewal, WG Servicing, Credit Managers</td><td>Corrections; RS-01, RS-03 content started (2.4)</td></tr>
<tr><td>10</td><td>Working-group walkthrough: SC-3, P1, P4, P5, exception paths</td><td>WG New, WG Pre-approved, WG Distressed, Lending Services, Fulfilment</td><td>Corrections; interim release to Programme (B-04)</td></tr>
<tr><td>11</td><td>Design preview with senior RMs, Credit, Ops heads (C-11)</td><td>Front line</td><td>Workability confirmed or changes</td></tr>
<tr><td>12</td><td>Design Authority sitting</td><td>Design Authority</td><td>v1.0 signed with CE and PQ status recorded</td></tr></table></div>`);

h.push(`</body></html>`);
fs.writeFileSync(path.join(__dirname, '..', '2.3-to-be-process-maps.html'), h.join('\n'));
console.log(`to-be maps: ${maps.length}; disposition rows: ${DISP.length}; E/A/C/R = ${counts.E}/${counts.A}/${counts.C}/${counts.R}`);
