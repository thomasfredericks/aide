(function () {

  function normalize() {
    var hash = window.location.hash || '';

    if (hash.indexOf('#/') !== 0) return;

    var route = hash.slice(1);
    var parts = route.split('?');

    var path = parts[0];
    var query = parts[1] ? '?' + parts[1] : '';

    if (
      path === '/' ||
      path.charAt(path.length - 1) === '/' ||
      /\/[^\/]+\.[a-zA-Z0-9]+$/.test(path)
    ) {
      return;
    }

    var normalized = '#' + path + '/' + query;

    if (normalized !== hash) {
      window.location.replace(normalized);
    }
  }

  if (window.addEventListener) {
    window.addEventListener('hashchange', normalize);
  }

  normalize();

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(
    window.$docsify.plugins || [],
    function (hook) {
      hook.init(normalize);
    }
  );

})();
