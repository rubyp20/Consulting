// Builds a pandoc reference.docx with custom styles via docx-js, then we keep only styles/numbering/settings.
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, ShadingType, LevelFormat, Footer, Header, PageNumber } = require('docx');
const FONT = 'Calibri';
const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 21 }, paragraph: { spacing: { after: 120, line: 276 } } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 44, bold: true, color: '0B2545', font: FONT }, paragraph: { spacing: { before: 0, after: 360, line: 240 }, alignment: AlignmentType.LEFT } },
      { id: 'Subtitle', name: 'Subtitle', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, color: '4A5568', font: FONT }, paragraph: { spacing: { after: 240 } } },
      { id: 'Heading1', name: 'heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 40, bold: true, color: '0B2545', font: FONT },
        paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: '13315C', space: 4 } } } },
      { id: 'Heading2', name: 'heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 30, bold: true, color: '13315C', font: FONT }, paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 1, keepNext: true } },
      { id: 'Heading3', name: 'heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 25, bold: true, color: '1F4E79', font: FONT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2, keepNext: true } },
      { id: 'Heading4', name: 'heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, italics: true, color: '1F4E79', font: FONT }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 3, keepNext: true } },
      { id: 'BlockText', name: 'Block Text', basedOn: 'Normal', quickFormat: true,
        run: { italics: true, color: '2D3748', size: 21 },
        paragraph: { indent: { left: 480, right: 480 }, spacing: { before: 80, after: 160 },
          border: { left: { style: BorderStyle.SINGLE, size: 18, color: '13315C', space: 8 } }, shading: { type: ShadingType.CLEAR, fill: 'F2F6FA', color: 'auto' } } },
      { id: 'FirstParagraph', name: 'First Paragraph', basedOn: 'Normal', next: 'Body Text', quickFormat: true },
      { id: 'BodyText', name: 'Body Text', basedOn: 'Normal', quickFormat: true },
      { id: 'Compact', name: 'Compact', basedOn: 'Body Text', quickFormat: true, paragraph: { spacing: { before: 20, after: 40 } } },
      { id: 'SourceCode', name: 'Source Code', basedOn: 'Normal', quickFormat: true,
        run: { font: 'Consolas', size: 18 }, paragraph: { shading: { type: ShadingType.CLEAR, fill: 'F4F4F4', color: 'auto' }, spacing: { after: 120 } } },
      { id: 'TOCHeading', name: 'TOC Heading', basedOn: 'Heading1', next: 'Normal', quickFormat: true, paragraph: { outlineLevel: 9 } },
      { id: 'TOC1', name: 'toc 1', basedOn: 'Normal', next: 'Normal', run: { bold: true, size: 22 }, paragraph: { spacing: { before: 120, after: 40 } } },
      { id: 'TOC2', name: 'toc 2', basedOn: 'Normal', next: 'Normal', run: { size: 20 }, paragraph: { indent: { left: 360 }, spacing: { after: 20 } } },
      { id: 'TOC3', name: 'toc 3', basedOn: 'Normal', next: 'Normal', run: { size: 18, color: '4A5568' }, paragraph: { indent: { left: 720 }, spacing: { after: 0 } } },
      { id: 'ImageCaption', name: 'Image Caption', basedOn: 'Normal', run: { italics: true, size: 18, color: '4A5568' } },
      { id: 'TableCaption', name: 'Table Caption', basedOn: 'Normal', run: { italics: true, size: 18, color: '4A5568' } },
      { id: 'Header', name: 'header', basedOn: 'Normal', run: { size: 16, color: '718096' } },
      { id: 'Footer', name: 'footer', basedOn: 'Normal', run: { size: 16, color: '718096' }, paragraph: { alignment: AlignmentType.CENTER } },
    ],
    characterStyles: [
      { id: 'VerbatimChar', name: 'Verbatim Char', run: { font: 'Consolas', size: 18, shading: { type: ShadingType.CLEAR, fill: 'F4F4F4', color: 'auto' } } },
    ],
  },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1300, right: 1300 } } },
    headers: { default: new Header({ children: [new Paragraph({ style: 'Header', alignment: AlignmentType.RIGHT, children: [new TextRun('AI Strategy Consulting: Foundations to Expert')] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ style: 'Footer', children: [new TextRun('Page '), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(' of '), new TextRun({ children: [PageNumber.TOTAL_PAGES] })] })] }) },
    children: [new Paragraph({ text: 'Reference', heading: HeadingLevel.HEADING_1 })] }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync('custom-ref.docx', b); console.log('ok', b.length); });
