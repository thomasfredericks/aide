// =======================
// Inline comma-separated TOC for Docsify
// Renders ONLY at <!-- toc -->
// =======================

var defaultOptions = {
  headings: 'h2',      // which headers to include
  scope: '.markdown-section',   // container to search

};

// -----------------------
// Helpers
// -----------------------
var getHeaders = function (selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
};

var aTag = function (src) {
  var a = document.createElement('a');
  a.innerHTML = src.firstChild.innerHTML;
  a.href = src.firstChild.href;
  //a.setAttribute('class', 'anchor');
  return a;
};

// -----------------------
// Build inline comma-separated TOC
// -----------------------
var buildInlineTOC = function (options) {
  var selector = options.scope + ' ' + options.headings;
  var headers = getHeaders(selector);
  if (!headers.length) return null;

  var container = document.createElement('div');
  container.className = 'inline_toc';

  if (options.title) {
    var title = document.createElement('span');
    title.className = 'inline_toc_title';
    title.textContent = options.title;
    container.appendChild(title);

    // Add a line break after the title
    var br = document.createElement('br');
    container.appendChild(br);
}

  headers.forEach(function (h, index) {
    // Make sure the header has an ID
    if (!h.id) {
      // Generate a safe ID from header text
      h.id = h.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w]+/g, '-'); // letters/numbers replaced by -
    }

    // Create link pointing to header ID
    var a = aTag(h);

    container.appendChild(a);

    if (index < headers.length - 1) {
      container.appendChild(document.createTextNode(' — '));
    }
  });

  return container;
};


// -----------------------
// Docsify plugin
// -----------------------
function plugin(hook, vm) {
  var options = vm.config.toc;

  hook.doneEach(function () {
    var scope = document.querySelector(options.scope);
    if (!scope) return;

    // Find <!-- toc --> comment node
    var walker = document.createTreeWalker(
      scope,
      NodeFilter.SHOW_COMMENT,
      null,
      false
    );

    var tocComment = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim() === 'toc') {
        tocComment = walker.currentNode;
        break;
      }
    }

    // Exit if no marker
    if (!tocComment) return;

    var tocDiv = buildInlineTOC(options);
    if (!tocDiv) return;

    // Replace <!-- toc --> with TOC
    tocComment.parentNode.replaceChild(tocDiv, tocComment);
  });
}

// -----------------------
// Register plugin
// -----------------------
window.$docsify = window.$docsify || {};
window.$docsify.toc = Object.assign(defaultOptions, window.$docsify.toc || {});
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins || []);
