# 02 — Go-To-Market (GTM) Strategy Fundamentals

> **What you should be able to do after this chapter:** define GTM precisely; structure any GTM question with the building blocks; choose between 16 GTM strategy types and justify the choice; size a market; model unit economics; and plan a launch.

---

## 1. What GTM is, and what it isn't

**GTM strategy** is the integrated plan for **who** you sell to, **what** you sell them, **at what price**, **through which channels and partners**, **with what message**, **in what sequence**, and **with what operating model and economics**. The goal is to win and scale a product in a market.

| GTM *is* | GTM *is not* |
|---|---|
| A set of choices (and explicit non-choices) about segments, channels, and sequence | A marketing plan alone |
| Tied to unit economics (CAC, LTV, payback) | A product roadmap |
| Cross-functional: product, sales, marketing, risk, ops, compliance, tech | A one-off launch event |
| Iterative: launch, learn, scale | "Build it and they will come" |

**In FS, three extra dimensions are always in scope:**
1. **Regulatory perimeter:** licences, partner-bank structures, disclosure, and marketing rules.
2. **Risk appetite:** who you are *willing* to acquire. Credit, fraud, and AML all constrain the target segment.
3. **Balance sheet:** lending and deposit GTM uses capital and funding, so growth must be funded.

---

## 2. The GTM building blocks

```
 1. MARKET & SEGMENT     →  2. VALUE PROPOSITION  →  3. OFFER, PRICING & PACKAGING
    (where to play)          (how to win)             (how to monetise)
            ↓                                                    ↓
 4. CHANNELS & PARTNERS  →  5. SALES & MARKETING  →  6. LAUNCH & SEQUENCING
    (how to reach)           MOTION (how to convert)   (pilot → scale)
            ↓                                                    ↓
 7. OPERATING MODEL & ENABLERS    →    8. ECONOMICS, KPIs & GOVERNANCE
    (org, tech, risk, ops, compliance)   (business case, targets, stage gates)
```

| Block | Key questions | Core analyses | Typical output |
|---|---|---|---|
| **1. Market & segment** | Which segments, geographies, use cases, or corridors? Which do we explicitly *not* serve? | TAM/SAM/SOM, segment attractiveness vs ability to win, profit pools | A prioritised segment list with a beachhead |
| **2. Value proposition** | What job are we doing for the customer? Why us vs the alternatives? | Customer research (JTBD), competitive teardown, right-to-win assessment | A value-proposition canvas and a positioning statement |
| **3. Offer & pricing** | What's in the product? How are tiers and bundles structured? What price? | Conjoint and MaxDiff, benchmarking, EVC, break-even | A good-better-best offer and a price book |
| **4. Channels & partners** | Direct, intermediary, embedded, or partner? What's the channel mix? | Channel economics (CAC, conversion, cost-to-serve), partner long-lists and screens | A channel strategy and a partner shortlist with a term-sheet view |
| **5. Sales & marketing** | Self-serve, inside sales, field sales, or partner-led? Which messages and campaigns? | Funnel design, coverage model, capacity model | A coverage model, marketing plan, sales playbook, and enablement |
| **6. Launch & sequencing** | Where do we pilot? What are the gates to scale? | Pilot design, readiness assessment | A launch plan, a 30/60/90-day plan, and stage gates |
| **7. Operating model** | Who owns what? What tech, ops, risk, and compliance changes are needed? | Capability gap analysis, RACI | A target operating model and a build/buy/partner decision |
| **8. Economics & KPIs** | Does it pay back? What do we track? | A business case (P&L, NPV, payback), sensitivity analysis | A KPI tree, dashboard, and governance cadence |

---

## 3. The catalogue: 16 GTM strategy types in FS

Each strategy is described by what it is, when it works, FS examples, its economic signature, its risks, and its key KPIs.

### 3.1 Direct-to-consumer (D2C) digital

- **What:** acquire customers directly through digital channels (search, social, app stores, aggregators, referral) with digital onboarding.
- **When it works:** simple products; customers who compare prices online; a strong brand or a sharp price or feature advantage.
- **FS examples:** neobank current accounts, digital personal loans, digital remittance apps, no-fee cashback cards.
- **Economics:** variable CAC that rises as you exhaust efficient channels; fast scaling; low cost-to-serve.
- **Risks:** CAC inflation, fraud (synthetic identities), and adverse selection from rate-shopping customers.
- **KPIs:** CAC by channel, funnel conversion (visit → apply → approve → fund or activate), 90-day activation, payback months.

### 3.2 Branch- or relationship-manager-led (proprietary distribution)

- **What:** sell through your own branch network and RMs, often as a cross-sell to existing customers.
- **When it works:** complex or advice-heavy products; trust-sensitive customers; affluent, SME, and commercial segments.
- **FS examples:** mortgages, SME lending, wealth, commercial cards, treasury services.
- **Economics:** high fixed cost and low marginal CAC for existing clients; highest trust.
- **Risks:** RM capacity, inconsistent pricing (leakage), and slowness.
- **KPIs:** products per customer, RM productivity (revenue per RM), cross-sell rate, share of wallet.

### 3.3 Field-sales-led enterprise (large corporate and FI)

- **What:** senior coverage bankers and product specialists run long sales cycles, often via RFPs.
- **When it works:** large tickets, complex integration, multi-year contracts.
- **FS examples:** global cash management, enterprise merchant acquiring, issuer processing, correspondent banking, commercial card programmes, co-brand bids.
- **Economics:** very high cost per deal, very high lifetime value, and sticky switching costs.
- **Risks:** long cycles, concentration, price pressure in RFPs.
- **KPIs:** pipeline coverage (3–4× target), win rate, cycle time, revenue per banker, deal RAROC.

### 3.4 Inside sales and hybrid (SMB and lower mid-market)

- **What:** phone and video sales plus digital, often "pooled" coverage instead of named RMs.
- **When it works:** SMBs too small for a named RM but needing some guidance.
- **FS examples:** SME banking packages, SMB acquiring, business cards, SME FX.
- **Economics:** middle ground; efficient if leads are well scored.
- **KPIs:** calls per closed deal, conversion rate, revenue per inside-sales FTE.

### 3.5 Product-led growth (PLG), self-serve, and freemium

- **What:** the product *is* the acquisition engine. Customers sign up, get value, and upgrade.
- **When it works:** low friction; value is visible immediately; viral or network loops exist.
- **FS examples:** Wise (transparent pricing, word-of-mouth), Revolut (free tier then premium plans), expense-management platforms with free corporate cards funded by interchange.
- **Economics:** low CAC and high volume; monetisation through upgrades or embedded revenue.
- **Risks:** free users who never monetise; fraud on open sign-up.
- **KPIs:** sign-up → activation, free → paid conversion, net revenue retention, viral coefficient.

### 3.6 Developer- and API-led

- **What:** win developers first through documentation, sandboxes, and SDKs, then land the business.
- **When it works:** payments infrastructure, BaaS, payouts, FX APIs.
- **FS examples:** Stripe-style payments, payout APIs, virtual accounts, cross-border APIs for platforms.
- **Economics:** usage-based revenue that grows with the client's growth ("land small, grow big").
- **KPIs:** time-to-first-API-call, sandbox → production conversion, revenue per API client, net revenue retention.

### 3.7 Partner-led: co-brand and affinity

- **What:** partner with a brand that owns the customer (an airline, retailer, hotel, university, or association) and issue its branded product.
- **When it works:** the partner has a large, engaged base and a strong loyalty currency.
- **FS examples:** airline and hotel co-brand cards, retailer cards, private-label credit, affinity cards.
- **Economics:** low CAC (acquisition at the partner's point of sale), but large payments to the partner (bounties, points purchases, % of spend). Value is contested at every renewal.
- **Risks:** partner concentration; losing the partner means losing the portfolio; renewal economics escalate.
- **KPIs:** approvals per partner touchpoint, spend per active, partner payments as a % of revenue, contract NPV.

### 3.8 Intermediary-led (brokers, dealers, ISOs, agents, aggregators)

- **What:** third parties who own the customer moment sell your product for a commission.
- **When it works:** fragmented customers; purchases made at a specific moment (buying a car or a house).
- **FS examples:** mortgage brokers (in the UK the large majority of new mortgages go through intermediaries), auto dealers (indirect auto lending), ISOs and agents in merchant acquiring, comparison sites for loans and cards, and remittance agent networks.
- **Economics:** variable commission-based CAC and fast volume, but a weaker customer relationship.
- **Risks:** commission escalation, broker-driven adverse selection, conduct risk (mis-selling), and dealer-markup fairness.
- **KPIs:** commission as % of revenue, "pull-through" (applications → funded), early-default rates by intermediary.

### 3.9 Embedded finance / B2B2C

- **What:** your product appears inside a third party's journey (checkout, software platform, marketplace), often white-labelled.
- **When it works:** the platform owns the workflow and the data; finance is a natural next step in that workflow.
- **FS examples:** POS financing and BNPL at checkout, merchant cash advance inside e-commerce or payments platforms, embedded payments in vertical software (restaurants, salons), payouts inside gig platforms, embedded FX in marketplaces.
- **Economics:** very low CAC and high conversion (contextual), but revenue is shared with the platform.
- **Risks:** the platform can switch providers; brand invisibility; compliance accountability stays with you.
- **KPIs:** attach rate (% of platform users adopting), revenue per platform, revenue share %, loss rates.

### 3.10 Banking-as-a-Service (BaaS) and white-label to other institutions

- **What:** sell your *capability* (charter, rails, FX, card issuing, processing) to other banks or fintechs, who sell to end customers.
- **When it works:** you have scale or a licence advantage; buyers lack the capability.
- **FS examples:** sponsor banks for fintechs, a large bank offering cross-border payouts to smaller banks, FX-as-a-service platforms, issuer processing, "agent bank" card programmes for community banks and credit unions.
- **Economics:** wholesale pricing with lower margin per unit but huge reach; volume-driven.
- **Risks:** third-party risk. US regulators issued multiple consent orders to BaaS sponsor banks in 2023–24, and the Synapse failure (2024) hardened expectations. Partner quality directly affects your licence.
- **KPIs:** number of partners, volume through partners, revenue per partner, compliance findings.

### 3.11 Platform and two-sided network

- **What:** you run a network whose value grows with participants on *both* sides.
- **When it works:** you can solve the "chicken and egg" problem by subsidising one side or seeding with anchor participants.
- **FS examples:** card networks, instant payment networks (senders and receivers), Request-for-Pay (billers and payers), B2B payment networks (buyers and suppliers).
- **Economics:** slow start, then winner-take-most returns.
- **GTM tactic:** **subsidise the harder side** (for example, free receiving, or free onboarding for suppliers), and **seed anchor use cases** (a big biller, the government).
- **KPIs:** participants per side, reachability %, transactions per participant, cross-side growth.

### 3.12 Consortium and ecosystem utility

- **What:** competitors co-own infrastructure to beat a common threat or reach critical mass.
- **FS examples:** Zelle (owned by a bank consortium through Early Warning Services), the Paze wallet (same owners), and many national instant-payment schemes owned by banks.
- **Economics:** shared cost, shared network; the differentiation happens on top.
- **Risks:** slow governance, lowest-common-denominator products, antitrust, fraud liability disputes.

### 3.13 Land-and-expand and cross-sell (the "wedge" product)

- **What:** win with one product (the wedge), then expand into the relationship.
- **FS examples:** payroll or payouts leading to operating accounts and treasury; a corporate card leading to expense software and then AP automation; a merchant acquiring relationship leading to merchant lending (cash advance); a remittance leading to a wallet, savings, and credit.
- **Economics:** the wedge may be priced at or near cost; profit comes from the expansion.
- **KPIs:** products per client at 12 and 24 months, net revenue retention, time to second product.

### 3.14 Freemium or loss-leader plus adjacent monetisation

- **What:** give the core away (often because regulation or the market forces a price of zero) and monetise adjacent services.
- **FS examples:** UPI in India (zero MDR means players monetise through credit on UPI, merchant devices and subscriptions, lending, and ads); Pix in Brazil (free for individuals, so revenue comes from merchant fees, credit, and value-added services); free P2P with monetised "instant cash-out to card" fees.
- **Economics:** you need a credible, measurable path from the free product to paid revenue.
- **KPIs:** % of free users monetised, adjacent revenue per user.

### 3.15 Community, affinity, and diaspora-led

- **What:** target a tight community through trusted networks: diaspora groups, religious and cultural institutions, student bodies, professional associations.
- **FS examples:** remittance providers using community ambassadors and campaigns around festivals (e.g., Diwali, Eid, Lunar New Year); student banking; credit unions' field-of-membership.
- **Economics:** low CAC and high trust; word-of-mouth is powerful because remittance senders talk to each other.
- **KPIs:** referral rate, community penetration, repeat frequency.

### 3.16 Inorganic GTM: acquire, joint venture, or alliance to buy distribution

- **What:** buy or partner for customers, licences, or networks instead of building them.
- **FS examples:** Capital One's acquisition of Discover (completed 2025) gave it network ownership and let it move debit (and over time more card volume) onto its own network. Acquirers buy ISVs or software to own distribution. Remittance players buy licences in new corridors. Banks form JVs with telcos or retailers in emerging markets.
- **Economics:** fast; you pay a premium; integration risk.
- **KPIs:** synergy capture (revenue and cost), customer retention post-deal.

### 3.17 Geographic market entry modes

This applies to any product entering a new country.

| Mode | Speed | Control | Capital | Risk | FS example |
|---|---|---|---|---|---|
| **Cross-border service (no local presence)** | Fastest | Low | Low | Regulatory limits | Serving EU clients under a passport; remote payouts via partners |
| **Partner / licence-sharing** | Fast | Medium | Low | Partner dependency | Using a local EMI or bank partner for payouts or issuing |
| **Greenfield (own licence)** | Slow (12–24+ months for licences) | High | High | Execution | Applying for an e-money or payment institution licence, or a banking licence |
| **Acquisition** | Fast | High | High | Integration and overpaying | Buying a licensed local player |
| **Joint venture** | Medium | Shared | Medium | Governance | Bank–telco JV for mobile money |

---

## 4. Choosing the right GTM: a decision logic

**Rule 1: match the sales motion to deal size and complexity.**

```
                    HIGH complexity / integration
                              │
   Partner-led / BaaS         │        Field sales (enterprise, FI)
   (they carry complexity)    │        RFP-driven, multi-year
                              │
 LOW ─────────────────────────┼──────────────────────── HIGH
 annual revenue per client    │        annual revenue per client
                              │
   Self-serve / PLG / D2C     │        Inside sales / hybrid RM
   (digital, low-touch)       │        (SMB, mid-market)
                              │
                    LOW complexity / integration
```

**Rule 2: go where the customer moment is.** If the need arises inside another journey (buying a car, checking out, running payroll in software), embedded or intermediated GTM beats direct.

**Rule 3: in networks, solve reachability before monetisation.** For RTP, Request-for-Pay, and B2B networks, subsidise participation first.

**Rule 4: in regulated and risky products, GTM is limited by risk appetite and licences.** A great channel that brings the wrong risk mix is a bad channel.

**Rule 5: pick a beachhead.** Win one segment or use case decisively, then expand into adjacent ones (the "bowling pin" approach from *Crossing the Chasm*).

---

## 5. Core GTM frameworks

### 5.1 Where to play / how to win (Lafley & Martin, *Playing to Win*)

The five cascading choices are: **winning aspiration → where to play → how to win → capabilities → management systems.** It's useful as the storyline spine of a GTM strategy document.

### 5.2 Ansoff matrix applied to FS

| | **Existing products** | **New products** |
|---|---|---|
| **Existing markets** | *Penetration:* activation, cross-sell, repricing | *Product development:* launch RTP payouts to existing corporate clients |
| **New markets** | *Market development:* take cross-border into new corridors or SMB into a new region | *Diversification:* a remittance player launches consumer lending |

Risk and required capability rise toward the bottom right.

### 5.3 Segment prioritisation: attractiveness vs ability to win

Score each segment from 1 to 5 on each dimension, weight the dimensions, and plot the result.

| Market attractiveness (the Y axis) | Ability to win (the X axis) |
|---|---|
| Size of revenue pool | Existing customer base and data |
| Growth | Product fit (gaps to close) |
| Margin / pricing headroom | Distribution access |
| Competitive intensity (inverted) | Brand and trust |
| Risk (credit, fraud, regulatory; inverted) | Cost position |
| Strategic fit | Licences and partnerships |

Segments in the top right are the priority. High attractiveness with a low ability to win means "partner or buy". Low attractiveness with a high ability to win means "harvest".

### 5.4 TAM / SAM / SOM

- **TAM (Total Addressable Market):** the total revenue pool if you served everyone.
- **SAM (Serviceable Available Market):** the part you can reach with your products, licences, and channels.
- **SOM (Serviceable Obtainable Market):** the realistic share in 3–5 years.

> **Illustrative example (US B2B instant disbursements, revenue pool):**
> - TAM: about X bn eligible B2B and B2C disbursements a year (insurance claims, payroll-adjacent, refunds, gig payouts, loan disbursements) × a blended price → $ revenue pool
> - SAM: the part through our client base and supported rails
> - SOM: our realistic share given the competition
>
> Always build **both top-down** (from macro payment volumes) **and bottom-up** (clients × use cases × volumes × price), then triangulate. Chapter 08 has a full worked sizing.

### 5.5 Jobs-to-be-done (JTBD)

Customers "hire" a product to do a job. Examples:
- An SME importer isn't buying "FX". They want to *pay the supplier on time without surprise costs and reconcile it easily.*
- A gig platform isn't buying "RTP". It wants *to pay workers instantly to keep them on the platform.*

JTBD reframes the value proposition and often the price metric.

### 5.6 Unit economics

| Metric | Formula | Healthy benchmark (rule of thumb) |
|---|---|---|
| **CAC** | Total acquisition spend ÷ new customers | Varies widely by product |
| **LTV / CLV** | PV of contribution margin over the lifetime | — |
| **LTV : CAC** | LTV ÷ CAC | ≥ 3× |
| **Payback period** | CAC ÷ monthly contribution margin | < 12–24 months (consumer); < 24–36 (B2B) |
| **Contribution margin** | Revenue − variable costs (funding, losses, rewards, processing) | Positive per unit before scale |
| **Net revenue retention (B2B)** | Revenue this year from last year's cohort ÷ last year's revenue | > 100% |

In lending and cards, **risk-adjusted LTV** must deduct expected credit losses and the capital cost.

---

## 6. Segmentation in FS

| Customer type | Common segmentation axes |
|---|---|
| **Consumer** | Wealth (mass, mass affluent, affluent, HNW); life stage (student, young professional, family, retiree); credit tier (super-prime, prime, near-prime, subprime, thin-file); behaviour (transactor vs revolver; digital vs branch); needs (travel, cashback, credit-building) |
| **SMB / small business** | Revenue band (micro < $1m, small $1–10m, lower mid $10–50m); industry vertical; digital maturity; international exposure (importer or exporter) |
| **Commercial / mid-corporate** | Revenue band ($50m–$1bn); complexity (multi-entity, multi-currency); industry |
| **Large corporate / multinational** | Global footprint, treasury sophistication, sector |
| **Financial institutions** | Banks (tier 1/2/3), credit unions, NBFIs, fintechs, PSPs |
| **Platforms** | Marketplaces, SaaS/ISVs, gig platforms, e-commerce: served as *channels* as well as clients |
| **Public sector** | Government disbursements and collections |

**A good segmentation is:** (1) actionable, meaning you can reach it through a channel; (2) different in needs and economics; (3) big enough to matter; and (4) identifiable in your data.

---

## 7. Channel economics (illustrative orders of magnitude; verify for any real use)

| Channel | Typical CAC | Conversion quality | Notes |
|---|---|---|---|
| Existing-customer cross-sell (pre-approved) | Lowest | Highest | You already hold the data, which is a big underwriting advantage |
| Referral / word-of-mouth | Low | High | Referral bonuses and "give $X, get $X" offers |
| Branch / RM | Low marginal, high fixed | High | Capacity-constrained |
| Organic digital / SEO / app store | Low–medium | Medium | Slow to build |
| Paid search / social | Medium–high, rising | Medium | Competitive auctions |
| Aggregators / comparison sites | Medium–high (per funded account) | Rate shoppers (price-sensitive, and adverse selection risk) | Lead-gen or bounty pricing |
| Co-brand partner point of sale | Low for the issuer, but pays the partner | High | Economics sit in partner payments |
| Brokers / dealers | Commission-based | Variable | Needs quality monitoring |
| Direct mail (cards) | High per account | Medium | Still material in US cards |
| Embedded / platform | Low (revenue share instead) | High (contextual) | Platform-dependent |

**Funnel math: always build it.**

> Visitors 100,000 → applications 8% = 8,000 → approved 50% = 4,000 → funded or activated 70% = **2,800**
> Marketing spend $560k ÷ 2,800 = **CAC $200**. Then compare against LTV by segment.

---

## 8. Launch planning

### 8.1 Stage gates

```
 Concept → Business case → Design & build → PILOT (limited) → Controlled launch → Scale → Optimise
   G0          G1               G2              G3                G4              G5
```

At each gate, check: customer evidence, economics vs plan, risk and compliance sign-off, operational readiness, and tech stability.

### 8.2 Readiness checklist (FS-specific)

- **Product:** T&Cs, disclosures, pricing approved by the pricing committee
- **Risk:** credit policy, fraud rules, AML/KYC, limits
- **Compliance:** marketing review, fair-value assessment, complaints handling
- **Operations:** servicing, disputes, exceptions, 24/7 coverage if the product is real-time
- **Technology:** scale testing, monitoring, incident runbooks
- **Sales:** playbooks, training, CRM set-up, incentives
- **Marketing:** campaigns, landing pages, measurement
- **Finance:** accounting treatment, revenue recognition, MI

### 8.3 30/60/90-day launch KPIs

- **Day 30:** applications, approval rate, onboarding drop-offs, incidents, fraud attempts
- **Day 60:** activation, early usage, complaint themes, CAC vs plan
- **Day 90:** retention, early delinquency (for credit), revenue per customer, go/no-go decision to scale

---

## 9. The GTM operating model and commercial excellence

1. **Coverage model:** who covers which clients (named RM, pooled, digital) based on value and complexity.
2. **Sales capacity plan:** the number of RMs or specialists needed = target new revenue ÷ revenue per productive RM, adjusted for ramp time.
3. **Incentives:** pay on risk-adjusted revenue and on new products; include a pricing-discipline component.
4. **Sales enablement:** playbooks, pitch decks, objection handling, and ROI calculators (for example, "switch from cheques to instant payouts and save $X").
5. **Pipeline management:** CRM hygiene, stage definitions, weekly reviews.
6. **Pricing authority:** the DoA matrix and a deal desk (see [01 §9](01-pricing-fundamentals.md#9-pricing-governance-and-operating-model)).
7. **Product–sales feedback loops:** a win/loss analysis every quarter.

---

## 10. Product × GTM matrix: which plays dominate where

| GTM strategy type | Cards | Lending | Real-Time Payments | Cross-Border |
|---|---|---|---|---|
| D2C digital | ●●● no-fee and cashback cards | ●●● personal loans | ●● consumer P2P and me-to-me | ●●● digital remittances |
| Branch / RM-led | ●● affluent, cross-sell | ●●● mortgages, SME | ●● corporate treasury | ●●● corporate FX |
| Field sales (enterprise) | ●● commercial cards, co-brand bids, enterprise acquiring | ●● corporate lending | ●●● large corporate and FI | ●●● FI / correspondent, large corporate |
| Inside sales / hybrid | ●● SMB acquiring, business cards | ●● SME | ●● mid-market | ●● SME FX |
| PLG / freemium | ●● spend-management cards | ● | ●● free P2P, paid instant cash-out | ●●● transparent-pricing apps |
| API / developer-led | ●● card issuing APIs | ●● embedded lending APIs | ●●● payout APIs | ●●● payout and FX APIs |
| Co-brand / affinity | ●●● | ● | — | ● |
| Intermediaries | ●● ISOs and agents (acquiring) | ●●● brokers, dealers | ● | ●● agent networks |
| Embedded / B2B2C | ●● | ●●● POS / BNPL, merchant cash advance | ●●● platforms, payouts | ●●● marketplace FX |
| BaaS / white-label | ●● agent bank, issuer processing | ●● | ●●● RTP access for smaller FIs and fintechs | ●●● FX-as-a-service to banks |
| Two-sided network | ●●● networks | — | ●●● RfP, Pay-by-Bank | ●● |
| Consortium | ● | — | ●●● Zelle-type | ●● linked instant-payment systems |
| Land-and-expand | ●● card to lending | ●● loan to deposits | ●●● payouts to treasury | ●● remittance to wallet and credit |
| Free core + adjacent | ● | — | ●●● UPI, Pix | ●● zero-fee plus spread |
| Community / diaspora | ● | ● | ● | ●●● |
| Inorganic (M&A / JV) | ●● portfolio purchases, networks | ●● portfolio purchases | ● | ●● licence acquisitions |

(●●● = dominant play, ●● = common, ● = niche, — = rare)

---

## 11. Common GTM failure modes in FS (what MBB diagnostics usually find)

1. **"Everyone is our customer":** no beachhead, so the marketing budget is spread thin.
2. **Product-out, not customer-in:** a great rail (for example RTP) with no compelling use case.
3. **Channel conflict:** digital pricing undercuts branch or broker pricing, so partners revolt.
4. **Sales incentives misaligned:** RMs aren't paid for the new product, so it's never mentioned.
5. **Risk appetite discovered at launch:** approvals come in 30 points below plan because the credit policy wasn't co-designed.
6. **Ignoring the "other side" of the network:** no receivers or billers, so no value for senders.
7. **Launch-and-forget:** no test-and-learn, and pricing and offers never iterate.
8. **Underestimating operations and compliance:** 24/7 real-time operations, fraud, and complaints overwhelm the teams.
9. **Economics on revenue, not risk-adjusted profit:** the growth destroys value.
10. **Partner dependency without protection:** a co-brand or platform switches, and the whole book walks.
