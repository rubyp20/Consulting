# AI Strategy Consulting: Foundations to Expert

A complete self-study programme for an experienced financial-services consultant moving into AI strategy, agentic AI and AI business-case work, pitched at the level needed to clear AI consultant / AI strategy interviews and then lead engagements.

**Read the compiled document:** [`AI-Strategy-Consulting-Foundations-to-Expert.docx`](AI-Strategy-Consulting-Foundations-to-Expert.docx) (Word) or [`AI-Strategy-Consulting-Foundations-to-Expert.pdf`](AI-Strategy-Consulting-Foundations-to-Expert.pdf) (PDF). Both are built from the Markdown sources in this folder.

## What is in it

| Part | Modules | Content |
|---|---|---|
| Module 0 | 0 | Ten-question diagnostic with self-scoring rubric; full curriculum map with hours and interview weight |
| Phase 1 Foundations | 1–4 | AI landscape; how LLMs work; agentic AI mechanics; data and tech stack, evaluation, observability |
| Phase 2 Consulting frameworks | 5–10 | AI strategy and maturity; use-case discovery; assessment and prioritisation (scored matrix); cost and TCO; business case (NPV/IRR); build vs buy vs partner |
| Phase 3 Delivery and transformation | 11–15 | PoC to scale; Responsible AI and regulation (EU AI Act, NIST AI RMF, ISO/IEC 42001, PRA SS1/23, RBI FREE-AI); operating model and talent; change and KPIs; AI in managed services |
| Phase 4 Industry application | 16–18 | BFSI use-case library (11 use cases); public case teardowns; three end-to-end engagement simulations |
| Phase 5 Interview readiness | 19–20 | Positioning your own experience; 40 questions, 5 case drills, 3 guesstimates, full mock interview with rubrics |
| Recaps | after 5, 10, 15, 20 | One-page revision sheets |
| Appendix | | Answer keys for every quiz and the diagnostic |

Every module follows the same nine-part structure: why a client cares; concept and mechanism; frameworks with attribution; worked BFSI example with numbers; real-world public case; consultant language; common junior mistakes; interview questions with model answers; five-question self-check.

## Real RFPs to practise on

[`rfp-shortlist-2026-11.md`](rfp-shortlist-2026-11.md) lists live and recent public AI RFPs in financial services (Indian Bank, SBI, Bank of Baroda, Punjab & Sind Bank, HM Treasury, USAC and others), tiered by how closely they match an AI strategy engagement, with a recommendation on which to run as a full simulation.

## Labelling

Every example and number is labelled `[PUBLIC — source, year]`, `[ILLUSTRATIVE — composite]` or `[ESTIMATE — assumption]`, and anything date-sensitive carries `[VERIFY]`. Nothing illustrative is presented as a real engagement. See `AUTHORING-SPEC.md` for the rules and the list of public facts the modules rely on.

## Folder layout

| Path | Purpose |
|---|---|
| `modules/00-…20-*.md` | One Markdown file per module, the source of truth |
| `recaps/` | Four one-page recaps |
| `answers/` | Quiz and diagnostic answer keys, compiled into the appendix |
| `00-front-matter.md` | Title block and "how to use this document" |
| `AUTHORING-SPEC.md` | Format, labelling and attribution rules plus public-fact anchors |
| `build.sh` | Compiles everything into the .docx and .pdf (pandoc, then LibreOffice to refresh the table of contents) |
| `lint.py` | Checks each module for the nine sections, labels and table hygiene |

## Rebuilding

```bash
./build.sh
```

Requires pandoc, LibreOffice with Python UNO bindings, and the helper scripts referenced in `build.sh` (`postprocess.py`, `lo_finalise.py`, `custom-ref.docx`), which live in `tools/`.
