(function() {
  var defaultConfig = {
    wrapInFigure: true,
    textAlign: 'center',
    fontStyle: 'italic',
    imageAlign: 'center',
    addLinkWrapper: true
  };

  function getConfig() {
    return Object.assign({}, defaultConfig, (window.$docsify && window.$docsify.imageCaption) || {});
  }

  function wrapInLink(img, config) {
    if (!config.addLinkWrapper) return false;
    if (img.parentNode.tagName === 'A') return false;
    
    var link = document.createElement('a');
    link.href = img.src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
    return true;
  }

  function applyImageAlignment(img, alignment) {
    img.style.display = 'block';
    img.style.margin = alignment === 'center' ? '0 auto' : 
                       alignment === 'right' ? '0 0 0 auto' : '0 auto 0 0';
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function(hook) {
    hook.doneEach(function() {
      var config = getConfig();
      var contentEl = document.querySelector('.content');
      if (!contentEl) return;
      
      var images = Array.from(contentEl.querySelectorAll('img[alt]'));
      
      images.forEach(function(img) {
        var altText = img.getAttribute('alt');
        if (!altText || !altText.trim()) {
          applyImageAlignment(img, config.imageAlign);
          return;
        }
        
        // Save position
        var nextSibling = img.nextSibling;
        var parentNode = img.parentNode;
        
        if (config.wrapInFigure) {
          // Wrap in link
          wrapInLink(img, config);
          var wrappedEl = img.parentNode.tagName === 'A' ? img.parentNode : img;
          
          // Build figure
          var figure = document.createElement('figure');
          var figcaption = document.createElement('figcaption');
          figcaption.style.cssText = 'text-align: ' + config.textAlign + '; font-style: ' + config.fontStyle;
          figcaption.textContent = altText;
          
          // Assemble and place
          figure.appendChild(wrappedEl);
          figure.appendChild(figcaption);
          parentNode.insertBefore(figure, nextSibling);
          
          applyImageAlignment(img, config.imageAlign);
        } else {
          // Non-figure mode
          wrapInLink(img, config);
          
          var caption = document.createElement('div');
          caption.style.cssText = 'text-align: ' + config.textAlign + '; font-style: ' + config.fontStyle;
          caption.textContent = altText;
          img.insertAdjacentElement('afterend', caption);
          
          applyImageAlignment(img, config.imageAlign);
        }
      });
    });
  });
})();