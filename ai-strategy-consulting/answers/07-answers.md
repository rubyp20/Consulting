## Module 7 — Quiz answers

**1.** How much is it worth (value scoring); can we do it and how hard (feasibility scoring); should an agent do it and how autonomously (agentic-fit assessment), with the risk overlay as the fourth, modifying question. Agentic fit is assessed at task level because a use case bundles tasks with different variability, judgement and error profiles; the pattern and autonomy decision only makes sense for one task at a time.
Manager-level benchmark: names all instruments without blending them and explains that the overlay comes after scoring so it modifies rather than contaminates.

**2.** Value = 0.35 x 4 + 0.20 x 3 + 0.25 x 2 + 0.20 x 5 = 1.40 + 0.60 + 0.50 + 1.00 = 3.50. Feasibility = 0.25 x 3 + 0.20 x 4 + 0.20 x 4 + 0.20 x 2 + 0.15 x 3 = 0.75 + 0.80 + 0.80 + 0.40 + 0.45 = 3.20. Quick-wins quadrant, but the regulatory score of 2 should trigger a look at the risk overlay before it is sequenced.
Manager-level benchmark: computes correctly and spots the regulatory signal inside an otherwise favourable score.

**3.** Variability override: if task variability scores 2 or below, use a rules engine regardless of total, because a deterministic solution is cheaper, auditable and avoids model risk validation of a stochastic component; KYB example: determining the required document set by entity type and jurisdiction. Risk-tier override: if the overlay assigns Tier 1, cap autonomy at human-in-the-loop regardless of score; KYB example: adjudication of sanctions and PEP screening hits.
Manager-level benchmark: states both precisely and notes that the LLM can still add value in the rules case (explaining the pack to the client) and in the Tier 1 case (drafting the disposition).

**4.** Dependencies: it needs document intake, registry reconciliation and the entity and ownership data product from Waves 1 and 2. Risk and control change: it alters the periodic review control, which requires MLRO sign-off on the design and Tier 2 validation, both of which take time. A third acceptable answer: change effort scored 2 because it changes the operating rhythm of the whole KYC team.
Manager-level benchmark: gives two distinct reasons, at least one of which is a dependency rather than a difficulty.

**5.** Total = 5 + 2 + 4 + 2 + 4 + 4 = 21, the "agent with human-in-the-loop" band. Judgement scoring 2 means the decision is largely discretionary, so the agent should prepare and propose rather than decide; error tolerance scoring 2 means errors are severe or hard to reverse, so the human gate must be an approval before any action is taken, not a sampling review after the fact.
Manager-level benchmark: totals correctly, names the band, and derives the gate type (pre-action approval) from the two low scores rather than defaulting to a generic "human in the loop".
