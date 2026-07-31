# Execution Blueprint: yash-bhatt.github.io — Handoff Package for Claude Opus

Copy Section 1 verbatim as the Opus system prompt. Feed Section 2 phase-by-phase as user messages, in order. Section 3 is reference data Opus will need inline — paste it with Phase 1.

---

## SECTION 1 — SYSTEM PROMPT FOR CLAUDE OPUS (copy verbatim)

```
You are the lead strategist and copywriter finishing a professional portfolio website for Yash Bhatt, an Associate Actuary (IFoA, AIA) and independent pricing/product-development consultant with 6+ years in life insurance, annuities, and parametric products. The site's job is to win B2B consulting engagements from insurers, reinsurers, insurtechs, and actuarial consulting firms — not to impress recruiters.

CONTEXT YOU MUST ASSUME AS TRUE:
- The site's layout, responsive UI, resume download, contact form, and social links already exist and work. Never regenerate foundational scaffolding. You edit and extend the existing codebase (built with Antigravity + Claude Code).
- Target buyer personas, in priority order: (1) Chief Actuary / Head of Pricing at a mid-size life insurer or reinsurer, (2) Head of Product at an insurtech building parametric or micro-insurance products, (3) Engagement manager at an actuarial consulting firm seeking overflow/specialist capacity, (4) Head of Actuarial Transformation evaluating a Databricks/cloud migration.
- Every one of these buyers is technical, time-poor, and allergic to marketing fluff. They buy risk reduction, speed, and regulatory defensibility — not "passion" or "innovation."

OPERATING RULES:
1. Outcome-first copy. Every service, project, and capability must be stated as: business outcome → mechanism → proof point. Never lead with a tool name. "Cut annuity model runtime 40% by rebuilding the pipeline on Databricks/Delta Lake" — not "Experienced in Databricks."
2. Quantify or cut. If a claim has no number, timeframe, scale, or named methodology behind it, either find one in the source material or delete the claim.
3. Credibility hygiene. Client and employer names (Milliman, RGA, Prudential, TeamLease) may appear only as factual experience statements ("engagements delivered for/at..."), never phrased as endorsements, partnerships, or testimonials. Do not fabricate testimonials, logos-wall permissions, or case-study details not present in the source résumé. Where a detail is missing (e.g., exact claim-cost saving), insert a clearly marked [YASH: CONFIRM/PROVIDE] placeholder rather than inventing it.
4. Voice: first person, plainspoken, technically precise, quietly confident. A Chief Actuary should read it and think "this person has actually done the work."
5. Banned copy patterns (these read as AI-generated slop and will be rejected): "passionate about," "leverage," "cutting-edge," "seamless," "unlock," "empower," "transformative," "in today's rapidly evolving landscape," "I don't just X, I Y," sentences ending in vague -ing clauses ("...ensuring optimal outcomes"), rule-of-three adjective triplets, em-dash chains, generic upbeat closers ("exciting times ahead"). Vary sentence length. Prefer "is/has/built/priced" over "serves as/functions as."
6. Static-site discipline. The site is hosted on GitHub Pages (static). Any interactive tool architecture must respect this: client-side compute (JS/Pyodide) or externally hosted APIs (Azure Functions/Container Apps) called from the static frontend. Never propose a server process inside GitHub Pages.
7. Scope control. Execute only the phase you are given. At the end of each phase, output (a) the exact files changed/created with full contents, (b) a ≤10-line change summary, (c) open [YASH: ...] placeholders. Do not begin the next phase unprompted.
8. Self-audit before returning copy: reread your draft and ask "what makes this read as AI-generated or as a generic consultant site?" Fix those tells, then deliver.
```

---

## SECTION 2 — EXECUTION SEQUENCE (feed as user messages, in order)

### PHASE 1 — Copywriting & Value Propositions

**Prompt to send:**

```
PHASE 1: Write the full site copy. Use the résumé data block provided below as the sole factual source. Deliverables:

1. POSITIONING STATEMENT (hero section, ≤25 words + one supporting line ≤40 words). It must name the buyer and the outcome, e.g. the pattern: "Pricing, product build, and actuarial modernization for insurers and reinsurers — delivered by an IFoA associate who has shipped the production systems, not just the memos." Write 3 candidate versions; recommend one.

2. SERVICE ARCHITECTURE — exactly four offers, each with: name, one-line outcome promise, 3 scope bullets, "typical engagement" line (duration/shape), and the proof point drawn from the résumé:
   a. Parametric Product Design & Pricing — trigger definition → payout structure → rating → burn cost/AAL/stress testing → policy wording. Proof: multi-peril (heat, rain, storm, pollution) SE Asia product, Python prototyping under historical + stressed climate scenarios.
   b. Actuarial Modeling Modernization — legacy Excel/R/AXIS estates onto Databricks/PySpark with model-risk governance. Proof: VM-21 engine + cashflow/hedging/risk models replacing legacy Excel; 1B+ record, $1T fund-value pipelines; 40% runtime reduction; MLflow versioning; MG-ALFA/Integrate transition experience.
   c. Reinsurance & Life Pricing Support — experience analysis, basis development, mortality curve construction (actuarial laws + GLM splines), mortality improvement (IIB + census), AXIS model maintenance. Proof: Term Life / Credit Life pricing delivered on RGA engagements.
   d. Policyholder Behavior & Predictive Analytics — lapse/utilization modeling, risk relativities, segmentation. Proof: FIA/MYGA lapse models in a high-rate elevated-lapse environment; XGBoost/logistic risk flagging; seriatim experience-study pipelines in SQL Server/R; sparkR/sparklyr big-data POC.

3. TRANSLATION TABLE (internal working artifact, then apply it): for each technical capability, write the buyer-value sentence. Examples of the required register:
   - "Delta Lake pipelines, 1B+ records" → "Your experience studies stop being a quarterly fire drill; refreshes run in hours on governed, versioned data."
   - "Burn cost / AAL / stress testing" → "You see the loss distribution and tail behavior of a parametric product before committing capital to it."
   - "MLflow model tracking" → "Every pricing model is versioned and auditable — an answer for the regulator and the model-risk committee, not just the pricing team."
   Apply this register across all site copy.

4. ABOUT SECTION (≤150 words): career arc Milliman intern → analyst → actuarial data scientist → independent consultant; IFoA associateship (10 exams passed); the through-line is pricing rigor + production engineering. First person. No adjectives about personality.

5. CTA STRATEGY: primary CTA is a scoped conversation ("Book a 30-minute scoping call"), not "Contact me." Write CTA copy for hero, end of each service block, and footer. Secondary CTA: resume download (already built — copy only).

6. SEO/META: title tag, meta description, and og: description targeting "parametric insurance pricing consultant," "actuarial Databricks migration," "reinsurance pricing consultant," "VM-21 modeling."

Return per Operating Rule 7.
```

### PHASE 2 — Interactive Tool Integration Roadmap

**Prompt to send:**

```
PHASE 2: Architect the "Tools" section for future interactive actuarial demos. Do not build the tools yet; build the frame they will drop into. Deliverables:

1. THREE-TIER HOSTING ARCHITECTURE, documented in /docs/tools-architecture.md and reflected in the site's nav + a "Tools" landing page:
   - Tier 1 (client-side, ship first): pure JS or Pyodide-in-browser calculators. No backend, zero hosting cost, works on GitHub Pages. Candidates: burn-cost/AAL explorer with uploadable peril CSV; mortality-curve visualizer (Gompertz–Makeham vs. GLM spline fit on sample data); parametric payout-structure simulator (trigger/exhaust/limit sliders → payout curve).
   - Tier 2 (serverless API): Azure Functions (Python) behind a static frontend for compute too heavy for the browser — stochastic scenario runs, small pricing engines. Define the API contract now (JSON schema per tool: inputs, outputs, error shape), CORS policy, and a cost-guardrail note (consumption plan, timeout caps).
   - Tier 3 (gated demos): authenticated Databricks/Streamlit app links for prospect-specific demos — linked from the site, not embedded. Note: VBA assets cannot run on the web; represent VBA work as downloadable workbook + a short write-up page, never as a live tool.

2. FRONTEND FRAME: a tool-card grid on the Tools page. Each card: tool name, one-line "what question this answers for you," status badge (Live / In build / On request), and a stub detail page template. Ship the grid now with the Tier-1 candidates marked "In build" and one "On request" card for bespoke demos.

3. REPO CONVENTIONS: folder structure (/tools/<slug>/ with index.html + tool.js or pyodide bundle), a shared tool-page layout component, and a manifest (tools.json) that drives the grid — so future tools are added by dropping a folder + manifest entry, no layout edits.

4. SEQUENCED BACKLOG: order the three Tier-1 tools by (sales value ÷ build effort), with a ≤5-line build spec each, so any future Claude Code session can pick one up cold.

Return per Operating Rule 7.
```

### PHASE 3 — Final Polish (UI/UX & Conversion Audit)

**Prompt to send:**

```
PHASE 3: Audit and fix. Work through this checklist against the live codebase; for each item output PASS, or FAIL + the exact diff that fixes it.

1. CONVERSION PATH: from any page, the scoping-call CTA is reachable in ≤1 click; contact form has ≤4 fields (name, email, company, "what are you pricing/modernizing?"); form failure states exist; a post-submit confirmation sets expectations ("reply within 1 business day").
2. TRUST SIGNALS ABOVE THE FOLD: IFoA/AIA credential, years of experience, and one quantified proof point visible without scrolling on both mobile and desktop.
3. SCANNABILITY: a Chief Actuary skimming for 30 seconds hits: who you serve, the four offers, one hard number, and the CTA. Verify heading hierarchy supports this; fix if any section requires reading body text to understand its point.
4. COPY QA: run the Operating Rule 5 banned-pattern scan across every page; verify no client name is phrased as an endorsement; verify every number on the site traces to the résumé data block or a [YASH: CONFIRM] placeholder.
5. TECHNICAL: Lighthouse pass — performance ≥90 mobile, accessibility ≥95 (contrast, focus states, form labels, alt text), no console errors; resume PDF link returns 200; social/meta tags render correct previews; 404 page exists.
6. MOBILE: hero, service cards, tool grid, and form usable at 360px width; no horizontal scroll; tap targets ≥44px.
7. RESIDUALS: list every remaining [YASH: ...] placeholder in one block so Yash can resolve them in a single pass.

Return per Operating Rule 7.
```

---

## SECTION 3 — RÉSUMÉ DATA BLOCK (paste with Phase 1)

```
CREDENTIALS: Associate, Institute and Faculty of Actuaries (AIA) — CS1, CS2, CM1, CM2, CB1, CB2, CB3, CP1, CP2, CP3 passed. B.Sc.(H) Mathematics, Kirori Mal College, University of Delhi.

ROLES: Independent Pricing & Product Development Consultant (Jan 2025–present) | Milliman: Actuarial Data Scientist (2023–24), Actuarial Data Analyst (2020–23), Actuarial Intern (2020). Client work includes RGA; additional experience with Prudential and TeamLease [YASH: CONFIRM framing for these two].

PARAMETRIC: Designed and priced multi-peril parametric product (heat, rain, storm, pollution) for SE Asia — trigger definition, payout structure, rating logic, policy wording. Python prototypes tested under historical and stressed climate scenarios. Burn cost, AAL, and stress testing with loadings to project payouts.

MODERNIZATION: Built VM-21 calculation engine + cashflow/hedging/risk-measurement models on Databricks/PySpark, materially faster than legacy Excel, with formal model-appropriateness and model-risk assessment. End-to-end PySpark/Delta Lake pipelines for annuity experience data >1B records / >$1T fund value; 40% runtime reduction via Spark SQL optimization, cluster tuning, Delta versioning; lowered cloud spend. MLflow for model versioning/monitoring. MG-ALFA + Integrate (Milliman) model transition project. Legacy policy-admin migration documentation (funds, units, policy details).

PRICING: Term Life and Credit Life reinsurance pricing via experience analysis and basis development (RGA). AXIS model maintenance and sensitivity testing. Mortality curves via actuarial laws + GLM splines. Mortality improvement analysis (IIB + census data). Cashflow models for Indian life products.

PREDICTIVE: FIA/MYGA lapse and segmentation models in high-rate, elevated-lapse environment (supervised + unsupervised, data bucketing). XGBoost/logistic/linear risk-relativity and high-risk-life flagging. Variable annuity experience-study pipelines (SQL Server, R) with seriatim actuarial logic. Databricks POC with sparkR/sparklyr beating legacy R runtimes. Micro-insurance MVP for Vietnam with remittance-based premium collection.

LEADERSHIP: Led and expanded actuarial data analyst team; built training and onboarding materials.

STACK: Python, R, Spark SQL, T-SQL, MySQL, Databricks, Azure, Power BI, GGY-AXIS, MG-ALFA, VBA, MLflow.
```

---

## EXECUTION NOTES (for you, not Opus)

- Run phases in separate Opus conversations if context gets long; the system prompt + data block are self-contained per phase.
- Phase 1 output is copy — review the [YASH: CONFIRM] placeholders before Phase 3, since the copy QA step checks numbers against the data block.
- The Prudential/TeamLease framing needs your call: résumé doesn't name them, so decide whether they appear at all and in what capacity before Opus writes client-experience copy.
- Tier-1 tools are deliberately chosen to double as sales artifacts for offers (a), (c), and (a) respectively — each tool demo maps to a service page.
