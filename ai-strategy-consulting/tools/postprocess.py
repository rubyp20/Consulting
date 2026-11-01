"""Post-process a pandoc-generated docx: table style with borders + header shading, full-width tables, updateFields on open."""
import sys, zipfile, re, shutil, os
src, dst = sys.argv[1], sys.argv[2]
TABLE_STYLE = '''<w:style w:type="table" w:styleId="Table"><w:name w:val="Table"/><w:basedOn w:val="TableNormal"/><w:uiPriority w:val="59"/>
<w:pPr><w:spacing w:before="20" w:after="20" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr>
<w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="BFC7D1"/><w:left w:val="single" w:sz="4" w:space="0" w:color="BFC7D1"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="BFC7D1"/><w:right w:val="single" w:sz="4" w:space="0" w:color="BFC7D1"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="BFC7D1"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="BFC7D1"/></w:tblBorders>
<w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>
<w:tblStylePr w:type="firstRow"><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="13315C"/></w:tcPr></w:tblStylePr>
<w:tblStylePr w:type="band2Horz"><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F5F7FA"/></w:tcPr></w:tblStylePr>
</w:style>'''
TABLE_NORMAL = '<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>'
zin = zipfile.ZipFile(src)
zout = zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED)
for item in zin.infolist():
    data = zin.read(item.filename)
    if item.filename == 'word/styles.xml':
        s = data.decode('utf8')
        s = re.sub(r'<w:style w:type="table" w:styleId="Table">.*?</w:style>', '', s, flags=re.S)
        if 'w:styleId="TableNormal"' not in s:
            s = s.replace('</w:styles>', TABLE_NORMAL + '</w:styles>')
        s = s.replace('</w:styles>', TABLE_STYLE + '</w:styles>')
        data = s.encode('utf8')
    elif item.filename == 'word/document.xml':
        s = data.decode('utf8')
        # full-width tables, banded rows look
        s = re.sub(r'<w:tblW [^>]*/>', '<w:tblW w:w="5000" w:type="pct"/>', s)
        s = re.sub(r'<w:tblLook [^>]*/>', '<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>', s)
        # pandoc marks header rows with tblHeader; ensure first-row conditional style is applied by setting cnfStyle on header row
        s = s.replace('<w:trPr><w:tblHeader /></w:trPr>', '<w:trPr><w:cnfStyle w:val="100000000000"/><w:tblHeader/></w:trPr>')
        s = s.replace('<w:trPr><w:tblHeader/></w:trPr>', '<w:trPr><w:cnfStyle w:val="100000000000"/><w:tblHeader/></w:trPr>')
        # wide tables: shrink font to 7pt and tighten cell margins when more than 7 columns
        def shrink(m):
            t = m.group(0)
            ncols = len(re.findall(r'<w:gridCol', t))
            if ncols <= 7: return t
            t = re.sub(r'<w:rPr>', '<w:rPr><w:sz w:val="14"/><w:szCs w:val="14"/>', t)
            t = re.sub(r'<w:r>(?!<w:rPr>)', '<w:r><w:rPr><w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr>', t)
            t = t.replace('<w:tblPr>', '<w:tblPr><w:tblCellMar><w:left w:w="40" w:type="dxa"/><w:right w:w="40" w:type="dxa"/></w:tblCellMar>', 1)
            return t
        s = re.sub(r'<w:tbl>.*?</w:tbl>', shrink, s, flags=re.S)
        # proportional column widths from content length (pandoc gives equal widths for pipe tables)
        TOTAL = 9306  # A4 text width in DXA at 1300 margins
        def widths(m):
            t = m.group(0)
            grid = re.findall(r'<w:gridCol w:w="\d+"\s*/>', t)
            n = len(grid)
            if n < 2: return t
            rows = re.findall(r'<w:tr[ >].*?</w:tr>', t, flags=re.S)
            maxlen = [0]*n; hdrlen = [0]*n
            for ri, r in enumerate(rows):
                cells = re.findall(r'<w:tc>.*?</w:tc>', r, flags=re.S)
                if len(cells) != n: return t
                for ci, c in enumerate(cells):
                    txt = ''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', c))
                    words = txt.split()
                    longest = max([len(w) for w in words] or [0])
                    # effective length: total chars capped, but never below longest word
                    eff = max(min(len(txt), 60), longest, 3)
                    if ri == 0: hdrlen[ci] = max(hdrlen[ci], min(len(txt), 18))
                    maxlen[ci] = max(maxlen[ci], eff)
            w = [max(maxlen[i], hdrlen[i], 4) ** 0.75 for i in range(n)]
            tot = sum(w); cols = [max(int(TOTAL * x / tot), 700) for x in w]
            # never narrower than the longest header word (approx 95 DXA per char at 7-9pt, plus cell margins)
            hdrcells = re.findall(r'<w:tc>.*?</w:tc>', rows[0], flags=re.S)
            for i, c in enumerate(hdrcells):
                txt = ''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', c))
                lw = max([len(x) for x in txt.split()] or [0])
                cols[i] = max(cols[i], lw * 95 + 220)
            diff = TOTAL - sum(cols)
            # take the difference from the widest columns proportionally
            if diff != 0:
                big = sorted(range(n), key=lambda i: -cols[i])[:max(1, n // 2)]
                share = sum(cols[i] for i in big)
                for i in big: cols[i] += int(diff * cols[i] / share)
                cols[big[0]] += TOTAL - sum(cols)
            t = re.sub(r'<w:tblGrid>.*?</w:tblGrid>', '<w:tblGrid>' + ''.join(f'<w:gridCol w:w="{c}"/>' for c in cols) + '</w:tblGrid>', t, flags=re.S)
            # set each cell width in order (pandoc emits empty <w:tcPr /> per cell)
            out = []; ci = 0
            for part in re.split(r'(<w:tcPr\s*/>|<w:tcPr>)', t):
                if part.startswith('<w:tcPr'):
                    w_ = cols[ci % n]; ci += 1
                    part = f'<w:tcPr><w:tcW w:w="{w_}" w:type="dxa"/></w:tcPr>' if part.rstrip('>').endswith('/') else f'<w:tcPr><w:tcW w:w="{w_}" w:type="dxa"/>'
                out.append(part)
            t = ''.join(out)
            t = re.sub(r'<w:tblLayout [^>]*/>', '', t)
            t = t.replace('</w:tblPr>', '<w:tblLayout w:type="fixed"/></w:tblPr>', 1)
            return t
        s = re.sub(r'<w:tbl>.*?</w:tbl>', widths, s, flags=re.S)
        data = s.encode('utf8')
    elif item.filename == 'word/settings.xml':
        s = data.decode('utf8')
        if 'w:updateFields' not in s:
            s = s.replace('<w:zoom', '<w:updateFields w:val="true"/><w:zoom', 1) if '<w:zoom' in s else s.replace('</w:settings>', '<w:updateFields w:val="true"/></w:settings>')
        data = s.encode('utf8')
    zout.writestr(item, data)
zout.close()
print('postprocessed', dst)
