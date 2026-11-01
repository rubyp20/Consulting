// As-is map definitions, redrawn from the BLP current-state journey maps (22-page PDF, 02/04/2026)
// and enriched with controls (Cn), wait points, system steps and notes. Validation status per map.

const L = { CU: 'Customer', RM: 'RM', SY: 'BLP (system)', CR: 'Credit', FU: 'Fulfilment', LS: 'Lending Services', SE: 'Securities Team', SB: 'SBS / PS', BO: 'Business Ops' };

// Shared deal-start sequence (login → landing → search → located → retrieve) starting at column c0 in BLP lane; retrieve in `actor` lane
function dealStart(c0, actor, located = 'Customer located') {
  return {
    steps: [
      { id: 'S1', lane: L.SY, col: c0, label: 'Login', sys: true, note: 'Single sign-on not in place; separate BLP credentials' },
      { id: 'S2', lane: L.SY, col: c0 + 1, label: 'View landing page', sys: true, note: 'Landing page does not surface work due (renewals, tasks)' },
      { id: 'S3', lane: L.SY, col: c0 + 2, label: 'Search for customer', sys: true, ctrl: 'C1', note: 'C1: customer identification via CIF number lookup' },
      { id: 'S4', lane: L.SY, col: c0 + 3, label: located, sys: true },
      { id: 'A1', lane: actor, col: c0 + 4, label: 'Retrieve customer details / identify contact' },
    ],
    edges: [['S1', 'S2'], ['S2', 'S3'], ['S3', 'S4'], ['S4', 'A1']].map(([f, t]) => ({ from: f, to: t })),
    last: 'A1', nextCol: c0 + 5,
  };
}

// Shared deal & credit core used by New Money, Renewal, Variation, Shadow Limit (parameters differ)
function dealCredit(opts) {
  const { startLabel, analysisLabel, analyticsLabel, noLabel, noType, validateLabel, endLabel, extraNotes } = opts;
  const steps = [
    { id: 'R1', lane: L.RM, col: 0, label: startLabel, type: 'start' },
    { id: 'S1', lane: L.SY, col: 1, label: 'Pull through details of any existing deal', sys: true },
    { id: 'S2', lane: L.SY, col: 2, label: 'Provide existing product balances', sys: true, note: 'Balances sourced from MEO / IMPACS; latency TBC' },
    { id: 'R2', lane: L.RM, col: 3, label: analysisLabel, type: 'sub' },
    { id: 'C1', lane: L.CU, col: 3, label: 'Identify customer / provide additional information', wait: true, note: 'Customer-side wait; no system tracking of requests' },
    { id: 'R3', lane: L.RM, col: 4, label: analyticsLabel, type: 'sub', ctrl: 'C2', note: 'C2: ECRS classification, lending category, debt servicing, credit memo, external credit integrity checks' },
    { id: 'S3', lane: L.SY, col: 5, label: 'Update system incl. balances', sys: true },
    { id: 'D1', lane: L.RM, col: 6, label: 'Progress?', type: 'decision' },
    { id: 'X1', lane: L.RM, col: 7, label: noLabel, type: 'sub' },
    { id: 'R4', lane: L.RM, col: 8, label: validateLabel, ctrl: 'C3', note: 'C3: deal validation (completeness, mandatory fields)' },
    { id: 'R5', lane: L.RM, col: 9, label: 'Check facility letter / agreement docs', ctrl: 'C4', note: 'C4: document check against approved terms' },
    { id: 'D2', lane: L.RM, col: 10, label: 'Within delegated authority?', type: 'decision', ctrl: 'C5', note: 'C5: delegated-authority check, performed manually' },
    { id: 'S4', lane: L.SY, col: 10, label: 'Deal transferred to Credit', sys: true, wait: true, note: 'Queue wait at Credit' },
    { id: 'K1', lane: L.CR, col: 11, label: 'Deal is assessed', ctrl: 'C6', note: 'C6: independent credit assessment' },
    { id: 'D3', lane: L.CR, col: 12, label: 'Client in financial distress?', type: 'decision', ctrl: 'C7', note: 'C7: distress screen; existing-customer deals only' },
    { id: 'D4', lane: L.CR, col: 13, label: 'Credit decision?', type: 'decision' },
    { id: 'X2', lane: L.CR, col: 14, label: 'In-flight CAP referral to SBS (EX-04)', type: 'sub' },
    { id: 'R6', lane: L.RM, col: 13, label: 'Credit approved (within DA)' },
    { id: 'S5', lane: L.SY, col: 14, label: 'Update with approved decision', sys: true },
    { id: 'E1', lane: L.RM, col: 15, label: endLabel, type: 'end' },
  ];
  const edges = [
    { from: 'R1', to: 'S1' }, { from: 'S1', to: 'S2' }, { from: 'S2', to: 'R2' }, { from: 'R2', to: 'C1' }, { from: 'R2', to: 'R3' },
    { from: 'R3', to: 'S3' }, { from: 'S3', to: 'D1' }, { from: 'D1', to: 'X1', label: 'No' }, { from: 'D1', to: 'R4', label: 'Yes' },
    { from: 'R4', to: 'R5' }, { from: 'R5', to: 'D2' }, { from: 'D2', to: 'R6', label: 'Yes' }, { from: 'D2', to: 'S4', label: 'No' },
    { from: 'S4', to: 'K1' }, { from: 'K1', to: 'D3' }, { from: 'D3', to: 'X2', label: 'Yes' }, { from: 'D3', to: 'D4', label: 'No' },
    { from: 'D4', to: 'S5', label: 'Approved' }, { from: 'D4', to: 'X1', label: 'Declined → EX-01' }, { from: 'D4', to: 'S3', label: 'Deferred – further info (EX-02)' },
    { from: 'R6', to: 'S5' }, { from: 'S5', to: 'E1' },
  ];
  return { lanes: [L.CU, L.RM, L.SY, L.CR], steps, edges };
}

// Shared completion & fulfilment core
function completion(opts) {
  const { startLabel, signLabel, endLabel, preCond, fulfilLabel, extraDecision } = opts;
  const steps = [
    { id: 'R1', lane: L.RM, col: 0, label: startLabel, type: 'start' },
    { id: 'R2', lane: L.RM, col: 1, label: 'Trigger facility letter (FAL)' },
    { id: 'R3', lane: L.RM, col: 2, label: 'RM advises Lending Services to prepare security (EX-05)', type: 'sub' },
    { id: 'S1', lane: L.SY, col: 3, label: 'FAL created and copy stored', sys: true },
    { id: 'S2', lane: L.SY, col: 4, label: 'FAL sent by post or secure email (manual PDF by RM)', sys: true, wait: true, note: 'Manual issuance by RM; no sent/returned tracking in BLP' },
    { id: 'C1', lane: L.CU, col: 5, label: signLabel, wait: true, note: 'Longest customer-side wait; 3-month unreturned reset' },
    { id: 'R4', lane: L.RM, col: 6, label: 'FAL checked', ctrl: 'C8', note: 'C8: returned letter checked against issued terms' },
    { id: 'S3', lane: L.SY, col: 7, label: 'FAL updated as complete', sys: true },
    { id: 'S4', lane: L.SY, col: 8, label: preCond, sys: true, ctrl: 'C9', note: 'C9: pre-conditions / CP checklist' },
    { id: 'S5', lane: L.SY, col: 9, label: 'Lending Services mark security in BLP as complete', sys: true, ctrl: 'C10', note: 'C10: security perfected before drawdown' },
    { id: 'S6', lane: L.SY, col: 10, label: 'BLP marked as ready for fulfilment', sys: true },
    { id: 'R5', lane: L.RM, col: 11, label: 'Message sent to fulfilment team', wait: true, note: 'Hand-off by message; queue at Fulfilment' },
    { id: 'F1', lane: L.FU, col: 12, label: fulfilLabel, ctrl: 'C11', note: 'C11: fulfilment against approved and documented terms' },
    { id: 'R6', lane: L.RM, col: 13, label: 'RM advised that facility fulfilled' },
    { id: 'E1', lane: L.SY, col: 14, label: endLabel, type: 'end' },
  ];
  const edges = [
    { from: 'R1', to: 'R2' }, { from: 'R1', to: 'R3' }, { from: 'R2', to: 'S1' }, { from: 'S1', to: 'S2' }, { from: 'S2', to: 'C1' },
    { from: 'C1', to: 'R4' }, { from: 'R4', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'R3', to: 'S5' }, { from: 'S4', to: 'S6' }, { from: 'S5', to: 'S6' },
    { from: 'S6', to: 'R5' }, { from: 'R5', to: 'F1' }, { from: 'F1', to: 'R6' }, { from: 'R6', to: 'E1' },
    { from: 'C1', to: 'R1', label: 'Not returned within 3 months → deal back to pre-credit' },
  ];
  return { lanes: [L.FU, L.CU, L.RM, L.SY], steps, edges };
}

const maps = [];

// ───────────── NEW MONEY ─────────────
(() => {
  const ds = dealStart(1, L.RM);
  maps.push({
    id: 'NM-1', journey: 'New Money / Increase', stage: 'Lead, Customer & Opportunity', source: 'Source map p.1', workshop: 'WS-02', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY],
    steps: [
      { id: 'C0', lane: L.CU, col: 0, label: 'Customer enquiry: call, online Business Lending Form (SharePoint) or face-to-face', type: 'start', note: 'TBC: CYB credit card enquiry form as a lead source' },
      { id: 'R0', lane: L.RM, col: 0, label: 'Receive lead', note: 'No lead register; leads arrive by phone, form or email' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 5, label: 'Record customer details', sys: true, note: 'New-to-bank only' },
      { id: 'D1', lane: L.RM, col: 6, label: 'Any additional parties?', type: 'decision' },
      { id: 'D2', lane: L.RM, col: 7, label: 'Lending or deposit?', type: 'decision' },
      { id: 'S6', lane: L.SY, col: 7, label: 'Create deposit opportunity', sys: true, note: 'No approval workflow; RM sets Won / Declined by Bank / Declined by Customer' },
      { id: 'S7', lane: L.SY, col: 8, label: 'Create lending opportunity', sys: true },
      { id: 'S8', lane: L.SY, col: 9, label: 'Select product(s)', sys: true, note: 'Note on source: system should allow progress to deal without an opportunity' },
      { id: 'D3', lane: L.RM, col: 10, label: 'Passes initial overview?', type: 'decision', ctrl: 'C0', note: 'C0: RM pre-screen; criteria undocumented' },
      { id: 'X1', lane: L.RM, col: 11, label: 'Decline / appeal / refer (EX-01)', type: 'sub' },
      { id: 'R2', lane: L.RM, col: 12, label: 'Contact customer to progress', wait: true },
      { id: 'E1', lane: L.RM, col: 13, label: '→ NM-2 Deal & Credit', type: 'end' },
      { id: 'E2', lane: L.RM, col: 8, label: 'Deposit opportunity recorded (→ DP-1)', type: 'end' },
    ],
    edges: [
      { from: 'C0', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges,
      { from: 'S4', to: 'S5', label: 'Not found' }, { from: 'S5', to: 'D1' }, { from: 'A1', to: 'D1' },
      { from: 'D1', to: 'S3', label: 'Yes – search party' }, { from: 'D1', to: 'D2', label: 'No' },
      { from: 'D2', to: 'S6', label: 'Deposit' }, { from: 'S6', to: 'E2' }, { from: 'D2', to: 'S7', label: 'Lending' }, { from: 'S7', to: 'S8' }, { from: 'S8', to: 'D3' },
      { from: 'D3', to: 'X1', label: 'No' }, { from: 'D3', to: 'R2', label: 'Yes' }, { from: 'R2', to: 'E1' },
    ],
    observations: [
      'Steps S1–S4 and A1 (login → landing → search → located → retrieve) are identical in every journey mapped (H-B1).',
      'The lending/deposit split is the only point where deposits touch the lending process; the deposit path has no workflow stages.',
      'The initial overview (C0) is the only pre-credit filter and has no documented criteria; decline reasons at this point are not captured.',
      'Lead receipt is unmanaged: there is no lead register or SLA from enquiry to first contact.',
    ],
    questions: ['Is the CYB credit card enquiry form a live lead source? (source: TBC)', 'What share of enquiries are declined at initial overview, and is a reason recorded anywhere?', 'Can an RM legitimately create a deal without an opportunity today, and how often does this happen?'],
  });

  const dc = dealCredit({ startLabel: 'Convert opportunity to deal', analysisLabel: 'Customer analysis', analyticsLabel: 'Credit analytics', noLabel: 'Decline / appeal / refer (EX-01)', validateLabel: 'Validate the deal', endLabel: '→ NM-3 Completion & Fulfilment' });
  dc.steps.push({ id: 'N1', lane: L.CU, col: 14, label: 'Customer changes requirements after approval → deal re-processed (EX-03)', type: 'note' });
  maps.push({ id: 'NM-2', journey: 'New Money / Increase', stage: 'Deal & Credit', source: 'Source map p.2', workshop: 'WS-02', status: 'Draft for validation', ...dc,
    observations: [
      'Two loop-backs leave Credit: Declined (to EX-01) and Deferred – further information required (to S3). Neither is bounded by a time or count limit.',
      'The delegated-authority check (C5, D2) is manual although limit, grade and exposure data are held in BLP (H-E2).',
      'The distress screen (C7) applies to existing-customer deals only and sits after full assessment, so distressed cases consume a full Credit review before referral.',
      'Change after approval (EX-03) has no defined path; the source note says the deal is “re-processed”.',
    ],
    questions: ['What is the deferral rate and average number of deferral loops per deal?', 'Which of C2’s checks are performed in BLP vs. in other systems or spreadsheets?', 'What proportion of New Money deals are decided within delegated authority vs. by Credit?'],
  });

  const cp = completion({ startLabel: 'Completing deal', signLabel: 'Customer signs and returns facility letter', endLabel: 'BLP updated', preCond: 'All pre-conditions met', fulfilLabel: 'Facility fulfilled' });
  maps.push({ id: 'NM-3', journey: 'New Money / Increase', stage: 'Completion & Fulfilment', source: 'Source map p.3', workshop: 'WS-03', status: 'Draft for validation', ...cp,
    observations: [
      'The facility letter is generated in BLP but issued manually by the RM as a PDF by email or post; the source states the preference for automation (H-C2, H-D3).',
      'Three completion conditions (letter complete, pre-conditions met, security complete) converge before “ready for fulfilment”; there is no single view of which is outstanding.',
      'An unreturned letter at 3 months sends the deal back to pre-credit: a full re-approval for a timing failure.',
      'Hand-off to Fulfilment is by message; Fulfilment queue time is not visible in BLP.',
    ],
    questions: ['How is “sent” and “returned” evidenced today if BLP does not capture it?', 'How many deals hit the 3-month reset in the last 12 months?', 'What is the SLA, if any, between “ready for fulfilment” and “facility fulfilled”?'],
  });
})();

// ───────────── RENEWAL / EPR ─────────────
(() => {
  const ds = dealStart(2, L.RM);
  maps.push({ id: 'RN-1', journey: 'Renewal / Extension Pending Review', stage: 'Lead, Customer & Opportunity', source: 'Source map p.4', workshop: 'WS-04', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY, L.CR],
    steps: [
      { id: 'S0', lane: L.SY, col: 0, label: 'Facilities approaching renewal date (BDRM or report)', type: 'start', note: 'Trigger is a report, not a system task; source notes renewals as landing-page candidates' },
      { id: 'R0', lane: L.RM, col: 1, label: 'Contact customer', wait: true },
      ...ds.steps,
      { id: 'D1', lane: L.RM, col: 7, label: 'Any additional parties?', type: 'decision' },
      { id: 'X1', lane: L.RM, col: 8, label: 'Variation deal journey (VA-1)', type: 'sub' },
      { id: 'S5', lane: L.SY, col: 8, label: 'Details of deal being renewed pulled through', sys: true },
      { id: 'S6', lane: L.SY, col: 9, label: 'Provide existing product balances', sys: true },
      { id: 'E1', lane: L.RM, col: 10, label: '→ RN-2 Deal & Credit', type: 'end' },
    ],
    edges: [{ from: 'S0', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'D1' }, { from: 'D1', to: 'X1', label: 'Yes' }, { from: 'D1', to: 'S5', label: 'No' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'E1' }],
    observations: ['The renewal trigger is a report outside the workflow; nothing in BLP creates a task or alerts the RM.', 'Any party change diverts a renewal into the Variation journey, so a renewal with a changed guarantor is processed as a restructure.', 'Credit lane is empty at this stage in the source: no pre-screening of renewal risk before RM effort is spent.'],
    questions: ['What share of renewals start late (after review date) because the trigger is report-based?', 'Is the BDRM report run centrally or by each RM?'],
  });

  const dc = dealCredit({ startLabel: 'Progress renewal deal', analysisLabel: 'Customer analysis for renewal', analyticsLabel: 'Credit analytics if required', noLabel: 'Withdraw facilities', validateLabel: 'Validate the renewal deal', endLabel: '→ RN-3 Completion & Fulfilment' });
  dc.steps.push({ id: 'N1', lane: L.CU, col: 7, label: 'Fewer items required for an Extension Pending Review', type: 'note' });
  maps.push({ id: 'RN-2', journey: 'Renewal / Extension Pending Review', stage: 'Deal & Credit', source: 'Source map p.5', workshop: 'WS-04', status: 'Draft for validation', ...dc,
    observations: [
      'The renewal Deal & Credit flow is step-for-step the same as New Money (H-A1, H-B2). By definition a Renewal has no structural change, yet it passes validation, document check, authority check and Credit assessment.',
      'EPR uses the same flow with “fewer items”; the difference is in content, not path. EPR is capped at 3 months and 3 consecutive extensions before mandatory Credit referral.',
      'Credit analytics is “if required”, but the criterion for when it is required is not defined.',
      'Withdrawing facilities on a non-progressing renewal is a sub-process without a map.',
    ],
    questions: ['What objective data (limit unchanged, grade, covenant status, watch-list) is available at S3 to support a fast-track route? (H-A2)', 'How many renewals in the last 12 months went to Credit vs. were approved within delegated authority?', 'How many EPR chains reached the maximum of 3?'],
  });

  maps.push({ id: 'RN-3', journey: 'Renewal / Extension Pending Review', stage: 'Completion & Fulfilment', source: 'Source map p.6', workshop: 'WS-04', status: 'Draft for validation',
    lanes: [L.FU, L.CU, L.RM, L.SY],
    steps: [
      { id: 'R1', lane: L.RM, col: 0, label: 'Completing deal', type: 'start' },
      { id: 'S1', lane: L.SY, col: 1, label: 'Facility letter created and copy stored', sys: true },
      { id: 'S2', lane: L.SY, col: 2, label: 'Facility letter sent by post or secure email', sys: true, wait: true },
      { id: 'D1', lane: L.SY, col: 3, label: 'Customer needs to sign FL?', type: 'decision' },
      { id: 'C1', lane: L.CU, col: 4, label: 'Customer signs and returns facility letter', wait: true },
      { id: 'R2', lane: L.RM, col: 5, label: 'FL returned and checked', ctrl: 'C8', note: 'Performed by RM (Business Direct), Business Ops (Strategic Finance) or Corporate Associate (Corporate)' },
      { id: 'S3', lane: L.SY, col: 6, label: 'BLP marked as ready for fulfilment', sys: true },
      { id: 'R3', lane: L.RM, col: 7, label: 'Message sent to fulfilment team', wait: true },
      { id: 'F1', lane: L.FU, col: 8, label: 'Renewal fulfilled', ctrl: 'C11' },
      { id: 'R4', lane: L.RM, col: 9, label: 'RM advised renewal facility fulfilled' },
      { id: 'E1', lane: L.SY, col: 10, label: 'BLP updated', type: 'end' },
      { id: 'N1', lane: L.CU, col: 8, label: 'EPR: max 3 months per extension; max 3 EPRs then referral to Credit', type: 'note' },
    ],
    edges: [{ from: 'R1', to: 'S1' }, { from: 'S1', to: 'S2' }, { from: 'S2', to: 'D1' }, { from: 'D1', to: 'C1', label: 'Yes' }, { from: 'D1', to: 'S3', label: 'No' }, { from: 'C1', to: 'R2' }, { from: 'R2', to: 'S3' }, { from: 'S3', to: 'R3' }, { from: 'R3', to: 'F1' }, { from: 'F1', to: 'R4' }, { from: 'R4', to: 'E1' }],
    observations: ['This is the only stage in the source that shows a segment difference: who checks the returned letter varies by segment (RM / Business Ops / Corporate Associate).', 'Some renewals do not need a signed letter (D1 = No) and go straight to fulfilment; the rule for which ones is not stated.', 'No security step: a renewal does not revisit security, which is consistent with “no structural change”.'],
    questions: ['What determines whether a renewal letter needs signing?', 'Does Fulfilment do anything on a renewal beyond updating expiry dates? If not, is the hand-off necessary?'],
  });
})();

// ───────────── VARIATION ─────────────
(() => {
  const ds = dealStart(2, L.RM);
  maps.push({ id: 'VA-1', journey: 'Variation', stage: 'Lead & Customer', source: 'Source map p.7', workshop: 'WS-05', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY],
    steps: [
      { id: 'C0', lane: L.CU, col: 0, label: 'Customer wishes to change deal / facility terms', type: 'start', note: 'Parties, products, decrease (not full repayment), terms, interest rate, security, covenants. New money or change of borrower → New Money journey' },
      { id: 'C1', lane: L.CU, col: 1, label: 'Customer contacts RM' },
      { id: 'R0', lane: L.RM, col: 1, label: 'Receives call / email or lead' },
      ...ds.steps,
      { id: 'D1', lane: L.RM, col: 7, label: 'Parties to be amended?', type: 'decision', note: 'Partnerships and Ltd companies' },
      { id: 'S5', lane: L.SY, col: 7, label: 'Parties added or removed', sys: true, ctrl: 'C1' },
      { id: 'S6', lane: L.SY, col: 8, label: 'Details of deal being varied pulled through', sys: true },
      { id: 'S7', lane: L.SY, col: 9, label: 'Provide existing product balances', sys: true },
      { id: 'E1', lane: L.RM, col: 10, label: '→ VA-2 Deal & Credit', type: 'end' },
    ],
    edges: [{ from: 'C0', to: 'C1' }, { from: 'C1', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'D1' }, { from: 'D1', to: 'S5', label: 'Yes' }, { from: 'S5', to: 'S6' }, { from: 'D1', to: 'S6', label: 'No' }, { from: 'S6', to: 'S7' }, { from: 'S7', to: 'E1' }],
    observations: ['Variation covers everything from a covenant date change to a security restructure; one journey, no triage by materiality (H-A4).', 'Party changes are made in the system before any assessment of the change.'],
    questions: ['What are the top variation reasons by volume? Is a reason code captured?', 'Which variation types never go to Credit today?'],
  });

  const dc = dealCredit({ startLabel: 'Progress variation deal', analysisLabel: 'Customer analysis for variation', analyticsLabel: 'Credit analytics if required', noLabel: 'Remove facilities', validateLabel: 'Validate the varied deal', endLabel: '→ VA-3 Completion & Fulfilment' });
  maps.push({ id: 'VA-2', journey: 'Variation', stage: 'Deal & Credit', source: 'Source map p.8', workshop: 'WS-05', status: 'Draft for validation', ...dc,
    observations: ['Identical path to New Money and Renewal (H-B2); only the start label and the “no” sub-process differ.', 'A 7,277-deal-a-year journey with no distinction between administrative amendments and credit-relevant restructures.'],
    questions: ['Does an administrative variation (e.g. covenant due-date change) require Credit sign-off today, and if so under what policy?'],
  });

  const cp = completion({ startLabel: 'Completing deal', signLabel: 'Customer signs and returns facility letter if required', endLabel: 'BLP updated', preCond: 'All covenant & condition updates completed', fulfilLabel: 'Facility fulfilled' });
  cp.steps.push({ id: 'D1', lane: L.RM, col: 10, label: 'Facility change required?', type: 'decision' });
  cp.edges = cp.edges.filter(e => !(e.from === 'S6' && e.to === 'R5'));
  cp.edges.push({ from: 'S6', to: 'D1' }, { from: 'D1', to: 'R5', label: 'Yes' }, { from: 'D1', to: 'E1', label: 'No' });
  maps.push({ id: 'VA-3', journey: 'Variation', stage: 'Completion & Fulfilment', source: 'Source map p.9', workshop: 'WS-05', status: 'Draft for validation', ...cp,
    observations: ['Same structure as New Money completion with one added decision: variations that do not change a facility skip Fulfilment.', 'Security is re-instructed on every variation (R3) even where security is unchanged; whether this is a real step or a default is for the workshop.'],
    questions: ['What share of variations require a signed letter, and what share require Fulfilment action?'],
  });
})();

// ───────────── REMOVE ALL FACILITIES ─────────────
(() => {
  const ds = dealStart(2, L.RM);
  maps.push({ id: 'RF-1', journey: 'Remove All Facilities', stage: 'Lead & Customer', source: 'Source map p.10', workshop: 'WS-06', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY],
    steps: [
      { id: 'C0', lane: L.CU, col: 0, label: 'Customer wishes to remove their credit facilities', type: 'start' },
      { id: 'C1', lane: L.CU, col: 1, label: 'Customer contacts RM' },
      { id: 'R0', lane: L.RM, col: 1, label: 'Receives call / email or lead' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 7, label: 'Details of existing deal pulled through', sys: true },
      { id: 'S6', lane: L.SY, col: 8, label: 'Provide existing product balances', sys: true },
      { id: 'E1', lane: L.RM, col: 9, label: '→ RF-2 Deal, Completion & Fulfilment', type: 'end' },
    ],
    edges: [{ from: 'C0', to: 'C1' }, { from: 'C1', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'S5' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'E1' }],
    observations: ['Mapped as a journey but not listed as a deal type in the RFP; presumably recorded as a Variation (H-B3).'],
    questions: ['Under which deal type is a full facility removal recorded today?', 'Is bank-initiated removal (e.g. post-recovery) handled by the same path?'],
  });

  maps.push({ id: 'RF-2', journey: 'Remove All Facilities', stage: 'Deal, Completion & Fulfilment', source: 'Source map p.11', workshop: 'WS-06', status: 'Draft for validation',
    lanes: [L.RM, L.SY, L.SE, L.FU],
    steps: [
      { id: 'R1', lane: L.RM, col: 0, label: 'Progress deal', type: 'start' },
      { id: 'S1', lane: L.SY, col: 1, label: 'Update system to zero the facility and balance', sys: true },
      { id: 'S2', lane: L.SY, col: 2, label: 'Release security (charge & guarantee) from facility being repaid', sys: true, ctrl: 'C10', note: 'Only if security supports this facility alone; shared security must be re-allocated' },
      { id: 'S3', lane: L.SY, col: 3, label: 'Asset allocation updated / released as required', sys: true },
      { id: 'S4', lane: L.SY, col: 4, label: 'Covenants & conditions withdrawn (full repayment only)', sys: true },
      { id: 'R2', lane: L.RM, col: 5, label: 'Advise Securities to release security' },
      { id: 'Q1', lane: L.SE, col: 6, label: 'Security updated', ctrl: 'C10', wait: true },
      { id: 'R3', lane: L.RM, col: 7, label: 'Confirmation that security released' },
      { id: 'R4', lane: L.RM, col: 8, label: 'Arrange for outstanding balance(s) to be repaid', wait: true, ctrl: 'C12', note: 'C12: repayment before facility removal' },
      { id: 'R5', lane: L.RM, col: 9, label: 'Advise Fulfilment team to remove facilities' },
      { id: 'F1', lane: L.FU, col: 10, label: 'Facilities updated', wait: true },
      { id: 'R6', lane: L.RM, col: 11, label: 'Confirmation that facilities removed' },
      { id: 'E1', lane: L.SY, col: 12, label: 'BLP updated', type: 'end' },
      { id: 'N1', lane: L.SE, col: 2, label: 'TBC: associated-party deals will also need to be updated', type: 'note' },
    ],
    edges: [{ from: 'R1', to: 'S1' }, { from: 'S1', to: 'S2' }, { from: 'S2', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'R2' }, { from: 'R2', to: 'Q1' }, { from: 'Q1', to: 'R3' }, { from: 'R3', to: 'R4' }, { from: 'R4', to: 'R5' }, { from: 'R5', to: 'F1' }, { from: 'F1', to: 'R6' }, { from: 'R6', to: 'E1' }],
    observations: ['No Credit involvement: facility removal is treated as administrative, which is reasonable, but the source shows no check that the customer has no other exposure depending on the released security.', 'Security is released in BLP (S2) before the Securities Team confirms release (Q1): the system record leads the legal reality.', 'Two sequential hand-offs (Securities, Fulfilment) each with a confirmation back to the RM: four messages for one outcome.'],
    questions: ['Is the order (system release before physical release) correct, or a drawing artefact?', 'How are associated-party deals updated today when a facility is removed? (source: TBC)'],
  });
})();

// ───────────── CAP REFERRAL ─────────────
(() => {
  const ds = dealStart(1, L.RM);
  maps.push({ id: 'CR-1', journey: 'CAP Referral', stage: 'Lead & Customer', source: 'Source map p.12', workshop: 'WS-07', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY],
    steps: [
      { id: 'R0', lane: L.RM, col: 0, label: 'Customer identified as in financial difficulty', type: 'start', note: 'Trigger: RM judgement, arrears, covenant breach, or Credit flag; not systematised' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 6, label: 'Details of deal pulled through', sys: true },
      { id: 'S6', lane: L.SY, col: 7, label: 'Provide existing product balances', sys: true },
      { id: 'E1', lane: L.RM, col: 8, label: '→ CR-2 Deal, Credit, Completion & Fulfilment', type: 'end' },
    ],
    edges: [{ from: 'R0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'S5' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'E1' }],
    observations: ['Same deal-start sequence as every other journey (H-B1).', 'The distress trigger is undefined; H-E3/L10 assume early-warning data exists in BLP (forbearance, watch-list, arrears).'],
    questions: ['What proportion of CAP Referrals originate from the RM vs. from Credit during another deal (in-flight, EX-04)?'],
  });

  maps.push({ id: 'CR-2', journey: 'CAP Referral', stage: 'Deal, Credit, Completion & Fulfilment', source: 'Source map p.13', workshop: 'WS-07', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY, L.CR, L.SB],
    steps: [
      { id: 'R1', lane: L.RM, col: 0, label: 'Deal created', type: 'start' },
      { id: 'R2', lane: L.RM, col: 1, label: 'Customer analysis', type: 'sub' },
      { id: 'C1', lane: L.CU, col: 1, label: 'Identify customer / provide additional information', wait: true },
      { id: 'R3', lane: L.RM, col: 2, label: 'Credit analytics', type: 'sub', ctrl: 'C2' },
      { id: 'S1', lane: L.SY, col: 3, label: 'Update system', sys: true },
      { id: 'R4', lane: L.RM, col: 4, label: 'Validate the deal', ctrl: 'C3' },
      { id: 'S2', lane: L.SY, col: 5, label: 'Deal transferred to Credit', sys: true, wait: true },
      { id: 'K1', lane: L.CR, col: 6, label: 'Deal is assessed', ctrl: 'C6' },
      { id: 'D1', lane: L.CR, col: 7, label: 'Decision?', type: 'decision', ctrl: 'C13', note: 'C13: credit approval authority decides whether referral proceeds to SBS/PS' },
      { id: 'S3', lane: L.SY, col: 8, label: 'Update with credit overview', sys: true },
      { id: 'S4', lane: L.SY, col: 9, label: 'Transfer deal to SBS (SBS workflow)', sys: true, wait: true },
      { id: 'B1', lane: L.SB, col: 10, label: 'Review deal in BLP, credit memo and documents', ctrl: 'C14', note: 'C14: SBS categorisation decision' },
      { id: 'D2', lane: L.SB, col: 11, label: 'Categorise?', type: 'decision' },
      { id: 'B2', lane: L.SB, col: 12, label: 'Remains active with RM / further info requested' },
      { id: 'S5', lane: L.SY, col: 12, label: 'Deal categorised by SBS: primary cause, deal members, SBS comments, saved Complete', sys: true },
      { id: 'S6', lane: L.SY, col: 13, label: 'Transferred to Retention Exit or Recovery Secure team', sys: true },
      { id: 'S7', lane: L.SY, col: 14, label: 'Complete forbearance assessment', sys: true, ctrl: 'C15', note: 'C15: forbearance assessment (regulatory)' },
      { id: 'S8', lane: L.SY, col: 15, label: 'SBS user assigned as RM for categorised members; recommendations recorded', sys: true, note: 'Officer-code reassignment; cf. batch job' },
      { id: 'E1', lane: L.RM, col: 16, label: 'Deal complete → CAP Strategy (CS-1)', type: 'end' },
    ],
    edges: [{ from: 'R1', to: 'R2' }, { from: 'R2', to: 'C1' }, { from: 'R2', to: 'R3' }, { from: 'R3', to: 'S1' }, { from: 'S1', to: 'R4' }, { from: 'R4', to: 'S2' }, { from: 'S2', to: 'K1' }, { from: 'K1', to: 'D1' },
      { from: 'D1', to: 'S1', label: 'Further info required' }, { from: 'D1', to: 'S3', label: 'Progress to SBS' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'B1' }, { from: 'B1', to: 'D2' },
      { from: 'D2', to: 'B2', label: 'No' }, { from: 'D2', to: 'S5', label: 'Yes' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'S7' }, { from: 'S7', to: 'S8' }, { from: 'S8', to: 'E1' }, { from: 'B2', to: 'E1' }],
    observations: ['Two sequential approval authorities (Credit, then SBS) each review the same memo before anything changes for the customer; cycle time from distress signal to categorisation is the KPI for L10.', 'Reassigning the officer code to an SBS user is a system update; the mass officer-code batch job suggests this is done in bulk elsewhere too.', 'The forbearance assessment (C15) is a regulatory control and a protected data point (0.7 DR-10).'],
    questions: ['What is the elapsed time from referral creation to SBS categorisation?', 'Does SBS ever reject a referral that Credit approved, and what happens then?'],
  });
})();

// ───────────── CAP STRATEGY ─────────────
(() => {
  const ds = dealStart(1, L.SB);
  maps.push({ id: 'CS-1', journey: 'CAP Strategy', stage: 'Lead & Customer', source: 'Source map p.14', workshop: 'WS-08', status: 'Draft for validation',
    lanes: [L.CU, L.SB, L.SY],
    steps: [
      { id: 'B0', lane: L.SB, col: 0, label: 'SBS decides to categorise a customer’s lending', type: 'start' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 6, label: 'Details of deal pulled through', sys: true },
      { id: 'S6', lane: L.SY, col: 7, label: 'Provide existing product balances', sys: true },
      { id: 'E1', lane: L.SB, col: 8, label: '→ CS-2 Deal, Completion & Fulfilment', type: 'end' },
    ],
    edges: [{ from: 'B0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'S5' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'E1' }],
    observations: ['Same deal-start sequence with SBS as the actor; created only after a CAP Referral is accepted.'],
    questions: ['Is a CAP Strategy ever created without a preceding CAP Referral deal?'],
  });

  maps.push({ id: 'CS-2', journey: 'CAP Strategy', stage: 'Deal, Completion & Fulfilment', source: 'Source map p.15', workshop: 'WS-08', status: 'Draft for validation',
    lanes: [L.CU, L.SB, L.SY],
    steps: [
      { id: 'B1', lane: L.SB, col: 0, label: 'Progress deal', type: 'start' },
      { id: 'B2', lane: L.SB, col: 1, label: 'Customer analysis', type: 'sub' },
      { id: 'C1', lane: L.CU, col: 1, label: 'Identify customer / provide additional information', wait: true },
      { id: 'B3', lane: L.SB, col: 2, label: 'Credit analytics if required', type: 'sub', ctrl: 'C2' },
      { id: 'S1', lane: L.SY, col: 3, label: 'Update system: products to existing credit; expiry dates 12 months; limits may be reduced', sys: true },
      { id: 'B4', lane: L.SB, col: 4, label: 'Create CAP Strategy memo', type: 'sub', ctrl: 'C16', note: 'C16: strategy memo (document held off-platform until attached)' },
      { id: 'S2', lane: L.SY, col: 5, label: 'Attach CAP Strategy memo to deal', sys: true },
      { id: 'S3', lane: L.SY, col: 6, label: 'Recoveries: remove any covenants', sys: true },
      { id: 'S4', lane: L.SY, col: 7, label: 'Recoveries: update product and/or securities for recovery (ERV, provisions / write-offs)', sys: true, ctrl: 'C17', note: 'C17: ERV and provision data; feeds impairment reporting' },
      { id: 'S5', lane: L.SY, col: 8, label: 'Check deal header / summary for recovery data', sys: true },
      { id: 'B5', lane: L.SB, col: 9, label: 'Validate the deal', ctrl: 'C3' },
      { id: 'B6', lane: L.SB, col: 10, label: 'Deal approved', ctrl: 'C18', note: 'C18: SBS approval authority' },
      { id: 'S6', lane: L.SY, col: 11, label: 'Update with approved decision', sys: true },
      { id: 'E1', lane: L.SY, col: 12, label: 'Deal complete when strategy in place (no further workflow stages)', type: 'end' },
    ],
    edges: [{ from: 'B1', to: 'B2' }, { from: 'B2', to: 'C1' }, { from: 'B2', to: 'B3' }, { from: 'B3', to: 'S1' }, { from: 'S1', to: 'B4' }, { from: 'B4', to: 'S2' }, { from: 'S2', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'S5' }, { from: 'S5', to: 'B5' }, { from: 'B5', to: 'B6' }, { from: 'B6', to: 'S6' }, { from: 'S6', to: 'E1' }],
    observations: ['Approved by SBS within its own authority; no Credit lane. The CAP Strategy deal stops after approval: no completion or fulfilment stages, which is correct for a record-keeping deal.', 'ERV, provisions and write-off data entered here (C17) feed impairment and regulatory reporting: protected fields.'],
    questions: ['Who holds the approval authority for a CAP Strategy, and is there a value threshold that escalates it?'],
  });
})();

// ───────────── SHADOW LIMIT & STAGED DRAWDOWN (origination) ─────────────
(() => {
  const ds = dealStart(1, L.RM);
  maps.push({ id: 'SL-1', journey: 'Shadow Limit & Staged Drawdown (origination)', stage: 'Lead, Customer, Opportunity & Product', source: 'Source map p.16', workshop: 'WS-09', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY],
    steps: [
      { id: 'C0', lane: L.CU, col: 0, label: 'Customer calls or completes lead form', type: 'start' },
      { id: 'R0', lane: L.RM, col: 0, label: 'Receive lead' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 5, label: 'Record customer details', sys: true },
      { id: 'D1', lane: L.RM, col: 6, label: 'Any additional parties?', type: 'decision' },
      { id: 'S7', lane: L.SY, col: 7, label: 'Create lending opportunity', sys: true },
      { id: 'S8', lane: L.SY, col: 8, label: 'Select Shadow Limits product', sys: true, note: 'RM agrees an overall facility amount; final products chosen later, total ≤ shadow limit' },
      { id: 'S9', lane: L.SY, col: 9, label: 'Select Term Lending product with staged drawdowns', sys: true, note: 'RM enters each stage: date, amount, status; total reduces with each stage' },
      { id: 'D3', lane: L.RM, col: 10, label: 'Passes initial overview?', type: 'decision', ctrl: 'C0' },
      { id: 'X1', lane: L.RM, col: 11, label: 'Decline / appeal / refer (EX-01)', type: 'sub' },
      { id: 'R2', lane: L.RM, col: 12, label: 'Contact customer to progress', wait: true },
      { id: 'E1', lane: L.RM, col: 13, label: '→ SL-2 Deal & Credit', type: 'end' },
    ],
    edges: [{ from: 'C0', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges, { from: 'S4', to: 'S5', label: 'Not found' }, { from: 'S5', to: 'D1' }, { from: 'A1', to: 'D1' }, { from: 'D1', to: 'S3', label: 'Yes' }, { from: 'D1', to: 'S7', label: 'No' },
      { from: 'S7', to: 'S8', label: 'Shadow limit' }, { from: 'S7', to: 'S9', label: 'Staged drawdown' }, { from: 'S8', to: 'D3' }, { from: 'S9', to: 'D3' }, { from: 'D3', to: 'X1', label: 'No' }, { from: 'D3', to: 'R2', label: 'Yes' }, { from: 'R2', to: 'E1' }],
    observations: ['Identical to NM-1 up to product selection; the only difference is which product is picked. This is a New Money deal with a different product (H-B2).', 'Staged Drawdown as a deal type had zero volume in 12 months; drawdowns are set up here as tranches on a Term Lending product, which is why the separate type is unused (H-B3).'],
    questions: ['Is the “Staged Drawdown” deal type retired in practice, with tranches always set up through Term Lending?'],
  });

  const dc = dealCredit({ startLabel: 'Convert opportunity to deal', analysisLabel: 'Customer analysis', analyticsLabel: 'Credit analytics', noLabel: 'Decline / appeal / refer (EX-01)', validateLabel: 'Validate the deal', endLabel: '→ SL-3 Completion & Fulfilment' });
  dc.steps.push({ id: 'N1', lane: L.CU, col: 9, label: 'Open: does the RM create an off-platform facility letter for Shadow Limits? RMs use an off-platform FAL for Staged Drawdown', type: 'note' });
  dc.steps.push({ id: 'N2', lane: L.CU, col: 14, label: 'Change after approval → deal re-processed (EX-03)', type: 'note' });
  maps.push({ id: 'SL-2', journey: 'Shadow Limit & Staged Drawdown (origination)', stage: 'Deal & Credit', source: 'Source map p.17', workshop: 'WS-09', status: 'Draft for validation', ...dc,
    observations: ['Same Deal & Credit flow as New Money.', 'The source raises, in red, whether the facility letter is created off-platform for Shadow Limits and confirms it is for Staged Drawdown: the platform does not hold the agreed terms (H-D2).'],
    questions: ['Where are off-platform facility letters stored, and who checks them against the approved deal?'],
  });

  const cp = completion({ startLabel: 'Completing deal', signLabel: 'Customer signs and returns facility letter', endLabel: 'BLP updated (sort code and account number added for any initial funds)', preCond: 'All pre-conditions met', fulfilLabel: 'Funding fulfilled' });
  cp.steps.push({ id: 'D1', lane: L.RM, col: 10, label: 'Any initial release of funds?', type: 'decision' });
  cp.steps.push({ id: 'E2', lane: L.RM, col: 14, label: '→ SR-1 / SD-1 Reallocation or Allocation', type: 'end' });
  cp.edges = cp.edges.filter(e => !(e.from === 'S6' && e.to === 'R5'));
  cp.edges.push({ from: 'S6', to: 'D1' }, { from: 'D1', to: 'R5', label: 'Yes' }, { from: 'D1', to: 'E2', label: 'No' });
  maps.push({ id: 'SL-3', journey: 'Shadow Limit & Staged Drawdown (origination)', stage: 'Completion & Fulfilment', source: 'Source map p.18', workshop: 'WS-09', status: 'Draft for validation', ...cp,
    observations: ['Same as New Money completion, plus a decision on initial funds: a shadow limit with no immediate drawdown ends here and waits for a Reallocation deal.'],
    questions: ['How is the undrawn shadow limit monitored for expiry between origination and first reallocation?'],
  });
})();

// ───────────── SHADOW LIMIT REALLOCATION ─────────────
(() => {
  const ds = dealStart(1, L.RM);
  maps.push({ id: 'SR-1', journey: 'Shadow Limit Reallocation', stage: 'Customer, Deal & Credit', source: 'Source map p.19', workshop: 'WS-10', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY, L.CR],
    steps: [
      { id: 'C0', lane: L.CU, col: 0, label: 'Customer wishes to use their pre-agreed shadow limit facility', type: 'start' },
      { id: 'R0', lane: L.RM, col: 0, label: 'Receives the request' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 6, label: 'Details of existing Shadow Limit deal pulled through', sys: true },
      { id: 'S6', lane: L.SY, col: 7, label: 'Create credit application (new deal): RM selects “Shadow Limit Reallocation”', sys: true },
      { id: 'S7', lane: L.SY, col: 8, label: 'Add new product(s): amounts, fees, rates, terms', sys: true },
      { id: 'S8', lane: L.SY, col: 9, label: 'Edit existing shadow limit product: reduce by value of new product(s)', sys: true, ctrl: 'C19', note: 'C19: reallocation ≤ remaining shadow limit' },
      { id: 'R4', lane: L.RM, col: 10, label: 'Validate the deals', ctrl: 'C3' },
      { id: 'R5', lane: L.RM, col: 11, label: 'Check facility letter / agreement docs', ctrl: 'C4' },
      { id: 'D1', lane: L.RM, col: 12, label: 'Need credit approval?', type: 'decision', ctrl: 'C5', note: 'Credit has approved the shadow limit; material change or specific scenarios need further approval. Skips CDQ, straight to PDQ (DCA 5)' },
      { id: 'S9', lane: L.SY, col: 12, label: 'Deal transferred to Credit', sys: true, wait: true },
      { id: 'K1', lane: L.CR, col: 13, label: 'Deal is assessed', ctrl: 'C6' },
      { id: 'D2', lane: L.CR, col: 14, label: 'Decision?', type: 'decision' },
      { id: 'R6', lane: L.RM, col: 14, label: 'Credit approved' },
      { id: 'S10', lane: L.SY, col: 15, label: 'Update with approved decision', sys: true },
      { id: 'E1', lane: L.RM, col: 16, label: '→ SR-2 Completion & Fulfilment', type: 'end' },
    ],
    edges: [{ from: 'C0', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'S5' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'S7' }, { from: 'S7', to: 'S8' }, { from: 'S8', to: 'R4' }, { from: 'R4', to: 'R5' }, { from: 'R5', to: 'D1' },
      { from: 'D1', to: 'R6', label: 'No' }, { from: 'D1', to: 'S9', label: 'Yes' }, { from: 'S9', to: 'K1' }, { from: 'K1', to: 'D2' }, { from: 'D2', to: 'S10', label: 'Approved' }, { from: 'D2', to: 'S6', label: 'Deferred – further info' }, { from: 'R6', to: 'S10' }, { from: 'S10', to: 'E1' }],
    observations: ['A genuine fast-track: pre-approved limit, straight to PDQ, Credit only on material change. This is the model for risk-based routing (L1) already operating in the Bank at 62 deals a year.', 'The RM reduces the shadow limit product manually (S8); C19 is a manual arithmetic check.', 'The definition of “material change” that triggers Credit is not written on the map.'],
    questions: ['What are the documented triggers for referring a reallocation to Credit?', 'Is the reduction of the shadow limit (S8) ever missed, leaving double-counted headroom?'],
  });

  const cp = completion({ startLabel: 'Completing deal', signLabel: 'Customer signs and returns all FALs', endLabel: 'BLP updated', preCond: 'All pre-conditions met', fulfilLabel: 'Funding fulfilled' });
  cp.steps.find(s => s.id === 'R2').label = 'Trigger FALs: one for reduced shadow limit deal, one per new deal';
  cp.steps.find(s => s.id === 'S1').label = 'FALs created and copies stored';
  maps.push({ id: 'SR-2', journey: 'Shadow Limit Reallocation', stage: 'Completion & Fulfilment', source: 'Source map p.20', workshop: 'WS-10', status: 'Draft for validation', ...cp,
    observations: ['Two or more facility letters per reallocation (reduced shadow limit plus each new facility), all manually issued, all subject to the 3-month reset.'],
    questions: ['Could the reduced shadow limit be documented by a side letter or notice rather than a full FAL?'],
  });
})();

// ───────────── STAGED DRAWDOWN ALLOCATION ─────────────
(() => {
  const ds = dealStart(1, L.RM);
  maps.push({ id: 'SD-1', journey: 'Staged Drawdown Allocation', stage: 'Customer, Deal & Credit', source: 'Source map p.21', workshop: 'WS-10', status: 'Draft for validation',
    lanes: [L.CU, L.RM, L.SY, L.CR],
    steps: [
      { id: 'C0', lane: L.CU, col: 0, label: 'Customer wishes to draw the next tranche of term lending', type: 'start', note: 'Could be triggered by a task date set when the staged drawdown deal was created' },
      { id: 'R0', lane: L.RM, col: 0, label: 'Receives the request' },
      ...ds.steps,
      { id: 'S5', lane: L.SY, col: 6, label: 'Details of existing Staged Drawdown deal pulled through', sys: true },
      { id: 'S6', lane: L.SY, col: 7, label: 'Create credit application: RM selects “Staged Drawdown”, facility request type “Variation”', sys: true },
      { id: 'S7', lane: L.SY, col: 8, label: 'Select and edit Term Lending product set up in original deal', sys: true },
      { id: 'S8', lane: L.SY, col: 9, label: 'Select and edit tranche: check date and amount; status Future → In Progress', sys: true, ctrl: 'C19' },
      { id: 'R4', lane: L.RM, col: 10, label: 'Validate the deal', ctrl: 'C3', note: 'Open: does the RM need to produce a repayment schedule at each drawdown?' },
      { id: 'R5', lane: L.RM, col: 11, label: 'Check facility letter / agreement docs', ctrl: 'C4', note: 'RM produces an off-platform staged drawdown letter as confirmation' },
      { id: 'D1', lane: L.RM, col: 12, label: 'Need credit approval?', type: 'decision', ctrl: 'C5' },
      { id: 'S9', lane: L.SY, col: 12, label: 'Deal transferred to Credit', sys: true, wait: true },
      { id: 'K1', lane: L.CR, col: 13, label: 'Deal is assessed', ctrl: 'C6' },
      { id: 'D2', lane: L.CR, col: 14, label: 'Decision?', type: 'decision' },
      { id: 'R6', lane: L.RM, col: 14, label: 'Credit approved' },
      { id: 'S10', lane: L.SY, col: 15, label: 'Update with approved decision', sys: true },
      { id: 'E1', lane: L.RM, col: 16, label: '→ SD-2 Completion & Fulfilment', type: 'end' },
    ],
    edges: [{ from: 'C0', to: 'R0' }, { from: 'R0', to: 'S1' }, ...ds.edges, { from: 'A1', to: 'S5' }, { from: 'S5', to: 'S6' }, { from: 'S6', to: 'S7' }, { from: 'S7', to: 'S8' }, { from: 'S8', to: 'R4' }, { from: 'R4', to: 'R5' }, { from: 'R5', to: 'D1' },
      { from: 'D1', to: 'R6', label: 'No' }, { from: 'D1', to: 'S9', label: 'Yes' }, { from: 'S9', to: 'K1' }, { from: 'K1', to: 'D2' }, { from: 'D2', to: 'S10', label: 'Approved' }, { from: 'D2', to: 'S6', label: 'Deferred – further info' }, { from: 'R6', to: 'S10' }, { from: 'S10', to: 'E1' }],
    observations: ['Structurally the same as Shadow Limit Reallocation: a pre-approved facility drawn in tranches, with Credit only on exception.', 'The drawdown letter is produced off-platform; the tranche status change in BLP is the only system record of the drawdown.', 'Deal type “Staged Drawdown” with facility request type “Variation”: the deal-type model is being worked around by combining fields.'],
    questions: ['Is the repayment schedule regenerated at each tranche, and where? (source: open)', 'Why is the facility request type set to Variation on an allocation?'],
  });

  const cp = completion({ startLabel: 'Completing deal', signLabel: 'Customer signs and returns facility letter', endLabel: 'BLP updated', preCond: 'All pre-conditions met', fulfilLabel: 'Funding fulfilled' });
  maps.push({ id: 'SD-2', journey: 'Staged Drawdown Allocation', stage: 'Completion & Fulfilment', source: 'Source map p.22', workshop: 'WS-10', status: 'Draft for validation', ...cp,
    observations: ['Identical to New Money completion. The source draws the FAL steps in red, flagging that the letter is off-platform for this journey.'],
    questions: ['Is a full FAL and 3-month reset proportionate for drawing a tranche of an already-documented facility?'],
  });
})();

// ───────────── EXCEPTION PATHS (not in source; straw-man for WS-11) ─────────────
maps.push({ id: 'EX-01', journey: 'Exception path', stage: 'Decline / appeal / refer', source: 'Not mapped in source (blue sub-process box)', workshop: 'WS-11', status: 'Straw-man – to be built in workshop',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'R1', lane: L.RM, col: 0, label: 'Decline reached (initial overview, RM, or Credit)', type: 'start' },
    { id: 'S1', lane: L.SY, col: 1, label: 'Decline recorded with reason?', sys: true, type: 'decision', note: 'Unknown whether a structured reason code exists' },
    { id: 'R2', lane: L.RM, col: 2, label: 'Customer informed of decision', ctrl: 'C20', note: 'C20: decline communication requirements (regulatory for some segments)' },
    { id: 'C1', lane: L.CU, col: 3, label: 'Customer appeals?', type: 'decision', wait: true },
    { id: 'R3', lane: L.RM, col: 4, label: 'Appeal submitted with new information' },
    { id: 'K1', lane: L.CR, col: 5, label: 'Appeal reviewed by higher authority', ctrl: 'C21', note: 'C21: appeal reviewed independently of original decision-maker' },
    { id: 'D2', lane: L.CR, col: 6, label: 'Outcome?', type: 'decision' },
    { id: 'E1', lane: L.RM, col: 7, label: 'Decline stands; deal closed', type: 'end' },
    { id: 'E2', lane: L.SY, col: 7, label: 'Overturned → re-enter Deal & Credit', type: 'end' },
    { id: 'X1', lane: L.RM, col: 5, label: 'Refer: route to alternative product / specialist team', type: 'sub' },
  ],
  edges: [{ from: 'R1', to: 'S1' }, { from: 'S1', to: 'R2' }, { from: 'R2', to: 'C1' }, { from: 'C1', to: 'E1', label: 'No' }, { from: 'C1', to: 'R3', label: 'Yes' }, { from: 'R3', to: 'K1' }, { from: 'K1', to: 'D2' }, { from: 'D2', to: 'E1', label: 'Upheld' }, { from: 'D2', to: 'E2', label: 'Overturned' }, { from: 'R2', to: 'X1', label: 'Refer' }],
  observations: ['Straw-man. Shown on four source maps as a sub-process box with no detail. The workshop must establish: where decline reasons are recorded; whether an appeal route exists and who hears it; what “refer” means in practice.'],
  questions: ['Is there a formal appeal process, and what is its volume?', 'Are decline reasons captured in BLP in a structured way (needed for O4 and MI)?', 'What does “refer” route to?'],
});

maps.push({ id: 'EX-02', journey: 'Exception path', stage: 'Deferred – further information required', source: 'Not mapped in source (loop-back arrow only)', workshop: 'WS-11', status: 'Straw-man – to be built in workshop',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'K1', lane: L.CR, col: 0, label: 'Credit defers decision; information request raised', type: 'start' },
    { id: 'S1', lane: L.SY, col: 1, label: 'Deal status set to deferred; request text in comments', sys: true, note: 'Request content likely free text; no structured checklist' },
    { id: 'R1', lane: L.RM, col: 2, label: 'RM reviews request; contacts customer', wait: true },
    { id: 'C1', lane: L.CU, col: 3, label: 'Customer provides information', wait: true },
    { id: 'R2', lane: L.RM, col: 4, label: 'RM updates deal and credit memo' },
    { id: 'S2', lane: L.SY, col: 5, label: 'Deal re-submitted to Credit', sys: true, wait: true },
    { id: 'K2', lane: L.CR, col: 6, label: 'Re-assessed (same assessor?)', ctrl: 'C6' },
    { id: 'D1', lane: L.CR, col: 7, label: 'Sufficient?', type: 'decision' },
    { id: 'E1', lane: L.CR, col: 8, label: 'Decision made', type: 'end' },
  ],
  edges: [{ from: 'K1', to: 'S1' }, { from: 'S1', to: 'R1' }, { from: 'R1', to: 'C1' }, { from: 'C1', to: 'R2' }, { from: 'R2', to: 'S2' }, { from: 'S2', to: 'K2' }, { from: 'K2', to: 'D1' }, { from: 'D1', to: 'E1', label: 'Yes' }, { from: 'D1', to: 'S1', label: 'No – loop again' }],
  observations: ['Straw-man. Every Deal & Credit map has this loop with no count limit and no time limit. It is the most likely driver of H-C1 and should be measured from DR-02 before the workshop.'],
  questions: ['How many deferral loops per deal on average and at the tail?', 'Is the same Credit assessor allocated on re-submission?', 'Is there a checklist of submission requirements that would prevent the first deferral?'],
});

maps.push({ id: 'EX-03', journey: 'Exception path', stage: 'Change in deal after credit approval', source: 'Not mapped in source (note: “deal to be re-processed”)', workshop: 'WS-11', status: 'Straw-man – to be built in workshop',
  lanes: [L.CU, L.RM, L.SY, L.CR],
  steps: [
    { id: 'C1', lane: L.CU, col: 0, label: 'Customer changes requirements after approval', type: 'start' },
    { id: 'R1', lane: L.RM, col: 1, label: 'RM assesses nature of change' },
    { id: 'D1', lane: L.RM, col: 2, label: 'Material to credit decision?', type: 'decision', ctrl: 'C22', note: 'C22: materiality criteria; not documented' },
    { id: 'S1', lane: L.SY, col: 3, label: 'Update deal and documents; approval stands', sys: true },
    { id: 'S2', lane: L.SY, col: 4, label: 'Deal returned to pre-credit; re-processed', sys: true },
    { id: 'K1', lane: L.CR, col: 5, label: 'Re-assessed', ctrl: 'C6' },
    { id: 'E1', lane: L.RM, col: 6, label: 'Continue to Completion', type: 'end' },
  ],
  edges: [{ from: 'C1', to: 'R1' }, { from: 'R1', to: 'D1' }, { from: 'D1', to: 'S1', label: 'No' }, { from: 'D1', to: 'S2', label: 'Yes' }, { from: 'S2', to: 'K1' }, { from: 'K1', to: 'E1' }, { from: 'S1', to: 'E1' }],
  observations: ['Straw-man. The source says only that the deal is “re-processed”. Whether a minor change (e.g. drawdown date) triggers a full re-approval determines the size of the C3 rework loop.'],
  questions: ['Is there any materiality threshold, or does every post-approval change go back through Credit?', 'How often does this occur on New Money and Increase deals?'],
});

maps.push({ id: 'EX-04', journey: 'Exception path', stage: 'In-flight CAP referral to SBS', source: 'Not mapped in source (blue sub-process box on Deal & Credit maps)', workshop: 'WS-07 / WS-11', status: 'Straw-man – to be built in workshop',
  lanes: [L.RM, L.SY, L.CR, L.SB],
  steps: [
    { id: 'K1', lane: L.CR, col: 0, label: 'Distress identified during assessment of a live deal', type: 'start', ctrl: 'C7' },
    { id: 'D1', lane: L.CR, col: 1, label: 'Hold live deal or decide first?', type: 'decision' },
    { id: 'S1', lane: L.SY, col: 2, label: 'CAP Referral deal created alongside live deal', sys: true },
    { id: 'R1', lane: L.RM, col: 3, label: 'RM informed; customer contact as agreed with Credit', wait: true },
    { id: 'B1', lane: L.SB, col: 4, label: 'SBS reviews referral (→ CR-2 from S4)', ctrl: 'C14' },
    { id: 'D2', lane: L.SB, col: 5, label: 'Accept?', type: 'decision' },
    { id: 'E1', lane: L.SB, col: 6, label: 'Categorised; live deal handled under CAP Strategy', type: 'end' },
    { id: 'E2', lane: L.CR, col: 6, label: 'Returned to Credit; live deal decision resumes', type: 'end' },
  ],
  edges: [{ from: 'K1', to: 'D1' }, { from: 'D1', to: 'S1' }, { from: 'S1', to: 'R1' }, { from: 'S1', to: 'B1' }, { from: 'B1', to: 'D2' }, { from: 'D2', to: 'E1', label: 'Yes' }, { from: 'D2', to: 'E2', label: 'No' }],
  observations: ['Straw-man. The live deal’s fate while the referral is reviewed (held, declined, or approved with conditions) is undefined in the source. Existing-customer deals only.'],
  questions: ['What happens to the original deal while SBS reviews?', 'Is the referral a separate deal record, or a status on the live deal?'],
});

maps.push({ id: 'EX-05', journey: 'Exception path', stage: 'Security preparation (Lending Services)', source: 'Not mapped in source (blue sub-process box on Completion maps)', workshop: 'WS-12', status: 'Straw-man – to be built in workshop',
  lanes: [L.CU, L.RM, L.SY, L.LS],
  steps: [
    { id: 'R1', lane: L.RM, col: 0, label: 'RM instructs Lending Services (security required per approval)', type: 'start', note: 'Instruction channel unknown: BLP task, email, or form' },
    { id: 'G1', lane: L.LS, col: 1, label: 'Instruction received; security items identified', wait: true },
    { id: 'G2', lane: L.LS, col: 2, label: 'Security documents prepared (charge, guarantee, debenture)', ctrl: 'C23', note: 'C23: security documentation per approved terms' },
    { id: 'G3', lane: L.LS, col: 3, label: 'Documents issued for execution (direct or via RM / solicitor)', wait: true },
    { id: 'C1', lane: L.CU, col: 4, label: 'Customer / guarantor executes documents', wait: true },
    { id: 'G4', lane: L.LS, col: 5, label: 'Executed documents checked; registration (Companies House / Land Registry) where required', ctrl: 'C10' },
    { id: 'S1', lane: L.SY, col: 6, label: 'Security marked in BLP as complete', sys: true },
    { id: 'E1', lane: L.RM, col: 7, label: 'Completion condition satisfied (→ NM-3 S5)', type: 'end' },
  ],
  edges: [{ from: 'R1', to: 'G1' }, { from: 'G1', to: 'G2' }, { from: 'G2', to: 'G3' }, { from: 'G3', to: 'C1' }, { from: 'C1', to: 'G4' }, { from: 'G4', to: 'S1' }, { from: 'S1', to: 'E1' }],
  observations: ['Straw-man. Security preparation is likely the longest parallel path in completion and is invisible in the source maps except as a sub-process box. Hypothesis C4 depends on measuring it.'],
  questions: ['How is the instruction passed to Lending Services, and is there a queue?', 'What is the elapsed time from instruction to “security complete”, by security type?', 'Is registration tracked in BLP or in a separate Lending Services system?'],
});

maps.push({ id: 'DP-1', journey: 'Deposit opportunity', stage: 'Record and close', source: 'Derived from RFP description and NM-1', workshop: 'WS-02', status: 'Draft for validation',
  lanes: [L.CU, L.RM, L.SY],
  steps: [
    { id: 'C0', lane: L.CU, col: 0, label: 'Customer expresses interest in a deposit product', type: 'start' },
    { id: 'R1', lane: L.RM, col: 1, label: 'RM discusses product and rate', note: 'Rate exceptions: approval route outside BLP, if any' },
    { id: 'S1', lane: L.SY, col: 2, label: 'Create deposit opportunity (NM-1 S6)', sys: true },
    { id: 'C1', lane: L.CU, col: 3, label: 'Customer decides', wait: true },
    { id: 'D1', lane: L.RM, col: 4, label: 'Outcome?', type: 'decision' },
    { id: 'E1', lane: L.SY, col: 5, label: 'Marked Won', type: 'end' },
    { id: 'E2', lane: L.SY, col: 6, label: 'Marked Declined by Bank / Declined by Customer (no reason code)', type: 'end' },
  ],
  edges: [{ from: 'C0', to: 'R1' }, { from: 'R1', to: 'S1' }, { from: 'S1', to: 'C1' }, { from: 'C1', to: 'D1' }, { from: 'D1', to: 'E1', label: 'Won' }, { from: 'D1', to: 'E2', label: 'Declined' }],
  observations: ['No workflow, no approval, no reason code. 98 in progress. Account opening itself happens outside BLP. Location decision SD-03 due by G1.'],
  questions: ['Where is a deposit rate exception approved today?', 'Does anyone use the deposit pipeline for MI?'],
});

module.exports = { maps, L };
