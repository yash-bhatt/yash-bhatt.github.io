# CONTEXT.md — Facts for building yash-bhatt.github.io

This file is the source of truth for the website build. Every fact below comes from the site owner's answers or the existing `index.html`. Nothing is invented. Items marked **GAP** are missing and must be supplied before that section can be built with real content.

## 1. What the site is

- A personal portfolio and consulting website for **Yash Bhatt**.
- Its purpose is to **present his consulting projects** and to serve as the page **clients are redirected to**.
- Hosted on GitHub Pages at **yash-bhatt.github.io**.

## 2. Who it serves

- Primary audience: **insurance companies and reinsurance companies** evaluating Yash for consulting work.

## 3. The subject: Yash Bhatt

### Positioning
- **Yash Bhatt, AIA** — independent **Pricing and Product Development Consultant** (actuarial), working remotely with insurance and reinsurance companies since January 2025.
- Associate of the Institute and Faculty of Actuaries; ~6 years in actuarial data science and life/annuity analytics.
- Site headline leads as an **actuarial consultant**; target search phrase: **"Actuarial Data Scientist"**.

### Work experience (from "Yash Bhatt Resume 2026.pdf")
- **Independent Consulting — Pricing and Product Development Consultant (January 2025 – present, remote)**:
  - *Parametric insurance product development*: designed and priced a parametric product covering heat, rain, storm, and pollution perils for Southeast Asia — trigger definition through payout structure and rating logic; Python prototypes tested performance under historical and stressed climate scenarios; burn cost, AAL, and stress-testing analysis with different loadings; drafted policy document and payout terms.
  - *Reinsurance pricing* (client: RGA): priced Term Life and Credit Life products via experience analysis and basis development; maintained and tuned AXIS models for pricing and sensitivity analysis; built and calibrated mortality curves using actuarial laws and GLM spline models; analyzed mortality improvement (IIB + census data) for long-term pricing; used linear, logistic, and XGBoost models to assess risk relativities and flag high-risk lives.
- **Milliman (March 2020 – December 2024, remote)** — three roles:
  - *Actuarial Data Scientist (March 2023 – December 2024)*: built a VM-21 calculation engine and cashflow/hedging/risk-measurement models on Databricks/PySpark, materially faster than the legacy Excel process; designed end-to-end PySpark + Delta Lake pipelines for annuity experience datasets exceeding one billion records and one trillion USD fund value, cutting model runtime 40%; integrated MLflow for model versioning; built custom predictive models for FIA and MYGA products in a high-interest-rate, elevated-lapse environment (supervised and unsupervised ML for pricing, lapse analysis, customer segmentation); collaborated on MG-ALFA/Integrate actuarial model transition; led and expanded a team of actuarial data analysts.
  - *Actuarial Data Analyst (September 2020 – March 2023)*: built and maintained variable annuity experience-study pipelines in SQL Server and R with seriatim-data risk-exposure logic; developed predictive models in R for policyholder behaviour, lapse, and benefit utilisation; led a Databricks proof of concept (sparkR/sparklyR); contributed to a micro-insurance MVP for the Vietnam market with remittance-based premium collection.
  - *Actuarial Intern (March 2020 – September 2020)*: built cashflow models for Indian life insurance products; documented policy-detail transfer for a legacy policy admin system migration.

### Education and credentials
- **Institute and Faculty of Actuaries — Associate (AIA)**: passed CS1, CS2, CM1, CM2, CB1, CB2, CB3, CP1, CP2, CP3.
- **Kirori Mal College, University of Delhi**: B.Sc. (Honors) Mathematics, 7.4/10.
- **Senior Secondary (CBSE), Rajkiya Pratibha Vikas Vidyalaya**: 95%.

### Skills
- Spark SQL, T-SQL, MySQL; Python; R.
- Databricks, Azure cloud platform, Power BI.
- GGY-AXIS, MG-ALFA (actuarial modelling software).
- Machine learning (multiple algorithms); project management.

## 4. What the site must contain

Sections carried over from the current site structure:
- **Home/intro** — name, positioning, links to sections.
- **About** — profile summary, personal info, skills.
- **Resume** — work experience and education timelines above.
- **Portfolio** — consulting projects. **GAP:** the current portfolio items (Liberty, Shutterbug, Clouds, Beetle, Lighthouse, Salad) are template placeholders with dummy text and must be replaced with Yash's real consulting/personal projects before launch.
- **Services** — nav link exists but the section has no content yet. **GAP:** list of consulting services offered to insurance/reinsurance clients.
- **Contact** — details below.
- A **Download CV** button exists. CV file available: "Yash Bhatt Resume 2026.pdf" (currently at ~/Personal/YB/, must be copied into the site).

## 5. Contact details (from current site)

- Emails: b.yash289@gmail.com, yashbhatt033@gmail.com
- Phone: (+91) 996 811 2775; Mobile: (+91) 870 046 1124
- Location: AIPL Business Club, 11th floor, Sector-62, Gurgaon, HR 122011, India
- GitHub: https://github.com/yash-bhatt
- LinkedIn: https://www.linkedin.com/in/yashbhatt28/
- Twitter: link present in current site but points to a placeholder (`twitter.com`). **GAP:** real handle or remove.

## 6. What a visitor should do

- Primary visitor action (confirmed by owner): **read Yash's articles and browse the work he has done previously.**
- The site must therefore surface both an articles/posts area and the past-work portfolio prominently. The current site mentions LinkedIn posts as where past writing lives ("created some posts on LinkedIn"), so articles may link out to LinkedIn or be hosted on-site. **GAP:** the actual list of articles (titles/links) and past work items to feature.

## 7. Known inconsistencies to resolve before build

- The intro heading currently reads "(SITE UNDER DEVELOPMENT!)" — remove for launch.
- The skill-bar labels and percentages disagree in places (e.g., SQL shows a 90th-percentile bar class with "80%" text; Product Management shows an 80% bar class with "75%" text) — pick one number per skill.
- The current site describes an employee seeking opportunities ("Seeking a challenging and growth-driven opportunity…"), but the site's stated purpose is a **consulting** presence for insurance/reinsurance clients. The About copy needs rewriting to a consultant's framing.
