#!/usr/bin/env bash
# Compiles the modules, recaps and answer key into one Word document and a PDF.
set -euo pipefail
cd "$(dirname "$0")"
SCRATCH="${SCRATCH:-/tmp/claude-0/-home-user-Consulting/5d3ae399-3dec-5d6d-888c-a0ce93f71f6b/scratchpad}"
OUT_BASE="AI-Strategy-Consulting-Foundations-to-Expert"
PB='```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```'
{
  cat 00-front-matter.md
  for n in 00 01 02 03 04 05; do f=$(ls modules/${n}-*.md); printf '\n\n%s\n\n' "$PB"; cat "$f"; done
  [ -f recaps/recap-1-modules-1-5.md ] && { printf '\n\n%s\n\n' "$PB"; cat recaps/recap-1-modules-1-5.md; }
  for n in 06 07 08 09 10; do f=$(ls modules/${n}-*.md); printf '\n\n%s\n\n' "$PB"; cat "$f"; done
  [ -f recaps/recap-2-modules-6-10.md ] && { printf '\n\n%s\n\n' "$PB"; cat recaps/recap-2-modules-6-10.md; }
  for n in 11 12 13 14 15; do f=$(ls modules/${n}-*.md); printf '\n\n%s\n\n' "$PB"; cat "$f"; done
  [ -f recaps/recap-3-modules-11-15.md ] && { printf '\n\n%s\n\n' "$PB"; cat recaps/recap-3-modules-11-15.md; }
  for n in 16 17 18 19 20; do f=$(ls modules/${n}-*.md); printf '\n\n%s\n\n' "$PB"; cat "$f"; done
  [ -f recaps/recap-4-modules-16-20.md ] && { printf '\n\n%s\n\n' "$PB"; cat recaps/recap-4-modules-16-20.md; }
  printf '\n\n%s\n\n# Appendix — Answer keys\n\nAttempt each quiz before reading its key. Each answer gives the expected response, a short explanation, and what a manager-level AI consultant would add.\n\n' "$PB"
  for f in answers/*.md; do printf '\n\n'; sed -E 's/^# /## /; s/^## ([0-9])/## \1/' "$f" | sed -E 's/^(#+) /\1 /'; done
} > "$SCRATCH/compiled.md"
# demote answer-file headings by one level so they nest under the appendix H1
python3 - "$SCRATCH/compiled.md" <<'PY'
import sys,re
p=sys.argv[1]; s=open(p).read()
head,sep,tail=s.partition('# Appendix — Answer keys')
tail=re.sub(r'(?m)^(#{1,5}) ', lambda m: '#'*(len(m.group(1))+1)+' ' if len(m.group(1))>=2 else m.group(0), tail)
open(p,'w').write(head+sep+tail)
PY
wc -w "$SCRATCH/compiled.md"
pandoc "$SCRATCH/compiled.md" -o "$SCRATCH/raw.docx" --reference-doc="$SCRATCH/custom-ref.docx" --toc --toc-depth=2 -f markdown+pipe_tables+raw_attribute --wrap=none
python3 "$SCRATCH/postprocess.py" "$SCRATCH/raw.docx" "$SCRATCH/pp.docx"
timeout 900 python3 "$SCRATCH/lo_finalise.py" "$SCRATCH/pp.docx" "$OUT_BASE.docx" "$OUT_BASE.pdf"
ls -la "$OUT_BASE".*
