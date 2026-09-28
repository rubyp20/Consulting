# 05 — Real-Time Payments (RTP): Economics, Pricing & GTM

> **What you should be able to do after this chapter:** compare instant payments with cards, ACH, and wires; explain why UPI and Pix scaled while US adoption was slower; articulate the RTP *monetisation problem*; design a bank's RTP price book; and lay out the RTP GTM plays: use-case-led, receive-first, B2B2X, Pay-by-Bank, and Request-for-Pay.

---

## 1. What "real-time payments" means

**Instant (real-time) payments** are account-to-account credit transfers that are:
- **Instant:** funds are available to the payee within seconds
- **Always on:** 24/7/365
- **Final and irrevocable:** a push payment with no chargeback
- **Data-rich:** usually ISO 20022 messages with structured remittance information

"RTP" is used both generically (real-time payments) and as the name of The Clearing House's US network (the **RTP® network**). Context tells you which is meant.

### 1.1 How instant payments compare with other rails (US-centric, illustrative pricing)

| | **Cards** | **ACH (standard)** | **Same-day ACH** | **Wire (Fedwire)** | **Instant (RTP / FedNow)** |
|---|---|---|---|---|---|
| Direction | Pull | Push or pull | Push or pull | Push | **Push** (plus Request-for-Pay) |
| Speed to payee | Authorised instantly; merchant settlement T+1/2 | 1–2 business days | Same business day (windows) | Same day, business hours | **Seconds, 24/7/365** |
| Finality | Reversible (chargebacks) | Returns possible (longer for unauthorised consumer debits) | Returns possible | Final | **Final** |
| Per-transaction limit | Card limit | High | $1m per payment | None | RTP: $10m (raised 2025). FedNow: network limit raised from its $500k launch cap (verify current). Banks often set lower limits |
| Data | Limited | Limited addenda | Limited addenda | ISO 20022 (Fedwire migrated 2025) | **ISO 20022, rich remittance** |
| Typical price to a corporate sender | Merchant pays ~1.5–3.5% | ~$0.05–0.30 | ~$0.25–1.00 | ~$5–25 (consumers: ~$25–35 outgoing) | **~$0.25–1.50** (bank price; network fee ~$0.045) |
| Fraud profile | Card fraud, chargebacks protect consumers | Unauthorised debits, returns | Same | Wire fraud (business email compromise) | **Authorised push payment (APP) scams, mule accounts** |

**The strategic point:** instant payments sit between ACH and wires on price, but offer wire-like finality with ACH-like cost *and* 24/7 availability. That creates both a **cannibalisation threat** (to wire and same-day ACH fees) and a **new-revenue opportunity** (use cases where speed has value).

---

## 2. The global landscape

| Country / region | System (launch) | Operator | Notable features | Pricing model to end users |
|---|---|---|---|---|
| **UK** | Faster Payments (2008) | Pay.UK | Confirmation of Payee (CoP); open-banking payment initiation; variable recurring payments (VRP) | Free for consumers; businesses pay bank tariffs. **Mandatory APP-fraud reimbursement since October 2024** (up to £85k, split between sending and receiving PSPs) |
| **India** | UPI (2016) | NPCI | Aliases (VPA or mobile), QR everywhere, third-party apps, UPI Lite, **credit lines on UPI**, UPI international linkages | **Zero MDR** for P2M on bank-account UPI (with government incentives); PPI interchange on larger wallet-funded merchant transactions. Roughly **20bn transactions a month** by 2025 |
| **Brazil** | Pix (2020) | Banco Central do Brasil (operator and regulator) | Keys (phone, email, tax ID), QR, **Pix Automático** (recurring, launched 2025), installment features in development | **Free for individuals** by regulation; merchants and businesses pay PSP fees, generally well below card MDR |
| **EU (euro area)** | SCT Inst (2017) via TIPS and RT1 | EPC scheme; Eurosystem (TIPS), EBA Clearing (RT1) | **Instant Payments Regulation (2024):** euro-area PSPs must receive (from January 2025) and send (from October 2025) instant payments, and offer **Verification of Payee** | **Price parity:** instant transfers can cost no more than standard credit transfers |
| **US** | RTP® (2017) and FedNow® (2023) | The Clearing House (bank-owned); Federal Reserve | Request-for-Pay (RfP); ISO 20022; high limits (RTP $10m) | The network fee to the sending FI is ~$0.045 per credit transfer on both (verify current schedules). Banks set customer prices freely. Many participants are **receive-only** |
| **Australia** | NPP (2018) | Australian Payments Plus | PayID aliases, **PayTo** (mandated pull, like VRP) | Bank-determined |
| **Singapore** | FAST (2014), PayNow (2017) | Banks / MAS | Aliases; **cross-border links** (e.g., PayNow–UPI, 2023) | Largely free for consumers |
| **Thailand** | PromptPay (2017) | Banks / BoT | QR; cross-border QR linkages in ASEAN | Largely free for consumers |
| **Cross-border linkage** | BIS Project Nexus, now being taken forward by participating central banks | Multi-country | "Connect once" to link national instant-payment systems | TBD. See [06](06-cross-border-payments.md) |

### 2.1 Why UPI and Pix scaled fast while the US was slower

| Success factor | India (UPI) / Brazil (Pix) | US |
|---|---|---|
| Public-sector push | Central bank or government-backed operator; strong mandates | A private network (RTP) plus a Fed service (FedNow); participation voluntary |
| Price to consumers and merchants | Free or very cheap by design | Merchants accustomed to cards; consumers get card rewards |
| Merchant acceptance | QR codes everywhere; cheap to accept | Card terminals entrenched; no universal A2A checkout |
| Incumbent alternatives | Weak (cash-heavy, low card penetration) | Strong (cards, ACH, Zelle for P2P, same-day ACH) |
| Interoperable aliases | Built in (VPA, Pix keys) | Fragmented directories |
| Fragmentation | Concentrated banking, or a central operator | ~9,000 banks and credit unions; many rely on core processors |

**Lesson for GTM:** where there's no mandate and incumbents are strong, **instant payments grow use case by use case**, not by consumer "big bang". That's why US bank strategies are use-case-led and B2B-led.

---

## 3. The monetisation problem: why pricing RTP is hard

1. **Low network cost signals low value.** Clients know the rail costs cents, so a $2 fee feels like gouging.
2. **Consumers expect P2P to be free** (Zelle, UPI, Pix, UK FPS).
3. **Regulation may cap prices.** The EU price-parity rule forces instant = standard credit transfer pricing.
4. **Cannibalisation.** Every wire that moves to instant can lose $10–20 of fee revenue. Every same-day ACH that moves shifts margin.
5. **Fraud cost is real and rising.** APP scams move quickly on irrevocable rails. In the UK, **PSPs now bear mandatory reimbursement**, so fraud cost enters the pricing floor.
6. **Always-on operations cost.** 24/7 liquidity, support, monitoring, and incident response.
7. **Liquidity and float.** Instant settlement removes float that banks and corporates used to earn on.
8. **Investment payback.** Connecting, upgrading cores, fraud tooling, and APIs cost money, so leadership asks: "What's the business case?"

> **The MBB framing:** "Instant payments are rarely a standalone profit centre. They are a **product-level revenue opportunity in B2B use cases**, plus a **strategic enabler** (primacy, deposits, treasury wallet share, defence against fintech disintermediation). Price the former on value; justify the latter on relationship economics."

---

## 4. Revenue pools and pricing models

| Revenue stream | Model | Who pays | Pricing logic | Examples |
|---|---|---|---|---|
| **Send-side transaction fee (B2B/B2C)** | Per-transaction, tiered by volume or value band | Corporate sender | Between same-day ACH and wire; value-based by use case | Insurance claims, payroll-adjacent payouts, supplier payments |
| **Receive side** | Usually free | — | Free to maximise reachability | Most banks |
| **Request-for-Pay (RfP)** | Per request sent; sometimes per paid request | Biller or payee | Priced against the cost of collections (lockbox, cheques, card fees) | Bill pay, B2B invoices, rent |
| **Value-added services (VAS)** | Per call, per account, or subscription | Corporates | Priced on the value of reduced risk and effort | Verification of payee or account validation, fraud risk scores, real-time reconciliation and notifications, virtual accounts, 24/7 liquidity and sweeps |
| **API or platform access** | Monthly platform fee plus usage | Corporates, fintechs, platforms | A SaaS-style subscription | Developer APIs, webhooks, sandbox |
| **Disbursements-as-a-service** | Per payout | Platforms, insurers, lenders, gig companies | Anchored to the replaced method (cheque, card push, ACH) plus the value of speed | Gig payouts, claims, refunds, loan disbursements |
| **Pay-by-Bank (A2A) acceptance** | % or flat fee per transaction | Merchants | Priced below card MDR, with enough margin to fund consumer incentives and dispute handling | E-commerce, bill pay, high-ticket, subscriptions |
| **Consumer "instant" fees** | % of amount | Consumers | WTP for speed: e.g., the **instant transfer (cash-out) fees** charged by P2P wallets (often ~1.5–1.75% with a min and max) show consumers will pay for immediacy | Wallet cash-out, earned-wage access |
| **Account analysis (US commercial)** | AFP service codes; offset by ECR | Commercial clients | Bundled into the treasury relationship | Mid and large corporates |
| **Indirect / strategic value** | — | — | Deposits, primacy, retention, treasury wallet share | Operating-account wins driven by instant capabilities |
| **Credit on the rails** | Interest and fees | Consumers and merchants | Credit lines accessed via the instant rail | Credit on UPI (India), installment features (Brazil) |

---

## 5. Designing a bank's RTP price book (US commercial, illustrative)

### 5.1 Step 1: set the corridor (floor, reference, ceiling)

- **Floor (cost):** network fee ~$0.045 + fraud loss and controls ~$0.05–0.10 + ops and support ~$0.05 + tech amortisation ~$0.05–0.10 ≈ **$0.20–0.30**
- **Reference (alternatives):** ACH ~$0.10–0.25; same-day ACH ~$0.50–1.00; wire ~$10–20 (corporate); push-to-card ~$0.50–1.00+ or a % of the amount; cheque ~$2–4+ fully loaded
- **Ceiling (value):** depends on the use case (see §7 Play 1)

### 5.2 Step 2: package good-better-best

| | **Essential** | **Advanced** | **Premium / API** |
|---|---|---|---|
| Channel | Online banking portal | + bulk file / host-to-host | + real-time APIs and webhooks |
| Send credit transfer | $0.75 | $0.50 | $0.35 (tiered down with volume) |
| Receive | Free | Free | Free |
| Request-for-Pay (send) | — | $0.25 | $0.15 |
| Account validation / VoP | $0.10 each | 5k a month included | Included |
| Reconciliation and data | Standard reporting | Enhanced remittance data | Full ISO 20022 data + real-time notifications |
| Fraud tools | Standard | Standard + limits management | Advanced risk scores + custom rules |
| Platform fee | $0 | $50 a month | $250–1,000 a month |

### 5.3 Step 3: address cannibalisation explicitly

**Illustrative wire-migration analysis.** A bank sends 1.2m commercial wires a year at an average $15, so **$18m of revenue**.
- About 40% are under $10m, domestic, and time-sensitive but not requiring a wire, so they are *technically migratable*.
- If 50% of the migratable wires move to instant at $2.00 (a "high-value instant" tier), revenue falls by 240k × ($15 − $2) = **−$3.1m**.
- **The case for attacking anyway:** competitors (and fintechs) will offer it; the risk of losing the client's operating account is worth far more; and new instant use cases (payouts, RfP) add, say, +$5–8m.
- **Design response:** a *high-value instant* tier (e.g., over $100k at $3–5, with enhanced controls); keep wires for cross-border and very large, complex payments; and bundle instant into treasury packages to protect the relationship economics.

### 5.4 Step 4: price fences and rules

- **Value bands:** a flat fee for < $10k, higher tiers for $10k–$100k and > $100k (fraud and liquidity risk scale with value).
- **Volume tiers:** incremental, not cliff.
- **Use-case bundles:** e.g., "Instant Claims Payouts" = payouts + account validation + reconciliation + a fraud score, at a per-claim price.
- **No weekend or after-hours premium** in the EU (parity rules). In the US it's allowed, but it's usually a poor client experience.

---

## 6. Fraud and risk as pricing and GTM inputs

- **APP scams:** the payer is tricked into sending money. Instant finality makes recovery hard.
- **Controls:** confirmation or verification of payee, behavioural analytics, mule-account detection on the *receiving* side, value and velocity limits, cooling-off periods for new payees, consortium data sharing.
- **Liability models:**
  - **UK:** mandatory reimbursement (up to £85k), split 50:50 between the sending and receiving PSPs. This raised the cost of fraud and sharpened receiving-bank mule controls.
  - **EU:** IPR's Verification of Payee, plus PSD3/PSR proposals on liability for impersonation fraud (verify final text).
  - **US:** liability largely falls on consumers under current Reg E interpretations for *authorised* payments. There's political and regulatory pressure on this, and network rules and bank policies vary.
- **Pricing implication:** include expected fraud cost per transaction in the floor. Price **VoP and fraud scoring as VAS** for corporates. Consider lower limits and higher prices for high-risk use cases.

---

## 7. RTP GTM strategies: the ten plays

### Play 1 — Use-case-led GTM (the core US and European bank play)

**Prioritise use cases** by (a) the *value of speed*, (b) volume and revenue pool, (c) ease of adoption (integration effort), and (d) your right to win (existing clients in that vertical).

| Use case | Value of speed / pain solved | Current method (price anchor) | Priority |
|---|---|---|---|
| **Insurance claims disbursements** | Customer experience at a moment of truth; faster claim closure; no cheque cost or fraud | Cheque (~$2–4+ fully loaded), ACH | ●●● |
| **Gig and marketplace payouts** | Worker retention; instant access to earnings | Push-to-card (%-based or $0.50–1.00+), ACH | ●●● |
| **Earned-wage access / payroll** | Employee financial wellness | ACH, card push | ●●● |
| **Loan disbursements** | Faster funding is a competitive edge for lenders | ACH, wire | ●● |
| **Real estate closings and escrow** | Replaces wires; reduces wire fraud (business email compromise) | Wire ($15–30) | ●● |
| **Bill pay via Request-for-Pay** | Billers: faster, guaranteed funds, lower collection costs | Card (1.5–3%), ACH debit (returns), cheque | ●● |
| **B2B supplier payments** | Capture early-payment discounts; supplier liquidity; rich remittance | ACH, cheque, virtual card | ●● |
| **Account-to-account (me-to-me) transfers** | Funding brokerage or crypto accounts instantly; moving money between banks | ACH (slow) or card (expensive) | ●● |
| **Government disbursements (G2P)** | Disaster relief, tax refunds, benefits | Cheque, ACH | ● (long sales cycle) |
| **Refunds (e-commerce, travel)** | Customer satisfaction | Card refund (days) | ● |

**Motion:** build a **use-case offer** (product + integration + pricing + ROI calculator), go to the **3–5 highest-priority verticals** with a vertical sales specialist, and win **lighthouse clients** for referenceability.

### Play 2 — Vertical-led sales

- Organise the sales specialists by vertical (insurance, gig and platforms, lenders, property management, healthcare).
- Build **vertical ROI calculators**. For example, for an insurer: 500k claims × ($3.00 cheque cost − $0.90 instant price) = **$1.05m savings**, plus the NPS uplift.
- Partner with **vertical software providers** (claims-management systems, property-management software) so instant payouts are embedded in their workflow.

### Play 3 — Receive-first reachability (building the network)

- **The problem:** senders only value instant payments if payees' banks can receive them.
- **The approach for the ecosystem and for large banks:** encourage smaller FIs (via **core processors, bankers' banks, and third-party service providers**) to at least *receive*. Receiving is cheaper and quicker to enable, and it builds reachability. For a smaller FI, receiving is a defensive must (its customers want to receive payouts instantly).
- **KPIs:** % of US deposit accounts reachable; % of your clients' payees reachable.
- **Pricing:** free receipt; no fees for small FIs as a network-building subsidy (a two-sided market logic).

### Play 4 — B2B2X: the bank as instant-payments infrastructure for fintechs and platforms

- **Model:** a bank with direct network access offers instant sending and receiving to fintechs, payout platforms, and payment facilitators via API (sponsor-bank style).
- **Pricing:** wholesale per-transaction pricing with volume tiers, plus platform and monitoring fees and a deposit-balance relationship (fintech operating balances, which are valuable).
- **Risks:** third-party and BaaS oversight (sanctions, fraud, AML through the fintech's customers).
- **GTM:** developer-friendly APIs, sandbox, compliance-as-a-service, fast onboarding.

### Play 5 — Corporate treasury integration (API, host-to-host, ERP/TMS)

- **Model:** instant payments embedded in the treasury channels corporates already use: ERP and TMS connectors, host-to-host files, APIs.
- **Why:** corporates won't log into a portal to send payouts at scale. Integration is the adoption bottleneck.
- **GTM:** treasury RMs lead, supported by solution architects; pre-built connectors for major ERPs; implementation-fee waivers for strategic clients.
- **Pricing:** bundled into the treasury package; account analysis (ECR offsets); platform fee for API access.

### Play 6 — Consumer: P2P, me-to-me, bill pay, instant cash-out

- **P2P** is usually free (competitive expectation, network effects), so the value is **primacy and engagement**.
- **Me-to-me** (moving money between your own accounts at different banks) funds brokerage and savings accounts instantly, a competitive feature for deposit gathering.
- **Instant cash-out** (from a wallet or platform to the bank) is monetisable on the *platform* side (% fee); for banks it's a receiving-side feature.
- **Bill pay:** RfP from billers into the banking app; the consumer approves; guaranteed, instant funds.

### Play 7 — Pay-by-Bank (A2A) at checkout

- **Proposition to merchants:** lower cost than cards, instant and final settlement (no chargebacks), and rich data. Proposition to consumers: speed, security, and sometimes a discount or loyalty reward.
- **Economics (illustrative):**

  | | Card | Pay-by-Bank |
  |---|---|---|
  | Merchant cost on $100 | ~$2.00–2.50 | ~$0.50–1.00 (or a flat $0.30–0.50) |
  | Settlement | T+1/2 | Instant |
  | Chargebacks | Yes (consumer protection) | No, so a dispute or protection scheme is needed for trust |
  | Consumer incentive | Rewards (1–2%) | Must be funded: discounts, points |

- **Adoption barriers:** consumer habit and rewards, UX (bank redirects), data-access economics (in the US, the Section 1033 open-banking rule is under reconsideration and data-access fees are debated), fraud, and protection.
- **Best-fit merchant segments:** high-ticket and low-margin (utilities, bill pay, rent, tuition, travel), account funding (brokerage, crypto, gaming where legal), subscriptions (UK VRP, Australia PayTo, Pix Automático).
- **GTM:** acquirer and PSP partnerships (so merchants get Pay-by-Bank alongside cards on one contract), vertical wins (utilities, government), and incentive programmes co-funded by merchants.

### Play 8 — Request-for-Pay (RfP) for billers and B2B invoicing

- **Proposition:** billers send a payment request; the payer approves in their banking app; the biller gets guaranteed, instant funds with remittance data.
- **Chicken and egg:** billers need payers' banks to support RfP; payers' banks need billers. Solve it with **anchor billers** (utilities, telcos, insurers, government) and bank consortium commitments.
- **Pricing:** per RfP to the biller, priced against the biller's current collection cost (lockbox, card fees, ACH returns); free to payers.

### Play 9 — Public sector and G2P

- Instant disbursements for disaster relief, benefits, and refunds; instant tax and fee collections.
- **GTM:** long procurement cycles, so partner with government payment processors and position around financial inclusion.

### Play 10 — Cross-border instant linkages

- Link domestic instant systems (e.g., PayNow–UPI; Nexus). Accept UPI from Indian travellers abroad; offer instant remittance corridors.
- See [06 — Cross-border](06-cross-border-payments.md).

---

## 8. Country lessons for monetisation

| Market | Monetisation lesson |
|---|---|
| **India (UPI)** | Zero MDR means **no direct payment revenue** for banks and apps on P2M. Players monetise through **credit** (credit lines and RuPay credit cards on UPI), **merchant services** (payment soundboxes and devices on subscription, QR kits, merchant loans), distribution of financial products, and advertising. NPCI's proposed 30% market-share cap per app has had its deadline repeatedly extended (verify). It's a live debate on sustainability ("who pays for the rails?"). |
| **Brazil (Pix)** | Free for individuals, with businesses paying PSP fees below cards. It has taken share from **debit cards, cash, and *boleto*** (a bank payment slip). Banks monetise business Pix, credit features, and **Pix Automático** for recurring collections; installment features are in development. |
| **UK (FPS)** | Mature and free for consumers. Monetisation is in **business banking tariffs** and **open-banking payment initiation** (Pay-by-Bank providers charge merchants). **APP reimbursement** made fraud cost explicit. **Commercial VRP** is the next monetisation frontier (verify rollout). |
| **EU (SCT Inst + IPR)** | **Price parity** kills the instant premium. Banks must compete on VAS (VoP, liquidity, reconciliation) and on A2A acceptance schemes (e.g., the European Payments Initiative's wallet (wero) and national schemes). |
| **US (RTP, FedNow)** | Free pricing and no mandate means **B2B use cases lead**. Growth in disbursements, account-to-account transfers, and RfP pilots; the ecosystem is building reachability through core processors. |

---

## 9. Sample engagement: "Build our instant-payments commercial proposition" (a US regional bank)

**The client question:** *"We connected to RTP and FedNow a year ago. Volumes are tiny. What's our strategy, pricing, and GTM?"*

| Weeks | Workstream | Key activities and analyses | Outputs |
|---|---|---|---|
| 1–2 | **Diagnostic** | Current volumes by client and use case; client-base mapping (which clients have payout, AP, or collections pain); wire and same-day ACH revenue at risk; competitor offer scan (10–15 banks and fintechs); 15–20 client interviews | Baseline; "why volumes are low" (typically no API, receive-only mindset, sales not incentivised, no use-case offers) |
| 3–4 | **Where to play** | Use-case prioritisation (value of speed × revenue pool × ease × right to win); vertical targeting within the client book; revenue pool sizing (top-down and bottom-up) | Top 3–5 use cases, 2–3 priority verticals, sized opportunity |
| 5–6 | **Offer and pricing** | Good-better-best packaging; EVC per use case; cannibalisation model (wires, same-day ACH); conjoint or structured client pricing interviews; price book | Price book; cannibalisation-adjusted business case |
| 7–8 | **GTM and sales** | Coverage (which RMs sell; a specialist overlay team); incentives; ROI calculators; lighthouse-client pipeline; partner strategy (ERP connectors, vertical software, fintech B2B2X) | GTM plan, sales playbook, partner shortlist |
| 9–10 | **Roadmap and business case** | Capability gaps (APIs, fraud tooling, 24/7 ops, limits, reporting); 3-year P&L (direct revenue + protected revenue + deposit value); KPIs; governance | Roadmap, business case, KPI dashboard, pilot plan with 5 lighthouse clients |

**Typical recommendation headline:** *"Win 3 verticals with packaged payout and collection offers, price on value (not network cost), protect wire economics with a high-value tier, embed via API and ERP, and measure success on relationship revenue, not instant-payment fees alone."*

---

## 10. RTP KPIs

- **Adoption:** clients enabled to send (vs receive-only); active sending clients; transactions per active client; % of payouts moved from cheque or ACH to instant
- **Revenue:** revenue per transaction; VAS attach rate; platform-fee clients; revenue *protected* (retained operating accounts)
- **Cannibalisation:** wire and same-day ACH revenue lost vs instant revenue gained
- **Network:** % of payees reachable; RfP pay rate
- **Risk:** fraud losses in bps of value; APP reimbursement cost; mule accounts detected; false-positive rate
- **Operations:** uptime and latency; exception rate; 24/7 incident response times

---

## 11. RTP watch-list (verify current status)

- US: RTP and FedNow limits, participation (send-enabled vs receive-only), RfP adoption, and any move toward liability rules for APP fraud
- US Section 1033 open-banking rule (reconsidered in 2025–26): data-access fees affect Pay-by-Bank economics
- EU: IPR implementation (the VoP rollout from October 2025), PSD3/PSR fraud-liability provisions, the digital euro timeline
- UK: APP reimbursement outcomes, the commercial VRP rollout, the National Payments Vision and the future of UK payments infrastructure
- India: UPI market-share cap timing, the MDR debate, credit on UPI growth, UPI international expansion
- Brazil: Pix Automático adoption, Pix installments, the impact on cards
- Cross-border instant linkages (Nexus and bilateral links)
