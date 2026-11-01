const fs = require('fs'); const path = require('path');
const { render, legend } = require('./swimlane'); const { maps } = require('./maps');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const typeName = s => s.type === 'decision' ? 'Decision' : s.type === 'start' ? 'Start' : s.type === 'end' ? 'End' : s.type === 'sub' ? 'Sub-process' : s.type === 'note' ? '' : s.sys ? 'System' : 'Manual';

// Control index: collect every Cn with the first note that defines it
const ctrlDefs = {
  C0: 'RM initial overview / pre-screen', C1: 'Customer identification (CIF lookup, party records)', C2: 'Credit analytics: ECRS, lending category, debt servicing, credit memo, external credit integrity checks',
  C3: 'Deal validation (completeness, mandatory fields)', C4: 'Facility letter / agreement documents checked against approved terms', C5: 'Delegated-authority check',
  C6: 'Independent credit assessment', C7: 'Financial distress screen (existing customers)', C8: 'Returned facility letter checked against issued terms', C9: 'Pre-conditions / conditions precedent checklist',
  C10: 'Security perfected / released by Lending Services or Securities Team', C11: 'Fulfilment against approved and documented terms', C12: 'Outstanding balance repaid before facility removal',
  C13: 'Credit authority decides whether CAP referral proceeds to SBS', C14: 'SBS categorisation decision', C15: 'Forbearance assessment (regulatory)', C16: 'CAP Strategy memo',
  C17: 'ERV, provisions and write-off data (impairment reporting)', C18: 'SBS approval authority', C19: 'Reallocation / tranche within pre-approved limit', C20: 'Decline communication to customer',
  C21: 'Appeal reviewed independently of original decision-maker', C22: 'Materiality of post-approval change', C23: 'Security documentation per approved terms',
};
const ctrlUse = {}; for (const m of maps) for (const s of m.steps) if (s.ctrl) (ctrlUse[s.ctrl] = ctrlUse[s.ctrl] || new Set()).add(m.id);

let h = [];
h.push(`<!doctype html><html><head><meta charset="utf-8"><title>1.2 As-Is Process Maps L3/L4</title><style>
@page { size: A3 landscape; margin: 14mm 16mm 16mm 16mm; }
body { font-family: "Segoe UI", Arial, Helvetica, sans-serif; font-size: 9.6pt; line-height: 1.35; color: #1a1a1a; }
h1 { font-size: 17pt; color: #0b3d6b; border-bottom: 2px solid #0b3d6b; padding-bottom: 3pt; margin: 0 0 8pt 0; }
h2 { font-size: 12.5pt; color: #0b3d6b; margin: 12pt 0 4pt 0; }
h3 { font-size: 10pt; color: #1f4f82; margin: 8pt 0 3pt 0; }
table { border-collapse: collapse; width: 100%; margin: 4pt 0 8pt 0; }
th, td { border: 1px solid #b8c4d0; padding: 1.8pt 4pt; vertical-align: top; font-size: 8.3pt; }
th { background: #e6edf5; text-align: left; }
.pb { page-break-before: always; }
.meta td:first-child { width: 14%; color: #555; }
.hdr { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6pt; margin-bottom: 4pt; }
.hdr div { border: 1px solid #b8c4d0; padding: 3pt 5pt; font-size: 8pt; background: #f7f9fb; }
.hdr b { color: #0b3d6b; }
.status-draft { color: #0b3d6b; } .status-straw { color: #7a2e00; font-weight: bold; }
.obs li, .q li { margin-bottom: 1pt; } .obs, .q { margin: 2pt 0 4pt 0; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; }
.svgbox { border: 1px solid #d8dee5; padding: 3pt; margin: 3pt 0 6pt 0; }
.cover { padding-top: 55mm; }
.cover h1 { border: 0; font-size: 24pt; }
.small { font-size: 7.5pt; color: #555; }
</style></head><body>`);

// Cover
h.push(`<div class="cover"><p class="small" style="letter-spacing:1px;text-transform:uppercase">Business Bank · Business Banking Transformation Office · BB-BLP-BPR</p>
<h1>1.2 As-Is Process Maps L3/L4<br/><span style="font-size:15pt;color:#1f4f82">Business lending lifecycle on BLP</span></h1>
<table class="meta" style="width:60%;margin-top:20pt"><tr><td>Deliverable</td><td>1.2 Validated as-is maps L3/L4</td></tr><tr><td>Version</td><td>0.3 – pre-workshop baseline (Week 3). Becomes v1.0 after WS-02 to WS-14 validation (Week 6)</td></tr>
<tr><td>Source</td><td>BLP Customer Journeys current-state maps, 22 pages, 02/04/2026 (Replacement Programme); RFP BB-BLP-RFP-001</td></tr><tr><td>Owner</td><td>WS1 Journeys &amp; Process (BPR/TOM Lead)</td></tr><tr><td>Accepted by</td><td>Design Authority (v1.0)</td></tr></table></div>`);

// How to read
h.push(`<div class="pb"><h1>How to read this document</h1>
<h2>Legend</h2><div class="svgbox" style="width:70%">${legend()}</div>
<div class="two"><div>
<h2>Purpose</h2><p>These maps are the fact base for Phase 1. They redraw the 22 current-state maps produced for the Replacement Programme in a single consistent notation, and add what those maps do not show: control points, wait points, system versus manual steps, segment variants, and the five exception paths that were drawn as sub-process boxes without content.</p>
<h2>Status of each map</h2><p><span class="status-draft">Draft for validation</span>: redrawn from the source with enrichment; to be confirmed in the named workshop. <span class="status-straw">Straw-man</span>: no source map exists; drawn from notes and RFP text to give the workshop something to correct. Nothing in a straw-man should be treated as fact.</p>
<h2>Levels</h2><p><b>L3</b> is the swimlane diagram: one per journey stage, actor lanes, decision points, hand-offs. <b>L4</b> is the step table beneath it: one row per step with type, control, wait and observation. L4 detail that the source does not support is left blank rather than invented.</p>
<h2>Identifiers</h2><p>Map IDs: journey code + stage (NM-2 = New Money, Deal &amp; Credit). Step IDs are unique within a map; lane prefix R = RM, S = system, K = Credit, C = customer, F = Fulfilment, G = Lending Services, Q = Securities, B = SBS, D = decision, X = sub-process, E = end. Control references Cn link to the control index on the next page and seed deliverable 1.6.</p>
</div><div>
<h2>What the enrichment adds</h2>
<table><tr><th>Marker</th><th>Meaning</th><th>Feeds</th></tr>
<tr><td>Cn badge</td><td>A step that exists to satisfy a policy, regulatory, audit or practice control</td><td>1.6 control inventory; Phase 2 control equivalence</td></tr>
<tr><td>Wait clock</td><td>A point where the deal waits on a customer, a queue or a hand-off</td><td>1.4 baseline wait-vs-touch; H-C1 to H-C4</td></tr>
<tr><td>Grey box</td><td>Performed in BLP (system step)</td><td>1.7 workaround inventory; Phase 2 fit-gap</td></tr>
<tr><td>Loop-back arrow</td><td>Rework path</td><td>1.4 rework rates; H-C1, H-C3</td></tr>
<tr><td>Observations</td><td>What the map shows that matters for design, tagged to hypotheses</td><td>1.9 pain-point register; 1.11 report</td></tr>
<tr><td>Open questions</td><td>What the workshop must answer</td><td>Workshop agendas WS-02 to WS-14</td></tr></table>
</div></div></div>`);

// Map index
h.push(`<div class="pb"><h1>Map index</h1><table><tr><th>Map</th><th>Journey</th><th>Stage</th><th>Lanes</th><th>Steps</th><th>Controls</th><th>Wait points</th><th>Source</th><th>Workshop</th><th>Status</th></tr>`);
for (const m of maps) h.push(`<tr><td><b>${m.id}</b></td><td>${esc(m.journey)}</td><td>${esc(m.stage)}</td><td>${m.lanes.join(', ')}</td><td>${m.steps.filter(s => s.type !== 'note').length}</td><td>${[...new Set(m.steps.filter(s => s.ctrl).map(s => s.ctrl))].join(', ')}</td><td>${m.steps.filter(s => s.wait).length}</td><td>${esc(m.source)}</td><td>${m.workshop}</td><td class="${m.status.startsWith('Straw') ? 'status-straw' : 'status-draft'}">${esc(m.status)}</td></tr>`);
h.push(`</table>
<h2>Structural findings visible before validation</h2>
<table><tr><th>#</th><th>Finding</th><th>Evidence in the maps</th><th>Hypothesis</th></tr>
<tr><td>F1</td><td>One deal-start sequence serves every journey</td><td>Steps S1–S4 + retrieve (login, landing page, search, located, retrieve details) are identical in NM-1, RN-1, VA-1, RF-1, CR-1, CS-1, SL-1, SR-1, SD-1 — nine journeys, same five steps</td><td>B1</td></tr>
<tr><td>F2</td><td>One Deal &amp; Credit flow serves New Money, Renewal, Variation and Shadow Limit origination</td><td>NM-2, RN-2, VA-2, SL-2 differ only in start label, the “no” sub-process (decline / withdraw / remove) and notes</td><td>A1, B2</td></tr>
<tr><td>F3</td><td>One Completion &amp; Fulfilment flow serves six journeys</td><td>NM-3, VA-3, SL-3, SR-2, SD-2 share 15 steps; RN-3 is a shortened version without security</td><td>B2, C2</td></tr>
<tr><td>F4</td><td>Two genuine fast-tracks already exist</td><td>SR-1 and SD-1: pre-approved facility, straight to PDQ, Credit only on material change</td><td>A2 (model for L1)</td></tr>
<tr><td>F5</td><td>Every Deal &amp; Credit map carries two unbounded loop-backs</td><td>Deferred – further info (to update system) and Declined (to EX-01); no count or time limit</td><td>C1</td></tr>
<tr><td>F6</td><td>Facility letters are manual on every journey and off-platform on two</td><td>“Manual PDF by email” on NM-3; red-flagged off-platform letters on SL-2, SD-1, SD-2</td><td>C2, D2, D3</td></tr>
<tr><td>F7</td><td>Five exception paths are referenced but not mapped</td><td>Decline/appeal/refer, deferral, change after approval, in-flight CAP, security preparation appear only as boxes or notes</td><td>C1, C3, C4</td></tr>
<tr><td>F8</td><td>Segment variation is shown once</td><td>RN-3 only: who checks the returned letter (RM / Business Ops / Corporate Associate)</td><td>WS-14 to establish others</td></tr>
<tr><td>F9</td><td>The deal-type model is worked around</td><td>SD-1 uses deal type “Staged Drawdown” with facility request type “Variation”; Remove All Facilities is mapped but is not a deal type</td><td>B3, B4</td></tr>
</table></div>`);

// Control index
h.push(`<div class="pb"><h1>Control index (seed for 1.6)</h1><p>Every control badge on the maps, with a working definition and where it appears. Source classification (policy / regulatory / audit / practice / system) is populated in WS-13 and recorded in deliverable 1.6.</p>
<table><tr><th>Ref</th><th>Working definition</th><th>Appears in</th><th>Manual / automated (as-is)</th><th>Source classification</th></tr>`);
for (const c of Object.keys(ctrlDefs)) h.push(`<tr><td><b>${c}</b></td><td>${esc(ctrlDefs[c])}</td><td>${ctrlUse[c] ? [...ctrlUse[c]].join(', ') : '—'}</td><td>${['C1', 'C19'].includes(c) ? 'Partly automated' : 'Manual'}</td><td>WS-13</td></tr>`);
h.push(`</table></div>`);

// Maps
for (const m of maps) {
  h.push(`<div class="pb"><h1>${m.id} · ${esc(m.journey)} · ${esc(m.stage)}</h1>
<div class="hdr"><div><b>Source</b><br/>${esc(m.source)}</div><div><b>Validation workshop</b><br/>${esc(m.workshop)}</div><div><b>Status</b><br/><span class="${m.status.startsWith('Straw') ? 'status-straw' : 'status-draft'}">${esc(m.status)}</span></div><div><b>Lanes</b><br/>${m.lanes.join(' · ')}</div></div>
<div class="svgbox">${render(m)}</div>
<div class="two"><div><h3>Observations</h3><ul class="obs">${m.observations.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div><div><h3>Open questions for ${esc(m.workshop)}</h3><ul class="q">${m.questions.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div></div>
<h3>L4 step table</h3><table><tr><th style="width:4%">ID</th><th style="width:11%">Lane</th><th style="width:30%">Step</th><th style="width:8%">Type</th><th style="width:6%">Control</th><th style="width:5%">Wait</th><th>Note / as-is detail</th></tr>`);
  for (const s of m.steps.filter(s => s.type !== 'note')) h.push(`<tr><td>${s.id}</td><td>${esc(s.lane)}</td><td>${esc(s.label)}</td><td>${typeName(s)}</td><td>${s.ctrl || ''}</td><td>${s.wait ? '●' : ''}</td><td>${esc(s.note || '')}</td></tr>`);
  const notes = m.steps.filter(s => s.type === 'note'); if (notes.length) h.push(`<tr><td colspan="7"><b>Notes on source map:</b> ${notes.map(n => esc(n.label)).join(' · ')}</td></tr>`);
  h.push(`</table></div>`);
}

// Validation plan
h.push(`<div class="pb"><h1>Validation plan (Weeks 3–6)</h1>
<table><tr><th>Workshop</th><th>Week</th><th>Maps validated</th><th>Attendees</th><th>Outputs</th></tr>
<tr><td>WS-02</td><td>3</td><td>NM-1, NM-2, DP-1</td><td>WG New/Increase: Senior RM, Credit Manager, Business Direct TL</td><td>Corrected maps; decline-reason capture confirmed; deposit path confirmed</td></tr>
<tr><td>WS-03</td><td>3</td><td>NM-3</td><td>WG New/Increase + Lending Services, Fulfilment</td><td>Letter issuance evidence; 3-month reset handling</td></tr>
<tr><td>WS-04</td><td>4</td><td>RN-1, RN-2, RN-3</td><td>WG Renewal &amp; EPR</td><td>Renewal trigger; fast-track data availability (A2); EPR chain handling</td></tr>
<tr><td>WS-05</td><td>4</td><td>VA-1, VA-2, VA-3</td><td>WG Servicing</td><td>Variation reason taxonomy; which types reach Credit</td></tr>
<tr><td>WS-06</td><td>4</td><td>RF-1, RF-2</td><td>WG Servicing + Securities Team</td><td>Deal type used; associated-party handling; release sequence</td></tr>
<tr><td>WS-07</td><td>4</td><td>CR-1, CR-2, EX-04</td><td>WG Distressed: SBS, Credit, RM</td><td>Referral trigger; live-deal handling; elapsed time to categorisation</td></tr>
<tr><td>WS-08</td><td>5</td><td>CS-1, CS-2</td><td>WG Distressed</td><td>SBS authority; protected fields (ERV, provisions)</td></tr>
<tr><td>WS-09</td><td>5</td><td>SL-1, SL-2, SL-3</td><td>WG Pre-approved Drawdown</td><td>Off-platform letter confirmation; Staged Drawdown type retirement</td></tr>
<tr><td>WS-10</td><td>5</td><td>SR-1, SR-2, SD-1, SD-2</td><td>WG Pre-approved Drawdown</td><td>Material-change triggers; repayment schedule question; letter proportionality</td></tr>
<tr><td>WS-11</td><td>5</td><td>EX-01, EX-02, EX-03</td><td>All WG leads, Credit Manager</td><td>Exception paths built from straw-men; loop limits; appeal process</td></tr>
<tr><td>WS-12</td><td>6</td><td>EX-05; security steps on NM-3, VA-3, RF-2</td><td>Lending Services, Fulfilment, Securities</td><td>Security path elapsed time; instruction channel; registration tracking</td></tr>
<tr><td>WS-13</td><td>6</td><td>All control badges</td><td>WG Controls &amp; Data: Credit Risk Policy, 2nd line</td><td>Control source classification → 1.6</td></tr>
<tr><td>WS-14</td><td>6</td><td>All maps, segment lens</td><td>Team leaders BD / SF; Corporate Associate</td><td>Segment variants marked on maps</td></tr></table>
<h2>Exit criteria for v1.0</h2><ul><li>Every “Draft for validation” map signed off by its working-group lead (Bank) as a true record of current practice</li><li>Every straw-man replaced by a validated map or formally recorded as “no defined process exists”</li><li>Every open question answered or converted to a RAID item</li><li>Every control badge classified in 1.6</li><li>Segment variants marked where they exist; absence of variation confirmed where they do not</li></ul></div>`);

h.push(`</body></html>`);
fs.writeFileSync(path.join(__dirname, '..', '1.2-as-is-process-maps.html'), h.join('\n'));
console.log(`maps: ${maps.length}; controls: ${Object.keys(ctrlDefs).length}`);
