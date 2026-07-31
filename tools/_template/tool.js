/* tool.js — entry point for a single tool. Copy with the folder and implement.
 *
 * Contract:
 *   - Mount everything inside document.getElementById('tool-root').
 *   - Tier 1 (client-side): do the math here; no network calls. Any uploaded file
 *     must be read with FileReader and never sent anywhere.
 *   - Tier 2 (serverless): POST JSON to the Azure Function and render the response.
 *     Use the shared request/response/error shapes in /docs/tools-architecture.md.
 *   - On error, replace #tool-root content with a readable message — never a raw stack.
 *
 * While a tool is "In build", leave the placeholder markup in index.html and don't
 * clear #tool-root here. Flip the status badge in index.html AND tools.json to
 * "live" when it ships.
 */
(function () {
  'use strict';

  var root = document.getElementById('tool-root');
  if (!root) return;

  // --- Tier 1 skeleton -----------------------------------------------------
  // function compute(inputs) { /* pure function, return outputs */ }
  // function draw(outputs)  { /* render into `root` (SVG/Canvas/DOM) */ }

  // --- Tier 2 skeleton -----------------------------------------------------
  // async function run(inputs) {
  //   var res = await fetch('https://<function-app>.azurewebsites.net/api/v1/<slug>', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(inputs)
  //   });
  //   var data = await res.json();
  //   if (!res.ok) throw new Error((data.error && data.error.message) || 'Request failed');
  //   return data;
  // }
})();
