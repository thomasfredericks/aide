(function () {
  // Configuration for supported alert types. Exposed for extensibility via window.$docsify.alertsConfig
  const alertTypes = (window.$docsify && window.$docsify.alertsConfig && window.$docsify.alertsConfig.types) || {
    'NOTE': {
      class: 'note',
      icon: '<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'
    },
    'TIP': {
      class: 'tip',
      icon: '<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>'
    },
    'IMPORTANT': {
      class: 'important',
      icon: '<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>'
    },
    'WARNING': {
      class: 'warning',
      icon: '<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>'
    },
    'CAUTION': {
      class: 'caution',
      icon: '<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'
    }
  };

  const defaultStyles = `
    .alert {
      border-radius: 4px;
      margin: 1em 0;
      padding: 0.75em 1em; /* slightly tighter for single-line */
      border-left: 4px solid;
      display: flex;
      align-items: flex-start; /* Align icon with first line */
      color: var(--alert-text-color, black); /* Use CSS variable for text color */
      line-height: 1.4;
    }
    .alert svg {
      margin-right: 0.5em;
      flex-shrink: 0; /* Prevent icon from shrinking */
      width: 16px; /* Ensure a fixed width */
      height: 16px; /* Ensure a fixed height */
      margin-top: 2px; /* nudge icon to align with text cap height */
    }
    .alert .alert-content { flex: 1; }
    /* Remove excessive paragraph margins inside alerts */
    .alert .alert-content > p { margin: 0.3em 0; }
    .alert .alert-content > p:first-child { margin-top: 0; }
    .alert .alert-content > p:last-child { margin-bottom: 0; }
    .alert.note {
      background-color: #e7f3fe;
      border-color: #2196f3;
    }
    .alert.tip {
      background-color: #e7fbe7;
      border-color: #4caf50;
    }
    .alert.important {
      background-color: #f3e7fe;
      border-color: #9c27b0;
    }
    .alert.warning {
      background-color: #fff8e1;
      border-color: #ffeb3b;
    }
    .alert.caution {
      background-color: #ffebee;
      border-color: #f44336;
    }
  `;

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));
  }

  function createAlertBox(type, content) {
    const alertType = alertTypes[type.toUpperCase()];
    if (!alertType) return content; // Fallback: just return original content if unknown type
    return `<div class="alert ${alertType.class}" role="note" aria-label="${type.toUpperCase()}">${alertType.icon}<div class="alert-content">${content}</div></div>`;
  }

  // Line-based parser (legacy 'pre' mode) to avoid greedy regex swallowing following headings and to support single-line alerts.
  // In 'dom' mode we defer transformation until after markdown rendering to preserve markdown (images, links, code, etc.).
  function parseAlerts(content) {
    const lines = content.split(/\r?\n/);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = line.match(/^>\s*\[!(\w+)\]\s*(.*)$/);
      if (!m) { out.push(line); continue; }
      const type = m[1];
      if (!alertTypes[type.toUpperCase()]) { // Not a supported type; treat as normal line
        out.push(line);
        continue;
      }
      const collected = [];
      const firstRemainder = m[2];
      if (firstRemainder) collected.push(firstRemainder.trim());
      let j = i + 1;
      while (j < lines.length) {
        const ln = lines[j];
        if (/^>\s*\[!(\w+)\]/.test(ln)) break; // next alert starts
        if (/^>\s?.*/.test(ln)) {
          // Quoted continuation line (can be just ">" or "> text")
            const cleaned = ln.replace(/^>\s?/, '');
            collected.push(cleaned);
            j++;
            continue;
        }
        // Non blockquote line ends this alert block
        break;
      }
      i = j - 1; // advance
      // Escape user content & preserve line breaks as <br>
      const inner = collected.map(escapeHTML).join('<br>');
      out.push(createAlertBox(type, inner));
      out.push(''); // ensure blank line after alert so next heading is parsed correctly
    }
    return out.join('\n');
  }

  function injectStyles(css) {
    if (document.getElementById('docsify-alerts-styles')) return; // avoid duplicates
    const style = document.createElement('style');
    style.id = 'docsify-alerts-styles';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function transformBlockquotesDOM() {
    const root = document.querySelector('.markdown-section') || document.body;
    if (!root) return;
    const blocks = root.querySelectorAll('blockquote');
    blocks.forEach(bq => {
      if (bq.dataset.alertProcessed) return;
      const firstP = bq.querySelector('p');
      if (!firstP) return;
      const html = firstP.innerHTML.trim();
      const markerRegex = /\[!(\w+)\]/g;
      let m; const markers = [];
      while ((m = markerRegex.exec(html)) !== null) {
        markers.push({ type: m[1].toUpperCase(), index: m.index, len: m[0].length });
      }
      if (!markers.length) return; // no alert markers
      // If only one marker at start proceed with original logic (allows multi-element content).
      const onlySingleAtStart = markers.length === 1 && markers[0].index === 0;
      if (onlySingleAtStart) {
        const type = markers[0].type;
        const alertType = alertTypes[type];
        if (!alertType) return;
        const remainder = html.slice(markers[0].len).trimStart();
        const contentNodes = [];
        if (remainder) {
          firstP.innerHTML = remainder;
          contentNodes.push(firstP);
        } else {
          firstP.remove();
        }
        Array.from(bq.children).forEach(child => { if (child !== firstP) contentNodes.push(child); });
        const contentHTML = contentNodes.map(n => n.outerHTML).join('');
        const wrapper = document.createElement('div');
        wrapper.className = `alert ${alertType.class}`;
        wrapper.setAttribute('role', 'note');
        wrapper.setAttribute('aria-label', type);
        wrapper.innerHTML = `${alertType.icon}<div class="alert-content">${contentHTML}</div>`;
        bq.dataset.alertProcessed = '1';
        bq.replaceWith(wrapper);
        return;
      }
      // Multiple markers in one paragraph: split into sequence of alerts.
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < markers.length; i++) {
        const cur = markers[i];
        const next = markers[i + 1];
        const type = cur.type;
        const alertType = alertTypes[type];
        if (!alertType) continue; // skip unknown
        const startContent = cur.index + cur.len;
        const endContent = next ? next.index : html.length;
        let segment = html.slice(startContent, endContent).trim();
        if (!segment) segment = '';
        const wrapper = document.createElement('div');
        wrapper.className = `alert ${alertType.class}`;
        wrapper.setAttribute('role', 'note');
        wrapper.setAttribute('aria-label', type);
        wrapper.innerHTML = `${alertType.icon}<div class="alert-content">${segment}</div>`;
        fragment.appendChild(wrapper);
      }
      bq.dataset.alertProcessed = '1';
      bq.replaceWith(fragment);
    });
  }

  window.$docsify = window.$docsify || {};
  const alertsConfig = window.$docsify.alertsConfig || {};
  const mode = alertsConfig.mode || 'dom'; // 'dom' (default) or 'pre'
  const lineBreakStrategy = alertsConfig.lineBreakStrategy || 'preserve'; // 'preserve' adds <br>-style breaks for each original line in DOM mode

  function preserveLineBreaksForDOM(content) {
    if (lineBreakStrategy !== 'preserve') return content;
    const lines = content.split(/\r?\n/);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = line.match(/^>\s*\[!(\w+)\]\s*$/) || line.match(/^>\s*\[!(\w+)\]\s+.*$/);
      if (!m) { out.push(line); continue; }
      // Gather following continuation lines of this alert block (without consuming next alert start)
      out.push(line); // push marker line as-is
      let j = i + 1;
      const continuationIdxs = [];
      while (j < lines.length) {
        const ln = lines[j];
        if (/^>\s*\[!(\w+)\]/.test(ln)) break; // next alert
        if (/^>\s?.*/.test(ln)) {
          continuationIdxs.push(j);
          j++;
          continue;
        }
        break;
      }
      // Append two trailing spaces to force markdown line break for each continuation line except last
      for (let k = 0; k < continuationIdxs.length; k++) {
        const idx = continuationIdxs[k];
        let ln = lines[idx];
        if (k < continuationIdxs.length - 1) {
          if (!/  $/.test(ln)) ln += '  ';
        }
        out.push(ln);
      }
      i = j - 1;
    }
    return out.join('\n');
  }

  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    hook.beforeEach(function (content) {
      if (mode === 'pre') {
        return parseAlerts(content);
      }
      // DOM mode: optionally mark line breaks so markdown keeps them as <br>
      return preserveLineBreaksForDOM(content);
    });

    hook.afterEach(function (html, next) {
      // In DOM mode we keep html unchanged here; actual transformation in doneEach to work on live DOM
      next(html);
    });

    hook.doneEach(function() {
      if (mode === 'dom') {
        transformBlockquotesDOM();
      }
    });

    hook.init(function() {
      const userStyles = window.$docsify.alertStyles || '';
      injectStyles(defaultStyles + userStyles);
    });
  });
})();
