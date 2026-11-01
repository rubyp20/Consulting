const { chromium } = require('playwright');
const D = '/home/user/Consulting/docs/phase-2';
const jobs = [
  { html: `${D}/2.1-design-principles.html`, pdf: `${D}/2.1-Design-Principles.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.1 Design Principles · v0.9 for Design Authority' },
  { html: `${D}/2.2-journey-pattern-definitions.html`, pdf: `${D}/2.2-Journey-Pattern-Definitions.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.2 Journey Pattern Definitions · v0.8 for Design Authority' },
  { html: `${D}/2.3-to-be-process-maps.html`, pdf: `${D}/2.3-To-Be-Process-Maps-L3-L4.pdf`, landscape: true, title: 'BB-BLP-BPR · 2.3 To-Be Process Maps L3/L4 · v0.6 design draft' },
  { html: `${D}/2.4-routing-design-and-rules-tables.html`, pdf: `${D}/2.4-Routing-Design-and-Rules-Tables.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.4 Risk-Based Routing Design and Rules Tables · v0.5 for co-design' },
  { html: `${D}/2.5-control-equivalence-register.html`, pdf: `${D}/2.5-Control-Equivalence-Register.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.5 Control Equivalence Register · v0.6 for second-line review' },
  { html: `${D}/2.6-gap-analysis.html`, pdf: `${D}/2.6-Gap-Analysis.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.6 Gap Analysis · v0.7' },
  { html: `${D}/2.7-fit-gap-assessment.html`, pdf: `${D}/2.7-Fit-Gap-Assessment.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.7 Fit-Gap Assessment · v0.5 expected classifications for workshops' },
  { html: `${D}/2.8-process-requirements-pack.html`, pdf: `${D}/2.8-Process-Requirements-Pack.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.8 Process Requirements Pack · v0.7 interim release' },
  { html: `${D}/2.9-target-operating-model.html`, pdf: `${D}/2.9-Target-Operating-Model.pdf`, landscape: false, title: 'BB-BLP-BPR · 2.9 Target Operating Model · v0.6' },
];
(async () => {
  const b = await chromium.launch();
  for (const j of jobs) {
    const p = await b.newPage();
    await p.goto('file://' + j.html, { waitUntil: 'load' });
    await p.pdf({ path: j.pdf, format: j.landscape ? 'A3' : 'A4', landscape: j.landscape, printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:7pt;color:#666;width:100%;padding:0 16mm;">${j.title}</div>`,
      footerTemplate: '<div style="font-size:7pt;color:#666;width:100%;padding:0 14mm;text-align:right;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      margin: j.landscape ? { top: '14mm', bottom: '16mm', left: '16mm', right: '16mm' } : { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' } });
    await p.close();
  }
  await b.close();
})();
