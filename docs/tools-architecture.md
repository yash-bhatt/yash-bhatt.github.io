# Tools Architecture — Interactive Actuarial Demos

How the `/tools/` section is built and how future demos are added. The site is a static
GitHub Pages deployment: no server process runs on the host. Every tool must therefore be
either client-side compute or a call to an externally hosted API. That constraint drives the
three tiers below.

---

## Three-tier hosting model

### Tier 1 — Client-side (ship first)

Pure JS or [Pyodide](https://pyodide.org/) running in the browser. No backend, zero hosting
cost, works on GitHub Pages as-is. This is where every tool starts; only promote to Tier 2
when the compute genuinely can't run in a browser tab.

Ship candidates:

| Tool | Question it answers for the buyer |
|---|---|
| Burn-cost / AAL explorer | "What loss distribution and average annual loss does my peril data imply before I load it?" |
| Mortality-curve visualizer | "How different is a law-based fit (Gompertz–Makeham) from a GLM spline on the same data?" |
| Parametric payout simulator | "How does the payout curve change as I move the trigger, exhaust, and limit?" |

Implementation notes:
- Prefer vanilla JS + a small charting lib (or hand-drawn SVG/Canvas) over pulling Pyodide;
  Pyodide's ~6 MB download is only justified when you need NumPy/SciPy/pandas semantics.
- All compute runs on the visitor's machine. Uploaded CSVs never leave the browser — state
  that explicitly on the tool page (it is a selling point to a data-sensitive buyer).
- No secrets, no keys, no PII in client code.

### Tier 2 — Serverless API (heavier compute)

For work too heavy for a browser tab — stochastic scenario runs, small pricing engines — put
the compute behind **Azure Functions (Python, Consumption plan)** and call it from the static
frontend. The page stays on GitHub Pages; only the compute moves.

**API contract (define per tool before building).** Every endpoint is versioned, `POST`, JSON
in / JSON out, with a single stable error envelope.

```
POST /api/v1/{tool-slug}
Content-Type: application/json
```

Example — burn-cost engine (`/api/v1/burn-cost`):

```jsonc
// Request
{
  "peril": "rainfall",                 // enum: rainfall | heat | storm | pollution
  "trigger": 120.0,                    // index level at which payout starts
  "exhaust": 250.0,                    // index level at which payout caps
  "limit": 1000000,                    // max payout, currency units
  "loading": 0.15,                     // proportional load on expected loss
  "observations": [ 98.2, 143.1, ... ] // historical index series (numbers)
}

// 200 Response
{
  "expected_loss": 84213.55,
  "aal": 84213.55,
  "burn_cost_rate": 0.0842,
  "loaded_premium": 96845.58,
  "loss_distribution": [ { "return_period": 2, "loss": 0 }, ... ],
  "meta": { "engine_version": "1.0.0", "n_obs": 32 }
}

// Error envelope (any non-2xx) — same shape for every tool
{
  "error": {
    "code": "INVALID_INPUT",          // machine-readable enum
    "message": "exhaust must be greater than trigger",
    "field": "exhaust"                 // optional, when the error is field-scoped
  }
}
```

Error `code` enum (shared across tools): `INVALID_INPUT`, `PAYLOAD_TOO_LARGE`,
`RATE_LIMITED`, `TIMEOUT`, `INTERNAL`.

**CORS policy.** Function App allows `https://yash-bhatt.github.io` (and
`http://localhost:*` for local dev) as origins; methods `POST, OPTIONS`; headers
`Content-Type`. No credentials, no wildcard origin in production.

**Cost guardrails.**
- Consumption plan only (pay-per-execution, scales to zero). No always-on App Service Plan.
- Hard timeout: 30 s per invocation (`functionTimeout` in `host.json`); reject payloads
  larger than a documented cap (e.g. 25k observations) with `PAYLOAD_TOO_LARGE`.
- Client-side throttle + a coarse per-IP rate limit in the Function to cap runaway spend.
- A spending alert on the Azure subscription; if it fires, the tool degrades to "On request".

### Tier 3 — Gated demos (prospect-specific)

Authenticated **Databricks** or **Streamlit** apps for demos on a prospect's own book. These
are **linked from the site, not embedded** — access is granted per engagement, behind the
provider's auth. The Tools grid shows an "On request" card that routes to the contact form.

**VBA assets do not run on the web.** Never represent VBA/Excel work as a live tool. Publish it
as a downloadable workbook plus a short write-up page describing the model, its inputs, and a
screenshot. It counts as a proof artifact, not an interactive demo.

---

## Repo conventions

```
/tools/
  index.html                 # Tools landing page — renders the grid from tools.json
  tools.js                   # fetches tools.json, renders cards into #tools-grid
  tools.json                 # MANIFEST — the single source of truth for the grid
  _template/                 # copy this folder to start a new tool
    index.html               # shared tool-page layout (chrome + #tool-root mount)
    tool.js                  # tool entry point; documents the client-side contract
  <slug>/                    # one folder per tool
    index.html               # detail/tool page (copied from _template)
    tool.js                  # tool logic (Tier 1) or fetch wrapper (Tier 2)
/css/tools.css               # tool-only styles (status badges, tool-page layout)
/docs/tools-architecture.md  # this file
```

**Adding a tool is two steps, no layout edits:**
1. Copy `/tools/_template/` to `/tools/<slug>/` and build the tool inside `#tool-root`.
2. Add one object to the `tools` array in `tools.json`.

The grid re-renders from the manifest on next load. `status` drives the badge:
`live` | `in-build` | `on-request`. Cards with a real page link to `<slug>/`; the bespoke
"On request" card links to the contact form.

Shared layout is delivered by convention, not a build step: every tool page includes the same
header/footer chrome (as the article pages do) and loads `../../css/*` + `../../js/main.js`
for theme/nav behavior, plus `../../css/tools.css` and its own `tool.js`.

---

## Sequenced backlog (build order = sales value ÷ build effort)

Each Tier-1 tool doubles as a sales artifact for a specific service offer. Ordered so a future
session can pick the top item up cold.

### 1. Parametric payout simulator  — highest value/effort
Maps to **Parametric Product Design & Pricing**. Pure UI math, no data upload, most visual.
- **Inputs:** sliders for trigger, exhaust, limit; dropdown for payout shape (linear / stepped).
- **Compute:** `payout(index) = clamp((index − trigger)/(exhaust − trigger), 0, 1) × limit`.
- **Output:** live SVG/Canvas payout curve + a readout table at sample index levels.
- **Data:** none. Everything is client-side arithmetic.
- **Done when:** moving any slider updates the curve in real time; no backend.

### 2. Burn-cost / AAL explorer  — high value, moderate effort
Maps to **Parametric Product Design & Pricing** (quantitative follow-through to #1).
- **Inputs:** CSV upload (historical index series) + trigger/exhaust/limit + loading.
- **Compute:** per-year modelled loss → expected loss, AAL, burn-cost rate, loaded premium.
- **Output:** loss-distribution / return-period table + summary metrics; CSV stays in-browser.
- **Data:** ship a sample peril CSV in the folder so it works with zero upload.
- **Done when:** sample CSV renders metrics; user CSV replaces it without a page reload.

### 3. Mortality-curve visualizer  — solid value, highest effort
Maps to **Reinsurance & Life Pricing**. Needs a curve-fitting routine (candidate for Pyodide).
- **Inputs:** sample age/exposure/deaths dataset (bundled) + toggle of fitted curves.
- **Compute:** Gompertz–Makeham law fit vs. GLM spline fit on qx.
- **Output:** overlaid mortality curves (observed vs. two fits) + residuals.
- **Data:** bundled sample dataset; no upload required for v1.
- **Done when:** both fitted curves overlay the observed points on one chart.
