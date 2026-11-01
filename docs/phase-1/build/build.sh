#!/usr/bin/env bash
set -euo pipefail
D=/home/user/Consulting/docs/phase-1
node "$D/build/build-maps.js"
cat > "$D/build/print.js" <<'EOF'
const { chromium } = require('playwright');
const D = '/home/user/Consulting/docs/phase-1';
const jobs = [
  { html: `${D}/1.1-process-taxonomy-and-inventory.html`, pdf: `${D}/1.1-Process-Taxonomy-and-Inventory.pdf`, landscape: false, title: 'BB-BLP-BPR · 1.1 Process Taxonomy and Inventory · v0.9' },
  { html: `${D}/1.2-as-is-process-maps.html`, pdf: `${D}/1.2-As-Is-Process-Maps-L3-L4.pdf`, landscape: true, title: 'BB-BLP-BPR · 1.2 As-Is Process Maps L3/L4 · v0.3 pre-workshop' },
  { html: `${D}/1.3-deal-type-stage-matrix.html`, pdf: `${D}/1.3-Deal-Type-Stage-Matrix.pdf`, landscape: false, title: 'BB-BLP-BPR · 1.3 Deal Type × Stage Matrix · v0.8' },
  { html: `${D}/1.5-activity-based-effort-baseline.html`, pdf: `${D}/1.5-Activity-Based-Effort-Baseline.pdf`, landscape: false, title: 'BB-BLP-BPR · 1.5 Activity-Based Effort Baseline · v0.5 method and model shell' },
  { html: `${D}/1.6-control-policy-da-inventory.html`, pdf: `${D}/1.6-Control-Policy-DA-Inventory.pdf`, landscape: false, title: 'BB-BLP-BPR · 1.6 Control, Policy and Delegated-Authority Inventory · v0.6' },
  { html: `${D}/1.7-workaround-inventory.html`, pdf: `${D}/1.7-Workaround-Inventory.pdf`, landscape: false, title: 'BB-BLP-BPR · 1.7 Workaround Inventory · v0.6' },
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
EOF
node "$D/build/print.js"
ls -la "$D"/*.pdf
