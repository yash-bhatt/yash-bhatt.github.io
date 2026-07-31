/* Parametric Payout Simulator — Tier 1 (client-side).
 * In build. See /docs/tools-architecture.md and /tools/_template/tool.js for the contract.
 * payout(index) = clamp((index - trigger) / (exhaust - trigger), 0, 1) * limit
 */
(function () {
  'use strict';
  // TODO: build sliders (trigger, exhaust, limit, shape) and render the payout curve
  // into #tool-root. Pure client-side math; no network calls.
})();
