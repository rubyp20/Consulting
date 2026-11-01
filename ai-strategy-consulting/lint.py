import sys,re,glob
REQ=['## 1. Why a client cares','## 2. Concept and mechanism','## 3. Frameworks','## 4. Worked BFSI example','## 5. Real-world case','## 6. Consultant language','## 7. Common mistakes juniors make','## 8. Interview questions with model answers','## 9. Self-check quiz']
for f in sorted(glob.glob('modules/*.md')):
    s=open(f).read(); issues=[]
    words=len(s.split())
    if not re.match(r'# Module \d{1,2} — ',s): issues.append('H1 format')
    n=f.split('/')[-1][:2]
    if n not in ('00','18','19','20'):
        missing=[r for r in REQ if r not in s]
        if missing: issues.append('missing sections: '+', '.join(m[3:12] for m in missing))
    if re.search(r'<[a-z]+[ >]',s): issues.append('HTML tag')
    if '####' in s: issues.append('H4 used')
    labels=len(re.findall(r'\[(PUBLIC|ILLUSTRATIVE|ESTIMATE|VERIFY)',s))
    # table column consistency
    bad=0
    for block in re.findall(r"((?:^\|[^\n]*\|[ \t]*\n?)+)",s,flags=re.M):
        rows=[r for r in block.strip().split('\n')]
        cols={r.count('|') for r in rows}
        if len(cols)>1: bad+=1
    if bad: issues.append(f'{bad} tables with ragged columns')
    emd=len(re.findall(r'(?<!^# Module \d\d) — ',s,flags=re.M))
    print(f'{f}: {words} words, {labels} labels, {emd} em-dashes; '+('; '.join(issues) if issues else 'OK'))
