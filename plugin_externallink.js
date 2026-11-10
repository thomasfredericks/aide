(function () {
  function markExternalLinks() {
    document.querySelectorAll('.markdown-section a[href]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var isExternal = /^https?:\/\//i.test(href) &&
                       a.host && a.host !== window.location.host;

      if (!isExternal) return;
      if ((a.textContent || '').endsWith('↗️')) return; // avoid duplicates

      a.appendChild(document.createTextNode(' ↗️'));
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat([
    function (hook) {
      hook.ready(markExternalLinks);
      hook.doneEach(markExternalLinks);
    }
  ]);
})();