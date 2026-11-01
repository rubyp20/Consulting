// Swimlane renderer: converts a map definition into an SVG string.
// Map = { id, title, lanes:[names], steps:[{id,lane,col,label,type,ctrl,wait,sys}], edges:[{from,to,label}] }
// type: task | decision | start | end | sub (sub-process) | note
// ctrl: control reference shown as a badge; wait: true marks a waiting point; sys: true marks a system step

const COL_W = 110, BOX_W = 98, BOX_H = 52, LANE_PAD = 14, LANE_LABEL_W = 82, TOP = 8;
const LANE_H = BOX_H + 2 * LANE_PAD + 10;

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function wrap(text, maxChars) {
  const words = text.split(' '); const lines = []; let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) { if (cur) lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}

function render(map) {
  const lanes = map.lanes; const nCols = Math.max(...map.steps.map(s => s.col)) + 1;
  const W = LANE_LABEL_W + nCols * COL_W + 10; const H = TOP + lanes.length * LANE_H + 26;
  const laneY = i => TOP + i * LANE_H;
  const pos = {}; for (const s of map.steps) {
    const li = lanes.indexOf(s.lane); if (li < 0) throw new Error(`${map.id}: unknown lane ${s.lane} for ${s.id}`);
    pos[s.id] = { cx: LANE_LABEL_W + s.col * COL_W + COL_W / 2, cy: laneY(li) + LANE_H / 2, s };
  }
  let out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" font-family="Arial, Helvetica, sans-serif">`);
  out.push(`<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#444"/></marker></defs>`);
  // lanes
  lanes.forEach((ln, i) => {
    const y = laneY(i);
    out.push(`<rect x="0" y="${y}" width="${W}" height="${LANE_H}" fill="${i % 2 ? '#f7f9fb' : '#ffffff'}" stroke="#b9c3cf" stroke-width="0.8"/>`);
    out.push(`<rect x="0" y="${y}" width="${LANE_LABEL_W}" height="${LANE_H}" fill="#e6edf5" stroke="#b9c3cf" stroke-width="0.8"/>`);
    const ll = wrap(ln, 12);
    ll.forEach((t, k) => out.push(`<text x="${LANE_LABEL_W / 2}" y="${y + LANE_H / 2 + (k - (ll.length - 1) / 2) * 11}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#0b3d6b">${esc(t)}</text>`));
  });
  // edges
  const chanY = TOP + lanes.length * LANE_H + 12;
  for (const e of map.edges) {
    const a = pos[e.from], b = pos[e.to]; if (!a || !b) throw new Error(`${map.id}: bad edge ${e.from}->${e.to}`);
    const hw = BOX_W / 2, hh = BOX_H / 2; let d = ''; let lx, ly;
    if (b.s.col > a.s.col && a.cy === b.cy) { d = `M${a.cx + hw},${a.cy} L${b.cx - hw},${b.cy}`; lx = (a.cx + b.cx) / 2; ly = a.cy - 4; }
    else if (b.s.col === a.s.col) { const down = b.cy > a.cy; d = `M${a.cx},${a.cy + (down ? hh : -hh)} L${b.cx},${b.cy + (down ? -hh : hh)}`; lx = a.cx + 4; ly = (a.cy + b.cy) / 2; }
    else if (b.s.col > a.s.col) { d = `M${a.cx + hw},${a.cy} L${b.cx},${a.cy} L${b.cx},${b.cy + (b.cy > a.cy ? -hh : hh)}`; lx = (a.cx + hw + b.cx) / 2; ly = a.cy - 4; }
    else { // back edge: route through the channel below all lanes
      d = `M${a.cx},${a.cy + hh} L${a.cx},${chanY} L${b.cx},${chanY} L${b.cx},${b.cy + hh}`; lx = (a.cx + b.cx) / 2; ly = chanY - 3;
    }
    out.push(`<path d="${d}" fill="none" stroke="#444" stroke-width="1" marker-end="url(#ar)"/>`);
    if (e.label) out.push(`<text x="${lx}" y="${ly}" font-size="7.5" fill="#7a2e00" text-anchor="${b.s.col === a.s.col ? 'start' : 'middle'}" font-style="italic">${esc(e.label)}</text>`);
  }
  // steps
  for (const s of map.steps) {
    const p = pos[s.id]; const x = p.cx - BOX_W / 2, y = p.cy - BOX_H / 2;
    if (s.type === 'decision') out.push(`<polygon points="${p.cx},${y - 4} ${x + BOX_W + 6},${p.cy} ${p.cx},${y + BOX_H + 4} ${x - 6},${p.cy}" fill="#fff8e6" stroke="#c48a00" stroke-width="1.1"/>`);
    else if (s.type === 'start' || s.type === 'end') out.push(`<rect x="${x}" y="${y}" width="${BOX_W}" height="${BOX_H}" rx="22" fill="#eef3f8" stroke="#0b3d6b" stroke-width="1.1"/>`);
    else if (s.type === 'sub') out.push(`<rect x="${x}" y="${y}" width="${BOX_W}" height="${BOX_H}" fill="#2f6db5" stroke="#1d4f8a" stroke-width="1.1"/><rect x="${x + 3}" y="${y + 3}" width="${BOX_W - 6}" height="${BOX_H - 6}" fill="none" stroke="#ffffff" stroke-width="0.7"/>`);
    else if (s.type === 'note') out.push(`<rect x="${x}" y="${y}" width="${BOX_W}" height="${BOX_H}" fill="#fffbe6" stroke="#d6c25a" stroke-width="0.8" stroke-dasharray="3,2"/>`);
    else out.push(`<rect x="${x}" y="${y}" width="${BOX_W}" height="${BOX_H}" rx="2" fill="${s.sys ? '#f1f1f1' : '#ffffff'}" stroke="#333" stroke-width="1"/>`);
    const fill = s.type === 'sub' ? '#fff' : '#111';
    const lines = wrap(s.label, s.type === 'decision' ? 13 : 18);
    lines.forEach((t, k) => out.push(`<text x="${p.cx}" y="${p.cy + (k - (lines.length - 1) / 2) * 9.5 + 3}" text-anchor="middle" font-size="${s.type === 'decision' ? 7.8 : 8.4}" fill="${fill}">${esc(t)}</text>`));
    // badges
    let bx = x + BOX_W - 9;
    if (s.ctrl) { out.push(`<rect x="${bx - 8}" y="${y - 6}" width="18" height="11" rx="2" fill="#7a2e00"/><text x="${bx + 1}" y="${y + 2.5}" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff">${esc(s.ctrl)}</text>`); bx -= 21; }
    if (s.wait) { out.push(`<circle cx="${bx}" cy="${y - 1}" r="5.5" fill="#fff" stroke="#b36b00" stroke-width="1"/><path d="M${bx},${y - 4.5} L${bx},${y - 1} L${bx + 2.5},${y + 0.5}" fill="none" stroke="#b36b00" stroke-width="1"/>`); bx -= 14; }
    if (s.id && s.type !== 'note') out.push(`<text x="${x + 2}" y="${y + BOX_H - 2}" font-size="6" fill="#888">${esc(s.id)}</text>`);
  }
  out.push(`</svg>`);
  return out.join('\n');
}

function legend() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 34" width="100%" font-family="Arial, Helvetica, sans-serif" font-size="8">
  <rect x="4" y="8" width="54" height="18" rx="2" fill="#fff" stroke="#333"/><text x="31" y="20" text-anchor="middle" font-size="7">Manual step</text>
  <rect x="68" y="8" width="54" height="18" rx="2" fill="#f1f1f1" stroke="#333"/><text x="95" y="20" text-anchor="middle" font-size="7">System step</text>
  <polygon points="160,5 186,17 160,29 134,17" fill="#fff8e6" stroke="#c48a00"/><text x="160" y="20" text-anchor="middle" font-size="6.5">Decision</text>
  <rect x="196" y="8" width="54" height="18" rx="9" fill="#eef3f8" stroke="#0b3d6b"/><text x="223" y="20" text-anchor="middle" font-size="7">Start / End</text>
  <rect x="260" y="8" width="54" height="18" fill="#2f6db5" stroke="#1d4f8a"/><text x="287" y="20" text-anchor="middle" font-size="7" fill="#fff">Sub-process</text>
  <rect x="324" y="8" width="54" height="18" fill="#fffbe6" stroke="#d6c25a" stroke-dasharray="3,2"/><text x="351" y="20" text-anchor="middle" font-size="7">Note</text>
  <rect x="392" y="9" width="18" height="11" rx="2" fill="#7a2e00"/><text x="401" y="17.5" text-anchor="middle" font-size="7" fill="#fff" font-weight="bold">C1</text><text x="414" y="19" font-size="7.5">Control point (ref. to control inventory)</text>
  <circle cx="572" cy="15" r="5.5" fill="#fff" stroke="#b36b00"/><path d="M572,11.5 L572,15 L574.5,16.5" fill="none" stroke="#b36b00"/><text x="582" y="19" font-size="7.5">Wait point (customer or queue)</text>
  <line x1="712" y1="15" x2="760" y2="15" stroke="#444" marker-end="url(#ar)"/><text x="766" y="19" font-size="7.5" fill="#7a2e00" font-style="italic">labelled flow / loop-back</text>
  </svg>`;
}

module.exports = { render, legend };
