// Constants
let supportedFileExtensions = ['.pdf', '.html'];

function initLinkConverter() {
    handleLinks();
}

function handleLinks() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const url = link.getAttribute('href').toLowerCase();
        if (supportedFileExtensions.some(ext => url.endsWith(ext))) {
            const newUrl = resolveUrl(link.getAttribute('href'));
            link.href = newUrl;
        }
    });
}

function resolveUrl(href) {
    let base = window.location.href.split('#')[0]; // Get the base URL without the hash
    if (base.endsWith('index.html')) {
        base = base.replace('index.html', ''); // Remove 'index.html' from base URL
    }

    let resolvedUrl;
    if (href.startsWith('http') || href.startsWith('/')) {
        resolvedUrl = href;
    } else {
        resolvedUrl = new URL(href, base).href;
    }

    return resolvedUrl.replace('#/', '');
}

function setSupportedFileExtensions(extensions) {
    supportedFileExtensions = extensions.map(ext => ext.toLowerCase());
}

// Docsify plugin integration
(function() {
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = (window.$docsify.plugins || []).concat(function(hook, vm) {
        hook.init(function() {
            if (window.$docsify.unhashtagLinkExtensions) {
                setSupportedFileExtensions(window.$docsify.unhashtagLinkExtensions);
            }
        });
        hook.doneEach(function() {
            initLinkConverter();
        });
    });
})();

