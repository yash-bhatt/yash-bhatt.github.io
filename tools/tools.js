/* tools.js — renders the Tools grid from tools.json.
   Add a tool by editing tools.json only; no layout edits needed here. */
(function () {
  'use strict';

  var STATUS = {
    'live':       { label: 'Live',       cls: 'tool-status--live',       cta: 'Open tool' },
    'in-build':   { label: 'In build',   cls: 'tool-status--in-build',   cta: 'Preview' },
    'on-request': { label: 'On request', cls: 'tool-status--on-request', cta: 'Request a demo' }
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function card(tool) {
    var s = STATUS[tool.status] || STATUS['in-build'];
    var wrap = el('article', 'tool-card scroll-reveal');

    var badge = el('span', 'tool-status ' + s.cls, s.label);
    wrap.appendChild(badge);

    var body = el('div', 'tool-card-body');
    body.appendChild(el('h3', 'tool-card-name', tool.name));
    body.appendChild(el('p', 'tool-card-question', tool.question));
    if (tool.offer) body.appendChild(el('p', 'tool-card-offer', 'Supports: ' + tool.offer));
    wrap.appendChild(body);

    var footer = el('div', 'tool-card-footer');
    footer.appendChild(el('span', 'tool-card-offer', tool.tier ? ('Tier ' + tool.tier) : ''));
    var link = el('a', 'btn btn-link', s.cta + ' →');
    link.href = tool.href || '#';
    footer.appendChild(link);
    wrap.appendChild(footer);

    return wrap;
  }

  function render(tools) {
    var grid = document.getElementById('tools-grid');
    if (!grid) return;
    grid.innerHTML = '';
    tools.forEach(function (t) { grid.appendChild(card(t)); });
  }

  function fail(msg) {
    var grid = document.getElementById('tools-grid');
    if (grid) grid.innerHTML = '<p style="color: var(--color-text-secondary);">' + msg + '</p>';
  }

  fetch('tools.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) { render((data && data.tools) || []); })
    .catch(function () {
      fail('Tool list is loading elsewhere. See the <a href="#" class="btn-link">contact form</a> to request a demo.');
    });
})();
